const axios = require('axios');

async function askGPT (prompt, key) {
  if (!prompt) throw new Error('No prompt provided');

  const headers = {
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json'
  };
  
  const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  };
  
  return await axios.post('https://api.openai.com/v1/chat/completions', data, { headers })
    .then((response) => {
      // console.log(JSON.stringify(response.data.choices));
      return response.data.choices[0].message.content
    })
    .catch((error) => {
      return error
    });
}

module.exports = {
  askGPT: askGPT
};
