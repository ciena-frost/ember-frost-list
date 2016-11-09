import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import {normalizeSort, listDefaultSort} from 'ember-frost-list/utils/utils'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

export default Mixin.create(FrostListCoreMixin, {
  // == Event =================================================================
  initListSortingMixin: on('init', function () {
    Ember.defineProperty(this, 'sortableProperties', Ember.computed.alias('listConfig.sorting.properties'))
    Ember.defineProperty(this, 'activeSorting', Ember.computed.alias('listConfig.sorting.active'))
  }),

  // == Actions ================================================================
  actions: {
    sortItems (sortProperties) {
      let filteredSortProperties = sortProperties.map(function (item) {
        return {value: item.value, direction: item.direction}
      })
      let normalizedSortProperties = normalizeSort(filteredSortProperties)
      const dataKey = this.get('listConfig.items')
      this.set(dataKey, listDefaultSort(this.get(dataKey), normalizedSortProperties))
    }
  }
})
