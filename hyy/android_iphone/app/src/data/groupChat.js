var hl = (hl || {});
hl.data = (hl.data || {});

hl.data.groupChat = {

    /**
     * 接收策略 ： (由于存储一个历史listz在其item中标注已读或者未读每次查看时都要检测历史list操作量过大，所以未读信息单独存储)
     * 1. 接收新消息，if(当前){添加到页面&&添加到历史记录}else{添加到未读缓存&&添加到历史记录}
     * 2. when(查看x群){切换当前;显示未读缓存;清空未读缓存} ** 显示最少3条记录if(未读记录不足3条){从历史记录中补齐}
     * 3. when(查看历史记录){显示前5条历史}
     * 4. when(有新消息){更新last}
     */

    /**
     * groupChat molel
     * {    mid : 1122 ,
     * 	    gid : 1123 ,
     * 	    uid : "hello" ,
     * sendName : "服务器" ,
     * 	content : "hello" ,
     *     time : "1389589522"}
     */

    lastMessage : {},

    last : function(p) {
        // TODO 这里加一层缓存比较好
        hl.data.database.search4gcRef({
            sql : "SELECT mid FROM GROUPCHAT ORDER BY mid DESC LIMIT 1"
        });

        setTimeout(function() {
            return hl.data.groupChat.lastMessage;
        }, 100);
    },
    last2 : {
        get : function() {
            var user = hl.data.user.get();
            return JSON.parse(localStorage.getItem(user.id + "groupMessageLast"));
        },
        set : function(item) {
            var user = hl.data.user.get();
            localStorage.setItem(user.id + "groupMessageLast", JSON.stringify(item));
        }
    },
    receive : {
        add : function(p) {

            var item = p.item;
            hl.data.groupChat.last2.set(item);
            var onDuty = (hl.data.groupChat.onDuty.get() || {
                id : -1,
                name : ""
            });
            if(onDuty.id == item.gid) {
                // 像页面添加item ssdjs.$("hscrollC")
                if(ssdjs.$("hscrollGC") != null) {
                    console.log("群信息添加到页面");
                    hl.biz.group.receiveMessage(item);
                } else {
                    console.log("添加到缓存");
                    hl.data.groupChat.receive.push(item);
                }

            } else {
                console.log("添加到缓存");
                hl.data.groupChat.receive.push(item);
            }

            // 添加到聊天记录
            setTimeout(function() {
                hl.data.groupChat.history.insert(item);
            }, 10);
        },
        list : [],
        push : function(item) {
            hl.alerts.notification(item.gid + "群发来信息", item.content);
            var list = hl.data.groupChat.receive.list;
            for(var i = 0; i < list.length; ) {
                if(list[i].key != null && list[i].key != undefined) {
                    var tem = list[i];
                    if(item.gid == tem.key) {
                        list[i].list.push(item);
                        break;
                    }
                }
                i++;
            }
            if(i >= list.length) {
                list.push({
                    key : item.gid,
                    list : [{
                        mid : item.mid,
                        gid : item.gid,
                        uid : item.uid,
                        sendName : item.sendName,
                        content : item.content,
                        time : item.time
                    }]
                });
            }
        }
    },

    onDuty : {
        group : {}, // {name : "张三" , id : 10010}
        get : function() {
            return hl.data.groupChat.onDuty.group;
        },
        set : function(group) {
            hl.data.groupChat.onDuty.group = group
        }
    },
    // 存储聊天记录
    history : {
        last : function() {

            var s = document.getElementById("hscrollGCmain");
            var a = s.firstChild;

            if(a) {
                var item = a.tag;
                return item;
            } else {
                return {
                    mid : 9999999
                };
            }
        },
        insert : function(item) {
            hl.data.database.insert2GChat(item);
        },
        search : function(p) {

            var onDuty = hl.data.groupChat.onDuty.get();
            var gid = onDuty.id;

            var last = hl.data.groupChat.history.last();
            console.log("grouplast:" + JSON.stringify(last));
 
            hl.data.database.searchGChat({
                cb : p.cb,
                sql : "SELECT * FROM GROUPCHAT WHERE gid = " + gid + " AND mid<" + last.mid + " ORDER BY mid DESC LIMIT 5"
            });
        },
        initSearch : function(p) {

            var onDuty = hl.data.groupChat.onDuty.get();
            var gid = onDuty.id;

            hl.data.database.search({
                cb : p.cb,
                sql : "SELECT mid, gid, uid ,sendName, content, time FROM GROUPCHAT WHERE gid = " + gid + " ORDER BY mid DESC LIMIT 5"
            });
        }
    }

}