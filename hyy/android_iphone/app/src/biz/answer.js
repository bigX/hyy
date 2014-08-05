var hyy = (hyy || {});
hyy.biz = (hyy.biz || {});

hyy.biz.answer = {
    initView : function(){
        var anMain = hyy.$("answer");
        anMain.style.display = "";
        var size = hyy.sys.winSize();




        var ico0 = ssdjs.dom.img(0, 0, 119, 165, hyy.url.img("ico_0.png"));
        anMain.appendChild(ico0);
        var ico1 = ssdjs.dom.img(size.w - 119, 0, 119, 165, hyy.url.img("ico_1.png"));
        anMain.appendChild(ico1);




        var question = {q:'一加一等于几',a:B,al:[{k:a,v:1},{k:b,v:2},{k:c,v:3},{k:d,v:4}]} ;

        var hscroll = hyy.tpl.scroll.v.create("hscrollC", 170, 0, size.w, size.h-170, null, null);
        anMain.append(hscroll);
        // 滑动区域scroll定义
        scrollC = hyy.sys.scroll({
            id : "hscrollA",
            snap : false,
            vScrollbar : false,
            hScroll : false,
            momentum : true
        });

        var view ;
        hyy.tpl.scroll.v.appendL("hscrollA", view);




    },
    item:function(){

    },
    refreshQuestion : function(){

    },

    getQuestion :function(){

    }
}