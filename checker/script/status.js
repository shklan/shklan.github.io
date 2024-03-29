`use strict`;

const DAMAGE = {
    "《こぶし（パンチ）》": "d3",
    "《頭突き》": "d4",
    "《キック》": "d6",
    "《組み付き》": "d6",
}

const RECOVER = {
    "《応急手当》": "d3",
    "《精神分析》": "d3",
}

let STATUS_THRESHOLDS = {};

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

function _setThreshold(ability) {
    _initThreshold(ability);
    const value = document.getElementById("allvalue_setter").value;
    _setAllThreshold(value);
}

function _initThreshold(ability) {
    for (let type in ability) {
        const status = ability[type];
        for (let key in status) {
            STATUS_THRESHOLDS[key] = -1;
        }
    }    
}

function _setAllThreshold(value) {
    if (value < 0) {
        value = document.getElementById("allvalue_setter").value = 0;
    } else if (value > 99) {
        value = document.getElementById("allvalue_setter").value = 99;
    }
    const keys = Object.keys(STATUS_THRESHOLDS);
    for (let i=0, l=keys.length; i<l; i++) {
        STATUS_THRESHOLDS[keys[i]] = value;
    }
}

function _setCustomThreshold(key, value) {
    console.log(key);
    console.log(value);
    STATUS_THRESHOLDS[key] = value;
}

function _deleteThreshold() {
    const keys = Object.keys(STATUS_THRESHOLDS);
    for (let i=0, l=keys.length; i<l; i++) {
        delete STATUS_THRESHOLDS[keys[i]];
    }
}

function _getThreshold() {
    return STATUS_THRESHOLDS;
}