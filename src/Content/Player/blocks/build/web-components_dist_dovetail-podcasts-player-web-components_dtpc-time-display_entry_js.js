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
/* harmony import */ var _index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-DjC7PCMK.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-DjC7PCMK.js");

const dtpcTimeDisplayCss = ":host{--_dtpc-time-display--spacing:var(--dtpc-time-display--spacing, 0.25rem);color:var(--_dtpc-player--time--color, currentColor);font-family:var(--_dtpc-player--time--font-family, inherit);font-size:var(--_dtpc-player--time--font-size, inherit);font-weight:var(--_dtpc-player--time--font-weight, inherit)}.wrapper{--_spacing:var(--_dtpc-time-display--spacing);display:flex;align-items:baseline;gap:var(--_spacing)}";
const DtpcTimeDisplay = class {
  constructor(hostRef) {
    Object.defineProperty(this, "duration", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  render() {
    return (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: '1151a09917785ef95517d3f531c8d99958dfab48'
    }, (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '18edebcd534ebd140829b184aa22a14bf2834f5f',
      class: "wrapper"
    }, (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-current", {
      key: '473f3c712bf1d2881cd5c028d0f8201c02a28dbc'
    }), (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("span", {
      key: '03a7d647bafdf55c9f1282841b4fe739ee8dcc80',
      class: "separator"
    }, "/"), (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-duration", {
      key: '6c789eb18d1e3472cbadef493a782b487f5729af',
      duration: this.duration
    })));
  }
};
DtpcTimeDisplay.style = dtpcTimeDisplayCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-time-display_entry_js.js.map?ver=c566db1c7c44f6f998d8