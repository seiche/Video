var ffmpeg = require('fluent-ffmpeg');
var proc = new ffmpeg({ 
	source: '../raw/02bccddb9f56a33584e34ebf2555dc53.avi'
})
.withSize('854x480')
.withVideoCodec('libx264')
.withAudioCodec('libvorbis')
.withAudioChannels(2)
.withAudioBitrate('128k')
.withFps(24)
.withVideoBitrate(500)
.onProgress(function(progress){
  console.log('"Progress' + progress);
})
.saveToFile('../data/test480p.mp4', function(stdout, stderr) {
	console.log('Out: ' + stdout);
	console.log('Err; ' + stderr);
	console.log('file has been converted succesfully');
});
