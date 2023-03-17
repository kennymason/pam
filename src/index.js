const yargs = require("yargs");
const utils = require('./utils.js')
const sengled = require('./apis/sengled.js')
const gpt = require("./apis/gpt.js");
const shell = require("./scripts/shell.js");
const calendar = require("./apis/google/calendar.js");
const chalk = require('chalk');  
const boxen = require('boxen');
const { listEvents } = require("./apis/google/calendar.js");
const { commands } = require("../properties/application.json");

require('dotenv').config();
const SENGLED_USER = process.env.SENGLED_USER;
const SENGLED_PASS = process.env.SENGLED_PASS;

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
  let cmd = {};
  for (let i in commands){
    if (firstArg == commands[i].name) {
      cmd = commands[i];
      break;
    }
  }

  if (cmd == {} || !cmd.file) {
    return;
  }

  const input = utils.parseSentence(yargs.argv._, 1);
  try {
    if (cmd.file == "shell") {
      await shell.run(cmd, input);
    }
    else if (cmd.file == "gpt") {
      await gpt.run(cmd, input);
    }
    else if (cmd.file == "sengled") {
      await sengled.run(cmd, input);
    }
  }
  catch (e) {
    console.error(e);
  }
}

module.exports = {
  main: main
}
