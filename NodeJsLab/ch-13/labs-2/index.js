'use strict'
const assert = require('assert')
const { join, basename } = require('path')
const fs = require('fs')
const project = join(__dirname, 'project')
try { fs.rmSync(project, {recursive: true,force:true}) } catch (err) {}
const files = Array.from(Array(5), () => {
  return join(project, Math.random().toString(36).slice(2))
})
fs.mkdirSync(project)
for (const f of files) fs.closeSync(fs.openSync(f, 'w'))

files.sort();

const out = join(__dirname, 'out.txt')

function exercise () {
  // TODO read the files in the project folder
  // and write the to the out.txt file
  const res = fs.readdirSync(project);
  console.log(res.toString());
  fs.writeFileSync(out,res.toString());
}

exercise()
assert.deepStrictEqual(
  fs.readFileSync(out).toString().split(',').map((s) => s.trim()),
  files.map((f) => basename(f))
)
console.log('passed!')