var MaxFishNum = 5;//最大鱼数量
window.theFishes = [];//鱼群

var ScriptCollisionsManager = cc.Class({
    extends: cc.Component,

    properties: {
        fishhook_Node: {
            default: null,
            type: cc.Node,
        },
        fish_Node:{
            default:null,
            type:cc.Node,
        },
    },
    onLoad: function () {
        //鱼群初始化
        theFishes = new Array();
        this.addFish(MaxFishNum)

    },

    addFish:function(addFishNum){
        for (var i = 0; i < addFishNum; i++) {
            var scene = cc.director.getScene();
            var theFish = {
                node: null,//节点
                sroll: true,//方向
                Floor: null,//层
                speed: null,//速度
                fishCollisions: false,//是否碰撞
            };//鱼数据
            theFishes.push(theFish);
            theFishes[i].node = cc.instantiate(this.fish_Node);
            this.fishFun(Math.random() * 3,i);
            theFishes[i].node.active = true;
            scene.addChild(theFishes[i].node);
        }
    },

    fishFun:function(rnum,i){
        if(theFishes[i].fishCollisions === false)
        {
            //theFishes[i].node.name = ""+i;
            //theFishes[i].node.addComponent(cc.Sprite);
            this.randFishSpriteFrame(theFishes[i]);
            if (rnum > 0 && rnum < 1) {
                theFishes[i].node.x = -300;
                theFishes[i].node.y = 450;
                theFishes[i].Floor = 1;
            }
            else if (rnum > 1 && rnum < 2) {
                theFishes[i].node.x = -300;
                theFishes[i].node.y = 300;
                theFishes[i].Floor = 2;
            }
            else {
                theFishes[i].node.x = -300;
                theFishes[i].node.y = 150;
                theFishes[i].Floor = 3;
            }
            theFishes[i].speed = rnum;
        }
    },

    update: function (dt) {
        if(cc.director.getScene().childrenCount > 3 && cc.director.getScene().childrenCount < 3+MaxFishNum)
        {
            this.addFish(1);
        }
    },

    randFishSpriteFrame: function (_fishNode) {
        var fishNode = _fishNode.node;
        var rand = Math.random() * 7;

        if(!fishNode.getComponent(cc.Sprite))
        {
            fishNode.addComponent(cc.Sprite);
        }
        
        if(rand < 1)
        {
            cc.loader.loadRes('Fishes/DH_agouti',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = -189;
                fishNode.height = 166;
            });
        }
        else if(rand < 2)
        {
            cc.loader.loadRes('Fishes/DH_bluefishi',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = -163;
                fishNode.height = 121;
            });
        }
        else if(rand < 3)
        {
            cc.loader.loadRes('Fishes/DH_crab',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = -172;
                fishNode.height = 164;
            });
        }
        else if(rand < 4)
        {
            cc.loader.loadRes('Fishes/DH_inkfish',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = -124;
                fishNode.height = 131;
            });
        }
        else if(rand < 5)
        {
            cc.loader.loadRes('Fishes/DH_redfishi',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = -332;
                fishNode.height = 114;
            });
        }
        else if(rand < 6)
        {
            cc.loader.loadRes('Fishes/DH_tropicalfish',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = -138;
                fishNode.height = 144;
            });
        }
        else if(rand < 7)
        {
            cc.loader.loadRes('Fishes/DH_yellowfish',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = -245;
                fishNode.height = 129;
            });
        }
        else
        {
            cc.loader.loadRes('garbage/DH_garbage_2', cc.SpriteFrame, function (err, spriteFrame) {
                fishNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        if(fishNode.getComponent(cc.BoxCollider) !=null)
        {
            fishNode.getComponent(cc.BoxCollider).size = new cc.size(Math.abs(fishNode.width), Math.abs(fishNode.height));
        }
        else
        {
            fishNode.addComponent(cc.BoxCollider).size = new cc.size(Math.abs(fishNode.width), Math.abs(fishNode.height));
        }
        fishNode.group = "Fishing";
        fishNode.rotation = 0;
        //cc.log(fishNode.getComponent(cc.BoxCollider).name);
        // fishNode.addComponent(cc.BoxCollider);
        // fishNode.getComponent(cc.BoxCollider).size = new cc.size(fishNode.width, fishNode.height);

    },

});
