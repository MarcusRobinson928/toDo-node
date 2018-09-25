toDoList = require('../data/todo-list.js');

module.exports = function(app) {

    app.get('/api/todo', function(req, res) {
        res.json(toDoList);
    });

    app.post('api/todo', function(req, res) {
        toDoList.push(req.body);
    });

}