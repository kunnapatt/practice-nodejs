const Task = require('../models/Tasks');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error.js')

const getAllTasks = asyncWrapper(async(req, res) => {
    // res.send('get all items');
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
        // res.status(200).json({ status: 'success', data: { tasks, amount: tasks.length } })
})

const createTask = asyncWrapper(async(req, res) => {
    // res.send("create Tasks") ;
    const task = await Task.create(req.body);
    res.status(201).json({ task });
})

const getTask = asyncWrapper(async(req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID }).exec();

    if (!task) {
        return next(createCustomError(404, `No task with id: ${taskID}`))
    }
    res.status(200).json({ task });
})

const updateTask = asyncWrapper(async(req, res) => {
    // res.send("update task");
    const { id: taskID } = req.params;
    const data = req.body;
    const task = await Task.findOneAndUpdate({ _id: taskID }, data, {
        new: true,
        runValidators: true,
    });
    // console.log()
    if (!task) {
        return next(createCustomError(404, `No task with id: ${taskID}`))
    }

    // res.status(200).json({ id: taskID, data: data });
    res.status(200).json({ task });
})

const deleteTask = asyncWrapper(async(req, res) => {
    // res.send("delete task");
    const { id: TaskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: TaskID });
    if (!task) {
        return next(createCustomError(404, `No task with id: ${taskID}`))
    }
    // res.status(200).json({ task: null, status: 'success' })
    res.status(200).json({ task })
})

// const editTask = async(req, res) => {
//     // res.send("update task");
//     try {
//         const { id: taskID } = req.params;
//         const data = req.body;
//         const task = await Task.findOneAndUpdate({ _id: taskID }, data, {
//             new: true,
//             runValidators: true,
//             overwrite: true,
//         });
//         // console.log()
//         if (!task) {
//             res.status(404).json({ msg: `No task with ID: ${taskID}` });
//         }

//         // res.status(200).json({ id: taskID, data: data });
//         res.status(200).json({ task });
//     } catch (err) {
//         res.status(500).json({ msg: err });
//     }
// }

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    // editTask
}