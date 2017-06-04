var walkSpeed = 2.5;
var FirstFloor_Node = null;
var SecondFloor_Node = null;
var ThirdlyFloor_Node = null;

var MaxFishNum = 3;//最大鱼数量
window.theFishes = [];//鱼群
var theFish = {
   node:null,//节点
   sroll:true,//方向
   Floor:null,//层
   speed:null,//速度
   fishCollisions:false,//是否碰撞
};//鱼数据

var ScriptCollisionsManager = cc.Class({
    extends: cc.Component,

    properties: {
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
    },
    onLoad:function(){
        //鱼群初始化
        theFishes = new Array();
        for (var i = 0; i < MaxFishNum; i++) {
            theFishes.push(theFish);
        }
        this.initFloor();
        this.initFishes();
    },

    initFloor(/*FirstFloor,SecondFloor,ThirdlyFloor*/)
    {
        FirstFloor_Node = this.FirstFloor_Node.getChildByName('DH');
        SecondFloor_Node = this.SecondFloor_Node.getChildByName('DH');
        ThirdlyFloor_Node = this.ThirdlyFloor_Node.getChildByName('DH');
    },

    initFishes:function(){

        for(var i = 0 ; i < MaxFishNum ; i++)
        {
            var rnum = Math.random()*2+1;
            if(rnum > 0 && rnum < 1)
            {
                theFishes[i].node = cc.instantiate(FirstFloor_Node);
                theFishes[i].node.parent = FirstFloor_Node.parent;
                theFishes[i].node.x = FirstFloor_Node.x;
                theFishes[i].node.y = FirstFloor_Node.y;
                theFishes[i].Floor = 1;
            }
            else if(rnum > 1 && rnum < 2)
            {
                theFishes[i].node = cc.instantiate(SecondFloor_Node);
                theFishes[i].node.parent = SecondFloor_Node.parent;
                theFishes[i].node.x = SecondFloor_Node.x;
                theFishes[i].node.y = SecondFloor_Node.y;
                theFishes[i].Floor = 2;
            }
            else
            {
                theFishes[i].node = cc.instantiate(ThirdlyFloor_Node);
                theFishes[i].node.parent = ThirdlyFloor_Node.parent;
                theFishes[i].node.x = ThirdlyFloor_Node.x;
                theFishes[i].node.y = ThirdlyFloor_Node.y;
                theFishes[i].Floor = 3;
            }
            this.randFishSpriteFrame(randFishSpriteFrame);
            theFishes[i].speed = rnum + 1;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function () {
        for (var i = 0; i < theFishes.length; i++) {
            var fishNode = theFishes[i];
            if(fishNode)
            {
                cc.log(fishNode);
                if(fishNode.fishCollisions === false)
                {
                    if(fishNode.scroll)
                    {
                        fishNode.node.x += fishNode.speed * walkSpeed;
                    }
                    else
                    {
                        fishNode.node.x -= fishNode.speed * walkSpeed;
                    }
                    if(fishNode.node.x >= 2200 || fishNode.node.x < -500)
                    {
                        this.resetMovePoint(fishNode);
                    }
                }
            }
        }
    },
    
    resetMovePoint:function(_fishNode){
        if(_fishNode.scroll === true)
        {
            _fishNode.scroll = false;
            _fishNode.node.width = -_fishNode.node.width;
        }
        else
        {
            _fishNode.scroll = true;
            _fishNode.node.width = -_fishNode.node.width;
        }
    },


    randFishSpriteFrame:function(fishNode){
        var fishNodeSpriteFrame = fishNode.getComponent(cc.SpriteFrame).spriteFrame;
        var rand = Math.random()*7;
        if(rand < 1)
        {
            cc.loader.loadRes('Fishes/DH_agouti',cc.SpriteFrame,function(err,spriteFrame){
                fishNodeSpriteFrame = spriteFrame; 
            });
        }
        else if(rand < 2)
        {
            cc.loader.loadRes('Fishes/DH_bluefishi',cc.SpriteFrame,function(err,spriteFrame){
                fishNodeSpriteFrame = spriteFrame; 
            });
        }
        else if(rand < 3)
        {
            cc.loader.loadRes('Fishes/DH_crab',cc.SpriteFrame,function(err,spriteFrame){
                fishNodeSpriteFrame = spriteFrame; 
            });
        }
        else if(rand < 4)
        {
            cc.loader.loadRes('Fishes/DH_inkfish',cc.SpriteFrame,function(err,spriteFrame){
                fishNodeSpriteFrame = spriteFrame; 
            });
        }
        else if(rand < 5)
        {
            cc.loader.loadRes('Fishes/DH_tropicalfish',cc.SpriteFrame,function(err,spriteFrame){
                fishNodeSpriteFrame = spriteFrame; 
            });
        }
        else if(rand < 6)
        {
            cc.loader.loadRes('Fishes/DH_yellowfish',cc.SpriteFrame,function(err,spriteFrame){
                fishNodeSpriteFrame = spriteFrame; 
            });
        }
        else
        {
            cc.loader.loadRes('garbage/DH_garbage_2',cc.SpriteFrame,function(err,spriteFrame){
                fishNodeSpriteFrame = spriteFrame; 
            });
        }
        
    },

});
