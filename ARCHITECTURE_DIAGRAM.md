# GameTherapy Demo Mode - Architecture Diagram

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    GAMETHERAPY DEMO MODE                        │
│                                                                 │
│  ╔══════════════╗      ╔══════════════╗      ╔══════════════╗  │
│  ║   Landing    ║      ║   Landing    ║      ║   Landing    ║  │
│  ║   Page       ║      ║   Page       ║      ║   Page       ║  │
│  ║              ║      ║              ║      ║              ║  │
│  ║ 🎮 Player   ║      ║👨‍⚕️ Doctor      ║      ║👨‍👩‍👧 Guardian   ║  │
│  ╚══════════════╝      ╚══════════════╝      ╚══════════════╝  │
│         │                     │                     │           │
│         ↓                     ↓                     ↓           │
│  ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│  │ localStorage │     │ localStorage │     │ localStorage │   │
│  │              │     │              │     │              │   │
│  │ token:       │     │ token:       │     │ token:       │   │
│  │ demo-token-  │     │ demo-token-  │     │ demo-token-  │   │
│  │ player       │     │ doctor       │     │ guardian     │   │
│  │              │     │              │     │              │   │
│  │ userId:      │     │ userId:      │     │ userId:      │   │
│  │ 67b01d...    │     │ 67a5c7...    │     │ 67b01c...    │   │
│  │              │     │              │     │              │   │
│  │ role: player │     │ role: doctor │     │ role: guardian   │
│  └──────────────┘     └──────────────┘     └──────────────┘   │
│         │                     │                     │           │
│         ↓                     ↓                     ↓           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │           Axios Interceptor (api.js)                    │  │
│  │                                                          │  │
│  │  - Adds Header: x-auth-token = token                    │  │
│  │  - Adds Header: x-user-role = role                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
│                           ↓                                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │         Backend Auth Middleware (auth.js)               │  │
│  │                                                          │  │
│  │  IF token.startsWith("demo-token-") THEN:               │  │
│  │    - Extract role from token                            │  │
│  │    - Load DEMO_USERS[role]                              │  │
│  │    - Set req.user = {id, role, name, email}             │  │
│  │    - NEXT()                                             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                           │                                     │
│         ┌─────────────────┼─────────────────┐                 │
│         ↓                 ↓                 ↓                 │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐         │
│  │   /api/     │   │   /api/     │   │   /api/     │         │
│  │ patient/    │   │   doctor/   │   │  guardian/  │         │
│  │  games      │   │  seminars   │   │  players    │         │
│  └─────────────┘   └─────────────┘   └─────────────┘         │
│         │                 │                 │                 │
│         ↓                 ↓                 ↓                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              MongoDB Database                           │  │
│  │                                                          │  │
│  │  - User IDs matched to real records                      │  │
│  │  - Game progress saved                                  │  │
│  │  - Scores tracked                                       │  │
│  │  - Data persistent                                      │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow Diagram

```
USER INTERACTION
     │
     ├─→ [Click "Continue as Player"]
     │
     ↓
HANDLEROLSSELECTION("player")
     │
     ├─→ Get user from DEMO_USERS.player
     │   {_id: "67b01d...", name: "vikasss", ...}
     │
     ├─→ localStorage.setItem("token", "demo-token-player")
     ├─→ localStorage.setItem("userId", "67b01d...")
     ├─→ localStorage.setItem("userName", "vikasss")
     ├─→ localStorage.setItem("userEmail", "vikasss@gmail.com")
     ├─→ localStorage.setItem("userRole", "player")
     │
     ├─→ navigate("/dashboard")
     │
     ↓
PATIENT DASHBOARD
     │
     ├─→ useEffect() calls fetchUserData()
     │
     ├─→ Check localStorage for token
     │   Found: "demo-token-player"
     │
     ├─→ Use stored user data from localStorage
     │   {_id: "67b01d...", name: "vikasss", ...}
     │
     ├─→ axios.get("/api/patient/games")
     │
     ↓
AXIOS INTERCEPTOR
     │
     ├─→ Add Header: "x-auth-token" = "demo-token-player"
     ├─→ Add Header: "x-user-role" = "player"
     │
     ↓
BACKEND RECEIVES REQUEST
     │
     ├─→ auth.js middleware processes request
     │
     ├─→ Check: token.startsWith("demo-token-") ? YES
     │
     ├─→ Extract role: "player"
     │
     ├─→ Load: DEMO_USERS["player"]
     │   {
     │     _id: "67b01d7596d45b9e9566d3cf",
     │     name: "vikasss",
     │     email: "vikasss@gmail.com",
     │     role: "player",
     │     guardian: "67b01cae96d45b9e9566d3c5"
     │   }
     │
     ├─→ Set: req.user = {
     │     id: "67b01d...",
     │     role: "player",
     │     name: "vikasss",
     │     email: "vikasss@gmail.com"
     │   }
     │
     ├─→ NEXT() - Continue to route handler
     │
     ↓
ROUTE HANDLER (/api/patient/games)
     │
     ├─→ Access: req.user.id = "67b01d..."
     ├─→ Query games for user
     ├─→ Return games list
     │
     ↓
RESPONSE SENT TO FRONTEND
     │
     ├─→ Games rendered in dashboard
     ├─→ User can play games
     ├─→ Progress saved to database
```

