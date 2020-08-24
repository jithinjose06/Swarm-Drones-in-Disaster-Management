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
  res.sendFile(__dirname + '/video2.html');

});

var dronevideo = require("dronestream").listen(http, { ip: "192.168.43.95" });


http.listen(7777, function(){
  console.log('listening on 7777');
});

