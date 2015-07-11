define(['app'], function (app) {
    'use strict';
    return app.config(['$routeProvider', '$compileProvider',
        function ($routeProvider, $compileProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'Home'
                })
                .when('/register', {
                    templateUrl: 'views/register.html',
                    controller: 'Register'
                })
                .when('/newChefMeal', {
                    templateUrl: 'views/newChefMeal.html',
                    controller: 'NewChefMeal'
                })
                .when('/profile', {
                    templateUrl: 'views/profile.html',
                    controller: 'Profile'
                })
                .when('/meals', {
                    templateUrl: 'views/meals.html',
                    controller: 'Meals'
                })
                .when('/viewMeal', {
                    templateUrl: 'views/viewMeal.html',
                    controller: 'ViewMeal'
                })
                .when('/settings', {
                    templateUrl: 'views/settings.html',
                    controller: 'Settings'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
    }]);
});
