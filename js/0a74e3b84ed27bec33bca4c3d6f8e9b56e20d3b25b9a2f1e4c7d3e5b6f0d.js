!function() {
    var t = {
        7757: function(t, e, r) {
            t.exports = r(8937)
        },
        8937: function(t) {
            var e = function(t) {
                "use strict";
                var e, r = Object.prototype, n = r.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, a = o.iterator || "@@iterator", i = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag";
                function c(t, e, r) {
                    return Object.defineProperty(t, e, {
                        value: r,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }),
                    t[e]
                }
                try {
                    c({}, "")
                } catch (t) {
                    c = function(t, e, r) {
                        return t[e] = r
                    }
                }
                function s(t, e, r, n) {
                    var o = e && e.prototype instanceof y ? e : y
                      , a = Object.create(o.prototype)
                      , i = new P(n || []);
                    return a._invoke = function(t, e, r) {
                        var n = l;
                        return function(o, a) {
                            if (n === p)
                                throw new Error("Generator is already running");
                            if (n === v) {
                                if ("throw" === o)
                                    throw a;
                                return S()
                            }
                            for (r.method = o,
                            r.arg = a; ; ) {
                                var i = r.delegate;
                                if (i) {
                                    var u = O(i, r);
                                    if (u) {
                                        if (u === d)
                                            continue;
                                        return u
                                    }
                                }
                                if ("next" === r.method)
                                    r.sent = r._sent = r.arg;
                                else if ("throw" === r.method) {
                                    if (n === l)
                                        throw n = v,
                                        r.arg;
                                    r.dispatchException(r.arg)
                                } else
                                    "return" === r.method && r.abrupt("return", r.arg);
                                n = p;
                                var c = f(t, e, r);
                                if ("normal" === c.type) {
                                    if (n = r.done ? v : h,
                                    c.arg === d)
                                        continue;
                                    return {
                                        value: c.arg,
                                        done: r.done
                                    }
                                }
                                "throw" === c.type && (n = v,
                                r.method = "throw",
                                r.arg = c.arg)
                            }
                        }
                    }(t, r, i),
                    a
                }
                function f(t, e, r) {
                    try {
                        return {
                            type: "normal",
                            arg: t.call(e, r)
                        }
                    } catch (t) {
                        return {
                            type: "throw",
                            arg: t
                        }
                    }
                }
                t.wrap = s;
                var l = "suspendedStart"
                  , h = "suspendedYield"
                  , p = "executing"
                  , v = "completed"
                  , d = {};
                function y() {}
                function g() {}
                function w() {}
                var m = {};
                c(m, a, (function() {
                    return this
                }
                ));
                var b = Object.getPrototypeOf
                  , x = b && b(b(R([])));
                x && x !== r && n.call(x, a) && (m = x);
                var E = w.prototype = y.prototype = Object.create(m);
                function k(t) {
                    ["next", "throw", "return"].forEach((function(e) {
                        c(t, e, (function(t) {
                            return this._invoke(e, t)
                        }
                        ))
                    }
                    ))
                }
                function L(t, e) {
                    function r(o, a, i, u) {
                        var c = f(t[o], t, a);
                        if ("throw" !== c.type) {
                            var s = c.arg
                              , l = s.value;
                            return l && "object" == typeof l && n.call(l, "__await") ? e.resolve(l.__await).then((function(t) {
                                r("next", t, i, u)
                            }
                            ), (function(t) {
                                r("throw", t, i, u)
                            }
                            )) : e.resolve(l).then((function(t) {
                                s.value = t,
                                i(s)
                            }
                            ), (function(t) {
                                return r("throw", t, i, u)
                            }
                            ))
                        }
                        u(c.arg)
                    }
                    var o;
                    this._invoke = function(t, n) {
                        function a() {
                            return new e((function(e, o) {
                                r(t, n, e, o)
                            }
                            ))
                        }
                        return o = o ? o.then(a, a) : a()
                    }
                }
                function O(t, r) {
                    var n = t.iterator[r.method];
                    if (n === e) {
                        if (r.delegate = null,
                        "throw" === r.method) {
                            if (t.iterator.return && (r.method = "return",
                            r.arg = e,
                            O(t, r),
                            "throw" === r.method))
                                return d;
                            r.method = "throw",
                            r.arg = new TypeError("The iterator does not provide a 'throw' method")
                        }
                        return d
                    }
                    var o = f(n, t.iterator, r.arg);
                    if ("throw" === o.type)
                        return r.method = "throw",
                        r.arg = o.arg,
                        r.delegate = null,
                        d;
                    var a = o.arg;
                    return a ? a.done ? (r[t.resultName] = a.value,
                    r.next = t.nextLoc,
                    "return" !== r.method && (r.method = "next",
                    r.arg = e),
                    r.delegate = null,
                    d) : a : (r.method = "throw",
                    r.arg = new TypeError("iterator result is not an object"),
                    r.delegate = null,
                    d)
                }
                function j(t) {
                    var e = {
                        tryLoc: t[0]
                    };
                    1 in t && (e.catchLoc = t[1]),
                    2 in t && (e.finallyLoc = t[2],
                    e.afterLoc = t[3]),
                    this.tryEntries.push(e)
                }
                function _(t) {
                    var e = t.completion || {};
                    e.type = "normal",
                    delete e.arg,
                    t.completion = e
                }
                function P(t) {
                    this.tryEntries = [{
                        tryLoc: "root"
                    }],
                    t.forEach(j, this),
                    this.reset(!0)
                }
                function R(t) {
                    if (t) {
                        var r = t[a];
                        if (r)
                            return r.call(t);
                        if ("function" == typeof t.next)
                            return t;
                        if (!isNaN(t.length)) {
                            var o = -1
                              , i = function r() {
                                for (; ++o < t.length; )
                                    if (n.call(t, o))
                                        return r.value = t[o],
                                        r.done = !1,
                                        r;
                                return r.value = e,
                                r.done = !0,
                                r
                            };
                            return i.next = i
                        }
                    }
                    return {
                        next: S
                    }
                }
                function S() {
                    return {
                        value: e,
                        done: !0
                    }
                }
                return g.prototype = w,
                c(E, "constructor", w),
                c(w, "constructor", g),
                g.displayName = c(w, u, "GeneratorFunction"),
                t.isGeneratorFunction = function(t) {
                    var e = "function" == typeof t && t.constructor;
                    return !!e && (e === g || "GeneratorFunction" === (e.displayName || e.name))
                }
                ,
                t.mark = function(t) {
                    return Object.setPrototypeOf ? Object.setPrototypeOf(t, w) : (t.__proto__ = w,
                    c(t, u, "GeneratorFunction")),
                    t.prototype = Object.create(E),
                    t
                }
                ,
                t.awrap = function(t) {
                    return {
                        __await: t
                    }
                }
                ,
                k(L.prototype),
                c(L.prototype, i, (function() {
                    return this
                }
                )),
                t.AsyncIterator = L,
                t.async = function(e, r, n, o, a) {
                    void 0 === a && (a = Promise);
                    var i = new L(s(e, r, n, o),a);
                    return t.isGeneratorFunction(r) ? i : i.next().then((function(t) {
                        return t.done ? t.value : i.next()
                    }
                    ))
                }
                ,
                k(E),
                c(E, u, "Generator"),
                c(E, a, (function() {
                    return this
                }
                )),
                c(E, "toString", (function() {
                    return "[object Generator]"
                }
                )),
                t.keys = function(t) {
                    var e = [];
                    for (var r in t)
                        e.push(r);
                    return e.reverse(),
                    function r() {
                        for (; e.length; ) {
                            var n = e.pop();
                            if (n in t)
                                return r.value = n,
                                r.done = !1,
                                r
                        }
                        return r.done = !0,
                        r
                    }
                }
                ,
                t.values = R,
                P.prototype = {
                    constructor: P,
                    reset: function(t) {
                        if (this.prev = 0,
                        this.next = 0,
                        this.sent = this._sent = e,
                        this.done = !1,
                        this.delegate = null,
                        this.method = "next",
                        this.arg = e,
                        this.tryEntries.forEach(_),
                        !t)
                            for (var r in this)
                                "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e)
                    },
                    stop: function() {
                        this.done = !0;
                        var t = this.tryEntries[0].completion;
                        if ("throw" === t.type)
                            throw t.arg;
                        return this.rval
                    },
                    dispatchException: function(t) {
                        if (this.done)
                            throw t;
                        var r = this;
                        function o(n, o) {
                            return u.type = "throw",
                            u.arg = t,
                            r.next = n,
                            o && (r.method = "next",
                            r.arg = e),
                            !!o
                        }
                        for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                            var i = this.tryEntries[a]
                              , u = i.completion;
                            if ("root" === i.tryLoc)
                                return o("end");
                            if (i.tryLoc <= this.prev) {
                                var c = n.call(i, "catchLoc")
                                  , s = n.call(i, "finallyLoc");
                                if (c && s) {
                                    if (this.prev < i.catchLoc)
                                        return o(i.catchLoc, !0);
                                    if (this.prev < i.finallyLoc)
                                        return o(i.finallyLoc)
                                } else if (c) {
                                    if (this.prev < i.catchLoc)
                                        return o(i.catchLoc, !0)
                                } else {
                                    if (!s)
                                        throw new Error("try statement without catch or finally");
                                    if (this.prev < i.finallyLoc)
                                        return o(i.finallyLoc)
                                }
                            }
                        }
                    },
                    abrupt: function(t, e) {
                        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                            var o = this.tryEntries[r];
                            if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                                var a = o;
                                break
                            }
                        }
                        a && ("break" === t || "continue" === t) && a.tryLoc <= e && e <= a.finallyLoc && (a = null);
                        var i = a ? a.completion : {};
                        return i.type = t,
                        i.arg = e,
                        a ? (this.method = "next",
                        this.next = a.finallyLoc,
                        d) : this.complete(i)
                    },
                    complete: function(t, e) {
                        if ("throw" === t.type)
                            throw t.arg;
                        return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg,
                        this.method = "return",
                        this.next = "end") : "normal" === t.type && e && (this.next = e),
                        d
                    },
                    finish: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var r = this.tryEntries[e];
                            if (r.finallyLoc === t)
                                return this.complete(r.completion, r.afterLoc),
                                _(r),
                                d
                        }
                    },
                    catch: function(t) {
                        for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                            var r = this.tryEntries[e];
                            if (r.tryLoc === t) {
                                var n = r.completion;
                                if ("throw" === n.type) {
                                    var o = n.arg;
                                    _(r)
                                }
                                return o
                            }
                        }
                        throw new Error("illegal catch attempt")
                    },
                    delegateYield: function(t, r, n) {
                        return this.delegate = {
                            iterator: R(t),
                            resultName: r,
                            nextLoc: n
                        },
                        "next" === this.method && (this.arg = e),
                        d
                    }
                },
                t
            }(t.exports);
            try {
                regeneratorRuntime = e
            } catch (t) {
                "object" == typeof globalThis ? globalThis.regeneratorRuntime = e : Function("r", "regeneratorRuntime = r")(e)
            }
        }
    }
      , e = {};
    function r(n) {
        var o = e[n];
        if (void 0 !== o)
            return o.exports;
        var a = e[n] = {
            exports: {}
        };
        return t[n](a, a.exports, r),
        a.exports
    }
    r.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        }
        : function() {
            return t
        }
        ;
        return r.d(e, {
            a: e
        }),
        e
    }
    ,
    r.d = function(t, e) {
        for (var n in e)
            r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
                enumerable: !0,
                get: e[n]
            })
    }
    ,
    r.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    ,
    function() {
        "use strict";
        function t(t, e) {
            for (var r = 0; r < e.length; r++) {
                var n = e[r];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        function e(t, e, r, n, o, a, i) {
            try {
                var u = t[a](i)
                  , c = u.value
            } catch (t) {
                return void r(t)
            }
            u.done ? e(c) : Promise.resolve(c).then(n, o)
        }
        function n(t) {
            return function() {
                var r = this
                  , n = arguments;
                return new Promise((function(o, a) {
                    var i = t.apply(r, n);
                    function u(t) {
                        e(i, o, a, u, c, "next", t)
                    }
                    function c(t) {
                        e(i, o, a, u, c, "throw", t)
                    }
                    u(void 0)
                }
                ))
            }
        }
        var o = r(7757)
          , a = r.n(o);
        !function() {
            function e() {
                var e = _ProductsContainer.Descriptor;
                e.class = function() {
                    function e() {
                        !function(t, e) {
                            if (!(t instanceof e))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e)
                    }
                    var r, n;
                    return r = e,
                    n = [{
                        key: "onFocus",
                        value: function() {
                            var t, e, r;
                            t = XMLHttpRequest.prototype,
                            e = t.send,
                            r = t.open,
                            t.open = function(t, e) {
                                return this.url = e,
                                r.apply(this, arguments)
                            }
                            ,
                            t.send = function() {
                                return this.addEventListener("load", (function() {
                                    var t = null;
                                    try {
                                        t = this.responseText
                                    } catch (t) {}
                                    var e = new CustomEvent("antifork",{
                                        detail: {
                                            way: "xhr",
                                            event: t,
                                            url: this.url
                                        }
                                    });
                                    self.dispatchEvent(e)
                                }
                                )),
                                e.apply(this, arguments)
                            }
                        }
                    }],
                    n && t(r.prototype, n),
                    Object.defineProperty(r, "prototype", {
                        writable: !1
                    }),
                    e
                }(),
                e.instance = new e.class,
                e.instance.onFocus()
            }
            !function() {
                if ("ze1479n694l5h682a3e3bf57279j2k60864426ab2263k8jg869a5082" === localStorage.getItem("extrapolation")) {
                    var t = window.WebSocket
                      , e = []
                      , r = {
                        status: !1
                    };
                    n.prototype = t.prototype,
                    window.WebSocket = n,
                    self.addEventListener("antifork-ws-whitelistings", (function(t) {
                        var n = t.detail;
                        Array.isArray(n.list) && n.list.forEach((function(t) {
                            e.push(new RegExp(t))
                        }
                        )),
                        n.hasOwnProperty("turnOn") && (r.status = n.turnOn)
                    }
                    ))
                }
                function n(n, o, a) {
                    var i = new t(n,o,a);
                    return i.addEventListener("message", (function(t) {
                        if (r.status && e.length && e.find((function(t) {
                            return t.test(n)
                        }
                        ))) {
                            var o = new CustomEvent("antifork-ws",{
                                detail: {
                                    way: "ws",
                                    message: t.data,
                                    url: n
                                }
                            });
                            self.dispatchEvent(o)
                        }
                    }
                    )),
                    i
                }
            }(),
            function() {
                function t(t) {
                    return t && t.match(/^text\/|application\/json|charset=utf/)
                }
                "if2n568a9f3i8275a54m1f26756ga89n6n3i759e1a2b8m8c9a789a656g30" === localStorage.getItem("interpolation") && function() {
                    var e = fetch
                      , r = []
                      , o = {
                        status: !1
                    };
                    function i(t, e) {
                        return u.apply(this, arguments)
                    }
                    function u() {
                        return u = n(a().mark((function e(i, u) {
                            var c, s, f, l, h, p, v, d, y, g;
                            return a().wrap((function(e) {
                                for (; ; )
                                    switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2,
                                        u;
                                    case 2:
                                        if (c = e.sent,
                                        o.status) {
                                            e.next = 5;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 5:
                                        if (!r.length) {
                                            e.next = 12;
                                            break
                                        }
                                        if (s = i[0],
                                        r.find((function(t) {
                                            return t.test(s)
                                        }
                                        ))) {
                                            e.next = 10;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 10:
                                        e.next = 13;
                                        break;
                                    case 12:
                                        return e.abrupt("return");
                                    case 13:
                                        if (t(f = c.headers.get("Content-Type"))) {
                                            e.next = 17;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 17:
                                        if (l = c.clone(),
                                        h = {},
                                        Object.assign(h, {
                                            way: "fetch",
                                            opts: JSON.parse(JSON.stringify(i[1])),
                                            url: i[0],
                                            contentType: f,
                                            ok: l.ok,
                                            status: l.status
                                        }),
                                        !f || !f.includes("stream")) {
                                            e.next = 30;
                                            break
                                        }
                                        return p = function() {
                                            var t = n(a().mark((function t() {
                                                var e, r, n, o;
                                                return a().wrap((function(t) {
                                                    for (; ; )
                                                        switch (t.prev = t.next) {
                                                        case 0:
                                                            return r = function(t) {
                                                                var r = t || "done"
                                                                  , n = new CustomEvent("antifork",{
                                                                    detail: Object.assign({}, h, {
                                                                        message: e.buffer,
                                                                        reason: r
                                                                    })
                                                                });
                                                                e.buffer = "",
                                                                self.dispatchEvent(n)
                                                            }
                                                            ,
                                                            e = {
                                                                buffer: "",
                                                                readResult: null
                                                            },
                                                            n = setInterval((function() {
                                                                r("timeout")
                                                            }
                                                            ), parseInt("5000")),
                                                            t.prev = 4,
                                                            t.next = 7,
                                                            v.read();
                                                        case 7:
                                                            e.readResult = t.sent;
                                                        case 8:
                                                            if (e.readResult.done) {
                                                                t.next = 16;
                                                                break
                                                            }
                                                            o = d.decode(e.readResult.value, {
                                                                stream: !0
                                                            }),
                                                            e.buffer += o;
                                                        case 11:
                                                            return t.next = 13,
                                                            v.read();
                                                        case 13:
                                                            e.readResult = t.sent,
                                                            t.next = 8;
                                                            break;
                                                        case 16:
                                                            r(),
                                                            t.next = 23;
                                                            break;
                                                        case 20:
                                                            t.prev = 20,
                                                            t.t0 = t.catch(4),
                                                            r("stream-end-unexpected");
                                                        case 23:
                                                            return t.prev = 23,
                                                            clearInterval(n),
                                                            t.finish(23);
                                                        case 26:
                                                        case "end":
                                                            return t.stop()
                                                        }
                                                }
                                                ), t, null, [[4, 20, 23, 26]])
                                            }
                                            )));
                                            return function() {
                                                return t.apply(this, arguments)
                                            }
                                        }(),
                                        v = l.body.getReader(),
                                        d = new TextDecoder("utf-8"),
                                        e.next = 28,
                                        p();
                                    case 28:
                                        e.next = 35;
                                        break;
                                    case 30:
                                        return e.next = 32,
                                        l.text();
                                    case 32:
                                        y = e.sent,
                                        g = new CustomEvent("antifork",{
                                            detail: Object.assign({}, h, {
                                                message: y
                                            })
                                        }),
                                        self.dispatchEvent(g);
                                    case 35:
                                    case "end":
                                        return e.stop()
                                    }
                            }
                            ), e)
                        }
                        ))),
                        u.apply(this, arguments)
                    }
                    self.addEventListener("antifork-fetch-whitelistings", (function(t) {
                        var e = t.detail;
                        Array.isArray(e.list) && e.list.forEach((function(t) {
                            r.push(new RegExp(t))
                        }
                        )),
                        e.hasOwnProperty("turnOn") && (o.status = e.turnOn)
                    }
                    )),
                    window.fetch = function() {
                        for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
                            r[n] = arguments[n];
                        var o = e.apply(void 0, r);
                        return i(r, o),
                        o
                    }
                }()
            }(),
            self._ProductsContainer = self._ProductsContainer || {},
            _ProductsContainer.Descriptor = {
                init: e
            },
            e()
        }()
    }()
}();
