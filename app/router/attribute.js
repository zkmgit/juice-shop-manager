// 属性模块路由
module.exports = app => {
  const { router, controller, middleware } = app;

  router.post('/api/attribute/getAllAttributeList', middleware.dealQueryParam(), controller.attribute.getAllAttributeList); // 获取所有的属性信息
  router.post('/api/attribute/insertAttribute', controller.attribute.insertAttribute); // 新增属性
  router.put('/api/attribute/updateAttribute', controller.attribute.updateAttribute); // 编辑属性
  router.delete('/api/attribute/deleteAttribute/:id', controller.attribute.deleteAttribute); // 删除属性
};
