# 基于ESP-32和微信小程序的人脸识别签到系统
- [B站演示视频](https://www.bilibili.com/video/BV1Vy4y1g76c)

## 文件结构
```
ESP32_based_face_detection_system
├── README.md
├── Hardware
    ├── ESP32CAM
    └── LED
└── Software
    ├── miniprogram
    ├── server
    └── project.config.json

```

### 系统架构

<img src=".\System_Strcture.png" style="zoom: 67%;" />

### 硬件端

硬件端主要使用ESP32CAM以及ESP32进行开发，另外所需按键模块，LED灯的电路模块

### 软件端

这是基于微信小程序的远程查看的软件部分开发，主要是体现了云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
