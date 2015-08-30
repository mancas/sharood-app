define(['services/module'], function (services) {
  'use strict';
  services.factory('cameraHelper', function ($q) {

      if(typeof Camera == 'undefined'){
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
          destinationType : Camera.DestinationType.FILE_URI,
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

          getBase64FromURI: function(fileURI) {
              var deferred = $q.defer();
              function onerror(error) {
                  deferred.reject(error);
              }

              window.resolveLocalFileSystemURL(fileURI, function(fileEntry) {
                  fileEntry.file(function(file){
                      var reader = new FileReader();
                      reader.onloadend = function() {
                          console.log("here1: ", reader.result);
                          deferred.resolve({
                              base64: reader.result,
                              name: file.name,
                              contentType: 'image/jpeg'
                          });
                      };
                      reader.readAsDataURL(file);
                  }, onerror);
              }, onerror);

              return deferred.promise;
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