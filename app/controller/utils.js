'use strict';

const Controller = require('egg').Controller;

class UtilsController extends Controller {
  async uploadFiles() {
    const { ctx } = this;
    const data = await ctx.service.utils.uploadFiles();
    if (data) {
      ctx.body = {
        code: '1',
        msg: '上传成功',
        result: data
      };
    } else {
      ctx.body = {
        code: '-1',
        msg: '上传失败',
        result: {}
      };
    }
  }
  async batchCheck() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ oldrealmname: 'string', newrealmname: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
     
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const promiseList = [];
    // 分类
    const categorySql = 'SELECT c.id,c.image FROM category AS c';
    const categoryRes = await ctx.service.category.getAllCategoryList(categorySql);
    // 轮播图
    const carouselImageSql = 'SELECT c.id,c.image FROM carousel_image AS c';
    const carouselImageRes = await ctx.service.carouselImage.getAllCarouselImageList(carouselImageSql);
    // 产品
    const productSql = 'SELECT p.id,p.image FROM `product` AS p';
    const productRes = await ctx.service.product.getAllProductList(productSql);
    // 购物车
    const shoppingCartSql = 'SELECT s.id,s.product_image FROM `shopping_cart` AS s';
    const shoppingCartRes = await ctx.service.shoppingCart.getAllShoppingCartList(shoppingCartSql);

    if (categoryRes.result && categoryRes.result.length > 0) {
      categoryRes.result.forEach(categoryItem => {
        const c_params = { id: categoryItem.id, image: categoryItem.image.replace(params.oldrealmname, params.newrealmname) }
        promiseList.push(ctx.service.category.updateCategory(c_params));
      })
    }

    if (carouselImageRes.result && carouselImageRes.result.length > 0) {
      carouselImageRes.result.forEach(carouselImageItem => {
        const c_params = { id: carouselImageItem.id, image: carouselImageItem.image.replace(params.oldrealmname, params.newrealmname) }
        promiseList.push(ctx.service.carouselImage.updateCarouselImage(c_params));
      })
    }

    if (productRes.result && productRes.result.length > 0) {
      productRes.result.forEach(productItem => {
        const p_params = { id: productItem.id, image: productItem.image.replace(params.oldrealmname, params.newrealmname) }
        promiseList.push(ctx.service.product.updateProduct(p_params));
      })
    }

    if (shoppingCartRes.result && shoppingCartRes.result.length > 0) {
      shoppingCartRes.result.forEach(shoppingCartItem => {
        const s_params = { id: shoppingCartItem.id, product_image: shoppingCartItem.product_image.replace(params.oldrealmname, params.newrealmname) }
        promiseList.push(ctx.service.shoppingCart.updateShoppingCart(s_params));
      })
    }

    await Promise.all(promiseList);

    ctx.body = {
      code: '1',
      msg: '批量替换URL成功.',
      result: {
        value: 1,
      },
    };
  }
}

module.exports = UtilsController;
