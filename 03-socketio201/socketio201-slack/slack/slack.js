const path = require("path");
const express = require("express");
const app = express();
const socketio = require("socket.io");

const namespaces = require("./data/namespaces");
console.log(namespaces);

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(9000, () => console.log("Server started!"));

const io = new socketio(expressServer); // Invoke our Socket server object.

// io.on() equivalent to io.of('/').on()
io.on("connection", socket => {
  socket.emit("messageFromServer", { data: "Welcome to the socketio server" });

  socket.on("dataToServer", dataFromClient => {
    console.log(dataFromClient);
  });

  socket.join("level1");

  socket
    .to("level1")
    .emit("joined", `${socket.id} says have joined the level 1 room!`);

  // io.of("/")
  //   .to("level1")
  //   .emit("joined", `${socket.id} says have joined the level 1 room!`);
});

io.of("/admin").on("connection", socket => {
  console.log("Someone connected to the admin namespace");
  io.of("/admin").emit("welcome", "Welcome to the admin channel!");
});
