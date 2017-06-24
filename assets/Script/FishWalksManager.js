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
        this.speed = 1 + Math.random() * 2;
        if(this.node.x < 0){
            this.sroll = 'right';
        }
        else{
            this.sroll = 'left';
            this.node.width = -this.node.width;
        }
        this.Catchup = false;
        
        // this.node.getComponent(cc.BoxCollider).size = this.node.size;
        // if(this.switchSpriteName(this.node.name) < 7)
        // {
        //     if(this.sroll == 'left')
        //     this.node.getComponent(cc.BoxCollider).offset.x = (this.node.width / 2);
        // }
        // this.node.getComponent(cc.BoxCollider).offset.y = this.node.height / 2;
        
        // this.node.getComponent(cc.BoxCollider).size.width = this.node.width;
        // this.node.getComponent(cc.BoxCollider).size.height = this.node.height;
        // cc.log(this.node.getComponent(cc.BoxCollider).size);
        // cc.log(this.node.getComponent(cc.BoxCollider).offset);

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
            //旋转鱼节点
            var switchNum = this.switchSpriteName(this.node.name);
            if(switchNum < 7)
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
            // cc.log(this.node.getComponent(cc.BoxCollider).offset.x);
        }
        if(this.node.x <= -500)
        {
            this.sroll = 'right';
            // cc.log(this.node.getComponent(cc.BoxCollider).offset.x);
        }
        if(this.sroll == 'right')
        {
            this.node.x += this.speed * walkSpeed;
            this.node.width = -1 * Math.abs(this.node.width);
            if(this.switchSpriteName(this.node.name) < 7)
            {
                this.node.getComponent(cc.BoxCollider).offset.x = -1 * Math.abs(this.node.width / 2);
            }
        }
        if(this.sroll == 'left')
        {
            this.node.x -= this.speed * walkSpeed;
            this.node.width = Math.abs(this.node.width);
            if(this.switchSpriteName(this.node.name) < 7)
            {
                this.node.getComponent(cc.BoxCollider).offset.x = Math.abs(this.node.width / 2);
            }
        }
    },

    /**
     * 鱼本体碰撞
     * 销毁鱼节点
     */
    onCollisionEnter: function (other, self) {
        var self = this;
        if(other.node.name == 'DH_barb')
        {
            this.Catchup = true;
            this.BarbNode = other.node;

            self.node.parent = other.node;
            self.node.x = 0;
            self.node.y = 0;
        }
        
        var switchNum = this.switchSpriteName(this.node.name);
        if(switchNum < 7)
        {
            self.node.getComponent(cc.Animation).stop();
        }
        
        switch (switchNum) {
            case 0:
                cc.loader.loadRes('DeadFishes/DH_agouti',cc.SpriteFrame,function(err,spriteFrame){
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                break;
            case 1:
                cc.loader.loadRes('DeadFishes/DH_bluefishi',cc.SpriteFrame,function(err,spriteFrame){
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                break;
            case 2:
                // cc.loader.loadRes('DeadFishes/',cc.SpriteFrame,function(err,spriteFrame){
                //     self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // });
                break;
            case 3:
                cc.loader.loadRes('DeadFishes/DH_inkfish',cc.SpriteFrame,function(err,spriteFrame){
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                break;
            case 4:
                cc.loader.loadRes('DeadFishes/DH_redfishi',cc.SpriteFrame,function(err,spriteFrame){
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                break;
            case 5:
                cc.loader.loadRes('DeadFishes/DH_tropicalfish',cc.SpriteFrame,function(err,spriteFrame){
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                break;
            case 6:
                cc.loader.loadRes('DeadFishes/DH_yellowfish',cc.SpriteFrame,function(err,spriteFrame){
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                });
                break;
            default:
                break;
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
