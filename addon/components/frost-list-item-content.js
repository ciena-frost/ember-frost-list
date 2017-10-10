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
    itemTypes: PropTypes.object,
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
  @computed('model', 'itemTypes', 'itemTypeKey')
  _itemTypeContent (model, itemTypes, itemTypeKey) {
    if (isPresent(model) && isPresent(itemTypes) && isPresent(itemTypeKey)) {
      const itemType = model.get(itemTypeKey)

      if (itemType in itemTypes) {
        return get(itemTypes, itemType)
      }
    }
  },

  @readOnly
  @computed('_itemTypeContent')
  typedItemComponent (itemTypeContent) {
    if (isPresent(itemTypeContent)) {
      return get(itemTypeContent, 'item')
    }
  },

  @readOnly
  @computed('_itemTypeContent')
  typedItemExpansionComponent (itemTypeContent) {
    if (isPresent(itemTypeContent)) {
      return get(itemTypeContent, 'itemExpansion')
    }
  },

  @readOnly
  @computed('typedItemComponent', 'typedItemExpansionComponent')
  isTypedItemWithExpansion (typedItemComponent, typedItemExpansionComponent) {
    return typedItemComponent && typedItemExpansionComponent
  },

  @readOnly
  @computed('typedItemComponent', 'typedItemExpansionComponent')
  isTypedItemWithoutExpansion (typedItemComponent, typedItemExpansionComponent) {
    return typedItemComponent && !typedItemExpansionComponent
  },

  @readOnly
  @computed('typedItemComponent', 'item')
  itemComponent (typedItemComponent, item) {
    if (typedItemComponent) {
      return typedItemComponent
    }

    return item
  },

  @readOnly
  @computed('isTypedItemWithExpansion', 'isTypedItemWithoutExpansion', 'typedItemExpansionComponent', 'itemExpansion')
  _itemExpansion (isTypedItemWithExpansion, isTypedItemWithoutExpansion, typedItemExpansionComponent, itemExpansion) {
    if (isTypedItemWithExpansion) {
      return typedItemExpansionComponent
    } else if (isTypedItemWithoutExpansion) {
      return undefined
    } else {
      return itemExpansion
    }
  }

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
})
