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
	entries.push({
		entryId: 4,
		image: "BarnhillDermPath-027-0010.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 5,
		image: "BarnhillDermPath-027-0011.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 6,
		image: "BarnhillDermPath-029-0012.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 7,
		image: "BarnhillDermPath-030-0013.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 8,
		image: "BarnhillDermPath-030-0014.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 9,
		image: "BarnhillDermPath-030-0015.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 10,
		image: "BarnhillDermPath-031-0016.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 11,
		image: "BarnhillDermPath-032-0017.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 12,
		image: "BarnhillDermPath-032-0018.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 13,
		image: "BarnhillDermPath-037-0019.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 14,
		image: "BarnhillDermPath-037-0020.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
	entries.push({
		entryId: 15,
		image: "BarnhillDermPath-038-0021.png",
		description: "Spongiotic dermatitis, acute versus chronic changes. Spongiosis and neutrophilic crustare characteristic of a self-limited contact dermatitis (left). In contrast, chronic spongiotic dermatitis results in dermal ﬁbrosis and vascular proliferation (right).(DermPathBarnhill, FIGURE 1-9)",
		diagnosis: "Spongiatic dermatitus"
	});
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