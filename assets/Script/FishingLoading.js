cc.Class({
    extends: cc.Component,

    properties: {
        // _progress:0,
    },

    // use this for initialization
    onLoad: function () {
        if(cc.director.isPaused())
        {
            //这里须恢复.
            cc.director.resume();
        }

        //载入完成自动进入场景
        cc.director.preloadScene('FishingGame',function(){
            cc.log("预加载完成,进入场景...");
            cc.director.loadScene('FishingGame');
        });
        //加载完成时_progress会变成1
        // var self = this;
        // cc.loader.onProgress = function ( completedCount, totalCount,  item ){
        //     self._progress = completedCount/totalCount;
        //     cc.log("进度"+self._progress);
        // };

        //5秒后自动跳转场景
        // var self = this;
        // var _interval = setInterval(function(){
        //     self.updatime_minute(_interval)
        // },5000);
    },
    // updatime_minute:function(_interval){
    //     clearInterval(_interval);
    // },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
