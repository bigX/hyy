var hyy = (hyy || {});
hyy.biz = (hyy.biz || {});

hyy.biz.answer = {
    initView: function () {
        var anMain = hyy.$("answer");
        anMain.style.display = "";
        var size = hyy.sys.winSize();


        var ico0 = ssdjs.dom.img(0, 0, 119, 165, hyy.url.img("ico_0.png"));
        anMain.appendChild(ico0);
        var ico1 = ssdjs.dom.img(size.w - 119, 0, 119, 165, hyy.url.img("ico_1.png"));
        anMain.appendChild(ico1);


        // 测试数据
        var q = {q: '一加一等于几', a: "b", al: [
            {k: 'a', v: 1},
            {k: 'b', v: 2},
            {k: 'c', v: 3},
            {k: 'd', v: 4}
        ]};

        var hscroll = hyy.tpl.scroll.v.create("hscrollA", 0, 170, size.w, size.h - 170, null, null);
        anMain.appendChild(hscroll);
        // 滑动区域scroll定义
        scrollC = hyy.sys.scroll({
            id: "hscrollA",
            snap: false,
            vScrollbar: false,
            hScroll: false,
            momentum: true
        });

        var margin = 10;
        var _x = 10;
        var questionDiv = ssdjs.dom.div(null, null, 620, 200);
        questionDiv.className = "bOff";
        var questionText = ssdjs.dom.text(10, 10, 600, null, q.q);
        questionText.className = "tc sMid";
        questionDiv.appendChild(questionText);
        hyy.tpl.scroll.v.append("hscrollA", questionDiv);
        var num = q.al.length;

        for (var i = 0; i < num; i++) {
            hyy.tpl.scroll.v.append("hscrollA", hyy.biz.answer.item(q.al[i]));
        }

        var btnCancel = hyy.tpl.btn.Button({
            x: 251,
            y: null,
            w: 138,
            h: 84,
            bgOn: 'pub/btn_cl_on.png',
            bgOff: 'pub/btn_cl_off.png',
            fun: function () {
                $("#answer").empty();
                hyy.biz.index.initView();

            }
        });
        btnCancel.style.marginTop = 50;
        hyy.tpl.scroll.v.append("hscrollA", btnCancel);

        scrollC.refresh();

    },
    item: function (p) {
        var divWrap = ssdjs.dom.div(null, null, 620, 60);
        divWrap.style.marginTop = 10;

        var text = ssdjs.dom.text(10, 10, 600, null, p.k + ":  " + p.v);
        divWrap.className = "bOff";
        text.className = "tc sMid";
        divWrap.appendChild(text);

        divWrap.evtEnd(function (obj) {
            divWrap.className = "bOff";
            if (p.fun != null) {
                p.fun(p.p);
            }
        });
        divWrap.evtMove(function (obj) {
            divWrap.className = "bOff";
        });
        divWrap.evtStart(function (obj) {
            divWrap.className = "bOn";
        });
        return divWrap;
    },
    refreshQuestion: function () {

    },

    getQuestion: function () {

    },
    getRsult: function () {

    }

}