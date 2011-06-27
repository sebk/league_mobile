var win = Ti.UI.currentWindow;

/*
 * Interface
 */
var scrollView = Ti.UI.createScrollView({
	contentWidth:"auto",
	contentHeight:"auto",
	top:0,
	showVerticalScrollIndicator:true,
	showHorizontalScrollIndicator:false,
	backgroundColor:"#fff"
});
win.add(scrollView);

var username = Ti.UI.createTextField({
	color:"#336699",
	top:10,
	left:10,
	width:300,
	height:40,
	hintText:"Name",
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
})
scrollView.add(username);

var email = Titanium.UI.createTextField({  
    color:'#336699',  
    top:60, 
    left:10,  
    width:300,  
    height:40,  
    hintText:'E-mail',  
    keyboardType:Titanium.UI.KEYBOARD_EMAIL,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
    autocapitalization:Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
    autocorrect:false
});  
scrollView.add(email); 

var password1 = Ti.UI.createTextField({
	color:"#336699",
	top:110,
	left:10,
	width:300,
	height:40,
	hintText:"Passwort",
	passwordMask:true,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(password1);

var password2 = Ti.UI.createTextField({
	color:"#336699",
	top:160,
	left:10,
	width:300,
	height:40,
	hintText:"Passwort wiederholen",
	passwordMask:true,
	keyboardType:Titanium.UI.KEYBOARD_DEFAULT,  
    returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,  
    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
});
scrollView.add(password2);

var registerButton = Ti.UI.createButton({
	title:"Abschicken",
	top:260,
	width:130,
	height:35,
	borderRadius:1,
	font:{fontFamily:"Arial", fontWeight:"bold", fontSize:14}
});
scrollView.add(registerButton);


/*
 * Validation logic
 */
function checkEmail(emailAddress) {
	var str = emailAddress;
	var regular = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
	if (regular.test(str)) {
		return true;	
	}
	else {
		return false;
	}
};

function fieldsFilled() {
	if (username.value != "" && password1.value != "" && password2.value != "" && email.value != "") {
		return true;
	} else{
		return false;
	};
};

function passwordsMatches() {
	if (password1.value == password2.value) {
		return true;
	} else{
		return false;
	};
};

/*
 * Request
 */
function sendRequest() {
	var request = Ti.Network.createHTTPClient();
	request.onload = function() {
		Ti.API.info("RESULT: " + this.responseText);
		Ti.API.info("STATUSCODE:"+ this.status);
		
		var response = JSON.parse(this.responseText);
		
		registerButton.enabled = true;
		registerButton.opacity = 1;
		
		//Fehlerbehandlung
		if (this.status == "422") {
			//Ti.API.error(response.email);
			alert(response);
		}
		else {
			var alertDialog = Ti.UI.createAlertDialog({
				title:"Registreirung",
				message:"Danke fuer die Registrierung",
				buttonNames: ["OK"]
			});
			alertDialog.show();
			alertDialog.addEventListener("click", function(e){
				//fire event, um die Daten in die Loginfelder einzutragen
				Ti.App.fireEvent("registerSuccess", {
					email:email.value,
					password:password1.value
				});
				win.tabGroup.setActiveTab(0);
			});
		}
	}
	request.open("POST", "http://localhost:3000/users.json");
	
	var postData = "user[email]=" + email.value;
	postData += "&user[name]=" + username.value;
	postData += "&user[password]=" + password1.value;
	postData += "&user[password_confirm]=" + password2.value;
	
	request.send(postData);
};


/*
 * Button event
 */
registerButton.addEventListener("click", function(e){
	if (!fieldsFilled()) {
		alert("Alle Felder müssen gefüllt sein");
	}
	else if(!passwordsMatches()) {
		alert("Die Passwörter sind nicht gleich");
	}
	else if(!checkEmail(email.value)) {
		alert("Keine gültige E-Mail Adresse");
	}
	else {
		registerButton.enabled = false;
		registerButton.opacity = 0.3;
		sendRequest();
	}
});
