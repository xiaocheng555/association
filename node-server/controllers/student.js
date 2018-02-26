const studentModel = require('../models/student')

exports.student = function (req, res) {
  studentModel.findById(1).then(project => {
    // res.send('project ' + JSON.stringify(project));
    res.json(project)
  })
}