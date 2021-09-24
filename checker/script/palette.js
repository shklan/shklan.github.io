`use strict`;

const CLiP_BOARD_DATA = {
    "kind": "character",
    "data": {
        "name": "",
        "memo": "",
        "initiative": 0,
        "status": [

        ],
        "params": [
            
        ],
        "secret": false,
        "invisible": false,
        "hideStatus": false,
        "commands": "",
    },
}

const STATUS = {
    "label": "",
    "value": 0,
    "max": 0,
}

const PARAMS = {
    "label": "",
    "value": "",
}

function execCopy() {
    document.addEventListener("copy", _copyData);
    document.execCommand("copy");
    document.removeEventListener("copy", _copyData);
}

function _copyData(event) {
    event.preventDefault();
    const clipborad_data = _clone(CLiP_BOARD_DATA);

    clipborad_data.data.name = FILE_DATA.profile["キャラクター名"];
    clipborad_data.data.memo = FILE_DATA.profile["プロフィール"];
    _setStatus(clipborad_data);
    _setParams(clipborad_data);
    clipborad_data.data.commands = _createChatPalette();

    console.log(clipborad_data);
    event.clipboardData.setData("text/plain", JSON.stringify(clipborad_data));
}

function _setStatus(data) {

}

function _setParams(data) {

}

function _createChatPalette() {
    let chat_palette = "";
    const secret = document.getElementById("secret").checked ? "s" : "";
    // status
    const all_status = FILE_DATA["status"];
    const martial_arts = FILE_DATA["status"]["battle"]["《マーシャルアーツ》"].slice(0, -1);
    const medicine = FILE_DATA["status"]["knowledge"]["《医学》"].slice(0, -1);
    const db = FILE_DATA["parameter"]["original"]["DB"];
    for (let all_key in all_status) {
        const status_data = all_status[all_key];
        const status_keys = Object.keys(status_data);
        for (let i=0, l=status_keys.length; i<l; i++) {
            const key = status_keys[i];
            const value = status_data[key].slice(0, -1);

            chat_palette += secret + "ccb<="+ value + " " + key + "\n";
            switch (key) {
                case "《キック》": case "《こぶし（パンチ）》": case "《頭突き》": case "《組み付き》":
                    const bonus ="(" + db + ")";
                    chat_palette += secret + 1 + DAMAGE[key] + "+" + bonus +  " " + key + "ダメージ" + "\n";
                    if (martial_arts > 1) {
                        const dice = "cbrb" + "(" + martial_arts + "," + value + ")";
                        chat_palette += secret + dice + " " + "MA" + key + "\n";
                        chat_palette += secret + 2 + DAMAGE[key] + "+" + bonus +  " " + "MA" + key + "ダメージ" + "\n";
                    }
                    break;
                case "《応急手当》":
                    chat_palette += secret + "1d3"+ " " + key + "回復" + "\n";
                    if(medicine > 5) {
                        const dice = "cbrb" + "(" + medicine + "," + value + ")";
                        chat_palette += secret + dice + " " + "《医学》＋" + key + "\n";
                        chat_palette += secret + "2d3" + " " + "《医学》＋" + key + "回復" + "\n";
                    }
                    break;
                case "《精神分析》":
                    chat_palette += secret + "1d3"+ " " + key + "回復" + "\n";
                    break;
                default:
                    break;
            }
        }
    }
    
    // parameter original
    const parameter_original = FILE_DATA["parameter"]["original"];
    const original_keys = Object.keys(parameter_original);
    for (let i=0, l=original_keys.length; i<l; i++) {
        const key = original_keys[i];
        const value = parameter_original[key];
        if(key == "DB") continue;
        for (let level = 1; level <= 5; level++) {
            chat_palette += secret + "ccb<=" + value*level + " " + "《" + key + "×" + level + "》" + "\n";
        }        
    }
    // parameter ability
    const parameter_ability = FILE_DATA["parameter"]["ability"];
    const ability_keys = Object.keys(parameter_ability);
    for (let i=0, l=ability_keys.length; i<l; i++) {
        const key = ability_keys[i];
        const value = parameter_ability[key];
        chat_palette += secret + "ccb<=" + value + " " + "《" + key + "》" + "\n";
    }
    chat_palette += secret + "ccb<={SAN} 《SANチェック》\n";
    // console.log(chat_palette);
    return chat_palette;
}

function _clone(src) {
    return JSON.parse(JSON.stringify(src));
}