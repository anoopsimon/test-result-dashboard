// utils.js

const API_ENDPOINT = 'http://localhost:3000/results'; // Update this to your actual endpoint

/**
 * Post a single test result.
 * @param {Object} result - The result object of a single test.
 * @returns {Promise<void>} - A promise that resolves when the post is successful.
 */
async function postResult(result) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(result),
        });

        if (!response.ok) {
            throw new Error(`Error posting result: ${response.statusText}`);
        }

        console.log('Single result posted successfully:', result);
    } catch (error) {
        console.error('Failed to post result:', error);
    }
}

/**
 * Post an array of test results.
 * @param {Array<Object>} results - The array of result objects for an entire test run.
 * @returns {Promise<void>} - A promise that resolves when all posts are successful.
 */
async function postResults(results) {
    try {
        const promises = results.map(result => postResult(result));
        await Promise.all(promises);
        console.log('All results posted successfully.');
    } catch (error) {
        console.error('Failed to post results:', error);
    }
}

export { postResult, postResults };
