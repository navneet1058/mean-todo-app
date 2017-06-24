var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set(bodyParser.json());
app.set(bodyParser.urlencoded({
    extended: true
}));

app.use('/', index);
app.use('/api/todos', todos);

app.listen(3000, function(){
    console.log('Server started on port 3000 ....');
});