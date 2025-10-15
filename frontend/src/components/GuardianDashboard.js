import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isDemoMode, DEMO_PLAYERS } from "../demoConfig";

const GuardianDashboard = () => {
  const [playersData, setPlayersData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch players and their game details associated with this guardian
  const fetchPlayersGameDetails = async () => {
    try {
      if (!token && isDemoMode()) {
        console.log("Demo mode active, loading demo players:", DEMO_PLAYERS);
        setPlayersData(DEMO_PLAYERS);
        setErrorMessage("");
        return;
      }
      const res = await axios.get(
        "http://localhost:5000/api/guardian/players/games",
        {
          headers: { "x-auth-token": token },
        }
      );
      setPlayersData(res.data);
      setErrorMessage("");
    } catch (error) {
      console.error(
        "Error fetching players' game details:",
        error.response?.data || error.message
      );
      setErrorMessage("Failed to load players' game data.");
    }
  };

  useEffect(() => {
    fetchPlayersGameDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigate to the patient games page with the patient's ID
  const handleViewGames = (patientId) => {
    navigate(`/patient-games/${patientId}`);
  };

  // Logout function: clear token and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("token");
    if (isDemoMode()) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  console.log("GuardianDashboard render - playersData:", playersData);
  console.log("GuardianDashboard render - token:", token);
  console.log("GuardianDashboard render - isDemoMode:", isDemoMode());

  return (
    <div className="guardian-dashboard">
      <h2>Guardian Dashboard</h2>
      {isDemoMode() && !token && (
        <div style={{ background: "#fef3c7", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #f59e0b" }}>
          <strong>Demo Mode:</strong> Viewing sample player data ({playersData.length} players loaded)
        </div>
      )}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div style={{ margin: "20px 0", padding: "10px", background: "#f0f0f0" }}>
        <p><strong>Debug Info:</strong></p>
        <p>Players Count: {playersData.length}</p>
        <p>Demo Mode: {isDemoMode() ? "Yes" : "No"}</p>
        <p>Has Token: {token ? "Yes" : "No"}</p>
      </div>
      {playersData.length > 0 ? (
        <div className="players-list">
          <h3>My Players ({playersData.length})</h3>
          {playersData.map(({ player, progress }) => (
            <div key={player._id} className="player-card" style={{ border: "2px solid #4CAF50", padding: "15px", margin: "10px 0", borderRadius: "8px" }}>
              <p>
                <strong>Name:</strong> {player.name}
              </p>
              <p>
                <strong>Email:</strong> {player.email}
              </p>
              <p>
                <strong>ID:</strong> {player._id}
              </p>
              <button onClick={() => handleViewGames(player._id)} style={{ padding: "10px 20px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                View Games
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>No players associated with this guardian.</p>
          <p>This should not happen in demo mode!</p>
        </div>
      )}
    </div>
  );
};

export default GuardianDashboard;
