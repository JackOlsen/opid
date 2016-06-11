/// <reference path="../../typings/browser.d.ts" />

namespace opid.shared {
	class LoginController {
		errors: string[];
		email: string;
		password: string;
		loginForm: ng.IFormController;

		constructor(public user: shared.IUserService, private $state: ng.ui.IStateService) { }

		public submit() {
			this.errors = [];
			this.user.login(this.email, this.password)
				.then(() => {
					this.$state.go('app.account');
				}, (response: any) => {
					this.errors = response.data.errors;
					this.loginForm.$setPristine();
				});
		}
	}

	angular.module('opidApp').controller('loginController', LoginController);
}
