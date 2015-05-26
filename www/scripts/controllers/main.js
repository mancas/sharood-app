'use strict';

angular.module('sharoodApp')
  .controller('MainCtrl', function ($scope, sharoodDB) {
  	sharoodDB.login();
  });