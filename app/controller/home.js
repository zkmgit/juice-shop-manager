'use strict';

const Controller = require('egg').Controller;
const { formatDateTime, diffDateTime } = require('../extend/helper');
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
    const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.details_img,p.original_price,p.status,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time,p.seckill_start_time,p.seckill_end_time FROM `product` AS p';
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
    // sql组装
    const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.details_img,p.original_price,p.status,p.buy_quantity,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time FROM `product` AS p';
    const suffix = `limit 1 offset 0`;
    let buildSql = `Where is_delete = '1' AND status = '1' AND id = '${params.id}'`;

    const sql = `${prefix} ${buildSql} ${suffix}`;

    const { result } = await ctx.service.product.getAllProductList(sql);

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
      result: result[0],
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
    const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.original_price,p.details_img,p.status,p.buy_quantity,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time,p.seckill_start_time,p.seckill_end_time FROM `product` AS p';
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
    * @summary 获取限时秒杀数据
    * @description 获取限时秒杀数据
    * @router post /wxApi/product/getAllSeckillProductList
    * @request body ProductQueryParams
    * @response 200 ProductJsonBody 返回结果
  */
   async getAllSeckillProductList() {
    const { ctx } = this;
    
    // sql组装
    const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.original_price,p.details_img,p.status,p.buy_quantity,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time,p.seckill_start_time,p.seckill_end_time FROM `product` AS p';
    const suffix = `limit 999 offset 0`;
    const buildSql = `Where is_delete = '1' AND status = '1' AND categoryName = '限时秒杀'`;

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

    // 过滤掉过期的商品 未开始时间的商品  返回倒计时的毫秒数
    const dealResult = result.filter(item => {
      return item.seckill_start_time && item.seckill_end_time && diffDateTime(item.seckill_end_time) < 0 && diffDateTime(item.seckill_start_time) > 0;
    })

    dealResult.forEach(item => {
      item.time = diffDateTime(item.seckill_end_time) * -1000;
    })

    ctx.body = {
      code: '1',
      msg: 'success',
      result: dealResult,
    };
  }
  /**
    * @summary 获取爆品推荐数据
    * @description 获取爆品推荐数据
    * @router get /wxApi/product/getAllRecommendedProductList
    * @response 200 ProductJsonBody 返回结果
  */
   async getAllRecommendedProductList() {
    const { ctx } = this;
    
    // sql组装
    const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.original_price,p.details_img,p.status,p.buy_quantity,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time,p.seckill_start_time,p.seckill_end_time FROM `product` AS p';
    const suffix = `limit 999 offset 0`;
    const buildSql = `Where is_delete = '1' AND status = '1' AND categoryName = '爆品推荐'`;

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
    * @summary 根据属性ids获取属性详情
    * @description 根据属性ids获取属性详情
    * @router get /wxApi/attribute/getAttributesByIds/:ids
    * @response 200 AttributeJsonBody 返回结果
  */
   async getAttributesByIds() {
     const { ctx } = this;
     const params = ctx.params;
     
     const sql = `SELECT * FROM attribute WHERE id in (${params.ids})`;
    const { result } = await ctx.service.attribute.getAllAttributeList(sql);

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
          ...item,
          attributeValue: item.attribute_value.split(','),
        }
      }),
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

    // 字段校验
    const validate = this.app.validator.validate({ user_id: 'string', product_id: 'string', specifications: 'string', type: 'string', quantity: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

     // - 存在：添加或者删除购物车的数量 注：当删除到数量为1的时候，购物车这条数据直接删除
    // -不存在：直接新增一只购物车
    // - 类型 type （add  del）

    // 判断当前用户是否存在这个购物车
    const cartInfo = await ctx.service.shoppingCart.getShoppingCartInfoById({ user_id: params.user_id, product_id: params.product_id, specifications: params.specifications, is_delete: 1 });

    let result = null;

    if (!cartInfo) {
      // 购物车不存在
      const prefix = 'SELECT p.id,p.spu,p.title,p.image,p.price,p.details_img,p.status,p.category_id,p.categoryName,p.inventory,p.attributes,p.attributesName,p.remark,p.is_delete,p.create_time,p.update_time FROM `product` AS p';
      const suffix = `limit 1 offset 0`;
      let buildSql = `Where is_delete = '1' AND status = '1' AND id = '${params.product_id}'`;

      const sql = `${prefix} ${buildSql} ${suffix}`;

      const productInfoRes = await ctx.service.product.getAllProductList(sql);

      const { spu, price, title, image } = productInfoRes.result[0];

      const insertCartParams = {
        user_id: params.user_id,
        product_id: params.product_id,
        spu,
        price,
        title,
        quantity: params.quantity,
        specifications: params.specifications,
        product_image: image,
      }

      result = await ctx.service.shoppingCart.insertShoppingCart(insertCartParams);
    } else {
      // 购物车存在
      // 根据type增加或者减少购物车的商品数量
      const { id, quantity } = cartInfo

      if (params.type === 'add') {
          result = await ctx.service.shoppingCart.updateShoppingCart({ id, quantity: quantity + Number(params.quantity) });
      } else {
        if (+quantity === 1) {
          // 当购物车的商品数量只有1时，则直接删除购物车
          result = await ctx.service.shoppingCart.updateShoppingCart({ id, is_delete: 0 });
        } else {
          // 当购物车的商品数量大于1时，则直接购物车的商品数量 -1
          result = await ctx.service.shoppingCart.updateShoppingCart({ id, quantity: quantity - Number(params.quantity) });
        }
      }
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
    * @summary 校验购物车的限时秒杀商品是否过期，过期的系统自动删除购物车数据
    * @description 校验购物车的限时秒杀商品是否过期，过期的系统自动删除购物车数据
    * @router get /wxApi/shoppingCart/checkSeckillProduct/:id
    * @Request query integer *id 用户id
    * @response 200 JsonBody 返回结果
  */
   async checkSeckillProduct() {
    const { ctx } = this;
    const { id } = ctx.params;
    // 校验购物车的限时秒杀商品是否过期，过期则提示xx商品库存不足，请调整购物车
    const sql = `SELECT s.id,p.title, p.categoryName, p.seckill_start_time,p.seckill_end_time FROM shopping_cart AS s INNER JOIN product AS p ON s.product_id = p.id AND s.user_id = ${id} AND s.is_delete = 1`;
    
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

    const filterResult = result.filter(item => item.categoryName === '限时秒杀' && item.seckill_start_time && item.seckill_end_time);

    if (filterResult.length === 0) {
      ctx.body = {
        code: '1',
        msg: 'success',
        result: {
          value: true,
        },
      };
      return;
    }

    const msg = '检测到有商品限时秒杀时间过期，系统已自动帮您删除购物车！'

    const ids = filterResult.filter(item => diffDateTime(item.seckill_end_time) > 0).map(sItem => sItem.id)
    // 删除购物车
    ids.forEach(async id => {
      await ctx.service.shoppingCart.updateShoppingCart({ id, is_delete: 0 });
    })

    if (ids.length === 0) {
      ctx.body = {
        code: '1',
        msg: 'success',
        result: {
          value: true,
        },
      };
    } else {
      ctx.body = {
        code: '1',
        msg,
        result: {
          value: false,
        },
      };
    }
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
    const validate = this.app.validator.validate({ isPay: 'string', cartInfoList: 'string', receiver: 'string', address: 'string', phone: 'string' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const { cartInfoList, isPay, ...rest  } = params;

    const parseCartInfoList = JSON.parse(cartInfoList);
    
    // 订单编号 J-当前日期+5位数 系统生成
    const { total } = await ctx.service.order.getOrderTotal();
    
    const order_number = `J-${formatDateTime(new Date(), 'YYYYMMDD')}${10000 + total}`
    // 用户id
    const user_id = parseCartInfoList[0].user_id
    // 购车车ids
    const cart_ids = parseCartInfoList.map(item => item.id).join(',')

    // 需要判断同商品不同规格的情况下  商品数量是否满足
    const sql = `SELECT s.product_id,SUM(s.quantity) as quantity,p.inventory,p.title FROM shopping_cart s INNER JOIN product p ON s.id in (${cart_ids}) AND p.id = s.product_id GROUP BY product_id`;
    const result = await this.app.mysql.query(sql);
    
    const row = result.find(item => +item.quantity > +item.inventory);

    if (row) {
      ctx.body = {
        code: '-1',
        msg: `${row.title} 库存不足,该商品当前库存为${row.inventory},请您调整购物车数量 重新下单.`,
        result: {
          value: 0,
        },
      };
      return
    }
    // 总价格
    const total_amount = parseCartInfoList.reduce((pre, next) => {
      const { price, quantity } = next

      const amount = ((Number(price) * 100) * Number(quantity)) / 100
      return pre + Number(amount)
    }, 0)
    // 总商品数
    const total_quantity = parseCartInfoList.reduce((pre, next) => {
      return pre + Number(next.quantity)
    }, 0)

    const conn = await this.app.mysql.beginTransaction(); // 初始化事务

    try {
      // 记录订单的状态 1 待付款 2 待发货
      let status = 1
      // 订单生成的消息
      let msg = ''

      // 是否付款
      if (isPay === '1') {
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

      // 订单成功生成后，需要编辑购物车状态 商品库存减少
      for (let i = 0; i < parseCartInfoList.length; i++) {
        const { id, quantity, product_id } = parseCartInfoList[i]

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
      item.cartInfo = cartInfos[index].result;
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
    * @summary 根据订单id获取订单信息
    * @description 根据订单id获取订单信息
    * @router get /wxApi/order/getOrderInfoById/:id
    * @response 200 OrderJsonBody 返回结果
  */
   async getOrderInfoById() {
    const { ctx } = this;
    const params = ctx.params;

    const result = await ctx.service.order.getOrderInfoById({ id: params.id });

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: {},
      };
      return;
    }

    // sql组装
    const cart_prefix = 'SELECT s.id,s.user_id,s.product_id,s.spu,s.title,s.price,s.quantity,s.specifications,s.product_image,s.is_delete,s.create_time,s.update_time FROM `shopping_cart` AS s';
    const cart_suffix = ` Where id in (${result.cart_ids}) limit 999 offset 0`;

    const cart_sql = `${cart_prefix}${cart_suffix}`;

    const cartInfos = await ctx.service.shoppingCart.getAllShoppingCartList(cart_sql);

    result.cartInfo = cartInfos.result;
    result.createTime = formatDateTime(result.create_time);
    result.updateTime = formatDateTime(result.update_time);

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
  /**
    * @summary 获取默认地址
    * @description 获取默认地址
    * @router get /wxApi/addr/getDefaultAddr
    * @response 200 AttributeJsonBody 返回结果
  */
   async getDefaultAddr() {
    const { ctx } = this;
     // sql组装
     const prefix = 'SELECT a.id,a.name,a.user_id,a.area,a.address,a.phone,a.status,a.is_delete,a.create_time,a.update_time FROM addr AS a';
     const suffix = `limit 1 offset 0`;
     let buildSql = `Where status = '1' AND is_delete = '1'`;
 
     // 组装sql语句
     const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result } = await ctx.service.addr.getAllAddrList(sql);

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
      result: result[0],
    };
  }
  /**
    * @summary 地址列表
    * @description 地址列表
    * @router post /wxApi/addr/getAllAddrList
    * @request body AttributeQueryParams
    * @response 200 AttributeJsonBody 返回结果
  */
   async getAllAddrList() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ pn: 'string', ps: 'string', user_id: 'string' }, params);

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
     let buildSql = `Where status = '1' AND is_delete = '1' AND user_id = '${params.user_id}'`;
 
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
    * @router post /wxApi/addr/insertAddr
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
    * @router put /wxApi/addr/updateAddr
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
    * @summary 软删除地址
    * @description 软删除地址
    * @router put /wxApi/addr/deleteAddr
    * @Request query integer *id 地址id
    * @response 200 JsonBody 返回结果
  */
  async deleteAddr() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'number', is_delete: 'string' }, params);

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
}

module.exports = HomeController;
