// pages/idcard/idcard.js
Page({
  takePhoto() {  // 定义绑定的事件处理函数
    var that=this;  // 指定this到that，避免绑定的对象改变
    const ctx = wx.createCameraContext()    // 创建 camera 上下文 CameraContext 对象                                                                                                                         
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        }) 
        var base64=wx.getFileSystemManager().readFileSync(res.tempImagePath, 'base64')
        wx.cloud.init()
        wx.cloud.callFunction({
      // 云函数名称
      name: 'FaceDetect',
      // 传给云函数的参数
      data: {
      x:base64  // 传图片的base64字符串
      },
      success: function(res) {
       var Result = res.result.Result
       console.log(res)
        that.setData({
          Address: Result.Address,
          Birth:Result.Birth,
          IdNum:Result.IdNum,
          Name:Result.Name,
          Nation:Result.Nation
        })
      },
      fail: console.error
    })
      }
    })
    
  },
  
  error(e) {
    console.log(e.detail)
  }
})