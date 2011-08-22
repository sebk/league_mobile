var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';
win.opacity = 0.25;

var view = Ti.UI.createView({
	borderRadius: 10,
	backgroundColor: 'black',
	width: 250,
	height: 100,
	top:50
});
	
var label = Ti.UI.createLabel({
	left:10,
	top:10,
	text:"Name des Teams:",
	textAlign:'center',
	fontWeight:'bold'
});
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
	
win.add(view);

