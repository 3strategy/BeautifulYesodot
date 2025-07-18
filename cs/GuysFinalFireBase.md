---
layout: page
title: "דוח פרוייקט — Guys Final Firebase Assignement"
subtitle: "מערכת דיווח נוכחות תלמידים"
author: גיא סידס
lang: he
---


## פונקציות עיקריות ב-PresenceActivity:


```java
protected void onCreate(Bundle savedInstanceState) {
```

```java
public void onPartialResults(String text) {
```

```java
public void onResults(String text) {
```

```java
/// was used in the dev process before Speech was introduced.
private void uploadMockDataToFirebase() {
```

```java
/// was used in the dev process before speech was introduced.
/// to work with this you need to revive the btnDebug that was
/// btn deleted on build of 18Jul 07:48am
private void populateMockData() {
```

```java
/**
 * 🔄 Pushes a single transcript entry to RTDB using rounded-time + lesson key
 * /P{YY}_{uid}/W{current week}/{MMDDMMM_HHmmL#}/
 * /P25_tTe3W4vIjHe0HSqRXxAIUBxIzKg1/W29/0718Jul_0830L1
 */
private void pushRawTranscript(String newEntry) {
```

```java
/**
 * 🔍 identifying the most probable class.
 */
private Boolean detectClass() {
```

```java
/**
 * Parses a single transcript line and updates student statuses.
 */
private void analyzeTranscriptLine(String line) {
```

```java
/**
 * Builds the summary strings and updates the TextViews.
 */
private void updateUI() {
```

# Code Files

{: .page-break-before}
### DoneTasksActivity.java

*Path: DoneTasksActivity.java*

```java
package com.example.tasks.Activities;

import static com.example.tasks.FBRef.refDoneTasks;
import static com.example.tasks.FBRef.refTasks;
import static com.example.tasks.FBRef.refYears;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;

import com.example.tasks.Adapters.DoneTaskAdapter;
import com.example.tasks.Adapters.TaskAdapter;
import com.example.tasks.Obj.MasterActivity;
import com.example.tasks.Obj.Task;
import com.example.tasks.R;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;

/**
 * @author		Albert Levy albert.school2015@gmail.com
 * @version     2.1
 * @since		9/3/2024
 * <p>
 * Activity for displaying tasks that have been marked as "Done".
 * <p>
 * This activity extends {@link MasterActivity} to inherit its common options menu.
 * It fetches and displays a list of completed tasks from the Firebase Realtime Database
 * node "Done_Tasks". Users can filter the displayed tasks by academic year using a
 * {@link Spinner}. The list of done tasks can also be sorted by class name or by the
 * date they were marked as done.
 * <p>
 * Features:
 * <ul>
 *     <li>Displays a {@link Spinner} to select an academic year to view its done tasks.</li>
 *     <li>Fetches and lists done tasks using a {@link DoneTaskAdapter}.</li>
 *     <li>Allows sorting of the displayed tasks by "Class Name" (ascending/descending).</li>
 *     <li>Allows sorting of the displayed tasks by "Date Checked" (ascending/descending).</li>
 *     <li>Shows a {@link ProgressDialog} while initially fetching data for a selected year.</li>
 *     <li>Retrieves the initially active year from {@link SharedPreferences}.</li>
 * </ul>
 *
 * @see MasterActivity
 * @see DoneTaskAdapter
 * @see Task
 * @see SharedPreferences
 * @see com.example.tasks.FBRef
 */
public class DoneTasksActivity extends MasterActivity implements AdapterView.OnItemSelectedListener {

    private Spinner spYear;
    private TextView tVClass, tVChecked;
    private ListView lVDone;
    private ProgressDialog pd;
    private ArrayList<Integer> years;
    private ArrayAdapter<Integer> yearsAdp;
    private ArrayList<Task> doneTasksList;
    private DoneTaskAdapter doneTaskAdp;
    private SharedPreferences settings;
    private int activeYear;
    private ValueEventListener vel;
    private boolean orderChecked = false;
    private boolean orderClass = false;
    /**
     * Listener for fetching the list of available academic years from Firebase.
     * Populates the years spinner.
     */
    private ValueEventListener velYears = new ValueEventListener() {
        @Override
        public void onDataChange(@NonNull DataSnapshot dS) {
            years.clear();
            for(DataSnapshot data : dS.getChildren()) {
                years.add(Integer.parseInt(data.getKey()));
            }
            yearsAdp.notifyDataSetChanged();
            if (activeYear != 1970) {
                spYear.setSelection(years.indexOf(activeYear));
            }
        }
        @Override
        public void onCancelled(@NonNull DatabaseError error) {}
    };

    /**
     * Called when the activity is first created.
     * Initializes views, SharedPreferences, and sets up adapters.
     *
     * @param savedInstanceState If the activity is being re-initialized after
     *                           previously being shut down then this Bundle contains the data it most
     *                           recently supplied in {@link #onSaveInstanceState}.
     *                           <b><i>Note: Otherwise it is null.</i></b>
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_done_tasks);

        settings=getSharedPreferences("PREFS_NAME",MODE_PRIVATE);
        initViews();
    }


    /**
     * Called when the activity is becoming visible to the user.
     * If a valid {@code activeYear} is set, it attaches a Firebase ValueEventListener
     * to listen for changes in the done tasks for that year.
     */
    @Override
    protected void onStart() {
        super.onStart();
        refDoneTasks.child(String.valueOf(activeYear)).addValueEventListener(vel);
    }

    /**
     * Called when the activity is no longer visible to the user.
     * Removes the Firebase ValueEventListener for done tasks to prevent memory leaks
     * and unnecessary background updates.
     */
    @Override
    protected void onStop() {
        super.onStop();
        refDoneTasks.child(String.valueOf(activeYear)).removeEventListener(vel);
    }

    /**
     * Initializes UI components, adapters, and the primary ValueEventListener for done tasks.
     * Retrieves the {@code activeYear} from SharedPreferences and fetches the list of
     * available years for the spinner.
     */
    private void initViews() {
        spYear = findViewById(R.id.spYears);
        tVClass = findViewById(R.id.tVClass);
        tVChecked = findViewById(R.id.tVChecked);
        lVDone = findViewById(R.id.lVDone);
        years = new ArrayList<>();
        years.clear();
        yearsAdp = new ArrayAdapter<>(DoneTasksActivity.this,
                android.R.layout.simple_spinner_dropdown_item, years);
        spYear.setAdapter(yearsAdp);
        spYear.setOnItemSelectedListener(this);
        activeYear = settings.getInt("activeYear",1970);
        refYears.addListenerForSingleValueEvent(velYears);
        pd= ProgressDialog.show(this,"Connecting Database","Gathering data...",true);

        doneTasksList = new ArrayList<Task>();
        doneTaskAdp = new DoneTaskAdapter(DoneTasksActivity.this, doneTasksList);
        lVDone.setAdapter(doneTaskAdp);
        vel = new ValueEventListener() {
            /**
             * Called when data for done tasks for the {@code activeYear} changes in Firebase.
             * Clears the current list and repopulates it with the fetched tasks.
             * Notifies the {@code doneTaskAdp} to refresh the ListView.
             * Dismisses the {@link ProgressDialog} after data is loaded.
             *
             * @param dS The DataSnapshot containing the done tasks.
             *           The expected structure is: Year -> DateEnded -> TaskObject.
             */
            @Override
            public void onDataChange(@NonNull DataSnapshot dS) {
                doneTasksList.clear();
                for(DataSnapshot dataDate : dS.getChildren()) {
                    for(DataSnapshot data : dataDate.getChildren()) {
                        doneTasksList.add(data.getValue(Task.class));
                    }
                }
                doneTaskAdp.notifyDataSetChanged();
                if (pd != null) {
                    pd.dismiss();
                }
            }
            @Override
            public void onCancelled(@NonNull DatabaseError error) {
            }
        };
    }

    /**
     * Sorts the {@code doneTasksList} by class name.
     * Toggles between ascending and descending order on subsequent clicks.
     * Updates the text of the {@code tVClass} header to indicate the current sort order.
     *
     * @param view The TextView (tVClass) that was clicked.
     */
    public void orderByClass(View view) {
        if (orderClass) {
            doneTasksList.sort((o1, o2)
                    -> o1.getClassName().compareTo(
                    o2.getClassName()));
            tVClass.setText("Class ↑");
        } else {
            doneTasksList.sort((o1, o2)
                    -> o2.getClassName().compareTo(
                    o1.getClassName()));
            tVClass.setText("Class ↓");
        }
        orderClass = !orderClass;
        doneTaskAdp.notifyDataSetChanged();
    }

    /**
     * Sorts the {@code doneTasksList} by the date they were marked as done (checked date).
     * Toggles between ascending and descending order on subsequent clicks.
     * Updates the text of the {@code tVChecked} header to indicate the current sort order.
     *
     * @param view The TextView (tVChecked) that was clicked.
     */
    public void orderByChecked(View view) {
        if (orderChecked) {
            doneTasksList.sort((o1, o2)
                    -> o1.getDateChecked().compareTo(
                    o2.getDateChecked()));
            tVChecked.setText("Checked ↑");
        } else {
            doneTasksList.sort((o1, o2)
                    -> o2.getDateChecked().compareTo(
                    o1.getDateChecked()));
            tVChecked.setText("Checked ↓");
        }
        orderChecked = !orderChecked;
        doneTaskAdp.notifyDataSetChanged();
    }

    /**
     * Callback method to be invoked when an item in the year {@link Spinner} has been selected.
     * Updates the {@code activeYear} to the newly selected year.
     * Removes the Firebase listener from the previously selected year's done tasks (if any)
     * and attaches a new listener for the done tasks of the newly selected year.
     * Shows a {@link ProgressDialog} while new data is being fetched.
     *
     * @param adapterView The AdapterView where the selection happened.
     * @param view        The view within the AdapterView that was clicked.
     * @param pos         The position of the view in the adapter.
     * @param l           The row id of the item that was selected.
     */
    @Override
    public void onItemSelected(AdapterView<?> adapterView, View view, int pos, long l) {
        activeYear = years.get(pos);
        refDoneTasks.child(String.valueOf(activeYear)).addValueEventListener(vel);
    }

    /**
     * Callback method to be invoked when the selection disappears from the year {@link Spinner}.
     * Currently, this method has no specific implementation.
     *
     * @param adapterView The AdapterView that now contains no selected item.
     */
    @Override
    public void onNothingSelected(AdapterView<?> adapterView) {}
}
```

### LoginActivity.java

*Path: LoginActivity.java*

