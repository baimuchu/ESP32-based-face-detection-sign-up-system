// pages/ceshi/ceshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
message:"这是一个页面",
current:0,
bgcolor:"skyblue",
val:""
  },
  click_event:function(event){
//console.log("点击下去了")
console.log(event);//{key:value}
//获取按钮的自定义属性值 data-num
var num = event.target.dataset.num;
console.log({num:num})
//给current属性赋值
//判断
if(num ==0){
this.setData({
  current:1
})}
else{
  this.setData({
    current:0
  })
}
  },

  //编写一个函数 监听输入框的值
  input_func:function(event1){
//event1事件对象 数据集合 {key:value}
//获取输入框的值
var v2=event1.detail.value;
//给data下的val赋值
this.setData({
  val:v2
})
//this是当前函数作用域的对象 {}
//console.log(this.data.val,'输入的值')

  },
  //编写一个函数 点击
  click_func:function(){
  var bgcolor=this.data.val;
  //判断输入是否有值
  if(bgcolor.length==0){
    wx.showToast({
      title:'请输入颜色',
      icon:"none"
    })
    //终止代码
    return;
  }
  //给data下的bgcolor赋值
  this.setData({
    bgcolor:bgcolor
  })
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