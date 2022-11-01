
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
};
