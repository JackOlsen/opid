(function ($) {
	'use strict';
	angular.module("opid").controller("entryController", ["$scope", "entry", "$state",
		function ($scope, entry, $state) {
    	var self = this;
    	if (!entry) {
    		$state.go("gallery");
    	}
    	self.entry = entry;
    }]);
}($));