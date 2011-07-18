var win = Ti.UI.currentWindow;

var defaultColor = "#035385";

//-------------------
//	TABLE
//-------------------

var headerLabel = Ti.UI.createLabel({
	backgroundColor:'#035385',
	color:"white",
	font:{ fontSize:16, fontWeight:"bold"},
	text:"Meine Teams",
	textAlign:"center",
	height:35,
	width:320
});

var table = Ti.UI.createTableView({
	backgroundColor:"white",
	data: weatherData,
	headerView:headerLabel,
	top:10,
	left:10,
	width:300
});


var httpClient = Ti.Network.createHTTPClient();
var tableData;

var weatherData = [];

httpClient.onload = function(e) {
	var response = JSON.parse(this.responseText);
	
	weatherData = [
  { title:"Mountain View (North America) - Cloudy", color:defaultColor},
  { title:"Washington, DC (North America) - Mostly Cloudy", color:defaultColor },
  { title:"Brasilia (South America) - Thunderstorm", color:defaultColor },
  { title:"Buenos Aires (South America) - Clear", color:defaultColor },
  { title:"Sucre (South America) - Mostly Cloudy", color:defaultColor },
  { title:"London (Europe) - Overcast", color:defaultColor },
  { title:"Moscow (Europe) - Partly Cloudy", color:defaultColor },
  { title:"Prague (Europe) - Clear", color:defaultColor },
  { title:"St Petersburg (Europe) - Snow", color:defaultColor },
	];
	
	//better: insertRow (http://developer.appcelerator.com/apidoc/mobile/latest/Titanium.UI.TableView-object.html)
	table.setData(weatherData, {animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
};
httpClient.onerror = function(e) {
};
httpClient.open('GET', 'http://localhost:3000/teams.json');
httpClient.send();


win.add(table);


