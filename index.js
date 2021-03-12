var express = require('express');
var socket = require('socket.io');

//App setup
var app= express();
var server = app.listen(3000,function(){
    console.log("listening to port 3000");
});

//static files
app.use(express.static('public'));

//socket setup
var io= socket(server);

io.on('connection',function(socket){
    //console.log('made socket connection',socket.id);
    socket.on('chat',function(data){            // catching data from all sockets
        io.sockets.emit('chat',data);           //  sendingdata to all sockets
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })
})