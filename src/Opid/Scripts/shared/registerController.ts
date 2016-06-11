/// <reference path="../../typings/browser.d.ts" />

namespace opid.shared {
	class RegisterController {
		public usStates: altsrc.UsState[];
		public errors: string[];
		private registerForm: ng.IFormController;

		// auto-filled for ease of testing
		public firstName: string = 'test';
		public lastName: string = 'test';
		public email: string;
		public phone: string = '1231231234';
		public password: string = 'Password!23';
		public confirmPassword: string = 'Password!23';
		public shippingAddress: Object = {
			street: 'blah',
			city: 'blah',
			state: 'OR',
			zip: '12435'
		};
		public creditCardNumber: string = '1234123412341234';
		public creditCardExpiration: string = '1212';
		public ccid: string = '1234';
		public billingAddress: Object = {
			useShippingAddress: true
		};
		// end auto-filled for ease of testing

		constructor(
			private $state: any,
			private user: IUserService,
			usStateService: altsrc.UsStateService) {
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
