// app/service/attribute.js
const Service = require('egg').Service;

class AttributeService extends Service {
  // 根据id获取属性信息
  async getAttributeInfoById(params) {
    const result = await this.app.mysql.get('attribute', params);

    return result;
  }
  // 获取所有的属性信息
  async getAllAttributeList(sql) {
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('select count(*) as total from attribute');

    return { result, total: total[0].total };
  }

  // 新增属性
  async insertAttribute(params) {
    const res = await this.app.mysql.insert('attribute', params);
    return { res };
  }

  // 编辑属性
  async updateAttribute(params) {
    const res = await this.app.mysql.update('attribute', params);
    return { res };
  }

  // 删除属性
  async deleteAttribute(params) {
    const res = await this.app.mysql.delete('attribute', params);
    return { res };
  }
}

module.exports = AttributeService;
