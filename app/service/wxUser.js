// app/service/wxUser.js
const Service = require('egg').Service;

class WxUserService extends Service {
  // 根据id获取小程序用户
  async getWxUserInfoById(params) {
    const result = await this.app.mysql.get('wx_user', params);

    return result;
  }
  // 获取所有的小程序用户信息
  async getAllWxUserList(sql) {
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('select count(*) as total from wx_user');

    return { result, total: total[0].total };
  }
  // 新增小程序用户
  async insertWxUser(params) {
    const res = await this.app.mysql.insert('wx_user', params);

    return { res };
  }
  // 编辑小程序用户
  async updateWxUser(params) {
    const res = await this.app.mysql.update('wx_user', params);

    return { res };
  }
  // 编辑金额
  async updateBalance(params) {
    const res = await this.app.mysql.update('wx_user', params);
    return { res };
  }
  //冻结or解冻用户
  async updateFreeze(params) {
    const res = await this.app.mysql.update('wx_user', params);
    return { res };
  }
  // 删除小程序用户
  async deleteWxUser(params) {
    const res = await this.app.mysql.delete('wx_user', params);

    return { res };
  }
}

module.exports = WxUserService;
