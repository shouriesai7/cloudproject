var userPoolId = "us-west-2_U0pr265Bb";
var clientId ="80q3im5c1lk02g5b1vb38028d";

var poolData = { UserPoolId : userPoolId,
  ClientId : clientId
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);



 window.recom_res=function(data)
 {
   data=data.split("*");
   window.sessionStorage.clear();
   window.sessionStorage.setItem("recom_res1", data[0]);
   window.sessionStorage.setItem("recom_res2", data[1]);
   window.sessionStorage.setItem("recom_res3", data[2]);
   window.localStorage.setItem("recom_res", String(1));
   window.location.href = "./GoogleMaps/index.html";

 }

window.populate_friend=function(data)
{
  data=data.split("/");
  window.sessionStorage.clear();
  window.sessionStorage.setItem("friend_name", data[0]);
  window.sessionStorage.setItem("friend_email", data[1]);
  window.location.href = "friend.html"
}

window.populate_res =function(data)
{
  data=data.split("/");
  window.sessionStorage.clear();
  window.sessionStorage.setItem("restaurant_name", data[0]);
  window.sessionStorage.setItem("restaurant_rating", data[1]);
  window.sessionStorage.setItem("restaurant_Address", data[2]);
  window.sessionStorage.setItem("cuisine_type", data[3]);
  window.location.href = "Restaurant.html"
}

window.populate_with_res =function()
{
  var resname = window.sessionStorage.getItem('restaurant_name');
  var resrating = window.sessionStorage.getItem('restaurant_rating');
  var resaddress = window.sessionStorage.getItem('restaurant_Address');
  var rescuisine = window.sessionStorage.getItem('cuisine_type');
  console.log(resname)
  var res_name=document.getElementById("res_name");
  //var res_rating=document.getElementById("restaurant_rating");
  var res_address=document.getElementById("res_Address");
  var res_cuisine=document.getElementById("res_cuisine");
  res_name.innerHTML=resname;
  res_address.innerHTML=resaddress;
  res_cuisine.innerHTML=rescuisine;
}

window.on_select =function(select){
if(select.options[select.selectedIndex].id == "select_restaurant")
{

  if (document.contains(document.getElementById("restaurant_list_div"))) {
            document.getElementById("restaurant_list_div").remove();}

  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-west-2"});

  const lambda = new AWS.Lambda();

  var data ={ 'key': "value" };

  var datapayload = JSON.stringify(data);

  const params = {
    FunctionName: "from_nodejs",
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
          var div = document.createElement('div');
          div.setAttribute("id", "restaurant_list_div");
          div.setAttribute('class', 'dynamic_list');
          document.body.appendChild(div);
          for (let i=0; i < returndata.length; i++) {

            var newlabel = document.createElement("a");
            newlabel.innerHTML = returndata[i]['name'];
            var br = document.createElement("br");
            div.appendChild(br);
            newlabel.setAttribute("id", returndata[i]['name']);
            var string1 = returndata[i]['name']+'/'+returndata[i]['rating']+'/'+returndata[i]['address']+'/'+returndata[i]['cuisine_type'];
            newlabel.setAttribute('onclick', 'populate_res( " '+string1+' " )');
            div.appendChild(newlabel);

  }

      }
  });
}
else if(select.options[select.selectedIndex].id == "select_friends")
{
  if (document.contains(document.getElementById("restaurant_list_div"))) {
            document.getElementById("restaurant_list_div").remove(); }


            const AWS = require("aws-sdk");
            AWS.config = new AWS.Config();
            AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
            AWS.config.secretAccessKey = "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";
            AWS.config.update({region: "us-east-1"});

            const lambda = new AWS.Lambda();

            var data ={ 'key': "value" };

            var datapayload = JSON.stringify(data);

            const params = {
              FunctionName: "get_users",
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
                    user_list=returndata['users'];

                    var div = document.createElement('div');
                    div.setAttribute("id", "restaurant_list_div");
                    div.setAttribute('class', 'dynamic_list');
                    document.body.appendChild(div);
                    for (let i=0; i < user_list.length; i++) {
                      console.log(user_list[i]['username']);
                      var newlabel = document.createElement("a");
                      newlabel.innerHTML = user_list[i]['username'];
                      var br = document.createElement("br");
                      div.appendChild(br);
                      newlabel.setAttribute("id", user_list[i]['username']);
                      var string1 = user_list[i]['username']+'/'+user_list[i]['useremail'];
                      newlabel.setAttribute('onclick', 'populate_friend( " '+string1+' " )');
                      div.appendChild(newlabel);

           }

                }
            });
}


