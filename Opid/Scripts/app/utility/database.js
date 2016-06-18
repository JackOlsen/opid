(function (_) {

	// begin mock database
	var entries = [];
	entries.push({
		entryId: 1,
		image: "BarnhillDermPath-024-0007.png",
		description: "Distinguishing benign from malignant neoplasms by low-power microscopic features.Characteristic acanthosis, hyperkeratosis, and keratin pseudocyst formation in seborrheic keratosis are easy to detect (left). Similar features are evident in a benign keratosis due to chronic irritation (right).(DermPathBarnhill, FIGURE 1-2)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 2,
		image: "BarnhillDermPath-024-0008.png",
		description: "Combining epidermal changes and reaction patterns in diagnosis. Even at low magniﬁcation, the regular pattern of acanthosis and hyperkeratosis seen in squamous cell carcinoma in situ (right) is contrasted with the irregular squamous proliferation, abnormal maturation, and robust inﬂammatoryinﬁltrate associated with invasive squamous cell carcinoma (middle). Examination at higher magniﬁcation reveals inﬁltrating tumor cells (right panel, arrow).(DermPathBarnhill, FIGURE 1-3)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 3,
		image: "BarnhillDermPath-026-0009.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	var database = {};
	database.entries = entries;
	// end mock database

	angular.module("opid").service("database", [function () {
		var self = this;

		self.getEntry = function (entryId) {
			var entry = _.find(database.entries, { 'entryId': parseInt(entryId) });
			return entry;
		};

		return self;
	}]);
}(_));