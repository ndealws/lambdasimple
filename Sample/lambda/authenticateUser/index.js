console.log('Loading event');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();

exports.handler = function(event, context) {
    console.log("Request received:\n", JSON.stringify(event));
    console.log("Context received:\n", JSON.stringify(context));

    var tableName = "users";
    //check if username is unique in backend db
    var params = {
        "TableName": tableName,
        "FilterExpression": "email = :v1 AND password = :v2",
        "ExpressionAttributeValues": {
            ":v1": {"S": event.email},
            ":v2": {"S": event.password}
        }
    }
    dynamodb.scan(params, function(err, data) {
    if (err) {
      console.log(err); // an error occurred
      } 
    else {
      console.log("Returned data: " + JSON.stringify(data)); // successful response
      if (data.Count==0){
          console.log("User doesn't exist in the backend");
          context.succeed('-1');
                return 0;
       }else{
           console.log("User exist in the backend");
         // context.succeed('1');
         //if the response is 200 it would return the path of the dashboard
           context.succeed({
        location : "https://s3-eu-west-1.amazonaws.com/matricebucket/dev-thilina/dashboard.html"
    });
                return 0;    
        }
        }});
        
}