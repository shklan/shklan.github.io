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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _elements_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./elements/module */ \"./elements/module.ts\");\n\r\nclass Startup {\r\n    static main() {\r\n        const dice = new _elements_module__WEBPACK_IMPORTED_MODULE_0__.Dice(3, 6);\r\n        console.log('Hello World');\r\n        console.log(dice.roll());\r\n        return 0;\r\n    }\r\n}\r\nwindow.onload = () => {\r\n    Startup.main();\r\n};\r\n\n\n//# sourceURL=webpack://script/./main.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Status)\n/* harmony export */ });\nclass Status {\r\n    constructor() {\r\n        this._state = new Map();\r\n        this._state.set(\"HP\", 0);\r\n        this._state.set(\"MP\", 0);\r\n        this._state.set(\"STR\", 0);\r\n        this._state.set(\"CON\", 0);\r\n        this._state.set(\"POW\", 0);\r\n        this._state.set(\"DEx\", 0);\r\n        this._state.set(\"APP\", 0);\r\n        this._state.set(\"SIZ\", 0);\r\n        this._state.set(\"INT\", 0);\r\n        this._state.set(\"EDU\", 0);\r\n        this._db = \"0\";\r\n    }\r\n    setStatus(name, val) {\r\n        if (this._state.has(name))\r\n            this._state.set(name, val);\r\n        this._setDb();\r\n    }\r\n    _setDb() {\r\n        const str = this._state.get(\"STR\");\r\n        const siz = this._state.get(\"SIZ\");\r\n        const base = str + siz - 16;\r\n        const dice = Math.floor((base - 1) / 16);\r\n        if (dice == 0) {\r\n            if (base > -12 && base <= -8)\r\n                this._db = \"-1d6\";\r\n            else if (base > -8 && base <= 0)\r\n                this._db = \"-1d4\";\r\n            else if (base > 0 && base <= 8)\r\n                this._db = \"0\";\r\n            else if (base > 8 && base <= 16)\r\n                this._db = \"1d4\";\r\n        }\r\n        else {\r\n            this._db = dice + \"d6\";\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://script/./elements/Status.ts?");

/***/ }),

/***/ "./elements/module.ts":
/*!****************************!*\
  !*** ./elements/module.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Dice\": () => (/* reexport safe */ _Dice__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"Status\": () => (/* reexport safe */ _Status__WEBPACK_IMPORTED_MODULE_1__.default)\n/* harmony export */ });\n/* harmony import */ var _Dice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Dice */ \"./elements/Dice.ts\");\n/* harmony import */ var _Status__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Status */ \"./elements/Status.ts\");\n\r\n\r\n\n\n//# sourceURL=webpack://script/./elements/module.ts?");

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