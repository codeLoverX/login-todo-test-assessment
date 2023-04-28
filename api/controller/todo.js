const { isValidObjectId } = require("mongoose");
const Todo = require("../model/Todo.js");
const { StatusCodes } = require('http-status-codes');

const getAllTodo = async (_req, res) => {
    try {
        const todos = await Todo.find();
        if (!todos) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server failed to retrieve todos." });
        return res.status(StatusCodes.OK).json({ data: todos });
    }
    catch (error) {
        next(error);
    }
}

const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({ title, description });
        const saved = await todo.save()
        if (!saved) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server failed to save todo." });
        return res.status(StatusCodes.Ok).json({ message: "Successfully create new Todo!", data: todo });
    } catch (error) {
        next(error);
    }
}

const getTodoById = async (req, res) => {
    const _id = req.params.id;
    if (!isValidObjectId(_id)) return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid ID sent by client" });
    try {
        const todo = await Todo.findById(_id);
        if (!todo) {
            if (!todos) return res.status(StatusCodes.NOT_FOUND).json({ error: "Server failed to retrieve todo." });
        }
        return res.status(StatusCodes.OK).json({ data: todo });
    } catch (error) {
        next(error);
    }
}

const updateTodoById = async (req, res) => {
    const _id = req.params.id;
    try {
        const todo = await Todo.findById(_id);
        if (!todo) {
            if (!todo) return res.status(StatusCodes.NOT_FOUND).json({ error: "Server failed to find the todo by the id." });
        }
        if (req.body.title == undefined || req.body.description == undefined || req.body.done == undefined ){
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: "Missing data by the clientt." });
        }
        const updatedTodo = await Todo.updateOne({ _id }, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                done: req.body.done
            },
        });
        return res.status(StatusCodes.CREATED).json({ message: "Successfully updated Todo!", data: updatedTodo });

    } catch (error) {
        next(error);
    }
}

const deleteTodoById = async (req, res) => {
    try {
        const _id = req.params.id;
        if (!isValidObjectId(_id)) return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid ID sent by client" });
        const deletedTodo = await Todo.deleteOne({ _id });
        return res.status(StatusCodes.OK).json({ message: "Successfully deleted Todo!" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTodo, getTodoById, updateTodoById, deleteTodoById, createTodo
}