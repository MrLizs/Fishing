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
        this.animationSwitch(this.node);
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
    resetMovePoint: function (_fishNode) {
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

    animationSwitch:function(_fishNode){
        cc.log(_fishNode.getComponent(cc.Sprite).spriteFrame.getTexture().url);
        if(_fishNode.getComponent(cc.Sprite).spriteFrame.getTexture().url == 'res/raw-assets/resources/Fishes/DH_agouti.png'){
            this.SpriteAnimation(_fishNode,"Animcations/hetun/hetun00",10);
        }
        else if(_fishNode.getComponent(cc.Sprite).spriteFrame.getTexture() == 'res/raw-assets/resources/Fishes/DH_bluefishi.png'){
            this.SpriteAnimation(_fishNode,"Animcations/xiaolanyu/xiaolanyu00",10);
        }
        else if(_fishNode.getComponent(cc.Sprite).spriteFrame.getTexture() == 'res/raw-assets/resources/Fishes/DH_crab.png'){
            return;
        }
        else if(_fishNode.getComponent(cc.Sprite).spriteFrame.getTexture() == 'res/raw-assets/resources/Fishes/DH_inkfish.png'){
            this.SpriteAnimation(_fishNode,"Animcations/moyu/moyu00",10);
        }
        else if(_fishNode.getComponent(cc.Sprite).spriteFrame.getTexture() == 'res/raw-assets/resources/Fishes/DH_redfishi.png'){
            this.SpriteAnimation(_fishNode,"Animcations/xiaohongyu/xiaohongyu00",10);
        }
        else if(_fishNode.getComponent(cc.Sprite).spriteFrame.getTexture() == 'res/raw-assets/resources/Fishes/DH_tropicalfish.png'){
            this.SpriteAnimation(_fishNode,"Animcations/redaiyu/redaiyu00",10);
        }
        else if(_fishNode.getComponent(cc.Sprite).spriteFrame.getTexture() == 'res/raw-assets/resources/Fishes/DH_yellowfish.png'){
            this.SpriteAnimation(_fishNode,"Animcations/xiaohuangyu/xiaohuangyu00",10);
        }
        else{
            return;
        }

    },

    SpriteAnimation:function(_fishNode,frameName,_length){
        var animation = this._fishNode.addComponent(cc.Animation);
        var clip;
        for (var i = 0; i < _length; i++) {
            if(i<10){
                clip = cc.AnimationClip.createWithSpriteFrames(frameName+'0'+i,_length);
            }
            else{
                clip = cc.AnimationClip.createWithSpriteFrames(frameName+i,_length);
            }
        }
        clip.name = "anim_run";
        clip.wrapMode = cc.WrapMode.Loop;
        animation.addClip(clip);
        animation.playOnLoad = true;
        // animation.play('anim_run');
    },
});
