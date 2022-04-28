var userPoolId = "us-west-2_U0pr265Bb";
var clientId ="80q3im5c1lk02g5b1vb38028d";

var poolData = { UserPoolId : userPoolId,
  ClientId : clientId
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

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
      window.location = './index.html';
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
	var username = document.getElementById("username").value;
	console.log(username);

	var email = document.getElementById("email").value;
	if(document.getElementById("password").value != document.getElementById("rpassword").value ){
		console.log(document.getElementById("password").value);
		console.log(document.getElementById("rpassword").value);
		alert('Password does not match!');
	}
	else{
		password = document.getElementById("rpassword").value;
	}
	password = document.getElementById("rpassword").value;
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
       }
      });
}

