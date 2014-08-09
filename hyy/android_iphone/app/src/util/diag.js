/**
 * 对话框
 */
var hyy = (hyy || {});
hyy.diag = {
    pop : {
        show : function(p) {
            $("#pop").css("display", "");

        },
        hide : function(p) {
            $("#pop").hide();
            $("#pop").empty();
        },
        clear : function(p) {
            $("#pop").empty();
        },
        add : function(p) {
            $("#pop").append(p);
        }
    },
    alert: function (p) {

        var infMain = hyy.sys.hyy$("info");

        var size = hyy.sys.winSize();

        var divMask = ssdjs.dom.div(0, 0, size.x, size.y);
        divMask.id = "hyyMask";
        divMask.style.backgroundColor = "black";
        divMask.css("opacity", 0.53);
        infMain.appendChild(divMask);

        var w = 554;
        var bw = 462;

        if (w >= size.x) {
            w = size.x - 20;
            bw = size.x - 60
        }
        var h = 280;

        var divW = ssdjs.dom.div((size.x - w) / 2, (size.y - h) / 2, w, h);
        divW.id = "hyyAlert";

        var bg = ssdjs.dom.img(0, 0, "100%", "100%", hyy.url.img("login/alertBg.png"));
        //divW.style.backgroundImage = hyy.url.cssimg("login/alertBg.png");
        divW.appendChild(bg);
        var titleText = p.t || "安全提示";

        var title = ssdjs.dom.text(0, 30, w, null, titleText);
        title.style.textAlign = "center";
        title.style.color = "#2c2c2c";
        title.style.fontSize = "30px";
        divW.appendChild(title);

        var message = ssdjs.dom.text(54, 90, w - 108, null, p.m);
        message.style.textAlign = "left";
        message.style.color = "#2c2c2c";
        message.style.fontSize = "24px";
        divW.appendChild(message);

        var btnOk = ssdjs.dom.div((w - bw) / 2, 177, bw, 59);

        var bg0 = ssdjs.dom.img(0, 0, "100%", "100%", hyy.url.img("login/alertOk0.png"));
        var bg1 = ssdjs.dom.img(0, 0, "100%", "100%", hyy.url.img("login/alertOk1.png"));
        bg1.style.display = "none";
        btnOk.appendChild(bg0);
        btnOk.appendChild(bg1);
        //  btnOk.style.backgroundImage = hyy.url.cssimg("login/alertOk0.png");
        btnOk.evtEnd(function (obj) {
            bg1.style.display = "none";
            //  obj.style.backgroundImage = hyy.url.cssimg("login/alertOk0.png");
            $("#info").empty();
        });
        btnOk.evtMove(function (obj) {
            bg1.style.display = "none";
            //  obj.style.backgroundImage = hyy.url.cssimg("login/alertOk0.png");
        });
        btnOk.evtStart(function (obj) {
            bg1.style.display = "";
            //  obj.style.backgroundImage = hyy.url.cssimg("login/alertOk1.png");
        });
        var text = ssdjs.dom.text(0, 12, bw, null, "确定");
        text.style.color = "#2c2c2c";
        text.style.fontSize = "30px";
        text.style.textAlign = "center";
        btnOk.appendChild(text);
        divW.appendChild(btnOk);
        infMain.appendChild(divW);

    },
    loginLoading: {
        hide: function (param) {
            setTimeout(function () {
                $("#iLoading").hide();

                ssdjs.dom.CLICK = true;
            }, 200);
            if (param != null) {
                clearInterval($("#iLoading").setInterval);
                clearTimeout(param);
            } else {
                clearInterval($("#iLoading").setInterval);
                clearTimeout(hyy.data.user.loadStat);
            }
        },
        show: function (param) {
            console.log("loginLoading.show" + JSON.stringify(param));
            ssdjs.dom.CLICK = false;

            $("#loadingBg").empty();

            var size = hyy.sys.winSize();
            var x = size.x;
            var y = size.y;
            var w = 245;
            var h = 177;
            var divW = ssdjs.dom.div(0, 0, size.x, size.y);
            divW.id = "loginLoad";

            var divMask = ssdjs.dom.div(0, 0, size.x, size.y);
            divMask.style.backgroundColor = "black";
            divMask.css("opacity", 0.53);
            divW.appendChild(divMask);

            var divLoading = ssdjs.dom.div((x - w) / 2, (y - h) / 2, w, h);
            divLoading.style.backgroundImage = hyy.url.cssimg("login/loadingBg.png");
            divW.appendChild(divLoading);

            var cvs = ssdjs.dom.canvas(0, -15, w, h);
            $("#loadingBg").append(cvs);
            var loadingObj = new loginLoading(cvs, {
                radius: 13,
                circleLineWidth: 5
            });
            divLoading.appendChild(cvs);
            loadingObj.show();

            $("#iLoading").setInterval = loadingObj;

            var text = ssdjs.dom.text(0, 115, w, null, "等待登录，请稍后。。。");
            text.style.color = "#ffffff";
            text.style.fontSize = "20px";
            text.style.textAlign = "center";
            divLoading.appendChild(text);
            $("#loadingBg").append(divW);

            $("#iLoading").show();

            var t = setTimeout(function () {
                if (!$("#iLoading").is(":hidden")) {
                    loadingObj.hide();
                    hyy.diag.alert({
                        m: "你的网络不太给力哦"
                    });
                    hyy.diag.loading.hide();
                }
            }, 20000);

            hyy.data.user.loadStat = t;
            return t;
        }
    },
}