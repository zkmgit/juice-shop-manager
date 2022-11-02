'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/', controller.home.index);
  // 工具模块
  require('./router/utils')(app);
  // 用户模块
  require('./router/user')(app);
  // 分类配置
  require('./router/category')(app);
  // 属性配置
  require('./router/attribute')(app);
};
