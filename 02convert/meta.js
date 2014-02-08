var Metalib = require('fluent-ffmpeg').Metadata;

var metaObject = new Metalib('../raw/cec118bfde05441823bdaae6035079a5.mpg', function(metadata, err) {
	console.log(require('util').inspect(metadata, false, null));
});
