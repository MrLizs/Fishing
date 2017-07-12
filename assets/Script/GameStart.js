var HTTP = require('HTTP');
window.phoneNumber = '';
window.synchroFriends = '';

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

        // phoneNumber = '13'
        // for (var i = 0; i < 9; i++) {
        //     phoneNumber += Math.round(Math.random() * 9);
        // }
        // cc.log("随机手机号: " + phoneNumber);
        // phoneNumber = '13419695310';
        this.loadPhone();
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    loadPhone:function(){
        var nums=0;
        var phonenums = window.location.search;
        var phonestr = phonenums.split('=')[0].split('?')[1];
        cc.log("phonestr:"+phonestr);
        if(phonestr == 'phone'){
            phonenums = phonenums.split('=')[1];
            if(phonenums.length == 11){
                for (var i = 0; i < phonenums.length; i++) {
                    var element = phonenums.split('');
                    if(this.isNumber(element) == true){
                        cc.log('phone is false')
                        break;
                    }
                    nums++;
                }
            }
            if(nums == 11){
                phoneNumber = phonenums;
                console.log('phone input right : ' + phoneNumber);
                this.friendSynchronization();
            }
            cc.log(phonenums);
        }
    },
    friendSynchronization:function(){
        var cb = {
        "cmd":"friend/synchroFriends",
            "data":{"phone":phoneNumber}
        };
        if(phoneNumber != '')
        {
            HTTP.sendobj(cb,6);
        }
    },
    
    clickStartBtn:function(){
        var self = this;
        cc.loader.loadRes('Login/UI_home_start_click',cc.SpriteFrame,function(err,spriteFrame){
            self.start_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });

    },
    clickEndStartBtn:function(){
        // var self = this;
        // cc.loader.loadRes('Login/UI_home_start',cc.SpriteFrame,function(err,spriteFrame){
        //     self.start_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
        cc.director.loadScene('FishingLoading');
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
        // cc.game.end();
        // var self = this;
        // cc.loader.loadRes('Login/UI_home_exit',cc.SpriteFrame,function(err,spriteFrame){
        //     self.gameExitBtn_Node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
    },
    isNumber :function(value) {
        var patrn =  /^\+?[0-9]*$/;
        if (patrn.exec(value) == null || value == "") {
            return false
        } else {
            return true
        }
    },
});
