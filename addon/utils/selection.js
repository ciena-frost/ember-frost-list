/**
 * TODO Selection utilities
 */

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
    const index = this._findIndex(selectedItems, item, itemComparator)
    if (selectedItems.get('length') > 1 || index === -1) {
      // Clear the other selections and select the item
      selectedItems.setObjects([item])

      // Set the range anchor
      rangeState['anchor'] = item

      // New anchor, clear any previous endpoint
      rangeState['endpoint'] = null
    } else {
      // Toggle the item selection
      const isCurrentlySelected = index >= 0
      const isSelected = !isCurrentlySelected
      if (isSelected) {
        selectedItems.addObject(item)
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
   * @param {String} itemKey - the unique key to remove duplicate items by
   */
  /* eslint-disable complexity */
  range (items, selectedItems, item, rangeState, itemComparator, itemKey) {
    // If an anchor isn't set or in the current list of items, then set the anchor and exit
    const rangeAnchor = rangeState['anchor']
    const anchor = this._findIndex(items, rangeAnchor, itemComparator)
    if (anchor === -1) {
      // Range select is always a positive selection (no deselect)
      rangeState['anchor'] = item

      // New anchor, clear any previous endpoint
      rangeState['endpoint'] = null

      // Add the anchor to the selected items
      selectedItems.addObject(item)

      return
    }
    // Find the indices of the endpoint
    const endpoint = this._findIndex(items, item, itemComparator)

    // Select all of the items between the anchor and the item (inclusive)
    if (anchor < endpoint) {
      selectedItems.addObjects(items.slice(anchor, endpoint + 1))
    } else {
      selectedItems.addObjects(items.slice(endpoint, anchor + 1))
    }

    // If an endpoint was already selected remove selected items that were
    // in the previous range but aren't in the new range
    const previousEndpoint = this._findIndex(items, rangeState['endpoint'], itemComparator)
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

    // If items in the list are compared using itemKey rather than by reference
    // then addObject(s) won't guarentee uniqueness, so do a uniqueness pass
    if (itemKey) {
      selectedItems.setObjects(selectedItems.uniqBy(itemKey))
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
    const index = this._findIndex(selectedItems, item, itemComparator)
    const isCurrentlySelected = (index >= 0)
    const isSelected = !isCurrentlySelected

    // Set the range anchor if selected, otherwise clear the anchor
    rangeState['anchor'] = isSelected ? item : null
    // New or no anchor, clear any previous endpoint
    rangeState['endpoint'] = null

    // Store the selection
    if (isSelected) {
      selectedItems.addObject(item)
    } else {
      selectedItems.removeAt(index)
    }
  },

  /**
   * Determines whether a method exists in this environment
   *
   * @param {Object} objectName Object to check for method on
   * @param {String} methodName Method to see if exists
   * @returns {Boolean} true if the method exists on the object
   */
  isSupportedInEnvironment (objectName, methodName) {
    return Boolean(objectName[methodName])
  },

  /**
   * Reproducing the `findIndex` behavior to avoid use cases where it's not defined.
   *
   * @param {Array} array the array of elements
   * @param {Object} rhs right hand side value to compare to the elements in the array
   * @param {Function} compareFct the compare function
   * @returns {Number} the index of the rhs value if it's in the array otherwise -1
   */
  /* eslint-disable complexity */
  _findIndex (array, rhs, compareFct) {
    if (this.isSupportedInEnvironment(array, 'findIndex')) {
      return array.findIndex(currentItem => compareFct(currentItem, rhs))
    } else {
      let findIndex = -1
      if (array && rhs && compareFct) {
        for (let index = 0; index !== array.length; index++) {
          const lhs = array.objectAt(index)
          if (compareFct(lhs, rhs)) {
            findIndex = index
            break
          }
        }
      }
      return findIndex
    }
  }
  /* eslint-enable complexity */
}
