
// 自动文档约定
module.exports = {
  JsonBody: { // 这个名字对应上面 Controller 注释的@response 的 JsonBody。
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: {} },
  },
  UserJsonBody: { // 这个名字对应上面 Controller 注释的@response 的 JsonBody。
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
        id: 'integer',
        name: 'string',
        username: 'string',
        password: 'string',
        sex: 'integer',
        email: 'string',
        status: 'integer',
        is_delete: 'integer',
        create_time: 'string',
        update_time: 'string',
      },
    ] },
  },
  LoginParams: {
    param: { type: 'string', required: true, example: {
      password: '密码',
      username: '用户名',
    } },
  },
  UserQueryParams: {
    param: { type: 'string', required: true, example: {
      id: 'id',
      is_delete: '是否删除 未删除1 删除0',
      status: '状态',
      name: '姓名',
      username: '用户名',
      pn: 'integer',
      ps: 'integer',
    } },
  },
  EditUserParams: {
    param: { type: 'string', required: true, example: {
      id: 'id',
      name: 'string 用户名称',
      username: 'string 用户名',
      password: 'string 密码',
      sex: 'integer 性别 1男 0女',
      email: 'string 邮箱',
      status: 'integer 1启用 0禁用',
    } },
  },
  UpdateBalanceParams: {
    param: { type: 'string', required: true, example: {
        id: 'id',
        balance: 20,
      } },
  },
  UpdateFreezeParams: {
    param: { type: 'string', required: true, example: {
        id: 'id',
        status: 0,
      } },
  },
  AddUserParams: {
    param: { type: 'string', required: true, example: {
      name: 'string 用户名称',
      username: 'string 用户名',
      password: 'string 密码',
      sex: 'integer 性别 1男 0女',
      email: 'string 邮箱',
      status: 'integer 1启用 0禁用',
    } },
  },
  // 分类
  CategoryJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
        id: 4,
        category_name: '裤装',
        status: 1,
        remark: null,
        is_delete: 1,
        create_time: '2022-11-01T08:42:52.000Z',
        update_time: '2022-11-01T08:42:52.000Z',
      },
    ] },
  },
  CategoryQueryParams: {
    param: { type: 'string', required: true, example: {
      id: 'id',
      is_delete: '是否删除 未删除1 删除0',
      status: '状态',
      category_name: '分类名称',
      pn: 'integer',
      ps: 'integer',
    } },
  },
  EditCategoryParams: {
    param: { type: 'string', required: true, example: {
      id: 'id',
      category_name: 'string 分类名称',
      status: 'integer 1启用 0禁用',
      remark: 'string 备注',
      is_delete: 'integer 1未删除 0 删除',
    } },
  },
  AddCategoryParams: {
    param: { type: 'string', required: true, example: {
      category_name: 'string 分类名称',
      status: 'integer 1启用 0禁用',
      remark: 'string 备注',
    } },
  },
  // 属性
  AttributeJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
        id: 1,
        attribute_name: '颜色',
        attribute_value: '红色,蓝色,绿色,黄色',
        status: 1,
        is_delete: 1,
        create_time: '2022-11-02T04:28:15.000Z',
        update_time: '2022-11-02T04:29:06.000Z',
      },
    ] },
  },
  AttributeQueryParams: {
    param: { type: 'string', required: true, example: {
      id: 'id',
      is_delete: '是否删除 未删除1 删除0',
      status: '状态',
      attribute_name: '属性名称',
      pn: 'integer',
      ps: 'integer',
    } },
  },
  EditAttributeParams: {
    param: { type: 'string', required: true, example: {
      id: 1,
      attribute_name: '属性名称',
      attribute_value: '属性值',
      status: 'integer 1启用 0禁用',
    } },
  },
  AddAttributeParams: {
    param: { type: 'string', required: true, example: {
      attribute_name: '属性名称',
      attribute_value: '属性值',
      status: 'integer 1启用 0禁用',
    } },
  },
  // 轮播图
  CarouselImageJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
        id: 1,
        title: '标题',
        image: '图片url',
        status: 1,
        order_num: 1,
        is_delete: 1,
        create_time: '2022-11-02T04:28:15.000Z',
        update_time: '2022-11-02T04:29:06.000Z',
      },
    ] },
  },
  CarouselImageQueryParams: {
    param: { type: 'string', required: true, example: {
      id: '轮播图id',
      is_delete: '是否删除 未删除1 删除0',
      status: '轮播图状态',
      order_num: '排序',
      title: '轮播图名称',
      pn: 'integer',
      ps: 'integer',
    } },
  },
  EditCarouselImageParams: {
    param: { type: 'string', required: true, example: {
      id: 1,
      title: '标题',
      image: '图片url',
      status: 'integer 1启用 0禁用',
    } },
  },
  BatchSortCarouselImageParams: {
    param: { type: 'string', required: true, example: [{
      id: 1,
      order_num: 1,
    }] },
  },
  AddCarouselImageParams: {
    param: { type: 'string', required: true, example: {
      title: '标题',
      image: '图片url',
      status: 'integer 1启用 0禁用',
    } },
  },
  SystemSelectJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
       label: '',
       value: '',
      },
    ] },
  },
  // 产品
  ProductJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
        id: 'id',
        spu: 'SPU(当前日期 20221031+【产品数量+1】) 11位数',
        title: '商品名称',
        image:'主图',
        price: '价格',
        details_img: '商品详情图片',
        status:'商品状态 1启用 0 禁用',
        category_id: '类目id',
        categoryName: '类目名称',
        inventory: '库存',
        attributes: '属性（尺码，规格，颜色）',
        attributesName: '属性值',
        remark: '商品描述',
        is_delete: '软删除 1未删除 0删除',
        create_time: '创建时间',
        update_time: '修改时间',
      },
    ] },
  },
  ProductQueryParams: {
    param: { type: 'string', required: true, example: {
      id: '产品id',
      spu: '产品spu',
      is_delete: '是否删除 未删除1 删除0',
      status: '产品状态',
      category_id: '类目id',
      title: '产品名称',
      pn: 'integer',
      ps: 'integer',
    } },
  },
  EditProductParams: {
    param: { type: 'string', required: true, example: {
      id: 1,
      title: '商品名称',
      image:'主图',
      price: '价格（现价）',
      original_price: '原价',
      details_img: '商品详情图片',
      status:'商品状态 1启用 0 禁用',
      category_id: '类目id',
      categoryName: '类目名称',
      inventory: '库存',
      attributes: '属性（尺码，规格，颜色）',
      attributesName: '属性值',
      remark: '商品描述',
    } },
  },
  EditSkillProductParams: {
    param: { type: 'string', required: true, example: {
        id: 1,
        seckill_start_time:'yyyy-MM-dd HH:MM:SS',
        seckill_end_time:'yyyy-MM-dd HH:MM:SS'
      } },
  },
  AddProductParams: {
    param: { type: 'string', required: true, example: {
      title: '商品名称',
      image:'主图',
      price: '价格（现价）',
      original_price: '原价',
      details_img: '商品详情图片',
      status:'商品状态 1启用 0 禁用',
      category_id: '类目id',
      categoryName: '类目名称',
      inventory: '库存',
      attributes: '属性（尺码，规格，颜色）',
      attributesName: '属性值',
      remark: '商品描述',
    } },
  },
  // 购物车
  ShoppingCartJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
        id: 1,
        user_id: '用户id',
        product_id: '产品id',
        spu: "产品标识",
        title: "吹风机2",
        price: '产品数量',
        quantity: '产品数量',
        specifications: "产品规格",
        product_image: "产品主图",
        is_delete: "软删除",
        create_time: "创建时间",
        update_time: "修改时间",
      },
    ] },
  },
  ShoppingCartQueryParams: {
    param: { type: 'string', required: true, example: {
      id: '购物车id',
      user_id: '用户id',
      spu: '产品spu',
      is_delete: '是否删除 未删除1 删除0',
      specifications: '产品规则',
      title: '产品名称',
      pn: 'integer',
      ps: 'integer',
    } },
  },
  EditShoppingCartParams: {
    param: { type: 'string', required: true, example: {
      id: 1,
      user_id: '用户id',
      product_id: '产品id',
      spu: "产品标识",
      title: "吹风机2",
      price: '产品数量',
      quantity: '产品数量',
      specifications: "产品规格",
      product_image: "产品主图",
    } },
  },
  AddShoppingCartParams: {
    param: { type: 'string', required: true, example: {
      user_id: '用户id',
      product_id: '产品id',
      specifications: "产品规格",
      type: "根据类型区分购物车的商品数量是否增加或者减少",
      quantity: '数量'
    } },
  },
  // 订单
  OrderJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
        id: '订单id',
        order_number: '订单编号（J-当前日期8位数+10000递增）',
        user_id: '用户id',
        cart_ids: '购物车ids',
        cartInfoList: '购物车信息',
        total_amount: '订单总金额',
        total_quantity: '订单产品总数量',
        status: '订单状态',
        receiver: '收货人',
        address: '详细收货地址',
        phone: '收货人电话',
        remark: '订单备注',
        is_delete: "软删除",
        create_time: "创建时间",
        update_time: "修改时间",
      },
    ] },
  },
  OrderQueryParams: {
    param: { type: 'string', required: true, example: {
      id: '订单id',
      order_number: '订单编号',
      user_id: '用户id',
      status: '订单状态',
      is_delete: '是否删除 未删除1 删除0',
      pn: 'integer',
      ps: 'integer',
    } },
  },
  EditOrderParams: {
    param: { type: 'string', required: true, example: {
      id: 1,
      status: '订单状态',
    } },
  },
  AddOrderParams: {
    param: { type: 'string', required: true, example: {
      cartInfoList: '购物车信息',
      receiver: '收货人',
      address: '收货地址',
      phone: '电话',
      remark: '订单备注'
    } },
  },
  // 付款
  PaymentParams: {
    param: { type: 'string', required: true, example: {
      order_id: '订单id',
      user_id: '用户id',
    } },
  },
  // 物流
  LogisticsJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
        id: '物流id',
        tracking_number: "快递单号",
        tracking_name: "快递名称",
        order_id: '订单id',
        order_number: '订单编号（J-当前日期8位数+10000递增）',
        user_id: '用户id',
        receiver: '收货人',
        address: '详细收货地址',
        phone: '收货人电话',
        remark: '物流备注',
        is_delete: "软删除",
        create_time: "创建时间",
        update_time: "修改时间",
      },
    ] },
  },
  LogisticsQueryParams: {
    param: { type: 'string', required: true, example: {
      id: '物流id',
      tracking_number: '物流编号',
      is_delete: '是否删除 未删除1 删除0',
      pn: 'integer',
      ps: 'integer',
    } },
  },
  AddLogisticsParams: {
    param: { type: 'string', required: true, example: {
      tracking_number: '快递单号',
      tracking_name: '快递名称',
      order_id: '订单id',
      remark: '订单备注'
    } },
  },
  // 小程序用户
  WxUserJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
      {
        id: 'integer',
        open_id: '用户唯一标识',
        session_key: '会话密钥',
        nick_name: '昵称',
        addr: '微信默认地址',
        avatar_url: '微信头像',
        balance: '余额',
        status: '微信用户状态',
        is_delete: '是否删除',
        create_time: '创建时间',
        update_time: '修改时间',
      },
    ] },
  },
  WxUserQueryParams: {
    param: { type: 'string', required: true, example: {
      id: 'id',
      is_delete: '是否删除 未删除1 删除0',
      status: '状态',
      nick_name: '昵称',
      pn: 'integer',
      ps: 'integer',
    } },
  },
  WxLoginParams: {
    param: { type: 'string', required: true, example: {
      openid: 'openid',
      session_key: 'session_key',
      nickName: '昵称',
      addr: '详细地址',
      avatarUrl: '头像url',
    } },
  },
  getTokenParams: {
    param: { type: 'string', required: true, example: {
      token: 'token',
    } },
  },
  //公告
  AnnouncementJsonBody: {
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'string', required: true, example: [
        {
          id: 1,
          title: '标题',
          content: '内容',
          create_time: '2022-11-02T04:28:15.000Z',
          update_time: '2022-11-02T04:29:06.000Z',
          is_delete: '是否删除 未删除1 删除0',
        },
      ] },
  },
};
