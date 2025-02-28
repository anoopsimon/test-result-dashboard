const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb://root:example@localhost:27017/test-results?authSource=admin';

// Define the Test Result Schema
const testResultSchema = new mongoose.Schema({
    testName: { type: String, required: true },
    status: { type: String, required: true },
    duration: { type: Number, required: true }, // Duration in seconds
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});

// Create a Model
const TestResult = mongoose.model('TestResult', testResultSchema);

// Helper function to generate random test names
const getRandomTestName = (index) => `Test ${String.fromCharCode(65 + index)}`; // Generates Test A, Test B, etc.

// Helper function to generate random statuses
const getRandomStatus = () => Math.random() > 0.5 ? 'pass' : 'fail';

// Helper function to generate random durations
const getRandomDuration = () => Math.floor(Math.random() * 300) + 60; // Random duration between 60 and 360 seconds

// Helper function to generate random timestamps within the last 6 months
const getRandomTime = () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const now = new Date();

    // Generate a random timestamp between sixMonthsAgo and now
    return new Date(Math.floor(Math.random() * (now.getTime() - sixMonthsAgo.getTime()) + sixMonthsAgo.getTime()));
};

// Function to generate mock data
const generateMockData = (numTests) => {
    const mockData = [];

    for (let i = 0; i < numTests; i++) {
        const startTime = getRandomTime();
        const duration = getRandomDuration();
        const endTime = new Date(startTime.getTime() + duration * 1000);

        mockData.push({
            testName: getRandomTestName(i),
            status: getRandomStatus(),
            duration,
            startTime,
            endTime
        });
    }

    return mockData;
};

// Function to load mock data
const loadMockData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing data
        await TestResult.deleteMany({});

        // Generate and insert mock data
        const mockData = generateMockData(1000); // Generate 1000 random test results
        const result = await TestResult.insertMany(mockData);
        console.log('Mock data loaded:', result);

    } catch (error) {
        console.error('Error loading mock data:', error);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
};

// Run the function to load mock data
loadMockData();
