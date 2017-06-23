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
        var self = this;
        // cc.loader.loadRes('Login/UI_home_ranking',cc.SpriteFrame,function(err,spriteFrame){
        //     self.RankList_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
        this.shadow_Node.active = true;
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
        this.schedule(this.showRankingsBg,0.2);
    },
    showRankingsBg:function(){
        cc.log(RankingsCB);
        if(RankingsCB){
            this.unschedule(this.showRankingsBg,this);
            this.node.active = true;
            this.sendMessage();
            this.viewSelfRankings();
        }
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
        if(RankingsCB.data != null)
        {
            this.rankListContent_Node.height = RankingsCB.data.length * 80;
            for (var i = 0; i < RankingsCB.data.length; i++) {
                var itme = cc.instantiate(this.rankContentItem_Prefab);
                itme.y = -(i * 80);
                this.rankListContent_Node.addChild(itme);
                itme.getChildByName('Ranking').getComponent(cc.Label).string = '' +(i+1);
                itme.getChildByName('UserName').getComponent(cc.Label).string = '' + RankingsCB.data[i].userScoreId;
                itme.getChildByName('Score').getComponent(cc.Label).string = '' + RankingsCB.data[i].scoreNum;
                itme.getChildByName('GameOverTime').getComponent(cc.Label).string = '' + RankingsCB.data[i].createTime;
            }
        }
    },
    viewSelfRankings:function(){
        this.sendRequestSelfCB();
        this.schedule(this.getSelfCB,0.1);
    },
    sendRequestSelfCB:function(){
        var cb = {
            "cmd":"fish/queryScoreDescPage",
            "data":{
                "page" : 1,
                "phone" : phoneNumber,
                "size" : 1
            }
        };
        HTTP.sendobj(cb,2);
    },
    showSelfMaxScore:function(){
        var userMaxScore = {
            "cmd":"fish/findUserMaxScore",
            "data":{
                "phone":phoneNumber
            }
        }
        HTTP.sendobj(userMaxScore,5);
    },
    getSelfCB:function(){
        if(SelfRankings !=null)
        {
            this.unschedule(this.getSelfCB,this);
            cc.log(SelfRankings);
            var phoneStr = '' +SelfRankings.data.maxRanking.phone.slice(0,3);
            phoneStr += '****' + SelfRankings.data.maxRanking.phone.slice(7);
            cc.log('隐藏手机号' + phoneStr);

            if(SelfRankings.data.maxRanking.maxRanking > 1000){
                this.rankingSelf_Node.getChildByName('Ranking').getComponent(cc.Label).string = "千名之外";
            }
            else{
                this.rankingSelf_Node.getChildByName('Ranking').getComponent(cc.Label).string = SelfRankings.data.maxRanking.maxRanking;
            }
            this.rankingSelf_Node.getChildByName('UserName').getComponent(cc.Label).string = phoneStr;
            this.rankingSelf_Node.getChildByName('Score').getComponent(cc.Label).string = SelfRankings.data.maxRanking.scoreNum;
            this.rankingSelf_Node.getChildByName('GameOverTime').getComponent(cc.Label).string = SelfRankings.data.maxRanking.createTime;
        }
        this.showSelfMaxScore();
        this.schedule(this.getSelfCB2,0.1);
    },
    getSelfCB2:function(){
        if(UserMaxScore != null)
        {
            this.unschedule(this.getSelfCB,this);
            this.rankingSelf_Node.getChildByName('Score').getComponent(cc.Label).string = '' + UserMaxScore;
        }
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
