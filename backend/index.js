const { OpenAI } = require('openai');
const express = require('express');
require('dotenv').config();

const key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: key,
});

const app = express();
const port = 3000;
    
app.get('/', (req, res) => res.json({first_json_req: "hello world"}));
    
app.listen(port, console.log('Server started on port: ' + port));


async function testFunction() {
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        store: true,
        messages: [
            {"role": "user", "content": "write a haiku about ai"}
        ]
    });
    console.log(completion);
}

testFunction();