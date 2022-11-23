'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 订单模块
*/
class OrderController extends Controller {
  /**
    * @summary 订单列表分页查询
    * @description 订单列表分页查询
    * @router post /api/order/getAllOrderList
    * @request body OrderQueryParams
    * @response 200 OrderJsonBody 返回结果
  */
  async getAllOrderList() {
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

    const prefix = 'SELECT o.id, o.order_number, o.user_id, o.cart_ids, o.total_amount, o.total_quantity, o.status, o.receiver, o.address, o.phone, o.is_delete, o.remark, o.create_time, o.update_time FROM `order` AS o'
    const suffix = `ORDER BY id DESC limit ${params.ps} offset ${(params.pn - 1) * params.ps}`
    let buildSql = ''

    Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
      if (['id', 'order_number', 'user_id', 'status', 'is_delete'].includes(key)) {
        if (buildSql !== '') {
          buildSql = `${buildSql} AND ${key} = '${params[key]}'`
        } else {
          buildSql = `Where ${key} = '${params[key]}'`
        }
      }
    })

    // 组装sql语句
    const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result, total } = await ctx.service.order.getAllOrderList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: {},
        total: 0,
      };
      return;
    }

    const promiseList = result.map(item => {
      const ids = item.cart_ids.split(',')

      return ctx.service.shoppingCart.getAllShoppingCartList({ limit: 999, offset: 0, where: { id: ids } });
    })

    const cartInfos = await Promise.all(promiseList);
    // 获取购物车信息
    result.forEach((item, index) => {
      item.cartInfo = cartInfos[index];
      item.createTime = formatDateTime(item.create_time),
      item.updateTime = formatDateTime(item.update_time)
    })

    ctx.body = {
      code: '1',
      msg: 'success',
      result,
      total,
    };
  }
  /**
    * @summary 生成订单
    * @description 生成订单
    * @router post /api/order/insertOrder
    * @Request body AddOrderParams
    * @response 200 JsonBody 返回结果
  */
  async insertOrder() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ cartInfoList: 'array', receiver: 'string', address: 'string', phone: 'string', remark: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const { cartInfoList, ...rest  } = params
    
    // 订单编号 J-当前日期+5位数 系统生成
    const { total } = await ctx.service.order.getOrderTotal();
    
    const order_number = `J-${formatDateTime(new Date(), 'YYYYMMDD')}${10000 + total}`
    // 用户id
    const user_id = cartInfoList[0].user_id
    // 购车车ids
    const cart_ids = cartInfoList.map(item => item.id).join(',')
    // 总价格
    const total_amount = cartInfoList.reduce((pre, next) => {
      const { price, quantity } = next

      const amount = ((price * 100) * quantity) / 100
      return pre + amount
    }, 0)
    // 总商品数
    const total_quantity = cartInfoList.reduce((pre, next) => {
      return pre + next.quantity
    }, 0)

    // 生成订单组装参数
    const insertParams = {
      ...rest,
      order_number,
      user_id,
      cart_ids,
      total_amount,
      total_quantity,
    }

    const result = await ctx.service.order.insertOrder(insertParams);

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

    // 订单成功生成后，需要编辑购物车状态
    cartInfoList.map(item => item.id).forEach(async id => {
      const params = { id, is_delete: 0 }
      await ctx.service.shoppingCart.updateShoppingCart(params);
    })

    ctx.body = {
      code: '1',
      msg: 'success',
      result: {
        value: result.res.affectedRows,
      },
    };
  }
  /**
    * @summary 编辑订单状态
    * @description 编辑订单状态
    * @router put /api/order/updateOrder
    * @Request body EditOrderParams
    * @response 200 JsonBody 返回结果
  */
  async updateOrder() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'string', status: 'string' }, params);
    
    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.order.updateOrder(params);

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

module.exports = OrderController;
