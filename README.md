# Fishing

# Ver 0.9.87
# 1.Encryption failure after handle for AES

# Ver 0.9.86
# 1.Fix a settlementing ranking of bug
# 2.New add an aes encrypt of HTTP GET response

# Ver 0.9.84
# 1.reset for add 'fish' and 'Garbage' logic.

# Ver 0.9.83
# 1.use real "loading resources" ui event...

# Ver 0.9.82
# 1.Fix "Loading" ui for two bug

# Ver 0.9.81
# 1.修复排行榜列表节点没有清除的BUG
# 2.增加载入界面以及动画
# 3.领取优惠券时,没手机号弹出网页
# 4.领取优惠券联调成功

# Ver 0.9.77
# 1.增加超越全球百分之多少玩家的接口以及显示

# Ver 0.9.76
# 1.调试领取优惠券3个接口成功,等待美术给图显示
# 2.解决结算排行和查询排行榜时排名不同的问题
# 3.删除输入手机号界面
# 4.增加炫耀按钮,只有超过历史最高分才能显示,功能未实现

# Ver 0.9.72
# 1.接入超越好友的接口并显示
# 2.接入领优惠券的接口(未显示);
# 3.去掉结算后输入手机号,为接入APP平台做准备

# Ver 0.9.69
# 1.调整屏幕适配的2个小问题
# 2.增加领取优惠券的界面

# Ver 0.9.67
# 1.增加输入错误手机号后的提示
# 2.增加分享按钮弹出分享界面

# Ver 0.9.65
# 1.增加输入非13~18手机号控制台提示错误

# Ver 0.9.64
# 1.增加结算时超越好友的显示(未测试)

# Ver 0.9.63
# 1.增加获取GET请求的phone字段并且正则11位数字

# Ver 0.9.62
# 1.自定义字体里增加"-"符号
# 2.solved a bug
# 3.依据最新的数值表调整数值

# Ver 0.9.61
# 1.修复了一个BUG

# Ver 0.9.6
# 1.调整钓鱼游戏的刷鱼控制
# 2.修复排行榜播放最高历史排名动画的逻辑处理
# 3.修复了一些小细节

# Ver 0.9.55
# 1.修复整体程序逻辑

# Ver 0.9.5
# 1.重做了排行JS文件.
# 2.依据数值表调整了刷鱼每隔阶段上限调整;
# 3.调整了部分刷鱼规则
# 4.新增游戏结束时提示输入手机号

# Ver 0.9.45
# 1.结算面板动画修正
# 2.结算面板弹出规则改变
# 3.自己成绩的接口对应后端改变
# 4.结算时新分比历史最高分更高,则显示新的分数到历史最高分栏
# 5.修复历史最高动画未能播放的问题
# 6.增加荷叶的动画并删除无用的资源
# 7.修正游戏结束返回主界面后查询排行榜调度器无法使用的问题,替换为setInterval定时函数

# Ver 0.9.38
# 1.修复鱼游速传值没传到位的BUG
# 2.根据分数查排行的接口后端没改,导致前端拿不到数据,已还原
# 3.根据排行榜后端数据结构接口进行修改

# Ver 0.9.35
# 1.连接的IP填错了,已修正
# 2.负数正确显示

# Ver 0.9.33
# 1.策划需求没手机号结算时不显示最高排名
# 2.策划需求初始刷鱼数量逐渐显示
# 3.策划需求结算时的负分显示
# 4.策划需求修改船的移动速度
# 5.策划需求游戏中同屏的最大数量调整
# 6.策划说在结算时去掉好友面板
# 7.解决暂停游戏时鱼线不倾斜的问题

# Ver 0.9.26
# 1.结算负数的显示
# 2.最大鱼数量调节为20只
# 3.改成了异步请求
# 4.变更排行榜代码逻辑
# 5.暂停的时候鱼线不可动

# Ver 0.9.16
# 1.进入游戏时增加左上角的版本号显示

# Ver 0.9.15
# 1.修复历史最高动画没有播放的问题
# 2.修复结算面板鱼和数量对不上的问题
# 3.增加千名之外的排行显示
# 4.配合后端改了queryBigThenThisScoreNum接口

# Ver 0.9.11
# 1.鱼的游速计算基数由0-3改成1-3
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