// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://root:example@localhost:27017/test-results?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Define a Test Result Schema
const testResultSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    status: { type: String, required: true },
    duration: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});

// Create a Model
const TestResult = mongoose.model('TestResult', testResultSchema);

// HTTP POST endpoint to create a new test result
app.post('/results', async (req, res) => {
    try {
        const testResult = new TestResult(req.body);
        await testResult.save();
        res.status(201).json(testResult);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// HTTP GET endpoint to retrieve all test results
app.get('/results', async (req, res) => {
    try {
        const results = await TestResult.find();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// HTTP PUT endpoint to update a test result by ID
app.put('/results/:id', async (req, res) => {
    try {
        const updatedResult = await TestResult.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedResult) return res.status(404).json({ error: 'Result not found' });
        res.status(200).json(updatedResult);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
