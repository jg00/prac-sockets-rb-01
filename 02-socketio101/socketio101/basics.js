const http = require("http");

// 3rd party module
const socketio = require("socket.io");

const server = http.createServer((req, res, next) => {
  res.end("I am connected");
});

// Socketio is piggybacking on our http server.  In other words our Socketsio is listening to our server.
const io = socketio(server);

io.on("connection", (socket, req) => {
  console.log(
    "Client connect (ie socket.on('connect') triggered me on the server!"
    // socket
  );

  // ws.send (websocket module version) becomes socket.emit
  // Here the server will 'send' a welcome
  socket.emit("welcome", "Welcome to the websocket server!!"); // socket.emit(specify event, data to send back)

  // With ws we require "message" event.  In socketio we can make up our event names.
  // msg below represents what ever is coming through
  // Here the server will 'listen' for a message.
  socket.on("message", msg => {
    console.log(msg);
  });
});

server.listen(8000);
