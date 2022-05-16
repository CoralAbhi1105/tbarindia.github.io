/*
 Copyright (C) Federico Zivolo 2019
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */ (function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.Popper = t());
})(this, function () {
  "use strict";
  function e(e) {
    return e && "[object Function]" === {}.toString.call(e);
  }
  function t(e, t) {
    if (1 !== e.nodeType) return [];
    var o = e.ownerDocument.defaultView,
      n = o.getComputedStyle(e, null);
    return t ? n[t] : n;
  }
  function o(e) {
    return "HTML" === e.nodeName ? e : e.parentNode || e.host;
  }
  function n(e) {
    if (!e) return document.body;
    switch (e.nodeName) {
      case "HTML":
      case "BODY":
        return e.ownerDocument.body;
      case "#document":
        return e.body;
    }
    var i = t(e),
      r = i.overflow,
      p = i.overflowX,
      s = i.overflowY;
    return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e));
  }
  function i(e) {
    return e && e.referenceNode ? e.referenceNode : e;
  }
  function r(e) {
    return 11 === e ? re : 10 === e ? pe : re || pe;
  }
  function p(e) {
    if (!e) return document.documentElement;
    for (
      var o = r(10) ? document.body : null, n = e.offsetParent || null;
      n === o && e.nextElementSibling;

    )
      n = (e = e.nextElementSibling).offsetParent;
    var i = n && n.nodeName;
    return i && "BODY" !== i && "HTML" !== i
      ? -1 !== ["TH", "TD", "TABLE"].indexOf(n.nodeName) &&
        "static" === t(n, "position")
        ? p(n)
        : n
      : e
      ? e.ownerDocument.documentElement
      : document.documentElement;
  }
  function s(e) {
    var t = e.nodeName;
    return "BODY" !== t && ("HTML" === t || p(e.firstElementChild) === e);
  }
  function d(e) {
    return null === e.parentNode ? e : d(e.parentNode);
  }
  function a(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
    var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
      n = o ? e : t,
      i = o ? t : e,
      r = document.createRange();
    r.setStart(n, 0), r.setEnd(i, 0);
    var l = r.commonAncestorContainer;
    if ((e !== l && t !== l) || n.contains(i)) return s(l) ? l : p(l);
    var f = d(e);
    return f.host ? a(f.host, t) : a(e, d(t).host);
  }
  function l(e) {
    var t =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "top",
      o = "top" === t ? "scrollTop" : "scrollLeft",
      n = e.nodeName;
    if ("BODY" === n || "HTML" === n) {
      var i = e.ownerDocument.documentElement,
        r = e.ownerDocument.scrollingElement || i;
      return r[o];
    }
    return e[o];
  }
  function f(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      n = l(t, "top"),
      i = l(t, "left"),
      r = o ? -1 : 1;
    return (
      (e.top += n * r),
      (e.bottom += n * r),
      (e.left += i * r),
      (e.right += i * r),
      e
    );
  }
  function m(e, t) {
    var o = "x" === t ? "Left" : "Top",
      n = "Left" == o ? "Right" : "Bottom";
    return (
      parseFloat(e["border" + o + "Width"], 10) +
      parseFloat(e["border" + n + "Width"], 10)
    );
  }
  function h(e, t, o, n) {
    return ee(
      t["offset" + e],
      t["scroll" + e],
      o["client" + e],
      o["offset" + e],
      o["scroll" + e],
      r(10)
        ? parseInt(o["offset" + e]) +
            parseInt(n["margin" + ("Height" === e ? "Top" : "Left")]) +
            parseInt(n["margin" + ("Height" === e ? "Bottom" : "Right")])
        : 0
    );
  }
  function c(e) {
    var t = e.body,
      o = e.documentElement,
      n = r(10) && getComputedStyle(o);
    return { height: h("Height", t, o, n), width: h("Width", t, o, n) };
  }
  function g(e) {
    return le({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }
  function u(e) {
    var o = {};
    try {
      if (r(10)) {
        o = e.getBoundingClientRect();
        var n = l(e, "top"),
          i = l(e, "left");
        (o.top += n), (o.left += i), (o.bottom += n), (o.right += i);
      } else o = e.getBoundingClientRect();
    } catch (t) {}
    var p = {
        left: o.left,
        top: o.top,
        width: o.right - o.left,
        height: o.bottom - o.top,
      },
      s = "HTML" === e.nodeName ? c(e.ownerDocument) : {},
      d = s.width || e.clientWidth || p.width,
      a = s.height || e.clientHeight || p.height,
      f = e.offsetWidth - d,
      h = e.offsetHeight - a;
    if (f || h) {
      var u = t(e);
      (f -= m(u, "x")), (h -= m(u, "y")), (p.width -= f), (p.height -= h);
    }
    return g(p);
  }
  function b(e, o) {
    var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
      p = r(10),
      s = "HTML" === o.nodeName,
      d = u(e),
      a = u(o),
      l = n(e),
      m = t(o),
      h = parseFloat(m.borderTopWidth, 10),
      c = parseFloat(m.borderLeftWidth, 10);
    i && s && ((a.top = ee(a.top, 0)), (a.left = ee(a.left, 0)));
    var b = g({
      top: d.top - a.top - h,
      left: d.left - a.left - c,
      width: d.width,
      height: d.height,
    });
    if (((b.marginTop = 0), (b.marginLeft = 0), !p && s)) {
      var w = parseFloat(m.marginTop, 10),
        y = parseFloat(m.marginLeft, 10);
      (b.top -= h - w),
        (b.bottom -= h - w),
        (b.left -= c - y),
        (b.right -= c - y),
        (b.marginTop = w),
        (b.marginLeft = y);
    }
    return (
      (p && !i ? o.contains(l) : o === l && "BODY" !== l.nodeName) &&
        (b = f(b, o)),
      b
    );
  }
  function w(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = e.ownerDocument.documentElement,
      n = b(e, o),
      i = ee(o.clientWidth, window.innerWidth || 0),
      r = ee(o.clientHeight, window.innerHeight || 0),
      p = t ? 0 : l(o),
      s = t ? 0 : l(o, "left"),
      d = {
        top: p - n.top + n.marginTop,
        left: s - n.left + n.marginLeft,
        width: i,
        height: r,
      };
    return g(d);
  }
  function y(e) {
    var n = e.nodeName;
    if ("BODY" === n || "HTML" === n) return !1;
    if ("fixed" === t(e, "position")) return !0;
    var i = o(e);
    return !!i && y(i);
  }
  function E(e) {
    if (!e || !e.parentElement || r()) return document.documentElement;
    for (var o = e.parentElement; o && "none" === t(o, "transform"); )
      o = o.parentElement;
    return o || document.documentElement;
  }
  function v(e, t, r, p) {
    var s = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
      d = { top: 0, left: 0 },
      l = s ? E(e) : a(e, i(t));
    if ("viewport" === p) d = w(l, s);
    else {
      var f;
      "scrollParent" === p
        ? ((f = n(o(t))),
          "BODY" === f.nodeName && (f = e.ownerDocument.documentElement))
        : "window" === p
        ? (f = e.ownerDocument.documentElement)
        : (f = p);
      var m = b(f, l, s);
      if ("HTML" === f.nodeName && !y(l)) {
        var h = c(e.ownerDocument),
          g = h.height,
          u = h.width;
        (d.top += m.top - m.marginTop),
          (d.bottom = g + m.top),
          (d.left += m.left - m.marginLeft),
          (d.right = u + m.left);
      } else d = m;
    }
    r = r || 0;
    var v = "number" == typeof r;
    return (
      (d.left += v ? r : r.left || 0),
      (d.top += v ? r : r.top || 0),
      (d.right -= v ? r : r.right || 0),
      (d.bottom -= v ? r : r.bottom || 0),
      d
    );
  }
  function x(e) {
    var t = e.width,
      o = e.height;
    return t * o;
  }
  function O(e, t, o, n, i) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
    if (-1 === e.indexOf("auto")) return e;
    var p = v(o, n, r, i),
      s = {
        top: { width: p.width, height: t.top - p.top },
        right: { width: p.right - t.right, height: p.height },
        bottom: { width: p.width, height: p.bottom - t.bottom },
        left: { width: t.left - p.left, height: p.height },
      },
      d = Object.keys(s)
        .map(function (e) {
          return le({ key: e }, s[e], { area: x(s[e]) });
        })
        .sort(function (e, t) {
          return t.area - e.area;
        }),
      a = d.filter(function (e) {
        var t = e.width,
          n = e.height;
        return t >= o.clientWidth && n >= o.clientHeight;
      }),
      l = 0 < a.length ? a[0].key : d[0].key,
      f = e.split("-")[1];
    return l + (f ? "-" + f : "");
  }
  function L(e, t, o) {
    var n =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
      r = n ? E(t) : a(t, i(o));
    return b(o, r, n);
  }
  function S(e) {
    var t = e.ownerDocument.defaultView,
      o = t.getComputedStyle(e),
      n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
      i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
      r = { width: e.offsetWidth + i, height: e.offsetHeight + n };
    return r;
  }
  function T(e) {
    var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
    return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }
  function C(e, t, o) {
    o = o.split("-")[0];
    var n = S(e),
      i = { width: n.width, height: n.height },
      r = -1 !== ["right", "left"].indexOf(o),
      p = r ? "top" : "left",
      s = r ? "left" : "top",
      d = r ? "height" : "width",
      a = r ? "width" : "height";
    return (
      (i[p] = t[p] + t[d] / 2 - n[d] / 2),
      (i[s] = o === s ? t[s] - n[a] : t[T(s)]),
      i
    );
  }
  function D(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }
  function N(e, t, o) {
    if (Array.prototype.findIndex)
      return e.findIndex(function (e) {
        return e[t] === o;
      });
    var n = D(e, function (e) {
      return e[t] === o;
    });
    return e.indexOf(n);
  }
  function P(t, o, n) {
    var i = void 0 === n ? t : t.slice(0, N(t, "name", n));
    return (
      i.forEach(function (t) {
        t["function"] &&
          console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
        var n = t["function"] || t.fn;
        t.enabled &&
          e(n) &&
          ((o.offsets.popper = g(o.offsets.popper)),
          (o.offsets.reference = g(o.offsets.reference)),
          (o = n(o, t)));
      }),
      o
    );
  }
  function k() {
    if (!this.state.isDestroyed) {
      var e = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: !1,
        offsets: {},
      };
      (e.offsets.reference = L(
        this.state,
        this.popper,
        this.reference,
        this.options.positionFixed
      )),
        (e.placement = O(
          this.options.placement,
          e.offsets.reference,
          this.popper,
          this.reference,
          this.options.modifiers.flip.boundariesElement,
          this.options.modifiers.flip.padding
        )),
        (e.originalPlacement = e.placement),
        (e.positionFixed = this.options.positionFixed),
        (e.offsets.popper = C(this.popper, e.offsets.reference, e.placement)),
        (e.offsets.popper.position = this.options.positionFixed
          ? "fixed"
          : "absolute"),
        (e = P(this.modifiers, e)),
        this.state.isCreated
          ? this.options.onUpdate(e)
          : ((this.state.isCreated = !0), this.options.onCreate(e));
    }
  }
  function W(e, t) {
    return e.some(function (e) {
      var o = e.name,
        n = e.enabled;
      return n && o === t;
    });
  }
  function B(e) {
    for (
      var t = [!1, "ms", "Webkit", "Moz", "O"],
        o = e.charAt(0).toUpperCase() + e.slice(1),
        n = 0;
      n < t.length;
      n++
    ) {
      var i = t[n],
        r = i ? "" + i + o : e;
      if ("undefined" != typeof document.body.style[r]) return r;
    }
    return null;
  }
  function H() {
    return (
      (this.state.isDestroyed = !0),
      W(this.modifiers, "applyStyle") &&
        (this.popper.removeAttribute("x-placement"),
        (this.popper.style.position = ""),
        (this.popper.style.top = ""),
        (this.popper.style.left = ""),
        (this.popper.style.right = ""),
        (this.popper.style.bottom = ""),
        (this.popper.style.willChange = ""),
        (this.popper.style[B("transform")] = "")),
      this.disableEventListeners(),
      this.options.removeOnDestroy &&
        this.popper.parentNode.removeChild(this.popper),
      this
    );
  }
  function A(e) {
    var t = e.ownerDocument;
    return t ? t.defaultView : window;
  }
  function M(e, t, o, i) {
    var r = "BODY" === e.nodeName,
      p = r ? e.ownerDocument.defaultView : e;
    p.addEventListener(t, o, { passive: !0 }),
      r || M(n(p.parentNode), t, o, i),
      i.push(p);
  }
  function F(e, t, o, i) {
    (o.updateBound = i),
      A(e).addEventListener("resize", o.updateBound, { passive: !0 });
    var r = n(e);
    return (
      M(r, "scroll", o.updateBound, o.scrollParents),
      (o.scrollElement = r),
      (o.eventsEnabled = !0),
      o
    );
  }
  function I() {
    this.state.eventsEnabled ||
      (this.state = F(
        this.reference,
        this.options,
        this.state,
        this.scheduleUpdate
      ));
  }
  function R(e, t) {
    return (
      A(e).removeEventListener("resize", t.updateBound),
      t.scrollParents.forEach(function (e) {
        e.removeEventListener("scroll", t.updateBound);
      }),
      (t.updateBound = null),
      (t.scrollParents = []),
      (t.scrollElement = null),
      (t.eventsEnabled = !1),
      t
    );
  }
  function U() {
    this.state.eventsEnabled &&
      (cancelAnimationFrame(this.scheduleUpdate),
      (this.state = R(this.reference, this.state)));
  }
  function Y(e) {
    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }
  function V(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = "";
      -1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(o) &&
        Y(t[o]) &&
        (n = "px"),
        (e.style[o] = t[o] + n);
    });
  }
  function j(e, t) {
    Object.keys(t).forEach(function (o) {
      var n = t[o];
      !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }
  function q(e, t) {
    var o = e.offsets,
      n = o.popper,
      i = o.reference,
      r = $,
      p = function (e) {
        return e;
      },
      s = r(i.width),
      d = r(n.width),
      a = -1 !== ["left", "right"].indexOf(e.placement),
      l = -1 !== e.placement.indexOf("-"),
      f = t ? (a || l || s % 2 == d % 2 ? r : Z) : p,
      m = t ? r : p;
    return {
      left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
      top: m(n.top),
      bottom: m(n.bottom),
      right: f(n.right),
    };
  }
  function K(e, t, o) {
    var n = D(e, function (e) {
        var o = e.name;
        return o === t;
      }),
      i =
        !!n &&
        e.some(function (e) {
          return e.name === o && e.enabled && e.order < n.order;
        });
    if (!i) {
      var r = "`" + t + "`";
      console.warn(
        "`" +
          o +
          "`" +
          " modifier is required by " +
          r +
          " modifier in order to work, be sure to include it before " +
          r +
          "!"
      );
    }
    return i;
  }
  function z(e) {
    return "end" === e ? "start" : "start" === e ? "end" : e;
  }
  function G(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
      o = he.indexOf(e),
      n = he.slice(o + 1).concat(he.slice(0, o));
    return t ? n.reverse() : n;
  }
  function _(e, t, o, n) {
    var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
      r = +i[1],
      p = i[2];
    if (!r) return e;
    if (0 === p.indexOf("%")) {
      var s;
      switch (p) {
        case "%p":
          s = o;
          break;
        case "%":
        case "%r":
        default:
          s = n;
      }
      var d = g(s);
      return (d[t] / 100) * r;
    }
    if ("vh" === p || "vw" === p) {
      var a;
      return (
        (a =
          "vh" === p
            ? ee(document.documentElement.clientHeight, window.innerHeight || 0)
            : ee(document.documentElement.clientWidth, window.innerWidth || 0)),
        (a / 100) * r
      );
    }
    return r;
  }
  function X(e, t, o, n) {
    var i = [0, 0],
      r = -1 !== ["right", "left"].indexOf(n),
      p = e.split(/(\+|\-)/).map(function (e) {
        return e.trim();
      }),
      s = p.indexOf(
        D(p, function (e) {
          return -1 !== e.search(/,|\s/);
        })
      );
    p[s] &&
      -1 === p[s].indexOf(",") &&
      console.warn(
        "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
      );
    var d = /\s*,\s*|\s+/,
      a =
        -1 === s
          ? [p]
          : [
              p.slice(0, s).concat([p[s].split(d)[0]]),
              [p[s].split(d)[1]].concat(p.slice(s + 1)),
            ];
    return (
      (a = a.map(function (e, n) {
        var i = (1 === n ? !r : r) ? "height" : "width",
          p = !1;
        return e
          .reduce(function (e, t) {
            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t)
              ? ((e[e.length - 1] = t), (p = !0), e)
              : p
              ? ((e[e.length - 1] += t), (p = !1), e)
              : e.concat(t);
          }, [])
          .map(function (e) {
            return _(e, i, t, o);
          });
      })),
      a.forEach(function (e, t) {
        e.forEach(function (o, n) {
          Y(o) && (i[t] += o * ("-" === e[n - 1] ? -1 : 1));
        });
      }),
      i
    );
  }
  function J(e, t) {
    var o,
      n = t.offset,
      i = e.placement,
      r = e.offsets,
      p = r.popper,
      s = r.reference,
      d = i.split("-")[0];
    return (
      (o = Y(+n) ? [+n, 0] : X(n, p, s, d)),
      "left" === d
        ? ((p.top += o[0]), (p.left -= o[1]))
        : "right" === d
        ? ((p.top += o[0]), (p.left += o[1]))
        : "top" === d
        ? ((p.left += o[0]), (p.top -= o[1]))
        : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
      (e.popper = p),
      e
    );
  }
  var Q = Math.min,
    Z = Math.floor,
    $ = Math.round,
    ee = Math.max,
    te =
      "undefined" != typeof window &&
      "undefined" != typeof document &&
      "undefined" != typeof navigator,
    oe = (function () {
      for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
        if (te && 0 <= navigator.userAgent.indexOf(e[t])) return 1;
      return 0;
    })(),
    ne = te && window.Promise,
    ie = ne
      ? function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              window.Promise.resolve().then(function () {
                (t = !1), e();
              }));
          };
        }
      : function (e) {
          var t = !1;
          return function () {
            t ||
              ((t = !0),
              setTimeout(function () {
                (t = !1), e();
              }, oe));
          };
        },
    re = te && !!(window.MSInputMethodContext && document.documentMode),
    pe = te && /MSIE 10/.test(navigator.userAgent),
    se = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    de = (function () {
      function e(e, t) {
        for (var o, n = 0; n < t.length; n++)
          (o = t[n]),
            (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            "value" in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o);
      }
      return function (t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
      };
    })(),
    ae = function (e, t, o) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: o,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = o),
        e
      );
    },
    le =
      Object.assign ||
      function (e) {
        for (var t, o = 1; o < arguments.length; o++)
          for (var n in ((t = arguments[o]), t))
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e;
      },
    fe = te && /Firefox/i.test(navigator.userAgent),
    me = [
      "auto-start",
      "auto",
      "auto-end",
      "top-start",
      "top",
      "top-end",
      "right-start",
      "right",
      "right-end",
      "bottom-end",
      "bottom",
      "bottom-start",
      "left-end",
      "left",
      "left-start",
    ],
    he = me.slice(3),
    ce = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise",
    },
    ge = (function () {
      function t(o, n) {
        var i = this,
          r =
            2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
        se(this, t),
          (this.scheduleUpdate = function () {
            return requestAnimationFrame(i.update);
          }),
          (this.update = ie(this.update.bind(this))),
          (this.options = le({}, t.Defaults, r)),
          (this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }),
          (this.reference = o && o.jquery ? o[0] : o),
          (this.popper = n && n.jquery ? n[0] : n),
          (this.options.modifiers = {}),
          Object.keys(le({}, t.Defaults.modifiers, r.modifiers)).forEach(
            function (e) {
              i.options.modifiers[e] = le(
                {},
                t.Defaults.modifiers[e] || {},
                r.modifiers ? r.modifiers[e] : {}
              );
            }
          ),
          (this.modifiers = Object.keys(this.options.modifiers)
            .map(function (e) {
              return le({ name: e }, i.options.modifiers[e]);
            })
            .sort(function (e, t) {
              return e.order - t.order;
            })),
          this.modifiers.forEach(function (t) {
            t.enabled &&
              e(t.onLoad) &&
              t.onLoad(i.reference, i.popper, i.options, t, i.state);
          }),
          this.update();
        var p = this.options.eventsEnabled;
        p && this.enableEventListeners(), (this.state.eventsEnabled = p);
      }
      return (
        de(t, [
          {
            key: "update",
            value: function () {
              return k.call(this);
            },
          },
          {
            key: "destroy",
            value: function () {
              return H.call(this);
            },
          },
          {
            key: "enableEventListeners",
            value: function () {
              return I.call(this);
            },
          },
          {
            key: "disableEventListeners",
            value: function () {
              return U.call(this);
            },
          },
        ]),
        t
      );
    })();
  return (
    (ge.Utils = ("undefined" == typeof window ? global : window).PopperUtils),
    (ge.placements = me),
    (ge.Defaults = {
      placement: "bottom",
      positionFixed: !1,
      eventsEnabled: !0,
      removeOnDestroy: !1,
      onCreate: function () {},
      onUpdate: function () {},
      modifiers: {
        shift: {
          order: 100,
          enabled: !0,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              n = t.split("-")[1];
            if (n) {
              var i = e.offsets,
                r = i.reference,
                p = i.popper,
                s = -1 !== ["bottom", "top"].indexOf(o),
                d = s ? "left" : "top",
                a = s ? "width" : "height",
                l = {
                  start: ae({}, d, r[d]),
                  end: ae({}, d, r[d] + r[a] - p[a]),
                };
              e.offsets.popper = le({}, p, l[n]);
            }
            return e;
          },
        },
        offset: { order: 200, enabled: !0, fn: J, offset: 0 },
        preventOverflow: {
          order: 300,
          enabled: !0,
          fn: function (e, t) {
            var o = t.boundariesElement || p(e.instance.popper);
            e.instance.reference === o && (o = p(o));
            var n = B("transform"),
              i = e.instance.popper.style,
              r = i.top,
              s = i.left,
              d = i[n];
            (i.top = ""), (i.left = ""), (i[n] = "");
            var a = v(
              e.instance.popper,
              e.instance.reference,
              t.padding,
              o,
              e.positionFixed
            );
            (i.top = r), (i.left = s), (i[n] = d), (t.boundaries = a);
            var l = t.priority,
              f = e.offsets.popper,
              m = {
                primary: function (e) {
                  var o = f[e];
                  return (
                    f[e] < a[e] &&
                      !t.escapeWithReference &&
                      (o = ee(f[e], a[e])),
                    ae({}, e, o)
                  );
                },
                secondary: function (e) {
                  var o = "right" === e ? "left" : "top",
                    n = f[o];
                  return (
                    f[e] > a[e] &&
                      !t.escapeWithReference &&
                      (n = Q(
                        f[o],
                        a[e] - ("right" === e ? f.width : f.height)
                      )),
                    ae({}, o, n)
                  );
                },
              };
            return (
              l.forEach(function (e) {
                var t =
                  -1 === ["left", "top"].indexOf(e) ? "secondary" : "primary";
                f = le({}, f, m[t](e));
              }),
              (e.offsets.popper = f),
              e
            );
          },
          priority: ["left", "right", "top", "bottom"],
          padding: 5,
          boundariesElement: "scrollParent",
        },
        keepTogether: {
          order: 400,
          enabled: !0,
          fn: function (e) {
            var t = e.offsets,
              o = t.popper,
              n = t.reference,
              i = e.placement.split("-")[0],
              r = Z,
              p = -1 !== ["top", "bottom"].indexOf(i),
              s = p ? "right" : "bottom",
              d = p ? "left" : "top",
              a = p ? "width" : "height";
            return (
              o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]),
              o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])),
              e
            );
          },
        },
        arrow: {
          order: 500,
          enabled: !0,
          fn: function (e, o) {
            var n;
            if (!K(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var i = o.element;
            if ("string" == typeof i) {
              if (((i = e.instance.popper.querySelector(i)), !i)) return e;
            } else if (!e.instance.popper.contains(i))
              return (
                console.warn(
                  "WARNING: `arrow.element` must be child of its popper element!"
                ),
                e
              );
            var r = e.placement.split("-")[0],
              p = e.offsets,
              s = p.popper,
              d = p.reference,
              a = -1 !== ["left", "right"].indexOf(r),
              l = a ? "height" : "width",
              f = a ? "Top" : "Left",
              m = f.toLowerCase(),
              h = a ? "left" : "top",
              c = a ? "bottom" : "right",
              u = S(i)[l];
            d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)),
              d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]),
              (e.offsets.popper = g(e.offsets.popper));
            var b = d[m] + d[l] / 2 - u / 2,
              w = t(e.instance.popper),
              y = parseFloat(w["margin" + f], 10),
              E = parseFloat(w["border" + f + "Width"], 10),
              v = b - e.offsets.popper[m] - y - E;
            return (
              (v = ee(Q(s[l] - u, v), 0)),
              (e.arrowElement = i),
              (e.offsets.arrow = ((n = {}), ae(n, m, $(v)), ae(n, h, ""), n)),
              e
            );
          },
          element: "[x-arrow]",
        },
        flip: {
          order: 600,
          enabled: !0,
          fn: function (e, t) {
            if (W(e.instance.modifiers, "inner")) return e;
            if (e.flipped && e.placement === e.originalPlacement) return e;
            var o = v(
                e.instance.popper,
                e.instance.reference,
                t.padding,
                t.boundariesElement,
                e.positionFixed
              ),
              n = e.placement.split("-")[0],
              i = T(n),
              r = e.placement.split("-")[1] || "",
              p = [];
            switch (t.behavior) {
              case ce.FLIP:
                p = [n, i];
                break;
              case ce.CLOCKWISE:
                p = G(n);
                break;
              case ce.COUNTERCLOCKWISE:
                p = G(n, !0);
                break;
              default:
                p = t.behavior;
            }
            return (
              p.forEach(function (s, d) {
                if (n !== s || p.length === d + 1) return e;
                (n = e.placement.split("-")[0]), (i = T(n));
                var a = e.offsets.popper,
                  l = e.offsets.reference,
                  f = Z,
                  m =
                    ("left" === n && f(a.right) > f(l.left)) ||
                    ("right" === n && f(a.left) < f(l.right)) ||
                    ("top" === n && f(a.bottom) > f(l.top)) ||
                    ("bottom" === n && f(a.top) < f(l.bottom)),
                  h = f(a.left) < f(o.left),
                  c = f(a.right) > f(o.right),
                  g = f(a.top) < f(o.top),
                  u = f(a.bottom) > f(o.bottom),
                  b =
                    ("left" === n && h) ||
                    ("right" === n && c) ||
                    ("top" === n && g) ||
                    ("bottom" === n && u),
                  w = -1 !== ["top", "bottom"].indexOf(n),
                  y =
                    !!t.flipVariations &&
                    ((w && "start" === r && h) ||
                      (w && "end" === r && c) ||
                      (!w && "start" === r && g) ||
                      (!w && "end" === r && u)),
                  E =
                    !!t.flipVariationsByContent &&
                    ((w && "start" === r && c) ||
                      (w && "end" === r && h) ||
                      (!w && "start" === r && u) ||
                      (!w && "end" === r && g)),
                  v = y || E;
                (m || b || v) &&
                  ((e.flipped = !0),
                  (m || b) && (n = p[d + 1]),
                  v && (r = z(r)),
                  (e.placement = n + (r ? "-" + r : "")),
                  (e.offsets.popper = le(
                    {},
                    e.offsets.popper,
                    C(e.instance.popper, e.offsets.reference, e.placement)
                  )),
                  (e = P(e.instance.modifiers, e, "flip")));
              }),
              e
            );
          },
          behavior: "flip",
          padding: 5,
          boundariesElement: "viewport",
          flipVariations: !1,
          flipVariationsByContent: !1,
        },
        inner: {
          order: 700,
          enabled: !1,
          fn: function (e) {
            var t = e.placement,
              o = t.split("-")[0],
              n = e.offsets,
              i = n.popper,
              r = n.reference,
              p = -1 !== ["left", "right"].indexOf(o),
              s = -1 === ["top", "left"].indexOf(o);
            return (
              (i[p ? "left" : "top"] =
                r[o] - (s ? i[p ? "width" : "height"] : 0)),
              (e.placement = T(t)),
              (e.offsets.popper = g(i)),
              e
            );
          },
        },
        hide: {
          order: 800,
          enabled: !0,
          fn: function (e) {
            if (!K(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference,
              o = D(e.instance.modifiers, function (e) {
                return "preventOverflow" === e.name;
              }).boundaries;
            if (
              t.bottom < o.top ||
              t.left > o.right ||
              t.top > o.bottom ||
              t.right < o.left
            ) {
              if (!0 === e.hide) return e;
              (e.hide = !0), (e.attributes["x-out-of-boundaries"] = "");
            } else {
              if (!1 === e.hide) return e;
              (e.hide = !1), (e.attributes["x-out-of-boundaries"] = !1);
            }
            return e;
          },
        },
        computeStyle: {
          order: 850,
          enabled: !0,
          fn: function (e, t) {
            var o = t.x,
              n = t.y,
              i = e.offsets.popper,
              r = D(e.instance.modifiers, function (e) {
                return "applyStyle" === e.name;
              }).gpuAcceleration;
            void 0 !== r &&
              console.warn(
                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
              );
            var s,
              d,
              a = void 0 === r ? t.gpuAcceleration : r,
              l = p(e.instance.popper),
              f = u(l),
              m = { position: i.position },
              h = q(e, 2 > window.devicePixelRatio || !fe),
              c = "bottom" === o ? "top" : "bottom",
              g = "right" === n ? "left" : "right",
              b = B("transform");
            if (
              ((d =
                "bottom" == c
                  ? "HTML" === l.nodeName
                    ? -l.clientHeight + h.bottom
                    : -f.height + h.bottom
                  : h.top),
              (s =
                "right" == g
                  ? "HTML" === l.nodeName
                    ? -l.clientWidth + h.right
                    : -f.width + h.right
                  : h.left),
              a && b)
            )
              (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                (m[c] = 0),
                (m[g] = 0),
                (m.willChange = "transform");
            else {
              var w = "bottom" == c ? -1 : 1,
                y = "right" == g ? -1 : 1;
              (m[c] = d * w), (m[g] = s * y), (m.willChange = c + ", " + g);
            }
            var E = { "x-placement": e.placement };
            return (
              (e.attributes = le({}, E, e.attributes)),
              (e.styles = le({}, m, e.styles)),
              (e.arrowStyles = le({}, e.offsets.arrow, e.arrowStyles)),
              e
            );
          },
          gpuAcceleration: !0,
          x: "bottom",
          y: "right",
        },
        applyStyle: {
          order: 900,
          enabled: !0,
          fn: function (e) {
            return (
              V(e.instance.popper, e.styles),
              j(e.instance.popper, e.attributes),
              e.arrowElement &&
                Object.keys(e.arrowStyles).length &&
                V(e.arrowElement, e.arrowStyles),
              e
            );
          },
          onLoad: function (e, t, o, n, i) {
            var r = L(i, t, e, o.positionFixed),
              p = O(
                o.placement,
                r,
                t,
                e,
                o.modifiers.flip.boundariesElement,
                o.modifiers.flip.padding
              );
            return (
              t.setAttribute("x-placement", p),
              V(t, { position: o.positionFixed ? "fixed" : "absolute" }),
              o
            );
          },
          gpuAcceleration: void 0,
        },
      },
    }),
    ge
  );
});

