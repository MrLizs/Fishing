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
        resumeBtn_Node:{
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
        score:{
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
        
        // this.pauseBtn_Node.on(cc.Node.EventType.TOUCH_START,this.pauseStart,this);
        // this.pauseBtn_Node.on(cc.Node.EventType.TOUCH_END,this.pauseEnd,this);
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
        // theFishes.forEach(function(element) {
        //     if(element.node) element.node.destroy();
        // }, this);
        if(this.barb_Node.childrenCount > 0 )
        this.barb_Node.removeAllChildren();
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
        // var self = this;
        // cc.loader.loadRes('Gameing/UI_pause',cc.SpriteFrame,function(err,spriteFrame){
        //     self.pauseBtn_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
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
            if(touchVec.x > 0)
            {
                this.rightMove(touchVec);
            }
            else if(touchVec.x < 0)
            {
                this.leftMove(touchVec);
            }
            if(touchVec.x > 2 || touchVec.x < -2)
            {
                this.angling = false;
            }
        }
    },
    
    leftMove:function(touchVec){
        if(this.boat_Node.x > 190)
        {
            this.boat_Node.x += touchVec.x;
            piggy.x += touchVec.x;
            fishingRods.x += touchVec.x;
            piggyFeet.x += touchVec.x;
            
        }
    },
    rightMove:function(touchVec){
        if(this.boat_Node.x < 1730)
        {
            this.boat_Node.x += touchVec.x;
            piggy.x += touchVec.x;
            fishingRods.x += touchVec.x;
            piggyFeet.x += touchVec.x;
        }
    },
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
            this.playAnimation();
            this.destroyFishesCheckUp();
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

    /**
     * 播放小猪动画
     */
    playAnimation:function(){
        if(this.barb_Node.childrenCount > 1)
        {
            var _fishes =this.barb_Node.children;
            var whatAnim1,whatAnim2=0;
            for(var i = 0 ; i < _fishes.length ; i++)
            {
                if(this.switchSpriteName(_fishes[i].name) < 7){
                    whatAnim1++;
                }
                else{
                    whatAnim2++;
                }
            }
            if(whatAnim1 > 0 && whatAnim2 > 0){
                piggy.getComponent(cc.Animation).play('piggy');
            }
            else if(whatAnim1 > 0){
                piggy.getComponent(cc.Animation).play('piggy2');
            }
            else if(whatAnim2 > 0){
                piggy.getComponent(cc.Animation).play('piggy3');
            }
            else{
                piggy.getComponent(cc.Animation).play('piggy');
            }
        }
        else if(this.barb_Node.childrenCount > 0 && this.barb_Node.childrenCount < 2)
        {
            if(this.switchSpriteName(this.barb_Node.children[0].name) < 7)
            {
                piggy.getComponent(cc.Animation).play('piggy2');
            }
            else if(this.switchSpriteName(this.barb_Node.children[0].name) < 13 && this.switchSpriteName(this.barb_Node.children[0].name) > 6)
            {
                piggy.getComponent(cc.Animation).play('piggy3');
            }
        }
    },

    /**
     * 销毁节点
     */
    destroyFishesCheckUp:function(){
        if(this.barb_Node.childrenCount > 0){
            for (var i = 0; i < this.barb_Node.children.length; i++) {
                var barbChildren = this.barb_Node.children[i];
                for (var y = 0; y < theFishes.length; y++) {
                    if(theFishes[y] == null) continue;
                    if(barbChildren == theFishes[y].node)
                    {
                        var MyScore = theFishes[y].Floor * theFishes[y].nodeClass;
                        this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + MyScore;
                        var switchNum = this.switchSpriteName(barbChildren.name);
                        FishScore[switchNum] += 1;
                        if(switchNum < 7)
                        {
                            FishNum--;
                        }
                        else
                        {
                            GarbageNum--;
                        }
                        theFishes[y] = null;
                    }

                }
            }
            this.barb_Node.removeAllChildren();
        }
    },
    switchSpriteName:function(spriteName){
        if(spriteName == 'hetun'){
            return 0;
        }
        else if(spriteName == 'xiaolanyu'){
            return 1;
        }
        else if(spriteName == 'pangxie'){
            return 2;
        }
        else if(spriteName == 'moyu'){
            return 3;
        }
        else if(spriteName == 'xiaohongyu'){
            return 4;
        }
        else if(spriteName == 'redaiyu'){
            return 5;
        }
        else if(spriteName == 'xiaohuangyu'){
            return 6;
        }
        else if(spriteName == 'garbage1'){
            return 7;
        }
        else if(spriteName == 'garbage2'){
            return 8;
        }
        else if(spriteName == 'garbage3'){
            return 9;
        }
        else if(spriteName == 'garbage4'){
            return 10;
        }
        else if(spriteName == 'garbage5'){
            return 11;
        }
        else if(spriteName == 'garbage6'){
            return 12;
        }
    }
    

});
