
$(document).ready(function() {
	
	//Animate background color
	/*
	setInterval(function(){
		var theColors = ['#ef008c', '#00be59', '#654b9e', '#ff5432', '#00d8e6'];
		//var theColor = theColors[Math.floor(Math.random()*theColors.length)];
		$.each(theColors, function(index, color){
			$('body').animate({backgroundColor: color}, 8000);
			});
	},8000);
	*/
	
    (function getGeoLocation(){		  
		if (navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				var lat = position.coords.latitude;
                var long = position.coords.longitude;	
				//get location
				getLocationName(lat,long);
				//get Weather
				getWeather(lat, long);
				//get coffee
				getCoffee (lat,long);
			});
		}else{
			alert("Your browser doesn't support Geolocation !");
		}
	}) ();
	
	//Get location from google API
	function getLocationName(lat,long){	
		$.ajax({
			type: 'GET',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyCDSO9ygTC_qmhoiKiWky9TQR7MT8AU25I',
			success: function(data){
				console.log(data);

				var placeName = data.results[0].formatted_address
				var streetNo = data.results[0].address_components[0].short_name
				var streetName = data.results[0].address_components[1].short_name
				var surburbName = data.results[0].address_components[2].short_name
				var stateName = data.results[0].address_components[3].short_name
				var stateNo = data.results[0].address_components[5].short_name
				var address = "";
				
				(function getAddress(){
					address += streetNo +' ';
					address += streetName +', ';
					address += surburbName +' ';
					address += stateName +' ';
					address += stateNo;
				})();
				
				
				$("#location, #location2").append(address);
				
			}
		});
	}	

	//Get weather from forecast.io
	function getWeather(lat,long){
		$.ajax({
			type: 'GET',
			dataType:"jsonp",
			url: 'https://api.forecast.io/forecast/52c45da6ca60bbe55c46be1f482c7281/'+lat+','+long+'?units=si',
			success: function(data){
				console.log(data);
				var temperature = data.currently.temperature
				var temperaturew = Math.round(temperature*10)/10
				var weather = data.currently.summary
				$("#currenttmp, #currenttmp2").append(temperaturew);
				$("#currentwht, #currentwht2").append(weather);
			}
		});
	}
	
	//Get coffee from foresquare api
	function getCoffee(lat,long){
		$.ajax({
			type: 'GET',
			dataType: "json",
			url: 'https://api.foursquare.com/v2/venues/explore?client_id=KWKGYHXL2IGHDM2KVPEXUOJIABE3G1IW3W1SMB42HSS531BW&client_secret=0WYRHOQ0EQQDUT2V12SPGZ1TIFTRCNVPWVYRO23JXPM1U1J3&v=20130815&ll='+lat+','+long+'&llAcc=1000.0&radius=800&section=coffee&venuePhotos=1&limit=7',
			success: function(data2){
				console.log(data2);
				
				var coffeePlaces = data2.response.groups[0].items

				//each method
				$.each(coffeePlaces, function(index, element){
					var coffeeName = element.venue.name
					var coffeeStreet = element.venue.location.formattedAddress[0]
					var coffeeSurburb = element.venue.location.formattedAddress[1]
					var coffeeDistance = element.venue.location.distance
					var coffeeRating = element.venue.rating
					var coffeeLat = element.venue.location.lat
					var coffeeLng = element.venue.location.lng
					var source   = $("#store-template").html();
					var template = Handlebars.compile(source);
				    var context = {
					   storetitle: coffeeName, 
					   storestreet: coffeeStreet,
					   storesurburb: coffeeSurburb,
					   storedistance: coffeeDistance,
					   storerating: coffeeRating,
					   coffeelat: coffeeLat,
					   coffeelng: coffeeLng
					   };
				    var html    = template(context);
				   
				    $('#location-content').append(template(context));
				})
				
				$('.store-results').each(function(i) {
					  $(this).delay( i * 800 ).fadeIn( 1600 );
				 });	
			}
		});
	}
});