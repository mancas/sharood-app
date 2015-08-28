define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('Register', function ($scope, sharoodDB, navigation, cameraHelper) {

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
            },
            photo: {
                title: 'Your photo is required',
                subtitle: '',
                button: 'Ok'
            }
        };

        $scope.hasErrors = false;

        $scope.user = {
            name: null,
            email: null,
            password: null,
            passwordConfirm: null,
            university: null,
            room: null
        };

        $scope.register = function(){
            if (!$scope.registerForm.$valid) {
                console.info('no validate', $scope.registerForm);
                return;
            }

            if (!$scope.imageURI) {
                $scope.hasErrors = true;
                updateAlertTitles('photo');
                AlertHelper.alert('#register-account-alert');
                return;
            }

            sharoodDB.register($scope.user).then(function(user) {
                cameraHelper.getBase64FromURI($scope.imageURI).then(function(data) {
                    sharoodDB.uploadFile(data).then(function(result) {
                        console.info(result.toJSON());
                        user.picture = result.toJSON().uid;

                        sharoodDB.updateProfile(user).then(function(result){
                            console.info(result);
                            sharoodDB.currentUser = result;
                            $scope.currentUser = result;
                            $scope.hasErrors = false;
                            updateAlertTitles('success');
                            AlertHelper.alert('#register-account-alert');
                        });
                    }).catch(onerror);
                }).catch(onerror);
            }).catch(onerror);
        };

        function onerror(e) {
            $scope.hasErrors = true;
            updateAlertTitles('error');
            AlertHelper.alert('#register-account-alert');
        }

        function onSuccess() {
            if (!$scope.hasErrors) {
                console.info('Account created');
                //alert('User registered. You need to activate it.');
                navigation.navigate('/');
            }
        }

        function updateAlertTitles(key) {
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

        $scope.changePhoto = function(){
            console.info("Getting Picture");
            cameraHelper.getPicture().then(function(imgURI){
                var photo = document.getElementById('profilePhoto');
                photo.style.backgroundImage = 'url(data:image/jpeg;base64,' + imgURI + ')';
                photo.classList.add('cover');
                $scope.imageURI = 'data:image/jpeg;base64,' + imgURI;
            });
        }

    });

});