const asyncHandler = require("express-async-handler");
const Todo = require("../models/Todo");
const { io } = require("../socket/socket");
// const Todo = require("../modal/Todo");

exports.getTodos =asyncHandler( async (req, res) => {

    const result = await Todo.find();
    res.status(200).json({ message: "All Todos Fetch Success", result });

})
exports.addTodo =asyncHandler( async (req, res) => {

    await Todo.create(req.body);
    const result = await Todo.find();

    io.emit("todo-create-response", result)
    res.status(201).json({ message: "Todo Add Success" });

})
exports.updateTodo =asyncHandler( async (req, res) => {

    await Todo.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ message: "Todo Update Success" });

})
exports.deleteTodo =asyncHandler( async (req, res) => {

    await Todo.findByIdAndDelete(req.params.id);
    const result = await Todo.find();

    io.emit("todo-create-response", result)
    res.status(200).json({ message: "Todo delete Success" });

})
