'use strict';

angular.module('sharoodApp')
  .controller('MainCtrl', function ($scope, sharoodDB, $location) {
  	/*
  	sharoodDB.login("jorgepruden@gmail.com", "test").then(function(user){
  		console.info(user);
	   	sharoodDB.logout().then(function(user){
	  		console.info("Logout done!");
	  	});
  	});
	*/
	$scope.login = function(){
		var email = document.getElementById("email").value;
		var password = document.getElementById("password").value;
		sharoodDB.login(email, password).then(function(user){
	  		console.info(user);
	  		window.location.href = '#/home';
		   	sharoodDB.logout().then(function(user){
		  		console.info("Logout done!");
		  	});
	  	});
	}
  });