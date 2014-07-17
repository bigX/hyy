/**
 * 对话框
 */
var hl = (hl || {});
hl.file = {
    typeList : ["xls", "xlsx", "ppt", "pptx", "txt", "doc", "docx", "mp3", "video", "pdf", "ai", "html", "ps", "zip", "rar"],
    videoList : ["3gp", "mp4", "avi", "rmvb", "flv"],
    imgList : ["png", "jpg", "gif"],

    open : function(path) {
        window.plugins.openfile.open([path]);
    },
    downLoad : function(fileUrl) {

        var fileTransfer = new FileTransfer();
        function onSuccess() {
            console.log("下载成功");
        } ;

        function onError() {
            console.log("下载失败");
        };

        var filePath = "";

        fileTransfer.download(fileUrl, filePath, onSuccsess, onError);
    },
    downloadPic : function(sourceUrl, targetUrl) {
        console.log(sourceUrl);
        var fileTransfer = new FileTransfer();
        var uri = encodeURI(sourceUrl);
        hl.tpl.info.open();

        // alert("执行下载");

        fileTransfer.download(uri, targetUrl, function(entry) {
            console.log(entry.fullPath);
            // alert(entry.fullPath);
            //  alert("下载成功");

            var path = entry.fullPath;
            var len = path.length;

            var lastThree = path.substring(len - 3, len).toLowerCase();
            ;

            var lastFour = path.substring(len - 4, len).toLowerCase();
            ;

            if(lastThree === "avi" || lastThree === "mov" || lastThree === "asf" || lastThree === "wmv" || lastThree === "navi" || lastThree === "3gp" || lastThree === "ram" || lastThree === "mkv" || lastThree === "flv" || lastThree === "mp4" || lastFour === "rmvb" || lastThree === "mpg") {
                window.plugins.videoPlayer.play(entry.fullPath);
            } else {
                window.plugins.openfile.open([entry.fullPath]);
            }

        }, function(error) {
            //  alert("下载出错");
        });

        fileTransfer.onprogress = function(progressEvent) {
            //  alert(JSON.stringify(progressEvent));
            if(progressEvent.lengthComputable) {
                //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                //  alert(JSON.stringify(progressEvent));

                var percent = parseFloat(progressEvent.loaded / progressEvent.total / 2);
                percent = Math.floor(percent * 100) / 100;
                hl.tpl.info.refresh("下载进度：" + percent * 100 + "%");
                if(progressEvent.loaded >= 2 * progressEvent.total) {
                    hl.tpl.info.close();
                }
            } else {
                alert(JSON.stringify(progressEvent));
            }
        };
    },
    createFile : function(fileName, fileUrl) {
        var _localFile = fileName;

        var _url = hl.url.api(fileUrl);

        function gotFileWriter(writer) {

        }

        function downLoadFile(fileEntry) {
            //  alert(JSON.stringify(fileEntry));

            hl.file.downloadPic(_url, fileEntry.fullPath);

        }

        function fail(evt) {
            alert(evt.target.error.code);
        }

        function writerFile(newFile) {
            // alert("创建文件夹成功");
            newFile.getFile(_localFile, null, function(entry) {
                alert("打开本地文件entry.fullPath" + entry.fullPath);
                //  window.plugins.openfile.open([entry.fullPath]);
                var path = entry.fullPath;
                var len = path.length;

                var lastThree = path.substring(len - 3, len);

                var lastFour = path.substring(len - 4, len);

                if(lastThree === "avi" || lastThree === "mov" || lastThree === "asf" || lastThree === "wmv" || lastThree === "navi" || lastThree === "3gp" || lastThree === "ram" || lastThree === "mkv" || lastThree === "flv" || lastThree === "mp4" || lastFour === "rmvb" || lastThree === "mpg") {
                    window.plugins.videoPlayer.play(entry.fullPath);
                } else {
                    window.plugins.openfile.open([entry.fullPath]);
                }
            }, function() {
                alert(JSON.stringify(newFile));
                hl.file.downloadPic(_url, newFile.fullPath + "//" + _localFile);
            });
        }

        function gotFS(fileSystem) {
            newFile = fileSystem.root.getDirectory("_newFile222", {
                create : true,
                exclusive : false
            }, writerFile, fail);
        }


        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);

    },
    openFileSelector : function(p) {
        document.addEventListener("deviceready", onDeviceReady, false);
        var pictureSource;
        //  getPicture:数据来源参数的一个常量
        var destinationType;
        // getPicture中：设置getPicture的结果类型

        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;

        if(p == 0) {
            var source = pictureSource.PHOTOLIBRARY;
        } else {
            var source = pictureSource.CAMERA;
        }

        navigator.camera.getPicture(function(p) {
            alert(JSON.stringify(p))
        }, function(p) {
            alert(JSON.stringify(p))
        }, {
            quality : 75,
            destinationType : destinationType.FILE_URI,
            sourceType : source
        });

    },
    uploadPhoto : function(fileURI) {
        var user = hl.data.user.get();

        var url = hl.url.api("upload.ashx");
        url = 'http://192.168.1.22:80/up/upload2.php?';
        if(user != null) {
            url += "userID=" + user.id;
        }
        var id = hl.data.disk.backList.last();
        if(id == -1) {
            url += "&pid=0";
        } else {
            url += "&pid=" + id.fid;
        }
        url += "&jcb=qqqqqqq";

        var options = new FileUploadOptions();
        options.fileKey = "fileName";
        options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        //   url += "&fileName=" + fileURI.substr(fileURI.lastIndexOf('/') + 1);
        console.log(fileURI + "___" + fileURI.substr(fileURI.lastIndexOf('/') + 1));

        // var params = {
        // userID : user.id,
        // pid : id.fid,
        // form : "web",
        // jcb : "upload" ,
        // };
        // alert(JSON.stringify(params));

        //  options.params = params;
        hl.tpl.info.open();

        var ft = new FileTransfer();

        ft.upload(fileURI, url, function(p) {
            console.log(JSON.stringify(p) + "OKOKOKOKOKOKOKOKOKOKOKOK");
            hl.tpl.info.close();
        }, function(p) {
            console.log(JSON.stringify(p) + "ERRORERROR");
            hl.tpl.info.close();
        }, options);

        ft.onprogress = function(progressEvent) {
            // console.log(JSON.stringify(progressEvent));
            if(progressEvent.lengthComputable) {
                //loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
                //  alert(JSON.stringify(progressEvent));

                var percent = parseFloat(progressEvent.loaded / progressEvent.total);
                percent = Math.floor(percent * 100) / 100;
                hl.tpl.info.refresh("上传进度：" + percent * 100 + "%");
            } else {
                alert(JSON.stringify(progressEvent));
            }
        };
    },
    uppp : function() {

        var options = new FileUploadOptions();

        options.fileKey = "fileAddPic";
        //用于设置参数，对应form表单里控件的name属性，这是关键，废了一天时间，完全是因为这里，这里的参数名字，和表单提交的form对应

        var imagefilename = Number(new Date()) + ".jpg";
        options.fileName = imagefilename;
        //options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);

        //如果是图片格式，就用image/jpeg，其他文件格式上官网查API

        options.mimeType = "image/jpeg";

        options.mimeType = "multipart/form-data";
        //这两个参数修改了，后台就跟普通表单页面post上传一样 enctype="multipart/form-data"

        //这里的uri根据自己的需求设定，是一个接收上传图片的地址

        var url = encodeURI("http://192.168.2.9:8080/oper-ui/fileUpload");

        //alert(imageURI);

        //alert(uri);

        options.chunkedMode = false;

        var params = new Object();

        params.fileAddPic = path;
        //path 是图片手机客户端保存路径

        options.params = params;

        var ft = new FileTransfer();

        ft.upload(path, url, function(result) {
            console.log('Upload success: ' + result.responseCode);
            console.log(result.bytesSent + ' bytes sent');
        }, function(error) {
            console.log('Error uploading file ' + path + ': ' + error.code);
        }, options);
    }
}