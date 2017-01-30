var app = {
    initialize: function() {
        this.bindEvents();
		document.getElementById("loginBtn").addEventListener('click', this.login, false);
		document.getElementById("passwordTxt").addEventListener('keypress', this.keypress,false);
		
		//introducció automàtica d'usuari i contrasenya per a proves
		//document.getElementById("userNameTxt").value = "admin";
		//document.getElementById("passwordTxt").value= "admin";
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
		app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);

        console.log('Received Event: ' + id);
    },

	
	keypress: function(e){
		if(e.keyCode==13){
			this.login();
		}
	},
	
	//Si l'usuari introduit és el que s'ha posat de prova 
	//(en aquesta demo no hi ha persistencia de dades),
	// obrirà la finestra d'estat	
	login: function() {
		var user =
    	document.getElementById("userNameTxt").value;
		
		var password =
    	document.getElementById("passwordTxt").value;

		if(user == "admin" && password == "admin")
		{
			window.open("state.html");
		}else{
			alert('Usuari o contrasenya incorrecte');
		}
		
	},
	
   
};

