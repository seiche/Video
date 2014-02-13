var fs = require('fs');

WEBSOCKET_PORT = 8800;
STREAM_PORT = 8802;

// Websocket Server
var socketServer = new (require('ws').Server)({port: WEBSOCKET_PORT});
socketServer.on('connection', function(socket) {
	// Send magic bytes and video size to the newly connected socket
	// struct { char magic[4]; unsigned short width, height;}
	/*
	var streamHeader = new Buffer(8);
	streamHeader.write(STREAM_MAGIC_BYTES);
	streamHeader.writeUInt16BE(width, 4);
	streamHeader.writeUInt16BE(height, 6);
	socket.send(streamHeader, {binary:true});
	*/
	var readStream = fs.createReadStream('../data/wkqam2w3ik9360p.mp4');
	readStream.addListener('data', function(data){
		socket.send(data, {binary : true});
	});

	console.log( 'New WebSocket Connection ('+socketServer.clients.length+' total)' );
	
	socket.on('close', function(code, message){
		console.log( 'Disconnected WebSocket ('+socketServer.clients.length+' total)' );
	});
});

socketServer.broadcast = function(data, opts) {
	for( var i in this.clients ) {
		this.clients[i].send(data, opts);
	}
};


// HTTP Server to accept incomming MPEG Stream
/*
var streamServer = require('http').createServer( function(request, response) {
	width = 1280;
	height = 720;

	console.log(
		'Stream Connected: ' + request.socket.remoteAddress + 
		':' + request.socket.remotePort + ' size: ' + width + 'x' + height
	);
	request.on('data', function(data){
		socketServer.broadcast(data, {binary:true});
	});
}).listen(STREAM_PORT);
*/
console.log('Listening for MPEG Stream on http://127.0.0.1:'+STREAM_PORT+'/<secret>/<width>/<height>');
console.log('Awaiting WebSocket connections on ws://127.0.0.1:'+WEBSOCKET_PORT+'/');
