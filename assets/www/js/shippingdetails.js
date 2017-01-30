var app = {
	initialize: function() {
		  this.getShipping();
	},
	
	//Recupera les dades d'un enviament a obrir 
	//a partir dels arguments de la URL  
	//i les mostra per pantalla
	getShipping: function() {
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}

		document.getElementById("name").value =decodeURIComponent(vars["name"]);
		document.getElementById("state").value = decodeURIComponent(vars["state"]);
		document.getElementById("sendingDate").value = decodeURIComponent(vars["sendingDate"]);
		document.getElementById("deliveryDate").value = decodeURIComponent(vars["deliveryDate"]);
		document.getElementById("deliveryAddress").value = decodeURIComponent(vars["deliveryAddress"]);
		document.getElementById("location").value = decodeURIComponent(vars["location"]);
 		document.getElementById("sendAddress").value = decodeURIComponent(vars["sendAddress"]);
		  
	},
}