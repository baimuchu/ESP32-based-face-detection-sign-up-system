// 获取应用实例
const app = getApp()
const db = wx.cloud.database()
const _=db.command
const testDB = wx.cloud.database({
  env: 'face-7g0wzmlr3609a749'
})
// const todo=db.collection('already')
const todos = db.collection('havent')
//需要在微信小程序平台网站上，开发-->开发管理-->开发设置-->服务器域名-->request合法域名处 填入 https://images.bemfa.com
var picurl=''     //url 全局变量
// var PensonId=''
var Score=''
// let public_name='name'
var finalname=''
Page({
  data: {
    uid:"7048597597ddb3de9eedcd18a77b5d40",//用户密钥，巴法云控制台获取
    myTopic:"pic",//图片上传的主题，图片云控制台创建
    myTopic1:"light",
    device_status: "离线", //默认离线
    powerstatus:"已关闭"  , //默认关闭
    num:1,      //获取的图片数量，可随意
    imgList:[], //存储图片地址和时间，用于前端展示
    picArr:[], //存储图片的地址，用于图片点击预览
    img_src:[],
    url:[],
    name1:'',
    public_name:'',
    PersonId:"请稍等",
    Score:"请稍等",
    personid:'',
  //  Gender:"请稍等"
  finalname:''
  },
  
  
  UploadImage:function(){    //获取图片函数
    //api 接口详细说明见巴法云接入文档
    var that = this
    wx.request({
      url: 'https://images.bemfa.com/cloud/v1/get/', //获取图片接口，详见巴法云接入文档
      data: {
        uid: that.data.uid,       //uid字段
        topic: that.data.myTopic,//topic字段
        num:that.data.num        //num字段
      },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success (res) {
       
         console.log(res)     //打印获取结果
         var imgArr = []      //定义空数组，用于临时存储图片地址和时间
         var arr = []         //定义空数组，用于临时存储图片地址
         for(var i = 0;i<res.data.data.length;i++){//遍历获取的结果数组
           var url = res.data.data[i].url          //提取图片地址
           picurl=url
           var time = that.time(url.substring(url.lastIndexOf("-")+1,url.lastIndexOf(".")))//提取图时间
           imgArr.push({"url":url,"time":time})    //将存储图片地址和时间存入临时数组
           arr.push(url)                           //将存储图片地址存入临时数组
         }
        
         that.setData({     //把临时数组值复制给变量用于展示
           imgList:imgArr, //将临时存储图片地址和图片时间的数组赋值给用于图片预览的数组
           picArr:arr,    //将临时存储图片地址的数组赋值给用于图片预览的数组
    
         })
        console.log(that.data.imgList)   //打印赋值结果
  
        
        
      },
      
    })
    
      
   
  },

  qiandao:function(){
    var that=this;
    var num=5;
    var page=0;
    var finalname1="";
    that.setData({
      powerstatus:"已打开"
    })
    
    wx.cloud.callFunction({
      name: 'SearchPersons',
      data: {
        url:picurl
      },
    
      success:res=>{
          wx.hideLoading( )    
          var personid='';
          var score='';
         var finalname='';
            console.log("Response：" + JSON.stringify(res.result)) 
           
          score=res.result.Result.Results[0].Candidates[0].Score
         
        that.setData({
          PersonId:personid,
           Score:score
                    })   
      // if(personid==2018210671){
      //     finalname=="罗赓"
      // }else if(personid==2018210671){
      //     finalname=="朱伯湘"
      // }
       switch(personid){

         case 2018210671:
             finalname=="罗赓";
            break;
         case 2018210670:
           finalname==朱伯湘;
           break;
       }
      console.log(finalname)
       console.log(personid)
           
    console.log(score)
      console.log(picurl)
      
        
   if(score>60){
    personid=res.result.Result.Results[0].Candidates[0].PersonId
    db.collection('havent').doc(personid).remove()
    db.collection('already').doc(personid).set({
      data:{
        name:"罗赓",
        PersonId:personid,
        url:picurl
      }
    })
       wx.request({
        url: 'https://api.bemfa.com/api/device/v1/data/1/', //获取图片接口，详见巴法云接入文档
        data: {
          uid: that.data.uid,       //uid字段
          topic: that.data.myTopic1,//topic字段
          msg:"true"
        },
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        method:"POST",
        success (res) {
          console.log(res.data)
          wx.showToast({
            title:'签到成功',
            icon:'success',
            duration:1000
          })
        }
      })
      
    }else{
    
      wx.request({
        url: 'https://api.bemfa.com/api/device/v1/data/1/', //获取图片接口，详见巴法云接入文档
        data: {
          uid: that.data.uid,       //uid字段
          topic: that.data.myTopic1,//topic字段
          msg:"falut"
        },
        header: {
          'content-type': "application/x-www-form-urlencoded"
        },
        method:"POST",
        success (res) {
          console.log(res.data)
          wx.showToast({
            title:'签到失败',
            icon:'success',
            duration:1000
          })
        }
      })
    
    }
    
      },
      
        fail:err=>{
          console.log("云函数调用失败",err)
        },
      
      })
  

    },
  clickImg(e){          
      console.log(e.currentTarget.dataset.index)   

        //打印数组索引值
      var nowIndex = e.currentTarget.dataset.index  //获取索引值
      wx.previewImage({           //图片预览接口
        current: this.data.picArr[nowIndex],//当前图片地址
        urls: this.data.picArr    //图片地址数组
      })
     
  },
  time(time) {                    //时间戳转时间函数
    var date = new Date(parseInt(time)*1000 + 8 * 3600 * 1000);
    return date.toJSON().substr(0, 19).replace('T', ' ');
  },
  
  // onLoad: function (options) {
  //   wx.cloud.init({
  //     env:'test-5gnlhggue436cfe8'  //初始化的环境ID，之前建立云环境的ID
  //   })
  
  // },
  onLoad() {    //默认加载函数
    // this.UploadImage()//获取图片
    // db.collection('havent').add({
    // // data 字段表示需新增的 JSON 数据
    // data: {
    //  // 可选自定
    // url:'https://img.bemfa.com/f0c43ebbf216bcd0b2274d712d4d96cd-3f8d0090532c619c59899950944e236f-1623675568.jpg',
    // PersonId:2018210111,
    // _id:'2018210111',
    // name:'zhuzhu'
    // },
    // success: function(res) {
    //   // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    //   console.log(res.data)
    // }
    // })
    db.collection('havent').doc('2018210671').set({
      // data 字段表示需新增的 JSON 数据
      data: {
         // 可选自定
        url:'https://z3.ax1x.com/2021/06/14/27fbEd.jpg',
        PersonId:2018210671,
        name:'罗赓'
        
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
        name:'朱伯湘'
        
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
        name:'欧哲弈'
        
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
        name:'姚金龙'
        
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
        name:'陈俊'
        
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res.data)
      }
    })
    db.collection('all').doc('2018210670').set({
      // data 字段表示需新增的 JSON 数据
      data: {
         // 可选自定
        url:'https://z3.ax1x.com/2021/06/14/274ITH.jpg',
        PersonId:2018210670,
        name:'朱伯湘'
        
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res.data)
      }
    })
    db.collection('all').doc('2018210671').set({
      // data 字段表示需新增的 JSON 数据
      data: {
         // 可选自定
        url:'https://z3.ax1x.com/2021/06/14/27fbEd.jpg',
        PersonId:2018210671,
        name:'罗赓'
        
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res.data)
      }
    })
    
},
onUnload: function () {
  db.collection('already').doc("2018210671").remove()
  db.collection('already').doc("2018210670").remove()
},
})
