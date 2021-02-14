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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _elements_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/module */ \"./elements/module.ts\");\n\r\nclass Startup {\r\n    static main() {\r\n        const dice = new _elements_module__WEBPACK_IMPORTED_MODULE_0__.Dice(3, 6);\r\n        const friends = new _elements_module__WEBPACK_IMPORTED_MODULE_0__.ActorList();\r\n        const enemies = new _elements_module__WEBPACK_IMPORTED_MODULE_0__.ActorList();\r\n        console.log('Hello World');\r\n        for (let i = 0, j = 5; i < j; i++)\r\n            console.log(dice.roll());\r\n        document.getElementsByClassName('add-actor')[0].addEventListener('click', friends.addActor.bind(friends));\r\n        return 0;\r\n    }\r\n}\r\nwindow.onload = () => {\r\n    Startup.main();\r\n};\r\n\n\n//# sourceURL=webpack://script/./main.js?");

/***/ }),

/***/ "./elements/Actor.ts":
/*!***************************!*\
  !*** ./elements/Actor.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Actor)\n/* harmony export */ });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ \"./elements/module.ts\");\n\r\nclass Actor {\r\n    constructor() {\r\n        this.name = '';\r\n        this.status = new _module__WEBPACK_IMPORTED_MODULE_0__.Status();\r\n        this.action_list = new Array();\r\n    }\r\n    addAction(e) {\r\n    }\r\n    createElement() {\r\n        const root_node = document.createElement('div');\r\n        root_node.className = 'actor-root';\r\n        root_node.appendChild(this._createActorElement());\r\n        return root_node;\r\n    }\r\n    _createActorElement() {\r\n        const actor_node = document.createElement('div');\r\n        actor_node.className = 'actor';\r\n        actor_node.appendChild(this._createDeleteElement());\r\n        actor_node.appendChild(this._createNameElement());\r\n        actor_node.appendChild(this._createStatusElement());\r\n        return actor_node;\r\n    }\r\n    _createDeleteElement() {\r\n        const delete_node = document.createElement('button');\r\n        delete_node.innerText = '削除';\r\n        return delete_node;\r\n    }\r\n    _createNameElement() {\r\n        const actor_node = document.createElement('input');\r\n        actor_node.className = 'name';\r\n        actor_node.type = 'text';\r\n        actor_node.innerText = '名前';\r\n        return actor_node;\r\n    }\r\n    _createStatusElement() {\r\n        const status_node = document.createElement('div');\r\n        status_node.className = 'status';\r\n        status_node.appendChild(this._createStatusTableElement());\r\n        return status_node;\r\n    }\r\n    _createStatusTableElement() {\r\n        // status_table_node\r\n        const status_table_node = document.createElement('table');\r\n        status_table_node.className = 'status-table';\r\n        status_table_node.appendChild(this._createStatusTableBodyElement());\r\n        return status_table_node;\r\n    }\r\n    _createStatusTableBodyElement() {\r\n        // status_table_body_node\r\n        const status_table_body_node = document.createElement('tbody');\r\n        const status_name_column = document.createElement('tr');\r\n        const status_input_column = document.createElement('tr');\r\n        for (const status_name of this.status.getKeys()) {\r\n            // status_name_cell\r\n            const status_name_cell = document.createElement('td');\r\n            status_name_cell.innerText = status_name;\r\n            // status_input_cell\r\n            const status_input_cell = document.createElement('td');\r\n            // status_input_node\r\n            const status_input_node = document.createElement('input');\r\n            const status_value = this.status.getStatus(status_name);\r\n            status_input_node.className = 'status-input';\r\n            status_input_node.type = 'number';\r\n            status_input_node.step = '1';\r\n            status_input_node.value = status_value.toString();\r\n            status_input_cell.appendChild(status_input_node);\r\n            status_name_column.appendChild(status_name_cell);\r\n            status_input_column.appendChild(status_input_cell);\r\n        }\r\n        status_table_body_node.appendChild(status_name_column);\r\n        status_table_body_node.appendChild(status_input_column);\r\n        return status_table_body_node;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://script/./elements/Actor.ts?");

/***/ }),

