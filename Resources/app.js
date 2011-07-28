Titanium.UI.setBackgroundColor('#fff');

//Window mit Login/Registrieren
var win = Ti.UI.createWindow({
	title:'Willkommen'
});

//vorerst nur ein Platzhalter; ein schoenes Logo waere besser
var label = Ti.UI.createLabel({
	text:'league mobile',
	top:20,
  	color:'blue',
  	font:{fontFamily:'Helvetica Neue',fontSize:18,fontWeight:'bold'},
  	textAlign:'center', 
  	width:200,
  	height:100
});
win.add(label);


var loginButton = Ti.UI.createButton({
	title:'Login',
	top:230,
	width:200,
	height:35,
	borderRadius:1,
	font:{fontFamily:"Arial", fontWeight:"bold", fontSize:14}
});

loginButton.addEventListener('click',function(e) {
	var loginWindow = Ti.UI.createWindow({
		modal:true,
		url:'login.js',
		opacity:0.9,
	});
	loginWindow.open();
});
win.add(loginButton);


var registerButton = Ti.UI.createButton({
	title:'Registrieren',
	top:280,
	width:200,
	height:35,
	borderRadius:1,
	font:{fontFamily:"Arial", fontWeight:"bold", fontSize:14}
});

registerButton.addEventListener('click',function(e) {
   var regWindow = Ti.UI.createWindow({
		modal:true,
		url:'register.js',
		opacity:0.9,
	});
	regWindow.open();
});
win.add(registerButton);

win.open(); 


//login event handler
Ti.App.addEventListener('loggedIn', function(event) {
	Ti.API.info("app.js: receive event loggedIn");
	
	win.close();
	
	//store credentials in global properties	
	Titanium.App.Properties.setString("email", event.email);
	Titanium.App.Properties.setString("password", event.password);
	
	
	var tabWin = Ti.UI.createWindow({
		url:'main.js'
	});
	tabWin.open();
});
