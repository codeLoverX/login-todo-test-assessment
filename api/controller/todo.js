const { isValidObjectId } = require("mongoose");
const Todo = require("../model/Todo.js");
const { StatusCodes } = require('http-status-codes');

const getAllTodo = async (_req, res, next) => {
    let todos;
    try {
        todos = await Todo.find().lean();
        if (!todos) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server failed to retrieve todos." });
        return res.status(StatusCodes.OK).json({ data: todos });
    }
    catch (error) {
        next(error);
    }
}

const createTodo = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({ title, description });
        const saved = await todo.save();
        if (!saved) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Server failed to save todo." });
        return res.status(StatusCodes.OK).json({ message: "Successfully create new Todo!", data: todo });

    } catch (error) {
        next(error);
    }
}

const getTodoById = async (req, res, next) => {
    const _id = req.params.id;
    if (!isValidObjectId(_id)) return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid ID sent by client" });
    try {
        const todo = await Todo.findById(_id).lean();
        if (!todo) return res.status(StatusCodes.NOT_FOUND).json({ error: "Server failed to retrieve todo." });
        return res.status(StatusCodes.OK).json({ data: todo });
    } catch (error) {
        next(error);
    }
}

const updateTodoById = async (req, res, next) => {
    const _id = req.params.id;
    try {
        const todo = await Todo.findById(_id);
        if (!todo) {
            if (!todo) return res.status(StatusCodes.NOT_FOUND).json({ error: "Server failed to find the todo by the id." });
        }
        if ((req.body.title == undefined || req.body.description == undefined) && req.body.done == undefined) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: "Missing data by the client." });
        }
        const update = req.body.done == undefined ?
            { title: req.body.title, description: req.body.description, } :
            { done: req.body.done }
        const updatedTodo = await Todo.updateOne(
            { _id },
            { $set: { ...update } },
            { returnOriginal: false }
        );
        return res.status(StatusCodes.CREATED).json({ message: "Successfully updated Todo!", data: updatedTodo });
    } catch (error) {
        next(error);
    }
}

const deleteTodoById = async (req, res, next) => {
    try {
        const _id = req.params.id;
        if (!isValidObjectId(_id)) return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid ID sent by client" });
        await Todo.deleteOne({ _id });
        return res.status(StatusCodes.OK).json({ message: "Successfully deleted Todo!" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllTodo, getTodoById, updateTodoById, deleteTodoById, createTodo
}