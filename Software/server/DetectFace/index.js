const cloud = require('wx-server-sdk') //小程序云开发SDK
const tencentcloud = require("tencentcloud-sdk-nodejs"); //腾讯云API 3.0 SDK
const secret = require('./config.json');
cloud.init({
  env: 'face-7g0wzmlr3609a749',
  //env:'test-5gnlhggue436cfe8'
}) //云开发初始化
var synDetectFace = function(url) { //人脸识别API
  const IaiClient = tencentcloud.iai.v20200303.Client; //API版本
  const models = tencentcloud.iai.v20200303.Models; //API版本

  const Credential = tencentcloud.common.Credential;
  const ClientProfile = tencentcloud.common.ClientProfile;
  const HttpProfile = tencentcloud.common.HttpProfile;
  let cred = new Credential(AKIDEH3YonWuCF3cv0pOgjV0FEwPbXDi4B4i, RdbIjvrY0DCwQedNr9C0ZswkLgmcEagX); //腾讯云的SecretId和SecretKey，打开config.js文件配置
  let httpProfile = new HttpProfile();
  httpProfile.endpoint = "iai.tencentcloudapi.com"; //腾讯云人脸识别API接口
  let clientProfile = new ClientProfile();
  clientProfile.httpProfile = httpProfile;
  let client = new IaiClient(cred, "", clientProfile); //调用就近地域

  let req = new models.DetectFaceRequest();
  let params = '{"Url":"' + url + '","NeedFaceAttributes":1}' //拼接参数
  req.from_json_string(params);
  return new Promise(function(resolve, reject) { //构造异步函数
    client.DetectFace(req, function(errMsg, response) {
      if (errMsg) {
        reject(errMsg)
      } else {
        resolve(response);
      }
    })
  })
}


exports.main = async(event, context) => {
  // const context = cloud.getWXContext()
  // const data = event  
  // const fileList = [data.fileID] //读取来自客户端的fileID
  const fileList = [event.fileID] //读取来自客户端的fileID
  console.log("fileID:" + event.fileID)
  const result = await cloud.getTempFileURL({ //向云存储发起读取文件临时地址请求
    fileList, 
  })
  console.log("result:" + JSON.stringify(result))
  const url = result.fileList[0].tempFileURL
  console.log("url:" + url)
  datas = await synDetectFace(url) //调用异步函数，向腾讯云API发起人脸检测请求
  return datas
  // const fileList = ['cloud://test-5gnlhggue436cfe8.7465-test-5gnlhggue436cfe8-1305751475/1623557880396.jpg']
  // const result = await cloud.getTempFileURL({
  //   fileList,
  // })
  // return result.fileList
}