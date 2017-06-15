window.FishScore={};

cc.Class({
    extends: cc.Component,

    properties: {
        score:{
            default:null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        this.score.getComponent(cc.Label).string = 0;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onCollisionEnter: function (other, self) {
        for (var i = 0; i < theFishes.length; i++) {
            if(theFishes[i].node === other.node)
            {
                var MyScore = theFishes[i].Floor * theFishes[i].nodeClass;
                cc.log('增加积分' + MyScore);
                this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + MyScore;
                var spriteName = theFishes[i].node.getComponent(cc.Sprite).spriteFrame.name;
                cc.log(spriteName.split('0')[0]);
                FishScore[this.switchSpriteName(spriteName.split('0')[0])] += 1;
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
        else if(spriteName == 'DH_garbage_1'){
            return 7;
        }
        else if(spriteName == 'DH_garbage_2'){
            return 8;
        }
        else if(spriteName == 'DH_garbage_3'){
            return 9;
        }
        else if(spriteName == 'DH_garbage_4'){
            return 10;
        }
        else if(spriteName == 'DH_garbage_5'){
            return 11;
        }
        else if(spriteName == 'DH_garbage_6'){
            return 12;
        }
    }




    
});
