var boatMoveSpeed = 0.15;
var fishesRodsStringLength = 750;
var offStringSpeeds = 40;
var onStringSpeeds = 60;
var boatVec = null;
var firstPushSite=null;
var firstFloor_fishes;
var SecondFloor_fishes;
var thirdlyFloor_fishes;
var walkSpeed = 2.5;
var piggy = null;
var fishingRods = null;
var piggyFeet = null;

window.UserMaxScore = null;
window.ScoreSelectRankings = null;

/**
 * 0可以收线放线
 * 1放线时,可收线
 * 2收线时,不可放线
 */
var fishLineStatus = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        touchLayout:{
            default:null,
            type:cc.Node,
        },
        boat_Node:{
          default:null,
          type:cc.Node,
        },
        fishline_Node:{
            default:null,
            type:cc.Node,
        },
        barb_Node:{
            default:null,
            type:cc.Node,
        },
        pauseBtn_Node:{
            default:null,
            type:cc.Node,
        },
        GameSettlementLayout_Node:{
            default:null,
            type:cc.Node,
        },
        angling:false,
        shadow_Node:{
            default:null,
            type:cc.Node,
        },
    },
    
    // use this for initialization
    onLoad: function () {
        //this.touchLayout.on(cc.Node.EventType.TOUCH_MOVE,this.boatTouchControl,this);
        var self = this;
        this.touchLayout.on(cc.Node.EventType.TOUCH_START,this.Angling,this);
        this.touchLayout.on(cc.Node.EventType.TOUCH_END,this.ChangeStatus,this);
        this.touchLayout.on(cc.Node.EventType.TOUCH_MOVE,this.boatTouchControl,this);
        this.touchLayout.on("touchmove",function(event){
            if(self.fishline_Node.rotation > -90 && self.fishline_Node.rotation < 90)
            self.fishline_Node.rotation += (event.getDelta().x/24);
        },this);
        
        this.pauseBtn_Node.on(cc.Node.EventType.TOUCH_START,this.pauseStart,this);
        this.pauseBtn_Node.on(cc.Node.EventType.TOUCH_END,this.pauseEnd,this);
        if(cc.director.isPaused())
        {
            //这里须暂停.
            cc.director.resume();
        }
        piggy = this.node.getChildByName('piggy');
        fishingRods = this.node.getChildByName('fishingRods');
        piggyFeet = this.node.getChildByName('piggyFeet');

        UserMaxScore = null;
        ScoreSelectRankings = null;
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(this.angling == true)
        {
            this.DownFishhook();
        }
        else if(this.angling == false)
        {
            this.UpFishhook();
        }
        if(this.fishline_Node.rotation >0){
            this.fishline_Node.rotation -=dt*30;
            if(this.fishline_Node.rotation <0){
                this.fishline_Node.rotation = 0;
            }
        }
        else if(this.fishline_Node.rotation <0){
            this.fishline_Node.rotation +=dt*30;
            if(this.fishline_Node.rotation >0){
                this.fishline_Node.rotation  =0;
            }
        }
        if(TimeIsOver === true)
        {
            if(UserMaxScore && ScoreSelectRankings)
            this.GameSettlementLayoutOpen();
            
        }
        //cc.fishesManager.updatefish(theFishes);
    },

    GameSettlementLayoutOpen:function(){
        this.shadow_Node.active = true;
        this.GameSettlementLayout_Node.active = true;
        theFishes.forEach(function(element) {
            if(element.node) element.node.destroy();
        }, this);
        theFishes = {};
        //这里须暂停.
        cc.director.pause();
    },

    //返回主场景
    returnMainScene:function(){
        var AreYouloadscene = cc.director.loadScene('Fishing');
        cc.log('返回场景?'+AreYouloadscene);
    },

    pauseStart:function(){
        var self = this;
        cc.loader.loadRes('Gameing/UI_pause_click',cc.SpriteFrame,function(err,spriteFrame){
            self.pauseBtn_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    pauseEnd:function(){
        var self = this;
        cc.loader.loadRes('Gameing/UI_pause',cc.SpriteFrame,function(err,spriteFrame){
            self.pauseBtn_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        if(cc.director.isPaused())
        {
            //这里须恢复.
            cc.director.resume();
        }
        else
        {
            //这里须暂停.
            cc.director.pause();
        }
    },
    
    boatTouchControl:function(event){
        if(!cc.director.isPaused())
        {
            var touchVec = event.getDelta();
            boatVec = touchVec;
            this.leftMove(touchVec);
            if(touchVec.x > 2 || touchVec.x < -2)
            {
                this.angling = false;
            }
        }
    },
    
    leftMove:function(touchVec){
        if(this.boat_Node.x > 200||this.boat_Node.x < 1700)
        {
            this.boat_Node.x += touchVec.x;
            piggy.x += touchVec.x;
            fishingRods.x += touchVec.x;
            piggyFeet.x += touchVec.x;
            
        }
    },
    // rightMove:function(touchVec){
    //     if(this.boat_Node.x < 1700)
    //     {
    //         this.boat_Node.x += 50 * boatMoveSpeed;
    //         piggy.x += 50 * boatMoveSpeed;
    //         fishingRods.x += 50 * boatMoveSpeed;
    //         piggyFeet.x += 50 * boatMoveSpeed;
    //     }
    // },
    //钓鱼
    Angling:function(){
        if(fishLineStatus != 2)
        {
            this.angling = true;
        }
    },
    ChangeStatus:function(){
        this.angling = false;
    },
    //上钩 
    UpFishhook:function(){
        if(this.fishline_Node.height > 200)
        {
            this.fishline_Node.height -= onStringSpeeds * boatMoveSpeed;
            this.barb_Node.y = -this.fishline_Node.height;
            fishLineStatus = 2;
        }
        else if(this.fishline_Node.height <= 200){
            fishLineStatus = 0;
        }
    },
    //下钩
    DownFishhook:function(){
        if(this.fishline_Node.height >= fishesRodsStringLength){
            fishLineStatus = 2;
            this.angling = false;
        }
        else if(this.fishline_Node.height < fishesRodsStringLength  && fishLineStatus != 2){
            fishLineStatus = 1;
            this.fishline_Node.height += offStringSpeeds * boatMoveSpeed;
            this.barb_Node.y = -this.fishline_Node.height;
        }
    },

    randFishScript:function(){
        
    },

});
