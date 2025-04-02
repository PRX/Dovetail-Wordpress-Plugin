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
/* harmony import */ var _index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-C336hbsD.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-C336hbsD.js");

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
    Object.defineProperty(this, "currentTime", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "seekTime", {
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
    (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.initControl = (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "dtpc-control-init", 7);
  }
  componentWillLoad() {
    const self = this;
    this.audioDuration = this.duration;
    this.initControl.emit(state => {
      self.state = state;
      self.audioDuration = state.audioElm.duration || this.duration;
    });
  }
  componentDidLoad() {
    const self = this;
    this.state.audioElm.addEventListener('loadedmetadata', e => {
      self.handleLoadedMetaData(e);
    });
    this.state.audioElm.addEventListener('timeupdate', e => {
      self.handleTimeUpdate(e);
    });
  }
  handleLoadedMetaData(event) {
    this.currentTime = event.target.currentTime;
    this.audioDuration = event.target.duration;
  }
  handleTimeUpdate(event) {
    this.currentTime = event.target.currentTime;
  }
  handleInput(event) {
    this.state.seekTime = event.detail;
    this.seekTime = event.detail;
  }
  handleChange(event) {
    this.currentTime = event.detail;
    this.seekTime = null;
    this.state.audioElm.currentTime = this.currentTime;
    this.state.seekTime = this.seekTime;
  }
  render() {
    const time = this.seekTime !== null ? this.seekTime : this.currentTime;
    return (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'f4b295a1301caf4959834abb008301c98047249a',
      class: "wrapper",
      "aria-label": "Seek slider",
      "aria-valuemin": "0",
      "aria-valuemax": this.audioDuration,
      "aria-valuenow": time
    }, (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-slider", {
      key: 'c5f82861796bf8a8d314e0e913ac3aebfc3ce1a2',
      tabindex: 0,
      disabled: !this.audioDuration,
      defaultValue: 0,
      min: 0,
      max: this.audioDuration,
      step: 1,
      value: time
    }));
  }
};
DtpcProgressBar.style = dtpcProgressBarCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-progress-bar_entry_js.js.map?ver=3b2b34cb009c3cbc7651