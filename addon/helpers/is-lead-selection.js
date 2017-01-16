import Ember from 'ember'
const {Helper} = Ember

/**
 * Determine if an item is the lead selection in a set of selections
 *
 * @param {Object[]} positionalParams - destructured to [0] items and [1] the current item
 * @returns {boolean} - true if the item is the lead selection
 */
export function selectionPosition ([items, item]) {
  if (!item.get('isSelected')) {
    return false
  }

  const itemIndex = items.indexOf(item)
  if (itemIndex === 0) {
    return true
  }

  const isPreviousItemSelected = items.get(itemIndex - 1).get('isSelected')
  return !isPreviousItemSelected
}

export default Helper.helper(selectionPosition)
