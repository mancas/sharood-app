define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('Register', function ($scope, sharoodDB, navigation) {

        console.info("Register controller");

        var ALERT_TITLES = {
            error: {
                title: 'Opps!',
                subtitle: 'Something went wrong. Please try to perform this action later',
                button: 'Ok'
            },
            success: {
                title: 'Account created successfully',
                subtitle: 'You can start using Sharood!',
                button: 'Let\'s go!'
            }
        };

        $scope.hasErrors = false;

        $scope.user = {
            name: null,
            email: null,
            password: null,
            passwordConfirm: null,
            university: null
        };

        $scope.register = function(){
            if (!$scope.registerForm.$valid) {
                console.info('no validate', $scope.registerForm);
                return;
            }

            sharoodDB.register($scope.user).then(function(user) {
                $scope.hasErrors = false;
                updateAlertTitles();
                AlertHelper.alert('#register-account-alert');
            }).catch(function(error) {
                $scope.hasErrors = true;
                updateAlertTitles(error);
                AlertHelper.alert('#register-account-alert');
            });
        };

        function onSuccess() {
            if (!$scope.hasErrors) {
                console.info('Account created');
                //alert('User registered. You need to activate it.');
                navigation.navigate('/');
            }
        }

        function updateAlertTitles(error) {
            var key = 'success';
            if (typeof error !== 'undefined') {
                key = 'error';
            }

            var alert = document.querySelector('#register-account-alert');
            var title = alert.querySelector('h2');
            var subtitle = alert.querySelector('p');
            var button = alert.querySelector('#btn-ok');

            title.textContent = ALERT_TITLES[key].title;
            subtitle.textContent = ALERT_TITLES[key].subtitle;
            button.textContent = ALERT_TITLES[key].button;
        }

        $scope.navigate = navigation.navigate;

        $scope.registerAccountConfig = {
            id: 'register-account-alert',
            icon: false,
            title: 'Account created successfully',
            subtitle: 'You can star using Sharood!',
            ok: {
                id: 'btn-ok',
                text: 'Let\'s go!',
                cssClass: 'btn-info',
                callback: onSuccess
            }
        };

        sharoodDB.getAllPlaces().then(function(result){
            result.forEach(function(element){
                var university = element.toJSON().name;
                var universityUid = element.toJSON().uid;

                var x = document.getElementById("selectPlace");
                var option = document.createElement("option");
                option.text = university;
                option.value = universityUid;
                x.add(option);
            });
        });

    });

});