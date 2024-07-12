require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
// const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const socketHandler = require("./socket/socketHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3500;

const server = http.createServer(app);

console.log(process.env.NODE_ENV);

// Connect to MongoDB
connectDB();

// app.use(logger);

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hey this is my API running!");
});

// Routes
app.use("/auth", require("./routes/authRoute"));
app.use("/users", require("./routes/usersRoute"));
app.use("/articles", require("./routes/articleRoute"));
app.use("/messages", require("./routes/messageRoute"));
app.use("/forums", require("./routes/ForumRoute"));

// Initialize Socket.io
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Handle Socket Connections
socketHandler(io);

// Error handling middleware
app.use(errorHandler);

// Not found middleware
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Start server
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
  // logEvents(
  //   `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
  //   "mongoErrLog.log"
  // );
});
