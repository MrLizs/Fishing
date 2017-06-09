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
        Catchup:false,
        BarbNode:{
            default:null,
            type:cc.Node,
            tooltip:'Default Null'
        },
    },

    onLoad: function () {
        this.speed = Math.random() * 3;
        this.sroll = 'right';
        this.Catchup = false;
    },

    update:function(){
        this.fishMove();
    },
    fishMove:function(){
        if(this.Catchup == false)
        {
            for (var i = 0; i < theFishes.length; i++) {
                if(theFishes[i].node === this.node)
                {
                    if(this.node.x >= 2200)
                    {
                        this.sroll = 'left';
                    }
                    if(this.node.x <= -500)
                    {
                        this.sroll = 'right';
                    }
                }
            }
            this.resetMovePoint(this.node);
        }
        else
        {
            if(this.BarbNode)
            {
                if(this.node.parent)
                {
                    if(this.node.parent.name == 'DH_boat')
                    {
                        this.node.x = this.node.parent.getPositionX();
                        //this.node.x = this.node.parent.convertToWorldSpace(this.node.parent.position);
                    }
                }
                //this.node.x = this.BarbNode.getPositionX();
                //this.node.position = this.BarbNode.getAnchorPointInPoints();
            }
        }
    },
    resetMovePoint: function (_fishNode) {
        if(this.sroll == 'right')
        {
            _fishNode.x += this.speed * walkSpeed;
            _fishNode.width = -1 * Math.abs(_fishNode.width);
        }
        if(this.sroll == 'left')
        {
            _fishNode.x -= this.speed * walkSpeed;
            _fishNode.width = Math.abs(_fishNode.width);
        }
    },
    onCollisionEnter: function (other, self) {
        if(other.node.name == 'DH_barb')
        {
            this.Catchup = true;
            this.BarbNode = other.node;
            //self.node.rotation = -90;
            self.node.parent = other.node/*.parent.parent*/;
            self.node.x = 0;
            self.node.y = 0;
        }
        if(other.node.name == 'DH_boat')
        {
            self.node.parent = null;
            self.node.destroy();
        }
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
