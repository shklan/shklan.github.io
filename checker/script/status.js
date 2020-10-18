`use strict`;

function _setThreshold(status) {
    if (Object.keys(_statusThresholds).length == 0) {
        _initThreshold(status);
    }
}

function _initThreshold(status) {
    const keys = Object.keys(status);
    for (let i=0, l=keys.length; i<l; i++) {
        _statusThresholds[keys[i]] = -1;
    }
    const value = document.getElementById("allvalue_setter").value;
    _setAllThreshold(value);
}

function _setAllThreshold(value) {
    if (value < 0) {
        value = document.getElementById("allvalue_setter").value = 0;
    } else if (value > 99) {
        value = document.getElementById("allvalue_setter").value = 99;
    }
    const keys = Object.keys(_statusThresholds);
    for (let i=0, l=keys.length; i<l; i++) {
        _statusThresholds[keys[i]] = value;
    }
}

function _setCustomThreshold(key, value) {
    console.log(key);
    console.log(value);
    _statusThresholds[key] = value;
}

function _deleteThreshold() {
    const keys = Object.keys(_statusThresholds);
    for (let i=0, l=keys.length; i<l; i++) {
        delete _statusThresholds[keys[i]];
    }
}

function _getThreshold() {
    return _statusThresholds;
}

const _statusThresholds = {};