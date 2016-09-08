import Ember from 'ember'
const {
  Component,
  on
} = Ember
import computed from 'ember-computed-decorators'
import layout from '../templates/frost-list-core'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'


const FrostList = Component.extend(PropTypeMixin, {

  // == Dependencies ==========================================================

  // == Properties ============================================================
  classNames: ['frost-list', 'frost-list-core'],
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

  @computed('sorting', 'expansion')
  _hasHeader (sorting, expansion) {
    return !!(sorting || expansion)
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

  // TODO Add validation check for collapseItem/expandItem when feature landed
  checkExpansionValidity (expansion) {
    return typeof expansion.onCollapseAll === 'function' &&
      typeof expansion.onExpandAll === 'function'
  },

  checkSelectionValidity (selection) {
    return typeof selection.onSelect === 'function'
  },

  checkSortingValidity (sorting) {
    return Array.isArray(sorting.activeSorting) &&
           Array.isArray(sorting.properties) &&
           typeof sorting.onSort === 'function'
  },

  // FIXME: code is too complex (was overly complex before adding eslint rule)
  /* eslint-disable complexity */
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
  /* eslint-enabled complexity */

  onShiftSelect (attrs) {
    let records = this.get('_records')
    let firstElement = this.get('persistedClickState.clickedRecord')
    let secondElement = attrs.secondClickedRecord
    this.get('onSelect')({
      records: this._findElementsInBetween(records, firstElement, secondElement),
      selectDesc: {
        isSelected: true,
        isShiftSelect: true,
        isTargetSelectionIndicator: attrs.isTargetSelectionIndicator
      }
    })
  },

  buildRangeSelectedItemsArray (records, firstElement, secondElement) {
    return this._findElementsInBetween(records, firstElement, secondElement)
  },

  // == Events ================================================================

  initContext: on('init', function () {
    //const sorting = this.sorting
    //const expansion = this.expansion
    //const selection = this.selection
    //if (expansion && typeof expansion === 'object') {
    //  Ember.assert('expansion hash is invalid', this.checkExpansionValidity(expansion))
    //}
    //if (selection && typeof selection === 'object') {
    //  Ember.assert('selection hash is invalid', this.checkSelectionValidity(selection))
    //}
    //if (sorting && typeof sorting === 'object') {
    //  Ember.assert('sorting hash is invalid', this.checkSortingValidity(sorting))
    //}
  }),
  // == Actions ===============================================================

  actions: {
    selectItem(event, attrs) {
      const onSelect = this.get('onSelect')

      if (onSelect && typeof onSelect === 'function') {
        let selectedItems = []
        let selectDesc = attrs.selectDesc

        if (event.shiftKey && this.get('persistedClickState.isSelected') && attrs.selectDesc.isSelected) {
          selectedItems = this.buildRangeSelectedItemsArray(this.get('_records'), this.get('persistedClickState.clickedRecord'), attrs.record)
          selectDesc.isShiftSelect = true
        } else {
          selectedItems = [attrs.record]
          selectDesc.isShiftSelect = false
        }

        onSelect({
          records: selectedItems,
          selectDesc: selectDesc
        })
      }

      this.set('persistedClickState', {
        clickedRecord: attrs.record,
        isSelected: attrs.selectDesc.isSelected
      })
    }
  }
})

export default FrostList
