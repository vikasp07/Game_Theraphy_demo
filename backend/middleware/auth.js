const jwt = require("jsonwebtoken");

// Demo mode user data
const DEMO_USERS = {
  player: {
    _id: "67b01d7596d45b9e9566d3cf",
    name: "vikasss",
    email: "vikasss@gmail.com",
    role: "player",
    guardian: "67b01cae96d45b9e9566d3c5",
  },
  doctor: {
    _id: "67a5c7598becf8fd6cdc8339",
    name: "bigbulll",
    email: "bigbull@gmail.com",
    role: "doctor",
  },
  guardian: {
    _id: "67b01cae96d45b9e9566d3c5",
    name: "vikass",
    email: "vikass@gmail.com",
    role: "guardian",
    guardian: null,
  },
};

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  
  // Check for demo token FIRST (from frontend with demo-token-role format)
  if (token && token.startsWith("demo-token-")) {
    const role = token.replace("demo-token-", "");
    const demoUser = DEMO_USERS[role] || DEMO_USERS.player;
    
    req.user = {
      id: demoUser._id,
      role: demoUser.role,
      name: demoUser.name,
      email: demoUser.email,
    };
    return next();
  }
  
  // Demo mode: bypass auth entirely for easier exploration (if no demo token found)
  if (process.env.DEMO_MODE === "true") {
    // Get role from header or default to player
    const role = req.header("x-demo-role") || req.header("x-user-role") || "player";
    const demoUser = DEMO_USERS[role] || DEMO_USERS.player;
    
    req.user = {
      id: demoUser._id,
      role: demoUser.role,
      name: demoUser.name,
      email: demoUser.email,
    };
    return next();
  }

  // Regular JWT verification
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
