/* global $ */
import Ember from 'ember'
const {Component} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
import _ from 'lodash'
import FrostList from './frost-list'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Properties ============================================================
  classNameBindings: [
    'isSelected',
    'frost-list-item',
    'showDetail:is-expanded:is-collapsed'
],

  propTypes: {
    showDetail: PropTypes.bool
  },

  // == Computed Properties =====================================================
  @readOnly
  @computed('model.isSelected')
  isSelected (isSelected) {
    // TODO: Find a better solution for binding the className to the parent
    isSelected ? $(this.get('element')).parent().addClass('is-selected')
      : $(this.get('element')).parent().removeClass('is-selected')
    return isSelected
  },

  // == Functions ==============================================================
  init () {
    this._super(...arguments)
    this.set('_frostList', this.nearestOfType(FrostList))
  },

  getDefaultProps () {
    return {
      showDetail: false
    }
  },

  // == Events ================================================================
  //isSelected: Ember.computed('model.isSelected', function () {
  //  // TODO: Find a better solution for binding the className to the parent
  //  let modelIsSelect = this.get('model.isSelected')
  //  modelIsSelect ? $(this.get('element')).parent().addClass('is-selected')
  //  : $(this.get('element')).parent().removeClass('is-selected')
  //  return modelIsSelect
  //}),

  onclick: Ember.on('click', function (event) {
    if (!(Ember.ViewUtils.isSimpleClick(event) || event.shiftKey || event.metaKey || event.ctrlKey)) {
      return true
    }

    event.preventDefault()
    event.stopPropagation()

    if (_.isFunction(this.get('_frostList.onSelect'))) {
      let isTargetSelectionIndicator = Ember.$(event.target).hasClass('frost-list-selection-indicator')
      if (event.shiftKey && (!this.get('_frostList.persistedClickState.isSelected')) && !this.get('isSelected')) {
        this.get('_frostList.onShiftSelect').call(this.get('_frostList'), {
          secondClickedRecord: this.get('model'),
          isTargetSelectionIndicator: isTargetSelectionIndicator
        })
        if (window.getSelection) {
          window.getSelection().removeAllRanges()
        } else if (document.selection) {  // IE
          document.selection.empty()
        }
      } else {
        this.get('_frostList.onSelect')({
          record: this.get('model'),
          isSelected: !this.get('model.isSelected'),
          isTargetSelectionIndicator: isTargetSelectionIndicator,
          isShiftSelect: false,
          isCtrlSelect: (event.metaKey || event.ctrlKey) &&
            (!this.get('_frostList.persistedClickState.isSelected')) &&
            !this.get('isSelected')
        })
      }
      this.set('_frostList.persistedClickState', {clickedRecord: this.get('model'), isSelected: this.get('isSelected')})
    }
  })

  // == Actions ================================================================

})
