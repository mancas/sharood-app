define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('Profile', function ($scope, sharoodDB, navigation, cameraHelper) {

        console.info("Profile controller");
        var cameraImg = 'img/camera.png';

        if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }

        $scope.elements = {
            accountDetails: document.querySelector('.account-details'),
            accountEdition: document.querySelector('.account-edition'),
            editBtn: document.querySelector('.account-edit-btn'),
            accountEditionForm: document.querySelector('form#account-form'),
            deleteAccountBtn: document.querySelector('.delete-account')
        };

        $scope.currentUser = sharoodDB.currentUser;
        sharoodDB.getUniversityByUid(sharoodDB.currentUser.university[0]).then(function(university) {
            $scope.university = university;
        });
        if(sharoodDB.currentUser.picture){
            var photo =  document.getElementById('profilePhoto');
            photo.style.backgroundImage = 'url(\'' + sharoodDB.currentUser.picture.url + '\')';
            photo.classList.add('cover');
        }

        $scope.user = {
            first_name: sharoodDB.currentUser.first_name,
            phone: sharoodDB.currentUser.phone,
            email: sharoodDB.currentUser.email,
            username: sharoodDB.currentUser.username
        };

        /*$scope.cookies = 21;
        $scope.name = 'Axel';
        $scope.phone = '638006787';
        $scope.email = 'mancas.91@gmail.com';*/

        $scope.isEditModeEnable = false;
        $scope.toggleEditMode = function() {
            var photo =  document.getElementById('profilePhoto');
            if ($scope.isEditModeEnable) {
                $scope.isEditModeEnable = false;
                $scope.elements.editBtn.textContent = 'Edit';
                if (sharoodDB.currentUser.picture) {
                    photo.style.backgroundImage = 'url(\'' + sharoodDB.currentUser.picture.url + '\')';
                    photo.classList.add('cover');
                } else {
                    photo.style.backgroundImage = 'url(\'' + cameraImg + '\')';
                    photo.classList.remove('cover');
                }
            } else {
                $scope.isEditModeEnable = true;
                $scope.elements.editBtn.textContent = 'Cancel';
                photo.style.backgroundImage = 'url(\'' + cameraImg + '\')';
                photo.classList.remove('cover');
            }

            $scope.elements.accountDetails.classList.toggle('hidden', $scope.isEditModeEnable);
            $scope.elements.accountEdition.classList.toggle('hidden', !$scope.isEditModeEnable);
        };

        $scope.saveProfile = function() {
            if (!$scope.accountForm.$valid) {
                return;
            }

            function updateProfile() {
                $scope.user.username = $scope.user.first_name;
                // If everything went well
                sharoodDB.updateProfile($scope.user).then(function(result){
                    console.info(result);
                    sharoodDB.currentUser = result;
                    $scope.currentUser = result;
                    $scope.toggleEditMode();
                });
            }

            if (!$scope.imageMealURI) {
                updateProfile();
                return;
            }

            cameraHelper.getBase64FromURI($scope.imageMealURI).then(function(data) {
                sharoodDB.uploadFile(data).then(function(result) {
                    console.info(result.toJSON());
                    $scope.user.picture = result.toJSON().uid;

                    updateProfile();
                }).catch($scope.onerror);
            }).catch($scope.onerror);
        };

        $scope.navigate = navigation.navigate;

        $scope.deleteAccount = function() {
            AlertHelper.alert('#delete-account-alert');
        };

        $scope.deleteAccountConfig = {
            id: 'delete-account-alert',
            icon: true,
            title: 'Are you sure?',
            subtitle: 'You will not be able to undo this operation!',
            cancel: {
                id: 'delete-btn-cancel',
                text: 'Cancel',
                callback: function() {
                    console.info('Don\'t delete account');
                }
            },
            ok: {
                id: 'delete-btn-ok',
                text: 'Yes, delete it',
                cssClass: 'btn-danger',
                callback: function() {
                    console.info('Delete account');
                }
            }
        };

        $scope.logout = function(){
            AlertHelper.alert('#logout-alert');
        };

        $scope.logoutConfig = {
            id: 'logout-alert',
            icon: true,
            title: 'Are you sure?',
            subtitle: 'You are going to close your session!',
            cancel: {
                id: 'logout-btn-cancel',
                text: 'Cancel',
                callback: function() { }
            },
            ok: {
                id: 'logout-btn-ok',
                text: 'Yes, logout',
                cssClass: 'btn-danger',
                callback: function() {
                    setTimeout(function(){
                        sharoodDB.currentUser = null;
                        console.info('User loged out');
                        localStorage.setItem("credentials", "0");
                        navigation.navigate('/');
                    }, 500);
                    sharoodDB.logout().then(function(result){
                        sharoodDB.currentUser = null;
                        console.info('User loged out');
                        localStorage.setItem("credentials", "0");
                        navigation.navigate('/');
                    });
                }
            }
        };

        $scope.changePhoto = function(){
            console.info("Getting Picture");
            cameraHelper.getPicture().then(function(imgURI){
                var photo = document.getElementById('profilePhoto');
                photo.style.backgroundImage = 'url(data:image/jpeg;base64,' + imgURI + ')';
                photo.classList.add('cover');
                $scope.imageMealURI = 'data:image/jpeg;base64,' + imgURI;
            });
        }
    });

});
