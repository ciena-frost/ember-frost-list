import Ember from 'ember'
const {Helper, get} = Ember

/**
 * Determine if an item is the lead selection in a set of selections
 *
 * @param {Object[]} positionalParams - destructured to [0] items and [1] the current item
 * @returns {boolean} - true if the item is the lead selection
 */
export function selectionPosition ([items, item]) {
  if (!get(item, 'isSelected')) {
    return false
  }

  const itemIndex = items.indexOf(item)
  if (itemIndex === 0) {
    return true
  }

  const isPreviousItemSelected = get(items, `${itemIndex - 1}.isSelected`)
  return !isPreviousItemSelected
}

export default Helper.helper(selectionPosition)
