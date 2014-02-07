var ffmpeg = require('fluent-ffmpeg');
var proc = new ffmpeg({ 
	source: '../raw/02bccddb9f56a33584e34ebf2555dc53.avi'
})
.usingPreset('360p.js')
.onProgress(function(progress){
  console.log('"Progress' + progress);
})
.saveToFile('../data/pre360p.mp4', function(stdout, stderr) {
	console.log('Out: ' + stdout);
	console.log('Err; ' + stderr);
	console.log('file has been converted succesfully');
});
