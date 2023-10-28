document.querySelector("#sky-form > footer").innerHTML += '<button class="btn-u" type="button" onclick="leaderboard();">Leaderboard</button>';
const make = "#sky-form > fieldset > div:nth-child(2) > section:nth-child(1) > div > section:nth-child(1) > label > select";
const model = "#model";

async function leaderboard() {
	let makeCode = document.querySelector(make).options[document.querySelector(make).selectedIndex].value;
	let modelCode = document.querySelector(model).options[document.querySelector(model).selectedIndex].value;
	let total, loops;


	if (makeCode) {
		const board = new Map();
		let url = 'https://platesmania.com/gallery.php?';

		url += 'markaavto=' + makeCode;
		if (modelCode) {
			url += '&model=' + modelCode;
		}

		let response = await fetch(url, {
			method: 'GET'
		});
		if (response.ok) {
			console.log("Page 1");
			let html = await response.text();
			const tempContainer = document.createElement('div');
			tempContainer.innerHTML = html;
			
			total = parseInt(tempContainer.querySelector("div > div > div.breadcrumbs > div > div > h1 > b").textContent);
			loops = Math.floor(total/10);
			if (total % 10 == 0) {
				loops -= 1;
			}

			
			const rows = tempContainer.querySelectorAll("div > div > div.container.content > div > div.col-md-9 > div.row:not([class*=' '])");
			rows.forEach((element) => {
				// if (element.querySelectorAll("p").length) {
				console.log(element.querySelectorAll("p").length);
					for (let i = 1; i < element.querySelectorAll("p").length; i++) {
						let cycle = 1;
						if (element.querySelectorAll("p").length == 3) {
							cycle = 0;
						}
						let user = element.querySelectorAll("p")[i].textContent.slice(0,-22).substr(1);
						if (user.includes("adsbygoogle")) {
							if (i == 1) {
								for (let j = 0; j <= 3; j += 3) {
									user = element.querySelectorAll("p")[j].textContent.slice(0,-22).substr(1);	
									if (!board.has(user)) {
										board.set(user, 1);
									} else {
										board.set(user, board.get(user) + 1);
									}
								}
								continue;
							} else if (i == 2) {
								if (cycle == 1) {
									cycle = 0;
								} else {
									cycle = 1;
								}
								continue;
							}
						}
						if (i % 2 == cycle) {
							if (!board.has(user)) {
								board.set(user, 1);
							} else {
								board.set(user, board.get(user) + 1);
							}
						}
					}
				// } else {
				// 	for (let i = 0; i < element.querySelectorAll("p").length; i++) {
				// 		let cycle = 1;
				// 		if (i % 2 == cycle) {
				// 			let user = element.querySelectorAll("p")[i].textContent.slice(0,-22).substr(1);
				// 			if (user.includes("adsbygoogle")) {
				// 				for (let j = 0; j <= 3; j += 3) {
				// 					user = element.querySelectorAll("p")[j].textContent.slice(0,-22).substr(1);	
				// 					if (!board.has(user)) {
				// 						board.set(user, 1);
				// 					} else {
				// 						board.set(user, board.get(user) + 1);
				// 					}
				// 				}
				// 				continue;
				// 			}
				// 			if (!user) {
				// 				if (cycle == 1) {
				// 					cycle = 0;
				// 				} else {
				// 					cycle = 1;
				// 				}
				// 				continue;
				// 			}
				// 			if (user.includes("outhlake")) {
				// 				console.log("Southlake!");
				// 			}
				// 			if (!board.has(user)) {
				// 				board.set(user, 1);
				// 			} else {
				// 				board.set(user, board.get(user) + 1);
				// 			}
				// 		}
				// 	}
				// }
			});

			
		} else {
      		throw new Error(response.status);
    	}
    	url += "&start=";

    	for (let i = 1; i <= loops; i++) {
    		let response = await fetch(url + i, {
				method: 'GET'
			});
			if (response.ok) {
				console.log("Page " + (i+1));
				let html = await response.text();
				const tempContainer = document.createElement('div');
				tempContainer.innerHTML = html;

				const rows = tempContainer.querySelectorAll("div > div > div.container.content > div > div.col-md-9 > div.row:not([class*=' '])");
				rows.forEach((element) => {
					console.log(element.querySelectorAll("p"));
					//if (element.querySelectorAll("p").length == 5) {
						for (let j = 1; j < element.querySelectorAll("p").length; j++) {
							let cycle = 1;
							if (element.querySelectorAll("p").length == 3) {
								cycle = 0;
							}
							let user = element.querySelectorAll("p")[j].textContent.slice(0,-22).substr(1);
							if (user.includes("adsbygoogle")) {
								// console.log("ads");
								if (j == 1) {
									for (let k = 0; k <= 3; k += 3) {
										user = element.querySelectorAll("p")[k].textContent.slice(0,-22).substr(1);	
										if (!board.has(user)) {
											board.set(user, 1);
										} else {
											board.set(user, board.get(user) + 1);
										}
									}
									continue;
								} else if (j == 2) {
									if (cycle == 1) {
										cycle = 0;
									} else {
										cycle = 1;
									}
									continue;
								}
							}
							if (j % 2 == cycle) {
								if (!board.has(user)) {
									board.set(user, 1);
								} else {
									board.set(user, board.get(user) + 1);
								}
							}
						}
					// } else {
					// 	for (let j = 0; j < element.querySelectorAll("p").length; j++) {
					// 		let cycle = 1;
					// 		if (j % 2 == cycle) {
					// 			let user = element.querySelectorAll("p")[j].textContent.slice(0,-22).substr(1);
					// 			if (user.includes("adsbygoogle")) {
					// 				for (let k = 0; k <= 3; k += 3) {
					// 					user = element.querySelectorAll("p")[k].textContent.slice(0,-22).substr(1);	
					// 					if (!board.has(user)) {
					// 						board.set(user, 1);
					// 					} else {
					// 						board.set(user, board.get(user) + 1);
					// 					}
					// 				}
					// 				continue;
					// 			}
					// 			if (!user) {
					// 				if (cycle == 1) {
					// 					cycle = 0;
					// 				} else {
					// 					cycle = 1;
					// 				}
					// 				continue;
					// 			}
					// 			if (user.includes("outhlake")) {
					// 				console.log("Southlake!");
					// 			}
					// 			if (!board.has(user)) {
					// 				board.set(user, 1);
					// 			} else {
					// 				board.set(user, board.get(user) + 1);
					// 			}
					// 		}
					// 	}
					// }
					
				});
			} else {
      			throw new Error(response.status);
    		}
		}

    	const sortedBoard = new Map(
			[...board.entries()].sort((a,b) => b[1] - a[1])
		);
		let sum = 0;
		for (let [key, value] of board) {
			console.log(key + " => " + value);
			sum += value;
		}
		console.log(sum);
	}
}


