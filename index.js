/*
* truongnt
* index file for server
*/

var express = require('express');
var app = new express();
var server = require('http').createServer(app).listen(8080);
var io = require('socket.io').listen(server);

app.get('/',function(req,res){
	res.sendFile(__dirname +'/public/index.html');
});
// Listen for Socket.IO connection
io.sockets.on('connection',function(socket){
	console.log('a user connected');
	socket.on('disconnect',function(){
		console.log('user disconnected');
	});
	
	socket.on('chat message',function(msg){
		console.log('messge: '+JSON.stringify(msg));
		// Send message to everyone
		io.emit('chat message',msg);
	});
});

