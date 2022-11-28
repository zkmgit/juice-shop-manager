'use strict';
/**
 * home 首页模块
 * utils 工具模块
 * user 用户模块
 * category 分类模块
 * attribute 属性模块
 * carouselImage 轮播图模块
 * system 系统公用下拉模块
 * product 产品模块
 * shoppingCart 购物车模块
 * order 订单模块
 */
const routerFileNames = [ 'home', 'utils', 'user', 'category', 'attribute', 'carouselImage', 'system', 'product', 'shoppingCart', 'order' ];
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  // 页面路由加载
  routerFileNames.forEach(fileName => {
    require(`./router/${fileName}`)(app);
  });
};
