var im = Object.defineProperty;
var sm = (e, t, n) => t in e ? im(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Re = (e, t, n) => (sm(e, typeof t != "symbol" ? t + "" : t, n), n);
import * as R from "react";
import S, { createContext as on, useContext as ut, useRef as W, useEffect as V, useMemo as Or, useCallback as Q, useState as U, useLayoutEffect as oo, useId as nu, forwardRef as ie, cloneElement as sn, Children as am, useDebugValue as cm, createElement as ac } from "react";
import * as lm from "react-dom";
import ru, { flushSync as ds, createPortal as um, unstable_batchedUpdates as dm } from "react-dom";
function ou(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var iu = { exports: {} }, io = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fm = S, pm = Symbol.for("react.element"), mm = Symbol.for("react.fragment"), gm = Object.prototype.hasOwnProperty, hm = fm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, bm = { key: !0, ref: !0, __self: !0, __source: !0 };
function su(e, t, n) {
  var r, o = {}, i = null, s = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t)
    gm.call(t, r) && !bm.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      o[r] === void 0 && (o[r] = t[r]);
  return { $$typeof: pm, type: e, key: i, ref: s, props: o, _owner: hm.current };
}
io.Fragment = mm;
io.jsx = su;
io.jsxs = su;
iu.exports = io;
var M = iu.exports, Fi = {}, cc = ru;
Fi.createRoot = cc.createRoot, Fi.hydrateRoot = cc.hydrateRoot;
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
function ym(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function vm(e) {
  var t;
  return typeof e != "string" || !e.includes("var(--mantine-scale)") ? e : (t = e.match(/^calc\((.*?)\)$/)) == null ? void 0 : t[1].split("*")[0].trim();
}
function wm(e) {
  const t = vm(e);
  return typeof t == "number" ? t : typeof t == "string" ? t.includes("calc") || t.includes("var") ? t : t.includes("px") ? Number(t.replace("px", "")) : t.includes("rem") ? Number(t.replace("rem", "")) * 16 : t.includes("em") ? Number(t.replace("em", "")) * 16 : Number(t) : NaN;
}
function li(e) {
  return `calc(${e} * var(--mantine-scale))`;
}
function au(e, { shouldScale: t = !1 } = {}) {
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
const D = au("rem", { shouldScale: !0 }), lc = au("em");
function ps(e) {
  return Object.keys(e).reduce((t, n) => (e[n] !== void 0 && (t[n] = e[n]), t), {});
}
function cu(e) {
  return typeof e == "number" ? !0 : typeof e == "string" ? e.startsWith("calc(") || e.startsWith("var(") || e.includes(" ") && e.trim() !== "" ? !0 : /[0-9]/.test(e.trim().replace("-", "")[0]) : !1;
}
function zt(e) {
  return Array.isArray(e) || e === null ? !1 : typeof e == "object" ? e.type !== S.Fragment : !1;
}
function Vt(e) {
  const t = on(null);
  return [({ children: o, value: i }) => /* @__PURE__ */ S.createElement(t.Provider, { value: i }, o), () => {
    const o = ut(t);
    if (o === null)
      throw new Error(e);
    return o;
  }];
}
function ms(e = null) {
  const t = on(e);
  return [({ children: o, value: i }) => /* @__PURE__ */ S.createElement(t.Provider, { value: i }, o), () => ut(t)];
}
function Tr(e, t) {
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
function Sm(e, t, n) {
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
function xm(e, t, n) {
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
function Cm(e, t, n) {
  return ji(e, n) === ji(t, n);
}
function lu({
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
    ).filter((g) => Cm(a.currentTarget, g, e)), l = c.findIndex((g) => a.currentTarget === g), u = xm(l, c, r), f = Sm(l, c, r), d = i === "rtl" ? f : u, p = i === "rtl" ? u : f;
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
const Im = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function gs(e) {
  return Im[e];
}
const Em = () => {
};
function Dm(e, t = { active: !0 }) {
  return typeof e != "function" || !t.active ? t.onKeyDown || Em : (n) => {
    var r;
    n.key === "Escape" && (e(n), (r = t.onTrigger) == null || r.call(t));
  };
}
function fe(e, t = "size", n = !0) {
  if (e !== void 0)
    return cu(e) ? n ? D(e) : e : `var(--${t}-${e})`;
}
function uu(e) {
  return fe(e, "mantine-spacing");
}
function bt(e) {
  return e === void 0 ? "var(--mantine-radius-default)" : fe(e, "mantine-radius");
}
function gt(e) {
  return fe(e, "mantine-font-size");
}
function Rm(e) {
  return fe(e, "mantine-line-height", !1);
}
function Pm(e) {
  if (e)
    return fe(e, "mantine-shadow", !1);
}
function $r(e, t) {
  return (n) => {
    e == null || e(n), t == null || t(n);
  };
}
function du(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = du(e[t])) && (r && (r += " "), r += n);
    else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function yt() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = du(e)) && (r && (r += " "), r += t);
  return r;
}
const Am = {};
function Nm(e) {
  const t = {};
  return e.forEach((n) => {
    Object.entries(n).forEach(([r, o]) => {
      t[r] ? t[r] = yt(t[r], o) : t[r] = o;
    });
  }), t;
}
function so({ theme: e, classNames: t, props: n, stylesCtx: r }) {
  const i = (Array.isArray(t) ? t : [t]).map(
    (s) => typeof s == "function" ? s(e, n, r) : s || Am
  );
  return Nm(i);
}
function _r({ theme: e, styles: t, props: n, stylesCtx: r }) {
  return (Array.isArray(t) ? t : [t]).reduce((i, s) => typeof s == "function" ? { ...i, ...s(e, n, r) } : { ...i, ...s }, {});
}
function fu() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}
function Qt(e) {
  const t = W(e);
  return V(() => {
    t.current = e;
  }), Or(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function ao(e, t) {
  const n = Qt(e), r = W(0);
  return V(() => () => window.clearTimeout(r.current), []), Q(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
const uc = ["mousedown", "touchstart"];
function Om(e, t, n) {
  const r = W();
  return V(() => {
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
function Tm(e, t) {
  try {
    return e.addEventListener("change", t), () => e.removeEventListener("change", t);
  } catch {
    return e.addListener(t), () => e.removeListener(t);
  }
}
function $m(e, t) {
  return typeof t == "boolean" ? t : typeof window < "u" && "matchMedia" in window ? window.matchMedia(e).matches : !1;
}
function _m(e, t, { getInitialValueInEffect: n } = {
  getInitialValueInEffect: !0
}) {
  const [r, o] = U(
    n ? t : $m(e, t)
  ), i = W();
  return V(() => {
    if ("matchMedia" in window)
      return i.current = window.matchMedia(e), o(i.current.matches), Tm(i.current, (s) => o(s.matches));
  }, [e]), r;
}
const tr = typeof document < "u" ? oo : V;
function Lt(e, t) {
  const n = W(!1);
  V(
    () => () => {
      n.current = !1;
    },
    []
  ), V(() => {
    if (n.current)
      return e();
    n.current = !0;
  }, t);
}
function Lm({ opened: e, shouldReturnFocus: t = !0 }) {
  const n = W(), r = () => {
    var o;
    n.current && "focus" in n.current && typeof n.current.focus == "function" && ((o = n.current) == null || o.focus({ preventScroll: !0 }));
  };
  return Lt(() => {
    let o = -1;
    const i = (s) => {
      s.key === "Tab" && window.clearTimeout(o);
    };
    return document.addEventListener("keydown", i), e ? n.current = document.activeElement : t && (o = window.setTimeout(r, 10)), () => {
      window.clearTimeout(o), document.removeEventListener("keydown", i);
    };
  }, [e, t]), r;
}
function km(e, t = "body > :not(script)") {
  const n = fu(), r = Array.from(
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
const Bm = /input|select|textarea|button|object/, pu = "a, input, select, textarea, button, object, [tabindex]";
function Mm(e) {
  return e.style.display === "none";
}
function Fm(e) {
  if (e.getAttribute("aria-hidden") || e.getAttribute("hidden") || e.getAttribute("type") === "hidden")
    return !1;
  let n = e;
  for (; n && !(n === document.body || n.nodeType === 11); ) {
    if (Mm(n))
      return !1;
    n = n.parentNode;
  }
  return !0;
}
function mu(e) {
  let t = e.getAttribute("tabindex");
  return t === null && (t = void 0), parseInt(t, 10);
}
function Wi(e) {
  const t = e.nodeName.toLowerCase(), n = !Number.isNaN(mu(e));
  return /* @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition */ (Bm.test(t) && !e.disabled || e instanceof HTMLAnchorElement && e.href || n) && Fm(e);
}
function gu(e) {
  const t = mu(e);
  return (Number.isNaN(t) || t >= 0) && Wi(e);
}
function jm(e) {
  return Array.from(e.querySelectorAll(pu)).filter(gu);
}
function Wm(e, t) {
  const n = jm(e);
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
function zm(e = !0) {
  const t = W(), n = W(null), r = (i) => {
    let s = i.querySelector("[data-autofocus]");
    if (!s) {
      const a = Array.from(i.querySelectorAll(pu));
      s = a.find(gu) || a.find(Wi) || null, !s && Wi(i) && (s = i);
    }
    s && s.focus({ preventScroll: !0 });
  }, o = Q(
    (i) => {
      if (e) {
        if (i === null) {
          n.current && (n.current(), n.current = null);
          return;
        }
        n.current = km(i), t.current !== i && (i ? (setTimeout(() => {
          i.getRootNode() && r(i);
        }), t.current = i) : t.current = null);
      }
    },
    [e]
  );
  return V(() => {
    if (!e)
      return;
    t.current && setTimeout(() => r(t.current));
    const i = (s) => {
      s.key === "Tab" && t.current && Wm(t.current, s);
    };
    return document.addEventListener("keydown", i), () => {
      document.removeEventListener("keydown", i), n.current && n.current();
    };
  }, [e]), o;
}
const Vm = S["useId".toString()] || (() => {
});
function Gm() {
  const e = Vm();
  return e ? `mantine-${e.replace(/:/g, "")}` : "";
}
function Gt(e) {
  const t = Gm(), [n, r] = U(t);
  return tr(() => {
    r(fu());
  }, []), typeof e == "string" ? e : typeof window > "u" ? t : n;
}
function hu(e, t) {
  typeof e == "function" ? e(t) : typeof e == "object" && e !== null && "current" in e && (e.current = t);
}
function bu(...e) {
  return (t) => {
    e.forEach((n) => hu(n, t));
  };
}
function Ne(...e) {
  return Q(bu(...e), e);
}
function kt({
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
function yu(e, t) {
  return _m("(prefers-reduced-motion: reduce)", e, t);
}
function Hm(e = !1, t) {
  const { onOpen: n, onClose: r } = t || {}, [o, i] = U(e), s = Q(() => {
    i((l) => l || (n == null || n(), !0));
  }, [n]), a = Q(() => {
    i((l) => l && (r == null || r(), !1));
  }, [r]), c = Q(() => {
    o ? a() : s();
  }, [a, s, o]);
  return [o, { open: s, close: a, toggle: c }];
}
const vu = on(null);
function hs() {
  const e = ut(vu);
  if (!e)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return e;
}
function Um() {
  return hs().cssVariablesResolver;
}
function qm() {
  return hs().classNamesPrefix;
}
function bs() {
  return hs().getStyleNonce;
}
function Km(e) {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(e);
}
function Ym(e) {
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
function Xm(e) {
  const [t, n, r, o] = e.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r: t, g: n, b: r, a: o || 1 };
}
function Jm(e) {
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
function wu(e) {
  return Km(e) ? Ym(e) : e.startsWith("rgb") ? Xm(e) : e.startsWith("hsl") ? Jm(e) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function hr(e, t) {
  if (e.startsWith("var("))
    return e;
  const { r: n, g: r, b: o, a: i } = wu(e), s = 1 - t, a = (c) => Math.round(c * s);
  return `rgba(${a(n)}, ${a(r)}, ${a(o)}, ${i})`;
}
function zi(e, t) {
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
    value: i !== void 0 ? t.colors[r][i] : t.colors[r][zi(t, n || "light")],
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
function Bt(e, t) {
  const n = ys({ color: e || t.primaryColor, theme: t });
  return n.variable ? `var(${n.variable})` : e;
}
function Vi(e, t) {
  const n = {
    from: (e == null ? void 0 : e.from) || t.defaultGradient.from,
    to: (e == null ? void 0 : e.to) || t.defaultGradient.to,
    deg: (e == null ? void 0 : e.deg) || t.defaultGradient.deg || 0
  }, r = Bt(n.from, t), o = Bt(n.to, t);
  return `linear-gradient(${n.deg}deg, ${r} 0%, ${o} 100%)`;
}
function _e(e, t) {
  if (typeof e != "string" || t > 1 || t < 0)
    return "rgba(0, 0, 0, 1)";
  const { r: n, g: r, b: o } = wu(e);
  return `rgba(${n}, ${r}, ${o}, ${t})`;
}
const Qm = ({
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
        background: _e(i, 0.1),
        hover: _e(i, 0.12),
        color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
        border: `${D(1)} solid transparent`
      };
    }
    return {
      background: _e(e, 0.1),
      hover: _e(e, 0.12),
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
      hover: _e(t.colors[o.color][o.shade], 0.05),
      color: `var(--mantine-color-${o.color}-${o.shade})`,
      border: `${D(1)} solid var(--mantine-color-${o.color}-${o.shade})`
    } : {
      background: "transparent",
      hover: _e(e, 0.05),
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
        hover: _e(i, 0.12),
        color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
        border: `${D(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: _e(e, 0.12),
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
    background: Vi(r, t),
    hover: Vi(r, t),
    color: "var(--mantine-color-white)",
    border: "none"
  } : n === "default" ? {
    background: "var(--mantine-color-default)",
    hover: "var(--mantine-color-default-hover)",
    color: "var(--mantine-color-default-color)",
    border: `${D(1)} solid var(--mantine-color-default-border)`
  } : {};
}, Zm = {
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
  colors: Zm,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: Qm,
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
function eg({
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
const tg = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color", pc = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function ui(e) {
  return e < 0 || e > 9 ? !1 : parseInt(e.toString(), 10) === e;
}
function mc(e) {
  if (!(e.primaryColor in e.colors))
    throw new Error(tg);
  if (typeof e.primaryShade == "object" && (!ui(e.primaryShade.dark) || !ui(e.primaryShade.light)))
    throw new Error(pc);
  if (typeof e.primaryShade == "number" && !ui(e.primaryShade))
    throw new Error(pc);
}
function ng(e, t) {
  var r;
  if (!t)
    return mc(e), e;
  const n = fs(e, t);
  return t.fontFamily && !((r = t.headings) != null && r.fontFamily) && (n.headings.fontFamily = t.fontFamily), mc(n), n;
}
const ws = on(null), rg = () => ut(ws) || vs;
function vt() {
  const e = ut(ws);
  if (!e)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return e;
}
function Su({
  theme: e,
  children: t,
  inherit: n = !0
}) {
  const r = rg(), o = Or(
    () => ng(n ? r : vs, e),
    [e, r, n]
  );
  return /* @__PURE__ */ S.createElement(ws.Provider, { value: o }, t);
}
Su.displayName = "@mantine/core/MantineThemeProvider";
function og() {
  const e = vt(), t = bs(), n = mt(e.breakpoints).reduce((r, o) => {
    const i = wm(e.breakpoints[o]);
    return `${r}@media (max-width: ${lc(
      i - 0.1
    )}) {.mantine-visible-from-${o} {display: none !important;}}@media (min-width: ${lc(
      i
    )}) {.mantine-hidden-from-${o} {display: none !important;}}`;
  }, "");
  return /* @__PURE__ */ S.createElement(
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
function ig(e, t) {
  const n = di(e.variables), r = n ? fi(t, n) : "", o = di(e.dark), i = o ? fi(`${t}[data-mantine-color-scheme="dark"]`, o) : "", s = di(e.light), a = s ? fi(`${t}[data-mantine-color-scheme="light"]`, s) : "";
  return `${r}${i}${a}`;
}
function un(e, t, n) {
  mt(t).forEach(
    (r) => Object.assign(e, { [`--mantine-${n}-${r}`]: t[r] })
  );
}
const xu = (e) => {
  const t = zi(e, "dark"), n = zi(e, "light"), r = e.defaultRadius in e.radius ? e.radius[e.defaultRadius] : D(e.defaultRadius), o = {
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
    o.light["--mantine-color-dimmed"] = "var(--mantine-color-gray-6)", o.light[`--mantine-color-${s}-text`] = `var(--mantine-color-${s}-filled)`, o.light[`--mantine-color-${s}-filled`] = `var(--mantine-color-${s}-${n})`, o.light[`--mantine-color-${s}-filled-hover`] = a, o.light[`--mantine-color-${s}-light`] = _e(
      e.colors[s][n],
      0.1
    ), o.light[`--mantine-color-${s}-light-hover`] = _e(
      e.colors[s][n],
      0.12
    ), o.light[`--mantine-color-${s}-light-color`] = `var(--mantine-color-${s}-${n})`, o.light[`--mantine-color-${s}-outline`] = `var(--mantine-color-${s}-${n})`, o.light[`--mantine-color-${s}-outline-hover`] = _e(
      e.colors[s][n],
      0.05
    ), o.dark["--mantine-color-dimmed"] = "var(--mantine-color-dark-2)", o.dark[`--mantine-color-${s}-text`] = `var(--mantine-color-${s}-4)`, o.dark[`--mantine-color-${s}-filled`] = `var(--mantine-color-${s}-${t})`, o.dark[`--mantine-color-${s}-filled-hover`] = c, o.dark[`--mantine-color-${s}-light`] = _e(
      e.colors[s][Math.max(0, t - 2)],
      0.15
    ), o.dark[`--mantine-color-${s}-light-hover`] = _e(
      e.colors[s][Math.max(0, t - 2)],
      0.2
    ), o.dark[`--mantine-color-${s}-light-color`] = `var(--mantine-color-${s}-${Math.max(
      t - 5,
      0
    )})`, o.dark[`--mantine-color-${s}-outline`] = `var(--mantine-color-${s}-${Math.max(
      t - 4,
      0
    )})`, o.dark[`--mantine-color-${s}-outline-hover`] = _e(
      e.colors[s][Math.max(t - 4, 0)],
      0.05
    );
  });
  const i = e.headings.sizes;
  return mt(i).forEach((s) => {
    o.variables[`--mantine-${s}-font-size`] = i[s].fontSize, o.variables[`--mantine-${s}-line-height`] = i[s].lineHeight, o.variables[`--mantine-${s}-font-weight`] = i[s].fontWeight || e.headings.fontWeight;
  }), o;
};
function sg({ theme: e, generator: t }) {
  const n = xu(e), r = t == null ? void 0 : t(e);
  return r ? fs(n, r) : n;
}
const pi = xu(vs);
function ag(e) {
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
function cg(e) {
  return `
  ${e}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${e}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
}
function Cu({ cssVariablesSelector: e }) {
  const t = vt(), n = bs(), r = Um(), o = sg({ theme: t, generator: r }), i = e === ":root", s = i ? ag(o) : o, a = ig(s, e);
  return a ? /* @__PURE__ */ S.createElement(
    "style",
    {
      "data-mantine-styles": !0,
      nonce: n == null ? void 0 : n(),
      dangerouslySetInnerHTML: {
        __html: `${a}${i ? "" : cg(e)}`
      }
    }
  ) : null;
}
Cu.displayName = "@mantine/CssVariables";
function lg() {
  const e = console.error;
  console.error = (...t) => {
    t.length > 1 && typeof t[0] == "string" && t[0].toLowerCase().includes("extra attributes from the server") && typeof t[1] == "string" && t[1].toLowerCase().includes("data-mantine-color-scheme") || e(...t);
  };
}
function Nn(e, t) {
  var r;
  const n = e !== "auto" ? e : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  (r = t()) == null || r.setAttribute("data-mantine-color-scheme", n);
}
function ug({
  manager: e,
  defaultColorScheme: t,
  getRootElement: n,
  forceColorScheme: r
}) {
  const o = W(), [i, s] = U(() => e.get(t)), a = r || i, c = Q(
    (u) => {
      r || (Nn(u, n), s(u), e.set(u));
    },
    [e.set, a, r]
  ), l = Q(() => {
    s(t), Nn(t, n), e.clear();
  }, [e.clear, t]);
  return V(() => (e.subscribe(c), e.unsubscribe), [e.subscribe, e.unsubscribe]), tr(() => {
    Nn(e.get(t), n);
  }, []), V(() => {
    var f;
    if (r)
      return Nn(r, n), () => {
      };
    o.current = window.matchMedia("(prefers-color-scheme: dark)");
    const u = (d) => {
      i === "auto" && Nn(d.matches ? "dark" : "light", n);
    };
    return (f = o.current) == null || f.addEventListener("change", u), () => {
      var d;
      return (d = o.current) == null ? void 0 : d.removeEventListener("change", u);
    };
  }, [i, r]), { colorScheme: a, setColorScheme: c, clearColorScheme: l };
}
function dg({
  respectReducedMotion: e,
  getRootElement: t
}) {
  tr(() => {
    var n;
    e && ((n = t()) == null || n.setAttribute("data-respect-reduced-motion", "true"));
  }, [e]);
}
lg();
function Iu({
  theme: e,
  children: t,
  getStyleNonce: n,
  withCssVariables: r = !0,
  cssVariablesSelector: o = ":root",
  classNamesPrefix: i = "mantine",
  colorSchemeManager: s = eg(),
  defaultColorScheme: a = "light",
  getRootElement: c = () => document.documentElement,
  cssVariablesResolver: l,
  forceColorScheme: u
}) {
  const { colorScheme: f, setColorScheme: d, clearColorScheme: p } = ug({
    defaultColorScheme: a,
    forceColorScheme: u,
    manager: s,
    getRootElement: c
  });
  return dg({
    respectReducedMotion: (e == null ? void 0 : e.respectReducedMotion) || !1,
    getRootElement: c
  }), /* @__PURE__ */ S.createElement(
    vu.Provider,
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
    /* @__PURE__ */ S.createElement(Su, { theme: e }, r && /* @__PURE__ */ S.createElement(Cu, { cssVariablesSelector: o }), /* @__PURE__ */ S.createElement(og, null), t)
  );
}
Iu.displayName = "@mantine/core/MantineProvider";
function Eu({
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
    resolvedStyles: _r({
      theme: o,
      styles: t,
      props: n,
      stylesCtx: r || void 0
    })
  };
}
const fg = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function pg({ theme: e, options: t, unstyled: n }) {
  return yt(
    (t == null ? void 0 : t.focusable) && !n && (e.focusClassName || fg[e.focusRing]),
    (t == null ? void 0 : t.active) && !n && e.activeClassName
  );
}
function mg({
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
function gg({
  selector: e,
  stylesCtx: t,
  theme: n,
  classNames: r,
  props: o
}) {
  return so({ theme: n, classNames: r, props: o, stylesCtx: t })[e];
}
function hg({ rootSelector: e, selector: t, className: n }) {
  return e === t ? n : void 0;
}
function bg({ selector: e, classes: t, unstyled: n }) {
  return n ? void 0 : t[e];
}
function yg({
  themeName: e,
  classNamesPrefix: t,
  selector: n
}) {
  return e.map((r) => `${t}-${r}-${n}`);
}
function vg({
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
function wg({
  options: e,
  classes: t,
  selector: n,
  unstyled: r
}) {
  return e != null && e.variant && !r ? t[`${n}--${e.variant}`] : void 0;
}
function Sg({
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
    pg({ theme: e, options: t, unstyled: a }),
    vg({ theme: e, themeName: n, selector: r, props: u, stylesCtx: f }),
    wg({ options: t, classes: s, selector: r, unstyled: a }),
    gg({ selector: r, stylesCtx: f, theme: e, classNames: i, props: u }),
    mg({ selector: r, stylesCtx: f, options: t, props: u, theme: e }),
    hg({ rootSelector: l, selector: r, className: c }),
    bg({ selector: r, classes: s, unstyled: a }),
    yg({ themeName: n, classNamesPrefix: o, selector: r }),
    t == null ? void 0 : t.className
  );
}
function xg({
  theme: e,
  themeName: t,
  props: n,
  stylesCtx: r,
  selector: o
}) {
  return t.map(
    (i) => {
      var s;
      return _r({
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
function Cg(e) {
  return e.reduce((t, n) => (n && Object.keys(n).forEach((r) => {
    t[r] = { ...t[r], ...ps(n[r]) };
  }), t), {});
}
function Ig({
  vars: e,
  varsResolver: t,
  theme: n,
  props: r,
  stylesCtx: o,
  selector: i,
  themeName: s
}) {
  var a;
  return (a = Cg([
    t == null ? void 0 : t(n, r, o),
    ...s.map((c) => {
      var l, u, f;
      return (f = (u = (l = n.components) == null ? void 0 : l[c]) == null ? void 0 : u.vars) == null ? void 0 : f.call(u, n, r, o);
    }),
    e == null ? void 0 : e(n, r, o)
  ])) == null ? void 0 : a[i];
}
function Eg({
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
    ...xg({ theme: e, themeName: t, props: o, stylesCtx: i, selector: n }),
    ..._r({ theme: e, styles: a, props: o, stylesCtx: i })[n],
    ..._r({ theme: e, styles: r == null ? void 0 : r.styles, props: (r == null ? void 0 : r.props) || o, stylesCtx: i })[n],
    ...Ig({ theme: e, props: o, stylesCtx: i, vars: l, varsResolver: u, selector: n, themeName: t }),
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
  const d = vt(), p = qm(), m = (Array.isArray(e) ? e : [e]).filter((g) => g);
  return (g, h) => ({
    className: Sg({
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
    style: Eg({
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
    (t, n) => e[n] !== void 0 ? `${t}${ym(n)}:${e[n]};` : t,
    ""
  ).trim();
}
function Dg({ selector: e, styles: t, media: n }) {
  const r = t ? gc(t) : "", o = Array.isArray(n) ? n.map((i) => `@media${i.query}{${e}{${gc(i.styles)}}}`) : [];
  return `${r ? `${e}{${r}}` : ""}${o.join("")}`.trim();
}
function Rg({ selector: e, styles: t, media: n }) {
  const r = bs();
  return /* @__PURE__ */ S.createElement(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: r == null ? void 0 : r(),
      dangerouslySetInnerHTML: { __html: Dg({ selector: e, styles: t, media: n }) }
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
    lts: x,
    ta: C,
    lh: E,
    fs: I,
    tt: N,
    td: $,
    w: T,
    miw: L,
    maw: k,
    h: A,
    mih: _,
    mah: P,
    bgsz: F,
    bgp: O,
    bgr: G,
    bga: X,
    pos: ne,
    top: ve,
    left: le,
    bottom: Oe,
    right: we,
    inset: re,
    display: Se,
    hiddenFrom: ke,
    visibleFrom: Ie,
    lightHidden: Ee,
    darkHidden: Be,
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
    lts: x,
    ta: C,
    lh: E,
    fs: I,
    tt: N,
    td: $,
    w: T,
    miw: L,
    maw: k,
    h: A,
    mih: _,
    mah: P,
    bgsz: F,
    bgp: O,
    bgr: G,
    bga: X,
    pos: ne,
    top: ve,
    left: le,
    bottom: Oe,
    right: we,
    inset: re,
    display: Se,
    hiddenFrom: ke,
    visibleFrom: Ie,
    lightHidden: Ee,
    darkHidden: Be
  }), rest: ae };
}
const Pg = {
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
function Ag(e, t) {
  const n = ys({ color: e, theme: t });
  return n.color === "dimmed" ? "var(--mantine-color-dimmed)" : n.color === "bright" ? "var(--mantine-color-bright)" : n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : n.variable ? `var(${n.variable})` : n.color;
}
function Ng(e, t) {
  return typeof e == "string" && e in t.fontSizes ? `var(--mantine-font-size-${e})` : typeof e == "number" || typeof e == "string" ? D(e) : e;
}
function Og(e) {
  return e;
}
function Tg(e, t) {
  return typeof e == "string" && e in t.lineHeights ? `var(--mantine-line-height-${e})` : e;
}
function $g(e) {
  return typeof e == "number" ? D(e) : e;
}
function _g(e, t) {
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
  color: Ag,
  fontSize: Ng,
  spacing: _g,
  identity: Og,
  size: $g,
  lineHeight: Tg
};
function hc(e) {
  return e.replace("(min-width: ", "").replace("em)", "");
}
function Lg({
  media: e,
  ...t
}) {
  const r = Object.keys(e).sort((o, i) => Number(hc(o)) - Number(hc(i))).map((o) => ({ query: o, styles: e[o] }));
  return { ...t, media: r };
}
function kg(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.keys(e);
  return !(t.length === 1 && t[0] === "base");
}
function Bg(e) {
  return typeof e == "object" && e !== null ? "base" in e ? e.base : void 0 : e;
}
function Mg(e) {
  return typeof e == "object" && e !== null ? mt(e).filter((t) => t !== "base") : [];
}
function Fg(e, t) {
  return typeof e == "object" && e !== null && t in e ? e[t] : e;
}
function jg({
  styleProps: e,
  data: t,
  theme: n
}) {
  return Lg(
    mt(e).reduce(
      (r, o) => {
        if (o === "hiddenFrom" || o === "visibleFrom")
          return r;
        const i = t[o], s = Array.isArray(i.property) ? i.property : [i.property], a = Bg(e[o]);
        if (!kg(e[o]))
          return s.forEach((l) => {
            r.inlineStyles[l] = mi[i.type](a, n);
          }), r;
        r.hasResponsiveStyles = !0;
        const c = Mg(e[o]);
        return s.forEach((l) => {
          a && (r.styles[l] = mi[i.type](a, n)), c.forEach((u) => {
            const f = `(min-width: ${n.breakpoints[u]})`;
            r.media[f] = {
              ...r.media[f],
              [l]: mi[i.type](
                Fg(e[o], u),
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
function Wg() {
  return `__m__-${nu().replace(/:/g, "")}`;
}
function Ss(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...Ss(r, t) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function Du(e) {
  return e.startsWith("data-") ? e : `data-${e}`;
}
function zg(e) {
  return Object.keys(e).reduce((t, n) => {
    const r = e[n];
    return r === void 0 || r === "" || r === !1 || r === null || (t[Du(n)] = e[n]), t;
  }, {});
}
function Ru(e) {
  return e ? typeof e == "string" ? { [Du(e)]: !0 } : Array.isArray(e) ? [...e].reduce(
    (t, n) => ({ ...t, ...Ru(n) }),
    {}
  ) : zg(e) : null;
}
function Hi(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...Hi(r, t) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function Vg({
  theme: e,
  style: t,
  vars: n,
  styleProps: r
}) {
  const o = Hi(t, e), i = Hi(n, e);
  return { ...o, ...i, ...r };
}
const Pu = ie(
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
    const m = vt(), g = e || "div", { styleProps: h, rest: w } = co(d), y = Wg(), b = jg({
      styleProps: h,
      theme: m,
      data: Pg
    }), v = {
      ref: p,
      style: Vg({
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
      "data-size": cu(s) ? void 0 : s || void 0,
      ...Ru(i),
      ...w
    };
    return /* @__PURE__ */ S.createElement(S.Fragment, null, b.hasResponsiveStyles && /* @__PURE__ */ S.createElement(
      Rg,
      {
        selector: `.${y}`,
        styles: b.styles,
        media: b.media
      }
    ), typeof f == "function" ? f(v) : /* @__PURE__ */ S.createElement(g, { ...v }));
  }
);
Pu.displayName = "@mantine/core/Box";
const H = Pu;
function Au(e) {
  return e;
}
function q(e) {
  const t = ie(e);
  return t.extend = Au, t;
}
function an(e) {
  const t = ie(e);
  return t.extend = Au, t;
}
const Gg = on({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function nr() {
  return ut(Gg);
}
function Hg(e) {
  if (!e || typeof e == "string")
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function gi(e) {
  return e != null && e.current ? e.current.scrollHeight : "auto";
}
const On = typeof window < "u" && window.requestAnimationFrame;
function Ug({
  transitionDuration: e,
  transitionTimingFunction: t = "ease",
  onTransitionEnd: n = () => {
  },
  opened: r
}) {
  const o = W(null), i = 0, s = {
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
      transition: `height ${e || Hg(m)}ms ${t}`
    };
  }
  Lt(() => {
    typeof On == "function" && On(r ? () => {
      u({ willChange: "height", display: "block", overflow: "hidden" }), On(() => {
        const m = gi(o);
        u({ ...f(m), height: m });
      });
    } : () => {
      const m = gi(o);
      u({ ...f(m), willChange: "height", height: m }), On(() => u({ height: i, overflow: "hidden" }));
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
      [g]: bu(o, w),
      onTransitionEnd: d,
      style: { boxSizing: "border-box", ...m, ...a }
    };
  }
  return p;
}
const qg = {
  transitionDuration: 200,
  transitionTimingFunction: "ease",
  animateOpacity: !0
}, Nu = q((e, t) => {
  const {
    children: n,
    in: r,
    transitionDuration: o,
    transitionTimingFunction: i,
    style: s,
    onTransitionEnd: a,
    animateOpacity: c,
    ...l
  } = j("Collapse", qg, e), u = vt(), f = yu(), p = (u.respectReducedMotion ? f : !1) ? 0 : o, m = Ug({
    opened: r,
    transitionDuration: p,
    transitionTimingFunction: i,
    onTransitionEnd: a
  });
  return p === 0 ? r ? /* @__PURE__ */ S.createElement(H, { ...l }, n) : null : /* @__PURE__ */ S.createElement(H, { ...m({ style: Ss(s, u), ref: t, ...l }) }, /* @__PURE__ */ S.createElement(
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
Nu.displayName = "@mantine/core/Collapse";
const [Kg, et] = Vt(
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
const Yg = S.forwardRef((e, t) => {
  const { style: n, ...r } = e, o = et(), [i, s] = S.useState(0), [a, c] = S.useState(0), l = !!(i && a);
  return mn(o.scrollbarX, () => {
    var f;
    const u = ((f = o.scrollbarX) == null ? void 0 : f.offsetHeight) || 0;
    o.onCornerHeightChange(u), c(u);
  }), mn(o.scrollbarY, () => {
    var f;
    const u = ((f = o.scrollbarY) == null ? void 0 : f.offsetWidth) || 0;
    o.onCornerWidthChange(u), s(u);
  }), l ? /* @__PURE__ */ S.createElement("div", { ...r, ref: t, style: { ...n, width: i, height: a } }) : null;
}), Xg = S.forwardRef(
  (e, t) => {
    const n = et(), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ S.createElement(Yg, { ...e, ref: t }) : null;
  }
), Jg = {
  scrollHideDelay: 1e3,
  type: "hover"
}, Ou = ie((e, t) => {
  const n = j("ScrollAreaRoot", Jg, e), { type: r, scrollHideDelay: o, scrollbars: i, ...s } = n, [a, c] = U(null), [l, u] = U(null), [f, d] = U(null), [p, m] = U(null), [g, h] = U(null), [w, y] = U(0), [b, v] = U(0), [x, C] = U(!1), [E, I] = U(!1), N = Ne(t, ($) => c($));
  return /* @__PURE__ */ S.createElement(
    Kg,
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
        scrollbarXEnabled: x,
        onScrollbarXEnabledChange: C,
        scrollbarY: g,
        onScrollbarYChange: h,
        scrollbarYEnabled: E,
        onScrollbarYEnabledChange: I,
        onCornerWidthChange: y,
        onCornerHeightChange: v
      }
    },
    /* @__PURE__ */ S.createElement(
      H,
      {
        ...s,
        ref: N,
        __vars: {
          "--sa-corner-width": i !== "xy" ? "0px" : `${w}px`,
          "--sa-corner-height": i !== "xy" ? "0px" : `${b}px`
        }
      }
    )
  );
});
Ou.displayName = "@mantine/core/ScrollAreaRoot";
function Tu(e, t) {
  const n = e / t;
  return Number.isNaN(n) ? 0 : n;
}
function lo(e) {
  const t = Tu(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function $u(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1])
      return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function Qg(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function bc(e, t, n = "ltr") {
  const r = lo(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, i = t.scrollbar.size - o, s = t.content - t.viewport, a = i - r, c = n === "ltr" ? [0, s] : [s * -1, 0], l = Qg(e, c);
  return $u([0, s], [0, a])(l);
}
function Zg(e, t, n, r = "ltr") {
  const o = lo(n), i = o / 2, s = t || i, a = o - s, c = n.scrollbar.paddingStart + s, l = n.scrollbar.size - n.scrollbar.paddingEnd - a, u = n.content - n.viewport, f = r === "ltr" ? [0, u] : [u * -1, 0];
  return $u([c, l], f)(e);
}
function _u(e, t) {
  return e > 0 && e < t;
}
function Lr(e) {
  return e ? parseInt(e, 10) : 0;
}
function Zt(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return (r) => {
    e == null || e(r), (n === !1 || !r.defaultPrevented) && (t == null || t(r));
  };
}
const [eh, Lu] = Vt(
  "ScrollAreaScrollbar was not found in tree"
), ku = ie((e, t) => {
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
  } = e, d = et(), [p, m] = S.useState(null), g = Ne(t, (I) => m(I)), h = S.useRef(null), w = S.useRef(""), { viewport: y } = d, b = n.content - n.viewport, v = Qt(l), x = Qt(a), C = ao(u, 10), E = (I) => {
    if (h.current) {
      const N = I.clientX - h.current.left, $ = I.clientY - h.current.top;
      c({ x: N, y: $ });
    }
  };
  return V(() => {
    const I = (N) => {
      const $ = N.target;
      (p == null ? void 0 : p.contains($)) && v(N, b);
    };
    return document.addEventListener("wheel", I, { passive: !1 }), () => document.removeEventListener("wheel", I, { passive: !1 });
  }, [y, p, b, v]), V(x, [n, x]), mn(p, C), mn(d.content, C), /* @__PURE__ */ S.createElement(
    eh,
    {
      value: {
        scrollbar: p,
        hasThumb: r,
        onThumbChange: Qt(o),
        onThumbPointerUp: Qt(i),
        onThumbPositionChange: x,
        onThumbPointerDown: Qt(s)
      }
    },
    /* @__PURE__ */ S.createElement(
      "div",
      {
        ...f,
        ref: g,
        style: { position: "absolute", ...f.style },
        onPointerDown: Zt(e.onPointerDown, (I) => {
          I.button === 0 && (I.target.setPointerCapture(I.pointerId), h.current = p.getBoundingClientRect(), w.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", E(I));
        }),
        onPointerMove: Zt(e.onPointerMove, E),
        onPointerUp: Zt(e.onPointerUp, (I) => {
          const N = I.target;
          N.hasPointerCapture(I.pointerId) && N.releasePointerCapture(I.pointerId), document.body.style.webkitUserSelect = w.current, h.current = null;
        })
      }
    )
  );
}), th = ie(
  (e, t) => {
    const { sizes: n, onSizesChange: r, style: o, ...i } = e, s = et(), [a, c] = U(), l = W(null), u = Ne(t, l, s.onScrollbarXChange);
    return V(() => {
      l.current && c(getComputedStyle(l.current));
    }, [l]), /* @__PURE__ */ S.createElement(
      ku,
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
            e.onWheelScroll(p), _u(p, d) && f.preventDefault();
          }
        },
        onResize: () => {
          l.current && s.viewport && a && r({
            content: s.viewport.scrollWidth,
            viewport: s.viewport.offsetWidth,
            scrollbar: {
              size: l.current.clientWidth,
              paddingStart: Lr(a.paddingLeft),
              paddingEnd: Lr(a.paddingRight)
            }
          });
        }
      }
    );
  }
), nh = ie(
  (e, t) => {
    const { sizes: n, onSizesChange: r, style: o, ...i } = e, s = et(), [a, c] = S.useState(), l = W(null), u = Ne(t, l, s.onScrollbarYChange);
    return V(() => {
      l.current && c(getComputedStyle(l.current));
    }, [l]), /* @__PURE__ */ S.createElement(
      ku,
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
            e.onWheelScroll(p), _u(p, d) && f.preventDefault();
          }
        },
        onResize: () => {
          l.current && s.viewport && a && r({
            content: s.viewport.scrollHeight,
            viewport: s.viewport.offsetHeight,
            scrollbar: {
              size: l.current.clientHeight,
              paddingStart: Lr(a.paddingTop),
              paddingEnd: Lr(a.paddingBottom)
            }
          });
        }
      }
    );
  }
), xs = ie((e, t) => {
  const { orientation: n = "vertical", ...r } = e, { dir: o } = nr(), i = et(), s = W(null), a = W(0), [c, l] = U({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), u = Tu(c.viewport, c.content), f = {
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
  }, d = (p, m) => Zg(p, a.current, c, m);
  return n === "horizontal" ? /* @__PURE__ */ S.createElement(
    th,
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
  ) : n === "vertical" ? /* @__PURE__ */ S.createElement(
    nh,
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
}), Bu = ie(
  (e, t) => {
    const n = et(), { forceMount: r, ...o } = e, [i, s] = U(!1), a = e.orientation === "horizontal", c = ao(() => {
      if (n.viewport) {
        const l = n.viewport.offsetWidth < n.viewport.scrollWidth, u = n.viewport.offsetHeight < n.viewport.scrollHeight;
        s(a ? l : u);
      }
    }, 10);
    return mn(n.viewport, c), mn(n.content, c), r || i ? /* @__PURE__ */ S.createElement(
      xs,
      {
        "data-state": i ? "visible" : "hidden",
        ...o,
        ref: t
      }
    ) : null;
  }
), rh = ie(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = et(), [i, s] = U(!1);
    return V(() => {
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
    }, [o.scrollArea, o.scrollHideDelay]), n || i ? /* @__PURE__ */ S.createElement(
      Bu,
      {
        "data-state": i ? "visible" : "hidden",
        ...r,
        ref: t
      }
    ) : null;
  }
), oh = ie(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = et(), i = e.orientation === "horizontal", [s, a] = U("hidden"), c = ao(() => a("idle"), 100);
    return V(() => {
      if (s === "idle") {
        const l = window.setTimeout(() => a("hidden"), o.scrollHideDelay);
        return () => window.clearTimeout(l);
      }
    }, [s, o.scrollHideDelay]), V(() => {
      const { viewport: l } = o, u = i ? "scrollLeft" : "scrollTop";
      if (l) {
        let f = l[u];
        const d = () => {
          const p = l[u];
          f !== p && (a("scrolling"), c()), f = p;
        };
        return l.addEventListener("scroll", d), () => l.removeEventListener("scroll", d);
      }
    }, [o.viewport, i, c]), n || s !== "hidden" ? /* @__PURE__ */ S.createElement(
      xs,
      {
        "data-state": s === "hidden" ? "hidden" : "visible",
        ...r,
        ref: t,
        onPointerEnter: Zt(e.onPointerEnter, () => a("interacting")),
        onPointerLeave: Zt(e.onPointerLeave, () => a("idle"))
      }
    ) : null;
  }
), yc = S.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = et(), { onScrollbarXEnabledChange: i, onScrollbarYEnabledChange: s } = o, a = e.orientation === "horizontal";
    return S.useEffect(() => (a ? i(!0) : s(!0), () => {
      a ? i(!1) : s(!1);
    }), [a, i, s]), o.type === "hover" ? /* @__PURE__ */ S.createElement(rh, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ S.createElement(oh, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ S.createElement(Bu, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ S.createElement(xs, { ...r, ref: t }) : null;
  }
);
function ih(e, t = () => {
}) {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return function o() {
    const i = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== i.left, a = n.top !== i.top;
    (s || a) && t(), n = i, r = window.requestAnimationFrame(o);
  }(), () => window.cancelAnimationFrame(r);
}
const sh = ie((e, t) => {
  const { style: n, ...r } = e, o = et(), i = Lu(), { onThumbPositionChange: s } = i, a = Ne(t, (u) => i.onThumbChange(u)), c = W(), l = ao(() => {
    c.current && (c.current(), c.current = void 0);
  }, 100);
  return V(() => {
    const { viewport: u } = o;
    if (u) {
      const f = () => {
        if (l(), !c.current) {
          const d = ih(u, s);
          c.current = d, s();
        }
      };
      return s(), u.addEventListener("scroll", f), () => u.removeEventListener("scroll", f);
    }
  }, [o.viewport, l, s]), /* @__PURE__ */ S.createElement(
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
}), vc = S.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Lu();
    return n || o.hasThumb ? /* @__PURE__ */ S.createElement(sh, { ref: t, ...r }) : null;
  }
), Mu = ie(
  ({ children: e, style: t, ...n }, r) => {
    const o = et(), i = Ne(r, o.onViewportChange);
    return /* @__PURE__ */ S.createElement(
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
      /* @__PURE__ */ S.createElement("div", { style: { minWidth: "100%", display: "table" }, ref: o.onContentChange }, e)
    );
  }
);
Mu.displayName = "@mantine/core/ScrollAreaViewport";
var Cs = { root: "m-d57069b5", viewport: "m-c0783ff9", viewportInner: "m-f8f631dd", scrollbar: "m-c44ba933", thumb: "m-d8b5e363", corner: "m-21657268" };
const Fu = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
}, ah = (e, { scrollbarSize: t }) => ({
  root: {
    "--scrollarea-scrollbar-size": D(t)
  }
}), rr = q((e, t) => {
  const n = j("ScrollArea", Fu, e), {
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
  } = n, [b, v] = U(!1), x = te({
    name: "ScrollArea",
    props: n,
    classes: Cs,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: l,
    varsResolver: ah
  });
  return /* @__PURE__ */ S.createElement(
    Ou,
    {
      type: u === "never" ? "always" : u,
      scrollHideDelay: f,
      ref: t,
      scrollbars: w,
      ...x("root"),
      ...y
    },
    /* @__PURE__ */ S.createElement(
      Mu,
      {
        ...d,
        ...x("viewport"),
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
    (w === "xy" || w === "x") && /* @__PURE__ */ S.createElement(
      yc,
      {
        ...x("scrollbar"),
        orientation: "horizontal",
        "data-hidden": u === "never" || void 0,
        forceMount: !0,
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1)
      },
      /* @__PURE__ */ S.createElement(vc, { ...x("thumb") })
    ),
    (w === "xy" || w === "y") && /* @__PURE__ */ S.createElement(
      yc,
      {
        ...x("scrollbar"),
        orientation: "vertical",
        "data-hidden": u === "never" || void 0,
        forceMount: !0,
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1)
      },
      /* @__PURE__ */ S.createElement(vc, { ...x("thumb") })
    ),
    /* @__PURE__ */ S.createElement(
      Xg,
      {
        ...x("corner"),
        "data-hovered": b || void 0,
        "data-hidden": u === "never" || void 0
      }
    )
  );
});
rr.displayName = "@mantine/core/ScrollArea";
const Is = q((e, t) => {
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
  } = j("ScrollAreaAutosize", Fu, e);
  return /* @__PURE__ */ S.createElement(H, { ...y, ref: t, style: [{ display: "flex" }, h] }, /* @__PURE__ */ S.createElement(H, { style: { display: "flex", flexDirection: "column", flex: 1 } }, /* @__PURE__ */ S.createElement(
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
Is.displayName = "@mantine/core/ScrollAreaAutosize";
Is.classes = Cs;
rr.Autosize = Is;
var ju = { root: "m-87cf2631" };
const ch = {
  __staticSelector: "UnstyledButton"
}, Cn = an(
  (e, t) => {
    const n = j("UnstyledButton", ch, e), {
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
      classes: ju,
      className: r,
      style: l,
      classNames: a,
      styles: c,
      unstyled: s
    });
    return /* @__PURE__ */ S.createElement(
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
Cn.classes = ju;
Cn.displayName = "@mantine/core/UnstyledButton";
const ct = Math.min, xe = Math.max, kr = Math.round, br = Math.floor, Mt = (e) => ({
  x: e,
  y: e
}), lh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, uh = {
  start: "end",
  end: "start"
};
function Ui(e, t, n) {
  return xe(e, ct(t, n));
}
function Ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  return e.split("-")[0];
}
function In(e) {
  return e.split("-")[1];
}
function Es(e) {
  return e === "x" ? "y" : "x";
}
function Ds(e) {
  return e === "y" ? "height" : "width";
}
function cn(e) {
  return ["top", "bottom"].includes(lt(e)) ? "y" : "x";
}
function Rs(e) {
  return Es(cn(e));
}
function dh(e, t, n) {
  n === void 0 && (n = !1);
  const r = In(e), o = Rs(e), i = Ds(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = Br(s)), [s, Br(s)];
}
function fh(e) {
  const t = Br(e);
  return [qi(e), t, qi(t)];
}
function qi(e) {
  return e.replace(/start|end/g, (t) => uh[t]);
}
function ph(e, t, n) {
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
function mh(e, t, n, r) {
  const o = In(e);
  let i = ph(lt(e), n === "start", r);
  return o && (i = i.map((s) => s + "-" + o), t && (i = i.concat(i.map(qi)))), i;
}
function Br(e) {
  return e.replace(/left|right|bottom|top/g, (t) => lh[t]);
}
function gh(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ps(e) {
  return typeof e != "number" ? gh(e) : {
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
  switch (In(t)) {
    case "start":
      p[s] -= d * (n && l ? -1 : 1);
      break;
    case "end":
      p[s] += d * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const hh = async (e, t, n) => {
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
      reset: x
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
    }, x && m <= 50) {
      m++, typeof x == "object" && (x.placement && (d = x.placement), x.rects && (l = x.rects === !0 ? await s.getElementRects({
        reference: e,
        floating: t,
        strategy: o
      }) : x.rects), {
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
  } = Ct(t, e), m = Ps(p), h = a[d ? f === "floating" ? "reference" : "floating" : f], w = gn(await i.getClippingRect({
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
  }, x = gn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: y,
    offsetParent: b,
    strategy: c
  }) : y);
  return {
    top: (w.top - x.top + m.top) / v.y,
    bottom: (x.bottom - w.bottom + m.bottom) / v.y,
    left: (w.left - x.left + m.left) / v.x,
    right: (x.right - w.right + m.right) / v.x
  };
}
const Sc = (e) => ({
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
    const f = Ps(u), d = {
      x: n,
      y: r
    }, p = Rs(o), m = Ds(p), g = await s.getDimensions(l), h = p === "y", w = h ? "top" : "left", y = h ? "bottom" : "right", b = h ? "clientHeight" : "clientWidth", v = i.reference[m] + i.reference[p] - d[p] - i.floating[m], x = d[p] - i.reference[p], C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let E = C ? C[b] : 0;
    (!E || !await (s.isElement == null ? void 0 : s.isElement(C))) && (E = a.floating[b] || i.floating[m]);
    const I = v / 2 - x / 2, N = E / 2 - g[m] / 2 - 1, $ = ct(f[w], N), T = ct(f[y], N), L = $, k = E - g[m] - T, A = E / 2 - g[m] / 2 + I, _ = Ui(L, A, k), P = !c.arrow && In(o) != null && A != _ && i.reference[m] / 2 - (A < L ? $ : T) - g[m] / 2 < 0, F = P ? A < L ? A - L : A - k : 0;
    return {
      [p]: d[p] + F,
      data: {
        [p]: _,
        centerOffset: A - _ - F,
        ...P && {
          alignmentOffset: F
        }
      },
      reset: P
    };
  }
}), Wu = function(e) {
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
      const w = lt(o), y = lt(a) === a, b = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), v = d || (y || !g ? [Br(a)] : fh(a));
      !d && m !== "none" && v.push(...mh(a, g, m, b));
      const x = [a, ...v], C = await As(t, h), E = [];
      let I = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (u && E.push(C[w]), f) {
        const L = dh(o, s, b);
        E.push(C[L[0]], C[L[1]]);
      }
      if (I = [...I, {
        placement: o,
        overflows: E
      }], !E.every((L) => L <= 0)) {
        var N, $;
        const L = (((N = i.flip) == null ? void 0 : N.index) || 0) + 1, k = x[L];
        if (k)
          return {
            data: {
              index: L,
              overflows: I
            },
            reset: {
              placement: k
            }
          };
        let A = ($ = I.filter((_) => _.overflows[0] <= 0).sort((_, P) => _.overflows[1] - P.overflows[1])[0]) == null ? void 0 : $.placement;
        if (!A)
          switch (p) {
            case "bestFit": {
              var T;
              const _ = (T = I.map((P) => [P.placement, P.overflows.filter((F) => F > 0).reduce((F, O) => F + O, 0)]).sort((P, F) => P[1] - F[1])[0]) == null ? void 0 : T[0];
              _ && (A = _);
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
function zu(e) {
  const t = ct(...e.map((i) => i.left)), n = ct(...e.map((i) => i.top)), r = xe(...e.map((i) => i.right)), o = xe(...e.map((i) => i.bottom));
  return {
    x: t,
    y: n,
    width: r - t,
    height: o - n
  };
}
function bh(e) {
  const t = e.slice().sort((o, i) => o.y - i.y), n = [];
  let r = null;
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    !r || i.y - r.y > r.height / 2 ? n.push([i]) : n[n.length - 1].push(i), r = i;
  }
  return n.map((o) => gn(zu(o)));
}
const Vu = function(e) {
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
      } = Ct(e, t), u = Array.from(await (i.getClientRects == null ? void 0 : i.getClientRects(r.reference)) || []), f = bh(u), d = gn(zu(u)), p = Ps(a);
      function m() {
        if (f.length === 2 && f[0].left > f[1].right && c != null && l != null)
          return f.find((h) => c > h.left - p.left && c < h.right + p.right && l > h.top - p.top && l < h.bottom + p.bottom) || d;
        if (f.length >= 2) {
          if (cn(n) === "y") {
            const $ = f[0], T = f[f.length - 1], L = lt(n) === "top", k = $.top, A = T.bottom, _ = L ? $.left : T.left, P = L ? $.right : T.right, F = P - _, O = A - k;
            return {
              top: k,
              bottom: A,
              left: _,
              right: P,
              width: F,
              height: O,
              x: _,
              y: k
            };
          }
          const h = lt(n) === "left", w = xe(...f.map(($) => $.right)), y = ct(...f.map(($) => $.left)), b = f.filter(($) => h ? $.left === y : $.right === w), v = b[0].top, x = b[b.length - 1].bottom, C = y, E = w, I = E - C, N = x - v;
          return {
            top: v,
            bottom: x,
            left: C,
            right: E,
            width: I,
            height: N,
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
async function yh(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = lt(n), a = In(n), c = cn(n) === "y", l = ["left", "top"].includes(s) ? -1 : 1, u = i && c ? -1 : 1, f = Ct(t, e);
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
const Gu = function(e) {
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
      } = t, c = await yh(t, e);
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
}, Ns = function(e) {
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
      }, u = await As(t, c), f = cn(lt(o)), d = Es(f);
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
}, vh = function(e) {
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
      }, f = cn(o), d = Es(f);
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
        const b = d === "y" ? "height" : "width", v = i.reference[d] - i.floating[b] + h.mainAxis, x = i.reference[d] + i.reference[b] - h.mainAxis;
        p < v ? p = v : p > x && (p = x);
      }
      if (l) {
        var w, y;
        const b = d === "y" ? "width" : "height", v = ["top", "left"].includes(lt(o)), x = i.reference[f] - i.floating[b] + (v && ((w = s.offset) == null ? void 0 : w[f]) || 0) + (v ? 0 : h.crossAxis), C = i.reference[f] + i.reference[b] + (v ? 0 : ((y = s.offset) == null ? void 0 : y[f]) || 0) - (v ? h.crossAxis : 0);
        m < x ? m = x : m > C && (m = C);
      }
      return {
        [d]: p,
        [f]: m
      };
    }
  };
}, wh = function(e) {
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
      } = Ct(e, t), c = await As(t, a), l = lt(n), u = In(n), f = cn(n) === "y", {
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
        const C = xe(c.left, 0), E = xe(c.right, 0), I = xe(c.top, 0), N = xe(c.bottom, 0);
        f ? v = d - 2 * (C !== 0 || E !== 0 ? C + E : xe(c.left, c.right)) : b = p - 2 * (I !== 0 || N !== 0 ? I + N : xe(c.top, c.bottom));
      }
      await s({
        ...t,
        availableWidth: v,
        availableHeight: b
      });
      const x = await o.getDimensions(i.floating);
      return d !== x.width || p !== x.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ft(e) {
  return Hu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function je(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Rt(e) {
  var t;
  return (t = (Hu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Hu(e) {
  return e instanceof Node || e instanceof je(e).Node;
}
function It(e) {
  return e instanceof Element || e instanceof je(e).Element;
}
function ht(e) {
  return e instanceof HTMLElement || e instanceof je(e).HTMLElement;
}
function xc(e) {
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
function Sh(e) {
  return ["table", "td", "th"].includes(Ft(e));
}
function Os(e) {
  const t = Ts(), n = Qe(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function xh(e) {
  let t = hn(e);
  for (; ht(t) && !uo(t); ) {
    if (Os(t))
      return t;
    t = hn(t);
  }
  return null;
}
function Ts() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function uo(e) {
  return ["html", "body", "#document"].includes(Ft(e));
}
function Qe(e) {
  return je(e).getComputedStyle(e);
}
function fo(e) {
  return It(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function hn(e) {
  if (Ft(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    xc(e) && e.host || // Fallback.
    Rt(e)
  );
  return xc(t) ? t.host : t;
}
function Uu(e) {
  const t = hn(e);
  return uo(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ht(t) && or(t) ? t : Uu(t);
}
function wt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Uu(e), i = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = je(o);
  return i ? t.concat(s, s.visualViewport || [], or(o) ? o : [], s.frameElement && n ? wt(s.frameElement) : []) : t.concat(o, wt(o, [], n));
}
function qu(e) {
  const t = Qe(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ht(e), i = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, a = kr(n) !== i || kr(r) !== s;
  return a && (n = i, r = s), {
    width: n,
    height: r,
    $: a
  };
}
function $s(e) {
  return It(e) ? e : e.contextElement;
}
function pn(e) {
  const t = $s(e);
  if (!ht(t))
    return Mt(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: i
  } = qu(t);
  let s = (i ? kr(n.width) : n.width) / r, a = (i ? kr(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
const Ch = /* @__PURE__ */ Mt(0);
function Ku(e) {
  const t = je(e);
  return !Ts() || !t.visualViewport ? Ch : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Ih(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== je(e) ? !1 : t;
}
function tn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), i = $s(e);
  let s = Mt(1);
  t && (r ? It(r) && (s = pn(r)) : s = pn(e));
  const a = Ih(i, n, r) ? Ku(i) : Mt(0);
  let c = (o.left + a.x) / s.x, l = (o.top + a.y) / s.y, u = o.width / s.x, f = o.height / s.y;
  if (i) {
    const d = je(i), p = r && It(r) ? je(r) : r;
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
function Eh(e) {
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
  }, a = Mt(1);
  const c = Mt(0);
  if ((o || !o && r !== "fixed") && ((Ft(n) !== "body" || or(i)) && (s = fo(n)), ht(n))) {
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
function Dh(e) {
  return Array.from(e.getClientRects());
}
function Yu(e) {
  return tn(Rt(e)).left + fo(e).scrollLeft;
}
function Rh(e) {
  const t = Rt(e), n = fo(e), r = e.ownerDocument.body, o = xe(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = xe(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Yu(e);
  const a = -n.scrollTop;
  return Qe(r).direction === "rtl" && (s += xe(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: i,
    x: s,
    y: a
  };
}
function Ph(e, t) {
  const n = je(e), r = Rt(e), o = n.visualViewport;
  let i = r.clientWidth, s = r.clientHeight, a = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    const l = Ts();
    (!l || l && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a,
    y: c
  };
}
function Ah(e, t) {
  const n = tn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, i = ht(e) ? pn(e) : Mt(1), s = e.clientWidth * i.x, a = e.clientHeight * i.y, c = o * i.x, l = r * i.y;
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
    r = Ph(e, n);
  else if (t === "document")
    r = Rh(Rt(e));
  else if (It(t))
    r = Ah(t, n);
  else {
    const o = Ku(e);
    r = {
      ...t,
      x: t.x - o.x,
      y: t.y - o.y
    };
  }
  return gn(r);
}
function Xu(e, t) {
  const n = hn(e);
  return n === t || !It(n) || uo(n) ? !1 : Qe(n).position === "fixed" || Xu(n, t);
}
function Nh(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = wt(e, [], !1).filter((a) => It(a) && Ft(a) !== "body"), o = null;
  const i = Qe(e).position === "fixed";
  let s = i ? hn(e) : e;
  for (; It(s) && !uo(s); ) {
    const a = Qe(s), c = Os(s);
    !c && a.position === "fixed" && (o = null), (i ? !c && !o : !c && a.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || or(s) && !c && Xu(e, s)) ? r = r.filter((u) => u !== s) : o = a, s = hn(s);
  }
  return t.set(e, r), r;
}
function Oh(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? Nh(t, this._c) : [].concat(n), r], a = s[0], c = s.reduce((l, u) => {
    const f = Cc(t, u, o);
    return l.top = xe(f.top, l.top), l.right = ct(f.right, l.right), l.bottom = ct(f.bottom, l.bottom), l.left = xe(f.left, l.left), l;
  }, Cc(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Th(e) {
  return qu(e);
}
function $h(e, t, n) {
  const r = ht(t), o = Rt(t), i = n === "fixed", s = tn(e, !0, i, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Mt(0);
  if (r || !r && !i)
    if ((Ft(t) !== "body" || or(o)) && (a = fo(t)), r) {
      const l = tn(t, !0, i, t);
      c.x = l.x + t.clientLeft, c.y = l.y + t.clientTop;
    } else
      o && (c.x = Yu(o));
  return {
    x: s.left + a.scrollLeft - c.x,
    y: s.top + a.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Ic(e, t) {
  return !ht(e) || Qe(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function Ju(e, t) {
  const n = je(e);
  if (!ht(e))
    return n;
  let r = Ic(e, t);
  for (; r && Sh(r) && Qe(r).position === "static"; )
    r = Ic(r, t);
  return r && (Ft(r) === "html" || Ft(r) === "body" && Qe(r).position === "static" && !Os(r)) ? n : r || xh(e) || n;
}
const _h = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: r
  } = e;
  const o = this.getOffsetParent || Ju, i = this.getDimensions;
  return {
    reference: $h(t, await o(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await i(n)
    }
  };
};
function Lh(e) {
  return Qe(e).direction === "rtl";
}
const kh = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Eh,
  getDocumentElement: Rt,
  getClippingRect: Oh,
  getOffsetParent: Ju,
  getElementRects: _h,
  getClientRects: Dh,
  getDimensions: Th,
  getScale: pn,
  isElement: It,
  isRTL: Lh
};
function Bh(e, t) {
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
      threshold: xe(0, ct(1, c)) || 1
    };
    let b = !0;
    function v(x) {
      const C = x[0].intersectionRatio;
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
function Mh(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = $s(e), u = o || i ? [...l ? wt(l) : [], ...wt(t)] : [];
  u.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), i && w.addEventListener("resize", n);
  });
  const f = l && a ? Bh(l, n) : null;
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
const Fh = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: kh,
    ...n
  }, i = {
    ...o.platform,
    _c: r
  };
  return hh(e, t, {
    ...o,
    platform: i
  });
}, Qu = (e) => {
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
      return r && t(r) ? r.current != null ? Sc({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Sc({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
};
var Dr = typeof document < "u" ? oo : V;
function Mr(e, t) {
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
        if (!Mr(e[r], t[r]))
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
      if (!(i === "_owner" && e.$$typeof) && !Mr(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Zu(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ec(e, t) {
  const n = Zu(e);
  return Math.round(t * n) / n;
}
function Dc(e) {
  const t = R.useRef(e);
  return Dr(() => {
    t.current = e;
  }), t;
}
function jh(e) {
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
  Mr(d, r) || p(r);
  const [m, g] = R.useState(null), [h, w] = R.useState(null), y = R.useCallback((P) => {
    P != C.current && (C.current = P, g(P));
  }, [g]), b = R.useCallback((P) => {
    P !== E.current && (E.current = P, w(P));
  }, [w]), v = i || m, x = s || h, C = R.useRef(null), E = R.useRef(null), I = R.useRef(u), N = Dc(c), $ = Dc(o), T = R.useCallback(() => {
    if (!C.current || !E.current)
      return;
    const P = {
      placement: t,
      strategy: n,
      middleware: d
    };
    $.current && (P.platform = $.current), Fh(C.current, E.current, P).then((F) => {
      const O = {
        ...F,
        isPositioned: !0
      };
      L.current && !Mr(I.current, O) && (I.current = O, lm.flushSync(() => {
        f(O);
      }));
    });
  }, [d, t, n, $]);
  Dr(() => {
    l === !1 && I.current.isPositioned && (I.current.isPositioned = !1, f((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [l]);
  const L = R.useRef(!1);
  Dr(() => (L.current = !0, () => {
    L.current = !1;
  }), []), Dr(() => {
    if (v && (C.current = v), x && (E.current = x), v && x) {
      if (N.current)
        return N.current(v, x, T);
      T();
    }
  }, [v, x, T, N]);
  const k = R.useMemo(() => ({
    reference: C,
    floating: E,
    setReference: y,
    setFloating: b
  }), [y, b]), A = R.useMemo(() => ({
    reference: v,
    floating: x
  }), [v, x]), _ = R.useMemo(() => {
    const P = {
      position: n,
      left: 0,
      top: 0
    };
    if (!A.floating)
      return P;
    const F = Ec(A.floating, u.x), O = Ec(A.floating, u.y);
    return a ? {
      ...P,
      transform: "translate(" + F + "px, " + O + "px)",
      ...Zu(A.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: F,
      top: O
    };
  }, [n, a, A.floating, u.x, u.y]);
  return R.useMemo(() => ({
    ...u,
    update: T,
    refs: k,
    elements: A,
    floatingStyles: _
  }), [u, T, k, A, _]);
}
var St = typeof document < "u" ? oo : V;
let hi = !1, Wh = 0;
const Rc = () => "floating-ui-" + Wh++;
function zh() {
  const [e, t] = R.useState(() => hi ? Rc() : void 0);
  return St(() => {
    e == null && t(Rc());
  }, []), R.useEffect(() => {
    hi || (hi = !0);
  }, []), e;
}
const Vh = R[/* @__PURE__ */ "useId".toString()], ed = Vh || zh;
function Gh() {
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
const Hh = /* @__PURE__ */ R.createContext(null), Uh = /* @__PURE__ */ R.createContext(null), td = () => {
  var e;
  return ((e = R.useContext(Hh)) == null ? void 0 : e.id) || null;
}, _s = () => R.useContext(Uh);
function Ot(e) {
  return (e == null ? void 0 : e.ownerDocument) || document;
}
function qh() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function Kh() {
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
  return Ot(e).defaultView || window;
}
function ft(e) {
  return e ? e instanceof Element || e instanceof po(e).Element : !1;
}
function nd(e) {
  return e ? e instanceof HTMLElement || e instanceof po(e).HTMLElement : !1;
}
function Yh(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = po(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Xh(e) {
  if (e.mozInputSource === 0 && e.isTrusted)
    return !0;
  const t = /Android/i;
  return (t.test(qh()) || t.test(Kh())) && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Jh(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType !== "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0;
}
function rd(e, t) {
  const n = ["mouse", "pen"];
  return t || n.push("", void 0), n.includes(e);
}
function Qh(e) {
  return "nativeEvent" in e;
}
function Ki(e, t) {
  if (!e || !t)
    return !1;
  const n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Yh(n)) {
    let r = t;
    for (; r; ) {
      if (e === r)
        return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function od(e) {
  return "data-floating-ui-" + e;
}
function Pc(e) {
  const t = W(e);
  return St(() => {
    t.current = e;
  }), t;
}
const Ac = /* @__PURE__ */ od("safe-polygon");
function Rr(e, t, n) {
  return n && !rd(n) ? 0 : typeof e == "number" ? e : e == null ? void 0 : e[t];
}
function Zh(e, t) {
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
  } = t, g = _s(), h = td(), w = Pc(f), y = Pc(u), b = R.useRef(), v = R.useRef(), x = R.useRef(), C = R.useRef(), E = R.useRef(!0), I = R.useRef(!1), N = R.useRef(() => {
  }), $ = R.useCallback(() => {
    var A;
    const _ = (A = o.current.openEvent) == null ? void 0 : A.type;
    return (_ == null ? void 0 : _.includes("mouse")) && _ !== "mousedown";
  }, [o]);
  R.useEffect(() => {
    if (!l)
      return;
    function A() {
      clearTimeout(v.current), clearTimeout(C.current), E.current = !0;
    }
    return i.on("dismiss", A), () => {
      i.off("dismiss", A);
    };
  }, [l, i]), R.useEffect(() => {
    if (!l || !w.current || !n)
      return;
    function A(P) {
      $() && r(!1, P);
    }
    const _ = Ot(a).documentElement;
    return _.addEventListener("mouseleave", A), () => {
      _.removeEventListener("mouseleave", A);
    };
  }, [a, n, r, l, w, o, $]);
  const T = R.useCallback(function(A, _) {
    _ === void 0 && (_ = !0);
    const P = Rr(y.current, "close", b.current);
    P && !x.current ? (clearTimeout(v.current), v.current = setTimeout(() => r(!1, A), P)) : _ && (clearTimeout(v.current), r(!1, A));
  }, [y, r]), L = R.useCallback(() => {
    N.current(), x.current = void 0;
  }, []), k = R.useCallback(() => {
    if (I.current) {
      const A = Ot(c.floating.current).body;
      A.style.pointerEvents = "", A.removeAttribute(Ac), I.current = !1;
    }
  }, [c]);
  return R.useEffect(() => {
    if (!l)
      return;
    function A() {
      return o.current.openEvent ? ["click", "mousedown"].includes(o.current.openEvent.type) : !1;
    }
    function _(O) {
      if (clearTimeout(v.current), E.current = !1, d && !rd(b.current) || p > 0 && Rr(y.current, "open") === 0)
        return;
      const G = Rr(y.current, "open", b.current);
      G ? v.current = setTimeout(() => {
        r(!0, O);
      }, G) : r(!0, O);
    }
    function P(O) {
      if (A())
        return;
      N.current();
      const G = Ot(a);
      if (clearTimeout(C.current), w.current) {
        n || clearTimeout(v.current), x.current = w.current({
          ...e,
          tree: g,
          x: O.clientX,
          y: O.clientY,
          onClose() {
            k(), L(), T(O);
          }
        });
        const ne = x.current;
        G.addEventListener("mousemove", ne), N.current = () => {
          G.removeEventListener("mousemove", ne);
        };
        return;
      }
      (b.current === "touch" ? !Ki(a, O.relatedTarget) : !0) && T(O);
    }
    function F(O) {
      A() || w.current == null || w.current({
        ...e,
        tree: g,
        x: O.clientX,
        y: O.clientY,
        onClose() {
          k(), L(), T(O);
        }
      })(O);
    }
    if (ft(s)) {
      const O = s;
      return n && O.addEventListener("mouseleave", F), a == null || a.addEventListener("mouseleave", F), m && O.addEventListener("mousemove", _, {
        once: !0
      }), O.addEventListener("mouseenter", _), O.addEventListener("mouseleave", P), () => {
        n && O.removeEventListener("mouseleave", F), a == null || a.removeEventListener("mouseleave", F), m && O.removeEventListener("mousemove", _), O.removeEventListener("mouseenter", _), O.removeEventListener("mouseleave", P);
      };
    }
  }, [s, a, l, e, d, p, m, T, L, k, r, n, g, y, w, o]), St(() => {
    var A;
    if (l && n && (A = w.current) != null && A.__options.blockPointerEvents && $()) {
      const F = Ot(a).body;
      if (F.setAttribute(Ac, ""), F.style.pointerEvents = "none", I.current = !0, ft(s) && a) {
        var _, P;
        const O = s, G = g == null || (_ = g.nodesRef.current.find((X) => X.id === h)) == null || (P = _.context) == null ? void 0 : P.elements.floating;
        return G && (G.style.pointerEvents = ""), O.style.pointerEvents = "auto", a.style.pointerEvents = "auto", () => {
          O.style.pointerEvents = "", a.style.pointerEvents = "";
        };
      }
    }
  }, [l, n, h, a, s, g, w, o, $]), St(() => {
    n || (b.current = void 0, L(), k());
  }, [n, L, k]), R.useEffect(() => () => {
    L(), clearTimeout(v.current), clearTimeout(C.current), k();
  }, [l, L, k]), R.useMemo(() => {
    if (!l)
      return {};
    function A(_) {
      b.current = _.pointerType;
    }
    return {
      reference: {
        onPointerDown: A,
        onPointerEnter: A,
        onMouseMove(_) {
          n || p === 0 || (clearTimeout(C.current), C.current = setTimeout(() => {
            E.current || r(!0, _.nativeEvent);
          }, p));
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(v.current);
        },
        onMouseLeave(_) {
          i.emit("dismiss", {
            type: "mouseLeave",
            data: {
              returnFocus: !1
            }
          }), T(_.nativeEvent, !1);
        }
      }
    };
  }, [i, l, p, n, r, T]);
}
const id = /* @__PURE__ */ R.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: () => {
  },
  setState: () => {
  },
  isInstantPhase: !1
}), sd = () => R.useContext(id), eb = (e) => {
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
  return St(() => {
    o.currentId ? s.current === null ? s.current = o.currentId : i({
      isInstantPhase: !0
    }) : (i({
      isInstantPhase: !1
    }), s.current = null);
  }, [o.currentId]), /* @__PURE__ */ R.createElement(id.Provider, {
    value: R.useMemo(() => ({
      ...o,
      setState: i,
      setCurrentId: a
    }), [o, i, a])
  }, t);
}, tb = (e, t) => {
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
  } = sd();
  St(() => {
    i && (c({
      delay: {
        open: 1,
        close: Rr(a, "close")
      }
    }), i !== o && r(!1));
  }, [o, r, c, i, a]), St(() => {
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
  }, [n, c, i, o, r, a, l]), St(() => {
    n && s(o);
  }, [n, s, o]);
};
function nb(e) {
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
function rb(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const ob = R[/* @__PURE__ */ "useInsertionEffect".toString()], ib = ob || ((e) => e());
function Pr(e) {
  const t = R.useRef(() => {
  });
  return ib(() => {
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
const sb = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, ab = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, cb = (e) => {
  var t, n;
  return {
    escapeKeyBubbles: typeof e == "boolean" ? e : (t = e == null ? void 0 : e.escapeKey) != null ? t : !1,
    outsidePressBubbles: typeof e == "boolean" ? e : (n = e == null ? void 0 : e.outsidePress) != null ? n : !0
  };
};
function lb(e, t) {
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
  } = t, y = _s(), b = td() != null, v = Pr(typeof d == "function" ? d : () => !1), x = typeof d == "function" ? v : d, C = R.useRef(!1), {
    escapeKeyBubbles: E,
    outsidePressBubbles: I
  } = cb(w), N = Pr((T) => {
    if (!n || !u || !f || T.key !== "Escape")
      return;
    const L = y ? bi(y.nodesRef.current, i) : [];
    if (!E && (T.stopPropagation(), L.length > 0)) {
      let k = !0;
      if (L.forEach((A) => {
        var _;
        if ((_ = A.context) != null && _.open && !A.context.dataRef.current.__escapeKeyBubbles) {
          k = !1;
          return;
        }
      }), !k)
        return;
    }
    o.emit("dismiss", {
      type: "escapeKey",
      data: {
        returnFocus: {
          preventScroll: !1
        }
      }
    }), r(!1, Qh(T) ? T.nativeEvent : T);
  }), $ = Pr((T) => {
    const L = C.current;
    if (C.current = !1, L || typeof x == "function" && !x(T))
      return;
    const k = rb(T);
    if (nd(k) && c) {
      const P = k.clientWidth > 0 && k.scrollWidth > k.clientWidth, F = k.clientHeight > 0 && k.scrollHeight > k.clientHeight;
      let O = F && T.offsetX > k.clientWidth;
      if (F && po(c).getComputedStyle(k).direction === "rtl" && (O = T.offsetX <= k.offsetWidth - k.clientWidth), O || P && T.offsetY > k.clientHeight)
        return;
    }
    const A = y && bi(y.nodesRef.current, i).some((P) => {
      var F;
      return Ar(T, (F = P.context) == null ? void 0 : F.elements.floating);
    });
    if (Ar(T, c) || Ar(T, a) || A)
      return;
    const _ = y ? bi(y.nodesRef.current, i) : [];
    if (_.length > 0) {
      let P = !0;
      if (_.forEach((F) => {
        var O;
        if ((O = F.context) != null && O.open && !F.context.dataRef.current.__outsidePressBubbles) {
          P = !1;
          return;
        }
      }), !P)
        return;
    }
    o.emit("dismiss", {
      type: "outsidePress",
      data: {
        returnFocus: b ? {
          preventScroll: !0
        } : Xh(T) || Jh(T)
      }
    }), r(!1, T);
  });
  return R.useEffect(() => {
    if (!n || !u)
      return;
    l.current.__escapeKeyBubbles = E, l.current.__outsidePressBubbles = I;
    function T(A) {
      r(!1, A);
    }
    const L = Ot(c);
    f && L.addEventListener("keydown", N), x && L.addEventListener(p, $);
    let k = [];
    return h && (ft(a) && (k = wt(a)), ft(c) && (k = k.concat(wt(c))), !ft(s) && s && s.contextElement && (k = k.concat(wt(s.contextElement)))), k = k.filter((A) => {
      var _;
      return A !== ((_ = L.defaultView) == null ? void 0 : _.visualViewport);
    }), k.forEach((A) => {
      A.addEventListener("scroll", T, {
        passive: !0
      });
    }), () => {
      f && L.removeEventListener("keydown", N), x && L.removeEventListener(p, $), k.forEach((A) => {
        A.removeEventListener("scroll", T);
      });
    };
  }, [l, c, a, s, f, x, p, n, r, h, u, E, I, N, $]), R.useEffect(() => {
    C.current = !1;
  }, [x, p]), R.useMemo(() => u ? {
    reference: {
      onKeyDown: N,
      [sb[g]]: (T) => {
        m && (o.emit("dismiss", {
          type: "referencePress",
          data: {
            returnFocus: !1
          }
        }), r(!1, T.nativeEvent));
      }
    },
    floating: {
      onKeyDown: N,
      [ab[p]]: () => {
        C.current = !0;
      }
    }
  } : {}, [u, o, m, p, g, r, N]);
}
function Ls(e) {
  var t;
  e === void 0 && (e = {});
  const {
    open: n = !1,
    onOpenChange: r,
    nodeId: o
  } = e, [i, s] = R.useState(null), a = ((t = e.elements) == null ? void 0 : t.reference) || i, c = jh(e), l = _s(), u = Pr((v, x) => {
    v && (d.current.openEvent = x), r == null || r(v, x);
  }), f = R.useRef(null), d = R.useRef({}), p = R.useState(() => Gh())[0], m = ed(), g = R.useCallback((v) => {
    const x = ft(v) ? {
      getBoundingClientRect: () => v.getBoundingClientRect(),
      contextElement: v
    } : v;
    c.refs.setReference(x);
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
  return St(() => {
    const v = l == null ? void 0 : l.nodesRef.current.find((x) => x.id === o);
    v && (v.context = b);
  }), R.useMemo(() => ({
    ...c,
    context: b,
    refs: w,
    elements: y
  }), [c, w, y, b]);
}
function ub(e, t) {
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
    const g = Ot(a).defaultView || window;
    function h() {
      !n && nd(c) && c === nb(Ot(c)) && (d.current = !0);
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
        const g = m.relatedTarget, h = ft(g) && g.hasAttribute(od("focus-guard")) && g.getAttribute("data-type") === "outside";
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
function db(e) {
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
function fb(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    floatingId: r
  } = e, {
    enabled: o = !0,
    role: i = "dialog"
  } = t, s = ed();
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
function ad(e, t) {
  if (e === "rtl" && (t.includes("right") || t.includes("left"))) {
    const [n, r] = t.split("-"), o = n === "right" ? "left" : "right";
    return r === void 0 ? o : `${o}-${r}`;
  }
  return t;
}
function Nc(e, t, n, r) {
  return e === "center" || r === "center" ? { top: t } : e === "end" ? { bottom: n } : e === "start" ? { top: n } : {};
}
function Oc(e, t, n, r, o) {
  return e === "center" || r === "center" ? { left: t } : e === "end" ? { [o === "ltr" ? "right" : "left"]: n } : e === "start" ? { [o === "ltr" ? "left" : "right"]: n } : {};
}
const pb = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function mb({
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
    [pb[c]]: D(r)
  }, f = D(-t / 2);
  return c === "left" ? {
    ...u,
    ...Nc(l, s, n, o),
    right: f,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  } : c === "right" ? {
    ...u,
    ...Nc(l, s, n, o),
    left: f,
    borderRightColor: "transparent",
    borderTopColor: "transparent"
  } : c === "top" ? {
    ...u,
    ...Oc(l, i, n, o, a),
    bottom: f,
    borderTopColor: "transparent",
    borderLeftColor: "transparent"
  } : c === "bottom" ? {
    ...u,
    ...Oc(l, i, n, o, a),
    top: f,
    borderBottomColor: "transparent",
    borderRightColor: "transparent"
  } : {};
}
const ks = ie(
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
    return i ? /* @__PURE__ */ S.createElement(
      "div",
      {
        ...l,
        ref: u,
        style: {
          ...c,
          ...mb({
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
ks.displayName = "@mantine/core/FloatingArrow";
const [gb, cd] = Vt(
  "Popover component was not found in the tree"
);
function ld({
  children: e,
  active: t = !0,
  refProp: n = "ref"
}) {
  const r = zm(t), o = Ne(r, e == null ? void 0 : e.ref);
  return zt(e) ? sn(e, { [n]: o }) : e;
}
ld.displayName = "@mantine/core/FocusTrap";
function hb(e) {
  const t = document.createElement("div");
  return t.setAttribute("data-portal", "true"), typeof e.className == "string" && t.classList.add(...e.className.split(" ").filter(Boolean)), typeof e.style == "object" && Object.assign(t.style, e.style), typeof e.id == "string" && t.setAttribute("id", e.id), t;
}
const bb = {}, ud = ie((e, t) => {
  const { children: n, target: r, ...o } = j("Portal", bb, e), [i, s] = U(!1), a = W(null);
  return tr(() => (s(!0), a.current = r ? typeof r == "string" ? document.querySelector(r) : r : hb(o), hu(t, a.current), !r && a.current && document.body.appendChild(a.current), () => {
    !r && a.current && document.body.removeChild(a.current);
  }), [r]), !i || !a.current ? null : um(/* @__PURE__ */ S.createElement(S.Fragment, null, n), a.current);
});
ud.displayName = "@mantine/core/Portal";
function mo({ withinPortal: e = !0, children: t, ...n }) {
  return e ? /* @__PURE__ */ S.createElement(ud, { ...n }, t) : /* @__PURE__ */ S.createElement(S.Fragment, null, t);
}
mo.displayName = "@mantine/core/OptionalPortal";
const Tn = (e) => ({
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
    ...Tn("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...Tn("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...Tn("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...Tn("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...Tn("top"),
    common: { transformOrigin: "top right" }
  }
}, Tc = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function yb({
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
    ...yr[e][Tc[t]]
  } : {} : {
    transitionProperty: e.transitionProperty,
    ...o,
    ...e.common,
    ...e[Tc[t]]
  };
}
function vb({
  duration: e,
  exitDuration: t,
  timingFunction: n,
  mounted: r,
  onEnter: o,
  onExit: i,
  onEntered: s,
  onExited: a
}) {
  const c = vt(), l = yu(), u = c.respectReducedMotion ? l : !1, [f, d] = U(u ? 0 : e), [p, m] = U(r ? "entered" : "exited"), g = W(-1), h = (w) => {
    const y = w ? o : i, b = w ? s : a;
    m(w ? "pre-entering" : "pre-exiting"), window.clearTimeout(g.current);
    const v = u ? 0 : w ? e : t;
    if (d(v), v === 0)
      typeof y == "function" && y(), typeof b == "function" && b(), m(w ? "entered" : "exited");
    else {
      const x = window.setTimeout(() => {
        typeof y == "function" && y(), m(w ? "entering" : "exiting");
      }, 10);
      g.current = window.setTimeout(() => {
        window.clearTimeout(x), typeof b == "function" && b(), m(w ? "entered" : "exited");
      }, v);
    }
  };
  return Lt(() => {
    h(r);
  }, [r]), V(() => () => window.clearTimeout(g.current), []), {
    transitionDuration: f,
    transitionStatus: p,
    transitionTimingFunction: n || "ease"
  };
}
function Bs({
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
  const { transitionDuration: f, transitionStatus: d, transitionTimingFunction: p } = vb({
    mounted: o,
    exitDuration: r,
    duration: n,
    timingFunction: s,
    onExit: a,
    onEntered: c,
    onEnter: l,
    onExited: u
  });
  return f === 0 ? o ? /* @__PURE__ */ S.createElement(S.Fragment, null, i({})) : e ? i({ display: "none" }) : null : d === "exited" ? e ? i({ display: "none" }) : null : /* @__PURE__ */ S.createElement(S.Fragment, null, i(
    yb({
      transition: t,
      duration: f,
      state: d,
      timingFunction: p
    })
  ));
}
Bs.displayName = "@mantine/core/Transition";
var dd = { dropdown: "m-38a85659", arrow: "m-a31dc6c1" };
const wb = {}, Ms = q((e, t) => {
  var h, w, y, b;
  const n = j("PopoverDropdown", wb, e), {
    className: r,
    style: o,
    vars: i,
    children: s,
    onKeyDownCapture: a,
    variant: c,
    classNames: l,
    styles: u,
    ...f
  } = n, d = cd(), p = Lm({
    opened: d.opened,
    shouldReturnFocus: d.returnFocus
  }), m = d.withRoles ? {
    "aria-labelledby": d.getTargetId(),
    id: d.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {}, g = Ne(t, d.floating);
  return d.disabled ? null : /* @__PURE__ */ S.createElement(mo, { ...d.portalProps, withinPortal: d.withinPortal }, /* @__PURE__ */ S.createElement(
    Bs,
    {
      mounted: d.opened,
      ...d.transitionProps,
      transition: ((h = d.transitionProps) == null ? void 0 : h.transition) || "fade",
      duration: ((w = d.transitionProps) == null ? void 0 : w.duration) ?? 150,
      keepMounted: d.keepMounted,
      exitDuration: typeof ((y = d.transitionProps) == null ? void 0 : y.exitDuration) == "number" ? d.transitionProps.exitDuration : (b = d.transitionProps) == null ? void 0 : b.duration
    },
    (v) => /* @__PURE__ */ S.createElement(ld, { active: d.trapFocus }, /* @__PURE__ */ S.createElement(
      H,
      {
        ...m,
        ...f,
        variant: c,
        ref: g,
        onKeyDownCapture: Dm(d.onClose, {
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
      /* @__PURE__ */ S.createElement(
        ks,
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
Ms.classes = dd;
Ms.displayName = "@mantine/core/PopoverDropdown";
const Sb = {
  refProp: "ref",
  popupType: "dialog"
}, fd = q((e, t) => {
  const { children: n, refProp: r, popupType: o, ...i } = j(
    "PopoverTarget",
    Sb,
    e
  );
  if (!zt(n))
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const s = i, a = cd(), c = Ne(a.reference, n.ref, t), l = a.withRoles ? {
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
fd.displayName = "@mantine/core/PopoverTarget";
function pd({
  opened: e,
  floating: t,
  position: n,
  positionDependencies: r
}) {
  const [o, i] = U(0);
  V(() => {
    if (t.refs.reference.current && t.refs.floating.current)
      return Mh(
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
  ]), Lt(() => {
    t.update();
  }, r), Lt(() => {
    i((s) => s + 1);
  }, [e]);
}
function xb(e, t) {
  var r, o, i, s;
  const n = [Gu(e.offset)];
  return (r = e.middlewares) != null && r.shift && n.push(Ns({ limiter: vh() })), (o = e.middlewares) != null && o.flip && n.push(Wu()), (i = e.middlewares) != null && i.inline && n.push(Vu()), n.push(Qu({ element: e.arrowRef, padding: e.arrowOffset })), ((s = e.middlewares) != null && s.size || e.width === "target") && n.push(
    wh({
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
function Cb(e) {
  const [t, n] = kt({
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
  }, i = Ls({
    placement: e.position,
    middleware: xb(e, () => i)
  });
  return pd({
    opened: e.opened,
    position: e.position,
    positionDependencies: e.positionDependencies || [],
    floating: i
  }), Lt(() => {
    var s;
    (s = e.onPositionChange) == null || s.call(e, i.placement);
  }, [i.placement]), Lt(() => {
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
const Ib = {
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
}, Eb = (e, { radius: t, shadow: n }) => ({
  dropdown: {
    "--popover-radius": t === void 0 ? void 0 : bt(t),
    "--popover-shadow": Pm(n)
  }
});
function dt(e) {
  var Pt, qe, De, ge, At, qt;
  const t = j("Popover", Ib, e), {
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
    portalProps: x,
    closeOnEscape: C,
    clickOutsideEvents: E,
    trapFocus: I,
    onClose: N,
    onOpen: $,
    onChange: T,
    zIndex: L,
    radius: k,
    shadow: A,
    id: _,
    defaultOpened: P,
    __staticSelector: F,
    withRoles: O,
    disabled: G,
    returnFocus: X,
    variant: ne,
    keepMounted: ve,
    vars: le,
    ...Oe
  } = t, we = te({
    name: F,
    props: t,
    classes: dd,
    classNames: w,
    styles: y,
    unstyled: h,
    rootSelector: "dropdown",
    vars: le,
    varsResolver: Eb
  }), re = W(null), [Se, ke] = U(null), [Ie, Ee] = U(null), { dir: Be } = nr(), ae = Gt(_), Y = Cb({
    middlewares: u,
    width: l,
    position: ad(Be, r),
    offset: typeof o == "number" ? o + (f ? d / 2 : 0) : o,
    arrowRef: re,
    arrowOffset: p,
    onPositionChange: i,
    positionDependencies: s,
    opened: a,
    defaultOpened: P,
    onChange: T,
    onOpen: $,
    onClose: N
  });
  Om(() => b && Y.onClose(), E, [
    Se,
    Ie
  ]);
  const ln = Q(
    (se) => {
      ke(se), Y.floating.refs.setReference(se);
    },
    [Y.floating.refs.setReference]
  ), Ue = Q(
    (se) => {
      Ee(se), Y.floating.refs.setFloating(se);
    },
    [Y.floating.refs.setFloating]
  );
  return /* @__PURE__ */ S.createElement(
    gb,
    {
      value: {
        returnFocus: X,
        disabled: G,
        controlled: Y.controlled,
        reference: ln,
        floating: Ue,
        x: Y.floating.x,
        y: Y.floating.y,
        arrowX: (De = (qe = (Pt = Y.floating) == null ? void 0 : Pt.middlewareData) == null ? void 0 : qe.arrow) == null ? void 0 : De.x,
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
        trapFocus: I,
        withinPortal: v,
        portalProps: x,
        zIndex: L,
        radius: k,
        shadow: A,
        closeOnEscape: C,
        onClose: Y.onClose,
        onToggle: Y.onToggle,
        getTargetId: () => `${ae}-target`,
        getDropdownId: () => `${ae}-dropdown`,
        withRoles: O,
        targetProps: Oe,
        __staticSelector: F,
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
dt.Target = fd;
dt.Dropdown = Ms;
dt.displayName = "@mantine/core/Popover";
dt.extend = (e) => e;
var it = { root: "m-5ae2e3c", barsLoader: "m-7a2bd4cd", bar: "m-870bb79", "bars-loader-animation": "m-5d2b3b9d", dotsLoader: "m-4e3f22d7", dot: "m-870c4af", "loader-dots-animation": "m-aac34a1", ovalLoader: "m-b34414df", "oval-loader-animation": "m-f8e89c4b" };
const Db = ie(({ className: e, ...t }, n) => /* @__PURE__ */ S.createElement(H, { component: "span", className: yt(it.barsLoader, e), ...t, ref: n }, /* @__PURE__ */ S.createElement("span", { className: it.bar }), /* @__PURE__ */ S.createElement("span", { className: it.bar }), /* @__PURE__ */ S.createElement("span", { className: it.bar }))), Rb = ie(({ className: e, ...t }, n) => /* @__PURE__ */ S.createElement(H, { component: "span", className: yt(it.dotsLoader, e), ...t, ref: n }, /* @__PURE__ */ S.createElement("span", { className: it.dot }), /* @__PURE__ */ S.createElement("span", { className: it.dot }), /* @__PURE__ */ S.createElement("span", { className: it.dot }))), Pb = ie(({ className: e, ...t }, n) => /* @__PURE__ */ S.createElement(H, { component: "span", className: yt(it.ovalLoader, e), ...t, ref: n })), md = {
  bars: Db,
  oval: Pb,
  dots: Rb
}, Ab = {
  loaders: md,
  type: "oval"
}, Nb = (e, { size: t, color: n }) => ({
  root: {
    "--loader-size": fe(t, "loader-size"),
    "--loader-color": n ? Bt(n, e) : void 0
  }
}), go = q((e, t) => {
  const n = j("Loader", Ab, e), {
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
    varsResolver: Nb
  });
  return m ? /* @__PURE__ */ S.createElement(H, { ...h("root"), ref: t, ...g }, m) : /* @__PURE__ */ S.createElement(
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
go.defaultLoaders = md;
go.classes = it;
go.displayName = "@mantine/core/Loader";
var ho = { root: "m-8d3f4000", loader: "m-302b9fb1", group: "m-1a0f1b21" };
const $c = {
  orientation: "horizontal"
}, Ob = (e, { borderWidth: t }) => ({
  group: { "--ai-border-width": D(t) }
}), Fs = q((e, t) => {
  const n = j("ActionIconGroup", $c, e), {
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
  } = j("ActionIconGroup", $c, e), p = te({
    name: "ActionIconGroup",
    props: n,
    classes: ho,
    className: r,
    style: o,
    classNames: i,
    styles: s,
    unstyled: a,
    vars: l,
    varsResolver: Ob,
    rootSelector: "group"
  });
  return /* @__PURE__ */ S.createElement(
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
Fs.classes = ho;
Fs.displayName = "@mantine/core/ActionIconGroup";
const Tb = {}, $b = (e, { size: t, radius: n, variant: r, gradient: o, color: i }) => {
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
  const n = j("ActionIcon", Tb, e), {
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
  } = n, x = te({
    name: ["ActionIcon", m],
    props: n,
    className: r,
    style: c,
    classes: ho,
    classNames: s,
    styles: a,
    unstyled: o,
    vars: h,
    varsResolver: $b
  });
  return /* @__PURE__ */ S.createElement(
    Cn,
    {
      ...x("root", { active: !y && !l && !b }),
      ...v,
      unstyled: o,
      variant: i,
      size: f,
      disabled: y || l,
      ref: t,
      mod: { loading: l, disabled: y || b }
    },
    l ? /* @__PURE__ */ S.createElement(
      go,
      {
        ...x("loader"),
        color: "var(--ai-color)",
        size: "calc(var(--ai-size) * 0.55)",
        ...u
      }
    ) : w
  );
});
bo.classes = ho;
bo.displayName = "@mantine/core/ActionIcon";
bo.Group = Fs;
const gd = ie(
  ({ size: e = "var(--cb-icon-size, 70%)", style: t, ...n }, r) => /* @__PURE__ */ S.createElement(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...t, width: e, height: e },
      ref: r,
      ...n
    },
    /* @__PURE__ */ S.createElement(
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
gd.displayName = "@mantine/core/CloseIcon";
var hd = { root: "m-86a44da5", "root--subtle": "m-220c80f2" };
const _b = {
  variant: "subtle"
}, Lb = (e, { size: t, radius: n, iconSize: r }) => ({
  root: {
    "--cb-size": fe(t, "cb-size"),
    "--cb-radius": n === void 0 ? void 0 : bt(n),
    "--cb-icon-size": D(r)
  }
}), yo = an((e, t) => {
  const n = j("CloseButton", _b, e), {
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
    classes: hd,
    classNames: c,
    styles: u,
    unstyled: f,
    vars: i,
    varsResolver: Lb
  });
  return /* @__PURE__ */ S.createElement(
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
    /* @__PURE__ */ S.createElement(gd, null),
    o
  );
});
yo.classes = hd;
yo.displayName = "@mantine/core/CloseButton";
function kb(e) {
  return am.toArray(e).filter(Boolean);
}
var bd = { root: "m-4081bf90" };
const Bb = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, Mb = (e, { grow: t, preventGrowOverflow: n, gap: r, align: o, justify: i, wrap: s }, { childWidth: a }) => ({
  root: {
    "--group-child-width": t && n ? a : void 0,
    "--group-gap": uu(r),
    "--group-align": o,
    "--group-justify": i,
    "--group-wrap": s
  }
}), jn = q((e, t) => {
  const n = j("Group", Bb, e), {
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
  } = n, b = kb(c), v = b.length, x = uu(l ?? "md"), E = { childWidth: `calc(${100 / v}% - (${x} - ${x} / ${v}))` }, I = te({
    name: "Group",
    props: n,
    stylesCtx: E,
    className: o,
    style: i,
    classes: bd,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: g,
    varsResolver: Mb
  });
  return /* @__PURE__ */ S.createElement(
    H,
    {
      ...I("root"),
      ref: t,
      variant: h,
      mod: { grow: p },
      size: w,
      ...y
    },
    b
  );
});
jn.classes = bd;
jn.displayName = "@mantine/core/Group";
const [Fb, ir] = ms({
  offsetBottom: !1,
  offsetTop: !1,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0
});
var tt = { wrapper: "m-6c018570", input: "m-8fb7ebe7", section: "m-82577fc2", placeholder: "m-88bacfd0", root: "m-46b77525", label: "m-8fdc1311", required: "m-78a94662", error: "m-8f816625", description: "m-fe47ce59" };
const _c = {}, jb = (e, { size: t }) => ({
  description: {
    "--input-description-size": t === void 0 ? void 0 : `calc(${gt(t)} - ${D(2)})`
  }
}), vo = q((e, t) => {
  const n = j("InputDescription", _c, e), {
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
  } = j("InputDescription", _c, n), m = ir(), g = te({
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
    varsResolver: jb
  }), h = f && (m == null ? void 0 : m.getStyles) || g;
  return /* @__PURE__ */ S.createElement(
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
const Wb = {}, zb = (e, { size: t }) => ({
  error: {
    "--input-error-size": t === void 0 ? void 0 : `calc(${gt(t)} - ${D(2)})`
  }
}), wo = q((e, t) => {
  const n = j("InputError", Wb, e), {
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
    varsResolver: zb
  }), g = ir(), h = f && (g == null ? void 0 : g.getStyles) || m;
  return /* @__PURE__ */ S.createElement(
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
const Lc = {
  labelElement: "label"
}, Vb = (e, { size: t }) => ({
  label: {
    "--input-label-size": gt(t),
    "--input-asterisk-color": void 0
  }
}), So = q((e, t) => {
  const n = j("InputLabel", Lc, e), {
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
  } = j("InputLabel", Lc, n), y = te({
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
    varsResolver: Vb
  }), b = ir(), v = (b == null ? void 0 : b.getStyles) || y;
  return /* @__PURE__ */ S.createElement(
    H,
    {
      ...v("label"),
      component: l,
      variant: h,
      size: u,
      ref: t,
      htmlFor: l === "label" ? d : void 0,
      mod: { required: f },
      onMouseDown: (x) => {
        p == null || p(x), !x.defaultPrevented && x.detail > 1 && x.preventDefault();
      },
      ...w
    },
    m,
    f && /* @__PURE__ */ S.createElement("span", { ...v("required"), "aria-hidden": !0 }, " *")
  );
});
So.classes = tt;
So.displayName = "@mantine/core/InputLabel";
const kc = {}, js = q((e, t) => {
  const n = j("InputPlaceholder", kc, e), {
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
  } = j("InputPlaceholder", kc, n), p = te({
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
  return /* @__PURE__ */ S.createElement(
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
function Gb(e, { hasDescription: t, hasError: n }) {
  const r = e.findIndex((c) => c === "input"), o = e[r - 1], i = e[r + 1];
  return { offsetBottom: t && i === "description" || n && i === "error", offsetTop: t && o === "description" || n && o === "error" };
}
const Hb = {
  labelElement: "label",
  inputContainer: (e) => e,
  inputWrapperOrder: ["label", "description", "input", "error"]
}, Ub = (e, { size: t }) => ({
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
}), Ws = q((e, t) => {
  const n = j("InputWrapper", Hb, e), {
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
    children: x,
    withAsterisk: C,
    id: E,
    required: I,
    __stylesApiProps: N,
    ...$
  } = n, T = te({
    name: ["InputWrapper", f],
    props: N || n,
    classes: tt,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Ub
  }), L = {
    size: l,
    variant: u,
    __staticSelector: f
  }, k = Gt(E), A = typeof C == "boolean" ? C : I, _ = (b == null ? void 0 : b.id) || `${k}-error`, P = (y == null ? void 0 : y.id) || `${k}-description`, F = k, O = !!g && typeof g != "boolean", G = !!h, X = `${O ? _ : ""} ${G ? P : ""}`, ne = X.trim().length > 0 ? X.trim() : void 0, ve = (w == null ? void 0 : w.id) || `${k}-label`, le = m && /* @__PURE__ */ S.createElement(
    So,
    {
      key: "label",
      labelElement: v,
      id: ve,
      htmlFor: F,
      required: A,
      ...L,
      ...w
    },
    m
  ), Oe = G && /* @__PURE__ */ S.createElement(
    vo,
    {
      key: "description",
      ...y,
      ...L,
      size: (y == null ? void 0 : y.size) || L.size,
      id: (y == null ? void 0 : y.id) || P
    },
    h
  ), we = /* @__PURE__ */ S.createElement(S.Fragment, { key: "input" }, d(x)), re = O && /* @__PURE__ */ S.createElement(
    wo,
    {
      ...b,
      ...L,
      size: (b == null ? void 0 : b.size) || L.size,
      key: "error",
      id: (b == null ? void 0 : b.id) || _
    },
    g
  ), Se = p.map((ke) => {
    switch (ke) {
      case "label":
        return le;
      case "input":
        return we;
      case "description":
        return Oe;
      case "error":
        return re;
      default:
        return null;
    }
  });
  return /* @__PURE__ */ S.createElement(
    Fb,
    {
      value: {
        getStyles: T,
        describedBy: ne,
        inputId: F,
        labelId: ve,
        ...Gb(p, { hasDescription: G, hasError: O })
      }
    },
    /* @__PURE__ */ S.createElement(
      H,
      {
        ref: t,
        variant: u,
        size: l,
        mod: { error: !!g },
        ...T("root"),
        ...$
      },
      Se
    )
  );
});
Ws.classes = tt;
Ws.displayName = "@mantine/core/InputWrapper";
const qb = {
  variant: "default",
  leftSectionPointerEvents: "none",
  rightSectionPointerEvents: "none",
  withAria: !0,
  withErrorStyles: !0
}, Kb = (e, t, n) => ({
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
  const n = j("Input", qb, e), {
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
    rightSectionPointerEvents: x,
    leftSectionPointerEvents: C,
    variant: E,
    vars: I,
    pointer: N,
    multiline: $,
    radius: T,
    id: L,
    withAria: k,
    withErrorStyles: A,
    ..._
  } = n, { styleProps: P, rest: F } = co(_), O = ir(), G = { offsetBottom: O == null ? void 0 : O.offsetBottom, offsetTop: O == null ? void 0 : O.offsetTop }, X = te({
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
    vars: I,
    varsResolver: Kb
  }), ne = k ? {
    required: c,
    disabled: m,
    "aria-invalid": !!p,
    "aria-describedby": O == null ? void 0 : O.describedBy,
    id: (O == null ? void 0 : O.inputId) || L
  } : {};
  return /* @__PURE__ */ S.createElement(
    H,
    {
      ...X("wrapper"),
      ...P,
      ...d,
      mod: {
        error: !!p && A,
        pointer: N,
        disabled: m,
        multiline: $,
        "data-with-right-section": !!y,
        "data-with-left-section": !!g
      },
      variant: E,
      size: f
    },
    g && /* @__PURE__ */ S.createElement(
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
    /* @__PURE__ */ S.createElement(
      H,
      {
        component: "input",
        ...F,
        ...ne,
        ref: t,
        required: c,
        mod: { disabled: m, error: !!p && A },
        variant: E,
        ...X("input")
      }
    ),
    y && /* @__PURE__ */ S.createElement(
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
Ze.Wrapper = Ws;
Ze.Label = So;
Ze.Error = wo;
Ze.Description = vo;
Ze.Placeholder = js;
Ze.displayName = "@mantine/core/Input";
function Yb(e, t, n) {
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
    inputContainer: x,
    inputWrapperOrder: C,
    withAsterisk: E,
    variant: I,
    vars: N,
    ...$
  } = r, { styleProps: T, rest: L } = co($), k = {
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
    inputContainer: x,
    inputWrapperOrder: C,
    withAsterisk: E,
    variant: I,
    id: y,
    ...w
  };
  return {
    ...L,
    classNames: c,
    styles: l,
    unstyled: f,
    wrapperProps: { ...k, ...T },
    inputProps: {
      required: a,
      classNames: c,
      styles: l,
      unstyled: f,
      size: b,
      __staticSelector: d,
      __stylesApiProps: p || r,
      error: s,
      variant: I,
      id: y
    }
  };
}
const Xb = {
  __staticSelector: "InputBase",
  withAria: !0
}, Ht = an((e, t) => {
  const { inputProps: n, wrapperProps: r, ...o } = Yb("InputBase", Xb, e);
  return /* @__PURE__ */ S.createElement(Ze.Wrapper, { ...r }, /* @__PURE__ */ S.createElement(Ze, { ...n, ...o, ref: t }));
});
Ht.classes = { ...Ze.classes, ...Ze.Wrapper.classes };
Ht.displayName = "@mantine/core/InputBase";
const [Jb, zs] = Vt(
  "Accordion component was not found in the tree"
);
function Vs({ style: e, size: t = 16, ...n }) {
  return /* @__PURE__ */ S.createElement(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...e, width: D(t), height: D(t), display: "block" },
      ...n
    },
    /* @__PURE__ */ S.createElement(
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
Vs.displayName = "@mantine/core/AccordionChevron";
const [Qb, yd] = Vt("Accordion.Item component was not found in the tree");
var sr = { root: "m-9bdbb667", panel: "m-df78851f", content: "m-4ba554d4", itemTitle: "m-8fa820a0", control: "m-4ba585b8", "control--default": "m-6939a5e9", "control--contained": "m-4271d21b", label: "m-df3ffa0f", chevron: "m-3f35ae96", icon: "m-9bd771fe", item: "m-9bd7b098", "item--default": "m-fe19b709", "item--contained": "m-1f921b3b", "item--filled": "m-2cdf939a", "item--separated": "m-9f59b069" };
const Zb = {}, Gs = q((e, t) => {
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
  } = j("AccordionControl", Zb, e), { value: m } = yd(), g = zs(), h = g.isItemActive(m), w = typeof g.order == "number", y = `h${g.order}`, b = /* @__PURE__ */ S.createElement(
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
      onKeyDown: lu({
        siblingSelector: "[data-accordion-control]",
        parentSelector: "[data-accordion]",
        activateOnFocus: !1,
        loop: g.loop,
        orientation: "vertical",
        onKeyDown: u
      })
    },
    /* @__PURE__ */ S.createElement(
      H,
      {
        component: "span",
        mod: { rotate: !g.disableChevronRotation && h, position: g.chevronPosition },
        ...g.getStyles("chevron", { classNames: n, styles: i })
      },
      a || g.chevron
    ),
    /* @__PURE__ */ S.createElement("span", { ...g.getStyles("label", { classNames: n, styles: i }) }, f),
    c && /* @__PURE__ */ S.createElement(
      H,
      {
        component: "span",
        mod: { "chevron-position": g.chevronPosition },
        ...g.getStyles("icon", { classNames: n, styles: i })
      },
      c
    )
  );
  return w ? /* @__PURE__ */ S.createElement(y, { ...g.getStyles("itemTitle", { classNames: n, styles: i }) }, b) : b;
});
Gs.displayName = "@mantine/core/AccordionControl";
Gs.classes = sr;
const ey = {}, Hs = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, value: a, ...c } = j(
    "AccordionItem",
    ey,
    e
  ), l = zs();
  return /* @__PURE__ */ S.createElement(Qb, { value: { value: a } }, /* @__PURE__ */ S.createElement(
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
const ty = {}, Us = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, children: a, ...c } = j(
    "AccordionPanel",
    ty,
    e
  ), { value: l } = yd(), u = zs();
  return /* @__PURE__ */ S.createElement(
    Nu,
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
    /* @__PURE__ */ S.createElement("div", { ...u.getStyles("content", { classNames: n, styles: i }) }, a)
  );
});
Us.displayName = "@mantine/core/AccordionPanel";
Us.classes = sr;
const ny = {
  multiple: !1,
  disableChevronRotation: !1,
  chevronPosition: "right",
  variant: "default",
  chevron: /* @__PURE__ */ S.createElement(Vs, null)
}, ry = (e, { transitionDuration: t, chevronSize: n, radius: r }) => ({
  root: {
    "--accordion-transition-duration": t === void 0 ? void 0 : `${t}ms`,
    "--accordion-chevron-size": n === void 0 ? void 0 : D(n),
    "--accordion-radius": r === void 0 ? void 0 : bt(r)
  }
});
function oe(e) {
  const t = j("Accordion", ny, e), {
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
    variant: x,
    radius: C,
    ...E
  } = t, I = Gt(p), [N, $] = kt({
    value: u,
    defaultValue: f,
    finalValue: l ? [] : null,
    onChange: d
  }), T = (A) => Array.isArray(N) ? N.includes(A) : A === N, L = (A) => {
    const _ = Array.isArray(N) ? N.includes(A) ? N.filter((P) => P !== A) : [...N, A] : A === N ? null : A;
    $(_);
  }, k = te({
    name: "Accordion",
    classes: sr,
    props: t,
    className: r,
    style: o,
    classNames: n,
    styles: i,
    unstyled: s,
    vars: a,
    varsResolver: ry
  });
  return /* @__PURE__ */ S.createElement(
    Jb,
    {
      value: {
        isItemActive: T,
        onChange: L,
        getControlId: Tr(
          `${I}-control`,
          "Accordion.Item component was rendered with invalid value or without value"
        ),
        getRegionId: Tr(
          `${I}-panel`,
          "Accordion.Item component was rendered with invalid value or without value"
        ),
        transitionDuration: g,
        disableChevronRotation: h,
        chevronPosition: w,
        order: b,
        chevron: v,
        loop: m,
        getStyles: k,
        variant: x,
        unstyled: s
      }
    },
    /* @__PURE__ */ S.createElement(H, { ...k("root"), id: I, ...E, variant: x, "data-accordion": !0 }, c)
  );
}
const oy = (e) => e;
oe.extend = oy;
oe.classes = sr;
oe.displayName = "@mantine/core/Accordion";
oe.Item = Hs;
oe.Panel = Us;
oe.Control = Gs;
oe.Chevron = Vs;
var vd = { root: "m-b6d8b162" };
function iy(e) {
  if (e === "start")
    return "start";
  if (e === "end" || e)
    return "end";
}
const sy = {
  inherit: !1
}, ay = (e, { variant: t, lineClamp: n, gradient: r, size: o, color: i }) => ({
  root: {
    "--text-fz": gt(o),
    "--text-lh": Rm(o),
    "--text-gradient": t === "gradient" ? Vi(r, e) : void 0,
    "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
    "--text-color": i ? Bt(i, e) : void 0
  }
}), Xe = an((e, t) => {
  const n = j("Text", sy, e), {
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
    classes: vd,
    className: f,
    style: d,
    classNames: p,
    styles: m,
    unstyled: g,
    vars: u,
    varsResolver: ay
  });
  return /* @__PURE__ */ S.createElement(
    H,
    {
      ...v("root", { focusable: !0 }),
      ref: t,
      component: c ? "span" : "p",
      variant: h,
      mod: [
        {
          "data-truncate": iy(o),
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
Xe.classes = vd;
Xe.displayName = "@mantine/core/Text";
function wd(e) {
  return typeof e == "string" ? { value: e, label: e } : typeof e == "number" ? { value: e.toString(), label: e.toString() } : "group" in e ? {
    group: e.group,
    items: e.items.map((t) => wd(t))
  } : e;
}
function Sd(e) {
  return e ? e.map(wd) : [];
}
function qs(e) {
  return e.reduce((t, n) => "group" in n ? { ...t, ...qs(n.items) } : (t[n.value] = n, t), {});
}
var Ae = { dropdown: "m-88b62a41", options: "m-b2821a6e", option: "m-92253aa5", search: "m-985517d8", empty: "m-2530cd1d", header: "m-858f94bd", footer: "m-82b967cb", group: "m-254f3e4f", groupLabel: "m-2bb2e9e5", chevron: "m-2943220b", optionsDropdownScrollArea: "m-71d052f9", optionsDropdownOption: "m-390b5f4", optionsDropdownCheckIcon: "m-8ee53fc2" };
const cy = {
  error: null
}, ly = (e, { size: t }) => ({
  chevron: {
    "--combobox-chevron-size": fe(t, "combobox-chevron-size")
  }
}), Ks = q((e, t) => {
  const n = j("ComboboxChevron", cy, e), { size: r, error: o, style: i, className: s, classNames: a, styles: c, unstyled: l, vars: u, ...f } = n, d = te({
    name: "ComboboxChevron",
    classes: Ae,
    props: n,
    style: i,
    className: s,
    classNames: a,
    styles: c,
    unstyled: l,
    vars: u,
    varsResolver: ly,
    rootSelector: "chevron"
  });
  return /* @__PURE__ */ S.createElement(
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
    /* @__PURE__ */ S.createElement(
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
const [uy, nt] = Vt(
  "Combobox component was not found in tree"
), xd = ie(
  ({ size: e, onMouseDown: t, onClick: n, onClear: r, ...o }, i) => /* @__PURE__ */ S.createElement(
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
xd.displayName = "@mantine/core/ComboboxClearButton";
const dy = {}, Ys = q((e, t) => {
  const { classNames: n, styles: r, className: o, style: i, hidden: s, ...a } = j(
    "ComboboxDropdown",
    dy,
    e
  ), c = nt();
  return /* @__PURE__ */ S.createElement(
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
const fy = {
  refProp: "ref"
}, Cd = q((e, t) => {
  const { children: n, refProp: r } = j("ComboboxDropdownTarget", fy, e);
  if (nt(), !zt(n))
    throw new Error(
      "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  return /* @__PURE__ */ S.createElement(dt.Target, { ref: t, refProp: r }, n);
});
Cd.displayName = "@mantine/core/ComboboxDropdownTarget";
const py = {}, Xs = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, ...a } = j(
    "ComboboxEmpty",
    py,
    e
  ), c = nt();
  return /* @__PURE__ */ S.createElement(
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
const my = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1
}, Id = q((e, t) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: i,
    withExpandedAttribute: s,
    targetType: a,
    ...c
  } = j("ComboboxEventsTarget", my, e);
  if (!zt(n))
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
    [r]: Ne(t, l.store.targetRef, n == null ? void 0 : n.ref)
  });
});
Id.displayName = "@mantine/core/ComboboxEventsTarget";
const gy = {}, Qs = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, ...a } = j(
    "ComboboxFooter",
    gy,
    e
  ), c = nt();
  return /* @__PURE__ */ S.createElement(
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
const hy = {}, Zs = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, children: a, label: c, ...l } = j(
    "ComboboxGroup",
    hy,
    e
  ), u = nt();
  return /* @__PURE__ */ S.createElement(
    H,
    {
      ref: t,
      ...u.getStyles("group", { className: r, classNames: n, style: o, styles: i }),
      ...l
    },
    c && /* @__PURE__ */ S.createElement("div", { ...u.getStyles("groupLabel", { classNames: n, styles: i }) }, c),
    a
  );
});
Zs.classes = Ae;
Zs.displayName = "@mantine/core/ComboboxGroup";
const by = {}, ea = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, ...a } = j(
    "ComboboxHeader",
    by,
    e
  ), c = nt();
  return /* @__PURE__ */ S.createElement(
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
const yy = {}, ta = q((e, t) => {
  const n = j("ComboboxOption", yy, e), {
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
  } = n, h = nt(), w = nu(), y = l || w;
  return /* @__PURE__ */ S.createElement(
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
const vy = {}, na = q((e, t) => {
  const n = j("ComboboxOptions", vy, e), { classNames: r, className: o, style: i, styles: s, id: a, onMouseDown: c, labelledBy: l, ...u } = n, f = nt(), d = Gt(a);
  return V(() => {
    f.store.setListId(d);
  }, [d]), /* @__PURE__ */ S.createElement(
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
const wy = {
  withAriaAttributes: !0,
  withKeyboardNavigation: !0
}, ra = q((e, t) => {
  const n = j("ComboboxSearch", wy, e), {
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
  return /* @__PURE__ */ S.createElement(
    Ze,
    {
      ref: Ne(t, d.store.searchRef),
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
const Sy = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1
}, Ed = q((e, t) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: i,
    withExpandedAttribute: s,
    targetType: a,
    ...c
  } = j("ComboboxTarget", Sy, e);
  if (!zt(n))
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
  return /* @__PURE__ */ S.createElement(dt.Target, { ref: Ne(t, l.store.targetRef) }, f);
});
Ed.displayName = "@mantine/core/ComboboxTarget";
function xy(e, t, n) {
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
function Cy(e, t, n) {
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
function Iy(e) {
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
  const [a, c] = kt({
    value: t,
    defaultValue: e,
    finalValue: !1,
    onChange: n
  }), l = W(null), u = W(-1), f = W(null), d = W(null), p = W(-1), m = W(-1), g = W(-1), h = Q(
    (P = "unknown") => {
      a || (c(!0), o == null || o(P));
    },
    [c, o, a]
  ), w = Q(
    (P = "unknown") => {
      a && (c(!1), r == null || r(P));
    },
    [c, r, a]
  ), y = Q(
    (P = "unknown") => {
      a ? w(P) : h(P);
    },
    [w, h, a]
  ), b = Q(() => {
    const P = document.querySelector(`#${l.current} [data-combobox-selected]`);
    P == null || P.removeAttribute("data-combobox-selected"), P == null || P.removeAttribute("aria-selected");
  }, []), v = Q(
    (P) => {
      const F = document.getElementById(l.current), O = F == null ? void 0 : F.querySelectorAll("[data-combobox-option]");
      if (!O)
        return null;
      const G = P >= O.length ? 0 : P < 0 ? O.length - 1 : P;
      return u.current = G, O != null && O[G] && !O[G].hasAttribute("data-combobox-disabled") ? (b(), O[G].setAttribute("data-combobox-selected", "true"), O[G].setAttribute("aria-selected", "true"), O[G].scrollIntoView({ block: "nearest", behavior: s }), O[G].id) : null;
    },
    [s, b]
  ), x = Q(() => {
    const P = document.querySelector(
      `#${l.current} [data-combobox-active]`
    );
    if (P) {
      const F = document.querySelectorAll(
        `#${l.current} [data-combobox-option]`
      ), O = Array.from(F).findIndex((G) => G === P);
      return v(O);
    }
    return v(0);
  }, [v]), C = Q(
    () => v(
      Cy(
        u.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        i
      )
    ),
    [v, i]
  ), E = Q(
    () => v(
      xy(
        u.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        i
      )
    ),
    [v, i]
  ), I = Q(
    () => v(
      Iy(
        document.querySelectorAll(`#${l.current} [data-combobox-option]`)
      )
    ),
    [v]
  ), N = Q((P = "selected") => {
    g.current = window.setTimeout(() => {
      const F = document.querySelectorAll(
        `#${l.current} [data-combobox-option]`
      ), O = Array.from(F).findIndex(
        (G) => G.hasAttribute(`data-combobox-${P}`)
      );
      u.current = O;
    }, 0);
  }, []), $ = Q(() => {
    u.current = -1, b();
  }, [b]), T = Q(() => {
    const P = document.querySelectorAll(
      `#${l.current} [data-combobox-option]`
    ), F = P == null ? void 0 : P[u.current];
    F == null || F.click();
  }, []), L = Q((P) => {
    l.current = P;
  }, []), k = Q(() => {
    p.current = window.setTimeout(() => f.current.focus(), 0);
  }, []), A = Q(() => {
    m.current = window.setTimeout(() => d.current.focus(), 0);
  }, []), _ = Q(() => u.current, []);
  return V(
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
    getSelectedOptionIndex: _,
    selectOption: v,
    selectFirstOption: I,
    selectActiveOption: x,
    selectNextOption: C,
    selectPreviousOption: E,
    resetSelectedOption: $,
    updateSelectedOptionIndex: N,
    listId: l.current,
    setListId: L,
    clickSelectedOption: T,
    searchRef: f,
    focusSearchInput: k,
    targetRef: d,
    focusTarget: A
  };
}
const Ey = {
  keepMounted: !0,
  withinPortal: !0,
  resetSelectionOnOptionHover: !1,
  width: "target",
  transitionProps: { transition: "fade", duration: 0 }
}, Dy = (e, { size: t, dropdownPadding: n }) => ({
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
  const t = j("Combobox", Ey, e), {
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
    varsResolver: Dy
  });
  return /* @__PURE__ */ S.createElement(
    uy,
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
    /* @__PURE__ */ S.createElement(
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
const Ry = (e) => e;
J.extend = Ry;
J.classes = Ae;
J.displayName = "@mantine/core/Combobox";
J.Target = Ed;
J.Dropdown = Ys;
J.Options = na;
J.Option = ta;
J.Search = ra;
J.Empty = Xs;
J.Chevron = Ks;
J.Footer = Qs;
J.Header = ea;
J.EventsTarget = Id;
J.DropdownTarget = Cd;
J.Group = Zs;
J.ClearButton = xd;
function Py({ size: e, style: t, ...n }) {
  const r = e !== void 0 ? { width: D(e), height: D(e), ...t } : t;
  return /* @__PURE__ */ S.createElement(
    "svg",
    {
      viewBox: "0 0 10 7",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: r,
      "aria-hidden": !0,
      ...n
    },
    /* @__PURE__ */ S.createElement(
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
function Dd({
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
      items: Dd({
        options: s.items,
        search: t,
        limit: n - o.length
      })
    }), bn(s) || s.label.toLowerCase().includes(r) && o.push(s);
  }
  return o;
}
function Ay(e) {
  if (e.length === 0)
    return !0;
  for (const t of e)
    if (!("group" in t) || t.items.length > 0)
      return !1;
  return !0;
}
function Rd(e, t = /* @__PURE__ */ new Set()) {
  if (Array.isArray(e))
    for (const n of e)
      if (bn(n))
        Rd(n.items, t);
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
function Pd({ data: e, withCheckIcon: t, value: n, checkIconPosition: r, unstyled: o }) {
  if (!bn(e)) {
    const s = t && vi(n, e.value) && /* @__PURE__ */ S.createElement(Py, { className: Ae.optionsDropdownCheckIcon });
    return /* @__PURE__ */ S.createElement(
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
      /* @__PURE__ */ S.createElement("span", null, e.label),
      r === "right" && s
    );
  }
  const i = e.items.map((s) => /* @__PURE__ */ S.createElement(
    Pd,
    {
      data: s,
      value: n,
      key: s.value,
      unstyled: o,
      withCheckIcon: t,
      checkIconPosition: r
    }
  ));
  return /* @__PURE__ */ S.createElement(J.Group, { label: e.group }, i);
}
function Ad({
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
  Rd(e);
  const h = typeof o == "string" ? (r || Dd)({
    options: e,
    search: c ? o : "",
    limit: i ?? 1 / 0
  }) : e, w = Ay(h), y = h.map((b) => /* @__PURE__ */ S.createElement(
    Pd,
    {
      data: b,
      key: bn(b) ? b.group : b.value,
      withCheckIcon: l,
      value: u,
      checkIconPosition: f,
      unstyled: p
    }
  ));
  return /* @__PURE__ */ S.createElement(J.Dropdown, { hidden: t || n && w }, /* @__PURE__ */ S.createElement(J.Options, { labelledBy: m }, a ? /* @__PURE__ */ S.createElement(
    rr.Autosize,
    {
      mah: s ?? 220,
      type: "scroll",
      scrollbarSize: "var(--_combobox-padding)",
      offsetScrollbars: "y",
      className: Ae.optionsDropdownScrollArea
    },
    y
  ) : y, w && d && /* @__PURE__ */ S.createElement(J.Empty, null, d)));
}
var Nd = { root: "m-de3d2490", colorOverlay: "m-862f3d1b", shadowOverlay: "m-98ae7f22", alphaOverlay: "m-95709ac0", childrenOverlay: "m-93e74e3" };
const Bc = {
  withShadow: !0
}, Ny = (e, { radius: t, size: n }) => ({
  root: {
    "--cs-radius": t === void 0 ? void 0 : bt(t),
    "--cs-size": D(n)
  }
}), Wn = an((e, t) => {
  const n = j("ColorSwatch", Bc, e), {
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
  } = j("ColorSwatch", Bc, n), h = te({
    name: "ColorSwatch",
    props: n,
    classes: Nd,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Ny
  });
  return /* @__PURE__ */ S.createElement(
    H,
    {
      ref: t,
      variant: m,
      size: u,
      ...h("root", { focusable: !0 }),
      ...g
    },
    /* @__PURE__ */ S.createElement("span", { ...h("alphaOverlay") }),
    d && /* @__PURE__ */ S.createElement("span", { ...h("shadowOverlay") }),
    /* @__PURE__ */ S.createElement("span", { ...h("colorOverlay", { style: { backgroundColor: l } }) }),
    /* @__PURE__ */ S.createElement("span", { ...h("childrenOverlay") }, p)
  );
});
Wn.classes = Nd;
Wn.displayName = "@mantine/core/ColorSwatch";
var Od = { root: "m-7485cace" };
const Oy = {}, Ty = (e, { size: t, fluid: n }) => ({
  root: {
    "--container-size": n ? void 0 : fe(t, "container-size")
  }
}), ia = q((e, t) => {
  const n = j("Container", Oy, e), { classNames: r, className: o, style: i, styles: s, unstyled: a, vars: c, fluid: l, ...u } = n, f = te({
    name: "Container",
    classes: Od,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Ty
  });
  return /* @__PURE__ */ S.createElement(H, { ref: t, mod: { fluid: l }, ...f("root"), ...u });
});
ia.classes = Od;
ia.displayName = "@mantine/core/Container";
function $y({ open: e, close: t, openDelay: n, closeDelay: r }) {
  const o = W(-1), i = W(-1), s = () => {
    window.clearTimeout(o.current), window.clearTimeout(i.current);
  }, a = () => {
    s(), n === 0 || n === void 0 ? e() : o.current = window.setTimeout(e, n);
  }, c = () => {
    s(), r === 0 || r === void 0 ? t() : i.current = window.setTimeout(t, r);
  };
  return V(() => s, []), { openDropdown: a, closeDropdown: c };
}
const [_y, Td] = Vt(
  "HoverCard component was not found in the tree"
), Ly = {};
function $d(e) {
  const { children: t, onMouseEnter: n, onMouseLeave: r, ...o } = j(
    "HoverCardDropdown",
    Ly,
    e
  ), i = Td(), s = $r(n, i.openDropdown), a = $r(r, i.closeDropdown);
  return /* @__PURE__ */ S.createElement(dt.Dropdown, { onMouseEnter: s, onMouseLeave: a, ...o }, t);
}
$d.displayName = "@mantine/core/HoverCardDropdown";
const ky = {
  refProp: "ref"
}, _d = ie((e, t) => {
  const { children: n, refProp: r, eventPropsWrapperName: o, ...i } = j(
    "HoverCardTarget",
    ky,
    e
  );
  if (!zt(n))
    throw new Error(
      "HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const s = Td(), a = $r(n.props.onMouseEnter, s.openDropdown), c = $r(n.props.onMouseLeave, s.closeDropdown), l = { onMouseEnter: a, onMouseLeave: c };
  return /* @__PURE__ */ S.createElement(dt.Target, { refProp: r, ref: t, ...i }, sn(
    n,
    o ? { [o]: l } : l
  ));
});
_d.displayName = "@mantine/core/HoverCardTarget";
const By = {
  openDelay: 0,
  closeDelay: 150,
  initiallyOpened: !1
};
function en(e) {
  const { children: t, onOpen: n, onClose: r, openDelay: o, closeDelay: i, initiallyOpened: s, ...a } = j(
    "HoverCard",
    By,
    e
  ), [c, { open: l, close: u }] = Hm(s, { onClose: r, onOpen: n }), { openDropdown: f, closeDropdown: d } = $y({ open: l, close: u, openDelay: o, closeDelay: i });
  return /* @__PURE__ */ S.createElement(_y, { value: { openDropdown: f, closeDropdown: d } }, /* @__PURE__ */ S.createElement(dt, { ...a, opened: c, __staticSelector: "HoverCard" }, t));
}
en.displayName = "@mantine/core/HoverCard";
en.Target = _d;
en.Dropdown = $d;
en.extend = (e) => e;
function Tt() {
  return Tt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Tt.apply(this, arguments);
}
function Ld(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const [My, sa] = ms(), [Fy, jy] = ms();
var xo = { root: "m-7cda1cd6", "root--default": "m-44da308b", "root--contrast": "m-e3a01f8", label: "m-1e0e6180", remove: "m-ae386778", group: "m-1dcfd90b" };
const Wy = {}, zy = (e, { gap: t }, { size: n }) => ({
  group: {
    "--pg-gap": t !== void 0 ? fe(t) : fe(n, "pg-gap")
  }
}), aa = q((e, t) => {
  const n = j("PillGroup", Wy, e), { classNames: r, className: o, style: i, styles: s, unstyled: a, vars: c, size: l, disabled: u, ...f } = n, d = sa(), p = (d == null ? void 0 : d.size) || l || void 0, m = te({
    name: "PillGroup",
    classes: xo,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: zy,
    stylesCtx: { size: p },
    rootSelector: "group"
  });
  return /* @__PURE__ */ S.createElement(Fy, { value: { size: p, disabled: u } }, /* @__PURE__ */ S.createElement(H, { ref: t, size: p, ...m("group"), ...f }));
});
aa.classes = xo;
aa.displayName = "@mantine/core/PillGroup";
const Vy = {
  variant: "default"
}, Gy = (e, { radius: t }, { size: n }) => ({
  root: {
    "--pill-fz": fe(n, "pill-fz"),
    "--pill-height": fe(n, "pill-height"),
    "--pill-radius": t === void 0 ? void 0 : bt(t)
  }
}), zn = q((e, t) => {
  const n = j("Pill", Vy, e), {
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
  } = n, y = jy(), b = sa(), v = g || (y == null ? void 0 : y.size) || void 0, x = (b == null ? void 0 : b.variant) === "filled" ? "contrast" : l || "default", C = te({
    name: "Pill",
    classes: xo,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Gy,
    stylesCtx: { size: v }
  });
  return /* @__PURE__ */ S.createElement(
    H,
    {
      component: "span",
      ref: t,
      variant: x,
      size: v,
      ...C("root", { variant: x }),
      mod: { "with-remove": f, disabled: h || (y == null ? void 0 : y.disabled) },
      ...w
    },
    /* @__PURE__ */ S.createElement("span", { ...C("label") }, u),
    f && /* @__PURE__ */ S.createElement(
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
        onMouseDown: (E) => {
          var I;
          E.preventDefault(), E.stopPropagation(), (I = p == null ? void 0 : p.onMouseDown) == null || I.call(p, E);
        },
        onClick: (E) => {
          var I;
          E.stopPropagation(), d == null || d(), (I = p == null ? void 0 : p.onClick) == null || I.call(p, E);
        }
      }
    )
  );
});
zn.classes = xo;
zn.displayName = "@mantine/core/Pill";
zn.Group = aa;
var kd = { field: "m-45c4369d" };
const Hy = {
  type: "visible"
}, ca = q((e, t) => {
  const n = j("PillsInputField", Hy, e), {
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
    classes: kd,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    rootSelector: "field"
  }), w = u || (m == null ? void 0 : m.disabled);
  return /* @__PURE__ */ S.createElement(
    H,
    {
      component: "input",
      ref: Ne(t, m == null ? void 0 : m.fieldRef),
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
ca.classes = kd;
ca.displayName = "@mantine/core/PillsInputField";
const Uy = {}, Fr = q((e, t) => {
  const n = j("PillsInput", Uy, e), {
    children: r,
    onMouseDown: o,
    onClick: i,
    size: s,
    disabled: a,
    __staticSelector: c,
    error: l,
    variant: u,
    ...f
  } = n, d = W();
  return /* @__PURE__ */ S.createElement(My, { value: { fieldRef: d, size: s, disabled: a, hasError: !!l, variant: u } }, /* @__PURE__ */ S.createElement(
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
Fr.displayName = "@mantine/core/PillsInput";
Fr.Field = ca;
function qy({ data: e, value: t }) {
  const n = t.map((o) => o.trim().toLowerCase());
  return e.reduce((o, i) => (bn(i) ? o.push({
    group: i.group,
    items: i.items.filter(
      (s) => n.indexOf(s.value.toLowerCase().trim()) === -1
    )
  }) : n.indexOf(i.value.toLowerCase().trim()) === -1 && o.push(i), o), []);
}
const Ky = {
  maxValues: 1 / 0,
  withCheckIcon: !0,
  checkIconPosition: "left",
  hiddenInputValuesDivider: ","
}, la = q((e, t) => {
  const n = j("MultiSelect", Ky, e), {
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
    onOptionSubmit: x,
    comboboxProps: C,
    filter: E,
    limit: I,
    withScrollArea: N,
    maxDropdownHeight: $,
    searchValue: T,
    defaultSearchValue: L,
    onSearchChange: k,
    readOnly: A,
    disabled: _,
    onFocus: P,
    onBlur: F,
    onPaste: O,
    radius: G,
    rightSection: X,
    rightSectionWidth: ne,
    rightSectionPointerEvents: ve,
    rightSectionProps: le,
    leftSection: Oe,
    leftSectionWidth: we,
    leftSectionPointerEvents: re,
    leftSectionProps: Se,
    inputContainer: ke,
    inputWrapperOrder: Ie,
    withAsterisk: Ee,
    labelProps: Be,
    descriptionProps: ae,
    errorProps: Y,
    wrapperProps: ln,
    description: Ue,
    label: Pt,
    error: qe,
    maxValues: De,
    searchable: ge,
    nothingFoundMessage: At,
    withCheckIcon: qt,
    checkIconPosition: se,
    hidePickedOptions: Nt,
    withErrorStyles: Hp,
    name: Up,
    form: qp,
    id: Kp,
    clearable: Yp,
    clearButtonProps: Xp,
    hiddenInputProps: Jp,
    placeholder: tc,
    hiddenInputValuesDivider: Qp,
    ...Zp
  } = n, oi = Gt(Kp), ii = Sd(g), pr = qs(ii), Me = oa({
    opened: h,
    defaultOpened: w,
    onDropdownOpen: y,
    onDropdownClose: () => {
      b == null || b(), Me.resetSelectedOption();
    }
  }), {
    styleProps: em,
    rest: { type: bD, ...tm }
  } = co(Zp), [Te, An] = kt({
    value: u,
    defaultValue: f,
    finalValue: [],
    onChange: d
  }), [mr, gr] = kt({
    value: T,
    defaultValue: L,
    finalValue: "",
    onChange: k
  }), si = te({
    name: "MultiSelect",
    classes: {},
    props: n,
    classNames: r,
    styles: s,
    unstyled: a
  }), { resolvedClassNames: nc, resolvedStyles: rc } = Eu({
    props: n,
    styles: s,
    classNames: r
  }), nm = (ce) => {
    p == null || p(ce), ce.key === " " && !ge && (ce.preventDefault(), Me.toggleDropdown()), ce.key === "Backspace" && mr.length === 0 && Te.length > 0 && An(Te.slice(0, Te.length - 1));
  }, rm = Te.map((ce, ai) => {
    var sc;
    return /* @__PURE__ */ S.createElement(
      zn,
      {
        key: `${ce}-${ai}`,
        withRemoveButton: !A,
        onRemove: () => An(Te.filter((om) => ce !== om)),
        unstyled: a,
        ...si("pill")
      },
      ((sc = pr[ce]) == null ? void 0 : sc.label) || ce
    );
  });
  V(() => {
    v && Me.selectFirstOption();
  }, [v, Te]);
  const oc = Yp && Te.length > 0 && !_ && !A && /* @__PURE__ */ S.createElement(
    J.ClearButton,
    {
      size: l,
      ...Xp,
      onClear: () => {
        An([]), gr("");
      }
    }
  ), ic = qy({ data: ii, value: Te });
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(
    J,
    {
      store: Me,
      classNames: nc,
      styles: rc,
      unstyled: a,
      size: l,
      readOnly: A,
      __staticSelector: "MultiSelect",
      onOptionSubmit: (ce) => {
        x == null || x(ce), gr(""), Me.updateSelectedOptionIndex("selected"), Te.includes(pr[ce].value) ? An(Te.filter((ai) => ai !== pr[ce].value)) : Te.length < De && An([...Te, pr[ce].value]);
      },
      ...C
    },
    /* @__PURE__ */ S.createElement(J.DropdownTarget, null, /* @__PURE__ */ S.createElement(
      Fr,
      {
        ...em,
        __staticSelector: "MultiSelect",
        classNames: nc,
        styles: rc,
        unstyled: a,
        size: l,
        className: o,
        style: i,
        variant: m,
        disabled: _,
        radius: G,
        rightSection: X || oc || /* @__PURE__ */ S.createElement(J.Chevron, { size: l, error: qe, unstyled: a }),
        rightSectionPointerEvents: ve || (oc ? "all" : "none"),
        rightSectionWidth: ne,
        rightSectionProps: le,
        leftSection: Oe,
        leftSectionWidth: we,
        leftSectionPointerEvents: re,
        leftSectionProps: Se,
        inputContainer: ke,
        inputWrapperOrder: Ie,
        withAsterisk: Ee,
        labelProps: Be,
        descriptionProps: ae,
        errorProps: Y,
        wrapperProps: ln,
        description: Ue,
        label: Pt,
        error: qe,
        multiline: !0,
        withErrorStyles: Hp,
        __stylesApiProps: { ...n, multiline: !0 },
        pointer: !ge,
        onClick: () => ge ? Me.openDropdown() : Me.toggleDropdown(),
        "data-expanded": Me.dropdownOpened || void 0,
        id: oi
      },
      /* @__PURE__ */ S.createElement(zn.Group, { disabled: _, unstyled: a, ...si("pillsList") }, rm, /* @__PURE__ */ S.createElement(J.EventsTarget, null, /* @__PURE__ */ S.createElement(
        Fr.Field,
        {
          ...tm,
          ref: t,
          id: oi,
          placeholder: tc,
          type: !ge && !tc ? "hidden" : "visible",
          ...si("inputField"),
          unstyled: a,
          onFocus: (ce) => {
            P == null || P(ce), ge && Me.openDropdown();
          },
          onBlur: (ce) => {
            F == null || F(ce), Me.closeDropdown(), ge && Me.closeDropdown(), gr("");
          },
          onKeyDown: nm,
          value: mr,
          onChange: (ce) => {
            gr(ce.currentTarget.value), ge && Me.openDropdown(), v && Me.selectFirstOption();
          },
          disabled: _,
          readOnly: A || !ge,
          pointer: !ge
        }
      )))
    )),
    /* @__PURE__ */ S.createElement(
      Ad,
      {
        data: Nt ? ic : ii,
        hidden: A || _,
        filter: E,
        search: mr,
        limit: I,
        hiddenWhenEmpty: !ge || !At || Nt && ic.length === 0 && mr.trim().length === 0,
        withScrollArea: N,
        maxDropdownHeight: $,
        filterOptions: ge,
        value: Te,
        checkIconPosition: se,
        withCheckIcon: qt,
        nothingFoundMessage: At,
        unstyled: a,
        labelId: `${oi}-label`
      }
    )
  ), /* @__PURE__ */ S.createElement(
    "input",
    {
      type: "hidden",
      name: Up,
      value: Te.join(Qp),
      form: qp,
      disabled: _,
      ...Jp
    }
  ));
});
la.classes = { ...Ht.classes, ...J.classes };
la.displayName = "@mantine/core/MultiSelect";
const Yy = {
  duration: 100,
  transition: "fade"
};
function Xy(e, t) {
  return { ...Yy, ...t, ...e };
}
function Jy({
  offset: e,
  position: t
}) {
  const [n, r] = U(!1), o = W(), { x: i, y: s, elements: a, refs: c, update: l, placement: u } = Ls({
    placement: t,
    middleware: [
      Ns({
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
  return V(() => {
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
const Qy = {
  refProp: "ref",
  withinPortal: !0,
  offset: 10,
  position: "right",
  zIndex: gs("popover")
}, Zy = (e, { radius: t, color: n }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : bt(t),
    "--tooltip-bg": n ? Bt(n, e) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), ua = q((e, t) => {
  const n = j("TooltipFloating", Qy, e), {
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
    portalProps: x,
    ...C
  } = n, E = vt(), I = te({
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
    varsResolver: Zy
  }), { handleMouseMove: N, x: $, y: T, opened: L, boundaryRef: k, floating: A, setOpened: _ } = Jy({
    offset: m,
    position: g
  });
  if (!zt(r))
    throw new Error(
      "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const P = Ne(k, r.ref, t), F = (G) => {
    var X, ne;
    (ne = (X = r.props).onMouseEnter) == null || ne.call(X, G), N(G), _(!0);
  }, O = (G) => {
    var X, ne;
    (ne = (X = r.props).onMouseLeave) == null || ne.call(X, G), _(!1);
  };
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(mo, { ...x, withinPortal: i }, /* @__PURE__ */ S.createElement(
    H,
    {
      ...C,
      ...I("tooltip", {
        style: {
          ...Ss(s, E),
          zIndex: w,
          display: !y && L ? "block" : "none",
          top: (T && Math.round(T)) ?? "",
          left: ($ && Math.round($)) ?? ""
        }
      }),
      variant: b,
      ref: A
    },
    p
  )), sn(r, {
    ...r.props,
    [o]: P,
    onMouseEnter: F,
    onMouseLeave: O
  }));
});
ua.classes = Co;
ua.displayName = "@mantine/core/TooltipFloating";
const Bd = on(!1), ev = Bd.Provider, tv = () => ut(Bd), nv = {
  openDelay: 0,
  closeDelay: 0
};
function Md(e) {
  const { openDelay: t, closeDelay: n, children: r } = j("TooltipGroup", nv, e);
  return /* @__PURE__ */ S.createElement(ev, { value: !0 }, /* @__PURE__ */ S.createElement(eb, { delay: { open: t, close: n } }, r));
}
Md.displayName = "@mantine/core/TooltipGroup";
function rv(e) {
  var C, E, I;
  const [t, n] = U(!1), o = typeof e.opened == "boolean" ? e.opened : t, i = tv(), s = Gt(), { delay: a, currentId: c, setCurrentId: l } = sd(), u = Q(
    (N) => {
      n(N), N && l(s);
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
  } = Ls({
    placement: e.position,
    open: o,
    onOpenChange: u,
    middleware: [
      Gu(e.offset),
      Ns({ padding: 8 }),
      Wu(),
      Qu({ element: e.arrowRef, padding: e.arrowOffset }),
      ...e.inline ? [Vu()] : []
    ]
  }), { getReferenceProps: b, getFloatingProps: v } = db([
    Zh(p, {
      enabled: (C = e.events) == null ? void 0 : C.hover,
      delay: i ? a : { open: e.openDelay, close: e.closeDelay },
      mouseOnly: !((E = e.events) != null && E.touch)
    }),
    ub(p, { enabled: (I = e.events) == null ? void 0 : I.focus, keyboardOnly: !0 }),
    fb(p, { role: "tooltip" }),
    // cannot be used with controlled tooltip, page jumps
    lb(p, { enabled: typeof e.opened > "u" }),
    tb(p, { id: s })
  ]);
  pd({
    opened: o,
    position: e.position,
    positionDependencies: e.positionDependencies,
    floating: { refs: m, update: g }
  }), Lt(() => {
    var N;
    (N = e.onPositionChange) == null || N.call(e, h);
  }, [h]);
  const x = o && c && c !== s;
  return {
    x: f,
    y: d,
    arrowX: w,
    arrowY: y,
    reference: m.setReference,
    floating: m.setFloating,
    getFloatingProps: v,
    getReferenceProps: b,
    isGroupPhase: x,
    opened: o,
    placement: h
  };
}
const Mc = {
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
}, ov = (e, { radius: t, color: n }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : bt(t),
    "--tooltip-bg": n ? Bt(n, e) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), ar = q((e, t) => {
  const n = j("Tooltip", Mc, e), {
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
    arrowOffset: x,
    arrowRadius: C,
    arrowPosition: E,
    offset: I,
    transitionProps: N,
    multiline: $,
    events: T,
    zIndex: L,
    disabled: k,
    positionDependencies: A,
    onClick: _,
    onMouseEnter: P,
    onMouseLeave: F,
    inline: O,
    variant: G,
    keepMounted: X,
    vars: ne,
    portalProps: ve,
    ...le
  } = j("Tooltip", Mc, n), { dir: Oe } = nr(), we = W(null), re = rv({
    position: ad(Oe, o),
    closeDelay: c,
    openDelay: a,
    onPositionChange: l,
    opened: u,
    events: T,
    arrowRef: we,
    arrowOffset: x,
    offset: typeof I == "number" ? I + (b ? v / 2 : 0) : I,
    positionDependencies: [...A, r],
    inline: O
  }), Se = te({
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
    varsResolver: ov
  });
  if (!zt(r))
    throw new Error(
      "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const ke = Ne(re.reference, r.ref, t), Ie = Xy(N, { duration: 100, transition: "fade" });
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(mo, { ...ve, withinPortal: f }, /* @__PURE__ */ S.createElement(
    Bs,
    {
      ...Ie,
      keepMounted: X,
      mounted: !k && !!re.opened,
      duration: re.isGroupPhase ? 10 : Ie.duration
    },
    (Ee) => /* @__PURE__ */ S.createElement(
      H,
      {
        ...le,
        variant: G,
        mod: { multiline: $ },
        ...re.getFloatingProps({
          ref: re.floating,
          className: Se("tooltip").className,
          style: {
            ...Se("tooltip").style,
            ...Ee,
            zIndex: L,
            top: re.y ?? 0,
            left: re.x ?? 0
          }
        })
      },
      s,
      /* @__PURE__ */ S.createElement(
        ks,
        {
          ref: we,
          arrowX: re.arrowX,
          arrowY: re.arrowY,
          visible: b,
          position: re.placement,
          arrowSize: v,
          arrowOffset: x,
          arrowRadius: C,
          arrowPosition: E,
          ...Se("arrow")
        }
      )
    )
  )), sn(
    r,
    re.getReferenceProps({
      onClick: _,
      onMouseEnter: P,
      onMouseLeave: F,
      onMouseMove: n.onMouseMove,
      onPointerDown: n.onPointerDown,
      onPointerEnter: n.onPointerEnter,
      [i]: ke,
      className: yt(y, r.props.className),
      ...r.props
    })
  ));
});
ar.classes = Co;
ar.displayName = "@mantine/core/Tooltip";
ar.Floating = ua;
ar.Group = Md;
const iv = {
  searchable: !1,
  withCheckIcon: !0,
  allowDeselect: !0,
  checkIconPosition: "left"
}, cr = q((e, t) => {
  const n = j("Select", iv, e), {
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
    readOnly: x,
    disabled: C,
    filter: E,
    limit: I,
    withScrollArea: N,
    maxDropdownHeight: $,
    size: T,
    searchable: L,
    rightSection: k,
    checkIconPosition: A,
    withCheckIcon: _,
    nothingFoundMessage: P,
    name: F,
    form: O,
    searchValue: G,
    defaultSearchValue: X,
    onSearchChange: ne,
    allowDeselect: ve,
    error: le,
    rightSectionPointerEvents: Oe,
    id: we,
    clearable: re,
    clearButtonProps: Se,
    hiddenInputProps: ke,
    ...Ie
  } = n, Ee = Or(() => Sd(g), [g]), Be = Or(() => qs(Ee), [Ee]), ae = Gt(we), [Y, ln] = kt({
    value: h,
    defaultValue: w,
    finalValue: null,
    onChange: m
  }), Ue = typeof Y == "string" ? Be[Y] : void 0, [Pt, qe] = kt({
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
  }), { resolvedClassNames: ge, resolvedStyles: At } = Eu({
    props: n,
    styles: o,
    classNames: r
  });
  V(() => {
    y && De.selectFirstOption();
  }, [y, Y]), V(() => {
    h === null && qe(""), typeof h == "string" && Ue && qe(Ue.label);
  }, [h, Ue]);
  const qt = re && !!Y && !C && !x && /* @__PURE__ */ S.createElement(
    J.ClearButton,
    {
      size: T,
      ...Se,
      onClear: () => {
        ln(null), qe("");
      }
    }
  );
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(
    J,
    {
      store: De,
      __staticSelector: "Select",
      classNames: ge,
      styles: At,
      unstyled: i,
      readOnly: x,
      onOptionSubmit: (se) => {
        b == null || b(se);
        const Nt = ve && Be[se].value === Y ? null : Be[se].value;
        ln(Nt), qe(typeof Nt == "string" ? Be[se].label : ""), De.closeDropdown();
      },
      size: T,
      ...v
    },
    /* @__PURE__ */ S.createElement(J.Target, { targetType: L ? "input" : "button" }, /* @__PURE__ */ S.createElement(
      Ht,
      {
        id: ae,
        ref: t,
        rightSection: k || qt || /* @__PURE__ */ S.createElement(J.Chevron, { size: T, error: le, unstyled: i }),
        rightSectionPointerEvents: Oe || (qt ? "all" : "none"),
        ...Ie,
        size: T,
        __staticSelector: "Select",
        disabled: C,
        readOnly: x || !L,
        value: Pt,
        onChange: (se) => {
          qe(se.currentTarget.value), De.openDropdown(), y && De.selectFirstOption();
        },
        onFocus: (se) => {
          L && De.openDropdown(), f == null || f(se);
        },
        onBlur: (se) => {
          var Nt;
          L && De.closeDropdown(), qe(Y != null && ((Nt = Be[Y]) == null ? void 0 : Nt.label) || ""), d == null || d(se);
        },
        onClick: (se) => {
          L ? De.openDropdown() : De.toggleDropdown(), p == null || p(se);
        },
        classNames: ge,
        styles: At,
        unstyled: i,
        pointer: !L,
        error: le
      }
    )),
    /* @__PURE__ */ S.createElement(
      Ad,
      {
        data: Ee,
        hidden: x || C,
        filter: E,
        search: Pt,
        limit: I,
        hiddenWhenEmpty: !L || !P,
        withScrollArea: N,
        maxDropdownHeight: $,
        filterOptions: L && (Ue == null ? void 0 : Ue.label) !== Pt,
        value: Y,
        checkIconPosition: A,
        withCheckIcon: _,
        nothingFoundMessage: P,
        unstyled: i,
        labelId: `${ae}-label`
      }
    )
  ), /* @__PURE__ */ S.createElement(
    "input",
    {
      type: "hidden",
      name: F,
      value: Y || "",
      form: O,
      disabled: C,
      ...ke
    }
  ));
});
cr.classes = { ...Ht.classes, ...J.classes };
cr.displayName = "@mantine/core/Select";
const sv = {}, da = q((e, t) => {
  const { w: n, h: r, miw: o, mih: i, ...s } = j("Space", sv, e);
  return /* @__PURE__ */ S.createElement(H, { ref: t, ...s, w: n, miw: o ?? n, h: r, mih: i ?? r });
});
da.displayName = "@mantine/core/Space";
const [av, fa] = Vt(
  "Tabs component was not found in the tree"
);
var lr = { root: "m-89d60db1", "list--default": "m-576c9d4", list: "m-89d33d6d", panel: "m-b0c91715", tab: "m-4ec4dce6", tabSection: "m-fc420b1f", "tab--default": "m-539e827b", "list--outline": "m-6772fbd5", "tab--outline": "m-b59ab47c", "tab--pills": "m-c3381914" };
const cv = {}, pa = q((e, t) => {
  const n = j("TabsList", cv, e), { children: r, className: o, grow: i, justify: s, classNames: a, styles: c, style: l, ...u } = n, f = fa();
  return /* @__PURE__ */ S.createElement(
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
const lv = {}, ma = q((e, t) => {
  const n = j("TabsPanel", lv, e), { children: r, className: o, value: i, classNames: s, styles: a, style: c, ...l } = n, u = fa(), f = u.value === i, d = u.keepMounted || n.keepMounted || f ? r : null;
  return /* @__PURE__ */ S.createElement(
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
const uv = {}, ga = q((e, t) => {
  const n = j("TabsTab", uv, e), {
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
  } = n, w = vt(), { dir: y } = nr(), b = fa(), v = a === b.value, x = (E) => {
    b.onChange(b.allowTabDeactivation && a === b.value ? null : a), c == null || c(E);
  }, C = { classNames: p, styles: m, props: n };
  return /* @__PURE__ */ S.createElement(
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
      onClick: x,
      __vars: { "--tabs-color": f ? Bt(f, w) : void 0 },
      onKeyDown: lu({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: b.activateTabWithKeyboard,
        loop: b.loop,
        orientation: b.orientation || "horizontal",
        dir: y,
        onKeyDown: l
      })
    },
    s && /* @__PURE__ */ S.createElement("span", { ...b.getStyles("tabSection", C), "data-position": "left" }, s),
    o && /* @__PURE__ */ S.createElement("span", { ...b.getStyles("tabLabel", C) }, o),
    i && /* @__PURE__ */ S.createElement("span", { ...b.getStyles("tabSection", C), "data-position": "right" }, i)
  );
});
ga.classes = lr;
ga.displayName = "@mantine/core/TabsTab";
const Fc = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value", dv = {
  keepMounted: !0,
  orientation: "horizontal",
  loop: !0,
  activateTabWithKeyboard: !0,
  allowTabDeactivation: !1,
  unstyled: !1,
  inverted: !1,
  variant: "default",
  placement: "left"
}, fv = (e, { radius: t, color: n }) => ({
  root: {
    "--tabs-radius": bt(t),
    "--tabs-color": Bt(n, e)
  }
}), st = q((e, t) => {
  const n = j("Tabs", dv, e), {
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
    className: x,
    style: C,
    vars: E,
    ...I
  } = n, N = Gt(l), [$, T] = kt({
    value: o,
    defaultValue: r,
    finalValue: null,
    onChange: i
  }), L = te({
    name: "Tabs",
    props: n,
    classes: lr,
    className: x,
    style: C,
    classNames: y,
    styles: b,
    unstyled: v,
    vars: E,
    varsResolver: fv
  });
  return /* @__PURE__ */ S.createElement(
    av,
    {
      value: {
        placement: h,
        value: $,
        orientation: s,
        id: N,
        loop: c,
        activateTabWithKeyboard: u,
        getTabId: Tr(`${N}-tab`, Fc),
        getPanelId: Tr(`${N}-panel`, Fc),
        onChange: T,
        allowTabDeactivation: f,
        variant: d,
        color: p,
        radius: m,
        inverted: g,
        keepMounted: w,
        unstyled: v,
        getStyles: L
      }
    },
    /* @__PURE__ */ S.createElement(
      H,
      {
        ref: t,
        id: N,
        variant: d,
        mod: {
          orientation: s,
          inverted: s === "horizontal" && g,
          placement: s === "vertical" && h
        },
        ...L("root"),
        ...I
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
const pv = {}, ha = q((e, t) => {
  const n = j("TextInput", pv, e);
  return /* @__PURE__ */ S.createElement(Ht, { component: "input", ref: t, ...n, __staticSelector: "TextInput" });
});
ha.classes = Ht.classes;
ha.displayName = "@mantine/core/TextInput";
const mv = ["h1", "h2", "h3", "h4", "h5", "h6"];
function gv(e, t) {
  const n = t !== void 0 ? t : `h${e}`;
  return mv.includes(n) ? {
    fontSize: `var(--mantine-${n}-font-size)`,
    fontWeight: `var(--mantine-${n}-font-weight)`,
    lineHeight: `var(--mantine-${n}-line-height)`
  } : {
    fontSize: D(n),
    fontWeight: `var(--mantine-h${e}-font-weight)`,
    lineHeight: `var(--mantine-h${e}-line-height)`
  };
}
var Fd = { root: "m-8a5d1357" };
const hv = {
  order: 1
}, bv = (e, { order: t, size: n, lineClamp: r }) => {
  const o = gv(t, n);
  return {
    root: {
      "--title-fw": o.fontWeight,
      "--title-lh": o.lineHeight,
      "--title-fz": o.fontSize,
      "--title-line-clamp": typeof r == "number" ? r.toString() : void 0
    }
  };
}, En = q((e, t) => {
  const n = j("Title", hv, e), {
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
    classes: Fd,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: l,
    varsResolver: bv
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ S.createElement(
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
En.classes = Fd;
En.displayName = "@mantine/core/Title";
const yv = {
  /** Put your mantine theme override here */
}, vv = {
  settings: {
    bsddApiEnvironment: "test",
    mainDictionary: {
      dictionaryUri: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0",
      dictionaryName: "Basis bouwproducten",
      parameterName: "bsdd/digibase/basisbouwproducten",
      parameterId: "14762b7f-3c15-468b-8dad-1f514ff90dc2",
      parameterMapping: "description"
    },
    filterDictionaries: [
      {
        dictionaryUri: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3",
        dictionaryName: "IFC",
        parameterName: "bsdd/buildingsmart/ifc",
        parameterId: "6999e83d-6f2e-4d40-87f9-9dd406d25bcf ",
        parameterMapping: "IfcExportAs"
      },
      {
        dictionaryUri: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021",
        dictionaryName: "DigiBase Demo NL-SfB tabel 1",
        parameterName: "bsdd/digibase/nlsfb",
        parameterId: "f0c64040-e2c8-4e91-8753-4ab324599edb ",
        parameterMapping: "assemblycode"
      }
    ],
    language: "NL"
  },
  ifcData: [
    {
      type: "IfcSlab",
      name: "Floor: 23_FL_AT_breedplaatvloer_260 (C35/45)",
      description: "breedplaatvloer",
      predefinedType: "FLOOR",
      hasAssociations: [
        {
          type: "IfcClassificationReference",
          name: "23.21 vloeren; constructief, vrijdragende vloeren",
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/23.21",
          identification: "23.21",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          }
        },
        {
          type: "IfcClassificationReference",
          name: "Floor",
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcSlabFLOOR",
          identification: "IfcSlabFLOOR",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          }
        },
        {
          type: "IfcClassificationReference",
          name: "breedplaatvloer",
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/breedplaatvloer",
          identification: "breedplaatvloer",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          }
        },
        {
          type: "IfcMaterial",
          name: "beton generiek",
          description: "https://identifier.buildingsmart.org/uri/bimloket/naakt/0.1/class/betongeneriek"
        }
      ]
    },
    {
      type: "IfcSlab",
      name: "Floor: 23_FL_AT_breedplaatvloer_200 (C35/45)",
      description: "breedplaatvloer",
      predefinedType: "FLOOR"
    },
    {
      type: "IfcSlab",
      name: "Floor: 23_FL_AT_breedplaatvloer_200 (C35/45)",
      description: "breedplaatvloer",
      predefinedType: "FLOOR"
    },
    {
      type: "IfcSlab",
      name: "Floor: 23_FL_AT_breedplaatvloer_400 (C35/45) (oranje)",
      description: "breedplaatvloer",
      predefinedType: "FLOOR",
      hasAssociations: [
        {
          type: "IfcClassificationReference",
          name: "23.21 vloeren; constructief, vrijdragende vloeren",
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/23.21",
          identification: "23.21",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          }
        },
        {
          type: "IfcMaterial",
          name: "beton generiek",
          description: "https://identifier.buildingsmart.org/uri/bimloket/naakt/0.1/class/betongeneriek"
        }
      ]
    },
    {
      type: "IfcSlab",
      name: "Kanaalplaatvloer 200 VBI",
      description: "kanaalplaatvloer",
      predefinedType: "FLOOR"
    },
    {
      type: "IfcObject",
      name: "NLRS_00_SI_nulpunt_vws - nulpunt",
      description: "Project nulpunt",
      tag: "307327",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/Projectnulpunt",
          identification: "Projectnulpunt",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "Project nulpunt"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcObject",
          identification: "IfcObject",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcObject"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/0.0",
          identification: "0.0",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      type: "IfcWasteTerminal",
      name: "NLRS_52_PF_bakgoot_gen_vws - bakgoot",
      description: "bakgoot",
      tag: "798190",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/bakgoot",
          identification: "bakgoot",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "bakgoot"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcWasteTerminal",
          identification: "IfcWasteTerminal",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcWasteTerminal"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      type: "IfcWasteTerminal",
      name: "NLRS_52_PF_LB_bakgoot_beugel_B44_gen_vws - N47_VWS_beugel_bakgoot_B44",
      description: "beugel bakgoot",
      tag: "798257",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/beugelbakgoot",
          identification: "beugelbakgoot",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "beugel bakgoot"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcWasteTerminal",
          identification: "IfcWasteTerminal",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcWasteTerminal"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/52.10",
          identification: "52.10",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "afvoeren; regenwater, algemeen (verzamelniveau)"
        }
      ]
    },
    {
      type: "IfcWasteTerminal",
      name: "NLRS_52_PF_LB_bakgoot_goot_gen_vws - N47_VWS_bakgoot",
      description: "bakgoot",
      tag: "798256",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/bakgoot",
          identification: "bakgoot",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "bakgoot"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcWasteTerminal",
          identification: "IfcWasteTerminal",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcWasteTerminal"
        }
      ]
    },
    {
      name: "NLRS_52_PF_FB_bakgoot_hwa_gen_vws - N47_VWS_hwa_bakgoot",
      description: "hwa bakgoot",
      tag: "798259",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/hwabakgoot",
          identification: "hwabakgoot",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "hwa bakgoot"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/52.10",
          identification: "52.10",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "afvoeren; regenwater, algemeen (verzamelniveau)"
        }
      ]
    },
    {
      name: "NLRS_52_PF_LB_bakgoot_eindstuk_gen_vws - N47_VWS_eindstuk_bakgoot",
      description: "bakgoot eindstuk",
      tag: "798258",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/bakgooteindstuk",
          identification: "bakgooteindstuk",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "bakgoot eindstuk"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/52.10",
          identification: "52.10",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "afvoeren; regenwater, algemeen (verzamelniveau)"
        }
      ]
    },
    {
      type: "IfcWall",
      name: "gevelafwerking_baksteen - NLRS_21_WA_TLB_metselwerk waalformaat_gen_vws",
      description: "gevelafwerking_baksteen",
      tag: "692064",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/gevelafwerking_baksteen",
          identification: "gevelafwerking_baksteen",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "gevelafwerking_baksteen"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcWall",
          identification: "IfcWall",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcWall"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/21.12",
          identification: "21.12",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "buitenwanden; niet constructief, spouwwanden"
        }
      ]
    },
    {
      type: "IfcWall",
      name: "Basic Wall - NLRS_21_WA_TLB_beton prefab 100mm_gen_vws",
      description: "beton prefab 150mm",
      tag: "692066",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/betonprefab150mm",
          identification: "betonprefab150mm",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "beton prefab 150mm"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcWall",
          identification: "IfcWall",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcWall"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      type: "IfcWall",
      name: "Basic Wall - NLRS_21_WA_TLB_isolatie 131mm_gen_vws",
      description: "isolatie Mupan Ultra Xs 138mm",
      tag: "692068",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/isolatieMupanUltraXs138mm",
          identification: "isolatieMupanUltraXs138mm",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "isolatie Mupan Ultra Xs 138mm"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcWall",
          identification: "IfcWall",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcWall"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      type: "IfcElementAssembly",
      name: "NLRS_31_gevel-sparingsmaker_3HW_vws - raam",
      description: "gevel-sparingsmaker spouwwand",
      tag: "692070",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/gevel-sparingsmakerspouwwand",
          identification: "gevel-sparingsmakerspouwwand",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "gevel-sparingsmaker spouwwand"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcElementAssembly",
          identification: "IfcElementAssembly",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcElementAssembly"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/31",
          identification: "31",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "Buitenwandopeningen"
        }
      ]
    },
    {
      type: "IfcElementAssembly",
      name: "NRLS_30_WI_UN_wandsparing-sam-rechthoek-VW - buitenbladsparing, betonnen waterslag + stalen latei",
      description: "gevel-sparingsmaker bladsparing",
      tag: "693977",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/gevel-sparingsmakerbladsparing",
          identification: "gevel-sparingsmakerbladsparing",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "gevel-sparingsmaker bladsparing"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcElementAssembly",
          identification: "IfcElementAssembly",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcElementAssembly"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/31",
          identification: "31",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "Buitenwandopeningen"
        }
      ]
    },
    {
      type: "IfcElementAssembly",
      name: "NRLS_30_WI_UN_wandsparing-sam-rechthoek-VW - isolatiesparing, stelkozijn",
      description: "gevel-sparingsmaker bladsparing",
      tag: "693976",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/gevel-sparingsmakerbladsparing",
          identification: "gevel-sparingsmakerbladsparing",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "gevel-sparingsmaker bladsparing"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcElementAssembly",
          identification: "IfcElementAssembly",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcElementAssembly"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/31",
          identification: "31",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "Buitenwandopeningen"
        }
      ]
    },
    {
      type: "IfcElementAssembly",
      name: "NRLS_30_WI_UN_wandsparing-sam-rechthoek-VW - binnenbladsparing, vensterbank",
      description: "gevel-sparingsmaker bladsparing",
      tag: "693978",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/gevel-sparingsmakerbladsparing",
          identification: "gevel-sparingsmakerbladsparing",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "gevel-sparingsmaker bladsparing"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcElementAssembly",
          identification: "IfcElementAssembly",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcElementAssembly"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/31",
          identification: "31",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "Buitenwandopeningen"
        }
      ]
    },
    {
      type: "IfcElementAssembly",
      name: "NLRS_30_GS_wand_bui_sparing_omranding_RE_leeg - standaard",
      description: "gevelsparingsmaker omkadering bladsparing buiten",
      tag: "693969",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/gevelsparingsmakeromkaderingbladsparingbuiten",
          identification: "gevelsparingsmakeromkaderingbladsparingbuiten",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "gevelsparingsmaker omkadering bladsparing buiten"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcElementAssembly",
          identification: "IfcElementAssembly",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcElementAssembly"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      name: "NLRS_00_GM_WPB_LEEG_ISR - std",
      description: "ISR leeg",
      tag: "693963",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/ISRleeg",
          identification: "ISRleeg",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "ISR leeg"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      name: "NLRS_28_Stalen-latei_vws - NLRS_28_Stalen-latei_vws",
      description: "? ",
      tag: "694001",
      hasAssociations: [
        {
          location: "https://www.volkerwessels.nl",
          identification: "? ",
          referencedSource: {
            type: "IfcClassification",
            name: "BIM Basis Objecten",
            location: "https://www.volkerwessels.nl"
          },
          type: "IfcClassificationReference",
          name: "? "
        },
        {
          location: "https://search-test.bsdd.buildingsmart.org/uri/digibase/bim-basis-objecten",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://search-test.bsdd.buildingsmart.org/uri/digibase/bim-basis-objecten"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      name: "NLRS_41_GM_raamdorpelsteen_beton_vws - RD50/94x160",
      description: "? ",
      tag: "693973",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/?",
          identification: "?",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "? "
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      name: "NLRS_31_GM_WPB_spouwlat met sponning_gen_vws - kunststof boven",
      description: "? ",
      tag: "693982",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/?",
          identification: "?",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "? "
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      name: "NLRS_31_GM_WPB_spouwlat met sponning_gen_vws - kunststof onder",
      description: "? ",
      tag: "693980",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/?",
          identification: "?",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "? "
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      name: "NLRS_31_GM_WPB_spouwlat met sponning_gen_vws - kunststof zijkant",
      description: "? ",
      tag: "693981",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/?",
          identification: "?",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "? "
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      name: "NLRS_31_GM_WPB_vensterbank_gen_vws - 20x200mm multiplex",
      description: "? ",
      tag: "693960",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/?",
          identification: "?",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "? "
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/31.20",
          identification: "31.20",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "buitenwandopeningen; gevuld met ramen, algemeen (verzamelniveau)"
        }
      ]
    },
    {
      type: "IfcWindow",
      name: "NLRS_31_WI_WPB_kozijn_2vlaks_gen_vws - D2 - transcarbo",
      description: "JA01-00",
      tag: "692071",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/JA01-00",
          identification: "JA01-00",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "JA01-00"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcWindow",
          identification: "IfcWindow",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcWindow"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/31.31",
          identification: "31.31",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "buitenwandopeningen; gevuld met deuren, draaideuren"
        }
      ]
    },
    {
      name: "NLRS_30_WI_WP_kozijn draaideel_vws - kunststof_dubbel",
      tag: "693992",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/31.25",
          identification: "31.25",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "buitenwandopeningen; gevuld met ramen, combinatieramen"
        }
      ]
    },
    {
      name: "NLRS_30_WI_WP_kozijn draairichting_gen_vws - kozijn_draairichting",
      description: "draairichting raamkozijn",
      tag: "693984",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/draairichtingraamkozijn",
          identification: "draairichtingraamkozijn",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "draairichting raamkozijn"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/31.20",
          identification: "31.20",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "buitenwandopeningen; gevuld met ramen, algemeen (verzamelniveau)"
        }
      ]
    },
    {
      name: "NLRS_30_WI_WPB_vlakvulling_vast_vws - dubbel",
      description: "isolerend glas",
      tag: "693989",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/isolerendglas",
          identification: "isolerendglas",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "isolerend glas"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/31.20",
          identification: "31.20",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "buitenwandopeningen; gevuld met ramen, algemeen (verzamelniveau)"
        }
      ]
    },
    {
      name: "Floor - NLRS_23_FL_LB_kanaalplaatvloer_200_gen_vws",
      description: "kanaalplaatvloer 200mm",
      tag: "798289",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/kanaalplaatvloer200mm",
          identification: "kanaalplaatvloer200mm",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "kanaalplaatvloer 200mm"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      name: "Basic Roof - NLRS_47_RO_pannen+panlatten_074_gen_vws",
      description: "dakpannen en panlatten 74mm",
      tag: "798292",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/dakpannenenpanlatten74mm",
          identification: "dakpannenenpanlatten74mm",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "dakpannen en panlatten 74mm"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      type: "IfcRoof",
      name: "NLRS_27_GM_LB_knieschot_gen_vws - regels 30x58/spaanplaat 11mm",
      description: "knieschot",
      tag: "798290",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/knieschot",
          identification: "knieschot",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "knieschot"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcRoof",
          identification: "IfcRoof",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcRoof"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      type: "IfcRoof",
      name: "NLRS_27_GM_FWB_muurplaat rond_anker_gen_vws - ronde muurplaat",
      description: "muurplaat",
      tag: "798293",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/muurplaat",
          identification: "muurplaat",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "muurplaat"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcRoof",
          identification: "IfcRoof",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcRoof"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      type: "IfcRoof",
      name: "NLRS_27_GM_FWB_muurplaatanker_gen_vws - h=100 / b=50",
      description: "muurplaat",
      tag: "798254",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/muurplaat",
          identification: "muurplaat",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "muurplaat"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcRoof",
          identification: "IfcRoof",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcRoof"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/27.22",
          identification: "27.22",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "daken; constructief, hellende daken"
        }
      ]
    },
    {
      name: "NLRS_27_GM_FWB_muurplaat_rond_gen_vws - b=70 / h=140",
      description: "",
      tag: "798191",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: ""
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/27.22",
          identification: "27.22",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "daken; constructief, hellende daken"
        }
      ]
    },
    {
      name: "Floor - NLRS_43_FL_LB_cementdekvloer_070_gen_vws",
      description: "cementdekvloer 70mm",
      tag: "798287",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/cementdekvloer70mm",
          identification: "cementdekvloer70mm",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "cementdekvloer 70mm"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      type: "IfcSlab",
      name: "Floor - NLRS_23_FL_LB_kanaalplaatvloer_geïsoleerd_320_gen_vws",
      description: "",
      tag: "1003479",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: ""
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcSlab",
          identification: "IfcSlab",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcSlab"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/21.21",
          identification: "21.21",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "buitenwanden; constructief, massieve wanden"
        }
      ]
    },
    {
      type: "IfcRoof",
      name: "Basic Roof - NLRS_27_RO_dakplaat_scharnierkap_302_gen_vws",
      description: "dak_hout_scharnierkap",
      tag: "798291",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/dak_hout_scharnierkap",
          identification: "dak_hout_scharnierkap",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "dak_hout_scharnierkap"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcRoof",
          identification: "IfcRoof",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcRoof"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/",
          identification: "",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: ""
        }
      ]
    },
    {
      type: "IfcWall",
      name: "wand_hout_HSB_opbouw_ntb - NLRS_22_WA_TLB_HSB_070_gen_vws",
      description: "wand_hout_HSB_opbouw_ntb",
      tag: "1010468",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/wand_hout_HSB_opbouw_ntb",
          identification: "wand_hout_HSB_opbouw_ntb",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "wand_hout_HSB_opbouw_ntb"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcWall",
          identification: "IfcWall",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcWall"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/22.20",
          identification: "22.20",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "binnenwanden; constructief, algemeen (verzamelniveau)"
        }
      ]
    },
    {
      type: "IfcWall",
      name: "wand_gips_metalstud - NLRS_22_WA_TLB_metal-stud_geïsoleerd_250mm_2x_gips_gen_vws",
      description: "wand_gips_metalstud",
      tag: "1013164",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/wand_gips_metalstud",
          identification: "wand_gips_metalstud",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "wand_gips_metalstud"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcWall",
          identification: "IfcWall",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcWall"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/22.20",
          identification: "22.20",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "binnenwanden; constructief, algemeen (verzamelniveau)"
        }
      ]
    },
    {
      type: "IfcDoor",
      name: "NLRS_32_DO_WB_reinaerdt_binnendeur_Model 3(bovenlicht_afgeslankte_bovendorpel)_gen_vws - 880x2315 rod=28/wd70/opdek/stijl_hoogte 2600",
      description: "deurkozijn_staal_bovenlicht_deurblad",
      tag: "1010313",
      hasAssociations: [
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0/class/deurkozijn_staal_bovenlicht_deurblad",
          identification: "deurkozijn_staal_bovenlicht_deurblad",
          referencedSource: {
            type: "IfcClassification",
            name: "Basis bouwproducten",
            location: "https://identifier.buildingsmart.org/uri/digibase/basisbouwproducten/0.8.0"
          },
          type: "IfcClassificationReference",
          name: "deurkozijn_staal_bovenlicht_deurblad"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3/class/IfcDoor",
          identification: "IfcDoor",
          referencedSource: {
            type: "IfcClassification",
            name: "IFC",
            location: "https://identifier.buildingsmart.org/uri/buildingsmart/ifc/4.3"
          },
          type: "IfcClassificationReference",
          name: "IfcDoor"
        },
        {
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021/class/32.31",
          identification: "32.31",
          referencedSource: {
            type: "IfcClassification",
            name: "DigiBase Demo NL-SfB tabel 1",
            location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          },
          type: "IfcClassificationReference",
          name: "binnenwandopeningen; gevuld met deuren, draaideuren"
        }
      ]
    }
  ]
};
function wv() {
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
  typeof t[0] == "string" && jc[t[0]] || (typeof t[0] == "string" && (jc[t[0]] = /* @__PURE__ */ new Date()), wv(...t));
}
const jd = (e, t) => () => {
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
function Wc(e, t, n) {
  e.loadNamespaces(t, jd(e, n));
}
function zc(e, t, n, r) {
  typeof n == "string" && (n = [n]), n.forEach((o) => {
    e.options.ns.indexOf(o) < 0 && e.options.ns.push(o);
  }), e.loadLanguages(t, jd(e, r));
}
function Sv(e, t) {
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
function xv(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return !t.languages || !t.languages.length ? (Yi("i18n.languages were undefined or empty", t.languages), !0) : t.options.ignoreJSONStructure !== void 0 ? t.hasLoadedNamespace(e, {
    lng: n.lng,
    precheck: (o, i) => {
      if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && o.services.backendConnector.backend && o.isLanguageChangingTo && !i(o.isLanguageChangingTo, e))
        return !1;
    }
  }) : Sv(e, t, n);
}
const Cv = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Iv = {
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
}, Ev = (e) => Iv[e], Dv = (e) => e.replace(Cv, Ev);
let Xi = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Dv
};
function Rv() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  Xi = {
    ...Xi,
    ...e
  };
}
function Pv() {
  return Xi;
}
let Wd;
function Av(e) {
  Wd = e;
}
function Nv() {
  return Wd;
}
const Ov = {
  type: "3rdParty",
  init(e) {
    Rv(e.options.react), Av(e);
  }
}, Tv = on();
class $v {
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
const _v = (e, t) => {
  const n = W();
  return V(() => {
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
  } = ut(Tv) || {}, i = n || r || Nv();
  if (i && !i.reportNamespaces && (i.reportNamespaces = new $v()), !i) {
    Yi("You will need to pass in an i18next instance by using initReactI18next");
    const b = (x, C) => typeof C == "string" ? C : C && typeof C == "object" && typeof C.defaultValue == "string" ? C.defaultValue : Array.isArray(x) ? x[x.length - 1] : x, v = [b, {}, !1];
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
  const u = (i.isInitialized || i.initializedStoreOnce) && l.every((b) => xv(b, i, s));
  function f() {
    return i.getFixedT(t.lng || null, s.nsMode === "fallback" ? l : l[0], c);
  }
  const [d, p] = U(f);
  let m = l.join();
  t.lng && (m = `${t.lng}${m}`);
  const g = _v(m), h = W(!0);
  V(() => {
    const {
      bindI18n: b,
      bindI18nStore: v
    } = s;
    h.current = !0, !u && !a && (t.lng ? zc(i, t.lng, l, () => {
      h.current && p(f);
    }) : Wc(i, l, () => {
      h.current && p(f);
    })), u && g && g !== m && h.current && p(f);
    function x() {
      h.current && p(f);
    }
    return b && i && i.on(b, x), v && i && i.store.on(v, x), () => {
      h.current = !1, b && i && b.split(" ").forEach((C) => i.off(C, x)), v && i && v.split(" ").forEach((C) => i.store.off(C, x));
    };
  }, [i, m]);
  const w = W(!0);
  V(() => {
    h.current && !w.current && p(f), w.current = !1;
  }, [i, c]);
  const y = [d, i, u];
  if (y.t = d, y.i18n = i, y.ready = u, u || !u && !a)
    return y;
  throw new Promise((b) => {
    t.lng ? zc(i, t.lng, l, () => b()) : Wc(i, l, () => b());
  });
}
var zd = { exports: {} }, Vd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yn = S;
function Lv(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var kv = typeof Object.is == "function" ? Object.is : Lv, Bv = yn.useState, Mv = yn.useEffect, Fv = yn.useLayoutEffect, jv = yn.useDebugValue;
function Wv(e, t) {
  var n = t(), r = Bv({ inst: { value: n, getSnapshot: t } }), o = r[0].inst, i = r[1];
  return Fv(function() {
    o.value = n, o.getSnapshot = t, wi(o) && i({ inst: o });
  }, [e, n, t]), Mv(function() {
    return wi(o) && i({ inst: o }), e(function() {
      wi(o) && i({ inst: o });
    });
  }, [e]), jv(n), n;
}
function wi(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !kv(e, n);
  } catch {
    return !0;
  }
}
function zv(e, t) {
  return t();
}
var Vv = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? zv : Wv;
Vd.useSyncExternalStore = yn.useSyncExternalStore !== void 0 ? yn.useSyncExternalStore : Vv;
zd.exports = Vd;
var Gd = zd.exports, Hd = { exports: {} }, Ud = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Io = S, Gv = Gd;
function Hv(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Uv = typeof Object.is == "function" ? Object.is : Hv, qv = Gv.useSyncExternalStore, Kv = Io.useRef, Yv = Io.useEffect, Xv = Io.useMemo, Jv = Io.useDebugValue;
Ud.useSyncExternalStoreWithSelector = function(e, t, n, r, o) {
  var i = Kv(null);
  if (i.current === null) {
    var s = { hasValue: !1, value: null };
    i.current = s;
  } else
    s = i.current;
  i = Xv(function() {
    function c(p) {
      if (!l) {
        if (l = !0, u = p, p = r(p), o !== void 0 && s.hasValue) {
          var m = s.value;
          if (o(m, p))
            return f = m;
        }
        return f = p;
      }
      if (m = f, Uv(u, p))
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
  var a = qv(e, i[0], i[1]);
  return Yv(function() {
    s.hasValue = !0, s.value = a;
  }, [a]), Jv(a), a;
};
Hd.exports = Ud;
var Qv = Hd.exports;
function Zv(e) {
  e();
}
let qd = Zv;
const e0 = (e) => qd = e, t0 = () => qd, Vc = Symbol.for("react-redux-context"), Gc = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function n0() {
  var e;
  if (!R.createContext)
    return {};
  const t = (e = Gc[Vc]) != null ? e : Gc[Vc] = /* @__PURE__ */ new Map();
  let n = t.get(R.createContext);
  return n || (n = R.createContext(null), t.set(R.createContext, n)), n;
}
const Et = /* @__PURE__ */ n0();
function ba(e = Et) {
  return function() {
    return ut(e);
  };
}
const Kd = /* @__PURE__ */ ba(), Yd = () => {
  throw new Error("uSES not initialized!");
};
let Xd = Yd;
const r0 = (e) => {
  Xd = e;
}, o0 = (e, t) => e === t;
function i0(e = Et) {
  const t = e === Et ? Kd : ba(e);
  return function(r, o = {}) {
    const {
      equalityFn: i = o0,
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
    W(!0);
    const p = Q({
      [r.name](g) {
        return r(g);
      }
    }[r.name], [r, f, s]), m = Xd(l.addNestedSub, c.getState, u || c.getState, p, i);
    return cm(m), m;
  };
}
const s0 = /* @__PURE__ */ i0();
var Jd = { exports: {} }, Z = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var me = typeof Symbol == "function" && Symbol.for, ya = me ? Symbol.for("react.element") : 60103, va = me ? Symbol.for("react.portal") : 60106, Eo = me ? Symbol.for("react.fragment") : 60107, Do = me ? Symbol.for("react.strict_mode") : 60108, Ro = me ? Symbol.for("react.profiler") : 60114, Po = me ? Symbol.for("react.provider") : 60109, Ao = me ? Symbol.for("react.context") : 60110, wa = me ? Symbol.for("react.async_mode") : 60111, No = me ? Symbol.for("react.concurrent_mode") : 60111, Oo = me ? Symbol.for("react.forward_ref") : 60112, To = me ? Symbol.for("react.suspense") : 60113, a0 = me ? Symbol.for("react.suspense_list") : 60120, $o = me ? Symbol.for("react.memo") : 60115, _o = me ? Symbol.for("react.lazy") : 60116, c0 = me ? Symbol.for("react.block") : 60121, l0 = me ? Symbol.for("react.fundamental") : 60117, u0 = me ? Symbol.for("react.responder") : 60118, d0 = me ? Symbol.for("react.scope") : 60119;
function He(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case ya:
        switch (e = e.type, e) {
          case wa:
          case No:
          case Eo:
          case Ro:
          case Do:
          case To:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case Ao:
              case Oo:
              case _o:
              case $o:
              case Po:
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
function Qd(e) {
  return He(e) === No;
}
Z.AsyncMode = wa;
Z.ConcurrentMode = No;
Z.ContextConsumer = Ao;
Z.ContextProvider = Po;
Z.Element = ya;
Z.ForwardRef = Oo;
Z.Fragment = Eo;
Z.Lazy = _o;
Z.Memo = $o;
Z.Portal = va;
Z.Profiler = Ro;
Z.StrictMode = Do;
Z.Suspense = To;
Z.isAsyncMode = function(e) {
  return Qd(e) || He(e) === wa;
};
Z.isConcurrentMode = Qd;
Z.isContextConsumer = function(e) {
  return He(e) === Ao;
};
Z.isContextProvider = function(e) {
  return He(e) === Po;
};
Z.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === ya;
};
Z.isForwardRef = function(e) {
  return He(e) === Oo;
};
Z.isFragment = function(e) {
  return He(e) === Eo;
};
Z.isLazy = function(e) {
  return He(e) === _o;
};
Z.isMemo = function(e) {
  return He(e) === $o;
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
  return He(e) === To;
};
Z.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Eo || e === No || e === Ro || e === Do || e === To || e === a0 || typeof e == "object" && e !== null && (e.$$typeof === _o || e.$$typeof === $o || e.$$typeof === Po || e.$$typeof === Ao || e.$$typeof === Oo || e.$$typeof === l0 || e.$$typeof === u0 || e.$$typeof === d0 || e.$$typeof === c0);
};
Z.typeOf = He;
Jd.exports = Z;
var f0 = Jd.exports, Sa = f0, p0 = {
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
}, m0 = {
  name: !0,
  length: !0,
  prototype: !0,
  caller: !0,
  callee: !0,
  arguments: !0,
  arity: !0
}, g0 = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, Zd = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, xa = {};
xa[Sa.ForwardRef] = g0;
xa[Sa.Memo] = Zd;
function Hc(e) {
  return Sa.isMemo(e) ? Zd : xa[e.$$typeof] || p0;
}
var h0 = Object.defineProperty, b0 = Object.getOwnPropertyNames, Uc = Object.getOwnPropertySymbols, y0 = Object.getOwnPropertyDescriptor, v0 = Object.getPrototypeOf, qc = Object.prototype;
function ef(e, t, n) {
  if (typeof t != "string") {
    if (qc) {
      var r = v0(t);
      r && r !== qc && ef(e, r, n);
    }
    var o = b0(t);
    Uc && (o = o.concat(Uc(t)));
    for (var i = Hc(e), s = Hc(t), a = 0; a < o.length; ++a) {
      var c = o[a];
      if (!m0[c] && !(n && n[c]) && !(s && s[c]) && !(i && i[c])) {
        var l = y0(t, c);
        try {
          h0(e, c, l);
        } catch {
        }
      }
    }
  }
  return e;
}
var w0 = ef;
const Kc = /* @__PURE__ */ ou(w0);
var tf = { exports: {} }, ee = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ca = Symbol.for("react.element"), Ia = Symbol.for("react.portal"), Lo = Symbol.for("react.fragment"), ko = Symbol.for("react.strict_mode"), Bo = Symbol.for("react.profiler"), Mo = Symbol.for("react.provider"), Fo = Symbol.for("react.context"), S0 = Symbol.for("react.server_context"), jo = Symbol.for("react.forward_ref"), Wo = Symbol.for("react.suspense"), zo = Symbol.for("react.suspense_list"), Vo = Symbol.for("react.memo"), Go = Symbol.for("react.lazy"), x0 = Symbol.for("react.offscreen"), nf;
nf = Symbol.for("react.module.reference");
function rt(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Ca:
        switch (e = e.type, e) {
          case Lo:
          case Bo:
          case ko:
          case Wo:
          case zo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case S0:
              case Fo:
              case jo:
              case Go:
              case Vo:
              case Mo:
                return e;
              default:
                return t;
            }
        }
      case Ia:
        return t;
    }
  }
}
ee.ContextConsumer = Fo;
ee.ContextProvider = Mo;
ee.Element = Ca;
ee.ForwardRef = jo;
ee.Fragment = Lo;
ee.Lazy = Go;
ee.Memo = Vo;
ee.Portal = Ia;
ee.Profiler = Bo;
ee.StrictMode = ko;
ee.Suspense = Wo;
ee.SuspenseList = zo;
ee.isAsyncMode = function() {
  return !1;
};
ee.isConcurrentMode = function() {
  return !1;
};
ee.isContextConsumer = function(e) {
  return rt(e) === Fo;
};
ee.isContextProvider = function(e) {
  return rt(e) === Mo;
};
ee.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ca;
};
ee.isForwardRef = function(e) {
  return rt(e) === jo;
};
ee.isFragment = function(e) {
  return rt(e) === Lo;
};
ee.isLazy = function(e) {
  return rt(e) === Go;
};
ee.isMemo = function(e) {
  return rt(e) === Vo;
};
ee.isPortal = function(e) {
  return rt(e) === Ia;
};
ee.isProfiler = function(e) {
  return rt(e) === Bo;
};
ee.isStrictMode = function(e) {
  return rt(e) === ko;
};
ee.isSuspense = function(e) {
  return rt(e) === Wo;
};
ee.isSuspenseList = function(e) {
  return rt(e) === zo;
};
ee.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Lo || e === Bo || e === ko || e === Wo || e === zo || e === x0 || typeof e == "object" && e !== null && (e.$$typeof === Go || e.$$typeof === Vo || e.$$typeof === Mo || e.$$typeof === Fo || e.$$typeof === jo || e.$$typeof === nf || e.getModuleId !== void 0);
};
ee.typeOf = rt;
tf.exports = ee;
var C0 = tf.exports;
const I0 = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];
function E0(e, t, n, r, {
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
    const v = !i(b, l), x = !o(y, c, b, l);
    return c = y, l = b, v && x ? m() : v ? g() : x ? h() : d;
  }
  return function(b, v) {
    return a ? w(b, v) : p(b, v);
  };
}
function D0(e, t) {
  let {
    initMapStateToProps: n,
    initMapDispatchToProps: r,
    initMergeProps: o
  } = t, i = Ld(t, I0);
  const s = n(e, i), a = r(e, i), c = o(e, i);
  return E0(s, a, c, e, i);
}
function R0(e, t) {
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
function rf(e, t) {
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
function Ea(e, t) {
  return (n, r) => {
    throw new Error(`Invalid value of type ${typeof e} for ${t} argument when connecting component ${r.wrappedComponentName}.`);
  };
}
function P0(e) {
  return e && typeof e == "object" ? Ji((t) => (
    // @ts-ignore
    R0(e, t)
  )) : e ? typeof e == "function" ? (
    // @ts-ignore
    rf(e)
  ) : Ea(e, "mapDispatchToProps") : Ji((t) => ({
    dispatch: t
  }));
}
function A0(e) {
  return e ? typeof e == "function" ? (
    // @ts-ignore
    rf(e)
  ) : Ea(e, "mapStateToProps") : Ji(() => ({}));
}
function N0(e, t, n) {
  return Tt({}, n, e, t);
}
function O0(e) {
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
function T0(e) {
  return e ? typeof e == "function" ? O0(e) : Ea(e, "mergeProps") : () => N0;
}
function $0() {
  const e = t0();
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
function of(e, t) {
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
    o++, n || (n = t ? t.addNestedSub(c) : e.subscribe(c), r = $0());
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
const _0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", jr = _0 ? R.useLayoutEffect : R.useEffect;
function Jc(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Si(e, t) {
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
const L0 = ["reactReduxForwardedRef"];
let sf = Yd;
const k0 = (e) => {
  sf = e;
}, B0 = [null, null];
function M0(e, t, n) {
  jr(() => e(...t), n);
}
function F0(e, t, n, r, o, i) {
  e.current = r, n.current = !1, o.current && (o.current = null, i());
}
function j0(e, t, n, r, o, i, s, a, c, l, u) {
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
function W0(e, t) {
  return e === t;
}
function af(e, t, n, {
  // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
  // @ts-ignore
  pure: r,
  areStatesEqual: o = W0,
  areOwnPropsEqual: i = Si,
  areStatePropsEqual: s = Si,
  areMergedPropsEqual: a = Si,
  // use React's forwardRef to expose a ref of the wrapped component
  forwardRef: c = !1,
  // the context consumer to use
  context: l = Et
} = {}) {
  const u = l, f = A0(e), d = P0(t), p = T0(n), m = !!e;
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
    function v(E) {
      const [I, N, $] = R.useMemo(() => {
        const {
          reactReduxForwardedRef: ae
        } = E, Y = Ld(E, L0);
        return [E.context, ae, Y];
      }, [E]), T = R.useMemo(() => I && I.Consumer && // @ts-ignore
      C0.isContextConsumer(/* @__PURE__ */ R.createElement(I.Consumer, null)) ? I : u, [I, u]), L = R.useContext(T), k = !!E.store && !!E.store.getState && !!E.store.dispatch, A = !!L && !!L.store, _ = k ? E.store : L.store, P = A ? L.getServerState : _.getState, F = R.useMemo(() => D0(_.dispatch, b), [_]), [O, G] = R.useMemo(() => {
        if (!m)
          return B0;
        const ae = of(_, k ? void 0 : L.subscription), Y = ae.notifyNestedSubs.bind(ae);
        return [ae, Y];
      }, [_, k, L]), X = R.useMemo(() => k ? L : Tt({}, L, {
        subscription: O
      }), [k, L, O]), ne = R.useRef(), ve = R.useRef($), le = R.useRef(), Oe = R.useRef(!1);
      R.useRef(!1);
      const we = R.useRef(!1), re = R.useRef();
      jr(() => (we.current = !0, () => {
        we.current = !1;
      }), []);
      const Se = R.useMemo(() => () => le.current && $ === ve.current ? le.current : F(_.getState(), $), [_, $]), ke = R.useMemo(() => (Y) => O ? j0(
        m,
        _,
        O,
        // @ts-ignore
        F,
        ve,
        ne,
        Oe,
        we,
        le,
        G,
        Y
      ) : () => {
      }, [O]);
      M0(F0, [ve, ne, Oe, $, le, G]);
      let Ie;
      try {
        Ie = sf(
          // TODO We're passing through a big wrapper that does a bunch of extra side effects besides subscribing
          ke,
          // TODO This is incredibly hacky. We've already processed the store update and calculated new child props,
          // TODO and we're just passing that through so it triggers a re-render for us rather than relying on `uSES`.
          Se,
          P ? () => F(P(), $) : Se
        );
      } catch (ae) {
        throw re.current && (ae.message += `
The error may be correlated with this previous error:
${re.current.stack}

`), ae;
      }
      jr(() => {
        re.current = void 0, le.current = void 0, ne.current = Ie;
      });
      const Ee = R.useMemo(() => (
        // @ts-ignore
        /* @__PURE__ */ R.createElement(h, Tt({}, Ie, {
          ref: N
        }))
      ), [N, h, Ie]);
      return R.useMemo(() => m ? /* @__PURE__ */ R.createElement(T.Provider, {
        value: X
      }, Ee) : Ee, [T, Ee, X]);
    }
    const C = R.memo(v);
    if (C.WrappedComponent = h, C.displayName = v.displayName = y, c) {
      const I = R.forwardRef(function($, T) {
        return /* @__PURE__ */ R.createElement(C, Tt({}, $, {
          reactReduxForwardedRef: T
        }));
      });
      return I.displayName = y, I.WrappedComponent = h, Kc(I, h);
    }
    return Kc(C, h);
  };
}
function cf({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: o = "once",
  noopCheck: i = "once"
}) {
  const s = R.useMemo(() => {
    const l = of(e);
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
  const c = t || Et;
  return /* @__PURE__ */ R.createElement(c.Provider, {
    value: s
  }, n);
}
function lf(e = Et) {
  const t = (
    // @ts-ignore
    e === Et ? Kd : (
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
const z0 = /* @__PURE__ */ lf();
function V0(e = Et) {
  const t = (
    // @ts-ignore
    e === Et ? z0 : lf(e)
  );
  return function() {
    return t().dispatch;
  };
}
const G0 = /* @__PURE__ */ V0();
r0(Qv.useSyncExternalStoreWithSelector);
k0(Gd.useSyncExternalStore);
e0(dm);
const ur = G0, ue = s0;
function be(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var H0 = /* @__PURE__ */ (() => typeof Symbol == "function" && Symbol.observable || "@@observable")(), Qc = H0, xi = () => Math.random().toString(36).substring(7).split("").join("."), U0 = {
  INIT: `@@redux/INIT${xi()}`,
  REPLACE: `@@redux/REPLACE${xi()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${xi()}`
}, Wr = U0;
function Da(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function uf(e, t, n) {
  if (typeof e != "function")
    throw new Error(be(2));
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(be(0));
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(be(1));
    return n(uf)(e, t);
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
      type: Wr.REPLACE
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
    type: Wr.INIT
  }), {
    dispatch: d,
    subscribe: f,
    getState: u,
    replaceReducer: p,
    [Qc]: m
  };
}
function q0(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (typeof n(void 0, {
      type: Wr.INIT
    }) > "u")
      throw new Error(be(12));
    if (typeof n(void 0, {
      type: Wr.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(be(13));
  });
}
function K0(e) {
  const t = Object.keys(e), n = {};
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    typeof e[s] == "function" && (n[s] = e[s]);
  }
  const r = Object.keys(n);
  let o;
  try {
    q0(n);
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
function zr(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, n) => (...r) => t(n(...r)));
}
function Y0(...e) {
  return (t) => (n, r) => {
    const o = t(n, r);
    let i = () => {
      throw new Error(be(15));
    };
    const s = {
      getState: o.getState,
      dispatch: (c, ...l) => i(c, ...l)
    }, a = e.map((c) => c(s));
    return i = zr(...a)(o.dispatch), {
      ...o,
      dispatch: i
    };
  };
}
function X0(e) {
  return Da(e) && "type" in e && typeof e.type == "string";
}
var df = Symbol.for("immer-nothing"), Zc = Symbol.for("immer-draftable"), Ve = Symbol.for("immer-state");
function ot(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var vn = Object.getPrototypeOf;
function jt(e) {
  return !!e && !!e[Ve];
}
function Dt(e) {
  var t;
  return e ? ff(e) || Array.isArray(e) || !!e[Zc] || !!((t = e.constructor) != null && t[Zc]) || Uo(e) || qo(e) : !1;
}
var J0 = Object.prototype.constructor.toString();
function ff(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = vn(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === J0;
}
function Vn(e, t) {
  Ho(e) === 0 ? Object.entries(e).forEach(([n, r]) => {
    t(n, r, e);
  }) : e.forEach((n, r) => t(r, n, e));
}
function Ho(e) {
  const t = e[Ve];
  return t ? t.type_ : Array.isArray(e) ? 1 : Uo(e) ? 2 : qo(e) ? 3 : 0;
}
function Qi(e, t) {
  return Ho(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function pf(e, t, n) {
  const r = Ho(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
}
function Q0(e, t) {
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
  if (!t && ff(e))
    return vn(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
  const n = Object.getOwnPropertyDescriptors(e);
  delete n[Ve];
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
  return Ko(e) || jt(e) || !Dt(e) || (Ho(e) > 1 && (e.set = e.add = e.clear = e.delete = Z0), Object.freeze(e), t && Vn(e, (n, r) => Ra(r, !0))), e;
}
function Z0() {
  ot(2);
}
function Ko(e) {
  return Object.isFrozen(e);
}
var ew = {};
function nn(e) {
  const t = ew[e];
  return t || ot(0, e), t;
}
var Gn;
function mf() {
  return Gn;
}
function tw(e, t) {
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
  ts(e), e.drafts_.forEach(nw), e.drafts_ = null;
}
function ts(e) {
  e === Gn && (Gn = e.parent_);
}
function tl(e) {
  return Gn = tw(Gn, e);
}
function nw(e) {
  const t = e[Ve];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function nl(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[Ve].modified_ && (es(t), ot(4)), Dt(e) && (e = Vr(t, e), t.parent_ || Gr(t, e)), t.patches_ && nn("Patches").generateReplacementPatches_(
    n[Ve].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = Vr(t, n, []), es(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== df ? e : void 0;
}
function Vr(e, t, n) {
  if (Ko(t))
    return t;
  const r = t[Ve];
  if (!r)
    return Vn(
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
    r.type_ === 3 && (i = new Set(o), o.clear(), s = !0), Vn(
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
    !Qi(t.assigned_, r) ? i.concat(r) : void 0, c = Vr(e, o, a);
    if (pf(n, r, c), jt(c))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    s && n.add(o);
  if (Dt(o) && !Ko(o)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    Vr(e, o), (!t || !t.scope_.parent_) && Gr(e, o);
  }
}
function Gr(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Ra(t, n);
}
function rw(e, t) {
  const n = Array.isArray(e), r = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : mf(),
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
  let o = r, i = Pa;
  n && (o = [r], i = Hn);
  const { revoke: s, proxy: a } = Proxy.revocable(o, i);
  return r.draft_ = a, r.revoke_ = s, a;
}
var Pa = {
  get(e, t) {
    if (t === Ve)
      return e;
    const n = Xt(e);
    if (!Qi(n, t))
      return ow(e, n, t);
    const r = n[t];
    return e.finalized_ || !Dt(r) ? r : r === Ci(e.base_, t) ? (Ii(e), e.copy_[t] = rs(r, e)) : r;
  },
  has(e, t) {
    return t in Xt(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Xt(e));
  },
  set(e, t, n) {
    const r = gf(Xt(e), t);
    if (r != null && r.set)
      return r.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const o = Ci(Xt(e), t), i = o == null ? void 0 : o[Ve];
      if (i && i.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (Q0(n, o) && (n !== void 0 || Qi(e.base_, t)))
        return !0;
      Ii(e), ns(e);
    }
    return e.copy_[t] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Ci(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Ii(e), ns(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
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
Vn(Pa, (e, t) => {
  Hn[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Hn.deleteProperty = function(e, t) {
  return Hn.set.call(this, e, t, void 0);
};
Hn.set = function(e, t, n) {
  return Pa.set.call(this, e[0], t, n, e[0]);
};
function Ci(e, t) {
  const n = e[Ve];
  return (n ? Xt(n) : e)[t];
}
function ow(e, t, n) {
  var o;
  const r = gf(t, n);
  return r ? "value" in r ? r.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (o = r.get) == null ? void 0 : o.call(e.draft_)
  ) : void 0;
}
function gf(e, t) {
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
function Ii(e) {
  e.copy_ || (e.copy_ = Zi(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var iw = class {
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
        if (o = n(t), o === void 0 && (o = t), o === df && (o = void 0), this.autoFreeze_ && Ra(o, !0), r) {
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
    Dt(e) || ot(8), jt(e) && (e = hf(e));
    const t = tl(this), n = rs(e, void 0);
    return n[Ve].isManual_ = !0, ts(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[Ve];
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
  const n = Uo(e) ? nn("MapSet").proxyMap_(e, t) : qo(e) ? nn("MapSet").proxySet_(e, t) : rw(e, t);
  return (t ? t.scope_ : mf()).drafts_.push(n), n;
}
function hf(e) {
  return jt(e) || ot(10, e), bf(e);
}
function bf(e) {
  if (!Dt(e) || Ko(e))
    return e;
  const t = e[Ve];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = Zi(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = Zi(e, !0);
  return Vn(n, (r, o) => {
    pf(n, r, bf(o));
  }), t && (t.finalized_ = !1), n;
}
var Ge = new iw(), yf = Ge.produce;
Ge.produceWithPatches.bind(
  Ge
);
Ge.setAutoFreeze.bind(Ge);
Ge.setUseStrictShallowCopy.bind(Ge);
Ge.applyPatches.bind(Ge);
Ge.createDraft.bind(Ge);
Ge.finishDraft.bind(Ge);
function sw(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function aw(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function cw(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (r) => typeof r == "function" ? `function ${r.name || "unnamed"}()` : typeof r
    ).join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var ol = (e) => Array.isArray(e) ? e : [e];
function lw(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return cw(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function uw(e, t) {
  const n = [], { length: r } = e;
  for (let o = 0; o < r; o++)
    n.push(e[o].apply(null, t));
  return n;
}
var dw = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, fw = typeof WeakRef < "u" ? WeakRef : dw, pw = 0, il = 1;
function vr() {
  return {
    s: pw,
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
      d != null && r(d, u) && (u = d, i !== 0 && i--), o = typeof u == "object" && u !== null || typeof u == "function" ? new fw(u) : u;
    }
    return l.v = u, u;
  }
  return s.clearCache = () => {
    n = vr(), s.resetResultsCount();
  }, s.resultsCount = () => i, s.resetResultsCount = () => {
    i = 0;
  }, s;
}
function vf(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, r = (...o) => {
    let i = 0, s = 0, a, c = {}, l = o.pop();
    typeof l == "object" && (c = l, l = o.pop()), sw(
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
    } = u, h = ol(d), w = ol(m), y = lw(o), b = f(function() {
      return i++, l.apply(
        null,
        arguments
      );
    }, ...h), v = p(function() {
      s++;
      const C = uw(
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
var wf = /* @__PURE__ */ vf(Aa), mw = Object.assign(
  (e, t = wf) => {
    aw(
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
  { withTypes: () => mw }
);
function Sf(e) {
  return ({ dispatch: n, getState: r }) => (o) => (i) => typeof i == "function" ? i(n, r, e) : o(i);
}
var gw = Sf(), hw = Sf, bw = (...e) => {
  const t = vf(...e), n = Object.assign((...r) => {
    const o = t(...r), i = (s, ...a) => o(jt(s) ? hf(s) : s, ...a);
    return Object.assign(i, o), i;
  }, {
    withTypes: () => n
  });
  return n;
};
bw(Aa);
var yw = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? zr : zr.apply(null, arguments);
}, vw = (e) => e && typeof e.match == "function";
function xt(e, t) {
  function n(...r) {
    if (t) {
      let o = t(...r);
      if (!o)
        throw new Error(Le(0));
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
  return n.toString = () => `${e}`, n.type = e, n.match = (r) => X0(r) && r.type === e, n;
}
var xf = class Bn extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Bn.prototype);
  }
  static get [Symbol.species]() {
    return Bn;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Bn(...t[0].concat(this)) : new Bn(...t.concat(this));
  }
};
function sl(e) {
  return Dt(e) ? yf(e, () => {
  }) : e;
}
function al(e, t, n) {
  if (e.has(t)) {
    let o = e.get(t);
    return n.update && (o = n.update(o, t, e), e.set(t, o)), o;
  }
  if (!n.insert)
    throw new Error(Le(10));
  const r = n.insert(t, e);
  return e.set(t, r), r;
}
function ww(e) {
  return typeof e == "boolean";
}
var Sw = () => function(t) {
  const {
    thunk: n = !0,
    immutableCheck: r = !0,
    serializableCheck: o = !0,
    actionCreatorCheck: i = !0
  } = t ?? {};
  let s = new xf();
  return n && (ww(n) ? s.push(gw) : s.push(hw(n.extraArgument))), s;
}, xw = "RTK_autoBatch", Cf = (e) => (t) => {
  setTimeout(t, e);
}, Cw = typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : Cf(10), Iw = (e = {
  type: "raf"
}) => (t) => (...n) => {
  const r = t(...n);
  let o = !0, i = !1, s = !1;
  const a = /* @__PURE__ */ new Set(), c = e.type === "tick" ? queueMicrotask : e.type === "raf" ? Cw : e.type === "callback" ? e.queueNotification : Cf(e.timeout), l = () => {
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
        return o = !((f = u == null ? void 0 : u.meta) != null && f[xw]), i = !o, i && (s || (s = !0, c(l))), r.dispatch(u);
      } finally {
        o = !0;
      }
    }
  });
}, Ew = (e) => function(n) {
  const {
    autoBatch: r = !0
  } = n ?? {};
  let o = new xf(e);
  return r && o.push(Iw(typeof r == "object" ? r : void 0)), o;
}, Dw = !0;
function Rw(e) {
  const t = Sw(), {
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
    a = K0(n);
  else
    throw new Error(Le(1));
  let c;
  typeof r == "function" ? c = r(t) : c = t();
  let l = zr;
  o && (l = yw({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !Dw,
    ...typeof o == "object" && o
  }));
  const u = Y0(...c), f = Ew(u);
  let d = typeof s == "function" ? s(f) : f();
  const p = l(...d);
  return uf(a, i, p);
}
function If(e) {
  const t = {}, n = [];
  let r;
  const o = {
    addCase(i, s) {
      const a = typeof i == "string" ? i : i.type;
      if (!a)
        throw new Error(Le(28));
      if (a in t)
        throw new Error(Le(29));
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
function Aw(e, t) {
  let [n, r, o] = If(t), i;
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
            return yf(u, (d) => f(d, c));
          {
            const d = f(u, c);
            if (d === void 0) {
              if (u === null)
                return u;
              throw new Error(Le(9));
            }
            return d;
          }
        }
      return u;
    }, a);
  }
  return s.getInitialState = i, s;
}
var Nw = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", Ef = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += Nw[Math.random() * 64 | 0];
  return t;
}, Ow = (e, t) => vw(e) ? e.match(t) : e(t);
function Tw(...e) {
  return (t) => e.some((n) => Ow(n, t));
}
var $w = ["name", "message", "stack", "code"], Ei = class {
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
}, _w = (e) => {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n of $w)
      typeof e[n] == "string" && (t[n] = e[n]);
    return t;
  }
  return {
    message: String(e)
  };
}, Lw = /* @__PURE__ */ (() => {
  function e(t, n, r) {
    const o = xt(t + "/fulfilled", (c, l, u, f) => ({
      payload: c,
      meta: {
        ...f || {},
        arg: u,
        requestId: l,
        requestStatus: "fulfilled"
      }
    })), i = xt(t + "/pending", (c, l, u) => ({
      payload: void 0,
      meta: {
        ...u || {},
        arg: l,
        requestId: c,
        requestStatus: "pending"
      }
    })), s = xt(t + "/rejected", (c, l, u, f, d) => ({
      payload: f,
      error: (r && r.serializeError || _w)(c || "Rejected"),
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
        const d = r != null && r.idGenerator ? r.idGenerator(c) : Ef(), p = new AbortController();
        let m, g;
        function h(y) {
          g = y, p.abort();
        }
        const w = async function() {
          var v, x;
          let y;
          try {
            let C = (v = r == null ? void 0 : r.condition) == null ? void 0 : v.call(r, c, {
              getState: u,
              extra: f
            });
            if (Bw(C) && (C = await C), C === !1 || p.signal.aborted)
              throw {
                name: "ConditionError",
                message: "Aborted due to condition callback returning false."
              };
            const E = new Promise((I, N) => {
              m = () => {
                N({
                  name: "AbortError",
                  message: g || "Aborted"
                });
              }, p.signal.addEventListener("abort", m);
            });
            l(i(d, c, (x = r == null ? void 0 : r.getPendingMeta) == null ? void 0 : x.call(r, {
              requestId: d,
              arg: c
            }, {
              getState: u,
              extra: f
            }))), y = await Promise.race([E, Promise.resolve(n(c, {
              dispatch: l,
              getState: u,
              extra: f,
              requestId: d,
              signal: p.signal,
              abort: h,
              rejectWithValue: (I, N) => new Ei(I, N),
              fulfillWithValue: (I, N) => new cl(I, N)
            })).then((I) => {
              if (I instanceof Ei)
                throw I;
              return I instanceof cl ? o(I.payload, d, c, I.meta) : o(I, d, c);
            })]);
          } catch (C) {
            y = C instanceof Ei ? s(null, d, c, C.payload, C.meta) : s(C, d, c);
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
            return w.then(kw);
          }
        });
      };
    }
    return Object.assign(a, {
      pending: i,
      rejected: s,
      fulfilled: o,
      settled: Tw(s, o),
      typePrefix: t
    });
  }
  return e.withTypes = () => e, e;
})();
function kw(e) {
  if (e.meta && e.meta.rejectedWithValue)
    throw e.payload;
  if (e.error)
    throw e.error;
  return e.payload;
}
function Bw(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var Mw = Symbol.for("rtk-slice-createasyncthunk");
function Fw(e, t) {
  return `${e}/${t}`;
}
function jw({
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
      throw new Error(Le(11));
    typeof process < "u";
    const a = (typeof o.reducers == "function" ? o.reducers(zw()) : o.reducers) || {}, c = Object.keys(a), l = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, u = {
      addCase(b, v) {
        const x = typeof b == "string" ? b : b.type;
        if (!x)
          throw new Error(Le(12));
        if (x in l.sliceCaseReducersByType)
          throw new Error(Le(13));
        return l.sliceCaseReducersByType[x] = v, u;
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
      const v = a[b], x = {
        reducerName: b,
        type: Fw(i, b),
        createNotation: typeof o.reducers == "function"
      };
      Gw(v) ? Uw(x, v, u, t) : Vw(x, v, u);
    });
    function f() {
      const [b = {}, v = [], x = void 0] = typeof o.extraReducers == "function" ? If(o.extraReducers) : [o.extraReducers], C = {
        ...b,
        ...l.sliceCaseReducersByType
      };
      return Aw(o.initialState, (E) => {
        for (let I in C)
          E.addCase(I, C[I]);
        for (let I of l.sliceMatchers)
          E.addMatcher(I.matcher, I.reducer);
        for (let I of v)
          E.addMatcher(I.matcher, I.reducer);
        x && E.addDefaultCase(x);
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
      function x(E) {
        let I = E[b];
        return typeof I > "u" && v && (I = h()), I;
      }
      function C(E = d) {
        const I = al(p, v, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return al(I, E, {
          insert: () => {
            const N = {};
            for (const [$, T] of Object.entries(o.selectors ?? {}))
              N[$] = Ww(T, E, h, v);
            return N;
          }
        });
      }
      return {
        reducerPath: b,
        getSelectors: C,
        get selectors() {
          return C(x);
        },
        selectSlice: x
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
        ...x
      } = {}) {
        const C = v ?? s;
        return b.inject({
          reducerPath: C,
          reducer: g
        }, x), {
          ...y,
          ...w(C, !0)
        };
      }
    };
    return y;
  };
}
function Ww(e, t, n, r) {
  function o(i, ...s) {
    let a = t(i);
    return typeof a > "u" && r && (a = n()), e(a, ...s);
  }
  return o.unwrapped = e, o;
}
var Na = jw();
function zw() {
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
function Vw({
  type: e,
  reducerName: t,
  createNotation: n
}, r, o) {
  let i, s;
  if ("reducer" in r) {
    if (n && !Hw(r))
      throw new Error(Le(17));
    i = r.reducer, s = r.prepare;
  } else
    i = r;
  o.addCase(e, i).exposeCaseReducer(t, i).exposeAction(t, s ? xt(e, s) : xt(e));
}
function Gw(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Hw(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Uw({
  type: e,
  reducerName: t
}, n, r, o) {
  if (!o)
    throw new Error(Le(18));
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
var qw = (e, t) => {
  if (typeof e != "function")
    throw new Error(Le(32));
}, Oa = "listenerMiddleware", Kw = (e) => {
  let {
    type: t,
    actionCreator: n,
    matcher: r,
    predicate: o,
    effect: i
  } = e;
  if (t)
    o = xt(t).match;
  else if (n)
    t = n.type, o = n.match;
  else if (r)
    o = r;
  else if (!o)
    throw new Error(Le(21));
  return qw(i), {
    predicate: o,
    type: t,
    effect: i
  };
}, Yw = Object.assign((e) => {
  const {
    type: t,
    predicate: n,
    effect: r
  } = Kw(e);
  return {
    id: Ef(),
    effect: r,
    type: t,
    predicate: n,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(Le(22));
    }
  };
}, {
  withTypes: () => Yw
}), Xw = Object.assign(xt(`${Oa}/add`), {
  withTypes: () => Xw
});
xt(`${Oa}/removeAll`);
var Jw = Object.assign(xt(`${Oa}/remove`), {
  withTypes: () => Jw
});
function Le(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Qw = {
  test: "https://test.bsdd.buildingsmart.org",
  production: "https://api.bsdd.buildingsmart.org"
}, Zw = {
  bddApiEnvironment: "production",
  mainDictionary: null,
  filterDictionaries: [],
  language: "EN"
}, Df = Na({
  name: "settings",
  initialState: Zw,
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
}), Yo = (e) => Qw[e.settings.bddApiEnvironment], Rf = wf(
  (e) => e.settings.mainDictionary,
  (e) => e.settings.filterDictionaries,
  (e, t) => e ? [e, ...t] : t
), { setSettings: ll, setBsddApiEnvironment: eS, setMainDictionary: Pf, setFilterDictionaries: Ta, setLanguage: SD } = Df.actions, tS = Df.reducer;
function nS({ id: e }) {
  const t = ur(), { t: n } = Ut(), r = ue((a) => a.settings.mainDictionary), o = ue((a) => a.settings.filterDictionaries), i = ue(Rf), s = (a, c) => {
    if ((r == null ? void 0 : r.dictionaryUri) === a) {
      t(Pf({ ...r, parameterMapping: c }));
      return;
    }
    t(
      Ta(
        o.map((l) => l.dictionaryUri === a ? { ...l, parameterMapping: c } : l)
      )
    );
  };
  return /* @__PURE__ */ M.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ M.jsxs(oe.Control, { children: [
      /* @__PURE__ */ M.jsx(En, { order: 5, children: n("Parameter mapping") }),
      /* @__PURE__ */ M.jsx(Xe, { size: "xs", c: "dimmed", children: n("Parameter mapping help text") })
    ] }),
    /* @__PURE__ */ M.jsx(oe.Panel, { children: i.map((a) => /* @__PURE__ */ M.jsxs("div", { style: { marginBottom: "1em" }, children: [
      /* @__PURE__ */ M.jsx(
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
function rS(e, t) {
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
function oS(e) {
  var t = rS(e, "string");
  return Un(t) == "symbol" ? t : String(t);
}
function iS(e, t, n) {
  return t = oS(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function ul(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function dl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ul(Object(n), !0).forEach(function(r) {
      iS(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ul(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function $e(e) {
  return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
}
var fl = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), Di = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, pl = {
  INIT: "@@redux/INIT" + Di(),
  REPLACE: "@@redux/REPLACE" + Di(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + Di();
  }
};
function sS(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function Af(e, t, n) {
  var r;
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error($e(0));
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error($e(1));
    return n(Af)(e, t);
  }
  if (typeof e != "function")
    throw new Error($e(2));
  var o = e, i = t, s = [], a = s, c = !1;
  function l() {
    a === s && (a = s.slice());
  }
  function u() {
    if (c)
      throw new Error($e(3));
    return i;
  }
  function f(g) {
    if (typeof g != "function")
      throw new Error($e(4));
    if (c)
      throw new Error($e(5));
    var h = !0;
    return l(), a.push(g), function() {
      if (h) {
        if (c)
          throw new Error($e(6));
        h = !1, l();
        var y = a.indexOf(g);
        a.splice(y, 1), s = null;
      }
    };
  }
  function d(g) {
    if (!sS(g))
      throw new Error($e(7));
    if (typeof g.type > "u")
      throw new Error($e(8));
    if (c)
      throw new Error($e(9));
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
      throw new Error($e(10));
    o = g, d({
      type: pl.REPLACE
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
          throw new Error($e(11));
        function b() {
          y.next && y.next(u());
        }
        b();
        var v = h(b);
        return {
          unsubscribe: v
        };
      }
    }, g[fl] = function() {
      return this;
    }, g;
  }
  return d({
    type: pl.INIT
  }), r = {
    dispatch: d,
    subscribe: f,
    getState: u,
    replaceReducer: p
  }, r[fl] = m, r;
}
function ml(e, t) {
  return function() {
    return t(e.apply(this, arguments));
  };
}
function gl(e, t) {
  if (typeof e == "function")
    return ml(e, t);
  if (typeof e != "object" || e === null)
    throw new Error($e(16));
  var n = {};
  for (var r in e) {
    var o = e[r];
    typeof o == "function" && (n[r] = ml(o, t));
  }
  return n;
}
function Nf() {
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
function aS() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function(r) {
    return function() {
      var o = r.apply(void 0, arguments), i = function() {
        throw new Error($e(15));
      }, s = {
        getState: o.getState,
        dispatch: function() {
          return i.apply(void 0, arguments);
        }
      }, a = t.map(function(c) {
        return c(s);
      });
      return i = Nf.apply(void 0, a)(o.dispatch), dl(dl({}, o), {}, {
        dispatch: i
      });
    };
  };
}
function cS(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Of(e, t) {
  var n = U(function() {
    return {
      inputs: t,
      result: e()
    };
  })[0], r = W(!0), o = W(n), i = r.current || !!(t && o.current.inputs && cS(t, o.current.inputs)), s = i ? o.current : {
    inputs: t,
    result: e()
  };
  return V(function() {
    r.current = !1, o.current = s;
  }, [s]), s.result;
}
function lS(e, t) {
  return Of(function() {
    return e;
  }, t);
}
var K = Of, z = lS, uS = !0, Ri = "Invariant failed";
function dS(e, t) {
  if (!e) {
    if (uS)
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
}, $a = function(t, n) {
  return {
    top: t.top - n.top,
    left: t.left - n.left,
    bottom: t.bottom + n.bottom,
    right: t.right + n.right
  };
}, hl = function(t, n) {
  return {
    top: t.top + n.top,
    left: t.left + n.left,
    bottom: t.bottom - n.bottom,
    right: t.right - n.right
  };
}, fS = function(t, n) {
  return {
    top: t.top + n.y,
    left: t.left + n.x,
    bottom: t.bottom + n.y,
    right: t.right + n.x
  };
}, Pi = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}, _a = function(t) {
  var n = t.borderBox, r = t.margin, o = r === void 0 ? Pi : r, i = t.border, s = i === void 0 ? Pi : i, a = t.padding, c = a === void 0 ? Pi : a, l = at($a(n, o)), u = at(hl(n, s)), f = at(hl(u, c));
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
  return isNaN(o) && dS(!1), o;
}, pS = function() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}, Hr = function(t, n) {
  var r = t.borderBox, o = t.border, i = t.margin, s = t.padding, a = fS(r, n);
  return _a({
    borderBox: a,
    border: o,
    margin: i,
    padding: s
  });
}, Ur = function(t, n) {
  return n === void 0 && (n = pS()), Hr(t, n);
}, Tf = function(t, n) {
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
  return _a({
    borderBox: t,
    margin: r,
    padding: o,
    border: i
  });
}, $f = function(t) {
  var n = t.getBoundingClientRect(), r = window.getComputedStyle(t);
  return Tf(n, r);
}, bl = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function mS(e, t) {
  return !!(e === t || bl(e) && bl(t));
}
function gS(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0; n < e.length; n++)
    if (!mS(e[n], t[n]))
      return !1;
  return !0;
}
function de(e, t) {
  t === void 0 && (t = gS);
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
var hS = function(t) {
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
const qn = hS;
function _f(e, t) {
}
_f.bind(null, "warn");
_f.bind(null, "error");
function $t() {
}
function bS(e, t) {
  return {
    ...e,
    ...t
  };
}
function Ye(e, t, n) {
  const r = t.map((o) => {
    const i = bS(n, o.options);
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
const yS = "Invariant failed";
class qr extends Error {
}
qr.prototype.toString = function() {
  return this.message;
};
function B(e, t) {
  if (!e)
    throw new qr(yS);
}
class vS extends S.Component {
  constructor(...t) {
    super(...t), this.callbacks = null, this.unbind = $t, this.onWindowError = (n) => {
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
const wS = `
  Press space bar to start a drag.
  When dragging you can use the arrow keys to move the item around and escape to cancel.
  Some screen readers may require you to be in focus mode or to use your pass through key
`, Kr = (e) => e + 1, SS = (e) => `
  You have lifted an item in position ${Kr(e.source.index)}
`, Lf = (e, t) => {
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
}, kf = (e, t, n) => t.droppableId === n.droppableId ? `
      The item ${e}
      has been combined with ${n.draggableId}` : `
      The item ${e}
      in list ${t.droppableId}
      has been combined with ${n.draggableId}
      in list ${n.droppableId}
    `, xS = (e) => {
  const t = e.destination;
  if (t)
    return Lf(e.source, t);
  const n = e.combine;
  return n ? kf(e.draggableId, e.source, n) : "You are over an area that cannot be dropped on";
}, yl = (e) => `
  The item has returned to its starting position
  of ${Kr(e.index)}
`, CS = (e) => {
  if (e.reason === "CANCEL")
    return `
      Movement cancelled.
      ${yl(e.source)}
    `;
  const t = e.destination, n = e.combine;
  return t ? `
      You have dropped the item.
      ${Lf(e.source, t)}
    ` : n ? `
      You have dropped the item.
      ${kf(e.draggableId, e.source, n)}
    ` : `
    The item has been dropped while not over a drop area.
    ${yl(e.source)}
  `;
}, IS = {
  dragHandleUsageInstructions: wS,
  onDragStart: SS,
  onDragUpdate: xS,
  onDragEnd: CS
};
var Nr = IS;
const pe = {
  x: 0,
  y: 0
}, ye = (e, t) => ({
  x: e.x + t.x,
  y: e.y + t.y
}), Fe = (e, t) => ({
  x: e.x - t.x,
  y: e.y - t.y
}), _t = (e, t) => e.x === t.x && e.y === t.y, Dn = (e) => ({
  x: e.x !== 0 ? -e.x : 0,
  y: e.y !== 0 ? -e.y : 0
}), rn = (e, t, n = 0) => e === "x" ? {
  x: t,
  y: n
} : {
  x: n,
  y: t
}, Kn = (e, t) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2), vl = (e, t) => Math.min(...t.map((n) => Kn(e, n))), Bf = (e) => (t) => ({
  x: e(t.x),
  y: e(t.y)
});
var ES = (e, t) => {
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
}), wl = (e) => [{
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
}], DS = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}, RS = (e, t) => t ? dr(e, t.scroll.diff.displacement) : e, PS = (e, t, n) => n && n.increasedBy ? {
  ...e,
  [t.end]: e[t.end] + n.increasedBy[t.line]
} : e, AS = (e, t) => t && t.shouldClipSubject ? ES(t.pageMarginBox, e) : at(e);
var wn = ({
  page: e,
  withPlaceholder: t,
  axis: n,
  frame: r
}) => {
  const o = RS(e.marginBox, r), i = PS(o, n, t), s = AS(i, r);
  return {
    page: e,
    withPlaceholder: t,
    active: s
  };
}, La = (e, t) => {
  e.frame || B(!1);
  const n = e.frame, r = Fe(t, n.scroll.initial), o = Dn(r), i = {
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
const Mf = de((e) => e.reduce((t, n) => (t[n.descriptor.id] = n, t), {})), Ff = de((e) => e.reduce((t, n) => (t[n.descriptor.id] = n, t), {})), Xo = de((e) => Object.values(e)), NS = de((e) => Object.values(e));
var Rn = de((e, t) => NS(t).filter((r) => e === r.descriptor.droppableId).sort((r, o) => r.descriptor.index - o.descriptor.index));
function ka(e) {
  return e.at && e.at.type === "REORDER" ? e.at.destination : null;
}
function Jo(e) {
  return e.at && e.at.type === "COMBINE" ? e.at.combine : null;
}
var Qo = de((e, t) => t.filter((n) => n.descriptor.id !== e.descriptor.id)), OS = ({
  isMovingForward: e,
  draggable: t,
  destination: n,
  insideDestination: r,
  previousImpact: o
}) => {
  if (!n.isCombineEnabled || !ka(o))
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
  u === -1 && B(!1);
  const f = u - 1;
  if (f < 0)
    return null;
  const d = l[f];
  return s(d.descriptor.id);
}, Pn = (e, t) => e.descriptor.droppableId === t.descriptor.id;
const jf = {
  point: pe,
  value: 0
}, Yn = {
  invisible: {},
  visible: {},
  all: []
}, TS = {
  displaced: Yn,
  displacedBy: jf,
  at: null
};
var $S = TS, Je = (e, t) => (n) => e <= n && n <= t, Wf = (e) => {
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
}, _S = (e) => {
  const t = Je(e.top, e.bottom), n = Je(e.left, e.right);
  return (r) => t(r.top) && t(r.bottom) && n(r.left) && n(r.right);
};
const Ba = {
  direction: "vertical",
  line: "y",
  crossAxisLine: "x",
  start: "top",
  end: "bottom",
  size: "height",
  crossAxisStart: "left",
  crossAxisEnd: "right",
  crossAxisSize: "width"
}, zf = {
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
var LS = (e) => (t) => {
  const n = Je(t.top, t.bottom), r = Je(t.left, t.right);
  return (o) => e === Ba ? n(o.top) && n(o.bottom) : r(o.left) && r(o.right);
};
const kS = (e, t) => {
  const n = t.frame ? t.frame.scroll.diff.displacement : pe;
  return dr(e, n);
}, BS = (e, t, n) => t.subject.active ? n(t.subject.active)(e) : !1, MS = (e, t, n) => n(t)(e), Ma = ({
  target: e,
  destination: t,
  viewport: n,
  withDroppableDisplacement: r,
  isVisibleThroughFrameFn: o
}) => {
  const i = r ? kS(e, t) : e;
  return BS(i, t, o) && MS(i, n, o);
}, FS = (e) => Ma({
  ...e,
  isVisibleThroughFrameFn: Wf
}), Vf = (e) => Ma({
  ...e,
  isVisibleThroughFrameFn: _S
}), jS = (e) => Ma({
  ...e,
  isVisibleThroughFrameFn: LS(e.destination.axis)
}), WS = (e, t, n) => {
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
function zS(e, t) {
  const n = e.page.marginBox, r = {
    top: t.point.y,
    right: 0,
    bottom: 0,
    left: t.point.x
  };
  return at($a(n, r));
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
    const l = zS(c, n), u = c.descriptor.id;
    if (a.all.push(u), !FS({
      target: l,
      destination: t,
      viewport: r,
      withDroppableDisplacement: !0
    }))
      return a.invisible[c.descriptor.id] = !0, a;
    const d = WS(u, i, o), p = {
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
function VS(e, t) {
  if (!e.length)
    return 0;
  const n = e[e.length - 1].descriptor.index;
  return t.inHomeList ? n : n + 1;
}
function Sl({
  insideDestination: e,
  inHomeList: t,
  displacedBy: n,
  destination: r
}) {
  const o = VS(e, {
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
  const c = Pn(e, n);
  if (s == null)
    return Sl({
      insideDestination: t,
      inHomeList: c,
      displacedBy: o,
      destination: n
    });
  const l = t.find((m) => m.descriptor.index === s);
  if (!l)
    return Sl({
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
function Wt(e, t) {
  return !!t.effected[e];
}
var GS = ({
  isMovingForward: e,
  destination: t,
  draggables: n,
  combine: r,
  afterCritical: o
}) => {
  if (!t.isCombineEnabled)
    return null;
  const i = r.draggableId, a = n[i].descriptor.index;
  return Wt(i, o) ? e ? a : a - 1 : e ? a + 1 : a;
}, HS = ({
  isMovingForward: e,
  isInHomeList: t,
  insideDestination: n,
  location: r
}) => {
  if (!n.length)
    return null;
  const o = r.index, i = e ? o + 1 : o - 1, s = n[0].descriptor.index, a = n[n.length - 1].descriptor.index, c = t ? a : a + 1;
  return i < s || i > c ? null : i;
}, US = ({
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
  if (l || B(!1), l.type === "REORDER") {
    const f = HS({
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
  const u = GS({
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
}, qS = ({
  displaced: e,
  afterCritical: t,
  combineWith: n,
  displacedBy: r
}) => {
  const o = !!(e.visible[n] || e.invisible[n]);
  return Wt(n, t) ? o ? pe : Dn(r.point) : o ? r.point : pe;
}, KS = ({
  afterCritical: e,
  impact: t,
  draggables: n
}) => {
  const r = Jo(t);
  r || B(!1);
  const o = r.draggableId, i = n[o].page.borderBox.center, s = qS({
    displaced: t.displaced,
    afterCritical: e,
    combineWith: o,
    displacedBy: t.displacedBy
  });
  return ye(i, s);
};
const Gf = (e, t) => t.margin[e.start] + t.borderBox[e.size] / 2, YS = (e, t) => t.margin[e.end] + t.borderBox[e.size] / 2, Fa = (e, t, n) => t[e.crossAxisStart] + n.margin[e.crossAxisStart] + n.borderBox[e.crossAxisSize] / 2, xl = ({
  axis: e,
  moveRelativeTo: t,
  isMoving: n
}) => rn(e.line, t.marginBox[e.end] + Gf(e, n), Fa(e, t.marginBox, n)), Cl = ({
  axis: e,
  moveRelativeTo: t,
  isMoving: n
}) => rn(e.line, t.marginBox[e.start] - YS(e, n), Fa(e, t.marginBox, n)), XS = ({
  axis: e,
  moveInto: t,
  isMoving: n
}) => rn(e.line, t.contentBox[e.start] + Gf(e, n), Fa(e, t.contentBox, n));
var JS = ({
  impact: e,
  draggable: t,
  draggables: n,
  droppable: r,
  afterCritical: o
}) => {
  const i = Rn(r.descriptor.id, n), s = t.page, a = r.axis;
  if (!i.length)
    return XS({
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
    if (Wt(u, o))
      return Cl({
        axis: a,
        moveRelativeTo: d.page,
        isMoving: s
      });
    const p = Hr(d.page, l.point);
    return Cl({
      axis: a,
      moveRelativeTo: p,
      isMoving: s
    });
  }
  const f = i[i.length - 1];
  if (f.descriptor.id === t.descriptor.id)
    return s.borderBox.center;
  if (Wt(f.descriptor.id, o)) {
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
const QS = ({
  impact: e,
  draggable: t,
  droppable: n,
  draggables: r,
  afterCritical: o
}) => {
  const i = t.page.borderBox.center, s = e.at;
  return !n || !s ? i : s.type === "REORDER" ? JS({
    impact: e,
    draggable: t,
    draggables: r,
    droppable: n,
    afterCritical: o
  }) : KS({
    impact: e,
    draggables: r,
    afterCritical: o
  });
};
var Zo = (e) => {
  const t = QS(e), n = e.droppable;
  return n ? os(n, t) : t;
}, Hf = (e, t) => {
  const n = Fe(t, e.scroll.initial), r = Dn(n);
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
function Il(e, t) {
  return e.map((n) => t[n]);
}
function ZS(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n].visible[e];
    if (r)
      return r;
  }
  return null;
}
var e1 = ({
  impact: e,
  viewport: t,
  destination: n,
  draggables: r,
  maxScrollChange: o
}) => {
  const i = Hf(t, ye(t.scroll.current, o)), s = n.frame ? La(n, ye(n.frame.scroll.current, o)) : n, a = e.displaced, c = Xn({
    afterDragging: Il(a.all, r),
    destination: n,
    displacedBy: e.displacedBy,
    viewport: i.frame,
    last: a,
    forceShouldAnimate: !1
  }), l = Xn({
    afterDragging: Il(a.all, r),
    destination: s,
    displacedBy: e.displacedBy,
    viewport: t.frame,
    last: a,
    forceShouldAnimate: !1
  }), u = {}, f = {}, d = [a, c, l];
  return a.all.forEach((m) => {
    const g = ZS(m, d);
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
}, t1 = (e, t) => ye(e.scroll.diff.displacement, t), ja = ({
  pageBorderBoxCenter: e,
  draggable: t,
  viewport: n
}) => {
  const r = t1(n, e), o = Fe(r, t.page.borderBox.center);
  return ye(t.client.borderBox.center, o);
}, Uf = ({
  draggable: e,
  destination: t,
  newPageBorderBoxCenter: n,
  viewport: r,
  withDroppableDisplacement: o,
  onlyOnMainAxis: i = !1
}) => {
  const s = Fe(n, e.page.borderBox.center), c = {
    target: dr(e.page.borderBox, s),
    destination: t,
    withDroppableDisplacement: o,
    viewport: r
  };
  return i ? jS(c) : Vf(c);
}, n1 = ({
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
  const l = Rn(n.descriptor.id, r), u = Pn(t, n), f = OS({
    isMovingForward: e,
    draggable: t,
    destination: n,
    insideDestination: l,
    previousImpact: o
  }) || US({
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
  if (Uf({
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
  const m = Fe(d, s), g = e1({
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
const Pe = (e) => {
  const t = e.subject.active;
  return t || B(!1), t;
};
var r1 = ({
  isMovingForward: e,
  pageBorderBoxCenter: t,
  source: n,
  droppables: r,
  viewport: o
}) => {
  const i = n.subject.active;
  if (!i)
    return null;
  const s = n.axis, a = Je(i[s.start], i[s.end]), c = Xo(r).filter((u) => u !== n).filter((u) => u.isEnabled).filter((u) => !!u.subject.active).filter((u) => Wf(o.frame)(Pe(u))).filter((u) => {
    const f = Pe(u);
    return e ? i[s.crossAxisEnd] < f[s.crossAxisEnd] : f[s.crossAxisStart] < i[s.crossAxisStart];
  }).filter((u) => {
    const f = Pe(u), d = Je(f[s.start], f[s.end]);
    return a(f[s.start]) || a(f[s.end]) || d(i[s.start]) || d(i[s.end]);
  }).sort((u, f) => {
    const d = Pe(u)[s.crossAxisStart], p = Pe(f)[s.crossAxisStart];
    return e ? d - p : p - d;
  }).filter((u, f, d) => Pe(u)[s.crossAxisStart] === Pe(d[0])[s.crossAxisStart]);
  if (!c.length)
    return null;
  if (c.length === 1)
    return c[0];
  const l = c.filter((u) => Je(Pe(u)[s.start], Pe(u)[s.end])(t[s.line]));
  return l.length === 1 ? l[0] : l.length > 1 ? l.sort((u, f) => Pe(u)[s.start] - Pe(f)[s.start])[0] : c.sort((u, f) => {
    const d = vl(t, wl(Pe(u))), p = vl(t, wl(Pe(f)));
    return d !== p ? d - p : Pe(u)[s.start] - Pe(f)[s.start];
  })[0];
};
const El = (e, t) => {
  const n = e.page.borderBox.center;
  return Wt(e.descriptor.id, t) ? Fe(n, t.displacedBy.point) : n;
}, o1 = (e, t) => {
  const n = e.page.borderBox;
  return Wt(e.descriptor.id, t) ? dr(n, Dn(t.displacedBy.point)) : n;
};
var i1 = ({
  pageBorderBoxCenter: e,
  viewport: t,
  destination: n,
  insideDestination: r,
  afterCritical: o
}) => r.filter((s) => Vf({
  target: o1(s, o),
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
const s1 = (e, t, n) => {
  const r = e.axis;
  if (e.descriptor.mode === "virtual")
    return rn(r.line, t[r.line]);
  const o = e.subject.page.contentBox[r.size], c = Rn(e.descriptor.id, n).reduce((l, u) => l + u.client.marginBox[r.size], 0) + t[r.line] - o;
  return c <= 0 ? null : rn(r.line, c);
}, qf = (e, t) => ({
  ...e,
  scroll: {
    ...e.scroll,
    max: t
  }
}), Kf = (e, t, n) => {
  const r = e.frame;
  Pn(t, e) && B(!1), e.subject.withPlaceholder && B(!1);
  const o = fr(e.axis, t.displaceBy).point, i = s1(e, o, n), s = {
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
  const a = i ? ye(r.scroll.max, i) : r.scroll.max, c = qf(r, a), l = wn({
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
}, a1 = (e) => {
  const t = e.subject.withPlaceholder;
  t || B(!1);
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
  r || B(!1);
  const o = qf(n, r), i = wn({
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
var c1 = ({
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
      displacedBy: jf,
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
    }), p = Pn(r, i) ? i : Kf(i, r, o);
    return Uf({
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
}, l1 = ({
  isMovingForward: e,
  previousPageBorderBoxCenter: t,
  draggable: n,
  isOver: r,
  draggables: o,
  droppables: i,
  viewport: s,
  afterCritical: a
}) => {
  const c = r1({
    isMovingForward: e,
    pageBorderBoxCenter: t,
    source: r,
    droppables: i,
    viewport: s
  });
  if (!c)
    return null;
  const l = Rn(c.descriptor.id, o), u = i1({
    pageBorderBoxCenter: t,
    viewport: s,
    destination: c,
    insideDestination: l,
    afterCritical: a
  }), f = c1({
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
}, We = (e) => {
  const t = e.at;
  return t ? t.type === "REORDER" ? t.destination.droppableId : t.combine.droppableId : null;
};
const u1 = (e, t) => {
  const n = We(e);
  return n ? t[n] : null;
};
var d1 = ({
  state: e,
  type: t
}) => {
  const n = u1(e.impact, e.dimensions.droppables), r = !!n, o = e.dimensions.droppables[e.critical.droppable.id], i = n || o, s = i.axis.direction, a = s === "vertical" && (t === "MOVE_UP" || t === "MOVE_DOWN") || s === "horizontal" && (t === "MOVE_LEFT" || t === "MOVE_RIGHT");
  if (a && !r)
    return null;
  const c = t === "MOVE_DOWN" || t === "MOVE_RIGHT", l = e.dimensions.draggables[e.critical.draggable.id], u = e.current.page.borderBoxCenter, {
    draggables: f,
    droppables: d
  } = e.dimensions;
  return a ? n1({
    isMovingForward: c,
    previousPageBorderBoxCenter: u,
    draggable: l,
    destination: i,
    draggables: f,
    viewport: e.viewport,
    previousClientSelection: e.current.client.selection,
    previousImpact: e.impact,
    afterCritical: e.afterCritical
  }) : l1({
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
function Yf(e) {
  const t = Je(e.top, e.bottom), n = Je(e.left, e.right);
  return function(o) {
    return t(o.y) && n(o.x);
  };
}
function f1(e, t) {
  return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function p1({
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
function m1({
  pageBorderBox: e,
  draggable: t,
  droppables: n
}) {
  const r = Xo(n).filter((o) => {
    if (!o.isEnabled)
      return !1;
    const i = o.subject.active;
    if (!i || !f1(e, i))
      return !1;
    if (Yf(i)(e.center))
      return !0;
    const s = o.axis, a = i.center[s.crossAxisLine], c = e[s.crossAxisStart], l = e[s.crossAxisEnd], u = Je(i[s.crossAxisStart], i[s.crossAxisEnd]), f = u(c), d = u(l);
    return !f && !d ? !0 : f ? c < a : l > a;
  });
  return r.length ? r.length === 1 ? r[0].descriptor.id : p1({
    pageBorderBox: e,
    draggable: t,
    candidates: r
  }) : null;
}
const Xf = (e, t) => at(dr(e, t));
var g1 = (e, t) => {
  const n = e.frame;
  return n ? Xf(t, n.scroll.diff.value) : t;
};
function Jf({
  displaced: e,
  id: t
}) {
  return !!(e.visible[t] || e.invisible[t]);
}
function h1({
  draggable: e,
  closest: t,
  inHomeList: n
}) {
  return t ? n && t.descriptor.index > e.descriptor.index ? t.descriptor.index - 1 : t.descriptor.index : null;
}
var b1 = ({
  pageBorderBoxWithDroppableScroll: e,
  draggable: t,
  destination: n,
  insideDestination: r,
  last: o,
  viewport: i,
  afterCritical: s
}) => {
  const a = n.axis, c = fr(n.axis, t.displaceBy), l = c.value, u = e[a.start], f = e[a.end], p = Qo(t, r).find((g) => {
    const h = g.descriptor.id, w = g.page.borderBox.center[a.line], y = Wt(h, s), b = Jf({
      displaced: o,
      id: h
    });
    return y ? b ? f <= w : u < w - l : b ? f <= w + l : u < w;
  }) || null, m = h1({
    draggable: t,
    closest: p,
    inHomeList: Pn(t, n)
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
const y1 = 4;
var v1 = ({
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
    const g = m.descriptor.id, h = m.page.borderBox, y = h[s.size] / y1, b = Wt(g, i), v = Jf({
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
}, Qf = ({
  pageOffset: e,
  draggable: t,
  draggables: n,
  droppables: r,
  previousImpact: o,
  viewport: i,
  afterCritical: s
}) => {
  const a = Xf(t.page.borderBox, e), c = m1({
    pageBorderBox: a,
    draggable: t,
    droppables: r
  });
  if (!c)
    return $S;
  const l = r[c], u = Rn(l.descriptor.id, n), f = g1(l, a);
  return v1({
    pageBorderBoxWithDroppableScroll: f,
    draggable: t,
    previousImpact: o,
    destination: l,
    insideDestination: u,
    afterCritical: s
  }) || b1({
    pageBorderBoxWithDroppableScroll: f,
    draggable: t,
    destination: l,
    insideDestination: u,
    last: o.displaced,
    viewport: i,
    afterCritical: s
  });
}, Wa = (e, t) => ({
  ...e,
  [t.descriptor.id]: t
});
const w1 = ({
  previousImpact: e,
  impact: t,
  droppables: n
}) => {
  const r = We(e), o = We(t);
  if (!r || r === o)
    return n;
  const i = n[r];
  if (!i.subject.withPlaceholder)
    return n;
  const s = a1(i);
  return Wa(n, s);
};
var S1 = ({
  draggable: e,
  draggables: t,
  droppables: n,
  previousImpact: r,
  impact: o
}) => {
  const i = w1({
    previousImpact: r,
    impact: o,
    droppables: n
  }), s = We(o);
  if (!s)
    return i;
  const a = n[s];
  if (Pn(e, a) || a.subject.withPlaceholder)
    return i;
  const c = Kf(a, e, t);
  return Wa(i, c);
}, Mn = ({
  state: e,
  clientSelection: t,
  dimensions: n,
  viewport: r,
  impact: o,
  scrollJumpRequest: i
}) => {
  const s = r || e.viewport, a = n || e.dimensions, c = t || e.current.client.selection, l = Fe(c, e.initial.client.selection), u = {
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
  const p = a.draggables[e.critical.draggable.id], m = o || Qf({
    pageOffset: f.offset,
    draggable: p,
    draggables: a.draggables,
    droppables: a.droppables,
    previousImpact: e.impact,
    viewport: s,
    afterCritical: e.afterCritical
  }), g = S1({
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
function x1(e, t) {
  return e.map((n) => t[n]);
}
var Zf = ({
  impact: e,
  viewport: t,
  draggables: n,
  destination: r,
  forceShouldAnimate: o
}) => {
  const i = e.displaced, s = x1(i.all, n), a = Xn({
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
}, ep = ({
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
}, tp = ({
  state: e,
  dimensions: t,
  viewport: n
}) => {
  e.movementMode !== "SNAP" && B(!1);
  const r = e.impact, o = n || e.viewport, i = t || e.dimensions, {
    draggables: s,
    droppables: a
  } = i, c = s[e.critical.draggable.id], l = We(r);
  l || B(!1);
  const u = a[l], f = Zf({
    impact: r,
    viewport: o,
    destination: u,
    draggables: s
  }), d = ep({
    impact: f,
    draggable: c,
    droppable: u,
    draggables: s,
    viewport: o,
    afterCritical: e.afterCritical
  });
  return Mn({
    impact: f,
    clientSelection: d,
    state: e,
    dimensions: i,
    viewport: o
  });
}, C1 = (e) => ({
  index: e.index,
  droppableId: e.droppableId
}), np = ({
  draggable: e,
  home: t,
  draggables: n,
  viewport: r
}) => {
  const o = fr(t.axis, e.displaceBy), i = Rn(t.descriptor.id, n), s = i.indexOf(e);
  s === -1 && B(!1);
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
        destination: C1(e.descriptor)
      }
    },
    afterCritical: l
  };
}, I1 = (e, t) => ({
  draggables: e.draggables,
  droppables: Wa(e.droppables, t)
}), E1 = ({
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
}, D1 = (e) => {
  const t = e.frame;
  return t || B(!1), t;
}, R1 = ({
  additions: e,
  updatedDroppables: t,
  viewport: n
}) => {
  const r = n.scroll.diff.value;
  return e.map((o) => {
    const i = o.descriptor.droppableId, s = t[i], c = D1(s).scroll.diff.value, l = ye(r, c);
    return E1({
      draggable: o,
      offset: l,
      initialWindowScroll: n.scroll.initial
    });
  });
}, P1 = ({
  state: e,
  published: t
}) => {
  const n = t.modified.map((w) => {
    const y = e.dimensions.droppables[w.droppableId];
    return La(y, w.scroll);
  }), r = {
    ...e.dimensions.droppables,
    ...Mf(n)
  }, o = Ff(R1({
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
  }, a = We(e.impact), c = a ? s.droppables[a] : null, l = s.draggables[e.critical.draggable.id], u = s.droppables[e.critical.droppable.id], {
    impact: f,
    afterCritical: d
  } = np({
    draggable: l,
    home: u,
    draggables: i,
    viewport: e.viewport
  }), p = c && c.isCombineEnabled ? e.impact : f, m = Qf({
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
  const r = I1(e.dimensions, t);
  return !is(e) || n ? Mn({
    state: e,
    dimensions: r
  }) : tp({
    state: e,
    dimensions: r
  });
};
function Ni(e) {
  return e.isDragging && e.movementMode === "SNAP" ? {
    ...e,
    scrollJumpRequest: null
  } : e;
}
const Dl = {
  phase: "IDLE",
  completed: null,
  shouldFlush: !1
};
var A1 = (e = Dl, t) => {
  if (t.type === "FLUSH")
    return {
      ...Dl,
      shouldFlush: !0
    };
  if (t.type === "INITIAL_PUBLISH") {
    e.phase !== "IDLE" && B(!1);
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
    } = np({
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
    return e.phase === "COLLECTING" || e.phase === "DROP_PENDING" ? e : (e.phase !== "DRAGGING" && B(!1), {
      ...e,
      phase: "COLLECTING"
    });
  if (t.type === "PUBLISH_WHILE_DRAGGING")
    return e.phase === "COLLECTING" || e.phase === "DROP_PENDING" || B(!1), P1({
      state: e,
      published: t.payload
    });
  if (t.type === "MOVE") {
    if (e.phase === "DROP_PENDING")
      return e;
    Jt(e) || B(!1);
    const {
      client: n
    } = t.payload;
    return _t(n, e.current.client.selection) ? e : Mn({
      state: e,
      clientSelection: n,
      impact: is(e) ? e.impact : null
    });
  }
  if (t.type === "UPDATE_DROPPABLE_SCROLL") {
    if (e.phase === "DROP_PENDING" || e.phase === "COLLECTING")
      return Ni(e);
    Jt(e) || B(!1);
    const {
      id: n,
      newScroll: r
    } = t.payload, o = e.dimensions.droppables[n];
    if (!o)
      return e;
    const i = La(o, r);
    return Ai(e, i, !1);
  }
  if (t.type === "UPDATE_DROPPABLE_IS_ENABLED") {
    if (e.phase === "DROP_PENDING")
      return e;
    Jt(e) || B(!1);
    const {
      id: n,
      isEnabled: r
    } = t.payload, o = e.dimensions.droppables[n];
    o || B(!1), o.isEnabled === r && B(!1);
    const i = {
      ...o,
      isEnabled: r
    };
    return Ai(e, i, !0);
  }
  if (t.type === "UPDATE_DROPPABLE_IS_COMBINE_ENABLED") {
    if (e.phase === "DROP_PENDING")
      return e;
    Jt(e) || B(!1);
    const {
      id: n,
      isCombineEnabled: r
    } = t.payload, o = e.dimensions.droppables[n];
    o || B(!1), o.isCombineEnabled === r && B(!1);
    const i = {
      ...o,
      isCombineEnabled: r
    };
    return Ai(e, i, !0);
  }
  if (t.type === "MOVE_BY_WINDOW_SCROLL") {
    if (e.phase === "DROP_PENDING" || e.phase === "DROP_ANIMATING")
      return e;
    Jt(e) || B(!1), e.isWindowScrollAllowed || B(!1);
    const n = t.payload.newScroll;
    if (_t(e.viewport.scroll.current, n))
      return Ni(e);
    const r = Hf(e.viewport, n);
    return is(e) ? tp({
      state: e,
      viewport: r
    }) : Mn({
      state: e,
      viewport: r
    });
  }
  if (t.type === "UPDATE_VIEWPORT_MAX_SCROLL") {
    if (!Jt(e))
      return e;
    const n = t.payload.maxScroll;
    if (_t(n, e.viewport.scroll.max))
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
    e.phase !== "DRAGGING" && B(!1);
    const n = d1({
      state: e,
      type: t.type
    });
    return n ? Mn({
      state: e,
      impact: n.impact,
      clientSelection: n.clientSelection,
      scrollJumpRequest: n.scrollJumpRequest
    }) : e;
  }
  if (t.type === "DROP_PENDING") {
    const n = t.payload.reason;
    return e.phase !== "COLLECTING" && B(!1), {
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
    return e.phase === "DRAGGING" || e.phase === "DROP_PENDING" || B(!1), {
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
const N1 = (e) => ({
  type: "BEFORE_INITIAL_CAPTURE",
  payload: e
}), O1 = (e) => ({
  type: "LIFT",
  payload: e
}), T1 = (e) => ({
  type: "INITIAL_PUBLISH",
  payload: e
}), $1 = (e) => ({
  type: "PUBLISH_WHILE_DRAGGING",
  payload: e
}), _1 = () => ({
  type: "COLLECTION_STARTING",
  payload: null
}), L1 = (e) => ({
  type: "UPDATE_DROPPABLE_SCROLL",
  payload: e
}), k1 = (e) => ({
  type: "UPDATE_DROPPABLE_IS_ENABLED",
  payload: e
}), B1 = (e) => ({
  type: "UPDATE_DROPPABLE_IS_COMBINE_ENABLED",
  payload: e
}), rp = (e) => ({
  type: "MOVE",
  payload: e
}), M1 = (e) => ({
  type: "MOVE_BY_WINDOW_SCROLL",
  payload: e
}), F1 = (e) => ({
  type: "UPDATE_VIEWPORT_MAX_SCROLL",
  payload: e
}), j1 = () => ({
  type: "MOVE_UP",
  payload: null
}), W1 = () => ({
  type: "MOVE_DOWN",
  payload: null
}), z1 = () => ({
  type: "MOVE_RIGHT",
  payload: null
}), V1 = () => ({
  type: "MOVE_LEFT",
  payload: null
}), za = () => ({
  type: "FLUSH",
  payload: null
}), G1 = (e) => ({
  type: "DROP_ANIMATE",
  payload: e
}), Va = (e) => ({
  type: "DROP_COMPLETE",
  payload: e
}), op = (e) => ({
  type: "DROP",
  payload: e
}), H1 = (e) => ({
  type: "DROP_PENDING",
  payload: e
}), ip = () => ({
  type: "DROP_ANIMATION_FINISHED",
  payload: null
});
var U1 = (e) => ({
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
  c.phase === "DROP_ANIMATING" && n(Va({
    completed: c.completed
  })), t().phase !== "IDLE" && B(!1), n(za()), n(N1({
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
  n(T1({
    critical: f,
    dimensions: d,
    clientSelection: s,
    movementMode: a,
    viewport: p
  }));
}, q1 = (e) => () => (t) => (n) => {
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
}, sp = {
  outOfTheWay: 0.2,
  minDropTime: 0.33,
  maxDropTime: 0.55
}, Kt = `${sp.outOfTheWay}s ${Ga.outOfTheWay}`, Fn = {
  fluid: `opacity ${Kt}`,
  snap: `transform ${Kt}, opacity ${Kt}`,
  drop: (e) => {
    const t = `${e}s ${Ga.drop}`;
    return `transform ${t}, opacity ${t}`;
  },
  outOfTheWay: `transform ${Kt}`,
  placeholder: `height ${Kt}, width ${Kt}, margin ${Kt}`
}, Rl = (e) => _t(e, pe) ? void 0 : `translate(${e.x}px, ${e.y}px)`, ss = {
  moveTo: Rl,
  drop: (e, t) => {
    const n = Rl(e);
    if (n)
      return t ? `${n} scale(${Jn.scale.drop})` : n;
  }
}, {
  minDropTime: as,
  maxDropTime: ap
} = sp, K1 = ap - as, Pl = 1500, Y1 = 0.6;
var X1 = ({
  current: e,
  destination: t,
  reason: n
}) => {
  const r = Kn(e, t);
  if (r <= 0)
    return as;
  if (r >= Pl)
    return ap;
  const o = r / Pl, i = as + K1 * o, s = n === "CANCEL" ? i * Y1 : i;
  return Number(s.toFixed(2));
}, J1 = ({
  impact: e,
  draggable: t,
  dimensions: n,
  viewport: r,
  afterCritical: o
}) => {
  const {
    draggables: i,
    droppables: s
  } = n, a = We(e), c = a ? s[a] : null, l = s[t.descriptor.droppableId], u = ep({
    impact: e,
    draggable: t,
    draggables: i,
    afterCritical: o,
    droppable: c || l,
    viewport: r
  });
  return Fe(u, t.client.borderBox.center);
}, Q1 = ({
  draggables: e,
  reason: t,
  lastImpact: n,
  home: r,
  viewport: o,
  onLiftImpact: i
}) => !n.at || t !== "DROP" ? {
  impact: Zf({
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
const Z1 = ({
  getState: e,
  dispatch: t
}) => (n) => (r) => {
  if (r.type !== "DROP") {
    n(r);
    return;
  }
  const o = e(), i = r.payload.reason;
  if (o.phase === "COLLECTING") {
    t(H1({
      reason: i
    }));
    return;
  }
  if (o.phase === "IDLE")
    return;
  o.phase === "DROP_PENDING" && o.isWaiting && B(!1), o.phase === "DRAGGING" || o.phase === "DROP_PENDING" || B(!1);
  const a = o.critical, c = o.dimensions, l = c.draggables[o.critical.draggable.id], {
    impact: u,
    didDropInsideDroppable: f
  } = Q1({
    reason: i,
    lastImpact: o.impact,
    afterCritical: o.afterCritical,
    onLiftImpact: o.onLiftImpact,
    home: o.dimensions.droppables[o.critical.droppable.id],
    viewport: o.viewport,
    draggables: o.dimensions.draggables
  }), d = f ? ka(u) : null, p = f ? Jo(u) : null, m = {
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
  }, h = J1({
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
  if (!(!_t(o.current.client.offset, h) || !!g.combine)) {
    t(Va({
      completed: w
    }));
    return;
  }
  const b = X1({
    current: o.current.client.offset,
    destination: h,
    reason: i
  });
  t(G1({
    newHomeClientOffset: h,
    dropDuration: b,
    completed: w
  }));
};
var ex = Z1, cp = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset
});
function tx(e) {
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
function nx({
  onWindowScroll: e
}) {
  function t() {
    e(cp());
  }
  const n = qn(t), r = tx(n);
  let o = $t;
  function i() {
    return o !== $t;
  }
  function s() {
    i() && B(!1), o = Ye(window, [r]);
  }
  function a() {
    i() || B(!1), n.cancel(), o(), o = $t;
  }
  return {
    start: s,
    stop: a,
    isActive: i
  };
}
const rx = (e) => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH", ox = (e) => {
  const t = nx({
    onWindowScroll: (n) => {
      e.dispatch(M1({
        newScroll: n
      }));
    }
  });
  return (n) => (r) => {
    !t.isActive() && r.type === "INITIAL_PUBLISH" && t.start(), t.isActive() && rx(r) && t.stop(), n(r);
  };
};
var ix = ox, sx = (e) => {
  let t = !1, n = !1;
  const r = setTimeout(() => {
    n = !0;
  }), o = (i) => {
    t || n || (t = !0, e(i), clearTimeout(r));
  };
  return o.wasCalled = () => t, o;
}, ax = () => {
  const e = [], t = (o) => {
    const i = e.findIndex((a) => a.timerId === o);
    i === -1 && B(!1);
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
const cx = (e, t) => e == null && t == null ? !0 : e == null || t == null ? !1 : e.droppableId === t.droppableId && e.index === t.index, lx = (e, t) => e == null && t == null ? !0 : e == null || t == null ? !1 : e.draggableId === t.draggableId && e.droppableId === t.droppableId, ux = (e, t) => {
  if (e === t)
    return !0;
  const n = e.draggable.id === t.draggable.id && e.draggable.droppableId === t.draggable.droppableId && e.draggable.type === t.draggable.type && e.draggable.index === t.draggable.index, r = e.droppable.id === t.droppable.id && e.droppable.type === t.droppable.type;
  return n && r;
}, $n = (e, t) => {
  t();
}, Sr = (e, t) => ({
  draggableId: e.draggable.id,
  type: e.droppable.type,
  source: {
    droppableId: e.droppable.id,
    index: e.draggable.index
  },
  mode: t
});
function Oi(e, t, n, r) {
  if (!e) {
    n(r(t));
    return;
  }
  const o = sx(n);
  e(t, {
    announce: o
  }), o.wasCalled() || n(r(t));
}
var dx = (e, t) => {
  const n = ax();
  let r = null;
  const o = (f, d) => {
    r && B(!1), $n("onBeforeCapture", () => {
      const p = e().onBeforeCapture;
      p && p({
        draggableId: f,
        mode: d
      });
    });
  }, i = (f, d) => {
    r && B(!1), $n("onBeforeDragStart", () => {
      const p = e().onBeforeDragStart;
      p && p(Sr(f, d));
    });
  }, s = (f, d) => {
    r && B(!1);
    const p = Sr(f, d);
    r = {
      mode: d,
      lastCritical: f,
      lastLocation: p.source,
      lastCombine: null
    }, n.add(() => {
      $n("onDragStart", () => Oi(e().onDragStart, p, t, Nr.onDragStart));
    });
  }, a = (f, d) => {
    const p = ka(d), m = Jo(d);
    r || B(!1);
    const g = !ux(f, r.lastCritical);
    g && (r.lastCritical = f);
    const h = !cx(r.lastLocation, p);
    h && (r.lastLocation = p);
    const w = !lx(r.lastCombine, m);
    if (w && (r.lastCombine = m), !g && !h && !w)
      return;
    const y = {
      ...Sr(f, r.mode),
      combine: m,
      destination: p
    };
    n.add(() => {
      $n("onDragUpdate", () => Oi(e().onDragUpdate, y, t, Nr.onDragUpdate));
    });
  }, c = () => {
    r || B(!1), n.flush();
  }, l = (f) => {
    r || B(!1), r = null, $n("onDragEnd", () => Oi(e().onDragEnd, f, t, Nr.onDragEnd));
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
        ...Sr(r.lastCritical, r.mode),
        combine: null,
        destination: null,
        reason: "CANCEL"
      };
      l(f);
    }
  };
}, fx = (e, t) => {
  const n = dx(e, t);
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
const px = (e) => (t) => (n) => {
  if (n.type !== "DROP_ANIMATION_FINISHED") {
    t(n);
    return;
  }
  const r = e.getState();
  r.phase !== "DROP_ANIMATING" && B(!1), e.dispatch(Va({
    completed: r.completed
  }));
};
var mx = px;
const gx = (e) => {
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
        e.getState().phase === "DROP_ANIMATING" && e.dispatch(ip());
      }
    };
    n = requestAnimationFrame(() => {
      n = null, t = Ye(window, [s]);
    });
  };
};
var hx = gx, bx = (e) => () => (t) => (n) => {
  (n.type === "DROP_COMPLETE" || n.type === "FLUSH" || n.type === "DROP_ANIMATE") && e.stopPublishing(), t(n);
}, yx = (e) => {
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
const vx = (e) => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH";
var wx = (e) => (t) => (n) => (r) => {
  if (vx(r)) {
    e.stop(), n(r);
    return;
  }
  if (r.type === "INITIAL_PUBLISH") {
    n(r);
    const o = t.getState();
    o.phase !== "DRAGGING" && B(!1), e.start(o);
    return;
  }
  n(r), e.scroll(t.getState());
};
const Sx = (e) => (t) => (n) => {
  if (t(n), n.type !== "PUBLISH_WHILE_DRAGGING")
    return;
  const r = e.getState();
  r.phase === "DROP_PENDING" && (r.isWaiting || e.dispatch(op({
    reason: r.reason
  })));
};
var xx = Sx;
const Cx = Nf;
var Ix = ({
  dimensionMarshal: e,
  focusMarshal: t,
  styleMarshal: n,
  getResponders: r,
  announce: o,
  autoScroller: i
}) => Af(A1, Cx(aS(q1(n), bx(e), U1(e), ex, mx, hx, xx, wx(i), ix, yx(t), fx(r, o))));
const Ti = () => ({
  additions: {},
  removals: {},
  modified: {}
});
function Ex({
  registry: e,
  callbacks: t
}) {
  let n = Ti(), r = null;
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
      n = Ti(), t.publish(p);
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
      r && (cancelAnimationFrame(r), r = null, n = Ti());
    }
  };
}
var lp = ({
  scrollHeight: e,
  scrollWidth: t,
  height: n,
  width: r
}) => {
  const o = Fe({
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
}, up = () => {
  const e = document.documentElement;
  return e || B(!1), e;
}, dp = () => {
  const e = up();
  return lp({
    scrollHeight: e.scrollHeight,
    scrollWidth: e.scrollWidth,
    width: e.clientWidth,
    height: e.clientHeight
  });
}, Dx = () => {
  const e = cp(), t = dp(), n = e.y, r = e.x, o = up(), i = o.clientWidth, s = o.clientHeight, a = r + i, c = n + s;
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
}, Rx = ({
  critical: e,
  scrollOptions: t,
  registry: n
}) => {
  const r = Dx(), o = r.scroll.current, i = e.droppable, s = n.droppable.getAllByType(i.type).map((u) => u.callbacks.getDimensionAndWatchScroll(o, t)), a = n.draggable.getAllByType(e.draggable.type).map((u) => u.getDimension(o));
  return {
    dimensions: {
      draggables: Ff(a),
      droppables: Mf(s)
    },
    critical: e,
    viewport: r
  };
};
function Al(e, t, n) {
  return !(n.descriptor.id === t.id || n.descriptor.type !== t.type || e.droppable.getById(n.descriptor.droppableId).descriptor.mode !== "virtual");
}
var Px = (e, t) => {
  let n = null;
  const r = Ex({
    callbacks: {
      publish: t.publishWhileDragging,
      collectionStarting: t.collectionStarting
    },
    registry: e
  }), o = (d, p) => {
    e.droppable.exists(d) || B(!1), n && t.updateDroppableIsEnabled({
      id: d,
      isEnabled: p
    });
  }, i = (d, p) => {
    n && (e.droppable.exists(d) || B(!1), t.updateDroppableIsCombineEnabled({
      id: d,
      isCombineEnabled: p
    }));
  }, s = (d, p) => {
    n && (e.droppable.exists(d) || B(!1), t.updateDroppableScroll({
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
    n || B(!1);
    const p = n.critical.draggable;
    d.type === "ADDITION" && Al(e, p, d.value) && r.add(d.value), d.type === "REMOVAL" && Al(e, p, d.value) && r.remove(d.value);
  };
  return {
    updateDroppableIsEnabled: o,
    updateDroppableIsCombineEnabled: i,
    scrollDroppable: a,
    updateDroppableScroll: s,
    startPublishing: (d) => {
      n && B(!1);
      const p = e.draggable.getById(d.draggableId), m = e.droppable.getById(p.descriptor.droppableId), g = {
        draggable: p.descriptor,
        droppable: m.descriptor
      }, h = e.subscribe(l);
      return n = {
        critical: g,
        unsubscribe: h
      }, Rx({
        critical: g,
        registry: e,
        scrollOptions: d.scrollOptions
      });
    },
    stopPublishing: c
  };
}, fp = (e, t) => e.phase === "IDLE" ? !0 : e.phase !== "DROP_ANIMATING" || e.completed.result.draggableId === t ? !1 : e.completed.result.reason === "DROP", Ax = (e) => {
  window.scrollBy(e.x, e.y);
};
const Nx = de((e) => Xo(e).filter((t) => !(!t.isEnabled || !t.frame))), Ox = (e, t) => Nx(t).find((r) => (r.frame || B(!1), Yf(r.frame.pageMarginBox)(e))) || null;
var Tx = ({
  center: e,
  destination: t,
  droppables: n
}) => {
  if (t) {
    const o = n[t];
    return o.frame ? o : null;
  }
  return Ox(e, n);
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
var $x = (e, t, n = () => Qn) => {
  const r = n(), o = e[t.size] * r.startFromPercentage, i = e[t.size] * r.maxScrollAtPercentage;
  return {
    startScrollingFrom: o,
    maxScrollValueAt: i
  };
}, pp = ({
  startOfRange: e,
  endOfRange: t,
  current: n
}) => {
  const r = t - e;
  return r === 0 ? 0 : (n - e) / r;
}, Ha = 1, _x = (e, t, n = () => Qn) => {
  const r = n();
  if (e > t.startScrollingFrom)
    return 0;
  if (e <= t.maxScrollValueAt)
    return r.maxPixelScroll;
  if (e === t.startScrollingFrom)
    return Ha;
  const i = 1 - pp({
    startOfRange: t.maxScrollValueAt,
    endOfRange: t.startScrollingFrom,
    current: e
  }), s = r.maxPixelScroll * r.ease(i);
  return Math.ceil(s);
}, Lx = (e, t, n) => {
  const r = n(), o = r.durationDampening.accelerateAt, i = r.durationDampening.stopDampeningAt, s = t, a = i, l = Date.now() - s;
  if (l >= i)
    return e;
  if (l < o)
    return Ha;
  const u = pp({
    startOfRange: o,
    endOfRange: a,
    current: l
  }), f = e * r.ease(u);
  return Math.ceil(f);
}, Nl = ({
  distanceToEdge: e,
  thresholds: t,
  dragStartTime: n,
  shouldUseTimeDampening: r,
  getAutoScrollerOptions: o
}) => {
  const i = _x(e, t, o);
  return i === 0 ? 0 : r ? Math.max(Lx(i, n, o), Ha) : i;
}, Ol = ({
  container: e,
  distanceToEdges: t,
  dragStartTime: n,
  axis: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: i
}) => {
  const s = $x(e, r, i);
  return t[r.end] < t[r.start] ? Nl({
    distanceToEdge: t[r.end],
    thresholds: s,
    dragStartTime: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  }) : -1 * Nl({
    distanceToEdge: t[r.start],
    thresholds: s,
    dragStartTime: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  });
}, kx = ({
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
const Bx = Bf((e) => e === 0 ? 0 : e);
var mp = ({
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
    axis: Ba,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  }), c = Ol({
    container: t,
    distanceToEdges: s,
    dragStartTime: e,
    axis: zf,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  }), l = Bx({
    x: c,
    y: a
  });
  if (_t(l, pe))
    return null;
  const u = kx({
    container: t,
    subject: n,
    proposedScroll: l
  });
  return u ? _t(u, pe) ? null : u : null;
};
const Mx = Bf((e) => e === 0 ? 0 : e > 0 ? 1 : -1), Ua = (() => {
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
    return _t(i, pe) ? null : i;
  };
})(), gp = ({
  max: e,
  current: t,
  change: n
}) => {
  const r = {
    x: Math.max(t.x, e.x),
    y: Math.max(t.y, e.y)
  }, o = Mx(n), i = Ua({
    max: r,
    current: t,
    change: o
  });
  return !i || o.x !== 0 && i.x === 0 || o.y !== 0 && i.y === 0;
}, qa = (e, t) => gp({
  current: e.scroll.current,
  max: e.scroll.max,
  change: t
}), Fx = (e, t) => {
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
  return n ? gp({
    current: n.scroll.current,
    max: n.scroll.max,
    change: t
  }) : !1;
}, jx = (e, t) => {
  const n = e.frame;
  return !n || !Ka(e, t) ? null : Ua({
    current: n.scroll.current,
    max: n.scroll.max,
    change: t
  });
};
var Wx = ({
  viewport: e,
  subject: t,
  center: n,
  dragStartTime: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: i
}) => {
  const s = mp({
    dragStartTime: r,
    container: e.frame,
    subject: t,
    center: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  });
  return s && qa(e, s) ? s : null;
}, zx = ({
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
  const a = mp({
    dragStartTime: r,
    container: s.pageMarginBox,
    subject: t,
    center: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  });
  return a && Ka(e, a) ? a : null;
}, Tl = ({
  state: e,
  dragStartTime: t,
  shouldUseTimeDampening: n,
  scrollWindow: r,
  scrollDroppable: o,
  getAutoScrollerOptions: i
}) => {
  const s = e.current.page.borderBoxCenter, c = e.dimensions.draggables[e.critical.draggable.id].page.marginBox;
  if (e.isWindowScrollAllowed) {
    const f = e.viewport, d = Wx({
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
  const l = Tx({
    center: s,
    destination: We(e.impact),
    droppables: e.dimensions.droppables
  });
  if (!l)
    return;
  const u = zx({
    dragStartTime: t,
    droppable: l,
    subject: c,
    center: s,
    shouldUseTimeDampening: n,
    getAutoScrollerOptions: i
  });
  u && o(l.descriptor.id, u);
}, Vx = ({
  scrollWindow: e,
  scrollDroppable: t,
  getAutoScrollerOptions: n = () => Qn
}) => {
  const r = qn(e), o = qn(t);
  let i = null;
  const s = (l) => {
    i || B(!1);
    const {
      shouldUseTimeDampening: u,
      dragStartTime: f
    } = i;
    Tl({
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
      i && B(!1);
      const u = Date.now();
      let f = !1;
      const d = () => {
        f = !0;
      };
      Tl({
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
}, Gx = ({
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
    const l = jx(a, c);
    if (!l)
      return t(a.descriptor.id, c), null;
    const u = Fe(c, l);
    return t(a.descriptor.id, u), Fe(c, u);
  }, i = (a, c, l) => {
    if (!a || !qa(c, l))
      return l;
    const u = Fx(c, l);
    if (!u)
      return n(l), null;
    const f = Fe(l, u);
    return n(f), Fe(l, f);
  };
  return (a) => {
    const c = a.scrollJumpRequest;
    if (!c)
      return;
    const l = We(a.impact);
    l || B(!1);
    const u = o(a.dimensions.droppables[l], c);
    if (!u)
      return;
    const f = a.viewport, d = i(a.isWindowScrollAllowed, f, u);
    d && r(a, d);
  };
}, Hx = ({
  scrollDroppable: e,
  scrollWindow: t,
  move: n,
  getAutoScrollerOptions: r
}) => {
  const o = Vx({
    scrollWindow: t,
    scrollDroppable: e,
    getAutoScrollerOptions: r
  }), i = Gx({
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
const Sn = "data-rfd", xn = (() => {
  const e = `${Sn}-drag-handle`;
  return {
    base: e,
    draggableId: `${e}-draggable-id`,
    contextId: `${e}-context-id`
  };
})(), cs = (() => {
  const e = `${Sn}-draggable`;
  return {
    base: e,
    contextId: `${e}-context-id`,
    id: `${e}-id`
  };
})(), Ux = (() => {
  const e = `${Sn}-droppable`;
  return {
    base: e,
    contextId: `${e}-context-id`,
    id: `${e}-id`
  };
})(), $l = {
  contextId: `${Sn}-scroll-container-context-id`
}, qx = (e) => (t) => `[${t}="${e}"]`, _n = (e, t) => e.map((n) => {
  const r = n.styles[t];
  return r ? `${n.selector} { ${r} }` : "";
}).join(" "), Kx = "pointer-events: none;";
var Yx = (e) => {
  const t = qx(e), n = (() => {
    const a = `
      cursor: -webkit-grab;
      cursor: grab;
    `;
    return {
      selector: t(xn.contextId),
      styles: {
        always: `
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          touch-action: manipulation;
        `,
        resting: a,
        dragging: Kx,
        dropAnimating: a
      }
    };
  })(), r = (() => {
    const a = `
      transition: ${Fn.outOfTheWay};
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
    selector: t(Ux.contextId),
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
    always: _n(s, "always"),
    resting: _n(s, "resting"),
    dragging: _n(s, "dragging"),
    dropAnimating: _n(s, "dropAnimating"),
    userCancel: _n(s, "userCancel")
  };
};
const Xx = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u" ? oo : V;
var ze = Xx;
const $i = () => {
  const e = document.querySelector("head");
  return e || B(!1), e;
}, _l = (e) => {
  const t = document.createElement("style");
  return e && t.setAttribute("nonce", e), t.type = "text/css", t;
};
function Jx(e, t) {
  const n = K(() => Yx(e), [e]), r = W(null), o = W(null), i = z(de((f) => {
    const d = o.current;
    d || B(!1), d.textContent = f;
  }), []), s = z((f) => {
    const d = r.current;
    d || B(!1), d.textContent = f;
  }, []);
  ze(() => {
    !r.current && !o.current || B(!1);
    const f = _l(t), d = _l(t);
    return r.current = f, o.current = d, f.setAttribute(`${Sn}-always`, e), d.setAttribute(`${Sn}-dynamic`, e), $i().appendChild(f), $i().appendChild(d), s(n.always), i(n.resting), () => {
      const p = (m) => {
        const g = m.current;
        g || B(!1), $i().removeChild(g), m.current = null;
      };
      p(r), p(o);
    };
  }, [t, s, i, n.always, n.resting, e]);
  const a = z(() => i(n.dragging), [i, n.dragging]), c = z((f) => {
    if (f === "DROP") {
      i(n.dropAnimating);
      return;
    }
    i(n.userCancel);
  }, [i, n.dropAnimating, n.userCancel]), l = z(() => {
    o.current && i(n.resting);
  }, [i, n.resting]);
  return K(() => ({
    dragging: a,
    dropping: c,
    resting: l
  }), [a, c, l]);
}
function hp(e, t) {
  return Array.from(e.querySelectorAll(t));
}
var bp = (e) => e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window;
function ei(e) {
  return e instanceof bp(e).HTMLElement;
}
function Qx(e, t) {
  const n = `[${xn.contextId}="${e}"]`, r = hp(document, n);
  if (!r.length)
    return null;
  const o = r.find((i) => i.getAttribute(xn.draggableId) === t);
  return !o || !ei(o) ? null : o;
}
function Zx(e) {
  const t = W({}), n = W(null), r = W(null), o = W(!1), i = z(function(d, p) {
    const m = {
      id: d,
      focus: p
    };
    return t.current[d] = m, function() {
      const h = t.current;
      h[d] !== m && delete h[d];
    };
  }, []), s = z(function(d) {
    const p = Qx(e, d);
    p && p !== document.activeElement && p.focus();
  }, [e]), a = z(function(d, p) {
    n.current === d && (n.current = p);
  }, []), c = z(function() {
    r.current || o.current && (r.current = requestAnimationFrame(() => {
      r.current = null;
      const d = n.current;
      d && s(d);
    }));
  }, [s]), l = z(function(d) {
    n.current = null;
    const p = document.activeElement;
    p && p.getAttribute(xn.draggableId) === d && (n.current = d);
  }, []);
  return ze(() => (o.current = !0, function() {
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
function eC() {
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
    return d || B(!1), d;
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
    return d || B(!1), d;
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
function tC() {
  const e = K(eC, []);
  return V(() => function() {
    S.version.startsWith("16") || S.version.startsWith("17") ? requestAnimationFrame(e.clean) : e.clean();
  }, [e]), e;
}
var Ya = S.createContext(null), Xr = () => {
  const e = document.body;
  return e || B(!1), e;
};
const nC = {
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
var rC = nC;
const oC = (e) => `rfd-announcement-${e}`;
function iC(e) {
  const t = K(() => oC(e), [e]), n = W(null);
  return V(function() {
    const i = document.createElement("div");
    return n.current = i, i.id = t, i.setAttribute("aria-live", "assertive"), i.setAttribute("aria-atomic", "true"), Tt(i.style, rC), Xr().appendChild(i), function() {
      setTimeout(function() {
        const c = Xr();
        c.contains(i) && c.removeChild(i), i === n.current && (n.current = null);
      });
    };
  }, [t]), z((o) => {
    const i = n.current;
    if (i) {
      i.textContent = o;
      return;
    }
  }, []);
}
let sC = 0;
const yp = {
  separator: "::"
};
function aC(e, t = yp) {
  return K(() => `${e}${t.separator}${sC++}`, [t.separator, e]);
}
function cC(e, t = yp) {
  const n = S.useId();
  return K(() => `${e}${t.separator}${n}`, [t.separator, e, n]);
}
var Xa = "useId" in S ? cC : aC;
function lC({
  contextId: e,
  uniqueId: t
}) {
  return `rfd-hidden-text-${e}-${t}`;
}
function uC({
  contextId: e,
  text: t
}) {
  const n = Xa("hidden-text", {
    separator: "-"
  }), r = K(() => lC({
    contextId: e,
    uniqueId: n
  }), [n, e]);
  return V(function() {
    const i = document.createElement("div");
    return i.id = r, i.textContent = t, i.style.display = "none", Xr().appendChild(i), function() {
      const a = Xr();
      a.contains(i) && a.removeChild(i);
    };
  }, [r, t]), r;
}
var ti = S.createContext(null);
function vp(e) {
  const t = W(e);
  return V(() => {
    t.current = e;
  }), t;
}
function dC() {
  let e = null;
  function t() {
    return !!e;
  }
  function n(s) {
    return s === e;
  }
  function r(s) {
    e && B(!1);
    const a = {
      abandon: s
    };
    return e = a, a;
  }
  function o() {
    e || B(!1), e = null;
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
const fC = 9, pC = 13, Ja = 27, wp = 32, mC = 33, gC = 34, hC = 35, bC = 36, yC = 37, vC = 38, wC = 39, SC = 40, xC = {
  [pC]: !0,
  [fC]: !0
};
var Sp = (e) => {
  xC[e.keyCode] && e.preventDefault();
};
const CC = (() => {
  const e = "visibilitychange";
  return typeof document > "u" ? e : [e, `ms${e}`, `webkit${e}`, `moz${e}`, `o${e}`].find((r) => `on${r}` in document) || e;
})();
var ni = CC;
const xp = 0, Ll = 5;
function IC(e, t) {
  return Math.abs(t.x - e.x) >= Ll || Math.abs(t.y - e.y) >= Ll;
}
const kl = {
  type: "IDLE"
};
function EC({
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
      if (i !== xp)
        return;
      const c = {
        x: s,
        y: a
      }, l = n();
      if (l.type === "DRAGGING") {
        o.preventDefault(), l.actions.move(c);
        return;
      }
      l.type !== "PENDING" && B(!1);
      const u = l.point;
      if (!IC(u, c))
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
      Sp(o);
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
      if (i.type === "IDLE" && B(!1), i.actions.shouldRespectForcePress()) {
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
function DC(e) {
  const t = W(kl), n = W($t), r = K(() => ({
    eventName: "mousedown",
    fn: function(f) {
      if (f.defaultPrevented || f.button !== xp || f.ctrlKey || f.metaKey || f.shiftKey || f.altKey)
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
  }), [e]), i = z(function() {
    const f = {
      passive: !1,
      capture: !0
    };
    n.current = Ye(window, [o, r], f);
  }, [o, r]), s = z(() => {
    t.current.type !== "IDLE" && (t.current = kl, n.current(), i());
  }, [i]), a = z(() => {
    const u = t.current;
    s(), u.type === "DRAGGING" && u.actions.cancel({
      shouldBlockNextClick: !0
    }), u.type === "PENDING" && u.actions.abort();
  }, [s]), c = z(function() {
    const f = {
      capture: !0,
      passive: !1
    }, d = EC({
      cancel: a,
      completed: s,
      getPhase: () => t.current,
      setPhase: (p) => {
        t.current = p;
      }
    });
    n.current = Ye(window, d, f);
  }, [a, s]), l = z(function(f, d) {
    t.current.type !== "IDLE" && B(!1), t.current = {
      type: "PENDING",
      point: d,
      actions: f
    }, c();
  }, [c]);
  ze(function() {
    return i(), function() {
      n.current();
    };
  }, [i]);
}
function RC() {
}
const PC = {
  [gC]: !0,
  [mC]: !0,
  [bC]: !0,
  [hC]: !0
};
function AC(e, t) {
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
      if (o.keyCode === wp) {
        o.preventDefault(), r();
        return;
      }
      if (o.keyCode === SC) {
        o.preventDefault(), e.moveDown();
        return;
      }
      if (o.keyCode === vC) {
        o.preventDefault(), e.moveUp();
        return;
      }
      if (o.keyCode === wC) {
        o.preventDefault(), e.moveRight();
        return;
      }
      if (o.keyCode === yC) {
        o.preventDefault(), e.moveLeft();
        return;
      }
      if (PC[o.keyCode]) {
        o.preventDefault();
        return;
      }
      Sp(o);
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
function NC(e) {
  const t = W(RC), n = K(() => ({
    eventName: "keydown",
    fn: function(i) {
      if (i.defaultPrevented || i.keyCode !== wp)
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
        c || B(!1), c = !1, t.current(), r();
      }
      t.current = Ye(window, AC(l, u), {
        capture: !0,
        passive: !1
      });
    }
  }), [e]), r = z(function() {
    const i = {
      passive: !1,
      capture: !0
    };
    t.current = Ye(window, [n], i);
  }, [n]);
  ze(function() {
    return r(), function() {
      t.current();
    };
  }, [r]);
}
const _i = {
  type: "IDLE"
}, OC = 120, TC = 0.15;
function $C({
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
function _C({
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
      o.type === "IDLE" && B(!1);
      const i = r.touches[0];
      if (!i || !(i.force >= TC))
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
function LC(e) {
  const t = W(_i), n = W($t), r = z(function() {
    return t.current;
  }, []), o = z(function(p) {
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
  }), [e]), s = z(function() {
    const p = {
      capture: !0,
      passive: !1
    };
    n.current = Ye(window, [i], p);
  }, [i]), a = z(() => {
    const d = t.current;
    d.type !== "IDLE" && (d.type === "PENDING" && clearTimeout(d.longPressTimerId), o(_i), n.current(), s());
  }, [s, o]), c = z(() => {
    const d = t.current;
    a(), d.type === "DRAGGING" && d.actions.cancel({
      shouldBlockNextClick: !0
    }), d.type === "PENDING" && d.actions.abort();
  }, [a]), l = z(function() {
    const p = {
      capture: !0,
      passive: !1
    }, m = {
      cancel: c,
      completed: a,
      getPhase: r
    }, g = Ye(window, _C(m), p), h = Ye(window, $C(m), p);
    n.current = function() {
      g(), h();
    };
  }, [c, r, a]), u = z(function() {
    const p = r();
    p.type !== "PENDING" && B(!1);
    const m = p.actions.fluidLift(p.point);
    o({
      type: "DRAGGING",
      actions: m,
      hasMoved: !1
    });
  }, [r, o]), f = z(function(p, m) {
    r().type !== "IDLE" && B(!1);
    const g = setTimeout(u, OC);
    o({
      type: "PENDING",
      point: m,
      actions: p,
      longPressTimerId: g
    }), l();
  }, [l, r, o, u]);
  ze(function() {
    return s(), function() {
      n.current();
      const m = r();
      m.type === "PENDING" && (clearTimeout(m.longPressTimerId), o(_i));
    };
  }, [r, s, o]), ze(function() {
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
const kC = ["input", "button", "textarea", "select", "option", "optgroup", "video", "audio"];
function Cp(e, t) {
  if (t == null)
    return !1;
  if (kC.includes(t.tagName.toLowerCase()))
    return !0;
  const r = t.getAttribute("contenteditable");
  return r === "true" || r === "" ? !0 : t === e ? !1 : Cp(e, t.parentElement);
}
function BC(e, t) {
  const n = t.target;
  return ei(n) ? Cp(e, n) : !1;
}
var MC = (e) => at(e.getBoundingClientRect()).center;
function FC(e) {
  return e instanceof bp(e).Element;
}
const jC = (() => {
  const e = "matches";
  return typeof document > "u" ? e : [e, "msMatchesSelector", "webkitMatchesSelector"].find((r) => r in Element.prototype) || e;
})();
function Ip(e, t) {
  return e == null ? null : e[jC](t) ? e : Ip(e.parentElement, t);
}
function WC(e, t) {
  return e.closest ? e.closest(t) : Ip(e, t);
}
function zC(e) {
  return `[${xn.contextId}="${e}"]`;
}
function VC(e, t) {
  const n = t.target;
  if (!FC(n))
    return null;
  const r = zC(e), o = WC(n, r);
  return !o || !ei(o) ? null : o;
}
function GC(e, t) {
  const n = VC(e, t);
  return n ? n.getAttribute(xn.draggableId) : null;
}
function HC(e, t) {
  const n = `[${cs.contextId}="${e}"]`, o = hp(document, n).find((i) => i.getAttribute(cs.id) === t);
  return !o || !ei(o) ? null : o;
}
function UC(e) {
  e.preventDefault();
}
function xr({
  expected: e,
  phase: t,
  isLockActive: n,
  shouldWarn: r
}) {
  return !(!n() || e !== t);
}
function Ep({
  lockAPI: e,
  store: t,
  registry: n,
  draggableId: r
}) {
  if (e.isClaimed())
    return !1;
  const o = n.draggable.findById(r);
  return !(!o || !o.options.isEnabled || !fp(t.getState(), r));
}
function qC({
  lockAPI: e,
  contextId: t,
  store: n,
  registry: r,
  draggableId: o,
  forceSensorStop: i,
  sourceEvent: s
}) {
  if (!Ep({
    lockAPI: e,
    store: n,
    registry: r,
    draggableId: o
  }))
    return null;
  const c = r.draggable.getById(o), l = HC(t, c.descriptor.id);
  if (!l || s && !c.options.canDragInteractiveElements && BC(l, s))
    return null;
  const u = e.claim(i || $t);
  let f = "PRE_DRAG";
  function d() {
    return c.options.shouldRespectForcePress;
  }
  function p() {
    return e.isActive(u);
  }
  function m(x, C) {
    xr({
      expected: x,
      phase: f,
      isLockActive: p,
      shouldWarn: !0
    }) && n.dispatch(C());
  }
  const g = m.bind(null, "DRAGGING");
  function h(x) {
    function C() {
      e.release(), f = "COMPLETED";
    }
    f !== "PRE_DRAG" && (C(), B(!1)), n.dispatch(O1(x.liftActionArgs)), f = "DRAGGING";
    function E(I, N = {
      shouldBlockNextClick: !1
    }) {
      if (x.cleanup(), N.shouldBlockNextClick) {
        const $ = Ye(window, [{
          eventName: "click",
          fn: UC,
          options: {
            once: !0,
            passive: !1,
            capture: !0
          }
        }]);
        setTimeout($);
      }
      C(), n.dispatch(op({
        reason: I
      }));
    }
    return {
      isActive: () => xr({
        expected: "DRAGGING",
        phase: f,
        isLockActive: p,
        shouldWarn: !1
      }),
      shouldRespectForcePress: d,
      drop: (I) => E("DROP", I),
      cancel: (I) => E("CANCEL", I),
      ...x.actions
    };
  }
  function w(x) {
    const C = qn((I) => {
      g(() => rp({
        client: I
      }));
    });
    return {
      ...h({
        liftActionArgs: {
          id: o,
          clientSelection: x,
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
    const x = {
      moveUp: () => g(j1),
      moveRight: () => g(z1),
      moveDown: () => g(W1),
      moveLeft: () => g(V1)
    };
    return h({
      liftActionArgs: {
        id: o,
        clientSelection: MC(l),
        movementMode: "SNAP"
      },
      cleanup: $t,
      actions: x
    });
  }
  function b() {
    xr({
      expected: "PRE_DRAG",
      phase: f,
      isLockActive: p,
      shouldWarn: !0
    }) && e.release();
  }
  return {
    isActive: () => xr({
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
const KC = [DC, NC, LC];
function YC({
  contextId: e,
  store: t,
  registry: n,
  customSensors: r,
  enableDefaultSensors: o
}) {
  const i = [...o ? KC : [], ...r || []], s = U(() => dC())[0], a = z(function(h, w) {
    Zn(h) && !Zn(w) && s.tryAbandon();
  }, [s]);
  ze(function() {
    let h = t.getState();
    return t.subscribe(() => {
      const y = t.getState();
      a(h, y), h = y;
    });
  }, [s, t, a]), ze(() => s.tryAbandon, [s.tryAbandon]);
  const c = z((g) => Ep({
    lockAPI: s,
    registry: n,
    store: t,
    draggableId: g
  }), [s, n, t]), l = z((g, h, w) => qC({
    lockAPI: s,
    registry: n,
    contextId: e,
    store: t,
    draggableId: g,
    forceSensorStop: h || null,
    sourceEvent: w && w.sourceEvent ? w.sourceEvent : null
  }), [e, s, n, t]), u = z((g) => GC(e, g), [e]), f = z((g) => {
    const h = n.draggable.findById(g);
    return h ? h.options : null;
  }, [n.draggable]), d = z(function() {
    s.isClaimed() && (s.tryAbandon(), t.getState().phase !== "IDLE" && t.dispatch(za()));
  }, [s, t]), p = z(() => s.isClaimed(), [s]), m = K(() => ({
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
const XC = (e) => ({
  onBeforeCapture: (t) => {
    const n = () => {
      e.onBeforeCapture && e.onBeforeCapture(t);
    };
    S.version.startsWith("16") || S.version.startsWith("17") ? n() : ds(n);
  },
  onBeforeDragStart: e.onBeforeDragStart,
  onDragStart: e.onDragStart,
  onDragEnd: e.onDragEnd,
  onDragUpdate: e.onDragUpdate
}), JC = (e) => ({
  ...Qn,
  ...e.autoScrollerOptions,
  durationDampening: {
    ...Qn.durationDampening,
    ...e.autoScrollerOptions
  }
});
function Ln(e) {
  return e.current || B(!1), e.current;
}
function QC(e) {
  const {
    contextId: t,
    setCallbacks: n,
    sensors: r,
    nonce: o,
    dragHandleUsageInstructions: i
  } = e, s = W(null), a = vp(e), c = z(() => XC(a.current), [a]), l = z(() => JC(a.current), [a]), u = iC(t), f = uC({
    contextId: t,
    text: i
  }), d = Jx(t, o), p = z(($) => {
    Ln(s).dispatch($);
  }, []), m = K(() => gl({
    publishWhileDragging: $1,
    updateDroppableScroll: L1,
    updateDroppableIsEnabled: k1,
    updateDroppableIsCombineEnabled: B1,
    collectionStarting: _1
  }, p), [p]), g = tC(), h = K(() => Px(g, m), [g, m]), w = K(() => Hx({
    scrollWindow: Ax,
    scrollDroppable: h.scrollDroppable,
    getAutoScrollerOptions: l,
    ...gl({
      move: rp
    }, p)
  }), [h.scrollDroppable, p, l]), y = Zx(t), b = K(() => Ix({
    announce: u,
    autoScroller: w,
    dimensionMarshal: h,
    focusMarshal: y,
    getResponders: c,
    styleMarshal: d
  }), [u, w, h, y, c, d]);
  s.current = b;
  const v = z(() => {
    const $ = Ln(s);
    $.getState().phase !== "IDLE" && $.dispatch(za());
  }, []), x = z(() => {
    const $ = Ln(s).getState();
    return $.phase === "DROP_ANIMATING" ? !0 : $.phase === "IDLE" ? !1 : $.isDragging;
  }, []), C = K(() => ({
    isDragging: x,
    tryAbort: v
  }), [x, v]);
  n(C);
  const E = z(($) => fp(Ln(s).getState(), $), []), I = z(() => Jt(Ln(s).getState()), []), N = K(() => ({
    marshal: h,
    focus: y,
    contextId: t,
    canLift: E,
    isMovementAllowed: I,
    dragHandleUsageInstructionsId: f,
    registry: g
  }), [t, h, f, y, E, I, g]);
  return YC({
    contextId: t,
    store: b,
    registry: g,
    customSensors: r || null,
    enableDefaultSensors: e.enableDefaultSensors !== !1
  }), V(() => v, [v]), S.createElement(ti.Provider, {
    value: N
  }, S.createElement(cf, {
    context: Ya,
    store: b
  }, e.children));
}
let ZC = 0;
function eI() {
  return K(() => `${ZC++}`, []);
}
function tI() {
  return S.useId();
}
var nI = "useId" in S ? tI : eI;
function rI(e) {
  const t = nI(), n = e.dragHandleUsageInstructions || Nr.dragHandleUsageInstructions;
  return S.createElement(vS, null, (r) => S.createElement(QC, {
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
const Bl = {
  dragging: 5e3,
  dropAnimating: 4500
}, oI = (e, t) => t ? Fn.drop(t.duration) : e ? Fn.snap : Fn.fluid, iI = (e, t) => {
  if (e)
    return t ? Jn.opacity.drop : Jn.opacity.combining;
}, sI = (e) => e.forceShouldAnimate != null ? e.forceShouldAnimate : e.mode === "SNAP";
function aI(e) {
  const n = e.dimension.client, {
    offset: r,
    combineWith: o,
    dropping: i
  } = e, s = !!o, a = sI(e), c = !!i, l = c ? ss.drop(r, s) : ss.moveTo(r);
  return {
    position: "fixed",
    top: n.marginBox.top,
    left: n.marginBox.left,
    boxSizing: "border-box",
    width: n.borderBox.width,
    height: n.borderBox.height,
    transition: oI(a, i),
    transform: l,
    opacity: iI(s, c),
    zIndex: c ? Bl.dropAnimating : Bl.dragging,
    pointerEvents: "none"
  };
}
function cI(e) {
  return {
    transform: ss.moveTo(e.offset),
    transition: e.shouldAnimateDisplacement ? void 0 : "none"
  };
}
function lI(e) {
  return e.type === "DRAGGING" ? aI(e) : cI(e);
}
function uI(e, t, n = pe) {
  const r = window.getComputedStyle(t), o = t.getBoundingClientRect(), i = Tf(o, r), s = Ur(i, n), a = {
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
function dI(e) {
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
  }), [i, a, s]), l = z((p) => {
    const m = o();
    return m || B(!1), uI(n, m, p);
  }, [n, o]), u = K(() => ({
    uniqueId: t,
    descriptor: n,
    options: c,
    getDimension: l
  }), [n, l, c, t]), f = W(u), d = W(!0);
  ze(() => (r.draggable.register(f.current), () => r.draggable.unregister(f.current)), [r.draggable]), ze(() => {
    if (d.current) {
      d.current = !1;
      return;
    }
    const p = f.current;
    f.current = u, r.draggable.update(u, p);
  }, [u, r.draggable]);
}
var Qa = S.createContext(null);
function Jr(e) {
  const t = ut(e);
  return t || B(!1), t;
}
function fI(e) {
  e.preventDefault();
}
const pI = (e) => {
  const t = W(null), n = z((C = null) => {
    t.current = C;
  }, []), r = z(() => t.current, []), {
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
    dI(C);
  }
  const y = K(() => d ? {
    tabIndex: 0,
    role: "button",
    "aria-describedby": i,
    "data-rfd-drag-handle-draggable-id": f,
    "data-rfd-drag-handle-context-id": o,
    draggable: !1,
    onDragStart: fI
  } : null, [o, i, f, d]), b = z((C) => {
    h.type === "DRAGGING" && h.dropping && C.propertyName === "transform" && (S.version.startsWith("16") || S.version.startsWith("17") ? w() : ds(w));
  }, [w, h]), v = K(() => {
    const C = lI(h), E = h.type === "DRAGGING" && h.dropping ? b : void 0;
    return {
      innerRef: n,
      draggableProps: {
        "data-rfd-draggable-context-id": o,
        "data-rfd-draggable-id": f,
        style: C,
        onTransitionEnd: E
      },
      dragHandleProps: y
    };
  }, [o, y, f, h, b, n]), x = K(() => ({
    draggableId: l.id,
    type: l.type,
    source: {
      index: l.index,
      droppableId: l.droppableId
    }
  }), [l.droppableId, l.id, l.index, l.type]);
  return S.createElement(S.Fragment, null, u(v, h.snapshot, x));
};
var mI = pI, Dp = (e, t) => e === t, Rp = (e) => {
  const {
    combine: t,
    destination: n
  } = e;
  return n ? n.droppableId : t ? t.droppableId : null;
};
const gI = (e) => e.combine ? e.combine.draggableId : null, hI = (e) => e.at && e.at.type === "COMBINE" ? e.at.combine.draggableId : null;
function bI() {
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
      const s = o.current.client.offset, a = o.dimensions.draggables[i.draggableId], c = We(o.impact), l = hI(o.impact), u = o.forceShouldAnimate;
      return n(e(s.x, s.y), o.movementMode, a, i.isClone, c, l, u);
    }
    if (o.phase === "DROP_ANIMATING") {
      const s = o.completed;
      if (s.result.draggableId !== i.draggableId)
        return null;
      const a = i.isClone, c = o.dimensions.draggables[i.draggableId], l = s.result, u = l.mode, f = Rp(l), d = gI(l), m = {
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
function Pp(e = null) {
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
const yI = {
  mapped: {
    type: "SECONDARY",
    offset: pe,
    combineTargetFor: null,
    shouldAnimateDisplacement: !0,
    snapshot: Pp(null)
  }
};
function vI() {
  const e = de((s, a) => ({
    x: s,
    y: a
  })), t = de(Pp), n = de((s, a = null, c) => ({
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
const wI = () => {
  const e = bI(), t = vI();
  return (r, o) => e(r, o) || t(r, o) || yI;
}, SI = {
  dropAnimationFinished: ip
}, xI = af(wI, SI, null, {
  context: Ya,
  areStatePropsEqual: Dp
})(mI);
var CI = xI;
function Ap(e) {
  return Jr(Qa).isUsingCloneFor === e.draggableId && !e.isClone ? null : S.createElement(CI, e);
}
function II(e) {
  const t = typeof e.isDragDisabled == "boolean" ? !e.isDragDisabled : !0, n = !!e.disableInteractiveElementBlocking, r = !!e.shouldRespectForcePress;
  return S.createElement(Ap, Tt({}, e, {
    isClone: !1,
    isEnabled: t,
    canDragInteractiveElements: n,
    shouldRespectForcePress: r
  }));
}
const Np = (e) => (t) => e === t, EI = Np("scroll"), DI = Np("auto"), Ml = (e, t) => t(e.overflowX) || t(e.overflowY), RI = (e) => {
  const t = window.getComputedStyle(e), n = {
    overflowX: t.overflowX,
    overflowY: t.overflowY
  };
  return Ml(n, EI) || Ml(n, DI);
}, PI = () => !1, Op = (e) => e == null ? null : e === document.body ? PI() ? e : null : e === document.documentElement ? null : RI(e) ? e : Op(e.parentElement);
var AI = Op, ls = (e) => ({
  x: e.scrollLeft,
  y: e.scrollTop
});
const Tp = (e) => e ? window.getComputedStyle(e).position === "fixed" ? !0 : Tp(e.parentElement) : !1;
var NI = (e) => {
  const t = AI(e), n = Tp(e);
  return {
    closestScrollable: t,
    isFixedOnPage: n
  };
}, OI = ({
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
    } = a, m = lp({
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
  })(), l = o === "vertical" ? Ba : zf, u = wn({
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
const TI = (e, t) => {
  const n = $f(e);
  if (!t || e !== t)
    return n;
  const r = n.paddingBox.top - t.scrollTop, o = n.paddingBox.left - t.scrollLeft, i = r + t.scrollHeight, s = o + t.scrollWidth, c = $a({
    top: r,
    right: s,
    bottom: i,
    left: o
  }, n.border);
  return _a({
    borderBox: c,
    margin: n.margin,
    border: n.border,
    padding: n.padding
  });
};
var $I = ({
  ref: e,
  descriptor: t,
  env: n,
  windowScroll: r,
  direction: o,
  isDropDisabled: i,
  isCombineEnabled: s,
  shouldClipSubject: a
}) => {
  const c = n.closestScrollable, l = TI(e, c), u = Ur(l, r), f = (() => {
    if (!c)
      return null;
    const p = $f(c), m = {
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
  return OI({
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
const _I = {
  passive: !1
}, LI = {
  passive: !0
};
var Fl = (e) => e.shouldPublishImmediately ? _I : LI;
const Cr = (e) => e && e.env.closestScrollable || null;
function kI(e) {
  const t = W(null), n = Jr(ti), r = Xa("droppable"), {
    registry: o,
    marshal: i
  } = n, s = vp(e), a = K(() => ({
    id: e.droppableId,
    type: e.type,
    mode: e.mode
  }), [e.droppableId, e.mode, e.type]), c = W(a), l = K(() => de((v, x) => {
    t.current || B(!1);
    const C = {
      x: v,
      y: x
    };
    i.updateDroppableScroll(a.id, C);
  }), [a.id, i]), u = z(() => {
    const v = t.current;
    return !v || !v.env.closestScrollable ? pe : ls(v.env.closestScrollable);
  }, []), f = z(() => {
    const v = u();
    l(v.x, v.y);
  }, [u, l]), d = K(() => qn(f), [f]), p = z(() => {
    const v = t.current, x = Cr(v);
    if (v && x || B(!1), v.scrollOptions.shouldPublishImmediately) {
      f();
      return;
    }
    d();
  }, [d, f]), m = z((v, x) => {
    t.current && B(!1);
    const C = s.current, E = C.getDroppableRef();
    E || B(!1);
    const I = NI(E), N = {
      ref: E,
      descriptor: a,
      env: I,
      scrollOptions: x
    };
    t.current = N;
    const $ = $I({
      ref: E,
      descriptor: a,
      env: I,
      windowScroll: v,
      direction: C.direction,
      isDropDisabled: C.isDropDisabled,
      isCombineEnabled: C.isCombineEnabled,
      shouldClipSubject: !C.ignoreContainerClipping
    }), T = I.closestScrollable;
    return T && (T.setAttribute($l.contextId, n.contextId), T.addEventListener("scroll", p, Fl(N.scrollOptions))), $;
  }, [n.contextId, a, p, s]), g = z(() => {
    const v = t.current, x = Cr(v);
    return v && x || B(!1), ls(x);
  }, []), h = z(() => {
    const v = t.current;
    v || B(!1);
    const x = Cr(v);
    t.current = null, x && (d.cancel(), x.removeAttribute($l.contextId), x.removeEventListener("scroll", p, Fl(v.scrollOptions)));
  }, [p, d]), w = z((v) => {
    const x = t.current;
    x || B(!1);
    const C = Cr(x);
    C || B(!1), C.scrollTop += v.y, C.scrollLeft += v.x;
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
  ze(() => (c.current = b.descriptor, o.droppable.register(b), () => {
    t.current && h(), o.droppable.unregister(b);
  }), [y, a, h, b, i, o.droppable]), ze(() => {
    t.current && i.updateDroppableIsEnabled(c.current.id, !e.isDropDisabled);
  }, [e.isDropDisabled, i]), ze(() => {
    t.current && i.updateDroppableIsCombineEnabled(c.current.id, e.isCombineEnabled);
  }, [e.isCombineEnabled, i]);
}
function Li() {
}
const jl = {
  width: 0,
  height: 0,
  margin: DS
}, BI = ({
  isAnimatingOpenOnMount: e,
  placeholder: t,
  animate: n
}) => e || n === "close" ? jl : {
  height: t.client.borderBox.height,
  width: t.client.borderBox.width,
  margin: t.client.margin
}, MI = ({
  isAnimatingOpenOnMount: e,
  placeholder: t,
  animate: n
}) => {
  const r = BI({
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
    transition: n !== "none" ? Fn.placeholder : null
  };
}, FI = (e) => {
  const t = W(null), n = z(() => {
    t.current && (clearTimeout(t.current), t.current = null);
  }, []), {
    animate: r,
    onTransitionEnd: o,
    onClose: i,
    contextId: s
  } = e, [a, c] = U(e.animate === "open");
  V(() => a ? r !== "open" ? (n(), c(!1), Li) : t.current ? Li : (t.current = setTimeout(() => {
    t.current = null, c(!1);
  }), n) : Li, [r, a, n]);
  const l = z((f) => {
    f.propertyName === "height" && (o(), r === "close" && i());
  }, [r, i, o]), u = MI({
    isAnimatingOpenOnMount: a,
    animate: e.animate,
    placeholder: e.placeholder
  });
  return S.createElement(e.placeholder.tagName, {
    style: u,
    "data-rfd-placeholder-context-id": s,
    onTransitionEnd: l,
    ref: e.innerRef
  });
};
var jI = S.memo(FI);
class WI extends S.PureComponent {
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
const zI = (e) => {
  const t = ut(ti);
  t || B(!1);
  const {
    contextId: n,
    isMovementAllowed: r
  } = t, o = W(null), i = W(null), {
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
  } = e, y = z(() => o.current, []), b = z((T = null) => {
    o.current = T;
  }, []);
  z(() => i.current, []);
  const v = z((T = null) => {
    i.current = T;
  }, []), x = z(() => {
    r() && h({
      maxScroll: dp()
    });
  }, [r, h]);
  kI({
    droppableId: a,
    type: c,
    mode: l,
    direction: u,
    isDropDisabled: d,
    isCombineEnabled: p,
    ignoreContainerClipping: f,
    getDroppableRef: y
  });
  const C = K(() => S.createElement(WI, {
    on: e.placeholder,
    shouldAnimate: e.shouldAnimatePlaceholder
  }, ({
    onClose: T,
    data: L,
    animate: k
  }) => S.createElement(jI, {
    placeholder: L,
    onClose: T,
    innerRef: v,
    animate: k,
    contextId: n,
    onTransitionEnd: x
  })), [n, x, e.placeholder, e.shouldAnimatePlaceholder, v]), E = K(() => ({
    innerRef: b,
    placeholder: C,
    droppableProps: {
      "data-rfd-droppable-id": a,
      "data-rfd-droppable-context-id": n
    }
  }), [n, a, C, b]), I = g ? g.dragging.draggableId : null, N = K(() => ({
    droppableId: a,
    type: c,
    isUsingCloneFor: I
  }), [a, I, c]);
  function $() {
    if (!g)
      return null;
    const {
      dragging: T,
      render: L
    } = g, k = S.createElement(Ap, {
      draggableId: T.draggableId,
      index: T.source.index,
      isClone: !0,
      isEnabled: !0,
      shouldRespectForcePress: !1,
      canDragInteractiveElements: !0
    }, (A, _) => L(A, _, T));
    return ru.createPortal(k, w());
  }
  return S.createElement(Qa.Provider, {
    value: N
  }, s(E, m), $());
};
var VI = zI;
function GI() {
  return document.body || B(!1), document.body;
}
const Wl = {
  mode: "standard",
  type: "DEFAULT",
  direction: "vertical",
  isDropDisabled: !1,
  isCombineEnabled: !1,
  ignoreContainerClipping: !1,
  renderClone: null,
  getContainerForClone: GI
}, $p = (e) => {
  let t = {
    ...e
  }, n;
  for (n in Wl)
    e[n] === void 0 && (t = {
      ...t,
      [n]: Wl[n]
    });
  return t;
}, ki = (e, t) => e === t.droppable.type, zl = (e, t) => t.draggables[e.draggable.id], HI = () => {
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
    const a = $p(s), c = a.droppableId, l = a.type, u = !a.isDropDisabled, f = a.renderClone;
    if (Zn(i)) {
      const d = i.critical;
      if (!ki(l, d))
        return t;
      const p = zl(d, i.dimensions), m = We(i.impact) === c;
      return r(c, u, m, m, p, f);
    }
    if (i.phase === "DROP_ANIMATING") {
      const d = i.completed;
      if (!ki(l, d.critical))
        return t;
      const p = zl(d.critical, i.dimensions);
      return r(c, u, Rp(d.result) === c, We(d.impact) === c, p, f);
    }
    if (i.phase === "IDLE" && i.completed && !i.shouldFlush) {
      const d = i.completed;
      if (!ki(l, d.critical))
        return t;
      const p = We(d.impact) === c, m = !!(d.impact.at && d.impact.at.type === "COMBINE"), g = d.critical.droppable.id === c;
      return p ? m ? e : t : g ? e : t;
    }
    return t;
  };
}, UI = {
  updateViewportMaxScroll: F1
}, qI = af(HI, UI, (e, t, n) => ({
  ...$p(n),
  ...e,
  ...t
}), {
  context: Ya,
  areStatePropsEqual: Dp
})(VI);
var KI = qI, _p = { exports: {} }, YI = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED", XI = YI, JI = XI;
function Lp() {
}
function kp() {
}
kp.resetWarningCache = Lp;
var QI = function() {
  function e(r, o, i, s, a, c) {
    if (c !== JI) {
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
    checkPropTypes: kp,
    resetWarningCache: Lp
  };
  return n.PropTypes = n, n;
};
_p.exports = QI();
var ZI = _p.exports;
const Yt = /* @__PURE__ */ ou(ZI);
var eE = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, tE = Object.defineProperty, nE = Object.defineProperties, rE = Object.getOwnPropertyDescriptors, Qr = Object.getOwnPropertySymbols, Bp = Object.prototype.hasOwnProperty, Mp = Object.prototype.propertyIsEnumerable, Vl = (e, t, n) => t in e ? tE(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Gl = (e, t) => {
  for (var n in t || (t = {}))
    Bp.call(t, n) && Vl(e, n, t[n]);
  if (Qr)
    for (var n of Qr(t))
      Mp.call(t, n) && Vl(e, n, t[n]);
  return e;
}, oE = (e, t) => nE(e, rE(t)), iE = (e, t) => {
  var n = {};
  for (var r in e)
    Bp.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Qr)
    for (var r of Qr(e))
      t.indexOf(r) < 0 && Mp.call(e, r) && (n[r] = e[r]);
  return n;
}, Fp = (e, t, n) => {
  const r = ie(
    (o, i) => {
      var s = o, { color: a = "currentColor", size: c = 24, stroke: l = 2, children: u } = s, f = iE(s, ["color", "size", "stroke", "children"]);
      return ac(
        "svg",
        Gl(oE(Gl({
          ref: i
        }, eE), {
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
}, sE = Fp("grip-vertical", "IconGripVertical", [
  ["path", { d: "M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }],
  ["path", { d: "M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }],
  ["path", { d: "M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }],
  ["path", { d: "M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-3" }],
  ["path", { d: "M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-4" }],
  ["path", { d: "M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-5" }]
]), aE = Fp("pencil", "IconPencil", [
  [
    "path",
    {
      d: "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",
      key: "svg-0"
    }
  ],
  ["path", { d: "M13.5 6.5l4 4", key: "svg-1" }]
]);
function jp(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = jp(e[t])) && (r && (r += " "), r += n);
    } else
      for (n in e)
        e[n] && (r && (r += " "), r += n);
  return r;
}
function cE() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = jp(e)) && (r && (r += " "), r += t);
  return r;
}
const lE = "_item_1ca4j_1", uE = "_itemDragging_1ca4j_23", dE = "_symbol_1ca4j_31", fE = "_dragHandle_1ca4j_43", Ir = {
  item: lE,
  itemDragging: uE,
  symbol: dE,
  dragHandle: fE
};
function pE({ id: e }) {
  const t = ur(), { t: n } = Ut(), r = ue((s) => s.settings.filterDictionaries), o = (s) => {
    if (!s.destination)
      return;
    const a = Array.from(r), [c] = a.splice(s.source.index, 1);
    a.splice(s.destination.index, 0, c), t(Ta(a));
  }, i = r.map((s, a) => /* @__PURE__ */ M.jsx(II, { index: a, draggableId: s.dictionaryUri, children: (c, l) => /* @__PURE__ */ M.jsxs(
    "div",
    {
      className: cE(Ir.item, { [Ir.itemDragging]: l.isDragging }),
      ref: c.innerRef,
      ...c.draggableProps,
      children: [
        /* @__PURE__ */ M.jsx("div", { ...c.dragHandleProps, className: Ir.dragHandle, children: /* @__PURE__ */ M.jsx(sE, { style: { width: D(18), height: D(18) }, stroke: 1.5 }) }),
        /* @__PURE__ */ M.jsx(Xe, { className: Ir.uri, children: s.dictionaryName })
      ]
    }
  ) }, s.dictionaryUri));
  return /* @__PURE__ */ M.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ M.jsxs(oe.Control, { children: [
      /* @__PURE__ */ M.jsx(En, { order: 5, children: n("Sort filter dictionaries") }),
      /* @__PURE__ */ M.jsx(Xe, { size: "xs", c: "dimmed", children: n("Sort filter dictionaries help text") })
    ] }),
    /* @__PURE__ */ M.jsx(oe.Panel, { children: /* @__PURE__ */ M.jsx(rI, { onDragEnd: o, children: /* @__PURE__ */ M.jsx(KI, { droppableId: "dnd-list", direction: "vertical", children: (s) => /* @__PURE__ */ M.jsxs("div", { ...s.droppableProps, ref: s.innerRef, children: [
      i,
      s.placeholder
    ] }) }) }) })
  ] }, e);
}
const mE = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function gE(e) {
  return typeof e == "string" && mE.test(e);
}
const he = [];
for (let e = 0; e < 256; ++e)
  he.push((e + 256).toString(16).slice(1));
function hE(e, t = 0) {
  return he[e[t + 0]] + he[e[t + 1]] + he[e[t + 2]] + he[e[t + 3]] + "-" + he[e[t + 4]] + he[e[t + 5]] + "-" + he[e[t + 6]] + he[e[t + 7]] + "-" + he[e[t + 8]] + he[e[t + 9]] + "-" + he[e[t + 10]] + he[e[t + 11]] + he[e[t + 12]] + he[e[t + 13]] + he[e[t + 14]] + he[e[t + 15]];
}
function bE(e) {
  if (!gE(e))
    throw TypeError("Invalid UUID");
  let t;
  const n = new Uint8Array(16);
  return n[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24, n[1] = t >>> 16 & 255, n[2] = t >>> 8 & 255, n[3] = t & 255, n[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8, n[5] = t & 255, n[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8, n[7] = t & 255, n[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8, n[9] = t & 255, n[10] = (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, n[11] = t / 4294967296 & 255, n[12] = t >>> 24 & 255, n[13] = t >>> 16 & 255, n[14] = t >>> 8 & 255, n[15] = t & 255, n;
}
function yE(e) {
  e = unescape(encodeURIComponent(e));
  const t = [];
  for (let n = 0; n < e.length; ++n)
    t.push(e.charCodeAt(n));
  return t;
}
const vE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", wE = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function SE(e, t, n) {
  function r(o, i, s, a) {
    var c;
    if (typeof o == "string" && (o = yE(o)), typeof i == "string" && (i = bE(i)), ((c = i) === null || c === void 0 ? void 0 : c.length) !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    let l = new Uint8Array(16 + o.length);
    if (l.set(i), l.set(o, i.length), l = n(l), l[6] = l[6] & 15 | t, l[8] = l[8] & 63 | 128, s) {
      a = a || 0;
      for (let u = 0; u < 16; ++u)
        s[a + u] = l[u];
      return s;
    }
    return hE(l);
  }
  try {
    r.name = e;
  } catch {
  }
  return r.DNS = vE, r.URL = wE, r;
}
function xE(e, t, n, r) {
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
function Bi(e, t) {
  return e << t | e >>> 32 - t;
}
function CE(e) {
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
      a[p] = Bi(a[p - 3] ^ a[p - 8] ^ a[p - 14] ^ a[p - 16], 1);
    let c = n[0], l = n[1], u = n[2], f = n[3], d = n[4];
    for (let p = 0; p < 80; ++p) {
      const m = Math.floor(p / 20), g = Bi(c, 5) + xE(m, l, u, f) + d + t[m] + a[p] >>> 0;
      d = f, f = u, u = Bi(l, 30) >>> 0, l = c, c = g;
    }
    n[0] = n[0] + c >>> 0, n[1] = n[1] + l >>> 0, n[2] = n[2] + u >>> 0, n[3] = n[3] + f >>> 0, n[4] = n[4] + d >>> 0;
  }
  return [n[0] >> 24 & 255, n[0] >> 16 & 255, n[0] >> 8 & 255, n[0] & 255, n[1] >> 24 & 255, n[1] >> 16 & 255, n[1] >> 8 & 255, n[1] & 255, n[2] >> 24 & 255, n[2] >> 16 & 255, n[2] >> 8 & 255, n[2] & 255, n[3] >> 24 & 255, n[3] >> 16 & 255, n[3] >> 8 & 255, n[3] & 255, n[4] >> 24 & 255, n[4] >> 16 & 255, n[4] >> 8 & 255, n[4] & 255];
}
const IE = SE("v5", 80, CE), EE = IE, DE = "b989028b-337b-417f-b917-c4e17384b8c5";
function RE(e) {
  return EE(e, DE);
}
function Hl(e, t) {
  const n = t.find((r) => r.dictionaryUri === e.uri);
  return n || {
    dictionaryUri: e.uri,
    dictionaryName: e.name,
    parameterName: `bsdd/${e.organizationCodeOwner}/${e.name}`.replace(/\s/g, "-"),
    parameterId: RE(e.uri),
    parameterMapping: ""
  };
}
function PE({ id: e }) {
  const t = ur(), { t: n } = Ut(), r = ue((d) => d.bsdd.dictionaries), o = ue((d) => d.settings.filterDictionaries), i = ue((d) => d.settings.mainDictionary), [s, a] = U([]), [c, l] = U([]);
  V(() => {
    a(r.map((d) => ({ value: d.uri, label: d.name })));
  }, [r, a]), V(() => {
    l(
      o.map((d) => ({ value: d.dictionaryUri, label: d.dictionaryName }))
    );
  }, [o, l]);
  const u = (d) => {
    console.log(d), console.log(s);
    const p = r.find((m) => m.uri === d);
    if (p) {
      const m = [];
      i && m.push(i), t(Pf(Hl(p, m)));
    }
  }, f = (d) => {
    console.log(d);
    const p = r.filter((m) => d.includes(m.uri)).map((m) => Hl(m, o));
    console.log(o), console.log(p), t(Ta(p)), console.log(o);
  };
  return /* @__PURE__ */ M.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ M.jsxs(oe.Control, { children: [
      /* @__PURE__ */ M.jsx(En, { order: 5, children: n("Dictionary selection") }),
      /* @__PURE__ */ M.jsx(Xe, { size: "xs", c: "dimmed", children: n("Dictionary selection help text") })
    ] }),
    /* @__PURE__ */ M.jsxs(oe.Panel, { children: [
      /* @__PURE__ */ M.jsx(
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
      /* @__PURE__ */ M.jsx(da, { h: "xs" }),
      /* @__PURE__ */ M.jsx(
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
const AE = () => {
  const { t: e, i18n: t } = Ut(), n = [
    { value: "en", label: "English" },
    { value: "nl", label: "Nederlands" }
  ], r = (o) => {
    o && t.changeLanguage(o);
  };
  return /* @__PURE__ */ M.jsx(cr, { label: e("Language"), data: n, value: t.language, onChange: r, placeholder: e("Select language") });
};
function NE({ id: e }) {
  const t = ur(), { t: n } = Ut(), r = ue((i) => i.settings.bddApiEnvironment), o = (i) => {
    i && t(eS(i));
  };
  return /* @__PURE__ */ M.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ M.jsxs(oe.Control, { children: [
      /* @__PURE__ */ M.jsx(En, { order: 5, children: n("General settings") }),
      /* @__PURE__ */ M.jsx(Xe, { size: "xs", c: "dimmed", children: n("General settings help text") })
    ] }),
    /* @__PURE__ */ M.jsxs(oe.Panel, { children: [
      /* @__PURE__ */ M.jsx(AE, {}),
      " ",
      /* @__PURE__ */ M.jsx(da, { h: "xs" }),
      /* @__PURE__ */ M.jsx(
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
function OE({}) {
  const e = ue((o) => o.settings.mainDictionary), t = ue((o) => o.settings.filterDictionaries), n = ue((o) => o.settings.language), r = ue(Yo);
  return V(() => {
    if (!e)
      return;
    console.log("Save settings", {
      bsddApiEnvironment: r,
      mainDictionary: e,
      filterDictionaries: t,
      language: n
    });
  }, [r, e, t, n]), /* @__PURE__ */ M.jsx(st.Panel, { value: "settings", children: /* @__PURE__ */ M.jsxs(oe, { defaultValue: ["2"], multiple: !0, children: [
    /* @__PURE__ */ M.jsx(NE, { id: 1 }),
    /* @__PURE__ */ M.jsx(PE, { id: 2 }),
    /* @__PURE__ */ M.jsx(nS, { id: 3 }),
    /* @__PURE__ */ M.jsx(pE, { id: 4 })
  ] }) });
}
const TE = {
  ifcEntities: []
}, Wp = Na({
  name: "ifcData",
  initialState: TE,
  reducers: {
    setIfcData: (e, t) => {
      e.ifcEntities = t.payload;
    }
  }
}), $E = (e) => e.ifcData.ifcEntities, { setIfcData: Ul } = Wp.actions, _E = Wp.reducer;
class LE {
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
class kE extends LE {
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
class Za extends kE {
  constructor(t) {
    super({ baseUrl: t });
  }
}
const BE = {
  dictionaries: []
}, ME = Na({
  name: "bsdd",
  initialState: BE,
  reducers: {},
  extraReducers: (e) => {
    e.addCase(zp.fulfilled, (t, n) => {
      t.dictionaries = n.payload;
    });
  }
}), zp = Lw(
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
), FE = ME.reducer;
function jE(e) {
  const { type: t } = e;
  return t === "IfcClassificationReference";
}
function WE(e, t) {
  const n = t.referencedSource;
  return n && n.location ? n.location === e : !1;
}
function zE(e, t) {
  const n = e.hasAssociations;
  return n && n.find(
    (o) => jE(o) && WE(t.dictionaryUri, o)
  ) ? t.dictionaryUri : null;
}
const us = {
  grey: "#B0B0B0",
  // grey for undefined
  red: "#FF0000",
  // bright red
  orange: "#FFA500",
  // bright orange
  green: "#00C853"
  // bright green
};
function VE({ item: e, bsddClass: t, index: n, setCardColor: r }) {
  const { t: o } = Ut(), i = ue(Rf), [s, a] = U("grey"), [c, l] = U([]), [u, f] = U([]);
  function d(m) {
    a(m), r(n, m);
  }
  V(() => {
    console.log(e == null ? void 0 : e.name), console.log("activeClassificationStatuses", c), c.every((m) => m !== null) ? d("green") : c.some((m) => m !== null) ? d("orange") : d("red");
  }, [c]), V(() => {
    const m = c.map((g) => g !== null ? "green" : "red");
    f(m);
  }, [c]), V(() => {
    l(
      i.map((m) => zE(e, m))
    );
  }, [e, i]);
  function p(m) {
    const g = JSON.stringify(m);
    bsddBridge.bsddSearch(g);
  }
  return /* @__PURE__ */ M.jsxs(jn, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
    /* @__PURE__ */ M.jsx(Wn, { size: "1.5em", color: us[s] }),
    /* @__PURE__ */ M.jsxs(en, { position: "bottom-end", shadow: "md", children: [
      /* @__PURE__ */ M.jsx(en.Target, { children: /* @__PURE__ */ M.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ M.jsx(Xe, { className: "truncate", children: e.name }) }) }),
      /* @__PURE__ */ M.jsxs(en.Dropdown, { children: [
        /* @__PURE__ */ M.jsx(Xe, { children: "Validation per class:" }),
        i.map((m, g) => (c[g], /* @__PURE__ */ M.jsxs(jn, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
          /* @__PURE__ */ M.jsx(Wn, { size: "1em", color: us[u[g]] }),
          /* @__PURE__ */ M.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ M.jsx(Xe, { className: "truncate", children: m.dictionaryName }) })
        ] }, m.dictionaryUri)))
      ] })
    ] }),
    /* @__PURE__ */ M.jsx(ar, { label: o("Attach to type"), children: /* @__PURE__ */ M.jsx(bo, { radius: "xl", onClick: () => p(e), children: /* @__PURE__ */ M.jsx(aE, { size: 20 }) }) })
  ] });
}
function GE({ bsddEnvironmentName: e, category: t, opened: n, bbbr: r, items: o, index: i }) {
  const { t: s } = Ut(), [a, c] = U(), [l, u] = U("grey"), [f, d] = U(new Array(o.length).fill("grey")), p = ue(Yo);
  function m(h, w) {
    d((y) => {
      const b = [...y];
      return b[h] = w, b;
    });
  }
  V(() => {
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
  }, [t, r]), V(() => {
    f.includes("orange") || f.includes("red") && f.includes("green") ? u("orange") : f.every((h) => h === "red") ? u("red") : f.every((h) => h === "green") && u("green");
  }, [f]);
  function g(h, w) {
    let y;
    return w.filter((b) => {
      b.code === h && (y = b);
    }), y || !1;
  }
  return /* @__PURE__ */ M.jsxs(oe.Item, { value: i, children: [
    /* @__PURE__ */ M.jsx(oe.Control, { children: /* @__PURE__ */ M.jsxs(jn, { justify: "space-between", className: "flexGroup", children: [
      /* @__PURE__ */ M.jsx(Wn, { size: "1.5em", color: us[l], children: /* @__PURE__ */ M.jsx(Xe, { size: "xs", c: "white", children: o.length }) }),
      /* @__PURE__ */ M.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ M.jsx(Xe, { className: "truncate", children: t.length > 0 ? t : s("No description") }) })
    ] }) }),
    /* @__PURE__ */ M.jsx(oe.Panel, { mt: "-xs", pl: "xl", children: o.map((h, w) => /* @__PURE__ */ M.jsx(
      VE,
      {
        item: h,
        bsddClass: a,
        index: w,
        setCardColor: m
      },
      w
    )) })
  ] }, t);
}
let HE;
function UE(e, t) {
  const n = e.reduce((r, o) => {
    const i = o[t];
    return i === void 0 || typeof i != "string" ? (r[""] || (r[""] = []), r[""].push(o)) : (r[i] || (r[i] = []), r[i].push(o)), r;
  }, {});
  return Object.keys(n).sort().reduce((r, o) => (r[o] = n[o], r), {});
}
function qE({}) {
  const e = ue((c) => c.settings.mainDictionary), t = ue(Yo), n = ue($E), [r, o] = U({}), [i, s] = U([]);
  V(() => {
    (async () => {
      try {
      } catch (l) {
        console.error(l.message);
      }
    })();
  }, []), V(() => {
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
  const a = UE(n, "description");
  return /* @__PURE__ */ M.jsx(st.Panel, { value: "koppelen", children: /* @__PURE__ */ M.jsx(oe, { chevronPosition: "left", children: Object.entries(a).map(([c, l], u) => /* @__PURE__ */ M.jsx(
    GE,
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
function KE() {
  const e = ur(), { t } = Ut(), n = ue(Yo);
  return V(() => {
    console.log("bsddApiEnvironment changed"), n && e(zp(n));
  }, [n, e]), V(() => {
    const { settings: r, ifcData: o } = vv;
    e(ll(r)), e(Ul(o));
  }, [e]), window.updateSelection = (r) => {
    const { settings: o, ifcData: i } = r;
    e(ll(o)), e(Ul(i));
  }, /* @__PURE__ */ M.jsx(M.Fragment, { children: /* @__PURE__ */ M.jsx(ia, { size: "40rem", children: /* @__PURE__ */ M.jsxs(st, { defaultValue: "koppelen", children: [
    /* @__PURE__ */ M.jsxs(st.List, { grow: !0, children: [
      /* @__PURE__ */ M.jsx(st.Tab, { value: "koppelen", children: t("Link") }),
      /* @__PURE__ */ M.jsx(st.Tab, { value: "settings", children: t("Settings") })
    ] }),
    /* @__PURE__ */ M.jsx(qE, {}),
    /* @__PURE__ */ M.jsx(OE, {})
  ] }) }) });
}
const YE = {
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
    this.prefix = n.prefix || "i18next:", this.logger = t || YE, this.options = n, this.debug = n.debug;
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
function kn() {
  let e, t;
  const n = new Promise((r, o) => {
    e = r, t = o;
  });
  return n.resolve = e, n.reject = t, n;
}
function ql(e) {
  return e == null ? "" : "" + e;
}
function XE(e, t, n) {
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
function Kl(e, t, n) {
  const {
    obj: r,
    k: o
  } = ec(e, t, Object);
  r[o] = n;
}
function JE(e, t, n, r) {
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
function QE(e, t, n) {
  const r = eo(e, n);
  return r !== void 0 ? r : eo(t, n);
}
function Vp(e, t, n) {
  for (const r in t)
    r !== "__proto__" && r !== "constructor" && (r in e ? typeof e[r] == "string" || e[r] instanceof String || typeof t[r] == "string" || t[r] instanceof String ? n && (e[r] = t[r]) : Vp(e[r], t[r], n) : e[r] = t[r]);
  return e;
}
function dn(e) {
  return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var ZE = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function eD(e) {
  return typeof e == "string" ? e.replace(/[&<>"'\/]/g, (t) => ZE[t]) : e;
}
const tD = [" ", ",", "?", "!", ";"];
function nD(e, t, n) {
  t = t || "", n = n || "";
  const r = tD.filter((s) => t.indexOf(s) < 0 && n.indexOf(s) < 0);
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
class Yl extends ri {
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
    r && (a = a.concat(s ? r.split(s) : r)), t.indexOf(".") > -1 && (a = t.split("."), o = n, n = a[1]), this.addNamespaces(n), Kl(this.data, a, o), i.silent || this.emit("added", t, n, r, o);
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
    o ? Vp(c, r, i) : c = {
      ...c,
      ...r
    }, Kl(this.data, a, c), s.silent || this.emit("added", t, n, r);
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
var Gp = {
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
const Xl = {};
class ro extends ri {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), XE(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = pt.create("translator");
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
    const s = r && t.indexOf(r) > -1, a = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !nD(t, r, o);
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
        const v = g === "[object Array]", x = v ? [] : {}, C = v ? m : p;
        for (const E in d)
          if (Object.prototype.hasOwnProperty.call(d, E)) {
            const I = `${C}${i}${E}`;
            x[E] = this.translate(I, {
              ...n,
              joinArrays: !1,
              ns: a
            }), x[E] === I && (x[E] = d[E]);
          }
        d = x;
      }
    } else if (y && typeof w == "string" && g === "[object Array]")
      d = d.join(w), d && (d = this.extendTranslation(d, t, n, r));
    else {
      let v = !1, x = !1;
      const C = n.count !== void 0 && typeof n.count != "string", E = ro.hasDefaultValue(n), I = C ? this.pluralResolver.getSuffix(l, n.count, n) : "", N = n.ordinal && C ? this.pluralResolver.getSuffix(l, n.count, {
        ordinal: !1
      }) : "", $ = n[`defaultValue${I}`] || n[`defaultValue${N}`] || n.defaultValue;
      !this.isValidLookup(d) && E && (v = !0, d = $), this.isValidLookup(d) || (x = !0, d = s);
      const L = (n.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && x ? void 0 : d, k = E && $ !== d && this.options.updateMissing;
      if (x || v || k) {
        if (this.logger.log(k ? "updateKey" : "missingKey", l, c, s, k ? $ : d), i) {
          const F = this.resolve(s, {
            ...n,
            keySeparator: !1
          });
          F && F.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let A = [];
        const _ = this.languageUtils.getFallbackCodes(this.options.fallbackLng, n.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && _ && _[0])
          for (let F = 0; F < _.length; F++)
            A.push(_[F]);
        else
          this.options.saveMissingTo === "all" ? A = this.languageUtils.toResolveHierarchy(n.lng || this.language) : A.push(n.lng || this.language);
        const P = (F, O, G) => {
          const X = E && G !== d ? G : L;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(F, c, O, X, k, n) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(F, c, O, X, k, n), this.emit("missingKey", F, c, O, d);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && C ? A.forEach((F) => {
          this.pluralResolver.getSuffixes(F, n).forEach((O) => {
            P([F], s + O, n[`defaultValue${O}`] || $);
          });
        }) : P(A, s, $));
      }
      d = this.extendTranslation(d, t, n, f, r), x && d === s && this.options.appendNamespaceToMissingKey && (d = `${c}:${s}`), (x || v) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? d = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${c}:${s}` : s, v ? d : void 0) : d = this.options.parseMissingKeyHandler(d));
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
    return t != null && c && c.length && r.applyPostProcessor !== !1 && (t = Gp.handle(c, t, n, this.options && this.options.postProcessPassResolved ? {
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
        this.isValidLookup(r) || (a = h, !Xl[`${g[0]}-${h}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(a) && (Xl[`${g[0]}-${h}`] = !0, this.logger.warn(`key "${o}" for languages "${g.join(", ")}" won't get resolved as namespace "${a}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), g.forEach((w) => {
          if (this.isValidLookup(r))
            return;
          s = w;
          const y = [u];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(y, u, w, h, n);
          else {
            let v;
            d && (v = this.pluralResolver.getSuffix(w, n.count, n));
            const x = `${this.options.pluralSeparator}zero`, C = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (d && (y.push(u + v), n.ordinal && v.indexOf(C) === 0 && y.push(u + v.replace(C, this.options.pluralSeparator)), p && y.push(u + x)), m) {
              const E = `${u}${this.options.contextSeparator}${n.context}`;
              y.push(E), d && (y.push(E + v), n.ordinal && v.indexOf(C) === 0 && y.push(E + v.replace(C, this.options.pluralSeparator)), p && y.push(E + x));
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
function Mi(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
class Jl {
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
      return this.options.lowerCaseLng ? r = r.map((o) => o.toLowerCase()) : r.length === 2 ? (r[0] = r[0].toLowerCase(), r[1] = r[1].toUpperCase(), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = Mi(r[1].toLowerCase()))) : r.length === 3 && (r[0] = r[0].toLowerCase(), r[1].length === 2 && (r[1] = r[1].toUpperCase()), r[0] !== "sgn" && r[2].length === 2 && (r[2] = r[2].toUpperCase()), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = Mi(r[1].toLowerCase())), n.indexOf(r[2].toLowerCase()) > -1 && (r[2] = Mi(r[2].toLowerCase()))), r.join("-");
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
let rD = [{
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
}], oD = {
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
const iD = ["v1", "v2", "v3"], sD = ["v4"], Ql = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function aD() {
  const e = {};
  return rD.forEach((t) => {
    t.lngs.forEach((n) => {
      e[n] = {
        numbers: t.nr,
        plurals: oD[t.fc]
      };
    });
  }), e;
}
class cD {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = t, this.options = n, this.logger = pt.create("pluralResolver"), (!this.options.compatibilityJSON || sD.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = aD();
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
    return r ? this.shouldUseIntlApi() ? r.resolvedOptions().pluralCategories.sort((o, i) => Ql[o] - Ql[i]).map((o) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${o}`) : r.numbers.map((o) => this.getSuffix(t, o, n)) : [];
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
    return !iD.includes(this.options.compatibilityJSON);
  }
}
function Zl(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = QE(e, t, n);
  return !i && o && typeof n == "string" && (i = to(e, n, r), i === void 0 && (i = to(t, n, r))), i;
}
class lD {
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
    this.escape = n.escape !== void 0 ? n.escape : eD, this.escapeValue = n.escapeValue !== void 0 ? n.escapeValue : !0, this.useRawValueToEscape = n.useRawValueToEscape !== void 0 ? n.useRawValueToEscape : !1, this.prefix = n.prefix ? dn(n.prefix) : n.prefixEscaped || "{{", this.suffix = n.suffix ? dn(n.suffix) : n.suffixEscaped || "}}", this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ",", this.unescapePrefix = n.unescapeSuffix ? "" : n.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : n.unescapeSuffix || "", this.nestingPrefix = n.nestingPrefix ? dn(n.nestingPrefix) : n.nestingPrefixEscaped || dn("$t("), this.nestingSuffix = n.nestingSuffix ? dn(n.nestingSuffix) : n.nestingSuffixEscaped || dn(")"), this.nestingOptionsSeparator = n.nestingOptionsSeparator ? n.nestingOptionsSeparator : n.nestingOptionsSeparator || ",", this.maxReplaces = n.maxReplaces ? n.maxReplaces : 1e3, this.alwaysFormat = n.alwaysFormat !== void 0 ? n.alwaysFormat : !1, this.resetRegExp();
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
        const y = Zl(n, c, m, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(y, void 0, r, {
          ...o,
          ...n,
          interpolationkey: m
        }) : y;
      }
      const g = m.split(this.formatSeparator), h = g.shift().trim(), w = g.join(this.formatSeparator).trim();
      return this.format(Zl(n, c, h, this.options.keySeparator, this.options.ignoreJSONStructure), w, r, {
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
          typeof s != "string" && !this.useRawValueToEscape && (s = ql(s));
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
      typeof i != "string" && (i = ql(i)), i || (this.logger.warn(`missed to resolve ${o[1]} for nesting ${t}`), i = ""), l && (i = c.reduce((u, f) => this.format(u, f, r.lng, {
        ...r,
        interpolationkey: o[1].trim()
      }), i.trim())), t = t.replace(o[0], i), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
function uD(e) {
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
class dD {
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
      } = uD(c);
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
function fD(e, t) {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
}
class pD extends ri {
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
      JE(c.loaded, [i], s), fD(c, t), n && c.errors.push(n), c.pendingCount === 0 && !c.done && (Object.keys(c.loaded).forEach((l) => {
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
function eu() {
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
function tu(e) {
  return typeof e.ns == "string" && (e.ns = [e.ns]), typeof e.fallbackLng == "string" && (e.fallbackLng = [e.fallbackLng]), typeof e.fallbackNS == "string" && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e;
}
function Er() {
}
function mD(e) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((n) => {
    typeof e[n] == "function" && (e[n] = e[n].bind(e));
  });
}
class er extends ri {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = tu(t), this.services = {}, this.logger = pt, this.modules = {
      external: []
    }, mD(this), n && !this.isInitialized && !t.isClone) {
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
    const o = eu();
    this.options = {
      ...o,
      ...this.options,
      ...tu(n)
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
      this.modules.formatter ? u = this.modules.formatter : typeof Intl < "u" && (u = dD);
      const f = new Jl(this.options);
      this.store = new Yl(this.options.resources, this.options);
      const d = this.services;
      d.logger = pt, d.resourceStore = this.store, d.languageUtils = f, d.pluralResolver = new cD(f, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), u && (!this.options.interpolation.format || this.options.interpolation.format === o.interpolation.format) && (d.formatter = i(u), d.formatter.init(d, this.options), this.options.interpolation.format = d.formatter.format.bind(d.formatter)), d.interpolator = new lD(this.options), d.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, d.backendConnector = new pD(i(this.modules.backend), d.resourceStore, d, this.options), d.backendConnector.on("*", function(p) {
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
    if (this.format = this.options.interpolation.format, r || (r = Er), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
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
    const c = kn(), l = () => {
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
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Er;
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
    const o = kn();
    return t || (t = this.languages), n || (n = this.options.ns), r || (r = Er), this.services.backendConnector.reload(t, n, (i) => {
      o.resolve(), r(i);
    }), o;
  }
  use(t) {
    if (!t)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && Gp.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
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
    const o = kn();
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
    const r = kn();
    return this.options.ns ? (typeof t == "string" && (t = [t]), t.forEach((o) => {
      this.options.ns.indexOf(o) < 0 && this.options.ns.push(o);
    }), this.loadResources((o) => {
      r.resolve(), n && n(o);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(t, n) {
    const r = kn();
    typeof t == "string" && (t = [t]);
    const o = this.options.preload || [], i = t.filter((s) => o.indexOf(s) < 0);
    return i.length ? (this.options.preload = o.concat(i), this.loadResources((s) => {
      r.resolve(), n && n(s);
    }), r) : (n && n(), Promise.resolve());
  }
  dir(t) {
    if (t || (t = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !t)
      return "rtl";
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = this.services && this.services.languageUtils || new Jl(eu());
    return n.indexOf(r.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    return new er(t, n);
  }
  cloneInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Er;
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
    }, r && (i.store = new Yl(this.store.data, o), i.services.resourceStore = i.store), i.translator = new ro(i.services, o), i.translator.on("*", function(a) {
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
Ce.use(Ov).init({
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
function gD() {
  return /* @__PURE__ */ M.jsx(Iu, { theme: yv, children: /* @__PURE__ */ M.jsx(KE, {}) });
}
const hD = Rw({
  reducer: {
    settings: tS,
    ifcData: _E,
    bsdd: FE
  }
});
Fi.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ M.jsx(S.StrictMode, { children: /* @__PURE__ */ M.jsx(cf, { store: hD, children: /* @__PURE__ */ M.jsx(gD, {}) }) })
);
