// 用户模块路由
module.exports = app => {
  const { router, controller, middleware } = app;

  router.post('/api/user/login', controller.user.login); // 登录接口
  router.post('/api/user/getAllUserList', middleware.jwt(app.config.jwt), middleware.dealQueryParam(), controller.user.getAllUserList); // 获取所有的用户信息
  router.post('/api/user/insertUser', middleware.jwt(app.config.jwt), controller.user.insertUser); // 新增用户
  router.put('/api/user/updateUser', middleware.jwt(app.config.jwt), controller.user.updateUser); // 编辑用户
  router.delete('/api/user/deleteUser/:id', middleware.jwt(app.config.jwt), controller.user.deleteUser); // 删除用户
};
