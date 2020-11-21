`use strict`;

window.onload = function () {
    for(let i=0, max=2;i<max;i++) {
        document.getElementsByClassName("fileInput")[i].onchange = format_input;
        document.getElementsByClassName("dropzone")[i].ondrop = format_drop;
        document.getElementsByClassName("dropzone")[i].ondragover = function (event) {
        event.preventDefault();
        };
    }
};

async function format_input(files) {
    await _format(files.target);
}

async function format_drop(dropfiles) {
    dropfiles.preventDefault();
    const target = dropfiles.target.children[0];
    const files = dropfiles.dataTransfer.files;
    target.files = files;
    await _format(target);
    dropfiles.dataTransfer.files = null;
}

async function _format(target) {
    console.log("formatting start");
    files = target.files;
    const files_len = files.length;
    for (let i=0; i<files_len; i++) {
        const file = files[i];
        const file_data = await _read(file);
        const blob = _print(target.id, file_data);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "output.txt";
        link.click();
    }    
}

function _print(id, data) {
    let formatted_blob;
    switch (id) {
        case "ccfolia":
            formatted_blob = _printCcfolia(data);
            break;
        case "dodontof":
            formatted_blob = _printDodontof(data);
            break;    
    }
    return formatted_blob;
}

function _printDodontof(data) {
    const tokens = data.split(/<br>\n(?!Cthulhu)/);
    let content = "";
    content += _formatDodontofToken(tokens[0].split("<body>\n")[1]);
    for (let i=1, l=tokens.length; i<l-1; i++) {
        content += _formatDodontofToken(tokens[i]);
    }
    return new Blob([content], {"type": "text/plain"});
}

function _formatDodontofToken(token) {
    const tag = [...token.matchAll(/(?<=<font color=').+(?='>)|<\/font>/g)]
    const ltag = '<p style="color:'+tag[0].join("")+';">';
    const rtag = tag[1].join("").replace("font", "p");
    const content = token.split(/<font color='.+'>|<\/font>/).join("");
    return ltag+content+rtag+"\n";
}

function _printCcfolia(data) {
    const tokens = data.split(/(<p .*>|<\/p>)/);
    let content = "";
    for(let i=2, l=tokens.length; i<l; i+=4) {
        const text = tokens[i].split(/\s|<span>|<\/span>/).filter(text => text.length).join(" ");
        const ltag = tokens[i-1]
        const rtag = tokens[i+1]
        content += ltag+text+rtag+"\n";
    }
    return new Blob([content], {"type": "text/plain"});
}

function _read(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise ((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
    });
}