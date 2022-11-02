// 分类模块路由
module.exports = app => {
  const { router, controller, middleware } = app;

  router.post('/api/category/getAllCategoryList', middleware.jwt(app.config.jwt), middleware.dealQueryParam(), controller.category.getAllCategoryList); // 获取所有的分类信息
  router.post('/api/category/insertCategory', middleware.jwt(app.config.jwt), controller.category.insertCategory); // 新增分类
  router.put('/api/category/updateCategory', middleware.jwt(app.config.jwt), controller.category.updateCategory); // 编辑分类
  router.delete('/api/category/deleteCategory/:id', middleware.jwt(app.config.jwt), controller.category.deleteCategory); // 删除分类
};
