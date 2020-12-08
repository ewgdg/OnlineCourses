function f (n = 99) {
  debugger;
  if (n === 0) return//throw Error()
  debugger
  f(n - 1)
}
debugger;
f()
