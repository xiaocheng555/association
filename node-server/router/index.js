var student = require('./routes/student');

module.exports = function (app) {
  app.use('/student', student);
}
