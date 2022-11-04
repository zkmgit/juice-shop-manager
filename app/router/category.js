const prefix = '/api/category/';
// 分类模块路由
module.exports = app => {
  const { router, controller } = app;

  // 获取所有的分类信息
  router.post(`${prefix}getAllCategoryList`, controller.category.getAllCategoryList);
  // 新增分类
  router.post(`${prefix}insertCategory`, controller.category.insertCategory);
  // 编辑分类
  router.put(`${prefix}updateCategory`, controller.category.updateCategory);
  // 删除分类
  router.delete(`${prefix}deleteCategory/:id`, controller.category.deleteCategory);
};
