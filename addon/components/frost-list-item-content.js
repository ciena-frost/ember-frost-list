import Ember from 'ember'
const {get, isPresent} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-list-item-content'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Options - required
    model: PropTypes.EmberObject.isRequired,
    index: PropTypes.number.isRequired,
    onExpand: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,

    // Options - general
    onSelectionChange: PropTypes.func,
    typedItemComponents: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),
    itemTypeKey: PropTypes.string,
    isAnyTypedItemExpansion: PropTypes.bool,

    // Options - sub-components
    item: PropTypes.EmberComponent.isRequired,
    itemExpansion: PropTypes.EmberComponent
  },

  getDefaultProps () {
    return {
      isAnyTypedItemExpansion: false
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('model', 'typedItemComponents', 'itemTypeKey')
  _itemTypeContent (model, typedItemComponents, itemTypeKey) {
    if (isPresent(model) && isPresent(typedItemComponents) && isPresent(itemTypeKey)) {
      const itemType = model.get(itemTypeKey)

      if (itemType in typedItemComponents) {
        return get(typedItemComponents, itemType)
      }
    }
  },

  @readOnly
  @computed('_itemTypeContent')
  _typedItem (itemTypeContent) {
    if (isPresent(itemTypeContent)) {
      return get(itemTypeContent, 'item')
    }
  },

  @readOnly
  @computed('_itemTypeContent')
  _typedItemExpansion (itemTypeContent) {
    if (isPresent(itemTypeContent)) {
      return get(itemTypeContent, 'itemExpansion')
    }
  },

  @readOnly
  @computed('_typedItem', 'item')
  _item (typedItem, item) {
    if (typedItem) {
      return typedItem
    }

    return item
  },

  @readOnly
  @computed('_typedItem', '_typedItemExpansion', 'itemExpansion')
  _itemExpansion (typedItem, typedItemExpansion, itemExpansion) {
    if (this._isTypedItemWithExpansion(typedItem, typedItemExpansion)) {
      return typedItemExpansion
    } else if (this._isTypedItemWithoutExpansion(typedItem, typedItemExpansion)) {
      return undefined
    } else {
      return itemExpansion
    }
  },

  @readOnly
  @computed('_itemExpansion', '_typedItem', '_typedItemExpansion')
  _isItemExpansionVisible (itemExpansion, typedItem, typedItemExpansion) {
    return (isPresent(itemExpansion) || this._isTypedItemWithExpansion(typedItem, typedItemExpansion)) &&
      !this._isTypedItemWithoutExpansion(typedItem, typedItemExpansion)
  },

  // == Functions =============================================================

  _isTypedItemWithExpansion (typedItem, typedItemExpansion) {
    return typedItem && typedItemExpansion
  },

  _isTypedItemWithoutExpansion (typedItem, typedItemExpansion) {
    return typedItem && !typedItemExpansion
  }

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
})
