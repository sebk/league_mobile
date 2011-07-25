var win = Ti.UI.currentWindow;
win.setBackgroundColor("#fff");

var email = Ti.UI.createTextField({
	color:"#336699",
	top:10,
	left:10,
	width:300,
	height:40,
	hintText:"E-Mail",
	keyboardType:Ti.UI.KEYBOARD_EMAIL,
	returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
    autocorrect:false
});
win.add(email);

var password = Ti.UI.createTextField({
	color:"#336699",
	top:60,
	left:10,
	width:300,
	height:40,
	hintText:"Passwort",
	passwordMask:true,
	keyboardType:Ti.UI.KEYBOARD_EMAIL,
	returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
	borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
win.add(password);

var loginButton = Ti.UI.createButton({
	title:"Login",
	top:110,
	width:90,
	height:35,
	borderRadius:1,
	font:{fontFamily:"Arial", fontWeight:"bold", fontSize:14}
});
win.add(loginButton);


var httpClient = Ti.Network.createHTTPClient();

loginButton.addEventListener("click", function(e){
	if (email.value != "" && password.value != "") {
		httpClient.open("POST", "http://192.168.178.21:3000/users/sign_in.json");
		
		var postData = "user[email]=" + email.value;
		postData += "&user[password]=" + password.value;
		Ti.API.info("postdata: " + postData);
		
		httpClient.onload = function(e) {
			Ti.API.info("login ok - Response from Server: " + this.responseText);
			var response = JSON.parse(this.responseText);
			email.blur();
			password.blur();
			
			//fire event for app.js
			Ti.App.fireEvent('loggedIn', {  
            	email:email.value,  
            	password:password.value,
        	}); 
			win.close();
		}
		httpClient.onerror = function(e) {
			Ti.API.error("login fehlgeschlagen: " + this.responseText);
		}
		
		httpClient.send(postData);		
	}
	else {
		alert("E-Mail/Passwort angeben!");
	}
});


//listen event: Eintragen der Zugangsdaten nach dem erfolgreichen Registrieren
Ti.App.addEventListener("registerSuccess", function(event) {
	Ti.API.info(event.email);
	Ti.API.info(event.password);
	
	email.value = event.email,
	password.value = event.password
});
