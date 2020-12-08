'use strict'


global.setTimeout = require('timers').setTimeout  
// const assert = require('assert');
// jest.useRealTimers(); 
// jest.useFakeTimers();
const store = require('../store');

// global.setTimeout = require('timers').setTimeout;
global.setTimeout = require('timers').setTimeout 
const realSetInterval = setInterval;  // capture the real setInterval
const realClearInterval = clearInterval;  // capture the real clearInterval
beforeEach(() => {
  // jest.useFakeTimers();  // use fake timers
  jest.useRealTimers(); 
  global.setTimeout = require('timers').setTimeout 
});

afterEach(() => {
  jest.useRealTimers();  // restore real timers
});

// jest.useFakeTimers();
test('bad input',async () => {
  await expect(store('something')).rejects.toThrow(Error('input must be a buffer'))
  await expect(store('something')).rejects.toStrictEqual(Error('input must be a buffer'))
})

test('does not reject',async (done)=>{ 
  // await expect(store(Buffer.from('something'))).resolves.toBeDefined();
  // global.setTimeout = require('timers').setTimeout 
  // jest.useFakeTimers();
  // jest.runAllTimers();
  jest.useRealTimers(); 
  const res = await store(Buffer.from('something'))
  expect(res.id.length).toStrictEqual(4) 
  done()
  

})


const houseForSale = {
  bath: true,
  bedrooms: 4,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    area: 20,
    wallColor: 'white',
  },
};
const desiredHouse = {
  bath: true,
  kitchen: {
    amenities: ['oven', 'stove', 'washer'],
    wallColor: expect.stringMatching(/white|yellow/),
  },
};

test('the house has my desired features', () => {
  expect(houseForSale).toMatchObject(desiredHouse);
});