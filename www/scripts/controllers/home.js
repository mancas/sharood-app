define(['controllers/module'], function (controllers) {

	'use strict';

	controllers.controller('Home', function ($scope, sharoodDB) {
		
		console.info("Home controller");

		if(sharoodDB.currentUser === null){
			window.location.href = '#/';
			return;
		}

		$scope.username = sharoodDB.currentUser.username;
		$scope.cookies = sharoodDB.currentUser.cookies;

	});

});