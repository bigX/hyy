var hyy = (hyy || {});
hyy.biz = (hyy.biz || {});

hyy.biz.register = {
    initView: function () {
        var reMain = hyy.$("pop");
        reMain.style.display = "";
        var size = hyy.sys.winSize();


        var ico0 = ssdjs.dom.img(0, 0, 119, 165, hyy.url.img("ico_0.png"));
        reMain.appendChild(ico0);
        var ico1 = ssdjs.dom.img(size.w - 119, 0, 119, 165, hyy.url.img("ico_1.png"));
        reMain.appendChild(ico1);

        var title = ssdjs.dom.img((size.w - 296) / 2, 70, 296, 38, hyy.url.img("register/register_title.png"));
        reMain.appendChild(title);

        var _x = 180;

        var margin = 120;
        var inputNick = ssdjs.dom.input(margin, _x, size.w - margin * 2, 64);
        inputNick.id = "nick";

        inputNick.style.fontSize = "30px";
        inputNick.className = "bOff tc";
        reMain.appendChild(inputNick);

        _x += 100;

        // 男
        var man = ssdjs.dom.div(150,_x,122,114);
        man.style.backgroundImage = hyy.url.cssimg("register/man_off.png");
        man.evtEnd(function(obj){
            obj.style.backgroundImage = hyy.url.cssimg("register/man_on.png");
            woman.style.backgroundImage = hyy.url.cssimg("register/woman_off.png");
        });
        reMain.appendChild(man);

        var woman = ssdjs.dom.div(size.w - 264,_x,122,114);
        woman.style.backgroundImage = hyy.url.cssimg("register/woman_off.png");
        woman.evtEnd(function(obj){
            obj.style.backgroundImage = hyy.url.cssimg("register/woman_on.png");
            man.style.backgroundImage = hyy.url.cssimg("register/man_off.png");
        });
        reMain.appendChild(woman);

        _x += 130;



        var btnOK = hyy.tpl.btn.Button({
            x: 152,
            y: _x,
            w: 138,
            h: 84,
            bgOn: 'register/ok_off.png',
            bgOff: 'register/ok_off.png',
            fun: function () {

            }
        });
        reMain.appendChild(btnOK);

        var btnCancel = hyy.tpl.btn.Button({
            x: size.w - 290,
            y: _x,
            w: 138,
            h: 84,
            bgOn: 'register/cancel_off.png',
            bgOff: 'register/cancel_off.png',
            fun: function () {

            }
        });
        reMain.appendChild(btnCancel);

        _x += 200;

        var content = ssdjs.dom.img(10, _x, 620, 263, hyy.url.img("register/content.png"));
        reMain.appendChild(content);


    },
    req: function () {

    }
}