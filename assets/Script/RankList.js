var HTTP = require('HTTP');
var ranklist = null;
window.RankingsCB=null;
cc.Class({
    extends: cc.Component,

    properties: {
        rankListContent_Node:{
            default:null,
            type:cc.Node,
        },
        rankContentItem_Prefab:{
            default:null,
            type:cc.Prefab,
        },
        rankingSelf_Node:{
            default:null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        var cb = {
            "cmd":"fish/queryScoreDescPage",
            "data":{
                "page" : 1,
                "phone" : phoneNumber,
                "size" : 100
            }
        };
        var cb2 = {
            "cmd":"fish/queryScoreRankingDescPage",
            "data":{
                "page" : 1,
                "phone" : phoneNumber,
                "size" : 1
            }
        };
        HTTP.send(cb,1);
        this.schedule(this.sendMessage,0.2);
        this.viewSelfRankings();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    // },

    sendMessage:function(){
        if(RankingsCB != null){
            this.unschedule(this.sendMessage,this);
            this.loadDataBase();
        }
    },

    loadDataBase:function(){
        this.rankListContent_Node.height = RankingsCB.data.length * 80;
        for (var i = 0; i < RankingsCB.data.length; i++) {
            var itme = cc.instantiate(this.rankContentItem_Prefab);
            itme.y = -(i * 80);
            this.rankListContent_Node.addChild(itme);
            itme.getChildByName('Ranking').getComponent(cc.Label).string = '' + i+1;
            itme.getChildByName('UserName').getComponent(cc.Label).string = '' + RankingsCB.data[i].userScoreId;
            itme.getChildByName('Score').getComponent(cc.Label).string = '' + RankingsCB.data[i].scoreNum;
            itme.getChildByName('GameOverTime').getComponent(cc.Label).string = '' + RankingsCB.data[i].scoreNum;
        }
    },
    viewSelfRankings:function(){
        // var num1 = HTTP.inquireUserMaxScore();
        // cc.log('用户最高分'+num1);
        // var num2 = HTTP.inquireUserRansings(100);
        // cc.log('100分的排行'+num2);

        // this.rankingSelf_Node.getChildByName('Ranking').getComponent(cc.Label).string = num2;
        this.rankingSelf_Node.getChildByName('UserName').getComponent(cc.Label).string = "自己";
        // this.rankingSelf_Node.getChildByName('Score').getComponent(cc.Label).string = num1;
        // this.rankingSelf_Node.getChildByName('GameOverTime').getComponent(cc.Label).string = this.timeDispose();
    },

    /**
     * 未使用
     */
    timeDispose:function(){
        var y =  Math.round(Math.random() * 17)
        var year;
        if(y<10)
        {
            year = '200' + y;
        }
        else
        {
            year = '20' + y;
        }
        var Month = Math.round(Math.random() * 12);
        var day = Math.round(Math.random() * 31);
        var hour = Math.round(Math.random() * 24);
        var minute = Math.round(Math.random() * 60);
        var YMDTime = year+'-'+Month+'-'+day+'    '+hour+':'+minute;
        return YMDTime;
    }
});
