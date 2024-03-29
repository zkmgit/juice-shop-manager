// app/service/order.js
const Service = require('egg').Service;

class OrderService extends Service {
  // 根据id获取订单信息
  async getOrderInfoById(params) {
    const result = await this.app.mysql.get('order', params);

    return result;
  }
  // 获取所有的订单信息
  async getAllOrderList(sql, buildSql = '') {
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('select count(*) as total from `order`' + (buildSql ? ` ${buildSql}` : ''));

    return { result, total: total[0].total };
  }
  // 获取订单总数，用于生成订单编号
  async getOrderTotal() {
    const total = await this.app.mysql.query('select count(*) as total from `order`');

    return { total: total[0].total };
  }
  // 生成订单
  async insertOrder(params) {
    const res = await this.app.mysql.insert('order', params);
    return { res };
  }
  // 编辑订单状态
  async updateOrder(params) {
    const res = await this.app.mysql.update('order', params);
    return { res };
  }
}

module.exports = OrderService;
