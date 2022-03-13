// 云函数入口文件

cloud.init(
  {env:"face-7g0wzmlr3609a749"}
)
const cloud = require('wx-server-sdk')
const db = cloud.database()
const _ = db.command
const app=cloudbase.init({})
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const res=await db.collection('already').where({
      type:'students'
    }).remove();
  
  return {res}
    
}