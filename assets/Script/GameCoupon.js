var HTTP = require("HTTP");
window.CouponCB = null;
var CouponID = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        score_Label:cc.Label,
        inputEdit_Node:cc.EditBox,
        TipsString_Node:cc.Node,
        shadow_Node:cc.Node,
        couponAmount_Label:cc.Label,
        couponAmountMin_Label:cc.Label,
        couponName_Label:cc.Label,
        couponEndTime_Label:cc.Label,
        couponEndTime_Node:cc.Node,
    },

    onLoad: function () {
        this.shadow_Node.active = true;
        if(phoneNumber != ''){
            this.node.getChildByName("phoneNumberEditBox").active = false;
            this.node.getChildByName('receive1').x = 0;
        }
        else{
            this.node.getChildByName("phoneNumberEditBox").active = true;
            this.node.getChildByName('receive1').x = 128;
        }
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
        else{
            this.couponEndTime_Node.active = false;
        }
    },
    requestGetCoupon:function(){
        var cb = {
            "cmd":"fish/takeUserCoupon",
            "data":{
                "couponId":CouponID,
                "phone":phoneNumber
            }
        };
        if(CouponID != 0){
            HTTP.sendobj(cb,9);
        }
    },
    responseCouponMessage:function(interval){
        if(CouponCB){
            clearInterval(interval);
            if(CouponCB.data){
                cc.log('查询到优惠券...');
                this.couponAmount_Label.string = CouponCB.data.amount;
                this.couponAmountMin_Label.string = '满' + CouponCB.data.amountMin + '减' + CouponCB.data.amount;
                this.couponName_Label.string = CouponCB.data.name;
                this.couponEndTime_Label.string = CouponCB.data.endTime.split(' ')[0];
                CouponID = CouponCB.data.id;
            }
            else
            {
                this.couponEndTime_Node.active = false;
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
            this.openURL();
            this.requestGetCoupon();
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
                this.shadow_Node.active = false;
                this.openURL();
            }
            else{
                this.TipsString();
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
        this.shadow_Node.active = false;
        this.node.active = false;
        if(phoneNumber == '')
        {
            window.open("http://www.izxcs.com/zxcs.html");
        }
    },

    closeReward:function(){
        this.shadow_Node.active = false;
        this.node.active = false;
    },
});
