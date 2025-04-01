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
/* harmony import */ var _index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-gWzpa9PG.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-gWzpa9PG.js");

const dtpcTimeDisplayCss = ":host{--_dtpc-time-display--spacing:var(--dtpc-time-display--spacing, 0.25rem);color:var(--_dtpc-player--time--color, currentColor);font-family:var(--_dtpc-player--time--font-family, inherit);font-size:var(--_dtpc-player--time--font-size, inherit);font-weight:var(--_dtpc-player--time--font-weight, inherit)}.wrapper{--_spacing:var(--_dtpc-time-display--spacing);display:flex;align-items:baseline;gap:var(--_spacing)}";
const DtpcTimeDisplay = class {
  constructor(hostRef) {
    Object.defineProperty(this, "duration", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  render() {
    return (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: '8f8ab9f247ce596f7443d76fdbade7db06a7d6d0'
    }, (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '29340255b1828d3914035e1482d74aebd3a18e0a',
      class: "wrapper"
    }, (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-current", {
      key: '64e0889a4b23b2cd6bce3eb50191530a8113bed2'
    }), (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      key: '7161aae4a722a3fb960776af2226c0194b34da5a',
      class: "separator"
    }, "/"), (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-duration", {
      key: 'd3afb53e3a50ff3cc2e74af9334e1655efe7db15',
      duration: this.duration
    })));
  }
};
DtpcTimeDisplay.style = dtpcTimeDisplayCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-display_entry_js.js.map?ver=f2ec1de1752d7f4b1eda