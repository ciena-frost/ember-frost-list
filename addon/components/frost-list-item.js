/**
 * TODO
 */

import Ember from 'ember'
const {ViewUtils} = Ember
const {isSimpleClick} = ViewUtils
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Properties ============================================================

  classNames: ['frost-list-item'],

  propTypes: {
    // Options
    model: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]).isRequired,
    isExpanded: PropTypes.bool,
    isSelected: PropTypes.bool,

    onSelect: PropTypes.func
  },

  getDefaultProps () {
    return {
    }
  },

  // == Computed properties ==================================================

  // == Functions =============================================================

  // == Ember Lifecycle Hooks =================================================

  // == DOM Events ============================================================

  click (event) {
    // Acceptable event modifiers
    const isSpecificSelect = (new window.UAParser()).getOS() === 'Mac OS' ? event.ctrlKey : event.metaKey // TODO Move instance to a service
    const isRangeSelect = event.shiftKey

    // Only process simple clicks or clicks with the acceptable modifiers
    if (isSimpleClick(event) || isSpecificSelect || isRangeSelect) {
      event.preventDefault()
      event.stopPropagation()

      this.onSelect({
        isRangeSelect,
        isSpecificSelect,
        item: this.get('model')
      })
    }
  }

  // == Actions ===============================================================

})
