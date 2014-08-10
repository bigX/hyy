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

        var nick = ssdjs.dom.text(230,50,null,null,"豆汁真好喝")
        nick.className=" tc sBiga" ;
        inMain.appendChild(nick);
        var _x = 200;

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

        var btnWiki = hyy.tpl.btn.Button({
            x: 147,
            y: _x,
            w: 346,
            h: 91,
            bgOn: 'index/wiki_off.png',
            bgOff: 'index/wiki_off.png',
            fun: function () {
                hyy.diag.pop.hide();
                hyy.biz.wiki.initView();
            }
        });
        inMain.appendChild(btnWiki);
        _x+=100;

        var btnInfo = hyy.tpl.btn.Button({
            x: 64,
            y: _x,
            w: 511,
            h: 91,
            bgOn: 'index/info_off.png',
            bgOff: 'index/info_off.png',
            fun: function () {
                hyy.diag.pop.hide();
                hyy.biz.info.initView();
            }
        });
        inMain.appendChild(btnInfo);

        _x+=100;

        var btnRank = hyy.tpl.btn.Button({
            x: 234,
            y: _x,
            w: 172,
            h: 91,
            bgOn: 'index/rank_off.png',
            bgOff: 'index/rank_off.png',
            fun: function () {
                hyy.diag.pop.hide();
                hyy.biz.rank.initView();
            }
        });
        inMain.appendChild(btnRank);

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