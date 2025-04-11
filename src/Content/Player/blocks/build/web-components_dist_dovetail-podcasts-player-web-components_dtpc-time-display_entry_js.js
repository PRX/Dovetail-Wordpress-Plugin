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
/* harmony import */ var _index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-DqrFfVsn.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-DqrFfVsn.js");

const dtpcTimeDisplayCss = ":host{--_dtpc-time-display--spacing:var(--dtpc-time-display--spacing, 0.25rem);color:var(--_dtpc-player--time--color, currentColor);font-family:var(--_dtpc-player--time--font-family, inherit);font-size:var(--_dtpc-player--time--font-size, inherit);font-weight:var(--_dtpc-player--time--font-weight, inherit)}.wrapper{--_spacing:var(--_dtpc-time-display--spacing);display:flex;align-items:baseline;gap:var(--_spacing)}";
const DtpcTimeDisplay = class {
  constructor(hostRef) {
    Object.defineProperty(this, "duration", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  render() {
    return (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.a, {
      key: '15cafbb9aba871bb1dcc48196c36c17ee44e9251'
    }, (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'c6369448aa9f48cc5edacf91e9410952b412a239',
      class: "wrapper"
    }, (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-current", {
      key: '8d351a5c4a204b2e5760d76272432774dc51f0a5'
    }), (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      key: '19e2d6bc610e623b4a328b1179956827ff0ffec6',
      class: "separator"
    }, "/"), (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-duration", {
      key: '7f511c00293a32664f67f532f1f388720804912e',
      duration: this.duration
    })));
  }
};
DtpcTimeDisplay.style = dtpcTimeDisplayCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-display_entry_js.js.map?ver=e0237ad76c413bc36731