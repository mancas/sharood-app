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
          quality : 75,
          destinationType : Camera.DestinationType.FILE_URI,
          sourceType : Camera.PictureSourceType.CAMERA,
          allowEdit : true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          saveToPhotoAlbum: true
      };

      var MAX_HEIGHT = 400;

      var CameraHelper = {
          getPicture: function(options) {
              var deferred = $q.defer();
              options = options || defaultOptions;
              console.info(options);

              var onSuccess = function(img) {
                  // TODO move image to its corresponding folder
                  deferred.resolve(img);
              };

              var onError = function(error) {
                  deferred.reject(error);
              };

              navigator.camera.getPicture(onSuccess, onError);

              return deferred.promise;
          },

          getBase64FromURI: function(fileURI) {
              var deferred = $q.defer();
              function onerror(error) {
                  deferred.reject(error);
              }

              window.resolveLocalFileSystemURI(fileURI, function(fileEntry) {
                  fileEntry.file(function(file){
                      var reader = new FileReader();
                      reader.onloadend = function() {
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
          },

          resizeImage: function(fileURI) {
              var deferred = $q.defer();

              function onerror(error) {
                  deferred.reject(error);
              }

              function resizeImgFromFile(file) {
                  var image = new Image();
                  image.onload = function(){
                      var canvas = document.createElement('canvas');
                      if(image.height > MAX_HEIGHT) {
                          image.width *= MAX_HEIGHT / image.height;
                          image.height = MAX_HEIGHT;
                      }
                      var ctx = canvas.getContext('2d');
                      ctx.clearRect(0, 0, canvas.width, canvas.height);
                      canvas.width = image.width;
                      canvas.height = image.height;
                      ctx.drawImage(image, 0, 0, image.width, image.height);

console.info(canvas.toDataURL('image/jpeg', 1.0));
                      deferred.resolve({
                          base64: canvas.toDataURL('image/jpeg', 1.0),
                          name: file.name,
                          contentType: 'image/jpeg'
                      });
                  };
                  image.src = fileURI;
              }

              window.resolveLocalFileSystemURI(fileURI, function(fileEntry) {
                  fileEntry.file(resizeImgFromFile, onerror);
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