/**
 *   模板库
 */
var hyy = (hyy || {});
hyy.tpl = {
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
            var wrap = ssdjs.dom.div(p.x, p.y, p.w, p.h);
            wrap.style.backgroundImage = hyy.url.cssimg('');
            wrap.className = 'bOff';
            wrap.evtEnd(function(obj){
                obj.style.backgroundImage = hyy.url.cssimg(p.bgOff);
                obj.className = 'bOff';
                if (p.fun != null) {
                    p.fun(obj);
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
