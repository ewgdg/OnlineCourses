'use strict'
const assert = require('assert')
const clean = (env) => Object.fromEntries(
  Object.entries(env).filter(([k]) => {
    // console.log(k);
    return (!/^(_.*|pwd|shlvl)/i.test(k))&&(!['HOMEDRIVE','HOMEPATH','LOGONSERVER','PATH','SYSTEMDRIVE','SYSTEMROOT','TEMP','USERDOMAIN','USERNAME','USERPROFILE','WINDIR'].includes(k))
  }
)

  
)
// console.log(process.env);
const env = clean(process.env)
// console.log(env);

assert.strictEqual(env.MY_ENV_VAR, 'is set')
assert.strictEqual(
  Object.keys(env).length,
  1,
  'child process should have only one env var'
)
console.log('passed!')
