define(['services/module'], function (services) {
  'use strict';
  services.factory('MealService', function ($rootScope, $location) {
    
    var currentMeal = null;

    function setCurrentMeal(data){
      currentMeal = data;
    }

    function getCurrentMeal(){
      return currentMeal;
    }

    // Public API here
    return {
        setCurrentMeal: setCurrentMeal,
        getCurrentMeal: getCurrentMeal
    };

  });
});