export function createClosureAction (method) {
  let context = this
  return function wrapperFunc () {
    method.apply(context, arguments)
  }
}

