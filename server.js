// const io = require('socket.io')();

// io.on('connection', (client) => {
// //emit events to client 
// client.on('subscribeToTimer', (interval) => {
//     console.log('client is subscribing to timer with interval ', interval);
//     setInterval(() => {
//       client.emit('timer', new Date());
//     }, interval);
//   });
// });

// const port = 8000; 
// io.listen(port);
// console.log("listening on port", port);

var express = require('express');
var app = express();

server = app.listen(8080, function(){
    console.log('server is running on port 8080')
});

var socket = require('socket.io');
var io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});