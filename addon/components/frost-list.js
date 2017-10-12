/**
 * TODO Component definition for the frost-list component
 */

import Ember from 'ember'
const {$, A, Logger, ObjectProxy, get, getWithDefault, isEmpty, isNone, isPresent, run} = Ember
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
    itemKey: PropTypes.string,
    itemTypeKey: PropTypes.string,
    componentKeyNames: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),
    componentKeyNamesForTypes: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),
    itemDefinitions: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),
    itemExpansionDefinitions: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),

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

    // Private
    _itemComparator: PropTypes.func,

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
      itemTypeKey: 'itemType',
      componentKeyNames: {
        item: 'itemName',
        itemExpansion: 'itemExpansionName',
        controls: 'controlNames'
      },

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
  @computed('expandedItems.[]', 'items.[]', 'selectedItems.[]', '_itemComparator')
  _items (expandedItems, items, selectedItems, _itemComparator) {
    if (isEmpty(items)) {
      return []
    }

    return items.map(item => {
      return ObjectProxy.create({
        content: item,
        states: {
          isExpanded: isEmpty(expandedItems) ? false : expandedItems.some(
            expandedItem => _itemComparator(expandedItem, item)),
          isSelected: isEmpty(selectedItems) ? false : selectedItems.some(
            selectedItem => _itemComparator(selectedItem, item))
        }
      })
    })
  },

  @readOnly
  @computed('componentKeyNamesForTypes')
  isAnyTypedItemExpansion (componentKeyNamesForTypes) {
    const componentKeyNames = this.get('componentKeyNames')
    const itemExpansionKeyName = get(componentKeyNames, 'itemExpansion')

    for (var itemType in componentKeyNamesForTypes) {
      const itemTypeContent = get(componentKeyNamesForTypes, itemType)
      const itemExpansion = get(itemTypeContent, itemExpansionKeyName)

      if (isPresent(itemExpansion)) {
        return true
      }
    }

    return false
  },

  @readOnly
  @computed('itemExpansion', 'isAnyTypedItemExpansion')
  isExpandAllVisible (itemExpansion, isAnyTypedItemExpansion) {
    return isPresent(itemExpansion) || isAnyTypedItemExpansion
  },

  @readOnly
  @computed('pagination', 'isExpandAllVisible')
  isHeaderDividerVisible (pagination, isExpandAllVisible) {
    return pagination && isExpandAllVisible
  },

  // == Functions =============================================================

  setShift (event) {
    run.next(() => {
      if (this.isDestroyed || this.isDestroying) {
        return
      }
      this.set('_isShiftDown', event.shiftKey)
    })
  },

  selectedTypesWithControls (selectedItems) {
    const componentKeyNamesForTypes = this.get('componentKeyNamesForTypes')
    const itemTypeKey = this.get('itemTypeKey')
    const componentKeyNames = this.get('componentKeyNames')

    if (isPresent(componentKeyNamesForTypes) && isPresent(itemTypeKey)) {
      return selectedItems.reduce((typesWithControls, item) => {
        const itemType = get(item, itemTypeKey)
        const itemTypeContent = getWithDefault(componentKeyNamesForTypes, itemType, {})
        const itemTypeContentControls = getWithDefault(itemTypeContent, get(componentKeyNames, 'controls'), [])
        typesWithControls[itemType] = itemTypeContentControls
        return typesWithControls
      }, {})
    }
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  didUpdateAttrs () {
    const scrollTop = this.get('scrollTop')

    if (scrollTop) {
      // TODO Push this down into frost-scroll
      const scrollbar = this.$('.frost-scroll')[0]
      if (scrollbar) {
        scrollbar.scrollTop = scrollTop
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

    const itemTypeKey = this.get('itemTypeKey')
    if (!itemKey && itemTypeKey) {
      Logger.warn('If itemTypeKey is defined, then itemKey needs to be defined as well')
    }

    const componentKeyNamesForTypes = this.get('componentKeyNamesForTypes')
    const componentKeyNames = this.get('componentKeyNames')
    const itemComponentKey = get(componentKeyNames, 'item')
    const itemExpansionComponentKey = get(componentKeyNames, 'itemExpansion')
    const item = this.get('item')
    if (!componentKeyNamesForTypes && item) {
      const componentName = get(item, 'name')
      this.set('componentKeyNamesForTypes', {
        default: {
          [itemComponentKey]: componentName
        }
      })
      this.set('itemDefinitions', {
        [componentName]: item
      })
    }

    const itemExpansion = this.get('itemExpansion')
    if (!componentKeyNamesForTypes && itemExpansion) {
      const componentName = get(itemExpansion, 'name')
      this.set('componentKeyNamesForTypes', {
        default: {
          [itemComponentKey]: get(item, 'name'),
          [itemExpansionComponentKey]: componentName
        }
      })
      this.set('itemExpansionDefinitions', {
        [componentName]: itemExpansion
      })
    }

    this._keyHandler = this.setShift.bind(this)
    $(document).on(`keyup.${this.elementId} keydown.${this.elementId}`, this._keyHandler)
  },

  willDestroy () {
    $(document).off(`keyup.${this.elementId} keydown.${this.elementId}`, this._keyHandler)
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
      const clonedItems = A(this.get('items').slice())
      this.onExpansionChange(clonedItems)
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

      this.onSelectionChange(clonedSelectedItems, this.selectedTypesWithControls(clonedSelectedItems))
    }
  }
})
