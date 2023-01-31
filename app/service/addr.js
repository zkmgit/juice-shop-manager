// app/service/addr.js
const Service = require('egg').Service;

class AddrService extends Service {
  // 根据id获取地址信息
  async getAddrInfoById(params) {
    const result = await this.app.mysql.get('addr', params);

    return result;
  }
  // 获取所有的地址信息
  async getAllAddrList(sql) {
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('select count(*) as total from addr');

    return { result, total: total[0].total };
  }

  // 新增地址
  async insertAddr(params) {
    const res = await this.app.mysql.insert('addr', params);
    return { res };
  }

  // 编辑地址
  async updateAddr(params) {
    const res = await this.app.mysql.update('addr', params);
    return { res };
  }

  // 删除地址
  async deleteAddr(params) {
    const res = await this.app.mysql.delete('addr', params);
    return { res };
  }
}

module.exports = AddrService;
