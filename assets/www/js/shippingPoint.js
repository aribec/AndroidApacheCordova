
    document.addEventListener("deviceready", onDeviceReady, false);

	var markerStart;
	var markerStartAddress;
	var markerFinish;
	var markerFinishAddress;
		
	var map;
    
	// Quan la API esta disponible s'inicialitza el mapa
    function onDeviceReady() {
	    document.getElementById("saveShippingBtn").addEventListener('click', onSaveShipping, false);
		document.getElementById("deliveryDate").addEventListener('click', onInputClick, false);
		
		var option = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};
        navigator.geolocation.getCurrentPosition(onSuccess, onError,option);
				
	  map = new google.maps.Map(document.getElementById('map_canvas'),
		{
			zoom: 7,
			center: new google.maps.LatLng(41.408652, 2.171080),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			zoomControl: true,
			maxZoom: 19
		});
		

			 
    }

	//Centra el mapa a unes coordenades concretes
    function centerMaptoCoords(lat,lng) {
            map.center = new google.maps.LatLng(lat, lng);
            map.setCenter(new google.maps.LatLng(lat, lng));
            map.setZoom(15);
    }

	//Es creen les marques d'origen i desti i es posen al mapa
    function onSuccess(position) {
		centerMaptoCoords(position.coords.latitude,position.coords.longitude);
		
		var myLatlng = new google.maps.LatLng(position.coords.latitude,	
									position.coords.longitude);

		 markerStart = new google.maps.Marker({
			  position: myLatlng,
			  map: map,
			  title: 'Origen',
			  draggable: true,
			  icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
			 });
		
		markerFinish = new google.maps.Marker({
			  position: myLatlng,
			  map: map,
			  title: 'Desti',
			  draggable: true,
			  icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
			 });
			 
			 
		//es recupera la direcció de la localització del dispositiu
		getAddress(myLatlng,0);
		getAddress(myLatlng,1);
			 
		google.maps.event.addListener(markerStart, 'dragend', function (event) {
			getAddress(event.latLng,0);
		});

		google.maps.event.addListener(markerFinish, 'dragend', function (event) {
			getAddress(event.latLng,1);
		});
	}
	
	//A partir d'una posició se'n determina l'adreça
	function getAddress(position,marker){
		var address;
		var reverseGeocoder = new google.maps.Geocoder();
		var currentPosition = position;
		reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {
	 				if (status == google.maps.GeocoderStatus.OK) {
						if (results[0]) {
							address = results[0].formatted_address;
							if(marker == 0){
								markerStartAddress=address;
							}else{
								markerFinishAddress=address;
							}
						}
				else {
						address = "";
						}
			} else {
				address = "";
			}
		});
	}


    function onError(error) {
        alert('No s\'ha pogut resoldre la ubicació actual');
    }
		
    function initialize() {
	}

	//Al prémer guardar s'obre la finestra d'estat passant les dades del nou enviament, 
	//només en el cas que les dades siguin vàlides
	function onSaveShipping(){
		var name =document.getElementById("name").value;
		var deliveryDate =document.getElementById("deliveryDate").value;
		var deliveryAddress =markerFinishAddress;
		var sendAddress =markerStartAddress;		

		var save = false;
		
		if(name!=null && name != "" &&
		deliveryDate!=null && deliveryDate != ""){
			save = true;
		}else{
			alert("S'han d'introduir totes les dades");
		}
		
		if(deliveryAddress==null || deliveryAddress == "" ||
		sendAddress==null || sendAddress==""){
			alert("S'han d'introduir direccions vàlides");
			save = false;
		}
		
		if(save){
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1;
			var yyyy = today.getFullYear();
			var todayStr = dd + "-" + mm + "-" + yyyy;
				
			window.open("state.html?name=" + name + "&deliveryDate=" + deliveryDate + "&deliveryAddress=" + deliveryAddress + "&sendingDate="+ todayStr + "&sendAddress="+ sendAddress);
		}
		
	}
	
	//Quan es fa "Tab" al quadre de data apareix un dialeg demanen una data en format correcte
	// si la introduïda no ho és, avisa a l'usuari i buida el camp
	function onInputClick(e){
		//data actual
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		
		var r = window.prompt("Introdueix una data (DD-MM-YYYY)", dd+"-"+mm+"-"+yyyy);
		if(/[\d]{1,2}-[\d]{1,2}-[\d]{4}/.test(r)){
			//date ok
			e.value=r;
			var split=e.value.split("-");
			
			var day =parseInt(split[0]);
			var month = parseInt(split[1]);
			var year = parseInt(split[2]);
			
			var data_invalida = false;
			if(day<dd | day>31) data_invalida=true;
			if(month<mm | month>12) data_invalida=true;
			if(year<yyyy) data_invalida=true;
						
			var date=new Date(parseInt(split[0]),parseInt(split[1]),parseInt(split[2]));
		}else{
			data_invalida=true;
		}
		
		if(data_invalida){
			alert("Data invàlida.");	
			document.getElementById("deliveryDate").value = "";
		}else{
			document.getElementById("deliveryDate").value = day+"-"+month+"-"+year;
		}
	}
	


	