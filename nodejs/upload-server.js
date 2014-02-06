var http = require('http');
var formidable = require('formidable');
var url = require('url');
var mime = require('mime');
var fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');

http.createServer(function(req, res){
	console.log('Incoming request');
	if(req.method.toLowerCase() == 'post'){
		var uppath; var upext;
		var form = new formidable.IncomingForm();
		console.log('request is post request');
		form.uploadDir = '../raw/';
		form.keepExtensions = true;
		form.parse(req, function(err, fields, files){
			if(err) throw err;
			console.log(files);
			uppath = files.file.path;
			upext = mime.extension(files.file.type);
			console.log(uppath);
			console.log(upext);
		});
		form.on('end', function(){
			console.log('form upload complete');
			var proc = new ffmpeg({source : uppath});
			proc.withSize('640x360');
			proc.withAspect('16:9');
			proc.applyAutopadding(true, 'black');
			//proc.toFormat('mp4');
			proc.saveToFile('../data/test.mp4', function(stdout, stderr){
				//if(stderr) throw stderr;
				console.log(stdout);
				console.log('complete?');
			});
		});
		return;
	}else{
		var path = url.parse(req.url, true).pathname;
		if(path == '/') path += 'index.html';
		var filepath = '..' + path;
		console.log(filepath);
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
}).listen(9001);
console.log('Server listening on port 9001');
