"use strict";
(globalThis["webpackChunkdovetail_podcasts_player_blocks"] = globalThis["webpackChunkdovetail_podcasts_player_blocks"] || []).push([["web-components_dist_dovetail-podcasts-player-web-components_dtpc-slider_entry_js"],{

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/dtpc-slider.entry.js":
/*!*******************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/dtpc-slider.entry.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dtpc_slider: () => (/* binding */ DtpcSlider)
/* harmony export */ });
/* harmony import */ var _index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-C336hbsD.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-C336hbsD.js");

const dtpcSliderCss = ":host {\n  --_dtpc-slider--scrubber--color: var(--dtpc-slider--scrubber--color, currentColor);\n  --_dtpc-slider--scrubber--size: var(--dtpc-slider--scrubber--size, 1.25rem);\n  --_dtpc-slider--scrubber--border-color: var(--dtpc-slider--scrubber--border-color, transparent);\n  --_dtpc-slider--scrubber--border-width: var(--dtpc-slider--scrubber--border-width, 0);\n  --_dtpc-slider--scrubber--border-radius: var(--dtpc-slider--scrubber--border-radius, 100vw);\n  --_dtpc-slider--progress--color: var(--dtpc-slider--progress--color, currentColor);\n  --_dtpc-slider--track--color: var(--dtpc-slider--track--color, color-mix(in oklch, currentColor 20%, transparent));\n  --_dtpc-slider--track--height: var(--dtpc-slider--track--height, 0.25rem);\n  --_dtpc-slider--track--radius: var(--dtpc-slider--track--radius, 100vw);\n  --_dtpc-slider--track--border-color: var(--dtpc-slider--track--border-color, transparent);\n  --_dtpc-slider--track--border-width: var(--dtpc-slider--track--border-width, 0);\n  --_dtpc-slider--track--border-offset: var(--dtpc-slider--track--border-offset, 0);\n  --_dtpc-slider--focus-ring-color: var(--dtpc-slider--focus-ring-color, var(--_dtpc-player--highlight));\n  --_dtpc-slider--focus-ring-offset: var(--dtpc-slider--focus-ring-offset, 0.125rem);\n  --_dtpc-slider--focus-ring-width: var(--dtpc-slider--focus-ring-width, 2px);\n\n  display: contents;\n}\n\n.track {\n  --_scrubber--color: var(--_dtpc-slider--scrubber--color);\n  --_scrubber--size: var(--_dtpc-slider--scrubber--size);\n  --_scrubber--border-color: var(--_dtpc-slider--scrubber--border-color);\n  --_scrubber--border-width: var(--_dtpc-slider--scrubber--border-width);\n  --_scrubber--border-radius: var(--_dtpc-slider--scrubber--border-radius);\n  --_scrubber--focus-ring-color: var(--_dtpc-slider--focus-ring-color);\n  --_scrubber--focus-ring-offset: var(--_dtpc-slider--focus-ring-offset);\n  --_scrubber--focus-ring-width: var(--_dtpc-slider--focus-ring-width);\n  --_track--color: var(--_dtpc-slider--track--color);\n  --_track--height: var(--_dtpc-slider--track--height);\n  --_track--radius: var(--_dtpc-slider--track--radius);\n  --_track--border-color: var(--_dtpc-slider--track--border-color);\n  --_track--border-width: var(--_dtpc-slider--track--border-width);\n  --_track--border-offset: var(--_dtpc-slider--track--border-offset);\n  --_track--gutter: calc(var(--_scrubber--size) / 2);\n\n  flex-grow: 1;\n  isolation: isolate;\n  display: grid;\n  align-items: center;\n  grid-template-columns: [range-start] var(--_track--gutter) [track-start] 1fr [track-end] var(--_track--gutter) [range-end];\n  grid-template-rows: [range-start] [track-start] var(--_track--height) [track-end] [range-end];\n\n  &::before {\n    content: '';\n\n    grid-area: track;\n    grid-row: 1;\n    place-self: stretch;\n\n    outline-style: solid;\n    outline-color: var(--_track--border-color);\n    outline-width: var(--_track--border-width);\n    outline-offset: var(--_track--border-offset);\n\n    border-radius: var(--_track--radius);\n\n    background-color: var(--_track--color);\n  }\n\n  &:has(input[orient='vertical']) {\n    writing-mode: vertical-lr;\n    direction: rtl;\n    height: 100px;\n\n    margin-block: calc(var(--_scrubber--size) / 2);\n  }\n}\n\n.progress {\n  --_progress--color: var(--_dtpc-slider--progress--color);\n  --_length: calc(var(--progress, 0) * (100% - var(--_track--gutter) * 2));\n\n  grid-area: range;\n  grid-row: 1;\n  place-self: stretch;\n\n  display: grid;\n  grid-template-columns: var(--_track--gutter) minmax(var(--_track--height), var(--_length)) 1fr var(--_track--gutter);\n\n  &:not([data-show]) {\n    visibility: hidden;\n  }\n\n  &::before {\n    content: '';\n    grid-column: 2;\n\n    border-radius: var(--_track--radius);\n\n    background-color: var(--_progress--color);\n  }\n}\n\n.range {\n  grid-area: range;\n  grid-row: 1;\n\n  display: grid;\n  grid-template-columns: calc(var(--progress, 0) * (100% - var(--_scrubber--size))) [thumb-start] var(--_scrubber--size) [thumb-end];\n  grid-template-rows: [thumb-start] var(--_track--height) [thumb-end];\n  align-items: center;\n  justify-items: center;\n\n  min-width: var(--_track--height);\n}\n\n.scrubber {\n  grid-area: thumb;\n  display: grid;\n  aspect-ratio: 1;\n  width: var(--_scrubber--size);\n\n  &::after {\n    content: '';\n\n    transition-property: scale, opacity;\n    transition-duration: 200ms;\n    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n\n    display: block;\n    scale: 0;\n    opacity: 0;\n\n    border-style: solid;\n    border-color: var(--_scrubber--border-color);\n    border-width: var(--_scrubber--border-width);\n    border-radius: var(--_scrubber--border-radius);\n\n    background-color: var(--_scrubber--color);\n  }\n\n  .track:has(input:not(:disabled)):where(:hover, :focus-within) & {\n    &::after {\n      scale: 1;\n      opacity: 1;\n    }\n  }\n\n  .track:has(input:focus-visible) & {\n    &::after {\n      outline-style: solid;\n      outline-offset: var(--_scrubber--focus-ring-offset);\n      outline-color: var(--_scrubber--focus-ring-color);\n      outline-width: var(--_scrubber--focus-ring-width);\n    }\n  }\n}\n\ninput {\n  grid-area: range;\n  grid-row: 1;\n\n  appearance: none;\n  background-color: transparent;\n  outline: 0;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n\n  block-size: var(--_track--height);\n\n  &[orient='vertical'] {\n    writing-mode: vertical-lr;\n    direction: rtl;\n    vertical-align: bottom;\n  }\n\n  /* Chrome */\n  @media screen and (-webkit-min-device-pixel-ratio: 0) {\n    &::-webkit-slider-runnable-track {\n      appearance: none;\n      position: relative;\n      block-size: var(--_track--height);\n    }\n    &::-webkit-slider-thumb {\n      appearance: none;\n      position: relative;\n      display: block;\n      top: 50%;\n      left: 0;\n      translate: 0 -50%;\n      aspect-ratio: 1;\n      width: var(--_scrubber--size);\n      height: auto;\n      cursor: ew-resize;\n    }\n\n    &[orient='vertical'] {\n      &::-webkit-slider-thumb {\n        left: 50%;\n        top: 0;\n        translate: -50% 0;\n        cursor: ns-resize;\n      }\n    }\n\n    &:disabled {\n      &::-webkit-slider-thumb {\n        cursor: default;\n      }\n    }\n  }\n}\n";
const DtpcSlider = class {
  constructor(hostRef) {
    Object.defineProperty(this, "disabled", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: false
    });
    Object.defineProperty(this, "defaultValue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "value", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: null
    });
    Object.defineProperty(this, "min", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "max", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 100
    });
    Object.defineProperty(this, "step", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 1
    });
    Object.defineProperty(this, "orient", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "currentValue", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 0
    });
    Object.defineProperty(this, "sliderChange", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "sliderInput", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.sliderChange = (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "slider-change", 7);
    this.sliderInput = (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "slider-input", 7);
  }
  get el() {
    return (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.g)(this);
  }
  handleValueChange(newValue) {
    this.currentValue = newValue;
  }
  handleChange(e) {
    this.currentValue = parseFloat(e.target.value);
    this.sliderChange.emit(this.currentValue);
  }
  handleInput(e) {
    this.currentValue = parseFloat(e.target.value);
    this.sliderInput.emit(this.currentValue);
  }
  connectedCallback() {
    this.currentValue = this.value !== null ? this.value : this.defaultValue;
  }
  render() {
    const {
      min,
      max,
      defaultValue,
      currentValue,
      step,
      orient,
      disabled
    } = this;
    const progress = this.currentValue / this.max;
    const inputAttributes = {
      min,
      max,
      step,
      orient,
      defaultValue: `${defaultValue}`,
      value: currentValue,
      disabled: disabled || !max,
      onChange: e => this.handleChange(e),
      onInput: e => this.handleInput(e)
    };
    return (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '4ad685adddb074978dda54fce6f8428274464024',
      class: "track",
      style: {
        '--progress': `${progress}`
      }
    }, (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '46897489b8d9324d764c25f5ff8d71ef2e2ac28b',
      class: "progress",
      "data-show": !!max
    }), (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '6c2f854b10fa11e029c10d5674b4910d3b1b6abf',
      class: "range"
    }, (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'b658d8fce1f2be8232eb335c35fa8be6d142b50f',
      class: "scrubber"
    })), (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      key: 'bec688dbfb45911e2af6bb6ccef95244f0d226b2',
      type: 'range',
      ...inputAttributes,
      value: this.currentValue
    }));
  }
  static get watchers() {
    return {
      "value": ["handleValueChange"]
    };
  }
};
DtpcSlider.style = dtpcSliderCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-slider_entry_js.js.map?ver=b913779478da87f79833