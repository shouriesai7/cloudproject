var userPoolId = "us-west-2_U0pr265Bb";
var clientId ="80q3im5c1lk02g5b1vb38028d";

var poolData = { UserPoolId : userPoolId,
  ClientId : clientId
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var routes_data;
var published_route_data;
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
	  routes_data = returndata;
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
          console.log(returndata);
      }
  });


  var recom_res_check=window.localStorage.getItem("recom_res")
  if(parseInt(recom_res_check))
  {
    window.localStorage.setItem("recom_res", String(0));
    res1=window.sessionStorage.getItem("recom_res1");
    res2=window.sessionStorage.getItem("recom_res2");
    res3=window.sessionStorage.getItem("recom_res3");
    res=[res1,res2,res3]
    window.sessionStorage.clear();
    calculateAndDisplayRoute4(directionsService, directionsRenderer,res,myLatLng);

  }


  var show_published=window.localStorage.getItem("show_published")
  if(parseInt(show_published))
  {
    window.localStorage.setItem("show_published", String(0));
    var nameroute = window.sessionStorage.getItem('route_name1');
    const AWS = require("aws-sdk");
    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
    AWS.config.secretAccessKey = "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";
    AWS.config.update({region: "us-east-1"});

    const lambda = new AWS.Lambda();

    var data ={ 'routename': nameroute };

    var datapayload = JSON.stringify(data);

    const params = {
      FunctionName: "query_published_route",
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
            published_route_data=returndata;
            calculateAndDisplayRoute3(directionsService, directionsRenderer,published_route_data['routelist']);
        }
    });



  }


  document.getElementById("submit2").addEventListener("click", () => {
          calculateAndDisplayRoute2(directionsService, directionsRenderer,routes_data);
        });

      document.getElementById("route_publish").addEventListener("click", () => {
                publish_routes(directionsService, directionsRenderer,routes_data);
              });
}



window.publish_routes= function(directionsService, directionsRenderer,data)
{
  var select_saved_route=document.getElementById('saved_routes');
  var selected_option = select_saved_route.options[select_saved_route.selectedIndex].text;
  console.log(data['routes'][selected_option]);
  var route_status=prompt("Enter Status",'');

  var username=userPool.getCurrentUser()['username'];
  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'username': username,
              'route':data['routes'][selected_option],
              'routename':selected_option,
              'status':route_status  };

  var datapayload = JSON.stringify(data);

  const params = {
    FunctionName: "save_publish_route",
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

window.save_routes =function()
{
  var username=userPool.getCurrentUser()['username'];
  var route_name=prompt("Enter Route Name",'');
  route_name=route_name.trim();
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
	  refresh_saveroutes();
	  var select_saved_route=document.getElementById('saved_routes');
	  var option = new Option(route_name,route_name);
	  console.log(route_name);
	  select_saved_route.appendChild(option);

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
function refresh_saveroutes(){
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
    console.log("yes");
  lambda.invoke(params, function(error, data) {
      if (error) {
          console.log(error);
      }
      else {
          routes_data = JSON.parse(data.Payload);

      	}

  });

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
    travelMode: google.maps.TravelMode['BICYCLING'],
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

function calculateAndDisplayRoute3(directionsService, directionsRenderer,data){



  console.log(data)



  if(data.length>1){
  let saved_route1 = {
    origin: data[0],
    destination: data[data.length-1],
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode['BICYCLING'],
  };
  if(data.length>2)
  {
    var waypoint_list=[];
    for (let i = 1; i < data.length-1; i++)
    {
      var dict = {};
      dict["location"]=data[i];
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


function calculateAndDisplayRoute4(directionsService, directionsRenderer,res,myLatLng){





console.log("ababbadssdsd")


  let saved_route1 = {
    origin: myLatLng,
    destination: res[2],
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode['BICYCLING'],
  };

    var waypoint_list=[];
    for (let i = 1; i < 3; i++)
    {
      var dict = {};
      dict["location"]=res[i-1];
      dict["stopover"]=true;
      waypoint_list.push(dict);
    }
    saved_route1['waypoints']=waypoint_list;




  directionsService
  .route(saved_route1)
  .then((response) => {
    directionsRenderer.setDirections(response);
  })
  .catch((e) => console.log(e));


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
