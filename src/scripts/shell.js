const { exec } = require('child_process');
const { commands } = require('./git.json');

function main (input) {
  let cmd = {};
  for (key in commands) {
    if (input == key) {
      cmd = commands[key];
      break;
    }
  }

  if (cmd == {}) return;
  if (cmd.actions == []) return

  const actions = " | ".join(cms.actions);
  const path = cmd.path || process.cwd

  exec(actions, { path }, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

// function run (obj) {
//   main()
// }
