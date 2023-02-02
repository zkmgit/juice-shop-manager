const moment = require('moment');

const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DEFAULT_DATE_TIME_TYPE = 'seconds';
// 格式化日期时间
exports.formatDateTime = (date = undefined, format = DEFAULT_DATE_TIME_FORMAT) => {
  return moment(date).format(format)
}

exports.diffDateTime = (date = undefined, type = DEFAULT_DATE_TIME_TYPE) => {
  return moment(new Date()).diff(moment(date), type)
}