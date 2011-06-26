var win = Ti.UI.currentWindow;
var view = Ti.UI.createView({
	backgroundColor:'#fff',
});

var label = Titanium.UI.createLabel({
				text:"Ein Test",
				left:54,
				width:120,
				top:2,
				bottom:2,
				height:16,
				textAlign:'left',
				color:'#444444',
				font:{fontFamily:'Trebuchet MS',fontSize:14,fontWeight:'bold'}
			});
view.add(label);
			

function loadData() {
	Ti.API.info("LOAD DATA STARTED");
	
	post_user_session();
}

function post_user_session() {
	Ti.API.info("post_user_session");
	
	var loader = Ti.Network.createHTTPClient();
	
	loader.onload = function(e) {
		get_me();
	};
	
	//var parameters = {
		//user: {password:'asdasd', email:'sek@gobas.de'}
	//}
	var postData = "user[email]=" + "sek@gobas.de";
	postData += "&user[password]=" + "asdasd";
	
	loader.open('POST','http://localhost:3000/users/sign_in.json');
	loader.send(postData);
	
}

function get_me() {
	var loader = Titanium.Network.createHTTPClient();
	loader.onload = function(e) {
		Ti.API.info("GET: " + this.responseText);
	}
	loader.open('GET', 'http://localhost:3000/me.json');
	loader.send();
}

loadData();


win.add(view);
