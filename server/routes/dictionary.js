import express from 'express';

const router = express.Router();

const baseURL = process.env.API_BASE_URL || 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// Route to fetch the definition of a word

//Matching route to the API endpoint used in the client-side code
router.get('/definition/:word', async (req, res) => {
    const word = req.params.word;
    console.log('Word received:', word);
    try {
        const response = await fetch(`${baseURL}${word}`);
        console.log('Response status:', response.status);
        if (!response.ok) {
            return res.status(response.status).json({ error: 'Word not found' });
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching definition:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Export the router to be used in the main server file
export default router;