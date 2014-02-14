window.MediaSource = window.MediaSource || window.WebKitMediaSource;
const NUM_CHUNKS = 5;

var video = document.querySelector('video');
var mediaSource = new MediaSource();
video.src = window.URL.createObjectURL(mediaSource);

mediaSource.addEventListener('sourceopen',function callback(e) {
  var sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'test.webm', true);
  xhr.responseType = 'arraybuffer';
  xhr.send();

  xhr.onload = function() {
    if (xhr.status != 200) {
      alert("Unexpected status code " + xhr.status);
      return false;
    }
    var uInt8Array = new Uint8Array(xhr.response);
    var file = new Blob([uInt8Array], {type: 'video/webm'});
    var chunkSize = Math.ceil(file.size / NUM_CHUNKS);
    
    (function readChunk_(i) {
      var reader = new FileReader();
      reader.onload = function(e) {
        sourceBuffer.appendBuffer(new Uint8Array(e.target.result));
        if(i < NUM_CHUNKS)
          readChunk_(++i);
        else 
          mediaSource.endOfStream();
      };

      var startByte = chunkSize * i;
      var chunk = file.slice(startByte, startByte + chunkSize);

      reader.readAsArrayBuffer(chunk);
    })(0);
  };
}, false);
