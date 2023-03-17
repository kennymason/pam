const chalk = require('chalk');  
const boxen = require('boxen');
const readline = require('readline');

function askQuestion(query) {
  const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
      rl.close();
      resolve(ans);
  }))
}

const usage = chalk.hex('#83aaff')("\nUsage: tran <lang_name> sentence to be translated");
function showHelp() {                                                            
    console.log(usage);  
    console.log('\nOptions:\r')  
    console.log('\t--version\t      ' + 'Show version number.' + '\t\t' + '[boolean]\r')  
    console.log('    -l, --languages\t' + '      ' + 'List all languages.' + '\t\t' + '[boolean]\r')  
    console.log('\t--help\t\t      ' + 'Show help.' + '\t\t\t' + '[boolean]\n')  
}

function parseSentence(words, firstIndex) {  
  var sentence = "";  
  for(var i = firstIndex; i < words.length; i++) {  
    sentence = sentence + words[i] + " ";  
  }
  return sentence;
}

module.exports = { 
  askQuestion: askQuestion,
  // showAll: showAll,
  showHelp: showHelp,
  // parseLanguage: parseLanguage,
  parseSentence: parseSentence
};
