/// <reference path="../../typings/browser.d.ts" />

namespace opid.account {
	class AccountController {

		constructor(public user: shared.IUser) { }
	}

	angular.module('opidApp').controller('accountController', AccountController);
}
