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
    console.log(clipborad_data);

    clipborad_data.data.name = FILE_DATA.character["キャラクター名"];
    _setStatus(FILE_DATA.status, clipborad_data.data.status);
    _setParams(FILE_DATA.parameter, clipborad_data.data);

    clipborad_data.data.commands = _createCommand();
    
    event.clipboardData.setData("text/plain", JSON.stringify(clipborad_data));
}

function _setStatus(status, data) {
    for (let key in status) {
        const item = _clone(STATUS);
        const value = Number(status[key]);
        item.label = key;
        item.value = value;
        item.max = value;
        data.push(item);
    }
}

function _setParams(parameter, data) {
    for (let key in parameter) {
        const item = _clone(PARAMS);
        const value = parameter[key];
        item.label = key;
        item.value = value;
        data.params.push(item);
        if (key == "DEX") {
            data.initiative = Number(value);
        }
    }
}

function _createCommand() {
    let command = "";
    const secret = document.getElementById("secret").checked ? "s" : "";
    command += _createParameterCommand(FILE_DATA.parameter, secret);
    command += _createAbilityCommand(FILE_DATA.ability, secret);
    command += secret + "ccb<={SAN} 《SANチェック》\n";
    return command;
}

function _createParameterCommand(parameter, secret) {
    let command = "";
    for (let key in parameter) {
        if (key == "DB") continue;
        for (let level = 1; level <= 5; level++) {
            const thr = "{" + key + "}" + "*" + level;
            const label = "《" + key + "×" + level + "》";
            command += secret + "ccb<=" + thr + " " + label + "\n";
        }
    }
    return command;
}

function _createAbilityCommand(ability, secret) {
    let command = "";
    const martial_arts = ability.battle["マーシャルアーツ"];
    const medicine = ability.knowledge["医学"];
    // battle
    for (let key in ability.battle) {
        const thr = ability.battle[key];
        const name = _decorateKey(key);

        const damage = DAMAGE[name];
        command += secret + "ccb<="+ thr + " " + name + "\n";
        if (damage !== undefined) {
            const bonus = "({DB})";
            const label = name + "ダメージ";
            command += secret + "1" + damage + "+" + bonus + " " + label + "\n";
            if (martial_arts > 1) {
                const dice = "cbrb" + "(" + martial_arts + "," + thr + ")";
                const martial_key = "MA" + name;
                const martial_label = martial_key + "ダメージ";
                command += secret + dice + " " + martial_key + "\n";
                command += secret + "2" + damage + "+" + bonus + " " + martial_label + "\n";
            }
        }
    }
    // explore
    for (let key in ability.explore) {
        const thr = ability.explore[key];
        const name = _decorateKey(key);

        const recover = RECOVER[name];
        command += secret + "ccb<=" + thr + " " + name + "\n";
        if (recover !== undefined) {
            const label = key + "回復";
            command += secret + "1" + recover + " " + label + "\n";
        }
        if (name == "《応急手当》" && medicine > 5) {            
            const dice = "cbrb" + "(" + medicine + "," + thr + ")";
            const medicine_key = "《医学》" + "＋" + name;
            const medicine_label = medicine_key + "回復";
            command += secret + dice + " " + medicine_key + "\n";
            command += secret + "2" + recover + " " + medicine_label + "\n";
        }
    }
    // action
    for (let key in ability.action) {
        const thr = ability.action[key];
        const name = _decorateKey(key);

        command += secret + "ccb<=" + thr + " " + name + "\n";
    }
    // negotiation
    for (let key in ability.negotiation) {
        const thr = ability.negotiation[key];
        const name = _decorateKey(key);

        command += secret + "ccb<=" + thr + " " + name + "\n";
    }
    // knowledge
    for (let key in ability.knowledge) {
        const thr = ability.knowledge[key];
        const name = _decorateKey(key);

        command += secret + "ccb<=" + thr + " " + name + "\n";
    }
    return command;
}

function _decorateKey(key) {
    return "《" + key + "》";
}

function _clone(src) {
    return JSON.parse(JSON.stringify(src));
}