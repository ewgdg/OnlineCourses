'use strict'

const { spawn } = require('child_process');
function exercise (command, args) {
 
  const sp = spawn(command, args,{stdio:['ignore','inherit','pipe']})

  return sp;

}

module.exports = exercise
const [node] = process.argv;


// exercise(node,['-p',`'test'`])

// exercise(node, [`-e`, `
//       process.stdout.write(Buffer.from([0]))
//       process.stdin.pipe(process.stdout)
//       setTimeout(() => {
//         process.stdout.write(Buffer.from([1]))
//       }, 100)
//   `])