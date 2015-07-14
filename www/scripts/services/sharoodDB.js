define(['services/module'], function (services) {
  'use strict';
  services.factory('sharoodDB', function ($q) {
    var apiKey = 'blt14f0a2b98d6156f4';

    // Public API here
    return {

      currentUser: null,

      loadCurrentUser: function(){
        console.info('1');
        var deferred = $q.defer();
        var user = Built.App(apiKey).User;
        user.getCurrentUser()
          .then(function(user){
            deferred.resolve(user.toJSON());
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            console.info(error);
            deferred.reject(error);
          });

        return deferred.promise;
      },

      login: function(email, password) {
        console.info('2');
        var deferred = $q.defer();
        var user = Built.App(apiKey).User();
        user.login(email, password)
          .then(function(user) {
            deferred.resolve(user.toJSON());
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            console.info(error);
            deferred.reject(error);
          });

        return deferred.promise;
      },

      register: function(email, password, passwordReply) {
        console.info('3');
        var deferred = $q.defer();
        var user = Built.App(apiKey).User();
        user.register(email, password, passwordReply)
          .then(function(user) {
            deferred.resolve(user.toJSON());
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            deferred.reject(error);
          });

        return deferred.promise;
      },

      logout: function() {
        console.info('4');
        var deferred = $q.defer();
        var user = Built.App(apiKey).User();
        user.logout()
          .then(function() {
            deferred.resolve();
          }, function(error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      },

      saveMeal: function(mealData) {
        console.info('5');
        var deferred = $q.defer();
        var Meal = Built.App(apiKey).Class('meal').Object;
        var meal = Meal();

        meal = meal.assign(mealData);

        meal.save()
          .then(function(result) {
            deferred.resolve(result.toJSON());
          }, function(error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      },


      getAllMeals: function(start, finish) {
        console.info('6');
        var deferred = $q.defer();
        var query = Built.App(apiKey).Class('meal').Query();

        if(typeof start !== 'undefined' && typeof finish !== 'undefined'){
          var first = start;
          var range = finish + 1 - start;
          if (first != 0) {
            query = query.skip(first);
          }
          query = query.limit(range);
        }

        query.exec()
          .then(function(meals) {
            deferred.resolve(meals);
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            deferred.reject(error);
          });

        return deferred.promise;
      },

      addOwnerToMeal: function (meal){
        var deferred = $q.defer();

        this.getUserById(meal.owner[0]).then(function(result){
          meal.owner = result;
          deferred.resolve(meal);
        });

        return deferred.promise;
      },

      uploadFile: function(fileData) {
        console.info('7');
        var deferred = $q.defer();
        var upload = Built.App(apiKey).Upload();
        upload = upload.setFile(fileData);

        upload.save()
          .then(function(result) {
            deferred.resolve(result);
          }, function(error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      },

      updateProfile: function() {
        console.info('8');
        var data = this.currentUser;

        var deferred = $q.defer();
        var user = Built.App(apiKey).User(data.uid);

        user.updateUserProfile(data).then(function(user) {
          deferred.resolve(user.toJSON());
        }, function(error) {
          deferred.resolve(error);
        });

        return deferred.promise;
      },

      getUserById: function(userId) {
        console.info('9');
        var deferred = $q.defer();
        var user = Built.App(apiKey).Class('built_io_application_user').Object(userId);
        user.fetch()
          .then(function(user) {
            deferred.resolve(user.toJSON());
          }, function(error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      }      

    };

  });
});