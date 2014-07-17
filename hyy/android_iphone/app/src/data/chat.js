var hl = (hl || {});
hl.data = (hl.data || {});

hl.data.chat = {

    /**
     * chat molel
     * { fromUser : 1122 ,
     * 	   toUser : 1123 ,
     * 	  content : "hello" ,
     * 	 sendTime : 1392184971610 , }
     */

    receive : {
        add : function(p) {

            var item = p.item;
            var user = hl.data.user.get();
            var onDuty = (hl.data.chat.onDuty.get() || {
                id : -1,
                name : ""
            });
            if(onDuty.id == item.SENDER_USERID) {
                // TODO 像页面添加item ssdjs.$("hscrollC")
                if(ssdjs.$("hscrollC") != null) {
                    console.log("添加到页面");
                    hl.biz.chat.receiveMessage({
                        item : {
                            sendName : item.SENDER_USERID,
                            receiveName : user.id,
                            content : item.CONTENT,
                            time : item.SENDTIME
                        }
                    });
                } else {
                    console.log("添加到缓存");
                    hl.alerts.notification(item.SENDER_USERID + "想你发来信息", item.CONTENT);
                    hl.data.chat.receive.push({
                        item : {
                            sendName : item.SENDER_USERID,
                            receiveName : user.id,
                            content : item.CONTENT,
                            time : item.SENDTIME
                        }
                    });
                }

            } else {
                console.log("添加到缓存");
                hl.alerts.notification(item.SENDER_USERID + "想你发来信息", item.CONTENT);
                hl.data.chat.receive.push({
                    item : {
                        sendName : item.SENDER_USERID,
                        receiveName : user.id,
                        content : item.CONTENT,
                        time : item.SENDTIME
                    }
                });
                // TODO 添加提醒
            }

            // 添加到历史记录
            // 数据格式化

            var chatModel = {
                sendName : item.SENDER_USERID,
                receiveName : user.id,
                content : item.CONTENT,
                time : item.SENDTIME
            };
            hl.data.chat.history.insert(chatModel, chatModel.sendName);

        },
        list : [],
        push : function(p) {
            console.log("push" + JSON.stringify(p.item));
            var item = p.item;
            var list = hl.data.chat.receive.list;
            for(var i = 0; i < list.length; ) {
                if(list[i].key != null && list[i].key != undefined) {
                    var tem = list[i];
                    if(item.sendName == tem.key) {
                        list[i].list.push(item);
                        break;
                    }
                }
                i++;
            }
            if(i >= list.length) {
                list.push({
                    key : item.sendName,
                    list : [{
                        sendName : item.sendName,
                        receiveName : item.receiveName,
                        content : item.content,
                        time : item.time
                    }]
                });
            }
        }
    },

    onDuty : {
        friend : {}, // {name : "张三" , id : 10010}
        get : function() {
            return hl.data.chat.onDuty.friend;
        },
        set : function(p) {
            hl.data.chat.onDuty.friend = p
        }
    },
    // 存储聊天记录
    // chatList : [] // chatItem :{key : fid ,user : "fid"|| "me" ,text :"sss",time:21212121}
    history : {

        searchList : [], // 用来存放从数据库中取到的聊天记录

        last : function() {
            var s = document.getElementById("hscrollCmain");
            var a = s.firstChild;

            if(a) {
                var item = a.tag;
                return item;
            } else {
                return {
                    time : 99999999999999999,
                    id : 9999999,
                };
            }

        },
        insert : function(item, onDutyId) {
            var pp = item;
            var onDuty = hl.data.chat.onDuty.get();
            var id = onDuty.id;
            if(onDutyId) {
                id = onDutyId;
            }
            pp.onDuty = id;
            hl.data.database.insert2Chat(pp);
        },
        search : function(p) {
            var onDuty = hl.data.chat.onDuty.get();
            var id = onDuty.id;
            var last = hl.data.chat.history.last();
            console.log("last:" + JSON.stringify(last));

            var sendTime = last.time;
            var time = parseInt(last.time) * 1000;
            var c = new Date(time);
            var fmtTime = c.format("yyyy-MM-dd HH:mm:ss");

            // console.log(fmtTime) ;

            // TODO 这里我做的封装太差了，有时间要细调
            hl.data.database.searchChat({
                sql : "SELECT _id,onDuty,sendName,receiveName, content, time FROM CHAT WHERE onDuty = " + id + " AND time < '" + fmtTime + "' ORDER BY time DESC LIMIT 5 ",
                cb : p.cb
            });
            // TODO 这里数据库查询的底层方法并不能直接返回查询数据，坑爹的回调函数，有时间要研究一下。
            //return  hl.data.chat.history.searchList ;
        },
        chatList : [],
        /**
         * p {fid :"1212"}
         */
        get : function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        /**
         * p :{
         * 	item :{key : fid ,user : "1212"|| "me" ,text :"sss",time:21212121}
         * }
         */
        set : function(p) {
            var key = p.key;
            hl.data.chat.historychatList = hl.data.chat.history.get(key) || [];
            hl.data.chat.historychatList.push(p);
            localStorage.setItem(key, JSON.stringify(hl.data.chat.historychatList));
        }
    }

}