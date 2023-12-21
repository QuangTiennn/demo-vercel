import express from "express";
import http from "http";
import jwt from "jsonwebtoken";
import { Server } from "socket.io";
import { connectDatabase } from "./api/configs/db.config.js";
import roomModel from "./api/models/room.model.js";
import userModel from "./api/models/user.model.js";
import { createChatRoom, createMessage } from "./api/services/chat.service.js";
import {
  createTask,
  deleteTaskHasSocket,
  updateTaskHasSocket,
} from "./api/services/task.service.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let user;
let room;
let userJoinedRoom;
// Handle connection events
io.on("connection", async (socket) => {
  console.log("user connected", socket.id);

  const token = socket.handshake.headers.token;
  if (!token || !token.startsWith("Bearer ")) {
    socket.emit("Authentication Fail");
    return;
  }
  if (token) {
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
    const dataMessage = {
      room: data_message.roomId,
      message_content: data_message.content,
      recipientId: data_message.recipientId,
      sender: user._id,
    };

    const message = await createMessage(dataMessage);

    socket.emit(`receive_message/${room?._id}`, message);
  });

  socket.on("delete_task", async (data) => {
    const objData = JSON.parse(data);

    const deletedTask = await deleteTaskHasSocket(objData.id);
    socket.broadcast.emit("deleted_task", deletedTask);
  });

  socket.on("update_task", async (data) => {
    const objData = JSON.parse(data);

    const updatedTask = await updateTaskHasSocket(objData);
    socket.broadcast.emit("updated_task", updatedTask);
  });
  socket.on("create_task", async (data) => {
    const objData = JSON.parse(data);

    const createdTask = await createTask(user._id, objData);
    socket.broadcast.emit("created_task", createdTask);
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
