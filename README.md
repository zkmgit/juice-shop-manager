# Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

swagger文档开发地址
http://localhost:7001/swagger-ui.html#/

```配置
数据库连接配置 ./config/config.default.js   搜索config.mysql
swagger文档配置 ./config/config.default.js   搜索config.swaggerdoc
token加密配置 ./config/config.default.js   搜索config.jwt
```
```七牛云配置
路径：app -> service -> utils.js
<!-- 因没有正式的域名，用的是七牛云的测试域名，时间只有30天，到期自动释放资源，需要自己备份一份上传的资源，等七牛云资源到期重新上传 -->
const bucket = ''; // 要上传的空间名
const imageUrl = ''; // 空间绑定的域名
```
