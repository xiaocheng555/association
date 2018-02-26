const StudentModel = require('../models').Student

exports.student = function (req, res) {
  StudentModel.findById(1).then(project => {
    // res.send('project ' + JSON.stringify(project));
    res.json(project)
  })
}