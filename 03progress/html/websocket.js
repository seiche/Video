window.WebSocket = window.WebSocket || window.MozWebSocket;

var connection = new WebSocket('ws://seichejs.com:9001');

connection.onopen = function(){
	console.log('open');
};

connection.onerror = function(err){
	console.log(err);
};

connection.onmessage = function(msg){
	var data = JSON.parse(msg.data);
	document.getElementById(data.res).value = data.percent;
};

connection.onclose = function(){
	console.log('closed');
};
