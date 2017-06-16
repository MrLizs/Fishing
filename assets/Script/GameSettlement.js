var HTTP = require('HTTP');
window.ScoreSelectRankings = null;
cc.Class({
    extends: cc.Component,

    properties: {
        shadow_Node:{
            default:null,
            type:cc.Node,
        },
        fishNum_parentNode:{
            default:null,
            type:cc.Node,
        },
        garbNum_parentNode:{
            default:null,
            type:cc.Node,
        },
        MaxScore_Label:{
            default:null,
            type:cc.Label,
        },
        score_Label:{
            default:null,
            type:cc.Label,
        },
        ranking_Label:{
            default:null,
            type:cc.Label,
        },
        targetScore_Node:{
            default:null,
            type:cc.Label,
        },
    },

    onLoad: function () {
        this.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_back').on(cc.Node.EventType.TOUCH_START,this.backMainSceneClick,this);
        this.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_back').on(cc.Node.EventType.TOUCH_END,this.backMainScene,this);
        this.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_again').on(cc.Node.EventType.TOUCH_START,this.gameAgainClick,this);
        this.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_again').on(cc.Node.EventType.TOUCH_END,this.gameAgain,this);

        this.viewItemsNums();
        this.score_Label.string = this.targetScore_Node.string;

        this.sendRequestSelfCB();
        this.schedule(this.showSelfRankings,0.1);
        //this.MaxScore_Label.string = HTTP.inquireUserMaxScore();
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
        TimeIsOver = false;
        this.shadow_Node.active = false;
        this.node.active = false;
        cc.director.loadScene('FishingGame');
    },

    viewItemsNums:function(){
            this.fishNum_parentNode.getChildByName('nums1').getComponent(cc.Label).string = FishScore[0];
            this.fishNum_parentNode.getChildByName('nums2').getComponent(cc.Label).string = FishScore[1];
            this.fishNum_parentNode.getChildByName('nums3').getComponent(cc.Label).string = FishScore[2];
            
            this.fishNum_parentNode.getChildByName('nums4').getComponent(cc.Label).string = FishScore[4];
            this.fishNum_parentNode.getChildByName('nums5').getComponent(cc.Label).string = FishScore[5];
            this.fishNum_parentNode.getChildByName('nums6').getComponent(cc.Label).string = FishScore[6];

            this.garbNum_parentNode.getChildByName('nums1').getComponent(cc.Label).string = FishScore[7];
            this.garbNum_parentNode.getChildByName('nums2').getComponent(cc.Label).string = FishScore[8];
            this.garbNum_parentNode.getChildByName('nums3').getComponent(cc.Label).string = FishScore[9];
            this.garbNum_parentNode.getChildByName('nums4').getComponent(cc.Label).string = FishScore[10];
            this.garbNum_parentNode.getChildByName('nums5').getComponent(cc.Label).string = FishScore[11];
            this.garbNum_parentNode.getChildByName('nums6').getComponent(cc.Label).string = FishScore[12];
    },
    sendRequestSelfCB:function(){
        var score = this.targetScore_Node.string;
        var cb = {
            "cmd":"fish/queryBigThenThisScoreNum",
            "data":{
                "scoreNum": score
            }
        };
        HTTP.sendobj(cb,4);
    },
    showSelfRankings:function(){
        if(ScoreSelectRankings.data != null){
            this.unschedule(this.showSelfRankings,this);
            cc.log(ScoreSelectRankings.data);
            this.ranking_Label.string = ScoreSelectRankings.data;
        }
    }

});
