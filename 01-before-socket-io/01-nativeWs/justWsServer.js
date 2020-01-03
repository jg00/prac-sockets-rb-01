const http = require("http");

// 3rd party module
const websocket = require("ws");

const server = http.createServer((req, res, next) => {
  res.end("I am connected");
});

const wss = new websocket.Server({ server }); // Hand the websocker server object the server we want to listen to
// console.log(wss); // WebSocketServer {..}

wss.on("headers", (headers, req) => {
  console.log(headers);
});

// ws - WebSocket object we get from the client.  That same websocket object can be used to send back data to the specific client and on that client the same websocket object can listen for ws.onmessage.
wss.on("connection", (ws, req) => {
  ws.on("message", msg => {
    console.log(msg);
  });

  ws.send("Welcome to the websocket server!!"); // Send data through the connection.
});

server.listen(8000);

/*
  1 Create Node server that handles http traffic
  2 Create WebSocker server object and hand it the Node server
  
  If http traffic shows up on port 8000 we have a req and res and respond with "I am connected".

  At the same time, our websocket is listening to that server for traffic through port 8000.
  Out websocket server is on that http server that is listening on port 8000.

  3a
  [ 'HTTP/1.1 101 Switching Protocols', <- 101 status is Switching Protocol
  'Upgrade: websocket', <- We are saying we came in as HTTP/1.1 and we want to 'upgrade' to a WebSocket protocol
  'Connection: Upgrade',
  'Sec-WebSocket-Accept: mvWCDb5KcMK8QFhhjThdTL0E8zU=' ]

  3b Our WebSocket Server is looking for WebSocket traffic that came in via HTTP but as soon as it see's one it
  'upgrades' it to a websocket.

  4a 'headers' event emitted before the response headers are written tot he socket as part of the handshake.  This allows you to inspect/modify the headers before they are sent.

  4b 'connection' event emitted after the handshake is complete.


*/
