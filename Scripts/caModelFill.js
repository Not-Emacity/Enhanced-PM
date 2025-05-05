document.querySelector("#frm > fieldset:nth-child(3) > section:nth-child(1)").outerHTML += '<button class="btn-u" type="button" onclick="runPlate();">Run Plate</button>';

async function runPlate() {
	let plate = new FormData(document.forms.frm).get('nomer');
	let stateID = new FormData(document.forms.frm).get('drop_1');
	const newLetterCombo = "#CheckBox13";
	const dict = new Map([
		["7571", "AB"],
		["7572", "BC"],
		["7573", "MB"],
		["7574", "NB"],
		["7577", "ON"],
		["7579", "QC"],
		["7580", "SK"]
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
		} else if (vehicle.make == "INTERNATIONAL" && vehicle.model == "MA025") {
			vehicle.model = "DuraStar";
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

	// let count = await newCombo(state, plate);
	// if (count == "Element not found in HTML" || count == "Error") {
	// 	console.log(count);
	// } else if (count > 0) {
	// 	document.querySelector(newLetterCombo).checked = false;
	// } else {
	// 	document.querySelector(newLetterCombo).checked = true;
	// }
}


async function decode(state, plate) {
	try {
		let response = await fetch('https://plate2vin.vercel.app/api_CA', {
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