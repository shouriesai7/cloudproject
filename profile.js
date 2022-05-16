var userPoolId = "us-west-2_U0pr265Bb";
var clientId ="80q3im5c1lk02g5b1vb38028d";

var poolData = { UserPoolId : userPoolId,
  ClientId : clientId
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);



window.reject_accept=function(data1)
{

  data1=data1.split("/");
  console.log(data1[1]);

  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'user1':userPool.getCurrentUser()['username'],
              'user2':data1[0],
              'status':data1[1]
                };

  var datapayload = JSON.stringify(data);

  const params = {
    FunctionName: "friends",
    InvocationType: "RequestResponse",
    Payload: datapayload,
      LogType: 'None'
  };
  var returndata;

  lambda.invoke(params, function(error, data) {
      if (error) {
          console.log(error);
      }
      else {
        console.log("yessssss");
          returndata = JSON.parse(data.Payload);
          var status=returndata['final_status'];
          console.log(returndata);
          if(status=="request_accepted")
          {

            document.getElementById(String(data1[0]).trim()).remove();
            document.getElementById(String(String(data1[0]).trim()+String("add").trim()).trim()).remove()
            document.getElementById(String(String(data1[0]).trim()+String("cancel").trim()).trim()).remove();

          }
          else if(status=="request_rejected")
          {
            document.getElementById(String(data1[0]).trim()).remove();
            document.getElementById(String(String(data1[0]).trim()+String("add").trim()).trim()).remove()
            document.getElementById(String(String(data1[0]).trim()+String("cancel").trim()).trim()).remove();
          }



      }
  });
}

window.set_info =function()
{
  var div1=document.getElementById("name_div");
  div1.innerHTML=userPool.getCurrentUser()['username'];



}


//AWS.config.credentials.get(function(err) {
//  if (!err) {
  //  var id = AWS.config.credentials.identityId;
  //}
//});


window.remove_friend=function(user2)
{
  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'user1':userPool.getCurrentUser()['username'],
              'user2':user2,
              'status':"remove_friend"
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

        if(status=="friend_removed")
        {
            newlabel3=document.getElementById(String(user2).trim()).remove();
            newlabel2=document.getElementById(String(String(user2).trim()+String("remove").trim()).trim()).remove();
        }


      }
  });

}

window.opentab=function(tabname) {
  //for (i = 0; i < 4; i++) {
  //  var name= "tab"+i;
  //  closetab(name);
  //}

  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'user1': userPool.getCurrentUser()['username'] };

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
          if(document.getElementById('restaurant_list_div'))
          {
            document.getElementById('restaurant_list_div').remove();
          }
          if(returndata['final_status']=="friends")
          {
            var div = document.createElement('div');
            div.setAttribute("id", "restaurant_list_div");
            div.setAttribute('class', 'dynamic_list');
            document.body.appendChild(div);
            for (let i=0; i < returndata['requests'].length; i++) {
              var newlabel3 = document.createElement("label");
              newlabel3.innerHTML = returndata['requests'][i];
              newlabel3.setAttribute("id", String(returndata['requests'][i]).trim());


              var newlabel2 = document.createElement("button");
              newlabel2.innerHTML = "Remove Friend";
              newlabel2.setAttribute("id", String(String(returndata['requests'][i]).trim()+String("remove").trim()).trim());
              var br = document.createElement("br");
              div.appendChild(br);
              div.appendChild(newlabel3);
              div.appendChild(newlabel2);
              var user2=returndata['requests'][i];
              console.log(returndata['requests'][i]);
              console.log("aaaaaaaa");
              var string1 = String(user2);
              newlabel2.setAttribute('onclick', 'remove_friend( " '+string1+' " )');

    }

          }


      }
  });

  //document.getElementById(tabname).removeAttribute("style");
}

var myfunc = function( val){
 document.getElementById(val).style.backgroundColor="purple";
};

window.closetab=function(name){


  if(document.getElementById('restaurant_list_div'))
  {
    document.getElementById('restaurant_list_div').remove();
  }

  const AWS = require("aws-sdk");
  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
  AWS.config.secretAccessKey = "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";
  AWS.config.update({region: "us-east-1"});

  const lambda = new AWS.Lambda();

  var data ={ 'user1': userPool.getCurrentUser()['username'],
              'status':'check_request'
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
          console.log(returndata)
          if (returndata['final_status']=="has_pending_requests")
            {
              var div = document.createElement('div');
              div.setAttribute("id", "restaurant_list_div");
              div.setAttribute('class', 'dynamic_list');
              document.body.appendChild(div);
              for (let i=0; i < returndata['requests'].length; i++) {
                var newlabel3 = document.createElement("label");
                newlabel3.innerHTML = returndata['requests'][i];
                newlabel3.setAttribute("id", String(returndata['requests'][i]).trim());

                var newlabel = document.createElement("button");
                newlabel.innerHTML = "Add";
                newlabel.setAttribute("id", String(String(returndata['requests'][i]).trim()+String("add").trim()).trim());
                var newlabel2 = document.createElement("button");
                newlabel2.innerHTML = "Cancel";
                newlabel2.setAttribute("id", String(String(returndata['requests'][i]).trim()+String("cancel").trim()).trim());
                div.appendChild(newlabel3);
                div.appendChild(newlabel);
                div.appendChild(newlabel2);
                var br = document.createElement("br");
                div.appendChild(br);
                var user2=returndata['requests'][i];
                console.log(returndata['requests'][i]);
                console.log("aaaaaaaa");


                var string1 = String(String(String(user2).trim()+String('/').trim()+String("accept_request").trim()).trim()).trim()

                newlabel.setAttribute('onclick', 'reject_accept( " '+string1+' " )');

                var string2 = String(String(String(user2).trim()+String('/').trim()+String("reject_request").trim()).trim()).trim();

                newlabel2.setAttribute('onclick', 'reject_accept( " '+string2+' " )');



      }
            }



      }
  });
	//document.getElementById(name).style.display = "none";
}
