var HTTP = require('HTTP');
window.TimeIsOver = false;
window.MinTime = 0;
window.MaxTime = 30;
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
        if(MinTime >= 60 && MinTime <= 90)
        {
            if(this.TimeUiBg_Node.getComponent(cc.Sprite).spriteFrame.name != 'Gameing/UI_time_red'){
                var self = this;
                cc.loader.loadRes('Gameing/UI_time_red',cc.SpriteFrame,function(err,spriteFrame){
                    self.TimeUiBg_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
        }
        else if(MinTime > 30 && MinTime < 60)
        {
            if(this.TimeUiBg_Node.getComponent(cc.Sprite).spriteFrame.name != 'Gameing/UI_time_yellow'){
                var self = this;
                cc.loader.loadRes('Gameing/UI_time_yellow',cc.SpriteFrame,function(err,spriteFrame){
                    self.TimeUiBg_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
            }
        }
    },

    updatime_minute:function(){
        MinTime++;
        clock_minute.rotation += 360 / 60;
        if(MinTime >= MaxTime)//this.TimeUiBg_Node.width <= (294 / 60)
        {
            TimeIsOver = true;
            cc.log('游戏结束2');
            this.GameClearing();
        }
        else
        {
            this.TimeUiBg_Node.width -= (294 / MaxTime);
        }
    },
    updatime_hour:function(){
        clock_hour.rotation += 360 / 12;
        if(MinTime>=MaxTime)
        {
            cc.log('计时器结束回调')
            this.unschedule(this.updatime_minute,this);
            this.unschedule(this.updatime_hour,this);
        }
    },
    /**
     * 游戏结算消息接口
     */
    GameClearing:function(){
        var cb = {
            cmd:"fish/insertFishUserScore",
            data:{
                phone : phoneNumber,
                scoreNum : this.node.parent.getChildByName('score').getComponent(cc.Label).string,
            }
        };
        cc.log(cb.data.phone);
        cc.log(cb.data.scoreNum);
        cc.log(HTTP.send(cb));
    },

});
