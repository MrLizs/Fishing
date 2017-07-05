var HTTP = require('HTTP')
var printStr=null;

cc.Class({
    extends: cc.Component,
    properties: {
        shadow_Node:cc.Node,
        score_Label:cc.Label,
        TipsString_Node:cc.Node,
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
                if(i == 0){
                    if(element != 1){
                        cc.log("错误的手机号");
                        phoneNumber = '';
                        break;
                    }
                }
                if(i == 1){
                    if(element > 2 && element < 9){
                    }
                    else{
                        cc.log("错误的手机号");
                        phoneNumber = '';
                        break;
                    }
                }
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
            }
            else{
                this.TipsString();
                phoneNumber = "";
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
    TipsString:function(){
        this.TipsString_Node.active = true;
        setTimeout(function() {
            this.TipsString_Node.active = false;
        }, 2000);
    },

});
