"use strict";
(globalThis["webpackChunkdovetail_podcasts_player_blocks"] = globalThis["webpackChunkdovetail_podcasts_player_blocks"] || []).push([["web-components_dist_dovetail-podcasts-player-web-components_dtpc-button_entry_js"],{

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/dtpc-button.entry.js":
/*!*******************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/dtpc-button.entry.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dtpc_button: () => (/* binding */ DtpcButton)
/* harmony export */ });
/* harmony import */ var _index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-DjC7PCMK.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-DjC7PCMK.js");
/* harmony import */ var _index_B4aL0lTS_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-B4aL0lTS.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-B4aL0lTS.js");
/* harmony import */ var _index_BprZZpRs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-BprZZpRs.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-BprZZpRs.js");



const dtpcButtonCss = ":host{--_dtpc-button--size:var(--dtpc-button--size, 1.5rem);--_dtpc-button--padding:var(--dtpc-button--padding, 0.325rem);--_dtpc-button--foreground:var(--dtpc-button--foreground, var(--_dtpc-player--foreground));--_dtpc-button--foreground--hover:var(--dtpc-button--foreground--hover, var(--_dtpc-player--foreground));--_dtpc-button--foreground--active:var(--dtpc-button--foreground--active, var(--_dtpc-player--foreground));--_dtpc-button--surface:var(--_dtpc-button--surface, var(--_dtpc-player--foreground));--_dtpc-button--surface--hover:var(--dtpc-button--surface--hover, var(--_dtpc-player--foreground));--_dtpc-button--surface--active:var(--dtpc-button--surface--active, var(--_dtpc-player--foreground));--_dtpc-button--surface-opacity:var(--dtpc-button--surface-opacity, 0);--_dtpc-button--surface-opacity--hover:var(--dtpc-button--surface-opacity--hover, 20%);--_dtpc-button--surface-opacity--active:var(--dtpc-button--surface-opacity--active, 10%);--_dtpc-button--border-color:var(--dtpc-button--border-color, transparent);--_dtpc-button--border-color--hover:var(--dtpc-button--border-color--hover, transparent);--_dtpc-button--border-color--active:var(--dtpc-button--border-color--active, transparent);--_dtpc-button--border-radius:var(--dtpc-button--border-radius, 100vw);--_dtpc-button--border-radius--hover:var(--dtpc-button--border-radius--hover, 100vw);--_dtpc-button--border-radius--active:var(--dtpc-button--border-radius--active, 100vw);--_dtpc-button--border-width:var(--dtpc-button--border-width, 0);--_dtpc-button--border-width--hover:var(--dtpc-button--border-width--hover, 0);--_dtpc-button--border-width--active:var(--dtpc-button--border-width--active, 0);--_dtpc-button--focus-ring-color:var(--dtpc-button--focus-ring-color, var(--_dtpc-player--highlight));--_dtpc-button--focus-ring-offset:var(--dtpc-button--focus-ring-offset, 0.125rem);--_dtpc-button--focus-ring-width:var(--dtpc-button--focus-ring-width, 2px)}:host{transition-property:background-color, border-color, border-width, border-radius, color;transition-duration:200ms;transition-timing-function:ease;box-sizing:content-box;display:inline-grid;place-items:stretch;justify-content:stretch;aspect-ratio:1;width:var(--_dtpc-button--size);padding:var(--_dtpc-button--padding);border-style:solid;border-color:var(--_dtpc-button--border-color);border-width:var(--_dtpc-button--border-width);border-radius:var(--_dtpc-button--border-radius);background-color:color-mix(in oklch, var(--_dtpc-button--surface) var(--_dtpc-button--surface-opacity), transparent);color:var(--_dtpc-button--foreground);cursor:pointer;user-select:none}:host(:hover){--_dtpc-button--foreground:var(--_dtpc-button--foreground--hover);--_dtpc-button--surface:var(--_dtpc-button--surface--hover);--_dtpc-button--surface-opacity:var(--_dtpc-button--surface-opacity--hover);--_dtpc-button--border-color:var(--_dtpc-button--border-color--hover);--_dtpc-button--border-width:var(--_dtpc-button--border-width--hover);--_dtpc-button--border-radius:var(--_dtpc-button--border-radius--hover)}:host(:active){--_dtpc-button--foreground:var(--_dtpc-button--foreground--active);--_dtpc-button--surface:var(--_dtpc-button--surface--active);--_dtpc-button--surface-opacity:var(--_dtpc-button--surface-opacity--active);--_dtpc-button--border-color:var(--_dtpc-button--border-color--active);--_dtpc-button--border-width:var(--_dtpc-button--border-width--active);--_dtpc-button--border-radius:var(--_dtpc-button--border-radius--active)}:host(:focus-visible){outline-style:solid;outline-offset:var(--_dtpc-button--focus-ring-offset);outline-color:var(--_dtpc-button--focus-ring-color);outline-width:var(--_dtpc-button--focus-ring-width)}";
const DtpcButton = class {
  constructor(hostRef) {
    (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  get el() {
    return (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.e)(this);
  }
  handleKeyDown(ev) {
    console.log(ev);
    if (ev.code === 'Space') {
      ev.preventDefault();
      this.el.click();
    }
  }
  render() {
    const buttonAttributes = (0,_index_BprZZpRs_js__WEBPACK_IMPORTED_MODULE_2__.a)(this.el);
    return (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: 'c0214de80f82d9065a2b31b9f04db5cca14b797b',
      role: "button",
      tabindex: "0",
      ...buttonAttributes
    }, (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot", {
      key: 'e3df54b537f25ff99ae7199211ea5417567fe2b1'
    }));
  }
};
DtpcButton.style = dtpcButtonCss;


/***/ }),

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/index-B4aL0lTS.js":
/*!****************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/index-B4aL0lTS.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ convertStringToInteger),
/* harmony export */   b: () => (/* binding */ cn),
/* harmony export */   c: () => (/* binding */ convertDurationStringToIntegerArray),
/* harmony export */   f: () => (/* binding */ formatDuration)
/* harmony export */ });
/* harmony import */ var _index_BprZZpRs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-BprZZpRs.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-BprZZpRs.js");

const convertStringToInteger = str => parseInt(str, 10) || 0;
const convertDurationStringToIntegerArray = duration => duration?.split(':').map(v => convertStringToInteger(v)).reduce((a, c) => [c, ...a], []) || [0];
function r(e) {
  var t,
    f,
    n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
function cn(...inputs) {
  return clsx(inputs);
}
const formatDuration = inputSeconds => {
  let duration = '00:00';
  if (typeof inputSeconds === 'string' && inputSeconds.indexOf(':') > -1) {
    return inputSeconds;
  }
  const totalSeconds = typeof inputSeconds === 'string' ? parseInt(inputSeconds, 10) : inputSeconds;
  if (typeof totalSeconds === 'number' && totalSeconds > 0) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = Math.round(totalSeconds % 60);
    duration = [...(hours ? [hours] : []), String(minutes).padStart(2, '0'), String(seconds).padStart(2, '0')].join(':');
  }
  return duration;
};


/***/ }),

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/index-BprZZpRs.js":
/*!****************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/index-BprZZpRs.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ attributesToObject)
/* harmony export */ });
function attributesToObject(el) {
  let result = {};
  for (let i = 0; i < el.attributes.length; i++) {
    result[el.attributes[i].name] = el.attributes[i].value;
  }
  return result;
}


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-button_entry_js.js.map?ver=00b81ccf7ddd0aa523c1