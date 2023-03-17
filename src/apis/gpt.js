const axios = require('axios');
const boxen = require('boxen');
const chalk = require('chalk');
const utils = require('../utils.js');

require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

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

async function startChat (startingPrompt) {
  console.log("PAM powered by gpt-3.5-turbo\nType 'exit' to quit");

  let prompt = startingPrompt;
  while (prompt = "") {
    prompt = await utils.askQuestion("user>")
      .then(res => {
        return res
      })
      .catch(error => {
        console.log(error);
      });

    if (prompt == 'exit' || prompt == 'quit') return;
  }

  while (true) {
    await askGPT(prompt, OPENAI_API_KEY)
    .then(res => {
      console.log("\n" + boxen(chalk.green(res + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
    })
    .catch(err => {                            
      // console.error(err);  
      console.log("\n");
    });

    prompt = await utils.askQuestion("user>")
      .then(res => {
        return res
      })
      .catch(error => {
        console.log(error);
      });

    if (prompt == "exit" || prompt == "quit") return;
  }
}

async function run (cmd, input) {
  await startChat(input);
}

module.exports = {
  run: run
};
