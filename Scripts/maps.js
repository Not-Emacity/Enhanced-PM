const makeCorrections = new Map([
	["VOLVO TRUCK", "Volvo"],
	["IC BUS", "IC"],
	["UTILITY TRAILER MANUFACTURER", "Utility"],
	["WABASH VANS", "Wabash"],
	["WABASH", "Wabash"],
	["HYUNDAI TRANSLEAD TRAILERS", "Translead"],
	["FONTAINE TRAILER CO.", "Fontaine"],
	["GREAT DANE TRAILERS", "Great Dane Trailers"],
	["SPARTAN MOTORS CHASSIS", "Spartan"],
	["VANDERHALL MOTOR WORKS", "Vanderhall"],
	["INDIAN MOTORCYCLE", "Indian"]
]);

const modelCorrections = new Map([
	["Giulia (952)", "Giulia"],
	["124 Spider", "124"],
	["740-series", "740"],
	["New Superbike (SBK)", "Panigale"],
	["SS900/900 SPORT", "MH900e"],
	["X 1/9", "X1/9"],
	["790/890 Duke, R", "Duke"],
	["548CH", "T270"],
	["XJ6", "XJ"],
	["XJ8", "XJ"],
	["Captiva Sport", "Captiva"],
	["LF627", "ProStar"],
	["LF687", "ProStar"],
	["Bolt EV", "Bolt"],
	["4-Runner", "4Runner"],
	["CST120", "Century"],
	["PB105", "CE"],
	["YZF-R1", "YZF"],
	["L125 (Monkey)", "Monkey"],
	["LA687", "ProStar"],
	["NISSAN Z", "Z"],
	["LT62F", "LT"],
	["LT625", "LT"],
	["LT62T", "LT"],
	["Town and Country", "Town&Country"],
	["MA025", "DuraStar"],
	["EQB-Class", "EQB"],
	["BB Conventional", "Vision"],
	["USF-1E", "FLD"]
]);

const trailerMakes = new Set([
	"Utility",
	"Wabash",
	"Fontaine",
	"Reitnouer",
	"Cimc",
	"Vanguard National",
	"Stoughton Trailers",
	"Manac",
	"Translead",
	"Great Dane Trailers"
]);
