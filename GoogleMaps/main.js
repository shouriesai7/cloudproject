var userPoolId = "us-west-2_U0pr265Bb";
var clientId ="80q3im5c1lk02g5b1vb38028d";

var poolData = { UserPoolId : userPoolId,
  ClientId : clientId
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

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



  var username=userPool.getCurrentUser()['username'];
  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'username': username};

  var datapayload = JSON.stringify(data);

  const params = {
    FunctionName: "get_saved_routes",
    InvocationType: "RequestResponse",
    Payload: datapayload,
      LogType: 'None'
  };
  var returndata;
  console.log("yes");
  lambda.invoke(params, function(error, data) {
      if (error) {
          console.log(error);
      }
      else {
          returndata = JSON.parse(data.Payload);
          var select_saved_route=document.getElementById('saved_routes');
          for (let route in returndata['routes']) {
            console.log(returndata['routes'][route])


          var newoption = document.createElement("option");
          newoption.innerHTML = route;
          //var br = document.createElement("br");
          //select_saved_route.appendChild(br);
          newoption.setAttribute("id", route);
          select_saved_route.appendChild(newoption);
        }
        document.getElementById("submit2").addEventListener("click", () => {
          calculateAndDisplayRoute2(directionsService, directionsRenderer,returndata);
        });
          console.log(returndata);
      }
  });




}

window.save_routes =function()
{
  var username=userPool.getCurrentUser()['username'];
  var route_name=prompt("Enter Route Name",'');
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
  console.log(waypoints[0]['location'])
  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'username': username,
              'routename':route_name,
              'destination_dictionary':waypoints};

  var datapayload = JSON.stringify(data);

  const params = {
    FunctionName: "fromnodejs",
    InvocationType: "RequestResponse",
    Payload: datapayload,
      LogType: 'None'
  };
  var returndata;
  console.log("yes");
  lambda.invoke(params, function(error, data) {
      if (error) {
          console.log(error);
      }
      else {
          returndata = JSON.parse(data.Payload);
          console.log(returndata);
      }
  });
}

window.calculateAndDisplayRoute =function(directionsService, directionsRenderer,myLatLng){
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

  if (waypoints.length == 1) {
      var waypoints2 = null;

  }
  else {
      var waypoints2 = waypoints.slice(0,-1);
  };



  directionsService
  .route({
    origin: myLatLng,
    destination:waypoints[waypoints.length-1].location,
    waypoints: waypoints2,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode[selectedMode],
  })
  .then((response) => {
    directionsRenderer.setDirections(response);
  })
  .catch((e) => console.log(e));
}

window.create_dropdown= function()
{

  //route_list={'route1':['Kingsbrook Jewish Medical Center 585 Schenectady Ave Brooklyn, NY 11203','Brooklyn Children\'s Museum 145 Brooklyn Ave'],'route2':['Weeksville Heritage Center 158 Buffalo Ave Brooklyn, NY 11213','Brookdale University Hospital Medical Center 1 Brookdale Plaza']}


}

function calculateAndDisplayRoute2(directionsService, directionsRenderer,data){


  // hardcoded route
  console.log(data)
  var select_saved_route=document.getElementById('saved_routes');
  var selected_option = select_saved_route.options[select_saved_route.selectedIndex].text;
  console.log(selected_option)
  if(data['routes'][selected_option].length>1){
  let saved_route1 = {
    origin: data['routes'][selected_option][0],
    destination: data['routes'][selected_option][data['routes'][selected_option].length-1],
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode['WALKING'],
  };
  if(data['routes'][selected_option].length>2)
  {
    var waypoint_list=[];
    for (let i = 1; i < data['routes'][selected_option].length-1; i++)
    {
      var dict = {};
      dict["location"]=data['routes'][selected_option][i];
      dict["stopover"]=true;
      waypoint_list.push(dict);
    }
    saved_route1['waypoints']=waypoint_list;
  }



  directionsService
  .route(saved_route1)
  .then((response) => {
    directionsRenderer.setDirections(response);
  })
  .catch((e) => console.log(e));

}
}



function geoError() {
            alert("Geocoder failed.");
        }
window.getLocation =function()
{
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
