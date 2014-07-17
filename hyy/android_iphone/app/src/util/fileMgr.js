/**
 * 文件上传，文件下载
 */
var hl = (hl || {});
hl.fileMgr = {
    saveBasePath : "wgt://data/down/",
    downPath : 0,
    saveName : 0,
    //  openFile : uexWidget.loadApp, // 文件下载后的打开方法
    openFileP : 0,
    opId : 111,
    inOpCode : 100,
    /**
     * 图片选取，返回路径存到hl.data.disk.imgBrowserPath
     */
    openImgBrowser : function(p) {
        uexImageBrowser.cbPick = function(opCode, dataType, data) {
            console.log('attachmentPath: ' + data);
            hl.data.disk.imgBrowserPath = data;

            hl.fileMgr.upLoad();
        }
        uexImageBrowser.pick();
    },
    openCamera : function(p) {

        uexCamera.cbOpen = function(opCode, dataType, data) {
            hl.data.disk.imgBrowserPath = data;

            hl.fileMgr.upLoad();
        }
        uexCamera.open();

    },
    /**
     * {
     *
     * }
     */
    upLoad : function(p) {
        var user = hl.data.user.get();

        var url = hl.url.api("upload.ashx?from=web");
        if(user != null) {
            url += "&userID=" + user.id;
        }
        var id = hl.data.disk.backList.last();
        if(id == -1) {
            url += "&pid=0";
        } else {
            url += "&pid=" + id.fid;
        }

        uexUploaderMgr.cbCreateUploader = hl.fileMgr.cbCreateUploader;
        uexUploaderMgr.onStatus = hl.fileMgr.onStatus;

        uexUploaderMgr.createUploader(111, url);
    },
    //创建上传对象回调
    cbCreateUploader : function(opId, dataType, data) {
        uexLog.sendLog("cbCreateUploader" + "," + opId + "," + dataType + "," + data);
        //alert("cbCreateUploader" + "," + opId + "," + dataType + "," + data) ;
        if(dataType == 2 && data == 0) {
            //上传文件到服务器
            hl.tpl.info.open();

            uexUploaderMgr.uploadFile(opId, hl.data.disk.imgBrowserPath, 'fileName', '1');
        }
    },
    //上传文件回调函数
    onStatus : function(opId, fileSize, percent, serverPath, status) {
        uexLog.sendLog("onStatus" + "," + opId + "," + fileSize + "," + percent + "," + serverPath + "," + status);
        //	alert("onStatus" + "," + opId + "," + fileSize + "," + percent + "," + serverPath + "," + status) ;
        switch (status) {
            case 0:
                hl.tpl.info.refresh("上传进度：" + percent + "%");
                // document.getElementById('percent').value = percent ;
                // alert("上传进度：" + percent);
                break;
            case 1:
                hl.tpl.info.refresh("上传成功!");
                hl.tpl.info.close();
                //  alert("上传成功，服务器路径为" + serverPath);

                // TODO 页面刷新

                hl.biz.diskAll.refresh();

                uexUploaderMgr.closeUploader(opId);
                break;
            case 2:
                hl.tpl.info.refresh("上传失败!");
                hl.tpl.info.close();
                //    alert("上传失败!");
                uexUploaderMgr.closeUploader(opId);
                break;
            default:
                break;
        }
    },
    downLoad : function(p) {
        hl.fileMgr.downPath = p.path;
        hl.fileMgr.saveName = p.name;

        uexDownloaderMgr.createDownloader(hl.fileMgr.inOpCode);
        hl.tpl.info.open();

        /**
         * 下载状态监听方法
         * @param {Object} opCode
         * @param {Object} fileSize
         * @param {Object} percent
         * @param {Object} status
         */
        uexDownloaderMgr.onStatus = function(opCode, fileSize, percent, status) {
            switch (status) {
                case 0:
                    //下载过程中
                    hl.tpl.info.refresh("下载进度：" + percent + "%");
                    hl.sys.log("onStatus：" + percent + "%");
                    break;
                case 1:
                    //下载完成
                    hl.tpl.info.refresh("下载成功,保存至" + hl.fileMgr.saveBasePath + hl.fileMgr.saveName);
                    hl.sys.log('onStatusOK');
                    hl.tpl.info.close();
                    hl.fileMgr.openFile(hl.fileMgr.openFileP);
                    uexDownloaderMgr.closeDownloader(opCode);
                    //下载完成要关闭下载对象
                    break;
                case 2:
                    //下载失败
                    hl.sys.log('下载失败');
                    hl.tpl.info.refresh("下载失败!");
                    hl.tpl.info.close();
                    uexDownloaderMgr.closeDownloader(opCode);
                    //下载失败要关闭下载对象
                    break;
            }
        }
        var cText = 0;
        var cJson = 1;
        var cInt = 2;
        /**
         * 创建下载对象的回调方法
         * @param {Object} opCode
         * @param {Object} dataType
         * @param {Object} data 0为成功；1为失败
         */
        uexDownloaderMgr.cbCreateDownloader = function(opCode, dataType, data) {
            if(dataType == 2 && data == 0) {
                hl.sys.log('cbCreateDownloaderOK');
                hl.fileMgr.startDownload();
            } else {
                hl.sys.log('cbCreateDownloaderNO');
            }
        }
        uexWidgetOne.cbError = function(opCode, errorCode, errorInfo) {
            hl.sys.log(errorInfo);
        }
        /**
         * 通过下载url获取下载对象的信息的回调方法
         * @param {Object} opCode
         * @param {Object} dataType
         * @param {Object} data
         */
        uexDownloaderMgr.cbGetInfo = function(opCode, dataType, data) {
            if(dataType == 1) {
                if(!isDefine(data)) {
                    console.log('无数据');
                    return;
                }
                console.log(data);
                var info = eval('(' + data + ')');
                //   $$('fileInfo').innerHTML = '文件路径：' + info.savePath + '<br>文件大小：' + info.fileSize + '<br>已下载：' + info.currentSize + '<br>下载时间：' + info.lastTime;
            }
        }
    },
    /**
     * 执行下载
     * download(String inOpCode, String inDLUrl, String inSavePath,String inMode)
     * @param {string} inOpCode 操作id
     * @param {string} inDLUrl 下载地址
     * @param {string} inSavePath 保存的地址
     * @param {string} inMode 下载模式 0不支持断点下载； 1支持断点下载
     */
    startDownload : function(p) {
        uexDownloaderMgr.download(hl.fileMgr.inOpCode, hl.url.api(hl.fileMgr.downPath), hl.fileMgr.saveBasePath + hl.fileMgr.saveName, '1');
    },
    /**
     * 通过操作ID关闭下载对象
     */
    closeDownload : function(p) {
        uexDownloaderMgr.closeDownloader(hl.fileMgrinOpCode);
    },
    /**
     * 通过路径获取下载的文件信息
     */
    getInfo : function(p) {
        //uexDownloaderMgr.getInfo($$('downloadPath').value);
    },
    /**
     * 通过路径清除未完成下载的任务
     * clearTask(String inDLUrl,String inClearMode)
     * @param {string} inDLUrl
     * @param {string} inClearMode 清除模式。0代表只清除此次下载任务，并不清除已经下载的目标临时文件。
     * 1代表清除此次下载任务，并且清除已经下载的目标临时文件。
     * 当目标文件已经成功下载到本地后，此操作不能不能清除此目标文件。默认为0。
     */
    clearInfo : function(p) {
        //  uexDownloaderMgr.clearTask($$('downloadPath').value);
    },
    /**
     *  网盘打开图片
     * 	p :{url : null, }
     */
    viewImg : function(p) {
        var index = 0;
        var type = 1;
        uexImageBrowser.open(p.url, index, type);
    },
    /**
     *  网盘打开音频
     * 	p :{url : null, }
     */
    openAudio : function(p) {
        console.log(p);
        var a = "android.intent.action.VIEW";
        var b = "audio/*";
        uexWidget.loadApp(a, b, p.url);
    },
    /**
     *  网盘打开音频
     * 	p :{url : null, }
     */
    openVideo : function(p) {
        console.log(p);
        var a = "android.intent.action.VIEW";
        var b = "video/*";
        uexWidget.loadApp(a, b, p.url);
    },
    /**
     *  网盘打开音频
     * 	p :{url : null, name :null}
     */
    openFile : function(p) {
        hl.sys.log(JSON.stringify(p));
        if(p != 0) {
           // uexWidget.loadApp(p.a, p.b, p.c);
        }
    },
    /**
     * 得到文件后缀名
     * name
     */
    getFileSuffix : function(name) {
        var array = name.split(".");
        return array[array.length - 1].toLowerCase();
    }
}