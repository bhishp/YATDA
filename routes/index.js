var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var toDo = require('../libs/to-do-handler');

//var COMMENTS_FILE = path.join(__dirname, '..', 'comments.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  toDo.getToDoListForUsername('bhish',
    function(result) {
      res.render('index', { title: 'To Do List App', toDoList: result });
    });
});

/*router.get('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});*/

module.exports = router;
