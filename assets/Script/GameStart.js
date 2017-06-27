var HTTP = require('HTTP');
window.phoneNumber = '';

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
        gameExitBtn_Node:{
            default:null,
            type:cc.Node,
        },
        shadow_Node:{
            default:null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        // this.start_Node.on(cc.Node.EventType.TOUCH_START,this.clickStartBtn,this);
        // this.start_Node.on(cc.Node.EventType.TOUCH_END,this.clickEndStartBtn,this);

        // this.rule_Node.on(cc.Node.EventType.TOUCH_START,this.ruleClickStart,this);
        // this.rule_Node.on(cc.Node.EventType.TOUCH_END,this.ruleClickEnd,this);

        // this.RankList_Node.on(cc.Node.EventType.TOUCH_START,this.RanklistStart,this);
        // this.RankList_Node.on(cc.Node.EventType.TOUCH_END,this.RanklistEnd,this);

        // this.gameExitBtn_Node.on(cc.Node.EventType.TOUCH_START,this.ExitClick,this);
        // this.gameExitBtn_Node.on(cc.Node.EventType.TOUCH_END,this.ExitGame,this);

        phoneNumber = '13'
        for (var i = 0; i < 9; i++) {
            phoneNumber += Math.round(Math.random() * 9);
        }
        cc.log("随机手机号: " + phoneNumber);
        // phoneNumber = '13419695310';

        cc.director.preloadScene('FishingGame');

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
        // cc.loader.loadRes('Login/UI_home_start',cc.SpriteFrame,function(err,spriteFrame){
        //     self.start_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
        cc.director.loadScene('FishingGame');
    },

    ruleClickStart:function(){
        var self = this;
        cc.loader.loadRes('Login/UI_home_rule_click',cc.SpriteFrame,function(err,spriteFrame){
            self.rule_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    ruleClickEnd:function(){
        var self = this;
        // cc.loader.loadRes('Login/UI_home_rule',cc.SpriteFrame,function(err,spriteFrame){
        //     self.rule_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
        this.shadow_Node.active = true;
        this.RegulationBg_Node.active = true;
    },

    RegulationClose:function(){
        this.shadow_Node.active = false;
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
        // cc.loader.loadRes('Login/UI_home_ranking',cc.SpriteFrame,function(err,spriteFrame){
        //     self.RankList_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
        this.shadow_Node.active = true;
        this.selectRankings();
    },
    RanklistClose:function(){
        this.shadow_Node.active = false;
        this.RankListBg_Node.active = false;
    },

    ExitClick:function(){
        var self = this;
        cc.loader.loadRes('Login/UI_home_exit_click',cc.SpriteFrame,function(err,spriteFrame){
            self.gameExitBtn_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    ExitGame:function(){
        cc.game.end();
        // var self = this;
        // cc.loader.loadRes('Login/UI_home_exit',cc.SpriteFrame,function(err,spriteFrame){
        //     self.gameExitBtn_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
    },



});
