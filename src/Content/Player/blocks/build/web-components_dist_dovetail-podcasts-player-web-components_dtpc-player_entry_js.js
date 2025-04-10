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
/* harmony import */ var _index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-DqrFfVsn.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-DqrFfVsn.js");

const appendToMap = (map, propName, value) => {
  const items = map.get(propName);
  if (!items) {
    map.set(propName, [value]);
  } else if (!items.includes(value)) {
    items.push(value);
  }
};
const debounce = (fn, ms) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = 0;
      fn(...args);
    }, ms);
  };
};
const isConnected = maybeElement => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce(map => {
  for (let key of map.keys()) {
    map.set(key, map.get(key).filter(isConnected));
  }
}, 2000);
const stencilSubscription = () => {
  if (typeof _index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.g !== 'function') {
    return {};
  }
  const elmsToUpdate = new Map();
  return {
    dispose: () => elmsToUpdate.clear(),
    get: propName => {
      const elm = (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.g)();
      if (elm) {
        appendToMap(elmsToUpdate, propName, elm);
      }
    },
    set: propName => {
      const elements = elmsToUpdate.get(propName);
      if (elements) {
        elmsToUpdate.set(propName, elements.filter(_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.f));
      }
      cleanupElements(elmsToUpdate);
    },
    reset: () => {
      elmsToUpdate.forEach(elms => elms.forEach(_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.f));
      cleanupElements(elmsToUpdate);
    }
  };
};
const unwrap = val => typeof val === 'function' ? val() : val;
const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
  const unwrappedState = unwrap(defaultState);
  let states = new Map(Object.entries(unwrappedState !== null && unwrappedState !== void 0 ? unwrappedState : {}));
  const handlers = {
    dispose: [],
    get: [],
    set: [],
    reset: []
  };
  const reset = () => {
    var _unwrap;
    states = new Map(Object.entries((_unwrap = unwrap(defaultState)) !== null && _unwrap !== void 0 ? _unwrap : {}));
    handlers.reset.forEach(cb => cb());
  };
  const dispose = () => {
    handlers.dispose.forEach(cb => cb());
    reset();
  };
  const get = propName => {
    handlers.get.forEach(cb => cb(propName));
    return states.get(propName);
  };
  const set = (propName, value) => {
    const oldValue = states.get(propName);
    if (shouldUpdate(value, oldValue, propName)) {
      states.set(propName, value);
      handlers.set.forEach(cb => cb(propName, value, oldValue));
    }
  };
  const state = typeof Proxy === 'undefined' ? {} : new Proxy(unwrappedState, {
    get(_, propName) {
      return get(propName);
    },
    ownKeys(_) {
      return Array.from(states.keys());
    },
    getOwnPropertyDescriptor() {
      return {
        enumerable: true,
        configurable: true
      };
    },
    has(_, propName) {
      return states.has(propName);
    },
    set(_, propName, value) {
      set(propName, value);
      return true;
    }
  });
  const on = (eventName, callback) => {
    handlers[eventName].push(callback);
    return () => {
      removeFromArray(handlers[eventName], callback);
    };
  };
  const onChange = (propName, cb) => {
    const unSet = on('set', (key, newValue) => {
      if (key === propName) {
        cb(newValue);
      }
    });
    const unReset = on('reset', () => cb(unwrap(defaultState)[propName]));
    return () => {
      unSet();
      unReset();
    };
  };
  const use = (...subscriptions) => {
    const unsubs = subscriptions.reduce((unsubs, subscription) => {
      if (subscription.set) {
        unsubs.push(on('set', subscription.set));
      }
      if (subscription.get) {
        unsubs.push(on('get', subscription.get));
      }
      if (subscription.reset) {
        unsubs.push(on('reset', subscription.reset));
      }
      if (subscription.dispose) {
        unsubs.push(on('dispose', subscription.dispose));
      }
      return unsubs;
    }, []);
    return () => unsubs.forEach(unsub => unsub());
  };
  const forceUpdate = key => {
    const oldValue = states.get(key);
    handlers.set.forEach(cb => cb(key, oldValue, oldValue));
  };
  return {
    state,
    get,
    set,
    on,
    onChange,
    use,
    dispose,
    reset,
    forceUpdate
  };
};
const removeFromArray = (array, item) => {
  const index = array.indexOf(item);
  if (index >= 0) {
    array[index] = array[array.length - 1];
    array.length--;
  }
};
const createStore = (defaultState, shouldUpdate) => {
  const map = createObservableMap(defaultState, shouldUpdate);
  map.use(stencilSubscription());
  return map;
};
class playerStateFactory {
  constructor() {
    Object.defineProperty(this, "stores", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: []
    });
  }
  createStore(src) {
    const audioElm = new Audio();
    audioElm.preload = 'none';
    audioElm.src = src;
    audioElm.volume = 0.8;
    const newStore = createStore({
      audioElm,
      currentTime: audioElm.currentTime,
      duration: audioElm.duration,
      muted: audioElm.muted,
      playing: !audioElm.paused,
      volume: audioElm.volume,
      seekTime: null
    });
    this.stores.push(newStore);
    return newStore;
  }
}
const factory = new playerStateFactory();
const dtpcPlayerCss = ":host {\n  --_dtpc-player--foreground: var(--dtpc-player--foreground, currentColor);\n  --_dtpc-player--highlight: var(--dtpc-player--highlight, LinkText);\n  --_dtpc-player--surface: var(--dtpc-player--surface, white);\n  --_dtpc-player--surface-opacity: var(--dtpc-player--bg-opacity, 0);\n  --_dtpc-player--surface-blur: var(--dtpc-player--bg-blur, 0);\n  --_dtpc-player--padding: var(--dtpc-player--padding, 0);\n  --_dtpc-player--padding-inline: var(--dtpc-player--padding-inline, var(--_dtpc-player--padding));\n  --_dtpc-player--padding-block: var(--dtpc-player--padding-block, var(--_dtpc-player--padding));\n  --_dtpc-player--spacing: var(--dtpc-player--spacing, 0.5rem);\n\n  /* Time */\n  --_dtpc-player--time--color: var(--dtpc-player--time--font-size, var(--_dtpc-player--foreground));\n  --_dtpc-player--time--font-size: var(--dtpc-player--time--font-size, 0.875rem);\n  --_dtpc-player--time--font-family: var(--dtpc-player--time--font-family, ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace);\n  --_dtpc-player--time--font-weight: var(--dtpc-player--time--font-weight, inherit);\n}\n\n.wrapper {\n  display: grid;\n\n  & > * {\n    grid-column: 1 / -1;\n    grid-row: 1 / -1;\n  }\n}\n\n:host(:where([layout='flex'], [layout='default'])) {\n  .main {\n    display: flex;\n    align-items: center;\n    gap: var(--_dtpc-player--spacing);\n\n    padding-inline: var(--_dtpc-player--padding-inline);\n    padding-block: var(--_dtpc-player--padding-block);\n  }\n}\n";
const DtpcPlayer = class {
  constructor(hostRef) {
    Object.defineProperty(this, "state", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    Object.defineProperty(this, "layout", {
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
    (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  connectedCallback() {
    const {
      state,
      onChange
    } = factory.createStore(this.src);
    const {
      audioElm
    } = state;
    let previousSeekTime = state.seekTime;
    this.audioDuration = this.duration;
    this.state = state;
    state.duration = this.audioDuration;
    onChange('seekTime', seekTime => {
      if (previousSeekTime !== null && seekTime === null) {
        audioElm.currentTime = previousSeekTime;
        state.currentTime = previousSeekTime;
      }
      previousSeekTime = seekTime;
    });
    onChange('muted', muted => audioElm.muted = muted);
    onChange('volume', volume => audioElm.volume = volume);
    state.audioElm.addEventListener('loadedmetadata', e => {
      state.currentTime = e.target.currentTime;
      state.duration = e.target.duration;
    });
    state.audioElm.addEventListener('timeupdate', e => state.currentTime = e.target.currentTime);
    state.audioElm.addEventListener('play', () => state.playing = true);
    state.audioElm.addEventListener('pause', () => state.playing = false);
  }
  disconnectedCallback() {
    this.state.audioElm.pause();
  }
  handleTogglePaused() {
    if (this.state.audioElm.paused) {
      this.state.audioElm.play().then(() => {}).catch(e => {
        console.error(e);
      });
    } else {
      this.state.audioElm.pause();
    }
  }
  handleControlInit(e) {
    if (e.detail instanceof Function) {
      e.stopPropagation();
      e.detail(this.state);
    }
  }
  watchSrcHandler(newSrc) {
    if (!this.state.audioElm.paused) {
      this.state.audioElm.pause();
    }
    this.state.audioElm.src = newSrc;
  }
  render() {
    console.log(this.layout);
    return (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.a, {
      key: 'd42a0d64839b4f167c8b3cd8569c4e3e6305ada7'
    }, (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '40653b8db674bdec38a18904f5e8a46e51459a04',
      class: "wrapper"
    }, (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'a0a1f79f80faceafcab81478e4a7524d2380b36b',
      part: "backdrop"
    }), (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'a6b641293c457aaa2c117b645ed92fe17c6dc38e',
      class: "main"
    }, (!this.layout || this.layout === 'flex') && (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot", {
      key: '924228ccf20072b3b9d0dd1cecb60669eaa59bfe'
    }), this.layout === 'default' && (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.F, {
      key: 'b442836d7f1e5e8f1091da5cbd2aaf798dd6fc77'
    }, (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-play-button", {
      key: '2c4eaf35853407309e13f1fb5017767787894463'
    }), (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-progress-bar", {
      key: '6b3ec14a5c576a8b1701d2e77af1235fea480bb3'
    }), (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-time-display", {
      key: '582bb90419e6f05cd214ea48011ebd2e74a1e29a'
    }), (0,_index_DqrFfVsn_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-mute-button", {
      key: 'e0babced41658adcf69fea04d61f1a153635d380'
    })))));
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
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-player_entry_js.js.map?ver=ccdd257f9a04a8364742