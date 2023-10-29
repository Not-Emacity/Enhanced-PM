// import { makeCorrections } from 'Scripts/maps.js';

// Handle communication with content scripts
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.type === 'getCorrections') {
//         sendResponse({ corrections: makeCorrections });
//     }
// });


console.log("background running");

chrome.browserAction.onClicked.addListener(buttonClick);

function buttonClick(tab) {
	let msg = {
		txt: "hello"
	}
	chrome.tabs.sendMessage(tab.id, msg);
}