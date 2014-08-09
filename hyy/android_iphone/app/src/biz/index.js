var hyy = (hyy || {});
hyy.biz = (hyy.biz || {});

hyy.biz.index = {
    initView: function () {
        var inMain = hyy.$("pop");
        hyy.diag.pop.clear();
        inMain.style.display = "";
        var size = hyy.sys.winSize();


        var ico0 = ssdjs.dom.img(0, 0, 119, 165, hyy.url.img("ico_0.png"));
        inMain.appendChild(ico0);
        var ico1 = ssdjs.dom.img(size.w - 119, 0, 119, 165, hyy.url.img("ico_1.png"));
        inMain.appendChild(ico1);

        var _x = 100;

        var btnStart = hyy.tpl.btn.Button({
            x: 205,
            y: _x,
            w: 230,
            h: 84,
            bgOn: 'index/start_off.png',
            bgOff: 'index/start_off.png',
            fun: function () {
              hyy.diag.pop.hide();
              hyy.biz.answer.initView();
            }
        });
        inMain.appendChild(btnStart);

        _x+=100;

        var btnExit = hyy.tpl.btn.Button({
            x: 263,
            y: _x,
            w: 114,
            h: 84,
            bgOn: 'index/exit_off.png',
            bgOff: 'index/exit_off.png',
            fun: function () {

            }
        });
        inMain.appendChild(btnExit);



    },
    req: function () {

    }
}