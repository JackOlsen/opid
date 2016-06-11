/// <reference path="../../typings/browser.d.ts" />

namespace opid.account {
    const opidApp = angular.module('opidApp');
		
    opidApp.config(function ($stateProvider: ng.ui.IStateProvider) {
		$stateProvider
			.state('app.account', {
				url: '/account',
				views: {
					'main@': {
						templateUrl: '/app/account/_account.html',
						controller: 'accountController',
						controllerAs: 'vm'
					}
				}
			})
			.state('app.account.changePassword', {
				url: '/changePassword',
				views: {
					'main@': {
						templateUrl: '/app/account/_changePassword.html',
						controller: 'changePasswordController',
						controllerAs: 'vm'
					}
				}
			});
	});
}
