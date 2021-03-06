var win = Ti.UI.currentWindow;
win.setBackgroundColor("#fff");

var email = Ti.UI.createTextField({
	color:"#336699",
	top:25,
	left:10,
	width:280,
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
	top:75,
	left:10,
	width:280,
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
	top:150,
	width:100,
	height:35,
	left:30,
	borderRadius:1,
	font:{fontFamily:"Arial", fontWeight:"bold", fontSize:14}
});
win.add(loginButton);

var cancelButton = Ti.UI.createButton({
	title:'Abbrechen',
	top:150,
	width:100,
	height:35,
	left:170,
	borderRadius:1,
	font:{fontFamily:"Arial", fontWeight:"bold", fontSize:14}
});
win.add(cancelButton);

cancelButton.addEventListener('click', function(e) {
	win.close();
});

var httpClient = Ti.Network.createHTTPClient();

loginButton.addEventListener("click", function(e){
	if (email.value != "" && password.value != "") {
		httpClient.open("POST", Ti.App.Properties.getString("server")+"/users/sign_in.json");
		Ti.API.info("URL: " + httpClient.location);
		
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
