const prefix = '/api/shoppingCart/';

// 购物车模块路由
module.exports = app => {
  const { router, controller } = app;

  // 获取所有的购物车信息
  router.post(`${prefix}getAllShoppingCartList`, controller.shoppingCart.getAllShoppingCartList);
  // 新增和保存购物车
  router.post(`${prefix}insertAndSaveShoppingCart`, controller.shoppingCart.insertAndSaveShoppingCart);
  // 新增购物车
  router.post(`${prefix}insertShoppingCart`, controller.shoppingCart.insertShoppingCart);
  // 编辑购物车
  router.put(`${prefix}updateShoppingCart`, controller.shoppingCart.updateShoppingCart);
  // 删除购物车
  router.delete(`${prefix}deleteShoppingCart/:id`, controller.shoppingCart.deleteShoppingCart);
};
