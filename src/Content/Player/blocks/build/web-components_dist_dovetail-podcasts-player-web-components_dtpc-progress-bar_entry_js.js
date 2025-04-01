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
/* harmony import */ var _index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-gWzpa9PG.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-gWzpa9PG.js");

const dtpcProgressBarCss = ":host {\n  --_dtpc-progress-bar--spacing: var(--dtpc-progress-bar--spacing, 0.5rem);\n  --_dtpc-progress-bar--scrubber--color: var(--dtpc-progress-bar--scrubber--color, var(--_dtpc-player--surface, white));\n  --_dtpc-progress-bar--scrubber--size: var(--dtpc-progress-bar--scrubber--size, 1.25rem);\n  --_dtpc-progress-bar--scrubber--border-color: var(--dtpc-progress-bar--scrubber--border-color, var(--_dtpc-player--foreground, currentColor));\n  --_dtpc-progress-bar--scrubber--border-width: var(--dtpc-progress-bar--scrubber--border-width, 0.125rem);\n  --_dtpc-progress-bar--scrubber--border-radius: var(--dtpc-progress-bar--scrubber--border-radius, 100vw);\n  --_dtpc-progress-bar--progress--color: var(--dtpc-progress-bar--progress--color, var(--_dtpc-player--foreground, currentColor));\n  --_dtpc-progress-bar--track--color: var(--dtpc-progress-bar--track--color, var(--_dtpc-player--surface, transparent));\n  --_dtpc-progress-bar--track--height: var(--dtpc-progress-bar--track--height, 0.5rem);\n  --_dtpc-progress-bar--track--radius: var(--dtpc-progress-bar--track--radius, 100vw);\n  --_dtpc-progress-bar--track--border-color: var(--dtpc-progress-bar--track--border-color, var(--_dtpc-player--foreground, currentColor));\n  --_dtpc-progress-bar--track--border-width: var(--dtpc-progress-bar--track--border-width, 0.125rem);\n  --_dtpc-progress-bar--track--border-offset: var(--dtpc-progress-bar--track--border-offset, 0.125rem);\n  --_dtpc-progress-bar--focus-ring-color: var(--dtpc-progress-bar--focus-ring-color, var(--_dtpc-player--highlight));\n  --_dtpc-progress-bar--focus-ring-offset: var(--dtpc-progress-bar--focus-ring-offset, 0.125rem);\n  --_dtpc-progress-bar--focus-ring-width: var(--dtpc-progress-bar--focus-ring-width, 2px);\n\n  display: contents;\n}\n\n.wrapper {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  gap: var(--_dtpc-progress-bar--spacing);\n}\n\n.track {\n  --_scrubber--color: var(--_dtpc-progress-bar--scrubber--color);\n  --_scrubber--size: var(--_dtpc-progress-bar--scrubber--size);\n  --_scrubber--border-color: var(--_dtpc-progress-bar--scrubber--border-color);\n  --_scrubber--border-width: var(--_dtpc-progress-bar--scrubber--border-width);\n  --_scrubber--border-radius: var(--_dtpc-progress-bar--scrubber--border-radius);\n  --_scrubber--focus-ring-color: var(--_dtpc-progress-bar--focus-ring-color);\n  --_scrubber--focus-ring-offset: var(--_dtpc-progress-bar--focus-ring-offset);\n  --_scrubber--focus-ring-width: var(--_dtpc-progress-bar--focus-ring-width);\n  --_track--color: var(--_dtpc-progress-bar--track--color);\n  --_track--height: var(--_dtpc-progress-bar--track--height);\n  --_track--radius: var(--_dtpc-progress-bar--track--radius);\n  --_track--border-color: var(--_dtpc-progress-bar--track--border-color);\n  --_track--border-width: var(--_dtpc-progress-bar--track--border-width);\n  --_track--border-offset: var(--_dtpc-progress-bar--track--border-offset);\n  --_track--gutter: calc(var(--_scrubber--size) / 4);\n\n  flex-grow: 1;\n  isolation: isolate;\n  display: grid;\n  align-items: center;\n  grid-template-columns: [range-start] var(--_track--gutter) [track-start] 1fr [track-end] var(--_track--gutter) [range-end];\n  grid-template-rows: [range-start] [track-start] var(--_track--height) [track-end] [range-end];\n\n  &::before {\n    content: '';\n\n    grid-area: track;\n    place-self: stretch;\n\n    outline-style: solid;\n    outline-color: var(--_track--border-color);\n    outline-width: var(--_track--border-width);\n    outline-offset: var(--_track--border-offset);\n\n    border-radius: var(--_track--radius);\n\n    background-color: var(--_track--color);\n  }\n}\n\n.progress {\n  --_progress--color: var(--_dtpc-progress-bar--progress--color);\n\n  grid-area: track;\n  place-self: stretch;\n\n  width: calc(var(--progress, 0) * (100% - var(--_track--gutter)) + var(--_track--gutter));\n  min-width: calc(var(--_scrubber--size) / 2);\n\n  border-radius: var(--_track--radius);\n\n  background-color: var(--_progress--color);\n\n  &:not([data-show]) {\n    visibility: hidden;\n  }\n}\n\n.range {\n  grid-area: range;\n  display: grid;\n  grid-template-columns: calc(var(--progress, 0) * (100% - var(--_scrubber--size))) [thumb-start] var(--_scrubber--size) [thumb-end];\n  grid-template-rows: [thumb-start] var(--_track--height) [thumb-end];\n  align-items: center;\n  justify-items: center;\n\n  min-width: var(--_track--height);\n}\n\n.scrubber {\n  grid-area: thumb;\n  display: grid;\n  aspect-ratio: 1;\n  width: var(--_scrubber--size);\n\n  &::after {\n    content: '';\n\n    transition-property: scale, opacity;\n    transition-duration: 200ms;\n    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n\n    display: block;\n    scale: 0;\n    opacity: 0;\n\n    border-style: solid;\n    border-color: var(--_scrubber--border-color);\n    border-width: var(--_scrubber--border-width);\n    border-radius: var(--_scrubber--border-radius);\n\n    background-color: var(--_scrubber--color);\n  }\n\n  .wrapper:where(:hover, :focus-within) & {\n    &::after {\n      scale: 1;\n      opacity: 1;\n    }\n  }\n\n  .wrapper:has(input:focus-visible) & {\n    &::after {\n      outline-style: solid;\n      outline-offset: var(--_scrubber--focus-ring-offset);\n      outline-color: var(--_scrubber--focus-ring-color);\n      outline-width: var(--_scrubber--focus-ring-width);\n    }\n  }\n}\n\ninput {\n  grid-area: range;\n\n  outline: 0;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n\n  /* Chrome */\n  @media screen and (-webkit-min-device-pixel-ratio: 0) {\n    & {\n      appearance: none;\n      height: var(--_track--height);\n      background-color: transparent;\n    }\n    &::-webkit-slider-runnable-track {\n      appearance: none;\n      position: relative;\n      height: var(--_track--height);\n    }\n    &::-webkit-slider-thumb {\n      appearance: none;\n      position: relative;\n      display: block;\n      top: 50%;\n      left: 0;\n      translate: 0 -50%;\n      aspect-ratio: 1;\n      width: var(--_scrubber--size);\n      height: auto;\n      cursor: ew-resize;\n    }\n  }\n}\n";
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
    (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.initControl = (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "dtpc-control-init", 7);
  }
  componentWillLoad() {
    const self = this;
    this.initControl.emit(state => self.state = state);
  }
  componentDidLoad() {
    const self = this;
    this.state.audioElm.addEventListener('loadedmetadata', e => {
      self.handleLoadedMetaData(e);
    });
    this.state.audioElm.addEventListener('timeupdate', e => {
      self.handleTimeUpdate(e);
    });
    this.audioDuration = this.state.audioElm.duration || this.duration;
  }
  handleLoadedMetaData(event) {
    this.currentTime = event.target.currentTime;
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
    this.state.seekTime = newTime;
    this.seekTime = newTime;
  }
  handleChange() {
    this.currentTime = this.seekTime;
    this.seekTime = 0;
    this.state.audioElm.currentTime = this.currentTime;
    this.state.seekTime = 0;
  }
  render() {
    const time = this.seekTime || this.currentTime;
    const progress = this.audioDuration && time / this.audioDuration;
    return (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: 'a878792cd354dbde5677e654ac1e429e001036cf'
    }, (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'fe11722f2ad0509dab89063ef82c6bafccc508f4',
      class: "wrapper",
      "aria-label": "Seek slider",
      "aria-valuemin": "0",
      "aria-valuemax": this.audioDuration,
      "aria-valuenow": time
    }, (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '088708368078564a9a19e2de63121f0b1a686474',
      class: "track",
      style: {
        '--progress': `${progress}`
      }
    }, (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'd835fd5cd9bf6b19537591763249cef785134ed9',
      class: "progress",
      "data-show": !!progress
    }), (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'b494c88d27eb33554ba85665944e9268b0b1e79b',
      class: "range"
    }, (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '2d281c4c60606a08d49e1c6fb1afe0855d5e2015',
      class: "scrubber"
    })), (0,_index_gWzpa9PG_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      key: '40e972597dc239feb5872741266619855ed7b233',
      tabindex: 0,
      type: "range",
      disabled: !this.audioDuration,
      defaultValue: "0",
      min: 0,
      max: this.audioDuration,
      step: 1,
      value: time,
      onInput: e => this.handleInput(e),
      onChange: () => this.handleChange()
    }))));
  }
};
DtpcProgressBar.style = dtpcProgressBarCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-progress-bar_entry_js.js.map?ver=d1ea892e0bd806159d05