import Ember from 'ember'

export function isString (params) {
  return typeof params[0] === 'string'
}

export default Ember.Helper.helper(isString)