```java

package com.example.tasks.Activities;

import static com.example.tasks.FBRef.*;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.tasks.FBRef;
import com.example.tasks.Obj.User;
import com.example.tasks.R;
import com.example.tasks.models.Student;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthUserCollisionException;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

/**
 * @author Albert Levy albert.school2015@gmail.com
 * @version 2.1
 * @see AppCompatActivity
 * @see FirebaseAuth
 * @see FirebaseDatabase
 * @see SharedPreferences
 * @since 9/3/2024 <p>
 * Activity for handling user login and registration.
 * <p>
 * This activity allows users to either log in with existing credentials or
 * register a new account using their email and password. It interacts with
 * Firebase Authentication for user management and Firebase Realtime Database
 * to store additional user information (username).
 * <p>
 * Features:
 * <ul>
 *     <li>User login with email and password.</li>
 *     <li>New user registration with name, email, and password.</li>
 *     <li>"Stay connected" option to remember the user's login session using SharedPreferences.</li>
 *     <li>Retrieval of the last active year or setting a new active year for new users
 *         via {@link YearsActivity}.</li>
 *     <li>Dynamic UI changes to switch between login and registration forms.</li>
 * </ul>
 * Upon successful login or registration, the user is navigated to {@link MainActivity}.
 */
public class LoginActivity extends AppCompatActivity {

    private TextView tVtitle, tVregister;
    private EditText eTname, eTemail, eTpass;
    private CheckBox cBstayconnect;
    private Button btn;

    private String name, email, password, uid;
    private User userdb;
    private Boolean stayConnect, registered;
    private SharedPreferences settings;
    private int activeYear = 1970;
    private final int REQUEST_CODE = 100;
    private FirebaseAuth refAuth;
    private DatabaseReference profileRef;

    /**
     * Called when the activity is first created.
     * Initializes views, SharedPreferences, and sets up the initial UI state for login.
     *
     * @param savedInstanceState If the activity is being re-initialized after
     *                           previously being shut down then this Bundle contains the data it most
     *                           recently supplied in {@link #onSaveInstanceState}.
     *                           <b><i>Note: Otherwise it is null.</i></b>
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        settings = getSharedPreferences("PREFS_NAME", MODE_PRIVATE);
        refAuth = FirebaseAuth.getInstance();
        initViews();

        stayConnect = false;
        registered = true;
        regoption();
    }


    /**
     * Called when the activity is becoming visible to the user.
     * <p>
     * Checks if a user is already logged in and if the "stay connected" option
     * was previously selected. If both conditions are true, it bypasses the login screen
     * and navigates directly to {@link MainActivity}.
     */
    @Override
    protected void onStart() {
        super.onStart();
        boolean isChecked = settings.getBoolean("stayConnect", false);
        FirebaseUser user = refAuth.getCurrentUser();
        if (user != null && isChecked) {
            FBRef.getUser(user);
            // Launch preferred activity after loading students
            profileRef = FirebaseDatabase.getInstance()
                    .getReference("Users")
                    .child(user.getUid());
            profileRef.child("preferredActivity")
                    .addListenerForSingleValueEvent(new ValueEventListener() {
                        @Override
                        public void onDataChange(@NonNull DataSnapshot snap) {
                            String pref = snap.getValue(String.class);
                            Class<?> target;
                            if ("Tasks".equals(pref)) {
                                target = TaskActivity.class;
                            } else if ("Reports".equals(pref)) {
                                target = ReportsActivity.class;
                            } else {
                                target = PresenceActivity.class;
                            }
                            Intent i = new Intent(LoginActivity.this, target);
                            FBRef.loadAllStudents(() -> startActivity(i));
                        }

                        @Override
                        public void onCancelled(@NonNull DatabaseError error) {
                        }
                    });
        }
    }

    /**
     * Initializes all UI view components by finding them by their ID.
     */
    private void initViews() {
        tVtitle = findViewById(R.id.tVtitle);
        eTname = findViewById(R.id.eTname);
        eTemail = findViewById(R.id.eTemail);
        eTpass = findViewById(R.id.eTpass);
        cBstayconnect = findViewById(R.id.cBstayconnect);
        tVregister = findViewById(R.id.tVregister);
        btn = findViewById(R.id.btn);
    }

    /**
     * Called when the activity is no longer visible to the user.
     * If the {@code stayConnect} flag is true (meaning the user logged in and chose
     * to be remembered, and was not auto-logged out), this activity is finished.
     * This typically happens if MainActivity is started from here.
     */
    @Override
    protected void onPause() {
        super.onPause();
        if (stayConnect) finish();
    }

    /**
     * Sets up the clickable text ("Register here!") to switch to registration mode.
     * When clicked, it updates the UI to show the registration form elements
     * (e.g., name field, changes button text) and sets {@code registered} to false.
     * It then calls {@link #logoption()} to set up the "Login here!" text.
     */
    private void regoption() {
        SpannableString ss = new SpannableString("Don't have an account?  Register here!");
        ClickableSpan span = new ClickableSpan() {
            @Override
            public void onClick(View textView) {
                tVtitle.setText("Register");
                eTname.setVisibility(View.VISIBLE);
                btn.setText("Register");
                registered = false;
                logoption();
            }
        };
        ss.setSpan(span, 24, 38, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        tVregister.setText(ss);
        tVregister.setMovementMethod(LinkMovementMethod.getInstance());
    }

    /**
     * Sets up the clickable text ("Login here!") to switch to login mode.
     * When clicked, it updates the UI to show the login form elements
     * (e.g., hides name field, changes button text) and sets {@code registered} to true.
     * It then calls {@link #regoption()} to set up the "Register here!" text.
     */
    private void logoption() {
        SpannableString ss = new SpannableString("Already have an account?  Login here!");
        ClickableSpan span = new ClickableSpan() {
            @Override
            public void onClick(View textView) {
                tVtitle.setText("Login");
                eTname.setVisibility(View.INVISIBLE);
                btn.setText("Login");
                registered = true;
                regoption();
            }
        };
        ss.setSpan(span, 26, 37, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        tVregister.setText(ss);
        tVregister.setMovementMethod(LinkMovementMethod.getInstance());
    }

    /**
     * Handles the login or registration process when the main button is clicked.
     * <p>
     * If {@code registered} is true, it attempts to sign in the user with Firebase Authentication
     * using the provided email and password.
     * If {@code registered} is false, it attempts to create a new user account with Firebase
     * Authentication and stores the user's name and UID in the Firebase Realtime Database.
     * <p>
     * Displays a {@link ProgressDialog} during the Firebase operations.
     * On successful login/registration, it saves the "stay connected" preference,
     * handles active year retrieval/setting, and navigates to {@link MainActivity}.
     * Toasts are shown for success or failure messages.
     *
     * @param view The view that was clicked (the login/register button).
     */
    public void logorreg(View view) {
        if (registered) {
            // Login flow
            String email = eTemail.getText().toString();
            String password = eTpass.getText().toString();
            ProgressDialog pd = ProgressDialog.show(this, "Login", "Connecting...", true);
            refAuth.signInWithEmailAndPassword(email, password)
                    .addOnCompleteListener(this, task -> {
                        pd.dismiss();
                        if (task.isSuccessful()) {
                            FirebaseUser user = refAuth.getCurrentUser();
                            FBRef.getUser(user);
                            settings.edit()
                                    .putBoolean("stayConnect", cBstayconnect.isChecked())
                                    .apply();

                            profileRef = FirebaseDatabase.getInstance()
                                    .getReference("Users")
                                    .child(user.getUid());
                            profileRef.child("preferredActivity")
                                    .addListenerForSingleValueEvent(new ValueEventListener() {
                                        @Override
                                        public void onDataChange(@NonNull DataSnapshot snap) {
                                            String pref = snap.getValue(String.class);
                                            Class<?> target;
                                            if ("Tasks".equals(pref)) {
                                                target = TaskActivity.class;
                                            } else if ("MainTask".equals(pref)) {
                                                target = MainActivity.class;
                                            } else if ("Profile".equals(pref)) {
                                                target = ProfileActivity.class;
                                            } else if ("Reports".equals(pref)) {
                                                target = ReportsActivity.class;
                                            } else {
                                                target = PresenceActivity.class;
                                            }
                                            Intent i = new Intent(LoginActivity.this, target);
                                            FBRef.loadAllStudents(() -> startActivity(i));
                                        }

                                        @Override
                                        public void onCancelled(@NonNull DatabaseError error) {
                                        }
                                    });
                        } else {
                            Toast.makeText(LoginActivity.this,
                                    "E-mail or password are wrong!", Toast.LENGTH_LONG).show();
                        }
                    });
        } else {
            // Registration flow unchanged
            name = eTname.getText().toString();
            email = eTemail.getText().toString();
            password = eTpass.getText().toString();
            ProgressDialog pd = ProgressDialog.show(this, "Register", "Registering...", true);
            refAuth.createUserWithEmailAndPassword(email, password)
                    .addOnCompleteListener(this, task -> {
                        pd.dismiss();
                        if (task.isSuccessful()) {
                            FirebaseUser user = refAuth.getCurrentUser();
                            FBRef.getUser(user);
                            Log.d("PresenceActivity", "createUserWithEmail:success");
                            uid = user.getUid();
                            userdb = new User(uid, name);
                            refUsers.child(uid).setValue(userdb);
                            settings.edit()
                                    .putBoolean("stayConnect", cBstayconnect.isChecked())
                                    .apply();
                            Toast.makeText(LoginActivity.this, "Successful registration", Toast.LENGTH_SHORT).show();
                            setActiveYear();
                        } else if (task.getException() instanceof FirebaseAuthUserCollisionException) {
                            Toast.makeText(LoginActivity.this,
                                    "User with e-mail already exists!", Toast.LENGTH_SHORT).show();
                        } else {
                            if (task.getException() instanceof FirebaseAuthUserCollisionException)
                                Toast.makeText(LoginActivity.this, "User with e-mail already exist!", Toast.LENGTH_SHORT).show();
                            else {
                                Log.w("PresenceActivity", "createUserWithEmail:failure", task.getException());
                                Toast.makeText(LoginActivity.this, "User create failed.", Toast.LENGTH_LONG).show();
                            }
                        }

                    });
        }
    }

    /**
     * Attempts to retrieve the last active year for the user from Firebase.
     * This method is called if a logged-in user's active year is not found in local SharedPreferences.
     * <p>
     * It queries the "Years" node in Firebase for the latest entry.
     * If an active year is found, it's saved to SharedPreferences, and the user is navigated to {@link PresenceActivity}.
     * If no active year is found (e.g., for a user who previously registered but didn't set an active year),
     * it calls {@link #setActiveYear()} to prompt the user to choose one.
     *
     * @deprecated This method seems to fetch a global last year, not user-specific.
     * Consider fetching user-specific active year from their profile or redesigning.
     * If it's intended to be a global last year, its usage after login is questionable.
     */
    private void lostData() {
        Query query = refYears.orderByKey().limitToLast(1);
        query.get().addOnCompleteListener(new OnCompleteListener<DataSnapshot>() {
            @Override
            public void onComplete(@NonNull com.google.android.gms.tasks.Task<DataSnapshot> tsk) {
                if (tsk.isSuccessful()) {
                    DataSnapshot dS = tsk.getResult();
                    for (DataSnapshot data : dS.getChildren()) {
                        activeYear = Integer.parseInt(data.getKey());
                    }
                    if (activeYear == 1970) {
                        setActiveYear();
                    } else {
                        SharedPreferences.Editor editor = settings.edit();
                        editor.putInt("activeYear", activeYear);
                        editor.putBoolean("stayConnect", cBstayconnect.isChecked());
                        editor.commit();
                        Intent si = new Intent(LoginActivity.this, PresenceActivity.class);
                        startActivity(si);
                    }
                } else {
                    Log.e("firebase", "Error getting data", tsk.getException());
                }
            }
        });
    }

    /**
     * Navigates to {@link YearsActivity} to allow a new user to set their initial active year.
     * The result (the selected year) is expected back in {@link #onActivityResult(int, int, Intent)}.
     */
    private void setActiveYear() {
        Intent sifr = new Intent(LoginActivity.this, YearsActivity.class);
        sifr.putExtra("isNewUser", true);
        startActivityForResult(sifr, REQUEST_CODE);
    }

    /**
     * Callback for the result from starting an activity with {@link #startActivityForResult(Intent, int)}.
     * <p>
     * This method handles the result from {@link YearsActivity}. If the result is {@code Activity.RESULT_OK}
     * and a valid active year is returned, it saves this year to SharedPreferences,
     * updates the "stay connected" preference, and navigates to {@link PresenceActivity}.
     *
     * @param requestCode The integer request code originally supplied to
     *                    startActivityForResult(), allowing you to identify who this
     *                    result came from.
     * @param resultCode  The integer result code returned by the child activity
     *                    through its setResult().
     * @param data        An Intent, which can return result data to the caller
     *                    (various data can be attached to Intent "extras").
     */
    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                if (data != null) {
                    activeYear = data.getIntExtra("activeYear", 1970);
                    SharedPreferences.Editor editor = settings.edit();
                    editor.putInt("activeYear", activeYear);
                    editor.putBoolean("stayConnect", cBstayconnect.isChecked());
                    editor.commit();
                    final Intent si = new Intent(LoginActivity.this, PresenceActivity.class);
                    // delay navigation until students are ready
                    FBRef.loadAllStudents(() -> startActivity(si));
                }
            }
        }
    }

}
```



### MaakavActivity.java

*Path: MaakavActivity.java*

{: page-break-after}
```java
package com.example.tasks.Activities;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.tasks.Obj.MasterActivity;
import com.example.tasks.R;

public class MaakavActivity extends MasterActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_maakav);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}
```

{: .page-break-before}
### MainActivity.java

