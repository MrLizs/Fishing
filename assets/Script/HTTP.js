var url = 'http://192.168.3.157:8080/game-collection-server/ws/rest';
// var url = 'http://118.190.87.31:8080/game-collection-server/ws/rest';

module.exports = {
    sendobj:function(msg,type){
        var xhr = new XMLHttpRequest();
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
            xhr.open('POST',url,true);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            xhr.setRequestHeader("token",md52);
            var strValue="paramString="+param;
            cc.log("发送:"+strValue);
            xhr.send(strValue);
            xhr.onprogress = function(e){
                cc.log('正在处理...');
            };
            xhr.upload.onprogress = function(e){
                cc.log('正在与服务器进行交互');
            };
            xhr.onload = function(e){
                cc.log('处理完成');
                var response = JSON.parse(xhr.response);
                if(type === 1){
                    RankingsCB = null;
                    RankingsCB = response;
                    cc.log("RankingsCB:"+RankingsCB);
                }
                if(type === 2){
                    SelfRankings = null;
                    SelfRankings = response;
                    cc.log("SelfRankings:"+SelfRankings);
                }
                if(type === 3){
                    insertFishUserScore = null;
                    insertFishUserScore = response;
                    cc.log("insertFishUserScore:"+insertFishUserScore);
                }
                if(type === 4){
                    ScoreSelectRankings = null;
                    ScoreSelectRankings = response;
                    cc.log("ScoreSelectRankings:"+ScoreSelectRankings);
                }
                if(type === 5){
                    UserMaxScore = null;
                    UserMaxScore = response.data;
                    cc.log("UserMaxScore:"+UserMaxScore);
                }

            };
        }
    }
    /**
     * 查询自己最大分值
     */
    // inquireUserMaxScore:function(){
    //     var cb = {
    //         "cmd":"fish/findUserMaxScore",
    //         "data":{
    //             "phone" : phoneNumber,
    //         }
    //     };
    //     return this.send(cb);
    // },
    /**
     * 通过分值查询排行
     */
    // inquireUserRansings:function(score){
    //     var cb = {
    //         "cmd":"fish/queryBigThenThisScoreNum",
    //         "data":{
    //             "scoreNum" : score,
    //         }
    //     };
    //     return this.send(cb)
    // },
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

// send:function(cmd,data,type){
//     var msg = "{"+cmd+","+data+"}";
//     var xhr = new XMLHttpRequest();
//     // var param=JSON.stringify(msg);
//     var param = msg;

//     //#md5
//     var md5_keyone="242c630c7c9e4deeb98e744d1e1cd940";
//     var md5_keytwo="b7694d10cf4b48088be14fe436f87200";
//     // var dataString = JSON.stringify(data);

//     var num1=md5_keyone+data;
//     var md51=md5(num1);
//     var value2=md51+md5_keytwo;
//     //head
//     var md52=md5(value2);

//     if(xhr.withCredentials){
//         cc.log('当前不支持ajax');
//     }
//     else{
//         xhr.open('POST',url);            
//         xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
//         xhr.setRequestHeader("token",md52);
//         var strValue="paramString="+param;
//         cc.log("发送:"+strValue);
//         xhr.send(strValue);
//         xhr.onprogress = function(e){
//             cc.log('正在处理...');
//         };
//         xhr.upload.onprogress = function(e){
//             cc.log('正在与服务器进行交互');
//         };
//         xhr.onload = function(e){
//             cc.log('处理完成');
//             var response = JSON.parse(xhr.response);
//             switch (type) {
//                 case 1:
//                     RankingsCB = null;
//                     RankingsCB = response;
//                     cc.log("RankingsCB:"+RankingsCB);
//                     break;
//                 case 2:
//                     SelfRankings = null;
//                     SelfRankings = response;
//                     cc.log("SelfRankings:"+SelfRankings);
//                     break;
//                 case 4:
//                     ScoreSelectRankings = null;
//                     ScoreSelectRankings = response;
//                     cc.log("ScoreSelectRankings:"+ScoreSelectRankings);
//                     break;
//                 case 5:
//                     UserMaxScore = null;
//                     UserMaxScore = response;
//                     cc.log("UserMaxScore:"+UserMaxScore);
//                     break;
//                 default:
//                     cc.log(xhr.response)
//                     break;
//             }
//         };
//     }
// },