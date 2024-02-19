var dm = Object.defineProperty;
var fm = (e, t, n) => t in e ? dm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Re = (e, t, n) => (fm(e, typeof t != "symbol" ? t + "" : t, n), n);
import * as R from "react";
import x, { createContext as sn, useContext as ut, useRef as z, useEffect as W, useMemo as Mr, useCallback as Q, useState as U, useLayoutEffect as co, useId as su, forwardRef as ie, cloneElement as an, Children as pm, useDebugValue as mm, createElement as fc } from "react";
import * as gm from "react-dom";
import au, { flushSync as hs, createPortal as hm, unstable_batchedUpdates as bm } from "react-dom";
function cu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var lu = { exports: {} }, lo = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ym = x, vm = Symbol.for("react.element"), wm = Symbol.for("react.fragment"), xm = Object.prototype.hasOwnProperty, Sm = ym.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Cm = { key: !0, ref: !0, __self: !0, __source: !0 };
function uu(e, t, n) {
  var r, o = {}, i = null, s = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t)
    xm.call(t, r) && !Cm.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in t = e.defaultProps, t)
      o[r] === void 0 && (o[r] = t[r]);
  return { $$typeof: vm, type: e, key: i, ref: s, props: o, _owner: Sm.current };
}
lo.Fragment = wm;
lo.jsx = uu;
lo.jsxs = uu;
lu.exports = lo;
var F = lu.exports, Wi = {}, pc = au;
Wi.createRoot = pc.createRoot, Wi.hydrateRoot = pc.hydrateRoot;
function mt(e) {
  return Object.keys(e);
}
function fi(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function bs(e, t) {
  const n = { ...e }, r = t;
  return fi(e) && fi(t) && Object.keys(t).forEach((o) => {
    fi(r[o]) && o in e ? n[o] = bs(n[o], r[o]) : n[o] = r[o];
  }), n;
}
function Em(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function Pm(e) {
  var t;
  return typeof e != "string" || !e.includes("var(--mantine-scale)") ? e : (t = e.match(/^calc\((.*?)\)$/)) == null ? void 0 : t[1].split("*")[0].trim();
}
function Dm(e) {
  const t = Pm(e);
  return typeof t == "number" ? t : typeof t == "string" ? t.includes("calc") || t.includes("var") ? t : t.includes("px") ? Number(t.replace("px", "")) : t.includes("rem") ? Number(t.replace("rem", "")) * 16 : t.includes("em") ? Number(t.replace("em", "")) * 16 : Number(t) : NaN;
}
function pi(e) {
  return `calc(${e} * var(--mantine-scale))`;
}
function du(e, { shouldScale: t = !1 } = {}) {
  function n(r) {
    if (r === 0 || r === "0")
      return "0";
    if (typeof r == "number") {
      const o = `${r / 16}${e}`;
      return t ? pi(o) : o;
    }
    if (typeof r == "string") {
      if (r.startsWith("calc(") || r.startsWith("var(") || r.startsWith("clamp("))
        return r;
      if (r.includes(" "))
        return r.split(" ").map((i) => n(i)).join(" ");
      if (r.includes(e))
        return t ? pi(r) : r;
      const o = r.replace("px", "");
      if (!Number.isNaN(Number(o))) {
        const i = `${Number(o) / 16}${e}`;
        return t ? pi(i) : i;
      }
    }
    return r;
  }
  return n;
}
const D = du("rem", { shouldScale: !0 }), mc = du("em");
function ys(e) {
  return Object.keys(e).reduce((t, n) => (e[n] !== void 0 && (t[n] = e[n]), t), {});
}
function fu(e) {
  return typeof e == "number" ? !0 : typeof e == "string" ? e.startsWith("calc(") || e.startsWith("var(") || e.includes(" ") && e.trim() !== "" ? !0 : /[0-9]/.test(e.trim().replace("-", "")[0]) : !1;
}
function Vt(e) {
  return Array.isArray(e) || e === null ? !1 : typeof e == "object" ? e.type !== x.Fragment : !1;
}
function Wt(e) {
  const t = sn(null);
  return [({ children: o, value: i }) => /* @__PURE__ */ x.createElement(t.Provider, { value: i }, o), () => {
    const o = ut(t);
    if (o === null)
      throw new Error(e);
    return o;
  }];
}
function vs(e = null) {
  const t = sn(e);
  return [({ children: o, value: i }) => /* @__PURE__ */ x.createElement(t.Provider, { value: i }, o), () => ut(t)];
}
function _r(e, t) {
  return (n) => {
    if (typeof n != "string" || n.trim().length === 0)
      throw new Error(t);
    return `${e}-${n}`;
  };
}
function Gi(e, t) {
  let n = e;
  for (; (n = n.parentElement) && !n.matches(t); )
    ;
  return n;
}
function Rm(e, t, n) {
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
function Im(e, t, n) {
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
function Am(e, t, n) {
  return Gi(e, n) === Gi(t, n);
}
function pu({
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
      ((m = Gi(a.currentTarget, e)) == null ? void 0 : m.querySelectorAll(
        t
      )) || []
    ).filter((g) => Am(a.currentTarget, g, e)), l = c.findIndex((g) => a.currentTarget === g), u = Im(l, c, r), d = Rm(l, c, r), f = i === "rtl" ? d : u, p = i === "rtl" ? u : d;
    switch (a.key) {
      case "ArrowRight": {
        s === "horizontal" && (a.stopPropagation(), a.preventDefault(), c[f].focus(), o && c[f].click());
        break;
      }
      case "ArrowLeft": {
        s === "horizontal" && (a.stopPropagation(), a.preventDefault(), c[p].focus(), o && c[p].click());
        break;
      }
      case "ArrowUp": {
        s === "vertical" && (a.stopPropagation(), a.preventDefault(), c[d].focus(), o && c[d].click());
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
const Om = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function ws(e) {
  return Om[e];
}
const Nm = () => {
};
function $m(e, t = { active: !0 }) {
  return typeof e != "function" || !t.active ? t.onKeyDown || Nm : (n) => {
    var r;
    n.key === "Escape" && (e(n), (r = t.onTrigger) == null || r.call(t));
  };
}
function fe(e, t = "size", n = !0) {
  if (e !== void 0)
    return fu(e) ? n ? D(e) : e : `var(--${t}-${e})`;
}
function mu(e) {
  return fe(e, "mantine-spacing");
}
function bt(e) {
  return e === void 0 ? "var(--mantine-radius-default)" : fe(e, "mantine-radius");
}
function gt(e) {
  return fe(e, "mantine-font-size");
}
function Tm(e) {
  return fe(e, "mantine-line-height", !1);
}
function Lm(e) {
  if (e)
    return fe(e, "mantine-shadow", !1);
}
function kr(e, t) {
  return (n) => {
    e == null || e(n), t == null || t(n);
  };
}
function gu(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (n = gu(e[t])) && (r && (r += " "), r += n);
    else
      for (t in e)
        e[t] && (r && (r += " "), r += t);
  return r;
}
function yt() {
  for (var e, t, n = 0, r = ""; n < arguments.length; )
    (e = arguments[n++]) && (t = gu(e)) && (r && (r += " "), r += t);
  return r;
}
const Mm = {};
function _m(e) {
  const t = {};
  return e.forEach((n) => {
    Object.entries(n).forEach(([r, o]) => {
      t[r] ? t[r] = yt(t[r], o) : t[r] = o;
    });
  }), t;
}
function uo({ theme: e, classNames: t, props: n, stylesCtx: r }) {
  const i = (Array.isArray(t) ? t : [t]).map(
    (s) => typeof s == "function" ? s(e, n, r) : s || Mm
  );
  return _m(i);
}
function Fr({ theme: e, styles: t, props: n, stylesCtx: r }) {
  return (Array.isArray(t) ? t : [t]).reduce((i, s) => typeof s == "function" ? { ...i, ...s(e, n, r) } : { ...i, ...s }, {});
}
function hu() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}
function Qt(e) {
  const t = z(e);
  return W(() => {
    t.current = e;
  }), Mr(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function fo(e, t) {
  const n = Qt(e), r = z(0);
  return W(() => () => window.clearTimeout(r.current), []), Q(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(n, t);
  }, [n, t]);
}
const gc = ["mousedown", "touchstart"];
function km(e, t, n) {
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
    return (t || gc).forEach((i) => document.addEventListener(i, o)), () => {
      (t || gc).forEach((i) => document.removeEventListener(i, o));
    };
  }, [r, e, n]), r;
}
function Fm(e, t) {
  try {
    return e.addEventListener("change", t), () => e.removeEventListener("change", t);
  } catch {
    return e.addListener(t), () => e.removeListener(t);
  }
}
function Bm(e, t) {
  return typeof t == "boolean" ? t : typeof window < "u" && "matchMedia" in window ? window.matchMedia(e).matches : !1;
}
function jm(e, t, { getInitialValueInEffect: n } = {
  getInitialValueInEffect: !0
}) {
  const [r, o] = U(
    n ? t : Bm(e, t)
  ), i = z();
  return W(() => {
    if ("matchMedia" in window)
      return i.current = window.matchMedia(e), o(i.current.matches), Fm(i.current, (s) => o(s.matches));
  }, [e]), r;
}
const nr = typeof document < "u" ? co : W;
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
function zm({ opened: e, shouldReturnFocus: t = !0 }) {
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
function Vm(e, t = "body > :not(script)") {
  const n = hu(), r = Array.from(
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
const Wm = /input|select|textarea|button|object/, bu = "a, input, select, textarea, button, object, [tabindex]";
function Gm(e) {
  return e.style.display === "none";
}
function Hm(e) {
  if (e.getAttribute("aria-hidden") || e.getAttribute("hidden") || e.getAttribute("type") === "hidden")
    return !1;
  let n = e;
  for (; n && !(n === document.body || n.nodeType === 11); ) {
    if (Gm(n))
      return !1;
    n = n.parentNode;
  }
  return !0;
}
function yu(e) {
  let t = e.getAttribute("tabindex");
  return t === null && (t = void 0), parseInt(t, 10);
}
function Hi(e) {
  const t = e.nodeName.toLowerCase(), n = !Number.isNaN(yu(e));
  return /* @ts-expect-error function accepts any html element but if it is a button, it should not be disabled to trigger the condition */ (Wm.test(t) && !e.disabled || e instanceof HTMLAnchorElement && e.href || n) && Hm(e);
}
function vu(e) {
  const t = yu(e);
  return (Number.isNaN(t) || t >= 0) && Hi(e);
}
function Um(e) {
  return Array.from(e.querySelectorAll(bu)).filter(vu);
}
function qm(e, t) {
  const n = Um(e);
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
function Km(e = !0) {
  const t = z(), n = z(null), r = (i) => {
    let s = i.querySelector("[data-autofocus]");
    if (!s) {
      const a = Array.from(i.querySelectorAll(bu));
      s = a.find(vu) || a.find(Hi) || null, !s && Hi(i) && (s = i);
    }
    s && s.focus({ preventScroll: !0 });
  }, o = Q(
    (i) => {
      if (e) {
        if (i === null) {
          n.current && (n.current(), n.current = null);
          return;
        }
        n.current = Vm(i), t.current !== i && (i ? (setTimeout(() => {
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
      s.key === "Tab" && t.current && qm(t.current, s);
    };
    return document.addEventListener("keydown", i), () => {
      document.removeEventListener("keydown", i), n.current && n.current();
    };
  }, [e]), o;
}
const Ym = x["useId".toString()] || (() => {
});
function Xm() {
  const e = Ym();
  return e ? `mantine-${e.replace(/:/g, "")}` : "";
}
function Gt(e) {
  const t = Xm(), [n, r] = U(t);
  return nr(() => {
    r(hu());
  }, []), typeof e == "string" ? e : typeof window > "u" ? t : n;
}
function wu(e, t) {
  typeof e == "function" ? e(t) : typeof e == "object" && e !== null && "current" in e && (e.current = t);
}
function xu(...e) {
  return (t) => {
    e.forEach((n) => wu(n, t));
  };
}
function Oe(...e) {
  return Q(xu(...e), e);
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
function Su(e, t) {
  return jm("(prefers-reduced-motion: reduce)", e, t);
}
function Jm(e = !1, t) {
  const { onOpen: n, onClose: r } = t || {}, [o, i] = U(e), s = Q(() => {
    i((l) => l || (n == null || n(), !0));
  }, [n]), a = Q(() => {
    i((l) => l && (r == null || r(), !1));
  }, [r]), c = Q(() => {
    o ? a() : s();
  }, [a, s, o]);
  return [o, { open: s, close: a, toggle: c }];
}
const Cu = sn(null);
function xs() {
  const e = ut(Cu);
  if (!e)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return e;
}
function Qm() {
  return xs().cssVariablesResolver;
}
function Zm() {
  return xs().classNamesPrefix;
}
function Ss() {
  return xs().getStyleNonce;
}
function eg(e) {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(e);
}
function tg(e) {
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
function ng(e) {
  const [t, n, r, o] = e.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r: t, g: n, b: r, a: o || 1 };
}
function rg(e) {
  const t = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, n = e.match(t);
  if (!n)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const r = parseInt(n[1], 10), o = parseInt(n[2], 10) / 100, i = parseInt(n[3], 10) / 100, s = n[5] ? parseFloat(n[5]) : void 0, a = (1 - Math.abs(2 * i - 1)) * o, c = r / 60, l = a * (1 - Math.abs(c % 2 - 1)), u = i - a / 2;
  let d, f, p;
  return c >= 0 && c < 1 ? (d = a, f = l, p = 0) : c >= 1 && c < 2 ? (d = l, f = a, p = 0) : c >= 2 && c < 3 ? (d = 0, f = a, p = l) : c >= 3 && c < 4 ? (d = 0, f = l, p = a) : c >= 4 && c < 5 ? (d = l, f = 0, p = a) : (d = a, f = 0, p = l), {
    r: Math.round((d + u) * 255),
    g: Math.round((f + u) * 255),
    b: Math.round((p + u) * 255),
    a: s || 1
  };
}
function Eu(e) {
  return eg(e) ? tg(e) : e.startsWith("rgb") ? ng(e) : e.startsWith("hsl") ? rg(e) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function vr(e, t) {
  if (e.startsWith("var("))
    return e;
  const { r: n, g: r, b: o, a: i } = Eu(e), s = 1 - t, a = (c) => Math.round(c * s);
  return `rgba(${a(n)}, ${a(r)}, ${a(o)}, ${i})`;
}
function Ui(e, t) {
  return typeof e.primaryShade == "number" ? e.primaryShade : t === "dark" ? e.primaryShade.dark : e.primaryShade.light;
}
function Cs({
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
    value: i !== void 0 ? t.colors[r][i] : t.colors[r][Ui(t, n || "light")],
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
  const n = Cs({ color: e || t.primaryColor, theme: t });
  return n.variable ? `var(${n.variable})` : e;
}
function qi(e, t) {
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
  const { r: n, g: r, b: o } = Eu(e);
  return `rgba(${n}, ${r}, ${o}, ${t})`;
}
const og = ({
  color: e,
  theme: t,
  variant: n,
  gradient: r
}) => {
  const o = Cs({ color: e, theme: t });
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
      hover: vr(e, 0.1),
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
    hover: vr(t.white, 0.01),
    color: `var(--mantine-color-${e}-filled)`,
    border: `${D(1)} solid transparent`
  } : {
    background: "var(--mantine-color-white)",
    hover: vr(t.white, 0.01),
    color: `var(--mantine-color-${o.color}-${o.shade})`,
    border: `${D(1)} solid transparent`
  } : {
    background: "var(--mantine-color-white)",
    hover: vr(t.white, 0.01),
    color: e,
    border: `${D(1)} solid transparent`
  } : n === "gradient" ? {
    background: qi(r, t),
    hover: qi(r, t),
    color: "var(--mantine-color-white)",
    border: "none"
  } : n === "default" ? {
    background: "var(--mantine-color-default)",
    hover: "var(--mantine-color-default-hover)",
    color: "var(--mantine-color-default-color)",
    border: `${D(1)} solid var(--mantine-color-default-border)`
  } : {};
}, ig = {
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
}, hc = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji", Es = {
  scale: 1,
  fontSmoothing: !0,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: ig,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: og,
  fontFamily: hc,
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  respectReducedMotion: !1,
  cursorType: "default",
  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
  defaultRadius: "sm",
  activeClassName: "mantine-active",
  focusClassName: "",
  headings: {
    fontFamily: hc,
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
function bc(e) {
  return e === "auto" || e === "dark" || e === "light";
}
function sg({
  key: e = "mantine-color-scheme-value"
} = {}) {
  let t;
  return {
    get: (n) => {
      if (typeof window > "u")
        return n;
      try {
        const r = window.localStorage.getItem(e);
        return bc(r) ? r : n;
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
        r.storageArea === window.localStorage && r.key === e && bc(r.newValue) && n(r.newValue);
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
const ag = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color", yc = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function mi(e) {
  return e < 0 || e > 9 ? !1 : parseInt(e.toString(), 10) === e;
}
function vc(e) {
  if (!(e.primaryColor in e.colors))
    throw new Error(ag);
  if (typeof e.primaryShade == "object" && (!mi(e.primaryShade.dark) || !mi(e.primaryShade.light)))
    throw new Error(yc);
  if (typeof e.primaryShade == "number" && !mi(e.primaryShade))
    throw new Error(yc);
}
function cg(e, t) {
  var r;
  if (!t)
    return vc(e), e;
  const n = bs(e, t);
  return t.fontFamily && !((r = t.headings) != null && r.fontFamily) && (n.headings.fontFamily = t.fontFamily), vc(n), n;
}
const Ps = sn(null), lg = () => ut(Ps) || Es;
function vt() {
  const e = ut(Ps);
  if (!e)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return e;
}
function Pu({
  theme: e,
  children: t,
  inherit: n = !0
}) {
  const r = lg(), o = Mr(
    () => cg(n ? r : Es, e),
    [e, r, n]
  );
  return /* @__PURE__ */ x.createElement(Ps.Provider, { value: o }, t);
}
Pu.displayName = "@mantine/core/MantineThemeProvider";
function ug() {
  const e = vt(), t = Ss(), n = mt(e.breakpoints).reduce((r, o) => {
    const i = Dm(e.breakpoints[o]);
    return `${r}@media (max-width: ${mc(
      i - 0.1
    )}) {.mantine-visible-from-${o} {display: none !important;}}@media (min-width: ${mc(
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
function gi(e) {
  return Object.entries(e).map(([t, n]) => `${t}: ${n};`).join("");
}
function hi(e, t) {
  return (Array.isArray(e) ? e : [e]).reduce((r, o) => `${o}{${r}}`, t);
}
function dg(e, t) {
  const n = gi(e.variables), r = n ? hi(t, n) : "", o = gi(e.dark), i = o ? hi(`${t}[data-mantine-color-scheme="dark"]`, o) : "", s = gi(e.light), a = s ? hi(`${t}[data-mantine-color-scheme="light"]`, s) : "";
  return `${r}${i}${a}`;
}
function dn(e, t, n) {
  mt(t).forEach(
    (r) => Object.assign(e, { [`--mantine-${n}-${r}`]: t[r] })
  );
}
const Du = (e) => {
  const t = Ui(e, "dark"), n = Ui(e, "light"), r = e.defaultRadius in e.radius ? e.radius[e.defaultRadius] : D(e.defaultRadius), o = {
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
  dn(o.variables, e.breakpoints, "breakpoint"), dn(o.variables, e.spacing, "spacing"), dn(o.variables, e.fontSizes, "font-size"), dn(o.variables, e.lineHeights, "line-height"), dn(o.variables, e.shadows, "shadow"), dn(o.variables, e.radius, "radius"), e.colors[e.primaryColor].forEach((s, a) => {
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
function fg({ theme: e, generator: t }) {
  const n = Du(e), r = t == null ? void 0 : t(e);
  return r ? bs(n, r) : n;
}
const bi = Du(Es);
function pg(e) {
  const t = {
    variables: {},
    light: {},
    dark: {}
  };
  return mt(e.variables).forEach((n) => {
    bi.variables[n] !== e.variables[n] && (t.variables[n] = e.variables[n]);
  }), mt(e.light).forEach((n) => {
    bi.light[n] !== e.light[n] && (t.light[n] = e.light[n]);
  }), mt(e.dark).forEach((n) => {
    bi.dark[n] !== e.dark[n] && (t.dark[n] = e.dark[n]);
  }), t;
}
function mg(e) {
  return `
  ${e}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${e}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
}
function Ru({ cssVariablesSelector: e }) {
  const t = vt(), n = Ss(), r = Qm(), o = fg({ theme: t, generator: r }), i = e === ":root", s = i ? pg(o) : o, a = dg(s, e);
  return a ? /* @__PURE__ */ x.createElement(
    "style",
    {
      "data-mantine-styles": !0,
      nonce: n == null ? void 0 : n(),
      dangerouslySetInnerHTML: {
        __html: `${a}${i ? "" : mg(e)}`
      }
    }
  ) : null;
}
Ru.displayName = "@mantine/CssVariables";
function gg() {
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
function hg({
  manager: e,
  defaultColorScheme: t,
  getRootElement: n,
  forceColorScheme: r
}) {
  const o = z(), [i, s] = U(() => e.get(t)), a = r || i, c = Q(
    (u) => {
      r || (Nn(u, n), s(u), e.set(u));
    },
    [e.set, a, r]
  ), l = Q(() => {
    s(t), Nn(t, n), e.clear();
  }, [e.clear, t]);
  return W(() => (e.subscribe(c), e.unsubscribe), [e.subscribe, e.unsubscribe]), nr(() => {
    Nn(e.get(t), n);
  }, []), W(() => {
    var d;
    if (r)
      return Nn(r, n), () => {
      };
    o.current = window.matchMedia("(prefers-color-scheme: dark)");
    const u = (f) => {
      i === "auto" && Nn(f.matches ? "dark" : "light", n);
    };
    return (d = o.current) == null || d.addEventListener("change", u), () => {
      var f;
      return (f = o.current) == null ? void 0 : f.removeEventListener("change", u);
    };
  }, [i, r]), { colorScheme: a, setColorScheme: c, clearColorScheme: l };
}
function bg({
  respectReducedMotion: e,
  getRootElement: t
}) {
  nr(() => {
    var n;
    e && ((n = t()) == null || n.setAttribute("data-respect-reduced-motion", "true"));
  }, [e]);
}
gg();
function Iu({
  theme: e,
  children: t,
  getStyleNonce: n,
  withCssVariables: r = !0,
  cssVariablesSelector: o = ":root",
  classNamesPrefix: i = "mantine",
  colorSchemeManager: s = sg(),
  defaultColorScheme: a = "light",
  getRootElement: c = () => document.documentElement,
  cssVariablesResolver: l,
  forceColorScheme: u
}) {
  const { colorScheme: d, setColorScheme: f, clearColorScheme: p } = hg({
    defaultColorScheme: a,
    forceColorScheme: u,
    manager: s,
    getRootElement: c
  });
  return bg({
    respectReducedMotion: (e == null ? void 0 : e.respectReducedMotion) || !1,
    getRootElement: c
  }), /* @__PURE__ */ x.createElement(
    Cu.Provider,
    {
      value: {
        colorSchemeManager: s,
        colorScheme: d,
        setColorScheme: f,
        clearColorScheme: p,
        getRootElement: c,
        classNamesPrefix: i,
        getStyleNonce: n,
        cssVariablesResolver: l,
        cssVariablesSelector: o
      }
    },
    /* @__PURE__ */ x.createElement(Pu, { theme: e }, r && /* @__PURE__ */ x.createElement(Ru, { cssVariablesSelector: o }), /* @__PURE__ */ x.createElement(ug, null), t)
  );
}
Iu.displayName = "@mantine/core/MantineProvider";
function Au({
  classNames: e,
  styles: t,
  props: n,
  stylesCtx: r
}) {
  const o = vt();
  return {
    resolvedClassNames: uo({
      theme: o,
      classNames: e,
      props: n,
      stylesCtx: r || void 0
    }),
    resolvedStyles: Fr({
      theme: o,
      styles: t,
      props: n,
      stylesCtx: r || void 0
    })
  };
}
const yg = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function vg({ theme: e, options: t, unstyled: n }) {
  return yt(
    (t == null ? void 0 : t.focusable) && !n && (e.focusClassName || yg[e.focusRing]),
    (t == null ? void 0 : t.active) && !n && e.activeClassName
  );
}
function wg({
  selector: e,
  stylesCtx: t,
  options: n,
  props: r,
  theme: o
}) {
  return uo({
    theme: o,
    classNames: n == null ? void 0 : n.classNames,
    props: (n == null ? void 0 : n.props) || r,
    stylesCtx: t
  })[e];
}
function xg({
  selector: e,
  stylesCtx: t,
  theme: n,
  classNames: r,
  props: o
}) {
  return uo({ theme: n, classNames: r, props: o, stylesCtx: t })[e];
}
function Sg({ rootSelector: e, selector: t, className: n }) {
  return e === t ? n : void 0;
}
function Cg({ selector: e, classes: t, unstyled: n }) {
  return n ? void 0 : t[e];
}
function Eg({
  themeName: e,
  classNamesPrefix: t,
  selector: n
}) {
  return e.map((r) => `${t}-${r}-${n}`);
}
function Pg({
  themeName: e,
  theme: t,
  selector: n,
  props: r,
  stylesCtx: o
}) {
  return e.map(
    (i) => {
      var s, a;
      return (a = uo({
        theme: t,
        classNames: (s = t.components[i]) == null ? void 0 : s.classNames,
        props: r,
        stylesCtx: o
      })) == null ? void 0 : a[n];
    }
  );
}
function Dg({
  options: e,
  classes: t,
  selector: n,
  unstyled: r
}) {
  return e != null && e.variant && !r ? t[`${n}--${e.variant}`] : void 0;
}
function Rg({
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
  stylesCtx: d
}) {
  return yt(
    vg({ theme: e, options: t, unstyled: a }),
    Pg({ theme: e, themeName: n, selector: r, props: u, stylesCtx: d }),
    Dg({ options: t, classes: s, selector: r, unstyled: a }),
    xg({ selector: r, stylesCtx: d, theme: e, classNames: i, props: u }),
    wg({ selector: r, stylesCtx: d, options: t, props: u, theme: e }),
    Sg({ rootSelector: l, selector: r, className: c }),
    Cg({ selector: r, classes: s, unstyled: a }),
    Eg({ themeName: n, classNamesPrefix: o, selector: r }),
    t == null ? void 0 : t.className
  );
}
function Ig({
  theme: e,
  themeName: t,
  props: n,
  stylesCtx: r,
  selector: o
}) {
  return t.map(
    (i) => {
      var s;
      return Fr({
        theme: e,
        styles: (s = e.components[i]) == null ? void 0 : s.styles,
        props: n,
        stylesCtx: r
      })[o];
    }
  ).reduce((i, s) => ({ ...i, ...s }), {});
}
function Ki({ style: e, theme: t }) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...Ki({ style: r, theme: t }) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function Ag(e) {
  return e.reduce((t, n) => (n && Object.keys(n).forEach((r) => {
    t[r] = { ...t[r], ...ys(n[r]) };
  }), t), {});
}
function Og({
  vars: e,
  varsResolver: t,
  theme: n,
  props: r,
  stylesCtx: o,
  selector: i,
  themeName: s
}) {
  var a;
  return (a = Ag([
    t == null ? void 0 : t(n, r, o),
    ...s.map((c) => {
      var l, u, d;
      return (d = (u = (l = n.components) == null ? void 0 : l[c]) == null ? void 0 : u.vars) == null ? void 0 : d.call(u, n, r, o);
    }),
    e == null ? void 0 : e(n, r, o)
  ])) == null ? void 0 : a[i];
}
function Ng({
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
    ...Ig({ theme: e, themeName: t, props: o, stylesCtx: i, selector: n }),
    ...Fr({ theme: e, styles: a, props: o, stylesCtx: i })[n],
    ...Fr({ theme: e, styles: r == null ? void 0 : r.styles, props: (r == null ? void 0 : r.props) || o, stylesCtx: i })[n],
    ...Og({ theme: e, props: o, stylesCtx: i, vars: l, varsResolver: u, selector: n, themeName: t }),
    ...s === n ? Ki({ style: c, theme: e }) : null,
    ...Ki({ style: r == null ? void 0 : r.style, theme: e })
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
  varsResolver: d
}) {
  const f = vt(), p = Zm(), m = (Array.isArray(e) ? e : [e]).filter((g) => g);
  return (g, h) => ({
    className: Rg({
      theme: f,
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
    style: Ng({
      theme: f,
      themeName: m,
      selector: g,
      options: h,
      props: n,
      stylesCtx: r,
      rootSelector: s,
      styles: l,
      style: i,
      vars: u,
      varsResolver: d
    })
  });
}
function j(e, t, n) {
  var s;
  const r = vt(), o = (s = r.components[e]) == null ? void 0 : s.defaultProps, i = typeof o == "function" ? o(r) : o;
  return { ...t, ...i, ...ys(n) };
}
function wc(e) {
  return mt(e).reduce(
    (t, n) => e[n] !== void 0 ? `${t}${Em(n)}:${e[n]};` : t,
    ""
  ).trim();
}
function $g({ selector: e, styles: t, media: n }) {
  const r = t ? wc(t) : "", o = Array.isArray(n) ? n.map((i) => `@media${i.query}{${e}{${wc(i.styles)}}}`) : [];
  return `${r ? `${e}{${r}}` : ""}${o.join("")}`.trim();
}
function Tg({ selector: e, styles: t, media: n }) {
  const r = Ss();
  return /* @__PURE__ */ x.createElement(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: r == null ? void 0 : r(),
      dangerouslySetInnerHTML: { __html: $g({ selector: e, styles: t, media: n }) }
    }
  );
}
function po(e) {
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
    pt: d,
    pb: f,
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
  return { styleProps: ys({
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
    pt: d,
    pb: f,
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
const Lg = {
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
function Mg(e, t) {
  const n = Cs({ color: e, theme: t });
  return n.color === "dimmed" ? "var(--mantine-color-dimmed)" : n.color === "bright" ? "var(--mantine-color-bright)" : n.isThemeColor && n.shade === void 0 ? `var(--mantine-color-${n.color}-text)` : n.variable ? `var(${n.variable})` : n.color;
}
function _g(e, t) {
  return typeof e == "string" && e in t.fontSizes ? `var(--mantine-font-size-${e})` : typeof e == "number" || typeof e == "string" ? D(e) : e;
}
function kg(e) {
  return e;
}
function Fg(e, t) {
  return typeof e == "string" && e in t.lineHeights ? `var(--mantine-line-height-${e})` : e;
}
function Bg(e) {
  return typeof e == "number" ? D(e) : e;
}
function jg(e, t) {
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
const yi = {
  color: Mg,
  fontSize: _g,
  spacing: jg,
  identity: kg,
  size: Bg,
  lineHeight: Fg
};
function xc(e) {
  return e.replace("(min-width: ", "").replace("em)", "");
}
function zg({
  media: e,
  ...t
}) {
  const r = Object.keys(e).sort((o, i) => Number(xc(o)) - Number(xc(i))).map((o) => ({ query: o, styles: e[o] }));
  return { ...t, media: r };
}
function Vg(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.keys(e);
  return !(t.length === 1 && t[0] === "base");
}
function Wg(e) {
  return typeof e == "object" && e !== null ? "base" in e ? e.base : void 0 : e;
}
function Gg(e) {
  return typeof e == "object" && e !== null ? mt(e).filter((t) => t !== "base") : [];
}
function Hg(e, t) {
  return typeof e == "object" && e !== null && t in e ? e[t] : e;
}
function Ug({
  styleProps: e,
  data: t,
  theme: n
}) {
  return zg(
    mt(e).reduce(
      (r, o) => {
        if (o === "hiddenFrom" || o === "visibleFrom")
          return r;
        const i = t[o], s = Array.isArray(i.property) ? i.property : [i.property], a = Wg(e[o]);
        if (!Vg(e[o]))
          return s.forEach((l) => {
            r.inlineStyles[l] = yi[i.type](a, n);
          }), r;
        r.hasResponsiveStyles = !0;
        const c = Gg(e[o]);
        return s.forEach((l) => {
          a && (r.styles[l] = yi[i.type](a, n)), c.forEach((u) => {
            const d = `(min-width: ${n.breakpoints[u]})`;
            r.media[d] = {
              ...r.media[d],
              [l]: yi[i.type](
                Hg(e[o], u),
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
function qg() {
  return `__m__-${su().replace(/:/g, "")}`;
}
function Ds(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...Ds(r, t) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function Ou(e) {
  return e.startsWith("data-") ? e : `data-${e}`;
}
function Kg(e) {
  return Object.keys(e).reduce((t, n) => {
    const r = e[n];
    return r === void 0 || r === "" || r === !1 || r === null || (t[Ou(n)] = e[n]), t;
  }, {});
}
function Nu(e) {
  return e ? typeof e == "string" ? { [Ou(e)]: !0 } : Array.isArray(e) ? [...e].reduce(
    (t, n) => ({ ...t, ...Nu(n) }),
    {}
  ) : Kg(e) : null;
}
function Yi(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (n, r) => ({ ...n, ...Yi(r, t) }),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function Yg({
  theme: e,
  style: t,
  vars: n,
  styleProps: r
}) {
  const o = Yi(t, e), i = Yi(n, e);
  return { ...o, ...i, ...r };
}
const $u = ie(
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
    renderRoot: d,
    ...f
  }, p) => {
    const m = vt(), g = e || "div", { styleProps: h, rest: w } = po(f), y = qg(), b = Ug({
      styleProps: h,
      theme: m,
      data: Lg
    }), v = {
      ref: p,
      style: Yg({
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
      "data-size": fu(s) ? void 0 : s || void 0,
      ...Nu(i),
      ...w
    };
    return /* @__PURE__ */ x.createElement(x.Fragment, null, b.hasResponsiveStyles && /* @__PURE__ */ x.createElement(
      Tg,
      {
        selector: `.${y}`,
        styles: b.styles,
        media: b.media
      }
    ), typeof d == "function" ? d(v) : /* @__PURE__ */ x.createElement(g, { ...v }));
  }
);
$u.displayName = "@mantine/core/Box";
const H = $u;
function Tu(e) {
  return e;
}
function q(e) {
  const t = ie(e);
  return t.extend = Tu, t;
}
function cn(e) {
  const t = ie(e);
  return t.extend = Tu, t;
}
const Xg = sn({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function rr() {
  return ut(Xg);
}
function Jg(e) {
  if (!e || typeof e == "string")
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function vi(e) {
  return e != null && e.current ? e.current.scrollHeight : "auto";
}
const $n = typeof window < "u" && window.requestAnimationFrame;
function Qg({
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
    hs(() => c(m));
  }, u = (m) => {
    l((g) => ({ ...g, ...m }));
  };
  function d(m) {
    return {
      transition: `height ${e || Jg(m)}ms ${t}`
    };
  }
  Mt(() => {
    typeof $n == "function" && $n(r ? () => {
      u({ willChange: "height", display: "block", overflow: "hidden" }), $n(() => {
        const m = vi(o);
        u({ ...d(m), height: m });
      });
    } : () => {
      const m = vi(o);
      u({ ...d(m), willChange: "height", height: m }), $n(() => u({ height: i, overflow: "hidden" }));
    });
  }, [r]);
  const f = (m) => {
    if (!(m.target !== o.current || m.propertyName !== "height"))
      if (r) {
        const g = vi(o);
        g === a.height ? l({}) : u({ height: g }), n();
      } else
        a.height === i && (l(s), n());
  };
  function p({ style: m = {}, refKey: g = "ref", ...h } = {}) {
    const w = h[g];
    return {
      "aria-hidden": !r,
      ...h,
      [g]: xu(o, w),
      onTransitionEnd: f,
      style: { boxSizing: "border-box", ...m, ...a }
    };
  }
  return p;
}
const Zg = {
  transitionDuration: 200,
  transitionTimingFunction: "ease",
  animateOpacity: !0
}, Lu = q((e, t) => {
  const {
    children: n,
    in: r,
    transitionDuration: o,
    transitionTimingFunction: i,
    style: s,
    onTransitionEnd: a,
    animateOpacity: c,
    ...l
  } = j("Collapse", Zg, e), u = vt(), d = Su(), p = (u.respectReducedMotion ? d : !1) ? 0 : o, m = Qg({
    opened: r,
    transitionDuration: p,
    transitionTimingFunction: i,
    onTransitionEnd: a
  });
  return p === 0 ? r ? /* @__PURE__ */ x.createElement(H, { ...l }, n) : null : /* @__PURE__ */ x.createElement(H, { ...m({ style: Ds(s, u), ref: t, ...l }) }, /* @__PURE__ */ x.createElement(
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
Lu.displayName = "@mantine/core/Collapse";
const [eh, et] = Wt(
  "ScrollArea.Root component was not found in tree"
);
function gn(e, t) {
  const n = Qt(t);
  nr(() => {
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
const th = x.forwardRef((e, t) => {
  const { style: n, ...r } = e, o = et(), [i, s] = x.useState(0), [a, c] = x.useState(0), l = !!(i && a);
  return gn(o.scrollbarX, () => {
    var d;
    const u = ((d = o.scrollbarX) == null ? void 0 : d.offsetHeight) || 0;
    o.onCornerHeightChange(u), c(u);
  }), gn(o.scrollbarY, () => {
    var d;
    const u = ((d = o.scrollbarY) == null ? void 0 : d.offsetWidth) || 0;
    o.onCornerWidthChange(u), s(u);
  }), l ? /* @__PURE__ */ x.createElement("div", { ...r, ref: t, style: { ...n, width: i, height: a } }) : null;
}), nh = x.forwardRef(
  (e, t) => {
    const n = et(), r = !!(n.scrollbarX && n.scrollbarY);
    return n.type !== "scroll" && r ? /* @__PURE__ */ x.createElement(th, { ...e, ref: t }) : null;
  }
), rh = {
  scrollHideDelay: 1e3,
  type: "hover"
}, Mu = ie((e, t) => {
  const n = j("ScrollAreaRoot", rh, e), { type: r, scrollHideDelay: o, scrollbars: i, ...s } = n, [a, c] = U(null), [l, u] = U(null), [d, f] = U(null), [p, m] = U(null), [g, h] = U(null), [w, y] = U(0), [b, v] = U(0), [S, C] = U(!1), [P, E] = U(!1), O = Oe(t, (T) => c(T));
  return /* @__PURE__ */ x.createElement(
    eh,
    {
      value: {
        type: r,
        scrollHideDelay: o,
        scrollArea: a,
        viewport: l,
        onViewportChange: u,
        content: d,
        onContentChange: f,
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
Mu.displayName = "@mantine/core/ScrollAreaRoot";
function _u(e, t) {
  const n = e / t;
  return Number.isNaN(n) ? 0 : n;
}
function mo(e) {
  const t = _u(e.viewport, e.content), n = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, r = (e.scrollbar.size - n) * t;
  return Math.max(r, 18);
}
function ku(e, t) {
  return (n) => {
    if (e[0] === e[1] || t[0] === t[1])
      return t[0];
    const r = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + r * (n - e[0]);
  };
}
function oh(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function Sc(e, t, n = "ltr") {
  const r = mo(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, i = t.scrollbar.size - o, s = t.content - t.viewport, a = i - r, c = n === "ltr" ? [0, s] : [s * -1, 0], l = oh(e, c);
  return ku([0, s], [0, a])(l);
}
function ih(e, t, n, r = "ltr") {
  const o = mo(n), i = o / 2, s = t || i, a = o - s, c = n.scrollbar.paddingStart + s, l = n.scrollbar.size - n.scrollbar.paddingEnd - a, u = n.content - n.viewport, d = r === "ltr" ? [0, u] : [u * -1, 0];
  return ku([c, l], d)(e);
}
function Fu(e, t) {
  return e > 0 && e < t;
}
function Br(e) {
  return e ? parseInt(e, 10) : 0;
}
function en(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return (r) => {
    e == null || e(r), (n === !1 || !r.defaultPrevented) && (t == null || t(r));
  };
}
const [sh, Bu] = Wt(
  "ScrollAreaScrollbar was not found in tree"
), ju = ie((e, t) => {
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
    ...d
  } = e, f = et(), [p, m] = x.useState(null), g = Oe(t, (E) => m(E)), h = x.useRef(null), w = x.useRef(""), { viewport: y } = f, b = n.content - n.viewport, v = Qt(l), S = Qt(a), C = fo(u, 10), P = (E) => {
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
  }, [y, p, b, v]), W(S, [n, S]), gn(p, C), gn(f.content, C), /* @__PURE__ */ x.createElement(
    sh,
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
        ...d,
        ref: g,
        style: { position: "absolute", ...d.style },
        onPointerDown: en(e.onPointerDown, (E) => {
          E.button === 0 && (E.target.setPointerCapture(E.pointerId), h.current = p.getBoundingClientRect(), w.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", P(E));
        }),
        onPointerMove: en(e.onPointerMove, P),
        onPointerUp: en(e.onPointerUp, (E) => {
          const O = E.target;
          O.hasPointerCapture(E.pointerId) && O.releasePointerCapture(E.pointerId), document.body.style.webkitUserSelect = w.current, h.current = null;
        })
      }
    )
  );
}), ah = ie(
  (e, t) => {
    const { sizes: n, onSizesChange: r, style: o, ...i } = e, s = et(), [a, c] = U(), l = z(null), u = Oe(t, l, s.onScrollbarXChange);
    return W(() => {
      l.current && c(getComputedStyle(l.current));
    }, [l]), /* @__PURE__ */ x.createElement(
      ju,
      {
        "data-orientation": "horizontal",
        ...i,
        ref: u,
        sizes: n,
        style: {
          ...o,
          "--sa-thumb-width": `${mo(n)}px`
        },
        onThumbPointerDown: (d) => e.onThumbPointerDown(d.x),
        onDragScroll: (d) => e.onDragScroll(d.x),
        onWheelScroll: (d, f) => {
          if (s.viewport) {
            const p = s.viewport.scrollLeft + d.deltaX;
            e.onWheelScroll(p), Fu(p, f) && d.preventDefault();
          }
        },
        onResize: () => {
          l.current && s.viewport && a && r({
            content: s.viewport.scrollWidth,
            viewport: s.viewport.offsetWidth,
            scrollbar: {
              size: l.current.clientWidth,
              paddingStart: Br(a.paddingLeft),
              paddingEnd: Br(a.paddingRight)
            }
          });
        }
      }
    );
  }
), ch = ie(
  (e, t) => {
    const { sizes: n, onSizesChange: r, style: o, ...i } = e, s = et(), [a, c] = x.useState(), l = z(null), u = Oe(t, l, s.onScrollbarYChange);
    return W(() => {
      l.current && c(getComputedStyle(l.current));
    }, [l]), /* @__PURE__ */ x.createElement(
      ju,
      {
        ...i,
        "data-orientation": "vertical",
        ref: u,
        sizes: n,
        style: {
          "--sa-thumb-height": `${mo(n)}px`,
          ...o
        },
        onThumbPointerDown: (d) => e.onThumbPointerDown(d.y),
        onDragScroll: (d) => e.onDragScroll(d.y),
        onWheelScroll: (d, f) => {
          if (s.viewport) {
            const p = s.viewport.scrollTop + d.deltaY;
            e.onWheelScroll(p), Fu(p, f) && d.preventDefault();
          }
        },
        onResize: () => {
          l.current && s.viewport && a && r({
            content: s.viewport.scrollHeight,
            viewport: s.viewport.offsetHeight,
            scrollbar: {
              size: l.current.clientHeight,
              paddingStart: Br(a.paddingTop),
              paddingEnd: Br(a.paddingBottom)
            }
          });
        }
      }
    );
  }
), Rs = ie((e, t) => {
  const { orientation: n = "vertical", ...r } = e, { dir: o } = rr(), i = et(), s = z(null), a = z(0), [c, l] = U({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), u = _u(c.viewport, c.content), d = {
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
  }, f = (p, m) => ih(p, a.current, c, m);
  return n === "horizontal" ? /* @__PURE__ */ x.createElement(
    ah,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (i.viewport && s.current) {
          const p = i.viewport.scrollLeft, m = Sc(p, c, o);
          s.current.style.transform = `translate3d(${m}px, 0, 0)`;
        }
      },
      onWheelScroll: (p) => {
        i.viewport && (i.viewport.scrollLeft = p);
      },
      onDragScroll: (p) => {
        i.viewport && (i.viewport.scrollLeft = f(p, o));
      }
    }
  ) : n === "vertical" ? /* @__PURE__ */ x.createElement(
    ch,
    {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (i.viewport && s.current) {
          const p = i.viewport.scrollTop, m = Sc(p, c);
          s.current.style.transform = `translate3d(0, ${m}px, 0)`;
        }
      },
      onWheelScroll: (p) => {
        i.viewport && (i.viewport.scrollTop = p);
      },
      onDragScroll: (p) => {
        i.viewport && (i.viewport.scrollTop = f(p));
      }
    }
  ) : null;
}), zu = ie(
  (e, t) => {
    const n = et(), { forceMount: r, ...o } = e, [i, s] = U(!1), a = e.orientation === "horizontal", c = fo(() => {
      if (n.viewport) {
        const l = n.viewport.offsetWidth < n.viewport.scrollWidth, u = n.viewport.offsetHeight < n.viewport.scrollHeight;
        s(a ? l : u);
      }
    }, 10);
    return gn(n.viewport, c), gn(n.content, c), r || i ? /* @__PURE__ */ x.createElement(
      Rs,
      {
        "data-state": i ? "visible" : "hidden",
        ...o,
        ref: t
      }
    ) : null;
  }
), lh = ie(
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
      zu,
      {
        "data-state": i ? "visible" : "hidden",
        ...r,
        ref: t
      }
    ) : null;
  }
), uh = ie(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = et(), i = e.orientation === "horizontal", [s, a] = U("hidden"), c = fo(() => a("idle"), 100);
    return W(() => {
      if (s === "idle") {
        const l = window.setTimeout(() => a("hidden"), o.scrollHideDelay);
        return () => window.clearTimeout(l);
      }
    }, [s, o.scrollHideDelay]), W(() => {
      const { viewport: l } = o, u = i ? "scrollLeft" : "scrollTop";
      if (l) {
        let d = l[u];
        const f = () => {
          const p = l[u];
          d !== p && (a("scrolling"), c()), d = p;
        };
        return l.addEventListener("scroll", f), () => l.removeEventListener("scroll", f);
      }
    }, [o.viewport, i, c]), n || s !== "hidden" ? /* @__PURE__ */ x.createElement(
      Rs,
      {
        "data-state": s === "hidden" ? "hidden" : "visible",
        ...r,
        ref: t,
        onPointerEnter: en(e.onPointerEnter, () => a("interacting")),
        onPointerLeave: en(e.onPointerLeave, () => a("idle"))
      }
    ) : null;
  }
), Cc = x.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = et(), { onScrollbarXEnabledChange: i, onScrollbarYEnabledChange: s } = o, a = e.orientation === "horizontal";
    return x.useEffect(() => (a ? i(!0) : s(!0), () => {
      a ? i(!1) : s(!1);
    }), [a, i, s]), o.type === "hover" ? /* @__PURE__ */ x.createElement(lh, { ...r, ref: t, forceMount: n }) : o.type === "scroll" ? /* @__PURE__ */ x.createElement(uh, { ...r, ref: t, forceMount: n }) : o.type === "auto" ? /* @__PURE__ */ x.createElement(zu, { ...r, ref: t, forceMount: n }) : o.type === "always" ? /* @__PURE__ */ x.createElement(Rs, { ...r, ref: t }) : null;
  }
);
function dh(e, t = () => {
}) {
  let n = { left: e.scrollLeft, top: e.scrollTop }, r = 0;
  return function o() {
    const i = { left: e.scrollLeft, top: e.scrollTop }, s = n.left !== i.left, a = n.top !== i.top;
    (s || a) && t(), n = i, r = window.requestAnimationFrame(o);
  }(), () => window.cancelAnimationFrame(r);
}
const fh = ie((e, t) => {
  const { style: n, ...r } = e, o = et(), i = Bu(), { onThumbPositionChange: s } = i, a = Oe(t, (u) => i.onThumbChange(u)), c = z(), l = fo(() => {
    c.current && (c.current(), c.current = void 0);
  }, 100);
  return W(() => {
    const { viewport: u } = o;
    if (u) {
      const d = () => {
        if (l(), !c.current) {
          const f = dh(u, s);
          c.current = f, s();
        }
      };
      return s(), u.addEventListener("scroll", d), () => u.removeEventListener("scroll", d);
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
      onPointerDownCapture: en(e.onPointerDownCapture, (u) => {
        const f = u.target.getBoundingClientRect(), p = u.clientX - f.left, m = u.clientY - f.top;
        i.onThumbPointerDown({ x: p, y: m });
      }),
      onPointerUp: en(e.onPointerUp, i.onThumbPointerUp)
    }
  );
}), Ec = x.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = Bu();
    return n || o.hasThumb ? /* @__PURE__ */ x.createElement(fh, { ref: t, ...r }) : null;
  }
), Vu = ie(
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
Vu.displayName = "@mantine/core/ScrollAreaViewport";
var Is = { root: "m-d57069b5", viewport: "m-c0783ff9", viewportInner: "m-f8f631dd", scrollbar: "m-c44ba933", thumb: "m-d8b5e363", corner: "m-21657268" };
const Wu = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
}, ph = (e, { scrollbarSize: t }) => ({
  root: {
    "--scrollarea-scrollbar-size": D(t)
  }
}), or = q((e, t) => {
  const n = j("ScrollArea", Wu, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    scrollbarSize: c,
    vars: l,
    type: u,
    scrollHideDelay: d,
    viewportProps: f,
    viewportRef: p,
    onScrollPositionChange: m,
    children: g,
    offsetScrollbars: h,
    scrollbars: w,
    ...y
  } = n, [b, v] = U(!1), S = te({
    name: "ScrollArea",
    props: n,
    classes: Is,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: l,
    varsResolver: ph
  });
  return /* @__PURE__ */ x.createElement(
    Mu,
    {
      type: u === "never" ? "always" : u,
      scrollHideDelay: d,
      ref: t,
      scrollbars: w,
      ...S("root"),
      ...y
    },
    /* @__PURE__ */ x.createElement(
      Vu,
      {
        ...f,
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
      Cc,
      {
        ...S("scrollbar"),
        orientation: "horizontal",
        "data-hidden": u === "never" || void 0,
        forceMount: !0,
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1)
      },
      /* @__PURE__ */ x.createElement(Ec, { ...S("thumb") })
    ),
    (w === "xy" || w === "y") && /* @__PURE__ */ x.createElement(
      Cc,
      {
        ...S("scrollbar"),
        orientation: "vertical",
        "data-hidden": u === "never" || void 0,
        forceMount: !0,
        onMouseEnter: () => v(!0),
        onMouseLeave: () => v(!1)
      },
      /* @__PURE__ */ x.createElement(Ec, { ...S("thumb") })
    ),
    /* @__PURE__ */ x.createElement(
      nh,
      {
        ...S("corner"),
        "data-hovered": b || void 0,
        "data-hidden": u === "never" || void 0
      }
    )
  );
});
or.displayName = "@mantine/core/ScrollArea";
const As = q((e, t) => {
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
    onScrollPositionChange: d,
    unstyled: f,
    variant: p,
    viewportProps: m,
    scrollbars: g,
    style: h,
    vars: w,
    ...y
  } = j("ScrollAreaAutosize", Wu, e);
  return /* @__PURE__ */ x.createElement(H, { ...y, ref: t, style: [{ display: "flex" }, h] }, /* @__PURE__ */ x.createElement(H, { style: { display: "flex", flexDirection: "column", flex: 1 } }, /* @__PURE__ */ x.createElement(
    or,
    {
      classNames: r,
      styles: o,
      scrollHideDelay: s,
      scrollbarSize: i,
      type: a,
      dir: c,
      offsetScrollbars: l,
      viewportRef: u,
      onScrollPositionChange: d,
      unstyled: f,
      variant: p,
      viewportProps: m,
      vars: w,
      scrollbars: g
    },
    n
  )));
});
or.classes = Is;
As.displayName = "@mantine/core/ScrollAreaAutosize";
As.classes = Is;
or.Autosize = As;
var Gu = { root: "m-87cf2631" };
const mh = {
  __staticSelector: "UnstyledButton"
}, En = cn(
  (e, t) => {
    const n = j("UnstyledButton", mh, e), {
      className: r,
      component: o = "button",
      __staticSelector: i,
      unstyled: s,
      classNames: a,
      styles: c,
      style: l,
      ...u
    } = n, d = te({
      name: i,
      props: n,
      classes: Gu,
      className: r,
      style: l,
      classNames: a,
      styles: c,
      unstyled: s
    });
    return /* @__PURE__ */ x.createElement(
      H,
      {
        ...d("root", { focusable: !0 }),
        component: o,
        ref: t,
        type: o === "button" ? "button" : void 0,
        ...u
      }
    );
  }
);
En.classes = Gu;
En.displayName = "@mantine/core/UnstyledButton";
const ct = Math.min, Se = Math.max, jr = Math.round, wr = Math.floor, Ft = (e) => ({
  x: e,
  y: e
}), gh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, hh = {
  start: "end",
  end: "start"
};
function Xi(e, t, n) {
  return Se(e, ct(t, n));
}
function Ct(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function lt(e) {
  return e.split("-")[0];
}
function Pn(e) {
  return e.split("-")[1];
}
function Os(e) {
  return e === "x" ? "y" : "x";
}
function Ns(e) {
  return e === "y" ? "height" : "width";
}
function ln(e) {
  return ["top", "bottom"].includes(lt(e)) ? "y" : "x";
}
function $s(e) {
  return Os(ln(e));
}
function bh(e, t, n) {
  n === void 0 && (n = !1);
  const r = Pn(e), o = $s(e), i = Ns(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = zr(s)), [s, zr(s)];
}
function yh(e) {
  const t = zr(e);
  return [Ji(e), t, Ji(t)];
}
function Ji(e) {
  return e.replace(/start|end/g, (t) => hh[t]);
}
function vh(e, t, n) {
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
function wh(e, t, n, r) {
  const o = Pn(e);
  let i = vh(lt(e), n === "start", r);
  return o && (i = i.map((s) => s + "-" + o), t && (i = i.concat(i.map(Ji)))), i;
}
function zr(e) {
  return e.replace(/left|right|bottom|top/g, (t) => gh[t]);
}
function xh(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ts(e) {
  return typeof e != "number" ? xh(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function hn(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function Pc(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const i = ln(t), s = $s(t), a = Ns(s), c = lt(t), l = i === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, f = r[a] / 2 - o[a] / 2;
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
        y: d
      };
      break;
    case "left":
      p = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      p = {
        x: r.x,
        y: r.y
      };
  }
  switch (Pn(t)) {
    case "start":
      p[s] -= f * (n && l ? -1 : 1);
      break;
    case "end":
      p[s] += f * (n && l ? -1 : 1);
      break;
  }
  return p;
}
const Sh = async (e, t, n) => {
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
    y: d
  } = Pc(l, r, c), f = r, p = {}, m = 0;
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
      y: d,
      initialPlacement: r,
      placement: f,
      strategy: o,
      middlewareData: p,
      rects: l,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (u = y ?? u, d = b ?? d, p = {
      ...p,
      [h]: {
        ...p[h],
        ...v
      }
    }, S && m <= 50) {
      m++, typeof S == "object" && (S.placement && (f = S.placement), S.rects && (l = S.rects === !0 ? await s.getElementRects({
        reference: e,
        floating: t,
        strategy: o
      }) : S.rects), {
        x: u,
        y: d
      } = Pc(l, f, c)), g = -1;
      continue;
    }
  }
  return {
    x: u,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: p
  };
};
async function Ls(e, t) {
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
    elementContext: d = "floating",
    altBoundary: f = !1,
    padding: p = 0
  } = Ct(t, e), m = Ts(p), h = a[f ? d === "floating" ? "reference" : "floating" : d], w = hn(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(h))) == null || n ? h : h.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), y = d === "floating" ? {
    ...s.floating,
    x: r,
    y: o
  } : s.reference, b = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), v = await (i.isElement == null ? void 0 : i.isElement(b)) ? await (i.getScale == null ? void 0 : i.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = hn(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
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
const Dc = (e) => ({
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
    const d = Ts(u), f = {
      x: n,
      y: r
    }, p = $s(o), m = Ns(p), g = await s.getDimensions(l), h = p === "y", w = h ? "top" : "left", y = h ? "bottom" : "right", b = h ? "clientHeight" : "clientWidth", v = i.reference[m] + i.reference[p] - f[p] - i.floating[m], S = f[p] - i.reference[p], C = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let P = C ? C[b] : 0;
    (!P || !await (s.isElement == null ? void 0 : s.isElement(C))) && (P = a.floating[b] || i.floating[m]);
    const E = v / 2 - S / 2, O = P / 2 - g[m] / 2 - 1, T = ct(d[w], O), $ = ct(d[y], O), M = T, _ = P - g[m] - $, A = P / 2 - g[m] / 2 + E, L = Xi(M, A, _), I = !c.arrow && Pn(o) != null && A != L && i.reference[m] / 2 - (A < M ? T : $) - g[m] / 2 < 0, B = I ? A < M ? A - M : A - _ : 0;
    return {
      [p]: f[p] + B,
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
}), Hu = function(e) {
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
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: p = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: g = !0,
        ...h
      } = Ct(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const w = lt(o), y = lt(a) === a, b = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), v = f || (y || !g ? [zr(a)] : yh(a));
      !f && m !== "none" && v.push(...wh(a, g, m, b));
      const S = [a, ...v], C = await Ls(t, h), P = [];
      let E = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (u && P.push(C[w]), d) {
        const M = bh(o, s, b);
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
function Uu(e) {
  const t = ct(...e.map((i) => i.left)), n = ct(...e.map((i) => i.top)), r = Se(...e.map((i) => i.right)), o = Se(...e.map((i) => i.bottom));
  return {
    x: t,
    y: n,
    width: r - t,
    height: o - n
  };
}
function Ch(e) {
  const t = e.slice().sort((o, i) => o.y - i.y), n = [];
  let r = null;
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    !r || i.y - r.y > r.height / 2 ? n.push([i]) : n[n.length - 1].push(i), r = i;
  }
  return n.map((o) => hn(Uu(o)));
}
const qu = function(e) {
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
      } = Ct(e, t), u = Array.from(await (i.getClientRects == null ? void 0 : i.getClientRects(r.reference)) || []), d = Ch(u), f = hn(Uu(u)), p = Ts(a);
      function m() {
        if (d.length === 2 && d[0].left > d[1].right && c != null && l != null)
          return d.find((h) => c > h.left - p.left && c < h.right + p.right && l > h.top - p.top && l < h.bottom + p.bottom) || f;
        if (d.length >= 2) {
          if (ln(n) === "y") {
            const T = d[0], $ = d[d.length - 1], M = lt(n) === "top", _ = T.top, A = $.bottom, L = M ? T.left : $.left, I = M ? T.right : $.right, B = I - L, N = A - _;
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
          const h = lt(n) === "left", w = Se(...d.map((T) => T.right)), y = ct(...d.map((T) => T.left)), b = d.filter((T) => h ? T.left === y : T.right === w), v = b[0].top, S = b[b.length - 1].bottom, C = y, P = w, E = P - C, O = S - v;
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
        return f;
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
async function Eh(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = lt(n), a = Pn(n), c = ln(n) === "y", l = ["left", "top"].includes(s) ? -1 : 1, u = i && c ? -1 : 1, d = Ct(t, e);
  let {
    mainAxis: f,
    crossAxis: p,
    alignmentAxis: m
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...d
  };
  return a && typeof m == "number" && (p = a === "end" ? m * -1 : m), c ? {
    x: p * u,
    y: f * l
  } : {
    x: f * l,
    y: p * u
  };
}
const Ku = function(e) {
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
      } = t, c = await Eh(t, e);
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
}, Ms = function(e) {
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
      }, u = await Ls(t, c), d = ln(lt(o)), f = Os(d);
      let p = l[f], m = l[d];
      if (i) {
        const h = f === "y" ? "top" : "left", w = f === "y" ? "bottom" : "right", y = p + u[h], b = p - u[w];
        p = Xi(y, p, b);
      }
      if (s) {
        const h = d === "y" ? "top" : "left", w = d === "y" ? "bottom" : "right", y = m + u[h], b = m - u[w];
        m = Xi(y, m, b);
      }
      const g = a.fn({
        ...t,
        [f]: p,
        [d]: m
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
}, Ph = function(e) {
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
      }, d = ln(o), f = Os(d);
      let p = u[f], m = u[d];
      const g = Ct(a, t), h = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (c) {
        const b = f === "y" ? "height" : "width", v = i.reference[f] - i.floating[b] + h.mainAxis, S = i.reference[f] + i.reference[b] - h.mainAxis;
        p < v ? p = v : p > S && (p = S);
      }
      if (l) {
        var w, y;
        const b = f === "y" ? "width" : "height", v = ["top", "left"].includes(lt(o)), S = i.reference[d] - i.floating[b] + (v && ((w = s.offset) == null ? void 0 : w[d]) || 0) + (v ? 0 : h.crossAxis), C = i.reference[d] + i.reference[b] + (v ? 0 : ((y = s.offset) == null ? void 0 : y[d]) || 0) - (v ? h.crossAxis : 0);
        m < S ? m = S : m > C && (m = C);
      }
      return {
        [f]: p,
        [d]: m
      };
    }
  };
}, Dh = function(e) {
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
      } = Ct(e, t), c = await Ls(t, a), l = lt(n), u = Pn(n), d = ln(n) === "y", {
        width: f,
        height: p
      } = r.floating;
      let m, g;
      l === "top" || l === "bottom" ? (m = l, g = u === (await (o.isRTL == null ? void 0 : o.isRTL(i.floating)) ? "start" : "end") ? "left" : "right") : (g = l, m = u === "end" ? "top" : "bottom");
      const h = p - c[m], w = f - c[g], y = !t.middlewareData.shift;
      let b = h, v = w;
      if (d) {
        const C = f - c.left - c.right;
        v = u || y ? ct(w, C) : C;
      } else {
        const C = p - c.top - c.bottom;
        b = u || y ? ct(h, C) : C;
      }
      if (y && !u) {
        const C = Se(c.left, 0), P = Se(c.right, 0), E = Se(c.top, 0), O = Se(c.bottom, 0);
        d ? v = f - 2 * (C !== 0 || P !== 0 ? C + P : Se(c.left, c.right)) : b = p - 2 * (E !== 0 || O !== 0 ? E + O : Se(c.top, c.bottom));
      }
      await s({
        ...t,
        availableWidth: v,
        availableHeight: b
      });
      const S = await o.getDimensions(i.floating);
      return f !== S.width || p !== S.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Bt(e) {
  return Yu(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function je(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Rt(e) {
  var t;
  return (t = (Yu(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Yu(e) {
  return e instanceof Node || e instanceof je(e).Node;
}
function Et(e) {
  return e instanceof Element || e instanceof je(e).Element;
}
function ht(e) {
  return e instanceof HTMLElement || e instanceof je(e).HTMLElement;
}
function Rc(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof je(e).ShadowRoot;
}
function ir(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Qe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function Rh(e) {
  return ["table", "td", "th"].includes(Bt(e));
}
function _s(e) {
  const t = ks(), n = Qe(e);
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Ih(e) {
  let t = bn(e);
  for (; ht(t) && !go(t); ) {
    if (_s(t))
      return t;
    t = bn(t);
  }
  return null;
}
function ks() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function go(e) {
  return ["html", "body", "#document"].includes(Bt(e));
}
function Qe(e) {
  return je(e).getComputedStyle(e);
}
function ho(e) {
  return Et(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function bn(e) {
  if (Bt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Rc(e) && e.host || // Fallback.
    Rt(e)
  );
  return Rc(t) ? t.host : t;
}
function Xu(e) {
  const t = bn(e);
  return go(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ht(t) && ir(t) ? t : Xu(t);
}
function wt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Xu(e), i = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = je(o);
  return i ? t.concat(s, s.visualViewport || [], ir(o) ? o : [], s.frameElement && n ? wt(s.frameElement) : []) : t.concat(o, wt(o, [], n));
}
function Ju(e) {
  const t = Qe(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ht(e), i = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, a = jr(n) !== i || jr(r) !== s;
  return a && (n = i, r = s), {
    width: n,
    height: r,
    $: a
  };
}
function Fs(e) {
  return Et(e) ? e : e.contextElement;
}
function mn(e) {
  const t = Fs(e);
  if (!ht(t))
    return Ft(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: i
  } = Ju(t);
  let s = (i ? jr(n.width) : n.width) / r, a = (i ? jr(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
const Ah = /* @__PURE__ */ Ft(0);
function Qu(e) {
  const t = je(e);
  return !ks() || !t.visualViewport ? Ah : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Oh(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== je(e) ? !1 : t;
}
function nn(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), i = Fs(e);
  let s = Ft(1);
  t && (r ? Et(r) && (s = mn(r)) : s = mn(e));
  const a = Oh(i, n, r) ? Qu(i) : Ft(0);
  let c = (o.left + a.x) / s.x, l = (o.top + a.y) / s.y, u = o.width / s.x, d = o.height / s.y;
  if (i) {
    const f = je(i), p = r && Et(r) ? je(r) : r;
    let m = f.frameElement;
    for (; m && r && p !== f; ) {
      const g = mn(m), h = m.getBoundingClientRect(), w = Qe(m), y = h.left + (m.clientLeft + parseFloat(w.paddingLeft)) * g.x, b = h.top + (m.clientTop + parseFloat(w.paddingTop)) * g.y;
      c *= g.x, l *= g.y, u *= g.x, d *= g.y, c += y, l += b, m = je(m).frameElement;
    }
  }
  return hn({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function Nh(e) {
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
  if ((o || !o && r !== "fixed") && ((Bt(n) !== "body" || ir(i)) && (s = ho(n)), ht(n))) {
    const l = nn(n);
    a = mn(n), c.x = l.x + n.clientLeft, c.y = l.y + n.clientTop;
  }
  return {
    width: t.width * a.x,
    height: t.height * a.y,
    x: t.x * a.x - s.scrollLeft * a.x + c.x,
    y: t.y * a.y - s.scrollTop * a.y + c.y
  };
}
function $h(e) {
  return Array.from(e.getClientRects());
}
function Zu(e) {
  return nn(Rt(e)).left + ho(e).scrollLeft;
}
function Th(e) {
  const t = Rt(e), n = ho(e), r = e.ownerDocument.body, o = Se(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = Se(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + Zu(e);
  const a = -n.scrollTop;
  return Qe(r).direction === "rtl" && (s += Se(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: i,
    x: s,
    y: a
  };
}
function Lh(e, t) {
  const n = je(e), r = Rt(e), o = n.visualViewport;
  let i = r.clientWidth, s = r.clientHeight, a = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    const l = ks();
    (!l || l && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a,
    y: c
  };
}
function Mh(e, t) {
  const n = nn(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, i = ht(e) ? mn(e) : Ft(1), s = e.clientWidth * i.x, a = e.clientHeight * i.y, c = o * i.x, l = r * i.y;
  return {
    width: s,
    height: a,
    x: c,
    y: l
  };
}
function Ic(e, t, n) {
  let r;
  if (t === "viewport")
    r = Lh(e, n);
  else if (t === "document")
    r = Th(Rt(e));
  else if (Et(t))
    r = Mh(t, n);
  else {
    const o = Qu(e);
    r = {
      ...t,
      x: t.x - o.x,
      y: t.y - o.y
    };
  }
  return hn(r);
}
function ed(e, t) {
  const n = bn(e);
  return n === t || !Et(n) || go(n) ? !1 : Qe(n).position === "fixed" || ed(n, t);
}
function _h(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = wt(e, [], !1).filter((a) => Et(a) && Bt(a) !== "body"), o = null;
  const i = Qe(e).position === "fixed";
  let s = i ? bn(e) : e;
  for (; Et(s) && !go(s); ) {
    const a = Qe(s), c = _s(s);
    !c && a.position === "fixed" && (o = null), (i ? !c && !o : !c && a.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || ir(s) && !c && ed(e, s)) ? r = r.filter((u) => u !== s) : o = a, s = bn(s);
  }
  return t.set(e, r), r;
}
function kh(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? _h(t, this._c) : [].concat(n), r], a = s[0], c = s.reduce((l, u) => {
    const d = Ic(t, u, o);
    return l.top = Se(d.top, l.top), l.right = ct(d.right, l.right), l.bottom = ct(d.bottom, l.bottom), l.left = Se(d.left, l.left), l;
  }, Ic(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Fh(e) {
  return Ju(e);
}
function Bh(e, t, n) {
  const r = ht(t), o = Rt(t), i = n === "fixed", s = nn(e, !0, i, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Ft(0);
  if (r || !r && !i)
    if ((Bt(t) !== "body" || ir(o)) && (a = ho(t)), r) {
      const l = nn(t, !0, i, t);
      c.x = l.x + t.clientLeft, c.y = l.y + t.clientTop;
    } else
      o && (c.x = Zu(o));
  return {
    x: s.left + a.scrollLeft - c.x,
    y: s.top + a.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Ac(e, t) {
  return !ht(e) || Qe(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function td(e, t) {
  const n = je(e);
  if (!ht(e))
    return n;
  let r = Ac(e, t);
  for (; r && Rh(r) && Qe(r).position === "static"; )
    r = Ac(r, t);
  return r && (Bt(r) === "html" || Bt(r) === "body" && Qe(r).position === "static" && !_s(r)) ? n : r || Ih(e) || n;
}
const jh = async function(e) {
  let {
    reference: t,
    floating: n,
    strategy: r
  } = e;
  const o = this.getOffsetParent || td, i = this.getDimensions;
  return {
    reference: Bh(t, await o(n), r),
    floating: {
      x: 0,
      y: 0,
      ...await i(n)
    }
  };
};
function zh(e) {
  return Qe(e).direction === "rtl";
}
const Vh = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Nh,
  getDocumentElement: Rt,
  getClippingRect: kh,
  getOffsetParent: td,
  getElementRects: jh,
  getClientRects: $h,
  getDimensions: Fh,
  getScale: mn,
  isElement: Et,
  isRTL: zh
};
function Wh(e, t) {
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
      width: d,
      height: f
    } = e.getBoundingClientRect();
    if (a || t(), !d || !f)
      return;
    const p = wr(u), m = wr(o.clientWidth - (l + d)), g = wr(o.clientHeight - (u + f)), h = wr(l), y = {
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
function Gh(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Fs(e), u = o || i ? [...l ? wt(l) : [], ...wt(t)] : [];
  u.forEach((w) => {
    o && w.addEventListener("scroll", n, {
      passive: !0
    }), i && w.addEventListener("resize", n);
  });
  const d = l && a ? Wh(l, n) : null;
  let f = -1, p = null;
  s && (p = new ResizeObserver((w) => {
    let [y] = w;
    y && y.target === l && p && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
      p && p.observe(t);
    })), n();
  }), l && !c && p.observe(l), p.observe(t));
  let m, g = c ? nn(e) : null;
  c && h();
  function h() {
    const w = nn(e);
    g && (w.x !== g.x || w.y !== g.y || w.width !== g.width || w.height !== g.height) && n(), g = w, m = requestAnimationFrame(h);
  }
  return n(), () => {
    u.forEach((w) => {
      o && w.removeEventListener("scroll", n), i && w.removeEventListener("resize", n);
    }), d && d(), p && p.disconnect(), p = null, c && cancelAnimationFrame(m);
  };
}
const Hh = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Vh,
    ...n
  }, i = {
    ...o.platform,
    _c: r
  };
  return Sh(e, t, {
    ...o,
    platform: i
  });
}, nd = (e) => {
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
      return r && t(r) ? r.current != null ? Dc({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Dc({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
};
var Ar = typeof document < "u" ? co : W;
function Vr(e, t) {
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
        if (!Vr(e[r], t[r]))
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
      if (!(i === "_owner" && e.$$typeof) && !Vr(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function rd(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Oc(e, t) {
  const n = rd(e);
  return Math.round(t * n) / n;
}
function Nc(e) {
  const t = R.useRef(e);
  return Ar(() => {
    t.current = e;
  }), t;
}
function Uh(e) {
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
  } = e, [u, d] = R.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [f, p] = R.useState(r);
  Vr(f, r) || p(r);
  const [m, g] = R.useState(null), [h, w] = R.useState(null), y = R.useCallback((I) => {
    I != C.current && (C.current = I, g(I));
  }, [g]), b = R.useCallback((I) => {
    I !== P.current && (P.current = I, w(I));
  }, [w]), v = i || m, S = s || h, C = R.useRef(null), P = R.useRef(null), E = R.useRef(u), O = Nc(c), T = Nc(o), $ = R.useCallback(() => {
    if (!C.current || !P.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: f
    };
    T.current && (I.platform = T.current), Hh(C.current, P.current, I).then((B) => {
      const N = {
        ...B,
        isPositioned: !0
      };
      M.current && !Vr(E.current, N) && (E.current = N, gm.flushSync(() => {
        d(N);
      }));
    });
  }, [f, t, n, T]);
  Ar(() => {
    l === !1 && E.current.isPositioned && (E.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [l]);
  const M = R.useRef(!1);
  Ar(() => (M.current = !0, () => {
    M.current = !1;
  }), []), Ar(() => {
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
    const B = Oc(A.floating, u.x), N = Oc(A.floating, u.y);
    return a ? {
      ...I,
      transform: "translate(" + B + "px, " + N + "px)",
      ...rd(A.floating) >= 1.5 && {
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
var xt = typeof document < "u" ? co : W;
let wi = !1, qh = 0;
const $c = () => "floating-ui-" + qh++;
function Kh() {
  const [e, t] = R.useState(() => wi ? $c() : void 0);
  return xt(() => {
    e == null && t($c());
  }, []), R.useEffect(() => {
    wi || (wi = !0);
  }, []), e;
}
const Yh = R[/* @__PURE__ */ "useId".toString()], od = Yh || Kh;
function Xh() {
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
const Jh = /* @__PURE__ */ R.createContext(null), Qh = /* @__PURE__ */ R.createContext(null), id = () => {
  var e;
  return ((e = R.useContext(Jh)) == null ? void 0 : e.id) || null;
}, Bs = () => R.useContext(Qh);
function Nt(e) {
  return (e == null ? void 0 : e.ownerDocument) || document;
}
function Zh() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function eb() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((t) => {
    let {
      brand: n,
      version: r
    } = t;
    return n + "/" + r;
  }).join(" ") : navigator.userAgent;
}
function bo(e) {
  return Nt(e).defaultView || window;
}
function ft(e) {
  return e ? e instanceof Element || e instanceof bo(e).Element : !1;
}
function sd(e) {
  return e ? e instanceof HTMLElement || e instanceof bo(e).HTMLElement : !1;
}
function tb(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = bo(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function nb(e) {
  if (e.mozInputSource === 0 && e.isTrusted)
    return !0;
  const t = /Android/i;
  return (t.test(Zh()) || t.test(eb())) && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function rb(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType !== "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0;
}
function ad(e, t) {
  const n = ["mouse", "pen"];
  return t || n.push("", void 0), n.includes(e);
}
function ob(e) {
  return "nativeEvent" in e;
}
function Qi(e, t) {
  if (!e || !t)
    return !1;
  const n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && tb(n)) {
    let r = t;
    for (; r; ) {
      if (e === r)
        return !0;
      r = r.parentNode || r.host;
    }
  }
  return !1;
}
function cd(e) {
  return "data-floating-ui-" + e;
}
function Tc(e) {
  const t = z(e);
  return xt(() => {
    t.current = e;
  }), t;
}
const Lc = /* @__PURE__ */ cd("safe-polygon");
function Or(e, t, n) {
  return n && !ad(n) ? 0 : typeof e == "number" ? e : e == null ? void 0 : e[t];
}
function ib(e, t) {
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
    handleClose: d = null,
    mouseOnly: f = !1,
    restMs: p = 0,
    move: m = !0
  } = t, g = Bs(), h = id(), w = Tc(d), y = Tc(u), b = R.useRef(), v = R.useRef(), S = R.useRef(), C = R.useRef(), P = R.useRef(!0), E = R.useRef(!1), O = R.useRef(() => {
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
    const I = Or(y.current, "close", b.current);
    I && !S.current ? (clearTimeout(v.current), v.current = setTimeout(() => r(!1, A), I)) : L && (clearTimeout(v.current), r(!1, A));
  }, [y, r]), M = R.useCallback(() => {
    O.current(), S.current = void 0;
  }, []), _ = R.useCallback(() => {
    if (E.current) {
      const A = Nt(c.floating.current).body;
      A.style.pointerEvents = "", A.removeAttribute(Lc), E.current = !1;
    }
  }, [c]);
  return R.useEffect(() => {
    if (!l)
      return;
    function A() {
      return o.current.openEvent ? ["click", "mousedown"].includes(o.current.openEvent.type) : !1;
    }
    function L(N) {
      if (clearTimeout(v.current), P.current = !1, f && !ad(b.current) || p > 0 && Or(y.current, "open") === 0)
        return;
      const G = Or(y.current, "open", b.current);
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
      (b.current === "touch" ? !Qi(a, N.relatedTarget) : !0) && $(N);
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
  }, [s, a, l, e, f, p, m, $, M, _, r, n, g, y, w, o]), xt(() => {
    var A;
    if (l && n && (A = w.current) != null && A.__options.blockPointerEvents && T()) {
      const B = Nt(a).body;
      if (B.setAttribute(Lc, ""), B.style.pointerEvents = "none", E.current = !0, ft(s) && a) {
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
const ld = /* @__PURE__ */ R.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: () => {
  },
  setState: () => {
  },
  isInstantPhase: !1
}), ud = () => R.useContext(ld), sb = (e) => {
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
  }, [o.currentId]), /* @__PURE__ */ R.createElement(ld.Provider, {
    value: R.useMemo(() => ({
      ...o,
      setState: i,
      setCurrentId: a
    }), [o, i, a])
  }, t);
}, ab = (e, t) => {
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
  } = ud();
  xt(() => {
    i && (c({
      delay: {
        open: 1,
        close: Or(a, "close")
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
        const d = window.setTimeout(u, l);
        return () => {
          clearTimeout(d);
        };
      } else
        u();
  }, [n, c, i, o, r, a, l]), xt(() => {
    n && s(o);
  }, [n, s, o]);
};
function cb(e) {
  let t = e.activeElement;
  for (; ((n = t) == null || (r = n.shadowRoot) == null ? void 0 : r.activeElement) != null; ) {
    var n, r;
    t = t.shadowRoot.activeElement;
  }
  return t;
}
function xi(e, t) {
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
function lb(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const ub = R[/* @__PURE__ */ "useInsertionEffect".toString()], db = ub || ((e) => e());
function Nr(e) {
  const t = R.useRef(() => {
  });
  return db(() => {
    t.current = e;
  }), R.useCallback(function() {
    for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
      r[o] = arguments[o];
    return t.current == null ? void 0 : t.current(...r);
  }, []);
}
function $r(e, t) {
  if (t == null)
    return !1;
  if ("composedPath" in e)
    return e.composedPath().includes(t);
  const n = e;
  return n.target != null && t.contains(n.target);
}
const fb = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, pb = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, mb = (e) => {
  var t, n;
  return {
    escapeKeyBubbles: typeof e == "boolean" ? e : (t = e == null ? void 0 : e.escapeKey) != null ? t : !1,
    outsidePressBubbles: typeof e == "boolean" ? e : (n = e == null ? void 0 : e.outsidePress) != null ? n : !0
  };
};
function gb(e, t) {
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
    escapeKey: d = !0,
    outsidePress: f = !0,
    outsidePressEvent: p = "pointerdown",
    referencePress: m = !1,
    referencePressEvent: g = "pointerdown",
    ancestorScroll: h = !1,
    bubbles: w
  } = t, y = Bs(), b = id() != null, v = Nr(typeof f == "function" ? f : () => !1), S = typeof f == "function" ? v : f, C = R.useRef(!1), {
    escapeKeyBubbles: P,
    outsidePressBubbles: E
  } = mb(w), O = Nr(($) => {
    if (!n || !u || !d || $.key !== "Escape")
      return;
    const M = y ? xi(y.nodesRef.current, i) : [];
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
    }), r(!1, ob($) ? $.nativeEvent : $);
  }), T = Nr(($) => {
    const M = C.current;
    if (C.current = !1, M || typeof S == "function" && !S($))
      return;
    const _ = lb($);
    if (sd(_) && c) {
      const I = _.clientWidth > 0 && _.scrollWidth > _.clientWidth, B = _.clientHeight > 0 && _.scrollHeight > _.clientHeight;
      let N = B && $.offsetX > _.clientWidth;
      if (B && bo(c).getComputedStyle(_).direction === "rtl" && (N = $.offsetX <= _.offsetWidth - _.clientWidth), N || I && $.offsetY > _.clientHeight)
        return;
    }
    const A = y && xi(y.nodesRef.current, i).some((I) => {
      var B;
      return $r($, (B = I.context) == null ? void 0 : B.elements.floating);
    });
    if ($r($, c) || $r($, a) || A)
      return;
    const L = y ? xi(y.nodesRef.current, i) : [];
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
        } : nb($) || rb($)
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
    d && M.addEventListener("keydown", O), S && M.addEventListener(p, T);
    let _ = [];
    return h && (ft(a) && (_ = wt(a)), ft(c) && (_ = _.concat(wt(c))), !ft(s) && s && s.contextElement && (_ = _.concat(wt(s.contextElement)))), _ = _.filter((A) => {
      var L;
      return A !== ((L = M.defaultView) == null ? void 0 : L.visualViewport);
    }), _.forEach((A) => {
      A.addEventListener("scroll", $, {
        passive: !0
      });
    }), () => {
      d && M.removeEventListener("keydown", O), S && M.removeEventListener(p, T), _.forEach((A) => {
        A.removeEventListener("scroll", $);
      });
    };
  }, [l, c, a, s, d, S, p, n, r, h, u, P, E, O, T]), R.useEffect(() => {
    C.current = !1;
  }, [S, p]), R.useMemo(() => u ? {
    reference: {
      onKeyDown: O,
      [fb[g]]: ($) => {
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
      [pb[p]]: () => {
        C.current = !0;
      }
    }
  } : {}, [u, o, m, p, g, r, O]);
}
function js(e) {
  var t;
  e === void 0 && (e = {});
  const {
    open: n = !1,
    onOpenChange: r,
    nodeId: o
  } = e, [i, s] = R.useState(null), a = ((t = e.elements) == null ? void 0 : t.reference) || i, c = Uh(e), l = Bs(), u = Nr((v, S) => {
    v && (f.current.openEvent = S), r == null || r(v, S);
  }), d = R.useRef(null), f = R.useRef({}), p = R.useState(() => Xh())[0], m = od(), g = R.useCallback((v) => {
    const S = ft(v) ? {
      getBoundingClientRect: () => v.getBoundingClientRect(),
      contextElement: v
    } : v;
    c.refs.setReference(S);
  }, [c.refs]), h = R.useCallback((v) => {
    (ft(v) || v === null) && (d.current = v, s(v)), (ft(c.refs.reference.current) || c.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    v !== null && !ft(v)) && c.refs.setReference(v);
  }, [c.refs]), w = R.useMemo(() => ({
    ...c.refs,
    setReference: h,
    setPositionReference: g,
    domReference: d
  }), [c.refs, h, g]), y = R.useMemo(() => ({
    ...c.elements,
    domReference: a
  }), [c.elements, a]), b = R.useMemo(() => ({
    ...c,
    refs: w,
    elements: y,
    dataRef: f,
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
function hb(e, t) {
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
  } = t, d = R.useRef(""), f = R.useRef(!1), p = R.useRef();
  return R.useEffect(() => {
    if (!l)
      return;
    const g = Nt(a).defaultView || window;
    function h() {
      !n && sd(c) && c === cb(Nt(c)) && (f.current = !0);
    }
    return g.addEventListener("blur", h), () => {
      g.removeEventListener("blur", h);
    };
  }, [a, c, n, l]), R.useEffect(() => {
    if (!l)
      return;
    function m(g) {
      (g.type === "referencePress" || g.type === "escapeKey") && (f.current = !0);
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
        d.current = g, f.current = !!(g && u);
      },
      onMouseLeave() {
        f.current = !1;
      },
      onFocus(m) {
        var g;
        f.current || m.type === "focus" && ((g = o.current.openEvent) == null ? void 0 : g.type) === "mousedown" && $r(o.current.openEvent, c) || r(!0, m.nativeEvent);
      },
      onBlur(m) {
        f.current = !1;
        const g = m.relatedTarget, h = ft(g) && g.hasAttribute(cd("focus-guard")) && g.getAttribute("data-type") === "outside";
        p.current = setTimeout(() => {
          Qi(s.floating.current, g) || Qi(c, g) || h || r(!1, m.nativeEvent);
        });
      }
    }
  } : {}, [l, u, c, s, o, r]);
}
function Si(e, t, n) {
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
            for (var u, d = arguments.length, f = new Array(d), p = 0; p < d; p++)
              f[p] = arguments[p];
            return (u = r.get(a)) == null ? void 0 : u.map((m) => m(...f)).find((m) => m !== void 0);
          };
        }
      } else
        o[a] = c;
    }), o), {})
  };
}
function bb(e) {
  e === void 0 && (e = []);
  const t = e, n = R.useCallback(
    (i) => Si(i, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), r = R.useCallback(
    (i) => Si(i, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o = R.useCallback(
    (i) => Si(i, e, "item"),
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
function yb(e, t) {
  t === void 0 && (t = {});
  const {
    open: n,
    floatingId: r
  } = e, {
    enabled: o = !0,
    role: i = "dialog"
  } = t, s = od();
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
function dd(e, t) {
  if (e === "rtl" && (t.includes("right") || t.includes("left"))) {
    const [n, r] = t.split("-"), o = n === "right" ? "left" : "right";
    return r === void 0 ? o : `${o}-${r}`;
  }
  return t;
}
function Mc(e, t, n, r) {
  return e === "center" || r === "center" ? { top: t } : e === "end" ? { bottom: n } : e === "start" ? { top: n } : {};
}
function _c(e, t, n, r, o) {
  return e === "center" || r === "center" ? { left: t } : e === "end" ? { [o === "ltr" ? "right" : "left"]: n } : e === "start" ? { [o === "ltr" ? "left" : "right"]: n } : {};
}
const vb = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function wb({
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
    [vb[c]]: D(r)
  }, d = D(-t / 2);
  return c === "left" ? {
    ...u,
    ...Mc(l, s, n, o),
    right: d,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  } : c === "right" ? {
    ...u,
    ...Mc(l, s, n, o),
    left: d,
    borderRightColor: "transparent",
    borderTopColor: "transparent"
  } : c === "top" ? {
    ...u,
    ..._c(l, i, n, o, a),
    bottom: d,
    borderTopColor: "transparent",
    borderLeftColor: "transparent"
  } : c === "bottom" ? {
    ...u,
    ..._c(l, i, n, o, a),
    top: d,
    borderBottomColor: "transparent",
    borderRightColor: "transparent"
  } : {};
}
const zs = ie(
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
    const { dir: d } = rr();
    return i ? /* @__PURE__ */ x.createElement(
      "div",
      {
        ...l,
        ref: u,
        style: {
          ...c,
          ...wb({
            position: e,
            arrowSize: t,
            arrowOffset: n,
            arrowRadius: r,
            arrowPosition: o,
            dir: d,
            arrowX: s,
            arrowY: a
          })
        }
      }
    ) : null;
  }
);
zs.displayName = "@mantine/core/FloatingArrow";
const [xb, fd] = Wt(
  "Popover component was not found in the tree"
);
function pd({
  children: e,
  active: t = !0,
  refProp: n = "ref"
}) {
  const r = Km(t), o = Oe(r, e == null ? void 0 : e.ref);
  return Vt(e) ? an(e, { [n]: o }) : e;
}
pd.displayName = "@mantine/core/FocusTrap";
function Sb(e) {
  const t = document.createElement("div");
  return t.setAttribute("data-portal", "true"), typeof e.className == "string" && t.classList.add(...e.className.split(" ").filter(Boolean)), typeof e.style == "object" && Object.assign(t.style, e.style), typeof e.id == "string" && t.setAttribute("id", e.id), t;
}
const Cb = {}, md = ie((e, t) => {
  const { children: n, target: r, ...o } = j("Portal", Cb, e), [i, s] = U(!1), a = z(null);
  return nr(() => (s(!0), a.current = r ? typeof r == "string" ? document.querySelector(r) : r : Sb(o), wu(t, a.current), !r && a.current && document.body.appendChild(a.current), () => {
    !r && a.current && document.body.removeChild(a.current);
  }), [r]), !i || !a.current ? null : hm(/* @__PURE__ */ x.createElement(x.Fragment, null, n), a.current);
});
md.displayName = "@mantine/core/Portal";
function yo({ withinPortal: e = !0, children: t, ...n }) {
  return e ? /* @__PURE__ */ x.createElement(md, { ...n }, t) : /* @__PURE__ */ x.createElement(x.Fragment, null, t);
}
yo.displayName = "@mantine/core/OptionalPortal";
const Tn = (e) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${D(e === "bottom" ? 10 : -10)})` },
  transitionProperty: "transform, opacity"
}), xr = {
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
}, kc = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function Eb({
  transition: e,
  state: t,
  duration: n,
  timingFunction: r
}) {
  const o = {
    transitionDuration: `${n}ms`,
    transitionTimingFunction: r
  };
  return typeof e == "string" ? e in xr ? {
    transitionProperty: xr[e].transitionProperty,
    ...o,
    ...xr[e].common,
    ...xr[e][kc[t]]
  } : {} : {
    transitionProperty: e.transitionProperty,
    ...o,
    ...e.common,
    ...e[kc[t]]
  };
}
function Pb({
  duration: e,
  exitDuration: t,
  timingFunction: n,
  mounted: r,
  onEnter: o,
  onExit: i,
  onEntered: s,
  onExited: a
}) {
  const c = vt(), l = Su(), u = c.respectReducedMotion ? l : !1, [d, f] = U(u ? 0 : e), [p, m] = U(r ? "entered" : "exited"), g = z(-1), h = (w) => {
    const y = w ? o : i, b = w ? s : a;
    m(w ? "pre-entering" : "pre-exiting"), window.clearTimeout(g.current);
    const v = u ? 0 : w ? e : t;
    if (f(v), v === 0)
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
    transitionDuration: d,
    transitionStatus: p,
    transitionTimingFunction: n || "ease"
  };
}
function Vs({
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
  const { transitionDuration: d, transitionStatus: f, transitionTimingFunction: p } = Pb({
    mounted: o,
    exitDuration: r,
    duration: n,
    timingFunction: s,
    onExit: a,
    onEntered: c,
    onEnter: l,
    onExited: u
  });
  return d === 0 ? o ? /* @__PURE__ */ x.createElement(x.Fragment, null, i({})) : e ? i({ display: "none" }) : null : f === "exited" ? e ? i({ display: "none" }) : null : /* @__PURE__ */ x.createElement(x.Fragment, null, i(
    Eb({
      transition: t,
      duration: d,
      state: f,
      timingFunction: p
    })
  ));
}
Vs.displayName = "@mantine/core/Transition";
var gd = { dropdown: "m-38a85659", arrow: "m-a31dc6c1" };
const Db = {}, Ws = q((e, t) => {
  var h, w, y, b;
  const n = j("PopoverDropdown", Db, e), {
    className: r,
    style: o,
    vars: i,
    children: s,
    onKeyDownCapture: a,
    variant: c,
    classNames: l,
    styles: u,
    ...d
  } = n, f = fd(), p = zm({
    opened: f.opened,
    shouldReturnFocus: f.returnFocus
  }), m = f.withRoles ? {
    "aria-labelledby": f.getTargetId(),
    id: f.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {}, g = Oe(t, f.floating);
  return f.disabled ? null : /* @__PURE__ */ x.createElement(yo, { ...f.portalProps, withinPortal: f.withinPortal }, /* @__PURE__ */ x.createElement(
    Vs,
    {
      mounted: f.opened,
      ...f.transitionProps,
      transition: ((h = f.transitionProps) == null ? void 0 : h.transition) || "fade",
      duration: ((w = f.transitionProps) == null ? void 0 : w.duration) ?? 150,
      keepMounted: f.keepMounted,
      exitDuration: typeof ((y = f.transitionProps) == null ? void 0 : y.exitDuration) == "number" ? f.transitionProps.exitDuration : (b = f.transitionProps) == null ? void 0 : b.duration
    },
    (v) => /* @__PURE__ */ x.createElement(pd, { active: f.trapFocus }, /* @__PURE__ */ x.createElement(
      H,
      {
        ...m,
        ...d,
        variant: c,
        ref: g,
        onKeyDownCapture: $m(f.onClose, {
          active: f.closeOnEscape,
          onTrigger: p,
          onKeyDown: a
        }),
        "data-position": f.placement,
        ...f.getStyles("dropdown", {
          className: r,
          props: n,
          classNames: l,
          styles: u,
          style: [
            {
              ...v,
              zIndex: f.zIndex,
              top: f.y ?? 0,
              left: f.x ?? 0,
              width: f.width === "target" ? void 0 : D(f.width)
            },
            o
          ]
        })
      },
      s,
      /* @__PURE__ */ x.createElement(
        zs,
        {
          ref: f.arrowRef,
          arrowX: f.arrowX,
          arrowY: f.arrowY,
          visible: f.withArrow,
          position: f.placement,
          arrowSize: f.arrowSize,
          arrowRadius: f.arrowRadius,
          arrowOffset: f.arrowOffset,
          arrowPosition: f.arrowPosition,
          ...f.getStyles("arrow", {
            props: n,
            classNames: l,
            styles: u
          })
        }
      )
    ))
  ));
});
Ws.classes = gd;
Ws.displayName = "@mantine/core/PopoverDropdown";
const Rb = {
  refProp: "ref",
  popupType: "dialog"
}, hd = q((e, t) => {
  const { children: n, refProp: r, popupType: o, ...i } = j(
    "PopoverTarget",
    Rb,
    e
  );
  if (!Vt(n))
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const s = i, a = fd(), c = Oe(a.reference, n.ref, t), l = a.withRoles ? {
    "aria-haspopup": o,
    "aria-expanded": a.opened,
    "aria-controls": a.getDropdownId(),
    id: a.getTargetId()
  } : {};
  return an(n, {
    ...s,
    ...l,
    ...a.targetProps,
    className: yt(a.targetProps.className, s.className, n.props.className),
    [r]: c,
    ...a.controlled ? null : { onClick: a.onToggle }
  });
});
hd.displayName = "@mantine/core/PopoverTarget";
function bd({
  opened: e,
  floating: t,
  position: n,
  positionDependencies: r
}) {
  const [o, i] = U(0);
  W(() => {
    if (t.refs.reference.current && t.refs.floating.current)
      return Gh(
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
function Ib(e, t) {
  var r, o, i, s;
  const n = [Ku(e.offset)];
  return (r = e.middlewares) != null && r.shift && n.push(Ms({ limiter: Ph() })), (o = e.middlewares) != null && o.flip && n.push(Hu()), (i = e.middlewares) != null && i.inline && n.push(qu()), n.push(nd({ element: e.arrowRef, padding: e.arrowOffset })), ((s = e.middlewares) != null && s.size || e.width === "target") && n.push(
    Dh({
      apply({ rects: a, availableWidth: c, availableHeight: l }) {
        var f, p;
        const d = ((f = t().refs.floating.current) == null ? void 0 : f.style) ?? {};
        (p = e.middlewares) != null && p.size && Object.assign(d, {
          maxWidth: `${c}px`,
          maxHeight: `${l}px`
        }), e.width === "target" && Object.assign(d, {
          width: `${a.reference.width}px`
        });
      }
    })
  ), n;
}
function Ab(e) {
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
  }, i = js({
    placement: e.position,
    middleware: Ib(e, () => i)
  });
  return bd({
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
const Ob = {
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
  zIndex: ws("popover"),
  __staticSelector: "Popover",
  width: "max-content"
}, Nb = (e, { radius: t, shadow: n }) => ({
  dropdown: {
    "--popover-radius": t === void 0 ? void 0 : bt(t),
    "--popover-shadow": Lm(n)
  }
});
function dt(e) {
  var It, qe, De, ge, At, qt;
  const t = j("Popover", Ob, e), {
    children: n,
    position: r,
    offset: o,
    onPositionChange: i,
    positionDependencies: s,
    opened: a,
    transitionProps: c,
    width: l,
    middlewares: u,
    withArrow: d,
    arrowSize: f,
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
    classes: gd,
    classNames: w,
    styles: y,
    unstyled: h,
    rootSelector: "dropdown",
    vars: le,
    varsResolver: Nb
  }), re = z(null), [xe, _e] = U(null), [Ee, Pe] = U(null), { dir: ke } = rr(), ae = Gt(L), Y = Ab({
    middlewares: u,
    width: l,
    position: dd(ke, r),
    offset: typeof o == "number" ? o + (d ? f / 2 : 0) : o,
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
  km(() => b && Y.onClose(), P, [
    xe,
    Ee
  ]);
  const un = Q(
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
    xb,
    {
      value: {
        returnFocus: X,
        disabled: G,
        controlled: Y.controlled,
        reference: un,
        floating: Ue,
        x: Y.floating.x,
        y: Y.floating.y,
        arrowX: (De = (qe = (It = Y.floating) == null ? void 0 : It.middlewareData) == null ? void 0 : qe.arrow) == null ? void 0 : De.x,
        arrowY: (qt = (At = (ge = Y.floating) == null ? void 0 : ge.middlewareData) == null ? void 0 : At.arrow) == null ? void 0 : qt.y,
        opened: Y.opened,
        arrowRef: re,
        transitionProps: c,
        width: l,
        withArrow: d,
        arrowSize: f,
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
dt.Target = hd;
dt.Dropdown = Ws;
dt.displayName = "@mantine/core/Popover";
dt.extend = (e) => e;
var it = { root: "m-5ae2e3c", barsLoader: "m-7a2bd4cd", bar: "m-870bb79", "bars-loader-animation": "m-5d2b3b9d", dotsLoader: "m-4e3f22d7", dot: "m-870c4af", "loader-dots-animation": "m-aac34a1", ovalLoader: "m-b34414df", "oval-loader-animation": "m-f8e89c4b" };
const $b = ie(({ className: e, ...t }, n) => /* @__PURE__ */ x.createElement(H, { component: "span", className: yt(it.barsLoader, e), ...t, ref: n }, /* @__PURE__ */ x.createElement("span", { className: it.bar }), /* @__PURE__ */ x.createElement("span", { className: it.bar }), /* @__PURE__ */ x.createElement("span", { className: it.bar }))), Tb = ie(({ className: e, ...t }, n) => /* @__PURE__ */ x.createElement(H, { component: "span", className: yt(it.dotsLoader, e), ...t, ref: n }, /* @__PURE__ */ x.createElement("span", { className: it.dot }), /* @__PURE__ */ x.createElement("span", { className: it.dot }), /* @__PURE__ */ x.createElement("span", { className: it.dot }))), Lb = ie(({ className: e, ...t }, n) => /* @__PURE__ */ x.createElement(H, { component: "span", className: yt(it.ovalLoader, e), ...t, ref: n })), yd = {
  bars: $b,
  oval: Lb,
  dots: Tb
}, Mb = {
  loaders: yd,
  type: "oval"
}, _b = (e, { size: t, color: n }) => ({
  root: {
    "--loader-size": fe(t, "loader-size"),
    "--loader-color": n ? kt(n, e) : void 0
  }
}), vo = q((e, t) => {
  const n = j("Loader", Mb, e), {
    size: r,
    color: o,
    type: i,
    vars: s,
    className: a,
    style: c,
    classNames: l,
    styles: u,
    unstyled: d,
    loaders: f,
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
    unstyled: d,
    vars: s,
    varsResolver: _b
  });
  return m ? /* @__PURE__ */ x.createElement(H, { ...h("root"), ref: t, ...g }, m) : /* @__PURE__ */ x.createElement(
    H,
    {
      ...h("root"),
      ref: t,
      component: f[i],
      variant: p,
      size: r,
      ...g
    }
  );
});
vo.defaultLoaders = yd;
vo.classes = it;
vo.displayName = "@mantine/core/Loader";
var wo = { root: "m-8d3f4000", loader: "m-302b9fb1", group: "m-1a0f1b21" };
const Fc = {
  orientation: "horizontal"
}, kb = (e, { borderWidth: t }) => ({
  group: { "--ai-border-width": D(t) }
}), Gs = q((e, t) => {
  const n = j("ActionIconGroup", Fc, e), {
    className: r,
    style: o,
    classNames: i,
    styles: s,
    unstyled: a,
    orientation: c,
    vars: l,
    borderWidth: u,
    variant: d,
    ...f
  } = j("ActionIconGroup", Fc, e), p = te({
    name: "ActionIconGroup",
    props: n,
    classes: wo,
    className: r,
    style: o,
    classNames: i,
    styles: s,
    unstyled: a,
    vars: l,
    varsResolver: kb,
    rootSelector: "group"
  });
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...p("group"),
      ref: t,
      variant: d,
      mod: { "data-orientation": c },
      role: "group",
      ...f
    }
  );
});
Gs.classes = wo;
Gs.displayName = "@mantine/core/ActionIconGroup";
const Fb = {}, Bb = (e, { size: t, radius: n, variant: r, gradient: o, color: i }) => {
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
}, xo = cn((e, t) => {
  const n = j("ActionIcon", Fb, e), {
    className: r,
    unstyled: o,
    variant: i,
    classNames: s,
    styles: a,
    style: c,
    loading: l,
    loaderProps: u,
    size: d,
    color: f,
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
    classes: wo,
    classNames: s,
    styles: a,
    unstyled: o,
    vars: h,
    varsResolver: Bb
  });
  return /* @__PURE__ */ x.createElement(
    En,
    {
      ...S("root", { active: !y && !l && !b }),
      ...v,
      unstyled: o,
      variant: i,
      size: d,
      disabled: y || l,
      ref: t,
      mod: { loading: l, disabled: y || b }
    },
    l ? /* @__PURE__ */ x.createElement(
      vo,
      {
        ...S("loader"),
        color: "var(--ai-color)",
        size: "calc(var(--ai-size) * 0.55)",
        ...u
      }
    ) : w
  );
});
xo.classes = wo;
xo.displayName = "@mantine/core/ActionIcon";
xo.Group = Gs;
const vd = ie(
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
vd.displayName = "@mantine/core/CloseIcon";
var wd = { root: "m-86a44da5", "root--subtle": "m-220c80f2" };
const jb = {
  variant: "subtle"
}, zb = (e, { size: t, radius: n, iconSize: r }) => ({
  root: {
    "--cb-size": fe(t, "cb-size"),
    "--cb-radius": n === void 0 ? void 0 : bt(n),
    "--cb-icon-size": D(r)
  }
}), So = cn((e, t) => {
  const n = j("CloseButton", jb, e), {
    iconSize: r,
    children: o,
    vars: i,
    radius: s,
    className: a,
    classNames: c,
    style: l,
    styles: u,
    unstyled: d,
    "data-disabled": f,
    disabled: p,
    variant: m,
    ...g
  } = n, h = te({
    name: "CloseButton",
    props: n,
    className: a,
    style: l,
    classes: wd,
    classNames: c,
    styles: u,
    unstyled: d,
    vars: i,
    varsResolver: zb
  });
  return /* @__PURE__ */ x.createElement(
    En,
    {
      ref: t,
      ...g,
      unstyled: d,
      variant: m,
      disabled: p,
      mod: { disabled: p || f },
      ...h("root", { variant: m, active: !0 })
    },
    /* @__PURE__ */ x.createElement(vd, null),
    o
  );
});
So.classes = wd;
So.displayName = "@mantine/core/CloseButton";
function Vb(e) {
  return pm.toArray(e).filter(Boolean);
}
var xd = { root: "m-4081bf90" };
const Wb = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, Gb = (e, { grow: t, preventGrowOverflow: n, gap: r, align: o, justify: i, wrap: s }, { childWidth: a }) => ({
  root: {
    "--group-child-width": t && n ? a : void 0,
    "--group-gap": mu(r),
    "--group-align": o,
    "--group-justify": i,
    "--group-wrap": s
  }
}), zn = q((e, t) => {
  const n = j("Group", Wb, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    children: c,
    gap: l,
    align: u,
    justify: d,
    wrap: f,
    grow: p,
    preventGrowOverflow: m,
    vars: g,
    variant: h,
    __size: w,
    ...y
  } = n, b = Vb(c), v = b.length, S = mu(l ?? "md"), P = { childWidth: `calc(${100 / v}% - (${S} - ${S} / ${v}))` }, E = te({
    name: "Group",
    props: n,
    stylesCtx: P,
    className: o,
    style: i,
    classes: xd,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: g,
    varsResolver: Gb
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
zn.classes = xd;
zn.displayName = "@mantine/core/Group";
const [Hb, sr] = vs({
  offsetBottom: !1,
  offsetTop: !1,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0
});
var tt = { wrapper: "m-6c018570", input: "m-8fb7ebe7", section: "m-82577fc2", placeholder: "m-88bacfd0", root: "m-46b77525", label: "m-8fdc1311", required: "m-78a94662", error: "m-8f816625", description: "m-fe47ce59" };
const Bc = {}, Ub = (e, { size: t }) => ({
  description: {
    "--input-description-size": t === void 0 ? void 0 : `calc(${gt(t)} - ${D(2)})`
  }
}), Co = q((e, t) => {
  const n = j("InputDescription", Bc, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    size: l,
    __staticSelector: u,
    __inheritStyles: d = !0,
    variant: f,
    ...p
  } = j("InputDescription", Bc, n), m = sr(), g = te({
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
    varsResolver: Ub
  }), h = d && (m == null ? void 0 : m.getStyles) || g;
  return /* @__PURE__ */ x.createElement(
    H,
    {
      component: "p",
      ref: t,
      variant: f,
      size: l,
      ...h("description"),
      ...p
    }
  );
});
Co.classes = tt;
Co.displayName = "@mantine/core/InputDescription";
const qb = {}, Kb = (e, { size: t }) => ({
  error: {
    "--input-error-size": t === void 0 ? void 0 : `calc(${gt(t)} - ${D(2)})`
  }
}), Eo = q((e, t) => {
  const n = j("InputError", qb, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    size: l,
    __staticSelector: u,
    __inheritStyles: d = !0,
    variant: f,
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
    varsResolver: Kb
  }), g = sr(), h = d && (g == null ? void 0 : g.getStyles) || m;
  return /* @__PURE__ */ x.createElement(
    H,
    {
      component: "p",
      ref: t,
      variant: f,
      size: l,
      ...h("error"),
      ...p
    }
  );
});
Eo.classes = tt;
Eo.displayName = "@mantine/core/InputError";
const jc = {
  labelElement: "label"
}, Yb = (e, { size: t }) => ({
  label: {
    "--input-label-size": gt(t),
    "--input-asterisk-color": void 0
  }
}), Po = q((e, t) => {
  const n = j("InputLabel", jc, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    labelElement: l,
    size: u,
    required: d,
    htmlFor: f,
    onMouseDown: p,
    children: m,
    __staticSelector: g,
    variant: h,
    ...w
  } = j("InputLabel", jc, n), y = te({
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
    varsResolver: Yb
  }), b = sr(), v = (b == null ? void 0 : b.getStyles) || y;
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...v("label"),
      component: l,
      variant: h,
      size: u,
      ref: t,
      htmlFor: l === "label" ? f : void 0,
      mod: { required: d },
      onMouseDown: (S) => {
        p == null || p(S), !S.defaultPrevented && S.detail > 1 && S.preventDefault();
      },
      ...w
    },
    m,
    d && /* @__PURE__ */ x.createElement("span", { ...v("required"), "aria-hidden": !0 }, " *")
  );
});
Po.classes = tt;
Po.displayName = "@mantine/core/InputLabel";
const zc = {}, Hs = q((e, t) => {
  const n = j("InputPlaceholder", zc, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    __staticSelector: l,
    variant: u,
    error: d,
    ...f
  } = j("InputPlaceholder", zc, n), p = te({
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
      mod: { error: !!d },
      component: "span",
      variant: u,
      ref: t,
      ...f
    }
  );
});
Hs.classes = tt;
Hs.displayName = "@mantine/core/InputPlaceholder";
function Xb(e, { hasDescription: t, hasError: n }) {
  const r = e.findIndex((c) => c === "input"), o = e[r - 1], i = e[r + 1];
  return { offsetBottom: t && i === "description" || n && i === "error", offsetTop: t && o === "description" || n && o === "error" };
}
const Jb = {
  labelElement: "label",
  inputContainer: (e) => e,
  inputWrapperOrder: ["label", "description", "input", "error"]
}, Qb = (e, { size: t }) => ({
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
}), Us = q((e, t) => {
  const n = j("InputWrapper", Jb, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    size: l,
    variant: u,
    __staticSelector: d,
    inputContainer: f,
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
    name: ["InputWrapper", d],
    props: O || n,
    classes: tt,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Qb
  }), M = {
    size: l,
    variant: u,
    __staticSelector: d
  }, _ = Gt(P), A = typeof C == "boolean" ? C : E, L = (b == null ? void 0 : b.id) || `${_}-error`, I = (y == null ? void 0 : y.id) || `${_}-description`, B = _, N = !!g && typeof g != "boolean", G = !!h, X = `${N ? L : ""} ${G ? I : ""}`, ne = X.trim().length > 0 ? X.trim() : void 0, ve = (w == null ? void 0 : w.id) || `${_}-label`, le = m && /* @__PURE__ */ x.createElement(
    Po,
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
    Co,
    {
      key: "description",
      ...y,
      ...M,
      size: (y == null ? void 0 : y.size) || M.size,
      id: (y == null ? void 0 : y.id) || I
    },
    h
  ), we = /* @__PURE__ */ x.createElement(x.Fragment, { key: "input" }, f(S)), re = N && /* @__PURE__ */ x.createElement(
    Eo,
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
    Hb,
    {
      value: {
        getStyles: $,
        describedBy: ne,
        inputId: B,
        labelId: ve,
        ...Xb(p, { hasDescription: G, hasError: N })
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
Us.classes = tt;
Us.displayName = "@mantine/core/InputWrapper";
const Zb = {
  variant: "default",
  leftSectionPointerEvents: "none",
  rightSectionPointerEvents: "none",
  withAria: !0,
  withErrorStyles: !0
}, ey = (e, t, n) => ({
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
}), Ze = cn((e, t) => {
  const n = j("Input", Zb, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    required: c,
    __staticSelector: l,
    __stylesApiProps: u,
    size: d,
    wrapperProps: f,
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
  } = n, { styleProps: I, rest: B } = po(L), N = sr(), G = { offsetBottom: N == null ? void 0 : N.offsetBottom, offsetTop: N == null ? void 0 : N.offsetTop }, X = te({
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
    varsResolver: ey
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
      ...f,
      mod: {
        error: !!p && A,
        pointer: O,
        disabled: m,
        multiline: T,
        "data-with-right-section": !!y,
        "data-with-left-section": !!g
      },
      variant: P,
      size: d
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
Ze.Wrapper = Us;
Ze.Label = Po;
Ze.Error = Eo;
Ze.Description = Co;
Ze.Placeholder = Hs;
Ze.displayName = "@mantine/core/Input";
function ty(e, t, n) {
  const r = j(e, t, n), {
    label: o,
    description: i,
    error: s,
    required: a,
    classNames: c,
    styles: l,
    className: u,
    unstyled: d,
    __staticSelector: f,
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
  } = r, { styleProps: $, rest: M } = po(T), _ = {
    label: o,
    description: i,
    error: s,
    required: a,
    classNames: c,
    className: u,
    __staticSelector: f,
    __stylesApiProps: p || r,
    errorProps: m,
    labelProps: g,
    descriptionProps: h,
    unstyled: d,
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
    unstyled: d,
    wrapperProps: { ..._, ...$ },
    inputProps: {
      required: a,
      classNames: c,
      styles: l,
      unstyled: d,
      size: b,
      __staticSelector: f,
      __stylesApiProps: p || r,
      error: s,
      variant: E,
      id: y
    }
  };
}
const ny = {
  __staticSelector: "InputBase",
  withAria: !0
}, Ht = cn((e, t) => {
  const { inputProps: n, wrapperProps: r, ...o } = ty("InputBase", ny, e);
  return /* @__PURE__ */ x.createElement(Ze.Wrapper, { ...r }, /* @__PURE__ */ x.createElement(Ze, { ...n, ...o, ref: t }));
});
Ht.classes = { ...Ze.classes, ...Ze.Wrapper.classes };
Ht.displayName = "@mantine/core/InputBase";
const [ry, qs] = Wt(
  "Accordion component was not found in the tree"
);
function Ks({ style: e, size: t = 16, ...n }) {
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
Ks.displayName = "@mantine/core/AccordionChevron";
const [oy, Sd] = Wt("Accordion.Item component was not found in the tree");
var ar = { root: "m-9bdbb667", panel: "m-df78851f", content: "m-4ba554d4", itemTitle: "m-8fa820a0", control: "m-4ba585b8", "control--default": "m-6939a5e9", "control--contained": "m-4271d21b", label: "m-df3ffa0f", chevron: "m-3f35ae96", icon: "m-9bd771fe", item: "m-9bd7b098", "item--default": "m-fe19b709", "item--contained": "m-1f921b3b", "item--filled": "m-2cdf939a", "item--separated": "m-9f59b069" };
const iy = {}, Ys = q((e, t) => {
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
    children: d,
    disabled: f,
    ...p
  } = j("AccordionControl", iy, e), { value: m } = Sd(), g = qs(), h = g.isItemActive(m), w = typeof g.order == "number", y = `h${g.order}`, b = /* @__PURE__ */ x.createElement(
    En,
    {
      ...p,
      ...g.getStyles("control", { className: r, classNames: n, style: o, styles: i, variant: g.variant }),
      unstyled: g.unstyled,
      mod: [
        "accordion-control",
        { active: h, "chevron-position": g.chevronPosition, disabled: f }
      ],
      ref: t,
      onClick: (v) => {
        l == null || l(v), g.onChange(m);
      },
      type: "button",
      disabled: f,
      "aria-expanded": h,
      "aria-controls": g.getRegionId(m),
      id: g.getControlId(m),
      onKeyDown: pu({
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
    /* @__PURE__ */ x.createElement("span", { ...g.getStyles("label", { classNames: n, styles: i }) }, d),
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
Ys.displayName = "@mantine/core/AccordionControl";
Ys.classes = ar;
const sy = {}, Xs = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, value: a, ...c } = j(
    "AccordionItem",
    sy,
    e
  ), l = qs();
  return /* @__PURE__ */ x.createElement(oy, { value: { value: a } }, /* @__PURE__ */ x.createElement(
    H,
    {
      ref: t,
      mod: { active: l.isItemActive(a) },
      ...l.getStyles("item", { className: r, classNames: n, styles: i, style: o, variant: l.variant }),
      ...c
    }
  ));
});
Xs.displayName = "@mantine/core/AccordionItem";
Xs.classes = ar;
const ay = {}, Js = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, children: a, ...c } = j(
    "AccordionPanel",
    ay,
    e
  ), { value: l } = Sd(), u = qs();
  return /* @__PURE__ */ x.createElement(
    Lu,
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
Js.displayName = "@mantine/core/AccordionPanel";
Js.classes = ar;
const cy = {
  multiple: !1,
  disableChevronRotation: !1,
  chevronPosition: "right",
  variant: "default",
  chevron: /* @__PURE__ */ x.createElement(Ks, null)
}, ly = (e, { transitionDuration: t, chevronSize: n, radius: r }) => ({
  root: {
    "--accordion-transition-duration": t === void 0 ? void 0 : `${t}ms`,
    "--accordion-chevron-size": n === void 0 ? void 0 : D(n),
    "--accordion-radius": r === void 0 ? void 0 : bt(r)
  }
});
function oe(e) {
  const t = j("Accordion", cy, e), {
    classNames: n,
    className: r,
    style: o,
    styles: i,
    unstyled: s,
    vars: a,
    children: c,
    multiple: l,
    value: u,
    defaultValue: d,
    onChange: f,
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
    defaultValue: d,
    finalValue: l ? [] : null,
    onChange: f
  }), $ = (A) => Array.isArray(O) ? O.includes(A) : A === O, M = (A) => {
    const L = Array.isArray(O) ? O.includes(A) ? O.filter((I) => I !== A) : [...O, A] : A === O ? null : A;
    T(L);
  }, _ = te({
    name: "Accordion",
    classes: ar,
    props: t,
    className: r,
    style: o,
    classNames: n,
    styles: i,
    unstyled: s,
    vars: a,
    varsResolver: ly
  });
  return /* @__PURE__ */ x.createElement(
    ry,
    {
      value: {
        isItemActive: $,
        onChange: M,
        getControlId: _r(
          `${E}-control`,
          "Accordion.Item component was rendered with invalid value or without value"
        ),
        getRegionId: _r(
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
const uy = (e) => e;
oe.extend = uy;
oe.classes = ar;
oe.displayName = "@mantine/core/Accordion";
oe.Item = Xs;
oe.Panel = Js;
oe.Control = Ys;
oe.Chevron = Ks;
var Cd = { root: "m-b6d8b162" };
function dy(e) {
  if (e === "start")
    return "start";
  if (e === "end" || e)
    return "end";
}
const fy = {
  inherit: !1
}, py = (e, { variant: t, lineClamp: n, gradient: r, size: o, color: i }) => ({
  root: {
    "--text-fz": gt(o),
    "--text-lh": Tm(o),
    "--text-gradient": t === "gradient" ? qi(r, e) : void 0,
    "--text-line-clamp": typeof n == "number" ? n.toString() : void 0,
    "--text-color": i ? kt(i, e) : void 0
  }
}), Xe = cn((e, t) => {
  const n = j("Text", fy, e), {
    lineClamp: r,
    truncate: o,
    inline: i,
    inherit: s,
    gradient: a,
    span: c,
    __staticSelector: l,
    vars: u,
    className: d,
    style: f,
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
    classes: Cd,
    className: d,
    style: f,
    classNames: p,
    styles: m,
    unstyled: g,
    vars: u,
    varsResolver: py
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
          "data-truncate": dy(o),
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
Xe.classes = Cd;
Xe.displayName = "@mantine/core/Text";
function Ed(e) {
  return typeof e == "string" ? { value: e, label: e } : typeof e == "number" ? { value: e.toString(), label: e.toString() } : "group" in e ? {
    group: e.group,
    items: e.items.map((t) => Ed(t))
  } : e;
}
function Pd(e) {
  return e ? e.map(Ed) : [];
}
function Qs(e) {
  return e.reduce((t, n) => "group" in n ? { ...t, ...Qs(n.items) } : (t[n.value] = n, t), {});
}
var Ae = { dropdown: "m-88b62a41", options: "m-b2821a6e", option: "m-92253aa5", search: "m-985517d8", empty: "m-2530cd1d", header: "m-858f94bd", footer: "m-82b967cb", group: "m-254f3e4f", groupLabel: "m-2bb2e9e5", chevron: "m-2943220b", optionsDropdownScrollArea: "m-71d052f9", optionsDropdownOption: "m-390b5f4", optionsDropdownCheckIcon: "m-8ee53fc2" };
const my = {
  error: null
}, gy = (e, { size: t }) => ({
  chevron: {
    "--combobox-chevron-size": fe(t, "combobox-chevron-size")
  }
}), Zs = q((e, t) => {
  const n = j("ComboboxChevron", my, e), { size: r, error: o, style: i, className: s, classNames: a, styles: c, unstyled: l, vars: u, ...d } = n, f = te({
    name: "ComboboxChevron",
    classes: Ae,
    props: n,
    style: i,
    className: s,
    classNames: a,
    styles: c,
    unstyled: l,
    vars: u,
    varsResolver: gy,
    rootSelector: "chevron"
  });
  return /* @__PURE__ */ x.createElement(
    H,
    {
      component: "svg",
      ...d,
      ...f("chevron"),
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
Zs.classes = Ae;
Zs.displayName = "@mantine/core/ComboboxChevron";
const [hy, nt] = Wt(
  "Combobox component was not found in tree"
), Dd = ie(
  ({ size: e, onMouseDown: t, onClick: n, onClear: r, ...o }, i) => /* @__PURE__ */ x.createElement(
    So,
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
Dd.displayName = "@mantine/core/ComboboxClearButton";
const by = {}, ea = q((e, t) => {
  const { classNames: n, styles: r, className: o, style: i, hidden: s, ...a } = j(
    "ComboboxDropdown",
    by,
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
ea.classes = Ae;
ea.displayName = "@mantine/core/ComboboxDropdown";
const yy = {
  refProp: "ref"
}, Rd = q((e, t) => {
  const { children: n, refProp: r } = j("ComboboxDropdownTarget", yy, e);
  if (nt(), !Vt(n))
    throw new Error(
      "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  return /* @__PURE__ */ x.createElement(dt.Target, { ref: t, refProp: r }, n);
});
Rd.displayName = "@mantine/core/ComboboxDropdownTarget";
const vy = {}, ta = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, ...a } = j(
    "ComboboxEmpty",
    vy,
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
ta.classes = Ae;
ta.displayName = "@mantine/core/ComboboxEmpty";
function na({
  onKeyDown: e,
  withKeyboardNavigation: t,
  withAriaAttributes: n,
  withExpandedAttribute: r,
  targetType: o
}) {
  const i = nt(), [s, a] = U(null), c = (u) => {
    if (e == null || e(u), !i.readOnly && t) {
      if (u.nativeEvent.code === "ArrowDown" && (u.preventDefault(), i.store.dropdownOpened ? a(i.store.selectNextOption()) : (i.store.openDropdown("keyboard"), a(i.store.selectActiveOption()))), u.nativeEvent.code === "ArrowUp" && (u.preventDefault(), i.store.dropdownOpened ? a(i.store.selectPreviousOption()) : (i.store.openDropdown("keyboard"), a(i.store.selectActiveOption()))), u.nativeEvent.code === "Enter") {
        const d = i.store.getSelectedOptionIndex();
        i.store.dropdownOpened && d !== -1 ? (u.preventDefault(), i.store.clickSelectedOption()) : o === "button" && (u.preventDefault(), i.store.openDropdown("keyboard"));
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
const wy = {
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
  } = j("ComboboxEventsTarget", wy, e);
  if (!Vt(n))
    throw new Error(
      "Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const l = nt(), u = na({
    targetType: a,
    withAriaAttributes: i,
    withKeyboardNavigation: o,
    withExpandedAttribute: s,
    onKeyDown: n.props.onKeyDown
  });
  return an(n, {
    ...u,
    ...c,
    [r]: Oe(t, l.store.targetRef, n == null ? void 0 : n.ref)
  });
});
Id.displayName = "@mantine/core/ComboboxEventsTarget";
const xy = {}, ra = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, ...a } = j(
    "ComboboxFooter",
    xy,
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
ra.classes = Ae;
ra.displayName = "@mantine/core/ComboboxFooter";
const Sy = {}, oa = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, children: a, label: c, ...l } = j(
    "ComboboxGroup",
    Sy,
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
oa.classes = Ae;
oa.displayName = "@mantine/core/ComboboxGroup";
const Cy = {}, ia = q((e, t) => {
  const { classNames: n, className: r, style: o, styles: i, vars: s, ...a } = j(
    "ComboboxHeader",
    Cy,
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
ia.classes = Ae;
ia.displayName = "@mantine/core/ComboboxHeader";
const Ey = {}, sa = q((e, t) => {
  const n = j("ComboboxOption", Ey, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    vars: a,
    onClick: c,
    id: l,
    active: u,
    onMouseDown: d,
    onMouseOver: f,
    disabled: p,
    selected: m,
    ...g
  } = n, h = nt(), w = su(), y = l || w;
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
        b.preventDefault(), d == null || d(b);
      },
      onMouseOver: (b) => {
        h.resetSelectionOnOptionHover && h.store.resetSelectedOption(), f == null || f(b);
      }
    }
  );
});
sa.classes = Ae;
sa.displayName = "@mantine/core/ComboboxOption";
const Py = {}, aa = q((e, t) => {
  const n = j("ComboboxOptions", Py, e), { classNames: r, className: o, style: i, styles: s, id: a, onMouseDown: c, labelledBy: l, ...u } = n, d = nt(), f = Gt(a);
  return W(() => {
    d.store.setListId(f);
  }, [f]), /* @__PURE__ */ x.createElement(
    H,
    {
      ref: t,
      ...d.getStyles("options", { className: o, style: i, classNames: r, styles: s }),
      ...u,
      id: f,
      role: "listbox",
      "aria-labelledby": l,
      onMouseDown: (p) => {
        p.preventDefault(), c == null || c(p);
      }
    }
  );
});
aa.classes = Ae;
aa.displayName = "@mantine/core/ComboboxOptions";
const Dy = {
  withAriaAttributes: !0,
  withKeyboardNavigation: !0
}, ca = q((e, t) => {
  const n = j("ComboboxSearch", Dy, e), {
    classNames: r,
    styles: o,
    unstyled: i,
    vars: s,
    withAriaAttributes: a,
    onKeyDown: c,
    withKeyboardNavigation: l,
    size: u,
    ...d
  } = n, f = nt(), p = f.getStyles("search"), m = na({
    targetType: "input",
    withAriaAttributes: a,
    withKeyboardNavigation: l,
    withExpandedAttribute: !1,
    onKeyDown: c
  });
  return /* @__PURE__ */ x.createElement(
    Ze,
    {
      ref: Oe(t, f.store.searchRef),
      classNames: [{ input: p.className }, r],
      styles: [{ input: p.style }, o],
      size: u || f.size,
      ...m,
      ...d,
      __staticSelector: "Combobox"
    }
  );
});
ca.classes = Ae;
ca.displayName = "@mantine/core/ComboboxSearch";
const Ry = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: !0,
  withAriaAttributes: !0,
  withExpandedAttribute: !1
}, Ad = q((e, t) => {
  const {
    children: n,
    refProp: r,
    withKeyboardNavigation: o,
    withAriaAttributes: i,
    withExpandedAttribute: s,
    targetType: a,
    ...c
  } = j("ComboboxTarget", Ry, e);
  if (!Vt(n))
    throw new Error(
      "Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const l = nt(), u = na({
    targetType: a,
    withAriaAttributes: i,
    withKeyboardNavigation: o,
    withExpandedAttribute: s,
    onKeyDown: n.props.onKeyDown
  }), d = an(n, {
    ...u,
    ...c
  });
  return /* @__PURE__ */ x.createElement(dt.Target, { ref: Oe(t, l.store.targetRef) }, d);
});
Ad.displayName = "@mantine/core/ComboboxTarget";
function Iy(e, t, n) {
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
function Ay(e, t, n) {
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
function Oy(e) {
  for (let t = 0; t < e.length; t += 1)
    if (!e[t].hasAttribute("data-combobox-disabled"))
      return t;
  return -1;
}
function la({
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
  }), l = z(null), u = z(-1), d = z(null), f = z(null), p = z(-1), m = z(-1), g = z(-1), h = Q(
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
      Ay(
        u.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        i
      )
    ),
    [v, i]
  ), P = Q(
    () => v(
      Iy(
        u.current,
        document.querySelectorAll(`#${l.current} [data-combobox-option]`),
        i
      )
    ),
    [v, i]
  ), E = Q(
    () => v(
      Oy(
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
    p.current = window.setTimeout(() => d.current.focus(), 0);
  }, []), A = Q(() => {
    m.current = window.setTimeout(() => f.current.focus(), 0);
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
    searchRef: d,
    focusSearchInput: _,
    targetRef: f,
    focusTarget: A
  };
}
const Ny = {
  keepMounted: !0,
  withinPortal: !0,
  resetSelectionOnOptionHover: !1,
  width: "target",
  transitionProps: { transition: "fade", duration: 0 }
}, $y = (e, { size: t, dropdownPadding: n }) => ({
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
  const t = j("Combobox", Ny, e), {
    classNames: n,
    styles: r,
    unstyled: o,
    children: i,
    store: s,
    vars: a,
    onOptionSubmit: c,
    size: l,
    dropdownPadding: u,
    resetSelectionOnOptionHover: d,
    __staticSelector: f,
    readOnly: p,
    ...m
  } = t, g = la(), h = s || g, w = te({
    name: f || "Combobox",
    classes: Ae,
    props: t,
    classNames: n,
    styles: r,
    unstyled: o,
    vars: a,
    varsResolver: $y
  });
  return /* @__PURE__ */ x.createElement(
    hy,
    {
      value: {
        getStyles: w,
        store: h,
        onOptionSubmit: c,
        size: l,
        resetSelectionOnOptionHover: d,
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
const Ty = (e) => e;
J.extend = Ty;
J.classes = Ae;
J.displayName = "@mantine/core/Combobox";
J.Target = Ad;
J.Dropdown = ea;
J.Options = aa;
J.Option = sa;
J.Search = ca;
J.Empty = ta;
J.Chevron = Zs;
J.Footer = ra;
J.Header = ia;
J.EventsTarget = Id;
J.DropdownTarget = Rd;
J.Group = oa;
J.ClearButton = Dd;
function Ly({ size: e, style: t, ...n }) {
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
function yn(e) {
  return "group" in e;
}
function Od({
  options: e,
  search: t,
  limit: n
}) {
  const r = t.trim().toLowerCase(), o = [];
  for (let i = 0; i < e.length; i += 1) {
    const s = e[i];
    if (o.length === n)
      return o;
    yn(s) && o.push({
      group: s.group,
      items: Od({
        options: s.items,
        search: t,
        limit: n - o.length
      })
    }), yn(s) || s.label.toLowerCase().includes(r) && o.push(s);
  }
  return o;
}
function My(e) {
  if (e.length === 0)
    return !0;
  for (const t of e)
    if (!("group" in t) || t.items.length > 0)
      return !1;
  return !0;
}
function Nd(e, t = /* @__PURE__ */ new Set()) {
  if (Array.isArray(e))
    for (const n of e)
      if (yn(n))
        Nd(n.items, t);
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
function Ci(e, t) {
  return Array.isArray(e) ? e.includes(t) : e === t;
}
function $d({ data: e, withCheckIcon: t, value: n, checkIconPosition: r, unstyled: o }) {
  if (!yn(e)) {
    const s = t && Ci(n, e.value) && /* @__PURE__ */ x.createElement(Ly, { className: Ae.optionsDropdownCheckIcon });
    return /* @__PURE__ */ x.createElement(
      J.Option,
      {
        value: e.value,
        disabled: e.disabled,
        className: yt({ [Ae.optionsDropdownOption]: !o }),
        "data-reverse": r === "right" || void 0,
        "data-checked": Ci(n, e.value) || void 0,
        "aria-selected": Ci(n, e.value)
      },
      r === "left" && s,
      /* @__PURE__ */ x.createElement("span", null, e.label),
      r === "right" && s
    );
  }
  const i = e.items.map((s) => /* @__PURE__ */ x.createElement(
    $d,
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
function Td({
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
  checkIconPosition: d,
  nothingFoundMessage: f,
  unstyled: p,
  labelId: m
}) {
  Nd(e);
  const h = typeof o == "string" ? (r || Od)({
    options: e,
    search: c ? o : "",
    limit: i ?? 1 / 0
  }) : e, w = My(h), y = h.map((b) => /* @__PURE__ */ x.createElement(
    $d,
    {
      data: b,
      key: yn(b) ? b.group : b.value,
      withCheckIcon: l,
      value: u,
      checkIconPosition: d,
      unstyled: p
    }
  ));
  return /* @__PURE__ */ x.createElement(J.Dropdown, { hidden: t || n && w }, /* @__PURE__ */ x.createElement(J.Options, { labelledBy: m }, a ? /* @__PURE__ */ x.createElement(
    or.Autosize,
    {
      mah: s ?? 220,
      type: "scroll",
      scrollbarSize: "var(--_combobox-padding)",
      offsetScrollbars: "y",
      className: Ae.optionsDropdownScrollArea
    },
    y
  ) : y, w && f && /* @__PURE__ */ x.createElement(J.Empty, null, f)));
}
var Ld = { root: "m-de3d2490", colorOverlay: "m-862f3d1b", shadowOverlay: "m-98ae7f22", alphaOverlay: "m-95709ac0", childrenOverlay: "m-93e74e3" };
const Vc = {
  withShadow: !0
}, _y = (e, { radius: t, size: n }) => ({
  root: {
    "--cs-radius": t === void 0 ? void 0 : bt(t),
    "--cs-size": D(n)
  }
}), Vn = cn((e, t) => {
  const n = j("ColorSwatch", Vc, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    color: l,
    size: u,
    radius: d,
    withShadow: f,
    children: p,
    variant: m,
    ...g
  } = j("ColorSwatch", Vc, n), h = te({
    name: "ColorSwatch",
    props: n,
    classes: Ld,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: _y
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
    f && /* @__PURE__ */ x.createElement("span", { ...h("shadowOverlay") }),
    /* @__PURE__ */ x.createElement("span", { ...h("colorOverlay", { style: { backgroundColor: l } }) }),
    /* @__PURE__ */ x.createElement("span", { ...h("childrenOverlay") }, p)
  );
});
Vn.classes = Ld;
Vn.displayName = "@mantine/core/ColorSwatch";
var Md = { root: "m-7485cace" };
const ky = {}, Fy = (e, { size: t, fluid: n }) => ({
  root: {
    "--container-size": n ? void 0 : fe(t, "container-size")
  }
}), ua = q((e, t) => {
  const n = j("Container", ky, e), { classNames: r, className: o, style: i, styles: s, unstyled: a, vars: c, fluid: l, ...u } = n, d = te({
    name: "Container",
    classes: Md,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Fy
  });
  return /* @__PURE__ */ x.createElement(H, { ref: t, mod: { fluid: l }, ...d("root"), ...u });
});
ua.classes = Md;
ua.displayName = "@mantine/core/Container";
function By({ open: e, close: t, openDelay: n, closeDelay: r }) {
  const o = z(-1), i = z(-1), s = () => {
    window.clearTimeout(o.current), window.clearTimeout(i.current);
  }, a = () => {
    s(), n === 0 || n === void 0 ? e() : o.current = window.setTimeout(e, n);
  }, c = () => {
    s(), r === 0 || r === void 0 ? t() : i.current = window.setTimeout(t, r);
  };
  return W(() => s, []), { openDropdown: a, closeDropdown: c };
}
const [jy, _d] = Wt(
  "HoverCard component was not found in the tree"
), zy = {};
function kd(e) {
  const { children: t, onMouseEnter: n, onMouseLeave: r, ...o } = j(
    "HoverCardDropdown",
    zy,
    e
  ), i = _d(), s = kr(n, i.openDropdown), a = kr(r, i.closeDropdown);
  return /* @__PURE__ */ x.createElement(dt.Dropdown, { onMouseEnter: s, onMouseLeave: a, ...o }, t);
}
kd.displayName = "@mantine/core/HoverCardDropdown";
const Vy = {
  refProp: "ref"
}, Fd = ie((e, t) => {
  const { children: n, refProp: r, eventPropsWrapperName: o, ...i } = j(
    "HoverCardTarget",
    Vy,
    e
  );
  if (!Vt(n))
    throw new Error(
      "HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const s = _d(), a = kr(n.props.onMouseEnter, s.openDropdown), c = kr(n.props.onMouseLeave, s.closeDropdown), l = { onMouseEnter: a, onMouseLeave: c };
  return /* @__PURE__ */ x.createElement(dt.Target, { refProp: r, ref: t, ...i }, an(
    n,
    o ? { [o]: l } : l
  ));
});
Fd.displayName = "@mantine/core/HoverCardTarget";
const Wy = {
  openDelay: 0,
  closeDelay: 150,
  initiallyOpened: !1
};
function tn(e) {
  const { children: t, onOpen: n, onClose: r, openDelay: o, closeDelay: i, initiallyOpened: s, ...a } = j(
    "HoverCard",
    Wy,
    e
  ), [c, { open: l, close: u }] = Jm(s, { onClose: r, onOpen: n }), { openDropdown: d, closeDropdown: f } = By({ open: l, close: u, openDelay: o, closeDelay: i });
  return /* @__PURE__ */ x.createElement(jy, { value: { openDropdown: d, closeDropdown: f } }, /* @__PURE__ */ x.createElement(dt, { ...a, opened: c, __staticSelector: "HoverCard" }, t));
}
tn.displayName = "@mantine/core/HoverCard";
tn.Target = Fd;
tn.Dropdown = kd;
tn.extend = (e) => e;
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
function Bd(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const [Gy, da] = vs(), [Hy, Uy] = vs();
var Do = { root: "m-7cda1cd6", "root--default": "m-44da308b", "root--contrast": "m-e3a01f8", label: "m-1e0e6180", remove: "m-ae386778", group: "m-1dcfd90b" };
const qy = {}, Ky = (e, { gap: t }, { size: n }) => ({
  group: {
    "--pg-gap": t !== void 0 ? fe(t) : fe(n, "pg-gap")
  }
}), fa = q((e, t) => {
  const n = j("PillGroup", qy, e), { classNames: r, className: o, style: i, styles: s, unstyled: a, vars: c, size: l, disabled: u, ...d } = n, f = da(), p = (f == null ? void 0 : f.size) || l || void 0, m = te({
    name: "PillGroup",
    classes: Do,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Ky,
    stylesCtx: { size: p },
    rootSelector: "group"
  });
  return /* @__PURE__ */ x.createElement(Hy, { value: { size: p, disabled: u } }, /* @__PURE__ */ x.createElement(H, { ref: t, size: p, ...m("group"), ...d }));
});
fa.classes = Do;
fa.displayName = "@mantine/core/PillGroup";
const Yy = {
  variant: "default"
}, Xy = (e, { radius: t }, { size: n }) => ({
  root: {
    "--pill-fz": fe(n, "pill-fz"),
    "--pill-height": fe(n, "pill-height"),
    "--pill-radius": t === void 0 ? void 0 : bt(t)
  }
}), Wn = q((e, t) => {
  const n = j("Pill", Yy, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    variant: l,
    children: u,
    withRemoveButton: d,
    onRemove: f,
    removeButtonProps: p,
    radius: m,
    size: g,
    disabled: h,
    ...w
  } = n, y = Uy(), b = da(), v = g || (y == null ? void 0 : y.size) || void 0, S = (b == null ? void 0 : b.variant) === "filled" ? "contrast" : l || "default", C = te({
    name: "Pill",
    classes: Do,
    props: n,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: c,
    varsResolver: Xy,
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
      mod: { "with-remove": d, disabled: h || (y == null ? void 0 : y.disabled) },
      ...w
    },
    /* @__PURE__ */ x.createElement("span", { ...C("label") }, u),
    d && /* @__PURE__ */ x.createElement(
      So,
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
          P.stopPropagation(), f == null || f(), (E = p == null ? void 0 : p.onClick) == null || E.call(p, P);
        }
      }
    )
  );
});
Wn.classes = Do;
Wn.displayName = "@mantine/core/Pill";
Wn.Group = fa;
var jd = { field: "m-45c4369d" };
const Jy = {
  type: "visible"
}, pa = q((e, t) => {
  const n = j("PillsInputField", Jy, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    type: l,
    disabled: u,
    id: d,
    pointer: f,
    ...p
  } = n, m = da(), g = sr(), h = te({
    name: "PillsInputField",
    classes: jd,
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
      mod: { disabled: w, pointer: f },
      ...h("field"),
      ...p,
      id: (g == null ? void 0 : g.inputId) || d,
      "aria-invalid": m == null ? void 0 : m.hasError,
      "aria-describedby": g == null ? void 0 : g.describedBy,
      type: "text",
      onMouseDown: (y) => !f && y.stopPropagation()
    }
  );
});
pa.classes = jd;
pa.displayName = "@mantine/core/PillsInputField";
const Qy = {}, Wr = q((e, t) => {
  const n = j("PillsInput", Qy, e), {
    children: r,
    onMouseDown: o,
    onClick: i,
    size: s,
    disabled: a,
    __staticSelector: c,
    error: l,
    variant: u,
    ...d
  } = n, f = z();
  return /* @__PURE__ */ x.createElement(Gy, { value: { fieldRef: f, size: s, disabled: a, hasError: !!l, variant: u } }, /* @__PURE__ */ x.createElement(
    Ht,
    {
      size: s,
      error: l,
      variant: u,
      component: "div",
      ref: t,
      onMouseDown: (p) => {
        var m;
        p.preventDefault(), o == null || o(p), (m = f.current) == null || m.focus();
      },
      onClick: (p) => {
        var m;
        p.preventDefault(), i == null || i(p), (m = f.current) == null || m.focus();
      },
      ...d,
      multiline: !0,
      disabled: a,
      __staticSelector: c || "PillsInput",
      withAria: !1
    },
    r
  ));
});
Wr.displayName = "@mantine/core/PillsInput";
Wr.Field = pa;
function Zy({ data: e, value: t }) {
  const n = t.map((o) => o.trim().toLowerCase());
  return e.reduce((o, i) => (yn(i) ? o.push({
    group: i.group,
    items: i.items.filter(
      (s) => n.indexOf(s.value.toLowerCase().trim()) === -1
    )
  }) : n.indexOf(i.value.toLowerCase().trim()) === -1 && o.push(i), o), []);
}
const ev = {
  maxValues: 1 / 0,
  withCheckIcon: !0,
  checkIconPosition: "left",
  hiddenInputValuesDivider: ","
}, ma = q((e, t) => {
  const n = j("MultiSelect", ev, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    vars: c,
    size: l,
    value: u,
    defaultValue: d,
    onChange: f,
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
    wrapperProps: un,
    description: Ue,
    label: It,
    error: qe,
    maxValues: De,
    searchable: ge,
    nothingFoundMessage: At,
    withCheckIcon: qt,
    checkIconPosition: se,
    hidePickedOptions: Ot,
    withErrorStyles: Jp,
    name: Qp,
    form: Zp,
    id: em,
    clearable: tm,
    clearButtonProps: nm,
    hiddenInputProps: rm,
    placeholder: sc,
    hiddenInputValuesDivider: om,
    ...im
  } = n, ci = Gt(em), li = Pd(g), hr = Qs(li), Fe = la({
    opened: h,
    defaultOpened: w,
    onDropdownOpen: y,
    onDropdownClose: () => {
      b == null || b(), Fe.resetSelectedOption();
    }
  }), {
    styleProps: sm,
    rest: { type: ID, ...am }
  } = po(im), [$e, On] = _t({
    value: u,
    defaultValue: d,
    finalValue: [],
    onChange: f
  }), [br, yr] = _t({
    value: $,
    defaultValue: M,
    finalValue: "",
    onChange: _
  }), ui = te({
    name: "MultiSelect",
    classes: {},
    props: n,
    classNames: r,
    styles: s,
    unstyled: a
  }), { resolvedClassNames: ac, resolvedStyles: cc } = Au({
    props: n,
    styles: s,
    classNames: r
  }), cm = (ce) => {
    p == null || p(ce), ce.key === " " && !ge && (ce.preventDefault(), Fe.toggleDropdown()), ce.key === "Backspace" && br.length === 0 && $e.length > 0 && On($e.slice(0, $e.length - 1));
  }, lm = $e.map((ce, di) => {
    var dc;
    return /* @__PURE__ */ x.createElement(
      Wn,
      {
        key: `${ce}-${di}`,
        withRemoveButton: !A,
        onRemove: () => On($e.filter((um) => ce !== um)),
        unstyled: a,
        ...ui("pill")
      },
      ((dc = hr[ce]) == null ? void 0 : dc.label) || ce
    );
  });
  W(() => {
    v && Fe.selectFirstOption();
  }, [v, $e]);
  const lc = tm && $e.length > 0 && !L && !A && /* @__PURE__ */ x.createElement(
    J.ClearButton,
    {
      size: l,
      ...nm,
      onClear: () => {
        On([]), yr("");
      }
    }
  ), uc = Zy({ data: li, value: $e });
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(
    J,
    {
      store: Fe,
      classNames: ac,
      styles: cc,
      unstyled: a,
      size: l,
      readOnly: A,
      __staticSelector: "MultiSelect",
      onOptionSubmit: (ce) => {
        S == null || S(ce), yr(""), Fe.updateSelectedOptionIndex("selected"), $e.includes(hr[ce].value) ? On($e.filter((di) => di !== hr[ce].value)) : $e.length < De && On([...$e, hr[ce].value]);
      },
      ...C
    },
    /* @__PURE__ */ x.createElement(J.DropdownTarget, null, /* @__PURE__ */ x.createElement(
      Wr,
      {
        ...sm,
        __staticSelector: "MultiSelect",
        classNames: ac,
        styles: cc,
        unstyled: a,
        size: l,
        className: o,
        style: i,
        variant: m,
        disabled: L,
        radius: G,
        rightSection: X || lc || /* @__PURE__ */ x.createElement(J.Chevron, { size: l, error: qe, unstyled: a }),
        rightSectionPointerEvents: ve || (lc ? "all" : "none"),
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
        wrapperProps: un,
        description: Ue,
        label: It,
        error: qe,
        multiline: !0,
        withErrorStyles: Jp,
        __stylesApiProps: { ...n, multiline: !0 },
        pointer: !ge,
        onClick: () => ge ? Fe.openDropdown() : Fe.toggleDropdown(),
        "data-expanded": Fe.dropdownOpened || void 0,
        id: ci
      },
      /* @__PURE__ */ x.createElement(Wn.Group, { disabled: L, unstyled: a, ...ui("pillsList") }, lm, /* @__PURE__ */ x.createElement(J.EventsTarget, null, /* @__PURE__ */ x.createElement(
        Wr.Field,
        {
          ...am,
          ref: t,
          id: ci,
          placeholder: sc,
          type: !ge && !sc ? "hidden" : "visible",
          ...ui("inputField"),
          unstyled: a,
          onFocus: (ce) => {
            I == null || I(ce), ge && Fe.openDropdown();
          },
          onBlur: (ce) => {
            B == null || B(ce), Fe.closeDropdown(), ge && Fe.closeDropdown(), yr("");
          },
          onKeyDown: cm,
          value: br,
          onChange: (ce) => {
            yr(ce.currentTarget.value), ge && Fe.openDropdown(), v && Fe.selectFirstOption();
          },
          disabled: L,
          readOnly: A || !ge,
          pointer: !ge
        }
      )))
    )),
    /* @__PURE__ */ x.createElement(
      Td,
      {
        data: Ot ? uc : li,
        hidden: A || L,
        filter: P,
        search: br,
        limit: E,
        hiddenWhenEmpty: !ge || !At || Ot && uc.length === 0 && br.trim().length === 0,
        withScrollArea: O,
        maxDropdownHeight: T,
        filterOptions: ge,
        value: $e,
        checkIconPosition: se,
        withCheckIcon: qt,
        nothingFoundMessage: At,
        unstyled: a,
        labelId: `${ci}-label`
      }
    )
  ), /* @__PURE__ */ x.createElement(
    "input",
    {
      type: "hidden",
      name: Qp,
      value: $e.join(om),
      form: Zp,
      disabled: L,
      ...rm
    }
  ));
});
ma.classes = { ...Ht.classes, ...J.classes };
ma.displayName = "@mantine/core/MultiSelect";
const tv = {
  duration: 100,
  transition: "fade"
};
function nv(e, t) {
  return { ...tv, ...t, ...e };
}
function rv({
  offset: e,
  position: t
}) {
  const [n, r] = U(!1), o = z(), { x: i, y: s, elements: a, refs: c, update: l, placement: u } = js({
    placement: t,
    middleware: [
      Ms({
        crossAxis: !0,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  }), d = u.includes("right") ? e : t.includes("left") ? e * -1 : 0, f = u.includes("bottom") ? e : t.includes("top") ? e * -1 : 0, p = Q(
    ({ clientX: m, clientY: g }) => {
      c.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: m,
            y: g,
            left: m + d,
            top: g + f,
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
var Ro = { tooltip: "m-1b3c8819", arrow: "m-f898399f" };
const ov = {
  refProp: "ref",
  withinPortal: !0,
  offset: 10,
  position: "right",
  zIndex: ws("popover")
}, iv = (e, { radius: t, color: n }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : bt(t),
    "--tooltip-bg": n ? kt(n, e) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), ga = q((e, t) => {
  const n = j("TooltipFloating", ov, e), {
    children: r,
    refProp: o,
    withinPortal: i,
    style: s,
    className: a,
    classNames: c,
    styles: l,
    unstyled: u,
    radius: d,
    color: f,
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
    classes: Ro,
    className: a,
    style: s,
    classNames: c,
    styles: l,
    unstyled: u,
    rootSelector: "tooltip",
    vars: v,
    varsResolver: iv
  }), { handleMouseMove: O, x: T, y: $, opened: M, boundaryRef: _, floating: A, setOpened: L } = rv({
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
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(yo, { ...S, withinPortal: i }, /* @__PURE__ */ x.createElement(
    H,
    {
      ...C,
      ...E("tooltip", {
        style: {
          ...Ds(s, P),
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
  )), an(r, {
    ...r.props,
    [o]: I,
    onMouseEnter: B,
    onMouseLeave: N
  }));
});
ga.classes = Ro;
ga.displayName = "@mantine/core/TooltipFloating";
const zd = sn(!1), sv = zd.Provider, av = () => ut(zd), cv = {
  openDelay: 0,
  closeDelay: 0
};
function Vd(e) {
  const { openDelay: t, closeDelay: n, children: r } = j("TooltipGroup", cv, e);
  return /* @__PURE__ */ x.createElement(sv, { value: !0 }, /* @__PURE__ */ x.createElement(sb, { delay: { open: t, close: n } }, r));
}
Vd.displayName = "@mantine/core/TooltipGroup";
function lv(e) {
  var C, P, E;
  const [t, n] = U(!1), o = typeof e.opened == "boolean" ? e.opened : t, i = av(), s = Gt(), { delay: a, currentId: c, setCurrentId: l } = ud(), u = Q(
    (O) => {
      n(O), O && l(s);
    },
    [l, s]
  ), {
    x: d,
    y: f,
    context: p,
    refs: m,
    update: g,
    placement: h,
    middlewareData: { arrow: { x: w, y } = {} }
  } = js({
    placement: e.position,
    open: o,
    onOpenChange: u,
    middleware: [
      Ku(e.offset),
      Ms({ padding: 8 }),
      Hu(),
      nd({ element: e.arrowRef, padding: e.arrowOffset }),
      ...e.inline ? [qu()] : []
    ]
  }), { getReferenceProps: b, getFloatingProps: v } = bb([
    ib(p, {
      enabled: (C = e.events) == null ? void 0 : C.hover,
      delay: i ? a : { open: e.openDelay, close: e.closeDelay },
      mouseOnly: !((P = e.events) != null && P.touch)
    }),
    hb(p, { enabled: (E = e.events) == null ? void 0 : E.focus, keyboardOnly: !0 }),
    yb(p, { role: "tooltip" }),
    // cannot be used with controlled tooltip, page jumps
    gb(p, { enabled: typeof e.opened > "u" }),
    ab(p, { id: s })
  ]);
  bd({
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
    x: d,
    y: f,
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
const Wc = {
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
  zIndex: ws("popover"),
  positionDependencies: []
}, uv = (e, { radius: t, color: n }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : bt(t),
    "--tooltip-bg": n ? kt(n, e) : void 0,
    "--tooltip-color": n ? "var(--mantine-color-white)" : void 0
  }
}), cr = q((e, t) => {
  const n = j("Tooltip", Wc, e), {
    children: r,
    position: o,
    refProp: i,
    label: s,
    openDelay: a,
    closeDelay: c,
    onPositionChange: l,
    opened: u,
    withinPortal: d,
    radius: f,
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
  } = j("Tooltip", Wc, n), { dir: Ne } = rr(), we = z(null), re = lv({
    position: dd(Ne, o),
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
    classes: Ro,
    className: y,
    style: w,
    classNames: m,
    styles: g,
    unstyled: h,
    rootSelector: "tooltip",
    vars: ne,
    varsResolver: uv
  });
  if (!Vt(r))
    throw new Error(
      "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const _e = Oe(re.reference, r.ref, t), Ee = nv(O, { duration: 100, transition: "fade" });
  return /* @__PURE__ */ x.createElement(x.Fragment, null, /* @__PURE__ */ x.createElement(yo, { ...ve, withinPortal: d }, /* @__PURE__ */ x.createElement(
    Vs,
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
        zs,
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
  )), an(
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
cr.classes = Ro;
cr.displayName = "@mantine/core/Tooltip";
cr.Floating = ga;
cr.Group = Vd;
const dv = {
  searchable: !1,
  withCheckIcon: !0,
  allowDeselect: !0,
  checkIconPosition: "left"
}, lr = q((e, t) => {
  const n = j("Select", dv, e), {
    classNames: r,
    styles: o,
    unstyled: i,
    vars: s,
    dropdownOpened: a,
    defaultDropdownOpened: c,
    onDropdownClose: l,
    onDropdownOpen: u,
    onFocus: d,
    onBlur: f,
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
  } = n, Pe = Mr(() => Pd(g), [g]), ke = Mr(() => Qs(Pe), [Pe]), ae = Gt(we), [Y, un] = _t({
    value: h,
    defaultValue: w,
    finalValue: null,
    onChange: m
  }), Ue = typeof Y == "string" ? ke[Y] : void 0, [It, qe] = _t({
    value: G,
    defaultValue: X,
    finalValue: Ue ? Ue.label : "",
    onChange: ne
  }), De = la({
    opened: a,
    defaultOpened: c,
    onDropdownOpen: u,
    onDropdownClose: () => {
      l == null || l(), De.resetSelectedOption();
    }
  }), { resolvedClassNames: ge, resolvedStyles: At } = Au({
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
        un(null), qe("");
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
        un(Ot), qe(typeof Ot == "string" ? ke[se].label : ""), De.closeDropdown();
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
          M && De.openDropdown(), d == null || d(se);
        },
        onBlur: (se) => {
          var Ot;
          M && De.closeDropdown(), qe(Y != null && ((Ot = ke[Y]) == null ? void 0 : Ot.label) || ""), f == null || f(se);
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
      Td,
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
lr.classes = { ...Ht.classes, ...J.classes };
lr.displayName = "@mantine/core/Select";
const fv = {}, ha = q((e, t) => {
  const { w: n, h: r, miw: o, mih: i, ...s } = j("Space", fv, e);
  return /* @__PURE__ */ x.createElement(H, { ref: t, ...s, w: n, miw: o ?? n, h: r, mih: i ?? r });
});
ha.displayName = "@mantine/core/Space";
const [pv, ba] = Wt(
  "Tabs component was not found in the tree"
);
var ur = { root: "m-89d60db1", "list--default": "m-576c9d4", list: "m-89d33d6d", panel: "m-b0c91715", tab: "m-4ec4dce6", tabSection: "m-fc420b1f", "tab--default": "m-539e827b", "list--outline": "m-6772fbd5", "tab--outline": "m-b59ab47c", "tab--pills": "m-c3381914" };
const mv = {}, ya = q((e, t) => {
  const n = j("TabsList", mv, e), { children: r, className: o, grow: i, justify: s, classNames: a, styles: c, style: l, ...u } = n, d = ba();
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...u,
      ...d.getStyles("list", {
        className: o,
        style: l,
        classNames: a,
        styles: c,
        props: n,
        variant: d.variant
      }),
      ref: t,
      role: "tablist",
      variant: d.variant,
      mod: {
        grow: i,
        orientation: d.orientation,
        placement: d.orientation === "vertical" && d.placement,
        inverted: d.inverted
      },
      "aria-orientation": d.orientation,
      __vars: { "--tabs-justify": s }
    },
    r
  );
});
ya.classes = ur;
ya.displayName = "@mantine/core/TabsList";
const gv = {}, va = q((e, t) => {
  const n = j("TabsPanel", gv, e), { children: r, className: o, value: i, classNames: s, styles: a, style: c, ...l } = n, u = ba(), d = u.value === i, f = u.keepMounted || n.keepMounted || d ? r : null;
  return /* @__PURE__ */ x.createElement(
    H,
    {
      ...l,
      ...u.getStyles("panel", {
        className: o,
        classNames: s,
        styles: a,
        style: [c, d ? void 0 : { display: "none" }],
        props: n
      }),
      ref: t,
      mod: { orientation: u.orientation },
      role: "tabpanel",
      id: u.getPanelId(i),
      "aria-labelledby": u.getTabId(i)
    },
    f
  );
});
va.classes = ur;
va.displayName = "@mantine/core/TabsPanel";
const hv = {}, wa = q((e, t) => {
  const n = j("TabsTab", hv, e), {
    className: r,
    children: o,
    rightSection: i,
    leftSection: s,
    value: a,
    onClick: c,
    onKeyDown: l,
    disabled: u,
    color: d,
    style: f,
    classNames: p,
    styles: m,
    vars: g,
    ...h
  } = n, w = vt(), { dir: y } = rr(), b = ba(), v = a === b.value, S = (P) => {
    b.onChange(b.allowTabDeactivation && a === b.value ? null : a), c == null || c(P);
  }, C = { classNames: p, styles: m, props: n };
  return /* @__PURE__ */ x.createElement(
    En,
    {
      ...h,
      ...b.getStyles("tab", { className: r, style: f, variant: b.variant, ...C }),
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
      __vars: { "--tabs-color": d ? kt(d, w) : void 0 },
      onKeyDown: pu({
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
wa.classes = ur;
wa.displayName = "@mantine/core/TabsTab";
const Gc = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value", bv = {
  keepMounted: !0,
  orientation: "horizontal",
  loop: !0,
  activateTabWithKeyboard: !0,
  allowTabDeactivation: !1,
  unstyled: !1,
  inverted: !1,
  variant: "default",
  placement: "left"
}, yv = (e, { radius: t, color: n }) => ({
  root: {
    "--tabs-radius": bt(t),
    "--tabs-color": kt(n, e)
  }
}), st = q((e, t) => {
  const n = j("Tabs", bv, e), {
    defaultValue: r,
    value: o,
    onChange: i,
    orientation: s,
    children: a,
    loop: c,
    id: l,
    activateTabWithKeyboard: u,
    allowTabDeactivation: d,
    variant: f,
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
    classes: ur,
    className: S,
    style: C,
    classNames: y,
    styles: b,
    unstyled: v,
    vars: P,
    varsResolver: yv
  });
  return /* @__PURE__ */ x.createElement(
    pv,
    {
      value: {
        placement: h,
        value: T,
        orientation: s,
        id: O,
        loop: c,
        activateTabWithKeyboard: u,
        getTabId: _r(`${O}-tab`, Gc),
        getPanelId: _r(`${O}-panel`, Gc),
        onChange: $,
        allowTabDeactivation: d,
        variant: f,
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
        variant: f,
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
st.classes = ur;
st.displayName = "@mantine/core/Tabs";
st.Tab = wa;
st.Panel = va;
st.List = ya;
const vv = {}, xa = q((e, t) => {
  const n = j("TextInput", vv, e);
  return /* @__PURE__ */ x.createElement(Ht, { component: "input", ref: t, ...n, __staticSelector: "TextInput" });
});
xa.classes = Ht.classes;
xa.displayName = "@mantine/core/TextInput";
const wv = ["h1", "h2", "h3", "h4", "h5", "h6"];
function xv(e, t) {
  const n = t !== void 0 ? t : `h${e}`;
  return wv.includes(n) ? {
    fontSize: `var(--mantine-${n}-font-size)`,
    fontWeight: `var(--mantine-${n}-font-weight)`,
    lineHeight: `var(--mantine-${n}-line-height)`
  } : {
    fontSize: D(n),
    fontWeight: `var(--mantine-h${e}-font-weight)`,
    lineHeight: `var(--mantine-h${e}-line-height)`
  };
}
var Wd = { root: "m-8a5d1357" };
const Sv = {
  order: 1
}, Cv = (e, { order: t, size: n, lineClamp: r }) => {
  const o = xv(t, n);
  return {
    root: {
      "--title-fw": o.fontWeight,
      "--title-lh": o.lineHeight,
      "--title-fz": o.fontSize,
      "--title-line-clamp": typeof r == "number" ? r.toString() : void 0
    }
  };
}, Dn = q((e, t) => {
  const n = j("Title", Sv, e), {
    classNames: r,
    className: o,
    style: i,
    styles: s,
    unstyled: a,
    order: c,
    vars: l,
    size: u,
    variant: d,
    lineClamp: f,
    ...p
  } = n, m = te({
    name: "Title",
    props: n,
    classes: Wd,
    className: o,
    style: i,
    classNames: r,
    styles: s,
    unstyled: a,
    vars: l,
    varsResolver: Cv
  });
  return [1, 2, 3, 4, 5, 6].includes(c) ? /* @__PURE__ */ x.createElement(
    H,
    {
      ...m("root"),
      component: `h${c}`,
      variant: d,
      ref: t,
      mod: { order: c, "data-line-clamp": typeof f == "number" },
      size: u,
      ...p
    }
  ) : null;
});
Dn.classes = Wd;
Dn.displayName = "@mantine/core/Title";
const Ev = {
  /** Put your mantine theme override here */
};
function Pv() {
  if (console && console.warn) {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    typeof t[0] == "string" && (t[0] = `react-i18next:: ${t[0]}`), console.warn(...t);
  }
}
const Hc = {};
function Zi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  typeof t[0] == "string" && Hc[t[0]] || (typeof t[0] == "string" && (Hc[t[0]] = /* @__PURE__ */ new Date()), Pv(...t));
}
const Gd = (e, t) => () => {
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
function Uc(e, t, n) {
  e.loadNamespaces(t, Gd(e, n));
}
function qc(e, t, n, r) {
  typeof n == "string" && (n = [n]), n.forEach((o) => {
    e.options.ns.indexOf(o) < 0 && e.options.ns.push(o);
  }), e.loadLanguages(t, Gd(e, r));
}
function Dv(e, t) {
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
function Rv(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return !t.languages || !t.languages.length ? (Zi("i18n.languages were undefined or empty", t.languages), !0) : t.options.ignoreJSONStructure !== void 0 ? t.hasLoadedNamespace(e, {
    lng: n.lng,
    precheck: (o, i) => {
      if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && o.services.backendConnector.backend && o.isLanguageChangingTo && !i(o.isLanguageChangingTo, e))
        return !1;
    }
  }) : Dv(e, t, n);
}
const Iv = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Av = {
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
}, Ov = (e) => Av[e], Nv = (e) => e.replace(Iv, Ov);
let es = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Nv
};
function $v() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  es = {
    ...es,
    ...e
  };
}
function Tv() {
  return es;
}
let Hd;
function Lv(e) {
  Hd = e;
}
function Mv() {
  return Hd;
}
const _v = {
  type: "3rdParty",
  init(e) {
    $v(e.options.react), Lv(e);
  }
}, kv = sn();
class Fv {
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
const Bv = (e, t) => {
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
  } = ut(kv) || {}, i = n || r || Mv();
  if (i && !i.reportNamespaces && (i.reportNamespaces = new Fv()), !i) {
    Zi("You will need to pass in an i18next instance by using initReactI18next");
    const b = (S, C) => typeof C == "string" ? C : C && typeof C == "object" && typeof C.defaultValue == "string" ? C.defaultValue : Array.isArray(S) ? S[S.length - 1] : S, v = [b, {}, !1];
    return v.t = b, v.i18n = {}, v.ready = !1, v;
  }
  i.options.react && i.options.react.wait !== void 0 && Zi("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const s = {
    ...Tv(),
    ...i.options.react,
    ...t
  }, {
    useSuspense: a,
    keyPrefix: c
  } = s;
  let l = e || o || i.options && i.options.defaultNS;
  l = typeof l == "string" ? [l] : l || ["translation"], i.reportNamespaces.addUsedNamespaces && i.reportNamespaces.addUsedNamespaces(l);
  const u = (i.isInitialized || i.initializedStoreOnce) && l.every((b) => Rv(b, i, s));
  function d() {
    return i.getFixedT(t.lng || null, s.nsMode === "fallback" ? l : l[0], c);
  }
  const [f, p] = U(d);
  let m = l.join();
  t.lng && (m = `${t.lng}${m}`);
  const g = Bv(m), h = z(!0);
  W(() => {
    const {
      bindI18n: b,
      bindI18nStore: v
    } = s;
    h.current = !0, !u && !a && (t.lng ? qc(i, t.lng, l, () => {
      h.current && p(d);
    }) : Uc(i, l, () => {
      h.current && p(d);
    })), u && g && g !== m && h.current && p(d);
    function S() {
      h.current && p(d);
    }
    return b && i && i.on(b, S), v && i && i.store.on(v, S), () => {
      h.current = !1, b && i && b.split(" ").forEach((C) => i.off(C, S)), v && i && v.split(" ").forEach((C) => i.store.off(C, S));
    };
  }, [i, m]);
  const w = z(!0);
  W(() => {
    h.current && !w.current && p(d), w.current = !1;
  }, [i, c]);
  const y = [f, i, u];
  if (y.t = f, y.i18n = i, y.ready = u, u || !u && !a)
    return y;
  throw new Promise((b) => {
    t.lng ? qc(i, t.lng, l, () => b()) : Uc(i, l, () => b());
  });
}
var Ud = { exports: {} }, qd = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vn = x;
function jv(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var zv = typeof Object.is == "function" ? Object.is : jv, Vv = vn.useState, Wv = vn.useEffect, Gv = vn.useLayoutEffect, Hv = vn.useDebugValue;
function Uv(e, t) {
  var n = t(), r = Vv({ inst: { value: n, getSnapshot: t } }), o = r[0].inst, i = r[1];
  return Gv(function() {
    o.value = n, o.getSnapshot = t, Ei(o) && i({ inst: o });
  }, [e, n, t]), Wv(function() {
    return Ei(o) && i({ inst: o }), e(function() {
      Ei(o) && i({ inst: o });
    });
  }, [e]), Hv(n), n;
}
function Ei(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !zv(e, n);
  } catch {
    return !0;
  }
}
function qv(e, t) {
  return t();
}
var Kv = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? qv : Uv;
qd.useSyncExternalStore = vn.useSyncExternalStore !== void 0 ? vn.useSyncExternalStore : Kv;
Ud.exports = qd;
var Kd = Ud.exports, Yd = { exports: {} }, Xd = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Io = x, Yv = Kd;
function Xv(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Jv = typeof Object.is == "function" ? Object.is : Xv, Qv = Yv.useSyncExternalStore, Zv = Io.useRef, e0 = Io.useEffect, t0 = Io.useMemo, n0 = Io.useDebugValue;
Xd.useSyncExternalStoreWithSelector = function(e, t, n, r, o) {
  var i = Zv(null);
  if (i.current === null) {
    var s = { hasValue: !1, value: null };
    i.current = s;
  } else
    s = i.current;
  i = t0(function() {
    function c(p) {
      if (!l) {
        if (l = !0, u = p, p = r(p), o !== void 0 && s.hasValue) {
          var m = s.value;
          if (o(m, p))
            return d = m;
        }
        return d = p;
      }
      if (m = d, Jv(u, p))
        return m;
      var g = r(p);
      return o !== void 0 && o(m, g) ? m : (u = p, d = g);
    }
    var l = !1, u, d, f = n === void 0 ? null : n;
    return [function() {
      return c(t());
    }, f === null ? void 0 : function() {
      return c(f());
    }];
  }, [t, n, r, o]);
  var a = Qv(e, i[0], i[1]);
  return e0(function() {
    s.hasValue = !0, s.value = a;
  }, [a]), n0(a), a;
};
Yd.exports = Xd;
var r0 = Yd.exports;
function o0(e) {
  e();
}
let Jd = o0;
const i0 = (e) => Jd = e, s0 = () => Jd, Kc = Symbol.for("react-redux-context"), Yc = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function a0() {
  var e;
  if (!R.createContext)
    return {};
  const t = (e = Yc[Kc]) != null ? e : Yc[Kc] = /* @__PURE__ */ new Map();
  let n = t.get(R.createContext);
  return n || (n = R.createContext(null), t.set(R.createContext, n)), n;
}
const Pt = /* @__PURE__ */ a0();
function Sa(e = Pt) {
  return function() {
    return ut(e);
  };
}
const Qd = /* @__PURE__ */ Sa(), Zd = () => {
  throw new Error("uSES not initialized!");
};
let ef = Zd;
const c0 = (e) => {
  ef = e;
}, l0 = (e, t) => e === t;
function u0(e = Pt) {
  const t = e === Pt ? Qd : Sa(e);
  return function(r, o = {}) {
    const {
      equalityFn: i = l0,
      stabilityCheck: s = void 0,
      noopCheck: a = void 0
    } = typeof o == "function" ? {
      equalityFn: o
    } : o, {
      store: c,
      subscription: l,
      getServerState: u,
      stabilityCheck: d,
      noopCheck: f
    } = t();
    z(!0);
    const p = Q({
      [r.name](g) {
        return r(g);
      }
    }[r.name], [r, d, s]), m = ef(l.addNestedSub, c.getState, u || c.getState, p, i);
    return mm(m), m;
  };
}
const d0 = /* @__PURE__ */ u0();
var tf = { exports: {} }, Z = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var me = typeof Symbol == "function" && Symbol.for, Ca = me ? Symbol.for("react.element") : 60103, Ea = me ? Symbol.for("react.portal") : 60106, Ao = me ? Symbol.for("react.fragment") : 60107, Oo = me ? Symbol.for("react.strict_mode") : 60108, No = me ? Symbol.for("react.profiler") : 60114, $o = me ? Symbol.for("react.provider") : 60109, To = me ? Symbol.for("react.context") : 60110, Pa = me ? Symbol.for("react.async_mode") : 60111, Lo = me ? Symbol.for("react.concurrent_mode") : 60111, Mo = me ? Symbol.for("react.forward_ref") : 60112, _o = me ? Symbol.for("react.suspense") : 60113, f0 = me ? Symbol.for("react.suspense_list") : 60120, ko = me ? Symbol.for("react.memo") : 60115, Fo = me ? Symbol.for("react.lazy") : 60116, p0 = me ? Symbol.for("react.block") : 60121, m0 = me ? Symbol.for("react.fundamental") : 60117, g0 = me ? Symbol.for("react.responder") : 60118, h0 = me ? Symbol.for("react.scope") : 60119;
function He(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Ca:
        switch (e = e.type, e) {
          case Pa:
          case Lo:
          case Ao:
          case No:
          case Oo:
          case _o:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case To:
              case Mo:
              case Fo:
              case ko:
              case $o:
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
function nf(e) {
  return He(e) === Lo;
}
Z.AsyncMode = Pa;
Z.ConcurrentMode = Lo;
Z.ContextConsumer = To;
Z.ContextProvider = $o;
Z.Element = Ca;
Z.ForwardRef = Mo;
Z.Fragment = Ao;
Z.Lazy = Fo;
Z.Memo = ko;
Z.Portal = Ea;
Z.Profiler = No;
Z.StrictMode = Oo;
Z.Suspense = _o;
Z.isAsyncMode = function(e) {
  return nf(e) || He(e) === Pa;
};
Z.isConcurrentMode = nf;
Z.isContextConsumer = function(e) {
  return He(e) === To;
};
Z.isContextProvider = function(e) {
  return He(e) === $o;
};
Z.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ca;
};
Z.isForwardRef = function(e) {
  return He(e) === Mo;
};
Z.isFragment = function(e) {
  return He(e) === Ao;
};
Z.isLazy = function(e) {
  return He(e) === Fo;
};
Z.isMemo = function(e) {
  return He(e) === ko;
};
Z.isPortal = function(e) {
  return He(e) === Ea;
};
Z.isProfiler = function(e) {
  return He(e) === No;
};
Z.isStrictMode = function(e) {
  return He(e) === Oo;
};
Z.isSuspense = function(e) {
  return He(e) === _o;
};
Z.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Ao || e === Lo || e === No || e === Oo || e === _o || e === f0 || typeof e == "object" && e !== null && (e.$$typeof === Fo || e.$$typeof === ko || e.$$typeof === $o || e.$$typeof === To || e.$$typeof === Mo || e.$$typeof === m0 || e.$$typeof === g0 || e.$$typeof === h0 || e.$$typeof === p0);
};
Z.typeOf = He;
tf.exports = Z;
var b0 = tf.exports, Da = b0, y0 = {
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
}, v0 = {
  name: !0,
  length: !0,
  prototype: !0,
  caller: !0,
  callee: !0,
  arguments: !0,
  arity: !0
}, w0 = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, rf = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, Ra = {};
Ra[Da.ForwardRef] = w0;
Ra[Da.Memo] = rf;
function Xc(e) {
  return Da.isMemo(e) ? rf : Ra[e.$$typeof] || y0;
}
var x0 = Object.defineProperty, S0 = Object.getOwnPropertyNames, Jc = Object.getOwnPropertySymbols, C0 = Object.getOwnPropertyDescriptor, E0 = Object.getPrototypeOf, Qc = Object.prototype;
function of(e, t, n) {
  if (typeof t != "string") {
    if (Qc) {
      var r = E0(t);
      r && r !== Qc && of(e, r, n);
    }
    var o = S0(t);
    Jc && (o = o.concat(Jc(t)));
    for (var i = Xc(e), s = Xc(t), a = 0; a < o.length; ++a) {
      var c = o[a];
      if (!v0[c] && !(n && n[c]) && !(s && s[c]) && !(i && i[c])) {
        var l = C0(t, c);
        try {
          x0(e, c, l);
        } catch {
        }
      }
    }
  }
  return e;
}
var P0 = of;
const Zc = /* @__PURE__ */ cu(P0);
var sf = { exports: {} }, ee = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ia = Symbol.for("react.element"), Aa = Symbol.for("react.portal"), Bo = Symbol.for("react.fragment"), jo = Symbol.for("react.strict_mode"), zo = Symbol.for("react.profiler"), Vo = Symbol.for("react.provider"), Wo = Symbol.for("react.context"), D0 = Symbol.for("react.server_context"), Go = Symbol.for("react.forward_ref"), Ho = Symbol.for("react.suspense"), Uo = Symbol.for("react.suspense_list"), qo = Symbol.for("react.memo"), Ko = Symbol.for("react.lazy"), R0 = Symbol.for("react.offscreen"), af;
af = Symbol.for("react.module.reference");
function rt(e) {
  if (typeof e == "object" && e !== null) {
    var t = e.$$typeof;
    switch (t) {
      case Ia:
        switch (e = e.type, e) {
          case Bo:
          case zo:
          case jo:
          case Ho:
          case Uo:
            return e;
          default:
            switch (e = e && e.$$typeof, e) {
              case D0:
              case Wo:
              case Go:
              case Ko:
              case qo:
              case Vo:
                return e;
              default:
                return t;
            }
        }
      case Aa:
        return t;
    }
  }
}
ee.ContextConsumer = Wo;
ee.ContextProvider = Vo;
ee.Element = Ia;
ee.ForwardRef = Go;
ee.Fragment = Bo;
ee.Lazy = Ko;
ee.Memo = qo;
ee.Portal = Aa;
ee.Profiler = zo;
ee.StrictMode = jo;
ee.Suspense = Ho;
ee.SuspenseList = Uo;
ee.isAsyncMode = function() {
  return !1;
};
ee.isConcurrentMode = function() {
  return !1;
};
ee.isContextConsumer = function(e) {
  return rt(e) === Wo;
};
ee.isContextProvider = function(e) {
  return rt(e) === Vo;
};
ee.isElement = function(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ia;
};
ee.isForwardRef = function(e) {
  return rt(e) === Go;
};
ee.isFragment = function(e) {
  return rt(e) === Bo;
};
ee.isLazy = function(e) {
  return rt(e) === Ko;
};
ee.isMemo = function(e) {
  return rt(e) === qo;
};
ee.isPortal = function(e) {
  return rt(e) === Aa;
};
ee.isProfiler = function(e) {
  return rt(e) === zo;
};
ee.isStrictMode = function(e) {
  return rt(e) === jo;
};
ee.isSuspense = function(e) {
  return rt(e) === Ho;
};
ee.isSuspenseList = function(e) {
  return rt(e) === Uo;
};
ee.isValidElementType = function(e) {
  return typeof e == "string" || typeof e == "function" || e === Bo || e === zo || e === jo || e === Ho || e === Uo || e === R0 || typeof e == "object" && e !== null && (e.$$typeof === Ko || e.$$typeof === qo || e.$$typeof === Vo || e.$$typeof === Wo || e.$$typeof === Go || e.$$typeof === af || e.getModuleId !== void 0);
};
ee.typeOf = rt;
sf.exports = ee;
var I0 = sf.exports;
const A0 = ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"];
function O0(e, t, n, r, {
  areStatesEqual: o,
  areOwnPropsEqual: i,
  areStatePropsEqual: s
}) {
  let a = !1, c, l, u, d, f;
  function p(y, b) {
    return c = y, l = b, u = e(c, l), d = t(r, l), f = n(u, d, l), a = !0, f;
  }
  function m() {
    return u = e(c, l), t.dependsOnOwnProps && (d = t(r, l)), f = n(u, d, l), f;
  }
  function g() {
    return e.dependsOnOwnProps && (u = e(c, l)), t.dependsOnOwnProps && (d = t(r, l)), f = n(u, d, l), f;
  }
  function h() {
    const y = e(c, l), b = !s(y, u);
    return u = y, b && (f = n(u, d, l)), f;
  }
  function w(y, b) {
    const v = !i(b, l), S = !o(y, c, b, l);
    return c = y, l = b, v && S ? m() : v ? g() : S ? h() : f;
  }
  return function(b, v) {
    return a ? w(b, v) : p(b, v);
  };
}
function N0(e, t) {
  let {
    initMapStateToProps: n,
    initMapDispatchToProps: r,
    initMergeProps: o
  } = t, i = Bd(t, A0);
  const s = n(e, i), a = r(e, i), c = o(e, i);
  return O0(s, a, c, e, i);
}
function $0(e, t) {
  const n = {};
  for (const r in e) {
    const o = e[r];
    typeof o == "function" && (n[r] = (...i) => t(o(...i)));
  }
  return n;
}
function ts(e) {
  return function(n) {
    const r = e(n);
    function o() {
      return r;
    }
    return o.dependsOnOwnProps = !1, o;
  };
}
function el(e) {
  return e.dependsOnOwnProps ? !!e.dependsOnOwnProps : e.length !== 1;
}
function cf(e, t) {
  return function(r, {
    displayName: o
  }) {
    const i = function(a, c) {
      return i.dependsOnOwnProps ? i.mapToProps(a, c) : i.mapToProps(a, void 0);
    };
    return i.dependsOnOwnProps = !0, i.mapToProps = function(a, c) {
      i.mapToProps = e, i.dependsOnOwnProps = el(e);
      let l = i(a, c);
      return typeof l == "function" && (i.mapToProps = l, i.dependsOnOwnProps = el(l), l = i(a, c)), l;
    }, i;
  };
}
function Oa(e, t) {
  return (n, r) => {
    throw new Error(`Invalid value of type ${typeof e} for ${t} argument when connecting component ${r.wrappedComponentName}.`);
  };
}
function T0(e) {
  return e && typeof e == "object" ? ts((t) => (
    // @ts-ignore
    $0(e, t)
  )) : e ? typeof e == "function" ? (
    // @ts-ignore
    cf(e)
  ) : Oa(e, "mapDispatchToProps") : ts((t) => ({
    dispatch: t
  }));
}
function L0(e) {
  return e ? typeof e == "function" ? (
    // @ts-ignore
    cf(e)
  ) : Oa(e, "mapStateToProps") : ts(() => ({}));
}
function M0(e, t, n) {
  return $t({}, n, e, t);
}
function _0(e) {
  return function(n, {
    displayName: r,
    areMergedPropsEqual: o
  }) {
    let i = !1, s;
    return function(c, l, u) {
      const d = e(c, l, u);
      return i ? o(d, s) || (s = d) : (i = !0, s = d), s;
    };
  };
}
function k0(e) {
  return e ? typeof e == "function" ? _0(e) : Oa(e, "mergeProps") : () => M0;
}
function F0() {
  const e = s0();
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
const tl = {
  notify() {
  },
  get: () => []
};
function lf(e, t) {
  let n, r = tl, o = 0, i = !1;
  function s(g) {
    u();
    const h = r.subscribe(g);
    let w = !1;
    return () => {
      w || (w = !0, h(), d());
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
    o++, n || (n = t ? t.addNestedSub(c) : e.subscribe(c), r = F0());
  }
  function d() {
    o--, n && o === 0 && (n(), n = void 0, r.clear(), r = tl);
  }
  function f() {
    i || (i = !0, u());
  }
  function p() {
    i && (i = !1, d());
  }
  const m = {
    addNestedSub: s,
    notifyNestedSubs: a,
    handleChangeWrapper: c,
    isSubscribed: l,
    trySubscribe: f,
    tryUnsubscribe: p,
    getListeners: () => r
  };
  return m;
}
const B0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Gr = B0 ? R.useLayoutEffect : R.useEffect;
function nl(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Pi(e, t) {
  if (nl(e, t))
    return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (let o = 0; o < n.length; o++)
    if (!Object.prototype.hasOwnProperty.call(t, n[o]) || !nl(e[n[o]], t[n[o]]))
      return !1;
  return !0;
}
const j0 = ["reactReduxForwardedRef"];
let uf = Zd;
const z0 = (e) => {
  uf = e;
}, V0 = [null, null];
function W0(e, t, n) {
  Gr(() => e(...t), n);
}
function G0(e, t, n, r, o, i) {
  e.current = r, n.current = !1, o.current && (o.current = null, i());
}
function H0(e, t, n, r, o, i, s, a, c, l, u) {
  if (!e)
    return () => {
    };
  let d = !1, f = null;
  const p = () => {
    if (d || !a.current)
      return;
    const g = t.getState();
    let h, w;
    try {
      h = r(g, o.current);
    } catch (y) {
      w = y, f = y;
    }
    w || (f = null), h === i.current ? s.current || l() : (i.current = h, c.current = h, s.current = !0, u());
  };
  return n.onStateChange = p, n.trySubscribe(), p(), () => {
    if (d = !0, n.tryUnsubscribe(), n.onStateChange = null, f)
      throw f;
  };
}
function U0(e, t) {
  return e === t;
}
function df(e, t, n, {
  // The `pure` option has been removed, so TS doesn't like us destructuring this to check its existence.
  // @ts-ignore
  pure: r,
  areStatesEqual: o = U0,
  areOwnPropsEqual: i = Pi,
  areStatePropsEqual: s = Pi,
  areMergedPropsEqual: a = Pi,
  // use React's forwardRef to expose a ref of the wrapped component
  forwardRef: c = !1,
  // the context consumer to use
  context: l = Pt
} = {}) {
  const u = l, d = L0(e), f = T0(t), p = k0(n), m = !!e;
  return (h) => {
    const w = h.displayName || h.name || "Component", y = `Connect(${w})`, b = {
      shouldHandleStateChanges: m,
      displayName: y,
      wrappedComponentName: w,
      WrappedComponent: h,
      // @ts-ignore
      initMapStateToProps: d,
      // @ts-ignore
      initMapDispatchToProps: f,
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
        } = P, Y = Bd(P, j0);
        return [P.context, ae, Y];
      }, [P]), $ = R.useMemo(() => E && E.Consumer && // @ts-ignore
      I0.isContextConsumer(/* @__PURE__ */ R.createElement(E.Consumer, null)) ? E : u, [E, u]), M = R.useContext($), _ = !!P.store && !!P.store.getState && !!P.store.dispatch, A = !!M && !!M.store, L = _ ? P.store : M.store, I = A ? M.getServerState : L.getState, B = R.useMemo(() => N0(L.dispatch, b), [L]), [N, G] = R.useMemo(() => {
        if (!m)
          return V0;
        const ae = lf(L, _ ? void 0 : M.subscription), Y = ae.notifyNestedSubs.bind(ae);
        return [ae, Y];
      }, [L, _, M]), X = R.useMemo(() => _ ? M : $t({}, M, {
        subscription: N
      }), [_, M, N]), ne = R.useRef(), ve = R.useRef(T), le = R.useRef(), Ne = R.useRef(!1);
      R.useRef(!1);
      const we = R.useRef(!1), re = R.useRef();
      Gr(() => (we.current = !0, () => {
        we.current = !1;
      }), []);
      const xe = R.useMemo(() => () => le.current && T === ve.current ? le.current : B(L.getState(), T), [L, T]), _e = R.useMemo(() => (Y) => N ? H0(
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
      W0(G0, [ve, ne, Ne, T, le, G]);
      let Ee;
      try {
        Ee = uf(
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
      Gr(() => {
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
      return E.displayName = y, E.WrappedComponent = h, Zc(E, h);
    }
    return Zc(C, h);
  };
}
function ff({
  store: e,
  context: t,
  children: n,
  serverState: r,
  stabilityCheck: o = "once",
  noopCheck: i = "once"
}) {
  const s = R.useMemo(() => {
    const l = lf(e);
    return {
      store: e,
      subscription: l,
      getServerState: r ? () => r : void 0,
      stabilityCheck: o,
      noopCheck: i
    };
  }, [e, r, o, i]), a = R.useMemo(() => e.getState(), [e]);
  Gr(() => {
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
function pf(e = Pt) {
  const t = (
    // @ts-ignore
    e === Pt ? Qd : (
      // @ts-ignore
      Sa(e)
    )
  );
  return function() {
    const {
      store: r
    } = t();
    return r;
  };
}
const q0 = /* @__PURE__ */ pf();
function K0(e = Pt) {
  const t = (
    // @ts-ignore
    e === Pt ? q0 : pf(e)
  );
  return function() {
    return t().dispatch;
  };
}
const Y0 = /* @__PURE__ */ K0();
c0(r0.useSyncExternalStoreWithSelector);
z0(Kd.useSyncExternalStore);
i0(bm);
const dr = Y0, ue = d0;
function be(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var X0 = /* @__PURE__ */ (() => typeof Symbol == "function" && Symbol.observable || "@@observable")(), rl = X0, Di = () => Math.random().toString(36).substring(7).split("").join("."), J0 = {
  INIT: `@@redux/INIT${Di()}`,
  REPLACE: `@@redux/REPLACE${Di()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${Di()}`
}, Hr = J0;
function Na(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function mf(e, t, n) {
  if (typeof e != "function")
    throw new Error(be(2));
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(be(0));
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(be(1));
    return n(mf)(e, t);
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
  function d(h) {
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
  function f(h) {
    if (!Na(h))
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
    r = h, f({
      type: Hr.REPLACE
    });
  }
  function m() {
    const h = d;
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
      [rl]() {
        return this;
      }
    };
  }
  return f({
    type: Hr.INIT
  }), {
    dispatch: f,
    subscribe: d,
    getState: u,
    replaceReducer: p,
    [rl]: m
  };
}
function Q0(e) {
  Object.keys(e).forEach((t) => {
    const n = e[t];
    if (typeof n(void 0, {
      type: Hr.INIT
    }) > "u")
      throw new Error(be(12));
    if (typeof n(void 0, {
      type: Hr.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(be(13));
  });
}
function Z0(e) {
  const t = Object.keys(e), n = {};
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    typeof e[s] == "function" && (n[s] = e[s]);
  }
  const r = Object.keys(n);
  let o;
  try {
    Q0(n);
  } catch (i) {
    o = i;
  }
  return function(s = {}, a) {
    if (o)
      throw o;
    let c = !1;
    const l = {};
    for (let u = 0; u < r.length; u++) {
      const d = r[u], f = n[d], p = s[d], m = f(p, a);
      if (typeof m > "u")
        throw a && a.type, new Error(be(14));
      l[d] = m, c = c || m !== p;
    }
    return c = c || r.length !== Object.keys(s).length, c ? l : s;
  };
}
function Ur(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, n) => (...r) => t(n(...r)));
}
function ew(...e) {
  return (t) => (n, r) => {
    const o = t(n, r);
    let i = () => {
      throw new Error(be(15));
    };
    const s = {
      getState: o.getState,
      dispatch: (c, ...l) => i(c, ...l)
    }, a = e.map((c) => c(s));
    return i = Ur(...a)(o.dispatch), {
      ...o,
      dispatch: i
    };
  };
}
function tw(e) {
  return Na(e) && "type" in e && typeof e.type == "string";
}
var gf = Symbol.for("immer-nothing"), ol = Symbol.for("immer-draftable"), We = Symbol.for("immer-state");
function ot(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var wn = Object.getPrototypeOf;
function jt(e) {
  return !!e && !!e[We];
}
function Dt(e) {
  var t;
  return e ? hf(e) || Array.isArray(e) || !!e[ol] || !!((t = e.constructor) != null && t[ol]) || Xo(e) || Jo(e) : !1;
}
var nw = Object.prototype.constructor.toString();
function hf(e) {
  if (!e || typeof e != "object")
    return !1;
  const t = wn(e);
  if (t === null)
    return !0;
  const n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return n === Object ? !0 : typeof n == "function" && Function.toString.call(n) === nw;
}
function Gn(e, t) {
  Yo(e) === 0 ? Object.entries(e).forEach(([n, r]) => {
    t(n, r, e);
  }) : e.forEach((n, r) => t(r, n, e));
}
function Yo(e) {
  const t = e[We];
  return t ? t.type_ : Array.isArray(e) ? 1 : Xo(e) ? 2 : Jo(e) ? 3 : 0;
}
function ns(e, t) {
  return Yo(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function bf(e, t, n) {
  const r = Yo(e);
  r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : e[t] = n;
}
function rw(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function Xo(e) {
  return e instanceof Map;
}
function Jo(e) {
  return e instanceof Set;
}
function Xt(e) {
  return e.copy_ || e.base_;
}
function rs(e, t) {
  if (Xo(e))
    return new Map(e);
  if (Jo(e))
    return new Set(e);
  if (Array.isArray(e))
    return Array.prototype.slice.call(e);
  if (!t && hf(e))
    return wn(e) ? { ...e } : Object.assign(/* @__PURE__ */ Object.create(null), e);
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
  return Object.create(wn(e), n);
}
function $a(e, t = !1) {
  return Qo(e) || jt(e) || !Dt(e) || (Yo(e) > 1 && (e.set = e.add = e.clear = e.delete = ow), Object.freeze(e), t && Gn(e, (n, r) => $a(r, !0))), e;
}
function ow() {
  ot(2);
}
function Qo(e) {
  return Object.isFrozen(e);
}
var iw = {};
function rn(e) {
  const t = iw[e];
  return t || ot(0, e), t;
}
var Hn;
function yf() {
  return Hn;
}
function sw(e, t) {
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
function il(e, t) {
  t && (rn("Patches"), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function os(e) {
  is(e), e.drafts_.forEach(aw), e.drafts_ = null;
}
function is(e) {
  e === Hn && (Hn = e.parent_);
}
function sl(e) {
  return Hn = sw(Hn, e);
}
function aw(e) {
  const t = e[We];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function al(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const n = t.drafts_[0];
  return e !== void 0 && e !== n ? (n[We].modified_ && (os(t), ot(4)), Dt(e) && (e = qr(t, e), t.parent_ || Kr(t, e)), t.patches_ && rn("Patches").generateReplacementPatches_(
    n[We].base_,
    e,
    t.patches_,
    t.inversePatches_
  )) : e = qr(t, n, []), os(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== gf ? e : void 0;
}
function qr(e, t, n) {
  if (Qo(t))
    return t;
  const r = t[We];
  if (!r)
    return Gn(
      t,
      (o, i) => cl(e, r, t, o, i, n)
    ), t;
  if (r.scope_ !== e)
    return t;
  if (!r.modified_)
    return Kr(e, r.base_, !0), r.base_;
  if (!r.finalized_) {
    r.finalized_ = !0, r.scope_.unfinalizedDrafts_--;
    const o = r.copy_;
    let i = o, s = !1;
    r.type_ === 3 && (i = new Set(o), o.clear(), s = !0), Gn(
      i,
      (a, c) => cl(e, r, o, a, c, n, s)
    ), Kr(e, o, !1), n && e.patches_ && rn("Patches").generatePatches_(
      r,
      n,
      e.patches_,
      e.inversePatches_
    );
  }
  return r.copy_;
}
function cl(e, t, n, r, o, i, s) {
  if (jt(o)) {
    const a = i && t && t.type_ !== 3 && // Set objects are atomic since they have no keys.
    !ns(t.assigned_, r) ? i.concat(r) : void 0, c = qr(e, o, a);
    if (bf(n, r, c), jt(c))
      e.canAutoFreeze_ = !1;
    else
      return;
  } else
    s && n.add(o);
  if (Dt(o) && !Qo(o)) {
    if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
      return;
    qr(e, o), (!t || !t.scope_.parent_) && Kr(e, o);
  }
}
function Kr(e, t, n = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && $a(t, n);
}
function cw(e, t) {
  const n = Array.isArray(e), r = {
    type_: n ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : yf(),
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
  let o = r, i = Ta;
  n && (o = [r], i = Un);
  const { revoke: s, proxy: a } = Proxy.revocable(o, i);
  return r.draft_ = a, r.revoke_ = s, a;
}
var Ta = {
  get(e, t) {
    if (t === We)
      return e;
    const n = Xt(e);
    if (!ns(n, t))
      return lw(e, n, t);
    const r = n[t];
    return e.finalized_ || !Dt(r) ? r : r === Ri(e.base_, t) ? (Ii(e), e.copy_[t] = as(r, e)) : r;
  },
  has(e, t) {
    return t in Xt(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(Xt(e));
  },
  set(e, t, n) {
    const r = vf(Xt(e), t);
    if (r != null && r.set)
      return r.set.call(e.draft_, n), !0;
    if (!e.modified_) {
      const o = Ri(Xt(e), t), i = o == null ? void 0 : o[We];
      if (i && i.base_ === n)
        return e.copy_[t] = n, e.assigned_[t] = !1, !0;
      if (rw(n, o) && (n !== void 0 || ns(e.base_, t)))
        return !0;
      Ii(e), ss(e);
    }
    return e.copy_[t] === n && // special case: handle new props with value 'undefined'
    (n !== void 0 || t in e.copy_) || // special case: NaN
    Number.isNaN(n) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = n, e.assigned_[t] = !0), !0;
  },
  deleteProperty(e, t) {
    return Ri(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_[t] = !1, Ii(e), ss(e)) : delete e.assigned_[t], e.copy_ && delete e.copy_[t], !0;
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
    return wn(e.base_);
  },
  setPrototypeOf() {
    ot(12);
  }
}, Un = {};
Gn(Ta, (e, t) => {
  Un[e] = function() {
    return arguments[0] = arguments[0][0], t.apply(this, arguments);
  };
});
Un.deleteProperty = function(e, t) {
  return Un.set.call(this, e, t, void 0);
};
Un.set = function(e, t, n) {
  return Ta.set.call(this, e[0], t, n, e[0]);
};
function Ri(e, t) {
  const n = e[We];
  return (n ? Xt(n) : e)[t];
}
function lw(e, t, n) {
  var o;
  const r = vf(t, n);
  return r ? "value" in r ? r.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (o = r.get) == null ? void 0 : o.call(e.draft_)
  ) : void 0;
}
function vf(e, t) {
  if (!(t in e))
    return;
  let n = wn(e);
  for (; n; ) {
    const r = Object.getOwnPropertyDescriptor(n, t);
    if (r)
      return r;
    n = wn(n);
  }
}
function ss(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && ss(e.parent_));
}
function Ii(e) {
  e.copy_ || (e.copy_ = rs(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var uw = class {
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
        const i = sl(this), s = as(t, void 0);
        let a = !0;
        try {
          o = n(s), a = !1;
        } finally {
          a ? os(i) : is(i);
        }
        return il(i, r), al(o, i);
      } else if (!t || typeof t != "object") {
        if (o = n(t), o === void 0 && (o = t), o === gf && (o = void 0), this.autoFreeze_ && $a(o, !0), r) {
          const i = [], s = [];
          rn("Patches").generateReplacementPatches_(t, o, i, s), r(i, s);
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
    Dt(e) || ot(8), jt(e) && (e = wf(e));
    const t = sl(this), n = as(e, void 0);
    return n[We].isManual_ = !0, is(t), n;
  }
  finishDraft(e, t) {
    const n = e && e[We];
    (!n || !n.isManual_) && ot(9);
    const { scope_: r } = n;
    return il(r, t), al(void 0, r);
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
    const r = rn("Patches").applyPatches_;
    return jt(e) ? r(e, t) : this.produce(
      e,
      (o) => r(o, t)
    );
  }
};
function as(e, t) {
  const n = Xo(e) ? rn("MapSet").proxyMap_(e, t) : Jo(e) ? rn("MapSet").proxySet_(e, t) : cw(e, t);
  return (t ? t.scope_ : yf()).drafts_.push(n), n;
}
function wf(e) {
  return jt(e) || ot(10, e), xf(e);
}
function xf(e) {
  if (!Dt(e) || Qo(e))
    return e;
  const t = e[We];
  let n;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, n = rs(e, t.scope_.immer_.useStrictShallowCopy_);
  } else
    n = rs(e, !0);
  return Gn(n, (r, o) => {
    bf(n, r, xf(o));
  }), t && (t.finalized_ = !1), n;
}
var Ge = new uw(), Sf = Ge.produce;
Ge.produceWithPatches.bind(
  Ge
);
Ge.setAutoFreeze.bind(Ge);
Ge.setUseStrictShallowCopy.bind(Ge);
Ge.applyPatches.bind(Ge);
Ge.createDraft.bind(Ge);
Ge.finishDraft.bind(Ge);
function dw(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function fw(e, t = `expected an object, instead received ${typeof e}`) {
  if (typeof e != "object")
    throw new TypeError(t);
}
function pw(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((n) => typeof n == "function")) {
    const n = e.map(
      (r) => typeof r == "function" ? `function ${r.name || "unnamed"}()` : typeof r
    ).join(", ");
    throw new TypeError(`${t}[${n}]`);
  }
}
var ll = (e) => Array.isArray(e) ? e : [e];
function mw(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return pw(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function gw(e, t) {
  const n = [], { length: r } = e;
  for (let o = 0; o < r; o++)
    n.push(e[o].apply(null, t));
  return n;
}
var hw = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, bw = typeof WeakRef < "u" ? WeakRef : hw, yw = 0, ul = 1;
function Sr() {
  return {
    s: yw,
    v: void 0,
    o: null,
    p: null
  };
}
function La(e, t = {}) {
  let n = Sr();
  const { resultEqualityCheck: r } = t;
  let o, i = 0;
  function s() {
    var d;
    let a = n;
    const { length: c } = arguments;
    for (let f = 0, p = c; f < p; f++) {
      const m = arguments[f];
      if (typeof m == "function" || typeof m == "object" && m !== null) {
        let g = a.o;
        g === null && (a.o = g = /* @__PURE__ */ new WeakMap());
        const h = g.get(m);
        h === void 0 ? (a = Sr(), g.set(m, a)) : a = h;
      } else {
        let g = a.p;
        g === null && (a.p = g = /* @__PURE__ */ new Map());
        const h = g.get(m);
        h === void 0 ? (a = Sr(), g.set(m, a)) : a = h;
      }
    }
    const l = a;
    let u;
    if (a.s === ul ? u = a.v : (u = e.apply(null, arguments), i++), l.s = ul, r) {
      const f = ((d = o == null ? void 0 : o.deref) == null ? void 0 : d.call(o)) ?? o;
      f != null && r(f, u) && (u = f, i !== 0 && i--), o = typeof u == "object" && u !== null || typeof u == "function" ? new bw(u) : u;
    }
    return l.v = u, u;
  }
  return s.clearCache = () => {
    n = Sr(), s.resetResultsCount();
  }, s.resultsCount = () => i, s.resetResultsCount = () => {
    i = 0;
  }, s;
}
function Cf(e, ...t) {
  const n = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, r = (...o) => {
    let i = 0, s = 0, a, c = {}, l = o.pop();
    typeof l == "object" && (c = l, l = o.pop()), dw(
      l,
      `createSelector expects an output function after the inputs, but received: [${typeof l}]`
    );
    const u = {
      ...n,
      ...c
    }, {
      memoize: d,
      memoizeOptions: f = [],
      argsMemoize: p = La,
      argsMemoizeOptions: m = [],
      devModeChecks: g = {}
    } = u, h = ll(f), w = ll(m), y = mw(o), b = d(function() {
      return i++, l.apply(
        null,
        arguments
      );
    }, ...h), v = p(function() {
      s++;
      const C = gw(
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
      memoize: d,
      argsMemoize: p
    });
  };
  return Object.assign(r, {
    withTypes: () => r
  }), r;
}
var Ef = /* @__PURE__ */ Cf(La), vw = Object.assign(
  (e, t = Ef) => {
    fw(
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
  { withTypes: () => vw }
);
function Pf(e) {
  return ({ dispatch: n, getState: r }) => (o) => (i) => typeof i == "function" ? i(n, r, e) : o(i);
}
var ww = Pf(), xw = Pf, Sw = (...e) => {
  const t = Cf(...e), n = Object.assign((...r) => {
    const o = t(...r), i = (s, ...a) => o(jt(s) ? wf(s) : s, ...a);
    return Object.assign(i, o), i;
  }, {
    withTypes: () => n
  });
  return n;
};
Sw(La);
var Cw = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? Ur : Ur.apply(null, arguments);
}, Ew = (e) => e && typeof e.match == "function";
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
  return n.toString = () => `${e}`, n.type = e, n.match = (r) => tw(r) && r.type === e, n;
}
var Df = class Fn extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, Fn.prototype);
  }
  static get [Symbol.species]() {
    return Fn;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new Fn(...t[0].concat(this)) : new Fn(...t.concat(this));
  }
};
function dl(e) {
  return Dt(e) ? Sf(e, () => {
  }) : e;
}
function fl(e, t, n) {
  if (e.has(t)) {
    let o = e.get(t);
    return n.update && (o = n.update(o, t, e), e.set(t, o)), o;
  }
  if (!n.insert)
    throw new Error(Me(10));
  const r = n.insert(t, e);
  return e.set(t, r), r;
}
function Pw(e) {
  return typeof e == "boolean";
}
var Dw = () => function(t) {
  const {
    thunk: n = !0,
    immutableCheck: r = !0,
    serializableCheck: o = !0,
    actionCreatorCheck: i = !0
  } = t ?? {};
  let s = new Df();
  return n && (Pw(n) ? s.push(ww) : s.push(xw(n.extraArgument))), s;
}, Rw = "RTK_autoBatch", Rf = (e) => (t) => {
  setTimeout(t, e);
}, Iw = typeof window < "u" && window.requestAnimationFrame ? window.requestAnimationFrame : Rf(10), Aw = (e = {
  type: "raf"
}) => (t) => (...n) => {
  const r = t(...n);
  let o = !0, i = !1, s = !1;
  const a = /* @__PURE__ */ new Set(), c = e.type === "tick" ? queueMicrotask : e.type === "raf" ? Iw : e.type === "callback" ? e.queueNotification : Rf(e.timeout), l = () => {
    s = !1, i && (i = !1, a.forEach((u) => u()));
  };
  return Object.assign({}, r, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(u) {
      const d = () => o && u(), f = r.subscribe(d);
      return a.add(u), () => {
        f(), a.delete(u);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(u) {
      var d;
      try {
        return o = !((d = u == null ? void 0 : u.meta) != null && d[Rw]), i = !o, i && (s || (s = !0, c(l))), r.dispatch(u);
      } finally {
        o = !0;
      }
    }
  });
}, Ow = (e) => function(n) {
  const {
    autoBatch: r = !0
  } = n ?? {};
  let o = new Df(e);
  return r && o.push(Aw(typeof r == "object" ? r : void 0)), o;
}, Nw = !0;
function $w(e) {
  const t = Dw(), {
    reducer: n = void 0,
    middleware: r,
    devTools: o = !0,
    preloadedState: i = void 0,
    enhancers: s = void 0
  } = e || {};
  let a;
  if (typeof n == "function")
    a = n;
  else if (Na(n))
    a = Z0(n);
  else
    throw new Error(Me(1));
  let c;
  typeof r == "function" ? c = r(t) : c = t();
  let l = Ur;
  o && (l = Cw({
    // Enable capture of stack traces for dispatched Redux actions
    trace: !Nw,
    ...typeof o == "object" && o
  }));
  const u = ew(...c), d = Ow(u);
  let f = typeof s == "function" ? s(d) : d();
  const p = l(...f);
  return mf(a, i, p);
}
function If(e) {
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
function Tw(e) {
  return typeof e == "function";
}
function Lw(e, t) {
  let [n, r, o] = If(t), i;
  if (Tw(e))
    i = () => dl(e());
  else {
    const a = dl(e);
    i = () => a;
  }
  function s(a = i(), c) {
    let l = [n[c.type], ...r.filter(({
      matcher: u
    }) => u(c)).map(({
      reducer: u
    }) => u)];
    return l.filter((u) => !!u).length === 0 && (l = [o]), l.reduce((u, d) => {
      if (d)
        if (jt(u)) {
          const p = d(u, c);
          return p === void 0 ? u : p;
        } else {
          if (Dt(u))
            return Sf(u, (f) => d(f, c));
          {
            const f = d(u, c);
            if (f === void 0) {
              if (u === null)
                return u;
              throw new Error(Me(9));
            }
            return f;
          }
        }
      return u;
    }, a);
  }
  return s.getInitialState = i, s;
}
var Mw = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", Af = (e = 21) => {
  let t = "", n = e;
  for (; n--; )
    t += Mw[Math.random() * 64 | 0];
  return t;
}, _w = (e, t) => Ew(e) ? e.match(t) : e(t);
function kw(...e) {
  return (t) => e.some((n) => _w(n, t));
}
var Fw = ["name", "message", "stack", "code"], Ai = class {
  constructor(e, t) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    Re(this, "_type");
    this.payload = e, this.meta = t;
  }
}, pl = class {
  constructor(e, t) {
    /*
    type-only property to distinguish between RejectWithValue and FulfillWithMeta
    does not exist at runtime
    */
    Re(this, "_type");
    this.payload = e, this.meta = t;
  }
}, Bw = (e) => {
  if (typeof e == "object" && e !== null) {
    const t = {};
    for (const n of Fw)
      typeof e[n] == "string" && (t[n] = e[n]);
    return t;
  }
  return {
    message: String(e)
  };
}, Zo = /* @__PURE__ */ (() => {
  function e(t, n, r) {
    const o = St(t + "/fulfilled", (c, l, u, d) => ({
      payload: c,
      meta: {
        ...d || {},
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
    })), s = St(t + "/rejected", (c, l, u, d, f) => ({
      payload: d,
      error: (r && r.serializeError || Bw)(c || "Rejected"),
      meta: {
        ...f || {},
        arg: u,
        requestId: l,
        rejectedWithValue: !!d,
        requestStatus: "rejected",
        aborted: (c == null ? void 0 : c.name) === "AbortError",
        condition: (c == null ? void 0 : c.name) === "ConditionError"
      }
    }));
    function a(c) {
      return (l, u, d) => {
        const f = r != null && r.idGenerator ? r.idGenerator(c) : Af(), p = new AbortController();
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
              extra: d
            });
            if (zw(C) && (C = await C), C === !1 || p.signal.aborted)
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
            l(i(f, c, (S = r == null ? void 0 : r.getPendingMeta) == null ? void 0 : S.call(r, {
              requestId: f,
              arg: c
            }, {
              getState: u,
              extra: d
            }))), y = await Promise.race([P, Promise.resolve(n(c, {
              dispatch: l,
              getState: u,
              extra: d,
              requestId: f,
              signal: p.signal,
              abort: h,
              rejectWithValue: (E, O) => new Ai(E, O),
              fulfillWithValue: (E, O) => new pl(E, O)
            })).then((E) => {
              if (E instanceof Ai)
                throw E;
              return E instanceof pl ? o(E.payload, f, c, E.meta) : o(E, f, c);
            })]);
          } catch (C) {
            y = C instanceof Ai ? s(null, f, c, C.payload, C.meta) : s(C, f, c);
          } finally {
            m && p.signal.removeEventListener("abort", m);
          }
          return r && !r.dispatchConditionRejection && s.match(y) && y.meta.condition || l(y), y;
        }();
        return Object.assign(w, {
          abort: h,
          requestId: f,
          arg: c,
          unwrap() {
            return w.then(jw);
          }
        });
      };
    }
    return Object.assign(a, {
      pending: i,
      rejected: s,
      fulfilled: o,
      settled: kw(s, o),
      typePrefix: t
    });
  }
  return e.withTypes = () => e, e;
})();
function jw(e) {
  if (e.meta && e.meta.rejectedWithValue)
    throw e.payload;
  if (e.error)
    throw e.error;
  return e.payload;
}
function zw(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function";
}
var Vw = Symbol.for("rtk-slice-createasyncthunk");
function Ww(e, t) {
  return `${e}/${t}`;
}
function Gw({
  creators: e
} = {}) {
  var n;
  const t = (n = e == null ? void 0 : e.asyncThunk) == null ? void 0 : n[Vw];
  return function(o) {
    const {
      name: i,
      reducerPath: s = i
    } = o;
    if (!i)
      throw new Error(Me(11));
    typeof process < "u";
    const a = (typeof o.reducers == "function" ? o.reducers(Uw()) : o.reducers) || {}, c = Object.keys(a), l = {
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
        type: Ww(i, b),
        createNotation: typeof o.reducers == "function"
      };
      Kw(v) ? Xw(S, v, u, t) : qw(S, v, u);
    });
    function d() {
      const [b = {}, v = [], S = void 0] = typeof o.extraReducers == "function" ? If(o.extraReducers) : [o.extraReducers], C = {
        ...b,
        ...l.sliceCaseReducersByType
      };
      return Lw(o.initialState, (P) => {
        for (let E in C)
          P.addCase(E, C[E]);
        for (let E of l.sliceMatchers)
          P.addMatcher(E.matcher, E.reducer);
        for (let E of v)
          P.addMatcher(E.matcher, E.reducer);
        S && P.addDefaultCase(S);
      });
    }
    const f = (b) => b, p = /* @__PURE__ */ new Map();
    let m;
    function g(b, v) {
      return m || (m = d()), m(b, v);
    }
    function h() {
      return m || (m = d()), m.getInitialState();
    }
    function w(b, v = !1) {
      function S(P) {
        let E = P[b];
        return typeof E > "u" && v && (E = h()), E;
      }
      function C(P = f) {
        const E = fl(p, v, {
          insert: () => /* @__PURE__ */ new WeakMap()
        });
        return fl(E, P, {
          insert: () => {
            const O = {};
            for (const [T, $] of Object.entries(o.selectors ?? {}))
              O[T] = Hw($, P, h, v);
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
function Hw(e, t, n, r) {
  function o(i, ...s) {
    let a = t(i);
    return typeof a > "u" && r && (a = n()), e(a, ...s);
  }
  return o.unwrapped = e, o;
}
var Ma = Gw();
function Uw() {
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
function qw({
  type: e,
  reducerName: t,
  createNotation: n
}, r, o) {
  let i, s;
  if ("reducer" in r) {
    if (n && !Yw(r))
      throw new Error(Me(17));
    i = r.reducer, s = r.prepare;
  } else
    i = r;
  o.addCase(e, i).exposeCaseReducer(t, i).exposeAction(t, s ? St(e, s) : St(e));
}
function Kw(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function Yw(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function Xw({
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
  } = n, d = o(e, i, u);
  r.exposeAction(t, d), s && r.addCase(d.fulfilled, s), a && r.addCase(d.pending, a), c && r.addCase(d.rejected, c), l && r.addMatcher(d.settled, l), r.exposeCaseReducer(t, {
    fulfilled: s || Cr,
    pending: a || Cr,
    rejected: c || Cr,
    settled: l || Cr
  });
}
function Cr() {
}
var Jw = (e, t) => {
  if (typeof e != "function")
    throw new Error(Me(32));
}, _a = "listenerMiddleware", Qw = (e) => {
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
  return Jw(i), {
    predicate: o,
    type: t,
    effect: i
  };
}, Zw = Object.assign((e) => {
  const {
    type: t,
    predicate: n,
    effect: r
  } = Qw(e);
  return {
    id: Af(),
    effect: r,
    type: t,
    predicate: n,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(Me(22));
    }
  };
}, {
  withTypes: () => Zw
}), ex = Object.assign(St(`${_a}/add`), {
  withTypes: () => ex
});
St(`${_a}/removeAll`);
var tx = Object.assign(St(`${_a}/remove`), {
  withTypes: () => tx
});
function Me(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const nx = {
  test: "https://test.bsdd.buildingsmart.org",
  production: "https://api.bsdd.buildingsmart.org"
}, rx = {
  bsddApiEnvironment: null,
  mainDictionary: null,
  filterDictionaries: [],
  language: "EN"
}, Of = Ma({
  name: "settings",
  initialState: rx,
  reducers: {
    setSettings: (e, t) => {
      e.bsddApiEnvironment = t.payload.bsddApiEnvironment, e.mainDictionary = t.payload.mainDictionary, e.filterDictionaries = t.payload.filterDictionaries, e.language = t.payload.language;
    },
    setBsddApiEnvironment: (e, t) => {
      e.bsddApiEnvironment = t.payload;
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
}), fr = (e) => {
  const t = e.settings.bsddApiEnvironment;
  return t !== null ? nx[t] : null;
}, ka = Ef(
  (e) => e.settings.mainDictionary,
  (e) => e.settings.filterDictionaries,
  (e, t) => e ? [e, ...t] : t
), { setSettings: ox, setBsddApiEnvironment: ix, setMainDictionary: Nf, setFilterDictionaries: Fa, setLanguage: $D } = Of.actions, sx = Of.reducer;
function ax({ id: e }) {
  const t = dr(), { t: n } = Ut(), r = ue((a) => a.settings.mainDictionary), o = ue((a) => a.settings.filterDictionaries), i = ue(ka), s = (a, c) => {
    if ((r == null ? void 0 : r.dictionaryUri) === a) {
      t(Nf({ ...r, parameterMapping: c }));
      return;
    }
    t(
      Fa(
        o.map((l) => l.dictionaryUri === a ? { ...l, parameterMapping: c } : l)
      )
    );
  };
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ F.jsxs(oe.Control, { children: [
      /* @__PURE__ */ F.jsx(Dn, { order: 5, children: n("Parameter mapping") }),
      /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "dimmed", children: n("Parameter mapping help text") })
    ] }),
    /* @__PURE__ */ F.jsx(oe.Panel, { children: i.map((a) => /* @__PURE__ */ F.jsxs("div", { style: { marginBottom: "1em" }, children: [
      /* @__PURE__ */ F.jsx(
        xa,
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
function qn(e) {
  "@babel/helpers - typeof";
  return qn = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, qn(e);
}
function cx(e, t) {
  if (qn(e) != "object" || !e)
    return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (qn(r) != "object")
      return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function lx(e) {
  var t = cx(e, "string");
  return qn(t) == "symbol" ? t : String(t);
}
function ux(e, t, n) {
  return t = lx(t), t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function ml(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(o) {
      return Object.getOwnPropertyDescriptor(e, o).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function gl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ml(Object(n), !0).forEach(function(r) {
      ux(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ml(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Te(e) {
  return "Minified Redux error #" + e + "; visit https://redux.js.org/Errors?code=" + e + " for the full message or use the non-minified dev environment for full errors. ";
}
var hl = function() {
  return typeof Symbol == "function" && Symbol.observable || "@@observable";
}(), Oi = function() {
  return Math.random().toString(36).substring(7).split("").join(".");
}, bl = {
  INIT: "@@redux/INIT" + Oi(),
  REPLACE: "@@redux/REPLACE" + Oi(),
  PROBE_UNKNOWN_ACTION: function() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + Oi();
  }
};
function dx(e) {
  if (typeof e != "object" || e === null)
    return !1;
  for (var t = e; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
function $f(e, t, n) {
  var r;
  if (typeof t == "function" && typeof n == "function" || typeof n == "function" && typeof arguments[3] == "function")
    throw new Error(Te(0));
  if (typeof t == "function" && typeof n > "u" && (n = t, t = void 0), typeof n < "u") {
    if (typeof n != "function")
      throw new Error(Te(1));
    return n($f)(e, t);
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
  function d(g) {
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
  function f(g) {
    if (!dx(g))
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
    o = g, f({
      type: bl.REPLACE
    });
  }
  function m() {
    var g, h = d;
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
    }, g[hl] = function() {
      return this;
    }, g;
  }
  return f({
    type: bl.INIT
  }), r = {
    dispatch: f,
    subscribe: d,
    getState: u,
    replaceReducer: p
  }, r[hl] = m, r;
}
function yl(e, t) {
  return function() {
    return t(e.apply(this, arguments));
  };
}
function vl(e, t) {
  if (typeof e == "function")
    return yl(e, t);
  if (typeof e != "object" || e === null)
    throw new Error(Te(16));
  var n = {};
  for (var r in e) {
    var o = e[r];
    typeof o == "function" && (n[r] = yl(o, t));
  }
  return n;
}
function Tf() {
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
function fx() {
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
      return i = Tf.apply(void 0, a)(o.dispatch), gl(gl({}, o), {}, {
        dispatch: i
      });
    };
  };
}
function px(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0; n < e.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Lf(e, t) {
  var n = U(function() {
    return {
      inputs: t,
      result: e()
    };
  })[0], r = z(!0), o = z(n), i = r.current || !!(t && o.current.inputs && px(t, o.current.inputs)), s = i ? o.current : {
    inputs: t,
    result: e()
  };
  return W(function() {
    r.current = !1, o.current = s;
  }, [s]), s.result;
}
function mx(e, t) {
  return Lf(function() {
    return e;
  }, t);
}
var K = Lf, V = mx, gx = !0, Ni = "Invariant failed";
function hx(e, t) {
  if (!e) {
    if (gx)
      throw new Error(Ni);
    var n = typeof t == "function" ? t() : t, r = n ? "".concat(Ni, ": ").concat(n) : Ni;
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
}, Ba = function(t, n) {
  return {
    top: t.top - n.top,
    left: t.left - n.left,
    bottom: t.bottom + n.bottom,
    right: t.right + n.right
  };
}, wl = function(t, n) {
  return {
    top: t.top + n.top,
    left: t.left + n.left,
    bottom: t.bottom - n.bottom,
    right: t.right - n.right
  };
}, bx = function(t, n) {
  return {
    top: t.top + n.y,
    left: t.left + n.x,
    bottom: t.bottom + n.y,
    right: t.right + n.x
  };
}, $i = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}, ja = function(t) {
  var n = t.borderBox, r = t.margin, o = r === void 0 ? $i : r, i = t.border, s = i === void 0 ? $i : i, a = t.padding, c = a === void 0 ? $i : a, l = at(Ba(n, o)), u = at(wl(n, s)), d = at(wl(u, c));
  return {
    marginBox: l,
    borderBox: at(n),
    paddingBox: u,
    contentBox: d,
    margin: o,
    border: s,
    padding: c
  };
}, Ke = function(t) {
  var n = t.slice(0, -2), r = t.slice(-2);
  if (r !== "px")
    return 0;
  var o = Number(n);
  return isNaN(o) && hx(!1), o;
}, yx = function() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}, Yr = function(t, n) {
  var r = t.borderBox, o = t.border, i = t.margin, s = t.padding, a = bx(r, n);
  return ja({
    borderBox: a,
    border: o,
    margin: i,
    padding: s
  });
}, Xr = function(t, n) {
  return n === void 0 && (n = yx()), Yr(t, n);
}, Mf = function(t, n) {
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
  return ja({
    borderBox: t,
    margin: r,
    padding: o,
    border: i
  });
}, _f = function(t) {
  var n = t.getBoundingClientRect(), r = window.getComputedStyle(t);
  return Mf(n, r);
}, xl = Number.isNaN || function(t) {
  return typeof t == "number" && t !== t;
};
function vx(e, t) {
  return !!(e === t || xl(e) && xl(t));
}
function wx(e, t) {
  if (e.length !== t.length)
    return !1;
  for (var n = 0; n < e.length; n++)
    if (!vx(e[n], t[n]))
      return !1;
  return !0;
}
function de(e, t) {
  t === void 0 && (t = wx);
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
var xx = function(t) {
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
const Kn = xx;
function kf(e, t) {
}
kf.bind(null, "warn");
kf.bind(null, "error");
function Tt() {
}
function Sx(e, t) {
  return {
    ...e,
    ...t
  };
}
function Ye(e, t, n) {
  const r = t.map((o) => {
    const i = Sx(n, o.options);
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
const Cx = "Invariant failed";
class Jr extends Error {
}
Jr.prototype.toString = function() {
  return this.message;
};
function k(e, t) {
  if (!e)
    throw new Jr(Cx);
}
class Ex extends x.Component {
  constructor(...t) {
    super(...t), this.callbacks = null, this.unbind = Tt, this.onWindowError = (n) => {
      const r = this.getCallbacks();
      r.isDragging() && r.tryAbort(), n.error instanceof Jr && n.preventDefault();
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
    if (t instanceof Jr) {
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
const Px = `
  Press space bar to start a drag.
  When dragging you can use the arrow keys to move the item around and escape to cancel.
  Some screen readers may require you to be in focus mode or to use your pass through key
`, Qr = (e) => e + 1, Dx = (e) => `
  You have lifted an item in position ${Qr(e.source.index)}
`, Ff = (e, t) => {
  const n = e.droppableId === t.droppableId, r = Qr(e.index), o = Qr(t.index);
  return n ? `
      You have moved the item from position ${r}
      to position ${o}
    ` : `
    You have moved the item from position ${r}
    in list ${e.droppableId}
    to list ${t.droppableId}
    in position ${o}
  `;
}, Bf = (e, t, n) => t.droppableId === n.droppableId ? `
      The item ${e}
      has been combined with ${n.draggableId}` : `
      The item ${e}
      in list ${t.droppableId}
      has been combined with ${n.draggableId}
      in list ${n.droppableId}
    `, Rx = (e) => {
  const t = e.destination;
  if (t)
    return Ff(e.source, t);
  const n = e.combine;
  return n ? Bf(e.draggableId, e.source, n) : "You are over an area that cannot be dropped on";
}, Sl = (e) => `
  The item has returned to its starting position
  of ${Qr(e.index)}
`, Ix = (e) => {
  if (e.reason === "CANCEL")
    return `
      Movement cancelled.
      ${Sl(e.source)}
    `;
  const t = e.destination, n = e.combine;
  return t ? `
      You have dropped the item.
      ${Ff(e.source, t)}
    ` : n ? `
      You have dropped the item.
      ${Bf(e.draggableId, e.source, n)}
    ` : `
    The item has been dropped while not over a drop area.
    ${Sl(e.source)}
  `;
}, Ax = {
  dragHandleUsageInstructions: Px,
  onDragStart: Dx,
  onDragUpdate: Rx,
  onDragEnd: Ix
};
var Tr = Ax;
const pe = {
  x: 0,
  y: 0
}, ye = (e, t) => ({
  x: e.x + t.x,
  y: e.y + t.y
}), Be = (e, t) => ({
  x: e.x - t.x,
  y: e.y - t.y
}), Lt = (e, t) => e.x === t.x && e.y === t.y, Rn = (e) => ({
  x: e.x !== 0 ? -e.x : 0,
  y: e.y !== 0 ? -e.y : 0
}), on = (e, t, n = 0) => e === "x" ? {
  x: t,
  y: n
} : {
  x: n,
  y: t
}, Yn = (e, t) => Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2), Cl = (e, t) => Math.min(...t.map((n) => Yn(e, n))), jf = (e) => (t) => ({
  x: e(t.x),
  y: e(t.y)
});
var Ox = (e, t) => {
  const n = at({
    top: Math.max(t.top, e.top),
    right: Math.min(t.right, e.right),
    bottom: Math.min(t.bottom, e.bottom),
    left: Math.max(t.left, e.left)
  });
  return n.width <= 0 || n.height <= 0 ? null : n;
};
const pr = (e, t) => ({
  top: e.top + t.y,
  left: e.left + t.x,
  bottom: e.bottom + t.y,
  right: e.right + t.x
}), El = (e) => [{
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
}], Nx = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}, $x = (e, t) => t ? pr(e, t.scroll.diff.displacement) : e, Tx = (e, t, n) => n && n.increasedBy ? {
  ...e,
  [t.end]: e[t.end] + n.increasedBy[t.line]
} : e, Lx = (e, t) => t && t.shouldClipSubject ? Ox(t.pageMarginBox, e) : at(e);
var xn = ({
  page: e,
  withPlaceholder: t,
  axis: n,
  frame: r
}) => {
  const o = $x(e.marginBox, r), i = Tx(o, n, t), s = Lx(i, r);
  return {
    page: e,
    withPlaceholder: t,
    active: s
  };
}, za = (e, t) => {
  e.frame || k(!1);
  const n = e.frame, r = Be(t, n.scroll.initial), o = Rn(r), i = {
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
  }, s = xn({
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
const zf = de((e) => e.reduce((t, n) => (t[n.descriptor.id] = n, t), {})), Vf = de((e) => e.reduce((t, n) => (t[n.descriptor.id] = n, t), {})), ei = de((e) => Object.values(e)), Mx = de((e) => Object.values(e));
var In = de((e, t) => Mx(t).filter((r) => e === r.descriptor.droppableId).sort((r, o) => r.descriptor.index - o.descriptor.index));
function Va(e) {
  return e.at && e.at.type === "REORDER" ? e.at.destination : null;
}
function ti(e) {
  return e.at && e.at.type === "COMBINE" ? e.at.combine : null;
}
var ni = de((e, t) => t.filter((n) => n.descriptor.id !== e.descriptor.id)), _x = ({
  isMovingForward: e,
  draggable: t,
  destination: n,
  insideDestination: r,
  previousImpact: o
}) => {
  if (!n.isCombineEnabled || !Va(o))
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
  const l = ni(t, r);
  if (!c) {
    if (!l.length)
      return null;
    const p = l[l.length - 1];
    return s(p.descriptor.id);
  }
  const u = l.findIndex((p) => p.descriptor.id === c);
  u === -1 && k(!1);
  const d = u - 1;
  if (d < 0)
    return null;
  const f = l[d];
  return s(f.descriptor.id);
}, An = (e, t) => e.descriptor.droppableId === t.descriptor.id;
const Wf = {
  point: pe,
  value: 0
}, Xn = {
  invisible: {},
  visible: {},
  all: []
}, kx = {
  displaced: Xn,
  displacedBy: Wf,
  at: null
};
var Fx = kx, Je = (e, t) => (n) => e <= n && n <= t, Gf = (e) => {
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
}, Bx = (e) => {
  const t = Je(e.top, e.bottom), n = Je(e.left, e.right);
  return (r) => t(r.top) && t(r.bottom) && n(r.left) && n(r.right);
};
const Wa = {
  direction: "vertical",
  line: "y",
  crossAxisLine: "x",
  start: "top",
  end: "bottom",
  size: "height",
  crossAxisStart: "left",
  crossAxisEnd: "right",
  crossAxisSize: "width"
}, Hf = {
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
var jx = (e) => (t) => {
  const n = Je(t.top, t.bottom), r = Je(t.left, t.right);
  return (o) => e === Wa ? n(o.top) && n(o.bottom) : r(o.left) && r(o.right);
};
const zx = (e, t) => {
  const n = t.frame ? t.frame.scroll.diff.displacement : pe;
  return pr(e, n);
}, Vx = (e, t, n) => t.subject.active ? n(t.subject.active)(e) : !1, Wx = (e, t, n) => n(t)(e), Ga = ({
  target: e,
  destination: t,
  viewport: n,
  withDroppableDisplacement: r,
  isVisibleThroughFrameFn: o
}) => {
  const i = r ? zx(e, t) : e;
  return Vx(i, t, o) && Wx(i, n, o);
}, Gx = (e) => Ga({
  ...e,
  isVisibleThroughFrameFn: Gf
}), Uf = (e) => Ga({
  ...e,
  isVisibleThroughFrameFn: Bx
}), Hx = (e) => Ga({
  ...e,
  isVisibleThroughFrameFn: jx(e.destination.axis)
}), Ux = (e, t, n) => {
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
function qx(e, t) {
  const n = e.page.marginBox, r = {
    top: t.point.y,
    right: 0,
    bottom: 0,
    left: t.point.x
  };
  return at(Ba(n, r));
}
function Jn({
  afterDragging: e,
  destination: t,
  displacedBy: n,
  viewport: r,
  forceShouldAnimate: o,
  last: i
}) {
  return e.reduce(function(a, c) {
    const l = qx(c, n), u = c.descriptor.id;
    if (a.all.push(u), !Gx({
      target: l,
      destination: t,
      viewport: r,
      withDroppableDisplacement: !0
    }))
      return a.invisible[c.descriptor.id] = !0, a;
    const f = Ux(u, i, o), p = {
      draggableId: u,
      shouldAnimate: f
    };
    return a.visible[u] = p, a;
  }, {
    all: [],
    visible: {},
    invisible: {}
  });
}
function Kx(e, t) {
  if (!e.length)
    return 0;
  const n = e[e.length - 1].descriptor.index;
  return t.inHomeList ? n : n + 1;
}
function Pl({
  insideDestination: e,
  inHomeList: t,
  displacedBy: n,
  destination: r
}) {
  const o = Kx(e, {
    inHomeList: t
  });
  return {
    displaced: Xn,
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
function Zr({
  draggable: e,
  insideDestination: t,
  destination: n,
  viewport: r,
  displacedBy: o,
  last: i,
  index: s,
  forceShouldAnimate: a
}) {
  const c = An(e, n);
  if (s == null)
    return Pl({
      insideDestination: t,
      inHomeList: c,
      displacedBy: o,
      destination: n
    });
  const l = t.find((m) => m.descriptor.index === s);
  if (!l)
    return Pl({
      insideDestination: t,
      inHomeList: c,
      displacedBy: o,
      destination: n
    });
  const u = ni(e, t), d = t.indexOf(l), f = u.slice(d);
  return {
    displaced: Jn({
      afterDragging: f,
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
var Yx = ({
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
}, Xx = ({
  isMovingForward: e,
  isInHomeList: t,
  insideDestination: n,
  location: r
}) => {
  if (!n.length)
    return null;
  const o = r.index, i = e ? o + 1 : o - 1, s = n[0].descriptor.index, a = n[n.length - 1].descriptor.index, c = t ? a : a + 1;
  return i < s || i > c ? null : i;
}, Jx = ({
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
    const d = Xx({
      isMovingForward: e,
      isInHomeList: t,
      location: l.destination,
      insideDestination: i
    });
    return d == null ? null : Zr({
      draggable: n,
      insideDestination: i,
      destination: o,
      viewport: a,
      last: s.displaced,
      displacedBy: s.displacedBy,
      index: d
    });
  }
  const u = Yx({
    isMovingForward: e,
    destination: o,
    displaced: s.displaced,
    draggables: r,
    combine: l.combine,
    afterCritical: c
  });
  return u == null ? null : Zr({
    draggable: n,
    insideDestination: i,
    destination: o,
    viewport: a,
    last: s.displaced,
    displacedBy: s.displacedBy,
    index: u
  });
}, Qx = ({
  displaced: e,
  afterCritical: t,
  combineWith: n,
  displacedBy: r
}) => {
  const o = !!(e.visible[n] || e.invisible[n]);
  return zt(n, t) ? o ? pe : Rn(r.point) : o ? r.point : pe;
}, Zx = ({
  afterCritical: e,
  impact: t,
  draggables: n
}) => {
  const r = ti(t);
  r || k(!1);
  const o = r.draggableId, i = n[o].page.borderBox.center, s = Qx({
    displaced: t.displaced,
    afterCritical: e,
    combineWith: o,
    displacedBy: t.displacedBy
  });
  return ye(i, s);
};
const qf = (e, t) => t.margin[e.start] + t.borderBox[e.size] / 2, eS = (e, t) => t.margin[e.end] + t.borderBox[e.size] / 2, Ha = (e, t, n) => t[e.crossAxisStart] + n.margin[e.crossAxisStart] + n.borderBox[e.crossAxisSize] / 2, Dl = ({
  axis: e,
  moveRelativeTo: t,
  isMoving: n
}) => on(e.line, t.marginBox[e.end] + qf(e, n), Ha(e, t.marginBox, n)), Rl = ({
  axis: e,
  moveRelativeTo: t,
  isMoving: n
}) => on(e.line, t.marginBox[e.start] - eS(e, n), Ha(e, t.marginBox, n)), tS = ({
  axis: e,
  moveInto: t,
  isMoving: n
}) => on(e.line, t.contentBox[e.start] + qf(e, n), Ha(e, t.contentBox, n));
var nS = ({
  impact: e,
  draggable: t,
  draggables: n,
  droppable: r,
  afterCritical: o
}) => {
  const i = In(r.descriptor.id, n), s = t.page, a = r.axis;
  if (!i.length)
    return tS({
      axis: a,
      moveInto: r.page,
      isMoving: s
    });
  const {
    displaced: c,
    displacedBy: l
  } = e, u = c.all[0];
  if (u) {
    const f = n[u];
    if (zt(u, o))
      return Rl({
        axis: a,
        moveRelativeTo: f.page,
        isMoving: s
      });
    const p = Yr(f.page, l.point);
    return Rl({
      axis: a,
      moveRelativeTo: p,
      isMoving: s
    });
  }
  const d = i[i.length - 1];
  if (d.descriptor.id === t.descriptor.id)
    return s.borderBox.center;
  if (zt(d.descriptor.id, o)) {
    const f = Yr(d.page, Rn(o.displacedBy.point));
    return Dl({
      axis: a,
      moveRelativeTo: f,
      isMoving: s
    });
  }
  return Dl({
    axis: a,
    moveRelativeTo: d.page,
    isMoving: s
  });
}, cs = (e, t) => {
  const n = e.frame;
  return n ? ye(t, n.scroll.diff.displacement) : t;
};
const rS = ({
  impact: e,
  draggable: t,
  droppable: n,
  draggables: r,
  afterCritical: o
}) => {
  const i = t.page.borderBox.center, s = e.at;
  return !n || !s ? i : s.type === "REORDER" ? nS({
    impact: e,
    draggable: t,
    draggables: r,
    droppable: n,
    afterCritical: o
  }) : Zx({
    impact: e,
    draggables: r,
    afterCritical: o
  });
};
var ri = (e) => {
  const t = rS(e), n = e.droppable;
  return n ? cs(n, t) : t;
}, Kf = (e, t) => {
  const n = Be(t, e.scroll.initial), r = Rn(n);
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
function oS(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t[n].visible[e];
    if (r)
      return r;
  }
  return null;
}
var iS = ({
  impact: e,
  viewport: t,
  destination: n,
  draggables: r,
  maxScrollChange: o
}) => {
  const i = Kf(t, ye(t.scroll.current, o)), s = n.frame ? za(n, ye(n.frame.scroll.current, o)) : n, a = e.displaced, c = Jn({
    afterDragging: Il(a.all, r),
    destination: n,
    displacedBy: e.displacedBy,
    viewport: i.frame,
    last: a,
    forceShouldAnimate: !1
  }), l = Jn({
    afterDragging: Il(a.all, r),
    destination: s,
    displacedBy: e.displacedBy,
    viewport: t.frame,
    last: a,
    forceShouldAnimate: !1
  }), u = {}, d = {}, f = [a, c, l];
  return a.all.forEach((m) => {
    const g = oS(m, f);
    if (g) {
      d[m] = g;
      return;
    }
    u[m] = !0;
  }), {
    ...e,
    displaced: {
      all: a.all,
      invisible: u,
      visible: d
    }
  };
}, sS = (e, t) => ye(e.scroll.diff.displacement, t), Ua = ({
  pageBorderBoxCenter: e,
  draggable: t,
  viewport: n
}) => {
  const r = sS(n, e), o = Be(r, t.page.borderBox.center);
  return ye(t.client.borderBox.center, o);
}, Yf = ({
  draggable: e,
  destination: t,
  newPageBorderBoxCenter: n,
  viewport: r,
  withDroppableDisplacement: o,
  onlyOnMainAxis: i = !1
}) => {
  const s = Be(n, e.page.borderBox.center), c = {
    target: pr(e.page.borderBox, s),
    destination: t,
    withDroppableDisplacement: o,
    viewport: r
  };
  return i ? Hx(c) : Uf(c);
}, aS = ({
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
  const l = In(n.descriptor.id, r), u = An(t, n), d = _x({
    isMovingForward: e,
    draggable: t,
    destination: n,
    insideDestination: l,
    previousImpact: o
  }) || Jx({
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
  if (!d)
    return null;
  const f = ri({
    impact: d,
    draggable: t,
    droppable: n,
    draggables: r,
    afterCritical: c
  });
  if (Yf({
    draggable: t,
    destination: n,
    newPageBorderBoxCenter: f,
    viewport: i.frame,
    withDroppableDisplacement: !1,
    onlyOnMainAxis: !0
  }))
    return {
      clientSelection: Ua({
        pageBorderBoxCenter: f,
        draggable: t,
        viewport: i
      }),
      impact: d,
      scrollJumpRequest: null
    };
  const m = Be(f, s), g = iS({
    impact: d,
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
var cS = ({
  isMovingForward: e,
  pageBorderBoxCenter: t,
  source: n,
  droppables: r,
  viewport: o
}) => {
  const i = n.subject.active;
  if (!i)
    return null;
  const s = n.axis, a = Je(i[s.start], i[s.end]), c = ei(r).filter((u) => u !== n).filter((u) => u.isEnabled).filter((u) => !!u.subject.active).filter((u) => Gf(o.frame)(Ie(u))).filter((u) => {
    const d = Ie(u);
    return e ? i[s.crossAxisEnd] < d[s.crossAxisEnd] : d[s.crossAxisStart] < i[s.crossAxisStart];
  }).filter((u) => {
    const d = Ie(u), f = Je(d[s.start], d[s.end]);
    return a(d[s.start]) || a(d[s.end]) || f(i[s.start]) || f(i[s.end]);
  }).sort((u, d) => {
    const f = Ie(u)[s.crossAxisStart], p = Ie(d)[s.crossAxisStart];
    return e ? f - p : p - f;
  }).filter((u, d, f) => Ie(u)[s.crossAxisStart] === Ie(f[0])[s.crossAxisStart]);
  if (!c.length)
    return null;
  if (c.length === 1)
    return c[0];
  const l = c.filter((u) => Je(Ie(u)[s.start], Ie(u)[s.end])(t[s.line]));
  return l.length === 1 ? l[0] : l.length > 1 ? l.sort((u, d) => Ie(u)[s.start] - Ie(d)[s.start])[0] : c.sort((u, d) => {
    const f = Cl(t, El(Ie(u))), p = Cl(t, El(Ie(d)));
    return f !== p ? f - p : Ie(u)[s.start] - Ie(d)[s.start];
  })[0];
};
const Al = (e, t) => {
  const n = e.page.borderBox.center;
  return zt(e.descriptor.id, t) ? Be(n, t.displacedBy.point) : n;
}, lS = (e, t) => {
  const n = e.page.borderBox;
  return zt(e.descriptor.id, t) ? pr(n, Rn(t.displacedBy.point)) : n;
};
var uS = ({
  pageBorderBoxCenter: e,
  viewport: t,
  destination: n,
  insideDestination: r,
  afterCritical: o
}) => r.filter((s) => Uf({
  target: lS(s, o),
  destination: n,
  viewport: t.frame,
  withDroppableDisplacement: !0
})).sort((s, a) => {
  const c = Yn(e, cs(n, Al(s, o))), l = Yn(e, cs(n, Al(a, o)));
  return c < l ? -1 : l < c ? 1 : s.descriptor.index - a.descriptor.index;
})[0] || null, mr = de(function(t, n) {
  const r = n[t.line];
  return {
    value: r,
    point: on(t.line, r)
  };
});
const dS = (e, t, n) => {
  const r = e.axis;
  if (e.descriptor.mode === "virtual")
    return on(r.line, t[r.line]);
  const o = e.subject.page.contentBox[r.size], c = In(e.descriptor.id, n).reduce((l, u) => l + u.client.marginBox[r.size], 0) + t[r.line] - o;
  return c <= 0 ? null : on(r.line, c);
}, Xf = (e, t) => ({
  ...e,
  scroll: {
    ...e.scroll,
    max: t
  }
}), Jf = (e, t, n) => {
  const r = e.frame;
  An(t, e) && k(!1), e.subject.withPlaceholder && k(!1);
  const o = mr(e.axis, t.displaceBy).point, i = dS(e, o, n), s = {
    placeholderSize: o,
    increasedBy: i,
    oldFrameMaxScroll: e.frame ? e.frame.scroll.max : null
  };
  if (!r) {
    const u = xn({
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
  const a = i ? ye(r.scroll.max, i) : r.scroll.max, c = Xf(r, a), l = xn({
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
}, fS = (e) => {
  const t = e.subject.withPlaceholder;
  t || k(!1);
  const n = e.frame;
  if (!n) {
    const s = xn({
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
  const o = Xf(n, r), i = xn({
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
var pS = ({
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
    const d = {
      displaced: Xn,
      displacedBy: Wf,
      at: {
        type: "REORDER",
        destination: {
          droppableId: i.descriptor.id,
          index: 0
        }
      }
    }, f = ri({
      impact: d,
      draggable: r,
      droppable: i,
      draggables: o,
      afterCritical: a
    }), p = An(r, i) ? i : Jf(i, r, o);
    return Yf({
      draggable: r,
      destination: p,
      newPageBorderBoxCenter: f,
      viewport: s.frame,
      withDroppableDisplacement: !1,
      onlyOnMainAxis: !0
    }) ? d : null;
  }
  const c = e[i.axis.line] <= t.page.borderBox.center[i.axis.line], l = (() => {
    const d = t.descriptor.index;
    return t.descriptor.id === r.descriptor.id || c ? d : d + 1;
  })(), u = mr(i.axis, r.displaceBy);
  return Zr({
    draggable: r,
    insideDestination: n,
    destination: i,
    viewport: s,
    displacedBy: u,
    last: Xn,
    index: l
  });
}, mS = ({
  isMovingForward: e,
  previousPageBorderBoxCenter: t,
  draggable: n,
  isOver: r,
  draggables: o,
  droppables: i,
  viewport: s,
  afterCritical: a
}) => {
  const c = cS({
    isMovingForward: e,
    pageBorderBoxCenter: t,
    source: r,
    droppables: i,
    viewport: s
  });
  if (!c)
    return null;
  const l = In(c.descriptor.id, o), u = uS({
    pageBorderBoxCenter: t,
    viewport: s,
    destination: c,
    insideDestination: l,
    afterCritical: a
  }), d = pS({
    previousPageBorderBoxCenter: t,
    destination: c,
    draggable: n,
    draggables: o,
    moveRelativeTo: u,
    insideDestination: l,
    viewport: s,
    afterCritical: a
  });
  if (!d)
    return null;
  const f = ri({
    impact: d,
    draggable: n,
    droppable: c,
    draggables: o,
    afterCritical: a
  });
  return {
    clientSelection: Ua({
      pageBorderBoxCenter: f,
      draggable: n,
      viewport: s
    }),
    impact: d,
    scrollJumpRequest: null
  };
}, ze = (e) => {
  const t = e.at;
  return t ? t.type === "REORDER" ? t.destination.droppableId : t.combine.droppableId : null;
};
const gS = (e, t) => {
  const n = ze(e);
  return n ? t[n] : null;
};
var hS = ({
  state: e,
  type: t
}) => {
  const n = gS(e.impact, e.dimensions.droppables), r = !!n, o = e.dimensions.droppables[e.critical.droppable.id], i = n || o, s = i.axis.direction, a = s === "vertical" && (t === "MOVE_UP" || t === "MOVE_DOWN") || s === "horizontal" && (t === "MOVE_LEFT" || t === "MOVE_RIGHT");
  if (a && !r)
    return null;
  const c = t === "MOVE_DOWN" || t === "MOVE_RIGHT", l = e.dimensions.draggables[e.critical.draggable.id], u = e.current.page.borderBoxCenter, {
    draggables: d,
    droppables: f
  } = e.dimensions;
  return a ? aS({
    isMovingForward: c,
    previousPageBorderBoxCenter: u,
    draggable: l,
    destination: i,
    draggables: d,
    viewport: e.viewport,
    previousClientSelection: e.current.client.selection,
    previousImpact: e.impact,
    afterCritical: e.afterCritical
  }) : mS({
    isMovingForward: c,
    previousPageBorderBoxCenter: u,
    draggable: l,
    isOver: i,
    draggables: d,
    droppables: f,
    viewport: e.viewport,
    afterCritical: e.afterCritical
  });
};
function Jt(e) {
  return e.phase === "DRAGGING" || e.phase === "COLLECTING";
}
function Qf(e) {
  const t = Je(e.top, e.bottom), n = Je(e.left, e.right);
  return function(o) {
    return t(o.y) && n(o.x);
  };
}
function bS(e, t) {
  return e.left < t.right && e.right > t.left && e.top < t.bottom && e.bottom > t.top;
}
function yS({
  pageBorderBox: e,
  draggable: t,
  candidates: n
}) {
  const r = t.page.borderBox.center, o = n.map((i) => {
    const s = i.axis, a = on(i.axis.line, e.center[s.line], i.page.borderBox.center[s.crossAxisLine]);
    return {
      id: i.descriptor.id,
      distance: Yn(r, a)
    };
  }).sort((i, s) => s.distance - i.distance);
  return o[0] ? o[0].id : null;
}
function vS({
  pageBorderBox: e,
  draggable: t,
  droppables: n
}) {
  const r = ei(n).filter((o) => {
    if (!o.isEnabled)
      return !1;
    const i = o.subject.active;
    if (!i || !bS(e, i))
      return !1;
    if (Qf(i)(e.center))
      return !0;
    const s = o.axis, a = i.center[s.crossAxisLine], c = e[s.crossAxisStart], l = e[s.crossAxisEnd], u = Je(i[s.crossAxisStart], i[s.crossAxisEnd]), d = u(c), f = u(l);
    return !d && !f ? !0 : d ? c < a : l > a;
  });
  return r.length ? r.length === 1 ? r[0].descriptor.id : yS({
    pageBorderBox: e,
    draggable: t,
    candidates: r
  }) : null;
}
const Zf = (e, t) => at(pr(e, t));
var wS = (e, t) => {
  const n = e.frame;
  return n ? Zf(t, n.scroll.diff.value) : t;
};
function ep({
  displaced: e,
  id: t
}) {
  return !!(e.visible[t] || e.invisible[t]);
}
function xS({
  draggable: e,
  closest: t,
  inHomeList: n
}) {
  return t ? n && t.descriptor.index > e.descriptor.index ? t.descriptor.index - 1 : t.descriptor.index : null;
}
var SS = ({
  pageBorderBoxWithDroppableScroll: e,
  draggable: t,
  destination: n,
  insideDestination: r,
  last: o,
  viewport: i,
  afterCritical: s
}) => {
  const a = n.axis, c = mr(n.axis, t.displaceBy), l = c.value, u = e[a.start], d = e[a.end], p = ni(t, r).find((g) => {
    const h = g.descriptor.id, w = g.page.borderBox.center[a.line], y = zt(h, s), b = ep({
      displaced: o,
      id: h
    });
    return y ? b ? d <= w : u < w - l : b ? d <= w + l : u < w;
  }) || null, m = xS({
    draggable: t,
    closest: p,
    inHomeList: An(t, n)
  });
  return Zr({
    draggable: t,
    insideDestination: r,
    destination: n,
    viewport: i,
    last: o,
    displacedBy: c,
    index: m
  });
};
const CS = 4;
var ES = ({
  draggable: e,
  pageBorderBoxWithDroppableScroll: t,
  previousImpact: n,
  destination: r,
  insideDestination: o,
  afterCritical: i
}) => {
  if (!r.isCombineEnabled)
    return null;
  const s = r.axis, a = mr(r.axis, e.displaceBy), c = a.value, l = t[s.start], u = t[s.end], f = ni(e, o).find((m) => {
    const g = m.descriptor.id, h = m.page.borderBox, y = h[s.size] / CS, b = zt(g, i), v = ep({
      displaced: n.displaced,
      id: g
    });
    return b ? v ? u > h[s.start] + y && u < h[s.end] - y : l > h[s.start] - c + y && l < h[s.end] - c - y : v ? u > h[s.start] + c + y && u < h[s.end] + c - y : l > h[s.start] + y && l < h[s.end] - y;
  });
  return f ? {
    displacedBy: a,
    displaced: n.displaced,
    at: {
      type: "COMBINE",
      combine: {
        draggableId: f.descriptor.id,
        droppableId: r.descriptor.id
      }
    }
  } : null;
}, tp = ({
  pageOffset: e,
  draggable: t,
  draggables: n,
  droppables: r,
  previousImpact: o,
  viewport: i,
  afterCritical: s
}) => {
  const a = Zf(t.page.borderBox, e), c = vS({
    pageBorderBox: a,
    draggable: t,
    droppables: r
  });
  if (!c)
    return Fx;
  const l = r[c], u = In(l.descriptor.id, n), d = wS(l, a);
  return ES({
    pageBorderBoxWithDroppableScroll: d,
    draggable: t,
    previousImpact: o,
    destination: l,
    insideDestination: u,
    afterCritical: s
  }) || SS({
    pageBorderBoxWithDroppableScroll: d,
    draggable: t,
    destination: l,
    insideDestination: u,
    last: o.displaced,
    viewport: i,
    afterCritical: s
  });
}, qa = (e, t) => ({
  ...e,
  [t.descriptor.id]: t
});
const PS = ({
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
  const s = fS(i);
  return qa(n, s);
};
var DS = ({
  draggable: e,
  draggables: t,
  droppables: n,
  previousImpact: r,
  impact: o
}) => {
  const i = PS({
    previousImpact: r,
    impact: o,
    droppables: n
  }), s = ze(o);
  if (!s)
    return i;
  const a = n[s];
  if (An(e, a) || a.subject.withPlaceholder)
    return i;
  const c = Jf(a, e, t);
  return qa(i, c);
}, Bn = ({
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
  }, d = {
    selection: ye(u.selection, s.scroll.current),
    borderBoxCenter: ye(u.borderBoxCenter, s.scroll.current),
    offset: ye(u.offset, s.scroll.diff.value)
  }, f = {
    client: u,
    page: d
  };
  if (e.phase === "COLLECTING")
    return {
      ...e,
      dimensions: a,
      viewport: s,
      current: f
    };
  const p = a.draggables[e.critical.draggable.id], m = o || tp({
    pageOffset: d.offset,
    draggable: p,
    draggables: a.draggables,
    droppables: a.droppables,
    previousImpact: e.impact,
    viewport: s,
    afterCritical: e.afterCritical
  }), g = DS({
    draggable: p,
    impact: m,
    previousImpact: e.impact,
    draggables: a.draggables,
    droppables: a.droppables
  });
  return {
    ...e,
    current: f,
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
function RS(e, t) {
  return e.map((n) => t[n]);
}
var np = ({
  impact: e,
  viewport: t,
  draggables: n,
  destination: r,
  forceShouldAnimate: o
}) => {
  const i = e.displaced, s = RS(i.all, n), a = Jn({
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
}, rp = ({
  impact: e,
  draggable: t,
  droppable: n,
  draggables: r,
  viewport: o,
  afterCritical: i
}) => {
  const s = ri({
    impact: e,
    draggable: t,
    draggables: r,
    droppable: n,
    afterCritical: i
  });
  return Ua({
    pageBorderBoxCenter: s,
    draggable: t,
    viewport: o
  });
}, op = ({
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
  const u = a[l], d = np({
    impact: r,
    viewport: o,
    destination: u,
    draggables: s
  }), f = rp({
    impact: d,
    draggable: c,
    droppable: u,
    draggables: s,
    viewport: o,
    afterCritical: e.afterCritical
  });
  return Bn({
    impact: d,
    clientSelection: f,
    state: e,
    dimensions: i,
    viewport: o
  });
}, IS = (e) => ({
  index: e.index,
  droppableId: e.droppableId
}), ip = ({
  draggable: e,
  home: t,
  draggables: n,
  viewport: r
}) => {
  const o = mr(t.axis, e.displaceBy), i = In(t.descriptor.id, n), s = i.indexOf(e);
  s === -1 && k(!1);
  const a = i.slice(s + 1), c = a.reduce((f, p) => (f[p.descriptor.id] = !0, f), {}), l = {
    inVirtualList: t.descriptor.mode === "virtual",
    displacedBy: o,
    effected: c
  };
  return {
    impact: {
      displaced: Jn({
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
        destination: IS(e.descriptor)
      }
    },
    afterCritical: l
  };
}, AS = (e, t) => ({
  draggables: e.draggables,
  droppables: qa(e.droppables, t)
}), OS = ({
  draggable: e,
  offset: t,
  initialWindowScroll: n
}) => {
  const r = Yr(e.client, t), o = Xr(r, n);
  return {
    ...e,
    placeholder: {
      ...e.placeholder,
      client: r
    },
    client: r,
    page: o
  };
}, NS = (e) => {
  const t = e.frame;
  return t || k(!1), t;
}, $S = ({
  additions: e,
  updatedDroppables: t,
  viewport: n
}) => {
  const r = n.scroll.diff.value;
  return e.map((o) => {
    const i = o.descriptor.droppableId, s = t[i], c = NS(s).scroll.diff.value, l = ye(r, c);
    return OS({
      draggable: o,
      offset: l,
      initialWindowScroll: n.scroll.initial
    });
  });
}, TS = ({
  state: e,
  published: t
}) => {
  const n = t.modified.map((w) => {
    const y = e.dimensions.droppables[w.droppableId];
    return za(y, w.scroll);
  }), r = {
    ...e.dimensions.droppables,
    ...zf(n)
  }, o = Vf($S({
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
    impact: d,
    afterCritical: f
  } = ip({
    draggable: l,
    home: u,
    draggables: i,
    viewport: e.viewport
  }), p = c && c.isCombineEnabled ? e.impact : d, m = tp({
    pageOffset: e.current.page.offset,
    draggable: s.draggables[e.critical.draggable.id],
    draggables: s.draggables,
    droppables: s.droppables,
    previousImpact: p,
    viewport: e.viewport,
    afterCritical: f
  }), g = {
    ...e,
    phase: "DRAGGING",
    impact: m,
    onLiftImpact: d,
    dimensions: s,
    afterCritical: f,
    forceShouldAnimate: !1
  };
  return e.phase === "COLLECTING" ? g : {
    ...g,
    phase: "DROP_PENDING",
    reason: e.reason,
    isWaiting: !1
  };
};
const ls = (e) => e.movementMode === "SNAP", Ti = (e, t, n) => {
  const r = AS(e.dimensions, t);
  return !ls(e) || n ? Bn({
    state: e,
    dimensions: r
  }) : op({
    state: e,
    dimensions: r
  });
};
function Li(e) {
  return e.isDragging && e.movementMode === "SNAP" ? {
    ...e,
    scrollJumpRequest: null
  } : e;
}
const Ol = {
  phase: "IDLE",
  completed: null,
  shouldFlush: !1
};
var LS = (e = Ol, t) => {
  if (t.type === "FLUSH")
    return {
      ...Ol,
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
    }, d = ei(i.droppables).every((g) => !g.isFixedOnPage), {
      impact: f,
      afterCritical: p
    } = ip({
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
      isWindowScrollAllowed: d,
      impact: f,
      afterCritical: p,
      onLiftImpact: f,
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
    return e.phase === "COLLECTING" || e.phase === "DROP_PENDING" || k(!1), TS({
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
    return Lt(n, e.current.client.selection) ? e : Bn({
      state: e,
      clientSelection: n,
      impact: ls(e) ? e.impact : null
    });
  }
  if (t.type === "UPDATE_DROPPABLE_SCROLL") {
    if (e.phase === "DROP_PENDING" || e.phase === "COLLECTING")
      return Li(e);
    Jt(e) || k(!1);
    const {
      id: n,
      newScroll: r
    } = t.payload, o = e.dimensions.droppables[n];
    if (!o)
      return e;
    const i = za(o, r);
    return Ti(e, i, !1);
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
    return Ti(e, i, !0);
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
    return Ti(e, i, !0);
  }
  if (t.type === "MOVE_BY_WINDOW_SCROLL") {
    if (e.phase === "DROP_PENDING" || e.phase === "DROP_ANIMATING")
      return e;
    Jt(e) || k(!1), e.isWindowScrollAllowed || k(!1);
    const n = t.payload.newScroll;
    if (Lt(e.viewport.scroll.current, n))
      return Li(e);
    const r = Kf(e.viewport, n);
    return ls(e) ? op({
      state: e,
      viewport: r
    }) : Bn({
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
    const n = hS({
      state: e,
      type: t.type
    });
    return n ? Bn({
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
const MS = (e) => ({
  type: "BEFORE_INITIAL_CAPTURE",
  payload: e
}), _S = (e) => ({
  type: "LIFT",
  payload: e
}), kS = (e) => ({
  type: "INITIAL_PUBLISH",
  payload: e
}), FS = (e) => ({
  type: "PUBLISH_WHILE_DRAGGING",
  payload: e
}), BS = () => ({
  type: "COLLECTION_STARTING",
  payload: null
}), jS = (e) => ({
  type: "UPDATE_DROPPABLE_SCROLL",
  payload: e
}), zS = (e) => ({
  type: "UPDATE_DROPPABLE_IS_ENABLED",
  payload: e
}), VS = (e) => ({
  type: "UPDATE_DROPPABLE_IS_COMBINE_ENABLED",
  payload: e
}), sp = (e) => ({
  type: "MOVE",
  payload: e
}), WS = (e) => ({
  type: "MOVE_BY_WINDOW_SCROLL",
  payload: e
}), GS = (e) => ({
  type: "UPDATE_VIEWPORT_MAX_SCROLL",
  payload: e
}), HS = () => ({
  type: "MOVE_UP",
  payload: null
}), US = () => ({
  type: "MOVE_DOWN",
  payload: null
}), qS = () => ({
  type: "MOVE_RIGHT",
  payload: null
}), KS = () => ({
  type: "MOVE_LEFT",
  payload: null
}), Ka = () => ({
  type: "FLUSH",
  payload: null
}), YS = (e) => ({
  type: "DROP_ANIMATE",
  payload: e
}), Ya = (e) => ({
  type: "DROP_COMPLETE",
  payload: e
}), ap = (e) => ({
  type: "DROP",
  payload: e
}), XS = (e) => ({
  type: "DROP_PENDING",
  payload: e
}), cp = () => ({
  type: "DROP_ANIMATION_FINISHED",
  payload: null
});
var JS = (e) => ({
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
  c.phase === "DROP_ANIMATING" && n(Ya({
    completed: c.completed
  })), t().phase !== "IDLE" && k(!1), n(Ka()), n(MS({
    draggableId: i,
    movementMode: a
  }));
  const u = {
    draggableId: i,
    scrollOptions: {
      shouldPublishImmediately: a === "SNAP"
    }
  }, {
    critical: d,
    dimensions: f,
    viewport: p
  } = e.startPublishing(u);
  n(kS({
    critical: d,
    dimensions: f,
    clientSelection: s,
    movementMode: a,
    viewport: p
  }));
}, QS = (e) => () => (t) => (n) => {
  n.type === "INITIAL_PUBLISH" && e.dragging(), n.type === "DROP_ANIMATE" && e.dropping(n.payload.completed.result.reason), (n.type === "FLUSH" || n.type === "DROP_COMPLETE") && e.resting(), t(n);
};
const Xa = {
  outOfTheWay: "cubic-bezier(0.2, 0, 0, 1)",
  drop: "cubic-bezier(.2,1,.1,1)"
}, Qn = {
  opacity: {
    drop: 0,
    combining: 0.7
  },
  scale: {
    drop: 0.75
  }
}, lp = {
  outOfTheWay: 0.2,
  minDropTime: 0.33,
  maxDropTime: 0.55
}, Kt = `${lp.outOfTheWay}s ${Xa.outOfTheWay}`, jn = {
  fluid: `opacity ${Kt}`,
  snap: `transform ${Kt}, opacity ${Kt}`,
  drop: (e) => {
    const t = `${e}s ${Xa.drop}`;
    return `transform ${t}, opacity ${t}`;
  },
  outOfTheWay: `transform ${Kt}`,
  placeholder: `height ${Kt}, width ${Kt}, margin ${Kt}`
}, Nl = (e) => Lt(e, pe) ? void 0 : `translate(${e.x}px, ${e.y}px)`, us = {
  moveTo: Nl,
  drop: (e, t) => {
    const n = Nl(e);
    if (n)
      return t ? `${n} scale(${Qn.scale.drop})` : n;
  }
}, {
  minDropTime: ds,
  maxDropTime: up
} = lp, ZS = up - ds, $l = 1500, e1 = 0.6;
var t1 = ({
  current: e,
  destination: t,
  reason: n
}) => {
  const r = Yn(e, t);
  if (r <= 0)
    return ds;
  if (r >= $l)
    return up;
  const o = r / $l, i = ds + ZS * o, s = n === "CANCEL" ? i * e1 : i;
  return Number(s.toFixed(2));
}, n1 = ({
  impact: e,
  draggable: t,
  dimensions: n,
  viewport: r,
  afterCritical: o
}) => {
  const {
    draggables: i,
    droppables: s
  } = n, a = ze(e), c = a ? s[a] : null, l = s[t.descriptor.droppableId], u = rp({
    impact: e,
    draggable: t,
    draggables: i,
    afterCritical: o,
    droppable: c || l,
    viewport: r
  });
  return Be(u, t.client.borderBox.center);
}, r1 = ({
  draggables: e,
  reason: t,
  lastImpact: n,
  home: r,
  viewport: o,
  onLiftImpact: i
}) => !n.at || t !== "DROP" ? {
  impact: np({
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
    displaced: Xn
  },
  didDropInsideDroppable: !0
};
const o1 = ({
  getState: e,
  dispatch: t
}) => (n) => (r) => {
  if (r.type !== "DROP") {
    n(r);
    return;
  }
  const o = e(), i = r.payload.reason;
  if (o.phase === "COLLECTING") {
    t(XS({
      reason: i
    }));
    return;
  }
  if (o.phase === "IDLE")
    return;
  o.phase === "DROP_PENDING" && o.isWaiting && k(!1), o.phase === "DRAGGING" || o.phase === "DROP_PENDING" || k(!1);
  const a = o.critical, c = o.dimensions, l = c.draggables[o.critical.draggable.id], {
    impact: u,
    didDropInsideDroppable: d
  } = r1({
    reason: i,
    lastImpact: o.impact,
    afterCritical: o.afterCritical,
    onLiftImpact: o.onLiftImpact,
    home: o.dimensions.droppables[o.critical.droppable.id],
    viewport: o.viewport,
    draggables: o.dimensions.draggables
  }), f = d ? Va(u) : null, p = d ? ti(u) : null, m = {
    index: a.draggable.index,
    droppableId: a.droppable.id
  }, g = {
    draggableId: l.descriptor.id,
    type: l.descriptor.type,
    source: m,
    reason: i,
    mode: o.movementMode,
    destination: f,
    combine: p
  }, h = n1({
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
    t(Ya({
      completed: w
    }));
    return;
  }
  const b = t1({
    current: o.current.client.offset,
    destination: h,
    reason: i
  });
  t(YS({
    newHomeClientOffset: h,
    dropDuration: b,
    completed: w
  }));
};
var i1 = o1, dp = () => ({
  x: window.pageXOffset,
  y: window.pageYOffset
});
function s1(e) {
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
function a1({
  onWindowScroll: e
}) {
  function t() {
    e(dp());
  }
  const n = Kn(t), r = s1(n);
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
const c1 = (e) => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH", l1 = (e) => {
  const t = a1({
    onWindowScroll: (n) => {
      e.dispatch(WS({
        newScroll: n
      }));
    }
  });
  return (n) => (r) => {
    !t.isActive() && r.type === "INITIAL_PUBLISH" && t.start(), t.isActive() && c1(r) && t.stop(), n(r);
  };
};
var u1 = l1, d1 = (e) => {
  let t = !1, n = !1;
  const r = setTimeout(() => {
    n = !0;
  }), o = (i) => {
    t || n || (t = !0, e(i), clearTimeout(r));
  };
  return o.wasCalled = () => t, o;
}, f1 = () => {
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
const p1 = (e, t) => e == null && t == null ? !0 : e == null || t == null ? !1 : e.droppableId === t.droppableId && e.index === t.index, m1 = (e, t) => e == null && t == null ? !0 : e == null || t == null ? !1 : e.draggableId === t.draggableId && e.droppableId === t.droppableId, g1 = (e, t) => {
  if (e === t)
    return !0;
  const n = e.draggable.id === t.draggable.id && e.draggable.droppableId === t.draggable.droppableId && e.draggable.type === t.draggable.type && e.draggable.index === t.draggable.index, r = e.droppable.id === t.droppable.id && e.droppable.type === t.droppable.type;
  return n && r;
}, Ln = (e, t) => {
  t();
}, Er = (e, t) => ({
  draggableId: e.draggable.id,
  type: e.droppable.type,
  source: {
    droppableId: e.droppable.id,
    index: e.draggable.index
  },
  mode: t
});
function Mi(e, t, n, r) {
  if (!e) {
    n(r(t));
    return;
  }
  const o = d1(n);
  e(t, {
    announce: o
  }), o.wasCalled() || n(r(t));
}
var h1 = (e, t) => {
  const n = f1();
  let r = null;
  const o = (d, f) => {
    r && k(!1), Ln("onBeforeCapture", () => {
      const p = e().onBeforeCapture;
      p && p({
        draggableId: d,
        mode: f
      });
    });
  }, i = (d, f) => {
    r && k(!1), Ln("onBeforeDragStart", () => {
      const p = e().onBeforeDragStart;
      p && p(Er(d, f));
    });
  }, s = (d, f) => {
    r && k(!1);
    const p = Er(d, f);
    r = {
      mode: f,
      lastCritical: d,
      lastLocation: p.source,
      lastCombine: null
    }, n.add(() => {
      Ln("onDragStart", () => Mi(e().onDragStart, p, t, Tr.onDragStart));
    });
  }, a = (d, f) => {
    const p = Va(f), m = ti(f);
    r || k(!1);
    const g = !g1(d, r.lastCritical);
    g && (r.lastCritical = d);
    const h = !p1(r.lastLocation, p);
    h && (r.lastLocation = p);
    const w = !m1(r.lastCombine, m);
    if (w && (r.lastCombine = m), !g && !h && !w)
      return;
    const y = {
      ...Er(d, r.mode),
      combine: m,
      destination: p
    };
    n.add(() => {
      Ln("onDragUpdate", () => Mi(e().onDragUpdate, y, t, Tr.onDragUpdate));
    });
  }, c = () => {
    r || k(!1), n.flush();
  }, l = (d) => {
    r || k(!1), r = null, Ln("onDragEnd", () => Mi(e().onDragEnd, d, t, Tr.onDragEnd));
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
      const d = {
        ...Er(r.lastCritical, r.mode),
        combine: null,
        destination: null,
        reason: "CANCEL"
      };
      l(d);
    }
  };
}, b1 = (e, t) => {
  const n = h1(e, t);
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
const y1 = (e) => (t) => (n) => {
  if (n.type !== "DROP_ANIMATION_FINISHED") {
    t(n);
    return;
  }
  const r = e.getState();
  r.phase !== "DROP_ANIMATING" && k(!1), e.dispatch(Ya({
    completed: r.completed
  }));
};
var v1 = y1;
const w1 = (e) => {
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
        e.getState().phase === "DROP_ANIMATING" && e.dispatch(cp());
      }
    };
    n = requestAnimationFrame(() => {
      n = null, t = Ye(window, [s]);
    });
  };
};
var x1 = w1, S1 = (e) => () => (t) => (n) => {
  (n.type === "DROP_COMPLETE" || n.type === "FLUSH" || n.type === "DROP_ANIMATE") && e.stopPublishing(), t(n);
}, C1 = (e) => {
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
const E1 = (e) => e.type === "DROP_COMPLETE" || e.type === "DROP_ANIMATE" || e.type === "FLUSH";
var P1 = (e) => (t) => (n) => (r) => {
  if (E1(r)) {
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
const D1 = (e) => (t) => (n) => {
  if (t(n), n.type !== "PUBLISH_WHILE_DRAGGING")
    return;
  const r = e.getState();
  r.phase === "DROP_PENDING" && (r.isWaiting || e.dispatch(ap({
    reason: r.reason
  })));
};
var R1 = D1;
const I1 = Tf;
var A1 = ({
  dimensionMarshal: e,
  focusMarshal: t,
  styleMarshal: n,
  getResponders: r,
  announce: o,
  autoScroller: i
}) => $f(LS, I1(fx(QS(n), S1(e), JS(e), i1, v1, x1, R1, P1(i), u1, C1(t), b1(r, o))));
const _i = () => ({
  additions: {},
  removals: {},
  modified: {}
});
function O1({
  registry: e,
  callbacks: t
}) {
  let n = _i(), r = null;
  const o = () => {
    r || (t.collectionStarting(), r = requestAnimationFrame(() => {
      r = null;
      const {
        additions: c,
        removals: l,
        modified: u
      } = n, d = Object.keys(c).map((m) => e.draggable.getById(m).getDimension(pe)).sort((m, g) => m.descriptor.index - g.descriptor.index), f = Object.keys(u).map((m) => {
        const h = e.droppable.getById(m).callbacks.getScrollWhileDragging();
        return {
          droppableId: m,
          scroll: h
        };
      }), p = {
        additions: d,
        removals: Object.keys(l),
        modified: f
      };
      n = _i(), t.publish(p);
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
      r && (cancelAnimationFrame(r), r = null, n = _i());
    }
  };
}
var fp = ({
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
}, pp = () => {
  const e = document.documentElement;
  return e || k(!1), e;
}, mp = () => {
  const e = pp();
  return fp({
    scrollHeight: e.scrollHeight,
    scrollWidth: e.scrollWidth,
    width: e.clientWidth,
    height: e.clientHeight
  });
}, N1 = () => {
  const e = dp(), t = mp(), n = e.y, r = e.x, o = pp(), i = o.clientWidth, s = o.clientHeight, a = r + i, c = n + s;
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
}, $1 = ({
  critical: e,
  scrollOptions: t,
  registry: n
}) => {
  const r = N1(), o = r.scroll.current, i = e.droppable, s = n.droppable.getAllByType(i.type).map((u) => u.callbacks.getDimensionAndWatchScroll(o, t)), a = n.draggable.getAllByType(e.draggable.type).map((u) => u.getDimension(o));
  return {
    dimensions: {
      draggables: Vf(a),
      droppables: zf(s)
    },
    critical: e,
    viewport: r
  };
};
function Tl(e, t, n) {
  return !(n.descriptor.id === t.id || n.descriptor.type !== t.type || e.droppable.getById(n.descriptor.droppableId).descriptor.mode !== "virtual");
}
var T1 = (e, t) => {
  let n = null;
  const r = O1({
    callbacks: {
      publish: t.publishWhileDragging,
      collectionStarting: t.collectionStarting
    },
    registry: e
  }), o = (f, p) => {
    e.droppable.exists(f) || k(!1), n && t.updateDroppableIsEnabled({
      id: f,
      isEnabled: p
    });
  }, i = (f, p) => {
    n && (e.droppable.exists(f) || k(!1), t.updateDroppableIsCombineEnabled({
      id: f,
      isCombineEnabled: p
    }));
  }, s = (f, p) => {
    n && (e.droppable.exists(f) || k(!1), t.updateDroppableScroll({
      id: f,
      newScroll: p
    }));
  }, a = (f, p) => {
    n && e.droppable.getById(f).callbacks.scroll(p);
  }, c = () => {
    if (!n)
      return;
    r.stop();
    const f = n.critical.droppable;
    e.droppable.getAllByType(f.type).forEach((p) => p.callbacks.dragStopped()), n.unsubscribe(), n = null;
  }, l = (f) => {
    n || k(!1);
    const p = n.critical.draggable;
    f.type === "ADDITION" && Tl(e, p, f.value) && r.add(f.value), f.type === "REMOVAL" && Tl(e, p, f.value) && r.remove(f.value);
  };
  return {
    updateDroppableIsEnabled: o,
    updateDroppableIsCombineEnabled: i,
    scrollDroppable: a,
    updateDroppableScroll: s,
    startPublishing: (f) => {
      n && k(!1);
      const p = e.draggable.getById(f.draggableId), m = e.droppable.getById(p.descriptor.droppableId), g = {
        draggable: p.descriptor,
        droppable: m.descriptor
      }, h = e.subscribe(l);
      return n = {
        critical: g,
        unsubscribe: h
      }, $1({
        critical: g,
        registry: e,
        scrollOptions: f.scrollOptions
      });
    },
    stopPublishing: c
  };
}, gp = (e, t) => e.phase === "IDLE" ? !0 : e.phase !== "DROP_ANIMATING" || e.completed.result.draggableId === t ? !1 : e.completed.result.reason === "DROP", L1 = (e) => {
  window.scrollBy(e.x, e.y);
};
const M1 = de((e) => ei(e).filter((t) => !(!t.isEnabled || !t.frame))), _1 = (e, t) => M1(t).find((r) => (r.frame || k(!1), Qf(r.frame.pageMarginBox)(e))) || null;
var k1 = ({
  center: e,
  destination: t,
  droppables: n
}) => {
  if (t) {
    const o = n[t];
    return o.frame ? o : null;
  }
  return _1(e, n);
};
const Zn = {
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
var F1 = (e, t, n = () => Zn) => {
  const r = n(), o = e[t.size] * r.startFromPercentage, i = e[t.size] * r.maxScrollAtPercentage;
  return {
    startScrollingFrom: o,
    maxScrollValueAt: i
  };
}, hp = ({
  startOfRange: e,
  endOfRange: t,
  current: n
}) => {
  const r = t - e;
  return r === 0 ? 0 : (n - e) / r;
}, Ja = 1, B1 = (e, t, n = () => Zn) => {
  const r = n();
  if (e > t.startScrollingFrom)
    return 0;
  if (e <= t.maxScrollValueAt)
    return r.maxPixelScroll;
  if (e === t.startScrollingFrom)
    return Ja;
  const i = 1 - hp({
    startOfRange: t.maxScrollValueAt,
    endOfRange: t.startScrollingFrom,
    current: e
  }), s = r.maxPixelScroll * r.ease(i);
  return Math.ceil(s);
}, j1 = (e, t, n) => {
  const r = n(), o = r.durationDampening.accelerateAt, i = r.durationDampening.stopDampeningAt, s = t, a = i, l = Date.now() - s;
  if (l >= i)
    return e;
  if (l < o)
    return Ja;
  const u = hp({
    startOfRange: o,
    endOfRange: a,
    current: l
  }), d = e * r.ease(u);
  return Math.ceil(d);
}, Ll = ({
  distanceToEdge: e,
  thresholds: t,
  dragStartTime: n,
  shouldUseTimeDampening: r,
  getAutoScrollerOptions: o
}) => {
  const i = B1(e, t, o);
  return i === 0 ? 0 : r ? Math.max(j1(i, n, o), Ja) : i;
}, Ml = ({
  container: e,
  distanceToEdges: t,
  dragStartTime: n,
  axis: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: i
}) => {
  const s = F1(e, r, i);
  return t[r.end] < t[r.start] ? Ll({
    distanceToEdge: t[r.end],
    thresholds: s,
    dragStartTime: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  }) : -1 * Ll({
    distanceToEdge: t[r.start],
    thresholds: s,
    dragStartTime: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  });
}, z1 = ({
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
const V1 = jf((e) => e === 0 ? 0 : e);
var bp = ({
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
  }, a = Ml({
    container: t,
    distanceToEdges: s,
    dragStartTime: e,
    axis: Wa,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  }), c = Ml({
    container: t,
    distanceToEdges: s,
    dragStartTime: e,
    axis: Hf,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  }), l = V1({
    x: c,
    y: a
  });
  if (Lt(l, pe))
    return null;
  const u = z1({
    container: t,
    subject: n,
    proposedScroll: l
  });
  return u ? Lt(u, pe) ? null : u : null;
};
const W1 = jf((e) => e === 0 ? 0 : e > 0 ? 1 : -1), Qa = (() => {
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
})(), yp = ({
  max: e,
  current: t,
  change: n
}) => {
  const r = {
    x: Math.max(t.x, e.x),
    y: Math.max(t.y, e.y)
  }, o = W1(n), i = Qa({
    max: r,
    current: t,
    change: o
  });
  return !i || o.x !== 0 && i.x === 0 || o.y !== 0 && i.y === 0;
}, Za = (e, t) => yp({
  current: e.scroll.current,
  max: e.scroll.max,
  change: t
}), G1 = (e, t) => {
  if (!Za(e, t))
    return null;
  const n = e.scroll.max, r = e.scroll.current;
  return Qa({
    current: r,
    max: n,
    change: t
  });
}, ec = (e, t) => {
  const n = e.frame;
  return n ? yp({
    current: n.scroll.current,
    max: n.scroll.max,
    change: t
  }) : !1;
}, H1 = (e, t) => {
  const n = e.frame;
  return !n || !ec(e, t) ? null : Qa({
    current: n.scroll.current,
    max: n.scroll.max,
    change: t
  });
};
var U1 = ({
  viewport: e,
  subject: t,
  center: n,
  dragStartTime: r,
  shouldUseTimeDampening: o,
  getAutoScrollerOptions: i
}) => {
  const s = bp({
    dragStartTime: r,
    container: e.frame,
    subject: t,
    center: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  });
  return s && Za(e, s) ? s : null;
}, q1 = ({
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
  const a = bp({
    dragStartTime: r,
    container: s.pageMarginBox,
    subject: t,
    center: n,
    shouldUseTimeDampening: o,
    getAutoScrollerOptions: i
  });
  return a && ec(e, a) ? a : null;
}, _l = ({
  state: e,
  dragStartTime: t,
  shouldUseTimeDampening: n,
  scrollWindow: r,
  scrollDroppable: o,
  getAutoScrollerOptions: i
}) => {
  const s = e.current.page.borderBoxCenter, c = e.dimensions.draggables[e.critical.draggable.id].page.marginBox;
  if (e.isWindowScrollAllowed) {
    const d = e.viewport, f = U1({
      dragStartTime: t,
      viewport: d,
      subject: c,
      center: s,
      shouldUseTimeDampening: n,
      getAutoScrollerOptions: i
    });
    if (f) {
      r(f);
      return;
    }
  }
  const l = k1({
    center: s,
    destination: ze(e.impact),
    droppables: e.dimensions.droppables
  });
  if (!l)
    return;
  const u = q1({
    dragStartTime: t,
    droppable: l,
    subject: c,
    center: s,
    shouldUseTimeDampening: n,
    getAutoScrollerOptions: i
  });
  u && o(l.descriptor.id, u);
}, K1 = ({
  scrollWindow: e,
  scrollDroppable: t,
  getAutoScrollerOptions: n = () => Zn
}) => {
  const r = Kn(e), o = Kn(t);
  let i = null;
  const s = (l) => {
    i || k(!1);
    const {
      shouldUseTimeDampening: u,
      dragStartTime: d
    } = i;
    _l({
      state: l,
      scrollWindow: r,
      scrollDroppable: o,
      dragStartTime: d,
      shouldUseTimeDampening: u,
      getAutoScrollerOptions: n
    });
  };
  return {
    start: (l) => {
      i && k(!1);
      const u = Date.now();
      let d = !1;
      const f = () => {
        d = !0;
      };
      _l({
        state: l,
        dragStartTime: 0,
        shouldUseTimeDampening: !1,
        scrollWindow: f,
        scrollDroppable: f,
        getAutoScrollerOptions: n
      }), i = {
        dragStartTime: u,
        shouldUseTimeDampening: d
      }, d && s(l);
    },
    stop: () => {
      i && (r.cancel(), o.cancel(), i = null);
    },
    scroll: s
  };
}, Y1 = ({
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
    if (!ec(a, c))
      return c;
    const l = H1(a, c);
    if (!l)
      return t(a.descriptor.id, c), null;
    const u = Be(c, l);
    return t(a.descriptor.id, u), Be(c, u);
  }, i = (a, c, l) => {
    if (!a || !Za(c, l))
      return l;
    const u = G1(c, l);
    if (!u)
      return n(l), null;
    const d = Be(l, u);
    return n(d), Be(l, d);
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
    const d = a.viewport, f = i(a.isWindowScrollAllowed, d, u);
    f && r(a, f);
  };
}, X1 = ({
  scrollDroppable: e,
  scrollWindow: t,
  move: n,
  getAutoScrollerOptions: r
}) => {
  const o = K1({
    scrollWindow: t,
    scrollDroppable: e,
    getAutoScrollerOptions: r
  }), i = Y1({
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
const Sn = "data-rfd", Cn = (() => {
  const e = `${Sn}-drag-handle`;
  return {
    base: e,
    draggableId: `${e}-draggable-id`,
    contextId: `${e}-context-id`
  };
})(), fs = (() => {
  const e = `${Sn}-draggable`;
  return {
    base: e,
    contextId: `${e}-context-id`,
    id: `${e}-id`
  };
})(), J1 = (() => {
  const e = `${Sn}-droppable`;
  return {
    base: e,
    contextId: `${e}-context-id`,
    id: `${e}-id`
  };
})(), kl = {
  contextId: `${Sn}-scroll-container-context-id`
}, Q1 = (e) => (t) => `[${t}="${e}"]`, Mn = (e, t) => e.map((n) => {
  const r = n.styles[t];
  return r ? `${n.selector} { ${r} }` : "";
}).join(" "), Z1 = "pointer-events: none;";
var eC = (e) => {
  const t = Q1(e), n = (() => {
    const a = `
      cursor: -webkit-grab;
      cursor: grab;
    `;
    return {
      selector: t(Cn.contextId),
      styles: {
        always: `
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          touch-action: manipulation;
        `,
        resting: a,
        dragging: Z1,
        dropAnimating: a
      }
    };
  })(), r = (() => {
    const a = `
      transition: ${jn.outOfTheWay};
    `;
    return {
      selector: t(fs.contextId),
      styles: {
        dragging: a,
        dropAnimating: a,
        userCancel: a
      }
    };
  })(), o = {
    selector: t(J1.contextId),
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
    always: Mn(s, "always"),
    resting: Mn(s, "resting"),
    dragging: Mn(s, "dragging"),
    dropAnimating: Mn(s, "dropAnimating"),
    userCancel: Mn(s, "userCancel")
  };
};
const tC = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u" ? co : W;
var Ve = tC;
const ki = () => {
  const e = document.querySelector("head");
  return e || k(!1), e;
}, Fl = (e) => {
  const t = document.createElement("style");
  return e && t.setAttribute("nonce", e), t.type = "text/css", t;
};
function nC(e, t) {
  const n = K(() => eC(e), [e]), r = z(null), o = z(null), i = V(de((d) => {
    const f = o.current;
    f || k(!1), f.textContent = d;
  }), []), s = V((d) => {
    const f = r.current;
    f || k(!1), f.textContent = d;
  }, []);
  Ve(() => {
    !r.current && !o.current || k(!1);
    const d = Fl(t), f = Fl(t);
    return r.current = d, o.current = f, d.setAttribute(`${Sn}-always`, e), f.setAttribute(`${Sn}-dynamic`, e), ki().appendChild(d), ki().appendChild(f), s(n.always), i(n.resting), () => {
      const p = (m) => {
        const g = m.current;
        g || k(!1), ki().removeChild(g), m.current = null;
      };
      p(r), p(o);
    };
  }, [t, s, i, n.always, n.resting, e]);
  const a = V(() => i(n.dragging), [i, n.dragging]), c = V((d) => {
    if (d === "DROP") {
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
function vp(e, t) {
  return Array.from(e.querySelectorAll(t));
}
var wp = (e) => e && e.ownerDocument && e.ownerDocument.defaultView ? e.ownerDocument.defaultView : window;
function oi(e) {
  return e instanceof wp(e).HTMLElement;
}
function rC(e, t) {
  const n = `[${Cn.contextId}="${e}"]`, r = vp(document, n);
  if (!r.length)
    return null;
  const o = r.find((i) => i.getAttribute(Cn.draggableId) === t);
  return !o || !oi(o) ? null : o;
}
function oC(e) {
  const t = z({}), n = z(null), r = z(null), o = z(!1), i = V(function(f, p) {
    const m = {
      id: f,
      focus: p
    };
    return t.current[f] = m, function() {
      const h = t.current;
      h[f] !== m && delete h[f];
    };
  }, []), s = V(function(f) {
    const p = rC(e, f);
    p && p !== document.activeElement && p.focus();
  }, [e]), a = V(function(f, p) {
    n.current === f && (n.current = p);
  }, []), c = V(function() {
    r.current || o.current && (r.current = requestAnimationFrame(() => {
      r.current = null;
      const f = n.current;
      f && s(f);
    }));
  }, [s]), l = V(function(f) {
    n.current = null;
    const p = document.activeElement;
    p && p.getAttribute(Cn.draggableId) === f && (n.current = f);
  }, []);
  return Ve(() => (o.current = !0, function() {
    o.current = !1;
    const f = r.current;
    f && cancelAnimationFrame(f);
  }), []), K(() => ({
    register: i,
    tryRecordFocus: l,
    tryRestoreFocusRecorded: c,
    tryShiftRecord: a
  }), [i, l, c, a]);
}
function iC() {
  const e = {
    draggables: {},
    droppables: {}
  }, t = [];
  function n(d) {
    return t.push(d), function() {
      const p = t.indexOf(d);
      p !== -1 && t.splice(p, 1);
    };
  }
  function r(d) {
    t.length && t.forEach((f) => f(d));
  }
  function o(d) {
    return e.draggables[d] || null;
  }
  function i(d) {
    const f = o(d);
    return f || k(!1), f;
  }
  const s = {
    register: (d) => {
      e.draggables[d.descriptor.id] = d, r({
        type: "ADDITION",
        value: d
      });
    },
    update: (d, f) => {
      const p = e.draggables[f.descriptor.id];
      p && p.uniqueId === d.uniqueId && (delete e.draggables[f.descriptor.id], e.draggables[d.descriptor.id] = d);
    },
    unregister: (d) => {
      const f = d.descriptor.id, p = o(f);
      p && d.uniqueId === p.uniqueId && (delete e.draggables[f], e.droppables[d.descriptor.droppableId] && r({
        type: "REMOVAL",
        value: d
      }));
    },
    getById: i,
    findById: o,
    exists: (d) => !!o(d),
    getAllByType: (d) => Object.values(e.draggables).filter((f) => f.descriptor.type === d)
  };
  function a(d) {
    return e.droppables[d] || null;
  }
  function c(d) {
    const f = a(d);
    return f || k(!1), f;
  }
  const l = {
    register: (d) => {
      e.droppables[d.descriptor.id] = d;
    },
    unregister: (d) => {
      const f = a(d.descriptor.id);
      f && d.uniqueId === f.uniqueId && delete e.droppables[d.descriptor.id];
    },
    getById: c,
    findById: a,
    exists: (d) => !!a(d),
    getAllByType: (d) => Object.values(e.droppables).filter((f) => f.descriptor.type === d)
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
function sC() {
  const e = K(iC, []);
  return W(() => function() {
    x.version.startsWith("16") || x.version.startsWith("17") ? requestAnimationFrame(e.clean) : e.clean();
  }, [e]), e;
}
var tc = x.createContext(null), eo = () => {
  const e = document.body;
  return e || k(!1), e;
};
const aC = {
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
var cC = aC;
const lC = (e) => `rfd-announcement-${e}`;
function uC(e) {
  const t = K(() => lC(e), [e]), n = z(null);
  return W(function() {
    const i = document.createElement("div");
    return n.current = i, i.id = t, i.setAttribute("aria-live", "assertive"), i.setAttribute("aria-atomic", "true"), $t(i.style, cC), eo().appendChild(i), function() {
      setTimeout(function() {
        const c = eo();
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
let dC = 0;
const xp = {
  separator: "::"
};
function fC(e, t = xp) {
  return K(() => `${e}${t.separator}${dC++}`, [t.separator, e]);
}
function pC(e, t = xp) {
  const n = x.useId();
  return K(() => `${e}${t.separator}${n}`, [t.separator, e, n]);
}
var nc = "useId" in x ? pC : fC;
function mC({
  contextId: e,
  uniqueId: t
}) {
  return `rfd-hidden-text-${e}-${t}`;
}
function gC({
  contextId: e,
  text: t
}) {
  const n = nc("hidden-text", {
    separator: "-"
  }), r = K(() => mC({
    contextId: e,
    uniqueId: n
  }), [n, e]);
  return W(function() {
    const i = document.createElement("div");
    return i.id = r, i.textContent = t, i.style.display = "none", eo().appendChild(i), function() {
      const a = eo();
      a.contains(i) && a.removeChild(i);
    };
  }, [r, t]), r;
}
var ii = x.createContext(null);
function Sp(e) {
  const t = z(e);
  return W(() => {
    t.current = e;
  }), t;
}
function hC() {
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
function er(e) {
  return e.phase === "IDLE" || e.phase === "DROP_ANIMATING" ? !1 : e.isDragging;
}
const bC = 9, yC = 13, rc = 27, Cp = 32, vC = 33, wC = 34, xC = 35, SC = 36, CC = 37, EC = 38, PC = 39, DC = 40, RC = {
  [yC]: !0,
  [bC]: !0
};
var Ep = (e) => {
  RC[e.keyCode] && e.preventDefault();
};
const IC = (() => {
  const e = "visibilitychange";
  return typeof document > "u" ? e : [e, `ms${e}`, `webkit${e}`, `moz${e}`, `o${e}`].find((r) => `on${r}` in document) || e;
})();
var si = IC;
const Pp = 0, Bl = 5;
function AC(e, t) {
  return Math.abs(t.x - e.x) >= Bl || Math.abs(t.y - e.y) >= Bl;
}
const jl = {
  type: "IDLE"
};
function OC({
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
      if (i !== Pp)
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
      if (!AC(u, c))
        return;
      o.preventDefault();
      const d = l.actions.fluidLift(c);
      r({
        type: "DRAGGING",
        actions: d
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
      if (o.keyCode === rc) {
        o.preventDefault(), e();
        return;
      }
      Ep(o);
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
    eventName: si,
    fn: e
  }];
}
function NC(e) {
  const t = z(jl), n = z(Tt), r = K(() => ({
    eventName: "mousedown",
    fn: function(d) {
      if (d.defaultPrevented || d.button !== Pp || d.ctrlKey || d.metaKey || d.shiftKey || d.altKey)
        return;
      const f = e.findClosestDraggableId(d);
      if (!f)
        return;
      const p = e.tryGetLock(f, s, {
        sourceEvent: d
      });
      if (!p)
        return;
      d.preventDefault();
      const m = {
        x: d.clientX,
        y: d.clientY
      };
      n.current(), l(p, m);
    }
  }), [e]), o = K(() => ({
    eventName: "webkitmouseforcewillbegin",
    fn: (u) => {
      if (u.defaultPrevented)
        return;
      const d = e.findClosestDraggableId(u);
      if (!d)
        return;
      const f = e.findOptionsForDraggable(d);
      f && (f.shouldRespectForcePress || e.canGetLock(d) && u.preventDefault());
    }
  }), [e]), i = V(function() {
    const d = {
      passive: !1,
      capture: !0
    };
    n.current = Ye(window, [o, r], d);
  }, [o, r]), s = V(() => {
    t.current.type !== "IDLE" && (t.current = jl, n.current(), i());
  }, [i]), a = V(() => {
    const u = t.current;
    s(), u.type === "DRAGGING" && u.actions.cancel({
      shouldBlockNextClick: !0
    }), u.type === "PENDING" && u.actions.abort();
  }, [s]), c = V(function() {
    const d = {
      capture: !0,
      passive: !1
    }, f = OC({
      cancel: a,
      completed: s,
      getPhase: () => t.current,
      setPhase: (p) => {
        t.current = p;
      }
    });
    n.current = Ye(window, f, d);
  }, [a, s]), l = V(function(d, f) {
    t.current.type !== "IDLE" && k(!1), t.current = {
      type: "PENDING",
      point: f,
      actions: d
    }, c();
  }, [c]);
  Ve(function() {
    return i(), function() {
      n.current();
    };
  }, [i]);
}
function $C() {
}
const TC = {
  [wC]: !0,
  [vC]: !0,
  [SC]: !0,
  [xC]: !0
};
function LC(e, t) {
  function n() {
    t(), e.cancel();
  }
  function r() {
    t(), e.drop();
  }
  return [{
    eventName: "keydown",
    fn: (o) => {
      if (o.keyCode === rc) {
        o.preventDefault(), n();
        return;
      }
      if (o.keyCode === Cp) {
        o.preventDefault(), r();
        return;
      }
      if (o.keyCode === DC) {
        o.preventDefault(), e.moveDown();
        return;
      }
      if (o.keyCode === EC) {
        o.preventDefault(), e.moveUp();
        return;
      }
      if (o.keyCode === PC) {
        o.preventDefault(), e.moveRight();
        return;
      }
      if (o.keyCode === CC) {
        o.preventDefault(), e.moveLeft();
        return;
      }
      if (TC[o.keyCode]) {
        o.preventDefault();
        return;
      }
      Ep(o);
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
    eventName: si,
    fn: n
  }];
}
function MC(e) {
  const t = z($C), n = K(() => ({
    eventName: "keydown",
    fn: function(i) {
      if (i.defaultPrevented || i.keyCode !== Cp)
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
      t.current = Ye(window, LC(l, u), {
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
const Fi = {
  type: "IDLE"
}, _C = 120, kC = 0.15;
function FC({
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
      n.keyCode === rc && n.preventDefault(), e();
    }
  }, {
    eventName: si,
    fn: e
  }];
}
function BC({
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
      if (!i || !(i.force >= kC))
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
    eventName: si,
    fn: e
  }];
}
function jC(e) {
  const t = z(Fi), n = z(Tt), r = V(function() {
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
      n.current(), d(g, b);
    }
  }), [e]), s = V(function() {
    const p = {
      capture: !0,
      passive: !1
    };
    n.current = Ye(window, [i], p);
  }, [i]), a = V(() => {
    const f = t.current;
    f.type !== "IDLE" && (f.type === "PENDING" && clearTimeout(f.longPressTimerId), o(Fi), n.current(), s());
  }, [s, o]), c = V(() => {
    const f = t.current;
    a(), f.type === "DRAGGING" && f.actions.cancel({
      shouldBlockNextClick: !0
    }), f.type === "PENDING" && f.actions.abort();
  }, [a]), l = V(function() {
    const p = {
      capture: !0,
      passive: !1
    }, m = {
      cancel: c,
      completed: a,
      getPhase: r
    }, g = Ye(window, BC(m), p), h = Ye(window, FC(m), p);
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
  }, [r, o]), d = V(function(p, m) {
    r().type !== "IDLE" && k(!1);
    const g = setTimeout(u, _C);
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
      m.type === "PENDING" && (clearTimeout(m.longPressTimerId), o(Fi));
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
const zC = ["input", "button", "textarea", "select", "option", "optgroup", "video", "audio"];
function Dp(e, t) {
  if (t == null)
    return !1;
  if (zC.includes(t.tagName.toLowerCase()))
    return !0;
  const r = t.getAttribute("contenteditable");
  return r === "true" || r === "" ? !0 : t === e ? !1 : Dp(e, t.parentElement);
}
function VC(e, t) {
  const n = t.target;
  return oi(n) ? Dp(e, n) : !1;
}
var WC = (e) => at(e.getBoundingClientRect()).center;
function GC(e) {
  return e instanceof wp(e).Element;
}
const HC = (() => {
  const e = "matches";
  return typeof document > "u" ? e : [e, "msMatchesSelector", "webkitMatchesSelector"].find((r) => r in Element.prototype) || e;
})();
function Rp(e, t) {
  return e == null ? null : e[HC](t) ? e : Rp(e.parentElement, t);
}
function UC(e, t) {
  return e.closest ? e.closest(t) : Rp(e, t);
}
function qC(e) {
  return `[${Cn.contextId}="${e}"]`;
}
function KC(e, t) {
  const n = t.target;
  if (!GC(n))
    return null;
  const r = qC(e), o = UC(n, r);
  return !o || !oi(o) ? null : o;
}
function YC(e, t) {
  const n = KC(e, t);
  return n ? n.getAttribute(Cn.draggableId) : null;
}
function XC(e, t) {
  const n = `[${fs.contextId}="${e}"]`, o = vp(document, n).find((i) => i.getAttribute(fs.id) === t);
  return !o || !oi(o) ? null : o;
}
function JC(e) {
  e.preventDefault();
}
function Pr({
  expected: e,
  phase: t,
  isLockActive: n,
  shouldWarn: r
}) {
  return !(!n() || e !== t);
}
function Ip({
  lockAPI: e,
  store: t,
  registry: n,
  draggableId: r
}) {
  if (e.isClaimed())
    return !1;
  const o = n.draggable.findById(r);
  return !(!o || !o.options.isEnabled || !gp(t.getState(), r));
}
function QC({
  lockAPI: e,
  contextId: t,
  store: n,
  registry: r,
  draggableId: o,
  forceSensorStop: i,
  sourceEvent: s
}) {
  if (!Ip({
    lockAPI: e,
    store: n,
    registry: r,
    draggableId: o
  }))
    return null;
  const c = r.draggable.getById(o), l = XC(t, c.descriptor.id);
  if (!l || s && !c.options.canDragInteractiveElements && VC(l, s))
    return null;
  const u = e.claim(i || Tt);
  let d = "PRE_DRAG";
  function f() {
    return c.options.shouldRespectForcePress;
  }
  function p() {
    return e.isActive(u);
  }
  function m(S, C) {
    Pr({
      expected: S,
      phase: d,
      isLockActive: p,
      shouldWarn: !0
    }) && n.dispatch(C());
  }
  const g = m.bind(null, "DRAGGING");
  function h(S) {
    function C() {
      e.release(), d = "COMPLETED";
    }
    d !== "PRE_DRAG" && (C(), k(!1)), n.dispatch(_S(S.liftActionArgs)), d = "DRAGGING";
    function P(E, O = {
      shouldBlockNextClick: !1
    }) {
      if (S.cleanup(), O.shouldBlockNextClick) {
        const T = Ye(window, [{
          eventName: "click",
          fn: JC,
          options: {
            once: !0,
            passive: !1,
            capture: !0
          }
        }]);
        setTimeout(T);
      }
      C(), n.dispatch(ap({
        reason: E
      }));
    }
    return {
      isActive: () => Pr({
        expected: "DRAGGING",
        phase: d,
        isLockActive: p,
        shouldWarn: !1
      }),
      shouldRespectForcePress: f,
      drop: (E) => P("DROP", E),
      cancel: (E) => P("CANCEL", E),
      ...S.actions
    };
  }
  function w(S) {
    const C = Kn((E) => {
      g(() => sp({
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
      moveUp: () => g(HS),
      moveRight: () => g(qS),
      moveDown: () => g(US),
      moveLeft: () => g(KS)
    };
    return h({
      liftActionArgs: {
        id: o,
        clientSelection: WC(l),
        movementMode: "SNAP"
      },
      cleanup: Tt,
      actions: S
    });
  }
  function b() {
    Pr({
      expected: "PRE_DRAG",
      phase: d,
      isLockActive: p,
      shouldWarn: !0
    }) && e.release();
  }
  return {
    isActive: () => Pr({
      expected: "PRE_DRAG",
      phase: d,
      isLockActive: p,
      shouldWarn: !1
    }),
    shouldRespectForcePress: f,
    fluidLift: w,
    snapLift: y,
    abort: b
  };
}
const ZC = [NC, MC, jC];
function eE({
  contextId: e,
  store: t,
  registry: n,
  customSensors: r,
  enableDefaultSensors: o
}) {
  const i = [...o ? ZC : [], ...r || []], s = U(() => hC())[0], a = V(function(h, w) {
    er(h) && !er(w) && s.tryAbandon();
  }, [s]);
  Ve(function() {
    let h = t.getState();
    return t.subscribe(() => {
      const y = t.getState();
      a(h, y), h = y;
    });
  }, [s, t, a]), Ve(() => s.tryAbandon, [s.tryAbandon]);
  const c = V((g) => Ip({
    lockAPI: s,
    registry: n,
    store: t,
    draggableId: g
  }), [s, n, t]), l = V((g, h, w) => QC({
    lockAPI: s,
    registry: n,
    contextId: e,
    store: t,
    draggableId: g,
    forceSensorStop: h || null,
    sourceEvent: w && w.sourceEvent ? w.sourceEvent : null
  }), [e, s, n, t]), u = V((g) => YC(e, g), [e]), d = V((g) => {
    const h = n.draggable.findById(g);
    return h ? h.options : null;
  }, [n.draggable]), f = V(function() {
    s.isClaimed() && (s.tryAbandon(), t.getState().phase !== "IDLE" && t.dispatch(Ka()));
  }, [s, t]), p = V(() => s.isClaimed(), [s]), m = K(() => ({
    canGetLock: c,
    tryGetLock: l,
    findClosestDraggableId: u,
    findOptionsForDraggable: d,
    tryReleaseLock: f,
    isLockClaimed: p
  }), [c, l, u, d, f, p]);
  for (let g = 0; g < i.length; g++)
    i[g](m);
}
const tE = (e) => ({
  onBeforeCapture: (t) => {
    const n = () => {
      e.onBeforeCapture && e.onBeforeCapture(t);
    };
    x.version.startsWith("16") || x.version.startsWith("17") ? n() : hs(n);
  },
  onBeforeDragStart: e.onBeforeDragStart,
  onDragStart: e.onDragStart,
  onDragEnd: e.onDragEnd,
  onDragUpdate: e.onDragUpdate
}), nE = (e) => ({
  ...Zn,
  ...e.autoScrollerOptions,
  durationDampening: {
    ...Zn.durationDampening,
    ...e.autoScrollerOptions
  }
});
function _n(e) {
  return e.current || k(!1), e.current;
}
function rE(e) {
  const {
    contextId: t,
    setCallbacks: n,
    sensors: r,
    nonce: o,
    dragHandleUsageInstructions: i
  } = e, s = z(null), a = Sp(e), c = V(() => tE(a.current), [a]), l = V(() => nE(a.current), [a]), u = uC(t), d = gC({
    contextId: t,
    text: i
  }), f = nC(t, o), p = V((T) => {
    _n(s).dispatch(T);
  }, []), m = K(() => vl({
    publishWhileDragging: FS,
    updateDroppableScroll: jS,
    updateDroppableIsEnabled: zS,
    updateDroppableIsCombineEnabled: VS,
    collectionStarting: BS
  }, p), [p]), g = sC(), h = K(() => T1(g, m), [g, m]), w = K(() => X1({
    scrollWindow: L1,
    scrollDroppable: h.scrollDroppable,
    getAutoScrollerOptions: l,
    ...vl({
      move: sp
    }, p)
  }), [h.scrollDroppable, p, l]), y = oC(t), b = K(() => A1({
    announce: u,
    autoScroller: w,
    dimensionMarshal: h,
    focusMarshal: y,
    getResponders: c,
    styleMarshal: f
  }), [u, w, h, y, c, f]);
  s.current = b;
  const v = V(() => {
    const T = _n(s);
    T.getState().phase !== "IDLE" && T.dispatch(Ka());
  }, []), S = V(() => {
    const T = _n(s).getState();
    return T.phase === "DROP_ANIMATING" ? !0 : T.phase === "IDLE" ? !1 : T.isDragging;
  }, []), C = K(() => ({
    isDragging: S,
    tryAbort: v
  }), [S, v]);
  n(C);
  const P = V((T) => gp(_n(s).getState(), T), []), E = V(() => Jt(_n(s).getState()), []), O = K(() => ({
    marshal: h,
    focus: y,
    contextId: t,
    canLift: P,
    isMovementAllowed: E,
    dragHandleUsageInstructionsId: d,
    registry: g
  }), [t, h, d, y, P, E, g]);
  return eE({
    contextId: t,
    store: b,
    registry: g,
    customSensors: r || null,
    enableDefaultSensors: e.enableDefaultSensors !== !1
  }), W(() => v, [v]), x.createElement(ii.Provider, {
    value: O
  }, x.createElement(ff, {
    context: tc,
    store: b
  }, e.children));
}
let oE = 0;
function iE() {
  return K(() => `${oE++}`, []);
}
function sE() {
  return x.useId();
}
var aE = "useId" in x ? sE : iE;
function cE(e) {
  const t = aE(), n = e.dragHandleUsageInstructions || Tr.dragHandleUsageInstructions;
  return x.createElement(Ex, null, (r) => x.createElement(rE, {
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
const zl = {
  dragging: 5e3,
  dropAnimating: 4500
}, lE = (e, t) => t ? jn.drop(t.duration) : e ? jn.snap : jn.fluid, uE = (e, t) => {
  if (e)
    return t ? Qn.opacity.drop : Qn.opacity.combining;
}, dE = (e) => e.forceShouldAnimate != null ? e.forceShouldAnimate : e.mode === "SNAP";
function fE(e) {
  const n = e.dimension.client, {
    offset: r,
    combineWith: o,
    dropping: i
  } = e, s = !!o, a = dE(e), c = !!i, l = c ? us.drop(r, s) : us.moveTo(r);
  return {
    position: "fixed",
    top: n.marginBox.top,
    left: n.marginBox.left,
    boxSizing: "border-box",
    width: n.borderBox.width,
    height: n.borderBox.height,
    transition: lE(a, i),
    transform: l,
    opacity: uE(s, c),
    zIndex: c ? zl.dropAnimating : zl.dragging,
    pointerEvents: "none"
  };
}
function pE(e) {
  return {
    transform: us.moveTo(e.offset),
    transition: e.shouldAnimateDisplacement ? void 0 : "none"
  };
}
function mE(e) {
  return e.type === "DRAGGING" ? fE(e) : pE(e);
}
function gE(e, t, n = pe) {
  const r = window.getComputedStyle(t), o = t.getBoundingClientRect(), i = Mf(o, r), s = Xr(i, n), a = {
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
function hE(e) {
  const t = nc("draggable"), {
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
    return m || k(!1), gE(n, m, p);
  }, [n, o]), u = K(() => ({
    uniqueId: t,
    descriptor: n,
    options: c,
    getDimension: l
  }), [n, l, c, t]), d = z(u), f = z(!0);
  Ve(() => (r.draggable.register(d.current), () => r.draggable.unregister(d.current)), [r.draggable]), Ve(() => {
    if (f.current) {
      f.current = !1;
      return;
    }
    const p = d.current;
    d.current = u, r.draggable.update(u, p);
  }, [u, r.draggable]);
}
var oc = x.createContext(null);
function to(e) {
  const t = ut(e);
  return t || k(!1), t;
}
function bE(e) {
  e.preventDefault();
}
const yE = (e) => {
  const t = z(null), n = V((C = null) => {
    t.current = C;
  }, []), r = V(() => t.current, []), {
    contextId: o,
    dragHandleUsageInstructionsId: i,
    registry: s
  } = to(ii), {
    type: a,
    droppableId: c
  } = to(oc), l = K(() => ({
    id: e.draggableId,
    index: e.index,
    type: a,
    droppableId: c
  }), [e.draggableId, e.index, a, c]), {
    children: u,
    draggableId: d,
    isEnabled: f,
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
      isEnabled: f
    }), [l, s, r, m, p, f]);
    hE(C);
  }
  const y = K(() => f ? {
    tabIndex: 0,
    role: "button",
    "aria-describedby": i,
    "data-rfd-drag-handle-draggable-id": d,
    "data-rfd-drag-handle-context-id": o,
    draggable: !1,
    onDragStart: bE
  } : null, [o, i, d, f]), b = V((C) => {
    h.type === "DRAGGING" && h.dropping && C.propertyName === "transform" && (x.version.startsWith("16") || x.version.startsWith("17") ? w() : hs(w));
  }, [w, h]), v = K(() => {
    const C = mE(h), P = h.type === "DRAGGING" && h.dropping ? b : void 0;
    return {
      innerRef: n,
      draggableProps: {
        "data-rfd-draggable-context-id": o,
        "data-rfd-draggable-id": d,
        style: C,
        onTransitionEnd: P
      },
      dragHandleProps: y
    };
  }, [o, y, d, h, b, n]), S = K(() => ({
    draggableId: l.id,
    type: l.type,
    source: {
      index: l.index,
      droppableId: l.droppableId
    }
  }), [l.droppableId, l.id, l.index, l.type]);
  return x.createElement(x.Fragment, null, u(v, h.snapshot, S));
};
var vE = yE, Ap = (e, t) => e === t, Op = (e) => {
  const {
    combine: t,
    destination: n
  } = e;
  return n ? n.droppableId : t ? t.droppableId : null;
};
const wE = (e) => e.combine ? e.combine.draggableId : null, xE = (e) => e.at && e.at.type === "COMBINE" ? e.at.combine.draggableId : null;
function SE() {
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
    if (er(o)) {
      if (o.critical.draggable.id !== i.draggableId)
        return null;
      const s = o.current.client.offset, a = o.dimensions.draggables[i.draggableId], c = ze(o.impact), l = xE(o.impact), u = o.forceShouldAnimate;
      return n(e(s.x, s.y), o.movementMode, a, i.isClone, c, l, u);
    }
    if (o.phase === "DROP_ANIMATING") {
      const s = o.completed;
      if (s.result.draggableId !== i.draggableId)
        return null;
      const a = i.isClone, c = o.dimensions.draggables[i.draggableId], l = s.result, u = l.mode, d = Op(l), f = wE(l), m = {
        duration: o.dropDuration,
        curve: Xa.drop,
        moveTo: o.newHomeClientOffset,
        opacity: f ? Qn.opacity.drop : null,
        scale: f ? Qn.scale.drop : null
      };
      return {
        mapped: {
          type: "DRAGGING",
          offset: o.newHomeClientOffset,
          dimension: c,
          dropping: m,
          draggingOver: d,
          combineWith: f,
          mode: u,
          forceShouldAnimate: null,
          snapshot: t(u, a, d, f, m)
        }
      };
    }
    return null;
  };
}
function Np(e = null) {
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
const CE = {
  mapped: {
    type: "SECONDARY",
    offset: pe,
    combineTargetFor: null,
    shouldAnimateDisplacement: !0,
    snapshot: Np(null)
  }
};
function EE() {
  const e = de((s, a) => ({
    x: s,
    y: a
  })), t = de(Np), n = de((s, a = null, c) => ({
    mapped: {
      type: "SECONDARY",
      offset: s,
      combineTargetFor: a,
      shouldAnimateDisplacement: c,
      snapshot: t(a)
    }
  })), r = (s) => s ? n(pe, s, !0) : null, o = (s, a, c, l) => {
    const u = c.displaced.visible[s], d = !!(l.inVirtualList && l.effected[s]), f = ti(c), p = f && f.draggableId === s ? a : null;
    if (!u) {
      if (!d)
        return r(p);
      if (c.displaced.invisible[s])
        return null;
      const h = Rn(l.displacedBy.point), w = e(h.x, h.y);
      return n(w, p, !0);
    }
    if (d)
      return r(p);
    const m = c.displacedBy.point, g = e(m.x, m.y);
    return n(g, p, u.shouldAnimate);
  };
  return (s, a) => {
    if (er(s))
      return s.critical.draggable.id === a.draggableId ? null : o(a.draggableId, s.critical.draggable.id, s.impact, s.afterCritical);
    if (s.phase === "DROP_ANIMATING") {
      const c = s.completed;
      return c.result.draggableId === a.draggableId ? null : o(a.draggableId, c.result.draggableId, c.impact, c.afterCritical);
    }
    return null;
  };
}
const PE = () => {
  const e = SE(), t = EE();
  return (r, o) => e(r, o) || t(r, o) || CE;
}, DE = {
  dropAnimationFinished: cp
}, RE = df(PE, DE, null, {
  context: tc,
  areStatePropsEqual: Ap
})(vE);
var IE = RE;
function $p(e) {
  return to(oc).isUsingCloneFor === e.draggableId && !e.isClone ? null : x.createElement(IE, e);
}
function AE(e) {
  const t = typeof e.isDragDisabled == "boolean" ? !e.isDragDisabled : !0, n = !!e.disableInteractiveElementBlocking, r = !!e.shouldRespectForcePress;
  return x.createElement($p, $t({}, e, {
    isClone: !1,
    isEnabled: t,
    canDragInteractiveElements: n,
    shouldRespectForcePress: r
  }));
}
const Tp = (e) => (t) => e === t, OE = Tp("scroll"), NE = Tp("auto"), Vl = (e, t) => t(e.overflowX) || t(e.overflowY), $E = (e) => {
  const t = window.getComputedStyle(e), n = {
    overflowX: t.overflowX,
    overflowY: t.overflowY
  };
  return Vl(n, OE) || Vl(n, NE);
}, TE = () => !1, Lp = (e) => e == null ? null : e === document.body ? TE() ? e : null : e === document.documentElement ? null : $E(e) ? e : Lp(e.parentElement);
var LE = Lp, ps = (e) => ({
  x: e.scrollLeft,
  y: e.scrollTop
});
const Mp = (e) => e ? window.getComputedStyle(e).position === "fixed" ? !0 : Mp(e.parentElement) : !1;
var ME = (e) => {
  const t = LE(e), n = Mp(e);
  return {
    closestScrollable: t,
    isFixedOnPage: n
  };
}, _E = ({
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
      scrollSize: f,
      client: p
    } = a, m = fp({
      scrollHeight: f.scrollHeight,
      scrollWidth: f.scrollWidth,
      height: p.paddingBox.height,
      width: p.paddingBox.width
    });
    return {
      pageMarginBox: a.page.marginBox,
      frameClient: p,
      scrollSize: f,
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
  })(), l = o === "vertical" ? Wa : Hf, u = xn({
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
const kE = (e, t) => {
  const n = _f(e);
  if (!t || e !== t)
    return n;
  const r = n.paddingBox.top - t.scrollTop, o = n.paddingBox.left - t.scrollLeft, i = r + t.scrollHeight, s = o + t.scrollWidth, c = Ba({
    top: r,
    right: s,
    bottom: i,
    left: o
  }, n.border);
  return ja({
    borderBox: c,
    margin: n.margin,
    border: n.border,
    padding: n.padding
  });
};
var FE = ({
  ref: e,
  descriptor: t,
  env: n,
  windowScroll: r,
  direction: o,
  isDropDisabled: i,
  isCombineEnabled: s,
  shouldClipSubject: a
}) => {
  const c = n.closestScrollable, l = kE(e, c), u = Xr(l, r), d = (() => {
    if (!c)
      return null;
    const p = _f(c), m = {
      scrollHeight: c.scrollHeight,
      scrollWidth: c.scrollWidth
    };
    return {
      client: p,
      page: Xr(p, r),
      scroll: ps(c),
      scrollSize: m,
      shouldClipSubject: a
    };
  })();
  return _E({
    descriptor: t,
    isEnabled: !i,
    isCombineEnabled: s,
    isFixedOnPage: n.isFixedOnPage,
    direction: o,
    client: l,
    page: u,
    closest: d
  });
};
const BE = {
  passive: !1
}, jE = {
  passive: !0
};
var Wl = (e) => e.shouldPublishImmediately ? BE : jE;
const Dr = (e) => e && e.env.closestScrollable || null;
function zE(e) {
  const t = z(null), n = to(ii), r = nc("droppable"), {
    registry: o,
    marshal: i
  } = n, s = Sp(e), a = K(() => ({
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
    return !v || !v.env.closestScrollable ? pe : ps(v.env.closestScrollable);
  }, []), d = V(() => {
    const v = u();
    l(v.x, v.y);
  }, [u, l]), f = K(() => Kn(d), [d]), p = V(() => {
    const v = t.current, S = Dr(v);
    if (v && S || k(!1), v.scrollOptions.shouldPublishImmediately) {
      d();
      return;
    }
    f();
  }, [f, d]), m = V((v, S) => {
    t.current && k(!1);
    const C = s.current, P = C.getDroppableRef();
    P || k(!1);
    const E = ME(P), O = {
      ref: P,
      descriptor: a,
      env: E,
      scrollOptions: S
    };
    t.current = O;
    const T = FE({
      ref: P,
      descriptor: a,
      env: E,
      windowScroll: v,
      direction: C.direction,
      isDropDisabled: C.isDropDisabled,
      isCombineEnabled: C.isCombineEnabled,
      shouldClipSubject: !C.ignoreContainerClipping
    }), $ = E.closestScrollable;
    return $ && ($.setAttribute(kl.contextId, n.contextId), $.addEventListener("scroll", p, Wl(O.scrollOptions))), T;
  }, [n.contextId, a, p, s]), g = V(() => {
    const v = t.current, S = Dr(v);
    return v && S || k(!1), ps(S);
  }, []), h = V(() => {
    const v = t.current;
    v || k(!1);
    const S = Dr(v);
    t.current = null, S && (f.cancel(), S.removeAttribute(kl.contextId), S.removeEventListener("scroll", p, Wl(v.scrollOptions)));
  }, [p, f]), w = V((v) => {
    const S = t.current;
    S || k(!1);
    const C = Dr(S);
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
function Bi() {
}
const Gl = {
  width: 0,
  height: 0,
  margin: Nx
}, VE = ({
  isAnimatingOpenOnMount: e,
  placeholder: t,
  animate: n
}) => e || n === "close" ? Gl : {
  height: t.client.borderBox.height,
  width: t.client.borderBox.width,
  margin: t.client.margin
}, WE = ({
  isAnimatingOpenOnMount: e,
  placeholder: t,
  animate: n
}) => {
  const r = VE({
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
    transition: n !== "none" ? jn.placeholder : null
  };
}, GE = (e) => {
  const t = z(null), n = V(() => {
    t.current && (clearTimeout(t.current), t.current = null);
  }, []), {
    animate: r,
    onTransitionEnd: o,
    onClose: i,
    contextId: s
  } = e, [a, c] = U(e.animate === "open");
  W(() => a ? r !== "open" ? (n(), c(!1), Bi) : t.current ? Bi : (t.current = setTimeout(() => {
    t.current = null, c(!1);
  }), n) : Bi, [r, a, n]);
  const l = V((d) => {
    d.propertyName === "height" && (o(), r === "close" && i());
  }, [r, i, o]), u = WE({
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
var HE = x.memo(GE);
class UE extends x.PureComponent {
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
const qE = (e) => {
  const t = ut(ii);
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
    ignoreContainerClipping: d,
    isDropDisabled: f,
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
      maxScroll: mp()
    });
  }, [r, h]);
  zE({
    droppableId: a,
    type: c,
    mode: l,
    direction: u,
    isDropDisabled: f,
    isCombineEnabled: p,
    ignoreContainerClipping: d,
    getDroppableRef: y
  });
  const C = K(() => x.createElement(UE, {
    on: e.placeholder,
    shouldAnimate: e.shouldAnimatePlaceholder
  }, ({
    onClose: $,
    data: M,
    animate: _
  }) => x.createElement(HE, {
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
    } = g, _ = x.createElement($p, {
      draggableId: $.draggableId,
      index: $.source.index,
      isClone: !0,
      isEnabled: !0,
      shouldRespectForcePress: !1,
      canDragInteractiveElements: !0
    }, (A, L) => M(A, L, $));
    return au.createPortal(_, w());
  }
  return x.createElement(oc.Provider, {
    value: O
  }, s(P, m), T());
};
var KE = qE;
function YE() {
  return document.body || k(!1), document.body;
}
const Hl = {
  mode: "standard",
  type: "DEFAULT",
  direction: "vertical",
  isDropDisabled: !1,
  isCombineEnabled: !1,
  ignoreContainerClipping: !1,
  renderClone: null,
  getContainerForClone: YE
}, _p = (e) => {
  let t = {
    ...e
  }, n;
  for (n in Hl)
    e[n] === void 0 && (t = {
      ...t,
      [n]: Hl[n]
    });
  return t;
}, ji = (e, t) => e === t.droppable.type, Ul = (e, t) => t.draggables[e.draggable.id], XE = () => {
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
    const d = l.descriptor.id;
    if (l.descriptor.droppableId === i) {
      const m = u ? {
        render: u,
        dragging: n(l.descriptor)
      } : null, g = {
        isDraggingOver: a,
        draggingOverWith: a ? d : null,
        draggingFromThisWith: d,
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
      draggingOverWith: d,
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
    const a = _p(s), c = a.droppableId, l = a.type, u = !a.isDropDisabled, d = a.renderClone;
    if (er(i)) {
      const f = i.critical;
      if (!ji(l, f))
        return t;
      const p = Ul(f, i.dimensions), m = ze(i.impact) === c;
      return r(c, u, m, m, p, d);
    }
    if (i.phase === "DROP_ANIMATING") {
      const f = i.completed;
      if (!ji(l, f.critical))
        return t;
      const p = Ul(f.critical, i.dimensions);
      return r(c, u, Op(f.result) === c, ze(f.impact) === c, p, d);
    }
    if (i.phase === "IDLE" && i.completed && !i.shouldFlush) {
      const f = i.completed;
      if (!ji(l, f.critical))
        return t;
      const p = ze(f.impact) === c, m = !!(f.impact.at && f.impact.at.type === "COMBINE"), g = f.critical.droppable.id === c;
      return p ? m ? e : t : g ? e : t;
    }
    return t;
  };
}, JE = {
  updateViewportMaxScroll: GS
}, QE = df(XE, JE, (e, t, n) => ({
  ..._p(n),
  ...e,
  ...t
}), {
  context: tc,
  areStatePropsEqual: Ap
})(KE);
var ZE = QE, kp = { exports: {} }, eP = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED", tP = eP, nP = tP;
function Fp() {
}
function Bp() {
}
Bp.resetWarningCache = Fp;
var rP = function() {
  function e(r, o, i, s, a, c) {
    if (c !== nP) {
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
    checkPropTypes: Bp,
    resetWarningCache: Fp
  };
  return n.PropTypes = n, n;
};
kp.exports = rP();
var oP = kp.exports;
const Yt = /* @__PURE__ */ cu(oP);
var iP = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, sP = Object.defineProperty, aP = Object.defineProperties, cP = Object.getOwnPropertyDescriptors, no = Object.getOwnPropertySymbols, jp = Object.prototype.hasOwnProperty, zp = Object.prototype.propertyIsEnumerable, ql = (e, t, n) => t in e ? sP(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Kl = (e, t) => {
  for (var n in t || (t = {}))
    jp.call(t, n) && ql(e, n, t[n]);
  if (no)
    for (var n of no(t))
      zp.call(t, n) && ql(e, n, t[n]);
  return e;
}, lP = (e, t) => aP(e, cP(t)), uP = (e, t) => {
  var n = {};
  for (var r in e)
    jp.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && no)
    for (var r of no(e))
      t.indexOf(r) < 0 && zp.call(e, r) && (n[r] = e[r]);
  return n;
}, Vp = (e, t, n) => {
  const r = ie(
    (o, i) => {
      var s = o, { color: a = "currentColor", size: c = 24, stroke: l = 2, children: u } = s, d = uP(s, ["color", "size", "stroke", "children"]);
      return fc(
        "svg",
        Kl(lP(Kl({
          ref: i
        }, iP), {
          width: c,
          height: c,
          stroke: a,
          strokeWidth: l,
          className: `tabler-icon tabler-icon-${e}`
        }), d),
        [...n.map(([f, p]) => fc(f, p)), ...u || []]
      );
    }
  );
  return r.propTypes = {
    color: Yt.string,
    size: Yt.oneOfType([Yt.string, Yt.number]),
    stroke: Yt.oneOfType([Yt.string, Yt.number])
  }, r.displayName = `${t}`, r;
}, dP = Vp("grip-vertical", "IconGripVertical", [
  ["path", { d: "M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-0" }],
  ["path", { d: "M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-1" }],
  ["path", { d: "M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-2" }],
  ["path", { d: "M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-3" }],
  ["path", { d: "M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-4" }],
  ["path", { d: "M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", key: "svg-5" }]
]), fP = Vp("pencil", "IconPencil", [
  [
    "path",
    {
      d: "M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4",
      key: "svg-0"
    }
  ],
  ["path", { d: "M13.5 6.5l4 4", key: "svg-1" }]
]);
function Wp(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (n = Wp(e[t])) && (r && (r += " "), r += n);
    } else
      for (n in e)
        e[n] && (r && (r += " "), r += n);
  return r;
}
function pP() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++)
    (e = arguments[n]) && (t = Wp(e)) && (r && (r += " "), r += t);
  return r;
}
const mP = "_item_1ca4j_1", gP = "_itemDragging_1ca4j_23", hP = "_symbol_1ca4j_31", bP = "_dragHandle_1ca4j_43", Rr = {
  item: mP,
  itemDragging: gP,
  symbol: hP,
  dragHandle: bP
};
function yP({ id: e }) {
  const t = dr(), { t: n } = Ut(), r = ue((s) => s.settings.filterDictionaries), o = (s) => {
    if (!s.destination)
      return;
    const a = Array.from(r), [c] = a.splice(s.source.index, 1);
    a.splice(s.destination.index, 0, c), t(Fa(a));
  }, i = r.map((s, a) => /* @__PURE__ */ F.jsx(AE, { index: a, draggableId: s.dictionaryUri, children: (c, l) => /* @__PURE__ */ F.jsxs(
    "div",
    {
      className: pP(Rr.item, { [Rr.itemDragging]: l.isDragging }),
      ref: c.innerRef,
      ...c.draggableProps,
      children: [
        /* @__PURE__ */ F.jsx("div", { ...c.dragHandleProps, className: Rr.dragHandle, children: /* @__PURE__ */ F.jsx(dP, { style: { width: D(18), height: D(18) }, stroke: 1.5 }) }),
        /* @__PURE__ */ F.jsx(Xe, { className: Rr.uri, children: s.dictionaryName })
      ]
    }
  ) }, s.dictionaryUri));
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ F.jsxs(oe.Control, { children: [
      /* @__PURE__ */ F.jsx(Dn, { order: 5, children: n("Sort filter dictionaries") }),
      /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "dimmed", children: n("Sort filter dictionaries help text") })
    ] }),
    /* @__PURE__ */ F.jsx(oe.Panel, { children: /* @__PURE__ */ F.jsx(cE, { onDragEnd: o, children: /* @__PURE__ */ F.jsx(ZE, { droppableId: "dnd-list", direction: "vertical", children: (s) => /* @__PURE__ */ F.jsxs("div", { ...s.droppableProps, ref: s.innerRef, children: [
      i,
      s.placeholder
    ] }) }) }) })
  ] }, e);
}
const vP = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
function wP(e) {
  return typeof e == "string" && vP.test(e);
}
const he = [];
for (let e = 0; e < 256; ++e)
  he.push((e + 256).toString(16).slice(1));
function xP(e, t = 0) {
  return he[e[t + 0]] + he[e[t + 1]] + he[e[t + 2]] + he[e[t + 3]] + "-" + he[e[t + 4]] + he[e[t + 5]] + "-" + he[e[t + 6]] + he[e[t + 7]] + "-" + he[e[t + 8]] + he[e[t + 9]] + "-" + he[e[t + 10]] + he[e[t + 11]] + he[e[t + 12]] + he[e[t + 13]] + he[e[t + 14]] + he[e[t + 15]];
}
function SP(e) {
  if (!wP(e))
    throw TypeError("Invalid UUID");
  let t;
  const n = new Uint8Array(16);
  return n[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24, n[1] = t >>> 16 & 255, n[2] = t >>> 8 & 255, n[3] = t & 255, n[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8, n[5] = t & 255, n[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8, n[7] = t & 255, n[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8, n[9] = t & 255, n[10] = (t = parseInt(e.slice(24, 36), 16)) / 1099511627776 & 255, n[11] = t / 4294967296 & 255, n[12] = t >>> 24 & 255, n[13] = t >>> 16 & 255, n[14] = t >>> 8 & 255, n[15] = t & 255, n;
}
function CP(e) {
  e = unescape(encodeURIComponent(e));
  const t = [];
  for (let n = 0; n < e.length; ++n)
    t.push(e.charCodeAt(n));
  return t;
}
const EP = "6ba7b810-9dad-11d1-80b4-00c04fd430c8", PP = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
function DP(e, t, n) {
  function r(o, i, s, a) {
    var c;
    if (typeof o == "string" && (o = CP(o)), typeof i == "string" && (i = SP(i)), ((c = i) === null || c === void 0 ? void 0 : c.length) !== 16)
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    let l = new Uint8Array(16 + o.length);
    if (l.set(i), l.set(o, i.length), l = n(l), l[6] = l[6] & 15 | t, l[8] = l[8] & 63 | 128, s) {
      a = a || 0;
      for (let u = 0; u < 16; ++u)
        s[a + u] = l[u];
      return s;
    }
    return xP(l);
  }
  try {
    r.name = e;
  } catch {
  }
  return r.DNS = EP, r.URL = PP, r;
}
function RP(e, t, n, r) {
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
function zi(e, t) {
  return e << t | e >>> 32 - t;
}
function IP(e) {
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
      a[p] = zi(a[p - 3] ^ a[p - 8] ^ a[p - 14] ^ a[p - 16], 1);
    let c = n[0], l = n[1], u = n[2], d = n[3], f = n[4];
    for (let p = 0; p < 80; ++p) {
      const m = Math.floor(p / 20), g = zi(c, 5) + RP(m, l, u, d) + f + t[m] + a[p] >>> 0;
      f = d, d = u, u = zi(l, 30) >>> 0, l = c, c = g;
    }
    n[0] = n[0] + c >>> 0, n[1] = n[1] + l >>> 0, n[2] = n[2] + u >>> 0, n[3] = n[3] + d >>> 0, n[4] = n[4] + f >>> 0;
  }
  return [n[0] >> 24 & 255, n[0] >> 16 & 255, n[0] >> 8 & 255, n[0] & 255, n[1] >> 24 & 255, n[1] >> 16 & 255, n[1] >> 8 & 255, n[1] & 255, n[2] >> 24 & 255, n[2] >> 16 & 255, n[2] >> 8 & 255, n[2] & 255, n[3] >> 24 & 255, n[3] >> 16 & 255, n[3] >> 8 & 255, n[3] & 255, n[4] >> 24 & 255, n[4] >> 16 & 255, n[4] >> 8 & 255, n[4] & 255];
}
const AP = DP("v5", 80, IP), OP = AP, NP = "b989028b-337b-417f-b917-c4e17384b8c5";
function $P(e) {
  return OP(e, NP);
}
function Yl(e, t) {
  const n = t.find((r) => r.dictionaryUri === e.uri);
  return n || {
    dictionaryUri: e.uri,
    dictionaryName: e.name,
    parameterName: `bsdd/${e.organizationCodeOwner}/${e.name}`.replace(/\s/g, "-"),
    parameterId: $P(e.uri),
    parameterMapping: ""
  };
}
function TP({ id: e }) {
  const t = dr(), { t: n } = Ut(), r = ue((f) => f.bsdd.dictionaries), o = ue((f) => f.settings.filterDictionaries), i = ue((f) => f.settings.mainDictionary), [s, a] = U([]), [c, l] = U([]);
  W(() => {
    a(Object.values(r).map((f) => ({ value: f.uri, label: f.name })));
  }, [r, a]), W(() => {
    l(
      o.map((f) => ({ value: f.dictionaryUri, label: f.dictionaryName }))
    );
  }, [o, l]);
  const u = (f) => {
    const p = Object.values(r).find(
      (m) => m.uri === f
    );
    if (p) {
      const m = [];
      i && m.push(i), t(Nf(Yl(p, m)));
    }
  }, d = (f) => {
    const p = Object.values(r).filter((m) => f.includes(m.uri)).map((m) => Yl(m, o));
    t(Fa(p));
  };
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ F.jsxs(oe.Control, { children: [
      /* @__PURE__ */ F.jsx(Dn, { order: 5, children: n("Dictionary selection") }),
      /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "dimmed", children: n("Dictionary selection help text") })
    ] }),
    /* @__PURE__ */ F.jsxs(oe.Panel, { children: [
      /* @__PURE__ */ F.jsx(
        lr,
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
      /* @__PURE__ */ F.jsx(ha, { h: "xs" }),
      /* @__PURE__ */ F.jsx(
        ma,
        {
          id: "filterDictionaries",
          label: n("Selection filter dictionaries"),
          value: c.map((f) => f.value),
          onChange: (f) => {
            d(f);
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
const LP = () => {
  const { t: e, i18n: t } = Ut(), n = [
    { value: "en", label: "English" },
    { value: "nl", label: "Nederlands" }
  ], r = (o) => {
    o && t.changeLanguage(o);
  };
  return /* @__PURE__ */ F.jsx(lr, { label: e("Language"), data: n, value: t.language, onChange: r, placeholder: e("Select language") });
};
function MP({ id: e }) {
  const t = dr(), { t: n } = Ut(), r = ue((i) => i.settings.bsddApiEnvironment), o = (i) => {
    i && t(ix(i));
  };
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: e.toString(), children: [
    /* @__PURE__ */ F.jsxs(oe.Control, { children: [
      /* @__PURE__ */ F.jsx(Dn, { order: 5, children: n("General settings") }),
      /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "dimmed", children: n("General settings help text") })
    ] }),
    /* @__PURE__ */ F.jsxs(oe.Panel, { children: [
      /* @__PURE__ */ F.jsx(LP, {}),
      " ",
      /* @__PURE__ */ F.jsx(ha, { h: "xs" }),
      /* @__PURE__ */ F.jsx(
        lr,
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
function _P({}) {
  const e = ue((o) => o.settings.mainDictionary), t = ue((o) => o.settings.filterDictionaries), n = ue((o) => o.settings.language), r = ue(fr);
  return W(() => {
    var i;
    if (!r || !e)
      return;
    const o = {
      bsddApiEnvironment: r,
      mainDictionary: e,
      filterDictionaries: t,
      language: n
    };
    console.log("Save settings", o), (i = window == null ? void 0 : window.bsddBridge) == null || i.saveSettings(JSON.stringify(o));
  }, [r, e, t, n]), /* @__PURE__ */ F.jsx(st.Panel, { value: "settings", children: /* @__PURE__ */ F.jsxs(oe, { defaultValue: ["2"], multiple: !0, children: [
    /* @__PURE__ */ F.jsx(MP, { id: 1 }),
    /* @__PURE__ */ F.jsx(TP, { id: 2 }),
    /* @__PURE__ */ F.jsx(ax, { id: 3 }),
    /* @__PURE__ */ F.jsx(yP, { id: 4 })
  ] }) });
}
class kP {
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
      const u = (typeof n == "boolean" ? n : this.baseApiParams.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {}, d = this.mergeRequestParams(l, u), f = i && this.toQueryString(i), p = this.contentFormatters[
        o || "application/json"
        /* Json */
      ], m = s || d.format;
      return this.customFetch(`${a || this.baseUrl || ""}${r}${f ? `?${f}` : ""}`, {
        ...d,
        headers: {
          ...d.headers || {},
          ...o && o !== "multipart/form-data" ? { "Content-Type": o } : {}
        },
        signal: (c ? this.createAbortSignal(c) : d.signal) || null,
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
class FP extends kP {
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
class gr extends FP {
  constructor(t) {
    super({ baseUrl: t });
  }
}
const Gp = 500, BP = 500;
let Zt = null, Lr = {};
const Xl = {
  classes: {},
  dictionaries: {},
  dictionaryClasses: {}
}, jP = (e) => {
  const t = fr(e);
  return t && (!Zt || Zt.baseUrl !== t) && (Zt = new gr(t)), Zt;
};
function zP(e) {
  return (t) => {
    Zt = new gr(e), Lr = {}, t(GP());
  };
}
const Hp = Ma({
  name: "bsdd",
  initialState: Xl,
  reducers: {
    resetState: () => Xl,
    addClass: (e, t) => {
      e.classes[t.payload.uri] = t.payload.data;
    },
    addDictionaryClasses: (e, t) => {
      e.dictionaryClasses[t.payload.uri] = t.payload.data;
    }
  },
  extraReducers: (e) => {
    e.addCase(Up.fulfilled, (t, n) => {
      t.dictionaries = n.payload;
    }).addCase(ms.rejected, (t, n) => {
      console.error("fetch dictionary classes failed", n.error);
    });
  }
});
Zo("bsdd/fetchClass", async (e, { getState: t, dispatch: n }) => {
  const r = t();
  if (r.bsdd.classes[e])
    return r.bsdd.classes[e];
  if (!Zt)
    throw new Error("BsddApi is not initialized");
  const o = await Zt.api.classV1List({
    uri: e,
    includeClassProperties: !0,
    includeChildClassReferences: !0,
    includeClassRelations: !0
  });
  if (!o.ok)
    throw new Error(`HTTP error! status: ${o.status}`);
  const i = o.data;
  return n({ type: "bsdd/addClass", payload: { uri: e, data: i } }), i;
});
const Up = Zo(
  "bsdd/fetchDictionaries",
  async (e, t) => {
    if (!e)
      return t.rejectWithValue("No bsddApiEnvironment provided");
    const n = new gr(e), r = BP;
    let o = 0, i = [];
    for (; ; ) {
      const a = await n.api.dictionaryV1List({ Limit: r, Offset: o });
      if (!a.ok)
        throw new Error(`HTTP error! status: ${a.status}`);
      const { data: { dictionaries: c, totalCount: l } = {} } = a;
      if (c && typeof l < "u") {
        if (i.push(...c), o += r, i.length >= l)
          break;
      } else
        throw new Error(`bSDD API error! status: ${a.status}`);
    }
    return i.reduce((a, c) => (a[c.uri] = c, a), {});
  }
);
async function VP(e, t, n) {
  const r = await e.api.dictionaryV1ClassesList({
    Uri: t,
    UseNestedClasses: !1,
    Limit: Gp,
    Offset: n,
    languageCode: "en"
  });
  if (!r.ok)
    throw new Error(`HTTP error! status: ${r.status}`);
  return r.data;
}
const ms = Zo(
  "bsdd/fetchDictionaryClasses",
  async (e, { getState: t, dispatch: n }) => {
    const r = t();
    if (r.bsdd.dictionaryClasses[e])
      return r.bsdd.dictionaryClasses[e];
    if (Lr[e])
      return await Lr[e];
    const o = (async () => {
      const s = jP(t());
      if (!s)
        throw new Error("BsddApi is not initialized");
      let a = [], c = 0, l;
      for (; ; ) {
        const u = await VP(s, e, c), d = u.classes ?? [];
        if (a.push(...d), c === 0 && (l = u.classesTotalCount, l == null))
          throw new Error("Total count is null or undefined");
        if (l != null && a.length >= l)
          break;
        c += Gp;
      }
      return n({ type: "bsdd/addDictionaryClasses", payload: { uri: e, classes: a } }), a;
    })();
    return Lr[e] = o, await o;
  }
), WP = (e, t) => e.bsdd.dictionaryClasses[t], { resetState: GP } = Hp.actions, HP = Hp.reducer;
function UP(e) {
  return {
    type: "IfcClassification",
    source: e == null ? void 0 : e.organizationCodeOwner,
    edition: (e == null ? void 0 : e.version) || void 0,
    editionDate: (e == null ? void 0 : e.releaseDate) || void 0,
    name: e == null ? void 0 : e.name,
    location: e == null ? void 0 : e.uri
    // specification: bsddDictionary?.uri,
  };
}
const qP = async (e, t, n) => {
  let r = e, o = "invalid", i = null;
  const s = ka(n()), { location: a, identification: c, referencedSource: l } = e;
  let u = null;
  if (l != null && l.location && (u = WP(n(), l.location), u || (u = (await t(ms(l.location))).payload)), a && (o = "valid"), !a && c && u && u) {
    let d = u.find((f) => (f.code, f.code === c));
    if (d || (d = u.find((f) => f.name === e.name)), d) {
      if (o = "fixed", d != null && d.uri && (r.location = d == null ? void 0 : d.uri), d != null && d.name && (r.name = d == null ? void 0 : d.name), d != null && d.code && (r.identification = d == null ? void 0 : d.code), !i)
        for (let f = 0; f < s.length; f++) {
          const p = await t(ms(s[f].dictionaryUri));
          if (u = p.payload, p.payload.find((g) => g.uri === (d == null ? void 0 : d.uri))) {
            const g = s[f].dictionaryUri;
            i = n().bsdd.dictionaries[g];
            break;
          }
        }
      if (i) {
        const f = UP(i);
        r = { ...e, referencedSource: f };
      }
    }
  }
  return { validationState: o, newReference: r };
};
Zo(
  "ifcData/setValidated",
  async (e, { dispatch: t, getState: n }) => {
    n();
    const r = await Promise.all(
      e.map(async (o) => {
        const { hasAssociations: i } = o;
        if (i) {
          const s = (await Promise.all(
            i.map(async (a) => {
              if (a.type === "IfcClassificationReference") {
                const { validationState: c, newReference: l } = await qP(
                  a,
                  t,
                  n
                );
                return c === "invalid" ? null : l;
              }
              return a;
            })
          )).filter((a) => a !== null);
          return { ...o, hasAssociations: s };
        }
        return o;
      })
    );
    t(Kp(r));
  }
);
const KP = {
  ifcEntities: []
}, qp = Ma({
  name: "ifcData",
  initialState: KP,
  reducers: {
    setIfcData: (e, t) => {
      e.ifcEntities = t.payload;
    }
  }
}), YP = (e) => e.ifcData.ifcEntities, { setIfcData: Kp } = qp.actions, XP = qp.reducer;
function JP(e) {
  const { type: t } = e;
  return t === "IfcClassificationReference";
}
function QP(e, t) {
  const n = t.referencedSource;
  return n && n.location ? n.location === e : !1;
}
function ZP(e, t) {
  const n = e.hasAssociations;
  return n && n.find(
    (o) => JP(o) && QP(t.dictionaryUri, o)
  ) ? t.dictionaryUri : null;
}
const gs = {
  grey: "#B0B0B0",
  // grey for undefined
  red: "#FF0000",
  // bright red
  orange: "#FFA500",
  // bright orange
  green: "#00C853"
  // bright green
};
function eD({ item: e, bsddClass: t, index: n, setCardColor: r }) {
  const { t: o } = Ut(), i = ue(ka), [s, a] = U("grey"), [c, l] = U([]), [u, d] = U([]);
  function f(m) {
    a(m), r(n, m);
  }
  W(() => {
    c.every((m) => m !== null) ? f("green") : c.some((m) => m !== null) ? f("orange") : f("red");
  }, [c]), W(() => {
    const m = c.map((g) => g !== null ? "green" : "red");
    d(m);
  }, [c]), W(() => {
    l(
      i.map((m) => ZP(e, m))
    );
  }, [e, i]);
  function p(m) {
    var h;
    const g = JSON.stringify(m);
    (h = window == null ? void 0 : window.bsddBridge) == null || h.bsddSearch(g);
  }
  return /* @__PURE__ */ F.jsxs(zn, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
    /* @__PURE__ */ F.jsx(Vn, { size: "1.5em", color: gs[s] }),
    /* @__PURE__ */ F.jsxs(tn, { position: "bottom-end", shadow: "md", children: [
      /* @__PURE__ */ F.jsx(tn.Target, { children: /* @__PURE__ */ F.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ F.jsx(Xe, { className: "truncate", children: e.name }) }) }),
      /* @__PURE__ */ F.jsxs(tn.Dropdown, { children: [
        /* @__PURE__ */ F.jsx(Xe, { children: "Validation per class:" }),
        i.map((m, g) => (c[g], /* @__PURE__ */ F.jsxs(zn, { mt: "xs", justify: "space-between", className: "flexGroup", children: [
          /* @__PURE__ */ F.jsx(Vn, { size: "1em", color: gs[u[g]] }),
          /* @__PURE__ */ F.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ F.jsx(Xe, { className: "truncate", children: m.dictionaryName }) })
        ] }, m.dictionaryUri)))
      ] })
    ] }),
    /* @__PURE__ */ F.jsx(cr, { label: o("Attach to type"), children: /* @__PURE__ */ F.jsx(xo, { radius: "xl", onClick: () => p(e), children: /* @__PURE__ */ F.jsx(fP, { size: 20 }) }) })
  ] });
}
function tD({ bsddEnvironmentName: e, category: t, opened: n, bbbr: r, items: o, index: i }) {
  const { t: s } = Ut(), [a, c] = U(), [l, u] = U("grey"), [d, f] = U(new Array(o.length).fill("grey")), p = ue(fr);
  function m(h, w) {
    f((y) => {
      const b = [...y];
      return b[h] = w, b;
    });
  }
  W(() => {
    const h = g(t, r);
    if (p && h) {
      const w = h;
      new gr(p).api.classV1List({
        uri: w.uri,
        includeClassProperties: !0,
        includeChildClassReferences: !0,
        includeClassRelations: !0
      }).then((b) => {
        if (!b.ok)
          throw new Error(`HTTP error! status: ${b.status}`);
        b.data && c(b.data);
      }).catch((b) => {
        throw new Error(`bSDD API error! status: ${b}`);
      });
    }
  }, [t, r]), W(() => {
    d.includes("orange") || d.includes("red") && d.includes("green") ? u("orange") : d.every((h) => h === "red") ? u("red") : d.every((h) => h === "green") && u("green");
  }, [d]);
  function g(h, w) {
    let y;
    return w.filter((b) => {
      b.code === h && (y = b);
    }), y || !1;
  }
  return /* @__PURE__ */ F.jsxs(oe.Item, { value: i, children: [
    /* @__PURE__ */ F.jsx(oe.Control, { children: /* @__PURE__ */ F.jsxs(zn, { justify: "space-between", className: "flexGroup", children: [
      /* @__PURE__ */ F.jsx(Vn, { size: "1.5em", color: gs[l], children: /* @__PURE__ */ F.jsx(Xe, { size: "xs", c: "white", children: o.length }) }),
      /* @__PURE__ */ F.jsx("div", { className: "flexTextContainer", children: /* @__PURE__ */ F.jsx(Xe, { className: "truncate", children: t.length > 0 ? t : s("No description") }) })
    ] }) }),
    /* @__PURE__ */ F.jsx(oe.Panel, { mt: "-xs", pl: "xl", children: o.map((h, w) => /* @__PURE__ */ F.jsx(
      eD,
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
let nD;
function rD(e, t) {
  const n = e.reduce((r, o) => {
    const i = o[t];
    return i === void 0 || typeof i != "string" ? (r[""] || (r[""] = []), r[""].push(o)) : (r[i] || (r[i] = []), r[i].push(o)), r;
  }, {});
  return Object.keys(n).sort().reduce((r, o) => (r[o] = n[o], r), {});
}
function oD({}) {
  const e = ue((c) => c.settings.mainDictionary), t = ue(fr), n = ue(YP), [r, o] = U({}), [i, s] = U([]);
  W(() => {
    (async () => {
      try {
      } catch (l) {
        console.error(l.message);
      }
    })();
  }, []), W(() => {
    if (!t || !e)
      return;
    new gr(t).api.dictionaryV1ClassesList({ Uri: e.dictionaryUri }).then((l) => {
      if (!l.ok)
        throw new Error(`HTTP error! status: ${l.status}`);
      l.data && l.data.classes && s(l.data.classes);
    }).catch((l) => {
      throw new Error(`bSDD API error! status: ${l}`);
    });
  }, [e, t]);
  const a = rD(n, "description");
  return /* @__PURE__ */ F.jsx(st.Panel, { value: "koppelen", children: /* @__PURE__ */ F.jsx(oe, { chevronPosition: "left", children: Object.entries(a).map(([c, l], u) => /* @__PURE__ */ F.jsx(
    tD,
    {
      bsddEnvironmentName: t,
      category: c,
      items: l,
      opened: r,
      bbbr: i,
      index: c || u.toString()
    },
    c
  )) }) });
}
function iD() {
  const e = dr(), { t } = Ut(), n = ue(fr);
  return W(() => {
    console.log("bsddApiEnvironment changed"), n && (e(zP(n)), e(Up(n)));
  }, [n, e]), window.updateSelection = (r) => {
    console.log("updateSelection", r);
    const { settings: o, ifcData: i } = r;
    e(ox(o)), e(Kp(i));
  }, /* @__PURE__ */ F.jsx(F.Fragment, { children: /* @__PURE__ */ F.jsx(ua, { size: "40rem", children: /* @__PURE__ */ F.jsxs(st, { defaultValue: "koppelen", children: [
    /* @__PURE__ */ F.jsxs(st.List, { grow: !0, children: [
      /* @__PURE__ */ F.jsx(st.Tab, { value: "koppelen", children: t("Link") }),
      /* @__PURE__ */ F.jsx(st.Tab, { value: "settings", children: t("Settings") })
    ] }),
    /* @__PURE__ */ F.jsx(oD, {}),
    /* @__PURE__ */ F.jsx(_P, {})
  ] }) }) });
}
const sD = {
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
class ro {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(t, n);
  }
  init(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = n.prefix || "i18next:", this.logger = t || sD, this.options = n, this.debug = n.debug;
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
    return new ro(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new ro(this.logger, t);
  }
}
var pt = new ro();
class ai {
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
function Jl(e) {
  return e == null ? "" : "" + e;
}
function aD(e, t, n) {
  e.forEach((r) => {
    t[r] && (n[r] = t[r]);
  });
}
function ic(e, t, n) {
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
function Ql(e, t, n) {
  const {
    obj: r,
    k: o
  } = ic(e, t, Object);
  r[o] = n;
}
function cD(e, t, n, r) {
  const {
    obj: o,
    k: i
  } = ic(e, t, Object);
  o[i] = o[i] || [], r && (o[i] = o[i].concat(n)), r || o[i].push(n);
}
function oo(e, t) {
  const {
    obj: n,
    k: r
  } = ic(e, t);
  if (n)
    return n[r];
}
function lD(e, t, n) {
  const r = oo(e, n);
  return r !== void 0 ? r : oo(t, n);
}
function Yp(e, t, n) {
  for (const r in t)
    r !== "__proto__" && r !== "constructor" && (r in e ? typeof e[r] == "string" || e[r] instanceof String || typeof t[r] == "string" || t[r] instanceof String ? n && (e[r] = t[r]) : Yp(e[r], t[r], n) : e[r] = t[r]);
  return e;
}
function fn(e) {
  return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var uD = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function dD(e) {
  return typeof e == "string" ? e.replace(/[&<>"'\/]/g, (t) => uD[t]) : e;
}
const fD = [" ", ",", "?", "!", ";"];
function pD(e, t, n) {
  t = t || "", n = n || "";
  const r = fD.filter((s) => t.indexOf(s) < 0 && n.indexOf(s) < 0);
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
function io(e, t) {
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
      return l ? io(c, l, n) : void 0;
    }
    o = o[r[i]];
  }
  return o;
}
function so(e) {
  return e && e.indexOf("_") > 0 ? e.replace("_", "-") : e;
}
class Zl extends ai {
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
    const c = oo(this.data, a);
    return c || !s || typeof r != "string" ? c : io(this.data && this.data[t] && this.data[t][n], r, i);
  }
  addResource(t, n, r, o) {
    let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const s = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator;
    let a = [t, n];
    r && (a = a.concat(s ? r.split(s) : r)), t.indexOf(".") > -1 && (a = t.split("."), o = n, n = a[1]), this.addNamespaces(n), Ql(this.data, a, o), i.silent || this.emit("added", t, n, r, o);
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
    let c = oo(this.data, a) || {};
    o ? Yp(c, r, i) : c = {
      ...c,
      ...r
    }, Ql(this.data, a, c), s.silent || this.emit("added", t, n, r);
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
var Xp = {
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
const eu = {};
class ao extends ai {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), aD(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = pt.create("translator");
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
    const s = r && t.indexOf(r) > -1, a = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !pD(t, r, o);
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
    const d = this.resolve(t, n);
    let f = d && d.res;
    const p = d && d.usedKey || s, m = d && d.exactUsedKey || s, g = Object.prototype.toString.apply(f), h = ["[object Number]", "[object Function]", "[object RegExp]"], w = n.joinArrays !== void 0 ? n.joinArrays : this.options.joinArrays, y = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (y && f && (typeof f != "string" && typeof f != "boolean" && typeof f != "number") && h.indexOf(g) < 0 && !(typeof w == "string" && g === "[object Array]")) {
      if (!n.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const v = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(p, f, {
          ...n,
          ns: a
        }) : `key '${s} (${this.language})' returned an object instead of string.`;
        return o ? (d.res = v, d.usedParams = this.getUsedParamsDetails(n), d) : v;
      }
      if (i) {
        const v = g === "[object Array]", S = v ? [] : {}, C = v ? m : p;
        for (const P in f)
          if (Object.prototype.hasOwnProperty.call(f, P)) {
            const E = `${C}${i}${P}`;
            S[P] = this.translate(E, {
              ...n,
              joinArrays: !1,
              ns: a
            }), S[P] === E && (S[P] = f[P]);
          }
        f = S;
      }
    } else if (y && typeof w == "string" && g === "[object Array]")
      f = f.join(w), f && (f = this.extendTranslation(f, t, n, r));
    else {
      let v = !1, S = !1;
      const C = n.count !== void 0 && typeof n.count != "string", P = ao.hasDefaultValue(n), E = C ? this.pluralResolver.getSuffix(l, n.count, n) : "", O = n.ordinal && C ? this.pluralResolver.getSuffix(l, n.count, {
        ordinal: !1
      }) : "", T = n[`defaultValue${E}`] || n[`defaultValue${O}`] || n.defaultValue;
      !this.isValidLookup(f) && P && (v = !0, f = T), this.isValidLookup(f) || (S = !0, f = s);
      const M = (n.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && S ? void 0 : f, _ = P && T !== f && this.options.updateMissing;
      if (S || v || _) {
        if (this.logger.log(_ ? "updateKey" : "missingKey", l, c, s, _ ? T : f), i) {
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
          const X = P && G !== f ? G : M;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(B, c, N, X, _, n) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(B, c, N, X, _, n), this.emit("missingKey", B, c, N, f);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && C ? A.forEach((B) => {
          this.pluralResolver.getSuffixes(B, n).forEach((N) => {
            I([B], s + N, n[`defaultValue${N}`] || T);
          });
        }) : I(A, s, T));
      }
      f = this.extendTranslation(f, t, n, d, r), S && f === s && this.options.appendNamespaceToMissingKey && (f = `${c}:${s}`), (S || v) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? f = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${c}:${s}` : s, v ? f : void 0) : f = this.options.parseMissingKeyHandler(f));
    }
    return o ? (d.res = f, d.usedParams = this.getUsedParamsDetails(n), d) : f;
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
        const f = t.match(this.interpolator.nestingRegexp);
        u = f && f.length;
      }
      let d = r.replace && typeof r.replace != "string" ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (d = {
        ...this.options.interpolation.defaultVariables,
        ...d
      }), t = this.interpolator.interpolate(t, d, r.lng || this.language, r), l) {
        const f = t.match(this.interpolator.nestingRegexp), p = f && f.length;
        u < p && (r.nest = !1);
      }
      !r.lng && this.options.compatibilityAPI !== "v1" && o && o.res && (r.lng = o.usedLng), r.nest !== !1 && (t = this.interpolator.nest(t, function() {
        for (var f = arguments.length, p = new Array(f), m = 0; m < f; m++)
          p[m] = arguments[m];
        return i && i[0] === p[0] && !r.context ? (s.logger.warn(`It seems you are nesting recursively key: ${p[0]} in key: ${n[0]}`), null) : s.translate(...p, n);
      }, r)), r.interpolation && this.interpolator.reset();
    }
    const a = r.postProcess || this.options.postProcess, c = typeof a == "string" ? [a] : a;
    return t != null && c && c.length && r.applyPostProcessor !== !1 && (t = Xp.handle(c, t, n, this.options && this.options.postProcessPassResolved ? {
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
      let d = l.namespaces;
      this.options.fallbackNS && (d = d.concat(this.options.fallbackNS));
      const f = n.count !== void 0 && typeof n.count != "string", p = f && !n.ordinal && n.count === 0 && this.pluralResolver.shouldUseIntlApi(), m = n.context !== void 0 && (typeof n.context == "string" || typeof n.context == "number") && n.context !== "", g = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      d.forEach((h) => {
        this.isValidLookup(r) || (a = h, !eu[`${g[0]}-${h}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(a) && (eu[`${g[0]}-${h}`] = !0, this.logger.warn(`key "${o}" for languages "${g.join(", ")}" won't get resolved as namespace "${a}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), g.forEach((w) => {
          if (this.isValidLookup(r))
            return;
          s = w;
          const y = [u];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(y, u, w, h, n);
          else {
            let v;
            f && (v = this.pluralResolver.getSuffix(w, n.count, n));
            const S = `${this.options.pluralSeparator}zero`, C = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (f && (y.push(u + v), n.ordinal && v.indexOf(C) === 0 && y.push(u + v.replace(C, this.options.pluralSeparator)), p && y.push(u + S)), m) {
              const P = `${u}${this.options.contextSeparator}${n.context}`;
              y.push(P), f && (y.push(P + v), n.ordinal && v.indexOf(C) === 0 && y.push(P + v.replace(C, this.options.pluralSeparator)), p && y.push(P + S));
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
function Vi(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
class tu {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = pt.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = so(t), !t || t.indexOf("-") < 0)
      return null;
    const n = t.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = so(t), !t || t.indexOf("-") < 0)
      return t;
    const n = t.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(t) {
    if (typeof t == "string" && t.indexOf("-") > -1) {
      const n = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let r = t.split("-");
      return this.options.lowerCaseLng ? r = r.map((o) => o.toLowerCase()) : r.length === 2 ? (r[0] = r[0].toLowerCase(), r[1] = r[1].toUpperCase(), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = Vi(r[1].toLowerCase()))) : r.length === 3 && (r[0] = r[0].toLowerCase(), r[1].length === 2 && (r[1] = r[1].toUpperCase()), r[0] !== "sgn" && r[2].length === 2 && (r[2] = r[2].toUpperCase()), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = Vi(r[1].toLowerCase())), n.indexOf(r[2].toLowerCase()) > -1 && (r[2] = Vi(r[2].toLowerCase()))), r.join("-");
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
let mD = [{
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
}], gD = {
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
const hD = ["v1", "v2", "v3"], bD = ["v4"], nu = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function yD() {
  const e = {};
  return mD.forEach((t) => {
    t.lngs.forEach((n) => {
      e[n] = {
        numbers: t.nr,
        plurals: gD[t.fc]
      };
    });
  }), e;
}
class vD {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = t, this.options = n, this.logger = pt.create("pluralResolver"), (!this.options.compatibilityJSON || bD.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = yD();
  }
  addRule(t, n) {
    this.rules[t] = n;
  }
  getRule(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(so(t), {
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
    return r ? this.shouldUseIntlApi() ? r.resolvedOptions().pluralCategories.sort((o, i) => nu[o] - nu[i]).map((o) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${o}`) : r.numbers.map((o) => this.getSuffix(t, o, n)) : [];
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
    return !hD.includes(this.options.compatibilityJSON);
  }
}
function ru(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = lD(e, t, n);
  return !i && o && typeof n == "string" && (i = io(e, n, r), i === void 0 && (i = io(t, n, r))), i;
}
class wD {
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
    this.escape = n.escape !== void 0 ? n.escape : dD, this.escapeValue = n.escapeValue !== void 0 ? n.escapeValue : !0, this.useRawValueToEscape = n.useRawValueToEscape !== void 0 ? n.useRawValueToEscape : !1, this.prefix = n.prefix ? fn(n.prefix) : n.prefixEscaped || "{{", this.suffix = n.suffix ? fn(n.suffix) : n.suffixEscaped || "}}", this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ",", this.unescapePrefix = n.unescapeSuffix ? "" : n.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : n.unescapeSuffix || "", this.nestingPrefix = n.nestingPrefix ? fn(n.nestingPrefix) : n.nestingPrefixEscaped || fn("$t("), this.nestingSuffix = n.nestingSuffix ? fn(n.nestingSuffix) : n.nestingSuffixEscaped || fn(")"), this.nestingOptionsSeparator = n.nestingOptionsSeparator ? n.nestingOptionsSeparator : n.nestingOptionsSeparator || ",", this.maxReplaces = n.maxReplaces ? n.maxReplaces : 1e3, this.alwaysFormat = n.alwaysFormat !== void 0 ? n.alwaysFormat : !1, this.resetRegExp();
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
        const y = ru(n, c, m, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(y, void 0, r, {
          ...o,
          ...n,
          interpolationkey: m
        }) : y;
      }
      const g = m.split(this.formatSeparator), h = g.shift().trim(), w = g.join(this.formatSeparator).trim();
      return this.format(ru(n, c, h, this.options.keySeparator, this.options.ignoreJSONStructure), w, r, {
        ...o,
        ...n,
        interpolationkey: h
      });
    };
    this.resetRegExp();
    const d = o && o.missingInterpolationHandler || this.options.missingInterpolationHandler, f = o && o.interpolation && o.interpolation.skipOnVariables !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
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
          if (typeof d == "function") {
            const w = d(t, i, o);
            s = typeof w == "string" ? w : "";
          } else if (o && Object.prototype.hasOwnProperty.call(o, g))
            s = "";
          else if (f) {
            s = i[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${g} for interpolating ${t}`), s = "";
        else
          typeof s != "string" && !this.useRawValueToEscape && (s = Jl(s));
        const h = m.safeValue(s);
        if (t = t.replace(i[0], h), f ? (m.regex.lastIndex += s.length, m.regex.lastIndex -= i[0].length) : m.regex.lastIndex = 0, a++, a >= this.maxReplaces)
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
      const d = c.split(new RegExp(`${u}[ ]*{`));
      let f = `{${d[1]}`;
      c = d[0], f = this.interpolate(f, s);
      const p = f.match(/'/g), m = f.match(/"/g);
      (p && p.length % 2 === 0 && !m || m.length % 2 !== 0) && (f = f.replace(/'/g, '"'));
      try {
        s = JSON.parse(f), l && (s = {
          ...l,
          ...s
        });
      } catch (g) {
        return this.logger.warn(`failed parsing options string in nesting for key ${c}`, g), `${c}${u}${f}`;
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
        const u = o[1].split(this.formatSeparator).map((d) => d.trim());
        o[1] = u.shift(), c = u, l = !0;
      }
      if (i = n(a.call(this, o[1].trim(), s), s), i && o[0] === t && typeof i != "string")
        return i;
      typeof i != "string" && (i = Jl(i)), i || (this.logger.warn(`missed to resolve ${o[1]} for nesting ${t}`), i = ""), l && (i = c.reduce((u, d) => this.format(u, d, r.lng, {
        ...r,
        interpolationkey: o[1].trim()
      }), i.trim())), t = t.replace(o[0], i), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
function xD(e) {
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
function pn(e) {
  const t = {};
  return function(r, o, i) {
    const s = o + JSON.stringify(i);
    let a = t[s];
    return a || (a = e(so(o), i), t[s] = a), a(r);
  };
}
class SD {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = pt.create("formatter"), this.options = t, this.formats = {
      number: pn((n, r) => {
        const o = new Intl.NumberFormat(n, {
          ...r
        });
        return (i) => o.format(i);
      }),
      currency: pn((n, r) => {
        const o = new Intl.NumberFormat(n, {
          ...r,
          style: "currency"
        });
        return (i) => o.format(i);
      }),
      datetime: pn((n, r) => {
        const o = new Intl.DateTimeFormat(n, {
          ...r
        });
        return (i) => o.format(i);
      }),
      relativetime: pn((n, r) => {
        const o = new Intl.RelativeTimeFormat(n, {
          ...r
        });
        return (i) => o.format(i, r.range || "day");
      }),
      list: pn((n, r) => {
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
    this.formats[t.toLowerCase().trim()] = pn(n);
  }
  format(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return n.split(this.formatSeparator).reduce((a, c) => {
      const {
        formatName: l,
        formatOptions: u
      } = xD(c);
      if (this.formats[l]) {
        let d = a;
        try {
          const f = o && o.formatParams && o.formatParams[o.interpolationkey] || {}, p = f.locale || f.lng || o.locale || o.lng || r;
          d = this.formats[l](a, p, {
            ...u,
            ...o,
            ...f
          });
        } catch (f) {
          this.logger.warn(f);
        }
        return d;
      } else
        this.logger.warn(`there was no format function for ${l}`);
      return a;
    }, t);
  }
}
function CD(e, t) {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
}
class ED extends ai {
  constructor(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = t, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = o, this.logger = pt.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = o.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = o.maxRetries >= 0 ? o.maxRetries : 5, this.retryTimeout = o.retryTimeout >= 1 ? o.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(r, o.backend, o);
  }
  queueLoad(t, n, r, o) {
    const i = {}, s = {}, a = {}, c = {};
    return t.forEach((l) => {
      let u = !0;
      n.forEach((d) => {
        const f = `${l}|${d}`;
        !r.reload && this.store.hasResourceBundle(l, d) ? this.state[f] = 2 : this.state[f] < 0 || (this.state[f] === 1 ? s[f] === void 0 && (s[f] = !0) : (this.state[f] = 1, u = !1, s[f] === void 0 && (s[f] = !0), i[f] === void 0 && (i[f] = !0), c[d] === void 0 && (c[d] = !0)));
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
      cD(c.loaded, [i], s), CD(c, t), n && c.errors.push(n), c.pendingCount === 0 && !c.done && (Object.keys(c.loaded).forEach((l) => {
        a[l] || (a[l] = {});
        const u = c.loaded[l];
        u.length && u.forEach((d) => {
          a[l][d] === void 0 && (a[l][d] = !0);
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
        const d = this.waitingReads.shift();
        this.read(d.lng, d.ns, d.fcName, d.tried, d.wait, d.callback);
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
            l.length === 5 ? u = l(t, n, r, o, c) : u = l(t, n, r, o), u && typeof u.then == "function" ? u.then((d) => a(null, d)).catch(a) : a(null, u);
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
function ou() {
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
function iu(e) {
  return typeof e.ns == "string" && (e.ns = [e.ns]), typeof e.fallbackLng == "string" && (e.fallbackLng = [e.fallbackLng]), typeof e.fallbackNS == "string" && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e;
}
function Ir() {
}
function PD(e) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((n) => {
    typeof e[n] == "function" && (e[n] = e[n].bind(e));
  });
}
class tr extends ai {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = iu(t), this.services = {}, this.logger = pt, this.modules = {
      external: []
    }, PD(this), n && !this.isInitialized && !t.isClone) {
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
    const o = ou();
    this.options = {
      ...o,
      ...this.options,
      ...iu(n)
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
      this.modules.formatter ? u = this.modules.formatter : typeof Intl < "u" && (u = SD);
      const d = new tu(this.options);
      this.store = new Zl(this.options.resources, this.options);
      const f = this.services;
      f.logger = pt, f.resourceStore = this.store, f.languageUtils = d, f.pluralResolver = new vD(d, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), u && (!this.options.interpolation.format || this.options.interpolation.format === o.interpolation.format) && (f.formatter = i(u), f.formatter.init(f, this.options), this.options.interpolation.format = f.formatter.format.bind(f.formatter)), f.interpolator = new wD(this.options), f.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, f.backendConnector = new ED(i(this.modules.backend), f.resourceStore, f, this.options), f.backendConnector.on("*", function(p) {
        for (var m = arguments.length, g = new Array(m > 1 ? m - 1 : 0), h = 1; h < m; h++)
          g[h - 1] = arguments[h];
        t.emit(p, ...g);
      }), this.modules.languageDetector && (f.languageDetector = i(this.modules.languageDetector), f.languageDetector.init && f.languageDetector.init(f, this.options.detection, this.options)), this.modules.i18nFormat && (f.i18nFormat = i(this.modules.i18nFormat), f.i18nFormat.init && f.i18nFormat.init(this)), this.translator = new ao(this.services, this.options), this.translator.on("*", function(p) {
        for (var m = arguments.length, g = new Array(m > 1 ? m - 1 : 0), h = 1; h < m; h++)
          g[h - 1] = arguments[h];
        t.emit(p, ...g);
      }), this.modules.external.forEach((p) => {
        p.init && p.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, r || (r = Ir), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
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
      const u = (d, f) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), c.resolve(f), r(d, f);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return u(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, u);
    };
    return this.options.resources || !this.options.initImmediate ? l() : setTimeout(l, 0), c;
  }
  loadResources(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ir;
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
    return t || (t = this.languages), n || (n = this.options.ns), r || (r = Ir), this.services.backendConnector.reload(t, n, (i) => {
      o.resolve(), r(i);
    }), o;
  }
  use(t) {
    if (!t)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && Xp.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
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
        for (var l = arguments.length, u = new Array(l > 2 ? l - 2 : 0), d = 2; d < l; d++)
          u[d - 2] = arguments[d];
        c = o.options.overloadTranslationOptionHandler([s, a].concat(u));
      } else
        c = {
          ...a
        };
      c.lng = c.lng || i.lng, c.lngs = c.lngs || i.lngs, c.ns = c.ns || i.ns, c.keyPrefix = c.keyPrefix || r || i.keyPrefix;
      const f = o.options.keySeparator || ".";
      let p;
      return c.keyPrefix && Array.isArray(s) ? p = s.map((m) => `${c.keyPrefix}${f}${m}`) : p = c.keyPrefix ? `${c.keyPrefix}${f}${s}` : s, o.t(p, c);
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
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = this.services && this.services.languageUtils || new tu(ou());
    return n.indexOf(r.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    return new tr(t, n);
  }
  cloneInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ir;
    const r = t.forkResourceStore;
    r && delete t.forkResourceStore;
    const o = {
      ...this.options,
      ...t,
      isClone: !0
    }, i = new tr(o);
    return (t.debug !== void 0 || t.prefix !== void 0) && (i.logger = i.logger.clone(t)), ["store", "services", "language"].forEach((a) => {
      i[a] = this[a];
    }), i.services = {
      ...this.services
    }, i.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, r && (i.store = new Zl(this.store.data, o), i.services.resourceStore = i.store), i.translator = new ao(i.services, o), i.translator.on("*", function(a) {
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
const Ce = tr.createInstance();
Ce.createInstance = tr.createInstance;
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
Ce.use(_v).init({
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
function DD() {
  return /* @__PURE__ */ F.jsx(Iu, { theme: Ev, children: /* @__PURE__ */ F.jsx(iD, {}) });
}
const RD = $w({
  reducer: {
    settings: sx,
    ifcData: XP,
    bsdd: HP
  }
});
Wi.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ F.jsx(x.StrictMode, { children: /* @__PURE__ */ F.jsx(ff, { store: RD, children: /* @__PURE__ */ F.jsx(DD, {}) }) })
);
