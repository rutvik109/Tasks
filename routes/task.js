const express = require('express');
const router = express.Router();


const Task = require('../models/task.model');

router.get('/', (req, res) => {
    const task = Task.find({
        "completed": false
    }, (err, docs) => {
        if (err) return res.status(400).json({ 'error': 'no document found' });
        return res.status(200).json(docs);
    });
});

router.post('/add', (req, res) => {
    const task = {
        "description": req.body.description
    };
    if (req.body.completed) {
        task['completed'] = req.body.completed;
    }
    const newTask = new Task(task);

    newTask.save();
    return res.status(200).json(newTask);
});

router.delete('/delete/:id', (req, res) => {
    Task.findOneAndRemove({ _id: req.params.id }, (err, docs) => {
        if (err) return res.status(400).json({ 'error': 'no document found' });
        return res.status(200).json(docs);
    })
});

router.put('/complete/:id', (req, res) => {
    Task.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            "completed": true
        }
    }).then(
        result => {
            res.status(200).json({ result });
        }).catch(
        err => {
            res.status(400).json({ error: err });
        })
});

module.exports = router;