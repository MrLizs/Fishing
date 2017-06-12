var sceneManager = require('SceneManager');
cc.Class({
    extends: cc.Component,

    properties: {
        start_Node:{
            default:null,
            type:cc.Node,
        },
        rule_Node:{
            default:null,
            type:cc.Node,
        },
        RegulationBg_Node:{
            default:null,
            type:cc.Node,
        },
        RankList_Node:{
            default:null,
            type:cc.Node,
        },
        RankListBg_Node:{
            default:null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.start_Node.on(cc.Node.EventType.TOUCH_START,this.clickStartBtn,this);
        this.start_Node.on(cc.Node.EventType.TOUCH_END,this.clickEndStartBtn,this);

        this.rule_Node.on(cc.Node.EventType.TOUCH_START,this.ruleClickStart,this);
        this.rule_Node.on(cc.Node.EventType.TOUCH_END,this.ruleClickEnd,this);

        this.RankList_Node.on(cc.Node.EventType.TOUCH_START,this.RanklistStart,this);
        this.RankList_Node.on(cc.Node.EventType.TOUCH_END,this.RanklistEnd,this);

        cc.FishGame = {};
        cc.FishGame.sceneManager = new sceneManager();
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

    ruleClickStart:function(){
        var self = this;
        cc.loader.loadRes('Login/UI_home_rule_click',cc.SpriteFrame,function(err,spriteFrame){
            self.start_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    ruleClickEnd:function(){
        var self = this;
        cc.loader.loadRes('Login/UI_home_rule',cc.SpriteFrame,function(err,spriteFrame){
            self.start_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        this.RegulationBg_Node.active = true;
    },

    RegulationClose:function(){
        this.RegulationBg_Node.active = false;
    },
    RanklistStart:function(){
        var self = this;
        cc.loader.loadRes('Login/UI_home_ranking_click',cc.SpriteFrame,function(err,spriteFrame){
            self.RankList_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    RanklistEnd:function(){
        var self = this;
        cc.loader.loadRes('Login/UI_home_ranking',cc.SpriteFrame,function(err,spriteFrame){
            self.RankList_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        this.RankListBg_Node.active = true;
    },
    RanklistClose:function(){
        this.RankListBg_Node.active = false;
    },


});
