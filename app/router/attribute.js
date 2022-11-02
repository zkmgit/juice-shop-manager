// 属性模块路由
module.exports = app => {
  const { router, controller, middleware } = app;

  router.post('/api/attribute/getAllAttributeList', middleware.jwt(app.config.jwt), middleware.dealQueryParam(), controller.attribute.getAllAttributeList); // 获取所有的属性信息
  router.post('/api/attribute/insertAttribute', middleware.jwt(app.config.jwt), controller.attribute.insertAttribute); // 新增属性
  router.put('/api/attribute/updateAttribute', middleware.jwt(app.config.jwt), controller.attribute.updateAttribute); // 编辑属性
  router.delete('/api/attribute/deleteAttribute/:id', middleware.jwt(app.config.jwt), controller.attribute.deleteAttribute); // 删除属性
};
