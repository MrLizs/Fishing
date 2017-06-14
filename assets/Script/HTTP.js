var url = 'http://192.168.3.157:8080/game-collection-server/ws/rest';

module.exports = {
    send:function(msg){
        var xhr = new XMLHttpRequest();
        console.log(msg);
        var param=JSON.stringify(msg);

        //#md5
        var md5_keyone="242c630c7c9e4deeb98e744d1e1cd940";
        var md5_keytwo="b7694d10cf4b48088be14fe436f87200";
        var dataString = JSON.stringify(msg.data);
        var num1=md5_keyone+dataString;
        var md51=md5(num1);
        var value2=md51+md5_keytwo;
	    //head
	    var md52=md5(value2);

        if(xhr.withCredentials){
            cc.log('当前不支持ajax');
        }
        else{
            console.log('ajax');

            xhr.open('POST',url,true);
            
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

            xhr.setRequestHeader("token",md52);

            var strValue="paramString="+param;
            xhr.send(strValue);
            xhr.onprogress = function(e){
                cc.log('正在处理...'+(e.laoded/e.total));
            };
            xhr.upload.onprogress = function(e){
                cc.log('正在与服务器进行交互'+(e.laoded/e.total));
            };
            xhr.onload = function(e){
                cc.log('处理完成 : '+xhr.responseText);
                var response = new Function(xhr.responseText);
                return response;
            };
        }
    },
    close:function(){/*xhr.close();*/},
};
// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
// xhr.setRequestHeader("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");

// $.ajax({
//     url:url,
//     data:param,
//     type:'POST',
//     headers:{
//         'Content-Type':'application/x-www-form-urlencoded',
//         token:'949687b220f99fbfe493d64a07c8f5ff'},
//     success:function(data){
//         console.log('请求成功:' + data);
//     },
// });
// $.post(url,param,function(data,status){
//     console.log('data:' + data + 'status:' + status);
// });
// msg;