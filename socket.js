import express from "express";
import http from "http";
import { Server } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("msg_from_client", (from, msg) => {
    console.log(msg);
    console.log(from);
    console.log(`Message is ${from}`, msg);
  });
  socket.on("disconnect", (msg) => {
    console.log("Disconnected");
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
