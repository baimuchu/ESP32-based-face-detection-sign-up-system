//app.js
App({
  onLaunch: function () {
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // if (!wx.cloud) {
    //   // console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    //   wx.showToast({
    //     title: '请使用 2.2.3 或以上的基础库以使用云能力',
    //     icon: 'warn',
    //     image: '',
    //     duration: 0,
    //     mask: true,
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })

    // } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'face-7g0wzmlr3609a749',
        traceUser: true,
      })
    // }

    this.globalData = {}
  },
  globalData: {
  },
  pred: new Array(),
  beauty:new Array(),
  img_src:new Array(),
  height:new Array(),
  PersonId:new Array(),
  Score:new Array(),
  count: 0
})
