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
/* harmony import */ var _index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ngapiRTG.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-ngapiRTG.js");
/* harmony import */ var _index_9eVOQZ3j_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-9eVOQZ3j.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-9eVOQZ3j.js");
/* harmony import */ var _index_BprZZpRs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-BprZZpRs.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-BprZZpRs.js");



const dtpcButtonCss = ":host {\n  --_dtpc-button--size: var(--dtpc-button--size, 1.5rem);\n  --_dtpc-button--padding: var(--dtpc-button--padding, 0.325rem);\n  --_dtpc-button--foreground: var(--dtpc-button--foreground, CanvasText);\n  --_dtpc-button--foreground--hover: var(--dtpc-button--foreground--hover, CanvasText);\n  --_dtpc-button--foreground--active: var(--dtpc-button--foreground--active, CanvasText);\n  --_dtpc-button--surface: var(--_dtpc-button--surface, CanvasText);\n  --_dtpc-button--surface--hover: var(--dtpc-button--surface--hover, CanvasText);\n  --_dtpc-button--surface--active: var(--dtpc-button--surface--active, CanvasText);\n  --_dtpc-button--surface-opacity: var(--dtpc-button--surface-opacity, 0);\n  --_dtpc-button--surface-opacity--hover: var(--dtpc-button--surface-opacity--hover, 20%);\n  --_dtpc-button--surface-opacity--active: var(--dtpc-button--surface-opacity--active, 10%);\n  --_dtpc-button--border-color: var(--dtpc-button--border-color, transparent);\n  --_dtpc-button--border-color--hover: var(--dtpc-button--border-color--hover, transparent);\n  --_dtpc-button--border-color--active: var(--dtpc-button--border-color--active, transparent);\n  --_dtpc-button--border-radius: var(--dtpc-button--border-radius, 100vw);\n  --_dtpc-button--border-radius--hover: var(--dtpc-button--border-radius--hover, 100vw);\n  --_dtpc-button--border-radius--active: var(--dtpc-button--border-radius--active, 100vw);\n  --_dtpc-button--border-width: var(--dtpc-button--border-width, 0);\n  --_dtpc-button--border-width--hover: var(--dtpc-button--border-width--hover, 0);\n  --_dtpc-button--border-width--active: var(--dtpc-button--border-width--active, 0);\n  --_dtpc-button--focus-ring-color: var(--dtpc-button--focus-ring-color, LinkText);\n  --_dtpc-button--focus-ring-offset: var(--dtpc-button--focus-ring-offset, 0.125rem);\n  --_dtpc-button--focus-ring-width: var(--dtpc-button--focus-ring-width, 2px);\n}\n\n:host {\n  --_size: var(--_dtpc-button--size);\n  --_padding: var(--_dtpc-button--padding);\n  --_foreground: var(--_dtpc-button--foreground);\n  --_surface: var(--_dtpc-button--surface);\n  --_surface-opacity: var(--_dtpc-button--surface-opacity);\n  --_border-color: var(--_dtpc-button--border-color);\n  --_border-radius: var(--_dtpc-button--border-radius);\n  --_border-width: var(--_dtpc-button--border-width);\n  --_focus-ring-color: var(--_dtpc-button--focus-ring-color);\n  --_focus-ring-offset: var(--_dtpc-button--focus-ring-offset);\n  --_focus-ring-width: var(--_dtpc-button--focus-ring-width);\n\n  all: unset;\n\n  transition-property: background-color, border-color, border-width, border-radius, color;\n  transition-duration: 200ms;\n  transition-timing-function: ease;\n\n  box-sizing: content-box;\n  display: inline-grid;\n  place-items: stretch;\n  justify-content: stretch;\n  aspect-ratio: 1;\n  width: var(--_size);\n\n  padding: var(--_padding);\n\n  border-style: solid;\n  border-color: var(--_border-color);\n  border-width: var(--_border-width);\n  border-radius: var(--_border-radius);\n\n  background-color: color-mix(in oklch, var(--_surface) var(--_surface-opacity), transparent);\n\n  color: var(--_foreground);\n\n  cursor: pointer;\n  user-select: none;\n}\n\n:host(:hover) {\n  --_foreground: var(--_dtpc-button--foreground--hover);\n  --_surface: var(--_dtpc-button--surface--hover);\n  --_surface-opacity: var(--_dtpc-button--surface-opacity--hover);\n  --_border-color: var(--_dtpc-button--border-color--hover);\n  --_border-width: var(--_dtpc-button--border-width--hover);\n  --_border-radius: var(--_dtpc-button--border-radius--hover);\n}\n\n:host(:active) {\n  --_foreground: var(--_dtpc-button--foreground--active);\n  --_surface: var(--_dtpc-button--surface--active);\n  --_surface-opacity: var(--_dtpc-button--surface-opacity--active);\n  --_border-color: var(--_dtpc-button--border-color--active);\n  --_border-width: var(--_dtpc-button--border-width--active);\n  --_border-radius: var(--_dtpc-button--border-radius--active);\n}\n\n:host(:focus-visible) {\n  outline-style: solid;\n  outline-offset: var(--_focus-ring-offset);\n  outline-color: var(--_focus-ring-color);\n  outline-width: var(--_focus-ring-width);\n}\n\n.lucide-icon {\n  display: grid;\n  place-items: center;\n  aspect-ratio: 1;\n  width: 100%;\n\n  svg {\n    width: 100%;\n    height: auto;\n  }\n}\n";
const DtpcButton = class {
  constructor(hostRef) {
    (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  get el() {
    return (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.e)(this);
  }
  handleKeyDown(ev) {
    console.log(ev);
    if (ev.code === 'Space') {
      this.el.click();
    }
  }
  render() {
    const buttonAttributes = (0,_index_BprZZpRs_js__WEBPACK_IMPORTED_MODULE_2__.a)(this.el);
    return (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: '82ae4a6d9191c435e24ff27127b600625e59ca48',
      role: "button",
      tabindex: "0",
      ...buttonAttributes
    }, (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot", {
      key: '2f60e169d1c1763d7b27a611e25eb4828667a509'
    }));
  }
};
DtpcButton.style = dtpcButtonCss;


/***/ }),

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/index-9eVOQZ3j.js":
/*!****************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/index-9eVOQZ3j.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ cn),
/* harmony export */   f: () => (/* binding */ formatDuration)
/* harmony export */ });
/* harmony import */ var _index_BprZZpRs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-BprZZpRs.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-BprZZpRs.js");

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
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-button_entry_js.js.map?ver=ff8c34782c6ced027a29