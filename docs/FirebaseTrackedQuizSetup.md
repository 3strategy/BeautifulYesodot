# Firebase Tracked Quiz Setup

This repo now includes the first tracked questionnaire at:

- `/interactrak/percentages-middle-school-2/`

Its current RTDB key is:

- `/jekyll/26-percentages-middle-school-2/{uid}`

Shared user profiles are written to:

- `/jekyll/users/{uid}`

## Firebase Console Steps

1. In Firebase Authentication, enable the `Google` sign-in provider.
2. In Authentication -> Settings -> Authorized domains, add:
   - `localhost`
   - `127.0.0.1`
   - `xn--7dbdbn4b5c.xn--eebf2b.com`
3. In Realtime Database -> Rules, paste the rules from:
   - `docs/firebase-rtdb-tracked-quizzes.rules.json`

## Current Page Configuration

The first tracked page currently uses:

- `quiz_key`: `26-percentages-middle-school-2`
- `quiz_window_start`: `2026-04-14T08:00:00+03:00`
- `quiz_window_end`: `2026-05-31T23:59:59+03:00`
- `quiz_debug_uids`: `YtfYwYQ5FxOFk50npfDWF0Ekq7i1`

The unlock link must include matching query parameters:

```text
/interactrak/percentages-middle-school-2/?start=<start-iso>&end=<end-iso>&token=<token>
```

## Notes

- This is low-security gating only. The site remains public and the quiz wall is client-side.
- Ordinary students are locked after final submission by RTDB rules plus client behavior.
- The debug UID can clear the saved record and reopen the tracked quiz repeatedly from the page UI.
- Before real classroom use, rotate the page window and token in `interactrak/percentages-middle-school-2.md`.
