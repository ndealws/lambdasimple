console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "users";
    //check if username is unique in backend db
    var params = {
        TableName: tableName,
        Key : { 
            "email" : {
            "S" : event.email
        }
      }
    }
    dynamodb.getItem(params, function(err, data) {
    if (err) {
      console.log(err); // an error occurred
      } 
    else {
      console.log("Returned data: " + JSON.stringify(data)); // successful response
      if (JSON.stringify(data)=="{}"){
          console.log("email is unique");
          
          //email is unique, therefore save the user registration detials in backend db
            dynamodb.putItem({
            "TableName": tableName,
            "Item": {
                "email": {
                    "S": event.email
                },
                "password": {
                    "S": event.password
                }
            }
            }, function(err, data) {
                if (err) {
                    context.fail('ERROR: Dynamo failed: ' + err);
                    // err in register
                    return -1;
            } else {
                console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
                context.succeed('1');
                // sucess register
                return 0;
            }
        });
      }else{
          console.log("email is not unique");
            context.succeed('-1');
            return 0;
      }
     }});
}