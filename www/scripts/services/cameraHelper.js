define(['services/module'], function (services) {
  'use strict';
  services.factory('cameraHelper', function () {
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
          quality : 75,
          destinationType : Camera.DestinationType.FILE_URI,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          saveToPhotoAlbum: true
      };

      var CameraHelper = {
          getPicture: function(options) {
              return new Promise(function(resolve, reject) {
                  options = options || defaultOptions;
                  console.info(options);

                  var onSuccess = function(img) {
                      // TODO move image to its corresponding folder
                      resolve(img);
                  };

                  var onError = function(error) {
                      reject(error);
                  };

                  navigator.camera.getPicture(onSuccess, onError);
              });
          },

          getBase64FromURI: function(fileURI) {
              return new Promise(function(resolve, reject) {
                  function onerror(error) {
                      reject(error);
                  }

                  window.resolveLocalFileSystemURL(fileURI, function(fileEntry) {
                      fileEntry.file(function(file){
                          var reader = new FileReader();
                          reader.onloadend = function() {
                              resolve({
                                  base64: reader.result,
                                  name: file.name,
                                  contentType: 'image/jpeg'
                              });
                          };
                          reader.readAsDataURL(file);
                      }, onerror);
                  }, onerror);
              });
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