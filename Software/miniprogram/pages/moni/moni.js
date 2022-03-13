// pages/moni/moni.js
Page({
  takePhoto:function() {  // 定义绑定的事件处理函数
    var that=this;  // 指定this到that，避免绑定的对象改变
    const ctx = wx.createCameraContext()    // 创建 camera 上下文 CameraContext 对象                                   
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        }) 
        wx.getFileSystemManager().readFile({
          filePath:this.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式返回
          success: res=>{  //成功回调
           this.setData({
             base64: res.data
           })
          }
        })
        wx.cloud.init()
        wx.cloud.callFunction({
      // 云函数名称
      name: 'face',
      // 传给云函数的参数
      data: {
      x:base64  // 传图片的base64字符串
      },
      success: function(res) {
        that.setData({
          ImageWidth: res.result.Result.ImageWidth+"px",
          ImageHeight: res.result.Result.ImageHeight+"px",
          FaceInfos: res.result.Result.FaceInfos,
        })
      },
      fail: console.error
    })
      }
    })
    
  },
  
  error(e) {
    console.log(e.detail)
  },
 
// btn:function(){
// wx.request({
//   url: '复制的链接', //仅为示例，并非真实的接口地址
//       data: {
//         name:'',
//         age:''
//       },
//       header: {
//         'content-type': 'application/json' // 默认值
//       },
//       success: function (res) {
//         console.log(res.data)
//       }
//     })
// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})