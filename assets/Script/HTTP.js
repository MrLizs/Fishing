var url = 'http://192.168.3.157:8080/game-collection-server/ws/rest';


module.exports = {
    send1:function(msg,cmd){
        var xhr = new XMLHttpRequest();
        var formdata = new FormData();

        formdata.append('cmd',cmd);
        formdata.append('data',msg);

        //#md5第一次拼接的字符串，拼接到字符串前面
        var md5_keyone=md5('242c630c7c9e4deeb98e744d1e1cd940' + formdata.get('cmd') + formdata.get('data'));
        //#md5第一次拼接的字符串，拼接到字符串后面
        var md5_keytwo= md5(md5_keyone + 'b7694d10cf4b48088be14fe436f87200');


        if(xhr.withCredentials){
            cc.log('当前不支持ajax');
        }
        else{
            // msg;
            // xhr.setRequestHeader('Context-Type','application/x-www-form-urlencoded');
            xhr.open('POST',url,true);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            // xhr.setRequestHeader("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
            xhr.send(md5_keytwo);
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