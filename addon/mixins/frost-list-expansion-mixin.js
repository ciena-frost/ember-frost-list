import Ember from 'ember'
const {
  Mixin,
  get,
  on,
  set
} = Ember
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

export default Mixin.create(FrostListCoreMixin, {
  // == Event =================================================================
  initListExpansionMixin: on('init', function () {
    set(this, 'expandedItems', Ember.Object.create())
  }),

  // == Actions ================================================================
  actions: {
    collapseItems () {
      let records = get(this, '_listItems')
      let expandedItems = get(this, 'expandedItems')
      records.map((record) => {
        delete expandedItems[record.id]
      })
      this.notifyPropertyChange('expandedItems')
    },

    expandItems () {
      let records = get(this, '_listItems')
      let expandedItems = get(this, 'expandedItems')
      records.map((record) => {
        expandedItems.set(record.id, true)
      })
      this.notifyPropertyChange('expandedItems')
    },

    collapseItem () {

    },

    expandItem () {

    }
  }
})
