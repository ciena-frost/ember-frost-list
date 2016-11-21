import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

export default Mixin.create(FrostListCoreMixin, {
  // == Event =================================================================
  initListExpansionMixin: on('init', function () {
    this.set('expandedItems', Ember.Object.create())
  }),

  // == Actions ================================================================
  actions: {
    collapseItems () {
      let records = this.get('_listItems')
      let expandedItems = this.get('expandedItems')
      records.map((record) => {
        delete expandedItems[record.id]
      })
      this.notifyPropertyChange('expandedItems')
    },

    expandItems () {
      let records = this.get('_listItems')
      let expandedItems = this.get('expandedItems')
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
