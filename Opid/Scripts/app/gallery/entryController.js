(function () {
    angular.module("opid").controller("entryController", ["entry", "$state", function (entry, $state) {
    	var self = this;
    	if (!entry) {
    		$state.go("gallery");
    	}
    	self.entry = entry;
    }]);
}());