/***/ "./elements/ActorList.ts":
/*!*******************************!*\
  !*** ./elements/ActorList.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ActorList)\n/* harmony export */ });\n/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module */ \"./elements/module.ts\");\n\r\nclass ActorList {\r\n    constructor() {\r\n        this.actor_list = new Array();\r\n    }\r\n    addActor(e) {\r\n        const button = e.currentTarget;\r\n        const actor_list_html = button.parentElement.nextElementSibling;\r\n        const new_actor = new _module__WEBPACK_IMPORTED_MODULE_0__.Actor();\r\n        const new_element = new_actor.createElement();\r\n        new_element.addEventListener('click', this._deleteActor.bind(this));\r\n        console.log(this.actor_list);\r\n        actor_list_html.appendChild(new_element);\r\n        this.actor_list.push(new_actor);\r\n    }\r\n    _deleteActor(e) {\r\n        const target = e.target;\r\n        if (target instanceof HTMLButtonElement) {\r\n            const target_actor_element = e.currentTarget;\r\n            const actors_element = target_actor_element.parentElement;\r\n            const children_element = Array.prototype.slice.call(actors_element.children);\r\n            const index = children_element.indexOf(target_actor_element);\r\n            actors_element.removeChild(target_actor_element);\r\n            this.actor_list.splice(index, 1);\r\n            console.log(this.actor_list);\r\n            console.log(index);\r\n            console.log('deleted');\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://script/./elements/ActorList.ts?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Status)\n/* harmony export */ });\nclass Status {\r\n    constructor() {\r\n        this._state = new Map();\r\n        this._state.set(\"HP\", 0);\r\n        this._state.set(\"MP\", 0);\r\n        this._state.set(\"STR\", 0);\r\n        this._state.set(\"CON\", 0);\r\n        this._state.set(\"POW\", 0);\r\n        this._state.set(\"DEX\", 0);\r\n        this._state.set(\"APP\", 0);\r\n        this._state.set(\"SIZ\", 0);\r\n        this._state.set(\"INT\", 0);\r\n        this._state.set(\"EDU\", 0);\r\n        this._san = 0;\r\n        this._db = \"0\";\r\n    }\r\n    setStatus(name, val) {\r\n        if (this._state.has(name))\r\n            this._state.set(name, val);\r\n        this._setDefaultSan();\r\n        this._setDefaultDb();\r\n    }\r\n    getKeys() {\r\n        return this._state.keys();\r\n    }\r\n    getStatus(name) {\r\n        return this._state.get(name);\r\n    }\r\n    _setDefaultSan() {\r\n        this._san = this._state.get(\"POW\") * 5;\r\n    }\r\n    _setDefaultDb() {\r\n        const str = this._state.get(\"STR\");\r\n        const siz = this._state.get(\"SIZ\");\r\n        const base = str + siz - 16;\r\n        const dice = Math.floor((base - 1) / 16);\r\n        if (dice == 0) {\r\n            if (base > -12 && base <= -8)\r\n                this._db = \"-1d6\";\r\n            else if (base > -8 && base <= 0)\r\n                this._db = \"-1d4\";\r\n            else if (base > 0 && base <= 8)\r\n                this._db = \"0\";\r\n            else if (base > 8 && base <= 16)\r\n                this._db = \"1d4\";\r\n        }\r\n        else {\r\n            this._db = dice + \"d6\";\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://script/./elements/Status.ts?");

/***/ }),

/***/ "./elements/module.ts":
/*!****************************!*\
  !*** ./elements/module.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Dice\": () => (/* reexport safe */ _Dice__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"Status\": () => (/* reexport safe */ _Status__WEBPACK_IMPORTED_MODULE_1__.default),\n/* harmony export */   \"Actor\": () => (/* reexport safe */ _Actor__WEBPACK_IMPORTED_MODULE_2__.default),\n/* harmony export */   \"ActorList\": () => (/* reexport safe */ _ActorList__WEBPACK_IMPORTED_MODULE_3__.default)\n/* harmony export */ });\n/* harmony import */ var _Dice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dice */ \"./elements/Dice.ts\");\n/* harmony import */ var _Status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Status */ \"./elements/Status.ts\");\n/* harmony import */ var _Actor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Actor */ \"./elements/Actor.ts\");\n/* harmony import */ var _ActorList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ActorList */ \"./elements/ActorList.ts\");\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://script/./elements/module.ts?");

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