define(['services/module'], function (services) {
  'use strict';
  services.factory('sharoodDB', function ($q) {
    var apiKey = 'blt14f0a2b98d6156f4';

    // Public API here
    return {

      currentUser: null,
      updaterLoaded: false,

      loadCurrentUser: function(){
        console.log('1');
        var deferred = $q.defer();
        var user = Built.App(apiKey).User;
        user.getCurrentUser()
          .then(function(user){
            deferred.resolve(user.toJSON());
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            console.log(error);
            deferred.reject(error);
          });

        return deferred.promise;
      },

      login: function(data) {
        console.log('2');
        var deferred = $q.defer();
        var user = Built.App(apiKey).User();
        var self = this;
        user.login(data.email, data.password)
          .then(function(user) {
            deferred.resolve(user.toJSON());
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            console.log(error);
            deferred.reject(error);
          });

        return deferred.promise;
      },

      getUniversityByUid: function(uid) {
        var deferred = $q.defer();

        var query = Built.App(apiKey).Class('university').Object(uid);
 
        query
        .fetch()
        .then(function(project) {
            deferred.resolve(project.toJSON());
        }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
        });

        return deferred.promise;
      },

      register: function(data) {
        console.log('3');
        var deferred = $q.defer();
        var user = Built.App(apiKey).User();

        user = user.assign({
            cookies: 10,
            food_level_rating: 0,
            food_level_rating_nofvotes: 0,
            friendliness_chef_rating: 0,
            friendliness_chef_rating_nofvotes: 0,
            fun_rating: 0,
            fun_rating_nofvotes: 0,
            university: data.university,
            first_name: data.name,
            username: data.name,
            room_number: data.room
        });

        user.register(data.email, data.password, data.passwordConfirm)
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
        console.log('4');
        var deferred = $q.defer();
        var user = Built.App(apiKey).User();
        user.logout()
          .then(function() {
            deferred.resolve();
          }, function(error) {
            deferred.resolve();
          });

        return deferred.promise;
      },

      saveMeal: function(mealData) {
        console.log('5');
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
        console.log('6');
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

        var q1 = query.notEqualTo('assistants.assistant1', this.currentUser.uid);
        var q2 = query.notEqualTo('assistants.assistant2', this.currentUser.uid);
        var q3 = query.notEqualTo('assistants.assistant3', this.currentUser.uid);
        var q4 = query.notEqualTo('assistants.assistant4', this.currentUser.uid);
        var q5 = query.notEqualTo('assistants.assistant5', this.currentUser.uid);

        var q6 = query.notEqualTo('owner', this.currentUser.uid);

        var q7 = query.where('university', this.currentUser.university[0]);

        query = query.and([q1, q2, q3, q4, q5, q6, q7]);

        query = query.greaterThanOrEqualTo('time', new Date()); //Only meals with a time bigger than now.

        query.include(['owner',
                       'assistants.assistant1',
                       'assistants.assistant2',
                       'assistants.assistant3',
                       'assistants.assistant4',
                       'assistants.assistant5'])
          .ascending('time')
          .exec()
          .then(function(meals) {
            deferred.resolve(meals);
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            deferred.reject(error);
          });

        return deferred.promise;
      },

      getmealById: function (mealId){
        var deferred = $q.defer();

        var query = Built.App(apiKey).Class('meal').Object(mealId);
 
        query
        .fetch()
        .then(function(project) {
            deferred.resolve(project.toJSON());
        }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
        });

        return deferred.promise;
      },

      getMealWithAttendantsById: function(mealId){
        var deferred = $q.defer();

        var query = Built.App(apiKey).Class('meal').Query();

        console.log(query);
        query = query.where('uid', mealId);

        query.include(['owner',
          'assistants.assistant1',
          'assistants.assistant2',
          'assistants.assistant3',
          'assistants.assistant4',
          'assistants.assistant5'])
            .exec()
            .then(function(meal) {
              deferred.resolve(meal);
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
        console.log('7');
        console.log(fileData);
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

      updateProfile: function(data) {
        console.log('8');

        var deferred = $q.defer();
        var User = Built.App(apiKey).Class('built_io_application_user').Object;
        var user = User(this.currentUser.uid);

        user = user.assign(data);

        user.save()
          .then(function(user) {
            deferred.resolve(user.toJSON());
          }, function(error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      },

      getUserById: function(userId) {
        console.log('9');
        var deferred = $q.defer();
        var user = Built.App(apiKey).Class('built_io_application_user').Object(userId);
        user.fetch()
          .then(function(user) {
            deferred.resolve(user.toJSON());
          }, function(error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      },

      getAllMealsByOwner: function(owner) {
        console.log('10');
        var deferred = $q.defer();
        var query = Built.App(apiKey).Class('meal').Query();

        query = query.notContainedIn('votedby', this.currentUser.uid);

        query.include(['owner',
                       'assistants.assistant1',
                       'assistants.assistant2',
                       'assistants.assistant3',
                       'assistants.assistant4',
                       'assistants.assistant5'])
          .where('owner', owner).exec()
          .then(function(meals) {
            deferred.resolve(meals);
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            deferred.reject(error);
          });

        return deferred.promise;
      },

      getAllMealsByAssistant: function(assistant) {
        console.log('11');
        var deferred = $q.defer();

        var query = Built.App(apiKey).Class('meal').Query();

        console.log(query);
        console.log(this.currentUser);

        query = query.notContainedIn('votedby', this.currentUser.uid);

        var q1 = query.where('assistants.assistant1', assistant);
        var q2 = query.where('assistants.assistant2', assistant);
        var q3 = query.where('assistants.assistant3', assistant);
        var q4 = query.where('assistants.assistant4', assistant);
        var q5 = query.where('assistants.assistant5', assistant);

        query = query.or([q1, q2, q3, q4, q5]);

        query.include(['owner',
                       'assistants.assistant1',
                       'assistants.assistant2',
                       'assistants.assistant3',
                       'assistants.assistant4',
                       'assistants.assistant5'])
          .exec()
          .then(function(meals) {
            deferred.resolve(meals);
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            deferred.reject(error);
          });

        return deferred.promise;
      },

      addVotesToUser: function(userId, friendliness, foodLevel, fun) {
        console.log('12');
        var deferred = $q.defer();
        console.log(userId, friendliness, foodLevel, fun);
        var User = Built.App(apiKey).Class('built_io_application_user').Object;
        var user = User(userId);

        user = user.increment('friendliness_chef_rating', friendliness);
        user = user.increment('friendliness_chef_rating_nofvotes', 1);

        if(typeof foodLevel !== 'undefined' || typeof fun !== 'undefined'){
          user = user.increment('food_level_rating', foodLevel);
          user = user.increment('food_level_rating_nofvotes', 1);

          user = user.increment('fun_rating', fun);
          user = user.increment('fun_rating_nofvotes', 1);
        }

        user.save()
          .then(function(user) {
            deferred.resolve(user.toJSON());
          }, function(error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      },    

      getAllPlaces: function() {
        console.log('13');
        var deferred = $q.defer();
        var query = Built.App(apiKey).Class('university').Query();

        query = query.ascending('name');

        query.exec()
          .then(function(places) {
            deferred.resolve(places);
          }, function(error) {
            // some error has occurred
            // refer to the 'error' object for more details
            deferred.reject(error);
          });

        return deferred.promise;
      },

      transferCookies: function(from, to, number) {
        console.log('14');

        var promises = [];

        var p1 = this.decrementCookies(from, number);
        var p2 = this.incrementCookies(to, number);

        promises.push(p1);
        promises.push(p2);

        return $q.all(promises);
      },

      incrementCookies: function(userId, number) {
        console.log('15');
        var deferred = $q.defer();
        var User = Built.App(apiKey).Class('built_io_application_user').Object;
        var user = User(userId);

        user = user.increment('cookies', number);

        user.save()
          .then(function(user) {
            deferred.resolve(user.toJSON());
          }, function(error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      },

      decrementCookies: function(userId, number) {
        console.log('16');
        var deferred = $q.defer();
        var User = Built.App(apiKey).Class('built_io_application_user').Object;
        var user = User(userId);

        user = user.decrement('cookies', number);

        user.save()
          .then(function(user) {
            deferred.resolve(user.toJSON());
          }, function(error) {
            deferred.resolve(error);
          });

        return deferred.promise;
      },

      updateCurrentUser: function() {
        if(this.updaterLoaded){
          return;
        }

        var self = this;
        setInterval(function(){
          self.updaterLoaded = true;
          if(self.currentUser != null){
            self.getUserById(self.currentUser.uid).then(function(user){
              console.log(user);
              self.currentUser = user;
            });
          }
        }, 10000);
      }

    };

  });
});