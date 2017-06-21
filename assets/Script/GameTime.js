var HTTP = require('HTTP');
window.TimeIsOver = false;
window.MinTime = 0;
window.MaxTime = 90;

cc.Class({
    extends: cc.Component,

    properties: {
        TimeBg_Node:{
            default:null,
            type:cc.Node,
        },
        TimeUiBg_Node:{
            default:null,
            type:cc.Node,
        },
        score_Label:{
            default:null,
            type:cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {
        window.clock_hour = this.TimeBg_Node.getChildByName('UI_clock_hour');
        window.clock_minute = this.TimeBg_Node.getChildByName('UI_clock_minute');

        clock_hour.rotation = -27;
        clock_minute.rotation = 117;

        TimeIsOver = false;

        var self = this;
        cc.loader.loadRes('Gameing/UI_time_blue',cc.SpriteFrame,function(err,spriteFrame){
            self.TimeUiBg_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        this.TimeUiBg_Node.width = 294;

        this.schedule(this.updatime_minute,1);
        this.schedule(this.updatime_hour,60);
        MinTime = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(MinTime >= MaxTime*0.667 && MinTime <= MaxTime)
        {
            if(this.TimeUiBg_Node.getComponent(cc.Sprite).spriteFrame.name != 'Gameing/UI_time_red'){
                var self = this;
                cc.loader.loadRes('Gameing/UI_time_red',cc.SpriteFrame,function(err,spriteFrame){
                    self.TimeUiBg_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
            if(this.TimeUiBg_Node.getChildByName('UI_time_Shadow').getComponent(cc.Sprite).spriteFrame.name != 'Gameing/UI_time_red_2'){
                var self = this;
                cc.loader.loadRes('Gameing/UI_time_red_2',cc.SpriteFrame,function(err,spriteFrame){
                    self.TimeUiBg_Node.getChildByName('UI_time_Shadow').getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
        }
        else if(MinTime > MaxTime*0.334 && MinTime < MaxTime*0.667)
        {
            if(this.TimeUiBg_Node.getComponent(cc.Sprite).spriteFrame.name != 'Gameing/UI_time_yellow'){
                var self = this;
                cc.loader.loadRes('Gameing/UI_time_yellow',cc.SpriteFrame,function(err,spriteFrame){
                    self.TimeUiBg_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
            if(this.TimeUiBg_Node.getChildByName('UI_time_Shadow').getComponent(cc.Sprite).spriteFrame.name != 'Gameing/UI_time_yellow_2'){
                var self = this;
                cc.loader.loadRes('Gameing/UI_time_yellow_2',cc.SpriteFrame,function(err,spriteFrame){
                    self.TimeUiBg_Node.getChildByName('UI_time_Shadow').getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
        }
    },

    updatime_minute:function(){
        MinTime++;
        clock_minute.rotation += 360 / 60;
        if(MinTime >= MaxTime)//this.TimeUiBg_Node.width <= (294 / 60)
        {
            cc.log('游戏结束2');
            this.GameClearing();
            this.sendRequestSelfCB();
            this.requestMaxScore();
            // this.schedule(this.showSelfRankings,0.1);
            // this.schedule(this.responesMaxScore,0.1);
            TimeIsOver = true;
        }
        else
        {
            this.TimeUiBg_Node.width -= (294 / MaxTime);
            this.TimeUiBg_Node.getChildByName('UI_time_Shadow').width -= (294 / MaxTime);
        }
    },
    updatime_hour:function(){
        clock_hour.rotation += 360 / 12;
        if(MinTime>=MaxTime)
        {
            cc.log('计时器结束回调');
            this.unschedule(this.updatime_minute,this);
            this.unschedule(this.updatime_hour,this);
        }
    },
    /**
     * 游戏结算消息接口
     */
    GameClearing:function(){
        var scorenum = this.score_Label.string;
        var cb = {
            "cmd":"fish/insertFishUserScore",
            "data":{
                "phone" : phoneNumber,
                "scoreNum" : scorenum
            }
        };
        HTTP.sendobj(cb,2);
    },

    sendRequestSelfCB:function(){
        var score = this.score_Label.string;
        cc.log('现在分数:'+score);
        var cb = {
            "cmd":"fish/queryBigThenThisScoreNum",
            "data":{
                "scoreNum": score
            }
        };
        HTTP.sendobj(cb,4);
    },
    // showSelfRankings:function(){
    //     console.log("showSelfRankings");
    //     //cc.log('showSelfRankings: ' + ScoreSelectRankings);
    //     if(ScoreSelectRankings != null){
    //         this.unschedule(this.showSelfRankings,this);
    //         cc.log("这个分数排行:" + ScoreSelectRankings);
    //         this.ranking_Label.string = '' + ScoreSelectRankings;
    //     }
    // },
    requestMaxScore:function(){
        var cb = {
            "cmd":"fish/findUserMaxScore",
            "data":{
                "phone": phoneNumber
            }
        };
        HTTP.sendobj(cb,5)
    },
    // responesMaxScore:function(){
    //     cc.log('UserMaxScore: ' + UserMaxScore)
    //     if(UserMaxScore != null)
    //     {
    //         this.unschedule(this.responesMaxScore,this);
    //         this.MaxScore_Label.string = ''+ UserMaxScore;
    //     }
    // },
});
