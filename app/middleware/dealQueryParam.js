module.exports = () => {
  return async function(ctx, next) {
    const body = ctx.request.body;// 拿到参数

    const queryFields = Object.keys(body);

    if (queryFields && queryFields.length === 0) {
      ctx.body = {
        code: '503',
        msg: '参数无效',
      };
    } else {
      if (queryFields.includes('ps') && queryFields.includes('pn')) {
        await next();
      } else {
        ctx.body = {
          code: '503',
          msg: '参数无效',
        };
      }
    }
  };
};
