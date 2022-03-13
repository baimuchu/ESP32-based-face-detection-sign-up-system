// pages/ceshi2/ceshi2.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
path:""
  },
album_func:function(){//函数作用域1
  //记录当前函数作用域的this对象
  console.log("按下按键")
var that=this;
//选择照片
wx.chooseImage({
  count:1,
  sizeType:['compressed'],
  sourceType:['album'],
  success:function(res){
console.log(res);
 //获取图片的路径
 var src=res.tempFiles[0].path;
 var size=res.tempFile[0].size; //bit kb m
 //1kb=1024bit   1m=1024kb
 if(size/(1024*1024)>1){
   //提示图片过大
   wx.showToast({
     title: '图片过大重新选择',
     icon:"none"
   })
//终止代码
return;
 }
 //给data下的path变量赋值
 that.setData({
   path:src
  })
  },
  fali:function(err){
    console.log(err)
  }
})
},
camera_func:function(){//函数作用域1
  //记录当前函数作用域
  var that=this;
  //选择照片
  wx.chooseImage({
    count: 1,
    sizeType:['compressed'],
    sourceType:['camera'],
    success:function(res){
console.log(res)
//获取拍照的图片信息中的路径
var src=res.tempFiles[0].path;
var size=res.tempFile[0].size; 
if(size/(1024*1024)>1){
  //提示图片过大
  wx.showToast({
    title: '图片过大重新选择',
    icon:"none"
  })
//终止代码
return;
}
//给DATA下的path赋值
that.setData({
  path:src
})
    },
    fail:function (err) {
      console.log(err)
    }
  })
  

},
goBack:function() {

  wx.reLaunch({
    url:"/pages/houtai/houtai?id=123",
    success:res=>{
      console.log(res)
    }
  })},
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