function e() {}
function t() {
  t.init.call(this);
}
function n(n, i, r, a) {
  var s;
  if ("function" != typeof r) throw new TypeError('"listener" argument must be a function');
  if (s = n._events) {
    s.newListener && (n.emit("newListener", i, r.listener ? r.listener : r), s = n._events);
    var o = s[i];
  } else s = n._events = new e(), n._eventsCount = 0;
  return o ? ("function" == typeof o ? o = s[i] = a ? [r, o] : [o, r] : a ? o.unshift(r) : o.push(r), o.warned || (r = void 0 === n._maxListeners ? t.defaultMaxListeners : n._maxListeners) && 0 < r && o.length > r && (o.warned = !0, (r = Error("Possible EventEmitter memory leak detected. " + o.length + " " + i + " listeners added. Use emitter.setMaxListeners() to increase limit")).name = "MaxListenersExceededWarning", r.emitter = n, r.type = i, r.count = o.length, console.warn)) : (s[i] = r, ++n._eventsCount), n;
}
function i(e, t, n) {
  function i() {
    e.removeListener(t, i), r || (r = !0, n.apply(e, arguments));
  }
  var r = !1;
  return i.listener = n, i;
}
function r(e) {
  var t = this._events;
  if (t) {
    if ("function" == typeof (e = t[e])) return 1;
    if (e) return e.length;
  }
  return 0;
}
function a(e, t) {
  for (var n = Array(t); t--;) n[t] = e[t];
  return n;
}
!function () {
  function e(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }
  function t(t, n, i) {
    return n && e(t.prototype, n), i && e(t, i), t;
  }
  function n() {
    return (n = Object.assign || function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var n,
          i = arguments[t];
        for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
      }
      return e;
    }).apply(this, arguments);
  }
  function i(e, t) {
    e.prototype = Object.create(t.prototype), e.prototype.constructor = e, r(e, t);
  }
  function r(e, t) {
    return (r = Object.setPrototypeOf || ((e, t) => (e.__proto__ = t, e)))(e, t);
  }
  function a(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function s(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, i = Array(t); n < t; n++) i[n] = e[n];
    return i;
  }
  function o(e, t) {
    var n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (n) return (n = n.call(e)).next.bind(n);
    if (Array.isArray(e) || (n = ((e, t) => {
      if (e) {
        if ("string" == typeof e) return s(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? s(e, t) : void 0;
      }
    })(e)) || t && e && "number" == typeof e.length) {
      n && (e = n);
      var i = 0;
      return () => i >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[i++]
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function l(e) {
    c(e);
    var t = U.get(e).animations;
    if (0 !== t.length) {
      e = e.currentTime;
      for (var n = 0; n < t.length; n++) t[n].tickAnimation(e);
    }
  }
  function u(e, t) {
    if (!e) return null;
    var n = "horizontal-tb" == getComputedStyle(e).writingMode,
      i = e.scrollTop;
    return ("horizontal" == t || "inline" == t && n || "block" == t && !n) && (i = Math.abs(e.scrollLeft)), i;
  }
  function c(e) {
    if (e instanceof F) {
      var t = e.subject;
      t && "none" != getComputedStyle(t).display ? m(e, T(t)) : m(e, null);
    } else (t = U.get(e)).anonymousSource && m(e, "root" == t.anonymousSource ? document.scrollingElement : T(t.anonymousTarget));
  }
  function m(e, t) {
    var n = U.get(e),
      i = n.source,
      r = n.scrollListener;
    i != t && (i && r && (i === document.scrollingElement ? document : i).removeEventListener("scroll", r), U.get(e).source = t, t) && (i = () => {
      l(e);
    }, (t === document.scrollingElement ? document : t).addEventListener("scroll", i), n.scrollListener = i);
  }
  function h(e, t) {
    e = U.get(e).animations;
    for (var n = 0; n < e.length; n++) e[n].animation == t && e.splice(n, 1);
  }
  function d(e, t, n) {
    for (var i = U.get(e).animations, r = 0; r < i.length; r++) if (i[r].animation == t) return;
    i.push({
      animation: t,
      tickAnimation: n
    }), l(e);
  }
  function f(e, t) {
    for (e = e.parentElement; null != e;) {
      if (t(e)) return e;
      e = e.parentElement;
    }
  }
  function p(e) {
    switch (getComputedStyle(e).display) {
      case "block":
      case "inline-block":
      case "list-item":
      case "table":
      case "table-caption":
      case "flow-root":
      case "flex":
      case "grid":
        return !0;
    }
    return !1;
  }
  function y(e) {
    return "none" != (e = getComputedStyle(e)).transform || "none" != e.perspective || "transform" == e.willChange || "perspective" == e.willChange || "none" != e.filter || "filter" == e.willChange || "none" != e.backdropFilter;
  }
  function g(e) {
    return "static" != getComputedStyle(e).position || y(e);
  }
  function v(e) {
    switch (getComputedStyle(e).position) {
      case "static":
      case "relative":
      case "sticky":
        return f(e, p);
      case "absolute":
        return f(e, g);
      case "fixed":
        return f(e, y);
    }
  }
  function T(e) {
    if (e) {
      for (; e = v(e);) switch (getComputedStyle(e)["overflow-x"]) {
        case "auto":
        case "scroll":
        case "hidden":
          return e == document.body && "visible" == getComputedStyle(document.scrollingElement).overflow ? document.scrollingElement : e;
      }
      return document.scrollingElement;
    }
  }
  function b(e, t) {
    var n = U.get(e);
    return "inactive" === e.phase ? null : e instanceof F ? S(t, e.source, e.subject, n.orientation, n.inset) : null;
  }
  function S(e, t, n, i, r) {
    for (var a = 0, s = 0, o = n, l = t.offsetParent; o && o != l;) s += o.offsetLeft, a += o.offsetTop, o = o.offsetParent;
    s -= t.offsetLeft + t.clientLeft, a -= t.offsetTop + t.clientTop;
    var u = getComputedStyle(t),
      c = "horizontal-tb" == u.writingMode,
      m = l = o = void 0;
    switch ("horizontal" == i || "inline" == i && c || "block" == i && !c ? (o = n.clientWidth, l = s, ("rtl" == u.direction || "vertical-rl" == u.writingMode) && (l += t.scrollWidth - t.clientWidth), m = t.clientWidth) : (o = n.clientHeight, l = a, m = t.clientHeight), i = (t = l - m + (n = ((e, t) => {
      var n = {
        start: 0,
        end: 0
      };
      if (!e) return n;
      var i = [];
      if (e.split(" ").forEach(e => {
        e.endsWith("%") ? i.push(t / 100 * parseFloat(e)) : e.endsWith("px") ? i.push(parseFloat(e)) : "auto" === e && i.push(0);
      }), 2 < i.length) throw TypeError("Invalid inset");
      return 1 == i.length ? (n.start = i[0], n.end = i[0]) : 2 == i.length && (n.start = i[0], n.end = i[1]), n;
    })(r, m)).end) + o, r = (n = l + o - n.start) - o, o = Math.min(i, r), i = Math.max(i, r), a = r = void 0, e) {
      case "cover":
        r = t, a = n;
        break;
      case "contain":
        r = o, a = i;
        break;
      case "enter":
        r = t, a = o;
        break;
      case "exit":
        r = i, a = n;
    }
    return {
      start: r,
      end: a
    };
  }
  function w(e, t, n) {
    return k(b(e, t), n, b(e, "cover"));
  }
  function k(e, t, n) {
    return e && n ? (t.value / 100 * (e.end - e.start) + e.start - n.start) / (n.end - n.start) : 0;
  }
  function _(e) {
    e.readyPromise = new K(), requestAnimationFrame(() => {
      null !== e.timeline.currentTime && W(e);
    });
  }
  function x() {
    return new DOMException("The user aborted a request", "AbortError");
  }
  function E(e, t) {
    if (null === t) return t;
    if ("number" != typeof t) throw new DOMException("Unexpected value: " + t + ".  Cannot convert to CssNumberish", "InvalidStateError");
    return e = O(e), CSS.percent(e ? 100 * t / e : 0);
  }
  function P(e, t) {
    if (e.timeline) {
      if (null === t) return t;
      if ("percent" === t.unit) return e = O(e), t.value * e / 100;
      throw new DOMException("CSSNumericValue must be a percentage for progress based animations.", "NotSupportedError");
    }
    if (null == t || "number" == typeof t) return t;
    if (t = t.to("ms"), convertTime) return t.value;
    throw new DOMException("CSSNumericValue must be either a number or a time value for time based animations.", "InvalidStateError");
  }
  function C(e) {
    if (e.finishedPromise && "pending" == e.finishedPromise.state && "finished" == e.proxy.playState) {
      e.finishedPromise.resolve(e.proxy), e.animation.pause();
      var t = new CustomEvent("finish", {
        detail: {
          currentTime: e.proxy.currentTime,
          timelineTime: e.proxy.timeline.currentTime
        }
      });
      Object.defineProperty(t, "currentTime", {
        get: function () {
          return this.detail.currentTime;
        }
      }), Object.defineProperty(t, "timelineTime", {
        get: function () {
          return this.detail.timelineTime;
        }
      }), requestAnimationFrame(() => {
        queueMicrotask(() => {
          e.animation.dispatchEvent(t);
        });
      });
    }
  }
  function R(e) {
    return null !== e.pendingPlaybackRate ? e.pendingPlaybackRate : e.animation.playbackRate;
  }
  function M(e) {
    null !== e.pendingPlaybackRate && (e.animation.playbackRate = e.pendingPlaybackRate, e.pendingPlaybackRate = null);
  }
  function I(e) {
    if (!e.timeline) return null;
    var t = P(e, e.timeline.currentTime);
    return null === t || null === e.startTime ? null : (-0 == (e = (t - e.startTime) * e.animation.playbackRate) && (e = 0), e);
  }
  function L(e, t) {
    if (!e.timeline) return null;
    var n = P(e, e.timeline.currentTime);
    return null == n ? null : n - t / e.animation.playbackRate;
  }
  function A(e, t, n) {
    if (e.timeline) {
      var i = t ? P(e, e.proxy.currentTime) : I(e);
      if (i && null != e.startTime && !e.proxy.pending) {
        var r = R(e),
          a = O(e),
          s = e.previousCurrentTime;
        0 < r && i >= a ? ((null === s || s < a) && (s = a), e.holdTime = t ? i : s) : 0 > r && 0 >= i ? ((null == s || 0 < s) && (s = 0), e.holdTime = t ? i : s) : 0 != r && (t && null !== e.holdTime && (e.startTime = L(e, e.holdTime)), e.holdTime = null);
      }
      j(e), e.previousCurrentTime = P(e, e.proxy.currentTime), "finished" == e.proxy.playState ? (e.finishedPromise || (e.finishedPromise = new K()), "pending" == e.finishedPromise.state && (n ? C(e) : Promise.resolve().then(() => {
        C(e);
      }))) : (e.finishedPromise && "resolved" == e.finishedPromise.state && (e.finishedPromise = new K()), "paused" != e.animation.playState && e.animation.pause());
    }
  }
  function O(e) {
    var t = e.proxy.effect.getTiming();
    return e = e.normalizedTiming || t, Math.max(0, e.delay + e.endDelay + e.iterations * e.duration);
  }
  function j(e) {
    if (e.timeline) if (null !== e.startTime) {
      var t = e.timeline.currentTime;
      null != t && N(e, (P(e, t) - e.startTime) * e.animation.playbackRate);
    } else null !== e.holdTime && N(e, e.holdTime);
  }
  function N(e, t) {
    var n = e.timeline,
      i = e.animation.playbackRate;
    e.animation.currentTime = t + (n.currentTime && n.currentTime.value == (0 > i ? 0 : 100) ? 0 > i ? .001 : -.001 : 0);
  }
  function V(e, t) {
    if (e.timeline) {
      var n = "paused" == e.proxy.playState && e.proxy.pending,
        i = !1,
        r = null,
        a = P(e, e.proxy.currentTime);
      e.resetCurrentTimeOnResume && (a = null, e.resetCurrentTimeOnResume = !1);
      var s = R(e),
        o = O(e);
      if (0 < s && t && (null == a || 0 > a || a >= o)) r = 0;else if (0 > s && t && (null == a || 0 >= a || a > o)) {
        if (1 / 0 == o) return void e.animation.play();
        r = o;
      } else 0 == s && null == a && (r = 0);
      null != r && (e.startTime = r, e.holdTime = null, M(e)), d(e.timeline, e.animation, q.bind(e.proxy)), e.holdTime && (e.startTime = null), e.pendingTask && (e.pendingTask = null, i = !0), (null !== e.holdTime || null !== r || n || null !== e.pendingPlaybackRate) && (e.readyPromise && !i && (e.readyPromise = null), j(e), e.readyPromise || _(e), e.pendingTask = "play", A(e, !1, !1));
    }
  }
  function q(e) {
    var t = $.get(this);
    if (null != e) {
      t.pendingTask && W(t);
      var n = this.playState;
      "running" != n && "finished" != n || (N(t, (P(t, e) - P(t, this.startTime)) * this.playbackRate), "finished" == n && 0 != R(t) && (t.holdTime = null), A(t, !1, !1));
    } else "idle" != t.animation.playState && t.animation.cancel();
  }
  function W(e) {
    var t, n;
    "pause" == e.pendingTask ? (n = P(t = e, t.timeline.currentTime), null != t.startTime && null == t.holdTime && (t.holdTime = (n - t.startTime) * t.animation.playbackRate), M(t), t.startTime = null, t.readyPromise.resolve(t.proxy), A(t, !1, !1), j(t), t.pendingTask = null) : "play" == e.pendingTask && (e => {
      var t = P(e, e.timeline.currentTime);
      if (null != e.holdTime) M(e), 0 == e.animation.playbackRate ? e.startTime = t : (e.startTime = t - e.holdTime / e.animation.playbackRate, e.holdTime = null);else if (null !== e.startTime && null !== e.pendingPlaybackRate) {
        var n = (t - e.startTime) * e.animation.playbackRate;
        M(e);
        var i = e.animation.playbackRate;
        0 == i ? (e.holdTime = null, e.startTime = t) : e.startTime = t - n / i;
      }
      e.readyPromise && "pending" == e.readyPromise.state && e.readyPromise.resolve(e.proxy), A(e, !1, !1), j(e), e.pendingTask = null;
    })(e);
  }
  function D(e, t) {
    if (!e) return null;
    if (e = e.split(" "), !H.includes(e[0]) || 2 == e.length && !e[1].endsWith("%")) throw TypeError("Invalid animation delay");
    if (2 == e.length) {
      if (t = parseFloat(e[1]), Number.isNaN(t)) throw TypeError('"' + e[1] + '" is not a valid percentage for animation delay');
      t = CSS.percent(t);
    }
    return {
      name: e[0],
      offset: t
    };
  }
  function z(e) {
    var t = {
      start: {
        name: "cover",
        offset: CSS.percent(0)
      },
      end: {
        name: "cover",
        offset: CSS.percent(100)
      }
    };
    if (!e) return t;
    var n = [],
      i = [];
    if (e.split(" ").forEach(e => {
      e.endsWith("%") ? i.push(parseFloat(e)) : n.push(e);
    }), 2 < n.length || 2 < i.length || 1 == i.length) throw TypeError("Invalid time range");
    return n.length && (t.start.name = n[0], t.end.name = 1 < n.length ? n[1] : n[0]), 1 < i.length && (t.start.offset = CSS.percent(i[0]), t.end.offset = CSS.percent(i[1])), t;
  }
  !function () {
    var e,
      n = new WeakMap(),
      r = function () {
        function e(e, t, i, r) {
          for (var a, s = n.set, o = [], l = 0; l < e.length; l++) o[l] = "number" == typeof (a = e[l]) ? new CSSUnitValue(a, "number") : a;
          s.call(n, this, {
            values: o,
            operator: t,
            name: i || t,
            delimiter: r || ", "
          });
        }
        return e.prototype.toString = function () {
          var e = n.get(this);
          return e.name + "(" + e.values.join(e.delimiter) + ")";
        }, t(e, [{
          key: "operator",
          get: function () {
            return n.get(this).operator;
          }
        }, {
          key: "values",
          get: function () {
            return n.get(this).values;
          }
        }]), e;
      }();
    if ((e = {
      CSSUnitValue: function () {
        function e(e, t) {
          n.set(this, {
            value: e,
            unit: t
          });
        }
        return e.prototype.toString = function () {
          var e = n.get(this),
            t = "" + e.value;
          e: switch (e = e.unit, e) {
            case "percent":
              e = "%";
              break e;
            case "number":
              e = "";
              break e;
            default:
              e = e.toLowerCase();
          }
          return t + e;
        }, t(e, [{
          key: "value",
          get: function () {
            return n.get(this).value;
          },
          set: function (e) {
            n.get(this).value = e;
          }
        }, {
          key: "unit",
          get: function () {
            return n.get(this).unit;
          }
        }]), e;
      }(),
      CSSKeywordValue: function () {
        function e(e) {
          this.value = e;
        }
        return e.prototype.toString = function () {
          return this.value.toString();
        }, e;
      }(),
      CSSMathSum: function (e) {
        function t(t) {
          return e.call(this, arguments, "sum", "calc", " + ") || this;
        }
        return i(t, e), t;
      }(r),
      CSSMathProduct: function (e) {
        function t(t) {
          return e.call(this, arguments, "product", "calc", " * ") || this;
        }
        return i(t, e), t;
      }(r),
      CSSMathNegate: function (e) {
        function t(t) {
          return e.call(this, [t], "negate", "-") || this;
        }
        return i(t, e), t;
      }(r)
    }).CSSMathNegate = function (e) {
      function t(t) {
        return e.call(this, [1, t], "invert", "calc", " / ") || this;
      }
      return i(t, e), t;
    }(r), e.CSSMathMax = function (e) {
      function t() {
        return e.call(this, arguments, "max") || this;
      }
      return i(t, e), t;
    }(r), e.CSSMathMin = function (e) {
      function t() {
        return e.call(this, arguments, "min") || this;
      }
      return i(t, e), t;
    }(r), r = e, !window.CSS && !Reflect.defineProperty(window, "CSS", {
      value: {}
    })) throw Error("Error installing CSSOM support");
    for (var a in window.CSSUnitValue || "number percent em ex px cm mm in pt pc Q vw vh vmin vmax rems ch deg rad grad turn ms s Hz kHz dppx dpi dpcm fr".split(" ").forEach(e => {
      if (!Reflect.defineProperty(CSS, e, {
        value: t => new CSSUnitValue(t, e)
      })) throw Error("Error installing CSS." + e);
    }), r) if (!(a in window) && !Reflect.defineProperty(window, a, {
      value: r[a]
    })) throw Error("Error installing CSSOM support for " + a);
  }(), new CSSKeywordValue("auto");
  var U = new WeakMap(),
    Q = function () {
      function e(e) {
        U.set(this, {
          source: null,
          orientation: "block",
          anonymousSource: e ? e.anonymousSource : null,
          anonymousTarget: e ? e.anonymousTarget : null,
          subject: null,
          inset: e ? e.inset : null,
          animations: [],
          scrollListener: null
        }), m(this, e && void 0 !== e.source ? e.source : document.scrollingElement), this.orientation = e && e.orientation || "block", l(this);
      }
      return t(e, [{
        key: "source",
        get: function () {
          return U.get(this).source;
        },
        set: function (e) {
          m(this, e), l(this);
        }
      }, {
        key: "orientation",
        get: function () {
          return U.get(this).orientation;
        },
        set: function (e) {
          if (-1 === ["block", "inline", "horizontal", "vertical"].indexOf(e)) throw TypeError("Invalid orientation");
          U.get(this).orientation = e, l(this);
        }
      }, {
        key: "duration",
        get: () => CSS.percent(100)
      }, {
        key: "phase",
        get: function () {
          var e = this.source;
          if (!e) return "inactive";
          var t = getComputedStyle(e);
          return "none" == t.display ? "inactive" : e == document.scrollingElement || "visible" != t.overflow && "clip" != t.overflow ? "active" : "inactive";
        }
      }, {
        key: "currentTime",
        get: function () {
          var e = this.source;
          if (!e || "inactive" == this.phase) return null;
          var t = this.orientation,
            n = u(e, t),
            i = "horizontal-tb" == getComputedStyle(e).writingMode;
          return "block" === t ? t = i ? "vertical" : "horizontal" : "inline" === t && (t = i ? "horizontal" : "vertical"), 0 < (e = "vertical" === t ? e.scrollHeight - e.clientHeight : "horizontal" === t ? e.scrollWidth - e.clientWidth : void 0) ? CSS.percent(100 * n / e) : CSS.percent(100);
        }
      }, {
        key: "__polyfill",
        get: () => !0
      }]), e;
    }(),
    F = function (e) {
      function n(t) {
        var n;
        return t.axis && (t.orientation = t.axis), n = e.call(this, t) || this, U.get(a(n)).subject = t && t.subject ? t.subject : void 0, c(a(n)), l(a(n)), n;
      }
      return i(n, e), t(n, [{
        key: "source",
        get: function () {
          return c(this), U.get(this).source;
        },
        set: () => {
          throw Error("Cannot set the source of a view timeline");
        }
      }, {
        key: "subject",
        get: function () {
          return U.get(this).subject;
        }
      }, {
        key: "axis",
        get: function () {
          return U.get(this).orientation;
        }
      }, {
        key: "currentTime",
        get: function () {
          var e = u(this.source, this.orientation);
          if (null == e) return null;
          var t = b(this, "cover");
          return t ? CSS.percent((e - t.start) / (t.end - t.start) * 100) : null;
        }
      }]), n;
    }(Q),
    B = window.Element.prototype.animate,
    Y = window.Animation,
    H = ["enter", "exit", "cover", "contain"],
    K = function () {
      function e() {
        var e = this;
        this.state = "pending", this.nativeResolve = this.nativeReject = null, this.promise = new Promise((t, n) => {
          e.nativeResolve = t, e.nativeReject = n;
        });
      }
      var t = e.prototype;
      return t.resolve = function (e) {
        this.state = "resolved", this.nativeResolve(e);
      }, t.reject = function (e) {
        this.state = "rejected", this.promise.catch(() => {}), this.nativeReject(e);
      }, e;
    }(),
    $ = new WeakMap(),
    G = function () {
      function e(e, t, n) {
        void 0 === n && (n = {}), e = e instanceof Y ? e : new Y(e, i);
        var i = t instanceof Q,
          r = $,
          a = r.set;
        if (t instanceof ViewTimeline) {
          var s = z(n["animation-time-range"]);
          n["animation-delay"] && (s.start = D(n["animation-delay"], CSS.percent(0))), n["animation-end-delay"] && (s.end = D(n["animation-end-delay"], CSS.percent(100))), n = s;
        } else n = null;
        a.call(r, this, {
          animation: e,
          timeline: i ? t : void 0,
          playState: i ? "idle" : null,
          readyPromise: null,
          finishedPromise: null,
          startTime: null,
          holdTime: null,
          previousCurrentTime: null,
          resetCurrentTimeOnResume: !1,
          pendingPlaybackRate: null,
          pendingTask: null,
          specifiedTiming: null,
          normalizedTiming: null,
          effect: null,
          timeRange: n,
          proxy: this
        });
      }
      var n = e.prototype;
      return n.finish = function () {
        var e = $.get(this);
        if (e.timeline) {
          var t = R(e),
            n = O(e);
          if (0 == t) throw new DOMException("Cannot finish Animation with a playbackRate of 0.", "InvalidStateError");
          if (0 < t && 1 / 0 == n) throw new DOMException("Cannot finish Animation with an infinite target effect end.", "InvalidStateError");
          M(e), t = 0 > t ? 0 : n, this.currentTime = E(e, t), n = P(e, e.timeline.currentTime), null === e.startTime && null !== n && (e.startTime = n - t / e.animation.playbackRate), "pause" == e.pendingTask && null !== e.startTime && (e.holdTime = null, e.pendingTask = null, e.readyPromise.resolve(this)), "play" == e.pendingTask && null !== e.startTime && (e.pendingTask = null, e.readyPromise.resolve(this)), A(e, !0, !0);
        } else e.animation.finish();
      }, n.play = function () {
        var e = $.get(this);
        e.timeline ? V(e, !0) : e.animation.play();
      }, n.pause = function () {
        var e = $.get(this);
        if (e.timeline) {
          if ("paused" != this.playState) {
            var t = null,
              n = e.animation.playbackRate,
              i = O(e);
            if (null === e.animation.currentTime) if (0 <= n) t = 0;else {
              if (1 / 0 == i) return void e.animation.pause();
              t = i;
            }
            null !== t && (e.startTime = t), "play" == e.pendingTask ? e.pendingTask = null : e.readyPromise = null, e.readyPromise || _(e), e.pendingTask = "pause";
          }
        } else e.animation.pause();
      }, n.reverse = function () {
        var e = $.get(this),
          t = R(e),
          n = e.resetCurrentTimeOnResume ? null : P(e, this.currentTime),
          i = 1 / 0 == O(e);
        if (n = 0 != t && (0 > t || 0 < n || !i), !e.timeline || !n) return n && (e.pendingPlaybackRate = -R(e)), void e.animation.reverse();
        if ("inactive" == e.timeline.phase) throw new DOMException("Cannot reverse an animation with no active timeline", "InvalidStateError");
        this.updatePlaybackRate(-t), V(e, !0);
      }, n.updatePlaybackRate = function (e) {
        var t = $.get(this);
        if (t.pendingPlaybackRate = e, t.timeline) {
          if (!t.readyPromise || "pending" != t.readyPromise.state) switch (this.playState) {
            case "idle":
            case "paused":
              M(t);
              break;
            case "finished":
              var n = P(t, t.timeline.currentTime),
                i = null !== n ? (n - t.startTime) * t.animation.playbackRate : null;
              t.startTime = 0 == e ? n : null != n && null != i ? (n - i) / e : null, M(t), A(t, !1, !1), j(t);
              break;
            default:
              V(t, !1);
          }
        } else t.animation.updatePlaybackRate(e);
      }, n.persist = function () {
        $.get(this).animation.persist();
      }, n.cancel = function () {
        var e = $.get(this);
        e.timeline ? ("idle" != this.playState && (e.pendingTask && (e.pendingTask = null, M(e), e.readyPromise.reject(x()), _(e), e.readyPromise.resolve(e.proxy)), e.finishedPromise && "pending" == e.finishedPromise.state && e.finishedPromise.reject(x()), e.finishedPromise = new K(), e.animation.cancel()), e.startTime = null, e.holdTime = null, h(e.timeline, e.animation)) : e.animation.cancel();
      }, n.addEventListener = function (e, t, n) {
        $.get(this).animation.addEventListener(e, t, n);
      }, n.removeEventListener = function (e, t, n) {
        $.get(this).animation.removeEventListener(e, t, n);
      }, n.dispatchEvent = function (e) {
        $.get(this).animation.dispatchEvent(e);
      }, t(e, [{
        key: "effect",
        get: function () {
          var e,
            t,
            n,
            i,
            r = $.get(this);
          return r.timeline ? (r.effect || (r.effect = (t = (e = r).animation.effect, n = t.updateTiming, (i = new Proxy(t, {
            get: (e, n) => "function" == typeof (e = e[n]) ? e.bind(t) : e,
            set: (e, t, n) => (e[t] = n, !0)
          })).getComputedTiming = new Proxy(t.getComputedTiming, {
            apply: n => {
              if (t.getTiming(), n = n.apply(t), e.timeline) {
                n.localTime = E(e, n.localTime), n.endTime = E(e, n.endTime), n.activeDuration = E(e, n.activeDuration);
                var i = O(e);
                n.duration = i ? CSS.percent(100 * (n.iterations ? (i - n.delay - n.endDelay) / n.iterations : 0) / i) : CSS.percent(0), void 0 === e.timeline.currentTime && (n.localTime = null);
              }
              return n;
            }
          }), i.getTiming = new Proxy(t.getTiming, {
            apply: i => {
              if (e.specifiedTiming) return e.specifiedTiming;
              var r, a;
              e.specifiedTiming = i.apply(t), i = Object.assign({}, e.specifiedTiming);
              var s = !1;
              return e.timeline instanceof ViewTimeline && (r = (e => {
                if (!(e.timeline instanceof ViewTimeline)) return 0;
                var t = e.timeRange.start;
                return w(e.timeline, t.name, t.offset);
              })(e), a = (e => {
                if (!(e.timeline instanceof ViewTimeline)) return 0;
                var t = e.timeRange.end;
                return 1 - w(e.timeline, t.name, t.offset);
              })(e), s = !0), (null === i.duration || "auto" === i.duration || s) && e.timeline && (s ? (i.delay = 1e5 * r, i.endDelay = 1e5 * a) : (i.delay = 0, i.endDelay = 0), i.duration = i.iterations ? ((i.iterations ? 1e5 : 0) - i.delay - i.endDelay) / i.iterations : 0, n.apply(t, [i])), e.normalizedTiming = i, e.specifiedTiming;
            }
          }), i.updateTiming = new Proxy(t.updateTiming, {
            apply: (n, i, r) => {
              if (e.timeline) {
                if (1 / 0 === (i = r[0]).duration) throw TypeError("Effect duration cannot be Infinity when used with Scroll Timelines");
                if (1 / 0 === i.iterations) throw TypeError("Effect iterations cannot be Infinity when used with Scroll Timelines");
              }
              e.specifiedTiming && n.apply(t, [e.specifiedTiming]), n.apply(t, r), e.specifiedTiming = null;
            }
          }), i)), r.effect) : r.animation.effect;
        },
        set: function (e) {
          $.get(this).animation.effect = e, details.effect = null;
        }
      }, {
        key: "timeline",
        get: function () {
          var e = $.get(this);
          return e.timeline || e.animation.timeline;
        },
        set: function (e) {
          var t = this.timeline;
          if (t != e) {
            var n = this.playState,
              i = this.currentTime,
              r = $.get(this),
              a = O(r);
            a = 0 < a ? P(r, i) / a : 0;
            var s = t instanceof Q,
              o = e instanceof Q;
            if (r.resetCurrentTimeOnResume = !1, t = this.pending, s && h(r.timeline, r.animation), o) {
              switch (r.timeline = e, M(r), e = 0 <= r.animation.playbackRate ? 0 : O(r), n) {
                case "running":
                case "finished":
                  r.startTime = e, d(r.timeline, r.animation, q.bind(this));
                  break;
                case "paused":
                  r.resetCurrentTimeOnResume = !0, r.startTime = null, r.holdTime = P(r, CSS.percent(100 * a));
                  break;
                default:
                  r.holdTime = null, r.startTime = null;
              }
              return t && (r.readyPromise && "resolved" != r.readyPromise.state || _(r), r.pendingTask = "paused" == n ? "pause" : "play"), null !== r.startTime && (r.holdTime = null), void A(r, !1, !1);
            }
            if (r.animation.timeline != e) throw TypeError("Unsupported timeline: " + e);
            if (h(r.timeline, r.animation), r.timeline = null, s) switch (null !== i && (r.animation.currentTime = a * O(r)), n) {
              case "paused":
                r.animation.pause();
                break;
              case "running":
              case "finished":
                r.animation.play();
            }
          }
        }
      }, {
        key: "startTime",
        get: function () {
          var e = $.get(this);
          return e.timeline ? E(e, e.startTime) : e.animation.startTime;
        },
        set: function (e) {
          var t = $.get(this);
          if (e = P(t, e), t.timeline) {
            null == P(t, t.timeline.currentTime) && null != t.startTime && (t.holdTime = null, j(t));
            var n = P(t, this.currentTime);
            M(t), t.startTime = e, t.resetCurrentTimeOnResume = !1, t.holdTime = null !== t.startTime && 0 != t.animation.playbackRate ? null : n, t.pendingTask && (t.pendingTask = null, t.readyPromise.resolve(this)), A(t, !0, !1), j(t);
          } else t.animation.startTime = e;
        }
      }, {
        key: "currentTime",
        get: function () {
          var e = $.get(this);
          return e.timeline ? E(e, null != e.holdTime ? e.holdTime : I(e)) : e.animation.currentTime;
        },
        set: function (e) {
          var t = $.get(this);
          if (e = P(t, e), t.timeline && null != e) {
            var n = t.timeline.phase;
            null !== t.holdTime || null === t.startTime || "inactive" == n || 0 == t.animation.playbackRate ? t.holdTime = e : t.startTime = L(t, e), t.resetCurrentTimeOnResume = !1, "inactive" == n && (t.startTime = null), t.previousCurrentTime = null, "pause" == t.pendingTask && (t.holdTime = e, M(t), t.startTime = null, t.pendingTask = null, t.readyPromise.resolve(this)), A(t, !0, !1);
          } else t.animation.currentTime = e;
        }
      }, {
        key: "playbackRate",
        get: function () {
          return $.get(this).animation.playbackRate;
        },
        set: function (e) {
          var t = $.get(this);
          if (t.timeline) {
            t.pendingPlaybackRate = null;
            var n = this.currentTime;
            t.animation.playbackRate = e, null !== n && (this.currentTime = n);
          } else t.animation.playbackRate = e;
        }
      }, {
        key: "playState",
        get: function () {
          var e = $.get(this);
          if (!e.timeline) return e.animation.playState;
          var t = P(e, this.currentTime);
          return null === t && null === e.startTime && null == e.pendingTask ? "idle" : "pause" == e.pendingTask || null === e.startTime && "play" != e.pendingTask ? "paused" : null != t && (0 < e.animation.playbackRate && t >= O(e) || 0 > e.animation.playbackRate && 0 >= t) ? "finished" : "running";
        }
      }, {
        key: "replaceState",
        get: function () {
          return $.get(this).animation.pending;
        }
      }, {
        key: "pending",
        get: function () {
          var e = $.get(this);
          return e.timeline ? !!e.readyPromise && "pending" == e.readyPromise.state : e.animation.pending;
        }
      }, {
        key: "id",
        get: function () {
          return $.get(this).animation.id;
        }
      }, {
        key: "onfinish",
        get: function () {
          return $.get(this).animation.onfinish;
        },
        set: function (e) {
          $.get(this).animation.onfinish = e;
        }
      }, {
        key: "oncancel",
        get: function () {
          return $.get(this).animation.oncancel;
        },
        set: function (e) {
          $.get(this).animation.oncancel = e;
        }
      }, {
        key: "onremove",
        get: function () {
          return $.get(this).animation.onremove;
        },
        set: function (e) {
          $.get(this).animation.onremove = e;
        }
      }, {
        key: "finished",
        get: function () {
          var e = $.get(this);
          return e.timeline ? (e.finishedPromise || (e.finishedPromise = new K()), e.finishedPromise.promise) : e.animation.finished;
        }
      }, {
        key: "ready",
        get: function () {
          var e = $.get(this);
          return e.timeline ? (e.readyPromise || (e.readyPromise = new K(), e.readyPromise.resolve(this)), e.readyPromise.promise) : e.animation.ready;
        }
      }]), e;
    }(),
    X = /[\w\\@_-]+/g,
    J = /\s*/g,
    Z = /^[0-9]+(s|ms)/,
    ee = /scroll-timeline\s*:([^;}]+)/,
    te = /scroll-timeline-name\s*:([^;}]+)/,
    ne = /scroll-timeline-axis\s*:([^;}]+)/,
    ie = /view-timeline\s*:([^;}]+)/,
    re = /view-timeline-name\s*:([^;}]+)/,
    ae = /view-timeline-axis\s*:([^;}]+)/,
    se = /view-timeline-inset\s*:([^;}]+)/,
    oe = /animation-timeline\s*:([^;}]+)/,
    le = /animation-delay\s*:([^;}]+)/,
    ue = /animation-end-delay\s*:([^;}]+)/,
    ce = /animation-time-range\s*:([^;}]+)/,
    me = /animation-name\s*:([^;}]+)/,
    he = /animation\s*:([^;}]+)/,
    de = /scroll\(([^)]*)\)/,
    fe = ["block", "inline", "vertical", "horizontal"],
    pe = ["nearest", "root"],
    ye = new (function () {
      function e() {
        this.cssRulesWithTimelineName = [], this.nextAnonymousTimelineNameIndex = 0, this.anonymousScrollTimelineOptions = new Map(), this.sourceSelectorToScrollTimeline = [], this.subjectSelectorToViewTimeline = [], this.keyframeNamesSelectors = new Map();
      }
      var t = e.prototype;
      return t.transpileStyleSheet = function (e, t, n) {
        for (e = {
          sheetSrc: e,
          index: 0,
          name: n
        }; e.index < e.sheetSrc.length && (this.eatWhitespace(e), !(e.index >= e.sheetSrc.length));) if (this.lookAhead("/*", e)) for (; this.lookAhead("/*", e);) this.eatComment(e), this.eatWhitespace(e);else (n = this.parseQualifiedRule(e)) && (t ? this.parseKeyframesAndSaveNameMapping(n, e) : this.handleScrollTimelineProps(n, e));
        return e.sheetSrc;
      }, t.getAnimationTimelineOptions = function (e, t) {
        for (var n = this.cssRulesWithTimelineName.length - 1; 0 <= n; n--) {
          var i = this.cssRulesWithTimelineName[n];
          if (t.matches(i.selector) && (!i["animation-name"] || i["animation-name"] == e)) return {
            "animation-timeline": i["animation-timeline"],
            "animation-delay": i["animation-delay"],
            "animation-end-delay": i["animation-end-delay"],
            "animation-time-range": i["animation-time-range"]
          };
        }
        return null;
      }, t.getAnonymousScrollTimelineOptions = function (e, t) {
        return (e = this.anonymousScrollTimelineOptions.get(e)) ? {
          anonymousSource: e.source,
          anonymousTarget: t,
          source: "root" == e.source ? document.scrollingElement : T(t),
          orientation: e.orientation ? e.orientation : "block"
        } : null;
      }, t.getScrollTimelineOptions = function (e, t) {
        var i = this.getAnonymousScrollTimelineOptions(e, t);
        if (i) return i;
        for (i = this.sourceSelectorToScrollTimeline.length - 1; 0 <= i; i--) {
          var r = this.sourceSelectorToScrollTimeline[i];
          if (r.name == e) {
            var a = this.findPreviousSiblingOrAncestorMatchingSelector(t, r.selector);
            if (a) return n({
              source: a
            }, r.axis ? {
              orientation: r.axis
            } : {});
          }
        }
        return null;
      }, t.findPreviousSiblingOrAncestorMatchingSelector = (e, t) => {
        for (; e;) {
          if (e.matches(t)) return e;
          e = e.previousElementSibling || e.parentElement;
        }
        return null;
      }, t.getViewTimelineOptions = function (e, t) {
        for (var n = this.subjectSelectorToViewTimeline.length - 1; 0 <= n; n--) {
          var i = this.subjectSelectorToViewTimeline[n];
          if (i.name == e) {
            var r = this.findPreviousSiblingOrAncestorMatchingSelector(t, i.selector);
            if (r) return {
              subject: r,
              axis: i.axis,
              inset: i.inset
            };
          }
        }
        return null;
      }, t.parseScrollTimeline = function (e) {
        var t = e.index;
        this.assertString(e, "@scroll-timeline"), this.eatWhitespace(e);
        var n = this.parseIdentifier(e);
        for (this.eatWhitespace(e), this.assertString(e, "{"), this.eatWhitespace(e), n = {
          name: n,
          source: "auto",
          orientation: void 0
        }; "}" !== this.peek(e);) {
          var i = this.parseIdentifier(e);
          this.eatWhitespace(e), this.assertString(e, ":"), this.eatWhitespace(e), n[i] = this.removeEnclosingDoubleQuotes(this.eatUntil(";", e)), this.assertString(e, ";"), this.eatWhitespace(e);
        }
        return this.assertString(e, "}"), i = e.index, this.eatWhitespace(e), {
          scrollTimeline: n,
          startIndex: t,
          endIndex: i
        };
      }, t.handleScrollTimelineProps = function (e, t) {
        var n = this;
        if (!e.selector.includes("@keyframes")) {
          var i = e.block.contents.includes("animation-name:"),
            r = e.block.contents.includes("animation-timeline:"),
            a = e.block.contents.includes("animation:");
          this.saveSourceSelectorToScrollTimeline(e), this.saveSubjectSelectorToViewTimeline(e);
          var s = [],
            o = [],
            l = !1;
          r && (s = this.extractScrollTimelineNames(e.block.contents)), i && (o = this.extractMatches(e.block.contents, me)), r && i || (a && this.extractMatches(e.block.contents, he).forEach(t => {
            var i = n.extractTimelineName(t);
            i.timelineName && s.push(i.timelineName);
            var a = n.extractAnimationName(t);
            a && (i.timelineName || r) && o.push(a), (i.timelineName || r) && (n.hasDuration(t) || (e.block.contents = e.block.contents.replace(t, " 1s " + t), l = !0)), i.toBeReplaced && (e.block.contents = e.block.contents.replace(i.toBeReplaced, " ".repeat(i.toBeReplaced.length)), l = !0);
          }), l && this.replacePart(e.block.startIndex, e.block.endIndex, e.block.contents, t)), this.saveRelationInList(e, s, o);
        }
      }, t.saveSourceSelectorToScrollTimeline = function (e) {
        var t,
          n = e.block.contents.includes("scroll-timeline:"),
          i = e.block.contents.includes("scroll-timeline-name:"),
          r = e.block.contents.includes("scroll-timeline-axis:");
        if (n || i) {
          var a,
            s = [];
          if (n) for (n = o(this.extractMatches(e.block.contents, ee)); !(a = n()).done;) parts = this.split(a.value), a = {
            selector: e.selector,
            name: ""
          }, 1 == parts.length ? a.name = parts[0] : 2 == parts.length && (fe.includes(parts[0]) ? (a.axis = parts[0], a.name = parts[1]) : (a.axis = parts[1], a.name = parts[0])), s.push(a);
          if (i) for (i = this.extractMatches(e.block.contents, te), n = 0; n < i.length; n++) n < s.length ? s[n].name = i[n] : s.push({
            selector: e.selector,
            name: i[n]
          });
          for (i = [], r && (i = (i = this.extractMatches(e.block.contents, ne)).filter(e => fe.includes(e))), e = 0; e < s.length; e++) i.length && (s[e].axis = i[e % s.length]);
          (t = this.sourceSelectorToScrollTimeline).push.apply(t, s);
        }
      }, t.saveSubjectSelectorToViewTimeline = function (e) {
        var t,
          n = e.block.contents.includes("view-timeline:"),
          i = e.block.contents.includes("view-timeline-name:"),
          r = e.block.contents.includes("view-timeline-axis:"),
          a = e.block.contents.includes("view-timeline-inset:");
        if (n || i) {
          var s,
            l = [];
          if (n) for (n = o(this.extractMatches(e.block.contents, ie)); !(s = n()).done;) parts = this.split(s.value), s = {
            selector: e.selector,
            name: "",
            inset: null
          }, 1 == parts.length ? s.name = parts[0] : 2 == parts.length && (fe.includes(parts[0]) ? (s.axis = parts[0], s.name = parts[1]) : (s.axis = parts[1], s.name = parts[0])), l.push(s);
          if (i) for (i = this.extractMatches(e.block.contents, re), n = 0; n < i.length; n++) n < l.length ? l[n].name = i[n] : l.push({
            selector: e.selector,
            name: i[n],
            inset: null
          });
          for (i = [], n = [], a && (i = this.extractMatches(e.block.contents, se)), r && (n = (n = this.extractMatches(e.block.contents, ae)).filter(e => fe.includes(e))), e = 0; e < l.length; e++) i.length && (l[e].inset = i[e % l.length]), n.length && (l[e].axis = n[e % l.length]);
          (t = this.subjectSelectorToViewTimeline).push.apply(t, l);
        }
      }, t.hasDuration = e => 1 <= e.split(" ").filter(e => Z.exec(e)).length, t.saveRelationInList = function (e, t, i) {
        var r = e.block.contents.includes("animation-delay:"),
          a = e.block.contents.includes("animation-end-delay:"),
          s = e.block.contents.includes("animation-time-range:"),
          o = [],
          l = [],
          u = [];
        for (r && (o = this.extractMatches(e.block.contents, le)), a && (l = this.extractMatches(e.block.contents, ue)), s && (u = this.extractMatches(e.block.contents, ce)), r = Math.max(t.length, i.length, o.length, l.length, u.length), a = 0; a < r; a++) this.cssRulesWithTimelineName.push(n({
          selector: e.selector,
          "animation-timeline": t[a % t.length]
        }, i.length ? {
          "animation-name": i[a % i.length]
        } : {}, o.length ? {
          "animation-delay": o[a % o.length]
        } : {}, l.length ? {
          "animation-end-delay": l[a % l.length]
        } : {}, u.length ? {
          "animation-time-range": u[a % u.length]
        } : {}));
      }, t.extractScrollTimelineNames = function (e) {
        var t = this,
          n = [];
        return oe.exec(e)[1].trim().split(",").map(e => e.trim()).forEach(e => {
          e.startsWith("scroll") && e.includes("(") ? (e = t.saveAnonymousTimelineName(e), n.push(e)) : n.push(e);
        }), n;
      }, t.saveAnonymousTimelineName = function (e) {
        var t = ":t" + this.nextAnonymousTimelineNameIndex++;
        return this.anonymousScrollTimelineOptions.set(t, this.parseAnonymousTimeline(e)), t;
      }, t.parseAnonymousTimeline = e => {
        if (!(e = de.exec(e))) return null;
        var t = {};
        return e[1].split(" ").forEach(e => {
          fe.includes(e) ? t.orientation = e : pe.includes(e) && (t.source = e);
        }), t;
      }, t.extractAnimationName = function (e) {
        return this.findMatchingEntryInContainer(e, this.keyframeNamesSelectors);
      }, t.extractTimelineName = function (e) {
        var t = null,
          n = null;
        return (t = de.exec(e)) ? (e = t[0], t = this.saveAnonymousTimelineName(e), n = e) : n = t = this.findMatchingEntryInContainer(e, new Set(this.sourceSelectorToScrollTimeline.map(e => e.name))) || this.findMatchingEntryInContainer(e, new Set(this.subjectSelectorToViewTimeline.map(e => e.name))), {
          timelineName: t,
          toBeReplaced: n
        };
      }, t.findMatchingEntryInContainer = (e, t) => (e = e.split(" ").filter(e => t.has(e))) ? e[0] : null, t.parseIdentifier = function (e) {
        X.lastIndex = e.index;
        var t = X.exec(e.sheetSrc);
        if (!t) throw this.parseError(e, "Expected an identifier");
        return e.index += t[0].length, t[0];
      }, t.parseKeyframesAndSaveNameMapping = function (e, t) {
        var n = this;
        if (e.selector.startsWith("@keyframes")) {
          var i = this.replaceKeyframesAndGetMapping(e, t);
          e.selector.split(" ").forEach((e, t) => {
            0 < t && n.keyframeNamesSelectors.set(e, i);
          });
        }
      }, t.replaceKeyframesAndGetMapping = function (e, t) {
        function n(e) {
          var t = [];
          i.substring(r[e].start, r[e].end).split(",").forEach(e => {
            var n = e.split(" ").map(e => e.trim()).filter(e => "" != e).join(" ");
            e = a.size, a.set(e, n), t.push(e + "%"), H.some(e => n.startsWith(e)) && (s = !0);
          }), o.push(t.join(",")), o.push(e == r.length - 1 ? i.substring(r[e].end) : i.substring(r[e].end, r[e + 1].start));
        }
        var i = e.block.contents,
          r = (e => {
            for (var t = 0, n = -1, i = [], r = 0; r < e.length; r++) "{" == e[r] ? t++ : "}" == e[r] && t--, 1 == t && "{" != e[r] && "}" != e[r] && -1 == n && (n = r), 2 == t && "{" == e[r] && (i.push({
              start: n,
              end: r
            }), n = -1);
            return i;
          })(i);
        if (0 == r.length) return new Map();
        var a = new Map(),
          s = !1,
          o = [];
        o.push(i.substring(0, r[0].start));
        for (var l = 0; l < r.length; l++) n(l);
        return s ? (e.block.contents = o.join(""), this.replacePart(e.block.startIndex, e.block.endIndex, e.block.contents, t), a) : new Map();
      }, t.parseQualifiedRule = function (e) {
        var t = e.index,
          n = this.parseSelector(e).trim();
        if (n) return {
          selector: n,
          block: this.eatBlock(e),
          startIndex: t,
          endIndex: e.index
        };
      }, t.removeEnclosingDoubleQuotes = e => e.substring('"' == e[0] ? 1 : 0, '"' == e[e.length - 1] ? e.length - 1 : e.length), t.assertString = function (e, t) {
        if (e.sheetSrc.substr(e.index, t.length) != t) throw this.parseError(e, "Did not find expected sequence " + t);
        e.index += t.length;
      }, t.replacePart = (e, t, n, i) => {
        i.sheetSrc = i.sheetSrc.slice(0, e) + n + i.sheetSrc.slice(t), i.index >= t && (i.index = e + n.length + (i.index - t));
      }, t.eatComment = function (e) {
        this.assertString(e, "/*"), this.eatUntil("*/", e, !0), this.assertString(e, "*/");
      }, t.eatBlock = function (e) {
        var t = e.index;
        this.assertString(e, "{");
        for (var n = 1; 0 != n;) this.lookAhead("/*", e) ? this.eatComment(e) : ("{" === e.sheetSrc[e.index] ? n++ : "}" === e.sheetSrc[e.index] && n--, this.advance(e));
        return {
          startIndex: t,
          endIndex: n = e.index,
          contents: e.sheetSrc.slice(t, n)
        };
      }, t.advance = function (e) {
        if (e.index++, e.index > e.sheetSrc.length) throw this.parseError(e, "Advanced beyond the end");
      }, t.eatUntil = function (e, t, n) {
        void 0 === n && (n = !1);
        for (var i = t.index; !this.lookAhead(e, t);) this.advance(t);
        return n && (t.sheetSrc = t.sheetSrc.slice(0, i) + " ".repeat(t.index - i) + t.sheetSrc.slice(t.index)), t.sheetSrc.slice(i, t.index);
      }, t.parseSelector = function (e) {
        var t = e.index;
        if (this.eatUntil("{", e), t === e.index) throw Error("Empty selector");
        return e.sheetSrc.slice(t, e.index);
      }, t.eatWhitespace = e => {
        J.lastIndex = e.index;
        var t = J.exec(e.sheetSrc);
        t && (e.index += t[0].length);
      }, t.lookAhead = (e, t) => t.sheetSrc.substr(t.index, e.length) == e, t.peek = e => e.sheetSrc[e.index], t.extractMatches = (e, t, n) => (void 0 === n && (n = ","), t.exec(e)[1].trim().split(n).map(e => e.trim())), t.split = e => e.split(" ").map(e => e.trim()).filter(e => "" != e), e;
    }())();
  if ((() => {
    if (!CSS.supports("animation-timeline: works")) {
      (() => {
        function e(e) {
          if (0 !== e.innerHTML.trim().length) {
            var t = ye.transpileStyleSheet(e.innerHTML, !0);
            t = ye.transpileStyleSheet(t, !1), e.innerHTML = t;
          }
        }
        new MutationObserver(t => {
          var n;
          for (t = o(t); !(n = t()).done;) {
            var i;
            for (n = o(n.value.addedNodes); !(i = n()).done;) (i = i.value) instanceof HTMLStyleElement && e(i);
          }
        }).observe(document.documentElement, {
          childList: !0,
          subtree: !0
        }), document.querySelectorAll("style").forEach(t => e(t)), document.querySelectorAll("link").forEach(() => {});
      })();
      var e = new WeakMap();
      window.addEventListener("animationstart", t => {
        t.target.getAnimations().filter(e => e.animationName === t.animationName).forEach(n => {
          e.has(t.target) || e.set(t.target, new Map());
          var i = e.get(t.target);
          if (!i.has(n.animationName)) {
            var r = ((e, t, n) => {
              if (!(t = ye.getAnimationTimelineOptions(t, n))) return null;
              var i = t["animation-timeline"];
              return i && (n = ye.getScrollTimelineOptions(i, n) || ye.getViewTimelineOptions(i, n)) ? (n.subject && ((e, t) => {
                var n = T(t.subject),
                  i = t.axis || t.orientation,
                  r = ye.keyframeNamesSelectors.get(e.animationName);
                if (r && r.size) {
                  var a = [];
                  e.effect.getKeyframes().forEach(e => {
                    for (var s, l = null, u = o(r); !(s = u()).done;) {
                      var c = (s = s.value)[1];
                      if (s[0] == 100 * e.offset) {
                        if ("from" == c) l = 0;else if ("to" == c) l = 100;else if (1 == (l = c.split(" ")).length) l = parseFloat(l[0]);else {
                          u = n, s = t.subject, c = i;
                          var m = t.inset,
                            h = CSS.percent(parseFloat(l[1]));
                          l = 100 * k(S(l[0], u, s, c, m), h, S("cover", u, s, c, m));
                        }
                        break;
                      }
                    }
                    null !== l && 0 <= l && 100 >= l && (e.offset = l / 100, a.push(e));
                  });
                  var s = a.sort((e, t) => e.offset < t.offset ? -1 : e.affset > t.offset ? 1 : 0);
                  e.effect.setKeyframes(s);
                }
              })(e, n), {
                timeline: n.source ? new Q(n) : new F(n),
                animOptions: t
              }) : null;
            })(n, n.animationName, t.target);
            i.set(n.animationName, r && r.timeline && n.timeline != r.timeline ? new G(n, r.timeline, r.animOptions) : null);
          }
          null !== (i = i.get(n.animationName)) && (n.pause(), i.play());
        });
      });
    }
  })(), [].concat(document.styleSheets).filter(e => null !== e.href).length, !Reflect.defineProperty(window, "ScrollTimeline", {
    value: Q
  })) throw Error("Error installing ScrollTimeline polyfill: could not attach ScrollTimeline to window");
  if (!Reflect.defineProperty(window, "ViewTimeline", {
    value: F
  })) throw Error("Error installing ViewTimeline polyfill: could not attach ViewTimeline to window");
  if (!Reflect.defineProperty(Element.prototype, "animate", {
    value: function (e, t) {
      function n(e, t) {
        t && (t.phase && (e.name = t.phase), t.percent && (e.offset = t.percent));
      }
      function i(e, t) {
        if (t in e) {
          var n = e[t];
          return "number" != typeof n ? (delete e[t], n) : null;
        }
      }
      var r = t.timeline;
      r instanceof Q && delete t.timeline;
      var a = i(t, "delay"),
        s = i(t, "endDelay"),
        o = B.apply(this, [e, t]);
      return e = new G(o, r), r instanceof Q && (o.pause(), r instanceof ViewTimeline && ((r = $.get(e)).timeRange = z(t.timeRange), n(r.timeRange.start, a), n(r.timeRange.end, s)), e.play()), e;
    }
  })) throw Error("Error installing ScrollTimeline polyfill: could not attach WAAPI's animate to DOM Element");
  if (!Reflect.defineProperty(window, "Animation", {
    value: G
  })) throw Error("Error installing Animation constructor.");
}(), e.prototype = Object.create(null), t.EventEmitter = t, t.usingDomains = !1, t.prototype.domain = void 0, t.prototype._events = void 0, t.prototype._maxListeners = void 0, t.defaultMaxListeners = 10, t.init = function () {
  this.domain = null, this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = new e(), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}, t.prototype.setMaxListeners = function (e) {
  if ("number" != typeof e || 0 > e || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
  return this._maxListeners = e, this;
}, t.prototype.getMaxListeners = function () {
  return void 0 === this._maxListeners ? t.defaultMaxListeners : this._maxListeners;
}, t.prototype.emit = function (e) {
  var t,
    n,
    i = "error" === e;
  if (t = this._events) i = i && null == t.error;else if (!i) return !1;
  var r = this.domain;
  if (i) {
    if (t = arguments[1], !r) {
      if (t instanceof Error) throw t;
      throw (r = Error('Uncaught, unspecified "error" event. (' + t + ")")).context = t, r;
    }
    return t || (t = Error('Uncaught, unspecified "error" event')), t.domainEmitter = this, t.domain = r, t.domainThrown = !1, r.emit("error", t), !1;
  }
  if (!(r = t[e])) return !1;
  t = "function" == typeof r;
  var s = arguments.length;
  switch (s) {
    case 1:
      if (t) r.call(this);else for (r = a(r, t = r.length), i = 0; i < t; ++i) r[i].call(this);
      break;
    case 2:
      if (i = arguments[1], t) r.call(this, i);else for (r = a(r, t = r.length), s = 0; s < t; ++s) r[s].call(this, i);
      break;
    case 3:
      if (i = arguments[1], s = arguments[2], t) r.call(this, i, s);else for (r = a(r, t = r.length), n = 0; n < t; ++n) r[n].call(this, i, s);
      break;
    case 4:
      if (i = arguments[1], s = arguments[2], n = arguments[3], t) r.call(this, i, s, n);else {
        r = a(r, t = r.length);
        for (var o = 0; o < t; ++o) r[o].call(this, i, s, n);
      }
      break;
    default:
      for (i = Array(s - 1), n = 1; n < s; n++) i[n - 1] = arguments[n];
      if (t) r.apply(this, i);else for (r = a(r, t = r.length), s = 0; s < t; ++s) r[s].apply(this, i);
  }
  return !0;
}, t.prototype.addListener = function (e, t) {
  return n(this, e, t, !1);
}, t.prototype.on = t.prototype.addListener, t.prototype.prependListener = function (e, t) {
  return n(this, e, t, !0);
}, t.prototype.once = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
  return this.on(e, i(this, e, t)), this;
}, t.prototype.prependOnceListener = function (e, t) {
  if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
  return this.prependListener(e, i(this, e, t)), this;
}, t.prototype.removeListener = function (t, n) {
  var i;
  if ("function" != typeof n) throw new TypeError('"listener" argument must be a function');
  var r = this._events;
  if (!r) return this;
  var a = r[t];
  if (!a) return this;
  if (a === n || a.listener && a.listener === n) 0 == --this._eventsCount ? this._events = new e() : (delete r[t], r.removeListener && this.emit("removeListener", t, a.listener || n));else if ("function" != typeof a) {
    var s = -1;
    for (i = a.length; 0 < i--;) if (a[i] === n || a[i].listener && a[i].listener === n) {
      var o = a[i].listener;
      s = i;
      break;
    }
    if (0 > s) return this;
    if (1 === a.length) {
      if (a[0] = void 0, 0 == --this._eventsCount) return this._events = new e(), this;
      delete r[t];
    } else {
      i = s + 1;
      for (var l = a.length; i < l; s += 1, i += 1) a[s] = a[i];
      a.pop();
    }
    r.removeListener && this.emit("removeListener", t, o || n);
  }
  return this;
}, t.prototype.off = function (e, t) {
  return this.removeListener(e, t);
}, t.prototype.removeAllListeners = function (t) {
  var n = this._events;
  if (!n) return this;
  if (!n.removeListener) return 0 === arguments.length ? (this._events = new e(), this._eventsCount = 0) : n[t] && (0 == --this._eventsCount ? this._events = new e() : delete n[t]), this;
  if (0 === arguments.length) {
    n = Object.keys(n);
    for (var i, r = 0; r < n.length; ++r) "removeListener" !== (i = n[r]) && this.removeAllListeners(i);
    return this.removeAllListeners("removeListener"), this._events = new e(), this._eventsCount = 0, this;
  }
  if ("function" == typeof (n = n[t])) this.removeListener(t, n);else if (n) do {
    this.removeListener(t, n[n.length - 1]);
  } while (n[0]);
  return this;
}, t.prototype.listeners = function (e) {
  var t = this._events;
  if (t) {
    if (e = t[e]) {
      if ("function" == typeof e) e = [e.listener || e];else {
        t = Array(e.length);
        for (var n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
        e = t;
      }
    } else e = [];
  } else e = [];
  return e;
}, t.listenerCount = (e, t) => "function" == typeof e.listenerCount ? e.listenerCount(t) : r.call(e, t), t.prototype.listenerCount = r, t.prototype.eventNames = function () {
  return 0 < this._eventsCount ? Reflect.ownKeys(this._events) : [];
};
class s {
  constructor() {
    this.emitter = new t();
  }
  on(e, t) {
    this.emitter.on(e, t);
  }
  off(e, t) {
    this.emitter.off(e, t);
  }
  emit(e, t) {
    this.emitter.emit(e, t);
  }
}
var o;
function l(e, t, n) {
  return new Promise((i, r) => {
    let a = document.createElement("script");
    a.async = !0, a.src = e;
    for (let [e, n] of Object.entries(t || {})) a.setAttribute(e, n);
    a.onload = () => {
      a.onerror = a.onload = null, i(a);
    }, a.onerror = () => {
      a.onerror = a.onload = null, r(Error(`Failed to load ${e}`));
    }, (n || document.head || document.getElementsByTagName("head")[0]).appendChild(a);
  });
}
o = l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
let u = {
  width: "100%",
  videoId: void 0,
  rel: 0,
  origin: location.origin,
  controls: 0,
  showinfo: 0,
  mute: 1,
  modestbranding: 1,
  enablejsapi: 1,
  autoplay: 1,
  loop: 1
};
class c {
  constructor() {
    let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1 / 0;
    this.capacity = e, this.events = new s(), this.storage = [];
  }
  enqueue(e) {
    if (this.size() === this.capacity) throw Error("Queue has reached max capacity, you cannot add more items");
    this.storage.push(e), this.events.emit("add", e);
  }
  dequeue() {
    let e = this.storage.shift();
    return this.events.emit("remove", e), 0 === this.size() && this.events.emit("empty", void 0), e;
  }
  size() {
    return this.storage.length;
  }
  get empty() {
    return 0 === this.size();
  }
}
let m = {
    "-1": "unstarted",
    0: "ended",
    1: "playing",
    2: "paused",
    3: "buffering",
    5: "cued"
  },
  h = 2,
  d = 5,
  f = 100,
  p = 101,
  y = 150,
  g = [];
let v = new class extends s {
    constructor(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      super(), this._queue = new c(), e = "string" == typeof e ? document.querySelector(e) : e, this._id = e.id ? e.id : e.id = "ytplayer-" + Math.random().toString(16).slice(2, 8), this._opts = Object.assign(u, t), this._videoId = null, this.destroyed = !1, this._api = null, this._autoplay = !1, this._player = null, this._ready = !1, this._interval = null, this._startInterval = this._startInterval.bind(this), this._stopInterval = this._stopInterval.bind(this), this.on("playing", this._startInterval), this.on("unstarted", this._stopInterval), this.on("ended", this._stopInterval), this.on("paused", this._stopInterval), this.on("buffering", this._stopInterval), this._loadIframeAPI((e, t) => {
        if (e) return this._destroy(Error("YouTube Iframe API failed to load"));
        this._api = t, this._videoId && this.load(this._videoId, this._autoplay, this._start);
      });
    }
    load(e) {
      let t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : !1;
      let n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var i;
      this.destroyed || (this._videoId = e, this._autoplay = t, this._start = n, this._api && (this._player ? this._ready && (null === (i = this.getVideoData()) || void 0 === i ? void 0 : i.video_id) !== e && (t ? this._player.loadVideoById(e, n) : this._player.cueVideoById(e, n)) : this._createPlayer(e)));
    }
    play() {
      this._ready ? this._player.playVideo() : this._queueCommand("play");
    }
    pause() {
      this._ready ? this._player.pauseVideo() : this._queueCommand("pause");
    }
    stop() {
      this._ready ? this._player.stopVideo() : this._queueCommand("stop");
    }
    seek(e) {
      this._ready ? this._player.seekTo(e, !0) : this._queueCommand("seek", e);
    }
    setVolume(e) {
      this._ready ? this._player.setVolume(e) : this._queueCommand("setVolume", e);
    }
    getVolume() {
      return this._ready && this._player.getVolume() || 0;
    }
    mute() {
      this._ready ? this._player.mute() : this._queueCommand("mute");
    }
    unMute() {
      this._ready ? this._player.unMute() : this._queueCommand("unMute");
    }
    isMuted() {
      return this._ready && this._player.isMuted() || !1;
    }
    setSize(e, t) {
      this._ready ? this._player.setSize(e, t) : this._queueCommand("setSize", e, t);
    }
    setPlaybackRate(e) {
      this._ready ? this._player.setPlaybackRate(e) : this._queueCommand("setPlaybackRate", e);
    }
    setPlaybackQuality(e) {
      this._ready ? this._player.setPlaybackQuality(e) : this._queueCommand("setPlaybackQuality", e);
    }
    getPlaybackRate() {
      return this._ready && this._player.getPlaybackRate() || 1;
    }
    getAvailablePlaybackRates() {
      return this._ready && this._player.getAvailablePlaybackRates() || [1];
    }
    getDuration() {
      return this._ready && this._player.getDuration() || 0;
    }
    getProgress() {
      return this._ready && this._player.getVideoLoadedFraction() || 0;
    }
    getState() {
      return this._ready && this._player.getPlayerState() || YT.PlayerState.UNSTARTED;
    }
    getCurrentTime() {
      return this._ready && this._player.getCurrentTime() || 0;
    }
    getIframe() {
      return this._ready && this._player.getIframe() || null;
    }
    getVideoData() {
      return this._ready && this._player.getVideoData() || null;
    }
    destroy() {
      this._destroy();
    }
    _destroy() {
      let e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.destroyed || (this.destroyed = !0, this._player && (this._player.stopVideo && this._player.stopVideo(), this._player.destroy()), this._player = this._api = this._opts = this._id = this._videoId = null, this._ready = !1, this._queue = null, this._stopInterval(), this.off("playing", this._startInterval), this.off("paused", this._stopInterval), this.off("buffering", this._stopInterval), this.off("unstarted", this._stopInterval), this.off("ended", this._stopInterval), e && this.emit("error", e));
    }
    _queueCommand(e) {
      for (var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        t[_key - 1] = arguments[_key];
      }
      this.destroyed || this._queue.enqueue([e, t]);
    }
    _flushQueue() {
      for (; !this._queue.empty;) {
        let e = this._queue.dequeue();
        this[e[0]].apply(this, e[1]);
      }
    }
    _loadIframeAPI(e) {
      if (window.YT && "function" == typeof window.YT.Player) return e(null, window.YT);
      g.push(e), Array.from(document.getElementsByTagName("script")).some(e => "https://www.youtube.com/iframe_api" === e.src) || o("https://www.youtube.com/iframe_api").catch(e => {
        for (; g.length;) g.shift()(e);
      });
      let t = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        for (t && "[object Function]" === {}.toString.call(t) && t(); g.length;) g.shift()(null, window.YT);
      };
    }
    _createPlayer(e) {
      if (!this.destroyed) {
        var t = this._opts,
          {
            width: n,
            height: i,
            host: r
          } = t;
        t = function (e, t) {
          var n,
            i = {};
          for (n in e) Object.prototype.hasOwnProperty.call(e, n) && 0 > t.indexOf(n) && (i[n] = e[n]);
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (n = Object.getOwnPropertySymbols(e); r < n.length; r++) 0 > t.indexOf(n[r]) && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (i[n[r]] = e[n[r]]);
          }
          return i;
        }(t, ["width", "height", "host"]), this._player = new this._api.Player(this._id, {
          width: n,
          height: i,
          videoId: e,
          host: r,
          playerVars: t,
          events: {
            onReady: () => this._onReady(e),
            onStateChange: e => this._onStateChange(e),
            onPlaybackQualityChange: e => this._onPlaybackQualityChange(e),
            onPlaybackRateChange: e => this._onPlaybackRateChange(e),
            onError: e => this._onError(e)
          }
        }), window.__YT_PLAYER = this._player;
      }
    }
    _onReady() {
      this.destroyed || (this._ready = !0, this.load(this._videoId, this._autoplay, this._start), this._flushQueue(), this.emit("ready", this._videoId));
    }
    _onStateChange(e) {
      if (!this.destroyed) {
        var t = m[e.data];
        if (!t) throw Error("Unrecognized state change: " + e);
        ["paused", "buffering", "ended"].includes(t) && this._onTimeupdate(), this.emit(t, null), ["unstarted", "playing", "cued"].includes(t) && this._onTimeupdate();
      }
    }
    _onPlaybackQualityChange(e) {
      this.destroyed || this.emit("playbackQualityChange", e.data);
    }
    _onPlaybackRateChange(e) {
      this.destroyed || this.emit("playbackRateChange", e.data);
    }
    _onError(e) {
      if (!this.destroyed && (e = Number(e.data)) !== d) {
        if (e === p || e === y || e === f || e === h) return this.emit("unplayable", this._videoId);
        this._destroy(Error("YouTube Player Error. Unknown error code: " + e));
      }
    }
    _onTimeupdate() {
      this.emit("timeupdate", this.getCurrentTime());
    }
    _startInterval() {
      this._interval = setInterval(() => this._onTimeupdate(), 1e3);
    }
    _stopInterval() {
      clearInterval(this._interval), this._interval = null;
    }
  }("#player", {
    width: "100%",
    rel: 0,
    controls: 1,
    showinfo: 0,
    mute: 1,
    modestbranding: 1,
    enablejsapi: 1,
    autoplay: 1,
    loop: 1
  }),
  T = new Map(),
  b = e => {
    var t = e.target;
    "active" === e.attributeName && t.hasAttribute("active") && (e = t.getAttribute("data-video-id"), t = T.get(e) || 0, v.load(e, !0, t), v.play(), v.mute());
  },
  S = new MutationObserver(e => e.forEach(b)),
  w = document.getElementById("player-overlay");
