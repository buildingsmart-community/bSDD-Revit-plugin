var rm = Object.defineProperty;
var om = (e, t, n) => t in e ? rm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Re = (e, t, n) => (om(e, typeof t != "symbol" ? t + "" : t, n), n);
import * as R from "react";
import x, { createContext as on, useContext as ut, useRef as z, useEffect as W, useMemo as Nr, useCallback as Q, useState as U, useLayoutEffect as oo, useId as eu, forwardRef as ie, cloneElement as sn, Children as im, useDebugValue as sm, createElement as ac } from "react";
import * as am from "react-dom";
import tu, { flushSync as ds, createPortal as cm, unstable_batchedUpdates as lm } from "react-dom";
function nu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ru = { exports: {} }, io = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var um = x, dm = Symbol.for("react.element"), fm = Symbol.for("react.fragment"), pm = Object.prototype.hasOwnProperty, mm = um.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, gm = { key: !0, ref: !0, __self: !0, __source: !0 };
function ou(e, t, n) {
  var r, o = {}, i = null, s = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t)
    pm.call(t, r) && !gm.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      o[r] === void 0 && (o[r] = t[r]);
  return { $$typeof: dm, type: e, key: i, ref: s, props: o, _owner: mm.current };
}
io.Fragment = fm;
io.jsx = ou;
io.jsxs = ou;
ru.exports = io;
var F = ru.exports, Bi = {}, cc = tu;
Bi.createRoot = cc.createRoot, Bi.hydrateRoot = cc.hydrateRoot;
function mt(e) {
  return Object.keys(e);
}
function ci(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function fs(e, t) {
  const n = { ...e }, r = t;
  return ci(e) && ci(t) && Object.keys(t).forEach((o) => {
    ci(r[o]) && o in e ? n[o] = fs(n[o], r[o]) : n[o] = r[o];
  }), n;
}
function hm(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function bm(e) {
  var t;
  return typeof e != "string" || !e.includes("var(--mantine-scale)") ? e : (t = e.match(/^calc\((.*?)\)$/)) == null ? void 0 : t[1].split("*")[0].trim();
}
function ym(e) {
  const t = bm(e);
  return typeof t == "number" ? t : typeof t == "string" ? t.includes("calc") || t.includes("var") ? t : t.includes("px") ? Number(t.replace("px", "")) : t.includes("rem") ? Number(t.replace("rem", "")) * 16 : t.includes("em") ? Number(t.replace("em", "")) * 16 : Number(t) : NaN;
}
function li(e) {
  return `calc(${e} * var(--mantine-scale))`;
}
function iu(e, { shouldScale: t = !1 } = {}) {
  function n(r) {
    if (r === 0 || r === "0")
      return "0";
    if (typeof r == "number") {
      const o = `${r / 16}${e}`;
      return t ? li(o) : o;
    }
    if (typeof r == "string") {
      if (r.startsWith("calc(") || r.startsWith("var(") || r.startsWith("clamp("))
        return r;
      if (r.includes(" "))
        return r.split(" ").map((i) => n(i)).join(" ");
      if (r.includes(e))
        return t ? li(r) : r;
      const o = r.replace("px", "");
      if (!Number.isNaN(Number(o))) {
        const i = `${Number(o) / 16}${e}`;
        return t ? li(i) : i;
      }
    }
    return r;
  }
  return n;
}
const D = iu("rem", { shouldScale: !0 }), lc = iu("em");
function ps(e) {
  return Object.keys(e).reduce((t, n) => (e[n] !== void 0 && (t[n] = e[n]), t), {});
}
function su(e) {
  return typeof e == "number" ? !0 : typeof e == "string" ? e.startsWith("calc(") || e.startsWith("var(") || e.includes(" ") && e.trim() !== "" ? !0 : /[0-9]/.test(e.trim().replace("-", "")[0]) : !1;
}
function Vt(e) {
  return Array.isArray(e) || e === null ? !1 : typeof e == "object" ? e.type !== x.Fragment : !1;
}
function Wt(e) {
  const t = on(null);
  return [({ children: o, value: i }) => /* @__PURE__ */ x.createElement(t.Provider, { value: i }, o), () => {
    const o = ut(t);
    if (o === null)
      throw new Error(e);
    return o;
  }];
}
function ms(e = null) {
  const t = on(e);
  return [({ children: o, value: i }) => /* @__PURE__ */ x.createElement(t.Provider, { value: i }, o), () => ut(t)];
}
function $r(e, t) {
  return (n) => {
    if (typeof n != "string" || n.trim().length === 0)
      throw new Error(t);
    return `${e}-${n}`;
  };
}
function ji(e, t) {
  let n = e;
  for (; (n = n.parentElement) && !n.matches(t); )
    ;
  return n;
}
function vm(e, t, n) {
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
function wm(e, t, n) {
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
function xm(e, t, n) {
  return ji(e, n) === ji(t, n);
}
function au({
  parentSelector: e,
  siblingSelector: t,
  onKeyDown: n,
  loop: r = !0,
  activateOnFocus: o = !1,
  dir: i = "rtl",
  orientation: s
}) {
  return (a) => {
    var m;
    n == null || n(a);
    const c = Array.from(
      ((m = ji(a.currentTarget, e)) == null ? void 0 : m.querySelectorAll(
        t
      )) || []
    ).filter((g) => xm(a.currentTarget, g, e)), l = c.findIndex((g) => a.currentTarget === g), u = wm(l, c, r), f = vm(l, c, r), d = i === "rtl" ? f : u, p = i === "rtl" ? u : f;
    switch (a.key) {
      case "ArrowRight": {
        s === "horizontal" && (a.stopPropagation(), a.preventDefault(), c[d].focus(), o && c[d].click());
        break;
      }
      case "ArrowLeft": {
        s === "horizontal" && (a.stopPropagation(), a.preventDefault(), c[p].focus(), o && c[p].click());
        break;
      }
      case "ArrowUp": {
        s === "vertical" && (a.stopPropagation(), a.preventDefault(), c[f].focus(), o && c[f].click());
        break;
      }
      case "ArrowDown": {
        s === "vertical" && (a.stopPropagation(), a.preventDefault(), c[u].focus(), o && c[u].click());
        break;
      }
      case "Home": {
        a.stopPropagation(), a.preventDefault(), !c[0].disabled && c[0].focus();
        break;
      }
      case "End": {
        a.stopPropagation(), a.preventDefault();
        const g = c.length - 1;
        !c[g].disabled && c[g].focus();
        break;
      }
    }
  };
}
const Sm = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function gs(e) {
  return Sm[e];
}
const Cm = () => {
};
function Em(e, t = { active: !0 }) {
  return typeof e != "function" || !t.active ? t.onKeyDown || Cm : (n) => {
    var r;
    n.key === "Escape" && (e(n), (r = t.onTrigger) == null || r.call(t));
  };
}
function fe(e, t = "size", n = !0) {
  if (e !== void 0)
    return su(e) ? n ? D(e) : e : `var(--${t}-${e})`;
}
function cu(e) {
  return fe(e, "mantine-spacing");
}
function bt(e) {
  return e === void 0 ? "var(--mantine-radius-default)" : fe(e, "mantine-radius");
}
function gt(e) {
  return fe(e, "mantine-font-size");
}
function Pm(e) {
  return fe(e, "mantine-line-height", !1);
}
function Dm(e) {
  if (e)
    return fe(e, "mantine-shadow", !1);
}
function Tr(e, t) {
  return (n) => {
    e == null || e(n), t == null || t(n);
  };
}
function lu(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = lu(e[t])) && (r && (r += " "), r += n);
    else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function yt() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = lu(e)) && (r && (r += " "), r += t);
  return r;
}
const Rm = {};
function Im(e) {
  const t = {};
  return e.forEach((n) => {
    Object.entries(n).forEach(([r, o]) => {
      t[r] ? t[r] = yt(t[r], o) : t[r] = o;
    });
  }), t;
}
function so({ theme: e, classNames: t, props: n, stylesCtx: r }) {
  const i = (Array.isArray(t) ? t : [t]).map(
    (s) => typeof s == "function" ? s(e, n, r) : s || Rm
  );
  return Im(i);
}
function Lr({ theme: e, styles: t, props: n, stylesCtx: r }) {
  return (Array.isArray(t) ? t : [t]).reduce((i, s) => typeof s == "function" ? { ...i, ...s(e, n, r) } : { ...i, ...s }, {});
}
function uu() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}
function Qt(e) {
  const t = z(e);
  return W(() => {
    t.current = e;
  }), Nr(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function ao(e, t) {
  const n = Qt(e), r = z(0);
  return W(() => () => window.clearTimeout(r.current), []), Q(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
const uc = ["mousedown", "touchstart"];
function Am(e, t, n) {
  const r = z();
  return W(() => {
    const o = (i) => {
      const { target: s } = i ?? {};
      if (Array.isArray(n)) {
        const a = (s == null ? void 0 : s.hasAttribute("data-ignore-outside-clicks")) || !document.body.contains(s) && s.tagName !== "HTML";
        n.every((l) => !!l && !i.composedPath().includes(l)) && !a && e();
      } else
        r.current && !r.current.contains(s) && e();
    };
    return (t || uc).forEach((i) => document.addEventListener(i, o)), () => {
      (t || uc).forEach((i) => document.removeEventListener(i, o));
    };
  }, [r, e, n]), r;
}
function Om(e, t) {
  try {
    return e.addEventListener("change", t), () => e.removeEventListener("change", t);
  } catch {
    return e.addListener(t), () => e.removeListener(t);
  }
}
function Nm(e, t) {
  return typeof t == "boolean" ? t : typeof window < "u" && "matchMedia" in window ? window.matchMedia(e).matches : !1;
}
function $m(e, t, { getInitialValueInEffect: n } = {
  getInitialValueInEffect: !0
}) {
  const [r, o] = U(
    n ? t : Nm(e, t)
  ), i = z();
  return W(() => {
    if ("matchMedia" in window)
      return i.current = window.matchMedia(e), o(i.current.matches), Om(i.current, (s) => o(s.matches));
  }, [e]), r;
}
const tr = typeof document < "u" ? oo : W;
function Mt(e, t) {
  const n = z(!1);
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
function Tm({ opened: e, shouldReturnFocus: t = !0 }) {
  const n = z(), r = () => {
    var o;
    n.current && "focus" in n.current && typeof n.current.focus == "function" && ((o = n.current) == null || o.focus({ preventScroll: !0 }));
  };
  return Mt(() => {
    let o = -1;
    const i = (s) => {
      s.key === "Tab" && window.clearTimeout(o);
    };
    return document.addEventListener("keydown", i), e ? n.current = document.activeElement : t && (o = window.setTimeout(r, 10)), () => {
      window.clearTimeout(o), document.removeEventListener("keydown", i);
    };
  }, [e, t]), r;
}
function Lm(e, t = "body > :not(script)") {
  const n = uu(), r = Array.from(
    document.querySelectorAll(t)
  ).map((o) => {
    var c;
    if ((c = o == null ? void 0 : o.shadowRoot) != null && c.contains(e) || o.contains(e))
      return;
    const i = o.getAttribute("aria-hidden"), s = o.getAttribute("data-hidden"), a = o.getAttribute("data-focus-id");
    return o.setAttribute("data-focus-id", n), i === null || i === "false" ? o.setAttribute("aria-hidden", "true") : !s && !a && o.setAttribute("data-hidden", i), {
      node: o,
      ariaHidden: s || null
    };
  });
  return () => {
    r.forEach((o) => {
      !o || n !== o.node.getAttribute("data-focus-id") || (o.ariaHidden === null ? o.node.removeAttribute("aria-hidden") : o.node.setAttribute("aria-hidden", o.ariaHidden), o.node.removeAttribute("data-focus-id"), o.node.removeAttribute("data-hidden"));
    });
  };
}
const Mm = /input|select|textarea|button|object/, du = "a, input, select, textarea, button, object, [tabindex]";
function _m(e) {
  return e.style.display === "none";
}
function km(e) {
  if (e.getAttribute("aria-hidden") || e.getAttribute("hidden") || e.getAttribute("type") === "hidden")
    return !1;
  let n = e;
  for (; n && !(n === document.body || n.nodeType === 11); ) {
    if (_m(n))
      return !1;
    n = n.parentNode;
  }
  return !0;
}
function fu(e) {
  let t = e.getAttribute("tabindex");
  return t === null && (t = void 0), parseInt(t, 10);
}
function zi(e) {
  const t = e.nodeName.toLowerCase(), n = !Number.isNaN(fu(e));
  return /* @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition */ (Mm.test(t) && !e.disabled || e instanceof HTMLAnchorElement && e.href || n) && km(e);
}
function pu(e) {
  const t = fu(e);
  return (Number.isNaN(t) || t >= 0) && zi(e);
}
function Fm(e) {
  return Array.from(e.querySelectorAll(du)).filter(pu);
}
function Bm(e, t) {
  const n = Fm(e);
  if (!n.length) {
    t.preventDefault();
    return;
  }
  const r = n[t.shiftKey ? 0 : n.length - 1], o = e.getRootNode();
  let i = r === o.activeElement || e === o.activeElement;
  const s = o.activeElement;
  if (s.tagName === "INPUT" && s.getAttribute("type") === "radio" && (i = n.filter(
    (u) => u.getAttribute("type") === "radio" && u.getAttribute("name") === s.getAttribute("name")
  ).includes(r)), !i)
    return;
  t.preventDefault();
  const c = n[t.shiftKey ? n.length - 1 : 0];
  c && c.focus();
}
function jm(e = !0) {
  const t = z(), n = z(null), r = (i) => {
    let s = i.querySelector("[data-autofocus]");
    if (!s) {
      const a = Array.from(i.querySelectorAll(du));
      s = a.find(pu) || a.find(zi) || null, !s && zi(i) && (s = i);
    }
    s && s.focus({ preventScroll: !0 });
  }, o = Q(
    (i) => {
      if (e) {
        if (i === null) {
          n.current && (n.current(), n.current = null);
          return;
        }
        n.current = Lm(i), t.current !== i && (i ? (setTimeout(() => {
          i.getRootNode() && r(i);
        }), t.current = i) : t.current = null);
      }
    },
    [e]
  );
  return W(() => {
    if (!e)
      return;
    t.current && setTimeout(() => r(t.current));
    const i = (s) => {
      s.key === "Tab" && t.current && Bm(t.current, s);
    };
    return document.addEventListener("keydown", i), () => {
      document.removeEventListener("keydown", i), n.current && n.current();
    };
  }, [e]), o;
}
const zm = x["useId".toString()] || (() => {
});
function Vm() {
  const e = zm();
  return e ? `mantine-${e.replace(/:/g, "")}` : "";
}
function Gt(e) {
  const t = Vm(), [n, r] = U(t);
  return tr(() => {
    r(uu());
  }, []), typeof e == "string" ? e : typeof window > "u" ? t : n;
}
function mu(e, t) {
  typeof e == "function" ? e(t) : typeof e == "object" && e !== null && "current" in e && (e.current = t);
}
function gu(...e) {
  return (t) => {
    e.forEach((n) => mu(n, t));
  };
}
function Oe(...e) {
  return Q(gu(...e), e);
}
function _t({
  value: e,
  defaultValue: t,
  finalValue: n,
  onChange: r = () => {
  }
}) {
  const [o, i] = U(
    t !== void 0 ? t : n
  ), s = (a) => {
    i(a), r == null || r(a);
  };
  return e !== void 0 ? [e, r, !0] : [o, s, !1];
}
function hu(e, t) {
  return $m("(prefers-reduced-motion: reduce)", e, t);
}
function Wm(e = !1, t) {
  const { onOpen: n, onClose: r } = t || {}, [o, i] = U(e), s = Q(() => {
    i((l) => l || (n == null || n(), !0));
  }, [n]), a = Q(() => {
    i((l) => l && (r == null || r(), !1));
  }, [r]), c = Q(() => {
    o ? a() : s();
  }, [a, s, o]);
  return [o, { open: s, close: a, toggle: c }];
}
const bu = on(null);
function hs() {
  const e = ut(bu);
  if (!e)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return e;
}
function Gm() {
  return hs().cssVariablesResolver;
}
function Hm() {
  return hs().classNamesPrefix;
}
function bs() {
  return hs().getStyleNonce;
}
function Um(e) {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(e);
}
function qm(e) {
  let t = e.replace("#", "");
  if (t.length === 3) {
    const s = t.split("");
    t = [
      s[0],
      s[0],
      s[1],
      s[1],
      s[2],
      s[2]
    ].join("");
  }
  const n = parseInt(t, 16), r = n >> 16 & 255, o = n >> 8 & 255, i = n & 255;
  return {
    r,
    g: o,
    b: i,
    a: 1
  };
}
function Km(e) {
  const [t, n, r, o] = e.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r: t, g: n, b: r, a: o || 1 };
}
function Ym(e) {
  const t = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, n = e.match(t);
  if (!n)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const r = parseInt(n[1], 10), o = parseInt(n[2], 10) / 100, i = parseInt(n[3], 10) / 100, s = n[5] ? parseFloat(n[5]) : void 0, a = (1 - Math.abs(2 * i - 1)) * o, c = r / 60, l = a * (1 - Math.abs(c % 2 - 1)), u = i - a / 2;
  let f, d, p;
  return c >= 0 && c < 1 ? (f = a, d = l, p = 0) : c >= 1 && c < 2 ? (f = l, d = a, p = 0) : c >= 2 && c < 3 ? (f = 0, d = a, p = l) : c >= 3 && c < 4 ? (f = 0, d = l, p = a) : c >= 4 && c < 5 ? (f = l, d = 0, p = a) : (f = a, d = 0, p = l), {
    r: Math.round((f + u) * 255),
    g: Math.round((d + u) * 255),
    b: Math.round((p + u) * 255),
    a: s || 1
  };
}
function yu(e) {
  return Um(e) ? qm(e) : e.startsWith("rgb") ? Km(e) : e.startsWith("hsl") ? Ym(e) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function hr(e, t) {
  if (e.startsWith("var("))
    return e;
  const { r: n, g: r, b: o, a: i } = yu(e), s = 1 - t, a = (c) => Math.round(c * s);
  return `rgba(${a(n)}, ${a(r)}, ${a(o)}, ${i})`;
}
function Vi(e, t) {
  return typeof e.primaryShade == "number" ? e.primaryShade : t === "dark" ? e.primaryShade.dark : e.primaryShade.light;
}
function ys({
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
  const [r, o] = e.split("."), i = o ? Number(o) : void 0, s = r in t.colors;
  return s ? {
    color: r,
    value: i !== void 0 ? t.colors[r][i] : t.colors[r][Vi(t, n || "light")],
    shade: i,
    isThemeColor: s,
    variable: o ? `--mantine-color-${r}-${i}` : `--mantine-color-${r}-filled`
  } : {
    color: e,
    value: e,
    isThemeColor: s,
    shade: i,
    variable: void 0
  };
}
function kt(e, t) {
  const n = ys({ color: e || t.primaryColor, theme: t });
  return n.variable ? `var(${n.variable})` : e;
}
function Wi(e, t) {
  const n = {
    from: (e == null ? void 0 : e.from) || t.defaultGradient.from,
    to: (e == null ? void 0 : e.to) || t.defaultGradient.to,
    deg: (e == null ? void 0 : e.deg) || t.defaultGradient.deg || 0
  }, r = kt(n.from, t), o = kt(n.to, t);
  return `linear-gradient(${n.deg}deg, ${r} 0%, ${o} 100%)`;
}
function Le(e, t) {
  if (typeof e != "string" || t > 1 || t < 0)
    return "rgba(0, 0, 0, 1)";
  const { r: n, g: r, b: o } = yu(e);
  return `rgba(${n}, ${r}, ${o}, ${t})`;
}
const Xm = ({
  color: e,
  theme: t,
  variant: n,
  gradient: r
}) => {
  const o = ys({ color: e, theme: t });
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
      hover: hr(e, 0.1),
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
      const i = t.colors[o.color][o.shade];
      return {
        background: Le(i, 0.1),
        hover: Le(i, 0.12),
        color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
        border: `${D(1)} solid transparent`
      };
    }
    return {
      background: Le(e, 0.1),
      hover: Le(e, 0.12),
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
      hover: Le(t.colors[o.color][o.shade], 0.05),
      color: `var(--mantine-color-${o.color}-${o.shade})`,
      border: `${D(1)} solid var(--mantine-color-${o.color}-${o.shade})`
    } : {
      background: "transparent",
      hover: Le(e, 0.05),
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
      const i = t.colors[o.color][o.shade];
      return {
        background: "transparent",
        hover: Le(i, 0.12),
        color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
        border: `${D(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: Le(e, 0.12),
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
    hover: hr(t.white, 0.01),
    color: `var(--mantine-color-${e}-filled)`,
    border: `${D(1)} solid transparent`
  } : {
    background: "var(--mantine-color-white)",
    hover: hr(t.white, 0.01),
    color: `var(--mantine-color-${o.color}-${o.shade})`,
    border: `${D(1)} solid transparent`
  } : {
    background: "var(--mantine-color-white)",
    hover: hr(t.white, 0.01),
    color: e,
    border: `${D(1)} solid transparent`
  } : n === "gradient" ? {
    background: Wi(r, t),
    hover: Wi(r, t),
    color: "var(--mantine-color-white)",
    border: "none"
  } : n === "default" ? {
    background: "var(--mantine-color-default)",
    hover: "var(--mantine-color-default-hover)",
    color: "var(--mantine-color-default-color)",
    border: `${D(1)} solid var(--mantine-color-default-border)`
  } : {};
}, Jm = {
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
}, dc = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji", vs = {
  scale: 1,
  fontSmoothing: !0,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: Jm,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: Xm,
  fontFamily: dc,
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  respectReducedMotion: !1,
  cursorType: "default",
  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
  defaultRadius: "sm",
  activeClassName: "mantine-active",
  focusClassName: "",
  headings: {
    fontFamily: dc,
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
function fc(e) {
  return e === "auto" || e === "dark" || e === "light";
}
function Qm({
  key: e = "mantine-color-scheme-value"
} = {}) {
  let t;
  return {
    get: (n) => {
      if (typeof window > "u")
        return n;
      try {
        const r = window.localStorage.getItem(e);
        return fc(r) ? r : n;
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
        r.storageArea === window.localStorage && r.key === e && fc(r.newValue) && n(r.newValue);
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
const Zm = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color", pc = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function ui(e) {
  return e < 0 || e > 9 ? !1 : parseInt(e.toString(), 10) === e;
}
function mc(e) {
  if (!(e.primaryColor in e.colors))
    throw new Error(Zm);
  if (typeof e.primaryShade == "object" && (!ui(e.primaryShade.dark) || !ui(e.primaryShade.light)))
    throw new Error(pc);
  if (typeof e.primaryShade == "number" && !ui(e.primaryShade))
    throw new Error(pc);
}
function eg(e, t) {
  var r;
  if (!t)
    return mc(e), e;
  const n = fs(e, t);
  return t.fontFamily && !((r = t.headings) != null && r.fontFamily) && (n.headings.fontFamily = t.fontFamily), mc(n), n;
}
const ws = on(null), tg = () => ut(ws) || vs;
function vt() {
  const e = ut(ws);
  if (!e)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return e;
}
function vu({
  theme: e,
  children: t,
  inherit: n = !0
}) {
  const r = tg(), o = Nr(
    () => eg(n ? r : vs, e),
    [e, r, n]
  );
  return /* @__PURE__ */ x.createElement(ws.Provider, { value: o }, t);
}
vu.displayName = "@mantine/core/MantineThemeProvider";
function ng() {
  const e = vt(), t = bs(), n = mt(e.breakpoints).reduce((r, o) => {
    const i = ym(e.breakpoints[o]);
    return `${r}@media (max-width: ${lc(
      i - 0.1
    )}) {.mantine-visible-from-${o} {display: none !important;}}@media (min-width: ${lc(
      i
    )}) {.mantine-hidden-from-${o} {display: none !important;}}`;
  }, "");
  return /* @__PURE__ */ x.createElement(
    "style",
    {
      "data-mantine-styles": "classes",
      nonce: t == null ? void 0 : t(),
      dangerouslySetInnerHTML: { __html: n }
    }
  );
}
function di(e) {
  return Object.entries(e).map(([t, n]) => `${t}: ${n};`).join("");
}
function fi(e, t) {
  return (Array.isArray(e) ? e : [e]).reduce((r, o) => `${o}{${r}}`, t);
}
function rg(e, t) {
  const n = di(e.variables), r = n ? fi(t, n) : "", o = di(e.dark), i = o ? fi(`${t}[data-mantine-color-scheme="dark"]`, o) : "", s = di(e.light), a = s ? fi(`${t}[data-mantine-color-scheme="light"]`, s) : "";
  return `${r}${i}${a}`;
}
function un(e, t, n) {
  mt(t).forEach(
    (r) => Object.assign(e, { [`--mantine-${n}-${r}`]: t[r] })
  );
}
const wu = (e) => {
  const t = Vi(e, "dark"), n = Vi(e, "light"), r = e.defaultRadius in e.radius ? e.radius[e.defaultRadius] : D(e.defaultRadius), o = {
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
  un(o.variables, e.breakpoints, "breakpoint"), un(o.variables, e.spacing, "spacing"), un(o.variables, e.fontSizes, "font-size"), un(o.variables, e.lineHeights, "line-height"), un(o.variables, e.shadows, "shadow"), un(o.variables, e.radius, "radius"), e.colors[e.primaryColor].forEach((s, a) => {
    o.variables[`--mantine-primary-color-${a}`] = `var(--mantine-color-${e.primaryColor}-${a})`;
  }), mt(e.colors).forEach((s) => {
    e.colors[s].forEach((l, u) => {
      o.variables[`--mantine-color-${s}-${u}`] = l;
    });
    const a = `var(--mantine-color-${s}-${n === 9 ? 8 : n + 1})`, c = `var(--mantine-color-${s}-${t === 9 ? 8 : t + 1})`;
    o.light["--mantine-color-dimmed"] = "var(--mantine-color-gray-6)", o.light[`--mantine-color-${s}-text`] = `var(--mantine-color-${s}-filled)`, o.light[`--mantine-color-${s}-filled`] = `var(--mantine-color-${s}-${n})`, o.light[`--mantine-color-${s}-filled-hover`] = a, o.light[`--mantine-color-${s}-light`] = Le(
      e.colors[s][n],
      0.1
    ), o.light[`--mantine-color-${s}-light-hover`] = Le(
      e.colors[s][n],
      0.12
    ), o.light[`--mantine-color-${s}-light-color`] = `var(--mantine-color-${s}-${n})`, o.light[`--mantine-color-${s}-outline`] = `var(--mantine-color-${s}-${n})`, o.light[`--mantine-color-${s}-outline-hover`] = Le(
      e.colors[s][n],
      0.05
    ), o.dark["--mantine-color-dimmed"] = "var(--mantine-color-dark-2)", o.dark[`--mantine-color-${s}-text`] = `var(--mantine-color-${s}-4)`, o.dark[`--mantine-color-${s}-filled`] = `var(--mantine-color-${s}-${t})`, o.dark[`--mantine-color-${s}-filled-hover`] = c, o.dark[`--mantine-color-${s}-light`] = Le(
      e.colors[s][Math.max(0, t - 2)],
      0.15
    ), o.dark[`--mantine-color-${s}-light-hover`] = Le(
      e.colors[s][Math.max(0, t - 2)],
      0.2
    ), o.dark[`--mantine-color-${s}-light-color`] = `var(--mantine-color-${s}-${Math.max(
      t - 5,
      0
    )})`, o.dark[`--mantine-color-${s}-outline`] = `var(--mantine-color-${s}-${Math.max(
      t - 4,
      0
    )})`, o.dark[`--mantine-color-${s}-outline-hover`] = Le(
      e.colors[s][Math.max(t - 4, 0)],
      0.05
    );
  });
  const i = e.headings.sizes;
  return mt(i).forEach((s) => {
    o.variables[`--mantine-${s}-font-size`] = i[s].fontSize, o.variables[`--mantine-${s}-line-height`] = i[s].lineHeight, o.variables[`--mantine-${s}-font-weight`] = i[s].fontWeight || e.headings.fontWeight;
  }), o;
};
function og({ theme: e, generator: t }) {
  const n = wu(e), r = t == null ? void 0 : t(e);
  return r ? fs(n, r) : n;
}
const pi = wu(vs);
function ig(e) {
  const t = {
    variables: {},
    light: {},
    dark: {}
  };
  return mt(e.variables).forEach((n) => {
    pi.variables[n] !== e.variables[n] && (t.variables[n] = e.variables[n]);
  }), mt(e.light).forEach((n) => {
    pi.light[n] !== e.light[n] && (t.light[n] = e.light[n]);
  }), mt(e.dark).forEach((n) => {
    pi.dark[n] !== e.dark[n] && (t.dark[n] = e.dark[n]);
  }), t;
}
function sg(e) {
  return `
  ${e}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${e}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
}
function xu({ cssVariablesSelector: e }) {
  const t = vt(), n = bs(), r = Gm(), o = og({ theme: t, generator: r }), i = e === ":root", s = i ? ig(o) : o, a = rg(s, e);
  return a ? /* @__PURE__ */ x.createElement(
    "style",
    {
      "data-mantine-styles": !0,
      nonce: n == null ? void 0 : n(),
      dangerouslySetInnerHTML: {
        __html: `${a}${i ? "" : sg(e)}`
      }
    }
  ) : null;
}
xu.displayName = "@mantine/CssVariables";
function ag() {
  const e = console.error;
  console.error = (...t) => {
    t.length > 1 && typeof t[0] == "string" && t[0].toLowerCase().includes("extra attributes from the server") && typeof t[1] == "string" && t[1].toLowerCase().includes("data-mantine-color-scheme") || e(...t);
  };
}
function On(e, t) {
  var r;
  const n = e !== "auto" ? e : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  (r = t()) == null || r.setAttribute("data-mantine-color-scheme", n);
}
function cg({
  manager: e,
  defaultColorScheme: t,
  getRootElement: n,
  forceColorScheme: r
}) {
  const o = z(), [i, s] = U(() => e.get(t)), a = r || i, c = Q(
    (u) => {
      r || (On(u, n), s(u), e.set(u));
    },
    [e.set, a, r]
  ), l = Q(() => {
    s(t), On(t, n), e.clear();
  }, [e.clear, t]);
  return W(() => (e.subscribe(c), e.unsubscribe), [e.subscribe, e.unsubscribe]), tr(() => {
    On(e.get(t), n);
  }, []), W(() => {
    var f;
    if (r)
      return On(r, n), () => {
      };
    o.current = window.matchMedia("(prefers-color-scheme: dark)");
    const u = (d) => {
      i === "auto" && On(d.matches ? "dark" : "light", n);
    };
    return (f = o.current) == null || f.addEventListener("change", u), () => {
      var d;
      return (d = o.current) == null ? void 0 : d.removeEventListener("change", u);
    };
  }, [i, r]), { colorScheme: a, setColorScheme: c, clearColorScheme: l };
}
function lg({
  respectReducedMotion: e,
  getRootElement: t
}) {
  tr(() => {
    var n;
    e && ((n = t()) == null || n.setAttribute("data-respect-reduced-motion", "true"));
  }, [e]);
}
ag();
function Su({
  theme: e,
  children: t,
  getStyleNonce: n,
  withCssVariables: r = !0,
  cssVariablesSelector: o = ":root",
  classNamesPrefix: i = "mantine",
  colorSchemeManager: s = Qm(),
  defaultColorScheme: a = "light",
  getRootElement: c = () => document.documentElement,
  cssVariablesResolver: l,
  forceColorScheme: u
}) {
  const { colorScheme: f, setColorScheme: d, clearColorScheme: p } = cg({
    defaultColorScheme: a,
    forceColorScheme: u,
    manager: s,
    getRootElement: c
  });
  return lg({
    respectReducedMotion: (e == null ? void 0 : e.respectReducedMotion) || !1,
    getRootElement: c
  }), /* @__PURE__ */ x.createElement(
    bu.Provider,
    {
      value: {
        colorSchemeManager: s,
        colorScheme: f,
        setColorScheme: d,
        clearColorScheme: p,
        getRootElement: c,
        classNamesPrefix: i,
        getStyleNonce: n,
        cssVariablesResolver: l,
        cssVariablesSelector: o
      }
    },
    /* @__PURE__ */ x.createElement(vu, { theme: e }, r && /* @__PURE__ */ x.createElement(xu, { cssVariablesSelector: o }), /* @__PURE__ */ x.createElement(ng, null), t)
  );
}
Su.displayName = "@mantine/core/MantineProvider";
function Cu({
  classNames: e,
  styles: t,
  props: n,
  stylesCtx: r
}) {
  const o = vt();
  return {
    resolvedClassNames: so({
      theme: o,
      classNames: e,
      props: n,
      stylesCtx: r || void 0
    }),
    resolvedStyles: Lr({
      theme: o,
      styles: t,
      props: n,
      stylesCtx: r || void 0
    })
  };
}
const ug = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function dg({ theme: e, options: t, unstyled: n }) {
  return yt(
    (t == null ? void 0 : t.focusable) && !n && (e.focusClassName || ug[e.focusRing]),
    (t == null ? void 0 : t.active) && !n && e.activeClassName
  );
}
function fg({
  selector: e,
  stylesCtx: t,
  options: n,
  props: r,
  theme: o
}) {
  return so({
    theme: o,
    classNames: n == null ? void 0 : n.classNames,
    props: (n == null ? void 0 : n.props) || r,
    stylesCtx: t
  })[e];
}
function pg({
  selector: e,
  stylesCtx: t,
  theme: n,
  classNames: r,
  props: o
}) {
  return so({ theme: n, classNames: r, props: o, stylesCtx: t })[e];
}
function mg({ rootSelector: e, selector: t, className: n }) {
  return e === t ? n : void 0;
}
function gg({ selector: e, classes: t, unstyled: n }) {
  return n ? void 0 : t[e];
}
function hg({
  themeName: e,
  classNamesPrefix: t,
  selector: n
}) {
  return e.map((r) => `${t}-${r}-${n}`);
}
function bg({
  themeName: e,
  theme: t,
  selector: n,
  props: r,
  stylesCtx: o
}) {
  return e.map(
    (i) => {
      var s, a;
      return (a = so({
        theme: t,
        classNames: (s = t.components[i]) == null ? void 0 : s.classNames,
        props: r,
        stylesCtx: o
      })) == null ? void 0 : a[n];
    }
  );
}
function yg({
  options: e,
  classes: t,
  selector: n,
  unstyled: r
}) {
  return e != null && e.variant && !r ? t[`${n}--${e.variant}`] : void 0;
}
function vg({
  theme: e,
  options: t,
  themeName: n,
  selector: r,
  classNamesPrefix: o,
  classNames: i,
  classes: s,
  unstyled: a,
  className: c,
  rootSelector: l,
  props: u,
  stylesCtx: f
}) {
  return yt(
    dg({ theme: e, options: t, unstyled: a }),
    bg({ theme: e, themeName: n, selector: r, props: u, stylesCtx: f }),
    yg({ options: t, classes: s, selector: r, unstyled: a }),
    pg({ selector: r, stylesCtx: f, theme: e, classNames: i, props: u }),
    fg({ selector: r, stylesCtx: f, options: t, props: u, theme: e }),
    mg({ rootSelector: l, selector: r, className: c }),
    gg({ selector: r, classes: s, unstyled: a }),
    hg({ themeName: n, classNamesPrefix: o, selector: r }),
    t == null ? void 0 : t.className
  );
}
function wg({
  theme: e,
  themeName: t,
  props: n,
  stylesCtx: r,
  selector: o
}) {
  return t.map(
    (i) => {
      var s;
      return Lr({
        theme: e,
        styles: (s = e.components[i]) == null ? void 0 : s.styles,
        props: n,
        stylesCtx: r
      })[o];
    }
  ).reduce((i, s) => ({ ...i, ...s }), {});
}
function Gi({ style: e, theme: t }) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...Gi({ style: r, theme: t }) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function xg(e) {
  return e.reduce((t, n) => (n && Object.keys(n).forEach((r) => {
    t[r] = { ...t[r], ...ps(n[r]) };
  }), t), {});
}
function Sg({
  vars: e,
  varsResolver: t,
  theme: n,
  props: r,
  stylesCtx: o,
  selector: i,
  themeName: s
}) {
  var a;
  return (a = xg([
    t == null ? void 0 : t(n, r, o),
    ...s.map((c) => {
      var l, u, f;
      return (f = (u = (l = n.components) == null ? void 0 : l[c]) == null ? void 0 : u.vars) == null ? void 0 : f.call(u, n, r, o);
    }),
    e == null ? void 0 : e(n, r, o)
  ])) == null ? void 0 : a[i];
}
function Cg({
  theme: e,
  themeName: t,
  selector: n,
  options: r,
  props: o,
  stylesCtx: i,
  rootSelector: s,
  styles: a,
  style: c,
  vars: l,
  varsResolver: u
}) {
  return {
    ...wg({ theme: e, themeName: t, props: o, stylesCtx: i, selector: n }),
    ...Lr({ theme: e, styles: a, props: o, stylesCtx: i })[n],
    ...Lr({ theme: e, styles: r == null ? void 0 : r.styles, props: (r == null ? void 0 : r.props) || o, stylesCtx: i })[n],
    ...Sg({ theme: e, props: o, stylesCtx: i, vars: l, varsResolver: u, selector: n, themeName: t }),
    ...s === n ? Gi({ style: c, theme: e }) : null,
    ...Gi({ style: r == null ? void 0 : r.style, theme: e })
  };
}
function te({
  name: e,
  classes: t,
  props: n,
  stylesCtx: r,
  className: o,
  style: i,
  rootSelector: s = "root",
  unstyled: a,
  classNames: c,
  styles: l,
  vars: u,
  varsResolver: f
}) {
  const d = vt(), p = Hm(), m = (Array.isArray(e) ? e : [e]).filter((g) => g);
  return (g, h) => ({
    className: vg({
      theme: d,
      options: h,
      themeName: m,
      selector: g,
      classNamesPrefix: p,
      classNames: c,
      classes: t,
      unstyled: a,
      className: o,
      rootSelector: s,
      props: n,
      stylesCtx: r
    }),
    style: Cg({
      theme: d,
      themeName: m,
      selector: g,
      options: h,
      props: n,
      stylesCtx: r,
      rootSelector: s,
      styles: l,
      style: i,
      vars: u,
      varsResolver: f
    })
  });
}
function j(e, t, n) {
  var s;
  const r = vt(), o = (s = r.components[e]) == null ? void 0 : s.defaultProps, i = typeof o == "function" ? o(r) : o;
  return { ...t, ...i, ...ps(n) };
}
function gc(e) {
  return mt(e).reduce(
    (t, n) => e[n] !== void 0 ? `${t}${hm(n)}:${e[n]};` : t,
    ""
  ).trim();
}
function Eg({ selector: e, styles: t, media: n }) {
  const r = t ? gc(t) : "", o = Array.isArray(n) ? n.map((i) => `@media${i.query}{${e}{${gc(i.styles)}}}`) : [];
  return `${r ? `${e}{${r}}` : ""}${o.join("")}`.trim();
}
function Pg({ selector: e, styles: t, media: n }) {
  const r = bs();
  return /* @__PURE__ */ x.createElement(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: r == null ? void 0 : r(),
      dangerouslySetInnerHTML: { __html: Eg({ selector: e, styles: t, media: n }) }
    }
  );
}
function co(e) {
  const {
    m: t,
    mx: n,
    my: r,
    mt: o,
    mb: i,
    ml: s,
    mr: a,
    p: c,
    px: l,
    py: u,
    pt: f,
    pb: d,
    pl: p,
    pr: m,
    bg: g,
    c: h,
    opacity: w,
    ff: y,
    fz: b,
    fw: v,
    lts: S,
    ta: C,
    lh: P,
    fs: E,
    tt: O,
    td: T,
    w: $,
    miw: M,
    maw: _,
    h: A,
    mih: L,
    mah: I,
    bgsz: B,
    bgp: N,
    bgr: G,
    bga: X,
    pos: ne,
    top: ve,
    left: le,
    bottom: Ne,
    right: we,
    inset: re,
    display: xe,
    hiddenFrom: _e,
    visibleFrom: Ee,
    lightHidden: Pe,
    darkHidden: ke,
    ...ae
  } = e;
  return { styleProps: ps({
    m: t,
    mx: n,
    my: r,
    mt: o,
    mb: i,
    ml: s,
    mr: a,
    p: c,
    px: l,
    py: u,
    pt: f,
    pb: d,
    pl: p,
    pr: m,
    bg: g,
    c: h,
    opacity: w,
    ff: y,
    fz: b,
    fw: v,
    lts: S,
    ta: C,
    lh: P,
    fs: E,
    tt: O,
    td: T,
    w: $,
    miw: M,
    maw: _,
    h: A,
    mih: L,
    mah: I,
    bgsz: B,
    bgp: N,
    bgr: G,
    bga: X,
    pos: ne,
    top: ve,
    left: le,
    bottom: Ne,
    right: we,
    inset: re,
    display: xe,
    hiddenFrom: _e,
    visibleFrom: Ee,
    lightHidden: Pe,
    darkHidden: ke
  }), rest: ae };
}
const Dg = {
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
function Rg(e, t) {
  const n = ys({ color: e, theme: t });
  return n.color === "dimmed" ? "var(--mantine-color-dimmed)" : n.color === "bright" ? "var(--mantine-color-bright)" : n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : n.variable ? `var(${n.variable})` : n.color;
}
function Ig(e, t) {
  return typeof e == "string" && e in t.fontSizes ? `var(--mantine-font-size-${e})` : typeof e == "number" || typeof e == "string" ? D(e) : e;
}
function Ag(e) {
  return e;
}
function Og(e, t) {
  return typeof e == "string" && e in t.lineHeights ? `var(--mantine-line-height-${e})` : e;
}
function Ng(e) {
  return typeof e == "number" ? D(e) : e;
}
function $g(e, t) {
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
const mi = {
  color: Rg,
  fontSize: Ig,
  spacing: $g,
  identity: Ag,
  size: Ng,
  lineHeight: Og
};
function hc(e) {
  return e.replace("(min-width: ", "").replace("em)", "");
}
function Tg({
  media: e,
  ...t
}) {
  const r = Object.keys(e).sort((o, i) => Number(hc(o)) - Number(hc(i))).map((o) => ({ query: o, styles: e[o] }));
  return { ...t, media: r };
}
function Lg(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.keys(e);
  return !(t.length === 1 && t[0] === "base");
}
function Mg(e) {
  return typeof e == "object" && e !== null ? "base" in e ? e.base : void 0 : e;
}
function _g(e) {
  return typeof e == "object" && e !== null ? mt(e).filter((t) => t !== "base") : [];
}
function kg(e, t) {
  return typeof e == "object" && e !== null && t in e ? e[t] : e;
}
function Fg({
  styleProps: e,
  data: t,
  theme: n
}) {
  return Tg(
    mt(e).reduce(
      (r, o) => {
        if (o === "hiddenFrom" || o === "visibleFrom")
          return r;
        const i = t[o], s = Array.isArray(i.property) ? i.property : [i.property], a = Mg(e[o]);
        if (!Lg(e[o]))
          return s.forEach((l) => {
            r.inlineStyles[l] = mi[i.type](a, n);
          }), r;
        r.hasResponsiveStyles = !0;
        const c = _g(e[o]);
        return s.forEach((l) => {
          a && (r.styles[l] = mi[i.type](a, n)), c.forEach((u) => {
            const f = `(min-width: ${n.breakpoints[u]})`;
            r.media[f] = {
              ...r.media[f],
              [l]: mi[i.type](
                kg(e[o], u),
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
function Bg() {
  return `__m__-${eu().replace(/:/g, "")}`;
}
function xs(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...xs(r, t) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function Eu(e) {
  return e.startsWith("data-") ? e : `data-${e}`;
}
function jg(e) {
  return Object.keys(e).reduce((t, n) => {
    const r = e[n];
    return r === void 0 || r === "" || r === !1 || r === null || (t[Eu(n)] = e[n]), t;
  }, {});
}
function Pu(e) {
  return e ? typeof e == "string" ? { [Eu(e)]: !0 } : Array.isArray(e) ? [...e].reduce(
    (t, n) => ({ ...t, ...Pu(n) }),
    {}
  ) : jg(e) : null;
}
function Hi(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...Hi(r, t) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function zg({
  theme: e,
  style: t,
  vars: n,
  styleProps: r
}) {
  const o = Hi(t, e), i = Hi(n, e);
  return { ...o, ...i, ...r };
}
const Du = ie(
  ({
    component: e,
    style: t,
    __vars: n,
    className: r,
    variant: o,
    mod: i,
    size: s,
    hiddenFrom: a,
    visibleFrom: c,
    lightHidden: l,
    darkHidden: u,
    renderRoot: f,
    ...d
  }, p) => {
    const m = vt(), g = e || "div", { styleProps: h, rest: w } = co(d), y = Bg(), b = Fg({
      styleProps: h,
      theme: m,
      data: Dg
    }), v = {
      ref: p,
      style: zg({
        theme: m,
        style: t,
        vars: n,
        styleProps: b.inlineStyles
      }),
      className: yt(r, {
        [y]: b.hasResponsiveStyles,
        "mantine-light-hidden": l,
        "mantine-dark-hidden": u,
        [`mantine-hidden-from-${a}`]: a,
        [`mantine-visible-from-${c}`]: c
      }),
      "data-variant": o,
      "data-size": su(s) ? void 0 : s || void 0,
      ...Pu(i),
      ...w
    };
    return /* @__PURE__ */ x.createElement(x.Fragment, null, b.hasResponsiveStyles && /* @__PURE__ */ x.createElement(
      Pg,
      {
        selector: `.${y}`,
        styles: b.styles,
        media: b.media
      }
    ), typeof f == "function" ? f(v) : /* @__PURE__ */ x.createElement(g, { ...v }));
  }
);
Du.displayName = "@mantine/core/Box";
const H = Du;
function Ru(e) {
  return e;
}
function q(e) {
  const t = ie(e);
  return t.extend = Ru, t;
}
function an(e) {
  const t = ie(e);
  return t.extend = Ru, t;
}
const Vg = on({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function nr() {
  return ut(Vg);
}
function Wg(e) {
  if (!e || typeof e == "string")
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function gi(e) {
  return e != null && e.current ? e.current.scrollHeight : "auto";
}
const Nn = typeof window < "u" && window.requestAnimationFrame;
function Gg({
  transitionDuration: e,
  transitionTimingFunction: t = "ease",
  onTransitionEnd: n = () => {
  },
  opened: r
}) {
  const o = z(null), i = 0, s = {
    display: "none",
    height: 0,
    overflow: "hidden"
  }, [a, c] = U(r ? {} : s), l = (m) => {
    ds(() => c(m));
  }, u = (m) => {
    l((g) => ({ ...g, ...m }));
  };
  function f(m) {
    return {
      transition: `height ${e || Wg(m)}ms ${t}`
    };
  }
  Mt(() => {
    typeof Nn == "function" && Nn(r ? () => {
      u({ willChange: "height", display: "block", overflow: "hidden" }), Nn(() => {
        const m = gi(o);
        u({ ...f(m), height: m });
      });
    } : () => {
      const m = gi(o);
      u({ ...f(m), willChange: "height", height: m }), Nn(() => u({ height: i, overflow: "hidden" }));
    });
  }, [r]);
  const d = (m) => {
    if (!(m.target !== o.current || m.propertyName !== "height"))
      if (r) {
        const g = gi(o);
        g === a.height ? l({}) : u({ height: g }), n();
      } else
        a.height === i && (l(s), n());
  };
  function p({ style: m = {}, refKey: g = "ref", ...h } = {}) {
    const w = h[g];
    return {
      "aria-hidden": !r,
      ...h,
      [g]: gu(o, w),
      onTransitionEnd: d,
      style: { boxSizing: "border-box", ...m, ...a }
    };
  }
  return p;
}
const Hg = {
  transitionDuration: 200,
  transitionTimingFunction: "ease",
  animateOpacity: !0
}, Iu = q((e, t) => {
  const {
    children: n,
    in: r,
    transitionDuration: o,
    transitionTimingFunction: i,
    style: s,
    onTransitionEnd: a,
    animateOpacity: c,
    ...l
  } = j("Collapse", Hg, e), u = vt(), f = hu(), p = (u.respectReducedMotion ? f : !1) ? 0 : o, m = Gg({
    opened: r,
    transitionDuration: p,
    transitionTimingFunction: i,
    onTransitionEnd: a
  });
  return p === 0 ? r ? /* @__PURE__ */ x.createElement(H, { ...l }, n) : null : /* @__PURE__ */ x.createElement(H, { ...m({ style: xs(s, u), ref: t, ...l }) }, /* @__PURE__ */ x.createElement(
    "div",
    {
      style: {
        opacity: r || !c ? 1 : 0,
        transition: c ? `opacity ${p}ms ${i}` : "none"
      }
    },
    n
  ));
});
Iu.displayName = "@mantine/core/Collapse";
const [Ug, et] = Wt(
  "ScrollArea.Root component was not found in tree"
);
function mn(e, t) {
  const n = Qt(t);
  tr(() => {
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
const qg = x.forwardRef((e, t) => {
  const { style: n, ...r } = e, o = et(), [i, s] = x.useState(0), [a, c] = x.useState(0), l = !!(i && a);
  return mn(o.scrollbarX, () => {
    var f;
    const u = ((f = o.scrollbarX) == null ? void 0 : f.offsetHeight) || 0;
    o.onCornerHeightChange(u), c(u);
  }), mn(o.scrollbarY, () => {
    var f;
    const u = ((f = o.scrollbarY) == null ? void 0 : f.offsetWidth) || 0;
    o.onCornerWidthChange(u), s(u);
  }), l ? /* @__PURE__ */ x.createElement("div", { ...r, ref: t, style: { ...n, width: i, height: a } }) : null;
}), Kg = x.forwardRef(
  (e, t) => {
    const n = et(), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ x.createElement(qg, { ...e, ref: t }) : null;
  }
), Yg = {
  scrollHideDelay: 1e3,
  type: "hover"
}, Au = ie((e, t) => {
  const n = j("ScrollAreaRoot", Yg, e), { type: r, scrollHideDelay: o, scrollbars: i, ...s } = n, [a, c] = U(null), [l, u] = U(null), [f, d] = U(null), [p, m] = U(null), [g, h] = U(null), [w, y] = U(0), [b, v] = U(0), [S, C] = U(!1), [P, E] = U(!1), O = Oe(t, (T) => c(T));
  return /* @__PURE__ */ x.createElement(
    Ug,
    {
      value: {
        type: r,
        scrollHideDelay: o,
        scrollArea: a,
        viewport: l,
        onViewportChange: u,
        content: f,
        onContentChange: d,
        scrollbarX: p,
        onScrollbarXChange: m,
        scrollbarXEnabled: S,
        onScrollbarXEnabledChange: C,
        scrollbarY: g,
        onScrollbarYChange: h,
        scrollbarYEnabled: P,
        onScrollbarYEnabledChange: E,
        onCornerWidthChange: y,
        onCornerHeightChange: v
      }
    },
    /* @__PURE__ */ x.createElement(
      H,
      {
        ...s,
        ref: O,
        __vars: {
          "--sa-corner-width": i !== "xy" ? "0px" : `${w}px`,
          "--sa-corner-height": i !== "xy" ? "0px" : `${b}px`
        }
      }
    )
  );
});
Au.displayName = "@mantine/core/ScrollAreaRoot";
function Ou(e, t) {
  const n = e / t;
  return Number.isNaN(n) ? 0 : n;
}
function lo(e) {
  const t = Ou(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function Nu(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1])
      return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Xg(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function bc(e, t, n = "ltr") {
  const r = lo(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, i = t.scrollbar.size - o, s = t.content - t.viewport, a = i - r, c = n === "ltr" ? [0, s] : [s * -1, 0], l = Xg(e, c);
  return Nu([0, s], [0, a])(l);
}
function Jg(e, t, n, r = "ltr") {
  const o = lo(n), i = o / 2, s = t || i, a = o - s, c = n.scrollbar.paddingStart + s, l = n.scrollbar.size - n.scrollbar.paddingEnd - a, u = n.content - n.viewport, f = r === "ltr" ? [0, u] : [u * -1, 0];
  return Nu([c, l], f)(e);
}
function $u(e, t) {
  return e > 0 && e < t;
}
function Mr(e) {
  return e ? parseInt(e, 10) : 0;
}
function Zt(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return (r) => {
    e == null || e(r), (n === !1 || !r.defaultPrevented) && (t == null || t(r));
  };
}
const [Qg, Tu] = Wt(
  "ScrollAreaScrollbar was not found in tree"
), Lu = ie((e, t) => {
  const {
    sizes: n,
    hasThumb: r,
    onThumbChange: o,
    onThumbPointerUp: i,
    onThumbPointerDown: s,
    onThumbPositionChange: a,
    onDragScroll: c,
    onWheelScroll: l,
    onResize: u,
    ...f
  } = e, d = et(), [p, m] = x.useState(null), g = Oe(t, (E) => m(E)), h = x.useRef(null), w = x.useRef(""), { viewport: y } = d, b = n.content - n.viewport, v = Qt(l), S = Qt(a), C = ao(u, 10), P = (E) => {
    if (h.current) {
      const O = E.clientX - h.current.left, T = E.clientY - h.current.top;
      c({ x: O, y: T });
    }
  };
  return W(() => {
    const E = (O) => {
      const T = O.target;
      (p == null ? void 0 : p.contains(T)) && v(O, b);
    };
    return document.addEventListener("wheel", E, { passive: !1 }), () => document.removeEventListener("wheel", E, { passive: !1 });
  }, [y, p, b, v]), W(S, [n, S]), mn(p, C), mn(d.content, C), /* @__PURE__ */ x.createElement(
    Qg,
    {
      value: {
        scrollbar: p,
        hasThumb: r,
        onThumbChange: Qt(o),
        onThumbPointerUp: Qt(i),
        onThumbPositionChange: S,
        onThumbPointerDown: Qt(s)
      }
    },
    /* @__PURE__ */ x.createElement(
      "div",
      {
        ...f,
        ref: g,
        style: { position: "absolute", ...f.style },
        onPointerDown: Zt(e.onPointerDown, (E) => {
          E.button === 0 && (E.target.setPointerCapture(E.pointerId), h.current = p.getBoundingClientRect(), w.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", P(E));
        }),
        onPointerMove: Zt(e.onPointerMove, P),
        onPointerUp: Zt(e.onPointerUp, (E) => {
          const O = E.target;
          O.hasPointerCapture(E.pointerId) && O.releasePointerCapture(E.pointerId), document.body.style.webkitUserSelect = w.current, h.current = null;
        })
      }
    )
  );
}), Zg = ie(
  (e, t) => {
    const { sizes: n, onSizesChange: r, style: o, ...i } = e, s = et(), [a, c] = U(), l = z(null), u = Oe(t, l, s.onScrollbarXChange);
    return W(() => {
      l.current && c(getComputedStyle(l.current));
    }, [l]), /* @__PURE__ */ x.createElement(
      Lu,
      {
        "data-orientation": "horizontal",
        ...i,
        ref: u,
        sizes: n,
        style: {
          ...o,
          "--sa-thumb-width": `${lo(n)}px`
        },
        onThumbPointerDown: (f) => e.onThumbPointerDown(f.x),
        onDragScroll: (f) => e.onDragScroll(f.x),
        onWheelScroll: (f, d) => {
          if (s.viewport) {
            const p = s.viewport.scrollLeft + f.deltaX;
            e.onWheelScroll(p), $u(p, d) && f.preventDefault();
          }
        },
        onResize: () => {
          l.current && s.viewport && a && r({
            content: s.viewport.scrollWidth,
            viewport: s.viewport.offsetWidth,
            scrollbar: {
              size: l.current.clientWidth,
              paddingStart: Mr(a.paddingLeft),
              paddingEnd: Mr(a.paddingRight)
            }
          });
        }
      }
    );
  }
), eh = ie(
  (e, t) => {
    const { sizes: n, onSizesChange: r, style: o, ...i } = e, s = et(), [a, c] = x.useState(), l = z(null), u = Oe(t, l, s.onScrollbarYChange);
    return W(() => {
      l.current && c(getComputedStyle(l.current));
    }, [l]), /* @__PURE__ */ x.createElement(
      Lu,
      {
        ...i,
        "data-orientation": "vertical",
        ref: u,
        sizes: n,
        style: {
          "--sa-thumb-height": `${lo(n)}px`,
          ...o
        },
        onThumbPointerDown: (f) => e.onThumbPointerDown(f.y),
        onDragScroll: (f) => e.onDragScroll(f.y),
        onWheelScroll: (f, d) => {
          if (s.viewport) {
            const p = s.viewport.scrollTop + f.deltaY;
            e.onWheelScroll(p), $u(p, d) && f.preventDefault();
          }
        },
        onResize: () => {
          l.current && s.viewport && a && r({
            content: s.viewport.scrollHeight,
            viewport: s.viewport.offsetHeight,
            scrollbar: {
              size: l.current.clientHeight,
              paddingStart: Mr(a.paddingTop),
              paddingEnd: Mr(a.paddingBottom)
            }
          });
        }
      }
    );
  }
), Ss = ie((e, t) => {
  const { orientation: n = "vertical", ...r } = e, { dir: o } = nr(), i = et(), s = z(null), a = z(0), [c, l] = U({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), u = Ou(c.viewport, c.content), f = {
    ...r,
    sizes: c,
    onSizesChange: l,
    hasThumb: u > 0 && u < 1,
    onThumbChange: (p) => {
      s.current = p;
    },
    onThumbPointerUp: () => {
      a.current = 0;
    },
    onThumbPointerDown: (p) => {
      a.current = p;
    }
  }, d = (p, m) => Jg(p, a.current, c, m);
  return n === "horizontal" ? /* @__PURE__ */ x.createElement(
    Zg,
    {
      ...f,
      ref: t,
      onThumbPositionChange: () => {
        if (i.viewport && s.current) {
          const p = i.viewport.scrollLeft, m = bc(p, c, o);
          s.current.style.transform = `translate3d(${m}px, 0, 0)`;
        }
      },
      onWheelScroll: (p) => {
        i.viewport && (i.viewport.scrollLeft = p);
      },
      onDragScroll: (p) => {
        i.viewport && (i.viewport.scrollLeft = d(p, o));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ x.createElement(
    eh,
    {
      ...f,
      ref: t,
      onThumbPositionChange: () => {
        if (i.viewport && s.current) {
          const p = i.viewport.scrollTop, m = bc(p, c);
          s.current.style.transform = `translate3d(0, ${m}px, 0)`;
        }
      },
      onWheelScroll: (p) => {
        i.viewport && (i.viewport.scrollTop = p);
      },
      onDragScroll: (p) => {
        i.viewport && (i.viewport.scrollTop = d(p));
      }
    }
  ) : null;
}), Mu = ie(
  (e, t) => {
    const n = et(), { forceMount: r, ...o } = e, [i, s] = U(!1), a = e.orientation === "horizontal", c = ao(() => {
      if (n.viewport) {
        const l = n.viewport.offsetWidth < n.viewport.scrollWidth, u = n.viewport.offsetHeight < n.viewport.scrollHeight;
        s(a ? l : u);
      }
    }, 10);
    return mn(n.viewport, c), mn(n.content, c), r || i ? /* @__PURE__ */ x.createElement(
      Ss,
      {
        "data-state": i ? "visible" : "hidden",
        ...o,
        ref: t
      }
    ) : null;
  }
), th = ie(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = et(), [i, s] = U(!1);
    return W(() => {
      const { scrollArea: a } = o;
      let c = 0;
      if (a) {
        const l = () => {
          window.clearTimeout(c), s(!0);
        }, u = () => {
          c = window.setTimeout(() => s(!1), o.scrollHideDelay);
        };
        return a.addEventListener("pointerenter", l), a.addEventListener("pointerleave", u), () => {
          window.clearTimeout(c), a.removeEventListener("pointerenter", l), a.removeEventListener("pointerleave", u);
        };
      }
    }, [o.scrollArea, o.scrollHideDelay]), n || i ? /* @__PURE__ */ x.createElement(
      Mu,
      {
        "data-state": i ? "visible" : "hidden",
        ...r,
        ref: t
      }
    ) : null;
  }
), nh = ie(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = et(), i = e.orientation === "horizontal", [s, a] = U("hidden"), c = ao(() => a("idle"), 100);
    return W(() => {
      if (s === "idle") {
        const l = window.setTimeout(() => a("hidden"), o.scrollHideDelay);
        return () => window.clearTimeout(l);
      }
    }, [s, o.scrollHideDelay]), W(() => {
      const { viewport: l } = o, u = i ? "scrollLeft" : "scrollTop";
      if (l) {
        let f = l[u];
        const d = () => {
          const p = l[u];
          f !== p && (a("scrolling"), c()), f = p;
        };
        return l.addEventListener("scroll", d), () => l.removeEventListener("scroll", d);
      }
    }, [o.viewport, i, c]), n || s !== "hidden" ? /* @__PURE__ */ x.createElement(
      Ss,
      {
        "data-state": s === "hidden" ? "hidden" : "visible",
        ...r,
        ref: t,
        onPointerEnter: Zt(e.onPointerEnter, () => a("interacting")),
        onPointerLeave: Zt(e.onPointerLeave, () => a("idle"))
      }
    ) : null;
  }
), yc = x.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = et(), { onScrollbarXEnabledChange: i, onScrollbarYEnabledChange: s } = o, a = e.orientation === "horizontal";
    return x.useEffect(() => (a ? i(!0) : s(!0), () => {
      a ? i(!1) : s(!1);
    }), [a, i, s]), o.type === "hover" ? /* @__PURE__ */ x.createElement(th, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ x.createElement(nh, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ x.createElement(Mu, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ x.createElement(Ss, { ...r, ref: t }) : null;
  }
);
function rh(e, t = () => {
}) {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return function o() {
    const i = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== i.left, a = n.top !== i.top;
    (s || a) && t(), n = i, r = window.requestAnimationFrame(o);
  }(), () => window.cancelAnimationFrame(r);
}
const oh = ie((e, t) => {
  const { style: n, ...r } = e, o = et(), i = Tu(), { onThumbPositionChange: s } = i, a = Oe(t, (u) => i.onThumbChange(u)), c = z(), l = ao(() => {
    c.current && (c.current(), c.current = void 0);
  }, 100);
  return W(() => {
    const { viewport: u } = o;
    if (u) {
      const f = () => {
        if (l(), !c.current) {
          const d = rh(u, s);
          c.current = d, s();
        }
      };
      return s(), u.addEventListener("scroll", f), () => u.removeEventListener("scroll", f);
    }
  }, [o.viewport, l, s]), /* @__PURE__ */ x.createElement(
    "div",
    {
      "data-state": i.hasThumb ? "visible" : "hidden",
      ...r,
      ref: a,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...n
      },
      onPointerDownCapture: Zt(e.onPointerDownCapture, (u) => {
        const d = u.target.getBoundingClientRect(), p = u.clientX - d.left, m = u.clientY - d.top;
        i.onThumbPointerDown({ x: p, y: m });
      }),
      onPointerUp: Zt(e.onPointerUp, i.onThumbPointerUp)
    }
  );
}), vc = x.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Tu();
    return n || o.hasThumb ? /* @__PURE__ */ x.createElement(oh, { ref: t, ...r }) : null;
  }
), _u = ie(
  ({ children: e, style: t, ...n }, r) => {
    const o = et(), i = Oe(r, o.onViewportChange);
    return /* @__PURE__ */ x.createElement(
      H,
      {
        ...n,
        ref: i,
        style: {
          overflowX: o.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: o.scrollbarYEnabled ? "scroll" : "hidden",
          ...t
        }
      },
      /* @__PURE__ */ x.createElement("div", { style: { minWidth: "100%", display: "table" }, ref: o.onContentChange }, e)
    );
  }
);
_u.displayName = "@mantine/core/ScrollAreaViewport";
var Cs = { root: "m-d57069b5", viewport: "m-c0783ff9", viewportInner: "m-f8f631dd", scrollbar: "m-c44ba933", thumb: "m-d8b5e363", corner: "m-21657268" };
const ku = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
}, ih = (e, { scrollbarSize: t }) => ({
  root: {
    "--scrollarea-scrollbar-size": D(t)
  }
}), rr = q((e, t) => {
  const n = j("ScrollArea", ku, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    scrollbarSize: c,
    vars: l,
    type: u,
    scrollHideDelay: f,
    viewportProps: d,
    viewportRef: p,
    onScrollPositionChange: m,
    children: g,
    offsetScrollbars: h,
    scrollbars: w,
    ...y
  } = n, [b, v] = U(!1), S = te({
    name: "ScrollArea",
    props: n,
    classes: Cs,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: l,
    varsResolver: ih
  });
  return /* @__PURE__ */ x.createElement(
    Au,
    {
      type: u === "never" ? "always" : u,
      scrollHideDelay: f,
      ref: t,
      scrollbars: w,
      ...S("root"),
      ...y
    },
    /* @__PURE__ */ x.createElement(
      _u,
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
    (w === "xy" || w === "x") && /* @__PURE__ */ x.createElement(
      yc,
      {
        ...S("scrollbar"),
        orientation: "horizontal",
        "data-hidden": u === "never" || void 0,
        forceMount: !0,
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1)
      },
      /* @__PURE__ */ x.createElement(vc, { ...S("thumb") })
    ),
    (w === "xy" || w === "y") && /* @__PURE__ */ x.createElement(
      yc,
      {
        ...S("scrollbar"),
        orientation: "vertical",
        "data-hidden": u === "never" || void 0,
        forceMount: !0,
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1)
      },
      /* @__PURE__ */ x.createElement(vc, { ...S("thumb") })
    ),
    /* @__PURE__ */ x.createElement(
      Kg,
      {
        ...S("corner"),
        "data-hovered": b || void 0,
        "data-hidden": u === "never" || void 0
      }
    )
  );
});
rr.displayName = "@mantine/core/ScrollArea";
const Es = q((e, t) => {
  const {
    children: n,
    classNames: r,
    styles: o,
    scrollbarSize: i,
    scrollHideDelay: s,
    type: a,
    dir: c,
    offsetScrollbars: l,
    viewportRef: u,
    onScrollPositionChange: f,
    unstyled: d,
    variant: p,
    viewportProps: m,
    scrollbars: g,
    style: h,
    vars: w,
    ...y
  } = j("ScrollAreaAutosize", ku, e);
  return /* @__PURE__ */ x.createElement(H, { ...y, ref: t, style: [{ display: "flex" }, h] }, /* @__PURE__ */ x.createElement(H, { style: { display: "flex", flexDirection: "column", flex: 1 } }, /* @__PURE__ */ x.createElement(
    rr,
    {
      classNames: r,
      styles: o,
      scrollHideDelay: s,
      scrollbarSize: i,
      type: a,
      dir: c,
      offsetScrollbars: l,
      viewportRef: u,
      onScrollPositionChange: f,
      unstyled: d,
      variant: p,
      viewportProps: m,
      vars: w,
      scrollbars: g
    },
    n
  )));
});
rr.classes = Cs;
Es.displayName = "@mantine/core/ScrollAreaAutosize";
Es.classes = Cs;
rr.Autosize = Es;
var Fu = { root: "m-87cf2631" };
const sh = {
  __staticSelector: "UnstyledButton"
}, Cn = an(
  (e, t) => {
    const n = j("UnstyledButton", sh, e), {
      className: r,
      component: o = "button",
      __staticSelector: i,
      unstyled: s,
      classNames: a,
      styles: c,
      style: l,
      ...u
    } = n, f = te({
      name: i,
      props: n,
      classes: Fu,
      className: r,
      style: l,
      classNames: a,
      styles: c,
      unstyled: s
    });
    return /* @__PURE__ */ x.createElement(
      H,
      {
        ...f("root", { focusable: !0 }),
        component: o,
        ref: t,
        type: o === "button" ? "button" : void 0,
        ...u
      }
    );
  }
);
Cn.classes = Fu;
Cn.displayName = "@mantine/core/UnstyledButton";
const ct = Math.min, Se = Math.max, _r = Math.round, br = Math.floor, Ft = (e) => ({
  x: e,
  y: e
}), ah = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, ch = {
  start: "end",
  end: "start"
};
function Ui(e, t, n) {
  return Se(e, ct(t, n));
}
function Ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  return e.split("-")[0];
}
function En(e) {
  return e.split("-")[1];
}
function Ps(e) {
  return e === "x" ? "y" : "x";
}
function Ds(e) {
  return e === "y" ? "height" : "width";
}
function cn(e) {
  return ["top", "bottom"].includes(lt(e)) ? "y" : "x";
}
function Rs(e) {
  return Ps(cn(e));
}
function lh(e, t, n) {
  n === void 0 && (n = !1);
  const r = En(e), o = Rs(e), i = Ds(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = kr(s)), [s, kr(s)];
}
function uh(e) {
  const t = kr(e);
  return [qi(e), t, qi(t)];
}
function qi(e) {
  return e.replace(/start|end/g, (t) => ch[t]);
}
function dh(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], i = ["top", "bottom"], s = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? i : s;
    default:
      return [];
  }
}
function fh(e, t, n, r) {
  const o = En(e);
  let i = dh(lt(e), n === "start", r);
  return o && (i = i.map((s) => s + "-" + o), t && (i = i.concat(i.map(qi)))), i;
}
function kr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => ah[t]);
}
function ph(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Is(e) {
  return typeof e != "number" ? ph(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function gn(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function wc(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const i = cn(t), s = Rs(t), a = Ds(s), c = lt(t), l = i === "y", u = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, d = r[a] / 2 - o[a] / 2;
  let p;
  switch (c) {
    case "top":
      p = {
        x: u,
        y: r.y - o.height
      };
      break;
    case "bottom":
      p = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      p = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: f
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (En(t)) {
    case "start":
      p[s] -= d * (n && l ? -1 : 1);
      break;
    case "end":
      p[s] += d * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const mh = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: s
  } = n, a = i.filter(Boolean), c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let l = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: u,
    y: f
  } = wc(l, r, c), d = r, p = {}, m = 0;
  for (let g = 0; g < a.length; g++) {
    const {
      name: h,
      fn: w
    } = a[g], {
      x: y,
      y: b,
      data: v,
      reset: S
    } = await w({
      x: u,
      y: f,
      initialPlacement: r,
      placement: d,
      strategy: o,
      middlewareData: p,
      rects: l,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (u = y ?? u, f = b ?? f, p = {
      ...p,
      [h]: {
        ...p[h],
        ...v
      }
    }, S && m <= 50) {
      m++, typeof S == "object" && (S.placement && (d = S.placement), S.rects && (l = S.rects === !0 ? await s.getElementRects({
        reference: e,
        floating: t,
        strategy: o
      }) : S.rects), {
        x: u,
        y: f
      } = wc(l, d, c)), g = -1;
      continue;
    }
  }
  return {
    x: u,
    y: f,
    placement: d,
    strategy: o,
    middlewareData: p
  };
};
async function As(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: i,
    rects: s,
    elements: a,
    strategy: c
  } = e, {
    boundary: l = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: f = "floating",
    altBoundary: d = !1,
    padding: p = 0
  } = Ct(t, e), m = Is(p), h = a[d ? f === "floating" ? "reference" : "floating" : f], w = gn(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(h))) == null || n ? h : h.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), y = f === "floating" ? {
    ...s.floating,
    x: r,
    y: o
  } : s.reference, b = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), v = await (i.isElement == null ? void 0 : i.isElement(b)) ? await (i.getScale == null ? void 0 : i.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = gn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: y,
    offsetParent: b,
    strategy: c
  }) : y);
  return {
    top: (w.top - S.top + m.top) / v.y,
    bottom: (S.bottom - w.bottom + m.bottom) / v.y,
    left: (w.left - S.left + m.left) / v.x,
    right: (S.right - w.right + m.right) / v.x
  };
}
const xc = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: i,
      platform: s,
      elements: a,
      middlewareData: c
    } = t, {
      element: l,
      padding: u = 0
    } = Ct(e, t) || {};
    if (l == null)
      return {};
    const f = Is(u), d = {
      x: n,
      y: r
    }, p = Rs(o), m = Ds(p), g = await s.getDimensions(l), h = p === "y", w = h ? "top" : "left", y = h ? "bottom" : "right", b = h ? "clientHeight" : "clientWidth", v = i.reference[m] + i.reference[p] - d[p] - i.floating[m], S = d[p] - i.reference[p], C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let P = C ? C[b] : 0;
    (!P || !await (s.isElement == null ? void 0 : s.isElement(C))) && (P = a.floating[b] || i.floating[m]);
    const E = v / 2 - S / 2, O = P / 2 - g[m] / 2 - 1, T = ct(f[w], O), $ = ct(f[y], O), M = T, _ = P - g[m] - $, A = P / 2 - g[m] / 2 + E, L = Ui(M, A, _), I = !c.arrow && En(o) != null && A != L && i.reference[m] / 2 - (A < M ? T : $) - g[m] / 2 < 0, B = I ? A < M ? A - M : A - _ : 0;
    return {
      [p]: d[p] + B,
      data: {
        [p]: L,
        centerOffset: A - L - B,
        ...I && {
          alignmentOffset: B
        }
      },
      reset: I
    };
  }
}), Bu = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: i,
        rects: s,
        initialPlacement: a,
        platform: c,
        elements: l
      } = t, {
        mainAxis: u = !0,
        crossAxis: f = !0,
        fallbackPlacements: d,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: g = !0,
        ...h
      } = Ct(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const w = lt(o), y = lt(a) === a, b = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), v = d || (y || !g ? [kr(a)] : uh(a));
      !d && m !== "none" && v.push(...fh(a, g, m, b));
      const S = [a, ...v], C = await As(t, h), P = [];
      let E = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (u && P.push(C[w]), f) {
        const M = lh(o, s, b);
        P.push(C[M[0]], C[M[1]]);
      }
      if (E = [...E, {
        placement: o,
        overflows: P
      }], !P.every((M) => M <= 0)) {
        var O, T;
        const M = (((O = i.flip) == null ? void 0 : O.index) || 0) + 1, _ = S[M];
        if (_)
          return {
            data: {
              index: M,
              overflows: E
            },
            reset: {
              placement: _
            }
          };
        let A = (T = E.filter((L) => L.overflows[0] <= 0).sort((L, I) => L.overflows[1] - I.overflows[1])[0]) == null ? void 0 : T.placement;
        if (!A)
          switch (p) {
            case "bestFit": {
              var $;
              const L = ($ = E.map((I) => [I.placement, I.overflows.filter((B) => B > 0).reduce((B, N) => B + N, 0)]).sort((I, B) => I[1] - B[1])[0]) == null ? void 0 : $[0];
              L && (A = L);
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
function ju(e) {
  const t = ct(...e.map((i) => i.left)), n = ct(...e.map((i) => i.top)), r = Se(...e.map((i) => i.right)), o = Se(...e.map((i) => i.bottom));
  return {
    x: t,
    y: n,
    width: r - t,
    height: o - n
  };
}
function gh(e) {
  const t = e.slice().sort((o, i) => o.y - i.y), n = [];
  let r = null;
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    !r || i.y - r.y > r.height / 2 ? n.push([i]) : n[n.length - 1].push(i), r = i;
  }
  return n.map((o) => gn(ju(o)));
}
const zu = function(e) {
  return e === void 0 && (e = {}), {
    name: "inline",
    options: e,
    async fn(t) {
      const {
        placement: n,
        elements: r,
        rects: o,
        platform: i,
        strategy: s
      } = t, {
        padding: a = 2,
        x: c,
        y: l
      } = Ct(e, t), u = Array.from(await (i.getClientRects == null ? void 0 : i.getClientRects(r.reference)) || []), f = gh(u), d = gn(ju(u)), p = Is(a);
      function m() {
        if (f.length === 2 && f[0].left > f[1].right && c != null && l != null)
          return f.find((h) => c > h.left - p.left && c < h.right + p.right && l > h.top - p.top && l < h.bottom + p.bottom) || d;
        if (f.length >= 2) {
          if (cn(n) === "y") {
            const T = f[0], $ = f[f.length - 1], M = lt(n) === "top", _ = T.top, A = $.bottom, L = M ? T.left : $.left, I = M ? T.right : $.right, B = I - L, N = A - _;
            return {
              top: _,
              bottom: A,
              left: L,
              right: I,
              width: B,
              height: N,
              x: L,
              y: _
            };
          }
          const h = lt(n) === "left", w = Se(...f.map((T) => T.right)), y = ct(...f.map((T) => T.left)), b = f.filter((T) => h ? T.left === y : T.right === w), v = b[0].top, S = b[b.length - 1].bottom, C = y, P = w, E = P - C, O = S - v;
          return {
            top: v,
            bottom: S,
            left: C,
            right: P,
            width: E,
            height: O,
            x: C,
            y: v
          };
        }
        return d;
      }
      const g = await i.getElementRects({
        reference: {
          getBoundingClientRect: m
        },
        floating: r.floating,
        strategy: s
      });
      return o.reference.x !== g.reference.x || o.reference.y !== g.reference.y || o.reference.width !== g.reference.width || o.reference.height !== g.reference.height ? {
        reset: {
          rects: g
        }
      } : {};
    }
  };
};
async function hh(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = lt(n), a = En(n), c = cn(n) === "y", l = ["left", "top"].includes(s) ? -1 : 1, u = i && c ? -1 : 1, f = Ct(t, e);
  let {
    mainAxis: d,
    crossAxis: p,
    alignmentAxis: m
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...f
  };
  return a && typeof m == "number" && (p = a === "end" ? m * -1 : m), c ? {
    x: p * u,
    y: d * l
  } : {
    x: d * l,
    y: p * u
  };
}
const Vu = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: i,
        placement: s,
        middlewareData: a
      } = t, c = await hh(t, e);
      return s === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: i + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, Os = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: i = !0,
        crossAxis: s = !1,
        limiter: a = {
          fn: (h) => {
            let {
              x: w,
              y
            } = h;
            return {
              x: w,
              y
            };
          }
        },
        ...c
      } = Ct(e, t), l = {
        x: n,
        y: r
      }, u = await As(t, c), f = cn(lt(o)), d = Ps(f);
      let p = l[d], m = l[f];
      if (i) {
        const h = d === "y" ? "top" : "left", w = d === "y" ? "bottom" : "right", y = p + u[h], b = p - u[w];
        p = Ui(y, p, b);
      }
      if (s) {
        const h = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", y = m + u[h], b = m - u[w];
        m = Ui(y, m, b);
      }
      const g = a.fn({
        ...t,
        [d]: p,
        [f]: m
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
}, bh = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: i,
        middlewareData: s
      } = t, {
        offset: a = 0,
        mainAxis: c = !0,
        crossAxis: l = !0
      } = Ct(e, t), u = {
        x: n,
        y: r
      }, f = cn(o), d = Ps(f);
      let p = u[d], m = u[f];
      const g = Ct(a, t), h = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const b = d === "y" ? "height" : "width", v = i.reference[d] - i.floating[b] + h.mainAxis, S = i.reference[d] + i.reference[b] - h.mainAxis;
        p < v ? p = v : p > S && (p = S);
      }
      if (l) {
        var w, y;
        const b = d === "y" ? "width" : "height", v = ["top", "left"].includes(lt(o)), S = i.reference[f] - i.floating[b] + (v && ((w = s.offset) == null ? void 0 : w[f]) || 0) + (v ? 0 : h.crossAxis), C = i.reference[f] + i.reference[b] + (v ? 0 : ((y = s.offset) == null ? void 0 : y[f]) || 0) - (v ? h.crossAxis : 0);
        m < S ? m = S : m > C && (m = C);
      }
      return {
        [d]: p,
        [f]: m
      };
    }
  };
}, yh = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: n,
        rects: r,
        platform: o,
        elements: i
      } = t, {
        apply: s = () => {
        },
        ...a
      } = Ct(e, t), c = await As(t, a), l = lt(n), u = En(n), f = cn(n) === "y", {
        width: d,
        height: p
      } = r.floating;
      let m, g;
      l === "top" || l === "bottom" ? (m = l, g = u === (await (o.isRTL == null ? void 0 : o.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (g = l, m = u === "end" ? "top" : "bottom");
      const h = p - c[m], w = d - c[g], y = !t.middlewareData.shift;
      let b = h, v = w;
      if (f) {
        const C = d - c.left - c.right;
        v = u || y ? ct(w, C) : C;
      } else {
        const C = p - c.top - c.bottom;
        b = u || y ? ct(h, C) : C;
      }
      if (y && !u) {
        const C = Se(c.left, 0), P = Se(c.right, 0), E = Se(c.top, 0), O = Se(c.bottom, 0);
        f ? v = d - 2 * (C !== 0 || P !== 0 ? C + P : Se(c.left, c.right)) : b = p - 2 * (E !== 0 || O !== 0 ? E + O : Se(c.top, c.bottom));
      }
      await s({
        ...t,
        availableWidth: v,
        availableHeight: b
      });
      const S = await o.getDimensions(i.floating);
      return d !== S.width || p !== S.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Bt(e) {
  return Wu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function je(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Rt(e) {
  var t;
  return (t = (Wu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Wu(e) {
  return e instanceof Node || e instanceof je(e).Node;
}
function Et(e) {
  return e instanceof Element || e instanceof je(e).Element;
}
function ht(e) {
  return e instanceof HTMLElement || e instanceof je(e).HTMLElement;
}
function Sc(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof je(e).ShadowRoot;
}
function or(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Qe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function vh(e) {
  return ["table", "td", "th"].includes(Bt(e));
}
function Ns(e) {
  const t = $s(), n = Qe(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function wh(e) {
  let t = hn(e);
  for (; ht(t) && !uo(t); ) {
    if (Ns(t))
      return t;
    t = hn(t);
  }
  return null;
}
function $s() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function uo(e) {
  return ["html", "body", "#document"].includes(Bt(e));
}
function Qe(e) {
  return je(e).getComputedStyle(e);
}
function fo(e) {
  return Et(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function hn(e) {
  if (Bt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Sc(e) && e.host || // Fallback.
    Rt(e)
  );
  return Sc(t) ? t.host : t;
}
function Gu(e) {
  const t = hn(e);
  return uo(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ht(t) && or(t) ? t : Gu(t);
}
function wt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Gu(e), i = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = je(o);
  return i ? t.concat(s, s.visualViewport || [], or(o) ? o : [], s.frameElement && n ? wt(s.frameElement) : []) : t.concat(o, wt(o, [], n));
}
function Hu(e) {
  const t = Qe(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ht(e), i = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, a = _r(n) !== i || _r(r) !== s;
  return a && (n = i, r = s), {
    width: n,
    height: r,
    $: a
  };
}
function Ts(e) {
  return Et(e) ? e : e.contextElement;
}
function pn(e) {
  const t = Ts(e);
  if (!ht(t))
    return Ft(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: i
  } = Hu(t);
  let s = (i ? _r(n.width) : n.width) / r, a = (i ? _r(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
const xh = /* @__PURE__ */ Ft(0);
function Uu(e) {
  const t = je(e);
  return !$s() || !t.visualViewport ? xh : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Sh(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== je(e) ? !1 : t;
}
function tn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), i = Ts(e);
  let s = Ft(1);
  t && (r ? Et(r) && (s = pn(r)) : s = pn(e));
  const a = Sh(i, n, r) ? Uu(i) : Ft(0);
  let c = (o.left + a.x) / s.x, l = (o.top + a.y) / s.y, u = o.width / s.x, f = o.height / s.y;
  if (i) {
    const d = je(i), p = r && Et(r) ? je(r) : r;
    let m = d.frameElement;
    for (; m && r && p !== d; ) {
      const g = pn(m), h = m.getBoundingClientRect(), w = Qe(m), y = h.left + (m.clientLeft + parseFloat(w.paddingLeft)) * g.x, b = h.top + (m.clientTop + parseFloat(w.paddingTop)) * g.y;
      c *= g.x, l *= g.y, u *= g.x, f *= g.y, c += y, l += b, m = je(m).frameElement;
    }
  }
  return gn({
    width: u,
    height: f,
    x: c,
    y: l
  });
}
function Ch(e) {
  let {
    rect: t,
    offsetParent: n,
    strategy: r
  } = e;
  const o = ht(n), i = Rt(n);
  if (n === i)
    return t;
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = Ft(1);
  const c = Ft(0);
  if ((o || !o && r !== "fixed") && ((Bt(n) !== "body" || or(i)) && (s = fo(n)), ht(n))) {
    const l = tn(n);
    a = pn(n), c.x = l.x + n.clientLeft, c.y = l.y + n.clientTop;
  }
  return {
    width: t.width * a.x,
    height: t.height * a.y,
    x: t.x * a.x - s.scrollLeft * a.x + c.x,
    y: t.y * a.y - s.scrollTop * a.y + c.y
  };
}
function Eh(e) {
  return Array.from(e.getClientRects());
}
function qu(e) {
  return tn(Rt(e)).left + fo(e).scrollLeft;
}
function Ph(e) {
  const t = Rt(e), n = fo(e), r = e.ownerDocument.body, o = Se(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = Se(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + qu(e);
  const a = -n.scrollTop;
  return Qe(r).direction === "rtl" && (s += Se(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: i,
    x: s,
    y: a
  };
}
function Dh(e, t) {
  const n = je(e), r = Rt(e), o = n.visualViewport;
  let i = r.clientWidth, s = r.clientHeight, a = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    const l = $s();
    (!l || l && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a,
    y: c
  };
}
function Rh(e, t) {
  const n = tn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, i = ht(e) ? pn(e) : Ft(1), s = e.clientWidth * i.x, a = e.clientHeight * i.y, c = o * i.x, l = r * i.y;
  return {
    width: s,
    height: a,
    x: c,
    y: l
  };
}
function Cc(e, t, n) {
  let r;
  if (t === "viewport")
    r = Dh(e, n);
  else if (t === "document")
    r = Ph(Rt(e));
  else if (Et(t))
    r = Rh(t, n);
  else {
    const o = Uu(e);
    r = {
      ...t,
      x: t.x - o.x,
      y: t.y - o.y
    };
  }
  return gn(r);
}
function Ku(e, t) {
  const n = hn(e);
  return n === t || !Et(n) || uo(n) ? !1 : Qe(n).position === "fixed" || Ku(n, t);
}
function Ih(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = wt(e, [], !1).filter((a) => Et(a) && Bt(a) !== "body"), o = null;
  const i = Qe(e).position === "fixed";
  let s = i ? hn(e) : e;
  for (; Et(s) && !uo(s); ) {
    const a = Qe(s), c = Ns(s);
    !c && a.position === "fixed" && (o = null), (i ? !c && !o : !c && a.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || or(s) && !c && Ku(e, s)) ? r = r.filter((u) => u !== s) : o = a, s = hn(s);
  }
  return t.set(e, r), r;
}
function Ah(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? Ih(t, this._c) : [].concat(n), r], a = s[0], c = s.reduce((l, u) => {
    const f = Cc(t, u, o);
    return l.top = Se(f.top, l.top), l.right = ct(f.right, l.right), l.bottom = ct(f.bottom, l.bottom), l.left = Se(f.left, l.left), l;
  }, Cc(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Oh(e) {
  return Hu(e);
}
function Nh(e, t, n) {
  const r = ht(t), o = Rt(t), i = n === "fixed", s = tn(e, !0, i, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Ft(0);
  if (r || !r && !i)
    if ((Bt(t) !== "body" || or(o)) && (a = fo(t)), r) {
      const l = tn(t, !0, i, t);
      c.x = l.x + t.clientLeft, c.y = l.y + t.clientTop;
    } else
      o && (c.x = qu(o));
  return {
    x: s.left + a.scrollLeft - c.x,
    y: s.top + a.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Ec(e, t) {
  return !ht(e) || Qe(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function Yu(e, t) {
  const n = je(e);
  if (!ht(e))
    return n;
  let r = Ec(e, t);
  for (; r && vh(r) && Qe(r).position === "static"; )
    r = Ec(r, t);
  return r && (Bt(r) === "html" || Bt(r) === "body" && Qe(r).position === "static" && !Ns(r)) ? n : r || wh(e) || n;
}
const $h = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: r
  } = e;
  const o = this.getOffsetParent || Yu, i = this.getDimensions;
  return {
    reference: Nh(t, await o(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await i(n)
    }
  };
};
function Th(e) {
  return Qe(e).direction === "rtl";
}
const Lh = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ch,
  getDocumentElement: Rt,
  getClippingRect: Ah,
  getOffsetParent: Yu,
  getElementRects: $h,
  getClientRects: Eh,
  getDimensions: Oh,
  getScale: pn,
  isElement: Et,
  isRTL: Th
};
function Mh(e, t) {
  let n = null, r;
  const o = Rt(e);
  function i() {
    clearTimeout(r), n && n.disconnect(), n = null;
  }
  function s(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), i();
    const {
      left: l,
      top: u,
      width: f,
      height: d
    } = e.getBoundingClientRect();
    if (a || t(), !f || !d)
      return;
    const p = br(u), m = br(o.clientWidth - (l + f)), g = br(o.clientHeight - (u + d)), h = br(l), y = {
      rootMargin: -p + "px " + -m + "px " + -g + "px " + -h + "px",
      threshold: Se(0, ct(1, c)) || 1
    };
    let b = !0;
    function v(S) {
      const C = S[0].intersectionRatio;
      if (C !== c) {
        if (!b)
          return s();
        C ? s(!1, C) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 100);
      }
      b = !1;
    }
    try {
      n = new IntersectionObserver(v, {
        ...y,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(v, y);
    }
    n.observe(e);
  }
  return s(!0), i;
}
function _h(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Ts(e), u = o || i ? [...l ? wt(l) : [], ...wt(t)] : [];
  u.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), i && w.addEventListener("resize", n);
  });
  const f = l && a ? Mh(l, n) : null;
  let d = -1, p = null;
  s && (p = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === l && p && (p.unobserve(t), cancelAnimationFrame(d), d = requestAnimationFrame(() => {
      p && p.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let m, g = c ? tn(e) : null;
  c && h();
  function h() {
    const w = tn(e);
    g && (w.x !== g.x || w.y !== g.y || w.width !== g.width || w.height !== g.height) && n(), g = w, m = requestAnimationFrame(h);
  }
  return n(), () => {
    u.forEach((w) => {
      o && w.removeEventListener("scroll", n), i && w.removeEventListener("resize", n);
    }), f && f(), p && p.disconnect(), p = null, c && cancelAnimationFrame(m);
  };
}
const kh = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Lh,
    ...n
  }, i = {
    ...o.platform,
    _c: r
  };
  return mh(e, t, {
    ...o,
    platform: i
  });
}, Xu = (e) => {
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
      return r && t(r) ? r.current != null ? xc({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? xc({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
};
var Dr = typeof document < "u" ? oo : W;
function Fr(e, t) {
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
        if (!Fr(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const i = o[r];
      if (!(i === "_owner" && e.$$typeof) && !Fr(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Ju(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Pc(e, t) {
  const n = Ju(e);
  return Math.round(t * n) / n;
}
function Dc(e) {
  const t = R.useRef(e);
  return Dr(() => {
    t.current = e;
  }), t;
}
function Fh(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: i,
      floating: s
    } = {},
    transform: a = !0,
    whileElementsMounted: c,
    open: l
  } = e, [u, f] = R.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [d, p] = R.useState(r);
  Fr(d, r) || p(r);
  const [m, g] = R.useState(null), [h, w] = R.useState(null), y = R.useCallback((I) => {
    I != C.current && (C.current = I, g(I));
  }, [g]), b = R.useCallback((I) => {
    I !== P.current && (P.current = I, w(I));
  }, [w]), v = i || m, S = s || h, C = R.useRef(null), P = R.useRef(null), E = R.useRef(u), O = Dc(c), T = Dc(o), $ = R.useCallback(() => {
    if (!C.current || !P.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: d
    };
    T.current && (I.platform = T.current), kh(C.current, P.current, I).then((B) => {
      const N = {
        ...B,
        isPositioned: !0
      };
      M.current && !Fr(E.current, N) && (E.current = N, am.flushSync(() => {
        f(N);
      }));
    });
  }, [d, t, n, T]);
  Dr(() => {
    l === !1 && E.current.isPositioned && (E.current.isPositioned = !1, f((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const M = R.useRef(!1);
  Dr(() => (M.current = !0, () => {
    M.current = !1;
  }), []), Dr(() => {
    if (v && (C.current = v), S && (P.current = S), v && S) {
      if (O.current)
        return O.current(v, S, $);
      $();
    }
  }, [v, S, $, O]);
  const _ = R.useMemo(() => ({
    reference: C,
    floating: P,
    setReference: y,
    setFloating: b
  }), [y, b]), A = R.useMemo(() => ({
    reference: v,
    floating: S
  }), [v, S]), L = R.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!A.floating)
      return I;
    const B = Pc(A.floating, u.x), N = Pc(A.floating, u.y);
    return a ? {
      ...I,
      transform: "translate(" + B + "px, " + N + "px)",
      ...Ju(A.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: B,
      top: N
    };
  }, [n, a, A.floating, u.x, u.y]);
  return R.useMemo(() => ({
    ...u,
    update: $,
    refs: _,
    elements: A,
    floatingStyles: L
  }), [u, $, _, A, L]);
}
var xt = typeof document < "u" ? oo : W;
let hi = !1, Bh = 0;
const Rc = () => "floating-ui-" + Bh++;
function jh() {
  const [e, t] = R.useState(() => hi ? Rc() : void 0);
  return xt(() => {
    e == null && t(Rc());
  }, []), R.useEffect(() => {
    hi || (hi = !0);
  }, []), e;
}
const zh = R[/* @__PURE__ */ "useId".toString()], Qu = zh || jh;
function Vh() {
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
const Wh = /* @__PURE__ */ R.createContext(null), Gh = /* @__PURE__ */ R.createContext(null), Zu = () => {
  var e;
  return ((e = R.useContext(Wh)) == null ? void 0 : e.id) || null;
}, Ls = () => R.useContext(Gh);
function Nt(e) {
  return (e == null ? void 0 : e.ownerDocument) || document;
}
function Hh() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function Uh() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((t) => {
    let {
      brand: n,
      version: r
    } = t;
    return n + "/" + r;
  }).join(" ") : navigator.userAgent;
}
function po(e) {
  return Nt(e).defaultView || window;
}
function ft(e) {
  return e ? e instanceof Element || e instanceof po(e).Element : !1;
}
function ed(e) {
  return e ? e instanceof HTMLElement || e instanceof po(e).HTMLElement : !1;
}
function qh(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = po(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Kh(e) {
  if (e.mozInputSource === 0 && e.isTrusted)
    return !0;
  const t = /Android/i;
  return (t.test(Hh()) || t.test(Uh())) && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Yh(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType !== "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0;
}
function td(e, t) {
  const n = ["mouse", "pen"];
  return t || n.push("", void 0), n.includes(e);
}
function Xh(e) {
  return "nativeEvent" in e;
}
function Ki(e, t) {
  if (!e || !t)
    return !1;
  const n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && qh(n)) {
    let r = t;
    for (; r; ) {
      if (e === r)
        return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function nd(e) {
  return "data-floating-ui-" + e;
}
function Ic(e) {
  const t = z(e);
  return xt(() => {
    t.current = e;
  }), t;
}
const Ac = /* @__PURE__ */ nd("safe-polygon");
function Rr(e, t, n) {
  return n && !td(n) ? 0 : typeof e == "number" ? e : e == null ? void 0 : e[t];
}
function Jh(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    events: i,
    elements: {
      domReference: s,
      floating: a
    },
    refs: c
  } = e, {
    enabled: l = !0,
    delay: u = 0,
    handleClose: f = null,
    mouseOnly: d = !1,
    restMs: p = 0,
    move: m = !0
  } = t, g = Ls(), h = Zu(), w = Ic(f), y = Ic(u), b = R.useRef(), v = R.useRef(), S = R.useRef(), C = R.useRef(), P = R.useRef(!0), E = R.useRef(!1), O = R.useRef(() => {
  }), T = R.useCallback(() => {
    var A;
    const L = (A = o.current.openEvent) == null ? void 0 : A.type;
    return (L == null ? void 0 : L.includes("mouse")) && L !== "mousedown";
  }, [o]);
  R.useEffect(() => {
    if (!l)
      return;
    function A() {
      clearTimeout(v.current), clearTimeout(C.current), P.current = !0;
    }
    return i.on("dismiss", A), () => {
      i.off("dismiss", A);
    };
  }, [l, i]), R.useEffect(() => {
    if (!l || !w.current || !n)
      return;
    function A(I) {
      T() && r(!1, I);
    }
    const L = Nt(a).documentElement;
    return L.addEventListener("mouseleave", A), () => {
      L.removeEventListener("mouseleave", A);
    };
  }, [a, n, r, l, w, o, T]);
  const $ = R.useCallback(function(A, L) {
    L === void 0 && (L = !0);
    const I = Rr(y.current, "close", b.current);
    I && !S.current ? (clearTimeout(v.current), v.current = setTimeout(() => r(!1, A), I)) : L && (clearTimeout(v.current), r(!1, A));
  }, [y, r]), M = R.useCallback(() => {
    O.current(), S.current = void 0;
  }, []), _ = R.useCallback(() => {
    if (E.current) {
      const A = Nt(c.floating.current).body;
      A.style.pointerEvents = "", A.removeAttribute(Ac), E.current = !1;
    }
  }, [c]);
  return R.useEffect(() => {
    if (!l)
      return;
    function A() {
      return o.current.openEvent ? ["click", "mousedown"].includes(o.current.openEvent.type) : !1;
    }
    function L(N) {
      if (clearTimeout(v.current), P.current = !1, d && !td(b.current) || p > 0 && Rr(y.current, "open") === 0)
        return;
      const G = Rr(y.current, "open", b.current);
      G ? v.current = setTimeout(() => {
        r(!0, N);
      }, G) : r(!0, N);
    }
    function I(N) {
      if (A())
        return;
      O.current();
      const G = Nt(a);
      if (clearTimeout(C.current), w.current) {
        n || clearTimeout(v.current), S.current = w.current({
          ...e,
          tree: g,
          x: N.clientX,
          y: N.clientY,
          onClose() {
            _(), M(), $(N);
          }
        });
        const ne = S.current;
        G.addEventListener("mousemove", ne), O.current = () => {
          G.removeEventListener("mousemove", ne);
        };
        return;
      }
      (b.current === "touch" ? !Ki(a, N.relatedTarget) : !0) && $(N);
    }
    function B(N) {
      A() || w.current == null || w.current({
        ...e,
        tree: g,
        x: N.clientX,
        y: N.clientY,
        onClose() {
          _(), M(), $(N);
        }
      })(N);
    }
    if (ft(s)) {
      const N = s;
      return n && N.addEventListener("mouseleave", B), a == null || a.addEventListener("mouseleave", B), m && N.addEventListener("mousemove", L, {
        once: !0
      }), N.addEventListener("mouseenter", L), N.addEventListener("mouseleave", I), () => {
        n && N.removeEventListener("mouseleave", B), a == null || a.removeEventListener("mouseleave", B), m && N.removeEventListener("mousemove", L), N.removeEventListener("mouseenter", L), N.removeEventListener("mouseleave", I);
      };
    }
  }, [s, a, l, e, d, p, m, $, M, _, r, n, g, y, w, o]), xt(() => {
    var A;
    if (l && n && (A = w.current) != null && A.__options.blockPointerEvents && T()) {
      const B = Nt(a).body;
      if (B.setAttribute(Ac, ""), B.style.pointerEvents = "none", E.current = !0, ft(s) && a) {
        var L, I;
        const N = s, G = g == null || (L = g.nodesRef.current.find((X) => X.id === h)) == null || (I = L.context) == null ? void 0 : I.elements.floating;
        return G && (G.style.pointerEvents = ""), N.style.pointerEvents = "auto", a.style.pointerEvents = "auto", () => {
          N.style.pointerEvents = "", a.style.pointerEvents = "";
        };
      }
    }
  }, [l, n, h, a, s, g, w, o, T]), xt(() => {
    n || (b.current = void 0, M(), _());
  }, [n, M, _]), R.useEffect(() => () => {
    M(), clearTimeout(v.current), clearTimeout(C.current), _();
  }, [l, M, _]), R.useMemo(() => {
    if (!l)
      return {};
    function A(L) {
      b.current = L.pointerType;
    }
    return {
      reference: {
        onPointerDown: A,
        onPointerEnter: A,
        onMouseMove(L) {
          n || p === 0 || (clearTimeout(C.current), C.current = setTimeout(() => {
            P.current || r(!0, L.nativeEvent);
          }, p));
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(v.current);
        },
        onMouseLeave(L) {
          i.emit("dismiss", {
            type: "mouseLeave",
            data: {
              returnFocus: !1
            }
          }), $(L.nativeEvent, !1);
        }
      }
    };
  }, [i, l, p, n, r, $]);
}
const rd = /* @__PURE__ */ R.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: () => {
  },
  setState: () => {
  },
  isInstantPhase: !1
}), od = () => R.useContext(rd), Qh = (e) => {
  let {
    children: t,
    delay: n,
    timeoutMs: r = 0
  } = e;
  const [o, i] = R.useReducer((c, l) => ({
    ...c,
    ...l
  }), {
    delay: n,
    timeoutMs: r,
    initialDelay: n,
    currentId: null,
    isInstantPhase: !1
  }), s = R.useRef(null), a = R.useCallback((c) => {
    i({
      currentId: c
    });
  }, []);
  return xt(() => {
    o.currentId ? s.current === null ? s.current = o.currentId : i({
      isInstantPhase: !0
    }) : (i({
      isInstantPhase: !1
    }), s.current = null);
  }, [o.currentId]), /* @__PURE__ */ R.createElement(rd.Provider, {
    value: R.useMemo(() => ({
      ...o,
      setState: i,
      setCurrentId: a
    }), [o, i, a])
  }, t);
}, Zh = (e, t) => {
  let {
    open: n,
    onOpenChange: r
  } = e, {
    id: o
  } = t;
  const {
    currentId: i,
    setCurrentId: s,
    initialDelay: a,
    setState: c,
    timeoutMs: l
  } = od();
  xt(() => {
    i && (c({
      delay: {
        open: 1,
        close: Rr(a, "close")
      }
    }), i !== o && r(!1));
  }, [o, r, c, i, a]), xt(() => {
    function u() {
      r(!1), c({
        delay: a,
        currentId: null
      });
    }
    if (!n && i === o)
      if (l) {
        const f = window.setTimeout(u, l);
        return () => {
          clearTimeout(f);
        };
      } else
        u();
  }, [n, c, i, o, r, a, l]), xt(() => {
    n && s(o);
  }, [n, s, o]);
};
function eb(e) {
  let t = e.activeElement;
  for (; ((n = t) == null || (r = n.shadowRoot) == null ? void 0 : r.activeElement) != null; ) {
    var n, r;
    t = t.shadowRoot.activeElement;
  }
  return t;
}
function bi(e, t) {
  let n = e.filter((o) => {
    var i;
    return o.parentId === t && ((i = o.context) == null ? void 0 : i.open);
  }), r = n;
  for (; r.length; )
    r = e.filter((o) => {
      var i;
      return (i = r) == null ? void 0 : i.some((s) => {
        var a;
        return o.parentId === s.id && ((a = o.context) == null ? void 0 : a.open);
      });
    }), n = n.concat(r);
  return n;
}
function tb(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const nb = R[/* @__PURE__ */ "useInsertionEffect".toString()], rb = nb || ((e) => e());
function Ir(e) {
  const t = R.useRef(() => {
  });
  return rb(() => {
    t.current = e;
  }), R.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return t.current == null ? void 0 : t.current(...r);
  }, []);
}
function Ar(e, t) {
  if (t == null)
    return !1;
  if ("composedPath" in e)
    return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
const ob = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, ib = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, sb = (e) => {
  var t, n;
  return {
    escapeKeyBubbles: typeof e == "boolean" ? e : (t = e == null ? void 0 : e.escapeKey) != null ? t : !1,
    outsidePressBubbles: typeof e == "boolean" ? e : (n = e == null ? void 0 : e.outsidePress) != null ? n : !0
  };
};
function ab(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    events: o,
    nodeId: i,
    elements: {
      reference: s,
      domReference: a,
      floating: c
    },
    dataRef: l
  } = e, {
    enabled: u = !0,
    escapeKey: f = !0,
    outsidePress: d = !0,
    outsidePressEvent: p = "pointerdown",
    referencePress: m = !1,
    referencePressEvent: g = "pointerdown",
    ancestorScroll: h = !1,
    bubbles: w
  } = t, y = Ls(), b = Zu() != null, v = Ir(typeof d == "function" ? d : () => !1), S = typeof d == "function" ? v : d, C = R.useRef(!1), {
    escapeKeyBubbles: P,
    outsidePressBubbles: E
  } = sb(w), O = Ir(($) => {
    if (!n || !u || !f || $.key !== "Escape")
      return;
    const M = y ? bi(y.nodesRef.current, i) : [];
    if (!P && ($.stopPropagation(), M.length > 0)) {
      let _ = !0;
      if (M.forEach((A) => {
        var L;
        if ((L = A.context) != null && L.open && !A.context.dataRef.current.__escapeKeyBubbles) {
          _ = !1;
          return;
        }
      }), !_)
        return;
    }
    o.emit("dismiss", {
      type: "escapeKey",
      data: {
        returnFocus: {
          preventScroll: !1
        }
      }
    }), r(!1, Xh($) ? $.nativeEvent : $);
  }), T = Ir(($) => {
    const M = C.current;
    if (C.current = !1, M || typeof S == "function" && !S($))
      return;
    const _ = tb($);
    if (ed(_) && c) {
      const I = _.clientWidth > 0 && _.scrollWidth > _.clientWidth, B = _.clientHeight > 0 && _.scrollHeight > _.clientHeight;
      let N = B && $.offsetX > _.clientWidth;
      if (B && po(c).getComputedStyle(_).direction === "rtl" && (N = $.offsetX <= _.offsetWidth - _.clientWidth), N || I && $.offsetY > _.clientHeight)
        return;
    }
    const A = y && bi(y.nodesRef.current, i).some((I) => {
      var B;
      return Ar($, (B = I.context) == null ? void 0 : B.elements.floating);
    });
    if (Ar($, c) || Ar($, a) || A)
      return;
    const L = y ? bi(y.nodesRef.current, i) : [];
    if (L.length > 0) {
      let I = !0;
      if (L.forEach((B) => {
        var N;
        if ((N = B.context) != null && N.open && !B.context.dataRef.current.__outsidePressBubbles) {
          I = !1;
          return;
        }
      }), !I)
        return;
    }
    o.emit("dismiss", {
      type: "outsidePress",
      data: {
        returnFocus: b ? {
          preventScroll: !0
        } : Kh($) || Yh($)
      }
    }), r(!1, $);
  });
  return R.useEffect(() => {
    if (!n || !u)
      return;
    l.current.__escapeKeyBubbles = P, l.current.__outsidePressBubbles = E;
    function $(A) {
      r(!1, A);
    }
    const M = Nt(c);
    f && M.addEventListener("keydown", O), S && M.addEventListener(p, T);
    let _ = [];
    return h && (ft(a) && (_ = wt(a)), ft(c) && (_ = _.concat(wt(c))), !ft(s) && s && s.contextElement && (_ = _.concat(wt(s.contextElement)))), _ = _.filter((A) => {
      var L;
      return A !== ((L = M.defaultView) == null ? void 0 : L.visualViewport);
    }), _.forEach((A) => {
      A.addEventListener("scroll", $, {
        passive: !0
      });
    }), () => {
      f && M.removeEventListener("keydown", O), S && M.removeEventListener(p, T), _.forEach((A) => {
        A.removeEventListener("scroll", $);
      });
    };
  }, [l, c, a, s, f, S, p, n, r, h, u, P, E, O, T]), R.useEffect(() => {
    C.current = !1;
  }, [S, p]), R.useMemo(() => u ? {
    reference: {
      onKeyDown: O,
      [ob[g]]: ($) => {
        m && (o.emit("dismiss", {
          type: "referencePress",
          data: {
            returnFocus: !1
          }
        }), r(!1, $.nativeEvent));
      }
    },
    floating: {
      onKeyDown: O,
      [ib[p]]: () => {
        C.current = !0;
      }
    }
  } : {}, [u, o, m, p, g, r, O]);
}
function Ms(e) {
  var t;
  e === void 0 && (e = {});
  const {
    open: n = !1,
    onOpenChange: r,
    nodeId: o
  } = e, [i, s] = R.useState(null), a = ((t = e.elements) == null ? void 0 : t.reference) || i, c = Fh(e), l = Ls(), u = Ir((v, S) => {
    v && (d.current.openEvent = S), r == null || r(v, S);
  }), f = R.useRef(null), d = R.useRef({}), p = R.useState(() => Vh())[0], m = Qu(), g = R.useCallback((v) => {
    const S = ft(v) ? {
      getBoundingClientRect: () => v.getBoundingClientRect(),
      contextElement: v
    } : v;
    c.refs.setReference(S);
  }, [c.refs]), h = R.useCallback((v) => {
    (ft(v) || v === null) && (f.current = v, s(v)), (ft(c.refs.reference.current) || c.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    v !== null && !ft(v)) && c.refs.setReference(v);
  }, [c.refs]), w = R.useMemo(() => ({
    ...c.refs,
    setReference: h,
    setPositionReference: g,
    domReference: f
  }), [c.refs, h, g]), y = R.useMemo(() => ({
    ...c.elements,
    domReference: a
  }), [c.elements, a]), b = R.useMemo(() => ({
    ...c,
    refs: w,
    elements: y,
    dataRef: d,
    nodeId: o,
    floatingId: m,
    events: p,
    open: n,
    onOpenChange: u
  }), [c, o, m, p, n, u, w, y]);
  return xt(() => {
    const v = l == null ? void 0 : l.nodesRef.current.find((S) => S.id === o);
    v && (v.context = b);
  }), R.useMemo(() => ({
    ...c,
    context: b,
    refs: w,
    elements: y
  }), [c, w, y, b]);
}
function cb(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    onOpenChange: r,
    dataRef: o,
    events: i,
    refs: s,
    elements: {
      floating: a,
      domReference: c
    }
  } = e, {
    enabled: l = !0,
    keyboardOnly: u = !0
  } = t, f = R.useRef(""), d = R.useRef(!1), p = R.useRef();
  return R.useEffect(() => {
    if (!l)
      return;
    const g = Nt(a).defaultView || window;
    function h() {
      !n && ed(c) && c === eb(Nt(c)) && (d.current = !0);
    }
    return g.addEventListener("blur", h), () => {
      g.removeEventListener("blur", h);
    };
  }, [a, c, n, l]), R.useEffect(() => {
    if (!l)
      return;
    function m(g) {
      (g.type === "referencePress" || g.type === "escapeKey") && (d.current = !0);
    }
    return i.on("dismiss", m), () => {
      i.off("dismiss", m);
    };
  }, [i, l]), R.useEffect(() => () => {
    clearTimeout(p.current);
  }, []), R.useMemo(() => l ? {
    reference: {
      onPointerDown(m) {
        let {
          pointerType: g
        } = m;
        f.current = g, d.current = !!(g && u);
      },
      onMouseLeave() {
        d.current = !1;
      },
      onFocus(m) {
        var g;
        d.current || m.type === "focus" && ((g = o.current.openEvent) == null ? void 0 : g.type) === "mousedown" && Ar(o.current.openEvent, c) || r(!0, m.nativeEvent);
      },
      onBlur(m) {
        d.current = !1;
        const g = m.relatedTarget, h = ft(g) && g.hasAttribute(nd("focus-guard")) && g.getAttribute("data-type") === "outside";
        p.current = setTimeout(() => {
          Ki(s.floating.current, g) || Ki(c, g) || h || r(!1, m.nativeEvent);
        });
      }
    }
  } : {}, [l, u, c, s, o, r]);
}
function yi(e, t, n) {
  const r = /* @__PURE__ */ new Map();
  return {
    ...n === "floating" && {
      tabIndex: -1
    },
    ...e,
    ...t.map((o) => o ? o[n] : null).concat(e).reduce((o, i) => (i && Object.entries(i).forEach((s) => {
      let [a, c] = s;
      if (a.indexOf("on") === 0) {
        if (r.has(a) || r.set(a, []), typeof c == "function") {
          var l;
          (l = r.get(a)) == null || l.push(c), o[a] = function() {
            for (var u, f = arguments.length, d = new Array(f), p = 0; p < f; p++)
              d[p] = arguments[p];
            return (u = r.get(a)) == null ? void 0 : u.map((m) => m(...d)).find((m) => m !== void 0);
          };
        }
      } else
        o[a] = c;
    }), o), {})
  };
}
function lb(e) {
  e === void 0 && (e = []);
  const t = e, n = R.useCallback(
    (i) => yi(i, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), r = R.useCallback(
    (i) => yi(i, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o = R.useCallback(
    (i) => yi(i, e, "item"),
    // Granularly check for `item` changes, because the `getItemProps` getter
    // should be as referentially stable as possible since it may be passed as
    // a prop to many components. All `item` key values must therefore be
    // memoized.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    e.map((i) => i == null ? void 0 : i.item)
  );
  return R.useMemo(() => ({
    getReferenceProps: n,
    getFloatingProps: r,
    getItemProps: o
  }), [n, r, o]);
}
function ub(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    floatingId: r
  } = e, {
    enabled: o = !0,
    role: i = "dialog"
  } = t, s = Qu();
  return R.useMemo(() => {
    const a = {
      id: r,
      role: i
    };
    return o ? i === "tooltip" ? {
      reference: {
        "aria-describedby": n ? r : void 0
      },
      floating: a
    } : {
      reference: {
        "aria-expanded": n ? "true" : "false",
        "aria-haspopup": i === "alertdialog" ? "dialog" : i,
        "aria-controls": n ? r : void 0,
        ...i === "listbox" && {
          role: "combobox"
        },
        ...i === "menu" && {
          id: s
        }
      },
      floating: {
        ...a,
        ...i === "menu" && {
          "aria-labelledby": s
        }
      }
    } : {};
  }, [o, i, n, r, s]);
}
function id(e, t) {
  if (e === "rtl" && (t.includes("right") || t.includes("left"))) {
    const [n, r] = t.split("-"), o = n === "right" ? "left" : "right";
    return r === void 0 ? o : `${o}-${r}`;
  }
  return t;
}
function Oc(e, t, n, r) {
  return e === "center" || r === "center" ? { top: t } : e === "end" ? { bottom: n } : e === "start" ? { top: n } : {};
}
function Nc(e, t, n, r, o) {
  return e === "center" || r === "center" ? { left: t } : e === "end" ? { [o === "ltr" ? "right" : "left"]: n } : e === "start" ? { [o === "ltr" ? "left" : "right"]: n } : {};
}
const db = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function fb({
  position: e,
  arrowSize: t,
  arrowOffset: n,
  arrowRadius: r,
  arrowPosition: o,
  arrowX: i,
  arrowY: s,
  dir: a
}) {
  const [c, l = "center"] = e.split("-"), u = {
    width: D(t),
    height: D(t),
    transform: "rotate(45deg)",
    position: "absolute",
    [db[c]]: D(r)
  }, f = D(-t / 2);
  return c === "left" ? {
    ...u,
    ...Oc(l, s, n, o),
    right: f,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  } : c === "right" ? {
    ...u,
    ...Oc(l, s, n, o),
    left: f,
    borderRightColor: "transparent",
    borderTopColor: "transparent"
  } : c === "top" ? {
    ...u,
    ...Nc(l, i, n, o, a),
    bottom: f,
    borderTopColor: "transparent",
    borderLeftColor: "transparent"
  } : c === "bottom" ? {
    ...u,
    ...Nc(l, i, n, o, a),
    top: f,
    borderBottomColor: "transparent",
    borderRightColor: "transparent"
  } : {};
}
const _s = ie(
  ({
    position: e,
    arrowSize: t,
    arrowOffset: n,
    arrowRadius: r,
    arrowPosition: o,
    visible: i,
    arrowX: s,
    arrowY: a,
    style: c,
    ...l
  }, u) => {
    const { dir: f } = nr();
    return i ? /* @__PURE__ */ x.createElement(
      "div",
      {
        ...l,
        ref: u,
        style: {
          ...c,
          ...fb({
            position: e,
            arrowSize: t,
            arrowOffset: n,
            arrowRadius: r,
            arrowPosition: o,
            dir: f,
            arrowX: s,
            arrowY: a
          })
        }
      }
    ) : null;
  }
);
_s.displayName = "@mantine/core/FloatingArrow";
const [pb, sd] = Wt(
  "Popover component was not found in the tree"
);
function ad({
  children: e,
  active: t = !0,
  refProp: n = "ref"
}) {
  const r = jm(t), o = Oe(r, e == null ? void 0 : e.ref);
  return Vt(e) ? sn(e, { [n]: o }) : e;
}
ad.displayName = "@mantine/core/FocusTrap";
function mb(e) {
  const t = document.createElement("div");
  return t.setAttribute("data-portal", "true"), typeof e.className == "string" && t.classList.add(...e.className.split(" ").filter(Boolean)), typeof e.style == "object" && Object.assign(t.style, e.style), typeof e.id == "string" && t.setAttribute("id", e.id), t;
}
const gb = {}, cd = ie((e, t) => {
  const { children: n, target: r, ...o } = j("Portal", gb, e), [i, s] = U(!1), a = z(null);
  return tr(() => (s(!0), a.current = r ? typeof r == "string" ? document.querySelector(r) : r : mb(o), mu(t, a.current), !r && a.current && document.body.appendChild(a.current), () => {
    !r && a.current && document.body.removeChild(a.current);
  }), [r]), !i || !a.current ? null : cm(/* @__PURE__ */ x.createElement(x.Fragment, null, n), a.current);
});
cd.displayName = "@mantine/core/Portal";
function mo({ withinPortal: e = !0, children: t, ...n }) {
  return e ? /* @__PURE__ */ x.createElement(cd, { ...n }, t) : /* @__PURE__ */ x.createElement(x.Fragment, null, t);
}
mo.displayName = "@mantine/core/OptionalPortal";
const $n = (e) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${D(e === "bottom" ? 10 : -10)})` },
  transitionProperty: "transform, opacity"
}), yr = {
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
    ...$n("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...$n("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...$n("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...$n("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...$n("top"),
    common: { transformOrigin: "top right" }
  }
}, $c = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function hb({
  transition: e,
  state: t,
  duration: n,
  timingFunction: r
}) {
  const o = {
    transitionDuration: `${n}ms`,
    transitionTimingFunction: r
  };
  return typeof e == "string" ? e in yr ? {
    transitionProperty: yr[e].transitionProperty,
    ...o,
    ...yr[e].common,
    ...yr[e][$c[t]]
  } : {} : {
    transitionProperty: e.transitionProperty,
    ...o,
    ...e.common,
    ...e[$c[t]]
  };
}
function bb({
  duration: e,
  exitDuration: t,
  timingFunction: n,
  mounted: r,
  onEnter: o,
  onExit: i,
  onEntered: s,
  onExited: a
}) {
  const c = vt(), l = hu(), u = c.respectReducedMotion ? l : !1, [f, d] = U(u ? 0 : e), [p, m] = U(r ? "entered" : "exited"), g = z(-1), h = (w) => {
    const y = w ? o : i, b = w ? s : a;
    m(w ? "pre-entering" : "pre-exiting"), window.clearTimeout(g.current);
    const v = u ? 0 : w ? e : t;
    if (d(v), v === 0)
      typeof y == "function" && y(), typeof b == "function" && b(), m(w ? "entered" : "exited");
    else {
      const S = window.setTimeout(() => {
        typeof y == "function" && y(), m(w ? "entering" : "exiting");
      }, 10);
      g.current = window.setTimeout(() => {
        window.clearTimeout(S), typeof b == "function" && b(), m(w ? "entered" : "exited");
      }, v);
    }
  };
  return Mt(() => {
    h(r);
  }, [r]), W(() => () => window.clearTimeout(g.current), []), {
    transitionDuration: f,
    transitionStatus: p,
    transitionTimingFunction: n || "ease"
  };
}
function ks({
  keepMounted: e,
  transition: t = "fade",
  duration: n = 250,
  exitDuration: r = n,
  mounted: o,
  children: i,
  timingFunction: s = "ease",
  onExit: a,
  onEntered: c,
  onEnter: l,
  onExited: u
}) {
  const { transitionDuration: f, transitionStatus: d, transitionTimingFunction: p } = bb({
    mounted: o,
    exitDuration: r,
    duration: n,
    timingFunction: s,
    onExit: a,
    onEntered: c,
    onEnter: l,
    onExited: u
  });
  return f === 0 ? o ? /* @__PURE__ */ x.createElement(x.Fragment, null, i({})) : e ? i({ display: "none" }) : null : d === "exited" ? e ? i({ display: "none" }) : null : /* @__PURE__ */ x.createElement(x.Fragment, null, i(
    hb({
      transition: t,
      duration: f,
      state: d,
      timingFunction: p
    })
  ));
}
ks.displayName = "@mantine/core/Transition";
var ld = { dropdown: "m-38a85659", arrow: "m-a31dc6c1" };
const yb = {}, Fs = q((e, t) => {
  var h, w, y, b;
  const n = j("PopoverDropdown", yb, e), {
    className: r,
    style: o,
    vars: i,
    children: s,
    onKeyDownCapture: a,
    variant: c,
    classNames: l,
    styles: u,
    ...f
  } = n, d = sd(), p = Tm({
    opened: d.opened,
    shouldReturnFocus: d.returnFocus
  }), m = d.withRoles ? {
    "aria-labelledby": d.getTargetId(),
    id: d.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {}, g = Oe(t, d.floating);
  return d.disabled ? null : /* @__PURE__ */ x.createElement(mo, { ...d.portalProps, withinPortal: d.withinPortal }, /* @__PURE__ */ x.createElement(
    ks,
    {
      mounted: d.opened,
      ...d.transitionProps,
      transition: ((h = d.transitionProps) == null ? void 0 : h.transition) || "fade",
      duration: ((w = d.transitionProps) == null ? void 0 : w.duration) ?? 150,
      keepMounted: d.keepMounted,
      exitDuration: typeof ((y = d.transitionProps) == null ? void 0 : y.exitDuration) == "number" ? d.transitionProps.exitDuration : (b = d.transitionProps) == null ? void 0 : b.duration
    },
    (v) => /* @__PURE__ */ x.createElement(ad, { active: d.trapFocus }, /* @__PURE__ */ x.createElement(
      H,
      {
        ...m,
        ...f,
        variant: c,
        ref: g,
        onKeyDownCapture: Em(d.onClose, {
          active: d.closeOnEscape,
          onTrigger: p,
          onKeyDown: a
        }),
        "data-position": d.placement,
        ...d.getStyles("dropdown", {
          className: r,
          props: n,
          classNames: l,
          styles: u,
          style: [
            {
              ...v,
              zIndex: d.zIndex,
              top: d.y ?? 0,
              left: d.x ?? 0,
              width: d.width === "target" ? void 0 : D(d.width)
            },
            o
          ]
        })
      },
      s,
      /* @__PURE__ */ x.createElement(
        _s,
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
            classNames: l,
            styles: u
          })
        }
      )
    ))
  ));
});
Fs.classes = ld;
Fs.displayName = "@mantine/core/PopoverDropdown";
const vb = {
  refProp: "ref",
  popupType: "dialog"
}, ud = q((e, t) => {
  const { children: n, refProp: r, popupType: o, ...i } = j(
    "PopoverTarget",
    vb,
    e
  );
  if (!Vt(n))
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const s = i, a = sd(), c = Oe(a.reference, n.ref, t), l = a.withRoles ? {
    "aria-haspopup": o,
    "aria-expanded": a.opened,
    "aria-controls": a.getDropdownId(),
    id: a.getTargetId()
  } : {};
  return sn(n, {
    ...s,
    ...l,
    ...a.targetProps,
    className: yt(a.targetProps.className, s.className, n.props.className),
    [r]: c,
    ...a.controlled ? null : { onClick: a.onToggle }
  });
});
ud.displayName = "@mantine/core/PopoverTarget";
function dd({
  opened: e,
  floating: t,
  position: n,
  positionDependencies: r
}) {
  const [o, i] = U(0);
  W(() => {
    if (t.refs.reference.current && t.refs.floating.current)
      return _h(
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
  ]), Mt(() => {
    t.update();
  }, r), Mt(() => {
    i((s) => s + 1);
  }, [e]);
}
function wb(e, t) {
  var r, o, i, s;
  const n = [Vu(e.offset)];
  return (r = e.middlewares) != null && r.shift && n.push(Os({ limiter: bh() })), (o = e.middlewares) != null && o.flip && n.push(Bu()), (i = e.middlewares) != null && i.inline && n.push(zu()), n.push(Xu({ element: e.arrowRef, padding: e.arrowOffset })), ((s = e.middlewares) != null && s.size || e.width === "target") && n.push(
    yh({
      apply({ rects: a, availableWidth: c, availableHeight: l }) {
        var d, p;
        const f = ((d = t().refs.floating.current) == null ? void 0 : d.style) ?? {};
        (p = e.middlewares) != null && p.size && Object.assign(f, {
          maxWidth: `${c}px`,
          maxHeight: `${l}px`
        }), e.width === "target" && Object.assign(f, {
          width: `${a.reference.width}px`
        });
      }
    })
  ), n;
}
function xb(e) {
  const [t, n] = _t({
    value: e.opened,
    defaultValue: e.defaultOpened,
    finalValue: !1,
    onChange: e.onChange
  }), r = () => {
    var s;
    t && ((s = e.onClose) == null || s.call(e), n(!1));
  }, o = () => {
    var s, a;
    t ? ((s = e.onClose) == null || s.call(e), n(!1)) : ((a = e.onOpen) == null || a.call(e), n(!0));
  }, i = Ms({
    placement: e.position,
    middleware: wb(e, () => i)
  });
  return dd({
    opened: e.opened,
    position: e.position,
    positionDependencies: e.positionDependencies || [],
    floating: i
  }), Mt(() => {
    var s;
    (s = e.onPositionChange) == null || s.call(e, i.placement);
  }, [i.placement]), Mt(() => {
    var s, a;
    e.opened ? (a = e.onOpen) == null || a.call(e) : (s = e.onClose) == null || s.call(e);
  }, [e.opened]), {
    floating: i,
    controlled: typeof e.opened == "boolean",
    opened: t,
    onClose: r,
    onToggle: o
  };
}
const Sb = {
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
  zIndex: gs("popover"),
  __staticSelector: "Popover",
  width: "max-content"
}, Cb = (e, { radius: t, shadow: n }) => ({
  dropdown: {
    "--popover-radius": t === void 0 ? void 0 : bt(t),
    "--popover-shadow": Dm(n)
  }
});
function dt(e) {
  var It, qe, De, ge, At, qt;
  const t = j("Popover", Sb, e), {
    children: n,
    position: r,
    offset: o,
    onPositionChange: i,
    positionDependencies: s,
    opened: a,
    transitionProps: c,
    width: l,
    middlewares: u,
    withArrow: f,
    arrowSize: d,
    arrowOffset: p,
    arrowRadius: m,
    arrowPosition: g,
    unstyled: h,
    classNames: w,
    styles: y,
    closeOnClickOutside: b,
    withinPortal: v,
    portalProps: S,
    closeOnEscape: C,
    clickOutsideEvents: P,
    trapFocus: E,
    onClose: O,
    onOpen: T,
    onChange: $,
    zIndex: M,
    radius: _,
    shadow: A,
    id: L,
    defaultOpened: I,
    __staticSelector: B,
    withRoles: N,
    disabled: G,
    returnFocus: X,
    variant: ne,
    keepMounted: ve,
    vars: le,
    ...Ne
  } = t, we = te({
    name: B,
    props: t,
    classes: ld,
    classNames: w,
    styles: y,
    unstyled: h,
    rootSelector: "dropdown",
    vars: le,
    varsResolver: Cb
  }), re = z(null), [xe, _e] = U(null), [Ee, Pe] = U(null), { dir: ke } = nr(), ae = Gt(L), Y = xb({
    middlewares: u,
    width: l,
    position: id(ke, r),
    offset: typeof o == "number" ? o + (f ? d / 2 : 0) : o,
    arrowRef: re,
    arrowOffset: p,
    onPositionChange: i,
    positionDependencies: s,
    opened: a,
    defaultOpened: I,
    onChange: $,
    onOpen: T,
    onClose: O
  });
  Am(() => b && Y.onClose(), P, [
    xe,
    Ee
  ]);
  const ln = Q(
    (se) => {
      _e(se), Y.floating.refs.setReference(se);
    },
    [Y.floating.refs.setReference]
  ), Ue = Q(
    (se) => {
      Pe(se), Y.floating.refs.setFloating(se);
    },
    [Y.floating.refs.setFloating]
  );
  return /* @__PURE__ */ x.createElement(
    pb,
    {
      value: {
        returnFocus: X,
        disabled: G,
        controlled: Y.controlled,
        reference: ln,
        floating: Ue,
        x: Y.floating.x,
        y: Y.floating.y,
        arrowX: (De = (qe = (It = Y.floating) == null ? void 0 : It.middlewareData) == null ? void 0 : qe.arrow) == null ? void 0 : De.x,
        arrowY: (qt = (At = (ge = Y.floating) == null ? void 0 : ge.middlewareData) == null ? void 0 : At.arrow) == null ? void 0 : qt.y,
        opened: Y.opened,
        arrowRef: re,
        transitionProps: c,
        width: l,
        withArrow: f,
        arrowSize: d,
        arrowOffset: p,
        arrowRadius: m,
        arrowPosition: g,
        placement: Y.floating.placement,
        trapFocus: E,
        withinPortal: v,
        portalProps: S,
        zIndex: M,
        radius: _,
        shadow: A,
        closeOnEscape: C,
        onClose: Y.onClose,
        onToggle: Y.onToggle,
        getTargetId: () => `${ae}-target`,
        getDropdownId: () => `${ae}-dropdown`,
        withRoles: N,
        targetProps: Ne,
        __staticSelector: B,
        classNames: w,
        styles: y,
        unstyled: h,
        variant: ne,
        keepMounted: ve,
        getStyles: we
      }
    },
    n
  );
}
dt.Target = ud;
dt.Dropdown = Fs;
dt.displayName = "@mantine/core/Popover";
dt.extend = (e) => e;
var it = { root: "m-5ae2e3c", barsLoader: "m-7a2bd4cd", bar: "m-870bb79", "bars-loader-animation": "m-5d2b3b9d", dotsLoader: "m-4e3f22d7", dot: "m-870c4af", "loader-dots-animation": "m-aac34a1", ovalLoader: "m-b34414df", "oval-loader-animation": "m-f8e89c4b" };
const Eb = ie(({ className: e, ...t }, n) => /* @__PURE__ */ x.createElement(H, { component: "span", className: yt(it.barsLoader, e), ...t, ref: n }, /* @__PURE__ */ x.createElement("span", { className: it.bar }), /* @__PURE__ */ x.createElement("span", { className: it.bar }), /* @__PURE__ */ x.createElement("span", { className: it.bar }))), Pb = ie(({ className: e, ...t }, n) => /* @__PURE__ */ x.createElement(H, { component: "span", className: yt(it.dotsLoader, e), ...t, ref: n }, /* @__PURE__ */ x.createElement("span", { className: it.dot }), /* @__PURE__ */ x.createElement("span", { className: it.dot }), /* @__PURE__ */ x.createElement("span", { className: it.dot }))), Db = ie(({ className: e, ...t }, n) => /* @__PURE__ */ x.createElement(H, { component: "span", className: yt(it.ovalLoader, e), ...t, ref: n })), fd = {
  bars: Eb,
  oval: Db,
  dots: Pb
}, Rb = {
  loaders: fd,
  type: "oval"
}, Ib = (e, { size: t, color: n }) => ({
  root: {
    "--loader-size": fe(t, "loader-size"),
    "--loader-color": n ? kt(n, e) : void 0
  }
}), go = q((e, t) => {
  const n = j("Loader", Rb, e), {
    size: r,
    color: o,
    type: i,
    vars: s,
    className: a,
    style: c,
    classNames: l,
    styles: u,
    unstyled: f,
    loaders: d,
    variant: p,
    children: m,
    ...g
  } = n, h = te({
    name: "Loader",
    props: n,
    classes: it,
    className: a,
    style: c,
    classNames: l,
    styles: u,
    unstyled: f,
    vars: s,
    varsResolver: Ib
  });
  return m ? /* @__PURE__ */ x.createElement(H, { ...h("root"), ref: t, ...g }, m) : /* @__PURE__ */ x.createElement(
    H,
    {
      ...h("root"),
      ref: t,
      component: d[i],
      variant: p,
      size: r,
      ...g
    }
  );
});
go.defaultLoaders = fd;
go.classes = it;
go.displayName = "@mantine/core/Loader";
var ho = { root: "m-8d3f4000", loader: "m-302b9fb1", group: "m-1a0f1b21" };
const Tc = {
  orientation: "horizontal"
}, Ab = (e, { borderWidth: t }) => ({
  group: { "--ai-border-width": D(t) }
}), Bs = q((e, t) => {
  const n = j("ActionIconGroup", Tc, e), {
    className: r,
    style: o,
    classNames: i,
    styles: s,
    unstyled: a,
    orientation: c,
    vars: l,
    borderWidth: u,
    variant: f,
    ...d
  } = j("ActionIconGroup", Tc, e), p = te({
    name: "ActionIconGroup",
    props: n,
    classes: ho,
    className: r,
    style: o,
    classNames: i,
    styles: s,
    unstyled: a,
    vars: l,
    varsResolver: Ab,
    rootSelector: "group"
  });
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...p("group"),
      ref: t,
      variant: f,
      mod: { "data-orientation": c },
      role: "group",
      ...d
    }
  );
});
Bs.classes = ho;
Bs.displayName = "@mantine/core/ActionIconGroup";
const Ob = {}, Nb = (e, { size: t, radius: n, variant: r, gradient: o, color: i }) => {
  const s = e.variantColorResolver({
    color: i || e.primaryColor,
    theme: e,
    gradient: o,
    variant: r || "filled"
  });
  return {
    root: {
      "--ai-size": fe(t, "ai-size"),
      "--ai-radius": n === void 0 ? void 0 : bt(n),
      "--ai-bg": i || r ? s.background : void 0,
      "--ai-hover": i || r ? s.hover : void 0,
      "--ai-hover-color": i || r ? s.hoverColor : void 0,
      "--ai-color": i || r ? s.color : void 0,
      "--ai-bd": i || r ? s.border : void 0
    }
  };
}, bo = an((e, t) => {
  const n = j("ActionIcon", Ob, e), {
    className: r,
    unstyled: o,
    variant: i,
    classNames: s,
    styles: a,
    style: c,
    loading: l,
    loaderProps: u,
    size: f,
    color: d,
    radius: p,
    __staticSelector: m,
    gradient: g,
    vars: h,
    children: w,
    disabled: y,
    "data-disabled": b,
    ...v
  } = n, S = te({
    name: ["ActionIcon", m],
    props: n,
    className: r,
    style: c,
    classes: ho,
    classNames: s,
    styles: a,
    unstyled: o,
    vars: h,
    varsResolver: Nb
  });
  return /* @__PURE__ */ x.createElement(
    Cn,
    {
      ...S("root", { active: !y && !l && !b }),
      ...v,
      unstyled: o,
      variant: i,
      size: f,
      disabled: y || l,
      ref: t,
      mod: { loading: l, disabled: y || b }
    },
    l ? /* @__PURE__ */ x.createElement(
      go,
      {
        ...S("loader"),
        color: "var(--ai-color)",
        size: "calc(var(--ai-size) * 0.55)",
        ...u
      }
    ) : w
  );
});
bo.classes = ho;
bo.displayName = "@mantine/core/ActionIcon";
bo.Group = Bs;
const pd = ie(
  ({ size: e = "var(--cb-icon-size, 70%)", style: t, ...n }, r) => /* @__PURE__ */ x.createElement(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...t, width: e, height: e },
      ref: r,
      ...n
    },
    /* @__PURE__ */ x.createElement(
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
pd.displayName = "@mantine/core/CloseIcon";
var md = { root: "m-86a44da5", "root--subtle": "m-220c80f2" };
const $b = {
  variant: "subtle"
}, Tb = (e, { size: t, radius: n, iconSize: r }) => ({
  root: {
    "--cb-size": fe(t, "cb-size"),
    "--cb-radius": n === void 0 ? void 0 : bt(n),
    "--cb-icon-size": D(r)
  }
}), yo = an((e, t) => {
  const n = j("CloseButton", $b, e), {
    iconSize: r,
    children: o,
    vars: i,
    radius: s,
    className: a,
    classNames: c,
    style: l,
    styles: u,
    unstyled: f,
    "data-disabled": d,
    disabled: p,
    variant: m,
    ...g
  } = n, h = te({
    name: "CloseButton",
    props: n,
    className: a,
    style: l,
    classes: md,
    classNames: c,
    styles: u,
    unstyled: f,
    vars: i,
    varsResolver: Tb
  });
  return /* @__PURE__ */ x.createElement(
    Cn,
    {
      ref: t,
      ...g,
      unstyled: f,
      variant: m,
      disabled: p,
      mod: { disabled: p || d },
      ...h("root", { variant: m, active: !0 })
    },
    /* @__PURE__ */ x.createElement(pd, null),
    o
  );
});
yo.classes = md;
yo.displayName = "@mantine/core/CloseButton";
function Lb(e) {
  return im.toArray(e).filter(Boolean);
}
var gd = { root: "m-4081bf90" };
const Mb = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, _b = (e, { grow: t, preventGrowOverflow: n, gap: r, align: o, justify: i, wrap: s }, { childWidth: a }) => ({
  root: {
    "--group-child-width": t && n ? a : void 0,
    "--group-gap": cu(r),
    "--group-align": o,
    "--group-justify": i,
    "--group-wrap": s
  }
}), jn = q((e, t) => {
  const n = j("Group", Mb, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    children: c,
    gap: l,
    align: u,
    justify: f,
    wrap: d,
    grow: p,
    preventGrowOverflow: m,
    vars: g,
    variant: h,
    __size: w,
    ...y
  } = n, b = Lb(c), v = b.length, S = cu(l ?? "md"), P = { childWidth: `calc(${100 / v}% - (${S} - ${S} / ${v}))` }, E = te({
    name: "Group",
    props: n,
    stylesCtx: P,
    className: o,
    style: i,
    classes: gd,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: g,
    varsResolver: _b
  });
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...E("root"),
      ref: t,
      variant: h,
      mod: { grow: p },
      size: w,
      ...y
    },
    b
  );
});
jn.classes = gd;
jn.displayName = "@mantine/core/Group";
const [kb, ir] = ms({
  offsetBottom: !1,
  offsetTop: !1,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0
});
var tt = { wrapper: "m-6c018570", input: "m-8fb7ebe7", section: "m-82577fc2", placeholder: "m-88bacfd0", root: "m-46b77525", label: "m-8fdc1311", required: "m-78a94662", error: "m-8f816625", description: "m-fe47ce59" };
const Lc = {}, Fb = (e, { size: t }) => ({
  description: {
    "--input-description-size": t === void 0 ? void 0 : `calc(${gt(t)} - ${D(2)})`
  }
}), vo = q((e, t) => {
  const n = j("InputDescription", Lc, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    size: l,
    __staticSelector: u,
    __inheritStyles: f = !0,
    variant: d,
    ...p
  } = j("InputDescription", Lc, n), m = ir(), g = te({
    name: ["InputWrapper", u],
    props: n,
    classes: tt,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    rootSelector: "description",
    vars: c,
    varsResolver: Fb
  }), h = f && (m == null ? void 0 : m.getStyles) || g;
  return /* @__PURE__ */ x.createElement(
    H,
    {
      component: "p",
      ref: t,
      variant: d,
      size: l,
      ...h("description"),
      ...p
    }
  );
});
vo.classes = tt;
vo.displayName = "@mantine/core/InputDescription";
const Bb = {}, jb = (e, { size: t }) => ({
  error: {
    "--input-error-size": t === void 0 ? void 0 : `calc(${gt(t)} - ${D(2)})`
  }
}), wo = q((e, t) => {
  const n = j("InputError", Bb, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    size: l,
    __staticSelector: u,
    __inheritStyles: f = !0,
    variant: d,
    ...p
  } = n, m = te({
    name: ["InputWrapper", u],
    props: n,
    classes: tt,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    rootSelector: "error",
    vars: c,
    varsResolver: jb
  }), g = ir(), h = f && (g == null ? void 0 : g.getStyles) || m;
  return /* @__PURE__ */ x.createElement(
    H,
    {
      component: "p",
      ref: t,
      variant: d,
      size: l,
      ...h("error"),
      ...p
    }
  );
});
wo.classes = tt;
wo.displayName = "@mantine/core/InputError";
const Mc = {
  labelElement: "label"
}, zb = (e, { size: t }) => ({
  label: {
    "--input-label-size": gt(t),
    "--input-asterisk-color": void 0
  }
}), xo = q((e, t) => {
  const n = j("InputLabel", Mc, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    labelElement: l,
    size: u,
    required: f,
    htmlFor: d,
    onMouseDown: p,
    children: m,
    __staticSelector: g,
    variant: h,
    ...w
  } = j("InputLabel", Mc, n), y = te({
    name: ["InputWrapper", g],
    props: n,
    classes: tt,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    rootSelector: "label",
    vars: c,
    varsResolver: zb
  }), b = ir(), v = (b == null ? void 0 : b.getStyles) || y;
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...v("label"),
      component: l,
      variant: h,
      size: u,
      ref: t,
      htmlFor: l === "label" ? d : void 0,
      mod: { required: f },
      onMouseDown: (S) => {
        p == null || p(S), !S.defaultPrevented && S.detail > 1 && S.preventDefault();
      },
      ...w
    },
    m,
    f && /* @__PURE__ */ x.createElement("span", { ...v("required"), "aria-hidden": !0 }, " *")
  );
});
xo.classes = tt;
xo.displayName = "@mantine/core/InputLabel";
const _c = {}, js = q((e, t) => {
  const n = j("InputPlaceholder", _c, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    __staticSelector: l,
    variant: u,
    error: f,
    ...d
  } = j("InputPlaceholder", _c, n), p = te({
    name: ["InputPlaceholder", l],
    props: n,
    classes: tt,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    rootSelector: "placeholder"
  });
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...p("placeholder"),
      mod: { error: !!f },
      component: "span",
      variant: u,
      ref: t,
      ...d
    }
  );
});
js.classes = tt;
js.displayName = "@mantine/core/InputPlaceholder";
function Vb(e, { hasDescription: t, hasError: n }) {
  const r = e.findIndex((c) => c === "input"), o = e[r - 1], i = e[r + 1];
  return { offsetBottom: t && i === "description" || n && i === "error", offsetTop: t && o === "description" || n && o === "error" };
}
const Wb = {
  labelElement: "label",
  inputContainer: (e) => e,
  inputWrapperOrder: ["label", "description", "input", "error"]
}, Gb = (e, { size: t }) => ({
  label: {
    "--input-label-size": gt(t),
    "--input-asterisk-color": void 0
  },
  error: {
    "--input-error-size": t === void 0 ? void 0 : `calc(${gt(t)} - ${D(2)})`
  },
  description: {
    "--input-description-size": t === void 0 ? void 0 : `calc(${gt(t)} - ${D(2)})`
  }
}), zs = q((e, t) => {
  const n = j("InputWrapper", Wb, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    size: l,
    variant: u,
    __staticSelector: f,
    inputContainer: d,
    inputWrapperOrder: p,
    label: m,
    error: g,
    description: h,
    labelProps: w,
    descriptionProps: y,
    errorProps: b,
    labelElement: v,
    children: S,
    withAsterisk: C,
    id: P,
    required: E,
    __stylesApiProps: O,
    ...T
  } = n, $ = te({
    name: ["InputWrapper", f],
    props: O || n,
    classes: tt,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Gb
  }), M = {
    size: l,
    variant: u,
    __staticSelector: f
  }, _ = Gt(P), A = typeof C == "boolean" ? C : E, L = (b == null ? void 0 : b.id) || `${_}-error`, I = (y == null ? void 0 : y.id) || `${_}-description`, B = _, N = !!g && typeof g != "boolean", G = !!h, X = `${N ? L : ""} ${G ? I : ""}`, ne = X.trim().length > 0 ? X.trim() : void 0, ve = (w == null ? void 0 : w.id) || `${_}-label`, le = m && /* @__PURE__ */ x.createElement(
    xo,
    {
      key: "label",
      labelElement: v,
      id: ve,
      htmlFor: B,
      required: A,
      ...M,
      ...w
    },
    m
  ), Ne = G && /* @__PURE__ */ x.createElement(
    vo,
    {
      key: "description",
      ...y,
      ...M,
      size: (y == null ? void 0 : y.size) || M.size,
      id: (y == null ? void 0 : y.id) || I
    },
    h
  ), we = /* @__PURE__ */ x.createElement(x.Fragment, { key: "input" }, d(S)), re = N && /* @__PURE__ */ x.createElement(
    wo,
    {
      ...b,
      ...M,
      size: (b == null ? void 0 : b.size) || M.size,
      key: "error",
      id: (b == null ? void 0 : b.id) || L
    },
    g
  ), xe = p.map((_e) => {
    switch (_e) {
      case "label":
        return le;
      case "input":
        return we;
      case "description":
        return Ne;
      case "error":
        return re;
      default:
        return null;
    }
  });
  return /* @__PURE__ */ x.createElement(
    kb,
    {
      value: {
        getStyles: $,
        describedBy: ne,
        inputId: B,
        labelId: ve,
        ...Vb(p, { hasDescription: G, hasError: N })
      }
    },
    /* @__PURE__ */ x.createElement(
      H,
      {
        ref: t,
        variant: u,
        size: l,
        mod: { error: !!g },
        ...$("root"),
        ...T
      },
      xe
    )
  );
});
zs.classes = tt;
zs.displayName = "@mantine/core/InputWrapper";
const Hb = {
  variant: "default",
  leftSectionPointerEvents: "none",
  rightSectionPointerEvents: "none",
  withAria: !0,
  withErrorStyles: !0
}, Ub = (e, t, n) => ({
  wrapper: {
    "--input-margin-top": n.offsetTop ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-margin-bottom": n.offsetBottom ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-height": fe(t.size, "input-height"),
    "--input-fz": gt(t.size),
    "--input-radius": t.radius === void 0 ? void 0 : bt(t.radius),
    "--input-left-section-width": t.leftSectionWidth !== void 0 ? D(t.leftSectionWidth) : void 0,
    "--input-right-section-width": t.rightSectionWidth !== void 0 ? D(t.rightSectionWidth) : void 0,
    "--input-padding-y": t.multiline ? fe(t.size, "input-padding-y") : void 0,
    "--input-left-section-pointer-events": t.leftSectionPointerEvents,
    "--input-right-section-pointer-events": t.rightSectionPointerEvents
  }
}), Ze = an((e, t) => {
  const n = j("Input", Hb, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    required: c,
    __staticSelector: l,
    __stylesApiProps: u,
    size: f,
    wrapperProps: d,
    error: p,
    disabled: m,
    leftSection: g,
    leftSectionProps: h,
    leftSectionWidth: w,
    rightSection: y,
    rightSectionProps: b,
    rightSectionWidth: v,
    rightSectionPointerEvents: S,
    leftSectionPointerEvents: C,
    variant: P,
    vars: E,
    pointer: O,
    multiline: T,
    radius: $,
    id: M,
    withAria: _,
    withErrorStyles: A,
    ...L
  } = n, { styleProps: I, rest: B } = co(L), N = ir(), G = { offsetBottom: N == null ? void 0 : N.offsetBottom, offsetTop: N == null ? void 0 : N.offsetTop }, X = te({
    name: ["Input", l],
    props: u || n,
    classes: tt,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    stylesCtx: G,
    rootSelector: "wrapper",
    vars: E,
    varsResolver: Ub
  }), ne = _ ? {
    required: c,
    disabled: m,
    "aria-invalid": !!p,
    "aria-describedby": N == null ? void 0 : N.describedBy,
    id: (N == null ? void 0 : N.inputId) || M
  } : {};
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...X("wrapper"),
      ...I,
      ...d,
      mod: {
        error: !!p && A,
        pointer: O,
        disabled: m,
        multiline: T,
        "data-with-right-section": !!y,
        "data-with-left-section": !!g
      },
      variant: P,
      size: f
    },
    g && /* @__PURE__ */ x.createElement(
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
    /* @__PURE__ */ x.createElement(
      H,
      {
        component: "input",
        ...B,
        ...ne,
        ref: t,
        required: c,
        mod: { disabled: m, error: !!p && A },
        variant: P,
        ...X("input")
      }
    ),
    y && /* @__PURE__ */ x.createElement(
      "div",
      {
        ...b,
        "data-position": "right",
        ...X("section", {
          className: b == null ? void 0 : b.className,
          style: b == null ? void 0 : b.style
        })
      },
      y
    )
  );
});
Ze.classes = tt;
Ze.Wrapper = zs;
Ze.Label = xo;
Ze.Error = wo;
Ze.Description = vo;
Ze.Placeholder = js;
Ze.displayName = "@mantine/core/Input";
function qb(e, t, n) {
  const r = j(e, t, n), {
    label: o,
    description: i,
    error: s,
    required: a,
    classNames: c,
    styles: l,
    className: u,
    unstyled: f,
    __staticSelector: d,
    __stylesApiProps: p,
    errorProps: m,
    labelProps: g,
    descriptionProps: h,
    wrapperProps: w,
    id: y,
    size: b,
    style: v,
    inputContainer: S,
    inputWrapperOrder: C,
    withAsterisk: P,
    variant: E,
    vars: O,
    ...T
  } = r, { styleProps: $, rest: M } = co(T), _ = {
    label: o,
    description: i,
    error: s,
    required: a,
    classNames: c,
    className: u,
    __staticSelector: d,
    __stylesApiProps: p || r,
    errorProps: m,
    labelProps: g,
    descriptionProps: h,
    unstyled: f,
    styles: l,
    size: b,
    style: v,
    inputContainer: S,
    inputWrapperOrder: C,
    withAsterisk: P,
    variant: E,
    id: y,
    ...w
  };
  return {
    ...M,
    classNames: c,
    styles: l,
    unstyled: f,
    wrapperProps: { ..._, ...$ },
    inputProps: {
      required: a,
      classNames: c,
      styles: l,
      unstyled: f,
      size: b,
      __staticSelector: d,
      __stylesApiProps: p || r,
      error: s,
      variant: E,
      id: y
    }
  };
}
const Kb = {
  __staticSelector: "InputBase",
  withAria: !0
}, Ht = an((e, t) => {
  const { inputProps: n, wrapperProps: r, ...o } = qb("InputBase", Kb, e);
  return /* @__PURE__ */ x.createElement(Ze.Wrapper, { ...r }, /* @__PURE__ */ x.createElement(Ze, { ...n, ...o, ref: t }));
});
Ht.classes = { ...Ze.classes, ...Ze.Wrapper.classes };
Ht.displayName = "@mantine/core/InputBase";
const [Yb, Vs] = Wt(
  "Accordion component was not found in the tree"
);
function Ws({ style: e, size: t = 16, ...n }) {
  return /* @__PURE__ */ x.createElement(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...e, width: D(t), height: D(t), display: "block" },
      ...n
    },
    /* @__PURE__ */ x.createElement(
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
Ws.displayName = "@mantine/core/AccordionChevron";
const [Xb, hd] = Wt("Accordion.Item component was not found in the tree");
var sr = { root: "m-9bdbb667", panel: "m-df78851f", content: "m-4ba554d4", itemTitle: "m-8fa820a0", control: "m-4ba585b8", "control--default": "m-6939a5e9", "control--contained": "m-4271d21b", label: "m-df3ffa0f", chevron: "m-3f35ae96", icon: "m-9bd771fe", item: "m-9bd7b098", "item--default": "m-fe19b709", "item--contained": "m-1f921b3b", "item--filled": "m-2cdf939a", "item--separated": "m-9f59b069" };
const Jb = {}, Gs = q((e, t) => {
  const {
    classNames: n,
    className: r,
    style: o,
    styles: i,
    vars: s,
    chevron: a,
    icon: c,
    onClick: l,
    onKeyDown: u,
    children: f,
    disabled: d,
    ...p
  } = j("AccordionControl", Jb, e), { value: m } = hd(), g = Vs(), h = g.isItemActive(m), w = typeof g.order == "number", y = `h${g.order}`, b = /* @__PURE__ */ x.createElement(
    Cn,
    {
      ...p,
      ...g.getStyles("control", { className: r, classNames: n, style: o, styles: i, variant: g.variant }),
      unstyled: g.unstyled,
      mod: [
        "accordion-control",
        { active: h, "chevron-position": g.chevronPosition, disabled: d }
      ],
      ref: t,
      onClick: (v) => {
        l == null || l(v), g.onChange(m);
      },
      type: "button",
      disabled: d,
      "aria-expanded": h,
      "aria-controls": g.getRegionId(m),
      id: g.getControlId(m),
      onKeyDown: au({
        siblingSelector: "[data-accordion-control]",
        parentSelector: "[data-accordion]",
        activateOnFocus: !1,
        loop: g.loop,
        orientation: "vertical",
        onKeyDown: u
      })
    },
    /* @__PURE__ */ x.createElement(
      H,
      {
        component: "span",
        mod: { rotate: !g.disableChevronRotation && h, position: g.chevronPosition },
        ...g.getStyles("chevron", { classNames: n, styles: i })
      },
      a || g.chevron
    ),
    /* @__PURE__ */ x.createElement("span", { ...g.getStyles("label", { classNames: n, styles: i }) }, f),
    c && /* @__PURE__ */ x.createElement(
      H,
      {
        component: "span",
        mod: { "chevron-position": g.chevronPosition },
        ...g.getStyles("icon", { classNames: n, styles: i })
      },
      c
    )
  );
  return w ? /* @__PURE__ */ x.createElement(y, { ...g.getStyles("itemTitle", { classNames: n, styles: i }) }, b) : b;
});
Gs.displayName = "@mantine/core/AccordionControl";
Gs.classes = sr;
const Qb = {}, Hs = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, value: a, ...c } = j(
    "AccordionItem",
    Qb,
    e
  ), l = Vs();
  return /* @__PURE__ */ x.createElement(Xb, { value: { value: a } }, /* @__PURE__ */ x.createElement(
    H,
    {
      ref: t,
      mod: { active: l.isItemActive(a) },
      ...l.getStyles("item", { className: r, classNames: n, styles: i, style: o, variant: l.variant }),
      ...c
    }
  ));
});
Hs.displayName = "@mantine/core/AccordionItem";
Hs.classes = sr;
const Zb = {}, Us = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, children: a, ...c } = j(
    "AccordionPanel",
    Zb,
    e
  ), { value: l } = hd(), u = Vs();
  return /* @__PURE__ */ x.createElement(
    Iu,
    {
      ref: t,
      ...u.getStyles("panel", { className: r, classNames: n, style: o, styles: i }),
      ...c,
      in: u.isItemActive(l),
      transitionDuration: u.transitionDuration ?? 200,
      role: "region",
      id: u.getRegionId(l),
      "aria-labelledby": u.getControlId(l)
    },
    /* @__PURE__ */ x.createElement("div", { ...u.getStyles("content", { classNames: n, styles: i }) }, a)
  );
});
Us.displayName = "@mantine/core/AccordionPanel";
Us.classes = sr;
const ey = {
  multiple: !1,
  disableChevronRotation: !1,
  chevronPosition: "right",
  variant: "default",
  chevron: /* @__PURE__ */ x.createElement(Ws, null)
}, ty = (e, { transitionDuration: t, chevronSize: n, radius: r }) => ({
  root: {
    "--accordion-transition-duration": t === void 0 ? void 0 : `${t}ms`,
    "--accordion-chevron-size": n === void 0 ? void 0 : D(n),
    "--accordion-radius": r === void 0 ? void 0 : bt(r)
  }
});
function oe(e) {
  const t = j("Accordion", ey, e), {
    classNames: n,
    className: r,
    style: o,
    styles: i,
    unstyled: s,
    vars: a,
    children: c,
    multiple: l,
    value: u,
    defaultValue: f,
    onChange: d,
    id: p,
    loop: m,
    transitionDuration: g,
    disableChevronRotation: h,
    chevronPosition: w,
    chevronSize: y,
    order: b,
    chevron: v,
    variant: S,
    radius: C,
    ...P
  } = t, E = Gt(p), [O, T] = _t({
    value: u,
    defaultValue: f,
    finalValue: l ? [] : null,
    onChange: d
  }), $ = (A) => Array.isArray(O) ? O.includes(A) : A === O, M = (A) => {
    const L = Array.isArray(O) ? O.includes(A) ? O.filter((I) => I !== A) : [...O, A] : A === O ? null : A;
    T(L);
  }, _ = te({
    name: "Accordion",
    classes: sr,
    props: t,
    className: r,
    style: o,
    classNames: n,
    styles: i,
    unstyled: s,
    vars: a,
    varsResolver: ty
  });
  return /* @__PURE__ */ x.createElement(
    Yb,
    {
      value: {
        isItemActive: $,
        onChange: M,
        getControlId: $r(
          `${E}-control`,
          "Accordion.Item component was rendered with invalid value or without value"
        ),
        getRegionId: $r(
          `${E}-panel`,
          "Accordion.Item component was rendered with invalid value or without value"
        ),
        transitionDuration: g,
        disableChevronRotation: h,
        chevronPosition: w,
        order: b,
        chevron: v,
        loop: m,
        getStyles: _,
        variant: S,
        unstyled: s
      }
    },
    /* @__PURE__ */ x.createElement(H, { ..._("root"), id: E, ...P, variant: S, "data-accordion": !0 }, c)
  );
}
const ny = (e) => e;
oe.extend = ny;
oe.classes = sr;
oe.displayName = "@mantine/core/Accordion";
oe.Item = Hs;
oe.Panel = Us;
oe.Control = Gs;
oe.Chevron = Ws;
var bd = { root: "m-b6d8b162" };
function ry(e) {
  if (e === "start")
    return "start";
  if (e === "end" || e)
    return "end";
}
const oy = {
  inherit: !1
}, iy = (e, { variant: t, lineClamp: n, gradient: r, size: o, color: i }) => ({
  root: {
    "--text-fz": gt(o),
    "--text-lh": Pm(o),
    "--text-gradient": t === "gradient" ? Wi(r, e) : void 0,
    "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
    "--text-color": i ? kt(i, e) : void 0
  }
}), Xe = an((e, t) => {
  const n = j("Text", oy, e), {
    lineClamp: r,
    truncate: o,
    inline: i,
    inherit: s,
    gradient: a,
    span: c,
    __staticSelector: l,
    vars: u,
    className: f,
    style: d,
    classNames: p,
    styles: m,
    unstyled: g,
    variant: h,
    mod: w,
    size: y,
    ...b
  } = n, v = te({
    name: ["Text", l],
    props: n,
    classes: bd,
    className: f,
    style: d,
    classNames: p,
    styles: m,
    unstyled: g,
    vars: u,
    varsResolver: iy
  });
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...v("root", { focusable: !0 }),
      ref: t,
      component: c ? "span" : "p",
      variant: h,
      mod: [
        {
          "data-truncate": ry(o),
          "data-line-clamp": typeof r == "number",
          "data-inline": i,
          "data-inherit": s
        },
        w
      ],
      size: y,
      ...b
    }
  );
});
Xe.classes = bd;
Xe.displayName = "@mantine/core/Text";
function yd(e) {
  return typeof e == "string" ? { value: e, label: e } : typeof e == "number" ? { value: e.toString(), label: e.toString() } : "group" in e ? {
    group: e.group,
    items: e.items.map((t) => yd(t))
  } : e;
}
function vd(e) {
  return e ? e.map(yd) : [];
}
function qs(e) {
  return e.reduce((t, n) => "group" in n ? { ...t, ...qs(n.items) } : (t[n.value] = n, t), {});
}
var Ae = { dropdown: "m-88b62a41", options: "m-b2821a6e", option: "m-92253aa5", search: "m-985517d8", empty: "m-2530cd1d", header: "m-858f94bd", footer: "m-82b967cb", group: "m-254f3e4f", groupLabel: "m-2bb2e9e5", chevron: "m-2943220b", optionsDropdownScrollArea: "m-71d052f9", optionsDropdownOption: "m-390b5f4", optionsDropdownCheckIcon: "m-8ee53fc2" };
const sy = {
  error: null
}, ay = (e, { size: t }) => ({
  chevron: {
    "--combobox-chevron-size": fe(t, "combobox-chevron-size")
  }
}), Ks = q((e, t) => {
  const n = j("ComboboxChevron", sy, e), { size: r, error: o, style: i, className: s, classNames: a, styles: c, unstyled: l, vars: u, ...f } = n, d = te({
    name: "ComboboxChevron",
    classes: Ae,
    props: n,
    style: i,
    className: s,
    classNames: a,
    styles: c,
    unstyled: l,
    vars: u,
    varsResolver: ay,
    rootSelector: "chevron"
  });
  return /* @__PURE__ */ x.createElement(
    H,
    {
      component: "svg",
      ...f,
      ...d("chevron"),
      size: r,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      mod: ["combobox-chevron", { error: o }],
      ref: t
    },
    /* @__PURE__ */ x.createElement(
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
Ks.classes = Ae;
Ks.displayName = "@mantine/core/ComboboxChevron";
const [cy, nt] = Wt(
  "Combobox component was not found in tree"
), wd = ie(
  ({ size: e, onMouseDown: t, onClick: n, onClear: r, ...o }, i) => /* @__PURE__ */ x.createElement(
    yo,
    {
      ref: i,
      size: e || "sm",
      variant: "transparent",
      tabIndex: -1,
      "aria-hidden": !0,
      ...o,
      onMouseDown: (s) => {
        s.preventDefault(), t == null || t(s);
      },
      onClick: (s) => {
        r(), n == null || n(s);
      }
    }
  )
);
wd.displayName = "@mantine/core/ComboboxClearButton";
const ly = {}, Ys = q((e, t) => {
  const { classNames: n, styles: r, className: o, style: i, hidden: s, ...a } = j(
    "ComboboxDropdown",
    ly,
    e
  ), c = nt();
  return /* @__PURE__ */ x.createElement(
    dt.Dropdown,
    {
      ...a,
      ref: t,
      role: "presentation",
      "data-hidden": s || void 0,
      ...c.getStyles("dropdown", { className: o, style: i, classNames: n, styles: r })
    }
  );
});
Ys.classes = Ae;
Ys.displayName = "@mantine/core/ComboboxDropdown";
const uy = {
  refProp: "ref"
}, xd = q((e, t) => {
  const { children: n, refProp: r } = j("ComboboxDropdownTarget", uy, e);
  if (nt(), !Vt(n))
    throw new Error(
      "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  return /* @__PURE__ */ x.createElement(dt.Target, { ref: t, refProp: r }, n);
});
xd.displayName = "@mantine/core/ComboboxDropdownTarget";
const dy = {}, Xs = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, ...a } = j(
    "ComboboxEmpty",
    dy,
    e
  ), c = nt();
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ref: t,
      ...c.getStyles("empty", { className: r, classNames: n, styles: i, style: o }),
      ...a
    }
  );
});
Xs.classes = Ae;
Xs.displayName = "@mantine/core/ComboboxEmpty";
function Js({
  onKeyDown: e,
  withKeyboardNavigation: t,
  withAriaAttributes: n,
  withExpandedAttribute: r,
  targetType: o
}) {
  const i = nt(), [s, a] = U(null), c = (u) => {
    if (e == null || e(u), !i.readOnly && t) {
      if (u.nativeEvent.code === "ArrowDown" && (u.preventDefault(), i.store.dropdownOpened ? a(i.store.selectNextOption()) : (i.store.openDropdown("keyboard"), a(i.store.selectActiveOption()))), u.nativeEvent.code === "ArrowUp" && (u.preventDefault(), i.store.dropdownOpened ? a(i.store.selectPreviousOption()) : (i.store.openDropdown("keyboard"), a(i.store.selectActiveOption()))), u.nativeEvent.code === "Enter") {
        const f = i.store.getSelectedOptionIndex();
        i.store.dropdownOpened && f !== -1 ? (u.preventDefault(), i.store.clickSelectedOption()) : o === "button" && (u.preventDefault(), i.store.openDropdown("keyboard"));
      }
      u.nativeEvent.code === "Escape" && i.store.closeDropdown("keyboard"), u.nativeEvent.code === "Space" && o === "button" && (u.preventDefault(), i.store.toggleDropdown("keyboard"));
    }
  };
  return {
    ...n ? {
      "aria-haspopup": "listbox",
      "aria-expanded": r && !!(i.store.listId && i.store.dropdownOpened) || void 0,
      "aria-controls": i.store.listId,
      "aria-activedescendant": i.store.dropdownOpened && s || void 0,
      autoComplete: "off",
      "data-expanded": i.store.dropdownOpened ? !0 : void 0
    } : {},
    onKeyDown: c
  };
}
const fy = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1
}, Sd = q((e, t) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: i,
    withExpandedAttribute: s,
    targetType: a,
    ...c
  } = j("ComboboxEventsTarget", fy, e);
  if (!Vt(n))
    throw new Error(
      "Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const l = nt(), u = Js({
    targetType: a,
    withAriaAttributes: i,
    withKeyboardNavigation: o,
    withExpandedAttribute: s,
    onKeyDown: n.props.onKeyDown
  });
  return sn(n, {
    ...u,
    ...c,
    [r]: Oe(t, l.store.targetRef, n == null ? void 0 : n.ref)
  });
});
Sd.displayName = "@mantine/core/ComboboxEventsTarget";
const py = {}, Qs = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, ...a } = j(
    "ComboboxFooter",
    py,
    e
  ), c = nt();
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ref: t,
      ...c.getStyles("footer", { className: r, classNames: n, style: o, styles: i }),
      ...a
    }
  );
});
Qs.classes = Ae;
Qs.displayName = "@mantine/core/ComboboxFooter";
const my = {}, Zs = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, children: a, label: c, ...l } = j(
    "ComboboxGroup",
    my,
    e
  ), u = nt();
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ref: t,
      ...u.getStyles("group", { className: r, classNames: n, style: o, styles: i }),
      ...l
    },
    c && /* @__PURE__ */ x.createElement("div", { ...u.getStyles("groupLabel", { classNames: n, styles: i }) }, c),
    a
  );
});
Zs.classes = Ae;
Zs.displayName = "@mantine/core/ComboboxGroup";
const gy = {}, ea = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, ...a } = j(
    "ComboboxHeader",
    gy,
    e
  ), c = nt();
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ref: t,
      ...c.getStyles("header", { className: r, classNames: n, style: o, styles: i }),
      ...a
    }
  );
});
ea.classes = Ae;
ea.displayName = "@mantine/core/ComboboxHeader";
const hy = {}, ta = q((e, t) => {
  const n = j("ComboboxOption", hy, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    vars: a,
    onClick: c,
    id: l,
    active: u,
    onMouseDown: f,
    onMouseOver: d,
    disabled: p,
    selected: m,
    ...g
  } = n, h = nt(), w = eu(), y = l || w;
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...h.getStyles("option", { className: o, classNames: r, styles: s, style: i }),
      ...g,
      ref: t,
      id: y,
      mod: [
        "combobox-option",
        { "combobox-active": u, "combobox-disabled": p, "combobox-selected": m }
      ],
      role: "option",
      onClick: (b) => {
        var v;
        p ? b.preventDefault() : ((v = h.onOptionSubmit) == null || v.call(h, n.value, n), c == null || c(b));
      },
      onMouseDown: (b) => {
        b.preventDefault(), f == null || f(b);
      },
      onMouseOver: (b) => {
        h.resetSelectionOnOptionHover && h.store.resetSelectedOption(), d == null || d(b);
      }
    }
  );
});
ta.classes = Ae;
ta.displayName = "@mantine/core/ComboboxOption";
const by = {}, na = q((e, t) => {
  const n = j("ComboboxOptions", by, e), { classNames: r, className: o, style: i, styles: s, id: a, onMouseDown: c, labelledBy: l, ...u } = n, f = nt(), d = Gt(a);
  return W(() => {
    f.store.setListId(d);
  }, [d]), /* @__PURE__ */ x.createElement(
    H,
    {
      ref: t,
      ...f.getStyles("options", { className: o, style: i, classNames: r, styles: s }),
      ...u,
      id: d,
      role: "listbox",
      "aria-labelledby": l,
      onMouseDown: (p) => {
        p.preventDefault(), c == null || c(p);
      }
    }
  );
});
na.classes = Ae;
na.displayName = "@mantine/core/ComboboxOptions";
const yy = {
  withAriaAttributes: !0,
  withKeyboardNavigation: !0
}, ra = q((e, t) => {
  const n = j("ComboboxSearch", yy, e), {
    classNames: r,
    styles: o,
    unstyled: i,
    vars: s,
    withAriaAttributes: a,
    onKeyDown: c,
    withKeyboardNavigation: l,
    size: u,
    ...f
  } = n, d = nt(), p = d.getStyles("search"), m = Js({
    targetType: "input",
    withAriaAttributes: a,
    withKeyboardNavigation: l,
    withExpandedAttribute: !1,
    onKeyDown: c
  });
  return /* @__PURE__ */ x.createElement(
    Ze,
    {
      ref: Oe(t, d.store.searchRef),
      classNames: [{ input: p.className }, r],
      styles: [{ input: p.style }, o],
      size: u || d.size,
      ...m,
      ...f,
      __staticSelector: "Combobox"
    }
  );
});
ra.classes = Ae;
ra.displayName = "@mantine/core/ComboboxSearch";
const vy = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1
}, Cd = q((e, t) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: i,
    withExpandedAttribute: s,
    targetType: a,
    ...c
  } = j("ComboboxTarget", vy, e);
  if (!Vt(n))
    throw new Error(
      "Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const l = nt(), u = Js({
    targetType: a,
    withAriaAttributes: i,
    withKeyboardNavigation: o,
    withExpandedAttribute: s,
    onKeyDown: n.props.onKeyDown
  }), f = sn(n, {
    ...u,
    ...c
  });
  return /* @__PURE__ */ x.createElement(dt.Target, { ref: Oe(t, l.store.targetRef) }, f);
});
Cd.displayName = "@mantine/core/ComboboxTarget";
function wy(e, t, n) {
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
function xy(e, t, n) {
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
function Sy(e) {
  for (let t = 0; t < e.length; t += 1)
    if (!e[t].hasAttribute("data-combobox-disabled"))
      return t;
  return -1;
}
function oa({
  defaultOpened: e,
  opened: t,
  onOpenedChange: n,
  onDropdownClose: r,
  onDropdownOpen: o,
  loop: i = !0,
  scrollBehavior: s = "instant"
} = {}) {
  const [a, c] = _t({
    value: t,
    defaultValue: e,
    finalValue: !1,
    onChange: n
  }), l = z(null), u = z(-1), f = z(null), d = z(null), p = z(-1), m = z(-1), g = z(-1), h = Q(
    (I = "unknown") => {
      a || (c(!0), o == null || o(I));
    },
    [c, o, a]
  ), w = Q(
    (I = "unknown") => {
      a && (c(!1), r == null || r(I));
    },
    [c, r, a]
  ), y = Q(
    (I = "unknown") => {
      a ? w(I) : h(I);
    },
    [w, h, a]
  ), b = Q(() => {
    const I = document.querySelector(`#${l.current} [data-combobox-selected]`);
    I == null || I.removeAttribute("data-combobox-selected"), I == null || I.removeAttribute("aria-selected");
  }, []), v = Q(
    (I) => {
      const B = document.getElementById(l.current), N = B == null ? void 0 : B.querySelectorAll("[data-combobox-option]");
      if (!N)
        return null;
      const G = I >= N.length ? 0 : I < 0 ? N.length - 1 : I;
      return u.current = G, N != null && N[G] && !N[G].hasAttribute("data-combobox-disabled") ? (b(), N[G].setAttribute("data-combobox-selected", "true"), N[G].setAttribute("aria-selected", "true"), N[G].scrollIntoView({ block: "nearest", behavior: s }), N[G].id) : null;
    },
    [s, b]
  ), S = Q(() => {
    const I = document.querySelector(
      `#${l.current} [data-combobox-active]`
    );
    if (I) {
      const B = document.querySelectorAll(
        `#${l.current} [data-combobox-option]`
      ), N = Array.from(B).findIndex((G) => G === I);
      return v(N);
    }
    return v(0);
  }, [v]), C = Q(
    () => v(
      xy(
        u.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        i
      )
    ),
    [v, i]
  ), P = Q(
    () => v(
      wy(
        u.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        i
      )
    ),
    [v, i]
  ), E = Q(
    () => v(
      Sy(
        document.querySelectorAll(`#${l.current} [data-combobox-option]`)
      )
    ),
    [v]
  ), O = Q((I = "selected") => {
    g.current = window.setTimeout(() => {
      const B = document.querySelectorAll(
        `#${l.current} [data-combobox-option]`
      ), N = Array.from(B).findIndex(
        (G) => G.hasAttribute(`data-combobox-${I}`)
      );
      u.current = N;
    }, 0);
  }, []), T = Q(() => {
    u.current = -1, b();
  }, [b]), $ = Q(() => {
    const I = document.querySelectorAll(
      `#${l.current} [data-combobox-option]`
    ), B = I == null ? void 0 : I[u.current];
    B == null || B.click();
  }, []), M = Q((I) => {
    l.current = I;
  }, []), _ = Q(() => {
    p.current = window.setTimeout(() => f.current.focus(), 0);
  }, []), A = Q(() => {
    m.current = window.setTimeout(() => d.current.focus(), 0);
  }, []), L = Q(() => u.current, []);
  return W(
    () => () => {
      window.clearTimeout(p.current), window.clearTimeout(m.current), window.clearTimeout(g.current);
    },
    []
  ), {
    dropdownOpened: a,
    openDropdown: h,
    closeDropdown: w,
    toggleDropdown: y,
    selectedOptionIndex: u.current,
    getSelectedOptionIndex: L,
    selectOption: v,
    selectFirstOption: E,
    selectActiveOption: S,
    selectNextOption: C,
    selectPreviousOption: P,
    resetSelectedOption: T,
    updateSelectedOptionIndex: O,
    listId: l.current,
    setListId: M,
    clickSelectedOption: $,
    searchRef: f,
    focusSearchInput: _,
    targetRef: d,
    focusTarget: A
  };
}
const Cy = {
  keepMounted: !0,
  withinPortal: !0,
  resetSelectionOnOptionHover: !1,
  width: "target",
  transitionProps: { transition: "fade", duration: 0 }
}, Ey = (e, { size: t, dropdownPadding: n }) => ({
  options: {
    "--combobox-option-fz": gt(t),
    "--combobox-option-padding": fe(t, "combobox-option-padding")
  },
  dropdown: {
    "--combobox-padding": n === void 0 ? void 0 : D(n),
    "--combobox-option-fz": gt(t),
    "--combobox-option-padding": fe(t, "combobox-option-padding")
  }
});
function J(e) {
  const t = j("Combobox", Cy, e), {
    classNames: n,
    styles: r,
    unstyled: o,
    children: i,
    store: s,
    vars: a,
    onOptionSubmit: c,
    size: l,
    dropdownPadding: u,
    resetSelectionOnOptionHover: f,
    __staticSelector: d,
    readOnly: p,
    ...m
  } = t, g = oa(), h = s || g, w = te({
    name: d || "Combobox",
    classes: Ae,
    props: t,
    classNames: n,
    styles: r,
    unstyled: o,
    vars: a,
    varsResolver: Ey
  });
  return /* @__PURE__ */ x.createElement(
    cy,
    {
      value: {
        getStyles: w,
        store: h,
        onOptionSubmit: c,
        size: l,
        resetSelectionOnOptionHover: f,
        readOnly: p
      }
    },
    /* @__PURE__ */ x.createElement(
      dt,
      {
        opened: h.dropdownOpened,
        ...m,
        onClose: h.closeDropdown,
        withRoles: !1,
        unstyled: o
      },
      i
    )
  );
}
const Py = (e) => e;
J.extend = Py;
J.classes = Ae;
J.displayName = "@mantine/core/Combobox";
J.Target = Cd;
J.Dropdown = Ys;
J.Options = na;
J.Option = ta;
J.Search = ra;
J.Empty = Xs;
J.Chevron = Ks;
J.Footer = Qs;
J.Header = ea;
J.EventsTarget = Sd;
J.DropdownTarget = xd;
J.Group = Zs;
J.ClearButton = wd;
function Dy({ size: e, style: t, ...n }) {
  const r = e !== void 0 ? { width: D(e), height: D(e), ...t } : t;
  return /* @__PURE__ */ x.createElement(
    "svg",
    {
      viewBox: "0 0 10 7",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: r,
      "aria-hidden": !0,
      ...n
    },
    /* @__PURE__ */ x.createElement(
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
function bn(e) {
  return "group" in e;
}
function Ed({
  options: e,
  search: t,
  limit: n
}) {
  const r = t.trim().toLowerCase(), o = [];
  for (let i = 0; i < e.length; i += 1) {
    const s = e[i];
    if (o.length === n)
      return o;
    bn(s) && o.push({
      group: s.group,
      items: Ed({
        options: s.items,
        search: t,
        limit: n - o.length
      })
    }), bn(s) || s.label.toLowerCase().includes(r) && o.push(s);
  }
  return o;
}
function Ry(e) {
  if (e.length === 0)
    return !0;
  for (const t of e)
    if (!("group" in t) || t.items.length > 0)
      return !1;
  return !0;
}
function Pd(e, t = /* @__PURE__ */ new Set()) {
  if (Array.isArray(e))
    for (const n of e)
      if (bn(n))
        Pd(n.items, t);
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
function vi(e, t) {
  return Array.isArray(e) ? e.includes(t) : e === t;
}
function Dd({ data: e, withCheckIcon: t, value: n, checkIconPosition: r, unstyled: o }) {
  if (!bn(e)) {
    const s = t && vi(n, e.value) && /* @__PURE__ */ x.createElement(Dy, { className: Ae.optionsDropdownCheckIcon });
    return /* @__PURE__ */ x.createElement(
      J.Option,
      {
        value: e.value,
        disabled: e.disabled,
        className: yt({ [Ae.optionsDropdownOption]: !o }),
        "data-reverse": r === "right" || void 0,
        "data-checked": vi(n, e.value) || void 0,
        "aria-selected": vi(n, e.value)
      },
      r === "left" && s,
      /* @__PURE__ */ x.createElement("span", null, e.label),
      r === "right" && s
    );
  }
  const i = e.items.map((s) => /* @__PURE__ */ x.createElement(
    Dd,
    {
      data: s,
      value: n,
      key: s.value,
      unstyled: o,
      withCheckIcon: t,
      checkIconPosition: r
    }
  ));
  return /* @__PURE__ */ x.createElement(J.Group, { label: e.group }, i);
}
function Rd({
  data: e,
  hidden: t,
  hiddenWhenEmpty: n,
  filter: r,
  search: o,
  limit: i,
  maxDropdownHeight: s,
  withScrollArea: a = !0,
  filterOptions: c = !0,
  withCheckIcon: l = !1,
  value: u,
  checkIconPosition: f,
  nothingFoundMessage: d,
  unstyled: p,
  labelId: m
}) {
  Pd(e);
  const h = typeof o == "string" ? (r || Ed)({
    options: e,
    search: c ? o : "",
    limit: i ?? 1 / 0
  }) : e, w = Ry(h), y = h.map((b) => /* @__PURE__ */ x.createElement(
    Dd,
    {
      data: b,
      key: bn(b) ? b.group : b.value,
      withCheckIcon: l,
      value: u,
      checkIconPosition: f,
      unstyled: p
    }
  ));
  return /* @__PURE__ */ x.createElement(J.Dropdown, { hidden: t || n && w }, /* @__PURE__ */ x.createElement(J.Options, { labelledBy: m }, a ? /* @__PURE__ */ x.createElement(
    rr.Autosize,
    {
      mah: s ?? 220,
      type: "scroll",
      scrollbarSize: "var(--_combobox-padding)",
      offsetScrollbars: "y",
      className: Ae.optionsDropdownScrollArea
    },
    y
  ) : y, w && d && /* @__PURE__ */ x.createElement(J.Empty, null, d)));
}
var Id = { root: "m-de3d2490", colorOverlay: "m-862f3d1b", shadowOverlay: "m-98ae7f22", alphaOverlay: "m-95709ac0", childrenOverlay: "m-93e74e3" };
const kc = {
  withShadow: !0
}, Iy = (e, { radius: t, size: n }) => ({
  root: {
    "--cs-radius": t === void 0 ? void 0 : bt(t),
    "--cs-size": D(n)
  }
}), zn = an((e, t) => {
  const n = j("ColorSwatch", kc, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    color: l,
    size: u,
    radius: f,
    withShadow: d,
    children: p,
    variant: m,
    ...g
  } = j("ColorSwatch", kc, n), h = te({
    name: "ColorSwatch",
    props: n,
    classes: Id,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Iy
  });
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ref: t,
      variant: m,
      size: u,
      ...h("root", { focusable: !0 }),
      ...g
    },
    /* @__PURE__ */ x.createElement("span", { ...h("alphaOverlay") }),
    d && /* @__PURE__ */ x.createElement("span", { ...h("shadowOverlay") }),
    /* @__PURE__ */ x.createElement("span", { ...h("colorOverlay", { style: { backgroundColor: l } }) }),
    /* @__PURE__ */ x.createElement("span", { ...h("childrenOverlay") }, p)
  );
});
zn.classes = Id;
zn.displayName = "@mantine/core/ColorSwatch";
var Ad = { root: "m-7485cace" };
const Ay = {}, Oy = (e, { size: t, fluid: n }) => ({
  root: {
    "--container-size": n ? void 0 : fe(t, "container-size")
  }
}), ia = q((e, t) => {
  const n = j("Container", Ay, e), { classNames: r, className: o, style: i, styles: s, unstyled: a, vars: c, fluid: l, ...u } = n, f = te({
    name: "Container",
    classes: Ad,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Oy
  });
  return /* @__PURE__ */ x.createElement(H, { ref: t, mod: { fluid: l }, ...f("root"), ...u });
});
ia.classes = Ad;
ia.displayName = "@mantine/core/Container";
function Ny({ open: e, close: t, openDelay: n, closeDelay: r }) {
  const o = z(-1), i = z(-1), s = () => {
    window.clearTimeout(o.current), window.clearTimeout(i.current);
  }, a = () => {
    s(), n === 0 || n === void 0 ? e() : o.current = window.setTimeout(e, n);
  }, c = () => {
    s(), r === 0 || r === void 0 ? t() : i.current = window.setTimeout(t, r);
  };
  return W(() => s, []), { openDropdown: a, closeDropdown: c };
}
const [$y, Od] = Wt(
  "HoverCard component was not found in the tree"
), Ty = {};
function Nd(e) {
  const { children: t, onMouseEnter: n, onMouseLeave: r, ...o } = j(
    "HoverCardDropdown",
    Ty,
    e
  ), i = Od(), s = Tr(n, i.openDropdown), a = Tr(r, i.closeDropdown);
  return /* @__PURE__ */ x.createElement(dt.Dropdown, { onMouseEnter: s, onMouseLeave: a, ...o }, t);
}
Nd.displayName = "@mantine/core/HoverCardDropdown";
const Ly = {
  refProp: "ref"
}, $d = ie((e, t) => {
  const { children: n, refProp: r, eventPropsWrapperName: o, ...i } = j(
    "HoverCardTarget",
    Ly,
    e
  );
  if (!Vt(n))
    throw new Error(
      "HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const s = Od(), a = Tr(n.props.onMouseEnter, s.openDropdown), c = Tr(n.props.onMouseLeave, s.closeDropdown), l = { onMouseEnter: a, onMouseLeave: c };
  return /* @__PURE__ */ x.createElement(dt.Target, { refProp: r, ref: t, ...i }, sn(
    n,
    o ? { [o]: l } : l
  ));
});
$d.displayName = "@mantine/core/HoverCardTarget";
const My = {
  openDelay: 0,
  closeDelay: 150,
  initiallyOpened: !1
};
function en(e) {
  const { children: t, onOpen: n, onClose: r, openDelay: o, closeDelay: i, initiallyOpened: s, ...a } = j(
    "HoverCard",
    My,
    e
  ), [c, { open: l, close: u }] = Wm(s, { onClose: r, onOpen: n }), { openDropdown: f, closeDropdown: d } = Ny({ open: l, close: u, openDelay: o, closeDelay: i });
  return /* @__PURE__ */ x.createElement($y, { value: { openDropdown: f, closeDropdown: d } }, /* @__PURE__ */ x.createElement(dt, { ...a, opened: c, __staticSelector: "HoverCard" }, t));
}
en.displayName = "@mantine/core/HoverCard";
en.Target = $d;
en.Dropdown = Nd;
en.extend = (e) => e;
function $t() {
  return $t = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, $t.apply(this, arguments);
}
function Td(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const [_y, sa] = ms(), [ky, Fy] = ms();
var So = { root: "m-7cda1cd6", "root--default": "m-44da308b", "root--contrast": "m-e3a01f8", label: "m-1e0e6180", remove: "m-ae386778", group: "m-1dcfd90b" };
const By = {}, jy = (e, { gap: t }, { size: n }) => ({
  group: {
    "--pg-gap": t !== void 0 ? fe(t) : fe(n, "pg-gap")
  }
}), aa = q((e, t) => {
  const n = j("PillGroup", By, e), { classNames: r, className: o, style: i, styles: s, unstyled: a, vars: c, size: l, disabled: u, ...f } = n, d = sa(), p = (d == null ? void 0 : d.size) || l || void 0, m = te({
    name: "PillGroup",
    classes: So,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: jy,
    stylesCtx: { size: p },
    rootSelector: "group"
  });
  return /* @__PURE__ */ x.createElement(ky, { value: { size: p, disabled: u } }, /* @__PURE__ */ x.createElement(H, { ref: t, size: p, ...m("group"), ...f }));
});
aa.classes = So;
aa.displayName = "@mantine/core/PillGroup";
const zy = {
  variant: "default"
}, Vy = (e, { radius: t }, { size: n }) => ({
  root: {
    "--pill-fz": fe(n, "pill-fz"),
    "--pill-height": fe(n, "pill-height"),
    "--pill-radius": t === void 0 ? void 0 : bt(t)
  }
}), Vn = q((e, t) => {
  const n = j("Pill", zy, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    variant: l,
    children: u,
    withRemoveButton: f,
    onRemove: d,
    removeButtonProps: p,
    radius: m,
    size: g,
    disabled: h,
    ...w
  } = n, y = Fy(), b = sa(), v = g || (y == null ? void 0 : y.size) || void 0, S = (b == null ? void 0 : b.variant) === "filled" ? "contrast" : l || "default", C = te({
    name: "Pill",
    classes: So,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Vy,
    stylesCtx: { size: v }
  });
  return /* @__PURE__ */ x.createElement(
    H,
    {
      component: "span",
      ref: t,
      variant: S,
      size: v,
      ...C("root", { variant: S }),
      mod: { "with-remove": f, disabled: h || (y == null ? void 0 : y.disabled) },
      ...w
    },
    /* @__PURE__ */ x.createElement("span", { ...C("label") }, u),
    f && /* @__PURE__ */ x.createElement(
      yo,
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
        onMouseDown: (P) => {
          var E;
          P.preventDefault(), P.stopPropagation(), (E = p == null ? void 0 : p.onMouseDown) == null || E.call(p, P);
        },
        onClick: (P) => {
          var E;
          P.stopPropagation(), d == null || d(), (E = p == null ? void 0 : p.onClick) == null || E.call(p, P);
        }
      }
    )
  );
});
Vn.classes = So;
Vn.displayName = "@mantine/core/Pill";
Vn.Group = aa;
var Ld = { field: "m-45c4369d" };
const Wy = {
  type: "visible"
}, ca = q((e, t) => {
  const n = j("PillsInputField", Wy, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    type: l,
    disabled: u,
    id: f,
    pointer: d,
    ...p
  } = n, m = sa(), g = ir(), h = te({
    name: "PillsInputField",
    classes: Ld,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    rootSelector: "field"
  }), w = u || (m == null ? void 0 : m.disabled);
  return /* @__PURE__ */ x.createElement(
    H,
    {
      component: "input",
      ref: Oe(t, m == null ? void 0 : m.fieldRef),
      "data-type": l,
      disabled: w,
      mod: { disabled: w, pointer: d },
      ...h("field"),
      ...p,
      id: (g == null ? void 0 : g.inputId) || f,
      "aria-invalid": m == null ? void 0 : m.hasError,
      "aria-describedby": g == null ? void 0 : g.describedBy,
      type: "text",
      onMouseDown: (y) => !d && y.stopPropagation()
    }
  );
});
ca.classes = Ld;
ca.displayName = "@mantine/core/PillsInputField";
const Gy = {}, Br = q((e, t) => {
  const n = j("PillsInput", Gy, e), {
    children: r,
    onMouseDown: o,
    onClick: i,
    size: s,
    disabled: a,
    __staticSelector: c,
    error: l,
    variant: u,
    ...f
  } = n, d = z();
  return /* @__PURE__ */ x.createElement(_y, { value: { fieldRef: d, size: s, disabled: a, hasError: !!l, variant: u } }, /* @__PURE__ */ x.createElement(
    Ht,
    {
      size: s,
      error: l,
      variant: u,
      component: "div",
      ref: t,
      onMouseDown: (p) => {
        var m;
        p.preventDefault(), o == null || o(p), (m = d.current) == null || m.focus();
      },
      onClick: (p) => {
        var m;
        p.preventDefault(), i == null || i(p), (m = d.current) == null || m.focus();
      },
      ...f,
      multiline: !0,
      disabled: a,
      __staticSelector: c || "PillsInput",
      withAria: !1
    },
    r
  ));
});
Br.displayName = "@mantine/core/PillsInput";
Br.Field = ca;
function Hy({ data: e, value: t }) {
  const n = t.map((o) => o.trim().toLowerCase());
  return e.reduce((o, i) => (bn(i) ? o.push({
    group: i.group,
    items: i.items.filter(
      (s) => n.indexOf(s.value.toLowerCase().trim()) === -1
    )
  }) : n.indexOf(i.value.toLowerCase().trim()) === -1 && o.push(i), o), []);
}
const Uy = {
  maxValues: 1 / 0,
  withCheckIcon: !0,
  checkIconPosition: "left",
  hiddenInputValuesDivider: ","
}, la = q((e, t) => {
  const n = j("MultiSelect", Uy, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    size: l,
    value: u,
    defaultValue: f,
    onChange: d,
    onKeyDown: p,
    variant: m,
    data: g,
    dropdownOpened: h,
    defaultDropdownOpened: w,
    onDropdownOpen: y,
    onDropdownClose: b,
    selectFirstOptionOnChange: v,
    onOptionSubmit: S,
    comboboxProps: C,
    filter: P,
    limit: E,
    withScrollArea: O,
    maxDropdownHeight: T,
    searchValue: $,
    defaultSearchValue: M,
    onSearchChange: _,
    readOnly: A,
    disabled: L,
    onFocus: I,
    onBlur: B,
    onPaste: N,
    radius: G,
    rightSection: X,
    rightSectionWidth: ne,
    rightSectionPointerEvents: ve,
    rightSectionProps: le,
    leftSection: Ne,
    leftSectionWidth: we,
    leftSectionPointerEvents: re,
    leftSectionProps: xe,
    inputContainer: _e,
    inputWrapperOrder: Ee,
    withAsterisk: Pe,
    labelProps: ke,
    descriptionProps: ae,
    errorProps: Y,
    wrapperProps: ln,
    description: Ue,
    label: It,
    error: qe,
    maxValues: De,
    searchable: ge,
    nothingFoundMessage: At,
    withCheckIcon: qt,
    checkIconPosition: se,
    hidePickedOptions: Ot,
    withErrorStyles: Wp,
    name: Gp,
    form: Hp,
    id: Up,
    clearable: qp,
    clearButtonProps: Kp,
    hiddenInputProps: Yp,
    placeholder: tc,
    hiddenInputValuesDivider: Xp,
    ...Jp
  } = n, oi = Gt(Up), ii = vd(g), pr = qs(ii), Fe = oa({
    opened: h,
    defaultOpened: w,
    onDropdownOpen: y,
    onDropdownClose: () => {
      b == null || b(), Fe.resetSelectedOption();
    }
  }), {
    styleProps: Qp,
    rest: { type: hD, ...Zp }
  } = co(Jp), [$e, An] = _t({
    value: u,
    defaultValue: f,
    finalValue: [],
    onChange: d
  }), [mr, gr] = _t({
    value: $,
    defaultValue: M,
    finalValue: "",
    onChange: _
  }), si = te({
    name: "MultiSelect",
    classes: {},
    props: n,
    classNames: r,
    styles: s,
    unstyled: a
  }), { resolvedClassNames: nc, resolvedStyles: rc } = Cu({
    props: n,
    styles: s,
    classNames: r
  }), em = (ce) => {
    p == null || p(ce), ce.key === " " && !ge && (ce.preventDefault(), Fe.toggleDropdown()), ce.key === "Backspace" && mr.length === 0 && $e.length > 0 && An($e.slice(0, $e.length - 1));
  }, tm = $e.map((ce, ai) => {
    var sc;
    return /* @__PURE__ */ x.createElement(
      Vn,
      {
        key: `${ce}-${ai}`,
        withRemoveButton: !A,
        onRemove: () => An($e.filter((nm) => ce !== nm)),
        unstyled: a,
        ...si("pill")
      },
      ((sc = pr[ce]) == null ? void 0 : sc.label) || ce
    );
  });
  W(() => {
    v && Fe.selectFirstOption();
  }, [v, $e]);
  const oc = qp && $e.length > 0 && !L && !A && /* @__PURE__ */ x.createElement(
    J.ClearButton,
    {
      size: l,
      ...Kp,
      onClear: () => {
        An([]), gr("");
      }
    }
  ), ic = Hy({ data: ii, value: $e });
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(
    J,
    {
      store: Fe,
      classNames: nc,
      styles: rc,
      unstyled: a,
      size: l,
      readOnly: A,
      __staticSelector: "MultiSelect",
      onOptionSubmit: (ce) => {
        S == null || S(ce), gr(""), Fe.updateSelectedOptionIndex("selected"), $e.includes(pr[ce].value) ? An($e.filter((ai) => ai !== pr[ce].value)) : $e.length < De && An([...$e, pr[ce].value]);
      },
      ...C
    },
    /* @__PURE__ */ x.createElement(J.DropdownTarget, null, /* @__PURE__ */ x.createElement(
      Br,
      {
        ...Qp,
        __staticSelector: "MultiSelect",
        classNames: nc,
        styles: rc,
        unstyled: a,
        size: l,
        className: o,
        style: i,
        variant: m,
        disabled: L,
        radius: G,
        rightSection: X || oc || /* @__PURE__ */ x.createElement(J.Chevron, { size: l, error: qe, unstyled: a }),
        rightSectionPointerEvents: ve || (oc ? "all" : "none"),
        rightSectionWidth: ne,
        rightSectionProps: le,
        leftSection: Ne,
        leftSectionWidth: we,
        leftSectionPointerEvents: re,
        leftSectionProps: xe,
        inputContainer: _e,
        inputWrapperOrder: Ee,
        withAsterisk: Pe,
        labelProps: ke,
        descriptionProps: ae,
        errorProps: Y,
        wrapperProps: ln,
        description: Ue,
        label: It,
        error: qe,
        multiline: !0,
        withErrorStyles: Wp,
        __stylesApiProps: { ...n, multiline: !0 },
        pointer: !ge,
        onClick: () => ge ? Fe.openDropdown() : Fe.toggleDropdown(),
        "data-expanded": Fe.dropdownOpened || void 0,
        id: oi
      },
      /* @__PURE__ */ x.createElement(Vn.Group, { disabled: L, unstyled: a, ...si("pillsList") }, tm, /* @__PURE__ */ x.createElement(J.EventsTarget, null, /* @__PURE__ */ x.createElement(
        Br.Field,
        {
          ...Zp,
          ref: t,
          id: oi,
          placeholder: tc,
          type: !ge && !tc ? "hidden" : "visible",
          ...si("inputField"),
          unstyled: a,
          onFocus: (ce) => {
            I == null || I(ce), ge && Fe.openDropdown();
          },
          onBlur: (ce) => {
            B == null || B(ce), Fe.closeDropdown(), ge && Fe.closeDropdown(), gr("");
          },
          onKeyDown: em,
          value: mr,
          onChange: (ce) => {
            gr(ce.currentTarget.value), ge && Fe.openDropdown(), v && Fe.selectFirstOption();
          },
          disabled: L,
          readOnly: A || !ge,
          pointer: !ge
        }
      )))
    )),
    /* @__PURE__ */ x.createElement(
      Rd,
      {
        data: Ot ? ic : ii,
        hidden: A || L,
        filter: P,
        search: mr,
        limit: E,
        hiddenWhenEmpty: !ge || !At || Ot && ic.length === 0 && mr.trim().length === 0,
        withScrollArea: O,
        maxDropdownHeight: T,
        filterOptions: ge,
        value: $e,
        checkIconPosition: se,
        withCheckIcon: qt,
        nothingFoundMessage: At,
        unstyled: a,
        labelId: `${oi}-label`
      }
    )
  ), /* @__PURE__ */ x.createElement(
    "input",
    {
      type: "hidden",
      name: Gp,
      value: $e.join(Xp),
      form: Hp,
      disabled: L,
      ...Yp
    }
  ));
});
la.classes = { ...Ht.classes, ...J.classes };
la.displayName = "@mantine/core/MultiSelect";
const qy = {
  duration: 100,
  transition: "fade"
};
function Ky(e, t) {
  return { ...qy, ...t, ...e };
}
function Yy({
  offset: e,
  position: t
}) {
  const [n, r] = U(!1), o = z(), { x: i, y: s, elements: a, refs: c, update: l, placement: u } = Ms({
    placement: t,
    middleware: [
      Os({
        crossAxis: !0,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  }), f = u.includes("right") ? e : t.includes("left") ? e * -1 : 0, d = u.includes("bottom") ? e : t.includes("top") ? e * -1 : 0, p = Q(
    ({ clientX: m, clientY: g }) => {
      c.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: m,
            y: g,
            left: m + f,
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
    if (c.floating.current) {
      const m = o.current;
      m.addEventListener("mousemove", p);
      const g = wt(c.floating.current);
      return g.forEach((h) => {
        h.addEventListener("scroll", l);
      }), () => {
        m.removeEventListener("mousemove", p), g.forEach((h) => {
          h.removeEventListener("scroll", l);
        });
      };
    }
  }, [a.reference, c.floating.current, l, p, n]), { handleMouseMove: p, x: i, y: s, opened: n, setOpened: r, boundaryRef: o, floating: c.setFloating };
}
var Co = { tooltip: "m-1b3c8819", arrow: "m-f898399f" };
const Xy = {
  refProp: "ref",
  withinPortal: !0,
  offset: 10,
  position: "right",
  zIndex: gs("popover")
}, Jy = (e, { radius: t, color: n }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : bt(t),
    "--tooltip-bg": n ? kt(n, e) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), ua = q((e, t) => {
  const n = j("TooltipFloating", Xy, e), {
    children: r,
    refProp: o,
    withinPortal: i,
    style: s,
    className: a,
    classNames: c,
    styles: l,
    unstyled: u,
    radius: f,
    color: d,
    label: p,
    offset: m,
    position: g,
    multiline: h,
    zIndex: w,
    disabled: y,
    variant: b,
    vars: v,
    portalProps: S,
    ...C
  } = n, P = vt(), E = te({
    name: "TooltipFloating",
    props: n,
    classes: Co,
    className: a,
    style: s,
    classNames: c,
    styles: l,
    unstyled: u,
    rootSelector: "tooltip",
    vars: v,
    varsResolver: Jy
  }), { handleMouseMove: O, x: T, y: $, opened: M, boundaryRef: _, floating: A, setOpened: L } = Yy({
    offset: m,
    position: g
  });
  if (!Vt(r))
    throw new Error(
      "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const I = Oe(_, r.ref, t), B = (G) => {
    var X, ne;
    (ne = (X = r.props).onMouseEnter) == null || ne.call(X, G), O(G), L(!0);
  }, N = (G) => {
    var X, ne;
    (ne = (X = r.props).onMouseLeave) == null || ne.call(X, G), L(!1);
  };
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(mo, { ...S, withinPortal: i }, /* @__PURE__ */ x.createElement(
    H,
    {
      ...C,
      ...E("tooltip", {
        style: {
          ...xs(s, P),
          zIndex: w,
          display: !y && M ? "block" : "none",
          top: ($ && Math.round($)) ?? "",
          left: (T && Math.round(T)) ?? ""
        }
      }),
      variant: b,
      ref: A
    },
    p
  )), sn(r, {
    ...r.props,
    [o]: I,
    onMouseEnter: B,
    onMouseLeave: N
  }));
});
ua.classes = Co;
ua.displayName = "@mantine/core/TooltipFloating";
const Md = on(!1), Qy = Md.Provider, Zy = () => ut(Md), ev = {
  openDelay: 0,
  closeDelay: 0
};
function _d(e) {
  const { openDelay: t, closeDelay: n, children: r } = j("TooltipGroup", ev, e);
  return /* @__PURE__ */ x.createElement(Qy, { value: !0 }, /* @__PURE__ */ x.createElement(Qh, { delay: { open: t, close: n } }, r));
}
_d.displayName = "@mantine/core/TooltipGroup";
function tv(e) {
  var C, P, E;
  const [t, n] = U(!1), o = typeof e.opened == "boolean" ? e.opened : t, i = Zy(), s = Gt(), { delay: a, currentId: c, setCurrentId: l } = od(), u = Q(
    (O) => {
      n(O), O && l(s);
    },
    [l, s]
  ), {
    x: f,
    y: d,
    context: p,
    refs: m,
    update: g,
    placement: h,
    middlewareData: { arrow: { x: w, y } = {} }
  } = Ms({
    placement: e.position,
    open: o,
    onOpenChange: u,
    middleware: [
      Vu(e.offset),
      Os({ padding: 8 }),
      Bu(),
      Xu({ element: e.arrowRef, padding: e.arrowOffset }),
      ...e.inline ? [zu()] : []
    ]
  }), { getReferenceProps: b, getFloatingProps: v } = lb([
    Jh(p, {
      enabled: (C = e.events) == null ? void 0 : C.hover,
      delay: i ? a : { open: e.openDelay, close: e.closeDelay },
      mouseOnly: !((P = e.events) != null && P.touch)
    }),
    cb(p, { enabled: (E = e.events) == null ? void 0 : E.focus, keyboardOnly: !0 }),
    ub(p, { role: "tooltip" }),
    // cannot be used with controlled tooltip, page jumps
    ab(p, { enabled: typeof e.opened > "u" }),
    Zh(p, { id: s })
  ]);
  dd({
    opened: o,
    position: e.position,
    positionDependencies: e.positionDependencies,
    floating: { refs: m, update: g }
  }), Mt(() => {
    var O;
    (O = e.onPositionChange) == null || O.call(e, h);
  }, [h]);
  const S = o && c && c !== s;
  return {
    x: f,
    y: d,
    arrowX: w,
    arrowY: y,
    reference: m.setReference,
    floating: m.setFloating,
    getFloatingProps: v,
    getReferenceProps: b,
    isGroupPhase: S,
    opened: o,
    placement: h
  };
}
const Fc = {
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
  zIndex: gs("popover"),
  positionDependencies: []
}, nv = (e, { radius: t, color: n }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : bt(t),
    "--tooltip-bg": n ? kt(n, e) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), ar = q((e, t) => {
  const n = j("Tooltip", Fc, e), {
    children: r,
    position: o,
    refProp: i,
    label: s,
    openDelay: a,
    closeDelay: c,
    onPositionChange: l,
    opened: u,
    withinPortal: f,
    radius: d,
    color: p,
    classNames: m,
    styles: g,
    unstyled: h,
    style: w,
    className: y,
    withArrow: b,
    arrowSize: v,
    arrowOffset: S,
    arrowRadius: C,
    arrowPosition: P,
    offset: E,
    transitionProps: O,
    multiline: T,
    events: $,
    zIndex: M,
    disabled: _,
    positionDependencies: A,
    onClick: L,
    onMouseEnter: I,
    onMouseLeave: B,
    inline: N,
    variant: G,
    keepMounted: X,
    vars: ne,
    portalProps: ve,
    ...le
  } = j("Tooltip", Fc, n), { dir: Ne } = nr(), we = z(null), re = tv({
    position: id(Ne, o),
    closeDelay: c,
    openDelay: a,
    onPositionChange: l,
    opened: u,
    events: $,
    arrowRef: we,
    arrowOffset: S,
    offset: typeof E == "number" ? E + (b ? v / 2 : 0) : E,
    positionDependencies: [...A, r],
    inline: N
  }), xe = te({
    name: "Tooltip",
    props: n,
    classes: Co,
    className: y,
    style: w,
    classNames: m,
    styles: g,
    unstyled: h,
    rootSelector: "tooltip",
    vars: ne,
    varsResolver: nv
  });
  if (!Vt(r))
    throw new Error(
      "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const _e = Oe(re.reference, r.ref, t), Ee = Ky(O, { duration: 100, transition: "fade" });
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(mo, { ...ve, withinPortal: f }, /* @__PURE__ */ x.createElement(
    ks,
    {
      ...Ee,
      keepMounted: X,
      mounted: !_ && !!re.opened,
      duration: re.isGroupPhase ? 10 : Ee.duration
    },
    (Pe) => /* @__PURE__ */ x.createElement(
      H,
      {
        ...le,
        variant: G,
        mod: { multiline: T },
        ...re.getFloatingProps({
          ref: re.floating,
          className: xe("tooltip").className,
          style: {
            ...xe("tooltip").style,
            ...Pe,
            zIndex: M,
            top: re.y ?? 0,
            left: re.x ?? 0
          }
        })
      },
      s,
      /* @__PURE__ */ x.createElement(
        _s,
        {
          ref: we,
          arrowX: re.arrowX,
          arrowY: re.arrowY,
          visible: b,
          position: re.placement,
          arrowSize: v,
          arrowOffset: S,
          arrowRadius: C,
          arrowPosition: P,
          ...xe("arrow")
        }
      )
    )
  )), sn(
    r,
    re.getReferenceProps({
      onClick: L,
      onMouseEnter: I,
      onMouseLeave: B,
      onMouseMove: n.onMouseMove,
      onPointerDown: n.onPointerDown,
      onPointerEnter: n.onPointerEnter,
      [i]: _e,
      className: yt(y, r.props.className),
      ...r.props
    })
  ));
});
ar.classes = Co;
ar.displayName = "@mantine/core/Tooltip";
ar.Floating = ua;
ar.Group = _d;
const rv = {
  searchable: !1,
  withCheckIcon: !0,
  allowDeselect: !0,
  checkIconPosition: "left"
}, cr = q((e, t) => {
  const n = j("Select", rv, e), {
    classNames: r,
    styles: o,
    unstyled: i,
    vars: s,
    dropdownOpened: a,
    defaultDropdownOpened: c,
    onDropdownClose: l,
    onDropdownOpen: u,
    onFocus: f,
    onBlur: d,
    onClick: p,
    onChange: m,
    data: g,
    value: h,
    defaultValue: w,
    selectFirstOptionOnChange: y,
    onOptionSubmit: b,
    comboboxProps: v,
    readOnly: S,
    disabled: C,
    filter: P,
    limit: E,
    withScrollArea: O,
    maxDropdownHeight: T,
    size: $,
    searchable: M,
    rightSection: _,
    checkIconPosition: A,
    withCheckIcon: L,
    nothingFoundMessage: I,
    name: B,
    form: N,
    searchValue: G,
    defaultSearchValue: X,
    onSearchChange: ne,
    allowDeselect: ve,
    error: le,
    rightSectionPointerEvents: Ne,
    id: we,
    clearable: re,
    clearButtonProps: xe,
    hiddenInputProps: _e,
    ...Ee
  } = n, Pe = Nr(() => vd(g), [g]), ke = Nr(() => qs(Pe), [Pe]), ae = Gt(we), [Y, ln] = _t({
    value: h,
    defaultValue: w,
    finalValue: null,
    onChange: m
  }), Ue = typeof Y == "string" ? ke[Y] : void 0, [It, qe] = _t({
    value: G,
    defaultValue: X,
    finalValue: Ue ? Ue.label : "",
    onChange: ne
  }), De = oa({
    opened: a,
    defaultOpened: c,
    onDropdownOpen: u,
    onDropdownClose: () => {
      l == null || l(), De.resetSelectedOption();
    }
  }), { resolvedClassNames: ge, resolvedStyles: At } = Cu({
    props: n,
    styles: o,
    classNames: r
  });
  W(() => {
    y && De.selectFirstOption();
  }, [y, Y]), W(() => {
    h === null && qe(""), typeof h == "string" && Ue && qe(Ue.label);
  }, [h, Ue]);
  const qt = re && !!Y && !C && !S && /* @__PURE__ */ x.createElement(
    J.ClearButton,
    {
      size: $,
      ...xe,
      onClear: () => {
        ln(null), qe("");
      }
    }
  );
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(
    J,
    {
      store: De,
      __staticSelector: "Select",
      classNames: ge,
      styles: At,
      unstyled: i,
      readOnly: S,
      onOptionSubmit: (se) => {
        b == null || b(se);
        const Ot = ve && ke[se].value === Y ? null : ke[se].value;
        ln(Ot), qe(typeof Ot == "string" ? ke[se].label : ""), De.closeDropdown();
      },
      size: $,
      ...v
    },
    /* @__PURE__ */ x.createElement(J.Target, { targetType: M ? "input" : "button" }, /* @__PURE__ */ x.createElement(
      Ht,
      {
        id: ae,
        ref: t,
        rightSection: _ || qt || /* @__PURE__ */ x.createElement(J.Chevron, { size: $, error: le, unstyled: i }),
        rightSectionPointerEvents: Ne || (qt ? "all" : "none"),
        ...Ee,
        size: $,
        __staticSelector: "Select",
        disabled: C,
        readOnly: S || !M,
        value: It,
        onChange: (se) => {
          qe(se.currentTarget.value), De.openDropdown(), y && De.selectFirstOption();
        },
        onFocus: (se) => {
          M && De.openDropdown(), f == null || f(se);
        },
        onBlur: (se) => {
          var Ot;
          M && De.closeDropdown(), qe(Y != null && ((Ot = ke[Y]) == null ? void 0 : Ot.label) || ""), d == null || d(se);
        },
        onClick: (se) => {
          M ? De.openDropdown() : De.toggleDropdown(), p == null || p(se);
        },
        classNames: ge,
        styles: At,
        unstyled: i,
        pointer: !M,
        error: le
      }
    )),
    /* @__PURE__ */ x.createElement(
      Rd,
      {
        data: Pe,
        hidden: S || C,
        filter: P,
        search: It,
        limit: E,
        hiddenWhenEmpty: !M || !I,
        withScrollArea: O,
        maxDropdownHeight: T,
        filterOptions: M && (Ue == null ? void 0 : Ue.label) !== It,
        value: Y,
        checkIconPosition: A,
        withCheckIcon: L,
        nothingFoundMessage: I,
        unstyled: i,
        labelId: `${ae}-label`
      }
    )
  ), /* @__PURE__ */ x.createElement(
    "input",
    {
      type: "hidden",
      name: B,
      value: Y || "",
      form: N,
      disabled: C,
      ..._e
    }
  ));
});
cr.classes = { ...Ht.classes, ...J.classes };
cr.displayName = "@mantine/core/Select";
const ov = {}, da = q((e, t) => {
  const { w: n, h: r, miw: o, mih: i, ...s } = j("Space", ov, e);
  return /* @__PURE__ */ x.createElement(H, { ref: t, ...s, w: n, miw: o ?? n, h: r, mih: i ?? r });
});
da.displayName = "@mantine/core/Space";
const [iv, fa] = Wt(
  "Tabs component was not found in the tree"
);
var lr = { root: "m-89d60db1", "list--default": "m-576c9d4", list: "m-89d33d6d", panel: "m-b0c91715", tab: "m-4ec4dce6", tabSection: "m-fc420b1f", "tab--default": "m-539e827b", "list--outline": "m-6772fbd5", "tab--outline": "m-b59ab47c", "tab--pills": "m-c3381914" };
const sv = {}, pa = q((e, t) => {
  const n = j("TabsList", sv, e), { children: r, className: o, grow: i, justify: s, classNames: a, styles: c, style: l, ...u } = n, f = fa();
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...u,
      ...f.getStyles("list", {
        className: o,
        style: l,
        classNames: a,
        styles: c,
        props: n,
        variant: f.variant
      }),
      ref: t,
      role: "tablist",
      variant: f.variant,
      mod: {
        grow: i,
        orientation: f.orientation,
        placement: f.orientation === "vertical" && f.placement,
        inverted: f.inverted
      },
      "aria-orientation": f.orientation,
      __vars: { "--tabs-justify": s }
    },
    r
  );
});
pa.classes = lr;
pa.displayName = "@mantine/core/TabsList";
const av = {}, ma = q((e, t) => {
  const n = j("TabsPanel", av, e), { children: r, className: o, value: i, classNames: s, styles: a, style: c, ...l } = n, u = fa(), f = u.value === i, d = u.keepMounted || n.keepMounted || f ? r : null;
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...l,
      ...u.getStyles("panel", {
        className: o,
        classNames: s,
        styles: a,
        style: [c, f ? void 0 : { display: "none" }],
        props: n
      }),
      ref: t,
      mod: { orientation: u.orientation },
      role: "tabpanel",
      id: u.getPanelId(i),
      "aria-labelledby": u.getTabId(i)
    },
    d
  );
});
ma.classes = lr;
ma.displayName = "@mantine/core/TabsPanel";
const cv = {}, ga = q((e, t) => {
  const n = j("TabsTab", cv, e), {
    className: r,
    children: o,
    rightSection: i,
    leftSection: s,
    value: a,
    onClick: c,
    onKeyDown: l,
    disabled: u,
    color: f,
    style: d,
    classNames: p,
    styles: m,
    vars: g,
    ...h
  } = n, w = vt(), { dir: y } = nr(), b = fa(), v = a === b.value, S = (P) => {
    b.onChange(b.allowTabDeactivation && a === b.value ? null : a), c == null || c(P);
  }, C = { classNames: p, styles: m, props: n };
  return /* @__PURE__ */ x.createElement(
    Cn,
    {
      ...h,
      ...b.getStyles("tab", { className: r, style: d, variant: b.variant, ...C }),
      disabled: u,
      unstyled: b.unstyled,
      variant: b.variant,
      mod: {
        active: v,
        disabled: u,
        orientation: b.orientation,
        inverted: b.inverted,
        placement: b.orientation === "vertical" && b.placement
      },
      ref: t,
      role: "tab",
      id: b.getTabId(a),
      "aria-selected": v,
      tabIndex: v || b.value === null ? 0 : -1,
      "aria-controls": b.getPanelId(a),
      onClick: S,
      __vars: { "--tabs-color": f ? kt(f, w) : void 0 },
      onKeyDown: au({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: b.activateTabWithKeyboard,
        loop: b.loop,
        orientation: b.orientation || "horizontal",
        dir: y,
        onKeyDown: l
      })
    },
    s && /* @__PURE__ */ x.createElement("span", { ...b.getStyles("tabSection", C), "data-position": "left" }, s),
    o && /* @__PURE__ */ x.createElement("span", { ...b.getStyles("tabLabel", C) }, o),
    i && /* @__PURE__ */ x.createElement("span", { ...b.getStyles("tabSection", C), "data-position": "right" }, i)
  );
});
ga.classes = lr;
ga.displayName = "@mantine/core/TabsTab";
const Bc = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value", lv = {
  keepMounted: !0,
  orientation: "horizontal",
  loop: !0,
  activateTabWithKeyboard: !0,
  allowTabDeactivation: !1,
  unstyled: !1,
  inverted: !1,
  variant: "default",
  placement: "left"
}, uv = (e, { radius: t, color: n }) => ({
  root: {
    "--tabs-radius": bt(t),
    "--tabs-color": kt(n, e)
  }
}), st = q((e, t) => {
  const n = j("Tabs", lv, e), {
    defaultValue: r,
    value: o,
    onChange: i,
    orientation: s,
    children: a,
    loop: c,
    id: l,
    activateTabWithKeyboard: u,
    allowTabDeactivation: f,
    variant: d,
    color: p,
    radius: m,
    inverted: g,
    placement: h,
    keepMounted: w,
    classNames: y,
    styles: b,
    unstyled: v,
    className: S,
    style: C,
    vars: P,
    ...E
  } = n, O = Gt(l), [T, $] = _t({
    value: o,
    defaultValue: r,
    finalValue: null,
    onChange: i
  }), M = te({
    name: "Tabs",
    props: n,
    classes: lr,
    className: S,
    style: C,
    classNames: y,
    styles: b,
    unstyled: v,
    vars: P,
    varsResolver: uv
  });
  return /* @__PURE__ */ x.createElement(
    iv,
    {
      value: {
        placement: h,
        value: T,
        orientation: s,
        id: O,
        loop: c,
        activateTabWithKeyboard: u,
        getTabId: $r(`${O}-tab`, Bc),
        getPanelId: $r(`${O}-panel`, Bc),
        onChange: $,
        allowTabDeactivation: f,
        variant: d,
        color: p,
        radius: m,
        inverted: g,
        keepMounted: w,
        unstyled: v,
        getStyles: M
      }
    },
    /* @__PURE__ */ x.createElement(
      H,
      {
        ref: t,
        id: O,
        variant: d,
        mod: {
          orientation: s,
          inverted: s === "horizontal" && g,
          placement: s === "vertical" && h
        },
        ...M("root"),
        ...E
      },
      a
    )
  );
});
st.classes = lr;
st.displayName = "@mantine/core/Tabs";
st.Tab = ga;
st.Panel = ma;
st.List = pa;
const dv = {}, ha = q((e, t) => {
  const n = j("TextInput", dv, e);
  return /* @__PURE__ */ x.createElement(Ht, { component: "input", ref: t, ...n, __staticSelector: "TextInput" });
});
ha.classes = Ht.classes;
ha.displayName = "@mantine/core/TextInput";
const fv = ["h1", "h2", "h3", "h4", "h5", "h6"];
function pv(e, t) {
  const n = t !== void 0 ? t : `h${e}`;
  return fv.includes(n) ? {
    fontSize: `var(--mantine-${n}-font-size)`,
    fontWeight: `var(--mantine-${n}-font-weight)`,
    lineHeight: `var(--mantine-${n}-line-height)`
  } : {
    fontSize: D(n),
    fontWeight: `var(--mantine-h${e}-font-weight)`,
    lineHeight: `var(--mantine-h${e}-line-height)`
  };
}
var kd = { root: "m-8a5d1357" };
const mv = {
  order: 1
}, gv = (e, { order: t, size: n, lineClamp: r }) => {
  const o = pv(t, n);
  return {
    root: {
      "--title-fw": o.fontWeight,
      "--title-lh": o.lineHeight,
      "--title-fz": o.fontSize,
      "--title-line-clamp": typeof r == "number" ? r.toString() : void 0
    }
  };
}, Pn = q((e, t) => {
  const n = j("Title", mv, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    order: c,
    vars: l,
    size: u,
    variant: f,
    lineClamp: d,
    ...p
  } = n, m = te({
    name: "Title",
    props: n,
    classes: kd,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: l,
    varsResolver: gv
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ x.createElement(
    H,
    {
      ...m("root"),
      component: `h${c}`,
      variant: f,
      ref: t,
      mod: { order: c, "data-line-clamp": typeof d == "number" },
      size: u,
      ...p
    }
  ) : null;
});
Pn.classes = kd;
Pn.displayName = "@mantine/core/Title";
const hv = {
  /** Put your mantine theme override here */
};
function bv() {
  if (console && console.warn) {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    typeof t[0] == "string" && (t[0] = `react-i18next:: ${t[0]}`), console.warn(...t);
  }
}
const jc = {};
function Yi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  typeof t[0] == "string" && jc[t[0]] || (typeof t[0] == "string" && (jc[t[0]] = /* @__PURE__ */ new Date()), bv(...t));
}
const Fd = (e, t) => () => {
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
function zc(e, t, n) {
  e.loadNamespaces(t, Fd(e, n));
}
function Vc(e, t, n, r) {
  typeof n == "string" && (n = [n]), n.forEach((o) => {
    e.options.ns.indexOf(o) < 0 && e.options.ns.push(o);
  }), e.loadLanguages(t, Fd(e, r));
}
function yv(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = t.languages[0], o = t.options ? t.options.fallbackLng : !1, i = t.languages[t.languages.length - 1];
  if (r.toLowerCase() === "cimode")
    return !0;
  const s = (a, c) => {
    const l = t.services.backendConnector.state[`${a}|${c}`];
    return l === -1 || l === 2;
  };
  return n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && t.services.backendConnector.backend && t.isLanguageChangingTo && !s(t.isLanguageChangingTo, e) ? !1 : !!(t.hasResourceBundle(r, e) || !t.services.backendConnector.backend || t.options.resources && !t.options.partialBundledLanguages || s(r, e) && (!o || s(i, e)));
}
function vv(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return !t.languages || !t.languages.length ? (Yi("i18n.languages were undefined or empty", t.languages), !0) : t.options.ignoreJSONStructure !== void 0 ? t.hasLoadedNamespace(e, {
    lng: n.lng,
    precheck: (o, i) => {
      if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && o.services.backendConnector.backend && o.isLanguageChangingTo && !i(o.isLanguageChangingTo, e))
        return !1;
    }
  }) : yv(e, t, n);
}
const wv = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, xv = {
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
}, Sv = (e) => xv[e], Cv = (e) => e.replace(wv, Sv);
let Xi = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Cv
};
function Ev() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  Xi = {
    ...Xi,
    ...e
  };
}
function Pv() {
  return Xi;
}
let Bd;
function Dv(e) {
  Bd = e;
}
function Rv() {
  return Bd;
}
const Iv = {
  type: "3rdParty",
  init(e) {
    Ev(e.options.react), Dv(e);
  }
}, Av = on();
class Ov {
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
const Nv = (e, t) => {
  const n = z();
  return W(() => {
    n.current = t ? n.current : e;
  }, [e, t]), n.current;
};
function Ut(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    i18n: n
  } = t, {
    i18n: r,
    defaultNS: o
  } = ut(Av) || {}, i = n || r || Rv();
  if (i && !i.reportNamespaces && (i.reportNamespaces = new Ov()), !i) {
    Yi("You will need to pass in an i18next instance by using initReactI18next");
    const b = (S, C) => typeof C == "string" ? C : C && typeof C == "object" && typeof C.defaultValue == "string" ? C.defaultValue : Array.isArray(S) ? S[S.length - 1] : S, v = [b, {}, !1];
    return v.t = b, v.i18n = {}, v.ready = !1, v;
  }
  i.options.react && i.options.react.wait !== void 0 && Yi("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const s = {
    ...Pv(),
    ...i.options.react,
    ...t
  }, {
    useSuspense: a,
    keyPrefix: c
  } = s;
  let l = e || o || i.options && i.options.defaultNS;
  l = typeof l == "string" ? [l] : l || ["translation"], i.reportNamespaces.addUsedNamespaces && i.reportNamespaces.addUsedNamespaces(l);
  const u = (i.isInitialized || i.initializedStoreOnce) && l.every((b) => vv(b, i, s));
  function f() {
    return i.getFixedT(t.lng || null, s.nsMode === "fallback" ? l : l[0], c);
  }
  const [d, p] = U(f);
  let m = l.join();
  t.lng && (m = `${t.lng}${m}`);
  const g = Nv(m), h = z(!0);
  W(() => {
    const {
      bindI18n: b,
      bindI18nStore: v
    } = s;
    h.current = !0, !u && !a && (t.lng ? Vc(i, t.lng, l, () => {
      h.current && p(f);
    }) : zc(i, l, () => {
      h.current && p(f);
    })), u && g && g !== m && h.current && p(f);
    function S() {
      h.current && p(f);
    }
    return b && i && i.on(b, S), v && i && i.store.on(v, S), () => {
      h.current = !1, b && i && b.split(" ").forEach((C) => i.off(C, S)), v && i && v.split(" ").forEach((C) => i.store.off(C, S));
    };
  }, [i, m]);
  const w = z(!0);
  W(() => {
    h.current && !w.current && p(f), w.current = !1;
  }, [i, c]);
  const y = [d, i, u];
  if (y.t = d, y.i18n = i, y.ready = u, u || !u && !a)
    return y;
  throw new Promise((b) => {
    t.lng ? Vc(i, t.lng, l, () => b()) : zc(i, l, () => b());
  });
}
var jd = { exports: {} }, zd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yn = x;
function $v(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Tv = typeof Object.is == "function" ? Object.is : $v, Lv = yn.useState, Mv = yn.useEffect, _v = yn.useLayoutEffect, kv = yn.useDebugValue;
function Fv(e, t) {
  var n = t(), r = Lv({ inst: { value: n, getSnapshot: t } }), o = r[0].inst, i = r[1];
  return _v(function() {
    o.value = n, o.getSnapshot = t, wi(o) && i({ inst: o });
  }, [e, n, t]), Mv(function() {
    return wi(o) && i({ inst: o }), e(function() {
      wi(o) && i({ inst: o });
    });
  }, [e]), kv(n), n;
}
function wi(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Tv(e, n);
  } catch {
    return !0;
  }
}
function Bv(e, t) {
  return t();
}
var jv = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Bv : Fv;
zd.useSyncExternalStore = yn.useSyncExternalStore !== void 0 ? yn.useSyncExternalStore : jv;
jd.exports = zd;
var Vd = jd.exports, Wd = { exports: {} }, Gd = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Eo = x, zv = Vd;
function Vv(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Wv = typeof Object.is == "function" ? Object.is : Vv, Gv = zv.useSyncExternalStore, Hv = Eo.useRef, Uv = Eo.useEffect, qv = Eo.useMemo, Kv = Eo.useDebugValue;
Gd.useSyncExternalStoreWithSelector = function(e, t, n, r, o) {
  var i = Hv(null);
  if (i.current === null) {
    var s = { hasValue: !1, value: null };
    i.current = s;
  } else
    s = i.current;
  i = qv(function() {
    function c(p) {
      if (!l) {
        if (l = !0, u = p, p = r(p), o !== void 0 && s.hasValue) {
          var m = s.value;
          if (o(m, p))
            return f = m;
        }
        return f = p;
      }
      if (m = f, Wv(u, p))
        return m;
      var g = r(p);
      return o !== void 0 && o(m, g) ? m : (u = p, f = g);
    }
    var l = !1, u, f, d = n === void 0 ? null : n;
    return [function() {
      return c(t());
    }, d === null ? void 0 : function() {
      return c(d());
    }];
  }, [t, n, r, o]);
  var a = Gv(e, i[0], i[1]);
  return Uv(function() {
    s.hasValue = !0, s.value = a;
  }, [a]), Kv(a), a;
};
Wd.exports = Gd;
var Yv = Wd.exports;
function Xv(e) {
  e();
}
let Hd = Xv;
const Jv = (e) => Hd = e, Qv = () => Hd, Wc = Symbol.for("react-redux-context"), Gc = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function Zv() {
  var e;
  if (!R.createContext)
    return {};
  const t = (e = Gc[Wc]) != null ? e : Gc[Wc] = /* @__PURE__ */ new Map();
  let n = t.get(R.createContext);
  return n || (n = R.createContext(null), t.set(R.createContext, n)), n;
}
const Pt = /* @__PURE__ */ Zv();
function ba(e = Pt) {
  return function() {
    return ut(e);
  };
}
const Ud = /* @__PURE__ */ ba(), qd = () => {
  throw new Error("uSES not initialized!");
};
let Kd = qd;
const e0 = (e) => {
  Kd = e;
}, t0 = (e, t) => e === t;
function n0(e = Pt) {
  const t = e === Pt ? Ud : ba(e);
  return function(r, o = {}) {
    const {
      equalityFn: i = t0,
      stabilityCheck: s = void 0,
      noopCheck: a = void 0
    } = typeof o == "function" ? {
      equalityFn: o
    } : o, {
      store: c,
      subscription: l,
      getServerState: u,
      stabilityCheck: f,
      noopCheck: d
    } = t();
    z(!0);
    const p = Q({
      [r.name](g) {
        return r(g);
      }
    }[r.name], [r, f, s]), m = Kd(l.addNestedSub, c.getState, u || c.getState, p, i);
    return sm(m), m;
  };
}
const r0 = /* @__PURE__ */ n0();
var Yd = { exports: {} }, Z = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var me = typeof Symbol == "function" && Symbol.for, ya = me ? Symbol.for("react.element") : 60103, va = me ? Symbol.for("react.portal") : 60106, Po = me ? Symbol.for("react.fragment") : 60107, Do = me ? Symbol.for("react.strict_mode") : 60108, Ro = me ? Symbol.for("react.profiler") : 60114, Io = me ? Symbol.for("react.provider") : 60109, Ao = me ? Symbol.for("react.context") : 60110, wa = me ? Symbol.for("react.async_mode") : 60111, Oo = me ? Symbol.for("react.concurrent_mode") : 60111, No = me ? Symbol.for("react.forward_ref") : 60112, $o = me ? Symbol.for("react.suspense") : 60113, o0 = me ? Symbol.for("react.suspense_list") : 60120, To = me ? Symbol.for("react.memo") : 60115, Lo = me ? Symbol.for("react.lazy") : 60116, i0 = me ? Symbol.for("react.block") : 60121, s0 = me ? Symbol.for("react.fundamental") : 60117, a0 = me ? Symbol.for("react.responder") : 60118, c0 = me ? Symbol.for("react.scope") : 60119;
function He(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case ya:
        switch (e = e.type, e) {
          case wa:
          case Oo:
          case Po:
          case Ro:
          case Do:
          case $o:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case Ao:
              case No:
              case Lo:
              case To:
              case Io:
                return e;
              default:
                return t;
            }
        }
      case va:
        return t;
    }
  }
}
function Xd(e) {
  return He(e) === Oo;
}
Z.AsyncMode = wa;
Z.ConcurrentMode = Oo;
Z.ContextConsumer = Ao;
Z.ContextProvider = Io;
Z.Element = ya;
Z.ForwardRef = No;
Z.Fragment = Po;
Z.Lazy = Lo;
Z.Memo = To;
Z.Portal = va;
Z.Profiler = Ro;
Z.StrictMode = Do;
Z.Suspense = $o;
Z.isAsyncMode = function(e) {
  return Xd(e) || He(e) === wa;
};
Z.isConcurrentMode = Xd;
Z.isContextConsumer = function(e) {
  return He(e) === Ao;
};
Z.isContextProvider = function(e) {
  return He(e) === Io;
};
Z.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ya;
};
Z.isForwardRef = function(e) {
  return He(e) === No;
};
Z.isFragment = function(e) {
  return He(e) === Po;
};
Z.isLazy = function(e) {
  return He(e) === Lo;
};
Z.isMemo = function(e) {
  return He(e) === To;
};
Z.isPortal = function(e) {
  return He(e) === va;
};
Z.isProfiler = function(e) {
  return He(e) === Ro;
};
Z.isStrictMode = function(e) {
  return He(e) === Do;
};
Z.isSuspense = function(e) {
  return He(e) === $o;
};
Z.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Po || e === Oo || e === Ro || e === Do || e === $o || e === o0 || typeof e == "object" && e !== null && (e.$$typeof === Lo || e.$$typeof === To || e.$$typeof === Io || e.$$typeof === Ao || e.$$typeof === No || e.$$typeof === s0 || e.$$typeof === a0 || e.$$typeof === c0 || e.$$typeof === i0);
};
Z.typeOf = He;
Yd.exports = Z;
var l0 = Yd.exports, xa = l0, u0 = {
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
}, d0 = {
  name: !0,
  length: !0,
  prototype: !0,
  caller: !0,
  callee: !0,
  arguments: !0,
  arity: !0
}, f0 = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, Jd = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, Sa = {};
Sa[xa.ForwardRef] = f0;
Sa[xa.Memo] = Jd;
function Hc(e) {
  return xa.isMemo(e) ? Jd : Sa[e.$$typeof] || u0;
}
var p0 = Object.defineProperty, m0 = Object.getOwnPropertyNames, Uc = Object.getOwnPropertySymbols, g0 = Object.getOwnPropertyDescriptor, h0 = Object.getPrototypeOf, qc = Object.prototype;
function Qd(e, t, n) {
  if (typeof t != "string") {
    if (qc) {
      var r = h0(t);
      r && r !== qc && Qd(e, r, n);
    }
    var o = m0(t);
    Uc && (o = o.concat(Uc(t)));
    for (var i = Hc(e), s = Hc(t), a = 0; a < o.length; ++a) {
      var c = o[a];
      if (!d0[c] && !(n && n[c]) && !(s && s[c]) && !(i && i[c])) {
        var l = g0(t, c);
        try {
          p0(e, c, l);
        } catch {
        }
      }
    }
  }
  return e;
}
var b0 = Qd;
const Kc = /* @__PURE__ */ nu(b0);
var Zd = { exports: {} }, ee = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ca = Symbol.for("react.element"), Ea = Symbol.for("react.portal"), Mo = Symbol.for("react.fragment"), _o = Symbol.for("react.strict_mode"), ko = Symbol.for("react.profiler"), Fo = Symbol.for("react.provider"), Bo = Symbol.for("react.context"), y0 = Symbol.for("react.server_context"), jo = Symbol.for("react.forward_ref"), zo = Symbol.for("react.suspense"), Vo = Symbol.for("react.suspense_list"), Wo = Symbol.for("react.memo"), Go = Symbol.for("react.lazy"), v0 = Symbol.for("react.offscreen"), ef;
ef = Symbol.for("react.module.reference");
function rt(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Ca:
        switch (e = e.type, e) {
          case Mo:
          case ko:
          case _o:
          case zo:
          case Vo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case y0:
              case Bo:
              case jo:
              case Go:
              case Wo:
              case Fo:
                return e;
              default:
                return t;
            }
        }
      case Ea:
        return t;
    }
  }
}
ee.ContextConsumer = Bo;
ee.ContextProvider = Fo;
ee.Element = Ca;
ee.ForwardRef = jo;
ee.Fragment = Mo;
ee.Lazy = Go;
ee.Memo = Wo;
ee.Portal = Ea;
ee.Profiler = ko;
ee.StrictMode = _o;
ee.Suspense = zo;
ee.SuspenseList = Vo;
ee.isAsyncMode = function() {
  return !1;
};
ee.isConcurrentMode = function() {
  return !1;
};
ee.isContextConsumer = function(e) {
  return rt(e) === Bo;
};
ee.isContextProvider = function(e) {
  return rt(e) === Fo;
};
ee.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ca;
};
ee.isForwardRef = function(e) {
  return rt(e) === jo;
};
ee.isFragment = function(e) {
  return rt(e) === Mo;
};
ee.isLazy = function(e) {
  return rt(e) === Go;
};
ee.isMemo = function(e) {
  return rt(e) === Wo;
};
ee.isPortal = function(e) {
  return rt(e) === Ea;
};
ee.isProfiler = function(e) {
  return rt(e) === ko;
};
ee.isStrictMode = function(e) {
  return rt(e) === _o;
};
ee.isSuspense = function(e) {
  return rt(e) === zo;
};
ee.isSuspenseList = function(e) {
  return rt(e) === Vo;
};
ee.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Mo || e === ko || e === _o || e === zo || e === Vo || e === v0 || typeof e == "object" && e !== null && (e.$$typeof === Go || e.$$typeof === Wo || e.$$typeof === Fo || e.$$typeof === Bo || e.$$typeof === jo || e.$$typeof === ef || e.getModuleId !== void 0);
};
ee.typeOf = rt;
Zd.exports = ee;
var w0 = Zd.exports;
const x0 = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];
function S0(e, t, n, r, {
  areStatesEqual: o,
  areOwnPropsEqual: i,
  areStatePropsEqual: s
}) {
  let a = !1, c, l, u, f, d;
  function p(y, b) {
    return c = y, l = b, u = e(c, l), f = t(r, l), d = n(u, f, l), a = !0, d;
  }
  function m() {
    return u = e(c, l), t.dependsOnOwnProps && (f = t(r, l)), d = n(u, f, l), d;
  }
  function g() {
    return e.dependsOnOwnProps && (u = e(c, l)), t.dependsOnOwnProps && (f = t(r, l)), d = n(u, f, l), d;
  }
  function h() {
    const y = e(c, l), b = !s(y, u);
    return u = y, b && (d = n(u, f, l)), d;
  }
  function w(y, b) {
    const v = !i(b, l), S = !o(y, c, b, l);
    return c = y, l = b, v && S ? m() : v ? g() : S ? h() : d;
  }
  return function(b, v) {
    return a ? w(b, v) : p(b, v);
  };
}
function C0(e, t) {
  let {
    initMapStateToProps: n,
    initMapDispatchToProps: r,
    initMergeProps: o
  } = t, i = Td(t, x0);
  const s = n(e, i), a = r(e, i), c = o(e, i);
  return S0(s, a, c, e, i);
}
function E0(e, t) {
  const n = {};
  for (const r in e) {
    const o = e[r];
    typeof o == "function" && (n[r] = (...i) => t(o(...i)));
  }
  return n;
}
function Ji(e) {
  return function(n) {
    const r = e(n);
    function o() {
      return r;
    }
    return o.dependsOnOwnProps = !1, o;
  };
}
function Yc(e) {
  return e.dependsOnOwnProps ? !!e.dependsOnOwnProps : e.length !== 1;
}
function tf(e, t) {
  return function(r, {
    displayName: o
  }) {
    const i = function(a, c) {
      return i.dependsOnOwnProps ? i.mapToProps(a, c) : i.mapToProps(a, void 0);
    };
    return i.dependsOnOwnProps = !0, i.mapToProps = function(a, c) {
      i.mapToProps = e, i.dependsOnOwnProps = Yc(e);
      let l = i(a, c);
      return typeof l == "function" && (i.mapToProps = l, i.dependsOnOwnProps = Yc(l), l = i(a, c)), l;
    }, i;
  };
}
function Pa(e, t) {
  return (n, r) => {
    throw new Error(`Invalid value of type ${typeof e} for ${t} argument when connecting component ${r.wrappedComponentName}.`);
  };
}
function P0(e) {
  return e && typeof e == "object" ? Ji((t) => (
    // @ts-ignore
    E0(e, t)
  )) : e ? typeof e == "function" ? (
    // @ts-ignore
    tf(e)
  ) : Pa(e, "mapDispatchToProps") : Ji((t) => ({
    dispatch: t
  }));
}
function D0(e) {
  return e ? typeof e == "function" ? (
    // @ts-ignore
    tf(e)
  ) : Pa(e, "mapStateToProps") : Ji(() => ({}));
}
function R0(e, t, n) {
  return $t({}, n, e, t);
}
function I0(e) {
  return function(n, {
    displayName: r,
    areMergedPropsEqual: o
  }) {
    let i = !1, s;
    return function(c, l, u) {
      const f = e(c, l, u);
      return i ? o(f, s) || (s = f) : (i = !0, s = f), s;
    };
  };
}
function A0(e) {
  return e ? typeof e == "function" ? I0(e) : Pa(e, "mergeProps") : () => R0;
}
function O0() {
  const e = Qv();
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
      let o = !0, i = n = {
        callback: r,
        next: null,
        prev: n
      };
      return i.prev ? i.prev.next = i : t = i, function() {
        !o || t === null || (o = !1, i.next ? i.next.prev = i.prev : n = i.prev, i.prev ? i.prev.next = i.next : t = i.next);
      };
    }
  };
}
const Xc = {
  notify() {
  },
  get: () => []
};
function nf(e, t) {
  let n, r = Xc, o = 0, i = !1;
  function s(g) {
    u();
    const h = r.subscribe(g);
    let w = !1;
    return () => {
      w || (w = !0, h(), f());
    };
  }
  function a() {
    r.notify();
  }
  function c() {
    m.onStateChange && m.onStateChange();
  }
  function l() {
    return i;
  }
  function u() {
    o++, n || (n = t ? t.addNestedSub(c) : e.subscribe(c), r = O0());
  }
  function f() {
    o--, n && o === 0 && (n(), n = void 0, r.clear(), r = Xc);
  }
  function d() {
    i || (i = !0, u());
  }
  function p() {
    i && (i = !1, f());
  }
  const m = {
    addNestedSub: s,
    notifyNestedSubs: a,
    handleChangeWrapper: c,
    isSubscribed: l,
    trySubscribe: d,
    tryUnsubscribe: p,
    getListeners: () => r
  };
  return m;
}
const N0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", jr = N0 ? R.useLayoutEffect : R.useEffect;
function Jc(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function xi(e, t) {
  if (Jc(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (let o = 0; o < n.length; o++)
    if (!Object.prototype.hasOwnProperty.call(t, n[o]) || !Jc(e[n[o]], t[n[o]]))
      return !1;
  return !0;
}
const $0 = ["reactReduxForwardedRef"];
let rf = qd;
const T0 = (e) => {
  rf = e;
}, L0 = [null, null];
function M0(e, t, n) {
  jr(() => e(...t), n);
}
function _0(e, t, n, r, o, i) {
  e.current = r, n.current = !1, o.current && (o.current = null, i());
}
function k0(e, t, n, r, o, i, s, a, c, l, u) {
  if (!e)
    return () => {
    };
  let f = !1, d = null;
  const p = () => {
    if (f || !a.current)
      return;
    const g = t.getState();
    let h, w;
    try {
      h = r(g, o.current);
    } catch (y) {
      w = y, d = y;
    }
    w || (d = null), h === i.current ? s.current || l() : (i.current = h, c.current = h, s.current = !0, u());
  };
  return n.onStateChange = p, n.trySubscribe(), p(), () => {
    if (f = !0, n.tryUnsubscribe(), n.onStateChange = null, d)
      throw d;
  };
}
function F0(e, t) {
  return e === t;
}
function of(e, t, n, {
  // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
  // @ts-ignore
  pure: r,
  areStatesEqual: o = F0,
  areOwnPropsEqual: i = xi,
  areStatePropsEqual: s = xi,
  areMergedPropsEqual: a = xi,
  // use React's forwardRef to expose a ref of the wrapped component
  forwardRef: c = !1,
  // the context consumer to use
  context: l = Pt
} = {}) {
  const u = l, f = D0(e), d = P0(t), p = A0(n), m = !!e;
  return (h) => {
    const w = h.displayName || h.name || "Component", y = `Connect(${w})`, b = {
      shouldHandleStateChanges: m,
      displayName: y,
      wrappedComponentName: w,
      WrappedComponent: h,
      // @ts-ignore
      initMapStateToProps: f,
      // @ts-ignore
      initMapDispatchToProps: d,
      initMergeProps: p,
      areStatesEqual: o,
      areStatePropsEqual: s,
      areOwnPropsEqual: i,
      areMergedPropsEqual: a
    };
    function v(P) {
      const [E, O, T] = R.useMemo(() => {
        const {
          reactReduxForwardedRef: ae
        } = P, Y = Td(P, $0);
        return [P.context, ae, Y];
      }, [P]), $ = R.useMemo(() => E && E.Consumer && // @ts-ignore
      w0.isContextConsumer(/* @__PURE__ */ R.createElement(E.Consumer, null)) ? E : u, [E, u]), M = R.useContext($), _ = !!P.store && !!P.store.getState && !!P.store.dispatch, A = !!M && !!M.store, L = _ ? P.store : M.store, I = A ? M.getServerState : L.getState, B = R.useMemo(() => C0(L.dispatch, b), [L]), [N, G] = R.useMemo(() => {
        if (!m)
          return L0;
        const ae = nf(L, _ ? void 0 : M.subscription), Y = ae.notifyNestedSubs.bind(ae);
        return [ae, Y];
      }, [L, _, M]), X = R.useMemo(() => _ ? M : $t({}, M, {
        subscription: N
      }), [_, M, N]), ne = R.useRef(), ve = R.useRef(T), le = R.useRef(), Ne = R.useRef(!1);
      R.useRef(!1);
      const we = R.useRef(!1), re = R.useRef();
      jr(() => (we.current = !0, () => {
        we.current = !1;
      }), []);
      const xe = R.useMemo(() => () => le.current && T === ve.current ? le.current : B(L.getState(), T), [L, T]), _e = R.useMemo(() => (Y) => N ? k0(
        m,
        L,
        N,
        // @ts-ignore
        B,
        ve,
        ne,
        Ne,
        we,
        le,
        G,
        Y
      ) : () => {
      }, [N]);
      M0(_0, [ve, ne, Ne, T, le, G]);
      let Ee;
      try {
        Ee = rf(
          // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
          _e,
          // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
          // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
          xe,
          I ? () => B(I(), T) : xe
        );
      } catch (ae) {
        throw re.current && (ae.message += `
The error may be correlated with this previous error:
${re.current.stack}

`), ae;
      }
      jr(() => {
        re.current = void 0, le.current = void 0, ne.current = Ee;
      });
      const Pe = R.useMemo(() => (
        // @ts-ignore
        /* @__PURE__ */ R.createElement(h, $t({}, Ee, {
          ref: O
        }))
      ), [O, h, Ee]);
      return R.useMemo(() => m ? /* @__PURE__ */ R.createElement($.Provider, {
        value: X
      }, Pe) : Pe, [$, Pe, X]);
    }
    const C = R.memo(v);
    if (C.WrappedComponent = h, C.displayName = v.displayName = y, c) {
      const E = R.forwardRef(function(T, $) {
        return /* @__PURE__ */ R.createElement(C, $t({}, T, {
          reactReduxForwardedRef: $
        }));
      });
      return E.displayName = y, E.WrappedComponent = h, Kc(E, h);
    }
    return Kc(C, h);
  };
}
function sf({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: o = "once",
  noopCheck: i = "once"
}) {
  const s = R.useMemo(() => {
    const l = nf(e);
    return {
      store: e,
      subscription: l,
      getServerState: r ? () => r : void 0,
      stabilityCheck: o,
      noopCheck: i
    };
  }, [e, r, o, i]), a = R.useMemo(() => e.getState(), [e]);
  jr(() => {
    const {
      subscription: l
    } = s;
    return l.onStateChange = l.notifyNestedSubs, l.trySubscribe(), a !== e.getState() && l.notifyNestedSubs(), () => {
      l.tryUnsubscribe(), l.onStateChange = void 0;
    };
  }, [s, a]);
  const c = t || Pt;
  return /* @__PURE__ */ R.createElement(c.Provider, {
    value: s
  }, n);
}
function af(e = Pt) {
  const t = (
    // @ts-ignore
    e === Pt ? Ud : (
      // @ts-ignore
      ba(e)
    )
  );
  return function() {
    const {
      store: r
    } = t();
    return r;
  };
}
const B0 = /* @__PURE__ */ af();
function j0(e = Pt) {
  const t = (
    // @ts-ignore
    e === Pt ? B0 : af(e)
  );
  return function() {
    return t().dispatch;
  };
}
const z0 = /* @__PURE__ */ j0();
e0(Yv.useSyncExternalStoreWithSelector);
T0(Vd.useSyncExternalStore);
Jv(lm);
const ur = z0, ue = r0;
function be(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var V0 = /* @__PURE__ */ (() => typeof Symbol == "function" && Symbol.observable || "@@observable")(), Qc = V0, Si = () => Math.random().toString(36).substring(7).split("").join("."), W0 = {
  INIT: `@@redux/INIT${Si()}`,
  REPLACE: `@@redux/REPLACE${Si()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Si()}`
}, zr = W0;
function Da(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function cf(e, t, n) {
  if (typeof e != "function")
    throw new Error(be(2));
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(be(0));
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(be(1));
    return n(cf)(e, t);
  }
  let r = e, o = t, i = /* @__PURE__ */ new Map(), s = i, a = 0, c = !1;
  function l() {
    s === i && (s = /* @__PURE__ */ new Map(), i.forEach((h, w) => {
      s.set(w, h);
    }));
  }
  function u() {
    if (c)
      throw new Error(be(3));
    return o;
  }
  function f(h) {
    if (typeof h != "function")
      throw new Error(be(4));
    if (c)
      throw new Error(be(5));
    let w = !0;
    l();
    const y = a++;
    return s.set(y, h), function() {
      if (w) {
        if (c)
          throw new Error(be(6));
        w = !1, l(), s.delete(y), i = null;
      }
    };
  }
  function d(h) {
    if (!Da(h))
      throw new Error(be(7));
    if (typeof h.type > "u")
      throw new Error(be(8));
    if (typeof h.type != "string")
      throw new Error(be(17));
    if (c)
      throw new Error(be(9));
    try {
      c = !0, o = r(o, h);
    } finally {
      c = !1;
    }
    return (i = s).forEach((y) => {
      y();
    }), h;
  }
  function p(h) {
    if (typeof h != "function")
      throw new Error(be(10));
    r = h, d({
      type: zr.REPLACE
    });
  }
  function m() {
    const h = f;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(w) {
        if (typeof w != "object" || w === null)
          throw new Error(be(11));
        function y() {
          const v = w;
          v.next && v.next(u());
        }
        return y(), {
          unsubscribe: h(y)
        };
      },
      [Qc]() {
        return this;
      }
    };
  }
  return d({
    type: zr.INIT
  }), {
    dispatch: d,
    subscribe: f,
    getState: u,
    replaceReducer: p,
    [Qc]: m
  };
}
function G0(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (typeof n(void 0, {
      type: zr.INIT
    }) > "u")
      throw new Error(be(12));
    if (typeof n(void 0, {
      type: zr.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(be(13));
  });
}
function H0(e) {
  const t = Object.keys(e), n = {};
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    typeof e[s] == "function" && (n[s] = e[s]);
  }
  const r = Object.keys(n);
  let o;
  try {
    G0(n);
  } catch (i) {
    o = i;
  }
  return function(s = {}, a) {
    if (o)
      throw o;
    let c = !1;
    const l = {};
    for (let u = 0; u < r.length; u++) {
      const f = r[u], d = n[f], p = s[f], m = d(p, a);
      if (typeof m > "u")
        throw a && a.type, new Error(be(14));
      l[f] = m, c = c || m !== p;
    }
    return c = c || r.length !== Object.keys(s).length, c ? l : s;
  };
}
function Vr(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, n) => (...r) => t(n(...r)));
}
function U0(...e) {
  return (t) => (n, r) => {
    const o = t(n, r);
    let i = () => {
      throw new Error(be(15));
    };
    const s = {
      getState: o.getState,
      dispatch: (c, ...l) => i(c, ...l)
    }, a = e.map((c) => c(s));
    return i = Vr(...a)(o.dispatch), {
      ...o,
      dispatch: i
    };
  };
}
function q0(e) {
  return Da(e) && "type" in e && typeof e.type == "string";
}
var lf = Symbol.for("immer-nothing"), Zc = Symbol.for("immer-draftable"), We = Symbol.for("immer-state");
function ot(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var vn = Object.getPrototypeOf;
function jt(e) {
  return !!e && !!e[We];
}
function Dt(e) {
  var t;
  return e ? uf(e) || Array.isArray(e) || !!e[Zc] || !!((t = e.constructor) != null && t[Zc]) || Uo(e) || qo(e) : !1;
}
var K0 = Object.prototype.constructor.toString();
function uf(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = vn(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === K0;
}
function Wn(e, t) {
  Ho(e) === 0 ? Object.entries(e).forEach(([n, r]) => {
    t(n, r, e);
  }) : e.forEach((n, r) => t(r, n, e));
}
function Ho(e) {
  const t = e[We];
  return t ? t.type_ : Array.isArray(e) ? 1 : Uo(e) ? 2 : qo(e) ? 3 : 0;
}
function Qi(e, t) {
  return Ho(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function df(e, t, n) {
  const r = Ho(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
}
function Y0(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Uo(e) {
  return e instanceof Map;
}
function qo(e) {
  return e instanceof Set;
}
function Xt(e) {
  return e.copy_ || e.base_;
}
function Zi(e, t) {
  if (Uo(e))
    return new Map(e);
  if (qo(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && uf(e))
    return vn(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[We];
  let r = Reflect.ownKeys(n);
  for (let o = 0; o < r.length; o++) {
    const i = r[o], s = n[i];
    s.writable === !1 && (s.writable = !0, s.configurable = !0), (s.get || s.set) && (n[i] = {
      configurable: !0,
      writable: !0,
      // could live with !!desc.set as well here...
      enumerable: s.enumerable,
      value: e[i]
    });
  }
  return Object.create(vn(e), n);
}
function Ra(e, t = !1) {
  return Ko(e) || jt(e) || !Dt(e) || (Ho(e) > 1 && (e.set = e.add = e.clear = e.delete = X0), Object.freeze(e), t && Wn(e, (n, r) => Ra(r, !0))), e;
}
function X0() {
  ot(2);
}
function Ko(e) {
  return Object.isFrozen(e);
}
var J0 = {};
function nn(e) {
  const t = J0[e];
  return t || ot(0, e), t;
}
var Gn;
function ff() {
  return Gn;
}
function Q0(e, t) {
  return {
    drafts_: [],
    parent_: e,
    immer_: t,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0
  };
}
function el(e, t) {
  t && (nn("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function es(e) {
  ts(e), e.drafts_.forEach(Z0), e.drafts_ = null;
}
function ts(e) {
  e === Gn && (Gn = e.parent_);
}
function tl(e) {
  return Gn = Q0(Gn, e);
}
function Z0(e) {
  const t = e[We];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function nl(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[We].modified_ && (es(t), ot(4)), Dt(e) && (e = Wr(t, e), t.parent_ || Gr(t, e)), t.patches_ && nn("Patches").generateReplacementPatches_(
    n[We].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Wr(t, n, []), es(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== lf ? e : void 0;
}
function Wr(e, t, n) {
  if (Ko(t))
    return t;
  const r = t[We];
  if (!r)
    return Wn(
      t,
      (o, i) => rl(e, r, t, o, i, n)
    ), t;
  if (r.scope_ !== e)
    return t;
  if (!r.modified_)
    return Gr(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    r.finalized_ = !0, r.scope_.unfinalizedDrafts_--;
    const o = r.copy_;
    let i = o, s = !1;
    r.type_ === 3 && (i = new Set(o), o.clear(), s = !0), Wn(
      i,
      (a, c) => rl(e, r, o, a, c, n, s)
    ), Gr(e, o, !1), n && e.patches_ && nn("Patches").generatePatches_(
      r,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return r.copy_;
}
function rl(e, t, n, r, o, i, s) {
  if (jt(o)) {
    const a = i && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !Qi(t.assigned_, r) ? i.concat(r) : void 0, c = Wr(e, o, a);
    if (df(n, r, c), jt(c))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    s && n.add(o);
  if (Dt(o) && !Ko(o)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    Wr(e, o), (!t || !t.scope_.parent_) && Gr(e, o);
  }
}
function Gr(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Ra(t, n);
}
function ew(e, t) {
  const n = Array.isArray(e), r = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : ff(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1
  };
  let o = r, i = Ia;
  n && (o = [r], i = Hn);
  const { revoke: s, proxy: a } = Proxy.revocable(o, i);
  return r.draft_ = a, r.revoke_ = s, a;
}
var Ia = {
  get(e, t) {
    if (t === We)
      return e;
    const n = Xt(e);
    if (!Qi(n, t))
      return tw(e, n, t);
    const r = n[t];
    return e.finalized_ || !Dt(r) ? r : r === Ci(e.base_, t) ? (Ei(e), e.copy_[t] = rs(r, e)) : r;
  },
  has(e, t) {
    return t in Xt(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Xt(e));
  },
  set(e, t, n) {
    const r = pf(Xt(e), t);
    if (r != null && r.set)
      return r.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const o = Ci(Xt(e), t), i = o == null ? void 0 : o[We];
      if (i && i.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (Y0(n, o) && (n !== void 0 || Qi(e.base_, t)))
        return !0;
      Ei(e), ns(e);
    }
    return e.copy_[t] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Ci(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Ei(e), ns(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const n = Xt(e), r = Reflect.getOwnPropertyDescriptor(n, t);
    return r && {
      writable: !0,
      configurable: e.type_ !== 1 || t !== "length",
      enumerable: r.enumerable,
      value: n[t]
    };
  },
  defineProperty() {
    ot(11);
  },
  getPrototypeOf(e) {
    return vn(e.base_);
  },
  setPrototypeOf() {
    ot(12);
  }
}, Hn = {};
Wn(Ia, (e, t) => {
  Hn[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Hn.deleteProperty = function(e, t) {
  return Hn.set.call(this, e, t, void 0);
};
Hn.set = function(e, t, n) {
  return Ia.set.call(this, e[0], t, n, e[0]);
};
function Ci(e, t) {
  const n = e[We];
  return (n ? Xt(n) : e)[t];
}
function tw(e, t, n) {
  var o;
  const r = pf(t, n);
  return r ? "value" in r ? r.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (o = r.get) == null ? void 0 : o.call(e.draft_)
  ) : void 0;
}
function pf(e, t) {
  if (!(t in e))
    return;
  let n = vn(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r)
      return r;
    n = vn(n);
  }
}
function ns(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && ns(e.parent_));
}
function Ei(e) {
  e.copy_ || (e.copy_ = Zi(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var nw = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.produce = (t, n, r) => {
      if (typeof t == "function" && typeof n != "function") {
        const i = n;
        n = t;
        const s = this;
        return function(c = i, ...l) {
          return s.produce(c, (u) => n.call(this, u, ...l));
        };
      }
      typeof n != "function" && ot(6), r !== void 0 && typeof r != "function" && ot(7);
      let o;
      if (Dt(t)) {
        const i = tl(this), s = rs(t, void 0);
        let a = !0;
        try {
          o = n(s), a = !1;
        } finally {
          a ? es(i) : ts(i);
        }
        return el(i, r), nl(o, i);
      } else if (!t || typeof t != "object") {
        if (o = n(t), o === void 0 && (o = t), o === lf && (o = void 0), this.autoFreeze_ && Ra(o, !0), r) {
          const i = [], s = [];
          nn("Patches").generateReplacementPatches_(t, o, i, s), r(i, s);
        }
        return o;
      } else
        ot(1, t);
    }, this.produceWithPatches = (t, n) => {
      if (typeof t == "function")
        return (s, ...a) => this.produceWithPatches(s, (c) => t(c, ...a));
      let r, o;
      return [this.produce(t, n, (s, a) => {
        r = s, o = a;
      }), r, o];
    }, typeof (e == null ? void 0 : e.autoFreeze) == "boolean" && this.setAutoFreeze(e.autoFreeze), typeof (e == null ? void 0 : e.useStrictShallowCopy) == "boolean" && this.setUseStrictShallowCopy(e.useStrictShallowCopy);
  }
  createDraft(e) {
    Dt(e) || ot(8), jt(e) && (e = mf(e));
    const t = tl(this), n = rs(e, void 0);
    return n[We].isManual_ = !0, ts(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[We];
    (!n || !n.isManual_) && ot(9);
    const { scope_: r } = n;
    return el(r, t), nl(void 0, r);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  applyPatches(e, t) {
    let n;
    for (n = t.length - 1; n >= 0; n--) {
      const o = t[n];
      if (o.path.length === 0 && o.op === "replace") {
        e = o.value;
        break;
      }
    }
    n > -1 && (t = t.slice(n + 1));
    const r = nn("Patches").applyPatches_;
    return jt(e) ? r(e, t) : this.produce(
      e,
      (o) => r(o, t)
    );
  }
};
function rs(e, t) {
  const n = Uo(e) ? nn("MapSet").proxyMap_(e, t) : qo(e) ? nn("MapSet").proxySet_(e, t) : ew(e, t);
  return (t ? t.scope_ : ff()).drafts_.push(n), n;
}
function mf(e) {
  return jt(e) || ot(10, e), gf(e);
}
function gf(e) {
  if (!Dt(e) || Ko(e))
    return e;
  const t = e[We];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = Zi(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = Zi(e, !0);
  return Wn(n, (r, o) => {
    df(n, r, gf(o));
  }), t && (t.finalized_ = !1), n;
}
var Ge = new nw(), hf = Ge.produce;
Ge.produceWithPatches.bind(
  Ge
);
Ge.setAutoFreeze.bind(Ge);
Ge.setUseStrictShallowCopy.bind(Ge);
Ge.applyPatches.bind(Ge);
Ge.createDraft.bind(Ge);
Ge.finishDraft.bind(Ge);
function rw(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function ow(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function iw(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (r) => typeof r == "function" ? `function ${r.name || "unnamed"}()` : typeof r
    ).join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var ol = (e) => Array.isArray(e) ? e : [e];
function sw(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return iw(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function aw(e, t) {
  const n = [], { length: r } = e;
  for (let o = 0; o < r; o++)
    n.push(e[o].apply(null, t));
  return n;
}
var cw = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, lw = typeof WeakRef < "u" ? WeakRef : cw, uw = 0, il = 1;
function vr() {
  return {
    s: uw,
    v: void 0,
    o: null,
    p: null
  };
}
function Aa(e, t = {}) {
  let n = vr();
  const { resultEqualityCheck: r } = t;
  let o, i = 0;
  function s() {
    var f;
    let a = n;
    const { length: c } = arguments;
    for (let d = 0, p = c; d < p; d++) {
      const m = arguments[d];
      if (typeof m == "function" || typeof m == "object" && m !== null) {
        let g = a.o;
        g === null && (a.o = g = /* @__PURE__ */ new WeakMap());
        const h = g.get(m);
        h === void 0 ? (a = vr(), g.set(m, a)) : a = h;
      } else {
        let g = a.p;
        g === null && (a.p = g = /* @__PURE__ */ new Map());
        const h = g.get(m);
        h === void 0 ? (a = vr(), g.set(m, a)) : a = h;
      }
    }
    const l = a;
    let u;
    if (a.s === il ? u = a.v : (u = e.apply(null, arguments), i++), l.s = il, r) {
      const d = ((f = o == null ? void 0 : o.deref) == null ? void 0 : f.call(o)) ?? o;
      d != null && r(d, u) && (u = d, i !== 0 && i--), o = typeof u == "object" && u !== null || typeof u == "function" ? new lw(u) : u;
    }
    return l.v = u, u;
  }
  return s.clearCache = () => {
    n = vr(), s.resetResultsCount();
  }, s.resultsCount = () => i, s.resetResultsCount = () => {
    i = 0;
  }, s;
}
function bf(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, r = (...o) => {
    let i = 0, s = 0, a, c = {}, l = o.pop();
    typeof l == "object" && (c = l, l = o.pop()), rw(
      l,
      `createSelector expects an output function after the inputs, but received: [${typeof l}]`
    );
    const u = {
      ...n,
      ...c
    }, {
      memoize: f,
      memoizeOptions: d = [],
      argsMemoize: p = Aa,
      argsMemoizeOptions: m = [],
      devModeChecks: g = {}
    } = u, h = ol(d), w = ol(m), y = sw(o), b = f(function() {
      return i++, l.apply(
        null,
        arguments
      );
    }, ...h), v = p(function() {
      s++;
      const C = aw(
        y,
        arguments
      );
      return a = b.apply(null, C), a;
    }, ...w);
    return Object.assign(v, {
      resultFunc: l,
      memoizedResultFunc: b,
      dependencies: y,
      dependencyRecomputations: () => s,
      resetDependencyRecomputations: () => {
        s = 0;
      },
      lastResult: () => a,
      recomputations: () => i,
      resetRecomputations: () => {
        i = 0;
      },
      memoize: f,
      argsMemoize: p
    });
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var yf = /* @__PURE__ */ bf(Aa), dw = Object.assign(
  (e, t = yf) => {
    ow(
      e,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof e}`
    );
    const n = Object.keys(e), r = n.map(
      (i) => e[i]
    );
    return t(
      r,
      (...i) => i.reduce((s, a, c) => (s[n[c]] = a, s), {})
    );
  },
  { withTypes: () => dw }
);
function vf(e) {
  return ({ dispatch: n, getState: r }) => (o) => (i) => typeof i == "function" ? i(n, r, e) : o(i);
}
var fw = vf(), pw = vf, mw = (...e) => {
  const t = bf(...e), n = Object.assign((...r) => {
    const o = t(...r), i = (s, ...a) => o(jt(s) ? mf(s) : s, ...a);
    return Object.assign(i, o), i;
  }, {
    withTypes: () => n
  });
  return n;
};
mw(Aa);
var gw = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Vr : Vr.apply(null, arguments);
}, hw = (e) => e && typeof e.match == "function";
function St(e, t) {
  function n(...r) {
    if (t) {
      let o = t(...r);
      if (!o)
        throw new Error(Me(0));
      return {
        type: e,
        payload: o.payload,
        ..."meta" in o && {
          meta: o.meta
        },
        ..."error" in o && {
          error: o.error
        }
      };
    }
    return {
      type: e,
      payload: r[0]
    };
  }
  return n.toString = () => `${e}`, n.type = e, n.match = (r) => q0(r) && r.type === e, n;
}
var wf = class kn extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, kn.prototype);
  }
  static get [Symbol.species]() {
    return kn;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new kn(...t[0].concat(this)) : new kn(...t.concat(this));
  }
};
function sl(e) {
  return Dt(e) ? hf(e, () => {
  }) : e;
}
function al(e, t, n) {
  if (e.has(t)) {
    let o = e.get(t);
    return n.update && (o = n.update(o, t, e), e.set(t, o)), o;
  }
  if (!n.insert)
    throw new Error(Me(10));
  const r = n.insert(t, e);
  return e.set(t, r), r;
}
function bw(e) {
  return typeof e == "boolean";
}
var yw = () => function(t) {
  const {
    thunk: n = !0,
    immutableCheck: r = !0,
    serializableCheck: o = !0,
    actionCreatorCheck: i = !0
  } = t ?? {};
  let s = new wf();
  return n && (bw(n) ? s.push(fw) : s.push(pw(n.extraArgument))), s;
}, vw = "RTK_autoBatch", xf = (e) => (t) => {
  setTimeout(t, e);
}, ww = typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : xf(10), xw = (e = {
  type: "raf"
}) => (t) => (...n) => {
  const r = t(...n);
  let o = !0, i = !1, s = !1;
  const a = /* @__PURE__ */ new Set(), c = e.type === "tick" ? queueMicrotask : e.type === "raf" ? ww : e.type === "callback" ? e.queueNotification : xf(e.timeout), l = () => {
    s = !1, i && (i = !1, a.forEach((u) => u()));
  };
  return Object.assign({}, r, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(u) {
      const f = () => o && u(), d = r.subscribe(f);
      return a.add(u), () => {
        d(), a.delete(u);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(u) {
      var f;
      try {
        return o = !((f = u == null ? void 0 : u.meta) != null && f[vw]), i = !o, i && (s || (s = !0, c(l))), r.dispatch(u);
      } finally {
        o = !0;
      }
    }
  });
}, Sw = (e) => function(n) {
  const {
    autoBatch: r = !0
  } = n ?? {};
  let o = new wf(e);
  return r && o.push(xw(typeof r == "object" ? r : void 0)), o;
}, Cw = !0;
function Ew(e) {
  const t = yw(), {
    reducer: n = void 0,
    middleware: r,
    devTools: o = !0,
    preloadedState: i = void 0,
    enhancers: s = void 0
  } = e || {};
  let a;
  if (typeof n == "function")
    a = n;
  else if (Da(n))
    a = H0(n);
  else
    throw new Error(Me(1));
  let c;
  typeof r == "function" ? c = r(t) : c = t();
  let l = Vr;
  o && (l = gw({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !Cw,
    ...typeof o == "object" && o
  }));
  const u = U0(...c), f = Sw(u);
  let d = typeof s == "function" ? s(f) : f();
  const p = l(...d);
  return cf(a, i, p);
}
function Sf(e) {
  const t = {}, n = [];
  let r;
  const o = {
    addCase(i, s) {
      const a = typeof i == "string" ? i : i.type;
      if (!a)
        throw new Error(Me(28));
      if (a in t)
        throw new Error(Me(29));
      return t[a] = s, o;
    },
    addMatcher(i, s) {
      return n.push({
        matcher: i,
        reducer: s
      }), o;
    },
    addDefaultCase(i) {
      return r = i, o;
    }
  };
  return e(o), [t, n, r];
}
function Pw(e) {
  return typeof e == "function";
}
function Dw(e, t) {
  let [n, r, o] = Sf(t), i;
  if (Pw(e))
    i = () => sl(e());
  else {
    const a = sl(e);
    i = () => a;
  }
  function s(a = i(), c) {
    let l = [n[c.type], ...r.filter(({
      matcher: u
    }) => u(c)).map(({
      reducer: u
    }) => u)];
    return l.filter((u) => !!u).length === 0 && (l = [o]), l.reduce((u, f) => {
      if (f)
        if (jt(u)) {
          const p = f(u, c);
          return p === void 0 ? u : p;
        } else {
          if (Dt(u))
            return hf(u, (d) => f(d, c));
          {
            const d = f(u, c);
            if (d === void 0) {
              if (u === null)
                return u;
              throw new Error(Me(9));
            }
            return d;
          }
        }
      return u;
    }, a);
  }
  return s.getInitialState = i, s;
}
var Rw = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", Cf = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += Rw[Math.random() * 64 | 0];
  return t;
}, Iw = (e, t) => hw(e) ? e.match(t) : e(t);
function Aw(...e) {
  return (t) => e.some((n) => Iw(n, t));
}
var Ow = ["name", "message", "stack", "code"], Pi = class {
  constructor(e, t) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    Re(this, "_type");
    this.payload = e, this.meta = t;
  }
}, cl = class {
  constructor(e, t) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    Re(this, "_type");
    this.payload = e, this.meta = t;
  }
}, Nw = (e) => {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n of Ow)
      typeof e[n] == "string" && (t[n] = e[n]);
    return t;
  }
  return {
    message: String(e)
  };
}, $w = /* @__PURE__ */ (() => {
  function e(t, n, r) {
    const o = St(t + "/fulfilled", (c, l, u, f) => ({
      payload: c,
      meta: {
        ...f || {},
        arg: u,
        requestId: l,
        requestStatus: "fulfilled"
      }
    })), i = St(t + "/pending", (c, l, u) => ({
      payload: void 0,
      meta: {
        ...u || {},
        arg: l,
        requestId: c,
        requestStatus: "pending"
      }
    })), s = St(t + "/rejected", (c, l, u, f, d) => ({
      payload: f,
      error: (r && r.serializeError || Nw)(c || "Rejected"),
      meta: {
        ...d || {},
        arg: u,
        requestId: l,
        rejectedWithValue: !!f,
        requestStatus: "rejected",
        aborted: (c == null ? void 0 : c.name) === "AbortError",
        condition: (c == null ? void 0 : c.name) === "ConditionError"
      }
    }));
    function a(c) {
      return (l, u, f) => {
        const d = r != null && r.idGenerator ? r.idGenerator(c) : Cf(), p = new AbortController();
        let m, g;
        function h(y) {
          g = y, p.abort();
        }
        const w = async function() {
          var v, S;
          let y;
          try {
            let C = (v = r == null ? void 0 : r.condition) == null ? void 0 : v.call(r, c, {
              getState: u,
              extra: f
            });
            if (Lw(C) && (C = await C), C === !1 || p.signal.aborted)
              throw {
                name: "ConditionError",
                message: "Aborted due to condition callback returning false."
              };
            const P = new Promise((E, O) => {
              m = () => {
                O({
                  name: "AbortError",
                  message: g || "Aborted"
                });
              }, p.signal.addEventListener("abort", m);
            });
            l(i(d, c, (S = r == null ? void 0 : r.getPendingMeta) == null ? void 0 : S.call(r, {
              requestId: d,
              arg: c
            }, {
              getState: u,
              extra: f
            }))), y = await Promise.race([P, Promise.resolve(n(c, {
              dispatch: l,
              getState: u,
              extra: f,
              requestId: d,
              signal: p.signal,
              abort: h,
              rejectWithValue: (E, O) => new Pi(E, O),
              fulfillWithValue: (E, O) => new cl(E, O)
            })).then((E) => {
              if (E instanceof Pi)
                throw E;
              return E instanceof cl ? o(E.payload, d, c, E.meta) : o(E, d, c);
            })]);
          } catch (C) {
            y = C instanceof Pi ? s(null, d, c, C.payload, C.meta) : s(C, d, c);
          } finally {
            m && p.signal.removeEventListener("abort", m);
          }
          return r && !r.dispatchConditionRejection && s.match(y) && y.meta.condition || l(y), y;
        }();
        return Object.assign(w, {
          abort: h,
          requestId: d,
          arg: c,
          unwrap() {
            return w.then(Tw);
          }
        });
      };
    }
    return Object.assign(a, {
      pending: i,
      rejected: s,
      fulfilled: o,
      settled: Aw(s, o),
      typePrefix: t
    });
  }
  return e.withTypes = () => e, e;
})();
function Tw(e) {
  if (e.meta && e.meta.rejectedWithValue)
    throw e.payload;
  if (e.error)
    throw e.error;
  return e.payload;
}
function Lw(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var Mw = Symbol.for("rtk-slice-createasyncthunk");
function _w(e, t) {
  return `${e}/${t}`;
}
function kw({
  creators: e
} = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[Mw];
  return function(o) {
    const {
      name: i,
      reducerPath: s = i
    } = o;
    if (!i)
      throw new Error(Me(11));
    typeof process < "u";
    const a = (typeof o.reducers == "function" ? o.reducers(Bw()) : o.reducers) || {}, c = Object.keys(a), l = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, u = {
      addCase(b, v) {
        const S = typeof b == "string" ? b : b.type;
        if (!S)
          throw new Error(Me(12));
        if (S in l.sliceCaseReducersByType)
          throw new Error(Me(13));
        return l.sliceCaseReducersByType[S] = v, u;
      },
      addMatcher(b, v) {
        return l.sliceMatchers.push({
          matcher: b,
          reducer: v
        }), u;
      },
      exposeAction(b, v) {
        return l.actionCreators[b] = v, u;
      },
      exposeCaseReducer(b, v) {
        return l.sliceCaseReducersByName[b] = v, u;
      }
    };
    c.forEach((b) => {
      const v = a[b], S = {
        reducerName: b,
        type: _w(i, b),
        createNotation: typeof o.reducers == "function"
      };
      zw(v) ? Ww(S, v, u, t) : jw(S, v, u);
    });
    function f() {
      const [b = {}, v = [], S = void 0] = typeof o.extraReducers == "function" ? Sf(o.extraReducers) : [o.extraReducers], C = {
        ...b,
        ...l.sliceCaseReducersByType
      };
      return Dw(o.initialState, (P) => {
        for (let E in C)
          P.addCase(E, C[E]);
        for (let E of l.sliceMatchers)
          P.addMatcher(E.matcher, E.reducer);
        for (let E of v)
          P.addMatcher(E.matcher, E.reducer);
        S && P.addDefaultCase(S);
      });
    }
    const d = (b) => b, p = /* @__PURE__ */ new Map();
    let m;
    function g(b, v) {
      return m || (m = f()), m(b, v);
    }
    function h() {
      return m || (m = f()), m.getInitialState();
    }
    function w(b, v = !1) {
      function S(P) {
        let E = P[b];
        return typeof E > "u" && v && (E = h()), E;
      }
      function C(P = d) {
        const E = al(p, v, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return al(E, P, {
          insert: () => {
            const O = {};
            for (const [T, $] of Object.entries(o.selectors ?? {}))
              O[T] = Fw($, P, h, v);
            return O;
          }
        });
      }
      return {
        reducerPath: b,
        getSelectors: C,
        get selectors() {
          return C(S);
        },
        selectSlice: S
      };
    }
    const y = {
      name: i,
      reducer: g,
      actions: l.actionCreators,
      caseReducers: l.sliceCaseReducersByName,
      getInitialState: h,
      ...w(s),
      injectInto(b, {
        reducerPath: v,
        ...S
      } = {}) {
        const C = v ?? s;
        return b.inject({
          reducerPath: C,
          reducer: g
        }, S), {
          ...y,
          ...w(C, !0)
        };
      }
    };
    return y;
  };
}
function Fw(e, t, n, r) {
  function o(i, ...s) {
    let a = t(i);
    return typeof a > "u" && r && (a = n()), e(a, ...s);
  }
  return o.unwrapped = e, o;
}
var Oa = kw();
function Bw() {
  function e(t, n) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...n
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...n) {
          return t(...n);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, n) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: n
      };
    },
    asyncThunk: e
  };
}
function jw({
  type: e,
  reducerName: t,
  createNotation: n
}, r, o) {
  let i, s;
  if ("reducer" in r) {
    if (n && !Vw(r))
      throw new Error(Me(17));
    i = r.reducer, s = r.prepare;
  } else
    i = r;
  o.addCase(e, i).exposeCaseReducer(t, i).exposeAction(t, s ? St(e, s) : St(e));
}
function zw(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Vw(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Ww({
  type: e,
  reducerName: t
}, n, r, o) {
  if (!o)
    throw new Error(Me(18));
  const {
    payloadCreator: i,
    fulfilled: s,
    pending: a,
    rejected: c,
    settled: l,
    options: u
  } = n, f = o(e, i, u);
  r.exposeAction(t, f), s && r.addCase(f.fulfilled, s), a && r.addCase(f.pending, a), c && r.addCase(f.rejected, c), l && r.addMatcher(f.settled, l), r.exposeCaseReducer(t, {
    fulfilled: s || wr,
    pending: a || wr,
    rejected: c || wr,
    settled: l || wr
  });
}
function wr() {
}
var Gw = (e, t) => {
  if (typeof e != "function")
    throw new Error(Me(32));
}, Na = "listenerMiddleware", Hw = (e) => {
  let {
    type: t,
    actionCreator: n,
    matcher: r,
    predicate: o,
    effect: i
  } = e;
  if (t)
    o = St(t).match;
  else if (n)
    t = n.type, o = n.match;
  else if (r)
    o = r;
  else if (!o)
    throw new Error(Me(21));
  return Gw(i), {
    predicate: o,
    type: t,
    effect: i
  };
}, Uw = Object.assign((e) => {
  const {
    type: t,
    predicate: n,
    effect: r
  } = Hw(e);
  return {
    id: Cf(),
    effect: r,
    type: t,
    predicate: n,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(Me(22));
    }
  };
}, {
  withTypes: () => Uw
}), qw = Object.assign(St(`${Na}/add`), {
  withTypes: () => qw
});
St(`${Na}/removeAll`);
var Kw = Object.assign(St(`${Na}/remove`), {
  withTypes: () => Kw
});
function Me(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Yw = {
  test: "https://test.bsdd.buildingsmart.org",
  production: "https://api.bsdd.buildingsmart.org"
}, Xw = {
  bddApiEnvironment: "production",
  mainDictionary: null,
  filterDictionaries: [],
  language: "EN"
}, Ef = Oa({
  name: "settings",
  initialState: Xw,
  reducers: {
    setSettings: (e, t) => {
      e.bddApiEnvironment = t.payload.bsddApiEnvironment, e.mainDictionary = t.payload.mainDictionary, e.filterDictionaries = t.payload.filterDictionaries, e.language = t.payload.language;
    },
    setBsddApiEnvironment: (e, t) => {
      console.log("setBsddApiEnvironment", t.payload), e.bddApiEnvironment = t.payload;
    },
    setMainDictionary: (e, t) => {
      e.mainDictionary = t.payload;
    },
    setFilterDictionaries: (e, t) => {
      e.filterDictionaries = t.payload;
    },
    setLanguage: (e, t) => {
      e.language = t.payload;
    }
  }
}), Yo = (e) => Yw[e.settings.bddApiEnvironment], Pf = yf(
  (e) => e.settings.mainDictionary,
  (e) => e.settings.filterDictionaries,
  (e, t) => e ? [e, ...t] : t
), { setSettings: Jw, setBsddApiEnvironment: Qw, setMainDictionary: Df, setFilterDictionaries: $a, setLanguage: wD } = Ef.actions, Zw = Ef.reducer;
function ex({ id: e }) {
  const t = ur(), { t: n } = Ut(), r = ue((a) => a.settings.mainDictionary), o = ue((a) => a.settings.filterDictionaries), i = ue(Pf), s = (a, c) => {
    if ((r == null ? void 0 : r.dictionaryUri) === a) {
      t(Df({ ...r, parameterMapping: c }));
      return;
    }
    t(
      $a(
        o.map((l) => l.dictionaryUri === a ? { ...l, parameterMapping: c } : l)
      )
    );
  };
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ F.jsxs(oe.Control, { children: [
      /* @__PURE__ */ F.jsx(Pn, { order: 5, children: n("Parameter mapping") }),
      /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "dimmed", children: n("Parameter mapping help text") })
    ] }),
    /* @__PURE__ */ F.jsx(oe.Panel, { children: i.map((a) => /* @__PURE__ */ F.jsxs("div", { style: { marginBottom: "1em" }, children: [
      /* @__PURE__ */ F.jsx(
        ha,
        {
          label: a.dictionaryName,
          placeholder: "Enter a revit type parameter",
          value: a.parameterMapping,
          onChange: (c) => s(a.dictionaryUri, c.currentTarget.value)
        }
      ),
      " "
    ] }, a.dictionaryUri)) })
  ] }, e);
}
function Un(e) {
  "@babel/helpers - typeof";
  return Un = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Un(e);
}
function tx(e, t) {
  if (Un(e) != "object" || !e)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (Un(r) != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function nx(e) {
  var t = tx(e, "string");
  return Un(t) == "symbol" ? t : String(t);
}
function rx(e, t, n) {
  return t = nx(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function ll(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function ul(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ll(Object(n), !0).forEach(function(r) {
      rx(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ll(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Te(e) {
  return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
}
var dl = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), Di = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, fl = {
  INIT: "@@redux/INIT" + Di(),
  REPLACE: "@@redux/REPLACE" + Di(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + Di();
  }
};
function ox(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function Rf(e, t, n) {
  var r;
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(Te(0));
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(Te(1));
    return n(Rf)(e, t);
  }
  if (typeof e != "function")
    throw new Error(Te(2));
  var o = e, i = t, s = [], a = s, c = !1;
  function l() {
    a === s && (a = s.slice());
  }
  function u() {
    if (c)
      throw new Error(Te(3));
    return i;
  }
  function f(g) {
    if (typeof g != "function")
      throw new Error(Te(4));
    if (c)
      throw new Error(Te(5));
    var h = !0;
    return l(), a.push(g), function() {
      if (h) {
        if (c)
          throw new Error(Te(6));
        h = !1, l();
        var y = a.indexOf(g);
        a.splice(y, 1), s = null;
      }
    };
  }
  function d(g) {
    if (!ox(g))
      throw new Error(Te(7));
    if (typeof g.type > "u")
      throw new Error(Te(8));
    if (c)
      throw new Error(Te(9));
    try {
      c = !0, i = o(i, g);
    } finally {
      c = !1;
    }
    for (var h = s = a, w = 0; w < h.length; w++) {
      var y = h[w];
      y();
    }
    return g;
  }
  function p(g) {
    if (typeof g != "function")
      throw new Error(Te(10));
    o = g, d({
      type: fl.REPLACE
    });
  }
  function m() {
    var g, h = f;
    return g = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function(y) {
        if (typeof y != "object" || y === null)
          throw new Error(Te(11));
        function b() {
          y.next && y.next(u());
        }
        b();
        var v = h(b);
        return {
          unsubscribe: v
        };
      }
    }, g[dl] = function() {
      return this;
    }, g;
  }
  return d({
    type: fl.INIT
  }), r = {
    dispatch: d,
    subscribe: f,
    getState: u,
    replaceReducer: p
  }, r[dl] = m, r;
}
function pl(e, t) {
  return function() {
    return t(e.apply(this, arguments));
  };
}
function ml(e, t) {
  if (typeof e == "function")
    return pl(e, t);
  if (typeof e != "object" || e === null)
    throw new Error(Te(16));
  var n = {};
  for (var r in e) {
    var o = e[r];
    typeof o == "function" && (n[r] = pl(o, t));
  }
  return n;
}
function If() {
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
function ix() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function(r) {
    return function() {
      var o = r.apply(void 0, arguments), i = function() {
        throw new Error(Te(15));
      }, s = {
        getState: o.getState,
        dispatch: function() {
          return i.apply(void 0, arguments);
        }
      }, a = t.map(function(c) {
        return c(s);
      });
      return i = If.apply(void 0, a)(o.dispatch), ul(ul({}, o), {}, {
        dispatch: i
      });
    };
  };
}
function sx(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Af(e, t) {
  var n = U(function() {
    return {
      inputs: t,
      result: e()
    };
  })[0], r = z(!0), o = z(n), i = r.current || !!(t && o.current.inputs && sx(t, o.current.inputs)), s = i ? o.current : {
    inputs: t,
    result: e()
  };
  return W(function() {
    r.current = !1, o.current = s;
  }, [s]), s.result;
}
function ax(e, t) {
  return Af(function() {
    return e;
  }, t);
}
var K = Af, V = ax, cx = !0, Ri = "Invariant failed";
function lx(e, t) {
  if (!e) {
    if (cx)
      throw new Error(Ri);
    var n = typeof t == "function" ? t() : t, r = n ? "".concat(Ri, ": ").concat(n) : Ri;
    throw new Error(r);
  }
}
var at = function(t) {
  var n = t.top, r = t.right, o = t.bottom, i = t.left, s = r - i, a = o - n, c = {
    top: n,
    right: r,
    bottom: o,
    left: i,
    width: s,
    height: a,
    x: i,
    y: n,
    center: {
      x: (r + i) / 2,
      y: (o + n) / 2
    }
  };
  return c;
}, Ta = function(t, n) {
  return {
    top: t.top - n.top,
    left: t.left - n.left,
    bottom: t.bottom + n.bottom,
    right: t.right + n.right
  };
}, gl = function(t, n) {
  return {
    top: t.top + n.top,
    left: t.left + n.left,
    bottom: t.bottom - n.bottom,
    right: t.right - n.right
  };
}, ux = function(t, n) {
  return {
    top: t.top + n.y,
    left: t.left + n.x,
    bottom: t.bottom + n.y,
    right: t.right + n.x
  };
}, Ii = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}, La = function(t) {
  var n = t.borderBox, r = t.margin, o = r === void 0 ? Ii : r, i = t.border, s = i === void 0 ? Ii : i, a = t.padding, c = a === void 0 ? Ii : a, l = at(Ta(n, o)), u = at(gl(n, s)), f = at(gl(u, c));
  return {
    marginBox: l,
    borderBox: at(n),
    paddingBox: u,
    contentBox: f,
    margin: o,
    border: s,
    padding: c
  };
}, Ke = function(t) {
  var n = t.slice(0, -2), r = t.slice(-2);
  if (r !== "px")
    return 0;
  var o = Number(n);
  return isNaN(o) && lx(!1), o;
}, dx = function() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}, Hr = function(t, n) {
  var r = t.borderBox, o = t.border, i = t.margin, s = t.padding, a = ux(r, n);
  return La({
    borderBox: a,
    border: o,
    margin: i,
    padding: s
  });
}, Ur = function(t, n) {
  return n === void 0 && (n = dx()), Hr(t, n);
}, Of = function(t, n) {
  var r = {
    top: Ke(n.marginTop),
    right: Ke(n.marginRight),
    bottom: Ke(n.marginBottom),
    left: Ke(n.marginLeft)
  }, o = {
    top: Ke(n.paddingTop),
    right: Ke(n.paddingRight),
    bottom: Ke(n.paddingBottom),
    left: Ke(n.paddingLeft)
  }, i = {
    top: Ke(n.borderTopWidth),
    right: Ke(n.borderRightWidth),
    bottom: Ke(n.borderBottomWidth),
    left: Ke(n.borderLeftWidth)
  };
  return La({
    borderBox: t,
    margin: r,
    padding: o,
    border: i
  });
}, Nf = function(t) {
  var n = t.getBoundingClientRect(), r = window.getComputedStyle(t);
  return Of(n, r);
}, hl = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function fx(e, t) {
  return !!(e === t || hl(e) && hl(t));
}
function px(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0; n < e.length; n++)
    if (!fx(e[n], t[n]))
      return !1;
  return !0;
}
function de(e, t) {
  t === void 0 && (t = px);
  var n = null;
  function r() {
    for (var o = [], i = 0; i < arguments.length; i++)
      o[i] = arguments[i];
    if (n && n.lastThis === this && t(o, n.lastArgs))
      return n.lastResult;
    var s = e.apply(this, o);
    return n = {
      lastResult: s,
      lastArgs: o,
      lastThis: this
    }, s;
  }
  return r.clear = function() {
    n = null;
  }, r;
}
var mx = function(t) {
  var n = [], r = null, o = function() {
    for (var s = arguments.length, a = new Array(s), c = 0; c < s; c++)
      a[c] = arguments[c];
    n = a, !r && (r = requestAnimationFrame(function() {
      r = null, t.apply(void 0, n);
    }));
  };
  return o.cancel = function() {
    r && (cancelAnimationFrame(r), r = null);
  }, o;
};
const qn = mx;
function $f(e, t) {
}
$f.bind(null, "warn");
$f.bind(null, "error");
function Tt() {
}
function gx(e, t) {
  return {
    ...e,
    ...t
  };
}
function Ye(e, t, n) {
  const r = t.map((o) => {
    const i = gx(n, o.options);
    return e.addEventListener(o.eventName, o.fn, i), function() {
      e.removeEventListener(o.eventName, o.fn, i);
    };
  });
  return function() {
    r.forEach((i) => {
      i();
    });
  };
}
const hx = "Invariant failed";
class qr extends Error {
}
qr.prototype.toString = function() {
  return this.message;
};
function k(e, t) {
  if (!e)
    throw new qr(hx);
}
class bx extends x.Component {
  constructor(...t) {
    super(...t), this.callbacks = null, this.unbind = Tt, this.onWindowError = (n) => {
      const r = this.getCallbacks();
      r.isDragging() && r.tryAbort(), n.error instanceof qr && n.preventDefault();
    }, this.getCallbacks = () => {
      if (!this.callbacks)
        throw new Error("Unable to find AppCallbacks in <ErrorBoundary/>");
      return this.callbacks;
    }, this.setCallbacks = (n) => {
      this.callbacks = n;
    };
  }
  componentDidMount() {
    this.unbind = Ye(window, [{
      eventName: "error",
      fn: this.onWindowError
    }]);
  }
  componentDidCatch(t) {
    if (t instanceof qr) {
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
const yx = `
  Press space bar to start a drag.
  When dragging you can use the arrow keys to move the item around and escape to cancel.
  Some screen readers may require you to be in focus mode or to use your pass through key
`, Kr = (e) => e + 1, vx = (e) => `
  You have lifted an item in position ${Kr(e.source.index)}
`, Tf = (e, t) => {
  const n = e.droppableId === t.droppableId, r = Kr(e.index), o = Kr(t.index);
  return n ? `
      You have moved the item from position ${r}
      to position ${o}
    ` : `
    You have moved the item from position ${r}
    in list ${e.droppableId}
    to list ${t.droppableId}
    in position ${o}
  `;
}, Lf = (e, t, n) => t.droppableId === n.droppableId ? `
      The item ${e}
      has been combined with ${n.draggableId}` : `
      The item ${e}
      in list ${t.droppableId}
      has been combined with ${n.draggableId}
      in list ${n.droppableId}
    `, wx = (e) => {
  const t = e.destination;
  if (t)
    return Tf(e.source, t);
  const n = e.combine;
  return n ? Lf(e.draggableId, e.source, n) : "You are over an area that cannot be dropped on";
}, bl = (e) => `
  The item has returned to its starting position
  of ${Kr(e.index)}
`, xx = (e) => {
  if (e.reason === "CANCEL")
    return `
      Movement cancelled.
      ${bl(e.source)}
    `;
  const t = e.destination, n = e.combine;
  return t ? `
      You have dropped the item.
      ${Tf(e.source, t)}
    ` : n ? `
      You have dropped the item.
      ${Lf(e.draggableId, e.source, n)}
    ` : `
    The item has been dropped while not over a drop area.
    ${bl(e.source)}
  `;
}, Sx = {
  dragHandleUsageInstructions: yx,
  onDragStart: vx,
  onDragUpdate: wx,
  onDragEnd: xx
};
var Or = Sx;
const pe = {
  x: 0,
  y: 0
}, ye = (e, t) => ({
  x: e.x + t.x,
  y: e.y + t.y
}), Be = (e, t) => ({
  x: e.x - t.x,
  y: e.y - t.y
}), Lt = (e, t) => e.x === t.x && e.y === t.y, Dn = (e) => ({
  x: e.x !== 0 ? -e.x : 0,
  y: e.y !== 0 ? -e.y : 0
}), rn = (e, t, n = 0) => e === "x" ? {
  x: t,
  y: n
} : {
  x: n,
  y: t
}, Kn = (e, t) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2), yl = (e, t) => Math.min(...t.map((n) => Kn(e, n))), Mf = (e) => (t) => ({
  x: e(t.x),
  y: e(t.y)
});
var Cx = (e, t) => {
  const n = at({
    top: Math.max(t.top, e.top),
    right: Math.min(t.right, e.right),
    bottom: Math.min(t.bottom, e.bottom),
    left: Math.max(t.left, e.left)
  });
  return n.width <= 0 || n.height <= 0 ? null : n;
};
const dr = (e, t) => ({
  top: e.top + t.y,
  left: e.left + t.x,
  bottom: e.bottom + t.y,
  right: e.right + t.x
}), vl = (e) => [{
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
}], Ex = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}, Px = (e, t) => t ? dr(e, t.scroll.diff.displacement) : e, Dx = (e, t, n) => n && n.increasedBy ? {
  ...e,
  [t.end]: e[t.end] + n.increasedBy[t.line]
} : e, Rx = (e, t) => t && t.shouldClipSubject ? Cx(t.pageMarginBox, e) : at(e);
var wn = ({
  page: e,
  withPlaceholder: t,
  axis: n,
  frame: r
}) => {
  const o = Px(e.marginBox, r), i = Dx(o, n, t), s = Rx(i, r);
  return {
    page: e,
    withPlaceholder: t,
    active: s
  };
}, Ma = (e, t) => {
  e.frame || k(!1);
  const n = e.frame, r = Be(t, n.scroll.initial), o = Dn(r), i = {
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
  }, s = wn({
    page: e.subject.page,
    withPlaceholder: e.subject.withPlaceholder,
    axis: e.axis,
    frame: i
  });
  return {
    ...e,
    frame: i,
    subject: s
  };
};
const _f = de((e) => e.reduce((t, n) => (t[n.descriptor.id] = n, t), {})), kf = de((e) => e.reduce((t, n) => (t[n.descriptor.id] = n, t), {})), Xo = de((e) => Object.values(e)), Ix = de((e) => Object.values(e));
var Rn = de((e, t) => Ix(t).filter((r) => e === r.descriptor.droppableId).sort((r, o) => r.descriptor.index - o.descriptor.index));
function _a(e) {
  return e.at && e.at.type === "REORDER" ? e.at.destination : null;
}
function Jo(e) {
  return e.at && e.at.type === "COMBINE" ? e.at.combine : null;
}
var Qo = de((e, t) => t.filter((n) => n.descriptor.id !== e.descriptor.id)), Ax = ({
  isMovingForward: e,
  draggable: t,
  destination: n,
  insideDestination: r,
  previousImpact: o
}) => {
  if (!n.isCombineEnabled || !_a(o))
    return null;
  function s(p) {
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
  const a = o.displaced.all, c = a.length ? a[0] : null;
  if (e)
    return c ? s(c) : null;
  const l = Qo(t, r);
  if (!c) {
    if (!l.length)
      return null;
    const p = l[l.length - 1];
    return s(p.descriptor.id);
  }
  const u = l.findIndex((p) => p.descriptor.id === c);
  u === -1 && k(!1);
  const f = u - 1;
  if (f < 0)
    return null;
  const d = l[f];
  return s(d.descriptor.id);
}, In = (e, t) => e.descriptor.droppableId === t.descriptor.id;
const Ff = {
  point: pe,
  value: 0
}, Yn = {
  invisible: {},
  visible: {},
  all: []
}, Ox = {
  displaced: Yn,
  displacedBy: Ff,
  at: null
};
var Nx = Ox, Je = (e, t) => (n) => e <= n && n <= t, Bf = (e) => {
  const t = Je(e.top, e.bottom), n = Je(e.left, e.right);
  return (r) => {
    if (t(r.top) && t(r.bottom) && n(r.left) && n(r.right))
      return !0;
    const i = t(r.top) || t(r.bottom), s = n(r.left) || n(r.right);
    if (i && s)
      return !0;
    const c = r.top < e.top && r.bottom > e.bottom, l = r.left < e.left && r.right > e.right;
    return c && l ? !0 : c && s || l && i;
  };
}, $x = (e) => {
  const t = Je(e.top, e.bottom), n = Je(e.left, e.right);
  return (r) => t(r.top) && t(r.bottom) && n(r.left) && n(r.right);
};
const ka = {
  direction: "vertical",
  line: "y",
  crossAxisLine: "x",
  start: "top",
  end: "bottom",
  size: "height",
  crossAxisStart: "left",
  crossAxisEnd: "right",
  crossAxisSize: "width"
}, jf = {
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
var Tx = (e) => (t) => {
  const n = Je(t.top, t.bottom), r = Je(t.left, t.right);
  return (o) => e === ka ? n(o.top) && n(o.bottom) : r(o.left) && r(o.right);
};
const Lx = (e, t) => {
  const n = t.frame ? t.frame.scroll.diff.displacement : pe;
  return dr(e, n);
}, Mx = (e, t, n) => t.subject.active ? n(t.subject.active)(e) : !1, _x = (e, t, n) => n(t)(e), Fa = ({
  target: e,
  destination: t,
  viewport: n,
  withDroppableDisplacement: r,
  isVisibleThroughFrameFn: o
}) => {
  const i = r ? Lx(e, t) : e;
  return Mx(i, t, o) && _x(i, n, o);
}, kx = (e) => Fa({
  ...e,
  isVisibleThroughFrameFn: Bf
}), zf = (e) => Fa({
  ...e,
  isVisibleThroughFrameFn: $x
}), Fx = (e) => Fa({
  ...e,
  isVisibleThroughFrameFn: Tx(e.destination.axis)
}), Bx = (e, t, n) => {
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
  const i = o[e];
  return i ? i.shouldAnimate : !0;
};
function jx(e, t) {
  const n = e.page.marginBox, r = {
    top: t.point.y,
    right: 0,
    bottom: 0,
    left: t.point.x
  };
  return at(Ta(n, r));
}
function Xn({
  afterDragging: e,
  destination: t,
  displacedBy: n,
  viewport: r,
  forceShouldAnimate: o,
  last: i
}) {
  return e.reduce(function(a, c) {
    const l = jx(c, n), u = c.descriptor.id;
    if (a.all.push(u), !kx({
      target: l,
      destination: t,
      viewport: r,
      withDroppableDisplacement: !0
    }))
      return a.invisible[c.descriptor.id] = !0, a;
    const d = Bx(u, i, o), p = {
      draggableId: u,
      shouldAnimate: d
    };
    return a.visible[u] = p, a;
  }, {
    all: [],
    visible: {},
    invisible: {}
  });
}
function zx(e, t) {
  if (!e.length)
    return 0;
  const n = e[e.length - 1].descriptor.index;
  return t.inHomeList ? n : n + 1;
}
function wl({
  insideDestination: e,
  inHomeList: t,
  displacedBy: n,
  destination: r
}) {
  const o = zx(e, {
    inHomeList: t
  });
  return {
    displaced: Yn,
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
function Yr({
  draggable: e,
  insideDestination: t,
  destination: n,
  viewport: r,
  displacedBy: o,
  last: i,
  index: s,
  forceShouldAnimate: a
}) {
  const c = In(e, n);
  if (s == null)
    return wl({
      insideDestination: t,
      inHomeList: c,
      displacedBy: o,
      destination: n
    });
  const l = t.find((m) => m.descriptor.index === s);
  if (!l)
    return wl({
      insideDestination: t,
      inHomeList: c,
      displacedBy: o,
      destination: n
    });
  const u = Qo(e, t), f = t.indexOf(l), d = u.slice(f);
  return {
    displaced: Xn({
      afterDragging: d,
      destination: n,
      displacedBy: o,
      last: i,
      viewport: r.frame,
      forceShouldAnimate: a
    }),
    displacedBy: o,
    at: {
      type: "REORDER",
      destination: {
        droppableId: n.descriptor.id,
        index: s
      }
    }
  };
}
function zt(e, t) {
  return !!t.effected[e];
}
var Vx = ({
  isMovingForward: e,
  destination: t,
  draggables: n,
  combine: r,
  afterCritical: o
}) => {
  if (!t.isCombineEnabled)
    return null;
  const i = r.draggableId, a = n[i].descriptor.index;
  return zt(i, o) ? e ? a : a - 1 : e ? a + 1 : a;
}, Wx = ({
  isMovingForward: e,
  isInHomeList: t,
  insideDestination: n,
  location: r
}) => {
  if (!n.length)
    return null;
  const o = r.index, i = e ? o + 1 : o - 1, s = n[0].descriptor.index, a = n[n.length - 1].descriptor.index, c = t ? a : a + 1;
  return i < s || i > c ? null : i;
}, Gx = ({
  isMovingForward: e,
  isInHomeList: t,
  draggable: n,
  draggables: r,
  destination: o,
  insideDestination: i,
  previousImpact: s,
  viewport: a,
  afterCritical: c
}) => {
  const l = s.at;
  if (l || k(!1), l.type === "REORDER") {
    const f = Wx({
      isMovingForward: e,
      isInHomeList: t,
      location: l.destination,
      insideDestination: i
    });
    return f == null ? null : Yr({
      draggable: n,
      insideDestination: i,
      destination: o,
      viewport: a,
      last: s.displaced,
      displacedBy: s.displacedBy,
      index: f
    });
  }
  const u = Vx({
    isMovingForward: e,
    destination: o,
    displaced: s.displaced,
    draggables: r,
    combine: l.combine,
    afterCritical: c
  });
  return u == null ? null : Yr({
    draggable: n,
    insideDestination: i,
    destination: o,
    viewport: a,
    last: s.displaced,
    displacedBy: s.displacedBy,
    index: u
  });
}, Hx = ({
  displaced: e,
  afterCritical: t,
  combineWith: n,
  displacedBy: r
}) => {
  const o = !!(e.visible[n] || e.invisible[n]);
  return zt(n, t) ? o ? pe : Dn(r.point) : o ? r.point : pe;
}, Ux = ({
  afterCritical: e,
  impact: t,
  draggables: n
}) => {
  const r = Jo(t);
  r || k(!1);
  const o = r.draggableId, i = n[o].page.borderBox.center, s = Hx({
    displaced: t.displaced,
    afterCritical: e,
    combineWith: o,
    displacedBy: t.displacedBy
  });
  return ye(i, s);
};
const Vf = (e, t) => t.margin[e.start] + t.borderBox[e.size] / 2, qx = (e, t) => t.margin[e.end] + t.borderBox[e.size] / 2, Ba = (e, t, n) => t[e.crossAxisStart] + n.margin[e.crossAxisStart] + n.borderBox[e.crossAxisSize] / 2, xl = ({
  axis: e,
  moveRelativeTo: t,
  isMoving: n
}) => rn(e.line, t.marginBox[e.end] + Vf(e, n), Ba(e, t.marginBox, n)), Sl = ({
  axis: e,
  moveRelativeTo: t,
  isMoving: n
}) => rn(e.line, t.marginBox[e.start] - qx(e, n), Ba(e, t.marginBox, n)), Kx = ({
  axis: e,
  moveInto: t,
  isMoving: n
}) => rn(e.line, t.contentBox[e.start] + Vf(e, n), Ba(e, t.contentBox, n));
var Yx = ({
  impact: e,
  draggable: t,
  draggables: n,
  droppable: r,
  afterCritical: o
}) => {
  const i = Rn(r.descriptor.id, n), s = t.page, a = r.axis;
  if (!i.length)
    return Kx({
      axis: a,
      moveInto: r.page,
      isMoving: s
    });
  const {
    displaced: c,
    displacedBy: l
  } = e, u = c.all[0];
  if (u) {
    const d = n[u];
    if (zt(u, o))
      return Sl({
        axis: a,
        moveRelativeTo: d.page,
        isMoving: s
      });
    const p = Hr(d.page, l.point);
    return Sl({
      axis: a,
      moveRelativeTo: p,
      isMoving: s
    });
  }
  const f = i[i.length - 1];
  if (f.descriptor.id === t.descriptor.id)
    return s.borderBox.center;
  if (zt(f.descriptor.id, o)) {
    const d = Hr(f.page, Dn(o.displacedBy.point));
    return xl({
      axis: a,
      moveRelativeTo: d,
      isMoving: s
    });
  }
  return xl({
    axis: a,
    moveRelativeTo: f.page,
    isMoving: s
  });
}, os = (e, t) => {
  const n = e.frame;
  return n ? ye(t, n.scroll.diff.displacement) : t;
};
const Xx = ({
  impact: e,
  draggable: t,
  droppable: n,
  draggables: r,
  afterCritical: o
}) => {
  const i = t.page.borderBox.center, s = e.at;
  return !n || !s ? i : s.type === "REORDER" ? Yx({
    impact: e,
    draggable: t,
    draggables: r,
    droppable: n,
    afterCritical: o
  }) : Ux({
    impact: e,
    draggables: r,
    afterCritical: o
  });
};
var Zo = (e) => {
  const t = Xx(e), n = e.droppable;
  return n ? os(n, t) : t;
}, Wf = (e, t) => {
  const n = Be(t, e.scroll.initial), r = Dn(n);
  return {
    frame: at({
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
function Cl(e, t) {
  return e.map((n) => t[n]);
}
function Jx(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n].visible[e];
    if (r)
      return r;
  }
  return null;
}
var Qx = ({
  impact: e,
  viewport: t,
  destination: n,
  draggables: r,
  maxScrollChange: o
}) => {
  const i = Wf(t, ye(t.scroll.current, o)), s = n.frame ? Ma(n, ye(n.frame.scroll.current, o)) : n, a = e.displaced, c = Xn({
    afterDragging: Cl(a.all, r),
    destination: n,
    displacedBy: e.displacedBy,
    viewport: i.frame,
    last: a,
    forceShouldAnimate: !1
  }), l = Xn({
    afterDragging: Cl(a.all, r),
    destination: s,
    displacedBy: e.displacedBy,
    viewport: t.frame,
    last: a,
    forceShouldAnimate: !1
  }), u = {}, f = {}, d = [a, c, l];
  return a.all.forEach((m) => {
    const g = Jx(m, d);
    if (g) {
      f[m] = g;
      return;
    }
    u[m] = !0;
  }), {
    ...e,
    displaced: {
      all: a.all,
      invisible: u,
      visible: f
    }
  };
}, Zx = (e, t) => ye(e.scroll.diff.displacement, t), ja = ({
  pageBorderBoxCenter: e,
  draggable: t,
  viewport: n
}) => {
  const r = Zx(n, e), o = Be(r, t.page.borderBox.center);
  return ye(t.client.borderBox.center, o);
}, Gf = ({
  draggable: e,
  destination: t,
  newPageBorderBoxCenter: n,
  viewport: r,
  withDroppableDisplacement: o,
  onlyOnMainAxis: i = !1
}) => {
  const s = Be(n, e.page.borderBox.center), c = {
    target: dr(e.page.borderBox, s),
    destination: t,
    withDroppableDisplacement: o,
    viewport: r
  };
  return i ? Fx(c) : zf(c);
}, eS = ({
  isMovingForward: e,
  draggable: t,
  destination: n,
  draggables: r,
  previousImpact: o,
  viewport: i,
  previousPageBorderBoxCenter: s,
  previousClientSelection: a,
  afterCritical: c
}) => {
  if (!n.isEnabled)
    return null;
  const l = Rn(n.descriptor.id, r), u = In(t, n), f = Ax({
    isMovingForward: e,
    draggable: t,
    destination: n,
    insideDestination: l,
    previousImpact: o
  }) || Gx({
    isMovingForward: e,
    isInHomeList: u,
    draggable: t,
    draggables: r,
    destination: n,
    insideDestination: l,
    previousImpact: o,
    viewport: i,
    afterCritical: c
  });
  if (!f)
    return null;
  const d = Zo({
    impact: f,
    draggable: t,
    droppable: n,
    draggables: r,
    afterCritical: c
  });
  if (Gf({
    draggable: t,
    destination: n,
    newPageBorderBoxCenter: d,
    viewport: i.frame,
    withDroppableDisplacement: !1,
    onlyOnMainAxis: !0
  }))
    return {
      clientSelection: ja({
        pageBorderBoxCenter: d,
        draggable: t,
        viewport: i
      }),
      impact: f,
      scrollJumpRequest: null
    };
  const m = Be(d, s), g = Qx({
    impact: f,
    viewport: i,
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
const Ie = (e) => {
  const t = e.subject.active;
  return t || k(!1), t;
};
var tS = ({
  isMovingForward: e,
  pageBorderBoxCenter: t,
  source: n,
  droppables: r,
  viewport: o
}) => {
  const i = n.subject.active;
  if (!i)
    return null;
  const s = n.axis, a = Je(i[s.start], i[s.end]), c = Xo(r).filter((u) => u !== n).filter((u) => u.isEnabled).filter((u) => !!u.subject.active).filter((u) => Bf(o.frame)(Ie(u))).filter((u) => {
    const f = Ie(u);
    return e ? i[s.crossAxisEnd] < f[s.crossAxisEnd] : f[s.crossAxisStart] < i[s.crossAxisStart];
  }).filter((u) => {
    const f = Ie(u), d = Je(f[s.start], f[s.end]);
    return a(f[s.start]) || a(f[s.end]) || d(i[s.start]) || d(i[s.end]);
  }).sort((u, f) => {
    const d = Ie(u)[s.crossAxisStart], p = Ie(f)[s.crossAxisStart];
    return e ? d - p : p - d;
  }).filter((u, f, d) => Ie(u)[s.crossAxisStart] === Ie(d[0])[s.crossAxisStart]);
  if (!c.length)
    return null;
  if (c.length === 1)
    return c[0];
  const l = c.filter((u) => Je(Ie(u)[s.start], Ie(u)[s.end])(t[s.line]));
  return l.length === 1 ? l[0] : l.length > 1 ? l.sort((u, f) => Ie(u)[s.start] - Ie(f)[s.start])[0] : c.sort((u, f) => {
    const d = yl(t, vl(Ie(u))), p = yl(t, vl(Ie(f)));
    return d !== p ? d - p : Ie(u)[s.start] - Ie(f)[s.start];
  })[0];
};
const El = (e, t) => {
  const n = e.page.borderBox.center;
  return zt(e.descriptor.id, t) ? Be(n, t.displacedBy.point) : n;
}, nS = (e, t) => {
  const n = e.page.borderBox;
  return zt(e.descriptor.id, t) ? dr(n, Dn(t.displacedBy.point)) : n;
};
var rS = ({
  pageBorderBoxCenter: e,
  viewport: t,
  destination: n,
  insideDestination: r,
  afterCritical: o
}) => r.filter((s) => zf({
  target: nS(s, o),
  destination: n,
  viewport: t.frame,
  withDroppableDisplacement: !0
})).sort((s, a) => {
  const c = Kn(e, os(n, El(s, o))), l = Kn(e, os(n, El(a, o)));
  return c < l ? -1 : l < c ? 1 : s.descriptor.index - a.descriptor.index;
})[0] || null, fr = de(function(t, n) {
  const r = n[t.line];
  return {
    value: r,
    point: rn(t.line, r)
  };
});
const oS = (e, t, n) => {
  const r = e.axis;
  if (e.descriptor.mode === "virtual")
    return rn(r.line, t[r.line]);
  const o = e.subject.page.contentBox[r.size], c = Rn(e.descriptor.id, n).reduce((l, u) => l + u.client.marginBox[r.size], 0) + t[r.line] - o;
  return c <= 0 ? null : rn(r.line, c);
}, Hf = (e, t) => ({
  ...e,
  scroll: {
    ...e.scroll,
    max: t
  }
}), Uf = (e, t, n) => {
  const r = e.frame;
  In(t, e) && k(!1), e.subject.withPlaceholder && k(!1);
  const o = fr(e.axis, t.displaceBy).point, i = oS(e, o, n), s = {
    placeholderSize: o,
    increasedBy: i,
    oldFrameMaxScroll: e.frame ? e.frame.scroll.max : null
  };
  if (!r) {
    const u = wn({
      page: e.subject.page,
      withPlaceholder: s,
      axis: e.axis,
      frame: e.frame
    });
    return {
      ...e,
      subject: u
    };
  }
  const a = i ? ye(r.scroll.max, i) : r.scroll.max, c = Hf(r, a), l = wn({
    page: e.subject.page,
    withPlaceholder: s,
    axis: e.axis,
    frame: c
  });
  return {
    ...e,
    subject: l,
    frame: c
  };
}, iS = (e) => {
  const t = e.subject.withPlaceholder;
  t || k(!1);
  const n = e.frame;
  if (!n) {
    const s = wn({
      page: e.subject.page,
      axis: e.axis,
      frame: null,
      withPlaceholder: null
    });
    return {
      ...e,
      subject: s
    };
  }
  const r = t.oldFrameMaxScroll;
  r || k(!1);
  const o = Hf(n, r), i = wn({
    page: e.subject.page,
    axis: e.axis,
    frame: o,
    withPlaceholder: null
  });
  return {
    ...e,
    subject: i,
    frame: o
  };
};
var sS = ({
  previousPageBorderBoxCenter: e,
  moveRelativeTo: t,
  insideDestination: n,
  draggable: r,
  draggables: o,
  destination: i,
  viewport: s,
  afterCritical: a
}) => {
  if (!t) {
    if (n.length)
      return null;
    const f = {
      displaced: Yn,
      displacedBy: Ff,
      at: {
        type: "REORDER",
        destination: {
          droppableId: i.descriptor.id,
          index: 0
        }
      }
    }, d = Zo({
      impact: f,
      draggable: r,
      droppable: i,
      draggables: o,
      afterCritical: a
    }), p = In(r, i) ? i : Uf(i, r, o);
    return Gf({
      draggable: r,
      destination: p,
      newPageBorderBoxCenter: d,
      viewport: s.frame,
      withDroppableDisplacement: !1,
      onlyOnMainAxis: !0
    }) ? f : null;
  }
  const c = e[i.axis.line] <= t.page.borderBox.center[i.axis.line], l = (() => {
    const f = t.descriptor.index;
    return t.descriptor.id === r.descriptor.id || c ? f : f + 1;
  })(), u = fr(i.axis, r.displaceBy);
  return Yr({
    draggable: r,
    insideDestination: n,
    destination: i,
    viewport: s,
    displacedBy: u,
    last: Yn,
    index: l
  });
}, aS = ({
  isMovingForward: e,
  previousPageBorderBoxCenter: t,
  draggable: n,
  isOver: r,
  draggables: o,
  droppables: i,
  viewport: s,
  afterCritical: a
}) => {
  const c = tS({
    isMovingForward: e,
    pageBorderBoxCenter: t,
    source: r,
    droppables: i,
    viewport: s
  });
  if (!c)
    return null;
  const l = Rn(c.descriptor.id, o), u = rS({
    pageBorderBoxCenter: t,
    viewport: s,
    destination: c,
    insideDestination: l,
    afterCritical: a
  }), f = sS({
    previousPageBorderBoxCenter: t,
    destination: c,
    draggable: n,
    draggables: o,
    moveRelativeTo: u,
    insideDestination: l,
    viewport: s,
    afterCritical: a
  });
  if (!f)
    return null;
  const d = Zo({
    impact: f,
    draggable: n,
    droppable: c,
    draggables: o,
    afterCritical: a
  });
  return {
    clientSelection: ja({
      pageBorderBoxCenter: d,
      draggable: n,
      viewport: s
    }),
    impact: f,
    scrollJumpRequest: null
  };
}, ze = (e) => {
  const t = e.at;
  return t ? t.type === "REORDER" ? t.destination.droppableId : t.combine.droppableId : null;
};
const cS = (e, t) => {
  const n = ze(e);
  return n ? t[n] : null;
};
var lS = ({
  state: e,
  type: t
}) => {
  const n = cS(e.impact, e.dimensions.droppables), r = !!n, o = e.dimensions.droppables[e.critical.droppable.id], i = n || o, s = i.axis.direction, a = s === "vertical" && (t === "MOVE_UP" || t === "MOVE_DOWN") || s === "horizontal" && (t === "MOVE_LEFT" || t === "MOVE_RIGHT");
  if (a && !r)
    return null;
  const c = t === "MOVE_DOWN" || t === "MOVE_RIGHT", l = e.dimensions.draggables[e.critical.draggable.id], u = e.current.page.borderBoxCenter, {
    draggables: f,
    droppables: d
  } = e.dimensions;
  return a ? eS({
    isMovingForward: c,
    previousPageBorderBoxCenter: u,
    draggable: l,
    destination: i,
    draggables: f,
    viewport: e.viewport,
    previousClientSelection: e.current.client.selection,
    previousImpact: e.impact,
    afterCritical: e.afterCritical
  }) : aS({
    isMovingForward: c,
    previousPageBorderBoxCenter: u,
    draggable: l,
    isOver: i,
    draggables: f,
    droppables: d,
    viewport: e.viewport,
    afterCritical: e.afterCritical
  });
};
function Jt(e) {
  return e.phase === "DRAGGING" || e.phase === "COLLECTING";
}
function qf(e) {
  const t = Je(e.top, e.bottom), n = Je(e.left, e.right);
  return function(o) {
    return t(o.y) && n(o.x);
  };
}
function uS(e, t) {
  return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function dS({
  pageBorderBox: e,
  draggable: t,
  candidates: n
}) {
  const r = t.page.borderBox.center, o = n.map((i) => {
    const s = i.axis, a = rn(i.axis.line, e.center[s.line], i.page.borderBox.center[s.crossAxisLine]);
    return {
      id: i.descriptor.id,
      distance: Kn(r, a)
    };
  }).sort((i, s) => s.distance - i.distance);
  return o[0] ? o[0].id : null;
}
function fS({
  pageBorderBox: e,
  draggable: t,
  droppables: n
}) {
  const r = Xo(n).filter((o) => {
    if (!o.isEnabled)
      return !1;
    const i = o.subject.active;
    if (!i || !uS(e, i))
      return !1;
    if (qf(i)(e.center))
      return !0;
    const s = o.axis, a = i.center[s.crossAxisLine], c = e[s.crossAxisStart], l = e[s.crossAxisEnd], u = Je(i[s.crossAxisStart], i[s.crossAxisEnd]), f = u(c), d = u(l);
    return !f && !d ? !0 : f ? c < a : l > a;
  });
  return r.length ? r.length === 1 ? r[0].descriptor.id : dS({
    pageBorderBox: e,
    draggable: t,
    candidates: r
  }) : null;
}
const Kf = (e, t) => at(dr(e, t));
var pS = (e, t) => {
  const n = e.frame;
  return n ? Kf(t, n.scroll.diff.value) : t;
};
function Yf({
  displaced: e,
  id: t
}) {
  return !!(e.visible[t] || e.invisible[t]);
}
function mS({
  draggable: e,
  closest: t,
  inHomeList: n
}) {
  return t ? n && t.descriptor.index > e.descriptor.index ? t.descriptor.index - 1 : t.descriptor.index : null;
}
var gS = ({
  pageBorderBoxWithDroppableScroll: e,
  draggable: t,
  destination: n,
  insideDestination: r,
  last: o,
  viewport: i,
  afterCritical: s
}) => {
  const a = n.axis, c = fr(n.axis, t.displaceBy), l = c.value, u = e[a.start], f = e[a.end], p = Qo(t, r).find((g) => {
    const h = g.descriptor.id, w = g.page.borderBox.center[a.line], y = zt(h, s), b = Yf({
      displaced: o,
      id: h
    });
    return y ? b ? f <= w : u < w - l : b ? f <= w + l : u < w;
  }) || null, m = mS({
    draggable: t,
    closest: p,
    inHomeList: In(t, n)
  });
  return Yr({
    draggable: t,
    insideDestination: r,
    destination: n,
    viewport: i,
    last: o,
    displacedBy: c,
    index: m
  });
};
const hS = 4;
var bS = ({
  draggable: e,
  pageBorderBoxWithDroppableScroll: t,
  previousImpact: n,
  destination: r,
  insideDestination: o,
  afterCritical: i
}) => {
  if (!r.isCombineEnabled)
    return null;
  const s = r.axis, a = fr(r.axis, e.displaceBy), c = a.value, l = t[s.start], u = t[s.end], d = Qo(e, o).find((m) => {
    const g = m.descriptor.id, h = m.page.borderBox, y = h[s.size] / hS, b = zt(g, i), v = Yf({
      displaced: n.displaced,
      id: g
    });
    return b ? v ? u > h[s.start] + y && u < h[s.end] - y : l > h[s.start] - c + y && l < h[s.end] - c - y : v ? u > h[s.start] + c + y && u < h[s.end] + c - y : l > h[s.start] + y && l < h[s.end] - y;
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
}, Xf = ({
  pageOffset: e,
  draggable: t,
  draggables: n,
  droppables: r,
  previousImpact: o,
  viewport: i,
  afterCritical: s
}) => {
  const a = Kf(t.page.borderBox, e), c = fS({
    pageBorderBox: a,
    draggable: t,
    droppables: r
  });
  if (!c)
    return Nx;
  const l = r[c], u = Rn(l.descriptor.id, n), f = pS(l, a);
  return bS({
    pageBorderBoxWithDroppableScroll: f,
    draggable: t,
    previousImpact: o,
    destination: l,
    insideDestination: u,
    afterCritical: s
  }) || gS({
    pageBorderBoxWithDroppableScroll: f,
    draggable: t,
    destination: l,
    insideDestination: u,
    last: o.displaced,
    viewport: i,
    afterCritical: s
  });
}, za = (e, t) => ({
  ...e,
  [t.descriptor.id]: t
});
const yS = ({
  previousImpact: e,
  impact: t,
  droppables: n
}) => {
  const r = ze(e), o = ze(t);
  if (!r || r === o)
    return n;
  const i = n[r];
  if (!i.subject.withPlaceholder)
    return n;
  const s = iS(i);
  return za(n, s);
};
var vS = ({
  draggable: e,
  draggables: t,
  droppables: n,
  previousImpact: r,
  impact: o
}) => {
  const i = yS({
    previousImpact: r,
    impact: o,
    droppables: n
  }), s = ze(o);
  if (!s)
    return i;
  const a = n[s];
  if (In(e, a) || a.subject.withPlaceholder)
    return i;
  const c = Uf(a, e, t);
  return za(i, c);
}, Fn = ({
  state: e,
  clientSelection: t,
  dimensions: n,
  viewport: r,
  impact: o,
  scrollJumpRequest: i
}) => {
  const s = r || e.viewport, a = n || e.dimensions, c = t || e.current.client.selection, l = Be(c, e.initial.client.selection), u = {
    offset: l,
    selection: c,
    borderBoxCenter: ye(e.initial.client.borderBoxCenter, l)
  }, f = {
    selection: ye(u.selection, s.scroll.current),
    borderBoxCenter: ye(u.borderBoxCenter, s.scroll.current),
    offset: ye(u.offset, s.scroll.diff.value)
  }, d = {
    client: u,
    page: f
  };
  if (e.phase === "COLLECTING")
    return {
      ...e,
      dimensions: a,
      viewport: s,
      current: d
    };
  const p = a.draggables[e.critical.draggable.id], m = o || Xf({
    pageOffset: f.offset,
    draggable: p,
    draggables: a.draggables,
    droppables: a.droppables,
    previousImpact: e.impact,
    viewport: s,
    afterCritical: e.afterCritical
  }), g = vS({
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
    viewport: s,
    scrollJumpRequest: i || null,
    forceShouldAnimate: i ? !1 : null
  };
};
function wS(e, t) {
  return e.map((n) => t[n]);
}
var Jf = ({
  impact: e,
  viewport: t,
  draggables: n,
  destination: r,
  forceShouldAnimate: o
}) => {
  const i = e.displaced, s = wS(i.all, n), a = Xn({
    afterDragging: s,
    destination: r,
    displacedBy: e.displacedBy,
    viewport: t.frame,
    forceShouldAnimate: o,
    last: i
  });
  return {
    ...e,
    displaced: a
  };
}, Qf = ({
  impact: e,
  draggable: t,
  droppable: n,
  draggables: r,
  viewport: o,
  afterCritical: i
}) => {
  const s = Zo({
    impact: e,
    draggable: t,
    draggables: r,
    droppable: n,
    afterCritical: i
  });
  return ja({
    pageBorderBoxCenter: s,
    draggable: t,
    viewport: o
  });
}, Zf = ({
  state: e,
  dimensions: t,
  viewport: n
}) => {
  e.movementMode !== "SNAP" && k(!1);
  const r = e.impact, o = n || e.viewport, i = t || e.dimensions, {
    draggables: s,
    droppables: a
  } = i, c = s[e.critical.draggable.id], l = ze(r);
  l || k(!1);
  const u = a[l], f = Jf({
    impact: r,
    viewport: o,
    destination: u,
    draggables: s
  }), d = Qf({
    impact: f,
    draggable: c,
    droppable: u,
    draggables: s,
    viewport: o,
    afterCritical: e.afterCritical
  });
  return Fn({
    impact: f,
    clientSelection: d,
    state: e,
    dimensions: i,
    viewport: o
  });
}, xS = (e) => ({
  index: e.index,
  droppableId: e.droppableId
}), ep = ({
  draggable: e,
  home: t,
  draggables: n,
  viewport: r
}) => {
  const o = fr(t.axis, e.displaceBy), i = Rn(t.descriptor.id, n), s = i.indexOf(e);
  s === -1 && k(!1);
  const a = i.slice(s + 1), c = a.reduce((d, p) => (d[p.descriptor.id] = !0, d), {}), l = {
    inVirtualList: t.descriptor.mode === "virtual",
    displacedBy: o,
    effected: c
  };
  return {
    impact: {
      displaced: Xn({
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
        destination: xS(e.descriptor)
      }
    },
    afterCritical: l
  };
}, SS = (e, t) => ({
  draggables: e.draggables,
  droppables: za(e.droppables, t)
}), CS = ({
  draggable: e,
  offset: t,
  initialWindowScroll: n
}) => {
  const r = Hr(e.client, t), o = Ur(r, n);
  return {
    ...e,
    placeholder: {
      ...e.placeholder,
      client: r
    },
    client: r,
    page: o
  };
}, ES = (e) => {
  const t = e.frame;
  return t || k(!1), t;
}, PS = ({
  additions: e,
  updatedDroppables: t,
  viewport: n
}) => {
  const r = n.scroll.diff.value;
  return e.map((o) => {
    const i = o.descriptor.droppableId, s = t[i], c = ES(s).scroll.diff.value, l = ye(r, c);
    return CS({
      draggable: o,
      offset: l,
      initialWindowScroll: n.scroll.initial
    });
  });
}, DS = ({
  state: e,
  published: t
}) => {
  const n = t.modified.map((w) => {
    const y = e.dimensions.droppables[w.droppableId];
    return Ma(y, w.scroll);
  }), r = {
    ...e.dimensions.droppables,
    ..._f(n)
  }, o = kf(PS({
    additions: t.additions,
    updatedDroppables: r,
    viewport: e.viewport
  })), i = {
    ...e.dimensions.draggables,
    ...o
  };
  t.removals.forEach((w) => {
    delete i[w];
  });
  const s = {
    droppables: r,
    draggables: i
  }, a = ze(e.impact), c = a ? s.droppables[a] : null, l = s.draggables[e.critical.draggable.id], u = s.droppables[e.critical.droppable.id], {
    impact: f,
    afterCritical: d
  } = ep({
    draggable: l,
    home: u,
    draggables: i,
    viewport: e.viewport
  }), p = c && c.isCombineEnabled ? e.impact : f, m = Xf({
    pageOffset: e.current.page.offset,
    draggable: s.draggables[e.critical.draggable.id],
    draggables: s.draggables,
    droppables: s.droppables,
    previousImpact: p,
    viewport: e.viewport,
    afterCritical: d
  }), g = {
    ...e,
    phase: "DRAGGING",
    impact: m,
    onLiftImpact: f,
    dimensions: s,
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
const is = (e) => e.movementMode === "SNAP", Ai = (e, t, n) => {
  const r = SS(e.dimensions, t);
  return !is(e) || n ? Fn({
    state: e,
    dimensions: r
  }) : Zf({
    state: e,
    dimensions: r
  });
};
function Oi(e) {
  return e.isDragging && e.movementMode === "SNAP" ? {
    ...e,
    scrollJumpRequest: null
  } : e;
}
const Pl = {
  phase: "IDLE",
  completed: null,
  shouldFlush: !1
};
var RS = (e = Pl, t) => {
  if (t.type === "FLUSH")
    return {
      ...Pl,
      shouldFlush: !0
    };
  if (t.type === "INITIAL_PUBLISH") {
    e.phase !== "IDLE" && k(!1);
    const {
      critical: n,
      clientSelection: r,
      viewport: o,
      dimensions: i,
      movementMode: s
    } = t.payload, a = i.draggables[n.draggable.id], c = i.droppables[n.droppable.id], l = {
      selection: r,
      borderBoxCenter: a.client.borderBox.center,
      offset: pe
    }, u = {
      client: l,
      page: {
        selection: ye(l.selection, o.scroll.initial),
        borderBoxCenter: ye(l.selection, o.scroll.initial),
        offset: ye(l.selection, o.scroll.diff.value)
      }
    }, f = Xo(i.droppables).every((g) => !g.isFixedOnPage), {
      impact: d,
      afterCritical: p
    } = ep({
      draggable: a,
      home: c,
      draggables: i.draggables,
      viewport: o
    });
    return {
      phase: "DRAGGING",
      isDragging: !0,
      critical: n,
      movementMode: s,
      dimensions: i,
      initial: u,
      current: u,
      isWindowScrollAllowed: f,
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
    return e.phase === "COLLECTING" || e.phase === "DROP_PENDING" || k(!1), DS({
      state: e,
      published: t.payload
    });
  if (t.type === "MOVE") {
    if (e.phase === "DROP_PENDING")
      return e;
    Jt(e) || k(!1);
    const {
      client: n
    } = t.payload;
    return Lt(n, e.current.client.selection) ? e : Fn({
      state: e,
      clientSelection: n,
      impact: is(e) ? e.impact : null
    });
  }
  if (t.type === "UPDATE_DROPPABLE_SCROLL") {
    if (e.phase === "DROP_PENDING" || e.phase === "COLLECTING")
      return Oi(e);
    Jt(e) || k(!1);
    const {
      id: n,
      newScroll: r
    } = t.payload, o = e.dimensions.droppables[n];
    if (!o)
      return e;
    const i = Ma(o, r);
    return Ai(e, i, !1);
  }
  if (t.type === "UPDATE_DROPPABLE_IS_ENABLED") {
    if (e.phase === "DROP_PENDING")
      return e;
    Jt(e) || k(!1);
    const {
      id: n,
      isEnabled: r
    } = t.payload, o = e.dimensions.droppables[n];
    o || k(!1), o.isEnabled === r && k(!1);
    const i = {
      ...o,
      isEnabled: r
    };
    return Ai(e, i, !0);
  }
  if (t.type === "UPDATE_DROPPABLE_IS_COMBINE_ENABLED") {
    if (e.phase === "DROP_PENDING")
      return e;
    Jt(e) || k(!1);
    const {
      id: n,
      isCombineEnabled: r
    } = t.payload, o = e.dimensions.droppables[n];
    o || k(!1), o.isCombineEnabled === r && k(!1);
    const i = {
      ...o,
      isCombineEnabled: r
    };
    return Ai(e, i, !0);
  }
  if (t.type === "MOVE_BY_WINDOW_SCROLL") {
    if (e.phase === "DROP_PENDING" || e.phase === "DROP_ANIMATING")
      return e;
    Jt(e) || k(!1), e.isWindowScrollAllowed || k(!1);
    const n = t.payload.newScroll;
    if (Lt(e.viewport.scroll.current, n))
      return Oi(e);
    const r = Wf(e.viewport, n);
    return is(e) ? Zf({
      state: e,
      viewport: r
    }) : Fn({
      state: e,
      viewport: r
    });
  }
  if (t.type === "UPDATE_VIEWPORT_MAX_SCROLL") {
    if (!Jt(e))
      return e;
    const n = t.payload.maxScroll;
    if (Lt(n, e.viewport.scroll.max))
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
    const n = lS({
      state: e,
      type: t.type
    });
    return n ? Fn({
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
const IS = (e) => ({
  type: "BEFORE_INITIAL_CAPTURE",
  payload: e
}), AS = (e) => ({
  type: "LIFT",
  payload: e
}), OS = (e) => ({
  type: "INITIAL_PUBLISH",
  payload: e
}), NS = (e) => ({
  type: "PUBLISH_WHILE_DRAGGING",
  payload: e
}), $S = () => ({
  type: "COLLECTION_STARTING",
  payload: null
}), TS = (e) => ({
  type: "UPDATE_DROPPABLE_SCROLL",
  payload: e
}), LS = (e) => ({
  type: "UPDATE_DROPPABLE_IS_ENABLED",
  payload: e
}), MS = (e) => ({
  type: "UPDATE_DROPPABLE_IS_COMBINE_ENABLED",
  payload: e
}), tp = (e) => ({
  type: "MOVE",
  payload: e
}), _S = (e) => ({
  type: "MOVE_BY_WINDOW_SCROLL",
  payload: e
}), kS = (e) => ({
  type: "UPDATE_VIEWPORT_MAX_SCROLL",
  payload: e
}), FS = () => ({
  type: "MOVE_UP",
  payload: null
}), BS = () => ({
  type: "MOVE_DOWN",
  payload: null
}), jS = () => ({
  type: "MOVE_RIGHT",
  payload: null
}), zS = () => ({
  type: "MOVE_LEFT",
  payload: null
}), Va = () => ({
  type: "FLUSH",
  payload: null
}), VS = (e) => ({
  type: "DROP_ANIMATE",
  payload: e
}), Wa = (e) => ({
  type: "DROP_COMPLETE",
  payload: e
}), np = (e) => ({
  type: "DROP",
  payload: e
}), WS = (e) => ({
  type: "DROP_PENDING",
  payload: e
}), rp = () => ({
  type: "DROP_ANIMATION_FINISHED",
  payload: null
});
var GS = (e) => ({
  getState: t,
  dispatch: n
}) => (r) => (o) => {
  if (o.type !== "LIFT") {
    r(o);
    return;
  }
  const {
    id: i,
    clientSelection: s,
    movementMode: a
  } = o.payload, c = t();
  c.phase === "DROP_ANIMATING" && n(Wa({
    completed: c.completed
  })), t().phase !== "IDLE" && k(!1), n(Va()), n(IS({
    draggableId: i,
    movementMode: a
  }));
  const u = {
    draggableId: i,
    scrollOptions: {
      shouldPublishImmediately: a === "SNAP"
    }
  }, {
    critical: f,
    dimensions: d,
    viewport: p
  } = e.startPublishing(u);
  n(OS({
    critical: f,
    dimensions: d,
    clientSelection: s,
    movementMode: a,
    viewport: p
  }));
}, HS = (e) => () => (t) => (n) => {
  n.type === "INITIAL_PUBLISH" && e.dragging(), n.type === "DROP_ANIMATE" && e.dropping(n.payload.completed.result.reason), (n.type === "FLUSH" || n.type === "DROP_COMPLETE") && e.resting(), t(n);
};
const Ga = {
  outOfTheWay: "cubic-bezier(0.2, 0, 0, 1)",
  drop: "cubic-bezier(.2,1,.1,1)"
}, Jn = {
  opacity: {
    drop: 0,
    combining: 0.7
  },
  scale: {
    drop: 0.75
  }
}, op = {
  outOfTheWay: 0.2,
  minDropTime: 0.33,
  maxDropTime: 0.55
}, Kt = `${op.outOfTheWay}s ${Ga.outOfTheWay}`, Bn = {
  fluid: `opacity ${Kt}`,
  snap: `transform ${Kt}, opacity ${Kt}`,
  drop: (e) => {
    const t = `${e}s ${Ga.drop}`;
    return `transform ${t}, opacity ${t}`;
  },
  outOfTheWay: `transform ${Kt}`,
  placeholder: `height ${Kt}, width ${Kt}, margin ${Kt}`
}, Dl = (e) => Lt(e, pe) ? void 0 : `translate(${e.x}px, ${e.y}px)`, ss = {
  moveTo: Dl,
  drop: (e, t) => {
    const n = Dl(e);
    if (n)
      return t ? `${n} scale(${Jn.scale.drop})` : n;
  }
}, {
  minDropTime: as,
  maxDropTime: ip
} = op, US = ip - as, Rl = 1500, qS = 0.6;
var KS = ({
  current: e,
  destination: t,
  reason: n
}) => {
  const r = Kn(e, t);
  if (r <= 0)
    return as;
  if (r >= Rl)
    return ip;
  const o = r / Rl, i = as + US * o, s = n === "CANCEL" ? i * qS : i;
  return Number(s.toFixed(2));
}, YS = ({
  impact: e,
  draggable: t,
  dimensions: n,
  viewport: r,
  afterCritical: o
}) => {
  const {
    draggables: i,
    droppables: s
  } = n, a = ze(e), c = a ? s[a] : null, l = s[t.descriptor.droppableId], u = Qf({
    impact: e,
    draggable: t,
    draggables: i,
    afterCritical: o,
    droppable: c || l,
    viewport: r
  });
  return Be(u, t.client.borderBox.center);
}, XS = ({
  draggables: e,
  reason: t,
  lastImpact: n,
  home: r,
  viewport: o,
  onLiftImpact: i
}) => !n.at || t !== "DROP" ? {
  impact: Jf({
    draggables: e,
    impact: i,
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
    displaced: Yn
  },
  didDropInsideDroppable: !0
};
const JS = ({
  getState: e,
  dispatch: t
}) => (n) => (r) => {
  if (r.type !== "DROP") {
    n(r);
    return;
  }
  const o = e(), i = r.payload.reason;
  if (o.phase === "COLLECTING") {
    t(WS({
      reason: i
    }));
    return;
  }
  if (o.phase === "IDLE")
    return;
  o.phase === "DROP_PENDING" && o.isWaiting && k(!1), o.phase === "DRAGGING" || o.phase === "DROP_PENDING" || k(!1);
  const a = o.critical, c = o.dimensions, l = c.draggables[o.critical.draggable.id], {
    impact: u,
    didDropInsideDroppable: f
  } = XS({
    reason: i,
    lastImpact: o.impact,
    afterCritical: o.afterCritical,
    onLiftImpact: o.onLiftImpact,
    home: o.dimensions.droppables[o.critical.droppable.id],
    viewport: o.viewport,
    draggables: o.dimensions.draggables
  }), d = f ? _a(u) : null, p = f ? Jo(u) : null, m = {
    index: a.draggable.index,
    droppableId: a.droppable.id
  }, g = {
    draggableId: l.descriptor.id,
    type: l.descriptor.type,
    source: m,
    reason: i,
    mode: o.movementMode,
    destination: d,
    combine: p
  }, h = YS({
    impact: u,
    draggable: l,
    dimensions: c,
    viewport: o.viewport,
    afterCritical: o.afterCritical
  }), w = {
    critical: o.critical,
    afterCritical: o.afterCritical,
    result: g,
    impact: u
  };
  if (!(!Lt(o.current.client.offset, h) || !!g.combine)) {
    t(Wa({
      completed: w
    }));
    return;
  }
  const b = KS({
    current: o.current.client.offset,
    destination: h,
    reason: i
  });
  t(VS({
    newHomeClientOffset: h,
    dropDuration: b,
    completed: w
  }));
};
var QS = JS, sp = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset
});
function ZS(e) {
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
function e1({
  onWindowScroll: e
}) {
  function t() {
    e(sp());
  }
  const n = qn(t), r = ZS(n);
  let o = Tt;
  function i() {
    return o !== Tt;
  }
  function s() {
    i() && k(!1), o = Ye(window, [r]);
  }
  function a() {
    i() || k(!1), n.cancel(), o(), o = Tt;
  }
  return {
    start: s,
    stop: a,
    isActive: i
  };
}
const t1 = (e) => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH", n1 = (e) => {
  const t = e1({
    onWindowScroll: (n) => {
      e.dispatch(_S({
        newScroll: n
      }));
    }
  });
  return (n) => (r) => {
    !t.isActive() && r.type === "INITIAL_PUBLISH" && t.start(), t.isActive() && t1(r) && t.stop(), n(r);
  };
};
var r1 = n1, o1 = (e) => {
  let t = !1, n = !1;
  const r = setTimeout(() => {
    n = !0;
  }), o = (i) => {
    t || n || (t = !0, e(i), clearTimeout(r));
  };
  return o.wasCalled = () => t, o;
}, i1 = () => {
  const e = [], t = (o) => {
    const i = e.findIndex((a) => a.timerId === o);
    i === -1 && k(!1);
    const [s] = e.splice(i, 1);
    s.callback();
  };
  return {
    add: (o) => {
      const i = setTimeout(() => t(i)), s = {
        timerId: i,
        callback: o
      };
      e.push(s);
    },
    flush: () => {
      if (!e.length)
        return;
      const o = [...e];
      e.length = 0, o.forEach((i) => {
        clearTimeout(i.timerId), i.callback();
      });
    }
  };
};
const s1 = (e, t) => e == null && t == null ? !0 : e == null || t == null ? !1 : e.droppableId === t.droppableId && e.index === t.index, a1 = (e, t) => e == null && t == null ? !0 : e == null || t == null ? !1 : e.draggableId === t.draggableId && e.droppableId === t.droppableId, c1 = (e, t) => {
  if (e === t)
    return !0;
  const n = e.draggable.id === t.draggable.id && e.draggable.droppableId === t.draggable.droppableId && e.draggable.type === t.draggable.type && e.draggable.index === t.draggable.index, r = e.droppable.id === t.droppable.id && e.droppable.type === t.droppable.type;
  return n && r;
}, Tn = (e, t) => {
  t();
}, xr = (e, t) => ({
  draggableId: e.draggable.id,
  type: e.droppable.type,
  source: {
    droppableId: e.droppable.id,
    index: e.draggable.index
  },
  mode: t
});
function Ni(e, t, n, r) {
  if (!e) {
    n(r(t));
    return;
  }
  const o = o1(n);
  e(t, {
    announce: o
  }), o.wasCalled() || n(r(t));
}
var l1 = (e, t) => {
  const n = i1();
  let r = null;
  const o = (f, d) => {
    r && k(!1), Tn("onBeforeCapture", () => {
      const p = e().onBeforeCapture;
      p && p({
        draggableId: f,
        mode: d
      });
    });
  }, i = (f, d) => {
    r && k(!1), Tn("onBeforeDragStart", () => {
      const p = e().onBeforeDragStart;
      p && p(xr(f, d));
    });
  }, s = (f, d) => {
    r && k(!1);
    const p = xr(f, d);
    r = {
      mode: d,
      lastCritical: f,
      lastLocation: p.source,
      lastCombine: null
    }, n.add(() => {
      Tn("onDragStart", () => Ni(e().onDragStart, p, t, Or.onDragStart));
    });
  }, a = (f, d) => {
    const p = _a(d), m = Jo(d);
    r || k(!1);
    const g = !c1(f, r.lastCritical);
    g && (r.lastCritical = f);
    const h = !s1(r.lastLocation, p);
    h && (r.lastLocation = p);
    const w = !a1(r.lastCombine, m);
    if (w && (r.lastCombine = m), !g && !h && !w)
      return;
    const y = {
      ...xr(f, r.mode),
      combine: m,
      destination: p
    };
    n.add(() => {
      Tn("onDragUpdate", () => Ni(e().onDragUpdate, y, t, Or.onDragUpdate));
    });
  }, c = () => {
    r || k(!1), n.flush();
  }, l = (f) => {
    r || k(!1), r = null, Tn("onDragEnd", () => Ni(e().onDragEnd, f, t, Or.onDragEnd));
  };
  return {
    beforeCapture: o,
    beforeStart: i,
    start: s,
    update: a,
    flush: c,
    drop: l,
    abort: () => {
      if (!r)
        return;
      const f = {
        ...xr(r.lastCritical, r.mode),
        combine: null,
        destination: null,
        reason: "CANCEL"
      };
      l(f);
    }
  };
}, u1 = (e, t) => {
  const n = l1(e, t);
  return (r) => (o) => (i) => {
    if (i.type === "BEFORE_INITIAL_CAPTURE") {
      n.beforeCapture(i.payload.draggableId, i.payload.movementMode);
      return;
    }
    if (i.type === "INITIAL_PUBLISH") {
      const a = i.payload.critical;
      n.beforeStart(a, i.payload.movementMode), o(i), n.start(a, i.payload.movementMode);
      return;
    }
    if (i.type === "DROP_COMPLETE") {
      const a = i.payload.completed.result;
      n.flush(), o(i), n.drop(a);
      return;
    }
    if (o(i), i.type === "FLUSH") {
      n.abort();
      return;
    }
    const s = r.getState();
    s.phase === "DRAGGING" && n.update(s.critical, s.impact);
  };
};
const d1 = (e) => (t) => (n) => {
  if (n.type !== "DROP_ANIMATION_FINISHED") {
    t(n);
    return;
  }
  const r = e.getState();
  r.phase !== "DROP_ANIMATING" && k(!1), e.dispatch(Wa({
    completed: r.completed
  }));
};
var f1 = d1;
const p1 = (e) => {
  let t = null, n = null;
  function r() {
    n && (cancelAnimationFrame(n), n = null), t && (t(), t = null);
  }
  return (o) => (i) => {
    if ((i.type === "FLUSH" || i.type === "DROP_COMPLETE" || i.type === "DROP_ANIMATION_FINISHED") && r(), o(i), i.type !== "DROP_ANIMATE")
      return;
    const s = {
      eventName: "scroll",
      options: {
        capture: !0,
        passive: !1,
        once: !0
      },
      fn: function() {
        e.getState().phase === "DROP_ANIMATING" && e.dispatch(rp());
      }
    };
    n = requestAnimationFrame(() => {
      n = null, t = Ye(window, [s]);
    });
  };
};
var m1 = p1, g1 = (e) => () => (t) => (n) => {
  (n.type === "DROP_COMPLETE" || n.type === "FLUSH" || n.type === "DROP_ANIMATE") && e.stopPublishing(), t(n);
}, h1 = (e) => {
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
const b1 = (e) => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH";
var y1 = (e) => (t) => (n) => (r) => {
  if (b1(r)) {
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
const v1 = (e) => (t) => (n) => {
  if (t(n), n.type !== "PUBLISH_WHILE_DRAGGING")
    return;
  const r = e.getState();
  r.phase === "DROP_PENDING" && (r.isWaiting || e.dispatch(np({
    reason: r.reason
  })));
};
var w1 = v1;
const x1 = If;
var S1 = ({
  dimensionMarshal: e,
  focusMarshal: t,
  styleMarshal: n,
  getResponders: r,
  announce: o,
  autoScroller: i
}) => Rf(RS, x1(ix(HS(n), g1(e), GS(e), QS, f1, m1, w1, y1(i), r1, h1(t), u1(r, o))));
const $i = () => ({
  additions: {},
  removals: {},
  modified: {}
});
function C1({
  registry: e,
  callbacks: t
}) {
  let n = $i(), r = null;
  const o = () => {
    r || (t.collectionStarting(), r = requestAnimationFrame(() => {
      r = null;
      const {
        additions: c,
        removals: l,
        modified: u
      } = n, f = Object.keys(c).map((m) => e.draggable.getById(m).getDimension(pe)).sort((m, g) => m.descriptor.index - g.descriptor.index), d = Object.keys(u).map((m) => {
        const h = e.droppable.getById(m).callbacks.getScrollWhileDragging();
        return {
          droppableId: m,
          scroll: h
        };
      }), p = {
        additions: f,
        removals: Object.keys(l),
        modified: d
      };
      n = $i(), t.publish(p);
    }));
  };
  return {
    add: (c) => {
      const l = c.descriptor.id;
      n.additions[l] = c, n.modified[c.descriptor.droppableId] = !0, n.removals[l] && delete n.removals[l], o();
    },
    remove: (c) => {
      const l = c.descriptor;
      n.removals[l.id] = !0, n.modified[l.droppableId] = !0, n.additions[l.id] && delete n.additions[l.id], o();
    },
    stop: () => {
      r && (cancelAnimationFrame(r), r = null, n = $i());
    }
  };
}
var ap = ({
  scrollHeight: e,
  scrollWidth: t,
  height: n,
  width: r
}) => {
  const o = Be({
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
}, cp = () => {
  const e = document.documentElement;
  return e || k(!1), e;
}, lp = () => {
  const e = cp();
  return ap({
    scrollHeight: e.scrollHeight,
    scrollWidth: e.scrollWidth,
    width: e.clientWidth,
    height: e.clientHeight
  });
}, E1 = () => {
  const e = sp(), t = lp(), n = e.y, r = e.x, o = cp(), i = o.clientWidth, s = o.clientHeight, a = r + i, c = n + s;
  return {
    frame: at({
      top: n,
      left: r,
      right: a,
      bottom: c
    }),
    scroll: {
      initial: e,
      current: e,
      max: t,
      diff: {
        value: pe,
        displacement: pe
      }
    }
  };
}, P1 = ({
  critical: e,
  scrollOptions: t,
  registry: n
}) => {
  const r = E1(), o = r.scroll.current, i = e.droppable, s = n.droppable.getAllByType(i.type).map((u) => u.callbacks.getDimensionAndWatchScroll(o, t)), a = n.draggable.getAllByType(e.draggable.type).map((u) => u.getDimension(o));
  return {
    dimensions: {
      draggables: kf(a),
      droppables: _f(s)
    },
    critical: e,
    viewport: r
  };
};
function Il(e, t, n) {
  return !(n.descriptor.id === t.id || n.descriptor.type !== t.type || e.droppable.getById(n.descriptor.droppableId).descriptor.mode !== "virtual");
}
var D1 = (e, t) => {
  let n = null;
  const r = C1({
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
  }, i = (d, p) => {
    n && (e.droppable.exists(d) || k(!1), t.updateDroppableIsCombineEnabled({
      id: d,
      isCombineEnabled: p
    }));
  }, s = (d, p) => {
    n && (e.droppable.exists(d) || k(!1), t.updateDroppableScroll({
      id: d,
      newScroll: p
    }));
  }, a = (d, p) => {
    n && e.droppable.getById(d).callbacks.scroll(p);
  }, c = () => {
    if (!n)
      return;
    r.stop();
    const d = n.critical.droppable;
    e.droppable.getAllByType(d.type).forEach((p) => p.callbacks.dragStopped()), n.unsubscribe(), n = null;
  }, l = (d) => {
    n || k(!1);
    const p = n.critical.draggable;
    d.type === "ADDITION" && Il(e, p, d.value) && r.add(d.value), d.type === "REMOVAL" && Il(e, p, d.value) && r.remove(d.value);
  };
  return {
    updateDroppableIsEnabled: o,
    updateDroppableIsCombineEnabled: i,
    scrollDroppable: a,
    updateDroppableScroll: s,
    startPublishing: (d) => {
      n && k(!1);
      const p = e.draggable.getById(d.draggableId), m = e.droppable.getById(p.descriptor.droppableId), g = {
        draggable: p.descriptor,
        droppable: m.descriptor
      }, h = e.subscribe(l);
      return n = {
        critical: g,
        unsubscribe: h
      }, P1({
        critical: g,
        registry: e,
        scrollOptions: d.scrollOptions
      });
    },
    stopPublishing: c
  };
}, up = (e, t) => e.phase === "IDLE" ? !0 : e.phase !== "DROP_ANIMATING" || e.completed.result.draggableId === t ? !1 : e.completed.result.reason === "DROP", R1 = (e) => {
  window.scrollBy(e.x, e.y);
};
const I1 = de((e) => Xo(e).filter((t) => !(!t.isEnabled || !t.frame))), A1 = (e, t) => I1(t).find((r) => (r.frame || k(!1), qf(r.frame.pageMarginBox)(e))) || null;
var O1 = ({
  center: e,
  destination: t,
  droppables: n
}) => {
  if (t) {
    const o = n[t];
    return o.frame ? o : null;
  }
  return A1(e, n);
};
const Qn = {
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
var N1 = (e, t, n = () => Qn) => {
  const r = n(), o = e[t.size] * r.startFromPercentage, i = e[t.size] * r.maxScrollAtPercentage;
  return {
    startScrollingFrom: o,
    maxScrollValueAt: i
  };
}, dp = ({
  startOfRange: e,
  endOfRange: t,
  current: n
}) => {
  const r = t - e;
  return r === 0 ? 0 : (n - e) / r;
}, Ha = 1, $1 = (e, t, n = () => Qn) => {
  const r = n();
  if (e > t.startScrollingFrom)
    return 0;
  if (e <= t.maxScrollValueAt)
    return r.maxPixelScroll;
  if (e === t.startScrollingFrom)
    return Ha;
  const i = 1 - dp({
    startOfRange: t.maxScrollValueAt,
    endOfRange: t.startScrollingFrom,
    current: e
  }), s = r.maxPixelScroll * r.ease(i);
  return Math.ceil(s);
}, T1 = (e, t, n) => {
  const r = n(), o = r.durationDampening.accelerateAt, i = r.durationDampening.stopDampeningAt, s = t, a = i, l = Date.now() - s;
  if (l >= i)
    return e;
  if (l < o)
    return Ha;
  const u = dp({
    startOfRange: o,
    endOfRange: a,
    current: l
  }), f = e * r.ease(u);
  return Math.ceil(f);
}, Al = ({
  distanceToEdge: e,
  thresholds: t,
  dragStartTime: n,
  shouldUseTimeDampening: r,
  getAutoScrollerOptions: o
}) => {
  const i = $1(e, t, o);
  return i === 0 ? 0 : r ? Math.max(T1(i, n, o), Ha) : i;
}, Ol = ({
  container: e,
  distanceToEdges: t,
  dragStartTime: n,
  axis: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: i
}) => {
  const s = N1(e, r, i);
  return t[r.end] < t[r.start] ? Al({
    distanceToEdge: t[r.end],
    thresholds: s,
    dragStartTime: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  }) : -1 * Al({
    distanceToEdge: t[r.start],
    thresholds: s,
    dragStartTime: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  });
}, L1 = ({
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
const M1 = Mf((e) => e === 0 ? 0 : e);
var fp = ({
  dragStartTime: e,
  container: t,
  subject: n,
  center: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: i
}) => {
  const s = {
    top: r.y - t.top,
    right: t.right - r.x,
    bottom: t.bottom - r.y,
    left: r.x - t.left
  }, a = Ol({
    container: t,
    distanceToEdges: s,
    dragStartTime: e,
    axis: ka,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  }), c = Ol({
    container: t,
    distanceToEdges: s,
    dragStartTime: e,
    axis: jf,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  }), l = M1({
    x: c,
    y: a
  });
  if (Lt(l, pe))
    return null;
  const u = L1({
    container: t,
    subject: n,
    proposedScroll: l
  });
  return u ? Lt(u, pe) ? null : u : null;
};
const _1 = Mf((e) => e === 0 ? 0 : e > 0 ? 1 : -1), Ua = (() => {
  const e = (t, n) => t < 0 ? t : t > n ? t - n : 0;
  return ({
    current: t,
    max: n,
    change: r
  }) => {
    const o = ye(t, r), i = {
      x: e(o.x, n.x),
      y: e(o.y, n.y)
    };
    return Lt(i, pe) ? null : i;
  };
})(), pp = ({
  max: e,
  current: t,
  change: n
}) => {
  const r = {
    x: Math.max(t.x, e.x),
    y: Math.max(t.y, e.y)
  }, o = _1(n), i = Ua({
    max: r,
    current: t,
    change: o
  });
  return !i || o.x !== 0 && i.x === 0 || o.y !== 0 && i.y === 0;
}, qa = (e, t) => pp({
  current: e.scroll.current,
  max: e.scroll.max,
  change: t
}), k1 = (e, t) => {
  if (!qa(e, t))
    return null;
  const n = e.scroll.max, r = e.scroll.current;
  return Ua({
    current: r,
    max: n,
    change: t
  });
}, Ka = (e, t) => {
  const n = e.frame;
  return n ? pp({
    current: n.scroll.current,
    max: n.scroll.max,
    change: t
  }) : !1;
}, F1 = (e, t) => {
  const n = e.frame;
  return !n || !Ka(e, t) ? null : Ua({
    current: n.scroll.current,
    max: n.scroll.max,
    change: t
  });
};
var B1 = ({
  viewport: e,
  subject: t,
  center: n,
  dragStartTime: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: i
}) => {
  const s = fp({
    dragStartTime: r,
    container: e.frame,
    subject: t,
    center: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  });
  return s && qa(e, s) ? s : null;
}, j1 = ({
  droppable: e,
  subject: t,
  center: n,
  dragStartTime: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: i
}) => {
  const s = e.frame;
  if (!s)
    return null;
  const a = fp({
    dragStartTime: r,
    container: s.pageMarginBox,
    subject: t,
    center: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  });
  return a && Ka(e, a) ? a : null;
}, Nl = ({
  state: e,
  dragStartTime: t,
  shouldUseTimeDampening: n,
  scrollWindow: r,
  scrollDroppable: o,
  getAutoScrollerOptions: i
}) => {
  const s = e.current.page.borderBoxCenter, c = e.dimensions.draggables[e.critical.draggable.id].page.marginBox;
  if (e.isWindowScrollAllowed) {
    const f = e.viewport, d = B1({
      dragStartTime: t,
      viewport: f,
      subject: c,
      center: s,
      shouldUseTimeDampening: n,
      getAutoScrollerOptions: i
    });
    if (d) {
      r(d);
      return;
    }
  }
  const l = O1({
    center: s,
    destination: ze(e.impact),
    droppables: e.dimensions.droppables
  });
  if (!l)
    return;
  const u = j1({
    dragStartTime: t,
    droppable: l,
    subject: c,
    center: s,
    shouldUseTimeDampening: n,
    getAutoScrollerOptions: i
  });
  u && o(l.descriptor.id, u);
}, z1 = ({
  scrollWindow: e,
  scrollDroppable: t,
  getAutoScrollerOptions: n = () => Qn
}) => {
  const r = qn(e), o = qn(t);
  let i = null;
  const s = (l) => {
    i || k(!1);
    const {
      shouldUseTimeDampening: u,
      dragStartTime: f
    } = i;
    Nl({
      state: l,
      scrollWindow: r,
      scrollDroppable: o,
      dragStartTime: f,
      shouldUseTimeDampening: u,
      getAutoScrollerOptions: n
    });
  };
  return {
    start: (l) => {
      i && k(!1);
      const u = Date.now();
      let f = !1;
      const d = () => {
        f = !0;
      };
      Nl({
        state: l,
        dragStartTime: 0,
        shouldUseTimeDampening: !1,
        scrollWindow: d,
        scrollDroppable: d,
        getAutoScrollerOptions: n
      }), i = {
        dragStartTime: u,
        shouldUseTimeDampening: f
      }, f && s(l);
    },
    stop: () => {
      i && (r.cancel(), o.cancel(), i = null);
    },
    scroll: s
  };
}, V1 = ({
  move: e,
  scrollDroppable: t,
  scrollWindow: n
}) => {
  const r = (a, c) => {
    const l = ye(a.current.client.selection, c);
    e({
      client: l
    });
  }, o = (a, c) => {
    if (!Ka(a, c))
      return c;
    const l = F1(a, c);
    if (!l)
      return t(a.descriptor.id, c), null;
    const u = Be(c, l);
    return t(a.descriptor.id, u), Be(c, u);
  }, i = (a, c, l) => {
    if (!a || !qa(c, l))
      return l;
    const u = k1(c, l);
    if (!u)
      return n(l), null;
    const f = Be(l, u);
    return n(f), Be(l, f);
  };
  return (a) => {
    const c = a.scrollJumpRequest;
    if (!c)
      return;
    const l = ze(a.impact);
    l || k(!1);
    const u = o(a.dimensions.droppables[l], c);
    if (!u)
      return;
    const f = a.viewport, d = i(a.isWindowScrollAllowed, f, u);
    d && r(a, d);
  };
}, W1 = ({
  scrollDroppable: e,
  scrollWindow: t,
  move: n,
  getAutoScrollerOptions: r
}) => {
  const o = z1({
    scrollWindow: t,
    scrollDroppable: e,
    getAutoScrollerOptions: r
  }), i = V1({
    move: n,
    scrollWindow: t,
    scrollDroppable: e
  });
  return {
    scroll: (c) => {
      if (!(r().disabled || c.phase !== "DRAGGING")) {
        if (c.movementMode === "FLUID") {
          o.scroll(c);
          return;
        }
        c.scrollJumpRequest && i(c);
      }
    },
    start: o.start,
    stop: o.stop
  };
};
const xn = "data-rfd", Sn = (() => {
  const e = `${xn}-drag-handle`;
  return {
    base: e,
    draggableId: `${e}-draggable-id`,
    contextId: `${e}-context-id`
  };
})(), cs = (() => {
  const e = `${xn}-draggable`;
  return {
    base: e,
    contextId: `${e}-context-id`,
    id: `${e}-id`
  };
})(), G1 = (() => {
  const e = `${xn}-droppable`;
  return {
    base: e,
    contextId: `${e}-context-id`,
    id: `${e}-id`
  };
})(), $l = {
  contextId: `${xn}-scroll-container-context-id`
}, H1 = (e) => (t) => `[${t}="${e}"]`, Ln = (e, t) => e.map((n) => {
  const r = n.styles[t];
  return r ? `${n.selector} { ${r} }` : "";
}).join(" "), U1 = "pointer-events: none;";
var q1 = (e) => {
  const t = H1(e), n = (() => {
    const a = `
      cursor: -webkit-grab;
      cursor: grab;
    `;
    return {
      selector: t(Sn.contextId),
      styles: {
        always: `
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          touch-action: manipulation;
        `,
        resting: a,
        dragging: U1,
        dropAnimating: a
      }
    };
  })(), r = (() => {
    const a = `
      transition: ${Bn.outOfTheWay};
    `;
    return {
      selector: t(cs.contextId),
      styles: {
        dragging: a,
        dropAnimating: a,
        userCancel: a
      }
    };
  })(), o = {
    selector: t(G1.contextId),
    styles: {
      always: "overflow-anchor: none;"
    }
  }, s = [r, n, o, {
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
    always: Ln(s, "always"),
    resting: Ln(s, "resting"),
    dragging: Ln(s, "dragging"),
    dropAnimating: Ln(s, "dropAnimating"),
    userCancel: Ln(s, "userCancel")
  };
};
const K1 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u" ? oo : W;
var Ve = K1;
const Ti = () => {
  const e = document.querySelector("head");
  return e || k(!1), e;
}, Tl = (e) => {
  const t = document.createElement("style");
  return e && t.setAttribute("nonce", e), t.type = "text/css", t;
};
function Y1(e, t) {
  const n = K(() => q1(e), [e]), r = z(null), o = z(null), i = V(de((f) => {
    const d = o.current;
    d || k(!1), d.textContent = f;
  }), []), s = V((f) => {
    const d = r.current;
    d || k(!1), d.textContent = f;
  }, []);
  Ve(() => {
    !r.current && !o.current || k(!1);
    const f = Tl(t), d = Tl(t);
    return r.current = f, o.current = d, f.setAttribute(`${xn}-always`, e), d.setAttribute(`${xn}-dynamic`, e), Ti().appendChild(f), Ti().appendChild(d), s(n.always), i(n.resting), () => {
      const p = (m) => {
        const g = m.current;
        g || k(!1), Ti().removeChild(g), m.current = null;
      };
      p(r), p(o);
    };
  }, [t, s, i, n.always, n.resting, e]);
  const a = V(() => i(n.dragging), [i, n.dragging]), c = V((f) => {
    if (f === "DROP") {
      i(n.dropAnimating);
      return;
    }
    i(n.userCancel);
  }, [i, n.dropAnimating, n.userCancel]), l = V(() => {
    o.current && i(n.resting);
  }, [i, n.resting]);
  return K(() => ({
    dragging: a,
    dropping: c,
    resting: l
  }), [a, c, l]);
}
function mp(e, t) {
  return Array.from(e.querySelectorAll(t));
}
var gp = (e) => e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window;
function ei(e) {
  return e instanceof gp(e).HTMLElement;
}
function X1(e, t) {
  const n = `[${Sn.contextId}="${e}"]`, r = mp(document, n);
  if (!r.length)
    return null;
  const o = r.find((i) => i.getAttribute(Sn.draggableId) === t);
  return !o || !ei(o) ? null : o;
}
function J1(e) {
  const t = z({}), n = z(null), r = z(null), o = z(!1), i = V(function(d, p) {
    const m = {
      id: d,
      focus: p
    };
    return t.current[d] = m, function() {
      const h = t.current;
      h[d] !== m && delete h[d];
    };
  }, []), s = V(function(d) {
    const p = X1(e, d);
    p && p !== document.activeElement && p.focus();
  }, [e]), a = V(function(d, p) {
    n.current === d && (n.current = p);
  }, []), c = V(function() {
    r.current || o.current && (r.current = requestAnimationFrame(() => {
      r.current = null;
      const d = n.current;
      d && s(d);
    }));
  }, [s]), l = V(function(d) {
    n.current = null;
    const p = document.activeElement;
    p && p.getAttribute(Sn.draggableId) === d && (n.current = d);
  }, []);
  return Ve(() => (o.current = !0, function() {
    o.current = !1;
    const d = r.current;
    d && cancelAnimationFrame(d);
  }), []), K(() => ({
    register: i,
    tryRecordFocus: l,
    tryRestoreFocusRecorded: c,
    tryShiftRecord: a
  }), [i, l, c, a]);
}
function Q1() {
  const e = {
    draggables: {},
    droppables: {}
  }, t = [];
  function n(f) {
    return t.push(f), function() {
      const p = t.indexOf(f);
      p !== -1 && t.splice(p, 1);
    };
  }
  function r(f) {
    t.length && t.forEach((d) => d(f));
  }
  function o(f) {
    return e.draggables[f] || null;
  }
  function i(f) {
    const d = o(f);
    return d || k(!1), d;
  }
  const s = {
    register: (f) => {
      e.draggables[f.descriptor.id] = f, r({
        type: "ADDITION",
        value: f
      });
    },
    update: (f, d) => {
      const p = e.draggables[d.descriptor.id];
      p && p.uniqueId === f.uniqueId && (delete e.draggables[d.descriptor.id], e.draggables[f.descriptor.id] = f);
    },
    unregister: (f) => {
      const d = f.descriptor.id, p = o(d);
      p && f.uniqueId === p.uniqueId && (delete e.draggables[d], e.droppables[f.descriptor.droppableId] && r({
        type: "REMOVAL",
        value: f
      }));
    },
    getById: i,
    findById: o,
    exists: (f) => !!o(f),
    getAllByType: (f) => Object.values(e.draggables).filter((d) => d.descriptor.type === f)
  };
  function a(f) {
    return e.droppables[f] || null;
  }
  function c(f) {
    const d = a(f);
    return d || k(!1), d;
  }
  const l = {
    register: (f) => {
      e.droppables[f.descriptor.id] = f;
    },
    unregister: (f) => {
      const d = a(f.descriptor.id);
      d && f.uniqueId === d.uniqueId && delete e.droppables[f.descriptor.id];
    },
    getById: c,
    findById: a,
    exists: (f) => !!a(f),
    getAllByType: (f) => Object.values(e.droppables).filter((d) => d.descriptor.type === f)
  };
  function u() {
    e.draggables = {}, e.droppables = {}, t.length = 0;
  }
  return {
    draggable: s,
    droppable: l,
    subscribe: n,
    clean: u
  };
}
function Z1() {
  const e = K(Q1, []);
  return W(() => function() {
    x.version.startsWith("16") || x.version.startsWith("17") ? requestAnimationFrame(e.clean) : e.clean();
  }, [e]), e;
}
var Ya = x.createContext(null), Xr = () => {
  const e = document.body;
  return e || k(!1), e;
};
const eC = {
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
var tC = eC;
const nC = (e) => `rfd-announcement-${e}`;
function rC(e) {
  const t = K(() => nC(e), [e]), n = z(null);
  return W(function() {
    const i = document.createElement("div");
    return n.current = i, i.id = t, i.setAttribute("aria-live", "assertive"), i.setAttribute("aria-atomic", "true"), $t(i.style, tC), Xr().appendChild(i), function() {
      setTimeout(function() {
        const c = Xr();
        c.contains(i) && c.removeChild(i), i === n.current && (n.current = null);
      });
    };
  }, [t]), V((o) => {
    const i = n.current;
    if (i) {
      i.textContent = o;
      return;
    }
  }, []);
}
let oC = 0;
const hp = {
  separator: "::"
};
function iC(e, t = hp) {
  return K(() => `${e}${t.separator}${oC++}`, [t.separator, e]);
}
function sC(e, t = hp) {
  const n = x.useId();
  return K(() => `${e}${t.separator}${n}`, [t.separator, e, n]);
}
var Xa = "useId" in x ? sC : iC;
function aC({
  contextId: e,
  uniqueId: t
}) {
  return `rfd-hidden-text-${e}-${t}`;
}
function cC({
  contextId: e,
  text: t
}) {
  const n = Xa("hidden-text", {
    separator: "-"
  }), r = K(() => aC({
    contextId: e,
    uniqueId: n
  }), [n, e]);
  return W(function() {
    const i = document.createElement("div");
    return i.id = r, i.textContent = t, i.style.display = "none", Xr().appendChild(i), function() {
      const a = Xr();
      a.contains(i) && a.removeChild(i);
    };
  }, [r, t]), r;
}
var ti = x.createContext(null);
function bp(e) {
  const t = z(e);
  return W(() => {
    t.current = e;
  }), t;
}
function lC() {
  let e = null;
  function t() {
    return !!e;
  }
  function n(s) {
    return s === e;
  }
  function r(s) {
    e && k(!1);
    const a = {
      abandon: s
    };
    return e = a, a;
  }
  function o() {
    e || k(!1), e = null;
  }
  function i() {
    e && (e.abandon(), o());
  }
  return {
    isClaimed: t,
    isActive: n,
    claim: r,
    release: o,
    tryAbandon: i
  };
}
function Zn(e) {
  return e.phase === "IDLE" || e.phase === "DROP_ANIMATING" ? !1 : e.isDragging;
}
const uC = 9, dC = 13, Ja = 27, yp = 32, fC = 33, pC = 34, mC = 35, gC = 36, hC = 37, bC = 38, yC = 39, vC = 40, wC = {
  [dC]: !0,
  [uC]: !0
};
var vp = (e) => {
  wC[e.keyCode] && e.preventDefault();
};
const xC = (() => {
  const e = "visibilitychange";
  return typeof document > "u" ? e : [e, `ms${e}`, `webkit${e}`, `moz${e}`, `o${e}`].find((r) => `on${r}` in document) || e;
})();
var ni = xC;
const wp = 0, Ll = 5;
function SC(e, t) {
  return Math.abs(t.x - e.x) >= Ll || Math.abs(t.y - e.y) >= Ll;
}
const Ml = {
  type: "IDLE"
};
function CC({
  cancel: e,
  completed: t,
  getPhase: n,
  setPhase: r
}) {
  return [{
    eventName: "mousemove",
    fn: (o) => {
      const {
        button: i,
        clientX: s,
        clientY: a
      } = o;
      if (i !== wp)
        return;
      const c = {
        x: s,
        y: a
      }, l = n();
      if (l.type === "DRAGGING") {
        o.preventDefault(), l.actions.move(c);
        return;
      }
      l.type !== "PENDING" && k(!1);
      const u = l.point;
      if (!SC(u, c))
        return;
      o.preventDefault();
      const f = l.actions.fluidLift(c);
      r({
        type: "DRAGGING",
        actions: f
      });
    }
  }, {
    eventName: "mouseup",
    fn: (o) => {
      const i = n();
      if (i.type !== "DRAGGING") {
        e();
        return;
      }
      o.preventDefault(), i.actions.drop({
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
      if (o.keyCode === Ja) {
        o.preventDefault(), e();
        return;
      }
      vp(o);
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
      const i = n();
      if (i.type === "IDLE" && k(!1), i.actions.shouldRespectForcePress()) {
        e();
        return;
      }
      o.preventDefault();
    }
  }, {
    eventName: ni,
    fn: e
  }];
}
function EC(e) {
  const t = z(Ml), n = z(Tt), r = K(() => ({
    eventName: "mousedown",
    fn: function(f) {
      if (f.defaultPrevented || f.button !== wp || f.ctrlKey || f.metaKey || f.shiftKey || f.altKey)
        return;
      const d = e.findClosestDraggableId(f);
      if (!d)
        return;
      const p = e.tryGetLock(d, s, {
        sourceEvent: f
      });
      if (!p)
        return;
      f.preventDefault();
      const m = {
        x: f.clientX,
        y: f.clientY
      };
      n.current(), l(p, m);
    }
  }), [e]), o = K(() => ({
    eventName: "webkitmouseforcewillbegin",
    fn: (u) => {
      if (u.defaultPrevented)
        return;
      const f = e.findClosestDraggableId(u);
      if (!f)
        return;
      const d = e.findOptionsForDraggable(f);
      d && (d.shouldRespectForcePress || e.canGetLock(f) && u.preventDefault());
    }
  }), [e]), i = V(function() {
    const f = {
      passive: !1,
      capture: !0
    };
    n.current = Ye(window, [o, r], f);
  }, [o, r]), s = V(() => {
    t.current.type !== "IDLE" && (t.current = Ml, n.current(), i());
  }, [i]), a = V(() => {
    const u = t.current;
    s(), u.type === "DRAGGING" && u.actions.cancel({
      shouldBlockNextClick: !0
    }), u.type === "PENDING" && u.actions.abort();
  }, [s]), c = V(function() {
    const f = {
      capture: !0,
      passive: !1
    }, d = CC({
      cancel: a,
      completed: s,
      getPhase: () => t.current,
      setPhase: (p) => {
        t.current = p;
      }
    });
    n.current = Ye(window, d, f);
  }, [a, s]), l = V(function(f, d) {
    t.current.type !== "IDLE" && k(!1), t.current = {
      type: "PENDING",
      point: d,
      actions: f
    }, c();
  }, [c]);
  Ve(function() {
    return i(), function() {
      n.current();
    };
  }, [i]);
}
function PC() {
}
const DC = {
  [pC]: !0,
  [fC]: !0,
  [gC]: !0,
  [mC]: !0
};
function RC(e, t) {
  function n() {
    t(), e.cancel();
  }
  function r() {
    t(), e.drop();
  }
  return [{
    eventName: "keydown",
    fn: (o) => {
      if (o.keyCode === Ja) {
        o.preventDefault(), n();
        return;
      }
      if (o.keyCode === yp) {
        o.preventDefault(), r();
        return;
      }
      if (o.keyCode === vC) {
        o.preventDefault(), e.moveDown();
        return;
      }
      if (o.keyCode === bC) {
        o.preventDefault(), e.moveUp();
        return;
      }
      if (o.keyCode === yC) {
        o.preventDefault(), e.moveRight();
        return;
      }
      if (o.keyCode === hC) {
        o.preventDefault(), e.moveLeft();
        return;
      }
      if (DC[o.keyCode]) {
        o.preventDefault();
        return;
      }
      vp(o);
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
    eventName: ni,
    fn: n
  }];
}
function IC(e) {
  const t = z(PC), n = K(() => ({
    eventName: "keydown",
    fn: function(i) {
      if (i.defaultPrevented || i.keyCode !== yp)
        return;
      const s = e.findClosestDraggableId(i);
      if (!s)
        return;
      const a = e.tryGetLock(s, u, {
        sourceEvent: i
      });
      if (!a)
        return;
      i.preventDefault();
      let c = !0;
      const l = a.snapLift();
      t.current();
      function u() {
        c || k(!1), c = !1, t.current(), r();
      }
      t.current = Ye(window, RC(l, u), {
        capture: !0,
        passive: !1
      });
    }
  }), [e]), r = V(function() {
    const i = {
      passive: !1,
      capture: !0
    };
    t.current = Ye(window, [n], i);
  }, [n]);
  Ve(function() {
    return r(), function() {
      t.current();
    };
  }, [r]);
}
const Li = {
  type: "IDLE"
}, AC = 120, OC = 0.15;
function NC({
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
      n.keyCode === Ja && n.preventDefault(), e();
    }
  }, {
    eventName: ni,
    fn: e
  }];
}
function $C({
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
        clientX: i,
        clientY: s
      } = r.touches[0], a = {
        x: i,
        y: s
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
      const i = r.touches[0];
      if (!i || !(i.force >= OC))
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
    eventName: ni,
    fn: e
  }];
}
function TC(e) {
  const t = z(Li), n = z(Tt), r = V(function() {
    return t.current;
  }, []), o = V(function(p) {
    t.current = p;
  }, []), i = K(() => ({
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
        clientY: y
      } = h, b = {
        x: w,
        y
      };
      n.current(), f(g, b);
    }
  }), [e]), s = V(function() {
    const p = {
      capture: !0,
      passive: !1
    };
    n.current = Ye(window, [i], p);
  }, [i]), a = V(() => {
    const d = t.current;
    d.type !== "IDLE" && (d.type === "PENDING" && clearTimeout(d.longPressTimerId), o(Li), n.current(), s());
  }, [s, o]), c = V(() => {
    const d = t.current;
    a(), d.type === "DRAGGING" && d.actions.cancel({
      shouldBlockNextClick: !0
    }), d.type === "PENDING" && d.actions.abort();
  }, [a]), l = V(function() {
    const p = {
      capture: !0,
      passive: !1
    }, m = {
      cancel: c,
      completed: a,
      getPhase: r
    }, g = Ye(window, $C(m), p), h = Ye(window, NC(m), p);
    n.current = function() {
      g(), h();
    };
  }, [c, r, a]), u = V(function() {
    const p = r();
    p.type !== "PENDING" && k(!1);
    const m = p.actions.fluidLift(p.point);
    o({
      type: "DRAGGING",
      actions: m,
      hasMoved: !1
    });
  }, [r, o]), f = V(function(p, m) {
    r().type !== "IDLE" && k(!1);
    const g = setTimeout(u, AC);
    o({
      type: "PENDING",
      point: m,
      actions: p,
      longPressTimerId: g
    }), l();
  }, [l, r, o, u]);
  Ve(function() {
    return s(), function() {
      n.current();
      const m = r();
      m.type === "PENDING" && (clearTimeout(m.longPressTimerId), o(Li));
    };
  }, [r, s, o]), Ve(function() {
    return Ye(window, [{
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
const LC = ["input", "button", "textarea", "select", "option", "optgroup", "video", "audio"];
function xp(e, t) {
  if (t == null)
    return !1;
  if (LC.includes(t.tagName.toLowerCase()))
    return !0;
  const r = t.getAttribute("contenteditable");
  return r === "true" || r === "" ? !0 : t === e ? !1 : xp(e, t.parentElement);
}
function MC(e, t) {
  const n = t.target;
  return ei(n) ? xp(e, n) : !1;
}
var _C = (e) => at(e.getBoundingClientRect()).center;
function kC(e) {
  return e instanceof gp(e).Element;
}
const FC = (() => {
  const e = "matches";
  return typeof document > "u" ? e : [e, "msMatchesSelector", "webkitMatchesSelector"].find((r) => r in Element.prototype) || e;
})();
function Sp(e, t) {
  return e == null ? null : e[FC](t) ? e : Sp(e.parentElement, t);
}
function BC(e, t) {
  return e.closest ? e.closest(t) : Sp(e, t);
}
function jC(e) {
  return `[${Sn.contextId}="${e}"]`;
}
function zC(e, t) {
  const n = t.target;
  if (!kC(n))
    return null;
  const r = jC(e), o = BC(n, r);
  return !o || !ei(o) ? null : o;
}
function VC(e, t) {
  const n = zC(e, t);
  return n ? n.getAttribute(Sn.draggableId) : null;
}
function WC(e, t) {
  const n = `[${cs.contextId}="${e}"]`, o = mp(document, n).find((i) => i.getAttribute(cs.id) === t);
  return !o || !ei(o) ? null : o;
}
function GC(e) {
  e.preventDefault();
}
function Sr({
  expected: e,
  phase: t,
  isLockActive: n,
  shouldWarn: r
}) {
  return !(!n() || e !== t);
}
function Cp({
  lockAPI: e,
  store: t,
  registry: n,
  draggableId: r
}) {
  if (e.isClaimed())
    return !1;
  const o = n.draggable.findById(r);
  return !(!o || !o.options.isEnabled || !up(t.getState(), r));
}
function HC({
  lockAPI: e,
  contextId: t,
  store: n,
  registry: r,
  draggableId: o,
  forceSensorStop: i,
  sourceEvent: s
}) {
  if (!Cp({
    lockAPI: e,
    store: n,
    registry: r,
    draggableId: o
  }))
    return null;
  const c = r.draggable.getById(o), l = WC(t, c.descriptor.id);
  if (!l || s && !c.options.canDragInteractiveElements && MC(l, s))
    return null;
  const u = e.claim(i || Tt);
  let f = "PRE_DRAG";
  function d() {
    return c.options.shouldRespectForcePress;
  }
  function p() {
    return e.isActive(u);
  }
  function m(S, C) {
    Sr({
      expected: S,
      phase: f,
      isLockActive: p,
      shouldWarn: !0
    }) && n.dispatch(C());
  }
  const g = m.bind(null, "DRAGGING");
  function h(S) {
    function C() {
      e.release(), f = "COMPLETED";
    }
    f !== "PRE_DRAG" && (C(), k(!1)), n.dispatch(AS(S.liftActionArgs)), f = "DRAGGING";
    function P(E, O = {
      shouldBlockNextClick: !1
    }) {
      if (S.cleanup(), O.shouldBlockNextClick) {
        const T = Ye(window, [{
          eventName: "click",
          fn: GC,
          options: {
            once: !0,
            passive: !1,
            capture: !0
          }
        }]);
        setTimeout(T);
      }
      C(), n.dispatch(np({
        reason: E
      }));
    }
    return {
      isActive: () => Sr({
        expected: "DRAGGING",
        phase: f,
        isLockActive: p,
        shouldWarn: !1
      }),
      shouldRespectForcePress: d,
      drop: (E) => P("DROP", E),
      cancel: (E) => P("CANCEL", E),
      ...S.actions
    };
  }
  function w(S) {
    const C = qn((E) => {
      g(() => tp({
        client: E
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
  function y() {
    const S = {
      moveUp: () => g(FS),
      moveRight: () => g(jS),
      moveDown: () => g(BS),
      moveLeft: () => g(zS)
    };
    return h({
      liftActionArgs: {
        id: o,
        clientSelection: _C(l),
        movementMode: "SNAP"
      },
      cleanup: Tt,
      actions: S
    });
  }
  function b() {
    Sr({
      expected: "PRE_DRAG",
      phase: f,
      isLockActive: p,
      shouldWarn: !0
    }) && e.release();
  }
  return {
    isActive: () => Sr({
      expected: "PRE_DRAG",
      phase: f,
      isLockActive: p,
      shouldWarn: !1
    }),
    shouldRespectForcePress: d,
    fluidLift: w,
    snapLift: y,
    abort: b
  };
}
const UC = [EC, IC, TC];
function qC({
  contextId: e,
  store: t,
  registry: n,
  customSensors: r,
  enableDefaultSensors: o
}) {
  const i = [...o ? UC : [], ...r || []], s = U(() => lC())[0], a = V(function(h, w) {
    Zn(h) && !Zn(w) && s.tryAbandon();
  }, [s]);
  Ve(function() {
    let h = t.getState();
    return t.subscribe(() => {
      const y = t.getState();
      a(h, y), h = y;
    });
  }, [s, t, a]), Ve(() => s.tryAbandon, [s.tryAbandon]);
  const c = V((g) => Cp({
    lockAPI: s,
    registry: n,
    store: t,
    draggableId: g
  }), [s, n, t]), l = V((g, h, w) => HC({
    lockAPI: s,
    registry: n,
    contextId: e,
    store: t,
    draggableId: g,
    forceSensorStop: h || null,
    sourceEvent: w && w.sourceEvent ? w.sourceEvent : null
  }), [e, s, n, t]), u = V((g) => VC(e, g), [e]), f = V((g) => {
    const h = n.draggable.findById(g);
    return h ? h.options : null;
  }, [n.draggable]), d = V(function() {
    s.isClaimed() && (s.tryAbandon(), t.getState().phase !== "IDLE" && t.dispatch(Va()));
  }, [s, t]), p = V(() => s.isClaimed(), [s]), m = K(() => ({
    canGetLock: c,
    tryGetLock: l,
    findClosestDraggableId: u,
    findOptionsForDraggable: f,
    tryReleaseLock: d,
    isLockClaimed: p
  }), [c, l, u, f, d, p]);
  for (let g = 0; g < i.length; g++)
    i[g](m);
}
const KC = (e) => ({
  onBeforeCapture: (t) => {
    const n = () => {
      e.onBeforeCapture && e.onBeforeCapture(t);
    };
    x.version.startsWith("16") || x.version.startsWith("17") ? n() : ds(n);
  },
  onBeforeDragStart: e.onBeforeDragStart,
  onDragStart: e.onDragStart,
  onDragEnd: e.onDragEnd,
  onDragUpdate: e.onDragUpdate
}), YC = (e) => ({
  ...Qn,
  ...e.autoScrollerOptions,
  durationDampening: {
    ...Qn.durationDampening,
    ...e.autoScrollerOptions
  }
});
function Mn(e) {
  return e.current || k(!1), e.current;
}
function XC(e) {
  const {
    contextId: t,
    setCallbacks: n,
    sensors: r,
    nonce: o,
    dragHandleUsageInstructions: i
  } = e, s = z(null), a = bp(e), c = V(() => KC(a.current), [a]), l = V(() => YC(a.current), [a]), u = rC(t), f = cC({
    contextId: t,
    text: i
  }), d = Y1(t, o), p = V((T) => {
    Mn(s).dispatch(T);
  }, []), m = K(() => ml({
    publishWhileDragging: NS,
    updateDroppableScroll: TS,
    updateDroppableIsEnabled: LS,
    updateDroppableIsCombineEnabled: MS,
    collectionStarting: $S
  }, p), [p]), g = Z1(), h = K(() => D1(g, m), [g, m]), w = K(() => W1({
    scrollWindow: R1,
    scrollDroppable: h.scrollDroppable,
    getAutoScrollerOptions: l,
    ...ml({
      move: tp
    }, p)
  }), [h.scrollDroppable, p, l]), y = J1(t), b = K(() => S1({
    announce: u,
    autoScroller: w,
    dimensionMarshal: h,
    focusMarshal: y,
    getResponders: c,
    styleMarshal: d
  }), [u, w, h, y, c, d]);
  s.current = b;
  const v = V(() => {
    const T = Mn(s);
    T.getState().phase !== "IDLE" && T.dispatch(Va());
  }, []), S = V(() => {
    const T = Mn(s).getState();
    return T.phase === "DROP_ANIMATING" ? !0 : T.phase === "IDLE" ? !1 : T.isDragging;
  }, []), C = K(() => ({
    isDragging: S,
    tryAbort: v
  }), [S, v]);
  n(C);
  const P = V((T) => up(Mn(s).getState(), T), []), E = V(() => Jt(Mn(s).getState()), []), O = K(() => ({
    marshal: h,
    focus: y,
    contextId: t,
    canLift: P,
    isMovementAllowed: E,
    dragHandleUsageInstructionsId: f,
    registry: g
  }), [t, h, f, y, P, E, g]);
  return qC({
    contextId: t,
    store: b,
    registry: g,
    customSensors: r || null,
    enableDefaultSensors: e.enableDefaultSensors !== !1
  }), W(() => v, [v]), x.createElement(ti.Provider, {
    value: O
  }, x.createElement(sf, {
    context: Ya,
    store: b
  }, e.children));
}
let JC = 0;
function QC() {
  return K(() => `${JC++}`, []);
}
function ZC() {
  return x.useId();
}
var eE = "useId" in x ? ZC : QC;
function tE(e) {
  const t = eE(), n = e.dragHandleUsageInstructions || Or.dragHandleUsageInstructions;
  return x.createElement(bx, null, (r) => x.createElement(XC, {
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
const _l = {
  dragging: 5e3,
  dropAnimating: 4500
}, nE = (e, t) => t ? Bn.drop(t.duration) : e ? Bn.snap : Bn.fluid, rE = (e, t) => {
  if (e)
    return t ? Jn.opacity.drop : Jn.opacity.combining;
}, oE = (e) => e.forceShouldAnimate != null ? e.forceShouldAnimate : e.mode === "SNAP";
function iE(e) {
  const n = e.dimension.client, {
    offset: r,
    combineWith: o,
    dropping: i
  } = e, s = !!o, a = oE(e), c = !!i, l = c ? ss.drop(r, s) : ss.moveTo(r);
  return {
    position: "fixed",
    top: n.marginBox.top,
    left: n.marginBox.left,
    boxSizing: "border-box",
    width: n.borderBox.width,
    height: n.borderBox.height,
    transition: nE(a, i),
    transform: l,
    opacity: rE(s, c),
    zIndex: c ? _l.dropAnimating : _l.dragging,
    pointerEvents: "none"
  };
}
function sE(e) {
  return {
    transform: ss.moveTo(e.offset),
    transition: e.shouldAnimateDisplacement ? void 0 : "none"
  };
}
function aE(e) {
  return e.type === "DRAGGING" ? iE(e) : sE(e);
}
function cE(e, t, n = pe) {
  const r = window.getComputedStyle(t), o = t.getBoundingClientRect(), i = Of(o, r), s = Ur(i, n), a = {
    client: i,
    tagName: t.tagName.toLowerCase(),
    display: r.display
  }, c = {
    x: i.marginBox.width,
    y: i.marginBox.height
  };
  return {
    descriptor: e,
    placeholder: a,
    displaceBy: c,
    client: i,
    page: s
  };
}
function lE(e) {
  const t = Xa("draggable"), {
    descriptor: n,
    registry: r,
    getDraggableRef: o,
    canDragInteractiveElements: i,
    shouldRespectForcePress: s,
    isEnabled: a
  } = e, c = K(() => ({
    canDragInteractiveElements: i,
    shouldRespectForcePress: s,
    isEnabled: a
  }), [i, a, s]), l = V((p) => {
    const m = o();
    return m || k(!1), cE(n, m, p);
  }, [n, o]), u = K(() => ({
    uniqueId: t,
    descriptor: n,
    options: c,
    getDimension: l
  }), [n, l, c, t]), f = z(u), d = z(!0);
  Ve(() => (r.draggable.register(f.current), () => r.draggable.unregister(f.current)), [r.draggable]), Ve(() => {
    if (d.current) {
      d.current = !1;
      return;
    }
    const p = f.current;
    f.current = u, r.draggable.update(u, p);
  }, [u, r.draggable]);
}
var Qa = x.createContext(null);
function Jr(e) {
  const t = ut(e);
  return t || k(!1), t;
}
function uE(e) {
  e.preventDefault();
}
const dE = (e) => {
  const t = z(null), n = V((C = null) => {
    t.current = C;
  }, []), r = V(() => t.current, []), {
    contextId: o,
    dragHandleUsageInstructionsId: i,
    registry: s
  } = Jr(ti), {
    type: a,
    droppableId: c
  } = Jr(Qa), l = K(() => ({
    id: e.draggableId,
    index: e.index,
    type: a,
    droppableId: c
  }), [e.draggableId, e.index, a, c]), {
    children: u,
    draggableId: f,
    isEnabled: d,
    shouldRespectForcePress: p,
    canDragInteractiveElements: m,
    isClone: g,
    mapped: h,
    dropAnimationFinished: w
  } = e;
  if (!g) {
    const C = K(() => ({
      descriptor: l,
      registry: s,
      getDraggableRef: r,
      canDragInteractiveElements: m,
      shouldRespectForcePress: p,
      isEnabled: d
    }), [l, s, r, m, p, d]);
    lE(C);
  }
  const y = K(() => d ? {
    tabIndex: 0,
    role: "button",
    "aria-describedby": i,
    "data-rfd-drag-handle-draggable-id": f,
    "data-rfd-drag-handle-context-id": o,
    draggable: !1,
    onDragStart: uE
  } : null, [o, i, f, d]), b = V((C) => {
    h.type === "DRAGGING" && h.dropping && C.propertyName === "transform" && (x.version.startsWith("16") || x.version.startsWith("17") ? w() : ds(w));
  }, [w, h]), v = K(() => {
    const C = aE(h), P = h.type === "DRAGGING" && h.dropping ? b : void 0;
    return {
      innerRef: n,
      draggableProps: {
        "data-rfd-draggable-context-id": o,
        "data-rfd-draggable-id": f,
        style: C,
        onTransitionEnd: P
      },
      dragHandleProps: y
    };
  }, [o, y, f, h, b, n]), S = K(() => ({
    draggableId: l.id,
    type: l.type,
    source: {
      index: l.index,
      droppableId: l.droppableId
    }
  }), [l.droppableId, l.id, l.index, l.type]);
  return x.createElement(x.Fragment, null, u(v, h.snapshot, S));
};
var fE = dE, Ep = (e, t) => e === t, Pp = (e) => {
  const {
    combine: t,
    destination: n
  } = e;
  return n ? n.droppableId : t ? t.droppableId : null;
};
const pE = (e) => e.combine ? e.combine.draggableId : null, mE = (e) => e.at && e.at.type === "COMBINE" ? e.at.combine.draggableId : null;
function gE() {
  const e = de((o, i) => ({
    x: o,
    y: i
  })), t = de((o, i, s = null, a = null, c = null) => ({
    isDragging: !0,
    isClone: i,
    isDropAnimating: !!c,
    dropAnimation: c,
    mode: o,
    draggingOver: s,
    combineWith: a,
    combineTargetFor: null
  })), n = de((o, i, s, a, c = null, l = null, u = null) => ({
    mapped: {
      type: "DRAGGING",
      dropping: null,
      draggingOver: c,
      combineWith: l,
      mode: i,
      offset: o,
      dimension: s,
      forceShouldAnimate: u,
      snapshot: t(i, a, c, l, null)
    }
  }));
  return (o, i) => {
    if (Zn(o)) {
      if (o.critical.draggable.id !== i.draggableId)
        return null;
      const s = o.current.client.offset, a = o.dimensions.draggables[i.draggableId], c = ze(o.impact), l = mE(o.impact), u = o.forceShouldAnimate;
      return n(e(s.x, s.y), o.movementMode, a, i.isClone, c, l, u);
    }
    if (o.phase === "DROP_ANIMATING") {
      const s = o.completed;
      if (s.result.draggableId !== i.draggableId)
        return null;
      const a = i.isClone, c = o.dimensions.draggables[i.draggableId], l = s.result, u = l.mode, f = Pp(l), d = pE(l), m = {
        duration: o.dropDuration,
        curve: Ga.drop,
        moveTo: o.newHomeClientOffset,
        opacity: d ? Jn.opacity.drop : null,
        scale: d ? Jn.scale.drop : null
      };
      return {
        mapped: {
          type: "DRAGGING",
          offset: o.newHomeClientOffset,
          dimension: c,
          dropping: m,
          draggingOver: f,
          combineWith: d,
          mode: u,
          forceShouldAnimate: null,
          snapshot: t(u, a, f, d, m)
        }
      };
    }
    return null;
  };
}
function Dp(e = null) {
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
const hE = {
  mapped: {
    type: "SECONDARY",
    offset: pe,
    combineTargetFor: null,
    shouldAnimateDisplacement: !0,
    snapshot: Dp(null)
  }
};
function bE() {
  const e = de((s, a) => ({
    x: s,
    y: a
  })), t = de(Dp), n = de((s, a = null, c) => ({
    mapped: {
      type: "SECONDARY",
      offset: s,
      combineTargetFor: a,
      shouldAnimateDisplacement: c,
      snapshot: t(a)
    }
  })), r = (s) => s ? n(pe, s, !0) : null, o = (s, a, c, l) => {
    const u = c.displaced.visible[s], f = !!(l.inVirtualList && l.effected[s]), d = Jo(c), p = d && d.draggableId === s ? a : null;
    if (!u) {
      if (!f)
        return r(p);
      if (c.displaced.invisible[s])
        return null;
      const h = Dn(l.displacedBy.point), w = e(h.x, h.y);
      return n(w, p, !0);
    }
    if (f)
      return r(p);
    const m = c.displacedBy.point, g = e(m.x, m.y);
    return n(g, p, u.shouldAnimate);
  };
  return (s, a) => {
    if (Zn(s))
      return s.critical.draggable.id === a.draggableId ? null : o(a.draggableId, s.critical.draggable.id, s.impact, s.afterCritical);
    if (s.phase === "DROP_ANIMATING") {
      const c = s.completed;
      return c.result.draggableId === a.draggableId ? null : o(a.draggableId, c.result.draggableId, c.impact, c.afterCritical);
    }
    return null;
  };
}
const yE = () => {
  const e = gE(), t = bE();
  return (r, o) => e(r, o) || t(r, o) || hE;
}, vE = {
  dropAnimationFinished: rp
}, wE = of(yE, vE, null, {
  context: Ya,
  areStatePropsEqual: Ep
})(fE);
var xE = wE;
function Rp(e) {
  return Jr(Qa).isUsingCloneFor === e.draggableId && !e.isClone ? null : x.createElement(xE, e);
}
function SE(e) {
  const t = typeof e.isDragDisabled == "boolean" ? !e.isDragDisabled : !0, n = !!e.disableInteractiveElementBlocking, r = !!e.shouldRespectForcePress;
  return x.createElement(Rp, $t({}, e, {
    isClone: !1,
    isEnabled: t,
    canDragInteractiveElements: n,
    shouldRespectForcePress: r
  }));
}
const Ip = (e) => (t) => e === t, CE = Ip("scroll"), EE = Ip("auto"), kl = (e, t) => t(e.overflowX) || t(e.overflowY), PE = (e) => {
  const t = window.getComputedStyle(e), n = {
    overflowX: t.overflowX,
    overflowY: t.overflowY
  };
  return kl(n, CE) || kl(n, EE);
}, DE = () => !1, Ap = (e) => e == null ? null : e === document.body ? DE() ? e : null : e === document.documentElement ? null : PE(e) ? e : Ap(e.parentElement);
var RE = Ap, ls = (e) => ({
  x: e.scrollLeft,
  y: e.scrollTop
});
const Op = (e) => e ? window.getComputedStyle(e).position === "fixed" ? !0 : Op(e.parentElement) : !1;
var IE = (e) => {
  const t = RE(e), n = Op(e);
  return {
    closestScrollable: t,
    isFixedOnPage: n
  };
}, AE = ({
  descriptor: e,
  isEnabled: t,
  isCombineEnabled: n,
  isFixedOnPage: r,
  direction: o,
  client: i,
  page: s,
  closest: a
}) => {
  const c = (() => {
    if (!a)
      return null;
    const {
      scrollSize: d,
      client: p
    } = a, m = ap({
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
          value: pe,
          displacement: pe
        }
      }
    };
  })(), l = o === "vertical" ? ka : jf, u = wn({
    page: s,
    withPlaceholder: null,
    axis: l,
    frame: c
  });
  return {
    descriptor: e,
    isCombineEnabled: n,
    isFixedOnPage: r,
    axis: l,
    isEnabled: t,
    client: i,
    page: s,
    frame: c,
    subject: u
  };
};
const OE = (e, t) => {
  const n = Nf(e);
  if (!t || e !== t)
    return n;
  const r = n.paddingBox.top - t.scrollTop, o = n.paddingBox.left - t.scrollLeft, i = r + t.scrollHeight, s = o + t.scrollWidth, c = Ta({
    top: r,
    right: s,
    bottom: i,
    left: o
  }, n.border);
  return La({
    borderBox: c,
    margin: n.margin,
    border: n.border,
    padding: n.padding
  });
};
var NE = ({
  ref: e,
  descriptor: t,
  env: n,
  windowScroll: r,
  direction: o,
  isDropDisabled: i,
  isCombineEnabled: s,
  shouldClipSubject: a
}) => {
  const c = n.closestScrollable, l = OE(e, c), u = Ur(l, r), f = (() => {
    if (!c)
      return null;
    const p = Nf(c), m = {
      scrollHeight: c.scrollHeight,
      scrollWidth: c.scrollWidth
    };
    return {
      client: p,
      page: Ur(p, r),
      scroll: ls(c),
      scrollSize: m,
      shouldClipSubject: a
    };
  })();
  return AE({
    descriptor: t,
    isEnabled: !i,
    isCombineEnabled: s,
    isFixedOnPage: n.isFixedOnPage,
    direction: o,
    client: l,
    page: u,
    closest: f
  });
};
const $E = {
  passive: !1
}, TE = {
  passive: !0
};
var Fl = (e) => e.shouldPublishImmediately ? $E : TE;
const Cr = (e) => e && e.env.closestScrollable || null;
function LE(e) {
  const t = z(null), n = Jr(ti), r = Xa("droppable"), {
    registry: o,
    marshal: i
  } = n, s = bp(e), a = K(() => ({
    id: e.droppableId,
    type: e.type,
    mode: e.mode
  }), [e.droppableId, e.mode, e.type]), c = z(a), l = K(() => de((v, S) => {
    t.current || k(!1);
    const C = {
      x: v,
      y: S
    };
    i.updateDroppableScroll(a.id, C);
  }), [a.id, i]), u = V(() => {
    const v = t.current;
    return !v || !v.env.closestScrollable ? pe : ls(v.env.closestScrollable);
  }, []), f = V(() => {
    const v = u();
    l(v.x, v.y);
  }, [u, l]), d = K(() => qn(f), [f]), p = V(() => {
    const v = t.current, S = Cr(v);
    if (v && S || k(!1), v.scrollOptions.shouldPublishImmediately) {
      f();
      return;
    }
    d();
  }, [d, f]), m = V((v, S) => {
    t.current && k(!1);
    const C = s.current, P = C.getDroppableRef();
    P || k(!1);
    const E = IE(P), O = {
      ref: P,
      descriptor: a,
      env: E,
      scrollOptions: S
    };
    t.current = O;
    const T = NE({
      ref: P,
      descriptor: a,
      env: E,
      windowScroll: v,
      direction: C.direction,
      isDropDisabled: C.isDropDisabled,
      isCombineEnabled: C.isCombineEnabled,
      shouldClipSubject: !C.ignoreContainerClipping
    }), $ = E.closestScrollable;
    return $ && ($.setAttribute($l.contextId, n.contextId), $.addEventListener("scroll", p, Fl(O.scrollOptions))), T;
  }, [n.contextId, a, p, s]), g = V(() => {
    const v = t.current, S = Cr(v);
    return v && S || k(!1), ls(S);
  }, []), h = V(() => {
    const v = t.current;
    v || k(!1);
    const S = Cr(v);
    t.current = null, S && (d.cancel(), S.removeAttribute($l.contextId), S.removeEventListener("scroll", p, Fl(v.scrollOptions)));
  }, [p, d]), w = V((v) => {
    const S = t.current;
    S || k(!1);
    const C = Cr(S);
    C || k(!1), C.scrollTop += v.y, C.scrollLeft += v.x;
  }, []), y = K(() => ({
    getDimensionAndWatchScroll: m,
    getScrollWhileDragging: g,
    dragStopped: h,
    scroll: w
  }), [h, m, g, w]), b = K(() => ({
    uniqueId: r,
    descriptor: a,
    callbacks: y
  }), [y, a, r]);
  Ve(() => (c.current = b.descriptor, o.droppable.register(b), () => {
    t.current && h(), o.droppable.unregister(b);
  }), [y, a, h, b, i, o.droppable]), Ve(() => {
    t.current && i.updateDroppableIsEnabled(c.current.id, !e.isDropDisabled);
  }, [e.isDropDisabled, i]), Ve(() => {
    t.current && i.updateDroppableIsCombineEnabled(c.current.id, e.isCombineEnabled);
  }, [e.isCombineEnabled, i]);
}
function Mi() {
}
const Bl = {
  width: 0,
  height: 0,
  margin: Ex
}, ME = ({
  isAnimatingOpenOnMount: e,
  placeholder: t,
  animate: n
}) => e || n === "close" ? Bl : {
  height: t.client.borderBox.height,
  width: t.client.borderBox.width,
  margin: t.client.margin
}, _E = ({
  isAnimatingOpenOnMount: e,
  placeholder: t,
  animate: n
}) => {
  const r = ME({
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
    transition: n !== "none" ? Bn.placeholder : null
  };
}, kE = (e) => {
  const t = z(null), n = V(() => {
    t.current && (clearTimeout(t.current), t.current = null);
  }, []), {
    animate: r,
    onTransitionEnd: o,
    onClose: i,
    contextId: s
  } = e, [a, c] = U(e.animate === "open");
  W(() => a ? r !== "open" ? (n(), c(!1), Mi) : t.current ? Mi : (t.current = setTimeout(() => {
    t.current = null, c(!1);
  }), n) : Mi, [r, a, n]);
  const l = V((f) => {
    f.propertyName === "height" && (o(), r === "close" && i());
  }, [r, i, o]), u = _E({
    isAnimatingOpenOnMount: a,
    animate: e.animate,
    placeholder: e.placeholder
  });
  return x.createElement(e.placeholder.tagName, {
    style: u,
    "data-rfd-placeholder-context-id": s,
    onTransitionEnd: l,
    ref: e.innerRef
  });
};
var FE = x.memo(kE);
class BE extends x.PureComponent {
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
const jE = (e) => {
  const t = ut(ti);
  t || k(!1);
  const {
    contextId: n,
    isMovementAllowed: r
  } = t, o = z(null), i = z(null), {
    children: s,
    droppableId: a,
    type: c,
    mode: l,
    direction: u,
    ignoreContainerClipping: f,
    isDropDisabled: d,
    isCombineEnabled: p,
    snapshot: m,
    useClone: g,
    updateViewportMaxScroll: h,
    getContainerForClone: w
  } = e, y = V(() => o.current, []), b = V(($ = null) => {
    o.current = $;
  }, []);
  V(() => i.current, []);
  const v = V(($ = null) => {
    i.current = $;
  }, []), S = V(() => {
    r() && h({
      maxScroll: lp()
    });
  }, [r, h]);
  LE({
    droppableId: a,
    type: c,
    mode: l,
    direction: u,
    isDropDisabled: d,
    isCombineEnabled: p,
    ignoreContainerClipping: f,
    getDroppableRef: y
  });
  const C = K(() => x.createElement(BE, {
    on: e.placeholder,
    shouldAnimate: e.shouldAnimatePlaceholder
  }, ({
    onClose: $,
    data: M,
    animate: _
  }) => x.createElement(FE, {
    placeholder: M,
    onClose: $,
    innerRef: v,
    animate: _,
    contextId: n,
    onTransitionEnd: S
  })), [n, S, e.placeholder, e.shouldAnimatePlaceholder, v]), P = K(() => ({
    innerRef: b,
    placeholder: C,
    droppableProps: {
      "data-rfd-droppable-id": a,
      "data-rfd-droppable-context-id": n
    }
  }), [n, a, C, b]), E = g ? g.dragging.draggableId : null, O = K(() => ({
    droppableId: a,
    type: c,
    isUsingCloneFor: E
  }), [a, E, c]);
  function T() {
    if (!g)
      return null;
    const {
      dragging: $,
      render: M
    } = g, _ = x.createElement(Rp, {
      draggableId: $.draggableId,
      index: $.source.index,
      isClone: !0,
      isEnabled: !0,
      shouldRespectForcePress: !1,
      canDragInteractiveElements: !0
    }, (A, L) => M(A, L, $));
    return tu.createPortal(_, w());
  }
  return x.createElement(Qa.Provider, {
    value: O
  }, s(P, m), T());
};
var zE = jE;
function VE() {
  return document.body || k(!1), document.body;
}
const jl = {
  mode: "standard",
  type: "DEFAULT",
  direction: "vertical",
  isDropDisabled: !1,
  isCombineEnabled: !1,
  ignoreContainerClipping: !1,
  renderClone: null,
  getContainerForClone: VE
}, Np = (e) => {
  let t = {
    ...e
  }, n;
  for (n in jl)
    e[n] === void 0 && (t = {
      ...t,
      [n]: jl[n]
    });
  return t;
}, _i = (e, t) => e === t.droppable.type, zl = (e, t) => t.draggables[e.draggable.id], WE = () => {
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
  }, n = de((i) => ({
    draggableId: i.id,
    type: i.type,
    source: {
      index: i.index,
      droppableId: i.droppableId
    }
  })), r = de((i, s, a, c, l, u) => {
    const f = l.descriptor.id;
    if (l.descriptor.droppableId === i) {
      const m = u ? {
        render: u,
        dragging: n(l.descriptor)
      } : null, g = {
        isDraggingOver: a,
        draggingOverWith: a ? f : null,
        draggingFromThisWith: f,
        isUsingPlaceholder: !0
      };
      return {
        placeholder: l.placeholder,
        shouldAnimatePlaceholder: !1,
        snapshot: g,
        useClone: m
      };
    }
    if (!s)
      return t;
    if (!c)
      return e;
    const p = {
      isDraggingOver: a,
      draggingOverWith: f,
      draggingFromThisWith: null,
      isUsingPlaceholder: !0
    };
    return {
      placeholder: l.placeholder,
      shouldAnimatePlaceholder: !0,
      snapshot: p,
      useClone: null
    };
  });
  return (i, s) => {
    const a = Np(s), c = a.droppableId, l = a.type, u = !a.isDropDisabled, f = a.renderClone;
    if (Zn(i)) {
      const d = i.critical;
      if (!_i(l, d))
        return t;
      const p = zl(d, i.dimensions), m = ze(i.impact) === c;
      return r(c, u, m, m, p, f);
    }
    if (i.phase === "DROP_ANIMATING") {
      const d = i.completed;
      if (!_i(l, d.critical))
        return t;
      const p = zl(d.critical, i.dimensions);
      return r(c, u, Pp(d.result) === c, ze(d.impact) === c, p, f);
    }
    if (i.phase === "IDLE" && i.completed && !i.shouldFlush) {
      const d = i.completed;
      if (!_i(l, d.critical))
        return t;
      const p = ze(d.impact) === c, m = !!(d.impact.at && d.impact.at.type === "COMBINE"), g = d.critical.droppable.id === c;
      return p ? m ? e : t : g ? e : t;
    }
    return t;
  };
}, GE = {
  updateViewportMaxScroll: kS
}, HE = of(WE, GE, (e, t, n) => ({
  ...Np(n),
  ...e,
  ...t
}), {
  context: Ya,
  areStatePropsEqual: Ep
})(zE);
var UE = HE, $p = { exports: {} }, qE = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED", KE = qE, YE = KE;
function Tp() {
}
function Lp() {
}
Lp.resetWarningCache = Tp;
var XE = function() {
  function e(r, o, i, s, a, c) {
    if (c !== YE) {
      var l = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      throw l.name = "Invariant Violation", l;
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
    checkPropTypes: Lp,
    resetWarningCache: Tp
  };
  return n.PropTypes = n, n;
};
$p.exports = XE();
var JE = $p.exports;
const Yt = /* @__PURE__ */ nu(JE);
var QE = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, ZE = Object.defineProperty, eP = Object.defineProperties, tP = Object.getOwnPropertyDescriptors, Qr = Object.getOwnPropertySymbols, Mp = Object.prototype.hasOwnProperty, _p = Object.prototype.propertyIsEnumerable, Vl = (e, t, n) => t in e ? ZE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Wl = (e, t) => {
  for (var n in t || (t = {}))
    Mp.call(t, n) && Vl(e, n, t[n]);
  if (Qr)
    for (var n of Qr(t))
      _p.call(t, n) && Vl(e, n, t[n]);
  return e;
}, nP = (e, t) => eP(e, tP(t)), rP = (e, t) => {
  var n = {};
  for (var r in e)
    Mp.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Qr)
    for (var r of Qr(e))
      t.indexOf(r) < 0 && _p.call(e, r) && (n[r] = e[r]);
  return n;
}, kp = (e, t, n) => {
  const r = ie(
    (o, i) => {
      var s = o, { color: a = "currentColor", size: c = 24, stroke: l = 2, children: u } = s, f = rP(s, ["color", "size", "stroke", "children"]);
      return ac(
        "svg",
        Wl(nP(Wl({
          ref: i
        }, QE), {
          width: c,
          height: c,
          stroke: a,
          strokeWidth: l,
          className: `tabler-icon tabler-icon-${e}`
        }), f),
        [...n.map(([d, p]) => ac(d, p)), ...u || []]
      );
    }
  );
  return r.propTypes = {
    color: Yt.string,
    size: Yt.oneOfType([Yt.string, Yt.number]),
    stroke: Yt.oneOfType([Yt.string, Yt.number])
  }, r.displayName = `${t}`, r;
}, oP = kp("grip-vertical", "IconGripVertical", [
  ["path", { d: "M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }],
  ["path", { d: "M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }],
  ["path", { d: "M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }],
  ["path", { d: "M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-3" }],
  ["path", { d: "M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-4" }],
  ["path", { d: "M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-5" }]
]), iP = kp("pencil", "IconPencil", [
  [
    "path",
    {
      d: "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",
      key: "svg-0"
    }
  ],
  ["path", { d: "M13.5 6.5l4 4", key: "svg-1" }]
]);
function Fp(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = Fp(e[t])) && (r && (r += " "), r += n);
    } else
      for (n in e)
        e[n] && (r && (r += " "), r += n);
  return r;
}
function sP() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = Fp(e)) && (r && (r += " "), r += t);
  return r;
}
const aP = "_item_1ca4j_1", cP = "_itemDragging_1ca4j_23", lP = "_symbol_1ca4j_31", uP = "_dragHandle_1ca4j_43", Er = {
  item: aP,
  itemDragging: cP,
  symbol: lP,
  dragHandle: uP
};
function dP({ id: e }) {
  const t = ur(), { t: n } = Ut(), r = ue((s) => s.settings.filterDictionaries), o = (s) => {
    if (!s.destination)
      return;
    const a = Array.from(r), [c] = a.splice(s.source.index, 1);
    a.splice(s.destination.index, 0, c), t($a(a));
  }, i = r.map((s, a) => /* @__PURE__ */ F.jsx(SE, { index: a, draggableId: s.dictionaryUri, children: (c, l) => /* @__PURE__ */ F.jsxs(
    "div",
    {
      className: sP(Er.item, { [Er.itemDragging]: l.isDragging }),
      ref: c.innerRef,
      ...c.draggableProps,
      children: [
        /* @__PURE__ */ F.jsx("div", { ...c.dragHandleProps, className: Er.dragHandle, children: /* @__PURE__ */ F.jsx(oP, { style: { width: D(18), height: D(18) }, stroke: 1.5 }) }),
        /* @__PURE__ */ F.jsx(Xe, { className: Er.uri, children: s.dictionaryName })
      ]
    }
  ) }, s.dictionaryUri));
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ F.jsxs(oe.Control, { children: [
      /* @__PURE__ */ F.jsx(Pn, { order: 5, children: n("Sort filter dictionaries") }),
      /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "dimmed", children: n("Sort filter dictionaries help text") })
    ] }),
    /* @__PURE__ */ F.jsx(oe.Panel, { children: /* @__PURE__ */ F.jsx(tE, { onDragEnd: o, children: /* @__PURE__ */ F.jsx(UE, { droppableId: "dnd-list", direction: "vertical", children: (s) => /* @__PURE__ */ F.jsxs("div", { ...s.droppableProps, ref: s.innerRef, children: [
      i,
      s.placeholder
    ] }) }) }) })
  ] }, e);
}
const fP = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function pP(e) {
  return typeof e == "string" && fP.test(e);
}
const he = [];
for (let e = 0; e < 256; ++e)
  he.push((e + 256).toString(16).slice(1));
function mP(e, t = 0) {
  return he[e[t + 0]] + he[e[t + 1]] + he[e[t + 2]] + he[e[t + 3]] + "-" + he[e[t + 4]] + he[e[t + 5]] + "-" + he[e[t + 6]] + he[e[t + 7]] + "-" + he[e[t + 8]] + he[e[t + 9]] + "-" + he[e[t + 10]] + he[e[t + 11]] + he[e[t + 12]] + he[e[t + 13]] + he[e[t + 14]] + he[e[t + 15]];
}
function gP(e) {
  if (!pP(e))
    throw TypeError("Invalid UUID");
  let t;
  const n = new Uint8Array(16);
  return n[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24, n[1] = t >>> 16 & 255, n[2] = t >>> 8 & 255, n[3] = t & 255, n[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8, n[5] = t & 255, n[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8, n[7] = t & 255, n[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8, n[9] = t & 255, n[10] = (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, n[11] = t / 4294967296 & 255, n[12] = t >>> 24 & 255, n[13] = t >>> 16 & 255, n[14] = t >>> 8 & 255, n[15] = t & 255, n;
}
function hP(e) {
  e = unescape(encodeURIComponent(e));
  const t = [];
  for (let n = 0; n < e.length; ++n)
    t.push(e.charCodeAt(n));
  return t;
}
const bP = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", yP = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function vP(e, t, n) {
  function r(o, i, s, a) {
    var c;
    if (typeof o == "string" && (o = hP(o)), typeof i == "string" && (i = gP(i)), ((c = i) === null || c === void 0 ? void 0 : c.length) !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    let l = new Uint8Array(16 + o.length);
    if (l.set(i), l.set(o, i.length), l = n(l), l[6] = l[6] & 15 | t, l[8] = l[8] & 63 | 128, s) {
      a = a || 0;
      for (let u = 0; u < 16; ++u)
        s[a + u] = l[u];
      return s;
    }
    return mP(l);
  }
  try {
    r.name = e;
  } catch {
  }
  return r.DNS = bP, r.URL = yP, r;
}
function wP(e, t, n, r) {
  switch (e) {
    case 0:
      return t & n ^ ~t & r;
    case 1:
      return t ^ n ^ r;
    case 2:
      return t & n ^ t & r ^ n & r;
    case 3:
      return t ^ n ^ r;
  }
}
function ki(e, t) {
  return e << t | e >>> 32 - t;
}
function xP(e) {
  const t = [1518500249, 1859775393, 2400959708, 3395469782], n = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof e == "string") {
    const s = unescape(encodeURIComponent(e));
    e = [];
    for (let a = 0; a < s.length; ++a)
      e.push(s.charCodeAt(a));
  } else
    Array.isArray(e) || (e = Array.prototype.slice.call(e));
  e.push(128);
  const r = e.length / 4 + 2, o = Math.ceil(r / 16), i = new Array(o);
  for (let s = 0; s < o; ++s) {
    const a = new Uint32Array(16);
    for (let c = 0; c < 16; ++c)
      a[c] = e[s * 64 + c * 4] << 24 | e[s * 64 + c * 4 + 1] << 16 | e[s * 64 + c * 4 + 2] << 8 | e[s * 64 + c * 4 + 3];
    i[s] = a;
  }
  i[o - 1][14] = (e.length - 1) * 8 / Math.pow(2, 32), i[o - 1][14] = Math.floor(i[o - 1][14]), i[o - 1][15] = (e.length - 1) * 8 & 4294967295;
  for (let s = 0; s < o; ++s) {
    const a = new Uint32Array(80);
    for (let p = 0; p < 16; ++p)
      a[p] = i[s][p];
    for (let p = 16; p < 80; ++p)
      a[p] = ki(a[p - 3] ^ a[p - 8] ^ a[p - 14] ^ a[p - 16], 1);
    let c = n[0], l = n[1], u = n[2], f = n[3], d = n[4];
    for (let p = 0; p < 80; ++p) {
      const m = Math.floor(p / 20), g = ki(c, 5) + wP(m, l, u, f) + d + t[m] + a[p] >>> 0;
      d = f, f = u, u = ki(l, 30) >>> 0, l = c, c = g;
    }
    n[0] = n[0] + c >>> 0, n[1] = n[1] + l >>> 0, n[2] = n[2] + u >>> 0, n[3] = n[3] + f >>> 0, n[4] = n[4] + d >>> 0;
  }
  return [n[0] >> 24 & 255, n[0] >> 16 & 255, n[0] >> 8 & 255, n[0] & 255, n[1] >> 24 & 255, n[1] >> 16 & 255, n[1] >> 8 & 255, n[1] & 255, n[2] >> 24 & 255, n[2] >> 16 & 255, n[2] >> 8 & 255, n[2] & 255, n[3] >> 24 & 255, n[3] >> 16 & 255, n[3] >> 8 & 255, n[3] & 255, n[4] >> 24 & 255, n[4] >> 16 & 255, n[4] >> 8 & 255, n[4] & 255];
}
const SP = vP("v5", 80, xP), CP = SP, EP = "b989028b-337b-417f-b917-c4e17384b8c5";
function PP(e) {
  return CP(e, EP);
}
function Gl(e, t) {
  const n = t.find((r) => r.dictionaryUri === e.uri);
  return n || {
    dictionaryUri: e.uri,
    dictionaryName: e.name,
    parameterName: `bsdd/${e.organizationCodeOwner}/${e.name}`.replace(/\s/g, "-"),
    parameterId: PP(e.uri),
    parameterMapping: ""
  };
}
function DP({ id: e }) {
  const t = ur(), { t: n } = Ut(), r = ue((d) => d.bsdd.dictionaries), o = ue((d) => d.settings.filterDictionaries), i = ue((d) => d.settings.mainDictionary), [s, a] = U([]), [c, l] = U([]);
  W(() => {
    a(r.map((d) => ({ value: d.uri, label: d.name })));
  }, [r, a]), W(() => {
    l(
      o.map((d) => ({ value: d.dictionaryUri, label: d.dictionaryName }))
    );
  }, [o, l]);
  const u = (d) => {
    console.log(d), console.log(s);
    const p = r.find((m) => m.uri === d);
    if (p) {
      const m = [];
      i && m.push(i), t(Df(Gl(p, m)));
    }
  }, f = (d) => {
    console.log(d);
    const p = r.filter((m) => d.includes(m.uri)).map((m) => Gl(m, o));
    console.log(o), console.log(p), t($a(p)), console.log(o);
  };
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ F.jsxs(oe.Control, { children: [
      /* @__PURE__ */ F.jsx(Pn, { order: 5, children: n("Dictionary selection") }),
      /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "dimmed", children: n("Dictionary selection help text") })
    ] }),
    /* @__PURE__ */ F.jsxs(oe.Panel, { children: [
      /* @__PURE__ */ F.jsx(
        cr,
        {
          id: "mainDictionary",
          label: n("Main dictionary"),
          value: i == null ? void 0 : i.dictionaryUri,
          onChange: u,
          placeholder: "Select main dictionary",
          data: s,
          searchable: !0,
          clearable: !0
        }
      ),
      /* @__PURE__ */ F.jsx(da, { h: "xs" }),
      /* @__PURE__ */ F.jsx(
        la,
        {
          id: "filterDictionaries",
          label: n("Selection filter dictionaries"),
          value: c.map((d) => d.value),
          onChange: (d) => {
            console.log(d), f(d);
          },
          placeholder: "Select filter dictionaries",
          data: s,
          searchable: !0,
          clearable: !0,
          hidePickedOptions: !0
        }
      )
    ] })
  ] }, e);
}
const RP = () => {
  const { t: e, i18n: t } = Ut(), n = [
    { value: "en", label: "English" },
    { value: "nl", label: "Nederlands" }
  ], r = (o) => {
    o && t.changeLanguage(o);
  };
  return /* @__PURE__ */ F.jsx(cr, { label: e("Language"), data: n, value: t.language, onChange: r, placeholder: e("Select language") });
};
function IP({ id: e }) {
  const t = ur(), { t: n } = Ut(), r = ue((i) => i.settings.bddApiEnvironment), o = (i) => {
    i && t(Qw(i));
  };
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ F.jsxs(oe.Control, { children: [
      /* @__PURE__ */ F.jsx(Pn, { order: 5, children: n("General settings") }),
      /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "dimmed", children: n("General settings help text") })
    ] }),
    /* @__PURE__ */ F.jsxs(oe.Panel, { children: [
      /* @__PURE__ */ F.jsx(RP, {}),
      " ",
      /* @__PURE__ */ F.jsx(da, { h: "xs" }),
      /* @__PURE__ */ F.jsx(
        cr,
        {
          label: n("bSDD environment"),
          data: ["production", "test"],
          value: r,
          placeholder: "Select an option",
          onChange: o
        }
      )
    ] })
  ] }, e);
}
function AP({}) {
  const e = ue((o) => o.settings.mainDictionary), t = ue((o) => o.settings.filterDictionaries), n = ue((o) => o.settings.language), r = ue(Yo);
  return W(() => {
    if (!e)
      return;
    const o = {
      bsddApiEnvironment: r,
      mainDictionary: e,
      filterDictionaries: t,
      language: n
    };
    console.log("Save settings", o), bsddBridge.saveSettings(o);
  }, [r, e, t, n]), /* @__PURE__ */ F.jsx(st.Panel, { value: "settings", children: /* @__PURE__ */ F.jsxs(oe, { defaultValue: ["2"], multiple: !0, children: [
    /* @__PURE__ */ F.jsx(IP, { id: 1 }),
    /* @__PURE__ */ F.jsx(DP, { id: 2 }),
    /* @__PURE__ */ F.jsx(ex, { id: 3 }),
    /* @__PURE__ */ F.jsx(dP, { id: 4 })
  ] }) });
}
const OP = {
  ifcEntities: []
}, Bp = Oa({
  name: "ifcData",
  initialState: OP,
  reducers: {
    setIfcData: (e, t) => {
      e.ifcEntities = t.payload;
    }
  }
}), NP = (e) => e.ifcData.ifcEntities, { setIfcData: $P } = Bp.actions, TP = Bp.reducer;
class LP {
  constructor(t = {}) {
    Re(this, "baseUrl", "https://api.bsdd.buildingsmart.org/");
    Re(this, "securityData", null);
    Re(this, "securityWorker");
    Re(this, "abortControllers", /* @__PURE__ */ new Map());
    Re(this, "customFetch", (...t) => fetch(...t));
    Re(this, "baseApiParams", {
      credentials: "same-origin",
      headers: {},
      redirect: "follow",
      referrerPolicy: "no-referrer"
    });
    Re(this, "setSecurityData", (t) => {
      this.securityData = t;
    });
    Re(this, "contentFormatters", {
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
    Re(this, "createAbortSignal", (t) => {
      if (this.abortControllers.has(t)) {
        const r = this.abortControllers.get(t);
        return r ? r.signal : void 0;
      }
      const n = new AbortController();
      return this.abortControllers.set(t, n), n.signal;
    });
    Re(this, "abortRequest", (t) => {
      const n = this.abortControllers.get(t);
      n && (n.abort(), this.abortControllers.delete(t));
    });
    Re(this, "request", async ({
      body: t,
      secure: n,
      path: r,
      type: o,
      query: i,
      format: s,
      baseUrl: a,
      cancelToken: c,
      ...l
    }) => {
      const u = (typeof n == "boolean" ? n : this.baseApiParams.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {}, f = this.mergeRequestParams(l, u), d = i && this.toQueryString(i), p = this.contentFormatters[
        o || "application/json"
        /* Json */
      ], m = s || f.format;
      return this.customFetch(`${a || this.baseUrl || ""}${r}${d ? `?${d}` : ""}`, {
        ...f,
        headers: {
          ...f.headers || {},
          ...o && o !== "multipart/form-data" ? { "Content-Type": o } : {}
        },
        signal: (c ? this.createAbortSignal(c) : f.signal) || null,
        body: typeof t > "u" || t === null ? null : p(t)
      }).then(async (g) => {
        const h = g;
        h.data = null, h.error = null;
        const w = m ? await g[m]().then((y) => (h.ok ? h.data = y : h.error = y, h)).catch((y) => (h.error = y, h)) : h;
        if (c && this.abortControllers.delete(c), !g.ok)
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
class MP extends LP {
  constructor() {
    super(...arguments);
    Re(this, "api", {
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
      dictionaryV1Update: (n, r, o, i, s = {}) => this.request({
        path: `/api/Dictionary/v1/${n}/${r}/${o}`,
        method: "PUT",
        body: i,
        secure: !0,
        type: "application/json",
        ...s
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
      dictionaryV1Delete: (n, r, o, i = {}) => this.request({
        path: `/api/Dictionary/v1/${n}/${r}/${o}`,
        method: "DELETE",
        secure: !0,
        ...i
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
      domainV3Update: (n, r, o, i, s = {}) => this.request({
        path: `/api/Domain/v3/${n}/${r}/${o}`,
        method: "PUT",
        body: i,
        secure: !0,
        type: "application/json",
        ...s
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
      domainV3Delete: (n, r, o, i = {}) => this.request({
        path: `/api/Domain/v3/${n}/${r}/${o}`,
        method: "DELETE",
        secure: !0,
        ...i
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
class Za extends MP {
  constructor(t) {
    super({ baseUrl: t });
  }
}
const _P = {
  dictionaries: []
}, kP = Oa({
  name: "bsdd",
  initialState: _P,
  reducers: {},
  extraReducers: (e) => {
    e.addCase(jp.fulfilled, (t, n) => {
      t.dictionaries = n.payload;
    });
  }
}), jp = $w(
  "bsdd/fetchDictionaries",
  async (e, t) => {
    if (console.log("fetching dictionaries1", e), !e)
      return t.rejectWithValue("No bsddApiEnvironment provided");
    const r = await new Za(e).api.dictionaryV1List();
    if (console.log("fetching dictionaries2", r), !r.ok)
      throw new Error(`HTTP error! status: ${r.status}`);
    if (r.data && r.data.dictionaries)
      return r.data.dictionaries;
    throw new Error(`bSDD API error! status: ${r.status}`);
  }
), FP = kP.reducer;
function BP(e) {
  const { type: t } = e;
  return t === "IfcClassificationReference";
}
function jP(e, t) {
  const n = t.referencedSource;
  return n && n.location ? n.location === e : !1;
}
function zP(e, t) {
  const n = e.hasAssociations;
  return n && n.find(
    (o) => BP(o) && jP(t.dictionaryUri, o)
  ) ? t.dictionaryUri : null;
}
const us = {
  red: "#FF0000",
  // bright red
  orange: "#FFA500",
  // bright orange
  green: "#00C853"
  // bright green
};
function VP({ item: e, bsddClass: t, index: n, setColor: r }) {
  const { t: o } = Ut(), i = ue(Pf), [s, a] = U("red"), [c, l] = U([]), [u, f] = U([]);
  W(() => {
    c.every((p) => p !== null) ? a("green") : c.some((p) => p !== null) ? a("orange") : a("red");
  }, [c]), W(() => {
    r(n, s);
  }, [s]), W(() => {
    const p = c.map((m) => m !== null ? "green" : "red");
    f(p);
  }, [c]), W(() => {
    l(
      i.map((p) => zP(e, p))
    );
  }, [e, i]);
  function d(p) {
    const m = JSON.stringify(p);
    bsddBridge.bsddSearch(m);
  }
  return /* @__PURE__ */ F.jsxs(jn, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
    /* @__PURE__ */ F.jsx(zn, { size: "1.5em", color: us[s] }),
    /* @__PURE__ */ F.jsxs(en, { position: "bottom-end", shadow: "md", children: [
      /* @__PURE__ */ F.jsx(en.Target, { children: /* @__PURE__ */ F.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ F.jsx(Xe, { className: "truncate", children: e.name }) }) }),
      /* @__PURE__ */ F.jsxs(en.Dropdown, { children: [
        /* @__PURE__ */ F.jsx(Xe, { children: "Validation per class:" }),
        i.map((p, m) => (c[m], /* @__PURE__ */ F.jsxs(jn, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
          /* @__PURE__ */ F.jsx(zn, { size: "1em", color: us[u[m]] }),
          /* @__PURE__ */ F.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ F.jsx(Xe, { className: "truncate", children: p.dictionaryName }) })
        ] }, p.dictionaryUri)))
      ] })
    ] }),
    /* @__PURE__ */ F.jsx(ar, { label: o("Attach to type"), children: /* @__PURE__ */ F.jsx(bo, { radius: "xl", onClick: () => d(e), children: /* @__PURE__ */ F.jsx(iP, { size: 20 }) }) })
  ] });
}
function WP({ bsddEnvironmentName: e, category: t, opened: n, bbbr: r, items: o, index: i }) {
  const { t: s } = Ut(), [a, c] = U(), [l, u] = U("red"), [f, d] = U(new Array(o.length).fill("red")), p = ue(Yo);
  function m(h, w) {
    const y = [...f];
    y[h] = w, d(y);
  }
  W(() => {
    const h = g(t, r);
    if (h) {
      const w = h;
      new Za(p).api.classV1List({
        uri: w.uri,
        includeClassProperties: !0,
        includeChildClassReferences: !0,
        includeClassRelations: !0
      }).then((b) => {
        if (console.log("response", b), !b.ok)
          throw new Error(`HTTP error! status: ${b.status}`);
        b.data && c(b.data);
      }).catch((b) => {
        throw new Error(`bSDD API error! status: ${b}`);
      });
    }
  }, [t, r]), W(() => {
    f.includes("orange") || f.includes("red") && f.includes("green") ? u("orange") : f.every((h) => h === "red") ? u("red") : f.every((h) => h === "green") && u("green");
  }, [f, u]);
  function g(h, w) {
    let y;
    return w.filter((b) => {
      b.code === h && (y = b);
    }), y || !1;
  }
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: i, children: [
    /* @__PURE__ */ F.jsx(oe.Control, { children: /* @__PURE__ */ F.jsxs(jn, { justify: "space-between", className: "flexGroup", children: [
      /* @__PURE__ */ F.jsx(zn, { size: "1.5em", color: us[l], children: /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "white", children: o.length }) }),
      /* @__PURE__ */ F.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ F.jsx(Xe, { className: "truncate", children: t.length > 0 ? t : s("No description") }) })
    ] }) }),
    /* @__PURE__ */ F.jsx(oe.Panel, { mt: "-xs", pl: "xl", children: o.map((h, w) => /* @__PURE__ */ F.jsx(
      VP,
      {
        item: h,
        bsddClass: a,
        index: w,
        setColor: m
      },
      w
    )) })
  ] }, t);
}
let GP;
function HP(e, t) {
  const n = e.reduce((r, o) => {
    const i = o[t];
    return i === void 0 || typeof i != "string" ? (r[""] || (r[""] = []), r[""].push(o)) : (r[i] || (r[i] = []), r[i].push(o)), r;
  }, {});
  return Object.keys(n).sort().reduce((r, o) => (r[o] = n[o], r), {});
}
function UP({}) {
  const e = ue((c) => c.settings.mainDictionary), t = ue(Yo), n = ue(NP), [r, o] = U({}), [i, s] = U([]);
  W(() => {
    (async () => {
      try {
      } catch (l) {
        console.error(l.message);
      }
    })();
  }, []), W(() => {
    if (!e)
      return;
    new Za(t).api.dictionaryV1ClassesList({ Uri: e.dictionaryUri }).then((l) => {
      if (!l.ok)
        throw new Error(`HTTP error! status: ${l.status}`);
      l.data && l.data.classes && s(l.data.classes);
    }).catch((l) => {
      throw new Error(`bSDD API error! status: ${l}`);
    });
  }, [e, t]);
  const a = HP(n, "description");
  return /* @__PURE__ */ F.jsx(st.Panel, { value: "koppelen", children: /* @__PURE__ */ F.jsx(oe, { chevronPosition: "left", children: Object.entries(a).map(([c, l], u) => /* @__PURE__ */ F.jsx(
    WP,
    {
      bsddEnvironmentName: t,
      category: c,
      items: l,
      opened: r,
      bbbr: i,
      index: c || u.toString()
    }
  )) }) });
}
function qP() {
  const e = ur(), { t } = Ut(), n = ue(Yo);
  return W(() => {
    console.log("bsddApiEnvironment changed"), n && e(jp(n));
  }, [n, e]), window.updateSelection = (r) => {
    const { settings: o, ifcData: i } = r;
    e(Jw(o)), e($P(i));
  }, /* @__PURE__ */ F.jsx(F.Fragment, { children: /* @__PURE__ */ F.jsx(ia, { size: "40rem", children: /* @__PURE__ */ F.jsxs(st, { defaultValue: "koppelen", children: [
    /* @__PURE__ */ F.jsxs(st.List, { grow: !0, children: [
      /* @__PURE__ */ F.jsx(st.Tab, { value: "koppelen", children: t("Link") }),
      /* @__PURE__ */ F.jsx(st.Tab, { value: "settings", children: t("Settings") })
    ] }),
    /* @__PURE__ */ F.jsx(UP, {}),
    /* @__PURE__ */ F.jsx(AP, {})
  ] }) }) });
}
const KP = {
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
class Zr {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(t, n);
  }
  init(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = n.prefix || "i18next:", this.logger = t || KP, this.options = n, this.debug = n.debug;
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
    return new Zr(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new Zr(this.logger, t);
  }
}
var pt = new Zr();
class ri {
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
    this.observers[t] && [].concat(this.observers[t]).forEach((s) => {
      s(...r);
    }), this.observers["*"] && [].concat(this.observers["*"]).forEach((s) => {
      s.apply(s, [t, ...r]);
    });
  }
}
function _n() {
  let e, t;
  const n = new Promise((r, o) => {
    e = r, t = o;
  });
  return n.resolve = e, n.reject = t, n;
}
function Hl(e) {
  return e == null ? "" : "" + e;
}
function YP(e, t, n) {
  e.forEach((r) => {
    t[r] && (n[r] = t[r]);
  });
}
function ec(e, t, n) {
  function r(s) {
    return s && s.indexOf("###") > -1 ? s.replace(/###/g, ".") : s;
  }
  function o() {
    return !e || typeof e == "string";
  }
  const i = typeof t != "string" ? [].concat(t) : t.split(".");
  for (; i.length > 1; ) {
    if (o())
      return {};
    const s = r(i.shift());
    !e[s] && n && (e[s] = new n()), Object.prototype.hasOwnProperty.call(e, s) ? e = e[s] : e = {};
  }
  return o() ? {} : {
    obj: e,
    k: r(i.shift())
  };
}
function Ul(e, t, n) {
  const {
    obj: r,
    k: o
  } = ec(e, t, Object);
  r[o] = n;
}
function XP(e, t, n, r) {
  const {
    obj: o,
    k: i
  } = ec(e, t, Object);
  o[i] = o[i] || [], r && (o[i] = o[i].concat(n)), r || o[i].push(n);
}
function eo(e, t) {
  const {
    obj: n,
    k: r
  } = ec(e, t);
  if (n)
    return n[r];
}
function JP(e, t, n) {
  const r = eo(e, n);
  return r !== void 0 ? r : eo(t, n);
}
function zp(e, t, n) {
  for (const r in t)
    r !== "__proto__" && r !== "constructor" && (r in e ? typeof e[r] == "string" || e[r] instanceof String || typeof t[r] == "string" || t[r] instanceof String ? n && (e[r] = t[r]) : zp(e[r], t[r], n) : e[r] = t[r]);
  return e;
}
function dn(e) {
  return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var QP = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function ZP(e) {
  return typeof e == "string" ? e.replace(/[&<>"'\/]/g, (t) => QP[t]) : e;
}
const eD = [" ", ",", "?", "!", ";"];
function tD(e, t, n) {
  t = t || "", n = n || "";
  const r = eD.filter((s) => t.indexOf(s) < 0 && n.indexOf(s) < 0);
  if (r.length === 0)
    return !0;
  const o = new RegExp(`(${r.map((s) => s === "?" ? "\\?" : s).join("|")})`);
  let i = !o.test(e);
  if (!i) {
    const s = e.indexOf(n);
    s > 0 && !o.test(e.substring(0, s)) && (i = !0);
  }
  return i;
}
function to(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!e)
    return;
  if (e[t])
    return e[t];
  const r = t.split(n);
  let o = e;
  for (let i = 0; i < r.length; ++i) {
    if (!o || typeof o[r[i]] == "string" && i + 1 < r.length)
      return;
    if (o[r[i]] === void 0) {
      let s = 2, a = r.slice(i, i + s).join(n), c = o[a];
      for (; c === void 0 && r.length > i + s; )
        s++, a = r.slice(i, i + s).join(n), c = o[a];
      if (c === void 0)
        return;
      if (c === null)
        return null;
      if (t.endsWith(a)) {
        if (typeof c == "string")
          return c;
        if (a && typeof c[a] == "string")
          return c[a];
      }
      const l = r.slice(i + s).join(n);
      return l ? to(c, l, n) : void 0;
    }
    o = o[r[i]];
  }
  return o;
}
function no(e) {
  return e && e.indexOf("_") > 0 ? e.replace("_", "-") : e;
}
class ql extends ri {
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
    const i = o.keySeparator !== void 0 ? o.keySeparator : this.options.keySeparator, s = o.ignoreJSONStructure !== void 0 ? o.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let a = [t, n];
    r && typeof r != "string" && (a = a.concat(r)), r && typeof r == "string" && (a = a.concat(i ? r.split(i) : r)), t.indexOf(".") > -1 && (a = t.split("."));
    const c = eo(this.data, a);
    return c || !s || typeof r != "string" ? c : to(this.data && this.data[t] && this.data[t][n], r, i);
  }
  addResource(t, n, r, o) {
    let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const s = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator;
    let a = [t, n];
    r && (a = a.concat(s ? r.split(s) : r)), t.indexOf(".") > -1 && (a = t.split("."), o = n, n = a[1]), this.addNamespaces(n), Ul(this.data, a, o), i.silent || this.emit("added", t, n, r, o);
  }
  addResources(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const i in r)
      (typeof r[i] == "string" || Object.prototype.toString.apply(r[i]) === "[object Array]") && this.addResource(t, n, i, r[i], {
        silent: !0
      });
    o.silent || this.emit("added", t, n, r);
  }
  addResourceBundle(t, n, r, o, i) {
    let s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, a = [t, n];
    t.indexOf(".") > -1 && (a = t.split("."), o = r, r = n, n = a[1]), this.addNamespaces(n);
    let c = eo(this.data, a) || {};
    o ? zp(c, r, i) : c = {
      ...c,
      ...r
    }, Ul(this.data, a, c), s.silent || this.emit("added", t, n, r);
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
var Vp = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, t, n, r, o) {
    return e.forEach((i) => {
      this.processors[i] && (t = this.processors[i].process(t, n, r, o));
    }), t;
  }
};
const Kl = {};
class ro extends ri {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), YP(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = pt.create("translator");
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
    let i = n.ns || this.options.defaultNS || [];
    const s = r && t.indexOf(r) > -1, a = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !tD(t, r, o);
    if (s && !a) {
      const c = t.match(this.interpolator.nestingRegexp);
      if (c && c.length > 0)
        return {
          key: t,
          namespaces: i
        };
      const l = t.split(r);
      (r !== o || r === o && this.options.ns.indexOf(l[0]) > -1) && (i = l.shift()), t = l.join(o);
    }
    return typeof i == "string" && (i = [i]), {
      key: t,
      namespaces: i
    };
  }
  translate(t, n, r) {
    if (typeof n != "object" && this.options.overloadTranslationOptionHandler && (n = this.options.overloadTranslationOptionHandler(arguments)), typeof n == "object" && (n = {
      ...n
    }), n || (n = {}), t == null)
      return "";
    Array.isArray(t) || (t = [String(t)]);
    const o = n.returnDetails !== void 0 ? n.returnDetails : this.options.returnDetails, i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator, {
      key: s,
      namespaces: a
    } = this.extractFromKey(t[t.length - 1], n), c = a[a.length - 1], l = n.lng || this.language, u = n.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (l && l.toLowerCase() === "cimode") {
      if (u) {
        const v = n.nsSeparator || this.options.nsSeparator;
        return o ? {
          res: `${c}${v}${s}`,
          usedKey: s,
          exactUsedKey: s,
          usedLng: l,
          usedNS: c,
          usedParams: this.getUsedParamsDetails(n)
        } : `${c}${v}${s}`;
      }
      return o ? {
        res: s,
        usedKey: s,
        exactUsedKey: s,
        usedLng: l,
        usedNS: c,
        usedParams: this.getUsedParamsDetails(n)
      } : s;
    }
    const f = this.resolve(t, n);
    let d = f && f.res;
    const p = f && f.usedKey || s, m = f && f.exactUsedKey || s, g = Object.prototype.toString.apply(d), h = ["[object Number]", "[object Function]", "[object RegExp]"], w = n.joinArrays !== void 0 ? n.joinArrays : this.options.joinArrays, y = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (y && d && (typeof d != "string" && typeof d != "boolean" && typeof d != "number") && h.indexOf(g) < 0 && !(typeof w == "string" && g === "[object Array]")) {
      if (!n.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const v = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(p, d, {
          ...n,
          ns: a
        }) : `key '${s} (${this.language})' returned an object instead of string.`;
        return o ? (f.res = v, f.usedParams = this.getUsedParamsDetails(n), f) : v;
      }
      if (i) {
        const v = g === "[object Array]", S = v ? [] : {}, C = v ? m : p;
        for (const P in d)
          if (Object.prototype.hasOwnProperty.call(d, P)) {
            const E = `${C}${i}${P}`;
            S[P] = this.translate(E, {
              ...n,
              joinArrays: !1,
              ns: a
            }), S[P] === E && (S[P] = d[P]);
          }
        d = S;
      }
    } else if (y && typeof w == "string" && g === "[object Array]")
      d = d.join(w), d && (d = this.extendTranslation(d, t, n, r));
    else {
      let v = !1, S = !1;
      const C = n.count !== void 0 && typeof n.count != "string", P = ro.hasDefaultValue(n), E = C ? this.pluralResolver.getSuffix(l, n.count, n) : "", O = n.ordinal && C ? this.pluralResolver.getSuffix(l, n.count, {
        ordinal: !1
      }) : "", T = n[`defaultValue${E}`] || n[`defaultValue${O}`] || n.defaultValue;
      !this.isValidLookup(d) && P && (v = !0, d = T), this.isValidLookup(d) || (S = !0, d = s);
      const M = (n.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && S ? void 0 : d, _ = P && T !== d && this.options.updateMissing;
      if (S || v || _) {
        if (this.logger.log(_ ? "updateKey" : "missingKey", l, c, s, _ ? T : d), i) {
          const B = this.resolve(s, {
            ...n,
            keySeparator: !1
          });
          B && B.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let A = [];
        const L = this.languageUtils.getFallbackCodes(this.options.fallbackLng, n.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && L && L[0])
          for (let B = 0; B < L.length; B++)
            A.push(L[B]);
        else
          this.options.saveMissingTo === "all" ? A = this.languageUtils.toResolveHierarchy(n.lng || this.language) : A.push(n.lng || this.language);
        const I = (B, N, G) => {
          const X = P && G !== d ? G : M;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(B, c, N, X, _, n) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(B, c, N, X, _, n), this.emit("missingKey", B, c, N, d);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && C ? A.forEach((B) => {
          this.pluralResolver.getSuffixes(B, n).forEach((N) => {
            I([B], s + N, n[`defaultValue${N}`] || T);
          });
        }) : I(A, s, T));
      }
      d = this.extendTranslation(d, t, n, f, r), S && d === s && this.options.appendNamespaceToMissingKey && (d = `${c}:${s}`), (S || v) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? d = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${c}:${s}` : s, v ? d : void 0) : d = this.options.parseMissingKeyHandler(d));
    }
    return o ? (f.res = d, f.usedParams = this.getUsedParamsDetails(n), f) : d;
  }
  extendTranslation(t, n, r, o, i) {
    var s = this;
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
      const l = typeof t == "string" && (r && r.interpolation && r.interpolation.skipOnVariables !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let u;
      if (l) {
        const d = t.match(this.interpolator.nestingRegexp);
        u = d && d.length;
      }
      let f = r.replace && typeof r.replace != "string" ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (f = {
        ...this.options.interpolation.defaultVariables,
        ...f
      }), t = this.interpolator.interpolate(t, f, r.lng || this.language, r), l) {
        const d = t.match(this.interpolator.nestingRegexp), p = d && d.length;
        u < p && (r.nest = !1);
      }
      !r.lng && this.options.compatibilityAPI !== "v1" && o && o.res && (r.lng = o.usedLng), r.nest !== !1 && (t = this.interpolator.nest(t, function() {
        for (var d = arguments.length, p = new Array(d), m = 0; m < d; m++)
          p[m] = arguments[m];
        return i && i[0] === p[0] && !r.context ? (s.logger.warn(`It seems you are nesting recursively key: ${p[0]} in key: ${n[0]}`), null) : s.translate(...p, n);
      }, r)), r.interpolation && this.interpolator.reset();
    }
    const a = r.postProcess || this.options.postProcess, c = typeof a == "string" ? [a] : a;
    return t != null && c && c.length && r.applyPostProcessor !== !1 && (t = Vp.handle(c, t, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...o,
        usedParams: this.getUsedParamsDetails(r)
      },
      ...r
    } : r, this)), t;
  }
  resolve(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r, o, i, s, a;
    return typeof t == "string" && (t = [t]), t.forEach((c) => {
      if (this.isValidLookup(r))
        return;
      const l = this.extractFromKey(c, n), u = l.key;
      o = u;
      let f = l.namespaces;
      this.options.fallbackNS && (f = f.concat(this.options.fallbackNS));
      const d = n.count !== void 0 && typeof n.count != "string", p = d && !n.ordinal && n.count === 0 && this.pluralResolver.shouldUseIntlApi(), m = n.context !== void 0 && (typeof n.context == "string" || typeof n.context == "number") && n.context !== "", g = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      f.forEach((h) => {
        this.isValidLookup(r) || (a = h, !Kl[`${g[0]}-${h}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(a) && (Kl[`${g[0]}-${h}`] = !0, this.logger.warn(`key "${o}" for languages "${g.join(", ")}" won't get resolved as namespace "${a}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), g.forEach((w) => {
          if (this.isValidLookup(r))
            return;
          s = w;
          const y = [u];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(y, u, w, h, n);
          else {
            let v;
            d && (v = this.pluralResolver.getSuffix(w, n.count, n));
            const S = `${this.options.pluralSeparator}zero`, C = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (d && (y.push(u + v), n.ordinal && v.indexOf(C) === 0 && y.push(u + v.replace(C, this.options.pluralSeparator)), p && y.push(u + S)), m) {
              const P = `${u}${this.options.contextSeparator}${n.context}`;
              y.push(P), d && (y.push(P + v), n.ordinal && v.indexOf(C) === 0 && y.push(P + v.replace(C, this.options.pluralSeparator)), p && y.push(P + S));
            }
          }
          let b;
          for (; b = y.pop(); )
            this.isValidLookup(r) || (i = b, r = this.getResource(w, h, b, n));
        }));
      });
    }), {
      res: r,
      usedKey: o,
      exactUsedKey: i,
      usedLng: s,
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
      for (const i of n)
        delete o[i];
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
function Fi(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
class Yl {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = pt.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = no(t), !t || t.indexOf("-") < 0)
      return null;
    const n = t.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = no(t), !t || t.indexOf("-") < 0)
      return t;
    const n = t.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(t) {
    if (typeof t == "string" && t.indexOf("-") > -1) {
      const n = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let r = t.split("-");
      return this.options.lowerCaseLng ? r = r.map((o) => o.toLowerCase()) : r.length === 2 ? (r[0] = r[0].toLowerCase(), r[1] = r[1].toUpperCase(), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = Fi(r[1].toLowerCase()))) : r.length === 3 && (r[0] = r[0].toLowerCase(), r[1].length === 2 && (r[1] = r[1].toUpperCase()), r[0] !== "sgn" && r[2].length === 2 && (r[2] = r[2].toUpperCase()), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = Fi(r[1].toLowerCase())), n.indexOf(r[2].toLowerCase()) > -1 && (r[2] = Fi(r[2].toLowerCase()))), r.join("-");
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
      n = this.options.supportedLngs.find((i) => {
        if (i === o)
          return i;
        if (!(i.indexOf("-") < 0 && o.indexOf("-") < 0) && i.indexOf(o) === 0)
          return i;
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
    const r = this.getFallbackCodes(n || this.options.fallbackLng || [], t), o = [], i = (s) => {
      s && (this.isSupportedCode(s) ? o.push(s) : this.logger.warn(`rejecting language code not found in supportedLngs: ${s}`));
    };
    return typeof t == "string" && (t.indexOf("-") > -1 || t.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && i(this.formatLanguageCode(t)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && i(this.getScriptPartFromCode(t)), this.options.load !== "currentOnly" && i(this.getLanguagePartFromCode(t))) : typeof t == "string" && i(this.formatLanguageCode(t)), r.forEach((s) => {
      o.indexOf(s) < 0 && i(this.formatLanguageCode(s));
    }), o;
  }
}
let nD = [{
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
}], rD = {
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
const oD = ["v1", "v2", "v3"], iD = ["v4"], Xl = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function sD() {
  const e = {};
  return nD.forEach((t) => {
    t.lngs.forEach((n) => {
      e[n] = {
        numbers: t.nr,
        plurals: rD[t.fc]
      };
    });
  }), e;
}
class aD {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = t, this.options = n, this.logger = pt.create("pluralResolver"), (!this.options.compatibilityJSON || iD.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = sD();
  }
  addRule(t, n) {
    this.rules[t] = n;
  }
  getRule(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(no(t), {
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
    return r ? this.shouldUseIntlApi() ? r.resolvedOptions().pluralCategories.sort((o, i) => Xl[o] - Xl[i]).map((o) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${o}`) : r.numbers.map((o) => this.getSuffix(t, o, n)) : [];
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
    const i = () => this.options.prepend && o.toString() ? this.options.prepend + o.toString() : o.toString();
    return this.options.compatibilityJSON === "v1" ? o === 1 ? "" : typeof o == "number" ? `_plural_${o.toString()}` : i() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && t.numbers.length === 2 && t.numbers[0] === 1 ? i() : this.options.prepend && r.toString() ? this.options.prepend + r.toString() : r.toString();
  }
  shouldUseIntlApi() {
    return !oD.includes(this.options.compatibilityJSON);
  }
}
function Jl(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = JP(e, t, n);
  return !i && o && typeof n == "string" && (i = to(e, n, r), i === void 0 && (i = to(t, n, r))), i;
}
class cD {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = pt.create("interpolator"), this.options = t, this.format = t.interpolation && t.interpolation.format || ((n) => n), this.init(t);
  }
  init() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    t.interpolation || (t.interpolation = {
      escapeValue: !0
    });
    const n = t.interpolation;
    this.escape = n.escape !== void 0 ? n.escape : ZP, this.escapeValue = n.escapeValue !== void 0 ? n.escapeValue : !0, this.useRawValueToEscape = n.useRawValueToEscape !== void 0 ? n.useRawValueToEscape : !1, this.prefix = n.prefix ? dn(n.prefix) : n.prefixEscaped || "{{", this.suffix = n.suffix ? dn(n.suffix) : n.suffixEscaped || "}}", this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ",", this.unescapePrefix = n.unescapeSuffix ? "" : n.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : n.unescapeSuffix || "", this.nestingPrefix = n.nestingPrefix ? dn(n.nestingPrefix) : n.nestingPrefixEscaped || dn("$t("), this.nestingSuffix = n.nestingSuffix ? dn(n.nestingSuffix) : n.nestingSuffixEscaped || dn(")"), this.nestingOptionsSeparator = n.nestingOptionsSeparator ? n.nestingOptionsSeparator : n.nestingOptionsSeparator || ",", this.maxReplaces = n.maxReplaces ? n.maxReplaces : 1e3, this.alwaysFormat = n.alwaysFormat !== void 0 ? n.alwaysFormat : !1, this.resetRegExp();
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
    let i, s, a;
    const c = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function l(m) {
      return m.replace(/\$/g, "$$$$");
    }
    const u = (m) => {
      if (m.indexOf(this.formatSeparator) < 0) {
        const y = Jl(n, c, m, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(y, void 0, r, {
          ...o,
          ...n,
          interpolationkey: m
        }) : y;
      }
      const g = m.split(this.formatSeparator), h = g.shift().trim(), w = g.join(this.formatSeparator).trim();
      return this.format(Jl(n, c, h, this.options.keySeparator, this.options.ignoreJSONStructure), w, r, {
        ...o,
        ...n,
        interpolationkey: h
      });
    };
    this.resetRegExp();
    const f = o && o.missingInterpolationHandler || this.options.missingInterpolationHandler, d = o && o.interpolation && o.interpolation.skipOnVariables !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (m) => l(m)
    }, {
      regex: this.regexp,
      safeValue: (m) => this.escapeValue ? l(this.escape(m)) : l(m)
    }].forEach((m) => {
      for (a = 0; i = m.regex.exec(t); ) {
        const g = i[1].trim();
        if (s = u(g), s === void 0)
          if (typeof f == "function") {
            const w = f(t, i, o);
            s = typeof w == "string" ? w : "";
          } else if (o && Object.prototype.hasOwnProperty.call(o, g))
            s = "";
          else if (d) {
            s = i[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${g} for interpolating ${t}`), s = "";
        else
          typeof s != "string" && !this.useRawValueToEscape && (s = Hl(s));
        const h = m.safeValue(s);
        if (t = t.replace(i[0], h), d ? (m.regex.lastIndex += s.length, m.regex.lastIndex -= i[0].length) : m.regex.lastIndex = 0, a++, a >= this.maxReplaces)
          break;
      }
    }), t;
  }
  nest(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o, i, s;
    function a(c, l) {
      const u = this.nestingOptionsSeparator;
      if (c.indexOf(u) < 0)
        return c;
      const f = c.split(new RegExp(`${u}[ ]*{`));
      let d = `{${f[1]}`;
      c = f[0], d = this.interpolate(d, s);
      const p = d.match(/'/g), m = d.match(/"/g);
      (p && p.length % 2 === 0 && !m || m.length % 2 !== 0) && (d = d.replace(/'/g, '"'));
      try {
        s = JSON.parse(d), l && (s = {
          ...l,
          ...s
        });
      } catch (g) {
        return this.logger.warn(`failed parsing options string in nesting for key ${c}`, g), `${c}${u}${d}`;
      }
      return delete s.defaultValue, c;
    }
    for (; o = this.nestingRegexp.exec(t); ) {
      let c = [];
      s = {
        ...r
      }, s = s.replace && typeof s.replace != "string" ? s.replace : s, s.applyPostProcessor = !1, delete s.defaultValue;
      let l = !1;
      if (o[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(o[1])) {
        const u = o[1].split(this.formatSeparator).map((f) => f.trim());
        o[1] = u.shift(), c = u, l = !0;
      }
      if (i = n(a.call(this, o[1].trim(), s), s), i && o[0] === t && typeof i != "string")
        return i;
      typeof i != "string" && (i = Hl(i)), i || (this.logger.warn(`missed to resolve ${o[1]} for nesting ${t}`), i = ""), l && (i = c.reduce((u, f) => this.format(u, f, r.lng, {
        ...r,
        interpolationkey: o[1].trim()
      }), i.trim())), t = t.replace(o[0], i), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
function lD(e) {
  let t = e.toLowerCase().trim();
  const n = {};
  if (e.indexOf("(") > -1) {
    const r = e.split("(");
    t = r[0].toLowerCase().trim();
    const o = r[1].substring(0, r[1].length - 1);
    t === "currency" && o.indexOf(":") < 0 ? n.currency || (n.currency = o.trim()) : t === "relativetime" && o.indexOf(":") < 0 ? n.range || (n.range = o.trim()) : o.split(";").forEach((s) => {
      if (!s)
        return;
      const [a, ...c] = s.split(":"), l = c.join(":").trim().replace(/^'+|'+$/g, "");
      n[a.trim()] || (n[a.trim()] = l), l === "false" && (n[a.trim()] = !1), l === "true" && (n[a.trim()] = !0), isNaN(l) || (n[a.trim()] = parseInt(l, 10));
    });
  }
  return {
    formatName: t,
    formatOptions: n
  };
}
function fn(e) {
  const t = {};
  return function(r, o, i) {
    const s = o + JSON.stringify(i);
    let a = t[s];
    return a || (a = e(no(o), i), t[s] = a), a(r);
  };
}
class uD {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = pt.create("formatter"), this.options = t, this.formats = {
      number: fn((n, r) => {
        const o = new Intl.NumberFormat(n, {
          ...r
        });
        return (i) => o.format(i);
      }),
      currency: fn((n, r) => {
        const o = new Intl.NumberFormat(n, {
          ...r,
          style: "currency"
        });
        return (i) => o.format(i);
      }),
      datetime: fn((n, r) => {
        const o = new Intl.DateTimeFormat(n, {
          ...r
        });
        return (i) => o.format(i);
      }),
      relativetime: fn((n, r) => {
        const o = new Intl.RelativeTimeFormat(n, {
          ...r
        });
        return (i) => o.format(i, r.range || "day");
      }),
      list: fn((n, r) => {
        const o = new Intl.ListFormat(n, {
          ...r
        });
        return (i) => o.format(i);
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
    this.formats[t.toLowerCase().trim()] = fn(n);
  }
  format(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return n.split(this.formatSeparator).reduce((a, c) => {
      const {
        formatName: l,
        formatOptions: u
      } = lD(c);
      if (this.formats[l]) {
        let f = a;
        try {
          const d = o && o.formatParams && o.formatParams[o.interpolationkey] || {}, p = d.locale || d.lng || o.locale || o.lng || r;
          f = this.formats[l](a, p, {
            ...u,
            ...o,
            ...d
          });
        } catch (d) {
          this.logger.warn(d);
        }
        return f;
      } else
        this.logger.warn(`there was no format function for ${l}`);
      return a;
    }, t);
  }
}
function dD(e, t) {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
}
class fD extends ri {
  constructor(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = t, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = o, this.logger = pt.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = o.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = o.maxRetries >= 0 ? o.maxRetries : 5, this.retryTimeout = o.retryTimeout >= 1 ? o.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(r, o.backend, o);
  }
  queueLoad(t, n, r, o) {
    const i = {}, s = {}, a = {}, c = {};
    return t.forEach((l) => {
      let u = !0;
      n.forEach((f) => {
        const d = `${l}|${f}`;
        !r.reload && this.store.hasResourceBundle(l, f) ? this.state[d] = 2 : this.state[d] < 0 || (this.state[d] === 1 ? s[d] === void 0 && (s[d] = !0) : (this.state[d] = 1, u = !1, s[d] === void 0 && (s[d] = !0), i[d] === void 0 && (i[d] = !0), c[f] === void 0 && (c[f] = !0)));
      }), u || (a[l] = !0);
    }), (Object.keys(i).length || Object.keys(s).length) && this.queue.push({
      pending: s,
      pendingCount: Object.keys(s).length,
      loaded: {},
      errors: [],
      callback: o
    }), {
      toLoad: Object.keys(i),
      pending: Object.keys(s),
      toLoadLanguages: Object.keys(a),
      toLoadNamespaces: Object.keys(c)
    };
  }
  loaded(t, n, r) {
    const o = t.split("|"), i = o[0], s = o[1];
    n && this.emit("failedLoading", i, s, n), r && this.store.addResourceBundle(i, s, r), this.state[t] = n ? -1 : 2;
    const a = {};
    this.queue.forEach((c) => {
      XP(c.loaded, [i], s), dD(c, t), n && c.errors.push(n), c.pendingCount === 0 && !c.done && (Object.keys(c.loaded).forEach((l) => {
        a[l] || (a[l] = {});
        const u = c.loaded[l];
        u.length && u.forEach((f) => {
          a[l][f] === void 0 && (a[l][f] = !0);
        });
      }), c.done = !0, c.errors.length ? c.callback(c.errors) : c.callback());
    }), this.emit("loaded", a), this.queue = this.queue.filter((c) => !c.done);
  }
  read(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, s = arguments.length > 5 ? arguments[5] : void 0;
    if (!t.length)
      return s(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: t,
        ns: n,
        fcName: r,
        tried: o,
        wait: i,
        callback: s
      });
      return;
    }
    this.readingCalls++;
    const a = (l, u) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const f = this.waitingReads.shift();
        this.read(f.lng, f.ns, f.fcName, f.tried, f.wait, f.callback);
      }
      if (l && u && o < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, t, n, r, o + 1, i * 2, s);
        }, i);
        return;
      }
      s(l, u);
    }, c = this.backend[r].bind(this.backend);
    if (c.length === 2) {
      try {
        const l = c(t, n);
        l && typeof l.then == "function" ? l.then((u) => a(null, u)).catch(a) : a(null, l);
      } catch (l) {
        a(l);
      }
      return;
    }
    return c(t, n, a);
  }
  prepareLoading(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), o && o();
    typeof t == "string" && (t = this.languageUtils.toResolveHierarchy(t)), typeof n == "string" && (n = [n]);
    const i = this.queueLoad(t, n, r, o);
    if (!i.toLoad.length)
      return i.pending.length || o(), null;
    i.toLoad.forEach((s) => {
      this.loadOne(s);
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
    const r = t.split("|"), o = r[0], i = r[1];
    this.read(o, i, "read", void 0, void 0, (s, a) => {
      s && this.logger.warn(`${n}loading namespace ${i} for language ${o} failed`, s), !s && a && this.logger.log(`${n}loaded namespace ${i} for language ${o}`, a), this.loaded(t, s, a);
    });
  }
  saveMissing(t, n, r, o, i) {
    let s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(n)) {
      this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(r == null || r === "")) {
      if (this.backend && this.backend.create) {
        const c = {
          ...s,
          isUpdate: i
        }, l = this.backend.create.bind(this.backend);
        if (l.length < 6)
          try {
            let u;
            l.length === 5 ? u = l(t, n, r, o, c) : u = l(t, n, r, o), u && typeof u.then == "function" ? u.then((f) => a(null, f)).catch(a) : a(null, u);
          } catch (u) {
            a(u);
          }
        else
          l(t, n, r, o, a, c);
      }
      !t || !t[0] || this.store.addResource(t[0], n, r, o);
    }
  }
}
function Ql() {
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
function Zl(e) {
  return typeof e.ns == "string" && (e.ns = [e.ns]), typeof e.fallbackLng == "string" && (e.fallbackLng = [e.fallbackLng]), typeof e.fallbackNS == "string" && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e;
}
function Pr() {
}
function pD(e) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((n) => {
    typeof e[n] == "function" && (e[n] = e[n].bind(e));
  });
}
class er extends ri {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = Zl(t), this.services = {}, this.logger = pt, this.modules = {
      external: []
    }, pD(this), n && !this.isInitialized && !t.isClone) {
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
    const o = Ql();
    this.options = {
      ...o,
      ...this.options,
      ...Zl(n)
    }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = {
      ...o.interpolation,
      ...this.options.interpolation
    }), n.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = n.keySeparator), n.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = n.nsSeparator);
    function i(u) {
      return u ? typeof u == "function" ? new u() : u : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? pt.init(i(this.modules.logger), this.options) : pt.init(null, this.options);
      let u;
      this.modules.formatter ? u = this.modules.formatter : typeof Intl < "u" && (u = uD);
      const f = new Yl(this.options);
      this.store = new ql(this.options.resources, this.options);
      const d = this.services;
      d.logger = pt, d.resourceStore = this.store, d.languageUtils = f, d.pluralResolver = new aD(f, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), u && (!this.options.interpolation.format || this.options.interpolation.format === o.interpolation.format) && (d.formatter = i(u), d.formatter.init(d, this.options), this.options.interpolation.format = d.formatter.format.bind(d.formatter)), d.interpolator = new cD(this.options), d.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, d.backendConnector = new fD(i(this.modules.backend), d.resourceStore, d, this.options), d.backendConnector.on("*", function(p) {
        for (var m = arguments.length, g = new Array(m > 1 ? m - 1 : 0), h = 1; h < m; h++)
          g[h - 1] = arguments[h];
        t.emit(p, ...g);
      }), this.modules.languageDetector && (d.languageDetector = i(this.modules.languageDetector), d.languageDetector.init && d.languageDetector.init(d, this.options.detection, this.options)), this.modules.i18nFormat && (d.i18nFormat = i(this.modules.i18nFormat), d.i18nFormat.init && d.i18nFormat.init(this)), this.translator = new ro(this.services, this.options), this.translator.on("*", function(p) {
        for (var m = arguments.length, g = new Array(m > 1 ? m - 1 : 0), h = 1; h < m; h++)
          g[h - 1] = arguments[h];
        t.emit(p, ...g);
      }), this.modules.external.forEach((p) => {
        p.init && p.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, r || (r = Pr), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const u = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      u.length > 0 && u[0] !== "dev" && (this.options.lng = u[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((u) => {
      this[u] = function() {
        return t.store[u](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((u) => {
      this[u] = function() {
        return t.store[u](...arguments), t;
      };
    });
    const c = _n(), l = () => {
      const u = (f, d) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), c.resolve(d), r(f, d);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return u(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, u);
    };
    return this.options.resources || !this.options.initImmediate ? l() : setTimeout(l, 0), c;
  }
  loadResources(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Pr;
    const o = typeof t == "string" ? t : this.language;
    if (typeof t == "function" && (r = t), !this.options.resources || this.options.partialBundledLanguages) {
      if (o && o.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0))
        return r();
      const i = [], s = (a) => {
        if (!a || a === "cimode")
          return;
        this.services.languageUtils.toResolveHierarchy(a).forEach((l) => {
          l !== "cimode" && i.indexOf(l) < 0 && i.push(l);
        });
      };
      o ? s(o) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((c) => s(c)), this.options.preload && this.options.preload.forEach((a) => s(a)), this.services.backendConnector.load(i, this.options.ns, (a) => {
        !a && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), r(a);
      });
    } else
      r(null);
  }
  reloadResources(t, n, r) {
    const o = _n();
    return t || (t = this.languages), n || (n = this.options.ns), r || (r = Pr), this.services.backendConnector.reload(t, n, (i) => {
      o.resolve(), r(i);
    }), o;
  }
  use(t) {
    if (!t)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && Vp.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
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
    const o = _n();
    this.emit("languageChanging", t);
    const i = (c) => {
      this.language = c, this.languages = this.services.languageUtils.toResolveHierarchy(c), this.resolvedLanguage = void 0, this.setResolvedLanguage(c);
    }, s = (c, l) => {
      l ? (i(l), this.translator.changeLanguage(l), this.isLanguageChangingTo = void 0, this.emit("languageChanged", l), this.logger.log("languageChanged", l)) : this.isLanguageChangingTo = void 0, o.resolve(function() {
        return r.t(...arguments);
      }), n && n(c, function() {
        return r.t(...arguments);
      });
    }, a = (c) => {
      !t && !c && this.services.languageDetector && (c = []);
      const l = typeof c == "string" ? c : this.services.languageUtils.getBestMatchFromCodes(c);
      l && (this.language || i(l), this.translator.language || this.translator.changeLanguage(l), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(l)), this.loadResources(l, (u) => {
        s(u, l);
      });
    };
    return !t && this.services.languageDetector && !this.services.languageDetector.async ? a(this.services.languageDetector.detect()) : !t && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(a) : this.services.languageDetector.detect(a) : a(t), o;
  }
  getFixedT(t, n, r) {
    var o = this;
    const i = function(s, a) {
      let c;
      if (typeof a != "object") {
        for (var l = arguments.length, u = new Array(l > 2 ? l - 2 : 0), f = 2; f < l; f++)
          u[f - 2] = arguments[f];
        c = o.options.overloadTranslationOptionHandler([s, a].concat(u));
      } else
        c = {
          ...a
        };
      c.lng = c.lng || i.lng, c.lngs = c.lngs || i.lngs, c.ns = c.ns || i.ns, c.keyPrefix = c.keyPrefix || r || i.keyPrefix;
      const d = o.options.keySeparator || ".";
      let p;
      return c.keyPrefix && Array.isArray(s) ? p = s.map((m) => `${c.keyPrefix}${d}${m}`) : p = c.keyPrefix ? `${c.keyPrefix}${d}${s}` : s, o.t(p, c);
    };
    return typeof t == "string" ? i.lng = t : i.lngs = t, i.ns = n, i.keyPrefix = r, i;
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
    const r = n.lng || this.resolvedLanguage || this.languages[0], o = this.options ? this.options.fallbackLng : !1, i = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode")
      return !0;
    const s = (a, c) => {
      const l = this.services.backendConnector.state[`${a}|${c}`];
      return l === -1 || l === 2;
    };
    if (n.precheck) {
      const a = n.precheck(this, s);
      if (a !== void 0)
        return a;
    }
    return !!(this.hasResourceBundle(r, t) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || s(r, t) && (!o || s(i, t)));
  }
  loadNamespaces(t, n) {
    const r = _n();
    return this.options.ns ? (typeof t == "string" && (t = [t]), t.forEach((o) => {
      this.options.ns.indexOf(o) < 0 && this.options.ns.push(o);
    }), this.loadResources((o) => {
      r.resolve(), n && n(o);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(t, n) {
    const r = _n();
    typeof t == "string" && (t = [t]);
    const o = this.options.preload || [], i = t.filter((s) => o.indexOf(s) < 0);
    return i.length ? (this.options.preload = o.concat(i), this.loadResources((s) => {
      r.resolve(), n && n(s);
    }), r) : (n && n(), Promise.resolve());
  }
  dir(t) {
    if (t || (t = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !t)
      return "rtl";
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = this.services && this.services.languageUtils || new Yl(Ql());
    return n.indexOf(r.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    return new er(t, n);
  }
  cloneInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Pr;
    const r = t.forkResourceStore;
    r && delete t.forkResourceStore;
    const o = {
      ...this.options,
      ...t,
      isClone: !0
    }, i = new er(o);
    return (t.debug !== void 0 || t.prefix !== void 0) && (i.logger = i.logger.clone(t)), ["store", "services", "language"].forEach((a) => {
      i[a] = this[a];
    }), i.services = {
      ...this.services
    }, i.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, r && (i.store = new ql(this.store.data, o), i.services.resourceStore = i.store), i.translator = new ro(i.services, o), i.translator.on("*", function(a) {
      for (var c = arguments.length, l = new Array(c > 1 ? c - 1 : 0), u = 1; u < c; u++)
        l[u - 1] = arguments[u];
      i.emit(a, ...l);
    }), i.init(o, n), i.translator.options = o, i.translator.backendConnector.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, i;
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
const Ce = er.createInstance();
Ce.createInstance = er.createInstance;
Ce.createInstance;
Ce.dir;
Ce.init;
Ce.loadResources;
Ce.reloadResources;
Ce.use;
Ce.changeLanguage;
Ce.getFixedT;
Ce.t;
Ce.exists;
Ce.setDefaultNamespace;
Ce.hasLoadedNamespace;
Ce.loadNamespaces;
Ce.loadLanguages;
Ce.use(Iv).init({
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
        "Select objects": "Select objects",
        "Attach to type": "Attach to type",
        "General settings": "General settings",
        "Dictionary selection": "Dictionary selection",
        "General settings help text": "Set the language and the bSDD environment.",
        "Dictionary selection help text": "Select the main dictionary and the filter dictionaries to use for the selection of objects. The main dictionary is used to select the objects. The filter dictionaries are used to filter the selection of objects.",
        "Parameter mapping": "Parameter mapping",
        "Parameter mapping help text": "Define the Revit type parameter in which to store the selected classes for this dictionary.",
        "Sort filter dictionaries": "Sort filter dictionaries",
        "Sort filter dictionaries help text": "The dictionaries will be shown in this order anywhere in the application."
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
        "Select objects": "Selecteer objecten",
        "Attach to type": "Koppelen aan type",
        "General settings": "Algemene instellingen",
        "General settings help text": "Stel de taal en de bSDD omgeving in.",
        "Dictionary selection": "Domein selectie",
        "Dictionary selection help text": "Selecteer het hoofddomein en de filterdomeinen om te gebruiken voor de selectie van objecten. Het hoofddomein wordt gebruikt om de objecten te selecteren. De filterdomeinen worden gebruikt om de selectie van objecten te filteren.",
        "Parameter mapping": "Parameter mapping",
        "Parameter mapping help text": "Definieer de Revit type parameter waarin de geselecteerde object typen voor dit domein moeten worden opgeslagen.",
        "Sort filter dictionaries": "Sorteer filter domeinen",
        "Sort filter dictionaries help text": "De domeinen worden overal in de app in deze volgorde getoond."
      }
    }
  },
  lng: "nl",
  fallbackLng: "en",
  interpolation: {
    escapeValue: !1
  }
});
function mD() {
  return /* @__PURE__ */ F.jsx(Su, { theme: hv, children: /* @__PURE__ */ F.jsx(qP, {}) });
}
const gD = Ew({
  reducer: {
    settings: Zw,
    ifcData: TP,
    bsdd: FP
  }
});
Bi.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ F.jsx(x.StrictMode, { children: /* @__PURE__ */ F.jsx(sf, { store: gD, children: /* @__PURE__ */ F.jsx(mD, {}) }) })
);
