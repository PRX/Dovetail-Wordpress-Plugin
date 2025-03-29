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
/* harmony import */ var _index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ZFNzDU8A.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-ZFNzDU8A.js");

const dtpcProgressBarCss = ":host {\n  --_dtpc-progress-bar--spacing: var(--dtpc-progress-bar--spacing, 0.5rem);\n  --_dtpc-progress-bar--thumb--color: var(--dtpc-progress-bar--thumb--height, var(--_dtpc-player--primary-color));\n  --_dtpc-progress-bar--thumb--size: var(--dtpc-progress-bar--thumb--size, 1.25rem);\n  --_dtpc-progress-bar--progress--color: var(--dtpc-progress-bar--progress--color, currentColor);\n  --_dtpc-progress-bar--track--color: var(--dtpc-progress-bar--track--color, transparent);\n  --_dtpc-progress-bar--track--height: var(--dtpc-progress-bar--track--height, 0.5rem);\n  --_dtpc-progress-bar--track--radius: var(--dtpc-progress-bar--track--radius, 100vw);\n  --_dtpc-progress-bar--track--border-color: var(--dtpc-progress-bar--track--border-color, currentColor);\n  --_dtpc-progress-bar--track--border-width: var(--dtpc-progress-bar--track--border-width, 0.125rem);\n  --_dtpc-progress-bar--track--border-offset: var(--dtpc-progress-bar--track--border-offset, 0.125rem);\n\n  display: contents;\n}\n\n.wrapper {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  gap: var(--_dtpc-progress-bar--spacing);\n}\n\n.track {\n  --_thumb--color: var(--_dtpc-progress-bar--thumb--color);\n  --_thumb--size: var(--_dtpc-progress-bar--thumb--size);\n  --_track--color: var(--_dtpc-progress-bar--track--color);\n  --_track--height: var(--_dtpc-progress-bar--track--height);\n  --_track--radius: var(--_dtpc-progress-bar--track--radius);\n  --_track--border-color: var(--_dtpc-progress-bar--track--border-color);\n  --_track--border-width: var(--_dtpc-progress-bar--track--border-width);\n  --_track--border-offset: var(--_dtpc-progress-bar--track--border-offset);\n  --_track--gutter: calc(var(--_thumb--size) / 4);\n\n  flex-grow: 1;\n  isolation: isolate;\n  display: grid;\n  align-items: center;\n  grid-template-columns: [range-start] var(--_track--gutter) [track-start] 1fr [track-end] var(--_track--gutter) [range-end];\n  grid-template-rows: [range-start] [track-start] var(--_track--height) [track-end] [range-end];\n\n  &::before {\n    content: '';\n\n    grid-area: track;\n    place-self: stretch;\n\n    outline-style: solid;\n    outline-color: var(--_track--border-color);\n    outline-width: var(--_track--border-width);\n    outline-offset: var(--_track--border-offset);\n\n    border-radius: var(--_track--radius);\n\n    background-color: var(--_track--color);\n  }\n}\n\n.progress {\n  --_progress--color: var(--_dtpc-progress-bar--progress--color);\n\n  grid-area: track;\n  place-self: stretch;\n\n  width: calc(var(--progress, 0) * (100% - var(--_track--gutter)) + var(--_track--gutter));\n  min-width: calc(var(--_thumb--size) / 2);\n\n  border-radius: var(--_track--radius);\n\n  background-color: var(--_progress--color);\n\n  &:not([data-show]) {\n    visibility: hidden;\n  }\n}\n\n.range {\n  grid-area: range;\n  display: grid;\n  grid-template-columns: calc(var(--progress, 0) * (100% - var(--_thumb--size))) [thumb-start] var(--_thumb--size) [thumb-end];\n  grid-template-rows: [thumb-start] var(--_track--height) [thumb-end];\n  align-items: center;\n  justify-items: center;\n\n  min-width: var(--_track--height);\n}\n\n.thumb {\n  grid-area: thumb;\n  display: grid;\n  aspect-ratio: 1;\n  width: var(--_thumb--size);\n\n  &::after {\n    content: '';\n\n    transition-property: scale, opacity;\n    transition-duration: 200ms;\n    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n\n    display: block;\n    scale: 0;\n    opacity: 0;\n\n    border-radius: 100vw;\n\n    background-color: var(--_thumb--color);\n  }\n\n  .wrapper:where(:hover, :focus-within) & {\n    &::after {\n      scale: 1;\n      opacity: 1;\n    }\n  }\n}\n\ninput {\n  grid-area: range;\n\n  outline: 0;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n\n  /* Chrome */\n  @media screen and (-webkit-min-device-pixel-ratio: 0) {\n    & {\n      appearance: none;\n      height: var(--_track--height);\n      background-color: transparent;\n    }\n    &::-webkit-slider-runnable-track {\n      appearance: none;\n      position: relative;\n      height: var(--_track--height);\n    }\n    &::-webkit-slider-thumb {\n      appearance: none;\n      position: relative;\n      display: block;\n      top: 50%;\n      left: 0;\n      translate: 0 -50%;\n      aspect-ratio: 1;\n      width: var(--_thumb--size);\n      height: auto;\n      cursor: ew-resize;\n    }\n  }\n}\n";
const DtpcProgressBar = class {
  constructor(hostRef) {
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
    Object.defineProperty(this, "bindAudioEvents", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "updateCurrentTime", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.bindAudioEvents = (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "bind-audio-events", 5);
    this.updateCurrentTime = (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "update-current-time", 5);
  }
  connectedCallback() {
    this.audioDuration = this.duration;
  }
  componentDidLoad() {
    (self => self.bindAudioEvents.emit([['loadedmetadata', e => {
      self.handleLoadedMetaData(e);
    }], ['timeupdate', e => {
      self.handleTimeUpdate(e);
    }]]))(this);
  }
  handleLoadedMetaData(event) {
    this.audioDuration = event.target.duration;
  }
  handleTimeUpdate(event) {
    this.currentTime = event.target.currentTime;
  }
  handleInput(event) {
    const {
      value
    } = event.target;
    const newTime = parseFloat(value);
    console.log(value, newTime);
    this.seekTime = newTime;
  }
  handleChange() {
    this.currentTime = this.seekTime;
    this.seekTime = 0;
    this.updateCurrentTime.emit(this.currentTime);
  }
  render() {
    const progress = this.audioDuration && (this.seekTime || this.currentTime) / this.audioDuration;
    return (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: '226053709c6fbc5168b3402a593259e231011263',
      "aria-label": "Seek slider",
      "aria-valuemin": "0",
      "aria-valuemax": this.audioDuration,
      "aria-valuenow": this.currentTime
    }, (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '277d78b51808995ef9c2dce320e4b4007261cb71',
      class: "wrapper"
    }, (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot", {
      key: '300f2b1b6c9e400be7ca4fc37f7c094472684aaf',
      name: "before"
    }), (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'e97917b1e07a7ad9eb8b2f95e30b41540d70f445',
      class: "track",
      style: {
        '--progress': `${progress}`
      }
    }, (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '55803cf5e8d8dc27db0953c2fc3ab45e8d0bbfa1',
      class: "progress",
      "data-show": !!progress
    }), (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '5d12af86af0caed926d0d75ff98167c395bd73c5',
      class: "range"
    }, (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '6160913d7dbaf9f019e2e297eae19ac9381c5395',
      class: "thumb"
    })), (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      key: 'c714f4e7c5b715af1c55f8ea3f19a30cfe8466e3',
      tabindex: 0,
      type: "range",
      disabled: !this.audioDuration,
      defaultValue: "0",
      min: 0,
      max: this.audioDuration,
      step: 1,
      value: this.seekTime || this.currentTime,
      onInput: e => this.handleInput(e),
      onChange: () => this.handleChange()
    })), (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot", {
      key: 'b7cd70d4b372f5243f64cf58844ddfc365691bb7',
      name: "before"
    })));
  }
};
DtpcProgressBar.style = dtpcProgressBarCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-progress-bar_entry_js.js.map?ver=2e523af551fcaaada29e