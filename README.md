
# 🎮 GameTherapy: Interactive Mental Health Gaming Platform
Welcome to **Game Therapy**, an adaptive gaming platform designed to support individuals with cognitive, social, and emotional challenges. Our solution combines innovative games, real-time AI support, and gesture-based controls to create a personalized therapeutic experience.

Watch detail walkthrough of Game Therapy: https://www.youtube.com/watch?v=Lg2mKiUPsIM

---

## What is Game Therapy?

Game Therapy addresses the unique needs of people with mental challenges by providing:
## ✨ Features

✅ **Family Tree Game**: Helps dyslexic users recognize names using Arduino-based hand gestures.  
✅ **Astra Maze**: Interactive ball maze controlled via motion tracking.  
✅ **AI Therapy Chatbot**: Provides emotional support using Llama and LLM-based AI.  
✅ **Guardian Dashboard**: Tracks player progress with visual charts.  
✅ **Community Support**: Users can chat with others in a safe environment.  

<div align="center">
  <img src="frontend/public/Homepage.jpg" alt="Family Tree Game Screenshot" width="500">
</div>
---

## Interactive Features

### Family Tree
- **Dyslexia-Friendly Game:**  
  Players use Arduino-based hand gestures to indicate whether a displayed name is correct by moving their hand left or right.

<div align="center">
  <img src="frontend/public/gameTheraphy.jpg" alt="Family Tree Game Screenshot" width="500">
</div>

### Astra
- **Maze Navigation:**  
  Control a ball through a maze using hand gestures, enhancing motor skills and spatial awareness.

### AI Chatbot & Guardian Dashboard
- **Real-Time AI Support:**  
  Chat with our AI therapist (powered by Llama and other LLMs) for personalized emotional support.
- **Progress Tracking:**  
  Guardians can view interactive charts and analytics to monitor a player’s progress.
- **Community Interaction:**  
  Engage with a built-in chat platform to share experiences and insights.

<div align="center">
  <img src="frontend/public/guard.jpg" alt="Guardian Dashboard Screenshot" width="500">
</div>

---


## Video Demonstration

Watch our detailed walkthrough of Game Therapy:

[![Watch the Video](https://img.youtube.com/vi/Lg2mKiUPsIM/0.jpg)](https://www.youtube.com/watch?v=Lg2mKiUPsIM)

*Click the image above to watch the video demonstration.*

---

## Technologies Used

- **Frontend:** React.js, HTML5, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Machine Learning:** TensorFlow, Hugging Face
- **AI Chatbot:** Llama and other LLMs
- **Communication & APIs:** Twilio, Google APIs
- **Hardware Integration:** Arduino (for gesture-based controls)

---

## 🚀 Installation and Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/vikasp07/Game-Theraphy.git
   cd Game-Theraphy

### Demo mode (no login required)

This project supports a demo mode so anyone can open it and immediately choose a role (Player, Guardian, or Doctor) and view dashboards without signing up or logging in.

How it works:
- Frontend shows role selection buttons on the landing page. Clicking a role navigates directly to the corresponding dashboard.
- Backend bypasses JWT authentication when DEMO_MODE=true, allowing protected routes to respond for exploration. Chat also works without a token in demo mode.

Enable demo mode:
1) Backend: set environment variable DEMO_MODE=true in a `.env` file in `backend/`.
2) Frontend: it defaults to demo mode ON. You can toggle from the landing page (Demo: ON/OFF) or set `REACT_APP_DEMO_MODE=true` in `frontend/.env`.

Windows PowerShell quick start:

```powershell
# In one terminal (backend)
cd backend
$env:DEMO_MODE="true"
npm install
npm start

# In another terminal (frontend)
cd ../frontend
npm install
npm start
```

Notes:
- In demo mode, data like user info, games, and progress are mocked in the frontend. Actions like creating seminars are simulated locally.
- For production, turn off demo: set DEMO_MODE=false in backend and REACT_APP_DEMO_MODE=false in frontend (or toggle on landing page).
