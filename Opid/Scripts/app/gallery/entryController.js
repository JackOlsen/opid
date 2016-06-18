(function () {
    angular.module("opid").controller("entryController", ["entry", function (entry) {
    	var self = this;
    	self.entry = entry;
    }]);
}());