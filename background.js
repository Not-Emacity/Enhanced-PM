console.log("background running");

chrome.browserAction.onClicked.addListener(buttonClick);

function buttonClick(tab) {
	let msg = {
		txt: "hello"
	}
	chrome.tabs.sendMessage(tab.id, msg);
}