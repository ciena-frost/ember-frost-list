/**
 * TODO Component definition for the frost-list component
 */

import Ember from 'ember'
const {$, A, isEmpty, run, set} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {selection} from 'ember-frost-list'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-list'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['_isShiftDown:shift-down'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Options - required
    item: PropTypes.EmberComponent.isRequired,
    items: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ])).isRequired,

    // Options - general
    expandedItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ])),
    itemExpansion: PropTypes.EmberComponent,
    scrollTop: PropTypes.number,
    selectedItems: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ])),
    onSelectionChange: PropTypes.func,
    itemComparator: PropTypes.func,

    // Options - sub-components
    pagination: PropTypes.EmberComponent,
    sorting: PropTypes.EmberComponent,

    // Options - infinite scroll
    onLoadNext: PropTypes.func,
    onLoadPrevious: PropTypes.func,
    // Smoke and mirrors
    alwaysUseDefaultHeight: PropTypes.bool,
    bufferSize: PropTypes.number,
    defaultHeight: PropTypes.number,

    // State
    _isShiftDown: PropTypes.bool,

    _rangeState: PropTypes.shape({
      anchor: PropTypes.oneOfType([
        PropTypes.EmberObject,
        PropTypes.object
      ]),
      endpoint: PropTypes.oneOfType([
        PropTypes.EmberObject,
        PropTypes.object
      ])
    })
  },

  getDefaultProps () {
    return {
      // Options - general
      scrollTop: 0,
      itemComparator: (rhs, lhs) => { return rhs === lhs },

      // Smoke and mirrors options
      alwaysUseDefaultHeight: false,
      bufferSize: 10,
      defaultHeight: 50,

      // State
      _rangeState: {
        anchor: null,
        endpoint: null
      }
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('expandedItems.[]', 'items.[]', 'selectedItems.[]', 'itemComparator')
  _items (expandedItems, items, selectedItems, itemComparator) {
    if (isEmpty(items)) {
      return []
    }
    return items.map(item => {
      run.next(() => {
        set(item, 'isExpanded', isEmpty(expandedItems) ? false : expandedItems.some(
          selectedItem => itemComparator(selectedItem, item))
        )
        set(item, 'isSelected', isEmpty(selectedItems) ? false : selectedItems.some(
          selectedItem => itemComparator(selectedItem, item))
        )
      })
      return item
    })
  },

  // == Functions =============================================================

  setShift (event) {
    if (!this.isDestroyed) {
      this.set('_isShiftDown', event.shiftKey)
    }
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  didUpdateAttrs ({newAttrs}) {
    if (newAttrs.scrollTop) {
      // TODO Push this down into frost-scroll
      const scrollbar = this.$('.frost-scroll')[0]
      if (scrollbar) {
        scrollbar.scrollTop = newAttrs.scrollTop
        window.Ps.update(scrollbar)
      }
    }
  },

  init () {
    this._super(...arguments)

    $(document).on(`keyup.${this.elementId} keydown.${this.elementId}`, this.setShift.bind(this))
  },

  willDestroy () {
    $(document).off(`keyup.${this.elementId} keydown.${this.elementId}`, this.setShift.bind(this))
  },

  // == Actions ===============================================================

  actions: {
    _collapseAll () {
      this.onExpansionChange([])
    },

    _expand (item) {
      const clonedExpandedItems = A(this.get('expandedItems').slice())
      const itemComparator = this.get('itemComparator')
      const index = clonedExpandedItems.findIndex(expandedItem => itemComparator(expandedItem, item))
      if (index >= 0) {
        clonedExpandedItems.removeAt(index)
      } else {
        clonedExpandedItems.pushObject(item)
      }
      this.onExpansionChange(clonedExpandedItems)
    },

    _expandAll () {
      this.onExpansionChange(this.get('items'))
    },

    _select ({isRangeSelect, isSpecificSelect, item}) {
      const items = this.get('items')
      const itemComparator = this.get('itemComparator')
      const clonedSelectedItems = A(this.get('selectedItems').slice())
      const _rangeState = this.get('_rangeState')

      // Selects are proccessed in order of precedence: specific, range, basic
      if (isSpecificSelect) {
        selection.specific(clonedSelectedItems, item, _rangeState, itemComparator)
      } else if (isRangeSelect) {
        selection.range(items, clonedSelectedItems, item, _rangeState, itemComparator)
      } else {
        selection.basic(clonedSelectedItems, item, _rangeState, itemComparator)
      }
      this.onSelectionChange(clonedSelectedItems)
    }
  }
})
