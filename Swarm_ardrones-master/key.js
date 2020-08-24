var keypress = require('keypress');
var arDrone = require('ar-drone');
//var client1  = arDrone.createClient({ip: '192.168.137.29'});
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var arDrone = require('ar-drone');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/ui.html');

});

io.on('connection', function(socket){
  
var lat = 19.2167 ;
   var lng = 73.0833;
   io.emit('gps',lat,lng);
  console.log('controller running ...');
});


 

http.listen(8000, function(){
  console.log('listening on 8000');
});











var client = arDrone.createClient({ ip: "192.168.137.29"});

//require("dronestream").listen(http, { ip: "192.168.43.183"});
client.config('general:navdata_demo', 'FALSE'); 
client.config('general:navdata_options', 777060865);
client.on('navdata', function(data) {
  
  io.emit('navdata',data);
  });

keypress(process.stdin);
console.log("------------------------KEYBOARD CONTROLLER -----------------------------");
console.log("--------------------BY CROSS---------------------------------------------");
console.log("o-up \np-down\nk-hover\n\n\n ");
/*client.config('general:navdata_options', 777060865);
client.on('navdata', function(navdata) {
  console.log(navdata.gps.latitude + ', ' + navdata.gps.longitude + ', ' + navdata.gps.elevation);
});
*/

process.stdin.on('keypress', function (ch, key) {

  if (key && key.name == 'space') {
    console.log('Takeoff');
    client.takeoff();
    //client1.takeoff();
  }
 if (key && key.name == 'y') {
    console.log('calibrate');
    client.calibrate(0);
    //client1.takeoff();
  }




  if (key && key.name == 'l') {
    console.log('Land!');
    client.stop();
    //client1.stop();
    //client1.land(); 
    client.land();
  }

if (key && key.name == 'w') {
    console.log('front');
    
    client.front(0.5);
    //client1.front(0.5);
  }
if (key && key.name == 'a') {
    console.log('Left');
   // client1.left(0.5);
    client.left(0.5);
  }
if (key && key.name == 'd') {
    console.log('right');
    client.right(0.5);
    //client1.right(0.5);
  }
if (key && key.name == 's') {
    console.log('back');
    // client1.back(0.5);
    client.back(0.5);
  }
if (key && key.name == 'l') {
    console.log('Land!');
    client.stop(); 
    //client1.stop();
   // client1.land();
    client.land();
  }
if (key && key.name == 'o') {
    console.log('up');
    // client1.up(0.5);
    client.up(0.5);
  }

if (key && key.name == 'p') {
    console.log('down');
     //client1.down(0.5);
    client.down(0.5);
  }
if (key && key.name == 'k') {
    console.log('hover');
     //client1.stop();
    client.stop();
  }
if (key && key.name == 'n') {
    console.log('clockwise');
     //client1.clockwise(1.0);
    client.clockwise(1.0);
  }
if (key && key.name == 'm') {
    console.log('anti-c');
     //client1.counterClockwise(1.0);
    client.counterClockwise(1.0);
  }
if (key && key.ctrl && key.name == 'e') {
    console.log('emergency');
    client.disableEmergency();


    //client1.stop();

  }
if (key && key.ctrl && key.name == 'f') {
    console.log('flip ahead');
    client.animate('flipAhead',500);

    }
if (key && key.ctrl && key.name == 'r') {
    console.log('flip right');
    client.animate('flipRight',500);

    }

  if (key && key.ctrl && key.name == 'c') {
    console.log('Quitting');
    process.stdin.pause();

    //client1.stop();
    client.stop();
     // client1.land();
  
    client.land();

    
    client._udpControl.close();
  }

});

process.stdin.setRawMode(true);
process.stdin.resume();
