// app/service/shoppingCart.js
const Service = require('egg').Service;

class ShoppingCartService extends Service {
  // 根据id获取购物车信息
  async getShoppingCartInfoById(params) {
    const result = await this.app.mysql.get('shopping_cart', params);

    return result;
  }
  // 获取所有的购物车信息
  async getAllShoppingCartList(sql, buildSql = '') {
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('select count(*) as total from shopping_cart' + (buildSql ? ` ${buildSql}` : ''));

    return { result, total: total[0].total };
  }
  // 新增购物车
  async insertShoppingCart(params) {
    const res = await this.app.mysql.insert('shopping_cart', params);
    return { res };
  }
  // 编辑购物车
  async updateShoppingCart(params) {
    const res = await this.app.mysql.update('shopping_cart', params);
    return { res };
  }
  // 删除购物车
  async deleteShoppingCart(params) {
    const res = await this.app.mysql.delete('shopping_cart', params);
    return { res };
  }
}

module.exports = ShoppingCartService;
