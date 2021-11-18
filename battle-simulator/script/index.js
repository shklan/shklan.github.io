/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _elements_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/module */ \"./elements/module.ts\");\n\r\nclass Startup {\r\n    static main() {\r\n        const dice = new _elements_module__WEBPACK_IMPORTED_MODULE_0__.Dice(3, 6);\r\n        const friends = new _elements_module__WEBPACK_IMPORTED_MODULE_0__.ActorList();\r\n        const enemies = new _elements_module__WEBPACK_IMPORTED_MODULE_0__.ActorList();\r\n        const field = new _elements_module__WEBPACK_IMPORTED_MODULE_0__.BattleField(friends, enemies);\r\n        console.log('Hello World');\r\n        // for(let i: number = 0, j: number = 5; i<j; i++) console.log(dice.roll());\r\n        document.getElementsByClassName('start-battle')[0].addEventListener('click', field.battleStartListener.bind(field));\r\n        document.getElementsByClassName('add-actor')[0].addEventListener('click', friends.actorAddListener.bind(friends));\r\n        document.getElementsByClassName('add-actor')[1].addEventListener('click', enemies.actorAddListener.bind(enemies));\r\n        return 0;\r\n    }\r\n}\r\nwindow.onload = () => {\r\n    Startup.main();\r\n};\r\n\n\n//# sourceURL=webpack://script/./main.js?");

/***/ }),

