// pages/houtai/houtai.js
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

  },
// onetap:function(res){
  reset:function(){
    db.collection('already').where({
      type:'students'
    }).remove()
    db.collection('already').where({
      type:'students'
    }).remove()
    db.collection('already').where({
      type:'students'
    }).remove()
    db.collection('already').where({
      type:'students'
    }).remove()
    db.collection('already').where({
      type:'students'
    }).remove()
    db.collection('havent').doc('2018210671').set({
      // data 字段表示需新增的 JSON 数据
      data: {
         // 可选自定
        url:'https://z3.ax1x.com/2021/06/14/27fbEd.jpg',
        PersonId:2018210671,
        name:'罗赓',
        type:'students'
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res.data)
      }
    })
    db.collection('havent').doc('2018210670').set({
      // data 字段表示需新增的 JSON 数据
      data: {
         // 可选自定
        url:'https://z3.ax1x.com/2021/06/14/274ITH.jpg',
        PersonId:2018210670,
        name:'朱伯湘',
        type:'students'
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res.data)
      }
    })
    db.collection('havent').doc('2018210523').set({
      // data 字段表示需新增的 JSON 数据
      data: {
         // 可选自定
        url:' https://z3.ax1x.com/2021/06/15/2q5TTU.jpg',
        PersonId:2018210523,
        name:'欧哲弈',
        type:'students'
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res.data)
      }
    })
    db.collection('havent').doc('2018210555').set({
      // data 字段表示需新增的 JSON 数据
      data: {
         // 可选自定
        url:'   https://z3.ax1x.com/2021/06/15/2q5bY4.jpg',
        PersonId:2018210555,
        name:'姚金龙',
        type:'students'
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res.data)
      }
    })
    db.collection('havent').doc('2018210524').set({
      // data 字段表示需新增的 JSON 数据
      data: {
         // 可选自定
       
        url:'https://z3.ax1x.com/2021/06/15/2q4TGd.jpg'
      ,
        PersonId:2018210524,
        name:'陈俊',
        type:'students'
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res.data)
      }
    })
  },
goback:function(){
wx.navigateTo({
  url: 'pages/houtai/houtai',
})
},
// },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})