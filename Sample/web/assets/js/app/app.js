/**
 * http://usejsdoc.org/
 */

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/createAccount', {
		templateUrl: '../web/register2.html'
	}).
      when('/lostPassword', {
      	templateUrl: '../web/lostPassword.html',
    }).
      when('/loginPage', {
      	templateUrl: '/',	
    }).
      when('/dashboard', {
      	resolve:{
      		"chceck": function($location,$rootScope){
      			if(!rootScope.loggedIn){
      				$location.path('/');
      			}
      		}
      	},
      	 templateUrl: '../web/dashboard.html'
    }).
      otherwise({
		redirectTo: '/'
      });
}]);

