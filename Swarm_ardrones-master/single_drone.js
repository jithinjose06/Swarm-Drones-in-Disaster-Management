var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var arDrone = require('ar-drone');
//var client  = arDrone.createClient();
/*
var drones = [
arDrone.createClient({ip : ''}),
arDrone.createClient({ip : ''})
];
drones.forEach(function(drone){
drone.takeoff();


});
*/

require("dronestream").listen(http, { ip: "192.168.43.233"});
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('controller running ...');
  //var client  = arDrone.createClient({ip: '192.168.43.183'});
var client1  = arDrone.createClient({ip: '192.168.43.233'});


  socket.on('disconnect', function(){
    console.log('user disconnected');
    //client.land();
    client1.land();
  });

socket.on('takeoff',function(){
  console.log('takingoff..')
  //client.takeoff();
client1.takeoff();

});

socket.on('up',function(){
  console.log('up..')
  //client.up(0.5);
client1.up(0.5);

});
socket.on('down',function(){
  console.log('down..')
  //client.down(0.5);
client1.down(0.5);

});

socket.on('clockwise',function(){
  console.log('clockwise rotatn..')
  //client.down(0.5);
client1.clockwise(0.5);

});

socket.on('anticlockwise',function(){
  console.log('anticlockwise.')
  //client.anticlockwise(0.5);
client1.counterClockwise(0.5);

});

socket.on('flipbehind',function(){
  console.log('flipbehind..')
  //client.animate('flipBehind',500);

client1.animate('flipBehind',500);


});

socket.on('flipahead',function(){
  console.log('flipahead..')
  //client.animate('flipAhead',500);
client1.animate('flipAhead',500);


});


socket.on('stop',function(){
//client.stop();
client1.stop();
console.log('hovering....');
});




socket.on('front',function(){
//client.front(0.5);
client1.front(0.5);
console.log('front....');
});


socket.on('back',function(){
//client.back(0.5);
client1.back(0.5);
console.log('back....');
});

socket.on('left',function(){
//client.left(0.5);
client1.left(0.5);
console.log('left....');
});
socket.on('right',function(){
//client.right(0.5);
client1.right(0.5);
console.log('right....');
});

socket.on('land',function(){
console.log('landing');
//client.land();
client1.land();

});

});




http.listen(8000, function(){
  console.log('listening on 8000');
});