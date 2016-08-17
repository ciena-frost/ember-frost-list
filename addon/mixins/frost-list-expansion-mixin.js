import Ember from 'ember'
const {Mixin} = Ember

export default Mixin.create({

  init () {
    this._super(...arguments)
    this.set('expandedItems', Ember.Object.create())
  },

  actions: {
    //collapseItems () {
    //  let records = this.get('listItems')
    //
    //  records.map((record) => {
    //    record.set('isExpanded', false)
    //  })
    //},
    //
    //expandItems () {
    //  let records = this.get('listItems')
    //  records.map((record) => {
    //    record.set('isExpanded', true)
    //  })
    //},

    collapseItems () {
      let records = this.get('listItems')

      let expandedItems = this.get('expandedItems')
      records.map((record) => {
        expandedItems.set(record.id, false)
      })
      this.toggleProperty('hello')

    },

    expandItems () {
      let records = this.get('listItems')

      let expandedItems = this.get('expandedItems')
      records.map((record) => {
        expandedItems.set(record.id, true)
      })
      this.toggleProperty('hello')

    },



    collapseItem() {

    },

    expandItem() {

    }
  }
})
