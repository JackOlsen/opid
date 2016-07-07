(function (_, $) {
	'use strict';
    var opidApp = angular.module("opid", ["ui.router", "ngMask", "ui.bootstrap"]);

    var configureHttpProvider = function ($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$window',
            function ($q, $window) {
                return {
                    responseError: function (rejection) {
                        if (rejection.status !== 401) {
                            throw rejection;
                        } else {
                            var herePath = ($window.location.pathname || '').toLowerCase();
                            if (herePath !== "/" &&
                                herePath !== '/login' &&
                                herePath !== '/login/') {
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

    var attachExceptionHandling = function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
            var tryDefaultHandling = function (exception, cause) {
                try {
                    // default $delegate just logs to console
                    $delegate(exception, cause);
                }
                catch (e) {
                }
            };
            return function (exception, cause) {
                // wrapping this to avoid potential loop
                try {
                    if (exception.status !== 400) {
                        $('#error-modal').modal('show');
                        tryDefaultHandling(exception, cause);
                    }
                }
                catch (e) {
                    tryDefaultHandling(e, 'error while attempting to log another error');
                }
            };
        }]);
    };

    opidApp.config(["$locationProvider", "$urlMatcherFactoryProvider", "$urlRouterProvider", "$stateProvider", "$httpProvider", "$provide", 
        function ($locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $stateProvider, $httpProvider, $provide) {
            configureHttpProvider($httpProvider);
            attachExceptionHandling($provide);
            $locationProvider.html5Mode({ enabled: true, requireBase: false });
            $urlMatcherFactoryProvider.caseInsensitive(true);
			
            $urlRouterProvider.otherwise("/gallery/1");
            $stateProvider
				.state("gallery", {
					url: "/gallery/:page/:searchText",
					params: {
						page: {
							value: "1"
						},
						searchText: {
							value: "",
							squash: true
						}
					},
					views: {
						"main@": {
							templateUrl: "/Scripts/app/gallery/_gallery.html",
							controller: "galleryController",
							controllerAs: "vm"
						}
					},
					resolve: {
						searchResults: ["database", "$stateParams", function (database, $stateParams) {
							return database.searchEntries(
								$stateParams.searchText,
								$stateParams.page,
								12);
						}]
					}
				})
				.state("entry", {
					url: "/entry/{entryId:[0-9]*}",
					views: {
						"main@": {
							templateUrl: "/Scripts/app/gallery/_entry.html",
							controller: "entryController",
							controllerAs: "vm"
						}
					},
					resolve: {
						entry: ["database", "$stateParams", function (database, $stateParams) {
							return database.getEntry($stateParams.entryId);
						}]
					}
				})
        		.state("contribute", {
        			url: "/contribute",
        			views: {
        				"main@": {
        					templateUrl: "/Scripts/app/contribute/_contribute.html",
        					controller: "contributeController",
							controllerAs: "vm"
        				}
        			}
        		});
        }]);
}(_, $));