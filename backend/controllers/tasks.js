const router =require("express").Router();

const { createTask, getTasks, updateTask, deleteTask } = require('../routes/tasks');


router.post("/create", createTask)
router.get("/gettasks", getTasks);
router.get("/gettasks/:id", getTasks);
router.put("/updatetask/:id", updateTask)
router.delete('/deletetask/:id', deleteTask)



module.exports = router;