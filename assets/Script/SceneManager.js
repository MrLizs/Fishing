cc.Class({
    extends: cc.Component,

    /**
     * 场景管理
     * 暂停总闸
     * 可以传入一个self节点用于暂停
     */
    ScenePause:function(self){
        cc.director.pause();
        this._nodeEventPause(self);
        this._sceneEventPause();
    },
    /**
     * 场景管理
     * 恢复总闸
     * 可以传入一个self节点用于恢复
     */
    SceneResume:function(self){
        cc.director.resume();
        this._nodeEventResume(self);
        this._sceneEventResume();
    },

    /**
     * 节点事件暂停
     */
    _nodeEventPause:function(self){
        if(self)
        {
            self.pauseSystemEvents();
        }
    },
    /**
     * 节点事件恢复
     */
    _nodeEventResume:function(self){
        if(self)
        {
            self.resumeSystemEvents();
        }
    },

    /**
     * 场景事件暂停
     */
    _sceneEventPause:function(self){
        cc.Scene.pauseSystemEvents();
    },

    /**
     * 场景事件恢复
     */
    _sceneEventResume:function(self){
        cc.Scene.resumeSystemEvents();
    },


});
