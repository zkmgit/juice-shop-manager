// app/service/carouselImage.js
const Service = require('egg').Service;

class CarouselImageService extends Service {
  // 获取所有的轮播图信息
  async getAllCarouselImageList(sql) {
    const result = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query('select count(*) as total from carousel_image');

    return { result, total: total[0].total };
  }

  // 新增轮播图
  async insertCarouselImage(params) {
    const res = await this.app.mysql.insert('carousel_image', params);
    return { res };
  }

  // 编辑轮播图
  async updateCarouselImage(params) {
    const res = await this.app.mysql.update('carousel_image', params);
    return { res };
  }

  // 删除轮播图
  async deleteCarouselImage(params) {
    const res = await this.app.mysql.delete('carousel_image', params);
    return { res };
  }
}

module.exports = CarouselImageService;