*Path: MainActivity.java*
{: page-break-after}
```java
package com.example.tasks.Activities;

import static com.example.tasks.FBRef.refDoneTasks;
import static com.example.tasks.FBRef.refTasks;
import static com.example.tasks.FBRef.refUsers;
import static com.example.tasks.Utilities.db2Dsiplay;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;

import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.ContextMenu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.tasks.FBRef;
import com.example.tasks.Obj.MasterActivity;
import com.example.tasks.Obj.Task;
import com.example.tasks.Obj.User;
import com.example.tasks.R;
import com.example.tasks.Adapters.TaskAdapter;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

/**
 * @author		Albert Levy albert.school2015@gmail.com
 * @version     2.1
 * @since		9/3/2024
 * <p>
 * The main activity of the application, displaying a list of active tasks for the current user.
 * <p>
 * This activity extends {@link MasterActivity} to inherit its common options menu.
 * It retrieves and displays tasks from Firebase Realtime Database for the currently
 * selected "active year". Users can interact with tasks through a context menu
 * to edit, delete, or mark them as done.
 * <p>
 * Features:
 * <ul>
 *     <li>Displays a personalized welcome message with the user's name.</li>
 *     <li>Fetches and lists active tasks for the current {@code activeYear} using a {@link TaskAdapter}.</li>
 *     <li>Provides an "Add Task" button to navigate to {@link TaskActivity} for creating new tasks.</li>
 *     <li>Implements a context menu on task items for actions: Edit, Delete, Done.</li>
 *     <li>Handles task completion by moving tasks from the active tasks list to a "done tasks" list in Firebase.</li>
 *     <li>Shows a {@link ProgressDialog} while initially fetching data.</li>
 * </ul>
 * The {@code activeYear} is retrieved from {@link SharedPreferences}.
 *
 * @see MasterActivity
 * @see TaskAdapter
 * @see Task
 * @see User
 * @see FBRef
 */
public class MainActivity extends MasterActivity implements AdapterView.OnItemClickListener,
        View.OnCreateContextMenuListener {
    private TextView tVMainHeader;
    private ListView lVMain;
    private ProgressDialog pd;
    private User user;
    /**
     * Static list holding the current tasks displayed in the ListView.
     * Making this static can have implications if multiple instances of MainActivity
     * could potentially exist or if data persistence across activity instances is desired
     * without relying on standard Android lifecycle methods like onSaveInstanceState.
     * Consider if a ViewModel or non-static field with proper state handling is more appropriate.
     */
    public static ArrayList<Task> tasksList;
    private TaskAdapter taskAdp;
    private int choose;
    private int activeYear;
    private ValueEventListener vel;
    SharedPreferences settings;

    /**
     * Called when the activity is first created.
     * Initializes views, SharedPreferences, and fetches initial user and task data.
     *
     * @param savedInstanceState If the activity is being re-initialized after
     *                           previously being shut down then this Bundle contains the data it most
     *                           recently supplied in {@link #onSaveInstanceState}.
     *                           <b><i>Note: Otherwise it is null.</i></b>
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        settings = getSharedPreferences("PREFS_NAME",MODE_PRIVATE);
        initViews();
    }

    /**
     * Initializes UI components, sets up the ListView with its adapter,
     * fetches the current user's details, and loads tasks for the active year.
     * <p>
     * A {@link ProgressDialog} is shown while data is being fetched from Firebase.
     * The {@code activeYear} is read from SharedPreferences.
     * A {@link ValueEventListener} is attached to Firebase to listen for real-time
     * updates to the tasks list.
     */
    private void initViews() {
        tVMainHeader = findViewById(R.id.tVMainHeader);
        lVMain = findViewById(R.id.lVMain);

        tasksList = new ArrayList<Task>();
        taskAdp = new TaskAdapter(MainActivity.this, tasksList);
        lVMain.setAdapter(taskAdp);
        lVMain.setOnItemClickListener(this);
        registerForContextMenu(lVMain);
        pd=ProgressDialog.show(this,"Connecting Database","Gathering data...",true);


        activeYear = settings.getInt("activeYear",1970);
        refUsers.child(FBRef.uid).get().addOnCompleteListener(new OnCompleteListener<DataSnapshot>(){
            @Override
            public void onComplete(@NonNull com.google.android.gms.tasks.Task<DataSnapshot> tsk) {
                if (tsk.isSuccessful()) {
                    user = tsk.getResult().getValue(User.class);
                    tVMainHeader.setText("Hi "+user.getUsername()+",\nYour active tasks:");
                }
                else {
                    Log.e("firebase", "Error getting data", tsk.getException());
                }
            }
        });
        vel = new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dS) {
                tasksList.clear();
                for(DataSnapshot dataFull : dS.getChildren()) {
                    for(DataSnapshot dataDate : dataFull.getChildren()) {
                        for(DataSnapshot data : dataDate.getChildren()) {
                            tasksList.add(data.getValue(Task.class));
                        }
                    }
                }
                taskAdp.notifyDataSetChanged();
                if (pd != null) {
                    pd.dismiss();
                }
            }
            @Override
            public void onCancelled(@NonNull DatabaseError error) {}
        };
        refTasks.child(String.valueOf(activeYear)).addValueEventListener(vel);
    }

    /**
     * Called when the activity will start interacting with the user.
     * Re-attaches the Firebase ValueEventListener to ensure data is fresh if
     * the activity was paused and resumed.
     */
    @Override
    protected void onResume() {
        super.onResume();
        refTasks.child(String.valueOf(activeYear)).addValueEventListener(vel);
    }

    /**
     * Called when the system is about to start resuming a previous activity.
     * Removes the Firebase ValueEventListener to prevent unnecessary background updates
     * and potential memory leaks.
     */
    @Override
    protected void onStop() {
        super.onStop();
        refTasks.child(String.valueOf(activeYear)).removeEventListener(vel);
    }

    /**
     * Handles the "Add Task" button click.
     * Navigates to {@link TaskActivity} to allow the user to create a new task.
     * Passes the current {@code activeYear} and a flag indicating it's a new task.
     *
     * @param view The view that was clicked (the "Add Task" button).
     */
    public void addTask(View view) {
        Intent intent = new Intent(this, TaskActivity.class);
        intent.putExtra("isNewTask",true);
        intent.putExtra("activeYear",activeYear);
        startActivity(intent);
    }

    /**
     * Callback method to be invoked when an item in this AdapterView has been clicked.
     * Displays a {@link Toast} message showing the start date of the clicked task.
     *
     * @param parent The AdapterView where the click happened.
     * @param view   The view within the AdapterView that was clicked (this
     *               will be a view provided by the adapter).
     * @param pos    The position of the view in the adapter.
     * @param id     The row id of the item that was clicked.
     */
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int pos, long id) {
        String date = db2Dsiplay(tasksList.get(pos).getDateStart());
        Toast.makeText(this, "Given in "+date, Toast.LENGTH_SHORT).show();
    }

    /**
     * Called when the context menu for a view is about to be shown.
     * This method inflates the context menu with options: "Edit", "Delete", and "Done"
     * for the selected task item in the ListView.
     *
     * @param menu     The context menu that is being built.
     * @param v        The view for which the context menu is being built.
     * @param menuInfo Extra information about the item for which the context menu should be shown.
     *                 This object will vary depending on the class of v.
     */
    @Override
    public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {
        super.onCreateContextMenu(menu, v, menuInfo);
        if (v.getId() == R.id.lVMain) {
            ListView lv = (ListView) v;
            AdapterView.AdapterContextMenuInfo acmi = (AdapterView.AdapterContextMenuInfo) menuInfo;
            choose = acmi.position;
            menu.setHeaderTitle("Choose Action:");
            menu.add("Edit");
            menu.add("Delete");
            menu.add("Done");
        }
    }

    /**
     * This hook is called whenever an item in a context menu is selected.
     * Handles actions for "Edit", "Delete", and "Done".
     * <p>
     * "Edit": Navigates to {@link TaskActivity} with task details to allow editing.
     * "Delete": Removes the task from Firebase.
     * "Done": Moves the task to the "Done_Tasks" node in Firebase. A confirmation dialog
     * is shown if the task is not for the 'full class'.
     *
     * @param item The context menu item that was selected.
     * @return boolean Return false to allow normal context menu processing to
     *         proceed, true to consume it here.
     */
    @Override
    public boolean onContextItemSelected(@NonNull MenuItem item) {
        Log.i("MainActivity", "onContextItemSelected");
        String action = item.getTitle().toString();
        if (action.equals("Edit")) {
            Intent intent = new Intent(this, TaskActivity.class);
            intent.putExtra("isNewTask",false);
            intent.putExtra("activeYear",activeYear);
            intent.putExtra("choose",choose);
            startActivity(intent);
        } else if (action.equals("Delete")) {
            Task task = tasksList.get(choose);
            refTasks.child(String.valueOf(activeYear))
                    .child(String.valueOf(!task.isFullClass()))
                    .child(task.getDateEnd())
                    .child(task.getClassName()+task.getSerNum())
                    .removeValue();
        } else if (action.equals("Done")) {
            Task task = tasksList.get(choose);
            if (!task.isFullClass()){
                AlertDialog.Builder adb =new AlertDialog.Builder(MainActivity.this);
                adb.setTitle("Mark as Done");
                adb.setMessage("The task is only for part of the class.\nAre you sure you want to mark it as Done ?");
                adb.setPositiveButton("Ok",new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        SimpleDateFormat sdfSave = new SimpleDateFormat("yyyyMMdd");
                        String dateSave = sdfSave.format(Calendar.getInstance().getTime());
                        task.setDateChecked(dateSave);
                        refDoneTasks.child(String.valueOf(activeYear)).child(task.getDateEnd()).child(task.getClassName()+task.getSerNum()).setValue(task);
                        refTasks.child(String.valueOf(activeYear))
                                .child(String.valueOf(!task.isFullClass()))
                                .child(task.getDateEnd())
                                .child(task.getClassName()+task.getSerNum())
                                .removeValue();
                        dialog.dismiss();
                    }
                });
                adb.setNeutralButton("Cancel",new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.cancel();
                    }
                });
                adb.setCancelable(false);
                adb.create().show();
            } else {
                SimpleDateFormat sdfSave = new SimpleDateFormat("yyyyMMdd");
                String dateSave = sdfSave.format(Calendar.getInstance().getTime());
                task.setDateChecked(dateSave);
                refDoneTasks.child(String.valueOf(activeYear)).child(task.getDateEnd()).child(task.getClassName()+task.getSerNum()).setValue(task);
                refTasks.child(String.valueOf(activeYear))
                        .child(String.valueOf(!task.isFullClass()))
                        .child(task.getDateEnd())
                        .child(task.getClassName()+task.getSerNum())
                        .removeValue();
                taskAdp.notifyDataSetChanged();
            }
        }
        return super.onContextItemSelected(item);
    }
}
```

{: .page-break-before}
### PresenceActivity.java

*Path: PresenceActivity.java*


