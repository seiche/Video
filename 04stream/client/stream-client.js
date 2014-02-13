window.WebSocket = window.WebSocket || window.MozWebSOcket;
window.URL = window.URL || window.webkitURL;
window.MediaSource = window.MediaSource || window.WebKitMediaSource;

var video = document.getElementById('stream');
video.width = 640;
video.height = 360;
video.style.marginTop = (window.innerHeight - 360)*0.5 + "px";
	
var mediaSource = new MediaSource();
video.src = window.URL.createObjectURL(mediaSource);
mediaSource.addEventListener('sourceopen', function(e){		
	var queue = [];
	var busy = false;
	var sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.4D401E, mp4a.40.2"');	
	sourceBuffer.addEventListener('updateend', function() {
	  video.play();
	  console.log('not so busy');
	  busy = false;
	}, true);
	var connection = new WebSocket('ws://seichejs.com:8800');
	connection.binaryType = "arraybuffer";
	connection.onopen = function(){
		video.play();
		console.log('video playing');
	}
	connection.onmessage = function(msg){
		/*
		var uInt8Array = new Uint8Array(msg.data);
		var file = new Blob([uInt8Array], {type: 'video/mp4'});
		var reader = new FileReader();
		reader.readAsArrayBuffer(file);
		reader.onload = function(e) {
			sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
		};
		*/
		//console.log(sourceBuffer);
		
		if(!busy){
			busy = true;
			sourceBuffer.appendBuffer(new Uint8Array(msg.data));
		}
	}
	
	connection.onclose = function(){
		console.log('closed');
	}
});