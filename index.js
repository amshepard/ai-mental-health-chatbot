const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.get('/', (req, res) => {
  res.send('Welcome to the Mental Health Chatbot API');
});

app.post('/prompt', async (req, res) => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: 0.7,
      max_tokens: 150,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.json({ response: completion.data.choices[0].text.trim() });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while processing your request.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});