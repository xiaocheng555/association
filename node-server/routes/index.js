var student = require('./student');

module.exports = function (app) {
  app.use('/student', student);
}
