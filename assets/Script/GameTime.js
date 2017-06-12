window.TimeIsOver = false;
var MinTime = 0;
var MaxTime = 300;
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

        this.TimeUiBg_Node.width = 294;

        this.schedule(this.updatime_minute,1);
        this.schedule(this.updatime_hour,60);
        MinTime = 0;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(clock_hour.rotation === (27 + 360*3))
        {
            TimeIsOver = true;
            cc.log('游戏结束1');
        }
    },

    updatime_minute:function(){
        MinTime++;
        clock_minute.rotation += 360/60;
        if(this.TimeUiBg_Node.width <= (294/60))
        {
            TimeIsOver = true;
            cc.log('游戏结束2');
        }
        else
        {
            this.TimeUiBg_Node.width -= (294/60);
        }
    },
    updatime_hour:function(){
        clock_hour.rotation += 360/12;
        if(MinTime>=MaxTime)
        {
            cc.log('计时器结束回调')
            this.unschedule(this.updatime_minute,this);
            this.unschedule(this.updatime_hour,this);
        }
    },

});
