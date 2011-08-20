var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';
var team = win.team;

var data = [
	{title:"Test Row 1", color:'black', fontWeight:'bold', hasChild:true},
	{title:"Test Row 2", color:'black', fontWeight:'bold', hasChild:true},
];

function loadData() {
	
}

function createTable() {
	var section1 = Ti.UI.createTableViewSection({
		headerTitle:"My section"
	});
	for (var i=0; i < data.length; i++) {
	  var row = Ti.UI.createTableViewRow({
	  	title: data[i].title,
	  	fontWeight: data[i].fontWeight,
	  	hasChild: data[i].hasChild,
	  	color:data[i].color,
	  	height: 44
	  });
	  section1.add(row);
	};
	
	var tableView = Ti.UI.createTableView({
		data: [section1]
	});
	
	if (Titanium.Platform.name != 'android') {
		tableView.style = Ti.UI.iPhone.TableViewStyle.GROUPED;
	};
	
	win.add(tableView);
}

loadData();
createTable();
