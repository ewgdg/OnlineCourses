'use strict'

const {join:pathjoin} = require('path');
function exercise (myEnvVar) {
  // TODO return a child process with
  // a single environment variable set 
  // named MY_ENV_VAR. The MY_ENV_VAR 
  // environment variable's value should 
  // be the value of the myEnvVar parameter 
  // passed to this exercise function
  const childPath = pathjoin(__dirname,'child.js');
  // process.argv[0] is node
  return require('child_process').spawnSync(process.execPath, [childPath],{env:{MY_ENV_VAR:myEnvVar}})
}

module.exports = exercise

if(require.main===module){
  process.env.MY_ENV_VAR='main'
  console.log(process.env.MY_ENV_VAR);
  const sp = exercise('test');
  console.log(sp.stdout.toString())
}