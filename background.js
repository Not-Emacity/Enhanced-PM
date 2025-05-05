console.log("background running");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "fetchImageBase64") {
		fetch(request.url)
			.then(res => res.blob())
			.then(blob => {
				const reader = new FileReader();
				reader.onloadend = () => {
					sendResponse({ base64: reader.result });
				};
				reader.readAsDataURL(blob);
			})
			.catch(err => {
				console.error("Fetch failed:", err);
				sendResponse({ base64: null });
			});
		return true;
	}
});