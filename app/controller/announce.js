'use strict';

const {formatDateTime} = require("../extend/helper");
const Controller =  require('egg').Controller;
/**
 * @controller 公告模块
 */
class AnnounceController extends Controller {
    /**
     * @summary 公告列表分页查询
     * @description 公告列表分页查询
     * @router get /api/announcement/getAnnouncementList
     * @response 200 AnnouncementJsonBody 返回结果
     */
    async getAnnouncementList() {
        const { ctx } = this;

        // sql组装
        const prefix = 'SELECT t.id,t.title,t.content,t.is_delete,t.create_time,t.update_time FROM announcement AS t';
        const suffix = ``;

        // 组装sql语句
        const sql = `${prefix} ${suffix}`;

        const { result, total } = await ctx.service.announce.getAnnounceList(sql);
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
                    createTime: formatDateTime(item.create_time),
                    updateTime: formatDateTime(item.update_time)
                };
            }),
            total,
        };
    }
     /**
    * @summary 公告新增
    * @description 公告新增
    * @router post /api/announcement/insertAnnouncement
    * @response 200 AnnouncementJsonBody 返回结果
  */
  async insertAnnouncement() {
    const { ctx } = this;
    const params = ctx.request.body;
    // 字段校验
    const validate = this.app.validator.validate({ title: 'string', content: 'string'}, params);

    if (validate) {
      const msg = `missing_field [${validate.map(item => item.field)}]`;

      ctx.body = {
        code: '-1',
        msg,
        result: {},
      };
      return;
    }

    const result = await ctx.service.announce.insertAnnouncement(params);

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
    * @summary 公告编辑
    * @description 公告编辑
    * @router put /api/announcement/updateAnnouncement
    * @response 200 JsonBody 返回结果
  */
    async updateAnnouncement() {
        const { ctx } = this;
        const params = ctx.request.body;
        // 字段校验
        const validate = this.app.validator.validate({ title: 'string', content: 'string' }, params);

        if (validate) {
          const msg = `missing_field [${validate.map(item => item.field)}]`;

          ctx.body = {
            code: '-1',
            msg,
            result: {},
          };
          return;
        }

        const result = await ctx.service.announce.updateAnnouncement(params);

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
     * @summary 根据id删除公告
     * @description 根据id删除公告
     * @router delete /api/announcement/deleteAnnouncement/:id
     * @Request query integer *id 公告id
     * @response 200 JsonBody 返回结果
     */
    async deleteAnnouncement() {
        const { ctx } = this;
        const params = ctx.params;

        const result = await ctx.service.announce.deleteAnnouncement(params);

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
module.exports = AnnounceController;
