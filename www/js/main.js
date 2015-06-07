require.config({
    baseUrl: '/sharood/scripts/',
    paths: {
        'angular': '/sharood/bower_components/angular/angular',
        'domReady': '/sharood/bower_components/requirejs-domready/domReady',
        'ngResource': '/sharood/bower_components/angular-resource/angular-resource',
        'ngCookies': '/sharood/bower_components/angular-cookies/angular-cookies',
        'ngSanitize': '/sharood/bower_components/angular-sanitize/angular-sanitize',
        'ngRoute': '/sharood/bower_components/angular-route/angular-route'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        ngResource: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngCookies: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngSanitize: {
            deps: ['angular'],
            exports: 'angular'
        },
        ngRoute: {
            deps: ['angular'],
            exports: 'angular'
        }
    }
});

require(['require', 'angular', 'app', 'routes'], function(require, ng) {
    // We use domReady RequireJS plugin to make sure that DOM is ready when we start the app
    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['sharoodApp']);
    });
});