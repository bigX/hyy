Array.prototype.clear = function() {
    var b = this.length;
    for(var a = 0; a < b; a++) {
        this.shift()
    }
};
Date.prototype.format1 = function(b) {
    var c = {
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        S : this.getMilliseconds()
    };
    if(/(y+)/.test(b)) {
        b = b.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for(var a in c) {
        if(new RegExp("(" + a + ")").test(b)) {
            b = b.replace(RegExp.$1, RegExp.$1.length == 1 ? c[a] : ("00" + c[a]).substr(("" + c[a]).length))
        }
    }
    return b
};
Date.prototype.format = function(a) {
    var b = this;
    var c = function(g, f) {
        if(!f) {
            f = 2
        }
        g = String(g);
        for(var e = 0, d = ""; e < (f - g.length); e++) {
            d += "0"
        }
        return d + g
    };
    return a.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|m{1,4}|yy(?:yy)?|([hHMstT])\1?|[lLZ])\b/g, function(e) {
        switch(e) {
            case"d":
                return b.getDate();
            case"dd":
                return c(b.getDate());
            case"ddd":
                return ["Sun","Mon","Tue","Wed","Thr","Fri","Sat"][b.getDay()];
            case"dddd":
                return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][b.getDay()];
            case"M":
                return b.getMonth() + 1;
            case"MM":
                return c(b.getMonth() + 1);
            case"MMM":
                return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][b.getMonth()];
            case"MMMM":
                return ["January","February","March","April","May","June","July","August","September","October","November","December"][b.getMonth()];
            case"yy":
                return String(b.getFullYear()).substr(2);
            case"yyyy":
                return b.getFullYear();
            case"h":
                return b.getHours() % 12 || 12;
            case"hh":
                return c(b.getHours() % 12 || 12);
            case"H":
                return b.getHours();
            case"HH":
                return c(b.getHours());
            case"m":
                return b.getMinutes();
            case"mm":
                return c(b.getMinutes());
            case"s":
                return b.getSeconds();
            case"ss":
                return c(b.getSeconds());
            case"l":
                return c(b.getMilliseconds(), 3);
            case"L":
                var d = b.getMilliseconds();
                if(d > 99) {
                    d = Math.round(d / 10)
                }
                return c(d);
            case"tt":
                return b.getHours() < 12 ? "am" : "pm";
            case"TT":
                return b.getHours() < 12 ? "AM" : "PM";
            case"Z":
                return b.toUTCString().match(/[A-Z]+$/);
            default:
                return e.substr(1, e.length - 2)
        }
    })
};
var ssdjs = (function(c) {
    c.Assets = function a() {
        if(!(this instanceof arguments.callee)) {
            return new arguments.callee()
        }
        this.loaded = [];
        this.loading = [];
        this.src_list = [];
        this.data = [];
        this.image_to_canvas = false;
        this.fuchia_to_transparent = true;
        this.root = "";
        this.file_type = {};
        this.file_type.json = "json";
        this.file_type.wav = "audio";
        this.file_type.mp3 = "audio";
        this.file_type.ogg = "audio";
        this.file_type.png = "image";
        this.file_type.jpg = "image";
        this.file_type.jpeg = "image";
        this.file_type.gif = "image";
        this.file_type.bmp = "image";
        this.file_type.tiff = "image";
        var d = this;
        this.length = function() {
            return this.src_list.length
        };
        this.get = function(e) {
            if(c.util.isArray(e)) {
                return e.map(function(f) {
                    return d.data[f]
                })
            } else {
                if(this.loaded[e]) {
                    return this.data[e]
                }
            }
        };
        this.isLoading = function(e) {
            return this.loading[e]
        };
        this.isLoaded = function(e) {
            return this.loaded[e]
        };
        this.getPostfix = function(e) {
            postfix_regexp = /\.([a-zA-Z0-9]+)/;
            return postfix_regexp.exec(e)[1]
        };
        this.getType = function(e) {
            var f = this.getPostfix(e);
            return (this.file_type[f] ? this.file_type[f] : f)
        };
        this.add = function(f) {
            if(c.util.isArray(f)) {
                for(var e = 0; f[e]; e++) {
                    this.add(f[e])
                }
            } else {
                this.src_list.push(f)
            }
            return this
        };
        this.loadAll = function(e) {
            this.load_count = 0;
            this.error_count = 0;
            this.onload = e.onload;
            this.onerror = e.onerror;
            this.onfinish = e.onfinish;
            for( i = 0; this.src_list[i]; i++) {
                this.load(this.src_list[i])
            }
        };
        this.getOrLoad = function(g, f, e) {
            if(this.data[g]) {
                f()
            } else {
                this.load(g, f, e)
            }
        };
        this.load = function(j, h, e) {
            var f = {};
            f.src = j;
            f.onload = h;
            f.onerror = e;
            this.loading[j] = true;
            switch(this.getType(f.src)) {
                case"image":
                    var j = this.root + f.src;
                    f.image = new Image();
                    f.image.asset = f;
                    f.image.onload = this.assetLoaded;
                    f.image.onerror = this.assetError;
                    f.image.src = j;
                    break;
                case"audio":
                    var j = this.root + f.src;
                    f.audio = new Audio(j);
                    f.audio.asset = f;
                    this.data[f.src] = f.audio;
                    f.audio.addEventListener("canplay", this.assetLoaded, false);
                    f.audio.addEventListener("error", this.assetError, false);
                    f.audio.load();
                    break;
                default:
                    var j = this.root + f.src;
                    var g = new XMLHttpRequest();
                    g.asset = f;
                    g.onreadystatechange = this.assetLoaded;
                    g.open("GET", j, true);
                    g.send(null);
                    break
            }
        };
        this.assetLoaded = function(j) {
            var h = this.asset;
            var k = h.src;
            var f = d.getType(h.src);
            d.loaded[k] = true;
            d.loading[k] = false;
            if(f == "json") {
                if(this.readyState != 4) {
                    return
                }
                d.data[h.src] = JSON.parse(this.responseText)
            } else {
                if(f == "image") {
                    var g = d.image_to_canvas ? c.util.imageToCanvas(h.image) : h.image;
                    if(d.fuchia_to_transparent && d.getPostfix(h.src) == "bmp") {
                        g = b(g)
                    }
                    d.data[h.src] = g
                } else {
                    if(f == "audio") {
                        h.audio.removeEventListener("canplay", d.assetLoaded, false);
                        d.data[h.src] = h.audio
                    }
                }
            }
            d.load_count++;
            d.processCallbacks(h, true)
        };
        this.assetError = function(g) {
            var f = this.asset;
            d.error_count++;
            d.processCallbacks(f, false)
        };
        this.processCallbacks = function(f, e) {
            var g = parseInt((d.load_count + d.error_count) / d.src_list.length * 100);
            if(e) {
                if(d.onload) {
                    d.onload(f.src, g)
                }
                if(f.onload) {
                    f.onload()
                }
            } else {
                if(d.onerror) {
                    d.onerror(f.src, g)
                }
                if(f.onerror) {
                    f.onerror(f)
                }
            }
            if(g == 100) {
                if(d.onfinish) {
                    d.onfinish()
                }
                d.onload = null;
                d.onerror = null;
                d.onfinish = null
            }
        }
    };
    function b(g) {
        canvas = c.util.isImage(g) ? c.util.imageToCanvas(g) : g;
        var e = canvas.getContext("2d");
        var f = e.getImageData(0, 0, canvas.width, canvas.height);
        var h = f.data;
        for(var d = 0; d < h.length; d += 4) {
            if(h[d] == 255 && h[d + 1] == 0 && h[d + 2] == 255) {
                h[d + 3] = 0
            }
        }
        e.putImageData(f, 0, 0);
        return canvas
    }
    c.assets = new c.Assets();
    return c
})(ssdjs || {});
var ssdjs = (ssdjs || {});
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(b, a) {
        window.setTimeout(b, 16.666)
    }

})();
ssdjs.GameLoop = function GameLoop(c, b) {
    this.scene = c;
    this.fps = b;
    this.step_delay = 1000 / this.fps;
    this.ticks = 0;
    this.update_id
    this.paused = false;
    this.stopped = false;
    var a = this;
    this.switchScene = function(d) {
        this.ticks = 0;
        this.scene = d
    };
    this.start = function() {
        if(this.scene.setup && !this.scene.setuped) {
            this.scene.setuped = true;
            this.scene.setup()
        }
        this.update_id = setInterval(this.loop, this.step_delay)
    };
    this.loop = function() {
        if(!a.stopped && !a.paused) {
            if(a.scene.update) {
                a.scene.update(a.ticks)
            }
            if(a.scene.draw) {
                a.scene.draw(a.ticks)
            }
            a.ticks++
        }
    };
    this.pause = function() {
        this.paused = true
    };
    this.unpause = function() {
        this.paused = false
    };
    this.stop = function() {
        if(this.update_id) {
            clearInterval(this.update_id)
        }
        this.stopped = true
    }
};
var ssdjs = (function(a) {
    a.ImgLoader = (function(g) {
        var f = [];
        var e = [], d = null, c = function() {
            var h = 0;
            for(; h < e.length; h++) {
                e[h].end ? e.splice(h--, 1) : e[h]()
            }!e.length && b()
        }, b = function() {
            clearInterval(d);
            d = null
        };
        return function(j, n, q, s, p) {
            if(f[j] != null) {
                var o = f[j];
                o.obj = n;
                q.call(o);
                s.call(o);
                return
            }
            var r, k, t, m, h, l = new Image();
            l.src = j;
            l.obj = n;
            if(l.complete) {
                q.call(l);
                s && s.call(l);
                f[j] = l;
                return
            }
            k = l.width;
            t = l.height;
            l.onerror = function() {
                p && p.call(l);
                r.end = true;
                l = l.onload = l.onerror = null
            };
            r = function() {
                m = l.width;
                h = l.height;
                if(m !== k || h !== t || m * h > 1024) {
                    q.call(l);
                    r.end = true
                }
            };
            r();
            l.onload = function() {!r.end && r();
                s && s.call(l);
                f[j] = l;
                l = l.onload = l.onerror = null
            };
            if(!r.end) {
                e.push(r);
                if(d === null) {
                    d = setInterval(c, 40)
                }
            }
        }
    })();
    return a
})(ssdjs);
var ssdjs = (ssdjs || {});
ssdjs.animate = {
    moveTo : function(b, a, d, c) {
        b = b || {};
        b.move = {};
        b.move.tox = a;
        b.move.toy = d;
        b.move.step = c;
        b.step = b.step || c;
        b.step = Math.max(b.step, c);
        return b
    },
    scaleTo : function(a, d, c, b) {
        a = a || {};
        a.scale = {};
        a.scale.tox = d;
        a.scale.toy = c;
        a.scale.step = b;
        a.step = a.step || b;
        a.step = Math.max(a.step, b);
        return a
    },
    rotateTo : function(a, c, b) {
        a = a || {};
        a.rotate = {};
        a.rotate.toa = c;
        a.rotate.step = b;
        a.step = a.step || b;
        a.step = Math.max(a.step, b);
        return a
    },
    alphaTo : function(a, c, b) {
        a = a || {};
        a.alpha = {};
        a.alpha.toa = c;
        a.alpha.step = b;
        a.step = a.step || b;
        a.step = Math.max(a.step, b);
        return a
    },
    seqimg : function(a, c, b) {
        a = a || {};
        a.seqimg = {};
        a.seqimg.array = c;
        a.seqimg.step = b;
        a.step = a.step || b;
        a.step = Math.max(a.step, b);
        return a
    }
};
var ssdjs = (ssdjs || {});
ssdjs.client = {
    getChannel : function() {
        if(!window.ssdApp) {
            return null
        }
        return window.ssdApp.channel
    },
    getPlatform : function() {
        if(!window.ssdApp) {
            return null
        }
        return window.ssdApp.platform
    },
    getVersion : function() {
        if(!window.ssdApp) {
            return null
        }
        return window.ssdApp.version
    },
    getOs : function() {
        if(!window.ssdApp) {
            return null
        }
        return window.ssdApp.os
    },
    isClient : function() {
        if(!window.ssdObj) {
            return false
        }
        return true
    },
    snsLogin : function() {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsLogin();
            return true
        }
        return false
    },
    snsHome : function() {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsHome();
            return true
        }
        return false
    },
    snsExit : function() {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsExit();
            return true
        }
        return false
    },
    snsReload : function() {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsReload();
            return true
        }
        return false
    },
    snsLogout : function() {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsLogout();
            return true
        }
        return false
    },
    snsReg : function() {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsReg();
            return true
        }
        return false
    },
    snsVersion : function() {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsVersion();
            return true
        }
        return false
    },
    snsDownload : function(a) {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsDownload(a);
            return true
        }
        return false
    },
    snsPay : function(a, b, c) {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsPay(a, b, c);
            return true
        }
        return false
    },
    snsFeed : function(g, f, d, b, a, e, c) {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsFeed(g, f, d, b, a, e, c);
            return true
        }
        return false
    },
    snsUpload : function(a, b, c) {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsUpload(a, b, c);
            return true
        }
        return false
    },
    snsNotify : function(a, b) {
        if(ssdjs.client.isClient()) {
            window.ssdObj.snsNotify(a, b);
            return true
        }
        return false
    }
};
var ssdjs = (ssdjs || {});
ssdjs.$ = function(a) {
    return document.getElementById(a)
};
ssdjs.dom = {
    CLICK : true,
    evtEnd : function(c, b) {
        if(c == null || b == null) {
            return c
        }
        var a = function(d) {
            if(!ssdjs.dom.CLICK) {
                this.evt = null;
                return
            }
            if(this.btn) {
                this.opacity(1)
            }
            b(this, (this.evt));
            this.evt = null
        };
        if(ssdjs.browser.isTouch()) {
            c.ontouchend = a
        } else {
            c.onmouseup = a
        }
        return c
    },
    evtMove : function(c, b) {
        if(c == null || b == null) {
            return c
        }
        var a = function(d) {
            b(this, d)
        };
        if(ssdjs.browser.isTouch()) {
            c.ontouchmove = a
        } else {
            c.onmousemove = a
        }
        return c
    },
    evtStart : function(c, b) {
        if(c == null || b == null) {
            return c
        }
        var a = function(d) {
            if(!ssdjs.dom.CLICK) {
                return
            }
            this.evt = d;
            if(this.btn) {
                this.opacity(0.5)
            }
            b(this, d)
        };
        if(ssdjs.browser.isTouch()) {
            c.ontouchstart = a
        } else {
            c.onmousedown = a
        }
        return c
    },
    _basepos : function(b, g, d, a, f, c) {
        var e = false;
        if(b != null) {
            e = true;
            f.style.left = b + "px"
        }
        if(g != null) {
            e = true;
            f.style.top = g + "px"
        }
        if(d != null) {
            if(ssdjs.util.isString(d) && d.indexOf("%") > 0) {
                f.style.width = d
            } else {
                f.style.width = d + "px"
            }
        }
        if(a != null) {
            if(ssdjs.util.isString(a) && a.indexOf("%") > 0) {
                f.style.height = a
            } else {
                f.style.height = a + "px"
            }
        }
        if(e) {
            f.style.position = "absolute"
        } else {
            f.style.position = "relative"
        }
        f.css = function(h, l, k) {
            this.style[h.substring(0, 1).toLowerCase() + h.substring(1, h.length)] = l;
            if(k) {
                var m = ["Moz", "Webkit", "O", "Ms"];
                for(var j = 0; j < m.length; j++) {
                    this.style[m[j] + h] = l
                }
            }
        };
        f.opacity = function(j) {
            var k = ["opacity", "MozOpacity", "KhtmlOpacity"];
            for(var h = 0; h < k.length; h++) {
                this.style[k[h]] = j + ""
            }
            this.style.filter = "alpha(opacity=" + j * 100 + ")"
        };
        f.evtStart = function(h) {
            ssdjs.dom.evtStart(this, (h ||
            function(k, j) {
            }))

        };
        f.evtMove = function(h) {
            ssdjs.dom.evtMove(this, h)
        };
        f.evtEnd = function(h) {
            ssdjs.dom.evtEnd(this, h)
        };
        f.add = function(h) {
            this.appendChild(h)
        };
        return f
    },
    _base : function(b, g, d, a, f, c) {
        var e = false;
        if(b != null) {
            e = true;
            f.style.left = b + "px"
        }
        if(g != null) {
            e = true;
            f.style.top = g + "px"
        }
        if(d != null) {
            if(ssdjs.util.isString(d) && d.indexOf("%") > 0) {
                f.style.width = d
            } else {
                f.style.width = d + "px"
            }
        }
        if(a != null) {
            if(ssdjs.util.isString(a) && a.indexOf("%") > 0) {
                f.style.height = a
            } else {
                f.style.height = a + "px"
            }
        }
        if(e) {
            f.style.position = "absolute"
        } else {
            f.style.position = "relative"
        }
        f.css = function(h, l, k) {
            this.style[h.substring(0, 1).toLowerCase() + h.substring(1, h.length)] = l;
            if(k) {
                var m = ["Moz", "Webkit", "O", "Ms"];
                for(var j = 0; j < m.length; j++) {
                    this.style[m[j] + h] = l
                }
            }
        };
        f.opacity = function(j) {
            var k = ["opacity", "MozOpacity", "KhtmlOpacity"];
            for(var h = 0; h < k.length; h++) {
                this.style[k[h]] = j + ""
            }
            this.style.filter = "alpha(opacity=" + j * 100 + ")"
        };
        f.evtStart = function(h) {
            ssdjs.dom.evtStart(this, (h ||
            function(k, j) {
            }))

        };
        f.evtMove = function(h) {
            ssdjs.dom.evtMove(this, h)
        };
        f.evtEnd = function(h) {
            ssdjs.dom.evtEnd(this, h)
        };
        f.add = function(h) {
            this.appendChild(h)
        };
        return this.evtStart(this.evtEnd(f, c), function(j, h) {
        })
    },
    div : function(b, f, d, a, c) {
        var e = document.createElement("div");
        return this._base(b, f, d, a, e, c)
    },
    text : function(b, g, d, a, f, c) {
        var e = document.createElement("span");
        if(f != null) {
            e.innerHTML = f
        }
        return this._base(b, g, d, a, e, c)
    },
    a : function(b, g, e, a, c, d) {
        var f = document.createElement("a");
        if(c != null) {
            f.href = c
        }
        return this._base(b, g, e, a, f, d)
    },
    img : function(b, g, e, a, c, d) {
        var f = null;
        if(ssdjs.util.isDrawable(c)) {
            f = c
        } else {
            f = document.createElement("img");
            if(c != null) {
                f.src = c
            }
        }
        return this._base(b, g, e, a, f, d)
    },
    icon : function(c, b, g, a, f, e) {
        var d = ssdjs.dom.div(a || 0, f || 0, c, c);
        d.style.backgroundImage = "url(" + e + ")";
        d.style.backgroundPosition = "-" + (b - 1) * c + "px -" + (g - 1) * c + "px";
        return d
    },
    input : function(b, e, c, a) {
        var d = document.createElement("input");
        return this._base(b, e, c, a, d, function(f) {
            f.focus()
        })
    },
    textarea : function(b, e, c, a) {
        var d = document.createElement("textarea");
        return this._base(b, e, c, a, d, function(f) {
            f.focus()
        })
    },
    canvas : function(b, f, d, a, c) {
        var e = document.createElement("canvas");
        if(d != null) {
            e.width = d
        }
        if(a != null) {
            e.height = a
        }
        return this._base(b, f, d, a, e, c)
    }
};
var ssdjs = (ssdjs || {});
ssdjs.music = {
    ext : function() {
        var c = navigator.userAgent.toLowerCase();
        var b = /webkit/i.test(c);
        var a = /chrome/i.test(c);
        if(b && !a) {
            return ".mp3"
        }
        return ".ogg"
    },
    base : "sound/",
    bg : {
        on : 1,
        play : function(b) {
            if(ssdjs.music.bg.on != 1) {
                return
            }
            if(ssdjs.client.isClient()) {
                window.ssdObj.musicBgStart(b)
            } else {
                var a = ssdjs.$("ssdjsmusicbg");
                if(a == null) {
                    a = new Audio();
                    a.id = "ssdjsmusicbg";
                    a.loop = "loop";
                    document.body.appendChild(a)
                }
                a.src = ssdjs.music.base + b + ssdjs.music.ext();
                a.play()
            }
        },
        stop : function() {
            if(ssdjs.client.isClient()) {
                window.ssdObj.musicBgStop()
            } else {
                var a = ssdjs.$("ssdjsmusicbg");
                if(a != null) {
                    a.pause()
                }
            }
        },
        onoff : function(a) {
            if(a) {
                ssdjs.music.bg.on = 1
            } else {
                ssdjs.music.bg.stop();
                ssdjs.music.bg.on = 0
            }
        }
    },
    action : {
        on : 1,
        play : function(b) {
            if(ssdjs.music.action.on != 1) {
                return
            }
            if(ssdjs.client.isClient()) {
                window.ssdObj.musicAction(b)
            } else {
                var a = ssdjs.$("ssdjsmusicaction" + b);
                if(a == null) {
                    a = new Audio();
                    a.id = "ssdjsmusicaction" + b;
                    a.src = ssdjs.music.base + b + ssdjs.music.ext();
                    document.body.appendChild(a)
                }
                a.play()
            }
        },
        onoff : function(a) {
            if(a) {
                ssdjs.music.action.on = 1
            } else {
                ssdjs.music.action.on = 0
            }
        }
    },
    load : function(b) {
        if(ssdjs.client.isClient()) {
        } else {
            var a = ssdjs.$("ssdjsmusicaction" + b);
            if(a == null) {
                a = new Audio();
                a.id = "ssdjsmusicaction" + b;
                a.src = ssdjs.music.base + b + ssdjs.music.ext();
                document.body.appendChild(a)
            }
        }
    }
};
var ssdjs = (ssdjs || {});
ssdjs.log = function(b, a) {
    if(ssdjs.debug) {
        console.log(b)
    }
};
ssdjs.globe = {
    storage : {},
    startPoint : {
        x : 0,
        y : 0,
        sx : 1,
        sy : 1
    },
    inputData : {}
};
ssdjs.getCanvas = function(c) {
    if(c == null) {
        return null
    }
    var a = document.getElementById(c);
    if(!a) {
        return null
    }
    var b = a.getContext("2d");
    b.width = a.width;
    b.height = a.height;
    return b
};
ssdjs.clearDiv = function() {
    var b = document.getElementsByTagName("div");
    for(var a = 0; a < b.length; a++) {
        var c = b[a];
        if(c == null) {
            continue
        }
        if(c.id.indexOf("ssdjs_obj_div_") > -1) {
            c.style.display = "none"
        }
    }
};
ssdjs.setInterval = function(c, b) {
    if(!window.requestAnimationFrame && !window.webkitRequestAnimationFrame && !window.mozRequestAnimationFrame && !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) {
        return window.setInterval(c, b)
    }
    var e = new Date().getTime();
    var d = new Object();
    function a() {
        var f = new Date().getTime();
        var g = f - e;
        if(g >= b) {
            c.call();
            e = new Date().getTime()
        }
        d.value = requestAnimFrame(a)
    }
    d.value = requestAnimFrame(a);
    return d
};
ssdjs.clearInterval = function(a) {
    window.cancelAnimationFrame ? window.cancelAnimationFrame(a.value) : window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(a.value) : window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(a.value) : window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(a.value) : window.msCancelRequestAnimationFrame ? msCancelRequestAnimationFrame(a.value) : clearInterval(a)
};
ssdjs.storage = {
    valid : function() {
        return ("localStorage" in window) && window.localStorage != null
    },
    set : function(a, b) {
        if(this.valid()) {
            localStorage.setItem(a, b)
        } else {
            ssdjs.globe.storage[a] = b
        }
        return true
    },
    setJSON : function(b, c) {
        var a = JSON.stringify(c);
        return this.set(b, a)
    },
    get : function(a) {
        if(this.valid()) {
            return localStorage.getItem(a)
        } else {
            return ssdjs.globe.storage[a]
        }
    },
    getJSON : function(key) {
        var json = this.get(key);
        if(json == null) {
            return null
        }
        return eval("(" + json + ")")
    },
    remove : function(a) {
        if(this.valid()) {
            localStorage.removeItem(a);
            return true
        }
        return false
    },
    clear : function() {
        if(this.valid()) {
            localStorage.clear();
            return true
        }
        return false
    }
};
ssdjs.pager = {
    create : function(a, b, c) {
        var d = {};
        if(a != null) {
            d.pi = a
        } else {
            d.pi = 1
        }
        if(b != null) {
            d.ps = b
        } else {
            d.ps = 1
        }
        if(c != null) {
            d.rows = c
        }
        return d
    },
    first : function(a) {
        if(a == null) {
            return null
        }
        if(a.pi == null) {
            return null
        }
        a.pi = 1;
        return a
    },
    prev : function(a) {
        if(a == null) {
            return null
        }
        if(a.pi == null) {
            return null
        }
        a.pi = a.pi - 1;
        if(a.pi <= 1) {
            a.pi = 1
        }
        return a
    },
    next : function(a) {
        if(a == null) {
            return null
        }
        if(a.rows == null) {
            return null
        }
        if(a.ps == null) {
            return null
        }
        a.pi = a.pi + 1;
        var b = this.pageCount(a);
        if(b <= a.pi) {
            a.pi = b
        }
        return a
    },
    last : function(a) {
        var b = this.pageCount(a);
        a.pi = b;
        return a
    },
    pageCount : function(a) {
        if(a == null) {
            return 0
        }
        if(a.rows == null) {
            return 0
        }
        if(a.ps == null) {
            return 0
        }
        return (a.rows - (a.rows % a.ps)) / a.ps + ((a.rows % a.ps) > 0 ? 1 : 0)
    },
    isFirst : function(a) {
        if(a == null) {
            return true
        }
        if(a.pi <= 1) {
            return true
        }
        return false
    },
    isLast : function(a) {
        var b = this.pageCount(a);
        if(a.pi >= b) {
            return true
        }
        return false
    }
};
ssdjs.draw = {
    image : function(b) {
        if(b == null) {
            return
        }
        if(!b.image && b.src == null) {
            return
        }
        if(b.image != null) {
            this._draw(b);
            return
        }
        if(b.src != null) {
            var a = this;
            b.image = new Image();
            b.image.src = b.src;
            b.image.onload = function() {
                ssdjs.draw._draw(b)
            }
        }
    },
    _draw : function(h, a) {
        if(h.context == null) {
            h.context = ssdjs.context
        }
        var n = h.x;
        var m = h.y;
        if(h.offsetx != null && h.offsety != null) {
            n = (n + h.offsetx);
            m = (m + h.offsety)
        }
        if(h.context.offsetx != null && h.context.offsety != null) {
            n = (n + h.context.offsetx);
            m = (m + h.context.offsety)
        }
        var d = h.width * h.scale_x;
        var g = h.height * h.scale_y;
        if(h.scale_x != 1) {
            n = n - (d - (d / h.scale_x)) * h.anchor_x
        }
        if(h.scale_y != 1) {
            m = m - (g - (g / h.scale_y)) * h.anchor_y
        }
        var c = h.image;
        if(a != null && a) {
            c = h.oldimage
        }
        h.context.save();
        h.context.translate(n + d * h.anchor_x, m + g * h.anchor_y);
        if(h.angle != 0) {
            h.context.rotate(h.angle * Math.PI / 180)
        }
        if(h.flipped) {
            h.context.scale(-1, 1)
        }
        if(h.alpha != null) {
            h.context.globalAlpha = h.alpha
        }
        h.context.translate(-n - d * h.anchor_x, -m - g * h.anchor_y);
        try {
            if(h.sw != null && h.sw > 0) {
                var j = !h.sx ? 0 : h.sx;
                var f = !h.sy ? 0 : h.sy;
                var k = !h.sw ? 0 : h.sw;
                var b = !h.sh ? 0 : h.sh;
                h.context.drawImage(c, j, f, k, b, n, m, d, g)
            } else {
                h.context.drawImage(c, n, m, d, g)
            }
        } catch(l) {
        }
        h.context.restore()
    },
    mov : function(a) {
        if(a.idx == null) {
            a.idx = 0
        }
        if(a.idx >= a.frames.length) {
            a.idx = 0
        }
        a.src = a.frames[a.idx];
        a.image = null;
        ssdjs.draw.image(a);
        a.idx = a.idx + 1
    },
    text : function(e) {
        if(e.context == null) {
            e.context = ssdjs.context
        }
        if(e.addr != null) {
            e.x = e.addr[0];
            e.y = e.addr[1];
            e.width = e.addr[2];
            e.height = e.addr[3]
        }
        if(e.lineheight == null) {
            e.lineheight = 20
        }
        if(e.text == null || e.text.length <= 0) {
            return
        }
        e.context.save();
        if(e.alpha != null) {
            e.context.globalAlpha = e.alpha
        }
        if(e.font != null) {
            e.context.font = e.font
        }
        if(e.textBaseline != null) {
            e.context.textBaseline = e.textBaseline
        }
        if(e.fillStyle != null) {
            e.context.fillStyle = e.fillStyle
        }
        if(e.border != null) {
            if(e.border.color != null) {
                e.context.strokeStyle = e.border.color
            }
            if(e.border.size != null) {
                e.context.lineWidth = e.border.size
            }
        }
        if(e.html) {
            e.text = e.text.replace(new RegExp("<br/>", "gmi"), "\n")
        }
        var f = 0;
        var a = 0;
        if(e.startline == null) {
            e.startline = 0
        }
        var d = e.context.measureText(e.text);
        var c = e.x;
        var b = e.y + ((a - e.startline) * e.lineheight);
        if(e.align == "center") {
            c = e.x + (e.width - d.width) / 2
        }
        if(e.align == "right") {
            c = e.x + (e.width - d.width)
        }
        if(e.offsetx != null && e.offsety != null) {
            c = c + e.offsetx;
            b = b + e.offsety
        }
        if(e.context.offsetx != null && e.context.offsety != null) {
            c = c + e.context.offsetx;
            b = b + e.context.offsety
        }
        if(e.border != null) {
            e.context.strokeText(e.text, c, b)
        }
        e.context.fillText(e.text, c, b);
        e.context.restore()
    },
    label : function(c) {
        if(c.context == null) {
            c.context = ssdjs.context
        }
        if(c.addr != null) {
            c.x = c.addr[0];
            c.y = c.addr[1];
            c.width = c.addr[2];
            c.height = c.addr[3]
        }
        if(c.lineheight == null) {
            c.lineheight = 20
        }
        if(c.text == null || c.text.length <= 0) {
            return
        }
        c.context.save();
        if(!ssdjs.util.isString(c.text)) {
            c.text = c.text + ""
        }
        if(c.alpha != null) {
            c.context.globalAlpha = c.alpha
        }
        if(c.font != null) {
            c.context.font = c.font
        }
        if(c.textBaseline != null) {
            c.context.textBaseline = c.textBaseline
        }
        if(c.fillStyle != null) {
            c.context.fillStyle = c.fillStyle
        }
        if(c.border != null) {
            if(c.border.color != null) {
                c.context.strokeStyle = c.border.color
            }
            if(c.border.size != null) {
                c.context.lineWidth = c.border.size
            }
        }
        if(c.html) {
            c.text = c.text.replace(new RegExp("<br/>", "gmi"), "\n")
        }
        var b = 0;
        var l = 0;
        if(c.startline == null) {
            c.startline = 0
        }
        var h = c.context.measureText(c.text);
        if(h.width <= c.width && c.text.indexOf("\n") < 0) {
            var f = c.x;
            var e = c.y + ((l - c.startline) * c.lineheight);
            if(c.align == "center") {
                f = c.x + (c.width - h.width) / 2
            }
            if(c.align == "right") {
                f = c.x + (c.width - h.width)
            }
            if(c.offsetx != null && c.offsety != null) {
                f = f + c.offsetx;
                e = e + c.offsety
            }
            if(c.context.offsetx != null && c.context.offsety != null) {
                f = f + c.context.offsetx;
                e = e + c.context.offsety
            }
            if(c.border != null) {
                c.context.strokeText(c.text, f, e)
            }
            c.context.fillText(c.text, f, e);
            c.context.restore();
            return
        }
        for(var d = 1; d <= c.text.length; d++) {
            var a = c.text.substring(d - 1, d);
            var k = c.text.substring(b, d);
            var h = c.context.measureText(k);
            if(h.width >= c.width || d >= c.text.length || a == "\n") {
                if(l >= c.startline) {
                    var f = c.x;
                    var e = c.y + ((l - c.startline) * c.lineheight);
                    if(c.align == "center") {
                        f = c.x + (c.width - h.width) / 2
                    }
                    if(c.align == "right") {
                        f = c.x + (c.width - h.width)
                    }
                    var j = f;
                    var g = e;
                    if(c.offsetx != null && c.offsety != null) {
                        j = j + c.offsetx;
                        g = g + c.offsety
                    }
                    if(c.context.offsetx != null && c.context.offsety != null) {
                        j = j + c.context.offsetx;
                        g = g + c.context.offsety
                    }
                    if(c.border != null) {
                        c.context.strokeText(k, j, g)
                    }
                    c.context.fillText(k, j, g)
                }
                l = l + 1;
                b = d;
                if(((l - c.startline) * c.lineheight) > c.height) {
                    break
                }
            }
        }
        c.context.restore()
    },
    shape : function(g) {
        if(g.context == null) {
            g.context = ssdjs.context
        }
        if(g.addr != null) {
            g.x = g.addr[0];
            g.y = g.addr[1];
            g.width = g.addr[2];
            g.height = g.addr[3]
        }
        if(g.alpha != null) {
            g.context.globalAlpha = g.alpha
        }
        if(g.bgcolor != null) {
            g.context.fillStyle = g.bgcolor
        }
        if(g.border != null) {
            if(g.border.color != null) {
                g.context.strokeStyle = g.border.color
            }
            if(g.border.size != null) {
                g.context.lineWidth = g.border.size
            }
        }
        g.context.beginPath();
        for(var e = 0; e < g.path.length; e++) {
            var f = g.path[e];
            if(f == null) {
                continue
            }
            var d = f.x;
            var c = f.y;
            if(g.offsetx != null && g.offsety != null) {
                d = d + g.offsetx;
                c = c + g.offsety
            }
            if(g.context.offsetx != null && g.context.offsety != null) {
                d = d + g.context.offsetx;
                c = c + g.context.offsety
            }
            switch(f.a) {
                case 1:
                    g.context.moveTo(d, c);
                    break;
                case 2:
                    g.context.lineTo(d, c);
                    break;
                case 3:
                    var b = f.tox;
                    var a = f.toy;
                    if(g.offsetx != null && g.offsety != null) {
                        b = b + g.offsetx;
                        a = a + g.offsety
                    }
                    if(g.context.offsetx != null && g.context.offsety != null) {
                        b = b + g.context.offsetx;
                        a = a + g.context.offsety
                    }
                    g.context.arcTo(d, c, b, a, f.r);
                    break;
                case 4:
                    g.context.arc(d, c, f.r, f.s, f.e, f.dir);
                    break
            }
        }
        g.context.closePath();
        var d = g.x;
        var c = g.y;
        if(g.offsetx != null && g.offsety != null) {
            d = d + g.offsetx;
            c = c + g.offsety
        }
        if(g.context.offsetx != null && g.context.offsety != null) {
            d = d + g.context.offsetx;
            c = c + g.context.offsety
        }
        if(g.border != null) {
            g.context.stroke(d, c, g.width, g.height)
        }
        if(g.bgcolor != null) {
            g.context.fill()
        }
    },
    rect : function(c) {
        if(c.context == null) {
            c.context = ssdjs.context
        }
        if(c.addr != null) {
            c.x = c.addr[0];
            c.y = c.addr[1];
            c.width = c.addr[2];
            c.height = c.addr[3]
        }
        if(c.alpha != null) {
            c.context.globalAlpha = c.alpha
        }
        if(c.bgcolor != null) {
            c.context.fillStyle = c.bgcolor
        }
        if(c.border != null) {
            if(c.border.color != null) {
                c.context.strokeStyle = c.border.color
            }
            if(c.border.size != null) {
                c.context.lineWidth = c.border.size
            }
        }
        var b = c.x;
        var a = c.y;
        if(c.offsetx != null && c.offsety != null) {
            b = b + c.offsetx;
            a = a + c.offsety
        }
        if(c.context.offsetx != null && c.context.offsety != null) {
            b = b + c.context.offsetx;
            a = a + c.context.offsety
        }
        if(c.corner != null) {
            c.context.beginPath();
            if(ssdjs.browser.isOpera()) {
                c.context.moveTo(b + c.corner[0], a);
                c.context.lineTo(b + c.width - c.corner[1], a);
                c.context.lineTo(b + c.width, a, b + c.width, a + c.corner[1], c.corner[1]);
                c.context.lineTo(b + c.width, a + c.height - c.corner[2]);
                c.context.lineTo(b + c.width, a + c.height, b + c.width - c.corner[2], a + c.height, c.corner[2]);
                c.context.lineTo(b + c.corner[3], a + c.height);
                c.context.lineTo(b, a + c.height, b, c.height - c.corner[3], c.corner[3]);
                c.context.lineTo(b, a + c.height - c.corner[3], b, a + c.corner[0]);
                c.context.lineTo(b, a, b + c.corner[0], a, c.corner[0])
            } else {
                c.context.moveTo(b + c.corner[0], a);
                c.context.lineTo(b + c.width - c.corner[1], a);
                c.context.arcTo(b + c.width, a, b + c.width, a + c.corner[1], c.corner[1]);
                c.context.lineTo(b + c.width, a + c.height - c.corner[2]);
                c.context.arcTo(b + c.width, a + c.height, b + c.width - c.corner[2], a + c.height, c.corner[2]);
                c.context.lineTo(b + c.corner[3], a + c.height);
                c.context.arcTo(b, a + c.height, b, c.height - c.corner[3], c.corner[3]);
                c.context.lineTo(b, a + c.height - c.corner[3], b, a + c.corner[0]);
                c.context.arcTo(b, a, b + c.corner[0], a, c.corner[0])
            }
            c.context.closePath();
            if(c.border != null) {
                c.context.stroke(b, a, c.width, c.height)
            }
            if(c.bgcolor != null) {
                c.context.fill()
            }
        } else {
            if(c.bgcolor != null) {
                c.context.fillRect(b, a, c.width, c.height)
            }
            if(c.border != null) {
                c.context.strokeRect(b, a, c.width, c.height)
            }
        }
    },
    line : function(e) {
        if(e.context == null) {
            e.context = ssdjs.context
        }
        if(e.addr != null) {
            e.x = e.addr[0];
            e.y = e.addr[1];
            e.tox = e.addr[2];
            e.toy = e.addr[3]
        }
        if(e.alpha != null) {
            e.context.globalAlpha = e.alpha
        }
        if(e.pen != null) {
            if(e.pen.color != null) {
                e.context.strokeStyle = e.pen.color
            }
            if(e.pen.size != null) {
                e.context.lineWidth = e.pen.size
            }
        }
        var d = e.x;
        var c = e.y;
        var b = e.tox;
        var a = e.toy;
        if(e.offsetx != null && e.offsety != null) {
            d = d + e.offsetx;
            c = c + e.offsety;
            b = b + e.offsetx;
            a = a + e.offsety
        }
        if(e.context.offsetx != null && e.context.offsety != null) {
            d = d + e.context.offsetx;
            c = c + e.context.offsety;
            b = b + e.context.offsetx;
            a = a + e.context.offsety
        }
        e.context.beginPath();
        e.context.moveTo(d, c);
        e.context.lineTo(b, a);
        e.context.closePath();
        e.context.stroke()
    },
    dash : function(d) {
        if(d.context == null) {
            d.context = ssdjs.context
        }
        if(d.addr != null) {
            d.x = d.addr[0];
            d.y = d.addr[1];
            d.tox = d.addr[2];
            d.toy = d.addr[3]
        }
        var h = d.dash;
        if(h == null) {
            h = [10, 10]
        }
        if(d.alpha != null) {
            d.context.globalAlpha = d.alpha
        }
        if(d.pen != null) {
            if(d.pen.color != null) {
                d.context.strokeStyle = d.pen.color
            }
            if(d.pen.size != null) {
                d.context.lineWidth = d.pen.size
            }
        }
        if(!h) {
            h = [10, 5]
        }
        if(b == 0) {
            b = 0.001
        }
        var o = d.x;
        var n = d.y;
        var m = d.tox;
        var k = d.toy;
        if(d.offsetx != null && d.offsety != null) {
            o = o + d.offsetx;
            n = n + d.offsety;
            m = m + d.offsetx;
            k = k + d.offsety
        }
        if(d.context.offsetx != null && d.context.offsety != null) {
            o = o + d.context.offsetx;
            n = n + d.context.offsety;
            m = m + d.context.offsetx;
            k = k + d.context.offsety
        }
        var g = h.length;
        d.context.beginPath();
        d.context.moveTo(o, n);
        var j = o;
        var f = n;
        var r = (m - o), q = (k - n);
        var l = q / r;
        var c = Math.sqrt(r * r + q * q);
        var e = 0, p = true;
        while(c >= 0.1) {
            var b = h[e++ % g];
            if(b > c) {
                b = c
            }
            var a = Math.sqrt(b * b / (1 + l * l));
            j += a;
            f += l * a;
            d.context[p?"lineTo":"moveTo"](j, f);
            c -= b;
            p = !p
        }
        d.context.closePath();
        d.context.stroke()
    }
};
ssdjs.browser = {
    size : function() {
        return {
            x : window.innerWidth || document.documentElement.clientWidth,
            y : window.innerHeight || document.documentElement.clientHeight
        }
    },
    get : function() {
        var a = {};
        a.name = navigator.appName;
        a.version = navigator.appVersion;
        a.code = navigator.appCodeName;
        a.ua = navigator.userAgent;
        return a
    },
    isOpera : function() {
        var a = this.get();
        if(a == null) {
            return false
        }
        if(a.ua == null) {
            return false
        }
        if(a.ua.toLowerCase().indexOf("opera") >= 0) {
            return true
        }
        return false
    },
    isAndroid : function() {
        return (/android/gi).test(navigator.appVersion)
    },
    isIDevice : function() {
        return (/iphone|ipad/gi).test(navigator.appVersion)
    },
    isTouchPad : function() {
        return (/hp-tablet/gi).test(navigator.appVersion)
    },
    isTouch : function() {
        if("ontouchstart" in window) {
            return true
        }
        if("createTouch" in document) {
            return true
        }
        return false
    },
    getUrlParameters : function() {
        var d = [], c;
        var a = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
        for(var b = 0; b < a.length; b++) {
            c = a[b].split("=");
            d.push(c[0]);
            d[c[0]] = c[1]
        }
        return d
    },
    getRequest : function() {
        var b = location.search;
        var a = new Object();
        if(b.indexOf("?") != -1) {
            var d = b.substr(1);
            strs = d.split("&");
            for(var c = 0; c < strs.length; c++) {
                a[strs[c].split("=")[0]] = unescape(strs[c].split("=")[1])
            }
        }
        return a
    }
};
ssdjs.events = {
    RESIZE : "onorientationchange" in window ? "orientationchange" : "resize",
    START : ssdjs.browser.isTouch() ? "touchstart" : "mousedown",
    MOVE : ssdjs.browser.isTouch() ? "touchmove" : "mousemove",
    END : ssdjs.browser.isTouch() ? "touchend" : "mouseup",
    CANCEL : ssdjs.browser.isTouch() ? "touchcancel" : "mouseup",
    getPoint : function(b) {
        var a = {
            x : -1,
            y : -1
        };
        if(!b) {
            return a
        }
        if(ssdjs.browser.isTouch()) {
            if(!b.touches[0]) {
                return a
            }
            if(!b.touches[0].pageX) {
                return a
            }
            return {
                x : b.touches[0].pageX,
                y : b.touches[0].pageY
            }
        } else {
            if(b.pageX != null) {
                return {
                    x : b.pageX,
                    y : b.pageY
                }
            }
            return {
                x : b.clientX,
                y : b.clientY
            }
        }
    }
};
ssdjs.util = {
    imageToCanvas : function(c) {
        var a = document.createElement("canvas");
        a.src = c.src;
        a.width = c.width;
        a.height = c.height;
        var b = a.getContext("2d");
        b.drawImage(c, 0, 0, c.width, c.height);
        return a
    },
    emptyFunc : function() {
    },
    isString : function(a) {
        return ( typeof a == "string")
    },
    isImage : function(a) {
        return Object.prototype.toString.call(a) === "[object HTMLImageElement]"
    },
    isCanvas : function(a) {
        return Object.prototype.toString.call(a) === "[object HTMLCanvasElement]"
    },
    isDrawable : function(a) {
        return this.isImage(a) || this.isCanvas(a)
    },
    isArray : function(a) {
        if(a === undefined) {
            return false
        }
        return !(a.constructor.toString().indexOf("Array") == -1)
    },
    isFunction : function(a) {
        return (Object.prototype.toString.call(a) === "[object Function]")
    },
    cutImage : function(f, b, g, d, a) {
        var e = document.createElement("canvas");
        e.width = d;
        e.height = a;
        var c = e.getContext("2d");
        c.drawImage(f, b, g, d, a, 0, 0, e.width, e.height);
        return e
    },
    devideInt : function(d, c) {
        if(d == 0) {
            return 0
        }
        if(c == 0) {
            return 0
        }
        return (d - (d % c)) / c
    },
    getStartPoint : function() {
        return ssdjs.globe.startPoint
    },
    setStartPoint : function(a) {
        ssdjs.globe.startPoint = a
    },
    fixOffset : function(b) {
        var a = this.getStartPoint();
        var e = a.sx || 1;
        var d = a.sy || 1;
        var c = {
            x : (b.x - a.x) / e,
            y : (b.y - a.y) / d
        };
        return c
    },
    isOnSprite : function(e, a) {
        if(!e) {
            return false
        }
        if(e.visiable != null && !e.visiable) {
            return false
        }
        if(e.collidePoint != null) {
            return e.collidePoint(a.x, a.y)
        }
        var d = e.touchRect;
        var c = 0;
        var g = 0;
        var f = 0;
        var b = 0;
        if(d != null) {
            if(d.l != null) {
                c = d.l
            }
            if(d.r != null) {
                g = d.r
            }
            if(d.t != null) {
                f = d.t
            }
            if(d.b != null) {
                b = d.b
            }
        }
        if((e.x - c) > a.x || (e.x + e.width + g) < a.x) {
            return false
        }
        if((e.y - f) > a.y || (e.y + e.height + b) < a.y) {
            return false
        }
        return true
    },
    getSelItem : function(c, a) {
        if(c == null) {
            return null
        }
        if(c.length <= 0) {
            return null
        }
        for(var b = c.length - 1; b >= 0; b--) {
            if(this.isOnSprite(c[b], a)) {
                return c[b]
            }
        }
    },
    clone : function(c) {
        if( typeof (c) != "object") {
            return c
        }
        if(c == null) {
            return c
        }
        var b = new Object();
        for(var a in c) {
            b[a] = this.clone(c[a])
        }
        return b
    }
};
ssdjs.fmt = {
    event : function(c, f) {
        if(c == null || c.length <= 0) {
            return ""
        }
        if(f != null) {
            try {
                if(f != null && f.length > 0) {
                    for(var a = 0; a < f.length; a++) {
                        var b = "\\{" + a + "\\}";
                        c = c.replace(new RegExp(b, "gmi"), f[a])
                    }
                }
                return c
            } catch(d) {
                return ""
            }
        }
    },
    micro : function(d) {
        if(d == null) {
            return d
        }
        d = d + "";
        var b = new RegExp("@([^\\(]*)\\((\\d{1,})\\)", "gmi");
        d = d.replace(b, "$1");
        var c = new RegExp("@([^\\{]*)\\{(\\d{1,})\\}", "gmi");
        d = d.replace(c, "$1");
        var a = new RegExp("#([^\\(]*)\\(([^\\)]*)\\)", "gmi");
        d = d.replace(a, "$1");
        return d
    },
    numD100 : function(a) {
        return a / 100
    },
    numCN : function(b, c) {
        var a = ["千", "万", "百万", "千万", "亿", null];
        if(c != null) {
            a = c
        }
        if(b >= 1000000000 && a[5]) {
            return ssdjs.util.devideInt(b, 1000000000) + a[5]
        }
        if(b >= 100000000 && a[4]) {
            return ssdjs.util.devideInt(b, 100000000) + a[4]
        }
        if(b >= 10000000 && a[3]) {
            return ssdjs.util.devideInt(b, 10000000) + a[3]
        }
        if(b >= 1000000 && a[2]) {
            return ssdjs.util.devideInt(b, 1000000) + a[2]
        }
        if(b >= 10000 && a[1]) {
            return ssdjs.util.devideInt(b, 10000) + a[1]
        }
        if(b >= 1000 && a[0]) {
            return ssdjs.util.devideInt(b, 1000) + a[0]
        }
        return b + ""
    },
    numEN : function(c) {
        c = c + "";
        var a = c.split(".")[0].split("").reverse(), f = c.split(".")[1];
        var d = "";
        var e = a.length;
        if(c.indexOf("-") >= 0) {
            e = e - 1
        }
        for( i = 0; i < a.length; i++) {
            d += a[i] + ((i + 1) % 3 == 0 && (i + 1) != e && (i + 1) != a.length ? "," : "")
        }
        var b = d.split("").reverse().join("");
        if(f) {
            b = b + "." + f
        }
        return b
    },
    date : function(a, b) {
        var c = new Date(a);
        if(b == null) {
            return c.format("yyyy-MM-dd hh:mm")
        } else {
            return c.format(b)
        }
    },
    spanShortHMS : function(b) {
        var d = ssdjs.fmt.hour(b);
        var a = ssdjs.fmt.min(b % (60 * 60 * 1000));
        var c = ssdjs.fmt.sec(b % (60 * 1000));
        if(d != "00") {
            return d + ":" + a
        }
        if(a != "00") {
            return a + ":" + c
        }
        return c
    },
    spanHMS : function(b) {
        var d = ssdjs.fmt.hour(b);
        var a = ssdjs.fmt.min(b % (60 * 60 * 1000));
        var c = ssdjs.fmt.sec(b % (60 * 1000));
        return d + ":" + a + ":" + c
    },
    time : function(f, h, a) {
        var c = ["秒", "分", "小时", "天", "月"];
        if(a != null) {
            c = a
        }
        var b = 100;
        if(h != null) {
            b = h
        }
        if(b <= 0) {
            return ""
        }
        var j = 24 * 60 * 60 * 1000;
        if(f >= j) {
            return ssdjs.util.devideInt(f, j) + c[3] + this.time(f % j, b - 1)
        }
        var d = 60 * 60 * 1000;
        if(f >= d) {
            return ssdjs.util.devideInt(f, d) + c[2] + this.time(f % d, b - 1)
        }
        var e = 60 * 1000;
        if(f >= e) {
            return ssdjs.util.devideInt(f, e) + c[1] + this.time(f % e, b - 1)
        }
        var g = 1000;
        if(f >= g) {
            return ssdjs.util.devideInt(f, g) + c[0]
        }
        return "0" + c[0]
    },
    hour : function(b) {
        var a = 60 * 60 * 1000;
        if(b >= a) {
            return ssdjs.util.devideInt(b, a)
        } else {
            return "00"
        }
    },
    min : function(c) {
        var b = 60 * 1000;
        if(c >= b) {
            var a = "00" + ssdjs.util.devideInt(c, b);
            return a.substring(a.length - 2)
        } else {
            return "00"
        }
    },
    sec : function(b) {
        var c = 1000;
        if(b >= c) {
            var a = "00" + ssdjs.util.devideInt(b, c);
            return a.substring(a.length - 2)
        } else {
            return "00"
        }
    },
    percent : function(a, b) {
        if(b == 0) {
            return 0
        }
        return (a * 100 / b) | 0
    }
};
ssdjs.ani = {
    nextFrame : function(b) {
        var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(c) {
            return setTimeout(c, 10)
        };

        return a(b)
    },
    cancelFrame : function(b) {
        var a = window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
        a(b)
    }
};
ssdjs.req = {
    _seq : 0,
    seq : function() {
        ssdjs.req._seq = ssdjs.req._seq + 1;
        return ssdjs.req._seq
    },
    req : function(b, h, d, f, a, e) {
        var c = ssdjs.req.seq();
        if(a) {
            c = 1
        }
        var g = {
            type : "post",
            async : true,
            url : b,
            dataType : "jsonp",
            jsonp : "jcb",
            jsonpCallback : "jcb_" + c,
            success : h,
            error : d,
            timeout : e || 20000
        };
        if(false) {
            g.beforeSend = function(j) {
                try {
                    j.setRequestHeader("Connection", "Keep-Alive")
                } catch(k) {
                }
            }
        }
        if(f != null) {
            g.data = f
        }
        return $.ajax(g)
    }
};
var ssdjs = (function(b) {
    b.Object = function a(f, d, g, e, c) {
        this.offsetx = 0;
        this.offsety = 0;
        this.type = f;
        this.baseX = d;
        this.baseY = g;
        this.baseW = e;
        this.baseH = c;
        this.x = d;
        this.y = g;
        this.width = e;
        this.height = c;
        this.visiable = true;
        this.setuped = false;
        this.scale_x = 1;
        this.scale_y = 1;
        this.anchor_x = 0.5;
        this.anchor_y = 0.5;
        this.angle = 0;
        this.alpha = 1;
        this.flipped = false;
        this.aniseq = new Array()
    };
    b.Object.prototype.setContext = function(c) {
        this.context = c
    };
    b.Object.prototype.setAlpha = function(c) {
        this.alpha = c
    };
    b.Object.prototype.setAnchor = function(e) {
        var d = {
            top_left : [0, 0],
            left_top : [0, 0],
            center_left : [0, 0.5],
            left_center : [0, 0.5],
            bottom_left : [0, 1],
            left_bottom : [0, 1],
            top_center : [0.5, 0],
            center_top : [0.5, 0],
            center_center : [0.5, 0.5],
            center : [0.5, 0.5],
            bottom_center : [0.5, 1],
            center_bottom : [0.5, 1],
            top_right : [1, 0],
            right_top : [1, 0],
            center_right : [1, 0.5],
            right_center : [1, 0.5],
            bottom_right : [1, 1],
            right_bottom : [1, 1]
        };
        var c = d[e];
        this.anchor_x = c[0];
        this.anchor_y = c[1];
        return this
    };
    b.Object.prototype.offset = function(c, d) {
        this.offsetx = this.offsetx + c;
        this.offsety = this.offsety + d
    };
    b.Object.prototype.offsetTo = function(c, f) {
        var e = c - this.offsetx;
        var d = f - this.offsety;
        return this.offset(e, d)
    };
    b.Object.prototype.move = function(c, d) {
        this.x += c;
        this.y += d;
        return this
    };
    b.Object.prototype.moveTo = function(c, f) {
        var e = c - this.x;
        var d = f - this.y;
        return this.move(e, d)
    };
    b.Object.prototype.flip = function() {
        this.flipped = this.flipped ? false : true;
        return this
    };
    b.Object.prototype.flipTo = function(c) {
        this.flipped = c;
        return this
    };
    b.Object.prototype.rotate = function(c) {
        this.angle += c;
        this.angle = this.angle % 360;
        return this
    };
    b.Object.prototype.rotateTo = function(c) {
        this.angle = c;
        return this
    };
    b.Object.prototype.resize = function(d, c) {
        this.scale_x = (this.width + d) / this.image.width;
        this.scale_y = (this.height + c) / this.image.height
    };
    b.Object.prototype.resizeTo = function(f, c) {
        var e = f - this.width;
        var d = c - this.height;
        return this.resize(e, d)
    };
    b.Object.prototype.scaleTo = function(c) {
        this.scale_x = this.scale_y = c
    };
    b.Object.prototype.draw = function(c) {
        if(!this.visiable) {
            return this
        }
        return this
    };
    b.Object.prototype.collidePoint = function(c, k) {
        var e = this.width * this.scale_x;
        var h = this.height * this.scale_y;
        var j = this.x;
        var g = this.y;
        var d = this.x + e;
        var f = this.y + h;
        if(this.touchRect != null) {
            if(this.touchRect.l != null) {
                j = j - this.touchRect.l
            }
            if(this.touchRect.r != null) {
                d = d + this.touchRect.r
            }
            if(this.touchRect.t != null) {
                g = g - this.touchRect.t
            }
            if(this.touchRect.b != null) {
                f = f + this.touchRect.b
            }
        }
        return (c >= j && c <= d && k >= g && k <= f)
    };
    b.Object.prototype.collideRect = function(e) {
        var d = this.width * this.scale_x;
        var h = this.height * this.scale_y;
        var j = this.x;
        var g = this.y;
        var c = this.x + d;
        var f = this.y + h;
        if(this.touchRect != null) {
            if(this.touchRect.l != null) {
                j = j - this.touchRect.l
            }
            if(this.touchRect.r != null) {
                c = c + this.touchRect.r
            }
            if(this.touchRect.t != null) {
                g = g - this.touchRect.t
            }
            if(this.touchRect.b != null) {
                f = f + this.touchRect.b
            }
        }
        return ((j >= e.x && j <= e.x + e.width) || (e.x >= j && e.x <= c)) && ((g >= e.y && g <= e.y + e.height) || (e.y >= g && e.y <= f))
    };
    b.Object.prototype.setOnclick = function(c) {
        this.onstart = function(e, d) {
            return this
        };
        this.onend = c
    };
    b.Object.prototype.getPosition = function() {
        return [this.x, this.y]
    };
    b.Object.prototype.toString = function() {
        var c = this.width * this.scale_x;
        var d = this.height * this.scale_y;
        return "[" + this.type + " " + this.x + ", " + this.y + ", " + c + ", " + d + "]"
    };
    return b
})(ssdjs || {});
var ssdjs = (function(b) {
    b.InputBox = function a(d, f, e, c) {
        b.Object.call(this, "InputBox", d, f, e, c);
        this.autodraw = true
    };
    b.InputBox.prototype = new b.Object();
    b.InputBox.prototype.setText = function(c) {
        this.text = c
    };
    b.InputBox.prototype.getText = function(c) {
        return this.text
    };
    b.InputBox.prototype.setBgcolor = function(c) {
        this.bgcolor = c
    };
    b.InputBox.prototype.setCorner = function(c) {
        this.corner = c
    };
    b.InputBox.prototype.setBorder = function(d, c) {
        this.border = {
            size : d,
            color : c
        }
    };
    b.InputBox.prototype.setPen = function(e, d, c) {
        this.pen = {
            size : e,
            color : d,
            font : c
        }
    };
    b.InputBox.prototype.draw = function(c) {
        if(!this.visiable) {
            return this
        }
        if(!c) {
            b.context.save()
        }
        b.draw.rect({
            x : this.x,
            y : this.y,
            width : this.width,
            height : this.height,
            bgcolor : this.bgcolor,
            border : this.border,
            corner : this.corner
        });
        var d = this.pen.size + "px ";
        if(this.pen.font != null) {
            d = d + this.pen.font
        } else {
            d = d + "terminal"
        }
        b.draw.label({
            x : this.x + 2,
            y : this.y + (this.height - this.textheight) / 2,
            width : this.width - this.pen.size,
            align : this.align,
            height : this.height - (this.height - this.textheight),
            text : this.text,
            font : d,
            lineheight : this.lineheight,
            fillStyle : this.pen.color,
            textBaseline : this.textBaseline,
        });
        if(!c) {
            b.context.restore()
        }
        return this
    };
    b.InputBox.prototype.onclick = function() {
        b.globe.inputData.textbox = this;
        if(b.globe.inputData.div == null) {
            var d = document.createElement("div");
            b.globe.inputData.div = d;
            d.setAttribute("id", "ssdjsInput");
            d.style.position = "absolute";
            d.style.margin = "0 auto";
            d.style.backgroundColor = "rgba(0,0,0,0.8)";
            d.style.overflow = "hidden";
            if(this.popup == null) {
                var c = "<div style='width:400px;height:180px;background-color:#fee378;border:1px solid #e9aa1f;display:block;margin:10px auto auto;'>";
                c = c + "<div style='width:400px;height:30px;text-align:center;color:#07681e;display:block;margin:10px auto auto;font-size:24px'>请输入</div>";
                c = c + "<input id='ssdinputtext' type='text' style='width:300px;height:40px;text-align:center;background-color:rgb(255,255,255);font-size:30px;display:block;margin:10px auto auto;'>";
                c = c + "<input type='button' style='width: 100px; height: 40px; background-color: rgb(255, 255, 255); display: block; float: left; margin: 10px auto auto 80px;' value='取消' onclick=\"document.getElementById('ssdjsInput').style.display='none';\">";
                c = c + "<input type='button' style='width: 100px; height: 40px; background-color: rgb(255, 255, 255); display: block; float: right; margin: 10px 80px auto auto;' value='确定' onclick=\"document.getElementById('ssdjsInput').style.display='none';ssdjs.TextBox.bindData(document.getElementById('ssdinputtext').value);\">";
                c = c + "</div>";
                d.innerHTML = c
            } else {
                d.innerHTML = this.popup
            }
            b.globe.inputData.div.style.left = b.globe.startPoint.x + "px";
            b.globe.inputData.div.style.top = b.globe.startPoint.y + "px";
            b.globe.inputData.div.style.width = b.width + "px";
            b.globe.inputData.div.style.height = b.height + "px";
            document.body.appendChild(d)
        } else {
            b.globe.inputData.div.style.display = ""
        }
        document.getElementById("ssdinputtext").value = this.text;
        document.getElementById("ssdinputtext").focus();
        return this
    };
    return b
})(ssdjs || {});
var ssdjs = (function(a) {
    a.Label = function b(d, j, g, c, f, e, h) {
        a.Object.call(this, "Label", d, j, g, c);
        this.font = f;
        this.fillStyle = e;
        this.text = h + "";
        this.multiline = false;
        this.image = null;
        this.align = "left";
        this.textBaseline = "top";
        this.lineheight = 20
    };
    a.Label.prototype = new a.Object();
    a.Label.prototype.predraw = function() {
        var d = document.createElement("canvas");
        d.width = this.width;
        d.height = this.height;
        var c = d.getContext("2d");
        if(this.alpha != null) {
            c.globalAlpha = this.alpha
        }
        if(this.font != null) {
            c.font = this.font
        }
        if(this.textBaseline != null) {
            c.textBaseline = this.textBaseline
        }
        if(this.fillStyle != null) {
            c.fillStyle = this.fillStyle
        }
        if(this.border != null) {
            if(this.border.color != null) {
                c.strokeStyle = this.border.color
            }
            if(this.border.size != null) {
                c.lineWidth = this.border.size
            }
        }
        var f = 0;
        var m = 0;
        for(var h = 1; h <= this.text.length; h++) {
            var e = this.text.substring(h - 1, h);
            var l = this.text.substring(f, h);
            var k = c.measureText(l);
            if(k.width >= this.width || h >= this.text.length || e == "\n") {
                if(k.width > this.width) {
                    h--;
                    l = this.text.substring(f, h);
                    k = c.measureText(l)
                }
                var j = 0;
                var g = m * this.lineheight;
                if(this.align == "center") {
                    j = (this.width - k.width) / 2
                }
                if(this.align == "right") {
                    j = this.width - k.width
                }
                if(this.border != null) {
                    c.strokeText(l, j, g)
                }
                c.fillText(l, j, g);
                if(!this.multiline) {
                    break
                }
                f = h;
                m = m + 1;
                if((m * this.lineheight) > this.height) {
                    break
                }
            }
        }
        this.image = d
    };
    a.Label.prototype.draw = function(c) {
        if(!this.visiable) {
            return this
        }
        if(!this.multiline) {
            a.draw.text(this);
            return this
        }
        if(this.image == null) {
            this.predraw()
        }
        if(this.image == null) {
            return this
        }
        a.draw.image(this);
        return this
    };
    a.Label.prototype.setText = function(c) {
        this.text = c;
        if(!a.util.isString(this.text)) {
            this.text = this.text + ""
        }
        this.predraw()
    };
    a.Label.prototype.toString = function() {
        return "[Label " + this.text + "]"
    };
    return a
})(ssdjs || {});
var ssdjs = (function(a) {
    a.Line = function b(d, f, c, e) {
        a.Object.call(this, "Line", d < c ? d : c, f < e ? f : e, Math.abs(c - d), Math.abs(e - f));
        this.tox = c;
        this.toy = e
    };
    a.Line.prototype = new a.Object();
    a.Line.prototype.draw = function(c) {
        if(!this.visiable) {
            return this
        }
        if(!c) {
            this.context.save()
        }
        if(this.dash == null) {
            a.draw.line(this)
        } else {
            a.draw.dash(this)
        }
        if(!c) {
            this.context.restore()
        }
        return this
    };
    a.Line.prototype.setPen = function(d, c) {
        this.pen = {
            size : d,
            color : c
        }
    };
    a.Line.prototype.setDash = function(c) {
        this.dash = c
    };
    return a
})(ssdjs || {});
var ssdjs = (function(b) {
    b.Pannel = function a(d, f, e, c) {
        b.Object.call(this, "Pannel", d, f, e, c);
        this.container = new Array()
    };
    b.Pannel.prototype = new b.Object();
    b.Pannel.prototype.draw = function(d, g) {
        if(!this.visiable) {
            return this
        }
        if(!d) {
            this.context.save()
        }
        if(g == null) {
            g = false
        }
        if(this.mask != null) {
            g = true;
            this.mask.draw(true);
            this.context.clip();
            if(this.mask.iny != null && this.mask.iny) {
                if(this.mask.y < this.y) {
                    this.mask.speedy = 0;
                    var f = parseInt((this.y - this.mask.y) / 3);
                    this.move(0, -f)
                }
                var c = this.maxy;
                if(c < this.mask.height) {
                    c = this.mask.height
                }
                if(this.mask.y + this.mask.height > this.y + c) {
                    this.mask.speedy = 0;
                    var f = parseInt((this.mask.y + this.mask.height - this.y - c) / 3);
                    this.move(0, f)
                }
            }
            if(this.mask.inx != null && this.mask.inx) {
                if(this.mask.x < this.x) {
                    this.mask.speedx = 0;
                    var f = parseInt((this.x - this.mask.x) / 3);
                    this.move(-f, 0)
                }
                var c = this.maxx;
                if(c < this.mask.width) {
                    c = this.mask.width
                }
                if(this.mask.x + this.mask.width > this.x + c) {
                    this.mask.speedx = 0;
                    var f = parseInt((this.mask.x + this.mask.width - this.x - c) / 3);
                    this.move(f, 0)
                }
            }
            if(this.mask.speedy != null && (this.mask.speedy > 2 || this.mask.speedy < -2)) {
                this.mask.speedy = parseInt(this.mask.speedy / 2);
                this.move(0, this.mask.speedy)
            }
            if(this.mask.speedx != null && this.mask.speedx > 2) {
                this.mask.speedx = parseInt(this.mask.speedx / 2);
                this.move(this.mask.speedx, 0)
            }
        }
        for(var e = 0; e < this.container.length; e++) {
            if(this.container[e].visiable) {
                this.container[e].draw(false, g)
            }
        }
        if(!d) {
            this.context.restore()
        }
        return this
    };
    b.Pannel.prototype.clear = function() {
        this.container.clear()
    };
    b.Pannel.prototype.push = function(e) {
        e.parent = this;
        e.context = this.context;
        var c = e.x + e.width;
        var d = e.y + e.height;
        e.moveTo(this.x + e.x, this.y + e.y);
        if(this.maxx == null) {
            this.maxx = c
        } else {
            if(this.maxx < c) {
                this.maxx = c
            }
        }
        if(this.maxy == null) {
            this.maxy = d
        } else {
            if(this.maxy < d) {
                this.maxy = d
            }
        }
        this.container.push(e);
        return this
    };
    b.Pannel.prototype.mouseDown = function(d) {
        var c = b.util.getevtPoint(d);
        this._evtPoint = c;
        for(var f = 0; f < this.container.length; f++) {
            var e = this.container[f];
            if(!b.util.isOnSprite(e, c) && e.autohide != null) {
                e.autohide(e)
            }
        }
        this._evtItem = null;
        for(var f = this.container.length - 1; f >= 0; f--) {
            var e = this.container[f];
            if(b.util.isOnSprite(e, c)) {
                this._evtItem = e;
                if(e.mouseDown != null) {
                    e.mouseDown(d)
                }
                return
            }
        }
    };
    b.Pannel.prototype.mouseMove = function(e) {
        if(this._evtPoint == null) {
            return
        }
        if(this._evtItem == null) {
            return
        }
        if(this._evtItem.mouseMove != null) {
            this._evtItem.mouseMove(e)
        }
        var d = b.util.getevtPoint(e);
        if(this._lastPoint == null) {
            this._lastPoint = d;
            return
        }
        var c = {
            x : d.x - this._lastPoint.x,
            y : d.y - this._lastPoint.y,
            ax : d.x - this._evtPoint.x,
            ay : d.y - this._evtPoint.y
        };
        this._lastPoint = d;
        if(this._evtItem.onmove != null) {
            this._evtItem.onmove(this._evtItem, {
                from : this._evtPoint,
                to : d,
                offset : c
            })
        }
    };
    b.Pannel.prototype.mouseUp = function(d) {
        if(this._evtItem == null) {
            this._evtPoint = null;
            this._evtItem = null;
            this._lastPoint = null;
            return
        }
        if(this._evtItem.mouseUp != null) {
            this._evtItem.mouseUp(d)
        }
        if(this._lastPoint != null && this._evtPoint != null && this._evtItem.onclick != null) {
            var c = this._evtPoint.x - this._evtPoint.x;
            var e = this._evtPoint.y - this._evtPoint.y;
            if(c > 5 || c < -5 || e > 5 || e < -5) {
                this._evtItem.onclick(this._evtItem, d)
            }
        }
        this._evtPoint = null;
        this._evtItem = null;
        this._lastPoint = null
    };
    b.Pannel.prototype.collidePoint = function(c, h) {
        var g = this.x;
        var f = this.y;
        var d = this.x + this.width;
        var e = this.y + this.height;
        if(this.touchRect != null) {
            if(this.touchRect.l != null) {
                g = g - this.touchRect.l
            }
            if(this.touchRect.r != null) {
                d = d + this.touchRect.r
            }
            if(this.touchRect.t != null) {
                f = f - this.touchRect.t
            }
            if(this.touchRect.b != null) {
                e = e + this.touchRect.b
            }
        }
        return (c >= g && c <= d && h >= f && h <= e)
    };
    b.Pannel.prototype.collideRect = function(d) {
        var g = this.x;
        var f = this.y;
        var c = this.x + this.width;
        var e = this.y + this.height;
        if(this.touchRect != null) {
            if(this.touchRect.l != null) {
                g = g - this.touchRect.l
            }
            if(this.touchRect.r != null) {
                c = c + this.touchRect.r
            }
            if(this.touchRect.t != null) {
                f = f - this.touchRect.t
            }
            if(this.touchRect.b != null) {
                e = e + this.touchRect.b
            }
        }
        return ((g >= d.x && g <= d.x + d.width) || (d.x >= g && d.x <= c)) && ((f >= d.y && f <= d.y + d.height) || (d.y >= f && d.y <= e))
    };
    b.Pannel.prototype.toString = function() {
        return "[Pannel " + this.x + ", " + this.y + ", " + this.width + ", " + this.height + "]"
    };
    return b
})(ssdjs || {});
if( typeof module !== "undefined" && ("exports" in module)) {
    module.exports = ssdjs.Pannel
}
var ssdjs = (function(b) {
    b.Rect = function a(d, f, e, c) {
        b.Object.call(this, "Rect", d, f, e, c)
    };
    b.Rect.prototype = new b.Object();
    b.Rect.prototype.setBgcolor = function(c) {
        this.bgcolor = c
    };
    b.Rect.prototype.setBorder = function(d, c) {
        this.border = {
            size : d,
            color : c
        }
    };
    b.Rect.prototype.setCorner = function(c) {
        this.corner = c
    };
    b.Rect.prototype.draw = function(c) {
        if(!this.visiable) {
            return this
        }
        if(!c) {
            this.context.save()
        }
        b.draw.rect(this);
        if(!c) {
            this.context.restore()
        }
        return this
    };
    b.Rect.prototype.move = function(c, d) {
        this.x += c;
        this.y += d;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
        return this
    };
    b.Rect.prototype.resize = function(d, c) {
        this.width = this.width + d;
        this.height = this.height + c;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;
        return this
    };
    return b
})(ssdjs || {});
var ssdjs = (function(b) {
    b.Scene = function a(c) {
        this.domx = 0;
        this.domy = 0;
        this.offsetx = 0;
        this.offsety = 0;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.visiable = true;
        this.setuped = false;
        for(i in c) {
            this[i] = c[i]
        }
        this.refresh();
        this._bind(b.events.RESIZE, window);
        this._bind(b.events.START);
        if(this.view == null) {
            this.view = new b.View(0, 0, this.width, this.height)
        }
    };
    b.Scene.prototype.clearRect = function() {
        this.context.clearRect(0, 0, this.width, this.height)
    };
    b.Scene.prototype.handleEvent = function(d) {
        var c = this;
        switch(d.type) {
            case b.events.START:
                c._start(d);
                break;
            case b.events.MOVE:
                c._move(d);
                break;
            case b.events.END:
                c._end(d);
                break;
            case b.events.CANCEL:
                c._end(d);
                break;
            case b.events.RESIZE:
                c._resize();
                break
        }
    };
    b.Scene.prototype._bind = function(e, d, c) {
        (d || this.canvas).addEventListener(e, this, !!c)
    };
    b.Scene.prototype._unbind = function(e, d, c) {
        (d || this.canvas).removeEventListener(e, this, !!c)
    };
    b.Scene.prototype._start = function(h) {
        var f = this;
        f.distX = 0;
        f.distY = 0;
        var c = b.browser.isTouch() ? h.touches[0] : h;
        f.moved = false;
        f.pointX = c.pageX;
        f.pointY = c.pageY;
        f.startTime = h.timeStamp || Date.now();
        f._bind(b.events.MOVE, window);
        f._bind(b.events.END, window);
        f._bind(b.events.CANCEL, window);
        var g = {
            x : f.pointX - f.offsetx - f.domx,
            y : f.pointY - f.offsety - f.domy
        };
        var d = true;
        if(f.onstart != null) {
            d = f.onstart.call(f, h, g)
        }
        if(f.view != null && f.view.onstart != null) {
            f.view.onstart(h, g);
            f.clearRect();
            f.view.draw()
        }
    };
    b.Scene.prototype._move = function(k) {
        var g = this;
        var d = b.browser.isTouch() ? k.touches[0] : k;
        var h = k.timeStamp || Date.now();
        var f = d.pageX - g.pointX;
        var c = d.pageY - g.pointY;
        g.distX += f;
        g.distY += c;
        g.absDistX = Math.abs(g.distX);
        g.absDistY = Math.abs(g.distY);
        if(g.absDistX < 6 && g.absDistY < 6) {
            return
        }
        g.pointX = d.pageX;
        g.pointY = d.pageY;
        g.offsetx = g.offsetx + f;
        g.offsety = g.offsety + c;
        g.offsetx = (0.5 + g.offsetx) | 0;
        g.offsety = (0.5 + g.offsety) | 0;
        g.offsetx = g.offsetx + g.view.width < g.width ? g.width - g.view.width : g.offsetx;
        g.offsety = g.offsety + g.view.height < g.height ? g.height - g.view.height : g.offsety;
        g.offsetx = g.offsetx > 0 ? 0 : g.offsetx;
        g.offsety = g.offsety > 0 ? 0 : g.offsety;
        g.context.offsetx = g.offsetx;
        g.context.offsety = g.offsety;
        if(g.onmove != null) {
            var j = {
                x : g.pointX - g.offsetx - g.domx,
                y : g.pointY - g.offsety - g.domy
            };
            g.onmove(k, j, {
                x : f,
                y : c
            })
        }
        g.moved = true;
        if(h - g.startTime > 300) {
            g.startTime = h;
            g.startX = g.x;
            g.startY = g.y
        }
    };
    b.Scene.prototype._end = function(f) {
        var c = this;
        c._unbind(b.events.MOVE, window);
        c._unbind(b.events.END, window);
        c._unbind(b.events.CANCEL, window);
        var d = {
            x : c.pointX - c.offsetx - c.domx,
            y : c.pointY - c.offsety - c.domy
        };
        if(!c.moved) {
            if(c.onend != null) {
                c.onend.call(c, f, d)
            }
            if(c.view != null) {
                c.view.onend(f, d);
                c.clearRect();
                c.view.draw()
            }
            return
        } else {
            if(c.view != null) {
                c.view.oncancel(f, d);
                c.clearRect();
                c.view.draw()
            }
        }
    };
    b.Scene.prototype._resize = function() {
        var c = this;
        if(c.onresize != null) {
            setTimeout(function() {
                c.onresize()
            }, b.browser.isAndroid() ? 200 : 0)
        }
    };
    b.Scene.prototype.refresh = function() {
        this.canvas = document.getElementById(this.canvasid);
        this.domx = this.canvas.offsetLeft;
        this.domy = this.canvas.offsetTop;
        this.context = b.getCanvas(this.canvasid);
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context.width = this.width;
        this.context.height = this.height
    };
    b.Scene.prototype.toString = function() {
        return "[Scene " + this.x + ", " + this.y + ", " + this.width + ", " + this.height + "]"
    };
    return b
})(ssdjs || {});
var ssdjs = (function(b) {
    b.Shape = function a(d, g, e, c, f) {
        b.Object.call(this, "Shape", d, g, e, c);
        this.path = f
    };
    b.Shape.prototype = new b.Object();
    b.Shape.prototype.setBgcolor = function(c) {
        this.bgcolor = c
    };
    b.Shape.prototype.setBorder = function(d, c) {
        this.border = {
            size : d,
            color : c
        }
    };
    b.Shape.prototype.move = function(c, e) {
        if(this.path != null && this.path.length > 0) {
            for(var d = 0; d < this.path.length; d++) {
                if(this.path[d].x != null) {
                    this.path[d].x = this.path[d].x + c
                }
                if(this.path[d].y != null) {
                    this.path[d].y = this.path[d].y + e
                }
                if(this.path[d].tox != null) {
                    this.path[d].tox = this.path[d].tox + c
                }
                if(this.path[d].toy != null) {
                    this.path[d].toy = this.path[d].toy + e
                }
            }
        }
        this.x += c;
        this.y += e;
        return this
    };
    b.Shape.prototype.draw = function(c) {
        if(!this.visiable) {
            return this
        }
        if(!c) {
            this.context.save()
        }
        b.draw.shape(this);
        if(!c) {
            this.context.restore()
        }
        return this
    };
    return b
})(ssdjs || {});
var ssdjs = (function(b) {
    b.Sprite = function a(d, f, e, c) {
        b.Object.call(this, "Sprite", d, f, e, c);
        this.currIndex = 0;
        this.autodraw = true
    };
    b.Sprite.prototype = new b.Object();
    b.Sprite.prototype.setImage = function(c) {
        if(b.util.isDrawable(c)) {
            this.image = c;
            return this
        }
        this.oldimage = this.image;
        this.image = null;
        this.src = c;
        return this
    };
    b.Sprite.prototype.setWidth = function(c) {
        this.scale_x = c / this.image.width
    };
    b.Sprite.prototype.setHeight = function(c) {
        this.scale_y = c / this.image.height
    };
    b.Sprite.prototype.animate = function(c) {
        this.aniseq.push(c)
    };
    b.Sprite.prototype.draw = function(d) {
        if(!this.visiable) {
            return this
        }
        if(this.alpha <= 0) {
            return this
        }
        if(this.aniseq != null && this.aniseq.length > 0) {
            var c = this.aniseq[0];
            if(c.move != null) {
                if(c.move.x == null) {
                    c.move.x = (c.move.tox - this.x) / c.move.step;
                    c.move.y = (c.move.toy - this.y) / c.move.step
                }
                if(c.move.step > 0) {
                    this.x += c.move.x;
                    this.y += c.move.y
                } else {
                    c.move.step--
                }
            }
            if(c.scale != null) {
                if(c.scale.x == null) {
                    c.scale.x = (c.scale.tox - this.scale_x) / c.scale.step;
                    c.scale.y = (c.scale.toy - this.scale_y) / c.scale.step
                }
                if(c.scale.step > 0) {
                    this.scale_x += c.scale.x;
                    this.scale_y += c.scale.y
                } else {
                    c.scale.step--
                }
            }
            if(c.rotate != null) {
                if(c.rotate.a == null) {
                    c.rotate.a = (c.rotate.toa - this.angle) / c.rotate.step
                }
                if(c.rotate.step > 0) {
                    this.angle += c.rotate.a
                } else {
                    c.rotate.step--
                }
            }
            if(c.alpha != null) {
                if(c.alpha.a == null) {
                    c.alpha.a = (c.alpha.toa - this.alpha) / c.alpha.step
                }
                if(c.alpha.step > 0) {
                    this.alpha += c.alpha.a
                } else {
                    c.alpha.step--
                }
            }
            if(c.seqimg != null) {
                c.seqimg.a = c.seqimg.a || 0;
                if(c.seqimg.step > 0) {
                    this.setImage(c.seqimg.array[c.seqimg.a]);
                    c.seqimg.a++;
                    if(c.seqimg.a >= c.seqimg.array.length) {
                        c.seqimg.a = 0
                    }
                } else {
                    c.seqimg.step--
                }
            }
            if(c.step <= 0) {
                this.aniseq.shift();
                if(this.aniseq.length <= 0 && this.onAniDone != null) {
                    this.onAniDone()
                }
            } else {
                c.step--
            }
        }
        if(this.images != null) {
            if(this.currIndex >= this.images.length) {
                this.currIndex = 0
            }
            this.image = this.images[this.currIndex];
            this.currIndex = this.currIndex + 1
        }
        b.draw.image(this);
        return this
    };
    return b
})(ssdjs || {});
var ssdjs = (function(a) {
    a.View = function b(d, f, e, c) {
        a.Object.call(this, "View", d, f, e, c);
        this.container = new Array()
    };
    a.View.prototype = new a.Object();
    a.View.prototype.setAlpha = function(d) {
        for(var c = this.container.length - 1; c >= 0; c--) {
            this.container[c].setAlpha(d)
        }
    };
    a.View.prototype.setContext = function(d) {
        this.context = d;
        for(var c = this.container.length - 1; c >= 0; c--) {
            this.container[c].setContext(d)
        }
    };
    a.View.prototype.offset = function(c, e) {
        this.offsetx = this.offsetx + c;
        this.offsety = this.offsety + e;
        for(var d = this.container.length - 1; d >= 0; d--) {
            this.container[d].offset(c, e)
        }
    };
    a.View.prototype.animate = function(c) {
        this.aniseq.push(c)
    };
    a.View.prototype.draw = function() {
        if(!this.visiable) {
            return this
        }
        if(this.alpha <= 0) {
            return this
        }
        if(this.image != null) {
            if(this.aniseq != null && this.aniseq.length > 0) {
                var e = this.aniseq[0];
                if(e.move != null) {
                    if(e.move.x == null) {
                        e.move.x = (e.move.tox - this.x) / e.move.step;
                        e.move.y = (e.move.toy - this.y) / e.move.step
                    }
                    if(e.move.step > 0) {
                        this.x += e.move.x;
                        this.y += e.move.y
                    } else {
                        e.move.step--
                    }
                }
                if(e.scale != null) {
                    if(e.scale.x == null) {
                        e.scale.x = (e.scale.tox - this.scale_x) / e.scale.step;
                        e.scale.y = (e.scale.toy - this.scale_y) / e.scale.step
                    }
                    if(e.scale.step > 0) {
                        this.scale_x += e.scale.x;
                        this.scale_y += e.scale.y
                    } else {
                        e.scale.step--
                    }
                }
                if(e.rotate != null) {
                    if(e.rotate.a == null) {
                        e.rotate.a = (e.rotate.toa - this.angle) / e.rotate.step
                    }
                    if(e.rotate.step > 0) {
                        this.angle += e.rotate.a
                    } else {
                        e.rotate.step--
                    }
                }
                if(e.alpha != null) {
                    if(e.alpha.a == null) {
                        e.alpha.a = (e.alpha.toa - this.alpha) / e.alpha.step
                    }
                    if(e.alpha.step > 0) {
                        this.alpha += e.alpha.a
                    } else {
                        e.alpha.step--
                    }
                }
                if(e.step <= 0) {
                    this.aniseq.shift();
                    if(this.aniseq.length <= 0 && this.onAniDone != null) {
                        this.onAniDone()
                    }
                } else {
                    e.step--
                }
            }
            a.draw.image(this);
            return this
        }
        var d = this.container.length;
        for(var j = 0; j < d; j++) {
            var c = this.container[j];
            if(c == null) {
                continue
            }
            if(c.visiable) {
                var g = c.x;
                var f = c.y;
                var h = c.width;
                var k = c.height;
                if(g > this.width) {
                    continue
                }
                if(g + h < 0) {
                    continue
                }
                if(f > this.height) {
                    continue
                }
                if(f + k < 0) {
                    continue
                }
                c.draw(false)
            }
        }
        return this
    };
    a.View.prototype.clear = function() {
        this.container.clear()
    };
    a.View.prototype.move = function(c, e) {
        this.x += c;
        this.y += e;
        for(var d = 0; d < this.container.length; d++) {
            this.container[d].offset(c, e)
        }
        return this
    };
    a.View.prototype.push = function(c) {
        c.setContext(this.context);
        c.offset(this.x, this.y);
        this.container.push(c);
        return this
    };
    a.View.prototype.onstart = function(d, c) {
        this._evtPoint = c;
        this._evtItem = null;
        var g = null;
        for(var f = this.container.length - 1; f >= 0; f--) {
            var e = this.container[f];
            if(e.onstart != null && e.collidePoint(c.x, c.y)) {
                g = e.onstart(d, c);
                if(g != null) {
                    this._evtItem = e;
                    break
                }
            }
        }
        if(g != null) {
            g.setAlpha(0.3)
        }
        return this._evtItem
    };
    a.View.prototype.onmove = function(d, c, e) {
    };
    a.View.prototype.onend = function(d, c) {
        if(this._evtItem == null) {
            this._evtPoint = null;
            return
        }
        this._evtItem.setAlpha(1);
        if(this._evtItem.onend != null) {
            this._evtItem.onend(d, c)
        }
        this._evtPoint = null;
        this._evtItem = null
    };
    a.View.prototype.oncancel = function(d, c) {
        if(this._evtItem != null) {
            this._evtItem.setAlpha(1);
            if(this._evtItem.oncancel != null) {
                this._evtItem.oncancel(d, c)
            }
        }
        this._evtPoint = null;
        this._evtItem = null
    };
    a.View.prototype.getById = function(e) {
        for(var d = this.container.length - 1; d >= 0; d--) {
            var c = this.container[d];
            if(c.id == e) {
                return c
            }
        }
        return null
    };
    a.View.prototype.deleteById = function(f) {
        var c = -1;
        for(var e = this.container.length - 1; e >= 0; e--) {
            var d = this.container[e];
            if(d.id == f) {
                c = e;
                break
            }
        }
        if(c >= 0) {
            return this.container.splice(c, 1)
        }
        return null
    };
    a.View.prototype.clearCache = function() {
        for(var c = 0; c < this.container.length; c++) {
            var d = this.container[c];
            d.context = this.context
        }
        this.image = null
    };
    a.View.prototype.cache = function() {
        var c = document.createElement("canvas");
        c.width = this.width;
        c.height = this.height;
        var f = c.getContext("2d");
        for(var h = 0; h < this.container.length; h++) {
            var k = this.container[h];
            if(k.visiable) {
                k.setContext(f);
                k.context.offsetx = -this.x;
                k.context.offsety = -this.y;
                var e = k.x;
                var d = k.y;
                var g = k.width;
                var j = k.height;
                if(e > this.width) {
                    continue
                }
                if(e + g < 0) {
                    continue
                }
                if(d > this.height) {
                    continue
                }
                if(d + j < 0) {
                    continue
                }
                k.draw(false)
            }
        }
        this.image = c
    };
    a.View.prototype.getSprite = function() {
        var d = document.createElement("canvas");
        d.width = this.width;
        d.height = this.height;
        var c = d.getContext("2d");
        for(var f = 0; f < this.container.length; f++) {
            var h = this.container[f];
            if(h.visiable) {
                h.context = c;
                h.context.offsetx = -this.x;
                h.context.offsety = -this.y;
                var j = h.x;
                var g = h.y;
                var k = h.width;
                var e = h.height;
                if(j > this.width) {
                    continue
                }
                if(j + k < 0) {
                    continue
                }
                if(g > this.height) {
                    continue
                }
                if(g + e < 0) {
                    continue
                }
                h.draw(false)
            }
        }
        var l = new a.Sprite(this.x, this.y, this.width, this.height);
        l.context = this.context;
        l.setImage(d);
        return l
    };
    return a
})(ssdjs || {});
