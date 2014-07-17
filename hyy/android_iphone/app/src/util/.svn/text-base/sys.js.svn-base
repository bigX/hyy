/**
 * 系统文件
 */
var hl = (hl || {});

hl.sys = {

    // 退出程序
    exit : function() {
        uexWidgetOne.exit();
        // appCan 方法
    },
    // 退出登录
    logOut : function() {
        hl.biz.login.init();
    },
    // 窗口size
    winSize : function() {
        return {
            x : window['innerWidth'] || document.documentElement.clientWidth,
            y : window['innerHeight'] || document.documentElement.clientHeight
        }
    },
    hl$ : function(id) {
        return document.getElementById(id);
    },
    $ : function(id) {
        return document.getElementById(id);
    },
    scroll : function(options) {
        var o = (options || {});
        if(o.bounce == null)
            o.bounce = true;
        if(o.snap == null)
            o.snap = true;
        if(o.momentum == null)
            o.momentum = false;
        if(!o.onBeforeScrollMove)
            o.onBeforeScrollMove = function() {
                ssdjs.dom.CLICK = false;
            };
        if(!o.onScrollMove)
            o.onScrollMove = function() {
                pullDownEl = document.getElementById('pullDown');
                if(pullDownEl != null) {
                    pullDownOffset = pullDownEl.offsetHeight;
                    if(this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.style.display = "";
                        pullDownEl.className = 'flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新';                    
                        //  刷新页面
                        console.log("hl.biz.diskAll.refresh()");
                        setTimeout(function() {
                            hl.biz.diskAll.refresh();
                        }, 1000);
                    } else if(this.y < 5 && pullDownEl.className.match('flip')) {

                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新';

                    }
                }

                // } else if(this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                // pullUpEl.className = 'flip';
                // pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
                // this.maxScrollY = this.maxScrollY;
                // } else if(this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                // pullUpEl.className = '';
                // pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
                // this.maxScrollY = pullUpOffset;
                // }
            };
        if(!o.onBeforeScrollEnd) {
            o.onBeforeScrollEnd = function() {
                console.log("onBeforeScrollEnd");
                setTimeout(function() {
                    ssdjs.dom.CLICK = true;
                }, 100);
                pullDownEl = document.getElementById('pullDown');

                console.log(this.y + "_" + this.maxScrollY);

                if(pullDownEl != null) {
                    pullDownEl.style.display = "none";

                }
            };
        }
        if(!o.onScrollEnd) {
            o.onScrollEnd = function() {
                console.log("onScrollEnd");
                if(this.options.arrow != null) {
                    // var l = "none";
                    // var r = "none";
                    // if(this.currPageX > 0) {
                    // l = "";
                    // }
                    // if(this.currPageX - (this.pagesX.length - 1) < 0) {
                    // r = "";
                    // }
                    // $("#" + this.options.arrow + "L").css("display", l);
                    // $("#" + this.options.arrow + "R").css("display", r);
                }
            };
        }
        var scroll = new iScroll(o.id, o);
        scroll.scrollTo(0, 0);

        return scroll;
    },
}
hl.url = {
    img : function(url) {
        return hl.cfg.urlImg + url;
    },
    cssimg : function(url) {
        return "url(" + hl.url.img(url) + ")";
    },
    api : function(url) {
        var ret = hl.cfg.urlApi + url;
        return ret;
    }
}
hl.req = function(url, onSuccess, onError, data, heart) {
    // 心跳
    if(!heart) {
        //  sail.data.user.userold = ssdjs.util.clone(sail.data.user.user);
    } else {
        //console.log("心跳");
    }
    //

    var success = function(result) {

        if(heart) {
            console.log("心跳");
            // 公告
            if(result.list != null) {
                for(var i = 0; i < result.list.length; i++) {
                    hl.data.pub.append({
                        item : result.list[i]
                    });
                }
            }
            // 聊天
            if(result.listchat != null) {
                for(var i = 0; i < result.listchat.length; i++) {
                    hl.data.chat.receive.add({
                        item : result.listchat[i]
                    });
                }
            }
        }

        onSuccess(result);
    };
    var error = function(result) {
        if(result.status != 200) {
            console.log("网络故障");
            hl.diag.alert({
                m : "网络故障"
            });
            return;
        }
        onError(result);
    };
    hl.sys.reqopt = ssdjs.req.req(url, success, error, data, false, 15000);
};
