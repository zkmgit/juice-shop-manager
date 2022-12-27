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

    ctx.body = 'hi egg';
  }
  /**
    * @summary 小程序登录接口
    * @description 小程序登录接口
    * @router post /wxApi/user/login
    * @request body WxLoginParams
    * @response 200 UserJsonBody 返回结果
  */
  async login() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ openid: 'string', session_key: 'string', nickName: 'string', addr: 'string', avatarUrl: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;

      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.wxUser.getWxUserInfoById({ open_id: params.openid });

    // 登录成功生成token
    const token = this.app.jwt.sign(params, this.app.config.jwt.secret, { expiresIn: '2h' });
    
    if (!result) {
      // 若未注册，则 插入一条数据并将用户信息和token一起
      const res = await ctx.service.wxUser.insertWxUser({
        open_id: params.openid,
        session_key: params.session_key,
        nick_name: params.nickName,
        addr: params.addr,
        avatar_url: params.avatarUrl,
      });

      if (!res) {
        ctx.body = {
          code: '-1',
          msg: '授权失败.',
          result: {
            value: 0,
          },
        };
        return;
      }

      const newUser = await ctx.service.wxUser.getWxUserInfoById({ open_id: params.openid });
  
      ctx.body = {
        code: '1',
        msg: 'success',
        result: newUser,
        token,
      };
    } else {
      // 若已注册了，则生成token，将已注册的用户信息返回
      ctx.body = {
        code: '1',
        msg: 'success',
        result,
        token,
      };
    }
  }
  /**
    * @summary token是否已经过期接口
    * @description token是否已经过期接口
    * @router post /wxApi/user/getToken
    * @request body getTokenParams
    * @response 200 JsonBody 返回结果
  */
  async getToken() {
    const { ctx } = this;
    const params = ctx.request.body;

    try {
      const decoded = ctx.app.jwt.verify(params.token, ctx.app.config.jwt.secret);// 解密token

      if (decoded) {
        ctx.body = {
          code: '1',
          msg: 'token existence',
          result: {
            value: true,
          },
        };
      } else {
        // token 过期
        ctx.body = {
          code: '-1',
          msg: 'token expired',
          result: {
            value: false,
          },
        };
      }
    } catch (e) {
      // token 过期
      ctx.body = {
        code: '-1',
        msg: 'token expired',
        result: {
          value: false,
        },
      };
    }
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
    const prefix = 'SELECT c.id,c.title,c.image,c.status,c.order_num,c.is_delete,c.create_time,c.update_time FROM carousel_image AS c';
    const suffix = ` Where status = '1' ORDER BY order_num ASC limit 3 offset 0`;
    const sql = prefix + suffix;

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
          id: item.id,
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
    * @summary 根据分类id获取商品
    * @description 根据分类id获取商品
    * @router get /wxApi/product/getAllProductListByCategoryId/:id
    * @response 200 ProductJsonBody 返回结果
  */
   async getAllProductListByCategoryId() {
    const { ctx } = this;
    const params = ctx.params;
    
    // sql组装
    const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.details_img,p.status,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time FROM `product` AS p';
    const suffix = `limit 999 offset 0`;
    let buildSql = `Where is_delete = '1' AND status = '1' AND category_id = '${params.id}'`;

    // 组装sql语句
    const sql = `${prefix} ${buildSql} ${suffix}`;

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
    * @summary 根据商品id获取商品详情
    * @description 根据商品id获取商品详情
    * @router get /wxApi/product/getProductInfoById/:id
    * @response 200 ProductJsonBody 返回结果
  */
   async getProductInfoById() {
    const { ctx } = this;
    const params = ctx.params;

    const { result } = await ctx.service.product.getProductInfoById({ id: params.id });

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: {},
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
    * @description 产品列表分页查询  首页商品展示入参 pn ps
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
    const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.details_img,p.status,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time FROM `product` AS p';
    const suffix = `limit ${params.ps} offset ${(params.pn - 1) * params.ps}`;
    let buildSql = `Where is_delete = '1' AND status = '1'`;
    
    Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
      if (['id', 'spu', 'category_id'].includes(key)) {
        buildSql = `${buildSql} AND ${key} = '${params[key]}'`
      } else  if (['title'].includes(key)) {
        // 模糊查询的字段
        buildSql = `${buildSql} AND ${key} LIKE '%${params[key]}%'`
      }
    })

    // 组装sql语句
    const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`;

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
    * @router get /wxApi/shoppingCart/getAllShoppingCartList/:id
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
    * @summary 编辑购物车数量接口
    * @description 编辑购物车数量接口 根据type区分商品数量+1还是-1
    * @router post /wxApi/shoppingCart/insertAndSaveShoppingCart
    * @request body AddShoppingCartParams
    * @response 200 JsonBody 返回结果
  */
   async insertAndSaveShoppingCart() {
    const { ctx } = this;
    const params = ctx.request.body;
    /**
     * type [add, del]  根据类型去编辑购物车数量
     * 根据是否有id，判断是否是新数据
     * 1.有id
     * - type == add ，往购物车追加数量+1
     * - type == del
     *   - 将购物车的商品数量-1
     *   - 当购物车的商品数量只有1的时候，直接删除购物车
     * 2.无id
     * - 只有新增的情况，新增一条购物车数据，数量直接为1
    */

    // 字段校验
    const validate = this.app.validator.validate({ user_id: 'string', product_id: 'string', specifications: 'string', type: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    // 判断当前用户是否存在这个购物车
    const cartInfo = await ctx.service.shoppingCart.getShoppingCartInfoById({ user_id: params.user_id, product_id: params.product_id, is_delete: 1 });

    let result = null;

    if (cartInfo) {
      // 根据type增加或者减少购物车的商品数量
      const { id, quantity } = cartInfo

      if (params.type === 'add') {
        // 当购物车的商品数量直接 +1
          result = await ctx.service.shoppingCart.updateShoppingCart({ id, quantity: quantity + 1 });
      } else {
        if (+quantity === 1) {
          // 当购物车的商品数量只有1时，则直接删除购物车
          result = await ctx.service.shoppingCart.updateShoppingCart({ id, is_delete: 0 });
        } else {
          // 当购物车的商品数量大于1时，则直接购物车的商品数量 -1
          result = await ctx.service.shoppingCart.updateShoppingCart({ id, quantity: quantity - 1 });
        }
      }
    } else {
      // 根据产品id获取产品信息
      const productInfo = await ctx.service.product.getProductInfoById({ id: params.product_id });

      const { spu, price, title, image } = productInfo;
      const insertCartParams = {
        user_id: params.user_id,
        product_id: params.product_id,
        spu,
        price,
        title,
        quantity: 1,
        specifications: params.specifications,
        product_image: image,
      }

      result = await ctx.service.shoppingCart.insertShoppingCart(insertCartParams);
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
    * @summary 批量删除购物车接口
    * @description 批量删除购物车接口 多个id用,隔开  1,2,3
    * @router delete /wxApi/shoppingCart/batchDelShoppingCart/:ids
    * @Request query integer *ids 购物车ids
    * @response 200 JsonBody 返回结果
  */
  async batchDelShoppingCart() {
    const { ctx } = this;
    const params = ctx.params;

    const ids = params.ids.split(',')

    ids.forEach(async id => {
      await ctx.service.shoppingCart.updateShoppingCart({ id, is_delete: 0 });
    })


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
        value: ids.length,
      },
    };
  }
  /**
    * @summary 生成订单前，校验商品库存是否充足
    * @description 生成订单前，校验商品库存是否充足
    * @router get /wxApi/order/checkInventory/:id
    * @Request query integer *id 用户id
    * @response 200 JsonBody 返回结果
  */
   async checkInventory() {
    const { ctx } = this;
    const { id } = ctx.params;
    // 校验一遍商品的库存是否充足，不足则提示xx商品库存不足，请调整购物车 
    const sql = `SELECT p.title, s.quantity, p.inventory FROM shopping_cart AS s INNER JOIN product AS p ON s.product_id = p.id AND s.user_id = ${id} AND s.is_delete = 1`;
    
    const { result } = await ctx.service.shoppingCart.getAllShoppingCartList(sql);

    if (result.length === 0) {
      ctx.body = {
        code: '1',
        msg: 'success',
        result: {
          value: true,
        },
      };
      return;
    }

    const msg = []
    result.forEach(item => {
      if (item.quantity > item.inventory) {
        msg.push(`[${item.title}] 库存不足，剩余${item.inventory}件，购物车的商品数量为${item.quantity}件，请调整您的购物车！`);
      }
    })

    ctx.body = {
      code: '-1',
      msg: msg.join(','),
      result: {
        value: false,
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
    const validate = this.app.validator.validate({ isPay: 'boolean', cartInfoList: 'array', receiver: 'string', address: 'string', phone: 'string', remark: 'string' }, params);

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

    const conn = await this.app.mysql.beginTransaction(); // 初始化事务

    try {
      // 记录订单的状态 1 待付款 2 待发货
      let status = 1
      // 订单生成的消息
      let msg = ''

      // 是否付款
      if (isPay) {
        // 判断用户余额是否大于等于总价格
        const currentUserRes = await ctx.service.wxUser.getWxUserInfoById({ id: user_id });

        if (Number(currentUserRes.balance) >= Number(total_amount)) {
          status = 2
          msg = '订单已生成，付款成功.'
          // 付款成功，修改用户余额
          const balance = Number(currentUserRes.balance) - Number(total_amount)
          await conn.update('wx_user', { id: user_id, balance });
        } else {
          status = 1
          msg = '订单已生成，付款失败 用户余额不足，待付款.'
        }
      } else {
        status = 1
        msg = '订单已生成，待付款.'
      }

      // 生成订单组装参数
      const insertParams = {
        ...rest,
        order_number,
        user_id,
        cart_ids,
        total_amount,
        total_quantity,
        status,
      }

      await conn.insert('order', insertParams);

      // 订单成功生成后，需要编辑购物车状态
      for (let i = 0; i < cartInfoList.length; i++) {
        const { id, quantity, product_id } = cartInfoList[i]

        await conn.update('shopping_cart', { id, is_delete: 0 });
        await conn.query(`UPDATE product SET inventory = (inventory - ${quantity}) where id = ${product_id}`);
      }

      ctx.body = {
        code: '1',
        msg,
        result: {
          value: 1,
        },
      };

      await conn.commit(); // 提交事务
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }
  /**
    * @summary 获取当前用户的订单接口
    * @description 获取当前用户的订单接口
    * @router get /wxApi/order/getAllOrderList/:id
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
      const cart_prefix = 'SELECT s.id,s.user_id,s.product_id,s.spu,s.title,s.price,s.quantity,s.specifications,s.product_image,s.is_delete,s.create_time,s.update_time FROM `shopping_cart` AS s';
      const cart_suffix = ` Where id in (${item.cart_ids}) limit 999 offset 0`;

      const cart_sql = `${cart_prefix}${cart_suffix}`;

      return ctx.service.shoppingCart.getAllShoppingCartList(cart_sql);
    })

    const cartInfos = await Promise.all(promiseList);
    // 获取购物车信息
    result.forEach((item, index) => {
      item.cartInfo = cartInfos[index];
      item.createTime = formatDateTime(item.create_time);
      item.updateTime = formatDateTime(item.update_time);
    })

    ctx.body = {
      code: '1',
      msg: 'success',
      result,
    };
  }
  /**
    * @summary 付款接口
    * @description 付款 针对未付款的订单提供的接口
    * @router post /wxApi/order/payment
    * @Request body PaymentParams
    * @response 200 JsonBody 返回结果
  */
   async payment() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ user_id: 'string', order_id: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    // 付款的消息
    let msg = ''
    
    const currentUserRes = await ctx.service.wxUser.getWxUserInfoById({ id: params.user_id });
    const orderRes = await ctx.service.order.getOrderInfoById({ id: params.order_id });

    if (orderRes.status === 1) {
      // 未付款
      if (Number(currentUserRes.balance) >= Number(orderRes.total_amount)) {
        // 付款成功，修改用户余额 修改订单状态
        const balance = Number(currentUserRes.balance) - Number(orderRes.total_amount);
        await ctx.service.wxUser.updateWxUser({ id: params.user_id, balance });
        await ctx.service.order.updateOrder({ id: params.order_id, status: 2 });
        msg = '付款成功.';
      } else {
        msg = '付款失败 用户余额不足.';
      }
    } else {
      // 已付款
      msg = '亲，该订单已付过款了.';
    }

    ctx.body = {
      code: '1',
      msg,
      result: {
        value: 1,
      },
    };
  }
}

module.exports = HomeController;
