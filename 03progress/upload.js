/* Import Statements */
var http = require('http');
var formidable = require('formidable');
var url = require('url');
var mime = require('mime');
var fs = require('fs');
var WebSocketServer = require('websocket').server;
var ffmpeg = require('fluent-ffmpeg');
var client;

/* Create http server to handle uploads*/
var server = http.createServer(function(req, res){
	
	/* Handles form data on post method */
	if(req.method.toLowerCase() == 'post'){
		console.log('Incoming Form request');
		var uppath;
		var form = new formidable.IncomingForm();
		
		form.uploadDir = '../raw/';
		form.keepExtensions = true;
		
		form.parse(req, function(err, fields, files){
			if(err) throw err;
			//console.log(files);
			uppath = files.file.path;
			console.log(uppath);
		});
		
		form.on('end', function(){
			console.log('Form upload complete');
			res.writeHead(200);
			res.end('okay');
			var destfile = Math.random().toString(36).substring(7);
			convert(uppath, destfile, 0);
		});
	}/* Otherwise servers upload form for get */
	else{
		var path = url.parse(req.url, true).pathname;
		if(path == '/') path += 'index.html';
		var filepath = './html' + path;
		fs.readFile(filepath, function(error, page){
			if(error){
				res.writeHead(404);
				res.end(error.toString());
				return;
			}
			var type = mime.lookup(filepath);
			res.writeHead(200, type);
			res.end(page);
		});
	}
}).listen(9001, console.log('Server listening on port 9001'));

var WebSocket = new WebSocketServer({
	httpServer : server
});

WebSocket.on('request', function(request){
	var connection = request.accept(null, request.origin);
	client = connection;

	connection.on('close', function(){
		client = null;
	});
});

var rez = ['360p', '480p', '720p'];
function convert(srcfile, dest, input){
	if(input <= rez.length){
		var proc = new ffmpeg ({ source : uppath})
		.usingPreset('360p.js')
		.onProgress(function(progress){
				if(client){
					var send = {
						res : rez[input],
						percent : progress
					};
					client.sendUTF(JSON.stringify(send));
				}
		})
		.saveToFile('../data/'+dest+rez[input]+'.mp4', function(stdout, stderr){
			console.log(stdout);
			console.log(stderr);
			console.log('File converted successfully');
			input++;
			convert(srcfile, dest, input);
		});
	}else{
		console.log('Conversion complete');
	}
}
