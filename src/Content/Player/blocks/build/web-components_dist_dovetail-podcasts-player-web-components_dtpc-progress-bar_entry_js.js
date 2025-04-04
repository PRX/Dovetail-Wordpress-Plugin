"use strict";
(globalThis["webpackChunkdovetail_podcasts_player_blocks"] = globalThis["webpackChunkdovetail_podcasts_player_blocks"] || []).push([["web-components_dist_dovetail-podcasts-player-web-components_dtpc-progress-bar_entry_js"],{

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/dtpc-progress-bar.entry.js":
/*!*************************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/dtpc-progress-bar.entry.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dtpc_progress_bar: () => (/* binding */ DtpcProgressBar)
/* harmony export */ });
/* harmony import */ var _index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ngapiRTG.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-ngapiRTG.js");

const dtpcProgressBarCss = ":host{--dtpc-slider--scrubber--color:var(--dtpc-progress-bar--scrubber--color, var(--_dtpc-player--surface, white));--dtpc-slider--scrubber--size:var(--dtpc-progress-bar--scrubber--size, 1.25rem);--dtpc-slider--scrubber--border-color:var(--dtpc-progress-bar--scrubber--border-color, var(--_dtpc-player--foreground, currentColor));--dtpc-slider--scrubber--border-width:var(--dtpc-progress-bar--scrubber--border-width, 0.125rem);--dtpc-slider--scrubber--border-radius:var(--dtpc-progress-bar--scrubber--border-radius, 100vw);--dtpc-slider--progress--color:var(--dtpc-progress-bar--progress--color, var(--_dtpc-player--foreground, currentColor));--dtpc-slider--track--color:var(--dtpc-progress-bar--track--color, var(--_dtpc-player--surface, transparent));--dtpc-slider--track--height:var(--dtpc-progress-bar--track--height, 0.5rem);--dtpc-slider--track--radius:var(--dtpc-progress-bar--track--radius, 100vw);--dtpc-slider--track--border-color:var(--dtpc-progress-bar--track--border-color, var(--_dtpc-player--foreground, currentColor));--dtpc-slider--track--border-width:var(--dtpc-progress-bar--track--border-width, 0.125rem);--dtpc-slider--track--border-offset:var(--dtpc-progress-bar--track--border-offset, 0.125rem);--dtpc-slider--focus-ring-color:var(--dtpc-progress-bar--focus-ring-color, var(--_dtpc-player--highlight));--dtpc-slider--focus-ring-offset:var(--dtpc-progress-bar--focus-ring-offset, 0.125rem);--dtpc-slider--focus-ring-width:var(--dtpc-progress-bar--focus-ring-width, 2px);display:contents}.wrapper{flex-grow:1;display:grid;align-items:center}";
const DtpcProgressBar = class {
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
  handleInput(event) {
    this.state.seekTime = event.detail;
  }
  handleChange() {
    this.state.seekTime = null;
  }
  render() {
    const {
      seekTime,
      currentTime,
      duration
    } = this.state;
    const time = seekTime !== null ? seekTime : currentTime;
    const max = duration || this.audioDuration;
    return (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '07ddbf91e448facc8e77a33813da327e78ca82dd',
      class: "wrapper",
      "aria-label": "Seek slider",
      "aria-valuemin": "0",
      "aria-valuemax": max,
      "aria-valuenow": time
    }, (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-slider", {
      key: '80763f72c2ae423c35e733a06224cc7f3a752e5e',
      tabindex: 0,
      disabled: !max,
      defaultValue: 0,
      min: 0,
      max: max,
      step: 1,
      value: time
    }));
  }
};
DtpcProgressBar.style = dtpcProgressBarCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-progress-bar_entry_js.js.map?ver=c304e5ef3359a5b047db