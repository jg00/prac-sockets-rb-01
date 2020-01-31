function joinNs(endpoint) {
  // Connect to default namespace and once we make a connection load the rooms for the namespace
  const nsSocket = io(`http://localhost:9000${endpoint}`);
  nsSocket.on("nsRoomLoad", nsRooms => {
    console.log("nsRooms List", nsRooms);

    // Take the room list and update the DOM
    let roomList = document.querySelector(".room-list");
    roomList.innerHTML = "";
    nsRooms.forEach(room => {
      let glyph = room.privateRoom ? "lock" : "globe";
      roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`;
    });

    // Add a click listener to each room
    Array.from(document.getElementsByClassName("room")).forEach(elem => {
      elem.addEventListener("click", e => {
        console.log("Someone clicked on", e.target.innerText);
        // console.dir(e.target.innerText);
      });
    });
  });

  nsSocket.on("messageToClients", msg => {
    console.log(msg);
    document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
  });

  document.querySelector(".message-form").addEventListener("submit", event => {
    event.preventDefault();
    const newMessage = document.querySelector("#user-message").value;
    socket.emit("newMessageToServer", { text: newMessage });
  });
}
