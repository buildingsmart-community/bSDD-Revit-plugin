var xf = Object.defineProperty;
var Sf = (e, t, n) => t in e ? xf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Te = (e, t, n) => (Sf(e, typeof t != "symbol" ? t + "" : t, n), n);
import * as I from "react";
import v, { createContext as qt, useContext as ct, useState as z, useRef as V, useEffect as W, useMemo as dr, useCallback as ee, useLayoutEffect as Lr, useId as Ul, forwardRef as oe, cloneElement as Kt, Children as Cf, createElement as fa } from "react";
import * as Ef from "react-dom";
import ql, { flushSync as Cs, createPortal as Pf, unstable_batchedUpdates as Df } from "react-dom";
function Kl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Yl = { exports: {} }, Mr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var If = v, Rf = Symbol.for("react.element"), Af = Symbol.for("react.fragment"), Of = Object.prototype.hasOwnProperty, Nf = If.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, $f = { key: !0, ref: !0, __self: !0, __source: !0 };
function Xl(e, t, n) {
  var r, o = {}, s = null, i = null;
  n !== void 0 && (s = "" + n), t.key !== void 0 && (s = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t)
    Of.call(t, r) && !$f.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      o[r] === void 0 && (o[r] = t[r]);
  return { $$typeof: Rf, type: e, key: s, ref: i, props: o, _owner: Nf.current };
}
Mr.Fragment = Af;
Mr.jsx = Xl;
Mr.jsxs = Xl;
Yl.exports = Mr;
var _ = Yl.exports, os = {}, pa = ql;
os.createRoot = pa.createRoot, os.hydrateRoot = pa.hydrateRoot;
const Tf = {
  type: "logger",
  log(e) {
    this.output("log", e);
  },
  warn(e) {
    this.output("warn", e);
  },
  error(e) {
    this.output("error", e);
  },
  output(e, t) {
    console && console[e] && console[e].apply(console, t);
  }
};
class fr {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(t, n);
  }
  init(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = n.prefix || "i18next:", this.logger = t || Tf, this.options = n, this.debug = n.debug;
  }
  log() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "log", "", !0);
  }
  warn() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "warn", "", !0);
  }
  error() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "error", "");
  }
  deprecate() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(t, n, r, o) {
    return o && !this.debug ? null : (typeof t[0] == "string" && (t[0] = `${r}${this.prefix} ${t[0]}`), this.logger[n](t));
  }
  create(t) {
    return new fr(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new fr(this.logger, t);
  }
}
var ot = new fr();
class Fr {
  constructor() {
    this.observers = {};
  }
  on(t, n) {
    return t.split(" ").forEach((r) => {
      this.observers[r] = this.observers[r] || [], this.observers[r].push(n);
    }), this;
  }
  off(t, n) {
    if (this.observers[t]) {
      if (!n) {
        delete this.observers[t];
        return;
      }
      this.observers[t] = this.observers[t].filter((r) => r !== n);
    }
  }
  emit(t) {
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
      r[o - 1] = arguments[o];
    this.observers[t] && [].concat(this.observers[t]).forEach((i) => {
      i(...r);
    }), this.observers["*"] && [].concat(this.observers["*"]).forEach((i) => {
      i.apply(i, [t, ...r]);
    });
  }
}
function vn() {
  let e, t;
  const n = new Promise((r, o) => {
    e = r, t = o;
  });
  return n.resolve = e, n.reject = t, n;
}
function ma(e) {
  return e == null ? "" : "" + e;
}
function Lf(e, t, n) {
  e.forEach((r) => {
    t[r] && (n[r] = t[r]);
  });
}
function Es(e, t, n) {
  function r(i) {
    return i && i.indexOf("###") > -1 ? i.replace(/###/g, ".") : i;
  }
  function o() {
    return !e || typeof e == "string";
  }
  const s = typeof t != "string" ? [].concat(t) : t.split(".");
  for (; s.length > 1; ) {
    if (o())
      return {};
    const i = r(s.shift());
    !e[i] && n && (e[i] = new n()), Object.prototype.hasOwnProperty.call(e, i) ? e = e[i] : e = {};
  }
  return o() ? {} : {
    obj: e,
    k: r(s.shift())
  };
}
function ga(e, t, n) {
  const {
    obj: r,
    k: o
  } = Es(e, t, Object);
  r[o] = n;
}
function Mf(e, t, n, r) {
  const {
    obj: o,
    k: s
  } = Es(e, t, Object);
  o[s] = o[s] || [], r && (o[s] = o[s].concat(n)), r || o[s].push(n);
}
function pr(e, t) {
  const {
    obj: n,
    k: r
  } = Es(e, t);
  if (n)
    return n[r];
}
function Ff(e, t, n) {
  const r = pr(e, n);
  return r !== void 0 ? r : pr(t, n);
}
function Jl(e, t, n) {
  for (const r in t)
    r !== "__proto__" && r !== "constructor" && (r in e ? typeof e[r] == "string" || e[r] instanceof String || typeof t[r] == "string" || t[r] instanceof String ? n && (e[r] = t[r]) : Jl(e[r], t[r], n) : e[r] = t[r]);
  return e;
}
function Jt(e) {
  return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var kf = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function Bf(e) {
  return typeof e == "string" ? e.replace(/[&<>"'\/]/g, (t) => kf[t]) : e;
}
const _f = [" ", ",", "?", "!", ";"];
function jf(e, t, n) {
  t = t || "", n = n || "";
  const r = _f.filter((i) => t.indexOf(i) < 0 && n.indexOf(i) < 0);
  if (r.length === 0)
    return !0;
  const o = new RegExp(`(${r.map((i) => i === "?" ? "\\?" : i).join("|")})`);
  let s = !o.test(e);
  if (!s) {
    const i = e.indexOf(n);
    i > 0 && !o.test(e.substring(0, i)) && (s = !0);
  }
  return s;
}
function mr(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!e)
    return;
  if (e[t])
    return e[t];
  const r = t.split(n);
  let o = e;
  for (let s = 0; s < r.length; ++s) {
    if (!o || typeof o[r[s]] == "string" && s + 1 < r.length)
      return;
    if (o[r[s]] === void 0) {
      let i = 2, a = r.slice(s, s + i).join(n), l = o[a];
      for (; l === void 0 && r.length > s + i; )
        i++, a = r.slice(s, s + i).join(n), l = o[a];
      if (l === void 0)
        return;
      if (l === null)
        return null;
      if (t.endsWith(a)) {
        if (typeof l == "string")
          return l;
        if (a && typeof l[a] == "string")
          return l[a];
      }
      const c = r.slice(s + i).join(n);
      return c ? mr(l, c, n) : void 0;
    }
    o = o[r[s]];
  }
  return o;
}
function gr(e) {
  return e && e.indexOf("_") > 0 ? e.replace("_", "-") : e;
}
class ha extends Fr {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super(), this.data = t || {}, this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(t) {
    this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
  }
  removeNamespaces(t) {
    const n = this.options.ns.indexOf(t);
    n > -1 && this.options.ns.splice(n, 1);
  }
  getResource(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const s = o.keySeparator !== void 0 ? o.keySeparator : this.options.keySeparator, i = o.ignoreJSONStructure !== void 0 ? o.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let a = [t, n];
    r && typeof r != "string" && (a = a.concat(r)), r && typeof r == "string" && (a = a.concat(s ? r.split(s) : r)), t.indexOf(".") > -1 && (a = t.split("."));
    const l = pr(this.data, a);
    return l || !i || typeof r != "string" ? l : mr(this.data && this.data[t] && this.data[t][n], r, s);
  }
  addResource(t, n, r, o) {
    let s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const i = s.keySeparator !== void 0 ? s.keySeparator : this.options.keySeparator;
    let a = [t, n];
    r && (a = a.concat(i ? r.split(i) : r)), t.indexOf(".") > -1 && (a = t.split("."), o = n, n = a[1]), this.addNamespaces(n), ga(this.data, a, o), s.silent || this.emit("added", t, n, r, o);
  }
  addResources(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const s in r)
      (typeof r[s] == "string" || Object.prototype.toString.apply(r[s]) === "[object Array]") && this.addResource(t, n, s, r[s], {
        silent: !0
      });
    o.silent || this.emit("added", t, n, r);
  }
  addResourceBundle(t, n, r, o, s) {
    let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, a = [t, n];
    t.indexOf(".") > -1 && (a = t.split("."), o = r, r = n, n = a[1]), this.addNamespaces(n);
    let l = pr(this.data, a) || {};
    o ? Jl(l, r, s) : l = {
      ...l,
      ...r
    }, ga(this.data, a, l), i.silent || this.emit("added", t, n, r);
  }
  removeResourceBundle(t, n) {
    this.hasResourceBundle(t, n) && delete this.data[t][n], this.removeNamespaces(n), this.emit("removed", t, n);
  }
  hasResourceBundle(t, n) {
    return this.getResource(t, n) !== void 0;
  }
  getResourceBundle(t, n) {
    return n || (n = this.options.defaultNS), this.options.compatibilityAPI === "v1" ? {
      ...this.getResource(t, n)
    } : this.getResource(t, n);
  }
  getDataByLanguage(t) {
    return this.data[t];
  }
  hasLanguageSomeTranslations(t) {
    const n = this.getDataByLanguage(t);
    return !!(n && Object.keys(n) || []).find((o) => n[o] && Object.keys(n[o]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var Ql = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, t, n, r, o) {
    return e.forEach((s) => {
      this.processors[s] && (t = this.processors[s].process(t, n, r, o));
    }), t;
  }
};
const ba = {};
class hr extends Fr {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Lf(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = ot.create("translator");
  }
  changeLanguage(t) {
    t && (this.language = t);
  }
  exists(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    if (t == null)
      return !1;
    const r = this.resolve(t, n);
    return r && r.res !== void 0;
  }
  extractFromKey(t, n) {
    let r = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const o = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let s = n.ns || this.options.defaultNS || [];
    const i = r && t.indexOf(r) > -1, a = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !jf(t, r, o);
    if (i && !a) {
      const l = t.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0)
        return {
          key: t,
          namespaces: s
        };
      const c = t.split(r);
      (r !== o || r === o && this.options.ns.indexOf(c[0]) > -1) && (s = c.shift()), t = c.join(o);
    }
    return typeof s == "string" && (s = [s]), {
      key: t,
      namespaces: s
    };
  }
  translate(t, n, r) {
    if (typeof n != "object" && this.options.overloadTranslationOptionHandler && (n = this.options.overloadTranslationOptionHandler(arguments)), typeof n == "object" && (n = {
      ...n
    }), n || (n = {}), t == null)
      return "";
    Array.isArray(t) || (t = [String(t)]);
    const o = n.returnDetails !== void 0 ? n.returnDetails : this.options.returnDetails, s = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator, {
      key: i,
      namespaces: a
    } = this.extractFromKey(t[t.length - 1], n), l = a[a.length - 1], c = n.lng || this.language, f = n.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (c && c.toLowerCase() === "cimode") {
      if (f) {
        const y = n.nsSeparator || this.options.nsSeparator;
        return o ? {
          res: `${l}${y}${i}`,
          usedKey: i,
          exactUsedKey: i,
          usedLng: c,
          usedNS: l,
          usedParams: this.getUsedParamsDetails(n)
        } : `${l}${y}${i}`;
      }
      return o ? {
        res: i,
        usedKey: i,
        exactUsedKey: i,
        usedLng: c,
        usedNS: l,
        usedParams: this.getUsedParamsDetails(n)
      } : i;
    }
    const u = this.resolve(t, n);
    let d = u && u.res;
    const p = u && u.usedKey || i, m = u && u.exactUsedKey || i, g = Object.prototype.toString.apply(d), h = ["[object Number]", "[object Function]", "[object RegExp]"], w = n.joinArrays !== void 0 ? n.joinArrays : this.options.joinArrays, x = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (x && d && (typeof d != "string" && typeof d != "boolean" && typeof d != "number") && h.indexOf(g) < 0 && !(typeof w == "string" && g === "[object Array]")) {
      if (!n.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const y = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(p, d, {
          ...n,
          ns: a
        }) : `key '${i} (${this.language})' returned an object instead of string.`;
        return o ? (u.res = y, u.usedParams = this.getUsedParamsDetails(n), u) : y;
      }
      if (s) {
        const y = g === "[object Array]", S = y ? [] : {}, C = y ? m : p;
        for (const E in d)
          if (Object.prototype.hasOwnProperty.call(d, E)) {
            const P = `${C}${s}${E}`;
            S[E] = this.translate(P, {
              ...n,
              joinArrays: !1,
              ns: a
            }), S[E] === P && (S[E] = d[E]);
          }
        d = S;
      }
    } else if (x && typeof w == "string" && g === "[object Array]")
      d = d.join(w), d && (d = this.extendTranslation(d, t, n, r));
    else {
      let y = !1, S = !1;
      const C = n.count !== void 0 && typeof n.count != "string", E = hr.hasDefaultValue(n), P = C ? this.pluralResolver.getSuffix(c, n.count, n) : "", L = n.ordinal && C ? this.pluralResolver.getSuffix(c, n.count, {
        ordinal: !1
      }) : "", T = n[`defaultValue${P}`] || n[`defaultValue${L}`] || n.defaultValue;
      !this.isValidLookup(d) && E && (y = !0, d = T), this.isValidLookup(d) || (S = !0, d = i);
      const M = (n.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && S ? void 0 : d, F = E && T !== d && this.options.updateMissing;
      if (S || y || F) {
        if (this.logger.log(F ? "updateKey" : "missingKey", c, l, i, F ? T : d), s) {
          const B = this.resolve(i, {
            ...n,
            keySeparator: !1
          });
          B && B.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let A = [];
        const $ = this.languageUtils.getFallbackCodes(this.options.fallbackLng, n.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && $ && $[0])
          for (let B = 0; B < $.length; B++)
            A.push($[B]);
        else
          this.options.saveMissingTo === "all" ? A = this.languageUtils.toResolveHierarchy(n.lng || this.language) : A.push(n.lng || this.language);
        const R = (B, O, H) => {
          const X = E && H !== d ? H : M;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(B, l, O, X, F, n) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(B, l, O, X, F, n), this.emit("missingKey", B, l, O, d);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && C ? A.forEach((B) => {
          this.pluralResolver.getSuffixes(B, n).forEach((O) => {
            R([B], i + O, n[`defaultValue${O}`] || T);
          });
        }) : R(A, i, T));
      }
      d = this.extendTranslation(d, t, n, u, r), S && d === i && this.options.appendNamespaceToMissingKey && (d = `${l}:${i}`), (S || y) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? d = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${l}:${i}` : i, y ? d : void 0) : d = this.options.parseMissingKeyHandler(d));
    }
    return o ? (u.res = d, u.usedParams = this.getUsedParamsDetails(n), u) : d;
  }
  extendTranslation(t, n, r, o, s) {
    var i = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      t = this.i18nFormat.parse(t, {
        ...this.options.interpolation.defaultVariables,
        ...r
      }, r.lng || this.language || o.usedLng, o.usedNS, o.usedKey, {
        resolved: o
      });
    else if (!r.skipInterpolation) {
      r.interpolation && this.interpolator.init({
        ...r,
        interpolation: {
          ...this.options.interpolation,
          ...r.interpolation
        }
      });
      const c = typeof t == "string" && (r && r.interpolation && r.interpolation.skipOnVariables !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let f;
      if (c) {
        const d = t.match(this.interpolator.nestingRegexp);
        f = d && d.length;
      }
      let u = r.replace && typeof r.replace != "string" ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (u = {
        ...this.options.interpolation.defaultVariables,
        ...u
      }), t = this.interpolator.interpolate(t, u, r.lng || this.language, r), c) {
        const d = t.match(this.interpolator.nestingRegexp), p = d && d.length;
        f < p && (r.nest = !1);
      }
      !r.lng && this.options.compatibilityAPI !== "v1" && o && o.res && (r.lng = o.usedLng), r.nest !== !1 && (t = this.interpolator.nest(t, function() {
        for (var d = arguments.length, p = new Array(d), m = 0; m < d; m++)
          p[m] = arguments[m];
        return s && s[0] === p[0] && !r.context ? (i.logger.warn(`It seems you are nesting recursively key: ${p[0]} in key: ${n[0]}`), null) : i.translate(...p, n);
      }, r)), r.interpolation && this.interpolator.reset();
    }
    const a = r.postProcess || this.options.postProcess, l = typeof a == "string" ? [a] : a;
    return t != null && l && l.length && r.applyPostProcessor !== !1 && (t = Ql.handle(l, t, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...o,
        usedParams: this.getUsedParamsDetails(r)
      },
      ...r
    } : r, this)), t;
  }
  resolve(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r, o, s, i, a;
    return typeof t == "string" && (t = [t]), t.forEach((l) => {
      if (this.isValidLookup(r))
        return;
      const c = this.extractFromKey(l, n), f = c.key;
      o = f;
      let u = c.namespaces;
      this.options.fallbackNS && (u = u.concat(this.options.fallbackNS));
      const d = n.count !== void 0 && typeof n.count != "string", p = d && !n.ordinal && n.count === 0 && this.pluralResolver.shouldUseIntlApi(), m = n.context !== void 0 && (typeof n.context == "string" || typeof n.context == "number") && n.context !== "", g = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      u.forEach((h) => {
        this.isValidLookup(r) || (a = h, !ba[`${g[0]}-${h}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(a) && (ba[`${g[0]}-${h}`] = !0, this.logger.warn(`key "${o}" for languages "${g.join(", ")}" won't get resolved as namespace "${a}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), g.forEach((w) => {
          if (this.isValidLookup(r))
            return;
          i = w;
          const x = [f];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(x, f, w, h, n);
          else {
            let y;
            d && (y = this.pluralResolver.getSuffix(w, n.count, n));
            const S = `${this.options.pluralSeparator}zero`, C = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (d && (x.push(f + y), n.ordinal && y.indexOf(C) === 0 && x.push(f + y.replace(C, this.options.pluralSeparator)), p && x.push(f + S)), m) {
              const E = `${f}${this.options.contextSeparator}${n.context}`;
              x.push(E), d && (x.push(E + y), n.ordinal && y.indexOf(C) === 0 && x.push(E + y.replace(C, this.options.pluralSeparator)), p && x.push(E + S));
            }
          }
          let b;
          for (; b = x.pop(); )
            this.isValidLookup(r) || (s = b, r = this.getResource(w, h, b, n));
        }));
      });
    }), {
      res: r,
      usedKey: o,
      exactUsedKey: s,
      usedLng: i,
      usedNS: a
    };
  }
  isValidLookup(t) {
    return t !== void 0 && !(!this.options.returnNull && t === null) && !(!this.options.returnEmptyString && t === "");
  }
  getResource(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(t, n, r, o) : this.resourceStore.getResource(t, n, r, o);
  }
  getUsedParamsDetails() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], r = t.replace && typeof t.replace != "string";
    let o = r ? t.replace : t;
    if (r && typeof t.count < "u" && (o.count = t.count), this.options.interpolation.defaultVariables && (o = {
      ...this.options.interpolation.defaultVariables,
      ...o
    }), !r) {
      o = {
        ...o
      };
      for (const s of n)
        delete o[s];
    }
    return o;
  }
  static hasDefaultValue(t) {
    const n = "defaultValue";
    for (const r in t)
      if (Object.prototype.hasOwnProperty.call(t, r) && n === r.substring(0, n.length) && t[r] !== void 0)
        return !0;
    return !1;
  }
}
function $o(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
class ya {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = ot.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = gr(t), !t || t.indexOf("-") < 0)
      return null;
    const n = t.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = gr(t), !t || t.indexOf("-") < 0)
      return t;
    const n = t.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(t) {
    if (typeof t == "string" && t.indexOf("-") > -1) {
      const n = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let r = t.split("-");
      return this.options.lowerCaseLng ? r = r.map((o) => o.toLowerCase()) : r.length === 2 ? (r[0] = r[0].toLowerCase(), r[1] = r[1].toUpperCase(), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = $o(r[1].toLowerCase()))) : r.length === 3 && (r[0] = r[0].toLowerCase(), r[1].length === 2 && (r[1] = r[1].toUpperCase()), r[0] !== "sgn" && r[2].length === 2 && (r[2] = r[2].toUpperCase()), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = $o(r[1].toLowerCase())), n.indexOf(r[2].toLowerCase()) > -1 && (r[2] = $o(r[2].toLowerCase()))), r.join("-");
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? t.toLowerCase() : t;
  }
  isSupportedCode(t) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (t = this.getLanguagePartFromCode(t)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(t) > -1;
  }
  getBestMatchFromCodes(t) {
    if (!t)
      return null;
    let n;
    return t.forEach((r) => {
      if (n)
        return;
      const o = this.formatLanguageCode(r);
      (!this.options.supportedLngs || this.isSupportedCode(o)) && (n = o);
    }), !n && this.options.supportedLngs && t.forEach((r) => {
      if (n)
        return;
      const o = this.getLanguagePartFromCode(r);
      if (this.isSupportedCode(o))
        return n = o;
      n = this.options.supportedLngs.find((s) => {
        if (s === o)
          return s;
        if (!(s.indexOf("-") < 0 && o.indexOf("-") < 0) && s.indexOf(o) === 0)
          return s;
      });
    }), n || (n = this.getFallbackCodes(this.options.fallbackLng)[0]), n;
  }
  getFallbackCodes(t, n) {
    if (!t)
      return [];
    if (typeof t == "function" && (t = t(n)), typeof t == "string" && (t = [t]), Object.prototype.toString.apply(t) === "[object Array]")
      return t;
    if (!n)
      return t.default || [];
    let r = t[n];
    return r || (r = t[this.getScriptPartFromCode(n)]), r || (r = t[this.formatLanguageCode(n)]), r || (r = t[this.getLanguagePartFromCode(n)]), r || (r = t.default), r || [];
  }
  toResolveHierarchy(t, n) {
    const r = this.getFallbackCodes(n || this.options.fallbackLng || [], t), o = [], s = (i) => {
      i && (this.isSupportedCode(i) ? o.push(i) : this.logger.warn(`rejecting language code not found in supportedLngs: ${i}`));
    };
    return typeof t == "string" && (t.indexOf("-") > -1 || t.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && s(this.formatLanguageCode(t)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && s(this.getScriptPartFromCode(t)), this.options.load !== "currentOnly" && s(this.getLanguagePartFromCode(t))) : typeof t == "string" && s(this.formatLanguageCode(t)), r.forEach((i) => {
      o.indexOf(i) < 0 && s(this.formatLanguageCode(i));
    }), o;
  }
}
let Vf = [{
  lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
  nr: [1],
  fc: 3
}, {
  lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ["ar"],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ["cs", "sk"],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ["csb", "pl"],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ["cy"],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ["fr"],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ["ga"],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ["gd"],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ["is"],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ["jv"],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ["kw"],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ["lt"],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ["lv"],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ["mk"],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ["mnk"],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ["mt"],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ["or"],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ["ro"],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ["sl"],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ["he", "iw"],
  nr: [1, 2, 20, 21],
  fc: 22
}], Gf = {
  1: function(e) {
    return +(e > 1);
  },
  2: function(e) {
    return +(e != 1);
  },
  3: function(e) {
    return 0;
  },
  4: function(e) {
    return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
  },
  5: function(e) {
    return e == 0 ? 0 : e == 1 ? 1 : e == 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
  },
  6: function(e) {
    return e == 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2;
  },
  7: function(e) {
    return e == 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
  },
  8: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : e != 8 && e != 11 ? 2 : 3;
  },
  9: function(e) {
    return +(e >= 2);
  },
  10: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4;
  },
  11: function(e) {
    return e == 1 || e == 11 ? 0 : e == 2 || e == 12 ? 1 : e > 2 && e < 20 ? 2 : 3;
  },
  12: function(e) {
    return +(e % 10 != 1 || e % 100 == 11);
  },
  13: function(e) {
    return +(e !== 0);
  },
  14: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : e == 3 ? 2 : 3;
  },
  15: function(e) {
    return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
  },
  16: function(e) {
    return e % 10 == 1 && e % 100 != 11 ? 0 : e !== 0 ? 1 : 2;
  },
  17: function(e) {
    return e == 1 || e % 10 == 1 && e % 100 != 11 ? 0 : 1;
  },
  18: function(e) {
    return e == 0 ? 0 : e == 1 ? 1 : 2;
  },
  19: function(e) {
    return e == 1 ? 0 : e == 0 || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3;
  },
  20: function(e) {
    return e == 1 ? 0 : e == 0 || e % 100 > 0 && e % 100 < 20 ? 1 : 2;
  },
  21: function(e) {
    return e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0;
  },
  22: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3;
  }
};
const Wf = ["v1", "v2", "v3"], zf = ["v4"], va = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function Hf() {
  const e = {};
  return Vf.forEach((t) => {
    t.lngs.forEach((n) => {
      e[n] = {
        numbers: t.nr,
        plurals: Gf[t.fc]
      };
    });
  }), e;
}
class Uf {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = t, this.options = n, this.logger = ot.create("pluralResolver"), (!this.options.compatibilityJSON || zf.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = Hf();
  }
  addRule(t, n) {
    this.rules[t] = n;
  }
  getRule(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(gr(t), {
          type: n.ordinal ? "ordinal" : "cardinal"
        });
      } catch {
        return;
      }
    return this.rules[t] || this.rules[this.languageUtils.getLanguagePartFromCode(t)];
  }
  needsPlural(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = this.getRule(t, n);
    return this.shouldUseIntlApi() ? r && r.resolvedOptions().pluralCategories.length > 1 : r && r.numbers.length > 1;
  }
  getPluralFormsOfKey(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(t, r).map((o) => `${n}${o}`);
  }
  getSuffixes(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = this.getRule(t, n);
    return r ? this.shouldUseIntlApi() ? r.resolvedOptions().pluralCategories.sort((o, s) => va[o] - va[s]).map((o) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${o}`) : r.numbers.map((o) => this.getSuffix(t, o, n)) : [];
  }
  getSuffix(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const o = this.getRule(t, r);
    return o ? this.shouldUseIntlApi() ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${o.select(n)}` : this.getSuffixRetroCompatible(o, n) : (this.logger.warn(`no plural rule found for: ${t}`), "");
  }
  getSuffixRetroCompatible(t, n) {
    const r = t.noAbs ? t.plurals(n) : t.plurals(Math.abs(n));
    let o = t.numbers[r];
    this.options.simplifyPluralSuffix && t.numbers.length === 2 && t.numbers[0] === 1 && (o === 2 ? o = "plural" : o === 1 && (o = ""));
    const s = () => this.options.prepend && o.toString() ? this.options.prepend + o.toString() : o.toString();
    return this.options.compatibilityJSON === "v1" ? o === 1 ? "" : typeof o == "number" ? `_plural_${o.toString()}` : s() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && t.numbers.length === 2 && t.numbers[0] === 1 ? s() : this.options.prepend && r.toString() ? this.options.prepend + r.toString() : r.toString();
  }
  shouldUseIntlApi() {
    return !Wf.includes(this.options.compatibilityJSON);
  }
}
function wa(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, s = Ff(e, t, n);
  return !s && o && typeof n == "string" && (s = mr(e, n, r), s === void 0 && (s = mr(t, n, r))), s;
}
class qf {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = ot.create("interpolator"), this.options = t, this.format = t.interpolation && t.interpolation.format || ((n) => n), this.init(t);
  }
  init() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    t.interpolation || (t.interpolation = {
      escapeValue: !0
    });
    const n = t.interpolation;
    this.escape = n.escape !== void 0 ? n.escape : Bf, this.escapeValue = n.escapeValue !== void 0 ? n.escapeValue : !0, this.useRawValueToEscape = n.useRawValueToEscape !== void 0 ? n.useRawValueToEscape : !1, this.prefix = n.prefix ? Jt(n.prefix) : n.prefixEscaped || "{{", this.suffix = n.suffix ? Jt(n.suffix) : n.suffixEscaped || "}}", this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ",", this.unescapePrefix = n.unescapeSuffix ? "" : n.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : n.unescapeSuffix || "", this.nestingPrefix = n.nestingPrefix ? Jt(n.nestingPrefix) : n.nestingPrefixEscaped || Jt("$t("), this.nestingSuffix = n.nestingSuffix ? Jt(n.nestingSuffix) : n.nestingSuffixEscaped || Jt(")"), this.nestingOptionsSeparator = n.nestingOptionsSeparator ? n.nestingOptionsSeparator : n.nestingOptionsSeparator || ",", this.maxReplaces = n.maxReplaces ? n.maxReplaces : 1e3, this.alwaysFormat = n.alwaysFormat !== void 0 ? n.alwaysFormat : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const t = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(t, "g");
    const n = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(n, "g");
    const r = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(r, "g");
  }
  interpolate(t, n, r, o) {
    let s, i, a;
    const l = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function c(m) {
      return m.replace(/\$/g, "$$$$");
    }
    const f = (m) => {
      if (m.indexOf(this.formatSeparator) < 0) {
        const x = wa(n, l, m, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(x, void 0, r, {
          ...o,
          ...n,
          interpolationkey: m
        }) : x;
      }
      const g = m.split(this.formatSeparator), h = g.shift().trim(), w = g.join(this.formatSeparator).trim();
      return this.format(wa(n, l, h, this.options.keySeparator, this.options.ignoreJSONStructure), w, r, {
        ...o,
        ...n,
        interpolationkey: h
      });
    };
    this.resetRegExp();
    const u = o && o.missingInterpolationHandler || this.options.missingInterpolationHandler, d = o && o.interpolation && o.interpolation.skipOnVariables !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (m) => c(m)
    }, {
      regex: this.regexp,
      safeValue: (m) => this.escapeValue ? c(this.escape(m)) : c(m)
    }].forEach((m) => {
      for (a = 0; s = m.regex.exec(t); ) {
        const g = s[1].trim();
        if (i = f(g), i === void 0)
          if (typeof u == "function") {
            const w = u(t, s, o);
            i = typeof w == "string" ? w : "";
          } else if (o && Object.prototype.hasOwnProperty.call(o, g))
            i = "";
          else if (d) {
            i = s[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${g} for interpolating ${t}`), i = "";
        else
          typeof i != "string" && !this.useRawValueToEscape && (i = ma(i));
        const h = m.safeValue(i);
        if (t = t.replace(s[0], h), d ? (m.regex.lastIndex += i.length, m.regex.lastIndex -= s[0].length) : m.regex.lastIndex = 0, a++, a >= this.maxReplaces)
          break;
      }
    }), t;
  }
  nest(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o, s, i;
    function a(l, c) {
      const f = this.nestingOptionsSeparator;
      if (l.indexOf(f) < 0)
        return l;
      const u = l.split(new RegExp(`${f}[ ]*{`));
      let d = `{${u[1]}`;
      l = u[0], d = this.interpolate(d, i);
      const p = d.match(/'/g), m = d.match(/"/g);
      (p && p.length % 2 === 0 && !m || m.length % 2 !== 0) && (d = d.replace(/'/g, '"'));
      try {
        i = JSON.parse(d), c && (i = {
          ...c,
          ...i
        });
      } catch (g) {
        return this.logger.warn(`failed parsing options string in nesting for key ${l}`, g), `${l}${f}${d}`;
      }
      return delete i.defaultValue, l;
    }
    for (; o = this.nestingRegexp.exec(t); ) {
      let l = [];
      i = {
        ...r
      }, i = i.replace && typeof i.replace != "string" ? i.replace : i, i.applyPostProcessor = !1, delete i.defaultValue;
      let c = !1;
      if (o[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(o[1])) {
        const f = o[1].split(this.formatSeparator).map((u) => u.trim());
        o[1] = f.shift(), l = f, c = !0;
      }
      if (s = n(a.call(this, o[1].trim(), i), i), s && o[0] === t && typeof s != "string")
        return s;
      typeof s != "string" && (s = ma(s)), s || (this.logger.warn(`missed to resolve ${o[1]} for nesting ${t}`), s = ""), c && (s = l.reduce((f, u) => this.format(f, u, r.lng, {
        ...r,
        interpolationkey: o[1].trim()
      }), s.trim())), t = t.replace(o[0], s), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
function Kf(e) {
  let t = e.toLowerCase().trim();
  const n = {};
  if (e.indexOf("(") > -1) {
    const r = e.split("(");
    t = r[0].toLowerCase().trim();
    const o = r[1].substring(0, r[1].length - 1);
    t === "currency" && o.indexOf(":") < 0 ? n.currency || (n.currency = o.trim()) : t === "relativetime" && o.indexOf(":") < 0 ? n.range || (n.range = o.trim()) : o.split(";").forEach((i) => {
      if (!i)
        return;
      const [a, ...l] = i.split(":"), c = l.join(":").trim().replace(/^'+|'+$/g, "");
      n[a.trim()] || (n[a.trim()] = c), c === "false" && (n[a.trim()] = !1), c === "true" && (n[a.trim()] = !0), isNaN(c) || (n[a.trim()] = parseInt(c, 10));
    });
  }
  return {
    formatName: t,
    formatOptions: n
  };
}
function Qt(e) {
  const t = {};
  return function(r, o, s) {
    const i = o + JSON.stringify(s);
    let a = t[i];
    return a || (a = e(gr(o), s), t[i] = a), a(r);
  };
}
class Yf {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = ot.create("formatter"), this.options = t, this.formats = {
      number: Qt((n, r) => {
        const o = new Intl.NumberFormat(n, {
          ...r
        });
        return (s) => o.format(s);
      }),
      currency: Qt((n, r) => {
        const o = new Intl.NumberFormat(n, {
          ...r,
          style: "currency"
        });
        return (s) => o.format(s);
      }),
      datetime: Qt((n, r) => {
        const o = new Intl.DateTimeFormat(n, {
          ...r
        });
        return (s) => o.format(s);
      }),
      relativetime: Qt((n, r) => {
        const o = new Intl.RelativeTimeFormat(n, {
          ...r
        });
        return (s) => o.format(s, r.range || "day");
      }),
      list: Qt((n, r) => {
        const o = new Intl.ListFormat(n, {
          ...r
        });
        return (s) => o.format(s);
      })
    }, this.init(t);
  }
  init(t) {
    const r = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    }).interpolation;
    this.formatSeparator = r.formatSeparator ? r.formatSeparator : r.formatSeparator || ",";
  }
  add(t, n) {
    this.formats[t.toLowerCase().trim()] = n;
  }
  addCached(t, n) {
    this.formats[t.toLowerCase().trim()] = Qt(n);
  }
  format(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return n.split(this.formatSeparator).reduce((a, l) => {
      const {
        formatName: c,
        formatOptions: f
      } = Kf(l);
      if (this.formats[c]) {
        let u = a;
        try {
          const d = o && o.formatParams && o.formatParams[o.interpolationkey] || {}, p = d.locale || d.lng || o.locale || o.lng || r;
          u = this.formats[c](a, p, {
            ...f,
            ...o,
            ...d
          });
        } catch (d) {
          this.logger.warn(d);
        }
        return u;
      } else
        this.logger.warn(`there was no format function for ${c}`);
      return a;
    }, t);
  }
}
function Xf(e, t) {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
}
class Jf extends Fr {
  constructor(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = t, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = o, this.logger = ot.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = o.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = o.maxRetries >= 0 ? o.maxRetries : 5, this.retryTimeout = o.retryTimeout >= 1 ? o.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(r, o.backend, o);
  }
  queueLoad(t, n, r, o) {
    const s = {}, i = {}, a = {}, l = {};
    return t.forEach((c) => {
      let f = !0;
      n.forEach((u) => {
        const d = `${c}|${u}`;
        !r.reload && this.store.hasResourceBundle(c, u) ? this.state[d] = 2 : this.state[d] < 0 || (this.state[d] === 1 ? i[d] === void 0 && (i[d] = !0) : (this.state[d] = 1, f = !1, i[d] === void 0 && (i[d] = !0), s[d] === void 0 && (s[d] = !0), l[u] === void 0 && (l[u] = !0)));
      }), f || (a[c] = !0);
    }), (Object.keys(s).length || Object.keys(i).length) && this.queue.push({
      pending: i,
      pendingCount: Object.keys(i).length,
      loaded: {},
      errors: [],
      callback: o
    }), {
      toLoad: Object.keys(s),
      pending: Object.keys(i),
      toLoadLanguages: Object.keys(a),
      toLoadNamespaces: Object.keys(l)
    };
  }
  loaded(t, n, r) {
    const o = t.split("|"), s = o[0], i = o[1];
    n && this.emit("failedLoading", s, i, n), r && this.store.addResourceBundle(s, i, r), this.state[t] = n ? -1 : 2;
    const a = {};
    this.queue.forEach((l) => {
      Mf(l.loaded, [s], i), Xf(l, t), n && l.errors.push(n), l.pendingCount === 0 && !l.done && (Object.keys(l.loaded).forEach((c) => {
        a[c] || (a[c] = {});
        const f = l.loaded[c];
        f.length && f.forEach((u) => {
          a[c][u] === void 0 && (a[c][u] = !0);
        });
      }), l.done = !0, l.errors.length ? l.callback(l.errors) : l.callback());
    }), this.emit("loaded", a), this.queue = this.queue.filter((l) => !l.done);
  }
  read(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, i = arguments.length > 5 ? arguments[5] : void 0;
    if (!t.length)
      return i(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: t,
        ns: n,
        fcName: r,
        tried: o,
        wait: s,
        callback: i
      });
      return;
    }
    this.readingCalls++;
    const a = (c, f) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const u = this.waitingReads.shift();
        this.read(u.lng, u.ns, u.fcName, u.tried, u.wait, u.callback);
      }
      if (c && f && o < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, t, n, r, o + 1, s * 2, i);
        }, s);
        return;
      }
      i(c, f);
    }, l = this.backend[r].bind(this.backend);
    if (l.length === 2) {
      try {
        const c = l(t, n);
        c && typeof c.then == "function" ? c.then((f) => a(null, f)).catch(a) : a(null, c);
      } catch (c) {
        a(c);
      }
      return;
    }
    return l(t, n, a);
  }
  prepareLoading(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), o && o();
    typeof t == "string" && (t = this.languageUtils.toResolveHierarchy(t)), typeof n == "string" && (n = [n]);
    const s = this.queueLoad(t, n, r, o);
    if (!s.toLoad.length)
      return s.pending.length || o(), null;
    s.toLoad.forEach((i) => {
      this.loadOne(i);
    });
  }
  load(t, n, r) {
    this.prepareLoading(t, n, {}, r);
  }
  reload(t, n, r) {
    this.prepareLoading(t, n, {
      reload: !0
    }, r);
  }
  loadOne(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const r = t.split("|"), o = r[0], s = r[1];
    this.read(o, s, "read", void 0, void 0, (i, a) => {
      i && this.logger.warn(`${n}loading namespace ${s} for language ${o} failed`, i), !i && a && this.logger.log(`${n}loaded namespace ${s} for language ${o}`, a), this.loaded(t, i, a);
    });
  }
  saveMissing(t, n, r, o, s) {
    let i = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(n)) {
      this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(r == null || r === "")) {
      if (this.backend && this.backend.create) {
        const l = {
          ...i,
          isUpdate: s
        }, c = this.backend.create.bind(this.backend);
        if (c.length < 6)
          try {
            let f;
            c.length === 5 ? f = c(t, n, r, o, l) : f = c(t, n, r, o), f && typeof f.then == "function" ? f.then((u) => a(null, u)).catch(a) : a(null, f);
          } catch (f) {
            a(f);
          }
        else
          c(t, n, r, o, a, l);
      }
      !t || !t[0] || this.store.addResource(t[0], n, r, o);
    }
  }
}
function xa() {
  return {
    debug: !1,
    initImmediate: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: function(t) {
      let n = {};
      if (typeof t[1] == "object" && (n = t[1]), typeof t[1] == "string" && (n.defaultValue = t[1]), typeof t[2] == "string" && (n.tDescription = t[2]), typeof t[2] == "object" || typeof t[3] == "object") {
        const r = t[3] || t[2];
        Object.keys(r).forEach((o) => {
          n[o] = r[o];
        });
      }
      return n;
    },
    interpolation: {
      escapeValue: !0,
      format: (e, t, n, r) => e,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0
    }
  };
}
function Sa(e) {
  return typeof e.ns == "string" && (e.ns = [e.ns]), typeof e.fallbackLng == "string" && (e.fallbackLng = [e.fallbackLng]), typeof e.fallbackNS == "string" && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e;
}
function Qn() {
}
function Qf(e) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((n) => {
    typeof e[n] == "function" && (e[n] = e[n].bind(e));
  });
}
class Rn extends Fr {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = Sa(t), this.services = {}, this.logger = ot, this.modules = {
      external: []
    }, Qf(this), n && !this.isInitialized && !t.isClone) {
      if (!this.options.initImmediate)
        return this.init(t, n), this;
      setTimeout(() => {
        this.init(t, n);
      }, 0);
    }
  }
  init() {
    var t = this;
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0;
    typeof n == "function" && (r = n, n = {}), !n.defaultNS && n.defaultNS !== !1 && n.ns && (typeof n.ns == "string" ? n.defaultNS = n.ns : n.ns.indexOf("translation") < 0 && (n.defaultNS = n.ns[0]));
    const o = xa();
    this.options = {
      ...o,
      ...this.options,
      ...Sa(n)
    }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = {
      ...o.interpolation,
      ...this.options.interpolation
    }), n.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = n.keySeparator), n.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = n.nsSeparator);
    function s(f) {
      return f ? typeof f == "function" ? new f() : f : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? ot.init(s(this.modules.logger), this.options) : ot.init(null, this.options);
      let f;
      this.modules.formatter ? f = this.modules.formatter : typeof Intl < "u" && (f = Yf);
      const u = new ya(this.options);
      this.store = new ha(this.options.resources, this.options);
      const d = this.services;
      d.logger = ot, d.resourceStore = this.store, d.languageUtils = u, d.pluralResolver = new Uf(u, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), f && (!this.options.interpolation.format || this.options.interpolation.format === o.interpolation.format) && (d.formatter = s(f), d.formatter.init(d, this.options), this.options.interpolation.format = d.formatter.format.bind(d.formatter)), d.interpolator = new qf(this.options), d.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, d.backendConnector = new Jf(s(this.modules.backend), d.resourceStore, d, this.options), d.backendConnector.on("*", function(p) {
        for (var m = arguments.length, g = new Array(m > 1 ? m - 1 : 0), h = 1; h < m; h++)
          g[h - 1] = arguments[h];
        t.emit(p, ...g);
      }), this.modules.languageDetector && (d.languageDetector = s(this.modules.languageDetector), d.languageDetector.init && d.languageDetector.init(d, this.options.detection, this.options)), this.modules.i18nFormat && (d.i18nFormat = s(this.modules.i18nFormat), d.i18nFormat.init && d.i18nFormat.init(this)), this.translator = new hr(this.services, this.options), this.translator.on("*", function(p) {
        for (var m = arguments.length, g = new Array(m > 1 ? m - 1 : 0), h = 1; h < m; h++)
          g[h - 1] = arguments[h];
        t.emit(p, ...g);
      }), this.modules.external.forEach((p) => {
        p.init && p.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, r || (r = Qn), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const f = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      f.length > 0 && f[0] !== "dev" && (this.options.lng = f[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((f) => {
      this[f] = function() {
        return t.store[f](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((f) => {
      this[f] = function() {
        return t.store[f](...arguments), t;
      };
    });
    const l = vn(), c = () => {
      const f = (u, d) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), l.resolve(d), r(u, d);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return f(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, f);
    };
    return this.options.resources || !this.options.initImmediate ? c() : setTimeout(c, 0), l;
  }
  loadResources(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Qn;
    const o = typeof t == "string" ? t : this.language;
    if (typeof t == "function" && (r = t), !this.options.resources || this.options.partialBundledLanguages) {
      if (o && o.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
        return r();
      const s = [], i = (a) => {
        if (!a || a === "cimode")
          return;
        this.services.languageUtils.toResolveHierarchy(a).forEach((c) => {
          c !== "cimode" && s.indexOf(c) < 0 && s.push(c);
        });
      };
      o ? i(o) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((l) => i(l)), this.options.preload && this.options.preload.forEach((a) => i(a)), this.services.backendConnector.load(s, this.options.ns, (a) => {
        !a && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), r(a);
      });
    } else
      r(null);
  }
  reloadResources(t, n, r) {
    const o = vn();
    return t || (t = this.languages), n || (n = this.options.ns), r || (r = Qn), this.services.backendConnector.reload(t, n, (s) => {
      o.resolve(), r(s);
    }), o;
  }
  use(t) {
    if (!t)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && Ql.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
  }
  setResolvedLanguage(t) {
    if (!(!t || !this.languages) && !(["cimode", "dev"].indexOf(t) > -1))
      for (let n = 0; n < this.languages.length; n++) {
        const r = this.languages[n];
        if (!(["cimode", "dev"].indexOf(r) > -1) && this.store.hasLanguageSomeTranslations(r)) {
          this.resolvedLanguage = r;
          break;
        }
      }
  }
  changeLanguage(t, n) {
    var r = this;
    this.isLanguageChangingTo = t;
    const o = vn();
    this.emit("languageChanging", t);
    const s = (l) => {
      this.language = l, this.languages = this.services.languageUtils.toResolveHierarchy(l), this.resolvedLanguage = void 0, this.setResolvedLanguage(l);
    }, i = (l, c) => {
      c ? (s(c), this.translator.changeLanguage(c), this.isLanguageChangingTo = void 0, this.emit("languageChanged", c), this.logger.log("languageChanged", c)) : this.isLanguageChangingTo = void 0, o.resolve(function() {
        return r.t(...arguments);
      }), n && n(l, function() {
        return r.t(...arguments);
      });
    }, a = (l) => {
      !t && !l && this.services.languageDetector && (l = []);
      const c = typeof l == "string" ? l : this.services.languageUtils.getBestMatchFromCodes(l);
      c && (this.language || s(c), this.translator.language || this.translator.changeLanguage(c), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(c)), this.loadResources(c, (f) => {
        i(f, c);
      });
    };
    return !t && this.services.languageDetector && !this.services.languageDetector.async ? a(this.services.languageDetector.detect()) : !t && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(a) : this.services.languageDetector.detect(a) : a(t), o;
  }
  getFixedT(t, n, r) {
    var o = this;
    const s = function(i, a) {
      let l;
      if (typeof a != "object") {
        for (var c = arguments.length, f = new Array(c > 2 ? c - 2 : 0), u = 2; u < c; u++)
          f[u - 2] = arguments[u];
        l = o.options.overloadTranslationOptionHandler([i, a].concat(f));
      } else
        l = {
          ...a
        };
      l.lng = l.lng || s.lng, l.lngs = l.lngs || s.lngs, l.ns = l.ns || s.ns, l.keyPrefix = l.keyPrefix || r || s.keyPrefix;
      const d = o.options.keySeparator || ".";
      let p;
      return l.keyPrefix && Array.isArray(i) ? p = i.map((m) => `${l.keyPrefix}${d}${m}`) : p = l.keyPrefix ? `${l.keyPrefix}${d}${i}` : i, o.t(p, l);
    };
    return typeof t == "string" ? s.lng = t : s.lngs = t, s.ns = n, s.keyPrefix = r, s;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(t) {
    this.options.defaultNS = t;
  }
  hasLoadedNamespace(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const r = n.lng || this.resolvedLanguage || this.languages[0], o = this.options ? this.options.fallbackLng : !1, s = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode")
      return !0;
    const i = (a, l) => {
      const c = this.services.backendConnector.state[`${a}|${l}`];
      return c === -1 || c === 2;
    };
    if (n.precheck) {
      const a = n.precheck(this, i);
      if (a !== void 0)
        return a;
    }
    return !!(this.hasResourceBundle(r, t) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || i(r, t) && (!o || i(s, t)));
  }
  loadNamespaces(t, n) {
    const r = vn();
    return this.options.ns ? (typeof t == "string" && (t = [t]), t.forEach((o) => {
      this.options.ns.indexOf(o) < 0 && this.options.ns.push(o);
    }), this.loadResources((o) => {
      r.resolve(), n && n(o);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(t, n) {
    const r = vn();
    typeof t == "string" && (t = [t]);
    const o = this.options.preload || [], s = t.filter((i) => o.indexOf(i) < 0);
    return s.length ? (this.options.preload = o.concat(s), this.loadResources((i) => {
      r.resolve(), n && n(i);
    }), r) : (n && n(), Promise.resolve());
  }
  dir(t) {
    if (t || (t = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !t)
      return "rtl";
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = this.services && this.services.languageUtils || new ya(xa());
    return n.indexOf(r.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    return new Rn(t, n);
  }
  cloneInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Qn;
    const r = t.forkResourceStore;
    r && delete t.forkResourceStore;
    const o = {
      ...this.options,
      ...t,
      isClone: !0
    }, s = new Rn(o);
    return (t.debug !== void 0 || t.prefix !== void 0) && (s.logger = s.logger.clone(t)), ["store", "services", "language"].forEach((a) => {
      s[a] = this[a];
    }), s.services = {
      ...this.services
    }, s.services.utils = {
      hasLoadedNamespace: s.hasLoadedNamespace.bind(s)
    }, r && (s.store = new ha(this.store.data, o), s.services.resourceStore = s.store), s.translator = new hr(s.services, o), s.translator.on("*", function(a) {
      for (var l = arguments.length, c = new Array(l > 1 ? l - 1 : 0), f = 1; f < l; f++)
        c[f - 1] = arguments[f];
      s.emit(a, ...c);
    }), s.init(o, n), s.translator.options = o, s.translator.backendConnector.services.utils = {
      hasLoadedNamespace: s.hasLoadedNamespace.bind(s)
    }, s;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const ve = Rn.createInstance();
ve.createInstance = Rn.createInstance;
ve.createInstance;
ve.dir;
ve.init;
ve.loadResources;
ve.reloadResources;
ve.use;
ve.changeLanguage;
ve.getFixedT;
ve.t;
ve.exists;
ve.setDefaultNamespace;
ve.hasLoadedNamespace;
ve.loadNamespaces;
ve.loadLanguages;
function Et() {
  return Et = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Et.apply(this, arguments);
}
function Zf() {
  if (console && console.warn) {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    typeof t[0] == "string" && (t[0] = `react-i18next:: ${t[0]}`), console.warn(...t);
  }
}
const Ca = {};
function ss() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  typeof t[0] == "string" && Ca[t[0]] || (typeof t[0] == "string" && (Ca[t[0]] = /* @__PURE__ */ new Date()), Zf(...t));
}
const Zl = (e, t) => () => {
  if (e.isInitialized)
    t();
  else {
    const n = () => {
      setTimeout(() => {
        e.off("initialized", n);
      }, 0), t();
    };
    e.on("initialized", n);
  }
};
function Ea(e, t, n) {
  e.loadNamespaces(t, Zl(e, n));
}
function Pa(e, t, n, r) {
  typeof n == "string" && (n = [n]), n.forEach((o) => {
    e.options.ns.indexOf(o) < 0 && e.options.ns.push(o);
  }), e.loadLanguages(t, Zl(e, r));
}
function ep(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = t.languages[0], o = t.options ? t.options.fallbackLng : !1, s = t.languages[t.languages.length - 1];
  if (r.toLowerCase() === "cimode")
    return !0;
  const i = (a, l) => {
    const c = t.services.backendConnector.state[`${a}|${l}`];
    return c === -1 || c === 2;
  };
  return n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && t.services.backendConnector.backend && t.isLanguageChangingTo && !i(t.isLanguageChangingTo, e) ? !1 : !!(t.hasResourceBundle(r, e) || !t.services.backendConnector.backend || t.options.resources && !t.options.partialBundledLanguages || i(r, e) && (!o || i(s, e)));
}
function tp(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return !t.languages || !t.languages.length ? (ss("i18n.languages were undefined or empty", t.languages), !0) : t.options.ignoreJSONStructure !== void 0 ? t.hasLoadedNamespace(e, {
    lng: n.lng,
    precheck: (o, s) => {
      if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && o.services.backendConnector.backend && o.isLanguageChangingTo && !s(o.isLanguageChangingTo, e))
        return !1;
    }
  }) : ep(e, t, n);
}
const np = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, rp = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
}, op = (e) => rp[e], sp = (e) => e.replace(np, op);
let is = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: sp
};
function ip() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  is = {
    ...is,
    ...e
  };
}
function ap() {
  return is;
}
let ec;
function lp(e) {
  ec = e;
}
function cp() {
  return ec;
}
const up = {
  type: "3rdParty",
  init(e) {
    ip(e.options.react), lp(e);
  }
}, dp = qt();
class fp {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(t) {
    t.forEach((n) => {
      this.usedNamespaces[n] || (this.usedNamespaces[n] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const pp = (e, t) => {
  const n = V();
  return W(() => {
    n.current = t ? n.current : e;
  }, [e, t]), n.current;
};
function un(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    i18n: n
  } = t, {
    i18n: r,
    defaultNS: o
  } = ct(dp) || {}, s = n || r || cp();
  if (s && !s.reportNamespaces && (s.reportNamespaces = new fp()), !s) {
    ss("You will need to pass in an i18next instance by using initReactI18next");
    const b = (S, C) => typeof C == "string" ? C : C && typeof C == "object" && typeof C.defaultValue == "string" ? C.defaultValue : Array.isArray(S) ? S[S.length - 1] : S, y = [b, {}, !1];
    return y.t = b, y.i18n = {}, y.ready = !1, y;
  }
  s.options.react && s.options.react.wait !== void 0 && ss("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const i = {
    ...ap(),
    ...s.options.react,
    ...t
  }, {
    useSuspense: a,
    keyPrefix: l
  } = i;
  let c = e || o || s.options && s.options.defaultNS;
  c = typeof c == "string" ? [c] : c || ["translation"], s.reportNamespaces.addUsedNamespaces && s.reportNamespaces.addUsedNamespaces(c);
  const f = (s.isInitialized || s.initializedStoreOnce) && c.every((b) => tp(b, s, i));
  function u() {
    return s.getFixedT(t.lng || null, i.nsMode === "fallback" ? c : c[0], l);
  }
  const [d, p] = z(u);
  let m = c.join();
  t.lng && (m = `${t.lng}${m}`);
  const g = pp(m), h = V(!0);
  W(() => {
    const {
      bindI18n: b,
      bindI18nStore: y
    } = i;
    h.current = !0, !f && !a && (t.lng ? Pa(s, t.lng, c, () => {
      h.current && p(u);
    }) : Ea(s, c, () => {
      h.current && p(u);
    })), f && g && g !== m && h.current && p(u);
    function S() {
      h.current && p(u);
    }
    return b && s && s.on(b, S), y && s && s.store.on(y, S), () => {
      h.current = !1, b && s && b.split(" ").forEach((C) => s.off(C, S)), y && s && y.split(" ").forEach((C) => s.store.off(C, S));
    };
  }, [s, m]);
  const w = V(!0);
  W(() => {
    h.current && !w.current && p(u), w.current = !1;
  }, [s, l]);
  const x = [d, s, f];
  if (x.t = d, x.i18n = s, x.ready = f, f || !f && !a)
    return x;
  throw new Promise((b) => {
    t.lng ? Pa(s, t.lng, c, () => b()) : Ea(s, c, () => b());
  });
}
ve.use(up).init({
  resources: {
    en: {
      translation: {
        "No description": "No description",
        Link: "Link",
        Settings: "Settings",
        Language: "Language",
        "Select language": "Select language",
        "bSDD environment": "bSDD environment",
        "Main dictionary": "Main dictionary",
        "Selection filter dictionaries": "Selection filter dictionaries",
        "Sort filter dictionaries": "Sort filter dictionaries",
        "Select objects": "Select objects",
        "Attach to type": "Attach to type",
        No: "No"
      }
    },
    nl: {
      translation: {
        "No description": "Geen beschrijving",
        Link: "Koppelen",
        Settings: "Instellingen",
        Language: "Taal",
        "Select language": "Selecteer taal",
        "bSDD environment": "bSDD omgeving",
        "Main dictionary": "bSDD domein",
        "Selection filter dictionaries": "Selectie filter domeinen",
        "Sort filter dictionaries": "Sorteer filter domeinen",
        "Select objects": "Selecteer objecten",
        "Attach to type": "Koppelen aan type",
        No: "Geen"
      }
    }
  },
  lng: "nl",
  fallbackLng: "en",
  interpolation: {
    escapeValue: !1
  }
});
function it(e) {
  return Object.keys(e);
}
function To(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function Ps(e, t) {
  const n = { ...e }, r = t;
  return To(e) && To(t) && Object.keys(t).forEach((o) => {
    To(r[o]) && o in e ? n[o] = Ps(n[o], r[o]) : n[o] = r[o];
  }), n;
}
function mp(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function gp(e) {
  var t;
  return typeof e != "string" || !e.includes("var(--mantine-scale)") ? e : (t = e.match(/^calc\((.*?)\)$/)) == null ? void 0 : t[1].split("*")[0].trim();
}
function hp(e) {
  const t = gp(e);
  return typeof t == "number" ? t : typeof t == "string" ? t.includes("calc") || t.includes("var") ? t : t.includes("px") ? Number(t.replace("px", "")) : t.includes("rem") ? Number(t.replace("rem", "")) * 16 : t.includes("em") ? Number(t.replace("em", "")) * 16 : Number(t) : NaN;
}
function Lo(e) {
  return `calc(${e} * var(--mantine-scale))`;
}
function tc(e, { shouldScale: t = !1 } = {}) {
  function n(r) {
    if (r === 0 || r === "0")
      return "0";
    if (typeof r == "number") {
      const o = `${r / 16}${e}`;
      return t ? Lo(o) : o;
    }
    if (typeof r == "string") {
      if (r.startsWith("calc(") || r.startsWith("var(") || r.startsWith("clamp("))
        return r;
      if (r.includes(" "))
        return r.split(" ").map((s) => n(s)).join(" ");
      if (r.includes(e))
        return t ? Lo(r) : r;
      const o = r.replace("px", "");
      if (!Number.isNaN(Number(o))) {
        const s = `${Number(o) / 16}${e}`;
        return t ? Lo(s) : s;
      }
    }
    return r;
  }
  return n;
}
const D = tc("rem", { shouldScale: !0 }), Da = tc("em");
function Ds(e) {
  return Object.keys(e).reduce((t, n) => (e[n] !== void 0 && (t[n] = e[n]), t), {});
}
function nc(e) {
  return typeof e == "number" ? !0 : typeof e == "string" ? e.startsWith("calc(") || e.startsWith("var(") || e.includes(" ") && e.trim() !== "" ? !0 : /[0-9]/.test(e.trim().replace("-", "")[0]) : !1;
}
function Tt(e) {
  return Array.isArray(e) || e === null ? !1 : typeof e == "object" ? e.type !== v.Fragment : !1;
}
function Lt(e) {
  const t = qt(null);
  return [({ children: o, value: s }) => /* @__PURE__ */ v.createElement(t.Provider, { value: s }, o), () => {
    const o = ct(t);
    if (o === null)
      throw new Error(e);
    return o;
  }];
}
function Is(e = null) {
  const t = qt(e);
  return [({ children: o, value: s }) => /* @__PURE__ */ v.createElement(t.Provider, { value: s }, o), () => ct(t)];
}
function br(e, t) {
  return (n) => {
    if (typeof n != "string" || n.trim().length === 0)
      throw new Error(t);
    return `${e}-${n}`;
  };
}
function as(e, t) {
  let n = e;
  for (; (n = n.parentElement) && !n.matches(t); )
    ;
  return n;
}
function bp(e, t, n) {
  for (let r = e - 1; r >= 0; r -= 1)
    if (!t[r].disabled)
      return r;
  if (n) {
    for (let r = t.length - 1; r > -1; r -= 1)
      if (!t[r].disabled)
        return r;
  }
  return e;
}
function yp(e, t, n) {
  for (let r = e + 1; r < t.length; r += 1)
    if (!t[r].disabled)
      return r;
  if (n) {
    for (let r = 0; r < t.length; r += 1)
      if (!t[r].disabled)
        return r;
  }
  return e;
}
function vp(e, t, n) {
  return as(e, n) === as(t, n);
}
function rc({
  parentSelector: e,
  siblingSelector: t,
  onKeyDown: n,
  loop: r = !0,
  activateOnFocus: o = !1,
  dir: s = "rtl",
  orientation: i
}) {
  return (a) => {
    var m;
    n == null || n(a);
    const l = Array.from(
      ((m = as(a.currentTarget, e)) == null ? void 0 : m.querySelectorAll(
        t
      )) || []
    ).filter((g) => vp(a.currentTarget, g, e)), c = l.findIndex((g) => a.currentTarget === g), f = yp(c, l, r), u = bp(c, l, r), d = s === "rtl" ? u : f, p = s === "rtl" ? f : u;
    switch (a.key) {
      case "ArrowRight": {
        i === "horizontal" && (a.stopPropagation(), a.preventDefault(), l[d].focus(), o && l[d].click());
        break;
      }
      case "ArrowLeft": {
        i === "horizontal" && (a.stopPropagation(), a.preventDefault(), l[p].focus(), o && l[p].click());
        break;
      }
      case "ArrowUp": {
        i === "vertical" && (a.stopPropagation(), a.preventDefault(), l[u].focus(), o && l[u].click());
        break;
      }
      case "ArrowDown": {
        i === "vertical" && (a.stopPropagation(), a.preventDefault(), l[f].focus(), o && l[f].click());
        break;
      }
      case "Home": {
        a.stopPropagation(), a.preventDefault(), !l[0].disabled && l[0].focus();
        break;
      }
      case "End": {
        a.stopPropagation(), a.preventDefault();
        const g = l.length - 1;
        !l[g].disabled && l[g].focus();
        break;
      }
    }
  };
}
const wp = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function Rs(e) {
  return wp[e];
}
const xp = () => {
};
function Sp(e, t = { active: !0 }) {
  return typeof e != "function" || !t.active ? t.onKeyDown || xp : (n) => {
    var r;
    n.key === "Escape" && (e(n), (r = t.onTrigger) == null || r.call(t));
  };
}
function ue(e, t = "size", n = !0) {
  if (e !== void 0)
    return nc(e) ? n ? D(e) : e : `var(--${t}-${e})`;
}
function As(e) {
  return ue(e, "mantine-spacing");
}
function ut(e) {
  return e === void 0 ? "var(--mantine-radius-default)" : ue(e, "mantine-radius");
}
function at(e) {
  return ue(e, "mantine-font-size");
}
function Cp(e) {
  return ue(e, "mantine-line-height", !1);
}
function Ep(e) {
  if (e)
    return ue(e, "mantine-shadow", !1);
}
function yr(e, t) {
  return (n) => {
    e == null || e(n), t == null || t(n);
  };
}
function oc(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = oc(e[t])) && (r && (r += " "), r += n);
    else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function nt() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = oc(e)) && (r && (r += " "), r += t);
  return r;
}
const Pp = {};
function Dp(e) {
  const t = {};
  return e.forEach((n) => {
    Object.entries(n).forEach(([r, o]) => {
      t[r] ? t[r] = nt(t[r], o) : t[r] = o;
    });
  }), t;
}
function kr({ theme: e, classNames: t, props: n, stylesCtx: r }) {
  const s = (Array.isArray(t) ? t : [t]).map(
    (i) => typeof i == "function" ? i(e, n, r) : i || Pp
  );
  return Dp(s);
}
function vr({ theme: e, styles: t, props: n, stylesCtx: r }) {
  return (Array.isArray(t) ? t : [t]).reduce((s, i) => typeof i == "function" ? { ...s, ...i(e, n, r) } : { ...s, ...i }, {});
}
function sc() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}
function jt(e) {
  const t = V(e);
  return W(() => {
    t.current = e;
  }), dr(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Br(e, t) {
  const n = jt(e), r = V(0);
  return W(() => () => window.clearTimeout(r.current), []), ee(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
const Ia = ["mousedown", "touchstart"];
function Ip(e, t, n) {
  const r = V();
  return W(() => {
    const o = (s) => {
      const { target: i } = s ?? {};
      if (Array.isArray(n)) {
        const a = (i == null ? void 0 : i.hasAttribute("data-ignore-outside-clicks")) || !document.body.contains(i) && i.tagName !== "HTML";
        n.every((c) => !!c && !s.composedPath().includes(c)) && !a && e();
      } else
        r.current && !r.current.contains(i) && e();
    };
    return (t || Ia).forEach((s) => document.addEventListener(s, o)), () => {
      (t || Ia).forEach((s) => document.removeEventListener(s, o));
    };
  }, [r, e, n]), r;
}
function Rp(e, t) {
  try {
    return e.addEventListener("change", t), () => e.removeEventListener("change", t);
  } catch {
    return e.addListener(t), () => e.removeListener(t);
  }
}
function Ap(e, t) {
  return typeof t == "boolean" ? t : typeof window < "u" && "matchMedia" in window ? window.matchMedia(e).matches : !1;
}
function Op(e, t, { getInitialValueInEffect: n } = {
  getInitialValueInEffect: !0
}) {
  const [r, o] = z(
    n ? t : Ap(e, t)
  ), s = V();
  return W(() => {
    if ("matchMedia" in window)
      return s.current = window.matchMedia(e), o(s.current.matches), Rp(s.current, (i) => o(i.matches));
  }, [e]), r;
}
const _n = typeof document < "u" ? Lr : W;
function It(e, t) {
  const n = V(!1);
  W(
    () => () => {
      n.current = !1;
    },
    []
  ), W(() => {
    if (n.current)
      return e();
    n.current = !0;
  }, t);
}
function Np({ opened: e, shouldReturnFocus: t = !0 }) {
  const n = V(), r = () => {
    var o;
    n.current && "focus" in n.current && typeof n.current.focus == "function" && ((o = n.current) == null || o.focus({ preventScroll: !0 }));
  };
  return It(() => {
    let o = -1;
    const s = (i) => {
      i.key === "Tab" && window.clearTimeout(o);
    };
    return document.addEventListener("keydown", s), e ? n.current = document.activeElement : t && (o = window.setTimeout(r, 10)), () => {
      window.clearTimeout(o), document.removeEventListener("keydown", s);
    };
  }, [e, t]), r;
}
function $p(e, t = "body > :not(script)") {
  const n = sc(), r = Array.from(
    document.querySelectorAll(t)
  ).map((o) => {
    var l;
    if ((l = o == null ? void 0 : o.shadowRoot) != null && l.contains(e) || o.contains(e))
      return;
    const s = o.getAttribute("aria-hidden"), i = o.getAttribute("data-hidden"), a = o.getAttribute("data-focus-id");
    return o.setAttribute("data-focus-id", n), s === null || s === "false" ? o.setAttribute("aria-hidden", "true") : !i && !a && o.setAttribute("data-hidden", s), {
      node: o,
      ariaHidden: i || null
    };
  });
  return () => {
    r.forEach((o) => {
      !o || n !== o.node.getAttribute("data-focus-id") || (o.ariaHidden === null ? o.node.removeAttribute("aria-hidden") : o.node.setAttribute("aria-hidden", o.ariaHidden), o.node.removeAttribute("data-focus-id"), o.node.removeAttribute("data-hidden"));
    });
  };
}
const Tp = /input|select|textarea|button|object/, ic = "a, input, select, textarea, button, object, [tabindex]";
function Lp(e) {
  return e.style.display === "none";
}
function Mp(e) {
  if (e.getAttribute("aria-hidden") || e.getAttribute("hidden") || e.getAttribute("type") === "hidden")
    return !1;
  let n = e;
  for (; n && !(n === document.body || n.nodeType === 11); ) {
    if (Lp(n))
      return !1;
    n = n.parentNode;
  }
  return !0;
}
function ac(e) {
  let t = e.getAttribute("tabindex");
  return t === null && (t = void 0), parseInt(t, 10);
}
function ls(e) {
  const t = e.nodeName.toLowerCase(), n = !Number.isNaN(ac(e));
  return /* @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition */ (Tp.test(t) && !e.disabled || e instanceof HTMLAnchorElement && e.href || n) && Mp(e);
}
function lc(e) {
  const t = ac(e);
  return (Number.isNaN(t) || t >= 0) && ls(e);
}
function Fp(e) {
  return Array.from(e.querySelectorAll(ic)).filter(lc);
}
function kp(e, t) {
  const n = Fp(e);
  if (!n.length) {
    t.preventDefault();
    return;
  }
  const r = n[t.shiftKey ? 0 : n.length - 1], o = e.getRootNode();
  let s = r === o.activeElement || e === o.activeElement;
  const i = o.activeElement;
  if (i.tagName === "INPUT" && i.getAttribute("type") === "radio" && (s = n.filter(
    (f) => f.getAttribute("type") === "radio" && f.getAttribute("name") === i.getAttribute("name")
  ).includes(r)), !s)
    return;
  t.preventDefault();
  const l = n[t.shiftKey ? n.length - 1 : 0];
  l && l.focus();
}
function Bp(e = !0) {
  const t = V(), n = V(null), r = (s) => {
    let i = s.querySelector("[data-autofocus]");
    if (!i) {
      const a = Array.from(s.querySelectorAll(ic));
      i = a.find(lc) || a.find(ls) || null, !i && ls(s) && (i = s);
    }
    i && i.focus({ preventScroll: !0 });
  }, o = ee(
    (s) => {
      if (e) {
        if (s === null) {
          n.current && (n.current(), n.current = null);
          return;
        }
        n.current = $p(s), t.current !== s && (s ? (setTimeout(() => {
          s.getRootNode() && r(s);
        }), t.current = s) : t.current = null);
      }
    },
    [e]
  );
  return W(() => {
    if (!e)
      return;
    t.current && setTimeout(() => r(t.current));
    const s = (i) => {
      i.key === "Tab" && t.current && kp(t.current, i);
    };
    return document.addEventListener("keydown", s), () => {
      document.removeEventListener("keydown", s), n.current && n.current();
    };
  }, [e]), o;
}
const _p = v["useId".toString()] || (() => {
});
function jp() {
  const e = _p();
  return e ? `mantine-${e.replace(/:/g, "")}` : "";
}
function Mt(e) {
  const t = jp(), [n, r] = z(t);
  return _n(() => {
    r(sc());
  }, []), typeof e == "string" ? e : typeof window > "u" ? t : n;
}
function cc(e, t) {
  typeof e == "function" ? e(t) : typeof e == "object" && e !== null && "current" in e && (e.current = t);
}
function uc(...e) {
  return (t) => {
    e.forEach((n) => cc(n, t));
  };
}
function Pe(...e) {
  return ee(uc(...e), e);
}
function Rt({
  value: e,
  defaultValue: t,
  finalValue: n,
  onChange: r = () => {
  }
}) {
  const [o, s] = z(
    t !== void 0 ? t : n
  ), i = (a) => {
    s(a), r == null || r(a);
  };
  return e !== void 0 ? [e, r, !0] : [o, i, !1];
}
function dc(e, t) {
  return Op("(prefers-reduced-motion: reduce)", e, t);
}
function Vp(e = !1, t) {
  const { onOpen: n, onClose: r } = t || {}, [o, s] = z(e), i = ee(() => {
    s((c) => c || (n == null || n(), !0));
  }, [n]), a = ee(() => {
    s((c) => c && (r == null || r(), !1));
  }, [r]), l = ee(() => {
    o ? a() : i();
  }, [a, i, o]);
  return [o, { open: i, close: a, toggle: l }];
}
const fc = qt(null);
function Os() {
  const e = ct(fc);
  if (!e)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return e;
}
function Gp() {
  return Os().cssVariablesResolver;
}
function Wp() {
  return Os().classNamesPrefix;
}
function Ns() {
  return Os().getStyleNonce;
}
function zp(e) {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(e);
}
function Hp(e) {
  let t = e.replace("#", "");
  if (t.length === 3) {
    const i = t.split("");
    t = [
      i[0],
      i[0],
      i[1],
      i[1],
      i[2],
      i[2]
    ].join("");
  }
  const n = parseInt(t, 16), r = n >> 16 & 255, o = n >> 8 & 255, s = n & 255;
  return {
    r,
    g: o,
    b: s,
    a: 1
  };
}
function Up(e) {
  const [t, n, r, o] = e.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r: t, g: n, b: r, a: o || 1 };
}
function qp(e) {
  const t = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, n = e.match(t);
  if (!n)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const r = parseInt(n[1], 10), o = parseInt(n[2], 10) / 100, s = parseInt(n[3], 10) / 100, i = n[5] ? parseFloat(n[5]) : void 0, a = (1 - Math.abs(2 * s - 1)) * o, l = r / 60, c = a * (1 - Math.abs(l % 2 - 1)), f = s - a / 2;
  let u, d, p;
  return l >= 0 && l < 1 ? (u = a, d = c, p = 0) : l >= 1 && l < 2 ? (u = c, d = a, p = 0) : l >= 2 && l < 3 ? (u = 0, d = a, p = c) : l >= 3 && l < 4 ? (u = 0, d = c, p = a) : l >= 4 && l < 5 ? (u = c, d = 0, p = a) : (u = a, d = 0, p = c), {
    r: Math.round((u + f) * 255),
    g: Math.round((d + f) * 255),
    b: Math.round((p + f) * 255),
    a: i || 1
  };
}
function pc(e) {
  return zp(e) ? Hp(e) : e.startsWith("rgb") ? Up(e) : e.startsWith("hsl") ? qp(e) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function Zn(e, t) {
  if (e.startsWith("var("))
    return e;
  const { r: n, g: r, b: o, a: s } = pc(e), i = 1 - t, a = (l) => Math.round(l * i);
  return `rgba(${a(n)}, ${a(r)}, ${a(o)}, ${s})`;
}
function cs(e, t) {
  return typeof e.primaryShade == "number" ? e.primaryShade : t === "dark" ? e.primaryShade.dark : e.primaryShade.light;
}
function $s({
  color: e,
  theme: t,
  colorScheme: n
}) {
  if (typeof e != "string")
    throw new Error(`[@mantine/core] Failed to parse color. Instead got ${typeof e}`);
  if (e === "white" || e === "black")
    return {
      color: e,
      value: e === "white" ? t.white : t.black,
      shade: void 0,
      isThemeColor: !1,
      variable: `--mantine-color-${e}`
    };
  const [r, o] = e.split("."), s = o ? Number(o) : void 0, i = r in t.colors;
  return i ? {
    color: r,
    value: s !== void 0 ? t.colors[r][s] : t.colors[r][cs(t, n || "light")],
    shade: s,
    isThemeColor: i,
    variable: o ? `--mantine-color-${r}-${s}` : `--mantine-color-${r}-filled`
  } : {
    color: e,
    value: e,
    isThemeColor: i,
    shade: s,
    variable: void 0
  };
}
function mt(e, t) {
  const n = $s({ color: e || t.primaryColor, theme: t });
  return n.variable ? `var(${n.variable})` : e;
}
function us(e, t) {
  const n = {
    from: (e == null ? void 0 : e.from) || t.defaultGradient.from,
    to: (e == null ? void 0 : e.to) || t.defaultGradient.to,
    deg: (e == null ? void 0 : e.deg) || t.defaultGradient.deg || 0
  }, r = mt(n.from, t), o = mt(n.to, t);
  return `linear-gradient(${n.deg}deg, ${r} 0%, ${o} 100%)`;
}
function Ae(e, t) {
  if (typeof e != "string" || t > 1 || t < 0)
    return "rgba(0, 0, 0, 1)";
  const { r: n, g: r, b: o } = pc(e);
  return `rgba(${n}, ${r}, ${o}, ${t})`;
}
const Kp = ({
  color: e,
  theme: t,
  variant: n,
  gradient: r
}) => {
  const o = $s({ color: e, theme: t });
  if (n === "filled")
    return o.isThemeColor ? o.shade === void 0 ? {
      background: `var(--mantine-color-${e}-filled)`,
      hover: `var(--mantine-color-${e}-filled-hover)`,
      color: "var(--mantine-color-white)",
      border: `${D(1)} solid transparent`
    } : {
      background: `var(--mantine-color-${o.color}-${o.shade})`,
      hover: `var(--mantine-color-${o.color}-${o.shade === 9 ? 8 : o.shade + 1})`,
      color: "var(--mantine-color-white)",
      border: `${D(1)} solid transparent`
    } : {
      background: e,
      hover: Zn(e, 0.1),
      color: "var(--mantine-color-white)",
      border: `${D(1)} solid transparent`
    };
  if (n === "light") {
    if (o.isThemeColor) {
      if (o.shade === void 0)
        return {
          background: `var(--mantine-color-${e}-light)`,
          hover: `var(--mantine-color-${e}-light-hover)`,
          color: `var(--mantine-color-${e}-light-color)`,
          border: `${D(1)} solid transparent`
        };
      const s = t.colors[o.color][o.shade];
      return {
        background: Ae(s, 0.1),
        hover: Ae(s, 0.12),
        color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
        border: `${D(1)} solid transparent`
      };
    }
    return {
      background: Ae(e, 0.1),
      hover: Ae(e, 0.12),
      color: e,
      border: `${D(1)} solid transparent`
    };
  }
  if (n === "outline")
    return o.isThemeColor ? o.shade === void 0 ? {
      background: "transparent",
      hover: `var(--mantine-color-${e}-outline-hover)`,
      color: `var(--mantine-color-${e}-outline)`,
      border: `${D(1)} solid var(--mantine-color-${e}-outline)`
    } : {
      background: "transparent",
      hover: Ae(t.colors[o.color][o.shade], 0.05),
      color: `var(--mantine-color-${o.color}-${o.shade})`,
      border: `${D(1)} solid var(--mantine-color-${o.color}-${o.shade})`
    } : {
      background: "transparent",
      hover: Ae(e, 0.05),
      color: e,
      border: `${D(1)} solid ${e}`
    };
  if (n === "subtle") {
    if (o.isThemeColor) {
      if (o.shade === void 0)
        return {
          background: "transparent",
          hover: `var(--mantine-color-${e}-light-hover)`,
          color: `var(--mantine-color-${e}-light-color)`,
          border: `${D(1)} solid transparent`
        };
      const s = t.colors[o.color][o.shade];
      return {
        background: "transparent",
        hover: Ae(s, 0.12),
        color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
        border: `${D(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: Ae(e, 0.12),
      color: e,
      border: `${D(1)} solid transparent`
    };
  }
  return n === "transparent" ? o.isThemeColor ? o.shade === void 0 ? {
    background: "transparent",
    hover: "transparent",
    color: `var(--mantine-color-${e}-light-color)`,
    border: `${D(1)} solid transparent`
  } : {
    background: "transparent",
    hover: "transparent",
    color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
    border: `${D(1)} solid transparent`
  } : {
    background: "transparent",
    hover: "transparent",
    color: e,
    border: `${D(1)} solid transparent`
  } : n === "white" ? o.isThemeColor ? o.shade === void 0 ? {
    background: "var(--mantine-color-white)",
    hover: Zn(t.white, 0.01),
    color: `var(--mantine-color-${e}-filled)`,
    border: `${D(1)} solid transparent`
  } : {
    background: "var(--mantine-color-white)",
    hover: Zn(t.white, 0.01),
    color: `var(--mantine-color-${o.color}-${o.shade})`,
    border: `${D(1)} solid transparent`
  } : {
    background: "var(--mantine-color-white)",
    hover: Zn(t.white, 0.01),
    color: e,
    border: `${D(1)} solid transparent`
  } : n === "gradient" ? {
    background: us(r, t),
    hover: us(r, t),
    color: "var(--mantine-color-white)",
    border: "none"
  } : n === "default" ? {
    background: "var(--mantine-color-default)",
    hover: "var(--mantine-color-default-hover)",
    color: "var(--mantine-color-default-color)",
    border: `${D(1)} solid var(--mantine-color-default-border)`
  } : {};
}, Yp = {
  dark: [
    "#C9C9C9",
    "#b8b8b8",
    "#828282",
    "#696969",
    "#424242",
    "#3b3b3b",
    "#2e2e2e",
    "#242424",
    "#1f1f1f",
    "#141414"
  ],
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529"
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a"
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d"
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c"
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4"
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab"
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285"
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f"
  ]
}, Ra = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji", Ts = {
  scale: 1,
  fontSmoothing: !0,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: Yp,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: Kp,
  fontFamily: Ra,
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  respectReducedMotion: !1,
  cursorType: "default",
  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
  defaultRadius: "sm",
  activeClassName: "mantine-active",
  focusClassName: "",
  headings: {
    fontFamily: Ra,
    fontWeight: "700",
    sizes: {
      h1: { fontSize: D(34), lineHeight: "1.3" },
      h2: { fontSize: D(26), lineHeight: "1.35" },
      h3: { fontSize: D(22), lineHeight: "1.4" },
      h4: { fontSize: D(18), lineHeight: "1.45" },
      h5: { fontSize: D(16), lineHeight: "1.5" },
      h6: { fontSize: D(14), lineHeight: "1.5" }
    }
  },
  fontSizes: {
    xs: D(12),
    sm: D(14),
    md: D(16),
    lg: D(18),
    xl: D(20)
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65"
  },
  radius: {
    xs: D(2),
    sm: D(4),
    md: D(8),
    lg: D(16),
    xl: D(32)
  },
  spacing: {
    xs: D(10),
    sm: D(12),
    md: D(16),
    lg: D(20),
    xl: D(32)
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  shadows: {
    xs: `0 ${D(1)} ${D(3)} rgba(0, 0, 0, 0.05), 0 ${D(1)} ${D(2)} rgba(0, 0, 0, 0.1)`,
    sm: `0 ${D(1)} ${D(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${D(10)} ${D(
      15
    )} ${D(-5)}, rgba(0, 0, 0, 0.04) 0 ${D(7)} ${D(7)} ${D(-5)}`,
    md: `0 ${D(1)} ${D(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${D(20)} ${D(
      25
    )} ${D(-5)}, rgba(0, 0, 0, 0.04) 0 ${D(10)} ${D(10)} ${D(-5)}`,
    lg: `0 ${D(1)} ${D(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${D(28)} ${D(
      23
    )} ${D(-7)}, rgba(0, 0, 0, 0.04) 0 ${D(12)} ${D(12)} ${D(-7)}`,
    xl: `0 ${D(1)} ${D(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${D(36)} ${D(
      28
    )} ${D(-7)}, rgba(0, 0, 0, 0.04) 0 ${D(17)} ${D(17)} ${D(-7)}`
  },
  other: {},
  components: {}
};
function Aa(e) {
  return e === "auto" || e === "dark" || e === "light";
}
function Xp({
  key: e = "mantine-color-scheme-value"
} = {}) {
  let t;
  return {
    get: (n) => {
      if (typeof window > "u")
        return n;
      try {
        const r = window.localStorage.getItem(e);
        return Aa(r) ? r : n;
      } catch {
        return n;
      }
    },
    set: (n) => {
      try {
        window.localStorage.setItem(e, n);
      } catch (r) {
        console.warn(
          "[@mantine/core] Local storage color scheme manager was unable to save color scheme.",
          r
        );
      }
    },
    subscribe: (n) => {
      t = (r) => {
        r.storageArea === window.localStorage && r.key === e && Aa(r.newValue) && n(r.newValue);
      }, window.addEventListener("storage", t);
    },
    unsubscribe: () => {
      window.removeEventListener("storage", t);
    },
    clear: () => {
      window.localStorage.removeItem(e);
    }
  };
}
const Jp = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color", Oa = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function Mo(e) {
  return e < 0 || e > 9 ? !1 : parseInt(e.toString(), 10) === e;
}
function Na(e) {
  if (!(e.primaryColor in e.colors))
    throw new Error(Jp);
  if (typeof e.primaryShade == "object" && (!Mo(e.primaryShade.dark) || !Mo(e.primaryShade.light)))
    throw new Error(Oa);
  if (typeof e.primaryShade == "number" && !Mo(e.primaryShade))
    throw new Error(Oa);
}
function Qp(e, t) {
  var r;
  if (!t)
    return Na(e), e;
  const n = Ps(e, t);
  return t.fontFamily && !((r = t.headings) != null && r.fontFamily) && (n.headings.fontFamily = t.fontFamily), Na(n), n;
}
const Ls = qt(null), Zp = () => ct(Ls) || Ts;
function dt() {
  const e = ct(Ls);
  if (!e)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return e;
}
function mc({
  theme: e,
  children: t,
  inherit: n = !0
}) {
  const r = Zp(), o = dr(
    () => Qp(n ? r : Ts, e),
    [e, r, n]
  );
  return /* @__PURE__ */ v.createElement(Ls.Provider, { value: o }, t);
}
mc.displayName = "@mantine/core/MantineThemeProvider";
function em() {
  const e = dt(), t = Ns(), n = it(e.breakpoints).reduce((r, o) => {
    const s = hp(e.breakpoints[o]);
    return `${r}@media (max-width: ${Da(
      s - 0.1
    )}) {.mantine-visible-from-${o} {display: none !important;}}@media (min-width: ${Da(
      s
    )}) {.mantine-hidden-from-${o} {display: none !important;}}`;
  }, "");
  return /* @__PURE__ */ v.createElement(
    "style",
    {
      "data-mantine-styles": "classes",
      nonce: t == null ? void 0 : t(),
      dangerouslySetInnerHTML: { __html: n }
    }
  );
}
function Fo(e) {
  return Object.entries(e).map(([t, n]) => `${t}: ${n};`).join("");
}
function ko(e, t) {
  return (Array.isArray(e) ? e : [e]).reduce((r, o) => `${o}{${r}}`, t);
}
function tm(e, t) {
  const n = Fo(e.variables), r = n ? ko(t, n) : "", o = Fo(e.dark), s = o ? ko(`${t}[data-mantine-color-scheme="dark"]`, o) : "", i = Fo(e.light), a = i ? ko(`${t}[data-mantine-color-scheme="light"]`, i) : "";
  return `${r}${s}${a}`;
}
function Zt(e, t, n) {
  it(t).forEach(
    (r) => Object.assign(e, { [`--mantine-${n}-${r}`]: t[r] })
  );
}
const gc = (e) => {
  const t = cs(e, "dark"), n = cs(e, "light"), r = e.defaultRadius in e.radius ? e.radius[e.defaultRadius] : D(e.defaultRadius), o = {
    variables: {
      "--mantine-scale": e.scale.toString(),
      "--mantine-cursor-type": e.cursorType,
      "--mantine-webkit-font-smoothing": e.fontSmoothing ? "antialiased" : "unset",
      "--mantine-color-scheme": "light dark",
      "--mantine-moz-font-smoothing": e.fontSmoothing ? "grayscale" : "unset",
      "--mantine-color-white": e.white,
      "--mantine-color-black": e.black,
      "--mantine-line-height": e.lineHeights.md,
      "--mantine-font-family": e.fontFamily,
      "--mantine-font-family-monospace": e.fontFamilyMonospace,
      "--mantine-font-family-headings": e.headings.fontFamily,
      "--mantine-heading-font-weight": e.headings.fontWeight,
      "--mantine-radius-default": r,
      // Primary colors
      "--mantine-primary-color-filled": `var(--mantine-color-${e.primaryColor}-filled)`,
      "--mantine-primary-color-filled-hover": `var(--mantine-color-${e.primaryColor}-filled-hover)`,
      "--mantine-primary-color-light": `var(--mantine-color-${e.primaryColor}-light)`,
      "--mantine-primary-color-light-hover": `var(--mantine-color-${e.primaryColor}-light-hover)`,
      "--mantine-primary-color-light-color": `var(--mantine-color-${e.primaryColor}-light-color)`
    },
    light: {
      "--mantine-color-bright": "var(--mantine-color-black)",
      "--mantine-color-text": e.black,
      "--mantine-color-body": e.white,
      "--mantine-color-error": "var(--mantine-color-red-6)",
      "--mantine-color-placeholder": "var(--mantine-color-gray-5)",
      "--mantine-color-anchor": `var(--mantine-color-${e.primaryColor}-${n})`,
      "--mantine-color-default": "var(--mantine-color-white)",
      "--mantine-color-default-hover": "var(--mantine-color-gray-0)",
      "--mantine-color-default-color": "var(--mantine-color-black)",
      "--mantine-color-default-border": "var(--mantine-color-gray-4)"
    },
    dark: {
      "--mantine-color-bright": "var(--mantine-color-white)",
      "--mantine-color-text": "var(--mantine-color-dark-0)",
      "--mantine-color-body": "var(--mantine-color-dark-7)",
      "--mantine-color-error": "var(--mantine-color-red-8)",
      "--mantine-color-placeholder": "var(--mantine-color-dark-3)",
      "--mantine-color-anchor": `var(--mantine-color-${e.primaryColor}-4)`,
      "--mantine-color-default": "var(--mantine-color-dark-6)",
      "--mantine-color-default-hover": "var(--mantine-color-dark-5)",
      "--mantine-color-default-color": "var(--mantine-color-white)",
      "--mantine-color-default-border": "var(--mantine-color-dark-4)"
    }
  };
  Zt(o.variables, e.breakpoints, "breakpoint"), Zt(o.variables, e.spacing, "spacing"), Zt(o.variables, e.fontSizes, "font-size"), Zt(o.variables, e.lineHeights, "line-height"), Zt(o.variables, e.shadows, "shadow"), Zt(o.variables, e.radius, "radius"), e.colors[e.primaryColor].forEach((i, a) => {
    o.variables[`--mantine-primary-color-${a}`] = `var(--mantine-color-${e.primaryColor}-${a})`;
  }), it(e.colors).forEach((i) => {
    e.colors[i].forEach((c, f) => {
      o.variables[`--mantine-color-${i}-${f}`] = c;
    });
    const a = `var(--mantine-color-${i}-${n === 9 ? 8 : n + 1})`, l = `var(--mantine-color-${i}-${t === 9 ? 8 : t + 1})`;
    o.light["--mantine-color-dimmed"] = "var(--mantine-color-gray-6)", o.light[`--mantine-color-${i}-text`] = `var(--mantine-color-${i}-filled)`, o.light[`--mantine-color-${i}-filled`] = `var(--mantine-color-${i}-${n})`, o.light[`--mantine-color-${i}-filled-hover`] = a, o.light[`--mantine-color-${i}-light`] = Ae(
      e.colors[i][n],
      0.1
    ), o.light[`--mantine-color-${i}-light-hover`] = Ae(
      e.colors[i][n],
      0.12
    ), o.light[`--mantine-color-${i}-light-color`] = `var(--mantine-color-${i}-${n})`, o.light[`--mantine-color-${i}-outline`] = `var(--mantine-color-${i}-${n})`, o.light[`--mantine-color-${i}-outline-hover`] = Ae(
      e.colors[i][n],
      0.05
    ), o.dark["--mantine-color-dimmed"] = "var(--mantine-color-dark-2)", o.dark[`--mantine-color-${i}-text`] = `var(--mantine-color-${i}-4)`, o.dark[`--mantine-color-${i}-filled`] = `var(--mantine-color-${i}-${t})`, o.dark[`--mantine-color-${i}-filled-hover`] = l, o.dark[`--mantine-color-${i}-light`] = Ae(
      e.colors[i][Math.max(0, t - 2)],
      0.15
    ), o.dark[`--mantine-color-${i}-light-hover`] = Ae(
      e.colors[i][Math.max(0, t - 2)],
      0.2
    ), o.dark[`--mantine-color-${i}-light-color`] = `var(--mantine-color-${i}-${Math.max(
      t - 5,
      0
    )})`, o.dark[`--mantine-color-${i}-outline`] = `var(--mantine-color-${i}-${Math.max(
      t - 4,
      0
    )})`, o.dark[`--mantine-color-${i}-outline-hover`] = Ae(
      e.colors[i][Math.max(t - 4, 0)],
      0.05
    );
  });
  const s = e.headings.sizes;
  return it(s).forEach((i) => {
    o.variables[`--mantine-${i}-font-size`] = s[i].fontSize, o.variables[`--mantine-${i}-line-height`] = s[i].lineHeight, o.variables[`--mantine-${i}-font-weight`] = s[i].fontWeight || e.headings.fontWeight;
  }), o;
};
function nm({ theme: e, generator: t }) {
  const n = gc(e), r = t == null ? void 0 : t(e);
  return r ? Ps(n, r) : n;
}
const Bo = gc(Ts);
function rm(e) {
  const t = {
    variables: {},
    light: {},
    dark: {}
  };
  return it(e.variables).forEach((n) => {
    Bo.variables[n] !== e.variables[n] && (t.variables[n] = e.variables[n]);
  }), it(e.light).forEach((n) => {
    Bo.light[n] !== e.light[n] && (t.light[n] = e.light[n]);
  }), it(e.dark).forEach((n) => {
    Bo.dark[n] !== e.dark[n] && (t.dark[n] = e.dark[n]);
  }), t;
}
function om(e) {
  return `
  ${e}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${e}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
}
function hc({ cssVariablesSelector: e }) {
  const t = dt(), n = Ns(), r = Gp(), o = nm({ theme: t, generator: r }), s = e === ":root", i = s ? rm(o) : o, a = tm(i, e);
  return a ? /* @__PURE__ */ v.createElement(
    "style",
    {
      "data-mantine-styles": !0,
      nonce: n == null ? void 0 : n(),
      dangerouslySetInnerHTML: {
        __html: `${a}${s ? "" : om(e)}`
      }
    }
  ) : null;
}
hc.displayName = "@mantine/CssVariables";
function sm() {
  const e = console.error;
  console.error = (...t) => {
    t.length > 1 && typeof t[0] == "string" && t[0].toLowerCase().includes("extra attributes from the server") && typeof t[1] == "string" && t[1].toLowerCase().includes("data-mantine-color-scheme") || e(...t);
  };
}
function wn(e, t) {
  var r;
  const n = e !== "auto" ? e : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  (r = t()) == null || r.setAttribute("data-mantine-color-scheme", n);
}
function im({
  manager: e,
  defaultColorScheme: t,
  getRootElement: n,
  forceColorScheme: r
}) {
  const o = V(), [s, i] = z(() => e.get(t)), a = r || s, l = ee(
    (f) => {
      r || (wn(f, n), i(f), e.set(f));
    },
    [e.set, a, r]
  ), c = ee(() => {
    i(t), wn(t, n), e.clear();
  }, [e.clear, t]);
  return W(() => (e.subscribe(l), e.unsubscribe), [e.subscribe, e.unsubscribe]), _n(() => {
    wn(e.get(t), n);
  }, []), W(() => {
    var u;
    if (r)
      return wn(r, n), () => {
      };
    o.current = window.matchMedia("(prefers-color-scheme: dark)");
    const f = (d) => {
      s === "auto" && wn(d.matches ? "dark" : "light", n);
    };
    return (u = o.current) == null || u.addEventListener("change", f), () => {
      var d;
      return (d = o.current) == null ? void 0 : d.removeEventListener("change", f);
    };
  }, [s, r]), { colorScheme: a, setColorScheme: l, clearColorScheme: c };
}
function am({
  respectReducedMotion: e,
  getRootElement: t
}) {
  _n(() => {
    var n;
    e && ((n = t()) == null || n.setAttribute("data-respect-reduced-motion", "true"));
  }, [e]);
}
sm();
function bc({
  theme: e,
  children: t,
  getStyleNonce: n,
  withCssVariables: r = !0,
  cssVariablesSelector: o = ":root",
  classNamesPrefix: s = "mantine",
  colorSchemeManager: i = Xp(),
  defaultColorScheme: a = "light",
  getRootElement: l = () => document.documentElement,
  cssVariablesResolver: c,
  forceColorScheme: f
}) {
  const { colorScheme: u, setColorScheme: d, clearColorScheme: p } = im({
    defaultColorScheme: a,
    forceColorScheme: f,
    manager: i,
    getRootElement: l
  });
  return am({
    respectReducedMotion: (e == null ? void 0 : e.respectReducedMotion) || !1,
    getRootElement: l
  }), /* @__PURE__ */ v.createElement(
    fc.Provider,
    {
      value: {
        colorSchemeManager: i,
        colorScheme: u,
        setColorScheme: d,
        clearColorScheme: p,
        getRootElement: l,
        classNamesPrefix: s,
        getStyleNonce: n,
        cssVariablesResolver: c,
        cssVariablesSelector: o
      }
    },
    /* @__PURE__ */ v.createElement(mc, { theme: e }, r && /* @__PURE__ */ v.createElement(hc, { cssVariablesSelector: o }), /* @__PURE__ */ v.createElement(em, null), t)
  );
}
bc.displayName = "@mantine/core/MantineProvider";
function yc({
  classNames: e,
  styles: t,
  props: n,
  stylesCtx: r
}) {
  const o = dt();
  return {
    resolvedClassNames: kr({
      theme: o,
      classNames: e,
      props: n,
      stylesCtx: r || void 0
    }),
    resolvedStyles: vr({
      theme: o,
      styles: t,
      props: n,
      stylesCtx: r || void 0
    })
  };
}
const lm = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function cm({ theme: e, options: t, unstyled: n }) {
  return nt(
    (t == null ? void 0 : t.focusable) && !n && (e.focusClassName || lm[e.focusRing]),
    (t == null ? void 0 : t.active) && !n && e.activeClassName
  );
}
function um({
  selector: e,
  stylesCtx: t,
  options: n,
  props: r,
  theme: o
}) {
  return kr({
    theme: o,
    classNames: n == null ? void 0 : n.classNames,
    props: (n == null ? void 0 : n.props) || r,
    stylesCtx: t
  })[e];
}
function dm({
  selector: e,
  stylesCtx: t,
  theme: n,
  classNames: r,
  props: o
}) {
  return kr({ theme: n, classNames: r, props: o, stylesCtx: t })[e];
}
function fm({ rootSelector: e, selector: t, className: n }) {
  return e === t ? n : void 0;
}
function pm({ selector: e, classes: t, unstyled: n }) {
  return n ? void 0 : t[e];
}
function mm({
  themeName: e,
  classNamesPrefix: t,
  selector: n
}) {
  return e.map((r) => `${t}-${r}-${n}`);
}
function gm({
  themeName: e,
  theme: t,
  selector: n,
  props: r,
  stylesCtx: o
}) {
  return e.map(
    (s) => {
      var i, a;
      return (a = kr({
        theme: t,
        classNames: (i = t.components[s]) == null ? void 0 : i.classNames,
        props: r,
        stylesCtx: o
      })) == null ? void 0 : a[n];
    }
  );
}
function hm({
  options: e,
  classes: t,
  selector: n,
  unstyled: r
}) {
  return e != null && e.variant && !r ? t[`${n}--${e.variant}`] : void 0;
}
function bm({
  theme: e,
  options: t,
  themeName: n,
  selector: r,
  classNamesPrefix: o,
  classNames: s,
  classes: i,
  unstyled: a,
  className: l,
  rootSelector: c,
  props: f,
  stylesCtx: u
}) {
  return nt(
    cm({ theme: e, options: t, unstyled: a }),
    gm({ theme: e, themeName: n, selector: r, props: f, stylesCtx: u }),
    hm({ options: t, classes: i, selector: r, unstyled: a }),
    dm({ selector: r, stylesCtx: u, theme: e, classNames: s, props: f }),
    um({ selector: r, stylesCtx: u, options: t, props: f, theme: e }),
    fm({ rootSelector: c, selector: r, className: l }),
    pm({ selector: r, classes: i, unstyled: a }),
    mm({ themeName: n, classNamesPrefix: o, selector: r }),
    t == null ? void 0 : t.className
  );
}
function ym({
  theme: e,
  themeName: t,
  props: n,
  stylesCtx: r,
  selector: o
}) {
  return t.map(
    (s) => {
      var i;
      return vr({
        theme: e,
        styles: (i = e.components[s]) == null ? void 0 : i.styles,
        props: n,
        stylesCtx: r
      })[o];
    }
  ).reduce((s, i) => ({ ...s, ...i }), {});
}
function ds({ style: e, theme: t }) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...ds({ style: r, theme: t }) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function vm(e) {
  return e.reduce((t, n) => (n && Object.keys(n).forEach((r) => {
    t[r] = { ...t[r], ...Ds(n[r]) };
  }), t), {});
}
function wm({
  vars: e,
  varsResolver: t,
  theme: n,
  props: r,
  stylesCtx: o,
  selector: s,
  themeName: i
}) {
  var a;
  return (a = vm([
    t == null ? void 0 : t(n, r, o),
    ...i.map((l) => {
      var c, f, u;
      return (u = (f = (c = n.components) == null ? void 0 : c[l]) == null ? void 0 : f.vars) == null ? void 0 : u.call(f, n, r, o);
    }),
    e == null ? void 0 : e(n, r, o)
  ])) == null ? void 0 : a[s];
}
function xm({
  theme: e,
  themeName: t,
  selector: n,
  options: r,
  props: o,
  stylesCtx: s,
  rootSelector: i,
  styles: a,
  style: l,
  vars: c,
  varsResolver: f
}) {
  return {
    ...ym({ theme: e, themeName: t, props: o, stylesCtx: s, selector: n }),
    ...vr({ theme: e, styles: a, props: o, stylesCtx: s })[n],
    ...vr({ theme: e, styles: r == null ? void 0 : r.styles, props: (r == null ? void 0 : r.props) || o, stylesCtx: s })[n],
    ...wm({ theme: e, props: o, stylesCtx: s, vars: c, varsResolver: f, selector: n, themeName: t }),
    ...i === n ? ds({ style: l, theme: e }) : null,
    ...ds({ style: r == null ? void 0 : r.style, theme: e })
  };
}
function te({
  name: e,
  classes: t,
  props: n,
  stylesCtx: r,
  className: o,
  style: s,
  rootSelector: i = "root",
  unstyled: a,
  classNames: l,
  styles: c,
  vars: f,
  varsResolver: u
}) {
  const d = dt(), p = Wp(), m = (Array.isArray(e) ? e : [e]).filter((g) => g);
  return (g, h) => ({
    className: bm({
      theme: d,
      options: h,
      themeName: m,
      selector: g,
      classNamesPrefix: p,
      classNames: l,
      classes: t,
      unstyled: a,
      className: o,
      rootSelector: i,
      props: n,
      stylesCtx: r
    }),
    style: xm({
      theme: d,
      themeName: m,
      selector: g,
      options: h,
      props: n,
      stylesCtx: r,
      rootSelector: i,
      styles: c,
      style: s,
      vars: f,
      varsResolver: u
    })
  });
}
function j(e, t, n) {
  var i;
  const r = dt(), o = (i = r.components[e]) == null ? void 0 : i.defaultProps, s = typeof o == "function" ? o(r) : o;
  return { ...t, ...s, ...Ds(n) };
}
function $a(e) {
  return it(e).reduce(
    (t, n) => e[n] !== void 0 ? `${t}${mp(n)}:${e[n]};` : t,
    ""
  ).trim();
}
function Sm({ selector: e, styles: t, media: n }) {
  const r = t ? $a(t) : "", o = Array.isArray(n) ? n.map((s) => `@media${s.query}{${e}{${$a(s.styles)}}}`) : [];
  return `${r ? `${e}{${r}}` : ""}${o.join("")}`.trim();
}
function Cm({ selector: e, styles: t, media: n }) {
  const r = Ns();
  return /* @__PURE__ */ v.createElement(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: r == null ? void 0 : r(),
      dangerouslySetInnerHTML: { __html: Sm({ selector: e, styles: t, media: n }) }
    }
  );
}
function _r(e) {
  const {
    m: t,
    mx: n,
    my: r,
    mt: o,
    mb: s,
    ml: i,
    mr: a,
    p: l,
    px: c,
    py: f,
    pt: u,
    pb: d,
    pl: p,
    pr: m,
    bg: g,
    c: h,
    opacity: w,
    ff: x,
    fz: b,
    fw: y,
    lts: S,
    ta: C,
    lh: E,
    fs: P,
    tt: L,
    td: T,
    w: N,
    miw: M,
    maw: F,
    h: A,
    mih: $,
    mah: R,
    bgsz: B,
    bgp: O,
    bgr: H,
    bga: X,
    pos: ne,
    top: ge,
    left: le,
    bottom: De,
    right: he,
    inset: re,
    display: be,
    hiddenFrom: Oe,
    visibleFrom: we,
    lightHidden: xe,
    darkHidden: Ne,
    ...ie
  } = e;
  return { styleProps: Ds({
    m: t,
    mx: n,
    my: r,
    mt: o,
    mb: s,
    ml: i,
    mr: a,
    p: l,
    px: c,
    py: f,
    pt: u,
    pb: d,
    pl: p,
    pr: m,
    bg: g,
    c: h,
    opacity: w,
    ff: x,
    fz: b,
    fw: y,
    lts: S,
    ta: C,
    lh: E,
    fs: P,
    tt: L,
    td: T,
    w: N,
    miw: M,
    maw: F,
    h: A,
    mih: $,
    mah: R,
    bgsz: B,
    bgp: O,
    bgr: H,
    bga: X,
    pos: ne,
    top: ge,
    left: le,
    bottom: De,
    right: he,
    inset: re,
    display: be,
    hiddenFrom: Oe,
    visibleFrom: we,
    lightHidden: xe,
    darkHidden: Ne
  }), rest: ie };
}
const Em = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  mx: { type: "spacing", property: ["marginRight", "marginLeft"] },
  my: { type: "spacing", property: ["marginTop", "marginBottom"] },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  px: { type: "spacing", property: ["paddingRight", "paddingLeft"] },
  py: { type: "spacing", property: ["paddingTop", "paddingBottom"] },
  bg: { type: "color", property: "background" },
  c: { type: "color", property: "color" },
  opacity: { type: "identity", property: "opacity" },
  ff: { type: "identity", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "identity", property: "fontWeight" },
  lts: { type: "size", property: "letterSpacing" },
  ta: { type: "identity", property: "textAlign" },
  lh: { type: "lineHeight", property: "lineHeight" },
  fs: { type: "identity", property: "fontStyle" },
  tt: { type: "identity", property: "textTransform" },
  td: { type: "identity", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "size", property: "backgroundSize" },
  bgp: { type: "identity", property: "backgroundPosition" },
  bgr: { type: "identity", property: "backgroundRepeat" },
  bga: { type: "identity", property: "backgroundAttachment" },
  pos: { type: "identity", property: "position" },
  top: { type: "identity", property: "top" },
  left: { type: "size", property: "left" },
  bottom: { type: "size", property: "bottom" },
  right: { type: "size", property: "right" },
  inset: { type: "size", property: "inset" },
  display: { type: "identity", property: "display" }
};
function Pm(e, t) {
  const n = $s({ color: e, theme: t });
  return n.color === "dimmed" ? "var(--mantine-color-dimmed)" : n.color === "bright" ? "var(--mantine-color-bright)" : n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : n.variable ? `var(${n.variable})` : n.color;
}
function Dm(e, t) {
  return typeof e == "string" && e in t.fontSizes ? `var(--mantine-font-size-${e})` : typeof e == "number" || typeof e == "string" ? D(e) : e;
}
function Im(e) {
  return e;
}
function Rm(e, t) {
  return typeof e == "string" && e in t.lineHeights ? `var(--mantine-line-height-${e})` : e;
}
function Am(e) {
  return typeof e == "number" ? D(e) : e;
}
function Om(e, t) {
  if (typeof e == "number")
    return D(e);
  if (typeof e == "string") {
    const n = e.replace("-", "");
    if (!(n in t.spacing))
      return D(e);
    const r = `--mantine-spacing-${n}`;
    return e.startsWith("-") ? `calc(var(${r}) * -1)` : `var(${r})`;
  }
  return e;
}
const _o = {
  color: Pm,
  fontSize: Dm,
  spacing: Om,
  identity: Im,
  size: Am,
  lineHeight: Rm
};
function Ta(e) {
  return e.replace("(min-width: ", "").replace("em)", "");
}
function Nm({
  media: e,
  ...t
}) {
  const r = Object.keys(e).sort((o, s) => Number(Ta(o)) - Number(Ta(s))).map((o) => ({ query: o, styles: e[o] }));
  return { ...t, media: r };
}
function $m(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.keys(e);
  return !(t.length === 1 && t[0] === "base");
}
function Tm(e) {
  return typeof e == "object" && e !== null ? "base" in e ? e.base : void 0 : e;
}
function Lm(e) {
  return typeof e == "object" && e !== null ? it(e).filter((t) => t !== "base") : [];
}
function Mm(e, t) {
  return typeof e == "object" && e !== null && t in e ? e[t] : e;
}
function Fm({
  styleProps: e,
  data: t,
  theme: n
}) {
  return Nm(
    it(e).reduce(
      (r, o) => {
        if (o === "hiddenFrom" || o === "visibleFrom")
          return r;
        const s = t[o], i = Array.isArray(s.property) ? s.property : [s.property], a = Tm(e[o]);
        if (!$m(e[o]))
          return i.forEach((c) => {
            r.inlineStyles[c] = _o[s.type](a, n);
          }), r;
        r.hasResponsiveStyles = !0;
        const l = Lm(e[o]);
        return i.forEach((c) => {
          a && (r.styles[c] = _o[s.type](a, n)), l.forEach((f) => {
            const u = `(min-width: ${n.breakpoints[f]})`;
            r.media[u] = {
              ...r.media[u],
              [c]: _o[s.type](
                Mm(e[o], f),
                n
              )
            };
          });
        }), r;
      },
      {
        hasResponsiveStyles: !1,
        styles: {},
        inlineStyles: {},
        media: {}
      }
    )
  );
}
function km() {
  return `__m__-${Ul().replace(/:/g, "")}`;
}
function Ms(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...Ms(r, t) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function vc(e) {
  return e.startsWith("data-") ? e : `data-${e}`;
}
function Bm(e) {
  return Object.keys(e).reduce((t, n) => {
    const r = e[n];
    return r === void 0 || r === "" || r === !1 || r === null || (t[vc(n)] = e[n]), t;
  }, {});
}
function wc(e) {
  return e ? typeof e == "string" ? { [vc(e)]: !0 } : Array.isArray(e) ? [...e].reduce(
    (t, n) => ({ ...t, ...wc(n) }),
    {}
  ) : Bm(e) : null;
}
function fs(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...fs(r, t) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function _m({
  theme: e,
  style: t,
  vars: n,
  styleProps: r
}) {
  const o = fs(t, e), s = fs(n, e);
  return { ...o, ...s, ...r };
}
const xc = oe(
  ({
    component: e,
    style: t,
    __vars: n,
    className: r,
    variant: o,
    mod: s,
    size: i,
    hiddenFrom: a,
    visibleFrom: l,
    lightHidden: c,
    darkHidden: f,
    renderRoot: u,
    ...d
  }, p) => {
    const m = dt(), g = e || "div", { styleProps: h, rest: w } = _r(d), x = km(), b = Fm({
      styleProps: h,
      theme: m,
      data: Em
    }), y = {
      ref: p,
      style: _m({
        theme: m,
        style: t,
        vars: n,
        styleProps: b.inlineStyles
      }),
      className: nt(r, {
        [x]: b.hasResponsiveStyles,
        "mantine-light-hidden": c,
        "mantine-dark-hidden": f,
        [`mantine-hidden-from-${a}`]: a,
        [`mantine-visible-from-${l}`]: l
      }),
      "data-variant": o,
      "data-size": nc(i) ? void 0 : i || void 0,
      ...wc(s),
      ...w
    };
    return /* @__PURE__ */ v.createElement(v.Fragment, null, b.hasResponsiveStyles && /* @__PURE__ */ v.createElement(
      Cm,
      {
        selector: `.${x}`,
        styles: b.styles,
        media: b.media
      }
    ), typeof u == "function" ? u(y) : /* @__PURE__ */ v.createElement(g, { ...y }));
  }
);
xc.displayName = "@mantine/core/Box";
const U = xc;
function Sc(e) {
  return e;
}
function q(e) {
  const t = oe(e);
  return t.extend = Sc, t;
}
function dn(e) {
  const t = oe(e);
  return t.extend = Sc, t;
}
const jm = qt({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function jn() {
  return ct(jm);
}
function Vm(e) {
  if (!e || typeof e == "string")
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function jo(e) {
  return e != null && e.current ? e.current.scrollHeight : "auto";
}
const xn = typeof window < "u" && window.requestAnimationFrame;
function Gm({
  transitionDuration: e,
  transitionTimingFunction: t = "ease",
  onTransitionEnd: n = () => {
  },
  opened: r
}) {
  const o = V(null), s = 0, i = {
    display: "none",
    height: 0,
    overflow: "hidden"
  }, [a, l] = z(r ? {} : i), c = (m) => {
    Cs(() => l(m));
  }, f = (m) => {
    c((g) => ({ ...g, ...m }));
  };
  function u(m) {
    return {
      transition: `height ${e || Vm(m)}ms ${t}`
    };
  }
  It(() => {
    typeof xn == "function" && xn(r ? () => {
      f({ willChange: "height", display: "block", overflow: "hidden" }), xn(() => {
        const m = jo(o);
        f({ ...u(m), height: m });
      });
    } : () => {
      const m = jo(o);
      f({ ...u(m), willChange: "height", height: m }), xn(() => f({ height: s, overflow: "hidden" }));
    });
  }, [r]);
  const d = (m) => {
    if (!(m.target !== o.current || m.propertyName !== "height"))
      if (r) {
        const g = jo(o);
        g === a.height ? c({}) : f({ height: g }), n();
      } else
        a.height === s && (c(i), n());
  };
  function p({ style: m = {}, refKey: g = "ref", ...h } = {}) {
    const w = h[g];
    return {
      "aria-hidden": !r,
      ...h,
      [g]: uc(o, w),
      onTransitionEnd: d,
      style: { boxSizing: "border-box", ...m, ...a }
    };
  }
  return p;
}
const Wm = {
  transitionDuration: 200,
  transitionTimingFunction: "ease",
  animateOpacity: !0
}, Cc = q((e, t) => {
  const {
    children: n,
    in: r,
    transitionDuration: o,
    transitionTimingFunction: s,
    style: i,
    onTransitionEnd: a,
    animateOpacity: l,
    ...c
  } = j("Collapse", Wm, e), f = dt(), u = dc(), p = (f.respectReducedMotion ? u : !1) ? 0 : o, m = Gm({
    opened: r,
    transitionDuration: p,
    transitionTimingFunction: s,
    onTransitionEnd: a
  });
  return p === 0 ? r ? /* @__PURE__ */ v.createElement(U, { ...c }, n) : null : /* @__PURE__ */ v.createElement(U, { ...m({ style: Ms(i, f), ref: t, ...c }) }, /* @__PURE__ */ v.createElement(
    "div",
    {
      style: {
        opacity: r || !l ? 1 : 0,
        transition: l ? `opacity ${p}ms ${s}` : "none"
      }
    },
    n
  ));
});
Cc.displayName = "@mantine/core/Collapse";
const [zm, Ue] = Lt(
  "ScrollArea.Root component was not found in tree"
);
function tn(e, t) {
  const n = jt(t);
  _n(() => {
    let r = 0;
    if (e) {
      const o = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(n);
      });
      return o.observe(e), () => {
        window.cancelAnimationFrame(r), o.unobserve(e);
      };
    }
  }, [e, n]);
}
const Hm = v.forwardRef((e, t) => {
  const { style: n, ...r } = e, o = Ue(), [s, i] = v.useState(0), [a, l] = v.useState(0), c = !!(s && a);
  return tn(o.scrollbarX, () => {
    var u;
    const f = ((u = o.scrollbarX) == null ? void 0 : u.offsetHeight) || 0;
    o.onCornerHeightChange(f), l(f);
  }), tn(o.scrollbarY, () => {
    var u;
    const f = ((u = o.scrollbarY) == null ? void 0 : u.offsetWidth) || 0;
    o.onCornerWidthChange(f), i(f);
  }), c ? /* @__PURE__ */ v.createElement("div", { ...r, ref: t, style: { ...n, width: s, height: a } }) : null;
}), Um = v.forwardRef(
  (e, t) => {
    const n = Ue(), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ v.createElement(Hm, { ...e, ref: t }) : null;
  }
), qm = {
  scrollHideDelay: 1e3,
  type: "hover"
}, Ec = oe((e, t) => {
  const n = j("ScrollAreaRoot", qm, e), { type: r, scrollHideDelay: o, scrollbars: s, ...i } = n, [a, l] = z(null), [c, f] = z(null), [u, d] = z(null), [p, m] = z(null), [g, h] = z(null), [w, x] = z(0), [b, y] = z(0), [S, C] = z(!1), [E, P] = z(!1), L = Pe(t, (T) => l(T));
  return /* @__PURE__ */ v.createElement(
    zm,
    {
      value: {
        type: r,
        scrollHideDelay: o,
        scrollArea: a,
        viewport: c,
        onViewportChange: f,
        content: u,
        onContentChange: d,
        scrollbarX: p,
        onScrollbarXChange: m,
        scrollbarXEnabled: S,
        onScrollbarXEnabledChange: C,
        scrollbarY: g,
        onScrollbarYChange: h,
        scrollbarYEnabled: E,
        onScrollbarYEnabledChange: P,
        onCornerWidthChange: x,
        onCornerHeightChange: y
      }
    },
    /* @__PURE__ */ v.createElement(
      U,
      {
        ...i,
        ref: L,
        __vars: {
          "--sa-corner-width": s !== "xy" ? "0px" : `${w}px`,
          "--sa-corner-height": s !== "xy" ? "0px" : `${b}px`
        }
      }
    )
  );
});
Ec.displayName = "@mantine/core/ScrollAreaRoot";
function Pc(e, t) {
  const n = e / t;
  return Number.isNaN(n) ? 0 : n;
}
function jr(e) {
  const t = Pc(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function Dc(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1])
      return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Km(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function La(e, t, n = "ltr") {
  const r = jr(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, s = t.scrollbar.size - o, i = t.content - t.viewport, a = s - r, l = n === "ltr" ? [0, i] : [i * -1, 0], c = Km(e, l);
  return Dc([0, i], [0, a])(c);
}
function Ym(e, t, n, r = "ltr") {
  const o = jr(n), s = o / 2, i = t || s, a = o - i, l = n.scrollbar.paddingStart + i, c = n.scrollbar.size - n.scrollbar.paddingEnd - a, f = n.content - n.viewport, u = r === "ltr" ? [0, f] : [f * -1, 0];
  return Dc([l, c], u)(e);
}
function Ic(e, t) {
  return e > 0 && e < t;
}
function wr(e) {
  return e ? parseInt(e, 10) : 0;
}
function Gt(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return (r) => {
    e == null || e(r), (n === !1 || !r.defaultPrevented) && (t == null || t(r));
  };
}
const [Xm, Rc] = Lt(
  "ScrollAreaScrollbar was not found in tree"
), Ac = oe((e, t) => {
  const {
    sizes: n,
    hasThumb: r,
    onThumbChange: o,
    onThumbPointerUp: s,
    onThumbPointerDown: i,
    onThumbPositionChange: a,
    onDragScroll: l,
    onWheelScroll: c,
    onResize: f,
    ...u
  } = e, d = Ue(), [p, m] = v.useState(null), g = Pe(t, (P) => m(P)), h = v.useRef(null), w = v.useRef(""), { viewport: x } = d, b = n.content - n.viewport, y = jt(c), S = jt(a), C = Br(f, 10), E = (P) => {
    if (h.current) {
      const L = P.clientX - h.current.left, T = P.clientY - h.current.top;
      l({ x: L, y: T });
    }
  };
  return W(() => {
    const P = (L) => {
      const T = L.target;
      (p == null ? void 0 : p.contains(T)) && y(L, b);
    };
    return document.addEventListener("wheel", P, { passive: !1 }), () => document.removeEventListener("wheel", P, { passive: !1 });
  }, [x, p, b, y]), W(S, [n, S]), tn(p, C), tn(d.content, C), /* @__PURE__ */ v.createElement(
    Xm,
    {
      value: {
        scrollbar: p,
        hasThumb: r,
        onThumbChange: jt(o),
        onThumbPointerUp: jt(s),
        onThumbPositionChange: S,
        onThumbPointerDown: jt(i)
      }
    },
    /* @__PURE__ */ v.createElement(
      "div",
      {
        ...u,
        ref: g,
        style: { position: "absolute", ...u.style },
        onPointerDown: Gt(e.onPointerDown, (P) => {
          P.button === 0 && (P.target.setPointerCapture(P.pointerId), h.current = p.getBoundingClientRect(), w.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", E(P));
        }),
        onPointerMove: Gt(e.onPointerMove, E),
        onPointerUp: Gt(e.onPointerUp, (P) => {
          const L = P.target;
          L.hasPointerCapture(P.pointerId) && L.releasePointerCapture(P.pointerId), document.body.style.webkitUserSelect = w.current, h.current = null;
        })
      }
    )
  );
}), Jm = oe(
  (e, t) => {
    const { sizes: n, onSizesChange: r, style: o, ...s } = e, i = Ue(), [a, l] = z(), c = V(null), f = Pe(t, c, i.onScrollbarXChange);
    return W(() => {
      c.current && l(getComputedStyle(c.current));
    }, [c]), /* @__PURE__ */ v.createElement(
      Ac,
      {
        "data-orientation": "horizontal",
        ...s,
        ref: f,
        sizes: n,
        style: {
          ...o,
          "--sa-thumb-width": `${jr(n)}px`
        },
        onThumbPointerDown: (u) => e.onThumbPointerDown(u.x),
        onDragScroll: (u) => e.onDragScroll(u.x),
        onWheelScroll: (u, d) => {
          if (i.viewport) {
            const p = i.viewport.scrollLeft + u.deltaX;
            e.onWheelScroll(p), Ic(p, d) && u.preventDefault();
          }
        },
        onResize: () => {
          c.current && i.viewport && a && r({
            content: i.viewport.scrollWidth,
            viewport: i.viewport.offsetWidth,
            scrollbar: {
              size: c.current.clientWidth,
              paddingStart: wr(a.paddingLeft),
              paddingEnd: wr(a.paddingRight)
            }
          });
        }
      }
    );
  }
), Qm = oe(
  (e, t) => {
    const { sizes: n, onSizesChange: r, style: o, ...s } = e, i = Ue(), [a, l] = v.useState(), c = V(null), f = Pe(t, c, i.onScrollbarYChange);
    return W(() => {
      c.current && l(getComputedStyle(c.current));
    }, [c]), /* @__PURE__ */ v.createElement(
      Ac,
      {
        ...s,
        "data-orientation": "vertical",
        ref: f,
        sizes: n,
        style: {
          "--sa-thumb-height": `${jr(n)}px`,
          ...o
        },
        onThumbPointerDown: (u) => e.onThumbPointerDown(u.y),
        onDragScroll: (u) => e.onDragScroll(u.y),
        onWheelScroll: (u, d) => {
          if (i.viewport) {
            const p = i.viewport.scrollTop + u.deltaY;
            e.onWheelScroll(p), Ic(p, d) && u.preventDefault();
          }
        },
        onResize: () => {
          c.current && i.viewport && a && r({
            content: i.viewport.scrollHeight,
            viewport: i.viewport.offsetHeight,
            scrollbar: {
              size: c.current.clientHeight,
              paddingStart: wr(a.paddingTop),
              paddingEnd: wr(a.paddingBottom)
            }
          });
        }
      }
    );
  }
), Fs = oe((e, t) => {
  const { orientation: n = "vertical", ...r } = e, { dir: o } = jn(), s = Ue(), i = V(null), a = V(0), [l, c] = z({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), f = Pc(l.viewport, l.content), u = {
    ...r,
    sizes: l,
    onSizesChange: c,
    hasThumb: f > 0 && f < 1,
    onThumbChange: (p) => {
      i.current = p;
    },
    onThumbPointerUp: () => {
      a.current = 0;
    },
    onThumbPointerDown: (p) => {
      a.current = p;
    }
  }, d = (p, m) => Ym(p, a.current, l, m);
  return n === "horizontal" ? /* @__PURE__ */ v.createElement(
    Jm,
    {
      ...u,
      ref: t,
      onThumbPositionChange: () => {
        if (s.viewport && i.current) {
          const p = s.viewport.scrollLeft, m = La(p, l, o);
          i.current.style.transform = `translate3d(${m}px, 0, 0)`;
        }
      },
      onWheelScroll: (p) => {
        s.viewport && (s.viewport.scrollLeft = p);
      },
      onDragScroll: (p) => {
        s.viewport && (s.viewport.scrollLeft = d(p, o));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ v.createElement(
    Qm,
    {
      ...u,
      ref: t,
      onThumbPositionChange: () => {
        if (s.viewport && i.current) {
          const p = s.viewport.scrollTop, m = La(p, l);
          i.current.style.transform = `translate3d(0, ${m}px, 0)`;
        }
      },
      onWheelScroll: (p) => {
        s.viewport && (s.viewport.scrollTop = p);
      },
      onDragScroll: (p) => {
        s.viewport && (s.viewport.scrollTop = d(p));
      }
    }
  ) : null;
}), Oc = oe(
  (e, t) => {
    const n = Ue(), { forceMount: r, ...o } = e, [s, i] = z(!1), a = e.orientation === "horizontal", l = Br(() => {
      if (n.viewport) {
        const c = n.viewport.offsetWidth < n.viewport.scrollWidth, f = n.viewport.offsetHeight < n.viewport.scrollHeight;
        i(a ? c : f);
      }
    }, 10);
    return tn(n.viewport, l), tn(n.content, l), r || s ? /* @__PURE__ */ v.createElement(
      Fs,
      {
        "data-state": s ? "visible" : "hidden",
        ...o,
        ref: t
      }
    ) : null;
  }
), Zm = oe(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Ue(), [s, i] = z(!1);
    return W(() => {
      const { scrollArea: a } = o;
      let l = 0;
      if (a) {
        const c = () => {
          window.clearTimeout(l), i(!0);
        }, f = () => {
          l = window.setTimeout(() => i(!1), o.scrollHideDelay);
        };
        return a.addEventListener("pointerenter", c), a.addEventListener("pointerleave", f), () => {
          window.clearTimeout(l), a.removeEventListener("pointerenter", c), a.removeEventListener("pointerleave", f);
        };
      }
    }, [o.scrollArea, o.scrollHideDelay]), n || s ? /* @__PURE__ */ v.createElement(
      Oc,
      {
        "data-state": s ? "visible" : "hidden",
        ...r,
        ref: t
      }
    ) : null;
  }
), eg = oe(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Ue(), s = e.orientation === "horizontal", [i, a] = z("hidden"), l = Br(() => a("idle"), 100);
    return W(() => {
      if (i === "idle") {
        const c = window.setTimeout(() => a("hidden"), o.scrollHideDelay);
        return () => window.clearTimeout(c);
      }
    }, [i, o.scrollHideDelay]), W(() => {
      const { viewport: c } = o, f = s ? "scrollLeft" : "scrollTop";
      if (c) {
        let u = c[f];
        const d = () => {
          const p = c[f];
          u !== p && (a("scrolling"), l()), u = p;
        };
        return c.addEventListener("scroll", d), () => c.removeEventListener("scroll", d);
      }
    }, [o.viewport, s, l]), n || i !== "hidden" ? /* @__PURE__ */ v.createElement(
      Fs,
      {
        "data-state": i === "hidden" ? "hidden" : "visible",
        ...r,
        ref: t,
        onPointerEnter: Gt(e.onPointerEnter, () => a("interacting")),
        onPointerLeave: Gt(e.onPointerLeave, () => a("idle"))
      }
    ) : null;
  }
), Ma = v.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Ue(), { onScrollbarXEnabledChange: s, onScrollbarYEnabledChange: i } = o, a = e.orientation === "horizontal";
    return v.useEffect(() => (a ? s(!0) : i(!0), () => {
      a ? s(!1) : i(!1);
    }), [a, s, i]), o.type === "hover" ? /* @__PURE__ */ v.createElement(Zm, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ v.createElement(eg, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ v.createElement(Oc, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ v.createElement(Fs, { ...r, ref: t }) : null;
  }
);
function tg(e, t = () => {
}) {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return function o() {
    const s = { left: e.scrollLeft, top: e.scrollTop }, i = n.left !== s.left, a = n.top !== s.top;
    (i || a) && t(), n = s, r = window.requestAnimationFrame(o);
  }(), () => window.cancelAnimationFrame(r);
}
const ng = oe((e, t) => {
  const { style: n, ...r } = e, o = Ue(), s = Rc(), { onThumbPositionChange: i } = s, a = Pe(t, (f) => s.onThumbChange(f)), l = V(), c = Br(() => {
    l.current && (l.current(), l.current = void 0);
  }, 100);
  return W(() => {
    const { viewport: f } = o;
    if (f) {
      const u = () => {
        if (c(), !l.current) {
          const d = tg(f, i);
          l.current = d, i();
        }
      };
      return i(), f.addEventListener("scroll", u), () => f.removeEventListener("scroll", u);
    }
  }, [o.viewport, c, i]), /* @__PURE__ */ v.createElement(
    "div",
    {
      "data-state": s.hasThumb ? "visible" : "hidden",
      ...r,
      ref: a,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...n
      },
      onPointerDownCapture: Gt(e.onPointerDownCapture, (f) => {
        const d = f.target.getBoundingClientRect(), p = f.clientX - d.left, m = f.clientY - d.top;
        s.onThumbPointerDown({ x: p, y: m });
      }),
      onPointerUp: Gt(e.onPointerUp, s.onThumbPointerUp)
    }
  );
}), Fa = v.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Rc();
    return n || o.hasThumb ? /* @__PURE__ */ v.createElement(ng, { ref: t, ...r }) : null;
  }
), Nc = oe(
  ({ children: e, style: t, ...n }, r) => {
    const o = Ue(), s = Pe(r, o.onViewportChange);
    return /* @__PURE__ */ v.createElement(
      U,
      {
        ...n,
        ref: s,
        style: {
          overflowX: o.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: o.scrollbarYEnabled ? "scroll" : "hidden",
          ...t
        }
      },
      /* @__PURE__ */ v.createElement("div", { style: { minWidth: "100%", display: "table" }, ref: o.onContentChange }, e)
    );
  }
);
Nc.displayName = "@mantine/core/ScrollAreaViewport";
var ks = { root: "m-d57069b5", viewport: "m-c0783ff9", viewportInner: "m-f8f631dd", scrollbar: "m-c44ba933", thumb: "m-d8b5e363", corner: "m-21657268" };
const $c = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
}, rg = (e, { scrollbarSize: t }) => ({
  root: {
    "--scrollarea-scrollbar-size": D(t)
  }
}), Vn = q((e, t) => {
  const n = j("ScrollArea", $c, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    scrollbarSize: l,
    vars: c,
    type: f,
    scrollHideDelay: u,
    viewportProps: d,
    viewportRef: p,
    onScrollPositionChange: m,
    children: g,
    offsetScrollbars: h,
    scrollbars: w,
    ...x
  } = n, [b, y] = z(!1), S = te({
    name: "ScrollArea",
    props: n,
    classes: ks,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: rg
  });
  return /* @__PURE__ */ v.createElement(
    Ec,
    {
      type: f === "never" ? "always" : f,
      scrollHideDelay: u,
      ref: t,
      scrollbars: w,
      ...S("root"),
      ...x
    },
    /* @__PURE__ */ v.createElement(
      Nc,
      {
        ...d,
        ...S("viewport"),
        ref: p,
        "data-offset-scrollbars": h === !0 ? "xy" : h || void 0,
        "data-scrollbars": w || void 0,
        onScroll: typeof m == "function" ? ({ currentTarget: C }) => m({
          x: C.scrollLeft,
          y: C.scrollTop
        }) : void 0
      },
      g
    ),
    (w === "xy" || w === "x") && /* @__PURE__ */ v.createElement(
      Ma,
      {
        ...S("scrollbar"),
        orientation: "horizontal",
        "data-hidden": f === "never" || void 0,
        forceMount: !0,
        onMouseEnter: () => y(!0),
        onMouseLeave: () => y(!1)
      },
      /* @__PURE__ */ v.createElement(Fa, { ...S("thumb") })
    ),
    (w === "xy" || w === "y") && /* @__PURE__ */ v.createElement(
      Ma,
      {
        ...S("scrollbar"),
        orientation: "vertical",
        "data-hidden": f === "never" || void 0,
        forceMount: !0,
        onMouseEnter: () => y(!0),
        onMouseLeave: () => y(!1)
      },
      /* @__PURE__ */ v.createElement(Fa, { ...S("thumb") })
    ),
    /* @__PURE__ */ v.createElement(
      Um,
      {
        ...S("corner"),
        "data-hovered": b || void 0,
        "data-hidden": f === "never" || void 0
      }
    )
  );
});
Vn.displayName = "@mantine/core/ScrollArea";
const Bs = q((e, t) => {
  const {
    children: n,
    classNames: r,
    styles: o,
    scrollbarSize: s,
    scrollHideDelay: i,
    type: a,
    dir: l,
    offsetScrollbars: c,
    viewportRef: f,
    onScrollPositionChange: u,
    unstyled: d,
    variant: p,
    viewportProps: m,
    scrollbars: g,
    style: h,
    vars: w,
    ...x
  } = j("ScrollAreaAutosize", $c, e);
  return /* @__PURE__ */ v.createElement(U, { ...x, ref: t, style: [{ display: "flex" }, h] }, /* @__PURE__ */ v.createElement(U, { style: { display: "flex", flexDirection: "column", flex: 1 } }, /* @__PURE__ */ v.createElement(
    Vn,
    {
      classNames: r,
      styles: o,
      scrollHideDelay: i,
      scrollbarSize: s,
      type: a,
      dir: l,
      offsetScrollbars: c,
      viewportRef: f,
      onScrollPositionChange: u,
      unstyled: d,
      variant: p,
      viewportProps: m,
      vars: w,
      scrollbars: g
    },
    n
  )));
});
Vn.classes = ks;
Bs.displayName = "@mantine/core/ScrollAreaAutosize";
Bs.classes = ks;
Vn.Autosize = Bs;
var Tc = { root: "m-87cf2631" };
const og = {
  __staticSelector: "UnstyledButton"
}, fn = dn(
  (e, t) => {
    const n = j("UnstyledButton", og, e), {
      className: r,
      component: o = "button",
      __staticSelector: s,
      unstyled: i,
      classNames: a,
      styles: l,
      style: c,
      ...f
    } = n, u = te({
      name: s,
      props: n,
      classes: Tc,
      className: r,
      style: c,
      classNames: a,
      styles: l,
      unstyled: i
    });
    return /* @__PURE__ */ v.createElement(
      U,
      {
        ...u("root", { focusable: !0 }),
        component: o,
        ref: t,
        type: o === "button" ? "button" : void 0,
        ...f
      }
    );
  }
);
fn.classes = Tc;
fn.displayName = "@mantine/core/UnstyledButton";
const et = Math.min, ye = Math.max, xr = Math.round, er = Math.floor, At = (e) => ({
  x: e,
  y: e
}), sg = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ig = {
  start: "end",
  end: "start"
};
function ps(e, t, n) {
  return ye(e, et(t, n));
}
function gt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function tt(e) {
  return e.split("-")[0];
}
function pn(e) {
  return e.split("-")[1];
}
function _s(e) {
  return e === "x" ? "y" : "x";
}
function js(e) {
  return e === "y" ? "height" : "width";
}
function Yt(e) {
  return ["top", "bottom"].includes(tt(e)) ? "y" : "x";
}
function Vs(e) {
  return _s(Yt(e));
}
function ag(e, t, n) {
  n === void 0 && (n = !1);
  const r = pn(e), o = Vs(e), s = js(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[s] > t.floating[s] && (i = Sr(i)), [i, Sr(i)];
}
function lg(e) {
  const t = Sr(e);
  return [ms(e), t, ms(t)];
}
function ms(e) {
  return e.replace(/start|end/g, (t) => ig[t]);
}
function cg(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], s = ["top", "bottom"], i = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? s : i;
    default:
      return [];
  }
}
function ug(e, t, n, r) {
  const o = pn(e);
  let s = cg(tt(e), n === "start", r);
  return o && (s = s.map((i) => i + "-" + o), t && (s = s.concat(s.map(ms)))), s;
}
function Sr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => sg[t]);
}
function dg(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Gs(e) {
  return typeof e != "number" ? dg(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function nn(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function ka(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const s = Yt(t), i = Vs(t), a = js(i), l = tt(t), c = s === "y", f = r.x + r.width / 2 - o.width / 2, u = r.y + r.height / 2 - o.height / 2, d = r[a] / 2 - o[a] / 2;
  let p;
  switch (l) {
    case "top":
      p = {
        x: f,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: f,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: u
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: u
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (pn(t)) {
    case "start":
      p[i] -= d * (n && c ? -1 : 1);
      break;
    case "end":
      p[i] += d * (n && c ? -1 : 1);
      break;
  }
  return p;
}
const fg = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: s = [],
    platform: i
  } = n, a = s.filter(Boolean), l = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let c = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: f,
    y: u
  } = ka(c, r, l), d = r, p = {}, m = 0;
  for (let g = 0; g < a.length; g++) {
    const {
      name: h,
      fn: w
    } = a[g], {
      x,
      y: b,
      data: y,
      reset: S
    } = await w({
      x: f,
      y: u,
      initialPlacement: r,
      placement: d,
      strategy: o,
      middlewareData: p,
      rects: c,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (f = x ?? f, u = b ?? u, p = {
      ...p,
      [h]: {
        ...p[h],
        ...y
      }
    }, S && m <= 50) {
      m++, typeof S == "object" && (S.placement && (d = S.placement), S.rects && (c = S.rects === !0 ? await i.getElementRects({
        reference: e,
        floating: t,
        strategy: o
      }) : S.rects), {
        x: f,
        y: u
      } = ka(c, d, l)), g = -1;
      continue;
    }
  }
  return {
    x: f,
    y: u,
    placement: d,
    strategy: o,
    middlewareData: p
  };
};
async function Ws(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: s,
    rects: i,
    elements: a,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: u = "floating",
    altBoundary: d = !1,
    padding: p = 0
  } = gt(t, e), m = Gs(p), h = a[d ? u === "floating" ? "reference" : "floating" : u], w = nn(await s.getClippingRect({
    element: (n = await (s.isElement == null ? void 0 : s.isElement(h))) == null || n ? h : h.contextElement || await (s.getDocumentElement == null ? void 0 : s.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: f,
    strategy: l
  })), x = u === "floating" ? {
    ...i.floating,
    x: r,
    y: o
  } : i.reference, b = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(a.floating)), y = await (s.isElement == null ? void 0 : s.isElement(b)) ? await (s.getScale == null ? void 0 : s.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = nn(s.convertOffsetParentRelativeRectToViewportRelativeRect ? await s.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: x,
    offsetParent: b,
    strategy: l
  }) : x);
  return {
    top: (w.top - S.top + m.top) / y.y,
    bottom: (S.bottom - w.bottom + m.bottom) / y.y,
    left: (w.left - S.left + m.left) / y.x,
    right: (S.right - w.right + m.right) / y.x
  };
}
const Ba = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: s,
      platform: i,
      elements: a,
      middlewareData: l
    } = t, {
      element: c,
      padding: f = 0
    } = gt(e, t) || {};
    if (c == null)
      return {};
    const u = Gs(f), d = {
      x: n,
      y: r
    }, p = Vs(o), m = js(p), g = await i.getDimensions(c), h = p === "y", w = h ? "top" : "left", x = h ? "bottom" : "right", b = h ? "clientHeight" : "clientWidth", y = s.reference[m] + s.reference[p] - d[p] - s.floating[m], S = d[p] - s.reference[p], C = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c));
    let E = C ? C[b] : 0;
    (!E || !await (i.isElement == null ? void 0 : i.isElement(C))) && (E = a.floating[b] || s.floating[m]);
    const P = y / 2 - S / 2, L = E / 2 - g[m] / 2 - 1, T = et(u[w], L), N = et(u[x], L), M = T, F = E - g[m] - N, A = E / 2 - g[m] / 2 + P, $ = ps(M, A, F), R = !l.arrow && pn(o) != null && A != $ && s.reference[m] / 2 - (A < M ? T : N) - g[m] / 2 < 0, B = R ? A < M ? A - M : A - F : 0;
    return {
      [p]: d[p] + B,
      data: {
        [p]: $,
        centerOffset: A - $ - B,
        ...R && {
          alignmentOffset: B
        }
      },
      reset: R
    };
  }
}), Lc = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: s,
        rects: i,
        initialPlacement: a,
        platform: l,
        elements: c
      } = t, {
        mainAxis: f = !0,
        crossAxis: u = !0,
        fallbackPlacements: d,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: g = !0,
        ...h
      } = gt(e, t);
      if ((n = s.arrow) != null && n.alignmentOffset)
        return {};
      const w = tt(o), x = tt(a) === a, b = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), y = d || (x || !g ? [Sr(a)] : lg(a));
      !d && m !== "none" && y.push(...ug(a, g, m, b));
      const S = [a, ...y], C = await Ws(t, h), E = [];
      let P = ((r = s.flip) == null ? void 0 : r.overflows) || [];
      if (f && E.push(C[w]), u) {
        const M = ag(o, i, b);
        E.push(C[M[0]], C[M[1]]);
      }
      if (P = [...P, {
        placement: o,
        overflows: E
      }], !E.every((M) => M <= 0)) {
        var L, T;
        const M = (((L = s.flip) == null ? void 0 : L.index) || 0) + 1, F = S[M];
        if (F)
          return {
            data: {
              index: M,
              overflows: P
            },
            reset: {
              placement: F
            }
          };
        let A = (T = P.filter(($) => $.overflows[0] <= 0).sort(($, R) => $.overflows[1] - R.overflows[1])[0]) == null ? void 0 : T.placement;
        if (!A)
          switch (p) {
            case "bestFit": {
              var N;
              const $ = (N = P.map((R) => [R.placement, R.overflows.filter((B) => B > 0).reduce((B, O) => B + O, 0)]).sort((R, B) => R[1] - B[1])[0]) == null ? void 0 : N[0];
              $ && (A = $);
              break;
            }
            case "initialPlacement":
              A = a;
              break;
          }
        if (o !== A)
          return {
            reset: {
              placement: A
            }
          };
      }
      return {};
    }
  };
};
function Mc(e) {
  const t = et(...e.map((s) => s.left)), n = et(...e.map((s) => s.top)), r = ye(...e.map((s) => s.right)), o = ye(...e.map((s) => s.bottom));
  return {
    x: t,
    y: n,
    width: r - t,
    height: o - n
  };
}
function pg(e) {
  const t = e.slice().sort((o, s) => o.y - s.y), n = [];
  let r = null;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    !r || s.y - r.y > r.height / 2 ? n.push([s]) : n[n.length - 1].push(s), r = s;
  }
  return n.map((o) => nn(Mc(o)));
}
const Fc = function(e) {
  return e === void 0 && (e = {}), {
    name: "inline",
    options: e,
    async fn(t) {
      const {
        placement: n,
        elements: r,
        rects: o,
        platform: s,
        strategy: i
      } = t, {
        padding: a = 2,
        x: l,
        y: c
      } = gt(e, t), f = Array.from(await (s.getClientRects == null ? void 0 : s.getClientRects(r.reference)) || []), u = pg(f), d = nn(Mc(f)), p = Gs(a);
      function m() {
        if (u.length === 2 && u[0].left > u[1].right && l != null && c != null)
          return u.find((h) => l > h.left - p.left && l < h.right + p.right && c > h.top - p.top && c < h.bottom + p.bottom) || d;
        if (u.length >= 2) {
          if (Yt(n) === "y") {
            const T = u[0], N = u[u.length - 1], M = tt(n) === "top", F = T.top, A = N.bottom, $ = M ? T.left : N.left, R = M ? T.right : N.right, B = R - $, O = A - F;
            return {
              top: F,
              bottom: A,
              left: $,
              right: R,
              width: B,
              height: O,
              x: $,
              y: F
            };
          }
          const h = tt(n) === "left", w = ye(...u.map((T) => T.right)), x = et(...u.map((T) => T.left)), b = u.filter((T) => h ? T.left === x : T.right === w), y = b[0].top, S = b[b.length - 1].bottom, C = x, E = w, P = E - C, L = S - y;
          return {
            top: y,
            bottom: S,
            left: C,
            right: E,
            width: P,
            height: L,
            x: C,
            y
          };
        }
        return d;
      }
      const g = await s.getElementRects({
        reference: {
          getBoundingClientRect: m
        },
        floating: r.floating,
        strategy: i
      });
      return o.reference.x !== g.reference.x || o.reference.y !== g.reference.y || o.reference.width !== g.reference.width || o.reference.height !== g.reference.height ? {
        reset: {
          rects: g
        }
      } : {};
    }
  };
};
async function mg(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, s = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = tt(n), a = pn(n), l = Yt(n) === "y", c = ["left", "top"].includes(i) ? -1 : 1, f = s && l ? -1 : 1, u = gt(t, e);
  let {
    mainAxis: d,
    crossAxis: p,
    alignmentAxis: m
  } = typeof u == "number" ? {
    mainAxis: u,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...u
  };
  return a && typeof m == "number" && (p = a === "end" ? m * -1 : m), l ? {
    x: p * f,
    y: d * c
  } : {
    x: d * c,
    y: p * f
  };
}
const kc = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: s,
        placement: i,
        middlewareData: a
      } = t, l = await mg(t, e);
      return i === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: o + l.x,
        y: s + l.y,
        data: {
          ...l,
          placement: i
        }
      };
    }
  };
}, zs = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: s = !0,
        crossAxis: i = !1,
        limiter: a = {
          fn: (h) => {
            let {
              x: w,
              y: x
            } = h;
            return {
              x: w,
              y: x
            };
          }
        },
        ...l
      } = gt(e, t), c = {
        x: n,
        y: r
      }, f = await Ws(t, l), u = Yt(tt(o)), d = _s(u);
      let p = c[d], m = c[u];
      if (s) {
        const h = d === "y" ? "top" : "left", w = d === "y" ? "bottom" : "right", x = p + f[h], b = p - f[w];
        p = ps(x, p, b);
      }
      if (i) {
        const h = u === "y" ? "top" : "left", w = u === "y" ? "bottom" : "right", x = m + f[h], b = m - f[w];
        m = ps(x, m, b);
      }
      const g = a.fn({
        ...t,
        [d]: p,
        [u]: m
      });
      return {
        ...g,
        data: {
          x: g.x - n,
          y: g.y - r
        }
      };
    }
  };
}, gg = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: s,
        middlewareData: i
      } = t, {
        offset: a = 0,
        mainAxis: l = !0,
        crossAxis: c = !0
      } = gt(e, t), f = {
        x: n,
        y: r
      }, u = Yt(o), d = _s(u);
      let p = f[d], m = f[u];
      const g = gt(a, t), h = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (l) {
        const b = d === "y" ? "height" : "width", y = s.reference[d] - s.floating[b] + h.mainAxis, S = s.reference[d] + s.reference[b] - h.mainAxis;
        p < y ? p = y : p > S && (p = S);
      }
      if (c) {
        var w, x;
        const b = d === "y" ? "width" : "height", y = ["top", "left"].includes(tt(o)), S = s.reference[u] - s.floating[b] + (y && ((w = i.offset) == null ? void 0 : w[u]) || 0) + (y ? 0 : h.crossAxis), C = s.reference[u] + s.reference[b] + (y ? 0 : ((x = i.offset) == null ? void 0 : x[u]) || 0) - (y ? h.crossAxis : 0);
        m < S ? m = S : m > C && (m = C);
      }
      return {
        [d]: p,
        [u]: m
      };
    }
  };
}, hg = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: r,
        platform: o,
        elements: s
      } = t, {
        apply: i = () => {
        },
        ...a
      } = gt(e, t), l = await Ws(t, a), c = tt(n), f = pn(n), u = Yt(n) === "y", {
        width: d,
        height: p
      } = r.floating;
      let m, g;
      c === "top" || c === "bottom" ? (m = c, g = f === (await (o.isRTL == null ? void 0 : o.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (g = c, m = f === "end" ? "top" : "bottom");
      const h = p - l[m], w = d - l[g], x = !t.middlewareData.shift;
      let b = h, y = w;
      if (u) {
        const C = d - l.left - l.right;
        y = f || x ? et(w, C) : C;
      } else {
        const C = p - l.top - l.bottom;
        b = f || x ? et(h, C) : C;
      }
      if (x && !f) {
        const C = ye(l.left, 0), E = ye(l.right, 0), P = ye(l.top, 0), L = ye(l.bottom, 0);
        u ? y = d - 2 * (C !== 0 || E !== 0 ? C + E : ye(l.left, l.right)) : b = p - 2 * (P !== 0 || L !== 0 ? P + L : ye(l.top, l.bottom));
      }
      await i({
        ...t,
        availableWidth: y,
        availableHeight: b
      });
      const S = await o.getDimensions(s.floating);
      return d !== S.width || p !== S.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ot(e) {
  return Bc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Me(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function bt(e) {
  var t;
  return (t = (Bc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Bc(e) {
  return e instanceof Node || e instanceof Me(e).Node;
}
function ht(e) {
  return e instanceof Element || e instanceof Me(e).Element;
}
function lt(e) {
  return e instanceof HTMLElement || e instanceof Me(e).HTMLElement;
}
function _a(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Me(e).ShadowRoot;
}
function Gn(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function bg(e) {
  return ["table", "td", "th"].includes(Ot(e));
}
function Hs(e) {
  const t = Us(), n = ze(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function yg(e) {
  let t = rn(e);
  for (; lt(t) && !Vr(t); ) {
    if (Hs(t))
      return t;
    t = rn(t);
  }
  return null;
}
function Us() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Vr(e) {
  return ["html", "body", "#document"].includes(Ot(e));
}
function ze(e) {
  return Me(e).getComputedStyle(e);
}
function Gr(e) {
  return ht(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function rn(e) {
  if (Ot(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    _a(e) && e.host || // Fallback.
    bt(e)
  );
  return _a(t) ? t.host : t;
}
function _c(e) {
  const t = rn(e);
  return Vr(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : lt(t) && Gn(t) ? t : _c(t);
}
function ft(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = _c(e), s = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Me(o);
  return s ? t.concat(i, i.visualViewport || [], Gn(o) ? o : [], i.frameElement && n ? ft(i.frameElement) : []) : t.concat(o, ft(o, [], n));
}
function jc(e) {
  const t = ze(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = lt(e), s = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, a = xr(n) !== s || xr(r) !== i;
  return a && (n = s, r = i), {
    width: n,
    height: r,
    $: a
  };
}
function qs(e) {
  return ht(e) ? e : e.contextElement;
}
function en(e) {
  const t = qs(e);
  if (!lt(t))
    return At(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: s
  } = jc(t);
  let i = (s ? xr(n.width) : n.width) / r, a = (s ? xr(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: i,
    y: a
  };
}
const vg = /* @__PURE__ */ At(0);
function Vc(e) {
  const t = Me(e);
  return !Us() || !t.visualViewport ? vg : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function wg(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Me(e) ? !1 : t;
}
function zt(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), s = qs(e);
  let i = At(1);
  t && (r ? ht(r) && (i = en(r)) : i = en(e));
  const a = wg(s, n, r) ? Vc(s) : At(0);
  let l = (o.left + a.x) / i.x, c = (o.top + a.y) / i.y, f = o.width / i.x, u = o.height / i.y;
  if (s) {
    const d = Me(s), p = r && ht(r) ? Me(r) : r;
    let m = d.frameElement;
    for (; m && r && p !== d; ) {
      const g = en(m), h = m.getBoundingClientRect(), w = ze(m), x = h.left + (m.clientLeft + parseFloat(w.paddingLeft)) * g.x, b = h.top + (m.clientTop + parseFloat(w.paddingTop)) * g.y;
      l *= g.x, c *= g.y, f *= g.x, u *= g.y, l += x, c += b, m = Me(m).frameElement;
    }
  }
  return nn({
    width: f,
    height: u,
    x: l,
    y: c
  });
}
function xg(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const o = lt(n), s = bt(n);
  if (n === s)
    return t;
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = At(1);
  const l = At(0);
  if ((o || !o && r !== "fixed") && ((Ot(n) !== "body" || Gn(s)) && (i = Gr(n)), lt(n))) {
    const c = zt(n);
    a = en(n), l.x = c.x + n.clientLeft, l.y = c.y + n.clientTop;
  }
  return {
    width: t.width * a.x,
    height: t.height * a.y,
    x: t.x * a.x - i.scrollLeft * a.x + l.x,
    y: t.y * a.y - i.scrollTop * a.y + l.y
  };
}
function Sg(e) {
  return Array.from(e.getClientRects());
}
function Gc(e) {
  return zt(bt(e)).left + Gr(e).scrollLeft;
}
function Cg(e) {
  const t = bt(e), n = Gr(e), r = e.ownerDocument.body, o = ye(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), s = ye(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Gc(e);
  const a = -n.scrollTop;
  return ze(r).direction === "rtl" && (i += ye(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: s,
    x: i,
    y: a
  };
}
function Eg(e, t) {
  const n = Me(e), r = bt(e), o = n.visualViewport;
  let s = r.clientWidth, i = r.clientHeight, a = 0, l = 0;
  if (o) {
    s = o.width, i = o.height;
    const c = Us();
    (!c || c && t === "fixed") && (a = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: s,
    height: i,
    x: a,
    y: l
  };
}
function Pg(e, t) {
  const n = zt(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, s = lt(e) ? en(e) : At(1), i = e.clientWidth * s.x, a = e.clientHeight * s.y, l = o * s.x, c = r * s.y;
  return {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function ja(e, t, n) {
  let r;
  if (t === "viewport")
    r = Eg(e, n);
  else if (t === "document")
    r = Cg(bt(e));
  else if (ht(t))
    r = Pg(t, n);
  else {
    const o = Vc(e);
    r = {
      ...t,
      x: t.x - o.x,
      y: t.y - o.y
    };
  }
  return nn(r);
}
function Wc(e, t) {
  const n = rn(e);
  return n === t || !ht(n) || Vr(n) ? !1 : ze(n).position === "fixed" || Wc(n, t);
}
function Dg(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = ft(e, [], !1).filter((a) => ht(a) && Ot(a) !== "body"), o = null;
  const s = ze(e).position === "fixed";
  let i = s ? rn(e) : e;
  for (; ht(i) && !Vr(i); ) {
    const a = ze(i), l = Hs(i);
    !l && a.position === "fixed" && (o = null), (s ? !l && !o : !l && a.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Gn(i) && !l && Wc(e, i)) ? r = r.filter((f) => f !== i) : o = a, i = rn(i);
  }
  return t.set(e, r), r;
}
function Ig(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? Dg(t, this._c) : [].concat(n), r], a = i[0], l = i.reduce((c, f) => {
    const u = ja(t, f, o);
    return c.top = ye(u.top, c.top), c.right = et(u.right, c.right), c.bottom = et(u.bottom, c.bottom), c.left = ye(u.left, c.left), c;
  }, ja(t, a, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Rg(e) {
  return jc(e);
}
function Ag(e, t, n) {
  const r = lt(t), o = bt(t), s = n === "fixed", i = zt(e, !0, s, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = At(0);
  if (r || !r && !s)
    if ((Ot(t) !== "body" || Gn(o)) && (a = Gr(t)), r) {
      const c = zt(t, !0, s, t);
      l.x = c.x + t.clientLeft, l.y = c.y + t.clientTop;
    } else
      o && (l.x = Gc(o));
  return {
    x: i.left + a.scrollLeft - l.x,
    y: i.top + a.scrollTop - l.y,
    width: i.width,
    height: i.height
  };
}
function Va(e, t) {
  return !lt(e) || ze(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function zc(e, t) {
  const n = Me(e);
  if (!lt(e))
    return n;
  let r = Va(e, t);
  for (; r && bg(r) && ze(r).position === "static"; )
    r = Va(r, t);
  return r && (Ot(r) === "html" || Ot(r) === "body" && ze(r).position === "static" && !Hs(r)) ? n : r || yg(e) || n;
}
const Og = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: r
  } = e;
  const o = this.getOffsetParent || zc, s = this.getDimensions;
  return {
    reference: Ag(t, await o(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await s(n)
    }
  };
};
function Ng(e) {
  return ze(e).direction === "rtl";
}
const $g = {
  convertOffsetParentRelativeRectToViewportRelativeRect: xg,
  getDocumentElement: bt,
  getClippingRect: Ig,
  getOffsetParent: zc,
  getElementRects: Og,
  getClientRects: Sg,
  getDimensions: Rg,
  getScale: en,
  isElement: ht,
  isRTL: Ng
};
function Tg(e, t) {
  let n = null, r;
  const o = bt(e);
  function s() {
    clearTimeout(r), n && n.disconnect(), n = null;
  }
  function i(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), s();
    const {
      left: c,
      top: f,
      width: u,
      height: d
    } = e.getBoundingClientRect();
    if (a || t(), !u || !d)
      return;
    const p = er(f), m = er(o.clientWidth - (c + u)), g = er(o.clientHeight - (f + d)), h = er(c), x = {
      rootMargin: -p + "px " + -m + "px " + -g + "px " + -h + "px",
      threshold: ye(0, et(1, l)) || 1
    };
    let b = !0;
    function y(S) {
      const C = S[0].intersectionRatio;
      if (C !== l) {
        if (!b)
          return i();
        C ? i(!1, C) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 100);
      }
      b = !1;
    }
    try {
      n = new IntersectionObserver(y, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(y, x);
    }
    n.observe(e);
  }
  return i(!0), s;
}
function Lg(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: s = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, c = qs(e), f = o || s ? [...c ? ft(c) : [], ...ft(t)] : [];
  f.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), s && w.addEventListener("resize", n);
  });
  const u = c && a ? Tg(c, n) : null;
  let d = -1, p = null;
  i && (p = new ResizeObserver((w) => {
    let [x] = w;
    x && x.target === c && p && (p.unobserve(t), cancelAnimationFrame(d), d = requestAnimationFrame(() => {
      p && p.observe(t);
    })), n();
  }), c && !l && p.observe(c), p.observe(t));
  let m, g = l ? zt(e) : null;
  l && h();
  function h() {
    const w = zt(e);
    g && (w.x !== g.x || w.y !== g.y || w.width !== g.width || w.height !== g.height) && n(), g = w, m = requestAnimationFrame(h);
  }
  return n(), () => {
    f.forEach((w) => {
      o && w.removeEventListener("scroll", n), s && w.removeEventListener("resize", n);
    }), u && u(), p && p.disconnect(), p = null, l && cancelAnimationFrame(m);
  };
}
const Mg = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: $g,
    ...n
  }, s = {
    ...o.platform,
    _c: r
  };
  return fg(e, t, {
    ...o,
    platform: s
  });
}, Hc = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? Ba({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Ba({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
};
var ir = typeof document < "u" ? Lr : W;
function Cr(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n != t.length)
        return !1;
      for (r = n; r-- !== 0; )
        if (!Cr(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const s = o[r];
      if (!(s === "_owner" && e.$$typeof) && !Cr(e[s], t[s]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Uc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ga(e, t) {
  const n = Uc(e);
  return Math.round(t * n) / n;
}
function Wa(e) {
  const t = I.useRef(e);
  return ir(() => {
    t.current = e;
  }), t;
}
function Fg(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: s,
      floating: i
    } = {},
    transform: a = !0,
    whileElementsMounted: l,
    open: c
  } = e, [f, u] = I.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [d, p] = I.useState(r);
  Cr(d, r) || p(r);
  const [m, g] = I.useState(null), [h, w] = I.useState(null), x = I.useCallback((R) => {
    R != C.current && (C.current = R, g(R));
  }, [g]), b = I.useCallback((R) => {
    R !== E.current && (E.current = R, w(R));
  }, [w]), y = s || m, S = i || h, C = I.useRef(null), E = I.useRef(null), P = I.useRef(f), L = Wa(l), T = Wa(o), N = I.useCallback(() => {
    if (!C.current || !E.current)
      return;
    const R = {
      placement: t,
      strategy: n,
      middleware: d
    };
    T.current && (R.platform = T.current), Mg(C.current, E.current, R).then((B) => {
      const O = {
        ...B,
        isPositioned: !0
      };
      M.current && !Cr(P.current, O) && (P.current = O, Ef.flushSync(() => {
        u(O);
      }));
    });
  }, [d, t, n, T]);
  ir(() => {
    c === !1 && P.current.isPositioned && (P.current.isPositioned = !1, u((R) => ({
      ...R,
      isPositioned: !1
    })));
  }, [c]);
  const M = I.useRef(!1);
  ir(() => (M.current = !0, () => {
    M.current = !1;
  }), []), ir(() => {
    if (y && (C.current = y), S && (E.current = S), y && S) {
      if (L.current)
        return L.current(y, S, N);
      N();
    }
  }, [y, S, N, L]);
  const F = I.useMemo(() => ({
    reference: C,
    floating: E,
    setReference: x,
    setFloating: b
  }), [x, b]), A = I.useMemo(() => ({
    reference: y,
    floating: S
  }), [y, S]), $ = I.useMemo(() => {
    const R = {
      position: n,
      left: 0,
      top: 0
    };
    if (!A.floating)
      return R;
    const B = Ga(A.floating, f.x), O = Ga(A.floating, f.y);
    return a ? {
      ...R,
      transform: "translate(" + B + "px, " + O + "px)",
      ...Uc(A.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: B,
      top: O
    };
  }, [n, a, A.floating, f.x, f.y]);
  return I.useMemo(() => ({
    ...f,
    update: N,
    refs: F,
    elements: A,
    floatingStyles: $
  }), [f, N, F, A, $]);
}
var pt = typeof document < "u" ? Lr : W;
let Vo = !1, kg = 0;
const za = () => "floating-ui-" + kg++;
function Bg() {
  const [e, t] = I.useState(() => Vo ? za() : void 0);
  return pt(() => {
    e == null && t(za());
  }, []), I.useEffect(() => {
    Vo || (Vo = !0);
  }, []), e;
}
const _g = I[/* @__PURE__ */ "useId".toString()], qc = _g || Bg;
function jg() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(t, n) {
      var r;
      (r = e.get(t)) == null || r.forEach((o) => o(n));
    },
    on(t, n) {
      e.set(t, [...e.get(t) || [], n]);
    },
    off(t, n) {
      var r;
      e.set(t, ((r = e.get(t)) == null ? void 0 : r.filter((o) => o !== n)) || []);
    }
  };
}
const Vg = /* @__PURE__ */ I.createContext(null), Gg = /* @__PURE__ */ I.createContext(null), Kc = () => {
  var e;
  return ((e = I.useContext(Vg)) == null ? void 0 : e.id) || null;
}, Ks = () => I.useContext(Gg);
function St(e) {
  return (e == null ? void 0 : e.ownerDocument) || document;
}
function Wg() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function zg() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((t) => {
    let {
      brand: n,
      version: r
    } = t;
    return n + "/" + r;
  }).join(" ") : navigator.userAgent;
}
function Wr(e) {
  return St(e).defaultView || window;
}
function st(e) {
  return e ? e instanceof Element || e instanceof Wr(e).Element : !1;
}
function Yc(e) {
  return e ? e instanceof HTMLElement || e instanceof Wr(e).HTMLElement : !1;
}
function Hg(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = Wr(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Ug(e) {
  if (e.mozInputSource === 0 && e.isTrusted)
    return !0;
  const t = /Android/i;
  return (t.test(Wg()) || t.test(zg())) && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function qg(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType !== "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0;
}
function Xc(e, t) {
  const n = ["mouse", "pen"];
  return t || n.push("", void 0), n.includes(e);
}
function Kg(e) {
  return "nativeEvent" in e;
}
function gs(e, t) {
  if (!e || !t)
    return !1;
  const n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Hg(n)) {
    let r = t;
    for (; r; ) {
      if (e === r)
        return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function Jc(e) {
  return "data-floating-ui-" + e;
}
function Ha(e) {
  const t = V(e);
  return pt(() => {
    t.current = e;
  }), t;
}
const Ua = /* @__PURE__ */ Jc("safe-polygon");
function ar(e, t, n) {
  return n && !Xc(n) ? 0 : typeof e == "number" ? e : e == null ? void 0 : e[t];
}
function Yg(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    events: s,
    elements: {
      domReference: i,
      floating: a
    },
    refs: l
  } = e, {
    enabled: c = !0,
    delay: f = 0,
    handleClose: u = null,
    mouseOnly: d = !1,
    restMs: p = 0,
    move: m = !0
  } = t, g = Ks(), h = Kc(), w = Ha(u), x = Ha(f), b = I.useRef(), y = I.useRef(), S = I.useRef(), C = I.useRef(), E = I.useRef(!0), P = I.useRef(!1), L = I.useRef(() => {
  }), T = I.useCallback(() => {
    var A;
    const $ = (A = o.current.openEvent) == null ? void 0 : A.type;
    return ($ == null ? void 0 : $.includes("mouse")) && $ !== "mousedown";
  }, [o]);
  I.useEffect(() => {
    if (!c)
      return;
    function A() {
      clearTimeout(y.current), clearTimeout(C.current), E.current = !0;
    }
    return s.on("dismiss", A), () => {
      s.off("dismiss", A);
    };
  }, [c, s]), I.useEffect(() => {
    if (!c || !w.current || !n)
      return;
    function A(R) {
      T() && r(!1, R);
    }
    const $ = St(a).documentElement;
    return $.addEventListener("mouseleave", A), () => {
      $.removeEventListener("mouseleave", A);
    };
  }, [a, n, r, c, w, o, T]);
  const N = I.useCallback(function(A, $) {
    $ === void 0 && ($ = !0);
    const R = ar(x.current, "close", b.current);
    R && !S.current ? (clearTimeout(y.current), y.current = setTimeout(() => r(!1, A), R)) : $ && (clearTimeout(y.current), r(!1, A));
  }, [x, r]), M = I.useCallback(() => {
    L.current(), S.current = void 0;
  }, []), F = I.useCallback(() => {
    if (P.current) {
      const A = St(l.floating.current).body;
      A.style.pointerEvents = "", A.removeAttribute(Ua), P.current = !1;
    }
  }, [l]);
  return I.useEffect(() => {
    if (!c)
      return;
    function A() {
      return o.current.openEvent ? ["click", "mousedown"].includes(o.current.openEvent.type) : !1;
    }
    function $(O) {
      if (clearTimeout(y.current), E.current = !1, d && !Xc(b.current) || p > 0 && ar(x.current, "open") === 0)
        return;
      const H = ar(x.current, "open", b.current);
      H ? y.current = setTimeout(() => {
        r(!0, O);
      }, H) : r(!0, O);
    }
    function R(O) {
      if (A())
        return;
      L.current();
      const H = St(a);
      if (clearTimeout(C.current), w.current) {
        n || clearTimeout(y.current), S.current = w.current({
          ...e,
          tree: g,
          x: O.clientX,
          y: O.clientY,
          onClose() {
            F(), M(), N(O);
          }
        });
        const ne = S.current;
        H.addEventListener("mousemove", ne), L.current = () => {
          H.removeEventListener("mousemove", ne);
        };
        return;
      }
      (b.current === "touch" ? !gs(a, O.relatedTarget) : !0) && N(O);
    }
    function B(O) {
      A() || w.current == null || w.current({
        ...e,
        tree: g,
        x: O.clientX,
        y: O.clientY,
        onClose() {
          F(), M(), N(O);
        }
      })(O);
    }
    if (st(i)) {
      const O = i;
      return n && O.addEventListener("mouseleave", B), a == null || a.addEventListener("mouseleave", B), m && O.addEventListener("mousemove", $, {
        once: !0
      }), O.addEventListener("mouseenter", $), O.addEventListener("mouseleave", R), () => {
        n && O.removeEventListener("mouseleave", B), a == null || a.removeEventListener("mouseleave", B), m && O.removeEventListener("mousemove", $), O.removeEventListener("mouseenter", $), O.removeEventListener("mouseleave", R);
      };
    }
  }, [i, a, c, e, d, p, m, N, M, F, r, n, g, x, w, o]), pt(() => {
    var A;
    if (c && n && (A = w.current) != null && A.__options.blockPointerEvents && T()) {
      const B = St(a).body;
      if (B.setAttribute(Ua, ""), B.style.pointerEvents = "none", P.current = !0, st(i) && a) {
        var $, R;
        const O = i, H = g == null || ($ = g.nodesRef.current.find((X) => X.id === h)) == null || (R = $.context) == null ? void 0 : R.elements.floating;
        return H && (H.style.pointerEvents = ""), O.style.pointerEvents = "auto", a.style.pointerEvents = "auto", () => {
          O.style.pointerEvents = "", a.style.pointerEvents = "";
        };
      }
    }
  }, [c, n, h, a, i, g, w, o, T]), pt(() => {
    n || (b.current = void 0, M(), F());
  }, [n, M, F]), I.useEffect(() => () => {
    M(), clearTimeout(y.current), clearTimeout(C.current), F();
  }, [c, M, F]), I.useMemo(() => {
    if (!c)
      return {};
    function A($) {
      b.current = $.pointerType;
    }
    return {
      reference: {
        onPointerDown: A,
        onPointerEnter: A,
        onMouseMove($) {
          n || p === 0 || (clearTimeout(C.current), C.current = setTimeout(() => {
            E.current || r(!0, $.nativeEvent);
          }, p));
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(y.current);
        },
        onMouseLeave($) {
          s.emit("dismiss", {
            type: "mouseLeave",
            data: {
              returnFocus: !1
            }
          }), N($.nativeEvent, !1);
        }
      }
    };
  }, [s, c, p, n, r, N]);
}
const Qc = /* @__PURE__ */ I.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: () => {
  },
  setState: () => {
  },
  isInstantPhase: !1
}), Zc = () => I.useContext(Qc), Xg = (e) => {
  let {
    children: t,
    delay: n,
    timeoutMs: r = 0
  } = e;
  const [o, s] = I.useReducer((l, c) => ({
    ...l,
    ...c
  }), {
    delay: n,
    timeoutMs: r,
    initialDelay: n,
    currentId: null,
    isInstantPhase: !1
  }), i = I.useRef(null), a = I.useCallback((l) => {
    s({
      currentId: l
    });
  }, []);
  return pt(() => {
    o.currentId ? i.current === null ? i.current = o.currentId : s({
      isInstantPhase: !0
    }) : (s({
      isInstantPhase: !1
    }), i.current = null);
  }, [o.currentId]), /* @__PURE__ */ I.createElement(Qc.Provider, {
    value: I.useMemo(() => ({
      ...o,
      setState: s,
      setCurrentId: a
    }), [o, s, a])
  }, t);
}, Jg = (e, t) => {
  let {
    open: n,
    onOpenChange: r
  } = e, {
    id: o
  } = t;
  const {
    currentId: s,
    setCurrentId: i,
    initialDelay: a,
    setState: l,
    timeoutMs: c
  } = Zc();
  pt(() => {
    s && (l({
      delay: {
        open: 1,
        close: ar(a, "close")
      }
    }), s !== o && r(!1));
  }, [o, r, l, s, a]), pt(() => {
    function f() {
      r(!1), l({
        delay: a,
        currentId: null
      });
    }
    if (!n && s === o)
      if (c) {
        const u = window.setTimeout(f, c);
        return () => {
          clearTimeout(u);
        };
      } else
        f();
  }, [n, l, s, o, r, a, c]), pt(() => {
    n && i(o);
  }, [n, i, o]);
};
function Qg(e) {
  let t = e.activeElement;
  for (; ((n = t) == null || (r = n.shadowRoot) == null ? void 0 : r.activeElement) != null; ) {
    var n, r;
    t = t.shadowRoot.activeElement;
  }
  return t;
}
function Go(e, t) {
  let n = e.filter((o) => {
    var s;
    return o.parentId === t && ((s = o.context) == null ? void 0 : s.open);
  }), r = n;
  for (; r.length; )
    r = e.filter((o) => {
      var s;
      return (s = r) == null ? void 0 : s.some((i) => {
        var a;
        return o.parentId === i.id && ((a = o.context) == null ? void 0 : a.open);
      });
    }), n = n.concat(r);
  return n;
}
function Zg(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const eh = I[/* @__PURE__ */ "useInsertionEffect".toString()], th = eh || ((e) => e());
function lr(e) {
  const t = I.useRef(() => {
  });
  return th(() => {
    t.current = e;
  }), I.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return t.current == null ? void 0 : t.current(...r);
  }, []);
}
function cr(e, t) {
  if (t == null)
    return !1;
  if ("composedPath" in e)
    return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
const nh = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, rh = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, oh = (e) => {
  var t, n;
  return {
    escapeKeyBubbles: typeof e == "boolean" ? e : (t = e == null ? void 0 : e.escapeKey) != null ? t : !1,
    outsidePressBubbles: typeof e == "boolean" ? e : (n = e == null ? void 0 : e.outsidePress) != null ? n : !0
  };
};
function sh(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    events: o,
    nodeId: s,
    elements: {
      reference: i,
      domReference: a,
      floating: l
    },
    dataRef: c
  } = e, {
    enabled: f = !0,
    escapeKey: u = !0,
    outsidePress: d = !0,
    outsidePressEvent: p = "pointerdown",
    referencePress: m = !1,
    referencePressEvent: g = "pointerdown",
    ancestorScroll: h = !1,
    bubbles: w
  } = t, x = Ks(), b = Kc() != null, y = lr(typeof d == "function" ? d : () => !1), S = typeof d == "function" ? y : d, C = I.useRef(!1), {
    escapeKeyBubbles: E,
    outsidePressBubbles: P
  } = oh(w), L = lr((N) => {
    if (!n || !f || !u || N.key !== "Escape")
      return;
    const M = x ? Go(x.nodesRef.current, s) : [];
    if (!E && (N.stopPropagation(), M.length > 0)) {
      let F = !0;
      if (M.forEach((A) => {
        var $;
        if (($ = A.context) != null && $.open && !A.context.dataRef.current.__escapeKeyBubbles) {
          F = !1;
          return;
        }
      }), !F)
        return;
    }
    o.emit("dismiss", {
      type: "escapeKey",
      data: {
        returnFocus: {
          preventScroll: !1
        }
      }
    }), r(!1, Kg(N) ? N.nativeEvent : N);
  }), T = lr((N) => {
    const M = C.current;
    if (C.current = !1, M || typeof S == "function" && !S(N))
      return;
    const F = Zg(N);
    if (Yc(F) && l) {
      const R = F.clientWidth > 0 && F.scrollWidth > F.clientWidth, B = F.clientHeight > 0 && F.scrollHeight > F.clientHeight;
      let O = B && N.offsetX > F.clientWidth;
      if (B && Wr(l).getComputedStyle(F).direction === "rtl" && (O = N.offsetX <= F.offsetWidth - F.clientWidth), O || R && N.offsetY > F.clientHeight)
        return;
    }
    const A = x && Go(x.nodesRef.current, s).some((R) => {
      var B;
      return cr(N, (B = R.context) == null ? void 0 : B.elements.floating);
    });
    if (cr(N, l) || cr(N, a) || A)
      return;
    const $ = x ? Go(x.nodesRef.current, s) : [];
    if ($.length > 0) {
      let R = !0;
      if ($.forEach((B) => {
        var O;
        if ((O = B.context) != null && O.open && !B.context.dataRef.current.__outsidePressBubbles) {
          R = !1;
          return;
        }
      }), !R)
        return;
    }
    o.emit("dismiss", {
      type: "outsidePress",
      data: {
        returnFocus: b ? {
          preventScroll: !0
        } : Ug(N) || qg(N)
      }
    }), r(!1, N);
  });
  return I.useEffect(() => {
    if (!n || !f)
      return;
    c.current.__escapeKeyBubbles = E, c.current.__outsidePressBubbles = P;
    function N(A) {
      r(!1, A);
    }
    const M = St(l);
    u && M.addEventListener("keydown", L), S && M.addEventListener(p, T);
    let F = [];
    return h && (st(a) && (F = ft(a)), st(l) && (F = F.concat(ft(l))), !st(i) && i && i.contextElement && (F = F.concat(ft(i.contextElement)))), F = F.filter((A) => {
      var $;
      return A !== (($ = M.defaultView) == null ? void 0 : $.visualViewport);
    }), F.forEach((A) => {
      A.addEventListener("scroll", N, {
        passive: !0
      });
    }), () => {
      u && M.removeEventListener("keydown", L), S && M.removeEventListener(p, T), F.forEach((A) => {
        A.removeEventListener("scroll", N);
      });
    };
  }, [c, l, a, i, u, S, p, n, r, h, f, E, P, L, T]), I.useEffect(() => {
    C.current = !1;
  }, [S, p]), I.useMemo(() => f ? {
    reference: {
      onKeyDown: L,
      [nh[g]]: (N) => {
        m && (o.emit("dismiss", {
          type: "referencePress",
          data: {
            returnFocus: !1
          }
        }), r(!1, N.nativeEvent));
      }
    },
    floating: {
      onKeyDown: L,
      [rh[p]]: () => {
        C.current = !0;
      }
    }
  } : {}, [f, o, m, p, g, r, L]);
}
function Ys(e) {
  var t;
  e === void 0 && (e = {});
  const {
    open: n = !1,
    onOpenChange: r,
    nodeId: o
  } = e, [s, i] = I.useState(null), a = ((t = e.elements) == null ? void 0 : t.reference) || s, l = Fg(e), c = Ks(), f = lr((y, S) => {
    y && (d.current.openEvent = S), r == null || r(y, S);
  }), u = I.useRef(null), d = I.useRef({}), p = I.useState(() => jg())[0], m = qc(), g = I.useCallback((y) => {
    const S = st(y) ? {
      getBoundingClientRect: () => y.getBoundingClientRect(),
      contextElement: y
    } : y;
    l.refs.setReference(S);
  }, [l.refs]), h = I.useCallback((y) => {
    (st(y) || y === null) && (u.current = y, i(y)), (st(l.refs.reference.current) || l.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    y !== null && !st(y)) && l.refs.setReference(y);
  }, [l.refs]), w = I.useMemo(() => ({
    ...l.refs,
    setReference: h,
    setPositionReference: g,
    domReference: u
  }), [l.refs, h, g]), x = I.useMemo(() => ({
    ...l.elements,
    domReference: a
  }), [l.elements, a]), b = I.useMemo(() => ({
    ...l,
    refs: w,
    elements: x,
    dataRef: d,
    nodeId: o,
    floatingId: m,
    events: p,
    open: n,
    onOpenChange: f
  }), [l, o, m, p, n, f, w, x]);
  return pt(() => {
    const y = c == null ? void 0 : c.nodesRef.current.find((S) => S.id === o);
    y && (y.context = b);
  }), I.useMemo(() => ({
    ...l,
    context: b,
    refs: w,
    elements: x
  }), [l, w, x, b]);
}
function ih(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    events: s,
    refs: i,
    elements: {
      floating: a,
      domReference: l
    }
  } = e, {
    enabled: c = !0,
    keyboardOnly: f = !0
  } = t, u = I.useRef(""), d = I.useRef(!1), p = I.useRef();
  return I.useEffect(() => {
    if (!c)
      return;
    const g = St(a).defaultView || window;
    function h() {
      !n && Yc(l) && l === Qg(St(l)) && (d.current = !0);
    }
    return g.addEventListener("blur", h), () => {
      g.removeEventListener("blur", h);
    };
  }, [a, l, n, c]), I.useEffect(() => {
    if (!c)
      return;
    function m(g) {
      (g.type === "referencePress" || g.type === "escapeKey") && (d.current = !0);
    }
    return s.on("dismiss", m), () => {
      s.off("dismiss", m);
    };
  }, [s, c]), I.useEffect(() => () => {
    clearTimeout(p.current);
  }, []), I.useMemo(() => c ? {
    reference: {
      onPointerDown(m) {
        let {
          pointerType: g
        } = m;
        u.current = g, d.current = !!(g && f);
      },
      onMouseLeave() {
        d.current = !1;
      },
      onFocus(m) {
        var g;
        d.current || m.type === "focus" && ((g = o.current.openEvent) == null ? void 0 : g.type) === "mousedown" && cr(o.current.openEvent, l) || r(!0, m.nativeEvent);
      },
      onBlur(m) {
        d.current = !1;
        const g = m.relatedTarget, h = st(g) && g.hasAttribute(Jc("focus-guard")) && g.getAttribute("data-type") === "outside";
        p.current = setTimeout(() => {
          gs(i.floating.current, g) || gs(l, g) || h || r(!1, m.nativeEvent);
        });
      }
    }
  } : {}, [c, f, l, i, o, r]);
}
function Wo(e, t, n) {
  const r = /* @__PURE__ */ new Map();
  return {
    ...n === "floating" && {
      tabIndex: -1
    },
    ...e,
    ...t.map((o) => o ? o[n] : null).concat(e).reduce((o, s) => (s && Object.entries(s).forEach((i) => {
      let [a, l] = i;
      if (a.indexOf("on") === 0) {
        if (r.has(a) || r.set(a, []), typeof l == "function") {
          var c;
          (c = r.get(a)) == null || c.push(l), o[a] = function() {
            for (var f, u = arguments.length, d = new Array(u), p = 0; p < u; p++)
              d[p] = arguments[p];
            return (f = r.get(a)) == null ? void 0 : f.map((m) => m(...d)).find((m) => m !== void 0);
          };
        }
      } else
        o[a] = l;
    }), o), {})
  };
}
function ah(e) {
  e === void 0 && (e = []);
  const t = e, n = I.useCallback(
    (s) => Wo(s, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), r = I.useCallback(
    (s) => Wo(s, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o = I.useCallback(
    (s) => Wo(s, e, "item"),
    // Granularly check for `item` changes, because the `getItemProps` getter
    // should be as referentially stable as possible since it may be passed as
    // a prop to many components. All `item` key values must therefore be
    // memoized.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    e.map((s) => s == null ? void 0 : s.item)
  );
  return I.useMemo(() => ({
    getReferenceProps: n,
    getFloatingProps: r,
    getItemProps: o
  }), [n, r, o]);
}
function lh(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    floatingId: r
  } = e, {
    enabled: o = !0,
    role: s = "dialog"
  } = t, i = qc();
  return I.useMemo(() => {
    const a = {
      id: r,
      role: s
    };
    return o ? s === "tooltip" ? {
      reference: {
        "aria-describedby": n ? r : void 0
      },
      floating: a
    } : {
      reference: {
        "aria-expanded": n ? "true" : "false",
        "aria-haspopup": s === "alertdialog" ? "dialog" : s,
        "aria-controls": n ? r : void 0,
        ...s === "listbox" && {
          role: "combobox"
        },
        ...s === "menu" && {
          id: i
        }
      },
      floating: {
        ...a,
        ...s === "menu" && {
          "aria-labelledby": i
        }
      }
    } : {};
  }, [o, s, n, r, i]);
}
function eu(e, t) {
  if (e === "rtl" && (t.includes("right") || t.includes("left"))) {
    const [n, r] = t.split("-"), o = n === "right" ? "left" : "right";
    return r === void 0 ? o : `${o}-${r}`;
  }
  return t;
}
function qa(e, t, n, r) {
  return e === "center" || r === "center" ? { top: t } : e === "end" ? { bottom: n } : e === "start" ? { top: n } : {};
}
function Ka(e, t, n, r, o) {
  return e === "center" || r === "center" ? { left: t } : e === "end" ? { [o === "ltr" ? "right" : "left"]: n } : e === "start" ? { [o === "ltr" ? "left" : "right"]: n } : {};
}
const ch = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function uh({
  position: e,
  arrowSize: t,
  arrowOffset: n,
  arrowRadius: r,
  arrowPosition: o,
  arrowX: s,
  arrowY: i,
  dir: a
}) {
  const [l, c = "center"] = e.split("-"), f = {
    width: D(t),
    height: D(t),
    transform: "rotate(45deg)",
    position: "absolute",
    [ch[l]]: D(r)
  }, u = D(-t / 2);
  return l === "left" ? {
    ...f,
    ...qa(c, i, n, o),
    right: u,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  } : l === "right" ? {
    ...f,
    ...qa(c, i, n, o),
    left: u,
    borderRightColor: "transparent",
    borderTopColor: "transparent"
  } : l === "top" ? {
    ...f,
    ...Ka(c, s, n, o, a),
    bottom: u,
    borderTopColor: "transparent",
    borderLeftColor: "transparent"
  } : l === "bottom" ? {
    ...f,
    ...Ka(c, s, n, o, a),
    top: u,
    borderBottomColor: "transparent",
    borderRightColor: "transparent"
  } : {};
}
const Xs = oe(
  ({
    position: e,
    arrowSize: t,
    arrowOffset: n,
    arrowRadius: r,
    arrowPosition: o,
    visible: s,
    arrowX: i,
    arrowY: a,
    style: l,
    ...c
  }, f) => {
    const { dir: u } = jn();
    return s ? /* @__PURE__ */ v.createElement(
      "div",
      {
        ...c,
        ref: f,
        style: {
          ...l,
          ...uh({
            position: e,
            arrowSize: t,
            arrowOffset: n,
            arrowRadius: r,
            arrowPosition: o,
            dir: u,
            arrowX: i,
            arrowY: a
          })
        }
      }
    ) : null;
  }
);
Xs.displayName = "@mantine/core/FloatingArrow";
const [dh, tu] = Lt(
  "Popover component was not found in the tree"
);
function nu({
  children: e,
  active: t = !0,
  refProp: n = "ref"
}) {
  const r = Bp(t), o = Pe(r, e == null ? void 0 : e.ref);
  return Tt(e) ? Kt(e, { [n]: o }) : e;
}
nu.displayName = "@mantine/core/FocusTrap";
function fh(e) {
  const t = document.createElement("div");
  return t.setAttribute("data-portal", "true"), typeof e.className == "string" && t.classList.add(...e.className.split(" ").filter(Boolean)), typeof e.style == "object" && Object.assign(t.style, e.style), typeof e.id == "string" && t.setAttribute("id", e.id), t;
}
const ph = {}, ru = oe((e, t) => {
  const { children: n, target: r, ...o } = j("Portal", ph, e), [s, i] = z(!1), a = V(null);
  return _n(() => (i(!0), a.current = r ? typeof r == "string" ? document.querySelector(r) : r : fh(o), cc(t, a.current), !r && a.current && document.body.appendChild(a.current), () => {
    !r && a.current && document.body.removeChild(a.current);
  }), [r]), !s || !a.current ? null : Pf(/* @__PURE__ */ v.createElement(v.Fragment, null, n), a.current);
});
ru.displayName = "@mantine/core/Portal";
function zr({ withinPortal: e = !0, children: t, ...n }) {
  return e ? /* @__PURE__ */ v.createElement(ru, { ...n }, t) : /* @__PURE__ */ v.createElement(v.Fragment, null, t);
}
zr.displayName = "@mantine/core/OptionalPortal";
const Sn = (e) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${D(e === "bottom" ? 10 : -10)})` },
  transitionProperty: "transform, opacity"
}), tr = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity"
  },
  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: `translateY(-${D(20)}) skew(-10deg, -5deg)` },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: `translateY(${D(20)}) skew(-10deg, -5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${D(20)}) rotate(-5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${D(20)}) rotate(5deg)` },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity"
  },
  pop: {
    ...Sn("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...Sn("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...Sn("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...Sn("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...Sn("top"),
    common: { transformOrigin: "top right" }
  }
}, Ya = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function mh({
  transition: e,
  state: t,
  duration: n,
  timingFunction: r
}) {
  const o = {
    transitionDuration: `${n}ms`,
    transitionTimingFunction: r
  };
  return typeof e == "string" ? e in tr ? {
    transitionProperty: tr[e].transitionProperty,
    ...o,
    ...tr[e].common,
    ...tr[e][Ya[t]]
  } : {} : {
    transitionProperty: e.transitionProperty,
    ...o,
    ...e.common,
    ...e[Ya[t]]
  };
}
function gh({
  duration: e,
  exitDuration: t,
  timingFunction: n,
  mounted: r,
  onEnter: o,
  onExit: s,
  onEntered: i,
  onExited: a
}) {
  const l = dt(), c = dc(), f = l.respectReducedMotion ? c : !1, [u, d] = z(f ? 0 : e), [p, m] = z(r ? "entered" : "exited"), g = V(-1), h = (w) => {
    const x = w ? o : s, b = w ? i : a;
    m(w ? "pre-entering" : "pre-exiting"), window.clearTimeout(g.current);
    const y = f ? 0 : w ? e : t;
    if (d(y), y === 0)
      typeof x == "function" && x(), typeof b == "function" && b(), m(w ? "entered" : "exited");
    else {
      const S = window.setTimeout(() => {
        typeof x == "function" && x(), m(w ? "entering" : "exiting");
      }, 10);
      g.current = window.setTimeout(() => {
        window.clearTimeout(S), typeof b == "function" && b(), m(w ? "entered" : "exited");
      }, y);
    }
  };
  return It(() => {
    h(r);
  }, [r]), W(() => () => window.clearTimeout(g.current), []), {
    transitionDuration: u,
    transitionStatus: p,
    transitionTimingFunction: n || "ease"
  };
}
function Js({
  keepMounted: e,
  transition: t = "fade",
  duration: n = 250,
  exitDuration: r = n,
  mounted: o,
  children: s,
  timingFunction: i = "ease",
  onExit: a,
  onEntered: l,
  onEnter: c,
  onExited: f
}) {
  const { transitionDuration: u, transitionStatus: d, transitionTimingFunction: p } = gh({
    mounted: o,
    exitDuration: r,
    duration: n,
    timingFunction: i,
    onExit: a,
    onEntered: l,
    onEnter: c,
    onExited: f
  });
  return u === 0 ? o ? /* @__PURE__ */ v.createElement(v.Fragment, null, s({})) : e ? s({ display: "none" }) : null : d === "exited" ? e ? s({ display: "none" }) : null : /* @__PURE__ */ v.createElement(v.Fragment, null, s(
    mh({
      transition: t,
      duration: u,
      state: d,
      timingFunction: p
    })
  ));
}
Js.displayName = "@mantine/core/Transition";
var ou = { dropdown: "m-38a85659", arrow: "m-a31dc6c1" };
const hh = {}, Qs = q((e, t) => {
  var h, w, x, b;
  const n = j("PopoverDropdown", hh, e), {
    className: r,
    style: o,
    vars: s,
    children: i,
    onKeyDownCapture: a,
    variant: l,
    classNames: c,
    styles: f,
    ...u
  } = n, d = tu(), p = Np({
    opened: d.opened,
    shouldReturnFocus: d.returnFocus
  }), m = d.withRoles ? {
    "aria-labelledby": d.getTargetId(),
    id: d.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {}, g = Pe(t, d.floating);
  return d.disabled ? null : /* @__PURE__ */ v.createElement(zr, { ...d.portalProps, withinPortal: d.withinPortal }, /* @__PURE__ */ v.createElement(
    Js,
    {
      mounted: d.opened,
      ...d.transitionProps,
      transition: ((h = d.transitionProps) == null ? void 0 : h.transition) || "fade",
      duration: ((w = d.transitionProps) == null ? void 0 : w.duration) ?? 150,
      keepMounted: d.keepMounted,
      exitDuration: typeof ((x = d.transitionProps) == null ? void 0 : x.exitDuration) == "number" ? d.transitionProps.exitDuration : (b = d.transitionProps) == null ? void 0 : b.duration
    },
    (y) => /* @__PURE__ */ v.createElement(nu, { active: d.trapFocus }, /* @__PURE__ */ v.createElement(
      U,
      {
        ...m,
        ...u,
        variant: l,
        ref: g,
        onKeyDownCapture: Sp(d.onClose, {
          active: d.closeOnEscape,
          onTrigger: p,
          onKeyDown: a
        }),
        "data-position": d.placement,
        ...d.getStyles("dropdown", {
          className: r,
          props: n,
          classNames: c,
          styles: f,
          style: [
            {
              ...y,
              zIndex: d.zIndex,
              top: d.y ?? 0,
              left: d.x ?? 0,
              width: d.width === "target" ? void 0 : D(d.width)
            },
            o
          ]
        })
      },
      i,
      /* @__PURE__ */ v.createElement(
        Xs,
        {
          ref: d.arrowRef,
          arrowX: d.arrowX,
          arrowY: d.arrowY,
          visible: d.withArrow,
          position: d.placement,
          arrowSize: d.arrowSize,
          arrowRadius: d.arrowRadius,
          arrowOffset: d.arrowOffset,
          arrowPosition: d.arrowPosition,
          ...d.getStyles("arrow", {
            props: n,
            classNames: c,
            styles: f
          })
        }
      )
    ))
  ));
});
Qs.classes = ou;
Qs.displayName = "@mantine/core/PopoverDropdown";
const bh = {
  refProp: "ref",
  popupType: "dialog"
}, su = q((e, t) => {
  const { children: n, refProp: r, popupType: o, ...s } = j(
    "PopoverTarget",
    bh,
    e
  );
  if (!Tt(n))
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const i = s, a = tu(), l = Pe(a.reference, n.ref, t), c = a.withRoles ? {
    "aria-haspopup": o,
    "aria-expanded": a.opened,
    "aria-controls": a.getDropdownId(),
    id: a.getTargetId()
  } : {};
  return Kt(n, {
    ...i,
    ...c,
    ...a.targetProps,
    className: nt(a.targetProps.className, i.className, n.props.className),
    [r]: l,
    ...a.controlled ? null : { onClick: a.onToggle }
  });
});
su.displayName = "@mantine/core/PopoverTarget";
function iu({
  opened: e,
  floating: t,
  position: n,
  positionDependencies: r
}) {
  const [o, s] = z(0);
  W(() => {
    if (t.refs.reference.current && t.refs.floating.current)
      return Lg(
        t.refs.reference.current,
        t.refs.floating.current,
        t.update
      );
  }, [
    t.refs.reference.current,
    t.refs.floating.current,
    e,
    o,
    n
  ]), It(() => {
    t.update();
  }, r), It(() => {
    s((i) => i + 1);
  }, [e]);
}
function yh(e, t) {
  var r, o, s, i;
  const n = [kc(e.offset)];
  return (r = e.middlewares) != null && r.shift && n.push(zs({ limiter: gg() })), (o = e.middlewares) != null && o.flip && n.push(Lc()), (s = e.middlewares) != null && s.inline && n.push(Fc()), n.push(Hc({ element: e.arrowRef, padding: e.arrowOffset })), ((i = e.middlewares) != null && i.size || e.width === "target") && n.push(
    hg({
      apply({ rects: a, availableWidth: l, availableHeight: c }) {
        var d, p;
        const u = ((d = t().refs.floating.current) == null ? void 0 : d.style) ?? {};
        (p = e.middlewares) != null && p.size && Object.assign(u, {
          maxWidth: `${l}px`,
          maxHeight: `${c}px`
        }), e.width === "target" && Object.assign(u, {
          width: `${a.reference.width}px`
        });
      }
    })
  ), n;
}
function vh(e) {
  const [t, n] = Rt({
    value: e.opened,
    defaultValue: e.defaultOpened,
    finalValue: !1,
    onChange: e.onChange
  }), r = () => {
    var i;
    t && ((i = e.onClose) == null || i.call(e), n(!1));
  }, o = () => {
    var i, a;
    t ? ((i = e.onClose) == null || i.call(e), n(!1)) : ((a = e.onOpen) == null || a.call(e), n(!0));
  }, s = Ys({
    placement: e.position,
    middleware: yh(e, () => s)
  });
  return iu({
    opened: e.opened,
    position: e.position,
    positionDependencies: e.positionDependencies || [],
    floating: s
  }), It(() => {
    var i;
    (i = e.onPositionChange) == null || i.call(e, s.placement);
  }, [s.placement]), It(() => {
    var i, a;
    e.opened ? (a = e.onOpen) == null || a.call(e) : (i = e.onClose) == null || i.call(e);
  }, [e.opened]), {
    floating: s,
    controlled: typeof e.opened == "boolean",
    opened: t,
    onClose: r,
    onToggle: o
  };
}
const wh = {
  position: "bottom",
  offset: 8,
  positionDependencies: [],
  transitionProps: { transition: "fade", duration: 150 },
  middlewares: { flip: !0, shift: !0, inline: !1 },
  arrowSize: 7,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  closeOnClickOutside: !0,
  withinPortal: !0,
  closeOnEscape: !0,
  trapFocus: !1,
  withRoles: !0,
  returnFocus: !1,
  clickOutsideEvents: ["mousedown", "touchstart"],
  zIndex: Rs("popover"),
  __staticSelector: "Popover",
  width: "max-content"
}, xh = (e, { radius: t, shadow: n }) => ({
  dropdown: {
    "--popover-radius": t === void 0 ? void 0 : ut(t),
    "--popover-shadow": Ep(n)
  }
});
function rt(e) {
  var yt, je, Se, pe, vt, Ft;
  const t = j("Popover", wh, e), {
    children: n,
    position: r,
    offset: o,
    onPositionChange: s,
    positionDependencies: i,
    opened: a,
    transitionProps: l,
    width: c,
    middlewares: f,
    withArrow: u,
    arrowSize: d,
    arrowOffset: p,
    arrowRadius: m,
    arrowPosition: g,
    unstyled: h,
    classNames: w,
    styles: x,
    closeOnClickOutside: b,
    withinPortal: y,
    portalProps: S,
    closeOnEscape: C,
    clickOutsideEvents: E,
    trapFocus: P,
    onClose: L,
    onOpen: T,
    onChange: N,
    zIndex: M,
    radius: F,
    shadow: A,
    id: $,
    defaultOpened: R,
    __staticSelector: B,
    withRoles: O,
    disabled: H,
    returnFocus: X,
    variant: ne,
    keepMounted: ge,
    vars: le,
    ...De
  } = t, he = te({
    name: B,
    props: t,
    classes: ou,
    classNames: w,
    styles: x,
    unstyled: h,
    rootSelector: "dropdown",
    vars: le,
    varsResolver: xh
  }), re = V(null), [be, Oe] = z(null), [we, xe] = z(null), { dir: Ne } = jn(), ie = Mt($), Y = vh({
    middlewares: f,
    width: c,
    position: eu(Ne, r),
    offset: typeof o == "number" ? o + (u ? d / 2 : 0) : o,
    arrowRef: re,
    arrowOffset: p,
    onPositionChange: s,
    positionDependencies: i,
    opened: a,
    defaultOpened: R,
    onChange: N,
    onOpen: T,
    onClose: L
  });
  Ip(() => b && Y.onClose(), E, [
    be,
    we
  ]);
  const Xt = ee(
    (se) => {
      Oe(se), Y.floating.refs.setReference(se);
    },
    [Y.floating.refs.setReference]
  ), _e = ee(
    (se) => {
      xe(se), Y.floating.refs.setFloating(se);
    },
    [Y.floating.refs.setFloating]
  );
  return /* @__PURE__ */ v.createElement(
    dh,
    {
      value: {
        returnFocus: X,
        disabled: H,
        controlled: Y.controlled,
        reference: Xt,
        floating: _e,
        x: Y.floating.x,
        y: Y.floating.y,
        arrowX: (Se = (je = (yt = Y.floating) == null ? void 0 : yt.middlewareData) == null ? void 0 : je.arrow) == null ? void 0 : Se.x,
        arrowY: (Ft = (vt = (pe = Y.floating) == null ? void 0 : pe.middlewareData) == null ? void 0 : vt.arrow) == null ? void 0 : Ft.y,
        opened: Y.opened,
        arrowRef: re,
        transitionProps: l,
        width: c,
        withArrow: u,
        arrowSize: d,
        arrowOffset: p,
        arrowRadius: m,
        arrowPosition: g,
        placement: Y.floating.placement,
        trapFocus: P,
        withinPortal: y,
        portalProps: S,
        zIndex: M,
        radius: F,
        shadow: A,
        closeOnEscape: C,
        onClose: Y.onClose,
        onToggle: Y.onToggle,
        getTargetId: () => `${ie}-target`,
        getDropdownId: () => `${ie}-dropdown`,
        withRoles: O,
        targetProps: De,
        __staticSelector: B,
        classNames: w,
        styles: x,
        unstyled: h,
        variant: ne,
        keepMounted: ge,
        getStyles: he
      }
    },
    n
  );
}
rt.Target = su;
rt.Dropdown = Qs;
rt.displayName = "@mantine/core/Popover";
rt.extend = (e) => e;
var Xe = { root: "m-5ae2e3c", barsLoader: "m-7a2bd4cd", bar: "m-870bb79", "bars-loader-animation": "m-5d2b3b9d", dotsLoader: "m-4e3f22d7", dot: "m-870c4af", "loader-dots-animation": "m-aac34a1", ovalLoader: "m-b34414df", "oval-loader-animation": "m-f8e89c4b" };
const Sh = oe(({ className: e, ...t }, n) => /* @__PURE__ */ v.createElement(U, { component: "span", className: nt(Xe.barsLoader, e), ...t, ref: n }, /* @__PURE__ */ v.createElement("span", { className: Xe.bar }), /* @__PURE__ */ v.createElement("span", { className: Xe.bar }), /* @__PURE__ */ v.createElement("span", { className: Xe.bar }))), Ch = oe(({ className: e, ...t }, n) => /* @__PURE__ */ v.createElement(U, { component: "span", className: nt(Xe.dotsLoader, e), ...t, ref: n }, /* @__PURE__ */ v.createElement("span", { className: Xe.dot }), /* @__PURE__ */ v.createElement("span", { className: Xe.dot }), /* @__PURE__ */ v.createElement("span", { className: Xe.dot }))), Eh = oe(({ className: e, ...t }, n) => /* @__PURE__ */ v.createElement(U, { component: "span", className: nt(Xe.ovalLoader, e), ...t, ref: n })), au = {
  bars: Sh,
  oval: Eh,
  dots: Ch
}, Ph = {
  loaders: au,
  type: "oval"
}, Dh = (e, { size: t, color: n }) => ({
  root: {
    "--loader-size": ue(t, "loader-size"),
    "--loader-color": n ? mt(n, e) : void 0
  }
}), Hr = q((e, t) => {
  const n = j("Loader", Ph, e), {
    size: r,
    color: o,
    type: s,
    vars: i,
    className: a,
    style: l,
    classNames: c,
    styles: f,
    unstyled: u,
    loaders: d,
    variant: p,
    children: m,
    ...g
  } = n, h = te({
    name: "Loader",
    props: n,
    classes: Xe,
    className: a,
    style: l,
    classNames: c,
    styles: f,
    unstyled: u,
    vars: i,
    varsResolver: Dh
  });
  return m ? /* @__PURE__ */ v.createElement(U, { ...h("root"), ref: t, ...g }, m) : /* @__PURE__ */ v.createElement(
    U,
    {
      ...h("root"),
      ref: t,
      component: d[s],
      variant: p,
      size: r,
      ...g
    }
  );
});
Hr.defaultLoaders = au;
Hr.classes = Xe;
Hr.displayName = "@mantine/core/Loader";
var Ur = { root: "m-8d3f4000", loader: "m-302b9fb1", group: "m-1a0f1b21" };
const Xa = {
  orientation: "horizontal"
}, Ih = (e, { borderWidth: t }) => ({
  group: { "--ai-border-width": D(t) }
}), Zs = q((e, t) => {
  const n = j("ActionIconGroup", Xa, e), {
    className: r,
    style: o,
    classNames: s,
    styles: i,
    unstyled: a,
    orientation: l,
    vars: c,
    borderWidth: f,
    variant: u,
    ...d
  } = j("ActionIconGroup", Xa, e), p = te({
    name: "ActionIconGroup",
    props: n,
    classes: Ur,
    className: r,
    style: o,
    classNames: s,
    styles: i,
    unstyled: a,
    vars: c,
    varsResolver: Ih,
    rootSelector: "group"
  });
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ...p("group"),
      ref: t,
      variant: u,
      mod: { "data-orientation": l },
      role: "group",
      ...d
    }
  );
});
Zs.classes = Ur;
Zs.displayName = "@mantine/core/ActionIconGroup";
const Rh = {}, Ah = (e, { size: t, radius: n, variant: r, gradient: o, color: s }) => {
  const i = e.variantColorResolver({
    color: s || e.primaryColor,
    theme: e,
    gradient: o,
    variant: r || "filled"
  });
  return {
    root: {
      "--ai-size": ue(t, "ai-size"),
      "--ai-radius": n === void 0 ? void 0 : ut(n),
      "--ai-bg": s || r ? i.background : void 0,
      "--ai-hover": s || r ? i.hover : void 0,
      "--ai-hover-color": s || r ? i.hoverColor : void 0,
      "--ai-color": s || r ? i.color : void 0,
      "--ai-bd": s || r ? i.border : void 0
    }
  };
}, Ht = dn((e, t) => {
  const n = j("ActionIcon", Rh, e), {
    className: r,
    unstyled: o,
    variant: s,
    classNames: i,
    styles: a,
    style: l,
    loading: c,
    loaderProps: f,
    size: u,
    color: d,
    radius: p,
    __staticSelector: m,
    gradient: g,
    vars: h,
    children: w,
    disabled: x,
    "data-disabled": b,
    ...y
  } = n, S = te({
    name: ["ActionIcon", m],
    props: n,
    className: r,
    style: l,
    classes: Ur,
    classNames: i,
    styles: a,
    unstyled: o,
    vars: h,
    varsResolver: Ah
  });
  return /* @__PURE__ */ v.createElement(
    fn,
    {
      ...S("root", { active: !x && !c && !b }),
      ...y,
      unstyled: o,
      variant: s,
      size: u,
      disabled: x || c,
      ref: t,
      mod: { loading: c, disabled: x || b }
    },
    c ? /* @__PURE__ */ v.createElement(
      Hr,
      {
        ...S("loader"),
        color: "var(--ai-color)",
        size: "calc(var(--ai-size) * 0.55)",
        ...f
      }
    ) : w
  );
});
Ht.classes = Ur;
Ht.displayName = "@mantine/core/ActionIcon";
Ht.Group = Zs;
const lu = oe(
  ({ size: e = "var(--cb-icon-size, 70%)", style: t, ...n }, r) => /* @__PURE__ */ v.createElement(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...t, width: e, height: e },
      ref: r,
      ...n
    },
    /* @__PURE__ */ v.createElement(
      "path",
      {
        d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  )
);
lu.displayName = "@mantine/core/CloseIcon";
var cu = { root: "m-86a44da5", "root--subtle": "m-220c80f2" };
const Oh = {
  variant: "subtle"
}, Nh = (e, { size: t, radius: n, iconSize: r }) => ({
  root: {
    "--cb-size": ue(t, "cb-size"),
    "--cb-radius": n === void 0 ? void 0 : ut(n),
    "--cb-icon-size": D(r)
  }
}), qr = dn((e, t) => {
  const n = j("CloseButton", Oh, e), {
    iconSize: r,
    children: o,
    vars: s,
    radius: i,
    className: a,
    classNames: l,
    style: c,
    styles: f,
    unstyled: u,
    "data-disabled": d,
    disabled: p,
    variant: m,
    ...g
  } = n, h = te({
    name: "CloseButton",
    props: n,
    className: a,
    style: c,
    classes: cu,
    classNames: l,
    styles: f,
    unstyled: u,
    vars: s,
    varsResolver: Nh
  });
  return /* @__PURE__ */ v.createElement(
    fn,
    {
      ref: t,
      ...g,
      unstyled: u,
      variant: m,
      disabled: p,
      mod: { disabled: p || d },
      ...h("root", { variant: m, active: !0 })
    },
    /* @__PURE__ */ v.createElement(lu, null),
    o
  );
});
qr.classes = cu;
qr.displayName = "@mantine/core/CloseButton";
function $h(e) {
  return Cf.toArray(e).filter(Boolean);
}
var uu = { root: "m-4081bf90" };
const Th = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, Lh = (e, { grow: t, preventGrowOverflow: n, gap: r, align: o, justify: s, wrap: i }, { childWidth: a }) => ({
  root: {
    "--group-child-width": t && n ? a : void 0,
    "--group-gap": As(r),
    "--group-align": o,
    "--group-justify": s,
    "--group-wrap": i
  }
}), xt = q((e, t) => {
  const n = j("Group", Th, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    children: l,
    gap: c,
    align: f,
    justify: u,
    wrap: d,
    grow: p,
    preventGrowOverflow: m,
    vars: g,
    variant: h,
    __size: w,
    ...x
  } = n, b = $h(l), y = b.length, S = As(c ?? "md"), E = { childWidth: `calc(${100 / y}% - (${S} - ${S} / ${y}))` }, P = te({
    name: "Group",
    props: n,
    stylesCtx: E,
    className: o,
    style: s,
    classes: uu,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: g,
    varsResolver: Lh
  });
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ...P("root"),
      ref: t,
      variant: h,
      mod: { grow: p },
      size: w,
      ...x
    },
    b
  );
});
xt.classes = uu;
xt.displayName = "@mantine/core/Group";
const [Mh, Wn] = Is({
  offsetBottom: !1,
  offsetTop: !1,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0
});
var qe = { wrapper: "m-6c018570", input: "m-8fb7ebe7", section: "m-82577fc2", placeholder: "m-88bacfd0", root: "m-46b77525", label: "m-8fdc1311", required: "m-78a94662", error: "m-8f816625", description: "m-fe47ce59" };
const Ja = {}, Fh = (e, { size: t }) => ({
  description: {
    "--input-description-size": t === void 0 ? void 0 : `calc(${at(t)} - ${D(2)})`
  }
}), Kr = q((e, t) => {
  const n = j("InputDescription", Ja, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    size: c,
    __staticSelector: f,
    __inheritStyles: u = !0,
    variant: d,
    ...p
  } = j("InputDescription", Ja, n), m = Wn(), g = te({
    name: ["InputWrapper", f],
    props: n,
    classes: qe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "description",
    vars: l,
    varsResolver: Fh
  }), h = u && (m == null ? void 0 : m.getStyles) || g;
  return /* @__PURE__ */ v.createElement(
    U,
    {
      component: "p",
      ref: t,
      variant: d,
      size: c,
      ...h("description"),
      ...p
    }
  );
});
Kr.classes = qe;
Kr.displayName = "@mantine/core/InputDescription";
const kh = {}, Bh = (e, { size: t }) => ({
  error: {
    "--input-error-size": t === void 0 ? void 0 : `calc(${at(t)} - ${D(2)})`
  }
}), Yr = q((e, t) => {
  const n = j("InputError", kh, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    size: c,
    __staticSelector: f,
    __inheritStyles: u = !0,
    variant: d,
    ...p
  } = n, m = te({
    name: ["InputWrapper", f],
    props: n,
    classes: qe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "error",
    vars: l,
    varsResolver: Bh
  }), g = Wn(), h = u && (g == null ? void 0 : g.getStyles) || m;
  return /* @__PURE__ */ v.createElement(
    U,
    {
      component: "p",
      ref: t,
      variant: d,
      size: c,
      ...h("error"),
      ...p
    }
  );
});
Yr.classes = qe;
Yr.displayName = "@mantine/core/InputError";
const Qa = {
  labelElement: "label"
}, _h = (e, { size: t }) => ({
  label: {
    "--input-label-size": at(t),
    "--input-asterisk-color": void 0
  }
}), zn = q((e, t) => {
  const n = j("InputLabel", Qa, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    labelElement: c,
    size: f,
    required: u,
    htmlFor: d,
    onMouseDown: p,
    children: m,
    __staticSelector: g,
    variant: h,
    ...w
  } = j("InputLabel", Qa, n), x = te({
    name: ["InputWrapper", g],
    props: n,
    classes: qe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "label",
    vars: l,
    varsResolver: _h
  }), b = Wn(), y = (b == null ? void 0 : b.getStyles) || x;
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ...y("label"),
      component: c,
      variant: h,
      size: f,
      ref: t,
      htmlFor: c === "label" ? d : void 0,
      mod: { required: u },
      onMouseDown: (S) => {
        p == null || p(S), !S.defaultPrevented && S.detail > 1 && S.preventDefault();
      },
      ...w
    },
    m,
    u && /* @__PURE__ */ v.createElement("span", { ...y("required"), "aria-hidden": !0 }, " *")
  );
});
zn.classes = qe;
zn.displayName = "@mantine/core/InputLabel";
const Za = {}, ei = q((e, t) => {
  const n = j("InputPlaceholder", Za, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    __staticSelector: c,
    variant: f,
    error: u,
    ...d
  } = j("InputPlaceholder", Za, n), p = te({
    name: ["InputPlaceholder", c],
    props: n,
    classes: qe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "placeholder"
  });
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ...p("placeholder"),
      mod: { error: !!u },
      component: "span",
      variant: f,
      ref: t,
      ...d
    }
  );
});
ei.classes = qe;
ei.displayName = "@mantine/core/InputPlaceholder";
function jh(e, { hasDescription: t, hasError: n }) {
  const r = e.findIndex((l) => l === "input"), o = e[r - 1], s = e[r + 1];
  return { offsetBottom: t && s === "description" || n && s === "error", offsetTop: t && o === "description" || n && o === "error" };
}
const Vh = {
  labelElement: "label",
  inputContainer: (e) => e,
  inputWrapperOrder: ["label", "description", "input", "error"]
}, Gh = (e, { size: t }) => ({
  label: {
    "--input-label-size": at(t),
    "--input-asterisk-color": void 0
  },
  error: {
    "--input-error-size": t === void 0 ? void 0 : `calc(${at(t)} - ${D(2)})`
  },
  description: {
    "--input-description-size": t === void 0 ? void 0 : `calc(${at(t)} - ${D(2)})`
  }
}), ti = q((e, t) => {
  const n = j("InputWrapper", Vh, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    size: c,
    variant: f,
    __staticSelector: u,
    inputContainer: d,
    inputWrapperOrder: p,
    label: m,
    error: g,
    description: h,
    labelProps: w,
    descriptionProps: x,
    errorProps: b,
    labelElement: y,
    children: S,
    withAsterisk: C,
    id: E,
    required: P,
    __stylesApiProps: L,
    ...T
  } = n, N = te({
    name: ["InputWrapper", u],
    props: L || n,
    classes: qe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Gh
  }), M = {
    size: c,
    variant: f,
    __staticSelector: u
  }, F = Mt(E), A = typeof C == "boolean" ? C : P, $ = (b == null ? void 0 : b.id) || `${F}-error`, R = (x == null ? void 0 : x.id) || `${F}-description`, B = F, O = !!g && typeof g != "boolean", H = !!h, X = `${O ? $ : ""} ${H ? R : ""}`, ne = X.trim().length > 0 ? X.trim() : void 0, ge = (w == null ? void 0 : w.id) || `${F}-label`, le = m && /* @__PURE__ */ v.createElement(
    zn,
    {
      key: "label",
      labelElement: y,
      id: ge,
      htmlFor: B,
      required: A,
      ...M,
      ...w
    },
    m
  ), De = H && /* @__PURE__ */ v.createElement(
    Kr,
    {
      key: "description",
      ...x,
      ...M,
      size: (x == null ? void 0 : x.size) || M.size,
      id: (x == null ? void 0 : x.id) || R
    },
    h
  ), he = /* @__PURE__ */ v.createElement(v.Fragment, { key: "input" }, d(S)), re = O && /* @__PURE__ */ v.createElement(
    Yr,
    {
      ...b,
      ...M,
      size: (b == null ? void 0 : b.size) || M.size,
      key: "error",
      id: (b == null ? void 0 : b.id) || $
    },
    g
  ), be = p.map((Oe) => {
    switch (Oe) {
      case "label":
        return le;
      case "input":
        return he;
      case "description":
        return De;
      case "error":
        return re;
      default:
        return null;
    }
  });
  return /* @__PURE__ */ v.createElement(
    Mh,
    {
      value: {
        getStyles: N,
        describedBy: ne,
        inputId: B,
        labelId: ge,
        ...jh(p, { hasDescription: H, hasError: O })
      }
    },
    /* @__PURE__ */ v.createElement(
      U,
      {
        ref: t,
        variant: f,
        size: c,
        mod: { error: !!g },
        ...N("root"),
        ...T
      },
      be
    )
  );
});
ti.classes = qe;
ti.displayName = "@mantine/core/InputWrapper";
const Wh = {
  variant: "default",
  leftSectionPointerEvents: "none",
  rightSectionPointerEvents: "none",
  withAria: !0,
  withErrorStyles: !0
}, zh = (e, t, n) => ({
  wrapper: {
    "--input-margin-top": n.offsetTop ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-margin-bottom": n.offsetBottom ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-height": ue(t.size, "input-height"),
    "--input-fz": at(t.size),
    "--input-radius": t.radius === void 0 ? void 0 : ut(t.radius),
    "--input-left-section-width": t.leftSectionWidth !== void 0 ? D(t.leftSectionWidth) : void 0,
    "--input-right-section-width": t.rightSectionWidth !== void 0 ? D(t.rightSectionWidth) : void 0,
    "--input-padding-y": t.multiline ? ue(t.size, "input-padding-y") : void 0,
    "--input-left-section-pointer-events": t.leftSectionPointerEvents,
    "--input-right-section-pointer-events": t.rightSectionPointerEvents
  }
}), He = dn((e, t) => {
  const n = j("Input", Wh, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    required: l,
    __staticSelector: c,
    __stylesApiProps: f,
    size: u,
    wrapperProps: d,
    error: p,
    disabled: m,
    leftSection: g,
    leftSectionProps: h,
    leftSectionWidth: w,
    rightSection: x,
    rightSectionProps: b,
    rightSectionWidth: y,
    rightSectionPointerEvents: S,
    leftSectionPointerEvents: C,
    variant: E,
    vars: P,
    pointer: L,
    multiline: T,
    radius: N,
    id: M,
    withAria: F,
    withErrorStyles: A,
    ...$
  } = n, { styleProps: R, rest: B } = _r($), O = Wn(), H = { offsetBottom: O == null ? void 0 : O.offsetBottom, offsetTop: O == null ? void 0 : O.offsetTop }, X = te({
    name: ["Input", c],
    props: f || n,
    classes: qe,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    stylesCtx: H,
    rootSelector: "wrapper",
    vars: P,
    varsResolver: zh
  }), ne = F ? {
    required: l,
    disabled: m,
    "aria-invalid": !!p,
    "aria-describedby": O == null ? void 0 : O.describedBy,
    id: (O == null ? void 0 : O.inputId) || M
  } : {};
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ...X("wrapper"),
      ...R,
      ...d,
      mod: {
        error: !!p && A,
        pointer: L,
        disabled: m,
        multiline: T,
        "data-with-right-section": !!x,
        "data-with-left-section": !!g
      },
      variant: E,
      size: u
    },
    g && /* @__PURE__ */ v.createElement(
      "div",
      {
        ...h,
        "data-position": "left",
        ...X("section", {
          className: h == null ? void 0 : h.className,
          style: h == null ? void 0 : h.style
        })
      },
      g
    ),
    /* @__PURE__ */ v.createElement(
      U,
      {
        component: "input",
        ...B,
        ...ne,
        ref: t,
        required: l,
        mod: { disabled: m, error: !!p && A },
        variant: E,
        ...X("input")
      }
    ),
    x && /* @__PURE__ */ v.createElement(
      "div",
      {
        ...b,
        "data-position": "right",
        ...X("section", {
          className: b == null ? void 0 : b.className,
          style: b == null ? void 0 : b.style
        })
      },
      x
    )
  );
});
He.classes = qe;
He.Wrapper = ti;
He.Label = zn;
He.Error = Yr;
He.Description = Kr;
He.Placeholder = ei;
He.displayName = "@mantine/core/Input";
function Hh(e, t, n) {
  const r = j(e, t, n), {
    label: o,
    description: s,
    error: i,
    required: a,
    classNames: l,
    styles: c,
    className: f,
    unstyled: u,
    __staticSelector: d,
    __stylesApiProps: p,
    errorProps: m,
    labelProps: g,
    descriptionProps: h,
    wrapperProps: w,
    id: x,
    size: b,
    style: y,
    inputContainer: S,
    inputWrapperOrder: C,
    withAsterisk: E,
    variant: P,
    vars: L,
    ...T
  } = r, { styleProps: N, rest: M } = _r(T), F = {
    label: o,
    description: s,
    error: i,
    required: a,
    classNames: l,
    className: f,
    __staticSelector: d,
    __stylesApiProps: p || r,
    errorProps: m,
    labelProps: g,
    descriptionProps: h,
    unstyled: u,
    styles: c,
    size: b,
    style: y,
    inputContainer: S,
    inputWrapperOrder: C,
    withAsterisk: E,
    variant: P,
    id: x,
    ...w
  };
  return {
    ...M,
    classNames: l,
    styles: c,
    unstyled: u,
    wrapperProps: { ...F, ...N },
    inputProps: {
      required: a,
      classNames: l,
      styles: c,
      unstyled: u,
      size: b,
      __staticSelector: d,
      __stylesApiProps: p || r,
      error: i,
      variant: P,
      id: x
    }
  };
}
const Uh = {
  __staticSelector: "InputBase",
  withAria: !0
}, mn = dn((e, t) => {
  const { inputProps: n, wrapperProps: r, ...o } = Hh("InputBase", Uh, e);
  return /* @__PURE__ */ v.createElement(He.Wrapper, { ...r }, /* @__PURE__ */ v.createElement(He, { ...n, ...o, ref: t }));
});
mn.classes = { ...He.classes, ...He.Wrapper.classes };
mn.displayName = "@mantine/core/InputBase";
const [qh, ni] = Lt(
  "Accordion component was not found in the tree"
);
function ri({ style: e, size: t = 16, ...n }) {
  return /* @__PURE__ */ v.createElement(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...e, width: D(t), height: D(t), display: "block" },
      ...n
    },
    /* @__PURE__ */ v.createElement(
      "path",
      {
        d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  );
}
ri.displayName = "@mantine/core/AccordionChevron";
const [Kh, du] = Lt("Accordion.Item component was not found in the tree");
var Hn = { root: "m-9bdbb667", panel: "m-df78851f", content: "m-4ba554d4", itemTitle: "m-8fa820a0", control: "m-4ba585b8", "control--default": "m-6939a5e9", "control--contained": "m-4271d21b", label: "m-df3ffa0f", chevron: "m-3f35ae96", icon: "m-9bd771fe", item: "m-9bd7b098", "item--default": "m-fe19b709", "item--contained": "m-1f921b3b", "item--filled": "m-2cdf939a", "item--separated": "m-9f59b069" };
const Yh = {}, oi = q((e, t) => {
  const {
    classNames: n,
    className: r,
    style: o,
    styles: s,
    vars: i,
    chevron: a,
    icon: l,
    onClick: c,
    onKeyDown: f,
    children: u,
    disabled: d,
    ...p
  } = j("AccordionControl", Yh, e), { value: m } = du(), g = ni(), h = g.isItemActive(m), w = typeof g.order == "number", x = `h${g.order}`, b = /* @__PURE__ */ v.createElement(
    fn,
    {
      ...p,
      ...g.getStyles("control", { className: r, classNames: n, style: o, styles: s, variant: g.variant }),
      unstyled: g.unstyled,
      mod: [
        "accordion-control",
        { active: h, "chevron-position": g.chevronPosition, disabled: d }
      ],
      ref: t,
      onClick: (y) => {
        c == null || c(y), g.onChange(m);
      },
      type: "button",
      disabled: d,
      "aria-expanded": h,
      "aria-controls": g.getRegionId(m),
      id: g.getControlId(m),
      onKeyDown: rc({
        siblingSelector: "[data-accordion-control]",
        parentSelector: "[data-accordion]",
        activateOnFocus: !1,
        loop: g.loop,
        orientation: "vertical",
        onKeyDown: f
      })
    },
    /* @__PURE__ */ v.createElement(
      U,
      {
        component: "span",
        mod: { rotate: !g.disableChevronRotation && h, position: g.chevronPosition },
        ...g.getStyles("chevron", { classNames: n, styles: s })
      },
      a || g.chevron
    ),
    /* @__PURE__ */ v.createElement("span", { ...g.getStyles("label", { classNames: n, styles: s }) }, u),
    l && /* @__PURE__ */ v.createElement(
      U,
      {
        component: "span",
        mod: { "chevron-position": g.chevronPosition },
        ...g.getStyles("icon", { classNames: n, styles: s })
      },
      l
    )
  );
  return w ? /* @__PURE__ */ v.createElement(x, { ...g.getStyles("itemTitle", { classNames: n, styles: s }) }, b) : b;
});
oi.displayName = "@mantine/core/AccordionControl";
oi.classes = Hn;
const Xh = {}, si = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, value: a, ...l } = j(
    "AccordionItem",
    Xh,
    e
  ), c = ni();
  return /* @__PURE__ */ v.createElement(Kh, { value: { value: a } }, /* @__PURE__ */ v.createElement(
    U,
    {
      ref: t,
      mod: { active: c.isItemActive(a) },
      ...c.getStyles("item", { className: r, classNames: n, styles: s, style: o, variant: c.variant }),
      ...l
    }
  ));
});
si.displayName = "@mantine/core/AccordionItem";
si.classes = Hn;
const Jh = {}, ii = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, children: a, ...l } = j(
    "AccordionPanel",
    Jh,
    e
  ), { value: c } = du(), f = ni();
  return /* @__PURE__ */ v.createElement(
    Cc,
    {
      ref: t,
      ...f.getStyles("panel", { className: r, classNames: n, style: o, styles: s }),
      ...l,
      in: f.isItemActive(c),
      transitionDuration: f.transitionDuration ?? 200,
      role: "region",
      id: f.getRegionId(c),
      "aria-labelledby": f.getControlId(c)
    },
    /* @__PURE__ */ v.createElement("div", { ...f.getStyles("content", { classNames: n, styles: s }) }, a)
  );
});
ii.displayName = "@mantine/core/AccordionPanel";
ii.classes = Hn;
const Qh = {
  multiple: !1,
  disableChevronRotation: !1,
  chevronPosition: "right",
  variant: "default",
  chevron: /* @__PURE__ */ v.createElement(ri, null)
}, Zh = (e, { transitionDuration: t, chevronSize: n, radius: r }) => ({
  root: {
    "--accordion-transition-duration": t === void 0 ? void 0 : `${t}ms`,
    "--accordion-chevron-size": n === void 0 ? void 0 : D(n),
    "--accordion-radius": r === void 0 ? void 0 : ut(r)
  }
});
function Ze(e) {
  const t = j("Accordion", Qh, e), {
    classNames: n,
    className: r,
    style: o,
    styles: s,
    unstyled: i,
    vars: a,
    children: l,
    multiple: c,
    value: f,
    defaultValue: u,
    onChange: d,
    id: p,
    loop: m,
    transitionDuration: g,
    disableChevronRotation: h,
    chevronPosition: w,
    chevronSize: x,
    order: b,
    chevron: y,
    variant: S,
    radius: C,
    ...E
  } = t, P = Mt(p), [L, T] = Rt({
    value: f,
    defaultValue: u,
    finalValue: c ? [] : null,
    onChange: d
  }), N = (A) => Array.isArray(L) ? L.includes(A) : A === L, M = (A) => {
    const $ = Array.isArray(L) ? L.includes(A) ? L.filter((R) => R !== A) : [...L, A] : A === L ? null : A;
    T($);
  }, F = te({
    name: "Accordion",
    classes: Hn,
    props: t,
    className: r,
    style: o,
    classNames: n,
    styles: s,
    unstyled: i,
    vars: a,
    varsResolver: Zh
  });
  return /* @__PURE__ */ v.createElement(
    qh,
    {
      value: {
        isItemActive: N,
        onChange: M,
        getControlId: br(
          `${P}-control`,
          "Accordion.Item component was rendered with invalid value or without value"
        ),
        getRegionId: br(
          `${P}-panel`,
          "Accordion.Item component was rendered with invalid value or without value"
        ),
        transitionDuration: g,
        disableChevronRotation: h,
        chevronPosition: w,
        order: b,
        chevron: y,
        loop: m,
        getStyles: F,
        variant: S,
        unstyled: i
      }
    },
    /* @__PURE__ */ v.createElement(U, { ...F("root"), id: P, ...E, variant: S, "data-accordion": !0 }, l)
  );
}
const eb = (e) => e;
Ze.extend = eb;
Ze.classes = Hn;
Ze.displayName = "@mantine/core/Accordion";
Ze.Item = si;
Ze.Panel = ii;
Ze.Control = oi;
Ze.Chevron = ri;
var fu = { root: "m-b6d8b162" };
function tb(e) {
  if (e === "start")
    return "start";
  if (e === "end" || e)
    return "end";
}
const nb = {
  inherit: !1
}, rb = (e, { variant: t, lineClamp: n, gradient: r, size: o, color: s }) => ({
  root: {
    "--text-fz": at(o),
    "--text-lh": Cp(o),
    "--text-gradient": t === "gradient" ? us(r, e) : void 0,
    "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
    "--text-color": s ? mt(s, e) : void 0
  }
}), Ct = dn((e, t) => {
  const n = j("Text", nb, e), {
    lineClamp: r,
    truncate: o,
    inline: s,
    inherit: i,
    gradient: a,
    span: l,
    __staticSelector: c,
    vars: f,
    className: u,
    style: d,
    classNames: p,
    styles: m,
    unstyled: g,
    variant: h,
    mod: w,
    size: x,
    ...b
  } = n, y = te({
    name: ["Text", c],
    props: n,
    classes: fu,
    className: u,
    style: d,
    classNames: p,
    styles: m,
    unstyled: g,
    vars: f,
    varsResolver: rb
  });
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ...y("root", { focusable: !0 }),
      ref: t,
      component: l ? "span" : "p",
      variant: h,
      mod: [
        {
          "data-truncate": tb(o),
          "data-line-clamp": typeof r == "number",
          "data-inline": s,
          "data-inherit": i
        },
        w
      ],
      size: x,
      ...b
    }
  );
});
Ct.classes = fu;
Ct.displayName = "@mantine/core/Text";
function pu(e) {
  return typeof e == "string" ? { value: e, label: e } : typeof e == "number" ? { value: e.toString(), label: e.toString() } : "group" in e ? {
    group: e.group,
    items: e.items.map((t) => pu(t))
  } : e;
}
function mu(e) {
  return e ? e.map(pu) : [];
}
function ai(e) {
  return e.reduce((t, n) => "group" in n ? { ...t, ...ai(n.items) } : (t[n.value] = n, t), {});
}
var Ee = { dropdown: "m-88b62a41", options: "m-b2821a6e", option: "m-92253aa5", search: "m-985517d8", empty: "m-2530cd1d", header: "m-858f94bd", footer: "m-82b967cb", group: "m-254f3e4f", groupLabel: "m-2bb2e9e5", chevron: "m-2943220b", optionsDropdownScrollArea: "m-71d052f9", optionsDropdownOption: "m-390b5f4", optionsDropdownCheckIcon: "m-8ee53fc2" };
const ob = {
  error: null
}, sb = (e, { size: t }) => ({
  chevron: {
    "--combobox-chevron-size": ue(t, "combobox-chevron-size")
  }
}), li = q((e, t) => {
  const n = j("ComboboxChevron", ob, e), { size: r, error: o, style: s, className: i, classNames: a, styles: l, unstyled: c, vars: f, ...u } = n, d = te({
    name: "ComboboxChevron",
    classes: Ee,
    props: n,
    style: s,
    className: i,
    classNames: a,
    styles: l,
    unstyled: c,
    vars: f,
    varsResolver: sb,
    rootSelector: "chevron"
  });
  return /* @__PURE__ */ v.createElement(
    U,
    {
      component: "svg",
      ...u,
      ...d("chevron"),
      size: r,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      mod: ["combobox-chevron", { error: o }],
      ref: t
    },
    /* @__PURE__ */ v.createElement(
      "path",
      {
        d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  );
});
li.classes = Ee;
li.displayName = "@mantine/core/ComboboxChevron";
const [ib, Ke] = Lt(
  "Combobox component was not found in tree"
), gu = oe(
  ({ size: e, onMouseDown: t, onClick: n, onClear: r, ...o }, s) => /* @__PURE__ */ v.createElement(
    qr,
    {
      ref: s,
      size: e || "sm",
      variant: "transparent",
      tabIndex: -1,
      "aria-hidden": !0,
      ...o,
      onMouseDown: (i) => {
        i.preventDefault(), t == null || t(i);
      },
      onClick: (i) => {
        r(), n == null || n(i);
      }
    }
  )
);
gu.displayName = "@mantine/core/ComboboxClearButton";
const ab = {}, ci = q((e, t) => {
  const { classNames: n, styles: r, className: o, style: s, hidden: i, ...a } = j(
    "ComboboxDropdown",
    ab,
    e
  ), l = Ke();
  return /* @__PURE__ */ v.createElement(
    rt.Dropdown,
    {
      ...a,
      ref: t,
      role: "presentation",
      "data-hidden": i || void 0,
      ...l.getStyles("dropdown", { className: o, style: s, classNames: n, styles: r })
    }
  );
});
ci.classes = Ee;
ci.displayName = "@mantine/core/ComboboxDropdown";
const lb = {
  refProp: "ref"
}, hu = q((e, t) => {
  const { children: n, refProp: r } = j("ComboboxDropdownTarget", lb, e);
  if (Ke(), !Tt(n))
    throw new Error(
      "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  return /* @__PURE__ */ v.createElement(rt.Target, { ref: t, refProp: r }, n);
});
hu.displayName = "@mantine/core/ComboboxDropdownTarget";
const cb = {}, ui = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, ...a } = j(
    "ComboboxEmpty",
    cb,
    e
  ), l = Ke();
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ref: t,
      ...l.getStyles("empty", { className: r, classNames: n, styles: s, style: o }),
      ...a
    }
  );
});
ui.classes = Ee;
ui.displayName = "@mantine/core/ComboboxEmpty";
function di({
  onKeyDown: e,
  withKeyboardNavigation: t,
  withAriaAttributes: n,
  withExpandedAttribute: r,
  targetType: o
}) {
  const s = Ke(), [i, a] = z(null), l = (f) => {
    if (e == null || e(f), !s.readOnly && t) {
      if (f.nativeEvent.code === "ArrowDown" && (f.preventDefault(), s.store.dropdownOpened ? a(s.store.selectNextOption()) : (s.store.openDropdown("keyboard"), a(s.store.selectActiveOption()))), f.nativeEvent.code === "ArrowUp" && (f.preventDefault(), s.store.dropdownOpened ? a(s.store.selectPreviousOption()) : (s.store.openDropdown("keyboard"), a(s.store.selectActiveOption()))), f.nativeEvent.code === "Enter") {
        const u = s.store.getSelectedOptionIndex();
        s.store.dropdownOpened && u !== -1 ? (f.preventDefault(), s.store.clickSelectedOption()) : o === "button" && (f.preventDefault(), s.store.openDropdown("keyboard"));
      }
      f.nativeEvent.code === "Escape" && s.store.closeDropdown("keyboard"), f.nativeEvent.code === "Space" && o === "button" && (f.preventDefault(), s.store.toggleDropdown("keyboard"));
    }
  };
  return {
    ...n ? {
      "aria-haspopup": "listbox",
      "aria-expanded": r && !!(s.store.listId && s.store.dropdownOpened) || void 0,
      "aria-controls": s.store.listId,
      "aria-activedescendant": s.store.dropdownOpened && i || void 0,
      autoComplete: "off",
      "data-expanded": s.store.dropdownOpened ? !0 : void 0
    } : {},
    onKeyDown: l
  };
}
const ub = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1
}, bu = q((e, t) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: s,
    withExpandedAttribute: i,
    targetType: a,
    ...l
  } = j("ComboboxEventsTarget", ub, e);
  if (!Tt(n))
    throw new Error(
      "Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const c = Ke(), f = di({
    targetType: a,
    withAriaAttributes: s,
    withKeyboardNavigation: o,
    withExpandedAttribute: i,
    onKeyDown: n.props.onKeyDown
  });
  return Kt(n, {
    ...f,
    ...l,
    [r]: Pe(t, c.store.targetRef, n == null ? void 0 : n.ref)
  });
});
bu.displayName = "@mantine/core/ComboboxEventsTarget";
const db = {}, fi = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, ...a } = j(
    "ComboboxFooter",
    db,
    e
  ), l = Ke();
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ref: t,
      ...l.getStyles("footer", { className: r, classNames: n, style: o, styles: s }),
      ...a
    }
  );
});
fi.classes = Ee;
fi.displayName = "@mantine/core/ComboboxFooter";
const fb = {}, pi = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, children: a, label: l, ...c } = j(
    "ComboboxGroup",
    fb,
    e
  ), f = Ke();
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ref: t,
      ...f.getStyles("group", { className: r, classNames: n, style: o, styles: s }),
      ...c
    },
    l && /* @__PURE__ */ v.createElement("div", { ...f.getStyles("groupLabel", { classNames: n, styles: s }) }, l),
    a
  );
});
pi.classes = Ee;
pi.displayName = "@mantine/core/ComboboxGroup";
const pb = {}, mi = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: s, vars: i, ...a } = j(
    "ComboboxHeader",
    pb,
    e
  ), l = Ke();
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ref: t,
      ...l.getStyles("header", { className: r, classNames: n, style: o, styles: s }),
      ...a
    }
  );
});
mi.classes = Ee;
mi.displayName = "@mantine/core/ComboboxHeader";
const mb = {}, gi = q((e, t) => {
  const n = j("ComboboxOption", mb, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    vars: a,
    onClick: l,
    id: c,
    active: f,
    onMouseDown: u,
    onMouseOver: d,
    disabled: p,
    selected: m,
    ...g
  } = n, h = Ke(), w = Ul(), x = c || w;
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ...h.getStyles("option", { className: o, classNames: r, styles: i, style: s }),
      ...g,
      ref: t,
      id: x,
      mod: [
        "combobox-option",
        { "combobox-active": f, "combobox-disabled": p, "combobox-selected": m }
      ],
      role: "option",
      onClick: (b) => {
        var y;
        p ? b.preventDefault() : ((y = h.onOptionSubmit) == null || y.call(h, n.value, n), l == null || l(b));
      },
      onMouseDown: (b) => {
        b.preventDefault(), u == null || u(b);
      },
      onMouseOver: (b) => {
        h.resetSelectionOnOptionHover && h.store.resetSelectedOption(), d == null || d(b);
      }
    }
  );
});
gi.classes = Ee;
gi.displayName = "@mantine/core/ComboboxOption";
const gb = {}, hi = q((e, t) => {
  const n = j("ComboboxOptions", gb, e), { classNames: r, className: o, style: s, styles: i, id: a, onMouseDown: l, labelledBy: c, ...f } = n, u = Ke(), d = Mt(a);
  return W(() => {
    u.store.setListId(d);
  }, [d]), /* @__PURE__ */ v.createElement(
    U,
    {
      ref: t,
      ...u.getStyles("options", { className: o, style: s, classNames: r, styles: i }),
      ...f,
      id: d,
      role: "listbox",
      "aria-labelledby": c,
      onMouseDown: (p) => {
        p.preventDefault(), l == null || l(p);
      }
    }
  );
});
hi.classes = Ee;
hi.displayName = "@mantine/core/ComboboxOptions";
const hb = {
  withAriaAttributes: !0,
  withKeyboardNavigation: !0
}, bi = q((e, t) => {
  const n = j("ComboboxSearch", hb, e), {
    classNames: r,
    styles: o,
    unstyled: s,
    vars: i,
    withAriaAttributes: a,
    onKeyDown: l,
    withKeyboardNavigation: c,
    size: f,
    ...u
  } = n, d = Ke(), p = d.getStyles("search"), m = di({
    targetType: "input",
    withAriaAttributes: a,
    withKeyboardNavigation: c,
    withExpandedAttribute: !1,
    onKeyDown: l
  });
  return /* @__PURE__ */ v.createElement(
    He,
    {
      ref: Pe(t, d.store.searchRef),
      classNames: [{ input: p.className }, r],
      styles: [{ input: p.style }, o],
      size: f || d.size,
      ...m,
      ...u,
      __staticSelector: "Combobox"
    }
  );
});
bi.classes = Ee;
bi.displayName = "@mantine/core/ComboboxSearch";
const bb = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1
}, yu = q((e, t) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: s,
    withExpandedAttribute: i,
    targetType: a,
    ...l
  } = j("ComboboxTarget", bb, e);
  if (!Tt(n))
    throw new Error(
      "Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const c = Ke(), f = di({
    targetType: a,
    withAriaAttributes: s,
    withKeyboardNavigation: o,
    withExpandedAttribute: i,
    onKeyDown: n.props.onKeyDown
  }), u = Kt(n, {
    ...f,
    ...l
  });
  return /* @__PURE__ */ v.createElement(rt.Target, { ref: Pe(t, c.store.targetRef) }, u);
});
yu.displayName = "@mantine/core/ComboboxTarget";
function yb(e, t, n) {
  for (let r = e - 1; r >= 0; r -= 1)
    if (!t[r].hasAttribute("data-combobox-disabled"))
      return r;
  if (n) {
    for (let r = t.length - 1; r > -1; r -= 1)
      if (!t[r].hasAttribute("data-combobox-disabled"))
        return r;
  }
  return e;
}
function vb(e, t, n) {
  for (let r = e + 1; r < t.length; r += 1)
    if (!t[r].hasAttribute("data-combobox-disabled"))
      return r;
  if (n) {
    for (let r = 0; r < t.length; r += 1)
      if (!t[r].hasAttribute("data-combobox-disabled"))
        return r;
  }
  return e;
}
function wb(e) {
  for (let t = 0; t < e.length; t += 1)
    if (!e[t].hasAttribute("data-combobox-disabled"))
      return t;
  return -1;
}
function yi({
  defaultOpened: e,
  opened: t,
  onOpenedChange: n,
  onDropdownClose: r,
  onDropdownOpen: o,
  loop: s = !0,
  scrollBehavior: i = "instant"
} = {}) {
  const [a, l] = Rt({
    value: t,
    defaultValue: e,
    finalValue: !1,
    onChange: n
  }), c = V(null), f = V(-1), u = V(null), d = V(null), p = V(-1), m = V(-1), g = V(-1), h = ee(
    (R = "unknown") => {
      a || (l(!0), o == null || o(R));
    },
    [l, o, a]
  ), w = ee(
    (R = "unknown") => {
      a && (l(!1), r == null || r(R));
    },
    [l, r, a]
  ), x = ee(
    (R = "unknown") => {
      a ? w(R) : h(R);
    },
    [w, h, a]
  ), b = ee(() => {
    const R = document.querySelector(`#${c.current} [data-combobox-selected]`);
    R == null || R.removeAttribute("data-combobox-selected"), R == null || R.removeAttribute("aria-selected");
  }, []), y = ee(
    (R) => {
      const B = document.getElementById(c.current), O = B == null ? void 0 : B.querySelectorAll("[data-combobox-option]");
      if (!O)
        return null;
      const H = R >= O.length ? 0 : R < 0 ? O.length - 1 : R;
      return f.current = H, O != null && O[H] && !O[H].hasAttribute("data-combobox-disabled") ? (b(), O[H].setAttribute("data-combobox-selected", "true"), O[H].setAttribute("aria-selected", "true"), O[H].scrollIntoView({ block: "nearest", behavior: i }), O[H].id) : null;
    },
    [i, b]
  ), S = ee(() => {
    const R = document.querySelector(
      `#${c.current} [data-combobox-active]`
    );
    if (R) {
      const B = document.querySelectorAll(
        `#${c.current} [data-combobox-option]`
      ), O = Array.from(B).findIndex((H) => H === R);
      return y(O);
    }
    return y(0);
  }, [y]), C = ee(
    () => y(
      vb(
        f.current,
        document.querySelectorAll(`#${c.current} [data-combobox-option]`),
        s
      )
    ),
    [y, s]
  ), E = ee(
    () => y(
      yb(
        f.current,
        document.querySelectorAll(`#${c.current} [data-combobox-option]`),
        s
      )
    ),
    [y, s]
  ), P = ee(
    () => y(
      wb(
        document.querySelectorAll(`#${c.current} [data-combobox-option]`)
      )
    ),
    [y]
  ), L = ee((R = "selected") => {
    g.current = window.setTimeout(() => {
      const B = document.querySelectorAll(
        `#${c.current} [data-combobox-option]`
      ), O = Array.from(B).findIndex(
        (H) => H.hasAttribute(`data-combobox-${R}`)
      );
      f.current = O;
    }, 0);
  }, []), T = ee(() => {
    f.current = -1, b();
  }, [b]), N = ee(() => {
    const R = document.querySelectorAll(
      `#${c.current} [data-combobox-option]`
    ), B = R == null ? void 0 : R[f.current];
    B == null || B.click();
  }, []), M = ee((R) => {
    c.current = R;
  }, []), F = ee(() => {
    p.current = window.setTimeout(() => u.current.focus(), 0);
  }, []), A = ee(() => {
    m.current = window.setTimeout(() => d.current.focus(), 0);
  }, []), $ = ee(() => f.current, []);
  return W(
    () => () => {
      window.clearTimeout(p.current), window.clearTimeout(m.current), window.clearTimeout(g.current);
    },
    []
  ), {
    dropdownOpened: a,
    openDropdown: h,
    closeDropdown: w,
    toggleDropdown: x,
    selectedOptionIndex: f.current,
    getSelectedOptionIndex: $,
    selectOption: y,
    selectFirstOption: P,
    selectActiveOption: S,
    selectNextOption: C,
    selectPreviousOption: E,
    resetSelectedOption: T,
    updateSelectedOptionIndex: L,
    listId: c.current,
    setListId: M,
    clickSelectedOption: N,
    searchRef: u,
    focusSearchInput: F,
    targetRef: d,
    focusTarget: A
  };
}
const xb = {
  keepMounted: !0,
  withinPortal: !0,
  resetSelectionOnOptionHover: !1,
  width: "target",
  transitionProps: { transition: "fade", duration: 0 }
}, Sb = (e, { size: t, dropdownPadding: n }) => ({
  options: {
    "--combobox-option-fz": at(t),
    "--combobox-option-padding": ue(t, "combobox-option-padding")
  },
  dropdown: {
    "--combobox-padding": n === void 0 ? void 0 : D(n),
    "--combobox-option-fz": at(t),
    "--combobox-option-padding": ue(t, "combobox-option-padding")
  }
});
function J(e) {
  const t = j("Combobox", xb, e), {
    classNames: n,
    styles: r,
    unstyled: o,
    children: s,
    store: i,
    vars: a,
    onOptionSubmit: l,
    size: c,
    dropdownPadding: f,
    resetSelectionOnOptionHover: u,
    __staticSelector: d,
    readOnly: p,
    ...m
  } = t, g = yi(), h = i || g, w = te({
    name: d || "Combobox",
    classes: Ee,
    props: t,
    classNames: n,
    styles: r,
    unstyled: o,
    vars: a,
    varsResolver: Sb
  });
  return /* @__PURE__ */ v.createElement(
    ib,
    {
      value: {
        getStyles: w,
        store: h,
        onOptionSubmit: l,
        size: c,
        resetSelectionOnOptionHover: u,
        readOnly: p
      }
    },
    /* @__PURE__ */ v.createElement(
      rt,
      {
        opened: h.dropdownOpened,
        ...m,
        onClose: h.closeDropdown,
        withRoles: !1,
        unstyled: o
      },
      s
    )
  );
}
const Cb = (e) => e;
J.extend = Cb;
J.classes = Ee;
J.displayName = "@mantine/core/Combobox";
J.Target = yu;
J.Dropdown = ci;
J.Options = hi;
J.Option = gi;
J.Search = bi;
J.Empty = ui;
J.Chevron = li;
J.Footer = fi;
J.Header = mi;
J.EventsTarget = bu;
J.DropdownTarget = hu;
J.Group = pi;
J.ClearButton = gu;
function Eb({ size: e, style: t, ...n }) {
  const r = e !== void 0 ? { width: D(e), height: D(e), ...t } : t;
  return /* @__PURE__ */ v.createElement(
    "svg",
    {
      viewBox: "0 0 10 7",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: r,
      "aria-hidden": !0,
      ...n
    },
    /* @__PURE__ */ v.createElement(
      "path",
      {
        d: "M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  );
}
function on(e) {
  return "group" in e;
}
function vu({
  options: e,
  search: t,
  limit: n
}) {
  const r = t.trim().toLowerCase(), o = [];
  for (let s = 0; s < e.length; s += 1) {
    const i = e[s];
    if (o.length === n)
      return o;
    on(i) && o.push({
      group: i.group,
      items: vu({
        options: i.items,
        search: t,
        limit: n - o.length
      })
    }), on(i) || i.label.toLowerCase().includes(r) && o.push(i);
  }
  return o;
}
function Pb(e) {
  if (e.length === 0)
    return !0;
  for (const t of e)
    if (!("group" in t) || t.items.length > 0)
      return !1;
  return !0;
}
function wu(e, t = /* @__PURE__ */ new Set()) {
  if (Array.isArray(e))
    for (const n of e)
      if (on(n))
        wu(n.items, t);
      else {
        if (typeof n.value > "u")
          throw new Error("[@mantine/core] Each option must have value property");
        if (typeof n.value != "string")
          throw new Error(
            `[@mantine/core] Option value must be a string, other data formats are not supported, got ${typeof n.value}`
          );
        if (t.has(n.value))
          throw new Error(
            `[@mantine/core] Duplicate options are not supported. Option with value "${n.value}" was provided more than once`
          );
        t.add(n.value);
      }
}
function zo(e, t) {
  return Array.isArray(e) ? e.includes(t) : e === t;
}
function xu({ data: e, withCheckIcon: t, value: n, checkIconPosition: r, unstyled: o }) {
  if (!on(e)) {
    const i = t && zo(n, e.value) && /* @__PURE__ */ v.createElement(Eb, { className: Ee.optionsDropdownCheckIcon });
    return /* @__PURE__ */ v.createElement(
      J.Option,
      {
        value: e.value,
        disabled: e.disabled,
        className: nt({ [Ee.optionsDropdownOption]: !o }),
        "data-reverse": r === "right" || void 0,
        "data-checked": zo(n, e.value) || void 0,
        "aria-selected": zo(n, e.value)
      },
      r === "left" && i,
      /* @__PURE__ */ v.createElement("span", null, e.label),
      r === "right" && i
    );
  }
  const s = e.items.map((i) => /* @__PURE__ */ v.createElement(
    xu,
    {
      data: i,
      value: n,
      key: i.value,
      unstyled: o,
      withCheckIcon: t,
      checkIconPosition: r
    }
  ));
  return /* @__PURE__ */ v.createElement(J.Group, { label: e.group }, s);
}
function Su({
  data: e,
  hidden: t,
  hiddenWhenEmpty: n,
  filter: r,
  search: o,
  limit: s,
  maxDropdownHeight: i,
  withScrollArea: a = !0,
  filterOptions: l = !0,
  withCheckIcon: c = !1,
  value: f,
  checkIconPosition: u,
  nothingFoundMessage: d,
  unstyled: p,
  labelId: m
}) {
  wu(e);
  const h = typeof o == "string" ? (r || vu)({
    options: e,
    search: l ? o : "",
    limit: s ?? 1 / 0
  }) : e, w = Pb(h), x = h.map((b) => /* @__PURE__ */ v.createElement(
    xu,
    {
      data: b,
      key: on(b) ? b.group : b.value,
      withCheckIcon: c,
      value: f,
      checkIconPosition: u,
      unstyled: p
    }
  ));
  return /* @__PURE__ */ v.createElement(J.Dropdown, { hidden: t || n && w }, /* @__PURE__ */ v.createElement(J.Options, { labelledBy: m }, a ? /* @__PURE__ */ v.createElement(
    Vn.Autosize,
    {
      mah: i ?? 220,
      type: "scroll",
      scrollbarSize: "var(--_combobox-padding)",
      offsetScrollbars: "y",
      className: Ee.optionsDropdownScrollArea
    },
    x
  ) : x, w && d && /* @__PURE__ */ v.createElement(J.Empty, null, d)));
}
var Cu = { root: "m-7485cace" };
const Db = {}, Ib = (e, { size: t, fluid: n }) => ({
  root: {
    "--container-size": n ? void 0 : ue(t, "container-size")
  }
}), vi = q((e, t) => {
  const n = j("Container", Db, e), { classNames: r, className: o, style: s, styles: i, unstyled: a, vars: l, fluid: c, ...f } = n, u = te({
    name: "Container",
    classes: Cu,
    props: n,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Ib
  });
  return /* @__PURE__ */ v.createElement(U, { ref: t, mod: { fluid: c }, ...u("root"), ...f });
});
vi.classes = Cu;
vi.displayName = "@mantine/core/Container";
function Rb({ open: e, close: t, openDelay: n, closeDelay: r }) {
  const o = V(-1), s = V(-1), i = () => {
    window.clearTimeout(o.current), window.clearTimeout(s.current);
  }, a = () => {
    i(), n === 0 || n === void 0 ? e() : o.current = window.setTimeout(e, n);
  }, l = () => {
    i(), r === 0 || r === void 0 ? t() : s.current = window.setTimeout(t, r);
  };
  return W(() => i, []), { openDropdown: a, closeDropdown: l };
}
const [Ab, Eu] = Lt(
  "HoverCard component was not found in the tree"
), Ob = {};
function Pu(e) {
  const { children: t, onMouseEnter: n, onMouseLeave: r, ...o } = j(
    "HoverCardDropdown",
    Ob,
    e
  ), s = Eu(), i = yr(n, s.openDropdown), a = yr(r, s.closeDropdown);
  return /* @__PURE__ */ v.createElement(rt.Dropdown, { onMouseEnter: i, onMouseLeave: a, ...o }, t);
}
Pu.displayName = "@mantine/core/HoverCardDropdown";
const Nb = {
  refProp: "ref"
}, Du = oe((e, t) => {
  const { children: n, refProp: r, eventPropsWrapperName: o, ...s } = j(
    "HoverCardTarget",
    Nb,
    e
  );
  if (!Tt(n))
    throw new Error(
      "HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const i = Eu(), a = yr(n.props.onMouseEnter, i.openDropdown), l = yr(n.props.onMouseLeave, i.closeDropdown), c = { onMouseEnter: a, onMouseLeave: l };
  return /* @__PURE__ */ v.createElement(rt.Target, { refProp: r, ref: t, ...s }, Kt(
    n,
    o ? { [o]: c } : c
  ));
});
Du.displayName = "@mantine/core/HoverCardTarget";
const $b = {
  openDelay: 0,
  closeDelay: 150,
  initiallyOpened: !1
};
function Wt(e) {
  const { children: t, onOpen: n, onClose: r, openDelay: o, closeDelay: s, initiallyOpened: i, ...a } = j(
    "HoverCard",
    $b,
    e
  ), [l, { open: c, close: f }] = Vp(i, { onClose: r, onOpen: n }), { openDropdown: u, closeDropdown: d } = Rb({ open: c, close: f, openDelay: o, closeDelay: s });
  return /* @__PURE__ */ v.createElement(Ab, { value: { openDropdown: u, closeDropdown: d } }, /* @__PURE__ */ v.createElement(rt, { ...a, opened: l, __staticSelector: "HoverCard" }, t));
}
Wt.displayName = "@mantine/core/HoverCard";
Wt.Target = Du;
Wt.Dropdown = Pu;
Wt.extend = (e) => e;
function Tb(e = "top-end", t = 0) {
  const n = {
    "--indicator-top": void 0,
    "--indicator-bottom": void 0,
    "--indicator-left": void 0,
    "--indicator-right": void 0,
    "--indicator-translate-x": void 0,
    "--indicator-translate-y": void 0
  }, r = D(t), [o, s] = e.split("-");
  return o === "top" && (n["--indicator-top"] = r, n["--indicator-translate-y"] = "-50%"), o === "middle" && (n["--indicator-top"] = "50%", n["--indicator-translate-y"] = "-50%"), o === "bottom" && (n["--indicator-bottom"] = r, n["--indicator-translate-y"] = "50%"), s === "start" && (n["--indicator-left"] = r, n["--indicator-translate-x"] = "-50%"), s === "center" && (n["--indicator-left"] = "50%", n["--indicator-translate-x"] = "-50%"), s === "end" && (n["--indicator-right"] = r, n["--indicator-translate-x"] = "50%"), n;
}
var Iu = { root: "m-e5262200", indicator: "m-760d1fb1", processing: "m-885901b1" };
const Lb = {
  position: "top-end",
  offset: 0,
  inline: !1,
  withBorder: !1,
  disabled: !1,
  processing: !1
}, Mb = (e, { color: t, position: n, offset: r, size: o, radius: s, zIndex: i }) => ({
  root: {
    "--indicator-color": t ? mt(t, e) : void 0,
    "--indicator-size": D(o),
    "--indicator-radius": s === void 0 ? void 0 : ut(s),
    "--indicator-z-index": i == null ? void 0 : i.toString(),
    ...Tb(n, r)
  }
}), Vt = q((e, t) => {
  const n = j("Indicator", Lb, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    children: c,
    position: f,
    offset: u,
    inline: d,
    label: p,
    radius: m,
    color: g,
    withBorder: h,
    disabled: w,
    processing: x,
    zIndex: b,
    ...y
  } = n, S = te({
    name: "Indicator",
    classes: Iu,
    props: n,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Mb
  });
  return /* @__PURE__ */ v.createElement(U, { ref: t, ...S("root"), mod: { inline: d }, ...y }, !w && /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(
    U,
    {
      mod: { "with-label": !!p, "with-border": h, processing: x },
      ...S("indicator")
    },
    p
  )), c);
});
Vt.classes = Iu;
Vt.displayName = "@mantine/core/Indicator";
function Ru(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, s;
  for (s = 0; s < r.length; s++)
    o = r[s], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const [Fb, wi] = Is(), [kb, Bb] = Is();
var Xr = { root: "m-7cda1cd6", "root--default": "m-44da308b", "root--contrast": "m-e3a01f8", label: "m-1e0e6180", remove: "m-ae386778", group: "m-1dcfd90b" };
const _b = {}, jb = (e, { gap: t }, { size: n }) => ({
  group: {
    "--pg-gap": t !== void 0 ? ue(t) : ue(n, "pg-gap")
  }
}), xi = q((e, t) => {
  const n = j("PillGroup", _b, e), { classNames: r, className: o, style: s, styles: i, unstyled: a, vars: l, size: c, disabled: f, ...u } = n, d = wi(), p = (d == null ? void 0 : d.size) || c || void 0, m = te({
    name: "PillGroup",
    classes: Xr,
    props: n,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: jb,
    stylesCtx: { size: p },
    rootSelector: "group"
  });
  return /* @__PURE__ */ v.createElement(kb, { value: { size: p, disabled: f } }, /* @__PURE__ */ v.createElement(U, { ref: t, size: p, ...m("group"), ...u }));
});
xi.classes = Xr;
xi.displayName = "@mantine/core/PillGroup";
const Vb = {
  variant: "default"
}, Gb = (e, { radius: t }, { size: n }) => ({
  root: {
    "--pill-fz": ue(n, "pill-fz"),
    "--pill-height": ue(n, "pill-height"),
    "--pill-radius": t === void 0 ? void 0 : ut(t)
  }
}), An = q((e, t) => {
  const n = j("Pill", Vb, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    variant: c,
    children: f,
    withRemoveButton: u,
    onRemove: d,
    removeButtonProps: p,
    radius: m,
    size: g,
    disabled: h,
    ...w
  } = n, x = Bb(), b = wi(), y = g || (x == null ? void 0 : x.size) || void 0, S = (b == null ? void 0 : b.variant) === "filled" ? "contrast" : c || "default", C = te({
    name: "Pill",
    classes: Xr,
    props: n,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: Gb,
    stylesCtx: { size: y }
  });
  return /* @__PURE__ */ v.createElement(
    U,
    {
      component: "span",
      ref: t,
      variant: S,
      size: y,
      ...C("root", { variant: S }),
      mod: { "with-remove": u, disabled: h || (x == null ? void 0 : x.disabled) },
      ...w
    },
    /* @__PURE__ */ v.createElement("span", { ...C("label") }, f),
    u && /* @__PURE__ */ v.createElement(
      qr,
      {
        variant: "transparent",
        radius: m,
        tabIndex: -1,
        "aria-hidden": !0,
        unstyled: a,
        ...p,
        ...C("remove", {
          className: p == null ? void 0 : p.className,
          style: p == null ? void 0 : p.style
        }),
        onMouseDown: (E) => {
          var P;
          E.preventDefault(), E.stopPropagation(), (P = p == null ? void 0 : p.onMouseDown) == null || P.call(p, E);
        },
        onClick: (E) => {
          var P;
          E.stopPropagation(), d == null || d(), (P = p == null ? void 0 : p.onClick) == null || P.call(p, E);
        }
      }
    )
  );
});
An.classes = Xr;
An.displayName = "@mantine/core/Pill";
An.Group = xi;
var Au = { field: "m-45c4369d" };
const Wb = {
  type: "visible"
}, Si = q((e, t) => {
  const n = j("PillsInputField", Wb, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    type: c,
    disabled: f,
    id: u,
    pointer: d,
    ...p
  } = n, m = wi(), g = Wn(), h = te({
    name: "PillsInputField",
    classes: Au,
    props: n,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    rootSelector: "field"
  }), w = f || (m == null ? void 0 : m.disabled);
  return /* @__PURE__ */ v.createElement(
    U,
    {
      component: "input",
      ref: Pe(t, m == null ? void 0 : m.fieldRef),
      "data-type": c,
      disabled: w,
      mod: { disabled: w, pointer: d },
      ...h("field"),
      ...p,
      id: (g == null ? void 0 : g.inputId) || u,
      "aria-invalid": m == null ? void 0 : m.hasError,
      "aria-describedby": g == null ? void 0 : g.describedBy,
      type: "text",
      onMouseDown: (x) => !d && x.stopPropagation()
    }
  );
});
Si.classes = Au;
Si.displayName = "@mantine/core/PillsInputField";
const zb = {}, Er = q((e, t) => {
  const n = j("PillsInput", zb, e), {
    children: r,
    onMouseDown: o,
    onClick: s,
    size: i,
    disabled: a,
    __staticSelector: l,
    error: c,
    variant: f,
    ...u
  } = n, d = V();
  return /* @__PURE__ */ v.createElement(Fb, { value: { fieldRef: d, size: i, disabled: a, hasError: !!c, variant: f } }, /* @__PURE__ */ v.createElement(
    mn,
    {
      size: i,
      error: c,
      variant: f,
      component: "div",
      ref: t,
      onMouseDown: (p) => {
        var m;
        p.preventDefault(), o == null || o(p), (m = d.current) == null || m.focus();
      },
      onClick: (p) => {
        var m;
        p.preventDefault(), s == null || s(p), (m = d.current) == null || m.focus();
      },
      ...u,
      multiline: !0,
      disabled: a,
      __staticSelector: l || "PillsInput",
      withAria: !1
    },
    r
  ));
});
Er.displayName = "@mantine/core/PillsInput";
Er.Field = Si;
function Hb({ data: e, value: t }) {
  const n = t.map((o) => o.trim().toLowerCase());
  return e.reduce((o, s) => (on(s) ? o.push({
    group: s.group,
    items: s.items.filter(
      (i) => n.indexOf(i.value.toLowerCase().trim()) === -1
    )
  }) : n.indexOf(s.value.toLowerCase().trim()) === -1 && o.push(s), o), []);
}
const Ub = {
  maxValues: 1 / 0,
  withCheckIcon: !0,
  checkIconPosition: "left",
  hiddenInputValuesDivider: ","
}, Ci = q((e, t) => {
  const n = j("MultiSelect", Ub, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    size: c,
    value: f,
    defaultValue: u,
    onChange: d,
    onKeyDown: p,
    variant: m,
    data: g,
    dropdownOpened: h,
    defaultDropdownOpened: w,
    onDropdownOpen: x,
    onDropdownClose: b,
    selectFirstOptionOnChange: y,
    onOptionSubmit: S,
    comboboxProps: C,
    filter: E,
    limit: P,
    withScrollArea: L,
    maxDropdownHeight: T,
    searchValue: N,
    defaultSearchValue: M,
    onSearchChange: F,
    readOnly: A,
    disabled: $,
    onFocus: R,
    onBlur: B,
    onPaste: O,
    radius: H,
    rightSection: X,
    rightSectionWidth: ne,
    rightSectionPointerEvents: ge,
    rightSectionProps: le,
    leftSection: De,
    leftSectionWidth: he,
    leftSectionPointerEvents: re,
    leftSectionProps: be,
    inputContainer: Oe,
    inputWrapperOrder: we,
    withAsterisk: xe,
    labelProps: Ne,
    descriptionProps: ie,
    errorProps: Y,
    wrapperProps: Xt,
    description: _e,
    label: yt,
    error: je,
    maxValues: Se,
    searchable: pe,
    nothingFoundMessage: vt,
    withCheckIcon: Ft,
    checkIconPosition: se,
    hidePickedOptions: wt,
    withErrorStyles: af,
    name: lf,
    form: cf,
    id: uf,
    clearable: df,
    clearButtonProps: ff,
    hiddenInputProps: pf,
    placeholder: ia,
    hiddenInputValuesDivider: mf,
    ...gf
  } = n, Ro = Mt(uf), Ao = mu(g), Yn = ai(Ao), $e = yi({
    opened: h,
    defaultOpened: w,
    onDropdownOpen: x,
    onDropdownClose: () => {
      b == null || b(), $e.resetSelectedOption();
    }
  }), {
    styleProps: hf,
    rest: { type: B1, ...bf }
  } = _r(gf), [Ie, yn] = Rt({
    value: f,
    defaultValue: u,
    finalValue: [],
    onChange: d
  }), [Xn, Jn] = Rt({
    value: N,
    defaultValue: M,
    finalValue: "",
    onChange: F
  }), Oo = te({
    name: "MultiSelect",
    classes: {},
    props: n,
    classNames: r,
    styles: i,
    unstyled: a
  }), { resolvedClassNames: aa, resolvedStyles: la } = yc({
    props: n,
    styles: i,
    classNames: r
  }), yf = (ae) => {
    p == null || p(ae), ae.key === " " && !pe && (ae.preventDefault(), $e.toggleDropdown()), ae.key === "Backspace" && Xn.length === 0 && Ie.length > 0 && yn(Ie.slice(0, Ie.length - 1));
  }, vf = Ie.map((ae, No) => {
    var da;
    return /* @__PURE__ */ v.createElement(
      An,
      {
        key: `${ae}-${No}`,
        withRemoveButton: !A,
        onRemove: () => yn(Ie.filter((wf) => ae !== wf)),
        unstyled: a,
        ...Oo("pill")
      },
      ((da = Yn[ae]) == null ? void 0 : da.label) || ae
    );
  });
  W(() => {
    y && $e.selectFirstOption();
  }, [y, Ie]);
  const ca = df && Ie.length > 0 && !$ && !A && /* @__PURE__ */ v.createElement(
    J.ClearButton,
    {
      size: c,
      ...ff,
      onClear: () => {
        yn([]), Jn("");
      }
    }
  ), ua = Hb({ data: Ao, value: Ie });
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(
    J,
    {
      store: $e,
      classNames: aa,
      styles: la,
      unstyled: a,
      size: c,
      readOnly: A,
      __staticSelector: "MultiSelect",
      onOptionSubmit: (ae) => {
        S == null || S(ae), Jn(""), $e.updateSelectedOptionIndex("selected"), Ie.includes(Yn[ae].value) ? yn(Ie.filter((No) => No !== Yn[ae].value)) : Ie.length < Se && yn([...Ie, Yn[ae].value]);
      },
      ...C
    },
    /* @__PURE__ */ v.createElement(J.DropdownTarget, null, /* @__PURE__ */ v.createElement(
      Er,
      {
        ...hf,
        __staticSelector: "MultiSelect",
        classNames: aa,
        styles: la,
        unstyled: a,
        size: c,
        className: o,
        style: s,
        variant: m,
        disabled: $,
        radius: H,
        rightSection: X || ca || /* @__PURE__ */ v.createElement(J.Chevron, { size: c, error: je, unstyled: a }),
        rightSectionPointerEvents: ge || (ca ? "all" : "none"),
        rightSectionWidth: ne,
        rightSectionProps: le,
        leftSection: De,
        leftSectionWidth: he,
        leftSectionPointerEvents: re,
        leftSectionProps: be,
        inputContainer: Oe,
        inputWrapperOrder: we,
        withAsterisk: xe,
        labelProps: Ne,
        descriptionProps: ie,
        errorProps: Y,
        wrapperProps: Xt,
        description: _e,
        label: yt,
        error: je,
        multiline: !0,
        withErrorStyles: af,
        __stylesApiProps: { ...n, multiline: !0 },
        pointer: !pe,
        onClick: () => pe ? $e.openDropdown() : $e.toggleDropdown(),
        "data-expanded": $e.dropdownOpened || void 0,
        id: Ro
      },
      /* @__PURE__ */ v.createElement(An.Group, { disabled: $, unstyled: a, ...Oo("pillsList") }, vf, /* @__PURE__ */ v.createElement(J.EventsTarget, null, /* @__PURE__ */ v.createElement(
        Er.Field,
        {
          ...bf,
          ref: t,
          id: Ro,
          placeholder: ia,
          type: !pe && !ia ? "hidden" : "visible",
          ...Oo("inputField"),
          unstyled: a,
          onFocus: (ae) => {
            R == null || R(ae), pe && $e.openDropdown();
          },
          onBlur: (ae) => {
            B == null || B(ae), $e.closeDropdown(), pe && $e.closeDropdown(), Jn("");
          },
          onKeyDown: yf,
          value: Xn,
          onChange: (ae) => {
            Jn(ae.currentTarget.value), pe && $e.openDropdown(), y && $e.selectFirstOption();
          },
          disabled: $,
          readOnly: A || !pe,
          pointer: !pe
        }
      )))
    )),
    /* @__PURE__ */ v.createElement(
      Su,
      {
        data: wt ? ua : Ao,
        hidden: A || $,
        filter: E,
        search: Xn,
        limit: P,
        hiddenWhenEmpty: !pe || !vt || wt && ua.length === 0 && Xn.trim().length === 0,
        withScrollArea: L,
        maxDropdownHeight: T,
        filterOptions: pe,
        value: Ie,
        checkIconPosition: se,
        withCheckIcon: Ft,
        nothingFoundMessage: vt,
        unstyled: a,
        labelId: `${Ro}-label`
      }
    )
  ), /* @__PURE__ */ v.createElement(
    "input",
    {
      type: "hidden",
      name: lf,
      value: Ie.join(mf),
      form: cf,
      disabled: $,
      ...pf
    }
  ));
});
Ci.classes = { ...mn.classes, ...J.classes };
Ci.displayName = "@mantine/core/MultiSelect";
const qb = {
  duration: 100,
  transition: "fade"
};
function Kb(e, t) {
  return { ...qb, ...t, ...e };
}
function Yb({
  offset: e,
  position: t
}) {
  const [n, r] = z(!1), o = V(), { x: s, y: i, elements: a, refs: l, update: c, placement: f } = Ys({
    placement: t,
    middleware: [
      zs({
        crossAxis: !0,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  }), u = f.includes("right") ? e : t.includes("left") ? e * -1 : 0, d = f.includes("bottom") ? e : t.includes("top") ? e * -1 : 0, p = ee(
    ({ clientX: m, clientY: g }) => {
      l.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: m,
            y: g,
            left: m + u,
            top: g + d,
            right: m,
            bottom: g
          };
        }
      });
    },
    [a.reference]
  );
  return W(() => {
    if (l.floating.current) {
      const m = o.current;
      m.addEventListener("mousemove", p);
      const g = ft(l.floating.current);
      return g.forEach((h) => {
        h.addEventListener("scroll", c);
      }), () => {
        m.removeEventListener("mousemove", p), g.forEach((h) => {
          h.removeEventListener("scroll", c);
        });
      };
    }
  }, [a.reference, l.floating.current, c, p, n]), { handleMouseMove: p, x: s, y: i, opened: n, setOpened: r, boundaryRef: o, floating: l.setFloating };
}
var Jr = { tooltip: "m-1b3c8819", arrow: "m-f898399f" };
const Xb = {
  refProp: "ref",
  withinPortal: !0,
  offset: 10,
  position: "right",
  zIndex: Rs("popover")
}, Jb = (e, { radius: t, color: n }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : ut(t),
    "--tooltip-bg": n ? mt(n, e) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), Ei = q((e, t) => {
  const n = j("TooltipFloating", Xb, e), {
    children: r,
    refProp: o,
    withinPortal: s,
    style: i,
    className: a,
    classNames: l,
    styles: c,
    unstyled: f,
    radius: u,
    color: d,
    label: p,
    offset: m,
    position: g,
    multiline: h,
    zIndex: w,
    disabled: x,
    variant: b,
    vars: y,
    portalProps: S,
    ...C
  } = n, E = dt(), P = te({
    name: "TooltipFloating",
    props: n,
    classes: Jr,
    className: a,
    style: i,
    classNames: l,
    styles: c,
    unstyled: f,
    rootSelector: "tooltip",
    vars: y,
    varsResolver: Jb
  }), { handleMouseMove: L, x: T, y: N, opened: M, boundaryRef: F, floating: A, setOpened: $ } = Yb({
    offset: m,
    position: g
  });
  if (!Tt(r))
    throw new Error(
      "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const R = Pe(F, r.ref, t), B = (H) => {
    var X, ne;
    (ne = (X = r.props).onMouseEnter) == null || ne.call(X, H), L(H), $(!0);
  }, O = (H) => {
    var X, ne;
    (ne = (X = r.props).onMouseLeave) == null || ne.call(X, H), $(!1);
  };
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(zr, { ...S, withinPortal: s }, /* @__PURE__ */ v.createElement(
    U,
    {
      ...C,
      ...P("tooltip", {
        style: {
          ...Ms(i, E),
          zIndex: w,
          display: !x && M ? "block" : "none",
          top: (N && Math.round(N)) ?? "",
          left: (T && Math.round(T)) ?? ""
        }
      }),
      variant: b,
      ref: A
    },
    p
  )), Kt(r, {
    ...r.props,
    [o]: R,
    onMouseEnter: B,
    onMouseLeave: O
  }));
});
Ei.classes = Jr;
Ei.displayName = "@mantine/core/TooltipFloating";
const Ou = qt(!1), Qb = Ou.Provider, Zb = () => ct(Ou), ey = {
  openDelay: 0,
  closeDelay: 0
};
function Nu(e) {
  const { openDelay: t, closeDelay: n, children: r } = j("TooltipGroup", ey, e);
  return /* @__PURE__ */ v.createElement(Qb, { value: !0 }, /* @__PURE__ */ v.createElement(Xg, { delay: { open: t, close: n } }, r));
}
Nu.displayName = "@mantine/core/TooltipGroup";
function ty(e) {
  var C, E, P;
  const [t, n] = z(!1), o = typeof e.opened == "boolean" ? e.opened : t, s = Zb(), i = Mt(), { delay: a, currentId: l, setCurrentId: c } = Zc(), f = ee(
    (L) => {
      n(L), L && c(i);
    },
    [c, i]
  ), {
    x: u,
    y: d,
    context: p,
    refs: m,
    update: g,
    placement: h,
    middlewareData: { arrow: { x: w, y: x } = {} }
  } = Ys({
    placement: e.position,
    open: o,
    onOpenChange: f,
    middleware: [
      kc(e.offset),
      zs({ padding: 8 }),
      Lc(),
      Hc({ element: e.arrowRef, padding: e.arrowOffset }),
      ...e.inline ? [Fc()] : []
    ]
  }), { getReferenceProps: b, getFloatingProps: y } = ah([
    Yg(p, {
      enabled: (C = e.events) == null ? void 0 : C.hover,
      delay: s ? a : { open: e.openDelay, close: e.closeDelay },
      mouseOnly: !((E = e.events) != null && E.touch)
    }),
    ih(p, { enabled: (P = e.events) == null ? void 0 : P.focus, keyboardOnly: !0 }),
    lh(p, { role: "tooltip" }),
    // cannot be used with controlled tooltip, page jumps
    sh(p, { enabled: typeof e.opened > "u" }),
    Jg(p, { id: i })
  ]);
  iu({
    opened: o,
    position: e.position,
    positionDependencies: e.positionDependencies,
    floating: { refs: m, update: g }
  }), It(() => {
    var L;
    (L = e.onPositionChange) == null || L.call(e, h);
  }, [h]);
  const S = o && l && l !== i;
  return {
    x: u,
    y: d,
    arrowX: w,
    arrowY: x,
    reference: m.setReference,
    floating: m.setFloating,
    getFloatingProps: y,
    getReferenceProps: b,
    isGroupPhase: S,
    opened: o,
    placement: h
  };
}
const el = {
  position: "top",
  refProp: "ref",
  withinPortal: !0,
  inline: !1,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  offset: 5,
  transitionProps: { duration: 100, transition: "fade" },
  events: { hover: !0, focus: !1, touch: !1 },
  zIndex: Rs("popover"),
  positionDependencies: []
}, ny = (e, { radius: t, color: n }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : ut(t),
    "--tooltip-bg": n ? mt(n, e) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), Nt = q((e, t) => {
  const n = j("Tooltip", el, e), {
    children: r,
    position: o,
    refProp: s,
    label: i,
    openDelay: a,
    closeDelay: l,
    onPositionChange: c,
    opened: f,
    withinPortal: u,
    radius: d,
    color: p,
    classNames: m,
    styles: g,
    unstyled: h,
    style: w,
    className: x,
    withArrow: b,
    arrowSize: y,
    arrowOffset: S,
    arrowRadius: C,
    arrowPosition: E,
    offset: P,
    transitionProps: L,
    multiline: T,
    events: N,
    zIndex: M,
    disabled: F,
    positionDependencies: A,
    onClick: $,
    onMouseEnter: R,
    onMouseLeave: B,
    inline: O,
    variant: H,
    keepMounted: X,
    vars: ne,
    portalProps: ge,
    ...le
  } = j("Tooltip", el, n), { dir: De } = jn(), he = V(null), re = ty({
    position: eu(De, o),
    closeDelay: l,
    openDelay: a,
    onPositionChange: c,
    opened: f,
    events: N,
    arrowRef: he,
    arrowOffset: S,
    offset: typeof P == "number" ? P + (b ? y / 2 : 0) : P,
    positionDependencies: [...A, r],
    inline: O
  }), be = te({
    name: "Tooltip",
    props: n,
    classes: Jr,
    className: x,
    style: w,
    classNames: m,
    styles: g,
    unstyled: h,
    rootSelector: "tooltip",
    vars: ne,
    varsResolver: ny
  });
  if (!Tt(r))
    throw new Error(
      "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const Oe = Pe(re.reference, r.ref, t), we = Kb(L, { duration: 100, transition: "fade" });
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(zr, { ...ge, withinPortal: u }, /* @__PURE__ */ v.createElement(
    Js,
    {
      ...we,
      keepMounted: X,
      mounted: !F && !!re.opened,
      duration: re.isGroupPhase ? 10 : we.duration
    },
    (xe) => /* @__PURE__ */ v.createElement(
      U,
      {
        ...le,
        variant: H,
        mod: { multiline: T },
        ...re.getFloatingProps({
          ref: re.floating,
          className: be("tooltip").className,
          style: {
            ...be("tooltip").style,
            ...xe,
            zIndex: M,
            top: re.y ?? 0,
            left: re.x ?? 0
          }
        })
      },
      i,
      /* @__PURE__ */ v.createElement(
        Xs,
        {
          ref: he,
          arrowX: re.arrowX,
          arrowY: re.arrowY,
          visible: b,
          position: re.placement,
          arrowSize: y,
          arrowOffset: S,
          arrowRadius: C,
          arrowPosition: E,
          ...be("arrow")
        }
      )
    )
  )), Kt(
    r,
    re.getReferenceProps({
      onClick: $,
      onMouseEnter: R,
      onMouseLeave: B,
      onMouseMove: n.onMouseMove,
      onPointerDown: n.onPointerDown,
      onPointerEnter: n.onPointerEnter,
      [s]: Oe,
      className: nt(x, r.props.className),
      ...r.props
    })
  ));
});
Nt.classes = Jr;
Nt.displayName = "@mantine/core/Tooltip";
Nt.Floating = Ei;
Nt.Group = Nu;
const ry = {
  searchable: !1,
  withCheckIcon: !0,
  allowDeselect: !0,
  checkIconPosition: "left"
}, On = q((e, t) => {
  const n = j("Select", ry, e), {
    classNames: r,
    styles: o,
    unstyled: s,
    vars: i,
    dropdownOpened: a,
    defaultDropdownOpened: l,
    onDropdownClose: c,
    onDropdownOpen: f,
    onFocus: u,
    onBlur: d,
    onClick: p,
    onChange: m,
    data: g,
    value: h,
    defaultValue: w,
    selectFirstOptionOnChange: x,
    onOptionSubmit: b,
    comboboxProps: y,
    readOnly: S,
    disabled: C,
    filter: E,
    limit: P,
    withScrollArea: L,
    maxDropdownHeight: T,
    size: N,
    searchable: M,
    rightSection: F,
    checkIconPosition: A,
    withCheckIcon: $,
    nothingFoundMessage: R,
    name: B,
    form: O,
    searchValue: H,
    defaultSearchValue: X,
    onSearchChange: ne,
    allowDeselect: ge,
    error: le,
    rightSectionPointerEvents: De,
    id: he,
    clearable: re,
    clearButtonProps: be,
    hiddenInputProps: Oe,
    ...we
  } = n, xe = dr(() => mu(g), [g]), Ne = dr(() => ai(xe), [xe]), ie = Mt(he), [Y, Xt] = Rt({
    value: h,
    defaultValue: w,
    finalValue: null,
    onChange: m
  }), _e = typeof Y == "string" ? Ne[Y] : void 0, [yt, je] = Rt({
    value: H,
    defaultValue: X,
    finalValue: _e ? _e.label : "",
    onChange: ne
  }), Se = yi({
    opened: a,
    defaultOpened: l,
    onDropdownOpen: f,
    onDropdownClose: () => {
      c == null || c(), Se.resetSelectedOption();
    }
  }), { resolvedClassNames: pe, resolvedStyles: vt } = yc({
    props: n,
    styles: o,
    classNames: r
  });
  W(() => {
    x && Se.selectFirstOption();
  }, [x, Y]), W(() => {
    h === null && je(""), typeof h == "string" && _e && je(_e.label);
  }, [h, _e]);
  const Ft = re && !!Y && !C && !S && /* @__PURE__ */ v.createElement(
    J.ClearButton,
    {
      size: N,
      ...be,
      onClear: () => {
        Xt(null), je("");
      }
    }
  );
  return /* @__PURE__ */ v.createElement(v.Fragment, null, /* @__PURE__ */ v.createElement(
    J,
    {
      store: Se,
      __staticSelector: "Select",
      classNames: pe,
      styles: vt,
      unstyled: s,
      readOnly: S,
      onOptionSubmit: (se) => {
        b == null || b(se);
        const wt = ge && Ne[se].value === Y ? null : Ne[se].value;
        Xt(wt), je(typeof wt == "string" ? Ne[se].label : ""), Se.closeDropdown();
      },
      size: N,
      ...y
    },
    /* @__PURE__ */ v.createElement(J.Target, { targetType: M ? "input" : "button" }, /* @__PURE__ */ v.createElement(
      mn,
      {
        id: ie,
        ref: t,
        rightSection: F || Ft || /* @__PURE__ */ v.createElement(J.Chevron, { size: N, error: le, unstyled: s }),
        rightSectionPointerEvents: De || (Ft ? "all" : "none"),
        ...we,
        size: N,
        __staticSelector: "Select",
        disabled: C,
        readOnly: S || !M,
        value: yt,
        onChange: (se) => {
          je(se.currentTarget.value), Se.openDropdown(), x && Se.selectFirstOption();
        },
        onFocus: (se) => {
          M && Se.openDropdown(), u == null || u(se);
        },
        onBlur: (se) => {
          var wt;
          M && Se.closeDropdown(), je(Y != null && ((wt = Ne[Y]) == null ? void 0 : wt.label) || ""), d == null || d(se);
        },
        onClick: (se) => {
          M ? Se.openDropdown() : Se.toggleDropdown(), p == null || p(se);
        },
        classNames: pe,
        styles: vt,
        unstyled: s,
        pointer: !M,
        error: le
      }
    )),
    /* @__PURE__ */ v.createElement(
      Su,
      {
        data: xe,
        hidden: S || C,
        filter: E,
        search: yt,
        limit: P,
        hiddenWhenEmpty: !M || !R,
        withScrollArea: L,
        maxDropdownHeight: T,
        filterOptions: M && (_e == null ? void 0 : _e.label) !== yt,
        value: Y,
        checkIconPosition: A,
        withCheckIcon: $,
        nothingFoundMessage: R,
        unstyled: s,
        labelId: `${ie}-label`
      }
    )
  ), /* @__PURE__ */ v.createElement(
    "input",
    {
      type: "hidden",
      name: B,
      value: Y || "",
      form: O,
      disabled: C,
      ...Oe
    }
  ));
});
On.classes = { ...mn.classes, ...J.classes };
On.displayName = "@mantine/core/Select";
var $u = { root: "m-6d731127" };
const oy = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, sy = (e, { gap: t, align: n, justify: r }) => ({
  root: {
    "--stack-gap": As(t),
    "--stack-align": n,
    "--stack-justify": r
  }
}), Pi = q((e, t) => {
  const n = j("Stack", oy, e), {
    classNames: r,
    className: o,
    style: s,
    styles: i,
    unstyled: a,
    vars: l,
    align: c,
    justify: f,
    gap: u,
    variant: d,
    ...p
  } = n, m = te({
    name: "Stack",
    props: n,
    classes: $u,
    className: o,
    style: s,
    classNames: r,
    styles: i,
    unstyled: a,
    vars: l,
    varsResolver: sy
  });
  return /* @__PURE__ */ v.createElement(U, { ref: t, ...m("root"), variant: d, ...p });
});
Pi.classes = $u;
Pi.displayName = "@mantine/core/Stack";
const [iy, Di] = Lt(
  "Tabs component was not found in the tree"
);
var Un = { root: "m-89d60db1", "list--default": "m-576c9d4", list: "m-89d33d6d", panel: "m-b0c91715", tab: "m-4ec4dce6", tabSection: "m-fc420b1f", "tab--default": "m-539e827b", "list--outline": "m-6772fbd5", "tab--outline": "m-b59ab47c", "tab--pills": "m-c3381914" };
const ay = {}, Ii = q((e, t) => {
  const n = j("TabsList", ay, e), { children: r, className: o, grow: s, justify: i, classNames: a, styles: l, style: c, ...f } = n, u = Di();
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ...f,
      ...u.getStyles("list", {
        className: o,
        style: c,
        classNames: a,
        styles: l,
        props: n,
        variant: u.variant
      }),
      ref: t,
      role: "tablist",
      variant: u.variant,
      mod: {
        grow: s,
        orientation: u.orientation,
        placement: u.orientation === "vertical" && u.placement,
        inverted: u.inverted
      },
      "aria-orientation": u.orientation,
      __vars: { "--tabs-justify": i }
    },
    r
  );
});
Ii.classes = Un;
Ii.displayName = "@mantine/core/TabsList";
const ly = {}, Ri = q((e, t) => {
  const n = j("TabsPanel", ly, e), { children: r, className: o, value: s, classNames: i, styles: a, style: l, ...c } = n, f = Di(), u = f.value === s, d = f.keepMounted || n.keepMounted || u ? r : null;
  return /* @__PURE__ */ v.createElement(
    U,
    {
      ...c,
      ...f.getStyles("panel", {
        className: o,
        classNames: i,
        styles: a,
        style: [l, u ? void 0 : { display: "none" }],
        props: n
      }),
      ref: t,
      mod: { orientation: f.orientation },
      role: "tabpanel",
      id: f.getPanelId(s),
      "aria-labelledby": f.getTabId(s)
    },
    d
  );
});
Ri.classes = Un;
Ri.displayName = "@mantine/core/TabsPanel";
const cy = {}, Ai = q((e, t) => {
  const n = j("TabsTab", cy, e), {
    className: r,
    children: o,
    rightSection: s,
    leftSection: i,
    value: a,
    onClick: l,
    onKeyDown: c,
    disabled: f,
    color: u,
    style: d,
    classNames: p,
    styles: m,
    vars: g,
    ...h
  } = n, w = dt(), { dir: x } = jn(), b = Di(), y = a === b.value, S = (E) => {
    b.onChange(b.allowTabDeactivation && a === b.value ? null : a), l == null || l(E);
  }, C = { classNames: p, styles: m, props: n };
  return /* @__PURE__ */ v.createElement(
    fn,
    {
      ...h,
      ...b.getStyles("tab", { className: r, style: d, variant: b.variant, ...C }),
      disabled: f,
      unstyled: b.unstyled,
      variant: b.variant,
      mod: {
        active: y,
        disabled: f,
        orientation: b.orientation,
        inverted: b.inverted,
        placement: b.orientation === "vertical" && b.placement
      },
      ref: t,
      role: "tab",
      id: b.getTabId(a),
      "aria-selected": y,
      tabIndex: y || b.value === null ? 0 : -1,
      "aria-controls": b.getPanelId(a),
      onClick: S,
      __vars: { "--tabs-color": u ? mt(u, w) : void 0 },
      onKeyDown: rc({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: b.activateTabWithKeyboard,
        loop: b.loop,
        orientation: b.orientation || "horizontal",
        dir: x,
        onKeyDown: c
      })
    },
    i && /* @__PURE__ */ v.createElement("span", { ...b.getStyles("tabSection", C), "data-position": "left" }, i),
    o && /* @__PURE__ */ v.createElement("span", { ...b.getStyles("tabLabel", C) }, o),
    s && /* @__PURE__ */ v.createElement("span", { ...b.getStyles("tabSection", C), "data-position": "right" }, s)
  );
});
Ai.classes = Un;
Ai.displayName = "@mantine/core/TabsTab";
const tl = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value", uy = {
  keepMounted: !0,
  orientation: "horizontal",
  loop: !0,
  activateTabWithKeyboard: !0,
  allowTabDeactivation: !1,
  unstyled: !1,
  inverted: !1,
  variant: "default",
  placement: "left"
}, dy = (e, { radius: t, color: n }) => ({
  root: {
    "--tabs-radius": ut(t),
    "--tabs-color": mt(n, e)
  }
}), Je = q((e, t) => {
  const n = j("Tabs", uy, e), {
    defaultValue: r,
    value: o,
    onChange: s,
    orientation: i,
    children: a,
    loop: l,
    id: c,
    activateTabWithKeyboard: f,
    allowTabDeactivation: u,
    variant: d,
    color: p,
    radius: m,
    inverted: g,
    placement: h,
    keepMounted: w,
    classNames: x,
    styles: b,
    unstyled: y,
    className: S,
    style: C,
    vars: E,
    ...P
  } = n, L = Mt(c), [T, N] = Rt({
    value: o,
    defaultValue: r,
    finalValue: null,
    onChange: s
  }), M = te({
    name: "Tabs",
    props: n,
    classes: Un,
    className: S,
    style: C,
    classNames: x,
    styles: b,
    unstyled: y,
    vars: E,
    varsResolver: dy
  });
  return /* @__PURE__ */ v.createElement(
    iy,
    {
      value: {
        placement: h,
        value: T,
        orientation: i,
        id: L,
        loop: l,
        activateTabWithKeyboard: f,
        getTabId: br(`${L}-tab`, tl),
        getPanelId: br(`${L}-panel`, tl),
        onChange: N,
        allowTabDeactivation: u,
        variant: d,
        color: p,
        radius: m,
        inverted: g,
        keepMounted: w,
        unstyled: y,
        getStyles: M
      }
    },
    /* @__PURE__ */ v.createElement(
      U,
      {
        ref: t,
        id: L,
        variant: d,
        mod: {
          orientation: i,
          inverted: i === "horizontal" && g,
          placement: i === "vertical" && h
        },
        ...M("root"),
        ...P
      },
      a
    )
  );
});
Je.classes = Un;
Je.displayName = "@mantine/core/Tabs";
Je.Tab = Ai;
Je.Panel = Ri;
Je.List = Ii;
const fy = {
  /** Put your mantine theme override here */
};
class py {
  constructor(t = {}) {
    Te(this, "baseUrl", "https://api.bsdd.buildingsmart.org/");
    Te(this, "securityData", null);
    Te(this, "securityWorker");
    Te(this, "abortControllers", /* @__PURE__ */ new Map());
    Te(this, "customFetch", (...t) => fetch(...t));
    Te(this, "baseApiParams", {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer"
    });
    Te(this, "setSecurityData", (t) => {
      this.securityData = t;
    });
    Te(this, "contentFormatters", {
      "application/json": (t) => t !== null && (typeof t == "object" || typeof t == "string") ? JSON.stringify(t) : t,
      "text/plain": (t) => t !== null && typeof t != "string" ? JSON.stringify(t) : t,
      "multipart/form-data": (t) => Object.keys(t || {}).reduce((n, r) => {
        const o = t[r];
        return n.append(
          r,
          o instanceof Blob ? o : typeof o == "object" && o !== null ? JSON.stringify(o) : `${o}`
        ), n;
      }, new FormData()),
      "application/x-www-form-urlencoded": (t) => this.toQueryString(t)
    });
    Te(this, "createAbortSignal", (t) => {
      if (this.abortControllers.has(t)) {
        const r = this.abortControllers.get(t);
        return r ? r.signal : void 0;
      }
      const n = new AbortController();
      return this.abortControllers.set(t, n), n.signal;
    });
    Te(this, "abortRequest", (t) => {
      const n = this.abortControllers.get(t);
      n && (n.abort(), this.abortControllers.delete(t));
    });
    Te(this, "request", async ({
      body: t,
      secure: n,
      path: r,
      type: o,
      query: s,
      format: i,
      baseUrl: a,
      cancelToken: l,
      ...c
    }) => {
      const f = (typeof n == "boolean" ? n : this.baseApiParams.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {}, u = this.mergeRequestParams(c, f), d = s && this.toQueryString(s), p = this.contentFormatters[
        o || "application/json"
        /* Json */
      ], m = i || u.format;
      return this.customFetch(`${a || this.baseUrl || ""}${r}${d ? `?${d}` : ""}`, {
        ...u,
        headers: {
          ...u.headers || {},
          ...o && o !== "multipart/form-data" ? { "Content-Type": o } : {}
        },
        signal: (l ? this.createAbortSignal(l) : u.signal) || null,
        body: typeof t > "u" || t === null ? null : p(t)
      }).then(async (g) => {
        const h = g;
        h.data = null, h.error = null;
        const w = m ? await g[m]().then((x) => (h.ok ? h.data = x : h.error = x, h)).catch((x) => (h.error = x, h)) : h;
        if (l && this.abortControllers.delete(l), !g.ok)
          throw w;
        return w;
      });
    });
    Object.assign(this, t);
  }
  encodeQueryParam(t, n) {
    return `${encodeURIComponent(t)}=${encodeURIComponent(typeof n == "number" ? n : `${n}`)}`;
  }
  addQueryParam(t, n) {
    return this.encodeQueryParam(n, t[n]);
  }
  addArrayQueryParam(t, n) {
    return t[n].map((o) => this.encodeQueryParam(n, o)).join("&");
  }
  toQueryString(t) {
    const n = t || {};
    return Object.keys(n).filter((o) => typeof n[o] < "u").map((o) => Array.isArray(n[o]) ? this.addArrayQueryParam(n, o) : this.addQueryParam(n, o)).join("&");
  }
  addQueryParams(t) {
    const n = this.toQueryString(t);
    return n ? `?${n}` : "";
  }
  mergeRequestParams(t, n) {
    return {
      ...this.baseApiParams,
      ...t,
      ...n || {},
      headers: {
        ...this.baseApiParams.headers || {},
        ...t.headers || {},
        ...n && n.headers || {}
      }
    };
  }
}
/**
 * @title Dictionaries API
 * @version v1
 * @license MIT license (https://bsddprototype2020.blob.core.windows.net/public/Copyright_2020_buildingSMART_International.txt)
 * @baseUrl https://api.bsdd.buildingsmart.org/
 * @contact Support <bsdd_support@buildingsmart.org> (https://github.com/buildingSMART/bSDD)
 *
 * <p>API to access the buildingSMART Data Dictionary.</p><p>For manually uploading import files, please go to <a href="https://manage.bsdd.buildingsmart.org">bSDD Management portal</a>. Version history can be found at <a href="https://github.com/buildingSMART/bSDD/blob/master/API%20version%20history.md">Version history</a>.</p><p>If you have any questions or need further assistance, feel free to send us an e-mail</p> <p>In case you want to try out secured APIs via this swagger portal, you need to enter client ID <span style="white-space: nowrap;">b222e220-1f71-4962-9184-05e0481a390d</span>. If you create your own tool
 *   that needs to access secured APIs, please contact us via e-mail.</p>
 */
class my extends py {
  constructor() {
    super(...arguments);
    Te(this, "api", {
      /**
       * No description
       *
       * @tags Class
       * @name ClassV1List
       * @summary Get Class details - this API replaces api/Classification
      Changes:
      - now returns Material as well
      - "Classification" has been renamed to "Class"
      - "Domain" has been renamed to "Dictionary"
      - "NamespaceUri" has been renamed to "Uri"
       * @request GET:/api/Class/v1
       */
      classV1List: (n, r = {}) => this.request({
        path: "/api/Class/v1",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags Dictionary
       * @name DictionaryV1List
       * @summary Get list of available Dictionaries. This one replaces /api/Domain. Changes:
      - "Domain" has been renamed to "Dictionary"
      - "NamespaceUri" has been renamed to "Uri"
       * @request GET:/api/Dictionary/v1
       */
      dictionaryV1List: (n, r = {}) => this.request({
        path: "/api/Dictionary/v1",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags Dictionary
       * @name DictionaryV1ClassesList
       * @summary Get Dictionary with tree of classes.
      This one replaces /api/Domain. See https://github.com/buildingSMART/bSDD/blob/master/Documentation/API%20version%20history.md for changes.
       * @request GET:/api/Dictionary/v1/Classes
       */
      dictionaryV1ClassesList: (n, r = {}) => this.request({
        path: "/api/Dictionary/v1/Classes",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags Dictionary
       * @name DictionaryV1PropertiesList
       * @summary Get Dictionary with its properties
       * @request GET:/api/Dictionary/v1/Properties
       */
      dictionaryV1PropertiesList: (n, r = {}) => this.request({
        path: "/api/Dictionary/v1/Properties",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags Dictionary
       * @name DictionaryDownloadSketchupV1Create
       * @summary Download a file with an export of a dictionary in format supported by Sketchup.
      This API replaces /api/RequestExportFile/preview
       * @request POST:/api/DictionaryDownload/sketchup/v1
       * @secure
       */
      dictionaryDownloadSketchupV1Create: (n, r = {}) => this.request({
        path: "/api/DictionaryDownload/sketchup/v1",
        method: "POST",
        query: n,
        secure: !0,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags Dictionary Update
       * @name UploadImportFileV1Create
       * @summary Upload a bSDD import model json file, see https://github.com/buildingSMART/bSDD/tree/master/Model/Import%20Model for more information
       * @request POST:/api/UploadImportFile/v1
       * @secure
       */
      uploadImportFileV1Create: (n, r = {}) => this.request({
        path: "/api/UploadImportFile/v1",
        method: "POST",
        body: n,
        secure: !0,
        type: "multipart/form-data",
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags Dictionary Update
       * @name DictionaryV1Update
       * @summary Update the status of a Dictionary
       * @request PUT:/api/Dictionary/v1/{organizationCode}/{code}/{version}
       * @secure
       */
      dictionaryV1Update: (n, r, o, s, i = {}) => this.request({
        path: `/api/Dictionary/v1/${n}/${r}/${o}`,
        method: "PUT",
        body: s,
        secure: !0,
        type: "application/json",
        ...i
      }),
      /**
       * No description
       *
       * @tags Dictionary Update
       * @name DictionaryV1Delete
       * @summary Delete a dictionary version
       * @request DELETE:/api/Dictionary/v1/{organizationCode}/{code}/{version}
       * @secure
       */
      dictionaryV1Delete: (n, r, o, s = {}) => this.request({
        path: `/api/Dictionary/v1/${n}/${r}/${o}`,
        method: "DELETE",
        secure: !0,
        ...s
      }),
      /**
       * No description
       *
       * @tags Dictionary Update
       * @name DictionaryV1Delete2
       * @summary Delete all versions of a dictionary
       * @request DELETE:/api/Dictionary/v1/{organizationCode}/{code}
       * @originalName dictionaryV1Delete
       * @duplicate
       * @secure
       */
      dictionaryV1Delete2: (n, r, o = {}) => this.request({
        path: `/api/Dictionary/v1/${n}/${r}`,
        method: "DELETE",
        secure: !0,
        ...o
      }),
      /**
       * No description
       *
       * @tags Property
       * @name PropertyV4List
       * @summary Get Property details
       * @request GET:/api/Property/v4
       */
      propertyV4List: (n, r = {}) => this.request({
        path: "/api/Property/v4",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags Property
       * @name PropertyValueV2List
       * @summary Get Property Value details
       * @request GET:/api/PropertyValue/v2
       */
      propertyValueV2List: (n, r = {}) => this.request({
        path: "/api/PropertyValue/v2",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * @description The details can be requested per Class via the Class API
       *
       * @tags Search
       * @name TextSearchV1List
       * @summary Search the bSDD database using free text, get list of Classes and/or Properties matching the text.
      Pagination options are for Classes and Properties combined. So if result consists of 10 classes and 5 properties, TotalCount will be 15. Classes will be listed first, so if you then use Offset=10 and Limit=5, you will get the 5 properties.
       * @request GET:/api/TextSearch/v1
       */
      textSearchV1List: (n, r = {}) => this.request({
        path: "/api/TextSearch/v1",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * @description The details can be requested per Class via the Class API
       *
       * @tags Search
       * @name SearchInDictionaryV1List
       * @summary Search the bSDD database, get list of Classes without details.
      This version uses new naming and returns one Dictionary instead of a list with always one Dictionary.
      This API replaces /api/SearchList.
       * @request GET:/api/SearchInDictionary/v1
       */
      searchInDictionaryV1List: (n, r = {}) => this.request({
        path: "/api/SearchInDictionary/v1",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags Search
       * @name ClassSearchV1List
       * @summary Search the bSDD database using free text, get list of Classes matching the text and optional additional filters.
      Changes with obsolete api/ClassificationSearch:
      - "Classification" has been renamed to "Class"
      - "Domain" has been renamed to "Dictionary"
      - "NamespaceUri" has been renamed to "Uri"
       * @request GET:/api/Class/Search/v1
       */
      classSearchV1List: (n, r = {}) => this.request({
        path: "/api/Class/Search/v1",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags z Lookup data
       * @name UnitV1List
       * @summary Get list of all units
       * @request GET:/api/Unit/v1
       */
      unitV1List: (n = {}) => this.request({
        path: "/api/Unit/v1",
        method: "GET",
        format: "json",
        ...n
      }),
      /**
       * No description
       *
       * @tags z Lookup data
       * @name ReferenceDocumentV1List
       * @summary Get list of all ReferenceDocuments
       * @request GET:/api/ReferenceDocument/v1
       */
      referenceDocumentV1List: (n = {}) => this.request({
        path: "/api/ReferenceDocument/v1",
        method: "GET",
        format: "json",
        ...n
      }),
      /**
       * No description
       *
       * @tags z Lookup data
       * @name LanguageV1List
       * @summary Get list of available Languages
       * @request GET:/api/Language/v1
       */
      languageV1List: (n = {}) => this.request({
        path: "/api/Language/v1",
        method: "GET",
        format: "json",
        ...n
      }),
      /**
       * No description
       *
       * @tags z Lookup data
       * @name CountryV1List
       * @summary Get list of all Countries
       * @request GET:/api/Country/v1
       */
      countryV1List: (n = {}) => this.request({
        path: "/api/Country/v1",
        method: "GET",
        format: "json",
        ...n
      }),
      /**
       * @description The details can be requested per Classification via the Classification API
       *
       * @tags zz Obsolete APIs
       * @name TextSearchListOpenV6List
       * @summary Search the bSDD database using free text, get list of Classifications and/or Properties matching the text.
       * @request GET:/api/TextSearchListOpen/v6
       * @deprecated
       */
      textSearchListOpenV6List: (n, r = {}) => this.request({
        path: "/api/TextSearchListOpen/v6",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * @description The details can be requested per Classification via the Classification API
       *
       * @tags zz Obsolete APIs
       * @name TextSearchListOpenV5List
       * @summary Search the bSDD database using free text, get list of Classifications and/or Properties matching the text.
       * @request GET:/api/TextSearchListOpen/v5
       * @deprecated
       */
      textSearchListOpenV5List: (n, r = {}) => this.request({
        path: "/api/TextSearchListOpen/v5",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * @description The details can be requested per Classification via the Classification API
       *
       * @tags zz Obsolete APIs
       * @name SearchListV2List
       * @summary Secured version of the "Search List API".
      Search the bSDD database, get list of Classifications without details.
       * @request GET:/api/SearchList/v2
       * @deprecated
       * @secure
       */
      searchListV2List: (n, r = {}) => this.request({
        path: "/api/SearchList/v2",
        method: "GET",
        query: n,
        secure: !0,
        format: "json",
        ...r
      }),
      /**
       * @description The details can be requested per Classification via the Classification API
       *
       * @tags zz Obsolete APIs
       * @name SearchListOpenV2List
       * @summary Search the bSDD database, get list of Classifications without details.
       * @request GET:/api/SearchListOpen/v2
       * @deprecated
       */
      searchListOpenV2List: (n, r = {}) => this.request({
        path: "/api/SearchListOpen/v2",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name RequestExportFilePreviewCreate
       * @summary PREVIEW
      Request a file with an export of a domain.
      Only format "Sketchup" is supported. You get an export in xsd format with limited content.
      OBSOLETE: pls use /api/DictionaryDownload/sketchup/v1
       * @request POST:/api/RequestExportFile/preview
       * @deprecated
       * @secure
       */
      requestExportFilePreviewCreate: (n, r = {}) => this.request({
        path: "/api/RequestExportFile/preview",
        method: "POST",
        query: n,
        secure: !0,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name PropertyV3List
       * @summary Get Property details
       * @request GET:/api/Property/v3
       * @deprecated
       */
      propertyV3List: (n, r = {}) => this.request({
        path: "/api/Property/v3",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name PropertyV2List
       * @summary Get Property details
       * @request GET:/api/Property/v2
       * @deprecated
       */
      propertyV2List: (n, r = {}) => this.request({
        path: "/api/Property/v2",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name PropertyValueV1List
       * @summary Get Property Value details
       * @request GET:/api/PropertyValue/v1
       * @deprecated
       */
      propertyValueV1List: (n, r = {}) => this.request({
        path: "/api/PropertyValue/v1",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name MaterialV2List
       * @summary Get Material details
       * @request GET:/api/Material/v2
       * @deprecated
       */
      materialV2List: (n, r = {}) => this.request({
        path: "/api/Material/v2",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name MaterialV1List
       * @summary Get Material details
       * @request GET:/api/Material/v1
       * @deprecated
       */
      materialV1List: (n, r = {}) => this.request({
        path: "/api/Material/v1",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * @description This is a preview version! Contracts may change. The details can be requested per Material via the Material API
       *
       * @tags zz Obsolete APIs
       * @name MaterialSearchOpenPreviewList
       * @summary Search the bSDD database, get list of Materials without details.
       * @request GET:/api/Material/SearchOpen/preview
       * @deprecated
       */
      materialSearchOpenPreviewList: (n, r = {}) => this.request({
        path: "/api/Material/SearchOpen/preview",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name DomainV3List
       * @summary Get list of available Domains
       * @request GET:/api/Domain/v3
       * @deprecated
       */
      domainV3List: (n, r = {}) => this.request({
        path: "/api/Domain/v3",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name DomainV3ClassificationsList
       * @summary Get Domain with the classification and/or material tree
       * @request GET:/api/Domain/v3/Classifications
       * @deprecated
       */
      domainV3ClassificationsList: (n, r = {}) => this.request({
        path: "/api/Domain/v3/Classifications",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name DomainV3Update
       * @summary UpdateDomainStatus
       * @request PUT:/api/Domain/v3/{organizationCode}/{code}/{version}
       * @deprecated
       * @secure
       */
      domainV3Update: (n, r, o, s, i = {}) => this.request({
        path: `/api/Domain/v3/${n}/${r}/${o}`,
        method: "PUT",
        body: s,
        secure: !0,
        type: "application/json",
        ...i
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name DomainV3Delete
       * @summary Delete domain version
       * @request DELETE:/api/Domain/v3/{organizationCode}/{code}/{version}
       * @deprecated
       * @secure
       */
      domainV3Delete: (n, r, o, s = {}) => this.request({
        path: `/api/Domain/v3/${n}/${r}/${o}`,
        method: "DELETE",
        secure: !0,
        ...s
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name DomainV3Delete2
       * @summary Delete all versions of domain
       * @request DELETE:/api/Domain/v3/{organizationCode}/{code}
       * @deprecated
       * @originalName domainV3Delete
       * @duplicate
       * @secure
       */
      domainV3Delete2: (n, r, o = {}) => this.request({
        path: `/api/Domain/v3/${n}/${r}`,
        method: "DELETE",
        secure: !0,
        ...o
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name DomainV2List
       * @summary Get list of available Domains
       * @request GET:/api/Domain/v2
       * @deprecated
       */
      domainV2List: (n, r = {}) => this.request({
        path: "/api/Domain/v2",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name DomainV2ClassificationsList
       * @summary Get Domain with the classification tree
       * @request GET:/api/Domain/v2/Classifications
       * @deprecated
       */
      domainV2ClassificationsList: (n, r = {}) => this.request({
        path: "/api/Domain/v2/Classifications",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name ClassificationV4List
       * @summary Get Classification details - please use api/Class/v1 instead
       * @request GET:/api/Classification/v4
       * @deprecated
       */
      classificationV4List: (n, r = {}) => this.request({
        path: "/api/Classification/v4",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name ClassificationV3List
       * @summary Get Classification details - please use api/Class/v1 instead
       * @request GET:/api/Classification/v3
       * @deprecated
       */
      classificationV3List: (n, r = {}) => this.request({
        path: "/api/Classification/v3",
        method: "GET",
        query: n,
        format: "json",
        ...r
      }),
      /**
       * No description
       *
       * @tags zz Obsolete APIs
       * @name ClassificationSearchOpenV1List
       * @summary Search the bSDD database using free text - please use api/Class/Search/v1 instead
       * @request GET:/api/ClassificationSearchOpen/v1
       * @deprecated
       */
      classificationSearchOpenV1List: (n, r = {}) => this.request({
        path: "/api/ClassificationSearchOpen/v1",
        method: "GET",
        query: n,
        format: "json",
        ...r
      })
    });
  }
}
class Oi extends my {
  constructor(t) {
    super({ baseUrl: t });
  }
}
const Ni = {
  test: "https://test.bsdd.buildingsmart.org",
  production: "https://api.bsdd.buildingsmart.org"
};
var Tu = { exports: {} }, gy = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED", hy = gy, by = hy;
function Lu() {
}
function Mu() {
}
Mu.resetWarningCache = Lu;
var yy = function() {
  function e(r, o, s, i, a, l) {
    if (l !== by) {
      var c = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      throw c.name = "Invariant Violation", c;
    }
  }
  e.isRequired = e;
  function t() {
    return e;
  }
  var n = {
    array: e,
    bigint: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    elementType: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t,
    checkPropTypes: Mu,
    resetWarningCache: Lu
  };
  return n.PropTypes = n, n;
};
Tu.exports = yy();
var vy = Tu.exports;
const kt = /* @__PURE__ */ Kl(vy);
var wy = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, xy = Object.defineProperty, Sy = Object.defineProperties, Cy = Object.getOwnPropertyDescriptors, Pr = Object.getOwnPropertySymbols, Fu = Object.prototype.hasOwnProperty, ku = Object.prototype.propertyIsEnumerable, nl = (e, t, n) => t in e ? xy(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, rl = (e, t) => {
  for (var n in t || (t = {}))
    Fu.call(t, n) && nl(e, n, t[n]);
  if (Pr)
    for (var n of Pr(t))
      ku.call(t, n) && nl(e, n, t[n]);
  return e;
}, Ey = (e, t) => Sy(e, Cy(t)), Py = (e, t) => {
  var n = {};
  for (var r in e)
    Fu.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Pr)
    for (var r of Pr(e))
      t.indexOf(r) < 0 && ku.call(e, r) && (n[r] = e[r]);
  return n;
}, Qr = (e, t, n) => {
  const r = oe(
    (o, s) => {
      var i = o, { color: a = "currentColor", size: l = 24, stroke: c = 2, children: f } = i, u = Py(i, ["color", "size", "stroke", "children"]);
      return fa(
        "svg",
        rl(Ey(rl({
          ref: s
        }, wy), {
          width: l,
          height: l,
          stroke: a,
          strokeWidth: c,
          className: `tabler-icon tabler-icon-${e}`
        }), u),
        [...n.map(([d, p]) => fa(d, p)), ...f || []]
      );
    }
  );
  return r.propTypes = {
    color: kt.string,
    size: kt.oneOfType([kt.string, kt.number]),
    stroke: kt.oneOfType([kt.string, kt.number])
  }, r.displayName = `${t}`, r;
}, Bu = Qr("check", "IconCheck", [
  ["path", { d: "M5 12l5 5l10 -10", key: "svg-0" }]
]), Dy = Qr("grip-vertical", "IconGripVertical", [
  ["path", { d: "M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }],
  ["path", { d: "M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }],
  ["path", { d: "M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }],
  ["path", { d: "M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-3" }],
  ["path", { d: "M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-4" }],
  ["path", { d: "M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-5" }]
]), Iy = Qr("info-circle", "IconInfoCircle", [
  ["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }],
  ["path", { d: "M12 9h.01", key: "svg-1" }],
  ["path", { d: "M11 12h1v4h1", key: "svg-2" }]
]), _u = Qr("search", "IconSearch", [
  ["path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }],
  ["path", { d: "M21 21l-6 -6", key: "svg-1" }]
]);
function Ry({ item: e, bsddClass: t, changeColor: n, mainDictionary: r, filterDictionaries: o }) {
  const { t: s } = un(), [i, a] = z("grey"), [l, c] = z(!1), [f, u] = z(!1), [d, p] = z([]);
  W(() => {
    l && d.every((h) => h) ? a("green") : l || d.some((h) => h) && f || f ? a("orange") : a("red"), n(i);
  }, [f, l, d, n, i]), W(() => {
    t && e && u(e.description === t.code);
  }, [e, t]), W(() => {
    var h;
    if (e.hasAssociations) {
      const w = e.hasAssociations.filter((b) => b.type === "IfcClassificationReference").map((b) => b.location).filter((b) => b !== void 0), x = (h = t == null ? void 0 : t.classRelations) == null ? void 0 : h.map((b) => b.relatedClassUri).filter((b) => b !== void 0);
      c(w && x ? w.some((b) => x.includes(b)) : !1);
    }
  }, [e, t]), W(() => {
    if (o.length === 0)
      return;
    const h = [];
    o.forEach((w) => {
      var x;
      if (e.hasAssociations) {
        const b = e.hasAssociations.filter((S) => {
          var C;
          return S.type === "IfcClassificationReference" && ((C = S.referencedSource) == null ? void 0 : C.location) === w.uri;
        }).map((S) => S.location).filter((S) => S !== void 0), y = ((x = t == null ? void 0 : t.classRelations) == null ? void 0 : x.map((S) => S.relatedClassUri).filter((S) => S !== void 0)) || [];
        b.length > 0 && y.length > 0 ? h.push(
          b.some((S) => y.includes(S))
        ) : h.push(!1);
      } else
        h.push(!1);
    }), p(h);
  }, [e, t, o]);
  function m(h) {
    const w = JSON.stringify(h);
    bsddBridge.bsddSearch(w);
  }
  function g(h) {
    throw new Error("Function not implemented");
  }
  return /* @__PURE__ */ _.jsxs(xt, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
    /* @__PURE__ */ _.jsx(Vt, { color: i, size: "1.8em", mx: "xs" }),
    /* @__PURE__ */ _.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ _.jsx(Ct, { title: e.name, className: "truncate", children: e.name }) }),
    /* @__PURE__ */ _.jsxs(Wt, { children: [
      /* @__PURE__ */ _.jsx(Wt.Target, { children: /* @__PURE__ */ _.jsx(xt, { children: /* @__PURE__ */ _.jsx(Iy, {}) }) }),
      /* @__PURE__ */ _.jsxs(Wt.Dropdown, { children: [
        /* @__PURE__ */ _.jsxs(xt, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
          /* @__PURE__ */ _.jsx(Vt, { mx: "sm", color: f ? "green" : "red", size: "1.8em" }),
          /* @__PURE__ */ _.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ _.jsx(Ct, { className: "truncate", children: "Description" }) })
        ] }),
        /* @__PURE__ */ _.jsxs(xt, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
          /* @__PURE__ */ _.jsx(Vt, { mx: "sm", color: l ? "green" : "red", size: "1.8em" }),
          /* @__PURE__ */ _.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ _.jsx(Ct, { className: "truncate", children: r == null ? void 0 : r.name }) })
        ] }),
        d.map((h, w) => /* @__PURE__ */ _.jsxs(xt, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
          /* @__PURE__ */ _.jsx(Vt, { mx: "sm", color: h ? "green" : "red", size: "1.8em" }),
          /* @__PURE__ */ _.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ _.jsx(Ct, { className: "truncate", children: o[w].name }) })
        ] }, o[w].name))
      ] })
    ] }),
    /* @__PURE__ */ _.jsx(Nt, { label: s("Select objects"), children: /* @__PURE__ */ _.jsx(Ht, { radius: "xl", onClick: () => g(), color: "grey", children: /* @__PURE__ */ _.jsx(_u, { size: 20 }) }) }),
    /* @__PURE__ */ _.jsx(Nt, { label: s("Attach to type"), children: /* @__PURE__ */ _.jsx(Ht, { radius: "xl", onClick: () => m(e), color: "grey", children: /* @__PURE__ */ _.jsx(Bu, { size: 20 }) }) })
  ] });
}
function Ay({
  bsddEnvironmentName: e,
  category: t,
  opened: n,
  bbbr: r,
  items: o,
  mainDictionary: s,
  filterDictionaries: i
}) {
  const { t: a } = un(), [l, c] = z(), f = Ni[e], [u, d] = z("grey"), [p, m] = z({}), g = (y, S) => {
    m((C) => ({
      ...C,
      [y]: S
    }));
  }, h = (y) => (S) => {
    g(y, S);
  };
  function w(y, S) {
    let C;
    return S.filter((E) => (E.code === y && (C = E), !1)), C || !1;
  }
  W(() => {
    const y = w(t, r);
    if (y) {
      const S = y;
      new Oi(f).api.classV1List({
        uri: S.uri,
        includeClassProperties: !0,
        includeChildClassReferences: !0,
        includeClassRelations: !0
      }).then((E) => {
        if (!E.ok)
          throw new Error(`HTTP error! status: ${E.status}`);
        E.data && c(E.data);
      }).catch((E) => {
        throw new Error(`bSDD API error! status: ${E}`);
      });
    }
  }, [t, r, f]), W(() => {
    let y = "grey";
    const S = Object.values(p);
    S.length > 0 && (S.includes("red") && S.includes("green") || S.includes("orange") ? y = "orange" : S.includes("red") ? y = "red" : S.includes("green") && (y = "green")), d(y);
  }, [p, d, s, i]);
  function x() {
    throw new Error("Function not implemented");
  }
  function b() {
    throw new Error("Function not implemented");
  }
  return /* @__PURE__ */ _.jsxs(Ze.Item, { value: t, children: [
    /* @__PURE__ */ _.jsx(Ze.Control, { children: /* @__PURE__ */ _.jsxs(xt, { justify: "space-between", className: "flexGroup", children: [
      /* @__PURE__ */ _.jsx(Vt, { mx: "sm", color: u, size: "1.8em" }),
      /* @__PURE__ */ _.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ _.jsx(Ct, { className: "truncate", children: t.length > 0 ? t : a("No description") }) }),
      /* @__PURE__ */ _.jsx(Nt, { label: a("Select objects"), children: /* @__PURE__ */ _.jsx(Ht, { radius: "xl", onClick: () => b(), color: "grey", children: /* @__PURE__ */ _.jsx(_u, { size: 20 }) }) }),
      /* @__PURE__ */ _.jsx(Nt, { label: a("Attach to type"), children: /* @__PURE__ */ _.jsx(Ht, { radius: "xl", onClick: () => x(), color: "grey", children: /* @__PURE__ */ _.jsx(Bu, { size: 20 }) }) })
    ] }) }),
    /* @__PURE__ */ _.jsx(Ze.Panel, { mt: "-xs", pl: "xl", children: o.map((y) => /* @__PURE__ */ _.jsx(
      Ry,
      {
        item: y,
        bsddClass: l,
        mainDictionary: s,
        filterDictionaries: i,
        changeColor: h(y.name)
      },
      y.name
    )) })
  ] });
}
let Oy;
function Ny(e, t, n) {
  const r = t.reduce((o, s) => {
    const i = `${e("No")} '${n}'`, a = s[n];
    return !a || typeof a != "string" || a.length === 0 ? (o[i] || (o[i] = []), o[i].push(s)) : (o[a] || (o[a] = []), o[a].push(s)), o;
  }, {});
  return Object.keys(r).sort().reduce((o, s) => (o[s] = r[s], o), {});
}
function $y({ bsddApiEnvironment: e, mainDictionary: t, filterDictionaries: n, ifcData: r }) {
  const { t: o } = un(), [s, i] = z({}), [a, l] = z([]);
  W(() => {
    (async () => {
      try {
      } catch (u) {
        console.error(u.message);
      }
    })();
  }, []), W(() => {
    if (!t)
      return;
    new Oi(Ni[e]).api.dictionaryV1ClassesList({ Uri: t.uri }).then((u) => {
      if (!u.ok)
        throw new Error(`HTTP error! status: ${u.status}`);
      u.data && u.data.classes && l(u.data.classes);
    }).catch((u) => {
      throw new Error(`bSDD API error! status: ${u}`);
    });
  }, [t, e]);
  const c = Ny(o, r, "description");
  return /* @__PURE__ */ _.jsx(Je.Panel, { value: "koppelen", children: /* @__PURE__ */ _.jsx(Ze, { chevronPosition: "left", multiple: !0, children: Object.entries(c).map(([f, u]) => /* @__PURE__ */ _.jsx(
    Ay,
    {
      bsddEnvironmentName: e,
      category: f.length > 0 ? f : o("No description"),
      items: u,
      opened: s,
      bbbr: a,
      mainDictionary: t,
      filterDictionaries: n
    },
    f.length > 0 ? f : o("No description")
  )) }) });
}
function Nn(e) {
  "@babel/helpers - typeof";
  return Nn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Nn(e);
}
function Ty(e, t) {
  if (Nn(e) != "object" || !e)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (Nn(r) != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ly(e) {
  var t = Ty(e, "string");
  return Nn(t) == "symbol" ? t : String(t);
}
function My(e, t, n) {
  return t = Ly(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function ol(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function sl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ol(Object(n), !0).forEach(function(r) {
      My(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ol(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Re(e) {
  return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
}
var il = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), Ho = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, al = {
  INIT: "@@redux/INIT" + Ho(),
  REPLACE: "@@redux/REPLACE" + Ho(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + Ho();
  }
};
function Fy(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function ju(e, t, n) {
  var r;
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(Re(0));
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(Re(1));
    return n(ju)(e, t);
  }
  if (typeof e != "function")
    throw new Error(Re(2));
  var o = e, s = t, i = [], a = i, l = !1;
  function c() {
    a === i && (a = i.slice());
  }
  function f() {
    if (l)
      throw new Error(Re(3));
    return s;
  }
  function u(g) {
    if (typeof g != "function")
      throw new Error(Re(4));
    if (l)
      throw new Error(Re(5));
    var h = !0;
    return c(), a.push(g), function() {
      if (h) {
        if (l)
          throw new Error(Re(6));
        h = !1, c();
        var x = a.indexOf(g);
        a.splice(x, 1), i = null;
      }
    };
  }
  function d(g) {
    if (!Fy(g))
      throw new Error(Re(7));
    if (typeof g.type > "u")
      throw new Error(Re(8));
    if (l)
      throw new Error(Re(9));
    try {
      l = !0, s = o(s, g);
    } finally {
      l = !1;
    }
    for (var h = i = a, w = 0; w < h.length; w++) {
      var x = h[w];
      x();
    }
    return g;
  }
  function p(g) {
    if (typeof g != "function")
      throw new Error(Re(10));
    o = g, d({
      type: al.REPLACE
    });
  }
  function m() {
    var g, h = u;
    return g = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function(x) {
        if (typeof x != "object" || x === null)
          throw new Error(Re(11));
        function b() {
          x.next && x.next(f());
        }
        b();
        var y = h(b);
        return {
          unsubscribe: y
        };
      }
    }, g[il] = function() {
      return this;
    }, g;
  }
  return d({
    type: al.INIT
  }), r = {
    dispatch: d,
    subscribe: u,
    getState: f,
    replaceReducer: p
  }, r[il] = m, r;
}
function ll(e, t) {
  return function() {
    return t(e.apply(this, arguments));
  };
}
function cl(e, t) {
  if (typeof e == "function")
    return ll(e, t);
  if (typeof e != "object" || e === null)
    throw new Error(Re(16));
  var n = {};
  for (var r in e) {
    var o = e[r];
    typeof o == "function" && (n[r] = ll(o, t));
  }
  return n;
}
function Vu() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return t.length === 0 ? function(r) {
    return r;
  } : t.length === 1 ? t[0] : t.reduce(function(r, o) {
    return function() {
      return r(o.apply(void 0, arguments));
    };
  });
}
function ky() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function(r) {
    return function() {
      var o = r.apply(void 0, arguments), s = function() {
        throw new Error(Re(15));
      }, i = {
        getState: o.getState,
        dispatch: function() {
          return s.apply(void 0, arguments);
        }
      }, a = t.map(function(l) {
        return l(i);
      });
      return s = Vu.apply(void 0, a)(o.dispatch), sl(sl({}, o), {}, {
        dispatch: s
      });
    };
  };
}
var Gu = { exports: {} }, Wu = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sn = v;
function By(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var _y = typeof Object.is == "function" ? Object.is : By, jy = sn.useState, Vy = sn.useEffect, Gy = sn.useLayoutEffect, Wy = sn.useDebugValue;
function zy(e, t) {
  var n = t(), r = jy({ inst: { value: n, getSnapshot: t } }), o = r[0].inst, s = r[1];
  return Gy(function() {
    o.value = n, o.getSnapshot = t, Uo(o) && s({ inst: o });
  }, [e, n, t]), Vy(function() {
    return Uo(o) && s({ inst: o }), e(function() {
      Uo(o) && s({ inst: o });
    });
  }, [e]), Wy(n), n;
}
function Uo(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !_y(e, n);
  } catch {
    return !0;
  }
}
function Hy(e, t) {
  return t();
}
var Uy = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Hy : zy;
Wu.useSyncExternalStore = sn.useSyncExternalStore !== void 0 ? sn.useSyncExternalStore : Uy;
Gu.exports = Wu;
var zu = Gu.exports, qy = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zr = v, Ky = zu;
function Yy(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Xy = typeof Object.is == "function" ? Object.is : Yy, Jy = Ky.useSyncExternalStore, Qy = Zr.useRef, Zy = Zr.useEffect, ev = Zr.useMemo, tv = Zr.useDebugValue;
qy.useSyncExternalStoreWithSelector = function(e, t, n, r, o) {
  var s = Qy(null);
  if (s.current === null) {
    var i = { hasValue: !1, value: null };
    s.current = i;
  } else
    i = s.current;
  s = ev(function() {
    function l(p) {
      if (!c) {
        if (c = !0, f = p, p = r(p), o !== void 0 && i.hasValue) {
          var m = i.value;
          if (o(m, p))
            return u = m;
        }
        return u = p;
      }
      if (m = u, Xy(f, p))
        return m;
      var g = r(p);
      return o !== void 0 && o(m, g) ? m : (f = p, u = g);
    }
    var c = !1, f, u, d = n === void 0 ? null : n;
    return [function() {
      return l(t());
    }, d === null ? void 0 : function() {
      return l(d());
    }];
  }, [t, n, r, o]);
  var a = Jy(e, s[0], s[1]);
  return Zy(function() {
    i.hasValue = !0, i.value = a;
  }, [a]), tv(a), a;
};
function nv(e) {
  e();
}
let Hu = nv;
const rv = (e) => Hu = e, ov = () => Hu, ul = Symbol.for("react-redux-context"), dl = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function sv() {
  var e;
  if (!I.createContext)
    return {};
  const t = (e = dl[ul]) != null ? e : dl[ul] = /* @__PURE__ */ new Map();
  let n = t.get(I.createContext);
  return n || (n = I.createContext(null), t.set(I.createContext, n)), n;
}
const Uu = /* @__PURE__ */ sv(), iv = () => {
  throw new Error("uSES not initialized!");
};
var qu = { exports: {} }, Q = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fe = typeof Symbol == "function" && Symbol.for, $i = fe ? Symbol.for("react.element") : 60103, Ti = fe ? Symbol.for("react.portal") : 60106, eo = fe ? Symbol.for("react.fragment") : 60107, to = fe ? Symbol.for("react.strict_mode") : 60108, no = fe ? Symbol.for("react.profiler") : 60114, ro = fe ? Symbol.for("react.provider") : 60109, oo = fe ? Symbol.for("react.context") : 60110, Li = fe ? Symbol.for("react.async_mode") : 60111, so = fe ? Symbol.for("react.concurrent_mode") : 60111, io = fe ? Symbol.for("react.forward_ref") : 60112, ao = fe ? Symbol.for("react.suspense") : 60113, av = fe ? Symbol.for("react.suspense_list") : 60120, lo = fe ? Symbol.for("react.memo") : 60115, co = fe ? Symbol.for("react.lazy") : 60116, lv = fe ? Symbol.for("react.block") : 60121, cv = fe ? Symbol.for("react.fundamental") : 60117, uv = fe ? Symbol.for("react.responder") : 60118, dv = fe ? Symbol.for("react.scope") : 60119;
function Be(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case $i:
        switch (e = e.type, e) {
          case Li:
          case so:
          case eo:
          case no:
          case to:
          case ao:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case oo:
              case io:
              case co:
              case lo:
              case ro:
                return e;
              default:
                return t;
            }
        }
      case Ti:
        return t;
    }
  }
}
function Ku(e) {
  return Be(e) === so;
}
Q.AsyncMode = Li;
Q.ConcurrentMode = so;
Q.ContextConsumer = oo;
Q.ContextProvider = ro;
Q.Element = $i;
Q.ForwardRef = io;
Q.Fragment = eo;
Q.Lazy = co;
Q.Memo = lo;
Q.Portal = Ti;
Q.Profiler = no;
Q.StrictMode = to;
Q.Suspense = ao;
Q.isAsyncMode = function(e) {
  return Ku(e) || Be(e) === Li;
};
Q.isConcurrentMode = Ku;
Q.isContextConsumer = function(e) {
  return Be(e) === oo;
};
Q.isContextProvider = function(e) {
  return Be(e) === ro;
};
Q.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === $i;
};
Q.isForwardRef = function(e) {
  return Be(e) === io;
};
Q.isFragment = function(e) {
  return Be(e) === eo;
};
Q.isLazy = function(e) {
  return Be(e) === co;
};
Q.isMemo = function(e) {
  return Be(e) === lo;
};
Q.isPortal = function(e) {
  return Be(e) === Ti;
};
Q.isProfiler = function(e) {
  return Be(e) === no;
};
Q.isStrictMode = function(e) {
  return Be(e) === to;
};
Q.isSuspense = function(e) {
  return Be(e) === ao;
};
Q.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === eo || e === so || e === no || e === to || e === ao || e === av || typeof e == "object" && e !== null && (e.$$typeof === co || e.$$typeof === lo || e.$$typeof === ro || e.$$typeof === oo || e.$$typeof === io || e.$$typeof === cv || e.$$typeof === uv || e.$$typeof === dv || e.$$typeof === lv);
};
Q.typeOf = Be;
qu.exports = Q;
var fv = qu.exports, Mi = fv, pv = {
  childContextTypes: !0,
  contextType: !0,
  contextTypes: !0,
  defaultProps: !0,
  displayName: !0,
  getDefaultProps: !0,
  getDerivedStateFromError: !0,
  getDerivedStateFromProps: !0,
  mixins: !0,
  propTypes: !0,
  type: !0
}, mv = {
  name: !0,
  length: !0,
  prototype: !0,
  caller: !0,
  callee: !0,
  arguments: !0,
  arity: !0
}, gv = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, Yu = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, Fi = {};
Fi[Mi.ForwardRef] = gv;
Fi[Mi.Memo] = Yu;
function fl(e) {
  return Mi.isMemo(e) ? Yu : Fi[e.$$typeof] || pv;
}
var hv = Object.defineProperty, bv = Object.getOwnPropertyNames, pl = Object.getOwnPropertySymbols, yv = Object.getOwnPropertyDescriptor, vv = Object.getPrototypeOf, ml = Object.prototype;
function Xu(e, t, n) {
  if (typeof t != "string") {
    if (ml) {
      var r = vv(t);
      r && r !== ml && Xu(e, r, n);
    }
    var o = bv(t);
    pl && (o = o.concat(pl(t)));
    for (var s = fl(e), i = fl(t), a = 0; a < o.length; ++a) {
      var l = o[a];
      if (!mv[l] && !(n && n[l]) && !(i && i[l]) && !(s && s[l])) {
        var c = yv(t, l);
        try {
          hv(e, l, c);
        } catch {
        }
      }
    }
  }
  return e;
}
var wv = Xu;
const gl = /* @__PURE__ */ Kl(wv);
var Ju = { exports: {} }, Z = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ki = Symbol.for("react.element"), Bi = Symbol.for("react.portal"), uo = Symbol.for("react.fragment"), fo = Symbol.for("react.strict_mode"), po = Symbol.for("react.profiler"), mo = Symbol.for("react.provider"), go = Symbol.for("react.context"), xv = Symbol.for("react.server_context"), ho = Symbol.for("react.forward_ref"), bo = Symbol.for("react.suspense"), yo = Symbol.for("react.suspense_list"), vo = Symbol.for("react.memo"), wo = Symbol.for("react.lazy"), Sv = Symbol.for("react.offscreen"), Qu;
Qu = Symbol.for("react.module.reference");
function Ye(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case ki:
        switch (e = e.type, e) {
          case uo:
          case po:
          case fo:
          case bo:
          case yo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case xv:
              case go:
              case ho:
              case wo:
              case vo:
              case mo:
                return e;
              default:
                return t;
            }
        }
      case Bi:
        return t;
    }
  }
}
Z.ContextConsumer = go;
Z.ContextProvider = mo;
Z.Element = ki;
Z.ForwardRef = ho;
Z.Fragment = uo;
Z.Lazy = wo;
Z.Memo = vo;
Z.Portal = Bi;
Z.Profiler = po;
Z.StrictMode = fo;
Z.Suspense = bo;
Z.SuspenseList = yo;
Z.isAsyncMode = function() {
  return !1;
};
Z.isConcurrentMode = function() {
  return !1;
};
Z.isContextConsumer = function(e) {
  return Ye(e) === go;
};
Z.isContextProvider = function(e) {
  return Ye(e) === mo;
};
Z.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ki;
};
Z.isForwardRef = function(e) {
  return Ye(e) === ho;
};
Z.isFragment = function(e) {
  return Ye(e) === uo;
};
Z.isLazy = function(e) {
  return Ye(e) === wo;
};
Z.isMemo = function(e) {
  return Ye(e) === vo;
};
Z.isPortal = function(e) {
  return Ye(e) === Bi;
};
Z.isProfiler = function(e) {
  return Ye(e) === po;
};
Z.isStrictMode = function(e) {
  return Ye(e) === fo;
};
Z.isSuspense = function(e) {
  return Ye(e) === bo;
};
Z.isSuspenseList = function(e) {
  return Ye(e) === yo;
};
Z.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === uo || e === po || e === fo || e === bo || e === yo || e === Sv || typeof e == "object" && e !== null && (e.$$typeof === wo || e.$$typeof === vo || e.$$typeof === mo || e.$$typeof === go || e.$$typeof === ho || e.$$typeof === Qu || e.getModuleId !== void 0);
};
Z.typeOf = Ye;
Ju.exports = Z;
var Cv = Ju.exports;
const Ev = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];
function Pv(e, t, n, r, {
  areStatesEqual: o,
  areOwnPropsEqual: s,
  areStatePropsEqual: i
}) {
  let a = !1, l, c, f, u, d;
  function p(x, b) {
    return l = x, c = b, f = e(l, c), u = t(r, c), d = n(f, u, c), a = !0, d;
  }
  function m() {
    return f = e(l, c), t.dependsOnOwnProps && (u = t(r, c)), d = n(f, u, c), d;
  }
  function g() {
    return e.dependsOnOwnProps && (f = e(l, c)), t.dependsOnOwnProps && (u = t(r, c)), d = n(f, u, c), d;
  }
  function h() {
    const x = e(l, c), b = !i(x, f);
    return f = x, b && (d = n(f, u, c)), d;
  }
  function w(x, b) {
    const y = !s(b, c), S = !o(x, l, b, c);
    return l = x, c = b, y && S ? m() : y ? g() : S ? h() : d;
  }
  return function(b, y) {
    return a ? w(b, y) : p(b, y);
  };
}
function Dv(e, t) {
  let {
    initMapStateToProps: n,
    initMapDispatchToProps: r,
    initMergeProps: o
  } = t, s = Ru(t, Ev);
  const i = n(e, s), a = r(e, s), l = o(e, s);
  return Pv(i, a, l, e, s);
}
function Iv(e, t) {
  const n = {};
  for (const r in e) {
    const o = e[r];
    typeof o == "function" && (n[r] = (...s) => t(o(...s)));
  }
  return n;
}
function hs(e) {
  return function(n) {
    const r = e(n);
    function o() {
      return r;
    }
    return o.dependsOnOwnProps = !1, o;
  };
}
function hl(e) {
  return e.dependsOnOwnProps ? !!e.dependsOnOwnProps : e.length !== 1;
}
function Zu(e, t) {
  return function(r, {
    displayName: o
  }) {
    const s = function(a, l) {
      return s.dependsOnOwnProps ? s.mapToProps(a, l) : s.mapToProps(a, void 0);
    };
    return s.dependsOnOwnProps = !0, s.mapToProps = function(a, l) {
      s.mapToProps = e, s.dependsOnOwnProps = hl(e);
      let c = s(a, l);
      return typeof c == "function" && (s.mapToProps = c, s.dependsOnOwnProps = hl(c), c = s(a, l)), c;
    }, s;
  };
}
function _i(e, t) {
  return (n, r) => {
    throw new Error(`Invalid value of type ${typeof e} for ${t} argument when connecting component ${r.wrappedComponentName}.`);
  };
}
function Rv(e) {
  return e && typeof e == "object" ? hs((t) => (
    // @ts-ignore
    Iv(e, t)
  )) : e ? typeof e == "function" ? (
    // @ts-ignore
    Zu(e)
  ) : _i(e, "mapDispatchToProps") : hs((t) => ({
    dispatch: t
  }));
}
function Av(e) {
  return e ? typeof e == "function" ? (
    // @ts-ignore
    Zu(e)
  ) : _i(e, "mapStateToProps") : hs(() => ({}));
}
function Ov(e, t, n) {
  return Et({}, n, e, t);
}
function Nv(e) {
  return function(n, {
    displayName: r,
    areMergedPropsEqual: o
  }) {
    let s = !1, i;
    return function(l, c, f) {
      const u = e(l, c, f);
      return s ? o(u, i) || (i = u) : (s = !0, i = u), i;
    };
  };
}
function $v(e) {
  return e ? typeof e == "function" ? Nv(e) : _i(e, "mergeProps") : () => Ov;
}
function Tv() {
  const e = ov();
  let t = null, n = null;
  return {
    clear() {
      t = null, n = null;
    },
    notify() {
      e(() => {
        let r = t;
        for (; r; )
          r.callback(), r = r.next;
      });
    },
    get() {
      let r = [], o = t;
      for (; o; )
        r.push(o), o = o.next;
      return r;
    },
    subscribe(r) {
      let o = !0, s = n = {
        callback: r,
        next: null,
        prev: n
      };
      return s.prev ? s.prev.next = s : t = s, function() {
        !o || t === null || (o = !1, s.next ? s.next.prev = s.prev : n = s.prev, s.prev ? s.prev.next = s.next : t = s.next);
      };
    }
  };
}
const bl = {
  notify() {
  },
  get: () => []
};
function ed(e, t) {
  let n, r = bl, o = 0, s = !1;
  function i(g) {
    f();
    const h = r.subscribe(g);
    let w = !1;
    return () => {
      w || (w = !0, h(), u());
    };
  }
  function a() {
    r.notify();
  }
  function l() {
    m.onStateChange && m.onStateChange();
  }
  function c() {
    return s;
  }
  function f() {
    o++, n || (n = t ? t.addNestedSub(l) : e.subscribe(l), r = Tv());
  }
  function u() {
    o--, n && o === 0 && (n(), n = void 0, r.clear(), r = bl);
  }
  function d() {
    s || (s = !0, f());
  }
  function p() {
    s && (s = !1, u());
  }
  const m = {
    addNestedSub: i,
    notifyNestedSubs: a,
    handleChangeWrapper: l,
    isSubscribed: c,
    trySubscribe: d,
    tryUnsubscribe: p,
    getListeners: () => r
  };
  return m;
}
const Lv = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Dr = Lv ? I.useLayoutEffect : I.useEffect;
function yl(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function qo(e, t) {
  if (yl(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (let o = 0; o < n.length; o++)
    if (!Object.prototype.hasOwnProperty.call(t, n[o]) || !yl(e[n[o]], t[n[o]]))
      return !1;
  return !0;
}
const Mv = ["reactReduxForwardedRef"];
let td = iv;
const Fv = (e) => {
  td = e;
}, kv = [null, null];
function Bv(e, t, n) {
  Dr(() => e(...t), n);
}
function _v(e, t, n, r, o, s) {
  e.current = r, n.current = !1, o.current && (o.current = null, s());
}
function jv(e, t, n, r, o, s, i, a, l, c, f) {
  if (!e)
    return () => {
    };
  let u = !1, d = null;
  const p = () => {
    if (u || !a.current)
      return;
    const g = t.getState();
    let h, w;
    try {
      h = r(g, o.current);
    } catch (x) {
      w = x, d = x;
    }
    w || (d = null), h === s.current ? i.current || c() : (s.current = h, l.current = h, i.current = !0, f());
  };
  return n.onStateChange = p, n.trySubscribe(), p(), () => {
    if (u = !0, n.tryUnsubscribe(), n.onStateChange = null, d)
      throw d;
  };
}
function Vv(e, t) {
  return e === t;
}
function nd(e, t, n, {
  // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
  // @ts-ignore
  pure: r,
  areStatesEqual: o = Vv,
  areOwnPropsEqual: s = qo,
  areStatePropsEqual: i = qo,
  areMergedPropsEqual: a = qo,
  // use React's forwardRef to expose a ref of the wrapped component
  forwardRef: l = !1,
  // the context consumer to use
  context: c = Uu
} = {}) {
  const f = c, u = Av(e), d = Rv(t), p = $v(n), m = !!e;
  return (h) => {
    const w = h.displayName || h.name || "Component", x = `Connect(${w})`, b = {
      shouldHandleStateChanges: m,
      displayName: x,
      wrappedComponentName: w,
      WrappedComponent: h,
      // @ts-ignore
      initMapStateToProps: u,
      // @ts-ignore
      initMapDispatchToProps: d,
      initMergeProps: p,
      areStatesEqual: o,
      areStatePropsEqual: i,
      areOwnPropsEqual: s,
      areMergedPropsEqual: a
    };
    function y(E) {
      const [P, L, T] = I.useMemo(() => {
        const {
          reactReduxForwardedRef: ie
        } = E, Y = Ru(E, Mv);
        return [E.context, ie, Y];
      }, [E]), N = I.useMemo(() => P && P.Consumer && // @ts-ignore
      Cv.isContextConsumer(/* @__PURE__ */ I.createElement(P.Consumer, null)) ? P : f, [P, f]), M = I.useContext(N), F = !!E.store && !!E.store.getState && !!E.store.dispatch, A = !!M && !!M.store, $ = F ? E.store : M.store, R = A ? M.getServerState : $.getState, B = I.useMemo(() => Dv($.dispatch, b), [$]), [O, H] = I.useMemo(() => {
        if (!m)
          return kv;
        const ie = ed($, F ? void 0 : M.subscription), Y = ie.notifyNestedSubs.bind(ie);
        return [ie, Y];
      }, [$, F, M]), X = I.useMemo(() => F ? M : Et({}, M, {
        subscription: O
      }), [F, M, O]), ne = I.useRef(), ge = I.useRef(T), le = I.useRef(), De = I.useRef(!1);
      I.useRef(!1);
      const he = I.useRef(!1), re = I.useRef();
      Dr(() => (he.current = !0, () => {
        he.current = !1;
      }), []);
      const be = I.useMemo(() => () => le.current && T === ge.current ? le.current : B($.getState(), T), [$, T]), Oe = I.useMemo(() => (Y) => O ? jv(
        m,
        $,
        O,
        // @ts-ignore
        B,
        ge,
        ne,
        De,
        he,
        le,
        H,
        Y
      ) : () => {
      }, [O]);
      Bv(_v, [ge, ne, De, T, le, H]);
      let we;
      try {
        we = td(
          // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
          Oe,
          // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
          // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
          be,
          R ? () => B(R(), T) : be
        );
      } catch (ie) {
        throw re.current && (ie.message += `
The error may be correlated with this previous error:
${re.current.stack}

`), ie;
      }
      Dr(() => {
        re.current = void 0, le.current = void 0, ne.current = we;
      });
      const xe = I.useMemo(() => (
        // @ts-ignore
        /* @__PURE__ */ I.createElement(h, Et({}, we, {
          ref: L
        }))
      ), [L, h, we]);
      return I.useMemo(() => m ? /* @__PURE__ */ I.createElement(N.Provider, {
        value: X
      }, xe) : xe, [N, xe, X]);
    }
    const C = I.memo(y);
    if (C.WrappedComponent = h, C.displayName = y.displayName = x, l) {
      const P = I.forwardRef(function(T, N) {
        return /* @__PURE__ */ I.createElement(C, Et({}, T, {
          reactReduxForwardedRef: N
        }));
      });
      return P.displayName = x, P.WrappedComponent = h, gl(P, h);
    }
    return gl(C, h);
  };
}
function Gv({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: o = "once",
  noopCheck: s = "once"
}) {
  const i = I.useMemo(() => {
    const c = ed(e);
    return {
      store: e,
      subscription: c,
      getServerState: r ? () => r : void 0,
      stabilityCheck: o,
      noopCheck: s
    };
  }, [e, r, o, s]), a = I.useMemo(() => e.getState(), [e]);
  Dr(() => {
    const {
      subscription: c
    } = i;
    return c.onStateChange = c.notifyNestedSubs, c.trySubscribe(), a !== e.getState() && c.notifyNestedSubs(), () => {
      c.tryUnsubscribe(), c.onStateChange = void 0;
    };
  }, [i, a]);
  const l = t || Uu;
  return /* @__PURE__ */ I.createElement(l.Provider, {
    value: i
  }, n);
}
Fv(zu.useSyncExternalStore);
rv(Df);
function Wv(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function rd(e, t) {
  var n = z(function() {
    return {
      inputs: t,
      result: e()
    };
  })[0], r = V(!0), o = V(n), s = r.current || !!(t && o.current.inputs && Wv(t, o.current.inputs)), i = s ? o.current : {
    inputs: t,
    result: e()
  };
  return W(function() {
    r.current = !1, o.current = i;
  }, [i]), i.result;
}
function zv(e, t) {
  return rd(function() {
    return e;
  }, t);
}
var K = rd, G = zv, Hv = !0, Ko = "Invariant failed";
function Uv(e, t) {
  if (!e) {
    if (Hv)
      throw new Error(Ko);
    var n = typeof t == "function" ? t() : t, r = n ? "".concat(Ko, ": ").concat(n) : Ko;
    throw new Error(r);
  }
}
var Qe = function(t) {
  var n = t.top, r = t.right, o = t.bottom, s = t.left, i = r - s, a = o - n, l = {
    top: n,
    right: r,
    bottom: o,
    left: s,
    width: i,
    height: a,
    x: s,
    y: n,
    center: {
      x: (r + s) / 2,
      y: (o + n) / 2
    }
  };
  return l;
}, ji = function(t, n) {
  return {
    top: t.top - n.top,
    left: t.left - n.left,
    bottom: t.bottom + n.bottom,
    right: t.right + n.right
  };
}, vl = function(t, n) {
  return {
    top: t.top + n.top,
    left: t.left + n.left,
    bottom: t.bottom - n.bottom,
    right: t.right - n.right
  };
}, qv = function(t, n) {
  return {
    top: t.top + n.y,
    left: t.left + n.x,
    bottom: t.bottom + n.y,
    right: t.right + n.x
  };
}, Yo = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}, Vi = function(t) {
  var n = t.borderBox, r = t.margin, o = r === void 0 ? Yo : r, s = t.border, i = s === void 0 ? Yo : s, a = t.padding, l = a === void 0 ? Yo : a, c = Qe(ji(n, o)), f = Qe(vl(n, i)), u = Qe(vl(f, l));
  return {
    marginBox: c,
    borderBox: Qe(n),
    paddingBox: f,
    contentBox: u,
    margin: o,
    border: i,
    padding: l
  };
}, Ve = function(t) {
  var n = t.slice(0, -2), r = t.slice(-2);
  if (r !== "px")
    return 0;
  var o = Number(n);
  return isNaN(o) && Uv(!1), o;
}, Kv = function() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}, Ir = function(t, n) {
  var r = t.borderBox, o = t.border, s = t.margin, i = t.padding, a = qv(r, n);
  return Vi({
    borderBox: a,
    border: o,
    margin: s,
    padding: i
  });
}, Rr = function(t, n) {
  return n === void 0 && (n = Kv()), Ir(t, n);
}, od = function(t, n) {
  var r = {
    top: Ve(n.marginTop),
    right: Ve(n.marginRight),
    bottom: Ve(n.marginBottom),
    left: Ve(n.marginLeft)
  }, o = {
    top: Ve(n.paddingTop),
    right: Ve(n.paddingRight),
    bottom: Ve(n.paddingBottom),
    left: Ve(n.paddingLeft)
  }, s = {
    top: Ve(n.borderTopWidth),
    right: Ve(n.borderRightWidth),
    bottom: Ve(n.borderBottomWidth),
    left: Ve(n.borderLeftWidth)
  };
  return Vi({
    borderBox: t,
    margin: r,
    padding: o,
    border: s
  });
}, sd = function(t) {
  var n = t.getBoundingClientRect(), r = window.getComputedStyle(t);
  return od(n, r);
}, wl = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function Yv(e, t) {
  return !!(e === t || wl(e) && wl(t));
}
function Xv(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0; n < e.length; n++)
    if (!Yv(e[n], t[n]))
      return !1;
  return !0;
}
function ce(e, t) {
  t === void 0 && (t = Xv);
  var n = null;
  function r() {
    for (var o = [], s = 0; s < arguments.length; s++)
      o[s] = arguments[s];
    if (n && n.lastThis === this && t(o, n.lastArgs))
      return n.lastResult;
    var i = e.apply(this, o);
    return n = {
      lastResult: i,
      lastArgs: o,
      lastThis: this
    }, i;
  }
  return r.clear = function() {
    n = null;
  }, r;
}
var Jv = function(t) {
  var n = [], r = null, o = function() {
    for (var i = arguments.length, a = new Array(i), l = 0; l < i; l++)
      a[l] = arguments[l];
    n = a, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
};
const $n = Jv;
function id(e, t) {
}
id.bind(null, "warn");
id.bind(null, "error");
function Pt() {
}
function Qv(e, t) {
  return {
    ...e,
    ...t
  };
}
function Ge(e, t, n) {
  const r = t.map((o) => {
    const s = Qv(n, o.options);
    return e.addEventListener(o.eventName, o.fn, s), function() {
      e.removeEventListener(o.eventName, o.fn, s);
    };
  });
  return function() {
    r.forEach((s) => {
      s();
    });
  };
}
const Zv = "Invariant failed";
class Ar extends Error {
}
Ar.prototype.toString = function() {
  return this.message;
};
function k(e, t) {
  if (!e)
    throw new Ar(Zv);
}
class e0 extends v.Component {
  constructor(...t) {
    super(...t), this.callbacks = null, this.unbind = Pt, this.onWindowError = (n) => {
      const r = this.getCallbacks();
      r.isDragging() && r.tryAbort(), n.error instanceof Ar && n.preventDefault();
    }, this.getCallbacks = () => {
      if (!this.callbacks)
        throw new Error("Unable to find AppCallbacks in <ErrorBoundary/>");
      return this.callbacks;
    }, this.setCallbacks = (n) => {
      this.callbacks = n;
    };
  }
  componentDidMount() {
    this.unbind = Ge(window, [{
      eventName: "error",
      fn: this.onWindowError
    }]);
  }
  componentDidCatch(t) {
    if (t instanceof Ar) {
      this.setState({});
      return;
    }
    throw t;
  }
  componentWillUnmount() {
    this.unbind();
  }
  render() {
    return this.props.children(this.setCallbacks);
  }
}
const t0 = `
  Press space bar to start a drag.
  When dragging you can use the arrow keys to move the item around and escape to cancel.
  Some screen readers may require you to be in focus mode or to use your pass through key
`, Or = (e) => e + 1, n0 = (e) => `
  You have lifted an item in position ${Or(e.source.index)}
`, ad = (e, t) => {
  const n = e.droppableId === t.droppableId, r = Or(e.index), o = Or(t.index);
  return n ? `
      You have moved the item from position ${r}
      to position ${o}
    ` : `
    You have moved the item from position ${r}
    in list ${e.droppableId}
    to list ${t.droppableId}
    in position ${o}
  `;
}, ld = (e, t, n) => t.droppableId === n.droppableId ? `
      The item ${e}
      has been combined with ${n.draggableId}` : `
      The item ${e}
      in list ${t.droppableId}
      has been combined with ${n.draggableId}
      in list ${n.droppableId}
    `, r0 = (e) => {
  const t = e.destination;
  if (t)
    return ad(e.source, t);
  const n = e.combine;
  return n ? ld(e.draggableId, e.source, n) : "You are over an area that cannot be dropped on";
}, xl = (e) => `
  The item has returned to its starting position
  of ${Or(e.index)}
`, o0 = (e) => {
  if (e.reason === "CANCEL")
    return `
      Movement cancelled.
      ${xl(e.source)}
    `;
  const t = e.destination, n = e.combine;
  return t ? `
      You have dropped the item.
      ${ad(e.source, t)}
    ` : n ? `
      You have dropped the item.
      ${ld(e.draggableId, e.source, n)}
    ` : `
    The item has been dropped while not over a drop area.
    ${xl(e.source)}
  `;
}, s0 = {
  dragHandleUsageInstructions: t0,
  onDragStart: n0,
  onDragUpdate: r0,
  onDragEnd: o0
};
var ur = s0;
const de = {
  x: 0,
  y: 0
}, me = (e, t) => ({
  x: e.x + t.x,
  y: e.y + t.y
}), Le = (e, t) => ({
  x: e.x - t.x,
  y: e.y - t.y
}), Dt = (e, t) => e.x === t.x && e.y === t.y, gn = (e) => ({
  x: e.x !== 0 ? -e.x : 0,
  y: e.y !== 0 ? -e.y : 0
}), Ut = (e, t, n = 0) => e === "x" ? {
  x: t,
  y: n
} : {
  x: n,
  y: t
}, Tn = (e, t) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2), Sl = (e, t) => Math.min(...t.map((n) => Tn(e, n))), cd = (e) => (t) => ({
  x: e(t.x),
  y: e(t.y)
});
var i0 = (e, t) => {
  const n = Qe({
    top: Math.max(t.top, e.top),
    right: Math.min(t.right, e.right),
    bottom: Math.min(t.bottom, e.bottom),
    left: Math.max(t.left, e.left)
  });
  return n.width <= 0 || n.height <= 0 ? null : n;
};
const qn = (e, t) => ({
  top: e.top + t.y,
  left: e.left + t.x,
  bottom: e.bottom + t.y,
  right: e.right + t.x
}), Cl = (e) => [{
  x: e.left,
  y: e.top
}, {
  x: e.right,
  y: e.top
}, {
  x: e.left,
  y: e.bottom
}, {
  x: e.right,
  y: e.bottom
}], a0 = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}, l0 = (e, t) => t ? qn(e, t.scroll.diff.displacement) : e, c0 = (e, t, n) => n && n.increasedBy ? {
  ...e,
  [t.end]: e[t.end] + n.increasedBy[t.line]
} : e, u0 = (e, t) => t && t.shouldClipSubject ? i0(t.pageMarginBox, e) : Qe(e);
var an = ({
  page: e,
  withPlaceholder: t,
  axis: n,
  frame: r
}) => {
  const o = l0(e.marginBox, r), s = c0(o, n, t), i = u0(s, r);
  return {
    page: e,
    withPlaceholder: t,
    active: i
  };
}, Gi = (e, t) => {
  e.frame || k(!1);
  const n = e.frame, r = Le(t, n.scroll.initial), o = gn(r), s = {
    ...n,
    scroll: {
      initial: n.scroll.initial,
      current: t,
      diff: {
        value: r,
        displacement: o
      },
      max: n.scroll.max
    }
  }, i = an({
    page: e.subject.page,
    withPlaceholder: e.subject.withPlaceholder,
    axis: e.axis,
    frame: s
  });
  return {
    ...e,
    frame: s,
    subject: i
  };
};
const ud = ce((e) => e.reduce((t, n) => (t[n.descriptor.id] = n, t), {})), dd = ce((e) => e.reduce((t, n) => (t[n.descriptor.id] = n, t), {})), xo = ce((e) => Object.values(e)), d0 = ce((e) => Object.values(e));
var hn = ce((e, t) => d0(t).filter((r) => e === r.descriptor.droppableId).sort((r, o) => r.descriptor.index - o.descriptor.index));
function Wi(e) {
  return e.at && e.at.type === "REORDER" ? e.at.destination : null;
}
function So(e) {
  return e.at && e.at.type === "COMBINE" ? e.at.combine : null;
}
var Co = ce((e, t) => t.filter((n) => n.descriptor.id !== e.descriptor.id)), f0 = ({
  isMovingForward: e,
  draggable: t,
  destination: n,
  insideDestination: r,
  previousImpact: o
}) => {
  if (!n.isCombineEnabled || !Wi(o))
    return null;
  function i(p) {
    const m = {
      type: "COMBINE",
      combine: {
        draggableId: p,
        droppableId: n.descriptor.id
      }
    };
    return {
      ...o,
      at: m
    };
  }
  const a = o.displaced.all, l = a.length ? a[0] : null;
  if (e)
    return l ? i(l) : null;
  const c = Co(t, r);
  if (!l) {
    if (!c.length)
      return null;
    const p = c[c.length - 1];
    return i(p.descriptor.id);
  }
  const f = c.findIndex((p) => p.descriptor.id === l);
  f === -1 && k(!1);
  const u = f - 1;
  if (u < 0)
    return null;
  const d = c[u];
  return i(d.descriptor.id);
}, bn = (e, t) => e.descriptor.droppableId === t.descriptor.id;
const fd = {
  point: de,
  value: 0
}, Ln = {
  invisible: {},
  visible: {},
  all: []
}, p0 = {
  displaced: Ln,
  displacedBy: fd,
  at: null
};
var m0 = p0, We = (e, t) => (n) => e <= n && n <= t, pd = (e) => {
  const t = We(e.top, e.bottom), n = We(e.left, e.right);
  return (r) => {
    if (t(r.top) && t(r.bottom) && n(r.left) && n(r.right))
      return !0;
    const s = t(r.top) || t(r.bottom), i = n(r.left) || n(r.right);
    if (s && i)
      return !0;
    const l = r.top < e.top && r.bottom > e.bottom, c = r.left < e.left && r.right > e.right;
    return l && c ? !0 : l && i || c && s;
  };
}, g0 = (e) => {
  const t = We(e.top, e.bottom), n = We(e.left, e.right);
  return (r) => t(r.top) && t(r.bottom) && n(r.left) && n(r.right);
};
const zi = {
  direction: "vertical",
  line: "y",
  crossAxisLine: "x",
  start: "top",
  end: "bottom",
  size: "height",
  crossAxisStart: "left",
  crossAxisEnd: "right",
  crossAxisSize: "width"
}, md = {
  direction: "horizontal",
  line: "x",
  crossAxisLine: "y",
  start: "left",
  end: "right",
  size: "width",
  crossAxisStart: "top",
  crossAxisEnd: "bottom",
  crossAxisSize: "height"
};
var h0 = (e) => (t) => {
  const n = We(t.top, t.bottom), r = We(t.left, t.right);
  return (o) => e === zi ? n(o.top) && n(o.bottom) : r(o.left) && r(o.right);
};
const b0 = (e, t) => {
  const n = t.frame ? t.frame.scroll.diff.displacement : de;
  return qn(e, n);
}, y0 = (e, t, n) => t.subject.active ? n(t.subject.active)(e) : !1, v0 = (e, t, n) => n(t)(e), Hi = ({
  target: e,
  destination: t,
  viewport: n,
  withDroppableDisplacement: r,
  isVisibleThroughFrameFn: o
}) => {
  const s = r ? b0(e, t) : e;
  return y0(s, t, o) && v0(s, n, o);
}, w0 = (e) => Hi({
  ...e,
  isVisibleThroughFrameFn: pd
}), gd = (e) => Hi({
  ...e,
  isVisibleThroughFrameFn: g0
}), x0 = (e) => Hi({
  ...e,
  isVisibleThroughFrameFn: h0(e.destination.axis)
}), S0 = (e, t, n) => {
  if (typeof n == "boolean")
    return n;
  if (!t)
    return !0;
  const {
    invisible: r,
    visible: o
  } = t;
  if (r[e])
    return !1;
  const s = o[e];
  return s ? s.shouldAnimate : !0;
};
function C0(e, t) {
  const n = e.page.marginBox, r = {
    top: t.point.y,
    right: 0,
    bottom: 0,
    left: t.point.x
  };
  return Qe(ji(n, r));
}
function Mn({
  afterDragging: e,
  destination: t,
  displacedBy: n,
  viewport: r,
  forceShouldAnimate: o,
  last: s
}) {
  return e.reduce(function(a, l) {
    const c = C0(l, n), f = l.descriptor.id;
    if (a.all.push(f), !w0({
      target: c,
      destination: t,
      viewport: r,
      withDroppableDisplacement: !0
    }))
      return a.invisible[l.descriptor.id] = !0, a;
    const d = S0(f, s, o), p = {
      draggableId: f,
      shouldAnimate: d
    };
    return a.visible[f] = p, a;
  }, {
    all: [],
    visible: {},
    invisible: {}
  });
}
function E0(e, t) {
  if (!e.length)
    return 0;
  const n = e[e.length - 1].descriptor.index;
  return t.inHomeList ? n : n + 1;
}
function El({
  insideDestination: e,
  inHomeList: t,
  displacedBy: n,
  destination: r
}) {
  const o = E0(e, {
    inHomeList: t
  });
  return {
    displaced: Ln,
    displacedBy: n,
    at: {
      type: "REORDER",
      destination: {
        droppableId: r.descriptor.id,
        index: o
      }
    }
  };
}
function Nr({
  draggable: e,
  insideDestination: t,
  destination: n,
  viewport: r,
  displacedBy: o,
  last: s,
  index: i,
  forceShouldAnimate: a
}) {
  const l = bn(e, n);
  if (i == null)
    return El({
      insideDestination: t,
      inHomeList: l,
      displacedBy: o,
      destination: n
    });
  const c = t.find((m) => m.descriptor.index === i);
  if (!c)
    return El({
      insideDestination: t,
      inHomeList: l,
      displacedBy: o,
      destination: n
    });
  const f = Co(e, t), u = t.indexOf(c), d = f.slice(u);
  return {
    displaced: Mn({
      afterDragging: d,
      destination: n,
      displacedBy: o,
      last: s,
      viewport: r.frame,
      forceShouldAnimate: a
    }),
    displacedBy: o,
    at: {
      type: "REORDER",
      destination: {
        droppableId: n.descriptor.id,
        index: i
      }
    }
  };
}
function $t(e, t) {
  return !!t.effected[e];
}
var P0 = ({
  isMovingForward: e,
  destination: t,
  draggables: n,
  combine: r,
  afterCritical: o
}) => {
  if (!t.isCombineEnabled)
    return null;
  const s = r.draggableId, a = n[s].descriptor.index;
  return $t(s, o) ? e ? a : a - 1 : e ? a + 1 : a;
}, D0 = ({
  isMovingForward: e,
  isInHomeList: t,
  insideDestination: n,
  location: r
}) => {
  if (!n.length)
    return null;
  const o = r.index, s = e ? o + 1 : o - 1, i = n[0].descriptor.index, a = n[n.length - 1].descriptor.index, l = t ? a : a + 1;
  return s < i || s > l ? null : s;
}, I0 = ({
  isMovingForward: e,
  isInHomeList: t,
  draggable: n,
  draggables: r,
  destination: o,
  insideDestination: s,
  previousImpact: i,
  viewport: a,
  afterCritical: l
}) => {
  const c = i.at;
  if (c || k(!1), c.type === "REORDER") {
    const u = D0({
      isMovingForward: e,
      isInHomeList: t,
      location: c.destination,
      insideDestination: s
    });
    return u == null ? null : Nr({
      draggable: n,
      insideDestination: s,
      destination: o,
      viewport: a,
      last: i.displaced,
      displacedBy: i.displacedBy,
      index: u
    });
  }
  const f = P0({
    isMovingForward: e,
    destination: o,
    displaced: i.displaced,
    draggables: r,
    combine: c.combine,
    afterCritical: l
  });
  return f == null ? null : Nr({
    draggable: n,
    insideDestination: s,
    destination: o,
    viewport: a,
    last: i.displaced,
    displacedBy: i.displacedBy,
    index: f
  });
}, R0 = ({
  displaced: e,
  afterCritical: t,
  combineWith: n,
  displacedBy: r
}) => {
  const o = !!(e.visible[n] || e.invisible[n]);
  return $t(n, t) ? o ? de : gn(r.point) : o ? r.point : de;
}, A0 = ({
  afterCritical: e,
  impact: t,
  draggables: n
}) => {
  const r = So(t);
  r || k(!1);
  const o = r.draggableId, s = n[o].page.borderBox.center, i = R0({
    displaced: t.displaced,
    afterCritical: e,
    combineWith: o,
    displacedBy: t.displacedBy
  });
  return me(s, i);
};
const hd = (e, t) => t.margin[e.start] + t.borderBox[e.size] / 2, O0 = (e, t) => t.margin[e.end] + t.borderBox[e.size] / 2, Ui = (e, t, n) => t[e.crossAxisStart] + n.margin[e.crossAxisStart] + n.borderBox[e.crossAxisSize] / 2, Pl = ({
  axis: e,
  moveRelativeTo: t,
  isMoving: n
}) => Ut(e.line, t.marginBox[e.end] + hd(e, n), Ui(e, t.marginBox, n)), Dl = ({
  axis: e,
  moveRelativeTo: t,
  isMoving: n
}) => Ut(e.line, t.marginBox[e.start] - O0(e, n), Ui(e, t.marginBox, n)), N0 = ({
  axis: e,
  moveInto: t,
  isMoving: n
}) => Ut(e.line, t.contentBox[e.start] + hd(e, n), Ui(e, t.contentBox, n));
var $0 = ({
  impact: e,
  draggable: t,
  draggables: n,
  droppable: r,
  afterCritical: o
}) => {
  const s = hn(r.descriptor.id, n), i = t.page, a = r.axis;
  if (!s.length)
    return N0({
      axis: a,
      moveInto: r.page,
      isMoving: i
    });
  const {
    displaced: l,
    displacedBy: c
  } = e, f = l.all[0];
  if (f) {
    const d = n[f];
    if ($t(f, o))
      return Dl({
        axis: a,
        moveRelativeTo: d.page,
        isMoving: i
      });
    const p = Ir(d.page, c.point);
    return Dl({
      axis: a,
      moveRelativeTo: p,
      isMoving: i
    });
  }
  const u = s[s.length - 1];
  if (u.descriptor.id === t.descriptor.id)
    return i.borderBox.center;
  if ($t(u.descriptor.id, o)) {
    const d = Ir(u.page, gn(o.displacedBy.point));
    return Pl({
      axis: a,
      moveRelativeTo: d,
      isMoving: i
    });
  }
  return Pl({
    axis: a,
    moveRelativeTo: u.page,
    isMoving: i
  });
}, bs = (e, t) => {
  const n = e.frame;
  return n ? me(t, n.scroll.diff.displacement) : t;
};
const T0 = ({
  impact: e,
  draggable: t,
  droppable: n,
  draggables: r,
  afterCritical: o
}) => {
  const s = t.page.borderBox.center, i = e.at;
  return !n || !i ? s : i.type === "REORDER" ? $0({
    impact: e,
    draggable: t,
    draggables: r,
    droppable: n,
    afterCritical: o
  }) : A0({
    impact: e,
    draggables: r,
    afterCritical: o
  });
};
var Eo = (e) => {
  const t = T0(e), n = e.droppable;
  return n ? bs(n, t) : t;
}, bd = (e, t) => {
  const n = Le(t, e.scroll.initial), r = gn(n);
  return {
    frame: Qe({
      top: t.y,
      bottom: t.y + e.frame.height,
      left: t.x,
      right: t.x + e.frame.width
    }),
    scroll: {
      initial: e.scroll.initial,
      max: e.scroll.max,
      current: t,
      diff: {
        value: n,
        displacement: r
      }
    }
  };
};
function Il(e, t) {
  return e.map((n) => t[n]);
}
function L0(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n].visible[e];
    if (r)
      return r;
  }
  return null;
}
var M0 = ({
  impact: e,
  viewport: t,
  destination: n,
  draggables: r,
  maxScrollChange: o
}) => {
  const s = bd(t, me(t.scroll.current, o)), i = n.frame ? Gi(n, me(n.frame.scroll.current, o)) : n, a = e.displaced, l = Mn({
    afterDragging: Il(a.all, r),
    destination: n,
    displacedBy: e.displacedBy,
    viewport: s.frame,
    last: a,
    forceShouldAnimate: !1
  }), c = Mn({
    afterDragging: Il(a.all, r),
    destination: i,
    displacedBy: e.displacedBy,
    viewport: t.frame,
    last: a,
    forceShouldAnimate: !1
  }), f = {}, u = {}, d = [a, l, c];
  return a.all.forEach((m) => {
    const g = L0(m, d);
    if (g) {
      u[m] = g;
      return;
    }
    f[m] = !0;
  }), {
    ...e,
    displaced: {
      all: a.all,
      invisible: f,
      visible: u
    }
  };
}, F0 = (e, t) => me(e.scroll.diff.displacement, t), qi = ({
  pageBorderBoxCenter: e,
  draggable: t,
  viewport: n
}) => {
  const r = F0(n, e), o = Le(r, t.page.borderBox.center);
  return me(t.client.borderBox.center, o);
}, yd = ({
  draggable: e,
  destination: t,
  newPageBorderBoxCenter: n,
  viewport: r,
  withDroppableDisplacement: o,
  onlyOnMainAxis: s = !1
}) => {
  const i = Le(n, e.page.borderBox.center), l = {
    target: qn(e.page.borderBox, i),
    destination: t,
    withDroppableDisplacement: o,
    viewport: r
  };
  return s ? x0(l) : gd(l);
}, k0 = ({
  isMovingForward: e,
  draggable: t,
  destination: n,
  draggables: r,
  previousImpact: o,
  viewport: s,
  previousPageBorderBoxCenter: i,
  previousClientSelection: a,
  afterCritical: l
}) => {
  if (!n.isEnabled)
    return null;
  const c = hn(n.descriptor.id, r), f = bn(t, n), u = f0({
    isMovingForward: e,
    draggable: t,
    destination: n,
    insideDestination: c,
    previousImpact: o
  }) || I0({
    isMovingForward: e,
    isInHomeList: f,
    draggable: t,
    draggables: r,
    destination: n,
    insideDestination: c,
    previousImpact: o,
    viewport: s,
    afterCritical: l
  });
  if (!u)
    return null;
  const d = Eo({
    impact: u,
    draggable: t,
    droppable: n,
    draggables: r,
    afterCritical: l
  });
  if (yd({
    draggable: t,
    destination: n,
    newPageBorderBoxCenter: d,
    viewport: s.frame,
    withDroppableDisplacement: !1,
    onlyOnMainAxis: !0
  }))
    return {
      clientSelection: qi({
        pageBorderBoxCenter: d,
        draggable: t,
        viewport: s
      }),
      impact: u,
      scrollJumpRequest: null
    };
  const m = Le(d, i), g = M0({
    impact: u,
    viewport: s,
    destination: n,
    draggables: r,
    maxScrollChange: m
  });
  return {
    clientSelection: a,
    impact: g,
    scrollJumpRequest: m
  };
};
const Ce = (e) => {
  const t = e.subject.active;
  return t || k(!1), t;
};
var B0 = ({
  isMovingForward: e,
  pageBorderBoxCenter: t,
  source: n,
  droppables: r,
  viewport: o
}) => {
  const s = n.subject.active;
  if (!s)
    return null;
  const i = n.axis, a = We(s[i.start], s[i.end]), l = xo(r).filter((f) => f !== n).filter((f) => f.isEnabled).filter((f) => !!f.subject.active).filter((f) => pd(o.frame)(Ce(f))).filter((f) => {
    const u = Ce(f);
    return e ? s[i.crossAxisEnd] < u[i.crossAxisEnd] : u[i.crossAxisStart] < s[i.crossAxisStart];
  }).filter((f) => {
    const u = Ce(f), d = We(u[i.start], u[i.end]);
    return a(u[i.start]) || a(u[i.end]) || d(s[i.start]) || d(s[i.end]);
  }).sort((f, u) => {
    const d = Ce(f)[i.crossAxisStart], p = Ce(u)[i.crossAxisStart];
    return e ? d - p : p - d;
  }).filter((f, u, d) => Ce(f)[i.crossAxisStart] === Ce(d[0])[i.crossAxisStart]);
  if (!l.length)
    return null;
  if (l.length === 1)
    return l[0];
  const c = l.filter((f) => We(Ce(f)[i.start], Ce(f)[i.end])(t[i.line]));
  return c.length === 1 ? c[0] : c.length > 1 ? c.sort((f, u) => Ce(f)[i.start] - Ce(u)[i.start])[0] : l.sort((f, u) => {
    const d = Sl(t, Cl(Ce(f))), p = Sl(t, Cl(Ce(u)));
    return d !== p ? d - p : Ce(f)[i.start] - Ce(u)[i.start];
  })[0];
};
const Rl = (e, t) => {
  const n = e.page.borderBox.center;
  return $t(e.descriptor.id, t) ? Le(n, t.displacedBy.point) : n;
}, _0 = (e, t) => {
  const n = e.page.borderBox;
  return $t(e.descriptor.id, t) ? qn(n, gn(t.displacedBy.point)) : n;
};
var j0 = ({
  pageBorderBoxCenter: e,
  viewport: t,
  destination: n,
  insideDestination: r,
  afterCritical: o
}) => r.filter((i) => gd({
  target: _0(i, o),
  destination: n,
  viewport: t.frame,
  withDroppableDisplacement: !0
})).sort((i, a) => {
  const l = Tn(e, bs(n, Rl(i, o))), c = Tn(e, bs(n, Rl(a, o)));
  return l < c ? -1 : c < l ? 1 : i.descriptor.index - a.descriptor.index;
})[0] || null, Kn = ce(function(t, n) {
  const r = n[t.line];
  return {
    value: r,
    point: Ut(t.line, r)
  };
});
const V0 = (e, t, n) => {
  const r = e.axis;
  if (e.descriptor.mode === "virtual")
    return Ut(r.line, t[r.line]);
  const o = e.subject.page.contentBox[r.size], l = hn(e.descriptor.id, n).reduce((c, f) => c + f.client.marginBox[r.size], 0) + t[r.line] - o;
  return l <= 0 ? null : Ut(r.line, l);
}, vd = (e, t) => ({
  ...e,
  scroll: {
    ...e.scroll,
    max: t
  }
}), wd = (e, t, n) => {
  const r = e.frame;
  bn(t, e) && k(!1), e.subject.withPlaceholder && k(!1);
  const o = Kn(e.axis, t.displaceBy).point, s = V0(e, o, n), i = {
    placeholderSize: o,
    increasedBy: s,
    oldFrameMaxScroll: e.frame ? e.frame.scroll.max : null
  };
  if (!r) {
    const f = an({
      page: e.subject.page,
      withPlaceholder: i,
      axis: e.axis,
      frame: e.frame
    });
    return {
      ...e,
      subject: f
    };
  }
  const a = s ? me(r.scroll.max, s) : r.scroll.max, l = vd(r, a), c = an({
    page: e.subject.page,
    withPlaceholder: i,
    axis: e.axis,
    frame: l
  });
  return {
    ...e,
    subject: c,
    frame: l
  };
}, G0 = (e) => {
  const t = e.subject.withPlaceholder;
  t || k(!1);
  const n = e.frame;
  if (!n) {
    const i = an({
      page: e.subject.page,
      axis: e.axis,
      frame: null,
      withPlaceholder: null
    });
    return {
      ...e,
      subject: i
    };
  }
  const r = t.oldFrameMaxScroll;
  r || k(!1);
  const o = vd(n, r), s = an({
    page: e.subject.page,
    axis: e.axis,
    frame: o,
    withPlaceholder: null
  });
  return {
    ...e,
    subject: s,
    frame: o
  };
};
var W0 = ({
  previousPageBorderBoxCenter: e,
  moveRelativeTo: t,
  insideDestination: n,
  draggable: r,
  draggables: o,
  destination: s,
  viewport: i,
  afterCritical: a
}) => {
  if (!t) {
    if (n.length)
      return null;
    const u = {
      displaced: Ln,
      displacedBy: fd,
      at: {
        type: "REORDER",
        destination: {
          droppableId: s.descriptor.id,
          index: 0
        }
      }
    }, d = Eo({
      impact: u,
      draggable: r,
      droppable: s,
      draggables: o,
      afterCritical: a
    }), p = bn(r, s) ? s : wd(s, r, o);
    return yd({
      draggable: r,
      destination: p,
      newPageBorderBoxCenter: d,
      viewport: i.frame,
      withDroppableDisplacement: !1,
      onlyOnMainAxis: !0
    }) ? u : null;
  }
  const l = e[s.axis.line] <= t.page.borderBox.center[s.axis.line], c = (() => {
    const u = t.descriptor.index;
    return t.descriptor.id === r.descriptor.id || l ? u : u + 1;
  })(), f = Kn(s.axis, r.displaceBy);
  return Nr({
    draggable: r,
    insideDestination: n,
    destination: s,
    viewport: i,
    displacedBy: f,
    last: Ln,
    index: c
  });
}, z0 = ({
  isMovingForward: e,
  previousPageBorderBoxCenter: t,
  draggable: n,
  isOver: r,
  draggables: o,
  droppables: s,
  viewport: i,
  afterCritical: a
}) => {
  const l = B0({
    isMovingForward: e,
    pageBorderBoxCenter: t,
    source: r,
    droppables: s,
    viewport: i
  });
  if (!l)
    return null;
  const c = hn(l.descriptor.id, o), f = j0({
    pageBorderBoxCenter: t,
    viewport: i,
    destination: l,
    insideDestination: c,
    afterCritical: a
  }), u = W0({
    previousPageBorderBoxCenter: t,
    destination: l,
    draggable: n,
    draggables: o,
    moveRelativeTo: f,
    insideDestination: c,
    viewport: i,
    afterCritical: a
  });
  if (!u)
    return null;
  const d = Eo({
    impact: u,
    draggable: n,
    droppable: l,
    draggables: o,
    afterCritical: a
  });
  return {
    clientSelection: qi({
      pageBorderBoxCenter: d,
      draggable: n,
      viewport: i
    }),
    impact: u,
    scrollJumpRequest: null
  };
}, Fe = (e) => {
  const t = e.at;
  return t ? t.type === "REORDER" ? t.destination.droppableId : t.combine.droppableId : null;
};
const H0 = (e, t) => {
  const n = Fe(e);
  return n ? t[n] : null;
};
var U0 = ({
  state: e,
  type: t
}) => {
  const n = H0(e.impact, e.dimensions.droppables), r = !!n, o = e.dimensions.droppables[e.critical.droppable.id], s = n || o, i = s.axis.direction, a = i === "vertical" && (t === "MOVE_UP" || t === "MOVE_DOWN") || i === "horizontal" && (t === "MOVE_LEFT" || t === "MOVE_RIGHT");
  if (a && !r)
    return null;
  const l = t === "MOVE_DOWN" || t === "MOVE_RIGHT", c = e.dimensions.draggables[e.critical.draggable.id], f = e.current.page.borderBoxCenter, {
    draggables: u,
    droppables: d
  } = e.dimensions;
  return a ? k0({
    isMovingForward: l,
    previousPageBorderBoxCenter: f,
    draggable: c,
    destination: s,
    draggables: u,
    viewport: e.viewport,
    previousClientSelection: e.current.client.selection,
    previousImpact: e.impact,
    afterCritical: e.afterCritical
  }) : z0({
    isMovingForward: l,
    previousPageBorderBoxCenter: f,
    draggable: c,
    isOver: s,
    draggables: u,
    droppables: d,
    viewport: e.viewport,
    afterCritical: e.afterCritical
  });
};
function _t(e) {
  return e.phase === "DRAGGING" || e.phase === "COLLECTING";
}
function xd(e) {
  const t = We(e.top, e.bottom), n = We(e.left, e.right);
  return function(o) {
    return t(o.y) && n(o.x);
  };
}
function q0(e, t) {
  return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function K0({
  pageBorderBox: e,
  draggable: t,
  candidates: n
}) {
  const r = t.page.borderBox.center, o = n.map((s) => {
    const i = s.axis, a = Ut(s.axis.line, e.center[i.line], s.page.borderBox.center[i.crossAxisLine]);
    return {
      id: s.descriptor.id,
      distance: Tn(r, a)
    };
  }).sort((s, i) => i.distance - s.distance);
  return o[0] ? o[0].id : null;
}
function Y0({
  pageBorderBox: e,
  draggable: t,
  droppables: n
}) {
  const r = xo(n).filter((o) => {
    if (!o.isEnabled)
      return !1;
    const s = o.subject.active;
    if (!s || !q0(e, s))
      return !1;
    if (xd(s)(e.center))
      return !0;
    const i = o.axis, a = s.center[i.crossAxisLine], l = e[i.crossAxisStart], c = e[i.crossAxisEnd], f = We(s[i.crossAxisStart], s[i.crossAxisEnd]), u = f(l), d = f(c);
    return !u && !d ? !0 : u ? l < a : c > a;
  });
  return r.length ? r.length === 1 ? r[0].descriptor.id : K0({
    pageBorderBox: e,
    draggable: t,
    candidates: r
  }) : null;
}
const Sd = (e, t) => Qe(qn(e, t));
var X0 = (e, t) => {
  const n = e.frame;
  return n ? Sd(t, n.scroll.diff.value) : t;
};
function Cd({
  displaced: e,
  id: t
}) {
  return !!(e.visible[t] || e.invisible[t]);
}
function J0({
  draggable: e,
  closest: t,
  inHomeList: n
}) {
  return t ? n && t.descriptor.index > e.descriptor.index ? t.descriptor.index - 1 : t.descriptor.index : null;
}
var Q0 = ({
  pageBorderBoxWithDroppableScroll: e,
  draggable: t,
  destination: n,
  insideDestination: r,
  last: o,
  viewport: s,
  afterCritical: i
}) => {
  const a = n.axis, l = Kn(n.axis, t.displaceBy), c = l.value, f = e[a.start], u = e[a.end], p = Co(t, r).find((g) => {
    const h = g.descriptor.id, w = g.page.borderBox.center[a.line], x = $t(h, i), b = Cd({
      displaced: o,
      id: h
    });
    return x ? b ? u <= w : f < w - c : b ? u <= w + c : f < w;
  }) || null, m = J0({
    draggable: t,
    closest: p,
    inHomeList: bn(t, n)
  });
  return Nr({
    draggable: t,
    insideDestination: r,
    destination: n,
    viewport: s,
    last: o,
    displacedBy: l,
    index: m
  });
};
const Z0 = 4;
var ew = ({
  draggable: e,
  pageBorderBoxWithDroppableScroll: t,
  previousImpact: n,
  destination: r,
  insideDestination: o,
  afterCritical: s
}) => {
  if (!r.isCombineEnabled)
    return null;
  const i = r.axis, a = Kn(r.axis, e.displaceBy), l = a.value, c = t[i.start], f = t[i.end], d = Co(e, o).find((m) => {
    const g = m.descriptor.id, h = m.page.borderBox, x = h[i.size] / Z0, b = $t(g, s), y = Cd({
      displaced: n.displaced,
      id: g
    });
    return b ? y ? f > h[i.start] + x && f < h[i.end] - x : c > h[i.start] - l + x && c < h[i.end] - l - x : y ? f > h[i.start] + l + x && f < h[i.end] + l - x : c > h[i.start] + x && c < h[i.end] - x;
  });
  return d ? {
    displacedBy: a,
    displaced: n.displaced,
    at: {
      type: "COMBINE",
      combine: {
        draggableId: d.descriptor.id,
        droppableId: r.descriptor.id
      }
    }
  } : null;
}, Ed = ({
  pageOffset: e,
  draggable: t,
  draggables: n,
  droppables: r,
  previousImpact: o,
  viewport: s,
  afterCritical: i
}) => {
  const a = Sd(t.page.borderBox, e), l = Y0({
    pageBorderBox: a,
    draggable: t,
    droppables: r
  });
  if (!l)
    return m0;
  const c = r[l], f = hn(c.descriptor.id, n), u = X0(c, a);
  return ew({
    pageBorderBoxWithDroppableScroll: u,
    draggable: t,
    previousImpact: o,
    destination: c,
    insideDestination: f,
    afterCritical: i
  }) || Q0({
    pageBorderBoxWithDroppableScroll: u,
    draggable: t,
    destination: c,
    insideDestination: f,
    last: o.displaced,
    viewport: s,
    afterCritical: i
  });
}, Ki = (e, t) => ({
  ...e,
  [t.descriptor.id]: t
});
const tw = ({
  previousImpact: e,
  impact: t,
  droppables: n
}) => {
  const r = Fe(e), o = Fe(t);
  if (!r || r === o)
    return n;
  const s = n[r];
  if (!s.subject.withPlaceholder)
    return n;
  const i = G0(s);
  return Ki(n, i);
};
var nw = ({
  draggable: e,
  draggables: t,
  droppables: n,
  previousImpact: r,
  impact: o
}) => {
  const s = tw({
    previousImpact: r,
    impact: o,
    droppables: n
  }), i = Fe(o);
  if (!i)
    return s;
  const a = n[i];
  if (bn(e, a) || a.subject.withPlaceholder)
    return s;
  const l = wd(a, e, t);
  return Ki(s, l);
}, Dn = ({
  state: e,
  clientSelection: t,
  dimensions: n,
  viewport: r,
  impact: o,
  scrollJumpRequest: s
}) => {
  const i = r || e.viewport, a = n || e.dimensions, l = t || e.current.client.selection, c = Le(l, e.initial.client.selection), f = {
    offset: c,
    selection: l,
    borderBoxCenter: me(e.initial.client.borderBoxCenter, c)
  }, u = {
    selection: me(f.selection, i.scroll.current),
    borderBoxCenter: me(f.borderBoxCenter, i.scroll.current),
    offset: me(f.offset, i.scroll.diff.value)
  }, d = {
    client: f,
    page: u
  };
  if (e.phase === "COLLECTING")
    return {
      ...e,
      dimensions: a,
      viewport: i,
      current: d
    };
  const p = a.draggables[e.critical.draggable.id], m = o || Ed({
    pageOffset: u.offset,
    draggable: p,
    draggables: a.draggables,
    droppables: a.droppables,
    previousImpact: e.impact,
    viewport: i,
    afterCritical: e.afterCritical
  }), g = nw({
    draggable: p,
    impact: m,
    previousImpact: e.impact,
    draggables: a.draggables,
    droppables: a.droppables
  });
  return {
    ...e,
    current: d,
    dimensions: {
      draggables: a.draggables,
      droppables: g
    },
    impact: m,
    viewport: i,
    scrollJumpRequest: s || null,
    forceShouldAnimate: s ? !1 : null
  };
};
function rw(e, t) {
  return e.map((n) => t[n]);
}
var Pd = ({
  impact: e,
  viewport: t,
  draggables: n,
  destination: r,
  forceShouldAnimate: o
}) => {
  const s = e.displaced, i = rw(s.all, n), a = Mn({
    afterDragging: i,
    destination: r,
    displacedBy: e.displacedBy,
    viewport: t.frame,
    forceShouldAnimate: o,
    last: s
  });
  return {
    ...e,
    displaced: a
  };
}, Dd = ({
  impact: e,
  draggable: t,
  droppable: n,
  draggables: r,
  viewport: o,
  afterCritical: s
}) => {
  const i = Eo({
    impact: e,
    draggable: t,
    draggables: r,
    droppable: n,
    afterCritical: s
  });
  return qi({
    pageBorderBoxCenter: i,
    draggable: t,
    viewport: o
  });
}, Id = ({
  state: e,
  dimensions: t,
  viewport: n
}) => {
  e.movementMode !== "SNAP" && k(!1);
  const r = e.impact, o = n || e.viewport, s = t || e.dimensions, {
    draggables: i,
    droppables: a
  } = s, l = i[e.critical.draggable.id], c = Fe(r);
  c || k(!1);
  const f = a[c], u = Pd({
    impact: r,
    viewport: o,
    destination: f,
    draggables: i
  }), d = Dd({
    impact: u,
    draggable: l,
    droppable: f,
    draggables: i,
    viewport: o,
    afterCritical: e.afterCritical
  });
  return Dn({
    impact: u,
    clientSelection: d,
    state: e,
    dimensions: s,
    viewport: o
  });
}, ow = (e) => ({
  index: e.index,
  droppableId: e.droppableId
}), Rd = ({
  draggable: e,
  home: t,
  draggables: n,
  viewport: r
}) => {
  const o = Kn(t.axis, e.displaceBy), s = hn(t.descriptor.id, n), i = s.indexOf(e);
  i === -1 && k(!1);
  const a = s.slice(i + 1), l = a.reduce((d, p) => (d[p.descriptor.id] = !0, d), {}), c = {
    inVirtualList: t.descriptor.mode === "virtual",
    displacedBy: o,
    effected: l
  };
  return {
    impact: {
      displaced: Mn({
        afterDragging: a,
        destination: t,
        displacedBy: o,
        last: null,
        viewport: r.frame,
        forceShouldAnimate: !1
      }),
      displacedBy: o,
      at: {
        type: "REORDER",
        destination: ow(e.descriptor)
      }
    },
    afterCritical: c
  };
}, sw = (e, t) => ({
  draggables: e.draggables,
  droppables: Ki(e.droppables, t)
}), iw = ({
  draggable: e,
  offset: t,
  initialWindowScroll: n
}) => {
  const r = Ir(e.client, t), o = Rr(r, n);
  return {
    ...e,
    placeholder: {
      ...e.placeholder,
      client: r
    },
    client: r,
    page: o
  };
}, aw = (e) => {
  const t = e.frame;
  return t || k(!1), t;
}, lw = ({
  additions: e,
  updatedDroppables: t,
  viewport: n
}) => {
  const r = n.scroll.diff.value;
  return e.map((o) => {
    const s = o.descriptor.droppableId, i = t[s], l = aw(i).scroll.diff.value, c = me(r, l);
    return iw({
      draggable: o,
      offset: c,
      initialWindowScroll: n.scroll.initial
    });
  });
}, cw = ({
  state: e,
  published: t
}) => {
  const n = t.modified.map((w) => {
    const x = e.dimensions.droppables[w.droppableId];
    return Gi(x, w.scroll);
  }), r = {
    ...e.dimensions.droppables,
    ...ud(n)
  }, o = dd(lw({
    additions: t.additions,
    updatedDroppables: r,
    viewport: e.viewport
  })), s = {
    ...e.dimensions.draggables,
    ...o
  };
  t.removals.forEach((w) => {
    delete s[w];
  });
  const i = {
    droppables: r,
    draggables: s
  }, a = Fe(e.impact), l = a ? i.droppables[a] : null, c = i.draggables[e.critical.draggable.id], f = i.droppables[e.critical.droppable.id], {
    impact: u,
    afterCritical: d
  } = Rd({
    draggable: c,
    home: f,
    draggables: s,
    viewport: e.viewport
  }), p = l && l.isCombineEnabled ? e.impact : u, m = Ed({
    pageOffset: e.current.page.offset,
    draggable: i.draggables[e.critical.draggable.id],
    draggables: i.draggables,
    droppables: i.droppables,
    previousImpact: p,
    viewport: e.viewport,
    afterCritical: d
  }), g = {
    ...e,
    phase: "DRAGGING",
    impact: m,
    onLiftImpact: u,
    dimensions: i,
    afterCritical: d,
    forceShouldAnimate: !1
  };
  return e.phase === "COLLECTING" ? g : {
    ...g,
    phase: "DROP_PENDING",
    reason: e.reason,
    isWaiting: !1
  };
};
const ys = (e) => e.movementMode === "SNAP", Xo = (e, t, n) => {
  const r = sw(e.dimensions, t);
  return !ys(e) || n ? Dn({
    state: e,
    dimensions: r
  }) : Id({
    state: e,
    dimensions: r
  });
};
function Jo(e) {
  return e.isDragging && e.movementMode === "SNAP" ? {
    ...e,
    scrollJumpRequest: null
  } : e;
}
const Al = {
  phase: "IDLE",
  completed: null,
  shouldFlush: !1
};
var uw = (e = Al, t) => {
  if (t.type === "FLUSH")
    return {
      ...Al,
      shouldFlush: !0
    };
  if (t.type === "INITIAL_PUBLISH") {
    e.phase !== "IDLE" && k(!1);
    const {
      critical: n,
      clientSelection: r,
      viewport: o,
      dimensions: s,
      movementMode: i
    } = t.payload, a = s.draggables[n.draggable.id], l = s.droppables[n.droppable.id], c = {
      selection: r,
      borderBoxCenter: a.client.borderBox.center,
      offset: de
    }, f = {
      client: c,
      page: {
        selection: me(c.selection, o.scroll.initial),
        borderBoxCenter: me(c.selection, o.scroll.initial),
        offset: me(c.selection, o.scroll.diff.value)
      }
    }, u = xo(s.droppables).every((g) => !g.isFixedOnPage), {
      impact: d,
      afterCritical: p
    } = Rd({
      draggable: a,
      home: l,
      draggables: s.draggables,
      viewport: o
    });
    return {
      phase: "DRAGGING",
      isDragging: !0,
      critical: n,
      movementMode: i,
      dimensions: s,
      initial: f,
      current: f,
      isWindowScrollAllowed: u,
      impact: d,
      afterCritical: p,
      onLiftImpact: d,
      viewport: o,
      scrollJumpRequest: null,
      forceShouldAnimate: null
    };
  }
  if (t.type === "COLLECTION_STARTING")
    return e.phase === "COLLECTING" || e.phase === "DROP_PENDING" ? e : (e.phase !== "DRAGGING" && k(!1), {
      ...e,
      phase: "COLLECTING"
    });
  if (t.type === "PUBLISH_WHILE_DRAGGING")
    return e.phase === "COLLECTING" || e.phase === "DROP_PENDING" || k(!1), cw({
      state: e,
      published: t.payload
    });
  if (t.type === "MOVE") {
    if (e.phase === "DROP_PENDING")
      return e;
    _t(e) || k(!1);
    const {
      client: n
    } = t.payload;
    return Dt(n, e.current.client.selection) ? e : Dn({
      state: e,
      clientSelection: n,
      impact: ys(e) ? e.impact : null
    });
  }
  if (t.type === "UPDATE_DROPPABLE_SCROLL") {
    if (e.phase === "DROP_PENDING" || e.phase === "COLLECTING")
      return Jo(e);
    _t(e) || k(!1);
    const {
      id: n,
      newScroll: r
    } = t.payload, o = e.dimensions.droppables[n];
    if (!o)
      return e;
    const s = Gi(o, r);
    return Xo(e, s, !1);
  }
  if (t.type === "UPDATE_DROPPABLE_IS_ENABLED") {
    if (e.phase === "DROP_PENDING")
      return e;
    _t(e) || k(!1);
    const {
      id: n,
      isEnabled: r
    } = t.payload, o = e.dimensions.droppables[n];
    o || k(!1), o.isEnabled === r && k(!1);
    const s = {
      ...o,
      isEnabled: r
    };
    return Xo(e, s, !0);
  }
  if (t.type === "UPDATE_DROPPABLE_IS_COMBINE_ENABLED") {
    if (e.phase === "DROP_PENDING")
      return e;
    _t(e) || k(!1);
    const {
      id: n,
      isCombineEnabled: r
    } = t.payload, o = e.dimensions.droppables[n];
    o || k(!1), o.isCombineEnabled === r && k(!1);
    const s = {
      ...o,
      isCombineEnabled: r
    };
    return Xo(e, s, !0);
  }
  if (t.type === "MOVE_BY_WINDOW_SCROLL") {
    if (e.phase === "DROP_PENDING" || e.phase === "DROP_ANIMATING")
      return e;
    _t(e) || k(!1), e.isWindowScrollAllowed || k(!1);
    const n = t.payload.newScroll;
    if (Dt(e.viewport.scroll.current, n))
      return Jo(e);
    const r = bd(e.viewport, n);
    return ys(e) ? Id({
      state: e,
      viewport: r
    }) : Dn({
      state: e,
      viewport: r
    });
  }
  if (t.type === "UPDATE_VIEWPORT_MAX_SCROLL") {
    if (!_t(e))
      return e;
    const n = t.payload.maxScroll;
    if (Dt(n, e.viewport.scroll.max))
      return e;
    const r = {
      ...e.viewport,
      scroll: {
        ...e.viewport.scroll,
        max: n
      }
    };
    return {
      ...e,
      viewport: r
    };
  }
  if (t.type === "MOVE_UP" || t.type === "MOVE_DOWN" || t.type === "MOVE_LEFT" || t.type === "MOVE_RIGHT") {
    if (e.phase === "COLLECTING" || e.phase === "DROP_PENDING")
      return e;
    e.phase !== "DRAGGING" && k(!1);
    const n = U0({
      state: e,
      type: t.type
    });
    return n ? Dn({
      state: e,
      impact: n.impact,
      clientSelection: n.clientSelection,
      scrollJumpRequest: n.scrollJumpRequest
    }) : e;
  }
  if (t.type === "DROP_PENDING") {
    const n = t.payload.reason;
    return e.phase !== "COLLECTING" && k(!1), {
      ...e,
      phase: "DROP_PENDING",
      isWaiting: !0,
      reason: n
    };
  }
  if (t.type === "DROP_ANIMATE") {
    const {
      completed: n,
      dropDuration: r,
      newHomeClientOffset: o
    } = t.payload;
    return e.phase === "DRAGGING" || e.phase === "DROP_PENDING" || k(!1), {
      phase: "DROP_ANIMATING",
      completed: n,
      dropDuration: r,
      newHomeClientOffset: o,
      dimensions: e.dimensions
    };
  }
  if (t.type === "DROP_COMPLETE") {
    const {
      completed: n
    } = t.payload;
    return {
      phase: "IDLE",
      completed: n,
      shouldFlush: !1
    };
  }
  return e;
};
const dw = (e) => ({
  type: "BEFORE_INITIAL_CAPTURE",
  payload: e
}), fw = (e) => ({
  type: "LIFT",
  payload: e
}), pw = (e) => ({
  type: "INITIAL_PUBLISH",
  payload: e
}), mw = (e) => ({
  type: "PUBLISH_WHILE_DRAGGING",
  payload: e
}), gw = () => ({
  type: "COLLECTION_STARTING",
  payload: null
}), hw = (e) => ({
  type: "UPDATE_DROPPABLE_SCROLL",
  payload: e
}), bw = (e) => ({
  type: "UPDATE_DROPPABLE_IS_ENABLED",
  payload: e
}), yw = (e) => ({
  type: "UPDATE_DROPPABLE_IS_COMBINE_ENABLED",
  payload: e
}), Ad = (e) => ({
  type: "MOVE",
  payload: e
}), vw = (e) => ({
  type: "MOVE_BY_WINDOW_SCROLL",
  payload: e
}), ww = (e) => ({
  type: "UPDATE_VIEWPORT_MAX_SCROLL",
  payload: e
}), xw = () => ({
  type: "MOVE_UP",
  payload: null
}), Sw = () => ({
  type: "MOVE_DOWN",
  payload: null
}), Cw = () => ({
  type: "MOVE_RIGHT",
  payload: null
}), Ew = () => ({
  type: "MOVE_LEFT",
  payload: null
}), Yi = () => ({
  type: "FLUSH",
  payload: null
}), Pw = (e) => ({
  type: "DROP_ANIMATE",
  payload: e
}), Xi = (e) => ({
  type: "DROP_COMPLETE",
  payload: e
}), Od = (e) => ({
  type: "DROP",
  payload: e
}), Dw = (e) => ({
  type: "DROP_PENDING",
  payload: e
}), Nd = () => ({
  type: "DROP_ANIMATION_FINISHED",
  payload: null
});
var Iw = (e) => ({
  getState: t,
  dispatch: n
}) => (r) => (o) => {
  if (o.type !== "LIFT") {
    r(o);
    return;
  }
  const {
    id: s,
    clientSelection: i,
    movementMode: a
  } = o.payload, l = t();
  l.phase === "DROP_ANIMATING" && n(Xi({
    completed: l.completed
  })), t().phase !== "IDLE" && k(!1), n(Yi()), n(dw({
    draggableId: s,
    movementMode: a
  }));
  const f = {
    draggableId: s,
    scrollOptions: {
      shouldPublishImmediately: a === "SNAP"
    }
  }, {
    critical: u,
    dimensions: d,
    viewport: p
  } = e.startPublishing(f);
  n(pw({
    critical: u,
    dimensions: d,
    clientSelection: i,
    movementMode: a,
    viewport: p
  }));
}, Rw = (e) => () => (t) => (n) => {
  n.type === "INITIAL_PUBLISH" && e.dragging(), n.type === "DROP_ANIMATE" && e.dropping(n.payload.completed.result.reason), (n.type === "FLUSH" || n.type === "DROP_COMPLETE") && e.resting(), t(n);
};
const Ji = {
  outOfTheWay: "cubic-bezier(0.2, 0, 0, 1)",
  drop: "cubic-bezier(.2,1,.1,1)"
}, Fn = {
  opacity: {
    drop: 0,
    combining: 0.7
  },
  scale: {
    drop: 0.75
  }
}, $d = {
  outOfTheWay: 0.2,
  minDropTime: 0.33,
  maxDropTime: 0.55
}, Bt = `${$d.outOfTheWay}s ${Ji.outOfTheWay}`, In = {
  fluid: `opacity ${Bt}`,
  snap: `transform ${Bt}, opacity ${Bt}`,
  drop: (e) => {
    const t = `${e}s ${Ji.drop}`;
    return `transform ${t}, opacity ${t}`;
  },
  outOfTheWay: `transform ${Bt}`,
  placeholder: `height ${Bt}, width ${Bt}, margin ${Bt}`
}, Ol = (e) => Dt(e, de) ? void 0 : `translate(${e.x}px, ${e.y}px)`, vs = {
  moveTo: Ol,
  drop: (e, t) => {
    const n = Ol(e);
    if (n)
      return t ? `${n} scale(${Fn.scale.drop})` : n;
  }
}, {
  minDropTime: ws,
  maxDropTime: Td
} = $d, Aw = Td - ws, Nl = 1500, Ow = 0.6;
var Nw = ({
  current: e,
  destination: t,
  reason: n
}) => {
  const r = Tn(e, t);
  if (r <= 0)
    return ws;
  if (r >= Nl)
    return Td;
  const o = r / Nl, s = ws + Aw * o, i = n === "CANCEL" ? s * Ow : s;
  return Number(i.toFixed(2));
}, $w = ({
  impact: e,
  draggable: t,
  dimensions: n,
  viewport: r,
  afterCritical: o
}) => {
  const {
    draggables: s,
    droppables: i
  } = n, a = Fe(e), l = a ? i[a] : null, c = i[t.descriptor.droppableId], f = Dd({
    impact: e,
    draggable: t,
    draggables: s,
    afterCritical: o,
    droppable: l || c,
    viewport: r
  });
  return Le(f, t.client.borderBox.center);
}, Tw = ({
  draggables: e,
  reason: t,
  lastImpact: n,
  home: r,
  viewport: o,
  onLiftImpact: s
}) => !n.at || t !== "DROP" ? {
  impact: Pd({
    draggables: e,
    impact: s,
    destination: r,
    viewport: o,
    forceShouldAnimate: !0
  }),
  didDropInsideDroppable: !1
} : n.at.type === "REORDER" ? {
  impact: n,
  didDropInsideDroppable: !0
} : {
  impact: {
    ...n,
    displaced: Ln
  },
  didDropInsideDroppable: !0
};
const Lw = ({
  getState: e,
  dispatch: t
}) => (n) => (r) => {
  if (r.type !== "DROP") {
    n(r);
    return;
  }
  const o = e(), s = r.payload.reason;
  if (o.phase === "COLLECTING") {
    t(Dw({
      reason: s
    }));
    return;
  }
  if (o.phase === "IDLE")
    return;
  o.phase === "DROP_PENDING" && o.isWaiting && k(!1), o.phase === "DRAGGING" || o.phase === "DROP_PENDING" || k(!1);
  const a = o.critical, l = o.dimensions, c = l.draggables[o.critical.draggable.id], {
    impact: f,
    didDropInsideDroppable: u
  } = Tw({
    reason: s,
    lastImpact: o.impact,
    afterCritical: o.afterCritical,
    onLiftImpact: o.onLiftImpact,
    home: o.dimensions.droppables[o.critical.droppable.id],
    viewport: o.viewport,
    draggables: o.dimensions.draggables
  }), d = u ? Wi(f) : null, p = u ? So(f) : null, m = {
    index: a.draggable.index,
    droppableId: a.droppable.id
  }, g = {
    draggableId: c.descriptor.id,
    type: c.descriptor.type,
    source: m,
    reason: s,
    mode: o.movementMode,
    destination: d,
    combine: p
  }, h = $w({
    impact: f,
    draggable: c,
    dimensions: l,
    viewport: o.viewport,
    afterCritical: o.afterCritical
  }), w = {
    critical: o.critical,
    afterCritical: o.afterCritical,
    result: g,
    impact: f
  };
  if (!(!Dt(o.current.client.offset, h) || !!g.combine)) {
    t(Xi({
      completed: w
    }));
    return;
  }
  const b = Nw({
    current: o.current.client.offset,
    destination: h,
    reason: s
  });
  t(Pw({
    newHomeClientOffset: h,
    dropDuration: b,
    completed: w
  }));
};
var Mw = Lw, Ld = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset
});
function Fw(e) {
  return {
    eventName: "scroll",
    options: {
      passive: !0,
      capture: !1
    },
    fn: (t) => {
      t.target !== window && t.target !== window.document || e();
    }
  };
}
function kw({
  onWindowScroll: e
}) {
  function t() {
    e(Ld());
  }
  const n = $n(t), r = Fw(n);
  let o = Pt;
  function s() {
    return o !== Pt;
  }
  function i() {
    s() && k(!1), o = Ge(window, [r]);
  }
  function a() {
    s() || k(!1), n.cancel(), o(), o = Pt;
  }
  return {
    start: i,
    stop: a,
    isActive: s
  };
}
const Bw = (e) => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH", _w = (e) => {
  const t = kw({
    onWindowScroll: (n) => {
      e.dispatch(vw({
        newScroll: n
      }));
    }
  });
  return (n) => (r) => {
    !t.isActive() && r.type === "INITIAL_PUBLISH" && t.start(), t.isActive() && Bw(r) && t.stop(), n(r);
  };
};
var jw = _w, Vw = (e) => {
  let t = !1, n = !1;
  const r = setTimeout(() => {
    n = !0;
  }), o = (s) => {
    t || n || (t = !0, e(s), clearTimeout(r));
  };
  return o.wasCalled = () => t, o;
}, Gw = () => {
  const e = [], t = (o) => {
    const s = e.findIndex((a) => a.timerId === o);
    s === -1 && k(!1);
    const [i] = e.splice(s, 1);
    i.callback();
  };
  return {
    add: (o) => {
      const s = setTimeout(() => t(s)), i = {
        timerId: s,
        callback: o
      };
      e.push(i);
    },
    flush: () => {
      if (!e.length)
        return;
      const o = [...e];
      e.length = 0, o.forEach((s) => {
        clearTimeout(s.timerId), s.callback();
      });
    }
  };
};
const Ww = (e, t) => e == null && t == null ? !0 : e == null || t == null ? !1 : e.droppableId === t.droppableId && e.index === t.index, zw = (e, t) => e == null && t == null ? !0 : e == null || t == null ? !1 : e.draggableId === t.draggableId && e.droppableId === t.droppableId, Hw = (e, t) => {
  if (e === t)
    return !0;
  const n = e.draggable.id === t.draggable.id && e.draggable.droppableId === t.draggable.droppableId && e.draggable.type === t.draggable.type && e.draggable.index === t.draggable.index, r = e.droppable.id === t.droppable.id && e.droppable.type === t.droppable.type;
  return n && r;
}, Cn = (e, t) => {
  t();
}, nr = (e, t) => ({
  draggableId: e.draggable.id,
  type: e.droppable.type,
  source: {
    droppableId: e.droppable.id,
    index: e.draggable.index
  },
  mode: t
});
function Qo(e, t, n, r) {
  if (!e) {
    n(r(t));
    return;
  }
  const o = Vw(n);
  e(t, {
    announce: o
  }), o.wasCalled() || n(r(t));
}
var Uw = (e, t) => {
  const n = Gw();
  let r = null;
  const o = (u, d) => {
    r && k(!1), Cn("onBeforeCapture", () => {
      const p = e().onBeforeCapture;
      p && p({
        draggableId: u,
        mode: d
      });
    });
  }, s = (u, d) => {
    r && k(!1), Cn("onBeforeDragStart", () => {
      const p = e().onBeforeDragStart;
      p && p(nr(u, d));
    });
  }, i = (u, d) => {
    r && k(!1);
    const p = nr(u, d);
    r = {
      mode: d,
      lastCritical: u,
      lastLocation: p.source,
      lastCombine: null
    }, n.add(() => {
      Cn("onDragStart", () => Qo(e().onDragStart, p, t, ur.onDragStart));
    });
  }, a = (u, d) => {
    const p = Wi(d), m = So(d);
    r || k(!1);
    const g = !Hw(u, r.lastCritical);
    g && (r.lastCritical = u);
    const h = !Ww(r.lastLocation, p);
    h && (r.lastLocation = p);
    const w = !zw(r.lastCombine, m);
    if (w && (r.lastCombine = m), !g && !h && !w)
      return;
    const x = {
      ...nr(u, r.mode),
      combine: m,
      destination: p
    };
    n.add(() => {
      Cn("onDragUpdate", () => Qo(e().onDragUpdate, x, t, ur.onDragUpdate));
    });
  }, l = () => {
    r || k(!1), n.flush();
  }, c = (u) => {
    r || k(!1), r = null, Cn("onDragEnd", () => Qo(e().onDragEnd, u, t, ur.onDragEnd));
  };
  return {
    beforeCapture: o,
    beforeStart: s,
    start: i,
    update: a,
    flush: l,
    drop: c,
    abort: () => {
      if (!r)
        return;
      const u = {
        ...nr(r.lastCritical, r.mode),
        combine: null,
        destination: null,
        reason: "CANCEL"
      };
      c(u);
    }
  };
}, qw = (e, t) => {
  const n = Uw(e, t);
  return (r) => (o) => (s) => {
    if (s.type === "BEFORE_INITIAL_CAPTURE") {
      n.beforeCapture(s.payload.draggableId, s.payload.movementMode);
      return;
    }
    if (s.type === "INITIAL_PUBLISH") {
      const a = s.payload.critical;
      n.beforeStart(a, s.payload.movementMode), o(s), n.start(a, s.payload.movementMode);
      return;
    }
    if (s.type === "DROP_COMPLETE") {
      const a = s.payload.completed.result;
      n.flush(), o(s), n.drop(a);
      return;
    }
    if (o(s), s.type === "FLUSH") {
      n.abort();
      return;
    }
    const i = r.getState();
    i.phase === "DRAGGING" && n.update(i.critical, i.impact);
  };
};
const Kw = (e) => (t) => (n) => {
  if (n.type !== "DROP_ANIMATION_FINISHED") {
    t(n);
    return;
  }
  const r = e.getState();
  r.phase !== "DROP_ANIMATING" && k(!1), e.dispatch(Xi({
    completed: r.completed
  }));
};
var Yw = Kw;
const Xw = (e) => {
  let t = null, n = null;
  function r() {
    n && (cancelAnimationFrame(n), n = null), t && (t(), t = null);
  }
  return (o) => (s) => {
    if ((s.type === "FLUSH" || s.type === "DROP_COMPLETE" || s.type === "DROP_ANIMATION_FINISHED") && r(), o(s), s.type !== "DROP_ANIMATE")
      return;
    const i = {
      eventName: "scroll",
      options: {
        capture: !0,
        passive: !1,
        once: !0
      },
      fn: function() {
        e.getState().phase === "DROP_ANIMATING" && e.dispatch(Nd());
      }
    };
    n = requestAnimationFrame(() => {
      n = null, t = Ge(window, [i]);
    });
  };
};
var Jw = Xw, Qw = (e) => () => (t) => (n) => {
  (n.type === "DROP_COMPLETE" || n.type === "FLUSH" || n.type === "DROP_ANIMATE") && e.stopPublishing(), t(n);
}, Zw = (e) => {
  let t = !1;
  return () => (n) => (r) => {
    if (r.type === "INITIAL_PUBLISH") {
      t = !0, e.tryRecordFocus(r.payload.critical.draggable.id), n(r), e.tryRestoreFocusRecorded();
      return;
    }
    if (n(r), !!t) {
      if (r.type === "FLUSH") {
        t = !1, e.tryRestoreFocusRecorded();
        return;
      }
      if (r.type === "DROP_COMPLETE") {
        t = !1;
        const o = r.payload.completed.result;
        o.combine && e.tryShiftRecord(o.draggableId, o.combine.draggableId), e.tryRestoreFocusRecorded();
      }
    }
  };
};
const ex = (e) => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH";
var tx = (e) => (t) => (n) => (r) => {
  if (ex(r)) {
    e.stop(), n(r);
    return;
  }
  if (r.type === "INITIAL_PUBLISH") {
    n(r);
    const o = t.getState();
    o.phase !== "DRAGGING" && k(!1), e.start(o);
    return;
  }
  n(r), e.scroll(t.getState());
};
const nx = (e) => (t) => (n) => {
  if (t(n), n.type !== "PUBLISH_WHILE_DRAGGING")
    return;
  const r = e.getState();
  r.phase === "DROP_PENDING" && (r.isWaiting || e.dispatch(Od({
    reason: r.reason
  })));
};
var rx = nx;
const ox = Vu;
var sx = ({
  dimensionMarshal: e,
  focusMarshal: t,
  styleMarshal: n,
  getResponders: r,
  announce: o,
  autoScroller: s
}) => ju(uw, ox(ky(Rw(n), Qw(e), Iw(e), Mw, Yw, Jw, rx, tx(s), jw, Zw(t), qw(r, o))));
const Zo = () => ({
  additions: {},
  removals: {},
  modified: {}
});
function ix({
  registry: e,
  callbacks: t
}) {
  let n = Zo(), r = null;
  const o = () => {
    r || (t.collectionStarting(), r = requestAnimationFrame(() => {
      r = null;
      const {
        additions: l,
        removals: c,
        modified: f
      } = n, u = Object.keys(l).map((m) => e.draggable.getById(m).getDimension(de)).sort((m, g) => m.descriptor.index - g.descriptor.index), d = Object.keys(f).map((m) => {
        const h = e.droppable.getById(m).callbacks.getScrollWhileDragging();
        return {
          droppableId: m,
          scroll: h
        };
      }), p = {
        additions: u,
        removals: Object.keys(c),
        modified: d
      };
      n = Zo(), t.publish(p);
    }));
  };
  return {
    add: (l) => {
      const c = l.descriptor.id;
      n.additions[c] = l, n.modified[l.descriptor.droppableId] = !0, n.removals[c] && delete n.removals[c], o();
    },
    remove: (l) => {
      const c = l.descriptor;
      n.removals[c.id] = !0, n.modified[c.droppableId] = !0, n.additions[c.id] && delete n.additions[c.id], o();
    },
    stop: () => {
      r && (cancelAnimationFrame(r), r = null, n = Zo());
    }
  };
}
var Md = ({
  scrollHeight: e,
  scrollWidth: t,
  height: n,
  width: r
}) => {
  const o = Le({
    x: t,
    y: e
  }, {
    x: r,
    y: n
  });
  return {
    x: Math.max(0, o.x),
    y: Math.max(0, o.y)
  };
}, Fd = () => {
  const e = document.documentElement;
  return e || k(!1), e;
}, kd = () => {
  const e = Fd();
  return Md({
    scrollHeight: e.scrollHeight,
    scrollWidth: e.scrollWidth,
    width: e.clientWidth,
    height: e.clientHeight
  });
}, ax = () => {
  const e = Ld(), t = kd(), n = e.y, r = e.x, o = Fd(), s = o.clientWidth, i = o.clientHeight, a = r + s, l = n + i;
  return {
    frame: Qe({
      top: n,
      left: r,
      right: a,
      bottom: l
    }),
    scroll: {
      initial: e,
      current: e,
      max: t,
      diff: {
        value: de,
        displacement: de
      }
    }
  };
}, lx = ({
  critical: e,
  scrollOptions: t,
  registry: n
}) => {
  const r = ax(), o = r.scroll.current, s = e.droppable, i = n.droppable.getAllByType(s.type).map((f) => f.callbacks.getDimensionAndWatchScroll(o, t)), a = n.draggable.getAllByType(e.draggable.type).map((f) => f.getDimension(o));
  return {
    dimensions: {
      draggables: dd(a),
      droppables: ud(i)
    },
    critical: e,
    viewport: r
  };
};
function $l(e, t, n) {
  return !(n.descriptor.id === t.id || n.descriptor.type !== t.type || e.droppable.getById(n.descriptor.droppableId).descriptor.mode !== "virtual");
}
var cx = (e, t) => {
  let n = null;
  const r = ix({
    callbacks: {
      publish: t.publishWhileDragging,
      collectionStarting: t.collectionStarting
    },
    registry: e
  }), o = (d, p) => {
    e.droppable.exists(d) || k(!1), n && t.updateDroppableIsEnabled({
      id: d,
      isEnabled: p
    });
  }, s = (d, p) => {
    n && (e.droppable.exists(d) || k(!1), t.updateDroppableIsCombineEnabled({
      id: d,
      isCombineEnabled: p
    }));
  }, i = (d, p) => {
    n && (e.droppable.exists(d) || k(!1), t.updateDroppableScroll({
      id: d,
      newScroll: p
    }));
  }, a = (d, p) => {
    n && e.droppable.getById(d).callbacks.scroll(p);
  }, l = () => {
    if (!n)
      return;
    r.stop();
    const d = n.critical.droppable;
    e.droppable.getAllByType(d.type).forEach((p) => p.callbacks.dragStopped()), n.unsubscribe(), n = null;
  }, c = (d) => {
    n || k(!1);
    const p = n.critical.draggable;
    d.type === "ADDITION" && $l(e, p, d.value) && r.add(d.value), d.type === "REMOVAL" && $l(e, p, d.value) && r.remove(d.value);
  };
  return {
    updateDroppableIsEnabled: o,
    updateDroppableIsCombineEnabled: s,
    scrollDroppable: a,
    updateDroppableScroll: i,
    startPublishing: (d) => {
      n && k(!1);
      const p = e.draggable.getById(d.draggableId), m = e.droppable.getById(p.descriptor.droppableId), g = {
        draggable: p.descriptor,
        droppable: m.descriptor
      }, h = e.subscribe(c);
      return n = {
        critical: g,
        unsubscribe: h
      }, lx({
        critical: g,
        registry: e,
        scrollOptions: d.scrollOptions
      });
    },
    stopPublishing: l
  };
}, Bd = (e, t) => e.phase === "IDLE" ? !0 : e.phase !== "DROP_ANIMATING" || e.completed.result.draggableId === t ? !1 : e.completed.result.reason === "DROP", ux = (e) => {
  window.scrollBy(e.x, e.y);
};
const dx = ce((e) => xo(e).filter((t) => !(!t.isEnabled || !t.frame))), fx = (e, t) => dx(t).find((r) => (r.frame || k(!1), xd(r.frame.pageMarginBox)(e))) || null;
var px = ({
  center: e,
  destination: t,
  droppables: n
}) => {
  if (t) {
    const o = n[t];
    return o.frame ? o : null;
  }
  return fx(e, n);
};
const kn = {
  startFromPercentage: 0.25,
  maxScrollAtPercentage: 0.05,
  maxPixelScroll: 28,
  ease: (e) => e ** 2,
  durationDampening: {
    stopDampeningAt: 1200,
    accelerateAt: 360
  },
  disabled: !1
};
var mx = (e, t, n = () => kn) => {
  const r = n(), o = e[t.size] * r.startFromPercentage, s = e[t.size] * r.maxScrollAtPercentage;
  return {
    startScrollingFrom: o,
    maxScrollValueAt: s
  };
}, _d = ({
  startOfRange: e,
  endOfRange: t,
  current: n
}) => {
  const r = t - e;
  return r === 0 ? 0 : (n - e) / r;
}, Qi = 1, gx = (e, t, n = () => kn) => {
  const r = n();
  if (e > t.startScrollingFrom)
    return 0;
  if (e <= t.maxScrollValueAt)
    return r.maxPixelScroll;
  if (e === t.startScrollingFrom)
    return Qi;
  const s = 1 - _d({
    startOfRange: t.maxScrollValueAt,
    endOfRange: t.startScrollingFrom,
    current: e
  }), i = r.maxPixelScroll * r.ease(s);
  return Math.ceil(i);
}, hx = (e, t, n) => {
  const r = n(), o = r.durationDampening.accelerateAt, s = r.durationDampening.stopDampeningAt, i = t, a = s, c = Date.now() - i;
  if (c >= s)
    return e;
  if (c < o)
    return Qi;
  const f = _d({
    startOfRange: o,
    endOfRange: a,
    current: c
  }), u = e * r.ease(f);
  return Math.ceil(u);
}, Tl = ({
  distanceToEdge: e,
  thresholds: t,
  dragStartTime: n,
  shouldUseTimeDampening: r,
  getAutoScrollerOptions: o
}) => {
  const s = gx(e, t, o);
  return s === 0 ? 0 : r ? Math.max(hx(s, n, o), Qi) : s;
}, Ll = ({
  container: e,
  distanceToEdges: t,
  dragStartTime: n,
  axis: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: s
}) => {
  const i = mx(e, r, s);
  return t[r.end] < t[r.start] ? Tl({
    distanceToEdge: t[r.end],
    thresholds: i,
    dragStartTime: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: s
  }) : -1 * Tl({
    distanceToEdge: t[r.start],
    thresholds: i,
    dragStartTime: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: s
  });
}, bx = ({
  container: e,
  subject: t,
  proposedScroll: n
}) => {
  const r = t.height > e.height, o = t.width > e.width;
  return !o && !r ? n : o && r ? null : {
    x: o ? 0 : n.x,
    y: r ? 0 : n.y
  };
};
const yx = cd((e) => e === 0 ? 0 : e);
var jd = ({
  dragStartTime: e,
  container: t,
  subject: n,
  center: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: s
}) => {
  const i = {
    top: r.y - t.top,
    right: t.right - r.x,
    bottom: t.bottom - r.y,
    left: r.x - t.left
  }, a = Ll({
    container: t,
    distanceToEdges: i,
    dragStartTime: e,
    axis: zi,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: s
  }), l = Ll({
    container: t,
    distanceToEdges: i,
    dragStartTime: e,
    axis: md,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: s
  }), c = yx({
    x: l,
    y: a
  });
  if (Dt(c, de))
    return null;
  const f = bx({
    container: t,
    subject: n,
    proposedScroll: c
  });
  return f ? Dt(f, de) ? null : f : null;
};
const vx = cd((e) => e === 0 ? 0 : e > 0 ? 1 : -1), Zi = (() => {
  const e = (t, n) => t < 0 ? t : t > n ? t - n : 0;
  return ({
    current: t,
    max: n,
    change: r
  }) => {
    const o = me(t, r), s = {
      x: e(o.x, n.x),
      y: e(o.y, n.y)
    };
    return Dt(s, de) ? null : s;
  };
})(), Vd = ({
  max: e,
  current: t,
  change: n
}) => {
  const r = {
    x: Math.max(t.x, e.x),
    y: Math.max(t.y, e.y)
  }, o = vx(n), s = Zi({
    max: r,
    current: t,
    change: o
  });
  return !s || o.x !== 0 && s.x === 0 || o.y !== 0 && s.y === 0;
}, ea = (e, t) => Vd({
  current: e.scroll.current,
  max: e.scroll.max,
  change: t
}), wx = (e, t) => {
  if (!ea(e, t))
    return null;
  const n = e.scroll.max, r = e.scroll.current;
  return Zi({
    current: r,
    max: n,
    change: t
  });
}, ta = (e, t) => {
  const n = e.frame;
  return n ? Vd({
    current: n.scroll.current,
    max: n.scroll.max,
    change: t
  }) : !1;
}, xx = (e, t) => {
  const n = e.frame;
  return !n || !ta(e, t) ? null : Zi({
    current: n.scroll.current,
    max: n.scroll.max,
    change: t
  });
};
var Sx = ({
  viewport: e,
  subject: t,
  center: n,
  dragStartTime: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: s
}) => {
  const i = jd({
    dragStartTime: r,
    container: e.frame,
    subject: t,
    center: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: s
  });
  return i && ea(e, i) ? i : null;
}, Cx = ({
  droppable: e,
  subject: t,
  center: n,
  dragStartTime: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: s
}) => {
  const i = e.frame;
  if (!i)
    return null;
  const a = jd({
    dragStartTime: r,
    container: i.pageMarginBox,
    subject: t,
    center: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: s
  });
  return a && ta(e, a) ? a : null;
}, Ml = ({
  state: e,
  dragStartTime: t,
  shouldUseTimeDampening: n,
  scrollWindow: r,
  scrollDroppable: o,
  getAutoScrollerOptions: s
}) => {
  const i = e.current.page.borderBoxCenter, l = e.dimensions.draggables[e.critical.draggable.id].page.marginBox;
  if (e.isWindowScrollAllowed) {
    const u = e.viewport, d = Sx({
      dragStartTime: t,
      viewport: u,
      subject: l,
      center: i,
      shouldUseTimeDampening: n,
      getAutoScrollerOptions: s
    });
    if (d) {
      r(d);
      return;
    }
  }
  const c = px({
    center: i,
    destination: Fe(e.impact),
    droppables: e.dimensions.droppables
  });
  if (!c)
    return;
  const f = Cx({
    dragStartTime: t,
    droppable: c,
    subject: l,
    center: i,
    shouldUseTimeDampening: n,
    getAutoScrollerOptions: s
  });
  f && o(c.descriptor.id, f);
}, Ex = ({
  scrollWindow: e,
  scrollDroppable: t,
  getAutoScrollerOptions: n = () => kn
}) => {
  const r = $n(e), o = $n(t);
  let s = null;
  const i = (c) => {
    s || k(!1);
    const {
      shouldUseTimeDampening: f,
      dragStartTime: u
    } = s;
    Ml({
      state: c,
      scrollWindow: r,
      scrollDroppable: o,
      dragStartTime: u,
      shouldUseTimeDampening: f,
      getAutoScrollerOptions: n
    });
  };
  return {
    start: (c) => {
      s && k(!1);
      const f = Date.now();
      let u = !1;
      const d = () => {
        u = !0;
      };
      Ml({
        state: c,
        dragStartTime: 0,
        shouldUseTimeDampening: !1,
        scrollWindow: d,
        scrollDroppable: d,
        getAutoScrollerOptions: n
      }), s = {
        dragStartTime: f,
        shouldUseTimeDampening: u
      }, u && i(c);
    },
    stop: () => {
      s && (r.cancel(), o.cancel(), s = null);
    },
    scroll: i
  };
}, Px = ({
  move: e,
  scrollDroppable: t,
  scrollWindow: n
}) => {
  const r = (a, l) => {
    const c = me(a.current.client.selection, l);
    e({
      client: c
    });
  }, o = (a, l) => {
    if (!ta(a, l))
      return l;
    const c = xx(a, l);
    if (!c)
      return t(a.descriptor.id, l), null;
    const f = Le(l, c);
    return t(a.descriptor.id, f), Le(l, f);
  }, s = (a, l, c) => {
    if (!a || !ea(l, c))
      return c;
    const f = wx(l, c);
    if (!f)
      return n(c), null;
    const u = Le(c, f);
    return n(u), Le(c, u);
  };
  return (a) => {
    const l = a.scrollJumpRequest;
    if (!l)
      return;
    const c = Fe(a.impact);
    c || k(!1);
    const f = o(a.dimensions.droppables[c], l);
    if (!f)
      return;
    const u = a.viewport, d = s(a.isWindowScrollAllowed, u, f);
    d && r(a, d);
  };
}, Dx = ({
  scrollDroppable: e,
  scrollWindow: t,
  move: n,
  getAutoScrollerOptions: r
}) => {
  const o = Ex({
    scrollWindow: t,
    scrollDroppable: e,
    getAutoScrollerOptions: r
  }), s = Px({
    move: n,
    scrollWindow: t,
    scrollDroppable: e
  });
  return {
    scroll: (l) => {
      if (!(r().disabled || l.phase !== "DRAGGING")) {
        if (l.movementMode === "FLUID") {
          o.scroll(l);
          return;
        }
        l.scrollJumpRequest && s(l);
      }
    },
    start: o.start,
    stop: o.stop
  };
};
const ln = "data-rfd", cn = (() => {
  const e = `${ln}-drag-handle`;
  return {
    base: e,
    draggableId: `${e}-draggable-id`,
    contextId: `${e}-context-id`
  };
})(), xs = (() => {
  const e = `${ln}-draggable`;
  return {
    base: e,
    contextId: `${e}-context-id`,
    id: `${e}-id`
  };
})(), Ix = (() => {
  const e = `${ln}-droppable`;
  return {
    base: e,
    contextId: `${e}-context-id`,
    id: `${e}-id`
  };
})(), Fl = {
  contextId: `${ln}-scroll-container-context-id`
}, Rx = (e) => (t) => `[${t}="${e}"]`, En = (e, t) => e.map((n) => {
  const r = n.styles[t];
  return r ? `${n.selector} { ${r} }` : "";
}).join(" "), Ax = "pointer-events: none;";
var Ox = (e) => {
  const t = Rx(e), n = (() => {
    const a = `
      cursor: -webkit-grab;
      cursor: grab;
    `;
    return {
      selector: t(cn.contextId),
      styles: {
        always: `
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          touch-action: manipulation;
        `,
        resting: a,
        dragging: Ax,
        dropAnimating: a
      }
    };
  })(), r = (() => {
    const a = `
      transition: ${In.outOfTheWay};
    `;
    return {
      selector: t(xs.contextId),
      styles: {
        dragging: a,
        dropAnimating: a,
        userCancel: a
      }
    };
  })(), o = {
    selector: t(Ix.contextId),
    styles: {
      always: "overflow-anchor: none;"
    }
  }, i = [r, n, o, {
    selector: "body",
    styles: {
      dragging: `
        cursor: grabbing;
        cursor: -webkit-grabbing;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        overflow-anchor: none;
      `
    }
  }];
  return {
    always: En(i, "always"),
    resting: En(i, "resting"),
    dragging: En(i, "dragging"),
    dropAnimating: En(i, "dropAnimating"),
    userCancel: En(i, "userCancel")
  };
};
const Nx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u" ? Lr : W;
var ke = Nx;
const es = () => {
  const e = document.querySelector("head");
  return e || k(!1), e;
}, kl = (e) => {
  const t = document.createElement("style");
  return e && t.setAttribute("nonce", e), t.type = "text/css", t;
};
function $x(e, t) {
  const n = K(() => Ox(e), [e]), r = V(null), o = V(null), s = G(ce((u) => {
    const d = o.current;
    d || k(!1), d.textContent = u;
  }), []), i = G((u) => {
    const d = r.current;
    d || k(!1), d.textContent = u;
  }, []);
  ke(() => {
    !r.current && !o.current || k(!1);
    const u = kl(t), d = kl(t);
    return r.current = u, o.current = d, u.setAttribute(`${ln}-always`, e), d.setAttribute(`${ln}-dynamic`, e), es().appendChild(u), es().appendChild(d), i(n.always), s(n.resting), () => {
      const p = (m) => {
        const g = m.current;
        g || k(!1), es().removeChild(g), m.current = null;
      };
      p(r), p(o);
    };
  }, [t, i, s, n.always, n.resting, e]);
  const a = G(() => s(n.dragging), [s, n.dragging]), l = G((u) => {
    if (u === "DROP") {
      s(n.dropAnimating);
      return;
    }
    s(n.userCancel);
  }, [s, n.dropAnimating, n.userCancel]), c = G(() => {
    o.current && s(n.resting);
  }, [s, n.resting]);
  return K(() => ({
    dragging: a,
    dropping: l,
    resting: c
  }), [a, l, c]);
}
function Gd(e, t) {
  return Array.from(e.querySelectorAll(t));
}
var Wd = (e) => e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window;
function Po(e) {
  return e instanceof Wd(e).HTMLElement;
}
function Tx(e, t) {
  const n = `[${cn.contextId}="${e}"]`, r = Gd(document, n);
  if (!r.length)
    return null;
  const o = r.find((s) => s.getAttribute(cn.draggableId) === t);
  return !o || !Po(o) ? null : o;
}
function Lx(e) {
  const t = V({}), n = V(null), r = V(null), o = V(!1), s = G(function(d, p) {
    const m = {
      id: d,
      focus: p
    };
    return t.current[d] = m, function() {
      const h = t.current;
      h[d] !== m && delete h[d];
    };
  }, []), i = G(function(d) {
    const p = Tx(e, d);
    p && p !== document.activeElement && p.focus();
  }, [e]), a = G(function(d, p) {
    n.current === d && (n.current = p);
  }, []), l = G(function() {
    r.current || o.current && (r.current = requestAnimationFrame(() => {
      r.current = null;
      const d = n.current;
      d && i(d);
    }));
  }, [i]), c = G(function(d) {
    n.current = null;
    const p = document.activeElement;
    p && p.getAttribute(cn.draggableId) === d && (n.current = d);
  }, []);
  return ke(() => (o.current = !0, function() {
    o.current = !1;
    const d = r.current;
    d && cancelAnimationFrame(d);
  }), []), K(() => ({
    register: s,
    tryRecordFocus: c,
    tryRestoreFocusRecorded: l,
    tryShiftRecord: a
  }), [s, c, l, a]);
}
function Mx() {
  const e = {
    draggables: {},
    droppables: {}
  }, t = [];
  function n(u) {
    return t.push(u), function() {
      const p = t.indexOf(u);
      p !== -1 && t.splice(p, 1);
    };
  }
  function r(u) {
    t.length && t.forEach((d) => d(u));
  }
  function o(u) {
    return e.draggables[u] || null;
  }
  function s(u) {
    const d = o(u);
    return d || k(!1), d;
  }
  const i = {
    register: (u) => {
      e.draggables[u.descriptor.id] = u, r({
        type: "ADDITION",
        value: u
      });
    },
    update: (u, d) => {
      const p = e.draggables[d.descriptor.id];
      p && p.uniqueId === u.uniqueId && (delete e.draggables[d.descriptor.id], e.draggables[u.descriptor.id] = u);
    },
    unregister: (u) => {
      const d = u.descriptor.id, p = o(d);
      p && u.uniqueId === p.uniqueId && (delete e.draggables[d], e.droppables[u.descriptor.droppableId] && r({
        type: "REMOVAL",
        value: u
      }));
    },
    getById: s,
    findById: o,
    exists: (u) => !!o(u),
    getAllByType: (u) => Object.values(e.draggables).filter((d) => d.descriptor.type === u)
  };
  function a(u) {
    return e.droppables[u] || null;
  }
  function l(u) {
    const d = a(u);
    return d || k(!1), d;
  }
  const c = {
    register: (u) => {
      e.droppables[u.descriptor.id] = u;
    },
    unregister: (u) => {
      const d = a(u.descriptor.id);
      d && u.uniqueId === d.uniqueId && delete e.droppables[u.descriptor.id];
    },
    getById: l,
    findById: a,
    exists: (u) => !!a(u),
    getAllByType: (u) => Object.values(e.droppables).filter((d) => d.descriptor.type === u)
  };
  function f() {
    e.draggables = {}, e.droppables = {}, t.length = 0;
  }
  return {
    draggable: i,
    droppable: c,
    subscribe: n,
    clean: f
  };
}
function Fx() {
  const e = K(Mx, []);
  return W(() => function() {
    v.version.startsWith("16") || v.version.startsWith("17") ? requestAnimationFrame(e.clean) : e.clean();
  }, [e]), e;
}
var na = v.createContext(null), $r = () => {
  const e = document.body;
  return e || k(!1), e;
};
const kx = {
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  border: "0",
  padding: "0",
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  "clip-path": "inset(100%)"
};
var Bx = kx;
const _x = (e) => `rfd-announcement-${e}`;
function jx(e) {
  const t = K(() => _x(e), [e]), n = V(null);
  return W(function() {
    const s = document.createElement("div");
    return n.current = s, s.id = t, s.setAttribute("aria-live", "assertive"), s.setAttribute("aria-atomic", "true"), Et(s.style, Bx), $r().appendChild(s), function() {
      setTimeout(function() {
        const l = $r();
        l.contains(s) && l.removeChild(s), s === n.current && (n.current = null);
      });
    };
  }, [t]), G((o) => {
    const s = n.current;
    if (s) {
      s.textContent = o;
      return;
    }
  }, []);
}
let Vx = 0;
const zd = {
  separator: "::"
};
function Gx(e, t = zd) {
  return K(() => `${e}${t.separator}${Vx++}`, [t.separator, e]);
}
function Wx(e, t = zd) {
  const n = v.useId();
  return K(() => `${e}${t.separator}${n}`, [t.separator, e, n]);
}
var ra = "useId" in v ? Wx : Gx;
function zx({
  contextId: e,
  uniqueId: t
}) {
  return `rfd-hidden-text-${e}-${t}`;
}
function Hx({
  contextId: e,
  text: t
}) {
  const n = ra("hidden-text", {
    separator: "-"
  }), r = K(() => zx({
    contextId: e,
    uniqueId: n
  }), [n, e]);
  return W(function() {
    const s = document.createElement("div");
    return s.id = r, s.textContent = t, s.style.display = "none", $r().appendChild(s), function() {
      const a = $r();
      a.contains(s) && a.removeChild(s);
    };
  }, [r, t]), r;
}
var Do = v.createContext(null);
function Hd(e) {
  const t = V(e);
  return W(() => {
    t.current = e;
  }), t;
}
function Ux() {
  let e = null;
  function t() {
    return !!e;
  }
  function n(i) {
    return i === e;
  }
  function r(i) {
    e && k(!1);
    const a = {
      abandon: i
    };
    return e = a, a;
  }
  function o() {
    e || k(!1), e = null;
  }
  function s() {
    e && (e.abandon(), o());
  }
  return {
    isClaimed: t,
    isActive: n,
    claim: r,
    release: o,
    tryAbandon: s
  };
}
function Bn(e) {
  return e.phase === "IDLE" || e.phase === "DROP_ANIMATING" ? !1 : e.isDragging;
}
const qx = 9, Kx = 13, oa = 27, Ud = 32, Yx = 33, Xx = 34, Jx = 35, Qx = 36, Zx = 37, eS = 38, tS = 39, nS = 40, rS = {
  [Kx]: !0,
  [qx]: !0
};
var qd = (e) => {
  rS[e.keyCode] && e.preventDefault();
};
const oS = (() => {
  const e = "visibilitychange";
  return typeof document > "u" ? e : [e, `ms${e}`, `webkit${e}`, `moz${e}`, `o${e}`].find((r) => `on${r}` in document) || e;
})();
var Io = oS;
const Kd = 0, Bl = 5;
function sS(e, t) {
  return Math.abs(t.x - e.x) >= Bl || Math.abs(t.y - e.y) >= Bl;
}
const _l = {
  type: "IDLE"
};
function iS({
  cancel: e,
  completed: t,
  getPhase: n,
  setPhase: r
}) {
  return [{
    eventName: "mousemove",
    fn: (o) => {
      const {
        button: s,
        clientX: i,
        clientY: a
      } = o;
      if (s !== Kd)
        return;
      const l = {
        x: i,
        y: a
      }, c = n();
      if (c.type === "DRAGGING") {
        o.preventDefault(), c.actions.move(l);
        return;
      }
      c.type !== "PENDING" && k(!1);
      const f = c.point;
      if (!sS(f, l))
        return;
      o.preventDefault();
      const u = c.actions.fluidLift(l);
      r({
        type: "DRAGGING",
        actions: u
      });
    }
  }, {
    eventName: "mouseup",
    fn: (o) => {
      const s = n();
      if (s.type !== "DRAGGING") {
        e();
        return;
      }
      o.preventDefault(), s.actions.drop({
        shouldBlockNextClick: !0
      }), t();
    }
  }, {
    eventName: "mousedown",
    fn: (o) => {
      n().type === "DRAGGING" && o.preventDefault(), e();
    }
  }, {
    eventName: "keydown",
    fn: (o) => {
      if (n().type === "PENDING") {
        e();
        return;
      }
      if (o.keyCode === oa) {
        o.preventDefault(), e();
        return;
      }
      qd(o);
    }
  }, {
    eventName: "resize",
    fn: e
  }, {
    eventName: "scroll",
    options: {
      passive: !0,
      capture: !1
    },
    fn: () => {
      n().type === "PENDING" && e();
    }
  }, {
    eventName: "webkitmouseforcedown",
    fn: (o) => {
      const s = n();
      if (s.type === "IDLE" && k(!1), s.actions.shouldRespectForcePress()) {
        e();
        return;
      }
      o.preventDefault();
    }
  }, {
    eventName: Io,
    fn: e
  }];
}
function aS(e) {
  const t = V(_l), n = V(Pt), r = K(() => ({
    eventName: "mousedown",
    fn: function(u) {
      if (u.defaultPrevented || u.button !== Kd || u.ctrlKey || u.metaKey || u.shiftKey || u.altKey)
        return;
      const d = e.findClosestDraggableId(u);
      if (!d)
        return;
      const p = e.tryGetLock(d, i, {
        sourceEvent: u
      });
      if (!p)
        return;
      u.preventDefault();
      const m = {
        x: u.clientX,
        y: u.clientY
      };
      n.current(), c(p, m);
    }
  }), [e]), o = K(() => ({
    eventName: "webkitmouseforcewillbegin",
    fn: (f) => {
      if (f.defaultPrevented)
        return;
      const u = e.findClosestDraggableId(f);
      if (!u)
        return;
      const d = e.findOptionsForDraggable(u);
      d && (d.shouldRespectForcePress || e.canGetLock(u) && f.preventDefault());
    }
  }), [e]), s = G(function() {
    const u = {
      passive: !1,
      capture: !0
    };
    n.current = Ge(window, [o, r], u);
  }, [o, r]), i = G(() => {
    t.current.type !== "IDLE" && (t.current = _l, n.current(), s());
  }, [s]), a = G(() => {
    const f = t.current;
    i(), f.type === "DRAGGING" && f.actions.cancel({
      shouldBlockNextClick: !0
    }), f.type === "PENDING" && f.actions.abort();
  }, [i]), l = G(function() {
    const u = {
      capture: !0,
      passive: !1
    }, d = iS({
      cancel: a,
      completed: i,
      getPhase: () => t.current,
      setPhase: (p) => {
        t.current = p;
      }
    });
    n.current = Ge(window, d, u);
  }, [a, i]), c = G(function(u, d) {
    t.current.type !== "IDLE" && k(!1), t.current = {
      type: "PENDING",
      point: d,
      actions: u
    }, l();
  }, [l]);
  ke(function() {
    return s(), function() {
      n.current();
    };
  }, [s]);
}
function lS() {
}
const cS = {
  [Xx]: !0,
  [Yx]: !0,
  [Qx]: !0,
  [Jx]: !0
};
function uS(e, t) {
  function n() {
    t(), e.cancel();
  }
  function r() {
    t(), e.drop();
  }
  return [{
    eventName: "keydown",
    fn: (o) => {
      if (o.keyCode === oa) {
        o.preventDefault(), n();
        return;
      }
      if (o.keyCode === Ud) {
        o.preventDefault(), r();
        return;
      }
      if (o.keyCode === nS) {
        o.preventDefault(), e.moveDown();
        return;
      }
      if (o.keyCode === eS) {
        o.preventDefault(), e.moveUp();
        return;
      }
      if (o.keyCode === tS) {
        o.preventDefault(), e.moveRight();
        return;
      }
      if (o.keyCode === Zx) {
        o.preventDefault(), e.moveLeft();
        return;
      }
      if (cS[o.keyCode]) {
        o.preventDefault();
        return;
      }
      qd(o);
    }
  }, {
    eventName: "mousedown",
    fn: n
  }, {
    eventName: "mouseup",
    fn: n
  }, {
    eventName: "click",
    fn: n
  }, {
    eventName: "touchstart",
    fn: n
  }, {
    eventName: "resize",
    fn: n
  }, {
    eventName: "wheel",
    fn: n,
    options: {
      passive: !0
    }
  }, {
    eventName: Io,
    fn: n
  }];
}
function dS(e) {
  const t = V(lS), n = K(() => ({
    eventName: "keydown",
    fn: function(s) {
      if (s.defaultPrevented || s.keyCode !== Ud)
        return;
      const i = e.findClosestDraggableId(s);
      if (!i)
        return;
      const a = e.tryGetLock(i, f, {
        sourceEvent: s
      });
      if (!a)
        return;
      s.preventDefault();
      let l = !0;
      const c = a.snapLift();
      t.current();
      function f() {
        l || k(!1), l = !1, t.current(), r();
      }
      t.current = Ge(window, uS(c, f), {
        capture: !0,
        passive: !1
      });
    }
  }), [e]), r = G(function() {
    const s = {
      passive: !1,
      capture: !0
    };
    t.current = Ge(window, [n], s);
  }, [n]);
  ke(function() {
    return r(), function() {
      t.current();
    };
  }, [r]);
}
const ts = {
  type: "IDLE"
}, fS = 120, pS = 0.15;
function mS({
  cancel: e,
  getPhase: t
}) {
  return [{
    eventName: "orientationchange",
    fn: e
  }, {
    eventName: "resize",
    fn: e
  }, {
    eventName: "contextmenu",
    fn: (n) => {
      n.preventDefault();
    }
  }, {
    eventName: "keydown",
    fn: (n) => {
      if (t().type !== "DRAGGING") {
        e();
        return;
      }
      n.keyCode === oa && n.preventDefault(), e();
    }
  }, {
    eventName: Io,
    fn: e
  }];
}
function gS({
  cancel: e,
  completed: t,
  getPhase: n
}) {
  return [{
    eventName: "touchmove",
    options: {
      capture: !1
    },
    fn: (r) => {
      const o = n();
      if (o.type !== "DRAGGING") {
        e();
        return;
      }
      o.hasMoved = !0;
      const {
        clientX: s,
        clientY: i
      } = r.touches[0], a = {
        x: s,
        y: i
      };
      r.preventDefault(), o.actions.move(a);
    }
  }, {
    eventName: "touchend",
    fn: (r) => {
      const o = n();
      if (o.type !== "DRAGGING") {
        e();
        return;
      }
      r.preventDefault(), o.actions.drop({
        shouldBlockNextClick: !0
      }), t();
    }
  }, {
    eventName: "touchcancel",
    fn: (r) => {
      if (n().type !== "DRAGGING") {
        e();
        return;
      }
      r.preventDefault(), e();
    }
  }, {
    eventName: "touchforcechange",
    fn: (r) => {
      const o = n();
      o.type === "IDLE" && k(!1);
      const s = r.touches[0];
      if (!s || !(s.force >= pS))
        return;
      const a = o.actions.shouldRespectForcePress();
      if (o.type === "PENDING") {
        a && e();
        return;
      }
      if (a) {
        if (o.hasMoved) {
          r.preventDefault();
          return;
        }
        e();
        return;
      }
      r.preventDefault();
    }
  }, {
    eventName: Io,
    fn: e
  }];
}
function hS(e) {
  const t = V(ts), n = V(Pt), r = G(function() {
    return t.current;
  }, []), o = G(function(p) {
    t.current = p;
  }, []), s = K(() => ({
    eventName: "touchstart",
    fn: function(p) {
      if (p.defaultPrevented)
        return;
      const m = e.findClosestDraggableId(p);
      if (!m)
        return;
      const g = e.tryGetLock(m, a, {
        sourceEvent: p
      });
      if (!g)
        return;
      const h = p.touches[0], {
        clientX: w,
        clientY: x
      } = h, b = {
        x: w,
        y: x
      };
      n.current(), u(g, b);
    }
  }), [e]), i = G(function() {
    const p = {
      capture: !0,
      passive: !1
    };
    n.current = Ge(window, [s], p);
  }, [s]), a = G(() => {
    const d = t.current;
    d.type !== "IDLE" && (d.type === "PENDING" && clearTimeout(d.longPressTimerId), o(ts), n.current(), i());
  }, [i, o]), l = G(() => {
    const d = t.current;
    a(), d.type === "DRAGGING" && d.actions.cancel({
      shouldBlockNextClick: !0
    }), d.type === "PENDING" && d.actions.abort();
  }, [a]), c = G(function() {
    const p = {
      capture: !0,
      passive: !1
    }, m = {
      cancel: l,
      completed: a,
      getPhase: r
    }, g = Ge(window, gS(m), p), h = Ge(window, mS(m), p);
    n.current = function() {
      g(), h();
    };
  }, [l, r, a]), f = G(function() {
    const p = r();
    p.type !== "PENDING" && k(!1);
    const m = p.actions.fluidLift(p.point);
    o({
      type: "DRAGGING",
      actions: m,
      hasMoved: !1
    });
  }, [r, o]), u = G(function(p, m) {
    r().type !== "IDLE" && k(!1);
    const g = setTimeout(f, fS);
    o({
      type: "PENDING",
      point: m,
      actions: p,
      longPressTimerId: g
    }), c();
  }, [c, r, o, f]);
  ke(function() {
    return i(), function() {
      n.current();
      const m = r();
      m.type === "PENDING" && (clearTimeout(m.longPressTimerId), o(ts));
    };
  }, [r, i, o]), ke(function() {
    return Ge(window, [{
      eventName: "touchmove",
      fn: () => {
      },
      options: {
        capture: !1,
        passive: !1
      }
    }]);
  }, []);
}
const bS = ["input", "button", "textarea", "select", "option", "optgroup", "video", "audio"];
function Yd(e, t) {
  if (t == null)
    return !1;
  if (bS.includes(t.tagName.toLowerCase()))
    return !0;
  const r = t.getAttribute("contenteditable");
  return r === "true" || r === "" ? !0 : t === e ? !1 : Yd(e, t.parentElement);
}
function yS(e, t) {
  const n = t.target;
  return Po(n) ? Yd(e, n) : !1;
}
var vS = (e) => Qe(e.getBoundingClientRect()).center;
function wS(e) {
  return e instanceof Wd(e).Element;
}
const xS = (() => {
  const e = "matches";
  return typeof document > "u" ? e : [e, "msMatchesSelector", "webkitMatchesSelector"].find((r) => r in Element.prototype) || e;
})();
function Xd(e, t) {
  return e == null ? null : e[xS](t) ? e : Xd(e.parentElement, t);
}
function SS(e, t) {
  return e.closest ? e.closest(t) : Xd(e, t);
}
function CS(e) {
  return `[${cn.contextId}="${e}"]`;
}
function ES(e, t) {
  const n = t.target;
  if (!wS(n))
    return null;
  const r = CS(e), o = SS(n, r);
  return !o || !Po(o) ? null : o;
}
function PS(e, t) {
  const n = ES(e, t);
  return n ? n.getAttribute(cn.draggableId) : null;
}
function DS(e, t) {
  const n = `[${xs.contextId}="${e}"]`, o = Gd(document, n).find((s) => s.getAttribute(xs.id) === t);
  return !o || !Po(o) ? null : o;
}
function IS(e) {
  e.preventDefault();
}
function rr({
  expected: e,
  phase: t,
  isLockActive: n,
  shouldWarn: r
}) {
  return !(!n() || e !== t);
}
function Jd({
  lockAPI: e,
  store: t,
  registry: n,
  draggableId: r
}) {
  if (e.isClaimed())
    return !1;
  const o = n.draggable.findById(r);
  return !(!o || !o.options.isEnabled || !Bd(t.getState(), r));
}
function RS({
  lockAPI: e,
  contextId: t,
  store: n,
  registry: r,
  draggableId: o,
  forceSensorStop: s,
  sourceEvent: i
}) {
  if (!Jd({
    lockAPI: e,
    store: n,
    registry: r,
    draggableId: o
  }))
    return null;
  const l = r.draggable.getById(o), c = DS(t, l.descriptor.id);
  if (!c || i && !l.options.canDragInteractiveElements && yS(c, i))
    return null;
  const f = e.claim(s || Pt);
  let u = "PRE_DRAG";
  function d() {
    return l.options.shouldRespectForcePress;
  }
  function p() {
    return e.isActive(f);
  }
  function m(S, C) {
    rr({
      expected: S,
      phase: u,
      isLockActive: p,
      shouldWarn: !0
    }) && n.dispatch(C());
  }
  const g = m.bind(null, "DRAGGING");
  function h(S) {
    function C() {
      e.release(), u = "COMPLETED";
    }
    u !== "PRE_DRAG" && (C(), k(!1)), n.dispatch(fw(S.liftActionArgs)), u = "DRAGGING";
    function E(P, L = {
      shouldBlockNextClick: !1
    }) {
      if (S.cleanup(), L.shouldBlockNextClick) {
        const T = Ge(window, [{
          eventName: "click",
          fn: IS,
          options: {
            once: !0,
            passive: !1,
            capture: !0
          }
        }]);
        setTimeout(T);
      }
      C(), n.dispatch(Od({
        reason: P
      }));
    }
    return {
      isActive: () => rr({
        expected: "DRAGGING",
        phase: u,
        isLockActive: p,
        shouldWarn: !1
      }),
      shouldRespectForcePress: d,
      drop: (P) => E("DROP", P),
      cancel: (P) => E("CANCEL", P),
      ...S.actions
    };
  }
  function w(S) {
    const C = $n((P) => {
      g(() => Ad({
        client: P
      }));
    });
    return {
      ...h({
        liftActionArgs: {
          id: o,
          clientSelection: S,
          movementMode: "FLUID"
        },
        cleanup: () => C.cancel(),
        actions: {
          move: C
        }
      }),
      move: C
    };
  }
  function x() {
    const S = {
      moveUp: () => g(xw),
      moveRight: () => g(Cw),
      moveDown: () => g(Sw),
      moveLeft: () => g(Ew)
    };
    return h({
      liftActionArgs: {
        id: o,
        clientSelection: vS(c),
        movementMode: "SNAP"
      },
      cleanup: Pt,
      actions: S
    });
  }
  function b() {
    rr({
      expected: "PRE_DRAG",
      phase: u,
      isLockActive: p,
      shouldWarn: !0
    }) && e.release();
  }
  return {
    isActive: () => rr({
      expected: "PRE_DRAG",
      phase: u,
      isLockActive: p,
      shouldWarn: !1
    }),
    shouldRespectForcePress: d,
    fluidLift: w,
    snapLift: x,
    abort: b
  };
}
const AS = [aS, dS, hS];
function OS({
  contextId: e,
  store: t,
  registry: n,
  customSensors: r,
  enableDefaultSensors: o
}) {
  const s = [...o ? AS : [], ...r || []], i = z(() => Ux())[0], a = G(function(h, w) {
    Bn(h) && !Bn(w) && i.tryAbandon();
  }, [i]);
  ke(function() {
    let h = t.getState();
    return t.subscribe(() => {
      const x = t.getState();
      a(h, x), h = x;
    });
  }, [i, t, a]), ke(() => i.tryAbandon, [i.tryAbandon]);
  const l = G((g) => Jd({
    lockAPI: i,
    registry: n,
    store: t,
    draggableId: g
  }), [i, n, t]), c = G((g, h, w) => RS({
    lockAPI: i,
    registry: n,
    contextId: e,
    store: t,
    draggableId: g,
    forceSensorStop: h || null,
    sourceEvent: w && w.sourceEvent ? w.sourceEvent : null
  }), [e, i, n, t]), f = G((g) => PS(e, g), [e]), u = G((g) => {
    const h = n.draggable.findById(g);
    return h ? h.options : null;
  }, [n.draggable]), d = G(function() {
    i.isClaimed() && (i.tryAbandon(), t.getState().phase !== "IDLE" && t.dispatch(Yi()));
  }, [i, t]), p = G(() => i.isClaimed(), [i]), m = K(() => ({
    canGetLock: l,
    tryGetLock: c,
    findClosestDraggableId: f,
    findOptionsForDraggable: u,
    tryReleaseLock: d,
    isLockClaimed: p
  }), [l, c, f, u, d, p]);
  for (let g = 0; g < s.length; g++)
    s[g](m);
}
const NS = (e) => ({
  onBeforeCapture: (t) => {
    const n = () => {
      e.onBeforeCapture && e.onBeforeCapture(t);
    };
    v.version.startsWith("16") || v.version.startsWith("17") ? n() : Cs(n);
  },
  onBeforeDragStart: e.onBeforeDragStart,
  onDragStart: e.onDragStart,
  onDragEnd: e.onDragEnd,
  onDragUpdate: e.onDragUpdate
}), $S = (e) => ({
  ...kn,
  ...e.autoScrollerOptions,
  durationDampening: {
    ...kn.durationDampening,
    ...e.autoScrollerOptions
  }
});
function Pn(e) {
  return e.current || k(!1), e.current;
}
function TS(e) {
  const {
    contextId: t,
    setCallbacks: n,
    sensors: r,
    nonce: o,
    dragHandleUsageInstructions: s
  } = e, i = V(null), a = Hd(e), l = G(() => NS(a.current), [a]), c = G(() => $S(a.current), [a]), f = jx(t), u = Hx({
    contextId: t,
    text: s
  }), d = $x(t, o), p = G((T) => {
    Pn(i).dispatch(T);
  }, []), m = K(() => cl({
    publishWhileDragging: mw,
    updateDroppableScroll: hw,
    updateDroppableIsEnabled: bw,
    updateDroppableIsCombineEnabled: yw,
    collectionStarting: gw
  }, p), [p]), g = Fx(), h = K(() => cx(g, m), [g, m]), w = K(() => Dx({
    scrollWindow: ux,
    scrollDroppable: h.scrollDroppable,
    getAutoScrollerOptions: c,
    ...cl({
      move: Ad
    }, p)
  }), [h.scrollDroppable, p, c]), x = Lx(t), b = K(() => sx({
    announce: f,
    autoScroller: w,
    dimensionMarshal: h,
    focusMarshal: x,
    getResponders: l,
    styleMarshal: d
  }), [f, w, h, x, l, d]);
  i.current = b;
  const y = G(() => {
    const T = Pn(i);
    T.getState().phase !== "IDLE" && T.dispatch(Yi());
  }, []), S = G(() => {
    const T = Pn(i).getState();
    return T.phase === "DROP_ANIMATING" ? !0 : T.phase === "IDLE" ? !1 : T.isDragging;
  }, []), C = K(() => ({
    isDragging: S,
    tryAbort: y
  }), [S, y]);
  n(C);
  const E = G((T) => Bd(Pn(i).getState(), T), []), P = G(() => _t(Pn(i).getState()), []), L = K(() => ({
    marshal: h,
    focus: x,
    contextId: t,
    canLift: E,
    isMovementAllowed: P,
    dragHandleUsageInstructionsId: u,
    registry: g
  }), [t, h, u, x, E, P, g]);
  return OS({
    contextId: t,
    store: b,
    registry: g,
    customSensors: r || null,
    enableDefaultSensors: e.enableDefaultSensors !== !1
  }), W(() => y, [y]), v.createElement(Do.Provider, {
    value: L
  }, v.createElement(Gv, {
    context: na,
    store: b
  }, e.children));
}
let LS = 0;
function MS() {
  return K(() => `${LS++}`, []);
}
function FS() {
  return v.useId();
}
var kS = "useId" in v ? FS : MS;
function BS(e) {
  const t = kS(), n = e.dragHandleUsageInstructions || ur.dragHandleUsageInstructions;
  return v.createElement(e0, null, (r) => v.createElement(TS, {
    nonce: e.nonce,
    contextId: t,
    setCallbacks: r,
    dragHandleUsageInstructions: n,
    enableDefaultSensors: e.enableDefaultSensors,
    sensors: e.sensors,
    onBeforeCapture: e.onBeforeCapture,
    onBeforeDragStart: e.onBeforeDragStart,
    onDragStart: e.onDragStart,
    onDragUpdate: e.onDragUpdate,
    onDragEnd: e.onDragEnd,
    autoScrollerOptions: e.autoScrollerOptions
  }, e.children));
}
const jl = {
  dragging: 5e3,
  dropAnimating: 4500
}, _S = (e, t) => t ? In.drop(t.duration) : e ? In.snap : In.fluid, jS = (e, t) => {
  if (e)
    return t ? Fn.opacity.drop : Fn.opacity.combining;
}, VS = (e) => e.forceShouldAnimate != null ? e.forceShouldAnimate : e.mode === "SNAP";
function GS(e) {
  const n = e.dimension.client, {
    offset: r,
    combineWith: o,
    dropping: s
  } = e, i = !!o, a = VS(e), l = !!s, c = l ? vs.drop(r, i) : vs.moveTo(r);
  return {
    position: "fixed",
    top: n.marginBox.top,
    left: n.marginBox.left,
    boxSizing: "border-box",
    width: n.borderBox.width,
    height: n.borderBox.height,
    transition: _S(a, s),
    transform: c,
    opacity: jS(i, l),
    zIndex: l ? jl.dropAnimating : jl.dragging,
    pointerEvents: "none"
  };
}
function WS(e) {
  return {
    transform: vs.moveTo(e.offset),
    transition: e.shouldAnimateDisplacement ? void 0 : "none"
  };
}
function zS(e) {
  return e.type === "DRAGGING" ? GS(e) : WS(e);
}
function HS(e, t, n = de) {
  const r = window.getComputedStyle(t), o = t.getBoundingClientRect(), s = od(o, r), i = Rr(s, n), a = {
    client: s,
    tagName: t.tagName.toLowerCase(),
    display: r.display
  }, l = {
    x: s.marginBox.width,
    y: s.marginBox.height
  };
  return {
    descriptor: e,
    placeholder: a,
    displaceBy: l,
    client: s,
    page: i
  };
}
function US(e) {
  const t = ra("draggable"), {
    descriptor: n,
    registry: r,
    getDraggableRef: o,
    canDragInteractiveElements: s,
    shouldRespectForcePress: i,
    isEnabled: a
  } = e, l = K(() => ({
    canDragInteractiveElements: s,
    shouldRespectForcePress: i,
    isEnabled: a
  }), [s, a, i]), c = G((p) => {
    const m = o();
    return m || k(!1), HS(n, m, p);
  }, [n, o]), f = K(() => ({
    uniqueId: t,
    descriptor: n,
    options: l,
    getDimension: c
  }), [n, c, l, t]), u = V(f), d = V(!0);
  ke(() => (r.draggable.register(u.current), () => r.draggable.unregister(u.current)), [r.draggable]), ke(() => {
    if (d.current) {
      d.current = !1;
      return;
    }
    const p = u.current;
    u.current = f, r.draggable.update(f, p);
  }, [f, r.draggable]);
}
var sa = v.createContext(null);
function Tr(e) {
  const t = ct(e);
  return t || k(!1), t;
}
function qS(e) {
  e.preventDefault();
}
const KS = (e) => {
  const t = V(null), n = G((C = null) => {
    t.current = C;
  }, []), r = G(() => t.current, []), {
    contextId: o,
    dragHandleUsageInstructionsId: s,
    registry: i
  } = Tr(Do), {
    type: a,
    droppableId: l
  } = Tr(sa), c = K(() => ({
    id: e.draggableId,
    index: e.index,
    type: a,
    droppableId: l
  }), [e.draggableId, e.index, a, l]), {
    children: f,
    draggableId: u,
    isEnabled: d,
    shouldRespectForcePress: p,
    canDragInteractiveElements: m,
    isClone: g,
    mapped: h,
    dropAnimationFinished: w
  } = e;
  if (!g) {
    const C = K(() => ({
      descriptor: c,
      registry: i,
      getDraggableRef: r,
      canDragInteractiveElements: m,
      shouldRespectForcePress: p,
      isEnabled: d
    }), [c, i, r, m, p, d]);
    US(C);
  }
  const x = K(() => d ? {
    tabIndex: 0,
    role: "button",
    "aria-describedby": s,
    "data-rfd-drag-handle-draggable-id": u,
    "data-rfd-drag-handle-context-id": o,
    draggable: !1,
    onDragStart: qS
  } : null, [o, s, u, d]), b = G((C) => {
    h.type === "DRAGGING" && h.dropping && C.propertyName === "transform" && (v.version.startsWith("16") || v.version.startsWith("17") ? w() : Cs(w));
  }, [w, h]), y = K(() => {
    const C = zS(h), E = h.type === "DRAGGING" && h.dropping ? b : void 0;
    return {
      innerRef: n,
      draggableProps: {
        "data-rfd-draggable-context-id": o,
        "data-rfd-draggable-id": u,
        style: C,
        onTransitionEnd: E
      },
      dragHandleProps: x
    };
  }, [o, x, u, h, b, n]), S = K(() => ({
    draggableId: c.id,
    type: c.type,
    source: {
      index: c.index,
      droppableId: c.droppableId
    }
  }), [c.droppableId, c.id, c.index, c.type]);
  return v.createElement(v.Fragment, null, f(y, h.snapshot, S));
};
var YS = KS, Qd = (e, t) => e === t, Zd = (e) => {
  const {
    combine: t,
    destination: n
  } = e;
  return n ? n.droppableId : t ? t.droppableId : null;
};
const XS = (e) => e.combine ? e.combine.draggableId : null, JS = (e) => e.at && e.at.type === "COMBINE" ? e.at.combine.draggableId : null;
function QS() {
  const e = ce((o, s) => ({
    x: o,
    y: s
  })), t = ce((o, s, i = null, a = null, l = null) => ({
    isDragging: !0,
    isClone: s,
    isDropAnimating: !!l,
    dropAnimation: l,
    mode: o,
    draggingOver: i,
    combineWith: a,
    combineTargetFor: null
  })), n = ce((o, s, i, a, l = null, c = null, f = null) => ({
    mapped: {
      type: "DRAGGING",
      dropping: null,
      draggingOver: l,
      combineWith: c,
      mode: s,
      offset: o,
      dimension: i,
      forceShouldAnimate: f,
      snapshot: t(s, a, l, c, null)
    }
  }));
  return (o, s) => {
    if (Bn(o)) {
      if (o.critical.draggable.id !== s.draggableId)
        return null;
      const i = o.current.client.offset, a = o.dimensions.draggables[s.draggableId], l = Fe(o.impact), c = JS(o.impact), f = o.forceShouldAnimate;
      return n(e(i.x, i.y), o.movementMode, a, s.isClone, l, c, f);
    }
    if (o.phase === "DROP_ANIMATING") {
      const i = o.completed;
      if (i.result.draggableId !== s.draggableId)
        return null;
      const a = s.isClone, l = o.dimensions.draggables[s.draggableId], c = i.result, f = c.mode, u = Zd(c), d = XS(c), m = {
        duration: o.dropDuration,
        curve: Ji.drop,
        moveTo: o.newHomeClientOffset,
        opacity: d ? Fn.opacity.drop : null,
        scale: d ? Fn.scale.drop : null
      };
      return {
        mapped: {
          type: "DRAGGING",
          offset: o.newHomeClientOffset,
          dimension: l,
          dropping: m,
          draggingOver: u,
          combineWith: d,
          mode: f,
          forceShouldAnimate: null,
          snapshot: t(f, a, u, d, m)
        }
      };
    }
    return null;
  };
}
function ef(e = null) {
  return {
    isDragging: !1,
    isDropAnimating: !1,
    isClone: !1,
    dropAnimation: null,
    mode: null,
    draggingOver: null,
    combineTargetFor: e,
    combineWith: null
  };
}
const ZS = {
  mapped: {
    type: "SECONDARY",
    offset: de,
    combineTargetFor: null,
    shouldAnimateDisplacement: !0,
    snapshot: ef(null)
  }
};
function e1() {
  const e = ce((i, a) => ({
    x: i,
    y: a
  })), t = ce(ef), n = ce((i, a = null, l) => ({
    mapped: {
      type: "SECONDARY",
      offset: i,
      combineTargetFor: a,
      shouldAnimateDisplacement: l,
      snapshot: t(a)
    }
  })), r = (i) => i ? n(de, i, !0) : null, o = (i, a, l, c) => {
    const f = l.displaced.visible[i], u = !!(c.inVirtualList && c.effected[i]), d = So(l), p = d && d.draggableId === i ? a : null;
    if (!f) {
      if (!u)
        return r(p);
      if (l.displaced.invisible[i])
        return null;
      const h = gn(c.displacedBy.point), w = e(h.x, h.y);
      return n(w, p, !0);
    }
    if (u)
      return r(p);
    const m = l.displacedBy.point, g = e(m.x, m.y);
    return n(g, p, f.shouldAnimate);
  };
  return (i, a) => {
    if (Bn(i))
      return i.critical.draggable.id === a.draggableId ? null : o(a.draggableId, i.critical.draggable.id, i.impact, i.afterCritical);
    if (i.phase === "DROP_ANIMATING") {
      const l = i.completed;
      return l.result.draggableId === a.draggableId ? null : o(a.draggableId, l.result.draggableId, l.impact, l.afterCritical);
    }
    return null;
  };
}
const t1 = () => {
  const e = QS(), t = e1();
  return (r, o) => e(r, o) || t(r, o) || ZS;
}, n1 = {
  dropAnimationFinished: Nd
}, r1 = nd(t1, n1, null, {
  context: na,
  areStatePropsEqual: Qd
})(YS);
var o1 = r1;
function tf(e) {
  return Tr(sa).isUsingCloneFor === e.draggableId && !e.isClone ? null : v.createElement(o1, e);
}
function s1(e) {
  const t = typeof e.isDragDisabled == "boolean" ? !e.isDragDisabled : !0, n = !!e.disableInteractiveElementBlocking, r = !!e.shouldRespectForcePress;
  return v.createElement(tf, Et({}, e, {
    isClone: !1,
    isEnabled: t,
    canDragInteractiveElements: n,
    shouldRespectForcePress: r
  }));
}
const nf = (e) => (t) => e === t, i1 = nf("scroll"), a1 = nf("auto"), Vl = (e, t) => t(e.overflowX) || t(e.overflowY), l1 = (e) => {
  const t = window.getComputedStyle(e), n = {
    overflowX: t.overflowX,
    overflowY: t.overflowY
  };
  return Vl(n, i1) || Vl(n, a1);
}, c1 = () => !1, rf = (e) => e == null ? null : e === document.body ? c1() ? e : null : e === document.documentElement ? null : l1(e) ? e : rf(e.parentElement);
var u1 = rf, Ss = (e) => ({
  x: e.scrollLeft,
  y: e.scrollTop
});
const of = (e) => e ? window.getComputedStyle(e).position === "fixed" ? !0 : of(e.parentElement) : !1;
var d1 = (e) => {
  const t = u1(e), n = of(e);
  return {
    closestScrollable: t,
    isFixedOnPage: n
  };
}, f1 = ({
  descriptor: e,
  isEnabled: t,
  isCombineEnabled: n,
  isFixedOnPage: r,
  direction: o,
  client: s,
  page: i,
  closest: a
}) => {
  const l = (() => {
    if (!a)
      return null;
    const {
      scrollSize: d,
      client: p
    } = a, m = Md({
      scrollHeight: d.scrollHeight,
      scrollWidth: d.scrollWidth,
      height: p.paddingBox.height,
      width: p.paddingBox.width
    });
    return {
      pageMarginBox: a.page.marginBox,
      frameClient: p,
      scrollSize: d,
      shouldClipSubject: a.shouldClipSubject,
      scroll: {
        initial: a.scroll,
        current: a.scroll,
        max: m,
        diff: {
          value: de,
          displacement: de
        }
      }
    };
  })(), c = o === "vertical" ? zi : md, f = an({
    page: i,
    withPlaceholder: null,
    axis: c,
    frame: l
  });
  return {
    descriptor: e,
    isCombineEnabled: n,
    isFixedOnPage: r,
    axis: c,
    isEnabled: t,
    client: s,
    page: i,
    frame: l,
    subject: f
  };
};
const p1 = (e, t) => {
  const n = sd(e);
  if (!t || e !== t)
    return n;
  const r = n.paddingBox.top - t.scrollTop, o = n.paddingBox.left - t.scrollLeft, s = r + t.scrollHeight, i = o + t.scrollWidth, l = ji({
    top: r,
    right: i,
    bottom: s,
    left: o
  }, n.border);
  return Vi({
    borderBox: l,
    margin: n.margin,
    border: n.border,
    padding: n.padding
  });
};
var m1 = ({
  ref: e,
  descriptor: t,
  env: n,
  windowScroll: r,
  direction: o,
  isDropDisabled: s,
  isCombineEnabled: i,
  shouldClipSubject: a
}) => {
  const l = n.closestScrollable, c = p1(e, l), f = Rr(c, r), u = (() => {
    if (!l)
      return null;
    const p = sd(l), m = {
      scrollHeight: l.scrollHeight,
      scrollWidth: l.scrollWidth
    };
    return {
      client: p,
      page: Rr(p, r),
      scroll: Ss(l),
      scrollSize: m,
      shouldClipSubject: a
    };
  })();
  return f1({
    descriptor: t,
    isEnabled: !s,
    isCombineEnabled: i,
    isFixedOnPage: n.isFixedOnPage,
    direction: o,
    client: c,
    page: f,
    closest: u
  });
};
const g1 = {
  passive: !1
}, h1 = {
  passive: !0
};
var Gl = (e) => e.shouldPublishImmediately ? g1 : h1;
const or = (e) => e && e.env.closestScrollable || null;
function b1(e) {
  const t = V(null), n = Tr(Do), r = ra("droppable"), {
    registry: o,
    marshal: s
  } = n, i = Hd(e), a = K(() => ({
    id: e.droppableId,
    type: e.type,
    mode: e.mode
  }), [e.droppableId, e.mode, e.type]), l = V(a), c = K(() => ce((y, S) => {
    t.current || k(!1);
    const C = {
      x: y,
      y: S
    };
    s.updateDroppableScroll(a.id, C);
  }), [a.id, s]), f = G(() => {
    const y = t.current;
    return !y || !y.env.closestScrollable ? de : Ss(y.env.closestScrollable);
  }, []), u = G(() => {
    const y = f();
    c(y.x, y.y);
  }, [f, c]), d = K(() => $n(u), [u]), p = G(() => {
    const y = t.current, S = or(y);
    if (y && S || k(!1), y.scrollOptions.shouldPublishImmediately) {
      u();
      return;
    }
    d();
  }, [d, u]), m = G((y, S) => {
    t.current && k(!1);
    const C = i.current, E = C.getDroppableRef();
    E || k(!1);
    const P = d1(E), L = {
      ref: E,
      descriptor: a,
      env: P,
      scrollOptions: S
    };
    t.current = L;
    const T = m1({
      ref: E,
      descriptor: a,
      env: P,
      windowScroll: y,
      direction: C.direction,
      isDropDisabled: C.isDropDisabled,
      isCombineEnabled: C.isCombineEnabled,
      shouldClipSubject: !C.ignoreContainerClipping
    }), N = P.closestScrollable;
    return N && (N.setAttribute(Fl.contextId, n.contextId), N.addEventListener("scroll", p, Gl(L.scrollOptions))), T;
  }, [n.contextId, a, p, i]), g = G(() => {
    const y = t.current, S = or(y);
    return y && S || k(!1), Ss(S);
  }, []), h = G(() => {
    const y = t.current;
    y || k(!1);
    const S = or(y);
    t.current = null, S && (d.cancel(), S.removeAttribute(Fl.contextId), S.removeEventListener("scroll", p, Gl(y.scrollOptions)));
  }, [p, d]), w = G((y) => {
    const S = t.current;
    S || k(!1);
    const C = or(S);
    C || k(!1), C.scrollTop += y.y, C.scrollLeft += y.x;
  }, []), x = K(() => ({
    getDimensionAndWatchScroll: m,
    getScrollWhileDragging: g,
    dragStopped: h,
    scroll: w
  }), [h, m, g, w]), b = K(() => ({
    uniqueId: r,
    descriptor: a,
    callbacks: x
  }), [x, a, r]);
  ke(() => (l.current = b.descriptor, o.droppable.register(b), () => {
    t.current && h(), o.droppable.unregister(b);
  }), [x, a, h, b, s, o.droppable]), ke(() => {
    t.current && s.updateDroppableIsEnabled(l.current.id, !e.isDropDisabled);
  }, [e.isDropDisabled, s]), ke(() => {
    t.current && s.updateDroppableIsCombineEnabled(l.current.id, e.isCombineEnabled);
  }, [e.isCombineEnabled, s]);
}
function ns() {
}
const Wl = {
  width: 0,
  height: 0,
  margin: a0
}, y1 = ({
  isAnimatingOpenOnMount: e,
  placeholder: t,
  animate: n
}) => e || n === "close" ? Wl : {
  height: t.client.borderBox.height,
  width: t.client.borderBox.width,
  margin: t.client.margin
}, v1 = ({
  isAnimatingOpenOnMount: e,
  placeholder: t,
  animate: n
}) => {
  const r = y1({
    isAnimatingOpenOnMount: e,
    placeholder: t,
    animate: n
  });
  return {
    display: t.display,
    boxSizing: "border-box",
    width: r.width,
    height: r.height,
    marginTop: r.margin.top,
    marginRight: r.margin.right,
    marginBottom: r.margin.bottom,
    marginLeft: r.margin.left,
    flexShrink: "0",
    flexGrow: "0",
    pointerEvents: "none",
    transition: n !== "none" ? In.placeholder : null
  };
}, w1 = (e) => {
  const t = V(null), n = G(() => {
    t.current && (clearTimeout(t.current), t.current = null);
  }, []), {
    animate: r,
    onTransitionEnd: o,
    onClose: s,
    contextId: i
  } = e, [a, l] = z(e.animate === "open");
  W(() => a ? r !== "open" ? (n(), l(!1), ns) : t.current ? ns : (t.current = setTimeout(() => {
    t.current = null, l(!1);
  }), n) : ns, [r, a, n]);
  const c = G((u) => {
    u.propertyName === "height" && (o(), r === "close" && s());
  }, [r, s, o]), f = v1({
    isAnimatingOpenOnMount: a,
    animate: e.animate,
    placeholder: e.placeholder
  });
  return v.createElement(e.placeholder.tagName, {
    style: f,
    "data-rfd-placeholder-context-id": i,
    onTransitionEnd: c,
    ref: e.innerRef
  });
};
var x1 = v.memo(w1);
class S1 extends v.PureComponent {
  constructor(...t) {
    super(...t), this.state = {
      isVisible: !!this.props.on,
      data: this.props.on,
      animate: this.props.shouldAnimate && this.props.on ? "open" : "none"
    }, this.onClose = () => {
      this.state.animate === "close" && this.setState({
        isVisible: !1
      });
    };
  }
  static getDerivedStateFromProps(t, n) {
    return t.shouldAnimate ? t.on ? {
      isVisible: !0,
      data: t.on,
      animate: "open"
    } : n.isVisible ? {
      isVisible: !0,
      data: n.data,
      animate: "close"
    } : {
      isVisible: !1,
      animate: "close",
      data: null
    } : {
      isVisible: !!t.on,
      data: t.on,
      animate: "none"
    };
  }
  render() {
    if (!this.state.isVisible)
      return null;
    const t = {
      onClose: this.onClose,
      data: this.state.data,
      animate: this.state.animate
    };
    return this.props.children(t);
  }
}
const C1 = (e) => {
  const t = ct(Do);
  t || k(!1);
  const {
    contextId: n,
    isMovementAllowed: r
  } = t, o = V(null), s = V(null), {
    children: i,
    droppableId: a,
    type: l,
    mode: c,
    direction: f,
    ignoreContainerClipping: u,
    isDropDisabled: d,
    isCombineEnabled: p,
    snapshot: m,
    useClone: g,
    updateViewportMaxScroll: h,
    getContainerForClone: w
  } = e, x = G(() => o.current, []), b = G((N = null) => {
    o.current = N;
  }, []);
  G(() => s.current, []);
  const y = G((N = null) => {
    s.current = N;
  }, []), S = G(() => {
    r() && h({
      maxScroll: kd()
    });
  }, [r, h]);
  b1({
    droppableId: a,
    type: l,
    mode: c,
    direction: f,
    isDropDisabled: d,
    isCombineEnabled: p,
    ignoreContainerClipping: u,
    getDroppableRef: x
  });
  const C = K(() => v.createElement(S1, {
    on: e.placeholder,
    shouldAnimate: e.shouldAnimatePlaceholder
  }, ({
    onClose: N,
    data: M,
    animate: F
  }) => v.createElement(x1, {
    placeholder: M,
    onClose: N,
    innerRef: y,
    animate: F,
    contextId: n,
    onTransitionEnd: S
  })), [n, S, e.placeholder, e.shouldAnimatePlaceholder, y]), E = K(() => ({
    innerRef: b,
    placeholder: C,
    droppableProps: {
      "data-rfd-droppable-id": a,
      "data-rfd-droppable-context-id": n
    }
  }), [n, a, C, b]), P = g ? g.dragging.draggableId : null, L = K(() => ({
    droppableId: a,
    type: l,
    isUsingCloneFor: P
  }), [a, P, l]);
  function T() {
    if (!g)
      return null;
    const {
      dragging: N,
      render: M
    } = g, F = v.createElement(tf, {
      draggableId: N.draggableId,
      index: N.source.index,
      isClone: !0,
      isEnabled: !0,
      shouldRespectForcePress: !1,
      canDragInteractiveElements: !0
    }, (A, $) => M(A, $, N));
    return ql.createPortal(F, w());
  }
  return v.createElement(sa.Provider, {
    value: L
  }, i(E, m), T());
};
var E1 = C1;
function P1() {
  return document.body || k(!1), document.body;
}
const zl = {
  mode: "standard",
  type: "DEFAULT",
  direction: "vertical",
  isDropDisabled: !1,
  isCombineEnabled: !1,
  ignoreContainerClipping: !1,
  renderClone: null,
  getContainerForClone: P1
}, sf = (e) => {
  let t = {
    ...e
  }, n;
  for (n in zl)
    e[n] === void 0 && (t = {
      ...t,
      [n]: zl[n]
    });
  return t;
}, rs = (e, t) => e === t.droppable.type, Hl = (e, t) => t.draggables[e.draggable.id], D1 = () => {
  const e = {
    placeholder: null,
    shouldAnimatePlaceholder: !0,
    snapshot: {
      isDraggingOver: !1,
      draggingOverWith: null,
      draggingFromThisWith: null,
      isUsingPlaceholder: !1
    },
    useClone: null
  }, t = {
    ...e,
    shouldAnimatePlaceholder: !1
  }, n = ce((s) => ({
    draggableId: s.id,
    type: s.type,
    source: {
      index: s.index,
      droppableId: s.droppableId
    }
  })), r = ce((s, i, a, l, c, f) => {
    const u = c.descriptor.id;
    if (c.descriptor.droppableId === s) {
      const m = f ? {
        render: f,
        dragging: n(c.descriptor)
      } : null, g = {
        isDraggingOver: a,
        draggingOverWith: a ? u : null,
        draggingFromThisWith: u,
        isUsingPlaceholder: !0
      };
      return {
        placeholder: c.placeholder,
        shouldAnimatePlaceholder: !1,
        snapshot: g,
        useClone: m
      };
    }
    if (!i)
      return t;
    if (!l)
      return e;
    const p = {
      isDraggingOver: a,
      draggingOverWith: u,
      draggingFromThisWith: null,
      isUsingPlaceholder: !0
    };
    return {
      placeholder: c.placeholder,
      shouldAnimatePlaceholder: !0,
      snapshot: p,
      useClone: null
    };
  });
  return (s, i) => {
    const a = sf(i), l = a.droppableId, c = a.type, f = !a.isDropDisabled, u = a.renderClone;
    if (Bn(s)) {
      const d = s.critical;
      if (!rs(c, d))
        return t;
      const p = Hl(d, s.dimensions), m = Fe(s.impact) === l;
      return r(l, f, m, m, p, u);
    }
    if (s.phase === "DROP_ANIMATING") {
      const d = s.completed;
      if (!rs(c, d.critical))
        return t;
      const p = Hl(d.critical, s.dimensions);
      return r(l, f, Zd(d.result) === l, Fe(d.impact) === l, p, u);
    }
    if (s.phase === "IDLE" && s.completed && !s.shouldFlush) {
      const d = s.completed;
      if (!rs(c, d.critical))
        return t;
      const p = Fe(d.impact) === l, m = !!(d.impact.at && d.impact.at.type === "COMBINE"), g = d.critical.droppable.id === l;
      return p ? m ? e : t : g ? e : t;
    }
    return t;
  };
}, I1 = {
  updateViewportMaxScroll: ww
}, R1 = nd(D1, I1, (e, t, n) => ({
  ...sf(n),
  ...e,
  ...t
}), {
  context: na,
  areStatePropsEqual: Qd
})(E1);
var A1 = R1;
const O1 = "_item_1ca4j_1", N1 = "_itemDragging_1ca4j_23", $1 = "_symbol_1ca4j_31", T1 = "_dragHandle_1ca4j_43", sr = {
  item: O1,
  itemDragging: N1,
  symbol: $1,
  dragHandle: T1
};
function L1() {
  const { t: e, i18n: t } = un(), n = [
    { value: "en", label: "English" },
    { value: "nl", label: "Nederlands" }
  ], r = (o) => {
    o && t.changeLanguage(o);
  };
  return /* @__PURE__ */ _.jsx(
    On,
    {
      label: e("Language"),
      data: n,
      value: t.language,
      onChange: r,
      placeholder: e("Select language")
    }
  );
}
function M1({
  bsddDictionaries: e,
  bsddApiEnvironment: t,
  setBsddApiEnvironment: n,
  mainDictionary: r,
  setMainDictionary: o,
  filterDictionaries: s,
  setFilterDictionaries: i
}) {
  const { t: a } = un(), [l, c] = z([]), [f, u] = z([]), [d, p] = z();
  W(() => {
    u(e.map((b) => ({ value: b.uri, label: b.name })));
  }, [e, u]), W(() => {
    c(s.map((b) => ({ value: b.uri, label: b.name })));
  }, [s, c]), W(() => {
    r && p(r.uri);
  }, [r]);
  const m = (b) => {
    b && (console.log(b), n(b));
  }, g = (b) => {
    p(b);
    const y = e.find((S) => S.uri === b);
    y && o(y);
  }, h = (b) => {
    console.log(b), i(e.filter((y) => b.includes(y.uri)));
  }, w = (b) => {
    if (!b.destination)
      return;
    const y = Array.from(s), [S] = y.splice(b.source.index, 1);
    y.splice(b.destination.index, 0, S), i(y);
  }, x = s.map((b, y) => /* @__PURE__ */ _.jsx(s1, { index: y, draggableId: b.uri, children: (S, C) => /* @__PURE__ */ _.jsxs(
    "div",
    {
      className: nt(sr.item, { [sr.itemDragging]: C.isDragging }),
      ref: S.innerRef,
      ...S.draggableProps,
      children: [
        /* @__PURE__ */ _.jsx(
          "div",
          {
            // eslint-disable-next-line react/jsx-props-no-spreading
            ...S.dragHandleProps,
            className: sr.dragHandle,
            children: /* @__PURE__ */ _.jsx(Dy, { style: { width: D(18), height: D(18) }, stroke: 1.5 })
          }
        ),
        /* @__PURE__ */ _.jsx(Ct, { className: sr.uri, children: b.name })
      ]
    }
  ) }, b.uri));
  return /* @__PURE__ */ _.jsx(Je.Panel, { value: "settings", children: /* @__PURE__ */ _.jsxs(Pi, { gap: "xs", pt: "md", children: [
    /* @__PURE__ */ _.jsx(L1, {}),
    /* @__PURE__ */ _.jsx(
      On,
      {
        label: a("bSDD environment"),
        data: ["production", "test"],
        defaultValue: "test",
        value: t,
        placeholder: "Select an option",
        onChange: m
      }
    ),
    /* @__PURE__ */ _.jsx(
      On,
      {
        id: "mainDictionary",
        label: a("Main dictionary"),
        value: d,
        onChange: g,
        placeholder: "Select main dictionary",
        data: f,
        searchable: !0,
        clearable: !0
      }
    ),
    /* @__PURE__ */ _.jsx(
      Ci,
      {
        id: "filterDictionaries",
        label: a("Selection filter dictionaries"),
        value: l.map((b) => b.value),
        onChange: (b) => {
          h(b);
        },
        placeholder: "Select filter dictionaries",
        data: f,
        searchable: !0,
        clearable: !0,
        hidePickedOptions: !0
      }
    ),
    /* @__PURE__ */ _.jsx(zn, { htmlFor: "dnd-list", children: a("Sort filter dictionaries") }),
    /* @__PURE__ */ _.jsx(BS, { onDragEnd: w, children: /* @__PURE__ */ _.jsx(A1, { droppableId: "dnd-list", direction: "vertical", children: (b) => (
      // eslint-disable-next-line react/jsx-props-no-spreading
      /* @__PURE__ */ _.jsxs("div", { ...b.droppableProps, ref: b.innerRef, children: [
        x,
        b.placeholder
      ] })
    ) }) })
  ] }) });
}
function F1() {
  const [e, t] = z(), [n, r] = z("test"), [o, s] = z(), [i, a] = z([]), [l, c] = z([]), { t: f } = un();
  return window.updateSelection = (u) => {
    t(u);
  }, W(() => {
    e != null && e.bsddApiEnvironment && r(e.bsddApiEnvironment);
  }, [e, r]), W(() => {
    if (!n)
      return;
    new Oi(Ni[n]).api.dictionaryV1List().then((d) => {
      if (!d.ok)
        throw new Error(`HTTP error! status: ${d.status}`);
      d.data && d.data.dictionaries && a(d.data.dictionaries);
    }).catch((d) => {
      throw new Error(`bSDD API error! status: ${d}`);
    });
  }, [n, a]), W(() => {
    e != null && e.bsddApiEnvironment && r(e.bsddApiEnvironment);
  }, [e, r]), W(() => {
    const u = e == null ? void 0 : e.mainDictionaryUri;
    if (!u)
      return;
    const d = i.find((p) => p.uri === u);
    d && s(d);
  }, [e, i]), W(() => {
    if (!i)
      return;
    const u = e == null ? void 0 : e.filterDictionaryUris;
    (u ?? []).length === 0 || i.filter(
      (p) => (u == null ? void 0 : u.includes(p.uri)) ?? !1
    ).length === 0 || c(i.filter((p) => (u == null ? void 0 : u.includes(p.uri)) ?? !1));
  }, [e, i]), /* @__PURE__ */ _.jsx(vi, { size: "40rem", children: /* @__PURE__ */ _.jsxs(Je, { defaultValue: "koppelen", children: [
    /* @__PURE__ */ _.jsxs(Je.List, { grow: !0, children: [
      /* @__PURE__ */ _.jsx(Je.Tab, { value: "koppelen", children: f("Link") }),
      /* @__PURE__ */ _.jsx(Je.Tab, { value: "settings", children: f("Settings") })
    ] }),
    /* @__PURE__ */ _.jsx(
      $y,
      {
        bsddApiEnvironment: n,
        mainDictionary: o,
        filterDictionaries: l,
        ifcData: (e == null ? void 0 : e.ifcData) ?? []
      }
    ),
    /* @__PURE__ */ _.jsx(
      M1,
      {
        bsddDictionaries: i,
        bsddApiEnvironment: n,
        setBsddApiEnvironment: r,
        mainDictionary: o,
        setMainDictionary: s,
        filterDictionaries: l,
        setFilterDictionaries: c
      }
    )
  ] }) });
}
function k1() {
  return /* @__PURE__ */ _.jsx(bc, { theme: fy, children: /* @__PURE__ */ _.jsx(F1, {}) });
}
os.createRoot(document.getElementById("root")).render(/* @__PURE__ */ _.jsx(k1, {}));
