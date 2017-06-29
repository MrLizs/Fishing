var HTTP = require('HTTP')
var printStr=null;

cc.Class({
    extends: cc.Component,
    properties: {
        shadow_Node:cc.Node,
        score_Label:cc.Label,
    },
    onLoad: function () {

    },
    closeTips:function(){
        this.node.active = false;
        // this.shadow_Node.active = false;
        isPrintPhone = 1;
    },
    clickPhone:function(){
        printStr = this.node.getChildByName('number').getComponent(cc.EditBox).string;
        if(printStr.length===11)
        {
            var t=0;
            for (var i = 0; i < 11; i++) {
                var element = printStr.split("")[i];
                if(this.isNumber(element) == false){
                    cc.log("输入错误:"+printStr);
                    isPrintPhone = 2;
                    break;
                }else{
                    ++t;
                }
            }
            if(t==11)
            {
                phoneNumber = printStr;
                this.shadow_Node.active = false;
                isPrintPhone = 1;
                this.GameSettlement(phoneNumber);
            }
            cc.log("输入的是:"+printStr);
        }
    },
    isNumber :function(value) {
        var patrn =  /^\+?[0-9]*$/;
        if (patrn.exec(value) == null || value == "") {
            return false
        } else {
            return true
        }
    },
    /**
     * 游戏结算消息接口
     */
    GameSettlement:function(_phoneNumber){
        var scorenum = this.score_Label.string;
        isSendEnd = true;
        var cb = {
            "cmd":"fish/insertFishUserScore",
            "data":{
                "phone" : _phoneNumber,
                "scoreNum" : scorenum
            }
        };
        if(scorenum > 0 && phoneNumber != '')
        {
            HTTP.sendobj(cb,2);
        }
    },
});
