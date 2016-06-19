(function (_) {
	angular.module("opid").controller("galleryController", ["searchResults", "$state", "$stateParams",
		function (searchResults, $state, $stateParams) {
    	var self = this;

    	self.searchText = $stateParams.searchText;
    	self.page = $stateParams.page;
    	self.pageSize = 12;
    	self.searchResults = searchResults;

    	self.search = function () {
    		$state.go("gallery", {
    			searchText: self.searchText,
    			page: 1
    		});
    	};

    	self.onPageChange = function () {
    		$state.go("gallery", {
    			searchText: self.searchText,
    			page: self.page
    		});
    	};
    }]);
}(_));