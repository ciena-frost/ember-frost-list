import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import computed from 'ember-computed-decorators'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

export default Mixin.create(FrostListCoreMixin, {
  // == Event =================================================================
  initListSortingMixin: on('init', function () {
    //this.set('queryParams', ['listConfig.sorting.active'])
    Ember.defineProperty(this, 'sortableProperties', Ember.computed.alias('listConfig.sorting.properties'))
    Ember.defineProperty(this, 'activeSorting', Ember.computed.alias('listConfig.sorting.active'))
  }),

  // == Computed Properties ====================================================
  //sortedItems: Ember.computed.sort('filteredItems', 'activeSortingString'),

  //@computed('activeSorting')
  //activeSortingString (activeSorting) {
  //  if (!activeSorting) return []
  //  return activeSorting.map((sortProperty) => {
  //    return `${sortProperty.value}${sortProperty.direction}`
  //  })
  //},

  // == Actions ================================================================
  actions: {
    sortItems (sortItems) {
      let activeSorting = sortItems.map(function (item) {
        return {value: item.value, direction: item.direction}
      })
      this.set('activeSorting', activeSorting)
    }
  }
})
