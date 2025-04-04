"use strict";
(globalThis["webpackChunkdovetail_podcasts_player_blocks"] = globalThis["webpackChunkdovetail_podcasts_player_blocks"] || []).push([["web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-duration_entry_js"],{

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/dtpc-time-duration.entry.js":
/*!**************************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/dtpc-time-duration.entry.js ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dtpc_time_duration: () => (/* binding */ DtpcTimeDuration)
/* harmony export */ });
/* harmony import */ var _index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ngapiRTG.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-ngapiRTG.js");
/* harmony import */ var _index_9eVOQZ3j_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-9eVOQZ3j.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-9eVOQZ3j.js");
/* harmony import */ var _index_BprZZpRs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index-BprZZpRs.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-BprZZpRs.js");



const dtpcTimeDurationCss = ":host{--_dtpc-time-duration--color:var(--dtpc-time-duration--color, var(--_dtpc-player--time--color, currentColor));--_dtpc-time-duration--font-family:var(--dtpc-time-duration--font-family, var(--_dtpc-player--time--font-family, inherit));--_dtpc-time-duration--font-size:var(--dtpc-time-duration--font-size, var(--_dtpc-player--time--font-size, inherit));--_dtpc-time-duration--font-weight:var(--dtpc-time-duration--font-weight, var(--_dtpc-player--time--font-weight, inherit));color:var(--_dtpc-time-duration--color);font-family:var(--_dtpc-time-duration--font-family);font-size:var(--_dtpc-time-duration--font-size);font-weight:var(--_dtpc-time-duration--font-weight)}";
const DtpcTimeDuration = class {
  constructor(hostRef) {
    Object.defineProperty(this, "state", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "duration", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "audioDuration", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: this.duration
    });
    Object.defineProperty(this, "initControl", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.initControl = (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "dtpc-control-init", 7);
  }
  componentWillLoad() {
    const self = this;
    this.audioDuration = this.duration;
    this.initControl.emit(state => {
      self.state = state;
      self.audioDuration = state.duration || this.duration;
    });
  }
  render() {
    const {
      duration
    } = this.state;
    const displayDuration = (0,_index_9eVOQZ3j_js__WEBPACK_IMPORTED_MODULE_1__.f)(duration || this.audioDuration);
    return (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: '28f945fa94afb1d800e8b4ad734b62c51b521ae2'
    }, displayDuration);
  }
};
DtpcTimeDuration.style = dtpcTimeDurationCss;


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
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-duration_entry_js.js.map?ver=0e3cdd82329432ba269d