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
                theFishes[i].node.destroy();
                theFishes[i]=null;
                cc.log('对象已销毁');
                break;
            }
            
        }
    },




    
});
