var url = 'http://192.168.3.157:8080/game-collection-server/ws/rest';
module.exports = {
    send1:function(msg,cmd){
        var xhr = new XMLHttpRequest();
        var formdata = new FormData();
        formdata.append('cmd',cmd);
        formdata.append('data',msg);

        //var mdformdata = md5(formdata);
        
        if(xhr.withCredentials){
            cc.log('当前不支持ajax');
        }
        else{
            // msg;
            // xhr.setRequestHeader('Context-Type','application/x-www-form-urlencoded');
            // xhr.setRequestHeader(cmd,msg);
            xhr.open('POST',url,true);
            xhr.send(formdata);
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
    },
    close:function(){
        // xhr.close();
    },
};