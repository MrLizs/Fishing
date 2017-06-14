cc.Class({
    extends: cc.Component,

    properties: {
        shadow_Node:{
            default:null,
            type:cc.Node,
        },
    },

    onLoad: function () {
        this.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_back').on(cc.Node.EventType.TOUCH_START,this.backMainSceneClick,this);
        this.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_back').on(cc.Node.EventType.TOUCH_END,this.backMainScene,this);
        this.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_again').on(cc.Node.EventType.TOUCH_START,this.gameAgainClick,this);
        this.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_again').on(cc.Node.EventType.TOUCH_END,this.gameAgain,this);
    },

    backMainSceneClick(){
        var self = this;
        cc.loader.loadRes('GameSettlement/UI_account_back_click',cc.Sprite,function(err,spriteFrame){
            self.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_back').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    backMainScene(){
        var self = this;
        cc.loader.loadRes('GameSettlement/UI_account_back',cc.Sprite,function(err,spriteFrame){
            self.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_back').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        this.shadow_Node.active = false;
        this.node.active = false;
        cc.director.loadScene('Fishing');
    },

    gameAgainClick(){
        var self = this;
        cc.loader.loadRes('GameSettlement/UI_account_again_click',cc.Sprite,function(err,spriteFrame){
            self.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_again').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    gameAgain(){
        var self = this;
        cc.loader.loadRes('GameSettlement/UI_account_again',cc.Sprite,function(err,spriteFrame){
            self.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_again').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        this.shadow_Node.active = false;
        this.node.active = false;
        cc.director.loadScene('FishingGame');
    },
});
