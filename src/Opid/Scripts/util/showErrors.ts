/// <reference path="../../typings/browser.d.ts" />

namespace opid.util {

	const errorMessages: { [key: string]: string } = {};
	errorMessages["required"] = "This field is required.";
	errorMessages["email"] = "Invalid email.";
	errorMessages["mask"] = "Invalid input.";
	errorMessages["pattern"] = "Invalid input.";
	errorMessages["compareTo"] = "Fields don\"t match.";
	errorMessages["fileSize"] = "File is too large.";

	angular.module("util").directive("showErrors", function () {
		return {
			restrict: "A",
			compile: function (element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
				const formName: string = attrs["showErrors"];
				_.forEach(element.find(".form-group"), function (formGroup) {
					// find the named input for this form-group
					const inputControl: JQuery = angular.element(formGroup).find(".validated-control").last();
					const inputName: string = inputControl.attr("name");

					// let's register an ng-class directive that binds the form input validity to bootstrap's validity classes
					angular.element(formGroup).attr("ng-class", "{ \
						'has-error'		: "+ formName + ".$submitted && " + formName + "." + inputName + ".$invalid , \
						'has-success'	: "+ formName + ".$submitted && " + formName + "." + inputName + ".$valid \
					}");

					if (!inputControl.length || !inputControl[0].hasAttribute("no-error-messages")) {
						let placeToAppendErrors: JQuery = angular.element(formGroup).find(".input-group").last();
						if (_.isEmpty(placeToAppendErrors)) {
							placeToAppendErrors = inputControl;
						}
						// add all the possible error messages and bind their visibility to the element's $error
						_.forEach(_.keys(errorMessages), function (errKey: string) {
							angular.element(placeToAppendErrors).after("<p class=\"help-block\" ng-class=\"{hidden: !" + formName + ".$submitted || !" + formName + "." + inputName + ".$error." + errKey + "}\">" + errorMessages[errKey] + "</p>");
						});
					}
				});

				return function (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, controller: ng.INgModelController) { };
			}
		};
	});
}