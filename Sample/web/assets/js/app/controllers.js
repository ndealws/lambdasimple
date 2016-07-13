/**
 * http://usejsdoc.org/
 */

var momemtoControllers = angular.module('myApp',[]);

momemtoControllers.controller('UserRegisterController',['$scope','$http',function($scope,$http){

$scope.registerUser = function(){
	var name =  $scope.user_signup.nameofuser;
	var email = $scope.user_signup.email;
	var phoneno = $scope.user_signup.phone;
	var designation = $scope.user_signup.designation;
	var username = $scope.user_signup.username;
	var password = $scope.user_signup.password;

/** @parms email 
	@parms name
	@parms phoneNo
	@parms designation
	@parms userName
	@parms password 
 **/
	var params = JSON.stringify({
		email: email,
		name: name,
		phoneno:phoneno,
		designation:designation,
		username:username,
		password: password
	});

/** Alternate way to push values in to the dynamo db ***/
/**
var req = {
 method: 'POST',
 url: 'https://gec659pixh.execute-api.eu-west-1.amazonaws.com/production',
 headers: {
   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
 },
data: { test: 'test',password:'abc' }
}
$http(req).
   success(function(data, status, headers, config) {
     // this callback will be called asynchronously
     // when the response is available
	 alert("User Successfully Created !!!")
     console.log(data);
      }). 
    error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert("error");
      });
*/
/** End of alternate way ***/

var url ="https://gec659pixh.execute-api.eu-west-1.amazonaws.com/production"; //API URL

	$http.post(url,params).
    success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
        if (parseInt(data)==1){
        				 alert("User Successfully Created !!!")
        			}else{
        				alert("User Creation failed. User's email is not unique !!!")
        			}
      }). 
    error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert("Something went wrong!!");
      }); 
}
}]);

momemtoControllers.controller('UserLoginController',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){

	$scope.loginUser = function(){
		var email = $scope.user_login.email;
		var password = $scope.user_login.password;

	/** @parms email 
		@parms password 
	 **/
		var params = JSON.stringify({
			email: email,
			password: password
		});

	/** Alternate way to push values in to the dynamo db ***/
	/**
	var req = {
	 method: 'POST',
	 url: 'https://gec659pixh.execute-api.eu-west-1.amazonaws.com/production',
	 headers: {
	   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	 },
	data: { test: 'test',password:'abc' }
	}
	$http(req).
	   success(function(data, status, headers, config) {
	     // this callback will be called asynchronously
	     // when the response is available
		 alert("User Successfully Created !!!")
	     console.log(data);
	      }). 
	    error(function(data, status, headers, config) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	        alert("error");
	      });
	*/
	/** End of alternate way ***/

	var url ="https://g5kqqabaa2.execute-api.eu-west-1.amazonaws.com/develop"; //API URL

		$http.post(url,params).
	    success(function(data, status, headers, config) {
	        // this callback will be called asynchronously
	        // when the response is available
	        console.log(data);
	        if((parseInt(data)==1)){
	        	$rootScope.loggedIn=true;
	        	$location.path('/dashboard');
	        }else{
	        	 alert("User does not exsit");
	        }
	      }). 
	    error(function(data, status, headers, config) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	        alert("Something went wrong!!!");
	      }); 
	}
	}]);

