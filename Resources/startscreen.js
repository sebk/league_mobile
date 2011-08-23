var win = Ti.UI.currentWindow;

win.title = 'Willkommen';

//a nice logo would be great
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
	title:'Account anlegen',
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

