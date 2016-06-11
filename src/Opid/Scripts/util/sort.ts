/// <reference path="../../typings/browser.d.ts" />

namespace opid.util {
	interface ISortScope extends ng.IScope {
		isSorted: () => boolean;
		order: string;
		by: string;
		orderDesc: boolean;
		sortStatusIcon: () => string;
		onClick: () => void;
	}

	class Sort implements ng.IDirective {
		restrict: string = "A";
		transclude: boolean = true;
		templateUrl: string = "/app/util/_sorter.html";
		scope: Object = {
			order: '=',
			by: '=',
			orderDesc: '=',
			sortIcon: '@'
		}

		constructor() { }

		link: ng.IDirectiveLinkFn = (
			scope: ISortScope,
			element: ng.IAugmentedJQuery,
			attributes: ng.IAttributes) => {
			scope.isSorted = function () {
				return scope.order === scope.by;
			};
			scope.sortStatusIcon = function () {
				if (!scope.isSorted()) {
					return '';
				}
				return scope.orderDesc ? 'icon-triangle-up' : 'icon-triangle-down';
			};
			scope.onClick = function () {
				if (scope.order === scope.by) {
					scope.orderDesc = !scope.orderDesc
				} else {
					scope.by = scope.order;
					scope.orderDesc = false;
				}
			};
		}
	}

	angular.module('util').directive('sort', () => new Sort());
}