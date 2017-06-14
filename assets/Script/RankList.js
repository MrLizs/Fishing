var HTTP = require('HTTP');
cc.Class({
    extends: cc.Component,

    properties: {
        rankListContent_Node:{
            default:null,
            type:cc.Node,
        },
        rankContentItem_Prefab:{
            default:null,
            type:cc.Prefab,
        },
    },

    // use this for initialization
    onLoad: function () {

        var cb = {
            cmd:"fish/queryScoreDescPage",
            data:{
                page : 1,
                size : 1
            }
        };
        HTTP.send(cb);
        
        this.loadDataBase();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },


    loadDataBase:function(){
        this.rankListContent_Node.height = 100 * 80;
        for (var i = 0; i < 100; i++) {
            var itme = cc.instantiate(this.rankContentItem_Prefab);
            itme.y = -(i * 80);
            this.rankListContent_Node.addChild(itme);
            itme.getChildByName('Ranking').getComponent(cc.Label).string = '' + i+1;
            itme.getChildByName('UserName').getComponent(cc.Label).string = '玩家' + i;
            itme.getChildByName('Score').getComponent(cc.Label).string = '' + Math.round(Math.random() * 100);
            itme.getChildByName('GameOverTime').getComponent(cc.Label).string = '' + this.timeDispose();
        }
    },

    timeDispose:function(){
        var y =  Math.round(Math.random() * 17)
        var year;
        if(y<10)
        {
            year = '200' + y;
        }
        else
        {
            year = '20' + y;
        }

        var Month = Math.round(Math.random() * 12);
        var day = Math.round(Math.random() * 31);
        var hour = Math.round(Math.random() * 24);
        var minute = Math.round(Math.random() * 60);
        var YMDTime = year+'-'+Month+'-'+day+'    '+hour+':'+minute;
        return YMDTime;
    }
});
