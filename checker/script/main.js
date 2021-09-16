`use strict`;
let FILE_DATA = null;

window.onload = function () {
    document.getElementById("fileInput").onchange = validate_input;
    document.getElementById("dropzone").ondrop = validate_drop;
    document.getElementById("dropzone").ondragover = function (event) {
        event.preventDefault();
    };
    document.getElementById("Reset").onclick = clear;
};

function revalidate() {
    _clearDataOutput();
    _validate();
}

function setAllAndRevalidate() {
    const value = document.getElementById("allvalue_setter").value;
    _setAllThreshold(value);
    _clearCustomOutput();
    revalidate();
}

function setCustomAndRevalidate() {
    const key = document.getElementById("custom_selector").value;
    const value = document.getElementById("customvalue_setter").value;
    _setCustomThreshold(key, value);
    _printCustomSettings(key, value);
    revalidate();
}

function _printCustomSettings(key, value) {
    const output = document.getElementById("customsettings_output");
    output.innerHTML += key + "の上限: " + value + "%<br>";
}

async function validate_input() {
    await _validate();
    _createCustomSetter();
}

async function validate_drop(dropfiles) {
    dropfiles.preventDefault();
    const files = dropfiles.dataTransfer.files;
    document.getElementById("fileInput").files = files;
    await _validate();
    dropfiles.dataTransfer.files = null;
    _createCustomSetter();
}

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
    const chatPalettCopyButton = document.getElementById("chatpallet");
    chatPalettCopyButton.removeEventListener("click", execCopy);
    chatPalettCopyButton.disabled = true;
}

async function _validate() {
    const err = new Error();
    console.log("validation start");
    files = document.getElementById("fileInput").files;
    const files_len = files.length;
    const status_output = document.getElementById("status");
    const profile_output = document.getElementById("profile");
    if (files_len != 1) {
        throw err;
    }
    const file = files[0];
    FILE_DATA = await _extractData(file);
    _setThreshold(FILE_DATA["status"]);
    const statusThreshold = _getThreshold();

    _printStatus(status_output, FILE_DATA["status"], statusThreshold);
    _printProfile(profile_output, FILE_DATA["profile"]);
    _enableChatPaletteCopyButton()
}

function _printStatus(output, data, statusThreshold) {
    const keys = Object.keys(data);
    for (let i=0, l=keys.length; i<l; i++) {
        let thr = statusThreshold[keys[i]];
        let value = data[keys[i]];
        if (parseInt(value.split("％")[0], 10) > thr) {
            output.innerHTML += '<font color = "red">' + keys[i] + ": " + value + "</font><br>";
        } else {
            output.innerHTML += keys[i] + ": " + value + "<br>";
        }
    }
}

function _printProfile(output, data) {
    const keys = Object.keys(data);
    for (let i=0, l=keys.length; i<l; i++) {
        const value = data[keys[i]];
        if (value == "" | value == "\r") {
            output.innerHTML += '<span style="background-color:yellow">' + keys[i] + ": " + value + "</span><br>";
        } else {
            output.innerHTML += keys[i] + ": " + value + "<br>";
        }
    }
}

function _enableChatPaletteCopyButton() {
    const chatPalettCopyButton = document.getElementById("chatpallet");
    chatPalettCopyButton.addEventListener("click", execCopy);
    chatPalettCopyButton.disabled = false;
}

function execCopy() {
    document.addEventListener("copy", _copyData);
    document.execCommand("copy");
    document.removeEventListener("copy", _copyData);
}

function _copyData(event) {
    event.preventDefault();
    let string = "";
    // status
    const status_data = FILE_DATA["status"];
    const status_keys = Object.keys(status_data);
    for (let i=0, l=status_keys.length; i<l; i++) {
        const key = status_keys[i];
        const value = status_data[key].slice(0, -1);
        string += "ccb<=" + value + " " + key + "\n";
    }
    // parameter original
    const parameter_original = FILE_DATA["parameter"]["original"];
    const original_keys = Object.keys(parameter_original);
    for (let i=0, l=original_keys.length; i<l; i++) {
        const key = original_keys[i];
        const value = parameter_original[key];
        for (let level = 1; level <= 5; level++) {
            string += "ccb<=" + value*level + " " + "《" + key + "×" + level + "》" + "\n";
        }        
    }
    // parameter ability
    const parameter_ability = FILE_DATA["parameter"]["ability"];
    const ability_keys = Object.keys(parameter_ability);
    for (let i=0, l=ability_keys.length; i<l; i++) {
        const key = ability_keys[i];
        const value = parameter_ability[key];
        string += "ccb<=" + value + " " + "《" + key + "》" + "\n";
    }
    string += "ccb<={SAN} 《SANチェック》\n";
    event.clipboardData.setData("text/plain", string);
}

async function _extractData(file) {
    let data = {};
    let text = await _read(file);
    data["profile"] = _extractProfile(text);
    data["status"] = _extractStatus(text);
    data["parameter"] = _extractParameters(text);
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
    let tokens = text.split("■技能■")[1].split(/\n|\s|　/);
    for(let i=0, l=tokens.length; i<l; i++) {
        if (tokens[i] == "■戦闘■") {
            break;
        }
        const text = tokens[i];
        switch(text[0]) {
            case "《": 
                const num_a = text.split("》")[1];
                if (num_a.length == 0) {
                    data[tokens[i]]=_nextNum(i+1, tokens);
                } else {
                    key = text.slice(0, text.indexOf(num_a));
                    data[key]=num_a; 
                }
                break;
            case "●":
                const num_b = text.split("》")[1];
                if (num_b.length == 0) {
                    data[tokens[i].slice(1)]=_nextNum(i+1, tokens);
                } else {
                    key = text.slice(1, text.indexOf(num_b));
                    data[key]=num_b; 
                }
                break;
        }
    }
    return data;
}

function _extractParameters(text) {
    let data = {"original": {}, "ability": {}};
    let tokens = text.split("■簡易用■")[1].split(/\r*\n|　/);
    for(let i=0, l=tokens.length; i<l; i++) {
        const text = tokens[i];
        if (text[0] == "-") break;
        const splitted = text.split(":");
        const key = splitted[0];
        const value = splitted[1];
        switch(key) {
            case "STR": case "DEX": case "INT": case "CON": case "APP": case "POW": case "SIZ": case "EDU":
                data["original"][key] = value;
                break;
            case "ｱｲﾃﾞｱ":
                data["ability"]["アイデア"] = value;
                break;
            case "幸 運":
                data["ability"]["幸運"] = value;
                break;
            case "知 識":
                data["ability"]["知識"] = value;
                break;
        }
    }
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
