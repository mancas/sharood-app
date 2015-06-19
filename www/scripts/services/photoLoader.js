define(['services/module'], function (services) {
  'use strict';
  services.factory('photoLoader', function () {

  	var photoLoaded = null;

	var onSuccess = function(imageData) {
	    photoLoaded = imageData;
	}

	var onFail = function (message) {
	    alert('Failed because: ' + message);
	}

    // Public API here
    return {

		takePhoto: function() {
			console.info("Taking photo");
			navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
															destinationType: Camera.DestinationType.DATA_URL });
	    },

	    getPhotoFromGallery: function () {
	    	console.info("Getting photo from gallery");
			navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
															destinationType: Camera.DestinationType.DATA_URL, 
															sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
	    },

	    getPhotoLoaded: function() {
	    	return photoLoaded;
	    },

	    setPhotoLoadedEmpty: function() {
	    	photoLoaded = null;
	    }

    };

  });
});