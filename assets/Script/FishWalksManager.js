
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

    onLoad: function(){
        // this.speed = 1 + Math.random() * 2;
        if(this.node.x < 0){
            this.sroll = 'right';
        }
        else{
            this.sroll = 'left';
            this.node.width = -this.node.width;
        }
        this.Catchup = false;

        for (var i = 0; i < theFishes.length; i++) {
            var element = theFishes[i];
            if(element){
                if(element.node){
                    if(element.node == this.node){
                        this.speed = element.speed;
                    }
                }
            }
        }
        // cc.log("本大爷的速度" + this.speed);
    },

    update:function(){
        this.fishMove();
        // if(TimeIsOver === true)
        // {
        //     this.node.destroy();
        // }
    },

    /**
     * 钓起状态与移动状态判断
     */
    fishMove:function(){
        if(this.Catchup == false)
        {
            this.resetMovePoint();
        }
        else if(this.Catchup == true){
            if(this.BarbNode){
                if(this.node.parent){
                    if(this.node.parent.name == 'DH_boat'){
                        this.node.x = this.node.parent.getPositionX();
                    }
                }
            }
            //旋转鱼节点
            var switchNum = this.switchSpriteName(this.node.name);
            if(switchNum < 7){
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
            this.destroySelf();
            // cc.log(this.node.getComponent(cc.BoxCollider).offset.x);
        }
        if(this.node.x <= -500)
        {
            this.sroll = 'right';
            this.destroySelf();
            // cc.log(this.node.getComponent(cc.BoxCollider).offset.x);
        }
        if(this.sroll == 'right')
        {
            this.node.x += this.speed * cc.director.getDeltaTime();
            this.node.width = -1 * Math.abs(this.node.width);
            if(this.switchSpriteName(this.node.name) < 7)
            {
                this.node.getComponent(cc.BoxCollider).offset.x = -1 * Math.abs(this.node.width / 2);
            }
        }
        if(this.sroll == 'left')
        {
            this.node.x -= this.speed * cc.director.getDeltaTime();
            this.node.width = Math.abs(this.node.width);
            if(this.switchSpriteName(this.node.name) < 7)
            {
                this.node.getComponent(cc.BoxCollider).offset.x = Math.abs(this.node.width / 2);
            }
        }
    },
    /**
     * 删除自己
     */
     destroySelf:function(){
        for (var i = 0; i < theFishes.length; i++) {
            var element = theFishes[i];
            if(element.node == this.node){
                this.node.destroy();
                theFishes.splice(i,1);
                break;
            }
        }
     },

     onDestroy(){
        var theisWhat = this.switchSpriteName(this.node.name);
        if(theisWhat > 6){
            --GarbageNum;
        }else{
            --FishNum;
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
