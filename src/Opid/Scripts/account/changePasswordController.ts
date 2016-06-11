/// <reference path="../../typings/browser.d.ts" />

namespace opid.account {
	class ChangePasswordController {
		isChanged: boolean;
		errors: string[];
		oldPassword: string;
		newPassword: string;
		confirmPassword: string;
		changePasswordForm: ng.IFormController;

		constructor(public user: shared.IUserService) { }
				
		public submit() {
			this.user.changePassword(this.oldPassword, this.newPassword, this.confirmPassword)
				.then(() => {
					this.isChanged = true;
				}, (response: any) => {
					this.errors = response.data.errors;
					this.changePasswordForm.$setPristine();
				});
		}
	}

    angular.module('opidApp').controller('changePasswordController', ChangePasswordController);
}