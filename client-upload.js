document.addEventListener('DOMContentLoaded', function(){
	var drop = document.getElementById('drop');
	var files = [];
	drop.ondragover = function(){
		this.className = 'hover';
		console.log('drag over');
		return false;
	};

	drop.ondragend = function(){
		this.className = '';
		console.log('drag end');
		return false;
	};
	
	drop.ondragleave = function(){
		this.className = '';
		console.log('drag leave');
		return false;
	}

	drop.ondrop = function(event){
		//get dropped file
		event.preventDefault && event.preventDefault();
		this.className = '';
		console.log('drop');
		var files = event.dataTransfer.files;
		var name = files[files.length-1].name;
		var li = document.createElement('li');
		li.innerText = name;
		drop.appendChild(li);
		
		//upload data to server
		var formData = new FormData();
		for(var i = 0; i < files.length; i++){
			console.log('appending file to form');
			formData.append('file', files[i]);
		}

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://seichejs.com:9001');
		xhr.upload.onprogress = function(event){
			if(event.lengthComputable){
				var complete = (event.loaded / event.total * 100 | 0);
				progress.value = progress.innerHTML = complete;
			}
		}
		xhr.onload = function(){
			if(xhr.status == 200){
				console.log('all done ' + xhr.status);
			}else{
				console.log('something has gone horribly wrong');
			}
		}
		xhr.send(formData);
	}

});
