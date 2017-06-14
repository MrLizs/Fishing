var MaxFishNum = 5;//最大鱼数量
window.theFishes = [];//鱼群
var sceneChildrenCount = 0;
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
    },
    onLoad: function () {
        //鱼群初始化
        theFishes = new Array();
        //this.initFish(MaxFishNum)
        sceneChildrenCount = cc.director.getScene().childrenCount;
        cc.log(sceneChildrenCount);
    },

    /**
     * 未使用
     */
    initFish:function(addFishNum){
        for (var i = 0; i < addFishNum; i++) {
            var scene = cc.director.getScene();
            var theFish = {
                node: null,//节点
                sroll: true,//方向
                Floor: null,//层
                speed: null,//速度
                fishCollisions: false,//是否碰撞
                nodeClass:0,//节点种类
            };//鱼数据
            theFishes.push(theFish);
            theFishes[i].node = cc.instantiate(this.randFish());
            theFishes[i].node.active = true;
            this.fishFun(Math.random() * 3,i);
            scene.addChild(theFishes[i].node);
        }
    },

    update: function (dt) {
        if(cc.director.getScene().childrenCount >= sceneChildrenCount && cc.director.getScene().childrenCount < sceneChildrenCount + MaxFishNum)
        {
            this.GameingAddFish();
        }
    },

    fishFun:function(rnum,i){
        // this.randFishSpriteFrame(theFishes[i]);
        if(theFishes[i].fishCollisions === false)
        {
            //theFishes[i].node.name = ""+i;
            //theFishes[i].node.addComponent(cc.Sprite);
            if (rnum > 0 && rnum < 1) {
                theFishes[i].node.x = -300;
                theFishes[i].node.y = 400;
                theFishes[i].Floor = 1;
            }
            else if (rnum > 1 && rnum < 2) {
                theFishes[i].node.x = -300;
                theFishes[i].node.y = 250;
                theFishes[i].Floor = 2;
            }
            else {
                theFishes[i].node.x = -300;
                theFishes[i].node.y = 100;
                theFishes[i].Floor = 3;
            }
            theFishes[i].speed = rnum;
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
                Floor: null,//层
                speed: null,//速度
                fishCollisions: false,//是否碰撞
                nodeClass:0,//节点种类
            };//鱼数据
        theFishes.push(theFish);
        theFishes[_length].node = cc.instantiate(this.randFishSpriteFrame());/*cc.instantiate(this.fish_Node)*/
        theFishes[_length].node.active = true;
        this.fishFun(Math.random() * 3,_length);
        scene.addChild(theFishes[_length].node);
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
        var rand = Math.random() * 12;
        switch (Math.round(rand)) {
            case 0:
                return this.agouti_Node;
            case 1:
                return this.bluefish_Node;
            case 2:
                return this.crab_Node;
            case 3:
                return this.cuttlefish_Node;
            case 4:
                return this.redfish_Node;
            case 5:
                return this.tropicalfish_Node;
            case 6:
                return this.yellowfish_Node;
            case 7:
                return this.prop1_Node;
            case 8:
                return this.prop2_Node;
            case 9:
                return this.prop3_Node;
            case 10:
                return this.prop4_Node;
            case 11:
                return this.prop5_Node;
            case 12:
                return this.prop6_Node;
            default:
                return this.prop1_Node;
        }

    },
    
});
