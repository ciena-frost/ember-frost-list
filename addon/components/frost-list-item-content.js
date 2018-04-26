import layout from '../templates/components/frost-list-item-content'
import expansionTypeEnum from '../utils/expansion-types'
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

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
    isAnyItemExpansion: PropTypes.bool,

    // Options - sub-components
    item: PropTypes.EmberComponent.isRequired,
    itemExpansion: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.EmberComponent
    ]),
    expansionType: PropTypes.string,
    singleSelection: PropTypes.bool
  },

  getDefaultProps () {
    return {
      isAnyItemExpansion: false
    }
  },

  // == Computed Properties ===================================================
  @readOnly
  @computed('itemExpansion', 'expansionType')
  isExpansionIconVisible (itemExpansion, expansionType) {
    return itemExpansion && expansionType !== expansionTypeEnum.ALWAYS
  }

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
})
