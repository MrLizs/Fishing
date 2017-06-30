var MinFishesNums = 0;//最小鱼数量
var MaxFishesNums = 0;//最大鱼群数量
var PushFrequencyNums = 3;
window.theFishes = [];//鱼群
window.FishNum = 0;//刷出来的鱼数量
var maxFishesNum1 = 13;
var maxFishesNum2 = 11;
var maxFishesNum3 = 8;
var maxAccumulationFishesNum1 = 72;
var maxAccumulationFishesNum2 = 54;
var maxAccumulationFishesNum3 = 36;
var AccumulationFishesNum1 = 0;
var AccumulationFishesNum2 = 0;
var AccumulationFishesNum3 = 0;
window.GarbageNum = 0;//刷出来的垃圾数量
var maxGarbageNum1 = 3;
var maxGarbageNum2 = 5;
var maxGarbageNum3 = 8;
var maxAccumulationGarbageNum1 = 18;
var maxAccumulationGarbageNum2 = 36;
var maxAccumulationGarbageNum3 = 54;
var AccumulationGarbageNum1 = 0;
var AccumulationGarbageNum2 = 0;
var AccumulationGarbageNum3 = 0;
var floorOne = 550;
var floorTwo = 370;
var floorThree = 190;
var MaxViewNums = 16;

var SPD1 = 300;
var SPD2 = 400;
var SPD3 = 500;
var SPD4 = 600;