else if(select.options[select.selectedIndex].id == "select_crawl"){

  if (document.contains(document.getElementById("restaurant_list_div"))) {
            document.getElementById("restaurant_list_div").remove();}


            const AWS = require("aws-sdk");
            AWS.config = new AWS.Config();
            AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
            AWS.config.secretAccessKey = "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";
            AWS.config.update({region: "us-east-1"});

            const lambda = new AWS.Lambda();

            var data ={ 'username':userPool.getCurrentUser()['username']};

            var datapayload = JSON.stringify(data);

            const params = {
              FunctionName: "restaurant_recommender",
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
                    var res1=returndata['results1'];
                    var res2=returndata['results2'];
                    var res3=returndata['results3'];
                    var div = document.createElement('div');
                    div.setAttribute("id", "restaurant_list_div");
                    div.setAttribute('class', 'dynamic_list');
                    document.body.appendChild(div);

                      var newlabel1 = document.createElement("a");
                      newlabel1.innerHTML = res1[0][0]+","+res1[1][0]+","+res1[2][0];
                      var br1 = document.createElement("br");
                      div.appendChild(br1);
                      newlabel1.setAttribute("id", "one");
                      var string1 = res1[0][1]+'*'+res1[1][1]+'*'+res1[2][1];
                      newlabel1.setAttribute('onclick', 'recom_res( " '+string1+' " )');
                      div.appendChild(newlabel1);


                      var newlabel2 = document.createElement("a");
                      newlabel2.innerHTML = res2[0][0]+","+res2[1][0]+","+res2[2][0];
                      var br2 = document.createElement("br");
                      div.appendChild(br2);
                      newlabel2.setAttribute("id", "two");
                      var string2 = res2[0][1]+'*'+res2[1][1]+'*'+res2[2][1];
                      newlabel2.setAttribute('onclick', 'recom_res( " '+string2+' " )');
                      div.appendChild(newlabel2);

                      var newlabel3 = document.createElement("a");
                      newlabel3.innerHTML = res3[0][0]+","+res3[1][0]+","+res3[2][0];
                      var br3 = document.createElement("br");
                      div.appendChild(br3);
                      newlabel3.setAttribute("id", "three");
                      var string3 = res3[0][1]+'*'+res3[1][1]+'*'+res3[2][1];
                      newlabel3.setAttribute('onclick', 'recom_res( " '+string3+' " )');
                      div.appendChild(newlabel3);









                }
            });




}
else {
  if (document.contains(document.getElementById("restaurant_list_div"))) {
            document.getElementById("restaurant_list_div").remove();}

}
}

window.forgot_password =function()
{
  var username = document.getElementById("forgot_password_username").value;

  var userData = {
    Username : username,
    Pool : userPool
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  // call forgotPassword on cognitoUser
  cognitoUser.forgotPassword({
      onSuccess: function(result) {
          console.log('call result: ' + result);
      },
      onFailure: function(err) {
          alert(err);
      },
      inputVerificationCode() { // this is optional, and likely won't be implemented as in AWS's example (i.e, prompt to get info)
          var verificationCode = prompt('Please input verification code ', '');
          var newPassword = prompt('Enter new password ', '');
          cognitoUser.confirmPassword(verificationCode, newPassword,{
    onFailure(err) {
        console.log(err);
    },
    onSuccess() {
        console.log("Success");
        alert('Successfully Changed Password');
        window.location.href = "index.html";
    },
});
      }
  });

}

 window.login =function(){
  console.log("Success go to JS");
  var username = document.getElementById("username").value;
  var authenticationData = {
    Username: username,
    Password: document.getElementById("password").value
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

  var userData = {
    Username : username,
    Pool : userPool
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  console.log(cognitoUser);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();
      console.log('Authentication successful', accessToken);
      window.location = './mainpage.html';
    },

    onFailure: function(err) {
      console.log('failed to authenticate');
      console.log(JSON.stringify(err));
      alert('Failed to Log in.\nPlease check your credentials.');
    },
  });
}

