/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/styles/app.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/styles/app.scss ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "body {\n  background-color: #15232D;\n  color: bisque; }\n\n#can {\n  border: 1px solid #000000; }\n", ""]);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], "{").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    for (var i = 0; i < this.length; i++) {
      // eslint-disable-next-line prefer-destructuring
      var id = this[i][0];

      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = modules[_i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = "(".concat(item[2], ") and (").concat(mediaQuery, ")");
        }

        list.push(item);
      }
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot).concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/components/App.tsx":
/*!********************************!*\
  !*** ./src/components/App.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const Chat_1 = __webpack_require__(/*! ./Chat */ "./src/components/Chat.tsx");
const PlayArea_1 = __webpack_require__(/*! ./PlayArea */ "./src/components/PlayArea.tsx");
class App extends React.Component {
    constructor() {
        super(...arguments);
        this.players = {
            PlayerName: "Player",
            EnemyName: "Enemy",
        };
    }
    render() {
        return (React.createElement("div", null,
            React.createElement(PlayArea_1.PlayArea, { Players: this.players }),
            React.createElement(Chat_1.Chat, null)));
    }
    getDetails(name) {
        this.players.PlayerName = name;
    }
    getEnemyDetails(name) {
        this.players.EnemyName = name;
    }
}
exports.default = App;


/***/ }),

/***/ "./src/components/Chat.tsx":
/*!*********************************!*\
  !*** ./src/components/Chat.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ChatBox_1 = __webpack_require__(/*! ./ChatBox */ "./src/components/ChatBox.tsx");
const ChatSend_1 = __webpack_require__(/*! ./ChatSend */ "./src/components/ChatSend.tsx");
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [{
                    name: "David Preston",
                    text: React.createElement("p", null, "Hello World!"),
                },
                {
                    name: "Random Name",
                    text: React.createElement("p", null, "It works!")
                },
                {
                    name: "Keeev",
                    text: React.createElement("p", null, "Yay")
                },
                {
                    name: "HotDog",
                    text: React.createElement("p", null, "Test")
                },
            ],
        };
    }
    render() {
        console.log(this.state);
        return (React.createElement("div", { id: "chat" },
            React.createElement(ChatBox_1.ChatBox, { messages: this.state.messages }),
            React.createElement(ChatSend_1.ChatSend, { sendMessage: this.sendMessage })));
    }
    sendMessage(text) {
        /*
        this.currentUser.sendMessage({
            text,
        });
        */
    }
}
exports.Chat = Chat;


/***/ }),

/***/ "./src/components/ChatBox.tsx":
/*!************************************!*\
  !*** ./src/components/ChatBox.tsx ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
class ChatBox extends React.Component {
    render() {
        return (React.createElement("ul", { className: "message-list" }, this.props.messages.map((message, index) => {
            return (React.createElement("li", { key: index, className: "message" },
                React.createElement("div", null, message.name),
                React.createElement("div", null, message.text)));
        })));
    }
}
exports.ChatBox = ChatBox;


/***/ }),

/***/ "./src/components/ChatSend.tsx":
/*!*************************************!*\
  !*** ./src/components/ChatSend.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
class ChatSend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            message: e.target.value,
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: "",
        });
    }
    render() {
        return (React.createElement("form", { onSubmit: this.handleSubmit, className: "send-box" },
            React.createElement("input", { onChange: this.handleChange, value: this.state.message, placeholder: "Type your message and hit ENTER", type: "text" })));
    }
}
exports.ChatSend = ChatSend;


/***/ }),

/***/ "./src/components/EnemyCanvas.tsx":
/*!****************************************!*\
  !*** ./src/components/EnemyCanvas.tsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const Board_1 = __webpack_require__(/*! ../interface/Board */ "./src/interface/Board.ts");
