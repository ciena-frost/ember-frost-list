import Ember from 'ember'
const {
  computed,
  Mixin,
  on
} = Ember

export default Mixin.create({

  initListSortingMixin: on('init', function() {
    this.set('queryParams', ['listConfig.sorting.active'])
    Ember.defineProperty(this, 'sortableProperties', computed.alias('listConfig.sorting.properties'))
    Ember.defineProperty(this, 'activeSorting', computed.alias('listConfig.sorting.active'))
  }),

  sortedItems: Ember.computed.sort('mappedRecords', 'activeSortingString'),

  activeSortingString: Ember.computed('activeSorting', function () {
    let activeSorting = this.get('activeSorting')
    if(!activeSorting) return []
    return activeSorting.map((sortProperty) => {
      return `record.${sortProperty.value}${sortProperty.direction}`
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
