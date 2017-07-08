var HTTP = require("HTTP");
window.CouponCB = null;

cc.Class({
    extends: cc.Component,

    properties: {
        score_Label:cc.Label,
        inputEdit_Node:cc.EditBox,
        TipsString_Node:cc.Node,
        shadow_Node:cc.Node,
    },

    onLoad: function () {
        this.shadow_Node.active = true;
        this.requestCouponMessage();
    },

    requestCouponMessage:function(){
        var cb = {
            "cmd":"fish/queryCanTakeCoupon",
            "data":{
                "phone":phoneNumber,
                "scoreNum": this.score_Label.string
            }
        };
        if(phoneNumber != ''){
            HTTP.sendobj(cb,7);
            var self = this;
            var interval = setInterval(function(){
                self.responseCouponMessage(interval);
            });
        }

    },
    responseCouponMessage:function(interval){
        if(CouponCB){
            clearInterval(interval);
            if(CouponCB.data){
                cc.log('查询到优惠券...');
            }
            else
            {
                cc.log('该用户不存在!');
            }
        }
    },

    getreward:function(){
        if(phoneNumber == '')
        {
            this.clickPhone();
        }
        else
        {
            cc.log('这里发送领取奖励消息');
        }
    },

    clickPhone:function(){
        var printStr = this.node.getChildByName('phoneNumberEditBox').getComponent(cc.EditBox).string;
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
                this.openURL();
            }
            else{
                this.TipsString();
                phoneNumber = "";
            }
            cc.log("输入的是:"+printStr);
        }
        else{
            this.TipsString();
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
        var self = this;
        setTimeout(function() {
            self.TipsString_Node.active = false;
        }, 2000);
    },
    openURL:function(){
        cc.Application.getInstance().openURL("www.izxcs.com/zxcs.html");
    },

    closeReward:function(){
        this.shadow_Node.active = false;
        this.node.active = false;
    },
});
