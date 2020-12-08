const uppercase = require('../uppercase');

test('handle wrong input', ()=>{

  expect(()=>uppercase(123)).toThrow(new Error('input must be a string'));
  expect(()=>uppercase('test')).not.toThrow();


})


test('handle wrong output', ()=>{

  expect(uppercase('test')).toStrictEqual('TEST');


})
