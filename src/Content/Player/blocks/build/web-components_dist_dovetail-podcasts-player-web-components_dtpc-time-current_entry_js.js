"use strict";
(globalThis["webpackChunkdovetail_podcasts_player_blocks"] = globalThis["webpackChunkdovetail_podcasts_player_blocks"] || []).push([["web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-current_entry_js"],{

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/dtpc-time-current.entry.js":
/*!*************************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/dtpc-time-current.entry.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dtpc_time_current: () => (/* binding */ DtpcTimeCurrent)
/* harmony export */ });
/* harmony import */ var _index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-DqrFfVsn.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-DqrFfVsn.js");
/* harmony import */ var _index_B4aL0lTS_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-B4aL0lTS.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-B4aL0lTS.js");
/* harmony import */ var _index_BprZZpRs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-BprZZpRs.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-BprZZpRs.js");



const dtpcTimeCurrentCss = ":host{--_dtpc-time-current--color:var(--dtpc-time-current--color, var(--_dtpc-player--time--color));--_dtpc-time-current--font-family:var(--dtpc-time-current--font-family, var(--_dtpc-player--time--font-family));--_dtpc-time-current--font-size:var(--dtpc-time-current--font-size, var(--_dtpc-player--time--font-size));--_dtpc-time-current--font-weight:var(--dtpc-time-current--font-weight, var(--_dtpc-player--time--font-weight));color:var(--_dtpc-time-current--color);font-family:var(--_dtpc-time-current--font-family);font-size:var(--_dtpc-time-current--font-size);font-weight:var(--_dtpc-time-current--font-weight)}";
const DtpcTimeCurrent = class {
  constructor(hostRef) {
    Object.defineProperty(this, "state", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "initControl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.initControl = (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.d)(this, "dtpc-control-init", 7);
  }
  componentWillLoad() {
    const self = this;
    this.initControl.emit(state => self.state = state);
  }
  render() {
    const {
      seekTime,
      currentTime
    } = this.state;
    const time = seekTime !== null ? seekTime : currentTime;
    const displayTime = (0,_index_B4aL0lTS_js__WEBPACK_IMPORTED_MODULE_1__.f)(time);
    return (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.a, {
      key: '389b1a271aa04fe847ee6a01d8f83c66325c3cd4'
    }, displayTime);
  }
};
DtpcTimeCurrent.style = dtpcTimeCurrentCss;


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
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-current_entry_js.js.map?ver=cc39bae9d320d234f3b3