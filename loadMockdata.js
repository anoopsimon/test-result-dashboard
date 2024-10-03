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

// Mock data
const mockData = [
    {
        testName: 'Test A',
        status: 'pass',
        duration: 120,
        startTime: new Date('2024-10-01T10:00:00Z'),
        endTime: new Date('2024-10-01T10:02:00Z')
    },
    {
        testName: 'Test B',
        status: 'fail',
        duration: 150,
        startTime: new Date('2024-10-01T11:00:00Z'),
        endTime: new Date('2024-10-01T11:02:30Z')
    },
    {
        testName: 'Test C',
        status: 'pass',
        duration: 200,
        startTime: new Date('2024-10-02T12:00:00Z'),
        endTime: new Date('2024-10-02T12:03:20Z')
    },
    {
        testName: 'Test D',
        status: 'pass',
        duration: 100,
        startTime: new Date('2024-10-02T13:00:00Z'),
        endTime: new Date('2024-10-02T13:01:40Z')
    },
    {
        testName: 'Test E',
        status: 'fail',
        duration: 180,
        startTime: new Date('2024-10-03T14:00:00Z'),
        endTime: new Date('2024-10-03T14:03:00Z')
    }
];

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

        // Insert mock data
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
