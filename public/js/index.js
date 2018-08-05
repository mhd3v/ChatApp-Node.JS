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

    //=============== Adding new elements on the document via mustache =================

    var formattedTime = moment(newMessage.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {      //second argument is used to send data
        text: newMessage.text,
        from: newMessage.from,
        createdAt: formattedTime
    });

    $("#messages").append(html);    //we're rendering lis and sending it to the ol -> messages.

    //=============== Not a good way to add new elements on the document using only jQuery =================

    // console.log('New message arrived', newMessage);
    // var formattedTime = moment(newMessage.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');   //define a new li    //can use $ instead
    // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);
    // jQuery('#messages').append(li);        

});

socket.on('newLocationMessage', function(message){
    
    //=============== Adding new elements on the document via mustache =================

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = $("#location-message-template").html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $("#messages").append(html); 

    //=============== Not a good way to add new elements on the document using only jQuery =================
    // var formattedTime = moment(message.createdAt).format('h:mm a');

    // var li = $('<li></li>');   //define a new li    //can use $ instead
    // var a = $('<a target="_blank">My current location</a>');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);    //if attr is provided two arguments, the first argument's will be set. If one argument is provided, the value for it is returned

    // //a.attr('href') -> will return a's href value
    // //a.attr('href', 'www.com'); will set a's href value

    // li.append(a);
    // $('#messages').append(li);    
    
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault(); //stop page from refreshing

    var messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'mhd',
        text: messageTextBox.val()
    }, function (data) {            //3rd argument is for handling acknowledgement from the server, (callback function)
        console.log('Response from server: ', data);
        messageTextBox.val(''); //clear message field
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){

    //using geolocation api, available in most modern browsers

    if(!navigator.geolocation){ //check if user has access to geolocation api
        return alert('Geolocation not supported by your browser');
    }  

    locationButton.attr('disabled', 'disabled').text('Sending location...'); //disable button once the reqest is sent to the api and change text

    navigator.geolocation.getCurrentPosition(function (position){       //first argument -> success case function, second argument -> failure case function
        
        // console.log(position);

        locationButton.removeAttr('disabled').text('Send location'); //re enable button

        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });

        

    }, function() {
        locationButton.removeAttr('disabled').text('Send location'); 
        alert('Unable to fetch location');
    });

}); 