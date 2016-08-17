import Ember from 'ember'
const {Mixin} = Ember

export default Mixin.create({

  init () {
    this._super(...arguments)
    //this.set('activeSorting',this.get('listConfig.sorting.active'))
  },

  activeSortingString: Ember.computed('activeSorting', function () {
    let activeSorting = this.get('activeSorting')
    if(!activeSorting) return []
    return activeSorting.map((sortProperty) => {
      return `${sortProperty.value}${sortProperty.direction}`
    })
  }),


  actions: {
    sortItems (sortItems) {
      let activeSorting = sortItems.map(function (item) {
        return {value: item.value, direction:item.direction}
      })
      this.set('activeSorting', activeSorting)
    }
  }
})
