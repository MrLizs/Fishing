cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('FishingGame');

        this.schedule(this.updatime_minute,10);
    },
    updatime_minute:function(){
        this.unschedule(this.updatime_minute);
        cc.director.loadScene('FishingGame');
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
