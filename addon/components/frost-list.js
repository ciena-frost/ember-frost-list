import Ember from 'ember'
const {Component, on} = Ember
import computed from 'ember-computed-decorators'
import layout from '../templates/frost-list'
import {PropTypes} from 'ember-prop-types'
import SlotsMixin from 'ember-block-slots'

const FrostList = Component.extend(SlotsMixin, {

  // == Dependencies ==========================================================

  // == Properties ============================================================
  classNames: ['frost-list'],
  layout: layout,

  propTypes: {
    alwaysUseDefaultHeight: PropTypes.bool,
    defaultHeight: PropTypes.number,
    hook: PropTypes.string,
    scrollPosition: PropTypes.number,
    size: PropTypes.string
  },

  // == Computed Properties =====================================================

  // Normalize Ember recordArray to JS array if necessary
  @computed('items.[]')
  _records (records) {
    if (Ember.isEmpty(records)) {
      return []
    }
    return records.map(function (record) {
      return record
    })
  },

  // == Functions ==============================================================
  getDefaultProps () {
    return {
      //  Optional attrs for smoke-and-mirror vertical-collection
      //  https://github.com/runspired/smoke-and-mirrors/blob/develop/addon/components/vertical-collection.js
      alwaysUseDefaultHeight: false,
      defaultHeight: 45,
      idForFirstItem: null,
      key: '@identity',
      scrollPosition: 0
    }
  },

  checkExpansionValidity (expansion) {
    return typeof expansion.onCollapseAll === 'function' && typeof expansion.onCollapseAll === 'function' &&
      typeof expansion.onExpandAll === 'function' && typeof expansion.onExpandAll === 'function'
  },

  checkSelectionValidity (selection) {
    return typeof selection.onSelect === 'function'
  },

  checkSortingValidity (sorting) {
    return Array.isArray(sorting.activeSorting) &&
           Array.isArray(sorting.sortableProperties) &&
           typeof sorting.onSort === 'function'
  },

  /**
   Iterates over elements of collection and returning all elements
   which are presented between two boundary objects in array.

   This function will loop through the array, when either boundary object
   is hit, it will start pushing item to resultArray until second boundary
   object is hit.

   @function _findElementsInBetween
   @param {Array} array collection to iterate
   @param {Object} firstElement boundary item
   @param {Object} lastElement boundary item
   @returns {Array} resultArray
   */
  _findElementsInBetween (array, firstElement, lastElement) {
    let loopKey = 0
    let resultArray = []
    if (firstElement && lastElement) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === firstElement.id || array[i].id === lastElement.id) {
          resultArray.pushObject(array[i])
          loopKey = loopKey + 1
        } else {
          if (loopKey === 1) resultArray.pushObject(array[i])
          else if (loopKey === 2) break
        }
      }
      return resultArray
    } else {
      return [lastElement]
    }
  },

  onShiftSelect (attrs) {
    let records = this.get('_records')
    let firstElement = this.get('persistedClickState.clickedRecord')
    let secondElement = attrs.secondClickedRecord
    this.get('selection.onSelect').call(this.get('selection.onSelect.context'), {
      records: this._findElementsInBetween(records, firstElement, secondElement),
      selectDesc: {
        isSelected: true,
        isShiftSelect: true,
        isTargetSelectionIndicator: attrs.isTargetSelectionIndicator
      }
    })
  },

  // == Events ================================================================

  initContext: on('init', function () {
    const sorting = this.sorting
    const expansion = this.expansion
    const selection = this.selection
    if (expansion && typeof expansion === 'object') {
      Ember.assert('expansion hash is invalid', this.checkExpansionValidity(expansion))
    }
    if (selection && typeof selection === 'object') {
      Ember.assert('selection hash is invalid', this.checkSelectionValidity(selection))
    }
    if (sorting && typeof sorting === 'object') {
      Ember.assert('sorting hash is invalid', this.checkSortingValidity(sorting))
    }
  })
  // == Actions ===============================================================

})

FrostList.reopenClass({
  positionalParams: [
    'recordComponent'
  ]
})

export default FrostList
