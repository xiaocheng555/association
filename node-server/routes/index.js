var student = require('./student');
var admin = require('./admin');

module.exports = function (app) {
  app.use('/student', student);
  app.use('/admin', admin);
}