```java
package com.example.tasks.Activities;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.util.Pair;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.tasks.Obj.MasterActivity;
import com.example.tasks.R;
import com.example.tasks.SpeechToTextService;
import com.example.tasks.models.Student;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
/// all students is loaded asynchronouly from RTDB during Login, and openning of the
/// PresenceActivity is conditioned by its completion.
import static com.example.tasks.FBRef.allStudents;

/// this is a narrow branch calculated reference.
/// An efficient flat tree branch (3 levels):
/// /P{YY}_{uid}/W{current week}/{MMDDMMM_HHmmL#}/
/// /P25_tTe3W4vIjHe0HSqRXxAIUBxIzKg1/W29/0718Jul_0830L1
/// the month apears twich - 1st for lexicograpic sort, and then for legibility of 18Jul date
/// it holds a lesson report (here the lesson at 0830 is L1 meaning lesson #1 of the day)
import static com.example.tasks.FBRef.refPresUidCurrentWeek;


public class PresenceActivity extends MasterActivity {

    private TextView statusSummaryTextView;
    private TextView disturbanceLabel;

    // Data model to hold each student's current status and disturbances flag
    private Map<String, String> studentStatus = new HashMap<>();
    private Set<String> disturbanceSet = new HashSet<>();

    //private List<Student> allStudents;              // loaded from RTDB
    private Set<String> collectedWords = new HashSet<>();
    List<String> classNicks;
    private String detectedClassName = null;
    private TextView classNameTextView;
    private SpeechToTextService speechService;
    private final List<String> rawTranscripts = new ArrayList<>();

    private TextView transcriptTextView;
    private TextView classNameLabel, missingStudentsLabel;
    private ListView attendanceList;
    private Button btnStart, btnStop, btnDebug;
    private static final int REQUEST_RECORD_AUDIO = 1001;
    private ArrayAdapter<String> adapter;
    private final List<String> mockDetectedNames = Arrays.asList("Alice", "Bob", "Charlie");
    private final List<String> mockMissingNames = Arrays.asList("David", "Eve");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Ensure content takes up full screen (EdgeToEdge behavior)
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_presence);


        // Respect system bars (status/nav bar insets)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        classNameLabel = findViewById(R.id.classNameLabel);
        missingStudentsLabel = findViewById(R.id.missingStudentsLabel);
        transcriptTextView = findViewById(R.id.transcriptTextView);
        attendanceList = findViewById(R.id.attendanceList);
        btnStart = findViewById(R.id.btnStart);
        btnStop = findViewById(R.id.btnStop);
        //btnDebug = findViewById(R.id.btnDebug);
        statusSummaryTextView = findViewById(R.id.statusSummaryTextView);
        disturbanceLabel = findViewById(R.id.disturbanceLabel);

        //updateStatusUI("some data", "some data2");

        // Prepare list adapter for final results
        adapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_list_item_1,
                new java.util.ArrayList<>()
        );
        attendanceList.setAdapter(adapter);

        /// The speech service will do Speech To Text and after accumulating some names
        /// will identify which class they belong to, and display the data of
        /// the names that are yet to be read and accounted for.
        /// all this is stored in RTDB
        /// in an efficient flat tree branch (3 levels):
        /// /P{YY}_{uid}/W{current week}/{MMDDMMM_HHmmL#}/
        /// /P25_tTe3W4vIjHe0HSqRXxAIUBxIzKg1/W29/0718Jul_0650L-1/
        /// the storage topology is aimed at give the teacher a NARROW branch to look at (the Week level)
        /// instead of a monthly or yearly view which contains too many reports.
        speechService = new SpeechToTextService(this,
                new SpeechToTextService.OnSpeechRecognizedListener() {
                    @Override
                    public void onPartialResults(String text) {
                        runOnUiThread(() -> transcriptTextView.setText(text));
                    }

                    @Override
                    public void onResults(String text) {
                        runOnUiThread(() -> {
                            // 1. Timestamp + push to UI & RTDB
                            String ts = new SimpleDateFormat("HH:mm:ss", Locale.getDefault())
                                    .format(new Date());
                            String entry = "[" + ts + "] " + text;
                            adapter.add(entry);
                            rawTranscripts.add(entry);

                            /// 2. we need this collection to be able to compare against nicknames
                            /// what we do is: Split into words, normalize, collect
                            /// later on the collected words will be used by detectClass
                            /// to identify the class.
                            for (String w : text.split("\\s+")) {
                                String norm = w
                                        .replaceAll("[^\\p{L}\\p{Nd}]", "")      // strip punctuation
                                        .toLowerCase(Locale.getDefault());
                                if (!norm.isEmpty()) {
                                    collectedWords.add(norm);
                                }
                            }

                            /// 3. Once we have enough words, try to detect class
                            /// here - we meet the entry condition for detectClass() >= 8 >= 6
                            /// so we try detecting againts the collectedWords
                            if (detectedClassName == null && collectedWords.size() > 3 &&
                                    detectClass()) { // run onces
                                classNameLabel.setText("כיתה: " + detectedClassName);

                                // build list of this class’s nicknames
                                classNicks = new ArrayList<>();
                                for (Student s : allStudents) {
                                    if (detectedClassName.equals(s.getClassName())) {
                                        classNicks.add(s.getNickName());
                                    }
                                }
                            }

                            if (classNicks != null) {
                                // filter out the ones we heard
                                List<String> missing = new ArrayList<>();
                                for (String nick : classNicks) {
                                    /// now that we have the class's nicknames
                                    /// we can check which names are missing (i.e. teacher has not
                                    /// called out their name - and they may be present).
                                    if (!collectedWords.contains(nick.toLowerCase(Locale.getDefault()))) {
                                        missing.add(nick);
                                    }
                                }

                                /// This red missingStudentsLabel will keep getting updated
                                /// again and again (each time teacher stops talking) and will
                                /// become smaller and smaller
                                /// Eventually, the teacher has every student accounted for
                                /// and all is stored in DB.
                                /// /class: יוד571
                                /// /rawTranscript/
                                /// [08:31:15] נאיה אלה הילה
                                /// [08:31:22] ארז יותם יובל
                                /// [08:31:27] אורי נועם עומר
                                /// while this data may seem useless (inaccurate) it can be
                                /// reverse mapped to the Student's id, so this is in fact
                                /// both legible and useful.
                                String missingText = missing.isEmpty()
                                        ? "לא דווחו: כל התלמידים"
                                        : "לא דווחו: " + TextUtils.join(", ", missing);
                                missingStudentsLabel.setText(missingText);

                                analyzeTranscriptLine(text); // send text for special anaysis for being late / missing etc.

                                pushRawTranscript(entry);
                            }

                            //pushRawTranscript(entry);
                        });
                    }
                }
        );

        // 🧪 Hook debug button
        //btnDebug.setOnClickListener(v -> populateMockData());

        // 🔊 Start recognition
        btnStart.setOnClickListener(v -> {
            if (ContextCompat.checkSelfPermission(this,
                    Manifest.permission.RECORD_AUDIO)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.RECORD_AUDIO},
                        REQUEST_RECORD_AUDIO);
            } else {
                transcriptTextView.setText(""); // clear on new session
                speechService.startRecognition();
                btnStop.setEnabled(true);
            }
        });

        // 🔇 Stop recognition
        btnStop.setOnClickListener(v -> {
            speechService.stopRecognition();
            btnStop.setEnabled(false);
        });
    }

    /// was used in the dev process before Speech was introduced.
    private void uploadMockDataToFirebase() {
        // 🗓 Get current time
        Calendar now = Calendar.getInstance();

        // 🔢 Build key parts
        int week = now.get(Calendar.WEEK_OF_YEAR);
        String weekStr = "W" + week;

        String MMdd = String.format("%02d%02d", now.get(Calendar.MONTH) + 1, now.get(Calendar.DAY_OF_MONTH));
        String MMM = new SimpleDateFormat("MMM", Locale.ENGLISH).format(now.getTime());

        Pair<String, Integer> lessonInfo = getRoundedTimeAndLessonSlot(Calendar.getInstance());
        String roundedHHmm = lessonInfo.first;
        int lesson = lessonInfo.second;

        if (lesson == -1) {
            Log.e("PresenceActivity", "Time not in valid school hours");
            return;
        }
        String timestampAndLesson = MMdd + MMM + "_" + roundedHHmm + "L" + lesson;




        // 🔄 MOCK Data payload
        Map<String, Object> payload = new HashMap<>();
        payload.put("class", "יוד571");

        payload.put("statusSummary", statusSummaryTextView.getText().toString());
        payload.put("disturbances", disturbanceLabel.getText().toString());

        payload.put("rawTranscript", rawTranscripts);
        //payload.put("timestamp", System.currentTimeMillis());

        // 🪄 Write using the clean FBRef
        refPresUidCurrentWeek
                .child(timestampAndLesson)
                .setValue(payload)
                .addOnSuccessListener(unused -> Log.i("PresenceActivity", "Upload success"))
                .addOnFailureListener(e -> Log.e("PresenceActivity", "Upload failed", e));
    }


    /// was used in the dev process before speech was introduced.
    /// to work with this you need to revive the btnDebug that was
    /// btn deleted on build of 18Jul 07:48am
    private void populateMockData() {
        // Set class name
        classNameLabel.setText("כיתה: יוד571");

        // set raw data too:
        rawTranscripts.clear();
        rawTranscripts.add("Alice is present");
        rawTranscripts.add("Bob is also here");
        rawTranscripts.add("I think Charlie said something funny");


        // Set detected names
        StringBuilder detected = new StringBuilder("Recorded Names:");
        for (String name : mockDetectedNames) {
            detected.append("\n• ").append(name);
        }

        // Set missing students
        StringBuilder missing = new StringBuilder("לא דווחו:");
        for (String name : mockMissingNames) {
            missing.append("\n• ").append(name);
        }
        missingStudentsLabel.setText(missing.toString());

        // Fill attendance list
        ArrayAdapter<String> adapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_list_item_1,
                mockDetectedNames
        );
        attendanceList.setAdapter(adapter);

        // Store timestamp for Firebase (not shown yet)
        String isoDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss", Locale.getDefault())
                .format(new Date());
        Log.d("PresenceActivity", "Simulated date: " + isoDate);

        // 🔜 Next: send this data to Firebase RTDB
        uploadMockDataToFirebase();
    }

    /**
     * TEMPORARY: Heuristic to calculate lesson number (L#) from current time.
     * Assumes:
     * - First lesson starts at 08:30
     * - Each lesson is 50 minutes
     * - Round to the nearest lesson slot using ±25 min tolerance
     * <p>
     * NOTE: This logic will be replaced:
     * - First with school-specific if-clauses
     * - Then later with profile info from teacher's settings
     */
    /**
     * TEMPORARY: Determine rounded time and lesson number based on current time.
     * Assumes:
     * - L1 starts at 08:30
     * - 50-minute slots (roughly covers for intermissions)
     * - Round to nearest slot start using ±25 min
     * 💡 A more robust solution could work againt a list of start/end tuples representing school day schedules
     *
     * @param now current time
     * @return Pair of ("HHmm" rounded start time string, lesson number), or (-1) if out of range
     */
    public static Pair<String, Integer> getRoundedTimeAndLessonSlot(Calendar now) {
        int totalMinutes = now.get(Calendar.HOUR_OF_DAY) * 60 + now.get(Calendar.MINUTE);

        int baseStart = 8 * 60 + 30; // 08:30 in minutes
        int maxLessons = 20;
        int lessonDuration = 50;

        int minValid = baseStart - 25;
        int maxValid = baseStart + lessonDuration * (maxLessons - 1) + 25;
// I prefer all hours of the day return some result and not -1.
//        if (totalMinutes < minValid || totalMinutes > maxValid) {
//            return new Pair<>(null, -1);  // outside school time
//        }

        int roundedIndex = Math.round((totalMinutes - baseStart) / (float) lessonDuration);
        int lessonStartMinutes = baseStart + roundedIndex * lessonDuration;

        int hour = lessonStartMinutes / 60;
        int minute = lessonStartMinutes % 60;
        String roundedHHmm = String.format("%02d%02d", hour, minute);

        return new Pair<>(roundedHHmm, roundedIndex + 1);
    }


    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String[] permissions,
                                           int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_RECORD_AUDIO) {
            if (grantResults.length > 0
                    && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                speechService.startRecognition();
            } else {
                Toast.makeText(this,
                        "Microphone permission is required",
                        Toast.LENGTH_SHORT).show();
            }
        }
    }

    /**
     * 🔄 Pushes a single transcript entry to RTDB using rounded-time + lesson key
     * /P{YY}_{uid}/W{current week}/{MMDDMMM_HHmmL#}/
     * /P25_tTe3W4vIjHe0HSqRXxAIUBxIzKg1/W29/0718Jul_0830L1
     */
    private void pushRawTranscript(String newEntry) {
        // 🗓 Get current time
        Calendar now = Calendar.getInstance();

        // 🔢 Build key parts
        int week = now.get(Calendar.WEEK_OF_YEAR);
        String weekStr = "W" + week;

        String MMdd = String.format(Locale.getDefault(), "%02d%02d",
                now.get(Calendar.MONTH) + 1,
                now.get(Calendar.DAY_OF_MONTH)
        );
        String MMM = new SimpleDateFormat("MMM", Locale.ENGLISH)
                .format(now.getTime());

        Pair<String, Integer> lessonInfo = getRoundedTimeAndLessonSlot(now);
        String roundedHHmm = lessonInfo.first;
        int lesson = lessonInfo.second;
        if (lesson == -4) {
            Log.e("PresenceActivity", "Time not in valid school hours");
            return;
        }
        String timestampAndLesson = MMdd + MMM + "_" + roundedHHmm + "L" + lesson;

        // 🔄 Data payload
        Map<String, Object> payload = new HashMap<>();
        payload.put("class", detectedClassName);

        payload.put("statusSummary", statusSummaryTextView.getText().toString());
        payload.put("disturbances", disturbanceLabel.getText().toString());

        //payload.put("detected", rawTranscripts);
        //payload.put("missing", new ArrayList<>());
        payload.put("rawTranscript", rawTranscripts);
        //payload.put("timestamp", System.currentTimeMillis());

        // 🪄 Write using the clean FBRef
        refPresUidCurrentWeek
                .child(timestampAndLesson)
                .setValue(payload)
                .addOnSuccessListener(unused -> Log.i("PresenceActivity", "Upload success"))
                .addOnFailureListener(e -> Log.e("PresenceActivity", "Upload failed", e));
    }


    /**
     * 🔍 identifying the most probable class.
     */
    private Boolean detectClass() {
        // 1. Build map of ClassName → count
        Map<String, Integer> classMatches = new HashMap<>();
        for (Student s : allStudents) {
            classMatches.putIfAbsent(s.getClassName(), 0);
        }

        /// 2. For each class, count how many nicknames appear
        ///  this is just counting how many times each nickname appears
        for (String cls : new ArrayList<>(classMatches.keySet())) {
            int count = 0;
            for (Student s : allStudents) {
                if (!s.getClassName().equals(cls)) continue;
                String nick = s.getNickName().toLowerCase(Locale.ROOT);
                if (collectedWords.contains(nick)) {
                    count++;
                }
            }
            classMatches.put(cls, count);
        }

        // 3. Find best match - identifying the most probable class.
        String bestClass = null;
        int bestCount = 0;
        for (Map.Entry<String, Integer> e : classMatches.entrySet()) {
            if (e.getValue() > bestCount) {
                bestCount = e.getValue();
                bestClass = e.getKey();
            }
        }

        // 4. If we have at least one hit, update UI once
        if (bestCount >= 1 && detectedClassName == null) {
            detectedClassName = bestClass;
            runOnUiThread(() ->
                    classNameLabel.setText("כיתה: " + detectedClassName)
            );
            return true;
        }
        return false;
    }

    /**
     * Parses a single transcript line and updates student statuses.
     * Call this inside onResults() for each new full transcript.
     */
    private void analyzeTranscriptLine(String line) {
        // Normalize line
        String text = line.trim();
        if (text.isEmpty()) return;

        // Determine category keyword and student names
        String[] tokens = text.split("\\s+");
        String keyword = tokens[0];
        List<String> names = Arrays.asList(Arrays.copyOfRange(tokens, 1, tokens.length));

        // Map Hebrew keyword to status
        String status;
        switch (keyword) {
            case "בזמן":
                status = "בזמן";
                break;
            case "איחור":
                status = "מאחרים";
                break;
            case "מאחרים":
                status = "מאחרים";
                break;
            case "חיסור":
                status = "חסרים";
            case "חסרים":
                status = "חסרים";
                break;
            case "חסרות" /* alternative form */:
                status = "חסרים";
                break;
            case "חסרה":
                status = "חסרים";
                break;
            case "חולים":
                status = "מחלה";
                break;
            case "הפרעה":
                // disturbance only, keep existing status
                disturbanceSet.addAll(names);
                updateUI();
                return;
            default:
                return; // unrecognized
        }

        // Update each student
        for (String name : names) {
            // If clearing (בזמן), remove disturbance flag and reset status only for these names
            if (status.equals("בזמן")) {
                studentStatus.put(name, "בזמן");
                //disturbanceSet.remove(name);
            } else {
                // For lateness, always overwrite missing
                studentStatus.put(name, status);
            }
        }

        // Refresh UI after each line
        updateUI();
    }

    /**
     * Builds the summary strings and updates the TextViews.
     */
    private void updateUI() {
        // Group by status
        Map<String, List<String>> grouped = new HashMap<>();
        for (Map.Entry<String, String> e : studentStatus.entrySet()) {
            grouped.computeIfAbsent(e.getValue(), k -> new ArrayList<>()).add(e.getKey());
        }

        // Build status summary
        StringBuilder summary = new StringBuilder();
        for (String key : Arrays.asList("בזמן", "מאחרים", "חסרים", "מחלה")) {
            List<String> list = grouped.get(key);
            if (list != null && !list.isEmpty()) {
                summary.append(key).append(": ").append(TextUtils.join(", ", list)).append("\n");
            }
        }

        // Build disturbance summary
        String disturbanceText = disturbanceSet.isEmpty()
                ? "הפרעות: אין"
                : "הפרעות: " + TextUtils.join(", ", disturbanceSet);

        // Apply to UI
        statusSummaryTextView.setText(summary.toString().trim());
        disturbanceLabel.setText(disturbanceText);
    }

    // In onResults(String text):
    // for (String line : text.split("\\r?\\n")) {
    //     analyzeTranscriptLine(line);
    // }

//    /**
//     * Call this from your transcript update logic to refresh the UI
//     */
//    private void updateStatusUI(String summary, String disturbances) {
//        statusSummaryTextView.setText(summary);
//        disturbanceLabel.setText(disturbances);
//    }
}
```

{: .page-break-before}
### ProfileActivity.java

*Path: ProfileActivity.java*

