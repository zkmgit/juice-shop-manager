'use strict';

const Controller = require('egg').Controller;
/**
* @controller 分类模块
*/
class CategoryController extends Controller {
  /**
    * @summary 分类列表分页查询
    * @description 分类列表分页查询
    * @router post /api/getAllCategoryList
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

    const { result, total } = await ctx.service.category.getAllCategoryList(options);

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
          // statusName: item.status === 1 ? '启用' : item.status === 2 ? '禁用' : '',
          // sexName: item.sex === 1 ? '男' : item.sex === 2 ? '女' : '',
        };
      }),
      total,
    };
  }
  /**
    * @summary 分类新增
    * @description 分类新增
    * @router post /api/insertCategory
    * @request body AddCategoryParams
    * @response 200 JsonBody 返回结果
  */
  async insertCategory() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ category_name: 'string', status: 'number', remark: 'string?' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      ctx.body = msg;
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
    * @router put /api/updateCategory
    * @request body EditCategoryParams
    * @response 200 JsonBody 返回结果
  */
  async updateCategory() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'number', category_name: 'string', status: 'number', remark: 'string?' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      ctx.body = msg;
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
    * @router delete /api/deleteCategory/:id
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
