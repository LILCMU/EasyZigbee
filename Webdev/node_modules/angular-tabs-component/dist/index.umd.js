/**
 * angular-tabs-component - A full featured tab component for Angular (2 and above, including 4).
 * @version v1.0.5
 * @author undefined
 * @link undefined
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"));
	else if(typeof define === 'function' && define.amd)
		define(["@angular/core", "@angular/common", "@angular/forms"], factory);
	else if(typeof exports === 'object')
		exports["angular-tabs-component"] = factory(require("@angular/core"), require("@angular/common"), require("@angular/forms"));
	else
		root["angular-tabs-component"] = factory(root["ng"]["core"], root["ng"]["common"], root["ng"]["forms"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_16__, __WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(7));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(5));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Angular imports
var core_1 = __webpack_require__(1);
var common_1 = __webpack_require__(16);
var forms_1 = __webpack_require__(17);
// Components imports
var components_1 = __webpack_require__(2);
// Containers imports
var containers_1 = __webpack_require__(0);
var TabModule = /** @class */ (function () {
    function TabModule() {
    }
    TabModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule],
            declarations: [
                components_1.TabComponent,
                containers_1.TabsContainer
            ],
            exports: [
                components_1.TabComponent,
                containers_1.TabsContainer
            ]
        })
    ], TabModule);
    return TabModule;
}());
exports.TabModule = TabModule;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(6));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var containers_1 = __webpack_require__(0);
var TabComponent = /** @class */ (function () {
    function TabComponent(tabs) {
        tabs.addTab(this);
    }
    TabComponent.prototype.getTabTitle = function () {
        return this.tabTitle;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TabComponent.prototype, "active", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TabComponent.prototype, "tabTitle", void 0);
    TabComponent = __decorate([
        core_1.Component({
            selector: "tab",
            host: {
                "[class.hidden]": "!active"
            },
            template: __webpack_require__(12),
            styles: [__webpack_require__(14)]
        }),
        __metadata("design:paramtypes", [containers_1.TabsContainer])
    ], TabComponent);
    return TabComponent;
}());
exports.TabComponent = TabComponent;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(8));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var TabsContainer = /** @class */ (function () {
    function TabsContainer() {
        this.currentTabChange = new core_1.EventEmitter();
        this.ifTabSelected = false;
        this.tabs = [];
    }
    TabsContainer.prototype.addTab = function (tab) {
        this.tabs.push(tab);
    };
    TabsContainer.prototype.selectTab = function (tab) {
        this.tabs.forEach(function (tab) {
            tab.active = false;
        });
        tab.active = true;
        this.currentTabChange.emit(tab);
    };
    TabsContainer.prototype.isDisabled = function () {
        if (this.disabled) {
            return "block";
        }
        else
            return "none";
    };
    TabsContainer.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.tabs.forEach(function (tab) {
            if (tab.active) {
                _this.selectTab(tab);
                _this.ifTabSelected = true;
            }
        });
        if (!this.ifTabSelected) {
            this.selectTab(this.tabs[0]);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TabsContainer.prototype, "disabled", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], TabsContainer.prototype, "currentTabChange", void 0);
    TabsContainer = __decorate([
        core_1.Component({
            selector: "tabs",
            template: __webpack_require__(13),
            styles: [__webpack_require__(15)]
        })
    ], TabsContainer);
    return TabsContainer;
}());
exports.TabsContainer = TabsContainer;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var components_1 = __webpack_require__(2);
exports.TabComponent = components_1.TabComponent;
var containers_1 = __webpack_require__(0);
exports.TabsContainer = containers_1.TabsContainer;
var angular_tabs_component_module_1 = __webpack_require__(4);
exports.TabModule = angular_tabs_component_module_1.TabModule;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "* {\n  margin: 0px;\n  padding: 0px; }\n\n:host {\n  display: flex;\n  height: 100%; }\n\n:host(.hidden) {\n  display: none; }\n\n.tabs__panel {\n  background-color: #d7d7d7;\n  width: 100%;\n  box-shadow: inset 0px 0px 0px 1px #c9c9c9;\n  border-radius: 6px;\n  padding: 30px 15px; }\n", ""]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "* {\n  margin: 0px;\n  padding: 0px; }\n\n:host {\n  padding: 10px 10px;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  min-height: calc(100vh - 20px); }\n\n.tabs__tab-bar {\n  align-self: center;\n  border-radius: 4px;\n  overflow: hidden;\n  margin-bottom: -12px;\n  z-index: 1000;\n  border: 1px solid #c9c9c9; }\n\n.tabs__tab {\n  padding: 4px 10px;\n  display: inline-block;\n  background-color: white;\n  cursor: pointer; }\n\n.tabs__tab.active {\n  background-color: #6fbbff !important;\n  color: white; }\n\n.overlay {\n  background: #e0e0e0;\n  opacity: 0.5;\n  bottom: 0;\n  left: 0;\n  position: absolute;\n  right: 0;\n  top: 0;\n  z-index: 1000; }\n", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "<div class=\"tabs__panel\">\n  <ng-content></ng-content>\n</div>\n"

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "<ul class=\"tabs__tab-bar\">\n  <li *ngFor=\"let tab of tabs\" (click)=\"selectTab(tab)\" class=\"tabs__tab\" [ngClass]=\"{'active': tab.active == true}\">\n    {{ tab.tabTitle }}\n  </li>\n</ul>\n<ng-content></ng-content>\n<div class=\"overlay\" [style.display]=\"isDisabled()\"></div>\n"

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(10);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


        var result = __webpack_require__(11);

        if (typeof result === "string") {
            module.exports = result;
        } else {
            module.exports = result.toString();
        }
    

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=index.umd.js.map