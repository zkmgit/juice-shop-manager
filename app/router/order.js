const prefix = '/api/order/';

// 订单模块路由
module.exports = app => {
  const { router, controller } = app;

  // 获取所有的订单信息
  router.post(`${prefix}getAllOrderList`, controller.order.getAllOrderList);
  // 生成订单
  router.post(`${prefix}insertOrder`, controller.order.insertOrder);
  // 编辑订单状态
  router.put(`${prefix}updateOrder`, controller.order.updateOrder);
  
};
