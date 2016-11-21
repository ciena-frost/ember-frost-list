import Ember from 'ember'
const {
  Component,
  on,
  $
} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
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

    const onSelect = this.get('onSelect')

    if (onSelect && typeof onSelect === 'function') {
      const isTargetSelectionIndicator = Ember.$(event.target).hasClass('frost-list-selection-indicator')

      onSelect(event, {
        record: this.get('model'),
        selectDesc: {
          isSelected: !this.get('model.isSelected'),
          isTargetSelectionIndicator: isTargetSelectionIndicator
        }
      })
    }
  })
  /* eslint-enable complexity */

  // == Actions ================================================================

})
