// @name         Fix Sweden Upload options
// @version      0.1
// @description  Displays missing Swedish plate formats
// @author       kgmill

(function() {
    'use strict';

    // Define the new options HTML
    var newOptionsHTML = `
        <option value="1">Single-row plate with euroband</option>
        <option value="2">Single-row plate without euroband</option>
        <option value="3">Single-row plate with euroband (US-size)</option>
        <option value="4">Single-row plate with euroband (US-size)</option>
        <option value="5">Two-row plate with euroband</option>
        <option value="6">Two-row plate without euroband</option>
        <option value="7">Single-row plate with euroband (old thin font)</option>
        <option value="8">Two-row plate with euroband (old thin font)</option>
        <option value="13">Single-row plate without euroband (old bold font)</option>
        <option value="14">Single-row plate without euroband (US-size, old bold font)</option>
        <option value="15">Two-row plate without euroband (old bold font)</option>
    `;

    // Find the dropdown element
    var dropdown = document.getElementById('fon');

    if (dropdown) {
        // Replace the existing options with new options
        dropdown.innerHTML = newOptionsHTML;
    }
})();