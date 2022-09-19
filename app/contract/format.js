
// 自动文档约定
module.exports = {
  JsonBody: { // 这个名字对应上面 Controller 注释的@response 的 JsonBody。
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'object', required: true, example: {} },
  },
  UserJsonBody: { // 这个名字对应上面 Controller 注释的@response 的 JsonBody。
    code: { type: 'string', required: true, example: '1' },
    msg: { type: 'string', required: true, example: 'success' },
    result: { type: 'Array', required: true, example: [
      {
        username: 'string',
        password: 'string',
        name: 'string',
        email: 'string',
        status: 'integer',
        sex: 'integer',
        id: 'integer',
      },
    ] },
  },

};
