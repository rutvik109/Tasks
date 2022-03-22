const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const task = require('./routes/task');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

app.use('/task', task);

const PORT = process.env.PORT || 7700;
app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));