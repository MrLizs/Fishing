cc.Class({
    extends: cc.Component,

    properties: {
        start_Node:{
          default:null,
          type:cc.Node,
        },
        RegulationBg_Node:{
            default:null,
            type:cc.Node,
        }
    },

    // use this for initialization
    onLoad: function () {
        this.start_Node.on(cc.Node.EventType.TOUCH_START,this.clickStartBtn,this);
        this.start_Node.on(cc.Node.EventType.TOUCH_END,this.clickEndStartBtn,this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    clickStartBtn:function(){
        var self = this;
        cc.loader.loadRes('Login/UI_home_start_click',cc.SpriteFrame,function(err,spriteFrame){
            self.start_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

    },
    clickEndStartBtn:function(){
        var self = this;
        cc.loader.loadRes('Login/UI_home_start',cc.SpriteFrame,function(err,spriteFrame){
            self.start_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.director.loadScene('FishingGame');
    },
    RegulationOpen:function(){
        this.RegulationBg_Node.active = true;
    },
    RegulationClose:function(){
        this.RegulationBg_Node.active = false;
    },

});
