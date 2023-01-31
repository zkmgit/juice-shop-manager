'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 地址模块
*/
class AddrController extends Controller {
  /**
    * @summary 地址列表分页查询
    * @description 地址列表分页查询
    * @router post /api/addr/getAllAddrList
    * @request body AttributeQueryParams
    * @response 200 AttributeJsonBody 返回结果
  */
  async getAllAddrList() {
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

     // sql组装
     const prefix = 'SELECT a.id,a.name,a.user_id,a.area,a.address,a.phone,a.status,a.is_delete,a.create_time,a.update_time FROM addr AS a';
     const suffix = `limit ${params.ps} offset ${(params.pn - 1) * params.ps}`;
     let buildSql = '';
     
     Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
       if (['id', 'is_delete', 'status'].includes(key)) {
         buildSql = buildSql !== '' ? `${buildSql} AND ${key} = '${params[key]}'` : `Where ${key} = '${params[key]}'`
       } else  if (['name'].includes(key)) {
         // 模糊查询的字段
         buildSql = buildSql !== '' ? `${buildSql} AND ${key} LIKE '%${params[key]}%'` : `Where ${key} LIKE '%${params[key]}%'`
       }
     })
 
     // 组装sql语句
     const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result, total } = await ctx.service.addr.getAllAddrList(sql);

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
          statusName: item.status === 1 ? '启用' : item.status === 0 ? '禁用' : '',
          createTime: formatDateTime(item.create_time),
          updateTime: formatDateTime(item.update_time)
        };
      }),
      total,
    };
  }
  /**
    * @summary 地址新增
    * @description 地址新增
    * @router post /api/addr/insertAddr
    * @request body AddAttributeParams
    * @response 200 JsonBody 返回结果
  */
  async insertAddr() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ user_id: 'string', name: 'string', area: 'string', address: 'string', phone: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
     
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.addr.insertAddr(params);

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
    * @summary 地址编辑
    * @description 地址编辑
    * @router put /api/addr/updateAddr
    * @request body EditAttributeParams
    * @response 200 JsonBody 返回结果
  */
  async updateAddr() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'number', user_id: 'string', name: 'string', area: 'string', address: 'string', phone: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.addr.updateAddr(params);

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
    * @summary 根据id删除地址
    * @description 根据id删除地址
    * @router delete /api/addr/deleteAddr/:id
    * @Request query integer *id 地址id
    * @response 200 JsonBody 返回结果
  */
  async deleteAddr() {
    const { ctx } = this;
    const params = ctx.params;

    const result = await ctx.service.addr.deleteAddr(params);

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

module.exports = AddrController;
