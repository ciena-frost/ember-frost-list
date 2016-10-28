import Ember from 'ember'
const {
  Component,
  get,
  set,
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
    isSelected ? $(get(this, 'element')).parent().addClass('is-selected')
      : $(get(this, 'element')).parent().removeClass('is-selected')
    return isSelected
  },

  @readOnly
  @computed('model.isExpanded')
  isExpanded (isExpanded) {
    return isExpanded
  },

  // == Functions ==============================================================
  initContext: on('init', function () {
    set(this, '_frostList', this.nearestOfType(FrostList))
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

    const onSelect = get(this, 'onSelect')

    if (onSelect && typeof onSelect === 'function') {
      const isTargetSelectionIndicator = Ember.$(event.target).hasClass('frost-list-selection-indicator')

      onSelect(event, {
        record: get(this, 'model'),
        selectDesc: {
          isSelected: !get(this, 'model.isSelected'),
          isTargetSelectionIndicator: isTargetSelectionIndicator
        }
      })
    }
  })
  /* eslint-enable complexity */

  // == Actions ================================================================

})
