//tealium universal tag - utag.loader ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var utag_condload = false;
window.__tealium_twc_switch = false;
if (typeof utag == "undefined" && !utag_condload) {
    var utag = {
        id: "autotrader.at-desktop",
        o: {},
        sender: {},
        send: {},
        rpt: {
            ts: {
                a: new Date()
            }
        },
        dbi: [],
        db_log: [],
        loader: {
            q: [],
            lc: 0,
            f: {},
            p: 0,
            ol: 0,
            wq: [],
            lq: [],
            bq: {},
            bk: {},
            rf: 0,
            ri: 0,
            rp: 0,
            rq: [],
            ready_q: [],
            sendq: {
                "pending": 0
            },
            run_ready_q: function () {
                for (var i = 0; i < utag.loader.ready_q.length; i++) {
                    utag.DB("READY_Q:" + i);
                    try {
                        utag.loader.ready_q[i]()
                    } catch (e) {
                        utag.DB(e)
                    };
                }
            },
            lh: function (a, b, c) {
                a = "" + location.hostname;
                b = a.split(".");
                c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\.|\...\.jp$/.test(a)) ? 3 : 2;
                return b.splice(b.length - c, c).join(".");
            },
            WQ: function (a, b, c, d, g) {
                utag.DB('WQ:' + utag.loader.wq.length);
                try {
                    if (utag.udoname && utag.udoname.indexOf(".") < 0) {
                        utag.ut.merge(utag.data, window[utag.udoname], 0);
                    }
                    if (utag.cfg.load_rules_at_wait) {
                        utag.handler.LR(utag.data);
                    }
                } catch (e) {
                    utag.DB(e)
                };
                d = 0;
                g = [];
                for (a = 0; a < utag.loader.wq.length; a++) {
                    b = utag.loader.wq[a];
                    b.load = utag.loader.cfg[b.id].load;
                    if (b.load == 4) {
                        this.f[b.id] = 0;
                        utag.loader.LOAD(b.id)
                    } else if (b.load > 0) {
                        g.push(b);
                        d++;
                    } else {
                        this.f[b.id] = 1;
                    }
                }
                for (a = 0; a < g.length; a++) {
                    utag.loader.AS(g[a]);
                }
                if (d == 0) {
                    utag.loader.END();
                }
            },
            AS: function (a, b, c, d) {
                utag.send[a.id] = a;
                if (typeof a.src == 'undefined') {
                    a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
                }
                a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v ? utag.cfg.template + a.v : utag.cfg.v);
                utag.rpt['l_' + a.id] = a.src;
                b = document;
                this.f[a.id] = 0;
                if (a.load == 2) {
                    utag.DB("Attach sync: " + a.src);
                    a.uid = a.id;
                    b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
                    if (typeof a.cb != 'undefined') a.cb();
                } else if (a.load == 1 || a.load == 3) {
                    if (b.createElement) {
                        c = 'utag_autotrader.at-desktop_' + a.id;
                        if (!b.getElementById(c)) {
                            d = {
                                src: a.src,
                                id: c,
                                uid: a.id,
                                loc: a.loc
                            }
                            if (a.load == 3) {
                                d.type = "iframe"
                            };
                            if (typeof a.cb != 'undefined') d.cb = a.cb;
                            utag.ut.loader(d);
                        }
                    }
                }
            },
            GV: function (a, b, c) {
                b = {};
                for (c in a) {
                    if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
                }
                return b
            },
            OU: function (tid, tcat, a, b, c, d, f, g) {
                g = {};
                utag.loader.RDcp(g);
                try {
                    if (typeof g['cp.OPTOUTMULTI'] != 'undefined') {
                        c = utag.loader.cfg;
                        a = utag.ut.decode(g['cp.OPTOUTMULTI']).split('|');
                        for (d = 0; d < a.length; d++) {
                            b = a[d].split(':');
                            if (b[1] * 1 !== 0) {
                                if (b[0].indexOf('c') == 0) {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tcat == b[0].substring(1)) c[f].load = 0;
                                        if (c[f].tid == tid && c[f].tcat == b[0].substring(1)) return true;
                                    }
                                    if (tcat == b[0].substring(1)) return true;
                                } else if (b[0] * 1 == 0) {
                                    utag.cfg.nocookie = true
                                } else {
                                    for (f in utag.loader.GV(c)) {
                                        if (c[f].tid == b[0]) c[f].load = 0
                                    }
                                    if (tid == b[0]) return true;
                                }
                            }
                        }
                    }
                } catch (e) {
                    utag.DB(e)
                }
                return false;
            },
            RDdom: function (o) {
                var d = document || {},
                    l = location || {};
                o["dom.referrer"] = d.referrer;
                o["dom.title"] = "" + d.title;
                o["dom.domain"] = "" + l.hostname;
                o["dom.query_string"] = ("" + l.search).substring(1);
                o["dom.hash"] = ("" + l.hash).substring(1);
                o["dom.url"] = "" + d.URL;
                o["dom.pathname"] = "" + l.pathname;
                o["dom.viewport_height"] = window.innerHeight || (d.documentElement ? d.documentElement.clientHeight : 960);
                o["dom.viewport_width"] = window.innerWidth || (d.documentElement ? d.documentElement.clientWidth : 960);
            },
            RDcp: function (o, b, c, d) {
                b = utag.loader.RC();
                for (d in b) {
                    if (d.match(/utag_(.*)/)) {
                        for (c in utag.loader.GV(b[d])) {
                            o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
                        }
                    }
                }
                for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
                    if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
                }
            },
            RDqp: function (o, a, b, c) {
                a = location.search + (location.hash + '').replace("#", "&");
                if (utag.cfg.lowerqp) {
                    a = a.toLowerCase()
                };
                if (a.length > 1) {
                    b = a.substring(1).split('&');
                    for (a = 0; a < b.length; a++) {
                        c = b[a].split("=");
                        if (c.length > 1) {
                            o["qp." + c[0]] = utag.ut.decode(c[1])
                        }
                    }
                }
            },
            RDmeta: function (o, a, b, h) {
                a = document.getElementsByTagName("meta");
                for (b = 0; b < a.length; b++) {
                    try {
                        h = a[b].name || a[b].getAttribute("property") || "";
                    } catch (e) {
                        h = "";
                        utag.DB(e)
                    };
                    if (utag.cfg.lowermeta) {
                        h = h.toLowerCase()
                    };
                    if (h != "") {
                        o["meta." + h] = a[b].content
                    }
                }
            },
            RDva: function (o) {
                var readAttr = function (o, l) {
                    var a = "",
                        b;
                    a = localStorage.getItem(l);
                    if (!a || a == "{}") return;
                    b = utag.ut.flatten({
                        va: JSON.parse(a)
                    });
                    utag.ut.merge(o, b, 1);
                }
                try {
                    readAttr(o, "tealium_va");
                    readAttr(o, "tealium_va_" + o["ut.account"] + "_" + o["ut.profile"]);
                } catch (e) {
                    utag.DB(e)
                }
            },
            RDut: function (o, a) {
                var t = {};
                var d = new Date();
                var m = (utag.ut.typeOf(d.toISOString) == "function");
                o["ut.domain"] = utag.cfg.domain;
                o["ut.version"] = utag.cfg.v;
                t["tealium_event"] = o["ut.event"] = a || "view";
                t["tealium_visitor_id"] = o["ut.visitor_id"] = o["cp.utag_main_v_id"];
                t["tealium_session_id"] = o["ut.session_id"] = o["cp.utag_main_ses_id"];
                t["tealium_session_number"] = o["cp.utag_main__sn"];
                t["tealium_session_event_number"] = o["cp.utag_main__se"];
                try {
                    t["tealium_datasource"] = utag.cfg.datasource;
                    t["tealium_account"] = o["ut.account"] = utag.cfg.utid.split("/")[0];
                    t["tealium_profile"] = o["ut.profile"] = utag.cfg.utid.split("/")[1];
                    t["tealium_environment"] = o["ut.env"] = utag.cfg.path.split("/")[6];
                } catch (e) {
                    utag.DB(e)
                }
                t["tealium_random"] = Math.random().toFixed(16).substring(2);
                t["tealium_library_name"] = "ut" + "ag.js";
                t["tealium_library_version"] = (utag.cfg.template + "0").substring(2);
                t["tealium_timestamp_epoch"] = Math.floor(d.getTime() / 1000);
                t["tealium_timestamp_utc"] = (m ? d.toISOString() : "");
                d.setHours(d.getHours() - (d.getTimezoneOffset() / 60));
                t["tealium_timestamp_local"] = (m ? d.toISOString().replace("Z", "") : "");
                utag.ut.merge(o, t, 0);
            },
            RDses: function (o, a, c) {
                a = (new Date()).getTime();
                c = (a + parseInt(utag.cfg.session_timeout)) + "";
                if (!o["cp.utag_main_ses_id"]) {
                    o["cp.utag_main_ses_id"] = a + "";
                    o["cp.utag_main__ss"] = "1";
                    o["cp.utag_main__se"] = "1";
                    o["cp.utag_main__sn"] = (1 + parseInt(o["cp.utag_main__sn"] || 0)) + "";
                } else {
                    o["cp.utag_main__ss"] = "0";
                    o["cp.utag_main__se"] = (1 + parseInt(o["cp.utag_main__se"] || 0)) + "";
                }
                o["cp.utag_main__pn"] = o["cp.utag_main__pn"] || "1";
                o["cp.utag_main__st"] = c;
                utag.loader.SC("utag_main", {
                    "_sn": (o["cp.utag_main__sn"] || 1),
                    "_se": o["cp.utag_main__se"],
                    "_ss": o["cp.utag_main__ss"],
                    "_st": c,
                    "ses_id": (o["cp.utag_main_ses_id"] || a) + ";exp-session",
                    "_pn": o["cp.utag_main__pn"] + ";exp-session"
                });
            },
            RDpv: function (o) {
                if (typeof utag.pagevars == "function") {
                    utag.DB("Read page variables");
                    utag.pagevars(o);
                }
            },
            RD: function (o, a) {
                utag.DB("utag.loader.RD");
                utag.DB(o);
                utag.loader.RDcp(o);
                if (!utag.loader.rd_flag) {
                    utag.loader.rd_flag = 1;
                    o["cp.utag_main_v_id"] = o["cp.utag_main_v_id"] || utag.ut.vi((new Date()).getTime());
                    o["cp.utag_main__pn"] = (1 + parseInt(o["cp.utag_main__pn"] || 0)) + "";
                    utag.loader.SC("utag_main", {
                        "v_id": o["cp.utag_main_v_id"]
                    });
                    utag.loader.RDses(o);
                }
                utag.loader.genOvrd();
                if (a && !utag.cfg.noview) utag.loader.RDses(o);
                utag.loader.RDqp(o);
                utag.loader.RDmeta(o);
                utag.loader.RDdom(o);
                utag.loader.RDut(o, a || "view");
                utag.loader.RDpv(o);
                utag.loader.RDva(o);
            },
            RC: function (a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv, r, s, t) {
                o = {};
                b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
                r = /^(.*?)=(.*)$/;
                s = /^(.*);exp-(.*)$/;
                t = (new Date()).getTime();
                for (c = 0; c < b.length; c++) {
                    if (b[c].match(r)) {
                        ck = RegExp.$1;
                        cv = RegExp.$2;
                    }
                    e = utag.ut.decode(cv);
                    if (typeof ck != "undefined") {
                        if (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0) {
                            e = cv.split("$");
                            g = [];
                            j = {};
                            for (f = 0; f < e.length; f++) {
                                try {
                                    g = e[f].split(":");
                                    if (g.length > 2) {
                                        g[1] = g.slice(1).join(":");
                                    }
                                    v = "";
                                    if (("" + g[1]).indexOf("~") == 0) {
                                        h = g[1].substring(1).split("|");
                                        for (i = 0; i < h.length; i++) h[i] = utag.ut.decode(h[i]);
                                        v = h
                                    } else v = utag.ut.decode(g[1]);
                                    j[g[0]] = v;
                                } catch (er) {
                                    utag.DB(er)
                                };
                            }
                            o[ck] = {};
                            for (f in utag.loader.GV(j)) {
                                if (j[f] instanceof Array) {
                                    n = [];
                                    for (m = 0; m < j[f].length; m++) {
                                        if (j[f][m].match(s)) {
                                            k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                            if (k > t) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                                        }
                                    }
                                    j[f] = n.join("|");
                                } else {
                                    j[f] = "" + j[f];
                                    if (j[f].match(s)) {
                                        k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : t - 1) : parseInt(RegExp.$2);
                                        j[f] = (k < t) ? null : (x == 0 ? j[f] : RegExp.$1);
                                    }
                                }
                                if (j[f]) o[ck][f] = j[f];
                            }
                        } else if (utag.cl[ck] || utag.cl['_all_']) {
                            o[ck] = e
                        }
                    }
                }
                return (a) ? (o[a] ? o[a] : {}) : o;
            },
            SC: function (a, b, c, d, e, f, g, h, i, j, k, x, v) {
                if (!a) return 0;
                if (a == "utag_main" && utag.cfg.nocookie) return 0;
                v = "";
                var date = new Date();
                var exp = new Date();
                exp.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
                x = exp.toGMTString();
                if (c && c == "da") {
                    x = "Thu, 31 Dec 2009 00:00:00 GMT";
                } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
                    if (typeof b != "object") {
                        v = b
                    }
                } else {
                    d = utag.loader.RC(a, 0);
                    for (e in utag.loader.GV(b)) {
                        f = "" + b[e];
                        if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
                            g = date.getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
                            if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
                            f = RegExp.$1 + ";exp-" + g;
                        }
                        if (c == "i") {
                            if (d[e] == null) d[e] = f;
                        } else if (c == "d") delete d[e];
                        else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
                        else if (c == "ap" || c == "au") {
                            if (d[e] == null) d[e] = f;
                            else {
                                if (d[e].indexOf("|") > 0) {
                                    d[e] = d[e].split("|")
                                }
                                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                                g.push(f);
                                if (c == "au") {
                                    h = {};
                                    k = {};
                                    for (i = 0; i < g.length; i++) {
                                        if (g[i].match(/^(.*);exp-(.*)$/)) {
                                            j = RegExp.$1;
                                        }
                                        if (typeof k[j] == "undefined") {
                                            k[j] = 1;
                                            h[g[i]] = 1;
                                        }
                                    }
                                    g = [];
                                    for (i in utag.loader.GV(h)) {
                                        g.push(i);
                                    }
                                }
                                d[e] = g
                            }
                        } else d[e] = f;
                    }
                    h = new Array();
                    for (g in utag.loader.GV(d)) {
                        if (d[g] instanceof Array) {
                            for (c = 0; c < d[g].length; c++) {
                                d[g][c] = encodeURIComponent(d[g][c])
                            }
                            h.push(g + ":~" + d[g].join("|"))
                        } else h.push((g + ":").replace(/[\,\$\;\?]/g, "") + encodeURIComponent(d[g]))
                    }
                    if (h.length == 0) {
                        h.push("");
                        x = ""
                    }
                    v = (h.join("$"));
                }
                document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
                return 1
            },
            LOAD: function (a, b, c, d) {
                if (!utag.loader.cfg) {
                    return
                }
                if (this.ol == 0) {
                    if (utag.loader.cfg[a].block && utag.loader.cfg[a].cbf) {
                        this.f[a] = 1;
                        delete utag.loader.bq[a];
                    }
                    for (b in utag.loader.GV(utag.loader.bq)) {
                        if (utag.loader.cfg[a].load == 4 && utag.loader.cfg[a].wait == 0) {
                            utag.loader.bk[a] = 1;
                            utag.DB("blocked: " + a);
                        }
                        utag.DB("blocking: " + b);
                        return;
                    }
                    utag.loader.INIT();
                    return;
                }
                utag.DB('utag.loader.LOAD:' + a);
                if (this.f[a] == 0) {
                    this.f[a] = 1;
                    if (utag.cfg.noview != true) {
                        if (utag.loader.cfg[a].send) {
                            utag.DB("SENDING: " + a);
                            try {
                                if (utag.loader.sendq.pending > 0 && utag.loader.sendq[a]) {
                                    utag.DB("utag.loader.LOAD:sendq: " + a);
                                    while (d = utag.loader.sendq[a].shift()) {
                                        utag.DB(d);
                                        utag.sender[a].send(d.event, utag.handler.C(d.data));
                                        utag.loader.sendq.pending--;
                                    }
                                } else {
                                    utag.sender[a].send('view', utag.handler.C(utag.data));
                                }
                                utag.rpt['s_' + a] = 0;
                            } catch (e) {
                                utag.DB(e);
                                utag.rpt['s_' + a] = 1;
                            }
                        }
                    }
                    if (utag.loader.rf == 0) return;
                    for (b in utag.loader.GV(this.f)) {
                        if (this.f[b] == 0 || this.f[b] == 2) return
                    }
                    utag.loader.END();
                }
            },
            EV: function (a, b, c, d) {
                if (b == "ready") {
                    if (!utag.data) {
                        try {
                            utag.cl = {
                                '_all_': 1
                            };
                            utag.loader.initdata();
                            utag.loader.RD(utag.data);
                        } catch (e) {
                            utag.DB(e)
                        };
                    }
                    if ((document.attachEvent || utag.cfg.dom_complete) ? document.readyState === "complete" : document.readyState !== "loading") setTimeout(c, 1);
                    else {
                        utag.loader.ready_q.push(c);
                        var RH;
                        if (utag.loader.ready_q.length <= 1) {
                            if (document.addEventListener) {
                                RH = function () {
                                    document.removeEventListener("DOMContentLoaded", RH, false);
                                    utag.loader.run_ready_q()
                                };
                                if (!utag.cfg.dom_complete) document.addEventListener("DOMContentLoaded", RH, false);
                                window.addEventListener("load", utag.loader.run_ready_q, false);
                            } else if (document.attachEvent) {
                                RH = function () {
                                    if (document.readyState === "complete") {
                                        document.detachEvent("onreadystatechange", RH);
                                        utag.loader.run_ready_q()
                                    }
                                };
                                document.attachEvent("onreadystatechange", RH);
                                window.attachEvent("onload", utag.loader.run_ready_q);
                            }
                        }
                    }
                } else {
                    if (a.addEventListener) {
                        a.addEventListener(b, c, false)
                    } else if (a.attachEvent) {
                        a.attachEvent(((d == 1) ? "" : "on") + b, c)
                    }
                }
            },
            END: function (b, c, d, e, v, w) {
                if (this.ended) {
                    return
                };
                this.ended = 1;
                utag.DB("loader.END");
                b = utag.data;
                if (utag.handler.base && utag.handler.base != '*') {
                    e = utag.handler.base.split(",");
                    for (d = 0; d < e.length; d++) {
                        if (typeof b[e[d]] != "undefined") utag.handler.df[e[d]] = b[e[d]]
                    }
                } else if (utag.handler.base == '*') {
                    utag.ut.merge(utag.handler.df, b, 1);
                }
                utag.rpt['r_0'] = "t";
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
                utag.rpt.ts['s'] = new Date();
                v = utag.cfg.path;
                w = v.indexOf(".tiqcdn.");
                if (w > 0 && b["cp.utag_main__ss"] == 1 && !utag.cfg.no_session_count) utag.ut.loader({
                    src: v.substring(0, v.indexOf("/ut" + "ag/") + 6) + "tiqapp/ut" + "ag.v.js?a=" + utag.cfg.utid + (utag.cfg.nocookie ? "&nocookie=1" : "&cb=" + (new Date).getTime()),
                    id: "tiqapp"
                })
                if (utag.cfg.noview != true) utag.handler.RE('view', b, "end");
                utag.handler.INIT();
            }
        },
        DB: function (a, b) {
            if (utag.cfg.utagdb === false) {
                return;
            } else if (typeof utag.cfg.utagdb == "undefined") {
                b = document.cookie + '';
                utag.cfg.utagdb = ((b.indexOf('utagdb=true') >= 0) ? true : false);
            }
            if (utag.cfg.utagdb === true) {
                var t;
                if (utag.ut.typeOf(a) == "object") {
                    t = utag.handler.C(a)
                } else {
                    t = a
                }
                utag.db_log.push(t);
                try {
                    if (!utag.cfg.noconsole) console.log(t)
                } catch (e) {}
            }
        },
        RP: function (a, b, c) {
            if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
                b = [];
                for (c in utag.loader.GV(a)) {
                    if (c != 'src') b.push(c + '=' + escape(a[c]))
                }
                this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')))
            }
        },
        view: function (a, c, d) {
            return this.track({
                event: 'view',
                data: a || {},
                cfg: {
                    cb: c,
                    uids: d
                }
            })
        },
        link: function (a, c, d) {
            return this.track({
                event: 'link',
                data: a || {},
                cfg: {
                    cb: c,
                    uids: d
                }
            })
        },
        track: function (a, b, c, d, e) {
            a = a || {};
            if (typeof a == "string") {
                a = {
                    event: a,
                    data: b || {},
                    cfg: {
                        cb: c,
                        uids: d
                    }
                }
            }
            for (e in utag.loader.GV(utag.o)) {
                utag.o[e].handler.trigger(a.event || "view", a.data || a, a.cfg || {
                    cb: b,
                    uids: c
                })
            }
            a.cfg = a.cfg || {
                cb: b
            };
            if (typeof a.cfg.cb == "function") a.cfg.cb();
            return true
        },
        handler: {
            base: "",
            df: {},
            o: {},
            send: {},
            iflag: 0,
            INIT: function (a, b, c) {
                utag.DB('utag.handler.INIT');
                if (utag.initcatch) {
                    utag.initcatch = 0;
                    return
                }
                this.iflag = 1;
                a = utag.loader.q.length;
                if (a > 0) {
                    utag.DB("Loader queue");
                    for (b = 0; b < a; b++) {
                        c = utag.loader.q[b];
                        utag.handler.trigger(c.a, c.b, c.c)
                    }
                }
            },
            test: function () {
                return 1
            },
            LR: function (b) {
                utag.DB("Load Rules");
                for (var d in utag.loader.GV(utag.cond)) {
                    utag.cond[d] = false;
                }
                utag.DB(b);
                utag.loader.loadrules(b);
                utag.DB(utag.cond);
                utag.loader.initcfg();
                utag.loader.OU();
                for (var r in utag.loader.GV(utag.cond)) {
                    utag.rpt['r_' + r] = (utag.cond[r]) ? "t" : "f";
                }
            },
            RE: function (a, b, c, d, e, f, g) {
                if (c != "alr" && !this.cfg_extend) {
                    return 0;
                }
                utag.DB("RE: " + c);
                if (c == "alr") utag.DB("All Tags EXTENSIONS");
                utag.DB(b);
                if (typeof this.extend != "undefined") {
                    g = 0;
                    for (d = 0; d < this.extend.length; d++) {
                        try {
                            e = 0;
                            if (typeof this.cfg_extend != "undefined") {
                                f = this.cfg_extend[d];
                                if (typeof f.count == "undefined") f.count = 0;
                                if (f[a] == 0 || (f.once == 1 && f.count > 0) || f[c] == 0) {
                                    e = 1
                                } else {
                                    if (f[c] == 1) {
                                        g = 1
                                    };
                                    f.count++
                                }
                            }
                            if (e != 1) {
                                this.extend[d](a, b);
                                utag.rpt['ex_' + d] = 0
                            }
                        } catch (er) {
                            utag.DB(er);
                            utag.rpt['ex_' + d] = 1;
                            utag.ut.error({
                                e: er.message,
                                s: utag.cfg.path + 'utag.js',
                                l: d,
                                t: 'ge'
                            });
                        }
                    }
                    utag.DB(b);
                    return g;
                }
            },
            trigger: function (a, b, c, d, e, f) {
                utag.DB('trigger:' + a + (c && c.uids ? ":" + c.uids.join(",") : ""));
                b = b || {};
                utag.DB(b);
                if (!this.iflag) {
                    utag.DB("trigger:called before tags loaded");
                    for (d in utag.loader.f) {
                        if (!(utag.loader.f[d] === 1)) utag.DB('Tag ' + d + ' did not LOAD')
                    }
                    utag.loader.q.push({
                        a: a,
                        b: utag.handler.C(b),
                        c: c
                    });
                    return;
                }
                utag.ut.merge(b, this.df, 0);
                utag.loader.RD(b, a);
                utag.cfg.noview = false;

                function sendTag(a, b, d) {
                    try {
                        if (typeof utag.sender[d] != "undefined") {
                            utag.DB("SENDING: " + d);
                            utag.sender[d].send(a, utag.handler.C(b));
                            utag.rpt['s_' + d] = 0;
                        } else if (utag.loader.cfg[d].load != 2) {
                            utag.loader.sendq[d] = utag.loader.sendq[d] || [];
                            utag.loader.sendq[d].push({
                                "event": a,
                                "data": utag.handler.C(b)
                            });
                            utag.loader.sendq.pending++;
                            utag.loader.AS({
                                id: d,
                                load: 1
                            });
                        }
                    } catch (e) {
                        utag.DB(e)
                    }
                }
                if (c && c.uids) {
                    this.RE(a, b, "alr");
                    for (f = 0; f < c.uids.length; f++) {
                        d = c.uids[f];
                        if (!utag.loader.OU(utag.loader.cfg[d].tid)) {
                            sendTag(a, b, d);
                        }
                    }
                } else if (utag.cfg.load_rules_ajax) {
                    this.RE(a, b, "blr");
                    this.LR(b);
                    this.RE(a, b, "alr");
                    for (f = 0; f < utag.loader.cfgsort.length; f++) {
                        d = utag.loader.cfgsort[f];
                        if (utag.loader.cfg[d].load && utag.loader.cfg[d].send) {
                            sendTag(a, b, d);
                        }
                    }
                } else {
                    this.RE(a, b, "alr");
                    for (d in utag.loader.GV(utag.sender)) {
                        sendTag(a, b, d);
                    }
                }
                this.RE(a, b, "end");
            },
            C: function (a, b, c) {
                b = {};
                for (c in utag.loader.GV(a)) {
                    if (a[c] instanceof Array) {
                        b[c] = a[c].slice(0)
                    } else {
                        b[c] = a[c]
                    }
                }
                return b
            }
        },
        ut: {
            pad: function (a, b, c, d) {
                a = "" + ((a - 0).toString(16));
                d = '';
                if (b > a.length) {
                    for (c = 0; c < (b - a.length); c++) {
                        d += '0'
                    }
                }
                return "" + d + a
            },
            vi: function (t, a, b) {
                if (!utag.v_id) {
                    a = this.pad(t, 12);
                    b = "" + Math.random();
                    a += this.pad(b.substring(2, b.length), 16);
                    try {
                        a += this.pad((navigator.plugins.length ? navigator.plugins.length : 0), 2);
                        a += this.pad(navigator.userAgent.length, 3);
                        a += this.pad(document.URL.length, 4);
                        a += this.pad(navigator.appVersion.length, 3);
                        a += this.pad(screen.width + screen.height + parseInt((screen.colorDepth) ? screen.colorDepth : screen.pixelDepth), 5)
                    } catch (e) {
                        utag.DB(e);
                        a += "12345"
                    };
                    utag.v_id = a;
                }
                return utag.v_id
            },
            hasOwn: function (o, a) {
                return o != null && Object.prototype.hasOwnProperty.call(o, a)
            },
            isEmptyObject: function (o, a) {
                for (a in o) {
                    if (utag.ut.hasOwn(o, a)) return false
                }
                return true
            },
            isEmpty: function (o) {
                var t = utag.ut.typeOf(o);
                if (t == "number") {
                    return isNaN(o)
                } else if (t == "boolean") {
                    return false
                } else if (t == "string") {
                    return o.length === 0
                } else return utag.ut.isEmptyObject(o)
            },
            typeOf: function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            },
            flatten: function (o) {
                var a = {};

                function r(c, p) {
                    if (Object(c) !== c || c instanceof Array) {
                        a[p] = c;
                    } else {
                        if (utag.ut.isEmptyObject(c)) {} else {
                            for (var d in c) {
                                r(c[d], p ? p + "." + d : d);
                            }
                        }
                    }
                }
                r(o, "");
                return a;
            },
            merge: function (a, b, c, d) {
                if (c) {
                    for (d in utag.loader.GV(b)) {
                        a[d] = b[d]
                    }
                } else {
                    for (d in utag.loader.GV(b)) {
                        if (typeof a[d] == "undefined") a[d] = b[d]
                    }
                }
            },
            decode: function (a, b) {
                b = "";
                try {
                    b = decodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                };
                if (b == "") {
                    b = unescape(a)
                };
                return b
            },
            encode: function (a, b) {
                b = "";
                try {
                    b = encodeURIComponent(a)
                } catch (e) {
                    utag.DB(e)
                };
                if (b == "") {
                    b = escape(a)
                };
                return b
            },
            error: function (a, b, c) {
                if (typeof utag_err != "undefined") {
                    utag_err.push(a)
                }
            },
            loader: function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        m.parentNode.removeChild(m);
                    }
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id
                };
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l])
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                if (typeof o.error == "function") {
                    utag.loader.EV(b, "error", o.error);
                }
                if (o.type != "img") {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b)
                        }
                    }
                }
            }
        }
    };
    utag.o['autotrader.at-desktop'] = utag;
    utag.cfg = {
        template: "ut4.46.",
        load_rules_ajax: true,
        load_rules_at_wait: false,
        lowerqp: false,
        noconsole: false,
        session_timeout: 1800000,
        readywait: 1,
        noload: 0,
        domain: utag.loader.lh(),
        datasource: "##UTDATASOURCE##".replace("##" + "UTDATASOURCE##", ""),
        path: "//tags.tiqcdn.com/utag/autotrader/at-desktop/prod/",
        utid: "autotrader/at-desktop/202105211620"
    };
    utag.cfg.v = utag.cfg.template + "202105211620";
    utag.cond = {
        144: 0,
        147: 0,
        150: 0,
        15: 0,
        162: 0,
        164: 0,
        166: 0,
        170: 0,
        174: 0,
        178: 0,
        195: 0,
        196: 0,
        197: 0,
        208: 0,
        210: 0,
        211: 0,
        212: 0,
        215: 0,
        216: 0,
        217: 0,
        218: 0,
        219: 0,
        223: 0,
        225: 0,
        226: 0,
        227: 0,
        228: 0,
        229: 0,
        230: 0,
        232: 0,
        235: 0,
        241: 0,
        242: 0,
        244: 0,
        245: 0,
        246: 0,
        247: 0,
        248: 0,
        249: 0,
        30: 0,
        40: 0,
        43: 0,
        48: 0,
        52: 0,
        62: 0,
        63: 0,
        79: 0,
        87: 0,
        88: 0,
        91: 0
    };
    utag.pagevars = function (ud) {
        ud = ud || utag.data;
        try {
            ud['js_page.tvSquaredConsentGiven'] = tvSquaredConsentGiven
        } catch (e) {
            utag.DB(e)
        };
        try {
            ud['js_page.tiktokConsentGiven'] = tiktokConsentGiven
        } catch (e) {
            utag.DB(e)
        };
        try {
            ud['js_page.utag.id'] = utag.id
        } catch (e) {
            utag.DB(e)
        };
        try {
            ud['js_page.utag_data.postcode'] = utag_data.postcode
        } catch (e) {
            utag.DB(e)
        };
        try {
            ud['js_page.utag_data.location_Postcode'] = utag_data.location_Postcode
        } catch (e) {
            utag.DB(e)
        };
        try {
            ud['js_page.sophus3ConsentGiven'] = sophus3ConsentGiven
        } catch (e) {
            utag.DB(e)
        };
        try {
            ud['js_page.snapIncConsentGiven'] = snapIncConsentGiven
        } catch (e) {
            utag.DB(e)
        };
    };
    utag.loader.initdata = function () {
        try {
            utag.data = (typeof utag_data != 'undefined') ? utag_data : {};
            utag.udoname = 'utag_data';
        } catch (e) {
            utag.data = {};
            utag.DB('idf:' + e);
        }
    };
    utag.loader.loadrules = function (_pd, _pc) {
        var d = _pd || utag.data;
        var c = _pc || utag.cond;
        for (var l in utag.loader.GV(c)) {
            switch (l) {
                case '144':
                    try {
                        c[144] |= (d['page_name'].toString().toLowerCase().indexOf('pola'.toLowerCase()) < 0 && typeof d['section'] != 'undefined' && d['section'].toString().toLowerCase().indexOf('guaranteed-sale'.toLowerCase()) < 0 && d['section'].toString().toLowerCase().indexOf('pola'.toLowerCase()) < 0) || (d['page_name'].toString().toLowerCase().indexOf('pola'.toLowerCase()) < 0 && typeof d['section'] == 'undefined')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '147':
                    try {
                        c[147] |= (d['channel'].toString().toLowerCase() != 'trucks'.toLowerCase() && d['channel'].toString().toLowerCase() != 'plant'.toLowerCase() && d['channel'].toString().toLowerCase() != 'farm'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '15':
                    try {
                        c[15] |= (d['page_name'] == 'cars:search:ad-view')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '150':
                    try {
                        c[150] |= (d['page_name'].toString().indexOf('live-chat:business-card') < 0)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '162':
                    try {
                        c[162] |= (d['page_name'].toString().toLowerCase() != 'my-at:sign-in'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '164':
                    try {
                        c[164] |= (d['tealium_event'].toString().toLowerCase() == 'view'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '166':
                    try {
                        c[166] |= (d['ut.event'].toString().indexOf('view') > -1 && /:ad-view$/i.test(d['page_name']))
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '170':
                    try {
                        c[170] |= (typeof d['channel_closer'] != 'undefined' && d['channel_closer'].toString().toLowerCase().indexOf('partnerize'.toLowerCase()) > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '174':
                    try {
                        c[174] |= (/:ad-view$/i.test(d['page_name']) && /(configurator-stock|allocated-stock|virtual-stock|network-stock)/.test(d['advert_attributes']) && d['ut.event'] == 'view')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '178':
                    try {
                        c[178] |= (/^\/bike-search/.test(d['dom.pathname']))
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '195':
                    try {
                        c[195] |= (/^\/van-search/.test(d['dom.pathname']))
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '196':
                    try {
                        c[196] |= (/^\/motorhome-search/.test(d['dom.pathname']))
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '197':
                    try {
                        c[197] |= (/^\/caravan-search/.test(d['dom.pathname']))
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '208':
                    try {
                        c[208] |= (/^plant/i.test(d['dom.domain'])) || (/^trucks/i.test(d['dom.domain'])) || (/^farm/i.test(d['dom.domain'])) || (typeof d['facebookConsentGiven'] != 'undefined' && d['facebookConsentGiven'].toString().toLowerCase() == 'true'.toLowerCase() && d['tealium_profile'].toString().toLowerCase() == 'at-desktop'.toLowerCase()) || (typeof d['facebookConsentGiven'] != 'undefined' && d['facebookConsentGiven'].toString().toLowerCase() == 'true'.toLowerCase() && d['tealium_profile'].toString().toLowerCase() == 'at-mobile-web'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '210':
                    try {
                        c[210] |= (d['page_name'].toString().toLowerCase().indexOf('pola'.toLowerCase()) < 0 && d['section'].toString().toLowerCase().indexOf('pola'.toLowerCase()) < 0 && d['section'].toString().toLowerCase().indexOf('guaranteed-sale'.toLowerCase()) < 0)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '211':
                    try {
                        c[211] |= (d['page_name'].toString().toLowerCase().indexOf('pola'.toLowerCase()) < 0 && d['section'].toString().toLowerCase().indexOf('pola'.toLowerCase()) < 0 && d['section'].toString().toLowerCase().indexOf('guaranteed-sale'.toLowerCase()) < 0)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '212':
                    try {
                        c[212] |= (typeof d['sophus3ConsentGiven'] != 'undefined' && d['sophus3ConsentGiven'] == 'true') || (/^plant/i.test(d['dom.domain'])) || (/^trucks/i.test(d['dom.domain'])) || (/^farm/i.test(d['dom.domain'])) || (d['tealium_environment'].toString().toLowerCase() == 'prod'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '215':
                    try {
                        c[215] |= (typeof d['js_page.snapIncConsentGiven'] != 'undefined' && d['js_page.snapIncConsentGiven'] == 'true' && d['tealium_profile'].toString().toLowerCase() == 'at-desktop'.toLowerCase()) || (/^farm/i.test(d['dom.domain'])) || (/^trucks/i.test(d['dom.domain'])) || (/^plant/i.test(d['dom.domain'])) || (typeof d['js_page.snapIncConsentGiven'] != 'undefined' && d['js_page.snapIncConsentGiven'] == 'true' && d['tealium_profile'].toString().toLowerCase() == 'at-mobile-web'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '216':
                    try {
                        c[216] |= (typeof d['twitterConsentGiven'] != 'undefined' && d['twitterConsentGiven'] == 'true' && d['tealium_profile'].toString().toLowerCase() == 'at-desktop'.toLowerCase()) || (/^farm/i.test(d['dom.domain'])) || (/^trucks/i.test(d['dom.domain'])) || (/^plant/i.test(d['dom.domain'])) || (typeof d['twitterConsentGiven'] != 'undefined' && d['twitterConsentGiven'] == 'true' && d['tealium_profile'].toString().toLowerCase() == 'at-mobile-web'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '217':
                    try {
                        c[217] |= (d['page_name'].toString().indexOf('leasing:product') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '218':
                    try {
                        c[218] |= (d['page_name'].toString().indexOf('leasing:confirmation') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '219':
                    try {
                        c[219] |= (typeof d['page_name'] != 'undefined' && d['page_name'] != '' && d['page_name'].toString().indexOf(':search:ad-view:email-sent') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '223':
                    try {
                        c[223] |= (d['page_name'].toString().toLowerCase() == 'cars:search:ad-view:email-sent'.toLowerCase() && d['advert_attributes'].toString().indexOf('allocated-stock') < 0 && d['advert_attributes'].toString().indexOf('network-stock') < 0 && d['tealium_event'].toString().toLowerCase() == 'view'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '225':
                    try {
                        c[225] |= (d['custom_metric_view_map'] == '1')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '226':
                    try {
                        c[226] |= (d['custom_metrics_get_directions'] == '1')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '227':
                    try {
                        c[227] |= (d['custom_metric_dealer_website'] == '1')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '228':
                    try {
                        c[228] |= (d['custom_metric_send_sms'] == '1')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '229':
                    try {
                        c[229] |= (d['custom_metric_chat_initiated'] == '1')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '230':
                    try {
                        c[230] |= (d['custom_metric_call_seller'] == '1')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '232':
                    try {
                        c[232] |= (d['page_name'].toString().toLowerCase() == 'cars:home'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (/:search:known:results$/i.test(d['page_name']) && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (/^cars:content-hub:/i.test(d['page_name']) && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'cars:deals'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'vehicles-youre-selling'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (/^cars:condition-report-app:/i.test(d['page_name']) && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'cars:motoring-products:valuations:yourvaluation:instant-offer'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (/^cars:sauron-content-app:matchmaker/i.test(d['page_name']) && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'cars:pola:new:step4a:payment-accepted'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'cars:search:ad-view:email-sent'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'cars:condition-report-app:gpx-confirmation'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'cars:condition-report-app:valuation-submitted'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'cars:leasing:confirmation'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'cars:motoring-products:valuations:yourvaluation:selling'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'cars:motoring-products:valuations:yourvaluation:buying'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'my-at:saved-searches'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase() == 'my-at:saved-ads'.toLowerCase() && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '235':
                    try {
                        c[235] |= (d['js_page.tvSquaredConsentGiven'] == 'true' && typeof d['js_page.tvSquaredConsentGiven'] != 'undefined' && d['tealium_profile'].toString().toLowerCase() == 'at-desktop'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '241':
                    try {
                        c[241] |= (d['ut.event'] == 'view')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '242':
                    try {
                        c[242] |= (typeof d['js_page.tiktokConsentGiven'] != 'undefined' && d['js_page.tiktokConsentGiven'] == 'true')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '244':
                    try {
                        c[244] |= (typeof d['quantcastConsentGiven'] != 'undefined' && d['quantcastConsentGiven'] == 'true')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '245':
                    try {
                        c[245] |= (d['page_name'].toString().toLowerCase().indexOf('cars:pola:new:step4a:payment-accepted'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase().indexOf('view'.toLowerCase()) > -1) || (d['page_name'].toString().toLowerCase().indexOf('search:ad-view:email-sent'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase().indexOf('view'.toLowerCase()) > -1) || (d['page_name'].toString().toLowerCase().indexOf('cars:condition-report-app:gpx-confirmation'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase().indexOf('cars:condition-report-app:valuation-submitted'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase().indexOf('cars:leasing:confirmation'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase().indexOf('cars:motoring-products:valuations:yourvaluation:selling'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase().indexOf('cars:motoring-products:valuations:yourvaluation:buying'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase().indexOf('cars:motoring-products:valuations:your valuation:selling'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase().indexOf('cars:motoring-products:valuations:your valuation:buying'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) || (d['page_name'].toString().toLowerCase().indexOf('reservations-reserved'.toLowerCase()) > -1 && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '246':
                    try {
                        c[246] |= (d['ut.event'] == 'link')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '247':
                    try {
                        c[247] |= (d['ut.event'] == 'link' && d['dom.pathname'].toString().toLowerCase() == '/cars/electric/giveaway'.toLowerCase() && d['action'] == 'click' && d['label'] == 'competition entry') || (d['ut.event'] == 'link' && d['action'] == 'click' && d['label'] == 'call button' && d['category'] == 'leads-link')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '248':
                    try {
                        c[248] |= (typeof d['cjAffiliateConsentGiven'] != 'undefined' && d['cjAffiliateConsentGiven'] == 'true' && d['ut.event'] == 'view')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '249':
                    try {
                        c[249] |= (/(cars:pola:new:step4a:payment-accepted|search:ad-view:email-sent|cars:condition-report-app:gpx-confirmation|cars:condition-report-app:valuation-submitted|cars:leasing:confirmation|cars:motoring-products:valuations:your\s*valuation:(selling|buying)|reservations-reserved)/.test(d['page_name']) && d['ut.event'].toString().toLowerCase() == 'view'.toLowerCase() && typeof d['cjAffiliateConsentGiven'] != 'undefined' && d['cjAffiliateConsentGiven'] == 'true')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '30':
                    try {
                        c[30] |= (d['page_name'] == 'cars:home') || (d['page_name'] == 'cars:content-hub:home') || (d['page_name'] == 'cars:content-hub:all-car-expert-reviews') || (d['page_name'] == 'cars:content-hub:expert-review') || (/^\/new-cars/i.test(d['dom.pathname'])) || (/^\/search\/new-car-dealers/i.test(d['dom.pathname'])) || (d['page_name'] == 'cars:search:known:form') || (/^cars:search:discovery/.test(d['page_name'])) || (d['page_name'] == 'cars:make') || (d['page_name'] == 'cars:make-model') || (d['page_name'] == 'cars:content-hub:all-car-first-drives') || (d['page_name'] == 'cars:content-hub:firstDrive')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '40':
                    try {
                        c[40] |= (d['page_name'].toString().indexOf('cars:pola:new:step3a:select-package-payment') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '43':
                    try {
                        c[43] |= (d['page_name'] == 'cars:search:ad-view') || (d['page_name'] == 'bikes:search:ad-view') || (d['page_name'] == 'vans:search:ad-view') || (d['page_name'] == 'motorhomes:search:ad-view') || (d['page_name'] == 'caravans:search:ad-view') || (d['page_name'] == 'trucks:search:ad-view') || (d['page_name'] == 'farm:search:ad-view') || (d['page_name'] == 'plant:search:ad-view')
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '48':
                    try {
                        c[48] |= (d['page_name'].toString().indexOf('pola') > -1 && d['page_name'].toString().indexOf('step4a:payment-accepted') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '52':
                    try {
                        c[52] |= (d['page_name'].toString().toLowerCase() == 'trucks:search:known:results'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '62':
                    try {
                        c[62] |= (d['page_name'].toString().toLowerCase() == 'plant:search:known:results'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '63':
                    try {
                        c[63] |= (d['page_name'].toString().toLowerCase() == 'farm:search:known:results'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '79':
                    try {
                        c[79] |= (d['tealium_event'].toString().toLowerCase() == 'view'.toLowerCase() && d['page_name'].toString().toLowerCase() == 'cars:search:ad-view:email-sent'.toLowerCase() && /(allocated-stock|network-stock)/.test(d['advert_attributes'])) || (d['tealium_event'].toString().toLowerCase() == 'view'.toLowerCase() && d['page_name'].toString().toLowerCase() == 'cars:configurator:confirmation'.toLowerCase())
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '87':
                    try {
                        c[87] |= (d['page_name'].toString().indexOf('live-chat:business-card') < 0)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '88':
                    try {
                        c[88] |= (d['page_name'].toString().indexOf('live-chat:business-card') < 0)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
                case '91':
                    try {
                        c[91] |= (d['page_name'].toString().indexOf('pola') > -1 && d['page_name'].toString().indexOf('step2a:price') > -1)
                    } catch (e) {
                        utag.DB(e)
                    };
                    break;
            }
        }
    };
    utag.pre = function () {
        utag.loader.initdata();
        utag.pagevars();
        try {
            utag.loader.RD(utag.data)
        } catch (e) {
            utag.DB(e)
        };
        utag.loader.loadrules();
    };
    utag.loader.GET = function () {
        utag.cl = {
            '_all_': 1
        };
        utag.pre();
        utag.handler.extend = [function (a, b) {
            try {
                if (b['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) {
                    window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
                    if (window.utag_cfg_ovrd.noview == true) {
                        utag.cfg.noview = true;
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((b['page_name'] == 'cars:pola:new:step4a:payment-accepted' && b['dom.pathname'].toString().indexOf('publish') > -1)) {
                    b['pola_publish_free'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b, c, d, e, f, g) {
            if (1) {
                d = b['page_name'];
                if (typeof d == 'undefined') return;
                c = [{
                    'vans:search:ad-view': 'vans_search_ad-view'
                }, {
                    'bikes:search:ad-view': 'bikes_search_ad-view'
                }, {
                    'motorhomes:search:ad-view': 'motorhomes_search_ad-view'
                }, {
                    'plant:search:ad-view': 'plant_search_ad-view'
                }, {
                    'farm:search:ad-view': 'farm_search_ad-view'
                }, {
                    'trucks:search:ad-view': 'trucks_search_ad-view'
                }, {
                    'cars:new-cars:selector:confirmation': 'cars_new-cars_selector_confirmation'
                }, {
                    'cars:search:ad-view:confirmation': 'cars_search_ad-view_confirmation'
                }, {
                    'cars:motoring-products:valuations:your valuation:buying': 'cars_motoring-products_valuations_your valuation_buying'
                }, {
                    'cars:motoring-products:valuations:your valuation:selling': 'cars_motoring-products_valuations_your valuation_selling'
                }, {
                    'cars:search:ad-view': 'cars_search_ad-view'
                }, {
                    'cars:pola:new:step4a:payment-accepted': 'cars_pola_new_step4a_payment-accepted'
                }, {
                    'cars:pola:rebook:step4a:payment-accepted': 'cars_pola_rebook_step4a_payment-accepted'
                }, {
                    'cars:px-guide:valuation-found': 'cars_px-guide_valuation-found'
                }, {
                    'vans:pola:new:step4a:payment-accepted': 'vans_pola_new_step4a_payment-accepted'
                }, {
                    'bikes:pola:new:step4a:payment-accepted': 'bikes_pola_new_step4a_payment-accepted'
                }, {
                    'vans:pola:rebook:step4a:payment-accepted': 'vans_pola_rebook_step4a_payment-accepted'
                }, {
                    'bikes:pola:rebook:step4a:payment-accepted': 'bikes_pola_rebook_step4a_payment-accepted'
                }, {
                    'trucks:cola:new:step4a:payment-accepted': 'trucks_cola_new_step4a_payment-accepted'
                }, {
                    'plant:cola:new:step4a:payment-accepted': 'plant_cola_new_step4a_payment-accepted'
                }, {
                    'farm:cola:new:step4a:payment-accepted': 'farm_cola_new_step4a_payment-accepted'
                }, {
                    'bikes:pola:homepage': 'bikes_pola_homepage'
                }, {
                    'vans:pola:homepage': 'vans_pola_homepage'
                }, {
                    'cars:motoring-products:valuations:homepage': 'cars_motoring-products_valuations_homepage'
                }, {
                    'cars:motoring-products:valuations:vehicle-reg': 'cars_motoring-products_valuations_vehicle-reg'
                }, {
                    'cars:motoring-products:valuations:vehicle-details': 'cars_motoring-products_valuations_vehicle-details'
                }, {
                    'cars:part-exchange:homepage': 'cars_part-exchange_homepage'
                }, {
                    'cars:px-guide:enter-reg-mileage': 'cars_px-guide_enter-reg-mileage'
                }, {
                    'cars:px-guide:vehicle-found': 'cars_px-guide_vehicle-found'
                }, {
                    'cars:px-guide:enter-personal-details': 'cars_px-guide_enter-personal-details'
                }, {
                    'cars:pola:homepage': 'cars_pola_homepage'
                }, {
                    'cars:make-model': 'cars_make-model'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        if (d == f) {
                            b['twitter_event_name'] = c[e][f];
                            m = true
                        };
                    };
                    if (m) break
                };
            }
        }, function (a, b) {
            try {
                if ((b['page_name_granular'].toString().indexOf(':known:results-pg[1]') > -1 && typeof b['deposit'] != 'undefined' && b['deposit'] != '')) {
                    b['monthly_finance_search_fb_trigger'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['event_label'] == 'view-website' && b['page_name'] == 'plant:search:ad-view')) {
                    b['plant_sellers_website_fb_trigger'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['event_label'] == 'email-seller' && b['page_name'] == 'plant:search:ad-view')) {
                    b['plant_email_seller_fb_trigger'] = 'CompleteRegistration'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['event_label'] == 'get-directions' && b['page_name'] == 'plant:search:ad-view')) {
                    b['plant_get_directions_fb_trigger'] = 'InitiateCheckout'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b, c, d, e, f, g) {
            if (1) {
                d = b['page_name'];
                if (typeof d == 'undefined') return;
                c = [{
                    'vans:search:ad-view': 'vans_search_ad-view'
                }, {
                    'bikes:search:ad-view': 'bikes_search_ad-view'
                }, {
                    'motorhomes:search:ad-view': 'motorhomes_search_ad-view'
                }, {
                    'plant:search:ad-view': 'plant_search_ad-view'
                }, {
                    'farm:search:ad-view': 'farm_search_ad-view'
                }, {
                    'trucks:search:ad-view': 'trucks_search_ad-view'
                }, {
                    'cars:new-cars:selector:confirmation': 'cars_new-cars_selector_confirmation'
                }, {
                    'cars:search:ad-view:confirmation': 'cars_search_ad-view_confirmation'
                }, {
                    'cars:motoring-products:valuations:your valuation:buying': 'cars_motoring-products_valuations_your valuation_buying'
                }, {
                    'cars:motoring-products:valuations:your valuation:selling': 'cars_motoring-products_valuations_your valuation_selling'
                }, {
                    'cars:search:ad-view': 'cars_search_ad-view'
                }, {
                    'cars:new-cars:selector:confirmation': 'cars_new-cars_selector_confirmation'
                }, {
                    'cars:search:ad-view:enter-details': 'cars_search_ad-view_enter-details'
                }, {
                    'cars:search:ad-view:confirmation': 'cars_search_ad-view_confirmation'
                }, {
                    'cars:search:ad-view:email-form': 'cars_search_ad-view_email-form'
                }, {
                    'cars:search:ad-view:email-sent': 'cars_search_ad-view_email-sent'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        if (d == f) {
                            b['snapchat_event_trigger'] = c[e][f];
                            m = true
                        };
                    };
                    if (m) break
                };
            }
        }, function (a, b) {
            try {
                if ((b['page_name_granular'].toString().indexOf(':known:results-pg[1]') > -1 && typeof b['deposit'] != 'undefined' && b['deposit'] != '')) {
                    b['monthly_finance_search_fb_trigger'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (typeof b['dom.url'] != 'undefined') {
                    b['view_content_trigger'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['ut.event'].toString().toLowerCase() == 'view'.toLowerCase()) {
                    b['floodlight_trigger'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (1) {
                    b['trigger'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b, c, d, e, f, g, h, i, j, t, o) {
            o = {
                channel: '',
                category: '',
                exp: 30
            };
            if (a == 'view') {
                if (typeof b['qp.source'] != 'undefined' && b['qp.source'].toString().toLowerCase().indexOf('partnerize'.toLowerCase()) > -1) {
                    o.channel = 'Partnerize';
                    o.category = 'affiliate'
                }
                var dd = (isNaN(utag.cfg.domain.replace('.', ''))) ? utag.cfg.domain : location.hostname;
                dd = ' domain=' + dd + '; path=/;';
                if (o.channel != '') {
                    var exp = new Date().getTime() + 2592000000;
                    var expd = new Date(new Date().getTime() + 2592000000).toGMTString();
                    if (typeof b['cp.channelflow'] == 'undefined' && b['cp.channelflow'] != '') {
                        b['cp.channelflow'] = o.channel + '|' + o.category + '|' + exp;
                    } else {
                        var ncf = [];
                        var bcf = b['cp.channelflow'].split(',');
                        for (var i = bcf.length - 1; i > -1; i--) {
                            var chan = bcf[i].split('|');
                            if (i == (bcf.length - 1) && chan[0] == o.channel && chan[1] == o.category) {
                                bcf[i] = o.channel + '|' + o.category + '|' + exp;
                            } else if (i == (bcf.length - 1) && chan[0] != o.channel) {
                                ncf.push(o.channel + '|' + o.category + '|' + exp);
                            } else if (parseInt(chan[2]) <= (new Date().getTime() - 86400000 * o.exp)) {
                                bcf.splice(i, 1);
                            }
                        }
                        bcf = bcf.concat(ncf);
                        b['cp.channelflow'] = bcf.join();
                    }
                    document.cookie = 'channelflow=' + b['cp.channelflow'] + ';' + ' expires=' + expd + ';' + dd;
                    if (typeof b['cp.channeloriginator'] == 'undefined') {
                        b['cp.channeloriginator'] = o.channel;
                        document.cookie = 'channeloriginator=' + o.channel + ';' + ' expires=' + expd + ';' + dd;
                    }
                    b['cp.channelcloser'] = o.channel;
                    document.cookie = 'channelcloser=' + o.channel + ';' + ' expires=' + expd + ';' + dd;
                }
                if (typeof b['cp.channelflow'] != 'undefined') {
                    c = b['cp.channelflow'].split(','), e = [], f = [];
                    for (d = 0; d < c.length; d++) {
                        g = c[d].split('|');
                        if (!g[2] || g[2] == 0 || parseInt(g[2]) >= (new Date().getTime() - 86400000 * o.exp)) {
                            e.push(g[0]);
                            f.push(g[1])
                        }
                    };
                    if (e.length > 0) {
                        b['channel_originator'] = e[0];
                        b['channel_category_originator'] = f[0];
                        b['channel_closer'] = e[e.length - 1];
                        b['channel_category_closer'] = f[f.length - 1];
                        b['channel_path'] = e.join(',');
                        b['channel_category_path'] = f.join(',');
                        if (e.length == 1) {
                            b['channel_influencer'] = e[0];
                            b['channel_category_influencer'] = f[0];
                        } else {
                            e.pop();
                            f.pop();
                            e.shift();
                            f.shift();
                            t = {};
                            g = [];
                            h = [];
                            for (i = 0; i < e.length; i++) {
                                if (t[e[i] + '|' + f[i]] != 1) {
                                    g.push(e[i]);
                                    h.push(f[i])
                                } else t[e[i] + '|' + f[i]] = 1
                            };
                            e = g;
                            f = h;
                            b['channel_influencer'] = e.join(',');
                            b['channel_category_influencer'] = f.join(',');
                            b['channel_influencer_length'] = e.length;
                        }
                    } else {
                        b['channel_originator'] = '';
                        b['channel_category_originator'] = '';
                        b['channel_closer'] = '';
                        b['channel_category_closer'] = '';
                        b['channel_influencer'] = '';
                        b['channel_category_influencer'] = '';
                        b['channel_path'] = '';
                        b['channel_category_path'] = '';
                    }
                    var c = {
                            o: '0',
                            i: '0',
                            c: '100'
                        },
                        cc = {
                            o: 0,
                            i: 0,
                            c: 0
                        },
                        cv = b[''];
                    if (parseFloat(cv) > 0) {
                        cc.o = cv * parseFloat(c.o / 100);
                        if (b['channel_influencer_length'] < 1) b['channel_influencer_length'] = 1;
                        cc.i = parseFloat((cv * parseFloat(c.i / 100)) / b['channel_influencer_length']);
                        cc.c = cv * parseFloat(c.c / 100);
                        for (i in utag.loader.GV(cc)) {
                            cc[i] = cc[i].toFixed(2);
                        }
                    };
                    b['channel_influencer_credit'] = cc.i;
                    b['channel_originator_credit'] = cc.o;
                    b['channel_closer_credit'] = cc.c;
                }
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('fpa-map-view') > -1 && b['category'].toString().indexOf('leads-link') > -1)) {
                    b['custom_metric_view_map'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('fpa-get-directions') > -1 && b['category'].toString().indexOf('leads-link') > -1)) {
                    b['custom_metrics_get_directions'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('view website') > -1 && b['category'].toString().indexOf('leads-link') > -1)) {
                    b['custom_metric_dealer_website'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((/(live chat|chat-now)/.test(b['label']) && b['category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_chat_initiated'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('chat-overlay-send-text') > -1 && b['category'].toString().indexOf('leads') > -1) || (b['category'].toString().indexOf('leads') > -1 && b['label'].toString().indexOf('dealer text') > -1)) {
                    b['custom_metric_send_sms'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('call button') > -1 && b['category'].toString().indexOf('leads') > -1 && b['platform'].toString().indexOf('mobile-web') > -1) || (b['label'].toString().indexOf('call number') > -1 && b['category'].toString().indexOf('leads') > -1 && b['platform'].toString().indexOf('mobile-web') > -1) || (b['label'].toString().indexOf('call confirm') > -1 && b['category'].toString().indexOf('leads') > -1) || (b['label'].toString().indexOf('call-confirm') > -1 && b['category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_call_seller'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b, c, d) {
            b._ccity = '';
            b._ccountry = '';
            b._ccurrency = '';
            b._ccustid = '';
            b._corder = (typeof b['order_id'] != 'undefined') ? b['order_id'] : '';
            b._cpromo = (typeof b['product_coupon_code'] != 'undefined') ? b['product_coupon_code'] : '';
            b._cship = '';
            b._cstate = '';
            b._cstore = '';
            b._csubtotal = '';
            b._ctax = '';
            b._ctotal = (typeof b['order_total'] != 'undefined') ? b['order_total'] : '';
            b._ctype = '';
            b._czip = '';
            b._cprod = (typeof b['product_id'] != 'undefined' && b['product_id'].length > 0) ? b['product_id'] : [];
            b._cprodname = (typeof b['product_name'] != 'undefined' && b['product_name'].length > 0) ? b['product_name'] : [];
            b._cbrand = (typeof b['product_brand'] != 'undefined' && b['product_brand'].length > 0) ? b['product_brand'] : [];
            b._ccat = (typeof b['product_category'] != 'undefined' && b['product_category'].length > 0) ? b['product_category'] : [];
            b._ccat2 = (typeof b['product_variant'] != 'undefined' && b['product_variant'].length > 0) ? b['product_variant'] : [];
            b._cquan = (typeof b['product_quantity'] != 'undefined' && b['product_quantity'].length > 0) ? b['product_quantity'] : [];
            b._cprice = (typeof b['product_unit_price'] != 'undefined' && b['product_unit_price'].length > 0) ? b['product_unit_price'] : [];
            b._csku = [];
            b._cpdisc = [];
            if (b._cprod.length == 0) {
                b._cprod = b._csku.slice()
            };
            if (b._cprodname.length == 0) {
                b._cprodname = b._csku.slice()
            };

            function tf(a) {
                if (a == '' || isNaN(parseFloat(a))) {
                    return a
                } else {
                    return (parseFloat(a)).toFixed(2)
                }
            };
            b._ctotal = tf(b._ctotal);
            b._csubtotal = tf(b._csubtotal);
            b._ctax = tf(b._ctax);
            b._cship = tf(b._cship);
            for (c = 0; c < b._cprice.length; c++) {
                b._cprice[c] = tf(b._cprice[c])
            };
            for (c = 0; c < b._cpdisc.length; c++) {
                b._cpdisc[c] = tf(b._cpdisc[c])
            };
        }, function (a, b) {
            b.event_timestamp = (new Date(parseInt(utag.data["cp.utag_main_ses_id"]))).toString()
        }, function (a, b, c, d, e, f, g) {
            if (1) {
                d = b['page_name'];
                if (typeof d == 'undefined') return;
                c = [{
                    'vans:search:ad-view': 'vans_search_ad-view'
                }, {
                    'bikes:search:ad-view': 'bikes_search_ad-view'
                }, {
                    'motorhomes:search:ad-view': 'motorhomes_search_ad-view'
                }, {
                    'plant:search:ad-view': 'plant_search_ad-view'
                }, {
                    'farm:search:ad-view': 'farm_search_ad-view'
                }, {
                    'trucks:search:ad-view': 'trucks_search_ad-view'
                }, {
                    'cars:new-cars:selector:confirmation': 'cars_new-cars_selector_confirmation'
                }, {
                    'cars:search:ad-view:confirmation': 'cars_search_ad-view_confirmation'
                }, {
                    'cars:motoring-products:valuations:your valuation:buying': 'cars_motoring-products_valuations_your valuation_buying'
                }, {
                    'cars:motoring-products:valuations:your valuation:selling': 'cars_motoring-products_valuations_your valuation_selling'
                }, {
                    'cars:search:ad-view': 'cars_search_ad-view'
                }, {
                    'cars:pola:new:step4a:payment-accepted': 'cars_pola_new_step4a_payment-accepted'
                }, {
                    'cars:pola:rebook:step4a:payment-accepted': 'cars_pola_rebook_step4a_payment-accepted'
                }, {
                    'cars:px-guide:valuation-found': 'cars_px-guide_valuation-found'
                }, {
                    'vans:pola:new:step4a:payment-accepted': 'vans_pola_new_step4a_payment-accepted'
                }, {
                    'bikes:pola:new:step4a:payment-accepted': 'bikes_pola_new_step4a_payment-accepted'
                }, {
                    'vans:pola:rebook:step4a:payment-accepted': 'vans_pola_rebook_step4a_payment-accepted'
                }, {
                    'bikes:pola:rebook:step4a:payment-accepted': 'bikes_pola_rebook_step4a_payment-accepted'
                }, {
                    'trucks:cola:new:step4a:payment-accepted': 'trucks_cola_new_step4a_payment-accepted'
                }, {
                    'plant:cola:new:step4a:payment-accepted': 'plant_cola_new_step4a_payment-accepted'
                }, {
                    'farm:cola:new:step4a:payment-accepted': 'farm_cola_new_step4a_payment-accepted'
                }, {
                    'bikes:pola:homepage': 'bikes_pola_homepage'
                }, {
                    'vans:pola:homepage': 'vans_pola_homepage'
                }, {
                    'cars:motoring-products:valuations:homepage': 'cars_motoring-products_valuations_homepage'
                }, {
                    'cars:motoring-products:valuations:vehicle-reg': 'cars_motoring-products_valuations_vehicle-reg'
                }, {
                    'cars:motoring-products:valuations:vehicle-details': 'cars_motoring-products_valuations_vehicle-details'
                }, {
                    'cars:part-exchange:homepage': 'cars_part-exchange_homepage'
                }, {
                    'cars:px-guide:enter-reg-mileage': 'cars_px-guide_enter-reg-mileage'
                }, {
                    'cars:px-guide:vehicle-found': 'cars_px-guide_vehicle-found'
                }, {
                    'cars:px-guide:enter-personal-details': 'cars_px-guide_enter-personal-details'
                }, {
                    'cars:pola:homepage': 'cars_pola_homepage'
                }, {
                    'cars:make-model': 'cars_make-model'
                }, {
                    'plant:cola:new:step1a:enter-reg': 'plant_cola_new_step1a_enter-reg'
                }, {
                    'cars:new-cars:selector:enter-details': 'cars_new-cars_selector_enter-details'
                }, {
                    'cars:new-cars:selector:confirmation': 'cars_new-cars_selector_confirmation'
                }, {
                    'plant:home': 'plant_home'
                }, {
                    'plant:insurance:motoring-products:homepage': 'plant_insurance_motoring-products_homepage'
                }, {
                    'cars:campaign-hub:goals': 'cars_campaign-hub_goals'
                }, {
                    'cars:search:ad-view:enter-details': 'cars_search_ad-view_enter-details'
                }, {
                    'cars:search:ad-view:confirmation': 'cars_search_ad-view_confirmation'
                }, {
                    'cars:search:known:results': 'cars_search_known_results'
                }, {
                    'vans:search:known:results': 'vans_search_known_results'
                }, {
                    'bikes:search:known:results': 'bikes_search_known_results'
                }, {
                    'motorhomes:search:known:results': 'motorhomes_search_known_results'
                }, {
                    'caravans:search:known:results': 'caravans_search_known_results'
                }, {
                    'trucks:search:known:results': 'trucks_search_known_results'
                }, {
                    'plant:search:known:results': 'plant_search_known_results'
                }, {
                    'farm:search:known:results': 'farm_search_known_results'
                }, {
                    'cars:search:ad-view:live-chat:business-card': 'cars_search_ad-view_live-chat_business-card'
                }, {
                    'cars:search:ad-view:email-form': 'cars_search_ad-view_email-form'
                }, {
                    'cars:search:ad-view:email-sent': 'cars_search_ad-view_email-sent'
                }, {
                    'cars:search:seo:landingpage': 'cars_search_seo_landingpage'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        if (d == f) {
                            b['fb_event_trigger'] = c[e][f];
                            m = true
                        };
                    };
                    if (m) break
                };
            }
        }, function (a, b) {
            try {
                if (/cars:make-model$/i.test(b['page_name']) || /cars:new-cars:selector:enter-details$/i.test(b['page_name']) || b['page_name'].toString().toLowerCase() == 'cars:new-cars:selector:confirmation'.toLowerCase()) {
                    b['content_ids'] = b['generation_id']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['page_name'].toString().toLowerCase() == 'cars:make-model'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:new-cars:selector:enter-details'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:new-cars:selector:confirmation'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:enter-details'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:confirmation'.toLowerCase() || /search:ad-view$/i.test(b['page_name']) || /search:known:results$/i.test(b['page_name']) || b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:email-form'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:email-sent'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:search:seo:landingpage'.toLowerCase()) {
                    b['content_type'] = 'vehicle'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (1) {
                    b['content_ids'] = b['generation_id']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['page_name'].toString().toLowerCase() == 'cars:make-model'.toLowerCase()) {
                    b['twitter_content_type'] = 'product'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['cp.cookiePolicy'].toString().toLowerCase() == 'seen.'.toLowerCase()) {
                    b['cookie_policy_accepted'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:enter-details'.toLowerCase()) {
                    b['content_ids'] = b['qp.advertId']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['page_name'].toString().toLowerCase().indexOf('search:ad-view'.toLowerCase()) > -1) {
                    b['content_ids'] = b['ad_id']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['page_name'].toString().toLowerCase() == 'cars:search:ad-view'.toLowerCase() && b['advert_attributes'].toString().toLowerCase() == 'allocated-stock'.toLowerCase()) || b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:confirmation'.toLowerCase()) {
                    b['content_ids'] = b['ad_id']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (typeof b['dom.url'] != 'undefined') {
                    b['currency'] = 'GBP'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (/cars:make-model$/i.test(b['page_name']) || /cars:new-cars:selector:enter-details$/i.test(b['page_name']) || b['page_name'].toString().toLowerCase() == 'cars:new-cars:selector:confirmation'.toLowerCase()) {
                    b['content_ids'] = b['generation_id']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['page_name'].toString().toLowerCase() == 'cars:make-model'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:new-cars:selector:enter-details'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:new-cars:selector:confirmation'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:enter-details'.toLowerCase() || b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:confirmation'.toLowerCase() || (b['page_name'].toString().toLowerCase() == 'cars:search:ad-view'.toLowerCase() && b['advert_attributes'].toString().toLowerCase() == 'allocated-stock'.toLowerCase())) {
                    b['content_type'] = 'vehicle'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:enter-details'.toLowerCase()) {
                    b['content_ids'] = b['qp.advertId']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:confirmation'.toLowerCase()) {
                    b['content_ids'] = b['ad_id']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['advert_attributes'].toString().toLowerCase() == 'allocated-stock'.toLowerCase() && b['page_name'].toString().toLowerCase() == 'cars:search:ad-view'.toLowerCase())) {
                    b['content_ids'] = b['ad_id']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (/:finance:calculator$/i.test(b['page_name'])) {
                    b['dealer_id'] = b['qp.selectedDid']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (1) {
                    if (window.usabilla_live) {
                        if (b.page_name && b.page_name.endsWith(":search:ad-view")) {
                            window.usabilla_live("hide");
                        }
                        window.usabilla_live('setEventCallback', function (category, action, label) {
                            if (action === 'Campaign:Open') {
                                document.cookie = "usabilla_campaign_open=1;path=/";
                            }
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if (1) {
                    function init() {
                        var tvp = "FB_UB_";

                        function sendToCS(csKey, csValue, csEventType, csPV) {
                            csKey = tvp + csKey;
                            _uxa.push(["trackDynamicVariable", {
                                key: csKey,
                                value: csValue
                            }]);
                            if (csEventType === "etr") {
                                _uxa.push(['trackEventTriggerRecording', csKey]);
                            } else if (csEventType === "reg") {
                                _uxa.push(["trackPageEvent", csKey + " | " + csValue]);
                            }
                            if (csPV) {
                                _uxa.push(["trackPageview", window.location.pathname + "?" + csPV]);
                            }
                        }

                        function startUBIntegration() {
                            setTimeout(function () {
                                usabilla_live("setEventCallback", function (category, action, label, value, userData) {
                                    var ud = userData;
                                    if (action == 'Feedback:Open') {
                                        sendToCS("Feedback Displayed (All Surveys)", "true", 0, "cs_usabilla=feedback_displayed");
                                    }
                                    if (action === "Feedback:Success") {
                                        sendToCS("Feedback Submitted (All Surveys)", "true", "etr", "cs_usabilla=feedback_submitted");
                                        if (ud) {
                                            var getFeedbackKeys = Object.keys(ud);
                                            for (var f = 0; f < getFeedbackKeys.length; f++) {
                                                var fbName = getFeedbackKeys[f];
                                                var fbValue = ud[getFeedbackKeys[f]];
                                                var fbCSkey = "";
                                                if (fbName != "email" && fbName != "comment" && fbName != "custom") {
                                                    if (fbName === "rating") {
                                                        fbCSkey = "Feedback Mood Rating";
                                                    } else if (fbName === "nps") {
                                                        fbCSkey = "Feedback NPS Rating";
                                                    } else if (fbName === "performance") {
                                                        fbCSkey = "Feedback Performance Rating";
                                                    }
                                                    if (!isNaN(fbValue)) {
                                                        fbValue = parseInt(fbValue);
                                                    }
                                                    if (fbCSkey && fbValue) {
                                                        sendToCS(fbCSkey, fbValue);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (action === "Campaign:Open") {
                                        document.cookie = "usabilla_campaign_open=1;path=/";
                                        sendToCS("Campaign Displayed", label, 0, "cs_usabilla=campaign_displayed_" + label);
                                    }
                                    if (action === "Campaign:Page Switch") {
                                        if (ud) {
                                            if (ud.data) {
                                                var getCampaignKeys = Object.keys(ud.data);
                                                for (var i = 0; i < getCampaignKeys.length; i++) {
                                                    var cmpName = getCampaignKeys[i];
                                                    var cmpValue = ud.data[getCampaignKeys[i]];
                                                    var cmpCSkey = "";
                                                    if (cmpName != "email") {
                                                        if (cmpName === "mood") {
                                                            cmpCSkey = "Campaign Mood Rating";
                                                        } else if (cmpName === "nps") {
                                                            cmpCSkey = "Campaign NPS Rating";
                                                        } else {
                                                            cmpCSkey = cmpName;
                                                        }
                                                        if (typeof (cmpValue) === "object") {
                                                            var getCampaignSubKeys = Object.keys(cmpValue);
                                                            for (var s = 0; s < getCampaignSubKeys.length; s++) {
                                                                var cmpSubName = getCampaignSubKeys[s];
                                                                var cmpSubValue = cmpValue[getCampaignSubKeys[s]];
                                                                if (!isNaN(cmpSubValue)) {
                                                                    cmpSubValue = parseInt(cmpSubValue);
                                                                }
                                                                if (isNaN(cmpSubName)) {
                                                                    if (cmpCSkey && cmpSubName && cmpSubValue) {
                                                                        sendToCS(cmpCSkey + " " + cmpSubName, cmpSubValue);
                                                                    }
                                                                }
                                                            }
                                                        } else {
                                                            if (!isNaN(cmpValue)) {
                                                                cmpValue = parseInt(cmpValue);
                                                            }
                                                            if (cmpCSkey && cmpValue) {
                                                                sendToCS(cmpCSkey, cmpValue);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (action === "Campaign:Success") {
                                        sendToCS("Campaign Submitted", label, "etr", "cs_usabilla=campaign_submitted_" + label);
                                    }
                                });
                                var isRecording = _uxa.push(['isRecording']);
                                if (isRecording) {
                                    var uxaGet = _uxa.push(["getSessionData"]);
                                    if (uxaGet && uxaGet.projectId) {
                                        var pid = uxaGet.projectId;
                                        var uu = uxaGet.userId;
                                        var sn = uxaGet.sessionNumber;
                                        var pvid = uxaGet.pageNumber;
                                        if (pid && uu && sn && pvid) {
                                            var intLink = {};
                                            intLink.ContentsquareReplay = "https://app.contentsquare.com/quick-playback/index.html?pid=" + pid + "&uu=" + uu + "&sn=" + sn + "&pvid=" + pvid + "&recordingType=cs";
                                            usabilla_live('data', {
                                                'custom': intLink
                                            });
                                        }
                                    }
                                }
                            }, 500);
                        }
                        var integrationStarted = false;
                        var usabilla_live = window.usabilla_live;
                        if (usabilla_live) {
                            startUBIntegration();
                        } else {
                            Object.defineProperty(window, "usabilla_live", {
                                configurable: true,
                                get: function () {
                                    return usabilla_live;
                                },
                                set: function (n) {
                                    usabilla_live = n;
                                    if (!integrationStarted) {
                                        integrationStarted = true;
                                        startUBIntegration();
                                    }
                                }
                            });
                        }
                    }

                    function callback(context) {
                        if (!disableCallback) {
                            disableCallback = true;
                            init();
                            if (window.CS_CONF) {
                                CS_CONF.integrations = CS_CONF.integrations || [];
                                CS_CONF.integrations.push("Usabilla");
                            }
                        }
                    }
                    var disableCallback = false;
                    window._uxa = window._uxa || [];
                    _uxa.push(["afterPageView", callback]);
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        utag.handler.cfg_extend = [{
            "alr": 0,
            "end": 0,
            "bwq": 0,
            "id": "532",
            "blr": 1
        }, {
            "bwq": 0,
            "end": 0,
            "alr": 0,
            "id": "338",
            "blr": 1
        }, {
            "blr": 1,
            "id": "351",
            "end": 0,
            "alr": 0,
            "bwq": 0
        }, {
            "bwq": 0,
            "end": 0,
            "alr": 0,
            "id": "359",
            "blr": 1
        }, {
            "id": "380",
            "alr": 0,
            "end": 0,
            "bwq": 0,
            "blr": 1
        }, {
            "blr": 1,
            "id": "381",
            "end": 0,
            "alr": 0,
            "bwq": 0
        }, {
            "blr": 1,
            "end": 0,
            "bwq": 0,
            "alr": 0,
            "id": "382"
        }, {
            "id": "424",
            "alr": 0,
            "end": 0,
            "bwq": 0,
            "blr": 1
        }, {
            "blr": 1,
            "end": 0,
            "alr": 0,
            "bwq": 0,
            "id": "427"
        }, {
            "id": "428",
            "bwq": 0,
            "end": 0,
            "alr": 0,
            "blr": 1
        }, {
            "alr": 0,
            "end": 0,
            "bwq": 0,
            "id": "439",
            "blr": 1
        }, {
            "alr": 0,
            "end": 0,
            "bwq": 0,
            "id": "444",
            "blr": 1
        }, {
            "blr": 1,
            "end": 0,
            "alr": 0,
            "bwq": 0,
            "id": "450"
        }, {
            "bwq": 0,
            "end": 0,
            "alr": 0,
            "id": "535",
            "blr": 1
        }, {
            "blr": 1,
            "end": 0,
            "bwq": 0,
            "alr": 0,
            "id": "536"
        }, {
            "blr": 1,
            "id": "537",
            "end": 0,
            "alr": 0,
            "bwq": 0
        }, {
            "blr": 1,
            "id": "538",
            "end": 0,
            "alr": 0,
            "bwq": 0
        }, {
            "blr": 1,
            "id": "540",
            "end": 0,
            "bwq": 0,
            "alr": 0
        }, {
            "alr": 0,
            "end": 0,
            "bwq": 0,
            "id": "542",
            "blr": 1
        }, {
            "blr": 0,
            "end": 0,
            "bwq": 0,
            "alr": 1,
            "id": "15"
        }, {
            "blr": 0,
            "end": 0,
            "bwq": 0,
            "alr": 1,
            "id": "131"
        }, {
            "blr": 0,
            "id": "343",
            "end": 0,
            "bwq": 0,
            "alr": 1
        }, {
            "id": "349",
            "bwq": 0,
            "end": 0,
            "alr": 1,
            "blr": 0
        }, {
            "id": "350",
            "bwq": 0,
            "end": 0,
            "alr": 1,
            "blr": 0
        }, {
            "id": "352",
            "alr": 1,
            "end": 0,
            "bwq": 0,
            "blr": 0
        }, {
            "bwq": 0,
            "end": 0,
            "alr": 1,
            "id": "353",
            "blr": 0
        }, {
            "id": "387",
            "alr": 1,
            "end": 0,
            "bwq": 0,
            "blr": 0
        }, {
            "blr": 0,
            "end": 0,
            "alr": 1,
            "bwq": 0,
            "id": "401"
        }, {
            "bwq": 0,
            "end": 0,
            "alr": 1,
            "id": "413",
            "blr": 0
        }, {
            "alr": 1,
            "end": 0,
            "bwq": 0,
            "id": "414",
            "blr": 0
        }, {
            "id": "415",
            "bwq": 0,
            "end": 0,
            "alr": 1,
            "blr": 0
        }, {
            "blr": 0,
            "id": "425",
            "end": 0,
            "bwq": 0,
            "alr": 1
        }, {
            "blr": 0,
            "id": "426",
            "end": 0,
            "alr": 1,
            "bwq": 0
        }, {
            "bwq": 0,
            "end": 0,
            "alr": 1,
            "id": "429",
            "blr": 0
        }, {
            "id": "430",
            "bwq": 0,
            "end": 0,
            "alr": 1,
            "blr": 0
        }, {
            "blr": 0,
            "end": 0,
            "bwq": 0,
            "alr": 1,
            "id": "431"
        }, {
            "id": "531",
            "bwq": 0,
            "end": 0,
            "alr": 1,
            "blr": 0
        }, {
            "id": "545",
            "alr": 0,
            "end": 1,
            "bwq": 0,
            "blr": 0
        }, {
            "blr": 0,
            "end": 1,
            "alr": 0,
            "bwq": 0,
            "id": "547"
        }];
        utag.loader.initcfg = function () {
            utag.loader.cfg = {
                "555": {
                    load: 4,
                    send: 1,
                    v: 202102091136,
                    wait: 1,
                    tid: 20067
                },
                "569": {
                    load: 4,
                    send: utag.cond[241],
                    v: 202102091136,
                    wait: 1,
                    tid: 3005
                },
                "550": {
                    load: 4,
                    send: utag.cond[232],
                    v: 202104131317,
                    wait: 1,
                    tid: 21004
                },
                "42": {
                    load: 4,
                    send: 1,
                    v: 202011171505,
                    wait: 1,
                    tid: 7110
                },
                "90": {
                    load: (utag.cond[30] && utag.cond[212]),
                    send: 1,
                    v: 202004301104,
                    wait: 1,
                    tid: 20067
                },
                "162": {
                    load: 4,
                    send: utag.cond[63],
                    v: 201906121641,
                    wait: 1,
                    tid: 8009
                },
                "163": {
                    load: 4,
                    send: utag.cond[62],
                    v: 201905291225,
                    wait: 1,
                    tid: 8009
                },
                "141": {
                    load: 4,
                    send: utag.cond[52],
                    v: 201906121641,
                    wait: 1,
                    tid: 8009
                },
                "290": {
                    load: 4,
                    send: utag.cond[162],
                    v: 202010061328,
                    wait: 1,
                    tid: 2045
                },
                "294": {
                    load: 4,
                    send: (utag.cond[208] && utag.cond[88] && utag.cond[164]),
                    v: 201909041537,
                    wait: 1,
                    tid: 6026
                },
                "305": {
                    load: 4,
                    send: (utag.cond[211] && utag.cond[87] && utag.cond[216]),
                    v: 201912101214,
                    wait: 1,
                    tid: 20103
                },
                "376": {
                    load: (utag.cond[170] && utag.cond[91]),
                    send: 1,
                    v: 201902181245,
                    wait: 1,
                    tid: 20011
                },
                "377": {
                    load: (utag.cond[170] && utag.cond[40]),
                    send: 1,
                    v: 201902261145,
                    wait: 1,
                    tid: 20011
                },
                "379": {
                    load: (utag.cond[43] && utag.cond[216]),
                    send: 1,
                    v: 202004301104,
                    wait: 1,
                    tid: 20078
                },
                "381": {
                    load: (utag.cond[170] && utag.cond[48]),
                    send: 1,
                    v: 201902181245,
                    wait: 1,
                    tid: 20011
                },
                "394": {
                    load: 4,
                    send: utag.cond[147],
                    v: 201904111400,
                    wait: 1,
                    tid: 3131
                },
                "439": {
                    load: 4,
                    send: (utag.cond[210] && utag.cond[162] && utag.cond[150] && utag.cond[215]),
                    v: 202101121257,
                    wait: 1,
                    tid: 19129
                },
                "460": {
                    load: 4,
                    send: utag.cond[162],
                    v: 201905230855,
                    wait: 1,
                    tid: 4049
                },
                "442": {
                    load: 4,
                    send: utag.cond[162],
                    v: 202003130822,
                    wait: 1,
                    tid: 4049
                },
                "444": {
                    load: 4,
                    send: utag.cond[166],
                    v: 202005121245,
                    wait: 1,
                    tid: 4049
                },
                "464": {
                    load: 4,
                    send: utag.cond[174],
                    v: 201911221352,
                    wait: 1,
                    tid: 4049
                },
                "465": {
                    load: 4,
                    send: utag.cond[79],
                    v: 202005121245,
                    wait: 1,
                    tid: 4049
                },
                "480": {
                    load: 4,
                    send: utag.cond[178],
                    v: 201905291225,
                    wait: 1,
                    tid: 8009
                },
                "487": {
                    load: 4,
                    send: (utag.cond[144] && utag.cond[162]),
                    v: 202009091003,
                    wait: 1,
                    tid: 20010
                },
                "489": {
                    load: (utag.cond[144] && utag.cond[162]),
                    send: 1,
                    v: 202004301104,
                    wait: 1,
                    tid: 20010
                },
                "498": {
                    load: 4,
                    send: (utag.cond[144] && utag.cond[162]),
                    v: 201907110922,
                    wait: 1,
                    tid: 20010
                },
                "512": {
                    load: 4,
                    send: utag.cond[195],
                    v: 201907080943,
                    wait: 1,
                    tid: 8009
                },
                "513": {
                    load: 4,
                    send: utag.cond[197],
                    v: 201907080943,
                    wait: 1,
                    tid: 8009
                },
                "514": {
                    load: 4,
                    send: utag.cond[196],
                    v: 201907080943,
                    wait: 1,
                    tid: 8009
                },
                "515": {
                    load: 4,
                    send: (utag.cond[144] && utag.cond[162]),
                    v: 201907110922,
                    wait: 1,
                    tid: 20110
                },
                "525": {
                    load: 4,
                    send: utag.cond[217],
                    v: 202005121245,
                    wait: 1,
                    tid: 4049
                },
                "526": {
                    load: 4,
                    send: utag.cond[218],
                    v: 202009231428,
                    wait: 1,
                    tid: 4049
                },
                "527": {
                    load: 4,
                    send: utag.cond[219],
                    v: 202009231436,
                    wait: 1,
                    tid: 4049
                },
                "530": {
                    load: 4,
                    send: utag.cond[174],
                    v: 202001031025,
                    wait: 1,
                    tid: 6036
                },
                "541": {
                    load: 4,
                    send: utag.cond[223],
                    v: 202002141656,
                    wait: 1,
                    tid: 20110
                },
                "542": {
                    load: 4,
                    send: utag.cond[79],
                    v: 202002141656,
                    wait: 1,
                    tid: 20110
                },
                "544": {
                    load: 4,
                    send: utag.cond[225],
                    v: 202009231436,
                    wait: 1,
                    tid: 4049
                },
                "545": {
                    load: 4,
                    send: utag.cond[226],
                    v: 202009231436,
                    wait: 1,
                    tid: 4049
                },
                "546": {
                    load: 4,
                    send: utag.cond[228],
                    v: 202009231436,
                    wait: 1,
                    tid: 4049
                },
                "547": {
                    load: 4,
                    send: utag.cond[227],
                    v: 202009231436,
                    wait: 1,
                    tid: 4049
                },
                "548": {
                    load: 4,
                    send: utag.cond[229],
                    v: 202009231436,
                    wait: 1,
                    tid: 4049
                },
                "549": {
                    load: 4,
                    send: utag.cond[230],
                    v: 202009231436,
                    wait: 1,
                    tid: 4049
                },
                "558": {
                    load: 4,
                    send: (utag.cond[144] && utag.cond[162] && utag.cond[235]),
                    v: 202010150813,
                    wait: 1,
                    tid: 20097
                },
                "559": {
                    load: 4,
                    send: (utag.cond[15] && utag.cond[235]),
                    v: 202010150813,
                    wait: 1,
                    tid: 20097
                },
                "565": {
                    load: 4,
                    send: utag.cond[242],
                    v: 202101151800,
                    wait: 1,
                    tid: 20010
                },
                "571": {
                    load: 4,
                    send: (utag.cond[244] && utag.cond[246]),
                    v: 202104121547,
                    wait: 1,
                    tid: 17011
                },
                "572": {
                    load: 4,
                    send: utag.cond[245],
                    v: 202103261400,
                    wait: 1,
                    tid: 21014
                },
                "577": {
                    load: 4,
                    send: utag.cond[248],
                    v: 202105211620,
                    wait: 1,
                    tid: 3170
                },
                "578": {
                    load: 4,
                    send: (utag.cond[249] || utag.cond[247]),
                    v: 202105211620,
                    wait: 1,
                    tid: 3004
                }
            };
            utag.loader.cfgsort = ["555", "569", "550", "42", "90", "162", "163", "141", "290", "294", "305", "376", "377", "379", "381", "394", "439", "460", "442", "444", "464", "465", "480", "487", "489", "498", "512", "513", "514", "515", "525", "526", "527", "530", "541", "542", "544", "545", "546", "547", "548", "549", "558", "559", "565", "571", "572", "577", "578"];
        }
        utag.loader.initcfg();
    }
    utag.loader.genOvrd = function () {
        if (typeof utag_cfg_ovrd != 'undefined') {
            for (utag._i in utag.loader.GV(utag_cfg_ovrd)) utag.cfg[utag._i] = utag_cfg_ovrd[utag._i]
        };
    }
    utag.loader.PINIT = function (a, b, c) {
        utag.DB("Pre-INIT");
        if (utag.cfg.noload) {
            return;
        }
        try {
            this.GET();
            utag.loader.genOvrd();
            if (utag.handler.RE('view', utag.data, "blr")) {
                utag.handler.LR(utag.data);
            }
        } catch (e) {
            utag.DB(e)
        };
        a = this.cfg;
        c = 0;
        for (b in this.GV(a)) {
            if (a[b].block == 1 || (a[b].load > 0 && (typeof a[b].src != 'undefined' && a[b].src != ''))) {
                a[b].block = 1;
                c = 1;
                this.bq[b] = 1;
            }
        }
        if (c == 1) {
            for (b in this.GV(a)) {
                if (a[b].block) {
                    a[b].id = b;
                    if (a[b].load == 4) a[b].load = 1;
                    a[b].cb = function () {
                        var d = this.uid;
                        utag.loader.cfg[d].cbf = 1;
                        utag.loader.LOAD(d)
                    };
                    this.AS(a[b]);
                }
            }
        }
        if (c == 0) this.INIT();
    };
    utag.loader.INIT = function (a, b, c, d, e) {
        utag.DB('utag.loader.INIT');
        if (this.ol == 1) return -1;
        else this.ol = 1;
        utag.loader.genOvrd();
        window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
        if (utag.cfg.noview != true && window.utag_cfg_ovrd.noview != 'true') utag.handler.RE('view', utag.data, "alr");
        utag.rpt.ts['i'] = new Date();
        d = this.cfgsort;
        for (a = 0; a < d.length; a++) {
            e = d[a];
            b = this.cfg[e];
            b.id = e;
            if (b.block != 1) {
                if (utag.loader.bk[b.id] || ((utag.cfg.readywait || utag.cfg.noview) && b.load == 4)) {
                    this.f[b.id] = 0;
                    utag.loader.LOAD(b.id)
                } else if (b.wait == 1 && utag.loader.rf == 0) {
                    utag.DB('utag.loader.INIT: waiting ' + b.id);
                    this.wq.push(b)
                    this.f[b.id] = 2;
                } else if (b.load > 0) {
                    utag.DB('utag.loader.INIT: loading ' + b.id);
                    this.lq.push(b);
                    this.AS(b);
                }
            }
        }
        if (this.wq.length > 0) utag.loader.EV('', 'ready', function (a) {
            if (utag.loader.rf == 0) {
                utag.DB('READY:utag.loader.wq');
                utag.loader.rf = 1;
                utag.loader.WQ();
            }
        });
        else if (this.lq.length > 0) utag.loader.rf = 1;
        else if (this.lq.length == 0) utag.loader.END();
        return 1
    };
    utag.loader.EV('', 'ready', function (a) {
        if (utag.loader.efr != 1) {
            utag.loader.efr = 1;
            try {
                if (typeof utag.runonce == 'undefined') utag.runonce = {};
                utag.jdh = function (h, i, j, k) {
                    h = utag.jdhc.length;
                    if (h == 0) window.clearInterval(utag.jdhi);
                    else {
                        for (i = 0; i < h; i++) {
                            j = utag.jdhc[i];
                            k = jQuery(j.i).is(":visible") ? 1 : 0;
                            if (k != j.s) {
                                if (j.e == (j.s = k)) jQuery(j.i).trigger(j.e ? "afterShow" : "afterHide")
                            }
                        }
                    }
                };
                utag.jdhi = window.setInterval(utag.jdh, 250);
                utag.jdhc = [];
                if (1) {
                    if (typeof utag.runonce[63] == 'undefined') {
                        utag.runonce[63] = 1;
                        jQuery(document.body).on('click', '.tracking-standard-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'standard-link',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "dealer_id": utag.data['dealer_id'],
                                "event_position": utag.data['event_position'],
                                "advert_attributes": utag.data['advert_attributes'],
                                "previous_page_name": utag.data['previous_page_name'],
                                "search_position": $(e.target).attr('search-position') ? $(e.target).attr('search-position') : '',
                                "radius": utag.data['radius'],
                                "seller_type": utag.data['seller_type'],
                                "advertiser_segment": utag.data['advertiser_segment'],
                                "distance": utag.data['distance'],
                                "ad_id": utag.data['ad_id']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[178] == 'undefined') {
                        utag.runonce[178] = 1;
                        jQuery(document.body).on('click', '.tracking-video-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'video-link',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "dealer_id": utag.data['dealer_id'],
                                "ad_id": utag.data['ad_id']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[64] == 'undefined') {
                        utag.runonce[64] = 1;
                        jQuery(document.body).on('click', '.tracking-leads-link', function (e) {
                            utag.link({
                                "label": jQuery(e.target).attr('data-label') ? jQuery(e.target).attr('data-label') : e.target.textContent,
                                "category": 'leads',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "dealer_id": utag.data['dealer_id'],
                                "ad_id": utag.data['ad_id'],
                                "make": utag.data['make'],
                                "model": utag.data['model'],
                                "location_postcode_prefix": utag.data['location_postcode_prefix'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "advert_attributes": utag.data['advert_attributes'],
                                "previous_page_name": utag.data['previous_page_name'],
                                "manufacturer_approved": utag.data['manufacturer_approved'],
                                "used_new": utag.data['used_new'],
                                "vehicle_year": utag.data['vehicle_year'],
                                "advertiser_segment": utag.data['advertiser_segment'],
                                "seller_type": utag.data['seller_type'],
                                "distance": utag.data['distance']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[65] == 'undefined') {
                        utag.runonce[65] = 1;
                        jQuery(document.body).on('click', '.tracking-header-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'header',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "advert_attributes": utag.data['advert_attributes']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[66] == 'undefined') {
                        utag.runonce[66] = 1;
                        jQuery(document.body).on('click', '.tracking-footer-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'footer',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "advert_attributes": utag.data['advert_attributes']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[67] == 'undefined') {
                        utag.runonce[67] = 1;
                        jQuery(document.body).on('click', '.tracking-navigation-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'navigation',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "advert_attributes": utag.data['advert_attributes']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[68] == 'undefined') {
                        utag.runonce[68] = 1;
                        jQuery(document.body).on('click', '.tracking-motoring-products-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'motoring-products',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "ad_id": utag.data['ad_id'],
                                "seller_type": utag.data['seller_type'],
                                "distance": utag.data['distance'],
                                "radius": utag.data['radius']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[69] == 'undefined') {
                        utag.runonce[69] = 1;
                        jQuery(document.body).on('click', '.tracking-security-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'security',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[70] == 'undefined') {
                        utag.runonce[70] = 1;
                        jQuery(document.body).on('click', '.tracking-security-view', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'security-view',
                                "action": 'view',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[71] == 'undefined') {
                        utag.runonce[71] = 1;
                        jQuery(document.body).on('click', '.tracking-my-at-products-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'my-at-products',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[72] == 'undefined') {
                        utag.runonce[72] = 1;
                        jQuery(document.body).on('click', '.tracking-register-sign-in', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'register-sign-in',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "advert_attributes": utag.data['advert_attributes']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[93] == 'undefined') {
                        utag.runonce[93] = 1;
                        utag.jdhc.push({
                            i: '.tracking-error-event',
                            e: 1
                        });
                        jQuery(document.body).on('afterShow', '.tracking-error-event', function (e) {
                            if (jQuery('.tracking-error-event').is(':visible')) {
                                utag.link({
                                    "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                    "category": 'error',
                                    "action": 'view',
                                    "page_name": utag.data['page_name'],
                                    "platform": utag.data['platform'],
                                    "channel": utag.data['channel'],
                                    "page_name_granular": utag.data['page_name_granular'],
                                    "urs_id": utag.data['urs_id'],
                                    "logged_in_status": utag.data['logged_in_status'],
                                    "environment": utag.data['environment'],
                                    "platform_type": utag.data['platform_type'],
                                    "tealium_profile": utag.data['tealium_profile'],
                                    "device_id": utag.data['device_id']
                                })
                            }
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[94] == 'undefined') {
                        utag.runonce[94] = 1;
                        jQuery(document.body).on('click', '.tracking-creative-solutions-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'creative-solutions',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "make": utag.data['make']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[204] == 'undefined') {
                        utag.runonce[204] = 1;
                        jQuery(document.body).on('click', 'li.polar-sponsored-known-search-desktop a', function (e) {
                            utag.link({
                                "label": 'insearch-ad-listing',
                                "category": 'display-ad-link',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "model": utag.data['model'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "make": utag.data['make'],
                                "event_position": utag.data['event_position']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[289] == 'undefined') {
                        utag.runonce[289] = 1;
                        jQuery(document.body).on('focus', '.tracking-focus-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'focus-link',
                                "action": 'input-field-focus',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "dealer_id": utag.data['dealer_id'],
                                "event_position": utag.data['event_position']
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[290] == 'undefined') {
                        utag.runonce[290] = 1;
                        jQuery(document.body).on('change', '.tracking-input-change-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'input-change-link',
                                "action": 'dropdown-menu-change',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "dealer_id": utag.data['dealer_id'],
                                "event_position": utag.data['event_position']
                            })
                        });
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[294] == 'undefined') {
                        utag.runonce[294] = 1;
                        jQuery(document.body).on('click', 'a[href$=".pdf"]', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'pdf-download-link',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "dealer_id": utag.data['dealer_id'],
                                "ad_id": utag.data['ad_id']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
            try {
                if (1) {
                    if (typeof utag.runonce[371] == 'undefined') {
                        utag.runonce[371] = 1;
                        jQuery(document.body).on('click', '.tracking-help-faq-link', function (e) {
                            utag.link({
                                "label": $(e.target).attr('data-label') ? $(e.target).attr('data-label') : e.target.textContent,
                                "category": 'help-faq-link',
                                "action": 'click',
                                "page_name": utag.data['page_name'],
                                "platform": utag.data['platform'],
                                "channel": utag.data['channel'],
                                "page_name_granular": utag.data['page_name_granular'],
                                "urs_id": utag.data['urs_id'],
                                "logged_in_status": utag.data['logged_in_status'],
                                "environment": utag.data['environment'],
                                "platform_type": utag.data['platform_type'],
                                "tealium_profile": utag.data['tealium_profile'],
                                "device_id": utag.data['device_id'],
                                "dealer_id": utag.data['dealer_id'],
                                "event_position": utag.data['event_position'],
                                "advert_attributes": utag.data['advert_attributes'],
                                "previous_page_name": utag.data['previous_page_name'],
                                "search_position": $(e.target).attr('search-position') ? $(e.target).attr('search-position') : '',
                                "radius": utag.data['radius'],
                                "seller_type": utag.data['seller_type'],
                                "advertiser_segment": utag.data['advertiser_segment'],
                                "distance": utag.data['distance'],
                                "private_vehicle_price": utag.data['private_vehicle_price'],
                                "vehicle_price": utag.data['vehicle_price']
                            })
                        })
                    }
                }
            } catch (e) {
                utag.DB(e)
            };
        }
    })
    if (utag.cfg.readywait || utag.cfg.waittimer) {
        utag.loader.EV('', 'ready', function (a) {
            if (utag.loader.rf == 0) {
                utag.loader.rf = 1;
                utag.cfg.readywait = 1;
                utag.DB('READY:utag.cfg.readywait');
                setTimeout(function () {
                    utag.loader.PINIT()
                }, utag.cfg.waittimer || 1);
            }
        })
    } else {
        utag.loader.PINIT()
    }
}
//tealium universal tag - utag.555 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        u.encode = function (a, b) {
            b = "";
            try {
                b = encodeURIComponent(a)
            } catch (e) {
                utag.DB(e);
            }
            if (b == "") {
                b = escape(a);
            }
            return b
        }
        u.ev = {
            "view": 1
        };
        u.scriptrequested = false;
        u.rp = function (a, b) {
            if (typeof a !== "undefined" && a.indexOf("@@") > 0) {
                a = a.replace(/@@([^@]+)@@/g, function (m, d) {
                    if (b[d]) {
                        return u.encode(b[d]);
                    } else {
                        return "";
                    }
                });
            }
            return a;
        };
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "qsp_delim": "&" || "&",
                    "kvp_delim": "=" || "=",
                    "qs_delim": "?" || "?",
                    "tag_type": "script",
                    "base_url": "https://cdn.privacy-mgmt.com/wrapperMessagingWithoutDetection.js",
                    "secure_base_url": "",
                    "static_params": "",
                    "cachebust": "disabled",
                    "cachevar": "" || "_rnd",
                    "requestscriptonce": "disabled"
                };
                utag.DB("send:555:EXTENSIONS");
                utag.DB(b);
                c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (typeof b[d] !== "undefined" && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            if (!u.data.hasOwnProperty(e[f])) {
                                c.push(e[f] + "##kvp_delim##" + u.encode(b[d]));
                            }
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                if (!u.data.base_url) {
                    if (!u.data.secure_base_url) {
                        utag.DB("Error: No Base URL or Secure HTTPS Override Provided.");
                        return;
                    } else {
                        u.data.base_url = u.data.secure_base_url;
                        utag.DB("No Base URL provided, using Secure HTTPS Override.");
                    }
                }
                u.data.secure_base_url = u.data.secure_base_url || u.data.base_url;
                u.data.url = (location.protocol === "https:" ? u.data.secure_base_url : u.data.base_url);
                if (u.data.url.indexOf("http") !== 0 && u.data.url.indexOf("/") !== 0) {
                    u.data.url = location.protocol + "//" + u.data.url;
                }
                if (u.data.static_params) {
                    c.push(u.data.static_params);
                }
                var cb_check = new RegExp("(\\" + u.data.qs_delim + "|" + u.data.qsp_delim + ")" + u.data.cachevar + "=");
                if (u.data.cachebust === "enabled" && !cb_check.test(u.data.url)) {
                    c.push([u.data.cachevar, Math.random()].join(u.data.kvp_delim));
                }
                if (c.length > 0) {
                    if (u.data.url.indexOf(u.data.qs_delim) < 0) {
                        u.data.url += u.data.qs_delim;
                    } else if (u.data.url.indexOf(u.data.qs_delim) !== (u.data.url.length - 1)) {
                        u.data.url += u.data.qsp_delim;
                    }
                }
                u.data.url = u.rp(u.data.url, b) + u.rp(c.join(u.data.qsp_delim), b);
                u.data.url = u.data.url.replace(/##kvp_delim##/g, u.data.kvp_delim);
                u.callback = u.callback || function () {};
                if (!window.__tcfapi) {
                    ! function () {
                        var e = function () {
                            var e, t = "__tcfapiLocator",
                                a = [],
                                n = window;
                            for (; n;) {
                                try {
                                    if (n.frames[t]) {
                                        e = n;
                                        break
                                    }
                                } catch (e) {}
                                if (n === window.top) break;
                                n = n.parent
                            }
                            e || (! function e() {
                                var a = n.document,
                                    r = !!n.frames[t];
                                if (!r)
                                    if (a.body) {
                                        var i = a.createElement("iframe");
                                        i.style.cssText = "display:none", i.name = t, a.body.appendChild(i)
                                    } else setTimeout(e, 5);
                                return !r
                            }(), n.__tcfapi = function () {
                                for (var e, t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                                if (!n.length) return a;
                                if ("setGdprApplies" === n[0]) n.length > 3 && 2 === parseInt(n[1], 10) && "boolean" == typeof n[3] && (e = n[3], "function" == typeof n[2] && n[2]("set", !0));
                                else if ("ping" === n[0]) {
                                    var i = {
                                        gdprApplies: e,
                                        cmpLoaded: !1,
                                        cmpStatus: "stub"
                                    };
                                    "function" == typeof n[2] && n[2](i)
                                } else a.push(n)
                            }, n.addEventListener("message", (function (e) {
                                var t = "string" == typeof e.data,
                                    a = {};
                                try {
                                    a = t ? JSON.parse(e.data) : e.data
                                } catch (e) {}
                                var n = a.__tcfapiCall;
                                n && window.__tcfapi(n.command, n.version, (function (a, r) {
                                    var i = {
                                        __tcfapiReturn: {
                                            returnValue: a,
                                            success: r,
                                            callId: n.callId
                                        }
                                    };
                                    t && (i = JSON.stringify(i)), e.source.postMessage(i, "*")
                                }), n.parameter)
                            }), !1))
                        };
                        "undefined" != typeof module ? module.exports = e : e()
                    }();
                }
                if (!window._sp_) {
                    window._sp_ = {
                        config: {
                            accountId: 741,
                            baseEndpoint: 'https://cdn.privacy-mgmt.com',
                        }
                    }
                }
                if (u.data.requestscriptonce === "enabled" && u.data.tag_type === "script") {
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": u.data.tag_type,
                            "src": u.data.url,
                            "loc": "script",
                            "id": "utag_555",
                            "cb": u.callback
                        });
                    } else {
                        u.callback();
                    }
                } else {
                    u.loader({
                        "type": u.data.tag_type,
                        "src": u.data.url,
                        "loc": "script",
                        "id": "utag_555",
                        "cb": u.callback
                    });
                }
                utag.DB("send:555:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("555", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.569 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var ns_ = ns_ || {};
var ns_p = ns_p || {};

function udm_(a) {
    var b = "comScore=",
        c = document,
        d = c.cookie,
        e = "",
        f = "indexOf",
        g = "substring",
        h = "length",
        i = 2048,
        j, k = "&ns_",
        l = "&",
        m, n, o, p, q = window,
        r = q.encodeURIComponent || escape;
    if (d[f](b) + 1)
        for (o = 0, n = d.split(";"), p = n[h]; o < p; o++) m = n[o][f](b), m + 1 && (e = l + unescape(n[o][g](m + b[h])));
    a += k + "_t=" + (new Date().getTime()) + k + "c=" + (c.characterSet || c.defaultCharset || "") + "&c8=" + r(c.title) + e + "&c7=" + r(c.URL) + "&c9=" + r(c.referrer), a[h] > i && a[f](l) > 0 && (j = a[g](0, i - 8).lastIndexOf(l), a = (a[g](0, j) + k + "cut=" + r(a[g](j + 1)))[g](0, i)), c.images ? (m = new Image(), q.ns_p || (ns_p = m), m.src = a) : c.write("<", "p", "><", 'img src="', a, '" height="1" width="1" alt="*"', "><", "/p", ">")
}

function ns_order(a, b, c) {
    var d = this,
        e = "ns_undefined",
        f = "length";
    d.toV = function (a) {
        return (new String(a)).replace(/(%3C|%3E|<|>)/gi, "_")
    }, d.toF = function (a) {
        var b = parseFloat(a);
        return isNaN(b) ? e : b
    }, d.counterURL = a, d.clientID = d.toV(b), d.orderID = d.toV(c), d.l = [], d.addLine = function (a, b, c, g, h, i) {
        d.l[d.l[f]] = {
            ns_prod_id: a ? a : e,
            ns_brand: b ? b : e,
            ns_prod_grp: c ? c : e,
            ns_shop: g ? g : e,
            ns_qty: d.toF(h),
            ns_prod_price: i ? i : 0
        }
    }, d.sendOrder = function () {
        var a = "ns_order_id_" + d.orderID + "=true";
        if (!!d.orderID && !ns_.order_sent[d.orderID] && document.cookie.indexOf(a) == -1) {
            ns_.order_sent[d.orderID] = !0, document.cookie = a;
            var b = d.counterURL + "&ns_commerce=true&ns_ec_sv=6.1202.02&ns_type=hidden" + "&ns_client_id=" + d.clientID + "&ns_order_id=" + d.orderID + "&ns_orderlines=" + d.l[f];
            for (var c = 0, a = d.l[f]; c < a; c++) {
                var e = d.l[c],
                    g = b + "&ns_orderline_id=" + (c + 1);
                for (var h in e) g += "&" + h + "=" + escape(d.toV(e[h]));
                ns_.batch(g)
            }
        }
    }
}
ns_ = window.ns_ || {}, ns_.batch = function (a) {
    var b, c, d = document,
        e = d.location;
    a = a + "&ns__t=" + (new Date).getTime(), a = a + "&ns_c=" + (d.characterSet ? d.characterSet : d.defaultCharset ? d.defaultCharset : "") + "&ns_ti=" + escape(d.title) + "&ns_jspageurl=" + escape(e && e.href ? e.href : d.URL) + "&ns_referrer=" + escape(d.referrer);
    var f = 2040,
        g = a.lastIndexOf("&");
    if (a.length > f && g != -1) {
        while (g > f) a = a.substring(0, g), g = a.lastIndexOf("&");
        a = a.substring(0, g + 1) + "ns_cut=" + a.substr(g + 1, f - g - 1)
    }
    var h = 'img height="1" width="1"  style="position:absolute;top:0;left:0;"';
    if (d.layers) d.images ? (new Image).src = a : d.write("<" + h + ' src="' + a + '">');
    else {
        var i = function (a) {
                var b = document.all(a);
                b && b.length && (b = b[0]);
                return b
            },
            j = function (a) {
                c.onload = c.onerror = null;
                if (ns_.pipe.length > 0) {
                    var e = ns_.pipe.join(""),
                        f = e.indexOf("src"),
                        g = e.indexOf('"', f),
                        h = e.indexOf('"', g + 1),
                        k = e.substring(g + 1, h),
                        e = e.substring(0, f) + 'id="ns_1"' + e.substring(h + 1);
                    ns_.pipe = [], b.innerHTML = e, c = d.getElementById ? d.getElementById("ns_1") : i("ns_1"), c.onload = j, c.src = k
                }
            };
        rs = d.readyState, ns_ = typeof ns_ != "undefined" ? ns_ : {}, ns_.pipe = typeof ns_.pipe != "undefined" ? ns_.pipe : [], b = d.getElementById ? d.getElementById("ns_") : i("ns_");
        if (!b) {
            var k = ["<", 'div id="ns_" style="position:absolute;top:0;left:0;z-index:32766;background-color:transparent !important"><', h, ' id="ns_1"></', "div>"].join("");
            rs == "complete" ? d.body.innerHTML += k : d.write(k)
        }
        c = d.getElementById ? d.getElementById("ns_1") : i("ns_1");
        if (c && c.onload) ns_.pipe[ns_.pipe.length] = "<" + h + ' src="' + a + '">';
        else if (b || c) b && (b.innerHTML = "<" + h + ' id="ns_1">'), b = d.getElementById ? d.getElementById("ns_") : i("ns_"), c = d.getElementById ? d.getElementById("ns_1") : i("ns_1"), c.onload = c.onerror = j, c.src = a
    }
}, ns_.order_sent = ns_.order_sent || {}
/*@cc_on@if(@_jscript_version<5.6)ns_={Form:function(){}};ns_.Form.onFailure=function(){};ns_.Form.prototype.onFailure=function(){};@else@*/
if (typeof (ns_) == "undefined") {
    ns_ = new Object()
}
ns_.extend = function (a, c) {
    for (var b in c) {
        a[b] = c[b]
    }
    return a
};
ns_.encode = self.encodeURIComponent ? self.encodeURIComponent : function (a) {
    return escape(a).replace(/\//g, "%2F")
};
ns_.b = {};
ns_.b.ie = /*@cc_on!@*/
    false;
ns_.b.ie9 = ns_.b.ie && document.addEventListener;
ns_.b.sf = navigator.vendor ? /apple/i.test(navigator.vendor) : false;
ns_.b.ch = window.chrome ? true : false;
ns_.b.ff = /firefox/i.test(navigator.userAgent);
ns_.b.op = window.opera ? true : false;
if (typeof (ns_) == "undefined") {
    ns_ = new Object()
}
ns_.dt = {
    initDate: new Date().getTime(),
    lastRun: new Date().getTime(),
    delta: 0,
    intervalID: null,
    intervalTime: 1000,
    intervalRuns: 0,
    timedObserver: function () {
        var a = ns_.dt.getTime();
        ns_.dt.intervalID = setTimeout(ns_.dt.timedObserver, ns_.dt.intervalTime);
        ns_.dt.intervalRuns++;
        var b = a - ns_.dt.lastRun - ns_.dt.intervalTime;
        if (b > (ns_.dt.intervalTime * 2) || b < -(ns_.dt.intervalTime * 2)) {
            ns_.dt.delta += b;
            a -= b
        }
        ns_.dt.lastRun = a
    },
    getTime: function () {
        var a = new Date().getTime();
        return a - ns_.dt.delta
    }
};
ns_.dt.timedObserver();
ns_.extend(Function.prototype, (function () {
    var e = Array.prototype.slice;

    function d(k, h) {
        var j = k.length,
            i = h.length;
        while (i--) {
            k[j + i] = h[i]
        }
        return k
    }

    function f(i, h) {
        i = e.call(i, 0);
        return d(i, h)
    }

    function a() {
        return this.STargumentIsSuper() ? ["$super"] : [""]
    }

    function c() {
        return /^[\s\(]*function[^(]*\(\s*\$super/.test(this.toString())
    }

    function b(j) {
        if (arguments.length < 2 && typeof arguments[0] == "undefined") {
            return this
        }
        var h = this,
            i = e.call(arguments, 1);
        return function () {
            var k = f(i, arguments);
            return h.apply(j, k)
        }
    }

    function g(i) {
        var h = this;
        return function () {
            var j = d([h.STbind(this)], arguments);
            return i.apply(this, j)
        }
    }
    return {
        STargumentNames: a,
        STargumentIsSuper: c,
        STbind: b,
        STwrap: g
    }
})());
ns_.Class = {
    extend: function (c, a) {
        if (arguments.length == 1) {
            a = c, c = null
        }
        if (typeof (c) == "function") {
            var b = function () {
                return this.initialize.apply(this, arguments)
            };
            b.prototype = new c()
        } else {
            var b = function () {}
        }
        if (a) {
            ns_.Class.inherit(b.prototype, a)
        }
        return b
    },
    inherit: function (e, b, h) {
        if (arguments.length == 3) {
            var c = e[h],
                d = b[h],
                g = d;
            var a;
            if (e && g.STargumentIsSuper()) {
                d = (function (f) {
                    return function () {
                        return f.apply(this, arguments)
                    }
                })(c).STwrap(g)
            } else {
                d = function () {
                    var j = this.parent;
                    this.parent = c;
                    var f = g.apply(this, arguments);
                    j ? this.parent = j : delete this.parent;
                    return f
                }
            }
            d.valueOf = function () {
                return g
            };
            d.toString = function () {
                return g.toString()
            };
            e[h] = d
        } else {
            for (var i in b) {
                if (e[i] && typeof (b[i]) == "function") {
                    ns_.Class.inherit(e, b, i)
                } else {
                    e[i] = b[i]
                }
            }
        }
        return e
    }
};
if (typeof (ns_.ar) == "undefined") {
    ns_.ar = {
        push: function () {
            for (var b = 0, a = arguments.length; b < a; b++) {
                this[this.length] = arguments[b]
            }
        },
        splice: function () {
            var j = ns_.ar.create(),
                d = arguments;
            if (d.length <= 1) {
                return j
            } else {
                if (d.length > 2) {
                    for (var f = 2, c = d.length; f < c; f++) {
                        j.push(d[f])
                    }
                }
            }
            var b = this.slice(0, d[0]);
            var e = this.slice(d[0], d[0] + d[1]);
            var h = this.slice(d[0] + d[1]);
            var g = b.concat(j, h);
            this.length = 0;
            for (var f = 0, c = g.length; f < c; f++) {
                this.push(g[f])
            }
            return e
        },
        shift: function () {
            for (var d = 0, a = this[0], c = this.length - 1; d < c; d++) {
                this[d] = this[d + 1]
            }
            this.length--;
            return a
        }
    }
}
ns_.ar.create = function () {
    var c = [];
    for (var a in c) {
        delete c[a]
    }
    for (var d = 0, b = arguments.length; d < b; d++) {
        c[c.length] = arguments[d]
    }
    return c
};
ns_.ar.indexOf = function (c, b) {
    var a = -1;
    ns_.ar.each(c, function (e, d) {
        if (e == b) {
            a = d
        }
    }, this);
    return a
};
ns_.ar.merge = function () {
    var a = ns_.ar.create();
    ns_.ar.each(arguments, function (b) {
        ns_.ar.each(b, function (d, c) {
            a[c] = d
        })
    }, this);
    return a
};
ns_.ar.pair = function (c, b) {
    var a = ns_.ar.create();
    ns_.ar.each(b, function (e, d) {
        a.push(d + c + e)
    }, this);
    return a
};
ns_.ar.each = function (g, f, d) {
    try {
        if (typeof (f) == "function") {
            d = typeof (d) != "undefined" ? d : this.each.caller;
            if (typeof g.length != "number" || typeof g[0] == "undefined") {
                var b = typeof (g.__proto__) != "undefined";
                for (var c in g) {
                    if ((!b || (b && typeof (g.__proto__[c]) == "undefined")) && typeof g[c] != "function") {
                        f.call(d, g[c], c)
                    }
                }
            } else {
                for (var c = 0, a = g.length; c < a; c++) {
                    f.call(d, g[c], c)
                }
            }
        }
    } catch (h) {}
};
ns_.st = {
    camel: function (e, d) {
        if (!d) {
            d = " "
        }
        var b = e.split(d);
        for (var c = 0, a = b.length; c < a; c++) {
            b[c] = b[c].charAt(0).toUpperCase() + b[c].substr(1).toLowerCase()
        }
        return b.join("")
    }
};
if (typeof (ns_.dom) == "undefined") {
    ns_.dom = {
        cache: {},
        getElementsByTagName: function (b, c) {
            var a, b = b,
                c = document.getElementById(c) || document;
            if (c.getElementsByTagName) {
                a = c.getElementsByTagName(b)
            } else {
                if (c.all && c.all.tags) {
                    a = c.all.tags(b)
                }
            }
            return a || []
        },
        addEvent: (document.addEventListener) ? (function (a, c, b) {
            a.addEventListener(c, b, false);
            if (ns_.dom.cache) {
                ns_.dom.cache.add(a, c, b, false)
            }
            return true
        }) : (document.attachEvent) ? (function (a, c, b) {
            var d;
            if (typeof a.addEventListener != "undefined") {
                d = a.addEventListener(c, b)
            } else {
                c = (c.substring(0, 1) == c.substring(0, 1).toUpperCase() ? c : "on" + c);
                d = a.attachEvent(c, b)
            }
            if (d && ns_.dom.cache) {
                ns_.dom.cache.add(a, c, b, false)
            }
            return d
        }) : (function (c, b, a) {
            if (document.layers && c == document && b.toLowerCase() == "click") {
                b = "mouseup";
                c.captureEvents(Event.MOUSEUP)
            }
            var d = c["on" + b];
            if (typeof d != "function") {
                c["on" + b] = a
            } else {
                c["on" + b] = function (f) {
                    if (d) {
                        d(f)
                    }
                    a(f)
                }
            }
            if (ns_.dom.cache) {
                ns_.dom.cache.add(c, b, a, false)
            }
            return true
        }),
        removeEvent: function (a, c, b) {
            ns_.dom.cache.del(a, c, b)
        }
    }
}
ns_.dom.cache = {
    _events: ns_.ar.create(),
    add: function (b, d, c, a) {
        this._events.push(arguments)
    },
    del: function (a, c, b) {
        ns_.ar.each(this._events, function (e, d) {
            if (!!!b && e[0] == a && e[1] == c) {
                this.detach(e[0], e[1], e[2], e[3]);
                this._events.splice(d, 1);
                throw "Event found"
            } else {
                if (!!b && e[0] == a && e[1] == c && e[2] == b) {
                    this.detach(e[0], e[1], e[2], e[3]);
                    this._events.splice(d, 1);
                    throw "Event found"
                }
            }
        }, ns_.dom.cache)
    },
    detach: function (b, d, c, a) {
        if (typeof b.removeEventListener != "undefined") {
            if (ns_.b.ie) {
                b.removeEventListener(d, c)
            } else {
                b.removeEventListener(d, c, a)
            }
        } else {
            if (b.detachEvent) {
                b.detachEvent(d, c)
            }
        }
    },
    flush: function () {
        try {
            ns_.ar.each(this._events, function (c, b) {
                if (typeof c != "undefined") {
                    this.detach(c[0], c[1], c[2], c[3]);
                    this._events.splice(b, 1)
                }
            }, ns_.dom.cache)
        } catch (a) {}
    }
};
ns_.dom.addEvent(window, "unload", ns_.dom.cache.flush.STbind(ns_.dom.cache));
ns_.Error = {};
ns_.Class.extend((function () {
    var c = false;

    function e(g) {
        c = !!g
    }

    function f(g) {
        var h = [new Date()];
        h = h.concat([("0" + h[0].getHours()).slice(-2), ("0" + h[0].getMinutes()).slice(-2), ("0" + h[0].getSeconds()).slice(-2), ("00" + h[0].getMilliseconds()).slice(-3)]);
        g = f.caller[0] = "[" + h[1] + ":" + h[2] + ":" + h[3] + "." + h[4] + "] " + g;
        return true
    }

    function b(j) {
        for (var h = 0, g = arguments.length; h < g; h++) {
            f(arguments[h])
        }
        a()
    }

    function d(j) {
        for (var h = 0, g = arguments.length; h < g; h++) {
            f(arguments[h])
        }
        a();
        if (c) {
            throw j
        }
        return false
    }

    function a() {
        if (c && typeof (console) == "object") {
            if (console[a.caller.name]) {
                console[a.caller.name].apply(console, a.caller.arguments)
            } else {
                if (console.log) {
                    for (var h = 0, g = a.caller.arguments.length; h < g; h++) {
                        console.log(a.caller.arguments[h])
                    }
                }
            }
        } else {
            if (c && (!a.caller.name || a.caller.name == "error")) {
                for (var h = 0, g = a.caller.arguments.length; h < g; h++) {
                    alert(a.caller.arguments[h])
                }
            }
        }
    }
    ns_.Class.inherit(ns_.Error, {
        log: b,
        debug: b,
        error: d,
        setDebug: e
    })
})());
ns_.Lifecycle = ns_.Class.extend(function () {}, {
    log: ns_.Error.error,
    current: null,
    states: null,
    params: null,
    initialize: function (a, b) {
        if (typeof a != "string" || a.length < 1) {
            this.log("ns_.Lifecycle: EmptyStates")
        }
        if (typeof b != "function") {
            this.log("ns_.Lifecycle: InvalidStartCallback")
        }
        a = a.split(" ");
        ns_.ar.each(a, function (d, c) {
            if (!/^\w+$/i.test(d)) {
                a.splice(c, 1)
            }
        }, this);
        if (a.length < 1) {
            this.log("ns_.Lifecycle: InvalidStates")
        }
        this.states = a;
        this.current = "";
        this.params = {}
    },
    property: function (a, b, c) {
        if (!a) {
            this.log("ns_.Lifecycle: EmptyName")
        }
        this["get" + ns_.st.camel(a)] = function () {
            return this.params[a]
        };
        if (!b) {
            this["set" + ns_.st.camel(a)] = function (d) {
                this.params[a] = d
            }
        } else {
            this["set" + ns_.st.camel(a)] = b
        }
        if (c) {
            this["set" + ns_.st.camel(a)].call(this, c)
        } else {
            this["set" + ns_.st.camel(a)].call(this, "")
        }
    },
    doChecks: function (b, a) {
        if (!(this.states && this.states.length > 0)) {
            throw "ns_.Lifecycle: EmptyStates"
        }
        if (ns_.ar.indexOf(this.states, b) == -1) {
            throw "ns_.Lifecycle: InvalidMutation"
        }
        if ((typeof a != "function") && (typeof a != "object")) {
            throw "ns_.Lifecycle: InvalidEntitlement"
        }
    },
    creation: function (b, d, f, a) {
        try {
            this.doChecks(f, a)
        } catch (c) {
            this.log(c)
        }
        ns_.ar.each(d, function (g, e) {
            this.property(e, g)
        }, this);
        this[b] = (function (k, l, g, i) {
            i = i || {};
            var h = ns_.ar.create();
            ns_.ar.each(k, function (n, m) {
                if (typeof (i[m]) != "undefined") {
                    try {
                        this["set" + ns_.st.camel(m)].call(this, i[m])
                    } catch (o) {
                        h.push(o)
                    }
                }
            }, this);
            if (this.current != "") {
                h.push("ns_.Lifecycle: InvalidSourceState")
            }
            if (!h.length) {
                try {
                    g.apply(this);
                    this.current = String(l);
                    ns_.Error.log("ns_.Lifecycle: Created at '" + l + "'")
                } catch (j) {
                    this.log(j);
                    return false
                }
                return true
            }
            return false
        }).STbind(this, d, f, a)
    },
    transition: function (b, d, g, f, a) {
        try {
            this.doChecks(f, a)
        } catch (c) {
            this.log(c)
        }
        ns_.ar.each(d, function (h, e) {
            this.property(e, h)
        }, this);
        this[b] = (function (l, n, m, h, j) {
            j = j || {};
            var i = ns_.ar.create();
            ns_.ar.each(l, function (p, o) {
                if (typeof (j[o]) != "undefined") {
                    try {
                        this["set" + ns_.st.camel(o)].call(this, j[o])
                    } catch (q) {
                        i.push(q)
                    }
                }
            }, this);
            if (ns_.ar.indexOf(n.split(" "), this.current) < 0) {
                i.push("ns_.Lifecycle: InvalidSourceState")
            }
            if (!i.length) {
                try {
                    h.apply(this);
                    this.current = String(m);
                    ns_.Error.log("ns_.Lifecycle: Transitioning to '" + m + "'")
                } catch (k) {
                    this.log(k);
                    return false
                }
                return true
            }
            return false
        }).STbind(this, d, g, f, a)
    }
});
ns_.Form = ns_.Class.extend(function () {}, {
    VERSION: "2.1204.27",
    conf: {
        DEBUG: false,
        TIMER_DELAY: 500,
        LABEL_NS: "ns_fo_",
        INIT_TIMER: 30000,
        SUBMIT_TIMER: 1000,
        FAILURE_TIMER: 1000,
        pixelUrl: "",
        labels: {}
    },
    init: null,
    start: null,
    id: null,
    tag: null,
    fields: null,
    settings: null,
    lastField: null,
    validations: null,
    lastValidated: null,
    lastValidation: null,
    sequence: null,
    state: null,
    wasSubmitted: null,
    watcher: null,
    fix: null,
    fail: null,
    button: null,
    pixelUrl: function () {
        var c = this.conf.pixelUrl || (self.ns_p && typeof ns_p.src == "string" ? ns_p.src : (self.ns_pixelUrl ? ns_pixelUrl : ""));
        var f = c.indexOf("&");
        if (f != -1) {
            var b = c.substring(0, f),
                e = c.substr(f + 1).split("&");
            for (var d = 0, a = e.length; d < a; d++) {
                if (/(c[23456]|name)/.test(e[d].split("=")[0])) {
                    b += "&" + e[d]
                }
            }
            return b
        } else {
            if (c.indexOf("?") == -1 || c.charAt(c.length - 1) == "?") {
                return c + ((c.charAt(c.length - 1) != "?") ? "?" : "") + this.id
            }
        }
        return c
    },
    initialize: function (g, l, e) {
        this.init = ns_.dt.getTime();
        var c = (function () {
            this.state = new ns_.Lifecycle("inactive active failed complete abandoned", function () {});
            this.state.property("form", null, this);
            this.state.creation("onInit", {}, "inactive", function () {
                try {
                    var n = this.params.form;
                    n.start = 0;
                    n.validations = ns_.ar.create();
                    n.wasSubmitted = false;
                    n.watch();
                    if (!self.ns_p && !self.ns_pixelUrl && !n.conf.pixelUrl) {
                        ns_.Error.log("ns_.Form: Attention, no pixelUrl found")
                    }
                } catch (o) {
                    ns_.Error.error(o)
                }
            });
            var f = {
                lastField: null,
                type: null
            };
            this.state.transition("onInput", f, "active inactive failed", "active", function () {
                try {
                    var n = this.params.lastField,
                        o = this.params.type,
                        p = this.params.form;
                    if (!p.start) {
                        p.start = ns_.dt.getTime()
                    }
                    if (n != null && n != undefined) {
                        if (n.getType()) {
                            p.lastField = n
                        }
                        n.value()
                    }
                    if (o && o != "blur") {
                        p.countDown()
                    }
                } catch (q) {
                    ns_.Error.error(q)
                }
            });
            this.state.transition("onError", {
                field: null,
                message: null
            }, "inactive active failed complete abandoned", "failed", function () {
                try {
                    var p = this.params.form;
                    if (!p.shallTransmit("failure")) {
                        return
                    }
                    var o = p.field(this.params.field);
                    if (o.length > 0) {
                        o = o[0]
                    } else {
                        throw "ns_.Form.onFailure(): unrecognized field [" + this.params.field + "]"
                    }
                    var r = ns_.ar.create(o.id, this.params.message);
                    p.validations.push(r);
                    p.lastValidated = o;
                    p.lastValidation = this.params.message;
                    if (p.wasSubmitted && p.wasSubmitted.type == ns_.Form.SUBMIT) {
                        p.sequence--;
                        p.wasSubmitted = false
                    }
                    p.fix = undefined;
                    p.fail = ns_.dt.getTime();
                    var n = new ns_.Form.Measurement(p, ns_.Form.FAILURE);
                    ns_.Form.sitestat(p.pixelUrl(), n.labels);
                    p.values()
                } catch (q) {
                    ns_.Error.error(q)
                }
            });
            this.state.transition("onSubmit", {}, "inactive active failed", "complete", function () {
                try {
                    var p = this.params.form,
                        r = ns_.dt.getTime();
                    if (!p.shallTransmit("submit")) {
                        return
                    }
                    if (!isNaN(p.fail) && r - p.fail < p.conf.FAILURE_TIMER) {
                        throw "ns_.Form: Canceled submit colliding with failures"
                    } else {
                        p.fail = undefined
                    }
                    var o = new ns_.Form.Measurement(p, ns_.Form.SUBMIT);
                    p.wasSubmitted = o
                } catch (q) {
                    ns_.Error.error(q)
                }
            });
            this.state.transition("onAbandon", {}, "active failed", "abandoned", function () {
                try {
                    var o = this.params.form;
                    if (!o.shallTransmit("abandon")) {
                        return
                    }
                    var n = new ns_.Form.Measurement(o, ns_.Form.ABANDON);
                    ns_.Form.sitestat(o.pixelUrl(), n.labels)
                } catch (p) {
                    ns_.Error.error(p)
                }
            })
        }).STbind(this);
        l = l || {};
        e = e || {};
        ns_.ar.each(this.conf, function (n, f) {
            this.conf[f] = (typeof (e[f]) != "undefined") ? e[f] : n
        }, this);
        ns_.Error.setDebug(this.conf.DEBUG);
        var k = "ns_.Form(): '" + g + "' was provided, but no form was found";
        if (!g || g == "") {
            ns_.Error.error("ns_.Form(): argument formName is blank. Provide it or an asterisk * for all");
            return new Boolean(0)
        } else {
            if (typeof g == "object") {
                var i = ns_.Form.get(g);
                if (i) {
                    return i
                }
                this.tag = g;
                this.id = g = this.fetchID(this.tag)
            } else {
                if (g == "*") {
                    var h = ns_.dom.getElementsByTagName("FORM");
                    if (h.length > 0) {
                        this.id = this.fetchID(h[0]);
                        this.tag = h[0];
                        ns_.ar.each(h, function (f) {
                            new ns_.Form(f, l, e)
                        }, this);
                        if (ns_.Form.get(this.id)) {
                            return ns_.Form.get(this.id)
                        }
                    } else {
                        if (!ns_.Form.loaded) {
                            ns_.Form.cache.push(ns_.ar.create(g, l, e))
                        } else {
                            ns_.Error.error(k)
                        }
                        return new Boolean(0)
                    }
                } else {
                    if (typeof g == "string") {
                        if (!ns_.Form.get(g)) {
                            var d = this.form(g);
                            if (d) {
                                this.tag = d;
                                this.id = this.fetchID(this.tag)
                            } else {
                                if (!ns_.Form.loaded) {
                                    ns_.Form.cache.push(ns_.ar.create(g, l, e))
                                } else {
                                    ns_.Error.error(k)
                                }
                                return new Boolean(0)
                            }
                        } else {
                            return ns_.Form.get(g)
                        }
                    }
                }
            }
        }
        this.sequence = 1;
        this.fail = undefined;
        this.fix = undefined;
        this.watcher = 0;
        this.id = this.id || "";
        this.fields = ns_.ar.create();
        this.anchors = ns_.ar.create();
        if (typeof this.tag == "undefined") {
            return new Boolean(0)
        }
        ns_.Form.store.push(this);
        this.settings = this.defaults();
        var b, j, m = ns_.Form.Element,
            a = this.defaults;
        ns_.ar.each(this.tag.elements, function (f) {
            new m(f, this, a(false))
        }, this);
        ns_.ar.each(ns_.dom.getElementsByTagName("A", this.tag), function (f) {
            new m(f, this, a(false))
        }, this);
        this.parseFields(l);
        c();
        this.isVisible = this.isVisible.STbind(this);
        ns_.dom.addEvent(this.tag, "submit", (function () {
            this.state.onSubmit()
        }).STbind(this));
        ns_.dom.addEvent(this.tag, "mousedown", (function () {
            this.state.onInput({
                lastField: null,
                type: null
            })
        }).STbind(this));
        this.state.onInit()
    },
    parseFields: function (a) {
        var b = ns_.Form.Element,
            c = this.defaults;
        if (typeof a != "undefined" && typeof a == "object") {
            ns_.ar.each(a, function (e, d) {
                if (d == "*" || (d == 0 && e == "*")) {
                    this.settings = c(a["*"]);
                    ns_.ar.each(this.tag.elements, function (f) {
                        new b(f, this, c(this.settings))
                    }, this)
                } else {
                    if (d != "") {
                        switch (d) {
                            case "abandon":
                                this.settings = c(a);
                                break;
                            case "submit":
                                this.settings = c(a);
                                break;
                            case "failure":
                                this.settings = c(a);
                                break;
                            case "password":
                                this.settings = c(a);
                                break;
                            case "hidden":
                                this.settings = c(a);
                                break;
                            default:
                                ns_.ar.each(this.element(d), function (f) {
                                    new b(f, this, c(a[d]))
                                }, this);
                                break
                        }
                    }
                }
            }, this)
        } else {
            if (a == "*") {
                this.settings = c();
                ns_.ar.each(this.tag.elements, function (d) {
                    new b(d, this, c(this.settings))
                }, this)
            }
        }
    },
    watch: function () {
        if (this.watcher == 0 && (this.state.current == "" || this.state.current == "inactive")) {
            this.watcher = setTimeout((function (a) {
                return function () {
                    if (a.current == "inactive" && a.params.form.isVisible() && ns_.Form.wfocus) {
                        a.onInput({
                            lastField: null,
                            type: null
                        })
                    }
                    a.params.form.watcher = 0
                }
            })(this.state), this.conf.INIT_TIMER)
        }
    },
    unwatch: function () {
        if (!isNaN(this.watcher)) {
            clearTimeout(this.watcher);
            this.watcher = 0
        }
    },
    defaults: function (b) {
        if (typeof conf == "undefined") {
            conf = null
        } else {
            if (!b) {
                b = false
            }
        }
        var a = ns_.extend({
            submit: true,
            abandon: false,
            failure: false,
            password: {
                submit: false,
                abandon: false,
                failure: false
            },
            hidden: {
                submit: false,
                abandon: false,
                failure: false
            }
        }, this.settings);
        if (b != null && typeof b == "object") {
            ns_.ar.each(b, function (d, c) {
                if (typeof d != "undefined") {
                    switch (c) {
                        case "submit":
                        case "abandon":
                        case "failure":
                            a[c] = !!d;
                            break;
                        case "password":
                        case "hidden":
                            if (d != null && typeof d == "object") {
                                ns_.ar.each(d, function (f, e) {
                                    if (typeof f != "undefined") {
                                        switch (e) {
                                            case "submit":
                                            case "abandon":
                                            case "failure":
                                                a[c][e] = !!f;
                                                break;
                                            default:
                                                break
                                        }
                                    }
                                }, this)
                            } else {
                                if (d == true) {
                                    a[c] = {
                                        submit: true,
                                        abandon: true,
                                        failure: true
                                    }
                                }
                            }
                            default:
                                break
                    }
                }
            }, this)
        } else {
            if (b == false) {
                a = {
                    submit: false,
                    abandon: false,
                    failure: false,
                    hidden: {
                        submit: false,
                        abandon: false,
                        failure: false
                    },
                    password: {
                        submit: false,
                        abandon: false,
                        failure: false
                    }
                }
            }
        }
        return a
    },
    shallTransmit: function (b) {
        var a = false;
        try {
            if (this.settings[b] || this.settings.hidden[b] || this.settings.password[b]) {
                a = true
            }
        } catch (c) {}
        return a
    },
    form: function (b) {
        var a, c, b = b || "";
        c = ns_.dom.getElementsByTagName("FORM");
        ns_.ar.each(c, function (d) {
            if (d.name == b || d.id == b) {
                a = d
            }
        }, this);
        return a
    },
    element: function (b) {
        var a = ns_.ar.create(),
            b = b || "";
        ns_.ar.each(this.tag.elements, function (c) {
            if (c.name == b || c.id == b) {
                a.push(c)
            }
        }, this);
        return a
    },
    field: function (b) {
        var a = ns_.ar.create(),
            b = b || "";
        ns_.ar.each(this.fields, function (c) {
            if (c.id == b) {
                a.push(c)
            }
        }, this);
        return a
    },
    fetchID: function (a) {
        if (a.name != "" && typeof a.name == "string") {
            return a.name
        } else {
            if (a.id != "" && typeof a.id == "string") {
                return a.id
            } else {
                a.id = "form" + ns_.ar.indexOf(document.forms, a);
                return a.id
            }
        }
    },
    registerField: function (c) {
        var b = ns_.ar.create();
        ns_.ar.each(this.fields, function (d) {
            if (d.id == c.id && (d.tag.type || "").toLowerCase() != "radio") {
                b.push(d)
            }
        }, this);
        if (!b.length) {
            this.fields.push(c);
            ns_.dom.addEvent(c.tag, "keyup", c.onUserAction);
            ns_.dom.addEvent(c.tag, "mousedown", c.onUserAction);
            ns_.dom.addEvent(c.tag, "change", c.onUserAction);
            ns_.dom.addEvent(c.tag, "blur", c.onUserAction);
            ns_.dom.addEvent(c.tag, "focus", c.onUserAction);
            var a = c.tag.type;
            if (a == "submit" || a == "button" || a == "image") {
                this.button = true
            }
        } else {
            ns_.ar.each(b, function (d) {
                d.setup(c.settings)
            }, this);
            delete c
        }
    },
    values: function () {
        var a = ns_.ar.create();
        ns_.ar.each(this.fields, function (b) {
            a[b.id] = b.value()
        }, this);
        return a
    },
    onUnload: function () {
        if (this.wasSubmitted == false && !this.button && (!isNaN(this.fix) && ns_.dt.getTime() - this.fix < this.conf.SUBMIT_TIMER)) {
            this.fix = undefined;
            this.state.onSubmit()
        }
        if (!this.wasSubmitted) {
            this.state.onAbandon()
        } else {
            ns_.Form.sitestat(this.pixelUrl(), this.wasSubmitted.labels);
            this.wasSubmitted = false
        }
    },
    countDown: function () {
        if (!this.button) {
            this.fix = ns_.dt.getTime()
        }
    },
    onFailure: function (b, a) {
        this.state.onError({
            field: b,
            message: a
        })
    },
    style: function (b) {
        var a = "";
        if (document.defaultView && document.defaultView.getComputedStyle) {
            a = document.defaultView.getComputedStyle(this.tag, "").getPropertyValue(b)
        } else {
            if (this.tag.currentStyle) {
                b = b.replace(/\-(\w)/g, function (c, d) {
                    return d.toUpperCase()
                });
                a = this.tag.currentStyle[b]
            }
        }
        return a
    },
    isVisible: function () {
        var b = this.style("display"),
            a = this.style("visibility");
        if (b == "none" || a == "hidden") {
            return false
        }
        return true
    },
    beat: function () {
        var c = false,
            b = document.getElementsByName(this.id),
            d = document.getElementById(this.id) || b[0];
        if (b.length < 1 && !d) {
            c = true
        } else {
            if (!this.isVisible()) {
                c = true
            }
        }
        if (c) {
            this.onUnload()
        }
    }
});
ns_.Form.SUBMIT = "submit";
ns_.Form.ABANDON = "submitabandon";
ns_.Form.FAILURE = "submitvalfail";
ns_.Form.start = typeof (ns_loadingtime1) != "undefined" ? ns_loadingtime1 : ns_.dt.getTime();
ns_.Form.rx = {
    TypeLb: /type/i,
    AllForms: /\*/,
    FormElm: /^(input|select|textarea|a|button)$/i,
    InputElm: /^(input|select|textarea)$/i,
    InputElmTy: /[^(submit|reset|button)]/i,
    Input: /^input$/i,
    Hidden: /^inputhidden$/i,
    Password: /^inputpassword$/i,
    Radio: /^inputradio$/i,
    Checkbox: /^inputcheckbox$/i,
    TextArea: /^textarea$/i,
    SelectBox: /^select$/i,
    Failure: /^submitvalfail$/i,
    TLDrx: /^(https?\:)?(\/\/)?[^\/\?]+[\/\?]/i
};
ns_.Form.store = ns_.ar.create();
ns_.Form.cache = ns_.ar.create();
ns_.Form.loaded = false;
ns_.Form.get = function (b) {
    var a, b = b || 0;
    ns_.ar.each(ns_.Form.store, function (d, c) {
        if (typeof (b) == "string") {
            if (d.id == b) {
                a = d
            }
        } else {
            if (typeof (b) == "object") {
                if (d == b || d.tag == b) {
                    a = d
                }
            } else {
                if (!isNaN(b)) {
                    if (b == c) {
                        a = d
                    }
                }
            }
        }
    }, this);
    return a
};
ns_.Form.beat = function () {
    ns_.ar.each(ns_.Form.store, function (a) {
        a.beat()
    }, this)
};
if (ns_.b.ff || ns_.b.sf) {
    ns_.dom.addEvent(document, "DOMSubtreeModified", function () {
        ns_.Form.beat()
    })
}
ns_.dom.addEvent(document, "mousedown", ns_.Form.beat);
ns_.Form.onFailure = function (b, d, a) {
    if (b == null || b == "") {
        ns_.ar.each(ns_.Form.store, function (e) {
            e.onFailure(d, a)
        }, this)
    } else {
        var c = ns_.Form.get(b);
        if (c != null) {
            c.onFailure(d, a)
        }
    }
};
ns_.Form.onLoad = function (g) {
    var d = ns_.Form;
    d.loaded = true;
    if (!d.store.length && d.cache.length) {
        for (var c = 0, a = d.cache.length; c < a; c++) {
            var g = d.cache[c];
            new d(g[0], g[1], g[2])
        }
    } else {
        if (!d.store.length) {
            var b = function (i, f, e) {
                ns_.ar.each(f, function (j) {
                    var k = j.className.split(" ");
                    ns_.ar.each(k, function (l) {
                        if (l == i) {
                            e(j)
                        }
                    }, this)
                }, this)
            };
            var h = ns_.dom.getElementsByTagName("FORM");
            if (h.length > 0) {
                b("ns_", h, function (e) {
                    new ns_.Form(e)
                });
                ns_.ar.each(ns_.Form.store, function (i) {
                    var e = {},
                        f = {
                            abandon: true,
                            failure: true
                        };
                    b("ns_", i.tag.elements, function (j) {
                        e[j.id || j.name] = f
                    });
                    i.parseFields(e);
                    i.settings = i.defaults(f)
                }, this)
            }
        }
    }
};
ns_.Form.onUnload = function (a) {
    ns_.ar.each(ns_.Form.store, function (b) {
        b.onUnload()
    }, this)
};
ns_.dom.addEvent(window, "beforeunload", ns_.Form.onUnload);
ns_.dom.addEvent(window, "load", ns_.Form.onLoad);
ns_.dom.addEvent(window, "unload", ns_.Form.onUnload);
ns_.Form.wfocus = true;
ns_.dom.addEvent(window, ns_.ie ? "focusout" : "blur", function (a) {
    ns_.Form.wfocus = false;
    ns_.ar.each(ns_.Form.store, function (b) {
        b.unwatch()
    })
});
ns_.dom.addEvent(window, ns_.ie ? "focusin" : "focus", function (a) {
    ns_.Form.wfocus = true;
    ns_.ar.each(ns_.Form.store, function (b) {
        b.watch()
    })
});
ns_.Form.sitestat = function (b, g) {
    var e = window.sitestat = ((typeof (window.sitestat) == "function") && (!ns_.b.ie && g && (typeof (g.ns_fo_ev) == "undefined" || ns_.Form.rx.Failure.test(g.ns_fo_ev)))) ? window.sitestat : function (j) {
        var m = new Image();
        m.src = j;
        if (!ns_.b.ie) {
            for (var k = 0, h = 100; k < h; k++) {
                var n = new Function("a", "b", "return a+b");
                var o = n(k, 1)
            }
        }
    };
    if (b) {
        g = (typeof g == "object" ? g : {});
        var f = b;
        ns_.ar.each(g, function (i, h) {
            f = f + "&" + h + "=" + i
        }, this);
        if (ns_.Form.rx.TLDrx.test(b)) {
            e(f)
        } else {
            var a = "",
                c;
            if (self.ns_p && typeof ns_p.src == "string") {
                a = ns_p.src
            } else {
                if (self.ns_pixelUrl) {
                    a = ns_pixelUrl
                }
            }
            if (a) {
                c = a.lastIndexOf("?");
                a = a.substring(0, c > 0 ? c : a.length) + "?" + f
            }
            if (a) {
                var d = a.indexOf("&");
                if ((d > 0) && !ns_.Form.rx.TypeLb.test(a)) {
                    e(a.substring(0, d) + "&type=hidden" + a.substring(d))
                } else {
                    if (!ns_.Form.rx.TypeLb.test(a)) {
                        e(a + "&type=hidden")
                    } else {
                        e(a)
                    }
                }
            }
        }
    }
};
ns_.Form.Element = ns_.Class.extend(function () {}, {
    form: null,
    id: null,
    tag: null,
    settings: null,
    cache: null,
    throttle: null,
    skipKeys: ns_.ar.create(),
    initialize: function (d, f, e) {
        var c = this;
        if (!ns_.Form.rx.FormElm.test(d.tagName)) {
            return new Boolean(false)
        }
        c.tag = d;
        c.form = f;
        c.id = c.fetchID();
        c.cache = "";
        c.throttle = ns_.ar.create();
        if (!c.skipKeys.length) {
            for (var b = 1, a = 94; b < a; b++) {
                c.skipKeys.push(b)
            }
            for (var b = 112, a = 146; b < a; b++) {
                c.skipKeys.push(b)
            }
            c.skipKeys.push(224)
        }
        c.onDispatch = c.onDispatch.STbind(this);
        c.onUserAction = c.onUserAction.STbind(this);
        c.settings = {
            submit: true,
            abandon: false,
            failure: false
        };
        c.setup(e);
        c.value();
        c.form.registerField(this)
    },
    setup: function (c) {
        var b = ns_.Form.rx,
            a = this.tag;
        if (!b.InputElm.test(a.tagName)) {
            c = this.form.defaults(false)
        } else {
            if (b.Hidden.test(a.tagName + a.type)) {
                if (c && typeof c.hidden == "object") {
                    c = c.hidden
                }
            } else {
                if (b.Password.test(a.tagName + a.type)) {
                    if (c && typeof c.password == "object") {
                        c = c.password
                    }
                }
            }
        }
        ns_.ar.each(c, function (e, d) {
            switch (d) {
                case "submit":
                case "abandon":
                case "failure":
                    this.settings[d] = e;
                    break;
                case "password":
                case "hidden":
                default:
                    break
            }
        }, this)
    },
    fetchID: function () {
        var a = this.tag;
        if (a.name && a.name != "") {
            return a.name
        } else {
            if (a.id && a.id != "") {
                return a.id
            } else {
                a.id = "input" + ns_.ar.indexOf(this.form.tag.elements, a);
                return a.id
            }
        }
    },
    value: function () {
        var a = "",
            f = this.getType(),
            g = ns_.Form.rx,
            e = this.tag;
        if (f == ns_.Form.Element.PASSWD) {
            a = e.value == "" ? "no" : "yes"
        } else {
            if (g.Checkbox.test(e.tagName + e.type)) {
                if (e.checked) {
                    a = "yes"
                } else {
                    a = "no"
                }
            } else {
                if (g.Input.test(e.tagName) || g.TextArea.test(e.tagName) || g.Radio.test(e.tagName + e.type) || g.Hidden.test(e.tagName + e.type)) {
                    a = e.value
                } else {
                    if (g.SelectBox.test(e.tagName)) {
                        if (e.multiple) {
                            var c = ns_.ar.create();
                            for (var d = 0, b = e.options.length; d < b; d++) {
                                if (e.options[d].selected) {
                                    c.push(e.options[d].value)
                                }
                            }
                            a = c
                        } else {
                            if (e.selectedIndex != -1) {
                                a = e.options[e.selectedIndex].value
                            }
                        }
                    }
                }
            }
        }
        this.cache = a;
        return a
    },
    getType: function () {
        var a = this.tag.tagName + this.tag.type,
            b = ns_.Form.rx;
        if (b.Hidden.test(a)) {
            return ns_.Form.Element.HIDDEN
        } else {
            if (b.Password.test(a)) {
                return ns_.Form.Element.PASSWD
            } else {
                if (b.InputElm.test(this.tag.tagName) && (b.Input.test(this.tag.tagName) ? b.InputElmTy.test(this.tag.type) : true)) {
                    return ns_.Form.Element.NORMAL
                } else {
                    return false
                }
            }
        }
    },
    onUserAction: function (c) {
        var c = c || window.event,
            b = this,
            h = c.type || "all",
            g = true,
            a = c.which || c.keyCode,
            f = ns_.dt.getTime();
        if (ns_.ar.indexOf(this.skipKeys, String.fromCharCode(a)) != -1) {
            g = false
        }
        if (g) {
            var d = {
                lastField: b,
                type: h
            };
            b.form.state.onInput(d);
            if (h == "blur") {
                b.form.beat()
            }
            b.throttle[h] = f
        }
    },
    onDispatch: function (d, a) {
        if (this.getType() == false || (ns_.Form.rx.Radio.test(this.tag.tagName + this.tag.type) && !this.tag.checked)) {
            return false
        }
        var e = this.form.conf.LABEL_NS + this.getType(),
            c = this.settings;
        var f = false;
        switch (d) {
            case ns_.Form.SUBMIT:
                f = c.submit;
                break;
            case ns_.Form.ABANDON:
                f = c.abandon;
                break;
            case ns_.Form.FAILURE:
                f = c.failure;
                break
        }
        if (f) {
            var b = typeof (this.cache) == "string" ? ns_.ar.create(this.cache) : this.cache;
            ns_.ar.each(b, function (g) {
                if (typeof (a[e + "n"]) == "string") {
                    a[e + "n"] = a[e + "n"] + ";" + ns_.encode(this.id);
                    a[e + "v"] = a[e + "v"] + ";" + ns_.encode(g)
                } else {
                    a[e + "n"] = ns_.encode(this.id);
                    a[e + "v"] = ns_.encode(g)
                }
            }, this)
        }
    }
});
ns_.Form.Element.NORMAL = "f";
ns_.Form.Element.PASSWD = "p";
ns_.Form.Element.HIDDEN = "h";
ns_.Form.Measurement = ns_.Class.extend(function () {}, {
    form: null,
    type: ns_.Form.SUBMIT,
    labels: null,
    initialize: function (b, a) {
        this.labels = ns_.extend(ns_.ar.create(), b.conf.labels);
        this.form = b;
        this.setType(a);
        this.dispatch()
    },
    setType: function (a) {
        switch (a) {
            case ns_.Form.ABANDON:
            case ns_.Form.FAILURE:
            case ns_.Form.SUBMIT:
                this.type = a;
                break
        }
    },
    resetLabels: function () {
        this.labels = ns_.ar.create()
    },
    setLabels: function (c) {
        if (typeof (c) == "string") {
            var a = ns_.ar.merge(ns_.ar.create(), c.split("&")),
                b = ns_.ar.create();
            ns_.ar.each(a, function (d, e) {
                if (d.indexOf("=")) {
                    var f = d.split("=");
                    b[f[0]] = f[1]
                }
            }, this);
            this.labels = ns_.ar.merge(this.labels, b)
        } else {
            if (typeof c.pop != "null") {
                this.labels = ns_.ar.merge(this.labels, c)
            }
        }
    },
    dispatch: function () {
        var d = ns_.dt.getTime(),
            g = this.form,
            e = g.conf.LABEL_NS,
            c = this.labels;
        c.type = "hidden";
        c[e + "ev"] = this.type;
        c[e + "id"] = ns_.encode(g.id);
        c[e + "la"] = g.lastField != null ? ns_.encode(g.lastField.id) : "";
        c[e + "sq"] = g.sequence++;
        c[e + "t0"] = d - ns_.Form.start;
        c[e + "t1"] = d - g.start;
        if (g.validations.length > 0) {
            var b = ns_.ar.create();
            ns_.ar.each(g.validations, function (f, h) {
                if (typeof (b[f[0]]) == "number") {
                    b[f[0]]++
                } else {
                    b[f[0]] = 1
                }
            }, this);
            var a = ns_.ar.create();
            ns_.ar.each(b, function (f, h) {
                a.push(ns_.encode(h) + ":" + f)
            }, this);
            c[e + "vfo"] = a.join("|");
            c[e + "vf"] = g.validations.length
        }
        if (g.lastValidated != null) {
            c[e + "vfl"] = ns_.encode(g.lastValidated.id)
        }
        if (typeof (g.lastValidation) == "string" && g.lastValidation != "") {
            c[e + "vfe"] = ns_.encode(g.lastValidation.substring(0, 255))
        }
        ns_.ar.each(g.fields, function (i, f) {
            try {
                i.onDispatch(this.type, c)
            } catch (h) {
                ns_.Error.error(h)
            }
        }, this);
        c[e + "sv"] = g.VERSION
    }
}); /*@end @*/
function ns_onclick(q, f, u, b, o) {
    var i = window,
        l = i.ns_p,
        m = l && l.src,
        s = "&ns_",
        h = document.referrer.replace(/\/$/, ""),
        f = f || q.href,
        o = o || "",
        j = {
            t: 0,
            o: 0
        },
        e = eventURL = c1_match = c2_match = "",
        c = /\bc1=[^&]+\b/i,
        g = /\bc2=[^&]+\b/i,
        p = (i.encodeURIComponent ? encodeURIComponent : escape),
        n = "3.1212.07";
    if (m && (c1_match = l.src.match(c)) && !c.test(u)) {
        e += "&" + c1_match
    }
    if (m && (c2_match = l.src.match(g)) && !g.test(u)) {
        e += "&" + c2_match
    }
    if (m) {
        var t = l.src,
            k = t.indexOf("?");
        eventURL = t.substr(0, k > -1 ? k : t.length) + "?"
    }
    eventURL = [eventURL, u, e, s, "type=", b, s, "action=view", s, "_t=", +new Date, h ? s + "referrer=" + p(h) : "", s, "sc_sv=", n, s, "sc_href=", p(f).substr(0, 1000)].join("");
    var r = q && q.target ? q.target.replace(/^_/, "") : "self",
        d = new Image();
    if (i[r]) {
        j.t = (function (w, v, a) {
            return function () {
                clearTimeout(a.o);
                d.onload = d.onerror = function () {
                    return
                };
                i[w].location.href = v
            }
        })(r, f, j);
        j.o = setTimeout(j.t, 5000);
        d.onload = d.onerror = j.t
    } else {
        i.open(f, r, o)
    }
    d.src = eventURL;
    return false
};
if ("false" === "true") {
    ns_ = ns_ || {};
    ns_.StreamSense = ns_.StreamSense || function () {
        function n(t) {
            e = t
        }

        function r(e) {
            t = e
        }

        function u(t, n) {
            var r = t || "",
                i = f,
                u = "undefined",
                a = s.comScore || s.sitestat || function (t) {
                    var n = "comScore=",
                        r = o.cookie,
                        i = "",
                        a = "indexOf",
                        f = "substring",
                        l = "length",
                        c = 2048,
                        h, p = "&ns_",
                        d = "&",
                        v, m, g, y, b = s.encodeURIComponent || escape;
                    if (r[a](n) + 1)
                        for (g = 0, m = r.split(";"), y = m[l]; g < y; g++) v = m[g][a](n), v + 1 && (i = d + unescape(m[g][f](v + n[l])));
                    t += p + "_t=" + +(new Date) + p + "c=" + (o.characterSet || o.defaultCharset || "") + i, t[l] > c && t[a](d) > 0 && (h = t[f](0, c - 8).lastIndexOf(d), t = (t[f](0, h) + p + "cut=" + b(t[f](h + 1)))[f](0, c)), e(t), typeof ns_p === u && (ns_p = {
                        src: t
                    }), ns_p.lastMeasurement = t
                };
            if (typeof n !== u) {
                var l = [],
                    c = s.encodeURIComponent || escape;
                for (var h in n) n.hasOwnProperty(h) && l.push(c(h) + "=" + c(n[h]));
                /[\?\&]$/.test(r) || (r += "&"), r += l.join("&")
            }
            return a(r)
        }

        function a(e, t) {
            var n, r = 2048,
                i = s.encodeURIComponent || escape,
                u = [],
                a = p.LABELS_ORDER,
                f = e.split("?"),
                l = f[0],
                c = f[1],
                h = c.split("&");
            for (var d = 0, v = h.length; d < v; d++) {
                var m = h[d].split("="),
                    g = unescape(m[0]),
                    y = unescape(m[1]);
                g && (t[g] = y)
            }
            var b = {};
            for (var d = 0, v = a.length; d < v; d++) {
                var w = a[d];
                t.hasOwnProperty(w) && (b[w] = !0, u.push(i(w) + "=" + i(t[w])))
            }
            for (var w in t) {
                if (b[w]) continue;
                t.hasOwnProperty(w) && u.push(i(w) + "=" + i(t[w]))
            }
            return n = l + "?" + u.join("&"), n = n + (n.indexOf("&c8=") < 0 ? "&c8=" + i(o.title) : "") + (n.indexOf("&c7=") < 0 ? "&c7=" + i(o.URL) : "") + (n.indexOf("&c9=") < 0 ? "&c9=" + i(o.referrer) : ""), n.length > r && n.indexOf("&") > 0 && (last = n.substr(0, r - 8).lastIndexOf("&"), n = (n.substring(0, last) + "&ns_cut=" + i(n.substring(last + 1))).substr(0, r)), n
        }
        var e = function (e, t) {},
            t = function (e, t, n) {};
        n(function (e, t) {
            var n = new Image;
            n.src = e, t && setTimeout(t, 0)
        }), r(function (e, t, n) {
            n && setTimeout(n, 0)
        });
        var i = typeof window != "undefined" && typeof document != "undefined",
            s, o;
        i ? (s = window, o = document) : (s = {}, o = {
            location: {
                href: ""
            },
            title: "",
            URL: "",
            referrer: "",
            cookie: ""
        });
        var f = function () {
                var e = {
                    uid: function () {
                        var e = 1;
                        return function () {
                            return +(new Date) + "_" + e++
                        }
                    }(),
                    filter: function (e, t) {
                        var n = {};
                        for (var r in t) t.hasOwnProperty(r) && e(t[r]) && (n[r] = t[r]);
                        return n
                    },
                    extend: function (e) {
                        var t = arguments.length,
                            n;
                        e = e || {};
                        for (var r = 1; r < t; r++) {
                            n = arguments[r];
                            if (!n) continue;
                            for (var i in n) n.hasOwnProperty(i) && (e[i] = n[i])
                        }
                        return e
                    },
                    getString: function (e, t) {
                        var n = String(e);
                        return e == null ? t || "na" : n
                    },
                    getLong: function (e, t) {
                        var n = Number(e);
                        return e == null || isNaN(n) ? t || 0 : n
                    },
                    getInteger: function (e, t) {
                        var n = Number(e);
                        return e == null || isNaN(n) ? t || 0 : n
                    },
                    getBoolean: function (e, t) {
                        var n = String(e).toLowerCase() == "true";
                        return e == null ? t || !1 : n
                    },
                    isNotEmpty: function (e) {
                        return e != null && e.length > 0
                    },
                    indexOf: function (t, n) {
                        var r = -1;
                        return e.forEach(n, function (e, n) {
                            e == t && (r = n)
                        }), r
                    },
                    forEach: function (e, t, n) {
                        try {
                            if (typeof t == "function") {
                                n = typeof n != "undefined" ? n : null;
                                if (typeof e["length"] != "number" || typeof e[0] == "undefined") {
                                    var r = typeof e.__proto__ != "undefined";
                                    for (var i in e)(!r || r && typeof e.__proto__[i] == "undefined") && typeof e[i] != "function" && t.call(n, e[i], i)
                                } else
                                    for (var i = 0, s = e.length; i < s; i++) t.call(n, e[i], i)
                            }
                        } catch (o) {}
                    },
                    regionMatches: function (e, t, n, r, i) {
                        if (t < 0 || r < 0 || t + i > e.length || r + i > n.length) return !1;
                        while (--i >= 0) {
                            var s = e.charAt(t++),
                                o = n.charAt(r++);
                            if (s != o) return !1
                        }
                        return !0
                    },
                    size: function (e) {
                        var t = 0,
                            n;
                        for (var n in e) e.hasOwnProperty(n) && t++;
                        return t
                    },
                    log: function (e, t) {
                        if (typeof t != "undefined" && t) {
                            var n = new Date,
                                r = n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
                            console.log(r, e)
                        }
                    },
                    isTrue: function (e) {
                        return typeof e == "undefined" ? !1 : typeof e == "string" ? (e = e.toLowerCase(), e === "true" || e === "1" || e === "on") : e ? !0 : !1
                    },
                    toString: function (t) {
                        if (typeof t == "undefined") return "undefined";
                        if (typeof t == "string") return t;
                        if (Object.prototype.toString.call(t) === "[object Array]") return t.join(",");
                        if (e.size(t) > 0) {
                            var n = "";
                            for (var r in t) t.hasOwnProperty(r) && (n += r + ":" + t[r] + ";");
                            return n
                        }
                        return t.toString()
                    },
                    exists: function (e) {
                        return typeof e != "undefined" && e != null
                    },
                    firstGreaterThan0: function () {
                        for (var e = 0, t = arguments.length; e < t; e++) {
                            var n = arguments[e];
                            if (n > 0) return n
                        }
                        return 0
                    }
                };
                return e.filterMap = function (t, n) {
                    for (var r in t) e.indexOf(r, n) == -1 && delete t[r]
                }, e.getKeys = function (e, t) {
                    var n, r = [];
                    for (n in e)(!t || t.test(n)) && e.hasOwnProperty(n) && (r[r.length] = n);
                    return r
                }, e.getBrowserName = function () {
                    var e = navigator.userAgent,
                        t = navigator.appName,
                        n, r, i;
                    return (r = e.indexOf("Opera")) != -1 ? t = "Opera" : (r = e.indexOf("MSIE")) != -1 ? t = "Microsoft Internet Explorer" : (r = e.indexOf("Chrome")) != -1 ? t = "Chrome" : (r = e.indexOf("Safari")) != -1 ? t = "Safari" : (r = e.indexOf("Firefox")) != -1 ? t = "Firefox" : (n = e.lastIndexOf(" ") + 1) < (r = e.lastIndexOf("/")) && (t = e.substring(n, r), t.toLowerCase() == t.toUpperCase() && (t = navigator.appName)), t
                }, e.getBrowserFullVersion = function () {
                    var e = navigator.userAgent,
                        t = "" + parseFloat(navigator.appVersion),
                        n = parseInt(navigator.appVersion, 10),
                        r, i, s;
                    return (i = e.indexOf("Opera")) != -1 ? (t = e.substring(i + 6), (i = e.indexOf("Version")) != -1 && (t = e.substring(i + 8))) : (i = e.indexOf("MSIE")) != -1 ? t = e.substring(i + 5) : (i = e.indexOf("Chrome")) != -1 ? t = e.substring(i + 7) : (i = e.indexOf("Safari")) != -1 ? (t = e.substring(i + 7), (i = e.indexOf("Version")) != -1 && (t = e.substring(i + 8))) : (i = e.indexOf("Firefox")) != -1 ? t = e.substring(i + 8) : (r = e.lastIndexOf(" ") + 1) < (i = e.lastIndexOf("/")) && (t = e.substring(i + 1)), (s = t.indexOf(";")) != -1 && (t = t.substring(0, s)), (s = t.indexOf(" ")) != -1 && (t = t.substring(0, s)), n = parseInt("" + t, 10), isNaN(n) && (t = "" + parseFloat(navigator.appVersion)), t
                }, e
            }(),
            l = function () {
                var e = ["play", "pause", "end", "buffer", "keep-alive", "hb", "custom", "ad_play", "ad_pause", "ad_end", "ad_click"];
                return {
                    PLAY: 0,
                    PAUSE: 1,
                    END: 2,
                    BUFFER: 3,
                    KEEP_ALIVE: 4,
                    HEART_BEAT: 5,
                    CUSTOM: 6,
                    AD_PLAY: 7,
                    AD_PAUSE: 8,
                    AD_END: 9,
                    AD_CLICK: 10,
                    toString: function (t) {
                        return e[t]
                    }
                }
            }(),
            c = function () {
                var e = [l.END, l.PLAY, l.PAUSE, l.BUFFER];
                return {
                    IDLE: 0,
                    PLAYING: 1,
                    PAUSED: 2,
                    BUFFERING: 3,
                    toEventType: function (t) {
                        return e[t]
                    }
                }
            }(),
            h = {
                ADPLAY: l.AD_PLAY,
                ADPAUSE: l.AD_PAUSE,
                ADEND: l.AD_END,
                ADCLICK: l.AD_CLICK
            },
            p = {
                STREAMSENSE_VERSION: "4.1403.25",
                DEFAULT_PLAYERNAME: "streamsense",
                DEFAULT_HEARTBEAT_INTERVAL: [{
                    playingtime: 6e4,
                    interval: 1e4
                }, {
                    playingtime: null,
                    interval: 6e4
                }],
                DEFAULT_KEEP_ALIVE_INTERVAL: 12e5,
                DEFAULT_PAUSED_ON_BUFFERING_INTERVAL: 500,
                C1_VALUE: "19",
                C10_VALUE: "js",
                NS_AP_C12M_VALUE: "1",
                NS_NC_VALUE: "1",
                PAGE_NAME_LABEL: "name",
                LABELS_ORDER: ["c1", "c2", "ns_site", "ns_vsite", "ns_ap_an", "ns_ap_pn", "ns_ap_pv", "c12", "name", "ns_ak", "ns_ap_ec", "ns_ap_ev", "ns_ap_device", "ns_ap_id", "ns_ap_csf", "ns_ap_bi", "ns_ap_pfm", "ns_ap_pfv", "ns_ap_ver", "ns_ap_sv", "ns_type", "ns_radio", "ns_nc", "ns_ap_ui", "ns_ap_gs", "ns_st_sv", "ns_st_pv", "ns_st_it", "ns_st_id", "ns_st_ec", "ns_st_sp", "ns_st_sq", "ns_st_cn", "ns_st_ev", "ns_st_po", "ns_st_cl", "ns_st_el", "ns_st_pb", "ns_st_hc", "ns_st_mp", "ns_st_mv", "ns_st_pn", "ns_st_tp", "ns_st_pt", "ns_st_pa", "ns_st_ad", "ns_st_li", "ns_st_ci", "ns_ap_jb", "ns_ap_res", "ns_ap_c12m", "ns_ap_install", "ns_ap_updated", "ns_ap_lastrun", "ns_ap_cs", "ns_ap_runs", "ns_ap_usage", "ns_ap_fg", "ns_ap_ft", "ns_ap_dft", "ns_ap_bt", "ns_ap_dbt", "ns_ap_dit", "ns_ap_as", "ns_ap_das", "ns_ap_it", "ns_ap_uc", "ns_ap_aus", "ns_ap_daus", "ns_ap_us", "ns_ap_dus", "ns_ap_ut", "ns_ap_oc", "ns_ap_uxc", "ns_ap_uxs", "ns_ap_lang", "ns_ap_miss", "ns_ts", "ns_st_ca", "ns_st_cp", "ns_st_er", "ns_st_pe", "ns_st_ui", "ns_st_bc", "ns_st_bt", "ns_st_bp", "ns_st_pc", "ns_st_pp", "ns_st_br", "ns_st_ub", "ns_st_vo", "ns_st_ws", "ns_st_pl", "ns_st_pr", "ns_st_ep", "ns_st_ty", "ns_st_cs", "ns_st_ge", "ns_st_st", "ns_st_dt", "ns_st_ct", "ns_st_de", "ns_st_pu", "ns_st_cu", "ns_st_fee", "c7", "c8", "c9"]
            },
            d = function () {
                var e = function () {
                    function h(e, t) {
                        var n = t[e];
                        n != null && (a[e] = n)
                    }
                    var e = this,
                        t = 0,
                        n = 0,
                        r = 0,
                        i = 0,
                        s = 0,
                        o = 0,
                        u, a;
                    f.extend(this, {
                        reset: function (t) {
                            t != null && t.length > 0 ? f.filterMap(a, t) : a = {}, a.hasOwnProperty("ns_st_cl") || (a.ns_st_cl = "0"), a.hasOwnProperty("ns_st_pn") || (a.ns_st_pn = "1"), a.hasOwnProperty("ns_st_tp") || (a.ns_st_tp = "1"), e.setPauses(0), e.setStarts(0), e.setBufferingTime(0), e.setBufferingTimestamp(-1), e.setPlaybackTime(0), e.setPlaybackTimestamp(-1)
                        },
                        setLabels: function (t, n) {
                            t != null && f.extend(a, t), e.setRegisters(a, n)
                        },
                        getLabels: function () {
                            return a
                        },
                        setLabel: function (t, n) {
                            var r = {};
                            r[t] = n, e.setLabels(r, null)
                        },
                        getLabel: function (e) {
                            return a[e]
                        },
                        getClipId: function () {
                            return (typeof u == "undefined" || u == null) && e.setClipId("1"), u
                        },
                        setClipId: function (e) {
                            u = e
                        },
                        setRegisters: function (i, o) {
                            var u = i.ns_st_cn;
                            u != null && (e.setClipId(u), delete i.ns_st_cn), u = i.ns_st_bt, u != null && (r = Number(u), delete i.ns_st_bt), h("ns_st_cl", i), h("ns_st_pn", i), h("ns_st_tp", i), h("ns_st_ub", i), h("ns_st_br", i);
                            if (o == c.PLAYING || o == null) u = i.ns_st_sq, u != null && (n = Number(u), delete i.ns_st_sq);
                            o != c.BUFFERING && (u = i.ns_st_pt, u != null && (s = Number(u), delete i.ns_st_pt));
                            if (o == c.PAUSED || o == c.IDLE || o == null) u = i.ns_st_pc, u != null && (t = Number(u), delete i.ns_st_pc)
                        },
                        createLabels: function (r, i) {
                            var s = i || {};
                            s.ns_st_cn = e.getClipId(), s.ns_st_bt = String(e.getBufferingTime());
                            if (r == l.PLAY || r == null) s.ns_st_sq = String(n);
                            if (r == l.PAUSE || r == l.END || r == l.KEEP_ALIVE || r == l.HEART_BEAT || r == null) s.ns_st_pt = String(e.getPlaybackTime()), s.ns_st_pc = String(t);
                            return f.extend(s, e.getLabels()), s
                        },
                        incrementPauses: function () {
                            t++
                        },
                        incrementStarts: function () {
                            n++
                        },
                        getBufferingTime: function () {
                            var e = r;
                            return i >= 0 && (e += +(new Date) - i), e
                        },
                        setBufferingTime: function (e) {
                            r = e
                        },
                        getPlaybackTime: function () {
                            var e = s;
                            return o >= 0 && (e += +(new Date) - o), e
                        },
                        setPlaybackTime: function (e) {
                            s = e
                        },
                        getPlaybackTimestamp: function () {
                            return o
                        },
                        setPlaybackTimestamp: function (e) {
                            o = e
                        },
                        getBufferingTimestamp: function () {
                            return i
                        },
                        setBufferingTimestamp: function (e) {
                            i = e
                        },
                        getPauses: function () {
                            return t
                        },
                        setPauses: function (e) {
                            t = e
                        },
                        getStarts: function () {
                            return n
                        },
                        setStarts: function (e) {
                            n = e
                        }
                    }), a = {}, e.reset()
                };
                return e
            }(),
            v = function () {
                var e = function () {
                    var e = this,
                        t = null,
                        n, r = 0,
                        i = 0,
                        s = 0,
                        o = 0,
                        u = 0,
                        a, h = 0,
                        p = !1;
                    f.extend(this, {
                        reset: function (t) {
                            t != null && t.length > 0 ? f.filterMap(a, t) : a = {}, e.setPlaylistId(+(new Date) + "_" + h), e.setBufferingTime(0), e.setPlaybackTime(0), e.setPauses(0), e.setStarts(0), e.setRebufferCount(0), p = !1
                        },
                        setLabels: function (t, n) {
                            t != null && f.extend(a, t), e.setRegisters(a, n)
                        },
                        getLabels: function () {
                            return a
                        },
                        setLabel: function (t, n) {
                            var r = {};
                            r[t] = n, e.setLabels(r, null)
                        },
                        getLabel: function (e) {
                            return a[e]
                        },
                        getClip: function () {
                            return t
                        },
                        getPlaylistId: function () {
                            return n
                        },
                        setPlaylistId: function (e) {
                            n = e
                        },
                        setRegisters: function (e, t) {
                            var a = e.ns_st_sp;
                            a != null && (r = Number(a), delete e.ns_st_sp), a = e.ns_st_bc, a != null && (s = Number(a), delete e.ns_st_bc), a = e.ns_st_bp, a != null && (o = Number(a), delete e.ns_st_bp), a = e.ns_st_id, a != null && (n = a, delete e.ns_st_id), t != c.BUFFERING && (a = e.ns_st_pa, a != null && (u = Number(a), delete e.ns_st_pa));
                            if (t == c.PAUSED || t == c.IDLE || t == null) a = e.ns_st_pp, a != null && (i = Number(a), delete e.ns_st_pp)
                        },
                        createLabels: function (t, o) {
                            var u = o || {};
                            u.ns_st_bp = String(e.getBufferingTime()), u.ns_st_sp = String(r), u.ns_st_id = String(n), s > 0 && (u.ns_st_bc = String(s));
                            if (t == l.PAUSE || t == l.END || t == l.KEEP_ALIVE || t == l.HEART_BEAT || t == null) u.ns_st_pa = String(e.getPlaybackTime()), u.ns_st_pp = String(i);
                            if (t == l.PLAY || t == null) e.didFirstPlayOccurred() || (u.ns_st_pb = "1", e.setFirstPlayOccurred(!0));
                            return f.extend(u, e.getLabels()), u
                        },
                        incrementStarts: function () {
                            r++
                        },
                        incrementPauses: function () {
                            i++, t.incrementPauses()
                        },
                        setPlaylistCounter: function (e) {
                            h = e
                        },
                        incrementPlaylistCounter: function () {
                            h++
                        },
                        addPlaybackTime: function (n) {
                            if (t.getPlaybackTimestamp() >= 0) {
                                var r = n - t.getPlaybackTimestamp();
                                t.setPlaybackTimestamp(-1), t.setPlaybackTime(t.getPlaybackTime() + r), e.setPlaybackTime(e.getPlaybackTime() + r)
                            }
                        },
                        addBufferingTime: function (n) {
                            if (t.getBufferingTimestamp() >= 0) {
                                var r = n - t.getBufferingTimestamp();
                                t.setBufferingTimestamp(-1), t.setBufferingTime(t.getBufferingTime() + r), e.setBufferingTime(e.getBufferingTime() + r)
                            }
                        },
                        getBufferingTime: function () {
                            var e = o;
                            return t.getBufferingTimestamp() >= 0 && (e += +(new Date) - t.getBufferingTimestamp()), e
                        },
                        setBufferingTime: function (e) {
                            o = e
                        },
                        getPlaybackTime: function () {
                            var e = u;
                            return t.getPlaybackTimestamp() >= 0 && (e += +(new Date) - t.getPlaybackTimestamp()), e
                        },
                        setPlaybackTime: function (e) {
                            u = e
                        },
                        getStarts: function () {
                            return r
                        },
                        setStarts: function (e) {
                            r = e
                        },
                        getPauses: function () {
                            return i
                        },
                        setPauses: function (e) {
                            i = e
                        },
                        getRebufferCount: function () {
                            return s
                        },
                        incrementRebufferCount: function () {
                            s++
                        },
                        setRebufferCount: function (e) {
                            s = e
                        },
                        didFirstPlayOccurred: function () {
                            return p
                        },
                        setFirstPlayOccurred: function (e) {
                            p = e
                        }
                    }), t = new d, a = {}, e.reset()
                };
                return e
            }(),
            m = function () {
                var t = function (t, i) {
                    function z(e) {
                        var t = 0;
                        if (O != null)
                            for (var n = 0; n < O.length; n++) {
                                var r = O[n],
                                    i = r.playingtime;
                                if (!i || e < i) {
                                    t = r.interval;
                                    break
                                }
                            }
                        return t
                    }

                    function W() {
                        J();
                        var e = z(x.getClip().getPlaybackTime());
                        if (e > 0) {
                            var t = D > 0 ? D : e;
                            A = setTimeout($, t)
                        }
                        D = 0
                    }

                    function X() {
                        J();
                        var e = z(x.getClip().getPlaybackTime());
                        D = e - x.getClip().getPlaybackTime() % e, A != null && J()
                    }

                    function V() {
                        D = 0, H = 0, P = 0
                    }

                    function $() {
                        P++;
                        var e = bt(l.HEART_BEAT, null);
                        ot(e), D = 0, W()
                    }

                    function J() {
                        A != null && (clearTimeout(A), A = null)
                    }

                    function K() {
                        G(), L = setTimeout(Q, M)
                    }

                    function Q() {
                        var e = bt(l.KEEP_ALIVE, null);
                        ot(e), S++, K()
                    }

                    function G() {
                        L != null && (clearTimeout(L), L = null)
                    }

                    function Y() {
                        et(), o.isPauseOnBufferingEnabled() && ct(c.PAUSED) && (C = setTimeout(Z, _))
                    }

                    function Z() {
                        if (j == c.PLAYING) {
                            x.incrementRebufferCount(), x.incrementPauses();
                            var e = bt(l.PAUSE, null);
                            ot(e), S++, j = c.PAUSED
                        }
                    }

                    function et() {
                        C != null && (clearTimeout(C), C = null)
                    }

                    function tt(e) {
                        return e == c.PLAYING || e == c.PAUSED
                    }

                    function nt() {
                        b && (clearInterval(b), b = null)
                    }

                    function rt(e) {
                        return e == l.PLAY ? c.PLAYING : e == l.PAUSE ? c.PAUSED : e == l.BUFFER ? c.BUFFERING : e == l.END ? c.IDLE : null
                    }

                    function it(e, t, n) {
                        nt();
                        if (dt(e))
                            if (n) b = setInterval(function () {
                                it(e, t)
                            }, n);
                            else {
                                var r = mt(),
                                    i = g,
                                    s = pt(t),
                                    o = i >= 0 ? s - i : 0;
                                ft(mt(), t), lt(e, t), gt(mt()), vt(e);
                                for (var u = 0, a = R.length; u < a; u++) R[u](r, e, t, o);
                                st(t), x.setRegisters(t, e), x.getClip().setRegisters(t, e);
                                var l = bt(c.toEventType(e), t);
                                f.extend(l, t), ct(E) && (ot(l), j = E, S++)
                            }
                    }

                    function st(e) {
                        var t = e.ns_st_mp;
                        t != null && (F = t, delete e.ns_st_mp), t = e.ns_st_mv, t != null && (I = t, delete e.ns_st_mv), t = e.ns_st_ec, t != null && (S = Number(t), delete e.ns_st_ec)
                    }

                    function ot(t, n) {
                        n === undefined && (n = !0), n && at(t);
                        var r = o.getPixelURL();
                        if (T) {
                            if (!ut()) {
                                var i = U.am,
                                    s = U.et,
                                    u = i.newApplicationMeasurement(T, s.HIDDEN, t, r);
                                T.getQueue().offer(u)
                            }
                        } else r && e(a(r, t))
                    }

                    function ut() {
                        var e = T.getAppContext(),
                            t = T.getSalt(),
                            n = T.getPixelURL();
                        return e == null || t == null || t.length == 0 || n == null || n.length == 0
                    }

                    function at(e) {
                        q = bt(null), f.extend(q, e)
                    }

                    function ft(e, t) {
                        var n = pt(t);
                        if (e == c.PLAYING) x.addPlaybackTime(n), X(), G();
                        else if (e == c.BUFFERING) x.addBufferingTime(n), et();
                        else if (e == c.IDLE) {
                            var r = f.getKeys(x.getClip().getLabels());
                            x.getClip().reset(r)
                        }
                    }

                    function lt(e, t) {
                        var n = pt(t),
                            r = ht(t);
                        y = r, e == c.PLAYING ? (W(), K(), x.getClip().setPlaybackTimestamp(n), ct(e) && (x.getClip().incrementStarts(), x.getStarts() < 1 && x.setStarts(1))) : e == c.PAUSED ? ct(e) && x.incrementPauses() : e == c.BUFFERING ? (x.getClip().setBufferingTimestamp(n), k && Y()) : e == c.IDLE && V()
                    }

                    function ct(e) {
                        return e != c.PAUSED || j != c.IDLE && j != null ? e != c.BUFFERING && j != e : !1
                    }

                    function ht(e) {
                        var t = -1;
                        return e.hasOwnProperty("ns_st_po") && (t = f.getInteger(e.ns_st_po)), t
                    }

                    function pt(e) {
                        var t = -1;
                        return e.hasOwnProperty("ns_ts") && (t = Number(e.ns_ts)), t
                    }

                    function dt(e) {
                        return e != null && mt() != e
                    }

                    function vt(e) {
                        E = e, g = +(new Date)
                    }

                    function mt() {
                        return E
                    }

                    function gt(e) {
                        w = e
                    }

                    function yt() {
                        return w
                    }

                    function bt() {
                        var e, t;
                        arguments.length == 1 ? (e = c.toEventType(E), t = arguments[0]) : (e = arguments[0], t = arguments[1]);
                        var n = {};
                        if (typeof document != "undefined") {
                            var r = document;
                            n.c7 = r.URL, n.c8 = r.title, n.c9 = r.referrer
                        }
                        return t != null && f.extend(n, t), n.hasOwnProperty("ns_ts") || (n.ns_ts = String(+(new Date))), e != null && !n.hasOwnProperty("ns_st_ev") && (n.ns_st_ev = l.toString(e)), o.isPersistentLabelsShared() && T && f.extend(n, T.getLabels()), f.extend(n, o.getLabels()), wt(e, n), x.createLabels(e, n), x.getClip().createLabels(e, n), n.hasOwnProperty("ns_st_mp") || (n.ns_st_mp = F), n.hasOwnProperty("ns_st_mv") || (n.ns_st_mv = I), n.hasOwnProperty("ns_st_ub") || (n.ns_st_ub = "0"), n.hasOwnProperty("ns_st_br") || (n.ns_st_br = "0"), n.hasOwnProperty("ns_st_pn") || (n.ns_st_pn = "1"), n.hasOwnProperty("ns_st_tp") || (n.ns_st_tp = "1"), n.hasOwnProperty("ns_st_it") || (n.ns_st_it = "c"), n.ns_st_sv = p.STREAMSENSE_VERSION, n.ns_type = "hidden", n
                    }

                    function wt(e, t) {
                        var n = t || {};
                        n.ns_st_ec = String(S);
                        if (!n.hasOwnProperty("ns_st_po")) {
                            var r = y,
                                i = pt(n);
                            if (e == l.PLAY || e == l.KEEP_ALIVE || e == l.HEART_BEAT || e == null && E == c.PLAYING) r += i - x.getClip().getPlaybackTimestamp();
                            n.ns_st_po = f.getInteger(r)
                        }
                        return e == l.HEART_BEAT && (n.ns_st_hc = String(P)), n
                    }

                    function Et(e) {
                        var t = pt(e);
                        t < 0 && (e.ns_ts = String(+(new Date)))
                    }

                    function St(e, t, n) {
                        t = t || {}, t.ns_st_ad = 1, e >= l.AD_PLAY && e <= l.AD_CLICK && o.notify(e, t, n)
                    }

                    function xt(e, t) {
                        o.notify(l.CUSTOM, e, t)
                    }
                    var o = this,
                        h = 500,
                        d, m = null,
                        g = 0,
                        y = 0,
                        b, w, E, S = 0,
                        x = null,
                        T, N = !0,
                        C, k = !0,
                        L, A, O = p.DEFAULT_HEARTBEAT_INTERVAL,
                        M = p.DEFAULT_KEEP_ALIVE_INTERVAL,
                        _ = p.DEFAULT_PAUSED_ON_BUFFERING_INTERVAL,
                        D = 0,
                        P = 0,
                        H = 0,
                        B = !1,
                        j, F, I, q, R, U = {};
                    f.extend(this, {
                        reset: function (e) {
                            x.reset(e), x.setPlaylistCounter(0), x.setPlaylistId(+(new Date) + "_1"), x.getClip().reset(e), e != null && !e.isEmpty() ? f.filterMap(d, e) : d = {}, S = 1, P = 0, X(), V(), G(), et(), nt(), E = c.IDLE, w = null, g = -1, j = null, F = p.DEFAULT_PLAYERNAME, I = p.STREAMSENSE_VERSION, q = null
                        },
                        setPauseOnBufferingInterval: function (e) {
                            _ = e
                        },
                        getPauseOnBufferingInterval: function () {
                            return _
                        },
                        setKeepAliveInterval: function (e) {
                            M = e
                        },
                        getKeepAliveInterval: function () {
                            return M
                        },
                        setHeartbeatIntervals: function (e) {
                            O = e
                        },
                        notify: function () {
                            var e, t, n, r;
                            t = arguments[0], arguments.length == 3 ? (n = arguments[1], r = arguments[2]) : (n = {}, r = arguments[1]), e = rt(t);
                            var i = f.extend({}, n);
                            Et(i), i.hasOwnProperty("ns_st_po") || (i.ns_st_po = f.getInteger(r));
                            if (t == l.PLAY || t == l.PAUSE || t == l.BUFFER || t == l.END) {
                                var s = +(new Date) - g;
                                o.isPausePlaySwitchDelayEnabled() && dt(e) && tt(E) && tt(e) && s <= h ? it(e, i, h) : it(e, i)
                            } else {
                                var u = bt(t, i);
                                f.extend(u, i), ot(u, !1), S++
                            }
                        },
                        getLabels: function () {
                            return d
                        },
                        getState: function () {
                            return E
                        },
                        setLabels: function (e) {
                            e != null && (d == null ? d = e : f.extend(d, e))
                        },
                        getLabel: function (e) {
                            return d[e]
                        },
                        setLabel: function (e, t) {
                            t == null ? delete d[e] : d[e] = t
                        },
                        setPixelURL: function (e) {
                            if (e == null || e.length == 0) return null;
                            var t = s.decodeURIComponent || unescape,
                                n = e.indexOf("?");
                            if (n >= 0) {
                                if (n < e.length - 1) {
                                    var r = e.substring(n + 1).split("&");
                                    for (var i = 0, u = r.length; i < u; i++) {
                                        var a = r[i],
                                            f = a.split("=");
                                        f.length == 2 ? o.setLabel(f[0], t(f[1])) : f.length == 1 && o.setLabel(p.PAGE_NAME_LABEL, t(f[0]))
                                    }
                                    e = e.substring(0, n + 1)
                                }
                            } else e += "?";
                            return m = e, m
                        },
                        getPixelURL: function () {
                            return m ? m : typeof ns_p != "undefined" && typeof ns_p.src == "string" ? m = ns_p.src.replace(/&amp;/, "&").replace(/&ns__t=\d+/, "") : typeof ns_pixelUrl == "string" ? m.replace(/&amp;/, "&").replace(/&ns__t=\d+/, "") : null
                        },
                        isPersistentLabelsShared: function () {
                            return N
                        },
                        setPersistentLabelsShared: function (e) {
                            N = e
                        },
                        isPauseOnBufferingEnabled: function () {
                            return k
                        },
                        setPauseOnBufferingEnabled: function (e) {
                            k = e
                        },
                        isPausePlaySwitchDelayEnabled: function () {
                            return B
                        },
                        setPausePlaySwitchDelayEnabled: function (e) {
                            B = e
                        },
                        setPausePlaySwitchDelay: function (e) {
                            e && e > 0 && (h = e)
                        },
                        getPausePlaySwitchDelay: function () {
                            return h
                        },
                        setClip: function (e, t) {
                            var n = !1;
                            return E == c.IDLE && (x.getClip().reset(), x.getClip().setLabels(e, null), t && x.incrementStarts(), n = !0), n
                        },
                        setPlaylist: function (e) {
                            var t = !1;
                            return E == c.IDLE && (x.incrementPlaylistCounter(), x.reset(), x.getClip().reset(), x.setLabels(e, null), t = !0), t
                        },
                        importState: function (e) {
                            reset();
                            var t = f.extend({}, e);
                            x.setRegisters(t, null), x.getClip().setRegisters(t, null), st(t), S++
                        },
                        exportState: function () {
                            return q
                        },
                        getVersion: function () {
                            return p.STREAMSENSE_VERSION
                        },
                        addListener: function (e) {
                            R.push(e)
                        },
                        removeListener: function (e) {
                            R.splice(f.indexOf(e, R), 1)
                        },
                        getClip: function () {
                            return x.getClip()
                        },
                        getPlaylist: function () {
                            return x
                        },
                        setHttpGet: n,
                        setHttpPost: r
                    }), f.extend(this, {
                        adNotify: St,
                        customNotify: xt,
                        viewNotify: function (e, t) {
                            e = e || o.getPixelURL(), e && u(e, t)
                        }
                    }), ns_.comScore && (U = ns_.comScore.exports, T = U.c()), d = {}, S = 1, E = c.IDLE, x = new v, C = null, k = !0, A = null, P = 0, V(), L = null, b = null, B = !1, j = null, y = 0, R = [], o.reset(), t && o.setLabels(t), i && o.setPixelURL(i)
                };
                return function (e) {
                    function i(e, n) {
                        return t[r] || o(e, n)
                    }

                    function s() {
                        r = -1;
                        for (var e = 0; e <= n; e++)
                            if (t.hasOwnProperty(e)) {
                                r = e;
                                break
                            } return ns_.StreamSense.activeIndex = r, r
                    }

                    function o(e, r) {
                        return e = e || null, r = r || null, e && typeof e == "object" && (r = e, e = null), t[++n] = new ns_.StreamSense(r, e), s(), t[n]
                    }

                    function u() {
                        var e = !1,
                            n = r;
                        if (typeof arguments[0] == "number" && isFinite(arguments[0])) n = arguments[0];
                        else if (arguments[0] instanceof ns_.StreamSense)
                            for (var i in t)
                                if (t[i] === arguments[0]) {
                                    n = i;
                                    break
                                } return t.hasOwnProperty(n) && (e = t[n], delete t[n], e.reset(), s()), e
                    }

                    function a(e) {
                        return e = e || {}, i().setPlaylist(e), i().getPlaylist()
                    }

                    function l(e, t, n) {
                        return e = e || {}, typeof t == "number" && (e.ns_st_cn = t), i().setClip(e, n), i().getClip()
                    }

                    function c(e, t, n) {
                        return typeof e == "undefined" ? !1 : (n = n || null, t = t || {}, i().notify(e, t, n))
                    }

                    function h(e) {
                        typeof e != "undefined" && i().setLabels(e)
                    }

                    function p() {
                        return i().getLabels()
                    }

                    function d(e) {
                        typeof e != "undefined" && i().getPlaylist().setLabels(e)
                    }

                    function v() {
                        return i().getPlaylist().getLabels()
                    }

                    function m(e) {
                        typeof e != "undefined" && i().getClip().setLabels(e)
                    }

                    function g() {
                        return i().getClip().getLabels()
                    }

                    function y(e) {
                        return i().reset(e || {})
                    }

                    function b(e) {
                        return i().getPlaylist().reset(e || {})
                    }

                    function w(e) {
                        return i().getClip().reset(e || {})
                    }

                    function E(e) {
                        return e = e || {}, i().viewNotify(null, e)
                    }

                    function S(e, t) {
                        return arguments.length > 2 && (e = arguments[1], t = arguments[2]), e = e || {}, typeof t == "number" && (e.ns_st_po = t), i().customNotify(e, t)
                    }

                    function x() {
                        return i().exportState()
                    }

                    function T(e) {
                        i().importState(e)
                    }
                    var t = {},
                        n = -1,
                        r = -1;
                    f.extend(e, {
                        activeIndex: r,
                        newInstance: o,
                        "new": o,
                        destroyInstance: u,
                        destroy: u,
                        newPlaylist: a,
                        newClip: l,
                        notify: c,
                        setLabels: h,
                        getLabels: p,
                        setPlaylistLabels: d,
                        getPlaylistLabels: v,
                        setClipLabels: m,
                        getClipLabels: g,
                        resetInstance: y,
                        resetPlaylist: b,
                        resetClip: w,
                        viewEvent: E,
                        customEvent: S,
                        exportState: x,
                        importState: T
                    })
                }(t), t
            }();
        return m.AdEvents = h, m.PlayerEvents = l, m
    }();
}
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        u.ev = {
            'view': 1,
            'link': 1
        };
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:569");
                utag.DB(b);
                var d, e, f, g;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "http" + (document.location.href.charAt(4) === "s" ? "s://sb" : "://b") + ".scorecardresearch.com/cs/##utag_account##/beacon.js",
                    "cs_ucfr": "0",
                    "c1": "2",
                    "c2": "6035755",
                    "form": "",
                    "form_settings": {},
                    "form_normal": [],
                    "form_hidden": [],
                    "form_submit": true,
                    "form_abandon": false,
                    "form_failure": false,
                    "form_preferences": {},
                    "ns_type": "hidden",
                    "order_id": "",
                    "order_shipping": "",
                    "customer_id": "",
                    "product_id": [],
                    "product_brand": [],
                    "product_category": [],
                    "product_subcategory": [],
                    "product_quantity": [],
                    "product_unit_price": []
                };
                utag.DB("send:569:EXTENSIONS");
                utag.DB(b);
                g = [];
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            if (!u.data.hasOwnProperty(e[f])) {
                                g.push(e[f] + u.data.kvp_delim + encodeURIComponent(b[d]));
                            }
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                utag.DB("send:569:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_shipping = u.data.order_shipping || b._cship || "";
                u.data.customer_id = u.data.customer_id || b._ccustid || "";
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_brand.length === 0 && b._cbrand !== undefined) {
                    u.data.product_brand = b._cbrand.slice(0);
                }
                if (u.data.product_category.length === 0 && b._ccat !== undefined) {
                    u.data.product_category = b._ccat.slice(0);
                }
                if (u.data.product_subcategory.length === 0 && b._ccat2 !== undefined) {
                    u.data.product_subcategory = b._ccat2.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                g.push(["c1", u.data.c1].join(u.data.kvp_delim));
                g.push(["c2", u.data.c2].join(u.data.kvp_delim));
                if (a === "link") {
                    g.push(["ns_type", u.data.ns_type].join(u.data.kvp_delim));
                }
                if (window.__tcfapi) {
                    window.__tcfapi('getTCData', 2, function (tcData, success) {
                        _CSConsent = "";
                        if (success && tcData.eventStatus !== "cmpuishown" && tcData.vendor.consents["77"] !== undefined) {
                            _CSConsent = tcData.vendor.consents["77"] ? "1" : "0";
                        }
                        g.push(["cs_ucfr", _CSConsent].join(u.data.kvp_delim));
                        udm_("http" + (document.location.href.charAt(4) === "s" ? "s://sb" : "://b") + ".scorecardresearch.com/b?" + g.join(u.data.qsp_delim));
                    }, [77]);
                } else {
                    g.push(["cs_ucfr", ""].join(u.data.kvp_delim));
                    udm_("http" + (document.location.href.charAt(4) === "s" ? "s://sb" : "://b") + ".scorecardresearch.com/b?" + g.join(u.data.qsp_delim));
                }
                if (u.data.order_id !== undefined && u.data.order_id !== "") {
                    var counterURL = "http" + (document.location.href.charAt(4) === "s" ? "s://sb" : "://b") + ".scorecardresearch.com/b?";
                    u.order = new ns_order(counterURL, ((u.data.customer_id) ? u.data.customer_id : u.data.order_id), u.data.order_id);
                    for (f = 0; f < u.data.product_id.length; f++) {
                        u.order.addLine(u.data.product_id[f], u.data.product_brand[f], u.data.product_category[f], u.data.product_subcategory[f], parseInt(u.data.product_quantity[f]), parseFloat(u.data.product_unit_price[f]));
                    }
                    if (u.data.order_shipping) {
                        u.order.addLine("shipping", "none", "shipping_handling", "none", 1, parseFloat(u.data.order_shipping));
                    }
                    u.order.sendOrder();
                }
                if (u.data.form) {
                    u.data.form_preferences = {
                        submit: (u.data.form_submit === "true" || u.data.form_submit === true),
                        abandon: (u.data.form_abandon === "true" || u.data.form_abandon === true),
                        failure: (u.data.form_failure === "true" || u.data.form_failure === true)
                    };
                    if (u.data.form_normal.length) {
                        for (f = 0; f < u.data.form_normal.length; f++) {
                            u.data.form_settings[u.data.form_normal[f]] = u.data.form_preferences;
                        }
                    } else {
                        u.data.form_settings["*"] = u.data.form_preferences;
                    }
                    for (f = 0; f < u.data.form_hidden.length; f++) {
                        u.data.form_settings[u.data.form_hidden[f]] = {
                            hidden: u.data.form_preferences
                        };
                    }
                    new ns_.Form(u.data.form, u.data.form_settings);
                }
                (function () {
                    var id = "tealium-tag-3005";
                    if (a === "link" && document.getElementById(id)) {
                        return;
                    }
                    var t = document.createElement("script");
                    t.type = "text/javascript";
                    t.async = true;
                    t.id = id;
                    t.src = u.data.base_url.replace("##utag_account##", u.data.c2);
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(t, s);
                })();
                utag.DB("send:569:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }('569', 'autotrader.at-desktop'));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.550 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:550");
                utag.DB(b);
                var c, d, e, f, _usabilla_data, _key, _abTests;
                u.data = {
                    "base_url": "//w.usabilla.com/##utag_account_id##.js",
                    "account_id": "c0ef0401aea4",
                    "email": "",
                    "custom": {}
                };
                if (b.abTestGroups) {
                    _abTests = b.abTestGroups.constructor === Array ? b.abTestGroups.join('-') : b.abTestGroups;
                }
                if (!_abTests) {
                    var _hasTestGroups = document.cookie.split('abTestGroups=')[1];
                    if (_hasTestGroups) {
                        _abTests = _hasTestGroups.split(';')[0];
                    }
                }
                u.data.custom.ABTestAllocation = _abTests;
                if (b.page_name) {
                    u.data.custom.page_name = b.page_name;
                }
                if (b.userid) {
                    u.data.custom.userid = b.userid;
                }
                if (b.platform) {
                    u.data.custom.platform = b.platform;
                }
                if (b.logged_in_status) {
                    u.data.custom.logged_in_status = b.logged_in_status;
                }
                if (b.urs_id) {
                    u.data.custom.urs_id = b.urs_id;
                }
                utag.DB("send:550:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            if (u.data.hasOwnProperty(e[f])) {
                                u.data[e[f]] = b[d];
                            } else {}
                        }
                    }
                }
                utag.DB("send:550:MAPPINGS");
                utag.DB(u.data);
                if (!u.data.account_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                if (!u.initialized) {
                    u.initialized = true;
                    _usabilla_data = {};
                    if (u.data.email) {
                        _usabilla_data.email = u.data.email;
                    }
                    if (!u.isEmptyObject(u.data.custom)) {
                        _usabilla_data.custom = {};
                        for (_key in u.data.custom) {
                            _usabilla_data.custom[_key] = u.data.custom[_key];
                        }
                    }
                    window.lightningjs || function (c) {
                        function g(b, d) {
                            d && (d += (/\?/.test(d) ? "&" : "?") + "lv=1");
                            c[b] || function () {
                                var i = window,
                                    h = document,
                                    j = b,
                                    g = h.location.protocol,
                                    l = "load",
                                    k = 0;
                                (function () {
                                    function b() {
                                        a.P(l);
                                        a.w = 1;
                                        c[j]("_load")
                                    }
                                    c[j] = function () {
                                        function m() {
                                            m.id = e;
                                            return c[j].apply(m, arguments)
                                        }
                                        var b, e = ++k;
                                        b = this && this != i ? this.id || 0 : 0;
                                        (a.s = a.s || []).push([e, b, arguments]);
                                        m.then = function (b, c, h) {
                                            var d = a.fh[e] = a.fh[e] || [],
                                                j = a.eh[e] = a.eh[e] || [],
                                                f = a.ph[e] = a.ph[e] || [];
                                            b && d.push(b);
                                            c && j.push(c);
                                            h && f.push(h);
                                            return m
                                        };
                                        return m
                                    };
                                    var a = c[j]._ = {};
                                    a.fh = {};
                                    a.eh = {};
                                    a.ph = {};
                                    a.l = d ? d.replace(/^\/\//, (g == "https:" ? g : "http:") + "//") : d;
                                    a.p = {
                                        0: +new Date
                                    };
                                    a.P = function (b) {
                                        a.p[b] = new Date - a.p[0]
                                    };
                                    a.w && b();
                                    i.addEventListener ? i.addEventListener(l, b, !1) : i.attachEvent("on" + l, b);
                                    var q = function () {
                                        function b() {
                                            return ["<head></head><", c, ' onload="var d=', n, ";d.getElementsByTagName('head')[0].", d, "(d.", g, "('script')).", i, "='", a.l, "'\"></", c, ">"].join("")
                                        }
                                        var c = "body",
                                            e = h[c];
                                        if (!e) return setTimeout(q, 100);
                                        a.P(1);
                                        var d = "appendChild",
                                            g = "createElement",
                                            i = "src",
                                            k = h[g]("div"),
                                            l = k[d](h[g]("div")),
                                            f = h[g]("iframe"),
                                            n = "document",
                                            p;
                                        k.style.display = "none";
                                        e.insertBefore(k, e.firstChild).id = o + "-" + j;
                                        f.frameBorder = "0";
                                        f.id = o + "-frame-" + j;
                                        /MSIE[ ]+6/.test(navigator.userAgent) && (f[i] = "javascript:false");
                                        f.allowTransparency = "true";
                                        l[d](f);
                                        try {
                                            f.contentWindow[n].open()
                                        } catch (s) {
                                            a.domain = h.domain, p = "javascript:var d=" + n + ".open();d.domain='" + h.domain + "';", f[i] = p + "void(0);"
                                        }
                                        try {
                                            var r = f.contentWindow[n];
                                            r.write(b());
                                            r.close()
                                        } catch (t) {
                                            f[i] = p + 'd.write("' + b().replace(/"/g, String.fromCharCode(92) + '"') + '");d.close();'
                                        }
                                        a.P(2)
                                    };
                                    a.l && q()
                                })()
                            }();
                            c[b].lv = "1";
                            return c[b]
                        }
                        var o = "lightningjs",
                            k = window[o] = g(o);
                        k.require = g;
                        k.modules = c
                    }({});
                    u.data.base_url = u.data.base_url.replace("##utag_account_id##", u.data.account_id);
                    window.usabilla_live = lightningjs.require("usabilla_live", u.data.base_url);
                    if (!u.isEmptyObject(_usabilla_data)) {
                        window.usabilla_live("data", _usabilla_data);
                    }
                }
                utag.DB("send:550:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("550", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.42 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
window.GoogleAnalyticsObject = "" || "ga";
window[window.GoogleAnalyticsObject] = window[window.GoogleAnalyticsObject] || function () {
    (window[window.GoogleAnalyticsObject].q = window[window.GoogleAnalyticsObject].q || []).push(arguments);
};
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var a, b, c, l;
                a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    b.setAttribute("height", "1");
                    b.setAttribute("width", "1");
                    b.setAttribute("style", "display:none");
                    b.setAttribute("src", o.src);
                } else if (o.type === "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id;
                }
                if (typeof o.cb === "function") {
                    b.hFlag = 0;
                    b.onreadystatechange = function () {
                        if ((this.readyState === 'complete' || this.readyState === 'loaded') && !b.hFlag) {
                            b.hFlag = 1;
                            o.cb();
                        }
                    };
                    b.onload = function () {
                        if (!b.hFlag) {
                            b.hFlag = 1;
                            o.cb();
                        }
                    };
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l === "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b);
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            'view': 1,
            'link': 1
        };
        u.o = window[window.GoogleAnalyticsObject];
        u.require_eh = false;
        u.created = false;
        u.all = function (e, o, v, a, b) {
            for (var i = 0; i < u.data.account.length; i++) {
                var t = (u.data.name[i] ? u.data.name[i] + "." : "");
                if (o === "event") {
                    u.o(t + e, o, v, a, b)
                } else if (v) {
                    u.o(t + e, o, v)
                } else {
                    u.o(t + e, o);
                }
            }
        };
        u.setHitData = function (g, a, b, f) {
            var obj = u.data[a];
            for (var d in utag.loader.GV(obj)) {
                if (b && d.indexOf("enh_" + b + "-") !== 0 && d.indexOf("enh_all-") !== 0) {
                    continue;
                }
                var idx = d.split("-")[1],
                    val = obj[d];
                if (u.typeOf(val) !== "array") {
                    g[idx] = val;
                } else {
                    g[idx] = val[f];
                }
            }
        };
        u.addEvent = function (v) {
            if (typeof v.eventCategory == "undefined" || typeof v.eventAction == "undefined") {
                utag.DB("GA event Category or Action is not set");
                return;
            }
            if (isNaN(parseInt(v.eventValue))) {
                utag.DB("GA event Value is not a number");
                v.eventValue = null;
            } else {
                v.eventValue = parseInt(v.eventValue) || null;
            }
            u.data.ga_events.push(v);
        };
        u.addproduct = function (event_type, len, imp) {
            var g = {},
                i, j;
            if (imp === true) {
                for (i = 0; i < u.data.enh_impression_id.length; i++) {
                    g = {};
                    g.id = u.data.enh_impression_id[i];
                    g.name = (u.data.enh_impression_name[i] ? u.data.enh_impression_name[i] : u.data.enh_impression_id[i]);
                    g.brand = (u.data.enh_impression_brand[i] ? u.data.enh_impression_brand[i] : "");
                    g.variant = (u.data.enh_impression_variant[i] ? u.data.enh_impression_variant[i] : "");
                    g.category = (u.data.enh_impression_category[i] ? u.data.enh_impression_category[i] : "");
                    g.list = (u.data.enh_impression_list[i] ? u.data.enh_impression_list[i] : "");
                    g.price = (u.data.enh_impression_price[i] ? u.data.enh_impression_price[i] : "");
                    g.position = (u.data.enh_impression_position[i] ? u.data.enh_impression_position[i] : "");
                    u.setHitData(g, "enhecom_events", event_type, i);
                    u.all('ec:addImpression', g);
                }
            } else {
                for (i = 0; i < len; i++) {
                    g = {};
                    if (u.data.autofill_params === "true") {
                        for (j = 0; j < u.data.product_id.length; j++) {
                            u.data.product_name[j] = u.data.product_name[j] || u.data.product_id[j];
                            u.data.product_unit_price[j] = u.data.product_unit_price[j] || "1.00";
                            u.data.product_quantity[j] = u.data.product_quantity[j] || "1";
                        }
                    }
                    g.id = u.data.product_id[i];
                    g.name = (u.data.product_name[i] ? u.data.product_name[i] : "");
                    g.brand = (u.data.product_brand[i] ? u.data.product_brand[i] : "");
                    g.variant = (u.data.product_variant[i] ? u.data.product_variant[i] : "");
                    g.category = (u.data.product_category[i] ? u.data.product_category[i] : "");
                    g.price = (u.data.product_unit_price[i] ? u.data.product_unit_price[i] : "");
                    g.quantity = (u.data.product_quantity[i] ? u.data.product_quantity[i] : "");
                    g.coupon = (u.data.product_discount[i] ? u.data.product_discount[i] : "");
                    g.position = (u.data.product_position[i] ? u.data.product_position[i] : "");
                    u.setHitData(g, "enhecom_events", event_type, i);
                    u.all('ec:addProduct', g);
                }
            }
        };
        u.addpromo = function (action, event) {
            var f, g;
            for (f = 0; f < u.data.enh_promo_id.length; f++) {
                g = {};
                g.id = u.data.enh_promo_id[f];
                g.name = (u.data.enh_promo_name[f] ? u.data.enh_promo_name[f] : u.data.enh_promo_id[f]);
                g.creative = (u.data.enh_promo_creative[f] ? u.data.enh_promo_creative[f] : "");
                g.position = (u.data.enh_promo_position[f] ? u.data.enh_promo_position[f] : "");
                u.all('ec:addPromo', g);
            }
            if (action === "promo_click" && event === "link") {
                u.all('ec:setAction', u.data.enh_action);
                if (u.data.autosend_events === "true") {
                    u.all('send', 'event', 'Internal Promotions', 'click', (g.name ? g.name : g.id));
                }
            }
        };
        u.createTracker = function () {
            if (u.typeOf(u.data.account) === "string") {
                u.data.account = u.data.account.replace(/\s/g, "").split(",");
            }
            if (u.typeOf(u.data.name) === "string" && u.data.name !== "") {
                u.data.name = u.data.name.replace(/\s/g, "").split(",");
            }
            if (!u.data.name || u.data.name.length !== u.data.account.length) {
                var start = u.data.name.length !== u.data.account.length ? u.data.name.length : 0;
                tn = utag.tagsettings.gua.trackernames;
                u.data.name = u.data.name || [];
                for (i = start; i < u.data.account.length; i++) {
                    u.data.name.push("tealium_" + (i + tn));
                }
                utag.tagsettings.gua.trackernames = tn + i;
            }
        };
        u.initTracker = function () {
            var c;
            if (!u.created) {
                u.created = true;
                for (f = 0; f < u.data.account.length; f++) {
                    c = {};
                    if (u.data.siteSpeedSampleRate) {
                        c.siteSpeedSampleRate = parseInt(u.data.siteSpeedSampleRate);
                    }
                    if (u.data.sampleRate) {
                        c.sampleRate = parseFloat(u.data.sampleRate);
                    }
                    c.cookieDomain = u.data.cookieDomain;
                    if (u.data.cookieExpires || u.data.cookieExpires === "0") {
                        c.cookieExpires = parseInt(u.data.cookieExpires);
                    }
                    if (u.data.legacyCookieDomain) {
                        c.legacyCookieDomain = u.data.legacyCookieDomain;
                    }
                    c.allowLinker = u.data.allowLinker;
                    if (typeof u.data.name[f] !== "undefined" && u.data.name[f] !== "") {
                        c.name = u.data.name[f];
                    }
                    u.o("create", u.data.account[f], c);
                }
                if (u.data.optimizely === "true") {
                    window.optimizely = window.optimizely || [];
                    window.optimizely.push(['activateUniversalAnalytics']);
                }
            }
        };
        window.utag.tagsettings = window.utag.tagsettings || {};
        window.utag.tagsettings.gua = window.utag.tagsettings.gua || {};
        window.utag.tagsettings.gua.trackernames = window.utag.tagsettings.gua.trackernames || 0;
        u.map = {
            "platform": "pageview-dimension1,link-dimension1,dimension1,enh_product_add-dimension1,enh_product_remove-dimension1,enh_detail-dimension1,enh_product_impression-dimension1,transaction-dimension1,enh_product_checkout-dimension1,enh_product_click-dimension1,enh_product_purchase-dimension1,enh_product_refund-dimension1,enh_purchase-dimension1,enh_refund-dimension1,enh_checkout_option-dimension1",
            "environment": "dimension159",
            "page_name": "pageview-dimension2,link-dimension2,dimension2,enh_product_add-dimension2,enh_product_remove-dimension2,enh_detail-dimension2,enh_product_impression-dimension2,transaction-dimension2,enh_product_checkout-dimension2,enh_product_click-dimension2,enh_product_purchase-dimension2,enh_product_refund-dimension2,enh_purchase-dimension2,enh_refund-dimension2,enh_checkout_option-dimension2,screenName",
            "page_name_granular": "pageview-dimension3,link-dimension3,dimension3,enh_product_add-dimension3,enh_product_remove-dimension3,enh_detail-dimension3,enh_product_impression-dimension3,transaction-dimension3,enh_product_checkout-dimension3,enh_product_click-dimension3,enh_product_purchase-dimension3,enh_product_refund-dimension3,enh_purchase-dimension3,enh_refund-dimension3,enh_checkout_option-dimension3",
            "channel": "pageview-dimension4,link-dimension4,dimension4,enh_product_add-dimension4,enh_product_remove-dimension4,enh_detail-dimension4,enh_product_impression-dimension4,transaction-dimension4,enh_product_checkout-dimension4,enh_product_click-dimension4,enh_product_purchase-dimension4,enh_product_refund-dimension4,enh_purchase-dimension4,enh_refund-dimension4,enh_checkout_option-dimension4",
            "section": "pageview-dimension5,link-dimension5,dimension5,enh_product_add-dimension5,enh_product_remove-dimension5,enh_detail-dimension5,enh_product_impression-dimension5,transaction-dimension5,enh_product_checkout-dimension5,enh_product_click-dimension5,enh_product_purchase-dimension5,enh_product_refund-dimension5,enh_purchase-dimension5,enh_refund-dimension5,enh_checkout_option-dimension5",
            "site_version": "dimension8",
            "location_town": "pageview-dimension11,link-dimension11",
            "vehicles_found": "pageview-dimension12",
            "distance": "pageview-dimension13,link-dimension13",
            "search_criteria": "pageview-dimension14",
            "make": "pageview-dimension15,link-dimension15",
            "model": "pageview-dimension16,link-dimension16",
            "min_price": "pageview-dimension17",
            "max_price": "pageview-dimension18",
            "fuel_type": "pageview-dimension19",
            "min_age": "pageview-dimension20",
            "max_age": "pageview-dimension21",
            "min_mileage": "pageview-dimension22",
            "max_mileage": "pageview-dimension23",
            "body_type": "pageview-dimension24",
            "number_of_doors": "pageview-dimension25",
            "colour": "pageview-dimension26",
            "gearbox": "pageview-dimension27",
            "min_engine_size": "pageview-dimension28",
            "max_engine_size": "pageview-dimension29",
            "co2_emissions": "pageview-dimension30",
            "annual_tax": "pageview-dimension31",
            "seller_type": "pageview-dimension32,link-dimension32",
            "used_new": "pageview-dimension33,link-dimension33",
            "keywords": "pageview-dimension34",
            "sort_order": "pageview-dimension35",
            "page_number": "pageview-dimension36",
            "insurance_group": "pageview-dimension37",
            "personalised_elements": "pageview-dimension155",
            "fuel_consumption": "pageview-dimension38",
            "acceleration": "pageview-dimension39",
            "boot_size": "pageview-dimension40",
            "min_seats": "pageview-dimension41",
            "max_seats": "pageview-dimension42",
            "trim_level": "pageview-dimension43",
            "vehicle_price": "pageview-dimension44",
            "vehicle_year": "pageview-dimension45,link-dimension45",
            "number_of_photos": "pageview-dimension46",
            "dealer_products": "pageview-dimension47",
            "dealer_id": "pageview-dimension48,link-dimension48,dimension48",
            "ad_id": "pageview-dimension49,link-dimension49",
            "bike_type": "pageview-dimension50,pageview-dimension24",
            "deletion_reason": "pageview-dimension51,link-dimension51",
            "min_year": "pageview-dimension52",
            "max_year": "pageview-dimension53",
            "cab_type": "pageview-dimension54",
            "wheelbase": "pageview-dimension55",
            "min_engine_power": "pageview-dimension56",
            "paygo_experiment_id": "pageview-dimension57",
            "driver_position": "pageview-dimension58",
            "mobile_react": "pageview-dimension60,link-dimension60",
            "network_connection_downlink_max": "pageview-dimension61,link-dimension61",
            "min_plate": "pageview-dimension62",
            "max_plate": "pageview-dimension63",
            "part_ex_vehicle_type": "pageview-dimension64,link-dimension64",
            "hide_bid_tell": "pageview-dimension65",
            "experiment_id_tpf": "pageview-dimension66,link-dimension66",
            "search_position": "pageview-dimension67,link-dimension67",
            "axle_config": "pageview-dimension68",
            "emissions_class": "pageview-dimension69",
            "min_gtw": "pageview-dimension70",
            "min_gvw": "pageview-dimension71",
            "tfp_category": "pageview-dimension72",
            "min_hours_used": "pageview-dimension73",
            "insurance_category": "pageview-dimension74",
            "number_of_items": "pageview-dimension75",
            "manufacturer_approved": "pageview-dimension76,link-dimension76",
            "reminders_set": "pageview-dimension77",
            "vehicle_type": "pageview-dimension78",
            "owner_rating": "pageview-dimension79",
            "thumbnails": "pageview-dimension80",
            "search_category": "pageview-dimension81",
            "previous_page_name": "pageview-dimension82",
            "page_personalisation": "pageview-dimension84",
            "article_name": "pageview-dimension85",
            "article_author": "pageview-dimension86",
            "article_publish_date": "pageview-dimension87",
            "number_of_results_seen": "pageview-dimension88",
            "pola_initiation_platform": "dimension89",
            "pola_marketing_channel": "pageview-dimension90",
            "pola_marketing_campaign_id": "pageview-dimension92",
            "experiment_name": "dimension94,pageview-dimension94,link-dimension94,transaction-dimension94",
            "ga_account_id": "account",
            "url_masked": "location,pageview-dimension97",
            "location_postcode_prefix": "link-dimension9,pageview-dimension9",
            "product_name": "product_name",
            "product_id": "product_id",
            "product_unit_price": "product_unit_price",
            "product_category": "product_category",
            "product_variant": "product_variant",
            "order_id": "order_id",
            "order_total": "revenue",
            "product_coupon_code": "coupon",
            "product_brand": "product_brand",
            "product_quantity": "product_quantity",
            "order_tax": "tax",
            "enh_action": "enh_action",
            "enh_checkout_option": "enh_checkout_option",
            "enh_checkout_step": "enh_checkout_step",
            "link_name": "eventLabel",
            "link_category": "eventCategory",
            "link_action": "eventAction",
            "logged_in_status": "pageview-dimension6,link-dimension6,dimension6,enh_product_add-dimension6,enh_product_remove-dimension6,enh_detail-dimension6,enh_product_impression-dimension6,transaction-dimension6,enh_product_checkout-dimension6,enh_product_click-dimension6,enh_product_purchase-dimension6,enh_product_refund-dimension6,enh_purchase-dimension6,enh_refund-dimension6,enh_checkout_option-dimension6",
            "urs_id": "pageview-dimension7,link-dimension7,dimension7,enh_product_add-dimension7,enh_product_remove-dimension7,enh_detail-dimension7,enh_product_impression-dimension7,transaction-dimension7,enh_product_checkout-dimension7,enh_product_click-dimension7,enh_product_purchase-dimension7,enh_product_refund-dimension7,enh_purchase-dimension7,enh_refund-dimension7,enh_checkout_option-dimension7,uid",
            "custom_metric_vehicle_search": "pageview-metric1",
            "custom_metric_discovery_search": "pageview-metric2",
            "custom_metric_ad_view": "pageview-metric4",
            "custom_metric_call_seller": "link-metric5",
            "custom_metric_dealer_website": "link-metric6",
            "custom_metric_dealer_email": "link-metric7,metric7",
            "custom_metric_view_map": "link-metric8",
            "custom_metrics_get_directions": "link-metric9",
            "custom_metric_receive_quote": "link-metric10",
            "custom_metric_book_test_drive": "link-metric11",
            "custom_metric_request_brochure": "link-metric12",
            "custom_metric_special_offer": "link-metric13",
            "custom_metric_share_vehicle": "link-metric15",
            "custom_metric_save_vehicle": "link-metric16",
            "custom_metric_save_search": "link-metric17",
            "custom_metric_vehicle_check_initiation": "link-metric18",
            "custom_metric_vehicle_check_complete": "pageview-metric19",
            "custom_metric_finance_initiation": "link-metric20",
            "custom_metric_finance_private_complete": "pageview-metric21",
            "custom_metric_insurance_initiation": "link-metric22",
            "custom_metric_warranty_initiation": "link-metric23",
            "custom_metric_gap_insurance_initiation": "link-metric24",
            "custom_metric_valuation_initiation": "link-metric25",
            "custom_metric_valuation_complete": "pageview-metric26",
            "custom_metric_pola_initiation": "pageview-metric27",
            "custom_metric_pola_complete": "pageview-metric28",
            "custom_metric_register": "link-metric29",
            "custom_metric_sign_in": "link-metric30",
            "custom_metric_chat_initiated": "link-metric37",
            "custom_metric_chat_answered": "link-metric38",
            "custom_metric_chat_not_answered": "link-metric39",
            "custom_metric_service_my_at": "link-metric32",
            "custom_metric_warranty_my_at": "link-metric33",
            "custom_metric_tax_my_at": "link-metric34",
            "custom_metric_mot_my_at": "link-metric40",
            "custom_metric_insurance_my_at": "link-metric41",
            "custom_metric_add_my_car": "link-metric31",
            "percentage_page_viewed": "pageview-dimension83",
            "qp.atcidi": "dimension100",
            "session_id": "pageview-dimension102,link-dimension102,dimension102,enh_product_add-dimension102,enh_product_remove-dimension102,enh_detail-dimension102,enh_product_impression-dimension102,transaction-dimension102,enh_product_checkout-dimension102,enh_product_click-dimension102,enh_product_purchase-dimension102,enh_product_refund-dimension102,enh_purchase-dimension102,enh_refund-dimension102,enh_checkout_option-dimension102",
            "device_id": "pageview-dimension103,link-dimension103,dimension103,enh_product_add-dimension103,enh_product_remove-dimension103,enh_detail-dimension103,enh_product_impression-dimension103,transaction-dimension103,enh_product_checkout-dimension103,enh_product_click-dimension103,enh_product_purchase-dimension103,enh_product_refund-dimension103,enh_purchase-dimension103,enh_refund-dimension103,enh_checkout_option-dimension103",
            "platform_type": "pageview-dimension99,link-dimension99,dimension99,enh_product_add-dimension99,enh_product_remove-dimension99,enh_detail-dimension99,enh_product_impression-dimension99,transaction-dimension99,enh_product_checkout-dimension99,enh_product_click-dimension99,enh_product_purchase-dimension99,enh_product_refund-dimension99,enh_purchase-dimension99,enh_refund-dimension99,enh_checkout_option-dimension99",
            "tealium_profile": "pageview-dimension101,link-dimension101,dimension101,enh_product_add-dimension101,enh_product_remove-dimension101,enh_detail-dimension101,enh_product_impression-dimension101,transaction-dimension101,enh_product_checkout-dimension101,enh_product_click-dimension101,enh_product_purchase-dimension101,enh_product_refund-dimension101,enh_purchase-dimension101,enh_refund-dimension101,enh_checkout_option-dimension101",
            "category": "eventCategory",
            "label": "eventLabel",
            "action": "eventAction",
            "custom_metric_send_sms": "link-metric57",
            "ut.env": "pageview-dimension109,link-dimension109,dimension109,enh_product_add-dimension109,enh_product_remove-dimension109,enh_detail-dimension109,enh_product_impression-dimension109,transaction-dimension109,enh_product_checkout-dimension109,enh_product_click-dimension109,enh_product_purchase-dimension109,enh_product_refund-dimension109,enh_purchase-dimension109,enh_refund-dimension109,enh_checkout_option-dimension109",
            "social_connection": "pageview-dimension110,link-dimension110,enh_product_add-dimension110,enh_product_remove-dimension110,enh_detail-dimension110,enh_product_impression-dimension110,transaction-dimension110,enh_product_checkout-dimension110,enh_product_click-dimension110,enh_product_purchase-dimension110,enh_product_refund-dimension110,enh_purchase-dimension110,enh_refund-dimension110,enh_checkout_option-dimension110",
            "territory": "pageview-dimension111,link-dimension111,dimension111,enh_product_add-dimension111,enh_product_remove-dimension111,enh_detail-dimension111,enh_product_impression-dimension111,transaction-dimension111,enh_product_checkout-dimension111,enh_product_click-dimension111,enh_product_purchase-dimension111,enh_product_refund-dimension111,enh_purchase-dimension111,enh_refund-dimension111,enh_checkout_option-dimension111",
            "pxg_id": "pageview-dimension112",
            "cp.marin_cookie": "dimension113",
            "recommended_value": "pageview-dimension114",
            "content_group_1_channels": "contentGroup1",
            "cp.userid": "pageview-dimension115,link-dimension115,dimension115,enh_product_add-dimension115,enh_product_remove-dimension115,enh_detail-dimension115,enh_product_impression-dimension115,transaction-dimension115,enh_product_checkout-dimension115,enh_product_click-dimension115,enh_product_purchase-dimension115,enh_product_refund-dimension115,enh_purchase-dimension115,enh_refund-dimension115,enh_checkout_option-dimension115",
            "app_name": "appName",
            "logged_in_state": "pageview-dimension6,link-dimension6,dimension6,enh_product_add-dimension6,enh_product_remove-dimension6,enh_detail-dimension6,enh_product_impression-dimension6,transaction-dimension6,enh_product_checkout-dimension6,enh_product_click-dimension6,enh_product_purchase-dimension6,enh_product_refund-dimension6,enh_purchase-dimension6,enh_refund-dimension6,enh_checkout_option-dimension6",
            "at_platform": "pageview-dimension1,link-dimension1,dimension1,enh_product_add-dimension1,enh_product_remove-dimension1,enh_detail-dimension1,enh_product_impression-dimension1,transaction-dimension1,enh_product_checkout-dimension1,enh_product_click-dimension1,enh_product_purchase-dimension1,enh_product_refund-dimension1,enh_purchase-dimension1,enh_refund-dimension1,enh_checkout_option-dimension1",
            "aggregated_trim": "pageview-dimension117",
            "max_gvw": "pageview-dimension118",
            "max_gtw": "pageview-dimension119",
            "max_engine_power": "pageview-dimension120",
            "max_hours_used": "pageview-dimension121",
            "custom_metric_autosearch": "pageview-metric45",
            "sub_category": "pageview-dimension129",
            "photo_index": "pageview-dimension130,link-dimension130",
            "event_position": "pageview-dimension131,link-dimension131",
            "cp.ga_cid_cookie_val": "pageview-dimension132,link-dimension132,dimension132,enh_product_add-dimension132,enh_product_remove-dimension132,enh_detail-dimension132,enh_product_impression-dimension132,transaction-dimension132,enh_product_checkout-dimension132,enh_product_click-dimension132,enh_product_purchase-dimension132,enh_product_refund-dimension132,enh_purchase-dimension132,enh_refund-dimension132,enh_checkout_option-dimension132",
            "dealer_rating_average_value": "pageview-dimension137,link-dimension137",
            "drivetrain": "pageview-dimension138",
            "cp.sessVar": "dimension102",
            "postcode_populated": "pageview-dimension95,link-dimension95",
            "location_key": "dimension139",
            "mhc_category": "pageview-dimension72",
            "idfa": "set.&idfa,dimension142",
            "google_adid": "set.&adid,dimension142",
            "makecount": "pageview-dimension141",
            "ate": "set.&ate",
            "custom_metric_part_ex_request": "metric46",
            "ga_user_stage": "dimension151",
            "ga_model_day_count": "pageview-dimension152",
            "great_value": "dimension153,pageview-dimension153,link-dimension153",
            "seo_county": "pageview-dimension149",
            "seo_region": "pageview-dimension148",
            "seo_town": "pageview-dimension150",
            "website_id": "pageview-dimension122,link-dimension122",
            "domain_var": "pageview-dimension123,link-dimension123",
            "website_version": "pageview-dimension124,link-dimension124",
            "template": "pageview-dimension125,link-dimension125",
            "theme": "pageview-dimension126,link-dimension126",
            "colour_scheme": "pageview-dimension127,link-dimension127",
            "edit_mode": "pageview-dimension128,link-dimension128",
            "at_platform_referrer": "dimension91,pageview-dimension91,link-dimension91",
            "gaEventNonint": "nonInteraction",
            "android_install_referrer": "dimension156",
            "android_install_ref_medium": "set.&cm",
            "android_install_ref_source": "set.&cs",
            "android_install_ref_term": "set.&ck",
            "website_product": "pageview-dimension133,link-dimension133",
            "website_published_product": "pageview-dimension147,link-dimension147",
            "advert_attributes": "pageview-dimension59,link-dimension59,dimension59",
            "android_install_ref_campaign": "campaignName",
            "android_install_ref_content": "campaignContent",
            "android_install_ref_gclid": "set.&gclid,dimension157",
            "android_install_ref_dclid": "set.&dclid,dimension158",
            "custom_metric_vitual_ad_view": "pageview-metric47",
            "network_connection_type": "dimension93",
            "derivative_name": "dimension161",
            "content_tags": "dimension86",
            "cp.mobileTest": "dimension163",
            "ga_dmp_user_stage": "dimension164",
            "cp.osp_aam": "dimension165",
            "experiment_variant": "dimension166",
            "custom_metric_new_car_lead": "pageview-metric48",
            "cp.abTestGroups": "dimension167",
            "cp.abtcid": "dimension168",
            "advertiser_segment": "dimension169",
            "min_monthly_price": "dimension170",
            "max_monthly_price": "dimension171",
            "deposit": "dimension172",
            "term": "dimension173",
            "yearly_mileage": "dimension174",
            "monthly_vehicle_price": "dimension175",
            "finance_representative_apr": "dimension176",
            "custom_metric_finance_search": "pageview-metric49",
            "pola_free_to_list_compltion": "metric50",
            "ecommerce_bolt_ons": "dimension140,pageview-dimension140,link-dimension140,enh_all-dimension140",
            "car_buyer_download": "link-metric51",
            "radius": "pageview-dimension177,link-dimension177",
            "generation_id": "dimension178",
            "product_add_ons": "enh_all-,dimension188,link-dimension188,transaction-dimension188",
            "product_add_ons_price": "enh_all-,dimension189,link-dimension189,transaction-dimension189",
            "utm_content": "campaignContent",
            "utm_medium": "campaignMedium,dimension186",
            "utm_source": "campaignSource",
            "utm_term": "campaignKeyword",
            "finance_view_selected": "dimension183",
            "custom_metric_finance_ad_view": "metric52",
            "cookie_policy_accepted": "dimension184",
            "new_car_finance": "pageview-dimension185,link-dimension185",
            "qp.utm_source": "campaignSource",
            "qp.utm_medium": "campaignMedium",
            "qp.utm_campaign": "campaignName",
            "qp.utm_content": "campaignContent",
            "qp.utm_term": "campaignKeyword",
            "cp.utm_campaign_source": "campaignSource",
            "cp.utm_campaign_medium": "campaignMedium",
            "custom_metric_dealer_email_web": "pageview-metric54",
            "custom_metric_dealer_email_apps": "link-metric55",
            "qp.utm_id": "campaignId",
            "custom_metric_new_ad_view": "pageview-metric56"
        };
        u.extend = [function (a, b) {
            b['previous_page_name'] = b['cp.utag_main__prevpage'];
            utag.loader.SC('utag_main', {
                '_prevpage': b['page_name'] + ';exp-1h'
            })
        }, function (a, b, c) {
            for (c in utag.loader.GV(b)) {
                if (c === 'cp.trace_id') continue;
                try {
                    b[c] = b[c] instanceof Array ? b[c] : b[c] instanceof Object ? b[c] : b[c].toString().toLowerCase();
                } catch (e) {
                    utag.DB(e);
                }
            }
        }, function (a, b) {
            function cleanUrl(url) {
                var reParts = /(.*?\.uk|.*?\.net)([^?]*)(.*)?/;
                var urlParts = reParts.exec(url);
                var reParam = /\/((postcode)|(latitude)|(longitude)|(useremail)|(email))\/([^\/]*)/gi;
                urlParts[2] = urlParts[2].replace(reParam, "/$1/masked");
                if (urlParts[3] != null) {
                    var reQs = /(&|\?)((postcode)|(latitude)|(longitude)|(VRM)|(reg)|(useremail)|(email)|(after-signin-url)|(back-to-url)|(resetpasswordtoken))=[^&]*/gi;
                    urlParts[3] = urlParts[3].replace(reQs, "$1$2=masked");
                    url = urlParts[1] + urlParts[2] + urlParts[3];
                } else {
                    url = urlParts[1] + urlParts[2]
                }
                return url;
            }
            b.url_masked = cleanUrl(window.location.href);
        }, function (a, b) {
            re = /[^a-z0-9]/g;
            b.location_postcode = b.location_postcode.toLowerCase().replace(re, "");
            b.location_postcode_prefix = b.location_postcode.substring(0, b.location_postcode.length - 3);
        }, function (a, b, c, d, e, f, g) {
            if (1) {
                d = b['ut.env'];
                if (typeof d == 'undefined') return;
                c = [{
                    'dev': 'UA-59686422-3'
                }, {
                    'qa': 'UA-59686422-1'
                }, {
                    'prod': 'UA-59686422-5'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        if (d == f) {
                            b['ga_account_id'] = c[e][f];
                            m = true
                        };
                    };
                    if (m) break
                };
                if (!m) b['ga_account_id'] = '';
            }
        }, function (a, b) {
            try {
                if (/:ad-view$/i.test(b['page_name']) || b['page_name'].toString().indexOf(':ad-view:homescreen') > -1) {
                    b['custom_metric_ad_view'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (/:known:results-pg\[1\]$/i.test(b['page_name_granular']) || /:seo:results-pg\[1\]$/i.test(b['page_name']) || b['page_name'] == 'cars:search:seo:results' || b['page_name'] == 'bikes:search:seo:results') {
                    b['custom_metric_vehicle_search'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (/:vehicle-check:your-report$/i.test(b['page_name']) || /:vehicle-check:my-checks$/i.test(b['page_name'])) {
                    b['custom_metric_vehicle_check_complete'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (/finance:confirmation$/i.test(b['page_name'])) {
                    b['custom_metric_finance_private_complete'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (/:your valuation:selling$/i.test(b['page_name']) || /:your valuation:buying$/i.test(b['page_name'])) {
                    b['custom_metric_valuation_complete'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (/:step2b:features$/i.test(b['page_name'])) {
                    b['custom_metric_pola_initiation'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (/:step4a:payment-accepted$/i.test(b['page_name'])) {
                    b['custom_metric_pola_complete'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('call button') > -1 && b['category'].toString().indexOf('leads') > -1 && b['platform'].toString().indexOf('mobile-web') > -1) || (b['label'].toString().indexOf('call number') > -1 && b['category'].toString().indexOf('leads') > -1 && b['platform'].toString().indexOf('mobile-web') > -1) || (b['label'].toString().indexOf('call confirm') > -1 && b['category'].toString().indexOf('leads') > -1) || (b['label'].toString().indexOf('call-confirm') > -1 && b['category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_call_seller'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'] == 'view-website' && b['category'] == 'leads') || (b['label'] == 'view website' && b['category'] == 'leads') || (b['label'] == 'visit website' && b['category'] == 'leads') || (b['label'].toString().indexOf('seller') > -1 && b['category'] == 'leads' && b['label'].toString().indexOf('website') > -1) || (b['category'].toString().indexOf('leads-link') > -1 && b['label'].toString().indexOf('view website') > -1)) {
                    b['custom_metric_dealer_website'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('miles from you') > -1 && b['category'].toString().indexOf('leads') > -1) || (b['label'].toString().indexOf('view-map') > -1 && b['category'].toString().indexOf('leads') > -1) || (b['label'].toString().indexOf('seller location') > -1 && b['category'].toString().indexOf('leads') > -1) || (b['label'].toString().indexOf('fpa-map-view') > -1 && b['category'].toString().indexOf('leads-link') > -1)) {
                    b['custom_metric_view_map'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('get directions') > -1 && b['category'].toString().indexOf('leads') > -1) || (b['category'].toString().indexOf('leads-link') > -1 && b['label'].toString().indexOf('fpa-get-directions') > -1)) {
                    b['custom_metrics_get_directions'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('receive a quote') > -1 && b['category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_receive_quote'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('book a test drive') > -1 && b['category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_book_test_drive'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('view special offer') > -1 && b['category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_special_offer'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('share posted') > -1 && b['category'].toString().indexOf('standard-link') > -1)) {
                    b['custom_metric_share_vehicle'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('save vehicle') > -1 && b['category'].toString().indexOf('standard-link') > -1) || (b['label'].toString().indexOf('save-vehicle') > -1 && b['category'].toString().indexOf('standard-link') > -1)) {
                    b['custom_metric_save_vehicle'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('save this search') > -1 && b['category'].toString().indexOf('standard-link') > -1) || (b['label'].toString().indexOf('save-this-search') > -1 && b['category'].toString().indexOf('standard-link') > -1)) {
                    b['custom_metric_save_search'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('vehicle-check') > -1 && b['category'].toString().indexOf('motoring-products') > -1 && b['label'].toString().indexOf('-initiation') > -1) || (b['label'].toString().indexOf('check-this-cars-history') > -1 && b['category'].toString().indexOf('standard-link') > -1) || (b['label'].toString().indexOf('start-check') > -1 && b['category'].toString().indexOf('standard-link') > -1)) {
                    b['custom_metric_vehicle_check_initiation'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('apply-finance-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1) || (b['label'] == 'finance-apply-now-initiation' && b['category'].toString().indexOf('motoring-products') > -1)) {
                    b['custom_metric_finance_initiation'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('get-insurance-quote-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1 && b['label'].toString().indexOf('gap') < 0) || (b['label'].toString().indexOf('retrieve-insurance-quote-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1 && b['label'].toString().indexOf('gap') < 0) || (b['label'].toString().indexOf('insurance-get-a-quote-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1 && b['label'].toString().indexOf('gap') < 0) || (b['label'].toString().indexOf('insurance-get-quote-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1 && b['label'].toString().indexOf('gap') < 0)) {
                    b['custom_metric_insurance_initiation'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('get-warranty-quote-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1) || (b['label'].toString().indexOf('warranty-get-a-quote-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1)) {
                    b['custom_metric_warranty_initiation'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('get-gap-insurance-quote-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1) || (b['label'].toString().indexOf('gap-insurance-get-a-quote-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1)) {
                    b['custom_metric_gap_insurance_initiation'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('get-valuation-initiation') > -1 && b['category'].toString().indexOf('motoring-products') > -1)) {
                    b['custom_metric_valuation_initiation'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((/(live chat|chat-now)/.test(b['label']) && b['category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_chat_initiated'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['link_name'].toString().indexOf('live-chat-answered') > -1 && b['link_category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_chat_answered'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['link_name'].toString().indexOf('live-chat-not-answered') > -1 && b['link_category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_chat_not_answered'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('sign in completion') > -1 && b['category'].toString().indexOf('register-sign-in') > -1) || (b['link_name'].toString().indexOf('sign-in-successful') > -1 && b['link_category'].toString().indexOf('standard-link') > -1)) {
                    b['custom_metric_sign_in'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'].toString().indexOf('register completion') > -1 && b['category'].toString().indexOf('register-sign-in') > -1) || (b['label'].toString().indexOf('registration-successful') > -1 && b['category'].toString().indexOf('standard-link') > -1)) {
                    b['custom_metric_register'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['category'].toString().toLowerCase() == 'my-at-products'.toLowerCase() && b['label'].toString().toLowerCase() == 'mot'.toLowerCase())) {
                    b['custom_metric_mot_my_at'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['category'].toString().toLowerCase() == 'my-at-products'.toLowerCase() && b['label'].toString().toLowerCase() == 'insurance'.toLowerCase())) {
                    b['custom_metric_insurance_my_at'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['category'].toString().toLowerCase() == 'my-at-products'.toLowerCase() && b['label'].toString().toLowerCase() == 'tax'.toLowerCase())) {
                    b['custom_metric_tax_my_at'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['category'].toString().toLowerCase() == 'my-at-products'.toLowerCase() && b['label'].toString().toLowerCase() == 'service'.toLowerCase())) {
                    b['custom_metric_service_my_at'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['category'].toString().toLowerCase() == 'my-at-products'.toLowerCase() && b['label'].toString().toLowerCase() == 'warranty'.toLowerCase())) {
                    b['custom_metric_warranty_my_at'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['category'].toString().toLowerCase() == 'standard-link'.toLowerCase() && b['label'].toString().toLowerCase() == 'yes-this-is-my-car'.toLowerCase()) || (b['category'].toString().toLowerCase() == 'standard-link'.toLowerCase() && b['label'].toString().toLowerCase() == 'yes this is my car'.toLowerCase())) {
                    b['custom_metric_add_my_car'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b, c, d, e, f, g) {
            if (1) {
                d = b['dealer_products'];
                if (typeof d == 'undefined') return;
                c = [{
                    'standOutCars': 'standout-cars'
                }, {
                    'standOutBikes': 'standout-bikes'
                }, {
                    'associatedVehiclesCars': 'associatedvehicles-cars'
                }, {
                    'associatedVehiclesBikes': 'associatedvehicles-bikes'
                }, {
                    'videoSlideShow': 'video-slide-show'
                }, {
                    'callTracker': 'call-tracker-basic'
                }, {
                    'callTrackerPlus': 'call-tracker-plus'
                }, {
                    'callTrackerPro': 'call-tracker-pro'
                }, {
                    'callTrackerFree': 'call-tracker-free'
                }, {
                    'callTrackerPlusNew': 'call-tracker-plusnew'
                }, {
                    'callTrackerProNew': 'call-tracker-pronew'
                }, {
                    'carDealerStockView': 'dealer-stock-view-cars'
                }, {
                    'bikeDealerStockView': 'dealer-stock-view-bikes'
                }, {
                    'carDealerBackgroundBranding': 'dealer-bg-branding-cars'
                }, {
                    'bikeDealerBackgroundBranding': 'dealer-bg-branding-bikes'
                }, {
                    'carDealerBackgroundColour': 'dealer-bg-colour-cars'
                }, {
                    'bikeDealerBackgroundColour': 'dealer-bg-colour-bikes'
                }, {
                    'carDsvSkyscraper': 'dsv-skyscraper-cars'
                }, {
                    'bikeDsvSkyscraper': 'dsv-skyscraper-bikes'
                }, {
                    'dealerDirectoryStandardListing13Week': 'dealer-dir-listing-13w'
                }, {
                    'dealerDirectoryStandardListing52Week': 'dealer-dir-listing-52w'
                }, {
                    'dealerDirectoryStandardNewBikeListing': 'dealer-dir-new-standard-listing-bikes'
                }, {
                    'dealerDirectoryFreeNewBikeListing': 'dealer-dir-new-free-listing-bikes'
                }, {
                    'dealerDirectoryPlusBikeTrainingListing': 'dealer-dir-plus-training-listing-bikes'
                }, {
                    'dealerDirectoryStandardBikeTrainingListing': 'dealer-dir-standard-training-listing-bikes'
                }, {
                    'dealerDirectoryFreeBikeTrainingListing': 'dealer-dir-free-training-listing-bikes'
                }, {
                    'razsorStandardWebsite': 'razsor-standard-website'
                }, {
                    'razsorEnhancedWebsite': 'razsor-enhanced-website'
                }, {
                    'razsorFuture03': 'razsor-future-03'
                }, {
                    'razsorFuture04': 'razsor-future-04'
                }, {
                    'razsorFuture05': 'razsor-future-05'
                }, {
                    'razsorFuture06': 'razsor-future-06'
                }, {
                    'razsorFuture07': 'razsor-future-07'
                }, {
                    'razsorFuture08': 'razsor-future-08'
                }, {
                    'razsorFuture09': 'razsor-future-09'
                }, {
                    'razsorFuture25': 'razsor-future-25'
                }, {
                    'razsorMobile': 'razsor-mobile'
                }, {
                    'razsorMobileOnly': 'razsor-mobile-only'
                }, {
                    'razsorGroupMobile': 'razsor-group-mobile'
                }, {
                    'razsorGroupMobileOnly': 'razsor-group-mobile-only'
                }, {
                    'deepLinks': 'deep-links'
                }, {
                    'webStock': 'web-stock'
                }, {
                    'showroom': 'showroom'
                }, {
                    'contactAtOnce': 'contact-at-once'
                }, {
                    'franchisePopup': 'franchise-popup'
                }, {
                    'manufacturerGroup': 'manufacturer-group'
                }, {
                    'mobilePremiumStockListing': 'mobile-premium-stock-listing'
                }, {
                    'mobileWebsiteTrial': 'mobile-website-trial'
                }, {
                    'dealerRating': 'dealer-rating'
                }, {
                    'dealerFinance': 'dealer-finance'
                }, {
                    'privateFeaturedListing': 'private-featured-listing'
                }, {
                    'privateThumbnails': 'private-thumbnails'
                }, {
                    'tolaClub': 'tola-club'
                }, {
                    'featuredListing': 'featured-listing'
                }, {
                    'leadGenerator': 'lead-generator'
                }, {
                    'youMayAlsoLike': 'you-may-also-like'
                }, {
                    'featuredDealer': 'featured-dealer'
                }, {
                    'autoTraderCalls': 'auto-trader-calls'
                }, {
                    'commercialAdvantagePackage': 'commercial-advantage-package'
                }, {
                    'WSSO': 'standout-cars'
                }, {
                    'WBSO': 'standout-bikes'
                }, {
                    'WAV': 'associatedvehicles-cars'
                }, {
                    'WBAV': 'associatedvehicles-bikes'
                }, {
                    'WVSS': 'video-slide-show'
                }, {
                    'WCTR': 'call-tracker-basic'
                }, {
                    'WCPL': 'call-tracker-plus'
                }, {
                    'WCPO': 'call-tracker-pro'
                }, {
                    'WCTF': 'call-tracker-free'
                }, {
                    'WCTP': 'call-tracker-plusnew'
                }, {
                    'WCTO': 'call-tracker-pronew'
                }, {
                    'WDSV': 'dealer-stock-view-cars'
                }, {
                    'WBDV': 'dealer-stock-view-bikes'
                }, {
                    'WCBI': 'dealer-bg-branding-cars'
                }, {
                    'WBBI': 'dealer-bg-branding-bikes'
                }, {
                    'WCBC': 'dealer-bg-colour-cars'
                }, {
                    'WBBC': 'dealer-bg-colour-bikes'
                }, {
                    'WCSS': 'dsv-skyscraper-cars'
                }, {
                    'WBSS': 'dsv-skyscraper-bikes'
                }, {
                    'WNDS': 'dealer-dir-listing-13w'
                }, {
                    'WND1': 'dealer-dir-listing-52w'
                }, {
                    'WNBD': 'dealer-dir-new-standard-listing-bikes'
                }, {
                    'WNBF': 'dealer-dir-new-free-listing-bikes'
                }, {
                    'WBTP': 'dealer-dir-plus-training-listing-bikes'
                }, {
                    'WBTS': 'dealer-dir-standard-training-listing-bikes'
                }, {
                    'WBTF': 'dealer-dir-free-training-listing-bikes'
                }, {
                    'WS01': 'razsor-standard-website'
                }, {
                    'WS02': 'razsor-enhanced-website'
                }, {
                    'WS03': 'razsor-future-03'
                }, {
                    'WS04': 'razsor-future-04'
                }, {
                    'WS05': 'razsor-future-05'
                }, {
                    'WS06': 'razsor-future-06'
                }, {
                    'WS07': 'razsor-future-07'
                }, {
                    'WS08': 'razsor-future-08'
                }, {
                    'WS09': 'razsor-future-09'
                }, {
                    'WS25': 'razsor-future-25'
                }, {
                    'WB25': 'razsor-mobile'
                }, {
                    'WB26': 'razsor-mobile-only'
                }, {
                    'WB43': 'razsor-group-mobile'
                }, {
                    'WB44': 'razsor-group-mobile-only'
                }, {
                    'DB01': 'deep-links'
                }, {
                    'WS': 'web-stock'
                }, {
                    'WSDG': 'showroom'
                }, {
                    'WIMT': 'contact-at-once'
                }, {
                    'WFP': 'franchise-popup'
                }, {
                    'WTFM': 'manufacturer-group'
                }, {
                    'WMPS': 'mobile-premium-stock-listing'
                }, {
                    'WMWT': 'mobile-website-trial'
                }, {
                    'WDRS': 'dealer-rating'
                }, {
                    'WDFI': 'dealer-finance'
                }, {
                    'PFL': 'private-featured-listing'
                }, {
                    'PTN': 'private-thumbnails'
                }, {
                    'TCM': 'tola-club'
                }, {
                    'WFL': 'featured-listing'
                }, {
                    'WLGE': 'lead-generator'
                }, {
                    'WYMA': 'you-may-also-like'
                }, {
                    'WTFD': 'featured-dealer'
                }, {
                    'WATC': 'auto-trader-calls'
                }, {
                    'WCAO': 'commercial-advantage-package'
                }];
                if (typeof b['dealer_products'] === 'undefined') {
                    b['dealer_products'] = [];
                }
                for (var h = 0; h < d.length; h++) {
                    var m = false;
                    for (e = 0; e < c.length; e++) {
                        for (f in utag.loader.GV(c[e])) {
                            if (d[h] == f) {
                                b['dealer_products'][h] = c[e][f];
                                m = true
                            };
                        };
                        if (m) break
                    };
                };
            }
        }, function (a, b, c, d, e, f, g) {
            if (1) {
                d = b['platform'];
                if (typeof d == 'undefined') return;
                c = [{
                    'desktop': 'desktop'
                }, {
                    'responsive': 'responsive'
                }, {
                    'mobile-web': 'mobile-web'
                }, {
                    'commercial-mobile-web': 'mobile-web'
                }, {
                    'ios-iphone-app': 'native-app'
                }, {
                    'ios-ipad-app': 'native-app'
                }, {
                    'android-tablet-app': 'native-app'
                }, {
                    'android-phone-app': 'native-app'
                }, {
                    'at-windows-app': 'native-app'
                }, {
                    'vans-ios-app': 'native-app'
                }, {
                    'motorhomes-ios-app': 'native-app'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        if (d == f) {
                            b['platform_type'] = c[e][f];
                            m = true
                        };
                    };
                    if (m) break
                };
                if (!m) b['platform_type'] = '';
            }
        }, function (a, b) {
            try {
                if ((typeof b['qp.atcidi'] != 'undefined' && typeof b['qp.atcidi'] != 'undefined' && b['qp.atcidi'] != '')) {
                    document.cookie = "internal_campaign_cookie=" + b['qp.atcidi'] + ";path=/;domain=" + utag.cfg.domain + ";expires=";
                    b['cp.internal_campaign_cookie'] = b['qp.atcidi'];
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (typeof b['ut.profile'] != 'undefined') {
                    b['tealium_profile'] = b['ut.profile']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['category'].toString().toLowerCase() == 'leads'.toLowerCase() && b['label'].toString().toLowerCase() == 'send sms'.toLowerCase()) || (b['category'].toString().indexOf('leads') > -1 && b['label'].toString().indexOf('dealer text') > -1) || (b['category'].toString().indexOf('leads') > -1 && b['label'].toString().indexOf('chat-overlay-send-text') > -1)) {
                    b['custom_metric_send_sms'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b, c, d) {
            try {
                if (1) {
                    c = [b['dom.domain'], b['dom.pathname']];
                    b['domain_and_pathname'] = c.join('')
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b, c, d, e, f, g) {
            if (1) {
                d = b['domain_and_pathname'];
                if (typeof d == 'undefined') return;
                c = [{
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/)(vans)$': 'vans:home'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/)(bikes)$': 'bikes:home'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/)(search\/form)$': 'cars:search:known:form'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(secure\/my-account\/my-adverts)$': 'my-at:my-live-adverts'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(secure\/my-account\/my-adverts-selector)$': 'my-at:my-adverts'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/)(motorhomes)$': 'motorhomes:home'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/)(caravans)$': 'caravans:home'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/)(search\/form\/usedbikes)$': 'bikes:search:known:form'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(secure\/my-account\/mycar\/create)$': 'my-at:my-car:add-your-car'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(secure\/my-auto-trader\/my-car\/create)$': 'my-at:my-car:add-your-car'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(used-car\/uk)$': 'cars:search:seo:results'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(secure\/my-auto-trader\/saved-searches)$': 'my-at:saved-searches'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(used-car\/uk\/northern-ireland)$': 'cars:search:seo:results'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(secure\/myaccount\/savedsearches)$': 'my-at:saved-searches'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/)(used-vans)$': 'vans:search:known:form'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/)(used-motorhomes)$': 'motorhome:search:known:form'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(watchlist)$': 'my-at:watchlist'
                }, {
                    '(^qaapp283\.qa\.dc1\.tradermedia\.net\/|^www\.autotrader\.co\.uk\/|^secure\.autotrader\.co\.uk\/)(services\/car-dealers)$': 'cars:search:dealers'
                }, {
                    '(^pool\-mobile\.qa\.dc1\.tradermedia\.net|^www\.autotrader\.co\.uk)$': 'cars:home'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        g = new RegExp(f, 'i');
                        if (g.test(d)) {
                            b['pagename_missing'] = c[e][f];
                            m = true
                        };
                    };
                    if (m) break
                };
                if (!m) b['pagename_missing'] = '';
            }
        }, function (a, b) {
            try {
                if (typeof b['pagename_missing'] != 'undefined' && b['pagename_missing'] != '') {
                    b['page_name'] = b['pagename_missing']
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((typeof b['qp.atcidk'] != 'undefined' && typeof b['qp.atcidk'] != 'undefined' && b['qp.atcidk'] != '')) {
                    document.cookie = "marin_cookie=" + b['qp.atcidk'] + ";path=/;domain=" + utag.cfg.domain + ";expires=" + (function () {
                        var d = new Date();
                        d.setTime(d.getTime() + (30 * 864e5));
                        return d.toGMTString();
                    })() + "";
                    b['cp.marin_cookie'] = b['qp.atcidk'];
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            function checkGA() {
                if (typeof ga != "undefined") {
                    ga(function () {
                        var ga_cid_val = ga.getAll()[0].get('clientId');
                        var cname_cid = "ga_cid_cookie_val";
                        var cvalue_cid = ga_cid_val;
                        document.cookie = cname_cid + "=" + cvalue_cid + ";domain=.autotrader.co.uk;path=/";
                    });
                }
            }
            setTimeout(checkGA, 1000);
        }, function (a, b, c, d, e, f, g) {
            if (1) {
                d = b['page_name'];
                if (typeof d == 'undefined') return;
                c = [{
                    '^cars': 'cars'
                }, {
                    '^bikes': 'bikes'
                }, {
                    '^vans': 'vans'
                }, {
                    '^caravans': 'caravans'
                }, {
                    '^motorhomes': 'motorhomes'
                }, {
                    '^trucks': 'trucks'
                }, {
                    '^farm': 'farm'
                }, {
                    '^plant': 'plant'
                }, {
                    '^my-at': 'my-at'
                }, {
                    '^general': 'general'
                }, {
                    '^404': 'error'
                }, {
                    '^500': 'error'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        g = new RegExp(f, 'i');
                        if (g.test(d)) {
                            b['content_group_1_channels'] = c[e][f];
                            m = true
                        };
                    };
                    if (m) break
                };
                if (!m) b['content_group_1_channels'] = 'not set';
            }
        }, function (a, b, c, d, e, f, g) {
            if (1) {
                d = b['url_section'];
                if (typeof d == 'undefined') return;
                c = [{
                    'caravan': 'caravans'
                }, {
                    'car': 'cars'
                }, {
                    'bike': 'bikes'
                }, {
                    'van': 'vans'
                }, {
                    'motorhome': 'motorhomes'
                }, {
                    'truck': 'trucks'
                }, {
                    'farm': 'farm'
                }, {
                    'plant': 'plant'
                }, {
                    'mobile': 'general'
                }, {
                    'cookie-policy': 'general'
                }, {
                    'contact-us': 'general'
                }, {
                    'terms-of-use': 'general'
                }, {
                    'safety_and_security_centre': 'general'
                }, {
                    'manage-my-adverts': 'my-at'
                }, {
                    'watchlist': 'my-at'
                }, {
                    'secure/my-auto-trader': 'my-at'
                }];
                var m = false;
                for (e = 0; e < c.length; e++) {
                    for (f in utag.loader.GV(c[e])) {
                        if (d.toString().indexOf(f) > -1) {
                            b['content_group_1_channels'] = c[e][f];
                            m = true
                        };
                    };
                    if (m) break
                };
                if (!m) b['content_group_1_channels'] = '';
            }
        }, function (a, b, c, d) {
            try {
                if (1) {
                    c = [b['make'], b['model'], b['max_mileage'], b['body_type'], b['min_mileage'], b['max_engine_size'], b['min_age'], b['max_age'], b['fuel_type'], b['min_price'], b['max_price'], b['distance'], b['used_new'], b['sort_order'], b['annual_tax'], b['co2_emissions'], b['number_of_doors'], b['colour'], b['gearbox'], b['keywords'], b['seller_type'], b['min_seats'], b['max_seats'], b['min_engine_size'], b['wheelbase'], b['cab_type'], b['acceleration'], b['aggregated_trim'], b['insurance_group'], b['fuel_consumption'], b['drivetrain'], b['max_monthly_price'], b['min_monthly_price'], b['deposit'], b['term'], b['yearly_mileage'], b['radius']];
                    b['search_string_val'] = ':' + c.join(':')
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (parseFloat(b['cp.quickQuoteSplit']) <= parseFloat(30)) {
                    b['site_version'] = 'c'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            function getCookie(c_name) {
                return sessionStorage ? sessionStorage.getItem(c_name) : '';
            }

            function saveValue(c_name, value) {
                if (sessionStorage) {
                    sessionStorage.setItem(c_name, value);
                }
            }
            if ((b.page_name == "cars:search:known:results" && b.platform == "desktop") || (b.page_name == "bikes:search:known:results" && b.platform == "desktop") || (b.page_name == "vans:search:known:results" && b.platform == "desktop")) {
                var criteria = b.search_criteria;
                if (criteria.indexOf('ni-only') > -1) {
                    var ni_value = 'ni-only';
                }
                if (criteria.indexOf('additional-ads') > -1) {
                    var additional_ads = 'additional-ads';
                }
                if (criteria.indexOf('legal-learner') > -1) {
                    var legal_learner = 'legal-learner';
                }
                if (criteria.indexOf('part-ex-available') > -1) {
                    var part_ex_value = 'part-ex';
                }
                var cname = "search_string_cookie";
                var cvalue = b.search_string_val;
                if (typeof ni_value != 'undefined') {
                    cvalue += ni_value + ':'
                }
                if (typeof additional_ads != 'undefined') {
                    cvalue += additional_ads + ':';
                }
                if (typeof legal_learner != 'undefined') {
                    cvalue += legal_learner + ':';
                }
                if (typeof part_ex_value != 'undefined') {
                    cvalue += part_ex_value + ':';
                }
                saveValue(cname, cvalue);
            }
            var s = getCookie("search_string_cookie");
            var str = getCookie("advert_search_string_cookie");
            if (((b.page_name == "cars:search:ad-view" || b.page_name == "bikes:search:ad-view" || b.page_name == "vans:search:ad-view") || ((b.page_name_granular != "desktop:cars:search:known:results-pg[1]" && b.page_name_granular != "desktop:bikes:search:known:results-pg[1]" && b.page_name_granular != "desktop:vans:search:known:results-pg[1]") && (b.page_name == "cars:search:known:results" || b.page_name == "bikes:search:known:results" || b.page_name == "vans:search:known:results"))) && b.platform == "desktop" && !str) {
                var cname1 = "advert_search_string_cookie";
                var cvalue1 = '|' + s + '|';
                saveValue(cname1, cvalue1);
                b.custom_metric_autosearch = 1;
            } else if (((b.page_name == "cars:search:ad-view" || b.page_name == "bikes:search:ad-view" || b.page_name == "vans:search:ad-view") || ((b.page_name_granular != "desktop:cars:search:known:results-pg[1]" && b.page_name_granular != "desktop:bikes:search:known:results-pg[1]" && b.page_name_granular != "desktop:vans:search:known:results-pg[1]") && (b.page_name == "cars:search:known:results" || b.page_name == "bikes:search:known:results" || b.page_name == "vans:search:known:results"))) && b.platform == "desktop" && str && str.indexOf('|' + s + '|') == -1) {
                str += '|' + s + '|';
                var cname1 = "advert_search_string_cookie";
                var cvalue1 = str;
                saveValue(cname1, cvalue1);
                b.custom_metric_autosearch = 1;
            }
        }, function (a, b) {
            if (b.label == "view-website" || b.label == "view website" || b.label == "visit website") {
                var ga_cid_val = ga.getAll()[0].get('linkerParam');
                var res = ga_cid_val.replace("_ga=", "");
                var cname_cid = "ga_cid_cookie";
                var cvalue_cid = res;
                document.cookie = cname_cid + "=" + cvalue_cid + ";domain=.autotrader.co.uk;path=/";
            }
        }, function (a, b) {
            try {
                if (typeof b['cp.postcode'] != 'undefined' && b['cp.postcode'] != '') {
                    b['postcode_populated'] = 'populated'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            (function () {
                function getCookie(c_name) {
                    return sessionStorage ? sessionStorage.getItem(c_name) : '';
                }

                function saveValue(c_name, value) {
                    if (sessionStorage) {
                        sessionStorage.setItem(c_name, value);
                    }
                }
                if ((b.page_name === "cars:search:discovery:generation" && b.platform === "desktop" && b.previous_page_name === "cars:search:discovery:aggregation")) {
                    var ds = b.discovery_search_creation;
                    var dstr = getCookie("discovery_advert_search_string_cookie");
                    var cname1, cvalue1;
                    if (!dstr || (dstr && dstr.indexOf('|' + ds + '|') === -1)) {
                        cname1 = "discovery_advert_search_string_cookie";
                        cvalue1 = '|' + ds + '|';
                        saveValue(cname1, cvalue1);
                        b.custom_metric_discovery_search = 1;
                    }
                }
            }());
        }, function (a, b) {
            ;
            (function (document, window, config) {
                'use strict';
                window.onYouTubeIframeAPIReady = (function () {
                    var cached = window.onYouTubeIframeAPIReady;
                    return function () {
                        if (cached) {
                            cached.apply(this, arguments);
                        }
                        if (!navigator.userAgent.match(/MSIE [67]\./gi)) {
                            init();
                        }
                    };
                })();
                var _config = config || {};
                var forceSyntax = _config.forceSyntax || 0;
                var dataLayerName = _config.dataLayerName || 'dataLayer';
                var eventsFired = {
                    'Play': true,
                    'Pause': true,
                    'Watch to End': true
                };
                var key;
                for (key in _config.events) {
                    if (_config.events.hasOwnProperty(key)) {
                        eventsFired[key] = _config.events[key];
                    }
                }

                function init() {
                    var iframes = document.getElementsByTagName('iframe');
                    var embeds = document.getElementsByTagName('embed');
                    digestPotentialVideos(iframes);
                    digestPotentialVideos(embeds);
                }
                var tag = document.createElement('script');
                tag.src = '//www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                function digestPotentialVideos(potentialVideos) {
                    var i;
                    for (i = 0; i < potentialVideos.length; i++) {
                        var isYouTubeVideo = checkIfYouTubeVideo(potentialVideos[i]);
                        if (isYouTubeVideo) {
                            var normalizedYouTubeIframe = normalizeYouTubeIframe(potentialVideos[i]);
                            addYouTubeEvents(normalizedYouTubeIframe);
                        }
                    }
                }

                function checkIfYouTubeVideo(potentialYouTubeVideo) {
                    var potentialYouTubeVideoSrc = potentialYouTubeVideo.src || '';
                    if (potentialYouTubeVideoSrc.indexOf('youtube.com/embed/') > -1 || potentialYouTubeVideoSrc.indexOf('youtube.com/v/') > -1 || potentialYouTubeVideoSrc.indexOf('www.youtube-nocookie.com/') > -1) {
                        return true;
                    }
                    return false;
                }

                function normalizeYouTubeIframe(youTubeVideo) {
                    var a = document.createElement('a');
                    a.href = youTubeVideo.src;
                    a.hostname = 'www.youtube.com';
                    a.protocol = document.location.protocol;
                    var tmpPathname = a.pathname.charAt(0) === '/' ? a.pathname : '/' + a.pathname;
                    var origin = window.location.protocol + '%2F%2F' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
                    if (a.search.indexOf('enablejsapi') === -1) {
                        a.search = (a.search.length > 0 ? a.search + '&' : '') + 'enablejsapi=1';
                    }
                    if (a.search.indexOf('origin') === -1 && window.location.hostname.indexOf('localhost') === -1) {
                        a.search = a.search + '&origin=' + origin;
                    }
                    if (youTubeVideo.type === 'application/x-shockwave-flash') {
                        var newIframe = document.createElement('iframe');
                        newIframe.height = youTubeVideo.height;
                        newIframe.width = youTubeVideo.width;
                        tmpPathname = tmpPathname.replace('/v/', '/embed/');
                        youTubeVideo.parentNode.parentNode.replaceChild(newIframe, youTubeVideo.parentNode);
                        youTubeVideo = newIframe;
                    }
                    a.pathname = tmpPathname;
                    if (youTubeVideo.src !== a.href + a.hash) {
                        youTubeVideo.src = a.href + a.hash;
                    }
                    return youTubeVideo;
                }

                function addYouTubeEvents(youTubeIframe) {
                    youTubeIframe.pauseFlag = false;
                    new YT.Player(youTubeIframe, {
                        events: {
                            onStateChange: function (evt) {
                                onStateChangeHandler(evt, youTubeIframe);
                            }
                        }
                    });
                }

                function getMarks(duration) {
                    var marks = {};
                    if (_config.events['Watch to End']) {
                        marks['Watch to End'] = duration * 99 / 100;
                    }
                    if (_config.percentageTracking) {
                        var points = [];
                        var i;
                        if (_config.percentageTracking.each) {
                            points = points.concat(_config.percentageTracking.each);
                        }
                        if (_config.percentageTracking.every) {
                            var every = parseInt(_config.percentageTracking.every, 10);
                            var num = 100 / every;
                            for (i = 1; i < num; i++) {
                                points.push(i * every);
                            }
                        }
                        for (i = 0; i < points.length; i++) {
                            var _point = points[i];
                            var _mark = _point + '%';
                            var _time = duration * _point / 100;
                            marks[_mark] = Math.floor(_time);
                        }
                    }
                    return marks;
                }

                function checkCompletion(player, marks, videoId) {
                    var duration = player.getDuration();
                    var currentTime = player.getCurrentTime();
                    var playbackRate = player.getPlaybackRate();
                    player[videoId] = player[videoId] || {};
                    var key;
                    for (key in marks) {
                        if (marks[key] <= currentTime && !player[videoId][key]) {
                            player[videoId][key] = true;
                            fireAnalyticsEvent(videoId, key);
                        }
                    }
                }

                function onStateChangeHandler(evt, youTubeIframe) {
                    var stateIndex = evt.data;
                    var player = evt.target;
                    var targetVideoUrl = player.getVideoUrl();
                    var targetVideoId = targetVideoUrl.match(/[?&]v=([^&#]*)/)[1];
                    var playerState = player.getPlayerState();
                    var duration = player.getDuration();
                    var marks = getMarks(duration);
                    var playerStatesIndex = {
                        '1': 'Play',
                        '2': 'Pause'
                    };
                    var state = playerStatesIndex[stateIndex];
                    youTubeIframe.playTracker = youTubeIframe.playTracker || {};
                    if (playerState === 1 && !youTubeIframe.timer) {
                        clearInterval(youTubeIframe.timer);
                        youTubeIframe.timer = setInterval(function () {
                            checkCompletion(player, marks, youTubeIframe.videoId);
                        }, 1000);
                    } else {
                        clearInterval(youTubeIframe.timer);
                        youTubeIframe.timer = false;
                    }
                    if (stateIndex === 1) {
                        youTubeIframe.playTracker[targetVideoId] = true;
                        youTubeIframe.videoId = targetVideoId;
                        youTubeIframe.pauseFlag = false;
                    }
                    if (!youTubeIframe.playTracker[youTubeIframe.videoId]) {
                        return false;
                    }
                    if (stateIndex === 2) {
                        if (!youTubeIframe.pauseFlag) {
                            youTubeIframe.pauseFlag = true;
                        } else {
                            return false;
                        }
                    }
                    if (eventsFired[state]) {
                        fireAnalyticsEvent(youTubeIframe.videoId, state);
                    }
                }

                function fireAnalyticsEvent(videoId, state) {
                    var videoUrl = 'https://www.youtube.com/watch?v=' + videoId;
                    var _ga = window.GoogleAnalyticsObject;
                    if (typeof utag !== 'undefined' && !_config.forceSyntax) {
                        utag.link({
                            'link_category': 'Videos',
                            'link_action': state,
                            'link_name': videoUrl
                        });
                    } else if (typeof window[_ga] === 'function' && typeof window[_ga].getAll === 'function' && _config.forceSyntax !== 2) {
                        window[_ga]('send', 'event', 'Videos', state, videoUrl);
                    } else if (typeof window._gaq !== 'undefined' && forceSyntax !== 1) {
                        window._gaq.push(['_trackEvent', 'Videos', state, videoUrl]);
                    }
                }
            })(document, window, {
                'events': {
                    'Play': true,
                    'Pause': true,
                    'Watch to End': true
                },
                'percentageTracking': {
                    'every': 25,
                    'each': [10, 90]
                }
            });
        }, function (a, b) {
            try {
                if ((typeof b['page_name'] != 'undefined' && b['page_name'] == 'cars:px-guide:valuation-found')) {
                    b['custom_metric_part_ex_request'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            if (typeof tealium_px_scrollTracking == "undefined") {
                tealium_px_scrollTracking = 1;;
                (function ($, window, document, undefined) {
                    "use strict";
                    var defaults = {
                            elements: [],
                            minHeight: 0,
                            percentage: true,
                            testing: false
                        },
                        $window = $(window),
                        cache = [];
                    $.scrollDepth = function (options) {
                        var startTime = +new Date;
                        options = $.extend({}, defaults, options);
                        if ($(document).height() < options.minHeight) {
                            return;
                        }

                        function sendEvent(action, label, timing) {
                            if (!options.testing) {
                                if (typeof (utag) !== "undefined") {
                                    utag.link({
                                        'category': 'Scroll Depth',
                                        'action': action,
                                        'label': label,
                                        'value': 1,
                                        'gaEventNonint': true
                                    });
                                }
                            } else {
                                $('#console').html(action + ': ' + label);
                            }
                        }

                        function calculateMarks(docHeight) {
                            return {
                                '25%': parseInt(docHeight * 0.25, 10),
                                '50%': parseInt(docHeight * 0.50, 10),
                                '75%': parseInt(docHeight * 0.75, 10),
                                '100%': docHeight - 1
                            };
                        }

                        function checkMarks(marks, scrollDistance, timing) {
                            $.each(marks, function (key, val) {
                                if ($.inArray(key, cache) === -1 && scrollDistance >= val) {
                                    sendEvent('Percentage', key, timing);
                                    cache.push(key);
                                }
                            });
                        }

                        function checkElements(elements, scrollDistance, timing) {
                            $.each(elements, function (index, elem) {
                                if ($.inArray(elem, cache) === -1 && $(elem).length) {
                                    if (scrollDistance >= $(elem).offset().top) {
                                        sendEvent('Elements', elem, timing);
                                        cache.push(elem);
                                    }
                                }
                            });
                        }

                        function throttle(func, wait) {
                            var context, args, result;
                            var timeout = null;
                            var previous = 0;
                            var later = function () {
                                previous = new Date;
                                timeout = null;
                                result = func.apply(context, args);
                            };
                            return function () {
                                var now = new Date;
                                if (!previous) previous = now;
                                var remaining = wait - (now - previous);
                                context = this;
                                args = arguments;
                                if (remaining <= 0) {
                                    clearTimeout(timeout);
                                    timeout = null;
                                    previous = now;
                                    result = func.apply(context, args);
                                } else if (!timeout) {
                                    timeout = setTimeout(later, remaining);
                                }
                                return result;
                            };
                        }
                        $window.on('scroll.scrollDepth', throttle(function () {
                            var docHeight = $(document).height(),
                                winHeight = window.innerHeight ? window.innerHeight : $window.height(),
                                scrollDistance = $window.scrollTop() + winHeight,
                                marks = calculateMarks(docHeight),
                                timing = +new Date - startTime;
                            if (cache.length >= 4 + options.elements.length) {
                                $window.off('scroll.scrollDepth');
                                return;
                            }
                            if (options.elements) {
                                checkElements(options.elements, scrollDistance, timing);
                            }
                            if (options.percentage) {
                                checkMarks(marks, scrollDistance, timing);
                            }
                        }, 500));
                    };
                })(jQuery, window, document);
                jQuery.scrollDepth();
            }
        }, function (a, b) {
            try {
                if ((b['advert_attributes'].toString().toLowerCase().indexOf('virtual-stock'.toLowerCase()) > -1 && /:ad-view$/i.test(b['page_name']))) {
                    b['custom_metric_vitual_ad_view'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            var new_variable
            var domain = utag.data['dom.domain'];
            var pathname = utag.data['dom.pathname'];
            var dom_array = domain.split('.');
            pathname = pathname.substring(1);
            var path_array = pathname.split('/');
            if (dom_array[0] === 'www') {
                new_variable = path_array[0];
            } else {
                new_variable = dom_array[0];
            }
            if (new_variable === 'secure') {
                if (path_array[1] === 'my-auto-trader') {
                    new_variable += '/' + path_array[1];
                } else {
                    new_variable = new_variable;
                }
            }
            if (new_variable === "") {
                new_variable = 'car';
            }
            utag.data.url_section = new_variable;
        }, function (a, b) {
            try {
                if ((b['page_name'].toString().toLowerCase() == 'cars:search:ad-view:email-sent'.toLowerCase() && /(allocated-stock|network-stock)/.test(b['advert_attributes'])) || b['page_name'].toString().toLowerCase() == 'cars:configurator:confirmation'.toLowerCase()) {
                    b['custom_metric_new_car_lead'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((/:known:results-pg\[1\]$/i.test(b['page_name_granular']) && typeof b['deposit'] != 'undefined' && b['deposit'] != '')) {
                    b['custom_metric_finance_search'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['pola_publish_free'] == '1' && b['page_name'] == 'cars:pola:new:step4a:payment-accepted')) {
                    b['pola_free_to_list_compltion'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((b['label'] == 'the car buyers report' && b['category'].toString().indexOf('standard-link') > -1)) {
                    b['car_buyer_download'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (b['finance_view_selected'].toString().toLowerCase() == 'true'.toLowerCase()) {
                    b['custom_metric_finance_ad_view'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if (1) {
                    re = /[^a-z0-9\:\-\/]/gi;
                    b.page_name = b.page_name ? b.page_name.replace(re, "").toLowerCase() : b.page_name;
                    re = /[^a-z0-9\:\-\/\[\]]/gi;
                    b.page_name_granular = b.page_name_granular ? b.page_name_granular.replace(re, "").toLowerCase() : b.page_name_granular;
                    re = /[^a-z0-9,]/gi;
                    b.make = b.make ? b.make.replace(re, "").toLowerCase() : b.make;
                    b.model = b.model ? b.model.replace(re, "").toLowerCase() : b.model;
                    re = /[^a-z0-9\-\_\ ]/gi;
                    b.label = b.label ? b.label.replace(re, "").toLowerCase() : b.label;
                    re = /[\-\_]/g;
                    b.label = b.label ? b.label.replace(re, " ") : b.label;
                    re = /\ +/g;
                    b.label = b.label ? b.label.replace(re, " ").trim() : b.label;
                }
            } catch (e) {
                utag.DB(e)
            }
        }, function (a, b) {
            try {
                if ((typeof b['page_name'] != 'undefined' && b['page_name'] != '' && b['page_name'].toString().indexOf(':search:ad-view:email-sent') > -1)) {
                    b['custom_metric_dealer_email_web'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((typeof b['label'] != 'undefined' && b['label'].toString().indexOf('email seller') > -1 && typeof b['category'] != 'undefined' && b['category'].toString().indexOf('leads') > -1 && typeof b['tealium_profile'] != 'undefined' && b['tealium_profile'].toString().indexOf('at-android-app') > -1) || (typeof b['label'] != 'undefined' && b['label'].toString().indexOf('email seller') > -1 && typeof b['category'] != 'undefined' && typeof b['tealium_profile'] != 'undefined' && b['tealium_profile'].toString().indexOf('at-ios-app') > -1 && b['category'].toString().indexOf('leads') > -1)) {
                    b['custom_metric_dealer_email_apps'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }, function (a, b) {
            try {
                if ((/:ad-view$/i.test(b['page_name']) && /(allocated-stock|network-stock)/.test(b['advert_attributes']))) {
                    b['custom_metric_new_ad_view'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                u.o = window[window.GoogleAnalyticsObject];
                b.ga_events = b.ga_events || [];
                var c, d, e, f, g, tn, prop;
                if (u.data && u.data.name) {
                    tn = u.data.name;
                }
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "",
                    "a": a,
                    "cookieDomain": "" || utag.loader.lh(),
                    "name": tn || "tracker1,tracker2",
                    "account": "",
                    "anonymizeIp": "false",
                    "allowLinker": "true",
                    "crossDomainTrack": "autotrader.carloan4u.co.uk,vehiclecheck.co.uk,autotradergap.co.uk,carfinancechecker.com,contactatonce.com,i-control.deltapoint.co.uk,autotrade-mail.com,autotrader.custhelp.com,commercialtrader.co.uk,autotraderbestbikeawards.co.uk,dealerwebsite.com,payments.worldpay.com",
                    "enhancedLinkAttribution": "false",
                    "enhancedecommerce": "true",
                    "displayfeatures": "false",
                    "screenView": "false",
                    "optimizely": "false",
                    "init_before_extensions": "false",
                    "autofill_params": "false",
                    "autosend_events": "true" || "true",
                    "enh_action": "",
                    "enh_event_cb": "",
                    "enh_checkout_step": "",
                    "enh_checkout_option": "",
                    "product_action_list": "",
                    "product_variant": [],
                    "enh_impression_id": [],
                    "enh_impression_name": [],
                    "enh_impression_price": [],
                    "enh_impression_category": [],
                    "enh_impression_brand": [],
                    "enh_impression_variant": [],
                    "enh_impression_list": [],
                    "enh_impression_position": [],
                    "enh_promo_id": [],
                    "enh_promo_name": [],
                    "enh_promo_creative": [],
                    "enh_promo_position": [],
                    "id": "",
                    "product_id": [],
                    "product_name": [],
                    "product_brand": [],
                    "product_category": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "product_discount": [],
                    "product_position": [],
                    "ga_events": [],
                    "sessionControl": "",
                    "set": {}
                };
                if (u.data.init_before_extensions === "true") {
                    u.createTracker();
                    u.initTracker();
                }
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            if (e[f].indexOf("a.") === 0) {
                                u.data["a"][e[f].substring(2)] = b[d];
                            } else if (e[f].indexOf("set.") === 0) {
                                u.data.set[e[f].substring(4)] = b[d];
                            } else {
                                u.data[e[f]] = b[d];
                            }
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.enh_action = u.map[d];
                            }
                        }
                    }
                }
                if (u.typeOf(u.data.ga_events) === "array" && u.typeOf(b.ga_events) === "array") {
                    if (u.data.ga_events.length === 0 && b.ga_events.length > 0) {
                        u.data.ga_events = b.ga_events;
                    } else if (u.data.ga_events.length > 0 && b.ga_events.length > 0) {
                        u.data.ga_events = u.data.ga_events.concat(b.ga_events);
                    }
                }
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                u.data.order_shipping = u.data.order_shipping || b._cship || "";
                u.data.order_tax = u.data.order_tax || b._ctax || "";
                u.data.order_store = u.data.order_store || b._cstore || "";
                u.data.order_currency = u.data.order_currency || b._ccurrency || "";
                u.data.order_coupon_code = u.data.order_coupon_code || b._cpromo || "";
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_name.length === 0 && b._cprodname !== undefined) {
                    u.data.product_name = b._cprodname.slice(0);
                }
                if (u.data.product_brand.length === 0 && b._cbrand !== undefined) {
                    u.data.product_brand = b._cbrand.slice(0);
                }
                if (u.data.product_category.length === 0 && b._ccat !== undefined) {
                    u.data.product_category = b._ccat.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (u.data.product_discount.length === 0 && b._cpdisc !== undefined) {
                    u.data.product_discount = b._cpdisc.slice(0);
                }
                if (u.data.init_before_extensions !== "true") {
                    u.createTracker();
                    u.initTracker();
                }
                if (u.data.enhancedecommerce === "true" && !u.require_eh) {
                    u.require_eh = true;
                    u.all("require", "ec");
                }
                u.data.app_id = u.data.app_id || u.data.appId || b.app_id;
                u.data.app_name = u.data.app_name || u.data.appName || b.app_name;
                u.data.app_version = u.data.app_version || u.data.appVersion || b.app_version;
                u.data.app_rdns = u.data.app_rdns || u.data.appInstallerId || b.app_rdns;
                u.data.screen_title = u.data.screen_title || u.data.screenName || b.screen_title;
                if (u.data.app_id || u.data.app_name) {
                    g = {};
                    g.appName = u.data.app_name;
                    g.appId = u.data.app_id || "";
                    g.appVersion = u.data.app_version;
                    g.appInstallerId = u.data.app_rdns;
                    u.all("set", g);
                }
                u.data.exception_reason = u.data.exception_reason || b.exception_reason;
                if (u.data.exception_reason) {
                    g = {};
                    g.exDescription = u.data.exception_reason;
                    g.exFatal = true;
                    u.all("send", "exception", g);
                }
                if (u.data.allowLinker === "true" || u.data.allowLinker === true) {
                    u.all("require", "linker");
                    if (u.data.crossDomainTrack) {
                        if (u.typeOf(u.data.crossDomainTrack) === "string") {
                            u.data.crossDomainTrack = u.data.crossDomainTrack.replace(/\s/g, '').split(',');
                        }
                        u.all("linker:autoLink", u.data.crossDomainTrack);
                    }
                }
                if (u.data.anonymizeIp === "true" || u.data.anonymizeIp === true) {
                    u.all("set", 'anonymizeIp', true);
                }
                if (u.data.uid) {
                    u.all("set", "&uid", u.data.uid);
                }
                if (u.data.page) {
                    u.all("set", "page", u.data.page);
                }
                if (u.data.title) {
                    u.all("set", "title", u.data.title);
                }
                if (u.data.location) {
                    u.all("set", "location", u.data.location);
                }
                if (u.data.campaignId) {
                    u.all("set", "campaignId", u.data.campaignId);
                }
                if (u.data.campaignName) {
                    u.all("set", "campaignName", u.data.campaignName);
                }
                if (u.data.campaignSource) {
                    u.all("set", "campaignSource", u.data.campaignSource);
                }
                if (u.data.campaignMedium) {
                    u.all("set", "campaignMedium", u.data.campaignMedium);
                }
                if (u.data.campaignContent) {
                    u.all("set", "campaignContent", u.data.campaignContent);
                }
                if (u.data.campaignKeyword) {
                    u.all("set", "campaignKeyword", u.data.campaignKeyword);
                }
                if (u.data.displayfeatures === "true" || u.data.displayfeatures === true) {
                    u.all("require", "displayfeatures");
                }
                if (u.data.dataSource) {
                    u.all("set", "dataSource", u.data.dataSource);
                }
                for (prop in utag.loader.GV(u.data.set)) {
                    u.all("set", prop, u.data.set[prop]);
                }
                u.data.transaction_events = {};
                u.data.pageview_events = {};
                u.data.link_events = {};
                u.data.enhecom_events = {};
                for (d in utag.loader.GV(u.data)) {
                    if (d.indexOf("-") > -1 && (d.indexOf("metric") > -1 || d.indexOf("dimension") > -1 || d.indexOf("contentGroup") > -1)) {
                        if (d.indexOf("transaction-") === 0) {
                            u.data.transaction_events[d] = u.data[d];
                        } else if (d.indexOf("pageview-") === 0) {
                            u.data.pageview_events[d] = u.data[d];
                        } else if (d.indexOf("link-") === 0) {
                            u.data.link_events[d] = u.data[d];
                        } else if (u.data.enhancedecommerce === "true" && d.indexOf("enh_") === 0) {
                            u.data.enhecom_events[d] = u.data[d];
                        }
                    } else if (d.indexOf("metric") === 0 || d.indexOf("dimension") === 0 || d.indexOf("contentGroup") === 0) {
                        u.all("set", d, u.data[d]);
                    }
                }
                if (u.data.enhancedLinkAttribution === "true") {
                    u.all("require", "linkid", "linkid.js");
                }
                u.data.order_id = (u.data.order_id ? u.data.order_id : u.data.id);
                if (u.data.enhancedecommerce === "true") {
                    u.all("set", '&cu', (u.data.currency ? u.data.currency : u.data.order_currency));
                    if (u.data.order_id && u.data.enh_action === "refund") {
                        if (u.data.order_id instanceof Array && u.data.order_id.length > 0) {
                            u.data.order_id = u.data.order_id[0];
                        }
                        for (f = 0; f < u.data.product_id.length; f++) {
                            g = {};
                            g.id = u.data.product_id[f];
                            g.quantity = (u.data.product_quantity[f] ? u.data.product_quantity[f] : "1");
                            u.setHitData(g, "enhecom_events", "product_refund", f);
                            u.all('ec:addProduct', g);
                        }
                        g = {};
                        g.id = u.data.order_id;
                        u.setHitData(g, "enhecom_events", "refund");
                        u.all('ec:setAction', 'refund', g);
                    } else if (u.data.order_id) {
                        if (u.data.order_id instanceof Array && u.data.order_id.length > 0) {
                            u.data.order_id = u.data.order_id[0];
                        }
                        u.addproduct("product_purchase", u.data.product_id.length, false);
                        g = {};
                        g.id = u.data.order_id;
                        g.affiliation = (u.data.affiliation ? u.data.affiliation : u.data.order_store);
                        g.revenue = (u.data.revenue ? u.data.revenue : u.data.order_total);
                        g.shipping = (u.data.shipping ? u.data.shipping : u.data.order_shipping);
                        g.tax = (u.data.tax ? u.data.tax : u.data.order_tax);
                        g.coupon = (u.data.coupon ? u.data.coupon : u.data.order_coupon_code);
                        u.setHitData(g, "enhecom_events", "purchase");
                        u.all('ec:setAction', 'purchase', g);
                    } else if (u.data.enh_action === "product_click" && u.data.a === "link") {
                        u.addproduct("product_click", 1, false);
                        u.all('ec:setAction', 'click', {
                            list: u.data.product_action_list
                        });
                        if (u.data.autosend_events === "true") {
                            u.all('send', 'event', 'UX', 'click', 'Results', {
                                'hitCallback': window[u.data.enh_event_cb]
                            });
                        }
                    } else if (u.data.enh_action === "detail") {
                        u.addproduct("detail", u.data.product_id.length, false);
                        g = {};
                        u.setHitData(g, "list", u.data.product_action_list);
                        u.all("ec:setAction", "detail");
                    } else if (u.data.enh_action === "add") {
                        u.addproduct("product_add", u.data.product_id.length, false);
                        u.all('ec:setAction', 'add', {
                            list: u.data.product_action_list
                        });
                        if (u.data.a === "link" && u.data.autosend_events === "true") {
                            u.all('send', 'event', 'UX', 'click', 'add to cart');
                        }
                    } else if (u.data.enh_action === "remove") {
                        u.addproduct("product_remove", u.data.product_id.length, false);
                        u.all('ec:setAction', 'remove');
                        if (u.data.a === "link" && u.data.autosend_events === "true") {
                            u.all('send', 'event', 'UX', 'click', 'remove from cart');
                        }
                    } else if (u.data.enh_action === "checkout") {
                        u.addproduct("product_checkout", u.data.product_id.length, false);
                        g = {};
                        g.step = u.data.enh_checkout_step || "1";
                        g.option = u.data.enh_checkout_option;
                        u.all('ec:setAction', u.data.enh_action, g);
                    }
                    if (u.data.enh_action === "checkout_option" && u.data.a === "link") {
                        g = {};
                        g.step = u.data.enh_checkout_step || "1";
                        g.option = u.data.enh_checkout_option;
                        u.all('ec:setAction', u.data.enh_action, g);
                        if (u.data.autosend_events === "true") {
                            u.all('send', 'event', 'Checkout', 'Option', {
                                'hitCallback': window[u.data.enh_event_cb]
                            });
                        }
                    }
                    if (u.data.enh_impression_id) {
                        u.addproduct("product_impression", u.data.enh_impression_id.length, true);
                    }
                    if (u.data.enh_promo_id) {
                        u.addpromo(u.data.enh_action, u.data.a);
                    }
                    g = {};
                    if (u.data.order_id) {
                        u.setHitData(g, "transaction_events");
                    }
                    u.setHitData(g, "pageview_events");
                    if (u.data.sessionControl === "start" || u.data.sessionControl === "end") {
                        g.sessionControl = u.data.sessionControl;
                    }
                    if (u.data.a === "view") {
                        if (u.data.screenView === "true" || u.data.screenView === true) {
                            g.screenName = u.data.screen_title || "";
                            u.all("send", "screenview", g);
                        } else {
                            g.hitType = "pageview";
                            u.all("send", g);
                        }
                    }
                } else if (u.data.a === "view") {
                    g = {};
                    u.setHitData(g, "pageview_events");
                    if (u.data.sessionControl === "start" || u.data.sessionControl === "end") {
                        g.sessionControl = u.data.sessionControl;
                    }
                    if (u.data.screenView === "true" || u.data.screenView === true) {
                        g.screenName = u.data.screen_title || "";
                        u.all("send", "screenview", g);
                    } else {
                        g.hitType = "pageview";
                        u.all("send", g);
                    }
                    if (u.data.order_id && !(u.data.order_id instanceof Array)) {
                        u.all("require", "ecommerce", "ecommerce.js");
                        g = {};
                        u.setHitData(g, "transaction_events");
                        g.id = u.data.order_id;
                        g.affiliation = (u.data.affiliation ? u.data.affiliation : u.data.order_store);
                        g.revenue = (u.data.revenue ? u.data.revenue : u.data.order_total);
                        g.shipping = (u.data.shipping ? u.data.shipping : u.data.order_shipping);
                        g.tax = (u.data.tax ? u.data.tax : u.data.order_tax);
                        g.currency = (u.data.currency ? u.data.currency : u.data.order_currency);
                        u.all('ecommerce:addTransaction', g);
                        for (f = 0; f < u.data.product_id.length; f++) {
                            g = {};
                            g.id = u.data.order_id;
                            g.sku = u.data.product_id[f];
                            g.name = (u.data.product_name[f] ? u.data.product_name[f] : u.data.product_id[f]);
                            g.category = (u.data.product_category[f] ? u.data.product_category[f] : "");
                            g.price = (u.data.product_unit_price[f] ? u.data.product_unit_price[f] : "1.00");
                            g.quantity = (u.data.product_quantity[f] ? u.data.product_quantity[f] : "1");
                            u.setHitData(g, "transaction_events");
                            u.all('ecommerce:addItem', g);
                        }
                        u.all('ecommerce:send');
                    } else if (u.data.order_id instanceof Array && u.data.order_id.length > 0) {
                        u.all("require", "ecommerce", "ecommerce.js");
                        var lastindex = 0;
                        for (f = 0; f < u.data.order_id.length; f++) {
                            if (f === u.data.order_id.length - 1 || (u.data.order_id[f] !== u.data.order_id[f + 1])) {
                                g = {};
                                u.setHitData(g, "transaction_events");
                                g.id = u.data.order_id[f];
                                g.affiliation = (u.data.affiliation && typeof u.data.affiliation[f] !== "undefined" ? u.data.affiliation[f] : u.data.order_store);
                                g.revenue = (u.data.revenue && typeof u.data.revenue[f] !== "undefined" ? u.data.revenue[f] : u.data.order_total);
                                g.shipping = (u.data.shipping && typeof u.data.shipping[f] !== "undefined" ? u.data.shipping[f] : u.data.order_shipping);
                                g.tax = (u.data.tax && typeof u.data.tax[f] !== "undefined" ? u.data.tax[f] : u.data.order_tax);
                                g.currency = (u.data.currency ? u.data.currency : u.data.order_currency);
                                u.all('ecommerce:addTransaction', g);
                                for (e = lastindex; e < f + 1; e++) {
                                    g = {};
                                    g.id = u.data.order_id[f];
                                    g.sku = u.data.product_id[e];
                                    g.name = (u.data.product_name[e] ? u.data.product_name[e] : u.data.product_id[e]);
                                    g.category = (u.data.product_category[e] ? u.data.product_category[e] : "");
                                    g.price = (u.data.product_unit_price[e] ? u.data.product_unit_price[e] : "1.00");
                                    g.quantity = (u.data.product_quantity[e] ? u.data.product_quantity[e] : "1");
                                    u.setHitData(g, "transaction_events");
                                    u.all('ecommerce:addItem', g);
                                }
                                lastindex = f + 1;
                            }
                        }
                        u.all('ecommerce:send');
                    }
                }
                if (u.data.eventCategory && u.data.eventAction) {
                    g = {};
                    u.setHitData(g, "link_events");
                    g.hitType = "event";
                    g.eventCategory = u.data.eventCategory;
                    if (u.data.nonInteraction) {
                        g.nonInteraction = 1;
                    }
                    g.eventAction = u.data.eventAction;
                    if (u.data.eventLabel) {
                        g.eventLabel = u.data.eventLabel;
                    }
                    if (typeof u.data.eventValue !== "undefined" && u.data.eventValue !== "") {
                        g.eventValue = u.data.eventValue;
                    }
                    if (u.data.screenView === "true" || u.data.screenView === true) {
                        g.screenName = u.data.screen_title || "";
                    }
                    if (u.data.sessionControl === "start" || u.data.sessionControl === "end") {
                        g.sessionControl = u.data.sessionControl;
                    }
                    u.all("send", g);
                    u.data.eventCategory = u.data.eventAction = u.data.eventLabel = u.data.eventValue = "";
                }
                for (e = 0; e < u.data.ga_events.length; e++) {
                    g = {};
                    u.setHitData(g, "link_events");
                    g.hitType = "event";
                    g.eventCategory = u.data.ga_events[e].eventCategory;
                    g.eventAction = u.data.ga_events[e].eventAction;
                    g.eventLabel = u.data.ga_events[e].eventLabel;
                    g.eventValue = u.data.ga_events[e].eventValue;
                    if (u.data.ga_events[e].nonInteraction) {
                        g.nonInteraction = 1;
                    }
                    if (u.data.sessionControl === "start" || u.data.sessionControl === "end") {
                        g.sessionControl = u.data.sessionControl;
                    }
                    u.all("send", g);
                }
                if (u.data.socialNetwork && u.data.socialAction && u.data.socialTarget) {
                    g = {};
                    g.hitType = "social";
                    g.socialNetwork = u.data.socialNetwork;
                    g.socialAction = u.data.socialAction;
                    g.socialTarget = u.data.socialTarget;
                    u.all("send", g);
                    u.data.socialNetwork = u.data.socialAction = u.data.socialTarget = "";
                }
                if (u.data.timingCategory && u.data.timingVar && u.data.timingValue) {
                    g = {};
                    g.hitType = "timing";
                    g.timingCategory = u.data.timingCategory;
                    g.timingVar = u.data.timingVar;
                    g.timingValue = u.data.timingValue;
                    g.timingLabel = u.data.timingLabel || "";
                    u.all("send", g);
                }
                if (u.data["ga-disable"]) {
                    window["ga-disable-" + u.data["ga-disable"]] = true;
                }
                (function () {
                    var id = 'tealium-tag-7110';
                    if (document.getElementById(id)) {
                        return;
                    }
                    u.loader({
                        "type": "script",
                        "src": '//www.google-analytics.com/analytics.js',
                        "loc": "script",
                        "id": id
                    });
                    u.o.l = 1 * new Date();
                })();
            }
        };
        utag.o[loader].loader.LOAD(id);
    }('42', 'autotrader.at-desktop'));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.162 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _hjSettings = _hjSettings || {};
var hj = hj || function () {
    (hj.q = hj.q || []).push(arguments)
};
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.map = {};
        u.extend = [];
        u.loader_cb = function (a, b) {
            utag.DB("send:162:CALLBACK");
            if (u.initialized === true) {
                hj("vpv", b["dom.pathname"]);
            }
            u.initialized = true;
            utag.DB("send:162:CALLBACK:COMPLETE");
        };
        u.callBack = function () {
            var data = {};
            while (data = u.queue.shift()) {
                u.data = data.data;
                u.loader_cb(data.a, data.b);
            }
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "hjid": "108781",
                    "hjsv": "5",
                    "base_url": "//static.hotjar.com/c/hotjar-##utag_hjid##.js?sv=##utag_hjsv##"
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                _hjSettings.hjid = u.data.hjid;
                _hjSettings.hjsv = u.data.hjsv;
                u.data.base_url = u.data.base_url.replace('##utag_hjid##', u.data.hjid);
                u.data.base_url = u.data.base_url.replace('##utag_hjsv##', u.data.hjsv);
                if (u.initialized) {
                    u.loader_cb(a, b);
                } else {
                    u.queue.push({
                        "data": u.data,
                        "a": a,
                        "b": b
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_162",
                            "attrs": {}
                        });
                    }
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("162", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.163 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _hjSettings = _hjSettings || {};
var hj = hj || function () {
    (hj.q = hj.q || []).push(arguments)
};
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.map = {};
        u.extend = [];
        u.loader_cb = function (a, b) {
            utag.DB("send:163:CALLBACK");
            if (u.initialized === true) {
                hj("vpv", b["dom.pathname"]);
            }
            u.initialized = true;
            utag.DB("send:163:CALLBACK:COMPLETE");
        };
        u.callBack = function () {
            var data = {};
            while (data = u.queue.shift()) {
                u.data = data.data;
                u.loader_cb(data.a, data.b);
            }
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "hjid": "108783",
                    "hjsv": "5",
                    "base_url": "//static.hotjar.com/c/hotjar-##utag_hjid##.js?sv=##utag_hjsv##"
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                _hjSettings.hjid = u.data.hjid;
                _hjSettings.hjsv = u.data.hjsv;
                u.data.base_url = u.data.base_url.replace('##utag_hjid##', u.data.hjid);
                u.data.base_url = u.data.base_url.replace('##utag_hjsv##', u.data.hjsv);
                if (u.initialized) {
                    u.loader_cb(a, b);
                } else {
                    u.queue.push({
                        "data": u.data,
                        "a": a,
                        "b": b
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_163",
                            "attrs": {}
                        });
                    }
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("163", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.141 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _hjSettings = _hjSettings || {};
var hj = hj || function () {
    (hj.q = hj.q || []).push(arguments)
};
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.map = {};
        u.extend = [];
        u.loader_cb = function (a, b) {
            utag.DB("send:141:CALLBACK");
            if (u.initialized === true) {
                hj("vpv", b["dom.pathname"]);
            }
            u.initialized = true;
            utag.DB("send:141:CALLBACK:COMPLETE");
        };
        u.callBack = function () {
            var data = {};
            while (data = u.queue.shift()) {
                u.data = data.data;
                u.loader_cb(data.a, data.b);
            }
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "hjid": "108784",
                    "hjsv": "5",
                    "base_url": "//static.hotjar.com/c/hotjar-##utag_hjid##.js?sv=##utag_hjsv##"
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                _hjSettings.hjid = u.data.hjid;
                _hjSettings.hjsv = u.data.hjsv;
                u.data.base_url = u.data.base_url.replace('##utag_hjid##', u.data.hjid);
                u.data.base_url = u.data.base_url.replace('##utag_hjsv##', u.data.hjsv);
                if (u.initialized) {
                    u.loader_cb(a, b);
                } else {
                    u.queue.push({
                        "data": u.data,
                        "a": a,
                        "b": b
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_141",
                            "attrs": {}
                        });
                    }
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("141", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.290 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var uetq = uetq || [];
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.initialized = false;
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f, g;
                u.data = {
                    "base_url": "//bat.bing.com/bat.js",
                    "tagid": "5295093",
                    "ec": "",
                    "ea": "",
                    "el": "",
                    "ev": "",
                    "gv": "",
                    "order_subtotal": ""
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                u.data.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
                u.loader_cb = function () {
                    if (!u.initialized) {
                        var o = {
                            ti: u.data.tagid
                        };
                        o.q = uetq;
                        uetq = new UET(o);
                        uetq.push("pageLoad");
                    }
                    u.initialized = true;
                    g = {};
                    if (u.data.ec) {
                        g.ec = u.data.ec;
                    }
                    if (u.data.ea) {
                        g.ea = u.data.ea;
                    }
                    if (u.data.el) {
                        g.el = u.data.el;
                    }
                    if (u.data.ev) {
                        g.ev = u.data.ev;
                    }
                    u.data.gv = u.data.gv || u.data.order_subtotal;
                    if (u.data.gv) {
                        var gv = parseFloat(u.data.gv, 10);
                        if (isNaN(gv) === false) {
                            g.gv = gv;
                        }
                    }
                    if (g.ec || g.ea || g.el || g.ev || g.gv) {
                        uetq.push(g);
                    }
                };
                if (!u.initialized) {
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": u.loader_cb,
                        "loc": "script",
                        "id": "utag_290"
                    });
                } else {
                    u.loader_cb();
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("290", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.294 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        if (utag.ut.merge === undefined) {
            u.merge = function (a, b, c, d) {
                if (c) {
                    for (d in utag.loader.GV(b)) {
                        a[d] = b[d];
                    }
                } else {
                    for (d in utag.loader.GV(b)) {
                        if (typeof a[d] == "undefined") {
                            a[d] = b[d];
                        }
                    }
                }
            };
        } else {
            u.merge = utag.ut.merge;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.event_lookup = {
            "ViewContent": {
                obj: "vc",
                "map": ["value", "currency", "content_name", "content_ids", "content_category"]
            },
            "Search": {
                obj: "search",
                "map": ["value", "currency", "content_category", "content_ids"]
            },
            "AddToCart": {
                obj: "cart",
                "map": ["value", "currency", "content_name", "content_ids"]
            },
            "AddToWishlist": {
                obj: "wish",
                "map": ["value", "currency", "content_name", "content_ids"]
            },
            "InitiateCheckout": {
                obj: "cout",
                "map": ["value", "currency", "content_name", "content_ids", "num_items"]
            },
            "AddPaymentInfo": {
                obj: "payment",
                "map": ["value", "currency", "content_category", "content_ids"]
            },
            "Purchase": {
                obj: "purch",
                "map": ["value", "currency", "content_name", "content_ids", "num_items"]
            },
            "Lead": {
                obj: "lead",
                "map": ["value", "currency", "content_name", "content_category"]
            },
            "CompleteRegistration": {
                obj: "reg",
                "map": ["value", "currency", "content_name"]
            },
            "Conversion": {
                obj: "cnv",
                "map": ["value", "currency"]
            },
            "Custom": {
                obj: "cust",
                "map": []
            },
            "PageView": {
                obj: "page",
                "map": []
            }
        };
        u.std_params = {
            "value": function (g, event) {
                if (g.value === undefined || g.value === "") {
                    if (event === "ViewContent" || event === "AddToCart") {
                        g.value = u.data.ecom.product_unit_price;
                    } else {
                        g.value = u.data.ecom.order_subtotal;
                    }
                }
                g.value = u.val(g.value);
            },
            "currency": function (g) {
                if (!g.currency) {
                    g.currency = u.data.ecom.order_currency;
                }
            },
            "content_name": function (g) {
                if (!g.content_name) {
                    g.content_name = u.data.ecom.product_name;
                }
                g.content_name = u.val(g.content_name);
            },
            "content_ids": function (g) {
                if (!g.content_ids) {
                    g.content_ids = u.data.ecom.product_id;
                }
                if (u.typeOf(g.content_ids) !== "array") {
                    g.content_ids = g.content_ids.split(/\s*,\s*/);
                }
            },
            "content_category": function (g) {
                if (!g.content_category) {
                    g.content_category = u.data.ecom.product_category;
                }
                g.content_category = u.val(g.content_category);
            },
            "num_items": function (g) {
                if (!g.num_items && u.data.calc_items === "true") {
                    g.num_items = u.calc_items(u.data.ecom.product_quantity);
                }
            }
        };
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.val = function (value) {
            return u.typeOf(value) === "array" ? value[0] : value;
        };
        u.remove_empty = function (a) {
            var b, t;
            for (b in utag.loader.GV(a)) {
                t = u.typeOf(a[b]);
                if (t === "object") {
                    u.remove_empty(a[b]);
                    if (u.isEmptyObject(a[b])) {
                        try {
                            delete a[b];
                        } catch (e) {
                            a[b] = undefined;
                        }
                    }
                } else if (!((a[b] === 0 || a[b] === false) ? !0 : (t === "array" && a[b].length === 0) ? !1 : !!a[b])) {
                    try {
                        delete a[b];
                    } catch (e) {
                        a[b] = undefined;
                    }
                }
            }
            return a;
        };
        u.calc_items = function (quan) {
            var q, i = 0;
            for (q = 0; q < quan.length; q++) {
                i += parseInt(quan[q]);
            }
            return i;
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.process_AM_data = function (_data) {
            var am_data = {},
                item, val;
            for (item in utag.loader.GV(_data)) {
                val = _data[item];
                val = val.replace(/\s/g, "").toLowerCase();
                if (item === "ph") {
                    val = val.replace(/[^\d]/g, "");
                } else if (item === "ge") {
                    if (val !== "m" && val !== "f") {
                        utag.DB("[" + u.id + "] ge in wrong format. Removed from init call");
                        continue;
                    }
                } else if (item === "db") {
                    if (val.length !== 8) {
                        utag.DB("[" + u.id + "] db is not the correct length. Please check format. Removed from init call");
                        continue;
                    }
                } else if (item === "zp") {
                    val = val.replace(/[^\d]/g, "");
                    if (val.length > 5) {
                        utag.DB("[" + u.id + "] zp is too long. Removed from init call");
                        continue;
                    }
                }
                am_data[item] = val;
            }
            return u.isEmptyObject(am_data) ? undefined : am_data;
        };
        u.map = {
            "fb_event_trigger:vans_search_ad-view": "AdView",
            "fb_event_trigger:bikes_search_ad-view": "AdView",
            "fb_event_trigger:motorhomes_search_ad-view": "AdView",
            "fb_event_trigger:cars_new-cars_selector_confirmation": "NewCarLead,Purchase",
            "fb_event_trigger:cars_search_ad-view_confirmation": "NewCarLead,Lead",
            "fb_event_trigger:cars_motoring-products_valuations_your valuation_buying": "CarValuation",
            "fb_event_trigger:cars_motoring-products_valuations_your valuation_selling": "CarValuation",
            "fb_event_trigger:cars_pola_new_step4a_payment-accepted": "CarsPola",
            "fb_event_trigger:cars_pola_rebook_step4a_payment-accepted": "CarsPola",
            "fb_event_trigger:cars_px-guide_valuation-found": "CarPartExLead,CarsPartExValuationFound",
            "fb_event_trigger:vans_pola_new_step4a_payment-accepted": "NonCarPola",
            "fb_event_trigger:bikes_pola_new_step4a_payment-accepted": "NonCarPola",
            "fb_event_trigger:vans_pola_rebook_step4a_payment-accepted": "NonCarPola",
            "fb_event_trigger:bikes_pola_rebook_step4a_payment-accepted": "NonCarPola",
            "fb_event_trigger:bikes_pola_homepage": "NonCarPolaLanding",
            "fb_event_trigger:vans_pola_homepage": "NonCarPolaLanding",
            "fb_event_trigger:cars_motoring-products_valuations_homepage": "ValuationsHomepage",
            "fb_event_trigger:cars_motoring-products_valuations_vehicle-reg": "ValuationsInputContent",
            "fb_event_trigger:cars_motoring-products_valuations_vehicle-details": "ValuationsViewContent",
            "fb_event_trigger:cars_part-exchange_homepage": "CarsPartExHomepage",
            "fb_event_trigger:cars_px-guide_enter-reg-mileage": "CarsPartExEnterReg",
            "fb_event_trigger:cars_px-guide_vehicle-found": "CarsPartExVehicleFound",
            "fb_event_trigger:cars_px-guide_enter-personal-details": "CarsPartExEnterPersonalDetails",
            "fb_event_trigger:cars_pola_homepage": "CarsPolaHomepage",
            "fb_event_trigger:cars_new-cars_selector_enter-details": "AddToCart",
            "fb_event_trigger:plant_search_ad-view": "AdView",
            "fb_event_trigger:farm_search_ad-view": "AdView",
            "fb_event_trigger:trucks_search_ad-view": "AdView",
            "fb_event_trigger:cars_campaign-hub_goals": "ATGoals",
            "fb_event_trigger:cars_search_known_results": "Search",
            "fb_event_trigger:vans_search_known_results": "Search",
            "fb_event_trigger:bikes_search_known_results": "Search",
            "fb_event_trigger:motorhomes_search_known_results": "Search",
            "fb_event_trigger:plant_search_known_results": "Search",
            "fb_event_trigger:farm_search_known_results": "Search",
            "fb_event_trigger:trucks_search_known_results": "Search",
            "fb_event_trigger:caravans_search_known_results": "Search",
            "fb_event_trigger:cars_search_ad-view": "ViewContent",
            "fb_event_trigger:cars_search_ad-view_enter-details": "AddToWishlist",
            "fb_event_trigger:cars_search_ad-view_email-form": "AddToWishlist",
            "fb_event_trigger:cars_search_ad-view_email-sent": "Lead",
            "fb_event_trigger:cars_search_seo_landingpage": "ViewContent",
            "pola_publish_free:1": "PolaFreeToList",
            "content_ids": "vc.content_ids,cart.content_ids,lead.content_ids,wish.content_ids",
            "content_type": "vc.content_type,cart.content_type,wish.content_type,lead.content_type,search.content_type",
            "monthly_finance_search_fb_trigger:1": "MonthlyFinanceSearch",
            "make": "vc.make,wish.make,lead.make,search.make",
            "model": "wish.model,lead.model,vc.model,search.model",
            "body_type": "vc.body_type,wish.body_type,lead.body_type",
            "fuel_type": "vc.fuel_type,wish.fuel_type,lead.fuel_type",
            "currency": "vc.currency,wish.currency,lead.currency,search.currency",
            "vehicle_price": "vc.price,wish.price,lead.price,search.price",
            "vehicle_year": "vc.year,wish.year,lead.year",
            "gearbox": "vc.transmission,wish.transmission,lead.transmission"
        };
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f, g, h, evt = [];
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://connect.facebook.net/en_US/fbevents.js",
                    "cust_pixel": "1660551100622382",
                    "conv_pixel": "",
                    "page_view": "true",
                    "calc_items": "false",
                    "default_event": "None",
                    "adv_match": "false",
                    "custom_data": {},
                    "custom_event": "",
                    "product_id": [],
                    "product_name": [],
                    "product_category": [],
                    "product_unit_price": [],
                    "product_quantity": [],
                    "evt_list": [],
                    "ecom": {}
                };
                c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                evt = evt.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                if (u.data.evt_list && u.typeOf(u.data.evt_list) !== "array") {
                    u.data.evt_list = u.data.evt_list.split(/\s*,\s*/);
                }
                if (u.data.default_event !== "None" && u.data.default_event !== "") {
                    u.data.evt_list.push(u.data.default_event);
                }
                u.data.evt_list = u.data.evt_list.concat(evt);
                g = u.data.ecom;
                g.order_id = u.data.order_id || b._corder || "";
                g.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
                g.order_currency = u.data.order_currency || b._ccurrency || "";
                if (u.data.product_name.length === 0 && b._cprodname !== undefined) {
                    g.product_name = b._cprodname.slice(0);
                } else {
                    g.product_name = u.data.product_name;
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    g.product_id = b._cprod.slice(0);
                } else {
                    g.product_id = u.data.product_id;
                }
                if (u.data.product_category.length === 0 && b._ccat !== undefined) {
                    g.product_category = b._ccat.slice(0);
                } else {
                    g.product_category = u.data.product_category;
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    g.product_unit_price = b._cprice.slice(0);
                } else {
                    g.product_unit_price = u.data.product_unit_price;
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    g.product_quantity = b._cquan.slice(0);
                } else {
                    g.product_quantity = u.data.product_quantity;
                }
                u.loader_cb = function () {
                    var g = {},
                        i, j, _event, _track = "track",
                        p;
                    if (u.data.evt_list.toString().indexOf("Purchase") === -1 && u.data.ecom.order_id) {
                        u.data.evt_list.push("Purchase");
                    }
                    if (u.data.ecom.order_id) {
                        for (i = 0; i < u.data.evt_list.length; i++) {
                            if (u.data.evt_list[i] === "Purchase") {
                                p = true;
                            }
                        }
                        if (!p) {
                            u.data.evt_list.push("Purchase");
                        }
                    }
                    for (i = 0; i < u.data.evt_list.length; i++) {
                        _event = u.data.evt_list[i];
                        f = u.event_lookup[_event];
                        c = f ? f.map : [];
                        f = f ? f.obj : _event;
                        g = u.data[f] = u.data[f] || {};
                        for (j = 0; j < c.length; j++) {
                            u.std_params[c[j]](g, _event);
                        }
                        if (_event === "ViewContent" || _event === "AddToCart") {} else if (_event === "Lead") {
                            if (!g.content_category) {
                                g.content_category = 'Quote';
                            }
                        } else if (_event === "Search") {
                            if (!g.content_category) {
                                g.content_category = 'Product Search';
                            }
                        } else if (_event === "Conversion" && u.data.conv_pixel) {
                            _event = u.data.conv_pixel;
                        } else if (_event && !u.event_lookup[_event]) {
                            _track = "trackCustom";
                            g = u.data[_event];
                        }
                        if (g.value !== undefined) {
                            if (u.typeOf(g.value) === "array") {
                                for (j = 0; j < g.value.length; j++) {
                                    g.value[j] = parseFloat(g.value[j]) || 0.00;
                                }
                            } else {
                                g.value = parseFloat(g.value) || 0.00;
                            }
                        }
                        if (_event) {
                            fbq(_track, _event, u.remove_empty(g));
                        }
                    }
                };
                u.callBack = function () {
                    var data = {};
                    u.initialized = true;
                    while (data = u.queue.shift()) {
                        u.data = data.data;
                        u.loader_cb();
                    }
                };
                if (u.initialized) {
                    u.loader_cb();
                } else {
                    u.queue.push({
                        "data": u.data
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader_config = {
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_294"
                        };
                        ! function (f, b, self, config, e) {
                            if (f.fbq) return;
                            self.loader(config);
                            e = f.fbq = function () {
                                e.callMethod ? e.callMethod.apply(e, arguments) : e.queue.push(arguments);
                            };
                            if (!f._fbq) f._fbq = e;
                            e.push = e;
                            e.loaded = !0;
                            e.version = '2.0';
                            e.queue = [];
                            e.agent = 'tmtealium';
                        }(window, document, this, u.loader_config);
                        if (u.data.cust_pixel) {
                            u.data.cust_pixel = u.data.cust_pixel.split(/\s*,\s*/);
                            for (var i = 0; i < u.data.cust_pixel.length; i++) {
                                u.data.cust_pixel[i] = u.data.cust_pixel[i].replace(/^\s*/, "").replace(/\s*$/, "");
                                var amObj;
                                if (u.data.adv_match === true || u.data.adv_match === "true") {
                                    amObj = u.process_AM_data(u.remove_empty(u.data.am));
                                }
                                fbq('init', u.data.cust_pixel[i], amObj);
                            }
                            if (u.data.page_view === "true") {
                                fbq('track', 'PageView', u.data.page);
                            }
                        }
                    }
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("294", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.305 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.event_lookup = {
            "PageView": "PageView",
            "ViewContent": "ViewContent",
            "Search": "Search",
            "AddToCart": "AddToCart",
            "AddToWishlist": "AddToWishlist",
            "InitiateCheckout": "InitiateCheckout",
            "AddPaymentInfo": "AddPaymentInfo",
            "Purchase": "Purchase",
            "Signup": "Signup",
            "CompleteRegistration": "CompleteRegistration",
            "Download": "Download"
        };
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.clearEmptyKeys = function (object) {
            for (var key in object) {
                if (object[key] === "" || object[key] === undefined) {
                    delete object[key];
                }
            }
            return object;
        };
        u.map = {
            "twitter_event_name:vans_search_ad-view": "NonCarVansAdView",
            "twitter_event_name:bikes_search_ad-view": "NonCarBikesAdView",
            "twitter_event_name:motorhomes_search_ad-view": "NonCarMotorhomesAdView",
            "twitter_event_name:cars_new-cars_selector_confirmation": "NewCarLead",
            "twitter_event_name:cars_search_ad-view_confirmation": "NewCarLead",
            "twitter_event_name:cars_motoring-products_valuations_your valuation_buying": "CarValuation",
            "twitter_event_name:cars_motoring-products_valuations_your valuation_selling": "CarValuation",
            "twitter_event_name:cars_search_ad-view": "CarAdView",
            "twitter_event_name:cars_pola_new_step4a_payment-accepted": "CarsPola",
            "twitter_event_name:cars_pola_rebook_step4a_payment-accepted": "CarsPola",
            "twitter_event_name:cars_px-guide_valuation-found": "CarPartExLead,CarsPartExValuationFound",
            "twitter_event_name:vans_pola_new_step4a_payment-accepted": "NonCarPola",
            "twitter_event_name:bikes_pola_new_step4a_payment-accepted": "NonCarPola",
            "twitter_event_name:vans_pola_rebook_step4a_payment-accepted": "NonCarPola",
            "twitter_event_name:bikes_pola_rebook_step4a_payment-accepted": "NonCarPola",
            "twitter_event_name:motorhomes_pola_new_step4a_payment-accepted": "NonCarPola",
            "twitter_event_name:caravans_pola_new_step4a_payment-accepted": "NonCarPola",
            "twitter_event_name:motorhomes_pola_rebook_step4a_payment-accepted": "NonCarPola",
            "twitter_event_name:caravans_pola_rebook_step4a_payment-accepted": "NonCarPola",
            "twitter_event_name:bikes_pola_homepage": "NonCarPolaLanding",
            "twitter_event_name:vans_pola_homepage": "NonCarPolaLanding",
            "twitter_event_name:motorhomes_pola_homepage": "NonCarPolaLanding",
            "twitter_event_name:caravans_pola_homepage": "NonCarPola",
            "twitter_event_name:cars_motoring-products_valuations_homepage": "ValuationsHomepage",
            "twitter_event_name:cars_motoring-products_valuations_vehicle-reg": "ValuationsInputContent",
            "twitter_event_name:cars_motoring-products_valuations_vehicle-details": "ValuationsViewContent",
            "twitter_event_name:cars_part-exchange_homepage": "CarsPartExHomepage",
            "twitter_event_name:cars_px-guide_enter-reg-mileage": "CarsPartExEnterReg",
            "twitter_event_name:cars_px-guide_vehicle-found": "CarsPartExVehicleFound",
            "twitter_event_name:cars_px-guide_enter-personal-details": "CarsPartExEnterPersonalDetails",
            "twitter_event_name:cars_pola_homepage": "CarsPolaHomepage",
            "twitter_event_name:cars_make-model": "ViewContent",
            "twitter_event_name:caravans_search_ad-view": "NonCarCaravansAdView",
            "twitter_content_type": "content_type",
            "content_ids": "content_ids",
            "pola_publish_free:1": "PolaFreeToList",
            "twitter_event_status": "event_status",
            "twitter_event_value": "event_value",
            "twitter_num_items": "num_items"
        };
        u.extend = [];
        u.loader_cb = function (a, b, c) {
            utag.DB("send:305:CALLBACK");
            var event_params, i, q;
            event_params = {};
            if (!u.initialized) {
                u.initialized = true;
                twq("init", u.data.twitter_pixel_id);
                if (u.data.event_name === "") {
                    u.data.event_name = "PageView";
                }
            }
            if (u.data.event_name === "PageView") {
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
                if (u.data.num_items) {
                    event_params.num_items = u.data.num_items;
                }
            }
            if (u.data.event_name === "ViewContent") {
                if (u.data.content_type === "" || u.data.product_id.length === 0) {
                    utag.DB(u.id + ": ViewContent event not fired: Required attribute not populated");
                    return;
                }
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
                if (u.data.product_name.length > 0) {
                    event_params.content_name = u.data.product_name.join(",");
                }
                if (u.data.product_category.length > 0) {
                    event_params.content_category = u.data.product_category.join(",");
                }
                event_params.content_type = u.data.content_type;
                event_params.content_ids = u.data.product_id;
            }
            if (u.data.event_name === "Search") {
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
            }
            if (u.data.event_name === "AddToCart") {
                if (u.data.content_type === "" || u.data.product_id.length === 0) {
                    utag.DB(u.id + ": AddToCart event not fired: Required attribute not populated");
                    return;
                }
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
                if (u.data.product_name.length > 0) {
                    event_params.content_name = u.data.product_name.join(",");
                }
                event_params.content_type = u.data.content_type;
                event_params.content_ids = u.data.product_id;
            }
            if (u.data.event_name === "AddToWishlist") {
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
                if (u.data.product_name.length > 0) {
                    event_params.content_name = u.data.product_name.join(",");
                }
                if (u.data.product_category.length > 0) {
                    event_params.content_category = u.data.product_category.join(",");
                }
                if (u.data.product_id.length > 0) {
                    event_params.content_ids = u.data.product_id;
                }
            }
            if (u.data.event_name === "InitiateCheckout") {
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
                if (u.data.product_name.length > 0) {
                    event_params.content_name = u.data.product_name.join(",");
                }
                if (u.data.product_category.length > 0) {
                    event_params.content_category = u.data.product_category.join(",");
                }
                if (u.data.product_id.length > 0) {
                    event_params.content_ids = u.data.product_id;
                }
                if (u.data.num_items) {
                    event_params.num_items = u.data.num_items;
                } else if (u.data.product_quantity.length > 0) {
                    q = 0;
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        q += parseInt(u.data.product_quantity[i]);
                    }
                    event_params.num_items = q + "";
                }
            }
            if (u.data.event_name === "AddPaymentInfo") {
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
                if (u.data.product_category.length > 0) {
                    event_params.content_category = u.data.product_category.join(",");
                }
                if (u.data.product_id.length > 0) {
                    event_params.content_ids = u.data.product_id;
                }
            }
            if (u.data.event_name === "Purchase") {
                if ((u.data.event_value === "" && u.data.order_total === "") || u.data.order_currency === "" || u.data.content_type === "" || u.data.product_id.length === 0) {
                    utag.DB(u.id + ": Purchase event not fired: Required attribute not populated");
                    return;
                }
                event_params.value = u.data.event_value || u.data.order_total;
                event_params.currency = u.data.order_currency;
                if (u.data.product_name.length > 0) {
                    event_params.content_name = u.data.product_name.join(",");
                }
                event_params.content_type = u.data.content_type;
                event_params.content_ids = u.data.product_id;
                if (u.data.num_items) {
                    event_params.num_items = u.data.num_items;
                } else if (u.data.product_quantity.length > 0) {
                    q = 0;
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        q += parseInt(u.data.product_quantity[i]);
                    }
                    event_params.num_items = q + "";
                }
                if (u.data.order_id) {
                    event_params.order_id = u.data.order_id;
                }
            }
            if (u.data.event_name === "Signup") {
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
                if (u.data.product_name.length > 0) {
                    event_params.content_name = u.data.product_name.join(",");
                }
                if (u.data.product_category.length > 0) {
                    event_params.content_category = u.data.product_category.join(",");
                }
                if (u.data.order_id) {
                    event_params.order_id = u.data.order_id;
                }
            }
            if (u.data.event_name === "CompleteRegistration") {
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
                if (u.data.product_name.length > 0) {
                    event_params.content_name = u.data.product_name.join(",");
                }
                if (u.data.event_status) {
                    event_params.status = u.data.event_status;
                }
                if (u.data.order_id) {
                    event_params.order_id = u.data.order_id;
                }
            }
            if (u.data.event_name === "Download") {
                if (u.data.event_value) {
                    event_params.value = u.data.event_value;
                }
                if (u.data.order_currency) {
                    event_params.currency = u.data.order_currency;
                }
                if (u.data.product_name.length > 0) {
                    event_params.content_name = u.data.product_name.join(",");
                }
                if (u.data.product_category.length > 0) {
                    event_params.content_category = u.data.product_category.join(",");
                }
                if (u.data.product_id.length > 0) {
                    event_params.content_ids = u.data.product_id;
                }
                if (u.data.num_items) {
                    event_params.num_items = u.data.num_items;
                } else if (u.data.product_quantity.length > 0) {
                    var q = 0;
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        q += parseInt(u.data.product_quantity[i]);
                    }
                    event_params.num_items = q + "";
                }
                if (u.data.order_id) {
                    event_params.order_id = u.data.order_id;
                }
            }
            if (u.data.event_name) {
                twq("track", u.data.event_name, event_params);
            }
            utag.DB("send:305:CALLBACK:COMPLETE");
        };
        u.callBack = function () {
            var data = {};
            while (data = u.queue.shift()) {
                u.data = data.data;
                u.loader_cb(data.a, data.b, data.c);
            }
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:305");
                utag.DB(b);
                var c, d, e, f, g, h, i;
                u.data = {
                    "twitter_pixel_id": "ny9xm",
                    "event_name": "",
                    "event_value": "",
                    "content_type": "",
                    "num_items": "",
                    "event_status": "",
                    "product_id": [],
                    "product_name": [],
                    "product_category": [],
                    "product_quantity": []
                };
                utag.DB("send:305:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            i = "" + u.event_lookup[u.map[d]];
                            if (i !== "") {
                                u.data.event_name = i;
                            }
                        }
                    }
                }
                utag.DB("send:305:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                u.data.order_currency = u.data.order_currency || b._ccurrency || "";
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_name.length === 0 && b._cprodname !== undefined) {
                    u.data.product_name = b._cprodname.slice(0);
                }
                if (u.data.product_category.length === 0 && b._ccat !== undefined) {
                    u.data.product_category = b._ccat.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (!u.data.twitter_pixel_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                if (u.initialized) {
                    u.loader_cb(a, b, c);
                } else {
                    u.queue.push({
                        "data": u.data,
                        "a": a,
                        "b": b,
                        "c": c
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        ! function (e, t, n, s, u, a) {
                            e.twq || (s = e.twq = function () {
                                s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
                            }, s.version = '1', s.queue = [], u = t.createElement(n), u.async = !0, u.src = '//static.ads-twitter.com/uwt.js', a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
                        }(window, document, 'script');
                        u.callBack();
                    }
                }
                utag.DB("send:305:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("305", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.394 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _uxa = _uxa || [];
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.scriptrequested = false;
        u.map = {
            "page_name": "custom.1.cs-page-name",
            "channel": "custom.2.cs-channel",
            "section": "custom.3.cs-section",
            "order_id": "order_id",
            "order_total": "order_total",
            "order_tax": "order_tax",
            "product_id": "product_id,product_sku",
            "product_name": "product_name"
        };
        u.extend = [function (a, b) {
            try {
                if (1) {
                    window._uxa = window._uxa || [];
                    var abTests = b['experiment_variant'];
                    if (!abTests) {
                        var hasTestGroups = document.cookie.split('abTestGroups=')[1];
                        if (hasTestGroups) {
                            abTests = hasTestGroups.split(';')[0];
                        }
                    }
                    if (abTests) {
                        window._uxa.push(["trackDynamicVariable", {
                            key: "Test Name",
                            value: abTests
                        }]);
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "base_url": "//t.contentsquare.net/uxa/##utag_id_project##.js",
                    "id_project": "d195f6f249c10",
                    "custom": {},
                    "path": "",
                    "product_id": [],
                    "product_name": [],
                    "product_sku": [],
                    "product_category": [],
                    "product_quantity": [],
                    "product_unit_price": []
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            if (e[f].indexOf("custom.") === 0) {
                                u.data.custom[[e[f].substr(7)]] = b[d];
                            } else {
                                u.data[e[f]] = b[d];
                            }
                        }
                    }
                }
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                u.data.order_shipping = u.data.order_shipping || b._cship || "";
                u.data.order_tax = u.data.order_tax || b._ctax || "";
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_name.length === 0 && b._cprodname !== undefined) {
                    u.data.product_name = b._cprodname.slice(0);
                }
                if (u.data.product_sku.length === 0 && b._csku !== undefined) {
                    u.data.product_sku = b._csku.slice(0);
                }
                if (u.data.product_category.length === 0 && b._ccat !== undefined) {
                    u.data.product_category = b._ccat.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                u.data.base_url = u.data.base_url.replace("##utag_id_project##", u.data.id_project);
                u.data.path = u.data.path || location.pathname + location.hash.replace("#", "?__");
                var custom, customVar;
                for (custom in u.data.custom) {
                    if (u.data.custom.hasOwnProperty(custom) && custom !== "") {
                        customVar = custom.split(".");
                        _uxa.push(["setCustomVariable", customVar[0], customVar[1], u.data.custom[custom], 3]);
                    }
                }
                if (a === "view") {
                    _uxa.push(["trackPageview", u.data.path]);
                } else {
                    _uxa.push(["setPath", u.data.path]);
                }
                if (u.data.order_id) {
                    _uxa.push(["ecommerce:addTransaction", {
                        "id": u.data.order_id,
                        "revenue": u.data.order_total,
                        "shipping": u.data.order_shipping,
                        "tax": u.data.order_tax
                    }]);
                    for (f = 0; f < u.data.product_id.length; f++) {
                        _uxa.push(["ecommerce:addItem", {
                            "id": u.data.order_id,
                            "name": u.data.product_name[f],
                            "sku": u.data.product_sku[f],
                            "category": u.data.product_category[f],
                            "price": u.data.product_unit_price[f],
                            "quantity": u.data.product_quantity[f]
                        }]);
                    }
                    _uxa.push(["ecommerce:send"]);
                }
                if (!u.scriptrequested) {
                    u.scriptrequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_394"
                    });
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("394", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.439 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
window.snaptr = window.snaptr || function () {
    window.snaptr.handleRequest ? window.snaptr.handleRequest.apply(window.snaptr, arguments) : window.snaptr.queue.push(arguments);
};
window.snaptr.queue = window.snaptr.queue || [];
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.clearEmptyKeys = function (object) {
            for (var key in object) {
                if (object[key] === "" || object[key] === undefined) {
                    delete object[key];
                }
            }
            return object;
        };
        u.map = {
            "snapchat_event_trigger:cars_search_ad-view_email-sent": "PURCHASE",
            "snapchat_event_trigger:cars_search_ad-view_confirmation": "PURCHASE",
            "snapchat_event_trigger:cars_search_ad-view_email-form": "ADD_CART",
            "snapchat_event_trigger:cars_search_ad-view_enter-details": "ADD_CART",
            "snapchat_event_trigger:cars_search_ad-view": "VIEW_CONTENT"
        };
        u.extend = [];
        u.sumItems = function (arr) {
            var totalItems = 0,
                i;
            for (i = 0; i < arr.length; i++) {
                totalItems += parseInt(arr[i]);
            }
            return totalItems;
        };
        u.handleEvent = function (event_name) {
            if (!event_name) {
                return;
            }
            var event_data = {};
            if (event_name === "PURCHASE") {
                event_data["currency"] = u.data.order_currency;
                event_data["transaction_id"] = u.data.order_id;
            }
            if (/VIEW_CONTENT|ADD_CART|START_CHECKOUT|PURCHASE/i.test(event_name)) {
                event_data["price"] = u.data.order_subtotal;
                event_data["item_ids"] = u.data.product_id;
                event_data["item_category"] = u.data.product_category[0];
                event_data["number_items"] = u.sumItems(u.data.product_quantity);
            }
            event_data["description"] = u.data.description;
            event_data["search_string"] = u.data.search_string;
            event_data["payment_info_available"] = u.data.payment_info_available;
            event_data["sign_up_method"] = u.data.sign_up_method;
            event_data["success"] = u.data.success;
            window.snaptr("track", event_name, u.clearEmptyKeys(event_data));
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:439");
                utag.DB(b);
                var c, d, e, f, h, i;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://sc-static.net/scevent.min.js",
                    "pixel_id": "d9a8cba6-d01a-4a42-b21f-023174fd8baf",
                    "product_id": [],
                    "product_category": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "event": [],
                    "user_data": {}
                };
                utag.DB("send:439:EXTENSIONS");
                utag.DB(b);
                c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            if (e[f].indexOf("user_") === 0) {
                                u.data.user_data[e[f]] = b[d];
                            } else {
                                u.data[e[f]] = b[d];
                            }
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:439:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
                u.data.order_currency = u.data.order_currency || b._ccurrency || "";
                u.data.customer_id = u.data.customer_id || b._ccustid || "";
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_category.length === 0 && b._ccat !== undefined) {
                    u.data.product_category = b._ccat.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (u.data.event.length === 0 && b._cevent !== undefined) {
                    u.data.event = (u.typeOf(b._cevent) === "array") ? b._cevent.slice(0) : [b._cevent];
                }
                if (!u.data.pixel_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                if (!u.initialized) {
                    window.snaptr("init", u.data.pixel_id, u.data.user_data);
                    u.initialized = true;
                }
                if (u.data.event.join(",").indexOf("PURCHASE") < 0 && u.data.order_id) {
                    u.data.event.push("PURCHASE");
                }
                for (i = 0; i < u.data.event.length; i++) {
                    u.handleEvent(u.data.event[i]);
                }
                if (!u.scriptrequested) {
                    u.scriptrequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_439",
                        "attrs": {}
                    });
                }
                utag.DB("send:439:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("439", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.460 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0) {
                    return true;
                }
            }
            window.dataLayer = window.dataLayer || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    dataLayer.push(arguments);
                };
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:460");
                utag.DB(b);
                var d, e, f, h, i, j, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "",
                    "activity": "",
                    "counting_method": "standard",
                    "custom_scripts": "true",
                    "session_id": "",
                    "product_quantity": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                utag.DB("send:460:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:460:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p) {
                        u.data.event.push("purchase");
                    }
                }
                var total_qty = 1;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_460",
                        "attrs": {}
                    });
                }
                utag.DB("send:460:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("460", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.442 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0) {
                    return true;
                }
            }
            window.dataLayer = window.dataLayer || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    dataLayer.push(arguments);
                };
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.map = {
            "floodlight_trigger:1": "conversion",
            "cp.utag_main_ses_id": "session_id"
        };
        u.extend = [function (a, b) {
            try {
                if (1) {
                    if (a === 'view' && b['page_name'] === 'cars:search:ad-view' && b['advert_attributes'] === 'physical-stock' && typeof gtag === "function") {
                        setTimeout(function () {
                            gtag('event', 'conversion', {
                                'allow_custom_scripts': true,
                                'send_to': 'DC-6588459/invmedia/atmar0+standard'
                            });
                        }, 500);
                    }
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:442");
                utag.DB(b);
                var d, e, f, h, i, j, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "allpa0",
                    "activity": "allpa0",
                    "counting_method": "per_session",
                    "custom_scripts": "true",
                    "session_id": "",
                    "product_quantity": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:442:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:442:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p) {
                        u.data.event.push("purchase");
                    }
                }
                var total_qty = 1;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_442",
                        "attrs": {}
                    });
                }
                utag.DB("send:442:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("442", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.444 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0) {
                    return true;
                }
            }
            window.dataLayer = window.dataLayer || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    dataLayer.push(arguments);
                };
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.map = {
            "floodlight_trigger:1": "conversion",
            "tealium_random": "num"
        };
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:444");
                utag.DB(b);
                var d, e, f, h, i, j, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newfu0",
                    "counting_method": "standard",
                    "custom_scripts": "true",
                    "session_id": "",
                    "product_quantity": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                utag.DB("send:444:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:444:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p) {
                        u.data.event.push("purchase");
                    }
                }
                var total_qty = 1;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_444",
                        "attrs": {}
                    });
                }
                utag.DB("send:444:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("444", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.464 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0) {
                    return true;
                }
            }
            window.dataLayer = window.dataLayer || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    dataLayer.push(arguments);
                };
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.map = {
            "tealium_random": "num",
            "floodlight_trigger_new_car_adview:1": "conversion"
        };
        u.extend = [function (a, b) {
            try {
                if ((/:ad-view$/i.test(b['page_name']) && /(allocated-stock|network-stock)/.test(b['advert_attributes']))) {
                    b['floodlight_trigger_new_car_adview'] = '1'
                }
            } catch (e) {
                utag.DB(e);
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:464");
                utag.DB(b);
                var d, e, f, h, i, j, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newca0",
                    "counting_method": "standard",
                    "custom_scripts": "true",
                    "session_id": "",
                    "product_quantity": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:464:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:464:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p) {
                        u.data.event.push("purchase");
                    }
                }
                var total_qty = 1;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_464",
                        "attrs": {}
                    });
                }
                utag.DB("send:464:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("464", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.465 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0) {
                    return true;
                }
            }
            window.dataLayer = window.dataLayer || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    dataLayer.push(arguments);
                };
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.map = {
            "floodlight_trigger:1": "conversion",
            "tealium_random": "num"
        };
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:465");
                utag.DB(b);
                var d, e, f, h, i, j, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newne0",
                    "counting_method": "standard",
                    "custom_scripts": "true",
                    "session_id": "",
                    "product_quantity": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                utag.DB("send:465:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:465:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p) {
                        u.data.event.push("purchase");
                    }
                }
                var total_qty = 1;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_465",
                        "attrs": {}
                    });
                }
                utag.DB("send:465:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("465", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.480 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _hjSettings = _hjSettings || {};
var hj = hj || function () {
    (hj.q = hj.q || []).push(arguments)
};
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.map = {};
        u.extend = [];
        u.loader_cb = function (a, b) {
            utag.DB("send:480:CALLBACK");
            if (u.initialized === true) {
                hj("vpv", b["dom.pathname"]);
            }
            u.initialized = true;
            utag.DB("send:480:CALLBACK:COMPLETE");
        };
        u.callBack = function () {
            var data = {};
            while (data = u.queue.shift()) {
                u.data = data.data;
                u.loader_cb(data.a, data.b);
            }
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "hjid": "57703",
                    "hjsv": "6",
                    "base_url": "//static.hotjar.com/c/hotjar-##utag_hjid##.js?sv=##utag_hjsv##"
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                _hjSettings.hjid = u.data.hjid;
                _hjSettings.hjsv = u.data.hjsv;
                u.data.base_url = u.data.base_url.replace('##utag_hjid##', u.data.hjid);
                u.data.base_url = u.data.base_url.replace('##utag_hjsv##', u.data.hjsv);
                if (u.initialized) {
                    u.loader_cb(a, b);
                } else {
                    u.queue.push({
                        "data": u.data,
                        "a": a,
                        "b": b
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_480",
                            "attrs": {}
                        });
                    }
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("480", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.487 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
a = window.cooladata || [];
d = document;
if (!a.__SV) {
    var b, c, g, e;
    window.cooladata = a;
    a._i = [];
    a.init = function (b, c, f) {
        function d(a, b) {
            var c = b.split(".");
            2 == c.length && (a = a[c[0]], b = c[1]);
            a[b] = function () {
                a.push([b].concat(Array.prototype.slice.call(arguments, 0)))
            }
        }
        var h = a;
        "undefined" !== typeof f ? h = a[f] = [] : f = "cooladata";
        g = ["trackEvent", "trackEventLater", "trackPageload", "flush", "setConfig"];
        for (e = 0; e < g.length; e++) d(h, g[e]);
        a._i.push([b, c, f]);
    }
    a.__SV = 1.2;
}
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag === undefined) {
            utag = {};
        }
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var a, b, c, l;
                a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    b.setAttribute("height", "1");
                    b.setAttribute("width", "1");
                    b.setAttribute("style", "display:none");
                    b.setAttribute("src", o.src);
                } else if (o.type === "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id;
                }
                if (typeof o.cb === "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState === "complete" || this.readyState === "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l === "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b);
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        u.ev = {
            'view': 1
        };
        u.initialized = false;
        u.map = {
            "page_name": "page_name",
            "advert_attributes": "advert_attributes"
        };
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f, i;
                u.data = {
                    "app_key": "41qh5tdo65qaqt5gwn9q55e4ziiife9t",
                    "base_url": "//cdn.cooladata.com/tracking/cooladata-latest.min.js"
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                u.loader_cb = function () {
                    u.initialized = true;
                    cooladata.init({
                        "app_key": u.data.app_key,
                        "track_pageload": true,
                        "img_src_get_request": true
                    });
                    if (u.data.page_name == "cars:search:ad-view") {
                        if (["allocated-stock", "network-stock"].indexOf(u.data.advert_attributes) !== -1) {
                            window.cooladata.trackEvent("lce3", {
                                "a4": "New Car"
                            });
                        } else if ("physical-stock" === u.data.advert_attributes) {
                            window.cooladata.trackEvent("lce3", {
                                "a4": "Used Car"
                            });
                        }
                    }
                };
                if (!u.initialized) {
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": u.loader_cb,
                        "loc": "script",
                        "id": 'utag_487'
                    });
                } else {
                    u.loader_cb();
                }
                utag.DB("send:487:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    })("487", "autotrader.at-desktop");
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.498 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag === undefined) {
            utag = {};
        }
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var a, b, c, l;
                a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    b.setAttribute("height", "1");
                    b.setAttribute("width", "1");
                    b.setAttribute("style", "display:none");
                    b.setAttribute("src", o.src);
                } else if (o.type === "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id;
                }
                if (typeof o.cb === "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState === "complete" || this.readyState === "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l === "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b);
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        u.ev = {
            'view': 1
        };
        u.initialized = false;
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f, i;
                u.data = {};
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                (function (e, s, t) {
                    t = t || {}, t.id = e, versaTagObj = {
                        $: [],
                        onready: function (e) {
                            this.$.push(e)
                        }
                    };
                    var n = s.getElementsByTagName("script")[0],
                        r = s.createElement("script");
                    r.options = t, r.async = !0, r.src = "https://secure-ds.serving-sys.com/SemiCachedScripts/ebOneTag.js?id=" + e, r.options = t, n.parentNode.insertBefore(r, n)
                })("1073742440", document, {
                    dataLayer: "SizmekDataLayer"
                })
            }
        };
        utag.o[loader].loader.LOAD(id);
    })("498", "autotrader.at-desktop");
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.512 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _hjSettings = _hjSettings || {};
var hj = hj || function () {
    (hj.q = hj.q || []).push(arguments)
};
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.map = {};
        u.extend = [];
        u.loader_cb = function (a, b) {
            utag.DB("send:512:CALLBACK");
            if (u.initialized === true) {
                hj("vpv", b["dom.pathname"]);
            }
            u.initialized = true;
            utag.DB("send:512:CALLBACK:COMPLETE");
        };
        u.callBack = function () {
            var data = {};
            while (data = u.queue.shift()) {
                u.data = data.data;
                u.loader_cb(data.a, data.b);
            }
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "hjid": "57703",
                    "hjsv": "6",
                    "base_url": "//static.hotjar.com/c/hotjar-##utag_hjid##.js?sv=##utag_hjsv##"
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                _hjSettings.hjid = u.data.hjid;
                _hjSettings.hjsv = u.data.hjsv;
                u.data.base_url = u.data.base_url.replace('##utag_hjid##', u.data.hjid);
                u.data.base_url = u.data.base_url.replace('##utag_hjsv##', u.data.hjsv);
                if (u.initialized) {
                    u.loader_cb(a, b);
                } else {
                    u.queue.push({
                        "data": u.data,
                        "a": a,
                        "b": b
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_512",
                            "attrs": {}
                        });
                    }
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("512", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.513 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _hjSettings = _hjSettings || {};
var hj = hj || function () {
    (hj.q = hj.q || []).push(arguments)
};
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.map = {};
        u.extend = [];
        u.loader_cb = function (a, b) {
            utag.DB("send:513:CALLBACK");
            if (u.initialized === true) {
                hj("vpv", b["dom.pathname"]);
            }
            u.initialized = true;
            utag.DB("send:513:CALLBACK:COMPLETE");
        };
        u.callBack = function () {
            var data = {};
            while (data = u.queue.shift()) {
                u.data = data.data;
                u.loader_cb(data.a, data.b);
            }
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "hjid": "57703",
                    "hjsv": "6",
                    "base_url": "//static.hotjar.com/c/hotjar-##utag_hjid##.js?sv=##utag_hjsv##"
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                _hjSettings.hjid = u.data.hjid;
                _hjSettings.hjsv = u.data.hjsv;
                u.data.base_url = u.data.base_url.replace('##utag_hjid##', u.data.hjid);
                u.data.base_url = u.data.base_url.replace('##utag_hjsv##', u.data.hjsv);
                if (u.initialized) {
                    u.loader_cb(a, b);
                } else {
                    u.queue.push({
                        "data": u.data,
                        "a": a,
                        "b": b
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_513",
                            "attrs": {}
                        });
                    }
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("513", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.514 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _hjSettings = _hjSettings || {};
var hj = hj || function () {
    (hj.q = hj.q || []).push(arguments)
};
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.map = {};
        u.extend = [];
        u.loader_cb = function (a, b) {
            utag.DB("send:514:CALLBACK");
            if (u.initialized === true) {
                hj("vpv", b["dom.pathname"]);
            }
            u.initialized = true;
            utag.DB("send:514:CALLBACK:COMPLETE");
        };
        u.callBack = function () {
            var data = {};
            while (data = u.queue.shift()) {
                u.data = data.data;
                u.loader_cb(data.a, data.b);
            }
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f;
                u.data = {
                    "hjid": "57703",
                    "hjsv": "6",
                    "base_url": "//static.hotjar.com/c/hotjar-##utag_hjid##.js?sv=##utag_hjsv##"
                };
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                _hjSettings.hjid = u.data.hjid;
                _hjSettings.hjsv = u.data.hjsv;
                u.data.base_url = u.data.base_url.replace('##utag_hjid##', u.data.hjid);
                u.data.base_url = u.data.base_url.replace('##utag_hjsv##', u.data.hjsv);
                if (u.initialized) {
                    u.loader_cb(a, b);
                } else {
                    u.queue.push({
                        "data": u.data,
                        "a": a,
                        "b": b
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_514",
                            "attrs": {}
                        });
                    }
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("514", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.515 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.map = {};
        u.extend = [];
        u.loader_cb = function () {
            utag.DB("send:515:CALLBACK");
            u.initialized = true;
            if (typeof TTDUniversalPixelApi === 'function') {
                var universalPixelApi = new TTDUniversalPixelApi();
                universalPixelApi.init(u.data.adv_id, [u.data.up_id], "https://insight.adsrvr.org/track/up", "ttdUniversalPixelTag" + u.data.pixel_tag_id);
            }
            utag.DB("send:515:CALLBACK:COMPLETE");
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:515");
                utag.DB(b);
                var c, d, e, f;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "//js.adsrvr.org/up_loader.1.1.0.js",
                    "adv_id": "6tfvdrr",
                    "up_id": "zledjq5",
                    "pixel_tag_id": ""
                };
                utag.DB("send:515:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                utag.DB("send:515:MAPPINGS");
                utag.DB(u.data);
                if (!u.data.adv_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                if (u.initialized) {
                    u.loader_cb();
                } else {
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        var missing = !(document.getElementById('ttdUniversalPixelTag' + u.data.pixel_tag_id));
                        if (missing) {
                            var div = document.createElement('div');
                            div.setAttribute('id', 'ttdUniversalPixelTag' + u.data.pixel_tag_id);
                            div.setAttribute('style', 'display: none;');
                            document.getElementsByTagName('body')[0].appendChild(div);
                        }
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.loader_cb,
                            "loc": "script",
                            "id": "utag_515",
                            "attrs": {}
                        });
                    }
                }
                utag.DB("send:515:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("515", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.525 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.toBoolean = function (val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf('utag') > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    window[data_layer_name].push(arguments);
                };
                var cross_track_domains = "";
                if (cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.map = {
            "floodlight_trigger:1": "conversion",
            "tealium_random": "num"
        };
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:525");
                utag.DB(b);
                var c, d, e, f, h, i, j, k, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "leasi0",
                    "activity": "newle0",
                    "counting_method": "standard",
                    "fire_purchase": "true",
                    "custom_scripts": "true",
                    "data_layer_name": "",
                    "session_id": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                utag.DB("send:525:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:525:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string" && u.data.advertiser_id !== "") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    if (!/^[a-zA-Z]{2}-/.test(u.data.advertiser_id[i])) {
                        u.data.advertiser_id[i] = "DC-" + u.data.advertiser_id[i];
                    }
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p && u.toBoolean(u.data.fire_purchase)) {
                        u.data.event.push("purchase");
                        if (u.data.counting_method[0] === "") {
                            u.data.counting_method[0] = "transactions";
                        }
                    }
                }
                var total_qty = 0;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                } else {
                    total_qty = 1;
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        eventIdData.items = [];
                        for (k = 0; k < u.data.product_id.length; k++) {
                            if (typeof (u.data.product_unit_price[k]) === "undefined" || typeof (u.data.product_quantity[k]) === "undefined") {
                                utag.DB("No matching unit price or quantity for product ID " + u.data.product_id[k]);
                            } else {
                                eventIdData.items.push({
                                    "id": u.data.product_id[k],
                                    "price": u.data.product_unit_price[k],
                                    "quantity": u.data.product_quantity[k]
                                });
                            }
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        if (u.data.counting_method[j] && u.data.counting_method[j] !== u.data.counting_method[j].toLowerCase()) {
                            u.data.counting_method[j] = u.data.counting_method[j].toLowerCase();
                            utag.DB("Counting Method not supplied in proper case - converted to lower case");
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_525",
                        "attrs": {}
                    });
                }
                utag.DB("send:525:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("525", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.526 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.toBoolean = function (val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf('utag') > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    window[data_layer_name].push(arguments);
                };
                var cross_track_domains = "";
                if (cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.map = {
            "floodlight_trigger:1": "conversion",
            "tealium_random": "num",
            "advert_attributes": "custom.u7"
        };
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:526");
                utag.DB(b);
                var c, d, e, f, h, i, j, k, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "leasi0",
                    "activity": "newle00",
                    "counting_method": "standard",
                    "fire_purchase": "true",
                    "custom_scripts": "true",
                    "data_layer_name": "",
                    "session_id": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                utag.DB("send:526:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:526:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string" && u.data.advertiser_id !== "") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    if (!/^[a-zA-Z]{2}-/.test(u.data.advertiser_id[i])) {
                        u.data.advertiser_id[i] = "DC-" + u.data.advertiser_id[i];
                    }
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p && u.toBoolean(u.data.fire_purchase)) {
                        u.data.event.push("purchase");
                        if (u.data.counting_method[0] === "") {
                            u.data.counting_method[0] = "transactions";
                        }
                    }
                }
                var total_qty = 0;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                } else {
                    total_qty = 1;
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        eventIdData.items = [];
                        for (k = 0; k < u.data.product_id.length; k++) {
                            if (typeof (u.data.product_unit_price[k]) === "undefined" || typeof (u.data.product_quantity[k]) === "undefined") {
                                utag.DB("No matching unit price or quantity for product ID " + u.data.product_id[k]);
                            } else {
                                eventIdData.items.push({
                                    "id": u.data.product_id[k],
                                    "price": u.data.product_unit_price[k],
                                    "quantity": u.data.product_quantity[k]
                                });
                            }
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        if (u.data.counting_method[j] && u.data.counting_method[j] !== u.data.counting_method[j].toLowerCase()) {
                            u.data.counting_method[j] = u.data.counting_method[j].toLowerCase();
                            utag.DB("Counting Method not supplied in proper case - converted to lower case");
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_526",
                        "attrs": {}
                    });
                }
                utag.DB("send:526:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("526", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.527 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.toBoolean = function (val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf('utag') > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    window[data_layer_name].push(arguments);
                };
                var cross_track_domains = "";
                if (cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.map = {
            "floodlight_trigger:1": "conversion",
            "tealium_random": "num",
            "make": "custom.u8",
            "model": "custom.u9",
            "advert_attributes": "custom.u7"
        };
        u.extend = [function (a, b) {
            try {
                if (1) {
                    b.advert_attributes = (typeof b.advert_attributes !== "undefined" ? b.advert_attributes : (typeof utag.data.advert_attributes !== "undefined" ? utag.data.advert_attributes : ""));
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:527");
                utag.DB(b);
                var c, d, e, f, h, i, j, k, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newem0",
                    "counting_method": "standard",
                    "fire_purchase": "true",
                    "custom_scripts": "true",
                    "data_layer_name": "",
                    "session_id": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:527:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:527:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string" && u.data.advertiser_id !== "") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    if (!/^[a-zA-Z]{2}-/.test(u.data.advertiser_id[i])) {
                        u.data.advertiser_id[i] = "DC-" + u.data.advertiser_id[i];
                    }
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p && u.toBoolean(u.data.fire_purchase)) {
                        u.data.event.push("purchase");
                        if (u.data.counting_method[0] === "") {
                            u.data.counting_method[0] = "transactions";
                        }
                    }
                }
                var total_qty = 0;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                } else {
                    total_qty = 1;
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        eventIdData.items = [];
                        for (k = 0; k < u.data.product_id.length; k++) {
                            if (typeof (u.data.product_unit_price[k]) === "undefined" || typeof (u.data.product_quantity[k]) === "undefined") {
                                utag.DB("No matching unit price or quantity for product ID " + u.data.product_id[k]);
                            } else {
                                eventIdData.items.push({
                                    "id": u.data.product_id[k],
                                    "price": u.data.product_unit_price[k],
                                    "quantity": u.data.product_quantity[k]
                                });
                            }
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        if (u.data.counting_method[j] && u.data.counting_method[j] !== u.data.counting_method[j].toLowerCase()) {
                            u.data.counting_method[j] = u.data.counting_method[j].toLowerCase();
                            utag.DB("Counting Method not supplied in proper case - converted to lower case");
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_527",
                        "attrs": {}
                    });
                }
                utag.DB("send:527:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("527", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.530 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.ot_init = function (data) {
            var qs, count, ns;
            qs = "";
            count = 0;
            ns = "";
            for (var key in data.ft_vars) {
                qs += (data.ft_vars[key] == "" ? "" : (key + "=" + data.ft_vars[key] + "&"));
            }
            count = data.ot_path.length + qs.length + data.ot_href.length + escape(data.ot_ref).length;
            ns = u.ot_ns(count - 2000, data);
            u.loader({
                "type": "iframe",
                "src": data.ot_dom + data.ot_path + qs + data.ot_href + "&ns=" + ns + "&cb=" + data.ot_rand,
                "cb": null,
                "loc": "body",
                "id": "utag_530",
                "attrs": {}
            });
        };
        u.ot_ns = function (diff, data) {
            if (diff > 0) {
                var qo, sp, fp, ro;
                qo = {};
                sp = /(?:^|&)([^&=]*)=?([^&]*)/g;
                fp = /^(http[s]?):\/\/?([^:\/\s]+)\/([\w\.]+[^#?\s]+)(.*)?/.exec(data.ot_ref);
                ro = {
                    h: fp[2],
                    p: fp[3],
                    qs: fp[4].replace(sp, function (p1, p2, p3) {
                        if (p2) qo[p2] = [p3]
                    })
                };
                return escape(ro.h + ro.p.substring(0, 10) + (qo.q ? "?q=" + unescape(qo.q) : "?p=" + unescape(qo.p)));
            } else {
                return escape(unescape(data.ot_ref));
            }
        };
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:530");
                utag.DB(b);
                var c, d, e, f;
                u.data = {
                    ft_vars: {
                        "U1": b['ad_id'],
                        "U2": b['used_new'],
                        "U3": b['make'],
                        "U4": b['model'],
                        "U5": b['body_type']
                    },
                    "ot_dom": document.location.protocol + "//servedby.flashtalking.com",
                    "ot_path": "/container/##utag_aid##;##utag_sid##;##utag_sgid##;iframe/?",
                    "ot_href": "ft_referrer=" + escape(document.location.href),
                    "ot_rand": Math.random() * 1000000,
                    "ot_ref": document.referrer,
                    "aid": "15194",
                    "sid": "111496",
                    "sgid": "11566",
                    "product_quantity": [],
                };
                utag.DB("send:530:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    }
                }
                utag.DB("send:530:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_subtotal = u.data.order_subtotal || b._csubtotal || "";
                u.data.order_currency = u.data.order_currency || b._ccurrency || "";
                u.data.order_type = u.data.order_type || b._ctype || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (!u.data.aid || !u.data.sid || !u.data.sgid) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                if (u.data.order_id) {
                    if (u.data.ft_vars.ftXNumItems === 0 && u.data.product_quantity.length > 0) {
                        for (var i = 0; i < u.data.product_quantity.length; i++) {
                            u.data.ft_vars.ftXNumItems += parseInt(u.data.product_quantity[i]);
                        }
                    }
                    u.data.ft_vars.ftXRef = u.data.ft_vars.ftXRef || u.data.order_id;
                    u.data.ft_vars.ftXValue = u.data.ft_vars.ftXValue || u.data.order_subtotal;
                    u.data.ft_vars.ftXType = u.data.ft_vars.ftXType || u.data.order_type;
                    u.data.ft_vars.ftXCurrency = u.data.ft_vars.ftXCurrency || u.data.order_currency;
                } else {
                    u.data.ft_vars.ftXRef = "";
                    u.data.ft_vars.ftXValue = "";
                    u.data.ft_vars.ftXType = "";
                    u.data.ft_vars.ftXCurrency = "";
                    u.data.ft_vars.ftXName = "";
                }
                u.data.ot_path = u.data.ot_path.replace("##utag_aid##", u.data.aid);
                u.data.ot_path = u.data.ot_path.replace("##utag_sid##", u.data.sid);
                u.data.ot_path = u.data.ot_path.replace("##utag_sgid##", u.data.sgid);
                u.ot_init(u.data);
                utag.DB("send:530:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("530", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.541 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.map = {};
        u.extend = [];
        u.loader_cb = function () {
            utag.DB("send:541:CALLBACK");
            u.initialized = true;
            if (typeof TTDUniversalPixelApi === 'function') {
                var universalPixelApi = new TTDUniversalPixelApi();
                universalPixelApi.init(u.data.adv_id, [u.data.up_id], "https://insight.adsrvr.org/track/up", "ttdUniversalPixelTag" + u.data.pixel_tag_id);
            }
            utag.DB("send:541:CALLBACK:COMPLETE");
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:541");
                utag.DB(b);
                var c, d, e, f;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "//js.adsrvr.org/up_loader.1.1.0.js",
                    "adv_id": "6tfvdrr",
                    "up_id": "dufrerp",
                    "pixel_tag_id": ""
                };
                utag.DB("send:541:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                utag.DB("send:541:MAPPINGS");
                utag.DB(u.data);
                if (!u.data.adv_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                if (u.initialized) {
                    u.loader_cb();
                } else {
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        var missing = !(document.getElementById('ttdUniversalPixelTag' + u.data.pixel_tag_id));
                        if (missing) {
                            var div = document.createElement('div');
                            div.setAttribute('id', 'ttdUniversalPixelTag' + u.data.pixel_tag_id);
                            div.setAttribute('style', 'display: none;');
                            document.getElementsByTagName('body')[0].appendChild(div);
                        }
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.loader_cb,
                            "loc": "script",
                            "id": "utag_541",
                            "attrs": {}
                        });
                    }
                }
                utag.DB("send:541:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("541", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.542 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.map = {};
        u.extend = [];
        u.loader_cb = function () {
            utag.DB("send:542:CALLBACK");
            u.initialized = true;
            if (typeof TTDUniversalPixelApi === 'function') {
                var universalPixelApi = new TTDUniversalPixelApi();
                universalPixelApi.init(u.data.adv_id, [u.data.up_id], "https://insight.adsrvr.org/track/up", "ttdUniversalPixelTag" + u.data.pixel_tag_id);
            }
            utag.DB("send:542:CALLBACK:COMPLETE");
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:542");
                utag.DB(b);
                var c, d, e, f;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "//js.adsrvr.org/up_loader.1.1.0.js",
                    "adv_id": "6tfvdrr",
                    "up_id": "w0aquw5",
                    "pixel_tag_id": ""
                };
                utag.DB("send:542:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                utag.DB("send:542:MAPPINGS");
                utag.DB(u.data);
                if (!u.data.adv_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                if (u.initialized) {
                    u.loader_cb();
                } else {
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        var missing = !(document.getElementById('ttdUniversalPixelTag' + u.data.pixel_tag_id));
                        if (missing) {
                            var div = document.createElement('div');
                            div.setAttribute('id', 'ttdUniversalPixelTag' + u.data.pixel_tag_id);
                            div.setAttribute('style', 'display: none;');
                            document.getElementsByTagName('body')[0].appendChild(div);
                        }
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.loader_cb,
                            "loc": "script",
                            "id": "utag_542",
                            "attrs": {}
                        });
                    }
                }
                utag.DB("send:542:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("542", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.544 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.toBoolean = function (val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf('utag') > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    window[data_layer_name].push(arguments);
                };
                var cross_track_domains = "";
                if (cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.map = {
            "custom_metric_view_map:1": "conversion",
            "advert_attributes": "custom.u7"
        };
        u.extend = [function (a, b) {
            try {
                if (1) {
                    b.advert_attributes = (typeof b.advert_attributes !== "undefined" ? b.advert_attributes : (typeof utag.data.advert_attributes !== "undefined" ? utag.data.advert_attributes : ""));
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:544");
                utag.DB(b);
                var c, d, e, f, h, i, j, k, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newcl003",
                    "counting_method": "standard",
                    "fire_purchase": "true",
                    "custom_scripts": "true",
                    "data_layer_name": "",
                    "session_id": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:544:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:544:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string" && u.data.advertiser_id !== "") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    if (!/^[a-zA-Z]{2}-/.test(u.data.advertiser_id[i])) {
                        u.data.advertiser_id[i] = "DC-" + u.data.advertiser_id[i];
                    }
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p && u.toBoolean(u.data.fire_purchase)) {
                        u.data.event.push("purchase");
                        if (u.data.counting_method[0] === "") {
                            u.data.counting_method[0] = "transactions";
                        }
                    }
                }
                var total_qty = 0;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                } else {
                    total_qty = 1;
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        eventIdData.items = [];
                        for (k = 0; k < u.data.product_id.length; k++) {
                            if (typeof (u.data.product_unit_price[k]) === "undefined" || typeof (u.data.product_quantity[k]) === "undefined") {
                                utag.DB("No matching unit price or quantity for product ID " + u.data.product_id[k]);
                            } else {
                                eventIdData.items.push({
                                    "id": u.data.product_id[k],
                                    "price": u.data.product_unit_price[k],
                                    "quantity": u.data.product_quantity[k]
                                });
                            }
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        if (u.data.counting_method[j] && u.data.counting_method[j] !== u.data.counting_method[j].toLowerCase()) {
                            u.data.counting_method[j] = u.data.counting_method[j].toLowerCase();
                            utag.DB("Counting Method not supplied in proper case - converted to lower case");
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_544",
                        "attrs": {}
                    });
                }
                utag.DB("send:544:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("544", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.545 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.toBoolean = function (val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf('utag') > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    window[data_layer_name].push(arguments);
                };
                var cross_track_domains = "";
                if (cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.map = {
            "custom_metrics_get_directions:1": "conversion",
            "advert_attributes": "custom.u7"
        };
        u.extend = [function (a, b) {
            try {
                if (1) {
                    b.advert_attributes = (typeof b.advert_attributes !== "undefined" ? b.advert_attributes : (typeof utag.data.advert_attributes !== "undefined" ? utag.data.advert_attributes : ""));
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:545");
                utag.DB(b);
                var c, d, e, f, h, i, j, k, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newcl001",
                    "counting_method": "standard",
                    "fire_purchase": "true",
                    "custom_scripts": "true",
                    "data_layer_name": "",
                    "session_id": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:545:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:545:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string" && u.data.advertiser_id !== "") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    if (!/^[a-zA-Z]{2}-/.test(u.data.advertiser_id[i])) {
                        u.data.advertiser_id[i] = "DC-" + u.data.advertiser_id[i];
                    }
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p && u.toBoolean(u.data.fire_purchase)) {
                        u.data.event.push("purchase");
                        if (u.data.counting_method[0] === "") {
                            u.data.counting_method[0] = "transactions";
                        }
                    }
                }
                var total_qty = 0;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                } else {
                    total_qty = 1;
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        eventIdData.items = [];
                        for (k = 0; k < u.data.product_id.length; k++) {
                            if (typeof (u.data.product_unit_price[k]) === "undefined" || typeof (u.data.product_quantity[k]) === "undefined") {
                                utag.DB("No matching unit price or quantity for product ID " + u.data.product_id[k]);
                            } else {
                                eventIdData.items.push({
                                    "id": u.data.product_id[k],
                                    "price": u.data.product_unit_price[k],
                                    "quantity": u.data.product_quantity[k]
                                });
                            }
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        if (u.data.counting_method[j] && u.data.counting_method[j] !== u.data.counting_method[j].toLowerCase()) {
                            u.data.counting_method[j] = u.data.counting_method[j].toLowerCase();
                            utag.DB("Counting Method not supplied in proper case - converted to lower case");
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_545",
                        "attrs": {}
                    });
                }
                utag.DB("send:545:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("545", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.546 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.toBoolean = function (val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf('utag') > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    window[data_layer_name].push(arguments);
                };
                var cross_track_domains = "";
                if (cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.map = {
            "custom_metric_send_sms:1": "conversion",
            "advert_attributes": "custom.u7"
        };
        u.extend = [function (a, b) {
            try {
                if (1) {
                    b.advert_attributes = (typeof b.advert_attributes !== "undefined" ? b.advert_attributes : (typeof utag.data.advert_attributes !== "undefined" ? utag.data.advert_attributes : ""));
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:546");
                utag.DB(b);
                var c, d, e, f, h, i, j, k, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newcl00",
                    "counting_method": "standard",
                    "fire_purchase": "true",
                    "custom_scripts": "true",
                    "data_layer_name": "",
                    "session_id": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:546:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:546:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string" && u.data.advertiser_id !== "") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    if (!/^[a-zA-Z]{2}-/.test(u.data.advertiser_id[i])) {
                        u.data.advertiser_id[i] = "DC-" + u.data.advertiser_id[i];
                    }
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p && u.toBoolean(u.data.fire_purchase)) {
                        u.data.event.push("purchase");
                        if (u.data.counting_method[0] === "") {
                            u.data.counting_method[0] = "transactions";
                        }
                    }
                }
                var total_qty = 0;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                } else {
                    total_qty = 1;
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        eventIdData.items = [];
                        for (k = 0; k < u.data.product_id.length; k++) {
                            if (typeof (u.data.product_unit_price[k]) === "undefined" || typeof (u.data.product_quantity[k]) === "undefined") {
                                utag.DB("No matching unit price or quantity for product ID " + u.data.product_id[k]);
                            } else {
                                eventIdData.items.push({
                                    "id": u.data.product_id[k],
                                    "price": u.data.product_unit_price[k],
                                    "quantity": u.data.product_quantity[k]
                                });
                            }
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        if (u.data.counting_method[j] && u.data.counting_method[j] !== u.data.counting_method[j].toLowerCase()) {
                            u.data.counting_method[j] = u.data.counting_method[j].toLowerCase();
                            utag.DB("Counting Method not supplied in proper case - converted to lower case");
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_546",
                        "attrs": {}
                    });
                }
                utag.DB("send:546:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("546", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.547 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.toBoolean = function (val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf('utag') > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    window[data_layer_name].push(arguments);
                };
                var cross_track_domains = "";
                if (cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.map = {
            "custom_metric_dealer_website:1": "conversion",
            "advert_attributes": "custom.u7"
        };
        u.extend = [function (a, b) {
            try {
                if (1) {
                    b.advert_attributes = (typeof b.advert_attributes !== "undefined" ? b.advert_attributes : (typeof utag.data.advert_attributes !== "undefined" ? utag.data.advert_attributes : ""));
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:547");
                utag.DB(b);
                var c, d, e, f, h, i, j, k, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newcl002",
                    "counting_method": "standard",
                    "fire_purchase": "true",
                    "custom_scripts": "true",
                    "data_layer_name": "",
                    "session_id": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:547:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:547:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string" && u.data.advertiser_id !== "") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    if (!/^[a-zA-Z]{2}-/.test(u.data.advertiser_id[i])) {
                        u.data.advertiser_id[i] = "DC-" + u.data.advertiser_id[i];
                    }
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p && u.toBoolean(u.data.fire_purchase)) {
                        u.data.event.push("purchase");
                        if (u.data.counting_method[0] === "") {
                            u.data.counting_method[0] = "transactions";
                        }
                    }
                }
                var total_qty = 0;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                } else {
                    total_qty = 1;
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        eventIdData.items = [];
                        for (k = 0; k < u.data.product_id.length; k++) {
                            if (typeof (u.data.product_unit_price[k]) === "undefined" || typeof (u.data.product_quantity[k]) === "undefined") {
                                utag.DB("No matching unit price or quantity for product ID " + u.data.product_id[k]);
                            } else {
                                eventIdData.items.push({
                                    "id": u.data.product_id[k],
                                    "price": u.data.product_unit_price[k],
                                    "quantity": u.data.product_quantity[k]
                                });
                            }
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        if (u.data.counting_method[j] && u.data.counting_method[j] !== u.data.counting_method[j].toLowerCase()) {
                            u.data.counting_method[j] = u.data.counting_method[j].toLowerCase();
                            utag.DB("Counting Method not supplied in proper case - converted to lower case");
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_547",
                        "attrs": {}
                    });
                }
                utag.DB("send:547:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("547", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.548 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.toBoolean = function (val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf('utag') > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    window[data_layer_name].push(arguments);
                };
                var cross_track_domains = "";
                if (cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.map = {
            "custom_metric_chat_initiated:1": "conversion",
            "advert_attributes": "custom.u7"
        };
        u.extend = [function (a, b) {
            try {
                if (1) {
                    b.advert_attributes = (typeof b.advert_attributes !== "undefined" ? b.advert_attributes : (typeof utag.data.advert_attributes !== "undefined" ? utag.data.advert_attributes : ""));
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:548");
                utag.DB(b);
                var c, d, e, f, h, i, j, k, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newcl000",
                    "counting_method": "standard",
                    "fire_purchase": "true",
                    "custom_scripts": "true",
                    "data_layer_name": "",
                    "session_id": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:548:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:548:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string" && u.data.advertiser_id !== "") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    if (!/^[a-zA-Z]{2}-/.test(u.data.advertiser_id[i])) {
                        u.data.advertiser_id[i] = "DC-" + u.data.advertiser_id[i];
                    }
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p && u.toBoolean(u.data.fire_purchase)) {
                        u.data.event.push("purchase");
                        if (u.data.counting_method[0] === "") {
                            u.data.counting_method[0] = "transactions";
                        }
                    }
                }
                var total_qty = 0;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                } else {
                    total_qty = 1;
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        eventIdData.items = [];
                        for (k = 0; k < u.data.product_id.length; k++) {
                            if (typeof (u.data.product_unit_price[k]) === "undefined" || typeof (u.data.product_quantity[k]) === "undefined") {
                                utag.DB("No matching unit price or quantity for product ID " + u.data.product_id[k]);
                            } else {
                                eventIdData.items.push({
                                    "id": u.data.product_id[k],
                                    "price": u.data.product_unit_price[k],
                                    "quantity": u.data.product_quantity[k]
                                });
                            }
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        if (u.data.counting_method[j] && u.data.counting_method[j] !== u.data.counting_method[j].toLowerCase()) {
                            u.data.counting_method[j] = u.data.counting_method[j].toLowerCase();
                            utag.DB("Counting Method not supplied in proper case - converted to lower case");
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_548",
                        "attrs": {}
                    });
                }
                utag.DB("send:548:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("548", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.549 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.hasOwn = function (o, a) {
            return o != null && Object.prototype.hasOwnProperty.call(o, a);
        };
        u.isEmptyObject = function (o, a) {
            for (a in o) {
                if (u.hasOwn(o, a)) {
                    return false;
                }
            }
            return true;
        };
        u.toBoolean = function (val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        };
        u.hasgtagjs = function () {
            window.gtagRename = window.gtagRename || "" || "gtag";
            if (utag.ut.gtagScriptRequested) {
                return true;
            }
            var i, s = document.getElementsByTagName("script");
            for (i = 0; i < s.length; i++) {
                if (s[i].src && s[i].src.indexOf("gtag/js") >= 0 && (s[i].id && s[i].id.indexOf('utag') > -1)) {
                    return true;
                }
            }
            var data_layer_name = "" || "dataLayer";
            window[data_layer_name] = window[data_layer_name] || [];
            if (typeof window[window.gtagRename] !== "function") {
                window[window.gtagRename] = function () {
                    window[data_layer_name].push(arguments);
                };
                var cross_track_domains = "";
                if (cross_track_domains !== "") {
                    window[window.gtagRename]("set", "linker", {
                        domains: cross_track_domains.split(","),
                        accept_incoming: true
                    });
                }
                window[window.gtagRename]("js", new Date());
            }
            return false;
        };
        u.scriptrequested = u.hasgtagjs();
        u.o = window[window.gtagRename];
        u.map_func = function (arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                u.map_func(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        };
        u.map = {
            "custom_metric_call_seller:1": "conversion",
            "advert_attributes": "custom.u7"
        };
        u.extend = [function (a, b) {
            try {
                if (1) {
                    b.advert_attributes = (typeof b.advert_attributes !== "undefined" ? b.advert_attributes : (typeof utag.data.advert_attributes !== "undefined" ? utag.data.advert_attributes : ""));
                }
            } catch (e) {
                utag.DB(e)
            }
        }];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:549");
                utag.DB(b);
                var c, d, e, f, h, i, j, k, _event, p, key;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "base_url": "https://www.googletagmanager.com/gtag/js",
                    "advertiser_id": "DC-8189056",
                    "activity_group": "micro0",
                    "activity": "newcl0",
                    "counting_method": "standard",
                    "fire_purchase": "true",
                    "custom_scripts": "true",
                    "data_layer_name": "",
                    "session_id": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "dc_custom_params": {},
                    "event_name": "",
                    "event": [],
                    "custom": {}
                };
                for (c = 0; c < u.extend.length; c++) {
                    try {
                        d = u.extend[c](a, b);
                        if (d == false) return
                    } catch (e) {}
                };
                utag.DB("send:549:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.map_func(e[f].split("."), u.data, b[d]);
                        }
                    } else {
                        h = d.split(":");
                        if (h.length === 2 && b[h[0]] === h[1]) {
                            if (u.map[d]) {
                                u.data.event = u.data.event.concat(u.map[d].split(","));
                            }
                        }
                    }
                }
                utag.DB("send:549:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || b._corder || "";
                u.data.order_total = u.data.order_total || b._ctotal || "";
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (typeof (u.data.advertiser_id) === "string" && u.data.advertiser_id !== "") {
                    u.data.advertiser_id = u.data.advertiser_id.split(",");
                }
                if (typeof (u.data.activity_group) === "string") {
                    u.data.activity_group = u.data.activity_group.split(",");
                }
                if (typeof (u.data.activity) === "string") {
                    u.data.activity = u.data.activity.split(",");
                }
                if (typeof (u.data.counting_method) === "string") {
                    u.data.counting_method = u.data.counting_method.split(",");
                }
                if (typeof (u.data.session_id) === "string") {
                    u.data.session_id = u.data.session_id.split(",");
                }
                if (u.data.product_id.length === 0 && b._cprod !== undefined) {
                    u.data.product_id = b._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && b._cquan !== undefined) {
                    u.data.product_quantity = b._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) {
                    u.data.product_unit_price = b._cprice.slice(0);
                }
                if (!u.data.advertiser_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    if (!/^[a-zA-Z]{2}-/.test(u.data.advertiser_id[i])) {
                        u.data.advertiser_id[i] = "DC-" + u.data.advertiser_id[i];
                    }
                }
                u.data.base_url += "?id=" + (u.data.advertiser_id[0]);
                if (u.data.data_layer_name) {
                    u.data.base_url = u.data.base_url + "&l=" + u.data.data_layer_name;
                }
                for (i = 0; i < u.data.advertiser_id.length; i++) {
                    u.o("config", u.data.advertiser_id[i]);
                }
                if (u.data.order_id) {
                    for (i = 0; i < u.data.event.length; i++) {
                        if (u.data.event[i] === "purchase") {
                            p = true;
                        }
                    }
                    if (!p && u.toBoolean(u.data.fire_purchase)) {
                        u.data.event.push("purchase");
                        if (u.data.counting_method[0] === "") {
                            u.data.counting_method[0] = "transactions";
                        }
                    }
                }
                var total_qty = 0;
                if (typeof (u.data.product_quantity) === "number") {
                    total_qty = u.data.product_quantity;
                } else if (u.data.product_quantity.length === 1) {
                    total_qty = u.data.product_quantity[0];
                } else if (u.data.product_quantity.length > 1) {
                    for (i = 0; i < u.data.product_quantity.length; i++) {
                        total_qty += parseInt(u.data.product_quantity[i], 10);
                    }
                } else {
                    total_qty = 1;
                }
                for (i = 0; i < u.data.event.length; i++) {
                    _event = u.data.event[i];
                    for (j = 0; j < u.data.advertiser_id.length; j++) {
                        var eventIdData = {};
                        if (u.data.custom_scripts === "true" || u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = true;
                        } else if (u.data.custom_scripts === "false" || !u.data.custom_scripts) {
                            eventIdData.allow_custom_scripts = false;
                        }
                        if (u.data.session_id.length === 1 && u.data.session_id[0] !== "") {
                            eventIdData.session_id = u.data.session_id[0];
                        } else if (u.data.session_id[j] !== "") {
                            eventIdData.session_id = u.data.session_id[j];
                        }
                        if (u.data.order_total) {
                            eventIdData.value = u.data.order_total;
                            eventIdData.transaction_id = u.data.order_id;
                        }
                        if (u.data.product_quantity) {
                            eventIdData.quantity = total_qty;
                        }
                        eventIdData.items = [];
                        for (k = 0; k < u.data.product_id.length; k++) {
                            if (typeof (u.data.product_unit_price[k]) === "undefined" || typeof (u.data.product_quantity[k]) === "undefined") {
                                utag.DB("No matching unit price or quantity for product ID " + u.data.product_id[k]);
                            } else {
                                eventIdData.items.push({
                                    "id": u.data.product_id[k],
                                    "price": u.data.product_unit_price[k],
                                    "quantity": u.data.product_quantity[k]
                                });
                            }
                        }
                        for (key in u.data.custom) {
                            eventIdData[key] = u.data.custom[key];
                        }
                        if (!u.isEmptyObject(u.data.dc_custom_params)) {
                            eventIdData.dc_custom_params = {};
                            for (key in u.data.dc_custom_params) {
                                eventIdData.dc_custom_params[key] = u.data.dc_custom_params[key];
                            }
                        }
                        if (u.data.counting_method[j] && u.data.counting_method[j] !== u.data.counting_method[j].toLowerCase()) {
                            u.data.counting_method[j] = u.data.counting_method[j].toLowerCase();
                            utag.DB("Counting Method not supplied in proper case - converted to lower case");
                        }
                        eventIdData.send_to = u.data.advertiser_id[j] + "/" + u.data.activity_group[j] + "/" + u.data.activity[j] + "+" + u.data.counting_method[j];
                        if (_event === "purchase") {
                            u.o("event", "purchase", eventIdData);
                        }
                        if (_event === "conversion") {
                            u.o("event", "conversion", eventIdData);
                        }
                    }
                }
                if (!u.hasgtagjs()) {
                    u.scriptrequested = true;
                    utag.ut.gtagScriptRequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "utag_549",
                        "attrs": {}
                    });
                }
                utag.DB("send:549:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("549", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.558 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _tvq = _tvq || [];
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.scriptrequested = false;
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:558");
                var c, d, e, f;
                u.data = {
                    "base_url": "//collector-##CLIENT_ID##.tvsquared.com/",
                    "client_id": "8067",
                    "brand_id": "TV-18903627-1",
                    "tracker_type": "visit",
                    "action_name": ""
                };
                utag.DB("send:558:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                utag.DB("send:558:MAPPINGS");
                utag.DB(u.data);
                u.data.site_id = u.data.site_id || u.data.brand_id;
                u.data.action_id = u.data.action_id || b._corder || "";
                u.data.revenue = u.data.revenue || b._csubtotal || "0";
                u.data.promocode = u.data.promocode || b._cpromo || "";
                if (u.data.product === undefined && b._ccat !== undefined && u.typeOf(b._ccat) === "array") {
                    u.data.product = b._ccat.slice(0)[0];
                }
                u.data.user_ref = u.data.user_ref || b._ccustid || "";
                if (!u.data.site_id) {
                    utag.DB(u.id + ": TVSquared is missing site_id. Tag aborted.")
                    return;
                }
                if (!u.data.client_id) {
                    utag.DB(u.id + ": TVSquared is missing client_id. Tag aborted.")
                    return;
                }
                _tvq.push(["setSiteId", u.data.site_id]);
                _tvq.push(["setTrackerUrl", u.data.base_url.replace("##CLIENT_ID##", u.data.client_id) + "tv2track.php"]);
                if (u.data.tracker_type == "action") {
                    if (!u.data.action_name) {
                        utag.DB(u.id + ": TVSquared is missing the following parameter for action tracking: action_name. Action tracking was aborted.")
                        return;
                    }
                    _tvq.push([function () {
                        this.setCustomVariable(5, "session", JSON.stringify({
                            "user": u.data.user_ref
                        }), "visit");
                    }]);
                    _tvq.push([function () {
                        this.setCustomVariable(5, u.data.action_name, JSON.stringify({
                            "rev": u.data.revenue,
                            "prod": u.data.product,
                            "id": u.data.action_id,
                            "promo": u.data.promocode
                        }), "page");
                    }]);
                    _tvq.push(["trackPageView"]);
                } else if (a === "view") {
                    _tvq.push([function () {
                        this.deleteCustomVariable(5, 'page');
                    }]);
                    _tvq.push(["trackPageView"]);
                }
                if (!u.scriptrequested) {
                    u.scriptrequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url.replace("##CLIENT_ID##", u.data.client_id) + "tv2track.js",
                        "cb": u.loader_cb,
                        "loc": "script",
                        "id": 'utag_558'
                    });
                }
                utag.DB("send:558:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("558", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.559 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _tvq = _tvq || [];
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.scriptrequested = false;
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:559");
                var c, d, e, f;
                u.data = {
                    "base_url": "//collector-##CLIENT_ID##.tvsquared.com/",
                    "client_id": "8067",
                    "brand_id": "TV-18903627-1",
                    "tracker_type": "action",
                    "action_name": "fullpageadviews"
                };
                utag.DB("send:559:EXTENSIONS");
                utag.DB(b);
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }
                utag.DB("send:559:MAPPINGS");
                utag.DB(u.data);
                u.data.site_id = u.data.site_id || u.data.brand_id;
                u.data.action_id = u.data.action_id || b._corder || "";
                u.data.revenue = u.data.revenue || b._csubtotal || "0";
                u.data.promocode = u.data.promocode || b._cpromo || "";
                if (u.data.product === undefined && b._ccat !== undefined && u.typeOf(b._ccat) === "array") {
                    u.data.product = b._ccat.slice(0)[0];
                }
                u.data.user_ref = u.data.user_ref || b._ccustid || "";
                if (!u.data.site_id) {
                    utag.DB(u.id + ": TVSquared is missing site_id. Tag aborted.")
                    return;
                }
                if (!u.data.client_id) {
                    utag.DB(u.id + ": TVSquared is missing client_id. Tag aborted.")
                    return;
                }
                _tvq.push(["setSiteId", u.data.site_id]);
                _tvq.push(["setTrackerUrl", u.data.base_url.replace("##CLIENT_ID##", u.data.client_id) + "tv2track.php"]);
                if (u.data.tracker_type == "action") {
                    if (!u.data.action_name) {
                        utag.DB(u.id + ": TVSquared is missing the following parameter for action tracking: action_name. Action tracking was aborted.")
                        return;
                    }
                    _tvq.push([function () {
                        this.setCustomVariable(5, "session", JSON.stringify({
                            "user": u.data.user_ref
                        }), "visit");
                    }]);
                    _tvq.push([function () {
                        this.setCustomVariable(5, u.data.action_name, JSON.stringify({
                            "rev": u.data.revenue,
                            "prod": u.data.product,
                            "id": u.data.action_id,
                            "promo": u.data.promocode
                        }), "page");
                    }]);
                    _tvq.push(["trackPageView"]);
                } else if (a === "view") {
                    _tvq.push([function () {
                        this.deleteCustomVariable(5, 'page');
                    }]);
                    _tvq.push(["trackPageView"]);
                }
                if (!u.scriptrequested) {
                    u.scriptrequested = true;
                    u.loader({
                        "type": "script",
                        "src": u.data.base_url.replace("##CLIENT_ID##", u.data.client_id) + "tv2track.js",
                        "cb": u.loader_cb,
                        "loc": "script",
                        "id": 'utag_559'
                    });
                }
                utag.DB("send:559:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("559", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.565 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag === undefined) {
            utag = {};
        }
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var a, b, c, l;
                a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    b.setAttribute("height", "1");
                    b.setAttribute("width", "1");
                    b.setAttribute("style", "display:none");
                    b.setAttribute("src", o.src);
                } else if (o.type === "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id;
                }
                if (typeof o.cb === "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState === "complete" || this.readyState === "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l === "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b);
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        u.ev = {
            'view': 1
        };
        u.initialized = false;
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f, i;
                u.data = {};
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            u.data[e[f]] = b[d];
                        }
                    }
                }! function (w, d, t) {
                    w.TiktokAnalyticsObject = t;
                    var ttq = w[t] = w[t] || [];
                    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"], ttq.setAndDefer = function (t, e) {
                        t[e] = function () {
                            t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                        }
                    };
                    for (var i = 0; i < ttq.methods.length; i++)
                        ttq.setAndDefer(ttq, ttq.methods[i]);
                    ttq.instance = function (t) {
                        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
                            ttq.setAndDefer(e, ttq.methods[n]);
                        return e
                    }, ttq.load = function (e, n) {
                        var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                        ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date(), ttq._o = ttq._o || {}, ttq._o[e] = n || {};
                        var o = document.createElement("script");
                        o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t;
                        var a = document.getElementsByTagName("script")[0];
                        a.parentNode.insertBefore(o, a)
                    };
                    ttq.load('BV8B4C9G18MG0UVLTLRG');
                    ttq.page();
                }(window, document, 'ttq');
            }
        };
        utag.o[loader].loader.LOAD(id);
    })("565", "autotrader.at-desktop");
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.571 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
var _qevents = _qevents || [];
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.initialized = false;
        u.scriptrequested = false;
        u.queue = [];
        u.map = {};
        u.extend = [];
        u.loader_cb = function () {
            utag.DB("send:571:CALLBACK");
            u.initialized = true;
            _qevents.push(u.data.g);
            utag.DB("send:571:CALLBACK:COMPLETE");
        };
        u.callBack = function () {
            var data = {};
            while (data = u.queue.shift()) {
                u.data = data.data;
                u.loader_cb();
            }
        };
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                var c, d, e, f, g;
                u.data = {
                    "base_url": (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js",
                    "qacct": "p-30XWBB9rlzR2E",
                    "source": "TLM",
                    "g": {}
                };
                var _at_user_id = b["cp.userid"] ? b["cp.userid"] : "";
                if (_at_user_id.startsWith("ID=")) {
                    _at_user_id = _at_user_id.substring(3);
                }
                u.data.g.qacct = "p-30XWBB9rlzR2E";
                if ("cars:search:ad-view:email-sent" === b.page_name) {
                    if (b.advert_attributes && b.advert_attributes.indexOf("allocated-stock") >= 0) {
                        u.data.g.labels = "_fp.event.New Car Lead confirmation";
                    } else {
                        u.data.g.labels = "_fp.event.Used Car Lead confirmation";
                    }
                    u.data.g.uid = _at_user_id;
                    u.data.g.orderid = b["ad_id"] ? b["ad_id"] : "";
                    u.data.g.event = "refresh";
                } else if ("cars:configurator:confirmation" === b.page_name) {
                    u.data.g.labels = "_fp.event.New Car Lead confirmation";
                    u.data.g.uid = _at_user_id;
                    u.data.g.orderid = b["qp.derivativeId"] ? b["qp.derivativeId"] : "";
                    u.data.g.event = "refresh";
                } else {
                    u.data.g.uid = _at_user_id;
                }
                u.data.g.source = u.data.source;
                if (u.initialized) {
                    u.loader_cb();
                } else {
                    u.queue.push({
                        "data": u.data
                    });
                    if (!u.scriptrequested) {
                        u.scriptrequested = true;
                        u.loader({
                            "type": "script",
                            "src": u.data.base_url,
                            "cb": u.callBack,
                            "loc": "script",
                            "id": "utag_571",
                            "attrs": {}
                        });
                    }
                }
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("571", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.572 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
window.usabilla || function () {
    var a = window,
        d = a.document,
        c = {},
        f = d.createElement("div"),
        h = !1,
        a = a.usabilla = function () {
            (c.a = c.a || []).push(arguments)
        };
    a._ = c;
    c.ids = {};
    f.style.display = "none";
    (function () {
        if (!d.body) return setTimeout(arguments.callee, 100);
        d.body.insertBefore(f, d.body.firstChild).id = "usabilla";
        h = !0
    })();
    a.load = function (a, g, k) {
        if (!c.ids[g]) {
            var e = c.ids = {};
            e.url = "//" + a + "/" + g + ".js?s1";
            e.config = k;
            setTimeout(function () {
                if (!h) return setTimeout(arguments.callee, 100);
                var b = d.createElement("iframe"),
                    a;
                b.id = "usabilla-" + g;
                /MSIE[ ]+6/.test(navigator.userAgent) && (b.src = "javascript:false");
                f.appendChild(b);
                try {
                    b.contentWindow.document.open()
                } catch (c) {
                    e.domain = d.domain, a = "javascript:var d=document.open();d.domain='" + e.domain + "';", b.src = a + "void(0);"
                }
                try {
                    var l = b.contentWindow.document;
                    l.write(["<!DOCTYPE html><html><head></head><body onload=\"var d = document;d.getElementsByTagName('head')[0].appendChild(d.createElement('script')).src='", e.url, "'\"></body></html>"].join(""));
                    l.close()
                } catch (m) {
                    b.src = a + 'd.write("' + loaderHtml().replace(/"/g, String.fromCharCode(92) + '"') + '");d.close();'
                }
                b.contentWindow.config = k;
                b.contentWindow.SCRIPT_ID = g
            }, 0)
        }
    }
}();
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        var match = /ut\d\.(\d*)\..*/.exec(utag.cfg.v);
        if (utag.ut.loader === undefined || !match || parseInt(match[1]) < 41) {
            u.loader = function (o, a, b, c, l, m) {
                utag.DB(o);
                a = document;
                if (o.type == "iframe") {
                    m = a.getElementById(o.id);
                    if (m && m.tagName == "IFRAME") {
                        b = m;
                    } else {
                        b = a.createElement("iframe");
                    }
                    o.attrs = o.attrs || {};
                    utag.ut.merge(o.attrs, {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    }, 0);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                }
                if (o.id) {
                    b.id = o.id;
                }
                for (l in utag.loader.GV(o.attrs)) {
                    b.setAttribute(l, o.attrs[l]);
                }
                b.setAttribute("src", o.src);
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb();
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == "complete" || this.readyState == "loaded") {
                                this.onreadystatechange = null;
                                o.cb();
                            }
                        };
                    }
                }
                if (o.type != "img" && !m) {
                    l = o.loc || "head";
                    c = a.getElementsByTagName(l)[0];
                    if (c) {
                        utag.DB("Attach to " + l + ": " + o.src);
                        if (l == "script") {
                            c.parentNode.insertBefore(b, c);
                        } else {
                            c.appendChild(b);
                        }
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        if (utag.ut.typeOf === undefined) {
            u.typeOf = function (e) {
                return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
            };
        } else {
            u.typeOf = utag.ut.typeOf;
        }
        u.ev = {
            "view": 1
        };
        u.scriptrequested = false;
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || u.ev.all !== undefined) {
                utag.DB("send:572");
                utag.DB(b);
                var c, d, e, f;
                u.data = {
                    "base_url": "w.usabilla.com",
                    "account_id": "9ff5d89995f2",
                    "element_id": "usabilla-in-page-widget",
                    "widget_code": "xxxxxxxxxxxxxxxxxxxxxxxx",
                    "custom": {}
                };
                utag.DB("send:572:EXTENSIONS");
                utag.DB(b);
                c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            if (u.data.hasOwnProperty(e[f])) {
                                u.data[e[f]] = b[d];
                            } else {
                                u.data.custom[e[f]] = b[d];
                            }
                        }
                    }
                }
                utag.DB("send:572:MAPPINGS");
                utag.DB(u.data);
                if (!u.data.account_id) {
                    utag.DB(u.id + ": Tag not fired: Required attribute not populated");
                    return;
                }

                function addDiv(id, code, params) {
                    var d, e;
                    e = document.getElementById(id);
                    d = document.createElement('div');
                    d.id = "in-page-id";
                    d.setAttribute("ub-in-page", code);
                    for (var key in params) {
                        d.setAttribute("ub-in-page-" + key, params[key]);
                    }
                    try {
                        e.appendChild(d);
                    } catch (error) {
                        utag.DB("ERROR:572:" + error);
                    };
                }
                var inPageElement = document.getElementById('in-page-id');
                if (inPageElement == null) {
                    if (u.data.element_id && u.data.widget_code) {
                        addDiv(u.data.element_id, u.data.widget_code, u.data.custom)
                    } else {
                        utag.DB("572 - Usabilla in-page not fired, required div not found on page.");
                        return false;
                    }
                }
                if (!u.scriptrequested) {
                    u.scriptrequested = true;
                    window.usabilla.load(u.data.base_url, u.data.account_id);
                }
                utag.DB("send:572:COMPLETE");
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("572", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.577 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
if (!window.cj) window.cj = {};
try {
    (function (id, loader) {
        var u = {
            "id": id
        };
        utag.o[loader].sender[id] = u;
        u.ev = {
            "view": 1
        };
        u.scriptrequested = false;
        u.map = {};
        u.extend = [];
        u.send = function (utag_event, data_layer) {
            if (u.ev[utag_event] || u.ev.all !== undefined) {
                utag.DB("send:577");
                utag.DB(data_layer);
                var a, b, c, d, i;
                a = utag_event;
                b = data_layer;
                u.data = {
                    "base_url": "",
                    "proxyPath": "",
                    "tagId": "20005",
                    "actionTrackerId": "428413",
                    "enterpriseId": "1563355",
                    "enablePageVisit": "true",
                    "order_id": "",
                    "order_subtotal": "",
                    "order_currency": "",
                    "order_coupon_code": "",
                    "product_id": [],
                    "product_quantity": [],
                    "product_unit_price": [],
                    "product_discount": []
                };
                utag.DB("send:577:EXTENSIONS");
                utag.DB(data_layer);
                for (var mapping_key in utag.loader.GV(u.map)) {
                    if (data_layer[mapping_key] !== undefined && data_layer[mapping_key] !== "") {
                        var destinations = u.map[mapping_key].split(",");
                        for (i = 0; i < destinations.length; i++) {
                            mapFunc(destinations[i].split("."), u.data, data_layer[mapping_key]);
                        }
                    }
                }
                utag.DB("send:577:MAPPINGS");
                utag.DB(u.data);
                u.data.order_id = u.data.order_id || data_layer._corder || "";
                u.data.order_subtotal = u.data.order_subtotal || data_layer._csubtotal || "";
                u.data.order_currency = u.data.order_currency || data_layer._ccurrency || "";
                u.data.order_coupon_code = u.data.order_coupon_code || data_layer._cpromo || "";
                u.data.customer_id = u.data.customer_id || data_layer._ccustid || "";
                if (u.data.product_id.length === 0 && data_layer._cprod !== undefined) {
                    u.data.product_id = data_layer._cprod.slice(0);
                }
                if (u.data.product_quantity.length === 0 && data_layer._cquan !== undefined) {
                    u.data.product_quantity = data_layer._cquan.slice(0);
                }
                if (u.data.product_unit_price.length === 0 && data_layer._cprice !== undefined) {
                    u.data.product_unit_price = data_layer._cprice.slice(0);
                }
                if (u.data.product_discount.length === 0 && data_layer._cpdisc !== undefined) {
                    u.data.product_discount = data_layer._cpdisc.slice(0);
                }
                if (!u.data.proxyPath && !u.data.tagId) {
                    utag.DB(u.id + ": Tag not fired: Either a proxyPath or tagId is required.");
                    return;
                }
                if (u.data.proxyPath) {
                    u.data.base_url = u.data.proxyPath;
                } else {
                    u.data.base_url = "//www.mczbf.com/tags/" + u.data.tagId + "/tag.js";
                }
                if (!u.data.order_id && toBoolean(u.data.enablePageVisit)) {
                    var sitePageParams = {
                        enterpriseId: "enterpriseId",
                        pageType: "pageType",
                        userId: "customer_id",
                        emailHash: "emailHash",
                        referringChannel: "referringChannel",
                        cartSubtotal: "order_subtotal",
                        items: ""
                    };
                    window.cj.sitePage = createDataObj(sitePageParams, u.data);
                }
                if (u.data.order_id) {
                    if (!u.data.enterpriseId || !u.data.actionTrackerId || !u.data.order_currency || !u.data.order_subtotal) {
                        utag.DB(u.id + ": Order requires parameters: enterpriseId, actionTrackerId, order_currency and order_subtotal");
                    } else {
                        var orderParams = {
                            enterpriseId: "enterpriseId",
                            actionTrackerId: "actionTrackerId",
                            orderId: "order_id",
                            currency: "order_currency",
                            amount: "order_subtotal",
                            discount: "order_discount",
                            coupon: "order_coupon_code",
                            items: "",
                            bypassChannel: "bypassChannel",
                            brand: "brand",
                            brandId: "brandId",
                            category: "category",
                            customerStatus: "customerStatus",
                            delivery: "delivery",
                            marketingChannel: "marketingChannel",
                            loyaltyEarned: "loyaltyEarned",
                            loyaltyFirstTimeSignup: "loyaltyFirstTimeSignup",
                            loyaltyLevel: "loyaltyLevel",
                            loyaltyRedeemed: "loyaltyRedeemed",
                            loyaltyStatus: "loyaltyStatus"
                        };
                        window.cj.order = createDataObj(orderParams, u.data);
                    }
                }
                if (!u.scriptrequested) {
                    u.scriptrequested = true;
                    utag.ut.loader({
                        "type": "script",
                        "src": u.data.base_url,
                        "cb": null,
                        "loc": "script",
                        "id": "cjapitag",
                        "attrs": {}
                    });
                }
                utag.DB("send:577:COMPLETE");
            }
        };

        function mapFunc(arr, obj, item) {
            var i = arr.shift();
            obj[i] = obj[i] || {};
            if (arr.length > 0) {
                mapFunc(arr, obj[i], item);
            } else {
                obj[i] = item;
            }
        }

        function toBoolean(val) {
            val = val || "";
            return val === true || val.toLowerCase() === "true" || val.toLowerCase() === "on";
        }

        function getItems(data) {
            var paramObj = {
                unitPrice: "product_unit_price",
                itemId: "product_id",
                quantity: "product_quantity",
                discount: "product_discount"
            };
            var items = [];
            var item;
            var param;
            for (var i = 0; i < data.product_id.length; i++) {
                item = {};
                for (param in paramObj) {
                    if (data[paramObj[param]][i]) {
                        item[param] = param === "itemId" ? data[paramObj[param]][i] : parseFloat(data[paramObj[param]][i]);
                    }
                }
                if (!item.unitPrice) {
                    utag.DB(u.id + ": Missing, required unitPrice for itemId: " + item.itemId);
                }
                if (!item.quantity) {
                    utag.DB(u.id + ": Missing, required quantity for itemId: " + item.itemId);
                }
                items.push(item);
            }
            return items;
        }

        function createDataObj(paramObj, data) {
            var obj = {};
            for (var param in paramObj) {
                if (param === "items") {
                    obj[param] = getItems(data);
                } else if (data[paramObj[param]]) {
                    obj[param] = param.match(/amount|discount|cartSubtotal/) ? parseFloat(data[paramObj[param]]) : data[paramObj[param]];
                }
            }
            return obj;
        }
        utag.o[loader].loader.LOAD(id);
    }("577", "autotrader.at-desktop"));
} catch (error) {
    utag.DB(error);
}

//tealium universal tag - utag.578 ut4.0.202105211620, Copyright 2021 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var a, b, c, l;
                a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    b.setAttribute("height", "1");
                    b.setAttribute("width", "1");
                    b.setAttribute("style", "display:none");
                    b.setAttribute("src", o.src);
                } else if (o.type === "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id;
                }
                if (typeof o.cb === "function") {
                    b.hFlag = 0;
                    b.onreadystatechange = function () {
                        if ((this.readyState === "complete" || this.readyState === "loaded") && !b.hFlag) {
                            b.hFlag = 1;
                            o.cb();
                        }
                    };
                    b.onload = function () {
                        if (!b.hFlag) {
                            b.hFlag = 1;
                            o.cb();
                        }
                    };
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l === "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b);
                    }
                }
            };
        } else {
            u.loader = utag.ut.loader;
        }
        u.ev = {
            "view": 1,
            "link": 1
        };
        u.check = function (a, b, c) {
            c = 0;
            for (var d in b) {
                c += a == b[d] ? 1 : 0;
            }
            return c > 0;
        };
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || typeof u.ev.all !== "undefined") {
                var c, d, e, f;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "cid": "1563355",
                    "stype": "standard",
                    "aid": "428413",
                    "containerid": "20005",
                    "referralperiod": "40",
                    "base_url": "//www.emjcd.com/",
                    "name": "",
                    "CJEVENT": "",
                    "OID": "",
                    "CURRENCY": "",
                    "AMOUNT": "",
                    "ITEM1": "",
                    "AMT1": "0.00",
                    "QTY1": "1"
                };
                c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (b[d] !== undefined && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            if (u.data.hasOwnProperty(e[f])) {
                                u.data[e[f]] = b[d];
                            } else {
                                c.push(e[f] + u.data.kvp_delim + b[d]);
                            }
                        }
                    }
                }
                utag.DB("send:578:MAPPINGS");
                utag.DB(u.data);
                var _cprod = b._cprod ? b._cprod.slice(0) : [];
                var _cprice = 0;
                var _corder = "";
                if ("view" === a && b.page_name) {
                    if ("cars:search:ad-view:email-sent" === b.page_name) {
                        if (b.advert_attributes && (b.advert_attributes.indexOf("allocated-stock") >= 0 || b.advert_attributes.indexOf("network-stock") >= 0)) {
                            _corder = "LEAD_NEW";
                        } else {
                            _corder = "LEAD_USED";
                        }
                    } else if ("cars:pola:new:step4a:payment-accepted" === b.page_name) {
                        if (b.order_total) {
                            _cprice = b.order_total.replace(/[^0-9]+/gi, '');
                        }
                        _corder = "POLA";
                    } else if ("cars:leasing:confirmation" === b.page_name) {
                        _corder = "LEASE";
                    } else if ("reservations-reserved" === b.page_name) {
                        _corder = "RESERVE";
                    } else if ("cars:condition-report-app:valuation-submitted" === b.page_name) {
                        _corder = "INST_OFFER";
                    } else if ("cars:condition-report-app:gpx-confirmation" === b.page_name) {
                        _corder = "GPX";
                    } else if (/cars:motoring-products:valuations:your\s*valuation:(selling|buying)/.test(b.page_name)) {
                        _corder = "VALUATION";
                    } else {
                        return;
                    }
                } else if ("link" === a && b["dom.pathname"] && "click" === b.action) {
                    if ("/cars/electric/giveaway" === b["dom.pathname"] && "competition entry" === b.label) {
                        _corder = "EV_GIVEAWAY";
                    } else if ("leads-link" === b.category && "call button" === b.label) {
                        if (b["dom.pathname"].startsWith("/classified/advert/new/")) {
                            _corder = "LEAD_NEW";
                        } else {
                            _corder = "LEAD_USED";
                        }
                    } else {
                        return;
                    }
                } else {
                    return;
                }
                u.data.ITEM1 = (u.data.ITEM1 !== "") ? u.data.ITEM1 : _corder;
                var referralperiod = parseInt(u.data.referralperiod) || 0;
                if (referralperiod < 0) {
                    referralperiod = 0;
                }
                if (referralperiod > 120) {
                    referralperiod = 120;
                }
                if (u.data.CJEVENT === "") {
                    if (b["qp.cjevent"]) {
                        u.data.CJEVENT = b["qp.cjevent"];
                    } else {
                        u.data.CJEVENT = b["cp.cje"] || "";
                    }
                }
                u.data.OID = (u.data.OID !== "") ? u.data.OID : b.tealium_random;
                if (typeof u.data.OID !== "undefined" && u.data.OID && typeof u.data.ITEM1 !== "undefined" && u.data.ITEM1 && u.data.ITEM1 !== "") {
                    u.data.CURRENCY = (u.data.CURRENCY !== "") ? u.data.CURRENCY : b.currency;
                    u.data.AMT1 = (u.data.AMT1 !== "") ? u.data.AMT1 : _cprice;
                    c.push("CID" + u.data.kvp_delim + u.data.cid);
                    c.push("OID" + u.data.kvp_delim + u.data.OID);
                    c.push("TYPE" + u.data.kvp_delim + u.data.aid);
                    c.push("AMOUNT" + u.data.kvp_delim + (u.data.AMOUNT !== "" ? u.data.AMOUNT : "0.00"));
                    c.push("CURRENCY" + u.data.kvp_delim + (u.data.CURRENCY !== "" ? u.data.CURRENCY : "GBP"));
                    c.push("AMT1" + u.data.kvp_delim + (u.data.AMT1 !== "" ? u.data.AMT1 : "0.00"));
                    c.push("QTY1" + u.data.kvp_delim + (u.data.QTY1 !== "" ? u.data.QTY1 : "1"));
                    c.push("ITEM1" + u.data.kvp_delim + u.data.ITEM1);
                    if (u.data.CJEVENT) {
                        c.push("CJEVENT" + u.data.kvp_delim + u.data.CJEVENT);
                    }
                    if (u.data.name) {
                        c.push("name" + u.data.kvp_delim + u.data.name);
                    }
                }
                if (u.data.containerid === "") {
                    u.data.base_url += "u?";
                    c.push("METHOD" + u.data.kvp_delim + "IMG");
                    u.data.img = new Image();
                    u.data.img.src = u.data.base_url + c.join(u.data.qsp_delim);
                } else {
                    u.data.base_url += "tags/c?containerTagId" + u.data.kvp_delim + u.data.containerid + u.data.qsp_delim;
                    d = document.createElement("iframe");
                    d.setAttribute("id", "578");
                    d.setAttribute("height", "1");
                    d.setAttribute("width", "1");
                    d.setAttribute("style", "display:none");
                    d.setAttribute("src", u.data.base_url + c.join(u.data.qsp_delim));
                    document.body.appendChild(d);
                }
            }
        };
        try {
            utag.o[loader].loader.LOAD(id);
        } catch (e) {
            utag.loader.LOAD(id);
        }
    })("578", "autotrader.at-desktop");
} catch (e) {
    utag.DB(e);
}
(function () {
    if (typeof utag != 'undefined' && !utag_condload) {
        utag.initcatch = true;
        for (var i in utag.loader.GV(utag.loader.cfg)) {
            var b = utag.loader.cfg[i];
            if (b.load != 4) {
                utag.initcatch = false;
                break
            };
            if (b.wait == 1) {
                utag.initcatch = false;
                break
            }
        };
        if (utag.initcatch) utag.handler.INIT();
    }
})();