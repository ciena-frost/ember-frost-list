/**
 * TODO Component definition for the frost-list component
 */

import Ember from 'ember'
const {
  $,
  A,
  get,
  isEmpty,
  isNone,
  run,
  set,
  computed: {
    deprecatingAlias
  }
} = Ember
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
    minHeight: PropTypes.number,
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
    itemKey: PropTypes.string,

    // Options - sub-components
    pagination: PropTypes.EmberComponent,
    sorting: PropTypes.EmberComponent,

    // Options - infinite scroll
    onLoadNext: PropTypes.func,
    onLoadPrevious: PropTypes.func,
    // Smoke and mirrors
    alwaysUseDefaultHeight: PropTypes.bool,
    bufferSize: PropTypes.number,
    alwaysRemeasure: PropTypes.bool,
    // Private
    _itemComparator: PropTypes.func,
    debug: PropTypes.bool,

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

      // Smoke and mirrors options
      alwaysUseDefaultHeight: false,
      alwaysRemeasure: true,
      bufferSize: 1,
      // State
      _rangeState: {
        anchor: null,
        endpoint: null
      },
      minHeight: 50,
      debug: false
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('expandedItems.[]', 'items.[]', 'selectedItems.[]', '_itemComparator')
  _items (expandedItems, items, selectedItems, _itemComparator) {
    if (isEmpty(items)) {
      return []
    }

    return items.map(item => {
      run.next(() => {
        set(item, 'isExpanded', isEmpty(expandedItems) ? false : expandedItems.some(
          selectedItem => _itemComparator(selectedItem, item))
        )
        set(item, 'isSelected', isEmpty(selectedItems) ? false : selectedItems.some(
          selectedItem => _itemComparator(selectedItem, item))
        )
      })
      return item
    })
  },

  defaultHeight: deprecatingAlias('minHeight', {
    id: 'frost-list.deprecate-defaultHeight',
    until: '7.0.0'
  }),
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
    const itemKey = this.get('itemKey')
    if (itemKey) {
      this.set('_itemComparator', function (lhs, rhs) {
        return isNone(lhs) || isNone(rhs) ? false : get(lhs, itemKey) === get(rhs, itemKey)
      })
    } else {
      this.set('_itemComparator', function (lhs, rhs) {
        return lhs === rhs
      })
    }

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
      const _itemComparator = this.get('_itemComparator')
      const index = clonedExpandedItems.findIndex(expandedItem => _itemComparator(expandedItem, item))
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
      const itemKey = this.get('itemKey')
      const _itemComparator = this.get('_itemComparator')
      const clonedSelectedItems = A(this.get('selectedItems').slice())
      const _rangeState = this.get('_rangeState')

      // Selects are proccessed in order of precedence: specific, range, basic
      if (isSpecificSelect) {
        selection.specific(clonedSelectedItems, item, _rangeState, _itemComparator)
      } else if (isRangeSelect) {
        selection.range(items, clonedSelectedItems, item, _rangeState, _itemComparator, itemKey)
      } else {
        selection.basic(clonedSelectedItems, item, _rangeState, _itemComparator)
      }
      this.onSelectionChange(clonedSelectedItems)
    }
  }
})
