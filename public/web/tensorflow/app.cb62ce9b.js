(function (t) {
    function e(e) {
        for (var n, s, r = e[0], h = e[1], c = e[2], d = 0, g = []; d < r.length; d++)
            s = r[d],
            Object.prototype.hasOwnProperty.call(a, s) && a[s] && g.push(a[s][0]),
            a[s] = 0;
        for (n in h)
            Object.prototype.hasOwnProperty.call(h, n) && (t[n] = h[n]);
        l && l(e);
        while (g.length)
            g.shift()();
        return o.push.apply(o, c || []),
            i()
    }

    function i() {
        for (var t, e = 0; e < o.length; e++) {
            for (var i = o[e], n = !0, r = 1; r < i.length; r++) {
                var h = i[r];
                0 !== a[h] && (n = !1)
            }
            n && (o.splice(e--, 1),
                t = s(s.s = i[0]))
        }
        return t
    }
    var n = {},
        a = {
            app: 0
        },
        o = [];

    function s(e) {
        if (n[e])
            return n[e].exports;
        var i = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, s),
            i.l = !0,
            i.exports
    }
    s.m = t,
        s.c = n,
        s.d = function (t, e, i) {
            s.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: i
            })
        },
        s.r = function (t) {
            "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                    value: "Module"
                }),
                Object.defineProperty(t, "__esModule", {
                    value: !0
                })
        },
        s.t = function (t, e) {
            if (1 & e && (t = s(t)),
                8 & e)
                return t;
            if (4 & e && "object" === typeof t && t && t.__esModule)
                return t;
            var i = Object.create(null);
            if (s.r(i),
                Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: t
                }),
                2 & e && "string" != typeof t)
                for (var n in t)
                    s.d(i, n, function (e) {
                            return t[e]
                        }
                        .bind(null, n));
            return i
        },
        s.n = function (t) {
            var e = t && t.__esModule ? function () {
                    return t["default"]
                } :
                function () {
                    return t
                };
            return s.d(e, "a", e),
                e
        },
        s.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        },
        s.p = "/wear-a-mask/";
    var r = window["webpackJsonp"] = window["webpackJsonp"] || [],
        h = r.push.bind(r);
    r.push = e,
        r = r.slice();
    for (var c = 0; c < r.length; c++)
        e(r[c]);
    var l = h;
    o.push([0, "chunk-vendors"]),
        i()
})({
    0: function (t, e, i) {
        t.exports = i("56d7")
    },
    "034f": function (t, e, i) {
        "use strict";
        var n = i("85ec"),
            a = i.n(n);
        a.a
    },
    "0632": function (t, e, i) {
        "use strict";
        var n = i("613b"),
            a = i.n(n);
        a.a
    },
    1: function (t, e) {},
    2: function (t, e) {},
    "225e": function (t, e, i) {
        "use strict";
        var n = i("a659"),
            a = i.n(n);
        a.a
    },
    "2a07": function (t, e, i) {
        t.exports = i.p + "img/icon-share.03e4f3c4.svg"
    },
    3: function (t, e) {},
    "56d7": function (t, e, i) {
        "use strict";
        i.r(e);
        i("e260"),
            i("e6cf"),
            i("cca6"),
            i("a79d");
        var n = i("2b0e"),
            a = function () {
                var t = this,
                    e = t.$createElement,
                    i = t._self._c || e;
                return i("div", {
                    attrs: {
                        id: "app"
                    }
                }, [i("div", {
                    class: {
                        "show-language-list": t.showLanguageList
                    },
                    attrs: {
                        id: "indexUI"
                    }
                }, [i("div", {
                    style: {
                        height: t.$t("logo.height") + "vh"
                    },
                    attrs: {
                        id: "header"
                    }
                }, [i("img", {
                    attrs: {
                        id: "logo",
                        src: t.logoBaseUrl + t.$t("logo.filename")
                    }
                }), i("little-button", {
                    attrs: {
                        id: "language",
                        width: t.$t("languageBtn.width"),
                        icon: "language",
                        text: t.$t("languageBtn.text")
                    },
                    on: {
                        click: t.language
                    }
                }), i("a", {
                    attrs: {
                        id: "forkMe",
                        href: "https://github.com/zamhown/wear-a-mask"
                    }
                }, [t._v("Fork me on GitHub!")])], 1), i("div", {
                    style: {
                        height: 100 - t.$t("logo.height") + "vh"
                    },
                    attrs: {
                        id: "contentContainer"
                    }
                }, [i("div", {
                    attrs: {
                        id: "content"
                    }
                }, [i("Index", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: "index" == t.nav,
                        expression: "nav=='index'"
                    }],
                    on: {
                        navTo: t.navTo
                    }
                }), i("Editor", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: "editor" == t.nav,
                        expression: "nav=='editor'"
                    }],
                    attrs: {
                        fileId: t.currentFileId
                    },
                    on: {
                        navTo: t.navTo
                    }
                }), "export" == t.nav ? i("Export", {
                    on: {
                        navTo: t.navTo
                    }
                }) : t._e(), "share" == t.nav ? i("Share", {
                    on: {
                        navTo: t.navTo
                    }
                }) : t._e()], 1)])]), t.showLanguageList ? i("div", {
                    attrs: {
                        id: "languageLayer"
                    }
                }, [i("div", {
                    style: {
                        width: t.$t("languageList.width")
                    }
                }, [i("p", [i("b", [t._v(t._s(t.$t("languageList.title")))])]), i("ul", t._l(t.$i18n.messages, (function (e, n) {
                    return i("li", {
                        key: n,
                        class: {
                            selected: t.$i18n.locale == n
                        },
                        on: {
                            click: function (e) {
                                return t.selectLanguage(n)
                            }
                        }
                    }, [t._v(t._s(e.language))])
                })), 0)])]) : t._e()])
            },
            o = [],
            s = function () {
                var t = this,
                    e = t.$createElement,
                    i = t._self._c || e;
                return i("div", {
                    ref: "index"
                }, [t._m(0), i("p", {
                    staticClass: "title",
                    style: {
                        letterSpacing: t.$t("index.title.letterSpacing")
                    }
                }, [t._v(t._s(t.$t("index.title.text")))]), i("p", {
                    staticClass: "slogan",
                    style: {
                        letterSpacing: t.$t("index.slogan.letterSpacing")
                    }
                }, [t.wide ? t._e() : i("span", {
                    domProps: {
                        innerHTML: t._s(t.$t("index.slogan.space"))
                    }
                }), i("span", [t._v(t._s(t.$t("index.slogan.text1")))]), t.wide ? t._e() : i("br"), t.wide ? t._e() : i("span", {
                    domProps: {
                        innerHTML: t._s(t.$t("index.slogan.space"))
                    }
                }), i("span", [t._v(t._s(t.$t("index.slogan.text2")))])]), i("div", {
                    staticClass: "upload",
                    style: {
                        width: t.$t("index.selectImg.width")
                    }
                }, [i("span", [t._v(t._s(t.$t("index.selectImg.text")))]), i("input", {
                    ref: "inputer",
                    staticClass: "upload",
                    attrs: {
                        type: "file",
                        accept: "image/*"
                    },
                    on: {
                        change: t.addImg
                    }
                })]), i("p", {
                    staticClass: "description",
                    style: {
                        letterSpacing: t.$t("index.description.letterSpacing")
                    }
                }, [t._v(t._s(t.$t("index.description.text1")))]), i("p", {
                    staticClass: "description",
                    style: {
                        letterSpacing: t.$t("index.description.letterSpacing")
                    }
                }, [t._v(t._s(t.$t("index.description.text2")))])])
            },
            r = [function () {
                var t = this,
                    e = t.$createElement,
                    n = t._self._c || e;
                return n("p", [n("img", {
                    staticClass: "example",
                    attrs: {
                        src: i("96e3")
                    }
                })])
            }],
            h = {
                data: function () {
                    return {
                        wide: !1
                    }
                },
                methods: {
                    addImg: function () {
                        var t = this.$refs.inputer;
                        if (1 == t.files.length) {
                            var e = {
                                file: t.files[0],
                                id: (new Date).getTime()
                            };
                            this.$store.commit("setUserImgInfo", e),
                                this.$emit("navTo", "editor", e.id)
                        }
                    }
                },
                mounted: function () {
                    this.wide = this.$refs.index.clientWidth > 500
                }
            },
            c = h,
            l = (i("225e"),
                i("2877")),
            d = Object(l["a"])(c, s, r, !1, null, "0847622a", null),
            g = d.exports,
            u = function () {
                var t = this,
                    e = t.$createElement,
                    i = t._self._c || e;
                return i("div", {
                    ref: "editor",
                    attrs: {
                        id: "editor"
                    }
                }, [i("div", {
                    class: {
                        loading: t.loading
                    },
                    attrs: {
                        id: "editorUI"
                    }
                }, [i("div", {
                    ref: "canvasContainer"
                }), i("little-button", {
                    attrs: {
                        id: "resetBtn",
                        width: t.$t("editor.reset.width"),
                        icon: "reset",
                        text: t.$t("editor.reset.text")
                    },
                    on: {
                        click: t.resetMask
                    }
                }), i("div", {
                    ref: "maskStore",
                    attrs: {
                        id: "maskStore"
                    }
                }, [i("p", {
                    staticClass: "title"
                }, [t._v(t._s(t.$t("editor.changeMask")))]), i("div", {
                    staticClass: "list"
                }, [i("ul", t._l(t.maskData.masks, (function (e) {
                    return i("li", {
                        key: e.name,
                        on: {
                            click: function (i) {
                                return t.changeMask(e)
                            }
                        }
                    }, [i("img", {
                        attrs: {
                            src: t.maskData.baseUrl + e.name
                        }
                    })])
                })), 0)])]), i("div", {
                    ref: "control",
                    staticClass: "control"
                }, [i("button", {
                    style: {
                        width: t.$t("editor.reselectImg.width")
                    },
                    attrs: {
                        id: "reuploadBtn"
                    },
                    on: {
                        click: t.reupload
                    }
                }, [t._v(t._s(t.$t("editor.reselectImg.text")))]), i("button", {
                    style: {
                        width: t.$t("editor.saveImg.width")
                    },
                    attrs: {
                        id: "saveBtn"
                    },
                    on: {
                        click: t.save
                    }
                }, [t._v(t._s(t.$t("editor.saveImg.text")))])])], 1), t.loading ? i("div", {
                    attrs: {
                        id: "loading"
                    }
                }, [i("div", {
                    style: {
                        width: t.$t("editor.loading.width"),
                        height: t.$t("editor.loading.height")
                    }
                }, [i("p", [i("b", [t._v(t._s(t.$t("editor.loading.title")))]), i("br"), t._v(" " + t._s(t.$t("editor.loading.text1")) + " "), i("br"), t._v(" " + t._s(t.$t("editor.loading.text2")) + " ")])])]) : t._e()])
            },
            m = [],
            f = (i("a9e3"),
                function () {
                    var t = this,
                        e = t.$createElement,
                        n = t._self._c || e;
                    return n("button", {
                        style: {
                            width: t.width
                        },
                        on: {
                            click: t.click
                        }
                    }, ["language" == t.icon ? n("img", {
                        attrs: {
                            src: i("b2ee")
                        }
                    }) : t._e(), "reset" == t.icon ? n("img", {
                        attrs: {
                            src: i("baeb")
                        }
                    }) : t._e(), "share" == t.icon ? n("img", {
                        attrs: {
                            src: i("2a07")
                        }
                    }) : t._e(), n("span", [t._v(t._s(t.text))])])
                }
            ),
            p = [],
            v = {
                props: {
                    text: String,
                    icon: String,
                    width: String
                },
                methods: {
                    click: function (t) {
                        this.$emit("click", t)
                    }
                }
            },
            w = v,
            b = (i("0632"),
                Object(l["a"])(w, f, p, !1, null, "25790556", null)),
            x = b.exports,
            P = (i("4160"),
                i("d3b7"),
                i("3ca3"),
                i("159b"),
                i("ddb0"),
                i("96cf"),
                i("1da1")),
            k = i("ab39"),
            I = (i("4de4"),
                i("b0c0"),
                i("2af1"),
                i("2b3d"),
                i("3835")),
            y = {
                maskBaseUrl: "",
                modelBaseUrl: "",
                assetsBaseUrl: "//zamhown.gitee.io/wear-a-mask/assets/"
            },
            M = {
                baseUrl: y.maskBaseUrl,
                masks: [{
                    name: "n1.png",
                    width: 256,
                    height: 256,
                    side: 0,
                    leftPoint: [4, 90],
                    rightPoint: [248, 90],
                    bottomPoint: [130, 216]
                }, {
                    name: "n2.png",
                    width: 256,
                    height: 256,
                    side: 0,
                    leftPoint: [3, 71],
                    rightPoint: [255, 71],
                    bottomPoint: [129, 231]
                }, {
                    name: "n2.png",
                    width: 256,
                    height: 256,
                    side: 0,
                    leftPoint: [6, 81],
                    rightPoint: [249, 81],
                    bottomPoint: [131, 246]
                }]
            },
            L = {
                getMidPoint: function (t, e) {
                    var i = Object(I["a"])(t, 2),
                        n = i[0],
                        a = i[1],
                        o = Object(I["a"])(e, 2),
                        s = o[0],
                        r = o[1];
                    return [(n + s) / 2, (a + r) / 2]
                },
                makeLine: function (t, e) {
                    var i = Object(I["a"])(t, 2),
                        n = i[0],
                        a = i[1],
                        o = Object(I["a"])(e, 2),
                        s = o[0],
                        r = o[1];
                    return [a - r, s - n, (n - s) * r + (r - a) * s]
                },
                pointDistance: function (t, e) {
                    var i = Object(I["a"])(t, 2),
                        n = i[0],
                        a = i[1],
                        o = Object(I["a"])(e, 2),
                        s = o[0],
                        r = o[1];
                    return Math.sqrt((n - s) * (n - s) + (a - r) * (a - r))
                },
                pointLineDistance: function (t, e) {
                    var i = Object(I["a"])(t, 2),
                        n = i[0],
                        a = i[1],
                        o = Object(I["a"])(e, 3),
                        s = o[0],
                        r = o[1],
                        h = o[2];
                    return Math.abs(s * n + r * a + h) / Math.sqrt(s * s + r * r)
                },
                makePerpendicularLine: function (t, e) {
                    var i = Object(I["a"])(t, 2),
                        n = i[0],
                        a = i[1],
                        o = Object(I["a"])(e, 2),
                        s = o[0],
                        r = o[1];
                    return [-a, n, a * s - n * r]
                },
                getCrossPointOfTwoLines: function (t, e) {
                    var i = Object(I["a"])(t, 3),
                        n = i[0],
                        a = i[1],
                        o = i[2],
                        s = Object(I["a"])(e, 3),
                        r = s[0],
                        h = s[1],
                        c = s[2],
                        l = n * h - r * a;
                    return [(a * c - h * o) / l, (r * o - n * c) / l]
                },
                getPerpendicularPoint: function (t, e) {
                    return this.getCrossPointOfTwoLines(t, this.makePerpendicularLine(t, e))
                },
                getAngle: function (t, e, i) {
                    var n = Object(I["a"])(t, 2),
                        a = n[0],
                        o = n[1],
                        s = Object(I["a"])(e, 2),
                        r = s[0],
                        h = s[1],
                        c = Object(I["a"])(i, 2),
                        l = c[0],
                        d = c[1],
                        g = r - a,
                        u = o - h,
                        m = l - a,
                        f = o - d,
                        p = Math.sqrt(g * g + u * u) * Math.sqrt(m * m + f * f);
                    if (0 === p)
                        return -1;
                    var v = Math.acos((g * m + u * f) / p),
                        w = a - l,
                        b = o - d;
                    return w < 0 && b < 0 ? v : w < 0 && b > 0 ? v : w > 0 && b < 0 ? 2 * Math.PI - v : w > 0 && b > 0 ? 2 * Math.PI - v : null
                }
            },
            _ = i("af87");

        function $(t) {
            return [t.x, t.y]
        }
        var S = {
                maskImageSrc: {},
                findMask: function (t, e, i, n) {
                    var a = this,
                        o = Number.MAX_VALUE,
                        s = null;
                    return M.masks.filter((function (t) {
                            return 0 == t.side && 0 == n || t.side * n > 0
                        })).forEach((function (r) {
                            var h = L.pointDistance(r.leftPoint, r.rightPoint),
                                c = L.pointDistance(r.leftPoint, r.bottomPoint),
                                l = L.pointLineDistance(r.bottomPoint, L.makeLine(r.leftPoint, r.rightPoint)),
                                d = Math.sqrt(c * c - l * l),
                                g = d / h,
                                u = Object(I["a"])(t, 2),
                                m = u[0],
                                f = u[1],
                                p = Object(I["a"])(e, 2),
                                v = p[0],
                                w = p[1];
                            if (0 == r.side && 0 == n || r.side == n) {
                                var b = m + (v - m) * g,
                                    x = f + (w - f) * g,
                                    P = L.makePerpendicularLine(L.makeLine(t, e), [b, x]),
                                    k = L.pointLineDistance(i, P);
                                o > k && (o = k,
                                    s = _["Object"].assign({
                                        overturn: !1,
                                        transform: a.computeTransform(r.leftPoint, r.rightPoint, r.bottomPoint, t, e, L.getPerpendicularPoint(P, i), r.width, r.height)
                                    }, r))
                            }
                            if (0 == r.side && 0 == n || r.side != n) {
                                var y = v + (m - v) * g,
                                    M = w + (f - w) * g,
                                    $ = L.makePerpendicularLine(L.makeLine(t, e), [y, M]),
                                    S = L.pointLineDistance(i, $);
                                o > S && (o = S,
                                    s = _["Object"].assign({
                                        overturn: !0,
                                        transform: a.computeTransform([r.width - r.leftPoint[0], r.leftPoint[1]], [r.width - r.rightPoint[0], r.rightPoint[1]], [r.width - r.bottomPoint[0], r.bottomPoint[1]], t, e, L.getPerpendicularPoint($, i), r.width, r.height)
                                    }, r))
                            }
                        })),
                        s
                },
                computeTransform: function (t, e, i, n, a, o, s, r) {
                    var h = L.pointDistance(n, a),
                        c = h / L.pointDistance(t, e),
                        l = L.pointLineDistance(o, L.makeLine(n, a)) / L.pointLineDistance(i, L.makeLine(t, e));
                    return {
                        xScale: c,
                        yScale: l,
                        centerX: (s / 2 - t[0]) * c + n[0],
                        centerY: (r / 2 - t[1]) * c + n[1],
                        angle: L.getAngle(n, [n[0] + h * Math.sign(a[0] - n[0]), n[1]], a)
                    }
                },
                wearAMaskAfterFaceDetection: function (t, e, i) {
                    var n = t.landmarks.positions,
                        a = L.getMidPoint($(n[1]), $(n[2])),
                        o = L.getMidPoint($(n[15]), $(n[14])),
                        s = $(n[8]),
                        r = $(n[28]),
                        h = 0;
                    r.x > o.x ? (o = r,
                        h = 2) : r.x < a.x && (a = r,
                        h = 1);
                    var c = {
                        mask: this.findMask(a, o, s, h),
                        imgOriginalWidth: t.detection.imageWidth,
                        imgOriginalHeight: t.detection.imageHeight
                    };
                    return this.wearAMaskNormally(c, e, i)
                },
                wearAMaskNormally: function (t, e, i) {
                    var n = t.mask,
                        a = i.width / t.imgOriginalWidth,
                        o = i.height / t.imgOriginalHeight,
                        s = n.width * n.transform.xScale * (n.overturn ? -1 : 1) * a;
                    return this.getMaskImageSrc(n, (function (t) {
                            e.layers.length > 1 && e.removeItem(1),
                                e.addPhoto(t, {
                                    width: s,
                                    height: n.height * n.transform.yScale * o,
                                    centerX: n.transform.centerX * a + i.position[0] - (n.overturn ? s : 0),
                                    centerY: n.transform.centerY * o + i.position[1],
                                    angle: n.transform.angle
                                }, !0),
                                e.chooseItem(1)
                        })),
                        t
                },
                wearAMaskAsAFool: function (t, e) {
                    var i = M.masks[2];
                    return this.getMaskImageSrc(i, (function (i) {
                        t.layers.length > 1 && t.removeItem(1),
                            t.addPhoto(i, {
                                width: e.width / 4,
                                height: e.height / 4,
                                centerX: t.width / 2,
                                centerY: t.height / 2,
                                angle: 0
                            }, !0),
                            t.chooseItem(1)
                    })), {
                        mask: i
                    }
                },
                resetMask: function (t, e, i) {
                    t.imgOriginalWidth ? this.wearAMaskNormally(t, e, i) : this.wearAMaskAsAFool(e, i)
                },
                changeMask: function (t, e) {
                    var i = e.layers[1].rect;
                    e.removeItem(1),
                        this.getMaskImageSrc(t, (function (t) {
                            e.addPhoto(t, {
                                    width: i.width,
                                    height: i.height,
                                    centerX: i.center[0],
                                    centerY: i.center[1],
                                    angle: i.angle
                                }, !0),
                                e.chooseItem(1)
                        }))
                },
                getMaskImageSrc: function (t, e) {
                    if (this.maskImageSrc[t.name])
                        e(this.maskImageSrc[t.name]);
                    else {
                        var i = this,
                            n = new XMLHttpRequest;
                        n.onload = function () {
                                var n = URL.createObjectURL(this.response);
                                i.maskImageSrc[t.name] = n,
                                    e(n)
                            },
                            n.open("GET", M.baseUrl + t.name, !0),
                            n.responseType = "blob",
                            n.send()
                    }
                }
            },
            O = y.modelBaseUrl,
            T = {
                modelsLoaded: !1,
                modelsLoading: !1,
                onModelsLoaded: null,
                onModelsLoadErr: null,
                loadModels: function () {
                    var t = this;
                    if (!this.modelsLoading && !this.modelsLoaded) {
                        var e = !1,
                            i = function () {
                                e = !0
                            };
                        this.modelsLoading = !0,
                            Promise.all([k["c"].faceLandmark68Net.loadFromUri(O).catch(i), k["c"].faceLandmark68Net.loadFromUri(O).catch(i), k["c"].ssdMobilenetv1.loadFromUri(O).catch(i)]).then(Object(P["a"])(regeneratorRuntime.mark((function i() {
                                return regeneratorRuntime.wrap((function (i) {
                                    while (1)
                                        switch (i.prev = i.next) {
                                            case 0:
                                                t.modelsLoading = !1,
                                                    t.modelsLoaded = !e,
                                                    !e && t.onModelsLoaded ? (t.onModelsLoaded(),
                                                        t.onModelsLoaded = null) : e && t.onModelsLoadErr && (t.onModelsLoadErr(),
                                                        t.onModelsLoadErr = null);
                                            case 3:
                                            case "end":
                                                return i.stop()
                                        }
                                }), i)
                            }))))
                    }
                },
                detectPic: function (t, e, i, n, a) {
                    var o = function () {
                            var o = Object(P["a"])(regeneratorRuntime.mark((function o() {
                                var s, r, h;
                                return regeneratorRuntime.wrap((function (o) {
                                    while (1)
                                        switch (o.prev = o.next) {
                                            case 0:
                                                return s = new k["a"]({
                                                        minConfidence: .2
                                                    }),
                                                    o.next = 3,
                                                    k["b"](t, s).withFaceLandmarks();
                                            case 3:
                                                r = o.sent,
                                                    console.log(r),
                                                    r ? (h = S.wearAMaskAfterFaceDetection(r, e, i),
                                                        n && n(h)) : a && a("no result");
                                            case 6:
                                            case "end":
                                                return o.stop()
                                        }
                                }), o)
                            })));
                            return function () {
                                return o.apply(this, arguments)
                            }
                        }(),
                        s = function () {
                            a && a("no result")
                        };
                    this.modelsLoading ? (this.onModelsLoaded = o,
                        this.onModelsLoadErr = s) : this.modelsLoaded ? o() : (this.onModelsLoaded = o,
                        this.onModelsLoadErr = s,
                        this.loadModels())
                },
                drawFaceLandmarks: function (t, e, i) {
                    var n = t.getContext("2d");
                    e.forEach((function (t) {
                        var e = i.width / t.detection.imageWidth,
                            a = i.height / t.detection.imageHeight;
                        t.landmarks.positions.forEach((function (t, o) {
                            var s = t.x * e + i.position[0],
                                r = t.y * a + i.position[1];
                            n.fillStyle = "#0000FF",
                                n.fillRect(s - 2, r - 2, 4, 4),
                                n.font = "12px bold 宋体",
                                n.fillText(o, s, r)
                        }))
                    }))
                }
            },
            j = (i("99af"),
                i("cb29"),
                i("d81d"),
                i("13d5"),
                i("a434"),
                i("d4ec")),
            E = i("bee2"),
            C = function (t, e) {
                var i = Object(I["a"])(t, 2),
                    n = i[0],
                    a = i[1],
                    o = Object(I["a"])(e, 2),
                    s = o[0],
                    r = o[1];
                return (n * s + a * r) / Math.sqrt(n * n + a * a)
            },
            U = function (t) {
                var e = t;
                "string" === typeof t && (e = document.querySelector(e));
                var i = e.offsetLeft,
                    n = e.offsetTop,
                    a = e.offsetParent;
                while (a)
                    i += a.offsetLeft,
                    n += a.offsetTop,
                    a = a.offsetParent;
                return {
                    x: i,
                    y: n
                }
            },
            F = function () {
                function t(e) {
                    Object(j["a"])(this, t),
                        this.canvas = e
                }
                return Object(E["a"])(t, [{
                        key: "refresh",
                        value: function (t) {
                            var e = this;
                            this.rect = t,
                                this.points = this.rect.points,
                                this.cPoints = [],
                                this.points.reduce((function (t, i) {
                                    return e.cPoints.push([(t[0] + i[0]) / 2, (t[1] + i[1]) / 2]),
                                        i
                                }), this.points[3]),
                                t.height >= 0 ? this.rPoint = [(this.points[0][0] + this.points[1][0]) / 2, this.points[0][1] - 35] : this.rPoint = [(this.points[2][0] + this.points[3][0]) / 2, this.points[0][1] + 35],
                                this.draw()
                        }
                    }, {
                        key: "draw",
                        value: function () {
                            var t = this.rect,
                                e = t.points,
                                i = t.center,
                                n = t.angle,
                                a = t.width,
                                o = t.height,
                                s = this.canvas.context,
                                r = Object(I["a"])(i, 2),
                                h = r[0],
                                c = r[1];
                            s.save(),
                                s.translate(h, c),
                                s.rotate(n),
                                s.beginPath(),
                                s.globalAlpha = .5,
                                s.lineWidth = "3",
                                s.strokeStyle = "#FF9999",
                                s.rect(e[0][0] - h, e[0][1] - c, a, o),
                                s.moveTo((e[0][0] + e[1][0]) / 2 - h, e[0][1] - c),
                                s.lineTo(this.rPoint[0] - h, this.rPoint[1] - c),
                                s.stroke(),
                                s.closePath(),
                                s.globalAlpha = 1;
                            var l = e.concat(this.cPoints);
                            l.forEach((function (t) {
                                    var e = Object(I["a"])(t, 2),
                                        i = e[0],
                                        n = e[1];
                                    s.fillStyle = "#FF4949",
                                        s.fillRect(i - 7 - h, n - 7 - c, 14, 14)
                                })),
                                l.push(this.rPoint),
                                s.beginPath(),
                                s.strokeStyle = "#FF4949",
                                s.fillStyle = "#FF9999",
                                s.lineWidth = "5",
                                s.arc(this.rPoint[0] - h, this.rPoint[1] - c, 8, 0, 2 * Math.PI, !0),
                                s.stroke(),
                                s.closePath(),
                                s.fill(),
                                s.restore()
                        }
                    }, {
                        key: "isPointInSkeletion",
                        value: function (t) {
                            var e = this,
                                i = null,
                                n = Object(I["a"])(t, 2),
                                a = n[0],
                                o = n[1],
                                s = this.rect.angle,
                                r = this.rect.rotatePoint(this.rPoint, s),
                                h = this.points.map((function (t) {
                                    return e.rect.rotatePoint(t, s)
                                })),
                                c = this.cPoints.map((function (t) {
                                    return e.rect.rotatePoint(t, s)
                                }));
                            return function () {
                                    var t = Object(I["a"])(r, 2),
                                        e = t[0],
                                        n = t[1];
                                    Math.sqrt(Math.pow(e - a, 2) + Math.pow(n - o, 2)) < 10 && (i = "r_point")
                                }(),
                                h.forEach((function (t, e) {
                                    var n = Object(I["a"])(t, 2),
                                        s = n[0],
                                        r = n[1];
                                    Math.sqrt(Math.pow(s - a, 2) + Math.pow(r - o, 2)) < 10 && (i = "point_".concat(e + 1))
                                })),
                                c.forEach((function (t, e) {
                                    var n = Object(I["a"])(t, 2),
                                        s = n[0],
                                        r = n[1];
                                    Math.sqrt(Math.pow(s - a, 2) + Math.pow(r - o, 2)) < 10 && (i = "c_point_".concat(e + 1))
                                })),
                                i
                        }
                    }]),
                    t
            }(),
            A = function () {
                function t(e, i, n, a) {
                    Object(j["a"])(this, t),
                        this.height = i,
                        this.width = e,
                        this.center = n,
                        this.angle = a,
                        this.getPoints()
                }
                return Object(E["a"])(t, [{
                        key: "getPoints",
                        value: function () {
                            var t = this.height,
                                e = this.width,
                                i = Object(I["a"])(this.center, 2),
                                n = i[0],
                                a = i[1],
                                o = [];
                            o[0] = [n - e / 2, a - t / 2],
                                o[1] = [n + e / 2, a - t / 2],
                                o[2] = [n + e / 2, a + t / 2],
                                o[3] = [n - e / 2, a + t / 2],
                                this.points = o
                        }
                    }, {
                        key: "rotate",
                        value: function (t) {
                            this.angle = t * Math.sign(this.height)
                        }
                    }, {
                        key: "translate",
                        value: function (t) {
                            var e = Object(I["a"])(t, 2),
                                i = e[0],
                                n = e[1],
                                a = this.points.map((function (t) {
                                    return [t[0] + i, t[1] + n]
                                }));
                            this.points = a,
                                this.getCenter()
                        }
                    }, {
                        key: "zoom",
                        value: function (t, e) {
                            var i = this,
                                n = parseFloat(e[0]),
                                a = parseFloat(e[1]),
                                o = this.angle,
                                s = Math.sin(o + Math.PI / 2),
                                r = Math.cos(o + Math.PI / 2);
                            0 === o && (s = 1,
                                r = 0);
                            var h = C([s, r], [n, -a]),
                                c = 5 * Math.sin(o),
                                l = 5 * Math.cos(o),
                                d = C([c, l], [n, -a]),
                                g = Math.atan(this.height / this.width),
                                u = function (t) {
                                    var e = C([-Math.cos(t), Math.sin(t)], [n, -a]);
                                    i.width += e * Math.cos(g),
                                        i.height += e * Math.sin(g),
                                        i.center = [i.center[0] - e * Math.cos(t) / 2, i.center[1] - e * Math.sin(t) / 2]
                                };
                            if ("point_1" === t) {
                                var m = g + o;
                                u(m)
                            } else if ("point_2" === t) {
                                var f = Math.PI - g + o;
                                u(f)
                            } else if ("point_3" === t) {
                                var p = Math.PI + g + o;
                                u(p)
                            } else if ("point_4" === t) {
                                var v = 2 * Math.PI - g + o;
                                u(v)
                            } else
                                "c_point_1" === t ? (this.width -= h,
                                    this.center = [this.center[0] + h * Math.cos(o) / 2, this.center[1] + h * Math.sin(o) / 2]) : "c_point_2" === t ? (this.height += d,
                                    this.center = [this.center[0] + d * Math.sin(o) / 2, this.center[1] - d * Math.cos(o) / 2]) : "c_point_3" === t ? (this.width += h,
                                    this.center = [this.center[0] + h * Math.cos(o) / 2, this.center[1] + h * Math.sin(o) / 2]) : "c_point_4" === t && (this.height -= d,
                                    this.center = [this.center[0] + d * Math.sin(o) / 2, this.center[1] - d * Math.cos(o) / 2]);
                            this.getPoints()
                        }
                    }, {
                        key: "isPointInRect",
                        value: function (t) {
                            var e = this,
                                i = this.points.map((function (t) {
                                    return e.rotatePoint(t, e.angle)
                                })),
                                n = i[0],
                                a = i[1],
                                o = i[2],
                                s = i[3],
                                r = t[0],
                                h = -t[1],
                                c = function () {
                                    var t = (n[1] - a[1]) / (a[0] - n[0]),
                                        e = -n[1] - t * n[0],
                                        i = -o[1] - t * o[0];
                                    return e > i && t * r + e > h && t * r + i < h || e < i && t * r + e < h && t * r + i > h
                                }(),
                                l = function () {
                                    var t = (a[1] - o[1]) / (o[0] - a[0]),
                                        e = -a[1] - t * a[0],
                                        i = -s[1] - t * s[0];
                                    return o[0] - a[0] === 0 && (n[0] < r && r < a[0] || n[0] > r && r > a[0]) || (e > i && t * r + e > h && t * r + i < h || e < i && t * r + e < h && t * r + i > h)
                                }();
                            return !(!c || !l)
                        }
                    }, {
                        key: "getCenter",
                        value: function () {
                            var t = this.points[0],
                                e = this.points[2],
                                i = t[0] + e[0],
                                n = t[1] + e[1];
                            this.center = [i / 2, n / 2]
                        }
                    }, {
                        key: "rotatePoint",
                        value: function (t, e) {
                            var i = Object(I["a"])(t, 2),
                                n = i[0],
                                a = i[1],
                                o = Object(I["a"])(this.center, 2),
                                s = o[0],
                                r = o[1],
                                h = (n - s) * Math.cos(e) - (a - r) * Math.sin(e) + s,
                                c = (n - s) * Math.sin(e) + (a - r) * Math.cos(e) + r;
                            return [h, c]
                        }
                    }, {
                        key: "setWH",
                        value: function () {
                            this.height = Math.abs(this.points[0][1] - this.points[3][1]),
                                this.width = Math.abs(this.points[0][0] - this.points[1][0])
                        }
                    }]),
                    t
            }(),
            H = function () {
                function t(e, i) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                        a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                        o = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
                        s = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                    Object(j["a"])(this, t),
                        this.canvas = i,
                        this.imgInput = e,
                        this.image = null,
                        this.onLoad = n,
                        this.rect = a,
                        this.canEdit = o,
                        this.orientation = s,
                        this.id = (new Date).getTime(),
                        this.isLoad = !1,
                        e instanceof t ? (this.options = e,
                            this.imgInput = this.options.imgInput,
                            this.id = this.options.id) : e instanceof Image && (this.image = e),
                        this.prepare()
                }
                return Object(E["a"])(t, [{
                        key: "prepare",
                        value: function () {
                            var t = this;
                            "string" === typeof this.imgInput ? (this.image = new Image,
                                this.image.onload = function () {
                                    t.isLoad || (t.isLoad = !0,
                                        t.init())
                                },
                                this.image.src = this.imgInput,
                                this.image.complete && (this.isLoad = !0,
                                    this.init())) : this.image ? (this.isLoad = !0,
                                this.init()) : (this.image = this.imgInput,
                                this.isLoad = !0,
                                this.init())
                        }
                    }, {
                        key: "init",
                        value: function () {
                            if (this.onLoad && this.onLoad(),
                                !this.rect)
                                if (this.options) {
                                    var t = this.options.rect,
                                        e = t.width,
                                        i = t.height,
                                        n = t.center,
                                        a = t.angle;
                                    this.rect = new A(e, i, [n[0], n[1]], a)
                                } else
                                    this.rect = new A(this.image.width, this.image.height, [this.canvas.width / 2, this.canvas.height / 2], 0)
                        }
                    }, {
                        key: "draw",
                        value: function () {
                            var t = this.image,
                                e = this.canvas,
                                i = this.rect,
                                n = e.context,
                                a = i.points,
                                o = Object(I["a"])(i.center, 2),
                                s = o[0],
                                r = o[1];
                            n.save(),
                                n.translate(s, r),
                                n.rotate(i.angle),
                                n.scale(Math.sign(i.width), Math.sign(i.height)),
                                n.drawImage(t, 0, 0, t.width, t.height, a[0][0] - s, a[0][1] - r, i.width, i.height),
                                n.restore()
                        }
                    }]),
                    t
            }(),
            D = function () {
                function t(e) {
                    Object(j["a"])(this, t),
                        this.options = e;
                    var i = this.options,
                        n = i.canvas,
                        a = i.height,
                        o = i.width,
                        s = i.target,
                        r = i.beforeLoading,
                        h = i.afterLoading,
                        c = i.data,
                        l = void 0 === c ? [] : c;
                    this.canvas = null,
                        this.height = a,
                        this.width = o,
                        this.target = s,
                        this.beforeLoading = r,
                        this.afterLoading = h,
                        this.data = l,
                        this.layers = [],
                        this.canvas = "string" === typeof n ? document.getElementById(n) : n,
                        this.target = "string" === typeof s ? document.getElementById(s) : s,
                        this.canvas.width = o,
                        this.canvas.height = a,
                        this.context = this.canvas.getContext("2d"),
                        this.loadingLayerCount = 0,
                        this.border = new F(this),
                        this.current = null,
                        this.init(),
                        this.initEvent()
                }
                return Object(E["a"])(t, [{
                        key: "init",
                        value: function () {
                            var t = this;
                            this.clear(),
                                this.beforeLoading && this.beforeLoading(this);
                            var e = function (e) {
                                t.loadingLayerCount += 1;
                                var i = new H(e, t, (function () {
                                    setTimeout((function () {
                                        t.loadingLayerCount -= 1,
                                            t.loadingLayerCount < 1 && t.draw()
                                    }), 100)
                                }), e.rect, e.canEdit, e.orientation);
                                t.layers.push(i)
                            };
                            this.data.forEach((function (t) {
                                    "function" !== typeof t && e(t)
                                })),
                                this.afterLoading && this.afterLoading(this)
                        }
                    }, {
                        key: "initEvent",
                        value: function () {
                            var e = this;
                            this.target.addEventListener("mousedown", (function (i) {
                                    var n = i.pageX,
                                        a = i.pageY,
                                        o = U(e.target),
                                        s = e.width / e.target.offsetWidth,
                                        r = [(n - o.x) * s, (a - o.y) * s],
                                        h = e.selectPhoto(r);
                                    if (h) {
                                        var c = function (i) {
                                            var r = i.pageX,
                                                c = i.pageY,
                                                l = [(r - n) * s, (c - a) * s];
                                            if (1 === h)
                                                e.current.rect.translate(l);
                                            else if ("r_point" === h) {
                                                var d = [(r - o.x) * s, (c - o.y) * s],
                                                    g = t.getAngle(e.current.rect.center, e.border.rPoint, d);
                                                if (isNaN(g))
                                                    return;
                                                e.current.rect.rotate(g)
                                            } else
                                                e.current.rect.zoom(h, l);
                                            e.draw(),
                                                n = r,
                                                a = c
                                        };
                                        e.target.addEventListener("mousemove", c),
                                            e.target.addEventListener("mouseup", (function () {
                                                e.target.removeEventListener("mousemove", c)
                                            }))
                                    }
                                })),
                                this.target.addEventListener("touchstart", (function (i) {
                                    i.preventDefault();
                                    var n = i.touches[0].pageX,
                                        a = i.touches[0].pageY,
                                        o = U(e.target),
                                        s = e.width / e.target.offsetWidth,
                                        r = [(n - o.x) * s, (a - o.y) * s],
                                        h = e.selectPhoto(r);
                                    if (h) {
                                        var c = function (i) {
                                            var r = i.touches[0].pageX,
                                                c = i.touches[0].pageY,
                                                l = [(r - n) * s, (c - a) * s];
                                            if (1 === h)
                                                e.current.rect.translate(l);
                                            else if ("r_point" === h) {
                                                var d = [(r - o.x) * s, (c - o.y) * s],
                                                    g = t.getAngle(e.current.rect.center, e.border.rPoint, d);
                                                if (isNaN(g))
                                                    return;
                                                e.current.rect.rotate(g)
                                            } else
                                                e.current.rect.zoom(h, l);
                                            e.draw(),
                                                n = r,
                                                a = c
                                        };
                                        e.target.addEventListener("touchmove", c),
                                            e.target.addEventListener("touchend", (function () {
                                                e.target.removeEventListener("touchmove", c)
                                            }))
                                    }
                                }))
                        }
                    }, {
                        key: "addCommand",
                        value: function (t) {
                            var e = this;
                            this.layers.push(t),
                                this.loadingLayerCount > 0 ? setTimeout((function () {
                                    e.draw()
                                }), 100) : this.draw()
                        }
                    }, {
                        key: "addPhoto",
                        value: function (t) {
                            var e = this,
                                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                                n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
                                a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                                o = null;
                            if (i && (o = new A(i.width, i.height, [i.centerX, i.centerY], i.angle)),
                                "string" === typeof t) {
                                this.loadingLayerCount += 1;
                                var s = new H(t, this, (function () {
                                    setTimeout((function () {
                                        e.loadingLayerCount -= 1,
                                            e.loadingLayerCount < 1 && e.draw()
                                    }), 100)
                                }), o, n, a);
                                this.layers.push(s)
                            } else {
                                var r = new H(t, this, null, o, n, a);
                                this.layers.push(r),
                                    this.draw()
                            }
                        }
                    }, {
                        key: "selectPhoto",
                        value: function (t) {
                            var e = this;
                            if (this.current) {
                                var i = this.border.isPointInSkeletion(t);
                                if (i)
                                    return i
                            }
                            var n = [].concat(this.layers).reverse();
                            this.current = null;
                            var a = 0;
                            return n.forEach((function (i, n) {
                                    "function" !== typeof i && !e.current && i.rect.isPointInRect(t) && i.canEdit && (e.current = i,
                                        a = n + 1)
                                })),
                                this.current ? (this.chooseItem(this.layers.length - a),
                                    1) : (this.draw(),
                                    0)
                        }
                    }, {
                        key: "chooseItem",
                        value: function (t) {
                            this.layers[t].canEdit && (this.current = this.layers[t],
                                this.layers.splice(t, 1),
                                this.layers.push(this.current),
                                this.draw())
                        }
                    }, {
                        key: "removeItem",
                        value: function (t) {
                            this.layers.splice(t, 1),
                                this.draw()
                        }
                    }, {
                        key: "export",
                        value: function () {
                            var t = document.createElement("canvas"),
                                e = this.layers[0];
                            90 == e.orientation || 270 == e.orientation ? (t.width = e.image.height,
                                t.height = e.image.width) : (t.width = e.image.width,
                                t.height = e.image.height);
                            var i = t.getContext("2d");
                            i.save(),
                                i.translate(t.width / 2, t.height / 2),
                                i.rotate(e.rect.angle),
                                i.drawImage(e.image, 0, 0, e.image.width, e.image.height, -e.image.width / 2, -e.image.height / 2, e.image.width, e.image.height),
                                i.restore();
                            var n = e.image.width / e.rect.width,
                                a = e.image.height / e.rect.height,
                                o = e.rect.center[0] - e.rect.width / 2,
                                s = e.rect.center[1] - e.rect.height / 2;
                            if (90 != e.orientation && 270 != e.orientation || (n = e.image.height / e.rect.height,
                                    a = e.image.width / e.rect.width,
                                    o = e.rect.center[0] - e.rect.height / 2,
                                    s = e.rect.center[1] - e.rect.width / 2),
                                this.layers[1]) {
                                var r = this.layers[1],
                                    h = r.rect.points,
                                    c = Object(I["a"])(r.rect.center, 2),
                                    l = c[0],
                                    d = c[1];
                                l = (l - o) * n,
                                    d = (d - s) * a,
                                    i.save(),
                                    i.translate(l, d),
                                    i.rotate(r.rect.angle),
                                    i.scale(Math.sign(r.rect.width), Math.sign(r.rect.height)),
                                    i.drawImage(r.image, 0, 0, r.image.width, r.image.height, (h[0][0] - o) * n - l, (h[0][1] - s) * a - d, r.rect.width * n, r.rect.height * a),
                                    i.restore()
                            }
                            return t.toDataURL("image/png")
                        }
                    }, {
                        key: "clear",
                        value: function () {
                            this.context.save(),
                                this.context.setTransform(1, 0, 0, 1, 0, 0),
                                this.context.clearRect(0, 0, this.width, this.height),
                                this.context.restore()
                        }
                    }, {
                        key: "save",
                        value: function () {
                            var t = this.layers.map((function (t) {
                                var e = t.rect,
                                    i = t.id,
                                    n = t.img;
                                return {
                                    rect: e,
                                    id: i,
                                    img: n
                                }
                            }));
                            return t
                        }
                    }, {
                        key: "draw",
                        value: function () {
                            var t = this;
                            this.clear(),
                                this.layers.forEach((function (e) {
                                    "function" === typeof e ? e.apply(null, t.context, t.canvas) : e.draw()
                                })),
                                this.current && this.border.refresh(this.current.rect)
                        }
                    }], [{
                        key: "getAngle",
                        value: function (t, e, i) {
                            var n = e[0] - t[0],
                                a = t[1] - e[1],
                                o = i[0] - t[0],
                                s = t[1] - i[1],
                                r = Math.sqrt(n * n + a * a) * Math.sqrt(o * o + s * s);
                            if (0 === r)
                                return -1;
                            var h = Math.acos((n * o + a * s) / r);
                            return t[0] - i[0] < 0 && t[1] - i[1] < 0 ? h : t[0] - i[0] < 0 && t[1] - i[1] > 0 ? h : t[0] - i[0] > 0 && t[1] - i[1] < 0 ? 2 * Math.PI - h : t[0] - i[0] > 0 && t[1] - i[1] > 0 ? 2 * Math.PI - h : null
                        }
                    }]),
                    t
            }(),
            B = D,
            R = {
                shareImageSrc: null,
                getShareImageSrc: function (t, e) {
                    if (this.shareImageSrc)
                        e(this.shareImageSrc);
                    else {
                        var i = this,
                            n = new XMLHttpRequest;
                        n.onload = function () {
                                var t = URL.createObjectURL(this.response);
                                i.shareImageSrc = t,
                                    e(t)
                            },
                            n.open("GET", y.assetsBaseUrl + t, !0),
                            n.responseType = "blob",
                            n.send()
                    }
                },
                imgContain: function (t, e, i, n) {
                    var a = t / i,
                        o = e / n,
                        s = a < o ? a : o,
                        r = i * s,
                        h = n * s,
                        c = (t - r) / 2,
                        l = (e - h) / 2;
                    return {
                        imgWidth: r,
                        imgHeight: h,
                        imgX: c,
                        imgY: l,
                        rate: s
                    }
                },
                imgCover: function (t, e, i, n) {
                    var a = t / i,
                        o = e / n,
                        s = a > o ? a : o,
                        r = i * s,
                        h = n * s,
                        c = (t - r) / 2,
                        l = (e - h) / 2;
                    return {
                        imgWidth: r,
                        imgHeight: h,
                        imgX: c,
                        imgY: l,
                        rate: s
                    }
                },
                setLang: function (t) {
                    window.localStorage.setItem("user_lang", t)
                },
                getLang: function (t) {
                    var e = window.localStorage.getItem("user_lang");
                    return null === e ? t : e
                }
            },
            W = i("6f45"),
            X = i.n(W),
            Y = {
                components: {
                    LittleButton: x
                },
                props: {
                    fileId: Number
                },
                data: function () {
                    return {
                        currentFileId: 0,
                        editor: null,
                        canvas: null,
                        maskData: M,
                        maskInfo: null,
                        realImgInfo: null,
                        loading: !1
                    }
                },
                methods: {
                    loadImg: function (t) {
                        this.canvas && this.canvas.remove(),
                            this.canvas = document.createElement("canvas"),
                            this.canvas.width = this.$refs.editor.clientWidth,
                            this.canvas.height = this.$refs.editor.clientHeight - this.$refs.maskStore.clientHeight - this.$refs.control.clientHeight,
                            this.$refs.canvasContainer.appendChild(this.canvas),
                            this.editor = new B({
                                canvas: this.canvas,
                                target: this.canvas,
                                width: this.canvas.width,
                                height: this.canvas.height
                            });
                        var e = this.editor,
                            i = this;
                        X.a.getData(t, (function () {
                            console.log(X.a.getAllTags(this));
                            var n = X.a.getTag(this, "Orientation"),
                                a = new FileReader;
                            a.readAsDataURL(t),
                                a.onload = function () {
                                    var t = new Image;
                                    t.src = this.result,
                                        t.onload = function () {
                                            var a = t.width,
                                                o = t.height,
                                                s = 0,
                                                r = 0;
                                            if (n && 1 != n)
                                                switch (n) {
                                                    case 6:
                                                        s = Math.PI / 2,
                                                            a = t.height,
                                                            o = t.width,
                                                            r = 90;
                                                        break;
                                                    case 3:
                                                        s = Math.PI,
                                                            r = 180;
                                                        break;
                                                    case 8:
                                                        s = 3 * Math.PI / 2,
                                                            a = t.height,
                                                            o = t.width,
                                                            r = 270;
                                                        break
                                                }
                                            var h = R.imgContain(e.width, e.height, a, o),
                                                c = h.imgWidth,
                                                l = h.imgHeight,
                                                d = h.imgX,
                                                g = h.imgY,
                                                u = h.rate;
                                            e.addPhoto(t, {
                                                    width: t.width * u,
                                                    height: t.height * u,
                                                    centerX: e.width / 2,
                                                    centerY: e.height / 2,
                                                    angle: s
                                                }, !1, r),
                                                i.realImgInfo = {
                                                    width: c,
                                                    height: l,
                                                    position: [d, g]
                                                },
                                                i.loading = !0,
                                                setTimeout((function () {
                                                    var t = new Image;
                                                    t.src = e.export(),
                                                        t.onload = function () {
                                                            T.detectPic(t, e, i.realImgInfo, (function (t) {
                                                                i.maskInfo = t,
                                                                    i.loading = !1
                                                            }), (function (t) {
                                                                console.log(t),
                                                                    i.maskInfo = S.wearAMaskAsAFool(i.editor, i.realImgInfo),
                                                                    i.loading = !1
                                                            }))
                                                        }
                                                }), 300)
                                        }
                                }
                        }))
                    },
                    resetMask: function () {
                        this.maskInfo && this.editor && S.resetMask(this.maskInfo, this.editor, this.realImgInfo)
                    },
                    changeMask: function (t) {
                        this.maskInfo && this.editor && S.changeMask(t, this.editor)
                    },
                    reupload: function () {
                        this.$emit("navTo", "index")
                    },
                    save: function () {
                        this.$store.commit("setEditor", this.editor),
                            this.$emit("navTo", "export")
                    }
                },
                watch: {
                    fileId: function (t) {
                        t != this.currentFileId && this.$store.state.userImgInfo && t == this.$store.state.userImgInfo.id && (this.loadImg(this.$store.state.userImgInfo.file),
                            this.currentFileId = t)
                    }
                }
            },
            N = Y,
            q = (i("df00"),
                Object(l["a"])(N, u, m, !1, null, "9f0bb19a", null)),
            z = q.exports,
            G = function () {
                var t = this,
                    e = t.$createElement,
                    i = t._self._c || e;
                return i("div", {
                    attrs: {
                        id: "export"
                    }
                }, [i("div", {
                    class: {
                        loading: t.loading
                    },
                    attrs: {
                        id: "exportUI"
                    }
                }, [i("p", {
                    ref: "ic",
                    staticClass: "img-container"
                }, [i("img", {
                    style: t.imgStyle,
                    attrs: {
                        src: t.imgUrl
                    },
                    on: {
                        load: t.onImgLoaded
                    }
                })]), i("little-button", {
                    attrs: {
                        id: "shareBtn",
                        width: t.$t("export.share.width"),
                        icon: "share",
                        text: t.$t("export.share.text")
                    },
                    on: {
                        click: t.share
                    }
                }), i("div", {
                    ref: "title",
                    staticClass: "title"
                }, [i("p", [t._v(t._s(t.$t("export.title")))]), i("div", {
                    staticClass: "control"
                }, [i("button", {
                    style: {
                        width: t.$t("export.backToEditor.width")
                    },
                    on: {
                        click: t.backToEditor
                    }
                }, [t._v(t._s(t.$t("export.backToEditor.text")))]), i("button", {
                    style: {
                        width: t.$t("export.backToIndex.width")
                    },
                    on: {
                        click: t.backToIndex
                    }
                }, [t._v(t._s(t.$t("export.backToIndex.text")))])])])], 1), t.loading ? i("div", {
                    attrs: {
                        id: "loading"
                    }
                }, [i("div", {
                    style: {
                        width: t.$t("export.loading.width"),
                        height: t.$t("export.loading.height")
                    }
                }, [i("p", [i("b", [t._v(t._s(t.$t("export.loading.title")))])])])]) : t._e()])
            },
            J = [],
            V = i("2f62"),
            K = {
                components: {
                    LittleButton: x
                },
                data: function () {
                    return {
                        imgStyle: {},
                        loading: !0
                    }
                },
                computed: Object(V["b"])({
                    imgUrl: "finishImg"
                }),
                methods: {
                    onImgLoaded: function () {
                        this.imgUrl && (this.loading = !1)
                    },
                    backToIndex: function () {
                        this.$emit("navTo", "index")
                    },
                    backToEditor: function () {
                        this.$emit("navTo", "editor")
                    },
                    share: function () {
                        this.$emit("navTo", "share")
                    }
                },
                created: function () {
                    this.$store.state.editor ? this.$store.commit("setFinishImg", null) : this.$emit("navTo", "index")
                },
                mounted: function () {
                    var t = this,
                        e = this.$refs.ic.clientWidth,
                        i = this.$refs.ic.clientHeight - this.$refs.title.clientHeight,
                        n = this.$store.state.editor.layers[0],
                        a = n.image.width,
                        o = n.image.height;
                    90 != n.orientation && 270 != n.orientation || (a = n.image.height,
                        o = n.image.width);
                    var s = R.imgContain(e, i, a, o),
                        r = s.imgWidth,
                        h = s.imgHeight,
                        c = s.imgX,
                        l = s.imgY;
                    this.imgStyle = {
                            width: r + "px",
                            height: h + "px",
                            left: c + "px",
                            top: l + this.$refs.title.clientHeight + "px"
                        },
                        setTimeout((function () {
                            t.$store.commit("setFinishImg", t.$store.state.editor.export())
                        }), 300)
                }
            },
            Q = K,
            Z = (i("ab63"),
                Object(l["a"])(Q, G, J, !1, null, "363b437d", null)),
            tt = Z.exports,
            et = function () {
                var t = this,
                    e = t.$createElement,
                    i = t._self._c || e;
                return i("div", {
                    attrs: {
                        id: "share"
                    }
                }, [i("div", {
                    class: {
                        loading: t.loading
                    },
                    attrs: {
                        id: "shareUI"
                    }
                }, [i("p", {
                    ref: "ic",
                    staticClass: "img-container"
                }, [i("img", {
                    style: t.imgStyle,
                    attrs: {
                        src: t.imgUrl
                    },
                    on: {
                        load: t.onImgLoaded
                    }
                })]), i("div", {
                    ref: "title",
                    staticClass: "title"
                }, [i("p", [t._v(t._s(t.$t("share.title")))])]), i("div", {
                    ref: "control",
                    staticClass: "control"
                }, [i("button", {
                    style: {
                        width: t.$t("share.back.width")
                    },
                    on: {
                        click: t.back
                    }
                }, [t._v(t._s(t.$t("share.back.text")))])])]), t.loading ? i("div", {
                    attrs: {
                        id: "loading"
                    }
                }, [i("div", {
                    style: {
                        width: t.$t("share.loading.width"),
                        height: t.$t("share.loading.height")
                    }
                }, [i("p", [i("b", [t._v(t._s(t.$t("share.loading.title")))])])])]) : t._e()])
            },
            it = [],
            nt = {
                data: function () {
                    return {
                        imgUrl: "",
                        imgStyle: {},
                        loading: !0
                    }
                },
                methods: {
                    onImgLoaded: function () {
                        this.imgUrl && (this.loading = !1)
                    },
                    back: function () {
                        this.$emit("navTo", "export")
                    }
                },
                created: function () {
                    this.$store.state.finishImg || this.$emit("navTo", "index")
                },
                mounted: function () {
                    var t = this;
                    setTimeout((function () {
                        var e = t,
                            i = new Image;
                        i.src = t.$store.state.finishImg,
                            i.onload = function () {
                                R.getShareImageSrc(e.$t("share.shareImg.filename"), (function (t) {
                                    var n = new Image;
                                    n.src = t,
                                        n.onload = function () {
                                            var t = R.imgContain(e.$refs.ic.clientWidth, e.$refs.ic.clientHeight - e.$refs.title.clientHeight - e.$refs.control.clientHeight, n.width, n.height),
                                                a = t.imgWidth,
                                                o = t.imgHeight,
                                                s = t.imgX,
                                                r = t.imgY;
                                            e.imgStyle = {
                                                width: a + "px",
                                                height: o + "px",
                                                left: s + "px",
                                                top: r + e.$refs.title.clientHeight + "px"
                                            };
                                            var h = document.createElement("canvas");
                                            h.width = n.width,
                                                h.height = n.height;
                                            var c = h.getContext("2d");
                                            c.drawImage(n, 0, 0, n.width, n.height, 0, 0, h.width, h.height);
                                            var l = JSON.parse(e.$t("share.shareImg.p0")),
                                                d = Object(I["a"])(l, 2),
                                                g = d[0],
                                                u = d[1],
                                                m = JSON.parse(e.$t("share.shareImg.p1")),
                                                f = Object(I["a"])(m, 2),
                                                p = f[0],
                                                v = f[1],
                                                w = R.imgCover(p - g, v - u, i.width, i.height),
                                                b = -w.imgX / w.rate,
                                                x = -w.imgY / w.rate;
                                            c.drawImage(i, b, x, i.width - 2 * b, i.height - 2 * x, g, u, w.imgWidth + 2 * w.imgX, w.imgHeight + 2 * w.imgY),
                                                e.imgUrl = h.toDataURL("image/png")
                                        }
                                }))
                            }
                    }), 300)
                }
            },
            at = nt,
            ot = (i("d694"),
                Object(l["a"])(at, et, it, !1, null, "180f5125", null)),
            st = ot.exports,
            rt = {
                name: "app",
                components: {
                    Index: g,
                    Editor: z,
                    Export: tt,
                    Share: st,
                    LittleButton: x
                },
                data: function () {
                    return {
                        logoBaseUrl: y.assetsBaseUrl,
                        nav: "index",
                        currentFileId: 0,
                        showLanguageList: !1
                    }
                },
                methods: {
                    navTo: function (t, e) {
                        this.nav = t,
                            e && (this.currentFileId = e)
                    },
                    language: function () {
                        this.showLanguageList = !0
                    },
                    selectLanguage: function (t) {
                        this.showLanguageList = !1,
                            this.$i18n.locale = t,
                            R.setLang(t)
                    }
                },
                created: function () {
                    document.title = this.$t("title")
                }
            },
            ht = rt,
            ct = (i("034f"),
                Object(l["a"])(ht, a, o, !1, null, null, null)),
            lt = ct.exports;
        n["a"].use(V["a"]);
        var dt = {
                userImgInfo: null,
                editor: null,
                finishImg: null
            },
            gt = {},
            ut = {},
            mt = {
                setUserImgInfo: function (t, e) {
                    t.userImgInfo = e
                },
                setEditor: function (t, e) {
                    t.editor = e
                },
                setFinishImg: function (t, e) {
                    t.finishImg = e
                }
            },
            ft = new V["a"].Store({
                state: dt,
                getters: gt,
                actions: ut,
                mutations: mt
            }),
            pt = i("a925"),
            vt = {
                language: "English",
                title: "Wear a Mask on Your Avatar!",
                logo: {
                    filename: "logo-title-en.svg",
                    height: "20"
                },
                languageBtn: {
                    text: "Language",
                    width: "auto"
                },
                languageList: {
                    title: "Select Language",
                    width: "240px"
                },
                index: {
                    title: {
                        text: "MASK AT CRITICAL MOMENTS!",
                        letterSpacing: "1px"
                    },
                    slogan: {
                        text1: "Wear a mask on your SNS avatars, ",
                        text2: "let's pay more attention to public health. ",
                        space: " ",
                        letterSpacing: "0px"
                    },
                    selectImg: {
                        text: "Select an Image",
                        width: "190px"
                    },
                    description: {
                        text1: "This page can automatically put a mask on your avatar, and you can also edit the position and size of the mask.",
                        text2: "The face detection algorithm is based on the SSD MobileNet V1 neural network model. You don't need to upload pictures and the site don't retain any data.",
                        letterSpacing: "0px"
                    }
                },
                editor: {
                    loading: {
                        title: "Face detection is in progress...",
                        text1: "Because the algorithm runs in the browser all the time,",
                        text2: "the calculation speed may depend on the performance of the device.",
                        width: "280px",
                        height: "144px"
                    },
                    reset: {
                        text: "Reset",
                        width: "auto"
                    },
                    changeMask: "Change the Mask",
                    reselectImg: {
                        text: "Reselect",
                        width: "120px"
                    },
                    saveImg: {
                        text: "Save Image",
                        width: "120px"
                    }
                },
                export: {
                    loading: {
                        title: "Exporting...",
                        width: "200px",
                        height: "50px"
                    },
                    title: "Long Press or Right Click to Save the Image",
                    backToEditor: {
                        text: "Continue Editing",
                        width: "150px"
                    },
                    backToIndex: {
                        text: "Reselect",
                        width: "90px"
                    },
                    share: {
                        text: "Share",
                        width: "auto"
                    }
                },
                share: {
                    loading: {
                        title: "Generating...",
                        width: "200px",
                        height: "50px"
                    },
                    title: "Save the Image and Share It With Friends!",
                    back: {
                        text: "Back",
                        width: "120px"
                    },
                    shareImg: {
                        filename: "share-github-en.png",
                        p0: "[157, 227]",
                        p1: "[610, 679]"
                    }
                }
            },
            wt = {
                language: "简体中文",
                title: "给你的头像戴上口罩！",
                logo: {
                    filename: "logo-title-chs.svg",
                    height: "25"
                },
                languageBtn: {
                    text: "选择语言",
                    width: "auto"
                },
                languageList: {
                    title: "选择语言",
                    width: "200px"
                },
                index: {
                    title: {
                        text: "疫情当前，有罩才稳",
                        letterSpacing: "4px"
                    },
                    slogan: {
                        text1: "给社交网络头像戴上口罩，",
                        text2: "提醒更多人关注身体健康。",
                        space: "　",
                        letterSpacing: "2px"
                    },
                    selectImg: {
                        text: "选择图片",
                        width: "160px"
                    },
                    description: {
                        text1: "此页面可以在你的头像上自动P上口罩，你还可以对口罩的位置和大小进行编辑。",
                        text2: "人脸检测算法基于SSD MobileNet V1神经网络模型，无需上传图片，也不会保留任何数据。",
                        letterSpacing: "1px"
                    }
                },
                editor: {
                    loading: {
                        title: "正在进行人脸检测，请稍等……",
                        text1: "由于算法全程在浏览器运行，",
                        text2: "运算速度可能取决于设备性能。",
                        width: "280px",
                        height: "94px"
                    },
                    reset: {
                        text: "重置",
                        width: "auto"
                    },
                    changeMask: "更换口罩",
                    reselectImg: {
                        text: "重选图片",
                        width: "120px"
                    },
                    saveImg: {
                        text: "保存图片",
                        width: "120px"
                    }
                },
                export: {
                    loading: {
                        title: "正在导出中……",
                        width: "200px",
                        height: "50px"
                    },
                    title: "长按或右键保存下方图片",
                    backToEditor: {
                        text: "继续编辑",
                        width: "120px"
                    },
                    backToIndex: {
                        text: "重选图片",
                        width: "120px"
                    },
                    share: {
                        text: "分享",
                        width: "auto"
                    }
                },
                share: {
                    loading: {
                        title: "正在生成中……",
                        width: "200px",
                        height: "50px"
                    },
                    title: "保存下方图片，分享给朋友吧！",
                    back: {
                        text: "返回",
                        width: "120px"
                    },
                    shareImg: {
                        filename: "share-gitee-chs.png",
                        p0: "[157, 272]",
                        p1: "[610, 679]"
                    }
                }
            };
        n["a"].use(pt["a"]);
        var bt = new pt["a"]({
                locale: R.getLang("chs"),
                messages: {
                    en: vt,
                    chs: wt
                }
            }),
            xt = bt;
        T.loadModels(),
            n["a"].config.productionTip = !1,
            new n["a"]({
                store: ft,
                i18n: xt,
                render: function (t) {
                    return t(lt)
                }
            }).$mount("#app")
    },
    "613b": function (t, e, i) {},
    "80b4": function (t, e, i) {},
    "85ec": function (t, e, i) {},
    "96e3": function (t, e, i) {
        t.exports = ""
    },
    a659: function (t, e, i) {},
    a78f: function (t, e, i) {},
    ab63: function (t, e, i) {
        "use strict";
        var n = i("80b4"),
            a = i.n(n);
        a.a
    },
    b2ee: function (t, e, i) {
        t.exports = ""
    },
    baeb: function (t, e, i) {
        t.exports = ""
    },
    c801: function (t, e, i) {},
    d694: function (t, e, i) {
        "use strict";
        var n = i("c801"),
            a = i.n(n);
        a.a
    },
    df00: function (t, e, i) {
        "use strict";
        var n = i("a78f"),
            a = i.n(n);
        a.a
    }
});
//# sourceMappingURL=app.cb62ce9b.js.map