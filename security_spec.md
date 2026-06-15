# Firestore Security Specification - MathsGuru AI

## 1. Data Invariants
1. **User Ownership**: A user document under `/users/{userId}` can only be read, created, updated, or deleted by the user whose UID matches `{userId}`.
2. **Data Integrity**: User XP and Streak metrics must always be non-negative integers.
3. **No Role Escalation**: There are no admin roles or custom privileges inside user stat documents.
4. **No Identity Spoofing**: The `userId` property inside the stored user state must strictly equal the calling client's `request.auth.uid`.

## 2. The "Dirty Dozen" Payloads (Permission Denied Targets)
1. **Unauthenticated Read Request**: Attempt to read any profile without log in.
2. **Cross-User Hijacking (Read)**: User B attempts to read User A's statistics.
3. **Cross-User Hijacking (Write)**: User B attempts to overwrite User A's statistics.
4. **Missing Required Fields on Create**: Attempt to initialize stats without `userId`, `xp`, or `streak`.
5. **Negative XP Value**: Initializing or updating a profile with a negative XP value (e.g. `xp = -100`).
6. **Negative Streak Value**: Initializing or updating a profile with a negative streak value.
7. **Identity Spoofing on Create**: Authenticated user attempts to set `userId` in payload to a different UID.
8. **Owner Change on Update**: User attempts to mutate the state such that `userId` changes.
9. **String Poisoning on ID**: Attempt to target a profile with a massive corrupted string `userId` (checked by `isValidId`).
10. **Shadow Key Exploit**: Attempting to insert an unknown administrative field like `isAdmin: true` into the profile document.
11. **Type Spoofing (Streak)**: Attempting to save a string value `"infinity"` on the `streak` field.
12. **Type Spoofing (XP)**: Attempting to save a boolean array on the `xp` field.

## 3. The Security Assertion Mapping

All payloads listed above are verified to trigger permissions denials on target operations under the deployed security ruleset. Validation is enforced using static schema-based checking (`isValidUserStats`), strict key audits, and identity guards (`request.auth.uid == userId`).
