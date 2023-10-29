document.querySelector("#frm > fieldset:nth-child(4) > section:nth-child(1)").outerHTML += '<button class="btn-u" type="button" onclick="runPlate();">Run Plate</button>';

async function runPlate() {
	const type = parseInt(document.getElementById("ctype").value);
	const weirdType = [6, 7, 8];
	let plate;
	let region = document.querySelector("#region").options[document.querySelector("#region").selectedIndex].textContent;
	let nomer;
	if (weirdType.includes(type)) {
		nomer = document.querySelector("#b1").value;
		console.log(nomer);
		plate = region + nomer + document.querySelector("#nomerpl").value;
	} else if (type == 12) {
		plate = 'W' + region + document.querySelector("#digit").value;
	} else {
		plate = region + document.querySelector("#nomerpl").value;
	}

	// let plate = document.querySelector(make).options[document.querySelector(make).selectedIndex].text
	const newLetterCombo = "#CheckBox13";
	
	
	let vehicle = await decode(plate);
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
		}
	}
	
	

	$('#markamodtype').val(vehicle.make + ' ' + vehicle.model).autocomplete('search', vehicle.make + ' ' + vehicle.model);
	document.querySelector("#frm > fieldset:nth-child(4) > section:nth-child(6) > label").textContent = "Specify brand and model of vehicle: " + vehicle.year;
	
	let count = await newCombo(type, region, nomer);
	console.log(count);
	if (count == "Element not found in HTML" || count == "Error") {
		console.log(count);
	} else if (count > 0) {
		document.querySelector(newLetterCombo).checked = false;
	} else {
		document.querySelector(newLetterCombo).checked = true;
	}
}

async function decode(plate) {
	try {
		let response = await fetch('https://plate2vin.vercel.app/api_PL', {
  		method: 'POST',
  		headers: {
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

async function newCombo(type, region, nomer) {
  let url;
  if (type == 12) {
  	url = 'https://platesmania.com/pl/resultdip.php?code=' + region + '&posted=1&Submit='
  } else if (type == 6) {
  	url = 'https://platesmania.com/pl/result2.php?tip=6&region2=' + region + '&b1='+ nomer + '&posted=1&Submit='
  } else if (type == 7) {
  	url = 'https://platesmania.com/pl/result2.php?tip=7&region1=' + region + '&b1='+ nomer + '&posted=1&Submit='
  } else return -1;
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