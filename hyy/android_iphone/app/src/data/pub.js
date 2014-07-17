var hl = (hl || {});
hl.data = (hl.data || {});

hl.data.sysMessage = {
    last : 0,
    list : [],
    append : function(p) {
        hl.data.sysMessage.list.push({
            s : 0, // 用于标记该公告是否已读
            item : p.item
        })

        // 可加存储上限，比如只存储最近100条
        if(hl.data.sysMessage.list.length > 100) {
            hl.data.sysMessage.list.shift()
        }
    },
    /**
     * 清楚所有公告
     */
    clear : function() {

    },
    /**
     * 标为已读
     * 需要传递公告的ID
     */
    mark : function(p) {
        // 遍历数组查找指定元素，   s:0 ----> s:1

    }
};
hl.data.pub = {
    db : {
        num : 0,
        searchList : [],
        last : function() {
            var s = document.getElementById("hscrollS");
            var a = s.firstChild;
            if(a != null) {
                var item = a.tag;
                return item;
            } else {
                return {
                    time : 0,
                    sid : -1,
                };
            }
        },
        insert : function(item) {
            hl.data.database.insert2pm(item);
        },
        search : function() {
            var last = hl.data.pub.db.last();
            hl.data.database.searchPubMsg({
                sql : "SELECT _id, status, sid, title, content, time FROM PUBMSG WHERE sid < '" + last.sid + "' ORDER BY sid DESC LIMIT 5 "
            });
        },
        update : function(item) {
            hl.data.database.updatePubMsg({
                sql : "UPDATE PUBMSG SET status = 2 WHERE sid=" + item.sid
            });
        },
        mdelete : function(item) {
            hl.data.database.updatePubMsg({
                sql : "UPDATE PUBMSG SET status = 1 WHERE sid=" + item.sid
            });
        },
    },
    getLast : function() {
        var user = hl.data.user.get();
        return JSON.parse(localStorage.getItem(user.id + "pubMsgLast")) || {
            sid : 0
        };
    },
    setLast : function(item) {
        var user = hl.data.user.get();
        localStorage.setItem(user.id + "pubMsgLast", JSON.stringify(item));
    },
    get : function() {
        var user = hl.data.user.get();
        return JSON.parse(localStorage.getItem(user.id + "pubList"));
    },
    set : function(list) {
        var user = hl.data.user.get();
        localStorage.setItem(user.id + "pubList", JSON.stringify(list));
    },
    update : function(list) {
        var user = hl.data.user.get();
        localStorage.setItem(user.id + "pubList", JSON.stringify(list));
    },
    last : function() {
        var list = hl.data.pub.get();

        if(list != null && list.length > 0) {
            return list[list.length - 1];
        } else {
            return {
                sid : 0
            };
        }

    },
    append : function(item) {
        console.log();
        hl.data.pub.db.insert(item);

        hl.data.pub.setLast(item);

        var list = (hl.data.pub.get() || []);
        list.push(item)
        // 可加存储上限，比如只存储最近99条
        if(list.length > 99) {
            list.shift();
        }
        hl.data.pub.set(list);
    },
    /**
     * 清楚所有公告
     */
    clear : function() {

    },
    /**
     * 标为已读
     * 需要传递公告的ID
     */
    mark : function(p) {
        // 遍历数组查找指定元素，   s:0 ----> s:1

    }
}