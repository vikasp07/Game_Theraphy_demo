import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DEMO_USERS } from "../demoConfig";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-logout: Clear session when landing page loads
    localStorage.removeItem("demoRole");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("role");
    
    console.log("🏠 Home page loaded - Session cleared. Select a role to continue.");
  }, []);

  const handleRoleSelection = (role) => {
    // Store the selected role and user data
    const user = DEMO_USERS[role];
    localStorage.setItem("demoRole", role);
    localStorage.setItem("token", "demo-token-" + role);
    localStorage.setItem("userId", user._id);
    localStorage.setItem("userName", user.name);
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("role", role); // Keep for backward compatibility
    
    // Redirect to appropriate dashboard
    if (role === "doctor") {
      navigate("/doctor-dashboard");
    } else if (role === "guardian") {
      navigate("/guardian-dashboard");
    } else if (role === "player") {
      navigate("/dashboard");
    }
  };

  return (
    <div id="landing-image">
      <div id="landing-page">
        <div id="landing-header">
          <div id="landing-buttons">
            {/* Demo mode always ON - no toggle needed */}
          </div>
        </div>

        <div id="name-vayudrishti">
          {/* <div id="landing-image"> */}
          <div id="vayu">GameTherapy</div>
          <div id="drishti">Gaming Made for YouAdaptive, Inclusive, Fun!</div>
        </div>

        {/* Demo Mode Info Box */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "20px 30px",
          margin: "20px auto",
          borderRadius: "12px",
          maxWidth: "600px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(10px)"
        }}>
          <p style={{ margin: "0 0 8px 0", fontSize: "18px", fontWeight: "bold" }}>
            🎮 Demo Mode - Viewing Project
          </p>
          <p style={{ margin: "0", fontSize: "14px", opacity: "0.95" }}>
            Experience the GameTherapy platform with three pre-configured users. Select a role below to explore the application.
          </p>
        </div>

        {/* Role selection for direct access */}
        <div id="get-started">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
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
              onClick={() => handleRoleSelection("player")}
            >
              Continue as Player (vikasss)
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
              onClick={() => handleRoleSelection("guardian")}
            >
              Continue as Guardian (vikass)
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
              onClick={() => handleRoleSelection("doctor")}
            >
              Continue as Doctor (bigbulll)
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
