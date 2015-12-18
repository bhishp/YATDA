var express = require('express');
var router = express.Router();

var toDo = require('../libs/to-do-handler');

/* GET home page. */
router.get('/', function(req, res, next) {

  toDo.getToDoListForUsername('bhish',
    function(result) {
      res.render('index', { title: 'To Do List App', toDoList: result });
    });
});

module.exports = router;
