import Ember from 'ember'
const {Helper, getWithDefault: emberGetWithDefault} = Ember

export function getWithDefault ([object, name, defaultValue]) {
  if (name) {
    return emberGetWithDefault(object, name, defaultValue)
  }
  return defaultValue
}

export default Helper.helper(getWithDefault)
