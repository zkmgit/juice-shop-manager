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

    const options = {
      where: {
        status: 1
      },
      orders: [['order_num','asc']], // 排序方式
      limit: 3, // 返回数据量
      offset: 0, // 数据偏移量
    };

    const { result } = await ctx.service.carouselImage.getAllCarouselImageList(options);

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
    
    const options = {
      where: {
        status: 1
      },
      limit: 999, // 返回数据量
      offset: 0, // 数据偏移量
    };

    const { result } = await ctx.service.category.getAllCategoryList(options);

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
    
    const options = {
      where: {
        status: 1
      },
      limit: 999, // 返回数据量
      offset: 0, // 数据偏移量
    };

    const { result } = await ctx.service.user.getAllUserList(options);

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
    
    const options = {
      where: {
        status: 1
      },
      limit: 999, // 返回数据量
      offset: 0, // 数据偏移量
    };

    const { result } = await ctx.service.attribute.getAllAttributeList(options);

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
