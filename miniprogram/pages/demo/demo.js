// pages/demo/demo.js
const db = wx.cloud.database()
const _=db.command
const testDB = wx.cloud.database({
  env: 'face-7g0wzmlr3609a749'
})
// const todo=db.collection('already')
const todos = db.collection('havent')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    public_name:'',
  },
  getDate(){
    db.collection('havent').doc('2018210671').get().then((res)=>{
    //  this.data.public_name = res.data
    this.setData({
      public_name:res.data
    })
  });
  if(typeof(this.data.public_name)=='string'){
    console.log(this.data.public_name);
    console.log('length='+this.data.public_name.length,'数值为赋值！');
  }
  else{
     console.log(this.data.public_name)
     console.log(this.data.public_name.name);
  }
  
  },
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