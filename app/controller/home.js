'use strict';

const Controller = require('egg').Controller;
/**
* @controller Juice小程序接口文档
*/
class HomeController extends Controller {
  /**
    * @summary 测试首页。
    * @description 测试首页swagger。
    * @router get /
    * @response 200 JsonBody 返回结果
    */
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