/***/ "./elements/Actor.ts":
/*!***************************!*\
  !*** ./elements/Actor.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Actor)\n/* harmony export */ });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ \"./elements/module.ts\");\n\r\nclass Actor {\r\n    constructor() {\r\n        this.name = '';\r\n        this.status = new _module__WEBPACK_IMPORTED_MODULE_0__.Status();\r\n        this.action_list = new Array();\r\n        this.attack_rate = 0.5;\r\n        this.avoid_rate = 0.5;\r\n    }\r\n    _addActionListener(e) {\r\n    }\r\n    _deleteActionListener(e) {\r\n    }\r\n    createElement() {\r\n        const root_node = document.createElement('div');\r\n        root_node.className = 'actor-root';\r\n        root_node.appendChild(this._createActorElement());\r\n        return root_node;\r\n    }\r\n    _createActorElement() {\r\n        const actor_node = document.createElement('div');\r\n        actor_node.className = 'actor';\r\n        actor_node.appendChild(this._createDeleteElement());\r\n        actor_node.appendChild(this._createNameElement());\r\n        actor_node.appendChild(this._createStatusElement());\r\n        actor_node.appendChild(this._createActionListElement());\r\n        return actor_node;\r\n    }\r\n    _createDeleteElement() {\r\n        const root_node = document.createElement('div');\r\n        root_node.className = 'delete-actor';\r\n        const delete_node = document.createElement('button');\r\n        delete_node.innerText = '削除';\r\n        root_node.appendChild(delete_node);\r\n        return root_node;\r\n    }\r\n    _createNameElement() {\r\n        const root_node = document.createElement('div');\r\n        root_node.className = 'name';\r\n        const description_node = this._createDescriptionElement('名前');\r\n        description_node.className = 'name-description';\r\n        const name_node = document.createElement('div');\r\n        const name_input_node = document.createElement('input');\r\n        name_node.className = 'name-input';\r\n        name_input_node.type = 'text';\r\n        name_input_node.addEventListener('change', this._nameChangeListener.bind(this));\r\n        name_node.appendChild(name_input_node);\r\n        root_node.appendChild(description_node);\r\n        root_node.appendChild(name_node);\r\n        return root_node;\r\n    }\r\n    _nameChangeListener(e) {\r\n        e.stopPropagation();\r\n        const target = e.target;\r\n        const value = target.value;\r\n        this.name = value;\r\n        console.log(this.name);\r\n    }\r\n    _createStatusElement() {\r\n        const status_node = document.createElement('div');\r\n        status_node.className = 'status';\r\n        status_node.appendChild(this._createStatusTableElement());\r\n        // san\r\n        const san_node = this._createSanElement();\r\n        status_node.appendChild(san_node);\r\n        // 回避\r\n        const avoidance_node = this._createAvoidanceElement();\r\n        status_node.appendChild(avoidance_node);\r\n        return status_node;\r\n    }\r\n    _createStatusTableElement() {\r\n        // status_table_node\r\n        const root_node = document.createElement('div');\r\n        const status_table_node = document.createElement('table');\r\n        status_table_node.className = 'status-table';\r\n        status_table_node.appendChild(this._createStatusTableBodyElement());\r\n        root_node.appendChild(status_table_node);\r\n        return root_node;\r\n    }\r\n    _createStatusTableBodyElement() {\r\n        // 能力値テーブル\r\n        // status_table_body_node\r\n        const status_table_body_node = document.createElement('tbody');\r\n        const status_name_column = document.createElement('tr');\r\n        const status_input_column = document.createElement('tr');\r\n        for (const status_name of this.status.getKeys()) {\r\n            // status_name_cell\r\n            const status_name_cell = document.createElement('td');\r\n            status_name_cell.innerText = status_name;\r\n            // status_input_cell\r\n            const status_input_cell = document.createElement('td');\r\n            // status_input_node\r\n            const status_input_node = document.createElement('input');\r\n            const status_value = this.status.getStatus(status_name);\r\n            status_input_node.className = 'status-input';\r\n            status_input_node.type = 'number';\r\n            status_input_node.min = '1';\r\n            status_input_node.step = '1';\r\n            status_input_node.value = status_value.toString();\r\n            status_input_cell.appendChild(status_input_node);\r\n            status_name_column.appendChild(status_name_cell);\r\n            status_input_column.appendChild(status_input_cell);\r\n        }\r\n        status_table_body_node.addEventListener('change', this._statusChangeListener.bind(this));\r\n        status_table_body_node.appendChild(status_name_column);\r\n        status_table_body_node.appendChild(status_input_column);\r\n        return status_table_body_node;\r\n    }\r\n    _statusChangeListener(e) {\r\n        e.stopPropagation();\r\n        const target = e.target;\r\n        const tbody = e.currentTarget;\r\n        const status_cell = target.parentElement;\r\n        const status_row = status_cell.parentElement;\r\n        const value = Number(target.value);\r\n        const index = Array.prototype.slice.call(status_row.cells).indexOf(status_cell);\r\n        const name_node = tbody.children[0].children[index];\r\n        const name = name_node.innerText;\r\n        this.status.setStatus(name, value);\r\n    }\r\n    _createSanElement() {\r\n        const root_node = document.createElement('div');\r\n        root_node.className = 'san option-root';\r\n        const input_description_node = this._createDescriptionElement('SAN（％）');\r\n        input_description_node.className = 'option-description';\r\n        const input_node = this._createNumberInputElement('input', true);\r\n        input_node.addEventListener('change', this._sanInputChangeListener.bind(this));\r\n        input_node.className = 'option';\r\n        input_node.style.visibility = 'hidden';\r\n        const checkbox_description_node = this._createDescriptionElement('手動入力');\r\n        checkbox_description_node.className = 'option-short-description';\r\n        const checkbox_node = this._createCheckBoxElement();\r\n        checkbox_node.addEventListener('change', this._sanCheckboxChangeListener.bind(this));\r\n        checkbox_node.className = 'option';\r\n        root_node.appendChild(input_description_node);\r\n        root_node.appendChild(checkbox_description_node);\r\n        root_node.appendChild(checkbox_node);\r\n        root_node.appendChild(input_node);\r\n        return root_node;\r\n    }\r\n    _sanInputChangeListener(e) {\r\n        e.stopPropagation();\r\n        const target = e.target;\r\n        this.status.setSan(Number(target.value));\r\n    }\r\n    _sanCheckboxChangeListener(e) {\r\n        e.stopPropagation();\r\n        const target = e.currentTarget;\r\n        const root = target.parentElement;\r\n        const input = root.children[3].children[0];\r\n        input.disabled = !input.disabled;\r\n        input.style.visibility = input.disabled ? 'hidden' : 'visible';\r\n        this.status.san_auto = !this.status.san_auto;\r\n        this.status.setSan(Number(input.value));\r\n    }\r\n    _createAvoidanceElement() {\r\n        const root_node = document.createElement('div');\r\n        root_node.className = 'avoidance option-root';\r\n        const input_description_node = this._createDescriptionElement('回避（％）');\r\n        input_description_node.className = 'option-description';\r\n        const input_node = this._createNumberInputElement('input', true);\r\n        input_node.addEventListener('change', this._avoidanceInputChangeListener.bind(this));\r\n        input_node.className = 'option';\r\n        input_node.style.visibility = 'hidden';\r\n        const checkbox_description_node = this._createDescriptionElement('手動入力');\r\n        checkbox_description_node.className = 'option-short-description';\r\n        const checkbox_node = this._createCheckBoxElement();\r\n        checkbox_node.addEventListener('change', this._avoidanceCheckboxChangeListener.bind(this));\r\n        checkbox_node.className = 'option';\r\n        root_node.appendChild(input_description_node);\r\n        root_node.appendChild(checkbox_description_node);\r\n        root_node.appendChild(checkbox_node);\r\n        root_node.appendChild(input_node);\r\n        return root_node;\r\n    }\r\n    _avoidanceInputChangeListener(e) {\r\n        e.stopPropagation();\r\n        const target = e.target;\r\n        this.status.setAvoidance(Number(target.value));\r\n    }\r\n    _avoidanceCheckboxChangeListener(e) {\r\n        e.stopPropagation();\r\n        const target = e.currentTarget;\r\n        const root = target.parentElement;\r\n        const input = root.children[3].children[0];\r\n        input.disabled = !input.disabled;\r\n        input.style.visibility = input.disabled ? 'hidden' : 'visible';\r\n        this.status.avoidance_auto = !this.status.avoidance_auto;\r\n        this.status.setAvoidance(Number(input.value));\r\n    }\r\n    _createActionListElement() {\r\n        // 行動\r\n        const root_node = document.createElement('div');\r\n        root_node.className = 'action-root';\r\n        const basic_node = document.createElement('div');\r\n        basic_node.addEventListener('change', this._basicOptionChangeListener.bind(this));\r\n        basic_node.className = 'action option-root';\r\n        // 攻撃率\r\n        const attack_description_node = this._createDescriptionElement('攻撃選択率（％）');\r\n        attack_description_node.className = 'option-long-description';\r\n        const attack_input_node = this._createNumberInputElement('input attack-rate', false, '50', '0', '100');\r\n        attack_input_node.className = 'option';\r\n        // 回避率\r\n        const avoidance_description_node = this._createDescriptionElement('回避選択率（％）');\r\n        avoidance_description_node.className = 'option-long-description';\r\n        const avoidance_input_node = this._createNumberInputElement('input avoid-rate', false, '50', '0', '100');\r\n        avoidance_input_node.className = 'option';\r\n        basic_node.appendChild(attack_description_node);\r\n        basic_node.appendChild(attack_input_node);\r\n        basic_node.appendChild(avoidance_description_node);\r\n        basic_node.appendChild(avoidance_input_node);\r\n        root_node.appendChild(basic_node);\r\n        return root_node;\r\n    }\r\n    _basicOptionChangeListener(e) {\r\n        e.stopPropagation();\r\n        const target = e.target;\r\n        let value = Number(target.value);\r\n        if (!target.checkValidity()) {\r\n            console.log('invalid input!');\r\n            target.value = \"50\";\r\n            value = 50;\r\n        }\r\n        const root = e.currentTarget;\r\n        const class_list = target.classList;\r\n        if (Array.prototype.includes.call(class_list, \"attack-rate\")) {\r\n            this.attack_rate = value / 100;\r\n            this.avoid_rate = (100 - value) / 100;\r\n            const other = root.children[3].children[0];\r\n            other.value = (100 - value).toString();\r\n        }\r\n        else {\r\n            this.avoid_rate = value / 100;\r\n            this.attack_rate = (100 - value) / 100;\r\n            const other = root.children[1].children[0];\r\n            other.value = (100 - value).toString();\r\n        }\r\n        // console.log(this.attack_rate, this.avoid_rate);\r\n    }\r\n    _createNumberInputElement(input_class_name, disabled = false, default_value = '0', min = '0', max = '99') {\r\n        const root_node = document.createElement('div');\r\n        const input_node = document.createElement('input');\r\n        input_node.className = input_class_name;\r\n        input_node.type = 'number';\r\n        input_node.disabled = disabled;\r\n        input_node.value = default_value;\r\n        input_node.min = min;\r\n        input_node.max = max;\r\n        input_node.step = '1';\r\n        root_node.appendChild(input_node);\r\n        return root_node;\r\n    }\r\n    _createCheckBoxElement() {\r\n        const root_node = document.createElement('div');\r\n        const checkbox_node = document.createElement('input');\r\n        checkbox_node.type = 'checkbox';\r\n        root_node.appendChild(checkbox_node);\r\n        return root_node;\r\n    }\r\n    _createDescriptionElement(description) {\r\n        const root_node = document.createElement('div');\r\n        root_node.innerText = description;\r\n        return root_node;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://script/./elements/Actor.ts?");

