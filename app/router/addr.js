const prefix = '/api/addr/';
// 地址模块路由
module.exports = app => {
  const { router, controller } = app;

  // 获取所有的地址信息
  router.post(`${prefix}getAllAddrList`, controller.addr.getAllAddrList);
  // 新增地址
  router.post(`${prefix}insertAddr`, controller.addr.insertAddr);
  // 编辑地址
  router.put(`${prefix}updateAddr`, controller.addr.updateAddr);
  // 删除地址
  router.delete(`${prefix}deleteAddr/:id`, controller.addr.deleteAddr);
};
