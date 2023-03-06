const prefix = '/api/announcement/';
// 公告模块路由
module.exports = app => {
    const { router, controller } = app;

    // 获取所有的公告信息
    router.get(`${prefix}getAnnouncementList`, controller.announce.getAnnouncementList);
    // 新增公告
    router.post(`${prefix}insertAnnouncement`, controller.announce.insertAnnouncement)
    // 编辑公告
    router.put(`${prefix}updateAnnouncement`, controller.announce.updateAnnouncement);
    // 删除公告
    router.delete(`${prefix}deleteAnnouncement/:id`, controller.announce.deleteAnnouncement);
};
