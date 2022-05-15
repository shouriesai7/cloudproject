var userPoolId = "us-west-2_U0pr265Bb";
var clientId ="80q3im5c1lk02g5b1vb38028d";

var poolData = { UserPoolId : userPoolId,
  ClientId : clientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);


window.set_info =function()
{
  var div1=document.getElementById("name_div");
  div1.innerHTML=userPool.getCurrentUser()['username'];
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
//AWS.config.credentials.get(function(err) {
//  if (!err) {
  //  var id = AWS.config.credentials.identityId;
  //}
//});

function opentab(tabname) {
  //for (i = 0; i < 4; i++) {
  //  var name= "tab"+i;
  //  closetab(name);
  //}
  document.getElementById(tabname).removeAttribute("style");
}

var myfunc = function( val){
 document.getElementById(val).style.backgroundColor="purple";
};
function closetab(name){
	document.getElementById(name).style.display = "none";
}
