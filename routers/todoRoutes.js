const todoController = require("../controllers/todoController");
  
  const router = require("express").Router();
  
  router
    .get("/todo", todoController.getTodos)
    .post("/add-todo", todoController.addTodo)
    .put("/update-todo/:id", todoController.updateTodo)
    .delete("/delete-todo/:id", todoController.deleteTodo)
    .put("/complete-todo/:id", todoController.completeTodo);
  
  module.exports = router;
  