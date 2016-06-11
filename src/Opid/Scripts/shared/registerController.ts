/// <reference path="../../typings/browser.d.ts" />

namespace opid.shared {
	class RegisterController {
        public usStates: util.UsState[];
		public errors: string[];
		private registerForm: ng.IFormController;

		// auto-filled for ease of testing
		public firstName: string = 'test';
		public lastName: string = 'test';
		public email: string;
		public password: string = 'Password!23';
		public confirmPassword: string = 'Password!23';		
		// end auto-filled for ease of testing

		constructor(
			private $state: any,
			private user: IUserService,
            usStateService: util.UsStateService) {
			this.usStates = usStateService.getStates();
		}

		public submit() {
			this.errors = [];
			this.user.register(this.email, this.password, this.confirmPassword)
				.then(() => {
					this.$state.go('app.account');
				}, (response: any) => {
					this.errors = response.data.errors;
					this.registerForm.$setPristine();
				});
		}
	}

	angular.module('opidApp').controller('registerController', RegisterController);
}
