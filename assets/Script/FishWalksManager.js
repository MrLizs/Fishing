var walkSpeed = 2;
cc.Class({
    extends: cc.Component,

    properties: {
        Floor_Node:{
            default:null,
            type:cc.Node,
        },
        speed:0,
        sroll:"left or right",

    },

    onLoad: function () {
        this.speed = Math.random() * 3;
        this.sroll = 'right';
    },

    update:function(){
        this.fishMove();
    },
    fishMove:function(){
        for (var i = 0; i < theFishes.length; i++) {
            if(theFishes[i].node === this.node)
            {
                if(this.node.x >= 2200)
                {
                    theFishes[i].node.destroy();
                }
            }
        }
        if(this.sroll == 'right')
        {
            this.node.x += this.speed * walkSpeed;
        }
        if(this.sroll == 'left')
        {
            this.node.x -= this.speed * walkSpeed;
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
        //this.node.destroy();
        // cc.Fish.scMgr.addFish(1);
        //cc.log('FishWalkManager 销毁节点');
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
