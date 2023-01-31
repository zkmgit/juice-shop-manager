// 首页模块路由
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/', controller.home.index);
  // 登录接口
  router.post('/wxApi/user/login', controller.home.login);
  router.post('/wxApi/user/getToken', controller.home.getToken);
  // 轮播图
  router.get('/wxApi/system/carouselImageList', controller.home.carouselImageList);
  // 类目
  router.get('/wxApi/category/getAllCategoryList', controller.home.getAllCategoryList);
  // 属性
  router.get('/wxApi/attribute/getAttributesByIds/:ids', controller.home.getAttributesByIds);
  // 产品
  router.post('/wxApi/product/getAllProductList', controller.home.getAllProductList);
  // 根据分类id获取产品信息
  router.get('/wxApi/product/getAllProductListByCategoryId/:id', controller.home.getAllProductListByCategoryId);
  // 根据商品id获取商品详情
  router.get('/wxApi/product/getProductInfoById/:id', controller.home.getProductInfoById);
  // 购物车
  router.get('/wxApi/shoppingCart/getAllShoppingCartList/:id', controller.home.getAllShoppingCartList);
  router.post('/wxApi/shoppingCart/insertAndSaveShoppingCart', controller.home.insertAndSaveShoppingCart);
  router.delete('/wxApi/shoppingCart/batchDelShoppingCart/:ids', controller.home.batchDelShoppingCart);
  // 订单
  // router.get('/wxApi/order/checkInventory/:id', controller.home.checkInventory);
  router.post('/wxApi/order/insertOrder', controller.home.insertOrder);
  router.get('/wxApi/order/getAllOrderList/:id', controller.home.getAllOrderList);
  // 地址
  router.post('/wxApi/addr/getAllAddrList', controller.home.getAllAddrList);
  router.post('/wxApi/addr/insertAddr', controller.home.insertAddr);
  router.put('/wxApi/addr/updateAddr', controller.home.updateAddr);
  router.put('/wxApi/addr/deleteAddr', controller.home.deleteAddr);
  router.get('/wxApi/addr/getDefaultAddr', controller.home.getDefaultAddr);
};
