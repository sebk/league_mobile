//thanks to http://mobile.tutsplus.com/tutorials/appcelerator/

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#fff');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
var loginWin = Titanium.UI.createWindow({  
    url:'login.js',
    title:"Login"
});
var loginTab = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Login',
    window:loginWin
});


var registerWin = Titanium.UI.createWindow({  
    title:'Registrieren',
    backgroundColor:'#fff',
    url:'register.js'
});
var registerTab = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Registrieren',
    window:registerWin
});


//
//  add tabs
//
tabGroup.addTab(loginTab);  
tabGroup.addTab(registerTab);  


// open tab group
tabGroup.open();
