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
      ctx.body = msg;
      return;
    }
    // 组装查询条件
    const where = Object.keys(params).filter(key => ![ 'ps', 'pn' ].includes(key)).reduce((pre, next) => {
      return { ...pre, [next]: params[next] };
    }, {});

    const options = {
      where, // WHERE 条件
      limit: params.ps, // 返回数据量
      offset: (params.pn - 1) * params.ps, // 数据偏移量
    };

    const { result, total } = await ctx.service.attribute.getAllAttributeList(options);

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
      ctx.body = msg;
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
      ctx.body = msg;
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
