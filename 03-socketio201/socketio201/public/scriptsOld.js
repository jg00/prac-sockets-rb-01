/* Remember the 'client' makes requests to join the namespace */
const socket = io("http://localhost:9000"); // 'http://localhost:9000' is the '/' namespace/endpoint
const socket2 = io("http://localhost:9000/admin"); // /admin namespace.  Remember this is not really an endpoint.  Namespace is a feature internal for Socket.io for internal management.
// const socket3 = io("http://localhost:9000/marketing"); // marketing namespace.

console.log(socket.io); // We have our socket object
console.log(socket.id); // undefined 1 b/c JS is async and continues execution of this line, 2 the connection is not completed yet at this point.  So to get this you can place inside socket.on('connect')

// Need to place properties of socket like .id inside of 'connect'
socket.on("connect", () => {
  console.log(socket.id); // Now we get A76NXfqnAyfRRAkTAAAC id
});

// There is no cross socket communication.
socket2.on("connect", () => {
  console.log(socket2.id); // Now we get /admin#A76NXfqnAyfRRAkTAAAC
});

// Will never fire because the server is not emitting any 'welcome' events to the '/' namespace 'unless' we do so.
socket.on("welcome", msg => {
  console.log(msg);
});

// Only this will fire from server issuing 'welcome' events from the '/admin namespace.
socket2.on("welcome", msg => {
  console.log(msg);
});

socket.on("messageFromServer", (dataFromServer, ack) => {
  console.log(dataFromServer);
  ack();
  socket.emit("dataToServer", { data: "This is from the client" });
});

document.querySelector("#message-form").addEventListener("submit", event => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClients", msg => {
  console.log(msg);
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});

/* Reference only
  socket.on("ping", () => {
    console.log("Ping was received from the server");
  });

  socket.on("pong", latency => {
    console.log(latency);
    console.log("Pong was sent to the server");
  });
*/
