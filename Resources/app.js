Titanium.UI.setBackgroundColor('#fff');

//host URL
Ti.App.Properties.setString("server", "http://192.168.100.156:3000");

Ti.include('tabgroup.js'); //include tabGroup


if (Ti.App.Properties.getString("email")==null && Ti.App.Properties.getString("password")==null ) {
	//login/register window
	var win = Ti.UI.createWindow({
		url:'startscreen.js'
	});
	win.open(); 
} else {
	Ti.API.info(Ti.App.Properties.getString("email"));
	// open tab group
	tabGroup.open();
};


//login event handler; handle successfull login
Ti.App.addEventListener('loggedIn', function(event) {
	Ti.API.info("app.js: receive event loggedIn");
	
	win.close();
	
	//store credentials in global properties	
	Titanium.App.Properties.setString("email", event.email);
	Titanium.App.Properties.setString("password", event.password);
	
	tabGroup.open();
});
