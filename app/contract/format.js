
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
  UserQueryParams: {
    param: { type: 'string', required: true, example: {
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
      pn: 'integer',
      ps: 'integer',
    } },
  },
  EditProductParams: {
    param: { type: 'string', required: true, example: {
      id: 1,
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
    } },
  },
  AddProductParams: {
    param: { type: 'string', required: true, example: {
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
      spu: "产品标识",
      title: "吹风机2",
      price: '产品数量',
      quantity: '产品数量',
      specifications: "产品规格",
      product_image: "产品主图",
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
      is_delete: '是否删除',
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
};