var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs("mongodb://navneet:navneet@ds135912.mlab.com:35912/meantodosapp", ['todos']);

router.get('/todos', function(req, res, next){
    db.todos.find(function(err, todos){
        if(err){
            res.send(err);
        } else {
            res.json(todos);
        } 
    })
});

router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    },function(err, todo){
        if(err){
            res.send(err);
        } else {
            res.json(todo);
        } 
    })
});

//Save Todos
router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.text || !(todo.IsCompletet+'')){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.save(todo, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            } 
        });
    }
});

//Update Todo
router.post('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updObj = {};
    
    if(todo.text){
        updObj.text = todo.text;      
    }
    
    if(todo.IsCompleted){
        updObj.IsCompleted = todo.IsCompleted;
    }
    
    if(!updObj){
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.todos.put({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            } 
        });
    }
});

//DELETE Todo
router.delete('/todo/:id', function(req, res, next){
    db.todos.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = router;