---

## Request/Response Cycle

```
FRONTEND REQUEST
┌─────────────────────────────────────────────────────────┐
│ axios.get("/api/patient/games")                         │
│                                                         │
│ Interceptor adds:                                       │
│ ├─ Header: x-auth-token = "demo-token-player"          │
│ └─ Header: x-user-role = "player"                       │
└─────────────────────────────────────────────────────────┘
            ↓
BACKEND AUTH MIDDLEWARE
┌─────────────────────────────────────────────────────────┐
│ function auth(req, res, next) {                         │
│   const token = req.header("x-auth-token")              │
│   // token = "demo-token-player"                        │
│                                                         │
│   if (token && token.startsWith("demo-token-")) {       │
│     const role = token.replace("demo-token-", "")       │
│     // role = "player"                                  │
│                                                         │
│     const demoUser = DEMO_USERS["player"]               │
│     // demoUser = { _id: "67b01d...", ... }             │
│                                                         │
│     req.user = {                                        │
│       id: demoUser._id,                                 │
│       role: demoUser.role,                              │
│       name: demoUser.name,                              │
│       email: demoUser.email                             │
│     }                                                   │
│                                                         │
│     return next()                                       │
│   }                                                     │
│ }                                                       │
└─────────────────────────────────────────────────────────┘
            ↓
ROUTE HANDLER
┌─────────────────────────────────────────────────────────┐
│ router.get("/games", auth, (req, res) => {              │
│   // req.user = {id: "67b01d...", role: "player", ...}  │
│   const games = fetchGamesForUser(req.user.id)          │
│   res.json(games)                                       │
│ })                                                      │
└─────────────────────────────────────────────────────────┘
            ↓
BACKEND RESPONSE
┌─────────────────────────────────────────────────────────┐
│ [                                                       │
│   { id: 1, title: "Memory Match", ... },                │
│   { id: 2, title: "Math Quiz", ... },                   │
│   ...                                                   │
│ ]                                                       │
└─────────────────────────────────────────────────────────┘
            ↓
FRONTEND RECEIVES
┌─────────────────────────────────────────────────────────┐
│ {                                                       │
│   data: [... games array ...],                          │
│   status: 200,                                          │
│   statusText: "OK"                                      │
│ }                                                       │
└─────────────────────────────────────────────────────────┘
            ↓
RENDER GAMES
┌─────────────────────────────────────────────────────────┐
│ PatientDashboard displays:                              │
│ - Memory Match                                          │
│ - Math Quiz                                             │
│ - Word Scramble                                         │
│ - ... (all 8 games)                                     │
└─────────────────────────────────────────────────────────┘
```

---

## Data Flow: User Selection to Dashboard

