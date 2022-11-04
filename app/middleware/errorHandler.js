// 统一的异常处理
module.exports = () => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (e) {
      if (Reflect.has(e, 'message')) {
        ctx.body = {
          code: '0004',
          msg: e.message,
        };
        return;
      }

      ctx.body = {
        code: '0004',
        msg: e.sqlMessage || 'error',
      };
    }

  };
};
