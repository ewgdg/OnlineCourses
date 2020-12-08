'use strict'
const { Readable, Writable,pipeline } = require('stream')
const assert = require('assert')
const { write } = require('fs')
const createWritable = () => {
  const sink = []
  let piped = false
  setImmediate(() => {
    assert.strictEqual(piped, true, 'use the pipe method')
    assert.deepStrictEqual(sink, ['a', 'b', 'c'])
  })
  const writable = new Writable({
    decodeStrings: false,
    write(chunk, enc, cb) {
      sink.push(chunk)
      cb()
    },
    final() {
      console.log('passed!')
    }
  })
  writable.once('pipe', () => {
    piped = true
  })
  return writable
}
const readable = Readable.from(['a', 'b', 'c'])
const writable = createWritable()

// TODO - send all data from readable to writable:
pipeline(readable,writable,(err)=>{
  if(err)
    console.log(err)
})
// writable.end('sdf');