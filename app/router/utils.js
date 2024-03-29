const prefix = '/api/utils/';
// 工具模块路由
module.exports = app => {
  const { router, controller } = app;

  // 上传图片
  router.post(`${prefix}upload`, controller.utils.uploadFiles);
  // 批量替换URL
  router.post(`${prefix}batchCheck`, controller.utils.batchCheck);
};
