const whiteList = [ '/api/login' ];// 白名单（一般登录注册这两个接口不需要校验token）此处也可配置在全局

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
          if (Reflect.has(e, 'message') && e.message === 'jwt expired') {
            ctx.body = {
              code: '401',
              msg: 'token expired',
            };
          } else {
            // 其他类型的错误
            ctx.body = {
              code: '0004',
              msg: e.sqlMessage || 'error',
            };
          }
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
