import Ember from 'ember'
const {
  Component,
  assign,
  getOwner
} = Ember

export function registerMockComponent (context, name = 'mock-component', opts = {}) {
  let owner = getOwner(context)
  let options = assign({ tagName: 'dummy' }, opts)
  let mockComponent = Component.extend(options)

  unregisterMockComponent(context)
  owner.register(`component:${name}`, mockComponent)
}

export function unregisterMockComponent (context, name = 'mock-component') {
  let owner = getOwner(context)

  if (owner.resolveRegistration(`component:${name}`)) {
    owner.unregister(`component:${name}`)
  }
}
