const express = require('express');
const { getAllTodo, createTodo, deleteTodoById, getTodoById, updateTodoById } = require('../controller/todo');
const todoRouter = express.Router(); 

todoRouter.route('/')
        .get(getAllTodo)
        .post(createTodo);
todoRouter.route('/:id')
        .get(getTodoById)
        .put(updateTodoById)
        .delete(deleteTodoById)

module.exports = todoRouter