/***/ }),

/***/ "./elements/ActorList.ts":
/*!*******************************!*\
  !*** ./elements/ActorList.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ActorList)\n/* harmony export */ });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ \"./elements/module.ts\");\n\r\nclass ActorList {\r\n    constructor() {\r\n        this._actor_list = new Array();\r\n    }\r\n    actorAddListener(e) {\r\n        const button = e.currentTarget;\r\n        const actor_list_html = button.parentElement.nextElementSibling;\r\n        const new_actor = new _module__WEBPACK_IMPORTED_MODULE_0__.Actor();\r\n        const new_element = new_actor.createElement();\r\n        new_element.addEventListener('click', this._actorDeleteListener.bind(this));\r\n        actor_list_html.appendChild(new_element);\r\n        this._actor_list.push(new_actor);\r\n    }\r\n    _actorDeleteListener(e) {\r\n        const target = e.target;\r\n        if (target instanceof HTMLButtonElement) {\r\n            const target_actor_element = e.currentTarget;\r\n            const actors_element = target_actor_element.parentElement;\r\n            const children_element = Array.prototype.slice.call(actors_element.children);\r\n            const index = children_element.indexOf(target_actor_element);\r\n            actors_element.removeChild(target_actor_element);\r\n            this._actor_list.splice(index, 1);\r\n            console.log('deleted');\r\n        }\r\n    }\r\n    getActorLength() {\r\n        return this._actor_list.length;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://script/./elements/ActorList.ts?");

