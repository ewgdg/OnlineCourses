'use strict'
const { promisify } = require('util')

const print = (err, contents) => {
  if (err) console.error(err)
  else console.log(contents)
}

const opA = (cb) => {
  setTimeout(() => {
    cb(null, 'A')
  }, 500)
}

const opB = (cb) => {
  setTimeout(() => {
    cb(null, 'B')
  }, 250)
}

const opC = (cb) => {
  setTimeout(() => {
    cb(null, 'C')
  }, 125)
}

let _opA = promisify(opA)
let _opB = promisify(opB)
let _opC = promisify(opC)

Promise.all([_opA(), _opB(), _opC()]).then(data => {
  data.forEach((item) => print(null, item));
});

//for node >=12.9 only
Promise.allSettled([_opA(), _opB(), _opC()]).then(data => {
  data.forEach((item) => {
      if (item.status === 'rejected') {
        print(item.reason, null);
      } else { //status === 'fullfilled'
        print(null, item.value);
      }

    }
  )
});