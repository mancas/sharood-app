'use strict';

angular.module('sharoodApp')
  .controller('MainCtrl', function ($scope, sharoodDB) {
  	sharoodDB.login("jorgepruden@gmail.com", "test").then(function(user){
  		console.info(user);
	   	sharoodDB.logout().then(function(user){
	  		console.info("Logout done!");
	  	});
  	});
  });