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
                .otherwise({
                    redirectTo: '/'
                });

            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
            $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|app):/);
    }]);
});
