# Fix SQL Server LocalDB Startup Failures (SQL Server 2025 LocalDB on NVMe)

## Scope
Use this on Windows machines where `MSSQLLocalDB` (or other LocalDB instances) fail to start with errors like:

- `SQL Server process failed to start`
- LocalDB event log error `575`
- SQL error log shows `misaligned log IOs`
- SQL error log shows missing system DB files under a fake path like `F:\dbs\...\mkmastr.nativeproj\...`

This runbook fixes two issues we saw together:

1. NVMe sector-size reporting issue (`PhysicalBytesPerSectorForPerformance = 32768`) that crashes LocalDB at startup.
2. Stale/bad LocalDB instance metadata inside old `master.mdf` (system DB paths pointing to `F:\dbs\...`).

## Important (Read First)
- Run the registry + `fsutil` steps in **Administrator PowerShell**.
- Recreating a LocalDB instance deletes that instance's LocalDB system files and any databases stored inside that instance folder.
- Back up LocalDB data before deleting instances.
- **Reboot is required after the registry change** before retesting LocalDB.

## Step 1: Confirm the symptom (Admin PowerShell)

```powershell
sqllocaldb i
sqllocaldb start MSSQLLocalDB
```

If it fails, inspect sector info:

```powershell
fsutil fsinfo sectorinfo C:
```

Typical problematic output:

- `LogicalBytesPerSector : 512`
- `PhysicalBytesPerSectorForAtomicity : 4096`
- `PhysicalBytesPerSectorForPerformance : 32768`

Also confirm the NVMe driver is Microsoft `stornvme` (the registry fix below targets that driver):

```powershell
Get-CimInstance Win32_PnPSignedDriver |
  Where-Object { $_.DeviceName -match 'NVMe|NVM Express' -or $_.FriendlyName -match 'NVMe|NVM Express' } |
  Select-Object DeviceName, DriverProviderName, DriverVersion, InfName
```

Expected controller driver for this fix: `stornvme.inf`.

## Step 2: Apply the NVMe sector-size override (Admin PowerShell)

Run this exactly:

```powershell
New-ItemProperty `
  -Path "HKLM:\SYSTEM\CurrentControlSet\Services\stornvme\Parameters\Device" `
  -Name "ForcedPhysicalSectorSizeInBytes" `
  -PropertyType MultiString `
  -Value "* 4095" `
  -Force
```

Verify the value exists:

```powershell
Get-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Services\stornvme\Parameters\Device' |
  Select-Object ForcedPhysicalSectorSizeInBytes
```

Expected:

- `ForcedPhysicalSectorSizeInBytes : {* 4095}`

## Step 3: Reboot (Required)

**Reboot the computer now. Do not skip this.**

The driver-level registry override does not take effect until after reboot.

## Step 4: Re-test LocalDB after reboot

Open PowerShell (Admin is fine) and test:

```powershell
sqllocaldb start MSSQLLocalDB
```

If it still fails, inspect the latest LocalDB SQL error log:

```powershell
Get-Content "$env:LOCALAPPDATA\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\error.log" -Tail 120
```

Interpretation:

- If you still see `misaligned log IOs` followed by immediate fatal crash, the sector fix did not take effect. Re-check Step 2 and ensure the machine was rebooted.
- If LocalDB gets much further (for example, `SQL Server is now ready for client connections`) but then fails trying to open `model`/`msdb` under `F:\dbs\...`, the instance metadata is stale/bad and must be recreated (next steps).

## Step 5: Back up LocalDB data before deleting instances (Recommended)

List all instances:

```powershell
sqllocaldb i
```

Optional: find non-system database files inside LocalDB instance folders:

```powershell
Get-ChildItem "$env:LOCALAPPDATA\Microsoft\Microsoft SQL Server Local DB\Instances" -Recurse -File -Include *.mdf,*.ldf |
  Where-Object {
    $_.Name -notin @(
      'master.mdf','mastlog.ldf',
      'model.mdf','modellog.ldf',
      'msdbdata.mdf','msdblog.ldf',
      'tempdb.mdf','templog.ldf'
    )
  } |
  Select-Object FullName, Length, LastWriteTime
```

Optional: back up the whole LocalDB instance folder tree:

```powershell
$src = "$env:LOCALAPPDATA\Microsoft\Microsoft SQL Server Local DB\Instances"
$dst = "$env:USERPROFILE\Desktop\LocalDB-Instances-Backup-$(Get-Date -Format yyyyMMdd-HHmmss)"
Copy-Item $src $dst -Recurse -Force
```

## Step 6: Recreate affected LocalDB instances (No reboot required)

### Default instance (`MSSQLLocalDB`)

```powershell
sqllocaldb stop MSSQLLocalDB -k
sqllocaldb delete MSSQLLocalDB
sqllocaldb create MSSQLLocalDB -s
```

Expected result:

- `LocalDB instance "MSSQLLocalDB" created ...`
- `LocalDB instance "MSSQLLocalDB" started.`

### Custom instance example (`ProjectModels`)

```powershell
sqllocaldb stop ProjectModels -k
sqllocaldb delete ProjectModels
sqllocaldb create ProjectModels
sqllocaldb start ProjectModels
```

Notes:

- Use `-s` on `create` if you want it started immediately.
- Repeat for each custom LocalDB instance on the machine.

## Step 7: Validate success

```powershell
sqllocaldb i MSSQLLocalDB
sqllocaldb i ProjectModels
```

Expected:

- `State: Running` for instances you started

Optional SQL-level test (default instance):

```powershell
sqlcmd -S "(localdb)\MSSQLLocalDB" -Q "select @@version"
```

If `sqlcmd` is not installed, the `sqllocaldb` state check is sufficient for a basic validation.

## Step 8: If it still fails after all steps

Check the error log again and classify the failure:

### A) Still crashes early with `misaligned log IOs`
Do this:

- Re-check `ForcedPhysicalSectorSizeInBytes` registry value (`* 4095`)
- Confirm NVMe controller uses `stornvme.inf`
- Confirm the machine was rebooted after Step 2
- Re-run `fsutil fsinfo sectorinfo C:`

### B) Fails after `SQL Server is now ready for client connections` and references `F:\dbs\...`
Do this:

- Delete/recreate all affected LocalDB instances (Step 6)
- Do not reuse the old instance `master.mdf`

### C) A brand-new LocalDB instance still fails on the same `F:\dbs\...` path
This suggests an install-level LocalDB packaging/problem on that machine.

Try:

1. Install/update SQL Server 2025 LocalDB from a newer CU package.
2. Recreate the LocalDB instances again.

## Step 9: Rollback (only if needed)

If you need to remove the NVMe override later (Admin PowerShell):

```powershell
Remove-ItemProperty `
  -Path "HKLM:\SYSTEM\CurrentControlSet\Services\stornvme\Parameters\Device" `
  -Name "ForcedPhysicalSectorSizeInBytes"
```

Then reboot.

## Quick field checklist (per computer)

1. Open **Admin PowerShell**.
2. Run `fsutil fsinfo sectorinfo C:` and note if `PhysicalBytesPerSectorForPerformance` is `32768`.
3. Apply `ForcedPhysicalSectorSizeInBytes = "* 4095"` under `stornvme`.
4. **Reboot**.
5. Test `sqllocaldb start MSSQLLocalDB`.
6. If it fails with `F:\dbs\...` in `error.log`, delete/recreate the affected LocalDB instances.
7. Validate `sqllocaldb i <instance>` shows `State: Running`.
