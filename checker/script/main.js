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
    const output = document.getElementById("output");
    for (let i=0; i<files_len; i++) {
        const file = files[i];
        const file_data = await _extractData(file);
        _printData(output, file_data);
        output.innerHTML += file.name + "<br>"; 
    }
}

function _printData(output, data) {
    const keys = Object.keys(data);
    for (let i=0, l=keys.length; i<l; i++) {
        value = data[keys[i]];
        if (value.split("％")[0] > 75) {
            output.innerHTML += '<font color = "red">' + keys[i] + ": " + value + "</font><br>";
        } else {
            output.innerHTML += keys[i] + ": " + value + "<br>";
        }
    }
}

async function _extractData(file) {
    let data = {};
    let text = await _read(file);
    data = _extractProfile(text, data);
    data = _extractStatus(text, data);
    data = _extractSkills(text, data);
    return data;
}

function _extractProfile(text, data) {
    tokens = text.split(/(\n| \/ )/);
    for(let i=0, l=tokens.length; i<l; i++) {
        if (tokens[i] == "■能力値■") {
            break;
        }
        const text = tokens[i].split("：")
        // console.log(text[0])
        switch(text[0]) {
            case "キャラクター名": data["name"]=text[1]; break;
            case "職業": data["job"]=text[1]; break;
            case "年齢": data["age"]=text[1]; break;
            case "性別": data["sex"]=text[1]; break;
            case "出身": data["from"]=text[1]; break;
            case "髪の色": data["hair_c"]=text[1]; break;
            case "瞳の色": data["eye_c"]=text[1]; break;
            case "肌の色": data["skin_c"]=text[1]; break;
            case "身長": data["length"]=text[1]; break;
            case "体重": data["weight"]=text[1]; break;
        }
    }
    return {}; //data;
}

function _extractStatus(text, data) {
    tokens = text.split("■技能■")[1].split(/\n|\s|　/)
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

function _nextNum(i, tokens) {
    while (tokens[i].length==0) i++;
    return tokens[i];
}

function _extractSkills(text, data) {
    return data;
}

function _read(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise ((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
    })
}
