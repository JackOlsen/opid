(function () {
	'use strict';

	angular.module("opid").controller("contributeController", ['$http', function ($http) {
	    var self = this;

	    self.diagnosis = '';
	    self.description = '';
	    self.images = [{
	        file: null,
            description: ''
	    }];

	    self.addImage = function () {
	        self.images.push({
	            file: null,
	            description: ''
	        });
	    };

	    self.removeImage = function (image) {
	        _.remove(self.images, image);
	    };

	    self.submit = function () {
	        var formData = new FormData();
	        formData.append('diagnosis', self.diagnosis);
	        formData.append('description', self.description);
	        _.forEach(self.images, function (image, idx) {
	            formData.append('images', image.file);
	            formData.append('imageDescriptions[' + idx + ']', image.description);
	        });	       
	        $http.post('/api/Entry/Save', formData, {
	            transformRequest: angular.identity,
	            headers: { 'Content-Type': undefined }
	        }).then(function () {
	            alert('saved!');
	        });;
	    };
	}]);
}());