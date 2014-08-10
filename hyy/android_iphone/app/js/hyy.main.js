/**
 * 入口文件
 */
function init() {
    console.log("init");
    viewport();
    redraw();
    hyy.cfg.winW = window['innerWidth'] || document.documentElement.clientWidth;
    hyy.cfg.winH = window['innerHeight'] || document.documentElement.clientHeight
}

/**
 * 屏幕尺寸
 */
function hyySize() {
    return {
        x: window['innerWidth'] || document.documentElement.clientWidth,
        y: window['innerHeight'] || document.documentElement.clientHeight
    };
}

function hyyscreen() {
    return {
        sw: window.screen.width,
        sh: window.screen.height,
        x: window['innerWidth'] || document.documentElement.clientWidth,
        y: window['innerHeight'] || document.documentElement.clientHeight
    };
}

function vpWidth() {
    var w = 640;
    if ((/ipad/gi).test(navigator.appVersion)) {
        // w = 1024;
    }
    if (!ssdjs.browser.isTouch()) {
        w = 1024;
    }

    var size = ssdjs.browser.size();
    w = size.x;
    if (size.x < 640) {
        w = 640;
    }
    if (size.x > 1136) {
        // w = 1136
    }
    return w;
}

function viewport(revp) {
    var screen = hyyscreen();
    var isresize = revp || false;

    var size = screen;
    var _w = 640;
    var _nw = 640;
    if ((/ipad/gi).test(navigator.appVersion)) {
        _w = 768;
        _nw = 768;
    }
    if (size.x > size.y) {
        var tmp = (_nw * size.y / size.x) | 0;
        if (tmp > _nw) {
            _w = tmp;
        }
        if ((/ipad/gi).test(navigator.appVersion)) {
            _w = 1024;
            _nw = 900;
        }
    }
    var scale = size.x < size.y ? (size.x / _nw) : (size.y / _nw);
    var ua = navigator.userAgent;
    if (ua.match(/iPhone/) || ua.match(/iPad/)) {
        scale = size.sw / _nw;
    }
    var vp = "width=" + _w + ",target-densitydpi=high-dpi" + ",initial-scale=" + scale + ",maximum-scale=" + scale + ",minimum-scale=" + scale;
    document.getElementById("viewport").content = vp;

}

function redraw() {

    // 调整窗口
    var size = hyySize();

    // 游戏宽度
    var hyyH = size.y;
    var hyyW = size.x;
    var max = vpWidth();
    if (hyyW >= max) {
        hyyW = max;
    }

    // body
    $("body").css("height", 960 + "px");

    // main
    var main = $("#main");
    main.css("background", "#fff");
    main.css("top", "0px");
    main.css("left", "0px");
    main.css("height", 960 + "px");
    main.css("width", 640 + "px");

    var logIn = $("#logIn");
    logIn.css("top", "0px");
    logIn.css("left", "0px");
    logIn.css("height", 960 + "px");
    logIn.css("width", 640 + "px");

    var answer = $("#answer");
    answer.css("top", "0px");
    answer.css("left", "0px");
    answer.css("height", 960 + "px");
    answer.css("width", 640 + "px");

    var pop = $("#pop");
    pop.css("top", "0px");
    pop.css("left", "0px");
    pop.css("height", 960 + "px");
    pop.css("width", 640 + "px");

}
