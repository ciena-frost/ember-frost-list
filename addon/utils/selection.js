/**
 * TODO Selection utilities
 */

import Ember from 'ember'
const {isNone} = Ember

export default {
  /**
   * Basic selection acts conditionally based on the presence of additional selections.
   *
   * If no other selections are present the selection simply toggles the given item's selection state.
   *
   * If other selections are present the selection clears the other selections, but positively selects
   * the given item.
   *
   * @param {Object[]} selectedItems - currently selected items
   * @param {Object} item - selection event target
   * @param {Object} rangeState - tracking the anchor and endpoint
   * @param {Function} itemComparator - comparator for items
   */
  basic (selectedItems, item, rangeState, itemComparator) {
    // If a previous set of selections is present
    const index = selectedItems.findIndex(selectedItem => itemComparator(selectedItem, item))
    if (selectedItems.get('length') > 1 || index === -1) {
      // Clear the other selections and select the item
      selectedItems.setObjects([item])

      // Set the range anchor
      rangeState['anchor'] = item

      // New anchor, clear any previous endpoint
      rangeState['endpoint'] = null
    } else {
      // Toggle the item selection

      const isCurrentlySelected = (index >= 0)
      const isSelected = !isCurrentlySelected
      if (isSelected) {
        selectedItems.pushObject(item)
      } else {
        selectedItems.removeAt(index)
      }

      // Set the range anchor if selected, otherwise clear the anchor
      rangeState['anchor'] = isSelected ? item : null

      // New or no anchor, clear any previous endpoint
      rangeState['endpoint'] = null
    }
  },

  /**
   * Range selection requires an anchor and an endpoint; items between the
   * anchor and endpoint are added to the selected items (inclusive).
   * This means that a range selection event is either setting an anchor
   * or selecting items between the anchor and a new endpoint
   *
   * @param {Object[]} items - all items available
   * @param {Object[]} selectedItems - currently selected items
   * @param {Object} item - selection event target
   * @param {Object} rangeState - tracking the anchor and endpoint
   * @param {Function} itemComparator - comparator for items
   */
  /* eslint-disable complexity */
  range (items, selectedItems, item, rangeState, itemComparator) {
    // If an anchor isn't set, then set the anchor and exit
    const rangeAnchor = rangeState['anchor']
    if (isNone(rangeAnchor)) {
      // Range select is always a positive selection (no deselect)
      rangeState['anchor'] = item

      // New anchor, clear any previous endpoint
      rangeState['endpoint'] = null

      // Add the anchor to the selected items
      selectedItems.pushObject(item)

      return
    }

    // Find the indicies of the anchor and endpoint
    const anchor = items.findIndex(currentItem => itemComparator(currentItem, rangeState['anchor']))
    const endpoint = items.findIndex(currentItem => itemComparator(currentItem, item))

    // Select all of the items between the anchor and the item (inclusive)
    if (anchor < endpoint) {
      selectedItems.pushObjects(items.slice(anchor, endpoint + 1))
    } else {
      selectedItems.pushObjects(items.slice(endpoint, anchor + 1))
    }

    // If an endpoint was already selected remove selected items that were
    // in the previous range but aren't in the new range
    const previousEndpoint = items.findIndex(currentItem => itemComparator(currentItem, rangeState['endpoint']))
    if (previousEndpoint >= 0) {
      // If both endpoints are above the anchor
      if (anchor < endpoint && anchor < previousEndpoint) {
        // and the new range includes fewer items
        if (previousEndpoint > endpoint) {
          selectedItems.removeObjects(items.slice(endpoint + 1, previousEndpoint + 1))
        }
      // If both endpoints are below the anchor
      } else if (endpoint < anchor && previousEndpoint < anchor) {
        // and the new range includes fewer items
        if (previousEndpoint < endpoint) {
          selectedItems.removeObjects(items.slice(previousEndpoint, endpoint))
        }
      // Pivoted over the anchor, deselect all items in the previous range minus the anchor
      } else if (anchor > previousEndpoint) {
        selectedItems.removeObjects(items.slice(previousEndpoint, anchor))
      } else {
        selectedItems.removeObjects(items.slice(anchor + 1, previousEndpoint + 1))
      }
    }

    // Store the new endpoint
    rangeState['endpoint'] = item
  },
  /* eslint-enable complexity */

  /**
   * Specific selection toggles the current selection state for a given
   * item without impacting the selection state for any other items
   *
   * @param {Object[]} selectedItems - currently selected items
   * @param {Object} item - selection event target
   * @param {Object} rangeState - tracking the anchor and endpoint
   * @param {Function} itemComparator - comparator for items
   */
  specific (selectedItems, item, rangeState, itemComparator) {
    const index = selectedItems.findIndex(selectedItem => itemComparator(selectedItem, item))
    const isCurrentlySelected = (index >= 0)
    const isSelected = !isCurrentlySelected

    // Set the range anchor if selected, otherwise clear the anchor
    rangeState['anchor'] = isSelected ? item : null
    // New or no anchor, clear any previous endpoint
    rangeState['endpoint'] = null

    // Store the selection
    if (isSelected) {
      selectedItems.pushObject(item)
    } else {
      selectedItems.removeAt(index)
    }
  }
}
