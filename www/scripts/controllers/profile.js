define(['controllers/module', 'alert-helper'], function (controllers, AlertHelper) {

    'use strict';

    controllers.controller('Profile', function ($scope, sharoodDB, navigation) {

        console.info("Profile controller");

        $scope.elements = {
            accountDetails: document.querySelector('.account-details'),
            accountEdition: document.querySelector('.account-edition'),
            editBtn: document.querySelector('.account-edit-btn'),
            accountEditionForm: document.querySelector('form#account-form'),
            deleteAccountBtn: document.querySelector('.delete-account')
        };

        /*if(sharoodDB.currentUser === null){
            navigation.navigate('#/');
            return;
        }*/

        /*$scope.cookies = sharoodDB.currentUser.cookies;
        $scope.name = sharoodDB.currentUser.first_name;
        $scope.phone = sharoodDB.currentUser.phone;
        $scope.email = sharoodDB.currentUser.email;*/

        $scope.cookies = 21;
        $scope.name = 'Axel';
        $scope.phone = '638006787';
        $scope.email = 'mancas.91@gmail.com';

        $scope.isEditModeEnable = false;
        $scope.toggleEditMode = function() {
            if ($scope.isEditModeEnable) {
                $scope.isEditModeEnable = false;
                $scope.elements.editBtn.textContent = 'Edit';
            } else {
                $scope.isEditModeEnable = true;
                $scope.elements.editBtn.textContent = 'Cancel';
            }
            $scope.elements.accountDetails.classList.toggle('hidden', $scope.isEditModeEnable);
            $scope.elements.accountEdition.classList.toggle('hidden', !$scope.isEditModeEnable);
        };

        $scope.saveProfile = function() {
            sharoodDB.currentUser.first_name = inputValue('first_name');
            sharoodDB.currentUser.phone = inputValue('phone');
            sharoodDB.currentUser.email = inputValue('email');
            sharoodDB.updateProfile().then(function(result){
                console.info(result);
            });
        };

        function inputValue(name) {
            return document.getElementsByName(name)[0].value;
        }

        $scope.navigate = navigation.navigate;

        $scope.deleteAccount = function() {
            AlertHelper.alert('#delete-account-alert');
        };

        $scope.deleteAccountConfig = {
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
                callback: function() {
                    console.info('Delete account');
                }
            }
        };

        $scope.logout = function(){
            AlertHelper.alert('#logout-alert');
        };

        $scope.logoutConfig = {
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
                callback: function() {
                    sharoodDB.logout().then(function(){
                        sharoodDB.currentUser = null;
                        console.info('User loged out');
                        navigation.navigate('/');
                    });
                }
            }
        };
    });

});
