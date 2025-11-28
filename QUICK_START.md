# Quick Reference - GameTherapy Demo Mode

## 🚀 Quick Start (3 Steps)

### Step 1: Start Backend
```powershell
cd backend
npm start
```
Backend runs on: `http://localhost:5000`

### Step 2: Start Frontend (new terminal)
```powershell
cd frontend
npm start
```
Frontend runs on: `https://game-theraphy-backend.onrender.com`

### Step 3: Select Role
Click one of three buttons:
- **Player** → Patient Dashboard
- **Doctor** → Doctor Dashboard  
- **Guardian** → Guardian Dashboard

---

## 👥 User Credentials

| Role | Name | ID | Features |
|------|------|-----|----------|
| 🎮 **Player** | vikasss | 67b01... | Play games, track progress |
| 👨‍⚕️ **Doctor** | bigbulll | 67a5... | Manage patients, schedule |
| 👨‍👩‍👧 **Guardian** | vikass | 67b0... | Monitor child's progress |

---

## 🎮 Available Games

All accessible from dashboards:
1. Memory Match
2. Math Quiz
3. Word Scramble
4. Family Tree Game
5. Astray (Maze)
6. Traffic Run
7. Story Game
8. Family Match

---

## 📝 Key Features

### Player Dashboard
- Browse & play games
- Track scores and progress
- Access e-Diary
- View tasks assigned by doctor
- Check leaderboards

### Doctor Dashboard
- Schedule seminars
- Create tasks for patients
- Monitor patient progress
- View game sessions
- Access patient details

### Guardian Dashboard
- Monitor child's gaming activity
- View progress reports
- Check game scores
- Track assigned tasks
- View leaderboards

---

## 🔐 No Authentication Needed!

✅ No login required  
✅ No password entry  
✅ No email verification  
✅ Direct dashboard access  
✅ All data saves to database  

---

## 📂 File Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── LandingPage.js      ← Role selector
│   │   ├── PatientDashboard.js ← Player interface
│   │   ├── DoctorDashboard.js  ← Doctor interface
│   │   └── GuardianDashboard.js ← Guardian interface
│   ├── api.js                  ← Auto-token injection
│   └── demoConfig.js           ← User data

backend/
├── middleware/
│   └── auth.js                 ← Demo token support
└── .env                        ← DEMO_MODE=true
```

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| "No token, authorization denied" | Restart backend with `DEMO_MODE=true` |
| Games not loading | Check backend on `localhost:5000` |
| Wrong user displayed | Clear localStorage, refresh page |
| Can't switch roles | Clear localStorage, go back to landing page |

Clear localStorage: Open DevTools → Console → `localStorage.clear()`

---

## 🔄 Role Switching

1. Click **Logout** in any dashboard
2. Returns to Landing Page
3. Click different role button
4. Data switches automatically

---

## 💾 Data Persistence

- **Games**: Save to MongoDB
- **Progress**: Saves automatically
- **User Session**: In localStorage
- **Clear Session**: Logout or `localStorage.clear()`

---

## 🌐 API Endpoints (All Work!)

```
GET  /api/patient/games       ← Get games list
POST /api/games/start         ← Start new game
POST /api/games/progress      ← Save progress
GET  /api/doctor/seminars     ← Get seminars
POST /api/doctor/seminars     ← Create seminar
GET  /api/guardian/players/games ← View child progress
```

---

## 🚪 Logout & Switch Users

```
Dashboard → Logout Button
           ↓
        Landing Page
           ↓
    Select Different Role
           ↓
    New Dashboard Loaded
```

---

## 💡 Pro Tips

1. **Monitor Network Tab**: See demo tokens being sent
2. **Check DevTools**: localStorage shows user data
3. **Game Scores**: All saved to real database
4. **Progress Tracking**: Real-time updates
5. **Multiple Dashboards**: Open in different tabs to compare

---

## 🔐 Security Notes for Demo

- Demo tokens allow full access to all routes
- No real password validation
- MongoDB still validates data integrity
- Games still calculate real scores
- All data persists permanently

---

## ⚙️ Environment Check

```powershell
# Check Node.js
node --version

# Check npm
npm --version

# Check ports
netstat -ano | findstr :5000  # Backend
netstat -ano | findstr :3000  # Frontend
```

---

## 🎯 What to Test

- [ ] Landing page loads with 3 buttons
- [ ] Each role loads correct dashboard
- [ ] Games launch from dashboard
- [ ] Progress saves and displays
- [ ] Logout returns to landing page
- [ ] Role switching works
- [ ] All 8 games accessible

---

**Last Updated**: November 28, 2025  
**Status**: ✅ Ready to Use