const BoardCell_1 = __webpack_require__(/*! ../interface/BoardCell */ "./src/interface/BoardCell.ts");
const PlayArea_1 = __webpack_require__(/*! ./PlayArea */ "./src/components/PlayArea.tsx");
class EnemyCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.shipsRemaining = 5;
        this.height = 510;
        this.width = 510;
        this.canvasRef = React.createRef();
        this.state = {
            GameStatus: props.GameState.GameStatus,
            CurrentTurn: props.GameState.CurrentTurn,
            screen: {
                width: this.width,
                height: this.height,
            },
            ctx: null,
        };
        this.enemyBoard = new Board_1.Board("enemy");
        this.enemyCells = new Array(100);
        this.enemyCells = this.addCells(0, 0, "enemy");
        this.tempBoard = [];
        this.setTempBoard();
    }
    render() {
        console.log("Props in E ");
        console.log(this.props);
        return (React.createElement("div", null,
            React.createElement("canvas", { id: "enemyC", ref: this.canvasRef, width: "510", height: "510" })));
    }
    componentDidMount() {
        const ctx = this.canvasRef.current.getContext("2d");
        this.setState({ ctx });
        this.startGame();
        this.setEvents();
        requestAnimationFrame(() => { this.update(); });
    }
    update() {
        if (this.props.GameState.ResE) {
            this.startGame();
            this.props.GameState.ResE = false;
            this.props.updateGameState(this.props.GameState);
        }
        this.drawCells(this.enemyCells);
        this.checkStatus();
        requestAnimationFrame(() => {
            this.update();
        });
    }
    checkStatus() {
        if (this.shipsRemaining === 0) {
            console.log("Player Wins!");
            this.props.GameState.GameStatus = 3;
            this.props.GameState.Winner = "Player Wins!";
            this.props.updateGameState(this.props.GameState);
        }
    }
    setEvents() {
        const canvas = this.canvasRef.current;
        canvas.addEventListener("click", (event) => {
            const x = event.pageX - canvas.offsetLeft;
            const y = event.pageY - canvas.offsetTop;
            if (this.props.GameState.GameStatus === 1 && this.props.GameState.CurrentTurn === "Player") {
                this.toggleCell(this.enemyCells, x, y);
            }
        });
        this.canvasRef.current.addEventListener("mousemove", (event) => {
            const x = event.pageX - canvas.offsetLeft;
            const y = event.pageY - canvas.offsetTop;
            // console.log(`${x}, ${y}`);
            if (this.props.GameState.GameStatus === 1) {
                this.hoverEffect(this.enemyCells, x, y);
            }
        });
    }
    startGame() {
        console.log("start in enm");
        this.setState({
            GameStatus: PlayArea_1.GameStatus.Setup,
        });
        this.enemyBoard = new Board_1.Board("enemy");
        this.enemyCells = new Array(100);
        this.enemyCells = this.addCells(0, 0, "enemy");
        this.setTempBoard();
    }
    drawCells(cells) {
        const ctx = this.state.ctx;
        cells.forEach((cell) => {
            ctx.fillStyle = cell.c;
            ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
        });
    }
    addCells(x, y, s) {
        const narr = new Array(100);
        for (let i = 0; i < 10; i++) {
            for (let n = 0; n < 10; n++) {
                narr[i + n * 10] = new BoardCell_1.BoardCell((i * 50) + x, (n * 50) + y, s);
                narr[i + n * 10].c = (s === "enemy" ? "#8F282F" : "#464478");
            }
        }
        return narr;
    }
    toggleCell(arr, x, y) {
        arr.forEach((cell) => {
            if (cell.contains(x, y)) {
                if (cell.part !== "empty" && !cell.hit) {
                    cell.c = "red";
                    this.lastMoveResult = "Hit!";
                    const move = {
                        Player: "Enemy",
                        Move: `Hit!`,
                    };
                    cell.hit = true;
                    this.shipCount.set(cell.part, this.shipCount.get(cell.part) - 1);
                    if (this.shipCount.get(cell.part) === 0) {
                        console.log(`${cell.part} Was sunk`);
                        move.Player = "Enemy";
                        move.Move = `${cell.part} was sunk`;
                        this.shipsRemaining--;
                        console.log(this.shipsRemaining);
                        if (this.shipsRemaining === 0) {
                            this.setState({
                                GameStatus: PlayArea_1.GameStatus.GameOver,
                            });
                            this.props.GameState.GameStatus = PlayArea_1.GameStatus.GameOver;
                        }
                    }
                    this.props.updateMoves(move);
                    this.props.GameState.CurrentTurn = "Enemy";
                    this.props.updateGameState(this.props.GameState);
                }
                else if (cell.part === "empty" && !cell.hit) {
                    cell.c = "white";
                    const move = {
                        Player: "Enemy",
                        Move: "Miss!",
                    };
                    this.props.updateMoves(move);
                    cell.hit = true;
                    this.props.GameState.CurrentTurn = "Enemy";
                    this.props.updateGameState(this.props.GameState);
                }
            }
        });
    }
    setTempBoard() {
        this.tempBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            4, 4, 4, 0, 0, 0, 2, 2, 2, 2,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 3, 3, 3, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 5, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 5, 0, 0, 0];
        for (let i = 0; i < this.tempBoard.length; i++) {
            if (this.tempBoard[i] == 0) {
                this.enemyCells[i].part = "empty";
            }
            else if (this.tempBoard[i] == 1) {
                this.enemyCells[i].part = "Carrier";
            }
            else if (this.tempBoard[i] == 2) {
                this.enemyCells[i].part = "Battleship";
            }
            else if (this.tempBoard[i] == 3) {
                this.enemyCells[i].part = "Cruiser";
            }
            else if (this.tempBoard[i] == 4) {
                this.enemyCells[i].part = "Submarine";
            }
            else {
                this.enemyCells[i].part = "Destroyer";
            }
        }
        this.shipCount = new Map();
        this.shipCount.set("Carrier", 5);
        this.shipCount.set("Battleship", 4);
        this.shipCount.set("Cruiser", 3);
        this.shipCount.set("Submarine", 3);
        this.shipCount.set("Destroyer", 2);
    }
    hoverEffect(arr, x, y) {
        const ctx = this.state.ctx;
        arr.forEach((cell) => {
            if (cell.contains(x, y)) {
                ctx.fillStyle = "white";
                ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
            }
            else {
                ctx.clearRect(cell.x, cell.y, cell.w, cell.w);
            }
        });
    }
}
exports.EnemyCanvas = EnemyCanvas;