```java
package com.example.tasks.Activities;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;

import com.example.tasks.Obj.MasterActivity;
import com.example.tasks.R;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.io.ByteArrayOutputStream;
import java.util.Arrays;
import java.util.List;

public class ProfileActivity extends MasterActivity {
    // ① Define a launcher for taking a picture thumbnail:
    private ActivityResultLauncher<Void> takePictureLauncher;
    private TextView tvStudentsSheetLink; // link to the students google sheet.
    private static final int REQ_PHOTO = 123;
    private EditText usernameEdit;
    private Spinner activeYearSpinner;
    private Spinner defaultScreenSpinner;
    private Button takePictureBtn;
    private ImageView profileImage;

    private DatabaseReference userRef;
    private FirebaseUser currentUser;
    private boolean isSpinnersLoaded = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        // findViewById
        tvStudentsSheetLink = findViewById(R.id.tvStudentsSheetLink);
        // Views
        usernameEdit = findViewById(R.id.usernameEdit);
        activeYearSpinner = findViewById(R.id.activeYearSpinner);
        defaultScreenSpinner = findViewById(R.id.defaultScreenSpinner);
        takePictureBtn = findViewById(R.id.takePictureBtn);
        profileImage = findViewById(R.id.profileImage);

        // Firebase refs
        currentUser = FirebaseAuth.getInstance().getCurrentUser();
        userRef = FirebaseDatabase.getInstance()
                .getReference("Users")
                .child(currentUser.getUid());

        // Populate spinners
        List<String> years = Arrays.asList("2023", "2024", "2025", "2026");
        ArrayAdapter<String> yearAdapter = new ArrayAdapter<>(
                this, android.R.layout.simple_spinner_item, years);
        yearAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        activeYearSpinner.setAdapter(yearAdapter);

        List<String> screens = Arrays.asList("Presence", "Reports", "Profile", "Task", "MainTask");
        ArrayAdapter<String> screenAdapter = new ArrayAdapter<>(
                this, android.R.layout.simple_spinner_item, screens);
        screenAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        defaultScreenSpinner.setAdapter(screenAdapter);

        // Listeners for saving (ignore initial selections)
        activeYearSpinner.setOnItemSelectedListener(new SimpleItemSelectedListener() {
            @Override
            public void onItemSelected(String value) {
                if (isSpinnersLoaded) {
                    userRef.child("activvvYear").setValue(value);
                }
            }
        });
        defaultScreenSpinner.setOnItemSelectedListener(new SimpleItemSelectedListener() {
            @Override
            public void onItemSelected(String value) {
                if (isSpinnersLoaded) {
                    userRef.child("preferredActivity").setValue(value);
                }
            }
        });

        // Load existing data
        loadProfile();

        // ② Register the launcher BEFORE you call it:
        takePictureLauncher = registerForActivityResult(
                new ActivityResultContracts.TakePicturePreview(),
                bitmap -> {
                    if (bitmap != null) {
                        // Display immediately
                        profileImage.setImageBitmap(bitmap);
                        // And push to RTDB as Base64
                        uploadImage(bitmap);
                    }
                }
        );

        // ③ Wire your button to launch the camera:
        takePictureBtn.setOnClickListener(v -> {
            takePictureLauncher.launch(null);
        });
    }

    private void loadProfile() {
        userRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snap) {
                // Username
                String uname = snap.child("username").getValue(String.class);
                if (uname != null) usernameEdit.setText(uname);

                // Active year: new key then fallback
                String year = snap.child("activvvYear").getValue(String.class);
                if (year == null) {
                    year = snap.child(currentUser.getUid()).getValue(String.class);
                    if (year != null) {
                        userRef.child("activvvYear").setValue(year);
                    }
                }
                if (year != null) {
                    ArrayAdapter<String> adapter = (ArrayAdapter<String>) activeYearSpinner.getAdapter();
                    int pos = adapter.getPosition(year);
                    if (pos >= 0) activeYearSpinner.setSelection(pos);
                }

                // Default screen
                String screen = snap.child("preferredActivity").getValue(String.class);
                if (screen != null) {
                    ArrayAdapter<String> adapter2 = (ArrayAdapter<String>) defaultScreenSpinner.getAdapter();
                    int pos2 = adapter2.getPosition(screen);
                    if (pos2 >= 0) defaultScreenSpinner.setSelection(pos2);
                }

                // Profile image
                String b64 = snap.child("b64jpg").getValue(String.class);
                if (b64 != null) {
                    byte[] data = Base64.decode(b64, Base64.DEFAULT);
                    profileImage.setImageBitmap(BitmapFactory.decodeByteArray(data, 0, data.length));
                }

                // Students Sheet URL
                String sheetUrl = snap.child("studentsSheetUrl").getValue(String.class);
                if (sheetUrl != null && !sheetUrl.isEmpty()) {
                    // הצגת טקסט תיאורי במקום ה-URL הארוך
                    tvStudentsSheetLink.setText(R.string.string_link_google_sheet);
                    tvStudentsSheetLink.setVisibility(View.VISIBLE);
                    tvStudentsSheetLink.setOnClickListener(v -> {
                        Intent browserIntent = new Intent(Intent.ACTION_VIEW,
                                Uri.parse(sheetUrl));
                        startActivity(browserIntent);
                    });
                }

                // Now allow spinner callbacks to write changes
                isSpinnersLoaded = true;
            }


            @Override
            public void onCancelled(@NonNull DatabaseError error) {
            }
        });
    }

    // Utility to encode and upload image
    private void uploadImage(Bitmap bmp) {
        // Your existing code: compress → Base64 → write to "b64jpg"
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.JPEG, /*quality*/80, baos);
        String b64 = Base64.encodeToString(baos.toByteArray(), Base64.DEFAULT);
        FirebaseDatabase
                .getInstance()
                .getReference("Users")
                .child(FirebaseAuth.getInstance().getUid())
                .child("b64jpg")
                .setValue(b64);
    }

    // Spinner helper
    private abstract static class SimpleItemSelectedListener implements android.widget.AdapterView.OnItemSelectedListener {
        @Override
        public void onNothingSelected(android.widget.AdapterView<?> parent) {
        }

        @Override
        public void onItemSelected(android.widget.AdapterView<?> parent, View view, int pos, long id) {
            onItemSelected(parent.getItemAtPosition(pos).toString());
        }

        public abstract void onItemSelected(String value);
    }
}

```

{: .page-break-before}
### ReportsActivity.java

*Path: ReportsActivity.java*

```java
package com.example.tasks.Activities;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.example.tasks.Obj.MasterActivity;
import com.example.tasks.R;

public class ReportsActivity extends MasterActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_reports);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
}
```

{: .page-break-before}
### TaskActivity.java

*Path: TaskActivity.java*

```java
package com.example.tasks.Activities;

import static com.example.tasks.FBRef.refTasks;
import static com.example.tasks.FBRef.refYears;
import static com.example.tasks.Utilities.db2Dsiplay;

import androidx.annotation.NonNull;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.os.Bundle;
import android.text.InputType;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.tasks.FBRef;
import com.example.tasks.Obj.MasterActivity;
import com.example.tasks.Obj.Task;
import com.example.tasks.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.firebase.database.DataSnapshot;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

/**
 * @author		Albert Levy albert.school2015@gmail.com
 * @version     2.1
 * @since		9/3/2024
 * <p>
 * Activity for creating a new task or editing an existing one.
 * <p>
 * This activity extends {@link MasterActivity} to inherit its common options menu.
 * It provides a form for users to input task details such as class name,
 * task number (serial number), start date, due date, and whether the task
 * applies to the full class.
 * <p>
 * Features:
 * <ul>
 *     <li>Supports both creating new tasks and editing existing tasks.</li>
 *     <li>Uses {@link DatePickerDialog} for selecting start and due dates.</li>
 *     <li>Populates a {@link Spinner} with class names fetched from Firebase for the active year.</li>
 *     <li>Validates that required data (dates, class name, task number) is provided.</li>
 *     <li>Saves new tasks or updates existing tasks in Firebase Realtime Database
 *         under the appropriate path based on the active year and task details.</li>
 *     <li>Prevents creation of duplicate tasks (based on current implementation of {@code Task.isIn()}).</li>
 * </ul>
 * The UI and button text ("Add Task" vs. "Set Task") change dynamically based on
 * whether the activity is in "new task" or "edit task" mode.
 *
 * @see MasterActivity
 * @see Task
 * @see DatePickerDialog
 * @see ArrayAdapter
 * @see FBRef
 */
public class TaskActivity extends MasterActivity implements AdapterView.OnItemSelectedListener {

    private TextView tVTaskHeader, tVStartDate, tVDueDate;
    private Spinner spClass;
    private EditText eTTaskNum;
    private CheckBox cbFullClass;
    private Button btnTask;
    private Intent gi;
    private boolean isNewTask, setDueDate;
    private String className, startDate, dueDate, serNum;
    private int activeYear;
    private int choose;
    private Task task;
    private ArrayList<String> classList;
    private ArrayAdapter<String> adp;

    /**
     * Called when the activity is first created.
     * Initializes views, retrieves intent extras, and fetches class data for the spinner.
     *
     * @param savedInstanceState If the activity is being re-initialized after
     *                           previously being shut down then this Bundle contains the data it most
     *                           recently supplied in {@link #onSaveInstanceState}.
     *                           <b><i>Note: Otherwise it is null.</i></b>
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_task);
        initViews();
        refYears.child(String.valueOf(activeYear)).get().addOnCompleteListener(new OnCompleteListener<DataSnapshot>(){
            @Override
            public void onComplete(@NonNull com.google.android.gms.tasks.Task<DataSnapshot> tsk) {
                if (tsk.isSuccessful()) {
                    DataSnapshot dS = tsk.getResult();
                    classList.clear();
                    classList.add("Choose class:");
                    for(DataSnapshot data : dS.getChildren()) {
                        classList.add(data.getValue(String.class));
                    }
                    adp.notifyDataSetChanged();
                    if (!isNewTask){
                        spClass.setSelection(classList.indexOf(task.getClassName()));
                    }
                }
                else {
                    Log.e("firebase", "Error getting data", tsk.getException());
                }
            }
        });
    }

    /**
     * Initializes UI components, retrieves data from the calling intent,
     * and sets up the UI elements based on whether a new task is being created
     * or an existing one is being edited.
     * <p>
     * For new tasks, fields are empty. For editing tasks, fields are pre-populated
     * with the existing task's details. Some fields like start date and task number
     * are made non-editable when editing an existing task.
     */
    private void initViews() {
        tVTaskHeader = findViewById(R.id.tVTaskHeader);
        spClass = findViewById(R.id.spClass);
        tVStartDate = findViewById(R.id.tVStartDate);
        tVDueDate = findViewById(R.id.tVDueDate);
        eTTaskNum = findViewById(R.id.eTTaskNum);
        cbFullClass = findViewById(R.id.cbFullClass);
        btnTask = findViewById(R.id.btnTask);
        gi = getIntent();
        activeYear = gi.getIntExtra("activeYear",1970);
        if (activeYear == 1970) {
            Toast.makeText(this, "Wrong data sent", Toast.LENGTH_LONG).show();
            finish();
        }
        isNewTask = gi.getBooleanExtra("isNewTask",true);
//        if (!isNewTask){
//            choose = gi.getIntExtra("choose",-1);
//            task = MainActivity.tasksList.get(choose);
//        }
        if (isNewTask) {
            tVTaskHeader.setText("Add new Task");
            btnTask.setText("Add Task");
        } else {
            choose = gi.getIntExtra("choose",-1);
            task = MainActivity.tasksList.get(choose);
            tVTaskHeader.setText("Edit Task");
            startDate = task.getDateStart();
            tVStartDate.setText(db2Dsiplay(task.getDateStart()));
            tVStartDate.setClickable(false);
            dueDate = task.getDateEnd();
            tVDueDate.setText(db2Dsiplay(task.getDateEnd()));
            eTTaskNum.setText(task.getSerNum());
            eTTaskNum.setEnabled(false);
            eTTaskNum.setInputType(InputType.TYPE_NULL);
            cbFullClass.setChecked(task.isFullClass());
            btnTask.setText("Set Task");
        }
        classList = new ArrayList<String>();
        classList.add("Choose class:");
        adp = new ArrayAdapter<>(TaskActivity.this,
                android.R.layout.simple_spinner_dropdown_item, classList);
        spClass.setAdapter(adp);
        spClass.setOnItemSelectedListener(this);
    }


    /**
     * Handles clicks on the start date or due date TextViews to open a {@link DatePickerDialog}.
     * Sets a flag {@code setDueDate} to indicate which date field is being selected.
     *
     * @param view The TextView (start date or due date) that was clicked.
     */
    public void datePick(View view) {
        if (view.getId() == R.id.tVDueDate){
            setDueDate = true;
        } else {
            setDueDate = false;
        }
        openDatePickerDialog();
    }

    /**
     * Opens a {@link DatePickerDialog} allowing the user to select a date.
     * The dialog is initialized with the current system date.
     * The selected date is handled by {@link #onDateSetListener}.
     */
    private void openDatePickerDialog() {
        Calendar calNow = Calendar.getInstance();

        DatePickerDialog datePickerDialog = new DatePickerDialog(this, onDateSetListener,
                calNow.get(Calendar.YEAR),
                calNow.get(Calendar.MONTH),
                calNow.get(Calendar.DAY_OF_MONTH));
        datePickerDialog.setTitle("Choose date");
        datePickerDialog.show();
    }
    /**
     * Listener for handling date selection from the {@link DatePickerDialog}.
     * <p>
     * When a date is set, it updates either the {@code startDate} or {@code dueDate}
     * field and the corresponding TextView, based on the {@code setDueDate} flag.
     * Dates are stored in "yyyyMMdd" format and displayed in "dd-MM-yyyy" format.
     */
    DatePickerDialog.OnDateSetListener onDateSetListener = new DatePickerDialog.OnDateSetListener() {
        @Override
        public void onDateSet(DatePicker view, int year, int month, int dayOfMonth) {
            Calendar calNow = Calendar.getInstance();
            Calendar calSet = (Calendar) calNow.clone();

            calSet.set(Calendar.YEAR, year);
            calSet.set(Calendar.MONTH, month);
            calSet.set(Calendar.DAY_OF_MONTH, dayOfMonth);

            SimpleDateFormat sdfSave = new SimpleDateFormat("yyyyMMdd");
            String dateSave = sdfSave.format(calSet.getTime());
            if (setDueDate) {
                dueDate = dateSave;
                tVDueDate.setText(db2Dsiplay(dateSave));
            } else {
                startDate = dateSave;
                tVStartDate.setText(db2Dsiplay(dateSave));
            }
        }
    };

    /**
     * Handles the confirmation (Add/Set Task button click).
     * Validates input fields. If all required data is present:
     * <ul>
     *     <li>For new tasks: Creates a new {@link Task} object and saves it to Firebase,
     *         checking for duplicates first.</li>
     *     <li>For existing tasks: Updates the existing task in Firebase. This involves
     *         removing the old task entry and adding the updated one, especially if
     *         key details like due date or 'full class' status (which affect path) change.</li>
     * </ul>
     * Finishes the activity upon successful save/update.
     *
     * @param view The view that was clicked (the confirmation button).
     */
    public void confirmation(View view) {
        int taskNum = Integer.parseInt(eTTaskNum.getText().toString());
        serNum = String.format("%02d",taskNum);
        if (startDate == null || dueDate == null || className == null || serNum == null) {
            Toast.makeText(this, "Missing data", Toast.LENGTH_SHORT).show();
        } else {
            Task newTask = new Task(startDate, dueDate,className, serNum, activeYear, cbFullClass.isChecked());
            if (!isNewTask) {
                refTasks.child(String.valueOf(activeYear))
                        .child(String.valueOf(!task.isFullClass()))
                        .child(task.getDateEnd())
                        .child(task.getClassName()+task.getSerNum())
                        .removeValue();
                refTasks.child(String.valueOf(activeYear))
                        .child(String.valueOf(!cbFullClass.isChecked()))
                        .child(dueDate)
                        .child(className+serNum)
                        .setValue(newTask);
                finish();
            } else if (newTask.isIn(MainActivity.tasksList)) {
                Toast.makeText(this, "Task already exist!", Toast.LENGTH_SHORT).show();
            } else {
                refTasks.child(String.valueOf(activeYear))
                        .child(String.valueOf(!cbFullClass.isChecked()))
                        .child(dueDate)
                        .child(className+serNum)
                        .setValue(newTask);
                finish();
            }
        }
    }


    /**
     * Callback method to be invoked when an item in the class {@link Spinner} has been selected.
     * Updates the {@code className} field if a valid class (not the default prompt) is selected.
     *
     * @param parent   The AdapterView where the selection happened.
     * @param view     The view within the AdapterView that was clicked.
     * @param pos      The position of the view in the adapter.
     * @param id       The row id of the item that was selected.
     */
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int pos, long id) {
        if (pos != 0) {
            className = classList.get(pos);
        }
    }

    /**
     * Callback method to be invoked when the selection disappears from the class {@link Spinner}.
     * This might happen when there are no items to select, or the adapter becomes empty.
     * Shows a {@link Toast} message.
     *
     * @param parent The AdapterView that now contains no selected item.
     */
    @Override
    public void onNothingSelected(AdapterView<?> parent) {
        Toast.makeText(this, "Nothing selected...", Toast.LENGTH_SHORT).show();
    }
}
```

