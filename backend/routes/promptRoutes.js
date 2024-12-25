import express from 'express';
import { getResponse } from '../controllers/gptPrompt.js';
const router = express.Router();

// Define a route that uses the getResponse function
router.post('/get-response', async (req, res) => {
    console.log("Request body:", req.body);
    const userInput = req.body.input;
    try {
        const result = await getResponse(userInput);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch songs." });
    }
});

export default router;