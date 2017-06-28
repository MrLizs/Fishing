var HTTP = require('HTTP');
var ranklist = null;
window.RankingsCB=null;
window.SelfRankings=null;

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
        shadow_Node:{
            default:null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
    },

    requestRanklist:function(){
        this.shadow_Node.active = true;
        this.node.active = true;
        this.selectRankings();
    },
    selectRankings:function(){
        var cb = {
            "cmd":"fish/queryScoreRankingDescPage",
            "data":{
                "page" : 1,
                "phone" : phoneNumber,
                "size" : 100
            }
        };
        HTTP.sendobj(cb,1);
        //this.schedule(this.showRankingsBg,0.5);
        var self = this;
        var timeSchedule = setInterval(function(){
            self.showRankingsBg(timeSchedule);
        },200);
    },
    showRankingsBg:function(timeSchedule){
        cc.log("自己的排行:"+RankingsCB);
        if(RankingsCB){
            clearInterval(timeSchedule);
            this.loadDataBase();
            // this.sendRequestSelfCB();
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
    // },

    loadDataBase:function(){
        if(RankingsCB.data)
        {
            var cb = RankingsCB.data.scoreDescPage.records;
            this.rankListContent_Node.height = cb.length * 80;
            for (var i = 0; i < cb.length; i++) {
                var itme = cc.instantiate(this.rankContentItem_Prefab);
                itme.y = -(i * 80);
                this.rankListContent_Node.addChild(itme);
                itme.getChildByName('Ranking').getComponent(cc.Label).string = '' +(i+1);
                
                var phoneStr = '' +cb[i].phone.slice(0,3);
                phoneStr += '****' + cb[i].phone.slice(7);
                cc.log('隐藏手机号' + phoneStr);
                itme.getChildByName('UserName').getComponent(cc.Label).string = '' + phoneStr;
                itme.getChildByName('Score').getComponent(cc.Label).string = '' + cb[i].scoreNum;
                itme.getChildByName('GameOverTime').getComponent(cc.Label).string = '' + cb[i].createTime;
            }
            if(RankingsCB.data.maxRanking!=null)
            {
                if(RankingsCB.data.maxRanking.maxRanking > 1000){
                    this.rankingSelf_Node.getChildByName('Ranking').getComponent(cc.Label).string = "千名之外";
                }
                else{
                    this.rankingSelf_Node.getChildByName('Ranking').getComponent(cc.Label).string = RankingsCB.data.maxRanking.maxRanking;
                }
                this.rankingSelf_Node.getChildByName('UserName').getComponent(cc.Label).string = RankingsCB.data.maxRanking.phone;
                this.rankingSelf_Node.getChildByName('Score').getComponent(cc.Label).string = RankingsCB.data.maxRanking.scoreNum;
                this.rankingSelf_Node.getChildByName('GameOverTime').getComponent(cc.Label).string = RankingsCB.data.maxRanking.createTime;
            }
        }
    },

});
