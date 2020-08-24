var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var arDrone = require('ar-drone');
//var dronevideo = require('./dronevideo1.js')
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

require("dronestream").listen(http, { ip: "192.168.43.183"});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/ui.html');

});

io.on('connection', function(socket){
var lat = 18.9750;
   var lng = 72.8258;
   io.emit('gps',lat,lng);

  console.log('controller running ...');
 //var //client  = arDrone.createClient({ip: '192.168.43.183'});

 var client  = arDrone.createClient({ip: '192.168.43.233'});

client.config('general:navdata_demo', 'FALSE'); 
client.config('general:navdata_options', 777060865);
client.on('navdata', function(data) {
	//console.log(data);
/*try{
console.log(data.gps.latitude+','data.gps.longitude);
var lat = data.gps.latitude;
var lng = data.gps.longitude;
io.emit('gps',lat,lng);
}
catch(err){
console.log(err.message);
}
*/
	io.emit('navdata',data);

	
   //var lat = navdata.gps.latitude ;
   //var lng = navdata.gps.longitude;
//io.emit('gps',lat,lng);
});


  socket.on('disconnect', function(){
    console.log('user disconnected');
    client.stop();
    //client.stop();
    client.land();
   //client.land();
  });

socket.on('takeoff',function(){
	console.log('takingoff..');
client.takeoff();
//client.takeoff();

});

socket.on('up',function(){
	console.log('up..');
	client.up(0.5);
//client.up(0.5);

});
socket.on('down',function(){
	console.log('down..');
client.down(0.5);
//client.down(0.5);

});

socket.on('clockwise',function(){
	console.log('clockwise rotatn..');
client.clockwise(0.5);
//client.clockwise(0.5);

});

socket.on('anticlockwise',function(){
	console.log('anticlockwise.')
 client.counterClockwise(0.5);
//client.counterClockwise(0.5);

});

socket.on('flipbehind',function(){
	console.log('flipbehind..')
client.animate('flipBehind',500);

//client.animate('flipBehind',500);


});

socket.on('flipahead',function(){
	console.log('flipahead..')
client.animate('flipAhead',500);
//client.animate('flipAhead',500);


});


socket.on('stop',function(){
client.stop();
//client.stop();
console.log('hovering....');
});




socket.on('front',function(){
client.front(0.5);
//client.front(0.5);
console.log('front....');
});


socket.on('back',function(){
client.back(0.5);
//client.back(0.5);
console.log('back....');
});

socket.on('left',function(){
client.left(0.5);
//client.left(0.5);
console.log('left....');
});

socket.on('right',function(){
client.right(0.5);
//client.right(0.5);
console.log('right....');
});

socket.on('land',function(){
console.log('landing');
client.stop();
    //client.stop();
client.land();
//client.land();

});
socket.on('landwts',function(){
console.log('landing with wts');
client.stop();
    //client.stop();
    client.left(0.5);
    //client.right(0.5);
client.land();
//client.land();

});

});




http.listen(8000, function(){
  console.log('listening on 8000');
});