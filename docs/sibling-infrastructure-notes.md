# Sibling infrastructure comparison — 9 September 2026

This is a focused comparison for the swipe port, not an exhaustive site audit.
Do not replace whole shared files merely because one site has a newer timestamp.

| Area | Observed difference | Action |
|:---|:---|:---|
| Swipe gestures | Mivney already had the validated opt-in script; Yesodot had none. | Ported the identical script and footer include; enabled Yesodot's own Taba links. |
| Page layout | The page layouts were byte-identical and both expose a main element. | No layout change. |
| Questionnaires | The JS is identical after ignoring CRLF/LF. | No renderer change. |
| Before/after columns | Yesodot AGENTS documented the modifier but its CSS lacked the rule. | Copied the focused rule and tested wide RTL placement and mobile stacking. |
| Menu configuration | Yesodot supports intentionally empty named views via data-menu-set-ids; Mivney discovers IDs from menu items. | Retained Yesodot's behavior; future Mivney port must update nav.html and custom-script.js together. |
| Details controls | Yesodot exposes expandAllDetails(); Mivney does not. | Retained the Yesodot helper. |
| Search and default menu | Search link positions and default menu IDs differ. | Preserved each site's choices; consult the owner before standardizing them. |
| Other CSS | Mivney has a .hebrew wrapper and Mermaid sequence-line/text color overrides absent from Yesodot. | Recorded for a separate rendered-use review; no wholesale CSS replacement. |
| Notifications | Yesodot AGENTS still directed agents to an old notify.ps1 workflow. | Updated to the current user-authorized ntfy workflow. |

Current swipe guidance is in [sequence-navigation.md](sequence-navigation.md).
The migration did not edit the pre-existing cs3e caption or C# source changes.
