const express = require('express');
const { protect } = require('../middleware/protect');
const { getAllTodo, createTodo, deleteTodoById, getTodoById, updateTodoById } = require('../controller/todo');
const todoRouter = express.Router();

todoRouter.route('/')
        .get(protect, getAllTodo)
        .post(protect, createTodo);
todoRouter.route('/:id')
        .get(protect, getTodoById)
        .put(protect, updateTodoById)
        .delete(protect, deleteTodoById)

module.exports = todoRouter