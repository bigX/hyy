var hyy = (hyy || {});
hyy.biz = (hyy.biz || {});

hyy.biz.login = {
    init: function () {
        console.log("longin.init");

        var lgMain = hyy.$("logIn");
        lgMain.style.display = "";

        var size = hyy.sys.winSize();

        var ico0 = ssdjs.dom.img(0, 0, 119, 165, hyy.url.img("ico_0.png"));
        lgMain.appendChild(ico0);
        var ico1 = ssdjs.dom.img(size.w - 119, 0, 119, 165, hyy.url.img("ico_1.png"));
        lgMain.appendChild(ico1);

        var title = ssdjs.dom.img((size.w - 565) / 2, 220, 565, 126, hyy.url.img("login_title.png"));
        lgMain.appendChild(title);

        var content = ssdjs.dom.img((size.w - 468) / 2, 390, 468, 131, hyy.url.img("login_content.png"));
        lgMain.appendChild(content);

        var margin = 120;
        var inputId = ssdjs.dom.input(margin, 540, size.w - margin * 2, 64);
        inputId.id = "id";

        inputId.style.fontSize = "30px";
        inputId.className = "bOff tc";
        lgMain.appendChild(inputId);
        var inputPw = ssdjs.dom.input(margin, 616, size.w - margin * 2, 64);
        inputPw.id = "pw";
        inputPw.type = "password";
        inputPw.className = "bOff tc";
        inputPw.style.fontSize = "30px";
        inputPw.style.type = "password";
        lgMain.appendChild(inputPw);


        var btnLogin = hyy.tpl.btn.Button({
            x: 192,
            y: 700,
            w: 94,
            h: 52,
            bgOn: 'login/login_on.png',
            bgOff: 'login/login_off.png',
            fun: function () {
              //  hyy.biz.login.req({id: $("#id").val(),
               //     pw: $("#pw").val()});
                $("#logIn").empty();
                $("#logIn").hide();
                hyy.biz.index.initView();
            }
        });

        lgMain.appendChild(btnLogin);


        var btnRegister = hyy.tpl.btn.Button({
            x: size.w - 192 - 85,
            y: 700,
            w: 94,
            h: 52,
            bgOn: 'login/register_on.png',
            bgOff: 'login/register_off.png',
            fun: null
        });

        lgMain.appendChild(btnRegister);

    },
    /*
     * 请求登录
     */
    req: function (p) {
        console.log(JSON.stringify(p));
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

        var success = function (result) {

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


            }
        };
        var error = function (result) {
            hyy.diag.loginLoading.hide(loadstat);
            hyy.diag.alert({
                m: "登陆失败"
            });
            return;
        };
        hyy.req(url, success, error, data);
    }
}
