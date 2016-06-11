/// <reference path="../../typings/browser.d.ts" />

namespace opid.shared {
	export interface IUser {
		userName: string;
	}

	interface IUserResponse {
		data: IUser
	}

	export interface IUserService extends IUser {
		loadUser: () => ng.IPromise<boolean>;
		forgotPassword: (email: string) => ng.IPromise<any>;
		register: (email: string, password: string, confirmPassword: string) => ng.IPromise<IUserResponse>;
		login: (email: string, password: string) => ng.IPromise<IUserResponse>;
		changePassword: (oldPassword: string, newPassowrd: string, confirmPassword: string) => ng.IPromise<any>;
		logoff: () => ng.IPromise<IUserResponse>;
	}

	class UserService implements IUser, IUserService {

		public userName: string;

		constructor(private $http: ng.IHttpService) { }

		private userPromise: ng.IPromise<any>;
		private populateUser = (response: IUserResponse) => {
			this.userName = response.data.userName;
			return response;
		}

		private clearUser = (response: IUserResponse) => {
			this.userName = null;
			this.userPromise = null;
			return response;
		}

		private postAsForm<TResponse>(url: string, data: Object): ng.IPromise<TResponse> {
			return this.$http({
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				url: url,
				data: $.param(data)
			});
		}

		public loadUser(): ng.IPromise<boolean> {
			if (!this.userPromise) {
				this.userPromise = this.$http.get('/api/Api/GetUser')
					.then(this.populateUser);
			}
			return this.userPromise;
		}

		public forgotPassword(email: string): ng.IPromise<any> {
			return this.postAsForm<any>('/api/Api/ForgotPassword', {
				Email: email,
			});
		}

		public register(email: string, password: string, confirmPassword: string): ng.IPromise<IUserResponse> {
			return this.postAsForm<IUserResponse>('/api/Api/Register', {
				Email: email,
				Password: password,
				ConfirmPassword: confirmPassword
			}).then(this.populateUser);
		}

		public login(email: string, password: string): ng.IPromise<IUserResponse> {
			return this.postAsForm<IUserResponse>('/api/Api/Login', {
				Email: email,
				Password: password
			}).then(this.populateUser);
		}

		public changePassword(oldPassword: string, newPassword: string, confirmPassword: string): ng.IPromise<any> {
			return this.postAsForm<any>('/api/Api/ChangePassword', {
				OldPassword: oldPassword,
				NewPassword: newPassword,
				ConfirmPassword: confirmPassword
			});
		}

		public logoff(): ng.IPromise<IUserResponse> {
			return this.postAsForm<IUserResponse>('/api/Api/LogOff', {})
				.then(this.clearUser);
		}
	}
	angular.module('opidApp').service('user', UserService);
}