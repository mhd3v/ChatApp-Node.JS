const path = require('path');
const http = require('http'); //built in node module, used by express to setup the server automatically
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, "../public");   //better way to do than the one below
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public');
console.log(publicPath);

var app = express();
var server = http.createServer(app);    //we're passing the app to the server so that we can have more control over the server. http.createServer is called when we use express's app.listen() 

var io = socketIO(server);  //we get web sockets server in io

app.use(express.static(publicPath));

//io.on is a special function. We will use socket.xx() for most of our functionality
//io.on('connect') DOESN'T exist
//socket.on('connect') is a valid event

io.on('connection', (socket) => { //register an event listener. Callback gets called with the socket
    console.log('New user connected!');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));   //what the joined user sees
    
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));  //what other user sees (except the joined user)

    socket.on('createMessage', (msg, callback) => {   //listening for create new message event from client. Callback is the callback function to be called on the client

        console.log('Creating message', msg)

        io.emit('newMessage',generateMessage(msg.from, msg.text));   //io.emit() emits an event to all the connections, socket.emit() emits an event to a single connection

        callback('Server got your message');
        
        //============== Broadcasting events (send events to certain sockets) ===================   

        // socket.broadcast.emit('newMessage', {   //send event to all sockets except the socket that has called broadcast.emit
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });  
        
        //=======================================================================================
    });

    // socket.on('createEmail', (newEmail) => {    //listener for custom event from the client
    //     console.log('createEmail', newEmail);
    // });

    socket.on('disconnect', (socket) => { //register an event listener. Callback gets called with the socket
        console.log('User was disconnected!');
    });

});

server.listen(port, () => {         
    console.log(`Server is up on port ${port}`);
});