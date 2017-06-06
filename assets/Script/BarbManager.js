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
            cc.log(theFishes[i].node);
            cc.log(other.node);
            if(theFishes[i].node === other.node)
            {
                theFishes[i].fishCollisions = true;
                //theFishes[i].node.moveTo(self.node.x,self.node.y);
                if(theFishes[i].Floor === 1)
                {
                    this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + 10;
                }
                else if(theFishes[i].Floor === 2)
                {
                    this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + 30;
                }
                else if(theFishes[i].Floor === 3)
                {
                    this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + 50;
                }
                theFishes[i].node.active = false;
                
                //theFishes[i]=null;
                //cc.log('对象已销毁');
                //break;
            }
            
        }
    },




    
});