window.register =function(){
	console.log("Success go to JS");
	var username = document.getElementById("usernamer").value;
	console.log(username);

	var email = document.getElementById("email").value;
	if(document.getElementById("passwordr").value != document.getElementById("rpassword").value ){
		alert('Password does not match!');
	}
	else{
		password = document.getElementById("rpassword").value;
	}

	var attributeList= [
  	new AmazonCognitoIdentity.CognitoUserAttribute({
    	Name: 'email',
    	Value: email
   	})
  	];
	userPool.signUp(username, password, attributeList, null, function(err, result){
       if (err) {
        console.log(err);
        returnData = { 'result ' : 'fail', 'data' : err.message}
       }
       else
       {
	console.log(result);
        returnData = { 'result ' : 'success', 'data' : result.user}
	window.location = "./comfirmation.html"
       }
      });
}



window.search= function(){
	var searchtext = document.getElementById("searchtxt").value;
	console.log(searchtext);
	var type = document.getElementById("type").value;
	console.log(type);
	const AWS = require("aws-sdk");
  	AWS.config = new AWS.Config();
  	AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  	AWS.config.secretAccessKey = "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";
  	AWS.config.update({region: "us-west-2"});

  	const lambda = new AWS.Lambda();

  	var data ={ 'searchkey': searchtext,
		    'type':type};

  	var datapayload = JSON.stringify(data);

  	const params = {
    		FunctionName: "get_Restaurants",
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
			if (document.contains(document.getElementById("restaurant_list_div"))) {
            			document.getElementById("restaurant_list_div").remove();
			}

                    returndata = JSON.parse(data.Payload);
                    console.log(returndata);
			if(type == "restaurant"){
				returndata = returndata['body'];

				var div = document.createElement('div');
          			div.setAttribute("id", "restaurant_list_div");
          			div.setAttribute('class', 'dynamic_list');
          			document.body.appendChild(div);
          			for (let i=0; i < returndata.length; i++) {
            				var newlabel = document.createElement("a");
            				newlabel.innerHTML = returndata[i]['name'];
            				var br = document.createElement("br");
            				div.appendChild(br);
            				newlabel.setAttribute("id", returndata[i]['name']);
            				var string1 = returndata[i]['name']+'/'+returndata[i]['rating']+'/'+returndata[i]['address']+'/'+returndata[i]['cuisine_type'];
        	    			newlabel.setAttribute('onclick', 'populate_res( " '+string1+' " )');
	            			div.appendChild(newlabel);
  				}

			}
			else if(type == "friend"){
				user_list=returndata['body']['Items'];

                   		var div = document.createElement('div');
                    		div.setAttribute("id", "restaurant_list_div");
                    		div.setAttribute('class', 'dynamic_list');
                    		document.body.appendChild(div);
                    		for (let i=0; i < user_list.length; i++) {
                      			console.log(user_list[i]['username']);
                      			var newlabel = document.createElement("a");
                      			newlabel.innerHTML = user_list[i]['username'];
                      			var br = document.createElement("br");
                      			div.appendChild(br);
                      			newlabel.setAttribute("id", user_list[i]['username']);
                      			var string1 = user_list[i]['username']+'/'+user_list[i]['useremail'];
                      			newlabel.setAttribute('onclick', 'populate_friend( " '+string1+' " )');
                      			div.appendChild(newlabel);
			}

		}
		}

	});

}
