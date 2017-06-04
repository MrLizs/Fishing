var boatMoveSpeed = 0.15;
var boatVec = null;
var firstPushSite=null;
var firstFloor_fishes;
var SecondFloor_fishes;
var thirdlyFloor_fishes;
var walkSpeed = 2.5;

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
        FirstFloor_Node:{
            default:null,
            type:cc.Node,
        },
        SecondFloor_Node:{
            default:null,
            type:cc.Node,
        },
        ThirdlyFloor_Node:{
            default:null,
            type:cc.Node,
        },
        angling:false,
    },

    // use this for initialization
    onLoad: function () {
        this.touchLayout.on(cc.Node.EventType.TOUCH_MOVE,this.boatTouchControl,this);
        this.touchLayout.on(cc.Node.EventType.TOUCH_START,this.Angling,this);
        this.touchLayout.on(cc.Node.EventType.TOUCH_END,this.ChangeStatus,this);

        //var scm = require('ScriptCollisionsManager');
        //cc.fishesManager = new scm();

        //刷鱼层初始化
        //cc.fishesManager.initFloor(this.FirstFloor_Node,this.SecondFloor_Node,this.ThirdlyFloor_Node);

        //鱼群属性初始化
        //cc.fishesManager.initFishes(theFishes);
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
        //cc.fishesManager.updatefish(theFishes);
    },

    //返回主场景
    returnMainScene:function(){
        cc.log('返回场景?');
        cc.director.loadScene('Fishing');
    },

    boatTouchControl:function(event){
        var touchVec = event.getDelta();
        boatVec = touchVec;
        if(touchVec.x > 0)
        {
            this.rightMove();
        }
        if(touchVec.x < 0)
        {
            this.leftMove();
        }
        if(touchVec.x > 2 || touchVec.x < -2)
        {
            this.angling = false;
        }
    },
    
    leftMove:function(){
        if(this.boat_Node.x > 200)
        {
            this.boat_Node.x -= 50 * boatMoveSpeed;
        }
    },
    rightMove:function(){
        if(this.boat_Node.x < 1700)
        {
            this.boat_Node.x += 50 * boatMoveSpeed;
        }
    },
    //钓鱼
    Angling:function(){
        this.angling = true;
    },
    ChangeStatus:function(){
        this.angling = false;
    },
    //上钩 
    UpFishhook:function(){
        if(this.fishline_Node.height > 80)
        {
            this.fishline_Node.height -= 40 * boatMoveSpeed;
            this.barb_Node.y = -this.fishline_Node.height;
        }
    },
    //下钩
    DownFishhook:function(){
        if(this.fishline_Node.height >= 650)
        {
            this.angling = false;
        }
        this.fishline_Node.height += 20 * boatMoveSpeed;
        this.barb_Node.y = -this.fishline_Node.height;
    },

    randFishScript:function(){
        
    },

});