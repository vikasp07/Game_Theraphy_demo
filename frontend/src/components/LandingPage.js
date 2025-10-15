import React from "react";
import { useNavigate } from "react-router-dom";
import { isDemoMode, setDemoMode } from "../demoConfig";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div id="landing-image">
      <div id="landing-page">
        <div id="landing-header">
          <div id="landing-buttons">
            <button
              style={{
                height: "40px",
                padding: "10px 20px",
                margin: "10px",
                fontSize: "1rem",
                fontFamily: "Inter",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(to left, #4B4B4B, #A6A6A6)",
                boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.5)",

                color: "#fff",
                transition: "background-color 0.3s",
                alignItems: "center",
              }}
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>
            <button
              style={{
                height: "40px",
                padding: "10px 20px",
                fontFamily: "Inter",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(to right,rgb(208, 121, 243),rgb(154, 53, 194))",
                boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.1)",
                color: "#fff",
                transition: "background-color 0.3s",
                justifyContent: "space-evenly",
                margin: "10px",
                alignItems: "center",
              }}
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
            {/* Demo toggle (optional) */}
            <button
              style={{
                height: "40px",
                width: "130px",
                padding: "10px 15px",
                margin: "10px",
                fontSize: "0.85rem",
                fontWeight: "600",
                borderRadius: "5px",
                border: isDemoMode() ? "2px solid #10b981" : "2px solid #ef4444",
                cursor: "pointer",
                background: isDemoMode() 
                  ? "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)" 
                  : "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                color: "#fff",
                boxShadow: isDemoMode() 
                  ? "0 4px 12px rgba(16, 185, 129, 0.4)" 
                  : "0 4px 12px rgba(239, 68, 68, 0.4)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = isDemoMode() 
                  ? "0 6px 16px rgba(16, 185, 129, 0.6)" 
                  : "0 6px 16px rgba(239, 68, 68, 0.6)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = isDemoMode() 
                  ? "0 4px 12px rgba(16, 185, 129, 0.4)" 
                  : "0 4px 12px rgba(239, 68, 68, 0.4)";
              }}
              onClick={() => setDemoMode(!isDemoMode())}
              title="Toggle demo mode"
            >
              {isDemoMode() ? "🟢 Demo: ON" : "🔴 Demo: OFF"}
            </button>
          </div>
        </div>

        <div id="name-vayudrishti">
          {/* <div id="landing-image"> */}
          <div id="vayu">GameTherapy</div>
          <div id="drishti">Gaming Made for YouAdaptive, Inclusive, Fun!</div>
        </div>

        {/* Role selection for direct access */}
        <div id="get-started">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button
              style={{
                height: "45px",
                width: "fit-content",
                padding: "0px 25px",
                margin: "10px",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                background:
                  "linear-gradient(to right,rgb(208, 121, 243),rgb(154, 53, 194))",
                boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.1)",
                color: "#fff",
                transition: "background-color 0.3s",
              }}
              onClick={() => {
                // Default to demo mode navigation
                localStorage.setItem("role", "player");
                navigate("/dashboard");
              }}
            >
              Continue as Player
            </button>
            <button
              style={{
                height: "45px",
                width: "fit-content",
                padding: "0px 25px",
                margin: "10px",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(to right, #4f46e5, #06b6d4)",
                boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.1)",
                color: "#fff",
                transition: "background-color 0.3s",
              }}
              onClick={() => {
                localStorage.setItem("role", "guardian");
                navigate("/guardian-dashboard");
              }}
            >
              Continue as Guardian
            </button>
            <button
              style={{
                height: "45px",
                width: "fit-content",
                padding: "0px 25px",
                margin: "10px",
                fontSize: "1rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                background: "linear-gradient(to right, #10b981, #22c55e)",
                boxShadow: "inset 0 0 50px rgba(0, 0, 0, 0.1)",
                color: "#fff",
                transition: "background-color 0.3s",
              }}
              onClick={() => {
                localStorage.setItem("role", "doctor");
                navigate("/doctor-dashboard");
              }}
            >
              Continue as Doctor
            </button>
          </div>
        </div>
      </div>
      <div id="nextscroll_1">
        <div id="whychoseus">
          <div id="why">Why Choose Us ?</div>
          <div class="reason-rows">
            <div id="reason-1">
              <div className="symbol">
                <img
                  id="controller-img"
                  src="/game-controller.png"
                  alt="game controller"
                  style={{ width: "25%", height: "auto" }}
                />
              </div>
              Adaptive Gameplay<br></br>
              Games adjust to your pace
            </div>
            <div id="reason-2">
              <div className="symbol">
                <img
                  id="ai_robo-img"
                  src="/ai_robot.png"
                  alt="ai robo"
                  style={{ width: "15%", height: "auto" }}
                />
              </div>
              AI Assistance <br></br>
              Get help whenever you need it.
            </div>
          </div>
          <div class="reason-rows">
            <div id="reason-3">
              <div className="symbol">
                <img
                  id="ai_robo-img"
                  src="/all_inclusive.png"
                  alt="growth symbol"
                  style={{ width: "15%", height: "auto" }}
                />
              </div>
              Inclusive for All<br></br>
              Everyone can enjoy gaming here.
            </div>

            <div id="reason-4">
              <div className="symbol">
                <img
                  id="ai_robo-img"
                  src="/growth_symbol.png"
                  alt="growth symbol"
                  style={{ width: "15%", height: "auto" }}
                />
              </div>
              Progress Tracking<br></br>
              See how you’re improving over time.
            </div>
          </div>
        </div>
      </div>
      <div id="nextscroll_2">
        <div id="how_works">How It Works</div>

        <div id="signup_work">
          <div id="circle_1" class="circle">
            1
          </div>
          <div class="how_content">
            <span style={{ fontWeight: "bold" }}>Sign Up:</span> Create your
            account.
          </div>
        </div>

        <div id="choose_game">
          <div class="how_content">
            <span style={{ fontWeight: "bold" }}>Choose Your Game:</span>{" "}
            <br></br>
            Pick what you want to play.
          </div>
          <div id="circle_2" class="circle">
            2
          </div>
        </div>

        <div id="play_n_enjoy">
          <div id="circle_3" class="circle">
            3
          </div>
          <div class="how_content">
            <span style={{ fontWeight: "bold" }}>Play & Enjoy:</span> Start
            having fun!
          </div>
        </div>

        <div id="track_progress">
          <div class="how_content">
            <span style={{ fontWeight: "bold" }}>Track Your Progress:</span>
            <br></br>
            See how you're doing.
          </div>
          <div id="circle_4" class="circle">
            4
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
