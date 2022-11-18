'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 购物车模块
*/
class ShoppingCartController extends Controller {
  /**
    * @summary 购物车列表分页查询
    * @description 购物车列表分页查询
    * @router post /api/shoppingCart/getAllShoppingCartList
    * @request body ShoppingCartQueryParams
    * @response 200 ShoppingCartJsonBody 返回结果
  */
  async getAllShoppingCartList() {
    const { ctx } = this;
    const params = ctx.request.body;

    // 字段校验
    const validate = this.app.validator.validate({ pn: 'string', ps: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }


    // 组装查询条件
    const where = Object.keys(params).filter(key => ![ 'ps', 'pn' ].includes(key)).reduce((pre, next) => {
      return { ...pre, [next]: params[next] };
    }, {});

    const options = {
      where, // WHERE 条件
      orders: [['id','desc']], // 排序方式
      limit: params.ps, // 返回数据量
      offset: (params.pn - 1) * params.ps, // 数据偏移量
    };

    const { result, total } = await ctx.service.shoppingCart.getAllShoppingCartList(options);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: {},
        total: 0,
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result: result.map(item => {
        return {
          ...item,
          statusName: item.is_delete === 1 ? '未删除' : item.is_delete === 0 ? '已删除' : '',
          createTime: formatDateTime(item.create_time),
          updateTime: formatDateTime(item.update_time)
        };
      }),
      total,
    };
  }
  /**
    * @summary 新增购物车
    * @description 新增购物车
    * @router post /api/shoppingCart/insertShoppingCart
    * @request body AddShoppingCartParams
    * @response 200 JsonBody 返回结果
  */
  async insertShoppingCart() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ user_id: 'string', product_id: 'string', spu: 'string', price: 'string', title: 'string', quantity: 'string', specifications: 'string', product_image: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.shoppingCart.insertShoppingCart(params);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: {
          value: 0,
        },
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result: {
        value: result.res.affectedRows,
      },
    };
  }
  /**
    * @summary 编辑购物车
    * @description 编辑购物车
    * @router put /api/shoppingCart/updateShoppingCart
    * @request body EditShoppingCartParams
    * @response 200 JsonBody 返回结果
  */
  async updateShoppingCart() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'string', user_id: 'string', product_id: 'string', spu: 'string', price: 'string', title: 'string', quantity: 'string', specifications: 'string', product_image: 'string' }, params);
    
    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.shoppingCart.updateShoppingCart(params);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: {
          value: 0,
        },
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result: {
        value: result.res.affectedRows,
      },
    };

  }
  /**
    * @summary 根据id删除购物车
    * @description 根据id删除购物车
    * @router delete /api/shoppingCart/deleteShoppingCart/:id
    * @Request query integer *id 购物车id
    * @response 200 JsonBody 返回结果
  */
  async deleteShoppingCart() {
    const { ctx } = this;
    const params = ctx.params;

    params.is_delete = 0
    const result = await ctx.service.shoppingCart.updateShoppingCart(params);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: {
          value: 0,
        },
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result: {
        value: result.res.affectedRows,
      },
    };
  }
}

module.exports = ShoppingCartController;