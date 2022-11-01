// app/service/category.js
const Service = require('egg').Service;

class CategoryService extends Service {
  // 获取所有的分类信息
  async getAllCategoryList(options) {
    const result = await this.app.mysql.select('category', options);
    const total = await this.app.mysql.query('select count(*) as total from category');

    return { result, total: total[0].total };
  }

  // 新增分类
  async insertCategory(params) {
    const res = await this.app.mysql.insert('category', params);
    return { res };
  }

  // 编辑用户
  async updateCategory(params) {
    const res = await this.app.mysql.update('category', params);
    return { res };
  }

  // 删除用户
  async deleteCategory(params) {
    const res = await this.app.mysql.delete('category', params);
    return { res };
  }
}

module.exports = CategoryService;