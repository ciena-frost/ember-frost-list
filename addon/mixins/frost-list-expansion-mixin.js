import Ember from 'ember'
const {
  Mixin,
  on
} = Ember

export default Mixin.create({
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
        expandedItems.set(record.id, false)
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
