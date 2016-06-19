(function ($) {
	angular.module("opid").controller("entryController", ["$scope", "entry", "$state",
		function ($scope, entry, $state) {
    	var self = this;
    	if (!entry) {
    		$state.go("gallery");
    	}
    	self.entry = entry;

    	var $panzoom = $("#panzoom").panzoom({
    		minScale: 1
    	});
    	$panzoom.parent().on('mousewheel.focal', function (e) {
    		e.preventDefault();
    		var delta = e.delta || e.originalEvent.wheelDelta;
    		var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
    		$panzoom.panzoom('zoom', zoomOut, {
    			increment: 0.1,
    			animate: false,
    			focal: e
    		});
    	});

    	self.resetPanZoom = function () {
    		$panzoom.panzoom("reset");
    	};
    }]);
}($));