{: .page-break-before}
### YearsActivity.java

*Path: YearsActivity.java*

```java
package com.example.tasks.Activities;

import static com.example.tasks.FBRef.*;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.InputType;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.tasks.FBRef;
import com.example.tasks.Obj.MasterActivity;
import com.example.tasks.R;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.Calendar;

/**
 * @author		Albert Levy albert.school2015@gmail.com
 * @version     2.1
 * @since		9/3/2024
 * <p>
 * Activity for managing academic years and associated classes.
 * <p>
 * This activity allows users to view, add, and select academic years. For each selected year,
 * users can also view and add classes they teach. It plays a crucial role in setting up
 * the application for new users by prompting them to add their first year and class.
 * For existing users, it allows switching between active years or adding new ones.
 * <p>
 * Features:
 * <ul>
 *     <li>Displays a {@link Spinner} to select an academic year.</li>
 *     <li>Displays a {@link ListView} to show classes for the selected year.</li>
 *     <li>Allows adding new academic years via an {@link AlertDialog}.</li>
 *     <li>Allows adding new classes for the currently selected year via an {@link AlertDialog}.</li>
 *     <li>Handles initial setup for new users, forcing them to add a year and class.</li>
 *     <li>Saves the selected active year to {@link SharedPreferences} for existing users.</li>
 *     <li>Returns the selected active year to {@link LoginActivity} for new users.</li>
 *     <li>Interacts with Firebase Realtime Database to store and retrieve year and class data.</li>
 *     <li>Implements context menu (via {@link #onItemClick} on ListView) for deleting classes.</li>
 * </ul>
 *
 * @see MasterActivity
 * @see SharedPreferences
 * @see AlertDialog
 * @see FBRef
 */
public class YearsActivity extends MasterActivity implements AdapterView.OnItemSelectedListener,
        AdapterView.OnItemClickListener {
    private Spinner spYears;
    private ListView lVClasses;
    private Intent gi;
    private boolean isNewUser;
    private int activeYear, newYear;
    private String newClass;
    private ArrayList<Integer> years;
    private ArrayList<String> classes;
    private ArrayAdapter<Integer> yearsAdp;
    private ArrayAdapter<String> classesAdp;
    private ValueEventListener velYears = new ValueEventListener() {
        /**
         * Called when data for the list of years changes in Firebase.
         * Updates the {@code years} ArrayList and notifies the {@code yearsAdp} to refresh the spinner.
         * Sets the spinner selection to the {@code activeYear} if it's valid.
         *
         * @param dS The DataSnapshot containing the updated list of years.
         */
        @Override
        public void onDataChange(@NonNull DataSnapshot dS) {
            years.clear();
            for(DataSnapshot data : dS.getChildren()) {
                years.add(Integer.parseInt(data.getKey()));
            }
            yearsAdp.notifyDataSetChanged();
            if (activeYear != 1970) {
                spYears.setSelection(years.indexOf(activeYear));
            }
        }
        @Override
        public void onCancelled(@NonNull DatabaseError error) {}
    };
    private ValueEventListener velClass = new ValueEventListener() {
        /**
         * Called when data for the list of classes for the {@code activeYear} changes in Firebase.
         * Updates the {@code classes} ArrayList and notifies the {@code classesAdp} to refresh the ListView.
         *
         * @param dS The DataSnapshot containing the updated list of classes for the active year.
         */
        @Override
        public void onDataChange(@NonNull DataSnapshot dS) {
            classes.clear();
            for(DataSnapshot data : dS.getChildren()) {
                classes.add(data.getValue(String.class));
            }
            classesAdp.notifyDataSetChanged();
        }
        @Override
        public void onCancelled(@NonNull DatabaseError error) {}
    };
    private SharedPreferences settings;

    /**
     * Called when the activity is first created.
     * Initializes views, SharedPreferences, and sets up the initial state
     * based on whether the user is new or existing.
     *
     * @param savedInstanceState If the activity is being re-initialized after
     *                           previously being shut down then this Bundle contains the data it most
     *                           recently supplied in {@link #onSaveInstanceState}.
     *                           <b><i>Note: Otherwise it is null.</i></b>
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_years);

        settings = getSharedPreferences("PREFS_NAME",MODE_PRIVATE);
        initViews();
    }

    /**
     * Initializes all UI view components and their adapters.
     * Retrieves intent extras to determine if the user is new.
     * If the user is new, it sets a default {@code activeYear} and immediately prompts
     * to add a new year. Otherwise, it loads the previously active year from SharedPreferences.
     */
    private void initViews() {
        spYears = findViewById(R.id.spYears);
        lVClasses = findViewById(R.id.lVClasses);
        years = new ArrayList<>();
        years.clear();
        classes = new ArrayList<>();
        classes.clear();
        yearsAdp = new ArrayAdapter<>(YearsActivity.this,
                android.R.layout.simple_spinner_dropdown_item, years);
        spYears.setAdapter(yearsAdp);
        spYears.setOnItemSelectedListener(this);
        classesAdp = new ArrayAdapter<>(YearsActivity.this,
                android.R.layout.simple_spinner_dropdown_item, classes);
        lVClasses.setAdapter(classesAdp);
        lVClasses.setOnItemClickListener(this);
        gi = getIntent();
        isNewUser = gi.getBooleanExtra("isNewUser", false);
        if (isNewUser) {
            activeYear = 1970;
            addNewYear(null);
        } else {
            activeYear = settings.getInt("activeYear",1970);
        }
    }

    /**
     * Called when the activity is becoming visible to the user.
     * Attaches Firebase ValueEventListeners to listen for changes in years and classes,
     * but only if it's not a new user and a valid {@code activeYear} is set.
     * For new users, listeners are typically attached after they add their first year/class.
     */
    @Override
    protected void onStart() {
        super.onStart();
        if (!isNewUser && activeYear != 1970) {
            refYears.addValueEventListener(velYears);
            refYears.child(String.valueOf(activeYear)).addValueEventListener(velClass);
        }
    }

    /**
     * Called when the activity is no longer visible to the user.
     * Removes the Firebase ValueEventListeners to prevent memory leaks and
     * unnecessary background updates.
     */
    @Override
    protected void onStop() {
        super.onStop();
        refYears.removeEventListener(velYears);
    }

    /**
     * Displays an {@link AlertDialog} to prompt the user to enter a new academic year.
     * The year is expected to be the year when the summer vacation occurs (e.g., 2024 for 2023-2024).
     * <p>
     * If the entered year doesn't already exist, it's added to Firebase.
     * For new users, after adding the first year, it automatically calls {@link #addNewClass(View)}
     * to prompt for adding the first class.
     * If adding a new year, the {@code velYears} listener is attached here if not already.
     *
     * @param view The view that triggered this action (can be null if called programmatically).
     */
    public void addNewYear(View view) {
        AlertDialog.Builder adb =new AlertDialog.Builder(YearsActivity.this);
        adb.setTitle("Add new year");
        adb.setMessage("Enter the new year number:\n(when the summer vacation occur)");
        final EditText eT = new EditText(this.getApplicationContext());
        eT.setInputType(InputType.TYPE_CLASS_NUMBER);
        Calendar calNow = Calendar.getInstance();
        eT.setHint(String.valueOf(1+calNow.get(Calendar.YEAR)));
        adb.setView(eT);
        adb.setPositiveButton("Ok",new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                newYear = Integer.parseInt(eT.getText().toString());
                if (years.contains(newYear)){
                    Toast.makeText(YearsActivity.this, "Year already exist!\nTry again", Toast.LENGTH_SHORT).show();
                } else {
                    refYears.child(String.valueOf(newYear)).setValue("Null");
                    dialog.dismiss();
                    if (isNewUser){
                        activeYear = newYear;
                        addNewClass(null);
                    }
                }
            }
        });
        adb.setNeutralButton("Cancel",new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.cancel();
            }
        });
        adb.setCancelable(false);
        adb.create().show();
    }

    /**
     * Displays an {@link AlertDialog} to prompt the user to enter a new class name
     * for the currently {@code activeYear}.
     * <p>
     * If the class doesn't already exist for that year, it's added to the list of classes
     * in Firebase for the {@code activeYear}.
     * If adding the first class for a year, the {@code velClass} listener is attached here if not already.
     *
     * @param view The view that triggered this action (can be null if called programmatically).
     */
    public void addNewClass(View view) {
        if (activeYear != 1970){
            AlertDialog.Builder adb =new AlertDialog.Builder(YearsActivity.this);
            adb.setTitle("Add new class");
            adb.setMessage("Enter the new class you teach:");
            final EditText eT = new EditText(this.getApplicationContext());
//            eT.setInputType(InputType.TYPE_TEXT_VARIATION_VISIBLE_PASSWORD);
            adb.setView(eT);
            adb.setPositiveButton("Ok",new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    newClass = eT.getText().toString();
                    if (classes.contains(newClass)){
                        Toast.makeText(YearsActivity.this, "Class already exist!\nTry again", Toast.LENGTH_SHORT).show();
                    } else {
                        classes.add(newClass);
                        refYears.child(String.valueOf(activeYear)).setValue(classes);
                        dialog.dismiss();
                    }
                }
            });
            adb.setNeutralButton("Cancel",new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.cancel();
                }
            });
            adb.setCancelable(false);
            adb.create().show();
        }
    }

    /**
     * Finalizes the year and class selection.
     * <p>
     * For new users, it returns the {@code activeYear} as a result to the calling activity
     * (e.g., {@link LoginActivity}) and finishes this activity.
     * For existing users, it saves the {@code activeYear} to SharedPreferences and navigates
     * to {@link MainActivity}.
     * <p>
     * It prevents proceeding if no {@code activeYear} is set or (for new users) if no classes
     * have been added for that year.
     *
     * @param view The view that was clicked (the "Done" button).
     */
    public void done(View view) {
        if (activeYear != 1970) {
            if (isNewUser) {
                gi.putExtra("activeYear", activeYear);
                setResult(RESULT_OK,gi);
                finish();
            } else {
                SharedPreferences.Editor editor = settings.edit();
                editor.putInt("activeYear",activeYear);
                editor.commit();
                Intent intent = new Intent(this.getApplicationContext(), MainActivity.class);
                startActivity(intent);
            }
        } else {
            AlertDialog.Builder adb = new AlertDialog.Builder(YearsActivity.this);
            adb.setTitle("Warning !!!");
            adb.setMessage("You must set the Active Year");
            adb.setPositiveButton("Ok",new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.dismiss();
                }
            });
            adb.setCancelable(false);
            adb.create().show();
        }
    }

    /**
     * Callback method to be invoked when an item in the years {@link Spinner} has been selected.
     * Updates the {@code activeYear} to the selected year.
     * Removes any existing Firebase listener for classes of the previously selected year
     * and attaches a new listener for the classes of the newly selected {@code activeYear}.
     * This method is not called for the initial selection if {@code isNewUser} is true,
     * as the flow is controlled by {@code addNewYear} and {@code addNewClass} initially.
     *
     * @param parent The AdapterView where the selection happened.
     * @param view   The view within the AdapterView that was clicked.
     * @param pos    The position of the view in the adapter.
     * @param id     The row id of the item that was selected.
     */
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int pos, long id) {
        if (!isNewUser){
            activeYear = years.get(pos);
            refYears.child(String.valueOf(activeYear)).addValueEventListener(velClass);
        }
    }

    /**
     * Callback method to be invoked when the selection disappears from the years {@link Spinner}.
     * Currently, this method has no specific implementation.
     *
     * @param parent The AdapterView that now contains no selected item.
     */
    @Override
    public void onNothingSelected(AdapterView<?> parent) {}

    /**
     * Callback method to be invoked when an item in the classes {@link ListView} has been clicked.
     * This is used as a context menu trigger (though not a standard long-press context menu).
     * It displays an {@link AlertDialog} to confirm deletion of the selected class.
     * If confirmed, the class is removed from Firebase for the current {@code activeYear}.
     *
     * @param parent The AdapterView where the click happened (the ListView).
     * @param view   The view within the AdapterView that was clicked.
     * @param pos    The position of the view in the adapter.
     * @param id     The row id of the item that was clicked.
     */
    @Override
    public void onItemClick(AdapterView<?> parent, View view, int pos, long id) {
        if (parent.getId() == R.id.lVClasses) {
            String choosen = classes.get(pos);
            AlertDialog.Builder adb =new AlertDialog.Builder(YearsActivity.this);
            adb.setTitle("Delete class");
            adb.setMessage("Are you sure you want to\ndelete task '"+choosen+"' ?");
            adb.setPositiveButton("Ok",new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    classes.remove(pos);
                    refYears.child(String.valueOf(activeYear)).setValue(classes);
                    dialog.dismiss();
                }
            });
            adb.setNeutralButton("Cancel",new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    dialog.cancel();
                }
            });
            adb.setCancelable(false);
            adb.create().show();
        }
    }

}
```

{: .page-break-before}
### DoneTaskAdapter.java

*Path: DoneTaskAdapter.java*

