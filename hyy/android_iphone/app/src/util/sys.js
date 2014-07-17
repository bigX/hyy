/**
 * 系统文件
 */
var hyy = (hyy || {});

hyy.sys = {

    isClient: function(){
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    },
    tick: function(){
        // 获取当前服务器tick
        var myDate = new Date();
        myDate.toLocaleTimeString();
        return myDate.toLocaleTimeString();
    },
    log: function(str){
        console.log(str);
        uexLog.sendLog('Log:' + str);
    },
    // 退出程序
    exit: function(){
        uexWidgetOne.exit();
        // appCan 方法
    },
    // 退出登录
    logOut: function(){
        hyy.biz.login.init();
    },
    // 窗口size
    winSize: function(){
        return {
            w: hyy.cfg.winW,
            h: hyy.cfg.winH
        };
    },
  
    $: function(id){
        return document.getElementById(id);
    },
    scroll: function(options){
        var o = (options || {});
        if (o.bounce == null) 
            o.bounce = true;
        if (o.snap == null) 
            o.snap = true;
        if (o.momentum == null) 
            o.momentum = false;
        if (!o.onBeforeScrollMove) 
            o.onBeforeScrollMove = function(){
                //console.log(o.id + "_onBeforeScrollMove");
                ssdjs.dom.CLICK = false;
            };
        if (!o.onScrollMove) 
            o.onScrollMove = function(){
            //console.log(o.id + "_onScrollMove");
            };
        if (!o.onBeforeScrollEnd) {
            o.onBeforeScrollEnd = function(){
                //console.log(o.id + "_onBeforeScrollEnd");
                setTimeout(function(){
                    ssdjs.dom.CLICK = true;
                }, 600);
            };
        }
        if (!o.onScrollEnd) {
            o.onScrollEnd = function(){
                //console.log(o.id + "_onScrollEnd");
            }
        }
        var scroll = new iScroll(o.id, o);
        //scroll.scrollTo(0, 0);
        return scroll;
    }
}

hyy.$= function(id){
        return document.getElementById(id);
    };
hyy.url = {
    img: function(url){
        return hyy.cfg.urlImg + url;
    },
    cssimg: function(url){
        return "url(" + hyy.url.img(url) + ")";
    },
    api: function(url){
        var ret = hyy.cfg.urlApi + url;
        return ret;
    }
};
hyy.req = function(url, onSuccess, onError, data){

    var success = function(result){
        onSuccess(result);
    };
    var error = function(result){
        if (result.status != 200) {
            console.log("网络故障");
            return;
        }
        onError(result);
    };
    hyy.sys.reqopt = ssdjs.req.req(url, success, error, data, false, 20000);
};
