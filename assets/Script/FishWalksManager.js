var walkSpeed = 2;
cc.Class({
    extends: cc.Component,

    properties: {
        Floor_Node:{
            default:null,
            type:cc.Node,
        },
        speed:null,
    },

    onLoad: function () {
        this.speed = Math.random() * 3;
    },

    update:function(){
        this.fishMove();
    },
    fishMove:function(){
        this.node.x += this.speed * walkSpeed;
        if(this.node.x >= 2200)
        {
            this.node.destroy();
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
        // for (var i = 0; i < theFishes.length; i++) {
        //     cc.log(theFishes[i].node == this.node);
        //     if (theFishes[i] && theFishes[i].node == this.node) {
        //         if (theFishes[i].fishCollisions === false) {
        //             if (theFishes[i].scroll) {
        //                 this.node.x += theFishes[i].speed * walkSpeed;
        //             }
        //             else {
        //                 this.node.x -= theFishes[i].speed * walkSpeed;
        //             }
        //             if (this.node.x >= 2200 || this.node.x < -500) {
        //                 this.resetMovePoint(theFishes[i]);
        //             }
        //         }
        //     }
        // }
