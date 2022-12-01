const prefix = '/api/logistics/';

// 物流模块路由
module.exports = app => {
  const { router, controller } = app;

  // 获取所有的物流信息
  router.post(`${prefix}getAllLogisticsList`, controller.logistics.getAllLogisticsList);
  // 生成物流信息
  router.post(`${prefix}insertLogistics`, controller.logistics.insertLogistics);
  
};
