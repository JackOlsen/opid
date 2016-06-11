/// <reference path="../../typings/browser.d.ts" />

namespace opid.util {
	interface ICompareToScope extends ng.IScope {
		otherModelValue: any;
	}
	interface ICompareToValidator extends ng.IModelValidators {
		compareTo: any;
	}
	interface ICompareToModelController extends ng.INgModelController {
        $validators: ICompareToValidator;
	}

	class CompareTo implements ng.IDirective {
		require: string = "ngModel";
		scope: Object = {
			otherModelValue: "=compareTo"
		};
        
        link: ng.IDirectiveLinkFn = (
            scope: ICompareToScope,
            element: ng.IAugmentedJQuery,
            attributes: ng.IAttributes,
            ngModel: ICompareToModelController) => {
            ngModel.$validators.compareTo = function (modelValue: any) {
                return modelValue == scope.otherModelValue;
            };
            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        };
	}

	angular.module("util").directive("compareTo", () => new CompareTo());
}