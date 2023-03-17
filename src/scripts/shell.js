const { promisify } = require('util');
const { exec } = require('child_process');
// const execAsync = promisify(exec);

async function run (obj, input) {
  if (obj == {}) return;
  if (obj.actions == []) return

  const actions = obj.actions.actions.join(" && ");
  const path = obj.actions.path == "" ? process.cwd() : obj.actions.path

  try {
    console.log(actions);
    exec(actions, { path }, (err, stdout, stderr) => {
      console.log(stdout);
      if (err) {
        console.error(err);
        return;
      }
    });
  }
  catch (e) {
    console.error(e);
  }
}

module.exports = {
  run: run
};
