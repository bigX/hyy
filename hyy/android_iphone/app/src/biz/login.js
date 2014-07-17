var hyy = (hyy || {});
hyy.biz = (hyy.biz || {});

hyy.biz.login = {
    init: function(){
    
        var lgMain = hyy.$("logIn");
        
        var aa = window['innerWidth'] || document.documentElement.clientWidth;
        var bb = window['innerHeight'] || document.documentElement.clientHeight
        
        var size = hyy.sys.winSize();
        
//        hyy.tpl.toast({
//            msg: JSON.stringify(size)
//        });
		
		 hyy.tpl.toast({
            msg: aa+"___"+bb 
        });
        
        var _x = 0;
        var _y = 0;
        
        
        var ico0 = ssdjs.dom.img(0, 0, 119, 165, hyy.url.img("ico_0.png"));
        lgMain.appendChild(ico0);
        var ico1 = ssdjs.dom.img(size.w - 119, 0, 119, 165, hyy.url.img("ico_1.png"));
        lgMain.appendChild(ico1);
        
        var margin = 20;
        var inputId = ssdjs.dom.input(margin, 600, size.w - margin * 2, 90);
        inputId.className = "bOff";
        lgMain.appendChild(inputId);
        var inputPw = ssdjs.dom.input(margin, 700, size.w - margin * 2, 90);
        lgMain.appendChild(inputPw);
        
        
        var btnLogin = hyy.tpl.btn.Button({
            x: 100,
            y: 800,
            w: 85,
            h: 40,
            bgOn: 'logInOn.png',
            bgOff: 'logInOff.png',
            fun: null
        });
        
        lgMain.appendChild(btnLogin);
        
    },
    /*
     * 请求登录
     */
    req: function(p){
    
        if (navigator.onLine) {
            //正常工作
            console.log("网络正常");
        }
        else {
            //执行离线状态时的任务
            console.log("网络未链接");
        }
        p = (p || {});
        var loadstat = hyy.diag.loginLoading.show();
        
        // URL
        var url = hyy.url.api("User/LoginInfoJosn");
        var data = "";
        if (p.id != null) {
            data += "txtUserNmeOrUserId=" + p.id;
        }
        if (p.pw != null) {
            data += "&txtPWD=" + p.pw;
        }
        
        var success = function(result){
        
            hyy.diag.loginLoading.hide(loadstat);
            if (result.LoginInfo == "ErrorPwd") {
                return hyy.diag.alert({
                    m: "密码错误"
                });
                
            }
            if (result.LoginInfo == "NoUser") {
                return hyy.diag.alert({
                    m: "用户名错误"
                });
            }
            if (result.LoginInfo == "OK") {
                $("#logIn").hide();
                $("#logIn").empty();
                
                // 初始化用户信息
                hyy.data.user.set({
                    user: {
                        userName: p.id,
                        password: p.pw,
                        id: result.userId,
                        nick: result.strnick,
                        head: result.strPic,
                        say: result.strSign,
                        sex: result.sex,
                        birthday: result.birthday
                    }
                });
                
                // 数据库初始化
                // setTimeout(hyy.data.database.init(), 1000);
                // 开始心跳
                hyy.biz.hb.hb.start();
                
                // TODO 这里要整合一下。
                hyy.biz.user.req();
                
            }
        };
        var error = function(result){
            hyy.diag.loginLoading.hide(loadstat);
            hyy.diag.alert({
                m: "登陆失败"
            });
            return;
        };
        hyy.req(url, success, error, data);
    }
}