```
┌─────────────────────────────────┐
│   Landing Page Rendered         │
│   (Three role buttons visible)   │
└─────────────────────────────────┘
            │
            ├─→ User clicks button ←─┐
            │                        │
            ↓                        │
┌─────────────────────────────────┐│
│ handleRoleSelection("player")    ││
│                                 ││
│ 1. Get user data                ││
│    DEMO_USERS.player            ││
│                                 ││
│ 2. Store in localStorage        ││
│    - token                      ││
│    - userId                     ││
│    - userName                   ││
│    - userEmail                  ││
│    - userRole                   ││
│                                 ││
│ 3. navigate("/dashboard")       ││
└─────────────────────────────────┘││
            ↓                       │
┌─────────────────────────────────┐││
│ React Router                    │││
│ Route: /dashboard               │││
│ Component: PatientDashboard    │││
│                                 │││
│ Props: none (data from state)   │││
└─────────────────────────────────┘││
            ↓                       │
┌─────────────────────────────────┐││
│ PatientDashboard useEffect      │││
│                                 │││
│ 1. fetchUserData()              │││
│    - Read localStorage          │││
│    - Construct user object      │││
│    - Set state: user = {...}    │││
│                                 │││
│ 2. fetchGames()                 │││
│    - axios.get("/api/games")    │││
│    - Interceptor adds headers   │││
│    - Set state: games = [...]   │││
└─────────────────────────────────┘││
            ↓                       │
┌─────────────────────────────────┐││
│ Dashboard UI Rendered           │││
│                                 │││
│ ├─ User name: "vikasss"         │││
│ ├─ User email: "vikasss@..."    │││
│ ├─ Games list                   │││
│ │  ├─ Memory Match              │││
│ │  ├─ Math Quiz                 │││
│ │  └─ ...                        │││
│ └─ Logout button                │││
└─────────────────────────────────┘││
            ↓                       │
      [User Interacts]             │
            ↑                       │
            └───────────────────────┘
```

---

## localStorage Structure

```
Window.localStorage
│
├─ demoRole
│  └─ "player" | "doctor" | "guardian"
│
├─ token
│  └─ "demo-token-player" | "demo-token-doctor" | "demo-token-guardian"
│
├─ userId
│  └─ "67b01d7596d45b9e9566d3cf" | "67a5c7598becf8fd6cdc8339" | "67b01cae96d45b9e9566d3c5"
│
├─ userName
│  └─ "vikasss" | "bigbulll" | "vikass"
│
├─ userEmail
│  └─ "vikasss@gmail.com" | "bigbull@gmail.com" | "vikass@gmail.com"
│
├─ userRole
│  └─ "player" | "doctor" | "guardian"
│
└─ role (backward compatibility)
   └─ "player" | "doctor" | "guardian"
```

---

## DEMO_USERS Object Structure

```javascript
DEMO_USERS = {
  player: {
    _id: "67b01d7596d45b9e9566d3cf",
    name: "vikasss",
    email: "vikasss@gmail.com",
    role: "player",
    guardian: "67b01cae96d45b9e9566d3c5"
  },
  
  doctor: {
    _id: "67a5c7598becf8fd6cdc8339",
    name: "bigbulll",
    email: "bigbull@gmail.com",
    role: "doctor"
  },
  
  guardian: {
    _id: "67b01cae96d45b9e9566d3c5",
    name: "vikass",
    email: "vikass@gmail.com",
    role: "guardian",
    guardian: null
  }
}
```

---

## Request Headers Flow

```
FRONTEND REQUEST
│
├─ GET /api/patient/games HTTP/1.1
├─ Host: localhost:5000
├─ Content-Type: application/json
│
├─ x-auth-token: demo-token-player      ← Added by Axios interceptor
├─ x-user-role: player                  ← Added by Axios interceptor
│
└─ [Body if POST/PUT]

BACKEND MIDDLEWARE CHECKS
│
├─ IF DEMO_MODE = "true"
│  └─ Check x-demo-role or x-user-role header
│
├─ ELSE IF token starts with "demo-token-"
│  └─ Extract role from token
│
└─ ELSE
   └─ Validate JWT signature

ROUTE HANDLER
│
└─ req.user = {
     id: user_id_from_middleware,
     role: user_role,
     name: user_name,
     email: user_email
   }
```

---

## Session Lifecycle

```
SESSION START
│
└─→ User clicks role button
   │
   ├─→ handleRoleSelection()
   │   └─→ localStorage populated
   │
   └─→ navigate() to dashboard
      │
      └─→ Dashboard mounts

SESSION ACTIVE
│
├─→ User plays games
│  └─→ API calls include demo token
│     └─→ req.user available in routes
│        └─→ Data saves to MongoDB
│
├─→ Page refreshes
│  └─→ localStorage still has data
│     └─→ Session persists
│
└─→ User navigates
   └─→ Session maintained
      └─→ Can switch between dashboards
         └─→ All requests authenticated

SESSION END
│
└─→ User clicks Logout
   │
   ├─→ localStorage.removeItem("token") [optional]
   │
   ├─→ navigate("/") [Landing Page]
   │
   └─→ Can select new role
      └─→ New session starts
```

---

**Diagram Complete** - Visual representation of the entire demo mode architecture, data flow, and request/response cycle.
