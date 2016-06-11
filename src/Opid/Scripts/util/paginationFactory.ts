/// <reference path="../../typings/browser.d.ts" />

namespace opid.util {
	export class PaginationArg {
		constructor(
			public name: string,
			public watch: boolean = true,
			public throttle: number = 250,
			public initialValue: any = null) { }
	}

	export interface IPaginationFactory<TResult> {
		getPaginator(params: PaginationParams<TResult>): Paginator<TResult>;
	}

	export class PaginationParams<TResult> {
		orderBy: string;
		orderDesc: boolean;

		[name: string]: any;

		constructor(
			public scope: ng.IScope,
			public getItems: (params: PaginationParams<any>) => ng.IPromise<any>,
			initialOrderBy: string = "",
			initialOrderDesc: boolean = false,
			public additionalArgs: PaginationArg[] = new Array<PaginationArg>(),
			public getImmediately: boolean = false,
			public pageNumber: number = 1,
			public pageSize: number = 10) {
			this.orderBy = initialOrderBy;
			this.orderDesc = initialOrderDesc;
		}
	}

	interface IPaginationResponse<TResult> {
		data: TResult[];
		headers: (key: string) => number;
	}

	const defaultThrottling: number = 10;

	class Paginator<TResult> {
		results: TResult[];
		itemCount: number = 0;

		constructor(public queryParams: PaginationParams<TResult>) { }

		public init(): void {
			const p: Paginator<TResult> = this;
			this.queryParams.scope.$watchGroup([
				function () { return p.queryParams.pageNumber; },
				function () { return p.queryParams.pageSize; },
				function () { return p.queryParams.orderBy; },
				function () { return p.queryParams.orderDesc; }
			], _.debounce(function (newValues: Array<string | number>, oldValues: Array<string | number>) {
				if (!_.isEqual(newValues, oldValues)) {
					p.getItems();
				}
			}, defaultThrottling));

			_.forEach(this.queryParams.additionalArgs, function (arg: PaginationArg) {
				p.queryParams[arg.name] = arg.initialValue;
				if (arg.watch) {
					p.queryParams.scope.$watch(function () {
						return p.queryParams[arg.name];
					}, _.debounce(function (newValue: string | number, oldValue: string | number) {
						if (!_.isEqual(newValue, oldValue)) {
							p.getItems();
						}
					}, arg.throttle || defaultThrottling));
				}
			});

			if (this.queryParams.getImmediately !== false) {
				this.getItems();
			}
        }

        public getItems(): void {
			this.queryParams.getItems(this.queryParams)
				.then((response: IPaginationResponse<TResult>) => {
					this.results = response.data;
					this.itemCount = response.headers("item-count");
				});
		}

		public hasMultiplePages(): boolean {
			return this.itemCount > this.queryParams.pageSize;
		}
	}

	class PaginationFactory<TResult> {
		public getPaginator(params: PaginationParams<TResult>) {
			const p = new Paginator(params);
			p.init();
			return p;
		}
	}

	angular.module("util").service("paginationFactory", PaginationFactory);
}