var userPoolId = "us-west-2_U0pr265Bb";
var clientId ="80q3im5c1lk02g5b1vb38028d";

var poolData = { UserPoolId : userPoolId,
  ClientId : clientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

window.populate_published_routes=function()
{

  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'user1':userPool.getCurrentUser()['username']};

  var datapayload = JSON.stringify(data);

  const params = {
    FunctionName: "getfriends",
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
    user_list=[]
    if(returndata['final_status']!='nofriends')
    {
      user_list=returndata['requests']
      user_list.push(userPool.getCurrentUser()['username']);

    }
    else {
      user_list.push(userPool.getCurrentUser()['username']);

    }

    AWS.config = new AWS.Config();
    AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
    AWS.config.secretAccessKey = "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";
    AWS.config.update({region: "us-east-1"});

    const lambda = new AWS.Lambda();

    var data ={'users': user_list};

    var datapayload = JSON.stringify(data);

    const params = {
      FunctionName: "get_published_routes",
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
	    publish_routes= returndata['data'];
  	    console.log(returndata);
	    for(let i=0; i<publish_routes.length; i++){
		console.log(publish_routes[i]);
		var newDiv = document.getElementById("proutes");
		var div = document.createElement('div');
		div.className = "box";
		//Route Name
		var h3 = document.createElement('h3');
		var content = document.createTextNode(publish_routes[i]['route_name']);
		h3.appendChild(content);
		div.appendChild(h3);
		//status
		var h4 = document.createElement('h4');
		var content=  document.createTextNode(publish_routes[i]['publish_status']);
		h4.appendChild(content);
		div.appendChild(h4);
		//username
		var h5 = document.createElement('h5');
		var content=  document.createTextNode(publish_routes[i]['username']);
		h5.appendChild(content);
		div.appendChild(h5);
		//Routes
		var routes = publish_routes[i]['route'];
		for( let j=1; j<routes.length+1 ; j++){
			var p = document.createElement('p');
			var x= "Stop "+j+": "+ routes[j-1] +"\n";
			var content=  document.createTextNode(x);
			p.appendChild(content);
			div.appendChild(p);

		}
		//button
		var input = document.createElement("input");
		    input.type = "button";
		    input.value = "view map";
		    input.addEventListener("click",() => {
			window.localStorage.setItem("show_published", String(1));
      window.sessionStorage.setItem('route_name1',publish_routes[i]['route_name']);
      window.location.href = "./GoogleMaps/index.html";
		    });
		div.appendChild(input);
    newDiv.appendChild(div);



            }

        }
    });


      }
  });
}
