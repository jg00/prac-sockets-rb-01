const socket = io("http://localhost:9000"); // / namespace/endpoint
const socket2 = io("http://localhost:9000/admin"); // /admin namespace

socket.on("messageFromServer", (dataFromServer, ack) => {
  console.log(dataFromServer);
  // ack();
  socket.emit("dataToServer", { data: "This is from the client" });
});

socket.on("joined", msg => {
  console.log(msg);
});

socket2.on("welcome", dataFromServer => {
  console.log(dataFromServer);
});

document.querySelector("#message-form").addEventListener("submit", event => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});