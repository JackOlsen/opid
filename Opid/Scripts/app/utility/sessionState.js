(function () {
	angular.module("opid").service("sessionState", [function () {
		var self = this;

		self.searchState = {
			searchText: '',
			page: 1,
			pageSize: 12
		};

		return self;
	}]);
}());