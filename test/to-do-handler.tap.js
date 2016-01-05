var test = require('tape');
var toDo = require('../libs/to-do-handler');

test('shouldGetToDoListForUsername', function (t) {
  t.plan(2);

  toDo.getToDoListForUsername('bhish',
    function (result) {
      var parsedToDo = result;
      var expected = [
        ['Make to-do app', 'A to-do application should be made for doing fun to-do type doing stuff. And it should be done before xmas!', '20151224'],
        ['Admire to-do app', 'And then he read his to-dos, and, behold, it was very good.', '20151225'],
        ['Think about what I need to-do', 'What do I need to-do in order to build more of the to-do app? (Inception!)', '20160104']
      ];
      t.deepEqual(parsedToDo, expected);
    });

  toDo.getToDoListForUsername('bart',
    function (result) {
      var parsedToDo = result;
      var expected = [
        ['Annoy Homer', 'Annoy him really badly', '20160101'],
        ['Laugh at Milhouse', 'Because, why not?', '20160101']
      ];
      t.deepEqual(parsedToDo, expected);
    });
});
