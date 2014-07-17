/**
 * 系统文件
 */
var hl = (hl || {});

hl.socket = {
    webSocket : {},
    connect : function() {
        try {
            var readyState = ["正在连接", "已建立连接", "正在关闭连接", "已关闭连接"];
            var host = hl.cfg.webSocketUrl;
            hl.socket.webSocket = new WebSocket(host);
            console.log(readyState[hl.socket.webSocket.readyState]);

            hl.socket.webSocket.onopen = function() {
                console.log("连接打开" + readyState[hl.socket.webSocket.readyState]);
            };
            hl.socket.webSocket.onmessage = function(data) {
                console.log("接收信息 ：" + data.data);
            };
            hl.socket.webSocket.onclose = function() {
                console.log("连接关闭" + readyState[hl.socket.webSocket.readyState]);
            };
            
        } catch(exception) {
            console.log("发生错误" + readyState[hl.socket.webSocket.readyState]);
        }
    },
    send : function() {
        var msg = "";
        try {
            hl.socket.webSocket.send(msg);
        } catch(exception) {
            console.log("数据发送错误");
        }
    },
    disconnect : function() {
        hl.socket.webSocket.close();
    }
}