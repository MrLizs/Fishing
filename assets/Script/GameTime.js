var HTTP = require('HTTP');
window.insertFishUserScore = null;
window.TimeIsOver = false;
window.MinTime = 0;
window.MaxTime = 10;
window.isSendEnd = false//是否发送结算消息
window.isPrintPhone = 0;//0没弹出,1输入正确,2输入错误

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
        shadow_Node:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        window.clock_hour = this.TimeBg_Node.getChildByName('UI_clock_hour');
        window.clock_minute = this.TimeBg_Node.getChildByName('UI_clock_minute');

        clock_hour.rotation = -27;
        clock_minute.rotation = 117;

        isPrintPhone = 0;

        TimeIsOver = false;
        if(TimeIsOver === false)
        {
            isSendEnd = false;
        }

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
        if(TimeIsOver === false)
        {
            MinTime++;
            clock_minute.rotation += 360 / 60;
            if(MinTime >= MaxTime && isSendEnd == false)
            {
                cc.log('游戏结束2');
                // if(isPrintPhone == 0 && phoneNumber == ''){
                //     this.showPrintTips();
                // }
                // else if(isPrintPhone == 2){
                //     phoneNumber = '';
                // }
                // if(isPrintPhone == 1 || phoneNumber != ''){
                    // this.sendRequestSelfCB();
                    TimeIsOver = true;
                // }
            }
            else
            {
                this.TimeUiBg_Node.width -= (294 / MaxTime);
                this.TimeUiBg_Node.getChildByName('UI_time_Shadow').width -= (294 / MaxTime);
            }
        }
    },

    // showPrintTips:function(){
    //     this.shadow_Node.active = true;
    //     this.phoneTips_Node.active = true;
    // },
    updatime_hour:function(){
        if(TimeIsOver === false)
        {
            clock_hour.rotation += 360 / 12;
            if(MinTime>=MaxTime)
            {
                cc.log('计时器结束回调');
                this.unschedule(this.updatime_minute,this);
                this.unschedule(this.updatime_hour,this);
            }
        }
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
    requestMaxScore:function(maxScoreSchedule){
        clearInterval(maxScoreSchedule);
        var cb = {
            "cmd":"fish/findUserMaxScore",
            "data":{
                "phone": phoneNumber
            }
        };
        HTTP.sendobj(cb,5)
    },

});
