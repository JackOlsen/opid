(function (_) {
	'use strict';

	// begin mock database
	var entries = [];
	for (var i = 1; i < 100; i++) {
		entries.push({
			entryId: i,
			diagnosis: "Spongiatic dermatitus",
			description: 'Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation.',
			images: [
				{
					fileName: "BarnhillDermPath-024-0007.png",
					description: "Distinguishing benign from malignant neoplasms by low-power microscopic features.Characteristic acanthosis, hyperkeratosis, and keratin pseudocyst formation in seborrheic keratosis are easy to detect (left). Similar features are evident in a benign keratosis due to chronic irritation (right).(DermPathBarnhill, FIGURE 1-2)",
				},
				{
					fileName: "BarnhillDermPath-024-0008.png",
					description: "Combining epidermal changes and reaction patterns in diagnosis. Even at low magniﬁcation, the regular pattern of acanthosis and hyperkeratosis seen in squamous cell carcinoma in situ (right) is contrasted with the irregular squamous proliferation, abnormal maturation, and robust inﬂammatoryinﬁltrate associated with invasive squamous cell carcinoma (middle). Examination at higher magniﬁcation reveals inﬁltrating tumor cells (right panel, arrow).(DermPathBarnhill, FIGURE 1-3)",
				},
				{
					fileName: "BarnhillDermPath-026-0009.png",
					description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right). Blah blah blah. This is the description for image 3.",
				},
				{
					fileName: "BarnhillDermPath-027-0010.png",
					description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
				}
			]
		});
	}
	var database = {};
	database.entries = entries;
	// end mock database

	angular.module("opid").service("database", ["$q", function ($q) {
		var self = this;

		self.getEntry = function (entryId) {
			return $q.when(_.find(database.entries, { 'entryId': parseInt(entryId) }));
		};
		self.searchEntries = function (searchText, page, pageSize) {
			return $q.when({
				results: _.take(_.slice(database.entries, (page - 1) * pageSize), pageSize),
				resultCount: entries.length
			});
		};

		return self;
	}]);
}(_));