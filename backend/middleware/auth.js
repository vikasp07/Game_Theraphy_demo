const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  // Demo mode: bypass auth entirely for easier exploration
  if (process.env.DEMO_MODE === "true") {
    // Provide a minimal user context to downstream handlers
    req.user = req.user || { id: "demo-user", role: req.header("x-demo-role") || "player" };
    return next();
  }
  const token = req.header("x-auth-token");
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
