import * as $ from "react";
import P, { createContext as dt, useContext as Me, useMemo as _l, useRef as H, useEffect as B, useState as z, useLayoutEffect as an, useCallback as Q, useId as bl, forwardRef as oe, cloneElement as Ze, Children as Ga, createElement as Bn } from "react";
import * as wl from "react-dom";
import Ol, { flushSync as Pl, createPortal as $l } from "react-dom";
function xl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Ua = { exports: {} }, vr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var El = P, Sl = Symbol.for("react.element"), Rl = Symbol.for("react.fragment"), Cl = Object.prototype.hasOwnProperty, jl = El.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Nl = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ya(e, t, r) {
  var n, o = {}, a = null, i = null;
  r !== void 0 && (a = "" + r), t.key !== void 0 && (a = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (n in t)
    Cl.call(t, n) && !Nl.hasOwnProperty(n) && (o[n] = t[n]);
  if (e && e.defaultProps)
    for (n in t = e.defaultProps, t)
      o[n] === void 0 && (o[n] = t[n]);
  return { $$typeof: Sl, type: e, key: a, ref: i, props: o, _owner: jl.current };
}
vr.Fragment = Rl;
vr.jsx = Ya;
vr.jsxs = Ya;
Ua.exports = vr;
var A = Ua.exports, Kr = {}, Wn = Ol;
Kr.createRoot = Wn.createRoot, Kr.hydrateRoot = Wn.hydrateRoot;
function fe(e) {
  return Object.keys(e);
}
var Tl = Object.defineProperty, Gn = Object.getOwnPropertySymbols, Il = Object.prototype.hasOwnProperty, Dl = Object.prototype.propertyIsEnumerable, Un = (e, t, r) => t in e ? Tl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Al = (e, t) => {
  for (var r in t || (t = {}))
    Il.call(t, r) && Un(e, r, t[r]);
  if (Gn)
    for (var r of Gn(t))
      Dl.call(t, r) && Un(e, r, t[r]);
  return e;
};
function jr(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function sn(e, t) {
  const r = Al({}, e), n = t;
  return jr(e) && jr(t) && Object.keys(t).forEach((o) => {
    jr(n[o]) && o in e ? r[o] = sn(r[o], n[o]) : r[o] = n[o];
  }), r;
}
function Ml(e) {
  return e.replace(/[A-Z]/g, (t) => `-${t.toLowerCase()}`);
}
function Ll(e) {
  var t;
  return typeof e != "string" || !e.includes("var(--mantine-scale)") ? e : (t = e.match(/^calc\((.*?)\)$/)) == null ? void 0 : t[1].split("*")[0].trim();
}
function Fl(e) {
  const t = Ll(e);
  return typeof t == "number" ? t : typeof t == "string" ? t.includes("calc") || t.includes("var") ? t : t.includes("px") ? Number(t.replace("px", "")) : t.includes("rem") ? Number(t.replace("rem", "")) * 16 : t.includes("em") ? Number(t.replace("em", "")) * 16 : Number(t) : NaN;
}
function Nr(e) {
  return `calc(${e} * var(--mantine-scale))`;
}
function Ka(e, { shouldScale: t = !1 } = {}) {
  function r(n) {
    if (n === 0 || n === "0")
      return "0";
    if (typeof n == "number") {
      const o = `${n / 16}${e}`;
      return t ? Nr(o) : o;
    }
    if (typeof n == "string") {
      if (n.startsWith("calc(") || n.startsWith("var("))
        return n;
      if (n.includes(" "))
        return n.split(" ").map((a) => r(a)).join(" ");
      if (n.includes(e))
        return t ? Nr(n) : n;
      const o = n.replace("px", "");
      if (!Number.isNaN(Number(o))) {
        const a = `${Number(o) / 16}${e}`;
        return t ? Nr(a) : a;
      }
    }
    return n;
  }
  return r;
}
const b = Ka("rem", { shouldScale: !0 }), Yn = Ka("em");
function ln(e) {
  return Object.keys(e).reduce((t, r) => (e[r] !== void 0 && (t[r] = e[r]), t), {});
}
function Xa(e) {
  return typeof e == "number" ? !0 : typeof e == "string" ? e.startsWith("calc(") || e.startsWith("var(") || e.includes(" ") && e.trim() !== "" ? !0 : /[0-9]/.test(e.trim().replace("-", "")[0]) : !1;
}
function pt(e) {
  return Array.isArray(e) || e === null ? !1 : typeof e == "object" ? e.type !== P.Fragment : !1;
}
function cn(e) {
  const t = dt(null);
  return [({ children: o, value: a }) => /* @__PURE__ */ P.createElement(t.Provider, { value: a }, o), () => {
    const o = Me(t);
    if (o === null)
      throw new Error(e);
    return o;
  }];
}
const kl = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function fn(e) {
  return kl[e];
}
const Vl = () => {
};
function zl(e, t = { active: !0 }) {
  return typeof e != "function" || !t.active ? t.onKeyDown || Vl : (r) => {
    var n;
    r.key === "Escape" && (e(r), (n = t.onTrigger) == null || n.call(t));
  };
}
function ue(e, t = "size", r = !0) {
  if (e !== void 0)
    return Xa(e) ? r ? b(e) : e : `var(--${t}-${e})`;
}
function gr(e) {
  return ue(e, "mantine-spacing");
}
function Le(e) {
  return e === void 0 ? "var(--mantine-radius-default)" : ue(e, "mantine-radius");
}
function Xr(e) {
  return ue(e, "mantine-font-size");
}
function Hl(e) {
  return ue(e, "mantine-line-height", !1);
}
function qa(e) {
  if (e)
    return ue(e, "mantine-shadow", !1);
}
function It(e, t) {
  return (r) => {
    e == null || e(r), t == null || t(r);
  };
}
function Ja(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (t = 0; t < e.length; t++)
        e[t] && (r = Ja(e[t])) && (n && (n += " "), n += r);
    else
      for (t in e)
        e[t] && (n && (n += " "), n += t);
  return n;
}
function ye() {
  for (var e, t, r = 0, n = ""; r < arguments.length; )
    (e = arguments[r++]) && (t = Ja(e)) && (n && (n += " "), n += t);
  return n;
}
const Bl = {};
function Wl(e) {
  const t = {};
  return e.forEach((r) => {
    Object.entries(r).forEach(([n, o]) => {
      t[n] ? t[n] = ye(t[n], o) : t[n] = o;
    });
  }), t;
}
function un({ theme: e, classNames: t, props: r, stylesCtx: n }) {
  const a = (Array.isArray(t) ? t : [t]).map(
    (i) => typeof i == "function" ? i(e, r, n) : i || Bl
  );
  return Wl(a);
}
var Gl = Object.defineProperty, Kn = Object.getOwnPropertySymbols, Ul = Object.prototype.hasOwnProperty, Yl = Object.prototype.propertyIsEnumerable, Xn = (e, t, r) => t in e ? Gl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, yt = (e, t) => {
  for (var r in t || (t = {}))
    Ul.call(t, r) && Xn(e, r, t[r]);
  if (Kn)
    for (var r of Kn(t))
      Yl.call(t, r) && Xn(e, r, t[r]);
  return e;
};
function qr({ theme: e, styles: t, props: r, stylesCtx: n }) {
  return (Array.isArray(t) ? t : [t]).reduce((a, i) => typeof i == "function" ? yt(yt({}, a), i(e, r, n)) : yt(yt({}, a), i), {});
}
const Kl = {
  dark: [
    "#C1C2C5",
    "#A6A7AB",
    "#909296",
    "#5c5f66",
    "#373A40",
    "#2C2E33",
    "#25262b",
    "#1A1B1E",
    "#141517",
    "#101113"
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
};
function Jr(e, t) {
  return typeof e.primaryShade == "number" ? e.primaryShade : t === "dark" ? e.primaryShade.dark : e.primaryShade.light;
}
function dn({
  color: e,
  theme: t,
  colorScheme: r
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
  const [n, o] = e.split("."), a = o ? Number(o) : void 0, i = n in t.colors;
  return i ? {
    color: n,
    value: a !== void 0 ? t.colors[n][a] : t.colors[n][Jr(t, r || "light")],
    shade: a,
    isThemeColor: i,
    variable: o ? `--mantine-color-${n}-${a}` : `--mantine-color-${n}-filled`
  } : {
    color: e,
    value: e,
    isThemeColor: i,
    shade: a,
    variable: void 0
  };
}
function De(e, t) {
  const r = dn({ color: e || t.primaryColor, theme: t });
  return r.variable ? `var(${r.variable})` : e;
}
function Qr(e, t) {
  const r = {
    from: (e == null ? void 0 : e.from) || t.defaultGradient.from,
    to: (e == null ? void 0 : e.to) || t.defaultGradient.to,
    deg: (e == null ? void 0 : e.deg) || t.defaultGradient.deg || 0
  }, n = De(r.from, t), o = De(r.to, t);
  return `linear-gradient(${r.deg}deg, ${n} 0%, ${o} 100%)`;
}
function Xl(e) {
  return /^#?([0-9A-F]{3}){1,2}$/i.test(e);
}
function ql(e) {
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
  const r = parseInt(t, 16), n = r >> 16 & 255, o = r >> 8 & 255, a = r & 255;
  return {
    r: n,
    g: o,
    b: a,
    a: 1
  };
}
function Jl(e) {
  const [t, r, n, o] = e.replace(/[^0-9,.]/g, "").split(",").map(Number);
  return { r: t, g: r, b: n, a: o || 1 };
}
function Ql(e) {
  const t = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i, r = e.match(t);
  if (!r)
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  const n = parseInt(r[1], 10), o = parseInt(r[2], 10) / 100, a = parseInt(r[3], 10) / 100, i = r[5] ? parseFloat(r[5]) : void 0, s = (1 - Math.abs(2 * a - 1)) * o, l = n / 60, c = s * (1 - Math.abs(l % 2 - 1)), f = a - s / 2;
  let u, p, d;
  return l >= 0 && l < 1 ? (u = s, p = c, d = 0) : l >= 1 && l < 2 ? (u = c, p = s, d = 0) : l >= 2 && l < 3 ? (u = 0, p = s, d = c) : l >= 3 && l < 4 ? (u = 0, p = c, d = s) : l >= 4 && l < 5 ? (u = c, p = 0, d = s) : (u = s, p = 0, d = c), {
    r: Math.round((u + f) * 255),
    g: Math.round((p + f) * 255),
    b: Math.round((d + f) * 255),
    a: i || 1
  };
}
function Qa(e) {
  return Xl(e) ? ql(e) : e.startsWith("rgb") ? Jl(e) : e.startsWith("hsl") ? Ql(e) : {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function ht(e, t) {
  if (e.startsWith("var("))
    return e;
  const { r, g: n, b: o, a } = Qa(e), i = 1 - t, s = (l) => Math.round(l * i);
  return `rgba(${s(r)}, ${s(n)}, ${s(o)}, ${a})`;
}
function X(e, t) {
  if (typeof e != "string" || t > 1 || t < 0)
    return "rgba(0, 0, 0, 1)";
  const { r, g: n, b: o } = Qa(e);
  return `rgba(${r}, ${n}, ${o}, ${t})`;
}
const Zl = ({
  color: e,
  theme: t,
  variant: r,
  gradient: n
}) => {
  const o = dn({ color: e, theme: t });
  if (r === "filled")
    return o.isThemeColor ? o.shade === void 0 ? {
      background: `var(--mantine-color-${e}-filled)`,
      hover: `var(--mantine-color-${e}-filled-hover)`,
      color: "var(--mantine-color-white)",
      border: `${b(1)} solid transparent`
    } : {
      background: `var(--mantine-color-${o.color}-${o.shade})`,
      hover: `var(--mantine-color-${o.color}-${o.shade === 9 ? 8 : o.shade + 1})`,
      color: "var(--mantine-color-white)",
      border: `${b(1)} solid transparent`
    } : {
      background: e,
      hover: ht(e, 0.1),
      color: "var(--mantine-color-white)",
      border: `${b(1)} solid transparent`
    };
  if (r === "light") {
    if (o.isThemeColor) {
      if (o.shade === void 0)
        return {
          background: `var(--mantine-color-${e}-light)`,
          hover: `var(--mantine-color-${e}-light-hover)`,
          color: `var(--mantine-color-${e}-light-color)`,
          border: `${b(1)} solid transparent`
        };
      const a = t.colors[o.color][o.shade];
      return {
        background: X(a, 0.1),
        hover: X(a, 0.12),
        color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
        border: `${b(1)} solid transparent`
      };
    }
    return {
      background: X(e, 0.1),
      hover: X(e, 0.12),
      color: e,
      border: `${b(1)} solid transparent`
    };
  }
  if (r === "outline")
    return o.isThemeColor ? o.shade === void 0 ? {
      background: "transparent",
      hover: `var(--mantine-color-${e}-outline-hover)`,
      color: `var(--mantine-color-${e}-outline)`,
      border: `${b(1)} solid var(--mantine-color-${e}-outline)`
    } : {
      background: "transparent",
      hover: X(t.colors[o.color][o.shade], 0.05),
      color: `var(--mantine-color-${o.color}-${o.shade})`,
      border: `${b(1)} solid var(--mantine-color-${o.color}-${o.shade})`
    } : {
      background: "transparent",
      hover: X(e, 0.05),
      color: e,
      border: `${b(1)} solid ${e}`
    };
  if (r === "subtle") {
    if (o.isThemeColor) {
      if (o.shade === void 0)
        return {
          background: "transparent",
          hover: `var(--mantine-color-${e}-light-hover)`,
          color: `var(--mantine-color-${e}-light-color)`,
          border: `${b(1)} solid transparent`
        };
      const a = t.colors[o.color][o.shade];
      return {
        background: "transparent",
        hover: X(a, 0.12),
        color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
        border: `${b(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: X(e, 0.12),
      color: e,
      border: `${b(1)} solid transparent`
    };
  }
  return r === "transparent" ? o.isThemeColor ? o.shade === void 0 ? {
    background: "transparent",
    hover: "transparent",
    color: `var(--mantine-color-${e}-light-color)`,
    border: `${b(1)} solid transparent`
  } : {
    background: "transparent",
    hover: "transparent",
    color: `var(--mantine-color-${o.color}-${Math.min(o.shade, 6)})`,
    border: `${b(1)} solid transparent`
  } : {
    background: "transparent",
    hover: "transparent",
    color: e,
    border: `${b(1)} solid transparent`
  } : r === "white" ? o.isThemeColor ? o.shade === void 0 ? {
    background: "var(--mantine-color-white)",
    hover: ht(t.white, 0.01),
    color: `var(--mantine-color-${e}-filled)`,
    border: `${b(1)} solid transparent`
  } : {
    background: "var(--mantine-color-white)",
    hover: ht(t.white, 0.01),
    color: `var(--mantine-color-${o.color}-${o.shade})`,
    border: `${b(1)} solid transparent`
  } : {
    background: "var(--mantine-color-white)",
    hover: ht(t.white, 0.01),
    color: e,
    border: `${b(1)} solid transparent`
  } : r === "gradient" ? {
    background: Qr(n, t),
    hover: Qr(n, t),
    color: "var(--mantine-color-white)",
    border: "none"
  } : r === "default" ? {
    background: "var(--mantine-color-default)",
    hover: "var(--mantine-color-default-hover)",
    color: "var(--mantine-color-default-color)",
    border: `${b(1)} solid var(--mantine-color-default-border)`
  } : {};
}, qn = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji", pn = {
  scale: 1,
  fontSmoothing: !0,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: Kl,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: Zl,
  fontFamily: qn,
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  respectReducedMotion: !1,
  cursorType: "default",
  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
  defaultRadius: "sm",
  activeClassName: "mantine-active",
  focusClassName: "",
  headings: {
    fontFamily: qn,
    fontWeight: "700",
    sizes: {
      h1: { fontSize: b(34), lineHeight: "1.3" },
      h2: { fontSize: b(26), lineHeight: "1.35" },
      h3: { fontSize: b(22), lineHeight: "1.4" },
      h4: { fontSize: b(18), lineHeight: "1.45" },
      h5: { fontSize: b(16), lineHeight: "1.5" },
      h6: { fontSize: b(14), lineHeight: "1.5" }
    }
  },
  fontSizes: {
    xs: b(12),
    sm: b(14),
    md: b(16),
    lg: b(18),
    xl: b(20)
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65"
  },
  radius: {
    xs: b(2),
    sm: b(4),
    md: b(8),
    lg: b(16),
    xl: b(32)
  },
  spacing: {
    xs: b(10),
    sm: b(12),
    md: b(16),
    lg: b(20),
    xl: b(32)
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  shadows: {
    xs: `0 ${b(1)} ${b(3)} rgba(0, 0, 0, 0.05), 0 ${b(1)} ${b(2)} rgba(0, 0, 0, 0.1)`,
    sm: `0 ${b(1)} ${b(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${b(10)} ${b(
      15
    )} ${b(-5)}, rgba(0, 0, 0, 0.04) 0 ${b(7)} ${b(7)} ${b(-5)}`,
    md: `0 ${b(1)} ${b(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${b(20)} ${b(
      25
    )} ${b(-5)}, rgba(0, 0, 0, 0.04) 0 ${b(10)} ${b(10)} ${b(-5)}`,
    lg: `0 ${b(1)} ${b(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${b(28)} ${b(
      23
    )} ${b(-7)}, rgba(0, 0, 0, 0.04) 0 ${b(12)} ${b(12)} ${b(-7)}`,
    xl: `0 ${b(1)} ${b(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${b(36)} ${b(
      28
    )} ${b(-7)}, rgba(0, 0, 0, 0.04) 0 ${b(17)} ${b(17)} ${b(-7)}`
  },
  other: {},
  components: {}
}, ec = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color", Jn = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function Tr(e) {
  return e < 0 || e > 9 ? !1 : parseInt(e.toString(), 10) === e;
}
function Qn(e) {
  if (!(e.primaryColor in e.colors))
    throw new Error(ec);
  if (typeof e.primaryShade == "object" && (!Tr(e.primaryShade.dark) || !Tr(e.primaryShade.light)))
    throw new Error(Jn);
  if (typeof e.primaryShade == "number" && !Tr(e.primaryShade))
    throw new Error(Jn);
}
function tc(e, t) {
  var r;
  if (!t)
    return Qn(e), e;
  const n = sn(e, t);
  return t.fontFamily && !((r = t.headings) != null && r.fontFamily) && (n.headings.fontFamily = t.fontFamily), Qn(n), n;
}
const mn = dt(null), rc = () => Me(mn) || pn;
function Se() {
  const e = Me(mn);
  if (!e)
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  return e;
}
function Za({
  theme: e,
  children: t,
  inherit: r = !0
}) {
  const n = rc(), o = _l(
    () => tc(r ? n : pn, e),
    [e, n, r]
  );
  return /* @__PURE__ */ P.createElement(mn.Provider, { value: o }, t);
}
Za.displayName = "@mantine/core/MantineThemeProvider";
const nc = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function oc({ theme: e, options: t, unstyled: r }) {
  return ye(
    (t == null ? void 0 : t.focusable) && !r && (e.focusClassName || nc[e.focusRing]),
    (t == null ? void 0 : t.active) && !r && e.activeClassName
  );
}
function ac({
  themeName: e,
  classNamesPrefix: t,
  selector: r
}) {
  return e.map((n) => `${t}-${n}-${r}`);
}
function ic({
  themeName: e,
  theme: t,
  selector: r,
  props: n,
  stylesCtx: o
}) {
  return e.map(
    (a) => {
      var i, s;
      return (s = un({
        theme: t,
        classNames: (i = t.components[a]) == null ? void 0 : i.classNames,
        props: n,
        stylesCtx: o
      })) == null ? void 0 : s[r];
    }
  );
}
function sc({
  options: e,
  classes: t,
  selector: r,
  unstyled: n
}) {
  return e != null && e.variant && !n ? t[`${r}--${e.variant}`] : void 0;
}
function lc({ rootSelector: e, selector: t, className: r }) {
  return e === t ? r : void 0;
}
function cc({ selector: e, classes: t, unstyled: r }) {
  return r ? void 0 : t[e];
}
function fc({
  selector: e,
  stylesCtx: t,
  theme: r,
  classNames: n,
  props: o
}) {
  return un({ theme: r, classNames: n, props: o, stylesCtx: t })[e];
}
function uc({
  selector: e,
  stylesCtx: t,
  options: r,
  props: n,
  theme: o
}) {
  return un({
    theme: o,
    classNames: r == null ? void 0 : r.classNames,
    props: (r == null ? void 0 : r.props) || n,
    stylesCtx: t
  })[e];
}
function dc({
  theme: e,
  options: t,
  themeName: r,
  selector: n,
  classNamesPrefix: o,
  classNames: a,
  classes: i,
  unstyled: s,
  className: l,
  rootSelector: c,
  props: f,
  stylesCtx: u
}) {
  return ye(
    oc({ theme: e, options: t, unstyled: s }),
    ic({ theme: e, themeName: r, selector: n, props: f, stylesCtx: u }),
    sc({ options: t, classes: i, selector: n, unstyled: s }),
    fc({ selector: n, stylesCtx: u, theme: e, classNames: a, props: f }),
    uc({ selector: n, stylesCtx: u, options: t, props: f, theme: e }),
    lc({ rootSelector: c, selector: n, className: l }),
    cc({ selector: n, classes: i, unstyled: s }),
    ac({ themeName: r, classNamesPrefix: o, selector: n }),
    t == null ? void 0 : t.className
  );
}
var pc = Object.defineProperty, Zn = Object.getOwnPropertySymbols, mc = Object.prototype.hasOwnProperty, vc = Object.prototype.propertyIsEnumerable, eo = (e, t, r) => t in e ? pc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, to = (e, t) => {
  for (var r in t || (t = {}))
    mc.call(t, r) && eo(e, r, t[r]);
  if (Zn)
    for (var r of Zn(t))
      vc.call(t, r) && eo(e, r, t[r]);
  return e;
};
function gc({
  theme: e,
  themeName: t,
  props: r,
  stylesCtx: n,
  selector: o
}) {
  return t.map(
    (a) => {
      var i;
      return qr({
        theme: e,
        styles: (i = e.components[a]) == null ? void 0 : i.styles,
        props: r,
        stylesCtx: n
      })[o];
    }
  ).reduce((a, i) => to(to({}, a), i), {});
}
var yc = Object.defineProperty, ro = Object.getOwnPropertySymbols, hc = Object.prototype.hasOwnProperty, _c = Object.prototype.propertyIsEnumerable, no = (e, t, r) => t in e ? yc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oo = (e, t) => {
  for (var r in t || (t = {}))
    hc.call(t, r) && no(e, r, t[r]);
  if (ro)
    for (var r of ro(t))
      _c.call(t, r) && no(e, r, t[r]);
  return e;
};
function Zr({ style: e, theme: t }) {
  return Array.isArray(e) ? [...e].reduce(
    (r, n) => oo(oo({}, r), Zr({ style: n, theme: t })),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
var bc = Object.defineProperty, ao = Object.getOwnPropertySymbols, wc = Object.prototype.hasOwnProperty, Oc = Object.prototype.propertyIsEnumerable, io = (e, t, r) => t in e ? bc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, so = (e, t) => {
  for (var r in t || (t = {}))
    wc.call(t, r) && io(e, r, t[r]);
  if (ao)
    for (var r of ao(t))
      Oc.call(t, r) && io(e, r, t[r]);
  return e;
};
function Pc(e) {
  return e.reduce((t, r) => (r && Object.keys(r).forEach((n) => {
    t[n] = so(so({}, t[n]), ln(r[n]));
  }), t), {});
}
function $c({
  vars: e,
  varsResolver: t,
  theme: r,
  props: n,
  stylesCtx: o,
  selector: a,
  themeName: i
}) {
  var s;
  return (s = Pc([
    t == null ? void 0 : t(r, n, o),
    ...i.map((l) => {
      var c, f, u;
      return (u = (f = (c = r.components) == null ? void 0 : c[l]) == null ? void 0 : f.vars) == null ? void 0 : u.call(f, r, n, o);
    }),
    e == null ? void 0 : e(r, n, o)
  ])) == null ? void 0 : s[a];
}
var xc = Object.defineProperty, lo = Object.getOwnPropertySymbols, Ec = Object.prototype.hasOwnProperty, Sc = Object.prototype.propertyIsEnumerable, co = (e, t, r) => t in e ? xc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, We = (e, t) => {
  for (var r in t || (t = {}))
    Ec.call(t, r) && co(e, r, t[r]);
  if (lo)
    for (var r of lo(t))
      Sc.call(t, r) && co(e, r, t[r]);
  return e;
};
function Rc({
  theme: e,
  themeName: t,
  selector: r,
  options: n,
  props: o,
  stylesCtx: a,
  rootSelector: i,
  styles: s,
  style: l,
  vars: c,
  varsResolver: f
}) {
  return We(We(We(We(We(We({}, gc({ theme: e, themeName: t, props: o, stylesCtx: a, selector: r })), qr({ theme: e, styles: s, props: o, stylesCtx: a })[r]), qr({ theme: e, styles: n == null ? void 0 : n.styles, props: (n == null ? void 0 : n.props) || o, stylesCtx: a })[r]), $c({ theme: e, props: o, stylesCtx: a, vars: c, varsResolver: f, selector: r, themeName: t })), i === r ? Zr({ style: l, theme: e }) : null), Zr({ style: n == null ? void 0 : n.style, theme: e }));
}
const vn = dt(null);
function gn() {
  const e = Me(vn);
  if (!e)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  return e;
}
function Cc() {
  return gn().cssVariablesResolver;
}
function jc() {
  return gn().classNamesPrefix;
}
function yn() {
  return gn().getStyleNonce;
}
function U({
  name: e,
  classes: t,
  props: r,
  stylesCtx: n,
  className: o,
  style: a,
  rootSelector: i = "root",
  unstyled: s,
  classNames: l,
  styles: c,
  vars: f,
  varsResolver: u
}) {
  const p = Se(), d = jc(), m = (Array.isArray(e) ? e : [e]).filter((v) => v);
  return (v, y) => ({
    className: dc({
      theme: p,
      options: y,
      themeName: m,
      selector: v,
      classNamesPrefix: d,
      classNames: l,
      classes: t,
      unstyled: s,
      className: o,
      rootSelector: i,
      props: r,
      stylesCtx: n
    }),
    style: Rc({
      theme: p,
      themeName: m,
      selector: v,
      options: y,
      props: r,
      stylesCtx: n,
      rootSelector: i,
      styles: c,
      style: a,
      vars: f,
      varsResolver: u
    })
  });
}
function Nc() {
  const e = console.error;
  console.error = (...t) => {
    t.length > 1 && typeof t[0] == "string" && t[0].toLowerCase().includes("extra attributes from the server") && typeof t[1] == "string" && t[1].toLowerCase().includes("data-mantine-color-scheme") || e(...t);
  };
}
function fo(e) {
  return e === "auto" || e === "dark" || e === "light";
}
function Tc({
  key: e = "mantine-color-scheme-value"
} = {}) {
  let t;
  return {
    get: (r) => {
      if (typeof window > "u")
        return r;
      try {
        const n = window.localStorage.getItem(e);
        return fo(n) ? n : r;
      } catch {
        return r;
      }
    },
    set: (r) => {
      try {
        window.localStorage.setItem(e, r);
      } catch (n) {
        console.warn(
          "[@mantine/core] Local storage color scheme manager was unable to save color scheme.",
          n
        );
      }
    },
    subscribe: (r) => {
      t = (n) => {
        n.storageArea === window.localStorage && n.key === e && fo(n.newValue) && r(n.newValue);
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
const uo = ["mousedown", "touchstart"];
function Ic(e, t, r) {
  const n = H();
  return B(() => {
    const o = (a) => {
      const { target: i } = a ?? {};
      if (Array.isArray(r)) {
        const s = (i == null ? void 0 : i.hasAttribute("data-ignore-outside-clicks")) || !document.body.contains(i) && i.tagName !== "HTML";
        r.every((c) => !!c && !a.composedPath().includes(c)) && !s && e();
      } else
        n.current && !n.current.contains(i) && e();
    };
    return (t || uo).forEach((a) => document.addEventListener(a, o)), () => {
      (t || uo).forEach((a) => document.removeEventListener(a, o));
    };
  }, [n, e, r]), n;
}
function Dc(e, t) {
  try {
    return e.addEventListener("change", t), () => e.removeEventListener("change", t);
  } catch {
    return e.addListener(t), () => e.removeListener(t);
  }
}
function Ac(e, t) {
  return typeof t == "boolean" ? t : typeof window < "u" && "matchMedia" in window ? window.matchMedia(e).matches : !1;
}
function ei(e, t, { getInitialValueInEffect: r } = {
  getInitialValueInEffect: !0
}) {
  const [n, o] = z(
    r ? t : Ac(e, t)
  ), a = H();
  return B(() => {
    if ("matchMedia" in window)
      return a.current = window.matchMedia(e), o(a.current.matches), Dc(a.current, (i) => o(i.matches));
  }, [e]), n;
}
function Mc(e, t) {
  return ei("(prefers-color-scheme: dark)", e === "dark", t) ? "dark" : "light";
}
const yr = typeof document < "u" ? an : B;
function $e(e, t) {
  const r = H(!1);
  B(
    () => () => {
      r.current = !1;
    },
    []
  ), B(() => {
    if (r.current)
      return e();
    r.current = !0;
  }, t);
}
function Lc({ opened: e, shouldReturnFocus: t = !0 }) {
  const r = H(), n = () => {
    var o;
    r.current && "focus" in r.current && typeof r.current.focus == "function" && ((o = r.current) == null || o.focus({ preventScroll: !0 }));
  };
  return $e(() => {
    let o = -1;
    const a = (i) => {
      i.key === "Tab" && window.clearTimeout(o);
    };
    return document.addEventListener("keydown", a), e ? r.current = document.activeElement : t && (o = window.setTimeout(n, 10)), () => {
      window.clearTimeout(o), document.removeEventListener("keydown", a);
    };
  }, [e, t]), n;
}
const Fc = /input|select|textarea|button|object/, ti = "a, input, select, textarea, button, object, [tabindex]";
function kc(e) {
  return e.style.display === "none";
}
function Vc(e) {
  if (e.getAttribute("aria-hidden") || e.getAttribute("hidden") || e.getAttribute("type") === "hidden")
    return !1;
  let r = e;
  for (; r && !(r === document.body || r.nodeType === 11); ) {
    if (kc(r))
      return !1;
    r = r.parentNode;
  }
  return !0;
}
function ri(e) {
  let t = e.getAttribute("tabindex");
  return t === null && (t = void 0), parseInt(t, 10);
}
function en(e) {
  const t = e.nodeName.toLowerCase(), r = !Number.isNaN(ri(e));
  return /* @ts-ignore */ (Fc.test(t) && !e.disabled || e instanceof HTMLAnchorElement && e.href || r) && Vc(e);
}
function ni(e) {
  const t = ri(e);
  return (Number.isNaN(t) || t >= 0) && en(e);
}
function zc(e) {
  return Array.from(e.querySelectorAll(ti)).filter(ni);
}
function Hc(e, t) {
  const r = zc(e);
  if (!r.length) {
    t.preventDefault();
    return;
  }
  const n = r[t.shiftKey ? 0 : r.length - 1], o = e.getRootNode();
  let a = n === o.activeElement || e === o.activeElement;
  const i = o.activeElement;
  if (i.tagName === "INPUT" && i.getAttribute("type") === "radio" && (a = r.filter(
    (f) => f.getAttribute("type") === "radio" && f.getAttribute("name") === i.getAttribute("name")
  ).includes(n)), !a)
    return;
  t.preventDefault();
  const l = r[t.shiftKey ? r.length - 1 : 0];
  l && l.focus();
}
function oi() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}
function Bc(e, t = "body > :not(script)") {
  const r = oi(), n = Array.from(
    document.querySelectorAll(t)
  ).map((o) => {
    var a;
    if ((a = o == null ? void 0 : o.shadowRoot) != null && a.contains(e) || o.contains(e))
      return;
    const i = o.getAttribute("aria-hidden"), s = o.getAttribute("data-hidden"), l = o.getAttribute("data-focus-id");
    return o.setAttribute("data-focus-id", r), i === null || i === "false" ? o.setAttribute("aria-hidden", "true") : !s && !l && o.setAttribute("data-hidden", i), {
      node: o,
      ariaHidden: s || null
    };
  });
  return () => {
    n.forEach((o) => {
      !o || r !== o.node.getAttribute("data-focus-id") || (o.ariaHidden === null ? o.node.removeAttribute("aria-hidden") : o.node.setAttribute("aria-hidden", o.ariaHidden), o.node.removeAttribute("data-focus-id"), o.node.removeAttribute("data-hidden"));
    });
  };
}
function Wc(e = !0) {
  const t = H(), r = H(null), n = (a) => {
    let i = a.querySelector("[data-autofocus]");
    if (!i) {
      const s = Array.from(a.querySelectorAll(ti));
      i = s.find(ni) || s.find(en) || null, !i && en(a) && (i = a);
    }
    i && i.focus({ preventScroll: !0 });
  }, o = Q(
    (a) => {
      if (e) {
        if (a === null) {
          r.current && (r.current(), r.current = null);
          return;
        }
        r.current = Bc(a), t.current !== a && (a ? (setTimeout(() => {
          a.getRootNode() && n(a);
        }), t.current = a) : t.current = null);
      }
    },
    [e]
  );
  return B(() => {
    if (!e)
      return;
    t.current && setTimeout(() => n(t.current));
    const a = (i) => {
      i.key === "Tab" && t.current && Hc(t.current, i);
    };
    return document.addEventListener("keydown", a), () => {
      document.removeEventListener("keydown", a), r.current && r.current();
    };
  }, [e]), o;
}
const Gc = P["useId".toString()] || (() => {
});
function Uc() {
  const e = Gc();
  return e ? `mantine-${e.replace(/:/g, "")}` : "";
}
function ai(e) {
  const t = Uc(), [r, n] = z(t);
  return yr(() => {
    n(oi());
  }, []), typeof e == "string" ? e : typeof window > "u" ? t : r;
}
function ii(e, t) {
  typeof e == "function" ? e(t) : typeof e == "object" && e !== null && "current" in e && (e.current = t);
}
function si(...e) {
  return (t) => {
    e.forEach((r) => ii(r, t));
  };
}
function mt(...e) {
  return Q(si(...e), e);
}
function Yc({
  value: e,
  defaultValue: t,
  finalValue: r,
  onChange: n = () => {
  }
}) {
  const [o, a] = z(
    t !== void 0 ? t : r
  ), i = (s) => {
    a(s), n == null || n(s);
  };
  return e !== void 0 ? [e, n, !0] : [o, i, !1];
}
function li(e, t) {
  return ei("(prefers-reduced-motion: reduce)", e, t);
}
function Kc(e = !1, t) {
  const { onOpen: r, onClose: n } = t || {}, [o, a] = z(e), i = Q(() => {
    a((c) => c || (r == null || r(), !0));
  }, [r]), s = Q(() => {
    a((c) => c && (n == null || n(), !1));
  }, [n]), l = Q(() => {
    o ? s() : i();
  }, [s, i, o]);
  return [o, { open: i, close: s, toggle: l }];
}
function at(e, t) {
  var r;
  const n = e !== "auto" ? e : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  (r = t()) == null || r.setAttribute("data-mantine-color-scheme", n);
}
function Xc({
  manager: e,
  defaultColorScheme: t,
  getRootElement: r,
  forceColorScheme: n
}) {
  const o = H(), [a, i] = z(() => e.get(t)), s = n || a, l = Q(
    (f) => {
      n || (at(f, r), i(f), e.set(f));
    },
    [e.set, s, n]
  ), c = Q(() => {
    i(t), at(t, r), e.clear();
  }, [e.clear, t]);
  return B(() => (e.subscribe(l), e.unsubscribe), [e.subscribe, e.unsubscribe]), yr(() => {
    at(e.get(t), r);
  }, []), B(() => {
    var f;
    if (n)
      return at(n, r), () => {
      };
    o.current = window.matchMedia("(prefers-color-scheme: dark)");
    const u = (p) => {
      a === "auto" && at(p.matches ? "dark" : "light", r);
    };
    return (f = o.current) == null || f.addEventListener("change", u), () => {
      var p;
      return (p = o.current) == null ? void 0 : p.removeEventListener("change", u);
    };
  }, [a, n]), { colorScheme: s, setColorScheme: l, clearColorScheme: c };
}
function qc({
  respectReducedMotion: e,
  getRootElement: t
}) {
  yr(() => {
    var r;
    e && ((r = t()) == null || r.setAttribute("data-respect-reduced-motion", "true"));
  }, [e]);
}
function Ir(e) {
  return Object.entries(e).map(([t, r]) => `${t}: ${r};`).join("");
}
function Dr(e, t) {
  return (Array.isArray(e) ? e : [e]).reduce((n, o) => `${o}{${n}}`, t);
}
function Jc(e, t) {
  const r = Ir(e.variables), n = r ? Dr(t, r) : "", o = Ir(e.dark), a = o ? Dr(`${t}[data-mantine-color-scheme="dark"]`, o) : "", i = Ir(e.light), s = i ? Dr(`${t}[data-mantine-color-scheme="light"]`, i) : "";
  return `${n}${a}${s}`;
}
function Ge(e, t, r) {
  fe(t).forEach(
    (n) => Object.assign(e, { [`--mantine-${r}-${n}`]: t[n] })
  );
}
const ci = (e) => {
  const t = Jr(e, "dark"), r = Jr(e, "light"), n = e.defaultRadius in e.radius ? e.radius[e.defaultRadius] : b(e.defaultRadius), o = {
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
      "--mantine-radius-default": n,
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
      "--mantine-color-error": e.colors.red[6],
      "--mantine-color-placeholder": e.colors.gray[5],
      "--mantine-color-anchor": e.colors[e.primaryColor][r],
      "--mantine-color-default": e.white,
      "--mantine-color-default-hover": e.colors.gray[0],
      "--mantine-color-default-color": e.black,
      "--mantine-color-default-border": e.colors.gray[4]
    },
    dark: {
      "--mantine-color-bright": "var(--mantine-color-white)",
      "--mantine-color-text": "var(--mantine-color-dark-0)",
      "--mantine-color-body": e.colors.dark[7],
      "--mantine-color-error": e.colors.red[9],
      "--mantine-color-placeholder": e.colors.dark[3],
      "--mantine-color-anchor": e.colors[e.primaryColor][4],
      "--mantine-color-default": e.colors.dark[6],
      "--mantine-color-default-hover": e.colors.dark[5],
      "--mantine-color-default-color": e.white,
      "--mantine-color-default-border": e.colors.dark[4]
    }
  };
  Ge(o.variables, e.breakpoints, "breakpoint"), Ge(o.variables, e.spacing, "spacing"), Ge(o.variables, e.fontSizes, "font-size"), Ge(o.variables, e.lineHeights, "line-height"), Ge(o.variables, e.shadows, "shadow"), Ge(o.variables, e.radius, "radius"), fe(e.colors).forEach((i) => {
    e.colors[i].forEach((c, f) => {
      o.variables[`--mantine-color-${i}-${f}`] = c;
    });
    const s = r === 9 ? e.colors[i][8] : e.colors[i][r + 1], l = t === 9 ? e.colors[i][8] : e.colors[i][t + 1];
    o.light["--mantine-color-dimmed"] = "var(--mantine-color-gray-6)", o.light[`--mantine-color-${i}-filled`] = e.colors[i][r], o.light[`--mantine-color-${i}-filled-hover`] = s, o.light[`--mantine-color-${i}-light`] = X(
      e.colors[i][r],
      0.1
    ), o.light[`--mantine-color-${i}-light-hover`] = X(
      e.colors[i][r],
      0.12
    ), o.light[`--mantine-color-${i}-light-color`] = e.colors[i][r], o.light[`--mantine-color-${i}-outline`] = e.colors[i][r], o.light[`--mantine-color-${i}-outline-hover`] = X(
      e.colors[i][r],
      0.05
    ), o.dark["--mantine-color-dimmed"] = "var(--mantine-color-dark-2)", o.dark[`--mantine-color-${i}-filled`] = e.colors[i][t], o.dark[`--mantine-color-${i}-filled-hover`] = l, o.dark[`--mantine-color-${i}-light`] = X(
      e.colors[i][Math.max(0, t - 2)],
      0.15
    ), o.dark[`--mantine-color-${i}-light-hover`] = X(
      e.colors[i][Math.max(0, t - 2)],
      0.2
    ), o.dark[`--mantine-color-${i}-light-color`] = e.colors[i][Math.max(t - 5, 0)], o.dark[`--mantine-color-${i}-outline`] = e.colors[i][Math.max(t - 4, 0)], o.dark[`--mantine-color-${i}-outline-hover`] = X(
      e.colors[i][Math.max(t - 4, 0)],
      0.05
    );
  });
  const a = e.headings.sizes;
  return fe(a).forEach((i) => {
    o.variables[`--mantine-${i}-font-size`] = a[i].fontSize, o.variables[`--mantine-${i}-line-height`] = a[i].lineHeight, o.variables[`--mantine-${i}-font-weight`] = a[i].fontWeight || e.headings.fontWeight;
  }), o;
};
function Qc({ theme: e, generator: t }) {
  const r = ci(e), n = t == null ? void 0 : t(e);
  return n ? sn(r, n) : r;
}
const Ar = ci(pn);
function Zc(e) {
  const t = {
    variables: {},
    light: {},
    dark: {}
  };
  return fe(e.variables).forEach((r) => {
    Ar.variables[r] !== e.variables[r] && (t.variables[r] = e.variables[r]);
  }), fe(e.light).forEach((r) => {
    Ar.light[r] !== e.light[r] && (t.light[r] = e.light[r]);
  }), fe(e.dark).forEach((r) => {
    Ar.dark[r] !== e.dark[r] && (t.dark[r] = e.dark[r]);
  }), t;
}
function ef(e) {
  return `
  ${e}[data-mantine-color-scheme="dark"] { --mantine-color-scheme: dark; }
  ${e}[data-mantine-color-scheme="light"] { --mantine-color-scheme: light; }
`;
}
function fi({ cssVariablesSelector: e }) {
  const t = Se(), r = yn(), n = Cc(), o = Qc({ theme: t, generator: n }), a = e === ":root", i = a ? Zc(o) : o, s = Jc(i, e);
  return s ? /* @__PURE__ */ P.createElement(
    "style",
    {
      "data-mantine-styles": !0,
      nonce: r == null ? void 0 : r(),
      dangerouslySetInnerHTML: {
        __html: `${s}${a ? "" : ef(e)}`
      }
    }
  ) : null;
}
fi.displayName = "@mantine/CssVariables";
function tf() {
  const e = Se(), t = yn(), r = fe(e.breakpoints).reduce((n, o) => {
    const a = Fl(e.breakpoints[o]);
    return `${n}@media (max-width: ${Yn(
      a - 0.1
    )}) {.mantine-visible-from-${o} {display: none !important;}}@media (min-width: ${Yn(
      a
    )}) {.mantine-hidden-from-${o} {display: none !important;}}`;
  }, "");
  return /* @__PURE__ */ P.createElement(
    "style",
    {
      "data-mantine-styles": "classes",
      nonce: t == null ? void 0 : t(),
      dangerouslySetInnerHTML: { __html: r }
    }
  );
}
Nc();
function ui({
  theme: e,
  children: t,
  getStyleNonce: r,
  withCssVariables: n = !0,
  cssVariablesSelector: o = ":root",
  classNamesPrefix: a = "mantine",
  colorSchemeManager: i = Tc(),
  defaultColorScheme: s = "light",
  getRootElement: l = () => document.documentElement,
  cssVariablesResolver: c,
  forceColorScheme: f
}) {
  const { colorScheme: u, setColorScheme: p, clearColorScheme: d } = Xc({
    defaultColorScheme: s,
    forceColorScheme: f,
    manager: i,
    getRootElement: l
  });
  return qc({
    respectReducedMotion: (e == null ? void 0 : e.respectReducedMotion) || !1,
    getRootElement: l
  }), /* @__PURE__ */ P.createElement(
    vn.Provider,
    {
      value: {
        colorSchemeManager: i,
        colorScheme: u,
        setColorScheme: p,
        clearColorScheme: d,
        getRootElement: l,
        classNamesPrefix: a,
        getStyleNonce: r,
        cssVariablesResolver: c,
        cssVariablesSelector: o
      }
    },
    /* @__PURE__ */ P.createElement(Za, { theme: e }, n && /* @__PURE__ */ P.createElement(fi, { cssVariablesSelector: o }), /* @__PURE__ */ P.createElement(tf, null), t)
  );
}
ui.displayName = "@mantine/core/MantineProvider";
var rf = Object.defineProperty, po = Object.getOwnPropertySymbols, nf = Object.prototype.hasOwnProperty, of = Object.prototype.propertyIsEnumerable, mo = (e, t, r) => t in e ? rf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Mr = (e, t) => {
  for (var r in t || (t = {}))
    nf.call(t, r) && mo(e, r, t[r]);
  if (po)
    for (var r of po(t))
      of.call(t, r) && mo(e, r, t[r]);
  return e;
};
function k(e, t, r) {
  var n;
  const o = Se(), a = (n = o.components[e]) == null ? void 0 : n.defaultProps, i = typeof a == "function" ? a(o) : a;
  return Mr(Mr(Mr({}, t), i), ln(r));
}
function vo() {
  const e = document.createElement("style");
  return e.innerHTML = "*, *::before, *::after {transition: none !important;}", e.setAttribute("data-mantine-disable-transition", "true"), document.head.appendChild(e), () => document.querySelectorAll("[data-mantine-disable-transition]").forEach((r) => r.remove());
}
function af({ keepTransitions: e } = {}) {
  const t = H(), r = H(), n = Me(vn);
  if (!n)
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  const o = (c) => {
    n.setColorScheme(c), t.current = e ? () => {
    } : vo(), window.clearTimeout(r.current), r.current = window.setTimeout(() => {
      var f;
      (f = t.current) == null || f.call(t);
    }, 10);
  }, a = () => {
    n.clearColorScheme(), t.current = e ? () => {
    } : vo(), window.clearTimeout(r.current), r.current = window.setTimeout(() => {
      var c;
      (c = t.current) == null || c.call(t);
    }, 10);
  }, i = Mc("light", { getInitialValueInEffect: !1 }), s = n.colorScheme === "auto" ? i : n.colorScheme, l = Q(
    () => o(s === "light" ? "dark" : "light"),
    [o, s]
  );
  return B(
    () => () => {
      var c;
      (c = t.current) == null || c.call(t), window.clearTimeout(r.current);
    },
    []
  ), {
    colorScheme: n.colorScheme,
    setColorScheme: o,
    clearColorScheme: a,
    toggleColorScheme: l
  };
}
function go(e) {
  return fe(e).reduce(
    (t, r) => e[r] !== void 0 ? `${t}${Ml(r)}:${e[r]};` : t,
    ""
  ).trim();
}
function sf({ selector: e, styles: t, media: r }) {
  const n = t ? go(t) : "", o = Array.isArray(r) ? r.map((a) => `@media${a.query}{${e}{${go(a.styles)}}}`) : [];
  return `${n ? `${e}{${n}}` : ""}${o.join("")}`.trim();
}
function lf({ selector: e, styles: t, media: r }) {
  const n = yn();
  return /* @__PURE__ */ P.createElement(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: n == null ? void 0 : n(),
      dangerouslySetInnerHTML: { __html: sf({ selector: e, styles: t, media: r }) }
    }
  );
}
function cf() {
  return `__m__-${bl().replace(/:/g, "")}`;
}
var ff = Object.defineProperty, yo = Object.getOwnPropertySymbols, uf = Object.prototype.hasOwnProperty, df = Object.prototype.propertyIsEnumerable, ho = (e, t, r) => t in e ? ff(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, _o = (e, t) => {
  for (var r in t || (t = {}))
    uf.call(t, r) && ho(e, r, t[r]);
  if (yo)
    for (var r of yo(t))
      df.call(t, r) && ho(e, r, t[r]);
  return e;
};
function hn(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (r, n) => _o(_o({}, r), hn(n, t)),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
var pf = Object.defineProperty, bo = Object.getOwnPropertySymbols, mf = Object.prototype.hasOwnProperty, vf = Object.prototype.propertyIsEnumerable, wo = (e, t, r) => t in e ? pf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ut = (e, t) => {
  for (var r in t || (t = {}))
    mf.call(t, r) && wo(e, r, t[r]);
  if (bo)
    for (var r of bo(t))
      vf.call(t, r) && wo(e, r, t[r]);
  return e;
};
function tn(e, t) {
  return Array.isArray(e) ? [...e].reduce(
    (r, n) => ut(ut({}, r), tn(n, t)),
    {}
  ) : typeof e == "function" ? e(t) : e ?? {};
}
function gf({
  theme: e,
  style: t,
  vars: r,
  styleProps: n
}) {
  const o = tn(t, e), a = tn(r, e);
  return ut(ut(ut({}, o), a), n);
}
var yf = Object.defineProperty, Oo = Object.getOwnPropertySymbols, hf = Object.prototype.hasOwnProperty, _f = Object.prototype.propertyIsEnumerable, Po = (e, t, r) => t in e ? yf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, $o = (e, t) => {
  for (var r in t || (t = {}))
    hf.call(t, r) && Po(e, r, t[r]);
  if (Oo)
    for (var r of Oo(t))
      _f.call(t, r) && Po(e, r, t[r]);
  return e;
};
function di(e) {
  return e.startsWith("data-") ? e : `data-${e}`;
}
function bf(e) {
  return Object.keys(e).reduce((t, r) => {
    const n = e[r];
    return n === void 0 || n === "" || n === !1 || n === null || (t[di(r)] = e[r]), t;
  }, {});
}
function pi(e) {
  return e ? typeof e == "string" ? { [di(e)]: !0 } : Array.isArray(e) ? [...e].reduce(
    (t, r) => $o($o({}, t), pi(r)),
    {}
  ) : bf(e) : null;
}
var xo = Object.getOwnPropertySymbols, wf = Object.prototype.hasOwnProperty, Of = Object.prototype.propertyIsEnumerable, Pf = (e, t) => {
  var r = {};
  for (var n in e)
    wf.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && xo)
    for (var n of xo(e))
      t.indexOf(n) < 0 && Of.call(e, n) && (r[n] = e[n]);
  return r;
};
function $f(e) {
  const t = e, {
    m: r,
    mx: n,
    my: o,
    mt: a,
    mb: i,
    ml: s,
    mr: l,
    p: c,
    px: f,
    py: u,
    pt: p,
    pb: d,
    pl: m,
    pr: v,
    bg: y,
    c: h,
    opacity: g,
    ff: O,
    fz: _,
    fw: w,
    lts: x,
    ta: j,
    lh: M,
    fs: I,
    tt: F,
    td: N,
    w: D,
    miw: R,
    maw: E,
    h: S,
    mih: C,
    mah: L,
    bgsz: T,
    bgp: W,
    bgr: ie,
    bga: se,
    pos: le,
    top: ee,
    left: J,
    bottom: tt,
    right: ze,
    inset: Y,
    display: Re,
    hiddenFrom: rt,
    visibleFrom: He,
    lightHidden: nt,
    darkHidden: Be
  } = t, Ce = Pf(t, [
    "m",
    "mx",
    "my",
    "mt",
    "mb",
    "ml",
    "mr",
    "p",
    "px",
    "py",
    "pt",
    "pb",
    "pl",
    "pr",
    "bg",
    "c",
    "opacity",
    "ff",
    "fz",
    "fw",
    "lts",
    "ta",
    "lh",
    "fs",
    "tt",
    "td",
    "w",
    "miw",
    "maw",
    "h",
    "mih",
    "mah",
    "bgsz",
    "bgp",
    "bgr",
    "bga",
    "pos",
    "top",
    "left",
    "bottom",
    "right",
    "inset",
    "display",
    "hiddenFrom",
    "visibleFrom",
    "lightHidden",
    "darkHidden"
  ]);
  return { styleProps: ln({
    m: r,
    mx: n,
    my: o,
    mt: a,
    mb: i,
    ml: s,
    mr: l,
    p: c,
    px: f,
    py: u,
    pt: p,
    pb: d,
    pl: m,
    pr: v,
    bg: y,
    c: h,
    opacity: g,
    ff: O,
    fz: _,
    fw: w,
    lts: x,
    ta: j,
    lh: M,
    fs: I,
    tt: F,
    td: N,
    w: D,
    miw: R,
    maw: E,
    h: S,
    mih: C,
    mah: L,
    bgsz: T,
    bgp: W,
    bgr: ie,
    bga: se,
    pos: le,
    top: ee,
    left: J,
    bottom: tt,
    right: ze,
    inset: Y,
    display: Re,
    hiddenFrom: rt,
    visibleFrom: He,
    lightHidden: nt,
    darkHidden: Be
  }), rest: Ce };
}
function xf(e, t) {
  const r = dn({ color: e, theme: t });
  return r.color === "dimmed" ? "var(--mantine-color-dimmed)" : r.color === "bright" ? "var(--mantine-color-bright)" : r.variable ? `var(${r.variable})` : r.color;
}
function Ef(e, t) {
  return typeof e == "string" && e in t.fontSizes ? `var(--mantine-font-size-${e})` : typeof e == "number" || typeof e == "string" ? b(e) : e;
}
function Sf(e, t) {
  if (typeof e == "number")
    return b(e);
  if (typeof e == "string") {
    const r = e.replace("-", "");
    if (!(r in t.spacing))
      return b(e);
    const n = `--mantine-spacing-${r}`;
    return e.startsWith("-") ? `calc(var(${n}) * -1)` : `var(${n})`;
  }
  return e;
}
function Rf(e) {
  return e;
}
function Cf(e) {
  return typeof e == "number" ? b(e) : e;
}
function jf(e, t) {
  return typeof e == "string" && e in t.fontSizes ? `var(--mantine-line-height-${e})` : e;
}
const Lr = {
  color: xf,
  fontSize: Ef,
  spacing: Sf,
  identity: Rf,
  size: Cf,
  lineHeight: jf
};
var Nf = Object.defineProperty, Tf = Object.defineProperties, If = Object.getOwnPropertyDescriptors, Dt = Object.getOwnPropertySymbols, mi = Object.prototype.hasOwnProperty, vi = Object.prototype.propertyIsEnumerable, Eo = (e, t, r) => t in e ? Nf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Df = (e, t) => {
  for (var r in t || (t = {}))
    mi.call(t, r) && Eo(e, r, t[r]);
  if (Dt)
    for (var r of Dt(t))
      vi.call(t, r) && Eo(e, r, t[r]);
  return e;
}, Af = (e, t) => Tf(e, If(t)), Mf = (e, t) => {
  var r = {};
  for (var n in e)
    mi.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Dt)
    for (var n of Dt(e))
      t.indexOf(n) < 0 && vi.call(e, n) && (r[n] = e[n]);
  return r;
};
function So(e) {
  return e.replace("(min-width: ", "").replace("em)", "");
}
function Lf(e) {
  var t = e, {
    media: r
  } = t, n = Mf(t, [
    "media"
  ]);
  const a = Object.keys(r).sort((i, s) => Number(So(i)) - Number(So(s))).map((i) => ({ query: i, styles: r[i] }));
  return Af(Df({}, n), { media: a });
}
var Ff = Object.defineProperty, kf = Object.defineProperties, Vf = Object.getOwnPropertyDescriptors, Ro = Object.getOwnPropertySymbols, zf = Object.prototype.hasOwnProperty, Hf = Object.prototype.propertyIsEnumerable, Co = (e, t, r) => t in e ? Ff(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Bf = (e, t) => {
  for (var r in t || (t = {}))
    zf.call(t, r) && Co(e, r, t[r]);
  if (Ro)
    for (var r of Ro(t))
      Hf.call(t, r) && Co(e, r, t[r]);
  return e;
}, Wf = (e, t) => kf(e, Vf(t));
function Gf(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.keys(e);
  return !(t.length === 1 && t[0] === "base");
}
function Uf(e) {
  return typeof e == "object" && e !== null ? "base" in e ? e.base : void 0 : e;
}
function Yf(e) {
  return typeof e == "object" && e !== null ? fe(e).filter((t) => t !== "base") : [];
}
function Kf(e, t) {
  return typeof e == "object" && e !== null && t in e ? e[t] : e;
}
function Xf({
  styleProps: e,
  data: t,
  theme: r
}) {
  return Lf(
    fe(e).reduce(
      (n, o) => {
        if (o === "hiddenFrom" || o === "visibleFrom")
          return n;
        const a = t[o], i = Array.isArray(a.property) ? a.property : [a.property], s = Uf(e[o]);
        if (!Gf(e[o]))
          return i.forEach((c) => {
            n.inlineStyles[c] = Lr[a.type](s, r);
          }), n;
        n.hasResponsiveStyles = !0;
        const l = Yf(e[o]);
        return i.forEach((c) => {
          s && (n.styles[c] = Lr[a.type](s, r)), l.forEach((f) => {
            const u = `(min-width: ${r.breakpoints[f]})`;
            n.media[u] = Wf(Bf({}, n.media[u]), {
              [c]: Lr[a.type](
                Kf(e[o], f),
                r
              )
            });
          });
        }), n;
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
const qf = {
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
var Jf = Object.defineProperty, At = Object.getOwnPropertySymbols, gi = Object.prototype.hasOwnProperty, yi = Object.prototype.propertyIsEnumerable, jo = (e, t, r) => t in e ? Jf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Fr = (e, t) => {
  for (var r in t || (t = {}))
    gi.call(t, r) && jo(e, r, t[r]);
  if (At)
    for (var r of At(t))
      yi.call(t, r) && jo(e, r, t[r]);
  return e;
}, Qf = (e, t) => {
  var r = {};
  for (var n in e)
    gi.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && At)
    for (var n of At(e))
      t.indexOf(n) < 0 && yi.call(e, n) && (r[n] = e[n]);
  return r;
};
const hi = oe(
  (e, t) => {
    var r = e, {
      component: n,
      style: o,
      __vars: a,
      className: i,
      variant: s,
      mod: l,
      size: c,
      hiddenFrom: f,
      visibleFrom: u,
      lightHidden: p,
      darkHidden: d,
      renderRoot: m
    } = r, v = Qf(r, [
      "component",
      "style",
      "__vars",
      "className",
      "variant",
      "mod",
      "size",
      "hiddenFrom",
      "visibleFrom",
      "lightHidden",
      "darkHidden",
      "renderRoot"
    ]);
    const y = Se(), h = n || "div", { styleProps: g, rest: O } = $f(v), _ = cf(), w = Xf({
      styleProps: g,
      theme: y,
      data: qf
    }), x = Fr(Fr({
      ref: t,
      style: gf({
        theme: y,
        style: o,
        vars: a,
        styleProps: w.inlineStyles
      }),
      className: ye(i, {
        [_]: w.hasResponsiveStyles,
        "mantine-light-hidden": p,
        "mantine-dark-hidden": d,
        [`mantine-hidden-from-${f}`]: f,
        [`mantine-visible-from-${u}`]: u
      }),
      "data-variant": s,
      "data-size": Xa(c) ? void 0 : c || void 0
    }, pi(l)), O);
    return /* @__PURE__ */ P.createElement(P.Fragment, null, w.hasResponsiveStyles && /* @__PURE__ */ P.createElement(
      lf,
      {
        selector: `.${_}`,
        styles: w.styles,
        media: w.media
      }
    ), typeof m == "function" ? m(x) : /* @__PURE__ */ P.createElement(h, Fr({}, x)));
  }
);
hi.displayName = "@mantine/core/Box";
const V = hi;
function _i(e) {
  return e;
}
function ae(e) {
  const t = oe(e);
  return t.extend = _i, t;
}
function Fe(e) {
  const t = oe(e);
  return t.extend = _i, t;
}
const Zf = dt({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function _n() {
  return Me(Zf);
}
var eu = Object.defineProperty, tu = Object.defineProperties, ru = Object.getOwnPropertyDescriptors, Mt = Object.getOwnPropertySymbols, bi = Object.prototype.hasOwnProperty, wi = Object.prototype.propertyIsEnumerable, No = (e, t, r) => t in e ? eu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, je = (e, t) => {
  for (var r in t || (t = {}))
    bi.call(t, r) && No(e, r, t[r]);
  if (Mt)
    for (var r of Mt(t))
      wi.call(t, r) && No(e, r, t[r]);
  return e;
}, kr = (e, t) => tu(e, ru(t)), nu = (e, t) => {
  var r = {};
  for (var n in e)
    bi.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Mt)
    for (var n of Mt(e))
      t.indexOf(n) < 0 && wi.call(e, n) && (r[n] = e[n]);
  return r;
};
function ou(e) {
  if (!e || typeof e == "string")
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Vr(e) {
  return e != null && e.current ? e.current.scrollHeight : "auto";
}
const it = typeof window < "u" && window.requestAnimationFrame;
function au({
  transitionDuration: e,
  transitionTimingFunction: t = "ease",
  onTransitionEnd: r = () => {
  },
  opened: n
}) {
  const o = H(null), a = 0, i = {
    display: "none",
    height: 0,
    overflow: "hidden"
  }, [s, l] = z(n ? {} : i), c = (m) => {
    Pl(() => l(m));
  }, f = (m) => {
    c((v) => je(je({}, v), m));
  };
  function u(m) {
    return {
      transition: `height ${e || ou(m)}ms ${t}`
    };
  }
  $e(() => {
    typeof it == "function" && it(n ? () => {
      f({ willChange: "height", display: "block", overflow: "hidden" }), it(() => {
        const m = Vr(o);
        f(kr(je({}, u(m)), { height: m }));
      });
    } : () => {
      const m = Vr(o);
      f(kr(je({}, u(m)), { willChange: "height", height: m })), it(() => f({ height: a, overflow: "hidden" }));
    });
  }, [n]);
  const p = (m) => {
    if (!(m.target !== o.current || m.propertyName !== "height"))
      if (n) {
        const v = Vr(o);
        v === s.height ? c({}) : f({ height: v }), r();
      } else
        s.height === a && (c(i), r());
  };
  function d(m = {}) {
    var v = m, { style: y = {}, refKey: h = "ref" } = v, g = nu(v, ["style", "refKey"]);
    const O = g[h];
    return kr(je({
      "aria-hidden": !n
    }, g), {
      [h]: si(o, O),
      onTransitionEnd: p,
      style: je(je({ boxSizing: "border-box" }, y), s)
    });
  }
  return d;
}
var iu = Object.defineProperty, Lt = Object.getOwnPropertySymbols, Oi = Object.prototype.hasOwnProperty, Pi = Object.prototype.propertyIsEnumerable, To = (e, t, r) => t in e ? iu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, zr = (e, t) => {
  for (var r in t || (t = {}))
    Oi.call(t, r) && To(e, r, t[r]);
  if (Lt)
    for (var r of Lt(t))
      Pi.call(t, r) && To(e, r, t[r]);
  return e;
}, su = (e, t) => {
  var r = {};
  for (var n in e)
    Oi.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Lt)
    for (var n of Lt(e))
      t.indexOf(n) < 0 && Pi.call(e, n) && (r[n] = e[n]);
  return r;
};
const lu = {
  transitionDuration: 200,
  transitionTimingFunction: "ease",
  animateOpacity: !0
}, $i = oe((e, t) => {
  const r = k("Collapse", lu, e), {
    children: n,
    in: o,
    transitionDuration: a,
    transitionTimingFunction: i,
    style: s,
    onTransitionEnd: l,
    animateOpacity: c
  } = r, f = su(r, [
    "children",
    "in",
    "transitionDuration",
    "transitionTimingFunction",
    "style",
    "onTransitionEnd",
    "animateOpacity"
  ]), u = Se(), p = li(), m = (u.respectReducedMotion ? p : !1) ? 0 : a, v = au({
    opened: o,
    transitionDuration: m,
    transitionTimingFunction: i,
    onTransitionEnd: l
  });
  return m === 0 ? o ? /* @__PURE__ */ P.createElement(V, zr({}, f), n) : null : /* @__PURE__ */ P.createElement(V, zr({}, v(zr({ style: hn(s, u), ref: t }, f))), /* @__PURE__ */ P.createElement(
    "div",
    {
      style: {
        opacity: o || !c ? 1 : 0,
        transition: c ? `opacity ${m}ms ${i}` : "none"
      }
    },
    n
  ));
});
$i.displayName = "@mantine/core/Collapse";
var cu = { root: "m-87cf2631" };
const xi = cu;
var fu = Object.defineProperty, uu = Object.defineProperties, du = Object.getOwnPropertyDescriptors, Ft = Object.getOwnPropertySymbols, Ei = Object.prototype.hasOwnProperty, Si = Object.prototype.propertyIsEnumerable, Io = (e, t, r) => t in e ? fu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Do = (e, t) => {
  for (var r in t || (t = {}))
    Ei.call(t, r) && Io(e, r, t[r]);
  if (Ft)
    for (var r of Ft(t))
      Si.call(t, r) && Io(e, r, t[r]);
  return e;
}, pu = (e, t) => uu(e, du(t)), mu = (e, t) => {
  var r = {};
  for (var n in e)
    Ei.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Ft)
    for (var n of Ft(e))
      t.indexOf(n) < 0 && Si.call(e, n) && (r[n] = e[n]);
  return r;
};
const vu = {
  __staticSelector: "UnstyledButton"
}, hr = Fe(
  (e, t) => {
    const r = k("UnstyledButton", vu, e), n = r, {
      className: o,
      component: a = "button",
      __staticSelector: i,
      unstyled: s,
      classNames: l,
      styles: c,
      style: f
    } = n, u = mu(n, [
      "className",
      "component",
      "__staticSelector",
      "unstyled",
      "classNames",
      "styles",
      "style"
    ]), p = U({
      name: i,
      props: r,
      classes: xi,
      className: o,
      style: f,
      classNames: l,
      styles: c,
      unstyled: s
    });
    return /* @__PURE__ */ P.createElement(
      V,
      Do(pu(Do({}, p("root", { focusable: !0 })), {
        component: a,
        ref: t,
        type: a === "button" ? "button" : void 0
      }), u)
    );
  }
);
hr.classes = xi;
hr.displayName = "@mantine/core/UnstyledButton";
var gu = { root: "m-1b7284a3" };
const Ri = gu;
var yu = Object.defineProperty, hu = Object.defineProperties, _u = Object.getOwnPropertyDescriptors, kt = Object.getOwnPropertySymbols, Ci = Object.prototype.hasOwnProperty, ji = Object.prototype.propertyIsEnumerable, Ao = (e, t, r) => t in e ? yu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Mo = (e, t) => {
  for (var r in t || (t = {}))
    Ci.call(t, r) && Ao(e, r, t[r]);
  if (kt)
    for (var r of kt(t))
      ji.call(t, r) && Ao(e, r, t[r]);
  return e;
}, bu = (e, t) => hu(e, _u(t)), wu = (e, t) => {
  var r = {};
  for (var n in e)
    Ci.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && kt)
    for (var n of kt(e))
      t.indexOf(n) < 0 && ji.call(e, n) && (r[n] = e[n]);
  return r;
};
const Ou = {}, Pu = (e, { radius: t, shadow: r }) => ({
  root: {
    "--paper-radius": t === void 0 ? void 0 : Le(t),
    "--paper-shadow": qa(r)
  }
}), bn = Fe((e, t) => {
  const r = k("Paper", Ou, e), n = r, {
    classNames: o,
    className: a,
    style: i,
    styles: s,
    unstyled: l,
    withBorder: c,
    vars: f,
    radius: u,
    shadow: p,
    variant: d
  } = n, m = wu(n, [
    "classNames",
    "className",
    "style",
    "styles",
    "unstyled",
    "withBorder",
    "vars",
    "radius",
    "shadow",
    "variant"
  ]), v = U({
    name: "Paper",
    props: r,
    classes: Ri,
    className: a,
    style: i,
    classNames: o,
    styles: s,
    unstyled: l,
    vars: f,
    varsResolver: Pu
  });
  return /* @__PURE__ */ P.createElement(
    V,
    Mo(bu(Mo({
      ref: t,
      mod: { "data-with-border": c }
    }, v("root")), {
      variant: d
    }), m)
  );
});
bn.classes = Ri;
bn.displayName = "@mantine/core/Paper";
const re = Math.min, G = Math.max, Vt = Math.round, _t = Math.floor, xe = (e) => ({
  x: e,
  y: e
}), $u = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, xu = {
  start: "end",
  end: "start"
};
function rn(e, t, r) {
  return G(e, re(t, r));
}
function ve(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ne(e) {
  return e.split("-")[0];
}
function et(e) {
  return e.split("-")[1];
}
function wn(e) {
  return e === "x" ? "y" : "x";
}
function On(e) {
  return e === "y" ? "height" : "width";
}
function ke(e) {
  return ["top", "bottom"].includes(ne(e)) ? "y" : "x";
}
function Pn(e) {
  return wn(ke(e));
}
function Eu(e, t, r) {
  r === void 0 && (r = !1);
  const n = et(e), o = Pn(e), a = On(o);
  let i = o === "x" ? n === (r ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (i = zt(i)), [i, zt(i)];
}
function Su(e) {
  const t = zt(e);
  return [nn(e), t, nn(t)];
}
function nn(e) {
  return e.replace(/start|end/g, (t) => xu[t]);
}
function Ru(e, t, r) {
  const n = ["left", "right"], o = ["right", "left"], a = ["top", "bottom"], i = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return r ? t ? o : n : t ? n : o;
    case "left":
    case "right":
      return t ? a : i;
    default:
      return [];
  }
}
function Cu(e, t, r, n) {
  const o = et(e);
  let a = Ru(ne(e), r === "start", n);
  return o && (a = a.map((i) => i + "-" + o), t && (a = a.concat(a.map(nn)))), a;
}
function zt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => $u[t]);
}
function ju(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function $n(e) {
  return typeof e != "number" ? ju(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Xe(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height
  };
}
function Lo(e, t, r) {
  let {
    reference: n,
    floating: o
  } = e;
  const a = ke(t), i = Pn(t), s = On(i), l = ne(t), c = a === "y", f = n.x + n.width / 2 - o.width / 2, u = n.y + n.height / 2 - o.height / 2, p = n[s] / 2 - o[s] / 2;
  let d;
  switch (l) {
    case "top":
      d = {
        x: f,
        y: n.y - o.height
      };
      break;
    case "bottom":
      d = {
        x: f,
        y: n.y + n.height
      };
      break;
    case "right":
      d = {
        x: n.x + n.width,
        y: u
      };
      break;
    case "left":
      d = {
        x: n.x - o.width,
        y: u
      };
      break;
    default:
      d = {
        x: n.x,
        y: n.y
      };
  }
  switch (et(t)) {
    case "start":
      d[i] -= p * (r && c ? -1 : 1);
      break;
    case "end":
      d[i] += p * (r && c ? -1 : 1);
      break;
  }
  return d;
}
const Nu = async (e, t, r) => {
  const {
    placement: n = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: i
  } = r, s = a.filter(Boolean), l = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let c = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: f,
    y: u
  } = Lo(c, n, l), p = n, d = {}, m = 0;
  for (let v = 0; v < s.length; v++) {
    const {
      name: y,
      fn: h
    } = s[v], {
      x: g,
      y: O,
      data: _,
      reset: w
    } = await h({
      x: f,
      y: u,
      initialPlacement: n,
      placement: p,
      strategy: o,
      middlewareData: d,
      rects: c,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    if (f = g ?? f, u = O ?? u, d = {
      ...d,
      [y]: {
        ...d[y],
        ..._
      }
    }, w && m <= 50) {
      m++, typeof w == "object" && (w.placement && (p = w.placement), w.rects && (c = w.rects === !0 ? await i.getElementRects({
        reference: e,
        floating: t,
        strategy: o
      }) : w.rects), {
        x: f,
        y: u
      } = Lo(c, p, l)), v = -1;
      continue;
    }
  }
  return {
    x: f,
    y: u,
    placement: p,
    strategy: o,
    middlewareData: d
  };
};
async function xn(e, t) {
  var r;
  t === void 0 && (t = {});
  const {
    x: n,
    y: o,
    platform: a,
    rects: i,
    elements: s,
    strategy: l
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: f = "viewport",
    elementContext: u = "floating",
    altBoundary: p = !1,
    padding: d = 0
  } = ve(t, e), m = $n(d), y = s[p ? u === "floating" ? "reference" : "floating" : u], h = Xe(await a.getClippingRect({
    element: (r = await (a.isElement == null ? void 0 : a.isElement(y))) == null || r ? y : y.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: c,
    rootBoundary: f,
    strategy: l
  })), g = u === "floating" ? {
    ...i.floating,
    x: n,
    y: o
  } : i.reference, O = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), _ = await (a.isElement == null ? void 0 : a.isElement(O)) ? await (a.getScale == null ? void 0 : a.getScale(O)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, w = Xe(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: g,
    offsetParent: O,
    strategy: l
  }) : g);
  return {
    top: (h.top - w.top + m.top) / _.y,
    bottom: (w.bottom - h.bottom + m.bottom) / _.y,
    left: (h.left - w.left + m.left) / _.x,
    right: (w.right - h.right + m.right) / _.x
  };
}
const Fo = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: r,
      y: n,
      placement: o,
      rects: a,
      platform: i,
      elements: s,
      middlewareData: l
    } = t, {
      element: c,
      padding: f = 0
    } = ve(e, t) || {};
    if (c == null)
      return {};
    const u = $n(f), p = {
      x: r,
      y: n
    }, d = Pn(o), m = On(d), v = await i.getDimensions(c), y = d === "y", h = y ? "top" : "left", g = y ? "bottom" : "right", O = y ? "clientHeight" : "clientWidth", _ = a.reference[m] + a.reference[d] - p[d] - a.floating[m], w = p[d] - a.reference[d], x = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(c));
    let j = x ? x[O] : 0;
    (!j || !await (i.isElement == null ? void 0 : i.isElement(x))) && (j = s.floating[O] || a.floating[m]);
    const M = _ / 2 - w / 2, I = j / 2 - v[m] / 2 - 1, F = re(u[h], I), N = re(u[g], I), D = F, R = j - v[m] - N, E = j / 2 - v[m] / 2 + M, S = rn(D, E, R), C = !l.arrow && et(o) != null && E != S && a.reference[m] / 2 - (E < D ? F : N) - v[m] / 2 < 0, L = C ? E < D ? E - D : E - R : 0;
    return {
      [d]: p[d] + L,
      data: {
        [d]: S,
        centerOffset: E - S - L,
        ...C && {
          alignmentOffset: L
        }
      },
      reset: C
    };
  }
}), Ni = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var r, n;
      const {
        placement: o,
        middlewareData: a,
        rects: i,
        initialPlacement: s,
        platform: l,
        elements: c
      } = t, {
        mainAxis: f = !0,
        crossAxis: u = !0,
        fallbackPlacements: p,
        fallbackStrategy: d = "bestFit",
        fallbackAxisSideDirection: m = "none",
        flipAlignment: v = !0,
        ...y
      } = ve(e, t);
      if ((r = a.arrow) != null && r.alignmentOffset)
        return {};
      const h = ne(o), g = ne(s) === s, O = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), _ = p || (g || !v ? [zt(s)] : Su(s));
      !p && m !== "none" && _.push(...Cu(s, v, m, O));
      const w = [s, ..._], x = await xn(t, y), j = [];
      let M = ((n = a.flip) == null ? void 0 : n.overflows) || [];
      if (f && j.push(x[h]), u) {
        const D = Eu(o, i, O);
        j.push(x[D[0]], x[D[1]]);
      }
      if (M = [...M, {
        placement: o,
        overflows: j
      }], !j.every((D) => D <= 0)) {
        var I, F;
        const D = (((I = a.flip) == null ? void 0 : I.index) || 0) + 1, R = w[D];
        if (R)
          return {
            data: {
              index: D,
              overflows: M
            },
            reset: {
              placement: R
            }
          };
        let E = (F = M.filter((S) => S.overflows[0] <= 0).sort((S, C) => S.overflows[1] - C.overflows[1])[0]) == null ? void 0 : F.placement;
        if (!E)
          switch (d) {
            case "bestFit": {
              var N;
              const S = (N = M.map((C) => [C.placement, C.overflows.filter((L) => L > 0).reduce((L, T) => L + T, 0)]).sort((C, L) => C[1] - L[1])[0]) == null ? void 0 : N[0];
              S && (E = S);
              break;
            }
            case "initialPlacement":
              E = s;
              break;
          }
        if (o !== E)
          return {
            reset: {
              placement: E
            }
          };
      }
      return {};
    }
  };
};
function Ti(e) {
  const t = re(...e.map((a) => a.left)), r = re(...e.map((a) => a.top)), n = G(...e.map((a) => a.right)), o = G(...e.map((a) => a.bottom));
  return {
    x: t,
    y: r,
    width: n - t,
    height: o - r
  };
}
function Tu(e) {
  const t = e.slice().sort((o, a) => o.y - a.y), r = [];
  let n = null;
  for (let o = 0; o < t.length; o++) {
    const a = t[o];
    !n || a.y - n.y > n.height / 2 ? r.push([a]) : r[r.length - 1].push(a), n = a;
  }
  return r.map((o) => Xe(Ti(o)));
}
const Ii = function(e) {
  return e === void 0 && (e = {}), {
    name: "inline",
    options: e,
    async fn(t) {
      const {
        placement: r,
        elements: n,
        rects: o,
        platform: a,
        strategy: i
      } = t, {
        padding: s = 2,
        x: l,
        y: c
      } = ve(e, t), f = Array.from(await (a.getClientRects == null ? void 0 : a.getClientRects(n.reference)) || []), u = Tu(f), p = Xe(Ti(f)), d = $n(s);
      function m() {
        if (u.length === 2 && u[0].left > u[1].right && l != null && c != null)
          return u.find((y) => l > y.left - d.left && l < y.right + d.right && c > y.top - d.top && c < y.bottom + d.bottom) || p;
        if (u.length >= 2) {
          if (ke(r) === "y") {
            const F = u[0], N = u[u.length - 1], D = ne(r) === "top", R = F.top, E = N.bottom, S = D ? F.left : N.left, C = D ? F.right : N.right, L = C - S, T = E - R;
            return {
              top: R,
              bottom: E,
              left: S,
              right: C,
              width: L,
              height: T,
              x: S,
              y: R
            };
          }
          const y = ne(r) === "left", h = G(...u.map((F) => F.right)), g = re(...u.map((F) => F.left)), O = u.filter((F) => y ? F.left === g : F.right === h), _ = O[0].top, w = O[O.length - 1].bottom, x = g, j = h, M = j - x, I = w - _;
          return {
            top: _,
            bottom: w,
            left: x,
            right: j,
            width: M,
            height: I,
            x,
            y: _
          };
        }
        return p;
      }
      const v = await a.getElementRects({
        reference: {
          getBoundingClientRect: m
        },
        floating: n.floating,
        strategy: i
      });
      return o.reference.x !== v.reference.x || o.reference.y !== v.reference.y || o.reference.width !== v.reference.width || o.reference.height !== v.reference.height ? {
        reset: {
          rects: v
        }
      } : {};
    }
  };
};
async function Iu(e, t) {
  const {
    placement: r,
    platform: n,
    elements: o
  } = e, a = await (n.isRTL == null ? void 0 : n.isRTL(o.floating)), i = ne(r), s = et(r), l = ke(r) === "y", c = ["left", "top"].includes(i) ? -1 : 1, f = a && l ? -1 : 1, u = ve(t, e);
  let {
    mainAxis: p,
    crossAxis: d,
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
  return s && typeof m == "number" && (d = s === "end" ? m * -1 : m), l ? {
    x: d * f,
    y: p * c
  } : {
    x: p * c,
    y: d * f
  };
}
const Di = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      const {
        x: r,
        y: n
      } = t, o = await Iu(t, e);
      return {
        x: r + o.x,
        y: n + o.y,
        data: o
      };
    }
  };
}, En = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: r,
        y: n,
        placement: o
      } = t, {
        mainAxis: a = !0,
        crossAxis: i = !1,
        limiter: s = {
          fn: (y) => {
            let {
              x: h,
              y: g
            } = y;
            return {
              x: h,
              y: g
            };
          }
        },
        ...l
      } = ve(e, t), c = {
        x: r,
        y: n
      }, f = await xn(t, l), u = ke(ne(o)), p = wn(u);
      let d = c[p], m = c[u];
      if (a) {
        const y = p === "y" ? "top" : "left", h = p === "y" ? "bottom" : "right", g = d + f[y], O = d - f[h];
        d = rn(g, d, O);
      }
      if (i) {
        const y = u === "y" ? "top" : "left", h = u === "y" ? "bottom" : "right", g = m + f[y], O = m - f[h];
        m = rn(g, m, O);
      }
      const v = s.fn({
        ...t,
        [p]: d,
        [u]: m
      });
      return {
        ...v,
        data: {
          x: v.x - r,
          y: v.y - n
        }
      };
    }
  };
}, Du = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: r,
        y: n,
        placement: o,
        rects: a,
        middlewareData: i
      } = t, {
        offset: s = 0,
        mainAxis: l = !0,
        crossAxis: c = !0
      } = ve(e, t), f = {
        x: r,
        y: n
      }, u = ke(o), p = wn(u);
      let d = f[p], m = f[u];
      const v = ve(s, t), y = typeof v == "number" ? {
        mainAxis: v,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...v
      };
      if (l) {
        const O = p === "y" ? "height" : "width", _ = a.reference[p] - a.floating[O] + y.mainAxis, w = a.reference[p] + a.reference[O] - y.mainAxis;
        d < _ ? d = _ : d > w && (d = w);
      }
      if (c) {
        var h, g;
        const O = p === "y" ? "width" : "height", _ = ["top", "left"].includes(ne(o)), w = a.reference[u] - a.floating[O] + (_ && ((h = i.offset) == null ? void 0 : h[u]) || 0) + (_ ? 0 : y.crossAxis), x = a.reference[u] + a.reference[O] + (_ ? 0 : ((g = i.offset) == null ? void 0 : g[u]) || 0) - (_ ? y.crossAxis : 0);
        m < w ? m = w : m > x && (m = x);
      }
      return {
        [p]: d,
        [u]: m
      };
    }
  };
}, Au = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      const {
        placement: r,
        rects: n,
        platform: o,
        elements: a
      } = t, {
        apply: i = () => {
        },
        ...s
      } = ve(e, t), l = await xn(t, s), c = ne(r), f = et(r), u = ke(r) === "y", {
        width: p,
        height: d
      } = n.floating;
      let m, v;
      c === "top" || c === "bottom" ? (m = c, v = f === (await (o.isRTL == null ? void 0 : o.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (v = c, m = f === "end" ? "top" : "bottom");
      const y = d - l[m], h = p - l[v], g = !t.middlewareData.shift;
      let O = y, _ = h;
      if (u) {
        const x = p - l.left - l.right;
        _ = f || g ? re(h, x) : x;
      } else {
        const x = d - l.top - l.bottom;
        O = f || g ? re(y, x) : x;
      }
      if (g && !f) {
        const x = G(l.left, 0), j = G(l.right, 0), M = G(l.top, 0), I = G(l.bottom, 0);
        u ? _ = p - 2 * (x !== 0 || j !== 0 ? x + j : G(l.left, l.right)) : O = d - 2 * (M !== 0 || I !== 0 ? M + I : G(l.top, l.bottom));
      }
      await i({
        ...t,
        availableWidth: _,
        availableHeight: O
      });
      const w = await o.getDimensions(a.floating);
      return p !== w.width || d !== w.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ee(e) {
  return Ai(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function q(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function he(e) {
  var t;
  return (t = (Ai(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ai(e) {
  return e instanceof Node || e instanceof q(e).Node;
}
function ge(e) {
  return e instanceof Element || e instanceof q(e).Element;
}
function de(e) {
  return e instanceof HTMLElement || e instanceof q(e).HTMLElement;
}
function ko(e) {
  return typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof q(e).ShadowRoot;
}
function vt(e) {
  const {
    overflow: t,
    overflowX: r,
    overflowY: n,
    display: o
  } = Z(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + r) && !["inline", "contents"].includes(o);
}
function Mu(e) {
  return ["table", "td", "th"].includes(Ee(e));
}
function Sn(e) {
  const t = Rn(), r = Z(e);
  return r.transform !== "none" || r.perspective !== "none" || (r.containerType ? r.containerType !== "normal" : !1) || !t && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !t && (r.filter ? r.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((n) => (r.willChange || "").includes(n)) || ["paint", "layout", "strict", "content"].some((n) => (r.contain || "").includes(n));
}
function Lu(e) {
  let t = qe(e);
  for (; de(t) && !_r(t); ) {
    if (Sn(t))
      return t;
    t = qe(t);
  }
  return null;
}
function Rn() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function _r(e) {
  return ["html", "body", "#document"].includes(Ee(e));
}
function Z(e) {
  return q(e).getComputedStyle(e);
}
function br(e) {
  return ge(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.pageXOffset,
    scrollTop: e.pageYOffset
  };
}
function qe(e) {
  if (Ee(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ko(e) && e.host || // Fallback.
    he(e)
  );
  return ko(t) ? t.host : t;
}
function Mi(e) {
  const t = qe(e);
  return _r(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : de(t) && vt(t) ? t : Mi(t);
}
function pe(e, t, r) {
  var n;
  t === void 0 && (t = []), r === void 0 && (r = !0);
  const o = Mi(e), a = o === ((n = e.ownerDocument) == null ? void 0 : n.body), i = q(o);
  return a ? t.concat(i, i.visualViewport || [], vt(o) ? o : [], i.frameElement && r ? pe(i.frameElement) : []) : t.concat(o, pe(o, [], r));
}
function Li(e) {
  const t = Z(e);
  let r = parseFloat(t.width) || 0, n = parseFloat(t.height) || 0;
  const o = de(e), a = o ? e.offsetWidth : r, i = o ? e.offsetHeight : n, s = Vt(r) !== a || Vt(n) !== i;
  return s && (r = a, n = i), {
    width: r,
    height: n,
    $: s
  };
}
function Cn(e) {
  return ge(e) ? e : e.contextElement;
}
function Ye(e) {
  const t = Cn(e);
  if (!de(t))
    return xe(1);
  const r = t.getBoundingClientRect(), {
    width: n,
    height: o,
    $: a
  } = Li(t);
  let i = (a ? Vt(r.width) : r.width) / n, s = (a ? Vt(r.height) : r.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: i,
    y: s
  };
}
const Fu = /* @__PURE__ */ xe(0);
function Fi(e) {
  const t = q(e);
  return !Rn() || !t.visualViewport ? Fu : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ku(e, t, r) {
  return t === void 0 && (t = !1), !r || t && r !== q(e) ? !1 : t;
}
function Ae(e, t, r, n) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  const o = e.getBoundingClientRect(), a = Cn(e);
  let i = xe(1);
  t && (n ? ge(n) && (i = Ye(n)) : i = Ye(e));
  const s = ku(a, r, n) ? Fi(a) : xe(0);
  let l = (o.left + s.x) / i.x, c = (o.top + s.y) / i.y, f = o.width / i.x, u = o.height / i.y;
  if (a) {
    const p = q(a), d = n && ge(n) ? q(n) : n;
    let m = p.frameElement;
    for (; m && n && d !== p; ) {
      const v = Ye(m), y = m.getBoundingClientRect(), h = Z(m), g = y.left + (m.clientLeft + parseFloat(h.paddingLeft)) * v.x, O = y.top + (m.clientTop + parseFloat(h.paddingTop)) * v.y;
      l *= v.x, c *= v.y, f *= v.x, u *= v.y, l += g, c += O, m = q(m).frameElement;
    }
  }
  return Xe({
    width: f,
    height: u,
    x: l,
    y: c
  });
}
function Vu(e) {
  let {
    rect: t,
    offsetParent: r,
    strategy: n
  } = e;
  const o = de(r), a = he(r);
  if (r === a)
    return t;
  let i = {
    scrollLeft: 0,
    scrollTop: 0
  }, s = xe(1);
  const l = xe(0);
  if ((o || !o && n !== "fixed") && ((Ee(r) !== "body" || vt(a)) && (i = br(r)), de(r))) {
    const c = Ae(r);
    s = Ye(r), l.x = c.x + r.clientLeft, l.y = c.y + r.clientTop;
  }
  return {
    width: t.width * s.x,
    height: t.height * s.y,
    x: t.x * s.x - i.scrollLeft * s.x + l.x,
    y: t.y * s.y - i.scrollTop * s.y + l.y
  };
}
function zu(e) {
  return Array.from(e.getClientRects());
}
function ki(e) {
  return Ae(he(e)).left + br(e).scrollLeft;
}
function Hu(e) {
  const t = he(e), r = br(e), n = e.ownerDocument.body, o = G(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth), a = G(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
  let i = -r.scrollLeft + ki(e);
  const s = -r.scrollTop;
  return Z(n).direction === "rtl" && (i += G(t.clientWidth, n.clientWidth) - o), {
    width: o,
    height: a,
    x: i,
    y: s
  };
}
function Bu(e, t) {
  const r = q(e), n = he(e), o = r.visualViewport;
  let a = n.clientWidth, i = n.clientHeight, s = 0, l = 0;
  if (o) {
    a = o.width, i = o.height;
    const c = Rn();
    (!c || c && t === "fixed") && (s = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: s,
    y: l
  };
}
function Wu(e, t) {
  const r = Ae(e, !0, t === "fixed"), n = r.top + e.clientTop, o = r.left + e.clientLeft, a = de(e) ? Ye(e) : xe(1), i = e.clientWidth * a.x, s = e.clientHeight * a.y, l = o * a.x, c = n * a.y;
  return {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function Vo(e, t, r) {
  let n;
  if (t === "viewport")
    n = Bu(e, r);
  else if (t === "document")
    n = Hu(he(e));
  else if (ge(t))
    n = Wu(t, r);
  else {
    const o = Fi(e);
    n = {
      ...t,
      x: t.x - o.x,
      y: t.y - o.y
    };
  }
  return Xe(n);
}
function Vi(e, t) {
  const r = qe(e);
  return r === t || !ge(r) || _r(r) ? !1 : Z(r).position === "fixed" || Vi(r, t);
}
function Gu(e, t) {
  const r = t.get(e);
  if (r)
    return r;
  let n = pe(e, [], !1).filter((s) => ge(s) && Ee(s) !== "body"), o = null;
  const a = Z(e).position === "fixed";
  let i = a ? qe(e) : e;
  for (; ge(i) && !_r(i); ) {
    const s = Z(i), l = Sn(i);
    !l && s.position === "fixed" && (o = null), (a ? !l && !o : !l && s.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || vt(i) && !l && Vi(e, i)) ? n = n.filter((f) => f !== i) : o = s, i = qe(i);
  }
  return t.set(e, n), n;
}
function Uu(e) {
  let {
    element: t,
    boundary: r,
    rootBoundary: n,
    strategy: o
  } = e;
  const i = [...r === "clippingAncestors" ? Gu(t, this._c) : [].concat(r), n], s = i[0], l = i.reduce((c, f) => {
    const u = Vo(t, f, o);
    return c.top = G(u.top, c.top), c.right = re(u.right, c.right), c.bottom = re(u.bottom, c.bottom), c.left = G(u.left, c.left), c;
  }, Vo(t, s, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Yu(e) {
  return Li(e);
}
function Ku(e, t, r) {
  const n = de(t), o = he(t), a = r === "fixed", i = Ae(e, !0, a, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = xe(0);
  if (n || !n && !a)
    if ((Ee(t) !== "body" || vt(o)) && (s = br(t)), n) {
      const c = Ae(t, !0, a, t);
      l.x = c.x + t.clientLeft, l.y = c.y + t.clientTop;
    } else
      o && (l.x = ki(o));
  return {
    x: i.left + s.scrollLeft - l.x,
    y: i.top + s.scrollTop - l.y,
    width: i.width,
    height: i.height
  };
}
function zo(e, t) {
  return !de(e) || Z(e).position === "fixed" ? null : t ? t(e) : e.offsetParent;
}
function zi(e, t) {
  const r = q(e);
  if (!de(e))
    return r;
  let n = zo(e, t);
  for (; n && Mu(n) && Z(n).position === "static"; )
    n = zo(n, t);
  return n && (Ee(n) === "html" || Ee(n) === "body" && Z(n).position === "static" && !Sn(n)) ? r : n || Lu(e) || r;
}
const Xu = async function(e) {
  let {
    reference: t,
    floating: r,
    strategy: n
  } = e;
  const o = this.getOffsetParent || zi, a = this.getDimensions;
  return {
    reference: Ku(t, await o(r), n),
    floating: {
      x: 0,
      y: 0,
      ...await a(r)
    }
  };
};
function qu(e) {
  return Z(e).direction === "rtl";
}
const Ju = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Vu,
  getDocumentElement: he,
  getClippingRect: Uu,
  getOffsetParent: zi,
  getElementRects: Xu,
  getClientRects: zu,
  getDimensions: Yu,
  getScale: Ye,
  isElement: ge,
  isRTL: qu
};
function Qu(e, t) {
  let r = null, n;
  const o = he(e);
  function a() {
    clearTimeout(n), r && r.disconnect(), r = null;
  }
  function i(s, l) {
    s === void 0 && (s = !1), l === void 0 && (l = 1), a();
    const {
      left: c,
      top: f,
      width: u,
      height: p
    } = e.getBoundingClientRect();
    if (s || t(), !u || !p)
      return;
    const d = _t(f), m = _t(o.clientWidth - (c + u)), v = _t(o.clientHeight - (f + p)), y = _t(c), g = {
      rootMargin: -d + "px " + -m + "px " + -v + "px " + -y + "px",
      threshold: G(0, re(1, l)) || 1
    };
    let O = !0;
    function _(w) {
      const x = w[0].intersectionRatio;
      if (x !== l) {
        if (!O)
          return i();
        x ? i(!1, x) : n = setTimeout(() => {
          i(!1, 1e-7);
        }, 100);
      }
      O = !1;
    }
    try {
      r = new IntersectionObserver(_, {
        ...g,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(_, g);
    }
    r.observe(e);
  }
  return i(!0), a;
}
function Zu(e, t, r, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = n, c = Cn(e), f = o || a ? [...c ? pe(c) : [], ...pe(t)] : [];
  f.forEach((h) => {
    o && h.addEventListener("scroll", r, {
      passive: !0
    }), a && h.addEventListener("resize", r);
  });
  const u = c && s ? Qu(c, r) : null;
  let p = -1, d = null;
  i && (d = new ResizeObserver((h) => {
    let [g] = h;
    g && g.target === c && d && (d.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      d && d.observe(t);
    })), r();
  }), c && !l && d.observe(c), d.observe(t));
  let m, v = l ? Ae(e) : null;
  l && y();
  function y() {
    const h = Ae(e);
    v && (h.x !== v.x || h.y !== v.y || h.width !== v.width || h.height !== v.height) && r(), v = h, m = requestAnimationFrame(y);
  }
  return r(), () => {
    f.forEach((h) => {
      o && h.removeEventListener("scroll", r), a && h.removeEventListener("resize", r);
    }), u && u(), d && d.disconnect(), d = null, l && cancelAnimationFrame(m);
  };
}
const ed = (e, t, r) => {
  const n = /* @__PURE__ */ new Map(), o = {
    platform: Ju,
    ...r
  }, a = {
    ...o.platform,
    _c: n
  };
  return Nu(e, t, {
    ...o,
    platform: a
  });
}, Hi = (e) => {
  function t(r) {
    return {}.hasOwnProperty.call(r, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(r) {
      const {
        element: n,
        padding: o
      } = typeof e == "function" ? e(r) : e;
      return n && t(n) ? n.current != null ? Fo({
        element: n.current,
        padding: o
      }).fn(r) : {} : n ? Fo({
        element: n,
        padding: o
      }).fn(r) : {};
    }
  };
};
var Rt = typeof document < "u" ? an : B;
function Ht(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let r, n, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (r = e.length, r != t.length)
        return !1;
      for (n = r; n-- !== 0; )
        if (!Ht(e[n], t[n]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), r = o.length, r !== Object.keys(t).length)
      return !1;
    for (n = r; n-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[n]))
        return !1;
    for (n = r; n-- !== 0; ) {
      const a = o[n];
      if (!(a === "_owner" && e.$$typeof) && !Ht(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Bi(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ho(e, t) {
  const r = Bi(e);
  return Math.round(t * r) / r;
}
function Bo(e) {
  const t = $.useRef(e);
  return Rt(() => {
    t.current = e;
  }), t;
}
function td(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: r = "absolute",
    middleware: n = [],
    platform: o,
    elements: {
      reference: a,
      floating: i
    } = {},
    transform: s = !0,
    whileElementsMounted: l,
    open: c
  } = e, [f, u] = $.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, d] = $.useState(n);
  Ht(p, n) || d(n);
  const [m, v] = $.useState(null), [y, h] = $.useState(null), g = $.useCallback((C) => {
    C != x.current && (x.current = C, v(C));
  }, [v]), O = $.useCallback((C) => {
    C !== j.current && (j.current = C, h(C));
  }, [h]), _ = a || m, w = i || y, x = $.useRef(null), j = $.useRef(null), M = $.useRef(f), I = Bo(l), F = Bo(o), N = $.useCallback(() => {
    if (!x.current || !j.current)
      return;
    const C = {
      placement: t,
      strategy: r,
      middleware: p
    };
    F.current && (C.platform = F.current), ed(x.current, j.current, C).then((L) => {
      const T = {
        ...L,
        isPositioned: !0
      };
      D.current && !Ht(M.current, T) && (M.current = T, wl.flushSync(() => {
        u(T);
      }));
    });
  }, [p, t, r, F]);
  Rt(() => {
    c === !1 && M.current.isPositioned && (M.current.isPositioned = !1, u((C) => ({
      ...C,
      isPositioned: !1
    })));
  }, [c]);
  const D = $.useRef(!1);
  Rt(() => (D.current = !0, () => {
    D.current = !1;
  }), []), Rt(() => {
    if (_ && (x.current = _), w && (j.current = w), _ && w) {
      if (I.current)
        return I.current(_, w, N);
      N();
    }
  }, [_, w, N, I]);
  const R = $.useMemo(() => ({
    reference: x,
    floating: j,
    setReference: g,
    setFloating: O
  }), [g, O]), E = $.useMemo(() => ({
    reference: _,
    floating: w
  }), [_, w]), S = $.useMemo(() => {
    const C = {
      position: r,
      left: 0,
      top: 0
    };
    if (!E.floating)
      return C;
    const L = Ho(E.floating, f.x), T = Ho(E.floating, f.y);
    return s ? {
      ...C,
      transform: "translate(" + L + "px, " + T + "px)",
      ...Bi(E.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: L,
      top: T
    };
  }, [r, s, E.floating, f.x, f.y]);
  return $.useMemo(() => ({
    ...f,
    update: N,
    refs: R,
    elements: E,
    floatingStyles: S
  }), [f, N, R, E, S]);
}
var me = typeof document < "u" ? an : B;
let Hr = !1, rd = 0;
const Wo = () => "floating-ui-" + rd++;
function nd() {
  const [e, t] = $.useState(() => Hr ? Wo() : void 0);
  return me(() => {
    e == null && t(Wo());
  }, []), $.useEffect(() => {
    Hr || (Hr = !0);
  }, []), e;
}
const od = $[/* @__PURE__ */ "useId".toString()], Wi = od || nd;
function ad() {
  const e = /* @__PURE__ */ new Map();
  return {
    emit(t, r) {
      var n;
      (n = e.get(t)) == null || n.forEach((o) => o(r));
    },
    on(t, r) {
      e.set(t, [...e.get(t) || [], r]);
    },
    off(t, r) {
      var n;
      e.set(t, ((n = e.get(t)) == null ? void 0 : n.filter((o) => o !== r)) || []);
    }
  };
}
const id = /* @__PURE__ */ $.createContext(null), sd = /* @__PURE__ */ $.createContext(null), Gi = () => {
  var e;
  return ((e = $.useContext(id)) == null ? void 0 : e.id) || null;
}, jn = () => $.useContext(sd);
function Oe(e) {
  return (e == null ? void 0 : e.ownerDocument) || document;
}
function ld() {
  const e = navigator.userAgentData;
  return e != null && e.platform ? e.platform : navigator.platform;
}
function cd() {
  const e = navigator.userAgentData;
  return e && Array.isArray(e.brands) ? e.brands.map((t) => {
    let {
      brand: r,
      version: n
    } = t;
    return r + "/" + n;
  }).join(" ") : navigator.userAgent;
}
function wr(e) {
  return Oe(e).defaultView || window;
}
function ce(e) {
  return e ? e instanceof Element || e instanceof wr(e).Element : !1;
}
function Ui(e) {
  return e ? e instanceof HTMLElement || e instanceof wr(e).HTMLElement : !1;
}
function fd(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  const t = wr(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function ud(e) {
  if (e.mozInputSource === 0 && e.isTrusted)
    return !0;
  const t = /Android/i;
  return (t.test(ld()) || t.test(cd())) && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function dd(e) {
  return e.width === 0 && e.height === 0 || e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType !== "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0;
}
function Yi(e, t) {
  const r = ["mouse", "pen"];
  return t || r.push("", void 0), r.includes(e);
}
function pd(e) {
  return "nativeEvent" in e;
}
function on(e, t) {
  if (!e || !t)
    return !1;
  const r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && fd(r)) {
    let n = t;
    for (; n; ) {
      if (e === n)
        return !0;
      n = n.parentNode || n.host;
    }
  }
  return !1;
}
function Ki(e) {
  return "data-floating-ui-" + e;
}
function Go(e) {
  const t = H(e);
  return me(() => {
    t.current = e;
  }), t;
}
const Uo = /* @__PURE__ */ Ki("safe-polygon");
function Ct(e, t, r) {
  return r && !Yi(r) ? 0 : typeof e == "number" ? e : e == null ? void 0 : e[t];
}
function md(e, t) {
  t === void 0 && (t = {});
  const {
    open: r,
    onOpenChange: n,
    dataRef: o,
    events: a,
    elements: {
      domReference: i,
      floating: s
    },
    refs: l
  } = e, {
    enabled: c = !0,
    delay: f = 0,
    handleClose: u = null,
    mouseOnly: p = !1,
    restMs: d = 0,
    move: m = !0
  } = t, v = jn(), y = Gi(), h = Go(u), g = Go(f), O = $.useRef(), _ = $.useRef(), w = $.useRef(), x = $.useRef(), j = $.useRef(!0), M = $.useRef(!1), I = $.useRef(() => {
  }), F = $.useCallback(() => {
    var E;
    const S = (E = o.current.openEvent) == null ? void 0 : E.type;
    return (S == null ? void 0 : S.includes("mouse")) && S !== "mousedown";
  }, [o]);
  $.useEffect(() => {
    if (!c)
      return;
    function E() {
      clearTimeout(_.current), clearTimeout(x.current), j.current = !0;
    }
    return a.on("dismiss", E), () => {
      a.off("dismiss", E);
    };
  }, [c, a]), $.useEffect(() => {
    if (!c || !h.current || !r)
      return;
    function E(C) {
      F() && n(!1, C);
    }
    const S = Oe(s).documentElement;
    return S.addEventListener("mouseleave", E), () => {
      S.removeEventListener("mouseleave", E);
    };
  }, [s, r, n, c, h, o, F]);
  const N = $.useCallback(function(E, S) {
    S === void 0 && (S = !0);
    const C = Ct(g.current, "close", O.current);
    C && !w.current ? (clearTimeout(_.current), _.current = setTimeout(() => n(!1, E), C)) : S && (clearTimeout(_.current), n(!1, E));
  }, [g, n]), D = $.useCallback(() => {
    I.current(), w.current = void 0;
  }, []), R = $.useCallback(() => {
    if (M.current) {
      const E = Oe(l.floating.current).body;
      E.style.pointerEvents = "", E.removeAttribute(Uo), M.current = !1;
    }
  }, [l]);
  return $.useEffect(() => {
    if (!c)
      return;
    function E() {
      return o.current.openEvent ? ["click", "mousedown"].includes(o.current.openEvent.type) : !1;
    }
    function S(T) {
      if (clearTimeout(_.current), j.current = !1, p && !Yi(O.current) || d > 0 && Ct(g.current, "open") === 0)
        return;
      const W = Ct(g.current, "open", O.current);
      W ? _.current = setTimeout(() => {
        n(!0, T);
      }, W) : n(!0, T);
    }
    function C(T) {
      if (E())
        return;
      I.current();
      const W = Oe(s);
      if (clearTimeout(x.current), h.current) {
        r || clearTimeout(_.current), w.current = h.current({
          ...e,
          tree: v,
          x: T.clientX,
          y: T.clientY,
          onClose() {
            R(), D(), N(T);
          }
        });
        const se = w.current;
        W.addEventListener("mousemove", se), I.current = () => {
          W.removeEventListener("mousemove", se);
        };
        return;
      }
      (O.current === "touch" ? !on(s, T.relatedTarget) : !0) && N(T);
    }
    function L(T) {
      E() || h.current == null || h.current({
        ...e,
        tree: v,
        x: T.clientX,
        y: T.clientY,
        onClose() {
          R(), D(), N(T);
        }
      })(T);
    }
    if (ce(i)) {
      const T = i;
      return r && T.addEventListener("mouseleave", L), s == null || s.addEventListener("mouseleave", L), m && T.addEventListener("mousemove", S, {
        once: !0
      }), T.addEventListener("mouseenter", S), T.addEventListener("mouseleave", C), () => {
        r && T.removeEventListener("mouseleave", L), s == null || s.removeEventListener("mouseleave", L), m && T.removeEventListener("mousemove", S), T.removeEventListener("mouseenter", S), T.removeEventListener("mouseleave", C);
      };
    }
  }, [i, s, c, e, p, d, m, N, D, R, n, r, v, g, h, o]), me(() => {
    var E;
    if (c && r && (E = h.current) != null && E.__options.blockPointerEvents && F()) {
      const L = Oe(s).body;
      if (L.setAttribute(Uo, ""), L.style.pointerEvents = "none", M.current = !0, ce(i) && s) {
        var S, C;
        const T = i, W = v == null || (S = v.nodesRef.current.find((ie) => ie.id === y)) == null || (C = S.context) == null ? void 0 : C.elements.floating;
        return W && (W.style.pointerEvents = ""), T.style.pointerEvents = "auto", s.style.pointerEvents = "auto", () => {
          T.style.pointerEvents = "", s.style.pointerEvents = "";
        };
      }
    }
  }, [c, r, y, s, i, v, h, o, F]), me(() => {
    r || (O.current = void 0, D(), R());
  }, [r, D, R]), $.useEffect(() => () => {
    D(), clearTimeout(_.current), clearTimeout(x.current), R();
  }, [c, D, R]), $.useMemo(() => {
    if (!c)
      return {};
    function E(S) {
      O.current = S.pointerType;
    }
    return {
      reference: {
        onPointerDown: E,
        onPointerEnter: E,
        onMouseMove(S) {
          r || d === 0 || (clearTimeout(x.current), x.current = setTimeout(() => {
            j.current || n(!0, S.nativeEvent);
          }, d));
        }
      },
      floating: {
        onMouseEnter() {
          clearTimeout(_.current);
        },
        onMouseLeave(S) {
          a.emit("dismiss", {
            type: "mouseLeave",
            data: {
              returnFocus: !1
            }
          }), N(S.nativeEvent, !1);
        }
      }
    };
  }, [a, c, d, r, n, N]);
}
const Xi = /* @__PURE__ */ $.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: () => {
  },
  setState: () => {
  },
  isInstantPhase: !1
}), qi = () => $.useContext(Xi), vd = (e) => {
  let {
    children: t,
    delay: r,
    timeoutMs: n = 0
  } = e;
  const [o, a] = $.useReducer((l, c) => ({
    ...l,
    ...c
  }), {
    delay: r,
    timeoutMs: n,
    initialDelay: r,
    currentId: null,
    isInstantPhase: !1
  }), i = $.useRef(null), s = $.useCallback((l) => {
    a({
      currentId: l
    });
  }, []);
  return me(() => {
    o.currentId ? i.current === null ? i.current = o.currentId : a({
      isInstantPhase: !0
    }) : (a({
      isInstantPhase: !1
    }), i.current = null);
  }, [o.currentId]), /* @__PURE__ */ $.createElement(Xi.Provider, {
    value: $.useMemo(() => ({
      ...o,
      setState: a,
      setCurrentId: s
    }), [o, a, s])
  }, t);
}, gd = (e, t) => {
  let {
    open: r,
    onOpenChange: n
  } = e, {
    id: o
  } = t;
  const {
    currentId: a,
    setCurrentId: i,
    initialDelay: s,
    setState: l,
    timeoutMs: c
  } = qi();
  me(() => {
    a && (l({
      delay: {
        open: 1,
        close: Ct(s, "close")
      }
    }), a !== o && n(!1));
  }, [o, n, l, a, s]), me(() => {
    function f() {
      n(!1), l({
        delay: s,
        currentId: null
      });
    }
    if (!r && a === o)
      if (c) {
        const u = window.setTimeout(f, c);
        return () => {
          clearTimeout(u);
        };
      } else
        f();
  }, [r, l, a, o, n, s, c]), me(() => {
    r && i(o);
  }, [r, i, o]);
};
function yd(e) {
  let t = e.activeElement;
  for (; ((r = t) == null || (n = r.shadowRoot) == null ? void 0 : n.activeElement) != null; ) {
    var r, n;
    t = t.shadowRoot.activeElement;
  }
  return t;
}
function Br(e, t) {
  let r = e.filter((o) => {
    var a;
    return o.parentId === t && ((a = o.context) == null ? void 0 : a.open);
  }), n = r;
  for (; n.length; )
    n = e.filter((o) => {
      var a;
      return (a = n) == null ? void 0 : a.some((i) => {
        var s;
        return o.parentId === i.id && ((s = o.context) == null ? void 0 : s.open);
      });
    }), r = r.concat(n);
  return r;
}
function hd(e) {
  return "composedPath" in e ? e.composedPath()[0] : e.target;
}
const _d = $[/* @__PURE__ */ "useInsertionEffect".toString()], bd = _d || ((e) => e());
function jt(e) {
  const t = $.useRef(() => {
  });
  return bd(() => {
    t.current = e;
  }), $.useCallback(function() {
    for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++)
      n[o] = arguments[o];
    return t.current == null ? void 0 : t.current(...n);
  }, []);
}
function Nt(e, t) {
  if (t == null)
    return !1;
  if ("composedPath" in e)
    return e.composedPath().includes(t);
  const r = e;
  return r.target != null && t.contains(r.target);
}
const wd = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
}, Od = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
}, Pd = (e) => {
  var t, r;
  return {
    escapeKeyBubbles: typeof e == "boolean" ? e : (t = e == null ? void 0 : e.escapeKey) != null ? t : !1,
    outsidePressBubbles: typeof e == "boolean" ? e : (r = e == null ? void 0 : e.outsidePress) != null ? r : !0
  };
};
function $d(e, t) {
  t === void 0 && (t = {});
  const {
    open: r,
    onOpenChange: n,
    events: o,
    nodeId: a,
    elements: {
      reference: i,
      domReference: s,
      floating: l
    },
    dataRef: c
  } = e, {
    enabled: f = !0,
    escapeKey: u = !0,
    outsidePress: p = !0,
    outsidePressEvent: d = "pointerdown",
    referencePress: m = !1,
    referencePressEvent: v = "pointerdown",
    ancestorScroll: y = !1,
    bubbles: h
  } = t, g = jn(), O = Gi() != null, _ = jt(typeof p == "function" ? p : () => !1), w = typeof p == "function" ? _ : p, x = $.useRef(!1), {
    escapeKeyBubbles: j,
    outsidePressBubbles: M
  } = Pd(h), I = jt((N) => {
    if (!r || !f || !u || N.key !== "Escape")
      return;
    const D = g ? Br(g.nodesRef.current, a) : [];
    if (!j && (N.stopPropagation(), D.length > 0)) {
      let R = !0;
      if (D.forEach((E) => {
        var S;
        if ((S = E.context) != null && S.open && !E.context.dataRef.current.__escapeKeyBubbles) {
          R = !1;
          return;
        }
      }), !R)
        return;
    }
    o.emit("dismiss", {
      type: "escapeKey",
      data: {
        returnFocus: {
          preventScroll: !1
        }
      }
    }), n(!1, pd(N) ? N.nativeEvent : N);
  }), F = jt((N) => {
    const D = x.current;
    if (x.current = !1, D || typeof w == "function" && !w(N))
      return;
    const R = hd(N);
    if (Ui(R) && l) {
      const C = R.clientWidth > 0 && R.scrollWidth > R.clientWidth, L = R.clientHeight > 0 && R.scrollHeight > R.clientHeight;
      let T = L && N.offsetX > R.clientWidth;
      if (L && wr(l).getComputedStyle(R).direction === "rtl" && (T = N.offsetX <= R.offsetWidth - R.clientWidth), T || C && N.offsetY > R.clientHeight)
        return;
    }
    const E = g && Br(g.nodesRef.current, a).some((C) => {
      var L;
      return Nt(N, (L = C.context) == null ? void 0 : L.elements.floating);
    });
    if (Nt(N, l) || Nt(N, s) || E)
      return;
    const S = g ? Br(g.nodesRef.current, a) : [];
    if (S.length > 0) {
      let C = !0;
      if (S.forEach((L) => {
        var T;
        if ((T = L.context) != null && T.open && !L.context.dataRef.current.__outsidePressBubbles) {
          C = !1;
          return;
        }
      }), !C)
        return;
    }
    o.emit("dismiss", {
      type: "outsidePress",
      data: {
        returnFocus: O ? {
          preventScroll: !0
        } : ud(N) || dd(N)
      }
    }), n(!1, N);
  });
  return $.useEffect(() => {
    if (!r || !f)
      return;
    c.current.__escapeKeyBubbles = j, c.current.__outsidePressBubbles = M;
    function N(E) {
      n(!1, E);
    }
    const D = Oe(l);
    u && D.addEventListener("keydown", I), w && D.addEventListener(d, F);
    let R = [];
    return y && (ce(s) && (R = pe(s)), ce(l) && (R = R.concat(pe(l))), !ce(i) && i && i.contextElement && (R = R.concat(pe(i.contextElement)))), R = R.filter((E) => {
      var S;
      return E !== ((S = D.defaultView) == null ? void 0 : S.visualViewport);
    }), R.forEach((E) => {
      E.addEventListener("scroll", N, {
        passive: !0
      });
    }), () => {
      u && D.removeEventListener("keydown", I), w && D.removeEventListener(d, F), R.forEach((E) => {
        E.removeEventListener("scroll", N);
      });
    };
  }, [c, l, s, i, u, w, d, r, n, y, f, j, M, I, F]), $.useEffect(() => {
    x.current = !1;
  }, [w, d]), $.useMemo(() => f ? {
    reference: {
      onKeyDown: I,
      [wd[v]]: (N) => {
        m && (o.emit("dismiss", {
          type: "referencePress",
          data: {
            returnFocus: !1
          }
        }), n(!1, N.nativeEvent));
      }
    },
    floating: {
      onKeyDown: I,
      [Od[d]]: () => {
        x.current = !0;
      }
    }
  } : {}, [f, o, m, d, v, n, I]);
}
function Nn(e) {
  var t;
  e === void 0 && (e = {});
  const {
    open: r = !1,
    onOpenChange: n,
    nodeId: o
  } = e, [a, i] = $.useState(null), s = ((t = e.elements) == null ? void 0 : t.reference) || a, l = td(e), c = jn(), f = jt((_, w) => {
    _ && (p.current.openEvent = w), n == null || n(_, w);
  }), u = $.useRef(null), p = $.useRef({}), d = $.useState(() => ad())[0], m = Wi(), v = $.useCallback((_) => {
    const w = ce(_) ? {
      getBoundingClientRect: () => _.getBoundingClientRect(),
      contextElement: _
    } : _;
    l.refs.setReference(w);
  }, [l.refs]), y = $.useCallback((_) => {
    (ce(_) || _ === null) && (u.current = _, i(_)), (ce(l.refs.reference.current) || l.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    _ !== null && !ce(_)) && l.refs.setReference(_);
  }, [l.refs]), h = $.useMemo(() => ({
    ...l.refs,
    setReference: y,
    setPositionReference: v,
    domReference: u
  }), [l.refs, y, v]), g = $.useMemo(() => ({
    ...l.elements,
    domReference: s
  }), [l.elements, s]), O = $.useMemo(() => ({
    ...l,
    refs: h,
    elements: g,
    dataRef: p,
    nodeId: o,
    floatingId: m,
    events: d,
    open: r,
    onOpenChange: f
  }), [l, o, m, d, r, f, h, g]);
  return me(() => {
    const _ = c == null ? void 0 : c.nodesRef.current.find((w) => w.id === o);
    _ && (_.context = O);
  }), $.useMemo(() => ({
    ...l,
    context: O,
    refs: h,
    elements: g
  }), [l, h, g, O]);
}
function xd(e, t) {
  t === void 0 && (t = {});
  const {
    open: r,
    onOpenChange: n,
    dataRef: o,
    events: a,
    refs: i,
    elements: {
      floating: s,
      domReference: l
    }
  } = e, {
    enabled: c = !0,
    keyboardOnly: f = !0
  } = t, u = $.useRef(""), p = $.useRef(!1), d = $.useRef();
  return $.useEffect(() => {
    if (!c)
      return;
    const v = Oe(s).defaultView || window;
    function y() {
      !r && Ui(l) && l === yd(Oe(l)) && (p.current = !0);
    }
    return v.addEventListener("blur", y), () => {
      v.removeEventListener("blur", y);
    };
  }, [s, l, r, c]), $.useEffect(() => {
    if (!c)
      return;
    function m(v) {
      (v.type === "referencePress" || v.type === "escapeKey") && (p.current = !0);
    }
    return a.on("dismiss", m), () => {
      a.off("dismiss", m);
    };
  }, [a, c]), $.useEffect(() => () => {
    clearTimeout(d.current);
  }, []), $.useMemo(() => c ? {
    reference: {
      onPointerDown(m) {
        let {
          pointerType: v
        } = m;
        u.current = v, p.current = !!(v && f);
      },
      onMouseLeave() {
        p.current = !1;
      },
      onFocus(m) {
        var v;
        p.current || m.type === "focus" && ((v = o.current.openEvent) == null ? void 0 : v.type) === "mousedown" && Nt(o.current.openEvent, l) || n(!0, m.nativeEvent);
      },
      onBlur(m) {
        p.current = !1;
        const v = m.relatedTarget, y = ce(v) && v.hasAttribute(Ki("focus-guard")) && v.getAttribute("data-type") === "outside";
        d.current = setTimeout(() => {
          on(i.floating.current, v) || on(l, v) || y || n(!1, m.nativeEvent);
        });
      }
    }
  } : {}, [c, f, l, i, o, n]);
}
function Wr(e, t, r) {
  const n = /* @__PURE__ */ new Map();
  return {
    ...r === "floating" && {
      tabIndex: -1
    },
    ...e,
    ...t.map((o) => o ? o[r] : null).concat(e).reduce((o, a) => (a && Object.entries(a).forEach((i) => {
      let [s, l] = i;
      if (s.indexOf("on") === 0) {
        if (n.has(s) || n.set(s, []), typeof l == "function") {
          var c;
          (c = n.get(s)) == null || c.push(l), o[s] = function() {
            for (var f, u = arguments.length, p = new Array(u), d = 0; d < u; d++)
              p[d] = arguments[d];
            return (f = n.get(s)) == null ? void 0 : f.map((m) => m(...p)).find((m) => m !== void 0);
          };
        }
      } else
        o[s] = l;
    }), o), {})
  };
}
function Ed(e) {
  e === void 0 && (e = []);
  const t = e, r = $.useCallback(
    (a) => Wr(a, e, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), n = $.useCallback(
    (a) => Wr(a, e, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    t
  ), o = $.useCallback(
    (a) => Wr(a, e, "item"),
    // Granularly check for `item` changes, because the `getItemProps` getter
    // should be as referentially stable as possible since it may be passed as
    // a prop to many components. All `item` key values must therefore be
    // memoized.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    e.map((a) => a == null ? void 0 : a.item)
  );
  return $.useMemo(() => ({
    getReferenceProps: r,
    getFloatingProps: n,
    getItemProps: o
  }), [r, n, o]);
}
function Sd(e, t) {
  t === void 0 && (t = {});
  const {
    open: r,
    floatingId: n
  } = e, {
    enabled: o = !0,
    role: a = "dialog"
  } = t, i = Wi();
  return $.useMemo(() => {
    const s = {
      id: n,
      role: a
    };
    return o ? a === "tooltip" ? {
      reference: {
        "aria-describedby": r ? n : void 0
      },
      floating: s
    } : {
      reference: {
        "aria-expanded": r ? "true" : "false",
        "aria-haspopup": a === "alertdialog" ? "dialog" : a,
        "aria-controls": r ? n : void 0,
        ...a === "listbox" && {
          role: "combobox"
        },
        ...a === "menu" && {
          id: i
        }
      },
      floating: {
        ...s,
        ...a === "menu" && {
          "aria-labelledby": i
        }
      }
    } : {};
  }, [o, a, r, n, i]);
}
function Ji({
  opened: e,
  floating: t,
  position: r,
  positionDependencies: n
}) {
  const [o, a] = z(0);
  B(() => {
    if (t.refs.reference.current && t.refs.floating.current)
      return Zu(
        t.refs.reference.current,
        t.refs.floating.current,
        t.update
      );
  }, [
    t.refs.reference.current,
    t.refs.floating.current,
    e,
    o,
    r
  ]), $e(() => {
    t.update();
  }, n), $e(() => {
    a((i) => i + 1);
  }, [e]);
}
function Rd(e, t) {
  var r, n, o, a;
  const i = [Di(e.offset)];
  return (r = e.middlewares) != null && r.shift && i.push(En({ limiter: Du() })), (n = e.middlewares) != null && n.flip && i.push(Ni()), (o = e.middlewares) != null && o.inline && i.push(Ii()), i.push(Hi({ element: e.arrowRef, padding: e.arrowOffset })), ((a = e.middlewares) != null && a.size || e.width === "target") && i.push(
    Au({
      apply({ rects: s, availableWidth: l, availableHeight: c }) {
        var f, u, p;
        const m = (u = (f = t().refs.floating.current) == null ? void 0 : f.style) != null ? u : {};
        (p = e.middlewares) != null && p.size && Object.assign(m, {
          maxWidth: `${l}px`,
          maxHeight: `${c}px`
        }), e.width === "target" && Object.assign(m, {
          width: `${s.reference.width}px`
        });
      }
    })
  ), i;
}
function Cd(e) {
  const [t, r] = Yc({
    value: e.opened,
    defaultValue: e.defaultOpened,
    finalValue: !1,
    onChange: e.onChange
  }), n = () => {
    var i;
    t && ((i = e.onClose) == null || i.call(e), r(!1));
  }, o = () => {
    var i, s;
    t ? ((i = e.onClose) == null || i.call(e), r(!1)) : ((s = e.onOpen) == null || s.call(e), r(!0));
  }, a = Nn({
    placement: e.position,
    middleware: Rd(e, () => a)
  });
  return Ji({
    opened: e.opened,
    position: e.position,
    positionDependencies: e.positionDependencies || [],
    floating: a
  }), $e(() => {
    var i;
    (i = e.onPositionChange) == null || i.call(e, a.placement);
  }, [a.placement]), $e(() => {
    var i, s;
    e.opened ? (s = e.onOpen) == null || s.call(e) : (i = e.onClose) == null || i.call(e);
  }, [e.opened]), {
    floating: a,
    controlled: typeof e.opened == "boolean",
    opened: t,
    onClose: n,
    onToggle: o
  };
}
const [jd, Qi] = cn(
  "Popover component was not found in the tree"
);
var Nd = Object.defineProperty, Td = Object.defineProperties, Id = Object.getOwnPropertyDescriptors, Bt = Object.getOwnPropertySymbols, Zi = Object.prototype.hasOwnProperty, es = Object.prototype.propertyIsEnumerable, Yo = (e, t, r) => t in e ? Nd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, bt = (e, t) => {
  for (var r in t || (t = {}))
    Zi.call(t, r) && Yo(e, r, t[r]);
  if (Bt)
    for (var r of Bt(t))
      es.call(t, r) && Yo(e, r, t[r]);
  return e;
}, Dd = (e, t) => Td(e, Id(t)), Ad = (e, t) => {
  var r = {};
  for (var n in e)
    Zi.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Bt)
    for (var n of Bt(e))
      t.indexOf(n) < 0 && es.call(e, n) && (r[n] = e[n]);
  return r;
};
const Md = {
  refProp: "ref",
  popupType: "dialog"
}, ts = ae((e, t) => {
  const r = k(
    "PopoverTarget",
    Md,
    e
  ), { children: n, refProp: o, popupType: a } = r, i = Ad(r, ["children", "refProp", "popupType"]);
  if (!pt(n))
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const s = i, l = Qi(), c = mt(l.reference, n.ref, t), f = l.withRoles ? {
    "aria-haspopup": a,
    "aria-expanded": l.opened,
    "aria-controls": l.getDropdownId(),
    id: l.getTargetId()
  } : {};
  return Ze(n, bt(Dd(bt(bt(bt({}, s), f), l.targetProps), {
    className: ye(l.targetProps.className, s.className, n.props.className),
    [o]: c
  }), l.controlled ? null : { onClick: l.onToggle }));
});
ts.displayName = "@mantine/core/PopoverTarget";
var Ld = { dropdown: "m-38a85659", arrow: "m-a31dc6c1" };
const rs = Ld;
var Ko = Object.getOwnPropertySymbols, Fd = Object.prototype.hasOwnProperty, kd = Object.prototype.propertyIsEnumerable, Vd = (e, t) => {
  var r = {};
  for (var n in e)
    Fd.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Ko)
    for (var n of Ko(e))
      t.indexOf(n) < 0 && kd.call(e, n) && (r[n] = e[n]);
  return r;
};
function zd(e) {
  const t = document.createElement("div");
  return t.setAttribute("data-portal", "true"), typeof e.className == "string" && t.classList.add(...e.className.split(" ")), typeof e.style == "object" && Object.assign(t.style, e.style), typeof e.id == "string" && t.setAttribute("id", e.id), t;
}
const Hd = {}, ns = oe((e, t) => {
  const r = k("Portal", Hd, e), { children: n, target: o } = r, a = Vd(r, ["children", "target"]), [i, s] = z(!1), l = H(null);
  return yr(() => (s(!0), l.current = o ? typeof o == "string" ? document.querySelector(o) : o : zd(a), ii(t, l.current), !o && l.current && document.body.appendChild(l.current), () => {
    !o && l.current && document.body.removeChild(l.current);
  }), [o]), !i || !l.current ? null : $l(/* @__PURE__ */ P.createElement(P.Fragment, null, n), l.current);
});
ns.displayName = "@mantine/core/Portal";
var Bd = Object.defineProperty, Wt = Object.getOwnPropertySymbols, os = Object.prototype.hasOwnProperty, as = Object.prototype.propertyIsEnumerable, Xo = (e, t, r) => t in e ? Bd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Wd = (e, t) => {
  for (var r in t || (t = {}))
    os.call(t, r) && Xo(e, r, t[r]);
  if (Wt)
    for (var r of Wt(t))
      as.call(t, r) && Xo(e, r, t[r]);
  return e;
}, Gd = (e, t) => {
  var r = {};
  for (var n in e)
    os.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Wt)
    for (var n of Wt(e))
      t.indexOf(n) < 0 && as.call(e, n) && (r[n] = e[n]);
  return r;
};
function Or(e) {
  var t = e, { withinPortal: r = !0, children: n } = t, o = Gd(t, ["withinPortal", "children"]);
  return r ? /* @__PURE__ */ P.createElement(ns, Wd({}, o), n) : /* @__PURE__ */ P.createElement(P.Fragment, null, n);
}
Or.displayName = "@mantine/core/OptionalPortal";
var Ud = Object.defineProperty, Yd = Object.defineProperties, Kd = Object.getOwnPropertyDescriptors, qo = Object.getOwnPropertySymbols, Xd = Object.prototype.hasOwnProperty, qd = Object.prototype.propertyIsEnumerable, Jo = (e, t, r) => t in e ? Ud(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, st = (e, t) => {
  for (var r in t || (t = {}))
    Xd.call(t, r) && Jo(e, r, t[r]);
  if (qo)
    for (var r of qo(t))
      qd.call(t, r) && Jo(e, r, t[r]);
  return e;
}, lt = (e, t) => Yd(e, Kd(t));
const ct = (e) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${b(e === "bottom" ? 10 : -10)})` },
  transitionProperty: "transform, opacity"
}), wt = {
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
    out: { opacity: 0, transform: `translateY(-${b(20)}) skew(-10deg, -5deg)` },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: `translateY(${b(20)}) skew(-10deg, -5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${b(20)}) rotate(-5deg)` },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: `translateY(${b(20)}) rotate(5deg)` },
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
  pop: lt(st({}, ct("bottom")), {
    common: { transformOrigin: "center center" }
  }),
  "pop-bottom-left": lt(st({}, ct("bottom")), {
    common: { transformOrigin: "bottom left" }
  }),
  "pop-bottom-right": lt(st({}, ct("bottom")), {
    common: { transformOrigin: "bottom right" }
  }),
  "pop-top-left": lt(st({}, ct("top")), {
    common: { transformOrigin: "top left" }
  }),
  "pop-top-right": lt(st({}, ct("top")), {
    common: { transformOrigin: "top right" }
  })
};
var Jd = Object.defineProperty, Qo = Object.getOwnPropertySymbols, Qd = Object.prototype.hasOwnProperty, Zd = Object.prototype.propertyIsEnumerable, Zo = (e, t, r) => t in e ? Jd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ue = (e, t) => {
  for (var r in t || (t = {}))
    Qd.call(t, r) && Zo(e, r, t[r]);
  if (Qo)
    for (var r of Qo(t))
      Zd.call(t, r) && Zo(e, r, t[r]);
  return e;
};
const ea = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function ep({
  transition: e,
  state: t,
  duration: r,
  timingFunction: n
}) {
  const o = {
    transitionDuration: `${r}ms`,
    transitionTimingFunction: n
  };
  return typeof e == "string" ? e in wt ? Ue(Ue(Ue({
    transitionProperty: wt[e].transitionProperty
  }, o), wt[e].common), wt[e][ea[t]]) : {} : Ue(Ue(Ue({
    transitionProperty: e.transitionProperty
  }, o), e.common), e[ea[t]]);
}
function tp({
  duration: e,
  exitDuration: t,
  timingFunction: r,
  mounted: n,
  onEnter: o,
  onExit: a,
  onEntered: i,
  onExited: s
}) {
  const l = Se(), c = li(), f = l.respectReducedMotion ? c : !1, [u, p] = z(f ? 0 : e), [d, m] = z(n ? "entered" : "exited"), v = H(-1), y = (h) => {
    const g = h ? o : a, O = h ? i : s;
    m(h ? "pre-entering" : "pre-exiting"), window.clearTimeout(v.current);
    const _ = f ? 0 : h ? e : t;
    if (p(_), _ === 0)
      typeof g == "function" && g(), typeof O == "function" && O(), m(h ? "entered" : "exited");
    else {
      const w = window.setTimeout(() => {
        typeof g == "function" && g(), m(h ? "entering" : "exiting");
      }, 10);
      v.current = window.setTimeout(() => {
        window.clearTimeout(w), typeof O == "function" && O(), m(h ? "entered" : "exited");
      }, _);
    }
  };
  return $e(() => {
    y(n);
  }, [n]), B(() => () => window.clearTimeout(v.current), []), {
    transitionDuration: u,
    transitionStatus: d,
    transitionTimingFunction: r || "ease"
  };
}
function Tn({
  keepMounted: e,
  transition: t = "fade",
  duration: r = 250,
  exitDuration: n = r,
  mounted: o,
  children: a,
  timingFunction: i = "ease",
  onExit: s,
  onEntered: l,
  onEnter: c,
  onExited: f
}) {
  const { transitionDuration: u, transitionStatus: p, transitionTimingFunction: d } = tp({
    mounted: o,
    exitDuration: n,
    duration: r,
    timingFunction: i,
    onExit: s,
    onEntered: l,
    onEnter: c,
    onExited: f
  });
  return u === 0 ? o ? /* @__PURE__ */ P.createElement(P.Fragment, null, a({})) : e ? a({ display: "none" }) : null : p === "exited" ? e ? a({ display: "none" }) : null : /* @__PURE__ */ P.createElement(P.Fragment, null, a(
    ep({
      transition: t,
      duration: u,
      state: p,
      timingFunction: d
    })
  ));
}
Tn.displayName = "@mantine/core/Transition";
function is({
  children: e,
  active: t = !0,
  refProp: r = "ref"
}) {
  const n = Wc(t), o = mt(n, e == null ? void 0 : e.ref);
  return pt(e) ? Ze(e, { [r]: o }) : e;
}
is.displayName = "@mantine/core/FocusTrap";
var rp = Object.defineProperty, np = Object.defineProperties, op = Object.getOwnPropertyDescriptors, ta = Object.getOwnPropertySymbols, ap = Object.prototype.hasOwnProperty, ip = Object.prototype.propertyIsEnumerable, ra = (e, t, r) => t in e ? rp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, _e = (e, t) => {
  for (var r in t || (t = {}))
    ap.call(t, r) && ra(e, r, t[r]);
  if (ta)
    for (var r of ta(t))
      ip.call(t, r) && ra(e, r, t[r]);
  return e;
}, Ot = (e, t) => np(e, op(t));
function na(e, t, r, n) {
  return e === "center" || n === "center" ? { top: t } : e === "end" ? { bottom: r } : e === "start" ? { top: r } : {};
}
function oa(e, t, r, n, o) {
  return e === "center" || n === "center" ? { left: t } : e === "end" ? { [o === "ltr" ? "right" : "left"]: r } : e === "start" ? { [o === "ltr" ? "left" : "right"]: r } : {};
}
const sp = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function lp({
  position: e,
  arrowSize: t,
  arrowOffset: r,
  arrowRadius: n,
  arrowPosition: o,
  arrowX: a,
  arrowY: i,
  dir: s
}) {
  const [l, c = "center"] = e.split("-"), f = {
    width: b(t),
    height: b(t),
    transform: "rotate(45deg)",
    position: "absolute",
    [sp[l]]: b(n)
  }, u = b(-t / 2);
  return l === "left" ? Ot(_e(_e({}, f), na(c, i, r, o)), {
    right: u,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent"
  }) : l === "right" ? Ot(_e(_e({}, f), na(c, i, r, o)), {
    left: u,
    borderRightColor: "transparent",
    borderTopColor: "transparent"
  }) : l === "top" ? Ot(_e(_e({}, f), oa(c, a, r, o, s)), {
    bottom: u,
    borderTopColor: "transparent",
    borderLeftColor: "transparent"
  }) : l === "bottom" ? Ot(_e(_e({}, f), oa(c, a, r, o, s)), {
    top: u,
    borderBottomColor: "transparent",
    borderRightColor: "transparent"
  }) : {};
}
var cp = Object.defineProperty, fp = Object.defineProperties, up = Object.getOwnPropertyDescriptors, Gt = Object.getOwnPropertySymbols, ss = Object.prototype.hasOwnProperty, ls = Object.prototype.propertyIsEnumerable, aa = (e, t, r) => t in e ? cp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Gr = (e, t) => {
  for (var r in t || (t = {}))
    ss.call(t, r) && aa(e, r, t[r]);
  if (Gt)
    for (var r of Gt(t))
      ls.call(t, r) && aa(e, r, t[r]);
  return e;
}, dp = (e, t) => fp(e, up(t)), pp = (e, t) => {
  var r = {};
  for (var n in e)
    ss.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Gt)
    for (var n of Gt(e))
      t.indexOf(n) < 0 && ls.call(e, n) && (r[n] = e[n]);
  return r;
};
const In = oe(
  (e, t) => {
    var r = e, {
      position: n,
      arrowSize: o,
      arrowOffset: a,
      arrowRadius: i,
      arrowPosition: s,
      visible: l,
      arrowX: c,
      arrowY: f,
      style: u
    } = r, p = pp(r, [
      "position",
      "arrowSize",
      "arrowOffset",
      "arrowRadius",
      "arrowPosition",
      "visible",
      "arrowX",
      "arrowY",
      "style"
    ]);
    const { dir: d } = _n();
    return l ? /* @__PURE__ */ P.createElement(
      "div",
      dp(Gr({}, p), {
        ref: t,
        style: Gr(Gr({}, u), lp({
          position: n,
          arrowSize: o,
          arrowOffset: a,
          arrowRadius: i,
          arrowPosition: s,
          dir: d,
          arrowX: c,
          arrowY: f
        }))
      })
    ) : null;
  }
);
In.displayName = "@mantine/core/FloatingArrow";
var mp = Object.defineProperty, vp = Object.defineProperties, gp = Object.getOwnPropertyDescriptors, Ut = Object.getOwnPropertySymbols, cs = Object.prototype.hasOwnProperty, fs = Object.prototype.propertyIsEnumerable, ia = (e, t, r) => t in e ? mp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ne = (e, t) => {
  for (var r in t || (t = {}))
    cs.call(t, r) && ia(e, r, t[r]);
  if (Ut)
    for (var r of Ut(t))
      fs.call(t, r) && ia(e, r, t[r]);
  return e;
}, Pt = (e, t) => vp(e, gp(t)), yp = (e, t) => {
  var r = {};
  for (var n in e)
    cs.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Ut)
    for (var n of Ut(e))
      t.indexOf(n) < 0 && fs.call(e, n) && (r[n] = e[n]);
  return r;
};
const hp = {}, Dn = ae((e, t) => {
  var r, n, o, a, i;
  const s = k("PopoverDropdown", hp, e), l = s, {
    className: c,
    style: f,
    vars: u,
    children: p,
    onKeyDownCapture: d,
    variant: m,
    classNames: v,
    styles: y
  } = l, h = yp(l, [
    "className",
    "style",
    "vars",
    "children",
    "onKeyDownCapture",
    "variant",
    "classNames",
    "styles"
  ]), g = Qi(), O = Lc({
    opened: g.opened,
    shouldReturnFocus: g.returnFocus
  }), _ = g.withRoles ? {
    "aria-labelledby": g.getTargetId(),
    id: g.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {}, w = mt(t, g.floating);
  return g.disabled ? null : /* @__PURE__ */ P.createElement(Or, Pt(Ne({}, g.portalProps), { withinPortal: g.withinPortal }), /* @__PURE__ */ P.createElement(
    Tn,
    Pt(Ne({
      mounted: g.opened
    }, g.transitionProps), {
      transition: ((r = g.transitionProps) == null ? void 0 : r.transition) || "fade",
      duration: (o = (n = g.transitionProps) == null ? void 0 : n.duration) != null ? o : 150,
      keepMounted: g.keepMounted,
      exitDuration: typeof ((a = g.transitionProps) == null ? void 0 : a.exitDuration) == "number" ? g.transitionProps.exitDuration : (i = g.transitionProps) == null ? void 0 : i.duration
    }),
    (x) => {
      var j, M;
      return /* @__PURE__ */ P.createElement(is, { active: g.trapFocus }, /* @__PURE__ */ P.createElement(
        V,
        Ne(Pt(Ne(Ne({}, _), h), {
          variant: m,
          ref: w,
          onKeyDownCapture: zl(g.onClose, {
            active: g.closeOnEscape,
            onTrigger: O,
            onKeyDown: d
          }),
          "data-position": g.placement
        }), g.getStyles("dropdown", {
          className: c,
          props: s,
          classNames: v,
          styles: y,
          style: [
            Pt(Ne({}, x), {
              zIndex: g.zIndex,
              top: (j = g.y) != null ? j : 0,
              left: (M = g.x) != null ? M : 0,
              width: g.width === "target" ? void 0 : b(g.width)
            }),
            f
          ]
        })),
        p,
        /* @__PURE__ */ P.createElement(
          In,
          Ne({
            ref: g.arrowRef,
            arrowX: g.arrowX,
            arrowY: g.arrowY,
            visible: g.withArrow,
            position: g.placement,
            arrowSize: g.arrowSize,
            arrowRadius: g.arrowRadius,
            arrowOffset: g.arrowOffset,
            arrowPosition: g.arrowPosition
          }, g.getStyles("arrow", {
            props: s,
            classNames: v,
            styles: y
          }))
        )
      ));
    }
  ));
});
Dn.classes = rs;
Dn.displayName = "@mantine/core/PopoverDropdown";
function us(e, t) {
  if (e === "rtl" && (t.includes("right") || t.includes("left"))) {
    const [r, n] = t.split("-"), o = r === "right" ? "left" : "right";
    return n === void 0 ? o : `${o}-${n}`;
  }
  return t;
}
var sa = Object.getOwnPropertySymbols, _p = Object.prototype.hasOwnProperty, bp = Object.prototype.propertyIsEnumerable, wp = (e, t) => {
  var r = {};
  for (var n in e)
    _p.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && sa)
    for (var n of sa(e))
      t.indexOf(n) < 0 && bp.call(e, n) && (r[n] = e[n]);
  return r;
};
const Op = {
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
  zIndex: fn("popover"),
  __staticSelector: "Popover",
  width: "max-content"
}, Pp = (e, { radius: t, shadow: r }) => ({
  dropdown: {
    "--popover-radius": t === void 0 ? void 0 : Le(t),
    "--popover-shadow": qa(r)
  }
});
function Ve(e) {
  var t, r, n, o, a, i;
  const s = k("Popover", Op, e), l = s, {
    children: c,
    position: f,
    offset: u,
    onPositionChange: p,
    positionDependencies: d,
    opened: m,
    transitionProps: v,
    width: y,
    middlewares: h,
    withArrow: g,
    arrowSize: O,
    arrowOffset: _,
    arrowRadius: w,
    arrowPosition: x,
    unstyled: j,
    classNames: M,
    styles: I,
    closeOnClickOutside: F,
    withinPortal: N,
    portalProps: D,
    closeOnEscape: R,
    clickOutsideEvents: E,
    trapFocus: S,
    onClose: C,
    onOpen: L,
    onChange: T,
    zIndex: W,
    radius: ie,
    shadow: se,
    id: le,
    defaultOpened: ee,
    __staticSelector: J,
    withRoles: tt,
    disabled: ze,
    returnFocus: Y,
    variant: Re,
    keepMounted: rt,
    vars: He
  } = l, nt = wp(l, [
    "children",
    "position",
    "offset",
    "onPositionChange",
    "positionDependencies",
    "opened",
    "transitionProps",
    "width",
    "middlewares",
    "withArrow",
    "arrowSize",
    "arrowOffset",
    "arrowRadius",
    "arrowPosition",
    "unstyled",
    "classNames",
    "styles",
    "closeOnClickOutside",
    "withinPortal",
    "portalProps",
    "closeOnEscape",
    "clickOutsideEvents",
    "trapFocus",
    "onClose",
    "onOpen",
    "onChange",
    "zIndex",
    "radius",
    "shadow",
    "id",
    "defaultOpened",
    "__staticSelector",
    "withRoles",
    "disabled",
    "returnFocus",
    "variant",
    "keepMounted",
    "vars"
  ]), Be = U({
    name: J,
    props: s,
    classes: rs,
    classNames: M,
    styles: I,
    unstyled: j,
    rootSelector: "dropdown",
    vars: He,
    varsResolver: Pp
  }), Ce = H(null), [zn, pl] = z(null), [ml, vl] = z(null), { dir: gl } = _n(), Hn = ai(le), K = Cd({
    middlewares: h,
    width: y,
    position: us(gl, f),
    offset: typeof u == "number" ? u + (g ? O / 2 : 0) : u,
    arrowRef: Ce,
    arrowOffset: _,
    onPositionChange: p,
    positionDependencies: d,
    opened: m,
    defaultOpened: ee,
    onChange: T,
    onOpen: L,
    onClose: C
  });
  Ic(() => F && K.onClose(), E, [
    zn,
    ml
  ]);
  const yl = Q(
    (ot) => {
      pl(ot), K.floating.refs.setReference(ot);
    },
    [K.floating.refs.setReference]
  ), hl = Q(
    (ot) => {
      vl(ot), K.floating.refs.setFloating(ot);
    },
    [K.floating.refs.setFloating]
  );
  return /* @__PURE__ */ P.createElement(
    jd,
    {
      value: {
        returnFocus: Y,
        disabled: ze,
        controlled: K.controlled,
        reference: yl,
        floating: hl,
        x: K.floating.x,
        y: K.floating.y,
        arrowX: (n = (r = (t = K.floating) == null ? void 0 : t.middlewareData) == null ? void 0 : r.arrow) == null ? void 0 : n.x,
        arrowY: (i = (a = (o = K.floating) == null ? void 0 : o.middlewareData) == null ? void 0 : a.arrow) == null ? void 0 : i.y,
        opened: K.opened,
        arrowRef: Ce,
        transitionProps: v,
        width: y,
        withArrow: g,
        arrowSize: O,
        arrowOffset: _,
        arrowRadius: w,
        arrowPosition: x,
        placement: K.floating.placement,
        trapFocus: S,
        withinPortal: N,
        portalProps: D,
        zIndex: W,
        radius: ie,
        shadow: se,
        closeOnEscape: R,
        onClose: K.onClose,
        onToggle: K.onToggle,
        getTargetId: () => `${Hn}-target`,
        getDropdownId: () => `${Hn}-dropdown`,
        withRoles: tt,
        targetProps: nt,
        __staticSelector: J,
        classNames: M,
        styles: I,
        unstyled: j,
        variant: Re,
        keepMounted: rt,
        getStyles: Be
      }
    },
    c
  );
}
Ve.Target = ts;
Ve.Dropdown = Dn;
Ve.displayName = "@mantine/core/Popover";
Ve.extend = (e) => e;
var $p = { root: "m-8d3f4000", loader: "m-302b9fb1", group: "m-1a0f1b21" };
const Pr = $p;
var xp = Object.defineProperty, Ep = Object.defineProperties, Sp = Object.getOwnPropertyDescriptors, Yt = Object.getOwnPropertySymbols, ds = Object.prototype.hasOwnProperty, ps = Object.prototype.propertyIsEnumerable, la = (e, t, r) => t in e ? xp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ca = (e, t) => {
  for (var r in t || (t = {}))
    ds.call(t, r) && la(e, r, t[r]);
  if (Yt)
    for (var r of Yt(t))
      ps.call(t, r) && la(e, r, t[r]);
  return e;
}, Rp = (e, t) => Ep(e, Sp(t)), Cp = (e, t) => {
  var r = {};
  for (var n in e)
    ds.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Yt)
    for (var n of Yt(e))
      t.indexOf(n) < 0 && ps.call(e, n) && (r[n] = e[n]);
  return r;
};
const fa = {
  orientation: "horizontal"
}, jp = (e, { borderWidth: t }) => ({
  group: { "--ai-border-width": b(t) }
}), An = ae((e, t) => {
  const r = k("ActionIconGroup", fa, e), n = k("ActionIconGroup", fa, e), {
    className: o,
    style: a,
    classNames: i,
    styles: s,
    unstyled: l,
    orientation: c,
    vars: f,
    borderWidth: u,
    variant: p
  } = n, d = Cp(n, [
    "className",
    "style",
    "classNames",
    "styles",
    "unstyled",
    "orientation",
    "vars",
    "borderWidth",
    "variant"
  ]), m = U({
    name: "ActionIconGroup",
    props: r,
    classes: Pr,
    className: o,
    style: a,
    classNames: i,
    styles: s,
    unstyled: l,
    vars: f,
    varsResolver: jp,
    rootSelector: "group"
  });
  return /* @__PURE__ */ P.createElement(
    V,
    ca(Rp(ca({}, m("group")), {
      ref: t,
      variant: p,
      mod: { "data-orientation": c },
      role: "group"
    }), d)
  );
});
An.classes = Pr;
An.displayName = "@mantine/core/ActionIconGroup";
var Np = { root: "m-5ae2e3c", barsLoader: "m-7a2bd4cd", bar: "m-870bb79", "bars-loader-animation": "m-5d2b3b9d", dotsLoader: "m-4e3f22d7", dot: "m-870c4af", "loader-dots-animation": "m-aac34a1", ovalLoader: "m-b34414df", "oval-loader-animation": "m-f8e89c4b" };
const te = Np;
var Tp = Object.defineProperty, Ip = Object.defineProperties, Dp = Object.getOwnPropertyDescriptors, Kt = Object.getOwnPropertySymbols, ms = Object.prototype.hasOwnProperty, vs = Object.prototype.propertyIsEnumerable, ua = (e, t, r) => t in e ? Tp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ap = (e, t) => {
  for (var r in t || (t = {}))
    ms.call(t, r) && ua(e, r, t[r]);
  if (Kt)
    for (var r of Kt(t))
      vs.call(t, r) && ua(e, r, t[r]);
  return e;
}, Mp = (e, t) => Ip(e, Dp(t)), Lp = (e, t) => {
  var r = {};
  for (var n in e)
    ms.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Kt)
    for (var n of Kt(e))
      t.indexOf(n) < 0 && vs.call(e, n) && (r[n] = e[n]);
  return r;
};
const Fp = oe((e, t) => {
  var r = e, { className: n } = r, o = Lp(r, ["className"]);
  return /* @__PURE__ */ P.createElement(V, Mp(Ap({ component: "span", className: ye(te.barsLoader, n) }, o), { ref: t }), /* @__PURE__ */ P.createElement("span", { className: te.bar }), /* @__PURE__ */ P.createElement("span", { className: te.bar }), /* @__PURE__ */ P.createElement("span", { className: te.bar }));
});
var kp = Object.defineProperty, Vp = Object.defineProperties, zp = Object.getOwnPropertyDescriptors, Xt = Object.getOwnPropertySymbols, gs = Object.prototype.hasOwnProperty, ys = Object.prototype.propertyIsEnumerable, da = (e, t, r) => t in e ? kp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Hp = (e, t) => {
  for (var r in t || (t = {}))
    gs.call(t, r) && da(e, r, t[r]);
  if (Xt)
    for (var r of Xt(t))
      ys.call(t, r) && da(e, r, t[r]);
  return e;
}, Bp = (e, t) => Vp(e, zp(t)), Wp = (e, t) => {
  var r = {};
  for (var n in e)
    gs.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Xt)
    for (var n of Xt(e))
      t.indexOf(n) < 0 && ys.call(e, n) && (r[n] = e[n]);
  return r;
};
const Gp = oe((e, t) => {
  var r = e, { className: n } = r, o = Wp(r, ["className"]);
  return /* @__PURE__ */ P.createElement(V, Bp(Hp({ component: "span", className: ye(te.ovalLoader, n) }, o), { ref: t }));
});
var Up = Object.defineProperty, Yp = Object.defineProperties, Kp = Object.getOwnPropertyDescriptors, qt = Object.getOwnPropertySymbols, hs = Object.prototype.hasOwnProperty, _s = Object.prototype.propertyIsEnumerable, pa = (e, t, r) => t in e ? Up(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Xp = (e, t) => {
  for (var r in t || (t = {}))
    hs.call(t, r) && pa(e, r, t[r]);
  if (qt)
    for (var r of qt(t))
      _s.call(t, r) && pa(e, r, t[r]);
  return e;
}, qp = (e, t) => Yp(e, Kp(t)), Jp = (e, t) => {
  var r = {};
  for (var n in e)
    hs.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && qt)
    for (var n of qt(e))
      t.indexOf(n) < 0 && _s.call(e, n) && (r[n] = e[n]);
  return r;
};
const Qp = oe((e, t) => {
  var r = e, { className: n } = r, o = Jp(r, ["className"]);
  return /* @__PURE__ */ P.createElement(V, qp(Xp({ component: "span", className: ye(te.dotsLoader, n) }, o), { ref: t }), /* @__PURE__ */ P.createElement("span", { className: te.dot }), /* @__PURE__ */ P.createElement("span", { className: te.dot }), /* @__PURE__ */ P.createElement("span", { className: te.dot }));
});
var Zp = Object.defineProperty, em = Object.defineProperties, tm = Object.getOwnPropertyDescriptors, Jt = Object.getOwnPropertySymbols, bs = Object.prototype.hasOwnProperty, ws = Object.prototype.propertyIsEnumerable, ma = (e, t, r) => t in e ? Zp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, $t = (e, t) => {
  for (var r in t || (t = {}))
    bs.call(t, r) && ma(e, r, t[r]);
  if (Jt)
    for (var r of Jt(t))
      ws.call(t, r) && ma(e, r, t[r]);
  return e;
}, va = (e, t) => em(e, tm(t)), rm = (e, t) => {
  var r = {};
  for (var n in e)
    bs.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Jt)
    for (var n of Jt(e))
      t.indexOf(n) < 0 && ws.call(e, n) && (r[n] = e[n]);
  return r;
};
const nm = {
  bars: Fp,
  oval: Gp,
  dots: Qp
}, om = {
  loaders: nm,
  type: "oval"
}, am = (e, { size: t, color: r }) => ({
  root: {
    "--loader-size": ue(t, "loader-size"),
    "--loader-color": r ? De(r, e) : void 0
  }
}), $r = ae((e, t) => {
  const r = k("Loader", om, e), n = r, {
    size: o,
    color: a,
    type: i,
    vars: s,
    className: l,
    style: c,
    classNames: f,
    styles: u,
    unstyled: p,
    loaders: d,
    variant: m,
    children: v
  } = n, y = rm(n, [
    "size",
    "color",
    "type",
    "vars",
    "className",
    "style",
    "classNames",
    "styles",
    "unstyled",
    "loaders",
    "variant",
    "children"
  ]), h = U({
    name: "Loader",
    props: r,
    classes: te,
    className: l,
    style: c,
    classNames: f,
    styles: u,
    unstyled: p,
    vars: s,
    varsResolver: am
  });
  return v ? /* @__PURE__ */ P.createElement(V, $t(va($t({}, h("root")), { ref: t }), y), v) : /* @__PURE__ */ P.createElement(
    V,
    $t(va($t({}, h("root")), {
      ref: t,
      component: d[i],
      variant: m,
      size: o
    }), y)
  );
});
$r.classes = te;
$r.displayName = "@mantine/core/Loader";
var im = Object.defineProperty, sm = Object.defineProperties, lm = Object.getOwnPropertyDescriptors, Qt = Object.getOwnPropertySymbols, Os = Object.prototype.hasOwnProperty, Ps = Object.prototype.propertyIsEnumerable, ga = (e, t, r) => t in e ? im(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, xt = (e, t) => {
  for (var r in t || (t = {}))
    Os.call(t, r) && ga(e, r, t[r]);
  if (Qt)
    for (var r of Qt(t))
      Ps.call(t, r) && ga(e, r, t[r]);
  return e;
}, ya = (e, t) => sm(e, lm(t)), cm = (e, t) => {
  var r = {};
  for (var n in e)
    Os.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Qt)
    for (var n of Qt(e))
      t.indexOf(n) < 0 && Ps.call(e, n) && (r[n] = e[n]);
  return r;
};
const fm = {}, um = (e, { size: t, radius: r, variant: n, gradient: o, color: a }) => {
  const i = e.variantColorResolver({
    color: a || e.primaryColor,
    theme: e,
    gradient: o,
    variant: n || "filled"
  });
  return {
    root: {
      "--ai-size": ue(t, "ai-size"),
      "--ai-radius": r === void 0 ? void 0 : Le(r),
      "--ai-bg": a || n ? i.background : void 0,
      "--ai-hover": a || n ? i.hover : void 0,
      "--ai-hover-color": a || n ? i.hoverColor : void 0,
      "--ai-color": a || n ? i.color : void 0,
      "--ai-bd": a || n ? i.border : void 0
    }
  };
}, Je = Fe((e, t) => {
  const r = k("ActionIcon", fm, e), n = r, {
    className: o,
    unstyled: a,
    variant: i,
    classNames: s,
    styles: l,
    style: c,
    loading: f,
    loaderProps: u,
    size: p,
    color: d,
    radius: m,
    __staticSelector: v,
    gradient: y,
    vars: h,
    children: g,
    disabled: O,
    "data-disabled": _
  } = n, w = cm(n, [
    "className",
    "unstyled",
    "variant",
    "classNames",
    "styles",
    "style",
    "loading",
    "loaderProps",
    "size",
    "color",
    "radius",
    "__staticSelector",
    "gradient",
    "vars",
    "children",
    "disabled",
    "data-disabled"
  ]), x = U({
    name: ["ActionIcon", v],
    props: r,
    className: o,
    style: c,
    classes: Pr,
    classNames: s,
    styles: l,
    unstyled: a,
    vars: h,
    varsResolver: um
  });
  return /* @__PURE__ */ P.createElement(
    hr,
    ya(xt(xt({}, x("root", { active: !O && !f && !_ })), w), {
      unstyled: a,
      variant: i,
      size: p,
      disabled: O || f,
      ref: t,
      mod: { loading: f, disabled: O || _ }
    }),
    f ? /* @__PURE__ */ P.createElement(
      $r,
      xt(ya(xt({}, x("loader")), {
        color: "var(--ai-color)",
        size: "calc(var(--ai-size) * 0.55)"
      }), u)
    ) : g
  );
});
Je.classes = Pr;
Je.displayName = "@mantine/core/ActionIcon";
Je.Group = An;
function dm(e) {
  return Ga.toArray(e).filter(Boolean);
}
var pm = { root: "m-4081bf90" };
const $s = pm;
var mm = Object.defineProperty, vm = Object.defineProperties, gm = Object.getOwnPropertyDescriptors, Zt = Object.getOwnPropertySymbols, xs = Object.prototype.hasOwnProperty, Es = Object.prototype.propertyIsEnumerable, ha = (e, t, r) => t in e ? mm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, _a = (e, t) => {
  for (var r in t || (t = {}))
    xs.call(t, r) && ha(e, r, t[r]);
  if (Zt)
    for (var r of Zt(t))
      Es.call(t, r) && ha(e, r, t[r]);
  return e;
}, ym = (e, t) => vm(e, gm(t)), hm = (e, t) => {
  var r = {};
  for (var n in e)
    xs.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && Zt)
    for (var n of Zt(e))
      t.indexOf(n) < 0 && Es.call(e, n) && (r[n] = e[n]);
  return r;
};
const _m = {
  preventGrowOverflow: !0,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
}, bm = (e, { grow: t, preventGrowOverflow: r, gap: n, align: o, justify: a, wrap: i }, { childWidth: s }) => ({
  root: {
    "--group-child-width": t && r ? s : void 0,
    "--group-gap": gr(n),
    "--group-align": o,
    "--group-justify": a,
    "--group-wrap": i
  }
}), Pe = ae((e, t) => {
  const r = k("Group", _m, e), n = r, {
    classNames: o,
    className: a,
    style: i,
    styles: s,
    unstyled: l,
    children: c,
    gap: f,
    align: u,
    justify: p,
    wrap: d,
    grow: m,
    preventGrowOverflow: v,
    vars: y,
    variant: h,
    __size: g
  } = n, O = hm(n, [
    "classNames",
    "className",
    "style",
    "styles",
    "unstyled",
    "children",
    "gap",
    "align",
    "justify",
    "wrap",
    "grow",
    "preventGrowOverflow",
    "vars",
    "variant",
    "__size"
  ]), _ = dm(c), w = _.length, x = gr(f ?? "md"), M = { childWidth: `calc(${100 / w}% - (${x} - ${x} / ${w}))` }, I = U({
    name: "Group",
    props: r,
    stylesCtx: M,
    className: a,
    style: i,
    classes: $s,
    classNames: o,
    styles: s,
    unstyled: l,
    vars: y,
    varsResolver: bm
  });
  return /* @__PURE__ */ P.createElement(
    V,
    _a(ym(_a({}, I("root")), {
      ref: t,
      variant: h,
      mod: { grow: m },
      size: g
    }), O),
    _
  );
});
Pe.classes = $s;
Pe.displayName = "@mantine/core/Group";
var wm = { root: "m-b6d8b162" };
const Ss = wm;
var Om = Object.defineProperty, Pm = Object.defineProperties, $m = Object.getOwnPropertyDescriptors, er = Object.getOwnPropertySymbols, Rs = Object.prototype.hasOwnProperty, Cs = Object.prototype.propertyIsEnumerable, ba = (e, t, r) => t in e ? Om(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, wa = (e, t) => {
  for (var r in t || (t = {}))
    Rs.call(t, r) && ba(e, r, t[r]);
  if (er)
    for (var r of er(t))
      Cs.call(t, r) && ba(e, r, t[r]);
  return e;
}, xm = (e, t) => Pm(e, $m(t)), Em = (e, t) => {
  var r = {};
  for (var n in e)
    Rs.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && er)
    for (var n of er(e))
      t.indexOf(n) < 0 && Cs.call(e, n) && (r[n] = e[n]);
  return r;
};
function Sm(e) {
  if (e === "start")
    return "start";
  if (e === "end" || e)
    return "end";
}
const Rm = {
  inherit: !1
}, Cm = (e, { variant: t, lineClamp: r, gradient: n, size: o, color: a }) => ({
  root: {
    "--text-fz": Xr(o),
    "--text-lh": Hl(o),
    "--text-gradient": t === "gradient" ? Qr(n, e) : void 0,
    "--text-line-clamp": typeof r == "number" ? r.toString() : void 0,
    "--text-color": a ? De(a, e) : void 0
  }
}), xr = Fe((e, t) => {
  const r = k("Text", Rm, e), n = r, {
    lineClamp: o,
    truncate: a,
    inline: i,
    inherit: s,
    gradient: l,
    span: c,
    __staticSelector: f,
    vars: u,
    className: p,
    style: d,
    classNames: m,
    styles: v,
    unstyled: y,
    variant: h,
    mod: g,
    size: O
  } = n, _ = Em(n, [
    "lineClamp",
    "truncate",
    "inline",
    "inherit",
    "gradient",
    "span",
    "__staticSelector",
    "vars",
    "className",
    "style",
    "classNames",
    "styles",
    "unstyled",
    "variant",
    "mod",
    "size"
  ]), w = U({
    name: ["Text", f],
    props: r,
    classes: Ss,
    className: p,
    style: d,
    classNames: m,
    styles: v,
    unstyled: y,
    vars: u,
    varsResolver: Cm
  });
  return /* @__PURE__ */ P.createElement(
    V,
    wa(xm(wa({}, w("root", { focusable: !0 })), {
      ref: t,
      component: c ? "span" : "p",
      variant: h,
      mod: [
        {
          "data-truncate": Sm(a),
          "data-line-clamp": typeof o == "number",
          "data-inline": i,
          "data-inherit": s
        },
        g
      ],
      size: O
    }), _)
  );
});
xr.classes = Ss;
xr.displayName = "@mantine/core/Text";
var jm = { root: "m-77c9d27d", inner: "m-80f1301b", label: "m-811560b9", section: "m-a74036a", loader: "m-a25b86ee", group: "m-80d6d844" };
const Er = jm;
var Nm = Object.defineProperty, Tm = Object.defineProperties, Im = Object.getOwnPropertyDescriptors, tr = Object.getOwnPropertySymbols, js = Object.prototype.hasOwnProperty, Ns = Object.prototype.propertyIsEnumerable, Oa = (e, t, r) => t in e ? Nm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Pa = (e, t) => {
  for (var r in t || (t = {}))
    js.call(t, r) && Oa(e, r, t[r]);
  if (tr)
    for (var r of tr(t))
      Ns.call(t, r) && Oa(e, r, t[r]);
  return e;
}, Dm = (e, t) => Tm(e, Im(t)), Am = (e, t) => {
  var r = {};
  for (var n in e)
    js.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && tr)
    for (var n of tr(e))
      t.indexOf(n) < 0 && Ns.call(e, n) && (r[n] = e[n]);
  return r;
};
const $a = {
  orientation: "horizontal"
}, Mm = (e, { borderWidth: t }) => ({
  group: { "--button-border-width": b(t) }
}), Mn = ae((e, t) => {
  const r = k("ButtonGroup", $a, e), n = k("ButtonGroup", $a, e), {
    className: o,
    style: a,
    classNames: i,
    styles: s,
    unstyled: l,
    orientation: c,
    vars: f,
    borderWidth: u,
    variant: p
  } = n, d = Am(n, [
    "className",
    "style",
    "classNames",
    "styles",
    "unstyled",
    "orientation",
    "vars",
    "borderWidth",
    "variant"
  ]), m = U({
    name: "ButtonGroup",
    props: r,
    classes: Er,
    className: o,
    style: a,
    classNames: i,
    styles: s,
    unstyled: l,
    vars: f,
    varsResolver: Mm,
    rootSelector: "group"
  });
  return /* @__PURE__ */ P.createElement(
    V,
    Pa(Dm(Pa({}, m("group")), {
      ref: t,
      variant: p,
      mod: { "data-orientation": c },
      role: "group"
    }), d)
  );
});
Mn.classes = Er;
Mn.displayName = "@mantine/core/ButtonGroup";
var Lm = Object.defineProperty, Fm = Object.defineProperties, km = Object.getOwnPropertyDescriptors, rr = Object.getOwnPropertySymbols, Ts = Object.prototype.hasOwnProperty, Is = Object.prototype.propertyIsEnumerable, xa = (e, t, r) => t in e ? Lm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, be = (e, t) => {
  for (var r in t || (t = {}))
    Ts.call(t, r) && xa(e, r, t[r]);
  if (rr)
    for (var r of rr(t))
      Is.call(t, r) && xa(e, r, t[r]);
  return e;
}, Ur = (e, t) => Fm(e, km(t)), Vm = (e, t) => {
  var r = {};
  for (var n in e)
    Ts.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && rr)
    for (var n of rr(e))
      t.indexOf(n) < 0 && Is.call(e, n) && (r[n] = e[n]);
  return r;
};
const zm = {}, Hm = (e, { radius: t, color: r, gradient: n, variant: o, size: a, justify: i }) => {
  const s = e.variantColorResolver({
    color: r || e.primaryColor,
    theme: e,
    gradient: n,
    variant: o || "filled"
  });
  return {
    root: {
      "--button-justify": i,
      "--button-height": ue(a, "button-height"),
      "--button-padding-x": ue(a, "button-padding-x"),
      "--button-fz": a != null && a.includes("compact") ? Xr(a.replace("compact-", "")) : Xr(a),
      "--button-radius": t === void 0 ? void 0 : Le(t),
      "--button-bg": r || o ? s.background : void 0,
      "--button-hover": r || o ? s.hover : void 0,
      "--button-color": r || o ? s.color : void 0,
      "--button-bd": r || o ? s.border : void 0,
      "--button-hover-color": r || o ? s.hoverColor : void 0
    }
  };
}, Ke = Fe((e, t) => {
  const r = k("Button", zm, e), n = r, {
    style: o,
    vars: a,
    className: i,
    color: s,
    disabled: l,
    children: c,
    leftSection: f,
    rightSection: u,
    fullWidth: p,
    variant: d,
    radius: m,
    loading: v,
    loaderProps: y,
    gradient: h,
    classNames: g,
    styles: O,
    unstyled: _,
    "data-disabled": w
  } = n, x = Vm(n, [
    "style",
    "vars",
    "className",
    "color",
    "disabled",
    "children",
    "leftSection",
    "rightSection",
    "fullWidth",
    "variant",
    "radius",
    "loading",
    "loaderProps",
    "gradient",
    "classNames",
    "styles",
    "unstyled",
    "data-disabled"
  ]), j = U({
    name: "Button",
    props: r,
    classes: Er,
    className: i,
    style: o,
    classNames: g,
    styles: O,
    unstyled: _,
    vars: a,
    varsResolver: Hm
  }), M = !!f, I = !!u;
  return /* @__PURE__ */ P.createElement(
    hr,
    be(Ur(be({
      ref: t
    }, j("root", { active: !l && !v && !w })), {
      unstyled: _,
      variant: d,
      disabled: l || v,
      mod: {
        disabled: l || w,
        loading: v,
        block: p,
        "with-left-section": M,
        "with-right-section": I
      }
    }), x),
    /* @__PURE__ */ P.createElement("span", be({}, j("inner")), f && /* @__PURE__ */ P.createElement(V, Ur(be({ component: "span" }, j("section")), { mod: { position: "left" } }), f), v && /* @__PURE__ */ P.createElement(V, be({ component: "span" }, j("loader")), /* @__PURE__ */ P.createElement(
      $r,
      be({
        color: "var(--button-color)",
        size: "calc(var(--button-height) / 1.8)"
      }, y)
    )), /* @__PURE__ */ P.createElement(V, be({ component: "span", mod: { loading: v } }, j("label")), c), u && /* @__PURE__ */ P.createElement(V, Ur(be({ component: "span" }, j("section")), { mod: { position: "right" } }), u))
  );
});
Ke.classes = Er;
Ke.displayName = "@mantine/core/Button";
Ke.Group = Mn;
const [Bm, Wm] = cn(
  "Card component was not found in tree"
);
var Gm = { root: "m-e615b15f", section: "m-599a2148" };
const Ln = Gm;
var Um = Object.defineProperty, nr = Object.getOwnPropertySymbols, Ds = Object.prototype.hasOwnProperty, As = Object.prototype.propertyIsEnumerable, Ea = (e, t, r) => t in e ? Um(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Sa = (e, t) => {
  for (var r in t || (t = {}))
    Ds.call(t, r) && Ea(e, r, t[r]);
  if (nr)
    for (var r of nr(t))
      As.call(t, r) && Ea(e, r, t[r]);
  return e;
}, Ym = (e, t) => {
  var r = {};
  for (var n in e)
    Ds.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && nr)
    for (var n of nr(e))
      t.indexOf(n) < 0 && As.call(e, n) && (r[n] = e[n]);
  return r;
};
const Km = {}, Sr = Fe((e, t) => {
  const n = k("CardSection", Km, e), { classNames: o, className: a, style: i, styles: s, vars: l, withBorder: c, inheritPadding: f } = n, u = Ym(n, ["classNames", "className", "style", "styles", "vars", "withBorder", "inheritPadding"]), p = Wm();
  return /* @__PURE__ */ P.createElement(
    V,
    Sa(Sa({
      ref: t,
      mod: { "with-border": c, "inherit-padding": f }
    }, p.getStyles("section", { className: a, style: i, styles: s, classNames: o })), u)
  );
});
Sr.classes = Ln;
Sr.displayName = "@mantine/core/CardSection";
var Xm = Object.defineProperty, or = Object.getOwnPropertySymbols, Ms = Object.prototype.hasOwnProperty, Ls = Object.prototype.propertyIsEnumerable, Ra = (e, t, r) => t in e ? Xm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ca = (e, t) => {
  for (var r in t || (t = {}))
    Ms.call(t, r) && Ra(e, r, t[r]);
  if (or)
    for (var r of or(t))
      Ls.call(t, r) && Ra(e, r, t[r]);
  return e;
}, qm = (e, t) => {
  var r = {};
  for (var n in e)
    Ms.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && or)
    for (var n of or(e))
      t.indexOf(n) < 0 && Ls.call(e, n) && (r[n] = e[n]);
  return r;
};
const Jm = {}, Qm = (e, { padding: t }) => ({
  root: {
    "--card-padding": gr(t)
  }
}), Rr = Fe((e, t) => {
  const r = k("Card", Jm, e), n = r, { classNames: o, className: a, style: i, styles: s, unstyled: l, vars: c, children: f, padding: u } = n, p = qm(n, ["classNames", "className", "style", "styles", "unstyled", "vars", "children", "padding"]), d = U({
    name: "Card",
    props: r,
    classes: Ln,
    className: a,
    style: i,
    classNames: o,
    styles: s,
    unstyled: l,
    vars: c,
    varsResolver: Qm
  }), m = Ga.toArray(f), v = m.map((y, h) => typeof y == "object" && y && "type" in y && y.type === Sr ? Ze(y, {
    "data-first-section": h === 0 || void 0,
    "data-last-section": h === m.length - 1 || void 0
  }) : y);
  return /* @__PURE__ */ P.createElement(Bm, { value: { getStyles: d } }, /* @__PURE__ */ P.createElement(bn, Ca(Ca({ ref: t, unstyled: l }, d("root")), p), v));
});
Rr.classes = Ln;
Rr.displayName = "@mantine/core/Card";
Rr.Section = Sr;
var Zm = { root: "m-7485cace" };
const Fs = Zm;
var ev = Object.defineProperty, ar = Object.getOwnPropertySymbols, ks = Object.prototype.hasOwnProperty, Vs = Object.prototype.propertyIsEnumerable, ja = (e, t, r) => t in e ? ev(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Na = (e, t) => {
  for (var r in t || (t = {}))
    ks.call(t, r) && ja(e, r, t[r]);
  if (ar)
    for (var r of ar(t))
      Vs.call(t, r) && ja(e, r, t[r]);
  return e;
}, tv = (e, t) => {
  var r = {};
  for (var n in e)
    ks.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && ar)
    for (var n of ar(e))
      t.indexOf(n) < 0 && Vs.call(e, n) && (r[n] = e[n]);
  return r;
};
const rv = {}, nv = (e, { size: t, fluid: r }) => ({
  root: {
    "--container-size": r ? void 0 : ue(t, "container-size")
  }
}), Fn = ae((e, t) => {
  const r = k("Container", rv, e), n = r, { classNames: o, className: a, style: i, styles: s, unstyled: l, vars: c, fluid: f } = n, u = tv(n, ["classNames", "className", "style", "styles", "unstyled", "vars", "fluid"]), p = U({
    name: "Container",
    classes: Fs,
    props: r,
    className: a,
    style: i,
    classNames: o,
    styles: s,
    unstyled: l,
    vars: c,
    varsResolver: nv
  });
  return /* @__PURE__ */ P.createElement(V, Na(Na({ ref: t, mod: { fluid: f } }, p("root")), u));
});
Fn.classes = Fs;
Fn.displayName = "@mantine/core/Container";
function ov({ open: e, close: t, openDelay: r, closeDelay: n }) {
  const o = H(-1), a = H(-1), i = () => {
    window.clearTimeout(o.current), window.clearTimeout(a.current);
  }, s = () => {
    i(), r === 0 || r === void 0 ? e() : o.current = window.setTimeout(e, r);
  }, l = () => {
    i(), n === 0 || n === void 0 ? t() : a.current = window.setTimeout(t, n);
  };
  return B(() => i, []), { openDropdown: s, closeDropdown: l };
}
const [av, zs] = cn(
  "HoverCard component was not found in the tree"
);
var iv = Object.defineProperty, ir = Object.getOwnPropertySymbols, Hs = Object.prototype.hasOwnProperty, Bs = Object.prototype.propertyIsEnumerable, Ta = (e, t, r) => t in e ? iv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, sv = (e, t) => {
  for (var r in t || (t = {}))
    Hs.call(t, r) && Ta(e, r, t[r]);
  if (ir)
    for (var r of ir(t))
      Bs.call(t, r) && Ta(e, r, t[r]);
  return e;
}, lv = (e, t) => {
  var r = {};
  for (var n in e)
    Hs.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && ir)
    for (var n of ir(e))
      t.indexOf(n) < 0 && Bs.call(e, n) && (r[n] = e[n]);
  return r;
};
const cv = {};
function Ws(e) {
  const t = k(
    "HoverCardDropdown",
    cv,
    e
  ), { children: r, onMouseEnter: n, onMouseLeave: o } = t, a = lv(t, ["children", "onMouseEnter", "onMouseLeave"]), i = zs(), s = It(n, i.openDropdown), l = It(o, i.closeDropdown);
  return /* @__PURE__ */ P.createElement(Ve.Dropdown, sv({ onMouseEnter: s, onMouseLeave: l }, a), r);
}
Ws.displayName = "@mantine/core/HoverCardDropdown";
var fv = Object.defineProperty, sr = Object.getOwnPropertySymbols, Gs = Object.prototype.hasOwnProperty, Us = Object.prototype.propertyIsEnumerable, Ia = (e, t, r) => t in e ? fv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, uv = (e, t) => {
  for (var r in t || (t = {}))
    Gs.call(t, r) && Ia(e, r, t[r]);
  if (sr)
    for (var r of sr(t))
      Us.call(t, r) && Ia(e, r, t[r]);
  return e;
}, dv = (e, t) => {
  var r = {};
  for (var n in e)
    Gs.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && sr)
    for (var n of sr(e))
      t.indexOf(n) < 0 && Us.call(e, n) && (r[n] = e[n]);
  return r;
};
const pv = {
  refProp: "ref"
}, Ys = oe((e, t) => {
  const r = k(
    "HoverCardTarget",
    pv,
    e
  ), { children: n, refProp: o, eventPropsWrapperName: a } = r, i = dv(r, ["children", "refProp", "eventPropsWrapperName"]);
  if (!pt(n))
    throw new Error(
      "HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  const s = zs(), l = It(n.props.onMouseEnter, s.openDropdown), c = It(n.props.onMouseLeave, s.closeDropdown), f = { onMouseEnter: l, onMouseLeave: c };
  return /* @__PURE__ */ P.createElement(Ve.Target, uv({ refProp: o, ref: t }, i), Ze(
    n,
    a ? { [a]: f } : f
  ));
});
Ys.displayName = "@mantine/core/HoverCardTarget";
var mv = Object.defineProperty, vv = Object.defineProperties, gv = Object.getOwnPropertyDescriptors, lr = Object.getOwnPropertySymbols, Ks = Object.prototype.hasOwnProperty, Xs = Object.prototype.propertyIsEnumerable, Da = (e, t, r) => t in e ? mv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, yv = (e, t) => {
  for (var r in t || (t = {}))
    Ks.call(t, r) && Da(e, r, t[r]);
  if (lr)
    for (var r of lr(t))
      Xs.call(t, r) && Da(e, r, t[r]);
  return e;
}, hv = (e, t) => vv(e, gv(t)), _v = (e, t) => {
  var r = {};
  for (var n in e)
    Ks.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && lr)
    for (var n of lr(e))
      t.indexOf(n) < 0 && Xs.call(e, n) && (r[n] = e[n]);
  return r;
};
const bv = {
  openDelay: 0,
  closeDelay: 150,
  initiallyOpened: !1
};
function Ie(e) {
  const t = k(
    "HoverCard",
    bv,
    e
  ), { children: r, onOpen: n, onClose: o, openDelay: a, closeDelay: i, initiallyOpened: s } = t, l = _v(t, ["children", "onOpen", "onClose", "openDelay", "closeDelay", "initiallyOpened"]), [c, { open: f, close: u }] = Kc(s, { onClose: o, onOpen: n }), { openDropdown: p, closeDropdown: d } = ov({ open: f, close: u, openDelay: a, closeDelay: i });
  return /* @__PURE__ */ P.createElement(av, { value: { openDropdown: p, closeDropdown: d } }, /* @__PURE__ */ P.createElement(Ve, hv(yv({}, l), { opened: c, __staticSelector: "HoverCard" }), r));
}
Ie.displayName = "@mantine/core/HoverCard";
Ie.Target = Ys;
Ie.Dropdown = Ws;
Ie.extend = (e) => e;
function wv(e = "top-end", t = 0) {
  const r = {
    "--indicator-top": void 0,
    "--indicator-bottom": void 0,
    "--indicator-left": void 0,
    "--indicator-right": void 0,
    "--indicator-translate-x": void 0,
    "--indicator-translate-y": void 0
  }, n = b(t), [o, a] = e.split("-");
  return o === "top" && (r["--indicator-top"] = n, r["--indicator-translate-y"] = "-50%"), o === "middle" && (r["--indicator-top"] = "50%", r["--indicator-translate-y"] = "-50%"), o === "bottom" && (r["--indicator-bottom"] = n, r["--indicator-translate-y"] = "50%"), a === "start" && (r["--indicator-left"] = n, r["--indicator-translate-x"] = "-50%"), a === "center" && (r["--indicator-left"] = "50%", r["--indicator-translate-x"] = "-50%"), a === "end" && (r["--indicator-right"] = n, r["--indicator-translate-x"] = "50%"), r;
}
var Ov = { root: "m-e5262200", indicator: "m-760d1fb1", processing: "m-885901b1" };
const qs = Ov;
var Pv = Object.defineProperty, $v = Object.defineProperties, xv = Object.getOwnPropertyDescriptors, cr = Object.getOwnPropertySymbols, Js = Object.prototype.hasOwnProperty, Qs = Object.prototype.propertyIsEnumerable, Aa = (e, t, r) => t in e ? Pv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Tt = (e, t) => {
  for (var r in t || (t = {}))
    Js.call(t, r) && Aa(e, r, t[r]);
  if (cr)
    for (var r of cr(t))
      Qs.call(t, r) && Aa(e, r, t[r]);
  return e;
}, Ev = (e, t) => $v(e, xv(t)), Sv = (e, t) => {
  var r = {};
  for (var n in e)
    Js.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && cr)
    for (var n of cr(e))
      t.indexOf(n) < 0 && Qs.call(e, n) && (r[n] = e[n]);
  return r;
};
const Rv = {
  position: "top-end",
  offset: 0,
  inline: !1,
  withBorder: !1,
  disabled: !1,
  processing: !1
}, Cv = (e, { color: t, position: r, offset: n, size: o, radius: a, zIndex: i }) => ({
  root: Tt({
    "--indicator-color": t ? De(t, e) : void 0,
    "--indicator-size": b(o),
    "--indicator-radius": a === void 0 ? void 0 : Le(a),
    "--indicator-z-index": i == null ? void 0 : i.toString()
  }, wv(r, n))
}), kn = ae((e, t) => {
  const r = k("Indicator", Rv, e), n = r, {
    classNames: o,
    className: a,
    style: i,
    styles: s,
    unstyled: l,
    vars: c,
    children: f,
    position: u,
    offset: p,
    inline: d,
    label: m,
    radius: v,
    color: y,
    withBorder: h,
    disabled: g,
    processing: O,
    zIndex: _
  } = n, w = Sv(n, [
    "classNames",
    "className",
    "style",
    "styles",
    "unstyled",
    "vars",
    "children",
    "position",
    "offset",
    "inline",
    "label",
    "radius",
    "color",
    "withBorder",
    "disabled",
    "processing",
    "zIndex"
  ]), x = U({
    name: "Indicator",
    classes: qs,
    props: r,
    className: a,
    style: i,
    classNames: o,
    styles: s,
    unstyled: l,
    vars: c,
    varsResolver: Cv
  });
  return /* @__PURE__ */ P.createElement(V, Tt(Ev(Tt({ ref: t }, x("root")), { mod: { inline: d } }), w), !g && /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(
    V,
    Tt({
      mod: { "with-label": !!m, "with-border": h, processing: O }
    }, x("indicator")),
    m
  )), f);
});
kn.classes = qs;
kn.displayName = "@mantine/core/Indicator";
var jv = { tooltip: "m-1b3c8819", arrow: "m-f898399f" };
const Cr = jv;
function Nv({
  offset: e,
  position: t
}) {
  const [r, n] = z(!1), o = H(), { x: a, y: i, elements: s, refs: l, update: c, placement: f } = Nn({
    placement: t,
    middleware: [
      En({
        crossAxis: !0,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  }), u = f.includes("right") ? e : t.includes("left") ? e * -1 : 0, p = f.includes("bottom") ? e : t.includes("top") ? e * -1 : 0, d = Q(
    ({ clientX: m, clientY: v }) => {
      l.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: m,
            y: v,
            left: m + u,
            top: v + p,
            right: m,
            bottom: v
          };
        }
      });
    },
    [s.reference]
  );
  return B(() => {
    if (l.floating.current) {
      const m = o.current;
      m.addEventListener("mousemove", d);
      const v = pe(l.floating.current);
      return v.forEach((y) => {
        y.addEventListener("scroll", c);
      }), () => {
        m.removeEventListener("mousemove", d), v.forEach((y) => {
          y.removeEventListener("scroll", c);
        });
      };
    }
  }, [s.reference, l.floating.current, c, d, r]), { handleMouseMove: d, x: a, y: i, opened: r, setOpened: n, boundaryRef: o, floating: l.setFloating };
}
var Tv = Object.defineProperty, Iv = Object.defineProperties, Dv = Object.getOwnPropertyDescriptors, fr = Object.getOwnPropertySymbols, Zs = Object.prototype.hasOwnProperty, el = Object.prototype.propertyIsEnumerable, Ma = (e, t, r) => t in e ? Tv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, ft = (e, t) => {
  for (var r in t || (t = {}))
    Zs.call(t, r) && Ma(e, r, t[r]);
  if (fr)
    for (var r of fr(t))
      el.call(t, r) && Ma(e, r, t[r]);
  return e;
}, Et = (e, t) => Iv(e, Dv(t)), Av = (e, t) => {
  var r = {};
  for (var n in e)
    Zs.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && fr)
    for (var n of fr(e))
      t.indexOf(n) < 0 && el.call(e, n) && (r[n] = e[n]);
  return r;
};
const Mv = {
  refProp: "ref",
  withinPortal: !0,
  offset: 10,
  position: "right",
  zIndex: fn("popover")
}, Lv = (e, { radius: t, color: r }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : Le(t),
    "--tooltip-bg": r ? De(r, e) : void 0
  }
}), Vn = ae((e, t) => {
  var r, n;
  const o = k("TooltipFloating", Mv, e), a = o, {
    children: i,
    refProp: s,
    withinPortal: l,
    style: c,
    className: f,
    classNames: u,
    styles: p,
    unstyled: d,
    radius: m,
    color: v,
    label: y,
    offset: h,
    position: g,
    multiline: O,
    zIndex: _,
    disabled: w,
    variant: x,
    vars: j,
    portalProps: M
  } = a, I = Av(a, [
    "children",
    "refProp",
    "withinPortal",
    "style",
    "className",
    "classNames",
    "styles",
    "unstyled",
    "radius",
    "color",
    "label",
    "offset",
    "position",
    "multiline",
    "zIndex",
    "disabled",
    "variant",
    "vars",
    "portalProps"
  ]), F = Se(), N = U({
    name: "TooltipFloating",
    props: o,
    classes: Cr,
    className: f,
    style: c,
    classNames: u,
    styles: p,
    unstyled: d,
    rootSelector: "tooltip",
    vars: j,
    varsResolver: Lv
  }), { handleMouseMove: D, x: R, y: E, opened: S, boundaryRef: C, floating: L, setOpened: T } = Nv({
    offset: h,
    position: g
  });
  if (!pt(i))
    throw new Error(
      "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const W = mt(C, i.ref, t), ie = (le) => {
    var ee, J;
    (J = (ee = i.props).onMouseEnter) == null || J.call(ee, le), D(le), T(!0);
  }, se = (le) => {
    var ee, J;
    (J = (ee = i.props).onMouseLeave) == null || J.call(ee, le), T(!1);
  };
  return /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(Or, Et(ft({}, M), { withinPortal: l }), /* @__PURE__ */ P.createElement(
    V,
    Et(ft(ft({}, I), N("tooltip", {
      style: Et(ft({}, hn(c, F)), {
        zIndex: _,
        display: !w && S ? "block" : "none",
        top: (r = E && Math.round(E)) != null ? r : "",
        left: (n = R && Math.round(R)) != null ? n : ""
      })
    })), {
      variant: x,
      ref: L
    }),
    y
  )), Ze(i, Et(ft({}, i.props), {
    [s]: W,
    onMouseEnter: ie,
    onMouseLeave: se
  })));
});
Vn.classes = Cr;
Vn.displayName = "@mantine/core/TooltipFloating";
const tl = dt(!1), Fv = tl.Provider, kv = () => Me(tl), Vv = {
  openDelay: 0,
  closeDelay: 0
};
function rl(e) {
  const { openDelay: t, closeDelay: r, children: n } = k("TooltipGroup", Vv, e);
  return /* @__PURE__ */ P.createElement(Fv, { value: !0 }, /* @__PURE__ */ P.createElement(vd, { delay: { open: t, close: r } }, n));
}
rl.displayName = "@mantine/core/TooltipGroup";
function zv(e) {
  var t, r, n;
  const [o, a] = z(!1), s = typeof e.opened == "boolean" ? e.opened : o, l = kv(), c = ai(), { delay: f, currentId: u, setCurrentId: p } = qi(), d = Q(
    (I) => {
      a(I), I && p(c);
    },
    [p, c]
  ), {
    x: m,
    y: v,
    context: y,
    refs: h,
    update: g,
    placement: O,
    middlewareData: { arrow: { x: _, y: w } = {} }
  } = Nn({
    placement: e.position,
    open: s,
    onOpenChange: d,
    middleware: [
      Di(e.offset),
      En({ padding: 8 }),
      Ni(),
      Hi({ element: e.arrowRef, padding: e.arrowOffset }),
      ...e.inline ? [Ii()] : []
    ]
  }), { getReferenceProps: x, getFloatingProps: j } = Ed([
    md(y, {
      enabled: (t = e.events) == null ? void 0 : t.hover,
      delay: l ? f : { open: e.openDelay, close: e.closeDelay },
      mouseOnly: !((r = e.events) != null && r.touch)
    }),
    xd(y, { enabled: (n = e.events) == null ? void 0 : n.focus, keyboardOnly: !0 }),
    Sd(y, { role: "tooltip" }),
    // cannot be used with controlled tooltip, page jumps
    $d(y, { enabled: typeof e.opened === void 0 }),
    gd(y, { id: c })
  ]);
  Ji({
    opened: s,
    position: e.position,
    positionDependencies: e.positionDependencies,
    floating: { refs: h, update: g }
  }), $e(() => {
    var I;
    (I = e.onPositionChange) == null || I.call(e, O);
  }, [O]);
  const M = s && u && u !== c;
  return {
    x: m,
    y: v,
    arrowX: _,
    arrowY: w,
    reference: h.setReference,
    floating: h.setFloating,
    getFloatingProps: j,
    getReferenceProps: x,
    isGroupPhase: M,
    opened: s,
    placement: O
  };
}
var Hv = Object.defineProperty, La = Object.getOwnPropertySymbols, Bv = Object.prototype.hasOwnProperty, Wv = Object.prototype.propertyIsEnumerable, Fa = (e, t, r) => t in e ? Hv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Yr = (e, t) => {
  for (var r in t || (t = {}))
    Bv.call(t, r) && Fa(e, r, t[r]);
  if (La)
    for (var r of La(t))
      Wv.call(t, r) && Fa(e, r, t[r]);
  return e;
};
const Gv = {
  duration: 100,
  transition: "fade"
};
function Uv(e, t) {
  return Yr(Yr(Yr({}, Gv), t), e);
}
var Yv = Object.defineProperty, Kv = Object.defineProperties, Xv = Object.getOwnPropertyDescriptors, ur = Object.getOwnPropertySymbols, nl = Object.prototype.hasOwnProperty, ol = Object.prototype.propertyIsEnumerable, ka = (e, t, r) => t in e ? Yv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, we = (e, t) => {
  for (var r in t || (t = {}))
    nl.call(t, r) && ka(e, r, t[r]);
  if (ur)
    for (var r of ur(t))
      ol.call(t, r) && ka(e, r, t[r]);
  return e;
}, St = (e, t) => Kv(e, Xv(t)), qv = (e, t) => {
  var r = {};
  for (var n in e)
    nl.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && ur)
    for (var n of ur(e))
      t.indexOf(n) < 0 && ol.call(e, n) && (r[n] = e[n]);
  return r;
};
const Va = {
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
  zIndex: fn("popover"),
  positionDependencies: []
}, Jv = (e, { radius: t, color: r }) => ({
  tooltip: {
    "--tooltip-radius": t === void 0 ? void 0 : Le(t),
    "--tooltip-bg": r ? De(r, e) : void 0
  }
}), Qe = ae((e, t) => {
  const r = k("Tooltip", Va, e), n = k("Tooltip", Va, r), {
    children: o,
    position: a,
    refProp: i,
    label: s,
    openDelay: l,
    closeDelay: c,
    onPositionChange: f,
    opened: u,
    withinPortal: p,
    radius: d,
    color: m,
    classNames: v,
    styles: y,
    unstyled: h,
    style: g,
    className: O,
    withArrow: _,
    arrowSize: w,
    arrowOffset: x,
    arrowRadius: j,
    arrowPosition: M,
    offset: I,
    transitionProps: F,
    multiline: N,
    events: D,
    zIndex: R,
    disabled: E,
    positionDependencies: S,
    onClick: C,
    onMouseEnter: L,
    onMouseLeave: T,
    inline: W,
    variant: ie,
    keepMounted: se,
    vars: le,
    portalProps: ee
  } = n, J = qv(n, [
    "children",
    "position",
    "refProp",
    "label",
    "openDelay",
    "closeDelay",
    "onPositionChange",
    "opened",
    "withinPortal",
    "radius",
    "color",
    "classNames",
    "styles",
    "unstyled",
    "style",
    "className",
    "withArrow",
    "arrowSize",
    "arrowOffset",
    "arrowRadius",
    "arrowPosition",
    "offset",
    "transitionProps",
    "multiline",
    "events",
    "zIndex",
    "disabled",
    "positionDependencies",
    "onClick",
    "onMouseEnter",
    "onMouseLeave",
    "inline",
    "variant",
    "keepMounted",
    "vars",
    "portalProps"
  ]), { dir: tt } = _n(), ze = H(null), Y = zv({
    position: us(tt, a),
    closeDelay: c,
    openDelay: l,
    onPositionChange: f,
    opened: u,
    events: D,
    arrowRef: ze,
    arrowOffset: x,
    offset: typeof I == "number" ? I + (_ ? w / 2 : 0) : I,
    positionDependencies: [...S, o],
    inline: W
  }), Re = U({
    name: "Tooltip",
    props: r,
    classes: Cr,
    className: O,
    style: g,
    classNames: v,
    styles: y,
    unstyled: h,
    rootSelector: "tooltip",
    vars: le,
    varsResolver: Jv
  });
  if (!pt(o))
    throw new Error(
      "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  const rt = mt(Y.reference, o.ref, t), He = Uv(F, { duration: 100, transition: "fade" });
  return /* @__PURE__ */ P.createElement(P.Fragment, null, /* @__PURE__ */ P.createElement(Or, St(we({}, ee), { withinPortal: p }), /* @__PURE__ */ P.createElement(
    Tn,
    St(we({}, He), {
      keepMounted: se,
      mounted: !E && !!Y.opened,
      duration: Y.isGroupPhase ? 10 : He.duration
    }),
    (nt) => {
      var Be, Ce;
      return /* @__PURE__ */ P.createElement(
        V,
        we(St(we({}, J), {
          variant: ie,
          mod: { multiline: N }
        }), Y.getFloatingProps({
          ref: Y.floating,
          className: Re("tooltip").className,
          style: St(we(we({}, Re("tooltip").style), nt), {
            zIndex: R,
            top: (Be = Y.y) != null ? Be : 0,
            left: (Ce = Y.x) != null ? Ce : 0
          })
        })),
        s,
        /* @__PURE__ */ P.createElement(
          In,
          we({
            ref: ze,
            arrowX: Y.arrowX,
            arrowY: Y.arrowY,
            visible: _,
            position: Y.placement,
            arrowSize: w,
            arrowOffset: x,
            arrowRadius: j,
            arrowPosition: M
          }, Re("arrow"))
        )
      );
    }
  )), Ze(
    o,
    Y.getReferenceProps(we({
      onClick: C,
      onMouseEnter: L,
      onMouseLeave: T,
      onMouseMove: r.onMouseMove,
      onPointerDown: r.onPointerDown,
      onPointerEnter: r.onPointerEnter,
      [i]: rt,
      className: ye(O, o.props.className)
    }, o.props))
  ));
});
Qe.classes = Cr;
Qe.displayName = "@mantine/core/Tooltip";
Qe.Floating = Vn;
Qe.Group = rl;
var Qv = { root: "m-6d731127" };
const al = Qv;
var Zv = Object.defineProperty, eg = Object.defineProperties, tg = Object.getOwnPropertyDescriptors, dr = Object.getOwnPropertySymbols, il = Object.prototype.hasOwnProperty, sl = Object.prototype.propertyIsEnumerable, za = (e, t, r) => t in e ? Zv(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Ha = (e, t) => {
  for (var r in t || (t = {}))
    il.call(t, r) && za(e, r, t[r]);
  if (dr)
    for (var r of dr(t))
      sl.call(t, r) && za(e, r, t[r]);
  return e;
}, rg = (e, t) => eg(e, tg(t)), ng = (e, t) => {
  var r = {};
  for (var n in e)
    il.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && dr)
    for (var n of dr(e))
      t.indexOf(n) < 0 && sl.call(e, n) && (r[n] = e[n]);
  return r;
};
const og = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
}, ag = (e, { gap: t, align: r, justify: n }) => ({
  root: {
    "--stack-gap": gr(t),
    "--stack-align": r,
    "--stack-justify": n
  }
}), pr = ae((e, t) => {
  const r = k("Stack", og, e), n = r, {
    classNames: o,
    className: a,
    style: i,
    styles: s,
    unstyled: l,
    vars: c,
    align: f,
    justify: u,
    gap: p,
    variant: d
  } = n, m = ng(n, [
    "classNames",
    "className",
    "style",
    "styles",
    "unstyled",
    "vars",
    "align",
    "justify",
    "gap",
    "variant"
  ]), v = U({
    name: "Stack",
    props: r,
    classes: al,
    className: a,
    style: i,
    classNames: o,
    styles: s,
    unstyled: l,
    vars: c,
    varsResolver: ag
  });
  return /* @__PURE__ */ P.createElement(V, Ha(rg(Ha({ ref: t }, v("root")), { variant: d }), m));
});
pr.classes = al;
pr.displayName = "@mantine/core/Stack";
const ig = {
  /** Put your mantine theme override here */
};
var ll = { exports: {} }, sg = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED", lg = sg, cg = lg;
function cl() {
}
function fl() {
}
fl.resetWarningCache = cl;
var fg = function() {
  function e(n, o, a, i, s, l) {
    if (l !== cg) {
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
  var r = {
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
    checkPropTypes: fl,
    resetWarningCache: cl
  };
  return r.PropTypes = r, r;
};
ll.exports = fg();
var ug = ll.exports;
const Te = /* @__PURE__ */ xl(ug);
var dg = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, pg = Object.defineProperty, mg = Object.defineProperties, vg = Object.getOwnPropertyDescriptors, mr = Object.getOwnPropertySymbols, ul = Object.prototype.hasOwnProperty, dl = Object.prototype.propertyIsEnumerable, Ba = (e, t, r) => t in e ? pg(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, Wa = (e, t) => {
  for (var r in t || (t = {}))
    ul.call(t, r) && Ba(e, r, t[r]);
  if (mr)
    for (var r of mr(t))
      dl.call(t, r) && Ba(e, r, t[r]);
  return e;
}, gg = (e, t) => mg(e, vg(t)), yg = (e, t) => {
  var r = {};
  for (var n in e)
    ul.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && mr)
    for (var n of mr(e))
      t.indexOf(n) < 0 && dl.call(e, n) && (r[n] = e[n]);
  return r;
}, gt = (e, t, r) => {
  const n = oe(
    (o, a) => {
      var i = o, { color: s = "currentColor", size: l = 24, stroke: c = 2, children: f } = i, u = yg(i, ["color", "size", "stroke", "children"]);
      return Bn(
        "svg",
        Wa(gg(Wa({
          ref: a
        }, dg), {
          width: l,
          height: l,
          stroke: s,
          strokeWidth: c,
          className: `tabler-icon tabler-icon-${e}`
        }), u),
        [...r.map(([p, d]) => Bn(p, d)), ...f || []]
      );
    }
  );
  return n.propTypes = {
    color: Te.string,
    size: Te.oneOfType([Te.string, Te.number]),
    stroke: Te.oneOfType([Te.string, Te.number])
  }, n.displayName = `${t}`, n;
}, hg = gt("arrow-down", "IconArrowDown", [
  ["path", { d: "M12 5l0 14", key: "svg-0" }],
  ["path", { d: "M18 13l-6 6", key: "svg-1" }],
  ["path", { d: "M6 13l6 6", key: "svg-2" }]
]), _g = gt("arrow-up", "IconArrowUp", [
  ["path", { d: "M12 5l0 14", key: "svg-0" }],
  ["path", { d: "M18 11l-6 -6", key: "svg-1" }],
  ["path", { d: "M6 11l6 -6", key: "svg-2" }]
]), bg = gt("check", "IconCheck", [
  ["path", { d: "M5 12l5 5l10 -10", key: "svg-0" }]
]), wg = gt("info-circle", "IconInfoCircle", [
  ["path", { d: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", key: "svg-0" }],
  ["path", { d: "M12 9h.01", key: "svg-1" }],
  ["path", { d: "M11 12h1v4h1", key: "svg-2" }]
]), Og = gt("search", "IconSearch", [
  ["path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", key: "svg-0" }],
  ["path", { d: "M21 21l-6 -6", key: "svg-1" }]
]);
function Pg() {
  const { setColorScheme: e } = af();
  return /* @__PURE__ */ A.jsxs(Pe, { justify: "center", mt: "xl", children: [
    /* @__PURE__ */ A.jsx(Ke, { onClick: () => e("light"), children: "Light" }),
    /* @__PURE__ */ A.jsx(Ke, { onClick: () => e("dark"), children: "Dark" }),
    /* @__PURE__ */ A.jsx(Ke, { onClick: () => e("auto"), children: "Auto" })
  ] });
}
const $g = [
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
        // object url (detail)
        identification: "23.21",
        referencedSource: {
          type: "IfcClassification",
          name: "DigiBase Demo NL-SfB tabel 1",
          location: "https://identifier.buildingsmart.org/uri/digibase/nlsfb/12.2021"
          // domain
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
    description: "breedplaatvloer 3",
    predefinedType: "FLOOR"
  },
  {
    type: "IfcSlab",
    name: "Floor: 23_FL_AT_breedplaatvloer_200 (C35/45)",
    description: "",
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
    name: "Floor: 23_FL_AT_breedplaatvloer_200 (C35/45)",
    description: "",
    predefinedType: "FLOOR"
  },
  {
    type: "IfcSlab",
    name: "Floor: 23_FL_AT_breedplaatvloer_400 (C35/45) (oranje) dfsjaf;j;ajslf;jlfdsaj sdfajklfaljksjlkdf fsdalkfjsadljkfjlk aslkdjfjlkasdfljkadsjlk asfljkflsdjkljkafsd asdflkfsajkl",
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
    type: "IfcSlab",
    name: "Kanaalplaatvloer 200 VBI",
    description: "kanaalplaatvloer",
    predefinedType: "FLOOR"
  },
  {
    type: "IfcDoor",
    name: "Kegro Geïsoleerde voordeur 9155N",
    description: "buitendeur",
    predefinedType: "DOOR"
  }
];
function xg(e, t) {
  const r = e.reduce((n, o) => {
    const a = o[t];
    return n[a] || (n[a] = []), n[a].push(o), n;
  }, {});
  return Object.keys(r).sort().reduce((n, o) => (n[o] = r[o], n), {});
}
function Eg(e) {
  let t = "blue";
  e.class || (t = "red");
  function r(a, i) {
    var l;
    const s = (l = a.hasAssociations) == null ? void 0 : l.filter((c) => c.type === "IfcClassificationReference");
    if (!s)
      return "orange";
    for (let c in i.classRelations)
      if (console.log(c.relatedClassUri, s.location, c.relatedClassUri === s.location), c.relatedClassUri === s.location)
        return "green";
    return "red";
  }
  e.class && (t = r(e.item, e.class));
  function n(a, i) {
    return a.length <= i ? a : a.substring(0, i) + "...";
  }
  function o(a) {
    bsddBridge.bsddSearch(JSON.stringify(a)).then(function(i) {
      console.log("Sent to Revit");
    });
  }
  return /* @__PURE__ */ A.jsx(Rr, { children: /* @__PURE__ */ A.jsxs(Pe, { align: "flex-start", justify: "space-between", children: [
    /* @__PURE__ */ A.jsxs(Pe, { my: "auto", children: [
      /* @__PURE__ */ A.jsx(kn, { color: t, size: 18, mx: "xs" }),
      /* @__PURE__ */ A.jsx(xr, { children: /* @__PURE__ */ A.jsx("div", { children: n(e.item.name, 50) }) })
    ] }),
    /* @__PURE__ */ A.jsxs(Pe, { children: [
      /* @__PURE__ */ A.jsxs(Ie, { children: [
        /* @__PURE__ */ A.jsx(Ie.Target, { children: /* @__PURE__ */ A.jsx(Pe, { children: /* @__PURE__ */ A.jsx(wg, {}) }) }),
        /* @__PURE__ */ A.jsx(Ie.Dropdown, { children: e.item.name })
      ] }),
      /* @__PURE__ */ A.jsx(Qe, { label: "Select all instances", children: /* @__PURE__ */ A.jsx(
        Je,
        {
          radius: "xl",
          onClick: () => o(e.item),
          color: "blue",
          children: /* @__PURE__ */ A.jsx(Og, { size: 18 })
        }
      ) }),
      /* @__PURE__ */ A.jsx(Qe, { label: "Attach to type", children: /* @__PURE__ */ A.jsx(Je, { radius: "xl", color: "green", children: /* @__PURE__ */ A.jsx(bg, { size: 18 }) }) })
    ] })
  ] }) }, e.item.name);
}
function Sg(e) {
  const { category: t, opened: r, items: n } = e, [o, a] = z(!0), [i, s] = z(), [l, c] = z(null);
  if (B(() => {
    (async () => {
      try {
        a(!0);
        const p = f(t, e.bbbr);
        if (p === !1)
          return !1;
        const m = `https://bs-dd-api-prototype.azurewebsites.net/api/Class/v1?uri=${encodeURIComponent(p.uri)}&includeClassProperties=true&includeChildClassReferences=true&includeClassRelations=true`, v = await fetch(m);
        if (!v.ok)
          throw new Error(`HTTP error! status: ${v.status}`);
        const y = await v.json();
        s(y);
      } catch (p) {
        c(p.message);
      } finally {
        a(!1);
      }
    })();
  }, []), o)
    return /* @__PURE__ */ A.jsx("div", { children: "Loading..." });
  if (l)
    return /* @__PURE__ */ A.jsxs("div", { children: [
      "Error: ",
      l
    ] });
  function f(u, p) {
    let d;
    return p.classes.filter((m) => {
      m.code === u && (d = m);
    }), d || !1;
  }
  return /* @__PURE__ */ A.jsx($i, { in: !r[t], children: n.map((u, p) => /* @__PURE__ */ A.jsx(Eg, { item: u, class: i }, p)) });
}
function Rg() {
  const [e, t] = z($g);
  window.updateSelection = (p) => {
    const d = JSON.parse(p);
    t(d);
  };
  const [r, n] = z(), [o, a] = z(!0), [i, s] = z(null), [l, c] = z({}), f = (p) => {
    c((d) => ({
      ...d,
      // @ts-ignore
      [p]: !d[p]
    }));
  };
  if (B(() => {
    (async () => {
      try {
        await CefSharp.BindObjectAsync("bsddBridge");
      } catch (d) {
        s(d.message);
      }
    })();
  }, []), B(() => {
    (async () => {
      try {
        a(!0);
        const d = await fetch("https://bs-dd-api-prototype.azurewebsites.net/api/Dictionary/v1/Classes?Uri=https%3A%2F%2Fidentifier.buildingsmart.org%2Furi%2Fdigibase%2Fbim-basis-objecten%2F0.1");
        if (!d.ok)
          throw new Error(`HTTP error! status: ${d.status}`);
        const m = await d.json();
        n(m);
      } catch (d) {
        s(d.message);
      } finally {
        a(!1);
      }
    })();
  }, []), o)
    return /* @__PURE__ */ A.jsx("div", { children: "Loading..." });
  if (i)
    return /* @__PURE__ */ A.jsxs("div", { children: [
      "Error: ",
      i
    ] });
  const u = xg(e, "description");
  return /* @__PURE__ */ A.jsxs(A.Fragment, { children: [
    /* @__PURE__ */ A.jsx(Fn, { size: "40rem", children: /* @__PURE__ */ A.jsx(pr, { gap: "xs", pt: "md", children: Object.entries(u).map(([p, d]) => /* @__PURE__ */ A.jsxs(pr, { gap: "xs", children: [
      /* @__PURE__ */ A.jsxs(Pe, { grow: !0, justify: "space-between", children: [
        /* @__PURE__ */ A.jsx(
          xr,
          {
            fw: 600,
            fs: "xl",
            style: { cursor: "pointer" },
            onClick: () => f(p),
            children: p.length > 0 ? `Description: ${p}` : "No description"
          }
        ),
        /* @__PURE__ */ A.jsx(
          Je,
          {
            variant: "outline",
            color: "gray",
            radius: "xl",
            onClick: () => f(p),
            children: l[p] ? /* @__PURE__ */ A.jsx(hg, { size: 18 }) : /* @__PURE__ */ A.jsx(_g, { size: 18 })
          }
        )
      ] }),
      /* @__PURE__ */ A.jsx(Sg, { category: p, items: d, opened: l, bbbr: r })
    ] }, p)) }) }),
    /* @__PURE__ */ A.jsx(Pg, {})
  ] });
}
function Cg() {
  return /* @__PURE__ */ A.jsx(ui, { theme: ig, children: /* @__PURE__ */ A.jsx(Rg, {}) });
}
Kr.createRoot(document.getElementById("root")).render(/* @__PURE__ */ A.jsx(Cg, {}));
