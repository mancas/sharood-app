'use strict';

angular.module('sharoodApp')
  .factory('sharoodDB', function () {

    var apiKey = 'blt14f0a2b98d6156f4';

    // Public API here
    return {

      currentUser: null,

      login: function(email, password) {
        return new Promise(function(resolve, reject){
          var user = Built.App(apiKey).User();
          user.login(email, password)
          .then(function(user) {
            resolve(user.toJSON());
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            console.info(error);
          });
        });
      },

      register: function(email, password, passwordReply) {
        return new Promise(function(resolve, reject){
          var user = Built.App(apiKey).User();
          user.register(email, password, passwordReply)
          .then(function(user) {
              resolve(user.toJSON());
          }, function(error) {
              // some error has occurred
              // refer to the 'error' object for more details
          });
        });
      },

      logout: function() {
        return new Promise(function(resolve, reject){
          var user = Built.App(apiKey).User();
          user.logout()
          .then(function() {
              resolve();
          }, function(error) {
              // some error has occurred
              // refer to the 'error' object for more details
          });
        });
      }

    };

  });