/***/ }),

/***/ "./src/components/PlayArea.tsx":
/*!*************************************!*\
  !*** ./src/components/PlayArea.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const EnemyCanvas_1 = __webpack_require__(/*! ./EnemyCanvas */ "./src/components/EnemyCanvas.tsx");
const PlayerCanvas_1 = __webpack_require__(/*! ./PlayerCanvas */ "./src/components/PlayerCanvas.tsx");
const StatusArea_1 = __webpack_require__(/*! ./StatusArea */ "./src/components/StatusArea.tsx");
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["Setup"] = 0] = "Setup";
    GameStatus[GameStatus["Playing"] = 1] = "Playing";
    GameStatus[GameStatus["GameOver"] = 2] = "GameOver";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));
class PlayArea extends React.Component {
    constructor(props) {
        super(props);
        this.updateGameState = (dataFromChild) => {
            this.setState((prevState) => {
                let GameState = Object.assign({}, prevState.GameState);
                GameState = dataFromChild;
                return { GameState };
            });
        };
        this.updateMoves = (moveUpdate) => {
            this.setState((prevState) => {
                const GameState = Object.assign({}, prevState.GameState);
                GameState.Moves.push(moveUpdate);
                return { GameState };
            });
        };
        this.restartGame = () => {
            this.setState((prevState) => {
                const GameState = Object.assign({}, prevState.GameState);
                console.log(prevState);
                GameState.CurrentShip = null;
                GameState.CurrentTurn = null;
                GameState.Moves = [];
                GameState.GameStatus = GameStatus.Setup;
                GameState.ResE = false;
                GameState.ResP = false;
                GameState.Winner = null;
                GameState.PlayerName = this.props.Players.PlayerName;
                GameState.EnemyName = this.props.Players.EnemyName;
                GameState.EnemyShipsR = 5;
                GameState.PlayerShipsR = 5;
                GameState.ResE = true;
                GameState.ResP = true;
                return { GameState };
            });
        };
        this.state = {
            GameState: {
                CurrentShip: null,
                CurrentTurn: null,
                Moves: [],
                GameStatus: GameStatus.Setup,
                ResE: false,
                ResP: false,
                Winner: null,
                PlayerName: this.props.Players.PlayerName,
                EnemyName: this.props.Players.EnemyName,
                EnemyShipsR: 5,
                PlayerShipsR: 5,
                SetupMessages: null,
            },
        };
    }
    render() {
        console.log("Game State in PlayA");
        console.log(this.state);
        return (React.createElement("div", null,
            React.createElement(PlayerCanvas_1.PlayerCanvas, { updateGameState: this.updateGameState, updateMoves: this.updateMoves, GameState: this.state.GameState }),
            React.createElement("button", { onClick: this.restartGame }, "Rest"),
            React.createElement(StatusArea_1.StatusArea, { GameState: this.state.GameState }),
            React.createElement(EnemyCanvas_1.EnemyCanvas, { updateGameState: this.updateGameState, updateMoves: this.updateMoves, GameState: this.state.GameState })));
    }
}
exports.PlayArea = PlayArea;


