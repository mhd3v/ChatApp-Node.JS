const path = require('path');
const http = require('http'); //built in node module, used by express to setup the server automatically
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");   //better way to do than the one below
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
var server = http.createServer(app);    //we're passing the app to the server so that we can have more control over the server. http.createServer is called when we use express's app.listen() 

var io = socketIO(server);  //we get web sockets server in io

app.use(express.static(publicPath));

io.on('connection', (socket) => { //register an event listener. Callback gets called with the socket
    console.log('New user connected!');

    socket.on('disconnect', (socket) => { //register an event listener. Callback gets called with the socket
        console.log('User was disconnected!');
    });

});

server.listen(port, () => {         
    console.log(`Server is up on port ${port}`);
});