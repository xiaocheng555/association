const verifyToken = require('./verify-token.js');
const student = require('./student');
const admin = require('./admin');

module.exports = function (app) {
  app.use(verifyToken);
  app.use('/student', student);
  app.use('/admin', admin);
}
