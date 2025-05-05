document.querySelector("#frm > fieldset:nth-child(3) > section:nth-child(1)").outerHTML += '<button class="btn-u" type="button" onclick="runPlate();">Run Plate</button>';
const standard = ["ABC123", "123ABC"];
const fourDigit = ["ABC1234", "1234ABC"];

const singleFormats = new Map([
	["AK", "ABC123"],
	["HI", "ABC123"],
	["MT", "ABC123"],
	["VT", "ABC123"],
	["TX", "ABC1234"],
	["MS", "ABC1234"],
	["AZ", "ABC1234"],
	["NY", "ABC1234"],
	["OH", "ABC1234"],
	["NC", "ABC1234"],
	["PA", "ABC1234"],
	["MD", "1AB2345"],
	["IL", "X12 3456"],
	["AR", "123ABC"],
	["CT", "123ABC"],
	["DC", "AB1234"],
	["CA", "1ABC234"]
]);

const multiFormats = new Map([
	["OK", standard],
	["UT", ["A123BC", "123ABC"]],
	["LA", standard],
	["NM", standard],
	["KS", standard],
	["ND", standard],
	["MN", standard],
	["IA", standard],
	["CO", standard],
	["OR", standard],
	["SC", standard],
	["GA", fourDigit],
	["VA", fourDigit],
	["MI", ["ABC123", "ABC1234"]],
	["NE", ["ABC123", "123AB"]],
	//Separate tables for 123ABC hyphenated
	["NV", ["ABC123", "123ABC", "12A345", "123A45"]],
	["IN", ["ABC123", "123ABC", "123AB", "123A"]],
	//Separate tables for ABC123 hyphenated
	["KY", ["ABC123", "123ABC", "A1B234"]],
	["ME", ["1234AB", "123ABC"]]
]);

const sixDigit = new Map([
	["OK", "1"],
	["LA", "151"],
	["NM", "183"],
	["KS", "3402"],
	["ND", "4102"],
	["MN", "171"],
	["IA", "191"],
	["CO", "132"],
	["OR", "401"],
	["SC", "2301"],
	["MI", "82"],
	["NE", "3601"],
	["NV", "204"],
	["IN", "604"]
]);

const sixDigitFlip = new Map([
	["OK", "2"],
	["UT", "2"],
	["LA", "152"],
	["NM", "181"],
	["KS", "3401"],
	["ND", "4101"],
	["MN", "172"],
	["IA", "192"],
	["CO", "133"],
	["OR", "402"],
	["SC", "2302"],
	["KY", "161"],
	["IN", "601"]
]);

const sevenDigit = new Map([
	["GA", "91"],
	["VA", "61"],
	["MI", "83"]
]);

//MAPS MOVED OUT

