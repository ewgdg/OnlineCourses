const assert = require('assert').strict;
const store = require('../store.js');



//err back

store('wrong input',(err)=>{
  assert.deepEqual(err,new Error('input must be a buffer'));
})

store(Buffer.from(['a','b','c']),(err,{id})=>{
  
  assert.ifError(err);
  assert.equal(id.toString(36),id);
  assert.equal(id.length,4);



})