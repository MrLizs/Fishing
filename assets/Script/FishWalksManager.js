var walkSpeed = 2;
cc.Class({
    extends: cc.Component,

    properties: {
        Floor_Node:{
            default:null,
            type:cc.Node,
        },
    },

    onLoad: function () {

    },

    update:function(){
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
    onCollisionEnter: function (other, self) {
        this.node.destroy();
    },
});
