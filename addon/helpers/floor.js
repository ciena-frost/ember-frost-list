import Ember from 'ember'

export function floor ([number]) {
  return Math.floor(number)
}

export default Ember.Helper.helper(floor)
