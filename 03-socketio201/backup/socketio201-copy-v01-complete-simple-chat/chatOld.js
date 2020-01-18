const express = require("express");
const app = express();
const socketio = require("socket.io"); // returns Socket constructor function; This is our Socket Server
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(9000, () => console.log("Server started!"));

// Invoke our Socket server.
const io = new socketio(expressServer); // io is our server (server.sockets for example our io.sockets)

// Reference for another way to setting up our Socket (ie io) server
// const io = socketid(); // Gives us a server but we need to attach and hand it our http server
// io.attach(expressServer)

// Reference for setting defaults.  Also new keyword can be used.
// const io = socketio(expressServer, {
//   path: "/socket.io",
//   serveClient: true,
//   wsEngine: "ws"
// });

// Fired upon connection from a client specifically a connection to a namespace.
// io is our socket server but the client still needs to connect to a namespace (represents a pool of sockets).
// io.on = io.of('/').on()  <- These are exactly the same.
io.on("connection", socket => {
  socket.emit(
    "messageFromServer",
    { data: "Welcome to the socketio server" }, // data sent to client.
    () => console.log("Acknowledged the client got the message!") // cb called by client to acknowledge data received.
  );

  socket.on("dataToServer", dataFromClient => {
    console.log(dataFromClient);
  });

  socket.on("newMessageToServer", msg => {
    // console.log(msg);
    // io.emit("messageToClients", { text: msg.text }); // This is going to the main namespace '/' by default.
    io.of("/").emit("messageToClients", { text: msg.text }); // This is going to the main namespace '/' by default.
  });

  /*
    The server can still communicate across namespaces
    but on the client, the socket needs to be in THAT namespace
    in order to get the events.

    It is important to note that the client may first connect to the main '/' namespace before
    they connect to the next namespace '/admin'.
    So below is being sent out before the client is actually connected to the '/admin' namespace.
    Just remember connections have to be established first.
  */
  setTimeout(() => {
    io.of("/admin").emit(
      "welcome",
      "Welcome to the admin channel from the main channel!"
    );
  }, 2000);
});

// "socket" parameter below is just what we are calling the thing that just connected.
io.of("/admin").on("connection", socket => {
  console.log("Someone connected to the admin namespace");
  io.of("/admin").emit("welcome", "Welcome to the admin channel!");
});