```java
package com.example.tasks.Adapters;

import static com.example.tasks.Utilities.db2Dsiplay;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.tasks.Obj.Task;
import com.example.tasks.R;

import java.util.ArrayList;

/**
 * @author		Albert Levy albert.school2015@gmail.com
 * @version     2.1
 * @since		9/3/2024
 * <p>
 * Adapter for displaying a list of completed {@link Task} objects in a {@link android.widget.ListView}.
 * <p>
 * This adapter is responsible for creating and binding views for each completed task item.
 * It displays details of a done task such as its original due date, class name,
 * serial number (task identifier), and the date it was marked as checked/completed.
 * It uses a {@link ViewHolderDone} pattern for efficient view recycling.
 *
 * @see BaseAdapter
 * @see Task
 */
public class DoneTaskAdapter extends BaseAdapter {
    private Context context;
    private ArrayList<Task> tasks;
    private LayoutInflater inflater;

    /**
     * Constructs a new {@code DoneTaskAdapter}.
     *
     * @param context The current context.
     * @param tasks   An ArrayList of completed {@link Task} objects to be displayed.
     */
    public DoneTaskAdapter(Context context, ArrayList<Task> tasks) {
        this.context = context;
        this.tasks = tasks;
        this.inflater = LayoutInflater.from(context);
    }

    /**
     * How many items are in the data set represented by this Adapter.
     *
     * @return Count of items (completed tasks).
     */
    @Override
    public int getCount() {
        return tasks.size();
    }

    /**
     * Get the data item associated with the specified position in the data set.
     *
     * @param pos Position of the item whose data we want within the adapter's
     *            data set.
     * @return The completed {@link Task} at the specified position.
     */
    @Override
    public Object getItem(int pos) {
        return tasks.get(pos);
    }

    /**
     * Get the row id associated with the specified position in the list.
     *
     * @param pos The position of the item within the adapter's data set whose row id we want.
     * @return The id of the item at the specified position.
     */
    @Override
    public long getItemId(int pos) {
        return pos;
    }

    /**
     * Get a View that displays the data for a completed task at the specified position in the data set.
     * <p>
     * This method inflates the layout for each completed task item (if necessary) and populates
     * it with the data from the {@link Task} object at the given position, including
     * due date, class name, task serial number, and checked date.
     *
     * @param pos     The position of the item within the adapter's data set of the item whose view
     *                we want.
     * @param view    The old view to reuse, if possible. Note: You should check that this view
     *                is non-null and of an appropriate type before using. If it is not possible to convert
     *                this view to display the correct data, this method can create a new view.
     * @param parent  The parent that this view will eventually be attached to.
     * @return A View corresponding to the data at the specified position.
     */
    @Override
    public View getView(int pos, View view, ViewGroup parent) {
        DoneTaskAdapter.ViewHolderDone viewHolderDone;
        if (view == null) {
            view = LayoutInflater.from(context).inflate(R.layout.donetask_layout, parent, false);
            viewHolderDone = new DoneTaskAdapter.ViewHolderDone(view);
            view.setTag(viewHolderDone);
        } else {
            viewHolderDone = (DoneTaskAdapter.ViewHolderDone) view.getTag();
        }
        Task task = tasks.get(pos);
        viewHolderDone.itemDue.setText(db2Dsiplay(task.getDateEnd()));
        viewHolderDone.itemClass.setText(task.getClassName());
        viewHolderDone.itemTask.setText(task.getSerNum());
        viewHolderDone.itemChecked.setText(db2Dsiplay(task.getDateChecked()));
        return view;
    }

    /**
     * ViewHolder pattern class to efficiently store and reuse views for completed task list items.
     * <p>
     * This class holds references to the {@link TextView}s within each row of the ListView
     * that display the details of a completed task.
     */
    private class ViewHolderDone {
        TextView itemDue, itemClass, itemTask, itemChecked;

        /**
         * Constructs a new ViewHolderDone.
         * Initializes all the {@link TextView}s within the item layout by finding them by their ID.
         *
         * @param view The root view of the item layout (e.g., a row in the ListView).
         */
        public ViewHolderDone(View view) {
            itemDue = (TextView)view.findViewById(R.id.tVDoneDue);
            itemClass = (TextView) view.findViewById(R.id.tVDoneClass);
            itemTask = (TextView) view.findViewById(R.id.tVDoneTask);
            itemChecked = (TextView) view.findViewById(R.id.tVDoneChecked);
        }
    }
}

```

{: .page-break-before}
### Student.java

*Path: Student.java*

```java
/*
 * Model class for a student
 */
package com.example.tasks.models;

public class Student {

    /**
     * ClassName : יא571
     * FullName : עובד איל
     * ID : 011972
     * NickName : איל
     * Sex : ז
     */

    private String ClassName;
    private String FullName;
    private String ID;
    private String NickName;
    private String Sex;

    public String getClassName() {
        return ClassName;
    }

    public void setClassName(String ClassName) {
        this.ClassName = ClassName;
    }

    public String getFullName() {
        return FullName;
    }

    public void setFullName(String FullName) {
        this.FullName = FullName;
    }

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getNickName() {
        return NickName;
    }

    public void setNickName(String NickName) {
        this.NickName = NickName;
    }

    public String getSex() {
        return Sex;
    }

    public void setSex(String Sex) {
        this.Sex = Sex;
    }
}

```

{: .page-break-before}
### MasterActivity.java

*Path: MasterActivity.java*

```java
package com.example.tasks.Obj;

import android.app.ActivityManager;
import android.content.Intent;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;
import com.example.tasks.Activities.MainActivity;
import com.example.tasks.Activities.DoneTasksActivity;
import com.example.tasks.Activities.TaskActivity;
import com.example.tasks.Activities.YearsActivity;
import com.example.tasks.Activities.PresenceActivity;
import com.example.tasks.Activities.ReportsActivity;
import com.example.tasks.Activities.ProfileActivity;
import com.example.tasks.Activities.MaakavActivity;
import com.example.tasks.R;

import java.util.List;

/**
 * Base activity providing common menu handling and dynamic title update.
 * All feature Activities should extend this class instead of AppCompatActivity.
 */
public abstract class MasterActivity extends AppCompatActivity {

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        ActivityManager am = (ActivityManager) getSystemService(ACTIVITY_SERVICE);
        List<ActivityManager.RunningTaskInfo> taskInfo = am.getRunningTasks(1);
        String activityName = taskInfo.get(0).topActivity.getClassName();
        int itemId = item.getItemId();
        if (itemId == R.id.idMain) {
            if (!activityName.equals(MainActivity.class.getName())) {
                Log.i("MasterActivity", "Changing to MainActivity");
                startActivity(new Intent(this, MainActivity.class));
            }
        } else if (itemId == R.id.idTasksDone) {
            if (!activityName.equals(DoneTasksActivity.class.getName())) {
                Log.i("MasterActivity", "Changing to DoneTasksActivity");
                startActivity(new Intent(this, DoneTasksActivity.class));
            }
        } else if (itemId == R.id.idYears) {
            if (!activityName.equals(YearsActivity.class.getName())) {
                Log.i("MasterActivity", "Changing to YearsActivity");
                startActivity(new Intent(this, YearsActivity.class));
            }
        } else if (itemId == R.id.idReports) {
            if (!activityName.equals(ReportsActivity.class.getName())) {
                Log.i("MasterActivity", "Changing to ReportsActivity");
                startActivity(new Intent(this, ReportsActivity.class));
            }
        } else if (itemId == R.id.idProfile) {
            if (!activityName.equals(ProfileActivity.class.getName())) {
                Log.i("MasterActivity", "Changing to ProfileActivity");
                startActivity(new Intent(this, ProfileActivity.class));
            }
        } else if (itemId == R.id.idPresence) {
            if (!activityName.equals(PresenceActivity.class.getName())) {
                Log.i("MasterActivity", "Changing to PresenceActivity");
                startActivity(new Intent(this, PresenceActivity.class));
            }
        } else if (itemId == R.id.idMaakav) {
            if (!activityName.equals(MaakavActivity.class.getName())) {
                Log.i("MasterActivity", "Changing to MaakavActivity");
                startActivity(new Intent(this, MaakavActivity.class));
            }
        } else if (itemId == R.id.idDisconnect) {
            showDisconnectDialog();
            return true;
        } else if (itemId == R.id.idExit) {
            showExitDialog();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onResume() {
        super.onResume();
        updateTitle();
    }

    /**
     * Sets the ActionBar title based on the concrete subclass.
     */
    private void updateTitle() {
        String title = "Presence";
        Class<?> cls = getClass();
        if (cls.equals(PresenceActivity.class)) {
            title += "/נוכחות";
        } else if (cls.equals(ReportsActivity.class)) {
            title += "/דיווחים";
        } else if (cls.equals(ProfileActivity.class)) {
            title += "/פרופיל";
        } else if (cls.equals(MaakavActivity.class)) {
            title += "/מעקב";
        } else if (cls.equals(MainActivity.class)) {
            title += "/משימות";
        } else if (cls.equals(TaskActivity.class)) {
            title += "/משימה";
        } else if (cls.equals(YearsActivity.class)) {
            title += "/שנה";
        } else if (cls.equals(DoneTasksActivity.class)) {
            title += "/משימות שהושלמו";
        }
        ActionBar ab = getSupportActionBar();
        if (ab != null) {
            ab.setTitle(title);
        } else {
            setTitle(title);
        }
    }

    private void showDisconnectDialog() {
        new AlertDialog.Builder(this)
                .setTitle("Disconnect Account")
                .setMessage("Are you sure you want to disconnect account & exit?")
                .setPositiveButton("Ok", (dialog, which) -> {
                    // perform sign out logic
                    finishAffinity();
                })
                .setNeutralButton("Cancel", (dialog, which) -> dialog.cancel())
                .setCancelable(false)
                .show();
    }

    private void showExitDialog() {
        new AlertDialog.Builder(this)
                .setTitle("Quit Application")
                .setMessage("Are you sure?")
                .setPositiveButton("Ok", (dialog, which) -> finishAffinity())
                .setNeutralButton("Cancel", (dialog, which) -> dialog.cancel())
                .setCancelable(false)
                .show();
    }
}

```

{: .page-break-before}
### FBRef.java

*Path: FBRef.java*

```java
package com.example.tasks;

import com.example.tasks.models.Student;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import java.util.ArrayList;
import java.util.List;
import android.util.Log;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.example.tasks.models.Student;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

// author: Guy Siedes 3strategy@gmail.com
// with GPT o4 mini high, private chat  :  https://chatgpt.com/c/6878cad2-5d50-800e-8499-6db3a8fb9d88
// usage guideline: https://מבני.שלי.com/android/projectSteps/newFBref
public class FBRef {

    // all students is loaded asynchronouly from RTDB during Login, and openning of the
    // PresenceActivity is conditioned by its completion.
    public static List<Student> allStudents = new ArrayList<>();

    // ─── auth & root DB ───────────────────────────────────────────────
    public static FirebaseAuth       refAuth     = FirebaseAuth.getInstance();
    public static FirebaseDatabase   FBDB        = FirebaseDatabase.getInstance();

    // ─── your existing roots ─────────────────────────────────────────
    /** root of all users; you still do refUsers.child(uid)… elsewhere */
    public static DatabaseReference  refUsers    = FBDB.getReference("Users");
    public static DatabaseReference  refTasks,
            refDoneTasks,
            refYears,
            refStudents,
            refMaakav;

    // NEW: smart tree root: P{YY}.{uid}
    public static DatabaseReference  refPresenceRoot,
            refStudentsYear,
            refMaakavYear;

    public static DatabaseReference refPresUidCurrentWeek;


    public static String uid;

    /**
     * Call on login to set uid + your existing refs,
     * and also set up Students/Presence/Maakav for this user.
     */
    public static void getUser(FirebaseUser fbuser) {
        uid            = fbuser.getUid();
        refTasks       = FBDB.getReference("Tasks").child(uid);
        refDoneTasks   = FBDB.getReference("Done_Tasks").child(uid);
        refYears       = FBDB.getReference("Years").child(uid);

        // ─── NEW branches ───
        refStudents    = FBDB.getReference("Students").child(uid);
        refMaakav      = FBDB.getReference("Maakav").child(uid);

        int activeYear = Calendar.getInstance().get(Calendar.YEAR);  // or SharedPreferences.getInt(...)
        setActiveYear(activeYear);
    }

    /**
     * Once you know activeYear (e.g. from SharedPreferences),
     * call this so your three new branches narrow to {uid}/{year}.
     */
    public static void setActiveYear(int activeYear) {
        String yy = String.valueOf(activeYear).substring(2);     // 👈 e.g. "25"
        String rootKey = "P" + yy + "_" + uid;                    // 👈 P25.abcd123
        refPresenceRoot = FBDB.getReference(rootKey);            // 👈 single root for that teacher-year
        refStudentsYear = refStudents.child(String.valueOf(activeYear));
        refMaakavYear   = refMaakav.child(String.valueOf(activeYear));

        // Also set current week subnode reference
        int week = Calendar.getInstance().get(Calendar.WEEK_OF_YEAR);
        refPresUidCurrentWeek = refPresenceRoot.child("W" + week);  // e.g., P25.abcd123/W29
    }


    public static void loadAllStudents(final Runnable onComplete) {
        allStudents.clear();
        refStudentsYear.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                for (DataSnapshot child : snapshot.getChildren()) {
                    allStudents.add(child.getValue(Student.class));
                }
                if (onComplete != null) onComplete.run();
            }
            @Override
            public void onCancelled(DatabaseError error) {
                Log.e("FBRef", "Failed to load students", error.toException());
                if (onComplete != null) onComplete.run();
            }
        });
    }
    /**
     * Convenience overload: do both in one call.
     */
//    public static void getUser(FirebaseUser fbuser, int activeYear) {
//        getUser(fbuser);
//        setActiveYear(activeYear);
//    }
}

```

{: .page-break-before}
### AndroidManifest.xml

*Path: AndroidManifest.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.DayNight.DarkActionBar"
        tools:targetApi="31">
        <activity
            android:name=".Activities.MaakavActivity"
            android:exported="false" />
        <activity
            android:name=".Activities.ProfileActivity"
            android:exported="false" />
        <!-- PresenceActivity locked to portrait to prevent restarts/data loss -->
        <activity
            android:name=".Activities.PresenceActivity"
            android:screenOrientation="portrait"
            android:exported="true" />

        <activity
            android:name=".Activities.ReportsActivity"
            android:exported="false" />
        <activity
            android:name=".Activities.LoginActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
        <activity
            android:name=".Activities.YearsActivity"
            android:exported="false" />
        <activity
            android:name=".Activities.DoneTasksActivity"
            android:exported="false" />
        <activity
            android:name=".Activities.TaskActivity"
            android:exported="false" />
        <activity
            android:name=".Obj.MasterActivity"
            android:exported="false" />
        <activity
            android:name=".Activities.MainActivity"
            android:exported="false" />
    </application>

