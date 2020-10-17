`use strict`;

window.onload = function () {
    document.getElementById("fileInput").onchange = validate_input;
    document.getElementById("dropzone").ondrop = validate_drop;
    document.getElementById("dropzone").ondragover = function (event) {
        event.preventDefault();
    };
    document.getElementById("Reset").onclick = clear;
};

function validate_input() {
    const files = document.getElementById("fileInput").files;
    _validate(files);
}

function validate_drop(dropfiles) {
    dropfiles.preventDefault();
    const files = dropfiles.dataTransfer.files;
    _validate(files);
    dropfiles.dataTransfer.files = null;
}

function clear() {
    document.getElementById("fileInput").files = null;
    document.getElementById("output").innerText = "";
}

async function _validate(files) {
    console.log("validation start");
    const files_len = files.length;
    const status_output = document.getElementById("status");
    const profile_output = document.getElementById("profile");
    for (let i=0; i<files_len; i++) {
        const file = files[i];
        const file_data = await _extractData(file);
        _printStatus(status_output, file_data["status"]);
        _printProfile(profile_output, file_data["profile"]);
    }
}

function _printStatus(output, data) {
    const keys = Object.keys(data);
    for (let i=0, l=keys.length; i<l; i++) {
        value = data[keys[i]];
        if (parseInt(value.split("％")[0], 10) > 75) {
            output.innerHTML += '<font color = "red">' + keys[i] + ": " + value + "</font><br>";
        } else {
            output.innerHTML += keys[i] + ": " + value + "<br>";
        }
    }
}

function _printProfile(output, data) {
    const keys = Object.keys(data);
    for (let i=0, l=keys.length; i<l; i++) {
        value = data[keys[i]];
        output.innerHTML += keys[i] + ": " + value + "<br>";
    }
}

async function _extractData(file) {
    let data = {};
    let text = await _read(file);
    data["profile"] = _extractProfile(text);
    data["status"] = _extractStatus(text);
    data["skills"] = _extractSkills(text);
    return data;
}

function _extractProfile(text) {
    let data = {};
    let tokens = text.split(/(\n| \/ )/);
    for(let i=0, l=tokens.length; i<l; i++) {
        if (tokens[i] == "■能力値■") {
            break;
        }
        const text = tokens[i].split("：")
        switch(text[0]) {
            case "キャラクター名": data["キャラクター名"]=text[1]; break;
            case "職業": data["職業"]=text[1]; break;
            case "年齢": data["年齢"]=text[1]; break;
            case "性別": data["性別"]=text[1]; break;
            case "出身": data["出身"]=text[1]; break;
            case "髪の色": data["髪の色"]=text[1]; break;
            case "瞳の色": data["瞳の色"]=text[1]; break;
            case "肌の色": data["肌の色"]=text[1]; break;
            case "身長": data["身長"]=text[1]; break;
            case "体重": data["体重"]=text[1]; break;
        }
    }
    return data;
}

function _extractStatus(text) {
    let data = {};
    let tokens = text.split("■技能■")[1].split(/\n|\s|　/)
    for(let i=0, l=tokens.length; i<l; i++) {
        if (tokens[i] == "■戦闘■") {
            break;
        }
        const text = tokens[i]
        switch(text[0]) {
            case "《": case "●":
                const num = text.split("》")[1];
                if (num.length == 0) {
                    data[tokens[i]]=_nextNum(i+1, tokens);
                } else {
                    key = text.slice(0, text.indexOf(num));
                    data[key]=num; 
                }
                break;
        }
    }
    return data;
}

function _extractSkills(text) {
    let data = {};
    return data;
}

function _nextNum(i, tokens) {
    while (tokens[i].length==0) i++;
    return tokens[i];
}

function _read(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise ((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
    })
}
