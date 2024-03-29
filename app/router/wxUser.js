const prefix = '/api/wxUser/';

// 小程序用户模块路由
module.exports = app => {
  const { router, controller } = app;

  // 小程序授权登录接口
  router.post(`${prefix}login`, controller.wxUser.login);
  // 获取所有的小程序用户信息
  router.post(`${prefix}getAllWxUserList`, controller.wxUser.getAllWxUserList);
  // 修改金额
  router.put(`${prefix}updateBalance`, controller.wxUser.updateBalance);
  // 冻结or解冻用户
  router.put(`${prefix}updateFreeze`, controller.wxUser.updateFreeze);
};
