import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createMessage } from "../api/services/chat.service.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("sendMessage", async (messageData, recipientId) => {
    const objMessage = JSON.parse(messageData);

    // Create and save the message to the database
    const data = {
      roomId: objMessage.roomId || null,
      senderId: socket.id,
      recipientId,
      content: objMessage.content,
    };
    await createMessage(data);

    // Broadcast the message to the recipient
    io.to(recipientId).emit("receiveMessage", messageData, socket.id);
  });
});

server.listen(5000, () => {
  console.log("Listening to port 5000");
});
let count = 0;
setInterval(() => {
  io.emit("msg_to_client", "client", `test msg${count}`);
  count++;
}, 1000);
