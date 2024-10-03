import { postResult, postResults } from './utils.js';

// Example usage of postResult
const singleResult = {
    testName: 'Test 1',
    status: 'passed',
    duration: 123,
    startTime: new Date().toISOString(),
};

postResult(singleResult);

// Example usage of postResults
const multipleResults = [
    {
        testName: 'Test 2',
        status: 'failed',
        duration: 200,
        startTime: new Date().toISOString(),
    },
    {
        testName: 'Test 3',
        status: 'passed',
        duration: 150,
        startTime: new Date().toISOString(),
    },
];

postResults(multipleResults);
