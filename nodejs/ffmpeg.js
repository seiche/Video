var spawn = require('child_process').spawn;
var ffmpeg = spawn('ffmpeg', args);
setTimeout(function() {
	ffmpeg.stderr.on('data', function() {
	ffmpeg.stdin.setEncoding('utf8');
	ffmpeg.stdin.write('q');
	process.exit();
	});
}, 10000);
