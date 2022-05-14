var userPoolId = "us-west-2_U0pr265Bb";
var clientId ="80q3im5c1lk02g5b1vb38028d";

var poolData = { UserPoolId : userPoolId,
  ClientId : clientId
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

window.populate_res =function(data)
{
  data=data.split("/");
  window.localStorage.clear();
  window.localStorage.setItem("restaurant_name", data[0]);
  window.localStorage.setItem("restaurant_rating", data[1]);
  window.localStorage.setItem("restaurant_Address", data[2]);
  window.localStorage.setItem("cuisine_type", data[3]);
  window.location.href = "Restaurant.html"
}

window.populate_with_res =function()
{
  var resname = window.localStorage.getItem('restaurant_name');
  var resrating = window.localStorage.getItem('restaurant_rating');
  var resaddress = window.localStorage.getItem('restaurant_Address');
  var rescuisine = window.localStorage.getItem('cuisine_type');
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
else {
  if (document.contains(document.getElementById("restaurant_list_div"))) {
            document.getElementById("restaurant_list_div").remove();
}
}
}

function forgot_password()
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

function login(){
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
function register(){
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
