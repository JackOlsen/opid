/// <reference path="../../typings/browser.d.ts" />

namespace opid.util {
	export class UsState {
		constructor(public abbreviation: string, public name: string) {	}
	}
	const states: UsState[] = [
		new UsState('AL', 'Alabama'),
		new UsState('AK', 'Alaska'),
		new UsState('AZ', 'Arizona'),
		new UsState('AR', 'Arkansas'),
		new UsState('CA', 'California'),
		new UsState('CO', 'Colorado'),
		new UsState('CT', 'Connecticut'),
		new UsState('DE', 'Delaware'),
		new UsState('FL', 'Florida'),
		new UsState('GA', 'Georgia'),
		new UsState('HI', 'Hawaii'),
		new UsState('ID', 'Idaho'),
		new UsState('IL', 'Illinois'),
		new UsState('IN', 'Indiana'),
		new UsState('IA', 'Iowa'),
		new UsState('KS', 'Kansas'),
		new UsState('KY', 'Kentucky'),
		new UsState('LA', 'Louisiana'),
		new UsState('ME', 'Maine'),
		new UsState('MD', 'Maryland'),
		new UsState('MA', 'Massachusetts'),
		new UsState('MI', 'Michigan'),
		new UsState('MN', 'Minnesota'),
		new UsState('MS', 'Mississippi'),
		new UsState('MO', 'Missouri'),
		new UsState('MT', 'Montana'),
		new UsState('NE', 'Nebraska'),
		new UsState('NV', 'Nevada'),
		new UsState('NH', 'New Hampshire'),
		new UsState('NJ', 'New Jersey'),
		new UsState('NM', 'New Mexico'),
		new UsState('NY', 'New York'),
		new UsState('NC', 'North Carolina'),
		new UsState('ND', 'North Dakota'),
		new UsState('OH', 'Ohio'),
		new UsState('OK', 'Oklahoma'),
		new UsState('OR', 'Oregon'),
		new UsState('PA', 'Pennsylvania'),
		new UsState('RI', 'Rhode Island'),
		new UsState('SC', 'South Carolina'),
		new UsState('SD', 'South Dakota'),
		new UsState('TN', 'Tennessee'),
		new UsState('TX', 'Texas'),
		new UsState('UT', 'Utah'),
		new UsState('VT', 'Vermont'),
		new UsState('VA', 'Virginia'),
		new UsState('WA', 'Washington'),
		new UsState('WV', 'West Virginia'),
		new UsState('WI', 'Wisconsin'),
		new UsState('WY', 'Wyoming')
	];

	export class UsStateService {
		getStates(): UsState[] {
			return states;
		}
	}

	angular.module('util').service('usStateService', UsStateService);
}