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
                newlabel3.setAttribute("id", returndata['requests'][i]);

                var newlabel = document.createElement("button");
                newlabel.innerHTML = "Add";
                newlabel.setAttribute("id", returndata['requests'][i]+"add");
                var newlabel2 = document.createElement("button");
                newlabel2.innerHTML = "Cancel";
                newlabel2.setAttribute("id", returndata['requests'][i]+"cancel");
                div.appendChild(newlabel3);
                div.appendChild(newlabel);
                div.appendChild(newlabel2);
                var user2=returndata['requests'][i];
                console.log(returndata['requests'][i]);
                console.log("aaaaaaaa");
                newlabel.addEventListener("click", () =>  {
                  console.log(user2);
                  console.log("bbbbbbbbb");

                  const AWS = require("aws-sdk");
                  AWS.config = new AWS.Config();
                  AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
                  AWS.config.secretAccessKey = "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";
                  AWS.config.update({region: "us-east-1"});

                  const lambda = new AWS.Lambda();

                  var data ={ 'user1':userPool.getCurrentUser()['username'],
                              'user2':user2,
                              'status':"accept_request"
                                };

                  var datapayload = JSON.stringify(data);

                  const params = {
                    FunctionName: "friends",
                    InvocationType: "RequestResponse",
                    Payload: datapayload,
                      LogType: 'None'
                  };
                  var returndata;
                  console.log("yessssss");
                  lambda.invoke(params, function(error, data) {
                      if (error) {
                          console.log(error);
                      }
                      else {
                          returndata = JSON.parse(data.Payload);
                          var status=returndata['final_status'];

                          if(status=="request_accepted")
                          {

                            newlabel3.remove();
                            newlabel2.remove();
                            newlabel.remove();
                          }



                      }
                  });


    });

    newlabel2.addEventListener("click", () =>  {

      const AWS = require("aws-sdk");
      AWS.config = new AWS.Config();
      AWS.config.accessKeyId = "AKIA5JDBPHZNGUXOZVPP";
      AWS.config.secretAccessKey = "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";
      AWS.config.update({region: "us-east-1"});

      const lambda = new AWS.Lambda();

      var data ={ 'user1':userPool.getCurrentUser()['username'],
                  'user2':user2,
                  'status':"reject_request"
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

            if(status=="request_rejected")
            {
              newlabel3.remove();
              newlabel2.remove();
              newlabel1.remove();
            }


          }
      });


    });




      }
            }



      }
  });

}


//AWS.config.credentials.get(function(err) {
//  if (!err) {
  //  var id = AWS.config.credentials.identityId;
  //}
//});

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
              newlabel3.setAttribute("id", returndata['requests'][i]);


              var newlabel2 = document.createElement("button");
              newlabel2.innerHTML = "Remove Friend";
              newlabel2.setAttribute("id", returndata['requests'][i]+"remove");
              div.appendChild(newlabel3);
              div.appendChild(newlabel2);
              var br = document.createElement("br");
              div.appendChild(br);
              var user2=returndata['requests'][i];
              console.log(returndata['requests'][i]);
              console.log("aaaaaaaa");

  newlabel2.addEventListener("click", () =>  {

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
              newlabel3.remove();
              newlabel2.remove();
          }


        }
    });


  });




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

  if(document.getElementById("restaurant_list_div"))
  {
    document.getElementById("restaurant_list_div").remove();
  }
	//document.getElementById(name).style.display = "none";
}
