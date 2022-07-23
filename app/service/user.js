// app/service/user.js
const Service = require('egg').Service;

class UserService extends Service {
  // 登录
  async login(params) {
    const res = await this.app.mysql.get('user', params);

    if (!res) {
      return {
        code: '-1',
        msg: 'error',
        result: {},
      };
    }

    // 登录成功生成token
    const token = this.app.jwt.sign(params, this.app.config.jwt.secret, { expiresIn: '1h' });

    return {
      code: '1',
      msg: 'success',
      result: res,
      token,
    };
  }
  // 获取所有的用户信息
  async getAllUserList() {
    const res = await this.app.mysql.select('user');

    if (!res) {
      return {
        code: '-1',
        msg: 'error',
        result: {},
      };
    }

    return {
      code: '1',
      msg: 'success',
      result: res.map(item => {
        return {
          ...item,
          statusName: item.status === 1 ? '启用' : item.status === 2 ? '禁用' : '',
          sexName: item.sex === 1 ? '男' : item.sex === 2 ? '女' : '',
        };
      }),
    };
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
