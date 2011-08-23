var win = Ti.UI.currentWindow;

var view = Ti.UI.createView({
	borderRadius: 10,
	backgroundColor: 'black',
	width: 250,
	height: 100,
	top:50,
});
	
	
var label = Ti.UI.createLabel({
	left:10,
	//top:-60,
	text:"Name des Teams:",
	color:'white'
});
if (Titanium.Platform.name == 'android') { //looks nicer
	label.top = 10;
	win.backgroundColor = 'white';
	win.opacity = 0.25;
	
}
else {
	label.top = -60;
}

var inputField = Ti.UI.createTextField({
	height: 40,
	width: 220,
	left:10,
	top: 40,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
});
inputField.addEventListener('return', function(e) {
	win.close();
});

view.add(label);
view.add(inputField);


win.addEventListener('focus', function(){
  setTimeout(function(){
    inputField.focus();  
  },100);
});


win.add(view);
