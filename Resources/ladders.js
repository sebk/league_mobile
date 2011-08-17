var httpClient = Ti.Network.createHTTPClient();
httpClient.open("GET", Ti.App.Properties.getString("server")+"/me.json");
httpClient.onLoad = function(e) {
	
}
httpClient.onerror =  function(e) {
	
}

httpClient.send();
