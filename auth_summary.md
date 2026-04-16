# Authentication and Authorization Architecture Summary

This document outlines how the **Closed Network Project** handles authentication (login) and authorization (permissions/tags). You can use this guide to implement the same 3rd-party auth and permissions services in a new project.

## 1. Authentication Flow

The main authentication guard is implemented in the `Authorization` wrapper component (`src/authorization.tsx`). It relies on session cookies and a redirect-based login flow.

### Login Check Route
* **Endpoint:** `GET /api/auth/login`
* **Configuration:** Must include `{ withCredentials: true }` to send session cookies.
* **Handling:**
    * If the user is authenticated, the app continues loading.
    * If the user is **not authenticated**, the server responds with a `401 Unauthorized` HTTP status.
    * The 401 response strongly expects a JSON body containing a `redirectURL` property.
    * The front-end catches this 401 error and immediately forces a redirect to that URL to authenticate the user: `window.location.replace(error.response.data.redirectURL)`.

## 2. Authorization & Permissions (Compartmentalization)

The permissions are managed via custom React hooks (`useCompartmentalization` and `useFetchPermissions`) found in `src/mirage/useCompartmentalization.ts`. It uses **Jotai** for global state management.

There are two main concepts for permissions: **Entities** (granular CRUD permissions) and **Tags** (boolean feature flags/roles).

### Entity Permissions (CRUD)
The app requests permissions for specific "Entities" (e.g., `EnterMagenElyon`, `OperationsLog`, `jammer`).
* **Endpoint:** `GET /api/permissions/userPermissions/entities`
* **Query Parameters:** `entityIds` (a comma-separated string of required entities, e.g., `?entityIds=EnterMagenElyon,Transceiver`).
* **Mechanism:** 
   * Retrieves an object mapping each entity to its Allowed Actions (Create, Read, Update, Delete, Treatment).
   * **Polling:** The app actively polls this endpoint **every 300 seconds (5 minutes)** to ensure the permissions stay up-to-date while the user has the page open.
* **App Entry Guard:** The main application only renders if the user has `READ` access to a core entity named `EnterMagenElyon`.

### Tag Permissions (Boolean Flags)
The app checks for specific tags that act as boolean toggles for features, groupings, or special permissions (e.g., `superUser`, `alma`, `airForce`).
* **Endpoint:** `GET /api/permissions/userPermissions/tags/{tagName}`
* **Notable Tags Included:**
    * `alma`
    * `airForce`
    * `supernova`
    * `superUser`
    * `takshal`
    * `editBinat`
    * `binat`
    * `PM`
    * `tmunaAviritRomach`
    * `editJammerHelper`
    * `fertileLand`
    * `editOperationalSystem`
    * `flights`
* **Mechanism:** Fired once on load. The service returns a `boolean` indicating if the current user has the tag, which is then stored directly into global Jotai atoms.

## Implementation Guide for the New Project Agent
To implement this in the other project using the same auth setup, ensure you:

1. **Setup the Initial Auth Check:** Ping `/api/auth/login` with credentials. Listen for `401` errors and `window.location.replace()` to the `redirectURL` provided in the 401 data.
2. **Setup Global Permission State:** Use a centralized state store (like Jotai, Redux, or Zustand).
3. **Fetch Tags on Load:** Run parallel `GET` requests to `/api/permissions/userPermissions/tags/...` for any relevant tags needed.
4. **Setup Entity Polling:** Create a hook to ping `/api/permissions/userPermissions/entities?entityIds=...` with the modules required by the current route, and set up an interval to refetch this every 5 minutes in the background.
