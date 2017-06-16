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
        // this.randFishSpriteFrame();
        // this.animationSwitch();
        // this.node.addComponent(cc.Animation).play();
    },

    update:function(){
        this.fishMove();
    },

    /**
     * 钓起状态与移动状态判断
     */
    fishMove:function(){
        if(this.Catchup == false)
        {
            this.resetMovePoint();
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
                    }
                }
            }
        }
    },
    /**
     * 鱼移动
     */
    resetMovePoint: function () {
        if(this.node.x >= 2000)
        {
            this.sroll = 'left';
        }
        if(this.node.x <= -500)
        {
            this.sroll = 'right';
        }
        if(this.sroll == 'right')
        {
            this.node.x += this.speed * walkSpeed;
            this.node.width = -1 * Math.abs(this.node.width);
        }
        if(this.sroll == 'left')
        {
            this.node.x -= this.speed * walkSpeed;
            this.node.width = Math.abs(this.node.width);
        }
    },

    /**
     * 鱼本体碰撞
     */
    onCollisionEnter: function (other, self) {
        if(other.node.name == 'DH_barb')
        {
            this.Catchup = true;
            this.BarbNode = other.node;
            //self.node.rotation = -90;
            self.node.parent = other.node;
            self.node.x = 0;
            self.node.y = 0;
        }
        if(other.node.name == 'DH_boat')
        {
            self.node.parent = null;
            self.node.destroy();
        }
    },

    /**
     * 加载制定命名的动画
     */
    SpriteAnimation:function(frameName){
        var self = this;
        cc.loader.loadRes(frameName, function (err, clip) {
            self.node.addComponent(cc.Animation).addClip(clip);
        });
    },

    /**
     * 对节点进行标记绑定
     */
    randNodeClass:function(rand){
        for (var i = 0; i < theFishes.length; i++) {
            var element = theFishes[i];
            if(element.node == this.node)
            {
                element.nodeClass = rand;
            }
        }
    },

});
