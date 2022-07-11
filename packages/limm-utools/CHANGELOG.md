## 📌 更新日志（Changelog）

## 0.0.12 2022-06-21

**功能（Features）**

1. 上传到 uni-app 插件市场，修改文档

## 0.0.13 2022-07-11

**功能（Features）**

1. Request 支持剩余的参数扩展请求配置，但只有以一个参数作为请求参数

   ```javascript
   // 实例对象
   const http = new Request(options)

   http.request(config, ...others)
   http.upload(config, ...others)

   // 可以在请求拦截器接收到剩余的参数
   ```
