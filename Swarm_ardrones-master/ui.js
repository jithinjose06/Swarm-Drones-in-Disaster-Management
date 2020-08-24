var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var arDrone = require('ar-drone');

require("dronestream").listen(http, { ip: "192.168.43.183"});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');

});

io.on('connection', function(socket){
var lat = 18.9750;
   var lng = 72.8258;
   io.emit('gps',lat,lng);

  console.log('controller running ...');

client.config('general:navdata_demo', 'FALSE'); 
client.config('general:navdata_options', 777060865);
client.on('navdata', function(data) {
	
	io.emit('navdata',data);

	
  });


 

http.listen(8000, function(){
  console.log('listening on 8000');
});