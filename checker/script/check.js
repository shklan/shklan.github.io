`use strict`;

const FILE_DATA_FORMAT = {
    "character": {},
    "status": {},
    "parameter": {},
    "ability": {
        "battle": {},
        "explore": {},
        "action": {},
        "negotiation": {},
        "knowledge": {},
    },
    "weapon": {},
    "personaleffects": {},
    "other": {},
    "profile": {},
};

let FILE_DATA = null;
let PRESET = null;

async function _validate() {
    const err = new Error();
    console.log("validation start");
    files = document.getElementById("fileInput").files;
    const files_len = files.length;
    const status_output = document.getElementById("status");
    const warning_output = document.getElementById("warning");
    if (files_len != 1) {
        throw err;
    }
    const file = files[0];
    await _extractData(file);
    _setThreshold(FILE_DATA.ability);
    _printStatus(status_output, FILE_DATA.ability);
    if (Object.keys(PRESET).length > 0) {
        _printWarning(warning_output);        
    } else {
        _enableChatPaletteCopyButton();
    }
}

function revalidate() {
    _clearDataOutput();
    _validate();
}

function presetValue(event) {
    const target = event.target;
    const key = target.parentElement.innerText;
    const value = target.value;
    PRESET[key] = value;
    console.log(PRESET);
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

function _printStatus(output, ability) {
    for (let type in ability) {
        const status = ability[type];
        for (let key in status) {
            const thr = STATUS_THRESHOLDS[key];
            const value = status[key];
            if (Number(value) > thr) {
                output.innerHTML += '<font color = "red">' + key + ": " + value + "</font><br>";
            } else {
                output.innerHTML += key + ": " + value + "<br>";
            }
        }
    }
}

function _printWarning(output) {
    output.innerHTML += '<font color = "red">正しく読み取れなかった値があります<font><br>';
    output.innerHTML += "手動で設定してください<br>";
    for (let key in PRESET) {
        _createPresetInput(key);
    }
    const revalidate_button = document.createElement("button");
    revalidate_button.innerText = "再チェック";
    revalidate_button.onclick = revalidate;
    document.getElementById("warning").appendChild(revalidate_button);
}

function _createPresetInput(key) {
    const warn = document.getElementById("warning");
    const div_elem = document.createElement("div");
    const label_elem = document.createElement("label");
    const input_elem = document.createElement("input");

    label_elem.innerText = key;
    input_elem.type = "text";
    
    label_elem.appendChild(input_elem);
    div_elem.appendChild(label_elem);
    warn.appendChild(div_elem);
}

async function _extractData(file) {
    FILE_DATA = _clone(FILE_DATA_FORMAT);
    console.log(PRESET);
    if (PRESET == null) {
        PRESET = {};
    }
    const text = await _read(file);
    const tokens = text.split(/\r*\n|\s+|●|《|》|\//).filter(token => token.length > 0);
    const parser = _makeParser(tokens);
    _extractCharacter(parser);
    _extractStatus(parser);
    _extractParameter(parser);
    _extractAbility(parser);
    const damage_bonus = parser.next();
    FILE_DATA.parameter["DB"] = damage_bonus.split("：")[1];
    _extractWeapon(parser);
    _extractPersonalEffects(parser);
    _extractOther(parser);
    _extractSimpleData(parser);
    _extractProfile(parser);

    console.log(FILE_DATA);
    return;
}

function _read(file) {
    const reader = new FileReader();
    reader.readAsText(file);
    return new Promise ((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
    })
}

function _inPreset(key) {
    return PRESET.hasOwnProperty(key);
}

function _popPresetValue(key) {
    const value = PRESET[key];
    delete PRESET[key];
    return value;
}

function _makeParser(tokens) {
    const max = tokens.length;
    let seek = 0;
    return {
        "next": function () {
            return (seek < max) ? tokens[seek++] : null;
        },
        "skipTo": function (token) {
            while(seek < max && tokens[seek] != token) {
                seek++;
            }
        },
    }
}
function _extractCharacter(parser) {
    let token;
    while ((token = parser.next()) != null && token != "■能力値■") {
        const [key, ...val] = token.split("：");
        const value = val.join();
        if (value.length) {
            FILE_DATA.character[key] = value;
        }        
    }
}

function _warnEquality(key, src, dst) {
    if (src != dst) {
        PRESET[key] = Number.NaN;
        return false;
    } else {
        return true;
    }
}

function _warnValue(key, value) {
    const num = Number(value);
    if (isNaN(num)) {
        PRESET[key] = Number.NaN;
        return false;
    } else {
        return true;
    }
}

function _extractStatus(parser) {
    // hp
    const hp = _inPreset("HP") ? _popPresetValue("HP") : parser.next().split("：")[1];
    if (_warnValue("HP", hp)) FILE_DATA.status["HP"] = hp;
    // mp
    const mp = _inPreset("MP") ? _popPresetValue("MP") : parser.next().split("：")[1];
    if (_warnValue("MP", mp)) FILE_DATA.status["MP"] = mp;
    // san
    const san = _inPreset("SAN") ? _popPresetValue("SAN") : parser.next().split("：")[1];
    if (_warnValue("SAN", san)) FILE_DATA.status["SAN"] = san;
}

function _extractParameter(parser) {
    let token;
    let status_name_list = []; 
    let status_begin_list = [];
    let status_end_list = [];

    token = parser.skipTo("STR");
    while ((token = parser.next()) != null && token != "作成時") {
        status_name_list.push(token);
    }
    while ((token = parser.next()) != null && token != "成長等") {
        status_begin_list.push(token);
    }
    token = parser.skipTo("=合計=");
    parser.next();
    while ((token = parser.next()) != null && token != "■技能■") {
        status_end_list.push(token);
    }
    for (let i=0, l=status_name_list.length; i<l-2; i++) {//hp, mp 除外
        const key = status_name_list[i];
        const presetValue = _inPreset(key) ? _popPresetValue(key) : null;
        const befere = (presetValue == null) ? status_begin_list[i] : presetValue;
        const after = (presetValue == null) ? status_end_list[i] : presetValue;
        if (_warnEquality(key, befere, after) || _warnValue(key, after)) {
            FILE_DATA.parameter[key] = after;
        }
    }
}

function _extractAbility(parser) {
    // battle
    parser.skipTo("回避");
    _extractSpecificAbilityTo(parser, FILE_DATA.ability.battle)
    // explore
    parser.skipTo("応急手当");
    _extractSpecificAbilityTo(parser, FILE_DATA.ability.explore)
    // action
    parser.skipTo("運転");
    _extractSpecificAbilityTo(parser, FILE_DATA.ability.action)
    // negotiation
    parser.skipTo("言いくるめ");
    _extractSpecificAbilityTo(parser, FILE_DATA.ability.negotiation)
    // knowledge
    parser.skipTo("医学");
    _extractSpecificAbilityTo(parser, FILE_DATA.ability.knowledge)
}

function _extractSpecificAbilityTo(parser, data) {
    let token;
    while ((token = parser.next()) != null && token != "■戦闘■" && token != "------------------------") {
        const key = token;
        const value = parser.next();
        if (!value.endsWith("％")) {
            break;
        }
        const num = _inPreset(key) ? _popPresetValue(key) : value.slice(0, -1);
        if (_warnValue(key, num) && num.length > 0) {
            data[key] = num;
        }
    }
}

function _extractWeapon(parser) {
    let token;
    parser.skipTo("備考");
    while ((token = parser.next()) != null && token != "■所持品■") {
        //TODO
    }
}

function _extractPersonalEffects(parser) {
    let token;
    parser.skipTo("備考");
    while ((token = parser.next()) != null && token != "■その他■") {
        //TODO
    }
}

function _extractOther(parser) {
    let token;
    while ((token = parser.next()) != null && token != "■簡易用■") {
        //TODO
    }
}

function _extractSimpleData(parser) {
    let token;
    while ((token = parser.next()) != null && token != "[プロフィール]") {
        //TODO
    }
}

function _extractProfile(parser) {
    let token;
    while ((token = parser.next()) != null) {
        //TODO
    }
}