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
    onSelectionChange: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,

    // Options - sub-components
    item: PropTypes.EmberComponent.isRequired,
    itemExpansion: PropTypes.EmberComponent
  }

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
})
