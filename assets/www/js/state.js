var app = {
	
	//Array que conté un llistat d'enviament de prova
	var : shippings = [],
	
    initialize: function() {
			this.bindEvents();
			this.drawshippings();
			this.checkNew();
	},

    bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.getElementById("newShippingBtn").addEventListener('click', this.onNewShipping, false);
    },

	//Quan es prem el botó de nou enviament s'obre la pàgina corresponent	
	onNewShipping: function(){
		window.open("shippingPoint.html");
	},
	
	//Quan s'obre la finestra d'estats es comprova si en els arguments i venen nous enviaments per guardar
	checkNew:function(){
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		if(vars["name"]!=null){
			var name = decodeURIComponent(vars["name"]);
			var deliveryDate= decodeURIComponent(vars["deliveryDate"]);
			var deliveryAddress= decodeURIComponent(vars["deliveryAddress"]);
			var sendingDate= decodeURIComponent(vars["sendingDate"]);
			var sendAddress= decodeURIComponent(vars["sendAddress"]);
						
			var newShipping = ({id: shippings.length+1,name:name, state:"Pendent", sendingDate:sendingDate, deliveryDate:deliveryDate, deliveryAddress: deliveryAddress, location: "Sense dades", sendAddress: sendAddress});
			
			shippings.push(newShipping);
			
			this.drawshippings();
		}

	},
			
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
		
    },
	
    receivedEvent: function(id) {

        console.log('Received Event: ' + id);
    },

	//Es dibuixa el llistat d'enviaments, 
	//a cada fila si afegeix un enllaç (<a>) per
	//permetre obrir el detall
	drawshippings: function(){
		if(shippings.length==0)this.getshippingList();
		
		var len = shippings.length;
		
		$('#shippingList li').remove();
		for (i=0;i<len;i++){
			$('#shippingList').append('<li><a charset="UTF-8" href="shippingdetails.html?name='+ shippings[i].name + 
																		'&state='+shippings[i].state +
																		'&sendingDate='+shippings[i].sendingDate + 
																		'&deliveryDate='+shippings[i].deliveryDate + 
																		'&deliveryAddress='+shippings[i].deliveryAddress +
																		'&sendAddress='+shippings[i].sendAddress + 
																		'&location='+shippings[i].location + '">' +
					'<p class="line1">' + shippings[i].name + '</p>' +
					'<p class="line2">Entrega: ' + shippings[i].deliveryDate + '</p>' +
					'<span class="bubble">' + shippings[i].state + '</span></a></li>');
		}
	},

	//En aquesta funció es crea el llistat d'enviaments de prova
	getshippingList: function() {
		shippings = [{id: 1,name:"Enviament 1", state:"Preparant", sendingDate:"12-10-2014", deliveryDate:"22-10-2014", deliveryAddress: "Carrer X", location: "Al Magatzem",sendAddress:"Origen"},
		{id: 2, name:"Enviament 2", state:"En procés", sendingDate:"12-10-2014", deliveryDate:"22-10-2014", deliveryAddress: "Carrer X", location: "Al Magatzem",sendAddress:"Origen"},
		{id: 3,name:"Enviament 3", state:"Pendent", sendingDate:"12-10-2014", deliveryDate:"22-10-2014", deliveryAddress: "Carrer X", location: "Al Magatzem",sendAddress:"Origen"},
		{id: 4,name:"Enviament 4", state:"Pendent", sendingDate:"12-10-2014", deliveryDate:"22-10-2014", deliveryAddress: "Carrer X", location: "Al Magatzem",sendAddress:"Origen"},
		{id: 5,name:"Enviament 5", state:"Enviat", sendingDate:"12-10-2014", deliveryDate:"22-10-2014", deliveryAddress: "Carrer X", location: "Al Magatzem",sendAddress:"Origen"},
		{id: 6,name:"Enviament 6", state:"Enviat", sendingDate:"12-10-2014", deliveryDate:"22-10-2014", deliveryAddress: "Carrer X", location: "Al Magatzem",sendAddress:"Origen"},
		{id: 7,name:"Enviament 7", state:"Entregat", sendingDate:"12-10-2014", deliveryDate:"22-10-2014", deliveryAddress: "Carrer X", location: "Al Magatzem",sendAddress:"Origen"}];
		
		return shippings;
	}
	
}
