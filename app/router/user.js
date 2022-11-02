// 用户模块路由
module.exports = app => {
  const { router, controller, middleware } = app;

  router.post('/api/user/login', controller.user.login); // 登录接口
  router.post('/api/user/getAllUserList', middleware.dealQueryParam(), controller.user.getAllUserList); // 获取所有的用户信息
  router.post('/api/user/insertUser', controller.user.insertUser); // 新增用户
  router.put('/api/user/updateUser', controller.user.updateUser); // 编辑用户
  router.delete('/api/user/deleteUser/:id', controller.user.deleteUser); // 删除用户
};
