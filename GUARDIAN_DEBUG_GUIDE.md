# Guardian Dashboard Debugging Guide

## Changes Made

### 1. Added player@gmail.com to Demo Players
Updated `frontend/src/demoConfig.js` to include a player with email "player@gmail.com":
```javascript
export const DEMO_PLAYERS = [
  {
    player: { _id: "demo-player-1", name: "Demo Player", email: "player@gmail.com" },
    progress: DEMO_PROGRESS,
  },
  {
    player: { _id: "p1", name: "Demo Child 1", email: "child1@example.com" },
    progress: DEMO_PROGRESS,
  },
  {
    player: { _id: "p2", name: "Demo Child 2", email: "child2@example.com" },
    progress: DEMO_PROGRESS,
  },
];
```

### 2. Enhanced Debug Information
Added comprehensive debugging to `GuardianDashboard.js`:
- Console logs showing when demo mode is active
- Debug panel showing:
  - Players count
  - Demo mode status
  - Token status
- Styled player cards with green borders for visibility
- Player count in header

### 3. Visual Improvements
- Each player card now has a green border and clear styling
- Player count displayed in the section header
- Demo mode banner shows count of loaded players
- Better error messaging

## How to Test

### Step 1: Clear Browser Cache
1. Open browser DevTools (F12)
2. Go to Application tab
3. Clear all local storage
4. Close DevTools

### Step 2: Refresh the Page
1. Go to `http://localhost:3000`
2. Ensure "Demo: ON" toggle is visible and enabled on landing page

### Step 3: Open as Guardian
1. Click "Continue as Guardian" button
2. You should immediately see:
   - Yellow demo mode banner saying "Viewing sample player data (3 players loaded)"
   - Debug Info panel showing:
     - Players Count: 3
     - Demo Mode: Yes
     - Has Token: No
   - Section titled "My Players (3)"
   - Three player cards with green borders:
     - Demo Player (player@gmail.com)
     - Demo Child 1 (child1@example.com)
     - Demo Child 2 (child2@example.com)

### Step 4: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for these logs:
   ```
   Demo mode active, loading demo players: [Array of 3 players]
   GuardianDashboard render - playersData: [Array of 3 players]
   GuardianDashboard render - token: null
   GuardianDashboard render - isDemoMode: true
   ```

## Troubleshooting

### If You Still Don't See Players:

1. **Check if Demo Mode is ON:**
   - Look at landing page, ensure toggle says "Demo: ON"
   - If it says "Demo: OFF", click it to turn it ON

2. **Clear localStorage:**
   - Open Console (F12)
   - Type: `localStorage.clear()`
   - Press Enter
   - Refresh page

3. **Check Console Errors:**
   - Open DevTools Console
   - Look for any red error messages
   - Check if `DEMO_PLAYERS` is being imported correctly

4. **Verify File Saved:**
   - Make sure `demoConfig.js` changes are saved
   - Check that `GuardianDashboard.js` changes are saved
   - Restart the frontend server if needed:
     ```powershell
     # Stop with Ctrl+C
     npm start
     ```

5. **Hard Refresh:**
   - Windows: Ctrl + Shift + R
   - Or: Ctrl + F5

## What You Should See

### Landing Page:
- Three colorful buttons: "Continue as Player", "Continue as Guardian", "Continue as Doctor"
- Demo ON/OFF toggle button (should be green = ON)

### Guardian Dashboard:
```
Guardian Dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟨 Demo Mode: Viewing sample player data (3 players loaded)

[Logout]

Debug Info:
Players Count: 3
Demo Mode: Yes
Has Token: No

My Players (3)
┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Name: Demo Player        ┃
┃ Email: player@gmail.com  ┃
┃ ID: demo-player-1        ┃
┃ [View Games]             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Name: Demo Child 1       ┃
┃ Email: child1@example... ┃
┃ ID: p1                   ┃
┃ [View Games]             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Name: Demo Child 2       ┃
┃ Email: child2@example... ┃
┃ ID: p2                   ┃
┃ [View Games]             ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

## Next Steps

After confirming players are visible:
1. Click "View Games" on any player
2. You should see game progress charts and tasks
3. All data should render properly

If you still have issues after following all these steps, please share:
1. Screenshot of the Guardian Dashboard page
2. Console log output
3. Contents of localStorage (type `localStorage` in console)
