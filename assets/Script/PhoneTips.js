var printStr=null;

cc.Class({
    extends: cc.Component,
    properties: {
        shadow_Node:cc.Node,
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
        if(printStr.length===13)
        {
            var t=0;
            for (var i = 0; i < 13; i++) {
                var element = printStr.split("")[i];
                if(this.isNumber(element) == false){
                    cc.log("输入错误:"+printStr);
                    isPrintPhone = 2;
                    break;
                }else{
                    ++t;
                }
            }
            if(t==13)
            {
                phoneNumber = printStr;
                this.shadow_Node.active = false;
                isPrintPhone = 1;
            }
            cc.log("输入的是:"+printStr);
        }
    },
    isNumber :function(value) {
    var patrn =  /^\+?[1-9][0-9]*$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
});
