const path = require("path");
const express = require("express");
const app = express();
const socketio = require("socket.io");

const namespaces = require("./data/namespaces");
// console.log(namespaces[0]);

app.use(express.static(path.join(__dirname, "public")));

const expressServer = app.listen(9000, () => console.log("Server started!"));

const io = new socketio(expressServer); // Invoke our Socket server object.

// io.on() equivalent to io.of('/').on(); "Main" namespace.
io.on("connection", socket => {
  // console.log("Main namespace", socket);

  // build an array to send back with the img and endpoint for each namespace
  let nsData = namespaces.map(ns => {
    return {
      img: ns.img,
      endpoint: ns.endpoint
    };
  });

  // console.log("Namespace list", nsData);

  // send the nsData back to the client.  We need to use socket, NOT io, because we want it to go to just this client.
  socket.emit("nsList", nsData);
});

// Loop through each "individual" namespaces and listen for a connection to the endpoint
namespaces.forEach(namespace => {
  console.log("Individual namespace", namespace);
  io.of(namespace.endpoint).on("connection", socket => {
    console.log(`${socket.id} has joined ${namespace.endpoint}`);
  });
});
