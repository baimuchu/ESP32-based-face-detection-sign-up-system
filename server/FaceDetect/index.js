// 云函数入口文件
const cloud = require('wx-server-sdk')  // 引入云开发服务的内核SDK

cloud.init(   //初始化一个'wx-server-sdk' SDK 实例
{
  env: 'face-7g0wzmlr3609a749'   // 开通云开发服务后创建的云环境的环境ID（默认可以创建两个ID）
}
)

// 云函数入口函数
exports.main = async (event, context) => {
   
const tencentcloud = require("tencentcloud-sdk-nodejs");  //引入腾讯云SDK

// 下面的代码可以通过explorer在线生成（https://console.cloud.tencent.com/api/explorer?Product=iai&Version=2018-03-01&Action=DetectFace&SignVersion=）
const OcrClient = tencentcloud.ocr.v20181119.Client;

const clientConfig = {
  credential: {
    secretId: "AKIDEH3YonWuCF3cv0pOgjV0FEwPbXDi4B4i",
    secretKey: "RdbIjvrY0DCwQedNr9C0ZswkLgmcEagX",
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "ocr.tencentcloudapi.com",
    },
  },
};

const client = new OcrClient(clientConfig);
let base64Data=event.x
const params = {
    "ImageBase64": base64Data
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
}