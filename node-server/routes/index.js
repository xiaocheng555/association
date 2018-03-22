const verifyToken = require('./verify-token.js');
const student = require('./student');
const admin = require('./admin');
const notice = require('./notice');
const activity = require('./activity');

module.exports = function (app) {
  app.use(verifyToken);
  app.use('/student', student);
  app.use('/admin', admin);
  app.use('/notice', notice);
  app.use('/activity', activity);
}
