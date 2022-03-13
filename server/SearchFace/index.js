// 云函数入口文件
const db=cloud.database();
const cloud = require('wx-server-sdk')

cloud.init(
    {
      traceUser:true,
      env:'face-7g0wzmlr3609a749'
  }
)

// 云函数入口函数
exports.main = async (event, context) => {
  const tencentcloud = require("tencentcloud-sdk-nodejs")
  // const wxContext = cloud.getWXContext()
  const IaiClient = tencentcloud.iai.v20200303.Client;
  const clientConfig = {
    credential: {
      secretId: "AKIDEH3YonWuCF3cv0pOgjV0FEwPbXDi4B4i",
      secretKey: "RdbIjvrY0DCwQedNr9C0ZswkLgmcEagX",
    },
    region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "iai.tencentcloudapi.com",
    },
  },
};
const client = new OcrClient(clientConfig);
  // let result=await db.collection("geturl").where({
  //  _openid:wxContext.OPENID
  // }).get()
const url=event.url
const params = {
  "GroupIds": [
      "1"
  ],
  "Url":url,
  "MaxPersonNum":1,
"NeedRotateDetection":1
};
  return new Promise((resolve, reject) => {   // 通过Promise容器来接收异步API的回调，然后通过当前脚本返回给客户端
    client.IDCardOCR(params).then(  // 此接口是异步的，那么当前脚本无法对外直接访问接口返回值
      (data) => {
        resolve({ "Result": data })
      },
      // resp = response.to_json_string()
      (err) => {
        resolve({ "Result": err})
      }
    )
  })
  // const url=[event.url]
  // const url=event.url
  // console.log("url"+url)
  // datas = await synSearchPersons(url)
  // return {
  //        datas,
  //        _openid:wxContext.OPENID
  //       }
}

// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
// const tencentcloud = require("tencentcloud-sdk-nodejs");
// var synSearchPersons = function (url) { 
// const IaiClient = tencentcloud.iai.v20200303.Client;

// const clientConfig = {
//   credential: {
//     secretId: "AKIDEH3YonWuCF3cv0pOgjV0FEwPbXDi4B4i",
//     secretKey: "RdbIjvrY0DCwQedNr9C0ZswkLgmcEagX",
//   },
//   region: "ap-shanghai",
//   profile: {
//     httpProfile: {
//       endpoint: "iai.tencentcloudapi.com",
//     },
//   },
// };
// let req=new models.SearchPersons();
// const client = new IaiClient(clientConfig);
// const params = {
//     "GroupIds": [
//         "1"
//     ],
//     "Url":"' + url + '","NeedFaceAttributes":1,
//     "Score":'',
//     "PersonId":''
// };req.from_json_string(params);
// return new Promise(function(resolve, reject) {
// client.SearchPersons(req,function(errMsg,response){

//  if (errMsg) {
//         reject(errMsg)
//       } else {
//         resolve(response);
//       }
//     })
//   }
// );
// }
