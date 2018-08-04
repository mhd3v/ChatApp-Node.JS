var socket = io();   //intitiate request to socket.io server, to open up a socket and keep that socket open

socket.on('connect', function() {
    console.log('Connected to server');

    // socket.emit('createMessage', {  //send create new message event to server. can do with from the chrome developer tools 
    //     from: "mhd",
    //     text: "hey!"
    // })

});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(newMessage){       //listening for new message event from server
    console.log('New message arrived', newMessage);
})