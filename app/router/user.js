const prefix = '/api/user/';

// 用户模块路由
module.exports = app => {
  const { router, controller } = app;

  // 登录接口
  router.post(`${prefix}login`, controller.user.login);
  // 获取所有的用户信息
  router.post(`${prefix}getAllUserList`, controller.user.getAllUserList);
  // 新增用户
  router.post(`${prefix}insertUser`, controller.user.insertUser);
  // 编辑用户
  router.put(`${prefix}updateUser`, controller.user.updateUser);
  // 删除用户
  router.delete(`${prefix}deleteUser/:id`, controller.user.deleteUser);
};
