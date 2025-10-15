
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./patient-dashboard.css";
import { isDemoMode, DEMO_USERS, DEMO_GAMES } from "../demoConfig";

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token && isDemoMode()) {
        // Demo user
        setUser(DEMO_USERS.player);
        return;
      } else if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get(
        "http://localhost:5000/api/detail",
        {
          headers: { "x-auth-token": token },
        }
      );
      setUser(res.data);
    } catch (error) {
      setError("Failed to load user details.");
    }
  };

  const fetchGames = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token && isDemoMode()) {
        setGames(DEMO_GAMES);
        return;
      } else if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get(
        "http://localhost:5000/api/patient/games",
        {
          headers: { "x-auth-token": token },
        }
      );
      setGames(res.data.slice(0, 8)); // Show only 7 games
    } catch (error) {
      setError("Failed to load games.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (isDemoMode()) {
      // In demo mode, go back to landing
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <nav className="navbar">
        <a href="/" className="logo">
          GameTherapy
        </a>
        <div className="menu">
          <Link to="/dashboard">Home</Link>
          <Link to="/games">Games</Link>
          <Link to="/tasks">Tasks</Link>
          <Link to="/pages/Ediary">e-Diary</Link>
        </div>
        <div className="profile-dropdown" ref={dropdownRef}>
          {user?.profilePic ? (
            <img
              src={`http://localhost:5000/${user.profilePic.replace(/\\/g, "/")}`}
              alt="Profile"
              className="profile-pic"
              onClick={toggleDropdown}
            />
          ) : (
            <img
              src="/default-profile.png"
              alt="Default Profile"
              className="profile-pic"
              onClick={toggleDropdown}
            />
          )}
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                {user?.profilePic ? (
                  <img
                    src={`http://localhost:5000/${user.profilePic.replace(/\\/g, "/")}`}
                    alt="Profile"
                    className="dropdown-profile-pic"
                  />
                ) : (
                  <img
                    src="/default-profile.png"
                    alt="Default Profile"
                    className="dropdown-profile-pic"
                  />
                )}
                <div className="dropdown-user-info">
                  <p className="dropdown-name">{user?.name || "User Name"}</p>
                  <p className="dropdown-email">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
              <div className="dropdown-divider" />
              <Link to="/pages/profile" className="dropdown-item">
                Profile
              </Link>
              <Link to="/leaderboard" className="dropdown-item">
                Leaderboard
              </Link>
              <Link to="/settings" className="dropdown-item">
                Settings
              </Link>
              <div className="dropdown-divider" />
              <button
                onClick={handleLogout}
                className="dropdown-item logout-btn"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="dashboard-container">
        <main className="main-content">
          {isDemoMode() && !localStorage.getItem("token") && (
            <div style={{ background: "#fef3c7", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #f59e0b" }}>
              <strong>Demo Mode:</strong> You're viewing the player dashboard with sample data. Click games to play!
            </div>
          )}
          {error && <p className="error">{error}</p>}

          {/* Play & Enjoy Section */}
          <section className="game-section">
            <h2>Play & Enjoy</h2>
            <div className="game-grid">
              {games.length > 0 ? (
                games.map((game) => (
                  <div className="game-card" key={game.id}>
                    <img
                      src={game.image || `/game_${game.id}.jpeg`}
                      alt={game.title}
                    />
                    <h4>{game.title}</h4>
                    <p>{game.description}</p>
                    <button onClick={() => navigate(`/games/${game.id}`)}>
                      Play Now
                    </button>
                  </div>
                ))
              ) : (
                <p className="no-games">No games available.</p>
              )}
            </div>
          </section>

          {/* Share & Communicate Section */}
          <section className="communication-section">
            <h2>Share & Communicate</h2>
            <div className="card-grid">
              {/* Therapeutic Bot */}
              <div className="feature-card">
                <img
                  src="/therapeutic_bot.png"
                  alt="Therapeutic Bot"
                  className="card-image"
                />
                <h4>Therapeutic Bot</h4>
                <p>
                  Need a listening ear? Chat with our AI-powered bot for a safe
                  space to share your thoughts.
                </p>
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://96bd02286bf4975648.gradio.live/")
                  }
                >
                  Share Your Thoughts
                </button>
              </div>

              {/* Chatroom */}
              <div className="feature-card">
                <img
                  src="/chatroom.jpg"
                  alt="Chatroom"
                  className="card-image"
                />
                <h4>Join the Chatroom</h4>
                <p>
                  Connect with others and discuss freely in our supportive
                  community.
                </p>
                <button onClick={() => navigate("/chatroom")}>
                  Enter Chatroom
                </button>
              </div>

              {/* Stories Card */}
              <div className="feature-card">
                <img
                  src="/stories.png"
                  alt="Voice Stories"
                  className="card-image"
                />
                <h4>Your Voice Stories</h4>
                <p>
                  Listen to your recorded voice entries from the e-Diary and
                  track your journey.
                </p>
                <button onClick={() => navigate("/pages/stories")}>
                  View Your Voice Entries
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      <footer className="footer">
        © 2025 GameTherapy. All Rights Reserved.
      </footer>
    </>
  );
};

export default PatientDashboard;
