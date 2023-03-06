// app/service/announce.js
const Service = require('egg').Service;

class AnnounceService extends Service {
    // 获取所有公告详情
    async getAnnounceList(sql){
        const result = await this.app.mysql.query(sql);
        const total = await this.app.mysql.query('select count(*) as total from announcement');
        return { result, total: total[0].total };
    }
    // 新增公告
    async insertAnnouncement(params){
        const res = await this.app.mysql.insert('announcement', params);
        return { res };
    }
    // 编辑公告
    async updateAnnouncement(params){
        const res = await this.app.mysql.update('announcement', params);
        return { res };
    }
    // 删除公告
    async deleteAnnouncement(params) {
        const res = await this.app.mysql.delete('announcement', params);
        return { res };
    }
}
module.exports = AnnounceService;
