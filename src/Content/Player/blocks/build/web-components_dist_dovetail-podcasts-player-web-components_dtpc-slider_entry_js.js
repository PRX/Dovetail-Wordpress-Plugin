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
/* harmony import */ var _index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-DjC7PCMK.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-DjC7PCMK.js");

const dtpcSliderCss = ":host {\n  --_dtpc-slider--scrubber--color: var(--dtpc-slider--scrubber--color, var(--_dtpc-player--foreground, CanvasText));\n  --_dtpc-slider--scrubber--size: var(--dtpc-slider--scrubber--size, 1.25rem);\n  --_dtpc-slider--scrubber--border-color: var(--dtpc-slider--scrubber--border-color, transparent);\n  --_dtpc-slider--scrubber--border-width: var(--dtpc-slider--scrubber--border-width, 0);\n  --_dtpc-slider--scrubber--border-radius: var(--dtpc-slider--scrubber--border-radius, 100vw);\n  --_dtpc-slider--scrubber--focus-ring-color: var(--dtpc-slider--focus-ring-color, var(--_dtpc-player--highlight, LinkText));\n  --_dtpc-slider--scrubber--focus-ring-offset: var(--dtpc-slider--focus-ring-offset, 0.125rem);\n  --_dtpc-slider--scrubber--focus-ring-width: var(--dtpc-slider--focus-ring-width, 0.125rem);\n  --_dtpc-slider--progress--color: var(--dtpc-slider--progress--color, var(--_dtpc-player--foreground, CanvasText));\n  --_dtpc-slider--track--color: var(--dtpc-slider--track--color, color-mix(in oklch, var(--_dtpc-slider--progress--color) 20%, transparent));\n  --_dtpc-slider--track--height: var(--dtpc-slider--track--height, 0.25rem);\n  --_dtpc-slider--track--radius: var(--dtpc-slider--track--radius, 100vw);\n  --_dtpc-slider--track--border-color: var(--dtpc-slider--track--border-color, transparent);\n  --_dtpc-slider--track--border-width: var(--dtpc-slider--track--border-width, 0);\n  --_dtpc-slider--track--border-offset: var(--dtpc-slider--track--border-offset, 0);\n\n  display: contents;\n}\n\n.track {\n  --_dtpc-slider--track--gutter: calc(var(--_dtpc-slider--scrubber--size) / 2);\n\n  isolation: isolate;\n  display: grid;\n  align-items: center;\n  grid-template-columns: [range-start] var(--_dtpc-slider--track--gutter) [track-start] 1fr [track-end] var(--_dtpc-slider--track--gutter) [range-end];\n  grid-template-rows: [range-start] [track-start] var(--_dtpc-slider--track--height) [track-end] [range-end];\n\n  &::before {\n    content: '';\n\n    grid-area: track;\n    grid-row: 1;\n    place-self: stretch;\n\n    outline-style: solid;\n    outline-color: var(--_dtpc-slider--track--border-color);\n    outline-width: var(--_dtpc-slider--track--border-width);\n    outline-offset: var(--_dtpc-slider--track--border-offset);\n\n    border-radius: var(--_dtpc-slider--track--radius);\n\n    background-color: var(--_dtpc-slider--track--color);\n  }\n\n  &:has(input[orient='vertical']) {\n    writing-mode: vertical-lr;\n    direction: rtl;\n    height: 100px;\n\n    margin-block: calc(var(--_dtpc-slider--scrubber--size) / 2);\n  }\n}\n\n.progress {\n  --_progress--color: var(--_dtpc-slider--progress--color);\n  --_length: calc(var(--progress, 0) * (100% - var(--_dtpc-slider--track--gutter) * 2));\n\n  grid-area: range;\n  grid-row: 1;\n  place-self: stretch;\n\n  display: grid;\n  grid-template-columns: var(--_dtpc-slider--track--gutter) minmax(var(--_dtpc-slider--track--height), var(--_length)) 1fr var(--_dtpc-slider--track--gutter);\n\n  &:not([data-show]) {\n    visibility: hidden;\n  }\n\n  &::before {\n    content: '';\n    grid-column: 2;\n\n    border-radius: var(--_dtpc-slider--track--radius);\n\n    background-color: var(--_dtpc-slider--progress--color);\n  }\n}\n\n.range {\n  grid-area: range;\n  grid-row: 1;\n\n  display: grid;\n  grid-template-columns: calc(var(--progress, 0) * (100% - var(--_dtpc-slider--scrubber--size))) [thumb-start] var(--_dtpc-slider--scrubber--size) [thumb-end];\n  grid-template-rows: [thumb-start] var(--_dtpc-slider--track--height) [thumb-end];\n  align-items: center;\n  justify-items: center;\n\n  min-width: var(--_dtpc-slider--track--height);\n}\n\n.scrubber {\n  grid-area: thumb;\n  display: grid;\n  aspect-ratio: 1;\n  width: var(--_dtpc-slider--scrubber--size);\n\n  &::after {\n    content: '';\n\n    transition-property: scale, opacity;\n    transition-duration: 200ms;\n    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);\n\n    display: block;\n    scale: 0;\n    opacity: 0;\n\n    border-style: solid;\n    border-color: var(--_dtpc-slider--scrubber--border-color);\n    border-width: var(--_dtpc-slider--scrubber--border-width);\n    border-radius: var(--_dtpc-slider--scrubber--border-radius);\n\n    background-color: var(--_dtpc-slider--scrubber--color);\n  }\n\n  .track:has(input:not(:disabled)):where(:hover, :focus-within) & {\n    &::after {\n      scale: 1;\n      opacity: 1;\n    }\n  }\n\n  .track:has(input:focus-visible) & {\n    &::after {\n      outline-style: solid;\n      outline-offset: var(--_dtpc-slider--scrubber--focus-ring-offset);\n      outline-color: var(--_dtpc-slider--scrubber--focus-ring-color);\n      outline-width: var(--_dtpc-slider--scrubber--focus-ring-width);\n    }\n  }\n}\n\ninput {\n  grid-area: range;\n  grid-row: 1;\n\n  appearance: none;\n  background-color: transparent;\n  outline: 0;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n\n  block-size: var(--_dtpc-slider--track--height);\n\n  &[orient='vertical'] {\n    writing-mode: vertical-lr;\n    direction: rtl;\n    vertical-align: bottom;\n  }\n\n  /* Chrome */\n  @media screen and (-webkit-min-device-pixel-ratio: 0) {\n    &::-webkit-slider-runnable-track {\n      appearance: none;\n      position: relative;\n      block-size: var(--_dtpc-slider--track--height);\n    }\n    &::-webkit-slider-thumb {\n      appearance: none;\n      position: relative;\n      display: block;\n      top: 50%;\n      left: 0;\n      translate: 0 -50%;\n      aspect-ratio: 1;\n      width: var(--_dtpc-slider--scrubber--size);\n      height: auto;\n      cursor: ew-resize;\n    }\n\n    &[orient='vertical'] {\n      &::-webkit-slider-thumb {\n        left: 50%;\n        top: 0;\n        translate: -50% 0;\n        cursor: ns-resize;\n      }\n    }\n\n    &:disabled {\n      &::-webkit-slider-thumb {\n        cursor: default;\n      }\n    }\n  }\n}\n";
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
    (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.sliderChange = (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "slider-change", 7);
    this.sliderInput = (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "slider-input", 7);
  }
  get el() {
    return (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.e)(this);
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
    return (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'bb0fc5836d30d9c7761c05ea27cf1b73424aac62',
      class: "track",
      style: {
        '--progress': `${progress}`
      }
    }, (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'b103713967683c13b406b932b40dc9f55af63636',
      class: "progress",
      "data-show": !!max
    }), (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '35343b5e08b2a34e53629ba161d40e95e0142228',
      class: "range"
    }, (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '0edcf7ba3d9a67a92bf55e10930421558b9497d3',
      class: "scrubber"
    })), (0,_index_DjC7PCMK_js__WEBPACK_IMPORTED_MODULE_0__.h)("input", {
      key: 'dbab00885c6a5ced7a9a7e44a7e25c77124b6bdb',
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
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-slider_entry_js.js.map?ver=8de7ab95a452cc76b846