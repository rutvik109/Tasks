const mongoose = require('mongoose');
const schema = mongoose.Schema;

const taskSchema = new mongoose.Schema({

    "description": {
        "type": String,
        "required": true
    },
    "completed": {
        "type": Boolean,
        "default": false
    }

});

module.exports = Task = mongoose.model("task", taskSchema);