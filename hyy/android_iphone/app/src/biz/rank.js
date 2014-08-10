var hyy = (hyy || {});
hyy.biz = (hyy.biz || {});

hyy.biz.rank = {
    initView: function () {
        var inMain = hyy.$("pop");
        hyy.diag.pop.clear();
        inMain.style.display = "";
        var size = hyy.sys.winSize();


        var ico0 = ssdjs.dom.img(0, 0, 119, 165, hyy.url.img("ico_0.png"));
        inMain.appendChild(ico0);
        var ico1 = ssdjs.dom.img(size.w - 119, 0, 119, 165, hyy.url.img("ico_1.png"));
        inMain.appendChild(ico1);


        var btnCancel = hyy.tpl.btn.Button({
            x: 251,
            y: 600,
            w: 138,
            h: 84,
            bgOn: 'pub/btn_cl_on.png',
            bgOff: 'pub/btn_cl_off.png',
            fun: function () {
                $("#answer").empty();
                hyy.biz.index.initView();

            }
        });
        inMain.appendChild(btnCancel);


    },
    req: function () {

    }
}