/*!
 * Bootstrap v4.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? e(exports, require("jquery"), require("popper.js"))
    : "function" == typeof define && define.amd
    ? define(["exports", "jquery", "popper.js"], e)
    : e(((t = t || self).bootstrap = {}), t.jQuery, t.Popper);
})(this, function (t, g, u) {
  "use strict";
  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function s(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }
  function e(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(e);
      t &&
        (i = i.filter(function (t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        n.push.apply(n, i);
    }
    return n;
  }
  function l(o) {
    for (var t = 1; t < arguments.length; t++) {
      var r = null != arguments[t] ? arguments[t] : {};
      t % 2
        ? e(Object(r), !0).forEach(function (t) {
            var e, n, i;
            (e = o),
              (i = r[(n = t)]),
              n in e
                ? Object.defineProperty(e, n, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[n] = i);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(o, Object.getOwnPropertyDescriptors(r))
        : e(Object(r)).forEach(function (t) {
            Object.defineProperty(o, t, Object.getOwnPropertyDescriptor(r, t));
          });
    }
    return o;
  }
  (g = g && g.hasOwnProperty("default") ? g.default : g),
    (u = u && u.hasOwnProperty("default") ? u.default : u);
  var n = "transitionend";
  function o(t) {
    var e = this,
      n = !1;
    return (
      g(this).one(_.TRANSITION_END, function () {
        n = !0;
      }),
      setTimeout(function () {
        n || _.triggerTransitionEnd(e);
      }, t),
      this
    );
  }
  var _ = {
    TRANSITION_END: "bsTransitionEnd",
    getUID: function (t) {
      for (; (t += ~~(1e6 * Math.random())), document.getElementById(t); );
      return t;
    },
    getSelectorFromElement: function (t) {
      var e = t.getAttribute("data-target");
      if (!e || "#" === e) {
        var n = t.getAttribute("href");
        e = n && "#" !== n ? n.trim() : "";
      }
      try {
        return document.querySelector(e) ? e : null;
      } catch (t) {
        return null;
      }
    },
    getTransitionDurationFromElement: function (t) {
      if (!t) return 0;
      var e = g(t).css("transition-duration"),
        n = g(t).css("transition-delay"),
        i = parseFloat(e),
        o = parseFloat(n);
      return i || o
        ? ((e = e.split(",")[0]),
          (n = n.split(",")[0]),
          1e3 * (parseFloat(e) + parseFloat(n)))
        : 0;
    },
    reflow: function (t) {
      return t.offsetHeight;
    },
    triggerTransitionEnd: function (t) {
      g(t).trigger(n);
    },
    supportsTransitionEnd: function () {
      return Boolean(n);
    },
    isElement: function (t) {
      return (t[0] || t).nodeType;
    },
    typeCheckConfig: function (t, e, n) {
      for (var i in n)
        if (Object.prototype.hasOwnProperty.call(n, i)) {
          var o = n[i],
            r = e[i],
            s =
              r && _.isElement(r)
                ? "element"
                : ((a = r),
                  {}.toString
                    .call(a)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase());
          if (!new RegExp(o).test(s))
            throw new Error(
              t.toUpperCase() +
                ': Option "' +
                i +
                '" provided type "' +
                s +
                '" but expected type "' +
                o +
                '".'
            );
        }
      var a;
    },
    findShadowRoot: function (t) {
      if (!document.documentElement.attachShadow) return null;
      if ("function" != typeof t.getRootNode)
        return t instanceof ShadowRoot
          ? t
          : t.parentNode
          ? _.findShadowRoot(t.parentNode)
          : null;
      var e = t.getRootNode();
      return e instanceof ShadowRoot ? e : null;
    },
    jQueryDetection: function () {
      if ("undefined" == typeof g)
        throw new TypeError(
          "Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript."
        );
      var t = g.fn.jquery.split(" ")[0].split(".");
      if (
        (t[0] < 2 && t[1] < 9) ||
        (1 === t[0] && 9 === t[1] && t[2] < 1) ||
        4 <= t[0]
      )
        throw new Error(
          "Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0"
        );
    },
  };
  _.jQueryDetection(),
    (g.fn.emulateTransitionEnd = o),
    (g.event.special[_.TRANSITION_END] = {
      bindType: n,
      delegateType: n,
      handle: function (t) {
        if (g(t.target).is(this))
          return t.handleObj.handler.apply(this, arguments);
      },
    });
  var r = "alert",
    a = "bs.alert",
    c = "." + a,
    h = g.fn[r],
    f = {
      CLOSE: "close" + c,
      CLOSED: "closed" + c,
      CLICK_DATA_API: "click" + c + ".data-api",
    },
    d = "alert",
    m = "fade",
    p = "show",
    v = (function () {
      function i(t) {
        this._element = t;
      }
      var t = i.prototype;
      return (
        (t.close = function (t) {
          var e = this._element;
          t && (e = this._getRootElement(t)),
            this._triggerCloseEvent(e).isDefaultPrevented() ||
              this._removeElement(e);
        }),
        (t.dispose = function () {
          g.removeData(this._element, a), (this._element = null);
        }),
        (t._getRootElement = function (t) {
          var e = _.getSelectorFromElement(t),
            n = !1;
          return (
            e && (n = document.querySelector(e)),
            (n = n || g(t).closest("." + d)[0])
          );
        }),
        (t._triggerCloseEvent = function (t) {
          var e = g.Event(f.CLOSE);
          return g(t).trigger(e), e;
        }),
        (t._removeElement = function (e) {
          var n = this;
          if ((g(e).removeClass(p), g(e).hasClass(m))) {
            var t = _.getTransitionDurationFromElement(e);
            g(e)
              .one(_.TRANSITION_END, function (t) {
                return n._destroyElement(e, t);
              })
              .emulateTransitionEnd(t);
          } else this._destroyElement(e);
        }),
        (t._destroyElement = function (t) {
          g(t).detach().trigger(f.CLOSED).remove();
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this),
              e = t.data(a);
            e || ((e = new i(this)), t.data(a, e)), "close" === n && e[n](this);
          });
        }),
        (i._handleDismiss = function (e) {
          return function (t) {
            t && t.preventDefault(), e.close(this);
          };
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
        ]),
        i
      );
    })();
  g(document).on(
    f.CLICK_DATA_API,
    '[data-dismiss="alert"]',
    v._handleDismiss(new v())
  ),
    (g.fn[r] = v._jQueryInterface),
    (g.fn[r].Constructor = v),
    (g.fn[r].noConflict = function () {
      return (g.fn[r] = h), v._jQueryInterface;
    });
  var y = "button",
    E = "bs.button",
    C = "." + E,
    T = ".data-api",
    b = g.fn[y],
    S = "active",
    D = "btn",
    I = "focus",
    w = '[data-toggle^="button"]',
    A = '[data-toggle="buttons"]',
    N = '[data-toggle="button"]',
    O = '[data-toggle="buttons"] .btn',
    k = 'input:not([type="hidden"])',
    P = ".active",
    L = ".btn",
    j = {
      CLICK_DATA_API: "click" + C + T,
      FOCUS_BLUR_DATA_API: "focus" + C + T + " blur" + C + T,
      LOAD_DATA_API: "load" + C + T,
    },
    H = (function () {
      function n(t) {
        this._element = t;
      }
      var t = n.prototype;
      return (
        (t.toggle = function () {
          var t = !0,
            e = !0,
            n = g(this._element).closest(A)[0];
          if (n) {
            var i = this._element.querySelector(k);
            if (i) {
              if ("radio" === i.type)
                if (i.checked && this._element.classList.contains(S)) t = !1;
                else {
                  var o = n.querySelector(P);
                  o && g(o).removeClass(S);
                }
              else
                "checkbox" === i.type
                  ? "LABEL" === this._element.tagName &&
                    i.checked === this._element.classList.contains(S) &&
                    (t = !1)
                  : (t = !1);
              t &&
                ((i.checked = !this._element.classList.contains(S)),
                g(i).trigger("change")),
                i.focus(),
                (e = !1);
            }
          }
          this._element.hasAttribute("disabled") ||
            this._element.classList.contains("disabled") ||
            (e &&
              this._element.setAttribute(
                "aria-pressed",
                !this._element.classList.contains(S)
              ),
            t && g(this._element).toggleClass(S));
        }),
        (t.dispose = function () {
          g.removeData(this._element, E), (this._element = null);
        }),
        (n._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data(E);
            t || ((t = new n(this)), g(this).data(E, t)),
              "toggle" === e && t[e]();
          });
        }),
        s(n, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
        ]),
        n
      );
    })();
  g(document)
    .on(j.CLICK_DATA_API, w, function (t) {
      var e = t.target;
      if (
        (g(e).hasClass(D) || (e = g(e).closest(L)[0]),
        !e || e.hasAttribute("disabled") || e.classList.contains("disabled"))
      )
        t.preventDefault();
      else {
        var n = e.querySelector(k);
        if (
          n &&
          (n.hasAttribute("disabled") || n.classList.contains("disabled"))
        )
          return void t.preventDefault();
        H._jQueryInterface.call(g(e), "toggle");
      }
    })
    .on(j.FOCUS_BLUR_DATA_API, w, function (t) {
      var e = g(t.target).closest(L)[0];
      g(e).toggleClass(I, /^focus(in)?$/.test(t.type));
    }),
    g(window).on(j.LOAD_DATA_API, function () {
      for (
        var t = [].slice.call(document.querySelectorAll(O)),
          e = 0,
          n = t.length;
        e < n;
        e++
      ) {
        var i = t[e],
          o = i.querySelector(k);
        o.checked || o.hasAttribute("checked")
          ? i.classList.add(S)
          : i.classList.remove(S);
      }
      for (
        var r = 0, s = (t = [].slice.call(document.querySelectorAll(N))).length;
        r < s;
        r++
      ) {
        var a = t[r];
        "true" === a.getAttribute("aria-pressed")
          ? a.classList.add(S)
          : a.classList.remove(S);
      }
    }),
    (g.fn[y] = H._jQueryInterface),
    (g.fn[y].Constructor = H),
    (g.fn[y].noConflict = function () {
      return (g.fn[y] = b), H._jQueryInterface;
    });
  var R = "carousel",
    x = "bs.carousel",
    F = "." + x,
    U = ".data-api",
    W = g.fn[R],
    q = {
      interval: 5e3,
      keyboard: !0,
      slide: !1,
      pause: "hover",
      wrap: !0,
      touch: !0,
    },
    M = {
      interval: "(number|boolean)",
      keyboard: "boolean",
      slide: "(boolean|string)",
      pause: "(string|boolean)",
      wrap: "boolean",
      touch: "boolean",
    },
    K = "next",
    Q = "prev",
    B = "left",
    V = "right",
    Y = {
      SLIDE: "slide" + F,
      SLID: "slid" + F,
      KEYDOWN: "keydown" + F,
      MOUSEENTER: "mouseenter" + F,
      MOUSELEAVE: "mouseleave" + F,
      TOUCHSTART: "touchstart" + F,
      TOUCHMOVE: "touchmove" + F,
      TOUCHEND: "touchend" + F,
      POINTERDOWN: "pointerdown" + F,
      POINTERUP: "pointerup" + F,
      DRAG_START: "dragstart" + F,
      LOAD_DATA_API: "load" + F + U,
      CLICK_DATA_API: "click" + F + U,
    },
    z = "carousel",
    X = "active",
    $ = "slide",
    G = "carousel-item-right",
    J = "carousel-item-left",
    Z = "carousel-item-next",
    tt = "carousel-item-prev",
    et = "pointer-event",
    nt = ".active",
    it = ".active.carousel-item",
    ot = ".carousel-item",
    rt = ".carousel-item img",
    st = ".carousel-item-next, .carousel-item-prev",
    at = ".carousel-indicators",
    lt = "[data-slide], [data-slide-to]",
    ct = '[data-ride="carousel"]',
    ht = { TOUCH: "touch", PEN: "pen" },
    ut = (function () {
      function r(t, e) {
        (this._items = null),
          (this._interval = null),
          (this._activeElement = null),
          (this._isPaused = !1),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this.touchStartX = 0),
          (this.touchDeltaX = 0),
          (this._config = this._getConfig(e)),
          (this._element = t),
          (this._indicatorsElement = this._element.querySelector(at)),
          (this._touchSupported =
            "ontouchstart" in document.documentElement ||
            0 < navigator.maxTouchPoints),
          (this._pointerEvent = Boolean(
            window.PointerEvent || window.MSPointerEvent
          )),
          this._addEventListeners();
      }
      var t = r.prototype;
      return (
        (t.next = function () {
          this._isSliding || this._slide(K);
        }),
        (t.nextWhenVisible = function () {
          !document.hidden &&
            g(this._element).is(":visible") &&
            "hidden" !== g(this._element).css("visibility") &&
            this.next();
        }),
        (t.prev = function () {
          this._isSliding || this._slide(Q);
        }),
        (t.pause = function (t) {
          t || (this._isPaused = !0),
            this._element.querySelector(st) &&
              (_.triggerTransitionEnd(this._element), this.cycle(!0)),
            clearInterval(this._interval),
            (this._interval = null);
        }),
        (t.cycle = function (t) {
          t || (this._isPaused = !1),
            this._interval &&
              (clearInterval(this._interval), (this._interval = null)),
            this._config.interval &&
              !this._isPaused &&
              (this._interval = setInterval(
                (document.visibilityState
                  ? this.nextWhenVisible
                  : this.next
                ).bind(this),
                this._config.interval
              ));
        }),
        (t.to = function (t) {
          var e = this;
          this._activeElement = this._element.querySelector(it);
          var n = this._getItemIndex(this._activeElement);
          if (!(t > this._items.length - 1 || t < 0))
            if (this._isSliding)
              g(this._element).one(Y.SLID, function () {
                return e.to(t);
              });
            else {
              if (n === t) return this.pause(), void this.cycle();
              var i = n < t ? K : Q;
              this._slide(i, this._items[t]);
            }
        }),
        (t.dispose = function () {
          g(this._element).off(F),
            g.removeData(this._element, x),
            (this._items = null),
            (this._config = null),
            (this._element = null),
            (this._interval = null),
            (this._isPaused = null),
            (this._isSliding = null),
            (this._activeElement = null),
            (this._indicatorsElement = null);
        }),
        (t._getConfig = function (t) {
          return (t = l({}, q, {}, t)), _.typeCheckConfig(R, t, M), t;
        }),
        (t._handleSwipe = function () {
          var t = Math.abs(this.touchDeltaX);
          if (!(t <= 40)) {
            var e = t / this.touchDeltaX;
            (this.touchDeltaX = 0) < e && this.prev(), e < 0 && this.next();
          }
        }),
        (t._addEventListeners = function () {
          var e = this;
          this._config.keyboard &&
            g(this._element).on(Y.KEYDOWN, function (t) {
              return e._keydown(t);
            }),
            "hover" === this._config.pause &&
              g(this._element)
                .on(Y.MOUSEENTER, function (t) {
                  return e.pause(t);
                })
                .on(Y.MOUSELEAVE, function (t) {
                  return e.cycle(t);
                }),
            this._config.touch && this._addTouchEventListeners();
        }),
        (t._addTouchEventListeners = function () {
          var e = this;
          if (this._touchSupported) {
            var n = function (t) {
                e._pointerEvent && ht[t.originalEvent.pointerType.toUpperCase()]
                  ? (e.touchStartX = t.originalEvent.clientX)
                  : e._pointerEvent ||
                    (e.touchStartX = t.originalEvent.touches[0].clientX);
              },
              i = function (t) {
                e._pointerEvent &&
                  ht[t.originalEvent.pointerType.toUpperCase()] &&
                  (e.touchDeltaX = t.originalEvent.clientX - e.touchStartX),
                  e._handleSwipe(),
                  "hover" === e._config.pause &&
                    (e.pause(),
                    e.touchTimeout && clearTimeout(e.touchTimeout),
                    (e.touchTimeout = setTimeout(function (t) {
                      return e.cycle(t);
                    }, 500 + e._config.interval)));
              };
            g(this._element.querySelectorAll(rt)).on(
              Y.DRAG_START,
              function (t) {
                return t.preventDefault();
              }
            ),
              this._pointerEvent
                ? (g(this._element).on(Y.POINTERDOWN, function (t) {
                    return n(t);
                  }),
                  g(this._element).on(Y.POINTERUP, function (t) {
                    return i(t);
                  }),
                  this._element.classList.add(et))
                : (g(this._element).on(Y.TOUCHSTART, function (t) {
                    return n(t);
                  }),
                  g(this._element).on(Y.TOUCHMOVE, function (t) {
                    return (function (t) {
                      t.originalEvent.touches &&
                      1 < t.originalEvent.touches.length
                        ? (e.touchDeltaX = 0)
                        : (e.touchDeltaX =
                            t.originalEvent.touches[0].clientX - e.touchStartX);
                    })(t);
                  }),
                  g(this._element).on(Y.TOUCHEND, function (t) {
                    return i(t);
                  }));
          }
        }),
        (t._keydown = function (t) {
          if (!/input|textarea/i.test(t.target.tagName))
            switch (t.which) {
              case 37:
                t.preventDefault(), this.prev();
                break;
              case 39:
                t.preventDefault(), this.next();
            }
        }),
        (t._getItemIndex = function (t) {
          return (
            (this._items =
              t && t.parentNode
                ? [].slice.call(t.parentNode.querySelectorAll(ot))
                : []),
            this._items.indexOf(t)
          );
        }),
        (t._getItemByDirection = function (t, e) {
          var n = t === K,
            i = t === Q,
            o = this._getItemIndex(e),
            r = this._items.length - 1;
          if (((i && 0 === o) || (n && o === r)) && !this._config.wrap)
            return e;
          var s = (o + (t === Q ? -1 : 1)) % this._items.length;
          return -1 == s ? this._items[this._items.length - 1] : this._items[s];
        }),
        (t._triggerSlideEvent = function (t, e) {
          var n = this._getItemIndex(t),
            i = this._getItemIndex(this._element.querySelector(it)),
            o = g.Event(Y.SLIDE, {
              relatedTarget: t,
              direction: e,
              from: i,
              to: n,
            });
          return g(this._element).trigger(o), o;
        }),
        (t._setActiveIndicatorElement = function (t) {
          if (this._indicatorsElement) {
            var e = [].slice.call(this._indicatorsElement.querySelectorAll(nt));
            g(e).removeClass(X);
            var n = this._indicatorsElement.children[this._getItemIndex(t)];
            n && g(n).addClass(X);
          }
        }),
        (t._slide = function (t, e) {
          var n,
            i,
            o,
            r = this,
            s = this._element.querySelector(it),
            a = this._getItemIndex(s),
            l = e || (s && this._getItemByDirection(t, s)),
            c = this._getItemIndex(l),
            h = Boolean(this._interval);
          if (
            ((o = t === K ? ((n = J), (i = Z), B) : ((n = G), (i = tt), V)),
            l && g(l).hasClass(X))
          )
            this._isSliding = !1;
          else if (
            !this._triggerSlideEvent(l, o).isDefaultPrevented() &&
            s &&
            l
          ) {
            (this._isSliding = !0),
              h && this.pause(),
              this._setActiveIndicatorElement(l);
            var u = g.Event(Y.SLID, {
              relatedTarget: l,
              direction: o,
              from: a,
              to: c,
            });
            if (g(this._element).hasClass($)) {
              g(l).addClass(i), _.reflow(l), g(s).addClass(n), g(l).addClass(n);
              var f = parseInt(l.getAttribute("data-interval"), 10);
              f
                ? ((this._config.defaultInterval =
                    this._config.defaultInterval || this._config.interval),
                  (this._config.interval = f))
                : (this._config.interval =
                    this._config.defaultInterval || this._config.interval);
              var d = _.getTransitionDurationFromElement(s);
              g(s)
                .one(_.TRANSITION_END, function () {
                  g(l)
                    .removeClass(n + " " + i)
                    .addClass(X),
                    g(s).removeClass(X + " " + i + " " + n),
                    (r._isSliding = !1),
                    setTimeout(function () {
                      return g(r._element).trigger(u);
                    }, 0);
                })
                .emulateTransitionEnd(d);
            } else
              g(s).removeClass(X),
                g(l).addClass(X),
                (this._isSliding = !1),
                g(this._element).trigger(u);
            h && this.cycle();
          }
        }),
        (r._jQueryInterface = function (i) {
          return this.each(function () {
            var t = g(this).data(x),
              e = l({}, q, {}, g(this).data());
            "object" == typeof i && (e = l({}, e, {}, i));
            var n = "string" == typeof i ? i : e.slide;
            if (
              (t || ((t = new r(this, e)), g(this).data(x, t)),
              "number" == typeof i)
            )
              t.to(i);
            else if ("string" == typeof n) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n]();
            } else e.interval && e.ride && (t.pause(), t.cycle());
          });
        }),
        (r._dataApiClickHandler = function (t) {
          var e = _.getSelectorFromElement(this);
          if (e) {
            var n = g(e)[0];
            if (n && g(n).hasClass(z)) {
              var i = l({}, g(n).data(), {}, g(this).data()),
                o = this.getAttribute("data-slide-to");
              o && (i.interval = !1),
                r._jQueryInterface.call(g(n), i),
                o && g(n).data(x).to(o),
                t.preventDefault();
            }
          }
        }),
        s(r, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return q;
            },
          },
        ]),
        r
      );
    })();
  g(document).on(Y.CLICK_DATA_API, lt, ut._dataApiClickHandler),
    g(window).on(Y.LOAD_DATA_API, function () {
      for (
        var t = [].slice.call(document.querySelectorAll(ct)),
          e = 0,
          n = t.length;
        e < n;
        e++
      ) {
        var i = g(t[e]);
        ut._jQueryInterface.call(i, i.data());
      }
    }),
    (g.fn[R] = ut._jQueryInterface),
    (g.fn[R].Constructor = ut),
    (g.fn[R].noConflict = function () {
      return (g.fn[R] = W), ut._jQueryInterface;
    });
  var ft = "collapse",
    dt = "bs.collapse",
    gt = "." + dt,
    _t = g.fn[ft],
    mt = { toggle: !0, parent: "" },
    pt = { toggle: "boolean", parent: "(string|element)" },
    vt = {
      SHOW: "show" + gt,
      SHOWN: "shown" + gt,
      HIDE: "hide" + gt,
      HIDDEN: "hidden" + gt,
      CLICK_DATA_API: "click" + gt + ".data-api",
    },
    yt = "show",
    Et = "collapse",
    Ct = "collapsing",
    Tt = "collapsed",
    bt = "width",
    St = "height",
    Dt = ".show, .collapsing",
    It = '[data-toggle="collapse"]',
    wt = (function () {
      function a(e, t) {
        (this._isTransitioning = !1),
          (this._element = e),
          (this._config = this._getConfig(t)),
          (this._triggerArray = [].slice.call(
            document.querySelectorAll(
              '[data-toggle="collapse"][href="#' +
                e.id +
                '"],[data-toggle="collapse"][data-target="#' +
                e.id +
                '"]'
            )
          ));
        for (
          var n = [].slice.call(document.querySelectorAll(It)),
            i = 0,
            o = n.length;
          i < o;
          i++
        ) {
          var r = n[i],
            s = _.getSelectorFromElement(r),
            a = [].slice
              .call(document.querySelectorAll(s))
              .filter(function (t) {
                return t === e;
              });
          null !== s &&
            0 < a.length &&
            ((this._selector = s), this._triggerArray.push(r));
        }
        (this._parent = this._config.parent ? this._getParent() : null),
          this._config.parent ||
            this._addAriaAndCollapsedClass(this._element, this._triggerArray),
          this._config.toggle && this.toggle();
      }
      var t = a.prototype;
      return (
        (t.toggle = function () {
          g(this._element).hasClass(yt) ? this.hide() : this.show();
        }),
        (t.show = function () {
          var t,
            e,
            n = this;
          if (
            !this._isTransitioning &&
            !g(this._element).hasClass(yt) &&
            (this._parent &&
              0 ===
                (t = [].slice
                  .call(this._parent.querySelectorAll(Dt))
                  .filter(function (t) {
                    return "string" == typeof n._config.parent
                      ? t.getAttribute("data-parent") === n._config.parent
                      : t.classList.contains(Et);
                  })).length &&
              (t = null),
            !(
              t &&
              (e = g(t).not(this._selector).data(dt)) &&
              e._isTransitioning
            ))
          ) {
            var i = g.Event(vt.SHOW);
            if ((g(this._element).trigger(i), !i.isDefaultPrevented())) {
              t &&
                (a._jQueryInterface.call(g(t).not(this._selector), "hide"),
                e || g(t).data(dt, null));
              var o = this._getDimension();
              g(this._element).removeClass(Et).addClass(Ct),
                (this._element.style[o] = 0),
                this._triggerArray.length &&
                  g(this._triggerArray)
                    .removeClass(Tt)
                    .attr("aria-expanded", !0),
                this.setTransitioning(!0);
              var r = "scroll" + (o[0].toUpperCase() + o.slice(1)),
                s = _.getTransitionDurationFromElement(this._element);
              g(this._element)
                .one(_.TRANSITION_END, function () {
                  g(n._element).removeClass(Ct).addClass(Et).addClass(yt),
                    (n._element.style[o] = ""),
                    n.setTransitioning(!1),
                    g(n._element).trigger(vt.SHOWN);
                })
                .emulateTransitionEnd(s),
                (this._element.style[o] = this._element[r] + "px");
            }
          }
        }),
        (t.hide = function () {
          var t = this;
          if (!this._isTransitioning && g(this._element).hasClass(yt)) {
            var e = g.Event(vt.HIDE);
            if ((g(this._element).trigger(e), !e.isDefaultPrevented())) {
              var n = this._getDimension();
              (this._element.style[n] =
                this._element.getBoundingClientRect()[n] + "px"),
                _.reflow(this._element),
                g(this._element).addClass(Ct).removeClass(Et).removeClass(yt);
              var i = this._triggerArray.length;
              if (0 < i)
                for (var o = 0; o < i; o++) {
                  var r = this._triggerArray[o],
                    s = _.getSelectorFromElement(r);
                  if (null !== s)
                    g([].slice.call(document.querySelectorAll(s))).hasClass(
                      yt
                    ) || g(r).addClass(Tt).attr("aria-expanded", !1);
                }
              this.setTransitioning(!0);
              this._element.style[n] = "";
              var a = _.getTransitionDurationFromElement(this._element);
              g(this._element)
                .one(_.TRANSITION_END, function () {
                  t.setTransitioning(!1),
                    g(t._element)
                      .removeClass(Ct)
                      .addClass(Et)
                      .trigger(vt.HIDDEN);
                })
                .emulateTransitionEnd(a);
            }
          }
        }),
        (t.setTransitioning = function (t) {
          this._isTransitioning = t;
        }),
        (t.dispose = function () {
          g.removeData(this._element, dt),
            (this._config = null),
            (this._parent = null),
            (this._element = null),
            (this._triggerArray = null),
            (this._isTransitioning = null);
        }),
        (t._getConfig = function (t) {
          return (
            ((t = l({}, mt, {}, t)).toggle = Boolean(t.toggle)),
            _.typeCheckConfig(ft, t, pt),
            t
          );
        }),
        (t._getDimension = function () {
          return g(this._element).hasClass(bt) ? bt : St;
        }),
        (t._getParent = function () {
          var t,
            n = this;
          _.isElement(this._config.parent)
            ? ((t = this._config.parent),
              "undefined" != typeof this._config.parent.jquery &&
                (t = this._config.parent[0]))
            : (t = document.querySelector(this._config.parent));
          var e =
              '[data-toggle="collapse"][data-parent="' +
              this._config.parent +
              '"]',
            i = [].slice.call(t.querySelectorAll(e));
          return (
            g(i).each(function (t, e) {
              n._addAriaAndCollapsedClass(a._getTargetFromElement(e), [e]);
            }),
            t
          );
        }),
        (t._addAriaAndCollapsedClass = function (t, e) {
          var n = g(t).hasClass(yt);
          e.length && g(e).toggleClass(Tt, !n).attr("aria-expanded", n);
        }),
        (a._getTargetFromElement = function (t) {
          var e = _.getSelectorFromElement(t);
          return e ? document.querySelector(e) : null;
        }),
        (a._jQueryInterface = function (i) {
          return this.each(function () {
            var t = g(this),
              e = t.data(dt),
              n = l(
                {},
                mt,
                {},
                t.data(),
                {},
                "object" == typeof i && i ? i : {}
              );
            if (
              (!e && n.toggle && /show|hide/.test(i) && (n.toggle = !1),
              e || ((e = new a(this, n)), t.data(dt, e)),
              "string" == typeof i)
            ) {
              if ("undefined" == typeof e[i])
                throw new TypeError('No method named "' + i + '"');
              e[i]();
            }
          });
        }),
        s(a, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return mt;
            },
          },
        ]),
        a
      );
    })();
  g(document).on(vt.CLICK_DATA_API, It, function (t) {
    "A" === t.currentTarget.tagName && t.preventDefault();
    var n = g(this),
      e = _.getSelectorFromElement(this),
      i = [].slice.call(document.querySelectorAll(e));
    g(i).each(function () {
      var t = g(this),
        e = t.data(dt) ? "toggle" : n.data();
      wt._jQueryInterface.call(t, e);
    });
  }),
    (g.fn[ft] = wt._jQueryInterface),
    (g.fn[ft].Constructor = wt),
    (g.fn[ft].noConflict = function () {
      return (g.fn[ft] = _t), wt._jQueryInterface;
    });
  var At = "dropdown",
    Nt = "bs.dropdown",
    Ot = "." + Nt,
    kt = ".data-api",
    Pt = g.fn[At],
    Lt = new RegExp("38|40|27"),
    jt = {
      HIDE: "hide" + Ot,
      HIDDEN: "hidden" + Ot,
      SHOW: "show" + Ot,
      SHOWN: "shown" + Ot,
      CLICK: "click" + Ot,
      CLICK_DATA_API: "click" + Ot + kt,
      KEYDOWN_DATA_API: "keydown" + Ot + kt,
      KEYUP_DATA_API: "keyup" + Ot + kt,
    },
    Ht = "disabled",
    Rt = "show",
    xt = "dropup",
    Ft = "dropright",
    Ut = "dropleft",
    Wt = "dropdown-menu-right",
    qt = "position-static",
    Mt = '[data-toggle="dropdown"]',
    Kt = ".dropdown form",
    Qt = ".dropdown-menu",
    Bt = ".navbar-nav",
    Vt = ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
    Yt = "top-start",
    zt = "top-end",
    Xt = "bottom-start",
    $t = "bottom-end",
    Gt = "right-start",
    Jt = "left-start",
    Zt = {
      offset: 0,
      flip: !0,
      boundary: "scrollParent",
      reference: "toggle",
      display: "dynamic",
      popperConfig: null,
    },
    te = {
      offset: "(number|string|function)",
      flip: "boolean",
      boundary: "(string|element)",
      reference: "(string|element)",
      display: "string",
      popperConfig: "(null|object)",
    },
    ee = (function () {
      function c(t, e) {
        (this._element = t),
          (this._popper = null),
          (this._config = this._getConfig(e)),
          (this._menu = this._getMenuElement()),
          (this._inNavbar = this._detectNavbar()),
          this._addEventListeners();
      }
      var t = c.prototype;
      return (
        (t.toggle = function () {
          if (!this._element.disabled && !g(this._element).hasClass(Ht)) {
            var t = g(this._menu).hasClass(Rt);
            c._clearMenus(), t || this.show(!0);
          }
        }),
        (t.show = function (t) {
          if (
            (void 0 === t && (t = !1),
            !(
              this._element.disabled ||
              g(this._element).hasClass(Ht) ||
              g(this._menu).hasClass(Rt)
            ))
          ) {
            var e = { relatedTarget: this._element },
              n = g.Event(jt.SHOW, e),
              i = c._getParentFromElement(this._element);
            if ((g(i).trigger(n), !n.isDefaultPrevented())) {
              if (!this._inNavbar && t) {
                if ("undefined" == typeof u)
                  throw new TypeError(
                    "Bootstrap's dropdowns require Popper.js (https://popper.js.org/)"
                  );
                var o = this._element;
                "parent" === this._config.reference
                  ? (o = i)
                  : _.isElement(this._config.reference) &&
                    ((o = this._config.reference),
                    "undefined" != typeof this._config.reference.jquery &&
                      (o = this._config.reference[0])),
                  "scrollParent" !== this._config.boundary && g(i).addClass(qt),
                  (this._popper = new u(
                    o,
                    this._menu,
                    this._getPopperConfig()
                  ));
              }
              "ontouchstart" in document.documentElement &&
                0 === g(i).closest(Bt).length &&
                g(document.body).children().on("mouseover", null, g.noop),
                this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                g(this._menu).toggleClass(Rt),
                g(i).toggleClass(Rt).trigger(g.Event(jt.SHOWN, e));
            }
          }
        }),
        (t.hide = function () {
          if (
            !this._element.disabled &&
            !g(this._element).hasClass(Ht) &&
            g(this._menu).hasClass(Rt)
          ) {
            var t = { relatedTarget: this._element },
              e = g.Event(jt.HIDE, t),
              n = c._getParentFromElement(this._element);
            g(n).trigger(e),
              e.isDefaultPrevented() ||
                (this._popper && this._popper.destroy(),
                g(this._menu).toggleClass(Rt),
                g(n).toggleClass(Rt).trigger(g.Event(jt.HIDDEN, t)));
          }
        }),
        (t.dispose = function () {
          g.removeData(this._element, Nt),
            g(this._element).off(Ot),
            (this._element = null),
            (this._menu = null) !== this._popper &&
              (this._popper.destroy(), (this._popper = null));
        }),
        (t.update = function () {
          (this._inNavbar = this._detectNavbar()),
            null !== this._popper && this._popper.scheduleUpdate();
        }),
        (t._addEventListeners = function () {
          var e = this;
          g(this._element).on(jt.CLICK, function (t) {
            t.preventDefault(), t.stopPropagation(), e.toggle();
          });
        }),
        (t._getConfig = function (t) {
          return (
            (t = l(
              {},
              this.constructor.Default,
              {},
              g(this._element).data(),
              {},
              t
            )),
            _.typeCheckConfig(At, t, this.constructor.DefaultType),
            t
          );
        }),
        (t._getMenuElement = function () {
          if (!this._menu) {
            var t = c._getParentFromElement(this._element);
            t && (this._menu = t.querySelector(Qt));
          }
          return this._menu;
        }),
        (t._getPlacement = function () {
          var t = g(this._element.parentNode),
            e = Xt;
          return (
            t.hasClass(xt)
              ? ((e = Yt), g(this._menu).hasClass(Wt) && (e = zt))
              : t.hasClass(Ft)
              ? (e = Gt)
              : t.hasClass(Ut)
              ? (e = Jt)
              : g(this._menu).hasClass(Wt) && (e = $t),
            e
          );
        }),
        (t._detectNavbar = function () {
          return 0 < g(this._element).closest(".navbar").length;
        }),
        (t._getOffset = function () {
          var e = this,
            t = {};
          return (
            "function" == typeof this._config.offset
              ? (t.fn = function (t) {
                  return (
                    (t.offsets = l(
                      {},
                      t.offsets,
                      {},
                      e._config.offset(t.offsets, e._element) || {}
                    )),
                    t
                  );
                })
              : (t.offset = this._config.offset),
            t
          );
        }),
        (t._getPopperConfig = function () {
          var t = {
            placement: this._getPlacement(),
            modifiers: {
              offset: this._getOffset(),
              flip: { enabled: this._config.flip },
              preventOverflow: { boundariesElement: this._config.boundary },
            },
          };
          return (
            "static" === this._config.display &&
              (t.modifiers.applyStyle = { enabled: !1 }),
            l({}, t, {}, this._config.popperConfig)
          );
        }),
        (c._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data(Nt);
            if (
              (t ||
                ((t = new c(this, "object" == typeof e ? e : null)),
                g(this).data(Nt, t)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof t[e])
                throw new TypeError('No method named "' + e + '"');
              t[e]();
            }
          });
        }),
        (c._clearMenus = function (t) {
          if (!t || (3 !== t.which && ("keyup" !== t.type || 9 === t.which)))
            for (
              var e = [].slice.call(document.querySelectorAll(Mt)),
                n = 0,
                i = e.length;
              n < i;
              n++
            ) {
              var o = c._getParentFromElement(e[n]),
                r = g(e[n]).data(Nt),
                s = { relatedTarget: e[n] };
              if ((t && "click" === t.type && (s.clickEvent = t), r)) {
                var a = r._menu;
                if (
                  g(o).hasClass(Rt) &&
                  !(
                    t &&
                    (("click" === t.type &&
                      /input|textarea/i.test(t.target.tagName)) ||
                      ("keyup" === t.type && 9 === t.which)) &&
                    g.contains(o, t.target)
                  )
                ) {
                  var l = g.Event(jt.HIDE, s);
                  g(o).trigger(l),
                    l.isDefaultPrevented() ||
                      ("ontouchstart" in document.documentElement &&
                        g(document.body)
                          .children()
                          .off("mouseover", null, g.noop),
                      e[n].setAttribute("aria-expanded", "false"),
                      r._popper && r._popper.destroy(),
                      g(a).removeClass(Rt),
                      g(o).removeClass(Rt).trigger(g.Event(jt.HIDDEN, s)));
                }
              }
            }
        }),
        (c._getParentFromElement = function (t) {
          var e,
            n = _.getSelectorFromElement(t);
          return n && (e = document.querySelector(n)), e || t.parentNode;
        }),
        (c._dataApiKeydownHandler = function (t) {
          if (
            (/input|textarea/i.test(t.target.tagName)
              ? !(
                  32 === t.which ||
                  (27 !== t.which &&
                    ((40 !== t.which && 38 !== t.which) ||
                      g(t.target).closest(Qt).length))
                )
              : Lt.test(t.which)) &&
            (t.preventDefault(),
            t.stopPropagation(),
            !this.disabled && !g(this).hasClass(Ht))
          ) {
            var e = c._getParentFromElement(this),
              n = g(e).hasClass(Rt);
            if (n || 27 !== t.which)
              if (n && (!n || (27 !== t.which && 32 !== t.which))) {
                var i = [].slice
                  .call(e.querySelectorAll(Vt))
                  .filter(function (t) {
                    return g(t).is(":visible");
                  });
                if (0 !== i.length) {
                  var o = i.indexOf(t.target);
                  38 === t.which && 0 < o && o--,
                    40 === t.which && o < i.length - 1 && o++,
                    o < 0 && (o = 0),
                    i[o].focus();
                }
              } else {
                if (27 === t.which) {
                  var r = e.querySelector(Mt);
                  g(r).trigger("focus");
                }
                g(this).trigger("click");
              }
          }
        }),
        s(c, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return Zt;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return te;
            },
          },
        ]),
        c
      );
    })();
  g(document)
    .on(jt.KEYDOWN_DATA_API, Mt, ee._dataApiKeydownHandler)
    .on(jt.KEYDOWN_DATA_API, Qt, ee._dataApiKeydownHandler)
    .on(jt.CLICK_DATA_API + " " + jt.KEYUP_DATA_API, ee._clearMenus)
    .on(jt.CLICK_DATA_API, Mt, function (t) {
      t.preventDefault(),
        t.stopPropagation(),
        ee._jQueryInterface.call(g(this), "toggle");
    })
    .on(jt.CLICK_DATA_API, Kt, function (t) {
      t.stopPropagation();
    }),
    (g.fn[At] = ee._jQueryInterface),
    (g.fn[At].Constructor = ee),
    (g.fn[At].noConflict = function () {
      return (g.fn[At] = Pt), ee._jQueryInterface;
    });
  var ne = "modal",
    ie = "bs.modal",
    oe = "." + ie,
    re = g.fn[ne],
    se = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
    ae = {
      backdrop: "(boolean|string)",
      keyboard: "boolean",
      focus: "boolean",
      show: "boolean",
    },
    le = {
      HIDE: "hide" + oe,
      HIDE_PREVENTED: "hidePrevented" + oe,
      HIDDEN: "hidden" + oe,
      SHOW: "show" + oe,
      SHOWN: "shown" + oe,
      FOCUSIN: "focusin" + oe,
      RESIZE: "resize" + oe,
      CLICK_DISMISS: "click.dismiss" + oe,
      KEYDOWN_DISMISS: "keydown.dismiss" + oe,
      MOUSEUP_DISMISS: "mouseup.dismiss" + oe,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + oe,
      CLICK_DATA_API: "click" + oe + ".data-api",
    },
    ce = "modal-dialog-scrollable",
    he = "modal-scrollbar-measure",
    ue = "modal-backdrop",
    fe = "modal-open",
    de = "fade",
    ge = "show",
    _e = "modal-static",
    me = ".modal-dialog",
    pe = ".modal-body",
    ve = '[data-toggle="modal"]',
    ye = '[data-dismiss="modal"]',
    Ee = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
    Ce = ".sticky-top",
    Te = (function () {
      function o(t, e) {
        (this._config = this._getConfig(e)),
          (this._element = t),
          (this._dialog = t.querySelector(me)),
          (this._backdrop = null),
          (this._isShown = !1),
          (this._isBodyOverflowing = !1),
          (this._ignoreBackdropClick = !1),
          (this._isTransitioning = !1),
          (this._scrollbarWidth = 0);
      }
      var t = o.prototype;
      return (
        (t.toggle = function (t) {
          return this._isShown ? this.hide() : this.show(t);
        }),
        (t.show = function (t) {
          var e = this;
          if (!this._isShown && !this._isTransitioning) {
            g(this._element).hasClass(de) && (this._isTransitioning = !0);
            var n = g.Event(le.SHOW, { relatedTarget: t });
            g(this._element).trigger(n),
              this._isShown ||
                n.isDefaultPrevented() ||
                ((this._isShown = !0),
                this._checkScrollbar(),
                this._setScrollbar(),
                this._adjustDialog(),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                g(this._element).on(le.CLICK_DISMISS, ye, function (t) {
                  return e.hide(t);
                }),
                g(this._dialog).on(le.MOUSEDOWN_DISMISS, function () {
                  g(e._element).one(le.MOUSEUP_DISMISS, function (t) {
                    g(t.target).is(e._element) && (e._ignoreBackdropClick = !0);
                  });
                }),
                this._showBackdrop(function () {
                  return e._showElement(t);
                }));
          }
        }),
        (t.hide = function (t) {
          var e = this;
          if (
            (t && t.preventDefault(), this._isShown && !this._isTransitioning)
          ) {
            var n = g.Event(le.HIDE);
            if (
              (g(this._element).trigger(n),
              this._isShown && !n.isDefaultPrevented())
            ) {
              this._isShown = !1;
              var i = g(this._element).hasClass(de);
              if (
                (i && (this._isTransitioning = !0),
                this._setEscapeEvent(),
                this._setResizeEvent(),
                g(document).off(le.FOCUSIN),
                g(this._element).removeClass(ge),
                g(this._element).off(le.CLICK_DISMISS),
                g(this._dialog).off(le.MOUSEDOWN_DISMISS),
                i)
              ) {
                var o = _.getTransitionDurationFromElement(this._element);
                g(this._element)
                  .one(_.TRANSITION_END, function (t) {
                    return e._hideModal(t);
                  })
                  .emulateTransitionEnd(o);
              } else this._hideModal();
            }
          }
        }),
        (t.dispose = function () {
          [window, this._element, this._dialog].forEach(function (t) {
            return g(t).off(oe);
          }),
            g(document).off(le.FOCUSIN),
            g.removeData(this._element, ie),
            (this._config = null),
            (this._element = null),
            (this._dialog = null),
            (this._backdrop = null),
            (this._isShown = null),
            (this._isBodyOverflowing = null),
            (this._ignoreBackdropClick = null),
            (this._isTransitioning = null),
            (this._scrollbarWidth = null);
        }),
        (t.handleUpdate = function () {
          this._adjustDialog();
        }),
        (t._getConfig = function (t) {
          return (t = l({}, se, {}, t)), _.typeCheckConfig(ne, t, ae), t;
        }),
        (t._triggerBackdropTransition = function () {
          var t = this;
          if ("static" === this._config.backdrop) {
            var e = g.Event(le.HIDE_PREVENTED);
            if ((g(this._element).trigger(e), e.defaultPrevented)) return;
            this._element.classList.add(_e);
            var n = _.getTransitionDurationFromElement(this._element);
            g(this._element)
              .one(_.TRANSITION_END, function () {
                t._element.classList.remove(_e);
              })
              .emulateTransitionEnd(n),
              this._element.focus();
          } else this.hide();
        }),
        (t._showElement = function (t) {
          var e = this,
            n = g(this._element).hasClass(de),
            i = this._dialog ? this._dialog.querySelector(pe) : null;
          (this._element.parentNode &&
            this._element.parentNode.nodeType === Node.ELEMENT_NODE) ||
            document.body.appendChild(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            g(this._dialog).hasClass(ce) && i
              ? (i.scrollTop = 0)
              : (this._element.scrollTop = 0),
            n && _.reflow(this._element),
            g(this._element).addClass(ge),
            this._config.focus && this._enforceFocus();
          function o() {
            e._config.focus && e._element.focus(),
              (e._isTransitioning = !1),
              g(e._element).trigger(r);
          }
          var r = g.Event(le.SHOWN, { relatedTarget: t });
          if (n) {
            var s = _.getTransitionDurationFromElement(this._dialog);
            g(this._dialog).one(_.TRANSITION_END, o).emulateTransitionEnd(s);
          } else o();
        }),
        (t._enforceFocus = function () {
          var e = this;
          g(document)
            .off(le.FOCUSIN)
            .on(le.FOCUSIN, function (t) {
              document !== t.target &&
                e._element !== t.target &&
                0 === g(e._element).has(t.target).length &&
                e._element.focus();
            });
        }),
        (t._setEscapeEvent = function () {
          var e = this;
          this._isShown && this._config.keyboard
            ? g(this._element).on(le.KEYDOWN_DISMISS, function (t) {
                27 === t.which && e._triggerBackdropTransition();
              })
            : this._isShown || g(this._element).off(le.KEYDOWN_DISMISS);
        }),
        (t._setResizeEvent = function () {
          var e = this;
          this._isShown
            ? g(window).on(le.RESIZE, function (t) {
                return e.handleUpdate(t);
              })
            : g(window).off(le.RESIZE);
        }),
        (t._hideModal = function () {
          var t = this;
          (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            (this._isTransitioning = !1),
            this._showBackdrop(function () {
              g(document.body).removeClass(fe),
                t._resetAdjustments(),
                t._resetScrollbar(),
                g(t._element).trigger(le.HIDDEN);
            });
        }),
        (t._removeBackdrop = function () {
          this._backdrop &&
            (g(this._backdrop).remove(), (this._backdrop = null));
        }),
        (t._showBackdrop = function (t) {
          var e = this,
            n = g(this._element).hasClass(de) ? de : "";
          if (this._isShown && this._config.backdrop) {
            if (
              ((this._backdrop = document.createElement("div")),
              (this._backdrop.className = ue),
              n && this._backdrop.classList.add(n),
              g(this._backdrop).appendTo(document.body),
              g(this._element).on(le.CLICK_DISMISS, function (t) {
                e._ignoreBackdropClick
                  ? (e._ignoreBackdropClick = !1)
                  : t.target === t.currentTarget &&
                    e._triggerBackdropTransition();
              }),
              n && _.reflow(this._backdrop),
              g(this._backdrop).addClass(ge),
              !t)
            )
              return;
            if (!n) return void t();
            var i = _.getTransitionDurationFromElement(this._backdrop);
            g(this._backdrop).one(_.TRANSITION_END, t).emulateTransitionEnd(i);
          } else if (!this._isShown && this._backdrop) {
            g(this._backdrop).removeClass(ge);
            var o = function () {
              e._removeBackdrop(), t && t();
            };
            if (g(this._element).hasClass(de)) {
              var r = _.getTransitionDurationFromElement(this._backdrop);
              g(this._backdrop)
                .one(_.TRANSITION_END, o)
                .emulateTransitionEnd(r);
            } else o();
          } else t && t();
        }),
        (t._adjustDialog = function () {
          var t =
            this._element.scrollHeight > document.documentElement.clientHeight;
          !this._isBodyOverflowing &&
            t &&
            (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
            this._isBodyOverflowing &&
              !t &&
              (this._element.style.paddingRight = this._scrollbarWidth + "px");
        }),
        (t._resetAdjustments = function () {
          (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
        }),
        (t._checkScrollbar = function () {
          var t = document.body.getBoundingClientRect();
          (this._isBodyOverflowing = t.left + t.right < window.innerWidth),
            (this._scrollbarWidth = this._getScrollbarWidth());
        }),
        (t._setScrollbar = function () {
          var o = this;
          if (this._isBodyOverflowing) {
            var t = [].slice.call(document.querySelectorAll(Ee)),
              e = [].slice.call(document.querySelectorAll(Ce));
            g(t).each(function (t, e) {
              var n = e.style.paddingRight,
                i = g(e).css("padding-right");
              g(e)
                .data("padding-right", n)
                .css("padding-right", parseFloat(i) + o._scrollbarWidth + "px");
            }),
              g(e).each(function (t, e) {
                var n = e.style.marginRight,
                  i = g(e).css("margin-right");
                g(e)
                  .data("margin-right", n)
                  .css(
                    "margin-right",
                    parseFloat(i) - o._scrollbarWidth + "px"
                  );
              });
            var n = document.body.style.paddingRight,
              i = g(document.body).css("padding-right");
            g(document.body)
              .data("padding-right", n)
              .css(
                "padding-right",
                parseFloat(i) + this._scrollbarWidth + "px"
              );
          }
          g(document.body).addClass(fe);
        }),
        (t._resetScrollbar = function () {
          var t = [].slice.call(document.querySelectorAll(Ee));
          g(t).each(function (t, e) {
            var n = g(e).data("padding-right");
            g(e).removeData("padding-right"), (e.style.paddingRight = n || "");
          });
          var e = [].slice.call(document.querySelectorAll("" + Ce));
          g(e).each(function (t, e) {
            var n = g(e).data("margin-right");
            "undefined" != typeof n &&
              g(e).css("margin-right", n).removeData("margin-right");
          });
          var n = g(document.body).data("padding-right");
          g(document.body).removeData("padding-right"),
            (document.body.style.paddingRight = n || "");
        }),
        (t._getScrollbarWidth = function () {
          var t = document.createElement("div");
          (t.className = he), document.body.appendChild(t);
          var e = t.getBoundingClientRect().width - t.clientWidth;
          return document.body.removeChild(t), e;
        }),
        (o._jQueryInterface = function (n, i) {
          return this.each(function () {
            var t = g(this).data(ie),
              e = l(
                {},
                se,
                {},
                g(this).data(),
                {},
                "object" == typeof n && n ? n : {}
              );
            if (
              (t || ((t = new o(this, e)), g(this).data(ie, t)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n](i);
            } else e.show && t.show(i);
          });
        }),
        s(o, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return se;
            },
          },
        ]),
        o
      );
    })();
  g(document).on(le.CLICK_DATA_API, ve, function (t) {
    var e,
      n = this,
      i = _.getSelectorFromElement(this);
    i && (e = document.querySelector(i));
    var o = g(e).data(ie) ? "toggle" : l({}, g(e).data(), {}, g(this).data());
    ("A" !== this.tagName && "AREA" !== this.tagName) || t.preventDefault();
    var r = g(e).one(le.SHOW, function (t) {
      t.isDefaultPrevented() ||
        r.one(le.HIDDEN, function () {
          g(n).is(":visible") && n.focus();
        });
    });
    Te._jQueryInterface.call(g(e), o, this);
  }),
    (g.fn[ne] = Te._jQueryInterface),
    (g.fn[ne].Constructor = Te),
    (g.fn[ne].noConflict = function () {
      return (g.fn[ne] = re), Te._jQueryInterface;
    });
  var be = [
      "background",
      "cite",
      "href",
      "itemtype",
      "longdesc",
      "poster",
      "src",
      "xlink:href",
    ],
    Se = {
      "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
      a: ["target", "href", "title", "rel"],
      area: [],
      b: [],
      br: [],
      col: [],
      code: [],
      div: [],
      em: [],
      hr: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      i: [],
      img: ["src", "alt", "title", "width", "height"],
      li: [],
      ol: [],
      p: [],
      pre: [],
      s: [],
      small: [],
      span: [],
      sub: [],
      sup: [],
      strong: [],
      u: [],
      ul: [],
    },
    De = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
    Ie =
      /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;
  function we(t, r, e) {
    if (0 === t.length) return t;
    if (e && "function" == typeof e) return e(t);
    for (
      var n = new window.DOMParser().parseFromString(t, "text/html"),
        s = Object.keys(r),
        a = [].slice.call(n.body.querySelectorAll("*")),
        i = function (t) {
          var e = a[t],
            n = e.nodeName.toLowerCase();
          if (-1 === s.indexOf(e.nodeName.toLowerCase()))
            return e.parentNode.removeChild(e), "continue";
          var i = [].slice.call(e.attributes),
            o = [].concat(r["*"] || [], r[n] || []);
          i.forEach(function (t) {
            !(function (t, e) {
              var n = t.nodeName.toLowerCase();
              if (-1 !== e.indexOf(n))
                return (
                  -1 === be.indexOf(n) ||
                  Boolean(t.nodeValue.match(De) || t.nodeValue.match(Ie))
                );
              for (
                var i = e.filter(function (t) {
                    return t instanceof RegExp;
                  }),
                  o = 0,
                  r = i.length;
                o < r;
                o++
              )
                if (n.match(i[o])) return !0;
              return !1;
            })(t, o) && e.removeAttribute(t.nodeName);
          });
        },
        o = 0,
        l = a.length;
      o < l;
      o++
    )
      i(o);
    return n.body.innerHTML;
  }
  var Ae = "tooltip",
    Ne = "bs.tooltip",
    Oe = "." + Ne,
    ke = g.fn[Ae],
    Pe = "bs-tooltip",
    Le = new RegExp("(^|\\s)" + Pe + "\\S+", "g"),
    je = ["sanitize", "whiteList", "sanitizeFn"],
    He = {
      animation: "boolean",
      template: "string",
      title: "(string|element|function)",
      trigger: "string",
      delay: "(number|object)",
      html: "boolean",
      selector: "(string|boolean)",
      placement: "(string|function)",
      offset: "(number|string|function)",
      container: "(string|element|boolean)",
      fallbackPlacement: "(string|array)",
      boundary: "(string|element)",
      sanitize: "boolean",
      sanitizeFn: "(null|function)",
      whiteList: "object",
      popperConfig: "(null|object)",
    },
    Re = {
      AUTO: "auto",
      TOP: "top",
      RIGHT: "right",
      BOTTOM: "bottom",
      LEFT: "left",
    },
    xe = {
      animation: !0,
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: "hover focus",
      title: "",
      delay: 0,
      html: !1,
      selector: !1,
      placement: "top",
      offset: 0,
      container: !1,
      fallbackPlacement: "flip",
      boundary: "scrollParent",
      sanitize: !0,
      sanitizeFn: null,
      whiteList: Se,
      popperConfig: null,
    },
    Fe = "show",
    Ue = "out",
    We = {
      HIDE: "hide" + Oe,
      HIDDEN: "hidden" + Oe,
      SHOW: "show" + Oe,
      SHOWN: "shown" + Oe,
      INSERTED: "inserted" + Oe,
      CLICK: "click" + Oe,
      FOCUSIN: "focusin" + Oe,
      FOCUSOUT: "focusout" + Oe,
      MOUSEENTER: "mouseenter" + Oe,
      MOUSELEAVE: "mouseleave" + Oe,
    },
    qe = "fade",
    Me = "show",
    Ke = ".tooltip-inner",
    Qe = ".arrow",
    Be = "hover",
    Ve = "focus",
    Ye = "click",
    ze = "manual",
    Xe = (function () {
      function i(t, e) {
        if ("undefined" == typeof u)
          throw new TypeError(
            "Bootstrap's tooltips require Popper.js (https://popper.js.org/)"
          );
        (this._isEnabled = !0),
          (this._timeout = 0),
          (this._hoverState = ""),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this.element = t),
          (this.config = this._getConfig(e)),
          (this.tip = null),
          this._setListeners();
      }
      var t = i.prototype;
      return (
        (t.enable = function () {
          this._isEnabled = !0;
        }),
        (t.disable = function () {
          this._isEnabled = !1;
        }),
        (t.toggleEnabled = function () {
          this._isEnabled = !this._isEnabled;
        }),
        (t.toggle = function (t) {
          if (this._isEnabled)
            if (t) {
              var e = this.constructor.DATA_KEY,
                n = g(t.currentTarget).data(e);
              n ||
                ((n = new this.constructor(
                  t.currentTarget,
                  this._getDelegateConfig()
                )),
                g(t.currentTarget).data(e, n)),
                (n._activeTrigger.click = !n._activeTrigger.click),
                n._isWithActiveTrigger()
                  ? n._enter(null, n)
                  : n._leave(null, n);
            } else {
              if (g(this.getTipElement()).hasClass(Me))
                return void this._leave(null, this);
              this._enter(null, this);
            }
        }),
        (t.dispose = function () {
          clearTimeout(this._timeout),
            g.removeData(this.element, this.constructor.DATA_KEY),
            g(this.element).off(this.constructor.EVENT_KEY),
            g(this.element)
              .closest(".modal")
              .off("hide.bs.modal", this._hideModalHandler),
            this.tip && g(this.tip).remove(),
            (this._isEnabled = null),
            (this._timeout = null),
            (this._hoverState = null),
            (this._activeTrigger = null),
            this._popper && this._popper.destroy(),
            (this._popper = null),
            (this.element = null),
            (this.config = null),
            (this.tip = null);
        }),
        (t.show = function () {
          var e = this;
          if ("none" === g(this.element).css("display"))
            throw new Error("Please use show on visible elements");
          var t = g.Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            g(this.element).trigger(t);
            var n = _.findShadowRoot(this.element),
              i = g.contains(
                null !== n ? n : this.element.ownerDocument.documentElement,
                this.element
              );
            if (t.isDefaultPrevented() || !i) return;
            var o = this.getTipElement(),
              r = _.getUID(this.constructor.NAME);
            o.setAttribute("id", r),
              this.element.setAttribute("aria-describedby", r),
              this.setContent(),
              this.config.animation && g(o).addClass(qe);
            var s =
                "function" == typeof this.config.placement
                  ? this.config.placement.call(this, o, this.element)
                  : this.config.placement,
              a = this._getAttachment(s);
            this.addAttachmentClass(a);
            var l = this._getContainer();
            g(o).data(this.constructor.DATA_KEY, this),
              g.contains(
                this.element.ownerDocument.documentElement,
                this.tip
              ) || g(o).appendTo(l),
              g(this.element).trigger(this.constructor.Event.INSERTED),
              (this._popper = new u(this.element, o, this._getPopperConfig(a))),
              g(o).addClass(Me),
              "ontouchstart" in document.documentElement &&
                g(document.body).children().on("mouseover", null, g.noop);
            var c = function () {
              e.config.animation && e._fixTransition();
              var t = e._hoverState;
              (e._hoverState = null),
                g(e.element).trigger(e.constructor.Event.SHOWN),
                t === Ue && e._leave(null, e);
            };
            if (g(this.tip).hasClass(qe)) {
              var h = _.getTransitionDurationFromElement(this.tip);
              g(this.tip).one(_.TRANSITION_END, c).emulateTransitionEnd(h);
            } else c();
          }
        }),
        (t.hide = function (t) {
          function e() {
            n._hoverState !== Fe && i.parentNode && i.parentNode.removeChild(i),
              n._cleanTipClass(),
              n.element.removeAttribute("aria-describedby"),
              g(n.element).trigger(n.constructor.Event.HIDDEN),
              null !== n._popper && n._popper.destroy(),
              t && t();
          }
          var n = this,
            i = this.getTipElement(),
            o = g.Event(this.constructor.Event.HIDE);
          if ((g(this.element).trigger(o), !o.isDefaultPrevented())) {
            if (
              (g(i).removeClass(Me),
              "ontouchstart" in document.documentElement &&
                g(document.body).children().off("mouseover", null, g.noop),
              (this._activeTrigger[Ye] = !1),
              (this._activeTrigger[Ve] = !1),
              (this._activeTrigger[Be] = !1),
              g(this.tip).hasClass(qe))
            ) {
              var r = _.getTransitionDurationFromElement(i);
              g(i).one(_.TRANSITION_END, e).emulateTransitionEnd(r);
            } else e();
            this._hoverState = "";
          }
        }),
        (t.update = function () {
          null !== this._popper && this._popper.scheduleUpdate();
        }),
        (t.isWithContent = function () {
          return Boolean(this.getTitle());
        }),
        (t.addAttachmentClass = function (t) {
          g(this.getTipElement()).addClass(Pe + "-" + t);
        }),
        (t.getTipElement = function () {
          return (this.tip = this.tip || g(this.config.template)[0]), this.tip;
        }),
        (t.setContent = function () {
          var t = this.getTipElement();
          this.setElementContent(g(t.querySelectorAll(Ke)), this.getTitle()),
            g(t).removeClass(qe + " " + Me);
        }),
        (t.setElementContent = function (t, e) {
          "object" != typeof e || (!e.nodeType && !e.jquery)
            ? this.config.html
              ? (this.config.sanitize &&
                  (e = we(e, this.config.whiteList, this.config.sanitizeFn)),
                t.html(e))
              : t.text(e)
            : this.config.html
            ? g(e).parent().is(t) || t.empty().append(e)
            : t.text(g(e).text());
        }),
        (t.getTitle = function () {
          var t = this.element.getAttribute("data-original-title");
          return (t =
            t ||
            ("function" == typeof this.config.title
              ? this.config.title.call(this.element)
              : this.config.title));
        }),
        (t._getPopperConfig = function (t) {
          var e = this;
          return l(
            {},
            {
              placement: t,
              modifiers: {
                offset: this._getOffset(),
                flip: { behavior: this.config.fallbackPlacement },
                arrow: { element: Qe },
                preventOverflow: { boundariesElement: this.config.boundary },
              },
              onCreate: function (t) {
                t.originalPlacement !== t.placement &&
                  e._handlePopperPlacementChange(t);
              },
              onUpdate: function (t) {
                return e._handlePopperPlacementChange(t);
              },
            },
            {},
            this.config.popperConfig
          );
        }),
        (t._getOffset = function () {
          var e = this,
            t = {};
          return (
            "function" == typeof this.config.offset
              ? (t.fn = function (t) {
                  return (
                    (t.offsets = l(
                      {},
                      t.offsets,
                      {},
                      e.config.offset(t.offsets, e.element) || {}
                    )),
                    t
                  );
                })
              : (t.offset = this.config.offset),
            t
          );
        }),
        (t._getContainer = function () {
          return !1 === this.config.container
            ? document.body
            : _.isElement(this.config.container)
            ? g(this.config.container)
            : g(document).find(this.config.container);
        }),
        (t._getAttachment = function (t) {
          return Re[t.toUpperCase()];
        }),
        (t._setListeners = function () {
          var i = this;
          this.config.trigger.split(" ").forEach(function (t) {
            if ("click" === t)
              g(i.element).on(
                i.constructor.Event.CLICK,
                i.config.selector,
                function (t) {
                  return i.toggle(t);
                }
              );
            else if (t !== ze) {
              var e =
                  t === Be
                    ? i.constructor.Event.MOUSEENTER
                    : i.constructor.Event.FOCUSIN,
                n =
                  t === Be
                    ? i.constructor.Event.MOUSELEAVE
                    : i.constructor.Event.FOCUSOUT;
              g(i.element)
                .on(e, i.config.selector, function (t) {
                  return i._enter(t);
                })
                .on(n, i.config.selector, function (t) {
                  return i._leave(t);
                });
            }
          }),
            (this._hideModalHandler = function () {
              i.element && i.hide();
            }),
            g(this.element)
              .closest(".modal")
              .on("hide.bs.modal", this._hideModalHandler),
            this.config.selector
              ? (this.config = l({}, this.config, {
                  trigger: "manual",
                  selector: "",
                }))
              : this._fixTitle();
        }),
        (t._fixTitle = function () {
          var t = typeof this.element.getAttribute("data-original-title");
          (!this.element.getAttribute("title") && "string" == t) ||
            (this.element.setAttribute(
              "data-original-title",
              this.element.getAttribute("title") || ""
            ),
            this.element.setAttribute("title", ""));
        }),
        (t._enter = function (t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || g(t.currentTarget).data(n)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            g(t.currentTarget).data(n, e)),
            t && (e._activeTrigger["focusin" === t.type ? Ve : Be] = !0),
            g(e.getTipElement()).hasClass(Me) || e._hoverState === Fe
              ? (e._hoverState = Fe)
              : (clearTimeout(e._timeout),
                (e._hoverState = Fe),
                e.config.delay && e.config.delay.show
                  ? (e._timeout = setTimeout(function () {
                      e._hoverState === Fe && e.show();
                    }, e.config.delay.show))
                  : e.show());
        }),
        (t._leave = function (t, e) {
          var n = this.constructor.DATA_KEY;
          (e = e || g(t.currentTarget).data(n)) ||
            ((e = new this.constructor(
              t.currentTarget,
              this._getDelegateConfig()
            )),
            g(t.currentTarget).data(n, e)),
            t && (e._activeTrigger["focusout" === t.type ? Ve : Be] = !1),
            e._isWithActiveTrigger() ||
              (clearTimeout(e._timeout),
              (e._hoverState = Ue),
              e.config.delay && e.config.delay.hide
                ? (e._timeout = setTimeout(function () {
                    e._hoverState === Ue && e.hide();
                  }, e.config.delay.hide))
                : e.hide());
        }),
        (t._isWithActiveTrigger = function () {
          for (var t in this._activeTrigger)
            if (this._activeTrigger[t]) return !0;
          return !1;
        }),
        (t._getConfig = function (t) {
          var e = g(this.element).data();
          return (
            Object.keys(e).forEach(function (t) {
              -1 !== je.indexOf(t) && delete e[t];
            }),
            "number" ==
              typeof (t = l(
                {},
                this.constructor.Default,
                {},
                e,
                {},
                "object" == typeof t && t ? t : {}
              )).delay && (t.delay = { show: t.delay, hide: t.delay }),
            "number" == typeof t.title && (t.title = t.title.toString()),
            "number" == typeof t.content && (t.content = t.content.toString()),
            _.typeCheckConfig(Ae, t, this.constructor.DefaultType),
            t.sanitize &&
              (t.template = we(t.template, t.whiteList, t.sanitizeFn)),
            t
          );
        }),
        (t._getDelegateConfig = function () {
          var t = {};
          if (this.config)
            for (var e in this.config)
              this.constructor.Default[e] !== this.config[e] &&
                (t[e] = this.config[e]);
          return t;
        }),
        (t._cleanTipClass = function () {
          var t = g(this.getTipElement()),
            e = t.attr("class").match(Le);
          null !== e && e.length && t.removeClass(e.join(""));
        }),
        (t._handlePopperPlacementChange = function (t) {
          var e = t.instance;
          (this.tip = e.popper),
            this._cleanTipClass(),
            this.addAttachmentClass(this._getAttachment(t.placement));
        }),
        (t._fixTransition = function () {
          var t = this.getTipElement(),
            e = this.config.animation;
          null === t.getAttribute("x-placement") &&
            (g(t).removeClass(qe),
            (this.config.animation = !1),
            this.hide(),
            this.show(),
            (this.config.animation = e));
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this).data(Ne),
              e = "object" == typeof n && n;
            if (
              (t || !/dispose|hide/.test(n)) &&
              (t || ((t = new i(this, e)), g(this).data(Ne, t)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n]();
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return xe;
            },
          },
          {
            key: "NAME",
            get: function () {
              return Ae;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return Ne;
            },
          },
          {
            key: "Event",
            get: function () {
              return We;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return Oe;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return He;
            },
          },
        ]),
        i
      );
    })();
  (g.fn[Ae] = Xe._jQueryInterface),
    (g.fn[Ae].Constructor = Xe),
    (g.fn[Ae].noConflict = function () {
      return (g.fn[Ae] = ke), Xe._jQueryInterface;
    });
  var $e = "popover",
    Ge = "bs.popover",
    Je = "." + Ge,
    Ze = g.fn[$e],
    tn = "bs-popover",
    en = new RegExp("(^|\\s)" + tn + "\\S+", "g"),
    nn = l({}, Xe.Default, {
      placement: "right",
      trigger: "click",
      content: "",
      template:
        '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
    }),
    on = l({}, Xe.DefaultType, { content: "(string|element|function)" }),
    rn = "fade",
    sn = "show",
    an = ".popover-header",
    ln = ".popover-body",
    cn = {
      HIDE: "hide" + Je,
      HIDDEN: "hidden" + Je,
      SHOW: "show" + Je,
      SHOWN: "shown" + Je,
      INSERTED: "inserted" + Je,
      CLICK: "click" + Je,
      FOCUSIN: "focusin" + Je,
      FOCUSOUT: "focusout" + Je,
      MOUSEENTER: "mouseenter" + Je,
      MOUSELEAVE: "mouseleave" + Je,
    },
    hn = (function (t) {
      function i() {
        return t.apply(this, arguments) || this;
      }
      !(function (t, e) {
        (t.prototype = Object.create(e.prototype)),
          ((t.prototype.constructor = t).__proto__ = e);
      })(i, t);
      var e = i.prototype;
      return (
        (e.isWithContent = function () {
          return this.getTitle() || this._getContent();
        }),
        (e.addAttachmentClass = function (t) {
          g(this.getTipElement()).addClass(tn + "-" + t);
        }),
        (e.getTipElement = function () {
          return (this.tip = this.tip || g(this.config.template)[0]), this.tip;
        }),
        (e.setContent = function () {
          var t = g(this.getTipElement());
          this.setElementContent(t.find(an), this.getTitle());
          var e = this._getContent();
          "function" == typeof e && (e = e.call(this.element)),
            this.setElementContent(t.find(ln), e),
            t.removeClass(rn + " " + sn);
        }),
        (e._getContent = function () {
          return (
            this.element.getAttribute("data-content") || this.config.content
          );
        }),
        (e._cleanTipClass = function () {
          var t = g(this.getTipElement()),
            e = t.attr("class").match(en);
          null !== e && 0 < e.length && t.removeClass(e.join(""));
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this).data(Ge),
              e = "object" == typeof n ? n : null;
            if (
              (t || !/dispose|hide/.test(n)) &&
              (t || ((t = new i(this, e)), g(this).data(Ge, t)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof t[n])
                throw new TypeError('No method named "' + n + '"');
              t[n]();
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return nn;
            },
          },
          {
            key: "NAME",
            get: function () {
              return $e;
            },
          },
          {
            key: "DATA_KEY",
            get: function () {
              return Ge;
            },
          },
          {
            key: "Event",
            get: function () {
              return cn;
            },
          },
          {
            key: "EVENT_KEY",
            get: function () {
              return Je;
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return on;
            },
          },
        ]),
        i
      );
    })(Xe);
  (g.fn[$e] = hn._jQueryInterface),
    (g.fn[$e].Constructor = hn),
    (g.fn[$e].noConflict = function () {
      return (g.fn[$e] = Ze), hn._jQueryInterface;
    });
  var un = "scrollspy",
    fn = "bs.scrollspy",
    dn = "." + fn,
    gn = g.fn[un],
    _n = { offset: 10, method: "auto", target: "" },
    mn = { offset: "number", method: "string", target: "(string|element)" },
    pn = {
      ACTIVATE: "activate" + dn,
      SCROLL: "scroll" + dn,
      LOAD_DATA_API: "load" + dn + ".data-api",
    },
    vn = "dropdown-item",
    yn = "active",
    En = '[data-spy="scroll"]',
    Cn = ".nav, .list-group",
    Tn = ".nav-link",
    bn = ".nav-item",
    Sn = ".list-group-item",
    Dn = ".dropdown",
    In = ".dropdown-item",
    wn = ".dropdown-toggle",
    An = "offset",
    Nn = "position",
    On = (function () {
      function n(t, e) {
        var n = this;
        (this._element = t),
          (this._scrollElement = "BODY" === t.tagName ? window : t),
          (this._config = this._getConfig(e)),
          (this._selector =
            this._config.target +
            " " +
            Tn +
            "," +
            this._config.target +
            " " +
            Sn +
            "," +
            this._config.target +
            " " +
            In),
          (this._offsets = []),
          (this._targets = []),
          (this._activeTarget = null),
          (this._scrollHeight = 0),
          g(this._scrollElement).on(pn.SCROLL, function (t) {
            return n._process(t);
          }),
          this.refresh(),
          this._process();
      }
      var t = n.prototype;
      return (
        (t.refresh = function () {
          var e = this,
            t = this._scrollElement === this._scrollElement.window ? An : Nn,
            o = "auto" === this._config.method ? t : this._config.method,
            r = o === Nn ? this._getScrollTop() : 0;
          (this._offsets = []),
            (this._targets = []),
            (this._scrollHeight = this._getScrollHeight()),
            [].slice
              .call(document.querySelectorAll(this._selector))
              .map(function (t) {
                var e,
                  n = _.getSelectorFromElement(t);
                if ((n && (e = document.querySelector(n)), e)) {
                  var i = e.getBoundingClientRect();
                  if (i.width || i.height) return [g(e)[o]().top + r, n];
                }
                return null;
              })
              .filter(function (t) {
                return t;
              })
              .sort(function (t, e) {
                return t[0] - e[0];
              })
              .forEach(function (t) {
                e._offsets.push(t[0]), e._targets.push(t[1]);
              });
        }),
        (t.dispose = function () {
          g.removeData(this._element, fn),
            g(this._scrollElement).off(dn),
            (this._element = null),
            (this._scrollElement = null),
            (this._config = null),
            (this._selector = null),
            (this._offsets = null),
            (this._targets = null),
            (this._activeTarget = null),
            (this._scrollHeight = null);
        }),
        (t._getConfig = function (t) {
          if (
            "string" !=
            typeof (t = l({}, _n, {}, "object" == typeof t && t ? t : {}))
              .target
          ) {
            var e = g(t.target).attr("id");
            e || ((e = _.getUID(un)), g(t.target).attr("id", e)),
              (t.target = "#" + e);
          }
          return _.typeCheckConfig(un, t, mn), t;
        }),
        (t._getScrollTop = function () {
          return this._scrollElement === window
            ? this._scrollElement.pageYOffset
            : this._scrollElement.scrollTop;
        }),
        (t._getScrollHeight = function () {
          return (
            this._scrollElement.scrollHeight ||
            Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight
            )
          );
        }),
        (t._getOffsetHeight = function () {
          return this._scrollElement === window
            ? window.innerHeight
            : this._scrollElement.getBoundingClientRect().height;
        }),
        (t._process = function () {
          var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            n = this._config.offset + e - this._getOffsetHeight();
          if ((this._scrollHeight !== e && this.refresh(), n <= t)) {
            var i = this._targets[this._targets.length - 1];
            this._activeTarget !== i && this._activate(i);
          } else {
            if (
              this._activeTarget &&
              t < this._offsets[0] &&
              0 < this._offsets[0]
            )
              return (this._activeTarget = null), void this._clear();
            for (var o = this._offsets.length; o--; ) {
              this._activeTarget !== this._targets[o] &&
                t >= this._offsets[o] &&
                ("undefined" == typeof this._offsets[o + 1] ||
                  t < this._offsets[o + 1]) &&
                this._activate(this._targets[o]);
            }
          }
        }),
        (t._activate = function (e) {
          (this._activeTarget = e), this._clear();
          var t = this._selector.split(",").map(function (t) {
              return (
                t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]'
              );
            }),
            n = g([].slice.call(document.querySelectorAll(t.join(","))));
          n.hasClass(vn)
            ? (n.closest(Dn).find(wn).addClass(yn), n.addClass(yn))
            : (n.addClass(yn),
              n
                .parents(Cn)
                .prev(Tn + ", " + Sn)
                .addClass(yn),
              n.parents(Cn).prev(bn).children(Tn).addClass(yn)),
            g(this._scrollElement).trigger(pn.ACTIVATE, { relatedTarget: e });
        }),
        (t._clear = function () {
          [].slice
            .call(document.querySelectorAll(this._selector))
            .filter(function (t) {
              return t.classList.contains(yn);
            })
            .forEach(function (t) {
              return t.classList.remove(yn);
            });
        }),
        (n._jQueryInterface = function (e) {
          return this.each(function () {
            var t = g(this).data(fn);
            if (
              (t ||
                ((t = new n(this, "object" == typeof e && e)),
                g(this).data(fn, t)),
              "string" == typeof e)
            ) {
              if ("undefined" == typeof t[e])
                throw new TypeError('No method named "' + e + '"');
              t[e]();
            }
          });
        }),
        s(n, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "Default",
            get: function () {
              return _n;
            },
          },
        ]),
        n
      );
    })();
  g(window).on(pn.LOAD_DATA_API, function () {
    for (
      var t = [].slice.call(document.querySelectorAll(En)), e = t.length;
      e--;

    ) {
      var n = g(t[e]);
      On._jQueryInterface.call(n, n.data());
    }
  }),
    (g.fn[un] = On._jQueryInterface),
    (g.fn[un].Constructor = On),
    (g.fn[un].noConflict = function () {
      return (g.fn[un] = gn), On._jQueryInterface;
    });
  var kn = "bs.tab",
    Pn = "." + kn,
    Ln = g.fn.tab,
    jn = {
      HIDE: "hide" + Pn,
      HIDDEN: "hidden" + Pn,
      SHOW: "show" + Pn,
      SHOWN: "shown" + Pn,
      CLICK_DATA_API: "click" + Pn + ".data-api",
    },
    Hn = "dropdown-menu",
    Rn = "active",
    xn = "disabled",
    Fn = "fade",
    Un = "show",
    Wn = ".dropdown",
    qn = ".nav, .list-group",
    Mn = ".active",
    Kn = "> li > .active",
    Qn = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    Bn = ".dropdown-toggle",
    Vn = "> .dropdown-menu .active",
    Yn = (function () {
      function i(t) {
        this._element = t;
      }
      var t = i.prototype;
      return (
        (t.show = function () {
          var n = this;
          if (
            !(
              (this._element.parentNode &&
                this._element.parentNode.nodeType === Node.ELEMENT_NODE &&
                g(this._element).hasClass(Rn)) ||
              g(this._element).hasClass(xn)
            )
          ) {
            var t,
              i,
              e = g(this._element).closest(qn)[0],
              o = _.getSelectorFromElement(this._element);
            if (e) {
              var r = "UL" === e.nodeName || "OL" === e.nodeName ? Kn : Mn;
              i = (i = g.makeArray(g(e).find(r)))[i.length - 1];
            }
            var s = g.Event(jn.HIDE, { relatedTarget: this._element }),
              a = g.Event(jn.SHOW, { relatedTarget: i });
            if (
              (i && g(i).trigger(s),
              g(this._element).trigger(a),
              !a.isDefaultPrevented() && !s.isDefaultPrevented())
            ) {
              o && (t = document.querySelector(o)),
                this._activate(this._element, e);
              var l = function () {
                var t = g.Event(jn.HIDDEN, { relatedTarget: n._element }),
                  e = g.Event(jn.SHOWN, { relatedTarget: i });
                g(i).trigger(t), g(n._element).trigger(e);
              };
              t ? this._activate(t, t.parentNode, l) : l();
            }
          }
        }),
        (t.dispose = function () {
          g.removeData(this._element, kn), (this._element = null);
        }),
        (t._activate = function (t, e, n) {
          function i() {
            return o._transitionComplete(t, r, n);
          }
          var o = this,
            r = (
              !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
                ? g(e).children(Mn)
                : g(e).find(Kn)
            )[0],
            s = n && r && g(r).hasClass(Fn);
          if (r && s) {
            var a = _.getTransitionDurationFromElement(r);
            g(r)
              .removeClass(Un)
              .one(_.TRANSITION_END, i)
              .emulateTransitionEnd(a);
          } else i();
        }),
        (t._transitionComplete = function (t, e, n) {
          if (e) {
            g(e).removeClass(Rn);
            var i = g(e.parentNode).find(Vn)[0];
            i && g(i).removeClass(Rn),
              "tab" === e.getAttribute("role") &&
                e.setAttribute("aria-selected", !1);
          }
          if (
            (g(t).addClass(Rn),
            "tab" === t.getAttribute("role") &&
              t.setAttribute("aria-selected", !0),
            _.reflow(t),
            t.classList.contains(Fn) && t.classList.add(Un),
            t.parentNode && g(t.parentNode).hasClass(Hn))
          ) {
            var o = g(t).closest(Wn)[0];
            if (o) {
              var r = [].slice.call(o.querySelectorAll(Bn));
              g(r).addClass(Rn);
            }
            t.setAttribute("aria-expanded", !0);
          }
          n && n();
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this),
              e = t.data(kn);
            if (
              (e || ((e = new i(this)), t.data(kn, e)), "string" == typeof n)
            ) {
              if ("undefined" == typeof e[n])
                throw new TypeError('No method named "' + n + '"');
              e[n]();
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
        ]),
        i
      );
    })();
  g(document).on(jn.CLICK_DATA_API, Qn, function (t) {
    t.preventDefault(), Yn._jQueryInterface.call(g(this), "show");
  }),
    (g.fn.tab = Yn._jQueryInterface),
    (g.fn.tab.Constructor = Yn),
    (g.fn.tab.noConflict = function () {
      return (g.fn.tab = Ln), Yn._jQueryInterface;
    });
  var zn = "toast",
    Xn = "bs.toast",
    $n = "." + Xn,
    Gn = g.fn[zn],
    Jn = {
      CLICK_DISMISS: "click.dismiss" + $n,
      HIDE: "hide" + $n,
      HIDDEN: "hidden" + $n,
      SHOW: "show" + $n,
      SHOWN: "shown" + $n,
    },
    Zn = "fade",
    ti = "hide",
    ei = "show",
    ni = "showing",
    ii = { animation: "boolean", autohide: "boolean", delay: "number" },
    oi = { animation: !0, autohide: !0, delay: 500 },
    ri = '[data-dismiss="toast"]',
    si = (function () {
      function i(t, e) {
        (this._element = t),
          (this._config = this._getConfig(e)),
          (this._timeout = null),
          this._setListeners();
      }
      var t = i.prototype;
      return (
        (t.show = function () {
          var t = this,
            e = g.Event(Jn.SHOW);
          if ((g(this._element).trigger(e), !e.isDefaultPrevented())) {
            this._config.animation && this._element.classList.add(Zn);
            var n = function () {
              t._element.classList.remove(ni),
                t._element.classList.add(ei),
                g(t._element).trigger(Jn.SHOWN),
                t._config.autohide &&
                  (t._timeout = setTimeout(function () {
                    t.hide();
                  }, t._config.delay));
            };
            if (
              (this._element.classList.remove(ti),
              _.reflow(this._element),
              this._element.classList.add(ni),
              this._config.animation)
            ) {
              var i = _.getTransitionDurationFromElement(this._element);
              g(this._element).one(_.TRANSITION_END, n).emulateTransitionEnd(i);
            } else n();
          }
        }),
        (t.hide = function () {
          if (this._element.classList.contains(ei)) {
            var t = g.Event(Jn.HIDE);
            g(this._element).trigger(t),
              t.isDefaultPrevented() || this._close();
          }
        }),
        (t.dispose = function () {
          clearTimeout(this._timeout),
            (this._timeout = null),
            this._element.classList.contains(ei) &&
              this._element.classList.remove(ei),
            g(this._element).off(Jn.CLICK_DISMISS),
            g.removeData(this._element, Xn),
            (this._element = null),
            (this._config = null);
        }),
        (t._getConfig = function (t) {
          return (
            (t = l(
              {},
              oi,
              {},
              g(this._element).data(),
              {},
              "object" == typeof t && t ? t : {}
            )),
            _.typeCheckConfig(zn, t, this.constructor.DefaultType),
            t
          );
        }),
        (t._setListeners = function () {
          var t = this;
          g(this._element).on(Jn.CLICK_DISMISS, ri, function () {
            return t.hide();
          });
        }),
        (t._close = function () {
          function t() {
            e._element.classList.add(ti), g(e._element).trigger(Jn.HIDDEN);
          }
          var e = this;
          if ((this._element.classList.remove(ei), this._config.animation)) {
            var n = _.getTransitionDurationFromElement(this._element);
            g(this._element).one(_.TRANSITION_END, t).emulateTransitionEnd(n);
          } else t();
        }),
        (i._jQueryInterface = function (n) {
          return this.each(function () {
            var t = g(this),
              e = t.data(Xn);
            if (
              (e ||
                ((e = new i(this, "object" == typeof n && n)), t.data(Xn, e)),
              "string" == typeof n)
            ) {
              if ("undefined" == typeof e[n])
                throw new TypeError('No method named "' + n + '"');
              e[n](this);
            }
          });
        }),
        s(i, null, [
          {
            key: "VERSION",
            get: function () {
              return "4.4.1";
            },
          },
          {
            key: "DefaultType",
            get: function () {
              return ii;
            },
          },
          {
            key: "Default",
            get: function () {
              return oi;
            },
          },
        ]),
        i
      );
    })();
  (g.fn[zn] = si._jQueryInterface),
    (g.fn[zn].Constructor = si),
    (g.fn[zn].noConflict = function () {
      return (g.fn[zn] = Gn), si._jQueryInterface;
    }),
    (t.Alert = v),
    (t.Button = H),
    (t.Carousel = ut),
    (t.Collapse = wt),
    (t.Dropdown = ee),
    (t.Modal = Te),
    (t.Popover = hn),
    (t.Scrollspy = On),
    (t.Tab = Yn),
    (t.Toast = si),
    (t.Tooltip = Xe),
    (t.Util = _),
    Object.defineProperty(t, "__esModule", { value: !0 });
});

/* jquery.fancybox.js */
!(function (e, t, i, n) {
  "use strict";
  var o = i("html"),
    a = i(e),
    r = i(t),
    s = (i.fancybox = function () {
      s.open.apply(this, arguments);
    }),
    l = navigator.userAgent.match(/msie/i),
    c = null,
    d = void 0 !== t.createTouch,
    p = function (e) {
      return e && e.hasOwnProperty && e instanceof i;
    },
    h = function (e) {
      return e && "string" === i.type(e);
    },
    f = function (e) {
      return h(e) && e.indexOf("%") > 0;
    },
    u = function (e, t) {
      var i = parseInt(e, 10) || 0;
      return t && f(e) && (i = (s.getViewport()[t] / 100) * i), Math.ceil(i);
    },
    g = function (e, t) {
      return u(e, t) + "px";
    };
  i.extend(s, {
    version: "2.1.5",
    defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      pixelRatio: 1,
      autoSize: !0,
      autoHeight: !1,
      autoWidth: !1,
      autoResize: !0,
      autoCenter: !d,
      fitToView: !0,
      aspectRatio: !1,
      topRatio: 0.5,
      leftRatio: 0.5,
      scrolling: "auto",
      wrapCSS: "",
      arrows: !0,
      closeBtn: !0,
      closeClick: !1,
      nextClick: !1,
      mouseWheel: !0,
      autoPlay: !1,
      playSpeed: 3e3,
      preload: 3,
      modal: !1,
      loop: !0,
      ajax: { dataType: "html", headers: { "X-fancyBox": !0 } },
      iframe: { scrolling: "auto", preload: !0 },
      swf: {
        wmode: "transparent",
        allowfullscreen: "true",
        allowscriptaccess: "always",
      },
      keys: {
        next: { 13: "left", 34: "up", 39: "left", 40: "up" },
        prev: { 8: "right", 33: "down", 37: "right", 38: "down" },
        close: [27],
        play: [32],
        toggle: [70],
      },
      direction: { next: "left", prev: "right" },
      scrollOutside: !0,
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        iframe:
          '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
          (l ? ' allowtransparency="true"' : "") +
          "></iframe>",
        error:
          '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn:
          '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>',
      },
      openEffect: "fade",
      openSpeed: 250,
      openEasing: "swing",
      openOpacity: !0,
      openMethod: "zoomIn",
      closeEffect: "fade",
      closeSpeed: 250,
      closeEasing: "swing",
      closeOpacity: !0,
      closeMethod: "zoomOut",
      nextEffect: "elastic",
      nextSpeed: 250,
      nextEasing: "swing",
      nextMethod: "changeIn",
      prevEffect: "elastic",
      prevSpeed: 250,
      prevEasing: "swing",
      prevMethod: "changeOut",
      helpers: { overlay: !0, title: !0 },
      onCancel: i.noop,
      beforeLoad: i.noop,
      afterLoad: i.noop,
      beforeShow: i.noop,
      afterShow: i.noop,
      beforeChange: i.noop,
      beforeClose: i.noop,
      afterClose: i.noop,
    },
    group: {},
    opts: {},
    previous: null,
    coming: null,
    current: null,
    isActive: !1,
    isOpen: !1,
    isOpened: !1,
    wrap: null,
    skin: null,
    outer: null,
    inner: null,
    player: { timer: null, isActive: !1 },
    ajaxLoad: null,
    imgPreload: null,
    transitions: {},
    helpers: {},
    open: function (e, t) {
      if (e && (i.isPlainObject(t) || (t = {}), !1 !== s.close(!0)))
        return (
          i.isArray(e) || (e = p(e) ? i(e).get() : [e]),
          i.each(e, function (n, o) {
            var a,
              r,
              l,
              c,
              d,
              f,
              u,
              g = {};
            "object" === i.type(o) &&
              (o.nodeType && (o = i(o)),
              p(o)
                ? ((g = {
                    href: o.data("fancybox-href") || o.attr("href"),
                    title: o.data("fancybox-title") || o.attr("title"),
                    isDom: !0,
                    element: o,
                  }),
                  i.metadata && i.extend(!0, g, o.metadata()))
                : (g = o)),
              (a = t.href || g.href || (h(o) ? o : null)),
              (r = void 0 !== t.title ? t.title : g.title || ""),
              !(c = (l = t.content || g.content) ? "html" : t.type || g.type) &&
                g.isDom &&
                ((c = o.data("fancybox-type")) ||
                  (c = (d = o.prop("class").match(/fancybox\.(\w+)/))
                    ? d[1]
                    : null)),
              h(a) &&
                (c ||
                  (s.isImage(a)
                    ? (c = "image")
                    : s.isSWF(a)
                    ? (c = "swf")
                    : "#" === a.charAt(0)
                    ? (c = "inline")
                    : h(o) && ((c = "html"), (l = o))),
                "ajax" === c &&
                  ((f = a.split(/\s+/, 2)), (a = f.shift()), (u = f.shift()))),
              l ||
                ("inline" === c
                  ? a
                    ? (l = i(h(a) ? a.replace(/.*(?=#[^\s]+$)/, "") : a))
                    : g.isDom && (l = o)
                  : "html" === c
                  ? (l = a)
                  : c || a || !g.isDom || ((c = "inline"), (l = o))),
              i.extend(g, {
                href: a,
                type: c,
                content: l,
                title: r,
                selector: u,
              }),
              (e[n] = g);
          }),
          (s.opts = i.extend(!0, {}, s.defaults, t)),
          void 0 !== t.keys &&
            (s.opts.keys = !!t.keys && i.extend({}, s.defaults.keys, t.keys)),
          (s.group = e),
          s._start(s.opts.index)
        );
    },
    cancel: function () {
      var e = s.coming;
      e &&
        !1 !== s.trigger("onCancel") &&
        (s.hideLoading(),
        s.ajaxLoad && s.ajaxLoad.abort(),
        (s.ajaxLoad = null),
        s.imgPreload && (s.imgPreload.onload = s.imgPreload.onerror = null),
        e.wrap && e.wrap.stop(!0, !0).trigger("onReset").remove(),
        (s.coming = null),
        s.current || s._afterZoomOut(e));
    },
    close: function (e) {
      s.cancel(),
        !1 !== s.trigger("beforeClose") &&
          (s.unbindEvents(),
          s.isActive &&
            (s.isOpen && !0 !== e
              ? ((s.isOpen = s.isOpened = !1),
                (s.isClosing = !0),
                i(".fancybox-item, .fancybox-nav").remove(),
                s.wrap.stop(!0, !0).removeClass("fancybox-opened"),
                s.transitions[s.current.closeMethod]())
              : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(),
                s._afterZoomOut())));
    },
    play: function (e) {
      var t = function () {
          clearTimeout(s.player.timer);
        },
        i = function () {
          t(),
            s.current &&
              s.player.isActive &&
              (s.player.timer = setTimeout(s.next, s.current.playSpeed));
        },
        n = function () {
          t(),
            r.unbind(".player"),
            (s.player.isActive = !1),
            s.trigger("onPlayEnd");
        };
      !0 === e || (!s.player.isActive && !1 !== e)
        ? s.current &&
          (s.current.loop || s.current.index < s.group.length - 1) &&
          ((s.player.isActive = !0),
          r.bind({
            "onCancel.player beforeClose.player": n,
            "onUpdate.player": i,
            "beforeLoad.player": t,
          }),
          i(),
          s.trigger("onPlayStart"))
        : n();
    },
    next: function (e) {
      var t = s.current;
      t && (h(e) || (e = t.direction.next), s.jumpto(t.index + 1, e, "next"));
    },
    prev: function (e) {
      var t = s.current;
      t && (h(e) || (e = t.direction.prev), s.jumpto(t.index - 1, e, "prev"));
    },
    jumpto: function (e, t, i) {
      var n = s.current;
      n &&
        ((e = u(e)),
        (s.direction = t || n.direction[e >= n.index ? "next" : "prev"]),
        (s.router = i || "jumpto"),
        n.loop &&
          (e < 0 && (e = n.group.length + (e % n.group.length)),
          (e %= n.group.length)),
        void 0 !== n.group[e] && (s.cancel(), s._start(e)));
    },
    reposition: function (e, t) {
      var n,
        o = s.current,
        a = o ? o.wrap : null;
      a &&
        ((n = s._getPosition(t)),
        e && "scroll" === e.type
          ? (delete n.position, a.stop(!0, !0).animate(n, 200))
          : (a.css(n), (o.pos = i.extend({}, o.dim, n))));
    },
    update: function (e) {
      var t = e && e.type,
        i = !t || "orientationchange" === t;
      i && (clearTimeout(c), (c = null)),
        s.isOpen &&
          !c &&
          (c = setTimeout(
            function () {
              var n = s.current;
              n &&
                !s.isClosing &&
                (s.wrap.removeClass("fancybox-tmp"),
                (i || "load" === t || ("resize" === t && n.autoResize)) &&
                  s._setDimension(),
                ("scroll" === t && n.canShrink) || s.reposition(e),
                s.trigger("onUpdate"),
                (c = null));
            },
            i && !d ? 0 : 300
          ));
    },
    toggle: function (e) {
      s.isOpen &&
        ((s.current.fitToView =
          "boolean" === i.type(e) ? e : !s.current.fitToView),
        d &&
          (s.wrap.removeAttr("style").addClass("fancybox-tmp"),
          s.trigger("onUpdate")),
        s.update());
    },
    hideLoading: function () {
      r.unbind(".loading"), i("#fancybox-loading").remove();
    },
    showLoading: function () {
      var e, t;
      s.hideLoading(),
        (e = i('<div id="fancybox-loading"><div></div></div>')
          .click(s.cancel)
          .appendTo("body")),
        r.bind("keydown.loading", function (e) {
          27 === (e.which || e.keyCode) && (e.preventDefault(), s.cancel());
        }),
        s.defaults.fixed ||
          ((t = s.getViewport()),
          e.css({
            position: "absolute",
            top: 0.5 * t.h + t.y,
            left: 0.5 * t.w + t.x,
          }));
    },
    getViewport: function () {
      var t = (s.current && s.current.locked) || !1,
        i = { x: a.scrollLeft(), y: a.scrollTop() };
      return (
        t
          ? ((i.w = t[0].clientWidth), (i.h = t[0].clientHeight))
          : ((i.w = d && e.innerWidth ? e.innerWidth : a.width()),
            (i.h = d && e.innerHeight ? e.innerHeight : a.height())),
        i
      );
    },
    unbindEvents: function () {
      s.wrap && p(s.wrap) && s.wrap.unbind(".fb"),
        r.unbind(".fb"),
        a.unbind(".fb");
    },
    bindEvents: function () {
      var e,
        t = s.current;
      t &&
        (a.bind(
          "orientationchange.fb" +
            (d ? "" : " resize.fb") +
            (t.autoCenter && !t.locked ? " scroll.fb" : ""),
          s.update
        ),
        (e = t.keys) &&
          r.bind("keydown.fb", function (n) {
            var o = n.which || n.keyCode,
              a = n.target || n.srcElement;
            if (27 === o && s.coming) return !1;
            n.ctrlKey ||
              n.altKey ||
              n.shiftKey ||
              n.metaKey ||
              (a && (a.type || i(a).is("[contenteditable]"))) ||
              i.each(e, function (e, a) {
                return t.group.length > 1 && void 0 !== a[o]
                  ? (s[e](a[o]), n.preventDefault(), !1)
                  : i.inArray(o, a) > -1
                  ? (s[e](), n.preventDefault(), !1)
                  : void 0;
              });
          }),
        i.fn.mousewheel &&
          t.mouseWheel &&
          s.wrap.bind("mousewheel.fb", function (e, n, o, a) {
            for (
              var r, l = e.target || null, c = i(l), d = !1;
              c.length &&
              !(d || c.is(".fancybox-skin") || c.is(".fancybox-wrap"));

            )
              (d =
                (r = c[0]) &&
                !(r.style.overflow && "hidden" === r.style.overflow) &&
                ((r.clientWidth && r.scrollWidth > r.clientWidth) ||
                  (r.clientHeight && r.scrollHeight > r.clientHeight))),
                (c = i(c).parent());
            0 === n ||
              d ||
              (s.group.length > 1 &&
                !t.canShrink &&
                (a > 0 || o > 0
                  ? s.prev(a > 0 ? "down" : "left")
                  : (a < 0 || o < 0) && s.next(a < 0 ? "up" : "right"),
                e.preventDefault()));
          }));
    },
    trigger: function (e, t) {
      var n,
        o = t || s.coming || s.current;
      if (o) {
        if (
          (i.isFunction(o[e]) &&
            (n = o[e].apply(o, Array.prototype.slice.call(arguments, 1))),
          !1 === n)
        )
          return !1;
        o.helpers &&
          i.each(o.helpers, function (t, n) {
            n &&
              s.helpers[t] &&
              i.isFunction(s.helpers[t][e]) &&
              s.helpers[t][e](i.extend(!0, {}, s.helpers[t].defaults, n), o);
          }),
          r.trigger(e);
      }
    },
    isImage: function (e) {
      return (
        h(e) &&
        e.match(
          /(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i
        )
      );
    },
    isSWF: function (e) {
      return h(e) && e.match(/\.(swf)((\?|#).*)?$/i);
    },
    _start: function (e) {
      var t,
        n,
        o,
        a,
        r,
        l = {};
      if (((e = u(e)), !(t = s.group[e] || null))) return !1;
      if (
        ((a = (l = i.extend(!0, {}, s.opts, t)).margin),
        (r = l.padding),
        "number" === i.type(a) && (l.margin = [a, a, a, a]),
        "number" === i.type(r) && (l.padding = [r, r, r, r]),
        l.modal &&
          i.extend(!0, l, {
            closeBtn: !1,
            closeClick: !1,
            nextClick: !1,
            arrows: !1,
            mouseWheel: !1,
            keys: null,
            helpers: { overlay: { closeClick: !1 } },
          }),
        l.autoSize && (l.autoWidth = l.autoHeight = !0),
        "auto" === l.width && (l.autoWidth = !0),
        "auto" === l.height && (l.autoHeight = !0),
        (l.group = s.group),
        (l.index = e),
        (s.coming = l),
        !1 !== s.trigger("beforeLoad"))
      ) {
        if (((o = l.type), (n = l.href), !o))
          return (
            (s.coming = null),
            !(!s.current || !s.router || "jumpto" === s.router) &&
              ((s.current.index = e), s[s.router](s.direction))
          );
        if (
          ((s.isActive = !0),
          ("image" !== o && "swf" !== o) ||
            ((l.autoHeight = l.autoWidth = !1), (l.scrolling = "visible")),
          "image" === o && (l.aspectRatio = !0),
          "iframe" === o && d && (l.scrolling = "scroll"),
          (l.wrap = i(l.tpl.wrap)
            .addClass(
              "fancybox-" +
                (d ? "mobile" : "desktop") +
                " fancybox-type-" +
                o +
                " fancybox-tmp " +
                l.wrapCSS
            )
            .appendTo(l.parent || "body")),
          i.extend(l, {
            skin: i(".fancybox-skin", l.wrap),
            outer: i(".fancybox-outer", l.wrap),
            inner: i(".fancybox-inner", l.wrap),
          }),
          i.each(["Top", "Right", "Bottom", "Left"], function (e, t) {
            l.skin.css("padding" + t, g(l.padding[e]));
          }),
          s.trigger("onReady"),
          "inline" === o || "html" === o)
        ) {
          if (!l.content || !l.content.length) return s._error("content");
        } else if (!n) return s._error("href");
        "image" === o
          ? s._loadImage()
          : "ajax" === o
          ? s._loadAjax()
          : "iframe" === o
          ? s._loadIframe()
          : s._afterLoad();
      } else s.coming = null;
    },
    _error: function (e) {
      i.extend(s.coming, {
        type: "html",
        autoWidth: !0,
        autoHeight: !0,
        minWidth: 0,
        minHeight: 0,
        scrolling: "no",
        hasError: e,
        content: s.coming.tpl.error,
      }),
        s._afterLoad();
    },
    _loadImage: function () {
      var e = (s.imgPreload = new Image());
      (e.onload = function () {
        (this.onload = this.onerror = null),
          (s.coming.width = this.width / s.opts.pixelRatio),
          (s.coming.height = this.height / s.opts.pixelRatio),
          s._afterLoad();
      }),
        (e.onerror = function () {
          (this.onload = this.onerror = null), s._error("image");
        }),
        (e.src = s.coming.href),
        !0 !== e.complete && s.showLoading();
    },
    _loadAjax: function () {
      var e = s.coming;
      s.showLoading(),
        (s.ajaxLoad = i.ajax(
          i.extend({}, e.ajax, {
            url: e.href,
            error: function (e, t) {
              s.coming && "abort" !== t ? s._error("ajax", e) : s.hideLoading();
            },
            success: function (t, i) {
              "success" === i && ((e.content = t), s._afterLoad());
            },
          })
        ));
    },
    _loadIframe: function () {
      var e = s.coming,
        t = i(e.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
          .attr("scrolling", d ? "auto" : e.iframe.scrolling)
          .attr("src", e.href);
      i(e.wrap).bind("onReset", function () {
        try {
          i(this)
            .find("iframe")
            .hide()
            .attr("src", "//about:blank")
            .end()
            .empty();
        } catch (e) {}
      }),
        e.iframe.preload &&
          (s.showLoading(),
          t.one("load", function () {
            i(this).data("ready", 1),
              d || i(this).bind("load.fb", s.update),
              i(this)
                .parents(".fancybox-wrap")
                .width("100%")
                .removeClass("fancybox-tmp")
                .show(),
              s._afterLoad();
          })),
        (e.content = t.appendTo(e.inner)),
        e.iframe.preload || s._afterLoad();
    },
    _preloadImages: function () {
      var e,
        t,
        i = s.group,
        n = s.current,
        o = i.length,
        a = n.preload ? Math.min(n.preload, o - 1) : 0;
      for (t = 1; t <= a; t += 1)
        "image" === (e = i[(n.index + t) % o]).type &&
          e.href &&
          (new Image().src = e.href);
    },
    _afterLoad: function () {
      var e,
        t,
        n,
        o,
        a,
        r,
        l = s.coming,
        c = s.current,
        d = "fancybox-placeholder";
      if ((s.hideLoading(), l && !1 !== s.isActive)) {
        if (!1 === s.trigger("afterLoad", l, c))
          return (
            l.wrap.stop(!0).trigger("onReset").remove(), void (s.coming = null)
          );
        switch (
          (c &&
            (s.trigger("beforeChange", c),
            c.wrap
              .stop(!0)
              .removeClass("fancybox-opened")
              .find(".fancybox-item, .fancybox-nav")
              .remove()),
          s.unbindEvents(),
          (e = l),
          (t = l.content),
          (n = l.type),
          (o = l.scrolling),
          i.extend(s, {
            wrap: e.wrap,
            skin: e.skin,
            outer: e.outer,
            inner: e.inner,
            current: e,
            previous: c,
          }),
          (a = e.href),
          n)
        ) {
          case "inline":
          case "ajax":
          case "html":
            e.selector
              ? (t = i("<div>").html(t).find(e.selector))
              : p(t) &&
                (t.data(d) ||
                  t.data(
                    d,
                    i('<div class="' + d + '"></div>')
                      .insertAfter(t)
                      .hide()
                  ),
                (t = t.show().detach()),
                e.wrap.bind("onReset", function () {
                  i(this).find(t).length &&
                    t.hide().replaceAll(t.data(d)).data(d, !1);
                }));
            break;
          case "image":
            t = e.tpl.image.replace("{href}", a);
            break;
          case "swf":
            (t =
              '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' +
              a +
              '"></param>'),
              (r = ""),
              i.each(e.swf, function (e, i) {
                (t += '<param name="' + e + '" value="' + i + '"></param>'),
                  (r += " " + e + '="' + i + '"');
              }),
              (t +=
                '<embed src="' +
                a +
                '" type="application/x-shockwave-flash" width="100%" height="100%"' +
                r +
                "></embed></object>");
        }
        (p(t) && t.parent().is(e.inner)) || e.inner.append(t),
          s.trigger("beforeShow"),
          e.inner.css(
            "overflow",
            "yes" === o ? "scroll" : "no" === o ? "hidden" : o
          ),
          s._setDimension(),
          s.reposition(),
          (s.isOpen = !1),
          (s.coming = null),
          s.bindEvents(),
          s.isOpened
            ? c.prevMethod && s.transitions[c.prevMethod]()
            : i(".fancybox-wrap")
                .not(e.wrap)
                .stop(!0)
                .trigger("onReset")
                .remove(),
          s.transitions[s.isOpened ? e.nextMethod : e.openMethod](),
          s._preloadImages();
      }
    },
    _setDimension: function () {
      var e,
        t,
        n,
        o,
        a,
        r,
        l,
        c,
        d,
        p,
        h,
        m,
        y,
        x,
        v,
        w,
        b,
        k = s.getViewport(),
        C = 0,
        O = s.wrap,
        W = s.skin,
        _ = s.inner,
        S = s.current,
        T = S.width,
        L = S.height,
        E = S.minWidth,
        R = S.minHeight,
        j = S.maxWidth,
        P = S.maxHeight,
        H = S.scrolling,
        M = S.scrollOutside ? S.scrollbarWidth : 0,
        A = S.margin,
        I = u(A[1] + A[3]),
        D = u(A[0] + A[2]);
      if (
        (O.add(W)
          .add(_)
          .width("auto")
          .height("auto")
          .removeClass("fancybox-tmp"),
        (a = I + (n = u(W.outerWidth(!0) - W.width()))),
        (r = D + (o = u(W.outerHeight(!0) - W.height()))),
        (l = f(T) ? ((k.w - a) * u(T)) / 100 : T),
        (c = f(L) ? ((k.h - r) * u(L)) / 100 : L),
        "iframe" === S.type)
      ) {
        if (((w = S.content), S.autoHeight && 1 === w.data("ready")))
          try {
            w[0].contentWindow.document.location &&
              (_.width(l).height(9999),
              (b = w.contents().find("body")),
              M && b.css("overflow-x", "hidden"),
              (c = b.outerHeight(!0)));
          } catch (e) {}
      } else
        (S.autoWidth || S.autoHeight) &&
          (_.addClass("fancybox-tmp"),
          S.autoWidth || _.width(l),
          S.autoHeight || _.height(c),
          S.autoWidth && (l = _.width()),
          S.autoHeight && (c = _.height()),
          _.removeClass("fancybox-tmp"));
      if (
        ((T = u(l)),
        (L = u(c)),
        (h = l / c),
        (E = u(f(E) ? u(E, "w") - a : E)),
        (j = u(f(j) ? u(j, "w") - a : j)),
        (R = u(f(R) ? u(R, "h") - r : R)),
        (d = j),
        (p = P = u(f(P) ? u(P, "h") - r : P)),
        S.fitToView && ((j = Math.min(k.w - a, j)), (P = Math.min(k.h - r, P))),
        (x = k.w - I),
        (v = k.h - D),
        S.aspectRatio
          ? (T > j && (L = u((T = j) / h)),
            L > P && (T = u((L = P) * h)),
            T < E && (L = u((T = E) / h)),
            L < R && (T = u((L = R) * h)))
          : ((T = Math.max(E, Math.min(T, j))),
            S.autoHeight &&
              "iframe" !== S.type &&
              (_.width(T), (L = _.height())),
            (L = Math.max(R, Math.min(L, P)))),
        S.fitToView)
      )
        if (
          (_.width(T).height(L),
          O.width(T + n),
          (m = O.width()),
          (y = O.height()),
          S.aspectRatio)
        )
          for (; (m > x || y > v) && T > E && L > R && !(C++ > 19); )
            (L = Math.max(R, Math.min(P, L - 10))),
              (T = u(L * h)) < E && (L = u((T = E) / h)),
              T > j && (L = u((T = j) / h)),
              _.width(T).height(L),
              O.width(T + n),
              (m = O.width()),
              (y = O.height());
        else
          (T = Math.max(E, Math.min(T, T - (m - x)))),
            (L = Math.max(R, Math.min(L, L - (y - v))));
      M && "auto" === H && L < c && T + n + M < x && (T += M),
        _.width(T).height(L),
        O.width(T + n),
        (m = O.width()),
        (y = O.height()),
        (e = (m > x || y > v) && T > E && L > R),
        (t = S.aspectRatio
          ? T < d && L < p && T < l && L < c
          : (T < d || L < p) && (T < l || L < c)),
        i.extend(S, {
          dim: { width: g(m), height: g(y) },
          origWidth: l,
          origHeight: c,
          canShrink: e,
          canExpand: t,
          wPadding: n,
          hPadding: o,
          wrapSpace: y - W.outerHeight(!0),
          skinSpace: W.height() - L,
        }),
        !w && S.autoHeight && L > R && L < P && !t && _.height("auto");
    },
    _getPosition: function (e) {
      var t = s.current,
        i = s.getViewport(),
        n = t.margin,
        o = s.wrap.width() + n[1] + n[3],
        a = s.wrap.height() + n[0] + n[2],
        r = { position: "absolute", top: n[0], left: n[3] };
      return (
        t.autoCenter && t.fixed && !e && a <= i.h && o <= i.w
          ? (r.position = "fixed")
          : t.locked || ((r.top += i.y), (r.left += i.x)),
        (r.top = g(Math.max(r.top, r.top + (i.h - a) * t.topRatio))),
        (r.left = g(Math.max(r.left, r.left + (i.w - o) * t.leftRatio))),
        r
      );
    },
    _afterZoomIn: function () {
      var e = s.current;
      e &&
        ((s.isOpen = s.isOpened = !0),
        s.wrap.css("overflow", "visible").addClass("fancybox-opened"),
        s.update(),
        (e.closeClick || (e.nextClick && s.group.length > 1)) &&
          s.inner.css("cursor", "pointer").bind("click.fb", function (t) {
            i(t.target).is("a") ||
              i(t.target).parent().is("a") ||
              (t.preventDefault(), s[e.closeClick ? "close" : "next"]());
          }),
        e.closeBtn &&
          i(e.tpl.closeBtn)
            .appendTo(s.skin)
            .bind("click.fb", function (e) {
              e.preventDefault(), s.close();
            }),
        e.arrows &&
          s.group.length > 1 &&
          ((e.loop || e.index > 0) &&
            i(e.tpl.prev).appendTo(s.outer).bind("click.fb", s.prev),
          (e.loop || e.index < s.group.length - 1) &&
            i(e.tpl.next).appendTo(s.outer).bind("click.fb", s.next)),
        s.trigger("afterShow"),
        e.loop || e.index !== e.group.length - 1
          ? s.opts.autoPlay &&
            !s.player.isActive &&
            ((s.opts.autoPlay = !1), s.play())
          : s.play(!1));
    },
    _afterZoomOut: function (e) {
      (e = e || s.current),
        i(".fancybox-wrap").trigger("onReset").remove(),
        i.extend(s, {
          group: {},
          opts: {},
          router: !1,
          current: null,
          isActive: !1,
          isOpened: !1,
          isOpen: !1,
          isClosing: !1,
          wrap: null,
          skin: null,
          outer: null,
          inner: null,
        }),
        s.trigger("afterClose", e);
    },
  }),
    (s.transitions = {
      getOrigPosition: function () {
        var e = s.current,
          t = e.element,
          i = e.orig,
          n = {},
          o = 50,
          a = 50,
          r = e.hPadding,
          l = e.wPadding,
          c = s.getViewport();
        return (
          !i &&
            e.isDom &&
            t.is(":visible") &&
            ((i = t.find("img:first")).length || (i = t)),
          p(i)
            ? ((n = i.offset()),
              i.is("img") && ((o = i.outerWidth()), (a = i.outerHeight())))
            : ((n.top = c.y + (c.h - a) * e.topRatio),
              (n.left = c.x + (c.w - o) * e.leftRatio)),
          ("fixed" === s.wrap.css("position") || e.locked) &&
            ((n.top -= c.y), (n.left -= c.x)),
          (n = {
            top: g(n.top - r * e.topRatio),
            left: g(n.left - l * e.leftRatio),
            width: g(o + l),
            height: g(a + r),
          })
        );
      },
      step: function (e, t) {
        var i,
          n,
          o = t.prop,
          a = s.current,
          r = a.wrapSpace,
          l = a.skinSpace;
        ("width" !== o && "height" !== o) ||
          ((i = t.end === t.start ? 1 : (e - t.start) / (t.end - t.start)),
          s.isClosing && (i = 1 - i),
          (n = e - ("width" === o ? a.wPadding : a.hPadding)),
          s.skin[o](u("width" === o ? n : n - r * i)),
          s.inner[o](u("width" === o ? n : n - r * i - l * i)));
      },
      zoomIn: function () {
        var e = s.current,
          t = e.pos,
          n = e.openEffect,
          o = "elastic" === n,
          a = i.extend({ opacity: 1 }, t);
        delete a.position,
          o
            ? ((t = this.getOrigPosition()), e.openOpacity && (t.opacity = 0.1))
            : "fade" === n && (t.opacity = 0.1),
          s.wrap
            .css(t)
            .animate(a, {
              duration: "none" === n ? 0 : e.openSpeed,
              easing: e.openEasing,
              step: o ? this.step : null,
              complete: s._afterZoomIn,
            });
      },
      zoomOut: function () {
        var e = s.current,
          t = e.closeEffect,
          i = "elastic" === t,
          n = { opacity: 0.1 };
        i &&
          ((n = this.getOrigPosition()), e.closeOpacity && (n.opacity = 0.1)),
          s.wrap.animate(n, {
            duration: "none" === t ? 0 : e.closeSpeed,
            easing: e.closeEasing,
            step: i ? this.step : null,
            complete: s._afterZoomOut,
          });
      },
      changeIn: function () {
        var e,
          t = s.current,
          i = t.nextEffect,
          n = t.pos,
          o = { opacity: 1 },
          a = s.direction;
        (n.opacity = 0.1),
          "elastic" === i &&
            ((e = "down" === a || "up" === a ? "top" : "left"),
            "down" === a || "right" === a
              ? ((n[e] = g(u(n[e]) - 200)), (o[e] = "+=200px"))
              : ((n[e] = g(u(n[e]) + 200)), (o[e] = "-=200px"))),
          "none" === i
            ? s._afterZoomIn()
            : s.wrap
                .css(n)
                .animate(o, {
                  duration: t.nextSpeed,
                  easing: t.nextEasing,
                  complete: s._afterZoomIn,
                });
      },
      changeOut: function () {
        var e = s.previous,
          t = e.prevEffect,
          n = { opacity: 0.1 },
          o = s.direction;
        "elastic" === t &&
          (n["down" === o || "up" === o ? "top" : "left"] =
            ("up" === o || "left" === o ? "-" : "+") + "=200px"),
          e.wrap.animate(n, {
            duration: "none" === t ? 0 : e.prevSpeed,
            easing: e.prevEasing,
            complete: function () {
              i(this).trigger("onReset").remove();
            },
          });
      },
    }),
    (s.helpers.overlay = {
      defaults: {
        closeClick: !0,
        speedOut: 200,
        showEarly: !0,
        css: {},
        locked: !d,
        fixed: !0,
      },
      overlay: null,
      fixed: !1,
      el: i("html"),
      create: function (e) {
        (e = i.extend({}, this.defaults, e)),
          this.overlay && this.close(),
          (this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(
            s.coming ? s.coming.parent : e.parent
          )),
          (this.fixed = !1),
          e.fixed &&
            s.defaults.fixed &&
            (this.overlay.addClass("fancybox-overlay-fixed"),
            (this.fixed = !0));
      },
      open: function (e) {
        var t = this;
        (e = i.extend({}, this.defaults, e)),
          this.overlay
            ? this.overlay.unbind(".overlay").width("auto").height("auto")
            : this.create(e),
          this.fixed ||
            (a.bind("resize.overlay", i.proxy(this.update, this)),
            this.update()),
          e.closeClick &&
            this.overlay.bind("click.overlay", function (e) {
              if (i(e.target).hasClass("fancybox-overlay"))
                return s.isActive ? s.close() : t.close(), !1;
            }),
          this.overlay.css(e.css).show();
      },
      close: function () {
        var e, t;
        a.unbind("resize.overlay"),
          this.el.hasClass("fancybox-lock") &&
            (i(".fancybox-margin").removeClass("fancybox-margin"),
            (e = a.scrollTop()),
            (t = a.scrollLeft()),
            this.el.removeClass("fancybox-lock"),
            a.scrollTop(e).scrollLeft(t)),
          i(".fancybox-overlay").remove().hide(),
          i.extend(this, { overlay: null, fixed: !1 });
      },
      update: function () {
        var e,
          i = "100%";
        this.overlay.width(i).height("100%"),
          l
            ? ((e = Math.max(
                t.documentElement.offsetWidth,
                t.body.offsetWidth
              )),
              r.width() > e && (i = r.width()))
            : r.width() > a.width() && (i = r.width()),
          this.overlay.width(i).height(r.height());
      },
      onReady: function (e, t) {
        var n = this.overlay;
        i(".fancybox-overlay").stop(!0, !0),
          n || this.create(e),
          e.locked &&
            this.fixed &&
            t.fixed &&
            (n ||
              (this.margin =
                r.height() > a.height() &&
                i("html").css("margin-right").replace("px", "")),
            (t.locked = this.overlay.append(t.wrap)),
            (t.fixed = !1)),
          !0 === e.showEarly && this.beforeShow.apply(this, arguments);
      },
      beforeShow: function (e, t) {
        var n, o;
        t.locked &&
          (!1 !== this.margin &&
            (i("*")
              .filter(function () {
                return (
                  "fixed" === i(this).css("position") &&
                  !i(this).hasClass("fancybox-overlay") &&
                  !i(this).hasClass("fancybox-wrap")
                );
              })
              .addClass("fancybox-margin"),
            this.el.addClass("fancybox-margin")),
          (n = a.scrollTop()),
          (o = a.scrollLeft()),
          this.el.addClass("fancybox-lock"),
          a.scrollTop(n).scrollLeft(o)),
          this.open(e);
      },
      onUpdate: function () {
        this.fixed || this.update();
      },
      afterClose: function (e) {
        this.overlay &&
          !s.coming &&
          this.overlay.fadeOut(e.speedOut, i.proxy(this.close, this));
      },
    }),
    (s.helpers.title = {
      defaults: { type: "float", position: "bottom" },
      beforeShow: function (e) {
        var t,
          n,
          o = s.current,
          a = o.title,
          r = e.type;
        if (
          (i.isFunction(a) && (a = a.call(o.element, o)),
          h(a) && "" !== i.trim(a))
        ) {
          switch (
            ((t = i(
              '<div class="fancybox-title fancybox-title-' +
                r +
                '-wrap">' +
                a +
                "</div>"
            )),
            r)
          ) {
            case "inside":
              n = s.skin;
              break;
            case "outside":
              n = s.wrap;
              break;
            case "over":
              n = s.inner;
              break;
            default:
              (n = s.skin),
                t.appendTo("body"),
                l && t.width(t.width()),
                t.wrapInner('<span class="child"></span>'),
                (s.current.margin[2] += Math.abs(u(t.css("margin-bottom"))));
          }
          t["top" === e.position ? "prependTo" : "appendTo"](n);
        }
      },
    }),
    (i.fn.fancybox = function (e) {
      var t,
        n = i(this),
        o = this.selector || "",
        a = function (a) {
          var r,
            l,
            c = i(this).blur(),
            d = t;
          a.ctrlKey ||
            a.altKey ||
            a.shiftKey ||
            a.metaKey ||
            c.is(".fancybox-wrap") ||
            ((r = e.groupAttr || "data-fancybox-group"),
            (l = c.attr(r)) || ((r = "rel"), (l = c.get(0)[r])),
            l &&
              "" !== l &&
              "nofollow" !== l &&
              (d = (c = (c = o.length ? i(o) : n).filter(
                "[" + r + '="' + l + '"]'
              )).index(this)),
            (e.index = d),
            !1 !== s.open(c, e) && a.preventDefault());
        };
      return (
        (t = (e = e || {}).index || 0),
        o && !1 !== e.live
          ? r
              .undelegate(o, "click.fb-start")
              .delegate(
                o + ":not('.fancybox-item, .fancybox-nav')",
                "click.fb-start",
                a
              )
          : n.unbind("click.fb-start").bind("click.fb-start", a),
        this.filter("[data-fancybox-start=1]").trigger("click"),
        this
      );
    }),
    r.ready(function () {
      var t, n, a, r;
      void 0 === i.scrollbarWidth &&
        (i.scrollbarWidth = function () {
          var e = i(
              '<div style="width:50px;height:50px;overflow:auto"><div/></div>'
            ).appendTo("body"),
            t = e.children(),
            n = t.innerWidth() - t.height(99).innerWidth();
          return e.remove(), n;
        }),
        void 0 === i.support.fixedPosition &&
          (i.support.fixedPosition =
            ((a = i('<div style="position:fixed;top:20px;"></div>').appendTo(
              "body"
            )),
            (r = 20 === a[0].offsetTop || 15 === a[0].offsetTop),
            a.remove(),
            r)),
        i.extend(s.defaults, {
          scrollbarWidth: i.scrollbarWidth(),
          fixed: i.support.fixedPosition,
          parent: i("body"),
        }),
        (t = i(e).width()),
        o.addClass("fancybox-lock-test"),
        (n = i(e).width()),
        o.removeClass("fancybox-lock-test"),
        i(
          "<style type='text/css'>.fancybox-margin{margin-right:" +
            (n - t) +
            "px;}</style>"
        ).appendTo("head");
    });
})(window, document, jQuery);

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!(function (a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: { start: null, current: null },
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ["busy"],
          animating: ["busy"],
          dragging: ["interacting"],
        },
      }),
      a.each(
        ["onResize", "onThrottledResize"],
        a.proxy(function (b, c) {
          this._handlers[c] = a.proxy(this[c], this);
        }, this)
      ),
      a.each(
        e.Plugins,
        a.proxy(function (a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
        }, this)
      ),
      a.each(
        e.Workers,
        a.proxy(function (b, c) {
          this._pipe.push({ filter: c.filter, run: a.proxy(c.run, this) });
        }, this)
      ),
      this.setup(),
      this.initialize();
  }
  (e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    checkVisibility: !0,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: "swing",
    slideTransition: "",
    info: !1,
    nestedItemSelector: !1,
    itemElement: "div",
    stageElement: "div",
    refreshClass: "owl-refresh",
    loadedClass: "owl-loaded",
    loadingClass: "owl-loading",
    rtlClass: "owl-rtl",
    responsiveClass: "owl-responsive",
    dragClass: "owl-drag",
    itemClass: "owl-item",
    stageClass: "owl-stage",
    stageOuterClass: "owl-stage-outer",
    grabClass: "owl-grab",
  }),
    (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
    (e.Type = { Event: "event", State: "state" }),
    (e.Plugins = {}),
    (e.Workers = [
      {
        filter: ["width", "settings"],
        run: function () {
          this._width = this.$element.width();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          this.$stage.children(".cloned").remove();
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this.settings.margin || "",
            c = !this.settings.autoWidth,
            d = this.settings.rtl,
            e = {
              width: "auto",
              "margin-left": d ? b : "",
              "margin-right": d ? "" : b,
            };
          !c && this.$stage.children().css(e), (a.css = e);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin,
            c = null,
            d = this._items.length,
            e = !this.settings.autoWidth,
            f = [];
          for (a.items = { merge: !1, width: b }; d--; )
            (c = this._mergers[d]),
              (c =
                (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
                c),
              (a.items.merge = c > 1 || a.items.merge),
              (f[d] = e ? b * c : this._items[d].width());
          this._widths = f;
        },
      },
      {
        filter: ["items", "settings"],
        run: function () {
          var b = [],
            c = this._items,
            d = this.settings,
            e = Math.max(2 * d.items, 4),
            f = 2 * Math.ceil(c.length / 2),
            g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0,
            h = "",
            i = "";
          for (g /= 2; g > 0; )
            b.push(this.normalize(b.length / 2, !0)),
              (h += c[b[b.length - 1]][0].outerHTML),
              b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
              (i = c[b[b.length - 1]][0].outerHTML + i),
              (g -= 1);
          (this._clones = b),
            a(h).addClass("cloned").appendTo(this.$stage),
            a(i).addClass("cloned").prependTo(this.$stage);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          for (
            var a = this.settings.rtl ? 1 : -1,
              b = this._clones.length + this._items.length,
              c = -1,
              d = 0,
              e = 0,
              f = [];
            ++c < b;

          )
            (d = f[c - 1] || 0),
              (e = this._widths[this.relative(c)] + this.settings.margin),
              f.push(d + e * a);
          this._coordinates = f;
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function () {
          var a = this.settings.stagePadding,
            b = this._coordinates,
            c = {
              width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
              "padding-left": a || "",
              "padding-right": a || "",
            };
          this.$stage.css(c);
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          var b = this._coordinates.length,
            c = !this.settings.autoWidth,
            d = this.$stage.children();
          if (c && a.items.merge)
            for (; b--; )
              (a.css.width = this._widths[this.relative(b)]),
                d.eq(b).css(a.css);
          else c && ((a.css.width = a.items.width), d.css(a.css));
        },
      },
      {
        filter: ["items"],
        run: function () {
          this._coordinates.length < 1 && this.$stage.removeAttr("style");
        },
      },
      {
        filter: ["width", "items", "settings"],
        run: function (a) {
          (a.current = a.current ? this.$stage.children().index(a.current) : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current)
            )),
            this.reset(a.current);
        },
      },
      {
        filter: ["position"],
        run: function () {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ["width", "position", "items", "settings"],
        run: function () {
          var a,
            b,
            c,
            d,
            e = this.settings.rtl ? 1 : -1,
            f = 2 * this.settings.stagePadding,
            g = this.coordinates(this.current()) + f,
            h = g + this.width() * e,
            i = [];
          for (c = 0, d = this._coordinates.length; c < d; c++)
            (a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                i.push(c);
          this.$stage.children(".active").removeClass("active"),
            this.$stage
              .children(":eq(" + i.join("), :eq(") + ")")
              .addClass("active"),
            this.$stage.children(".center").removeClass("center"),
            this.settings.center &&
              this.$stage.children().eq(this.current()).addClass("center");
        },
      },
    ]),
    (e.prototype.initializeStage = function () {
      (this.$stage = this.$element.find("." + this.settings.stageClass)),
        this.$stage.length ||
          (this.$element.addClass(this.options.loadingClass),
          (this.$stage = a("<" + this.settings.stageElement + ">", {
            class: this.settings.stageClass,
          }).wrap(a("<div/>", { class: this.settings.stageOuterClass }))),
          this.$element.append(this.$stage.parent()));
    }),
    (e.prototype.initializeItems = function () {
      var b = this.$element.find(".owl-item");
      if (b.length)
        return (
          (this._items = b.get().map(function (b) {
            return a(b);
          })),
          (this._mergers = this._items.map(function () {
            return 1;
          })),
          void this.refresh()
        );
      this.replace(this.$element.children().not(this.$stage.parent())),
        this.isVisible() ? this.refresh() : this.invalidate("width"),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass);
    }),
    (e.prototype.initialize = function () {
      if (
        (this.enter("initializing"),
        this.trigger("initialize"),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is("pre-loading"))
      ) {
        var a, b, c;
        (a = this.$element.find("img")),
          (b = this.settings.nestedItemSelector
            ? "." + this.settings.nestedItemSelector
            : d),
          (c = this.$element.children(b).width()),
          a.length && c <= 0 && this.preloadAutoWidthImages(a);
      }
      this.initializeStage(),
        this.initializeItems(),
        this.registerEventHandlers(),
        this.leave("initializing"),
        this.trigger("initialized");
    }),
    (e.prototype.isVisible = function () {
      return !this.settings.checkVisibility || this.$element.is(":visible");
    }),
    (e.prototype.setup = function () {
      var b = this.viewport(),
        c = this.options.responsive,
        d = -1,
        e = null;
      c
        ? (a.each(c, function (a) {
            a <= b && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          "function" == typeof e.stagePadding &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              "class",
              this.$element
                .attr("class")
                .replace(
                  new RegExp(
                    "(" + this.options.responsiveClass + "-)\\S+\\s",
                    "g"
                  ),
                  "$1" + d
                )
            ))
        : (e = a.extend({}, this.options)),
        this.trigger("change", { property: { name: "settings", value: e } }),
        (this._breakpoint = d),
        (this.settings = e),
        this.invalidate("settings"),
        this.trigger("changed", {
          property: { name: "settings", value: this.settings },
        });
    }),
    (e.prototype.optionsLogic = function () {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function (b) {
      var c = this.trigger("prepare", { content: b });
      return (
        c.data ||
          (c.data = a("<" + this.settings.itemElement + "/>")
            .addClass(this.options.itemClass)
            .append(b)),
        this.trigger("prepared", { content: c.data }),
        c.data
      );
    }),
    (e.prototype.update = function () {
      for (
        var b = 0,
          c = this._pipe.length,
          d = a.proxy(function (a) {
            return this[a];
          }, this._invalidated),
          e = {};
        b < c;

      )
        (this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
      (this._invalidated = {}), !this.is("valid") && this.enter("valid");
    }),
    (e.prototype.width = function (a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function () {
      this.enter("refreshing"),
        this.trigger("refresh"),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave("refreshing"),
        this.trigger("refreshed");
    }),
    (e.prototype.onThrottledResize = function () {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate
        ));
    }),
    (e.prototype.onResize = function () {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.isVisible() &&
        (this.enter("resizing"),
        this.trigger("resize").isDefaultPrevented()
          ? (this.leave("resizing"), !1)
          : (this.invalidate("width"),
            this.refresh(),
            this.leave("resizing"),
            void this.trigger("resized")))
      );
    }),
    (e.prototype.registerEventHandlers = function () {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + ".owl.core",
          a.proxy(this.onTransitionEnd, this)
        ),
        !1 !== this.settings.responsive &&
          this.on(b, "resize", this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on("mousedown.owl.core", a.proxy(this.onDragStart, this)),
          this.$stage.on(
            "dragstart.owl.core selectstart.owl.core",
            function () {
              return !1;
            }
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            "touchstart.owl.core",
            a.proxy(this.onDragStart, this)
          ),
          this.$stage.on(
            "touchcancel.owl.core",
            a.proxy(this.onDragEnd, this)
          ));
    }),
    (e.prototype.onDragStart = function (b) {
      var d = null;
      3 !== b.which &&
        (a.support.transform
          ? ((d = this.$stage
              .css("transform")
              .replace(/.*\(|\)| /g, "")
              .split(",")),
            (d = {
              x: d[16 === d.length ? 12 : 4],
              y: d[16 === d.length ? 13 : 5],
            }))
          : ((d = this.$stage.position()),
            (d = {
              x: this.settings.rtl
                ? d.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin
                : d.left,
              y: d.top,
            })),
        this.is("animating") &&
          (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
          this.invalidate("position")),
        this.$element.toggleClass(
          this.options.grabClass,
          "mousedown" === b.type
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          "mouseup.owl.core touchend.owl.core",
          a.proxy(this.onDragEnd, this)
        ),
        a(c).one(
          "mousemove.owl.core touchmove.owl.core",
          a.proxy(function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on(
              "mousemove.owl.core touchmove.owl.core",
              a.proxy(this.onDragMove, this)
            ),
              (Math.abs(d.x) < Math.abs(d.y) && this.is("valid")) ||
                (b.preventDefault(),
                this.enter("dragging"),
                this.trigger("drag"));
          }, this)
        ));
    }),
    (e.prototype.onDragMove = function (a) {
      var b = null,
        c = null,
        d = null,
        e = this.difference(this._drag.pointer, this.pointer(a)),
        f = this.difference(this._drag.stage.start, e);
      this.is("dragging") &&
        (a.preventDefault(),
        this.settings.loop
          ? ((b = this.coordinates(this.minimum())),
            (c = this.coordinates(this.maximum() + 1) - b),
            (f.x = ((((f.x - b) % c) + c) % c) + b))
          : ((b = this.settings.rtl
              ? this.coordinates(this.maximum())
              : this.coordinates(this.minimum())),
            (c = this.settings.rtl
              ? this.coordinates(this.minimum())
              : this.coordinates(this.maximum())),
            (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
            (f.x = Math.max(Math.min(f.x, b + d), c + d))),
        (this._drag.stage.current = f),
        this.animate(f.x));
    }),
    (e.prototype.onDragEnd = function (b) {
      var d = this.difference(this._drag.pointer, this.pointer(b)),
        e = this._drag.stage.current,
        f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
      a(c).off(".owl.core"),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
          this.invalidate("position"),
          this.update(),
          (this._drag.direction = f),
          (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one("click.owl.core", function () {
              return !1;
            })),
        this.is("dragging") &&
          (this.leave("dragging"), this.trigger("dragged"));
    }),
    (e.prototype.closest = function (b, c) {
      var e = -1,
        f = 30,
        g = this.width(),
        h = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            h,
            a.proxy(function (a, i) {
              return (
                "left" === c && b > i - f && b < i + f
                  ? (e = a)
                  : "right" === c && b > i - g - f && b < i - g + f
                  ? (e = a + 1)
                  : this.op(b, "<", i) &&
                    this.op(b, ">", h[a + 1] !== d ? h[a + 1] : i - g) &&
                    (e = "left" === c ? a + 1 : a),
                -1 === e
              );
            }, this)
          ),
        this.settings.loop ||
          (this.op(b, ">", h[this.minimum()])
            ? (e = b = this.minimum())
            : this.op(b, "<", h[this.maximum()]) && (e = b = this.maximum())),
        e
      );
    }),
    (e.prototype.animate = function (b) {
      var c = this.speed() > 0;
      this.is("animating") && this.onTransitionEnd(),
        c && (this.enter("animating"), this.trigger("translate")),
        a.support.transform3d && a.support.transition
          ? this.$stage.css({
              transform: "translate3d(" + b + "px,0px,0px)",
              transition:
                this.speed() / 1e3 +
                "s" +
                (this.settings.slideTransition
                  ? " " + this.settings.slideTransition
                  : ""),
            })
          : c
          ? this.$stage.animate(
              { left: b + "px" },
              this.speed(),
              this.settings.fallbackEasing,
              a.proxy(this.onTransitionEnd, this)
            )
          : this.$stage.css({ left: b + "px" });
    }),
    (e.prototype.is = function (a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }),
    (e.prototype.current = function (a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        var b = this.trigger("change", {
          property: { name: "position", value: a },
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate("position"),
          this.trigger("changed", {
            property: { name: "position", value: this._current },
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function (b) {
      return (
        "string" === a.type(b) &&
          ((this._invalidated[b] = !0),
          this.is("valid") && this.leave("valid")),
        a.map(this._invalidated, function (a, b) {
          return b;
        })
      );
    }),
    (e.prototype.reset = function (a) {
      (a = this.normalize(a)) !== d &&
        ((this._speed = 0),
        (this._current = a),
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(a)),
        this.release(["translate", "translated"]));
    }),
    (e.prototype.normalize = function (a, b) {
      var c = this._items.length,
        e = b ? 0 : this._clones.length;
      return (
        !this.isNumeric(a) || c < 1
          ? (a = d)
          : (a < 0 || a >= c + e) &&
            (a = ((((a - e / 2) % c) + c) % c) + e / 2),
        a
      );
    }),
    (e.prototype.relative = function (a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0);
    }),
    (e.prototype.maximum = function (a) {
      var b,
        c,
        d,
        e = this.settings,
        f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
      else if (e.autoWidth || e.merge) {
        if ((b = this._items.length))
          for (
            c = this._items[--b].width(), d = this.$element.width();
            b-- && !((c += this._items[b].width() + this.settings.margin) > d);

          );
        f = b + 1;
      } else
        f = e.center ? this._items.length - 1 : this._items.length - e.items;
      return a && (f -= this._clones.length / 2), Math.max(f, 0);
    }),
    (e.prototype.minimum = function (a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function (a) {
      return a === d
        ? this._items.slice()
        : ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function (a) {
      return a === d
        ? this._mergers.slice()
        : ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function (b) {
      var c = this._clones.length / 2,
        e = c + this._items.length,
        f = function (a) {
          return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d
        ? a.map(this._clones, function (a, b) {
            return f(b);
          })
        : a.map(this._clones, function (a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function (a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function (b) {
      var c,
        e = 1,
        f = b - 1;
      return b === d
        ? a.map(
            this._coordinates,
            a.proxy(function (a, b) {
              return this.coordinates(b);
            }, this)
          )
        : (this.settings.center
            ? (this.settings.rtl && ((e = -1), (f = b + 1)),
              (c = this._coordinates[b]),
              (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e))
            : (c = this._coordinates[f] || 0),
          (c = Math.ceil(c)));
    }),
    (e.prototype.duration = function (a, b, c) {
      return 0 === c
        ? 0
        : Math.min(Math.max(Math.abs(b - a), 1), 6) *
            Math.abs(c || this.settings.smartSpeed);
    }),
    (e.prototype.to = function (a, b) {
      var c = this.current(),
        d = null,
        e = a - this.relative(c),
        f = (e > 0) - (e < 0),
        g = this._items.length,
        h = this.minimum(),
        i = this.maximum();
      this.settings.loop
        ? (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g),
          (a = c + e),
          (d = ((((a - h) % g) + g) % g) + h) !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c)))
        : this.settings.rewind
        ? ((i += 1), (a = ((a % i) + i) % i))
        : (a = Math.max(h, Math.min(i, a))),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.isVisible() && this.update();
    }),
    (e.prototype.next = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function (a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.onTransitionEnd = function (a) {
      if (
        a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      )
        return !1;
      this.leave("animating"), this.trigger("translated");
    }),
    (e.prototype.viewport = function () {
      var d;
      return (
        this.options.responsiveBaseElement !== b
          ? (d = a(this.options.responsiveBaseElement).width())
          : b.innerWidth
          ? (d = b.innerWidth)
          : c.documentElement && c.documentElement.clientWidth
          ? (d = c.documentElement.clientWidth)
          : console.warn("Can not detect viewport width."),
        d
      );
    }),
    (e.prototype.replace = function (b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find("." + this.settings.nestedItemSelector)),
        b
          .filter(function () {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function (a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                );
            }, this)
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition)
            ? this.settings.startPosition
            : 0
        ),
        this.invalidate("items");
    }),
    (e.prototype.add = function (b, c) {
      var e = this.relative(this._current);
      (c = c === d ? this._items.length : this.normalize(c, !0)),
        (b = b instanceof jQuery ? b : a(b)),
        this.trigger("add", { content: b, position: c }),
        (b = this.prepare(b)),
        0 === this._items.length || c === this._items.length
          ? (0 === this._items.length && this.$stage.append(b),
            0 !== this._items.length && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            ))
          : (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(
              c,
              0,
              1 *
                b
                  .find("[data-merge]")
                  .addBack("[data-merge]")
                  .attr("data-merge") || 1
            )),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate("items"),
        this.trigger("added", { content: b, position: c });
    }),
    (e.prototype.remove = function (a) {
      (a = this.normalize(a, !0)) !== d &&
        (this.trigger("remove", { content: this._items[a], position: a }),
        this._items[a].remove(),
        this._items.splice(a, 1),
        this._mergers.splice(a, 1),
        this.invalidate("items"),
        this.trigger("removed", { content: null, position: a }));
    }),
    (e.prototype.preloadAutoWidthImages = function (b) {
      b.each(
        a.proxy(function (b, c) {
          this.enter("pre-loading"),
            (c = a(c)),
            a(new Image())
              .one(
                "load",
                a.proxy(function (a) {
                  c.attr("src", a.target.src),
                    c.css("opacity", 1),
                    this.leave("pre-loading"),
                    !this.is("pre-loading") &&
                      !this.is("initializing") &&
                      this.refresh();
                }, this)
              )
              .attr(
                "src",
                c.attr("src") || c.attr("data-src") || c.attr("data-src-retina")
              );
        }, this)
      );
    }),
    (e.prototype.destroy = function () {
      this.$element.off(".owl.core"),
        this.$stage.off(".owl.core"),
        a(c).off(".owl.core"),
        !1 !== this.settings.responsive &&
          (b.clearTimeout(this.resizeTimer),
          this.off(b, "resize", this._handlers.onThrottledResize));
      for (var d in this._plugins) this._plugins[d].destroy();
      this.$stage.children(".cloned").remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.remove(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            "class",
            this.$element
              .attr("class")
              .replace(
                new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                ""
              )
          )
          .removeData("owl.carousel");
    }),
    (e.prototype.op = function (a, b, c) {
      var d = this.settings.rtl;
      switch (b) {
        case "<":
          return d ? a > c : a < c;
        case ">":
          return d ? a < c : a > c;
        case ">=":
          return d ? a <= c : a >= c;
        case "<=":
          return d ? a >= c : a <= c;
      }
    }),
    (e.prototype.on = function (a, b, c, d) {
      a.addEventListener
        ? a.addEventListener(b, c, d)
        : a.attachEvent && a.attachEvent("on" + b, c);
    }),
    (e.prototype.off = function (a, b, c, d) {
      a.removeEventListener
        ? a.removeEventListener(b, c, d)
        : a.detachEvent && a.detachEvent("on" + b, c);
    }),
    (e.prototype.trigger = function (b, c, d, f, g) {
      var h = { item: { count: this._items.length, index: this.current() } },
        i = a.camelCase(
          a
            .grep(["on", b, d], function (a) {
              return a;
            })
            .join("-")
            .toLowerCase()
        ),
        j = a.Event(
          [b, "owl", d || "carousel"].join(".").toLowerCase(),
          a.extend({ relatedTarget: this }, h, c)
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function (a, b) {
            b.onTrigger && b.onTrigger(j);
          }),
          this.register({ type: e.Type.Event, name: b }),
          this.$element.trigger(j),
          this.settings &&
            "function" == typeof this.settings[i] &&
            this.settings[i].call(this, j)),
        j
      );
    }),
    (e.prototype.enter = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++;
        }, this)
      );
    }),
    (e.prototype.leave = function (b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function (a, b) {
          this._states.current[b]--;
        }, this)
      );
    }),
    (e.prototype.register = function (b) {
      if (b.type === e.Type.Event) {
        if (
          (a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl)
        ) {
          var c = a.event.special[b.name]._default;
          (a.event.special[b.name]._default = function (a) {
            return !c ||
              !c.apply ||
              (a.namespace && -1 !== a.namespace.indexOf("owl"))
              ? a.namespace && a.namespace.indexOf("owl") > -1
              : c.apply(this, arguments);
          }),
            (a.event.special[b.name].owl = !0);
        }
      } else
        b.type === e.Type.State &&
          (this._states.tags[b.name]
            ? (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags
              ))
            : (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function (c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d;
            }, this)
          )));
    }),
    (e.prototype.suppress = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          this._supress[b] = !0;
        }, this)
      );
    }),
    (e.prototype.release = function (b) {
      a.each(
        b,
        a.proxy(function (a, b) {
          delete this._supress[b];
        }, this)
      );
    }),
    (e.prototype.pointer = function (a) {
      var c = { x: null, y: null };
      return (
        (a = a.originalEvent || a || b.event),
        (a =
          a.touches && a.touches.length
            ? a.touches[0]
            : a.changedTouches && a.changedTouches.length
            ? a.changedTouches[0]
            : a),
        a.pageX
          ? ((c.x = a.pageX), (c.y = a.pageY))
          : ((c.x = a.clientX), (c.y = a.clientY)),
        c
      );
    }),
    (e.prototype.isNumeric = function (a) {
      return !isNaN(parseFloat(a));
    }),
    (e.prototype.difference = function (a, b) {
      return { x: a.x - b.x, y: a.y - b.y };
    }),
    (a.fn.owlCarousel = function (b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        var d = a(this),
          f = d.data("owl.carousel");
        f ||
          ((f = new e(this, "object" == typeof b && b)),
          d.data("owl.carousel", f),
          a.each(
            [
              "next",
              "prev",
              "to",
              "destroy",
              "refresh",
              "replace",
              "add",
              "remove",
            ],
            function (b, c) {
              f.register({ type: e.Type.Event, name: c }),
                f.$element.on(
                  c + ".owl.carousel.core",
                  a.proxy(function (a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c]));
                  }, f)
                );
            }
          )),
          "string" == typeof b && "_" !== b.charAt(0) && f[b].apply(f, c);
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
      (e.prototype.watch = function () {
        this._interval ||
          ((this._visible = this._core.isVisible()),
          (this._interval = b.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval
          )));
      }),
      (e.prototype.refresh = function () {
        this._core.isVisible() !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass("owl-hidden", !this._visible),
          this._visible &&
            this._core.invalidate("width") &&
            this._core.refresh());
      }),
      (e.prototype.destroy = function () {
        var a, c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
            a.proxy(function (b) {
              if (
                b.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((b.property && "position" == b.property.name) ||
                  "initialized" == b.type)
              ) {
                var c = this._core.settings,
                  e = (c.center && Math.ceil(c.items / 2)) || c.items,
                  f = (c.center && -1 * e) || 0,
                  g =
                    (b.property && b.property.value !== d
                      ? b.property.value
                      : this._core.current()) + f,
                  h = this._core.clones().length,
                  i = a.proxy(function (a, b) {
                    this.load(b);
                  }, this);
                for (
                  c.lazyLoadEager > 0 &&
                  ((e += c.lazyLoadEager),
                  c.loop && ((g -= c.lazyLoadEager), e++));
                  f++ < e;

                )
                  this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++;
              }
            }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
      (e.prototype.load = function (c) {
        var d = this._core.$stage.children().eq(c),
          e = d && d.find(".owl-lazy");
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function (c, d) {
              var e,
                f = a(d),
                g =
                  (b.devicePixelRatio > 1 && f.attr("data-src-retina")) ||
                  f.attr("data-src") ||
                  f.attr("data-srcset");
              this._core.trigger("load", { element: f, url: g }, "lazy"),
                f.is("img")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          f.css("opacity", 1),
                            this._core.trigger(
                              "loaded",
                              { element: f, url: g },
                              "lazy"
                            );
                        }, this)
                      )
                      .attr("src", g)
                  : f.is("source")
                  ? f
                      .one(
                        "load.owl.lazy",
                        a.proxy(function () {
                          this._core.trigger(
                            "loaded",
                            { element: f, url: g },
                            "lazy"
                          );
                        }, this)
                      )
                      .attr("srcset", g)
                  : ((e = new Image()),
                    (e.onload = a.proxy(function () {
                      f.css({
                        "background-image": 'url("' + g + '")',
                        opacity: "1",
                      }),
                        this._core.trigger(
                          "loaded",
                          { element: f, url: g },
                          "lazy"
                        );
                    }, this)),
                    (e.src = g));
            }, this)
          ),
          this._loaded.push(d.get(0)));
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (c) {
      (this._core = c),
        (this._previousHeight = null),
        (this._handlers = {
          "initialized.owl.carousel refreshed.owl.carousel": a.proxy(function (
            a
          ) {
            a.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              "position" === a.property.name &&
              this.update();
          }, this),
          "loaded.owl.lazy": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest("." + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        (this._intervalId = null);
      var d = this;
      a(b).on("load", function () {
        d._core.settings.autoHeight && d.update();
      }),
        a(b).resize(function () {
          d._core.settings.autoHeight &&
            (null != d._intervalId && clearTimeout(d._intervalId),
            (d._intervalId = setTimeout(function () {
              d.update();
            }, 250)));
        });
    };
    (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
      (e.prototype.update = function () {
        var b = this._core._current,
          c = b + this._core.settings.items,
          d = this._core.settings.lazyLoad,
          e = this._core.$stage.children().toArray().slice(b, c),
          f = [],
          g = 0;
        a.each(e, function (b, c) {
          f.push(a(c).height());
        }),
          (g = Math.max.apply(null, f)),
          g <= 1 && d && this._previousHeight && (g = this._previousHeight),
          (this._previousHeight = g),
          this._core.$stage
            .parent()
            .height(g)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.register({
                type: "state",
                name: "playing",
                tags: ["interacting"],
              });
          }, this),
          "resize.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.is("resizing") &&
              this._core.$stage.find(".cloned .owl-video-frame").remove();
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" === a.property.name &&
              this._playing &&
              this.stop();
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content).find(".owl-video");
              c.length &&
                (c.css("display", "none"), this.fetch(c, a(b.content)));
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          "click.owl.video",
          ".owl-video-play-icon",
          a.proxy(function (a) {
            this.play(a);
          }, this)
        );
    };
    (e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
      (e.prototype.fetch = function (a, b) {
        var c = (function () {
            return a.attr("data-vimeo-id")
              ? "vimeo"
              : a.attr("data-vzaar-id")
              ? "vzaar"
              : "youtube";
          })(),
          d =
            a.attr("data-vimeo-id") ||
            a.attr("data-youtube-id") ||
            a.attr("data-vzaar-id"),
          e = a.attr("data-width") || this._core.settings.videoWidth,
          f = a.attr("data-height") || this._core.settings.videoHeight,
          g = a.attr("href");
        if (!g) throw new Error("Missing video URL.");
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
          )),
          d[3].indexOf("youtu") > -1)
        )
          c = "youtube";
        else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
        else {
          if (!(d[3].indexOf("vzaar") > -1))
            throw new Error("Video URL not supported.");
          c = "vzaar";
        }
        (d = d[6]),
          (this._videos[g] = { type: c, id: d, width: e, height: f }),
          b.attr("data-video", g),
          this.thumbnail(a, this._videos[g]);
      }),
      (e.prototype.thumbnail = function (b, c) {
        var d,
          e,
          f,
          g =
            c.width && c.height
              ? "width:" + c.width + "px;height:" + c.height + "px;"
              : "",
          h = b.find("img"),
          i = "src",
          j = "",
          k = this._core.settings,
          l = function (c) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad
                ? a("<div/>", { class: "owl-video-tn " + j, srcType: c })
                : a("<div/>", {
                    class: "owl-video-tn",
                    style: "opacity:1;background-image:url(" + c + ")",
                  })),
              b.after(d),
              b.after(e);
          };
        if (
          (b.wrap(a("<div/>", { class: "owl-video-wrapper", style: g })),
          this._core.settings.lazyLoad && ((i = "data-src"), (j = "owl-lazy")),
          h.length)
        )
          return l(h.attr(i)), h.remove(), !1;
        "youtube" === c.type
          ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"), l(f))
          : "vimeo" === c.type
          ? a.ajax({
              type: "GET",
              url: "//vimeo.com/api/v2/video/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a[0].thumbnail_large), l(f);
              },
            })
          : "vzaar" === c.type &&
            a.ajax({
              type: "GET",
              url: "//vzaar.com/api/videos/" + c.id + ".json",
              jsonp: "callback",
              dataType: "jsonp",
              success: function (a) {
                (f = a.framegrab_url), l(f);
              },
            });
      }),
      (e.prototype.stop = function () {
        this._core.trigger("stop", null, "video"),
          this._playing.find(".owl-video-frame").remove(),
          this._playing.removeClass("owl-video-playing"),
          (this._playing = null),
          this._core.leave("playing"),
          this._core.trigger("stopped", null, "video");
      }),
      (e.prototype.play = function (b) {
        var c,
          d = a(b.target),
          e = d.closest("." + this._core.settings.itemClass),
          f = this._videos[e.attr("data-video")],
          g = f.width || "100%",
          h = f.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter("playing"),
          this._core.trigger("play", null, "video"),
          (e = this._core.items(this._core.relative(e.index()))),
          this._core.reset(e.index()),
          (c = a(
            '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'
          )),
          c.attr("height", h),
          c.attr("width", g),
          "youtube" === f.type
            ? c.attr(
                "src",
                "//www.youtube.com/embed/" +
                  f.id +
                  "?autoplay=1&rel=0&v=" +
                  f.id
              )
            : "vimeo" === f.type
            ? c.attr("src", "//player.vimeo.com/video/" + f.id + "?autoplay=1")
            : "vzaar" === f.type &&
              c.attr(
                "src",
                "//view.vzaar.com/" + f.id + "/player?autoplay=true"
              ),
          a(c)
            .wrap('<div class="owl-video-frame" />')
            .insertAfter(e.find(".owl-video")),
          (this._playing = e.addClass("owl-video-playing")));
      }),
      (e.prototype.isInFullScreen = function () {
        var b =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return b && a(b).parent().hasClass("owl-video-frame");
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this._core.$element.off("click.owl.video");
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          "change.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              "position" == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
            a.proxy(function (a) {
              a.namespace && (this.swapping = "translated" == a.type);
            }, this),
          "translate.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = { animateOut: !1, animateIn: !1 }),
      (e.prototype.swap = function () {
        if (
          1 === this.core.settings.items &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0);
          var b,
            c = a.proxy(this.clear, this),
            d = this.core.$stage.children().eq(this.previous),
            e = this.core.$stage.children().eq(this.next),
            f = this.core.settings.animateIn,
            g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({ left: b + "px" })
                .addClass("animated owl-animated-out")
                .addClass(g)),
            f &&
              e
                .one(a.support.animation.end, c)
                .addClass("animated owl-animated-in")
                .addClass(f));
        }
      }),
      (e.prototype.clear = function (b) {
        a(b.target)
          .css({ left: "" })
          .removeClass("animated owl-animated-out owl-animated-in")
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (e.prototype.destroy = function () {
        var a, b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    var e = function (b) {
      (this._core = b),
        (this._call = null),
        (this._time = 0),
        (this._timeout = 0),
        (this._paused = !0),
        (this._handlers = {
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "settings" === a.property.name
              ? this._core.settings.autoplay
                ? this.play()
                : this.stop()
              : a.namespace &&
                "position" === a.property.name &&
                this._paused &&
                (this._time = 0);
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace && this._core.settings.autoplay && this.play();
          }, this),
          "play.owl.autoplay": a.proxy(function (a, b, c) {
            a.namespace && this.play(b, c);
          }, this),
          "stop.owl.autoplay": a.proxy(function (a) {
            a.namespace && this.stop();
          }, this),
          "mouseover.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "mouseleave.owl.autoplay": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.play();
          }, this),
          "touchstart.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause &&
              this._core.is("rotating") &&
              this.pause();
          }, this),
          "touchend.owl.core": a.proxy(function () {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, e.Defaults, this._core.options));
    };
    (e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (e.prototype._next = function (d) {
        (this._call = b.setTimeout(
          a.proxy(this._next, this, d),
          this._timeout * (Math.round(this.read() / this._timeout) + 1) -
            this.read()
        )),
          this._core.is("interacting") ||
            c.hidden ||
            this._core.next(d || this._core.settings.autoplaySpeed);
      }),
      (e.prototype.read = function () {
        return new Date().getTime() - this._time;
      }),
      (e.prototype.play = function (c, d) {
        var e;
        this._core.is("rotating") || this._core.enter("rotating"),
          (c = c || this._core.settings.autoplayTimeout),
          (e = Math.min(this._time % (this._timeout || c), c)),
          this._paused
            ? ((this._time = this.read()), (this._paused = !1))
            : b.clearTimeout(this._call),
          (this._time += (this.read() % c) - e),
          (this._timeout = c),
          (this._call = b.setTimeout(a.proxy(this._next, this, d), c - e));
      }),
      (e.prototype.stop = function () {
        this._core.is("rotating") &&
          ((this._time = 0),
          (this._paused = !0),
          b.clearTimeout(this._call),
          this._core.leave("rotating"));
      }),
      (e.prototype.pause = function () {
        this._core.is("rotating") &&
          !this._paused &&
          ((this._time = this.read()),
          (this._paused = !0),
          b.clearTimeout(this._call));
      }),
      (e.prototype.destroy = function () {
        var a, b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this))
          "function" != typeof this[b] && (this[b] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (b) {
      (this._core = b),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          "prepared.owl.carousel": a.proxy(function (b) {
            b.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(b.content)
                    .find("[data-dot]")
                    .addBack("[data-dot]")
                    .attr("data-dot") +
                  "</div>"
              );
          }, this),
          "added.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop());
          }, this),
          "remove.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          "changed.owl.carousel": a.proxy(function (a) {
            a.namespace && "position" == a.property.name && this.draw();
          }, this),
          "initialized.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger("initialize", null, "navigation"),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger("initialized", null, "navigation"));
          }, this),
          "refreshed.owl.carousel": a.proxy(function (a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger("refresh", null, "navigation"),
              this.update(),
              this.draw(),
              this._core.trigger("refreshed", null, "navigation"));
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (e.Defaults = {
      nav: !1,
      navText: [
        '<span aria-label="Previous">&#x2039;</span>',
        '<span aria-label="Next">&#x203a;</span>',
      ],
      navSpeed: !1,
      navElement: 'button type="button" role="presentation"',
      navContainer: !1,
      navContainerClass: "owl-nav",
      navClass: ["owl-prev", "owl-next"],
      slideBy: 1,
      dotClass: "owl-dot",
      dotsClass: "owl-dots",
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function () {
        var b,
          c = this._core.settings;
        (this._controls.$relative = (
          c.navContainer
            ? a(c.navContainer)
            : a("<div>").addClass(c.navContainerClass).appendTo(this.$element)
        ).addClass("disabled")),
          (this._controls.$previous = a("<" + c.navElement + ">")
            .addClass(c.navClass[0])
            .html(c.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.prev(c.navSpeed);
              }, this)
            )),
          (this._controls.$next = a("<" + c.navElement + ">")
            .addClass(c.navClass[1])
            .html(c.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              a.proxy(function (a) {
                this.next(c.navSpeed);
              }, this)
            )),
          c.dotsData ||
            (this._templates = [
              a('<button role="button">')
                .addClass(c.dotClass)
                .append(a("<span>"))
                .prop("outerHTML"),
            ]),
          (this._controls.$absolute = (
            c.dotsContainer
              ? a(c.dotsContainer)
              : a("<div>").addClass(c.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "button",
            a.proxy(function (b) {
              var d = a(b.target).parent().is(this._controls.$absolute)
                ? a(b.target).index()
                : a(b.target).parent().index();
              b.preventDefault(), this.to(d, c.dotsSpeed);
            }, this)
          );
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
      }),
      (e.prototype.destroy = function () {
        var a, b, c, d, e;
        e = this._core.settings;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls)
          "$relative" === b && e.navContainer
            ? this._controls[b].html("")
            : this._controls[b].remove();
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this))
          "function" != typeof this[c] && (this[c] = null);
      }),
      (e.prototype.update = function () {
        var a,
          b,
          c,
          d = this._core.clones().length / 2,
          e = d + this._core.items().length,
          f = this._core.maximum(!0),
          g = this._core.settings,
          h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if (
          ("page" !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
          g.dots || "page" == g.slideBy)
        )
          for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
              if (
                (this._pages.push({
                  start: Math.min(f, a - d),
                  end: a - d + h - 1,
                }),
                Math.min(f, a - d) === f)
              )
                break;
              (b = 0), ++c;
            }
            b += this._core.mergers(this._core.relative(a));
          }
      }),
      (e.prototype.draw = function () {
        var b,
          c = this._core.settings,
          d = this._core.items().length <= c.items,
          e = this._core.relative(this._core.current()),
          f = c.loop || c.rewind;
        this._controls.$relative.toggleClass("disabled", !c.nav || d),
          c.nav &&
            (this._controls.$previous.toggleClass(
              "disabled",
              !f && e <= this._core.minimum(!0)
            ),
            this._controls.$next.toggleClass(
              "disabled",
              !f && e >= this._core.maximum(!0)
            )),
          this._controls.$absolute.toggleClass("disabled", !c.dots || d),
          c.dots &&
            ((b =
              this._pages.length - this._controls.$absolute.children().length),
            c.dotsData && 0 !== b
              ? this._controls.$absolute.html(this._templates.join(""))
              : b > 0
              ? this._controls.$absolute.append(
                  new Array(b + 1).join(this._templates[0])
                )
              : b < 0 && this._controls.$absolute.children().slice(b).remove(),
            this._controls.$absolute.find(".active").removeClass("active"),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass("active"));
      }),
      (e.prototype.onTrigger = function (b) {
        var c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items),
        };
      }),
      (e.prototype.current = function () {
        var b = this._core.relative(this._core.current());
        return a
          .grep(
            this._pages,
            a.proxy(function (a, c) {
              return a.start <= b && a.end >= b;
            }, this)
          )
          .pop();
      }),
      (e.prototype.getPosition = function (b) {
        var c,
          d,
          e = this._core.settings;
        return (
          "page" == e.slideBy
            ? ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start))
            : ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (e.prototype.next = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (e.prototype.prev = function (b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (e.prototype.to = function (b, c, d) {
        var e;
        !d && this._pages.length
          ? ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c
            ))
          : a.proxy(this._overrides.to, this._core)(b, c);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    "use strict";
    var e = function (c) {
      (this._core = c),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          "initialized.owl.carousel": a.proxy(function (c) {
            c.namespace &&
              "URLHash" === this._core.settings.startPosition &&
              a(b).trigger("hashchange.owl.navigation");
          }, this),
          "prepared.owl.carousel": a.proxy(function (b) {
            if (b.namespace) {
              var c = a(b.content)
                .find("[data-hash]")
                .addBack("[data-hash]")
                .attr("data-hash");
              if (!c) return;
              this._hashes[c] = b.content;
            }
          }, this),
          "changed.owl.carousel": a.proxy(function (c) {
            if (c.namespace && "position" === c.property.name) {
              var d = this._core.items(
                  this._core.relative(this._core.current())
                ),
                e = a
                  .map(this._hashes, function (a, b) {
                    return a === d ? b : null;
                  })
                  .join();
              if (!e || b.location.hash.slice(1) === e) return;
              b.location.hash = e;
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          "hashchange.owl.navigation",
          a.proxy(function (a) {
            var c = b.location.hash.substring(1),
              e = this._core.$stage.children(),
              f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d &&
              f !== this._core.current() &&
              this._core.to(this._core.relative(f), !1, !0);
          }, this)
        );
    };
    (e.Defaults = { URLhashListener: !1 }),
      (e.prototype.destroy = function () {
        var c, d;
        a(b).off("hashchange.owl.navigation");
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this))
          "function" != typeof this[d] && (this[d] = null);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
  })(window.Zepto || window.jQuery, window, document),
  (function (a, b, c, d) {
    function e(b, c) {
      var e = !1,
        f = b.charAt(0).toUpperCase() + b.slice(1);
      return (
        a.each((b + " " + h.join(f + " ") + f).split(" "), function (a, b) {
          if (g[b] !== d) return (e = !c || b), !1;
        }),
        e
      );
    }
    function f(a) {
      return e(a, !0);
    }
    var g = a("<support>").get(0).style,
      h = "Webkit Moz O ms".split(" "),
      i = {
        transition: {
          end: {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd",
            transition: "transitionend",
          },
        },
        animation: {
          end: {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            OAnimation: "oAnimationEnd",
            animation: "animationend",
          },
        },
      },
      j = {
        csstransforms: function () {
          return !!e("transform");
        },
        csstransforms3d: function () {
          return !!e("perspective");
        },
        csstransitions: function () {
          return !!e("transition");
        },
        cssanimations: function () {
          return !!e("animation");
        },
      };
    j.csstransitions() &&
      ((a.support.transition = new String(f("transition"))),
      (a.support.transition.end = i.transition.end[a.support.transition])),
      j.cssanimations() &&
        ((a.support.animation = new String(f("animation"))),
        (a.support.animation.end = i.animation.end[a.support.animation])),
      j.csstransforms() &&
        ((a.support.transform = new String(f("transform"))),
        (a.support.transform3d = j.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document);

/*! Select2 4.1.0-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
!(function (n) {
  "function" == typeof define && define.amd
    ? define(["jquery"], n)
    : "object" == typeof module && module.exports
    ? (module.exports = function (e, t) {
        return (
          void 0 === t &&
            (t =
              "undefined" != typeof window
                ? require("jquery")
                : require("jquery")(e)),
          n(t),
          t
        );
      })
    : n(jQuery);
})(function (t) {
  var e,
    n,
    s,
    p,
    r,
    o,
    h,
    f,
    g,
    m,
    y,
    v,
    i,
    a,
    _,
    s =
      (((u =
        t && t.fn && t.fn.select2 && t.fn.select2.amd ? t.fn.select2.amd : u) &&
        u.requirejs) ||
        (u ? (n = u) : (u = {}),
        (g = {}),
        (m = {}),
        (y = {}),
        (v = {}),
        (i = Object.prototype.hasOwnProperty),
        (a = [].slice),
        (_ = /\.js$/),
        (h = function (e, t) {
          var n,
            s,
            i = c(e),
            r = i[0],
            t = t[1];
          return (
            (e = i[1]),
            r && (n = x((r = l(r, t)))),
            r
              ? (e =
                  n && n.normalize
                    ? n.normalize(
                        e,
                        ((s = t),
                        function (e) {
                          return l(e, s);
                        })
                      )
                    : l(e, t))
              : ((r = (i = c((e = l(e, t))))[0]), (e = i[1]), r && (n = x(r))),
            { f: r ? r + "!" + e : e, n: e, pr: r, p: n }
          );
        }),
        (f = {
          require: function (e) {
            return w(e);
          },
          exports: function (e) {
            var t = g[e];
            return void 0 !== t ? t : (g[e] = {});
          },
          module: function (e) {
            return {
              id: e,
              uri: "",
              exports: g[e],
              config:
                ((t = e),
                function () {
                  return (y && y.config && y.config[t]) || {};
                }),
            };
            var t;
          },
        }),
        (r = function (e, t, n, s) {
          var i,
            r,
            o,
            a,
            l,
            c = [],
            u = typeof n,
            d = A((s = s || e));
          if ("undefined" == u || "function" == u) {
            for (
              t = !t.length && n.length ? ["require", "exports", "module"] : t,
                a = 0;
              a < t.length;
              a += 1
            )
              if ("require" === (r = (o = h(t[a], d)).f)) c[a] = f.require(e);
              else if ("exports" === r) (c[a] = f.exports(e)), (l = !0);
              else if ("module" === r) i = c[a] = f.module(e);
              else if (b(g, r) || b(m, r) || b(v, r)) c[a] = x(r);
              else {
                if (!o.p) throw new Error(e + " missing " + r);
                o.p.load(
                  o.n,
                  w(s, !0),
                  (function (t) {
                    return function (e) {
                      g[t] = e;
                    };
                  })(r),
                  {}
                ),
                  (c[a] = g[r]);
              }
            (u = n ? n.apply(g[e], c) : void 0),
              e &&
                (i && i.exports !== p && i.exports !== g[e]
                  ? (g[e] = i.exports)
                  : (u === p && l) || (g[e] = u));
          } else e && (g[e] = n);
        }),
        (e =
          n =
          o =
            function (e, t, n, s, i) {
              if ("string" == typeof e) return f[e] ? f[e](t) : x(h(e, A(t)).f);
              if (!e.splice) {
                if (((y = e).deps && o(y.deps, y.callback), !t)) return;
                t.splice ? ((e = t), (t = n), (n = null)) : (e = p);
              }
              return (
                (t = t || function () {}),
                "function" == typeof n && ((n = s), (s = i)),
                s
                  ? r(p, e, t, n)
                  : setTimeout(function () {
                      r(p, e, t, n);
                    }, 4),
                o
              );
            }),
        (o.config = function (e) {
          return o(e);
        }),
        (e._defined = g),
        ((s = function (e, t, n) {
          if ("string" != typeof e)
            throw new Error(
              "See almond README: incorrect module build, no module name"
            );
          t.splice || ((n = t), (t = [])),
            b(g, e) || b(m, e) || (m[e] = [e, t, n]);
        }).amd = { jQuery: !0 }),
        (u.requirejs = e),
        (u.require = n),
        (u.define = s)),
      u.define("almond", function () {}),
      u.define("jquery", [], function () {
        var e = t || $;
        return (
          null == e &&
            console &&
            console.error &&
            console.error(
              "Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."
            ),
          e
        );
      }),
      u.define("select2/utils", ["jquery"], function (r) {
        var s = {};
        function c(e) {
          var t,
            n = e.prototype,
            s = [];
          for (t in n)
            "function" == typeof n[t] && "constructor" !== t && s.push(t);
          return s;
        }
        (s.Extend = function (e, t) {
          var n,
            s = {}.hasOwnProperty;
          function i() {
            this.constructor = e;
          }
          for (n in t) s.call(t, n) && (e[n] = t[n]);
          return (
            (i.prototype = t.prototype),
            (e.prototype = new i()),
            (e.__super__ = t.prototype),
            e
          );
        }),
          (s.Decorate = function (s, i) {
            var e = c(i),
              t = c(s);
            function r() {
              var e = Array.prototype.unshift,
                t = i.prototype.constructor.length,
                n = s.prototype.constructor;
              0 < t &&
                (e.call(arguments, s.prototype.constructor),
                (n = i.prototype.constructor)),
                n.apply(this, arguments);
            }
            (i.displayName = s.displayName),
              (r.prototype = new (function () {
                this.constructor = r;
              })());
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              r.prototype[o] = s.prototype[o];
            }
            for (var a = 0; a < e.length; a++) {
              var l = e[a];
              r.prototype[l] = (function (e) {
                var t = function () {};
                e in r.prototype && (t = r.prototype[e]);
                var n = i.prototype[e];
                return function () {
                  return (
                    Array.prototype.unshift.call(arguments, t),
                    n.apply(this, arguments)
                  );
                };
              })(l);
            }
            return r;
          });
        function e() {
          this.listeners = {};
        }
        (e.prototype.on = function (e, t) {
          (this.listeners = this.listeners || {}),
            e in this.listeners
              ? this.listeners[e].push(t)
              : (this.listeners[e] = [t]);
        }),
          (e.prototype.trigger = function (e) {
            var t = Array.prototype.slice,
              n = t.call(arguments, 1);
            (this.listeners = this.listeners || {}),
              0 === (n = null == n ? [] : n).length && n.push({}),
              (n[0]._type = e) in this.listeners &&
                this.invoke(this.listeners[e], t.call(arguments, 1)),
              "*" in this.listeners &&
                this.invoke(this.listeners["*"], arguments);
          }),
          (e.prototype.invoke = function (e, t) {
            for (var n = 0, s = e.length; n < s; n++) e[n].apply(this, t);
          }),
          (s.Observable = e),
          (s.generateChars = function (e) {
            for (var t = "", n = 0; n < e; n++)
              t += Math.floor(36 * Math.random()).toString(36);
            return t;
          }),
          (s.bind = function (e, t) {
            return function () {
              e.apply(t, arguments);
            };
          }),
          (s._convertData = function (e) {
            for (var t in e) {
              var n = t.split("-"),
                s = e;
              if (1 !== n.length) {
                for (var i = 0; i < n.length; i++) {
                  var r = n[i];
                  (r = r.substring(0, 1).toLowerCase() + r.substring(1)) in s ||
                    (s[r] = {}),
                    i == n.length - 1 && (s[r] = e[t]),
                    (s = s[r]);
                }
                delete e[t];
              }
            }
            return e;
          }),
          (s.hasScroll = function (e, t) {
            var n = r(t),
              s = t.style.overflowX,
              i = t.style.overflowY;
            return (
              (s !== i || ("hidden" !== i && "visible" !== i)) &&
              ("scroll" === s ||
                "scroll" === i ||
                n.innerHeight() < t.scrollHeight ||
                n.innerWidth() < t.scrollWidth)
            );
          }),
          (s.escapeMarkup = function (e) {
            var t = {
              "\\": "&#92;",
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
              "/": "&#47;",
            };
            return "string" != typeof e
              ? e
              : String(e).replace(/[&<>"'\/\\]/g, function (e) {
                  return t[e];
                });
          }),
          (s.__cache = {});
        var n = 0;
        return (
          (s.GetUniqueElementId = function (e) {
            var t = e.getAttribute("data-select2-id");
            return (
              null != t ||
                ((t = e.id
                  ? "select2-data-" + e.id
                  : "select2-data-" +
                    (++n).toString() +
                    "-" +
                    s.generateChars(4)),
                e.setAttribute("data-select2-id", t)),
              t
            );
          }),
          (s.StoreData = function (e, t, n) {
            e = s.GetUniqueElementId(e);
            s.__cache[e] || (s.__cache[e] = {}), (s.__cache[e][t] = n);
          }),
          (s.GetData = function (e, t) {
            var n = s.GetUniqueElementId(e);
            return t
              ? s.__cache[n] && null != s.__cache[n][t]
                ? s.__cache[n][t]
                : r(e).data(t)
              : s.__cache[n];
          }),
          (s.RemoveData = function (e) {
            var t = s.GetUniqueElementId(e);
            null != s.__cache[t] && delete s.__cache[t],
              e.removeAttribute("data-select2-id");
          }),
          (s.copyNonInternalCssClasses = function (e, t) {
            var n = (n = e.getAttribute("class").trim().split(/\s+/)).filter(
                function (e) {
                  return 0 === e.indexOf("select2-");
                }
              ),
              t = (t = t.getAttribute("class").trim().split(/\s+/)).filter(
                function (e) {
                  return 0 !== e.indexOf("select2-");
                }
              ),
              t = n.concat(t);
            e.setAttribute("class", t.join(" "));
          }),
          s
        );
      }),
      u.define("select2/results", ["jquery", "./utils"], function (d, p) {
        function s(e, t, n) {
          (this.$element = e),
            (this.data = n),
            (this.options = t),
            s.__super__.constructor.call(this);
        }
        return (
          p.Extend(s, p.Observable),
          (s.prototype.render = function () {
            var e = d(
              '<ul class="select2-results__options" role="listbox"></ul>'
            );
            return (
              this.options.get("multiple") &&
                e.attr("aria-multiselectable", "true"),
              (this.$results = e)
            );
          }),
          (s.prototype.clear = function () {
            this.$results.empty();
          }),
          (s.prototype.displayMessage = function (e) {
            var t = this.options.get("escapeMarkup");
            this.clear(), this.hideLoading();
            var n = d(
                '<li role="alert" aria-live="assertive" class="select2-results__option"></li>'
              ),
              s = this.options.get("translations").get(e.message);
            n.append(t(s(e.args))),
              (n[0].className += " select2-results__message"),
              this.$results.append(n);
          }),
          (s.prototype.hideMessages = function () {
            this.$results.find(".select2-results__message").remove();
          }),
          (s.prototype.append = function (e) {
            this.hideLoading();
            var t = [];
            if (null != e.results && 0 !== e.results.length) {
              e.results = this.sort(e.results);
              for (var n = 0; n < e.results.length; n++) {
                var s = e.results[n],
                  s = this.option(s);
                t.push(s);
              }
              this.$results.append(t);
            } else
              0 === this.$results.children().length &&
                this.trigger("results:message", { message: "noResults" });
          }),
          (s.prototype.position = function (e, t) {
            t.find(".select2-results").append(e);
          }),
          (s.prototype.sort = function (e) {
            return this.options.get("sorter")(e);
          }),
          (s.prototype.highlightFirstItem = function () {
            var e = this.$results.find(".select2-results__option--selectable"),
              t = e.filter(".select2-results__option--selected");
            (0 < t.length ? t : e).first().trigger("mouseenter"),
              this.ensureHighlightVisible();
          }),
          (s.prototype.setClasses = function () {
            var t = this;
            this.data.current(function (e) {
              var s = e.map(function (e) {
                return e.id.toString();
              });
              t.$results
                .find(".select2-results__option--selectable")
                .each(function () {
                  var e = d(this),
                    t = p.GetData(this, "data"),
                    n = "" + t.id;
                  (null != t.element && t.element.selected) ||
                  (null == t.element && -1 < s.indexOf(n))
                    ? (this.classList.add("select2-results__option--selected"),
                      e.attr("aria-selected", "true"))
                    : (this.classList.remove(
                        "select2-results__option--selected"
                      ),
                      e.attr("aria-selected", "false"));
                });
            });
          }),
          (s.prototype.showLoading = function (e) {
            this.hideLoading();
            (e = {
              disabled: !0,
              loading: !0,
              text: this.options.get("translations").get("searching")(e),
            }),
              (e = this.option(e));
            (e.className += " loading-results"), this.$results.prepend(e);
          }),
          (s.prototype.hideLoading = function () {
            this.$results.find(".loading-results").remove();
          }),
          (s.prototype.option = function (e) {
            var t = document.createElement("li");
            t.classList.add("select2-results__option"),
              t.classList.add("select2-results__option--selectable");
            var n,
              s = { role: "option" },
              i =
                window.Element.prototype.matches ||
                window.Element.prototype.msMatchesSelector ||
                window.Element.prototype.webkitMatchesSelector;
            for (n in (((null != e.element && i.call(e.element, ":disabled")) ||
              (null == e.element && e.disabled)) &&
              ((s["aria-disabled"] = "true"),
              t.classList.remove("select2-results__option--selectable"),
              t.classList.add("select2-results__option--disabled")),
            null == e.id &&
              t.classList.remove("select2-results__option--selectable"),
            null != e._resultId && (t.id = e._resultId),
            e.title && (t.title = e.title),
            e.children &&
              ((s.role = "group"),
              (s["aria-label"] = e.text),
              t.classList.remove("select2-results__option--selectable"),
              t.classList.add("select2-results__option--group")),
            s)) {
              var r = s[n];
              t.setAttribute(n, r);
            }
            if (e.children) {
              var o = d(t),
                a = document.createElement("strong");
              (a.className = "select2-results__group"), this.template(e, a);
              for (var l = [], c = 0; c < e.children.length; c++) {
                var u = e.children[c],
                  u = this.option(u);
                l.push(u);
              }
              i = d("<ul></ul>", {
                class:
                  "select2-results__options select2-results__options--nested",
                role: "none",
              });
              i.append(l), o.append(a), o.append(i);
            } else this.template(e, t);
            return p.StoreData(t, "data", e), t;
          }),
          (s.prototype.bind = function (t, e) {
            var i = this,
              n = t.id + "-results";
            this.$results.attr("id", n),
              t.on("results:all", function (e) {
                i.clear(),
                  i.append(e.data),
                  t.isOpen() && (i.setClasses(), i.highlightFirstItem());
              }),
              t.on("results:append", function (e) {
                i.append(e.data), t.isOpen() && i.setClasses();
              }),
              t.on("query", function (e) {
                i.hideMessages(), i.showLoading(e);
              }),
              t.on("select", function () {
                t.isOpen() &&
                  (i.setClasses(),
                  i.options.get("scrollAfterSelect") && i.highlightFirstItem());
              }),
              t.on("unselect", function () {
                t.isOpen() &&
                  (i.setClasses(),
                  i.options.get("scrollAfterSelect") && i.highlightFirstItem());
              }),
              t.on("open", function () {
                i.$results.attr("aria-expanded", "true"),
                  i.$results.attr("aria-hidden", "false"),
                  i.setClasses(),
                  i.ensureHighlightVisible();
              }),
              t.on("close", function () {
                i.$results.attr("aria-expanded", "false"),
                  i.$results.attr("aria-hidden", "true"),
                  i.$results.removeAttr("aria-activedescendant");
              }),
              t.on("results:toggle", function () {
                var e = i.getHighlightedResults();
                0 !== e.length && e.trigger("mouseup");
              }),
              t.on("results:select", function () {
                var e,
                  t = i.getHighlightedResults();
                0 !== t.length &&
                  ((e = p.GetData(t[0], "data")),
                  t.hasClass("select2-results__option--selected")
                    ? i.trigger("close", {})
                    : i.trigger("select", { data: e }));
              }),
              t.on("results:previous", function () {
                var e,
                  t = i.getHighlightedResults(),
                  n = i.$results.find(".select2-results__option--selectable"),
                  s = n.index(t);
                s <= 0 ||
                  ((e = s - 1),
                  0 === t.length && (e = 0),
                  (s = n.eq(e)).trigger("mouseenter"),
                  (t = i.$results.offset().top),
                  (n = s.offset().top),
                  (s = i.$results.scrollTop() + (n - t)),
                  0 === e
                    ? i.$results.scrollTop(0)
                    : n - t < 0 && i.$results.scrollTop(s));
              }),
              t.on("results:next", function () {
                var e,
                  t = i.getHighlightedResults(),
                  n = i.$results.find(".select2-results__option--selectable"),
                  s = n.index(t) + 1;
                s >= n.length ||
                  ((e = n.eq(s)).trigger("mouseenter"),
                  (t = i.$results.offset().top + i.$results.outerHeight(!1)),
                  (n = e.offset().top + e.outerHeight(!1)),
                  (e = i.$results.scrollTop() + n - t),
                  0 === s
                    ? i.$results.scrollTop(0)
                    : t < n && i.$results.scrollTop(e));
              }),
              t.on("results:focus", function (e) {
                e.element[0].classList.add(
                  "select2-results__option--highlighted"
                ),
                  e.element[0].setAttribute("aria-selected", "true");
              }),
              t.on("results:message", function (e) {
                i.displayMessage(e);
              }),
              d.fn.mousewheel &&
                this.$results.on("mousewheel", function (e) {
                  var t = i.$results.scrollTop(),
                    n = i.$results.get(0).scrollHeight - t + e.deltaY,
                    t = 0 < e.deltaY && t - e.deltaY <= 0,
                    n = e.deltaY < 0 && n <= i.$results.height();
                  t
                    ? (i.$results.scrollTop(0),
                      e.preventDefault(),
                      e.stopPropagation())
                    : n &&
                      (i.$results.scrollTop(
                        i.$results.get(0).scrollHeight - i.$results.height()
                      ),
                      e.preventDefault(),
                      e.stopPropagation());
                }),
              this.$results.on(
                "mouseup",
                ".select2-results__option--selectable",
                function (e) {
                  var t = d(this),
                    n = p.GetData(this, "data");
                  t.hasClass("select2-results__option--selected")
                    ? i.options.get("multiple")
                      ? i.trigger("unselect", { originalEvent: e, data: n })
                      : i.trigger("close", {})
                    : i.trigger("select", { originalEvent: e, data: n });
                }
              ),
              this.$results.on(
                "mouseenter",
                ".select2-results__option--selectable",
                function (e) {
                  var t = p.GetData(this, "data");
                  i
                    .getHighlightedResults()
                    .removeClass("select2-results__option--highlighted")
                    .attr("aria-selected", "false"),
                    i.trigger("results:focus", { data: t, element: d(this) });
                }
              );
          }),
          (s.prototype.getHighlightedResults = function () {
            return this.$results.find(".select2-results__option--highlighted");
          }),
          (s.prototype.destroy = function () {
            this.$results.remove();
          }),
          (s.prototype.ensureHighlightVisible = function () {
            var e,
              t,
              n,
              s,
              i = this.getHighlightedResults();
            0 !== i.length &&
              ((e = this.$results
                .find(".select2-results__option--selectable")
                .index(i)),
              (s = this.$results.offset().top),
              (t = i.offset().top),
              (n = this.$results.scrollTop() + (t - s)),
              (s = t - s),
              (n -= 2 * i.outerHeight(!1)),
              e <= 2
                ? this.$results.scrollTop(0)
                : (s > this.$results.outerHeight() || s < 0) &&
                  this.$results.scrollTop(n));
          }),
          (s.prototype.template = function (e, t) {
            var n = this.options.get("templateResult"),
              s = this.options.get("escapeMarkup"),
              e = n(e, t);
            null == e
              ? (t.style.display = "none")
              : "string" == typeof e
              ? (t.innerHTML = s(e))
              : d(t).append(e);
          }),
          s
        );
      }),
      u.define("select2/keys", [], function () {
        return {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          SHIFT: 16,
          CTRL: 17,
          ALT: 18,
          ESC: 27,
          SPACE: 32,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          END: 35,
          HOME: 36,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          DELETE: 46,
        };
      }),
      u.define(
        "select2/selection/base",
        ["jquery", "../utils", "../keys"],
        function (n, s, i) {
          function r(e, t) {
            (this.$element = e),
              (this.options = t),
              r.__super__.constructor.call(this);
          }
          return (
            s.Extend(r, s.Observable),
            (r.prototype.render = function () {
              var e = n(
                '<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'
              );
              return (
                (this._tabindex = 0),
                null != s.GetData(this.$element[0], "old-tabindex")
                  ? (this._tabindex = s.GetData(
                      this.$element[0],
                      "old-tabindex"
                    ))
                  : null != this.$element.attr("tabindex") &&
                    (this._tabindex = this.$element.attr("tabindex")),
                e.attr("title", this.$element.attr("title")),
                e.attr("tabindex", this._tabindex),
                e.attr("aria-disabled", "false"),
                (this.$selection = e)
              );
            }),
            (r.prototype.bind = function (e, t) {
              var n = this,
                s = e.id + "-results";
              (this.container = e),
                this.$selection.on("focus", function (e) {
                  n.trigger("focus", e);
                }),
                this.$selection.on("blur", function (e) {
                  n._handleBlur(e);
                }),
                this.$selection.on("keydown", function (e) {
                  n.trigger("keypress", e),
                    e.which === i.SPACE && e.preventDefault();
                }),
                e.on("results:focus", function (e) {
                  n.$selection.attr("aria-activedescendant", e.data._resultId);
                }),
                e.on("selection:update", function (e) {
                  n.update(e.data);
                }),
                e.on("open", function () {
                  n.$selection.attr("aria-expanded", "true"),
                    n.$selection.attr("aria-owns", s),
                    n._attachCloseHandler(e);
                }),
                e.on("close", function () {
                  n.$selection.attr("aria-expanded", "false"),
                    n.$selection.removeAttr("aria-activedescendant"),
                    n.$selection.removeAttr("aria-owns"),
                    n.$selection.trigger("focus"),
                    n._detachCloseHandler(e);
                }),
                e.on("enable", function () {
                  n.$selection.attr("tabindex", n._tabindex),
                    n.$selection.attr("aria-disabled", "false");
                }),
                e.on("disable", function () {
                  n.$selection.attr("tabindex", "-1"),
                    n.$selection.attr("aria-disabled", "true");
                });
            }),
            (r.prototype._handleBlur = function (e) {
              var t = this;
              window.setTimeout(function () {
                document.activeElement == t.$selection[0] ||
                  n.contains(t.$selection[0], document.activeElement) ||
                  t.trigger("blur", e);
              }, 1);
            }),
            (r.prototype._attachCloseHandler = function (e) {
              n(document.body).on("mousedown.select2." + e.id, function (e) {
                var t = n(e.target).closest(".select2");
                n(".select2.select2-container--open").each(function () {
                  this != t[0] && s.GetData(this, "element").select2("close");
                });
              });
            }),
            (r.prototype._detachCloseHandler = function (e) {
              n(document.body).off("mousedown.select2." + e.id);
            }),
            (r.prototype.position = function (e, t) {
              t.find(".selection").append(e);
            }),
            (r.prototype.destroy = function () {
              this._detachCloseHandler(this.container);
            }),
            (r.prototype.update = function (e) {
              throw new Error(
                "The `update` method must be defined in child classes."
              );
            }),
            (r.prototype.isEnabled = function () {
              return !this.isDisabled();
            }),
            (r.prototype.isDisabled = function () {
              return this.options.get("disabled");
            }),
            r
          );
        }
      ),
      u.define(
        "select2/selection/single",
        ["jquery", "./base", "../utils", "../keys"],
        function (e, t, n, s) {
          function i() {
            i.__super__.constructor.apply(this, arguments);
          }
          return (
            n.Extend(i, t),
            (i.prototype.render = function () {
              var e = i.__super__.render.call(this);
              return (
                e[0].classList.add("select2-selection--single"),
                e.html(
                  '<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'
                ),
                e
              );
            }),
            (i.prototype.bind = function (t, e) {
              var n = this;
              i.__super__.bind.apply(this, arguments);
              var s = t.id + "-container";
              this.$selection
                .find(".select2-selection__rendered")
                .attr("id", s)
                .attr("role", "textbox")
                .attr("aria-readonly", "true"),
                this.$selection.attr("aria-labelledby", s),
                this.$selection.attr("aria-controls", s),
                this.$selection.on("mousedown", function (e) {
                  1 === e.which && n.trigger("toggle", { originalEvent: e });
                }),
                this.$selection.on("focus", function (e) {}),
                this.$selection.on("blur", function (e) {}),
                t.on("focus", function (e) {
                  t.isOpen() || n.$selection.trigger("focus");
                });
            }),
            (i.prototype.clear = function () {
              var e = this.$selection.find(".select2-selection__rendered");
              e.empty(), e.removeAttr("title");
            }),
            (i.prototype.display = function (e, t) {
              var n = this.options.get("templateSelection");
              return this.options.get("escapeMarkup")(n(e, t));
            }),
            (i.prototype.selectionContainer = function () {
              return e("<span></span>");
            }),
            (i.prototype.update = function (e) {
              var t, n;
              0 !== e.length
                ? ((n = e[0]),
                  (t = this.$selection.find(".select2-selection__rendered")),
                  (e = this.display(n, t)),
                  t.empty().append(e),
                  (n = n.title || n.text)
                    ? t.attr("title", n)
                    : t.removeAttr("title"))
                : this.clear();
            }),
            i
          );
        }
      ),
      u.define(
        "select2/selection/multiple",
        ["jquery", "./base", "../utils"],
        function (i, e, c) {
          function r(e, t) {
            r.__super__.constructor.apply(this, arguments);
          }
          return (
            c.Extend(r, e),
            (r.prototype.render = function () {
              var e = r.__super__.render.call(this);
              return (
                e[0].classList.add("select2-selection--multiple"),
                e.html('<ul class="select2-selection__rendered"></ul>'),
                e
              );
            }),
            (r.prototype.bind = function (e, t) {
              var n = this;
              r.__super__.bind.apply(this, arguments);
              var s = e.id + "-container";
              this.$selection
                .find(".select2-selection__rendered")
                .attr("id", s),
                this.$selection.on("click", function (e) {
                  n.trigger("toggle", { originalEvent: e });
                }),
                this.$selection.on(
                  "click",
                  ".select2-selection__choice__remove",
                  function (e) {
                    var t;
                    n.isDisabled() ||
                      ((t = i(this).parent()),
                      (t = c.GetData(t[0], "data")),
                      n.trigger("unselect", { originalEvent: e, data: t }));
                  }
                ),
                this.$selection.on(
                  "keydown",
                  ".select2-selection__choice__remove",
                  function (e) {
                    n.isDisabled() || e.stopPropagation();
                  }
                );
            }),
            (r.prototype.clear = function () {
              var e = this.$selection.find(".select2-selection__rendered");
              e.empty(), e.removeAttr("title");
            }),
            (r.prototype.display = function (e, t) {
              var n = this.options.get("templateSelection");
              return this.options.get("escapeMarkup")(n(e, t));
            }),
            (r.prototype.selectionContainer = function () {
              return i(
                '<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>'
              );
            }),
            (r.prototype.update = function (e) {
              if ((this.clear(), 0 !== e.length)) {
                for (
                  var t = [],
                    n =
                      this.$selection
                        .find(".select2-selection__rendered")
                        .attr("id") + "-choice-",
                    s = 0;
                  s < e.length;
                  s++
                ) {
                  var i = e[s],
                    r = this.selectionContainer(),
                    o = this.display(i, r),
                    a = n + c.generateChars(4) + "-";
                  i.id ? (a += i.id) : (a += c.generateChars(4)),
                    r
                      .find(".select2-selection__choice__display")
                      .append(o)
                      .attr("id", a);
                  var l = i.title || i.text;
                  l && r.attr("title", l);
                  (o = this.options.get("translations").get("removeItem")),
                    (l = r.find(".select2-selection__choice__remove"));
                  l.attr("title", o()),
                    l.attr("aria-label", o()),
                    l.attr("aria-describedby", a),
                    c.StoreData(r[0], "data", i),
                    t.push(r);
                }
                this.$selection.find(".select2-selection__rendered").append(t);
              }
            }),
            r
          );
        }
      ),
      u.define("select2/selection/placeholder", [], function () {
        function e(e, t, n) {
          (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))),
            e.call(this, t, n);
        }
        return (
          (e.prototype.normalizePlaceholder = function (e, t) {
            return (t = "string" == typeof t ? { id: "", text: t } : t);
          }),
          (e.prototype.createPlaceholder = function (e, t) {
            var n = this.selectionContainer();
            n.html(this.display(t)),
              n[0].classList.add("select2-selection__placeholder"),
              n[0].classList.remove("select2-selection__choice");
            t = t.title || t.text || n.text();
            return (
              this.$selection
                .find(".select2-selection__rendered")
                .attr("title", t),
              n
            );
          }),
          (e.prototype.update = function (e, t) {
            var n = 1 == t.length && t[0].id != this.placeholder.id;
            if (1 < t.length || n) return e.call(this, t);
            this.clear();
            t = this.createPlaceholder(this.placeholder);
            this.$selection.find(".select2-selection__rendered").append(t);
          }),
          e
        );
      }),
      u.define(
        "select2/selection/allowClear",
        ["jquery", "../keys", "../utils"],
        function (i, s, a) {
          function e() {}
          return (
            (e.prototype.bind = function (e, t, n) {
              var s = this;
              e.call(this, t, n),
                null == this.placeholder &&
                  this.options.get("debug") &&
                  window.console &&
                  console.error &&
                  console.error(
                    "Select2: The `allowClear` option should be used in combination with the `placeholder` option."
                  ),
                this.$selection.on(
                  "mousedown",
                  ".select2-selection__clear",
                  function (e) {
                    s._handleClear(e);
                  }
                ),
                t.on("keypress", function (e) {
                  s._handleKeyboardClear(e, t);
                });
            }),
            (e.prototype._handleClear = function (e, t) {
              if (!this.isDisabled()) {
                var n = this.$selection.find(".select2-selection__clear");
                if (0 !== n.length) {
                  t.stopPropagation();
                  var s = a.GetData(n[0], "data"),
                    i = this.$element.val();
                  this.$element.val(this.placeholder.id);
                  var r = { data: s };
                  if ((this.trigger("clear", r), r.prevented))
                    this.$element.val(i);
                  else {
                    for (var o = 0; o < s.length; o++)
                      if (
                        ((r = { data: s[o] }),
                        this.trigger("unselect", r),
                        r.prevented)
                      )
                        return void this.$element.val(i);
                    this.$element.trigger("input").trigger("change"),
                      this.trigger("toggle", {});
                  }
                }
              }
            }),
            (e.prototype._handleKeyboardClear = function (e, t, n) {
              n.isOpen() ||
                (t.which != s.DELETE && t.which != s.BACKSPACE) ||
                this._handleClear(t);
            }),
            (e.prototype.update = function (e, t) {
              var n, s;
              e.call(this, t),
                this.$selection.find(".select2-selection__clear").remove(),
                this.$selection[0].classList.remove(
                  "select2-selection--clearable"
                ),
                0 <
                  this.$selection.find(".select2-selection__placeholder")
                    .length ||
                  0 === t.length ||
                  ((n = this.$selection
                    .find(".select2-selection__rendered")
                    .attr("id")),
                  (s = this.options.get("translations").get("removeAllItems")),
                  (e = i(
                    '<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>'
                  )).attr("title", s()),
                  e.attr("aria-label", s()),
                  e.attr("aria-describedby", n),
                  a.StoreData(e[0], "data", t),
                  this.$selection.prepend(e),
                  this.$selection[0].classList.add(
                    "select2-selection--clearable"
                  ));
            }),
            e
          );
        }
      ),
      u.define(
        "select2/selection/search",
        ["jquery", "../utils", "../keys"],
        function (s, a, l) {
          function e(e, t, n) {
            e.call(this, t, n);
          }
          return (
            (e.prototype.render = function (e) {
              var t = this.options.get("translations").get("search"),
                n = s(
                  '<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>'
                );
              (this.$searchContainer = n),
                (this.$search = n.find("textarea")),
                this.$search.prop(
                  "autocomplete",
                  this.options.get("autocomplete")
                ),
                this.$search.attr("aria-label", t());
              e = e.call(this);
              return (
                this._transferTabIndex(), e.append(this.$searchContainer), e
              );
            }),
            (e.prototype.bind = function (e, t, n) {
              var s = this,
                i = t.id + "-results",
                r = t.id + "-container";
              e.call(this, t, n),
                s.$search.attr("aria-describedby", r),
                t.on("open", function () {
                  s.$search.attr("aria-controls", i),
                    s.$search.trigger("focus");
                }),
                t.on("close", function () {
                  s.$search.val(""),
                    s.resizeSearch(),
                    s.$search.removeAttr("aria-controls"),
                    s.$search.removeAttr("aria-activedescendant"),
                    s.$search.trigger("focus");
                }),
                t.on("enable", function () {
                  s.$search.prop("disabled", !1), s._transferTabIndex();
                }),
                t.on("disable", function () {
                  s.$search.prop("disabled", !0);
                }),
                t.on("focus", function (e) {
                  s.$search.trigger("focus");
                }),
                t.on("results:focus", function (e) {
                  e.data._resultId
                    ? s.$search.attr("aria-activedescendant", e.data._resultId)
                    : s.$search.removeAttr("aria-activedescendant");
                }),
                this.$selection.on(
                  "focusin",
                  ".select2-search--inline",
                  function (e) {
                    s.trigger("focus", e);
                  }
                ),
                this.$selection.on(
                  "focusout",
                  ".select2-search--inline",
                  function (e) {
                    s._handleBlur(e);
                  }
                ),
                this.$selection.on(
                  "keydown",
                  ".select2-search--inline",
                  function (e) {
                    var t;
                    e.stopPropagation(),
                      s.trigger("keypress", e),
                      (s._keyUpPrevented = e.isDefaultPrevented()),
                      e.which !== l.BACKSPACE ||
                        "" !== s.$search.val() ||
                        (0 <
                          (t = s.$selection
                            .find(".select2-selection__choice")
                            .last()).length &&
                          ((t = a.GetData(t[0], "data")),
                          s.searchRemoveChoice(t),
                          e.preventDefault()));
                  }
                ),
                this.$selection.on(
                  "click",
                  ".select2-search--inline",
                  function (e) {
                    s.$search.val() && e.stopPropagation();
                  }
                );
              var t = document.documentMode,
                o = t && t <= 11;
              this.$selection.on(
                "input.searchcheck",
                ".select2-search--inline",
                function (e) {
                  o
                    ? s.$selection.off("input.search input.searchcheck")
                    : s.$selection.off("keyup.search");
                }
              ),
                this.$selection.on(
                  "keyup.search input.search",
                  ".select2-search--inline",
                  function (e) {
                    var t;
                    o && "input" === e.type
                      ? s.$selection.off("input.search input.searchcheck")
                      : (t = e.which) != l.SHIFT &&
                        t != l.CTRL &&
                        t != l.ALT &&
                        t != l.TAB &&
                        s.handleSearch(e);
                  }
                );
            }),
            (e.prototype._transferTabIndex = function (e) {
              this.$search.attr("tabindex", this.$selection.attr("tabindex")),
                this.$selection.attr("tabindex", "-1");
            }),
            (e.prototype.createPlaceholder = function (e, t) {
              this.$search.attr("placeholder", t.text);
            }),
            (e.prototype.update = function (e, t) {
              var n = this.$search[0] == document.activeElement;
              this.$search.attr("placeholder", ""),
                e.call(this, t),
                this.resizeSearch(),
                n && this.$search.trigger("focus");
            }),
            (e.prototype.handleSearch = function () {
              var e;
              this.resizeSearch(),
                this._keyUpPrevented ||
                  ((e = this.$search.val()),
                  this.trigger("query", { term: e })),
                (this._keyUpPrevented = !1);
            }),
            (e.prototype.searchRemoveChoice = function (e, t) {
              this.trigger("unselect", { data: t }),
                this.$search.val(t.text),
                this.handleSearch();
            }),
            (e.prototype.resizeSearch = function () {
              this.$search.css("width", "25px");
              var e = "100%";
              "" === this.$search.attr("placeholder") &&
                (e = 0.75 * (this.$search.val().length + 1) + "em"),
                this.$search.css("width", e);
            }),
            e
          );
        }
      ),
      u.define("select2/selection/selectionCss", ["../utils"], function (n) {
        function e() {}
        return (
          (e.prototype.render = function (e) {
            var t = e.call(this),
              e = this.options.get("selectionCssClass") || "";
            return (
              -1 !== e.indexOf(":all:") &&
                ((e = e.replace(":all:", "")),
                n.copyNonInternalCssClasses(t[0], this.$element[0])),
              t.addClass(e),
              t
            );
          }),
          e
        );
      }),
      u.define("select2/selection/eventRelay", ["jquery"], function (o) {
        function e() {}
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this,
              i = [
                "open",
                "opening",
                "close",
                "closing",
                "select",
                "selecting",
                "unselect",
                "unselecting",
                "clear",
                "clearing",
              ],
              r = [
                "opening",
                "closing",
                "selecting",
                "unselecting",
                "clearing",
              ];
            e.call(this, t, n),
              t.on("*", function (e, t) {
                var n;
                -1 !== i.indexOf(e) &&
                  ((t = t || {}),
                  (n = o.Event("select2:" + e, { params: t })),
                  s.$element.trigger(n),
                  -1 !== r.indexOf(e) &&
                    (t.prevented = n.isDefaultPrevented()));
              });
          }),
          e
        );
      }),
      u.define("select2/translation", ["jquery", "require"], function (t, n) {
        function s(e) {
          this.dict = e || {};
        }
        return (
          (s.prototype.all = function () {
            return this.dict;
          }),
          (s.prototype.get = function (e) {
            return this.dict[e];
          }),
          (s.prototype.extend = function (e) {
            this.dict = t.extend({}, e.all(), this.dict);
          }),
          (s._cache = {}),
          (s.loadPath = function (e) {
            var t;
            return (
              e in s._cache || ((t = n(e)), (s._cache[e] = t)),
              new s(s._cache[e])
            );
          }),
          s
        );
      }),
      u.define("select2/diacritics", [], function () {
        return {
          "â’¶": "A",
          "ï¼¡": "A",
          "Ã€": "A",
          "Ã�?": "A",
          "Ã‚": "A",
          "áº¦": "A",
          "áº¤": "A",
          áºª: "A",
          "áº¨": "A",
          Ãƒ: "A",
          "Ä€": "A",
          "Ä‚": "A",
          "áº°": "A",
          "áº®": "A",
          "áº´": "A",
          "áº²": "A",
          "È¦": "A",
          "Ç ": "A",
          "Ã„": "A",
          Çž: "A",
          "áº¢": "A",
          "Ã…": "A",
          Çº: "A",
          "Ç�?": "A",
          "È€": "A",
          "È‚": "A",
          "áº ": "A",
          "áº¬": "A",
          "áº¶": "A",
          "á¸€": "A",
          "Ä„": "A",
          Èº: "A",
          "â±¯": "A",
          "êœ²": "AA",
          "Ã†": "AE",
          "Ç¼": "AE",
          "Ç¢": "AE",
          "êœ´": "AO",
          "êœ¶": "AU",
          "êœ¸": "AV",
          êœº: "AV",
          "êœ¼": "AY",
          "â’·": "B",
          "ï¼¢": "B",
          "á¸‚": "B",
          "á¸„": "B",
          "á¸†": "B",
          Éƒ: "B",
          "Æ‚": "B",
          "Æ�?": "B",
          "â’¸": "C",
          "ï¼£": "C",
          "Ä†": "C",
          Äˆ: "C",
          ÄŠ: "C",
          ÄŒ: "C",
          "Ã‡": "C",
          "á¸ˆ": "C",
          "Æ‡": "C",
          "È»": "C",
          "êœ¾": "C",
          "â’¹": "D",
          "ï¼¤": "D",
          "á¸Š": "D",
          ÄŽ: "D",
          "á¸Œ": "D",
          "á¸�?": "D",
          "á¸’": "D",
          "á¸Ž": "D",
          "Ä�?": "D",
          "Æ‹": "D",
          ÆŠ: "D",
          "Æ‰": "D",
          "ê�?¹": "D",
          "Ç±": "DZ",
          "Ç„": "DZ",
          "Ç²": "Dz",
          "Ç…": "Dz",
          "â’º": "E",
          "ï¼¥": "E",
          Ãˆ: "E",
          "Ã‰": "E",
          ÃŠ: "E",
          "á»€": "E",
          "áº¾": "E",
          "á»„": "E",
          "á»‚": "E",
          "áº¼": "E",
          "Ä’": "E",
          "á¸�?": "E",
          "á¸–": "E",
          "Ä�?": "E",
          "Ä–": "E",
          "Ã‹": "E",
          áºº: "E",
          Äš: "E",
          "È„": "E",
          "È†": "E",
          "áº¸": "E",
          "á»†": "E",
          "È¨": "E",
          "á¸œ": "E",
          "Ä˜": "E",
          "á¸˜": "E",
          "á¸š": "E",
          "Æ�?": "E",
          ÆŽ: "E",
          "â’»": "F",
          "ï¼¦": "F",
          "á¸ž": "F",
          "Æ‘": "F",
          "ê�?»": "F",
          "â’¼": "G",
          "ï¼§": "G",
          "Ç´": "G",
          Äœ: "G",
          "á¸ ": "G",
          Äž: "G",
          "Ä ": "G",
          "Ç¦": "G",
          "Ä¢": "G",
          "Ç¤": "G",
          "Æ“": "G",
          "êž ": "G",
          "ê�?½": "G",
          "ê�?¾": "G",
          "â’½": "H",
          "ï¼¨": "H",
          "Ä¤": "H",
          "á¸¢": "H",
          "á¸¦": "H",
          Èž: "H",
          "á¸¤": "H",
          "á¸¨": "H",
          "á¸ª": "H",
          "Ä¦": "H",
          "â±§": "H",
          "â±µ": "H",
          "êž�?": "H",
          "â’¾": "I",
          "ï¼©": "I",
          ÃŒ: "I",
          "Ã�?": "I",
          ÃŽ: "I",
          "Ä¨": "I",
          Äª: "I",
          "Ä¬": "I",
          "Ä°": "I",
          "Ã�?": "I",
          "á¸®": "I",
          "á»ˆ": "I",
          "Ç�?": "I",
          Èˆ: "I",
          ÈŠ: "I",
          "á»Š": "I",
          "Ä®": "I",
          "á¸¬": "I",
          "Æ—": "I",
          "â’¿": "J",
          "ï¼ª": "J",
          "Ä´": "J",
          Éˆ: "J",
          "â“€": "K",
          "ï¼«": "K",
          "á¸°": "K",
          "Ç¨": "K",
          "á¸²": "K",
          "Ä¶": "K",
          "á¸´": "K",
          "Æ˜": "K",
          "â±©": "K",
          "ê�?€": "K",
          "ê�?‚": "K",
          "ê�?„": "K",
          "êž¢": "K",
          "â“�?": "L",
          "ï¼¬": "L",
          "Ä¿": "L",
          "Ä¹": "L",
          "Ä½": "L",
          "á¸¶": "L",
          "á¸¸": "L",
          "Ä»": "L",
          "á¸¼": "L",
          "á¸º": "L",
          "Å�?": "L",
          "È½": "L",
          "â±¢": "L",
          "â± ": "L",
          "ê�?ˆ": "L",
          "ê�?†": "L",
          "êž€": "L",
          "Ç‡": "LJ",
          Çˆ: "Lj",
          "â“‚": "M",
          "ï¼­": "M",
          "á¸¾": "M",
          "á¹€": "M",
          "á¹‚": "M",
          "â±®": "M",
          Æœ: "M",
          "â“ƒ": "N",
          "ï¼®": "N",
          "Ç¸": "N",
          Åƒ: "N",
          "Ã‘": "N",
          "á¹„": "N",
          "Å‡": "N",
          "á¹†": "N",
          "Å…": "N",
          "á¹Š": "N",
          "á¹ˆ": "N",
          "È ": "N",
          "Æ�?": "N",
          "êž�?": "N",
          "êž¤": "N",
          ÇŠ: "NJ",
          "Ç‹": "Nj",
          "â“„": "O",
          "ï¼¯": "O",
          "Ã’": "O",
          "Ã“": "O",
          "Ã�?": "O",
          "á»’": "O",
          "á»�?": "O",
          "á»–": "O",
          "á»�?": "O",
          "Ã•": "O",
          "á¹Œ": "O",
          "È¬": "O",
          "á¹Ž": "O",
          ÅŒ: "O",
          "á¹�?": "O",
          "á¹’": "O",
          ÅŽ: "O",
          "È®": "O",
          "È°": "O",
          "Ã–": "O",
          Èª: "O",
          "á»Ž": "O",
          "Å�?": "O",
          "Ç‘": "O",
          ÈŒ: "O",
          ÈŽ: "O",
          "Æ ": "O",
          "á»œ": "O",
          "á»š": "O",
          "á» ": "O",
          "á»ž": "O",
          "á»¢": "O",
          "á»Œ": "O",
          "á»˜": "O",
          Çª: "O",
          "Ç¬": "O",
          "Ã˜": "O",
          "Ç¾": "O",
          "Æ†": "O",
          ÆŸ: "O",
          "ê�?Š": "O",
          "ê�?Œ": "O",
          "Å’": "OE",
          "Æ¢": "OI",
          "ê�?Ž": "OO",
          "È¢": "OU",
          "â“…": "P",
          "ï¼°": "P",
          "á¹�?": "P",
          "á¹–": "P",
          "Æ¤": "P",
          "â±£": "P",
          "ê�?�?": "P",
          "ê�?’": "P",
          "ê�?�?": "P",
          "â“†": "Q",
          "ï¼±": "Q",
          "ê�?–": "Q",
          "ê�?˜": "Q",
          ÉŠ: "Q",
          "â“‡": "R",
          "ï¼²": "R",
          "Å�?": "R",
          "á¹˜": "R",
          "Å˜": "R",
          "È�?": "R",
          "È’": "R",
          "á¹š": "R",
          "á¹œ": "R",
          "Å–": "R",
          "á¹ž": "R",
          ÉŒ: "R",
          "â±¤": "R",
          "ê�?š": "R",
          "êž¦": "R",
          "êž‚": "R",
          "â“ˆ": "S",
          "ï¼³": "S",
          áºž: "S",
          Åš: "S",
          "á¹¤": "S",
          Åœ: "S",
          "á¹ ": "S",
          "Å ": "S",
          "á¹¦": "S",
          "á¹¢": "S",
          "á¹¨": "S",
          "È˜": "S",
          Åž: "S",
          "â±¾": "S",
          "êž¨": "S",
          "êž„": "S",
          "â“‰": "T",
          "ï¼´": "T",
          "á¹ª": "T",
          "Å¤": "T",
          "á¹¬": "T",
          Èš: "T",
          "Å¢": "T",
          "á¹°": "T",
          "á¹®": "T",
          "Å¦": "T",
          "Æ¬": "T",
          "Æ®": "T",
          "È¾": "T",
          "êž†": "T",
          "êœ¨": "TZ",
          "â“Š": "U",
          "ï¼µ": "U",
          "Ã™": "U",
          Ãš: "U",
          "Ã›": "U",
          "Å¨": "U",
          "á¹¸": "U",
          Åª: "U",
          "á¹º": "U",
          "Å¬": "U",
          Ãœ: "U",
          "Ç›": "U",
          "Ç—": "U",
          "Ç•": "U",
          "Ç™": "U",
          "á»¦": "U",
          "Å®": "U",
          "Å°": "U",
          "Ç“": "U",
          "È�?": "U",
          "È–": "U",
          "Æ¯": "U",
          "á»ª": "U",
          "á»¨": "U",
          "á»®": "U",
          "á»¬": "U",
          "á»°": "U",
          "á»¤": "U",
          "á¹²": "U",
          "Å²": "U",
          "á¹¶": "U",
          "á¹´": "U",
          "É„": "U",
          "â“‹": "V",
          "ï¼¶": "V",
          "á¹¼": "V",
          "á¹¾": "V",
          "Æ²": "V",
          "ê�?ž": "V",
          "É…": "V",
          "ê�? ": "VY",
          "â“Œ": "W",
          "ï¼·": "W",
          "áº€": "W",
          "áº‚": "W",
          "Å´": "W",
          "áº†": "W",
          "áº„": "W",
          áºˆ: "W",
          "â±²": "W",
          "â“�?": "X",
          "ï¼¸": "X",
          áºŠ: "X",
          áºŒ: "X",
          "â“Ž": "Y",
          "ï¼¹": "Y",
          "á»²": "Y",
          "Ã�?": "Y",
          "Å¶": "Y",
          "á»¸": "Y",
          "È²": "Y",
          áºŽ: "Y",
          "Å¸": "Y",
          "á»¶": "Y",
          "á»´": "Y",
          "Æ³": "Y",
          ÉŽ: "Y",
          "á»¾": "Y",
          "â“�?": "Z",
          "ï¼º": "Z",
          "Å¹": "Z",
          "áº�?": "Z",
          "Å»": "Z",
          "Å½": "Z",
          "áº’": "Z",
          "áº�?": "Z",
          Æµ: "Z",
          "È¤": "Z",
          "â±¿": "Z",
          "â±«": "Z",
          "ê�?¢": "Z",
          "â“�?": "a",
          "ï½�?": "a",
          áºš: "a",
          "Ã ": "a",
          "Ã¡": "a",
          "Ã¢": "a",
          "áº§": "a",
          "áº¥": "a",
          "áº«": "a",
          "áº©": "a",
          "Ã£": "a",
          "Ä�?": "a",
          Äƒ: "a",
          "áº±": "a",
          "áº¯": "a",
          áºµ: "a",
          "áº³": "a",
          "È§": "a",
          "Ç¡": "a",
          "Ã¤": "a",
          ÇŸ: "a",
          "áº£": "a",
          "Ã¥": "a",
          "Ç»": "a",
          ÇŽ: "a",
          "È�?": "a",
          Èƒ: "a",
          "áº¡": "a",
          "áº­": "a",
          "áº·": "a",
          "á¸�?": "a",
          "Ä…": "a",
          "â±¥": "a",
          "É�?": "a",
          "êœ³": "aa",
          "Ã¦": "ae",
          "Ç½": "ae",
          "Ç£": "ae",
          êœµ: "ao",
          "êœ·": "au",
          "êœ¹": "av",
          "êœ»": "av",
          "êœ½": "ay",
          "â“‘": "b",
          "ï½‚": "b",
          "á¸ƒ": "b",
          "á¸…": "b",
          "á¸‡": "b",
          "Æ€": "b",
          Æƒ: "b",
          "É“": "b",
          "â“’": "c",
          "ï½ƒ": "c",
          "Ä‡": "c",
          "Ä‰": "c",
          "Ä‹": "c",
          "Ä�?": "c",
          "Ã§": "c",
          "á¸‰": "c",
          Æˆ: "c",
          "È¼": "c",
          "êœ¿": "c",
          "â†„": "c",
          "â““": "d",
          "ï½„": "d",
          "á¸‹": "d",
          "Ä�?": "d",
          "á¸�?": "d",
          "á¸‘": "d",
          "á¸“": "d",
          "á¸�?": "d",
          "Ä‘": "d",
          ÆŒ: "d",
          "É–": "d",
          "É—": "d",
          "ê�?º": "d",
          "Ç³": "dz",
          "Ç†": "dz",
          "â“�?": "e",
          "ï½…": "e",
          "Ã¨": "e",
          "Ã©": "e",
          Ãª: "e",
          "á»�?": "e",
          "áº¿": "e",
          "á»…": "e",
          "á»ƒ": "e",
          "áº½": "e",
          "Ä“": "e",
          "á¸•": "e",
          "á¸—": "e",
          "Ä•": "e",
          "Ä—": "e",
          "Ã«": "e",
          "áº»": "e",
          "Ä›": "e",
          "È…": "e",
          "È‡": "e",
          "áº¹": "e",
          "á»‡": "e",
          "È©": "e",
          "á¸�?": "e",
          "Ä™": "e",
          "á¸™": "e",
          "á¸›": "e",
          "É‡": "e",
          "É›": "e",
          "Ç�?": "e",
          "â“•": "f",
          "ï½†": "f",
          "á¸Ÿ": "f",
          "Æ’": "f",
          "ê�?¼": "f",
          "â“–": "g",
          "ï½‡": "g",
          Çµ: "g",
          "Ä�?": "g",
          "á¸¡": "g",
          ÄŸ: "g",
          "Ä¡": "g",
          "Ç§": "g",
          "Ä£": "g",
          "Ç¥": "g",
          "É ": "g",
          "êž¡": "g",
          "áµ¹": "g",
          "ê�?¿": "g",
          "â“—": "h",
          "ï½ˆ": "h",
          "Ä¥": "h",
          "á¸£": "h",
          "á¸§": "h",
          ÈŸ: "h",
          "á¸¥": "h",
          "á¸©": "h",
          "á¸«": "h",
          "áº–": "h",
          "Ä§": "h",
          "â±¨": "h",
          "â±¶": "h",
          "É¥": "h",
          "Æ•": "hv",
          "â“˜": "i",
          "ï½‰": "i",
          "Ã¬": "i",
          "Ã­": "i",
          "Ã®": "i",
          "Ä©": "i",
          "Ä«": "i",
          "Ä­": "i",
          "Ã¯": "i",
          "á¸¯": "i",
          "á»‰": "i",
          "Ç�?": "i",
          "È‰": "i",
          "È‹": "i",
          "á»‹": "i",
          "Ä¯": "i",
          "á¸­": "i",
          "É¨": "i",
          "Ä±": "i",
          "â“™": "j",
          "ï½Š": "j",
          Äµ: "j",
          "Ç°": "j",
          "É‰": "j",
          "â“š": "k",
          "ï½‹": "k",
          "á¸±": "k",
          "Ç©": "k",
          "á¸³": "k",
          "Ä·": "k",
          "á¸µ": "k",
          "Æ™": "k",
          "â±ª": "k",
          "ê�?�?": "k",
          "ê�?ƒ": "k",
          "ê�?…": "k",
          "êž£": "k",
          "â“›": "l",
          "ï½Œ": "l",
          "Å€": "l",
          Äº: "l",
          "Ä¾": "l",
          "á¸·": "l",
          "á¸¹": "l",
          "Ä¼": "l",
          "á¸½": "l",
          "á¸»": "l",
          "Å¿": "l",
          "Å‚": "l",
          Æš: "l",
          "É«": "l",
          "â±¡": "l",
          "ê�?‰": "l",
          "êž�?": "l",
          "ê�?‡": "l",
          "Ç‰": "lj",
          "â“œ": "m",
          "ï½�?": "m",
          "á¸¿": "m",
          "á¹�?": "m",
          "á¹ƒ": "m",
          "É±": "m",
          "É¯": "m",
          "â“�?": "n",
          "ï½Ž": "n",
          "Ç¹": "n",
          "Å„": "n",
          "Ã±": "n",
          "á¹…": "n",
          Åˆ: "n",
          "á¹‡": "n",
          "Å†": "n",
          "á¹‹": "n",
          "á¹‰": "n",
          Æž: "n",
          "É²": "n",
          "Å‰": "n",
          "êž‘": "n",
          "êž¥": "n",
          ÇŒ: "nj",
          "â“ž": "o",
          "ï½�?": "o",
          "Ã²": "o",
          "Ã³": "o",
          "Ã´": "o",
          "á»“": "o",
          "á»‘": "o",
          "á»—": "o",
          "á»•": "o",
          Ãµ: "o",
          "á¹�?": "o",
          "È­": "o",
          "á¹�?": "o",
          "Å�?": "o",
          "á¹‘": "o",
          "á¹“": "o",
          "Å�?": "o",
          "È¯": "o",
          "È±": "o",
          "Ã¶": "o",
          "È«": "o",
          "á»�?": "o",
          "Å‘": "o",
          "Ç’": "o",
          "È�?": "o",
          "È�?": "o",
          "Æ¡": "o",
          "á»�?": "o",
          "á»›": "o",
          "á»¡": "o",
          "á»Ÿ": "o",
          "á»£": "o",
          "á»�?": "o",
          "á»™": "o",
          "Ç«": "o",
          "Ç­": "o",
          "Ã¸": "o",
          "Ç¿": "o",
          "É�?": "o",
          "ê�?‹": "o",
          "ê�?�?": "o",
          Éµ: "o",
          "Å“": "oe",
          "Æ£": "oi",
          "È£": "ou",
          "ê�?�?": "oo",
          "â“Ÿ": "p",
          "ï½�?": "p",
          "á¹•": "p",
          "á¹—": "p",
          "Æ¥": "p",
          "áµ½": "p",
          "ê�?‘": "p",
          "ê�?“": "p",
          "ê�?•": "p",
          "â“ ": "q",
          "ï½‘": "q",
          "É‹": "q",
          "ê�?—": "q",
          "ê�?™": "q",
          "â“¡": "r",
          "ï½’": "r",
          "Å•": "r",
          "á¹™": "r",
          "Å™": "r",
          "È‘": "r",
          "È“": "r",
          "á¹›": "r",
          "á¹�?": "r",
          "Å—": "r",
          "á¹Ÿ": "r",
          "É�?": "r",
          "É½": "r",
          "ê�?›": "r",
          "êž§": "r",
          êžƒ: "r",
          "â“¢": "s",
          "ï½“": "s",
          ÃŸ: "s",
          "Å›": "s",
          "á¹¥": "s",
          "Å�?": "s",
          "á¹¡": "s",
          "Å¡": "s",
          "á¹§": "s",
          "á¹£": "s",
          "á¹©": "s",
          "È™": "s",
          ÅŸ: "s",
          "È¿": "s",
          "êž©": "s",
          "êž…": "s",
          "áº›": "s",
          "â“£": "t",
          "ï½�?": "t",
          "á¹«": "t",
          "áº—": "t",
          "Å¥": "t",
          "á¹­": "t",
          "È›": "t",
          "Å£": "t",
          "á¹±": "t",
          "á¹¯": "t",
          "Å§": "t",
          "Æ­": "t",
          Êˆ: "t",
          "â±¦": "t",
          "êž‡": "t",
          "êœ©": "tz",
          "â“¤": "u",
          "ï½•": "u",
          "Ã¹": "u",
          Ãº: "u",
          "Ã»": "u",
          "Å©": "u",
          "á¹¹": "u",
          "Å«": "u",
          "á¹»": "u",
          "Å­": "u",
          "Ã¼": "u",
          Çœ: "u",
          "Ç˜": "u",
          "Ç–": "u",
          Çš: "u",
          "á»§": "u",
          "Å¯": "u",
          "Å±": "u",
          "Ç�?": "u",
          "È•": "u",
          "È—": "u",
          "Æ°": "u",
          "á»«": "u",
          "á»©": "u",
          "á»¯": "u",
          "á»­": "u",
          "á»±": "u",
          "á»¥": "u",
          "á¹³": "u",
          "Å³": "u",
          "á¹·": "u",
          "á¹µ": "u",
          "Ê‰": "u",
          "â“¥": "v",
          "ï½–": "v",
          "á¹½": "v",
          "á¹¿": "v",
          "Ê‹": "v",
          "ê�?Ÿ": "v",
          ÊŒ: "v",
          "ê�?¡": "vy",
          "â“¦": "w",
          "ï½—": "w",
          "áº�?": "w",
          áºƒ: "w",
          Åµ: "w",
          "áº‡": "w",
          "áº…": "w",
          "áº˜": "w",
          "áº‰": "w",
          "â±³": "w",
          "â“§": "x",
          "ï½˜": "x",
          "áº‹": "x",
          "áº�?": "x",
          "â“¨": "y",
          "ï½™": "y",
          "á»³": "y",
          "Ã½": "y",
          "Å·": "y",
          "á»¹": "y",
          "È³": "y",
          "áº�?": "y",
          "Ã¿": "y",
          "á»·": "y",
          "áº™": "y",
          "á»µ": "y",
          "Æ´": "y",
          "É�?": "y",
          "á»¿": "y",
          "â“©": "z",
          "ï½š": "z",
          Åº: "z",
          "áº‘": "z",
          "Å¼": "z",
          "Å¾": "z",
          "áº“": "z",
          "áº•": "z",
          "Æ¶": "z",
          "È¥": "z",
          "É€": "z",
          "â±¬": "z",
          "ê�?£": "z",
          "Î†": "Î‘",
          Îˆ: "Î•",
          "Î‰": "Î—",
          ÎŠ: "Î™",
          Îª: "Î™",
          ÎŒ: "ÎŸ",
          ÎŽ: "Î¥",
          "Î«": "Î¥",
          "Î�?": "Î©",
          "Î¬": "Î±",
          "Î­": "Îµ",
          "Î®": "Î·",
          "Î¯": "Î¹",
          "�?Š": "Î¹",
          "Î�?": "Î¹",
          "�?Œ": "Î¿",
          "�?�?": "�?…",
          "�?‹": "�?…",
          "Î°": "�?…",
          "�?Ž": "�?‰",
          "�?‚": "�?ƒ",
          "â€™": "'",
        };
      }),
      u.define("select2/data/base", ["../utils"], function (n) {
        function s(e, t) {
          s.__super__.constructor.call(this);
        }
        return (
          n.Extend(s, n.Observable),
          (s.prototype.current = function (e) {
            throw new Error(
              "The `current` method must be defined in child classes."
            );
          }),
          (s.prototype.query = function (e, t) {
            throw new Error(
              "The `query` method must be defined in child classes."
            );
          }),
          (s.prototype.bind = function (e, t) {}),
          (s.prototype.destroy = function () {}),
          (s.prototype.generateResultId = function (e, t) {
            e = e.id + "-result-";
            return (
              (e += n.generateChars(4)),
              null != t.id
                ? (e += "-" + t.id.toString())
                : (e += "-" + n.generateChars(4)),
              e
            );
          }),
          s
        );
      }),
      u.define(
        "select2/data/select",
        ["./base", "../utils", "jquery"],
        function (e, a, l) {
          function n(e, t) {
            (this.$element = e),
              (this.options = t),
              n.__super__.constructor.call(this);
          }
          return (
            a.Extend(n, e),
            (n.prototype.current = function (e) {
              var t = this;
              e(
                Array.prototype.map.call(
                  this.$element[0].querySelectorAll(":checked"),
                  function (e) {
                    return t.item(l(e));
                  }
                )
              );
            }),
            (n.prototype.select = function (i) {
              var e,
                r = this;
              if (
                ((i.selected = !0),
                null != i.element &&
                  "option" === i.element.tagName.toLowerCase())
              )
                return (
                  (i.element.selected = !0),
                  void this.$element.trigger("input").trigger("change")
                );
              this.$element.prop("multiple")
                ? this.current(function (e) {
                    var t = [];
                    (i = [i]).push.apply(i, e);
                    for (var n = 0; n < i.length; n++) {
                      var s = i[n].id;
                      -1 === t.indexOf(s) && t.push(s);
                    }
                    r.$element.val(t),
                      r.$element.trigger("input").trigger("change");
                  })
                : ((e = i.id),
                  this.$element.val(e),
                  this.$element.trigger("input").trigger("change"));
            }),
            (n.prototype.unselect = function (i) {
              var r = this;
              if (this.$element.prop("multiple")) {
                if (
                  ((i.selected = !1),
                  null != i.element &&
                    "option" === i.element.tagName.toLowerCase())
                )
                  return (
                    (i.element.selected = !1),
                    void this.$element.trigger("input").trigger("change")
                  );
                this.current(function (e) {
                  for (var t = [], n = 0; n < e.length; n++) {
                    var s = e[n].id;
                    s !== i.id && -1 === t.indexOf(s) && t.push(s);
                  }
                  r.$element.val(t),
                    r.$element.trigger("input").trigger("change");
                });
              }
            }),
            (n.prototype.bind = function (e, t) {
              var n = this;
              (this.container = e).on("select", function (e) {
                n.select(e.data);
              }),
                e.on("unselect", function (e) {
                  n.unselect(e.data);
                });
            }),
            (n.prototype.destroy = function () {
              this.$element.find("*").each(function () {
                a.RemoveData(this);
              });
            }),
            (n.prototype.query = function (t, e) {
              var n = [],
                s = this;
              this.$element.children().each(function () {
                var e;
                ("option" !== this.tagName.toLowerCase() &&
                  "optgroup" !== this.tagName.toLowerCase()) ||
                  ((e = l(this)),
                  (e = s.item(e)),
                  null !== (e = s.matches(t, e)) && n.push(e));
              }),
                e({ results: n });
            }),
            (n.prototype.addOptions = function (e) {
              this.$element.append(e);
            }),
            (n.prototype.option = function (e) {
              var t;
              e.children
                ? ((t = document.createElement("optgroup")).label = e.text)
                : void 0 !== (t = document.createElement("option")).textContent
                ? (t.textContent = e.text)
                : (t.innerText = e.text),
                void 0 !== e.id && (t.value = e.id),
                e.disabled && (t.disabled = !0),
                e.selected && (t.selected = !0),
                e.title && (t.title = e.title);
              e = this._normalizeItem(e);
              return (e.element = t), a.StoreData(t, "data", e), l(t);
            }),
            (n.prototype.item = function (e) {
              var t = {};
              if (null != (t = a.GetData(e[0], "data"))) return t;
              var n = e[0];
              if ("option" === n.tagName.toLowerCase())
                t = {
                  id: e.val(),
                  text: e.text(),
                  disabled: e.prop("disabled"),
                  selected: e.prop("selected"),
                  title: e.prop("title"),
                };
              else if ("optgroup" === n.tagName.toLowerCase()) {
                t = {
                  text: e.prop("label"),
                  children: [],
                  title: e.prop("title"),
                };
                for (
                  var s = e.children("option"), i = [], r = 0;
                  r < s.length;
                  r++
                ) {
                  var o = l(s[r]),
                    o = this.item(o);
                  i.push(o);
                }
                t.children = i;
              }
              return (
                ((t = this._normalizeItem(t)).element = e[0]),
                a.StoreData(e[0], "data", t),
                t
              );
            }),
            (n.prototype._normalizeItem = function (e) {
              e !== Object(e) && (e = { id: e, text: e });
              return (
                null != (e = l.extend({}, { text: "" }, e)).id &&
                  (e.id = e.id.toString()),
                null != e.text && (e.text = e.text.toString()),
                null == e._resultId &&
                  e.id &&
                  null != this.container &&
                  (e._resultId = this.generateResultId(this.container, e)),
                l.extend({}, { selected: !1, disabled: !1 }, e)
              );
            }),
            (n.prototype.matches = function (e, t) {
              return this.options.get("matcher")(e, t);
            }),
            n
          );
        }
      ),
      u.define(
        "select2/data/array",
        ["./select", "../utils", "jquery"],
        function (e, t, c) {
          function s(e, t) {
            (this._dataToConvert = t.get("data") || []),
              s.__super__.constructor.call(this, e, t);
          }
          return (
            t.Extend(s, e),
            (s.prototype.bind = function (e, t) {
              s.__super__.bind.call(this, e, t),
                this.addOptions(this.convertToOptions(this._dataToConvert));
            }),
            (s.prototype.select = function (n) {
              var e = this.$element.find("option").filter(function (e, t) {
                return t.value == n.id.toString();
              });
              0 === e.length && ((e = this.option(n)), this.addOptions(e)),
                s.__super__.select.call(this, n);
            }),
            (s.prototype.convertToOptions = function (e) {
              var t = this,
                n = this.$element.find("option"),
                s = n
                  .map(function () {
                    return t.item(c(this)).id;
                  })
                  .get(),
                i = [];
              for (var r = 0; r < e.length; r++) {
                var o,
                  a,
                  l = this._normalizeItem(e[r]);
                0 <= s.indexOf(l.id)
                  ? ((o = n.filter(
                      (function (e) {
                        return function () {
                          return c(this).val() == e.id;
                        };
                      })(l)
                    )),
                    (a = this.item(o)),
                    (a = c.extend(!0, {}, l, a)),
                    (a = this.option(a)),
                    o.replaceWith(a))
                  : ((a = this.option(l)),
                    l.children &&
                      ((l = this.convertToOptions(l.children)), a.append(l)),
                    i.push(a));
              }
              return i;
            }),
            s
          );
        }
      ),
      u.define(
        "select2/data/ajax",
        ["./array", "../utils", "jquery"],
        function (e, t, r) {
          function n(e, t) {
            (this.ajaxOptions = this._applyDefaults(t.get("ajax"))),
              null != this.ajaxOptions.processResults &&
                (this.processResults = this.ajaxOptions.processResults),
              n.__super__.constructor.call(this, e, t);
          }
          return (
            t.Extend(n, e),
            (n.prototype._applyDefaults = function (e) {
              var t = {
                data: function (e) {
                  return r.extend({}, e, { q: e.term });
                },
                transport: function (e, t, n) {
                  e = r.ajax(e);
                  return e.then(t), e.fail(n), e;
                },
              };
              return r.extend({}, t, e, !0);
            }),
            (n.prototype.processResults = function (e) {
              return e;
            }),
            (n.prototype.query = function (t, n) {
              var s = this;
              null != this._request &&
                ("function" == typeof this._request.abort &&
                  this._request.abort(),
                (this._request = null));
              var i = r.extend({ type: "GET" }, this.ajaxOptions);
              function e() {
                var e = i.transport(
                  i,
                  function (e) {
                    e = s.processResults(e, t);
                    s.options.get("debug") &&
                      window.console &&
                      console.error &&
                      ((e && e.results && Array.isArray(e.results)) ||
                        console.error(
                          "Select2: The AJAX results did not return an array in the `results` key of the response."
                        )),
                      n(e);
                  },
                  function () {
                    ("status" in e && (0 === e.status || "0" === e.status)) ||
                      s.trigger("results:message", { message: "errorLoading" });
                  }
                );
                s._request = e;
              }
              "function" == typeof i.url &&
                (i.url = i.url.call(this.$element, t)),
                "function" == typeof i.data &&
                  (i.data = i.data.call(this.$element, t)),
                this.ajaxOptions.delay && null != t.term
                  ? (this._queryTimeout &&
                      window.clearTimeout(this._queryTimeout),
                    (this._queryTimeout = window.setTimeout(
                      e,
                      this.ajaxOptions.delay
                    )))
                  : e();
            }),
            n
          );
        }
      ),
      u.define("select2/data/tags", ["jquery"], function (t) {
        function e(e, t, n) {
          var s = n.get("tags"),
            i = n.get("createTag");
          void 0 !== i && (this.createTag = i);
          i = n.get("insertTag");
          if (
            (void 0 !== i && (this.insertTag = i),
            e.call(this, t, n),
            Array.isArray(s))
          )
            for (var r = 0; r < s.length; r++) {
              var o = s[r],
                o = this._normalizeItem(o),
                o = this.option(o);
              this.$element.append(o);
            }
        }
        return (
          (e.prototype.query = function (e, c, u) {
            var d = this;
            this._removeOldTags(),
              null != c.term && null == c.page
                ? e.call(this, c, function e(t, n) {
                    for (var s = t.results, i = 0; i < s.length; i++) {
                      var r = s[i],
                        o =
                          null != r.children && !e({ results: r.children }, !0);
                      if (
                        (r.text || "").toUpperCase() ===
                          (c.term || "").toUpperCase() ||
                        o
                      )
                        return !n && ((t.data = s), void u(t));
                    }
                    if (n) return !0;
                    var a,
                      l = d.createTag(c);
                    null != l &&
                      ((a = d.option(l)).attr("data-select2-tag", "true"),
                      d.addOptions([a]),
                      d.insertTag(s, l)),
                      (t.results = s),
                      u(t);
                  })
                : e.call(this, c, u);
          }),
          (e.prototype.createTag = function (e, t) {
            if (null == t.term) return null;
            t = t.term.trim();
            return "" === t ? null : { id: t, text: t };
          }),
          (e.prototype.insertTag = function (e, t, n) {
            t.unshift(n);
          }),
          (e.prototype._removeOldTags = function (e) {
            this.$element.find("option[data-select2-tag]").each(function () {
              this.selected || t(this).remove();
            });
          }),
          e
        );
      }),
      u.define("select2/data/tokenizer", ["jquery"], function (c) {
        function e(e, t, n) {
          var s = n.get("tokenizer");
          void 0 !== s && (this.tokenizer = s), e.call(this, t, n);
        }
        return (
          (e.prototype.bind = function (e, t, n) {
            e.call(this, t, n),
              (this.$search =
                t.dropdown.$search ||
                t.selection.$search ||
                n.find(".select2-search__field"));
          }),
          (e.prototype.query = function (e, t, n) {
            var s = this;
            t.term = t.term || "";
            var i = this.tokenizer(t, this.options, function (e) {
              var t,
                n = s._normalizeItem(e);
              s.$element.find("option").filter(function () {
                return c(this).val() === n.id;
              }).length ||
                ((t = s.option(n)).attr("data-select2-tag", !0),
                s._removeOldTags(),
                s.addOptions([t])),
                (t = n),
                s.trigger("select", { data: t });
            });
            i.term !== t.term &&
              (this.$search.length &&
                (this.$search.val(i.term), this.$search.trigger("focus")),
              (t.term = i.term)),
              e.call(this, t, n);
          }),
          (e.prototype.tokenizer = function (e, t, n, s) {
            for (
              var i = n.get("tokenSeparators") || [],
                r = t.term,
                o = 0,
                a =
                  this.createTag ||
                  function (e) {
                    return { id: e.term, text: e.term };
                  };
              o < r.length;

            ) {
              var l = r[o];
              -1 !== i.indexOf(l)
                ? ((l = r.substr(0, o)),
                  null != (l = a(c.extend({}, t, { term: l })))
                    ? (s(l), (r = r.substr(o + 1) || ""), (o = 0))
                    : o++)
                : o++;
            }
            return { term: r };
          }),
          e
        );
      }),
      u.define("select2/data/minimumInputLength", [], function () {
        function e(e, t, n) {
          (this.minimumInputLength = n.get("minimumInputLength")),
            e.call(this, t, n);
        }
        return (
          (e.prototype.query = function (e, t, n) {
            (t.term = t.term || ""),
              t.term.length < this.minimumInputLength
                ? this.trigger("results:message", {
                    message: "inputTooShort",
                    args: {
                      minimum: this.minimumInputLength,
                      input: t.term,
                      params: t,
                    },
                  })
                : e.call(this, t, n);
          }),
          e
        );
      }),
      u.define("select2/data/maximumInputLength", [], function () {
        function e(e, t, n) {
          (this.maximumInputLength = n.get("maximumInputLength")),
            e.call(this, t, n);
        }
        return (
          (e.prototype.query = function (e, t, n) {
            (t.term = t.term || ""),
              0 < this.maximumInputLength &&
              t.term.length > this.maximumInputLength
                ? this.trigger("results:message", {
                    message: "inputTooLong",
                    args: {
                      maximum: this.maximumInputLength,
                      input: t.term,
                      params: t,
                    },
                  })
                : e.call(this, t, n);
          }),
          e
        );
      }),
      u.define("select2/data/maximumSelectionLength", [], function () {
        function e(e, t, n) {
          (this.maximumSelectionLength = n.get("maximumSelectionLength")),
            e.call(this, t, n);
        }
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("select", function () {
                s._checkIfMaximumSelected();
              });
          }),
          (e.prototype.query = function (e, t, n) {
            var s = this;
            this._checkIfMaximumSelected(function () {
              e.call(s, t, n);
            });
          }),
          (e.prototype._checkIfMaximumSelected = function (e, t) {
            var n = this;
            this.current(function (e) {
              e = null != e ? e.length : 0;
              0 < n.maximumSelectionLength && e >= n.maximumSelectionLength
                ? n.trigger("results:message", {
                    message: "maximumSelected",
                    args: { maximum: n.maximumSelectionLength },
                  })
                : t && t();
            });
          }),
          e
        );
      }),
      u.define("select2/dropdown", ["jquery", "./utils"], function (t, e) {
        function n(e, t) {
          (this.$element = e),
            (this.options = t),
            n.__super__.constructor.call(this);
        }
        return (
          e.Extend(n, e.Observable),
          (n.prototype.render = function () {
            var e = t(
              '<span class="select2-dropdown"><span class="select2-results"></span></span>'
            );
            return e.attr("dir", this.options.get("dir")), (this.$dropdown = e);
          }),
          (n.prototype.bind = function () {}),
          (n.prototype.position = function (e, t) {}),
          (n.prototype.destroy = function () {
            this.$dropdown.remove();
          }),
          n
        );
      }),
      u.define("select2/dropdown/search", ["jquery"], function (r) {
        function e() {}
        return (
          (e.prototype.render = function (e) {
            var t = e.call(this),
              n = this.options.get("translations").get("search"),
              e = r(
                '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>'
              );
            return (
              (this.$searchContainer = e),
              (this.$search = e.find("input")),
              this.$search.prop(
                "autocomplete",
                this.options.get("autocomplete")
              ),
              this.$search.attr("aria-label", n()),
              t.prepend(e),
              t
            );
          }),
          (e.prototype.bind = function (e, t, n) {
            var s = this,
              i = t.id + "-results";
            e.call(this, t, n),
              this.$search.on("keydown", function (e) {
                s.trigger("keypress", e),
                  (s._keyUpPrevented = e.isDefaultPrevented());
              }),
              this.$search.on("input", function (e) {
                r(this).off("keyup");
              }),
              this.$search.on("keyup input", function (e) {
                s.handleSearch(e);
              }),
              t.on("open", function () {
                s.$search.attr("tabindex", 0),
                  s.$search.attr("aria-controls", i),
                  s.$search.trigger("focus"),
                  window.setTimeout(function () {
                    s.$search.trigger("focus");
                  }, 0);
              }),
              t.on("close", function () {
                s.$search.attr("tabindex", -1),
                  s.$search.removeAttr("aria-controls"),
                  s.$search.removeAttr("aria-activedescendant"),
                  s.$search.val(""),
                  s.$search.trigger("blur");
              }),
              t.on("focus", function () {
                t.isOpen() || s.$search.trigger("focus");
              }),
              t.on("results:all", function (e) {
                (null != e.query.term && "" !== e.query.term) ||
                  (s.showSearch(e)
                    ? s.$searchContainer[0].classList.remove(
                        "select2-search--hide"
                      )
                    : s.$searchContainer[0].classList.add(
                        "select2-search--hide"
                      ));
              }),
              t.on("results:focus", function (e) {
                e.data._resultId
                  ? s.$search.attr("aria-activedescendant", e.data._resultId)
                  : s.$search.removeAttr("aria-activedescendant");
              });
          }),
          (e.prototype.handleSearch = function (e) {
            var t;
            this._keyUpPrevented ||
              ((t = this.$search.val()), this.trigger("query", { term: t })),
              (this._keyUpPrevented = !1);
          }),
          (e.prototype.showSearch = function (e, t) {
            return !0;
          }),
          e
        );
      }),
      u.define("select2/dropdown/hidePlaceholder", [], function () {
        function e(e, t, n, s) {
          (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))),
            e.call(this, t, n, s);
        }
        return (
          (e.prototype.append = function (e, t) {
            (t.results = this.removePlaceholder(t.results)), e.call(this, t);
          }),
          (e.prototype.normalizePlaceholder = function (e, t) {
            return (t = "string" == typeof t ? { id: "", text: t } : t);
          }),
          (e.prototype.removePlaceholder = function (e, t) {
            for (var n = t.slice(0), s = t.length - 1; 0 <= s; s--) {
              var i = t[s];
              this.placeholder.id === i.id && n.splice(s, 1);
            }
            return n;
          }),
          e
        );
      }),
      u.define("select2/dropdown/infiniteScroll", ["jquery"], function (n) {
        function e(e, t, n, s) {
          (this.lastParams = {}),
            e.call(this, t, n, s),
            (this.$loadingMore = this.createLoadingMore()),
            (this.loading = !1);
        }
        return (
          (e.prototype.append = function (e, t) {
            this.$loadingMore.remove(),
              (this.loading = !1),
              e.call(this, t),
              this.showLoadingMore(t) &&
                (this.$results.append(this.$loadingMore),
                this.loadMoreIfNeeded());
          }),
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("query", function (e) {
                (s.lastParams = e), (s.loading = !0);
              }),
              t.on("query:append", function (e) {
                (s.lastParams = e), (s.loading = !0);
              }),
              this.$results.on("scroll", this.loadMoreIfNeeded.bind(this));
          }),
          (e.prototype.loadMoreIfNeeded = function () {
            var e = n.contains(document.documentElement, this.$loadingMore[0]);
            !this.loading &&
              e &&
              ((e = this.$results.offset().top + this.$results.outerHeight(!1)),
              this.$loadingMore.offset().top +
                this.$loadingMore.outerHeight(!1) <=
                e + 50 && this.loadMore());
          }),
          (e.prototype.loadMore = function () {
            this.loading = !0;
            var e = n.extend({}, { page: 1 }, this.lastParams);
            e.page++, this.trigger("query:append", e);
          }),
          (e.prototype.showLoadingMore = function (e, t) {
            return t.pagination && t.pagination.more;
          }),
          (e.prototype.createLoadingMore = function () {
            var e = n(
                '<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'
              ),
              t = this.options.get("translations").get("loadingMore");
            return e.html(t(this.lastParams)), e;
          }),
          e
        );
      }),
      u.define(
        "select2/dropdown/attachBody",
        ["jquery", "../utils"],
        function (u, o) {
          function e(e, t, n) {
            (this.$dropdownParent = u(
              n.get("dropdownParent") || document.body
            )),
              e.call(this, t, n);
          }
          return (
            (e.prototype.bind = function (e, t, n) {
              var s = this;
              e.call(this, t, n),
                t.on("open", function () {
                  s._showDropdown(),
                    s._attachPositioningHandler(t),
                    s._bindContainerResultHandlers(t);
                }),
                t.on("close", function () {
                  s._hideDropdown(), s._detachPositioningHandler(t);
                }),
                this.$dropdownContainer.on("mousedown", function (e) {
                  e.stopPropagation();
                });
            }),
            (e.prototype.destroy = function (e) {
              e.call(this), this.$dropdownContainer.remove();
            }),
            (e.prototype.position = function (e, t, n) {
              t.attr("class", n.attr("class")),
                t[0].classList.remove("select2"),
                t[0].classList.add("select2-container--open"),
                t.css({ position: "absolute", top: -999999 }),
                (this.$container = n);
            }),
            (e.prototype.render = function (e) {
              var t = u("<span></span>"),
                e = e.call(this);
              return t.append(e), (this.$dropdownContainer = t);
            }),
            (e.prototype._hideDropdown = function (e) {
              this.$dropdownContainer.detach();
            }),
            (e.prototype._bindContainerResultHandlers = function (e, t) {
              var n;
              this._containerResultsHandlersBound ||
                ((n = this),
                t.on("results:all", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("results:append", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("results:message", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("select", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("unselect", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                (this._containerResultsHandlersBound = !0));
            }),
            (e.prototype._attachPositioningHandler = function (e, t) {
              var n = this,
                s = "scroll.select2." + t.id,
                i = "resize.select2." + t.id,
                r = "orientationchange.select2." + t.id,
                t = this.$container.parents().filter(o.hasScroll);
              t.each(function () {
                o.StoreData(this, "select2-scroll-position", {
                  x: u(this).scrollLeft(),
                  y: u(this).scrollTop(),
                });
              }),
                t.on(s, function (e) {
                  var t = o.GetData(this, "select2-scroll-position");
                  u(this).scrollTop(t.y);
                }),
                u(window).on(s + " " + i + " " + r, function (e) {
                  n._positionDropdown(), n._resizeDropdown();
                });
            }),
            (e.prototype._detachPositioningHandler = function (e, t) {
              var n = "scroll.select2." + t.id,
                s = "resize.select2." + t.id,
                t = "orientationchange.select2." + t.id;
              this.$container.parents().filter(o.hasScroll).off(n),
                u(window).off(n + " " + s + " " + t);
            }),
            (e.prototype._positionDropdown = function () {
              var e = u(window),
                t = this.$dropdown[0].classList.contains(
                  "select2-dropdown--above"
                ),
                n = this.$dropdown[0].classList.contains(
                  "select2-dropdown--below"
                ),
                s = null,
                i = this.$container.offset();
              i.bottom = i.top + this.$container.outerHeight(!1);
              var r = { height: this.$container.outerHeight(!1) };
              (r.top = i.top), (r.bottom = i.top + r.height);
              var o = this.$dropdown.outerHeight(!1),
                a = e.scrollTop(),
                l = e.scrollTop() + e.height(),
                c = a < i.top - o,
                e = l > i.bottom + o,
                a = { left: i.left, top: r.bottom },
                l = this.$dropdownParent;
              "static" === l.css("position") && (l = l.offsetParent());
              i = { top: 0, left: 0 };
              (u.contains(document.body, l[0]) || l[0].isConnected) &&
                (i = l.offset()),
                (a.top -= i.top),
                (a.left -= i.left),
                t || n || (s = "below"),
                e || !c || t ? !c && e && t && (s = "below") : (s = "above"),
                ("above" == s || (t && "below" !== s)) &&
                  (a.top = r.top - i.top - o),
                null != s &&
                  (this.$dropdown[0].classList.remove(
                    "select2-dropdown--below"
                  ),
                  this.$dropdown[0].classList.remove("select2-dropdown--above"),
                  this.$dropdown[0].classList.add("select2-dropdown--" + s),
                  this.$container[0].classList.remove(
                    "select2-container--below"
                  ),
                  this.$container[0].classList.remove(
                    "select2-container--above"
                  ),
                  this.$container[0].classList.add("select2-container--" + s)),
                this.$dropdownContainer.css(a);
            }),
            (e.prototype._resizeDropdown = function () {
              var e = { width: this.$container.outerWidth(!1) + "px" };
              this.options.get("dropdownAutoWidth") &&
                ((e.minWidth = e.width),
                (e.position = "relative"),
                (e.width = "auto")),
                this.$dropdown.css(e);
            }),
            (e.prototype._showDropdown = function (e) {
              this.$dropdownContainer.appendTo(this.$dropdownParent),
                this._positionDropdown(),
                this._resizeDropdown();
            }),
            e
          );
        }
      ),
      u.define("select2/dropdown/minimumResultsForSearch", [], function () {
        function e(e, t, n, s) {
          (this.minimumResultsForSearch = n.get("minimumResultsForSearch")),
            this.minimumResultsForSearch < 0 &&
              (this.minimumResultsForSearch = 1 / 0),
            e.call(this, t, n, s);
        }
        return (
          (e.prototype.showSearch = function (e, t) {
            return (
              !(
                (function e(t) {
                  for (var n = 0, s = 0; s < t.length; s++) {
                    var i = t[s];
                    i.children ? (n += e(i.children)) : n++;
                  }
                  return n;
                })(t.data.results) < this.minimumResultsForSearch
              ) && e.call(this, t)
            );
          }),
          e
        );
      }),
      u.define("select2/dropdown/selectOnClose", ["../utils"], function (s) {
        function e() {}
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("close", function (e) {
                s._handleSelectOnClose(e);
              });
          }),
          (e.prototype._handleSelectOnClose = function (e, t) {
            if (t && null != t.originalSelect2Event) {
              var n = t.originalSelect2Event;
              if ("select" === n._type || "unselect" === n._type) return;
            }
            n = this.getHighlightedResults();
            n.length < 1 ||
              (null != (n = s.GetData(n[0], "data")).element &&
                n.element.selected) ||
              (null == n.element && n.selected) ||
              this.trigger("select", { data: n });
          }),
          e
        );
      }),
      u.define("select2/dropdown/closeOnSelect", [], function () {
        function e() {}
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("select", function (e) {
                s._selectTriggered(e);
              }),
              t.on("unselect", function (e) {
                s._selectTriggered(e);
              });
          }),
          (e.prototype._selectTriggered = function (e, t) {
            var n = t.originalEvent;
            (n && (n.ctrlKey || n.metaKey)) ||
              this.trigger("close", {
                originalEvent: n,
                originalSelect2Event: t,
              });
          }),
          e
        );
      }),
      u.define("select2/dropdown/dropdownCss", ["../utils"], function (n) {
        function e() {}
        return (
          (e.prototype.render = function (e) {
            var t = e.call(this),
              e = this.options.get("dropdownCssClass") || "";
            return (
              -1 !== e.indexOf(":all:") &&
                ((e = e.replace(":all:", "")),
                n.copyNonInternalCssClasses(t[0], this.$element[0])),
              t.addClass(e),
              t
            );
          }),
          e
        );
      }),
      u.define(
        "select2/dropdown/tagsSearchHighlight",
        ["../utils"],
        function (s) {
          function e() {}
          return (
            (e.prototype.highlightFirstItem = function (e) {
              var t = this.$results.find(
                ".select2-results__option--selectable:not(.select2-results__option--selected)"
              );
              if (0 < t.length) {
                var n = t.first(),
                  t = s.GetData(n[0], "data").element;
                if (
                  t &&
                  t.getAttribute &&
                  "true" === t.getAttribute("data-select2-tag")
                )
                  return void n.trigger("mouseenter");
              }
              e.call(this);
            }),
            e
          );
        }
      ),
      u.define("select2/i18n/en", [], function () {
        return {
          errorLoading: function () {
            return "The results could not be loaded.";
          },
          inputTooLong: function (e) {
            var t = e.input.length - e.maximum,
              e = "Please delete " + t + " character";
            return 1 != t && (e += "s"), e;
          },
          inputTooShort: function (e) {
            return (
              "Please enter " +
              (e.minimum - e.input.length) +
              " or more characters"
            );
          },
          loadingMore: function () {
            return "Loading more resultsâ€¦";
          },
          maximumSelected: function (e) {
            var t = "You can only select " + e.maximum + " item";
            return 1 != e.maximum && (t += "s"), t;
          },
          noResults: function () {
            return "No results found";
          },
          searching: function () {
            return "Searchingâ€¦";
          },
          removeAllItems: function () {
            return "Remove all items";
          },
          removeItem: function () {
            return "Remove item";
          },
          search: function () {
            return "Search";
          },
        };
      }),
      u.define(
        "select2/defaults",
        [
          "jquery",
          "./results",
          "./selection/single",
          "./selection/multiple",
          "./selection/placeholder",
          "./selection/allowClear",
          "./selection/search",
          "./selection/selectionCss",
          "./selection/eventRelay",
          "./utils",
          "./translation",
          "./diacritics",
          "./data/select",
          "./data/array",
          "./data/ajax",
          "./data/tags",
          "./data/tokenizer",
          "./data/minimumInputLength",
          "./data/maximumInputLength",
          "./data/maximumSelectionLength",
          "./dropdown",
          "./dropdown/search",
          "./dropdown/hidePlaceholder",
          "./dropdown/infiniteScroll",
          "./dropdown/attachBody",
          "./dropdown/minimumResultsForSearch",
          "./dropdown/selectOnClose",
          "./dropdown/closeOnSelect",
          "./dropdown/dropdownCss",
          "./dropdown/tagsSearchHighlight",
          "./i18n/en",
        ],
        function (
          l,
          r,
          o,
          a,
          c,
          u,
          d,
          p,
          h,
          f,
          g,
          t,
          m,
          y,
          v,
          _,
          b,
          $,
          w,
          x,
          A,
          D,
          S,
          E,
          O,
          C,
          L,
          T,
          q,
          I,
          e
        ) {
          function n() {
            this.reset();
          }
          return (
            (n.prototype.apply = function (e) {
              var t;
              null == (e = l.extend(!0, {}, this.defaults, e)).dataAdapter &&
                (null != e.ajax
                  ? (e.dataAdapter = v)
                  : null != e.data
                  ? (e.dataAdapter = y)
                  : (e.dataAdapter = m),
                0 < e.minimumInputLength &&
                  (e.dataAdapter = f.Decorate(e.dataAdapter, $)),
                0 < e.maximumInputLength &&
                  (e.dataAdapter = f.Decorate(e.dataAdapter, w)),
                0 < e.maximumSelectionLength &&
                  (e.dataAdapter = f.Decorate(e.dataAdapter, x)),
                e.tags && (e.dataAdapter = f.Decorate(e.dataAdapter, _)),
                (null == e.tokenSeparators && null == e.tokenizer) ||
                  (e.dataAdapter = f.Decorate(e.dataAdapter, b))),
                null == e.resultsAdapter &&
                  ((e.resultsAdapter = r),
                  null != e.ajax &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, E)),
                  null != e.placeholder &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, S)),
                  e.selectOnClose &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, L)),
                  e.tags &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, I))),
                null == e.dropdownAdapter &&
                  (e.multiple
                    ? (e.dropdownAdapter = A)
                    : ((t = f.Decorate(A, D)), (e.dropdownAdapter = t)),
                  0 !== e.minimumResultsForSearch &&
                    (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, C)),
                  e.closeOnSelect &&
                    (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, T)),
                  null != e.dropdownCssClass &&
                    (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, q)),
                  (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, O))),
                null == e.selectionAdapter &&
                  (e.multiple
                    ? (e.selectionAdapter = a)
                    : (e.selectionAdapter = o),
                  null != e.placeholder &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, c)),
                  e.allowClear &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, u)),
                  e.multiple &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, d)),
                  null != e.selectionCssClass &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, p)),
                  (e.selectionAdapter = f.Decorate(e.selectionAdapter, h))),
                (e.language = this._resolveLanguage(e.language)),
                e.language.push("en");
              for (var n = [], s = 0; s < e.language.length; s++) {
                var i = e.language[s];
                -1 === n.indexOf(i) && n.push(i);
              }
              return (
                (e.language = n),
                (e.translations = this._processTranslations(
                  e.language,
                  e.debug
                )),
                e
              );
            }),
            (n.prototype.reset = function () {
              function a(e) {
                return e.replace(/[^\u0000-\u007E]/g, function (e) {
                  return t[e] || e;
                });
              }
              this.defaults = {
                amdLanguageBase: "./i18n/",
                autocomplete: "off",
                closeOnSelect: !0,
                debug: !1,
                dropdownAutoWidth: !1,
                escapeMarkup: f.escapeMarkup,
                language: {},
                matcher: function e(t, n) {
                  if (null == t.term || "" === t.term.trim()) return n;
                  if (n.children && 0 < n.children.length) {
                    for (
                      var s = l.extend(!0, {}, n), i = n.children.length - 1;
                      0 <= i;
                      i--
                    )
                      null == e(t, n.children[i]) && s.children.splice(i, 1);
                    return 0 < s.children.length ? s : e(t, s);
                  }
                  var r = a(n.text).toUpperCase(),
                    o = a(t.term).toUpperCase();
                  return -1 < r.indexOf(o) ? n : null;
                },
                minimumInputLength: 0,
                maximumInputLength: 0,
                maximumSelectionLength: 0,
                minimumResultsForSearch: 0,
                selectOnClose: !1,
                scrollAfterSelect: !1,
                sorter: function (e) {
                  return e;
                },
                templateResult: function (e) {
                  return e.text;
                },
                templateSelection: function (e) {
                  return e.text;
                },
                theme: "default",
                width: "resolve",
              };
            }),
            (n.prototype.applyFromElement = function (e, t) {
              var n = e.language,
                s = this.defaults.language,
                i = t.prop("lang"),
                t = t.closest("[lang]").prop("lang"),
                t = Array.prototype.concat.call(
                  this._resolveLanguage(i),
                  this._resolveLanguage(n),
                  this._resolveLanguage(s),
                  this._resolveLanguage(t)
                );
              return (e.language = t), e;
            }),
            (n.prototype._resolveLanguage = function (e) {
              if (!e) return [];
              if (l.isEmptyObject(e)) return [];
              if (l.isPlainObject(e)) return [e];
              for (
                var t, n = Array.isArray(e) ? e : [e], s = [], i = 0;
                i < n.length;
                i++
              )
                s.push(n[i]),
                  "string" == typeof n[i] &&
                    0 < n[i].indexOf("-") &&
                    ((t = n[i].split("-")[0]), s.push(t));
              return s;
            }),
            (n.prototype._processTranslations = function (e, t) {
              for (var n = new g(), s = 0; s < e.length; s++) {
                var i = new g(),
                  r = e[s];
                if ("string" == typeof r)
                  try {
                    i = g.loadPath(r);
                  } catch (e) {
                    try {
                      (r = this.defaults.amdLanguageBase + r),
                        (i = g.loadPath(r));
                    } catch (e) {
                      t &&
                        window.console &&
                        console.warn &&
                        console.warn(
                          'Select2: The language file for "' +
                            r +
                            '" could not be automatically loaded. A fallback will be used instead.'
                        );
                    }
                  }
                else i = l.isPlainObject(r) ? new g(r) : r;
                n.extend(i);
              }
              return n;
            }),
            (n.prototype.set = function (e, t) {
              var n = {};
              n[l.camelCase(e)] = t;
              n = f._convertData(n);
              l.extend(!0, this.defaults, n);
            }),
            new n()
          );
        }
      ),
      u.define(
        "select2/options",
        ["jquery", "./defaults", "./utils"],
        function (c, n, u) {
          function e(e, t) {
            (this.options = e),
              null != t && this.fromElement(t),
              null != t && (this.options = n.applyFromElement(this.options, t)),
              (this.options = n.apply(this.options));
          }
          return (
            (e.prototype.fromElement = function (e) {
              var t = ["select2"];
              null == this.options.multiple &&
                (this.options.multiple = e.prop("multiple")),
                null == this.options.disabled &&
                  (this.options.disabled = e.prop("disabled")),
                null == this.options.autocomplete &&
                  e.prop("autocomplete") &&
                  (this.options.autocomplete = e.prop("autocomplete")),
                null == this.options.dir &&
                  (e.prop("dir")
                    ? (this.options.dir = e.prop("dir"))
                    : e.closest("[dir]").prop("dir")
                    ? (this.options.dir = e.closest("[dir]").prop("dir"))
                    : (this.options.dir = "ltr")),
                e.prop("disabled", this.options.disabled),
                e.prop("multiple", this.options.multiple),
                u.GetData(e[0], "select2Tags") &&
                  (this.options.debug &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      'Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'
                    ),
                  u.StoreData(e[0], "data", u.GetData(e[0], "select2Tags")),
                  u.StoreData(e[0], "tags", !0)),
                u.GetData(e[0], "ajaxUrl") &&
                  (this.options.debug &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      "Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."
                    ),
                  e.attr("ajax--url", u.GetData(e[0], "ajaxUrl")),
                  u.StoreData(e[0], "ajax-Url", u.GetData(e[0], "ajaxUrl")));
              var n = {};
              function s(e, t) {
                return t.toUpperCase();
              }
              for (var i = 0; i < e[0].attributes.length; i++) {
                var r = e[0].attributes[i].name,
                  o = "data-";
                r.substr(0, o.length) == o &&
                  ((r = r.substring(o.length)),
                  (o = u.GetData(e[0], r)),
                  (n[r.replace(/-([a-z])/g, s)] = o));
              }
              c.fn.jquery &&
                "1." == c.fn.jquery.substr(0, 2) &&
                e[0].dataset &&
                (n = c.extend(!0, {}, e[0].dataset, n));
              var a,
                l = c.extend(!0, {}, u.GetData(e[0]), n);
              for (a in (l = u._convertData(l)))
                -1 < t.indexOf(a) ||
                  (c.isPlainObject(this.options[a])
                    ? c.extend(this.options[a], l[a])
                    : (this.options[a] = l[a]));
              return this;
            }),
            (e.prototype.get = function (e) {
              return this.options[e];
            }),
            (e.prototype.set = function (e, t) {
              this.options[e] = t;
            }),
            e
          );
        }
      ),
      u.define(
        "select2/core",
        ["jquery", "./options", "./utils", "./keys"],
        function (t, i, r, s) {
          var o = function (e, t) {
            null != r.GetData(e[0], "select2") &&
              r.GetData(e[0], "select2").destroy(),
              (this.$element = e),
              (this.id = this._generateId(e)),
              (t = t || {}),
              (this.options = new i(t, e)),
              o.__super__.constructor.call(this);
            var n = e.attr("tabindex") || 0;
            r.StoreData(e[0], "old-tabindex", n), e.attr("tabindex", "-1");
            t = this.options.get("dataAdapter");
            this.dataAdapter = new t(e, this.options);
            n = this.render();
            this._placeContainer(n);
            t = this.options.get("selectionAdapter");
            (this.selection = new t(e, this.options)),
              (this.$selection = this.selection.render()),
              this.selection.position(this.$selection, n);
            t = this.options.get("dropdownAdapter");
            (this.dropdown = new t(e, this.options)),
              (this.$dropdown = this.dropdown.render()),
              this.dropdown.position(this.$dropdown, n);
            n = this.options.get("resultsAdapter");
            (this.results = new n(e, this.options, this.dataAdapter)),
              (this.$results = this.results.render()),
              this.results.position(this.$results, this.$dropdown);
            var s = this;
            this._bindAdapters(),
              this._registerDomEvents(),
              this._registerDataEvents(),
              this._registerSelectionEvents(),
              this._registerDropdownEvents(),
              this._registerResultsEvents(),
              this._registerEvents(),
              this.dataAdapter.current(function (e) {
                s.trigger("selection:update", { data: e });
              }),
              e[0].classList.add("select2-hidden-accessible"),
              e.attr("aria-hidden", "true"),
              this._syncAttributes(),
              r.StoreData(e[0], "select2", this),
              e.data("select2", this);
          };
          return (
            r.Extend(o, r.Observable),
            (o.prototype._generateId = function (e) {
              return (
                "select2-" +
                (null != e.attr("id")
                  ? e.attr("id")
                  : null != e.attr("name")
                  ? e.attr("name") + "-" + r.generateChars(2)
                  : r.generateChars(4)
                ).replace(/(:|\.|\[|\]|,)/g, "")
              );
            }),
            (o.prototype._placeContainer = function (e) {
              e.insertAfter(this.$element);
              var t = this._resolveWidth(
                this.$element,
                this.options.get("width")
              );
              null != t && e.css("width", t);
            }),
            (o.prototype._resolveWidth = function (e, t) {
              var n =
                /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
              if ("resolve" == t) {
                var s = this._resolveWidth(e, "style");
                return null != s ? s : this._resolveWidth(e, "element");
              }
              if ("element" == t) {
                s = e.outerWidth(!1);
                return s <= 0 ? "auto" : s + "px";
              }
              if ("style" != t)
                return "computedstyle" != t
                  ? t
                  : window.getComputedStyle(e[0]).width;
              e = e.attr("style");
              if ("string" != typeof e) return null;
              for (var i = e.split(";"), r = 0, o = i.length; r < o; r += 1) {
                var a = i[r].replace(/\s/g, "").match(n);
                if (null !== a && 1 <= a.length) return a[1];
              }
              return null;
            }),
            (o.prototype._bindAdapters = function () {
              this.dataAdapter.bind(this, this.$container),
                this.selection.bind(this, this.$container),
                this.dropdown.bind(this, this.$container),
                this.results.bind(this, this.$container);
            }),
            (o.prototype._registerDomEvents = function () {
              var t = this;
              this.$element.on("change.select2", function () {
                t.dataAdapter.current(function (e) {
                  t.trigger("selection:update", { data: e });
                });
              }),
                this.$element.on("focus.select2", function (e) {
                  t.trigger("focus", e);
                }),
                (this._syncA = r.bind(this._syncAttributes, this)),
                (this._syncS = r.bind(this._syncSubtree, this)),
                (this._observer = new window.MutationObserver(function (e) {
                  t._syncA(), t._syncS(e);
                })),
                this._observer.observe(this.$element[0], {
                  attributes: !0,
                  childList: !0,
                  subtree: !1,
                });
            }),
            (o.prototype._registerDataEvents = function () {
              var n = this;
              this.dataAdapter.on("*", function (e, t) {
                n.trigger(e, t);
              });
            }),
            (o.prototype._registerSelectionEvents = function () {
              var n = this,
                s = ["toggle", "focus"];
              this.selection.on("toggle", function () {
                n.toggleDropdown();
              }),
                this.selection.on("focus", function (e) {
                  n.focus(e);
                }),
                this.selection.on("*", function (e, t) {
                  -1 === s.indexOf(e) && n.trigger(e, t);
                });
            }),
            (o.prototype._registerDropdownEvents = function () {
              var n = this;
              this.dropdown.on("*", function (e, t) {
                n.trigger(e, t);
              });
            }),
            (o.prototype._registerResultsEvents = function () {
              var n = this;
              this.results.on("*", function (e, t) {
                n.trigger(e, t);
              });
            }),
            (o.prototype._registerEvents = function () {
              var n = this;
              this.on("open", function () {
                n.$container[0].classList.add("select2-container--open");
              }),
                this.on("close", function () {
                  n.$container[0].classList.remove("select2-container--open");
                }),
                this.on("enable", function () {
                  n.$container[0].classList.remove(
                    "select2-container--disabled"
                  );
                }),
                this.on("disable", function () {
                  n.$container[0].classList.add("select2-container--disabled");
                }),
                this.on("blur", function () {
                  n.$container[0].classList.remove("select2-container--focus");
                }),
                this.on("query", function (t) {
                  n.isOpen() || n.trigger("open", {}),
                    this.dataAdapter.query(t, function (e) {
                      n.trigger("results:all", { data: e, query: t });
                    });
                }),
                this.on("query:append", function (t) {
                  this.dataAdapter.query(t, function (e) {
                    n.trigger("results:append", { data: e, query: t });
                  });
                }),
                this.on("keypress", function (e) {
                  var t = e.which;
                  n.isOpen()
                    ? t === s.ESC || (t === s.UP && e.altKey)
                      ? (n.close(e), e.preventDefault())
                      : t === s.ENTER || t === s.TAB
                      ? (n.trigger("results:select", {}), e.preventDefault())
                      : t === s.SPACE && e.ctrlKey
                      ? (n.trigger("results:toggle", {}), e.preventDefault())
                      : t === s.UP
                      ? (n.trigger("results:previous", {}), e.preventDefault())
                      : t === s.DOWN &&
                        (n.trigger("results:next", {}), e.preventDefault())
                    : (t === s.ENTER ||
                        t === s.SPACE ||
                        (t === s.DOWN && e.altKey)) &&
                      (n.open(), e.preventDefault());
                });
            }),
            (o.prototype._syncAttributes = function () {
              this.options.set("disabled", this.$element.prop("disabled")),
                this.isDisabled()
                  ? (this.isOpen() && this.close(), this.trigger("disable", {}))
                  : this.trigger("enable", {});
            }),
            (o.prototype._isChangeMutation = function (e) {
              var t = this;
              if (e.addedNodes && 0 < e.addedNodes.length) {
                for (var n = 0; n < e.addedNodes.length; n++)
                  if (e.addedNodes[n].selected) return !0;
              } else {
                if (e.removedNodes && 0 < e.removedNodes.length) return !0;
                if (Array.isArray(e))
                  return e.some(function (e) {
                    return t._isChangeMutation(e);
                  });
              }
              return !1;
            }),
            (o.prototype._syncSubtree = function (e) {
              var e = this._isChangeMutation(e),
                t = this;
              e &&
                this.dataAdapter.current(function (e) {
                  t.trigger("selection:update", { data: e });
                });
            }),
            (o.prototype.trigger = function (e, t) {
              var n = o.__super__.trigger,
                s = {
                  open: "opening",
                  close: "closing",
                  select: "selecting",
                  unselect: "unselecting",
                  clear: "clearing",
                };
              if ((void 0 === t && (t = {}), e in s)) {
                var i = s[e],
                  s = { prevented: !1, name: e, args: t };
                if ((n.call(this, i, s), s.prevented))
                  return void (t.prevented = !0);
              }
              n.call(this, e, t);
            }),
            (o.prototype.toggleDropdown = function () {
              this.isDisabled() || (this.isOpen() ? this.close() : this.open());
            }),
            (o.prototype.open = function () {
              this.isOpen() || this.isDisabled() || this.trigger("query", {});
            }),
            (o.prototype.close = function (e) {
              this.isOpen() && this.trigger("close", { originalEvent: e });
            }),
            (o.prototype.isEnabled = function () {
              return !this.isDisabled();
            }),
            (o.prototype.isDisabled = function () {
              return this.options.get("disabled");
            }),
            (o.prototype.isOpen = function () {
              return this.$container[0].classList.contains(
                "select2-container--open"
              );
            }),
            (o.prototype.hasFocus = function () {
              return this.$container[0].classList.contains(
                "select2-container--focus"
              );
            }),
            (o.prototype.focus = function (e) {
              this.hasFocus() ||
                (this.$container[0].classList.add("select2-container--focus"),
                this.trigger("focus", {}));
            }),
            (o.prototype.enable = function (e) {
              this.options.get("debug") &&
                window.console &&
                console.warn &&
                console.warn(
                  'Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'
                );
              e = !(e = null == e || 0 === e.length ? [!0] : e)[0];
              this.$element.prop("disabled", e);
            }),
            (o.prototype.data = function () {
              this.options.get("debug") &&
                0 < arguments.length &&
                window.console &&
                console.warn &&
                console.warn(
                  'Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'
                );
              var t = [];
              return (
                this.dataAdapter.current(function (e) {
                  t = e;
                }),
                t
              );
            }),
            (o.prototype.val = function (e) {
              if (
                (this.options.get("debug") &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'
                  ),
                null == e || 0 === e.length)
              )
                return this.$element.val();
              e = e[0];
              Array.isArray(e) &&
                (e = e.map(function (e) {
                  return e.toString();
                })),
                this.$element.val(e).trigger("input").trigger("change");
            }),
            (o.prototype.destroy = function () {
              r.RemoveData(this.$container[0]),
                this.$container.remove(),
                this._observer.disconnect(),
                (this._observer = null),
                (this._syncA = null),
                (this._syncS = null),
                this.$element.off(".select2"),
                this.$element.attr(
                  "tabindex",
                  r.GetData(this.$element[0], "old-tabindex")
                ),
                this.$element[0].classList.remove("select2-hidden-accessible"),
                this.$element.attr("aria-hidden", "false"),
                r.RemoveData(this.$element[0]),
                this.$element.removeData("select2"),
                this.dataAdapter.destroy(),
                this.selection.destroy(),
                this.dropdown.destroy(),
                this.results.destroy(),
                (this.dataAdapter = null),
                (this.selection = null),
                (this.dropdown = null),
                (this.results = null);
            }),
            (o.prototype.render = function () {
              var e = t(
                '<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'
              );
              return (
                e.attr("dir", this.options.get("dir")),
                (this.$container = e),
                this.$container[0].classList.add(
                  "select2-container--" + this.options.get("theme")
                ),
                r.StoreData(e[0], "element", this.$element),
                e
              );
            }),
            o
          );
        }
      ),
      u.define("jquery-mousewheel", ["jquery"], function (e) {
        return e;
      }),
      u.define(
        "jquery.select2",
        [
          "jquery",
          "jquery-mousewheel",
          "./select2/core",
          "./select2/defaults",
          "./select2/utils",
        ],
        function (i, e, r, t, o) {
          var a;
          return (
            null == i.fn.select2 &&
              ((a = ["open", "close", "destroy"]),
              (i.fn.select2 = function (t) {
                if ("object" == typeof (t = t || {}))
                  return (
                    this.each(function () {
                      var e = i.extend(!0, {}, t);
                      new r(i(this), e);
                    }),
                    this
                  );
                if ("string" != typeof t)
                  throw new Error("Invalid arguments for Select2: " + t);
                var n,
                  s = Array.prototype.slice.call(arguments, 1);
                return (
                  this.each(function () {
                    var e = o.GetData(this, "select2");
                    null == e &&
                      window.console &&
                      console.error &&
                      console.error(
                        "The select2('" +
                          t +
                          "') method was called on an element that is not using Select2."
                      ),
                      (n = e[t].apply(e, s));
                  }),
                  -1 < a.indexOf(t) ? this : n
                );
              })),
            null == i.fn.select2.defaults && (i.fn.select2.defaults = t),
            r
          );
        }
      ),
      { define: u.define, require: u.require });
  function b(e, t) {
    return i.call(e, t);
  }
  function l(e, t) {
    var n,
      s,
      i,
      r,
      o,
      a,
      l,
      c,
      u,
      d,
      p = t && t.split("/"),
      h = y.map,
      f = (h && h["*"]) || {};
    if (e) {
      for (
        t = (e = e.split("/")).length - 1,
          y.nodeIdCompat && _.test(e[t]) && (e[t] = e[t].replace(_, "")),
          "." === e[0].charAt(0) &&
            p &&
            (e = p.slice(0, p.length - 1).concat(e)),
          c = 0;
        c < e.length;
        c++
      )
        "." === (d = e[c])
          ? (e.splice(c, 1), --c)
          : ".." === d &&
            (0 === c ||
              (1 === c && ".." === e[2]) ||
              ".." === e[c - 1] ||
              (0 < c && (e.splice(c - 1, 2), (c -= 2))));
      e = e.join("/");
    }
    if ((p || f) && h) {
      for (c = (n = e.split("/")).length; 0 < c; --c) {
        if (((s = n.slice(0, c).join("/")), p))
          for (u = p.length; 0 < u; --u)
            if (((i = h[p.slice(0, u).join("/")]), (i = i && i[s]))) {
              (r = i), (o = c);
              break;
            }
        if (r) break;
        !a && f && f[s] && ((a = f[s]), (l = c));
      }
      !r && a && ((r = a), (o = l)),
        r && (n.splice(0, o, r), (e = n.join("/")));
    }
    return e;
  }
  function w(t, n) {
    return function () {
      var e = a.call(arguments, 0);
      return (
        "string" != typeof e[0] && 1 === e.length && e.push(null),
        o.apply(p, e.concat([t, n]))
      );
    };
  }
  function x(e) {
    var t;
    if (
      (b(m, e) && ((t = m[e]), delete m[e], (v[e] = !0), r.apply(p, t)),
      !b(g, e) && !b(v, e))
    )
      throw new Error("No " + e);
    return g[e];
  }
  function c(e) {
    var t,
      n = e ? e.indexOf("!") : -1;
    return (
      -1 < n && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))),
      [t, e]
    );
  }
  function A(e) {
    return e ? c(e) : [];
  }
  var u = s.require("jquery.select2");
  return (t.fn.select2.amd = s), u;
});
