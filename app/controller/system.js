'use strict';

const Controller = require('egg').Controller;
/**
* @controller 系统公用下拉模块
*/
class SystemController extends Controller {
  /**
    * @summary 轮播图
    * @description 轮播图
    * @router get /api/system/carouselImageList
    * @response 200 SystemSelectJsonBody 返回结果
  */
  async carouselImageList() {
    const { ctx } = this;

    // sql组装
    const prefix = 'SELECT c.id,c.title,c.image,c.status,c.order_num,c.is_delete,c.create_time,c.update_time FROM carousel_image AS c'
    const suffix = ` Where status = '1' ORDER BY order_num ASC limit 3 offset 0`
    const sql = prefix + suffix

    const { result } = await ctx.service.carouselImage.getAllCarouselImageList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result: result.map(item => {
        return {
          label: item.title,
          value: item.image,
          id: item.id
        };
      }),
    };
  }
  /**
    * @summary 类目
    * @description 类目
    * @router get /api/system/categoryList
    * @response 200 SystemSelectJsonBody 返回结果
  */
   async categoryList() {
    const { ctx } = this;

    // sql组装
    const prefix = 'SELECT c.id,c.category_name,c.image,c.status,c.remark,c.is_delete,c.create_time,c.update_time FROM category AS c';
    const suffix = ` Where status = '1' limit 999 offset 0`;
    const sql = prefix + suffix

    const { result } = await ctx.service.category.getAllCategoryList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result: result.map(item => {
        return {
          label: item.category_name,
          value: item.id
        };
      }),
    };
  }
  /**
    * @summary 用户
    * @description 用户
    * @router get /api/system/userList
    * @response 200 SystemSelectJsonBody 返回结果
  */
   async userList() {
    const { ctx } = this;

    // sql组装
    const prefix = 'SELECT u.id,u.name,u.username,u.password,u.sex,u.status,u.email,u.is_delete,u.create_time,u.update_time FROM user AS u';
    const suffix = ` Where status = '1' limit 999 offset 0`;
    const sql = prefix + suffix

    const { result } = await ctx.service.user.getAllUserList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result: result.map(item => {
        return {
          label: item.name,
          value: item.id
        };
      }),
    };
  }
  /**
    * @summary 属性
    * @description 属性
    * @router get /api/system/attributeList
    * @response 200 SystemSelectJsonBody 返回结果
  */
   async attributeList() {
    const { ctx } = this;

     // sql组装
     const prefix = 'SELECT a.id,a.attribute_name,a.attribute_value,a.status,a.is_delete,a.create_time,a.update_time FROM attribute AS a'
     const suffix = ` Where status = '1' limit 999 offset 0`;
     const sql = prefix + suffix

    const { result } = await ctx.service.attribute.getAllAttributeList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result: result.map(item => {
        return {
          label: item.attribute_name,
          value: item.id
        };
      }),
    };
  }
}

module.exports = SystemController;
