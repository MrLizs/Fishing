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
        clip1:cc.AnimationClip,
        clip2:cc.AnimationClip,
        clip3:cc.AnimationClip,
        clip4:cc.AnimationClip,
        clip5:cc.AnimationClip,
        clip6:cc.AnimationClip,
        clip7:cc.AnimationClip,
    },

    onLoad: function () {
        this.speed = Math.random() * 3;
        this.sroll = 'right';
        this.Catchup = false;
        this.randFishSpriteFrame();
        this.animationSwitch();
        // this.node.getComponent(cc.Animation).play();
    },

    update:function(){
        this.fishMove();
    },
    fishMove:function(){
        if(this.Catchup == false)
        {
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
                    }
                }
            }
        }
    },
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

    animationSwitch:function(){
        // if(this.node.getComponent(cc.Amiation).getClips())
        // {
        //     for (var i = 0; i < this.node.getComponent(cc.Amiation).getClips().length; i++) {
        //         var element = this.node.getComponent(cc.Amiation).getClips()[i];
        //         this.node.getComponent(cc.Amiation).removeClip(element,this);
        //     }
        // }

        cc.log("动画前" + this.node.getComponent(cc.Sprite).spriteFrame.name);

        if(this.node.getComponent(cc.Sprite).spriteFrame.name == 'DH_agouti'){
            // this.SpriteAnimation(this.node,"Animcations/hetun");
            this.node.getComponent(cc.Animation).defaultClip = this.clip1;
        }
        else if(this.node.getComponent(cc.Sprite).spriteFrame.name == 'DH_bluefishi'){
            // this.SpriteAnimation(this.node,"Animcations/xiaolanyu");
            this.node.getComponent(cc.Animation).defaultClip = this.clip2;
        }
        else if(this.node.getComponent(cc.Sprite).spriteFrame.name == 'DH_crab'){
            return;
        }
        else if(this.node.getComponent(cc.Sprite).spriteFrame.name == 'DH_inkfish'){
            // this.SpriteAnimation(this.node,"Animcations/moyu");
            this.node.getComponent(cc.Animation).defaultClip = this.clip4;
        }
        else if(this.node.getComponent(cc.Sprite).spriteFrame.name == 'DH_redfishi'){
            // this.SpriteAnimation(this.node,"Animcations/xiaohongyu");
            this.node.getComponent(cc.Animation).defaultClip = this.clip5;
        }
        else if(this.node.getComponent(cc.Sprite).spriteFrame.name == 'DH_tropicalfish'){
            // this.SpriteAnimation(this.node,"Animcations/redaiyu");
            this.node.getComponent(cc.Animation).defaultClip = this.clip6;
        }
        else if(this.node.getComponent(cc.Sprite).spriteFrame.name == 'DH_yellowfish'){
            // this.SpriteAnimation(this.node,"Animcations/xiaohuangyu");
            this.node.getComponent(cc.Animation).defaultClip = this.clip7;
        }
        else{
            // return;
        }
    },

    SpriteAnimation:function(frameName){
        var self = this;
        cc.loader.loadRes(frameName, function (err, clip) {
            self.node.addComponent(cc.Animation).addClip(clip);
        });
    },

    randFishSpriteFrame: function () {
        var self = this;
        var rand = Math.random() * 7;

        // 新刷出来的鱼被钓起时此处报错。
        if(self.node.getComponent(cc.Sprite).spriteFrame == null)
        {
            self.node.addComponent(cc.Sprite);
        }
        else
        {
        }
        
        if(rand < 1)
        {
            cc.loader.loadRes('Fishes/DH_agouti',cc.SpriteFrame,function(err,spriteFrame){
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // cc.log(self.node.getComponent(cc.Sprite).spriteFrame);
                self.node.width = -189;
                self.node.height = 166;
                self.randNodeClass(1);
            });
        }
        else if(rand < 2)
        {
            cc.loader.loadRes('Fishes/DH_bluefishi',cc.SpriteFrame,function(err,spriteFrame){
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // cc.log(self.node.getComponent(cc.Sprite).spriteFrame);
                self.node.width = -163;
                self.node.height = 121;
                self.randNodeClass(2);
            });
        }
        else if(rand < 3)
        {
            cc.loader.loadRes('Fishes/DH_crab',cc.SpriteFrame,function(err,spriteFrame){
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // cc.log(self.node.getComponent(cc.Sprite).spriteFrame);
                self.node.width = -172;
                self.node.height = 164;
                self.randNodeClass(3);
            });
        }
        else if(rand < 4)
        {
            cc.loader.loadRes('Fishes/DH_inkfish',cc.SpriteFrame,function(err,spriteFrame){
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // cc.log(self.node.getComponent(cc.Sprite).spriteFrame);
                self.node.width = -124;
                self.node.height = 131;
                self.randNodeClass(4);
            });
        }
        else if(rand < 5)
        {
            cc.loader.loadRes('Fishes/DH_redfishi',cc.SpriteFrame,function(err,spriteFrame){
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // cc.log(self.node.getComponent(cc.Sprite).spriteFrame);
                self.node.width = -332;
                self.node.height = 114;
                self.randNodeClass(5);
            });
        }
        else if(rand < 6)
        {
            cc.loader.loadRes('Fishes/DH_tropicalfish',cc.SpriteFrame,function(err,spriteFrame){
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // cc.log(self.node.getComponent(cc.Sprite).spriteFrame);
                self.node.width = -138;
                self.node.height = 144;
                self.randNodeClass(6);
            });
        }
        else if(rand < 7)
        {
            cc.loader.loadRes('Fishes/DH_yellowfish',cc.SpriteFrame,function(err,spriteFrame){
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // cc.log(self.node.getComponent(cc.Sprite).spriteFrame);
                self.node.width = -245;
                self.node.height = 129;
                self.randNodeClass(7);
            });
        }
        else
        {
            cc.loader.loadRes('garbage/DH_garbage_2', cc.SpriteFrame, function (err, spriteFrame) {
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            self.randNodeClass(-1);
        }
        if(self.node.getComponent(cc.BoxCollider) !=null)
        {
            self.node.getComponent(cc.BoxCollider).size = new cc.size(Math.abs(self.node.width), Math.abs(self.node.height));
        }
        else
        {
            self.node.addComponent(cc.BoxCollider).size = new cc.size(Math.abs(self.node.width), Math.abs(self.node.height));
        }
        self.node.group = "Fishing";
        self.node.rotation = 0;
        
        cc.log("加载动画后" + this.node.getComponent(cc.Sprite).spriteFrame.name);
        // self.node.addComponent(cc.BoxCollider);
    },

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
