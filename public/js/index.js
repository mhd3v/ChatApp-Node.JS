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

    var li = jQuery('<li></li>');   //define a new li
    li.text(`${newMessage.from}: ${newMessage.text}`);

    jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function(e) {
    e.preventDefault(); //stop page from refreshing

    socket.emit('createMessage', {
        from: 'mhd',
        text: jQuery('[name=message]').val()
    }, function (data) {            //3rd argument is for handling acknowledgement from the server, (callback function)
        console.log('Response from server: ', data);
    });
});