</manifest>
```

{: .page-break-before}
### activity_done_tasks.xml

*Path: activity_done_tasks.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".Activities.DoneTasksActivity">

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <TextView
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:gravity="center"
        android:text="Checked Tasks:"
        android:textSize="36dp"
        android:textStyle="bold" />

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:orientation="horizontal">

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="3"
            android:gravity="center"
            android:text="Set Year:"
            android:textSize="18dp"
            android:textStyle="bold" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <Spinner
            android:id="@+id/spYears"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="3"
            android:gravity="center" />

    </LinearLayout>

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="3"
            android:gravity="center"
            android:text="Due Date"
            android:textSize="18dp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/tVClass"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="2"
            android:gravity="center"
            android:onClick="orderByClass"
            android:text="Class"
            android:textSize="18dp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:gravity="center"
            android:text="Task"
            android:textSize="18dp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/tVChecked"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="3"
            android:gravity="center"
            android:onClick="orderByChecked"
            android:text="Checked"
            android:textSize="18dp"
            android:textStyle="bold" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="6"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <ListView
            android:id="@+id/lVDone"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="9" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

</LinearLayout>
```

{: .page-break-before}
### activity_login.xml

*Path: activity_login.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Activities.LoginActivity">

    <Space
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="4"
        android:orientation="vertical">

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="0.5" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:gravity="center"
            android:id="@+id/tVtitle"
            android:text="Login"
            android:autoSizeTextType="uniform"
            android:textStyle="bold" />

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1" />

        <EditText
            android:id="@+id/eTname"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:visibility="invisible"
            android:ems="10"
            android:hint="name"
            android:inputType="textPersonName" />

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="0.5" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:orientation="horizontal">

            <Space
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="7" />

            <Button
                android:id="@+id/btn"
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="5"
                android:onClick="logorreg"
                android:text="Login" />

            <Space
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1" />

        </LinearLayout>

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="0.5" />

        <EditText
            android:id="@+id/eTemail"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:ems="10"
            android:hint="e-mail"
            android:inputType="textEmailAddress" />

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="0.5" />

        <EditText
            android:id="@+id/eTpass"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:ems="10"
            android:hint="password"
            android:inputType="textPassword" />

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="0.5" />

        <CheckBox
            android:id="@+id/cBstayconnect"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:text="Stay Connected" />

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1" />

        <TextView
            android:id="@+id/tVregister"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1" />

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1.5" />

    </LinearLayout>

    <Space
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1" />

</LinearLayout>
```

{: .page-break-before}
### activity_maakav.xml

*Path: activity_maakav.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Activities.MaakavActivity">

</androidx.constraintlayout.widget.ConstraintLayout>
```

{: .page-break-before}
### activity_main.xml

*Path: activity_main.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".Activities.MainActivity">

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="0.5" />

    <TextView
        android:id="@+id/tVMainHeader"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="2"
        android:gravity="center"
        android:text="Your Active Tasks:"
        android:textSize="36dp"
        android:textStyle="bold" />

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="0.5" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="3.2"
            android:gravity="center"
            android:text="Due Date"
            android:textSize="16dp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1.6"
            android:gravity="center"
            android:text="Class"
            android:textSize="16dp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1.6"
            android:gravity="center"
            android:text="Task"
            android:textSize="16dp"
            android:textStyle="bold" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1.6"
            android:gravity="center"
            android:text="Full\nClass"
            android:textSize="16dp"
            android:textStyle="bold" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="6"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <ListView
            android:id="@+id/lVMain"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="8" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <Button
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="2"
            android:onClick="addTask"
            android:text="Add New Task"
            android:textSize="24dp"
            android:textStyle="bold" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

</LinearLayout>
```

{: .page-break-before}
### activity_master.xml

*Path: activity_master.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Obj.MasterActivity">

</androidx.constraintlayout.widget.ConstraintLayout>
```

{: .page-break-before}
### activity_presence.xml

*Path: activity_presence.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Activities.PresenceActivity">

    <!-- Class name label -->
    <TextView
        android:id="@+id/classNameLabel"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="כיתה: "
        android:textSize="20sp"
        android:textAlignment="viewEnd"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_margin="16dp" />

    <!-- Missing students label -->
    <TextView
        android:id="@+id/missingStudentsLabel"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="לא דווחו: "
        android:textColor="#B00020"
        android:background="#FFDDDD"
        android:padding="10dp"
        app:layout_constraintTop_toBottomOf="@id/classNameLabel"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginHorizontal="16dp"
        android:layout_marginTop="8dp" />


    <!-- Raw transcript display -->
    <TextView
        android:id="@+id/transcriptTextView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="(waiting for speech...)"
        android:textColor="#007F00"
        android:background="#DDFFDD"
        android:padding="10dp"
        app:layout_constraintTop_toBottomOf="@id/missingStudentsLabel"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginHorizontal="16dp"
        android:layout_marginTop="8dp"/>

    <!-- Insert these TextViews just below the rawTranscriptTextView -->
    <TextView
        android:id="@+id/statusSummaryTextView"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="סטטוס נוכחות:"
        android:textSize="16sp"
        android:padding="8dp"
        app:layout_constraintTop_toBottomOf="@id/transcriptTextView"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <TextView
        android:id="@+id/disturbanceLabel"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="הפרעות:"
        android:textColor="#B00020"
        android:padding="8dp"
        app:layout_constraintTop_toBottomOf="@id/statusSummaryTextView"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />
    <!-- Start and Stop buttons -->
    <LinearLayout
        android:id="@+id/buttonRow"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintTop_toBottomOf="@id/disturbanceLabel"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_marginTop="16dp">

        <Button
            android:id="@+id/btnStart"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Record"
            android:layout_marginEnd="10dp" />

        <Button
            android:id="@+id/btnStop"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Stop Rec"
            android:enabled="false" />


    </LinearLayout>

    <!-- Attendance list pushes off the bottom -->
    <ListView
        android:id="@+id/attendanceList"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintTop_toBottomOf="@id/buttonRow"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        android:layout_margin="16dp"/>
</androidx.constraintlayout.widget.ConstraintLayout>

```

{: .page-break-before}
### activity_profile.xml

*Path: activity_profile.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    tools:context=".Activities.ProfileActivity">

    <TextView
        android:id="@+id/nameLabel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Name:"
        style="@style/TextAppearance.AppCompat.Large"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/usernameEdit"
        android:layout_width="0dp"
        android:layout_height="48dp"
        android:layout_marginTop="8dp"
        android:hint="User name"
        android:padding="8dp"
        android:enabled="false"
        app:layout_constraintTop_toBottomOf="@id/nameLabel"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <TextView
        android:id="@+id/yearLabel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Active Year:"
        style="@style/TextAppearance.AppCompat.Large"
        android:layout_marginTop="16dp"
        app:layout_constraintTop_toBottomOf="@id/usernameEdit"
        app:layout_constraintStart_toStartOf="parent" />

    <Spinner
        android:id="@+id/activeYearSpinner"
        android:layout_width="0dp"
        android:layout_height="48dp"
        android:layout_marginTop="8dp"
        android:contentDescription="Active Year"
        android:padding="8dp"
        app:layout_constraintTop_toBottomOf="@id/yearLabel"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <TextView
        android:id="@+id/defaultLabel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Default Screen:"
        style="@style/TextAppearance.AppCompat.Large"
        android:layout_marginTop="16dp"
        app:layout_constraintTop_toBottomOf="@id/activeYearSpinner"
        app:layout_constraintStart_toStartOf="parent" />

    <Spinner
        android:id="@+id/defaultScreenSpinner"
        android:layout_width="0dp"
        android:layout_height="48dp"
        android:layout_marginTop="8dp"
        android:contentDescription="Default Screen"
        android:padding="8dp"
        app:layout_constraintTop_toBottomOf="@id/defaultLabel"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <View
        android:layout_width="0dp"
        android:layout_height="1dp"
        android:background="?android:attr/listDivider"
        android:layout_marginTop="16dp"
        app:layout_constraintTop_toBottomOf="@id/defaultScreenSpinner"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintEnd_toEndOf="parent" />

    <Button
        android:id="@+id/takePictureBtn"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Take Picture"
        app:layout_constraintTop_toBottomOf="@id/defaultScreenSpinner"
        app:layout_constraintStart_toStartOf="parent"
        android:layout_marginTop="16dp" />

    <ImageView
        android:id="@+id/profileImage"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_marginTop="16dp"
        android:scaleType="centerCrop"
        app:layout_constraintTop_toBottomOf="@id/takePictureBtn"
        app:layout_constraintStart_toStartOf="parent" />

    <TextView
        android:id="@+id/tvStudentsSheetLink"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Link to Google Sheet"
        android:autoLink="web"
        android:textColor="@android:color/holo_blue_dark"
        android:clickable="true"
        android:focusable="true"
        android:padding="16dp"
        app:layout_constraintTop_toBottomOf="@id/profileImage"
        app:layout_constraintStart_toStartOf="parent"
        android:visibility="gone"/>

</androidx.constraintlayout.widget.ConstraintLayout>
```

{: .page-break-before}
### activity_reports.xml

*Path: activity_reports.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".Activities.ReportsActivity">

</androidx.constraintlayout.widget.ConstraintLayout>
```

{: .page-break-before}
### activity_task.xml

*Path: activity_task.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    tools:context=".Activities.TaskActivity">

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <TextView
        android:id="@+id/tVTaskHeader"
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:autoSizeTextType="uniform"
        android:gravity="center"
        android:text="Add Task"
        android:textSize="28dp"
        android:textStyle="bold" />

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <Spinner
            android:id="@+id/spClass"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="2"
            android:textAlignment="center" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <EditText
            android:id="@+id/eTTaskNum"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="2"
            android:ems="10"
            android:gravity="center_horizontal"
            android:hint="Task number"
            android:inputType="number"
            android:textSize="18dp"
            android:textStyle="bold" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <CheckBox
            android:id="@+id/cbFullClass"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="2"
            android:layoutDirection="rtl"
            android:text="Full Class"
            android:textAlignment="center"
            android:textSize="18dp"
            android:textStyle="bold" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="2"
            android:gravity="center"
            android:text="Start Date:"
            android:textSize="20dp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/tVStartDate"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="5"
            android:gravity="center"
            android:hint="set start date"
            android:onClick="datePick"
            android:textSize="18dp"
            android:textStyle="bold" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <TextView
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="2"
            android:gravity="center"
            android:text="Due Date:"
            android:textSize="20dp"
            android:textStyle="bold" />

        <TextView
            android:id="@+id/tVDueDate"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="5"
            android:gravity="center"
            android:hint="set due date"
            android:onClick="datePick"
            android:textSize="18dp"
            android:textStyle="bold" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="2"
        android:orientation="horizontal">

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />

        <Button
            android:id="@+id/btnTask"
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1"
            android:onClick="confirmation"
            android:text="Add Task"
            android:textSize="24dp"
            android:textStyle="bold" />

        <Space
            android:layout_width="0dp"
            android:layout_height="match_parent"
            android:layout_weight="1" />
    </LinearLayout>

    <Space
        android:layout_width="match_parent"
        android:layout_height="0dp"
        android:layout_weight="4" />

</LinearLayout>
```

{: .page-break-before}
### activity_years.xml

*Path: activity_years.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    tools:context=".Activities.YearsActivity">

    <Space
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1" />

    <LinearLayout
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="10"
        android:orientation="vertical">

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="2"
            android:orientation="horizontal">

            <Space
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1" />

            <Button
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="2"
                android:gravity="center"
                android:onClick="addNewYear"
                android:text="Add\nNew year"
                android:textSize="20dp"
                android:textStyle="bold" />

            <Space
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_weight="1" />

        </LinearLayout>

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:orientation="horizontal">

            <TextView
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="3"
                android:gravity="center"
                android:text="Set\nActive Year:"
                android:textSize="18dp"
                android:textStyle="bold" />

            <Space
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1" />

            <Spinner
                android:id="@+id/spYears"
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="3"
                android:gravity="center" />

        </LinearLayout>

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="3"
            android:orientation="horizontal">

            <Space
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1" />

            <LinearLayout
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="3"
                android:orientation="vertical">

                <Space
                    android:layout_width="match_parent"
                    android:layout_height="0dp"
                    android:layout_weight="1" />

                <Button
                    android:layout_width="match_parent"
                    android:layout_height="0dp"
                    android:layout_weight="2"
                    android:onClick="addNewClass"
                    android:text="Add\nNew class"
                    android:textSize="18dp"
                    android:textStyle="bold" />

                <Space
                    android:layout_width="match_parent"
                    android:layout_height="0dp"
                    android:layout_weight="1" />
            </LinearLayout>

            <Space
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1" />

            <ListView
                android:id="@+id/lVClasses"
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="2" />

            <Space
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1" />
        </LinearLayout>

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="2" />

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1"
            android:orientation="horizontal">

            <Space
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="1" />

            <Button
                android:layout_width="0dp"
                android:layout_height="match_parent"
                android:layout_weight="2"
                android:gravity="center"
                android:onClick="done"
                android:text="Done"
                android:textSize="24dp"
                android:textStyle="bold" />

            <Space
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_weight="1" />

        </LinearLayout>

        <Space
            android:layout_width="match_parent"
            android:layout_height="0dp"
            android:layout_weight="1" />
    </LinearLayout>

    <Space
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1" />
</LinearLayout>
```

{: .page-break-before}
### donetask_layout.xml

*Path: donetask_layout.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="50dp">

    <TextView
        android:id="@+id/tVDoneDue"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="3"
        android:gravity="center"
        android:textSize="18dp" />

    <TextView
        android:id="@+id/tVDoneClass"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="2"
        android:gravity="center"
        android:textSize="18dp" />

    <TextView
        android:id="@+id/tVDoneTask"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:textSize="18dp" />

    <TextView
        android:id="@+id/tVDoneChecked"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="3"
        android:gravity="center"
        android:textSize="18dp" />

</LinearLayout>
```

{: .page-break-before}
### task_layout.xml

*Path: task_layout.xml*

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/llTask"
    android:layout_width="match_parent"
    android:layout_height="50dp"
    android:descendantFocusability="blocksDescendants">

    <TextView
        android:id="@+id/tVDue"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="2"
        android:gravity="center"
        android:textSize="18dp" />

    <TextView
        android:id="@+id/tVClass"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:textSize="18dp" />

    <TextView
        android:id="@+id/tVTask"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:gravity="center"
        android:textSize="18dp" />

    <ToggleButton
        android:id="@+id/tBFull"
        android:layout_width="0dp"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:clickable="false"
        android:textOff="Part"
        android:textOn="Full"
        android:textSize="16dp" />

</LinearLayout>
```

