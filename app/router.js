'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 上传图片
  router.post('/api/upload', controller.utils.uploadFiles);
  // 用户模块
  require('./router/user')(app);
};
