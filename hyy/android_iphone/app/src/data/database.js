var hl = (hl || {});
hl.data = (hl.data || {});
hl.data.database = {
    /**
     * 创建数据库和数据表
     */
    init : function(p) {
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        // 创建 群聊历史记录数据库
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;

        uexDataBaseMgr.cbOpenDataBase = function(opID, dataType, data) {
            if(dataType == 2 && data == 0) {

                console.log('数据库打开/创建成功！');
                // 创建数据库表

                // 检测所创建表是否存在，if(不存在){创建}
                uexDataBaseMgr.cbExecuteSql = function(opID, type, data) {
                    if(type == 2 && data == 0) {
                        console.log('表创建成功！');
                    } else {
                        // if(数据表存在){创建失败}
                        console.log('表创建失败！');
                    }

                    // 此处不对数据库进行关闭操作，轮训时可能频繁操作数据库，所以保持数据库打开
                };
                var sql = "CREATE TABLE GROUPCHAT(_id INTEGER PRIMARY KEY,mid TEXT,gid TEXT,uid TEXT,sendName TEXT,content TEXT,time DATETIME)";
                uexDataBaseMgr.executeSql(dbName, ++opID, sql);

                var opID2 = 100;

                // 创建单人聊天数据表
                // 同时创建多张数据表不能这么写。因为回调函数被覆盖了。
                uexDataBaseMgr.cbExecuteSql = function(opID2, type, data) {
                    if(type == 2 && data == 0) {
                        console.log('私人聊天表创建成功！');
                    } else {
                        // if(数据表存在){创建失败}
                        console.log('私人聊天表创建失败！');
                    }
                };
                var sql = "CREATE TABLE CHAT(_id INTEGER PRIMARY KEY,onDuty TEXT,sendName TEXT,receiveName TEXT,content TEXT,time DATETIME)";
                uexDataBaseMgr.executeSql(dbName, ++opID2, sql);

                var opID3 = 1000;

                // 创建单人聊天数据表
                // 同时创建多张数据表不能这么写。因为回调函数被覆盖了。
                uexDataBaseMgr.cbExecuteSql = function(opID3, type, data) {
                    if(type == 2 && data == 0) {
                        console.log('公告表创建成功！');
                    } else {
                        // if(数据表存在){创建失败}
                        console.log('公告表创建失败！');
                    }
                };
                var sql = "CREATE TABLE PUBMSG(_id INTEGER PRIMARY KEY,status TEXT,sid TEXT,title TEXT,content TEXT,time TEXT)";
                uexDataBaseMgr.executeSql(dbName, ++opID3, sql);

            } else {
                console.log('数据库打开/创建失败！');
            }
        };
        uexDataBaseMgr.openDataBase(dbName, ++opID);
    },
    close : function() {
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;

        uexDataBaseMgr.cbCloseDataBase = function closeDataBaseCallBack(opid, type, data) {
            if(type == 2 && data == 0) {
                console.log('数据库关闭成功！');
            } else {
                console.log('数据库关闭失败！');
            }
        };
        uexDataBaseMgr.closeDataBase(dbName, ++opID);
    },
    pubMsgNum : function() {
        var opID = 9000;
        var user = hl.data.user.get();
        var dbName = user.id + "hl";

        var sql = "SELECT count(*) FROM " + dbName;

        uexDataBaseMgr.cbExecuteSql = function(opID, type, data) {
            if(type == 2 && data == 0) {
                hl.data.pub.db.num = parseInt(data);
            } else {
                console.log('公告表更新失败！');
            }
        };
        uexDataBaseMgr.executeSql(dbName, ++opID, p.sql);
    },
    updatePubMsg : function(p) {
        var opID = 9000;
        var user = hl.data.user.get();
        var dbName = user.id + "hl";

        uexDataBaseMgr.cbExecuteSql = function(opID, type, data) {
            if(type == 2 && data == 0) {
                console.log('公告表更新成功！');
            } else {
                console.log('公告表更新失败！');
            }
        };
        uexDataBaseMgr.executeSql(dbName, ++opID, p.sql);
    },
    insert2pm : function(p) {
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        console.log(JSON.stringify(p));
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;
        uexDataBaseMgr.cbExecuteSql = function(opId, type, data) {
            if(type == 2 && data == 0) {
                // console.log('数据插入成功！');
            } else {
                console.log('群聊数据插入失败！');
            }
        };
        var sql = "INSERT INTO PUBMSG (status, sid, title ,content, time ) VALUES ('" + p.status + "','" + p.sid + "','" + p.title + "','" + p.content + "','" + p.time + "')";
        uexDataBaseMgr.executeSql(dbName, ++opID, sql);
    },
    searchPubMsg : function(p) {
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        console.log("database查询searchPubMsg语句 ： " + p.sql)
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;

        uexDataBaseMgr.cbSelectSql = function(opId, type, data) {
            if(type == 1) {
                var Jdata = JSON.parse(data);
                console.log("database查询searchPubMsg语句 ：" + data);
                hl.data.pub.history.searchList = JSON.parse(data);
            } else {
                console.log('查询失败！');
            }
        };
        var sql = p.sql;
        uexDataBaseMgr.selectSql(dbName, ++opID, sql);

    },
    insert2gc : function(p) {
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        console.log(JSON.stringify(p));
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;
        uexDataBaseMgr.cbExecuteSql = function(opId, type, data) {
            if(type == 2 && data == 0) {
                // console.log('数据插入成功！');
            } else {
                console.log('群聊数据插入失败！');
            }
        };
        var time = parseInt(p.time) * 1000;
        var c = new Date(time);
        var fmtTime = c.format("yyyy-MM-dd HH:mm:ss");
        var sql = "INSERT INTO GROUPCHAT (mid, gid, uid ,sendName, content, time ) VALUES ('" + p.mid + "','" + p.gid + "','" + p.uid + "','" + p.sendName + "','" + p.content + "','" + fmtTime + "')";
        //  console.log(sql);

        uexDataBaseMgr.executeSql(dbName, ++opID, sql);
    },
    insert2c : function(p) {
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        console.log(JSON.stringify(p));
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;
        uexDataBaseMgr.cbExecuteSql = function(opId, type, data) {
            if(type == 2 && data == 0) {
                // console.log('数据插入成功！');
            } else {
                console.log('个人聊天数据插入失败！');
            }
        };
        var time = parseInt(p.time) * 1000;
        var c = new Date(time);
        var fmtTime = c.format("yyyy-MM-dd HH:mm:ss");

        //   var time = parseFloat(p.time);
        var sql = "INSERT INTO CHAT (onDuty, sendName, receiveName ,content, time ) VALUES ('" + p.onDuty + "','" + p.sendName + "','" + p.receiveName + "','" + p.content + "','" + fmtTime + "'" + ")";
        console.log("插入语句" + sql);

        uexDataBaseMgr.executeSql(dbName, ++opID, sql);
    },
    insert222c : function(p) {
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        console.log(JSON.stringify(p));
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;
        uexDataBaseMgr.cbExecuteSql = function(opId, type, data) {
            if(type == 2 && data == 0) {

            } else {

            }
        };
        var time = parseFloat(p.time);
        var sql = "";
        console.log("测试语句" + sql);

        uexDataBaseMgr.executeSql(dbName, ++opID, sql);
    },
    searchChat : function(p) {
        console.log(JSON.stringify(p));
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        console.log("database查询searchChat语句 ： " + p.sql)
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;

        uexDataBaseMgr.cbSelectSql = function(opId, type, data) {
            if(type == 1) {
                p.cb(data);
            } else {
                console.log('查询失败！');
            }
        };
        var sql = p.sql;
        uexDataBaseMgr.selectSql(dbName, ++opID, sql);

    },
    search : function(p) {
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        console.log(p.sql);
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;

        uexDataBaseMgr.cbSelectSql = function(opId, type, data) {
            if(type == 1) {
                var Jdata = JSON.parse(data);
                p.cb(Jdata);
            } else {
                console.log('查询失败！');
            }
        };
        var sql = p.sql || "SELECT pid, gid, uid ,sendName, content, time FROM GROUPCHAT";
        uexDataBaseMgr.selectSql(dbName, ++opID, sql);

    },
    search4Ref : function(p) {
        if(navigator.appVersion === "5.0 (Windows)" || navigator.appVersion === "5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36") {
            return;
        }
        console.log(p.sql);
        var user = hl.data.user.get();
        var dbName = user.id + "hl";
        var opID = 0;

        uexDataBaseMgr.cbSelectSql = function(opId, type, data) {
            if(type == 1) {
                var Jdata = JSON.parse(data);
                console.log(JSON.stringify(Jdata));
                hl.data.groupChat.lastMessage = JSON.parse(data);
            } else {
                console.log('查询失败！');
            }
        };
        var sql = p.sql;
        uexDataBaseMgr.selectSql(dbName, ++opID, sql);

    },
    /**
     * 删除表中数据<delete是js保留字，此处方法名改为mdelete>
     */
    mdelete : function(p) {

    }
}