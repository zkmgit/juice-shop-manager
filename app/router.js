'use strict';
/**
 * utils 工具模块
 * user 用户模块
 * category 分类模块
 * attribute 属性模块
 * carouselImage 轮播图模块
 * system 系统公用下拉模块
 * product 产品模块
 */
const routerFileNames = [ 'utils', 'user', 'category', 'attribute', 'carouselImage', 'system', 'product' ];
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 首页
  router.get('/', controller.home.index);
  // 页面路由加载
  routerFileNames.forEach(fileName => {
    require(`./router/${fileName}`)(app);
  });
};
