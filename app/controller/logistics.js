'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 物流模块
*/
class LogisticsController extends Controller {
  /**
    * @summary 物流列表分页查询
    * @description 物流列表分页查询
    * @router post /api/logistics/getAllLogisticsList
    * @request body LogisticsQueryParams
    * @response 200 LogisticsJsonBody 返回结果
  */
  async getAllLogisticsList() {
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

    const prefix = 'SELECT l.id,l.tracking_number,l.tracking_name,l.order_id,l.is_delete,l.remark,l.create_time,l.update_time,o.order_number,o.user_id,o.receiver,o.address,o.phone FROM logistics as l INNER JOIN `order` as o ON l.order_id = o.id'
    const suffix = `ORDER BY id DESC limit ${params.ps} offset ${(params.pn - 1) * params.ps}`
    let buildSql = ''

    Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
      if (['id', 'tracking_number', 'is_delete'].includes(key)) {
        if (buildSql !== '') {
          buildSql = `${buildSql} AND ${key} = '${params[key]}'`
        } else {
          buildSql = `AND ${key} = '${params[key]}'`
        }
      }
    })

    // 组装sql语句
    const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result, total } = await ctx.service.logistics.getAllLogisticsList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
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
          isDelete: item.is_delete === 1 ? '未删除' : item.is_delete === 0 ? '已删除' : '',
          createTime: formatDateTime(item.create_time),
          updateTime: formatDateTime(item.update_time)
        };
      }),
      total,
    };
  }
  /**
    * @summary 生成物流信息
    * @description 生成物流信息
    * @router post /api/logistics/insertLogistics
    * @Request body AddLogisticsParams
    * @response 200 JsonBody 返回结果
  */
   async insertLogistics() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ tracking_name: 'string', order_id: 'string', remark: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }
    
    // 订单编号 J-当前日期+5位数 系统生成
    const { total } = await ctx.service.logistics.getLogisticsTotal();
    
    const tracking_number = `KD-${formatDateTime(new Date(), 'YYYYMMDD')}${10000 + total}`

    // 生成物流组装参数
    const insertParams = {
      tracking_number,
      ...params
    }

    const result = await ctx.service.logistics.insertLogistics(insertParams);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: '发货失败.',
        result: {
          value: 0,
        },
      };
      return;
    }

    await ctx.service.order.updateOrder({ id: params.order_id, status: 3 });

    ctx.body = {
      code: '1',
      msg: '发货成功.',
      result: {
        value: result.res.affectedRows,
      },
    };
  }
}

module.exports = LogisticsController;
