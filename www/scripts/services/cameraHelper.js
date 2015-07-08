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

      var MAX_HEIGHT = 400;

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
          },

          resizeImage: function(fileURI) {
              return new Promise(function(resolve, reject) {
                  function onerror(error) {
                      reject(error);
                  }

                  function resizeImgFromFile(file) {
                      var image = new Image();
                      image.onload = function(){
                          var canvas = document.getElementById("myCanvas");
                          if(image.height > MAX_HEIGHT) {
                              image.width *= MAX_HEIGHT / image.height;
                              image.height = MAX_HEIGHT;
                          }
                          var ctx = canvas.getContext("2d");
                          ctx.clearRect(0, 0, canvas.width, canvas.height);
                          canvas.width = image.width;
                          canvas.height = image.height;
                          ctx.drawImage(image, 0, 0, image.width, image.height);

console.info(canvas.toDataURL('image/jpeg', 1.0));
                          resolve({
                              base64: canvas.toDataURL('image/jpeg', 1.0),
                              name: file.name,
                              contentType: 'image/jpeg'
                          });
                      };
                      image.src = fileURI;
                  }

                  window.resolveLocalFileSystemURL(fileURI, function(fileEntry) {
                      fileEntry.file(resizeImgFromFile, onerror);
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