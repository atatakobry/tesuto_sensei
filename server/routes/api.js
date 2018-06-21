var express = require('express');
var router = express.Router();

var Task = require('../mongoose/Task');

router.get('/tasks', function(req, res, next) {
  Task.find({}, function(err, tasks) {
    res.json(tasks);
  });
});

router.post('/tasks', function(req, res, next) {
  Task.create(req.body, function (err, task) {
    if (err) {
      // error handler
    }

    res.json(task);
  });
});

module.exports = router;
