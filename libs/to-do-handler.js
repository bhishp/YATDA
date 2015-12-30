var csv = require('csv');
var fs = require('fs');
var path = require('path');

// TODO: Is this the best way to handle the paths?
var toDoBhishPath = path.join(__dirname, '..', 'data', 'to-do-bhish.csv');
var toDoBartPath = path.join(__dirname, '..', 'data', 'to-do-bart.csv');

/**
 * A map of paths to csv files containing given user's to-do list
 */
var toDoListPaths = {
  bhish: toDoBhishPath,
  bart: toDoBartPath
};

/**
 * This callback type is called 'csvParseCallback'. It is passed to the to-do-handler parseList method for handling of
 * to-do-lists
 *
 * @callback csvParseCallback
 * @param {string[][]} toDoList - A two-dimensional array representing a to-do list
 */

/**
 *
 * @param username {string} username for given to-do list
 * @param {csvParseCallback} cb
 */
exports.getToDoListForUsername = function getToDoListForUsername (username, cb) {
  fs.readFile(toDoListPaths[username], function (err, data) {
    if (err) throw err;

    csv.parse(data, function (err, output) {
      if (err) throw err;
      cb(output);
    });
  });
};

exports.addNewToDoList = function addNewToDoList (username, toDoList) {
  if (username === 'dummy') {
    return false;
  }
  if (username === 'not-a-dummy') {
    return false;
  }
  if (username === 'anything') {
    return false;
  }
  return false;
};
