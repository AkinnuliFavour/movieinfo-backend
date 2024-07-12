const MessageController = require("../controllers/MessageController");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinForum", (forumId) => {
      socket.join(forumId);
    });

    socket.on("leaveForum", (forumId) => {
      socket.leave(forumId);
    });

    socket.on("newMessage", async (data) => {
      try {
        const message = await MessageController.createMessage(data);
        io.to(data.forumId).emit("message", message);
      } catch (error) {
        socket.emit("error", "Error creating message");
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
