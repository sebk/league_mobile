
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
		//modal:true,
		url:'login.js',
		opacity:0.6,
		backgroundColor:'black'
	});
	loginWindow.open();
		
/*
	var loginWindow = Ti.UI.createWindow({
		//modal:true, 
		title:'Modal Window', 
		backgroundColor:'#000',
		//opacity:0.6,
		width:280,
		height:200,
		left:20,
		backgroundImage:'bubble.png'
	});
	
	//var closeBtn = Ti.UI.createLabel({text:'Return', textAlign:'center', width:55, height:55, backgroundColor:'#ccc'})
	var closeBtn = Ti.UI.createButton({
		title:'Login',
		height:35,
		width:100,
		top:150,
		left:20
	});
	loginWindow.add(closeBtn);
	loginWindow.open();
	closeBtn.addEventListener('click', function(e){
		loginWindow.close();
	});
	
	*/

	/*
    var alertWindow = Titanium.UI.createWindow({
    	width:150,
    	height: 100,
    	//modal:true,
    	fullscreen:false,
    	backgroundColor:'black'
	});
	var okButton = Ti.UI.createButton({
		title:'OK',
		top:50,
		height:50,
		width:60,
		borderRadius:1
	});
	alertWindow.add(okButton);
	//alertWindow.open({modal:true});
	*/
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
   
});
win.add(registerButton);


win.open(); 


//login event handler
Ti.App.addEventListener('loggedIn', function(event) {
	Ti.API.info("app.js: receive event loggedIn");
	
	//store credentials in global properties	
	Titanium.App.Properties.setString("email", event.email);
	Titanium.App.Properties.setString("password", event.password);
});
