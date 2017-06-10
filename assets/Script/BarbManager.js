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
                var MyScore = theFishes[i].Floor * (theFishes[i].nodeClass * 10)
                cc.log('增加积分' + MyScore);
                this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + MyScore;
                // if(theFishes[i].Floor === 1)
                // {
                //     this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + theFishes[i].nodeClass*10;
                //     cc.log('第1层,类型'+theFishes[i].nodeClass);
                // }
                // else if(theFishes[i].Floor === 2)
                // {
                //     this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + theFishes[i].nodeClass*10;
                //     cc.log('第2层,类型'+theFishes[i].nodeClass);
                // }
                // else if(theFishes[i].Floor === 3)
                // {
                //     this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + theFishes[i].nodeClass*10;
                //     cc.log('第3层,类型'+theFishes[i].nodeClass);
                // }
            }
        }
    },




    
});
