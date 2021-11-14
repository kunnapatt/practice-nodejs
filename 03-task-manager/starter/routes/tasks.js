const express = require('express')
const router = express.Router()

const { getAllTasks, createTask, getTask, updateTask, deleteTask, editTask } = require('../controller/tasks')

// router.route('/').get((req, res) => {
//     res.send("get all items")
// })

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router