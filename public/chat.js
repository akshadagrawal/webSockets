//Make connection

var socket = io.connect("http://localhost:3000");

//Query dom
var message= document.getElementById('message');
var handle= document.getElementById('handle');
var output = document.getElementById('output');
var btn= document.getElementById('send');
var feedback = document.getElementById('feedback');

//EMit events
 btn.addEventListener('click', function(){  //this grabs message from frontend
     socket.emit('chat',{                      //this sends it to the server on server side io.on cathches it and again emits to all the sockets present
         message: message.value,
         handle: handle.value
     });
 });

 message.addEventListener('keypress', function(){
     socket.emit('typing',handle.value);
 })

socket.on('chat',function(data){            //this oi.e the screen of each user again catches the same data and output on screen
    feedback.innerHTML= "";
    output.innerHTML+= '<p><strong>'+ data.handle +':</strong>' + data.message + '</p>';
    message.value='';
})

socket.on('typing',function(data){
    feedback.innerHTML= "<p><em>" + data + " is typing...</em></p>";
})