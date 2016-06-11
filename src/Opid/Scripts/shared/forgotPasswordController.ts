/// <reference path="../../typings/browser.d.ts" />

namespace opid.shared {
	class ForgotPasswordController {
		public isReset: boolean;
		public email: string;

		constructor(public user: IUserService) { }

		public submit(): void {
			this.user.forgotPassword(this.email)
				.then(() => {
					this.isReset = true;
				});
		}
	}

	angular.module('opidApp').controller('forgotPasswordController', ForgotPasswordController);
}
