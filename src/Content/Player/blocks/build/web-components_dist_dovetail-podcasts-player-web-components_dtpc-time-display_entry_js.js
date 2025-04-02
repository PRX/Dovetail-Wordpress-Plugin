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
/* harmony import */ var _index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-C336hbsD.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-C336hbsD.js");

const dtpcTimeDisplayCss = ":host{--_dtpc-time-display--spacing:var(--dtpc-time-display--spacing, 0.25rem);color:var(--_dtpc-player--time--color, currentColor);font-family:var(--_dtpc-player--time--font-family, inherit);font-size:var(--_dtpc-player--time--font-size, inherit);font-weight:var(--_dtpc-player--time--font-weight, inherit)}.wrapper{--_spacing:var(--_dtpc-time-display--spacing);display:flex;align-items:baseline;gap:var(--_spacing)}";
const DtpcTimeDisplay = class {
  constructor(hostRef) {
    Object.defineProperty(this, "duration", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  render() {
    return (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: 'f874eef1fa90b26db15c2b2bfaf2cb17996ed238'
    }, (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '166e55f9fa30b2f9eb99378d21cdaa3236207f63',
      class: "wrapper"
    }, (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-current", {
      key: 'b9d44b23a59119aceb2efb75bfdfe2dda844c9dd'
    }), (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      key: 'db2a04f56db336f42d66ce83524e4026a06f83ec',
      class: "separator"
    }, "/"), (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-duration", {
      key: '65cafd0c30751e48d715fdeb6d73e6e0bddbf5f3',
      duration: this.duration
    })));
  }
};
DtpcTimeDisplay.style = dtpcTimeDisplayCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-display_entry_js.js.map?ver=13b12aa30d4ec5ff70ec