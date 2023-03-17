const prefix = '/api/product/';

// 商品模块路由
module.exports = app => {
  const { router, controller } = app;

  // 获取所有的产品信息
  router.post(`${prefix}getAllProductList`, controller.product.getAllProductList);
  // 新增产品
  router.post(`${prefix}insertProduct`, controller.product.insertProduct);
  // 编辑产品
  router.put(`${prefix}updateProduct`, controller.product.updateProduct);
  // 编辑限时秒杀时间
  router.put(`${prefix}updateSkillProduct`, controller.product.updateSkillProduct);
  // 删除产品
  router.delete(`${prefix}deleteProduct/:id`, controller.product.deleteProduct);
};
