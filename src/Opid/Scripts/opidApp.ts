/// <reference path="../typings/browser.d.ts" />

namespace opid {
	const opidApp = angular.module('opidApp', ['util', 'ui.router', 'ngMask', 'ui.bootstrap']);
	
	const configureHttpProvider = function ($httpProvider: ng.IHttpProvider) {
		$httpProvider.interceptors.push(['$q', '$window',
			function ($q: ng.IQService, $window: ng.IWindowService) {
				return {
					responseError: function (rejection) {
						if (rejection.status !== 401) {
							throw rejection;
						} else {
							const herePath = ($window.location.pathname || '').toLowerCase();
							if (herePath != "/" &&
								herePath != '/login' &&
								herePath != '/login/') {
								// todo: this has not been tested, and there's definitely nothing handling the return url yet
								$window.location.href = '/login?returnUrl=' + encodeURIComponent(herePath);
							}
						}
						return $q.reject(rejection);
					}
				};
			}]);
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	};

	interface IExceptionError {
		status?: number;
	}

	const attachExceptionHandling = function ($provide: ng.auto.IProvideService) {
		$provide.decorator('$exceptionHandler', ['$delegate', function ($delegate: (exception: IExceptionError, cause: string) => void) {
			const tryDefaultHandling = function (exception: IExceptionError, cause: string) {
				try {
					// default $delegate just logs to console
					$delegate(exception, cause);
				} catch (e) {
					// if console logging fails, don't try anything else.
				}
			};

			return function (exception: IExceptionError, cause: string) {
				// wrapping this to avoid potential loop
				try {
					if (exception.status != 400) {
						(<any>$('#error-modal')).modal('show');
						tryDefaultHandling(exception, cause);
					}
				} catch (e) {
					tryDefaultHandling(e, 'error while attempting to log another error');
				}
			};
		}]);
	};

	opidApp.config(function (
		$locationProvider: ng.ILocationProvider,
		$urlMatcherFactoryProvider: ng.ui.IUrlMatcherFactory,
		$urlRouterProvider: ng.ui.IUrlRouterProvider,
		$stateProvider: ng.ui.IStateProvider,
		$httpProvider: ng.IHttpProvider,
		$provide: ng.auto.IProvideService) {

		configureHttpProvider($httpProvider);

		attachExceptionHandling($provide);

		$locationProvider.html5Mode({ enabled: true, requireBase: false });
		$urlMatcherFactoryProvider.caseInsensitive(true);

		$urlRouterProvider.otherwise('/account');

		$stateProvider
			.state('app', {
				abstract: true,
				url: '',
				views: {
					'nav@': {
						templateUrl: '/app/shared/_nav.html',
						controller: 'navController',
						controllerAs: 'navCtrl'
					}
				},
				data: {
					auth: true
				},
				resolve: {
					loadUser: function (user: shared.IUserService) {
						return user.loadUser();
					}
				}
			})
			.state('app.login', {
				url: '/login',
				views: {
					'main@': {
						templateUrl: '/app/shared/_login.html',
						controller: 'loginController',
						controllerAs: 'vm'
					}
				},
				data: {
					auth: false
				},
			})
			.state('app.register', {
				url: '/register',
				views: {
					'main@': {
						templateUrl: '/app/shared/_register.html',
						controller: 'registerController',
						controllerAs: 'vm'
					}
				},
				data: {
					auth: false
				},
			})
			.state('app.forgotPassword', {
				url: '/forgotPassword',
				views: {
					'main@': {
						templateUrl: '/app/shared/_forgotPassword.html',
						controller: 'forgotPasswordController',
						controllerAs: 'vm'
					}
				},
				data: {
					auth: false
				},
			});
	});

	opidApp.run(function (
		$rootScope: ng.IRootScopeService,
		user: shared.IUserService,
		$state: ng.ui.IStateService) {

		$rootScope.$on('$stateChangeStart', function (
			event: ng.IAngularEvent,
			toState: ng.ui.IState,
			toParams: ng.ui.IStateOptions,
			fromState: ng.ui.IState,
			fromParams: ng.ui.IStateOptions) {
			return user.loadUser().then(function () {
				if (toState.data.auth && !user.userName) {
					event.preventDefault();
					$state.go('app.login');
					return false;
				} else if (!toState.data.auth && user.userName) {
					event.preventDefault();
					$state.go('app.account');
					return false;
				}
			});
		});
	});
}