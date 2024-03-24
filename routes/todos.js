"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var todos = [];
var router = (0, express_1.Router)();
router.get("/", function (req, res, next) {
    res.status(200).json({ message: "success", todos: todos });
});
router.post("/todo", function (req, res, next) {
    var newTodo = {
        id: new Date().toISOString(),
        name: req.body.text,
    };
    todos.push(newTodo);
    res.status(200).json({ success: true, todos: newTodo });
});
router.put("/todo/:todoId", function (req, res, next) {
    var id = req.params.todoId;
    var todoIndex = todos.findIndex(function (todoitem) { return todoitem.id === id; });
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, name: req.body.text };
        return res.status(200).json({ message: "updated todo", todos: todos });
    }
    res.status(400).json({ message: "cannot find todo for this id" });
});
router.delete("/todo/:todoId", function (req, res, next) {
    if (parseInt(req.params.todoId) >= 0) {
        todos = todos.filter(function (todoItem) { return todoItem.id !== req.params.todoId; });
        return res
            .status(201)
            .json({ success: true, message: "Todo deleted successfully" });
    }
    res
        .status(400)
        .json({
        success: false,
        message: "The todo u want to delete does not exist",
    });
});
exports.default = router;
