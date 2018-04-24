var express = require('express');
var server = express();
var port = process.env.PORT || 3000;
const SocketServer = require('ws').Server;
const path = require('path');

server.get('/',function(request, response){
  response.send("Hello!");
});

server.listen(PORT);

const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);
