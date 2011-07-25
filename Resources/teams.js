var win = Ti.UI.currentWindow;

var defaultColor = "#035385";

Ti.API.info("TEAMS.js opened");

//-------------------
//  REMOTE FUNCTION
//-------------------
function loadData() {
	var rowData = []; //array for tableview data
	
	var httpClient = Ti.Network.createHTTPClient();

	httpClient.onload = function(e) {
		var response = JSON.parse(this.responseText);			
		
		for (var i = 0; i < response.length; i++) {
    		var name  = response[i].team.name; // The tweet message
    		Ti.API.info("NAME: " + name);
		
			var row = Titanium.UI.createTableViewRow({
				height:'auto',
				hasChild:true
			});
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
	};
	httpClient.onerror = function(e) {
	};
	
 
	httpClient.open('GET', 'http://192.168.178.21:3000/teams.json');
	httpClient.send();
}


loadData();