/***/ }),

/***/ "./elements/BattleField.ts":
/*!*********************************!*\
  !*** ./elements/BattleField.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BattleField)\n/* harmony export */ });\nclass BattleField {\r\n    constructor(friends, enemies) {\r\n        this._friends = friends;\r\n        this._enemies = enemies;\r\n    }\r\n    battleStartListener(e) {\r\n        e.stopPropagation();\r\n        if (this._friends.getActorLength() == 0 || this._enemies.getActorLength() == 0) {\r\n            console.log('cannot start simulation');\r\n        }\r\n        else {\r\n            console.log('start simulation');\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://script/./elements/BattleField.ts?");

/***/ }),

/***/ "./elements/Dice.ts":
/*!**************************!*\
  !*** ./elements/Dice.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Dice)\n/* harmony export */ });\nclass Dice {\r\n    constructor(dicenum, dicesize) {\r\n        this.dicenum = dicenum;\r\n        this.dicesize = dicesize;\r\n    }\r\n    roll() {\r\n        let sum = 0;\r\n        for (let i = 0; i < this.dicenum; i++)\r\n            sum += this.getRandomInt(1, this.dicesize + 1);\r\n        return sum;\r\n    }\r\n    // return int x (min <= x < max)\r\n    getRandomInt(min, max) {\r\n        return Math.floor(Math.random() * (max - min) + min);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://script/./elements/Dice.ts?");

/***/ }),