async function runPlate() {
	let plate = new FormData(document.forms.frm).get('nomer');
	let stateID = new FormData(document.forms.frm).get('drop_1');
	const newLetterCombo = "#CheckBox13";
	const dict = new Map([
		["7502", "AL"],
		["7501", "AK"],
		["7504", "AZ"],
		["7503", "AR"],
		["7505", "CA"],
		["7506", "CO"],
		["7507", "CT"],
		["7508", "DE"],
		["7551", "DC"],
		["7509", "FL"],
		["7510", "GA"],
		["7511", "HI"],
		["7513", "ID"],
		["7514", "IL"],
		["7515", "IN"],
		["7512", "IA"],
		["7516", "KS"],
		["7517", "KY"],
		["7518", "LA"],
		["7521", "ME"],
		["7520", "MD"],
		["7519", "MA"],
		["7522", "MI"],
		["7523", "MN"],
		["7525", "MS"],
		["7524", "MO"],
		["7526", "MT"],
		["7529", "NE"],
		["7533", "NV"],
		["7530", "NH"],
		["7531", "NJ"],
		["7532", "NM"],
		["7534", "NY"],
		["7527", "NC"],
		["7528", "ND"],
		["7535", "OH"],
		["7536", "OK"],
		["7537", "OR"],
		["7538", "PA"],
		["7539", "RI"],
		["7540", "SC"],
		["7541", "SD"],
		["7542", "TN"],
		["7543", "TX"],
		["7544", "UT"],
		["7546", "VT"],
		["7545", "VA"],
		["7547", "WA"],
		["7549", "WV"],
		["7548", "WI"],
		["7550", "WY"]
	]);
	
	let state = dict.get(stateID);
	console.log(state);
	console.log(plate);
	let vehicle = await decode(state, plate);
	// console.log(vehicle);
	// console.log(vehicle.model);
	if (vehicle.make != undefined) {
		if (makeCorrections.has(vehicle.make)) {
			vehicle.make = makeCorrections.get(vehicle.make);
			if (trailerMakes.has(vehicle.make)) {
				vehicle.model = "";
			}
		}
	}
	if (vehicle.model != undefined) {
		if (modelCorrections.has(vehicle.model)) {
			vehicle.model = modelCorrections.get(vehicle.model);
		} else if (vehicle.model.substr(0,6) == "SCION " || vehicle.model.substr(0,6) == "Scion ") {
			vehicle.make = "SCION";
			vehicle.model = vehicle.model.substr(6);
		} else if (vehicle.make == "FREIGHTLINER" && vehicle.model == "M2") {
			vehicle.model = "Business Class";
		} else if (vehicle.make == "MERCEDES-BENZ" && vehicle.model.includes("Class")) {
			vehicle.model = vehicle.model.replace("Class", "Klasse");
		} else if (vehicle.make == "BMW" && (vehicle.model.length == 4 || vehicle.model.length == 5) && /^[M]?\d{3}[a-z][CLs]?(\/[M]?\d{3}[a-z][CLs]?)?$/.test(vehicle.model)) {
			switch (parseInt(vehicle.model.charAt(0))) {
				case 1:
					vehicle.model = "1 Series";
					break;
				case 2:
					vehicle.model = "2 Series";
					break;
				case 3:
					vehicle.model = "3 Series";
					break;
				case 4:
					vehicle.model = "4 Series";
					break;
				case 5:
					vehicle.model = "5 Series";
					break;
				case 6:
					vehicle.model = "6 Series";
					break;
				case 7:
					vehicle.model = "7 Series";
					break;
				case 8:
					vehicle.model = "8 Series";
					break;
			}
		} else if (vehicle.make == "POLESTAR") {
			vehicle.model = vehicle.model.replace("PS", "");
		} else if (vehicle.make == "MAZDA") {
			vehicle.model = vehicle.model.replace("Mazda", "");
		}
	}
	
	

	$('#markamodtype').val(vehicle.make + ' ' + vehicle.model).autocomplete('search', vehicle.make + ' ' + vehicle.model);
	document.querySelector("#frm > fieldset:nth-child(3) > section:nth-child(6) > label").textContent = "Specify brand and model of vehicle: " + vehicle.year;

	let count = await newCombo(state, plate);
	if (count == "Element not found in HTML" || count == "Error") {
		console.log(count);
	} else if (count > 0) {
		document.querySelector(newLetterCombo).checked = false;
	} else {
		document.querySelector(newLetterCombo).checked = true;
	}
}

async function decode(state, plate) {
	try {
		let response = await fetch('https://plate2vin.vercel.app/api', {
  		method: 'POST',
  		headers: {
  		  'state': state,
  		  'plate': plate
  		}
		});

		if (response.ok) {
			let data = await response.json();
			return data.vehicle;
		} else {
			throw new Error(response.status);
		}
	} catch (error) {
		console.error(error);
		return "Error";
	}
}

