var HTTP = require('HTTP');
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
            type:cc.Node,
        },
        targetScore_Node:{
            default:null,
            type:cc.Label,
        },
        HistoryHightest_Anim:{
            default:null,
            type:cc.Node,
        },
        subtraction_Node:{
            default:null,
            type:cc.Node,
        },
        subtraction2_Node:{
            default:null,
            type:cc.Node,
        },
        thousandRanking_Node:cc.Node,
    },

    onLoad: function () {
        this.sendRequestSelfCB();
        this.requestMaxScore();
        this.score_Label.string = this.targetScore_Node.string;
        var self = this;
        var interval = setInterval(function(){
            self.showScoreAndRankings(interval)
        },200);
        var interval1 = setInterval(function(){
            self.showMaxScore(interval1)
        },200);
        this.viewItemsNums();
        if(phoneNumber == '')
        {
            this.MaxScore_Label.string = this.targetScore_Node.string;
            this.HistoryHightest_Anim.active = true;
            this.HistoryHightest_Anim.getComponent(cc.Animation).play();
        }
    },
    sendRequestSelfCB:function(){
        var score = this.targetScore_Node.string;
        cc.log('现在分数:'+score);
        var cb = {
            "cmd":"fish/queryBigThenThisScoreNum",
            "data":{
                "scoreNum": score
            }
        };
        if(score>0)
        {
            HTTP.sendobj(cb,4);
        }
    },
    requestMaxScore:function(){
        var cb = {
            "cmd":"fish/findUserMaxScore",
            "data":{
                "phone": phoneNumber
            }
        };
        if(phoneNumber != ''){
            HTTP.sendobj(cb,5)
        }
    },
    showScoreAndRankings:function(interval){
        if(ScoreSelectRankings)
        {
            clearInterval(interval);
            if(ScoreSelectRankings.data){
                if(ScoreSelectRankings.data.bigNum > 999){
                    this.ranking_Label.active = false;
                    this.thousandRanking_Node.active = true;
                }
                else{
                    this.ranking_Label.getComponent(cc.Label).string = '' + ScoreSelectRankings.data.bigNum;
                }
            }
        }
    },
    showMaxScore:function(interval){
        if(UserMaxScore)
        {
            clearInterval(interval);
            this.MaxScore_Label.string = '' + UserMaxScore;
            if(parseInt(this.targetScore_Node.string) >= parseInt(this.MaxScore_Label.string)){
                this.MaxScore_Label.string = '' + parseInt(this.targetScore_Node.string);
                this.HistoryHightest_Anim.active = true;
                this.HistoryHightest_Anim.getComponent(cc.Animation).play();
            }
            else{
                this.HistoryHightest_Anim.active = false;
            }
        }
        if(UserMaxScore == 0){
            clearInterval(interval);
            this.MaxScore_Label.string = this.targetScore_Node.string;
            this.HistoryHightest_Anim.active = true;
            this.HistoryHightest_Anim.getComponent(cc.Animation).play();
        }
        if(parseInt(this.targetScore_Node.string) < 0){
            clearInterval(interval);
            this.subtraction2_Node.active = true;
            this.ranking_Label.active = false;
            this.thousandRanking_Node.active = true;
        }
    },

    update: function (dt){
        if(this.HistoryHightest_Anim.activeInHierarchy)
        {
            if(this.HistoryHightest_Anim.getComponent(cc.Animation).getAnimationState('HistoryHightest').isPlaying === false)
            {
                cc.director.pause();
            }
        }
        
    },

    backMainSceneClick:function(){
        var self = this;
        cc.loader.loadRes('GameSettlement/UI_account_back_click',cc.SpriteFrame,function(err,spriteFrame){
            self.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_back').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    backMainScene:function(){
        var self = this;
        cc.loader.loadRes('GameSettlement/UI_account_back',cc.SpriteFrame,function(err,spriteFrame){
            self.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_back').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        this.shadow_Node.active = false;
        this.node.active = false;
        cc.director.loadScene('Fishing');
    },
    gameAgainClick:function(){
        var self = this;
        cc.loader.loadRes('GameSettlement/UI_account_again_click',cc.SpriteFrame,function(err,spriteFrame){
            self.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_again').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
    gameAgain:function(){
        var self = this;
        // cc.loader.loadRes('GameSettlement/UI_account_again',cc.SpriteFrame,function(err,spriteFrame){
        //     self.node.getChildByName('UI_basis_bottom').getChildByName('UI_account_again').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
        TimeIsOver = false;
        this.shadow_Node.active = false;
        this.node.active = false;
        cc.director.loadScene('FishingGame');
    },
    viewItemsNums:function(){
        if(this.targetScore_Node.string < 0){
            this.subtraction_Node.active = true;
        }
        else{
            this.subtraction_Node.active = false;
        }

        this.fishNum_parentNode.getChildByName('nums1').getComponent(cc.Label).string = FishScore[0];
        this.fishNum_parentNode.getChildByName('nums2').getComponent(cc.Label).string = FishScore[1];
        this.fishNum_parentNode.getChildByName('nums3').getComponent(cc.Label).string = FishScore[3];
        
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

});