/***/ "./elements/Status.ts":
/*!****************************!*\
  !*** ./elements/Status.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Status)\n/* harmony export */ });\nclass Status {\r\n    constructor() {\r\n        this._state = new Map();\r\n        this._state.set(\"HP\", 0);\r\n        this._state.set(\"MP\", 0);\r\n        this._state.set(\"STR\", 0);\r\n        this._state.set(\"CON\", 0);\r\n        this._state.set(\"POW\", 0);\r\n        this._state.set(\"DEX\", 0);\r\n        this._state.set(\"APP\", 0);\r\n        this._state.set(\"SIZ\", 0);\r\n        this._state.set(\"INT\", 0);\r\n        this._state.set(\"EDU\", 0);\r\n        this._san = 0;\r\n        this._avoidance = 0;\r\n        this._db = \"+0\";\r\n        this.san_auto = true;\r\n        this.avoidance_auto = true;\r\n    }\r\n    setStatus(name, val) {\r\n        if (this._state.has(name))\r\n            this._state.set(name, val);\r\n        // console.log(name + ' -> ' + val);\r\n        this.updateDefaultStatus();\r\n    }\r\n    updateDefaultStatus() {\r\n        if (this.san_auto)\r\n            this._setDefaultSan();\r\n        if (this.avoidance_auto)\r\n            this._setDefaultAvoidance();\r\n        this._setDefaultDb();\r\n    }\r\n    getKeys() {\r\n        return this._state.keys();\r\n    }\r\n    getStatus(name) {\r\n        return this._state.get(name);\r\n    }\r\n    getSan() {\r\n        return this._san;\r\n    }\r\n    getAvoidance() {\r\n        return this._avoidance;\r\n    }\r\n    setSan(new_value) {\r\n        if (!this.san_auto)\r\n            this._san = new_value;\r\n        else\r\n            this._setDefaultSan();\r\n        console.log(this._san);\r\n    }\r\n    setAvoidance(new_value) {\r\n        if (!this.avoidance_auto)\r\n            this._avoidance = new_value;\r\n        else\r\n            this._setDefaultAvoidance();\r\n        console.log(this._avoidance);\r\n    }\r\n    _setDefaultSan() {\r\n        this._san = this._state.get(\"POW\") * 5;\r\n    }\r\n    _setDefaultAvoidance() {\r\n        this._avoidance = this._state.get(\"DEX\") * 2;\r\n    }\r\n    _setDefaultDb() {\r\n        const str = this._state.get(\"STR\");\r\n        const siz = this._state.get(\"SIZ\");\r\n        const base = str + siz - 16;\r\n        const dice = Math.floor((base - 1) / 16);\r\n        if (dice == 0) {\r\n            if (base > -12 && base <= -8)\r\n                this._db = \"-1d6\";\r\n            else if (base > -8 && base <= 0)\r\n                this._db = \"-1d4\";\r\n            else if (base > 0 && base <= 8)\r\n                this._db = \"+0\";\r\n            else if (base > 8 && base <= 16)\r\n                this._db = \"+1d4\";\r\n        }\r\n        else {\r\n            this._db = \"+\" + dice + \"d6\";\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://script/./elements/Status.ts?");

/***/ }),

/***/ "./elements/module.ts":
/*!****************************!*\
  !*** ./elements/module.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Dice\": () => (/* reexport safe */ _Dice__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"Status\": () => (/* reexport safe */ _Status__WEBPACK_IMPORTED_MODULE_1__.default),\n/* harmony export */   \"Actor\": () => (/* reexport safe */ _Actor__WEBPACK_IMPORTED_MODULE_2__.default),\n/* harmony export */   \"ActorList\": () => (/* reexport safe */ _ActorList__WEBPACK_IMPORTED_MODULE_3__.default),\n/* harmony export */   \"BattleField\": () => (/* reexport safe */ _BattleField__WEBPACK_IMPORTED_MODULE_4__.default)\n/* harmony export */ });\n/* harmony import */ var _Dice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dice */ \"./elements/Dice.ts\");\n/* harmony import */ var _Status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Status */ \"./elements/Status.ts\");\n/* harmony import */ var _Actor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Actor */ \"./elements/Actor.ts\");\n/* harmony import */ var _ActorList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ActorList */ \"./elements/ActorList.ts\");\n/* harmony import */ var _BattleField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BattleField */ \"./elements/BattleField.ts\");\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://script/./elements/module.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;