async function newCombo(state, plate) {
  let url = 'https://platesmania.com/us/result_';
  let type = "&tip=";
  if (singleFormats.has(state)) {
  	let form = checkFormat(plate, singleFormats.get(state));
  	if (form) {
			switch (form) {
  			case 1:
  			case 2:
  			case 7:
  			case 8:
  				url += state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + '&posted=1&Submit=';
  				break;
  			case 4:
  				url += state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&posted=1&Submit=';
  				break;
  			case 6:
  				url += state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + '&b4=' + plate.substr(3,1) + '&posted=1&Submit=';
  				break;
  			case 3:
  				if (isHyphen(plate)) {
  					url += state.toLowerCase() + '.php?b1=' + plate.substr(4,1) + '&b2=' + plate.substr(5,1) + '&b3=' + plate.substr(6,1) + '&posted=1&Submit=';
  				} else {
  					url += state.toLowerCase() + '.php?b1=' + plate.substr(3,1) + '&b2=' + plate.substr(4,1) + '&b3=' + plate.substr(5,1) + '&posted=1&Submit=';
  				}
  				break;
  			case 5:
  				if (isHyphen(plate)) {
  					url += state.toLowerCase() + '.php?b1=' + plate.substr(5,1) + '&b2=' + plate.substr(6,1) + '&posted=1&Submit=';
  				} else {
  					url += state.toLowerCase() + '.php?b1=' + plate.substr(4,1) + '&b2=' + plate.substr(5,1) + '&posted=1&Submit=';
  				}
  				break;
  			default:
  				break;
  		}
  	}
  } else if (multiFormats.has(state)) {
  	let form = checkFormats(plate, multiFormats.get(state));
  	switch (form) {
  		case 1:
  			if (state == "KY") {
  				if (isHyphen(plate)) {
  					type += "168";
  				} else {
  					type += "3204";
  				}
  			} else {
  				type += sixDigit.get(state);
  			}
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + type + '&posted=1&Submit=';
  			break;
  		case 2:
  			if (state == "NV") {
  				if (isHyphen(plate)) {
  					type += "201"
  				} else {
  					type += "205"
  				}
  			} else if (state == "ME") {
  				url += state.toLowerCase() + '2.php?b1=' + plate.substr(4,1) + '&b2=' + plate.substr(5,1) + '&b3=' + plate.substr(6,1) + '&posted=1&Submit=';
  			} else {
  				type += sixDigitFlip.get(state);
  			}
  			if (isHyphen(plate)) {
  				url += state.toLowerCase() + '.php?b1=' + plate.substr(4,1) + '&b2=' + plate.substr(5,1) + '&b3=' + plate.substr(6,1) + type + '&posted=1&Submit=';
  			} else {
  				url += state.toLowerCase() + '.php?b1=' + plate.substr(3,1) + '&b2=' + plate.substr(4,1) + '&b3=' + plate.substr(5,1) + type + '&posted=1&Submit=';
  			}
  			break;
  		case 3:
  			type += sevenDigit.get(state);
				url += state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + type + '&posted=1&Submit=';
  			break;
  		case 4:
  			if (state == "VA") {
  				type += "63";
  			} else if (state == "GA") {
  				type += "93";
  			}
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(5,1) + '&b2=' + plate.substr(6,1) + '&b3=' + plate.substr(7,1) + type + '&posted=1&Submit=';
  			break;
  		case 5:
  			if (state == "NE") {
  				type += "3603";
  			} else if (state == "IN") {
  				type += "602";
  			}
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(3,1) + '&b2=' + plate.substr(4,1) + type + '&posted=1&Submit=';
  			break;
  		case 6:
  			type += "603";
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(3,1) + type + '&posted=1&Submit=';
  			break;
  		case 7:
  			type += "3203";
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + type + '&posted=1&Submit=';
  			break;
  		case 8:
  			type += "1";
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(5,1) + '&b3=' + plate.substr(6,1) + type + '&posted=1&Submit=';
  		case 9:
  			type += "202";
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + type + '&posted=1&Submit=';
  			break;
  		case 10:
  			type += "203";
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(4,1) + '&b2=' + plate.substr(5,1) + '&b3=' + plate.substr(6,1) + type + '&posted=1&Submit=';
  			break;
  		case 11:
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(5,1) + '&b2=' + plate.substr(6,1) + '&posted=1&Submit=';
  	}
  } else if (state == "WI") {
  	let form = checkFormats(plate, ["123ABC", "ABC1234"]);
  	switch (form) {
  		case 2:
  			url += state.toLowerCase() + '.php?b1=' + plate.substr(4,1) + '&b2=' + plate.substr(5,1) + '&b3=' + plate.substr(6,1) + '&posted=1&Submit=';
  			break;
  		case 3:
  			url += state.toLowerCase() + '1.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + '&posted=1&Submit=';
  			break;
  	}
  } else if (state == "TN") {
  	let form = checkFormats(plate, ["ABC123", "123ABC", "ABC1234"]);
  	switch (form) {
  		case 1:
  			if (/[-]/.test(plate)) {
  				type += "801";
  				url += state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + type + '&posted=1&Submit=';
  			}
  			break;
  		case 2:
  			if (/[-]/.test(plate)) {
  				type += "804";
  				url += state.toLowerCase() + '.php?b1=' + plate.substr(4,1) + '&b2=' + plate.substr(5,1) + '&b3=' + plate.substr(6,1) + type + '&posted=1&Submit=';
  			}
  			break;
  		case 3:
  			url += state.toLowerCase() + '1.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + '&posted=1&Submit=';
  			break;
  	}
  }
  console.log(url);
  try {
    let response = await fetch(url, {
      method: 'GET'
    });

    if (response.ok) {
      let html = await response.text();

      const startIndex = html.indexOf('<span class="text-highlights text-highlights-light-green">');
      const endIndex = html.indexOf('</span>', startIndex);
        
      if (startIndex !== -1 && endIndex !== -1) {
        const el = html.substr(startIndex, endIndex + 7);
        let value = el.substr(58,1);
        return value;
      } else {
        return "Element not found in HTML";
      }

    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.error(error);
    return "Error";
  }
}

function checkFormats(plate, formats) {
	for (var i = 0; i < formats.length; i++) {
		switch (formats[i]) {
			case "ABC123":
				if (/^[a-zA-Z]{3}[-\s]?\d{3}$/.test(plate)) {
					return 1;
				} else continue;
			case "123ABC":
				if (/^\d{3}[-\s]?[a-zA-Z]{3}$/.test(plate)) {
					return 2;
				} else continue;
			case "ABC1234":
				if (/^[a-zA-Z]{3}[-\s]?\d{4}$/.test(plate)) {
					return 3;
				} else continue;
			case "1234ABC":
				if (/^\d{4}[-\s]?[a-zA-Z]{3}$/.test(plate)) {
					return 4;
				} else continue;
			case "123AB":
				if (/^\d{3}[a-zA-Z]{2}$/.test(plate)) {
					return 5;
				} else continue;
			case "123A":
				if (/^\d{3}[a-zA-Z]{1}$/.test(plate)) {
					return 6;
				} else continue;
			case "A1B234":
				if (/^[a-zA-Z]{1}\d{1}[a-zA-Z]{1}\d{3}$/.test(plate)) {
					return 7;
				} else continue;
			case "A123BC":
				if (/^[a-zA-Z]{1}\d{2}[-\s]?\d{1}[a-zA-Z]{2}$/.test(plate)) {
					return 8;
				} else continue;
			case "12A345":
				if (/^\d{2}[a-zA-Z]{1}[-\s]?\d{3}$/) {
					return 9;
				} else continue;
			case "123A45":
				if (/^\d{3}[-\s]?[a-zA-Z]{1}\d{2}$/) {
					return 10;
				} else continue;
			case "1234AB":
			if (/^\d{4}[-\s]?[a-zA-Z]{2}$/.test(plate)) {
				return 11;
			} else continue;
			default:
				return 0;
		}
	}
	return 0;
}

function checkFormat(plate, format) {
	switch (format) {
		case "ABC123":
			if (/^[a-zA-Z]{3}[-\s]?\d{3}$/.test(plate)) {
				return 1;
			} else return 0;
		case "ABC1234":
			if (/^[a-zA-Z]{3}[-\s]?\d{4}$/.test(plate)) {
				return 2;
			} else return 0;
		case "123ABC":
			if (/^\d{3}[-\s]?[a-zA-Z]{3}$/.test(plate)) {
				return 3;
			} else return 0;
		case "AB1234":
			if (/^[a-zA-Z]{2}[-\s]?\d{4}$/.test(plate)) {
				return 4;
			} else return 0;
		case "1ABC234":
			if (/^\d{1}[a-zA-Z]{3}\d{3}$/.test(plate)) {
				return 6;
			} else return 0;
		case "1AB2345":
			if (/^\d{1}[a-zA-Z]{2}\d{4}$/.test(plate)) {
				return 7;
			} else return 0;
		case "X12 3456":
			if (/^\w{1}\d{2}\s{1}\d{4}$/.test(plate)) {
				return 8;
			} else return 0;
		default:
			return 0;
	}
}

function isHyphen(plate) {
	return /[-\s]/.test(plate);
}
