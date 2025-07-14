
// This file contains the API call to fetch the definition of a word from the server
// API call matches the route defined in server/routes/dictionary.js
const fetchDefinition = async (word) => {
    const response = await fetch(`/api/definition/${word}`);
    const data = await response.json();
  
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No definition found');
    }
    return data;
}

export {fetchDefinition};