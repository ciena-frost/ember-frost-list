import Ember from 'ember'
const {Helper} = Ember

/**
 * Get the mathematical floor of a number
 *
 * @param {Object[]} positionalParams - destructured to [0] number
 * @returns {number} - the mathematical floor of the argument
 */
export function floor ([number]) {
  return Math.floor(number)
}

export default Helper.helper(floor)
