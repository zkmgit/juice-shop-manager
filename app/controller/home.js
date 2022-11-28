'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller Juice小程序接口文档
*/
class HomeController extends Controller {
  /**
    * @summary 测试首页。
    * @description 测试首页swagger。
    * @router get /
    * @response 200 JsonBody 返回结果
    */
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  /**
    * @summary 用户登录接口
    * @description 用户登录接口
    * @router post /wxApi/user/login
    * @request body LoginParams
    * @response 200 UserJsonBody 返回结果
  */
  async login() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ username: 'string', password: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;

      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const res = await ctx.service.user.login(params);

    if (!res) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: {},
      };
      return;
    }

    // 登录成功生成token
    const token = this.app.jwt.sign(params, this.app.config.jwt.secret, { expiresIn: '2h' });

    ctx.body = {
      code: '1',
      msg: 'success',
      result: res,
      token,
    };
  }
  /**
    * @summary 首页轮播图接口
    * @description 首页轮播图接口 默认返回前3条轮播图数据
    * @router get /wxApi/system/carouselImageList
    * @response 200 SystemSelectJsonBody 返回结果
  */
   async carouselImageList() {
    const { ctx } = this;

    // sql组装
    const prefix = 'SELECT c.id,c.title,c.image,c.status,c.order_num,c.is_delete,c.create_time,c.update_time FROM carousel_image AS c'
    const suffix = ` Where status = '1' ORDER BY order_num ASC limit 3 offset 0`
    const sql = prefix + suffix

    const { result } = await ctx.service.carouselImage.getAllCarouselImageList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result: result.map(item => {
        return {
          label: item.title,
          value: item.image,
          id: item.id
        };
      }),
    };
  }
  /**
    * @summary 分类接口
    * @description 分类接口 默认返回前10条分类数据
    * @router get /wxApi/category/getAllCategoryList
    * @response 200 CategoryJsonBody 返回结果
  */
   async getAllCategoryList() {
    const { ctx } = this;

    // sql组装
    const prefix = 'SELECT c.id,c.category_name,c.image,c.status,c.remark,c.is_delete,c.create_time,c.update_time FROM category AS c';
    const suffix = `Where status = '1' limit 10 offset 0`;

    // 组装sql语句
    const sql = `${prefix} ${suffix}`;

    const { result } = await ctx.service.category.getAllCategoryList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result,
    };
  }
  /**
    * @summary 产品列表分页查询
    * @description 产品列表分页查询 1. 首页商品展示入参 pn ps 2.分类页面 根据类目id获取商品入参 category_id pn ps
    * @router post /wxApi/product/getAllProductList
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
    const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.details_img,p.status,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time FROM `product` AS p'
    const suffix = `limit ${params.ps} offset ${(params.pn - 1) * params.ps}`
    let buildSql = `Where is_delete = '1' AND status = '1'`
    
    Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
      if (['id', 'spu', 'category_id'].includes(key)) {
        buildSql = `${buildSql} AND ${key} = '${params[key]}'`
      } else  if (['title'].includes(key)) {
        // 模糊查询的字段
        buildSql = `${buildSql} AND ${key} LIKE '%${params[key]}%'`
      }
    })

    // 组装sql语句
    const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result } = await ctx.service.product.getAllProductList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result,
    };
  }
  /**
    * @summary 获取当前用户的购物车列表
    * @description 获取当前用户的购物车列表  入参 当前登录用户的id
    * @router get /wxApi/shoppingCart/getAllShoppingCartList
    * @request query integer *id 用户id
    * @response 200 ShoppingCartJsonBody 返回结果
  */
   async getAllShoppingCartList() {
    const { ctx } = this;
    const params = ctx.params;

    // sql组装
    const prefix = 'SELECT s.id,s.user_id,s.product_id,s.spu,s.title,s.price,s.quantity,s.specifications,s.product_image,s.is_delete,s.create_time,s.update_time FROM `shopping_cart` AS s'
    const suffix = `Where user_id = '${params.id}' AND is_delete = '1' limit 999 offset 0`

    // 组装sql语句
    const sql = `${prefix} ${suffix}`

    const { result } = await ctx.service.shoppingCart.getAllShoppingCartList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
      };
      return;
    }

    ctx.body = {
      code: '1',
      msg: 'success',
      result,
    };
  }
  /**
    * @summary 加入购物车接口
    * @description 加入购物车功能按钮接口，若该商品未加入购物车，则生成新的购物车数据，若已加入购物车，则在该数据上的数量加1
    * @router post /wxApi/shoppingCart/insertAndSaveShoppingCart
    * @request body AddShoppingCartParams
    * @response 200 JsonBody 返回结果
  */
   async insertAndSaveShoppingCart() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'string?', user_id: 'string', product_id: 'string', spu: 'string', price: 'string', title: 'string', quantity: 'string', specifications: 'string', product_image: 'string' }, params);

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
    const prefix = 'SELECT s.id,s.user_id,s.product_id,s.spu,s.title,s.price,s.quantity,s.specifications,s.product_image,s.is_delete,s.create_time,s.update_time FROM `shopping_cart` AS s'
    const suffix = `Where user_id = '${params.user_id}' AND product_id = '${params.product_id}' AND is_delete = '1' limit 10 offset 0`

    const sql = `${prefix} ${suffix}`

    const res = await ctx.service.shoppingCart.getAllShoppingCartList(sql);

    let result = null;
    //  检测是否已经加入当前用户的购物车，有则直接加该产品的数量
    if (res.result.length > 0) {
      const { id, quantity } = res.result[0]
      result = await ctx.service.shoppingCart.updateShoppingCart({ id, quantity: quantity + 1 });
    } else {
      result = await ctx.service.shoppingCart.insertShoppingCart(params);
    }


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
    * @summary 生成订单
    * @description 生成订单
    * @router post /wxApi/order/insertOrder
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
    * @summary 获取当前用户的订单接口
    * @description 获取当前用户的订单接口
    * @router get /wxApi/order/getAllOrderList
    * @request query integer *id 用户id
    * @response 200 OrderJsonBody 返回结果
  */
   async getAllOrderList() {
    const { ctx } = this;
    const params = ctx.params;

    const prefix = 'SELECT o.id, o.order_number, o.user_id, o.cart_ids, o.total_amount, o.total_quantity, o.status, o.receiver, o.address, o.phone, o.is_delete, o.remark, o.create_time, o.update_time FROM `order` AS o';
    const suffix = `Where is_delete = '1' AND user_id = '${params.id}' limit 999 offset 0`;

    // 组装sql语句
    const sql = `${prefix} ${suffix}`;

    const { result } = await ctx.service.order.getAllOrderList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
      };
      return;
    }

    const promiseList = result.map(item => {
      // sql组装
      const cart_prefix = 'SELECT s.id,s.user_id,s.product_id,s.spu,s.title,s.price,s.quantity,s.specifications,s.product_image,s.is_delete,s.create_time,s.update_time FROM `shopping_cart` AS s'
      const cart_suffix = ` Where id in (${item.cart_ids}) limit 999 offset 0`

      const cart_sql = `${cart_prefix}${cart_suffix}`

      return ctx.service.shoppingCart.getAllShoppingCartList(cart_sql);
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
    };
  }
}

module.exports = HomeController;
