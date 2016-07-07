(function () {
	'use strict';

	angular.module("opid").directive("entryImages", ['$timeout', '$compile', function ($timeout, $compile) {
		return {
			restrict: "E",
			replace: true,
			templateUrl: "/Scripts/app/gallery/_entryImages.html",
			scope: {
				entry: "="
			},
			link: function (scope, element, attrs, ngModel) {
				scope.selectedImage = null;

				var $panzoom;
				scope.resetPanZoom = function () {
					if ($panzoom) {
						$panzoom.panzoom("reset");
					}
    			};

				$timeout(function () {
					var slideshow = angular.element("#slideshow").pgwSlideshow({
						displayControls: false,
						touchControls: false,
						beforeSlide: function(id){
							var elem = angular.element(".ps-current .elt_" + id + " img");
							elem.panzoom("reset");
							elem.panzoom("destory");
						},
						afterSlide: function (id) {
						    scope.$apply(function () { 
						        scope.selectedImage = scope.entry.images[id - 1];
						    });
							$panzoom = angular.element(".ps-current .elt_" + id + " img").panzoom({
								minScale: 1,
								contain: false
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
						}
					});
					element.css("visibility", "visible");
				});
			}
		}
	}]);
}());