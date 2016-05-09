import Ember from 'ember'
import _ from 'lodash/lodash'
import FrostList from '../frost-list/component'

export default Ember.Component.extend({
  classNameBindings: ['isSelected', 'frost-list-item'],

  initContext: Ember.on('didInitAttrs', function () {
    this.set('_frostList', this.nearestOfType(FrostList))
  }),

  isSelected: Ember.computed.reads('model.isSelected'),

  onclick: Ember.on('click', function (event) {
    if (!Ember.ViewUtils.isSimpleClick(event)) {
      return true
    }

    event.preventDefault()
    event.stopPropagation()

    if (_.isFunction(this.get('_frostList.onSelect'))) {
        this.get('_frostList.onSelect')({
          record: this.get('model'),
          isSelected: !this.get('model.isSelected'),
          checkboxIsClick: this.get('checkboxIsClick')
        })
    }
    this.set('checkboxIsClick', false);
  }),

  checkboxIsClick: false,
  actions: {
    checkboxIsClick() {
      this.set('checkboxIsClick',true)
    }
  }
})
