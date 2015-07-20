var app = angular.module('GoFindCoffee', []);

app.service('DataService', function($http) {

    this.getLocationName = function(lat, long) {
        return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            lat + ',' + long + '&key=AIzaSyCDSO9ygTC_qmhoiKiWky9TQR7MT8AU25I');
    };

    this.getWeather = function(lat, long) {
        return $http.jsonp('https://api.forecast.io/forecast/52c45da6ca60bbe55c46be1f482c7281/' +
            lat + ',' + long + '?units=si&callback=JSON_CALLBACK');
    }

    this.getCoffee = function(lat, long) {
        return $http.get('https://api.foursquare.com/v2/venues/explore?client_id=KWKGYHXL2IGH' +
            'DM2KVPEXUOJIABE3G1IW3W1SMB42HSS531BW&client_secret=0WYRHOQ0EQQDUT2V12SPGZ1TIFTRC' +
            'NVPWVYRO23JXPM1U1J3&v=20130815&ll=' + lat + ',' + long + '&llAcc=1000.0&radius=7' +
            '00&section=coffee&venuePhotos=1&limit=10');
    }

    return this;
});

app.controller('MainController', function($scope, $q, DataService) {

    $scope.init = function() {

        if (typeof navigator !== 'undefined' && typeof navigator.geolocation !== undefined) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var lat = position.coords.latitude;
                var long = position.coords.longitude;

                var locationPromise = DataService.getLocationName(lat, long);
                var weatherPromise = DataService.getWeather(lat, long);
                var coffeePromise = DataService.getCoffee(lat, long);

                $scope.loading = true;
                $q.all([locationPromise, weatherPromise, coffeePromise])
                    .then(function(data) {
                        $scope.location = data[0].data.results[0] || '';
                        $scope.weather = data[1].data;
                        $scope.stores = data[2].data.response.groups[0].items || [];
                        console.log($scope);
                    }, function() {
                        alert('Failed to get the information you need!');
                    })
                    .finally(function() {
                        $scope.loading = false;
                    });
			});
		} else {
			alert('Your browser doesn\'t support Geolocation!');
		}
    };

    $scope.init();
});
