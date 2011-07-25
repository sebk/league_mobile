var tabGroup = Titanium.UI.createTabGroup();

var teamsWin = Titanium.UI.createWindow({  
    url:'teams.js',
    title:"Teams"
});
var teamsTab = Titanium.UI.createTab({  
    title:'Teams',
    window:teamsWin
});

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

// open tab group
tabGroup.open();