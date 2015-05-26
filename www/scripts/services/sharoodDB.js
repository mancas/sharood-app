'use strict';

angular.module('sharoodApp')
  .factory('sharoodDB', function () {

    // Public API here
    return {

      login: function() {

        var user = Built.App('blt14f0a2b98d6156f4').User();
        user.login('jorgepruden@gmail.com', 'test')
        .then(function(user) {
          // user logged in successfully
          console.log(user.toJSON())
        }, function(error) {
          // some error has occurred
          // refer to the 'error' object for more details
        });

      }

    };

  });