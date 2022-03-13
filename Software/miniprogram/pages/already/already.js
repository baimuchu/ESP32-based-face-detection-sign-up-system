// pages/already/already.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
dataList:[]
  },
  getData(num=5,page=0){
    wx.cloud.callFunction({
      name:"UplistHavent",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      // if(this.data.dataList==0){
      //   var newData=
      // }
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

  onReachBottom: function () {
    var page=this.data.dataList.length
    this.getData(5,page)
  },

 
})