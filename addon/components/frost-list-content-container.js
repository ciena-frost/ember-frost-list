/**
 * TODO
 */

import Ember from 'ember'
const {isNone} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'

import layout from '../templates/components/frost-list-content-container'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['paged'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
  },

  getDefaultProps () {
    return {
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('pagination')
  paged (pagination) {
    return !isNone(pagination)
  }

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})
