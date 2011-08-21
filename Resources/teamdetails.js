var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';
var team = win.team; 


var users = [];
function loadUsers() {
	for (var i=0; i < team.users.length; i++) {
	  var user_name = team.users[i].name;
	  users[i] = {name:user_name, hasChild:false};
	};
}

var ladders = [];
function loadLadders() {
	for (var i=0; i < team.ladders.length; i++) {
	  var ladder_name = team.ladders[i].name;
	  ladders[i] = {name:ladder_name, hasChild:false};
	};
}

function createTable() {
	loadUsers();
	var section_users = Ti.UI.createTableViewSection({
		headerTitle:"Mitglieder"
	});
	
	loadLadders();
	if (ladders.length > 0) {
		var section_ladders = Ti.UI.createTableViewSection({
			headerTitle:"Ligen"
		});
	};

	
	for (var i=0; i < users.length; i++) {
	  var row = Ti.UI.createTableViewRow({
	  	title: users[i].name,
	  	fontWeight: 'bold',
	  	hasChild: users[i].hasChild,
	  	color:'black',
	  	height: 44
	  });
	  section_users.add(row);
	};
	
	for (var i=0; i < ladders.length; i++) {
	  var row = Ti.UI.createTableViewRow({
	  	title: ladders[i].name,
	  	fontWeight: 'bold',
	  	hasChild: ladders[i].hasChild,
	  	color:'black',
	  	height: 44
	  });
	  section_ladders.add(row);
	};
	
	var tableView;
	if (Titanium.Platform.name == 'android') {
		tableView = Ti.UI.createTableView({
			data: [section_users, section_ladders]
		});
	}
	else {
		tableView = Ti.UI.createTableView({
			data: [section_users, section_ladders],
			style: Ti.UI.iPhone.TableViewStyle.GROUPED
		});
	}
	win.add(tableView);
}

//loadUsers();
//loadLadders();
createTable();
