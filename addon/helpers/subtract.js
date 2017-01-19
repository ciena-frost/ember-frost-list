import Ember from 'ember'
const {Helper, isNone} = Ember

/**
 * Subtract a number from another number
 *
 * @param {Object[]} positionalParams - destructured to [0] number and [1] value
 * @returns {number} - number minus value
 */
export function subtract ([number, value]) {
  if (isNone(number) || isNone(value)) {
    return null
  }

  return Number(number) - Number(value)
}

export default Helper.helper(subtract)
