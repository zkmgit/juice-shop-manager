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

    const { result, total } = await ctx.service.carouselImage.getAllCarouselImageList(options);

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
}

module.exports = CarouselImageController;
