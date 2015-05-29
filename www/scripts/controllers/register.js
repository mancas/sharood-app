'use strict';

angular.module('sharoodApp')
  .controller('Register', function ($scope, sharoodDB) {
	$scope.register = function(){
		var email = document.getElementById("email").value;
		var password = document.getElementById("password").value;
		var passwordConfirm = document.getElementById("passwordConfirm").value;
		sharoodDB.register(email, password, passwordConfirm).then(function(user){
	  		console.info(user);
	  		alert('User registered. You need to activate it.');
	  		window.location.href = '#/';
	  	});
	}
  });