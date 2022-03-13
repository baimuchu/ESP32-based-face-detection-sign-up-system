#include <HTTPClient.h>
#include "esp_camera.h"
#include <WiFi.h>


const char* ssid = "test";           //WIFI名称
const char* password = "12345678";     //WIFI密码
int capture_interval = 200;        // 默认20秒上传一次，可更改（本项目是自动上传，如需条件触发上传，在需要上传的时候，调用take_send_photo()即可）
const char*  post_url = "http://images.bemfa.com/upload/v1/upimages.php"; // 默认上传地址
const char*  uid = "7048597597ddb3de9eedcd18a77b5d40";    //用户私钥，巴法云控制台获取
const char*  topic = "pic";     //主题名字，可在控制台新建


bool internet_connected = false;
long current_millis;
long last_capture_millis = 0;

// 相机模块管脚定义
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

void setup()
{
  Serial.begin(115200);

  if (init_wifi()) { // Connected to WiFi
    internet_connected = true;
    Serial.println("Internet connected");
  }

  //相机初始数据定义化
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;
  //init with high specs to pre-allocate larger buffers
  if (psramFound()) {
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
}


//初始化WIFI设计
bool init_wifi()
{
  int connAttempts = 0;
  Serial.println("\r\nConnecting to: " + String(ssid));
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED ) {
    delay(500);
    Serial.print(".");
    if (connAttempts > 10) return false;
    connAttempts++;
  }
  return true;
}


//推送照片
static esp_err_t take_send_photo()
{
    //初始化相机并拍照
    Serial.println("Taking picture...");
    camera_fb_t * fb = NULL;
    fb = esp_camera_fb_get();
    if (!fb) {
      Serial.println("Camera capture failed");
      return ESP_FAIL;
    }
  
    HTTPClient http;
    //设置请求url
    http.begin(post_url);
    
    //设置 http 请求头部信息
    http.addHeader("Content-Type", "image/jpg"); //设置传输类型为图片
    http.addHeader("Authorization", uid); //设置用户UID私钥
    http.addHeader("Authtopic", topic);  //设置主题名称
    if(sentWechat){ //判断是否需要推送到微信
      http.addHeader("Wechatmsg", wechatMsg);  //设置 http 请求头部信息
    }

    
    //发起请求，并获取状态码
    int httpResponseCode = http.POST((uint8_t *)fb->buf, fb->len);

    //判断HTTP请求报文
    if(httpResponseCode==200){
        String response = http.getString();  //得到请求报文回应
        Serial.println(response);           //打印请求回应
    }else{
        Serial.print("Error on sending POST: ");
        Serial.println(httpResponseCode);
    }
   
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  
    //清空数据
    esp_camera_fb_return(fb);  
    //回收下次再用
    http.end();
  
}



void loop()
{

  //按键发送
  current_millis = millis();
  if (current_millis - last_capture_millis > capture_interval) { //拍照
    last_capture_millis = millis();
    if (digitalRead(2)==HIGH){ //判断按键电平
    take_send_photo();
    }
  }
}
