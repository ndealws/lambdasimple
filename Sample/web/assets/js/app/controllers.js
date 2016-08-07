/**
 * 
 */
 
var momemtoControllers = angular.module('myApp',['ngRoute','ngCookies']);

//Service for pass data between controllers
//angular.module('myApp').service('momemtroService', function() {
//	var savedData ={};
// 
//	 this.setData = function(data) {
//	   this.savedData = data;
//	    //sessionStorage.momemtroService = angular.toJson(savedData);
//		alert("savedData-------->"+" "+savedData);
//	 };
//	 this.getData = function () {
//	 // savedData = angular.fromJson(sessionStorage.momemtroService);
//	 return savedData;
//	 };
//});


momemtoControllers.controller('UserRegisterController',['$scope','$http',function($scope,$http){

$scope.registerUser = function(){
	var name =  $scope.user_signup.nameofuser;
	var email = $scope.user_signup.email;
	var phoneno = $scope.user_signup.phone;
	var designation = $scope.user_signup.designation;
	var username = $scope.user_signup.username;
	var password = $scope.user_signup.password;
	

/** @parms Username 
	@parms Password
	@
**/
	var params = JSON.stringify({
		email: email,
		name: name,
		phoneno:phoneno,
		designation:designation,
		username:username,
		password: password
	});

	console.log("parameters-------->"+" "+params);
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
        console.log(data);
       
	   // login confirmation page 
	  // hard corded value 
	   var loginConfirmation = "https://s3-eu-west-1.amazonaws.com/matricebucket/dev-thilina/loginConfirmation.html";
	   
		if(data === "1"){
			$('#myModal_scuess').modal('show');
			 
			 // redirect to the confirmation page { ugly way } 
			 window.location = loginConfirmation;  
		}else{
			$('#myModal_faliure').modal('show');
		}
      }). 
    error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        window.location ="https://s3-eu-west-1.amazonaws.com/matricebucket/dev-thilina/404.html";
      }); 
}
}]);

momemtoControllers.controller('UserLoginController',['$scope','$http','$location','$rootScope','$cookieStore',function($scope,$http,$location,$rootScope,$cookieStore){

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
	 
			var json = data;
			if(json.location !=null){
				
				//set values to the coockies 	
				$cookieStore.put('sucessEmail',$scope.user_login.email);
				window.location = json.location;
			}else{
				$('#login_faliure').modal('show');
				
			}
			
	      }). 
	    error(function(data, status, headers, config) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	        
	        window.location = "https://s3-eu-west-1.amazonaws.com/matricebucket/dev-thilina/404.html";
	      }); 
	}
	}]);

momemtoControllers.controller('ShowDataController',['$scope','$http','$location','$rootScope','$cookieStore',function($scope,$http,$location,$rootScope,$cookieStore){

	$scope.showUser= function(){
		//Get data from the cookieStore
		var useremail = $cookieStore.get('sucessEmail');
		
	// full contact API call 
	var url ='https://api.fullcontact.com/v2/person.json?email='+useremail+'&apiKey=522d8edc9ceddc60'; 

		$http.post(url).
	    success(function(data, status, headers, config) {
	        // this callback will be called asynchronously
	        // when the response is available
	        console.log(data);
	 
			var json = data;
			if(json  !=null){
				// show details 
				document.getElementById("showdata").innerHTML = JSON.stringify(json, undefined, 2);
			}else{
			//	$('#login_faliure').modal('show');
				
			}
			
	      }). 
	    error(function(data, status, headers, config) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	        window.location = "https://s3-eu-west-1.amazonaws.com/matricebucket/dev-thilina/204.html";
	      }); 
	}
/////////////////////////////////////////////////////////////////////////////////////////////////
	$scope.showUserPipl = function(){
		var useremail = $cookieStore.get('sucessEmail');
		var url_pipl ='http://api.pipl.com/search/?email='+useremail+'&key=kgmak0db8ea4f7shalkwcaef';
		
		// pipl call 
		http.get(url_pipl).
	    success(function(data, status, headers, config) {
	        // this callback will be called asynchronously
	        // when the response is available
	        console.log(data);
	 
			var json = data;
			if(json  !=null){
				// show details 
				document.getElementById("showdata_pipl").innerHTML = JSON.stringify(json, undefined, 2);
			}else{
			//	$('#login_faliure').modal('show');
				
			}
			
	      }). 
	    error(function(data, status, headers, config) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
	        alert("Something went wrong, please contatc a system admin");
	      }); 
	}
	}]);

momemtoControllers.controller('GenerateDataController',['$scope','$http',function($scope,$http){

	$scope.generateUser= function(){
		var generateEmail = $scope.user_dash.email;
		
	// full contact API call 
	var url ='https://api.fullcontact.com/v2/person.json?email='+generateEmail +'&apiKey=522d8edc9ceddc60'; 

		$http.get(url).
	    success(function(data, status, headers, config) {
	        // this callback will be called asynchronously
	        // when the response is available
	        console.log(data);
	 
			var json = data;
			if(json  !=null){
				// show details 
				document.getElementById("showdata").innerHTML = JSON.stringify(json, undefined, 2);
			}else{
			//	$('#login_faliure').modal('show');
				
			}
			
	      }). 
	    error(function(data, status, headers, config) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
			$('#myModal_noUserDetails').modal('show');
	      }); 
	}
////////////////////////////////////////////////////////////////////////////////////////////////
	$scope.generateUserPipl = function(){
		var generateEmail = $scope.user_dash.email;
		var url_pipl ='http://api.pipl.com/search/?email='+generateEmail+'&key=kgmak0db8ea4f7shalkwcaef';
			// pipl API call
		$http.get(url_pipl).
	    success(function(data, status, headers, config) {
	        // this callback will be called asynchronously
	        // when the response is available
	        console.log(data);
	 
			var json = data;
			if(json  !=null){
				// show details 
				document.getElementById("showdata_pipl").innerHTML = JSON.stringify(json, undefined, 2);
			}else{
			//	$('#login_faliure').modal('show');
				
			}
			
	      }). 
	    error(function(data, status, headers, config) {
	        // called asynchronously if an error occurs
	        // or server returns response with an error status.
			$('#myModal_noUserDetails').modal('show');
	      });    
		}
	}]);


