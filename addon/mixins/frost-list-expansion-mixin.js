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
    set(this, 'expandedItemDictionary', Ember.Object.create())
  }),

  // == Actions ================================================================
  actions: {
    collapseItems () {
      let records = get(this, '_listItems')
      let expandedItemDictionary = get(this, 'expandedItemDictionary')
      records.map((record) => {
        delete expandedItemDictionary[record.id]
      })
      this.notifyPropertyChange('expandedItemDictionary')
    },

    expandItems () {
      let records = get(this, '_listItems')
      let expandedItemDictionary = get(this, 'expandedItemDictionary')
      records.map((record) => {
        expandedItemDictionary.set(record.id, true)
      })
      this.notifyPropertyChange('expandedItemDictionary')
    },

    collapseItem () {

    },

    expandItem () {

    }
  }
})
