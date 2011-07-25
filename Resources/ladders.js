var httpClient = Ti.Network.createHTTPClient();
httpClient.open("GET", "http://192.168.178.21:3000/me.json");
httpClient.onLoad = function(e) {
	
}
httpClient.onerror =  function(e) {
	
}

httpClient.send();
