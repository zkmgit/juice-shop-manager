// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
  // 登录
  async login(params) {
    const result = await this.app.mysql.get('user', params);

    return result;
  }
  // 获取所有的用户信息
  async getAllUserList(sql) {
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('select count(*) as total from user');

    return { result, total: total[0].total };
  }
  async insertUser(params) {
    // 新增用户
    const res = await this.app.mysql.insert('user', params);
    return { res };
  }
  async updateUser(params) {
    // 编辑用户
    const res = await this.app.mysql.update('user', params);
    return { res };
  }
  async deleteUser(params) {
    // 删除用户
    const res = await this.app.mysql.delete('user', params);
    return { res };
  }
}

module.exports = UserService;
