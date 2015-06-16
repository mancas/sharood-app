define(['controllers/module'], function (controllers) {

    'use strict';

    controllers.controller('Register', function ($scope, sharoodDB, navigation) {

        console.info("Register controller");

        $scope.register = function(){
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var passwordConfirm = document.getElementById("passwordConfirm").value;
            sharoodDB.register(email, password, passwordConfirm).then(function(user){
                  console.info(user);
                  alert('User registered. You need to activate it.');
                  navigation.navigate('#/');
              });
        }

    });

});