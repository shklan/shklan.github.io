`use strict`;

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

function revalidate() {
    _clearDataOutput();
    _validate();
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

function _printStatus(output, all_data, statusThreshold) {
    const all_keys = Object.keys(all_data);
    for (let all_i=0, all_l=all_keys.length; all_i<all_l; all_i++) {
        const data = all_data[all_keys[all_i]];
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

async function _extractData(file) {
    let data = {};
    let text = await _read(file);
    data["profile"] = _extractProfile(text);
    data["status"] = _extractStatus(text);
    data["parameter"] = _extractParameters(text);
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
    let battle_data = {};
    let search_data = {};
    let action_data = {};
    let negotiation_data = {};
    let knowledge_data = {};
    let data;
    let tokens = text.split("■技能■")[1].split(/\n|\s|　/);
    for(let i=0, l=tokens.length; i<l; i++) {
        if (tokens[i] == "■戦闘■") {
            break;
        }
        const text = tokens[i];
        switch(text[0]) {
            case "戦":
                data = battle_data;
                break;
            case "探":
                data = search_data;
                break;
            case "行":
                data = action_data;
                break;
            case "交":
                data = negotiation_data;
                break;
            case "知":
                data = knowledge_data;
                break;
            case "《": 
                const num_a = text.split("》")[1];
                if (num_a.length == 0) {
                    const next = _nextNum(i+1, tokens);
                    if(next.length > 1) data[text]=next;
                } else {
                    key = text.slice(0, text.indexOf(num_a));
                    if(num_a.length > 1) data[key]=num_a;
                }
                break;
            case "●":
                const num_b = text.split("》")[1];
                if (num_b.length == 0) {
                    const next = _nextNum(i+1, tokens)
                    if(next.length > 1) data[text.slice(1)]=next;
                } else {
                    key = text.slice(1, text.indexOf(num_b));
                    if(num_b.length > 1) data[key]=num_b; 
                }
                break;
        }
    }
    return {"battle": battle_data, "search": search_data, "action": action_data, "negotiation": negotiation_data, "knowledge": knowledge_data};
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
            case "ﾀﾞﾒｰｼﾞﾎﾞｰﾅｽ":
                data["original"]["DB"] = value;
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