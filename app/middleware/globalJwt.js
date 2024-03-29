// 白名单（一般登录注册这两个接口不需要校验token）此处也可配置在全局
// swagger资源不拦截
const whiteList = [ '/wxApi/user/getToken', '/wxApi/user/login', '/api/user/insertUser', '/wxApi/system/carouselImageList', '/wxApi/announcement/AnnouncementList', '/wxApi/category/getAllCategoryList',
                  '/wxApi/product/getAllProductList', '/wxApi/product/getAllProductListByCategoryId/:id', '/api/wxUser/login', '/api/user/login', '/',
                  '/wxApi/product/getProductInfoById/:id', '/wxApi/product/getAllSeckillProductList', '/wxApi/product/getAllRecommendedProductList',
                  '/swagger-ui.html', '/swagger-ui.css', '/swagger-ui-bundle.js', '/swagger-ui-standalone-preset.js',
                  '/favicon-32x32.png', '/favicon-16x16.png', '/swagger-doc' ];

module.exports = () => {
  return async function(ctx, next) {
    // 微信接口白名单
    if (ctx.request.url.indexOf('/wxApi/product/getProductInfoById') !== -1 || ctx.request.url.indexOf('/wxApi/product/getAllProductListByCategoryId') !== -1 || ctx.request.url.indexOf('/wxApi/attribute/getAttributesByIds') !== -1) {
      await next();
      return
    }
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
