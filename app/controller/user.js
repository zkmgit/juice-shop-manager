'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 用户模块
*/
class UserController extends Controller {
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
    * @summary 用户列表分页查询
    * @description 用户列表分页查询
    * @router post /api/user/getAllUserList
    * @request body UserQueryParams
    * @response 200 UserJsonBody 返回结果
  */
  async getAllUserList() {
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
    const prefix = 'SELECT u.id,u.name,u.username,u.password,u.sex,u.status,u.email,u.is_delete,u.create_time,u.update_time FROM user AS u';
    const suffix = `ORDER BY id DESC limit ${params.ps} offset ${(params.pn - 1) * params.ps}`;
    let buildSql = ''
    
    Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
      if (['id', 'is_delete', 'status', 'username'].includes(key)) {
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} = '${params[key]}'` : `Where ${key} = '${params[key]}'`
      } else  if (['name'].includes(key)) {
        // 模糊查询的字段
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} LIKE '%${params[key]}%'` : `Where ${key} LIKE '%${params[key]}%'`
      }
    })

    // 组装sql语句
    const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result, total } = await ctx.service.user.getAllUserList(sql, buildSql);

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
          sexName: item.sex === 1 ? '男' : item.sex === 0 ? '女' : '',
          statusName: item.status === 1 ? '启用' : item.status === 0 ? '禁用' : '',
          createTime: formatDateTime(item.create_time),
          updateTime: formatDateTime(item.update_time)
        };
      }),
      total,
    };
  }
  /**
    * @summary 用户新增
    * @description 用户新增
    * @router post /api/user/insertUser
    * @request body AddUserParams
    * @response 200 JsonBody 返回结果
  */
  async insertUser() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ name: 'string', username: 'string', password: 'string', email: 'string?' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

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
    * @router put /api/user/updateUser
    * @request body EditUserParams
    * @response 200 JsonBody 返回结果
  */
  async updateUser() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ id: 'number', name: 'string?', username: 'string?', password: 'string?', email: 'string?' }, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;
      
      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

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
    * @router delete /api/user/deleteUser/:id
    * @Request query integer *id 用户id
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
