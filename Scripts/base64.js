const img = document.querySelector("body > div.wrapper > div.container.content > div > div.col-md-9.col-xs-12 > div.row.margin-bottom-20.bg-grey > div > img");
const buttonB64 = document.createElement("button");

if (img) {
	buttonB64.textContent = "Copy Base64";
	buttonB64.type = "button";
	buttonB64.className = "btn btn-u";
	// buttonB64.style.marginBottom = "10px";

	const targetDiv = document.querySelector("body > div.wrapper > div.container.content > div > div.col-md-9.col-xs-12 > div.row.margin-bottom-20.bg-grey > div");

	if (targetDiv && targetDiv.parentElement) {
		targetDiv.parentElement.insertBefore(buttonB64, targetDiv);
	}
}

buttonB64.addEventListener("click", async () => {
	
	chrome.runtime.sendMessage({ action: "fetchImageBase64", url: img.src }, (response) => {
		if (response && response.base64) {
			const textarea = document.createElement("textarea");
			textarea.value = response.base64;
			textarea.style.position = "fixed";
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
			
			buttonB64.textContent = "Copied!";
			buttonB64.disabled = true;

			setTimeout(() => {
				buttonB64.textContent = "Copy Base64";
				buttonB64.disabled = false;
			}, 2000);
		} else {
			buttonB64.textContent = "Failed";
			buttonB64.disabled = true;
			setTimeout(() => {
				buttonB64.textContent = "Copy Base64";
				buttonB64.disabled = false;
			}, 2000);
		}
	});
});