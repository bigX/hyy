var hl = (hl || {});
hl.data = (hl.data || {});

hl.data.user = {
   
    loadStat : 0,

    get : function() {
        return JSON.parse(localStorage.getItem("userInfo"));
    },
    set : function(p) {
        localStorage.setItem("userInfo", JSON.stringify(p.user));
    },
}