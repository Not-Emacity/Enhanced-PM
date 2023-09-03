document.querySelector("#frm > fieldset:nth-child(3) > div:nth-child(3) > section:nth-child(1)").innerHTML += '<button class="btn-u" type="button" onclick="runPlate();">Run Plate</button>';

const standardForm = new Set([
	"TX",
	"AK",
	"HI",
	"MS",
	"AZ",
	"MT",
	"NY",
	"VT",
	"IL",
	"OH",
	"NC",
	"MD",
	"PA"
]);

const twoDigit = new Set([
	"DC",
	"ME"
]);

const latterThree = new Set([
	"CT",
	"AR"
]);

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
	console.log(vehicle);

	$('#markamodtype').val(vehicle.make + ' ' + vehicle.model).autocomplete('search', vehicle.make + ' ' + vehicle.model);

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
		let response = await fetch('https://untruebigdecimalsnew.notemacity.repl.co/api', {
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
  let url;
  if (standardForm.has(state)) {
  	url = 'https://platesmania.com/us/result_' + state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + '&posted=1&Submit=';
  } else if (twoDigit.has(state)) {
    url = 'https://platesmania.com/us/result_' + state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&posted=1&Submit=';
  } else if (state == "CA") {
  	url = 'https://platesmania.com/us/result_' + state.toLowerCase() + '.php?b1=' + plate.substr(0,1) + '&b2=' + plate.substr(1,1) + '&b3=' + plate.substr(2,1) + '&b4=' + plate.substr(3,1) + '&posted=1&Submit=';
  } else if (latterThree.has(state)) {
  	url = 'https://platesmania.com/us/result_' + state.toLowerCase() + '.php?b1=' + plate.substr(4,1) + '&b2=' + plate.substr(5,1) + '&b3=' + plate.substr(6,1) + '&posted=1&Submit=';
  }
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