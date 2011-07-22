var win = Ti.UI.currentWindow;

var defaultColor = "#035385";


//-------------------
//  REMOTE FUNCTION
//-------------------
function loadData() {
	var rowData = []; //array for tableview data
	
	var httpClient = Ti.Network.createHTTPClient();

	httpClient.onload = function(e) {
		var response = JSON.parse(this.responseText);	
		//var response = eval(this.responseText);
		
		
		for (var i = 0; i < response.length; i++) {
    		var name  = response[i].team.name; // The tweet message
    		Ti.API.info("NAME: " + name);
		
		var row = Titanium.UI.createTableViewRow({height:'auto'});
		var post_view = Titanium.UI.createView({ height:'auto', layout:'vertical', top:5, right:5, bottom:5, left:5 });
		
		var label = Titanium.UI.createLabel({
    		text:name,
    		left:5,
    		width:320,
    		top:0,
    		bottom:0,
    		height:40,
    		textAlign:'left',
    		color:'#444444',
    		font:{
        		fontFamily:'Trebuchet MS',fontSize:18,fontWeight:'bold'
    		}
		});

		post_view.add(label);
		
		row.add(post_view);

		// Give each row a class name
		row.className = "item" + i;

		// Add row to the rowData array
		rowData[i] = row;
		
		}//for
		
		// Create the table view and set its data source to "rowData" array
		var tableView = Titanium.UI.createTableView( { data : rowData } );

		//Add the table view to the window
		win.add(tableView);


		//for(var i=0, ilen=response.length; i<ilen; i++){
  			//var thisObject = "title: " + response[i]["team"]["name"] + ", color: defaultColor";
		//}	
		//table.setData(responseData, {animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
	};
	httpClient.onerror = function(e) {
	};
	
	httpClient.open('GET', 'http://localhost:3000/teams.json');
	httpClient.send();
}


loadData();

//-------------------
//	TABLE
//-------------------
/*
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
	headerView:headerLabel,
	top:10,
	left:10,
	width:300
});

win.add(table);
*/
