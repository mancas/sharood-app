define(['services/module'], function (services) {
  'use strict';
  services.factory('cameraHelper', function ($q) {

      if(typeof Camera === 'undefined') {
        return null;
      }

      var contstants = {
          DATA_URL: 'DestinationType',
          FILE_URI: 'DestinationType',
          NATIVE_URI: 'DestinationType',
          PHOTOLIBRARY: 'PictureSourceType',
          CAMERA: 'PictureSourceType',
          SAVEDPHOTOALBUM: 'PictureSourceType',
          JPEG: 'EncodingType',
          PNG: 'EncodingType',
          PICTURE: 'MediaType',
          VIDEO: 'MediaType',
          ALLMEDIA: 'MediaType',
          BACK: 'Direction',
          FRONT: 'Direction'
      };

      //TODO save photos in a specific folder
      var defaultOptions = {
          quality : 80,
          destinationType : Camera.DestinationType.DATA_URL,
          sourceType : Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: true
      };

      var CameraHelper = {
          getPicture: function(options) {
              var deferred = $q.defer();
              options = options || defaultOptions;
              console.log(options);

              var onSuccess = function(img) {
                  // TODO move image to its corresponding folder
                  console.log("here3: ", img);
                  deferred.resolve(img);
              };

              var onError = function(error) {
                  deferred.reject(error);
              };

              navigator.camera.getPicture(onSuccess, onError, options);

              return deferred.promise;
          },

          buildServerImg: function(base64) {
              var name = Math.floor((Math.random() * 100000000) + 1);
              console.log(base64);
              return {
                  base64: base64,
                  name: name + '.jpeg',
                  contentType: 'image/jpeg'
              };
          }
      };

      for (var key in contstants) {
          Object.defineProperty(CameraHelper, key, {
              get: function() {
                  return Camera[constants[key]][key];
              }
          });
      }

      // Public API here
      return CameraHelper;
  });
});