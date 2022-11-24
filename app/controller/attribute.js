'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 属性模块
*/
class AttributeController extends Controller {
  /**
    * @summary 属性列表分页查询
    * @description 属性列表分页查询
    * @router post /api/attribute/getAllAttributeList
    * @request body AttributeQueryParams
    * @response 200 AttributeJsonBody 返回结果
  */
  async getAllAttributeList() {
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
     const prefix = 'SELECT a.id,a.attribute_name,a.attribute_value,a.status,a.is_delete,a.create_time,a.update_time FROM attribute AS a'
     const suffix = `ORDER BY id DESC limit ${params.ps} offset ${(params.pn - 1) * params.ps}`
     let buildSql = ''
     
     Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
       if (['id', 'is_delete', 'status'].includes(key)) {
         buildSql = buildSql !== '' ? `${buildSql} AND ${key} = '${params[key]}'` : `Where ${key} = '${params[key]}'`
       } else  if (['attribute_name'].includes(key)) {
         // 模糊查询的字段
         buildSql = buildSql !== '' ? `${buildSql} AND ${key} LIKE '%${params[key]}%'` : `Where ${key} LIKE '%${params[key]}%'`
       }
     })
 
     // 组装sql语句
     const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result, total } = await ctx.service.attribute.getAllAttributeList(sql);

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
    * @summary 属性新增
    * @description 属性新增
    * @router post /api/attribute/insertAttribute
    * @request body AddAttributeParams
    * @response 200 JsonBody 返回结果
  */
  async insertAttribute() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ attribute_name: 'string', status: 'number', attribute_value: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
     
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.attribute.insertAttribute(params);

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
    * @summary 属性编辑
    * @description 属性编辑
    * @router put /api/attribute/updateAttribute
    * @request body EditAttributeParams
    * @response 200 JsonBody 返回结果
  */
  async updateAttribute() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'number', attribute_name: 'string', status: 'number', attribute_value: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.attribute.updateAttribute(params);

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
    * @summary 根据id删除属性
    * @description 根据id删除属性
    * @router delete /api/attribute/deleteAttribute/:id
    * @Request query integer *id 属性id
    * @response 200 JsonBody 返回结果
  */
  async deleteAttribute() {
    const { ctx } = this;
    const params = ctx.params;

    const result = await ctx.service.attribute.deleteAttribute(params);

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

module.exports = AttributeController;
