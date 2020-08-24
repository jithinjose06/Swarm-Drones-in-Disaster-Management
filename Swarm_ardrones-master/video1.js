var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var arDrone = require('ar-drone');
//var client  = arDrone.createClient();
/*

drones.forEach(function(drone){
drone.takeoff();


});
*/

app.get('/', function(req, res){
  res.sendFile(__dirname + '/video1.html');

});

/*var dronevideo = require("dronestream").listen(http, { ip: "192.168.43.233" });
*/

http.listen(8888, function(){
  console.log('listening on 8888');
});

