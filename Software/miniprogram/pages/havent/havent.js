
// pages/havent/havent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    banner:[]
  },
  // click:function(){
  //   success:res=>{console.log(res)}
  // },
  getData(num=5,page=0){
    wx.cloud.callFunction({
      name:"demoGetlist",
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
    // const db=wx.cloud.database()
    // const banner=db.collection('havent')
    // banner.get().then(res=>{
    //   console.log(res)
    //   this.setData({
    //     banner:res.data
    //   })
    // }).catch(err=>{
    //   console.log(err)
    // })
    // banner.where({
    //   name:"luogeng"
    // }).get().then(res=>{console.log(res)})
    // .catch(err=>{
    //   console.log(err)
    // })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page=this.data.dataList.length
    this.getData(5,page)
  },

})