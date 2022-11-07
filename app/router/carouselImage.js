const prefix = '/api/carouselImage/';
// 轮播图模块路由
module.exports = app => {
  const { router, controller } = app;

  // 获取所有的轮播图信息
  router.post(`${prefix}getAllCarouselImageList`, controller.carouselImage.getAllCarouselImageList);
  // 新增轮播图
  router.post(`${prefix}insertCarouselImage`, controller.carouselImage.insertCarouselImage);
  // 编辑轮播图
  router.put(`${prefix}updateCarouselImage`, controller.carouselImage.updateCarouselImage);
  // 删除轮播图
  router.delete(`${prefix}deleteCarouselImage/:id`, controller.carouselImage.deleteCarouselImage);
};
