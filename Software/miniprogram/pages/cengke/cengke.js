// pages/cengke/cengke.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },
  getData(num=5,page=0){
    wx.cloud.callFunction({
      name:"allpeople",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      var oldData=this.data.dataList
      var newData=oldData.concat(res.result.data);
      this.setData({
        dataList:newData
      })
    })
    },
    goBack:function() {

      wx.reLaunch({
        url:"/pages/houtai/houtai?id=123",
        success:res=>{
          console.log(res)
        }
      })
    },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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
    var page=this.data.dataList.length
    this.getData(5,page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})