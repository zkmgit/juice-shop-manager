// 首页模块路由
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/', controller.home.index);
  // 登录接口
  router.post('/wxApi/user/login', controller.home.login);
  // 轮播图
  router.get('/wxApi/system/carouselImageList', controller.home.carouselImageList);
  // 类目
  router.get('/wxApi/category/getAllCategoryList', controller.home.getAllCategoryList);
  // 产品
  router.post('/wxApi/product/getAllProductList', controller.home.getAllProductList);
  // 根据分类id获取产品信息
  router.get('/wxApi/product/getAllProductListByCategoryId/:id', controller.home.getAllProductListByCategoryId);
  // 根据商品id获取商品详情
  router.get('/wxApi/product/getProductInfoById/:id', controller.home.getProductInfoById);
  // 购物车
  router.get('/wxApi/shoppingCart/getAllShoppingCartList/:id', controller.home.getAllShoppingCartList);
  router.post('/wxApi/shoppingCart/insertAndSaveShoppingCart', controller.home.insertAndSaveShoppingCart);
  // 订单
  router.post('/wxApi/order/insertOrder', controller.home.insertOrder);
  router.get('/wxApi/order/getAllOrderList/:id', controller.home.getAllOrderList);
};
