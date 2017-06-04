var walkSpeed = 2.5;
var FirstFloor_Node = null;
var SecondFloor_Node = null;
var ThirdlyFloor_Node = null;

var ScriptCollisionsManager = cc.Class({
    extends: cc.Component,

    properties: {
        scroll:true,
        velocity:0,

    },
    initFloor(FirstFloor,SecondFloor,ThirdlyFloor)
    {
        FirstFloor_Node = FirstFloor.getChildByName('DH');
        SecondFloor_Node = SecondFloor.getChildByName('DH');
        ThirdlyFloor_Node = ThirdlyFloor.getChildByName('DH');
    },

    initFishes:function(_fish){
        var rnum = Math.random()*2+1;
        if(rnum > 0 && rnum < 1)
        {
            _fish.node = cc.instantiate(FirstFloor_Node);
            _fish.node.parent = FirstFloor_Node.parent;
            _fish.node.x = FirstFloor_Node.x;
            _fish.node.y = FirstFloor_Node.y;
            _fish.Floor = 1;
        }
        else if(rnum > 1 && rnum < 2)
        {
            _fish.node = cc.instantiate(SecondFloor_Node);
            _fish.node.parent = SecondFloor_Node.parent;
            _fish.node.x = SecondFloor_Node.x;
            _fish.node.y = SecondFloor_Node.y;
            _fish.Floor = 2;
        }
        else
        {
            _fish.node = cc.instantiate(ThirdlyFloor_Node);
            _fish.node.parent = ThirdlyFloor_Node.parent;
            _fish.node.x = ThirdlyFloor_Node.x;
            _fish.node.y = ThirdlyFloor_Node.y;
            _fish.Floor = 3;
        }
        _fish.speed = rnum + 2;
    },

    // called every frame, uncomment this function to activate update callback
    updatefish: function (fishNode) {
        if(fishNode)
        {
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
                if(fishNode.node.x >= 2017 || fishNode.node.x < -150)
                {
                    this.resetMovePoint(fishNode);
                }
            }
        }
    },
    
    resetMovePoint:function(_fishNode){
        if(_fishNode.scroll === true)
        {
            _fishNode.scroll = false;
            _fishNode.node.width = _fishNode.node.width;
        }
        else
        {
            _fishNode.scroll = true;
            _fishNode.node.width = -_fishNode.node.width;
        }
    },

});
