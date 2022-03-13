// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser:true,
  env: 'face-7g0wzmlr3609a749' 
})
const db=cloud.database();
// 云函数入口函数  
//await异步请求
exports.main = async (event, context) => {
  var num=event.num;
  var page=event.page;
  return await db.collection("already").skip(page).limit(num).get()
  // return new Promise((resolve,reject)=>{
  //   db.collection('enlist').get().then((res)=>{
  //     resovle(res)
  //   }).catch((err)=>{
  //     console.log(err)
  //     reject(err)
  //   })
  // })
}