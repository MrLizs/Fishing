var url = 'http://192.168.3.157:8080/game-collection-server/ws/rest';
module.exports = {
    send:function(msg,cmd){
        var xhr = new XMLHttpRequest();
        if(xhr.withCredentials){
            cc.log('当前不支持ajax');
        }
        else{
            // msg;
            xhr.open('POST' ,url ,true);
            xhr.setRequestHeader('Context-Type','application/x-www-form-urlencoded');
            // xhr.setRequestHeader(cmd,msg);
            xhr.send(cmd + '?=' + msg);
            xhr.onprogress = function(e){
                cc.log('正在处理...'+(e.laoded/e.total));
            };
            xhr.upload.onprogress = function(e){
                cc.log('正在与服务器进行交互'+(e.laoded/e.total));
            };
            xhr.onload = function(e){
                cc.log('处理完成 : '+xhr.responseText);
            };
        }
        // xhr.open("POST", url, true);
        // // xhr.setRequestHeader('Content-type',cmd);
        // xhr.send(msg);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        //         var response = xhr.responseText;
        //         console.log(response);
        //     }else{
        //         cc.log(xhr.statusText);
        //     }
        // };
    },
    close:function(){
        // xhr.close();
    },
};