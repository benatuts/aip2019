const express = require('express');
const app = express();

// ------------------------------------------------
// Set up Object-Document mapping with sample data
// ------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true, useCreateIndex: true, poolSize: 1 });

const Student = mongoose.model('Student', {
    studentId: {type: String, unique: true},  // Use an index on name for faster querying
    counter: Number,
    name: String
});

// Sample data
(async () => {
    await Student.deleteMany({}); // Remove existing students
    await new Student({studentId: '1', counter: 0, name: 'Alice'}).save();
    await new Student({studentId: '2', counter: 0, name: 'Bob'}).save();
    await new Student({studentId: '3', counter: 0, name: 'Carol'}).save();
    await new Student({studentId: '4', counter: 0, name: 'Dave'}).save();
})();

// ------------------------------------------------
// GET /a/:id
// Simple method overhead
// ------------------------------------------------
app.use('/a/:id', async (req, res) => {
    // do nothing
    res.send('');
});

// ------------------------------------------------
// GET /b/:id
// Method overhead plus generating JSON response
// ------------------------------------------------
app.use('/b/:id', async (req, res) => {
    let id = req.params.id;
    res.json({studentId: id, name: 'Sample Name'})
});

// ------------------------------------------------
// GET /c/:id
// Database lookup
//
// Note: this code does not catch database errors
// ------------------------------------------------
app.use('/c/:id', async (req, res) => {
    let result = await Student.find({studentId: req.params.id});
    if (result.length > 0) {
        let found = result[0];
        res.json({studentId: found.studentId, name: found.name});
    } else
        res.json({error: 'NOT_FOUND'});
});

// ------------------------------------------------
// GET /d/:id
// Database lookup and update
//
// Note: this code does not catch database errors
// ------------------------------------------------
app.use('/d/:id', async (req, res) => {
    let result = await Student.find({studentId: req.params.id});
    if (result.length > 0) {
        let found = result[0];
        found.counter += 1;
        await found.save();
        res.json({studentId: found.studentId, counter: found.counter, name: found.name});
    } else
        res.json({error: 'NOT_FOUND'});
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
server = app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});