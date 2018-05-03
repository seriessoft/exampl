var express = require('express');
var app = express();
var PORT = process.env.PORT || 5000;
const SocketServer = require('ws').Server;
const path = require('path');
var Firebase = require('firebase');
//import * as firebase from "firebase";
/*app.get('/',function(request, response){
  response.send("Hello!");
});

app.listen(PORT);*/

var config = {
    apiKey: "AIzaSyCj1gTHtLAbAYXAxbxyzMHWRCbKihvzdH8",
    authDomain: "saudideal-922d4.firebaseapp.com",
    databaseURL: "https://saudideal-922d4.firebaseio.com",
    projectId: "saudideal-922d4",
    storageBucket: "saudideal-922d4.appspot.com",
    messagingSenderId: "820015895373"
};

Firebase.initializeApp(config);

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
