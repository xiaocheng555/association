const checkAuthority = require('./check-authority.js');
const student = require('./student');
const admin = require('./admin');
const notice = require('./notice');
const activity = require('./activity');
const association = require('./association');
const department = require('./department');
const position = require('./position');
const leaveMessage = require('./leave-message');

module.exports = function (app) {
  // 统一验证权限
  app.use(checkAuthority);
  app.use('/student', student);
  app.use('/admin', admin);
  app.use('/notice', notice);
  app.use('/activity', activity);
  app.use('/association', association);
  app.use('/department', department);
  app.use('/position', position);
  app.use('/leave-message', leaveMessage);
}
