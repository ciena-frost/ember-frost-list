export function create (method) {
  let context = this
  return function wrapperFunc () {
    method.apply(context, arguments)
  }
}

export default create

