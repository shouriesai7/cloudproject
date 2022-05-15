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
  console.log(userPool.getCurrentUser()['username'])
  console.log(friendname);
  if(friendname.trim()==userPool.getCurrentUser()['username'].trim())
  {
    console.log(userPool.getCurrentUser()['username'])
    console.log(friendname);
    window.location.href = "profile.html";
  }

  var namefriend=document.getElementById("name_div_f");
  var emailfriend=document.getElementById("email_div_f");

  namefriend.innerHTML=friendname;
  emailfriend.innerHTML=friendemail;






  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'user1': userPool.getCurrentUser()['username'],
              'user2':document.getElementById('name_div_f').textContent,
              'status':'check_status'
                };

  var datapayload = JSON.stringify(data);

  const params = {
    FunctionName: "friends",
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
          var status=returndata['final_status'];
          console.log(status);
          var friend_button=document.getElementById('add_remove');

          if(status=="no_connection")
          {
              friend_button.innerHTML="ADD";
          }
          else if(status=="friends")
          {
            friend_button.innerHTML="Remove Friend";
          }
          else if(status=="user1_request")
          {
            friend_button.innerHTML="Request Sent";
          }
          else {
            friend_button.innerHTML="ADD BACK";
            var friend_button2=document.createElement("button");
            friend_button2.innerHTML = "Reject Request";
            friend_button2.type = "button";
            friend_button2.className = "btn";
            friend_button2.setAttribute("id","second_friend_button");
            friend_button2.className += "btn-primary"
            friend_button2.className += "btn-lg"
            friend_div=document.getElementById('friend_button_div')
            friend_div.appendChild(friend_button2);


          }


      }
  });

}

window.add_or_remove_friend=function()
{
  var friend_button=document.getElementById('add_remove');
  if (friend_button.textContent=="ADD")
  {
    var status="add_friend";

  }
  else if(friend_button.textContent=="Remove Friend")
  {
    var status="remove_friend";

  }
  else if(friend_button.textContent=="Request Sent")
  {
    return;

  }
  else {
    var status="accept_request";

  }

  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'user1':userPool.getCurrentUser()['username'],
              'user2':document.getElementById('name_div_f').textContent,
              'status':status
                };

  var datapayload = JSON.stringify(data);

  const params = {
    FunctionName: "friends",
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
          var status=returndata['final_status'];
          var friend_button=document.getElementById('add_remove');

          if(status=="request_accepted")
          {
              friend_button.innerHTML="Remove Friend";
          }
          else if(status=="request_sent")
          {
            friend_button.innerHTML="Request Sent";
          }
          else if(status=="request_rejected")
          {
            friend_button.innerHTML="ADD";
          }
          else {
            friend_button.innerHTML="ADD";


          }


      }
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
