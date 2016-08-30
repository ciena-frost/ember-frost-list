import Ember from 'ember'
const {Component, on, $} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import _ from 'lodash'
import FrostList from './frost-list-core'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Properties ============================================================
  classNames: ['frost-list-item'],
  classNameBindings: [
    'isSelected',
    'isExpanded'
  ],

  // == Computed Properties =====================================================
  @readOnly
  @computed('model.isSelected')
  isSelected (isSelected) {
    // TODO: Find a better solution for binding the className to the parent
    isSelected ? $(this.get('element')).parent().addClass('is-selected')
      : $(this.get('element')).parent().removeClass('is-selected')
    return isSelected
  },

  @readOnly
  @computed('model.isExpanded')
  isExpanded (isExpanded) {
    return isExpanded
  },

  // == Functions ==============================================================
  initContext: on('init', function () {
    this.set('_frostList', this.nearestOfType(FrostList))
  }),

  // == Event ==============================================================

  // FIXME: code is too complex (was overly complex before adding eslint rule)
  /* eslint-disable complexity */
  onclick: Ember.on('click', function (event) {
    if (!(Ember.ViewUtils.isSimpleClick(event) || event.shiftKey || event.metaKey || event.ctrlKey)) {
      return true
    }

    event.preventDefault()
    event.stopPropagation()

    if (_.isFunction(this.get('_frostList.selection.onSelect'))) {
      let isTargetSelectionIndicator = Ember.$(event.target).hasClass('frost-list-selection-indicator')
      if (event.shiftKey && this.get('_frostList.persistedClickState.isSelected') && !this.get('isSelected')) {
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
        this.get('_frostList.selection.onSelect')({
          records: [this.get('model')],
          selectDesc: {
            isSelected: !this.get('model.isSelected'),
            isTargetSelectionIndicator: isTargetSelectionIndicator,
            isShiftSelect: false,
            isCtrlSelect: (event.metaKey || event.ctrlKey) &&
            (!this.get('_frostList.persistedClickState.isSelected')) &&
            !this.get('isSelected')
          }
        })
      }
      this.set('_frostList.persistedClickState', {
        clickedRecord: this.get('model'),
        isSelected: !this.get('isSelected')
      })
    }
  })
  /* eslint-enable complexity */

  // == Actions ================================================================

})
