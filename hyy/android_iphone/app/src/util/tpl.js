/**
 *   模板库
 */
var hyy = (hyy || {});
hyy.tpl = {
    /**
     * 页面滚动
     */
    scroll : {
        /**
         * 分页
         */
        pager : function(id, nextpage, tag) {
            var mask = ssdjs.$(id);
            if(ssdjs.pager.isLast(tag.pager)) {
                mask.nextpage = null;
                mask.tag = null;
            } else {
                if(nextpage != null) {
                    mask.nextpage = nextpage;
                }
                if(tag != null) {
                    if(tag.pager != null) {
                        tag.pager = ssdjs.pager.next(tag.pager);
                    }
                    mask.tag = tag;
                }
            }
        },
        h : {
            /**
             * 生成滑动区域
             * @param {Object} id domId
             * @param {Object} x left值
             * @param {Object} y top值
             * @param {Object} width 宽度
             * @param {Object} height 高度
             * @param {Object} arrow 可选，箭头样式，如：arrow
             */
            create : function(id, x, y, width, height, arrow) {
                // mask
                var mask = ssdjs.dom.div(x, y, width, height);
                mask.id = id;
                mask.ssdw = 0;
                // container
                var container = ssdjs.dom.div();
                container.id = id + "main";
                mask.appendChild(container);

                return mask;
            },
            /**
             * 往滑动区域添加元素-尾部
             * @param {Object} id domId
             * @param {Object} item 元素
             */
            append : function(id, item) {
                var mask = ssdjs.$(id);
                var container = ssdjs.$(id + "main");
                item.style.cssFloat = "left";
                container.appendChild(item);
                mask.ssdw = (mask.ssdw || 0) + $(item).width();
                container.style.width = mask.ssdw + "px";
            },
            /**
             * 往滑动区域添加元素-头部
             * @param {Object} id domId
             * @param {Object} item 元素
             */
            appendL : function(id, item) {
                var mask = ssdjs.$(id);
                var container = ssdjs.$(id + "main");
                item.style.cssFloat = "left";
                container.insertBefore(item, container.firstChild);
                mask.ssdw = (mask.ssdw || 0) + $(item).width();
                container.style.width = mask.ssdw + "px";
            }
        },
        v : {
            /**
             * 生成滑动区域
             * @param {Object} id domId
             * @param {Object} x left值
             * @param {Object} y top值
             * @param {Object} width 宽度
             * @param {Object} height 高度
             * @param {Object} arrow 可选，箭头样式，如：arrow
             */
            create : function(id, x, y, width, height, arrow, refresh) {
                // mask
                var mask = ssdjs.dom.div(x, y, width, height);
                mask.id = id;
                mask.ssdh = 0;

                // container
                var container = ssdjs.dom.div();
                container.id = id + "main";

                mask.appendChild(container);
                if(refresh != null) {
                    var pullDown = ssdjs.dom.div(null, null, width, 80);
                    pullDown.id = "pullDown";
                    // var pullIcon = ssdjs.dom.div();

                    var pullText = ssdjs.dom.text(0, 30, "100%", null, "滑动刷新");
                    pullText.style.textAlign = "center";

                    pullText.id = "pullDownLabel";
                    pullText.className = "pullDownLabel";

                    // pullDown.appendChild(pullIcon);
                    pullDown.appendChild(pullText);

                    var pullIcon = ssdjs.dom.div(25, 30, null, null);
                    pullIcon.className = "pullDownIcon";
                    pullDown.appendChild(pullIcon);
                    container.appendChild(pullDown);
                    pullDown.style.display = "none";
                }

                return mask;
            },
            /**
             * 生成滑动区域
             * @param {Object} id domId
             * @param {Object} x left值
             * @param {Object} y top值
             * @param {Object} width 宽度
             * @param {Object} height 高度
             * @param {Object} arrow 可选，箭头样式，如：arrow
             */
            create2 : function(id, x, y, width, height, arrow, pullDownH) {
                // mask
                var mask = ssdjs.dom.div(x, y, width, height);
                mask.id = id;
                mask.ssdh = pullDownH;

                // container
                var scroller = ssdjs.dom.div();
                scroller.id = id + "scroller";
                mask.appendChild(scroller);

                if(pullDownH != null) {
                    var pullDown = ssdjs.dom.div(null, null, width, pullDownH);
                    pullDown.id = "pullDown";
                    var pullText = ssdjs.dom.text(0, 30, "100%", null, "正在加载。。。");
                    pullText.style.textAlign = "center";
                    pullText.id = "pullDownLabel";
                    pullText.className = "pullDownLabel";
                    // pullDown.appendChild(pullText);

                    var pullIcon = ssdjs.dom.div((width - 60) / 2, 30, null, null);
                    pullIcon.className = "pullDownIcon";
                    pullDown.appendChild(pullIcon);
                    pullDown.className = 'loading';

                    scroller.appendChild(pullDown);
                }

                // container
                var container = ssdjs.dom.div();
                container.id = id + "main";
                scroller.appendChild(container);

                return mask;
            },
            /**
             * 往滑动区域添加元素-尾部
             * @param {Object} id domId
             * @param {Object} item 元素
             */
            append : function(id, item) {
                var mask = ssdjs.$(id);
                var container = ssdjs.$(id + "main");
                if(container) {
                    container.appendChild(item);
                    mask.ssdh = (mask.ssdh || 0) + $(item).height();
                    container.style.height = mask.ssdh + "px";
                }
            },
            /**
             * 往滑动区域添加元素-头部
             * @param {Object} id domId
             * @param {Object} item 元素
             */
            appendL : function(id, item) {
                var mask = ssdjs.$(id);
                var container = ssdjs.$(id + "main");
                if(container) {
                    var f = container.firstChild;
                    container.insertBefore(item, f);
                    mask.ssdh = (mask.ssdh || 0) + $(item).height();
                    container.style.height = mask.ssdh + "px";
                }
            },
            /**
             * 往滑动区域添加元素-头部
             * @param {Object} id domId
             * @param {Object} item 元素
             */
            appendL2 : function(id, item) {
                var mask = ssdjs.$(id);
                var container = ssdjs.$(id + "main");
                if(container) {
                    var f = container.firstChild;
                    var s = f.nextSibling;
                    f.parentNode.insertBefore(item, f.nextSibling);
                    mask.ssdh = (mask.ssdh || 0) + $(item).height();
                    container.style.height = mask.ssdh + "px";
                }

            },
            clear : function(id) {
                var mask = ssdjs.$(id);
                mask.ssdh = 0;
                var container = ssdjs.$(id + "main");
                if(container) {
                    $("#" + id + "main").empty();
                    container.style.height = 1 + "px";
                }
            }
        }
    },
    toast: function(p){
        var wrap = ssdjs.dom.div(0, 0, 400, 100);
		wrap.style.backgroundColor = "#ffe";
		wrap.id = "toast";
        wrap.zIndex = "9999";
        var msg = ssdjs.dom.text(0, 30, 400, null, p.msg);
        msg.style.textAlign = "center";
        msg.style.color = "#2c2c2c";
        msg.style.fontSize = "24px";
        wrap.appendChild(msg);
        var main = hyy.$("main");
        main.appendChild(wrap);    
		  setTimeout(function() {
			$("#toast").remove();
        }, 5000);
    },
    btn: {
        // p= {x:100,y:100,w:100,h:100,bgOn:'',bgOff:'',fun:}
        Button: function(p){
            console.log(JSON.stringify(p));
            var wrap = ssdjs.dom.div(p.x, p.y, p.w, p.h);
            wrap.style.backgroundImage = hyy.url.cssimg(p.bgOff);
            wrap.evtEnd(function(obj){
                obj.style.backgroundImage = hyy.url.cssimg(p.bgOff);
                if (p.fun != null) {
                    p.fun(p.p);
                }
            });
            wrap.evtMove(function(obj){
                obj.style.backgroundImage = hyy.url.cssimg(p.bgOff);
            });
            wrap.evtStart(function(obj){
                obj.style.backgroundImage = hyy.url.cssimg(p.bgOn);
            });
            return wrap;
        },
        // p= {x:100,y:100,w:100,h:100,bgOn:'',bgOff:'',fun:}
        CheckButton: function(p){
            console.log(JSON.stringify(p));
            var wrap = ssdjs.dom.div(p.x, p.y, p.w, p.h);
            wrap.style.backgroundImage = hyy.url.cssimg(p.bgOff);
            wrap.className = 'bOff';
            wrap.evtEnd(function(obj){
                obj.style.backgroundImage = hyy.url.cssimg(p.bgOff);
                obj.className = 'bOff';
                if (p.fun != null) {
                    p.fun(p.p);
                }
            });
            wrap.evtMove(function(obj){
                obj.style.backgroundImage = hyy.url.cssimg(p.bgOff);
                obj.className = 'bOff';
            });
            wrap.evtStart(function(obj){
                obj.style.backgroundImage = hyy.url.cssimg(p.bgOn);
                obj.className = 'bOn';

            });
            return wrap;
        }
    }
}
