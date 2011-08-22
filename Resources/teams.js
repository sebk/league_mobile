var win = Ti.UI.currentWindow;
var defaultColor = "#035385";


if (Titanium.Platform.name == 'android') {
	var activity = Ti.Android.currentActivity;
	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var menuItem = menu.add({title: "Neues Team"});
		menuItem.setIcon("add.png");
		menuItem.addEventListener("click", addTeam);
	};
}
else {
	var rightButton = Ti.UI.createButton({
		systemButton: Ti.UI.iPhone.SystemButton.ADD
	});
	rightButton.addEventListener("click", addTeam)
	win.setRightNavButton(rightButton);
}

function addTeam() {
	var winBG = Ti.UI.createWindow({
		url:'inputwindow.js'
	});
	winBG.open();
}


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

	//init teamdetail window
	var detailsWin = Ti.UI.createWindow({
		url: 'teamdetails.js',
		team: team,
		title: team.name
	});
		
	if (Titanium.Platform.name == 'android') {
		detailsWin.open({modal: true});
	}
	else {
		win._navGroup.open(detailsWin);
	}
}


loadData();
