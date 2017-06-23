# Fishing

# Ver 0.9.15
# 1.修复历史最高动画没有播放的问题
# 2.修复结算面板鱼和数量对不上的问题
# 3.增加千名之外的排行显示
# 4.配合后端改了queryBigThenThisScoreNum接口

# Ver 0.9.11
# 1.鱼的游速计算基数由0~3改成1~3
# 2.修复碰撞盒子导致钓不到鱼的BUG
# 3.依据数值调整了鱼刷新频率与总数,还有鱼与垃圾的比例
# 4.放鱼线时，若没有勾中鱼，且鱼钩没有到达水底，则可以任意的收放鱼线。
# 5.每次开始游戏前随机手机号
# 6.打开游戏时预加载游戏场景
# 7.修复排行榜2个接口调用反了的问题
# 8.依据数值配置表更改鱼线收放速度
# 9.依据数值配置表更改船移动速度
# 10.依据数值配置表更改每个阶段不同概率刷新速度的鱼
# 11.依据不同速度的鱼给予不同的得分系数
# 12.依据不同阶段鱼刷在不同概率的层


<!--数值配置-->


# Ver 0.9.0
# 1.变更墨鱼方向与角度
# 2.增加鱼被钓起时的死亡状态图片功能
# 3.缩小了鱼
# 4.鱼的刷新点增至6个
# 5.鱼刷新时在刷新点上下浮动10个float坐标
# 6.修改了鱼钩的锚点

# Ver 0.8.72
# 1.修改规则界面背景图
# 2.增加2种水泡动画
# 3.之前不知道为什么注释掉了一段代码导致结算时没有清理鱼,现在好了

# Ver 0.8.66
# 1.修改鱼的锚点

# Ver 0.8.65
# 1.依据策划要求,鱿鱼没有钓起时的转动
# 2.适配手机浏览器
# 3.修改鱼钓起时的处理框架逻辑
# 4.增加达到历史最高时,显示'历史最高'的动画
# 5.修改了所有按钮的触发方式(改为Creator编辑器自带)
# 6.小猪动画播放完毕后还原为初始图片
# 7.进度条修改为最新的图片与需要的效果

# Ver 0.8.23
# 1.改变船移动逻辑
# 2.改变猪蹄,钓竿,船,猪本体的层级关系
# 3.修改结算界面字体
# 4.排行榜接口调整
# 5.鱼线摆动限制
# 6.修复暂停游戏时船还能移动的Bug

# Ver 0.8.19
# 1.增加位图字体

# Ver 0.8.16
# 1.小猪动画按规则触发
# 2.改变了判断鱼和垃圾道具的方式
# 3.增加钓起鱼之后的旋转
# 4.增加了猪蹄与钓鱼杆

# Ver 0.8.0
# 1.接口全通
# 2.增加海藻的动画
# 3.增加小猪的动画

# Ver 0.7.39
# 1.修复0.7.36网络协议接口问题

# Ver 0.7.36
# 1.依据数值配置表控制鱼群数量与其它道具数量
# 2.依据数值表刷鱼概率调整刷鱼代码框架
# 3.依据策划文档增加时间进度条的颜色展示
# 4.新增游戏结算接口消息获取
# 5.新增通过消息接口在结算界面显示最高分
# 6.新增通过消息接口在排行榜显示排行
# 7.新增不同鱼与其它道具数量统计,并在结算界面分别显示各项数字.
# 8.网络协议接口还是有点毛病