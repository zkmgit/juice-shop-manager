// 用户模块路由
module.exports = app => {
  const { router, controller } = app;

  // 上传图片
  router.post('/api/utils/upload', controller.utils.uploadFiles);
};
