var ffmpeg = require('fluent-ffmpeg');
var proc = new ffmpeg({ 
	source: '../raw/cec118bfde05441823bdaae6035079a5.mpg'
})
.usingPreset('480p.js')
.onProgress(function(progress){
  console.log('"Progress' + progress);
})
.saveToFile('../data/autop.mp4', function(stdout, stderr) {
	console.log('Out: ' + stdout);
	console.log('Err; ' + stderr);
	console.log('file has been converted succesfully');
});
