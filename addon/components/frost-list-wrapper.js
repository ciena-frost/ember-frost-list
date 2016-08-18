import Ember from 'ember'
const {Component, on} = Ember
import computed from 'ember-computed-decorators'
import layout from '../templates/frost-list-wrapper'
import {PropTypes} from 'ember-prop-types'
import SlotsMixin from 'ember-block-slots'

const FrostListWrapper =  Component.extend({
  layout,

  initContext: Ember.on('init', function () {
    const params = this.params

    if (params && (this.selection || this.expansion || this.sorting)) {
      Ember.assert('invalid error', false)
    }

    if (params) {
      const keys = Object.keys(params)
      keys.forEach((key) => {
        Ember.defineProperty(this, key, undefined, params[key])
      })
    }
  })
})

FrostListWrapper.reopenClass({
  positionalParams: [
    'recordComponent'
  ]
})

export default FrostListWrapper


