window.lpTag = window.lpTag || {};
lpTag.taglets = lpTag.taglets || {};
lpTag._tagv = "4.0.0";
! function (a, b) {
    function c(c, d, e) {
        b._logcnt = b._logcnt || 0;
        z(c, d, e, b._logcnt);
        if (void 0 !== a.lpTaglogListeners && a.lpTaglogListeners.constructor === Array)
            for (var f = 0; f < lpTaglogListeners.length; f++) try {
                lpTaglogListeners[f](c, d, e, b._logcnt)
            } catch (a) {
                z("Exception=" + a.message + " msg=" + c, d, e, b._logcnt)
            }
        b._logcnt++
    }

    function d() {
        return b.env
    }

    function e(a) {
        return h(ba, a)
    }

    function f(a) {
        return h(ca, a)
    }

    function g(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c])
    }

    function h(a, b) {
        var c;
        c = void 0 !== b ? void 0 !== a[b] ? a[b] : null : W(a);
        return c
    }

    function i() {
        var a = new b.Events,
            c = a.trigger,
            d = !1;
        a.trigger = function (a, e, f) {
            var g = a;
            "string" == typeof a && (g = {
                eventName: e,
                appName: a,
                data: f
            });
            if ("LPT" === g.appName && "DOM_READY" === g.eventName) {
                if (d) return;
                d = !0
            }
            void 0 !== b._deferExecuted ? c(g) : b.defer(function () {
                c(g)
            }, 1)
        };
        return a
    }

    function j(a) {
        ea.taglets = ea.taglets || {};
        if (a) {
            D(a);
            F(a, ea.taglets);
            I(a, ea.taglets)
        }
        H(ea);
        J();
        ha.trigger("LPTAG", "ON_READY");
        if (a) {
            L();
            O(a, ea.taglets, !1, b.tagletCommands);
            M();
            N()
        }
        ha.trigger("LPTAG", "ON_STARTED")
    }

    function k(a) {
        if (a) {
            D(a);
            I(a, {}, !0);
            O(a, {}, !0, b.tagletCommands)
        }
    }

    function l() {
        return xa
    }

    function m() {
        return ya
    }

    function n() {
        return la[ya]
    }

    function o() {
        return ja[xa]
    }

    function p() {
        return za
    }

    function q() {
        return na[za]
    }

    function r() {
        if (!b.started) {
            b.started = !0;
            Y()
        }
    }

    function s(a, c) {
        if (!a) return !1;
        b.url = a;
        c = c || {};
        c.taglets = c.taglets || {};
        b.section = c.section || b.section;
        b.tagletSection = c.tagletSection || b.tagletSection;
        ea = c;
        E(c.taglets);
        fa = !0;
        Y();
        return !0
    }

    function t(a) {
        var c;
        a = a || {};
        if (b.taglets && b.taglets.jsonp && a.name) {
            a.excludeWhitelist = !0;
            c = {
                url: w(a),
                success: A(a),
                error: B(a)
            };
            b.taglets.jsonp.issueCall(c)
        }
    }

    function u() {
        if (a.location && a.location.search) {
            var c = a.location.search.match(/lpDebug=(?=(\d))/);
            c && c[1] && (b.debug = c[1])
        }
        if (!b.isDom && ("interactive" === document.readyState || "complete" === document.readyState)) {
            b.isDom = !0;
            ha.trigger("LPT", "DOM_READY")
        }
        void 0 !== a._lptTagStop || void 0 !== b.autoStart && !b.autoStart || r()
    }

    function v(a) {
        try {
            if (a) {
                var d = _.retry;
                if (a.retry) Z(d, a.retry, !0, Y);
                else if (!b.loaded || fa) {
                    fa = !1;
                    b.loaded = !0;
                    d.count = 0;
                    b.site = a.site || b.site;
                    g(ba, a.features);
                    g(ca, a.settings);
                    b.debug ? setTimeout(function () {
                        j(a.taglets)
                    }, 0) : j(a.taglets)
                }
                a.error && c("callback error ,Error:" + JSON.stringify(a.error), "ERROR", "LPTAG")
            } else c("callback error, no response", "ERROR", "LPTAG")
        } catch (a) {
            c("callback has failed " + a.message, "ERROR", "LPTAG")
        }
    }

    function w(a) {
        a = a || {};
        var c = "?df=" + b.device.family(),
            d = a.lpDebug || b.debug,
            e = a.whitelist || b.wl,
            f = X(da),
            g = x(),
            h = b.protocol + "//" + (b.ovr && b.ovr.domain ? b.ovr.domain : "tag.contactatonce.com") + "/taglets";
        if (!a.excludeWhitelist && e) {
            e = e.constructor === Array ? e : [e];
            c += "&wl=" + encodeURIComponent(e.join(","))
        }
        if (a.name) {
            a.name = a.name.constructor === Array ? a.name : [a.name];
            c += "&byName=" + encodeURIComponent(a.name.join(","))
        }
        1 != d && 2 != d || (c += "&lpDebug=" + d);
        f.length && (c += "&ct=" + encodeURIComponent(f.join(",")));
        g && (c += "&s=" + encodeURIComponent(g));
        ma && (c += "&b=" + za);
        c += "&providerId=" + b.providerId;
        return h + c
    }

    function x() {
        var a;
        b.tagletSection ? a = b.tagletSection : "object" != typeof b.section && b.section ? a = b.section : b.section && b.section.constructor === Array && 1 === b.section.length && "object" != typeof b.section[0] && b.section[0] && (a = b.section[0]);
        return a
    }

    function y(a) {
        return !!pa.match(a)
    }

    function z(b, c, d, e) {
        void 0 !== a.lpMTagDebug && "function" == typeof lpMTagDebug.Display && a.lpMTagDebug.Display(b, c, d, e)
    }

    function A(a) {
        return function (d) {
            if (d) {
                var e = _.retry;
                if (d.retry) Z(e, d.retry, !1, function () {
                    t(a)
                });
                else if (d.taglets) {
                    e.count = 0;
                    d.taglets.constructor !== Array && (d.taglets = [d.taglets]);
                    if (b.debug) setTimeout(function () {
                        k(d.taglets);
                        C(a.success, a.context)
                    }, 0);
                    else {
                        k(d.taglets);
                        C(a.success, a.context)
                    }
                }
                d.error && c("callback error ,Error:" + JSON.stringify(d.error), "ERROR", "LPTAG")
            } else c("callback error, no data " + (d && d.error ? " ,Error:" + JSON.stringify(d.error) : ""), "ERROR", "LPTAG")
        }
    }

    function B(a) {
        return function (b) {
            C(a.error, a.context, b)
        }
    }

    function C(b, d) {
        d = d || a;
        if ("function" == typeof b) {
            var e = Array.prototype.slice.call(arguments, 2);
            try {
                return b.apply(d, e)
            } catch (a) {
                c("Failed to execute callback exc= " + a.message, "ERROR", "LPTAG")
            }
        }
    }

    function D(a) {
        for (var b = 0; b < a.length; b++) try {
            c("Processing taglet: " + a[b].name, "DEBUG", "LPTAG");
            eval(a[b].code)
        } catch (d) {
            c("Error creating taglet:" + a[b].name + "  ex=" + d.message, "ERROR", "LPTAG")
        }
    }

    function E(a) {
        for (var d in da)
            if (da.hasOwnProperty(d) && da[d] !== ga.STOPPED) {
                var e = b.taglets[d];
                try {
                    if ("function" == typeof e.onBeforeNavigation) {
                        c("onBeforeNavigation taglet: " + d, "DEBUG", "LPTAG");
                        e.onBeforeNavigation(a[d])
                    }
                } catch (a) {
                    c("Error onBeforeNavigation taglet :" + d + "ex= " + a.message, "ERROR", "LPTAG")
                }
            }
    }

    function F(a, d) {
        for (var e in da)
            if (da.hasOwnProperty(e) && da[e] !== ga.STOPPED && G(a, e)) {
                var f = b.taglets[e];
                try {
                    if ("function" == typeof f.stop) {
                        c("Stop taglet: " + e, "DEBUG", "LPTAG");
                        f.stop(d[e])
                    }
                    da[e] = ga.STOPPED;
                    ha.trigger("LPTAG", "TAGLET_STOPPED", {
                        name: e
                    })
                } catch (a) {
                    c("Error stop taglet :" + e + "ex= " + a.message, "ERROR", "LPTAG")
                }
            }
    }

    function G(a, b) {
        for (var c = !0, d = 0; d < a.length; d++)
            if (a[d].name === b) {
                c = !1;
                break
            } return c
    }

    function H(a) {
        a.sdes && a.sdes.length && b.sdes.push(a.sdes)
    }

    function I(a, d, e) {
        for (var f = 0; f < a.length; f++) {
            var g = b.taglets[a[f].name];
            if (da[a[f].name]) {
                if (!e) try {
                    if ("function" == typeof g.reinit) {
                        c("Reinit taglet: " + a[f].name, "DEBUG", "LPTAG");
                        g.reinit(a[f].parameters, d[a[f].name]);
                        ha.trigger("LPTAG", "TAGLET_REINITIALIZED", {
                            name: a[f].name
                        })
                    }
                } catch (b) {
                    c("Error reinit taglet :" + a[f].name + "ex= " + b.message, "ERROR", "LPTAG")
                }
            } else try {
                c("Init taglet: " + a[f].name, "DEBUG", "LPTAG");
                g.init(a[f].parameters);
                ha.trigger("LPTAG", "TAGLET_INITIALIZED", {
                    name: a[f].name
                })
            } catch (b) {
                c("Error init taglet:" + a[f].name + "  ex=" + b.message, "ERROR", "LPTAG")
            }
        }
    }

    function J() {
        b._deferExecuted = !0;
        b.defer = function (a) {
            try {
                a()
            } catch (a) {
                c("Error executing defer fn:" + a.message, "ERROR", "LPTAG")
            }
        };
        K(b._defB);
        K(b._defT);
        K(b._defL)
    }

    function K(a) {
        if (void 0 !== a) {
            for (var b = 0; b < a.length; b++) try {
                a[b]()
            } catch (a) {
                c("Error executing defer fn:" + a.message, "ERROR", "LPTAG")
            }
            a.length = 0
        }
    }

    function L() {
        b.sdk = b.sdk || {};
        b.sdk.methods = b.sdk.methods || []
    }

    function M() {
        b.sdk.exec = function (a, d) {
            b.sdk.methods[a] ? b.sdk.methods[a](d) : c(a + " is not a valid SDK method")
        }
    }

    function N() {
        if (b._defExec)
            for (var a in b._defExec)
                for (var c = 0; c < b._defExec[a].length; c++) b.sdk.exec(a, b._defExec[a][c])
    }

    function O(a, d, e, f) {
        for (var g = 0; g < a.length; g++) {
            var h = b.taglets[a[g].name];
            if (P(f, a[g].name)) {
                if (da[a[g].name]) {
                    if (!e) try {
                        if ("function" == typeof h.restart) {
                            c("Restart taglet: " + a[g].name, "DEBUG", "LPTAG");
                            h.restart(d[a[g].name])
                        }
                        ha.trigger("LPTAG", "TAGLET_RESTARTED", {
                            name: a[g].name
                        })
                    } catch (b) {
                        c("Error restart taglet :" + a[g].name + "ex= " + b.message, "ERROR", "LPTAG")
                    }
                } else try {
                    if ("function" == typeof h.start) {
                        c("Start taglet: " + a[g].name, "DEBUG", "LPTAG");
                        h.start()
                    }
                    ha.trigger("LPTAG", "TAGLET_STARTED", {
                        name: a[g].name
                    })
                } catch (b) {
                    c("Error start taglet :" + a[g].name + "ex= " + b.message, "ERROR", "LPTAG")
                }
                da[a[g].name] = ga.STARTED;
                if (h && h.sdkDef)
                    for (var i = 0; i < h.sdkDef.length; i++) b.sdk.methods[a[g].name + "." + h.sdkDef[i].methodName] = h.sdkDef[i].func
            } else da[a[g].name] = ga.STOPPED
        }
    }

    function P(a, b) {
        for (var c in a)
            if (c.tagletName && c.tagletName === b && c.command && "stop" === c.command) return !1;
        return !0
    }

    function Q() {
        var a = ia.desktop;
        qa && !ra ? a = ia.mobile : !ra && !wa || T() ? ra && T() && !U() && sa && (a = ia.tablet) : a = ia.tablet;
        return a
    }

    function R() {
        var a = ka.windows;
        ta && !qa ? a = ka.mac : wa ? a = ka.android : va ? a = ka.iOS : ua && (a = ka.linux);
        return a
    }

    function S() {
        var a = ma.unknown;
        oa ? a = ma.oldie : y(/MSIE|Trident|IEMobile/) ? a = ma.ie : y(/Line/) ? a = ma.line : y(/CriOS/) ? a = ma.chromeios : y(/Opera|OPR/) ? a = ma.opera : y(/Chrome/) ? a = ma.chrome : y(/ BlackBerry /) ? a = ma.blackberry : y(/Firefox/) ? a = ma.firefox : y(/Safari/) && (ta || va || ya === ka.windows) ? a = ma.safari : wa && (a = ma.android);
        return a
    }

    function T() {
        var a, b = !1,
            c = document.documentMode;
        a = /*@cc_on!@*/ b;
        if (!a) {
            V("");
            a = "number" == typeof document.documentMode;
            V(c)
        }!a && navigator && navigator.userAgent && (a = "Netscape" === navigator.appName && /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.test(navigator.userAgent));
        return a
    }

    function U() {
        return y(/Trident\/.*rv:(11)/)
    }

    function V(a) {
        try {
            document.documentMode = a
        } catch (a) {}
    }

    function W(a) {
        var b = {};
        for (var c in a) b[c] = a[c];
        return b
    }

    function X(a) {
        var b = [];
        for (var c in a) a.hasOwnProperty(c) && b.push(c);
        return b
    }

    function Y() {
        b.load(w(), "UTF-8", _.scriptPrefix + _.count);
        _.count++
    }

    function Z(a, b, d, e) {
        if (d) {
            var f = _.count - 1;
            $(_.scriptPrefix + f)
        }
        isNaN(b.maxRetries) || (a.max = parseInt(b.maxRetries, 10));
        isNaN(b.timeout) || (a.timeout = parseInt(b.timeout, 10));
        if (a.count < a.max) {
            c("retrying count=" + a.count + " max=" + a.max, "DEBUG", "LPTAG");
            a.count++;
            setTimeout(function () {
                e()
            }, a.timeout)
        } else c("exceeded max retries: " + a.max + ", stopping", "ERROR", "LPTAG")
    }

    function $(a) {
        var b = document.getElementById(a);
        if (b) try {
            b.parentNode.removeChild(b);
            for (var d in b) b.hasOwnProperty(d) && delete b[d]
        } catch (b) {
            c("error removing script: " + a, "ERROR", "LPTAG")
        }
    }
    var _ = {
            retry: {
                count: 0,
                max: 3,
                timeout: 1e3
            },
            scriptPrefix: "_lpTagScriptId_",
            count: 0
        },
        aa = [],
        ba = {},
        ca = {},
        da = {},
        ea = {},
        fa = !1,
        ga = {
            STARTED: 1,
            STOPPED: 2
        },
        ha, ia = {
            desktop: 0,
            tablet: 1,
            mobile: 2
        },
        ja = ["Desktop", "Tablet", "Mobile"],
        ka = {
            windows: 0,
            mac: 1,
            linux: 2,
            iOS: 3,
            android: 4
        },
        la = ["Windows", "Mac OSX", "Linux", "iOS", "Android"],
        ma = {
            ie: 0,
            chrome: 1,
            safari: 2,
            firefox: 3,
            line: 4,
            chromeios: 5,
            oldie: 6,
            blackberry: 7,
            opera: 8,
            android: 9,
            unknown: 10
        },
        na = ["MSIE", "Chrome", "Safari", "Firefox", "Line", "ChromeIOS", "IE<9", "BlackBerry", "Opera", "Android", "Unknown"],
        oa = !a.addEventListener,
        pa = navigator.userAgent,
        qa = y(/(Windows Phone|iPhone|iPod|mobile|Mobile|IEMobile)/g),
        ra = y(/(Tablet PC|iPad|Tablet|tablet)/g),
        sa = y(/(Touch)/g),
        ta = y(/(Mac OS)/g),
        ua = y(/(Linux)/g),
        va = y(/(iPhone|iPod|iPad)/g),
        wa = y(/(android|Android)/g),
        xa = Q(),
        ya = R(),
        za = S();
    ! function (a, b) {
        "use strict";
        if ("object" == typeof exports) b(a, exports);
        else {
            a.Chronos = a.Chronos || {};
            b(a, a.Chronos)
        }
    }(void 0 === a.lpTag ? this : a.lpTag, function (a, b) {
        "use strict";

        function c(a, b, c) {
            var d = [];
            if (a[b] && a[b].length)
                for (var e = 0; e < a[b].length; e++) c && "*" !== a[b][e].appName && a[b][e].appName !== c || d.push(a[b][e]);
            if (a["*"])
                for (var f = 0; f < a["*"].length; f++) c && "*" !== a["*"][f].appName && a["*"][f].appName !== c || d.push(a["*"][f]);
            return d
        }

        function d(b, c, d) {
            a && "function" == typeof a.log && a.log(b, c, d)
        }

        function e(a) {
            var b, c = a.unbindObj[a.attrName],
                e = !1;
            if (!a.unbindObj) {
                d("CMD listen id not spec for unbind", "ERROR", a.loggerName);
                return null
            }
            if ("string" == typeof a.unbindObj) return i(a.lstnrs, a.unbindObj);
            if (!a.unbindObj.func && !a.unbindObj.context && !a.unbindObj.appName) return !1;
            var f = a.lstnrs;
            if (c) {
                f = {};
                f[c] = a.lstnrs[c]
            }
            for (var g in f)
                if (f.hasOwnProperty(g) && f[g] && f[g].length) {
                    b = j(f[g], a.unbindObj.func, a.unbindObj.context, a.unbindObj.appName);
                    if (b.length !== f[g].length) {
                        a.lstnrs[g] = b;
                        e = !0
                    }
                } return e
        }

        function f(a) {
            var b = {};
            if (a.constructor === Object)
                for (var c in a) a.hasOwnProperty(c) && null !== a[c] && void 0 !== a[c] && ("object" == typeof a[c] && a[c].constructor !== Array ? b[c] = f(a[c]) : a[c].constructor === Array ? b[c] = a[c].slice(0) || [] : "function" != typeof a[c] && (b[c] = null !== a[c] && void 0 !== a[c] ? a[c] : ""));
            else a.constructor === Array ? b = a.slice(0) || [] : "function" != typeof a && (b = a);
            return b
        }

        function g(a, b, c) {
            if ((void 0 === c || "*" === c) && "*" === b) return a;
            for (var d = [], e = 0; e < a.length; e++) a[e].eventName !== c && "*" !== c || (b && b === a[e].appName || !a[e].appName || "*" === a[e].appName || "*" === b) && d.push(a[e]);
            return d
        }

        function h(a) {
            if (0 === a.eventBufferLimit || a.triggerData.data && a.triggerData.data.doNotStore) a = null;
            else {
                var b = {
                    eventName: a.triggerData[a.attrName],
                    appName: a.triggerData.appName
                };
                b.data = a.triggerData.passDataByRef ? a.triggerData.data : f(a.triggerData.data);
                if (a.eventBufferLimit > 0) {
                    a.index >= a.eventBufferLimit && (a.index = 0);
                    a.fired[a.index] = b;
                    a.index++
                } else a.fired.push(b);
                a = null
            }
        }

        function i(a, b) {
            var c = !1;
            if (!b) {
                d("Ev listen id not spec for unregister", "ERROR", "Events");
                return null
            }
            for (var e in a)
                if (a.hasOwnProperty(e))
                    for (var f = 0; f < a[e].length; f++)
                        if (a[e][f].id == b) {
                            a[e].splice(f, 1);
                            d("Ev listen=" + b + " and name=" + e + " unregister", "DEBUG", "Events");
                            c = !0;
                            break
                        } c || d("Ev listen not found " + b + " unregister", "DEBUG", "Events");
            return c
        }

        function j(a, b, c, e) {
            var f = [];
            if (a && a.length)
                for (var g = 0; g < a.length; g++) try {
                    var h = !c && a[g].func === b,
                        i = !b && c && a[g].context === c,
                        j = b && c && a[g].func === b && a[g].context === c,
                        k = e && e === a[g].appName,
                        l = "*" === a[g].appName;
                    if (h || i || j) {
                        if (k || l) continue;
                        if (i) continue
                    } else if (!b && !c && k) continue;
                    f.push(a[g])
                } catch (a) {
                    d("Error in unbind e=" + a.message, "ERROR", "Events")
                }
            return f
        }
        b.EventsUtil = b.EventsUtil || {
            getListeners: c,
            log: d,
            unbind: e,
            hasFired: g,
            cloneEventData: f,
            storeEventData: h
        }
    });
    ! function (a, b) {
        "use strict";
        if ("object" == typeof exports) b(a, exports, require("util/EventsUtil"));
        else {
            a.Chronos = a.Chronos || {};
            b(a, a.Chronos, a.Chronos.EventsUtil)
        }
    }(void 0 === a.lpTag ? this : a.lpTag, function (a, b, c) {
        "use strict";

        function d(a) {
            function b(a) {
                if (a) {
                    a.triggerOnce = !0;
                    return d(a)
                }
                return null
            }

            function d(a, b, e) {
                var f = a;
                "string" == typeof a && (f = {
                    appName: a,
                    eventName: b,
                    func: e
                });
                if (!f.eventName || !f.func || "function" != typeof f.func && f.func.constructor !== Array) {
                    c.log("Ev listen has invalid params: evName=[" + f.eventName + "]", "ERROR", "Events");
                    return null
                }
                if (f.func.constructor === Array) {
                    for (var g, h, i = [], j = 0; j < f.func.length; j++) {
                        g = c.cloneEventData(f);
                        g.func = f.func[j];
                        h = d(g);
                        i.push(h)
                    }
                    return i
                }
                var k = q + n++,
                    l = {
                        id: k,
                        func: f.func,
                        context: f.context || null,
                        aSync: !!f.aSync,
                        appName: f.appName || "*",
                        triggerOnce: f.triggerOnce || !1
                    };
                o[f.eventName] = o[f.eventName] || [];
                o[f.eventName].push(l);
                c.log("Ev listen rgstr: evName=[" + f.eventName + "] aSync=" + l.aSync + " appName=" + l.name, "DEBUG", "Events");
                f = null;
                a = null;
                return k
            }

            function e(a) {
                return c.unbind({
                    unbindObj: a,
                    attrName: m,
                    loggerName: l,
                    lstnrs: o
                })
            }

            function f(a, b) {
                return c.hasFired(p, a, b)
            }

            function g(a, b, d) {
                var e = a;
                "string" == typeof a && (e = {
                    eventName: b,
                    appName: a,
                    data: d
                });
                if (!e || void 0 === e.eventName) {
                    c.log("Ev name not spec for publish", "ERROR", "Events");
                    e = null;
                    return null
                }
                e.passDataByRef = e.passDataByRef || !j;
                i(e);
                var f = c.getListeners(o, e.eventName, e.appName);
                if (f.length > 0)
                    for (var g = 0; g < f.length; g++) {
                        var k = e.passDataByRef ? e.data : c.cloneEventData(e.data),
                            l = {
                                appName: e.appName,
                                eventName: e.eventName
                            },
                            m = f[g];
                        m.aSync || k && k.aSync ? setTimeout(h(m, k, l), 0) : h(m, k, l)()
                    }
                e = null;
                return f.length > 0
            }

            function h(a, b, d) {
                return function () {
                    try {
                        a.func.call(a.context, b, d);
                        b = null;
                        a.triggerOnce && e(a);
                        a = null
                    } catch (b) {
                        c.log("Error executing " + d.eventName + " eventId: " + a.id + "e=" + b.message, "ERROR", "Events")
                    }
                }
            }

            function i(a) {
                c.storeEventData({
                    triggerData: a,
                    eventBufferLimit: k,
                    attrName: m,
                    fired: p,
                    index: r
                })
            }
            var j, k, l = "Events",
                m = "eventName",
                n = 0,
                o = {},
                p = [],
                q = "evId_",
                r = 0;
            j = !(!a || "boolean" != typeof a.cloneEventData) && a.cloneEventData;
            k = a && !isNaN(a.eventBufferLimit) ? a.eventBufferLimit : -1;
            this.once = b;
            this.hasFired = f;
            this.trigger = g;
            this.publish = g;
            this.bind = d;
            this.register = d;
            this.unbind = e;
            this.unregister = e
        }
        b.Events = b.Events || d
    });
    b.Events = b.Events || b.Chronos.Events;
    a.lpTag = a.lpTag || {};
    b.storageMethods = b.storageMethods || function () {
        "use strict";

        function a() {
            return l && m
        }

        function b() {
            return l
        }

        function c() {
            return m
        }

        function d(a, c) {
            if (b()) {
                sessionStorage.setItem(a, c);
                return !0
            }
        }

        function e(a) {
            if (b()) return sessionStorage.getItem(a) || ""
        }

        function f(a) {
            if (b() && e(a)) {
                sessionStorage.removeItem(a);
                return !0
            }
            return !1
        }

        function g(a, b) {
            if (c()) {
                localStorage.setItem(a, b);
                return !0
            }
        }

        function h(a) {
            if (c()) return localStorage.getItem(a) || ""
        }

        function i(a) {
            if (c() && h(a)) {
                localStorage.removeItem(a);
                return !0
            }
            return !1
        }

        function j() {
            try {
                l = k(sessionStorage);
                m = k(localStorage)
            } catch (a) {}
        }

        function k(a) {
            var b = !1,
                c = "lpTestCase",
                d = "abc";
            try {
                if ("undefined" != typeof Storage) {
                    a.setItem(c, d);
                    b = a.getItem(c) === d;
                    a.removeItem(c)
                }
            } catch (a) {}
            return b
        }
        var l = !1,
            m = !1;
        j();
        return {
            isStorageEnabled: a,
            isSessionStorageEnabled: b,
            isLocalStorageEnabled: c,
            setSessionData: d,
            getSessionData: e,
            removeSessionData: f,
            setPersistentData: g,
            getPersistentData: h,
            removePersistentData: i
        }
    }();
    a.lpTag = a.lpTag || {};
    b.cookieMethods = b.cookieMethods || function () {
        "use strict";

        function a() {
            var a = "lpTestCookie" + (new Date).getTime(),
                b = "testValue";
            f({
                name: a,
                value: b
            });
            h = b === c(a);
            g(a);
            i = !1;
            return h
        }

        function b() {
            return h
        }

        function c(a) {
            var b, c, d = "; ",
                e = "";
            if (i || h) {
                if ("string" != typeof a) return "";
                a = encodeURIComponent(a);
                try {
                    c = d + document.cookie
                } catch (a) {}
                b = c.split(d + a + "=");
                e = 1 == b.length ? "" : decodeURIComponent(b[1].split(";")[0])
            }
            return e
        }

        function d(a, b, c) {
            c = "number" == typeof c ? c : 2592e3;
            "object" == typeof a && (a.seconds = c);
            return e(a, b, c)
        }

        function e(a, b, c, d, e, g, h) {
            return f("object" == typeof a ? a : {
                name: a,
                value: b,
                seconds: c,
                path: d,
                domain: e,
                secure: g,
                sameSite: h
            })
        }

        function f(a) {
            var b, c, d = !1;
            if (i || h) {
                if ("string" != typeof a.name || "" === a.name) return !1;
                null !== a.value && void 0 !== a.value || (a.seconds = -1);
                if ("number" == typeof a.seconds) {
                    c = (new Date).getTime();
                    b = new Date(c + 1e3 * a.seconds)
                }
                a.value = a.value ? encodeURIComponent(a.value) : "";
                try {
                    document.cookie = [encodeURIComponent(a.name), "=", a.value, b ? "; expires=" + b.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : "", a.sameSite ? "; samesite=" + a.sameSite : ""].join("");
                    d = !0
                } catch (a) {}
            }
            return d
        }

        function g(a, b, c) {
            return f({
                name: a,
                path: b,
                domain: c
            })
        }
        var h = !1,
            i = !0;
        a();
        return {
            clearCookie: g,
            writeSessionCookie: e,
            writePersistentCookie: d,
            readCookie: c,
            isCookieEnabled: b
        }
    }();
    b.cfg = _;
    b.log = c;
    b.features = {
        getFeature: e
    };
    b.siteSettings = {
        getSetting: f
    };
    b.getEnv = d;
    b.eventsFactory = i;
    b.tglMng = {
        run: j,
        runtTaglet: k
    };
    b.device = {
        os: m,
        osEnum: W(ka),
        osName: n,
        family: l,
        familyEnum: W(ia),
        familyName: o,
        browser: p,
        browserName: q,
        browserEnum: W(ma)
    };
    b.start = r;
    b._reload = Y;
    b.newPage = s;
    b.loadTaglet = t;
    b.callback = v;
    b.run = u;
    ha = i();
    b.events = ha;
    u()
}(window, lpTag);