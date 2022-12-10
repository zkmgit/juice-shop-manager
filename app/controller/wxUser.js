'use strict';

const Controller = require('egg').Controller;
const { formatDateTime } = require('../extend/helper');
/**
* @controller 小程序用户模块
*/
class WxUserController extends Controller {
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

    const result = await ctx.service.wxUser.getWxUserInfoById({ open_id: params.openid, session_key: params.session_key });

    // 登录成功生成token
    const token = this.app.jwt.sign(params, this.app.config.jwt.secret, { expiresIn: '2h' });
    
    if (!result) {
      // 若未注册，则 插入一条数据并将用户信息和token一起
      const res = await ctx.service.wxUser.insertWxUser(params);

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

      const newUser = await ctx.service.wxUser.getWxUserInfoById({ open_id: params.openid, session_key: params.session_key });
  
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
    * @summary 小程序用户列表分页查询
    * @description 小程序用户列表分页查询
    * @router post /api/wxUser/getAllWxUserList
    * @request body WxUserQueryParams
    * @response 200 WxUserJsonBody 返回结果
  */
  async getAllWxUserList() {
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
    const prefix = 'SELECT u.id,u.open_id,u.session_key,u.nick_name,u.addr,u.status,u.avatar_url,u.balance,u.is_delete,u.create_time,u.update_time FROM wx_user AS u';
    const suffix = `ORDER BY id DESC limit ${params.ps} offset ${(params.pn - 1) * params.ps}`;
    let buildSql = ''
    
    Object.keys(params).filter(key => !['ps', 'pn'].includes(key)).forEach(key => {
      if (['id', 'is_delete', 'status'].includes(key)) {
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} = '${params[key]}'` : `Where ${key} = '${params[key]}'`
      } else  if (['nick_name'].includes(key)) {
        // 模糊查询的字段
        buildSql = buildSql !== '' ? `${buildSql} AND ${key} LIKE '%${params[key]}%'` : `Where ${key} LIKE '%${params[key]}%'`
      }
    })

    // 组装sql语句
    const sql = buildSql === '' ? `${prefix} ${suffix}` : `${prefix} ${buildSql} ${suffix}`

    const { result, total } = await ctx.service.wxUser.getAllWxUserList(sql);

    if (!result) {
      ctx.body = {
        code: '-1',
        msg: 'error',
        result: [],
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
          isDelete: item.is_delete === 1 ? '未删除' : item.is_delete === 0 ? '已删除' : '',
          statusName: item.status === 1 ? '启用' : item.status === 0 ? '禁用' : '',
          createTime: formatDateTime(item.create_time),
          updateTime: formatDateTime(item.update_time)
        };
      }),
      total,
    };
  }
}

module.exports = WxUserController;
