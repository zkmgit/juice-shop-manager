// app/service/logistics.js
const Service = require('egg').Service;

class LogisticsService extends Service {
  // 根据id获取物流信息
  async getLogisticsInfoById(params) {
    const result = await this.app.mysql.get('logistics', params);

    return result;
  }
  // 获取所有的物流信息
  async getAllLogisticsList(sql) {
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('select count(*) as total from `logistics`');

    return { result, total: total[0].total };
  }
  // 获取物流总单数，用于生成快递编号
  async getLogisticsTotal() {
    const total = await this.app.mysql.query('select count(*) as total from `logistics`');

    return { total: total[0].total };
  }
  // 生成物流
  async insertLogistics(params) {
    const res = await this.app.mysql.insert('logistics', params);
    return { res };
  }
  // 编辑物流
  async updateLogistics(params) {
    const res = await this.app.mysql.update('logistics', params);
    return { res };
  }
}

module.exports = LogisticsService;
