import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const key = process.env.OPEN_AI_KEY;
const openai = new OpenAI({
    apiKey: key,
});


export const getResponse = async(req, res) => {
    const userInput = ""; //This should be replaced by whatever the user types in
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: "Give me 5 I should listen to based on the mood of this sentence as a json file: " 
                + userInput
            }
          ],
          max_tokens: 30,
    });
    console.log(response.choices[0].message.content);
};


function parseInput(input){

};



