
$(document).ready(function() {
	 var itm = '';






    (function getGeoLocation(){
		  
		if (navigator.geolocation){

			navigator.geolocation.getCurrentPosition(function(position){
				var lat = position.coords.latitude;
                var long = position.coords.longitude;
				
				//get location
				getLocationName(lat,long);
				
				//get coffee
				getCoffee (lat,long);
				console.log(position);

			});
		}else{
			alert("Your browser doesn't support Geolocation !");
		}
	}) ();
	
	function getLocationName(lat,long){	
		$.ajax({
			type: 'GET',
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&key=AIzaSyCDSO9ygTC_qmhoiKiWky9TQR7MT8AU25I',
			success: function(data){
				console.log(data);
				var placeName = data.results[1].formatted_address
				$("#location").append(placeName);
			}
		});
	}	

	function getCoffee(lat,long){
		$.ajax({
			type: 'GET',
			dataType: "json",
			url: 'https://api.foursquare.com/v2/venues/explore?client_id=KWKGYHXL2IGHDM2KVPEXUOJIABE3G1IW3W1SMB42HSS531BW&client_secret=0WYRHOQ0EQQDUT2V12SPGZ1TIFTRCNVPWVYRO23JXPM1U1J3&v=20130815&ll='+lat+','+long+'&llAcc=1000.0&radius=1000&section=coffee&venuePhotos=1&limit=10',
			success: function(data2){
				console.log(data2);
				
				var coffeePlaces = data2.response.groups[0].items
				
				//loop method
				//l = coffeePlaces.length
/*				for (var i=0; i<l;i++)
				{
					var coffeeName = coffeePlaces[i].venue.name
					var coffeeAddress = coffeePlaces[i].venue.location.address
					var coffeeDistance = coffeePlaces[i].venue.location.distance
					var coffeeRating = coffeePlaces[i].venue.rating
					//console.log(coffeePlaces[i].venue.name)
					var source   = $("#entry-template").html();
					var template = Handlebars.compile(source);
				    var context = {
					   storetitle: coffeeName, 
					   storeaddress: coffeeAddress,
					   storedistance: coffeeDistance,
					   storerating: coffeeRating
					   };
				    var html    = template(context);
				   
				    $(template(context)).appendTo('#store-results-right');
					
					
				}
	*/			

				
				//each method
				$.each(coffeePlaces, function(index, element){
					
					var coffeeName = element.venue.name
					var coffeeAddress = element.venue.location.address
					var coffeeDistance = element.venue.location.distance
					var coffeeRating = element.venue.rating
					//console.log(coffeePlaces[i].venue.name)
					var source   = $("#entry-template").html();
					var template = Handlebars.compile(source);
				    var context = {
					   storetitle: coffeeName, 
					   storeaddress: coffeeAddress,
					   storedistance: coffeeDistance,
					   storerating: coffeeRating
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