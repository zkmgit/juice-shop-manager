const prefix = '/api/system/';
// 系统公用下拉数据模块路由
module.exports = app => {
  const { router, controller } = app;

  // 获取轮播图
  router.get(`${prefix}carouselImageList`, controller.system.carouselImageList);
  // 获取用户
  router.get(`${prefix}userList`, controller.system.userList);
  // 类目
  router.get(`${prefix}categoryList`, controller.system.categoryList);
  // 属性
  router.get(`${prefix}attributeList`, controller.system.attributeList);
};
