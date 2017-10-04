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
  typedItemComponent (model, itemTypes, itemTypeKey) {
    if (isPresent(model) && isPresent(itemTypes) && isPresent(itemTypeKey)) {
      const type = model.get(itemTypeKey)

      if (type in itemTypes) {
        const itemType = get(itemTypes, type)
        const item = get(itemType, 'item')

        return item
      }
    }
  },

  @readOnly
  @computed('model', 'itemTypes', 'itemTypeKey')
  typedItemExpansionComponent (model, itemTypes, itemTypeKey) {
    if (isPresent(model) && isPresent(itemTypes) && isPresent(itemTypeKey)) {
      const type = model.get(itemTypeKey)

      if (type in itemTypes) {
        const itemType = get(itemTypes, type)
        const itemExpansion = get(itemType, 'itemExpansion')

        return itemExpansion
      }
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
  }

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
})