/***/ }),

/***/ "./src/components/PlayerCanvas.tsx":
/*!*****************************************!*\
  !*** ./src/components/PlayerCanvas.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const Board_1 = __webpack_require__(/*! ../interface/Board */ "./src/interface/Board.ts");
const BoardCell_1 = __webpack_require__(/*! ../interface/BoardCell */ "./src/interface/BoardCell.ts");
const Ship_1 = __webpack_require__(/*! ../interface/Ship */ "./src/interface/Ship.ts");
const PlayArea_1 = __webpack_require__(/*! ./PlayArea */ "./src/components/PlayArea.tsx");
class PlayerCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.shipCells = [];
        this.height = 510;
        this.width = 510;
        this.canvasRef = React.createRef();
        this.state = {
            CurrentShip: "Carrier",
            GameStatus: props.GameState.GameStatus,
            ShipRemaining: 5,
            ShipParts: {
                Carrier: 5,
                Battleship: 4,
                Cruiser: 3,
                Submarine: 3,
                Destroyer: 2,
            },
            screen: {
                width: this.width,
                height: this.height,
            },
        };
        this.ships = this.createShipList();
        this.playerBoard = new Board_1.Board("player");
        this.enemyBoard = new Board_1.Board("enemy");
        this.playerCells = this.addCells(0, 0, "player");
        this.clicks = 0;
        this.ship = 0;
    }
    render() {
        console.log("Props in PC ");
        console.log(this.props);
        console.log(this.state);
        return (React.createElement("div", null,
            React.createElement("canvas", { id: "playerC", ref: this.canvasRef, width: this.state.screen.width, height: this.state.screen.height })));
    }
    componentDidMount() {
        const ctx = this.canvasRef.current.getContext("2d");
        this.setState({ ctx });
        this.startGame();
        this.setEvents();
        requestAnimationFrame(() => { this.update(); });
    }
    startGame() {
        console.log("start");
        this.setState({
            GameStatus: PlayArea_1.GameStatus.Setup,
        });
        this.ship = 0;
        this.currentShip = this.ships[this.ship];
        this.playerBoard = new Board_1.Board("player");
        this.enemyBoard = new Board_1.Board("enemy");
        this.playerCells = this.addCells(0, 0, "player");
        this.clicks = 0;
        console.log(this.props.GameState.GameStatus);
        this.props.GameState.CurrentShip = "Carrier";
        this.props.updateGameState(this.props.GameState);
        this.setState((prevState) => {
            const ShipParts = Object.assign({}, prevState.ShipParts);
            ShipParts.Carrier = 5;
            ShipParts.Battleship = 4;
            ShipParts.Cruiser = 3;
            ShipParts.Submarine = 3;
            ShipParts.Destroyer = 2;
            return { ShipParts };
        });
        this.setState({ ShipRemaining: 5 });
    }
    update() {
        this.drawCells(this.playerCells);
        if (this.props.GameState.ResP) {
            this.startGame();
            this.props.GameState.ResP = false;
            this.props.updateGameState(this.props.GameState);
        }
        if (this.props.GameState.GameStatus === 1 && this.props.GameState.CurrentTurn === "Enemy") {
            this.playGame();
        }
        if (this.state.GameStatus === 2) {
            // #TODO ENDGAME
        }
        requestAnimationFrame(() => {
            this.update();
        });
    }
    checkRemainingShips() {
        this.setState({
            ShipRemaining: this.state.ShipRemaining - 1,
        });
        if (this.state.ShipRemaining === 0) {
            this.props.GameState.Winner = "Enemy Wins!";
            this.props.GameState.GameStatus = PlayArea_1.GameStatus.GameOver;
            this.props.updateGameState(this.props.GameState);
        }
    }
    playGame() {
        const randomCell = Math.floor(Math.random() * (99 - 0 + 1)) + 0;
        const cell = this.playerCells[randomCell];
        if (cell.part !== "empty" && !cell.hit) {
            if (cell.part === "Carrier") {
                this.setState((prevState) => {
                    const ShipParts = Object.assign({}, prevState.ShipParts);
                    ShipParts.Carrier--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Carrier === 0) {
                    this.checkRemainingShips();
                }
            }
            else if (cell.part === "Battleship") {
                this.setState((prevState) => {
                    const ShipParts = Object.assign({}, prevState.ShipParts);
                    ShipParts.Battleship--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Battleship === 0) {
                    this.checkRemainingShips();
                }
            }
            else if (cell.part === "Cruiser") {
                this.setState((prevState) => {
                    const ShipParts = Object.assign({}, prevState.ShipParts);
                    ShipParts.Cruiser--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Cruiser === 0) {
                    this.checkRemainingShips();
                }
            }
            else if (cell.part === "Submarine") {
                this.setState((prevState) => {
                    const ShipParts = Object.assign({}, prevState.ShipParts);
                    ShipParts.Submarine--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Submarine === 0) {
                    this.checkRemainingShips();
                }
            }
            else {
                this.setState((prevState) => {
                    const ShipParts = Object.assign({}, prevState.ShipParts);
                    ShipParts.Destroyer--;
                    return { ShipParts };
                });
                if (this.state.ShipParts.Destroyer === 0) {
                    this.checkRemainingShips();
                }
            }
            this.playerCells[randomCell].hit = true;
            this.playerCells[randomCell].c = "red";
            this.playerCells[randomCell].part = "empty"; // #TODO: Fix this up.
            this.props.GameState.CurrentTurn = "Player";
            const move = {
                Player: "Enemy",
                Move: "Hit!",
            };
            this.props.updateMoves(move);
            this.props.updateGameState(this.props.GameState);
        }
        else if (cell.part === "empty" && !cell.hit) {
            this.playerCells[randomCell].hit = true;
            this.playerCells[randomCell].c = "white";
            this.playerCells[randomCell].part = "empty"; // #TODO: Fix this up.
            this.props.GameState.CurrentTurn = "Player";
            const move = {
                Player: "Enemy",
                Move: "Miss!",
            };
            this.props.updateMoves(move);
            this.props.updateGameState(this.props.GameState);
        }
        else {
            this.playGame();
        }
    }
    endGame() {
    }
    setEvents() {
        const canvas = this.canvasRef.current;
        canvas.addEventListener("click", (event) => {
            const x = event.pageX - canvas.offsetLeft;
            const y = event.pageY - canvas.offsetTop;
            if (this.state.GameStatus === 0) {
                this.toggleCell(this.playerCells, x, y);
                this.checkValid();
                if (this.clicks === this.currentShip.size) {
                    this.finalCheck();
                }
                this.checkShipTurn();
            }
        });
        this.canvasRef.current.addEventListener("mousemove", (event) => {
            const x = event.pageX - canvas.offsetLeft;
            const y = event.pageY - canvas.offsetTop;
            // console.log(`${x}, ${y}`);
            if (this.state.GameStatus === 0) {
                this.hoverEffect(this.playerCells, x, y);
            }
        });
    }
    updateCurrentShip() {
        this.props.GameState.CurrentShip = this.state.CurrentShip;
        this.props.updateGameState(this.props.GameState);
    }
    createShipList() {
        const ships = [];
        const carr = new Ship_1.Ship("Carrier", 5, "#a6a6a6");
        const bat = new Ship_1.Ship("Battleship", 4, "#c7c7c7");
        const cru = new Ship_1.Ship("Cruiser", 3, "#ded9d9");
        const sub = new Ship_1.Ship("Submarine", 3, "#e8e1e1");
        const dest = new Ship_1.Ship("Destroyer", 2, "#ededed");
        ships.push(carr);
        ships.push(bat);
        ships.push(cru);
        ships.push(sub);
        ships.push(dest);
        return ships;
    }
    drawCells(cells) {
        const ctx = this.state.ctx;
        cells.forEach((cell) => {
            if (cell.part === "empty") {
                ctx.fillStyle = cell.c;
                ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
            }
            else if (cell.part !== "empty") {
                this.ships.forEach((ship) => {
                    if (ship.name === cell.part) {
                        ctx.fillStyle = ship.c;
                    }
                });
                ctx.fillRect(cell.x + 1, cell.y + 1, cell.w - 2, cell.w - 2);
            }
        });
    }
    addCells(x, y, s) {
        const narr = new Array(100);
        for (let i = 0; i < 10; i++) {
            for (let n = 0; n < 10; n++) {
                narr[i + n * 10] = new BoardCell_1.BoardCell((i * 50) + x, (n * 50) + y, s);
                narr[i + n * 10].c = (s === "enemy" ? "#8F282F" : "#464478");
            }
        }
        return narr;
    }
    finalCheck() {
        let dirc;
        const cellCheck = this.playerCells.filter((cell) => cell.part === this.currentShip.name);
        if (cellCheck[0].x === cellCheck[1].x) {
            dirc = "v";
        }
        else if (cellCheck[0].y === cellCheck[1].y) {
            dirc = "h";
        }
        for (let i = 0, n = 1; i < cellCheck.length - 1; i++, n++) {
            if (dirc === "h") {
                if (cellCheck[i].x + 50 === cellCheck[n].x ||
                    cellCheck[i].x - 50 === cellCheck[n].x) {
                    continue;
                }
                this.clearInvalid();
                return;
            }
            if (dirc === "v") {
                if (cellCheck[i].y + 50 === cellCheck[n].y ||
                    cellCheck[i].y - 50 === cellCheck[n].y) {
                    continue;
                }
                this.clearInvalid();
                return;
            }
        }
    }
    checkShipTurn() {
        if (this.shipCells.length === this.currentShip.size) {
            if (this.currentShip.name === "Destroyer") {
                this.setState({ GameStatus: PlayArea_1.GameStatus.Playing });
                this.props.GameState.GameStatus = this.state.GameStatus;
                this.props.GameState.CurrentTurn = "Player";
                this.props.updateGameState(this.props.GameState);
                this.playerBoard = new Board_1.Board("player");
                this.playerCells.forEach((cell) => {
                    if (cell.part === "empty") {
                        this.playerBoard.board.push(0);
                    }
                    else if (cell.part === "Carrier") {
                        this.playerBoard.board.push(1);
                    }
                    else if (cell.part === "Battleship") {
                        this.playerBoard.board.push(2);
                    }
                    else if (cell.part === "Cruiser") {
                        this.playerBoard.board.push(3);
                    }
                    else if (cell.part === "Submarine") {
                        this.playerBoard.board.push(4);
                    }
                    else {
                        this.playerBoard.board.push(5);
                    }
                });
                console.log(this.playerBoard);
            }
            else {
                this.clicks = 0;
                this.ship++;
                this.currentShip = this.ships[this.ship];
                this.setState({ CurrentShip: this.currentShip.name });
                this.updateCurrentShip();
                this.shipCells = [];
            }
        }
    }
    toggleCell(arr, x, y) {
        const ctx = this.state.ctx;
        if (this.state.GameStatus === 0) {
            arr.forEach((cell) => {
                if (cell.contains(x, y) && this.clicks !== this.currentShip.size && cell.part === "empty") {
                    this.shipCells.push(cell);
                    cell.part = this.currentShip.name;
                    this.clicks++;
                }
            });
        }
        else {
            arr.forEach((cell) => {
                if (cell.contains(x, y) && this.clicks !== this.currentShip.size && cell.part === "empty") {
                    this.shipCells.push(cell);
                    cell.part = "enemy";
                    ctx.fillStyle = "red";
                    ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
                    this.clicks++;
                }
            });
        }
    }
    checkValid() {
        if (!this.checkValidCell()) {
            this.clearInvalid();
        }
    }
    clearInvalid() {
        console.log("Invalid");
        this.props.GameState.SetupMessages = "Invalid Ship Placement",
            this.props.updateGameState(this.props.GameState);
        this.playerCells.forEach((cell) => {
            if (cell.part === this.currentShip.name) {
                cell.part = "empty";
            }
        });
        this.shipCells = [];
        this.clicks = 0;
    }
    checkValidCell() {
        let dirc;
        if (this.shipCells.length === 1) {
            return true;
        }
        else if (this.shipCells.length > 1) {
            if (this.shipCells[0].x === this.shipCells[1].x) {
                dirc = "h";
            }
            else if (this.shipCells[0].y === this.shipCells[1].y) {
                dirc = "v";
            }
            else {
                return false;
            }
            for (let i = 0; i < this.shipCells.length; i++) {
                if (dirc == "h") {
                    if (this.shipCells[0].x !== this.shipCells[i].x) {
                        return false;
                    }
                }
                else if (dirc === "v") {
                    if (this.shipCells[0].y !== this.shipCells[i].y) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }
    hoverEffect(arr, x, y) {
        const ctx = this.state.ctx;
        arr.forEach((cell) => {
            if (cell.contains(x, y) && cell.part === "empty") {
                ctx.fillStyle = "white";
                ctx.fillRect(cell.x, cell.y, cell.w, cell.w);
            }
            else if (cell.part === "empty") {
                ctx.clearRect(cell.x, cell.y, cell.w, cell.w);
            }
        });
    }
    exportBoard() {
        return this.playerBoard;
    }
}
exports.PlayerCanvas = PlayerCanvas;


/***/ }),

/***/ "./src/components/StatusArea.tsx":
/*!***************************************!*\
  !*** ./src/components/StatusArea.tsx ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
class StatusArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            GameState: props.GameState,
        };
    }
    render() {
        console.log(`Props in SA ${this.props}`);
        console.log(`State in SA ${this.state}`);
        return (React.createElement("div", { className: "StatusArea" },
            React.createElement(PlayingGame, { GameState: this.props.GameState })));
    }
}
exports.StatusArea = StatusArea;
function PlayingGame(props) {
    if (props.GameState.GameStatus === 0) {
        return React.createElement(SetupStatus, { GameState: props.GameState });
    }
    else {
        return (React.createElement("div", null,
            React.createElement(LastMoveStatus, { GameState: props.GameState }),
            React.createElement(CurrentTurn, { GameState: props.GameState })));
    }
}
exports.PlayingGame = PlayingGame;
const SetupStatus = (props) => {
    return React.createElement("div", null,
        "Currently Placing: ",
        props.GameState.CurrentShip);
};
function LastMoveStatus(props) {
    return React.createElement("div", null,
        "Last Move: ",
        props.GameState.Moves);
}
exports.LastMoveStatus = LastMoveStatus;
function CurrentTurn(props) {
    return React.createElement("div", null,
        "Currently ",
        props.GameState.CurrentTurn,
        "'s turn.");
}
exports.CurrentTurn = CurrentTurn;
function MoveList() {
}


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
__webpack_require__(/*! ./styles/app.scss */ "./src/styles/app.scss");
const App_1 = __webpack_require__(/*! ./components/App */ "./src/components/App.tsx");
ReactDOM.render(React.createElement("div", null,
    React.createElement(App_1.default, null)), document.getElementById("app"));


/***/ }),

/***/ "./src/interface/Board.ts":
/*!********************************!*\
  !*** ./src/interface/Board.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Board {
    constructor(bn) {
        this.boardName = bn;
        this.board = [];
    }
}
exports.Board = Board;


/***/ }),

/***/ "./src/interface/BoardCell.ts":
/*!************************************!*\
  !*** ./src/interface/BoardCell.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class BoardCell {
    constructor(x, y, o) {
        this.hover = false;
        this.hit = false;
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.part = "empty";
        this.owner = o;
    }
    contains(x, y) {
        return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
    }
}
exports.BoardCell = BoardCell;


/***/ }),

/***/ "./src/interface/Ship.ts":
/*!*******************************!*\
  !*** ./src/interface/Ship.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Ship {
    constructor(n, s, c) {
        this.size = s;
        this.name = n;
        this.c = c;
    }
}
exports.Ship = Ship;


/***/ }),

/***/ "./src/styles/app.scss":
/*!*****************************!*\
  !*** ./src/styles/app.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/lib/loader.js!./app.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js!./src/styles/app.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map