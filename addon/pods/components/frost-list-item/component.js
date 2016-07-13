import Ember from 'ember'
import _ from 'lodash/lodash'
import FrostList from '../frost-list/component'

export default Ember.Component.extend({
  classNameBindings: ['isSelected', 'frost-list-item'],

  initContext: Ember.on('init', function () {
    this.set('_frostList', this.nearestOfType(FrostList))
  }),

  isSelected: Ember.computed.reads('model.isSelected'),
  isSelectedChanged: Ember.observer('model.isSelected', function () {
    this.get('isSelected') ? this.$().parent().addClass('is-selected') : this.$().parent().removeClass('is-selected')
  }),
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
          isCtrlSelect: (event.metaKey || event.ctrlKey) && (!this.get('_frostList.persistedClickState.isSelected')) && !this.get('isSelected')
        })
      }
      this.set('_frostList.persistedClickState', {clickedRecord: this.get('model'), isSelected: this.get('isSelected')})
    }
  })
})
