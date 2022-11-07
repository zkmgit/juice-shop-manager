'use strict';

const Controller = require('egg').Controller;

class UtilsController extends Controller {
  async uploadFiles() {
    const { ctx } = this;
    const data = await ctx.service.utils.uploadFiles();
    if (data) {
      ctx.body = {
        code: '1',
        msg: '上传成功',
        result: data
      };
    } else {
      ctx.body = {
        code: '-1',
        msg: '上传失败',
        result: {}
      };
    }
  }
}

module.exports = UtilsController;
