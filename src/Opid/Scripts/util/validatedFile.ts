/// <reference path="../../typings/browser.d.ts" />

namespace opid.util {
	class ValidatedFile implements ng.IDirective {
		require: string = "ngModel";
		scope: Object = {};

		constructor() { }

		link: ng.IDirectiveLinkFn = (
			scope: ng.IScope,
			element: ng.IAugmentedJQuery,
			attributes: ng.IAttributes,
			ngModel: ng.INgModelController) => {
			element.bind('change', function () {
				scope.$apply(function () {
					ngModel.$setViewValue(element.val());
					ngModel.$render();
				});
			});
		}
	}

	angular.module('util').directive('validatedFile', () => new ValidatedFile());
}