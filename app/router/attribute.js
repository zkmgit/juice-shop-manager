const prefix = '/api/attribute/';
// 属性模块路由
module.exports = app => {
  const { router, controller, middleware } = app;

  // 获取所有的属性信息
  router.post(`${prefix}getAllAttributeList`, middleware.dealQueryParam(), controller.attribute.getAllAttributeList);
  // 新增属性
  router.post(`${prefix}insertAttribute`, controller.attribute.insertAttribute);
  // 编辑属性
  router.put(`${prefix}updateAttribute`, controller.attribute.updateAttribute);
  // 删除属性
  router.delete(`${prefix}deleteAttribute/:id`, controller.attribute.deleteAttribute);
};
