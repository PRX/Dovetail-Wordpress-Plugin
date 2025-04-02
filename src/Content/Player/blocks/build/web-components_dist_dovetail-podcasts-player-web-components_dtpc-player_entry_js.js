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
/* harmony import */ var _index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-C336hbsD.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-C336hbsD.js");

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
  if (typeof _index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.e !== 'function') {
    return {};
  }
  const elmsToUpdate = new Map();
  return {
    dispose: () => elmsToUpdate.clear(),
    get: propName => {
      const elm = (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.e)();
      if (elm) {
        appendToMap(elmsToUpdate, propName, elm);
      }
    },
    set: propName => {
      const elements = elmsToUpdate.get(propName);
      if (elements) {
        elmsToUpdate.set(propName, elements.filter(_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.f));
      }
      cleanupElements(elmsToUpdate);
    },
    reset: () => {
      elmsToUpdate.forEach(elms => elms.forEach(_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.f));
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
    const newStore = createStore({
      audioElm,
      playing: false,
      seekTime: null
    });
    this.stores.push(newStore);
    return newStore;
  }
}
const factory = new playerStateFactory();
const dtpcPlayerCss = ":host {\n  --_dtpc-player--foreground: var(--dtpc-player--primary-base, currentColor);\n  --_dtpc-player--highlight: var(--dtpc-player--highlight, hsl(201, 64%, 67%));\n  --_dtpc-player--surface: var(--dtpc-player--surface, white);\n  --_dtpc-player--surface-opacity: var(--dtpc-player--bg-opacity, 0);\n  --_dtpc-player--surface-blur: var(--dtpc-player--bg-blur, 0);\n  --_dtpc-player--padding: var(--dtpc-player--padding, 0);\n  --_dtpc-player--padding-inline: var(--dtpc-player--padding-inline, var(--_dtpc-player--padding));\n  --_dtpc-player--padding-block: var(--dtpc-player--padding-block, var(--_dtpc-player--padding));\n  --_dtpc-player--spacing: var(--dtpc-player--spacing, 0.5rem);\n  --_dtpc-player--time--color: var(--dtpc-player--time--font-size, var(--_dtpc-player--foreground));\n  --_dtpc-player--time--font-size: var(--dtpc-player--time--font-size, 0.875rem);\n  --_dtpc-player--time--font-family: var(--dtpc-player--time--font-family, ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace);\n  --_dtpc-player--time--font-weight: var(--dtpc-player--time--font-weight, inherit);\n}\n\n.wrapper {\n  display: grid;\n\n  & > * {\n    grid-column: 1 / -1;\n    grid-row: 1 / -1;\n  }\n}\n\n.main {\n  --_spacing: var(--_dtpc-player--spacing);\n  --_padding-inline: var(--_dtpc-player--padding-inline);\n  --_padding-block: var(--_dtpc-player--padding-block);\n\n  display: flex;\n  align-items: center;\n  gap: var(--_spacing);\n\n  padding-inline: var(--_padding-inline);\n  padding-block: var(--_padding-block);\n}\n";
const DtpcPlayer = class {
  constructor(hostRef) {
    Object.defineProperty(this, "state", {
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
    (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
  }
  connectedCallback() {
    this.state = factory.createStore(this.src).state;
  }
  disconnectedCallback() {
    this.state.audioElm.pause();
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
    return (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: '6369937f3894435ba917d222a554f27c9069ddcd'
    }, (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'ae7e03096cd6c66be76cfbe223079d956866d0cc',
      class: "wrapper"
    }, (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: 'd32df788658bd2d73d315134d53cf56418408573',
      part: "backdrop"
    }), (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("div", {
      key: '7a1c4b25cb5e749f44a462c01a29486b02e116f6',
      class: "main"
    }, (0,_index_C336hbsD_js__WEBPACK_IMPORTED_MODULE_0__.h)("slot", {
      key: '0f279a3986f316cfd43f818c60fc08f8ef30a609'
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
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-player_entry_js.js.map?ver=4456beff62cf5379efff