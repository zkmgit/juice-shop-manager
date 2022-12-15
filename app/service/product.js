// app/service/product.js
const Service = require('egg').Service;

class ProductService extends Service {
  // 根据id获取产品信息
  async getProductInfoById(params) {
    const result = await this.app.mysql.get('product', params);

    return result;
  }
  // 获取所有的产品信息
  async getAllProductList(sql) {
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('select count(*) as total from product');

    return { result, total: total[0].total };
  }
  // 获取产品总数，用于生成spu
  async getProductTotal() {
    const total = await this.app.mysql.query('select count(*) as total from product');

    return { total: total[0].total };
  }
  // 新增产品
  async insertProduct(params) {
    const res = await this.app.mysql.insert('product', params);
    return { res };
  }
  // 编辑产品
  async updateProduct(params) {
    const res = await this.app.mysql.update('product', params);
    return { res };
  }
  // 编辑产品
  async updateProductBySql(sql) {
    const res = await this.app.mysql.query(sql);
    return { res };
  }
  // 删除产品
  async deleteProduct(params) {
    const res = await this.app.mysql.delete('product', params);
    return { res };
  }
}

module.exports = ProductService;
