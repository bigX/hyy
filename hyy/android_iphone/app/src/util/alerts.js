/**
 * 对话框
 */
var hyy = (hyy || {});
hyy.alerts = {
    notificationAppCan : function(title, content) {
        return;
        if(navigator.appVersion.indexOf("Windows") >= 0) {
            return console.log("statusBarNotification : " + title + "_" + content);
        }
        uexWindow.statusBarNotification(title, content);
    }
}