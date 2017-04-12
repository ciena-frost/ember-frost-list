/**
 * The selection control for frost list items - indicates state and captures clicks
 */

import Ember from 'ember'
const {ViewUtils} = Ember
const {isSimpleClick} = ViewUtils
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-list-item-selection'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['isSelected'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Options
    model: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),
    isSelected: PropTypes.bool,

    onSelect: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  click (event) {
    // Acceptable event modifiers
    // When the checkbox is the target a simple click is equivalent to a specific select
    const isSpecificSelect = isSimpleClick(event) ||
      ((new window.UAParser()).getOS() === 'Mac OS' ? event.ctrlKey : event.metaKey) // TODO Move instance to a service
    const isRangeSelect = event.shiftKey

    // Only process simple clicks or clicks with the acceptable modifiers
    if (isSpecificSelect || isRangeSelect) {
      event.preventDefault()
      event.stopPropagation()

      this.onSelect({
        isRangeSelect,
        isSpecificSelect,
        item: this.get('model')
      })
    }
  }

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})
