`use strict`;

window.onload = function () {
    document.getElementById("fileInput").onchange = validate_input;
    document.getElementById("dropzone").ondrop = validate_drop;
    document.getElementById("dropzone").ondragover = function (event) {
        event.preventDefault();
    };
    document.getElementById("Reset").onclick = clear;
};

function _createCustomSetter() {
    const statusThreshold = _getThreshold();
    const keys = Object.keys(statusThreshold);
    for (let i=0, l=keys.length; i<l; i++) {
        const option = document.createElement("option");
        option.value = keys[i];
        option.innerText = keys[i];
        document.getElementById("custom_selector").appendChild(option);
    }
    document.getElementById("custom_selector").disabled = false;
    document.getElementById("custombutton").addEventListener("click", setCustomAndRevalidate);
    document.getElementById("allbutton").addEventListener("click", setAllAndRevalidate);
}

function _deleteCustomSelector() {
    document.getElementById("custom_selector").innerHTML = "";
    document.getElementById("custom_selector").disabled = true;
    document.getElementById("custombutton").removeEventListener("click", setCustomAndRevalidate);
    document.getElementById("allbutton").removeEventListener("click", setAllAndRevalidate);  
}

function clear() {
    document.getElementById("fileInput").files = null;
    FILE_DATA = null;
    _clearDataOutput();
    _clearCustomOutput();
    _deleteThreshold();
    _deleteCustomSelector();
    _disableChatPaletteCopyButton();
}

function _clearDataOutput() {
    document.getElementById("status").innerHTML = "";
    document.getElementById("profile").innerHTML = "";
}

function _clearCustomOutput() {
    document.getElementById("customsettings_output").innerHTML = "";
}


function _disableChatPaletteCopyButton() {
    const chatPalettCopyButton = document.getElementById("copy");
    chatPalettCopyButton.removeEventListener("click", execCopy);
    chatPalettCopyButton.disabled = true;
}

function _enableChatPaletteCopyButton() {
    const chatPalettCopyButton = document.getElementById("copy");
    chatPalettCopyButton.addEventListener("click", execCopy);
    chatPalettCopyButton.disabled = false;
}
