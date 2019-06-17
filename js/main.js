    
       var pos;
       var map;
       var directionsDisplay;
       var directionsService;
       var destinations = {
       googleDublin: {lat:53.340160, lng: -6.236460},
       googleLondon : {lat:51.515580,lng: -0.128230},
       buckinghamPalace : {lat:51.494930,lng: -0.146190},
       kfcDublin : {lat:53.326700,lng: -6.313410 }
     }
  navigator.geolocation.getCurrentPosition(function(position) {
             pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            initMap();
          });
     var destinations = {
       googleDublin: {lat:53.340160, lng: -6.236460},
       googleLondon : {lat:51.515580,lng: -0.128230},
       buckinghamPalace : {lat:51.494930,lng: -0.146190},
       kfcDublin : {lat:53.326700,lng: -6.313410 }
     }
     var selectedDestination;
     selectedDestination = destinations.googleDublin;

     function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: {lat: pos.lat, lng: pos.lng}
        });
        
        directionsDisplay = new google.maps.DirectionsRenderer();
        directionsService = new google.maps.DirectionsService();

        directionsDisplay.setMap(map);
        
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay,pos);
        });
        document.getElementById('destination').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay,pos);
        });
        calculateAndDisplayRoute(directionsService, directionsDisplay,pos)
      }

      function calculateAndDisplayRoute(directionsService, directionsDisplay,pos) {
        var selectedDest = document.getElementById('destination').value;
        var dest;
 
        if(selectedDest == 'Google Dublin'){
          dest = destinations.googleDublin;
        }
        if(selectedDest == 'Buckingham Palace'){
          dest = destinations.buckinghamPalace;
        }
        if(selectedDest == 'Google London'){
          dest = destinations.googleLondon;
        }
        if(selectedDest == 'KFC Dublin'){
          dest = destinations.kfcDublin;
        }
        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: {lat: pos.lat, lng: pos.lng},
         destination: {lat:dest.lat, lng: dest.lng}, 

          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }
