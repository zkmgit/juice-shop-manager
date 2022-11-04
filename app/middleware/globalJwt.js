// 白名单（一般登录注册这两个接口不需要校验token）此处也可配置在全局
// swagger资源不拦截
const whiteList = [ '/api/user/login', '/', '/swagger-ui.html', '/swagger-ui.css', '/swagger-ui-bundle.js', '/swagger-ui-standalone-preset.js', '/favicon-32x32.png', '/favicon-16x16.png', '/swagger-doc' ];

module.exports = () => {
  return async function(ctx, next) {
    if (!whiteList.some(item => item === ctx.request.url)) { // 判断接口路径是否在白名单
      const token = ctx.request.header.authorization;// 拿到token

      if (token) { // 如果token存在
        try {
          const decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);// 解密token

          if (decoded) await next();
        } catch (e) {
          // token 过期
          ctx.body = {
            code: '401',
            msg: 'token expired',
          };
        }

      } else {
        ctx.body = {
          code: '401',
          msg: 'not find token',
        };
      }
    } else {
      await next();
    }
  };
};
