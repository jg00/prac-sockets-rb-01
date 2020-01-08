const express = require("express");
const app = express();
const socketio = require("socket.io"); // returns Socket constructor function
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(9000, () => console.log("Server started!"));

const io = new socketio(expressServer); // io is our server (server.sockets for example our io.sockets)

// Reference for setting defaults.  Also new keyword can be used.
// const io = socketio(expressServer, {
//   path: "/socket.io",
//   serveClient: true,
//   wsEngine: "ws"
// });

// Fired upon connection from a client specifically a connection to a namespace.
// io is our socket server but the client still needs to connect to a namespace (represents a pool of sockets).
io.on("connection", socket => {
  socket.emit(
    "messageFromServer",
    { data: "Welcome to the socketio server" }, // data sent to client.
    () => console.log("Acknowledged the client got the message!") // cb called by client to acknowledge data received.
  );
  socket.on("dataToServer", dataFromClient => {
    console.log(dataFromClient);
  });
});
