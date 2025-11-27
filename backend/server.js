require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const MongoStore = require("connect-mongo");
const Message = require("./models/Message");

// Passport Google Auth
require("./auth/googleAuth");
const auth = require("./middleware/auth");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ----------------------
// MIDDLEWARE
// ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ----------------------
// EXPRESS SESSION (Production Safe)
// ----------------------
app.use(
  session({
    secret: process.env.SESSION_SECRET || "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Passport Initialize
app.use(passport.initialize());
app.use(passport.session());

// ----------------------
// MONGODB CONNECTION (No Deprecated Options)
// ----------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ----------------------
// ROUTES
// ----------------------
app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/googleAuthRoutes"));
app.use("/api/games", require("./routes/games"));
app.use("/api/doctor", require("./routes/doctor"));
app.use("/api/patient", require("./routes/patient"));
app.use("/api/guardian", require("./routes/guardian"));
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/family", require("./routes/family"));
app.use("/api/detail", require("./routes/detail"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api/ediary", require("./routes/ediary"));
app.use("/api/leaderboard", require("./routes/leaderboard"));

// Chat routes (demo mode option)
if (process.env.DEMO_MODE === "true") {
  app.use("/api/chat", require("./routes/chat"));
} else {
  app.use("/api/chat", auth, require("./routes/chat"));
}

// ----------------------
// SOCKET.IO CHAT LOGIC
// ----------------------
const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("🟢 New user connected:", socket.id);

  socket.on("register", (username) => {
    onlineUsers[username] = socket.id;
    socket.username = username;
    io.emit("userList", Object.keys(onlineUsers));
    console.log(`User registered: ${username}`);
  });

  socket.on("sendMessage", async (msgData) => {
    try {
      const newMessage = new Message({
        ...msgData,
        sender: socket.username,
        timestamp: new Date(),
      });
      await newMessage.save();
      io.emit("receiveMessage", newMessage);
    } catch (err) {
      console.error("Message error:", err);
      socket.emit("messageError", { error: "Failed to send message" });
    }
  });

  socket.on("newTaskAssigned", ({ patientId, message }) => {
    io.emit(`taskNotification-${patientId}`, message);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      delete onlineUsers[socket.username];
      io.emit("userList", Object.keys(onlineUsers));
      console.log(`User disconnected: ${socket.username}`);
    }
    console.log("🔴 User disconnected:", socket.id);
  });
});

// ----------------------
// DEFAULT ROUTE
// ----------------------
app.get("/", (req, res) => {
  res.send("✅ Server is running...");
});

// ----------------------
// SERVER START
// ----------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
