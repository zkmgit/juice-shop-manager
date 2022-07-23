'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const params = ctx.request.body;
    const user = await ctx.service.user.login(params);
    ctx.body = user;
  }
  async getAllUserList() {
    const { ctx } = this;
    const user = await ctx.service.user.getAllUserList();
    ctx.body = user;
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
