import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { connectDatabase } from "./api/configs/db.config.js";
import roomModel from "./api/models/room.model.js";
import userModel from "./api/models/user.model";
import { createChatRoom, createMessage } from "./api/services/chat.service.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let user;
let room;
let userJoinedRoom;
// Handle connection events
io.on("connection", async (socket) => {
  const token = socket.handshake.headers.token;

  if (token) {
    if (!token || !token.startsWith("Bearer ")) {
      socket.emit("error");
      return;
    }

    // Extract the token value
    const tokenValue = token.replace("Bearer ", "");

    const decodedToken = jwt.verify(tokenValue, "laskjdefaksdherusdlak");

    user = await userModel.findById(decodedToken._id);
  }

  socket.on("join_room", async (data) => {
    const foundRoom = await roomModel.findOne({
      participants: { $elemMatch: { $in: [data.userId, user._id] } },
    });
    room = foundRoom;

    if (!foundRoom) {
      const newRoom = await createChatRoom(
        {
          participants: [data.userId, user._id],
        },
        user._id
      );
      socket.emit("data-room", newRoom);
      room = newRoom;
      return;
    }
    socket.emit("data-room", foundRoom);
  });

  socket.on("send_message", async (data_message) => {
    const dataRoom = {
      room: data_message.roomId,
      message_content: data_message.content,
      recipient: data_message.recipientId,
      sender: user._id,
    };

    const message = await createMessage(dataRoom);

    socket.emit(`receive_message/${room?._id}`, message);
  });
});

server.listen(5000, async () => {
  await connectDatabase();

  console.log("Listening to port 5000");
});
let count = 0;
setInterval(() => {
  io.emit("msg_to_client", "client", `test msg${count}`);
  count++;
}, 1000);
