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
  	  console.log(returndata);

        }
    });


      }
  });
}
