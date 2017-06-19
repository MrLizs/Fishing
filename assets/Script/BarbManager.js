window.FishScore={};

cc.Class({
    extends: cc.Component,

    properties: {
        score:{
            default:null,
            type:cc.Node,
        },
        barb_Node:{
            default:null,
            type:cc.Node,
        },
        piggy_Node:{
            default:null,
            type:cc.Node,
            tooltip:'只用于控制小猪的动画',
        },
    },

    // use this for initialization
    onLoad: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        this.score.getComponent(cc.Label).string = '0';
        for (var i = 0; i < 13; i++) {
            FishScore[i] = 0;
        }
        
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    onCollisionEnter: function (other, self) {
        if(this.barb_Node.childrenCount > 1)
        {
            var _fishes =this.barb_Node.children;
            var whatAnim1,whatAnim2=0;
            for(var i = 0 ; i < _fishes.length ; i++)
            {
                if(this.switchSpriteName(_fishes[i].name) < 7)
                {
                    whatAnim1++;
                }
                else
                {
                    whatAnim2++;
                }
                
            }
            if(whatAnim1 > 0 && whatAnim2 > 0)
            {
                this.piggy_Node.getComponent(cc.Animation).play('piggy');
            }
            else if(whatAnim1 > 0){
                this.piggy_Node.getComponent(cc.Animation).play('piggy2');
            }
            else if(whatAnim2 > 0){
                this.piggy_Node.getComponent(cc.Animation).play('piggy3');
            }
        }
        else
        {
            if(this.switchSpriteName(other.node.name) < 7)
            {
                this.piggy_Node.getComponent(cc.Animation).play('piggy2');
            }
            else
            {
                this.piggy_Node.getComponent(cc.Animation).play('piggy3');
            }
        }

        for (var i = 0; i < theFishes.length; i++) {
            if(theFishes[i].node === other.node)
            {
                var MyScore = theFishes[i].Floor * theFishes[i].nodeClass;
                cc.log('增加积分' + MyScore);
                this.score.getComponent(cc.Label).string = parseInt(this.score.getComponent(cc.Label).string) + MyScore;
                // var spriteName = theFishes[i].node.getComponent(cc.Sprite).spriteFrame.name;
                var switchNum = this.switchSpriteName(theFishes[i].node.name);
                FishScore[switchNum] += 1;
                if(switchNum < 7)
                {
                    FishNum--;
                }
                else
                {
                    GarbageNum--;
                }
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
        else if(spriteName == 'garbage1'){
            return 7;
        }
        else if(spriteName == 'garbage2'){
            return 8;
        }
        else if(spriteName == 'garbage3'){
            return 9;
        }
        else if(spriteName == 'garbage4'){
            return 10;
        }
        else if(spriteName == 'garbage5'){
            return 11;
        }
        else if(spriteName == 'garbage6'){
            return 12;
        }
    }




    
});
