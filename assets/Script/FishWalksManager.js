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
        else if(this.Catchup == true)
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
            var switchNum = this.switchSpriteName(this.node.name);
            if(switchNum < 7 && switchNum != 3)
            {
                if(this.sroll == 'right'){
                    if(this.node.rotation != -90)
                        this.node.rotation -= 15;
                }
                else if(this.sroll == 'left'){
                    if(this.node.rotation != 90){
                        this.node.rotation += 15;
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
     * 销毁鱼节点
     */
    onCollisionEnter: function (other, self) {
        if(other.node.name == 'DH_barb')
        {
            this.Catchup = true;
            this.BarbNode = other.node;

            self.node.parent = other.node;
            self.node.x = 0;
            self.node.y = 0;
        }
        //清理一下数组
        // for (var i = 0; i < theFishes.length; i++) {
        //     var element = theFishes[i];
        //     if(element.node == other.node)
        //     {
        //         theFishes[i] = null;
        //     }
        // }
        /**
         * 碰撞改到鱼钩收起时
         */
        // if(other.node.name == 'DH_boat')
        // {
        //     self.node.parent = null;
        //     self.node.destroy();
        // }
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
    switchSpriteName:function(spriteName){
        if(spriteName == 'hetun'){
            return 0;
        }
        else if(spriteName == 'xiaolanyu'){
            return 1;
        }
        else if(spriteName == 'pangxie'){
            return 2;
        }
        else if(spriteName == 'moyu'){
            return 3;
        }
        else if(spriteName == 'xiaohongyu'){
            return 4;
        }
        else if(spriteName == 'redaiyu'){
            return 5;
        }
        else if(spriteName == 'xiaohuangyu'){
            return 6;
        }
        else if(spriteName == 'garbage1'){
            return 7;
        }
        else if(spriteName == 'garbage2'){
            return 8;
        }
        else if(spriteName == 'garbage3'){
            return 9;
        }
        else if(spriteName == 'garbage4'){
            return 10;
        }
        else if(spriteName == 'garbage5'){
            return 11;
        }
        else if(spriteName == 'garbage6'){
            return 12;
        }
    }
});
