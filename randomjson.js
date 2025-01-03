import fs from 'fs';

// Load the JSON file
const responses = JSON.parse(fs.readFileSync('./random_responses.json', 'utf-8'));

// Function to get a random response
const getRandomResponse = () => {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
};

export default getRandomResponse

// Test the function

