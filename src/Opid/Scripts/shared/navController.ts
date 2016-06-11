/// <reference path="../../typings/browser.d.ts" />

namespace opid.shared {
	class NavController {
		constructor(
			public $state: ng.ui.IStateService,
			public user: IUserService) { }

		public logOff(): void {
			this.user.logoff()
				.then(() => {
					this.$state.go('app.login');
				}, (response: any) => {
					alert(response.data[0]);
				});
		}
	}

	angular.module('opidApp').controller('navController', NavController);
}
