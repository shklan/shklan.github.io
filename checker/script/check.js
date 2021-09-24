`use strict`;

const FILE_DATA_FORMAT = {
    "profile": {},
    "status": {},
    "ability": {
        "battle": {},
        "explore": {},
        "action": {},
        "negotiation": {},
        "knowledge": {},
    },
    "weapon": {},
    "personaleffects": {},
};

let FILE_DATA = null;

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
    await _extractData(file);
    _setThreshold(FILE_DATA["status"]);
    const statusThreshold = _getThreshold();

    _printStatus(status_output, FILE_DATA["status"], statusThreshold);
    // _printProfile(profile_output, FILE_DATA["profile"]);
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
    FILE_DATA = _clone(FILE_DATA_FORMAT);
    const text = await _read(file);
    const tokens = text.split(/\r*\n|\s+|●|《|》|\//).filter(token => token.length > 0);
    const parser = _makeParser(tokens);
    _extractCharacter(parser);
    _extractStatus(parser);
    _extractAbility(parser);
    const damage_bonus = parser.next();
    _extractWeapon(parser);
    _extractPersonalEffects(parser);
    _extractOther(parser);
    _extractSimpleData(parser);
    // _extractProfile(parser);

    console.log(tokens);
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
        const [key, ...value] = token.split("：");
        FILE_DATA.profile[key] = value.join();
    }
}

function _extractStatus(parser) {
    const hp = parser.next().split("：")[1];
    const mp = parser.next().split("：")[1];
    const san = parser.next().split("：")[1];
    FILE_DATA.status["HP"] = hp;
    FILE_DATA.status["MP"] = mp;
    FILE_DATA.status["SAN"] = san;

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
    for (let i=0, l=status_name_list.length; i<l; i++) {
        if (status_begin_list[i] != status_end_list[i]) {
            // 警告を出す処理
        }
        FILE_DATA.status[status_name_list[i]] = status_end_list[i];
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
    while ((token = parser.next()) != null && (token != "■戦闘■" || token != "------------------------")) {
        const key = token;
        const value = parser.next();
        if (!value.endsWith("％")) {
            break;
        }
        const num = value.slice(0, -1);
        if (num.length) {
            data["《" + key + "》"] = num;
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