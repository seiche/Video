var ffmpeg = require('fluent-ffmpeg');

var proc = new ffmpeg({ source: '../raw/02bccddb9f56a33584e34ebf2555dc53.avi' })
.withSize('640x360')
.onProgress(function(progress){
	console.log(progress);
})
.takeScreenshots(25, '../data/ss/', function(err, filenames) {
if(err) throw err;
	console.log(filenames);
	console.log('screenshots were saved');
});
