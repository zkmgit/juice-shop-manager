'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 轮播图模块
*/
class CarouselImageController extends Controller {
  /**
    * @summary 轮播图列表分页查询
    * @description 轮播图列表分页查询
    * @router post /api/carouselImage/getAllCarouselImageList
    * @request body CarouselImageQueryParams
    * @response 200 CarouselImageJsonBody 返回结果
  */
  async getAllCarouselImageList() {
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
    const prefix = 'SELECT c.id,c.title,c.image,c.status,c.order_num,c.is_delete,c.create_time,c.update_time FROM carousel_image AS c'
    const suffix = `ORDER BY order_num ASC limit ${params.ps} offset ${(params.pn - 1) * params.ps}`
    let buildSql = ''
    
    Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
      if (['id', 'is_delete', 'status', 'order_num'].includes(key)) {
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} = '${params[key]}'` : `Where ${key} = '${params[key]}'`
      } else  if (['title'].includes(key)) {
        // 模糊查询的字段
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} LIKE '%${params[key]}%'` : `Where ${key} LIKE '%${params[key]}%'`
      }
    })

    // 组装sql语句
    const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result, total } = await ctx.service.carouselImage.getAllCarouselImageList(sql, buildSql);

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
    * @summary 轮播图新增
    * @description 轮播图新增
    * @router post /api/carouselImage/insertCarouselImage
    * @request body AddCarouselImageParams
    * @response 200 JsonBody 返回结果
  */
  async insertCarouselImage() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ title: 'string', status: 'number', image: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
     
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.carouselImage.insertCarouselImage(params);

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
    * @summary 轮播图编辑
    * @description 轮播图编辑
    * @router put /api/carouselImage/updateCarouselImage
    * @request body EditCarouselImageParams
    * @response 200 JsonBody 返回结果
  */
  async updateCarouselImage() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'number', title: 'string', status: 'number', image: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.carouselImage.updateCarouselImage(params);

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
    * @summary 根据id删除轮播图
    * @description 根据id删除轮播图
    * @router delete /api/carouselImage/deleteCarouselImage/:id
    * @Request query integer *id 轮播图id
    * @response 200 JsonBody 返回结果
  */
  async deleteCarouselImage() {
    const { ctx } = this;
    const params = ctx.params;

    const result = await ctx.service.carouselImage.deleteCarouselImage(params);

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
    * @summary 轮播图批量排序
    * @description 轮播图批量排序
    * @router post /api/carouselImage/batchSortCarouselImage
    * @request body BatchSortCarouselImageParams
    * @response 200 JsonBody 返回结果
  */
   async batchSortCarouselImage() {
    const { ctx } = this;
    const params = ctx.request.body;

    if (!Array.isArray(params) || params.length === 0) {
      
      ctx.body = {
        code: '-1',
        msg: '参数错误',
        result: {},
      };
      return;
    }

      // 批量修改排序
      const promiseList = params.map(param => ctx.service.carouselImage.updateCarouselImage(param))
      
      const resList = await Promise.all(promiseList)

      ctx.body = {
        code: '1',
        msg: 'success',
        result: {
          value: resList.reduce((pre, next) => {
            return pre + next.res.affectedRows
          }, 0),
        },
      };

  }
}

module.exports = CarouselImageController;
