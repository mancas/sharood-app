define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('Register', function ($scope, sharoodDB, navigation) {

        console.info("Register controller");

        const ALERT_TITLES = {
            error: {
                title: 'Opps!',
                subtitle: 'Something went wrong. Please try to perform this action later',
                button: 'Ok'
            },
            success: {
                title: 'Account created successfully',
                subtitle: 'You can star using Sharood!',
                button: 'Let\'s go!'
            }
        };

        $scope.hasErrors = false;

        $scope.register = function(){
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            var passwordConfirm = document.getElementById("passwordConfirm").value;
            sharoodDB.register(email, password, passwordConfirm).then(function(user) {
                $scope.hasErrors = false;
                updateAlertTitles();
                AlertHelper.alert('#register-account-alert');
            }).catch(function(error) {
                $scope.hasErrors = true;
                updateAlertTitles(error);
                AlertHelper.alert('#register-account-alert');
            });
        }

        function onSuccess() {
            if (!$scope.hasErrors) {
                console.info('Account created');
                alert('User registered. You need to activate it.');
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
                class: 'btn-info',
                callback: onSuccess
            }
        };

    });

});