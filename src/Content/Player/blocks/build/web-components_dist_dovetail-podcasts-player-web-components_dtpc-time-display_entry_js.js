"use strict";
(globalThis["webpackChunkdovetail_podcasts_player_blocks"] = globalThis["webpackChunkdovetail_podcasts_player_blocks"] || []).push([["web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-display_entry_js"],{

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/dtpc-time-display.entry.js":
/*!*************************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/dtpc-time-display.entry.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dtpc_time_display: () => (/* binding */ DtpcTimeDisplay)
/* harmony export */ });
/* harmony import */ var _index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ngapiRTG.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-ngapiRTG.js");

const dtpcTimeDisplayCss = ":host{--_dtpc-time-display--spacing:var(--dtpc-time-display--spacing, 0.25rem);color:var(--_dtpc-player--time--color, currentColor);font-family:var(--_dtpc-player--time--font-family, inherit);font-size:var(--_dtpc-player--time--font-size, inherit);font-weight:var(--_dtpc-player--time--font-weight, inherit)}.wrapper{--_spacing:var(--_dtpc-time-display--spacing);display:flex;align-items:baseline;gap:var(--_spacing)}";
const DtpcTimeDisplay = class {
  constructor(hostRef) {
    Object.defineProperty(this, "duration", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  render() {
    return (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: 'ed890b1d9b0c60125658ea61857e5b9cc9acbd93'
    }, (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '2db4f3f5401ed0a07b8ef9f512069bfb7d7f80c5',
      class: "wrapper"
    }, (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-current", {
      key: '642a525e02fc18ad6006b17a8aa5ff271b326720'
    }), (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      key: '76c5450ef4a952a5327b16e332dcdf58b0f485c5',
      class: "separator"
    }, "/"), (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-duration", {
      key: '2ca8cdd64ef706e58d665292893110f532434a2b',
      duration: this.duration
    })));
  }
};
DtpcTimeDisplay.style = dtpcTimeDisplayCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-display_entry_js.js.map?ver=76e71612f0b7bc2af392