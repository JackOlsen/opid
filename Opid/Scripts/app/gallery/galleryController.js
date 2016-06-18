(function (_) {
	angular.module("opid").controller("galleryController", ["searchResults", "$state", "sessionState",
		function (searchResults, $state, sessionState) {
    	var self = this;

    	self.searchState = sessionState.searchState;
    	self.searchResults = searchResults;

		var reloadGallery = function () {
			$state.go("gallery", {}, { reload: true });
		}

		self.search = function () {
			self.searchState.page = 1;
			reloadGallery();
		};

		self.pageChanged = function () {
			reloadGallery();
		};
    }]);
}(_));