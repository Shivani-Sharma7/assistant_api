const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const app=express()
const openAI=require('openai');
require('dotenv').config();

app.use(cors());
app.use(express.json());
const apiKey = process.env.API_KEY;

app.post('/text_generation',async (req,res)=>{
    const message=req.body.message;
    const openai = new openAI({
        apiKey: apiKey,
    });
    const completion = await openai.chat.completions.create({
        messages: [
            {"role": "user", "content": message}
          ],
        model: "gpt-4o-mini",
    });  
    const responseValue=completion.choices[0].message.content;
    res.json(responseValue);
})

app.listen(3000,(req,res,next)=>{
    console.log('server started...');
})