var ScriptCollisionsManager = cc.Class({
    extends: cc.Component,

    properties: {
        fishhook_Node: {
            default: null,
            type: cc.Node,
        },
        agouti_Node:{
            default:null,
            type:cc.Node,
        },
        bluefish_Node:{
            default:null,
            type:cc.Node,
        },
        crab_Node:{
            default:null,
            type:cc.Node,
        },
        cuttlefish_Node:{
            default:null,
            type:cc.Node,
        },
        redfish_Node:{
            default:null,
            type:cc.Node,
        },
        tropicalfish_Node:{
            default:null,
            type:cc.Node,
        },
        yellowfish_Node:{
            default:null,
            type:cc.Node,
        },
        prop1_Node:{
            default:null,
            type:cc.Node,
        },
        prop2_Node:{
            default:null,
            type:cc.Node,
        },
        prop3_Node:{
            default:null,
            type:cc.Node,
        },
        prop4_Node:{
            default:null,
            type:cc.Node,
        },
        prop5_Node:{
            default:null,
            type:cc.Node,
        },
        prop6_Node:{
            default:null,
            type:cc.Node,
        },
        pushTime:null,
        Canvas_Node:cc.Node,
        boatMoveDelta:0,
    },
    onLoad: function () {
        //鱼群初始化
        theFishes = null;
        theFishes = new Array();
        MinFishesNums = 0;
        FishNum = 0;
        GarbageNum = 0;
        this.schedule(this.timePlusPlus,1);

        /**
         * 钓起鱼和垃圾的数量限制
         */
        AccumulationFishesNum1 = maxAccumulationFishesNum1;
        AccumulationFishesNum2 = maxAccumulationFishesNum2;
        AccumulationFishesNum3 = maxAccumulationFishesNum3;
        AccumulationGarbageNum1 = maxAccumulationGarbageNum1;
        AccumulationGarbageNum2 = maxAccumulationGarbageNum2;
        AccumulationGarbageNum3 = maxAccumulationGarbageNum3;

    },

    update: function (dt) {
        if(TimeIsOver === false && MinTime < MaxTime){
            if((this.getFishesNums()+this.getGarbageNums()) < MaxViewNums){
                this.pushTime +=cc.director.getDeltaTime();
                if(this.pushTime > 0.33){
                    this.GameingAddFish();
                    this.pushTime = 0;
                }
            }
        }
        if(MinTime < MaxTime * 0.334){
            MaxFishesNums = maxFishesNum1 + maxGarbageNum1;
        }
        else if(MinTime > MaxTime*0.333 && MinTime < MaxTime*0.667){
            MaxFishesNums = maxFishesNum2 + maxGarbageNum2;
        }
        else if(MinTime > MaxTime*0.667 && (MinTime < MaxTime || MinTime == MaxTime) ){
            MaxFishesNums = maxFishesNum3 + maxGarbageNum3;
        }
    },

    /**
     * 获取鱼数量
     */
    getFishesNums:function(){
        var fishnum=0;
        theFishes.forEach(function(element) {
            if(element)
            {
                if(element.node){
                    if(element.type == 'fish'){
                        fishnum++;
                    }
                }
                else{
                    element = null;
                }
            }
        }, this);
        cc.log('当前鱼总数'+fishnum);
        return fishnum;
    },
    /**
     * 获取垃圾数量
     */
     getGarbageNums:function(){
        var fishnum=0;
        theFishes.forEach(function(element) {
            if(element){
                if(element.node){
                    if(element.type == 'garbage'){
                        fishnum++;
                    }
                }
                else{
                    element = null;
                }
            }
        }, this);
        cc.log('当前垃圾总数'+fishnum);
        return fishnum;
     },
    /**
     * 动态添加鱼
     */
    GameingAddFish:function(){
        var scene = cc.director.getScene();
        var _length = theFishes.length;
        var theFish = {
                node: null,//节点
                sroll: true,//方向
                Floor: null,//层计算基数
                speed: null,//速度
                fishCollisions: false,//是否碰撞
                nodeClass:0,//节点种类,用于计算积分
                type:0,//类型
            };//鱼数据
        theFishes.push(theFish);
        
        var fishesObj = this.momentSpriteFishes();
        if(fishesObj)
        {
            theFishes[_length].node = cc.instantiate(fishesObj);/*cc.instantiate(this.fish_Node)*/
            if(theFishes[_length].node != null)
            {
                if(this.switchSpriteName(theFishes[_length].node.name) > 6){
                    theFishes[_length].node.rotation += Math.random() * 360;
                    theFishes[_length].nodeClass = -100;
                    theFishes[_length].type = 'garbage';
                }
                else{
                    theFishes[_length].nodeClass = 100;
                    theFishes[_length].type = 'fish';
                }
                theFishes[_length].node.active = true;
                this.fishFun(Math.random() * 6,_length);
                scene.addChild(theFishes[_length].node);
            }
        }
    },

    fishFun:function(rnum,i){
        var randY = -80 + Math.random() * 160;
        if(theFishes[i].fishCollisions === false)
        {
            var SPD = this.switchFishesSpeed();//依据时间线获得速度

            theFishes[i].nodeClass = theFishes[i].nodeClass * this.switchScore(SPD);//根据速度获得积分基数
            // cc.log("依据速度调整了积分后积分是:"+theFishes[i].nodeClass);

            theFishes[i].speed = SPD;
            // cc.log(theFishes[i].speed);
            var floor = this.switchFloor();
            if (rnum <= 1) {
                theFishes[i].node.x = -300;
                theFishes[i].node.y = floor + randY;
            }
            else if (rnum > 1 && rnum <= 2) {
                theFishes[i].node.x = -300;
                theFishes[i].node.y = floor + randY;
            }
            else if(rnum > 2 && rnum <= 3){
                theFishes[i].node.x = -300;
                theFishes[i].node.y = floor + randY;
            }
            else if(rnum > 3 && rnum <= 4){
                theFishes[i].node.x = 1950;
                theFishes[i].node.y = floor + randY;
                theFishes[i].sroll = false;
            }
            else if(rnum > 4 && rnum <= 5){
                theFishes[i].node.x = 1950;
                theFishes[i].node.y = floor + randY;
                theFishes[i].sroll = false;
            }
            else if(rnum > 5 && rnum <= 6){
                theFishes[i].node.x = 1950;
                theFishes[i].node.y = floor + randY;
                theFishes[i].sroll = false;
            }
            switch (floor) {
                case floorOne:
                    theFishes[i].Floor = 1.0;
                    break;
                case floorTwo:
                    theFishes[i].Floor = 1.2;
                    break;
                case floorThree:
                    theFishes[i].Floor = 1.5;
                    break;
            }
        }
    },

    switchScore:function(spd){
        switch (spd){
            case 300:
                return 1;
            case 400:
                return 1.2;
            case 500:
                return 1.4;
            case 600:
                return 1.6;
        }
    },

    switchFloor:function(){
        var stage = this.switchStage();
        var rand = Math.random();
        if(stage === 1){
            if(rand < 0.5001)
            {
                return floorOne;
            }
            else if(rand > 0.5 && rand < 0.9001){
                return floorTwo;
            }
            else{
                return floorThree;
            }
        }
        else if(stage === 2){
            if(rand < 0.4001)
            {
                return floorOne;
            }
            else if(rand > 0.4 && rand < 0.8001){
                return floorTwo;
            }
            else{
                return floorThree;
            }
        }
        else if(stage === 3){
            if(rand < 0.3501){
                return floorOne;
            }
            else if(rand > 0.35 && rand < 0.7001){
                return floorTwo;
            }
            else{
                return floorThree;
            }
        }
    },

    switchFishesSpeed:function(){
        var stage = this.switchStage();
        var rand = Math.random();
        if(stage === 1){
            if(rand < 0.6001){
                return SPD1;
            }
            else if(rand > 0.6 && rand < 0.8001){
                return SPD2;
            }
            else if(rand > 0.8 && rand < 0.95){
                return SPD3;
            }
            else{
                return SPD4;
            }
        }
        else if(stage === 2){
            if(rand < 0.4501){
                return SPD1;
            }
            else if(rand > 0.45 && rand < 0.7001){
                return SPD2;
            }
            else if(rand > 0.7 && rand < 0.9){
                return SPD3;
            }
            else{
                return SPD4;
            }
        }
        else if(stage === 3){
            if(rand < 0.3001){
                return SPD1;
            }
            else if(rand > 0.3 && rand < 0.6001){
                return SPD2;
            }
            else if(rand > 0.6 && rand < 0.85){
                return SPD3;
            }
            else{
                return SPD4;
            }
        }
    },

    /**
     * return
     * ALL,Fish,Garbage
     */
    randFishSpriteFrame:function(){
        var moment = this.returnWhat(this.switchStage());
        return moment;
    },
    /**
     * 阶段判断
     */
    switchStage:function(){
        var stage = 0;
        if(MinTime >= 0 && MinTime < MaxTime*0.334){
            stage = 1;
        }
        else if(MinTime >= MaxTime*0.334 && MinTime < MaxTime*0.667){
            stage = 2;
        }
        else if(MinTime >= MaxTime*0.667 && MinTime<=MaxTime){
            stage = 3;
        }
        return stage;
    },

    /**
     * 鱼塘剩余鱼和垃圾判断
     */
    fishpondControlSwitch:function(_moment){
        var stage = this.switchStage();
        if(_moment == 'ALL'){
            return _moment;
        }
        else{
            if(stage == 1){
                if(AccumulationFishesNum1 == 0 && AccumulationGarbageNum1 == 0){
                    return 'NoPush';
                }
                else if(AccumulationGarbageNum1 == 0){
                    return 'fish';
                }
                else if(AccumulationFishesNum1 == 0){
                    return 'garbage';
                }
                else{
                    return _moment;
                }
            }
            if(stage == 2){
                if(AccumulationFishesNum2 == 0 && AccumulationGarbageNum2 == 0){
                    return 'NoPush';
                }
                else if(AccumulationGarbageNum2 == 0){
                    return 'fish';
                }
                else if(AccumulationFishesNum2 == 0){
                    return 'garbage';
                }
                else{
                    return _moment;
                }
            }
            if(stage == 3){
                if(AccumulationFishesNum3 == 0 && AccumulationGarbageNum3 == 0){
                    return 'NoPush';
                }
                else if(AccumulationGarbageNum3 == 0){
                    return 'fish';
                }
                else if(AccumulationFishesNum3 == 0){
                    return 'garbage';
                }
                else{
                    return _moment;
                }
            }
        }
    },


    momentSpriteFishes:function(){
        var moment = this.randFishSpriteFrame();
        // moment = this.fishpondControlSwitch(moment);暂未使用
        if(moment == 'ALL')
        {
            var stage = this.switchStage();
            if(stage === 1){
                var _rand = Math.random();
                if(_rand > 0.8){
                    return this.pushtheGarbage();
                }
                else{
                    return this.pushtheFish();
                }
            }
            else if(stage === 2){
                var _rand = Math.random();
                if(_rand > 0.4){
                    return this.pushtheGarbage();
                }
                else{
                    return this.pushtheFish();
                }
            }
            else if(stage === 3){
                var _rand = Math.random();
                if(_rand < 0.6){
                    return this.pushtheGarbage();
                }
                else{
                    return this.pushtheFish();
                }
            }
        }
        else if(moment == 'Fish')
        {
            return this.pushtheFish();
        }
        else if(moment == 'Garbage')
        {
            return this.pushtheGarbage();
        }
    },

    pushtheFish:function(){
        FishNum++;
        var rand = Math.random() * 6 + 1;
        switch (Math.round(rand)) {
            case 1:
                return this.agouti_Node;
            case 2:
                return this.bluefish_Node;
            case 3:
                return this.crab_Node;
            case 4:
                return this.cuttlefish_Node;
            case 5:
                return this.redfish_Node;
            case 6:
                return this.tropicalfish_Node;
            case 7:
                return this.yellowfish_Node;
            default:
                cc.log('返回了一个空对象1:'+Math.round(rand));
                return;
        }
    },
    pushtheGarbage:function(){
        GarbageNum++;
            var rand = Math.random() * 5 + 1;
            switch (Math.round(rand)) {
                case 1:
                    return this.prop1_Node;
                case 2:
                    return this.prop2_Node;
                case 3:
                    return this.prop3_Node;
                case 4:
                    return this.prop4_Node;
                case 5:
                    return this.prop5_Node;
                case 6:
                    return this.prop6_Node;
                default:
                    cc.log('返回了一个空对象2:'+Math.round(rand));
                    return;
            }
    },

    /**
     * 在什么阶段刷什么内容
     */
    returnWhat:function(moment){
        var what = 'ALL';
        var _fishNum = this.getFishesNums();
        var _garbageNum = this.getGarbageNums();
        if(moment===1){
            what = this.returnInWaht(_fishNum,_garbageNum,maxFishesNum1,maxGarbageNum1);
        }
        if(moment===2){
            what = this.returnInWaht(_fishNum,_garbageNum,maxFishesNum2,maxGarbageNum2);
        }
        if(moment===3){
            what = this.returnInWaht(_fishNum,_garbageNum,maxFishesNum3,maxGarbageNum3);
        }
        return what;
    },

    returnInWaht(_fishNum,_garbageNum,_maxfishNum,_maxgarbageNum){
        if(_fishNum > _maxfishNum && _garbageNum > _maxgarbageNum){
            return 'NoPush';
        }
        if(_fishNum < _maxfishNum && _garbageNum < _maxgarbageNum){
            return 'ALL';
        }
        else{
            if(_fishNum < _maxfishNum){
                return 'Fish';
            }
            else if(_garbageNum < _maxgarbageNum){
                return 'Garbage';
            }
        }
        return 'NoPush';
    },

    /**
     * 未使用
     * 返回不同阶段鱼的数量
     */
    fishMomentSwitch:function(moment){
        switch (moment) {
            case 1:
                return MaxFishesNums * 0.9;
            case 2:
                return MaxFishesNums * 0.85;
            case 3:
                return MaxFishesNums * 0.75;
        }
    },
    /**
     * 未使用
     * 返回不同阶段垃圾数量
     */
    garbageMomentSwitch:function(moment){
        switch (moment) {
            case 1:
                return MaxFishesNums * 0.1;
            case 2:
                return MaxFishesNums * 0.15;
            case 3:
                return MaxFishesNums * 0.25;
        }
    },
    timePlusPlus:function(){
        var self = this;
        setTimeout(function() {
            if(MinFishesNums < MaxFishesNums){
                MinFishesNums += PushFrequencyNums;//----------------------------------------------------------------------------------------------------------------------
            }
            else{
                self.unschedule(self.timePlusPlus,self);
            }
        }, 1000);
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
