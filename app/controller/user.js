'use strict';

const Controller = require('egg').Controller;
/**
* @controller 用户模块
*/
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
  /**
    * @summary 用户列表分页查询
    * @description 用户列表分页查询
    * @router post /api/getAllUserList
    * @request query integer pn 当前页数
    * @request query string ps 每页x条
    * @response 200 UserJsonBody 返回结果
  */
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
  /**
    * @summary 用户新增
    * @description 用户新增
    * @router post /api/insertUser
    * @request query string username 用户名
    * @request query string password 密码
    * @request query string name 姓名
    * @request query string email 邮箱
    * @request query integer sex 性别
    * @request query integer status 状态
    * @response 200 JsonBody 返回结果
  */
  async insertUser() {
    const { ctx } = this;
    const params = ctx.request.body;

    const result = await ctx.service.user.insertUser(params);

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
    * @summary 用户编辑
    * @description 用户编辑
    * @router put /api/updateUser
    * @request query integer id id
    * @request query string username 用户名
    * @request query string password 密码
    * @request query string name 姓名
    * @request query string email 邮箱
    * @request query integer sex 性别
    * @request query integer status 状态
    * @response 200 JsonBody 返回结果
  */
  async updateUser() {
    const { ctx } = this;
    const params = ctx.request.body;

    const result = await ctx.service.user.updateUser(params);

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
    * @summary 根据id删除用户
    * @description 根据id删除用户
    * @router delete /api/deleteUser/:id
    * @Request query string *id 用户id
    * @response 200 JsonBody 返回结果
  */
  async deleteUser() {
    const { ctx } = this;
    const params = ctx.params;

    const result = await ctx.service.user.deleteUser(params);

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

module.exports = UserController;
