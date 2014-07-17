var hl = (hl || {});
hl.data = (hl.data || {});
hl.data.database = {
    dbName : function() {
        return hl.data.user.get().id + "dbPg";
    }, // 这里直接取数据是否比get方法快呢？
    db : null,
    /**
     * 创建数据库和数据表
     */
    init : function(p) {
        // 创建 群聊历史记录数据库
        this.db = openDatabase(this.dbName(), '1.0', 'phoneGap DB', 4 * 1024 * 1024);
        // 创建数据表
        if(this.db) {
            this.db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS GROUPCHAT (_id INTEGER PRIMARY KEY,mid TEXT,gid TEXT,uid TEXT,sendName TEXT,content TEXT,time DATETIME)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS CHAT(_id INTEGER PRIMARY KEY,onDuty TEXT,sendName TEXT,receiveName TEXT,content TEXT,time DATETIME)');
                tx.executeSql('CREATE TABLE IF NOT EXISTS PUBMSG(_id INTEGER PRIMARY KEY,status TEXT,sid TEXT,title TEXT,content TEXT,time TEXT)');
            });
        }
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
        }
        uexDataBaseMgr.closeDataBase(dbName, ++opID);
    },
    pubMsgNum : function() {
        var sql = "SELECT count(*) FROM PUBMSG";
        if(this.db) {
            this.db.transaction(function(tx) {
                tx.executeSql(sql, [], function(tx, result) {
                    console.log(JSON.stringify(result));
                }, function(tx, error) {
                    console.log(tx + "_" + error);
                });
            });
        }

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
        }
        uexDataBaseMgr.executeSql(dbName, ++opID, p.sql);
    },
    insert2pm : function(p) {
        var sql = "INSERT INTO PUBMSG (status, sid, title ,content, time ) VALUES ('" + p.status + "','" + p.sid + "','" + p.title + "','" + p.content + "','" + p.time + "')";

        if(this.db) {
            this.db.transaction(function(tx) {
                tx.executeSql(sql, [], function(result) {
                    console.log(JSON.stringify(result));
                }, function(tx, error) {
                    console.log(tx + "_" + error);
                });
            });
        }
    },
    searchPubMsg : function(p) {

        if(this.db) {
            this.db.transaction(function(tx) {
                tx.executeSql(p.sql, [], function(result) {
                    hl.data.pub.history.searchList = result;
                }, function(tx, error) {
                    console.log(tx + "_" + error);
                });
            });
        }
    },
    insert2GChat : function(p) {

        var time = parseInt(p.time) * 1000;
        var c = new Date(time);
        var fmtTime = c.format("yyyy-MM-dd HH:mm:ss");
        var sql = "INSERT INTO GROUPCHAT (mid, gid, uid ,sendName, content, time ) VALUES ('" + p.mid + "','" + p.gid + "','" + p.uid + "','" + p.sendName + "','" + p.content + "','" + fmtTime + "')";
        if(this.db) {
            this.db.transaction(function(tx) {
                tx.executeSql(sql, [], function(tx, result) {
                    console.log(result);
                }, function(tx, error) {
                    console.log(tx + "_" + error);
                });
            });
        }
    },
    insert2Chat : function(p) {
        var time = parseInt(p.time) * 1000;
        var c = new Date(time);
        var fmtTime = c.format("yyyy-MM-dd HH:mm:ss");
        var sql = "INSERT INTO CHAT (onDuty, sendName, receiveName ,content, time ) VALUES ('" + p.onDuty + "','" + p.sendName + "','" + p.receiveName + "','" + p.content + "','" + fmtTime + "'" + ")";
        console.log(sql);
        if(this.db) {
            this.db.transaction(function(tx) {
                tx.executeSql(sql, [], function(tx, result) {
                    console.log(result);
                }, function(tx, error) {
                    console.log(tx + "_" + error);
                });
            });
        }
    },
    searchChat : function(p) {
        console.log(p.sql);
        if(this.db) {
            this.db.transaction(function(tx) {
                tx.executeSql(p.sql, [], function(tx, result) {
                    console.log(result);
                    p.cb(result);
                }, function(tx, error) {
                    console.log(tx + "_" + error);
                });
            });
        }

    },
    searchGChat : function(p) {
        console.log(p.sql);
        if(this.db) {
            this.db.transaction(function(tx) {
                tx.executeSql(p.sql, [], function(tx, result) {
                    console.log(result);
                    p.cb(result);
                }, function(tx, error) {
                    console.log(tx + "_" + error);
                });
            });
        }
    },
    search4gcRef : function(p) {
        if(this.db) {
            this.db.transaction(function(tx) {
                tx.executeSql(p.sql, [], function(result) {
                    p.cb(result);
                }, function(tx, error) {
                    console.log(tx + "_" + error);
                });
            });
        }
    }
}