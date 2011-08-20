var win = Ti.UI.currentWindow;

var defaultColor = "#035385";

Ti.API.info("TEAMS.js opened");

//-------------------
//  REMOTE FUNCTION
//-------------------
function loadData() {
	Ti.API.info("loadData aufgerufen");
	
	var rowData = []; //array for tableview data
	
	var httpClient = Ti.Network.createHTTPClient();

	httpClient.onload = function(e) {
		var response = JSON.parse(this.responseText); //all teams
		
		for (var i = 0; i < response.length; i++) {
			var team = response[i].team;
		
			var row = Titanium.UI.createTableViewRow({
				height:'auto',
				hasChild:true, //cell indicator
				team: team //custom value
			});
			
			//View for TableRow
			var row_view = Titanium.UI.createView({ height:'auto', layout:'vertical', top:5, right:5, bottom:5, left:5 });
			var label = Titanium.UI.createLabel({
    			text:team.name,
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

			row_view.add(label);
			row.add(row_view);

			// Give each row a class name
			row.className = "item" + i;
	
			// Add row to the rowData array
			rowData[i] = row;
		
		}//for
		
		// Create the table view and set its data source to "rowData" array
		var tableView = Titanium.UI.createTableView( { data : rowData } );
		
		tableView.addEventListener('click', selectRow);

		//Add the table view to the window
		win.add(tableView);
	};
	httpClient.onerror = function(e) {
	};
	
 
	httpClient.open('GET', Ti.App.Properties.getString("server")+'/teams.json');
	httpClient.setRequestHeader(
		'Authorization',
		'Basic ' + Ti.Utils.base64encode(Ti.App.Properties.getString("email")+':'+Ti.App.Properties.getString("password"))
	);
	httpClient.send();
}

//---------------------------
//  TABLE CELL CLICKED EVENT
//---------------------------
function selectRow(e) {
	var index = e.index;
	var team = e.rowData.team;	
	
	var httpClient = Ti.Network.createHTTPClient();
	httpClient.onload = function(e) {
		var team = JSON.parse(this.responseText).team;
		
		//init teamdetail window
		var detailsWin = Ti.UI.createWindow({
			team: team,
			url:'teamdetails.js'
		});
		if (Titanium.Platform.name == 'android') {
			detailsWin.open({modal: true});
		}
		else {
			win._navGroup.open(detailsWin);
		}
		
	};
	httpClient.onerror = function(e) {
		Ti.API.error("Abrufen des Teams nicht moeglich");
	}
	
	httpClient.open('GET', Ti.App.Properties.getString("server")+"/teams/"+ team.id +".json");
	httpClient.setRequestHeader(
		'Authorization',
		'Basic ' + Ti.Utils.base64encode(Ti.App.Properties.getString("email")+':'+Ti.App.Properties.getString("password"))
	);
	httpClient.send();
}


loadData();
