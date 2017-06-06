var walkSpeed = 2;

var MaxFishNum = 5;//最大鱼数量
window.theFishes = [];//鱼群

var ScriptCollisionsManager = cc.Class({
    extends: cc.Component,

    properties: {
        FirstFloor_Node: {
            default: null,
            type: cc.Node,
        },
        SecondFloor_Node: {
            default: null,
            type: cc.Node,
        },
        ThirdlyFloor_Node: {
            default: null,
            type: cc.Node,
        },
        // fish_Node:{
        //     default:null,
        //     type:cc.Prefab,
        // },
    },
    onLoad: function () {
        //鱼群初始化
        theFishes = new Array();
        this.addFish(MaxFishNum)
    },

    addFish:function(addFishNum){
        for (var i = 0; i < addFishNum; i++) {
            var theFish = {
                node: null,//节点
                sroll: true,//方向
                Floor: null,//层
                speed: null,//速度
                fishCollisions: false,//是否碰撞
            };//鱼数据
            theFishes.push(theFish);
            var rnum = Math.random() * 3;
            this.fishFun(rnum,i);
        }
    },

    fishFun:function(rnum,i){
        if(theFishes[i].fishCollisions === false)
        {
            theFishes[i].node = new cc.Node();
            theFishes[i].node.name = ""+i;
            //theFishes[i].node.addComponent(cc.Sprite);
            this.randFishSpriteFrame(theFishes[i]);
            if (rnum > 0 && rnum < 1) {
                theFishes[i].node.parent = this.FirstFloor_Node;
                theFishes[i].node.x = -300;
                theFishes[i].node.y = this.FirstFloor_Node.y - 200;
                theFishes[i].Floor = 1;
            }
            else if (rnum > 1 && rnum < 2) {
                theFishes[i].node.parent = this.SecondFloor_Node;
                theFishes[i].node.x = -300;
                theFishes[i].node.y = this.SecondFloor_Node.y - 200;
                theFishes[i].Floor = 2;
            }
            else {
                theFishes[i].node.parent = this.ThirdlyFloor_Node;
                theFishes[i].node.x = -300;
                theFishes[i].node.y = this.ThirdlyFloor_Node.y - 200;
                theFishes[i].Floor = 3;
            }
            theFishes[i].speed = rnum;
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function () {
        this.fishMove();
    },
    fishMove:function(){
        for (var i = 0; i < theFishes.length; i++) {
            if (theFishes[i]) {
                if (theFishes[i].fishCollisions === false) {
                    if (theFishes[i].scroll) {
                        theFishes[i].node.x += theFishes[i].speed * walkSpeed;
                    }
                    else {
                        theFishes[i].node.x -= theFishes[i].speed * walkSpeed;
                    }
                    if (theFishes[i].node.x >= 2200 || theFishes[i].node.x < -500) {
                        this.resetMovePoint(theFishes[i]);
                    }
                }
            }
        }
    },
    resetMovePoint: function (_fishNode) {
        if (_fishNode.scroll === true) {
            _fishNode.scroll = false;
            _fishNode.node.width = -_fishNode.node.width;
        }
        else {
            _fishNode.scroll = true;
            _fishNode.node.width = -_fishNode.node.width;
        }
    },


    randFishSpriteFrame: function (_fishNode) {
        var fishNode = _fishNode.node;
        var rand = Math.random() * 7;
        if(rand < 1)
        {
            cc.loader.loadRes('Fishes/DH_agouti',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = 189;
                fishNode.height = 166;
            });
        }
        else if(rand < 2)
        {
            cc.loader.loadRes('Fishes/DH_bluefishi',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = 163;
                fishNode.height = 121;
            });
        }
        else if(rand < 3)
        {
            cc.loader.loadRes('Fishes/DH_crab',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = 172;
                fishNode.height = 164;
            });
        }
        else if(rand < 4)
        {
            cc.loader.loadRes('Fishes/DH_inkfish',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = 124;
                fishNode.height = 131;
            });
        }
        else if(rand < 5)
        {
            cc.loader.loadRes('Fishes/DH_redfishi',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = 332;
                fishNode.height = 114;
            });
        }
        else if(rand < 6)
        {
            cc.loader.loadRes('Fishes/DH_tropicalfish',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = 138;
                fishNode.height = 144;
            });
        }
        else if(rand < 7)
        {
            cc.loader.loadRes('Fishes/DH_yellowfish',cc.SpriteFrame,function(err,spriteFrame){
                fishNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
                fishNode.width = 245;
                fishNode.height = 129;
            });
        }
        else
        {
            cc.loader.loadRes('garbage/DH_garbage_2', cc.SpriteFrame, function (err, spriteFrame) {
                fishNode.addComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
        }
        
        fishNode.addComponent(cc.BoxCollider).size = new cc.size(fishNode.width, fishNode.height);
        fishNode.group = "Fishing";
        cc.log(fishNode.getComponent(cc.BoxCollider).name);
        // fishNode.addComponent(cc.BoxCollider);
        // fishNode.getComponent(cc.BoxCollider).size = new cc.size(fishNode.width, fishNode.height);

    },

});
