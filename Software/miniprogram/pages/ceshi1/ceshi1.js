// pages/ceshi1/ceshi1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    enlist:[],
current:0,
arr:[
{
  word:"首页内容"
},
{
  word:"补签内容"
},
{
  word:"后台内容"
}
]
  },
//编写一个函数，实现一个tab选项卡
  tab_func:function(event){
//点击当前选项，获取自定义属性 data-index的值 
//console.log(event)
//console.log(event.currentTarget)  事件源
//console.log(event.currentTarget.dataset)  储存自定义属性的对象
var a=event.currentTarget.dataset.a;
console.log(a)
//给页面的index赋值
//this是当前函数作用域的对象 
//this 指向当前函数的调用者
this.setData({
current:a
})
console.log(this.data.current,':current')
  },


  goBack:function() {

    wx.reLaunch({
      url:"/pages/houtai/houtai?id=123",
      success:res=>{
        console.log(res)
      }
    })
  
},
})

