import { todo } from "../models/todo";

import { Router } from "express";

let todos: todo[] = [];

const router = Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "success", todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo: todo = {
    id: new Date().toISOString(),
    name: req.body.text,
  };

  todos.push(newTodo);

  res.status(200).json({ success: true, todos: newTodo });
});

router.put("/todo/:todoId", (req, res, next) => {
  const id = req.params.todoId;

  const todoIndex = todos.findIndex((todoitem) => todoitem.id === id);

  if (todoIndex >= 0) {
    todos[todoIndex] = { id: todos[todoIndex].id, name: req.body.text };
    return res.status(200).json({ message: "updated todo", todos: todos });
  }

  res.status(400).json({ message: "cannot find todo for this id" });
});

router.delete("/todo/:todoId", (req, res, next) => {

    const todoIndex = todos.findIndex((todoitem) => todoitem.id === req.params.todoId);

  if (todoIndex) {
    todos = todos.filter((todoItem) => todoItem.id !== req.params.todoId);
    return res
      .status(201)
      .json({ success: true, message: "Todo deleted successfully" });
  }

  res.status(404).json({
    success: false,
    message: "The todo u want to delete does not exist",
  });
});

export default router;
