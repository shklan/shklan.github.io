`use strict`;

window.onload = function () {
    document.getElementById("fileInput").onchange = format_input;
    document.getElementById("dropzone").ondrop = format_drop;
    document.getElementById("dropzone").ondragover = function (event) {
        event.preventDefault();
    };
    document.getElementById("Reset").onclick = clear;
};

async function format_input() {
    await _format();
}

async function format_drop() {
    dropfiles.preventDefault();
    const files = dropfiles.dataTransfer.files;
    document.getElementById("fileInput").files = files;
    await _format();
    dropfiles.dataTransfer.files = null;
}

async function _format() {
    console.log("formatting start");
    files = document.getElementById("fileInput").files;
    const files_len = files.length;
    const output = document.getElementById("html");
    for (let i=0; i<files_len; i++) {
        const file = files[i];
        const file_data = await _read(file);
        const blob = _print(file_data);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "output.txt";
        link.click();
    }    
}

function _print(data) {
    const tokens = data.split(/(<p .*>|<\/p>)/);
    let content = "";
    for(let i=2, l=tokens.length; i<l; i+=4) {
        const text = tokens[i].split(/\s|<span>|<\/span>/).filter(text => text.length).join(" ");
        const ltag = tokens[i-1]
        const rtag = tokens[i+1]
        content += ltag+text+rtag+"<br>\n";
    }
    return new Blob([content], {"type": "text/plain"})
}

function _read(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise ((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
    })
}