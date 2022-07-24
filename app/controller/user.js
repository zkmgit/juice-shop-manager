'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const params = ctx.request.body;
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
    // ctx.body = user;
  }
  async getAllUserList() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 组装查询条件
    const where = Object.keys(params).filter(key => ![ 'ps', 'pn' ].includes(key)).reduce((pre, next) => {
      return { ...pre, [next]: params[next] };
    }, {});

    const options = {
      where, // WHERE 条件
      limit: params.ps, // 返回数据量
      offset: (params.pn - 1) * params.ps, // 数据偏移量
    };

    // { // 搜索 post 表
    //   where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
    //   limit: 10, // 返回数据量
    //   offset: 0, // 数据偏移量
    // }
    const { result, total } = await ctx.service.user.getAllUserList(options);
    // ctx.body = user;
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
          statusName: item.status === 1 ? '启用' : item.status === 2 ? '禁用' : '',
          sexName: item.sex === 1 ? '男' : item.sex === 2 ? '女' : '',
        };
      }),
      total,
    };
  }
  async insertUser() {
    const { ctx } = this;
    const params = ctx.request.body;

    const user = await ctx.service.user.insertUser(params);
    ctx.body = user;
  }
  async updateUser() {
    const { ctx } = this;
    const params = ctx.request.body;

    const user = await ctx.service.user.updateUser(params);
    ctx.body = user;
  }
  async deleteUser() {
    const { ctx } = this;
    const params = ctx.request.body;

    const user = await ctx.service.user.deleteUser(params);
    ctx.body = user;
  }
}

module.exports = UserController;
