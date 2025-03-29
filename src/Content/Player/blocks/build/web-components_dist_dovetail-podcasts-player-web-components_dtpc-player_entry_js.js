"use strict";
(globalThis["webpackChunkdovetail_podcasts_player_blocks"] = globalThis["webpackChunkdovetail_podcasts_player_blocks"] || []).push([["web-components_dist_dovetail-podcasts-player-web-components_dtpc-player_entry_js"],{

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/dtpc-player.entry.js":
/*!*******************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/dtpc-player.entry.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dtpc_player: () => (/* binding */ DtpcPlayer)
/* harmony export */ });
/* harmony import */ var _index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ZFNzDU8A.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-ZFNzDU8A.js");

const dtpcPlayerCss = ":host {\n  --_dtpc-player--primary-color: var(--dtpc-player--primary-color, hsl(198, 100%, 32%));\n  --_dtpc-player--secondary-color: var(--dtpc-player--primary-color, hsl(240, 1%, 33%));\n  --_dtpc-player--info-color: var(--dtpc-player--primary-color, hsl(201, 64%, 67%));\n  --_dtpc-player--bg-color: var(--dtpc-player--bg-color, transparent);\n  --_dtpc-player--bg-opacity: var(--dtpc-player--bg-opacity, 1);\n  --_dtpc-player--bg-blur: var(--dtpc-player--bg-blur, 0);\n  --_dtpc-player--padding: var(--dtpc-player--padding, 0);\n  --_dtpc-player--padding-inline: var(--dtpc-player--padding-inline, var(--_padding));\n  --_dtpc-player--padding-block: var(--dtpc-player--padding-block, var(--_padding));\n  --_dtpc-player--spacing: var(--dtpc-player--spacing, 0.5rem);\n}\n\n.wrapper {\n  display: grid;\n\n  & > * {\n    grid-column: 1 / -1;\n    grid-row: 1 / -1;\n  }\n}\n\n.main {\n  --_spacing: var(--_dtpc-player--spacing);\n  --_padding-inline: var(--_dtpc-player--padding-inline);\n  --_padding-block: var(--_dtpc-player--padding-block);\n\n  display: flex;\n  align-items: center;\n  gap: var(--_spacing);\n\n  padding-inline: var(--_padding-inline);\n  padding-block: var(--_padding-block);\n}\n";
const DtpcPlayer = class {
  constructor(hostRef) {
    Object.defineProperty(this, "audio", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "src", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  connectedCallback() {
    this.audio = new Audio();
    this.audio.src = this.src;
    this.audio.preload = 'none';
  }
  disconnectedCallback() {
    this.audio.pause();
    delete this.audio;
  }
  watchSrcHandler(newSrc) {
    if (!this.audio.paused) {
      this.audio.pause();
    }
    this.audio.src = newSrc;
  }
  pauseAudioHandler() {
    if (this.audio.paused) {
      this.audio.play().then(() => {}).catch(err => {
        console.error(err);
      });
    } else {
      this.audio.pause();
    }
  }
  updateCurrentTime(event) {
    console.log('update-current-time received:', event.detail);
    this.audio.currentTime = event.detail;
  }
  handleBindAudio(event) {
    event.detail.forEach(([n, cb]) => {
      this.audio.addEventListener(n, cb);
    });
  }
  render() {
    return (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: '5d12e01dffab6cea55b1734cd5e3cb6db10fdccb'
    }, (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '88a0150898cc580421ec5bb9e7ab03d0e3250e33',
      class: "wrapper"
    }, (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '95573b6aa92ea7f2ad63272096b2b19945a02f1c',
      part: "backdrop"
    }), (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '38e7154cbb964db6b1186a36b0b4fdbbe2ea7eba',
      class: "main"
    }, (0,_index_ZFNzDU8A_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot", {
      key: '6e197251131558e038243a0d38022770d2244c82'
    }))));
  }
  static get watchers() {
    return {
      "src": ["watchSrcHandler"]
    };
  }
};
DtpcPlayer.style = dtpcPlayerCss;


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-player_entry_js.js.map?ver=02ee6f078ca5d2be9845