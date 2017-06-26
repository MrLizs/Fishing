var MinFishesNums = 0;//最小鱼数量
var MaxFishesNums = 20;
var PushFrequencyNums = 3;
window.theFishes = [];//鱼群
window.FishNum = 0;
window.GarbageNum = 0;
var floorOne = 190/1080 * cc.director.getWinSizeInPixels().height;
var floorTwo = 370/1080 * cc.director.getWinSizeInPixels().height;
var floorThree = 550/1080 * cc.director.getWinSizeInPixels().height;

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
    },
    onLoad: function () {
        //鱼群初始化
        theFishes = null;
        theFishes = new Array();
        // this.initFish(MinFishesNums)
        MinFishesNums = 0;
        FishNum = 0;
        GarbageNum = 0;
        this.schedule(this.timePlusPlus,1);

        cc.log("场景高度: "+cc.director.getWinSizeInPixels().height);
        cc.log("1:"+floorOne);
        cc.log("2:"+floorTwo);
        cc.log("3:"+floorThree);

    },

    /**
     * 初始化鱼群
     * 已使用
     */
    initFish:function(addFishNum){
        for (; (FishNum+GarbageNum) < MaxFishesNums; ) {
            if(TimeIsOver === false)
            {
                this.GameingAddFish();
            }
        }
    },

    update: function (dt) {
        if((FishNum+GarbageNum) < MaxFishesNums)
        {
            if(TimeIsOver === false)
            {
                this.pushTime +=cc.director.getDeltaTime();
                if(this.pushTime >= 0.34)
                {
                    this.GameingAddFish();
                    this.pushTime = 0;
                }
            }
        }
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
            };//鱼数据
        theFishes.push(theFish);
        var stage = this.randFishSpriteFrame();//拿到阶段
        var fishesObj = this.momentSpriteFishes(stage);
        if(fishesObj)
        {
            theFishes[_length].node = cc.instantiate(fishesObj);/*cc.instantiate(this.fish_Node)*/
            if(theFishes[_length].node != null)
            {
                if(this.switchSpriteName(theFishes[_length].node.name) > 6){
                    theFishes[_length].node.rotation += Math.random() * 360;
                    theFishes[_length].nodeClass = -100
                }
                else{
                    theFishes[_length].nodeClass = 100
                }
                theFishes[_length].node.active = true;
                this.fishFun(Math.random() * 6,_length);
                scene.addChild(theFishes[_length].node);
            }
        }
    },

    fishFun:function(rnum,i){
        // this.randFishSpriteFrame(theFishes[i]);
        var randY = Math.random() * 90;
        // cc.log(randY);
        if(theFishes[i].fishCollisions === false)
        {
            var SPD = this.switchFishesSpeed();//依据时间线获得速度

            theFishes[i].nodeClass *= this.switchScore(SPD);//根据速度获得积分基数

            theFishes[i].speed = SPD;
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
                    theFishes[i].Floor = 1.4;
                    break;
            }
        }
    },

    switchScore:function(spd){
        switch (spd) {
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
            if(rand < 0.3501)
            {
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
            if(rand < 0.6001)
            {
                return SPD1;
            }
            else if(rand > 0.6 && rand < 0.8001)
            {
                return SPD2;
            }
            else if(rand > 0.8 && rand < 0.95)
            {
                return SPD3;
            }
            else
            {
                return SPD4;
            }
        }
        else if(stage === 2){
            if(rand < 0.4501)
            {
                return SPD1;
            }
            else if(rand > 0.45 && rand < 0.7001)
            {
                return SPD2;
            }
            else if(rand > 0.7 && rand < 0.9)
            {
                return SPD3;
            }
            else
            {
                return SPD4;
            }
        }
        else if(stage === 3){
            if(rand < 0.3001)
            {
                return SPD1;
            }
            else if(rand > 0.3 && rand < 0.6001)
            {
                return SPD2;
            }
            else if(rand > 0.6 && rand < 0.85)
            {
                return SPD3;
            }
            else
            {
                return SPD4;
            }

        }
    },

    /**
     * 加载已创建的鱼节点
     * agouti_Node
     * bluefish_Node
     * crab_Node
     * cuttlefish_Node
     * redfish_Node
     * tropicalfish_Node
     * yellowfish_Node
     */
    randFishSpriteFrame: function () {
        var moment = this.returnWhat(this.switchStage());
        return moment;
    },
    /**
     * 阶段判断
     */
    switchStage:function(){
        if(MinTime > 0 && MinTime <= 30){
            return 1;
        }
        else if(MinTime > 30 && MinTime < 60){
            return 2;
        }
        else if(MinTime >= 60){
            return 3;
        }
    },

    momentSpriteFishes:function(moment){
        if(moment == 'ALL')
        {
            var rand = Math.random() * 12;
            switch (Math.round(rand)) {
                case 0:
                    FishNum++;
                    return this.agouti_Node;
                case 1:
                    FishNum++;
                    return this.bluefish_Node;
                case 2:
                    FishNum++;
                    return this.crab_Node;
                case 3:
                    FishNum++;
                    return this.cuttlefish_Node;
                case 4:
                    FishNum++;
                    return this.redfish_Node;
                case 5:
                    FishNum++;
                    return this.tropicalfish_Node;
                case 6:
                    FishNum++;
                    return this.yellowfish_Node;
                case 7:
                    GarbageNum++;
                    return this.prop1_Node;
                case 8:
                    GarbageNum++;
                    return this.prop2_Node;
                case 9:
                    GarbageNum++;
                    return this.prop3_Node;
                case 10:
                    GarbageNum++;
                    return this.prop4_Node;
                case 11:
                    GarbageNum++;
                    return this.prop5_Node;
                case 12:
                    GarbageNum++;
                    return this.prop6_Node;
                default:
                    cc.log('返回了一个空对象0:'+Math.round(rand));
                    return;
            }
        }
        else if(moment == 'Fish')
        {
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
        }
        else if(moment == 'Garbage')
        {
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
        }
    },

    /**
     * 在什么阶段刷什么内容
     */
    returnWhat:function(moment){
        if(FishNum+GarbageNum < this.fishMomentSwitch(moment) + this.garbageMomentSwitch(moment))
        {
            if(FishNum < this.fishMomentSwitch(moment) && GarbageNum < this.garbageMomentSwitch(moment))
            {
                return 'ALL';
            }
            if(FishNum < this.fishMomentSwitch(moment))
            {
                return 'Fish';
            }
            if(GarbageNum < this.garbageMomentSwitch(moment))
            {
                return 'Garbage';
            }
        }
        else
        {
            return;
        }
    },
    /**
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
                MinFishesNums += PushFrequencyNums;
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