null == w || w.addEventListener("click", () => {
  let e = v.getIframe(),
    t = !e.classList.contains("lightbox");
  e.classList.toggle("lightbox", t), w.classList.toggle("lightbox", t), t ? (v.play(), v.unMute(), v.setPlaybackQuality("hd1080")) : v.mute();
}), v.on("timeupdate", e => {
  var t;
  e === v.getDuration() && v.play();
  let n = null === (t = v.getVideoData()) || void 0 === t ? void 0 : t.video_id;
  T.set(n, e);
});
let {
    matches: k
  } = window.matchMedia("(prefers-reduced-motion: no-preference)"),
  _ = document.querySelector("snap-tabs"),
  x = _.querySelector(":scope > section"),
  E = _.querySelector(":scope nav"),
  P = E.querySelectorAll(":scope a"),
  C = _.querySelector(":scope .snap-indicator");
P.forEach(e => {
  S.observe(e, {
    attributes: !0
  });
});
let R = new ScrollTimeline({
  source: x,
  orientation: "inline",
  fill: "both"
});
P.forEach(e => {
  e.animate({
    color: [...P].map(t => t === e ? "var(--text-active-color)" : "var(--text-color)")
  }, {
    duration: 1e3,
    fill: "both",
    timeline: R
  });
}), k && C.animate({
  transform: [...P].map(_ref => {
    let {
      offsetLeft: e
    } = _ref;
    return `translateX(${e}px)`;
  }),
  width: [...P].map(_ref2 => {
    let {
      offsetWidth: e
    } = _ref2;
    return `${e}px`;
  })
}, {
  duration: 1e3,
  fill: "both",
  timeline: R
});
let M = e => {
    E.querySelector(":scope a[active]").removeAttribute("active"), e.setAttribute("active", ""), e.scrollIntoView();
  },
  I = () => {
    const e = P[x.scrollLeft / x.clientWidth];
    e && M(e);
  };
E.addEventListener("click", e => {
  "A" === e.target.nodeName && M(e.target);
}), x.addEventListener("scroll", () => {
  clearTimeout(x.scrollEndTimer), x.scrollEndTimer = setTimeout(I, 100);
}), window.onload = () => {
  location.hash && (x.scrollLeft = document.querySelector(location.hash).offsetLeft), I();
};
//# sourceMappingURL=bundle.js.map
