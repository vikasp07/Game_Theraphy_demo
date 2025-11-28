# GameTherapy - Demo Mode Setup Guide

## Overview
The GameTherapy application has been configured to run in **DEMO MODE** without requiring authentication. You can directly access the application as one of three predefined users.

## Pre-configured Users

The following users are available for testing:

### 1. **Player (Patient)**
- **Name**: vikasss
- **Email**: vikasss@gmail.com
- **User ID**: 67b01d7596d45b9e9566d3cf
- **Role**: player
- **Guardian**: vikass (67b01cae96d45b9e9566d3c5)

### 2. **Doctor**
- **Name**: bigbulll
- **Email**: bigbull@gmail.com
- **User ID**: 67a5c7598becf8fd6cdc8339
- **Role**: doctor

### 3. **Guardian**
- **Name**: vikass
- **Email**: vikass@gmail.com
- **User ID**: 67b01cae96d45b9e9566d3c5
- **Role**: guardian
- **Guardian ID**: null (is a guardian)

---

## Running the Application

### Backend Setup

1. Navigate to the backend directory:
```powershell
cd backend
```

2. Install dependencies (if not already done):
```powershell
npm install
```

3. Verify the `.env` file contains:
```env
DEMO_MODE=true
MONGO_URI=mongodb+srv://kapseharsht:57KhiChVpzvkeld2@ves-hack-it.wwqsy.mongodb.net/?retryWrites=true&w=majority&appName=VES-HACK-IT
JWT_SECRET=7CsAzgZ512Ut83n8RAYgMbQ49O0RAEQFNbqJV5qp72Y2BTZv5lBJniUeYb7xLxHA
PORT=5000
GOOGLE_CLIENT_ID=1027143313364-m1j0c8voa1ocnaj563lqi1s24pt2pa21.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
```

4. Start the backend server:
```powershell
npm start
# or
node server.js
```

The backend should start on `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
```powershell
cd frontend
```

2. Install dependencies (if not already done):
```powershell
npm install
```

3. Start the React development server:
```powershell
npm start
```

The frontend should automatically open on `https://game-theraphy-backend.onrender.com`

---

## Using the Application

### Landing Page
When you open the app, you'll see the Landing Page with three buttons:

1. **Continue as Player (vikasss)** - Access the Patient Dashboard
2. **Continue as Guardian (vikass)** - Access the Guardian Dashboard
3. **Continue as Doctor (bigbulll)** - Access the Doctor Dashboard

Simply click on the desired role to access that dashboard with pre-populated user data.

### Dashboards

#### Patient Dashboard (Player)
- View available games
- Play games (Memory Match, Math Quiz, Word Scramble, etc.)
- Track progress
- View e-diary
- Access tasks

#### Doctor Dashboard
- Schedule seminars
- Manage patient progress
- Add game sessions
- Access Google Calendar integration

#### Guardian Dashboard
- View child's (player's) progress
- Monitor game performance
- Track patient sessions
- View leaderboards

---

## Authentication Bypass

### How It Works

1. **Backend (`auth.js` middleware)**:
   - Checks for `DEMO_MODE=true` in `.env`
   - Accepts demo tokens in format: `demo-token-[role]`
   - Returns pre-configured user data for demo roles

2. **Frontend (`api.js`)**:
   - Axios interceptor automatically adds user role header
   - Stores demo token in localStorage on role selection
   - Demo users embedded in `demoConfig.js`

3. **Routes**:
   - All protected routes use the updated `auth` middleware
   - Auth middleware validates either JWT or demo token
   - Demo tokens bypass full JWT verification

---

## Data Persistence

User session data is stored in `localStorage`:

```javascript
- "demoRole"   : Selected role (player/doctor/guardian)
- "token"      : Demo token (demo-token-[role])
- "userId"     : User's MongoDB ID
- "userName"   : User's name
- "userEmail"  : User's email
- "userRole"   : User's role
- "role"       : (Backward compatibility)
```

This data persists across page refreshes but is cleared when you navigate back to the Landing Page or clear browser storage.

---

## File Changes Made

### Backend
- **`middleware/auth.js`**: Added demo user support and demo token validation
- **`server.js`**: Already had DEMO_MODE condition for chat routes
- **.env**: `DEMO_MODE=true` enabled

### Frontend
- **`demoConfig.js`**: Updated with actual user IDs and data from database
- **`api.js`**: Added axios interceptor for automatic token injection
- **`components/LandingPage.js`**: Implemented direct role selection without login
- **`components/PatientDashboard.js`**: Updated to use localStorage user data in demo mode

---

## Testing Each Role

### Test Player Flow:
1. Click "Continue as Player"
2. Verify redirected to Patient Dashboard
3. Click on "Games" to view available games
4. Start any game and play
5. Check progress tracking

### Test Doctor Flow:
1. Click "Continue as Doctor"
2. Verify redirected to Doctor Dashboard
3. Create a new seminar
4. View seminar list
5. Check patient management features

### Test Guardian Flow:
1. Click "Continue as Guardian"
2. Verify redirected to Guardian Dashboard
3. View player list (should show associated child)
4. Click "View Games" for a player
5. Monitor progress and performance

---

## Logging Out

To switch roles:
1. Click "Logout" button in the dashboard
2. You'll be redirected to Landing Page
3. Select a different role to test

---

## Troubleshooting

### Issue: "No token, authorization denied"
**Solution**: 
- Ensure `.env` has `DEMO_MODE=true`
- Check browser localStorage for demo token
- Clear localStorage and try again

### Issue: Games not loading
**Solution**:
- Verify backend is running on port 5000
- Check Network tab in browser DevTools
- Ensure MongoDB connection is working

### Issue: Wrong user data displayed
**Solution**:
- Clear browser localStorage (`localStorage.clear()` in console)
- Refresh page and reselect role
- Check that `demoConfig.js` has correct user IDs

---

## Notes

- **MongoDB Integration**: App still connects to real MongoDB for data persistence
- **No Email Verification**: Demo mode skips all email/password validation
- **Demo Data**: Uses mock data for games and progress where API calls fail
- **Google Integration**: Google Calendar/Auth still requires credentials in `.env`

---

## Disabling Demo Mode

To restore normal authentication:

1. In `.env`, change:
```env
DEMO_MODE=false
```

2. Restart backend server

3. Frontend will show Login/Register pages again

---

Generated: November 28, 2025
