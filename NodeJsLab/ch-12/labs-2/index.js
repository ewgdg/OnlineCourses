'use strict'
const { Readable, Writable, Transform, PassThrough, pipeline } = require('stream')
const assert = require('assert')
const { read } = require('fs')
// const createWritable = () => {
//   const sink = []
//   const writable = new Writable({
//     objectMode:true,
//     write(chunk, enc, cb) {
//       sink.push(chunk)
//       cb()
//     }
//   })
//   writable.sink = sink //another way to _contruct
//   return writable
// }

const createWritable = () => {
  const sink = []
  const writable = new Writable({
    objectMode:true,
    construct(cb){
      this.sink=sink;
      cb() // important , must call cb to tell the end of construct
    },
    write(chunk, enc, cb) {
      sink.push(chunk)
      cb()
    }
  })
  // writable.sink = sink
  return writable
}

// const readable = Readable.from(['a', 1, 'c'])
const readable = new Readable({
  objectMode:true,
  readableFlowing:true,
  construct(cb){
    this.datasink=['a',1,'c'];
    this.index=0;
    // setTimeout(() => {
    //   console.log('Now data will start flowing again.');
    //   this.resume();
    // }, 10000);
    cb();
  },
  read(){
    // this.resume();
    console.log('reading');
    // console.log(this.isPaused());
    // if(this.isPaused()){
    //   return
    // }
    if(this.index<this.datasink.length){
      this.push(this.datasink[this.index]);
      this.index++;
    }else{
      this.push(null);
    }
    // this.pause();
  }
});
// readable.resume();

// readable.pause();
// console.log(readable.isPaused());
// readable.resume();
// console.log(readable.isPaused());
readable.on('data', (data) => { console.log('got data', data) });
readable.on('end', () => { console.log('finished reading') });

// readable.read();
// readable.resume();

const writable = createWritable()

// TODO: replace the pass through stream 
// with a transform stream that uppercases
// incoming characters
const transform = new Transform({
  objectMode:true,
  // readableObjectMode:true,
  // writableObjectMode:true,
  // decodeStrings: false,
  transform(chunk,enc,next){
    // console.log(chunk instanceof String);
    if(chunk instanceof String|| typeof chunk === 'string'){
      chunk= chunk.toUpperCase()
    }
    this.push(chunk);
    next();
  },

})

// pipe will set readableFlowing to true, so data is auto read

pipeline(readable, transform, writable, (err) => {
  assert.ifError(err)
  assert.deepStrictEqual(writable.sink, ['A', 1, 'C'])
  console.log('passed!')
});
