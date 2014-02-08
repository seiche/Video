var ffmpeg = require('fluent-ffmpeg');
var Metalib = require('fluent-ffmpeg').Metadata;
var metaObject = new Metalib('../raw/cec118bfde05441823bdaae6035079a5.mpg', function(metadata, err) {
	if(err) throw err;
	convertVideo(metadata.durationsec);
});

function convertVideo(time){
	console.log(time);
	var proc = new ffmpeg({ 
		source: '../raw/cec118bfde05441823bdaae6035079a5.mpg'
	})
	.usingPreset('480p.js')
	.onProgress(function(progress){
 	 console.log(progress+"%");
	})
	.saveToFile('../data/autop.mp4', function(stdout, stderr) {
		console.log('Out: ' + stdout);
		console.log('Err; ' + stderr);
		console.log('file has been converted succesfully');
	});
}
