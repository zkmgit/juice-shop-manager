'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 产品模块
*/
class ProductController extends Controller {
  /**
    * @summary 产品列表分页查询
    * @description 产品列表分页查询
    * @router post /api/product/getAllProductList
    * @request body ProductQueryParams
    * @response 200 ProductJsonBody 返回结果
  */
  async getAllProductList() {
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
    const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.details_img,p.status,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time,p.original_price FROM `product` AS p'
    const suffix = `ORDER BY id DESC limit ${params.ps} offset ${(params.pn - 1) * params.ps}`
    let buildSql = ''
    
    Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
      if (['id', 'spu', 'is_delete', 'status', 'category_id'].includes(key)) {
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} = '${params[key]}'` : `Where ${key} = '${params[key]}'`
      } else  if (['title'].includes(key)) {
        // 模糊查询的字段
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} LIKE '%${params[key]}%'` : `Where ${key} LIKE '%${params[key]}%'`
      }
    })

    // 组装sql语句
    const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result, total } = await ctx.service.product.getAllProductList(sql);

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
    * @summary 新增产品
    * @description 新增产品
    * @router post /api/product/insertProduct
    * @request body AddProductParams
    * @response 200 JsonBody 返回结果
  */
  async insertProduct() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ title: 'string', image: 'string', status: 'string', price: 'string', original_price: 'string', details_img: 'string', category_id: 'string', categoryName: 'string', inventory: 'string', attributes: 'string', attributesName: 'string', remark: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }
    //  spu: 'SPU(202200000 +【产品数量】) 9位数',
    const { total } = await ctx.service.product.getProductTotal();
    const spu = 202200000 + Number(total)

    params.spu = spu

    const result = await ctx.service.product.insertProduct(params);

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
    * @summary 编辑产品
    * @description 编辑产品
    * @router put /api/product/updateProduct
    * @request body EditProductParams
    * @response 200 JsonBody 返回结果
  */
  async updateProduct() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'string', status: 'string', title: 'string', image: 'string', price: 'string', original_price: 'string', details_img: 'string', category_id: 'string', categoryName: 'string', inventory: 'string', attributes: 'string', attributesName: 'string', remark: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.product.updateProduct(params);

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
    * @summary 根据id删除产品
    * @description 根据id删除产品
    * @router delete /api/product/deleteProduct/:id
    * @Request query integer *id 产品id
    * @response 200 JsonBody 返回结果
  */
  async deleteProduct() {
    const { ctx } = this;
    const params = ctx.params;

    const result = await ctx.service.product.deleteProduct(params);

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

module.exports = ProductController;
