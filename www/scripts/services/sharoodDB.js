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
        return new Promise(function(resolve, reject){
          var user = Built.App(apiKey).User();
          user.logout()
              .then(function() {
                resolve();
              }, function(error) {
                resolve(error);
              });
        });
      },

      saveMeal: function(mealData) {
        console.info('5');
        return new Promise(function(resolve, reject){
          var Meal = Built.App(apiKey).Class('meal').Object;
          var meal = Meal();
           
          meal = meal.assign(mealData);
           
          meal
          .save()
          .then(function(result) {
            resolve(result.toJSON());
          }, function(err) {
            resolve(err);
          });
        });
      },


      getAllMeals: function() {
        console.info('6');
        return new Promise(function(resolve, reject){
          var query = Built.App(apiKey).Class('meal').Query();
           
          query
          .exec()
          .then(function(meals) {
              resolve(meals);
          }, function(error) {
              // some error has occurred
              // refer to the 'error' object for more details
          });
        });
      },

      uploadFile: function(fileData) {
        console.info('7');
        return new Promise(function(resolve, reject){
          var upload = Built.App(apiKey).Upload();
          upload = upload.setFile(fileData);

          upload
            .save()
            .then(function(result) {
              resolve(result);
            }, function(error) {
              resolve(error);
            });
        });
      },

      updateProfile: function() {
        console.info('8');
        var data = this.currentUser;

        return new Promise(function(resolve, reject){
          var user = Built.App(apiKey).User(data.uid);

          user.updateUserProfile(data).then(function(user) {
            resolve(user.toJSON())
          }, function(error) {
            resolve(error);
          });
        });
      }

    };

  });
});