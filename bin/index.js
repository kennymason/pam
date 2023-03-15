#!/usr/bin/env node

const yargs = require("yargs");
const utils = require('../src/utils.js')
const sengled = require('../src/apis/sengled.js')
const gpt = require("../src/apis/gpt.js");
const calendar = require("../src/apis/google/calendar.js");
const chalk = require('chalk');  
const boxen = require('boxen');
const { listEvents } = require("../src/apis/google/calendar.js");
const { commands } = require("../properties/application.json");

require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SENGLED_USER = process.env.SENGLED_USER;
const SENGLED_PASS = process.env.SENGLED_PASS;

main();

async function main () {
  // all non-flag args get stored in the list 'yargs.argv._'
  // set demandOption to true to make the option compulsory. yargs will then throw a missing argument error if flag is not provided
  const usage = chalk.hex('#83aaff')("\nUsage: pam <option> <prompt>");
  const options = yargs  
        .usage(usage)  
        .option("c", {
          alias:"chat",
          describe: "Enter GPT chat",
          type: "boolean",
          demandOption : false
        })   
        .option("o", {
          alias:"options",
          describe: "List available options",
          type: "boolean",
          demandOption : false
        })                                                                                                    
        .help(true)
        .argv;

  // if options flag set, list options
  if(yargs.argv.o == true || yargs.argv.options == true){  
    utils.showAll();
    return;  
  }

  // get primary arg
  if(yargs.argv._[0]) {
    var firstArg = yargs.argv._[0].toLowerCase();
  }

  // TODO update this
  const cmd = {};
  for (commands in commands){
    if (firstArg == command.name) {
      cmd = command;
      break;
    }
  }

  if (cmd == {} || !cmd.file) {
    return;
  }

  try {
    const file = require(cmd.file);
    file.run(cmd);
  }
  catch (e) {
    console.error(e);
  }


  if (firstArg == 'chat' || yargs.argv.c == true || yargs.argv.chat == true) {
    if (firstArg == 'chat'){
      var sentence = utils.parseSentence(yargs.argv._, 1);
    }
    else {
      var sentence = utils.parseSentence(yargs.argv._, 0);
    }

    await startChat(sentence);
    return;
  }
  else if (firstArg == 'cal' || firstArg == 'calendar' || yargs.argv.e == true || yargs.argv.events == true) {
    if (firstArg == 'cal' || firstArg == 'calendar'){
      var sentence = utils.parseSentence(yargs.argv._, 1);
    }
    else {
      var sentence = utils.parseSentence(yargs.argv._, 0);
    }

    await calendar.run();
    return;
  }
  else if (firstArg == 'home' || yargs.argv.h == true || yargs.argv.home == true) {
    if (firstArg == 'home'){
      var sentence = utils.parseSentence(yargs.argv._, 1);
    }
    else {
      var sentence = utils.parseSentence(yargs.argv._, 0);
    }

    await controlSengled();
    return;
  }
  else if(yargs.argv._[0] == null){  
    // if no args give, show help
    utils.showHelp();  
    return;  
  }
  else {
    console.log("Sorry! not supported yet.");
    return;
  }
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
    await gpt.askGPT(prompt, OPENAI_API_KEY)
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

async function controlSengled (commands) {
  await sengled.controlDevice({user: SENGLED_USER, pass: SENGLED_PASS})
}

