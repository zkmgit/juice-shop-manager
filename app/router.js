'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  router.get('/', controller.home.index);
  // 用户模块
  router.post('/api/login', controller.user.login); // 登录接口
  router.post('/api/getAllUserList', middleware.jwt(app.config.jwt), middleware.dealQueryParam(), controller.user.getAllUserList); // 获取所有的用户信息
  router.post('/api/insertUser', middleware.jwt(app.config.jwt), controller.user.insertUser); // 新增用户
  router.put('/api/updateUser', middleware.jwt(app.config.jwt), controller.user.updateUser); // 编辑用户
  router.delete('/api/deleteUser', middleware.jwt(app.config.jwt), controller.user.deleteUser); // 删除用户
};
