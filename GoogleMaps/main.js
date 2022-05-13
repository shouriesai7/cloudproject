function initMap(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  myLatLng = {
                lat: latitude,
                lng: longitude
  };
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const directionsService = new google.maps.DirectionsService();
  const map = new google.maps.Map(document.getElementById("map"),{
    zoom: 14,
    center: myLatLng,
  });

  directionsRenderer.setMap(map);
  //calculateAndDisplayRoute(directionsService, directionsRenderer);
  createDestinationBox(1);

  document.getElementById("submit").addEventListener("click", () => {
    calculateAndDisplayRoute(directionsService, directionsRenderer,myLatLng);
  });
  document.getElementById("type").addEventListener("change", () => { 
     console.log(document.getElementById("type").value);
     createDestinationBox(document.getElementById("type").value);
  });

}
function calculateAndDisplayRoute(directionsService, directionsRenderer,myLatLng) {
  const selectedMode = document.getElementById("mode").value;
  const selectedStop = document.getElementById("type").value;
  const waypoints = [];
  for (var i=0; i < selectedStop;i++){
  	var name = "to"+i;
	console.log(document.getElementById(name).value);
	waypoints.push({
        location: document.getElementById(name).value,
        stopover: true
      });
  }
  directionsService
  .route({
    origin: myLatLng,
    destination:myLatLng,
    waypoints: waypoints,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode[selectedMode],
  })
  .then((response) => {
    directionsRenderer.setDirections(response);
  })
  .catch((e) => console.log(e));
}

function geoError() {
            alert("Geocoder failed.");
        }

function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(initMap, geoError);
                // alert("Geolocation is supported by this browser.");
            } else {
                alert("Geolocation is not supported by this browser.");
            }
}
function createDestinationBox(number){
	var newDiv = document.getElementById("destination");
  	if(typeof(newDiv) != 'undefined' && newDiv != null){
  		while (newDiv.firstChild) {
    			newDiv.removeChild(newDiv.firstChild);
  		}
	}		
	for (var i=0; i<number; i++){
		var newDiv =document.getElementById("destination");
		var input_name = "input"+i;
		console.log(input_name)
		var div = document.createElement("div");
		var input = document.createElement("input");
		input.type= "text";
		input.id = "to"+i;
		input.placeholder="Destination";
		div.appendChild(input)
		console.log(i);
		var result=document.getElementById("destination").appendChild(div);
      		console.log(result);
	}
}
