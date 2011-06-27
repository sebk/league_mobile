var httpClient = Ti.Network.createHTTPClient();
httpClient.open("GET", "http://localhost:3000/me.json");
httpClient.onLoad = function(e) {
	
}
httpClient.onerror =  function(e) {
	
}

httpClient.send();
