'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 分类模块
*/
class CategoryController extends Controller {
  /**
    * @summary 分类列表分页查询
    * @description 分类列表分页查询
    * @router post /api/category/getAllCategoryList
    * @request body CategoryQueryParams
    * @response 200 CategoryJsonBody 返回结果
  */
  async getAllCategoryList() {
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
    const prefix = 'SELECT c.id,c.category_name,c.image,c.status,c.remark,c.is_delete,c.create_time,c.update_time FROM category AS c';
    const suffix = `ORDER BY id DESC limit ${params.ps} offset ${(params.pn - 1) * params.ps}`;
    let buildSql = ''
    
    Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
      if (['id', 'is_delete', 'status'].includes(key)) {
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} = '${params[key]}'` : `Where ${key} = '${params[key]}'`
      } else  if (['category_name'].includes(key)) {
        // 模糊查询的字段
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} LIKE '%${params[key]}%'` : `Where ${key} LIKE '%${params[key]}%'`
      }
    })

    // 组装sql语句
    const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result, total } = await ctx.service.category.getAllCategoryList(sql);

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
    * @summary 分类新增
    * @description 分类新增
    * @router post /api/category/insertCategory
    * @request body AddCategoryParams
    * @response 200 JsonBody 返回结果
  */
  async insertCategory() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ category_name: 'string', image: 'string', status: 'number', remark: 'string?' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.category.insertCategory(params);

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
    * @summary 分类编辑
    * @description 分类编辑
    * @router put /api/category/updateCategory
    * @request body EditCategoryParams
    * @response 200 JsonBody 返回结果
  */
  async updateCategory() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'number', category_name: 'string', image: 'string', status: 'number', remark: 'string?' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.category.updateCategory(params);

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
    * @summary 根据id删除分类
    * @description 根据id删除分类
    * @router delete /api/category/deleteCategory/:id
    * @Request query integer *id 分类id
    * @response 200 JsonBody 返回结果
  */
  async deleteCategory() {
    const { ctx } = this;
    const params = ctx.params;

    const result = await ctx.service.category.deleteCategory(params);

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

module.exports = CategoryController;
