/// <reference path="../../typings/browser.d.ts" />

namespace opid.examples {
	export class userListController {
		pagination: any;

		constructor(
			private $http: ng.IHttpService,
			$scope: ng.IScope,
			paginationFactory: altsrc.IPaginationFactory<any>) {
			this.pagination = paginationFactory.getPaginator(new altsrc.PaginationParams(
				$scope,
				this.getUsers,
				'username',
				true,
				[new altsrc.PaginationArg('searchText', true, 250)],
				true,
				1,
				2));
		}

		private getUsers = (params: altsrc.PaginationParams<any>) => {
			return this.$http({
				url: '/api/Example/GetUsers',
				method: 'GET',
				params: params
			});
		}
	}

	angular.module('opidApp').controller('userListController', userListController);
}