/**
 * 对话框
 */
var hl = (hl || {});
hl.diag = {
    menu : {
        tick : 0,
        reKey : -1,

        show : function(p) {

            hl.diag.pop.hide();
            hl.diag.up.hide();
            var bottomMenu = $("#iMenu");
            var size = hl.sys.winSize();

            bottomMenu.empty();
            var bottomMenuBg = ssdjs.dom.img(0, 0, "100%", 98, hl.url.img("pub/mainMenu_bg.jpg"));
            bottomMenu.append(bottomMenuBg);
            var _x = 0;

            var i0 = 0;
            var i1 = 0;
            var i2 = 0;
            var i3 = 0;

            switch(p.on) {
                case 0 :
                    i0 = 1;
                    break;
                case 1 :
                    i1 = 1;
                    break;
                case 2 :
                    i2 = 1;
                    break;
                case 3 :
                    i3 = 1;
                    break;
            }
            var _ww = size.x / 4;

            var btn0 = hl.tpl.btnBottom("person", _x, 0, _ww, 75, "menu/person.png", "个人中心", i0, function(obj) {
                // scrollM.scrollToElement(personMain, 500);

                hl.biz.person.show();
                hl.biz.user.hide();
                hl.biz.disk.hide();
                hl.biz.more.hide();
            });
            bottomMenu.append(btn0);
            _x += _ww;
            var btn1 = hl.tpl.btnBottom("user", _x, 0, _ww, 75, "menu/user.png", "用户列表", i1, function(obj) {
                if(hl.data.cfg.isSearch) {
                    hl.biz.user.init();
                }
                //  scrollM.scrollToElement(userMain, 500);
                hl.biz.person.hide();
                hl.biz.user.show();
                hl.biz.disk.hide();
                hl.biz.more.hide();
            });
            bottomMenu.append(btn1);
            _x += _ww;
            var btn2 = hl.tpl.btnBottom("disk", _x, 0, _ww, 75, "menu/disk.png", "我的网盘", i2, function(obj) {
                //  scrollM.scrollToElement(diskMain, 500);
                hl.biz.person.hide();
                hl.biz.user.hide();
                hl.biz.disk.show();
                hl.biz.more.hide();
            });
            bottomMenu.append(btn2);
            _x += _ww;
            var btn3 = hl.tpl.btnBottom("more", _x, 0, _ww, 75, "menu/more.png", "更多", i3, function(obj) {
                //   scrollM.scrollToElement(moreMain, 500);
                hl.biz.person.hide();
                hl.biz.user.hide();
                hl.biz.disk.hide();
                hl.biz.more.show();
            });

            bottomMenu.append(btn3);
            bottomMenu.show();

        },
        hide : function() {
            var bottomMenu = $("#iMenu");
            bottomMenu.hide();
            hl.diag.menu.stopRefresh(hl.diag.menu.reKey);
        },
        refresh : function(p) {
            var time = setInterval(function() {
                // 聊天信息
                var numNoSee = 0;
                var pppList = (hl.data.chat.receive.list || []);
                if(pppList.length > 0) {
                    for(var i = 0; i < pppList.length; i++) {
                        if(pppList[i].list == null) {
                            continue;
                        }
                        numNoSee += pppList[i].list.length;
                    }
                }
                if(numNoSee != 0) {
                    $("#usermarkPNum").html(numNoSee);
                    $("#usermarkPub").show();
                } else {
                    $("#usermarkPub").hide();
                }
            }, 1000);
            hl.diag.menu.reKey = time;
            return time;
        },
        stopRefresh : function(p) {
            clearInterval(p);
        }
    },
    alert : function(p) {

        var infMain = hl.sys.hl$("info");

        var size = hl.sys.winSize();

        var divMask = ssdjs.dom.div(0, 0, size.x, size.y);
        divMask.id = "hlMask";
        divMask.style.backgroundColor = "black";
        divMask.css("opacity", 0.53);
        infMain.appendChild(divMask);

        var w = 554;
        var bw = 462;

        if(w >= size.x) {
            w = size.x - 20;
            bw = size.x - 60
        }
        var h = 280;

        var divW = ssdjs.dom.div((size.x - w) / 2, (size.y - h) / 2, w, h);
        divW.id = "hlAlert";

        var bg = ssdjs.dom.img(0, 0, "100%", "100%", hl.url.img("login/alertBg.png"));
        //divW.style.backgroundImage = hl.url.cssimg("login/alertBg.png");
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

        var bg0 = ssdjs.dom.img(0, 0, "100%", "100%", hl.url.img("login/alertOk0.png"));
        var bg1 = ssdjs.dom.img(0, 0, "100%", "100%", hl.url.img("login/alertOk1.png"));
        bg1.style.display = "none";
        btnOk.appendChild(bg0);
        btnOk.appendChild(bg1);
        //  btnOk.style.backgroundImage = hl.url.cssimg("login/alertOk0.png");
        btnOk.evtEnd(function(obj) {
            bg1.style.display = "none";
            //  obj.style.backgroundImage = hl.url.cssimg("login/alertOk0.png");
            $("#info").empty();
        });
        btnOk.evtMove(function(obj) {
            bg1.style.display = "none";
            //  obj.style.backgroundImage = hl.url.cssimg("login/alertOk0.png");
        });
        btnOk.evtStart(function(obj) {
            bg1.style.display = "";
            //  obj.style.backgroundImage = hl.url.cssimg("login/alertOk1.png");
        });
        var text = ssdjs.dom.text(0, 12, bw, null, "确定");
        text.style.color = "#2c2c2c";
        text.style.fontSize = "30px";
        text.style.textAlign = "center";
        btnOk.appendChild(text);
        divW.appendChild(btnOk);
        infMain.appendChild(divW);

    },
    alert2 : function(p) {

        var infMain = hl.sys.hl$("info");

        var size = hl.sys.winSize();

        var divW = ssdjs.dom.div((size.x - 400) / 2, (size.y - 60) / 2, 400, 60);
        divW.id = "alert2";
        divW.style.backgroundColor = "black";
        divW.css("opacity", 0.6);
        infMain.appendChild(divW);

        var text = ssdjs.dom.text(0, 10, 400, 40, p.m);
        text.style.color = "#fff";
        text.style.fontSize = "20px";
        text.style.textAlign = "center";
        divW.appendChild(text);
        infMain.appendChild(divW);

        setTimeout(function() {
            $("#info").empty();
        }, 1000);
    },
    up2 : function(p) {
        console.log("up");
        console.log(p);
        var size = hl.sys.winSize();

        var w = 570;
        var h = 400;

        var divW = ssdjs.dom.div((size.x - w) / 2, (size.y - h) / 2, w, h);
        divW.id = "upMain";
        divW.style.backgroundColor = "#ffe";
        divW.style.borderRadius = "6px";

        var title = ssdjs.dom.text(10, 40, null, null, p.item.TITLE);
        divW.appendChild(title);

        var message = ssdjs.dom.text(20, 80, null, null, p.item.CONTENT);
        divW.appendChild(message);

        var btnW = 60;
        var btnH = 40;
        var btnClose = ssdjs.dom.div(w - 80, h - 60, btnW, btnH);
        var btnCloseText = ssdjs.dom.text(5, 5, null, null, "关闭");
        btnClose.appendChild(btnCloseText);
        btnClose.style.backgroundColor = "#eee";

        btnClose.evtEnd(function(obj) {
            $("#upMain").remove();
            btnClose.style.backgroundColor = "#eee";
        });

        btnClose.evtMove(function(obj) {
            btnClose.style.backgroundColor = "#eee";
        });
        btnClose.evtStart(function(obj) {
            btnClose.style.backgroundColor = "#222";
        });
        divW.appendChild(btnClose);
        var infMain = hl.sys.hl$("up");
        $("#up").empty();

        infMain.appendChild(divW);

        hl.sys.hl$("up").style.display = "";
    },
    main : {
        show : function(p) {
            var p = (p || {});
            var ws = ssdjs.browser.size();
            var _w = ws.x;
            var _h = ws.y;
            var _top = 0;
            var _left = 0;
            $("#main").css("width", _w + "px");
            $("#main").css("height", _h + "px");
            $("#main").css("left", _left + "px");
            $("#main").css("top", _top + "px");
            $("#main").css("background", "#ccc");
            $("#main").css("display", "");
        },
        hide : function(p) {
            $("#main").hide();
            $("#main").empty();
        },
        clear : function(p) {
            $("#main").empty();
        },
        add : function(p) {
            $("#main").append(p);
        }
    },
    pop : {
        show : function(p) {

            var p = (p || {});
            p.location = (p.location || {});
            var _w = 640;
            var _h = 960;
            var ws = ssdjs.browser.size();
            var _h = (p.location.h || 450);
            var _top = ((ws.y - _h) / 2) | 0;
            var _left = ((ws.x - _w) / 2) | 0;
            $("#pop").css("height", _h + "px");
            $("#pop").css("left", _left + "px");
            $("#pop").css("top", _top + "px");
            $("#pop").css("display", "");
            $("#pop").css("scale", "0.5");

            // setTimeout(function() {
            // $("#pop").toggleClass("animate fadeInLeft", true);
            // $("#pop").css("display", "");
            // }, 10);
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
    up : {
        show : function(p) {
            var p = (p || {});

            $("#up").css("display", "");

        },
        hide : function(p) {

            //    $("#up").toggleClass("animate fadeOutRight", true);
            $("#up").hide();
            $("#up").empty();

        },
        close : function(p) {

            setTimeout(function() {
                //  $("#up").toggleClass("animate fadeOutRight", true);
                $("#up").hide();
                $("#up").empty();
            }, 100);
        },
        clear : function(p) {
            //  $("#up").toggleClass("animate fadeOutRight", false);
            //  $("#up").toggleClass("animate fadeInLeft", false);
            $("#up").empty();
        },
        add : function(p) {
            $("#up").append(p);
        }
    },
    loading : {
        hide : function(param) {
            setTimeout(function() {
                $("#iLoading").hide();

                ssdjs.dom.CLICK = true;
            }, 200);
            if(param != null) {
                clearTimeout(param);
            } else {
                clearTimeout(hl.data.user.loadStat);
            }
        },
        show : function(param) {
            var t = setTimeout(function() {
                if(!$("#iLoading").is(":hidden")) {
                    hl.diag.alert({
                        m : "你的网络不太给力哦"
                    });
                    hl.diag.loading.hide();
                }
            }, 20000);

            ssdjs.dom.CLICK = false;

            $("#loadingBg").empty();
            var mask = hl.tpl.diag.loadingMask("loadingMask");
            $("#loadingBg").append(mask);

            var size = hl.sys.winSize();

            var cvs = ssdjs.dom.canvas(0, 200, size.x, 400);
            $("#loadingBg").append(cvs);
            var loadingObj = new loading(cvs, {
                radius : 30,
                circleLineWidth : 13
            });
            loadingObj.show();

            $("#iLoading").show();

            hl.data.user.loadStat = t;
            return t;
        }
    },
    loginLoading : {
        hide : function(param) {
            setTimeout(function() {
                $("#iLoading").hide();

                ssdjs.dom.CLICK = true;
            }, 200);
            if(param != null) {
                clearInterval($("#iLoading").setInterval);
                clearTimeout(param);
            } else {
                clearInterval($("#iLoading").setInterval);
                clearTimeout(hl.data.user.loadStat);
            }
        },
        show : function(param) {
            // 更改tips
            // var ran = parseInt(Math.random() * 15 + 1);
            // var tips = sail.data.cfg.tips[ran];
            // $("#tips").html(tips);

            ssdjs.dom.CLICK = false;

            $("#loadingBg").empty();

            var size = hl.sys.winSize();
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
            divLoading.style.backgroundImage = hl.url.cssimg("login/loadingBg.png");
            divW.appendChild(divLoading);

            var cvs = ssdjs.dom.canvas(0, -15, w, h);
            $("#loadingBg").append(cvs);
            var loadingObj = new loginLoading(cvs, {
                radius : 13,
                circleLineWidth : 5
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

            var t = setTimeout(function() {
                if(!$("#iLoading").is(":hidden")) {
                    loadingObj.hide();
                    hl.diag.alert({
                        m : "你的网络不太给力哦"
                    });
                    hl.diag.loading.hide();
                }
            }, 20000);

            hl.data.user.loadStat = t;
            return t;
        }
    },
    opt : {
        hide : function() {
            hl.CLOSE_OPT = 0;
            $("#optt").css("display", "none");
        },
        show : function(dom) {
            hl.CLOSE_OPT = 1;
            $("#optt").html(dom);
            $("#optt").css("display", "");
            // hl.sys.$("optt").style.display = "" ;
        }
    },
    getAbsoluteLeft : function(object) {
        //获取控件左绝对位置

        o = object
        oLeft = o.offsetLeft
        while(o.offsetParent != null) {
            oParent = o.offsetParent
            oLeft += oParent.offsetLeft
            o = oParent
        }
        return oLeft
    },
    aa : {
        item : {
            "id" : 1,
            "name" : "909",
            list : [{
                "id" : 34,
                "name" : "数学组",
                list : [{
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10027,
                    "ACTUALNAME" : "朱靖湘",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10028,
                    "ACTUALNAME" : "张晓峰",
                    "SEX" : 1
                }]
            }, {
                "id" : 27,
                "name" : "语文组",
                list : [{
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10015,
                    "ACTUALNAME" : "姚巍",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/a96fcb7816ecca7721c727893aef4940.jpg",
                    "USERID" : 10021,
                    "ACTUALNAME" : "秦立",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10025,
                    "ACTUALNAME" : "范碧江",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/3168fcb09793b27bef283363df4dbbbb.jpg",
                    "USERID" : 10026,
                    "ACTUALNAME" : "马萧",
                    "SEX" : 1
                }]
            }, {
                "id" : 28,
                "name" : "英语组",
                list : [{
                    "FACEFILE" : "/Files/Faces/ef32d02f08c1a68222cb15f392a5cde3.jpg",
                    "USERID" : 10011,
                    "ACTUALNAME" : "张英博",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/9abf7147eeb6c372bf1940681d25e019.jpg",
                    "USERID" : 10022,
                    "ACTUALNAME" : "薄建超",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/efb790c214a3dfdec49f13d12209b2d3.jpg",
                    "USERID" : 10023,
                    "ACTUALNAME" : "王晶",
                    "SEX" : 2
                }, {
                    "FACEFILE" : "/Files/Faces/857203373257619fa4798275f6538eaa.jpg",
                    "USERID" : 10034,
                    "ACTUALNAME" : "闫金毅",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/96fc413acb6fbd1fcd1af8e4a9e622b8.gif",
                    "USERID" : 10041,
                    "ACTUALNAME" : "服务器",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/219afd8ae69546cf0297b6e6d3a4a157.jpg",
                    "USERID" : 10042,
                    "ACTUALNAME" : "许建成",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/62b7c5a756588328bcc56243a0689530.jpg",
                    "USERID" : 10043,
                    "ACTUALNAME" : "袁凤超",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/ff0b378f2fef3065d394763e5a5a67a2.jpg",
                    "USERID" : 10051,
                    "ACTUALNAME" : "韩玉青",
                    "SEX" : 2
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10057,
                    "ACTUALNAME" : "陈楠",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10071,
                    "ACTUALNAME" : "吴妍妍",
                    "SEX" : 0
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10072,
                    "ACTUALNAME" : "秦敖",
                    "SEX" : 1
                }]
            }, {
                "id" : 29,
                "name" : "行政部",
                list : [{
                    "FACEFILE" : "/Files/Faces/79c04c966095a5bc720e3b92a84e708c.jpg",
                    "USERID" : 10012,
                    "ACTUALNAME" : "赵辉荣",
                    "SEX" : 2
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10019,
                    "ACTUALNAME" : "王风玲",
                    "SEX" : 2
                }, {
                    "FACEFILE" : "/Files/Faces/43767546acfaec4e146c15af1ae66a20.jpg",
                    "USERID" : 10020,
                    "ACTUALNAME" : "杨静",
                    "SEX" : 2
                }]
            }, {
                "id" : 30,
                "name" : "规划部",
                list : [{
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10013,
                    "ACTUALNAME" : "高飞",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/278ce83b4c61d98bef6017f166ecd376.jpg",
                    "USERID" : 10014,
                    "ACTUALNAME" : "刘聪",
                    "SEX" : 2
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10017,
                    "ACTUALNAME" : "文威",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/38a9dc81daccece27e006d07bb645a72.jpg",
                    "USERID" : 10030,
                    "ACTUALNAME" : "曹欣然",
                    "SEX" : 2
                }, {
                    "FACEFILE" : "/Files/Faces/52bd35214e9e990659ec6cdfb57ce984.jpg",
                    "USERID" : 10031,
                    "ACTUALNAME" : "刘洋",
                    "SEX" : 2
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10032,
                    "ACTUALNAME" : "王文峰",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10059,
                    "ACTUALNAME" : "牛林娜",
                    "SEX" : 0
                }]
            }, {
                "id" : 31,
                "name" : "硬件部",
                list : [{
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10035,
                    "ACTUALNAME" : "邵阳",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10036,
                    "ACTUALNAME" : "赵志辉",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10037,
                    "ACTUALNAME" : "高校明",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10038,
                    "ACTUALNAME" : "吕云龙",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10039,
                    "ACTUALNAME" : "赵林",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/caa18b6e3e3f69c81204e4070b3122f5.jpg",
                    "USERID" : 10044,
                    "ACTUALNAME" : "赵志滨",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10068,
                    "ACTUALNAME" : "王震",
                    "SEX" : 1
                }]
            }, {
                "id" : 32,
                "name" : "咨询部",
                list : [{
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10016,
                    "ACTUALNAME" : "咨询刘聪",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10055,
                    "ACTUALNAME" : "闫婷",
                    "SEX" : 0
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10073,
                    "ACTUALNAME" : "陈秋月",
                    "SEX" : 0
                }]
            }, {
                "id" : 33,
                "name" : "财务部",
                list : [{
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10029,
                    "ACTUALNAME" : "祝青雨",
                    "SEX" : 2
                }]
            }, {
                "id" : 35,
                "name" : "测试组",
                list : [{
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10045,
                    "ACTUALNAME" : "王老师",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10046,
                    "ACTUALNAME" : "刘老师",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10047,
                    "ACTUALNAME" : "张老师",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10048,
                    "ACTUALNAME" : "赵老师",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10049,
                    "ACTUALNAME" : "周老师",
                    "SEX" : 2
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10050,
                    "ACTUALNAME" : "吴老师",
                    "SEX" : 1
                }]
            }, {
                "id" : 36,
                "name" : "企划部",
                list : [{
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10033,
                    "ACTUALNAME" : "刘利艳",
                    "SEX" : 2
                }, {
                    "FACEFILE" : "/Files/Faces/048f8b499002eadcc4daf4e623c4d1da.jpg",
                    "USERID" : 10058,
                    "ACTUALNAME" : "朱向斌",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10070,
                    "ACTUALNAME" : "张力",
                    "SEX" : 1
                }]
            }, {
                "id" : 37,
                "name" : "化工部",
                list : [{
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10060,
                    "ACTUALNAME" : "刘泰然",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10061,
                    "ACTUALNAME" : "金敏尔",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10062,
                    "ACTUALNAME" : "李安民",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10063,
                    "ACTUALNAME" : "聂鑫",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10064,
                    "ACTUALNAME" : "袁家为",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/0d4ddec36a42799f998782e983d15800.jpg",
                    "USERID" : 10065,
                    "ACTUALNAME" : "赵丽斌",
                    "SEX" : 0
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10066,
                    "ACTUALNAME" : "吴晓艳",
                    "SEX" : 0
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10067,
                    "ACTUALNAME" : "周学慧",
                    "SEX" : 0
                }]
            }, {
                "id" : "otherId",
                "name" : "otherName",
                list : [{
                    "FACEFILE" : "/Files/Faces/96fc413acb6fbd1fcd1af8e4a9e622b8.gif",
                    "USERID" : 10041,
                    "ACTUALNAME" : "服务器",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/219afd8ae69546cf0297b6e6d3a4a157.jpg",
                    "USERID" : 10042,
                    "ACTUALNAME" : "许建成",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/62b7c5a756588328bcc56243a0689530.jpg",
                    "USERID" : 10043,
                    "ACTUALNAME" : "袁凤超",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10045,
                    "ACTUALNAME" : "王老师",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/",
                    "USERID" : 10046,
                    "ACTUALNAME" : "刘老师",
                    "SEX" : 1
                }, {
                    "FACEFILE" : "/Files/Faces/ff0b378f2fef3065d394763e5a5a67a2.jpg",
                    "USERID" : 10051,
                    "ACTUALNAME" : "韩玉青",
                    "SEX" : 2
                }]
            }]
        }
    }
}