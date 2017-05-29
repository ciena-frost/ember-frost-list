/**
 * TODO
 */

import Ember from 'ember'
const {isNone} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'
import {animate} from 'liquid-fire'

import layout from '../templates/components/frost-list-content-container'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['paged'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    itemKey: PropTypes.string
  },

  getDefaultProps () {
    return {
      itemKey: null
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('itemKey')
  _eachItemKey (itemKey) {
    return itemKey || '@index'
  },

  @readOnly
  @computed('itemKey')
  _verticalCollectionItemKey (itemKey) {
    return itemKey || '@identity'
  },

  @readOnly
  @computed('pagination')
  paged (pagination) {
    return !isNone(pagination)
  },

  // == Functions =============================================================

  _transition () {
    this.transition(
      this.use(function (opts = {duration: 300}) {
        if (this.oldElement) {
          this.oldElement.css('opacity', 1)
        }
        if (this.newElement) {
          this.newElement.css('opacity', 0)
        }

        return animate(this.oldElement, {opacity: 0}, opts).then(() => {
          return animate(this.newElement, {opacity: 1}, opts)
        })
      })
    )
  }

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

})
