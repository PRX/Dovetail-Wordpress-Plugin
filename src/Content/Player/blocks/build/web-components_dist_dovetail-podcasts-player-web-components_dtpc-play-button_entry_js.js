"use strict";
(globalThis["webpackChunkdovetail_podcasts_player_blocks"] = globalThis["webpackChunkdovetail_podcasts_player_blocks"] || []).push([["web-components_dist_dovetail-podcasts-player-web-components_dtpc-play-button_entry_js"],{

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/dtpc-play-button.entry.js":
/*!************************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/dtpc-play-button.entry.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dtpc_play_button: () => (/* binding */ DtpcPlayButton)
/* harmony export */ });
/* harmony import */ var _index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index-ngapiRTG.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-ngapiRTG.js");
/* harmony import */ var _index_DTzhvg_p_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index-DTzhvg-p.js */ "../web-components/dist/dovetail-podcasts-player-web-components/index-DTzhvg-p.js");


const dtpcPlayButtonCss = ":host {\n  --dtpc-button--size: var(--dtpc-play-button--size, 2rem);\n  --dtpc-button--padding: var(--dtpc-play-button--padding, 0.5rem);\n  --dtpc-button--foreground: var(--dtpc-play-button--foreground);\n  --dtpc-button--foreground--hover: var(--dtpc-play-button--foreground--hover, Canvas);\n  --dtpc-button--foreground--active: var(--dtpc-play-button--foreground--playing);\n  --dtpc-button--surface: var(--dtpc-play-button--surface);\n  --dtpc-button--surface--hover: var(--dtpc-play-button--surface--hover, CanvasText);\n  --dtpc-button--surface--active: var(--dtpc-play-button--surface--playing);\n  --dtpc-button--surface-opacity: var(--dtpc-play-button--surface-opacity);\n  --dtpc-button--surface-opacity--hover: var(--dtpc-play-button--surface-opacity--hover, 100%);\n  --dtpc-button--surface-opacity--active: var(--dtpc-play-button--surface-opacity--playing, 0);\n  --dtpc-button--border-color: var(--dtpc-play-button--border-color, transparent);\n  --dtpc-button--border-color--hover: var(--dtpc-play-button--border-color--hover, transparent);\n  --dtpc-button--border-color--active: var(--dtpc-play-button--border-color--playing, CanvasText);\n  --dtpc-button--border-radius: var(--dtpc-play-button--border-radius);\n  --dtpc-button--border-radius--hover: var(--dtpc-play-button--border-radius--hover);\n  --dtpc-button--border-radius--active: var(--dtpc-play-button--border-radius--playing);\n  --dtpc-button--border-width: var(--dtpc-play-button--border-width, 0.125);\n  --dtpc-button--border-width--hover: var(--dtpc-play-button--border-width--hover, 0.125);\n  --dtpc-button--border-width--active: var(--dtpc-play-button--border-width--playing, 0.125);\n  --dtpc-button--focus-ring-color: var(--dtpc-play-button--focus-ring-color);\n  --dtpc-button--focus-ring-offset: var(--dtpc-play-button--focus-ring-offset);\n  --dtpc-button--focus-ring-width: var(--dtpc-play-button--focus-ring-width);\n}\n\n:host([data-status='playing']) {\n  --dtpc-button--foreground: var(--dtpc-button--foreground--active);\n  --dtpc-button--surface: var(--dtpc-button--surface--active);\n  --dtpc-button--surface-opacity: var(--dtpc-button--surface-opacity--active);\n  --dtpc-button--border-color: var(--dtpc-button--border-color--active);\n  --dtpc-button--border-width: var(--dtpc-button--border-width--active);\n  --dtpc-button--border-radius: var(--dtpc-button--border-radius--active);\n\n  &:hover {\n    --dtpc-button--surface-opacity: var(--dtpc-button--surface-opacity--hover);\n  }\n}\n";
const DtpcPlayButton = class {
  constructor(hostRef) {
    Object.defineProperty(this, "state", {
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
    Object.defineProperty(this, "togglePaused", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.r)(this, hostRef);
    this.initControl = (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "dtpc-control-init", 7);
    this.togglePaused = (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.a)(this, "audio-toggle-paused", 7);
  }
  componentWillLoad() {
    const self = this;
    this.initControl.emit(state => self.state = state);
  }
  handleClick() {
    this.togglePaused.emit();
  }
  render() {
    const {
      playing
    } = this.state;
    const label = playing ? (0,_index_DTzhvg_p_js__WEBPACK_IMPORTED_MODULE_1__._)('Pause', 'dovetail-podcasts') : (0,_index_DTzhvg_p_js__WEBPACK_IMPORTED_MODULE_1__._)('Play', 'dovetail-podcasts');
    const buttonAttributes = {
      type: 'button',
      title: label
    };
    return (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)(_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.d, {
      key: 'e2cab90940539931b2bd43e2705efabd5525afc2',
      "data-status": playing ? 'playing' : 'paused'
    }, (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("dtpc-button", {
      key: 'd65f82e16cabbfa0072830f7c175080ceb02cd51',
      ...buttonAttributes
    }, playing ? (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("icon-pause", null) : (0,_index_ngapiRTG_js__WEBPACK_IMPORTED_MODULE_0__.h)("icon-play", null)));
  }
};
DtpcPlayButton.style = dtpcPlayButtonCss;


/***/ }),

/***/ "../web-components/dist/dovetail-podcasts-player-web-components/index-DTzhvg-p.js":
/*!****************************************************************************************!*\
  !*** ../web-components/dist/dovetail-podcasts-player-web-components/index-DTzhvg-p.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ __)
/* harmony export */ });
function memize(fn, options) {
  var size = 0;
  var head;
  var tail;
  options = options || {};
  function memoized() {
    var node = head,
      len = arguments.length,
      args,
      i;
    searchCache: while (node) {
      if (node.args.length !== arguments.length) {
        node = node.next;
        continue;
      }
      for (i = 0; i < len; i++) {
        if (node.args[i] !== arguments[i]) {
          node = node.next;
          continue searchCache;
        }
      }
      if (node !== head) {
        if (node === tail) {
          tail = node.prev;
        }
        node.prev.next = node.next;
        if (node.next) {
          node.next.prev = node.prev;
        }
        node.next = head;
        node.prev = null;
        head.prev = node;
        head = node;
      }
      return node.val;
    }
    args = new Array(len);
    for (i = 0; i < len; i++) {
      args[i] = arguments[i];
    }
    node = {
      args: args,
      val: fn.apply(null, args)
    };
    if (head) {
      head.prev = node;
      node.next = head;
    } else {
      tail = node;
    }
    if (size === options.maxSize) {
      tail = tail.prev;
      tail.next = null;
    } else {
      size++;
    }
    head = node;
    return node.val;
  }
  memoized.clear = function () {
    head = null;
    tail = null;
    size = 0;
  };
  return memoized;
}
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}
function getDefaultExportFromNamespaceIfPresent(n) {
  return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
}
function getDefaultExportFromNamespaceIfNotNamed(n) {
  return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a() {
      if (this instanceof a) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {
    value: true
  });
  Object.keys(n).forEach(function (k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function () {
        return n[k];
      }
    });
  });
  return a;
}
var sprintf$1 = {};
var hasRequiredSprintf;
function requireSprintf() {
  if (hasRequiredSprintf) return sprintf$1;
  hasRequiredSprintf = 1;
  (function (exports) {
    !function () {
      'use strict';

      var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
      };
      function sprintf(key) {
        return sprintf_format(sprintf_parse(key), arguments);
      }
      function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []));
      }
      function sprintf_format(parse_tree, argv) {
        var cursor = 1,
          tree_length = parse_tree.length,
          arg,
          output = '',
          i,
          k,
          ph,
          pad,
          pad_character,
          pad_length,
          is_positive,
          sign;
        for (i = 0; i < tree_length; i++) {
          if (typeof parse_tree[i] === 'string') {
            output += parse_tree[i];
          } else if (typeof parse_tree[i] === 'object') {
            ph = parse_tree[i];
            if (ph.keys) {
              arg = argv[cursor];
              for (k = 0; k < ph.keys.length; k++) {
                if (arg == undefined) {
                  throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]));
                }
                arg = arg[ph.keys[k]];
              }
            } else if (ph.param_no) {
              arg = argv[ph.param_no];
            } else {
              arg = argv[cursor++];
            }
            if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
              arg = arg();
            }
            if (re.numeric_arg.test(ph.type) && typeof arg !== 'number' && isNaN(arg)) {
              throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg));
            }
            if (re.number.test(ph.type)) {
              is_positive = arg >= 0;
            }
            switch (ph.type) {
              case 'b':
                arg = parseInt(arg, 10).toString(2);
                break;
              case 'c':
                arg = String.fromCharCode(parseInt(arg, 10));
                break;
              case 'd':
              case 'i':
                arg = parseInt(arg, 10);
                break;
              case 'j':
                arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
                break;
              case 'e':
                arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
                break;
              case 'f':
                arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
                break;
              case 'g':
                arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
                break;
              case 'o':
                arg = (parseInt(arg, 10) >>> 0).toString(8);
                break;
              case 's':
                arg = String(arg);
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case 't':
                arg = String(!!arg);
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case 'T':
                arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case 'u':
                arg = parseInt(arg, 10) >>> 0;
                break;
              case 'v':
                arg = arg.valueOf();
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case 'x':
                arg = (parseInt(arg, 10) >>> 0).toString(16);
                break;
              case 'X':
                arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
                break;
            }
            if (re.json.test(ph.type)) {
              output += arg;
            } else {
              if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                sign = is_positive ? '+' : '-';
                arg = arg.toString().replace(re.sign, '');
              } else {
                sign = '';
              }
              pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' ';
              pad_length = ph.width - (sign + arg).length;
              pad = ph.width ? pad_length > 0 ? pad_character.repeat(pad_length) : '' : '';
              output += ph.align ? sign + arg + pad : pad_character === '0' ? sign + pad + arg : pad + sign + arg;
            }
          }
        }
        return output;
      }
      var sprintf_cache = Object.create(null);
      function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
          return sprintf_cache[fmt];
        }
        var _fmt = fmt,
          match,
          parse_tree = [],
          arg_names = 0;
        while (_fmt) {
          if ((match = re.text.exec(_fmt)) !== null) {
            parse_tree.push(match[0]);
          } else if ((match = re.modulo.exec(_fmt)) !== null) {
            parse_tree.push('%');
          } else if ((match = re.placeholder.exec(_fmt)) !== null) {
            if (match[2]) {
              arg_names |= 1;
              var field_list = [],
                replacement_field = match[2],
                field_match = [];
              if ((field_match = re.key.exec(replacement_field)) !== null) {
                field_list.push(field_match[1]);
                while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                  if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  } else {
                    throw new SyntaxError('[sprintf] failed to parse named argument key');
                  }
                }
              } else {
                throw new SyntaxError('[sprintf] failed to parse named argument key');
              }
              match[2] = field_list;
            } else {
              arg_names |= 2;
            }
            if (arg_names === 3) {
              throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported');
            }
            parse_tree.push({
              placeholder: match[0],
              param_no: match[1],
              keys: match[2],
              sign: match[3],
              pad_char: match[4],
              align: match[5],
              width: match[6],
              precision: match[7],
              type: match[8]
            });
          } else {
            throw new SyntaxError('[sprintf] unexpected placeholder');
          }
          _fmt = _fmt.substring(match[0].length);
        }
        return sprintf_cache[fmt] = parse_tree;
      }
      if (true) {
        exports['sprintf'] = sprintf;
        exports['vsprintf'] = vsprintf;
      }
      if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf;
        window['vsprintf'] = vsprintf;
        if (false) {}
      }
    }();
  })(sprintf$1);
  return sprintf$1;
}
var sprintfExports = requireSprintf();
var sprintfjs = getDefaultExportFromCjs(sprintfExports);
const logErrorOnce = memize(console.error);
function sprintf(format, ...args) {
  try {
    return sprintfjs.sprintf(format, ...args);
  } catch (error) {
    if (error instanceof Error) {
      logErrorOnce('sprintf error: \n\n' + error.toString());
    }
    return format;
  }
}
var PRECEDENCE, OPENERS, TERMINATORS, PATTERN;
PRECEDENCE = {
  '(': 9,
  '!': 8,
  '*': 7,
  '/': 7,
  '%': 7,
  '+': 6,
  '-': 6,
  '<': 5,
  '<=': 5,
  '>': 5,
  '>=': 5,
  '==': 4,
  '!=': 4,
  '&&': 3,
  '||': 2,
  '?': 1,
  '?:': 1
};
OPENERS = ['(', '?'];
TERMINATORS = {
  ')': ['('],
  ':': ['?', '?:']
};
PATTERN = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;
function postfix(expression) {
  var terms = [],
    stack = [],
    match,
    operator,
    term,
    element;
  while (match = expression.match(PATTERN)) {
    operator = match[0];
    term = expression.substr(0, match.index).trim();
    if (term) {
      terms.push(term);
    }
    while (element = stack.pop()) {
      if (TERMINATORS[operator]) {
        if (TERMINATORS[operator][0] === element) {
          operator = TERMINATORS[operator][1] || operator;
          break;
        }
      } else if (OPENERS.indexOf(element) >= 0 || PRECEDENCE[element] < PRECEDENCE[operator]) {
        stack.push(element);
        break;
      }
      terms.push(element);
    }
    if (!TERMINATORS[operator]) {
      stack.push(operator);
    }
    expression = expression.substr(match.index + operator.length);
  }
  expression = expression.trim();
  if (expression) {
    terms.push(expression);
  }
  return terms.concat(stack.reverse());
}
var OPERATORS = {
  '!': function (a) {
    return !a;
  },
  '*': function (a, b) {
    return a * b;
  },
  '/': function (a, b) {
    return a / b;
  },
  '%': function (a, b) {
    return a % b;
  },
  '+': function (a, b) {
    return a + b;
  },
  '-': function (a, b) {
    return a - b;
  },
  '<': function (a, b) {
    return a < b;
  },
  '<=': function (a, b) {
    return a <= b;
  },
  '>': function (a, b) {
    return a > b;
  },
  '>=': function (a, b) {
    return a >= b;
  },
  '==': function (a, b) {
    return a === b;
  },
  '!=': function (a, b) {
    return a !== b;
  },
  '&&': function (a, b) {
    return a && b;
  },
  '||': function (a, b) {
    return a || b;
  },
  '?:': function (a, b, c) {
    if (a) {
      throw b;
    }
    return c;
  }
};
function evaluate(postfix, variables) {
  var stack = [],
    i,
    j,
    args,
    getOperatorResult,
    term,
    value;
  for (i = 0; i < postfix.length; i++) {
    term = postfix[i];
    getOperatorResult = OPERATORS[term];
    if (getOperatorResult) {
      j = getOperatorResult.length;
      args = Array(j);
      while (j--) {
        args[j] = stack.pop();
      }
      try {
        value = getOperatorResult.apply(null, args);
      } catch (earlyReturn) {
        return earlyReturn;
      }
    } else if (variables.hasOwnProperty(term)) {
      value = variables[term];
    } else {
      value = +term;
    }
    stack.push(value);
  }
  return stack[0];
}
function compile(expression) {
  var terms = postfix(expression);
  return function (variables) {
    return evaluate(terms, variables);
  };
}
function pluralForms(expression) {
  var evaluate = compile(expression);
  return function (n) {
    return +evaluate({
      n: n
    });
  };
}
var DEFAULT_OPTIONS = {
  contextDelimiter: '\u0004',
  onMissingKey: null
};
function getPluralExpression(pf) {
  var parts, i, part;
  parts = pf.split(';');
  for (i = 0; i < parts.length; i++) {
    part = parts[i].trim();
    if (part.indexOf('plural=') === 0) {
      return part.substr(7);
    }
  }
}
function Tannin(data, options) {
  var key;
  this.data = data;
  this.pluralForms = {};
  this.options = {};
  for (key in DEFAULT_OPTIONS) {
    this.options[key] = options !== undefined && key in options ? options[key] : DEFAULT_OPTIONS[key];
  }
}
Tannin.prototype.getPluralForm = function (domain, n) {
  var getPluralForm = this.pluralForms[domain],
    config,
    plural,
    pf;
  if (!getPluralForm) {
    config = this.data[domain][''];
    pf = config['Plural-Forms'] || config['plural-forms'] || config.plural_forms;
    if (typeof pf !== 'function') {
      plural = getPluralExpression(config['Plural-Forms'] || config['plural-forms'] || config.plural_forms);
      pf = pluralForms(plural);
    }
    getPluralForm = this.pluralForms[domain] = pf;
  }
  return getPluralForm(n);
};
Tannin.prototype.dcnpgettext = function (domain, context, singular, plural, n) {
  var index, key, entry;
  if (n === undefined) {
    index = 0;
  } else {
    index = this.getPluralForm(domain, n);
  }
  key = singular;
  if (context) {
    key = context + this.options.contextDelimiter + singular;
  }
  entry = this.data[domain][key];
  if (entry && entry[index]) {
    return entry[index];
  }
  if (this.options.onMissingKey) {
    this.options.onMissingKey(singular, domain);
  }
  return index === 0 ? singular : plural;
};
const DEFAULT_LOCALE_DATA = {
  '': {
    plural_forms(n) {
      return n === 1 ? 0 : 1;
    }
  }
};
const I18N_HOOK_REGEXP = /^i18n\.(n?gettext|has_translation)(_|$)/;
const createI18n = (initialData, initialDomain, hooks) => {
  const tannin = new Tannin({});
  const listeners = new Set();
  const notifyListeners = () => {
    listeners.forEach(listener => listener());
  };
  const subscribe = callback => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  };
  const getLocaleData = (domain = 'default') => tannin.data[domain];
  const doSetLocaleData = (data, domain = 'default') => {
    tannin.data[domain] = {
      ...tannin.data[domain],
      ...data
    };
    tannin.data[domain][''] = {
      ...DEFAULT_LOCALE_DATA[''],
      ...tannin.data[domain]?.['']
    };
    delete tannin.pluralForms[domain];
  };
  const setLocaleData = (data, domain) => {
    doSetLocaleData(data, domain);
    notifyListeners();
  };
  const addLocaleData = (data, domain = 'default') => {
    tannin.data[domain] = {
      ...tannin.data[domain],
      ...data,
      '': {
        ...DEFAULT_LOCALE_DATA[''],
        ...tannin.data[domain]?.[''],
        ...data?.['']
      }
    };
    delete tannin.pluralForms[domain];
    notifyListeners();
  };
  const resetLocaleData = (data, domain) => {
    tannin.data = {};
    tannin.pluralForms = {};
    setLocaleData(data, domain);
  };
  const dcnpgettext = (domain = 'default', context, single, plural, number) => {
    if (!tannin.data[domain]) {
      doSetLocaleData(undefined, domain);
    }
    return tannin.dcnpgettext(domain, context, single, plural, number);
  };
  const getFilterDomain = (domain = 'default') => domain;
  const __ = (text, domain) => {
    let translation = dcnpgettext(domain, undefined, text);
    if (!hooks) {
      return translation;
    }
    translation = hooks.applyFilters('i18n.gettext', translation, text, domain);
    return hooks.applyFilters('i18n.gettext_' + getFilterDomain(domain), translation, text, domain);
  };
  const _x = (text, context, domain) => {
    let translation = dcnpgettext(domain, context, text);
    if (!hooks) {
      return translation;
    }
    translation = hooks.applyFilters('i18n.gettext_with_context', translation, text, context, domain);
    return hooks.applyFilters('i18n.gettext_with_context_' + getFilterDomain(domain), translation, text, context, domain);
  };
  const _n = (single, plural, number, domain) => {
    let translation = dcnpgettext(domain, undefined, single, plural, number);
    if (!hooks) {
      return translation;
    }
    translation = hooks.applyFilters('i18n.ngettext', translation, single, plural, number, domain);
    return hooks.applyFilters('i18n.ngettext_' + getFilterDomain(domain), translation, single, plural, number, domain);
  };
  const _nx = (single, plural, number, context, domain) => {
    let translation = dcnpgettext(domain, context, single, plural, number);
    if (!hooks) {
      return translation;
    }
    translation = hooks.applyFilters('i18n.ngettext_with_context', translation, single, plural, number, context, domain);
    return hooks.applyFilters('i18n.ngettext_with_context_' + getFilterDomain(domain), translation, single, plural, number, context, domain);
  };
  const isRTL = () => {
    return 'rtl' === _x('ltr', 'text direction');
  };
  const hasTranslation = (single, context, domain) => {
    const key = context ? context + '\u0004' + single : single;
    let result = !!tannin.data?.[domain !== null && domain !== void 0 ? domain : 'default']?.[key];
    if (hooks) {
      result = hooks.applyFilters('i18n.has_translation', result, single, context, domain);
      result = hooks.applyFilters('i18n.has_translation_' + getFilterDomain(domain), result, single, context, domain);
    }
    return result;
  };
  if (initialData) {
    setLocaleData(initialData, initialDomain);
  }
  if (hooks) {
    const onHookAddedOrRemoved = hookName => {
      if (I18N_HOOK_REGEXP.test(hookName)) {
        notifyListeners();
      }
    };
    hooks.addAction('hookAdded', 'core/i18n', onHookAddedOrRemoved);
    hooks.addAction('hookRemoved', 'core/i18n', onHookAddedOrRemoved);
  }
  return {
    getLocaleData,
    setLocaleData,
    addLocaleData,
    resetLocaleData,
    subscribe,
    __,
    _x,
    _n,
    _nx,
    isRTL,
    hasTranslation
  };
};
function validateNamespace(namespace) {
  if ('string' !== typeof namespace || '' === namespace) {
    console.error('The namespace must be a non-empty string.');
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.\-\/]*$/.test(namespace)) {
    console.error('The namespace can only contain numbers, letters, dashes, periods, underscores and slashes.');
    return false;
  }
  return true;
}
function validateHookName(hookName) {
  if ('string' !== typeof hookName || '' === hookName) {
    console.error('The hook name must be a non-empty string.');
    return false;
  }
  if (/^__/.test(hookName)) {
    console.error('The hook name cannot begin with `__`.');
    return false;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9_.-]*$/.test(hookName)) {
    console.error('The hook name can only contain numbers, letters, dashes, periods and underscores.');
    return false;
  }
  return true;
}
function createAddHook(hooks, storeKey) {
  return function addHook(hookName, namespace, callback, priority = 10) {
    const hooksStore = hooks[storeKey];
    if (!validateHookName(hookName)) {
      return;
    }
    if (!validateNamespace(namespace)) {
      return;
    }
    if ('function' !== typeof callback) {
      console.error('The hook callback must be a function.');
      return;
    }
    if ('number' !== typeof priority) {
      console.error('If specified, the hook priority must be a number.');
      return;
    }
    const handler = {
      callback,
      priority,
      namespace
    };
    if (hooksStore[hookName]) {
      const handlers = hooksStore[hookName].handlers;
      let i;
      for (i = handlers.length; i > 0; i--) {
        if (priority >= handlers[i - 1].priority) {
          break;
        }
      }
      if (i === handlers.length) {
        handlers[i] = handler;
      } else {
        handlers.splice(i, 0, handler);
      }
      hooksStore.__current.forEach(hookInfo => {
        if (hookInfo.name === hookName && hookInfo.currentIndex >= i) {
          hookInfo.currentIndex++;
        }
      });
    } else {
      hooksStore[hookName] = {
        handlers: [handler],
        runs: 0
      };
    }
    if (hookName !== 'hookAdded') {
      hooks.doAction('hookAdded', hookName, namespace, callback, priority);
    }
  };
}
function createRemoveHook(hooks, storeKey, removeAll = false) {
  return function removeHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];
    if (!validateHookName(hookName)) {
      return;
    }
    if (!removeAll && !validateNamespace(namespace)) {
      return;
    }
    if (!hooksStore[hookName]) {
      return 0;
    }
    let handlersRemoved = 0;
    if (removeAll) {
      handlersRemoved = hooksStore[hookName].handlers.length;
      hooksStore[hookName] = {
        runs: hooksStore[hookName].runs,
        handlers: []
      };
    } else {
      const handlers = hooksStore[hookName].handlers;
      for (let i = handlers.length - 1; i >= 0; i--) {
        if (handlers[i].namespace === namespace) {
          handlers.splice(i, 1);
          handlersRemoved++;
          hooksStore.__current.forEach(hookInfo => {
            if (hookInfo.name === hookName && hookInfo.currentIndex >= i) {
              hookInfo.currentIndex--;
            }
          });
        }
      }
    }
    if (hookName !== 'hookRemoved') {
      hooks.doAction('hookRemoved', hookName, namespace);
    }
    return handlersRemoved;
  };
}
function createHasHook(hooks, storeKey) {
  return function hasHook(hookName, namespace) {
    const hooksStore = hooks[storeKey];
    if ('undefined' !== typeof namespace) {
      return hookName in hooksStore && hooksStore[hookName].handlers.some(hook => hook.namespace === namespace);
    }
    return hookName in hooksStore;
  };
}
function createRunHook(hooks, storeKey, returnFirstArg, async) {
  return function runHook(hookName, ...args) {
    const hooksStore = hooks[storeKey];
    if (!hooksStore[hookName]) {
      hooksStore[hookName] = {
        handlers: [],
        runs: 0
      };
    }
    hooksStore[hookName].runs++;
    const handlers = hooksStore[hookName].handlers;
    if (true) {
      if ('hookAdded' !== hookName && hooksStore.all) {
        handlers.push(...hooksStore.all.handlers);
      }
    }
    if (!handlers || !handlers.length) {
      return returnFirstArg ? args[0] : undefined;
    }
    const hookInfo = {
      name: hookName,
      currentIndex: 0
    };
    async function asyncRunner() {
      try {
        hooksStore.__current.add(hookInfo);
        let result = returnFirstArg ? args[0] : undefined;
        while (hookInfo.currentIndex < handlers.length) {
          const handler = handlers[hookInfo.currentIndex];
          result = await handler.callback.apply(null, args);
          if (returnFirstArg) {
            args[0] = result;
          }
          hookInfo.currentIndex++;
        }
        return returnFirstArg ? result : undefined;
      } finally {
        hooksStore.__current.delete(hookInfo);
      }
    }
    function syncRunner() {
      try {
        hooksStore.__current.add(hookInfo);
        let result = returnFirstArg ? args[0] : undefined;
        while (hookInfo.currentIndex < handlers.length) {
          const handler = handlers[hookInfo.currentIndex];
          result = handler.callback.apply(null, args);
          if (returnFirstArg) {
            args[0] = result;
          }
          hookInfo.currentIndex++;
        }
        return returnFirstArg ? result : undefined;
      } finally {
        hooksStore.__current.delete(hookInfo);
      }
    }
    return (async ? asyncRunner : syncRunner)();
  };
}
function createCurrentHook(hooks, storeKey) {
  return function currentHook() {
    var _currentArray$at$name;
    const hooksStore = hooks[storeKey];
    const currentArray = Array.from(hooksStore.__current);
    return (_currentArray$at$name = currentArray.at(-1)?.name) !== null && _currentArray$at$name !== void 0 ? _currentArray$at$name : null;
  };
}
function createDoingHook(hooks, storeKey) {
  return function doingHook(hookName) {
    const hooksStore = hooks[storeKey];
    if ('undefined' === typeof hookName) {
      return hooksStore.__current.size > 0;
    }
    return Array.from(hooksStore.__current).some(hook => hook.name === hookName);
  };
}
function createDidHook(hooks, storeKey) {
  return function didHook(hookName) {
    const hooksStore = hooks[storeKey];
    if (!validateHookName(hookName)) {
      return;
    }
    return hooksStore[hookName] && hooksStore[hookName].runs ? hooksStore[hookName].runs : 0;
  };
}
class _Hooks {
  constructor() {
    this.actions = Object.create(null);
    this.actions.__current = new Set();
    this.filters = Object.create(null);
    this.filters.__current = new Set();
    this.addAction = createAddHook(this, 'actions');
    this.addFilter = createAddHook(this, 'filters');
    this.removeAction = createRemoveHook(this, 'actions');
    this.removeFilter = createRemoveHook(this, 'filters');
    this.hasAction = createHasHook(this, 'actions');
    this.hasFilter = createHasHook(this, 'filters');
    this.removeAllActions = createRemoveHook(this, 'actions', true);
    this.removeAllFilters = createRemoveHook(this, 'filters', true);
    this.doAction = createRunHook(this, 'actions', false, false);
    this.doActionAsync = createRunHook(this, 'actions', false, true);
    this.applyFilters = createRunHook(this, 'filters', true, false);
    this.applyFiltersAsync = createRunHook(this, 'filters', true, true);
    this.currentAction = createCurrentHook(this, 'actions');
    this.currentFilter = createCurrentHook(this, 'filters');
    this.doingAction = createDoingHook(this, 'actions');
    this.doingFilter = createDoingHook(this, 'filters');
    this.didAction = createDidHook(this, 'actions');
    this.didFilter = createDidHook(this, 'filters');
  }
}
function createHooks() {
  return new _Hooks();
}
const defaultHooks = createHooks();
const {
  addAction,
  addFilter,
  removeAction,
  removeFilter,
  hasAction,
  hasFilter,
  removeAllActions,
  removeAllFilters,
  doAction,
  doActionAsync,
  applyFilters,
  applyFiltersAsync,
  currentAction,
  currentFilter,
  doingAction,
  doingFilter,
  didAction,
  didFilter,
  actions,
  filters
} = defaultHooks;
const i18n = createI18n(undefined, undefined, defaultHooks);
const getLocaleData = i18n.getLocaleData.bind(i18n);
const setLocaleData = i18n.setLocaleData.bind(i18n);
const resetLocaleData = i18n.resetLocaleData.bind(i18n);
const subscribe = i18n.subscribe.bind(i18n);
const __ = i18n.__.bind(i18n);
const _x = i18n._x.bind(i18n);
const _n = i18n._n.bind(i18n);
const _nx = i18n._nx.bind(i18n);
const isRTL = i18n.isRTL.bind(i18n);
const hasTranslation = i18n.hasTranslation.bind(i18n);


/***/ })

}]);
//# sourceMappingURL=web-components_dist_dovetail-podcasts-player-web-components_dtpc-play-button_entry_js.js.map?ver=61bce122ac6fe61bfdb2