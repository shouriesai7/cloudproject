var userPoolId = "us-west-2_U0pr265Bb";
var clientId ="80q3im5c1lk02g5b1vb38028d";

var poolData = { UserPoolId : userPoolId,
  ClientId : clientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

window.populate_with_friend=function()
{
  var friendname = window.sessionStorage.getItem('friend_name');
  var friendemail = window.sessionStorage.getItem('friend_email');


  var namefriend=document.getElementById("name_div_f");
  var emailfriend=document.getElementById("email_div_f");

  namefriend.innerHTML=friendname;
  emailfriend.innerHTML=friendemail;

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
