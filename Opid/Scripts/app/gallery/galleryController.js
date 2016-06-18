(function (_) {
    angular.module("opid").controller("galleryController", ["$scope", "database", function ($scope, database) {
    	var self = this;

    	self.searchText = '';
    	self.page = 1;
		self.pageSize = 12;
		self.entries = null;
		self.entryCount = null;

    	var search = function () {
    		database.searchEntries(self.searchText, self.page, self.pageSize)
				.then(function (response) {
					self.entries = response.results;
					self.entryCount = response.resultCount;
				});
    	};

    	$scope.$watch(function () {
    		return self.searchText;
    	}, _.debounce(function (newValue, oldValue) {
    		if (newValue !== oldValue) {
    			search();
    		}
    	}, 500));
    	$scope.$watch(function () {
    		return self.page;
    	}, function (newValue, oldValue) {
    		if (newValue !== oldValue) {
    			search();
    		}
    	});
    }]);
}(_));