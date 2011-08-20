var tabGroup = Titanium.UI.createTabGroup();

var baseWindow = Ti.UI.createWindow({
	navBarHidden:true,
	title:'base window'
});

var teamsWin = Titanium.UI.createWindow({  
    url:'teams.js',
    title:"Teams"
});

if (Ti.Platform.osname == "iphone") {
	var nav = Ti.UI.iPhone.createNavigationGroup({
		window:teamsWin
	});
	baseWindow.add(nav);
	
	//set navGroup so we can push new windows into the group
	teamsWin._navGroup = nav;
};


var teamsTab = Titanium.UI.createTab({  
    title:'Teams',
    //window:teamsWin
    //window:baseWindow
});
if (Ti.Platform.osname == "iphone") {
	teamsTab.window = baseWindow;
}
else {
	teamsTab.window = teamsWin;
}


var laddersWin = Titanium.UI.createWindow({  
    title:'Ligen',
    url:'ladders.js'
});
var laddersTab = Titanium.UI.createTab({  
    title:'Ligen',
    window:laddersWin
});

tabGroup.addTab(teamsTab);  
tabGroup.addTab(laddersTab);  
