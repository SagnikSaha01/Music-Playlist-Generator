import env from 'dotenv';
import OpenAI from 'openai';

env.config();

const key = process.env.OPEN_AI_KEY;
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

export const getResponse = async (userInput) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: "user",
                    content: `You don't need to act like an API. Just generate a JSON response EXACTLY in the following format. I want top 5 songs, based on the mood of the user. The input will be a mood and the strength of the mood. The output should be a JSON object with the mood, strength of the mood, and an array of songs. The songs should have the song name and the artist's name. I don't want you to respond with anything else except a JSON object that should look like this:
                    {
                        "mood": "mood of the user",
                        "strength of the mood": "0 to 1",
                        "songs": [
                            { "songName": "song1", "artistsName": "artist1" },
                            { "songName": "song2", "artistsName": "artist2" },
                            { "songName": "song3", "artistsName": "artist3" },
                            { "songName": "song4", "artistsName": "artist4" },
                            { "songName": "song5", "artistsName": "artist5" }
                        ]
                    }
                    The input is: ${userInput}`
                }
            ]
        });

        const parsedResponse = response.choices[0].message.content;
        try {
            // Attempt to parse as JSON directly
            return JSON.parse(parsedResponse);
        } catch (parsingError) {
            // If direct parsing fails, clean the response
            parsedResponse = parsedResponse.trim();
            const jsonStart = parsedResponse.indexOf('{');
            const jsonEnd = parsedResponse.lastIndexOf('}');
            if (jsonStart !== -1 && jsonEnd !== -1) {
                const jsonString = parsedResponse.substring(jsonStart, jsonEnd + 1);
                return JSON.parse(jsonString);
            } else {
                throw new Error("Invalid JSON format in AI response.");
            }
        }
        
    } catch (error) {
        console.error("Error fetching response:", error);
        return json.parse({
            mood: 'undefined',
            'strength of the mood': '0',
            songs: [
                { songName: 'No relevant song', artistsName: 'No relevant artist' },
                { songName: 'No relevant song', artistsName: 'No relevant artist' },
                { songName: 'No relevant song', artistsName: 'No relevant artist' }
            ]
        });
    }
};
