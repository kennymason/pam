#!/usr/bin/env node

const yargs = require("yargs");
const utils = require('./utils.js')
// const translate = require('[@vitalets/google-translate-api](http://twitter.com/vitalets/google-translate-api)');
const chalk = require('chalk');  
const boxen = require('boxen');

// all non-flag args get stored in the list 'yargs.argv._'
// set demandOption to true to make the option compulsory. yargs will then throw a missing argument error if flag is not provided
const usage = chalk.hex('#83aaff')("\nUsage: tran <lang_name> sentence to be translated");
const options = yargs  
      .usage(usage)  
      .option("l", {
        alias:"languages",
        describe: "List all supported languages.",
        type: "boolean",
        demandOption : false
      })                                                                                                    
      .help(true)  
      .argv;

var sentence = utils.parseSentence(yargs.argv._);

if(yargs.argv._[0] == null){  
  utils.showHelp();  
  return;  
}

if(yargs.argv.l == true || yargs.argv.languages == true){  
  utils.showAll();  
  return;  
}

if(yargs.argv._[0])  
var language = yargs.argv._[0].toLowerCase(); // stores the language.
//parsing the language specified to the ISO-639-1 code.                                                                                              
language = utils.parseLanguage(language);

if(sentence == ""){                                                                                          
    console.error("\nThe entered sentence is like John Cena, I can't see it!\n")  
    console.log("Enter tran --help to get started.\n")  
    return;
}
console.log("\n" + boxen(chalk.green("\nTranslation here\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
// translate(sentence, {to: language})
//   .then(res => {
//     console.log("\n" + boxen(chalk.green("\n" + res.text + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");
//   })
//   .catch(err => {                            
//      console.error(err);  
//   });
