#!/usr/bin/env node

const yargs = require("yargs");
const utils = require('./utils.js')
// const translate = require('[@vitalets/google-translate-api](http://twitter.com/vitalets/google-translate-api)');
const chalk = require('chalk');  
const boxen = require('boxen');

// main();

(async function main () {
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
  else if(yargs.argv._[0] == null){  
    // if no args give, show help
    utils.showHelp();  
    return;  
  }
  else {
    console.log("Sorry! not supported yet.");
    return;
  }
})();

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
    await utils.askGPT(prompt)
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


// translate(sentence, {to: language})
//   .then(res => {
//     console.log("\n" + boxen(chalk.green("\n" + res.text + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
//   })
//   .catch(err => {                            
//      console.error(err);  
//   });
