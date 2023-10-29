function injectCombined(code, node) {
    var th = document.getElementsByTagName(node)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.textContent = code;
    th.appendChild(script);
}

const url = document.URL;
// console.log('This is the URL: ' + url.substr(24,2));

const country = url.substr(24,2);

fetch(chrome.runtime.getURL('/Scripts/maps.js'))
    .then(response => response.text())
    .then(mapsContent => {
        // console.log(mapsContent);
        
        fetch(chrome.extension.getURL('/Scripts/' + country + 'ModelFill.js'))
            .then(response => response.text())
            .then(modelFillContent => {
                // console.log(modelFillContent);
                
                const combinedScript = mapsContent + '\n\n' + modelFillContent;
                
                injectCombined(combinedScript, 'body');
            });
    });